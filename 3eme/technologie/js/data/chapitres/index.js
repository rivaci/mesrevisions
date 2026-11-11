// Les chapitres de technologie, dans l'ordre des fiches du cours d'Evan.
// Un chapitre s'ajoute ici quand de nouvelles fiches arrivent.

import ch01 from './ch01-objets-techniques.js';
import ch02 from './ch02-energie-reseau.js';

export const CHAPITRES = [ch01, ch02];

export const chapitreParId = (id) => CHAPITRES.find((c) => c.id === id);

/** Tous les items d'un chapitre, étape par étape. */
export const itemsDe = (chapitre) => chapitre.etapes.flatMap((e) => e.items);

export const itemParId = (chapitre, id) => itemsDe(chapitre).find((i) => i.id === id);
