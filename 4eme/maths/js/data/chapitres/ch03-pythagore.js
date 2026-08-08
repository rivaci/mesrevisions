// Chapitre 3 — Racine carrée et théorème de Pythagore.
//
// ── Pourquoi ce chapitre est en troisième position ────────────────────────
//
// Les manuels le rangent tard — chapitre 9 chez Myriade, 12 chez
// Lelivrescolaire, 16 chez Transmath — parce qu'ils CLASSENT par thème. Les
// progressions réelles de professeurs le placent en 2e ou 3e, et elles ont
// raison : Pythagore est l'outil géométrique le plus réinvesti de l'année. Il
// sert dans l'espace pour calculer une hauteur de pyramide, dans le cosinus,
// dans les agrandissements. L'enseigner en fin d'année, c'est l'enseigner
// quand il ne sert plus à rien.
//
// ── Un fichier par savoir-faire ───────────────────────────────────────────
//
// Les chapitres 1 et 2 tiennent dans un seul fichier. À partir d'ici, chaque
// savoir-faire a le sien : ils font 350 lignes chacun, ils s'écrivent et se
// corrigent indépendamment, et un fichier de 2 000 lignes n'est relisible par
// personne. C'est aussi la convention de l'appli de français, un fichier par
// séance.
//
// ── Ce que ce chapitre n'a PAS ────────────────────────────────────────────
//
// Aucune propriété algébrique des racines carrées : ni √(ab) = √a × √b, ni
// simplification de radicaux. Les repères de progression sont explicites, la
// racine carrée est en 4e une DÉFINITION et un encadrement, rien de plus. Le
// reste est en 3e et au lycée.

import sf31 from './ch03/sf-3-1.js';
import sf32 from './ch03/sf-3-2.js';
import sf33 from './ch03/sf-3-3.js';
import sf34 from './ch03/sf-3-4.js';
import sf35 from './ch03/sf-3-5.js';
import sf36 from './ch03/sf-3-6.js';

export default {
  numero: 3,
  titre: 'Racine carrée et théorème de Pythagore',
  theme: 'Espace et géométrie',
  trimestre: 1,
  programme: '2020',
  prerequis: [
    'Triangle rectangle, hypoténuse, angle droit (6e et 5e)',
    'Carrés des entiers jusqu\'à 12',
    'Opérations sur les nombres relatifs (chapitre 1)',
  ],
  savoirFaire: [sf31, sf32, sf33, sf34, sf35, sf36],
};
