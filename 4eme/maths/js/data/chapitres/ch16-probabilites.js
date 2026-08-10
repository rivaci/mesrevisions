// Chapitre 16 — Probabilités.
//
// ── Le seul chapitre où l'intuition ordinaire est activement fausse ───────
//
// Ailleurs, l'intuition est incomplète : elle ne suffit pas, mais elle ne
// trompe pas. Ici elle trompe, et elle résiste au calcul. Deux des six pièges
// du chapitre — le sophisme du joueur et la confusion fréquence/probabilité —
// sont des conceptions qu'on retrouve intactes chez des adultes instruits.
//
// Conséquence directe sur l'écriture : énoncer la règle ne suffit pas. Il faut
// faire CONSTATER à l'élève que l'objet n'a pas changé entre deux tirages, ou
// que deux séries de vingt lancers donnent deux fréquences différentes alors
// que la pièce est la même. D'où des découvertes qui font compter avant de
// conclure, plutôt que des cours qui affirment.
//
// ── La question qui gouverne tout le chapitre ─────────────────────────────
//
// « Sur quoi divise-t-on ? » Le dénominateur est le total, et le total compte
// AUSSI les cas favorables — d'où 3/10 et non 3/7. Mais il ne suffit pas de
// diviser : encore faut-il que les issues comptées aient la même chance. Une
// urne de trois rouges et d'une verte a deux couleurs et pas une chance sur
// deux, et c'est là que compter des catégories au lieu d'objets se paie.
//
// ── Ce que ce chapitre n'a PAS ────────────────────────────────────────────
//
// Une seule épreuve à la fois. Ni arbre à deux niveaux, ni probabilités
// composées, ni indépendance : tout cela est en 3e. Les tirages successifs
// n'apparaissent que pour une raison précise — décider si l'objet a changé
// entre les deux, ce qui est exactement le geste que le sophisme du joueur
// escamote.

import sf161 from './ch16/sf-16-1.js';
import sf162 from './ch16/sf-16-2.js';
import sf163 from './ch16/sf-16-3.js';

export default {
  numero: 16,
  titre: 'Probabilités',
  theme: 'Organisation et gestion de données',
  trimestre: 3,
  programme: '2020',
  prerequis: [
    'Fractions et écritures décimales (chapitres 4 et 9)',
    'Proportionnalité et pourcentages (chapitre 5)',
    'Effectifs et fréquences (chapitre 8)',
  ],
  savoirFaire: [sf161, sf162, sf163],
};
