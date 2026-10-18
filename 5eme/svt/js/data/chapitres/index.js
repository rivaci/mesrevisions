// Les chapitres de SVT, dans l'ordre où Antonin les voit en classe. Un
// chapitre s'ajoute ici quand il vient d'être fait : l'appli commence au
// chapitre 2, l'activité interne de la Terre.

import ch01 from './ch02-volcans-seismes.js';

export const CHAPITRES = [ch01];

export const chapitreParId = (id) => CHAPITRES.find((c) => c.id === id);

/** Tous les items d'un chapitre, étape par étape. */
export const itemsDe = (chapitre) => chapitre.etapes.flatMap((e) => e.items);

export const itemParId = (chapitre, id) => itemsDe(chapitre).find((i) => i.id === id);
