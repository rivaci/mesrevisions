// Chapitre 7 — Calcul littéral.
//
// ── Le nœud du programme ──────────────────────────────────────────────────
//
// C'est le chapitre dont tout le lycée dépend : fonctions, dérivées,
// équations, physique. Et c'est celui que les données mesurent en recul —
// CEDRE constate que « la maîtrise technique (développer ou factoriser une
// expression) recule pour l'ensemble des élèves », et TIMSS 2023 place le
// calcul algébrique parmi les domaines les moins maîtrisés des élèves
// français de 4e.
//
// ── Le seul chapitre où l'élève ÉCRIT des mathématiques ───────────────────
//
// Partout ailleurs il produit un nombre. Ici il produit une EXPRESSION, et
// l'application vérifie l'équivalence en remplaçant la lettre par plusieurs
// nombres — pas en comparant des chaînes de caractères. Toute écriture
// équivalente est donc acceptée : « 10 + 2x » vaut « 2x + 10 ».
//
// C'est ce qui rend ce chapitre honnête. Un QCM sur « développe 2(x + 5) »
// testerait la reconnaissance ; ici il faut produire, ce qui est précisément
// la compétence qui manque.
//
// ── La typologie des confusions ───────────────────────────────────────────
//
// Les huit pièges viennent de la lignée Pépite (Grugeon-Allys), seul
// dispositif francophone à avoir modélisé POURQUOI un élève se trompe en
// algèbre plutôt que de constater qu'il se trompe. Leur geste de contrôle est
// presque toujours le même — remplacer la lettre par un nombre — et ce n'est
// pas une paresse : c'est LE geste de l'algèbre, celui qui reste disponible
// en contrôle quand l'application n'est plus là.
//
// ── Ce que ce chapitre n'a PAS ────────────────────────────────────────────
//
// Pas de double distributivité (a+b)(c+d) : les repères la placent en 3e.
// Elle apparaît en filigrane dans une découverte, jamais comme attendu.

import sf71 from './ch07/sf-7-1.js';
import sf72 from './ch07/sf-7-2.js';
import sf73 from './ch07/sf-7-3.js';
import sf74 from './ch07/sf-7-4.js';
import sf75 from './ch07/sf-7-5.js';
import sf76 from './ch07/sf-7-6.js';

export default {
  numero: 7,
  titre: 'Calcul littéral',
  theme: 'Nombres et calculs',
  trimestre: 2,
  programme: '2020',
  // Les valeurs négatives de la lettre sont au cœur du savoir-faire 2 :
  // le contrôle doit vérifier que le signe ne se devine pas.
  signesEnJeu: true,
  prerequis: [
    'Opérations sur les nombres relatifs (chapitre 1)',
    'Distributivité simple sur ax + bx (5e)',
    'Priorités opératoires (chapitre 1)',
  ],
  savoirFaire: [sf71, sf72, sf73, sf74, sf75, sf76],
};
