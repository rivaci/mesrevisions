// Progression de l'élève, conservée dans le navigateur.
//
// Rien ne sort de l'appareil : pas de compte, pas de serveur, pas de donnée
// personnelle. C'est ce qui permet de partager le lien à toute une classe sans
// avoir à gérer le moindre consentement.
//
// Conséquence à assumer : la progression est propre à un navigateur. Changer
// d'appareil ou vider l'historique la remet à zéro.

import { etatInitial, apresReponse, aujourdHui, estAcquis, NIVEAU_ACQUIS } from './srs.js';
import { ETAPES, itemsDeLEtape } from './data/parcours.js';

const CLE_STOCKAGE = 'revisions-3e.v1';

/** Bonnes réponses visées chaque jour. Assez pour progresser, assez court pour s'y mettre. */
export const OBJECTIF_QUOTIDIEN = 20;

const XP_BONNE_REPONSE = 10;
const XP_DEFI_REUSSI = 100;

export const RANGS = [
  { seuil: 0, nom: 'Apprenti', icone: '🌱' },
  { seuil: 300, nom: 'Explorateur', icone: '🧭' },
  { seuil: 800, nom: 'Cartographe', icone: '🗺️' },
  { seuil: 1500, nom: 'Historien', icone: '📜' },
  { seuil: 2500, nom: 'Stratège', icone: '♟️' },
  { seuil: 4000, nom: 'Expert', icone: '🎓' },
  { seuil: 6000, nom: 'Maître', icone: '👑' },
];

const etatVierge = () => ({
  version: 1,
  xp: 0,
  items: {},
  defis: {},           // etapeId -> meilleur score (0..1)
  badges: [],          // ids déjà obtenus, dans l'ordre d'obtention
  serie: { jours: 0, dernierJour: null },
  jour: { date: null, bonnesReponses: 0 },
});

let etat = charger();

function charger() {
  try {
    const brut = localStorage.getItem(CLE_STOCKAGE);
    if (!brut) return etatVierge();
    const lu = JSON.parse(brut);
    // Un état écrit par une version antérieure du format n'est pas migré :
    // reprendre à zéro vaut mieux qu'un affichage incohérent.
    return lu.version === 1 ? { ...etatVierge(), ...lu } : etatVierge();
  } catch {
    return etatVierge();
  }
}

function sauver() {
  try {
    localStorage.setItem(CLE_STOCKAGE, JSON.stringify(etat));
  } catch {
    // Stockage plein ou refusé (navigation privée) : l'appli reste jouable,
    // seule la progression est perdue à la fermeture.
  }
}

export const lireEtat = () => etat;

export const etatItem = (cle) => etat.items[cle] ?? etatInitial();

/** Toutes les connaissances du programme, tous parcours confondus. */
export const toutesLesCles = () => ETAPES.flatMap((e) => itemsDeLEtape(e).map((i) => i.cle));

// --- Réponses ---------------------------------------------------------------

/**
 * Enregistre une réponse et renvoie ce qu'elle a rapporté, pour que
 * l'interface puisse l'annoncer (XP gagnés, nouveaux badges…).
 */
export function enregistrerReponse(cle, correct) {
  const avant = etatItem(cle);
  const apres = apresReponse(avant, correct);
  etat.items[cle] = apres;

  const xpGagnes = correct ? XP_BONNE_REPONSE : 0;
  etat.xp += xpGagnes;

  majJour(correct);
  const nouveauxBadges = majBadges();
  sauver();

  return {
    xpGagnes,
    nouveauxBadges,
    vientDEtreAcquis: correct && !estAcquis(avant) && estAcquis(apres),
  };
}

/** Enregistre le résultat d'un défi de fin d'étape. Renvoie true si l'étape est validée. */
export function enregistrerDefi(etapeId, score) {
  etat.defis[etapeId] = Math.max(etat.defis[etapeId] ?? 0, score);
  etat.xp += Math.round(XP_DEFI_REUSSI * score);
  // Pas de mise à jour de la série ici : les réponses du défi sont déjà passées
  // une à une par enregistrerReponse, qui s'en charge.
  const nouveauxBadges = majBadges();
  sauver();
  return { nouveauxBadges };
}

function majJour(correct) {
  const date = aujourdHui();
  if (etat.jour.date !== date) etat.jour = { date, bonnesReponses: 0 };
  if (correct) etat.jour.bonnesReponses += 1;
  if (etat.jour.bonnesReponses >= OBJECTIF_QUOTIDIEN) majSerie();
}

/** La série compte les jours consécutifs où l'objectif a été atteint. */
function majSerie() {
  const date = aujourdHui();
  if (etat.serie.dernierJour === date) return;

  const hier = new Date(new Date(`${date}T00:00:00`).getTime() - 86400000)
    .toISOString().slice(0, 10);
  etat.serie = {
    jours: etat.serie.dernierJour === hier ? etat.serie.jours + 1 : 1,
    dernierJour: date,
  };
}

// --- Progression ------------------------------------------------------------

/** Part des connaissances acquises parmi une liste de clés (0 à 1). */
export function tauxAcquis(cles) {
  if (!cles.length) return 0;
  const acquis = cles.filter((c) => estAcquis(etatItem(c))).length;
  return acquis / cles.length;
}

/** Avancement d'une étape : détaillé, pour l'affichage. */
export function progressionEtape(etape) {
  const cles = itemsDeLEtape(etape).map((i) => i.cle);
  const niveaux = cles.map((c) => etatItem(c).niveau);
  return {
    total: cles.length,
    acquis: niveaux.filter((n) => n >= NIVEAU_ACQUIS).length,
    commences: niveaux.filter((n) => n > 0).length,
    taux: tauxAcquis(cles),
    meilleurDefi: etat.defis[etape.id] ?? 0,
  };
}

/**
 * Une étape s'ouvre quand la précédente DE SA MATIÈRE a été travaillée.
 *
 * Deux parcours en parallèle, géographie et histoire, plutôt qu'une file
 * unique : l'évaluation porte sur les deux, et devoir finir toute la géo avant
 * de toucher aux dates serait absurde à quelques jours de la rentrée.
 *
 * Le déblocage se fait sur l'entraînement, pas sur le défi : rester coincé
 * faute d'avoir réussi un défi décourage plus que ça ne motive.
 */
export function etapeAccessible(etape) {
  const memeMatiere = ETAPES.filter((e) => e.matiere === etape.matiere);
  const index = memeMatiere.indexOf(etape);
  if (index === 0) return true;

  const p = progressionEtape(memeMatiere[index - 1]);
  return p.commences >= Math.ceil(p.total * 0.5) || p.meilleurDefi > 0;
}

export function rang() {
  const atteints = RANGS.filter((r) => etat.xp >= r.seuil);
  const actuel = atteints[atteints.length - 1];
  const suivant = RANGS[atteints.length] ?? null;
  return {
    ...actuel,
    suivant,
    versSuivant: suivant
      ? (etat.xp - actuel.seuil) / (suivant.seuil - actuel.seuil)
      : 1,
  };
}

// --- Badges -----------------------------------------------------------------

const tousAcquisDe = (themeId) => {
  const cles = toutesLesCles().filter((c) => c.startsWith(`${themeId}:`));
  return cles.length > 0 && cles.every((c) => estAcquis(etatItem(c)));
};

export const BADGES = [
  { id: 'premier-pas', nom: 'Premier pas', icone: '🌱', description: 'Répondre à sa première question', gagne: (e) => Object.keys(e.items).length > 0 },
  { id: 'cartographe', nom: 'Cartographe', icone: '🗺️', description: 'Situer les 13 régions', gagne: () => tousAcquisDe('regions-carte') },
  { id: 'prefet', nom: 'Préfet', icone: '🏛️', description: 'Connaître les 13 capitales de région', gagne: () => tousAcquisDe('regions-capitale') },
  { id: 'outre-mer', nom: 'Tour du monde', icone: '🏝️', description: 'Maîtriser les 5 DROM', gagne: () => tousAcquisDe('drom-carte') && tousAcquisDe('drom-capitale') },
  { id: 'relief', nom: 'Arpenteur', icone: '🏔️', description: 'Situer fleuves, massifs et mers', gagne: () => tousAcquisDe('fleuves-carte') && tousAcquisDe('massifs-carte') && tousAcquisDe('mers-carte') },
  { id: 'les-27', nom: 'Les 27', icone: '🇪🇺', description: "Placer les 27 pays de l'Union européenne", gagne: () => tousAcquisDe('ue-carte') },
  { id: 'chronologue', nom: 'Chronologue', icone: '📜', description: 'Maîtriser les 23 dates', gagne: () => tousAcquisDe('dates') },
  { id: 'biographe', nom: 'Biographe', icone: '👤', description: 'Maîtriser les 21 personnages', gagne: () => tousAcquisDe('personnages') },
  { id: 'serie-3', nom: 'Régulier', icone: '🔥', description: "Atteindre l'objectif 3 jours de suite", gagne: (e) => e.serie.jours >= 3 },
  { id: 'serie-7', nom: 'Increvable', icone: '⚡', description: "Atteindre l'objectif 7 jours de suite", gagne: (e) => e.serie.jours >= 7 },
  { id: 'sans-faute', nom: 'Sans faute', icone: '💯', description: 'Réussir un défi sans aucune erreur', gagne: (e) => Object.values(e.defis).some((s) => s === 1) },
  { id: 'pret', nom: 'Prêt pour la rentrée', icone: '🎓', description: 'Maîtriser tout le programme', gagne: () => tauxAcquis(toutesLesCles()) === 1 },
];

/** Ajoute les badges nouvellement mérités et renvoie ceux qui viennent de tomber. */
function majBadges() {
  const nouveaux = BADGES.filter((b) => !etat.badges.includes(b.id) && b.gagne(etat));
  etat.badges.push(...nouveaux.map((b) => b.id));
  return nouveaux;
}

// --- Remise à zéro ----------------------------------------------------------

export function reinitialiser() {
  etat = etatVierge();
  sauver();
}
