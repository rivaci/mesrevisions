// Assemblage des séances.
//
// Un fichier par séance : ça permet de les rédiger et de les corriger
// indépendamment, sans qu'une modification de l'une puisse abîmer l'autre.
//
// L'ordre est celui du COURS D'EVAN. L'application se remplit au fil de
// l'année : chaque leçon devient un bloc, ajouté quand elle vient d'être vue
// en classe. Les numéros de séance disent l'ordre d'écriture, pas une
// progression imposée.

import s01 from './s01.js';
import s02 from './s02.js';
import s03 from './s03.js';
import s04 from './s04.js';

export const SEANCES = [s01, s02, s03, s04];

export const BLOCS = [
  { numero: 1, titre: 'Les classes grammaticales', seances: [1, 2, 3, 4] },
];

export const seanceParNumero = (n) => SEANCES.find((s) => s.numero === n);

/**
 * Tous les exercices, à plat, avec le numéro de leur séance.
 *
 * Sert à la remédiation : quand un piège de la séance 6 est encore fragile à
 * la séance 12, il faut pouvoir retrouver un exercice qui le travaille — et
 * surtout un qu'Evan n'a pas déjà vu, sinon on teste sa mémoire de la
 * correction plutôt que la règle.
 */
export const TOUS_EXERCICES = SEANCES.flatMap((s) =>
  s.exercices.map((ex) => ({ ...ex, seance: s.numero })),
);

/** Les exercices qui travaillent un piège donné, hors dictées. */
export const exercicesDuPiege = (piegeId) =>
  TOUS_EXERCICES.filter((ex) => ex.piege === piegeId && ex.type !== 'dictee');

/** Tous les pièges effectivement travaillés par le contenu. */
export const piegesUtilises = () => {
  const vus = new Set();
  for (const ex of TOUS_EXERCICES) {
    if (ex.piege) vus.add(ex.piege);
    for (const p of ex.pointsControle ?? []) if (p.piege) vus.add(p.piege);
  }
  return [...vus];
};
