// Chapitre 1 — Les opérations et leurs enchaînements.
//
// ── D'où vient ce chapitre ───────────────────────────────────────────────
//
// Du cahier d'Antonin, page 1 : « Les opérations, enchaînements — chapitre 1 ».
// Le découpage en quatre savoir-faire suit l'ordre exact de sa leçon :
//
//   1. « Dans une suite d'additions, l'ordre ne change pas. Dans un mélange
//      d'additions et de soustractions, les opérations se font dans l'ordre de
//      la lecture. » — et la même phrase pour × et ÷.
//   2. « Additions et soustractions sont au même niveau de priorité.
//      Multiplication et division sont à un même niveau mais supérieur. »
//   3. « Les parenthèses permettent de changer l'ordre naturel des
//      opérations. » — avec son couple d'exemples, 2 + 3 × 5 et (2 + 3) × 5.
//   4. « Puissances sont encore au niveau supérieur », plus la remarque
//      « penser aux groupements ».
//
// Le vocabulaire de sa leçon — somme, différence, produit — est dans le cours
// du savoir-faire 1. Le quotient a été ajouté : sa page s'arrête après
// « produit », et la liste continue manifestement.
//
// ── Ce que la liste de la professeure et l'Interrogation 1 ont ajouté ───
//
// La liste officielle des attendus du chapitre demande aussi de nommer un
// calcul et de le traduire, la distributivité simple, les carrés à connaître
// (jusqu'à 15 en parcours EIB) et le cube de 10 : trois savoir-faire de plus,
// les 5, 6 et 7. L'Interrogation 1 (15/20) a montré où les points se perdent —
// une chaîne de × et ÷, deux traductions — et ses erreurs sont reprises
// telles quelles comme réponses fausses prévues.
//
// ── Le fil du chapitre ───────────────────────────────────────────────────
//
// Ce n'est pas « apprendre les priorités ». C'est apprendre QUAND l'ordre de
// lecture est la bonne méthode et quand il ne l'est pas — parce que l'élève
// arrive avec une règle vraie depuis le CP, qui reste vraie la moitié du temps.
//
// D'où deux familles d'erreurs opposées, et des items neutres qui alternent
// sans cesse entre les deux : appliquer l'ordre de lecture là où une priorité
// l'interdit, et refuser un regroupement là où il est parfaitement permis.
// Traiter une famille sans l'autre produit un élève qui se trompe autrement.

import sf11 from './ch01/sf-1-1.js';
import sf12 from './ch01/sf-1-2.js';
import sf13 from './ch01/sf-1-3.js';
import sf14 from './ch01/sf-1-4.js';
import sf15 from './ch01/sf-1-5.js';
import sf16 from './ch01/sf-1-6.js';
import sf17 from './ch01/sf-1-7.js';

export default {
  numero: 1,
  titre: 'Les opérations et leurs enchaînements',
  theme: 'Nombres et calculs',
  trimestre: 1,
  programme: '2025',
  prerequis: [
    'Les quatre opérations sur les nombres décimaux (6e)',
    'Le sens de la division et du quotient (6e)',
  ],
  savoirFaire: [sf11, sf12, sf13, sf14, sf15, sf16, sf17],
};
