// Progression, journal des séances et mémoire, conservés dans le navigateur.
//
// ── Pourquoi localStorage et pas IndexedDB ────────────────────────────────
//
// Ce qui doit survivre à la fermeture de l'onglet est petit : la progression
// (15 pièges), les résumés de séance (~20 Ko sur quatre semaines), le profil
// et la clé d'API. On tient très largement dans les quelques mégaoctets de
// localStorage, et on garde un code synchrone plutôt que d'importer
// l'asynchrone d'IndexedDB pour un besoin qu'on n'a pas.
//
// Les DIALOGUES avec l'IA ne sont volontairement pas archivés intégralement :
// une fois l'échange terminé, tout ce qui compte en a été extrait — le niveau
// du piège a bougé, le type d'erreur est journalisé, une observation est
// peut-être entrée en mémoire. La transcription complète n'est plus relue par
// personne. On n'en garde que les derniers échanges, plafonnés, pour que l'IA
// évite de répéter mot pour mot l'explication de la veille.
//
// ── Origine partagée ──────────────────────────────────────────────────────
//
// Toutes les pages de rivaci.github.io partagent un seul stockage. D'où le
// préfixe par appli sur ce qui lui est propre — et l'absence de préfixe,
// délibérée, sur ce qui doit être partagé entre les applis d'un même élève.

import { PIEGES } from './data/pieges.js';
import { etatInitial, apresReponse, estAcquis, fileDeRemediation, tauxAcquis } from './srs.js';
import { profilVierge, ajouterNotes, supprimerNote } from './memoire.js';

const CLE_APP = 'francais6e.v1';
const CLE_TRANSVERSAL = 'eleve.transversal.v1'; // partagé entre matières, sans préfixe
const CLE_API = 'eleve.cle-api.v1'; // partagé entre applis du même appareil

const MAX_ECHANGES_GARDES = 20;
const MAX_SEANCES_JOURNALISEES = 60;

const etatVierge = () => ({
  version: 1,
  numeroSeance: 0, // compteur global : c'est l'horloge de la répétition espacée
  seanceCourante: 1, // avancement dans le parcours des 20 séances
  pieges: {},
  exercicesVus: {},
  journal: [],
  profilFrancais: profilVierge().francais,
  echanges: [],
});

let etat = charger(CLE_APP, etatVierge);
let transversal = charger(CLE_TRANSVERSAL, () => profilVierge().transversal);

function charger(cle, parDefaut) {
  try {
    const brut = localStorage.getItem(cle);
    if (!brut) return parDefaut();
    const lu = JSON.parse(brut);
    return lu.version === undefined || lu.version === 1 ? { ...parDefaut(), ...lu } : parDefaut();
  } catch {
    return parDefaut();
  }
}

function sauver() {
  try {
    localStorage.setItem(CLE_APP, JSON.stringify(etat));
    localStorage.setItem(CLE_TRANSVERSAL, JSON.stringify(transversal));
  } catch {
    // Stockage plein ou navigation privée : l'appli reste jouable, seule la
    // progression est perdue à la fermeture.
  }
}

export const lireEtat = () => etat;
export const profil = () => ({ transversal, francais: etat.profilFrancais });

// --- Clé d'API --------------------------------------------------------------
// Elle n'est jamais dans le dépôt : chacun saisit la sienne sur son appareil.

export const cleApi = () => {
  try { return localStorage.getItem(CLE_API) ?? ''; } catch { return ''; }
};

export const definirCleApi = (cle) => {
  try {
    if (cle) localStorage.setItem(CLE_API, cle.trim());
    else localStorage.removeItem(CLE_API);
  } catch { /* stockage refusé : l'appli bascule en mode hors ligne */ }
};

// --- Pièges -----------------------------------------------------------------

export const etatPiege = (id) => etat.pieges[id] ?? etatInitial();

export const tousLesPieges = () =>
  Object.keys(PIEGES).map((id) => ({ id, etat: etatPiege(id) }));

export const progressionGlobale = () => tauxAcquis(tousLesPieges());

export const piegesARevoir = () => fileDeRemediation(tousLesPieges(), etat.numeroSeance);

// --- Déroulé d'une séance ---------------------------------------------------

let seanceEnCours = null;

export function demarrerSeance(numeroParcours) {
  etat.numeroSeance += 1;
  seanceEnCours = {
    numero: etat.numeroSeance,
    parcours: numeroParcours,
    debut: Date.now(),
    reussites: 0,
    echecs: 0,
    parPiege: {},
    raisonnements: {},
    ratesDetail: [],
  };
  sauver();
  return seanceEnCours;
}

/**
 * Enregistre une réponse. `raisonnementId` est le choix fait dans le dialogue
 * après une erreur — c'est le signal le plus utile du résumé parents, parce
 * qu'un enfant coche « au hasard » alors qu'il ne l'écrirait jamais.
 */
export function enregistrerReponse({ piegeId, exerciceId, correct, palier, raisonnementId, reponseDonnee, horsScore = false }) {
  etat.pieges[piegeId] = apresReponse(etatPiege(piegeId), correct, etat.numeroSeance, palier);
  etat.exercicesVus[exerciceId] = etat.numeroSeance;

  if (seanceEnCours) {
    // `horsScore` sert aux points de contrôle d'une dictée : chacun fait
    // avancer son propre piège — c'est tout l'intérêt d'une dictée, diagnostiquer
    // par difficulté — mais compter six phrases dictées comme trente-quatre
    // réponses rendrait le résumé parents illisible.
    if (!horsScore) seanceEnCours[correct ? 'reussites' : 'echecs'] += 1;
    const compte = (seanceEnCours.parPiege[piegeId] ??= { reussites: 0, echecs: 0 });
    compte[correct ? 'reussites' : 'echecs'] += 1;
    if (raisonnementId) {
      seanceEnCours.raisonnements[raisonnementId] =
        (seanceEnCours.raisonnements[raisonnementId] ?? 0) + 1;
    }
    if (!correct) {
      seanceEnCours.ratesDetail.push({ exerciceId, piegeId, reponseDonnee, raisonnementId });
    }
  }

  sauver();
  return { acquis: estAcquis(etat.pieges[piegeId]) };
}

/**
 * Journalise le raisonnement invoqué après une erreur.
 *
 * Volontairement séparé de `enregistrerReponse` : le dialogue n'est pas une
 * seconde tentative. Les faire passer par le même chemin comptait chaque erreur
 * deux fois — le niveau du piège reculait deux fois et le résumé parents
 * annonçait « 0 sur 42 » pour dix-sept exercices.
 */
export function enregistrerRaisonnement(raisonnementId) {
  if (!seanceEnCours || !raisonnementId) return;
  seanceEnCours.raisonnements[raisonnementId] =
    (seanceEnCours.raisonnements[raisonnementId] ?? 0) + 1;

  // Rattache le raisonnement à l'erreur qui vient d'être commise, pour que la
  // consolidation de mémoire sache non seulement ce qu'il a raté mais pourquoi.
  const dernierRate = seanceEnCours.ratesDetail[seanceEnCours.ratesDetail.length - 1];
  if (dernierRate) dernierRate.raisonnementId = raisonnementId;
  sauver();
}

/** Mémorise un échange avec l'IA, plafonné : sert à ne pas se répéter d'un jour sur l'autre. */
export function memoriserEchange({ piegeId, question, explication }) {
  etat.echanges = [...etat.echanges, { seance: etat.numeroSeance, piegeId, question, explication }]
    .slice(-MAX_ECHANGES_GARDES);
  sauver();
}

export const echangesRecents = (piegeId) =>
  etat.echanges.filter((e) => e.piegeId === piegeId);

/** Clôt la séance, journalise, et renvoie le résumé destiné aux parents. */
export function terminerSeance() {
  if (!seanceEnCours) return null;

  const resume = {
    ...seanceEnCours,
    duree: Math.round((Date.now() - seanceEnCours.debut) / 60000),
    date: new Date().toISOString().slice(0, 10),
    typeDominant: typeDErreurDominant(seanceEnCours.parPiege),
    aRevoir: piegesARevoir().slice(0, 3).map((p) => PIEGES[p.id]?.nom ?? p.id),
  };
  delete resume.debut;

  etat.journal = [...etat.journal, resume].slice(-MAX_SEANCES_JOURNALISEES);
  if (seanceEnCours.parcours >= etat.seanceCourante) {
    etat.seanceCourante = Math.min(seanceEnCours.parcours + 1, 20);
  }
  seanceEnCours = null;
  sauver();
  return resume;
}

/** Le type d'erreur le plus coûteux de la séance — plus utile qu'un score. */
function typeDErreurDominant(parPiege) {
  const rates = Object.entries(parPiege).filter(([, c]) => c.echecs > 0);
  if (!rates.length) return null;
  const [id, compte] = rates.sort((a, b) => b[1].echecs - a[1].echecs)[0];
  return { id, nom: PIEGES[id]?.nom ?? id, echecs: compte.echecs };
}

export const journal = () => etat.journal;
export const derniereSeance = () => etat.journal[etat.journal.length - 1] ?? null;

// --- Mémoire de l'élève -----------------------------------------------------

export function consoliderMemoire({ marche = [], aEviter = [], transversales = [] }) {
  etat.profilFrancais.marche = ajouterNotes(etat.profilFrancais.marche, marche, etat.numeroSeance);
  etat.profilFrancais.aEviter = ajouterNotes(etat.profilFrancais.aEviter, aEviter, etat.numeroSeance);
  transversal.notes = ajouterNotes(transversal.notes, transversales, etat.numeroSeance);
  sauver();
}

/** Suppression d'une observation depuis l'écran parents. */
export function oublierNote(couche, id) {
  if (couche === 'transversal') transversal.notes = supprimerNote(transversal.notes, id);
  else etat.profilFrancais[couche] = supprimerNote(etat.profilFrancais[couche] ?? [], id);
  sauver();
}

export function reinitialiser({ garderCleApi = true } = {}) {
  etat = etatVierge();
  transversal = profilVierge().transversal;
  seanceEnCours = null;
  if (!garderCleApi) definirCleApi('');
  sauver();
}
