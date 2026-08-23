// Assemblage des chapitres.
//
// Un fichier par chapitre : ça permet de les écrire et de les corriger
// indépendamment, sans qu'une modification de l'un puisse abîmer l'autre.
//
// L'ordre est celui d'une PROGRESSION de révision, pas d'un sommaire de manuel.
// Les décimaux viennent en premier parce que leur obstacle empoisonne tout le
// reste : un élève qui croit 2,54 > 2,7 se trompera aussi sur les fractions,
// les aires et la proportionnalité, sans qu'on comprenne pourquoi.

import ch01 from './ch01-decimaux.js';
import ch02 from './ch02-fractions.js';
import ch03 from './ch03-diviser-arrondir.js';
import ch04 from './ch04-proportionnalite.js';
import ch05 from './ch05-grandeurs.js';

export const CHAPITRES = [ch01, ch02, ch03, ch04, ch05];

export const chapitreParNumero = (n) => CHAPITRES.find((c) => c.numero === n);

/** Tous les savoir-faire à plat, avec le chapitre d'où ils viennent. */
export const TOUS_SAVOIR_FAIRE = CHAPITRES.flatMap((c) =>
  c.savoirFaire.map((sf) => ({ ...sf, chapitre: c.numero })));
