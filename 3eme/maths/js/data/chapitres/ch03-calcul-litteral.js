// Chapitre 3 — Calcul littéral.
//
// Écrit d'après la fiche d'exercices de calcul littéral d'Evan (treize
// exercices, de « réduire » à « développer, factoriser, résoudre »), et la
// consigne de révision de sa professeure : « Revoir le cours de calcul
// littéral (bien connaître les formules) ». Son cours lui-même n'est pas
// arrivé : les énoncés « Par cœur » sont les formules du programme, dans leur
// forme usuelle. S'il les écrit autrement, c'est à aligner.
//
// ── Ce que ce chapitre ajoute au moteur ───────────────────────────────────
//
// Les réponses sont des EXPRESSIONS, jugées par litteral.js sur deux plans :
// la valeur — deux écritures équivalentes, prouvé par le calcul en polynômes
// exacts — et la FORME — « développe » exige une somme réduite, « factorise »
// un produit, avec le plus grand facteur commun sorti. Recopier l'énoncé
// n'est jamais juste. Une équation produit nul se répond par ses solutions,
// dans l'ordre qu'on veut.

import sf31 from './ch03/sf-3-1.js';
import sf32 from './ch03/sf-3-2.js';
import sf33 from './ch03/sf-3-3.js';
import sf34 from './ch03/sf-3-4.js';
import sf35 from './ch03/sf-3-5.js';
import sf36 from './ch03/sf-3-6.js';
import sf37 from './ch03/sf-3-7.js';

export default {
  numero: 3,
  titre: 'Calcul littéral',
  theme: 'Nombres et calculs',
  programme: '2020',
  prerequis: [
    'Calculer avec les nombres relatifs (chapitre 2)',
    'Les priorités opératoires',
    'Les carrés à connaître : 1, 4, 9, 16, 25, 36, 49, 64, 81, 100…',
  ],
  savoirFaire: [sf31, sf32, sf33, sf34, sf35, sf36, sf37],
};
