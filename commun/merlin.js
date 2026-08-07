// Merlin — le moteur d'appel aux modèles de langage, commun à toutes les applis.
//
// ── Pourquoi ce fichier est dans commun/ ──────────────────────────────────
//
// L'appli de français porte déjà tout ceci dans son `js/ia.js`. En le
// recopiant pour les maths on aurait deux copies de 600 lignes à faire
// diverger — et c'est précisément le moment où la règle de trois dit
// d'extraire. Ce qui reste propre à une matière est mince et tient dans le
// `merlin.js` de chaque appli : les consignes pédagogiques, la forme du
// contexte d'exercice, le schéma de sortie.
//
// L'appli de français continuera de tourner sur son `ia.js` jusqu'à sa
// prochaine reprise : on n'en casse pas une qui marche pour faire propre.
//
// ── Pourquoi pas de serveur ───────────────────────────────────────────────
//
// Les deux fournisseurs acceptent l'appel depuis le JavaScript d'une page.
// Chez Anthropic il faut l'en-tête `anthropic-dangerous-direct-browser-access` ;
// le mot « dangerous » vise un anti-patron précis — mettre SA clé dans le code
// d'une page publique. Ici c'est l'inverse : chacun saisit sa propre clé sur
// son appareil, elle n'est jamais dans le dépôt, et un visiteur qui ouvre
// l'URL a un stockage vide donc aucun accès et aucun coût.
//
// ── Mise en cache du prompt ───────────────────────────────────────────────
//
// Le prompt système est en deux morceaux, et l'ordre compte : les consignes
// pédagogiques (identiques à jamais) puis le profil de l'élève (figé pendant
// toute une séance). Le stable d'abord, c'est ce qui rend le cache possible
// des deux côtés — Anthropic exige un marqueur `cache_control` explicite,
// OpenAI met en cache le préfixe commun sans qu'on demande rien.

const MAX_TOKENS = 700;
const MAX_CHAT = 900;
const EFFORT = 'low';
const DELAI = 20000;

/** Clé de configuration partagée par toutes les applis du même appareil. */
const CLE_IA = 'eleve.ia.v1';

// ── Fournisseurs ────────────────────────────────────────────────────────────
//
// Tout ce qui diffère est rassemblé ici : URL, en-têtes, forme du prompt
// système, nom du plafond de tokens, enveloppe de la sortie structurée, chemin
// de lecture. Le reste du fichier ne sait pas à qui il parle.

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

    requeteChat({ cle, modele, consignes, profil, contexte, historique }) {
      const system = [
        { type: 'text', text: consignes, cache_control: { type: 'ephemeral' } },
        { type: 'text', text: profil, cache_control: { type: 'ephemeral' } },
      ];
      // Le contexte — l'exercice en cours — change à chaque fois : hors cache.
      if (contexte) system.push({ type: 'text', text: contexte });
      return {
        url: 'https://api.anthropic.com/v1/messages',
        entetes: {
          'content-type': 'application/json',
          'x-api-key': cle,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        corps: {
          model: modele,
          max_tokens: MAX_CHAT,
          stream: true,
          system,
          output_config: { effort: EFFORT },
          messages: historique.map((m) => ({ role: m.role, content: m.texte })),
        },
      };
    },

    async lireFlux(response, onDelta) {
      let texte = '';
      let usage = null;
      let refus = false;
      for await (const evenement of fluxSSE(response)) {
        if (evenement.type === 'content_block_delta' && evenement.delta?.type === 'text_delta') {
          texte += evenement.delta.text;
          onDelta?.(texte);
        }
        if (evenement.type === 'message_delta') {
          if (evenement.delta?.stop_reason === 'refusal') refus = true;
          if (evenement.usage) usage = { ...(usage ?? {}), ...evenement.usage };
        }
        if (evenement.type === 'message_start' && evenement.message?.usage) {
          usage = { ...(usage ?? {}), ...evenement.message.usage };
        }
      }
      return { texte, usage, refus };
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

    requete({ cle, modele, consignes, profil, message, schema, nomSchema, appli }) {
      return {
        url: 'https://api.openai.com/v1/responses',
        entetes: { 'content-type': 'application/json', authorization: `Bearer ${cle}` },
        corps: {
          model: modele,
          max_output_tokens: MAX_TOKENS,
          // Cet endpoint conserve les réponses trente jours par défaut. Il
          // s'agit du travail d'un enfant : on refuse explicitement.
          store: false,
          prompt_cache_key: appli,
          reasoning: { effort: EFFORT },
          instructions: `${consignes}\n\n${profil}`,
          input: message,
          text: {
            format: {
              type: 'json_schema',
              // `name` et `strict` sont obligatoires ici et refusés chez
              // Anthropic : c'est l'enveloppe qui diffère, pas le schéma.
              name: nomSchema,
              strict: true,
              schema,
            },
          },
        },
      };
    },

    lire(donnees) {
      if (donnees.status === 'incomplete') return { ok: false, raison: 'tronque' };
      const bloc = (donnees.output ?? []).find((o) => o.type === 'message');
      const refus = (bloc?.content ?? []).find((c) => c.type === 'refusal');
      if (refus) return { ok: false, raison: 'refus' };
      const texte = (bloc?.content ?? []).find((c) => c.type === 'output_text')?.text;
      return texte ? { ok: true, texte } : { ok: false, raison: 'reponse-vide' };
    },

    requeteChat({ cle, modele, consignes, profil, contexte, historique, appli }) {
      const instructions = [consignes, profil, contexte].filter(Boolean).join('\n\n');
      return {
        url: 'https://api.openai.com/v1/responses',
        entetes: { 'content-type': 'application/json', authorization: `Bearer ${cle}` },
        corps: {
          model: modele,
          max_output_tokens: MAX_CHAT,
          store: false,
          stream: true,
          prompt_cache_key: appli,
          reasoning: { effort: EFFORT },
          instructions,
          input: historique.map((m) => ({
            role: m.role,
            content: [{ type: m.role === 'assistant' ? 'output_text' : 'input_text', text: m.texte }],
          })),
        },
      };
    },

    async lireFlux(response, onDelta) {
      let texte = '';
      let usage = null;
      let refus = false;
      for await (const evenement of fluxSSE(response)) {
        if (evenement.type === 'response.output_text.delta') {
          texte += evenement.delta ?? '';
          onDelta?.(texte);
        }
        if (evenement.type === 'response.refusal.delta') refus = true;
        if (evenement.response?.usage) usage = evenement.response.usage;
      }
      return { texte, usage, refus };
    },
  },
};

// ── Configuration, partagée entre applis ────────────────────────────────────

const configVierge = () => ({ fournisseur: 'anthropic', modele: '', cles: {} });

function chargerConfig() {
  try {
    const brut = localStorage.getItem(CLE_IA);
    if (brut) return { ...configVierge(), ...JSON.parse(brut) };
  } catch { /* stockage refusé : l'appli reste jouable sans Merlin */ }
  return configVierge();
}

let config = chargerConfig();

const sauverConfig = () => {
  try { localStorage.setItem(CLE_IA, JSON.stringify(config)); } catch { /* ignoré */ }
};

export const configIA = () => ({ ...config, cles: { ...config.cles } });
export const fournisseur = () => config.fournisseur;
export const cleApi = () => config.cles[config.fournisseur] ?? '';
export const disponible = () => Boolean(cleApi());

export function definirConfig({ fournisseur: f, modele, cle }) {
  if (f) config.fournisseur = f;
  if (modele !== undefined) config.modele = modele;
  if (cle !== undefined) config.cles = { ...config.cles, [config.fournisseur]: cle };
  sauverConfig();
}

/** Le modèle actif, ou le premier de la liste du fournisseur si rien n'est choisi. */
export function modeleCourant() {
  const f = FOURNISSEURS[config.fournisseur] ?? FOURNISSEURS.anthropic;
  return config.modele || f.modeles[0].id;
}

// ── Coût ────────────────────────────────────────────────────────────────────
//
// Journalisé pour que l'écran parents puisse dire ce que Merlin a coûté. Les
// tarifs bougent : on stocke les jetons, pas des euros calculés à la volée.

const CLE_COUT = 'eleve.merlin-cout.v1';

const coutVierge = () => ({ appels: 0, entree: 0, sortie: 0, cache: 0 });

export function lireCout() {
  try { return { ...coutVierge(), ...JSON.parse(localStorage.getItem(CLE_COUT) ?? '{}') }; }
  catch { return coutVierge(); }
}

function enregistrerCout(usage) {
  if (!usage) return;
  const c = lireCout();
  c.appels += 1;
  c.entree += usage.input_tokens ?? usage.input_tokens_details?.text_tokens ?? 0;
  c.sortie += usage.output_tokens ?? 0;
  c.cache += usage.cache_read_input_tokens ?? usage.input_tokens_details?.cached_tokens ?? 0;
  try { localStorage.setItem(CLE_COUT, JSON.stringify(c)); } catch { /* ignoré */ }
  window.dispatchEvent(new CustomEvent('merlin-cout'));
}

// ── Appels ──────────────────────────────────────────────────────────────────

/** Un fetch qui abandonne : sans délai, une requête pendue gèle la séance. */
async function fetchAvecDelai(url, options) {
  const arret = new AbortController();
  const minuteur = setTimeout(() => arret.abort(), DELAI);
  try { return await fetch(url, { ...options, signal: arret.signal }); }
  finally { clearTimeout(minuteur); }
}

async function* fluxSSE(response) {
  const lecteur = response.body.getReader();
  const decodeur = new TextDecoder();
  let tampon = '';
  while (true) {
    const { done, value } = await lecteur.read();
    if (done) break;
    tampon += decodeur.decode(value, { stream: true });
    const lignes = tampon.split('\n');
    tampon = lignes.pop() ?? '';
    for (const ligne of lignes) {
      if (!ligne.startsWith('data:')) continue;
      const charge = ligne.slice(5).trim();
      if (!charge || charge === '[DONE]') continue;
      try { yield JSON.parse(charge); } catch { /* fragment non parsable : ignoré */ }
    }
  }
}

/**
 * Assemble l'appel HTTP. Pure : ne lit rien, n'envoie rien.
 *
 * C'est ce qui rend les deux enveloppes vérifiables par `node` hors navigateur.
 * Elles ne se ressemblent pas assez pour qu'une relecture suffise : le plafond
 * de tokens s'appelle `max_tokens` d'un côté et `max_output_tokens` de l'autre,
 * et le mauvais nom donne un 400, pas un champ ignoré.
 */
export function construireRequete({ fournisseur: nom, cle, modele, consignes, profil, message, schema, nomSchema, appli }) {
  const f = FOURNISSEURS[nom] ?? FOURNISSEURS.anthropic;
  return f.requete({ cle, modele, consignes, profil, message, schema, nomSchema, appli });
}

/**
 * Un appel à sortie structurée. Ne lève jamais : sans Merlin, l'appli doit
 * rester entièrement jouable sur ses explications préécrites.
 */
export async function appeler({ consignes, profil, message, schema, nomSchema, appli }) {
  const cle = cleApi();
  if (!cle) return { disponible: false, raison: 'pas-de-cle' };

  const nom = config.fournisseur;
  const f = FOURNISSEURS[nom];
  const modele = modeleCourant();
  const { url, entetes, corps } = f.requete({ cle, modele, consignes, profil, message, schema, nomSchema, appli });

  try {
    const reponse = await fetchAvecDelai(url, { method: 'POST', headers: entetes, body: JSON.stringify(corps) });
    if (!reponse.ok) return { disponible: false, raison: `http-${reponse.status}` };
    const donnees = await reponse.json();
    enregistrerCout(donnees.usage);
    const lu = f.lire(donnees);
    if (!lu.ok) return { disponible: false, raison: lu.raison };
    try { return { disponible: true, donnees: JSON.parse(lu.texte) }; }
    catch { return { disponible: false, raison: 'json-invalide' }; }
  } catch {
    return { disponible: false, raison: 'reseau' };
  }
}

/** Un échange de discussion, streamé pour que l'attente soit lisible. */
export async function discuter({ consignes, profil, contexte, historique, onDelta, appli }) {
  const cle = cleApi();
  if (!cle) return { disponible: false, raison: 'pas-de-cle' };

  const f = FOURNISSEURS[config.fournisseur];
  const modele = modeleCourant();
  const { url, entetes, corps } = f.requeteChat({ cle, modele, consignes, profil, contexte, historique, appli });

  try {
    const reponse = await fetch(url, { method: 'POST', headers: entetes, body: JSON.stringify(corps) });
    if (!reponse.ok) return { disponible: false, raison: `http-${reponse.status}` };
    const lu = await f.lireFlux(reponse, onDelta);
    enregistrerCout(lu.usage);
    if (lu.refus) return { disponible: true, texte: "Je préfère ne pas répondre à ça. On revient aux maths ?" };
    if (!lu.texte) return { disponible: false, raison: 'reponse-vide' };
    return { disponible: true, texte: lu.texte };
  } catch {
    return { disponible: false, raison: 'reseau' };
  }
}

/**
 * Vérifie une clé en envoyant une requête de la MÊME FORME que les vraies —
 * sortie structurée et effort de raisonnement compris. Un modèle qui refuse
 * l'une de ces options doit être signalé au réglage, pas au premier exercice.
 */
export async function verifierReglages({ fournisseur: nom, cle, modele }) {
  const f = FOURNISSEURS[nom];
  if (!f) return { ok: false, message: 'Fournisseur inconnu.' };
  const schema = {
    type: 'object',
    properties: { ok: { type: 'string', description: 'Réponds exactement « oui ».' } },
    required: ['ok'],
    additionalProperties: false,
  };
  const { url, entetes, corps } = f.requete({
    cle, modele: modele || f.modeles[0].id,
    consignes: 'Tu vérifies une configuration technique.',
    profil: 'Aucun profil.',
    message: 'Réponds « oui ».',
    schema, nomSchema: 'verification', appli: 'verification',
  });
  try {
    const reponse = await fetchAvecDelai(url, { method: 'POST', headers: entetes, body: JSON.stringify(corps) });
    if (reponse.status === 401) return { ok: false, message: 'Clé refusée par le fournisseur.' };
    if (reponse.status === 404) return { ok: false, message: 'Ce modèle n\'existe pas ou n\'est pas accessible avec cette clé.' };
    if (!reponse.ok) {
      const detail = await reponse.json().catch(() => null);
      return { ok: false, message: detail?.error?.message ?? `Erreur ${reponse.status}.` };
    }
    const lu = f.lire(await reponse.json());
    return lu.ok ? { ok: true } : { ok: false, message: `Réponse inattendue (${lu.raison}).` };
  } catch {
    return { ok: false, message: 'Pas de réponse — vérifie ta connexion.' };
  }
}
