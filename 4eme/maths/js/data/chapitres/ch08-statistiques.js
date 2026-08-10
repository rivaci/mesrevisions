// Chapitre 8 — Statistiques.
//
// ── Ce que la 4e ajoute ───────────────────────────────────────────────────
//
// La MÉDIANE, nouvel indicateur de position, et le DIAGRAMME CIRCULAIRE. Le
// reste — moyenne, effectifs, fréquences — consolide la 5e.
//
// La médiane n'est pas une deuxième moyenne : c'est un indicateur qui résiste
// aux valeurs extrêmes là où la moyenne se laisse tirer. Un seul salaire très
// élevé déplace la moyenne d'une entreprise, pas sa médiane. C'est l'objet du
// dernier savoir-faire, et c'est ce qui donne un sens à en avoir deux.
//
// ── Pas d'image, donc des tableaux ────────────────────────────────────────
//
// L'application n'affiche pas de graphique. Les diagrammes circulaires sont
// donc décrits par des tableaux dans l'énoncé, et l'élève calcule les angles
// plutôt que de les lire. C'est une limite assumée : le programme demande de
// construire un diagramme, ce qui se fait sur papier ou au tableur — l'appli
// entraîne le calcul qui le précède.
//
// ── Ce que ce chapitre n'a PAS ────────────────────────────────────────────
//
// Ni étendue, ni histogramme : les repères les placent en 3e.

import sf81 from './ch08/sf-8-1.js';
import sf82 from './ch08/sf-8-2.js';
import sf83 from './ch08/sf-8-3.js';
import sf84 from './ch08/sf-8-4.js';
import sf85 from './ch08/sf-8-5.js';

export default {
  numero: 8,
  titre: 'Statistiques',
  theme: 'Organisation et gestion de données',
  trimestre: 2,
  programme: '2020',
  prerequis: [
    'Moyenne, effectifs et fréquences (5e)',
    'Fractions et pourcentages (chapitres 4 et 5)',
    'Proportionnalité (chapitre 5)',
  ],
  savoirFaire: [sf81, sf82, sf83, sf84, sf85],
};
