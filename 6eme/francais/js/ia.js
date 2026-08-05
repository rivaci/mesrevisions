// Dialogue avec un modèle de langage, appelé DIRECTEMENT depuis le navigateur.
//
// ── Pourquoi pas de serveur ───────────────────────────────────────────────
//
// Les deux fournisseurs acceptent l'appel depuis le JavaScript d'une page (chez
// Anthropic il faut l'en-tête `anthropic-dangerous-direct-browser-access`, chez
// OpenAI rien de particulier). Le mot « dangerous » vise un anti-patron précis :
// mettre SA clé dans le code d'une page publique, où n'importe quel visiteur la
// récupère. Ici c'est l'inverse — chacun saisit sa propre clé sur son appareil,
// elle n'est jamais dans le dépôt, et un visiteur qui ouvre l'URL a un stockage
// vide donc aucun accès.
//
// Ça supprime la fonction serverless, son hébergement, son code d'accès, son
// plafond de requêtes et le risque de relais ouvert.
//
// ── Deux fournisseurs, un seul appel ──────────────────────────────────────
//
// Tout ce qui diffère est rassemblé dans FOURNISSEURS : URL, en-têtes, forme du
// prompt système, nom du plafond de tokens, enveloppe de la sortie structurée,
// chemin de lecture de la réponse. Le reste du fichier ne sait pas à qui il
// parle. `construireRequete` est pure et testée hors navigateur, parce que ces
// enveloppes ne se ressemblent pas assez pour qu'une relecture suffise :
//
//   • le JSON Schema lui-même est portable, son enveloppe non — `name` et
//     `strict` sont obligatoires chez OpenAI et refusés chez Anthropic ;
//   • le plafond de tokens s'appelle `max_tokens` d'un côté, `max_output_tokens`
//     de l'autre, et le mauvais nom donne un 400, pas un champ ignoré ;
//   • l'effort de raisonnement est `output_config.effort` contre `reasoning.effort`.
//
// ── Mise en cache du prompt ───────────────────────────────────────────────
//
// Le prompt système est en deux morceaux : les consignes pédagogiques
// (identiques à jamais) puis le profil de l'élève (figé pendant toute une
// séance, mis à jour seulement à la fin). Cet ordre — le stable d'abord — est ce
// qui rend la mise en cache possible des deux côtés, par des mécanismes
// différents : Anthropic exige un marqueur `cache_control` explicite sur chaque
// bloc, OpenAI cache automatiquement le préfixe commun sans qu'on demande rien.
// D'où la consolidation de la mémoire en fin de séance plutôt qu'après chaque
// erreur : un profil qui changerait à chaque échange casserait les deux.
//
// ── Dégradation ───────────────────────────────────────────────────────────
//
// Toute défaillance — pas de clé, réseau coupé, quota dépassé, refus, modèle
// inconnu — renvoie `{ disponible: false }`. L'appli bascule alors sur les
// réponses préécrites du catalogue de pièges : moins riche, mais l'exercice
// reste jouable dans le train et rien ne plante.

import * as store from './store.js';
import { eleve, slug } from './eleve.js';

// Généreux à dessein : ce plafond couvre le raisonnement ET la réponse.
// Trop juste, on tronque l'explication en plein milieu.
const MAX_TOKENS = 2000;

// Depuis que l'explication préécrite n'est plus affichée en attendant Merlin,
// une requête qui pend laisserait l'élève devant un « … » sans bouton pour
// continuer. Passé ce délai, on abandonne et on retombe sur le préécrit.
const DELAI_MAX = 20000;

/** fetch avec abandon au bout de DELAI_MAX ms. L'abandon lève, donc est traité comme une panne. */
async function fetchAvecDelai(url, options) {
  const controleur = new AbortController();
  const minuterie = setTimeout(() => controleur.abort(), DELAI_MAX);
  try {
    return await fetch(url, { ...options, signal: controleur.signal });
  } finally {
    clearTimeout(minuterie);
  }
}

// Le raisonnement est actif par défaut chez les deux : on le laisse, mais au
// plus bas. Le désactiver expose à des balises internes qui fuient dans la
// réponse visible, et une explication de grammaire n'en demande pas plus.
const EFFORT = 'low';

export const FOURNISSEURS = {
  anthropic: {
    nom: 'Anthropic',
    console: 'console.anthropic.com',
    modeles: [
      { id: 'claude-opus-5', libelle: 'Claude Opus 5 — le choix par défaut' },
      { id: 'claude-sonnet-5', libelle: 'Claude Sonnet 5 — moins cher, un peu moins fin' },
      { id: 'claude-fable-5', libelle: 'Claude Fable 5 — le plus capable, le plus cher' },
    ],

    requete({ cle, modele, consignes, profil, message, schema }) {
      return {
        url: 'https://api.anthropic.com/v1/messages',
        entetes: {
          'content-type': 'application/json',
          'x-api-key': cle,
          'anthropic-version': '2023-06-01',
          // Sans cet en-tête, la réponse ne porte aucun Access-Control-Allow-Origin
          // et le fetch échoue avant même d'être lu.
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        corps: {
          model: modele,
          max_tokens: MAX_TOKENS,
          // Deux points de cache : les consignes ne changent jamais, le profil
          // est figé pour la séance. Le second peut donc être invalidé sans
          // faire retomber le premier.
          system: [
            { type: 'text', text: consignes, cache_control: { type: 'ephemeral' } },
            { type: 'text', text: profil, cache_control: { type: 'ephemeral' } },
          ],
          output_config: { effort: EFFORT, format: { type: 'json_schema', schema } },
          messages: [{ role: 'user', content: message }],
        },
      };
    },

    lire(donnees) {
      // À vérifier AVANT de lire le contenu : un refus renvoie un HTTP 200 avec
      // un contenu vide ou partiel, et indexer content[0] planterait.
      if (donnees.stop_reason === 'refusal') return { ok: false, raison: 'refus' };
      if (donnees.stop_reason === 'max_tokens') return { ok: false, raison: 'tronque' };
      const texte = (donnees.content ?? []).find((b) => b.type === 'text')?.text;
      return texte ? { ok: true, texte } : { ok: false, raison: 'reponse-vide' };
    },
  },

  openai: {
    nom: 'OpenAI',
    console: 'platform.openai.com',
    modeles: [
      { id: 'gpt-5.6-luna', libelle: 'GPT-5.6 Luna — le moins cher' },
      { id: 'gpt-5.6-terra', libelle: 'GPT-5.6 Terra — intermédiaire' },
      { id: 'gpt-5.6-sol', libelle: 'GPT-5.6 Sol — haut de gamme' },
    ],

    requete({ cle, modele, consignes, profil, message, schema, nomSchema }) {
      return {
        url: 'https://api.openai.com/v1/responses',
        entetes: {
          'content-type': 'application/json',
          authorization: `Bearer ${cle}`,
        },
        corps: {
          model: modele,
          max_output_tokens: MAX_TOKENS,
          // Cet endpoint conserve les réponses trente jours par défaut. Il
          // s'agit du travail d'un enfant : on refuse explicitement.
          store: false,
          // Aide au routage vers le même cache d'un appel à l'autre. Rien de
          // sensible : le prénom passe déjà dans les consignes.
          prompt_cache_key: `francais6e-${slug()}`,
          reasoning: { effort: EFFORT },
          // Deux blocs, le stable d'abord : le cache implicite d'OpenAI porte
          // sur le préfixe commun, il n'y a pas de marqueur à poser.
          input: [
            {
              role: 'developer',
              content: [
                { type: 'input_text', text: consignes },
                { type: 'input_text', text: profil },
              ],
            },
            { role: 'user', content: message },
          ],
          text: {
            format: { type: 'json_schema', name: nomSchema, strict: true, schema },
          },
        },
      };
    },

    lire(donnees) {
      if (donnees.status === 'incomplete') return { ok: false, raison: 'tronque' };
      const message = (donnees.output ?? []).find((o) => o.type === 'message');
      const parties = message?.content ?? [];
      // Comme chez Anthropic, le refus arrive en HTTP 200 : à tester avant de
      // chercher le texte, qui est absent dans ce cas.
      if (parties.some((p) => p.type === 'refusal')) return { ok: false, raison: 'refus' };
      const texte = parties.find((p) => p.type === 'output_text')?.text;
      return texte ? { ok: true, texte } : { ok: false, raison: 'reponse-vide' };
    },
  },
};

export const fournisseurCourant = () => FOURNISSEURS[store.fournisseur()] ?? FOURNISSEURS.anthropic;

/** Le modèle réglé, ou le premier de la liste du fournisseur. */
export function modeleCourant(nomFournisseur = store.fournisseur(), choisi = store.modele()) {
  const f = FOURNISSEURS[nomFournisseur] ?? FOURNISSEURS.anthropic;
  return choisi || f.modeles[0].id;
}

// --- Consignes --------------------------------------------------------------

// Fonction et non constante : le prénom en fait partie. Le texte reste
// identique d'un appel à l'autre pour un même élève, donc la mise en cache du
// prompt fonctionne exactement pareil.
const consignes = (prenom) => `Tu t'appelles Merlin. Tu es le professeur particulier de ${prenom}, 12 ans, qui entre en 5e.

Cet élève connaît ses règles de grammaire mais n'arrive pas à les APPLIQUER
quand il écrit. Ton rôle n'est donc pas de réciter la règle : c'est de lui faire
voir pourquoi il s'est fait avoir sur CETTE phrase-là.

Comment tu réponds :
- Trois à quatre phrases. Au-delà, il ne lit pas.
- Tu le tutoies. Ton chaleureux, jamais mièvre, jamais infantilisant.
- Tu réponds à SON raisonnement à lui, pas à l'erreur en général. S'il a coché
  « au hasard », ne fais pas semblant qu'il a réfléchi.
- Tu donnes un geste concret à refaire, pas un principe abstrait.
- Tu ne donnes JAMAIS la réponse d'un autre exercice : il va en avoir un
  nouveau juste après, avec le même piège.
- Si une explication a déjà été essayée sans effet, tu en changes. Ne répète
  pas une image qui n'a pas pris.
- Tu n'inventes aucun chiffre sur lui. Les statistiques te sont fournies.
- Tu ne présumes jamais de son genre : écris « tu », jamais « il » ni « elle ».

Le champ "explication" est lu tel quel par ${prenom}, à l'écran. Écris-le pour lui.`;

const SCHEMA_REPONSE = {
  type: 'object',
  properties: {
    explication: {
      type: 'string',
      description: "L'explication montrée à l'élève, 3 à 4 phrases maximum.",
    },
    geste: {
      type: 'string',
      description: 'Le réflexe à refaire, en une phrase impérative courte.',
    },
  },
  required: ['explication', 'geste'],
  additionalProperties: false,
};

const SCHEMA_MEMOIRE = {
  type: 'object',
  properties: {
    marche: {
      type: 'array',
      items: { type: 'string' },
      description: "Ce qui a fonctionné pour lui expliquer. Vide si rien de notable.",
    },
    aEviter: {
      type: 'array',
      items: { type: 'string' },
      description: 'Ce qui a été essayé sans effet et ne doit pas être refait.',
    },
    transversales: {
      type: 'array',
      items: { type: 'string' },
      description: "Comment il apprend, indépendamment de la matière : longueur qu'il supporte, moment où il décroche.",
    },
  },
  required: ['marche', 'aEviter', 'transversales'],
  additionalProperties: false,
};

export const disponible = () => Boolean(store.cleApi());

/**
 * Assemble l'appel HTTP du fournisseur demandé. Pure : ne lit rien, n'envoie
 * rien. C'est ce qui rend les deux enveloppes vérifiables par `node`.
 */
export function construireRequete({ fournisseur, cle, modele, prenom, profilTexte, message, schema, nomSchema }) {
  const f = FOURNISSEURS[fournisseur];
  if (!f) throw new Error(`fournisseur inconnu : ${fournisseur}`);
  return f.requete({
    cle,
    modele: modele || f.modeles[0].id,
    consignes: consignes(prenom),
    profil: profilTexte,
    message,
    schema,
    nomSchema,
  });
}

/** Un appel complet. Ne lève jamais : toute défaillance devient un mode dégradé. */
async function appeler({ profilTexte, message, schema, nomSchema }) {
  const cle = store.cleApi();
  if (!cle) return { disponible: false, raison: 'pas-de-cle' };

  const nomFournisseur = store.fournisseur();
  const { url, entetes, corps } = construireRequete({
    fournisseur: nomFournisseur,
    cle,
    modele: modeleCourant(),
    prenom: eleve().prenom || 'cet élève',
    profilTexte,
    message,
    schema,
    nomSchema,
  });

  try {
    const reponse = await fetchAvecDelai(url, {
      method: 'POST',
      headers: entetes,
      body: JSON.stringify(corps),
    });

    if (!reponse.ok) return { disponible: false, raison: `http-${reponse.status}` };

    const lu = FOURNISSEURS[nomFournisseur].lire(await reponse.json());
    if (!lu.ok) return { disponible: false, raison: lu.raison };

    return { disponible: true, donnees: JSON.parse(lu.texte) };
  } catch {
    // Réseau coupé, JSON malformé, CORS refusé, clé rejetée chez OpenAI : tout
    // finit ici, et l'appli bascule sur les réponses préécrites.
    return { disponible: false, raison: 'reseau' };
  }
}

/**
 * Réagit à une erreur : on lui a demandé POURQUOI il a répondu ça, et on
 * répond à ce raisonnement précis.
 */
export function expliquerErreur({ profilTexte, exercice, piege, reponseDonnee, raisonnement, dejaDit }) {
  const message = [
    `Exercice : ${exercice.consigne}`,
    `Phrase : ${exercice.enonce}`,
    `Réponse attendue : ${exercice.attendu}`,
    `Sa réponse : ${reponseDonnee}`,
    '',
    `Piège : ${piege.nom}`,
    `Règle : ${piege.regle}`,
    '',
    raisonnement
      ? `Interrogé sur son raisonnement, il a répondu : « ${raisonnement.texte} »`
      : "Il n'a pas expliqué son raisonnement.",
    dejaDit.length
      ? `\nExplications déjà données sur ce piège (ne les répète pas) :\n${dejaDit.map((e) => `— ${e.explication}`).join('\n')}`
      : '',
  ].join('\n');

  return appeler({ profilTexte, message, schema: SCHEMA_REPONSE, nomSchema: 'explication' });
}

/**
 * Consolidation de fin de séance : le seul moment où la mémoire est réécrite.
 * Un appel par séance, ce qui la rend quasiment gratuite à l'usage.
 */
export function consoliderMemoire({ profilTexte, resume, ratesDetail }) {
  const message = [
    `Séance terminée : ${resume.reussites} réussites, ${resume.echecs} erreurs, ${resume.duree} minutes.`,
    resume.typeDominant
      ? `Type d'erreur dominant : ${resume.typeDominant.nom} (${resume.typeDominant.echecs} fois).`
      : 'Aucune erreur dominante.',
    '',
    'Raisonnements invoqués après ses erreurs :',
    Object.entries(resume.raisonnements ?? {}).map(([id, n]) => `— ${id} : ${n} fois`).join('\n') || '— aucun',
    '',
    'Détail des erreurs :',
    ratesDetail.map((r) => `— ${r.piegeId} : a écrit « ${r.reponseDonnee} »`).join('\n') || '— aucune',
    '',
    "Mets à jour ce que tu sais de cet élève. N'ajoute que ce que cette séance t'a réellement appris",
    "et qui servira aux prochaines : une liste vide est une réponse parfaitement acceptable.",
    "N'écris aucun chiffre — ils sont calculés ailleurs. Reste factuel, sans jugement sur l'élève.",
  ].join('\n');

  return appeler({ profilTexte, message, schema: SCHEMA_MEMOIRE, nomSchema: 'memoire' });
}

/**
 * Vérifie un réglage complet — clé ET modèle — pour l'écran de réglages.
 *
 * Envoie délibérément une requête de la MÊME FORME que les vraies : sortie
 * structurée et effort de raisonnement compris. Un modèle qui n'accepte pas ces
 * champs est ainsi refusé ici, avec le message du service, plutôt que de laisser
 * l'appli basculer silencieusement en explications préécrites à la première
 * erreur de l'élève.
 */
export async function verifierReglages({ fournisseur, cle, modele }) {
  const f = FOURNISSEURS[fournisseur];
  if (!f) return { ok: false, message: 'Fournisseur inconnu.' };
  if (!cle.trim()) return { ok: false, message: 'Saisis une clé.' };

  const { url, entetes, corps } = construireRequete({
    fournisseur,
    cle: cle.trim(),
    modele,
    prenom: 'cet élève',
    profilTexte: 'Test de configuration.',
    message: 'Réponds « ok » dans les deux champs.',
    schema: SCHEMA_REPONSE,
    nomSchema: 'explication',
  });

  try {
    const reponse = await fetch(url, {
      method: 'POST',
      headers: entetes,
      body: JSON.stringify(corps),
    });
    if (reponse.ok) return { ok: true };

    const erreur = await reponse.json().catch(() => null);
    const message = erreur?.error?.message ?? `Erreur ${reponse.status}`;
    return { ok: false, message };
  } catch {
    // Chez OpenAI, une clé refusée revient par ce chemin et non par un 401
    // lisible : la réponse d'erreur ne porte pas d'en-tête CORS, donc le fetch
    // échoue avant qu'on puisse lire quoi que ce soit. On ne peut pas
    // distinguer les deux causes, alors on les nomme toutes les deux.
    return { ok: false, message: 'Clé refusée, ou service injoignable. Vérifie la clé et ta connexion.' };
  }
}
