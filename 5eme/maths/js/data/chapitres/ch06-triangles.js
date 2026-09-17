// Chapitre 6 — Triangles.
//
// ── D'où vient ce chapitre ───────────────────────────────────────────────
//
// Du point 6 de la liste de la professeure, écrit avant le cours d'Antonin :
//
//   · somme des angles et sa démonstration ;
//   · [EIB] constructibilité ;
//   · construire à partir de données partielles ;
//   · [EIB] triangles isométriques.
//
// Cinq savoir-faire plutôt que quatre : la démonstration a le sien, séparé
// du calcul d'angles. C'est souvent la première vraie démonstration du
// collège, et elle réutilise le chapitre 2 (angles alternes-internes).
//
// ── Les figures ──────────────────────────────────────────────────────────
//
// Le triangle de js/figures-plan.js porte ses angles ; il trace aussi, pour
// la démonstration, la parallèle à la base passant par le sommet, avec les
// angles 1 et 2. Le contrôle de contenu vérifie chaque angle demandé, chaque
// réponse de constructibilité et chaque paire de triangles isométriques.

import sf61 from './ch06/sf-6-1.js';
import sf62 from './ch06/sf-6-2.js';
import sf63 from './ch06/sf-6-3.js';
import sf64 from './ch06/sf-6-4.js';
import sf65 from './ch06/sf-6-5.js';

export default {
  numero: 6,
  titre: 'Triangles',
  theme: 'Espace et géométrie',
  trimestre: 2,
  programme: '2025',
  prerequis: [
    'Angles alternes-internes et parallélisme (chapitre 2)',
    'Construire un triangle au compas et au rapporteur (6e)',
    'Triangles isocèle, équilatéral et rectangle (6e)',
  ],
  savoirFaire: [sf61, sf62, sf63, sf64, sf65],
};
