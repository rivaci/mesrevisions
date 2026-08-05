// Dialogue avec Claude, appelé DIRECTEMENT depuis le navigateur.
//
// ── Pourquoi pas de serveur ───────────────────────────────────────────────
//
// L'en-tête `anthropic-dangerous-direct-browser-access` active CORS et autorise
// l'appel depuis le JavaScript de la page. Le mot « dangerous » vise un
// anti-patron précis : mettre SA clé dans le code d'une page publique, où
// n'importe quel visiteur la récupère. Ici c'est l'inverse — chacun saisit sa
// propre clé sur son appareil, elle n'est jamais dans le dépôt, et un visiteur
// qui ouvre l'URL a un stockage vide donc aucun accès.
//
// Ça supprime la fonction serverless, son hébergement, son code d'accès, son
// plafond de requêtes et le risque de relais ouvert.
//
// ── Mise en cache du prompt ───────────────────────────────────────────────
//
// Le prompt système est découpé en deux blocs avec un point de cache chacun :
// les consignes pédagogiques (identiques à jamais) puis le profil de l'élève
// (figé pendant toute une séance, mis à jour seulement à la fin). Les deux se
// relisent alors à un dixième du prix. Si le profil changeait à chaque échange,
// la mise en cache serait cassée à chaque appel — d'où la consolidation en fin
// de séance plutôt qu'après chaque erreur.
//
// ── Dégradation ───────────────────────────────────────────────────────────
//
// Toute défaillance — pas de clé, réseau coupé, quota dépassé, refus — renvoie
// `{ disponible: false }`. L'appli bascule alors sur les réponses préécrites du
// catalogue de pièges : moins riche, mais l'exercice reste jouable dans le
// train et rien ne plante.

import { cleApi } from './store.js';
import { eleve } from './eleve.js';

const URL_API = 'https://api.anthropic.com/v1/messages';
const MODELE = 'claude-opus-5';

// Le raisonnement est actif par défaut sur ce modèle et on le laisse : à effort
// bas il coûte moins cher que de le désactiver, et le désactiver expose à des
// balises internes qui fuient dans la réponse visible.
const EFFORT = 'low';

// Généreux à dessein : max_tokens plafonne le raisonnement ET la réponse
// ensemble. Trop juste, on tronque l'explication en plein milieu.
const MAX_TOKENS = 2000;

// Fonction et non constante : le prénom en fait partie. Le texte reste
// identique d'un appel à l'autre pour un même élève, donc la mise en cache du
// prompt fonctionne exactement pareil.
const consignes = (prenom) => `Tu es le professeur particulier de ${prenom}, 12 ans, qui entre en 5e.

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

export const disponible = () => Boolean(cleApi());

/** Un appel, avec mise en cache et sortie structurée. Ne lève jamais. */
async function appeler({ profilTexte, message, schema }) {
  const cle = cleApi();
  if (!cle) return { disponible: false, raison: 'pas-de-cle' };

  try {
    const reponse = await fetch(URL_API, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': cle,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: MODELE,
        max_tokens: MAX_TOKENS,
        // Deux points de cache : les consignes ne changent jamais, le profil
        // est figé pour la séance. Le second bloc peut donc être invalidé sans
        // faire retomber le premier.
        system: [
          { type: 'text', text: consignes(eleve().prenom || 'cet élève'), cache_control: { type: 'ephemeral' } },
          { type: 'text', text: profilTexte, cache_control: { type: 'ephemeral' } },
        ],
        output_config: { effort: EFFORT, format: { type: 'json_schema', schema } },
        messages: [{ role: 'user', content: message }],
      }),
    });

    if (!reponse.ok) {
      return { disponible: false, raison: `http-${reponse.status}` };
    }

    const donnees = await reponse.json();

    // À vérifier AVANT de lire le contenu : un refus renvoie un HTTP 200 avec
    // un contenu vide ou partiel, et indexer content[0] planterait.
    if (donnees.stop_reason === 'refusal') {
      return { disponible: false, raison: 'refus' };
    }

    const texte = (donnees.content ?? []).find((b) => b.type === 'text')?.text;
    if (!texte) return { disponible: false, raison: 'reponse-vide' };

    return { disponible: true, donnees: JSON.parse(texte) };
  } catch {
    // Réseau coupé, JSON malformé, CORS refusé : tout finit ici, et l'appli
    // bascule sur les réponses préécrites.
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

  return appeler({ profilTexte, message, schema: SCHEMA_REPONSE });
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

  return appeler({ profilTexte, message, schema: SCHEMA_MEMOIRE });
}

/** Vérifie qu'une clé fonctionne, pour l'écran de réglages. */
export async function verifierCle(cle) {
  try {
    const reponse = await fetch(URL_API, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': cle.trim(),
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: MODELE,
        max_tokens: 16,
        messages: [{ role: 'user', content: 'Réponds exactement : ok' }],
      }),
    });
    if (reponse.ok) return { ok: true };
    const erreur = await reponse.json().catch(() => null);
    return { ok: false, message: erreur?.error?.message ?? `Erreur ${reponse.status}` };
  } catch {
    return { ok: false, message: 'Impossible de joindre le service. Vérifie ta connexion.' };
  }
}
