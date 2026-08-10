// Chapitre 13 — Cosinus dans le triangle rectangle.
//
// ── Le seul chapitre à deux parents géométriques ──────────────────────────
//
// Pythagore donne la troisième longueur, Thalès donne le rapport, et le
// cosinus a besoin des deux idées à la fois : il lit une forme dans un
// quotient de longueurs. C'est ce qui le place structurellement en dernier,
// et non un choix de progression.
//
// ── Un nombre qui n'est ni une longueur ni un compte ──────────────────────
//
// C'est la vraie difficulté du chapitre, et presque toutes ses erreurs en
// découlent. Jusqu'ici, un nombre mesurait quelque chose : des centimètres,
// des objets, des euros. Le cosinus ne mesure rien — c'est un RAPPORT, qui
// code une forme. D'où les trois confusions qu'on retrouve partout :
//
//   · on le manipule comme un facteur (« avec le cosinus, on multiplie »),
//     ce qui est faux dès qu'on cherche l'hypoténuse ;
//   · on le croit croissant avec l'angle, alors qu'il décroît de 1 à 0 ;
//   · on confond cos⁻¹ avec 1/cos, parce que la notation y invite.
//
// ── Aucune calculatrice, donc aucune valeur sortie de nulle part ──────────
//
// L'application n'en a pas. Toute valeur nécessaire à un CALCUL est donc
// écrite dans l'énoncé qui la demande, et les mesures d'angle se lisent dans
// une petite table donnée sur place. Les deux seules valeurs à connaître sans
// table sont les bornes — cos 0° = 1 et cos 90° = 0 — et elles ne servent
// jamais à calculer : uniquement à encadrer.
//
// ── Ce que ce chapitre n'a PAS ────────────────────────────────────────────
//
// Ni sinus ni tangente : ils sont en 3e. Le programme de 4e n'introduit que
// le cosinus, précisément pour laisser le temps d'installer l'idée de rapport
// avant d'en manipuler trois.

import sf131 from './ch13/sf-13-1.js';
import sf132 from './ch13/sf-13-2.js';
import sf133 from './ch13/sf-13-3.js';

export default {
  numero: 13,
  titre: 'Cosinus dans le triangle rectangle',
  theme: 'Espace et géométrie',
  trimestre: 3,
  programme: '2020',
  prerequis: [
    'Théorème de Pythagore (chapitre 3)',
    'Quatrième proportionnelle et rapports (chapitres 5 et 12)',
    'Quotients et écritures décimales (chapitres 4 et 9)',
  ],
  savoirFaire: [sf131, sf132, sf133],
};
