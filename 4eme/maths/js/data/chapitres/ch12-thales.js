// Chapitre 12 — Théorème de Thalès et agrandissement-réduction.
//
// ── Le dernier maillon de la chaîne géométrique ───────────────────────────
//
// Racine carrée → Pythagore → proportionnalité → Thalès. Chacun s'appuie sur
// les précédents, et le cosinus du chapitre suivant s'appuiera sur les deux
// théorèmes à la fois — c'est le seul chapitre de l'année à avoir deux parents
// géométriques, ce qui le place structurellement en fin de parcours.
//
// ── Le piège le mieux documenté du programme ──────────────────────────────
//
// L'effet d'un agrandissement sur les aires : si les longueurs sont
// multipliées par k, les aires le sont par k² et les volumes par k³. De Bock
// et Verschaffel mesurent plus de 90 % d'échec chez les élèves de 12-13 ans,
// et l'erreur RÉSISTE à un enseignement qui la vise explicitement. D'où
// l'insistance du savoir-faire 4 sur ses items neutres — ceux qui portent sur
// les longueurs, où le coefficient est bien k.
//
// ── Ce que ce chapitre n'a PAS ────────────────────────────────────────────
//
// Uniquement la configuration des triangles emboîtés. La configuration
// « papillon », les homothéties et les triangles semblables sont en 3e.

import sf121 from './ch12/sf-12-1.js';
import sf122 from './ch12/sf-12-2.js';
import sf123 from './ch12/sf-12-3.js';
import sf124 from './ch12/sf-12-4.js';

export default {
  numero: 12,
  titre: 'Théorème de Thalès et agrandissement',
  theme: 'Espace et géométrie',
  trimestre: 3,
  programme: '2020',
  prerequis: [
    'Proportionnalité et quatrième proportionnelle (chapitre 5)',
    'Théorème de Pythagore (chapitre 3)',
    'Fractions et produits en croix (chapitres 4 et 9)',
  ],
  savoirFaire: [sf121, sf122, sf123, sf124],
};
