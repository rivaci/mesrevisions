// Les unités du manuel, dans l'ordre où Antonin les voit en classe, et les
// lectures faites en classe (`surtitre` : « Lectura »). Un module s'ajoute ici
// quand il vient d'être fait.

import u02 from './u02-describir.js';
import u02m from './u02-memoriza.js';
import l01 from './l01-tio-manuel.js';

export const UNIDADES = [u02, u02m, l01];

export const uniteParId = (id) => UNIDADES.find((u) => u.id === id);

/** Tous les items d'une unité, étape par étape. */
export const itemsDe = (unite) => unite.etapes.flatMap((e) => e.items);

export const itemParId = (unite, id) => itemsDe(unite).find((i) => i.id === id);
