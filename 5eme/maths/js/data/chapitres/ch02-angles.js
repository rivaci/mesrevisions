// Chapitre 2 — Paires d'angles et parallélisme.
//
// ── D'où vient ce chapitre ───────────────────────────────────────────────
//
// Des deux dernières leçons d'Antonin — « Paires d'angles et parallélisme »,
// puis « Angles alternes-internes et correspondants » — et du point 2 de la
// liste de la professeure :
//
//   · [EIB] rappels : angles opposés par le sommet, adjacents,
//     complémentaires, supplémentaires ;
//   · caractériser le parallélisme par les angles : alternes-internes,
//     correspondants ;
//   · [EIB] rappels : cas particulier, lien avec les propriétés de sixième.
//
// ── Le premier chapitre avec des figures ─────────────────────────────────
//
// Tout ce chapitre porte SUR une figure : « alternes-internes » ne se définit
// que par une position. Les figures sont tracées par js/figure.js, avec une
// numérotation des angles fixe, et le contrôle de contenu vérifie chaque
// réponse contre la figure qu'elle accompagne.

import sf21 from './ch02/sf-2-1.js';
import sf22 from './ch02/sf-2-2.js';
import sf23 from './ch02/sf-2-3.js';
import sf24 from './ch02/sf-2-4.js';

export default {
  numero: 2,
  titre: 'Paires d\'angles et parallélisme',
  theme: 'Espace et géométrie',
  trimestre: 1,
  programme: '2025',
  prerequis: [
    'Mesurer un angle au rapporteur (6e)',
    'Droites parallèles et perpendiculaires (6e)',
  ],
  savoirFaire: [sf21, sf22, sf23, sf24],
};
