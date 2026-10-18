// Les chapitres d'histoire, de géographie et d'EMC, dans l'ordre où Evan les
// voit en classe. Un chapitre s'ajoute ici quand il vient d'être fait ;
// l'accueil les range par discipline (`matiere`).

import ch01 from './ch01-aires-urbaines.js';
import emc01 from './emc01-engagement.js';
import h01 from './h01-premiere-guerre.js';

export const CHAPITRES = [ch01, emc01, h01];

export const chapitreParId = (id) => CHAPITRES.find((c) => c.id === id);

/** Tous les items d'un chapitre, étape par étape. */
export const itemsDe = (chapitre) => chapitre.etapes.flatMap((e) => e.items);

export const itemParId = (chapitre, id) => itemsDe(chapitre).find((i) => i.id === id);
