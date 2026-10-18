// Chapitre 2 — Calcul mental : une révision intensive.
//
// ── D'où vient ce chapitre ───────────────────────────────────────────────
//
// De l'interrogation « Calcul mental — 40 calculs » d'Evan (13,5/20, la plus
// basse de son groupe), photographiée par Denis : 27 justes, 4 fausses, 9
// laissées vides. Ce n'est pas un chapitre du cours, c'est une remise à
// niveau : six savoir-faire, un par famille d'erreurs de la copie.
//
//   - les décimaux (0,6 × 3 ; 453 ÷ 100 ; 18,7 − 8 : trois des quatre fautes) ;
//   - les carrés et racines (√169 = 36) ;
//   - le nombre manquant (? − 75 = 14 et 0,4 + ? = 1, laissés vides) ;
//   - les entiers, vite (67 − 45, 48 × 5, 46 ÷ 4, laissés vides) ;
//   - les fractions (1/2 ÷ 7/9, simplifier 16/18, 1/4 + 3/12, laissés vides) ;
//   - les relatifs ((+6) − (−18), laissé vide).
//
// Chaque « Se tester » reprend les calculs exacts de la copie. Les blancs, y
// compris sur des calculs faciles, disent aussi un manque de VITESSE : la
// série chronométrée (data/serie.js) remet Evan dans le format de
// l'interrogation, 40 calculs mêlés, le chrono sous les yeux.

import sf21 from './ch02/sf-2-1.js';
import sf22 from './ch02/sf-2-2.js';
import sf23 from './ch02/sf-2-3.js';
import sf24 from './ch02/sf-2-4.js';
import sf25 from './ch02/sf-2-5.js';
import sf26 from './ch02/sf-2-6.js';

export default {
  numero: 2,
  titre: 'Calcul mental',
  theme: 'Nombres et calculs',
  trimestre: 1,
  programme: '2020',
  prerequis: [
    'Les tables de multiplication',
    'Les quatre opérations sur les décimaux (6e, 5e)',
    'Les fractions et les nombres relatifs (5e, 4e)',
  ],
  savoirFaire: [sf21, sf22, sf23, sf24, sf25, sf26],
};
