// Assemblage des chapitres.
//
// Un fichier par chapitre, et un fichier par savoir-faire à l'intérieur : ça
// permet de les écrire et de les corriger indépendamment, sans qu'une
// modification de l'un puisse abîmer l'autre.
//
// L'ordre est celui du COURS D'ANTONIN, pas celui d'un manuel. Cette
// application se remplit au fur et à mesure de l'année : chaque chapitre est
// ajouté quand il vient d'être vu en classe, pendant qu'il est encore frais.

import ch01 from './ch01-operations.js';

export const CHAPITRES = [ch01];

export const chapitreParNumero = (n) => CHAPITRES.find((c) => c.numero === n);

/** Tous les savoir-faire à plat, avec le chapitre d'où ils viennent. */
export const TOUS_SAVOIR_FAIRE = CHAPITRES.flatMap((c) =>
  c.savoirFaire.map((sf) => ({ ...sf, chapitre: c.numero })));
