// Répétition espacée, façon système de Leitner.
//
// Le principe : une connaissance réussie revient de plus en plus tard, une
// connaissance ratée revient tout de suite. C'est ce qui différencie une
// révision efficace d'une relecture — l'élève repasse du temps là où il en a
// besoin, pas sur ce qu'il sait déjà.
//
// Les intervalles sont volontairement courts. La fiche annonce une évaluation
// à la rentrée : réviser sur quelques semaines, pas sur un an.

/** Délai avant nouvelle révision, en jours, selon le niveau atteint. */
const INTERVALLES = [0, 1, 2, 4, 8, 15];

/** Au-delà de ce niveau, la connaissance est considérée comme acquise. */
export const NIVEAU_ACQUIS = 4;

export const NIVEAU_MAX = INTERVALLES.length - 1;

/** État de départ d'une connaissance jamais rencontrée. */
export const etatInitial = () => ({ niveau: 0, revoirLe: null, reussites: 0, echecs: 0 });

const JOUR_MS = 86400000;

/** Date du jour au format AAAA-MM-JJ, en heure locale. */
export function aujourdHui(maintenant = new Date()) {
  const decalage = maintenant.getTimezoneOffset() * 60000;
  return new Date(maintenant.getTime() - decalage).toISOString().slice(0, 10);
}

const ajouterJours = (isoDate, jours) =>
  aujourdHui(new Date(new Date(`${isoDate}T00:00:00`).getTime() + jours * JOUR_MS));

/**
 * Nouvel état d'une connaissance après une réponse.
 *
 * Une erreur ne remet pas à zéro : elle fait reculer d'un cran. Repartir de
 * zéro à chaque faute est décourageant et efface un progrès réel.
 */
export function apresReponse(etat, correct, jour = aujourdHui()) {
  const niveau = correct
    ? Math.min(etat.niveau + 1, NIVEAU_MAX)
    : Math.max(etat.niveau - 1, 0);

  return {
    niveau,
    revoirLe: ajouterJours(jour, INTERVALLES[niveau]),
    reussites: etat.reussites + (correct ? 1 : 0),
    echecs: etat.echecs + (correct ? 0 : 1),
  };
}

export const estAcquis = (etat) => etat.niveau >= NIVEAU_ACQUIS;

/** Une connaissance est à revoir si elle est nouvelle ou si sa date est passée. */
export const estARevoir = (etat, jour = aujourdHui()) =>
  !etat.revoirLe || etat.revoirLe <= jour;

/**
 * Ordonne les connaissances pour une séance : d'abord ce qui est dû, en
 * commençant par les niveaux les plus bas — donc par ce qui est le moins su.
 */
export function ordonnerPourSeance(entrees, jour = aujourdHui()) {
  const dues = entrees.filter((e) => estARevoir(e.etat, jour));
  const reste = entrees.filter((e) => !estARevoir(e.etat, jour));
  const parNiveau = (a, b) => a.etat.niveau - b.etat.niveau;
  return [...dues.sort(parNiveau), ...reste.sort(parNiveau)];
}
