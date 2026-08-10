// Chapitre 14 — Dépendance de deux grandeurs.
//
// ── Le chapitre que la moitié des manuels n'a pas ─────────────────────────
//
// Le programme est explicite : « la notation et le vocabulaire fonctionnels ne
// sont pas formalisés en 4e ». Ni f(x), ni image, ni antécédent. Beaucoup
// d'éditeurs en concluent qu'il n'y a rien à traiter et sautent le chapitre —
// puis la 3e formalise d'un coup une notation sur une idée jamais installée.
//
// L'idée, elle, tient en une phrase : deux grandeurs dont l'une dépend de
// l'autre, qu'on peut écrire en formule ou tracer dans un repère. C'est court,
// et c'est ce qui rend la 3e possible.
//
// ── Le seul chapitre où l'application dessine ─────────────────────────────
//
// Tout le reste de l'appli décrit ses figures en toutes lettres. Ici c'est
// impossible : « lire et interpréter une valeur sur un graphique » est un
// savoir-faire dont l'objet EST le graphique, et le remplacer par un tableau
// de valeurs ne le dégraderait pas, il le changerait. D'où js/graphique.js,
// qui trace un repère à partir de coordonnées — des données, pas une image.
//
// ── Six pièges, deux familles à ne pas mélanger ───────────────────────────
//
// Trois d'ÉCRITURE : traduire une situation en formule. Trois de LECTURE :
// tirer une information d'un repère. Le plus profond des six, « graphique lu
// comme le dessin de la situation », est le mieux documenté de la didactique
// des fonctions — une courbe qui monte n'est pas une côte, et si l'axe
// vertical porte une vitesse, elle décrit une accélération sur le plat.
//
// ── Ce que ce chapitre n'a PAS ────────────────────────────────────────────
//
// Aucune notation fonctionnelle, aucune fonction affine nommée comme telle,
// aucun coefficient directeur. On dit « le prix dépend du nombre de séances »,
// jamais « soit f la fonction qui à x associe… ».

import sf141 from './ch14/sf-14-1.js';
import sf142 from './ch14/sf-14-2.js';
import sf143 from './ch14/sf-14-3.js';

export default {
  numero: 14,
  titre: 'Dépendance de deux grandeurs',
  theme: 'Organisation et gestion de données',
  trimestre: 3,
  programme: '2020',
  prerequis: [
    'Proportionnalité (chapitre 5)',
    'Calcul littéral : produire et tester une expression (chapitre 7)',
    'Équations du premier degré (chapitre 11)',
  ],
  savoirFaire: [sf141, sf142, sf143],
};
