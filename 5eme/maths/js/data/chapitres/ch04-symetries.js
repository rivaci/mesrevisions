// Chapitre 4 — Symétries.
//
// ── D'où vient ce chapitre ───────────────────────────────────────────────
//
// Du point 4 de la liste de la professeure, écrit avant le cours d'Antonin :
//
//   · [EIB] rappels : symétrie axiale, médiatrice (tracé et propriétés),
//     définition du milieu ;
//   · demi-tour (symétrie centrale) et ses propriétés.
//
// Les deux premiers savoir-faire sont les rappels du parcours EIB, les deux
// suivants la notion nouvelle. L'ordre compte : la symétrie centrale se
// définit par le MILIEU, et se comprend par contraste avec le pliage.
//
// ── Les figures ──────────────────────────────────────────────────────────
//
// Tout se construit sur le repère quadrillé de js/figures-plan.js, avec un
// axe (d) tracé en pointillés quand il en faut un. Le contrôle de contenu
// recalcule chaque symétrique, chaque milieu, et dit si la droite tracée est
// bien la médiatrice annoncée.

import sf41 from './ch04/sf-4-1.js';
import sf42 from './ch04/sf-4-2.js';
import sf43 from './ch04/sf-4-3.js';
import sf44 from './ch04/sf-4-4.js';

export default {
  numero: 4,
  titre: 'Symétries',
  theme: 'Espace et géométrie',
  trimestre: 1,
  programme: '2025',
  prerequis: [
    'Construire le symétrique d\'un point par rapport à une droite (6e)',
    'Lire les coordonnées d\'un point dans un repère (chapitre 3)',
  ],
  savoirFaire: [sf41, sf42, sf43, sf44],
};
