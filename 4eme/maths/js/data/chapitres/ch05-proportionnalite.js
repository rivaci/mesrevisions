// Chapitre 5 — Proportionnalité et grandeurs composées.
//
// ── Le chapitre le plus piégeux du programme ──────────────────────────────
//
// L'illusion de linéarité — croire que si une grandeur double, l'autre double
// aussi — est le piège le mieux documenté de tout le cycle 4. De Bock et
// Verschaffel ont mesuré plus de 90 % d'échec chez les élèves de 12-13 ans sur
// les agrandissements d'aires, et surtout : l'erreur RÉSISTE à un enseignement
// qui la vise explicitement.
//
// La seule chose qui marche, selon leurs travaux, c'est d'exposer
// systématiquement à des contre-exemples NON proportionnels MÊLÉS aux
// proportionnels — et de faire juger le modèle avant de calculer. D'où
// l'insistance de ce chapitre sur les items où la proportionnalité ne
// s'applique pas.
//
// ── Ce que ce chapitre n'a PAS ────────────────────────────────────────────
//
// Ni ratio, ni coefficient multiplicateur nommé : les repères les placent en
// 3e. Ici on parle de coefficient de proportionnalité et de pourcentages, sans
// formaliser l'augmentation en « × 1,2 ».

import sf51 from './ch05/sf-5-1.js';
import sf52 from './ch05/sf-5-2.js';
import sf53 from './ch05/sf-5-3.js';
import sf54 from './ch05/sf-5-4.js';
import sf55 from './ch05/sf-5-5.js';
import sf56 from './ch05/sf-5-6.js';

export default {
  numero: 5,
  titre: 'Proportionnalité et grandeurs composées',
  theme: 'Organisation et gestion de données',
  trimestre: 1,
  programme: '2020',
  prerequis: [
    'Proportionnalité et règle de trois (cycle 3 et 5e)',
    'Fractions et écritures décimales (chapitres 2 et 4)',
    'Repérage dans le plan (5e)',
  ],
  savoirFaire: [sf51, sf52, sf53, sf54, sf55, sf56],
};
