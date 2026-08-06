// Répétition espacée — comptée en SÉANCES, pas en jours.
//
// ── Ce fichier est un DOUBLON assumé de 6eme/francais/js/srs.js ──────────────
//
// À la virgule près, sauf ce commentaire. C'est volontaire et c'est une
// information : deux applications que rien ne relie — un accord sujet-verbe et
// un calcul littéral — suivent la même mécanique de maîtrise, parce que la
// question posée est la même (« sait-il, ou a-t-il vu ? ») et que la réponse
// ne dépend pas de la matière.
//
// La troisième application était la condition posée pour extraire le moteur
// commun (règle de trois). Ce fichier est la preuve que la condition est
// remplie : c'est le premier candidat à remonter dans commun/.
//
// ── Pourquoi en séances ─────────────────────────────────────────────────────
//
// L'élève peut condenser les séances à raison de deux par jour. Avec des
// intervalles en jours, tout serait repoussé au lendemain et il ne reverrait
// jamais rien dans la même journée — la remédiation ne se déclencherait pas là
// où elle est le plus utile.
//
// L'UNITÉ SUIVIE EST LE PIÈGE, pas l'exercice. Il n'a pas à maîtriser
// l'expression « 3x + 2 » ; il a à maîtriser le fait qu'une somme de termes
// non semblables ne se termine pas. Une dizaine de pièges plutôt que deux
// cents exercices, et le récap parents tombe naturellement en types d'erreur
// plutôt qu'en score.

/** Délai avant nouvelle présentation, en séances, selon le niveau atteint. */
const INTERVALLES = [0, 1, 2, 4, 6, 8];

export const NIVEAU_MAX = INTERVALLES.length - 1;

/** Réussites consécutives exigées pour parler d'acquisition. */
const REUSSITES_POUR_ACQUIS = 3;

/** Séances distinctes exigées : réussir trois fois dans la même séance prouve
 *  surtout qu'on se souvient de la correction reçue dix secondes plus tôt. */
const SEANCES_POUR_ACQUIS = 2;

/** Échecs consécutifs au même palier avant de redescendre d'un cran.
 *
 *  Ajout par rapport au français, exigé par la relecture adversariale de la
 *  charte : l'illusion de linéarité « résiste même à un enseignement ciblé »
 *  (De Bock). Sans redescente, l'élève qui échoue au palier mélangé y serait
 *  représenté indéfiniment — le rituel deviendrait la punition que la charte
 *  interdit explicitement. */
const ECHECS_AVANT_REDESCENTE = 2;

export const etatInitial = () => ({
  niveau: 0,
  revoirALaSeance: 0,
  reussitesConsecutives: 0,
  echecsConsecutifs: 0,
  seancesReussies: [],
  reussites: 0,
  echecs: 0,
  palierMax: 0,
  palierRate: 0,
  palierServi: 1,
});

/**
 * Nouvel état d'un piège après une réponse.
 *
 * `palier` est la difficulté de l'exercice qui vient d'être joué : c'est lui
 * qui empêche de déclarer acquis un calcul réussi seulement quand la consigne
 * annonce quoi faire.
 */
export function apresReponse(etat, correct, numeroSeance, palier = 1) {
  const niveau = correct
    ? Math.min(etat.niveau + 1, NIVEAU_MAX)
    : Math.max(etat.niveau - 1, 0);

  const seancesReussies = correct && !etat.seancesReussies.includes(numeroSeance)
    ? [...etat.seancesReussies, numeroSeance]
    : etat.seancesReussies;

  const echecsConsecutifs = correct ? 0 : etat.echecsConsecutifs + 1;

  return {
    niveau,
    revoirALaSeance: numeroSeance + INTERVALLES[niveau],
    reussitesConsecutives: correct ? etat.reussitesConsecutives + 1 : 0,
    echecsConsecutifs,
    seancesReussies,
    reussites: etat.reussites + (correct ? 1 : 0),
    echecs: etat.echecs + (correct ? 0 : 1),
    // On ne retient un palier que s'il est RÉUSSI : c'est la condition qui
    // distingue « il sait » de « il a vu ».
    palierMax: correct ? Math.max(etat.palierMax, palier) : etat.palierMax,
    palierRate: correct ? etat.palierRate : Math.max(etat.palierRate, palier),
    palierServi: prochainPalier(etat, correct, palier, echecsConsecutifs),
  };
}

/** Le palier auquel reprendre ce piège : on monte en réussissant, on redescend
 *  après deux échecs de suite — jamais en dessous du palier 1. */
function prochainPalier(etat, correct, palier, echecsConsecutifs) {
  if (correct) return Math.max(etat.palierServi, palier);
  if (echecsConsecutifs >= ECHECS_AVANT_REDESCENTE) return Math.max(1, palier - 1);
  return etat.palierServi;
}

/**
 * Un piège est acquis quand il est réussi trois fois de suite, dans au moins
 * deux séances distinctes, ET au palier le plus difficile déjà rencontré.
 *
 * Sans cette dernière condition on déclarerait acquise une règle que l'élève
 * n'exécute que quand la consigne la lui souffle — c'est exactement son
 * problème, ce serait donc précisément la mauvaise mesure.
 */
export function estAcquis(etat) {
  return (
    etat.reussitesConsecutives >= REUSSITES_POUR_ACQUIS &&
    etat.seancesReussies.length >= SEANCES_POUR_ACQUIS &&
    etat.palierMax >= etat.palierRate
  );
}

/** Un piège est à revoir s'il n'a jamais été vu, ou si sa séance est arrivée. */
export const estARevoir = (etat, numeroSeance) =>
  etat.reussites + etat.echecs === 0 || etat.revoirALaSeance <= numeroSeance;

/**
 * Les pièges à reprendre : ceux qui sont dus et pas encore acquis, du plus
 * fragile au moins fragile. On les reprend au début, quand l'attention est
 * intacte, pas à la fin quand l'élève n'en peut plus.
 */
export function fileDeRemediation(entrees, numeroSeance) {
  return entrees
    .filter((e) => !estAcquis(e.etat) && estARevoir(e.etat, numeroSeance))
    .sort((a, b) => {
      const parEchecs = b.etat.echecs - a.etat.echecs;
      return parEchecs !== 0 ? parEchecs : a.etat.niveau - b.etat.niveau;
    });
}

/** Part des pièges acquis, pour la barre de progression globale. */
export function tauxAcquis(entrees) {
  if (!entrees.length) return 0;
  return entrees.filter((e) => estAcquis(e.etat)).length / entrees.length;
}
