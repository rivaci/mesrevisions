// Les unités du manuel, dans l'ordre où Evan les voit en classe.
// Une unité s'ajoute ici quand elle vient d'être faite.

import u01 from './u01-gente-creativa.js';

export const UNIDADES = [u01];

export const uniteParId = (id) => UNIDADES.find((u) => u.id === id);

/** Tous les items d'une unité, étape par étape. */
export const itemsDe = (unite) => unite.etapes.flatMap((e) => e.items);

export const itemParId = (unite, id) => itemsDe(unite).find((i) => i.id === id);
