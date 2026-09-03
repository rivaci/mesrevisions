// Chapitre 1 — Théorème de Thalès, réciproque et agrandissement-réduction.
//
// ── Pourquoi ce chapitre ouvre l'application ─────────────────────────────
//
// Pas par choix de progression : parce que c'est celui qu'Evan vient de voir en
// classe. Cette application se construit au fil des cours, pas dans l'ordre
// d'un manuel. Le numéro 1 dit « premier écrit », pas « premier du programme ».
//
// ── Ce qui est repris de la 4e, et ce qui est nouveau ────────────────────
//
// Le fond vient du chapitre 12 de l'application de 4e : reconnaître la
// configuration, calculer une longueur, démontrer un parallélisme avec la
// réciproque, déterminer l'effet d'un agrandissement. Ce socle est valable tel
// quel — le théorème ne change pas d'une classe à l'autre.
//
// Ce que la 3e ajoute, et que le chapitre de 4e écartait explicitement, c'est
// la configuration « PAPILLON » : le point d'intersection entre les deux
// droites parallèles au lieu d'être en dehors. Les longueurs se calculent de la
// même façon, mais l'élève doit reconnaître une figure qui ne ressemble plus du
// tout à celle du cours de 4e — et c'est précisément là qu'il applique le
// théorème sans vérifier, ou refuse de l'appliquer alors qu'il le pourrait.
//
// ── Le piège le mieux documenté du programme ─────────────────────────────
//
// L'effet d'un agrandissement sur les aires : si les longueurs sont
// multipliées par k, les aires le sont par k² et les volumes par k³. De Bock
// et Verschaffel mesurent plus de 90 % d'échec chez les élèves de 12-13 ans, et
// l'erreur RÉSISTE à un enseignement qui la vise explicitement. D'où
// l'insistance du savoir-faire 4 sur ses items neutres — ceux qui portent sur
// les longueurs, où le coefficient est bien k.
//
// ── Ce que ce chapitre n'a PAS ───────────────────────────────────────────
//
// Les triangles semblables et les homothéties, qui font leur propre chapitre
// en 3e. On les nomme pour qu'Evan sache les écarter, on ne les travaille pas
// ici.

import sf11 from './ch01/sf-1-1.js';
import sf12 from './ch01/sf-1-2.js';
import sf13 from './ch01/sf-1-3.js';
import sf14 from './ch01/sf-1-4.js';

export default {
  numero: 1,
  titre: 'Théorème de Thalès et agrandissement',
  theme: 'Espace et géométrie',
  trimestre: 1,
  programme: '2020',
  prerequis: [
    'Proportionnalité et quatrième proportionnelle (4e)',
    'Théorème de Pythagore (4e)',
    'Fractions, produits en croix et équations (4e)',
  ],
  savoirFaire: [sf11, sf12, sf13, sf14],
};
