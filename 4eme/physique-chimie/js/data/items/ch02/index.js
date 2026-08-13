// Assemblage du chapitre 2 — La tension électrique.
//
// Même découpage que `ch01/` : un fichier par savoir-faire, assemblé ici et
// nulle part ailleurs. Ce fichier n'AJOUTE rien — toute valeur, tout item, toute
// section vient du fichier de son savoir-faire.
//
// L'ordre est celui de la PROGRESSION du chapitre : le schéma d'abord (sf1),
// puis la topologie qu'il permet de lire (sf2), puis l'appareil qu'on y place
// (sf3) et sa lecture chiffrée (sf4), et enfin les deux lois que cette lecture
// rend vérifiables (sf5 unicité, sf6 additivité), avant le cas d'usage qui les
// mobilise ensemble (sf7 adaptation d'une lampe).
//
// ── Ce que ce chapitre change pour le cercle 3 ──────────────────────────────
//
// Le chapitre 1 n'offrait qu'UN item de cercle 3 sur 175, et `seance.js`
// signalait le plancher de cette bande comme intenable faute de vivier. Les
// quatre premiers savoir-faire d'ici sont de cercle 3 : c'est le chapitre qui
// rend la bande servable, et c'est aussi le premier où la règle de prudence de
// la charte — un savoir-faire de cercle 3 ne s'acquiert pas sur des items de
// cercle 3 seuls — peut être violée. Elle ne l'est pas : chacun des quatre
// porte des items hors cercle 3, et c'est vérifié, pas espéré.

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
export const CHAPITRE = 'ch02-tension-electrique';

/**
 * Les sept savoir-faire, dans l'ordre de la progression.
 *
 * `sections` regroupe les trois blocs de cours du savoir-faire. Leurs FORMES
 * divergent d'un fichier à l'autre, et ce fichier ne les normalise pas : comme
 * dans `ch01/`, normaliser ici masquerait la divergence au lieu de la rendre
 * visible.
 */
export const SAVOIR_FAIRE = Object.freeze([
  { sf: 'ch02-sf1-schematiser-un-circuit', items: sf1, sections: Object.freeze({ decouverte: D1, cours: C1, methode: M1 }) },
  { sf: 'ch02-sf2-distinguer-serie-et-derivation', items: sf2, sections: Object.freeze({ decouverte: D2, cours: C2, methode: M2 }) },
  { sf: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication', items: sf3, sections: Object.freeze({ decouverte: D3, cours: C3, methode: M3 }) },
  { sf: 'ch02-sf4-lire-une-tension-avec-son-calibre', items: sf4, sections: Object.freeze({ decouverte: D4, cours: C4, methode: M4 }) },
  { sf: 'ch02-sf5-loi-d-unicite-des-tensions', items: sf5, sections: Object.freeze({ decouverte: D5, cours: C5, methode: M5 }) },
  { sf: 'ch02-sf6-loi-d-additivite-des-tensions', items: sf6, sections: Object.freeze({ decouverte: D6, cours: C6, methode: M6 }) },
  { sf: 'ch02-sf7-verifier-l-adaptation-d-une-lampe', items: sf7, sections: Object.freeze({ decouverte: D7, cours: C7, methode: M7 }) },
].map(Object.freeze));

/** Tous les items du chapitre, à plat, dans l'ordre de la progression. */
export const ITEMS = Object.freeze(SAVOIR_FAIRE.flatMap((s) => s.items));

export const itemsDuSavoirFaire = (id) => SAVOIR_FAIRE.find((s) => s.sf === id)?.items ?? [];

export default ITEMS;
