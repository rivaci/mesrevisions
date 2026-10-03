// Les chapitres de SVT, dans l'ordre où Evan les voit en classe. Un chapitre
// s'ajoute ici quand il vient d'être fait.

import ch01 from './ch01-genetique.js';

export const CHAPITRES = [ch01];

export const chapitreParId = (id) => CHAPITRES.find((c) => c.id === id);

/** Tous les items d'un chapitre, étape par étape. */
export const itemsDe = (chapitre) => chapitre.etapes.flatMap((e) => e.items);

export const itemParId = (chapitre, id) => itemsDe(chapitre).find((i) => i.id === id);
