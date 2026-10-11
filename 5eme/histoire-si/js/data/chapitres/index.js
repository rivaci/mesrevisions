// Les chapitres du cours d'histoire en section internationale, dans l'ordre
// où Antonin les voit en classe. Un chapitre s'ajoute ici quand il vient d'être
// fait : l'appli commence au chapitre 2, celui du premier devoir sur table.

import ch02 from './ch02-late-middle-ages.js';

export const CHAPITRES = [ch02];

export const chapitreParId = (id) => CHAPITRES.find((c) => c.id === id);

/** Tous les items d'un chapitre, étape par étape. */
export const itemsDe = (chapitre) => chapitre.etapes.flatMap((e) => e.items);

export const itemParId = (chapitre, id) => itemsDe(chapitre).find((i) => i.id === id);
