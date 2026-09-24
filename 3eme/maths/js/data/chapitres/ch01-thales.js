// Chapitre 1 — Théorème de Thalès : triangles semblables, théorème,
// réciproque et contraposée, agrandissement-réduction.
//
// ── Pourquoi ce chapitre ouvre l'application ─────────────────────────────
//
// Pas par choix de progression : parce que c'est celui qu'Evan vient de voir en
// classe. Cette application se construit au fil des cours, pas dans l'ordre
// d'un manuel. Le numéro 1 dit « premier écrit », pas « premier du programme ».
//
// ── D'où vient ce chapitre ───────────────────────────────────────────────
//
// D'abord du chapitre 12 de l'application de 4e : reconnaître la
// configuration, calculer une longueur, démontrer un parallélisme avec la
// réciproque, déterminer l'effet d'un agrandissement. Ce socle est valable
// tel quel — le théorème ne change pas d'une classe à l'autre. La 3e y ajoute
// la configuration « papillon ».
//
// Puis du cours d'Evan lui-même, arrivé ensuite, qui a fixé le plan et les
// mots :
//
//   I/   Triangles semblables — définition par les angles, homologues, deux
//        paires d'angles suffisent, côtés proportionnels, k et k' = 1/k ;
//   II/  Théorème de Thalès — « deux droites sécantes coupées par deux
//        droites parallèles », pour déterminer des longueurs ;
//   III/ Réciproque — avec les points « alignés dans le même ordre » — et
//        contraposée, pour prouver que deux droites ne sont PAS parallèles.
//
// Les savoir-faire suivent ce plan. Les triangles semblables, que la première
// version renvoyait à un chapitre à part, viennent donc en tête ; leur
// identifiant (sf-1-5) dit seulement qu'ils ont été écrits en dernier.
//
// ── Le piège le mieux documenté du programme ─────────────────────────────
//
// L'effet d'un agrandissement sur les aires : si les longueurs sont
// multipliées par k, les aires le sont par k² et les volumes par k³. De Bock
// et Verschaffel mesurent plus de 90 % d'échec chez les élèves de 12-13 ans, et
// l'erreur RÉSISTE à un enseignement qui la vise explicitement. D'où
// l'insistance du savoir-faire sur l'agrandissement sur ses items neutres —
// ceux qui portent sur les longueurs, où le coefficient est bien k.
//
// ── Ce que ce chapitre n'a PAS ───────────────────────────────────────────
//
// Les homothéties, qui ne sont pas dans le cours d'Evan.

import sf11 from './ch01/sf-1-1.js';
import sf12 from './ch01/sf-1-2.js';
import sf13 from './ch01/sf-1-3.js';
import sf14 from './ch01/sf-1-4.js';
import sf15 from './ch01/sf-1-5.js';

export default {
  numero: 1,
  titre: 'Théorème de Thalès',
  theme: 'Espace et géométrie',
  trimestre: 1,
  programme: '2020',
  prerequis: [
    'Proportionnalité et quatrième proportionnelle (4e)',
    'Somme des angles d\'un triangle (5e)',
    'Fractions, produits en croix et équations (4e)',
  ],
  // L'ordre du cours d'Evan : triangles semblables, théorème, réciproque.
  savoirFaire: [sf15, sf11, sf12, sf13, sf14],
};
