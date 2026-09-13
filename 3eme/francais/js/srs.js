// Répétition espacée — comptée en SÉANCES, pas en jours.
//
// C'est la différence de fond avec l'appli d'histoire-géo, et elle est
// délibérée : Anto peut condenser les vingt séances en deux semaines à raison
// de deux par jour. Avec des intervalles en jours, tout serait repoussé au
// lendemain et il ne reverrait jamais rien dans la même journée — la
// remédiation ne se déclencherait pas là où elle est le plus utile.
//
// L'UNITÉ SUIVIE EST LE PIÈGE, pas l'exercice. Anto n'a pas à maîtriser la
// phrase « le panier des chats » ; il a à maîtriser l'écran du complément du
// nom. Une quinzaine de pièges plutôt que deux cents exercices, et le résumé
// pour les parents tombe naturellement en types d'erreur plutôt qu'en score.

/** Délai avant nouvelle présentation, en séances, selon le niveau atteint. */
const INTERVALLES = [0, 1, 2, 4, 6, 8];

export const NIVEAU_MAX = INTERVALLES.length - 1;

/** Réussites consécutives exigées pour parler d'acquisition. */
const REUSSITES_POUR_ACQUIS = 3;

/** Séances distinctes exigées : réussir trois fois dans la même séance prouve
 *  surtout qu'on se souvient de la correction reçue dix secondes plus tôt. */
const SEANCES_POUR_ACQUIS = 2;

export const etatInitial = () => ({
  niveau: 0,
  revoirALaSeance: 0,
  reussitesConsecutives: 0,
  seancesReussies: [],
  reussites: 0,
  echecs: 0,
  palierMax: 0,
  palierRate: 0,
});

/**
 * Nouvel état d'un piège après une réponse.
 *
 * `palier` est la difficulté de l'exercice qui vient d'être joué : c'est lui
 * qui empêche de déclarer acquis un accord réussi seulement quand le sujet
 * touche le verbe.
 */
export function apresReponse(etat, correct, numeroSeance, palier = 1) {
  const niveau = correct
    ? Math.min(etat.niveau + 1, NIVEAU_MAX)
    : Math.max(etat.niveau - 1, 0);

  const seancesReussies = correct && !etat.seancesReussies.includes(numeroSeance)
    ? [...etat.seancesReussies, numeroSeance]
    : etat.seancesReussies;

  return {
    niveau,
    revoirALaSeance: numeroSeance + INTERVALLES[niveau],
    reussitesConsecutives: correct ? etat.reussitesConsecutives + 1 : 0,
    seancesReussies,
    reussites: etat.reussites + (correct ? 1 : 0),
    echecs: etat.echecs + (correct ? 0 : 1),
    // On ne retient un palier que s'il est RÉUSSI : c'est la condition qui
    // distingue « il sait » de « il a vu ».
    palierMax: correct ? Math.max(etat.palierMax, palier) : etat.palierMax,
    palierRate: correct ? etat.palierRate : Math.max(etat.palierRate, palier),
  };
}

/**
 * Un piège est acquis quand il est réussi trois fois de suite, dans au moins
 * deux séances distinctes, ET au palier le plus difficile déjà rencontré.
 *
 * Sans cette dernière condition on déclarerait acquis un accord qu'Anto
 * réussit quand le sujet colle au verbe et rate dès qu'un écran s'intercale —
 * c'est exactement son problème, ce serait donc précisément la mauvaise
 * mesure.
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
 * Les pièges à reprendre en début de séance : ceux qui sont dus et pas encore
 * acquis, du plus fragile au moins fragile.
 *
 * C'est la « file de remédiation » demandée — on la reprend au début, quand
 * l'attention est intacte, pas à la fin quand l'élève n'en peut plus.
 */
export function fileDeRemediation(entrees, numeroSeance) {
  return entrees
    .filter((e) => !estAcquis(e.etat) && estARevoir(e.etat, numeroSeance))
    .sort((a, b) => {
      // Le plus raté d'abord ; à égalité, le plus bas niveau.
      const parEchecs = b.etat.echecs - a.etat.echecs;
      return parEchecs !== 0 ? parEchecs : a.etat.niveau - b.etat.niveau;
    });
}

/** Part des pièges acquis, pour la barre de progression globale. */
export function tauxAcquis(entrees) {
  if (!entrees.length) return 0;
  return entrees.filter((e) => estAcquis(e.etat)).length / entrees.length;
}
