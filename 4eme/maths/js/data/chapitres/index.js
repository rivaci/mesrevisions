// Assemblage des chapitres.
//
// Un fichier par chapitre : ça permet de les écrire et de les corriger
// indépendamment, sans qu'une modification du chapitre 7 puisse abîmer le 2.
//
// L'ordre est celui d'une PROGRESSION, pas d'un sommaire de manuel. Les
// éditeurs classent par thème — Pythagore se retrouve au chapitre 12 ou 16 —
// alors que les progressions de professeurs le placent au 2 ou au 3, parce
// qu'il est réinvesti toute l'année. Voir le programme dans le dépôt Merlin.

import ch01 from './ch01-relatifs.js';
import ch02 from './ch02-divisibilite.js';
import ch03 from './ch03-pythagore.js';
import ch04 from './ch04-rationnels.js';
import ch05 from './ch05-proportionnalite.js';
import ch06 from './ch06-puissances.js';
import ch07 from './ch07-calcul-litteral.js';
import ch08 from './ch08-statistiques.js';

export const CHAPITRES = [ch01, ch02, ch03, ch04, ch05, ch06, ch07, ch08];

export const chapitreParNumero = (n) => CHAPITRES.find((c) => c.numero === n);

/** Tous les savoir-faire à plat, avec le chapitre d'où ils viennent. */
export const TOUS_SAVOIR_FAIRE = CHAPITRES.flatMap((c) =>
  c.savoirFaire.map((sf) => ({ ...sf, chapitre: c.numero })));
