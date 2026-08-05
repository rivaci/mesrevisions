// Assemblage des vingt séances.
//
// Un fichier par séance : ça permet de les rédiger et de les corriger
// indépendamment, sans qu'une modification de la séance 12 puisse abîmer la 3.

import s01 from './s01.js';
import s02 from './s02.js';
import s03 from './s03.js';
import s04 from './s04.js';
import s05 from './s05.js';
import s06 from './s06.js';
import s07 from './s07.js';
import s08 from './s08.js';
import s09 from './s09.js';
import s10 from './s10.js';
import s11 from './s11.js';
import s12 from './s12.js';
import s13 from './s13.js';
import s14 from './s14.js';
import s15 from './s15.js';
import s16 from './s16.js';
import s17 from './s17.js';
import s18 from './s18.js';
import s19 from './s19.js';
import s20 from './s20.js';

export const SEANCES = [
  s01, s02, s03, s04, s05, s06, s07, s08, s09, s10,
  s11, s12, s13, s14, s15, s16, s17, s18, s19, s20,
];

export const BLOCS = [
  { numero: 1, titre: 'Reconnaître et conjuguer', seances: [1, 2, 3, 4, 5] },
  { numero: 2, titre: "L'accord sujet-verbe, palier par palier", seances: [6, 7, 8, 9, 10] },
  { numero: 3, titre: 'Les terminaisons qui trompent l\'oreille', seances: [11, 12, 13, 14, 15] },
  { numero: 4, titre: 'Groupe nominal et dictée', seances: [16, 17, 18, 19, 20] },
];

export const seanceParNumero = (n) => SEANCES.find((s) => s.numero === n);

/**
 * Tous les exercices, à plat, avec le numéro de leur séance.
 *
 * Sert à la remédiation : quand un piège de la séance 6 est encore fragile à
 * la séance 12, il faut pouvoir retrouver un exercice qui le travaille — et
 * surtout un qu'Anto n'a pas déjà vu, sinon on teste sa mémoire de la
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
