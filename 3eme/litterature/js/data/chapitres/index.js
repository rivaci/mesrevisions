// Les cours de littérature d'Evan, dans l'ordre où ils arrivent.
// Un chapitre s'ajoute ici avant chaque contrôle.

import ch01 from './ch01-autobiographie.js';

export const CHAPITRES = [ch01];

export const chapitreParId = (id) => CHAPITRES.find((c) => c.id === id);

/** Tous les items d'un chapitre, étape par étape. */
export const itemsDe = (chapitre) => chapitre.etapes.flatMap((e) => e.items);

export const itemParId = (chapitre, id) => itemsDe(chapitre).find((i) => i.id === id);
