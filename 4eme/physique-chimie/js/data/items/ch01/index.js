// Assemblage du chapitre 1 — Mélanges, corps purs et solubilité.
//
// Un fichier par savoir-faire : ça permet de les écrire et de les corriger
// indépendamment, sans qu'une modification du savoir-faire 6 puisse abîmer le 2.
// C'est le même découpage que `4eme/maths/js/data/chapitres/`, un cran plus bas :
// là-bas un fichier par chapitre, ici un fichier par savoir-faire, parce qu'un
// savoir-faire de physique-chimie porte à lui seul ses neuf à treize items, ses
// trois sections et ses pièges.
//
// L'ordre est celui de la PROGRESSION du chapitre, pas d'un sommaire : corps pur
// et mélange d'abord (sf1, sf2), puis les deux critères qui les départagent
// (sf3 température de changement d'état, sf4 miscibilité), puis la solubilité
// (sf5 la série, sf6 la courbe), puis le cas du gaz dissous (sf7).
//
// Ce fichier n'AJOUTE rien : il ne fait qu'assembler. Toute valeur, tout item,
// toute section vient du fichier de son savoir-faire, et un item qui n'y est pas
// n'existe pas.

import sf1, { DECOUVERTE as D1, COURS as C1, METHODE as M1 } from './sf1.js';
import sf2, { DECOUVERTE as D2, COURS as C2, METHODE as M2 } from './sf2.js';
import sf3, { DECOUVERTE as D3, COURS as C3, METHODE as M3 } from './sf3.js';
import sf4, { DECOUVERTE as D4, COURS as C4, METHODE as M4 } from './sf4.js';
import sf5, { DECOUVERTE as D5, COURS as C5, METHODE as M5 } from './sf5.js';
import sf6, { DECOUVERTE as D6, COURS as C6, METHODE as M6 } from './sf6.js';
import sf7, { DECOUVERTE as D7, COURS as C7, METHODE as M7 } from './sf7.js';

/** L'identifiant du chapitre dans `js/data/savoir-faire.js`. Il n'est pas
 *  redéclaré ici : le contrôle vérifie que chaque item le porte, et un chapitre
 *  nommé à deux endroits finit par l'être de deux façons. */
export const CHAPITRE = 'ch01-melanges-et-solubilite';

/**
 * Les sept savoir-faire, dans l'ordre de la progression.
 *
 * `sections` regroupe les trois blocs de cours du savoir-faire. Leurs FORMES
 * divergent d'un fichier à l'autre — `COURS` est tantôt un tableau de blocs
 * typés, tantôt un objet à `points` ou à `blocs` — et ce fichier ne les
 * normalise pas : normaliser ici masquerait la divergence au lieu de la rendre
 * visible, et aucun consommateur ne lit encore ces sections.
 */
export const SAVOIR_FAIRE = Object.freeze([
  { sf: 'ch01-sf1-distinguer-corps-pur-et-melange', items: sf1, sections: Object.freeze({ decouverte: D1, cours: C1, methode: M1 }) },
  { sf: 'ch01-sf2-distinguer-melange-homogene-et-heterogene', items: sf2, sections: Object.freeze({ decouverte: D2, cours: C2, methode: M2 }) },
  { sf: 'ch01-sf3-identifier-un-corps-pur-par-sa-temperature', items: sf3, sections: Object.freeze({ decouverte: D3, cours: C3, methode: M3 }) },
  { sf: 'ch01-sf4-prevoir-la-miscibilite-de-deux-liquides', items: sf4, sections: Object.freeze({ decouverte: D4, cours: C4, methode: M4 }) },
  { sf: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite', items: sf5, sections: Object.freeze({ decouverte: D5, cours: C5, methode: M5 }) },
  { sf: 'ch01-sf6-exploiter-une-courbe-de-solubilite', items: sf6, sections: Object.freeze({ decouverte: D6, cours: C6, methode: M6 }) },
  { sf: 'ch01-sf7-decrire-la-dissolution-d-un-gaz', items: sf7, sections: Object.freeze({ decouverte: D7, cours: C7, methode: M7 }) },
].map(Object.freeze));

/** Tous les items du chapitre, à plat, dans l'ordre de la progression. */
export const ITEMS = Object.freeze(SAVOIR_FAIRE.flatMap((s) => s.items));

export const itemsDuSavoirFaire = (id) => SAVOIR_FAIRE.find((s) => s.sf === id)?.items ?? [];

export default ITEMS;
