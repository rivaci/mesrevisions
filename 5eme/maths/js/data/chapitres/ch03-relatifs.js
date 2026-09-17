// Chapitre 3 — Nombres relatifs.
//
// ── D'où vient ce chapitre ───────────────────────────────────────────────
//
// Du point 3 de la liste de la professeure, écrit avant le cours d'Antonin :
//
//   · définir les nombres relatifs ;
//   · positif, strictement positif, négatif, strictement négatif ;
//   · opposé et valeur absolue ;
//   · grandeurs (température, temps, altitude…) en problèmes ;
//   · droite graduée : lire l'abscisse d'un point, placer un point ;
//   · comparer, ranger (ordre croissant et décroissant) ;
//   · repère orthogonal : lire les coordonnées d'un point, placer un point.
//
// Les opérations sur les relatifs viennent plus tard (chapitres 5 et 7) : ici,
// on lit, on écrit, on place et on compare, sans calculer. Les rares calculs
// des problèmes se font sur une grandeur concrète — un thermomètre, un
// ascenseur — où l'on compte des graduations.
//
// ── Les figures ──────────────────────────────────────────────────────────
//
// Droite graduée et repère sont tracés par js/figures-plan.js. Comme pour les
// angles, chaque réponse lue sur une figure est vérifiée contre elle par le
// contrôle de contenu.

import sf31 from './ch03/sf-3-1.js';
import sf32 from './ch03/sf-3-2.js';
import sf33 from './ch03/sf-3-3.js';
import sf34 from './ch03/sf-3-4.js';

export default {
  numero: 3,
  titre: 'Nombres relatifs',
  theme: 'Nombres et calculs',
  trimestre: 1,
  programme: '2025',
  // Les réponses changent de signe d'un item à l'autre : le contrôle de
  // contenu vérifie que le signe ne se devine pas.
  signesEnJeu: true,
  prerequis: [
    'Lire et placer un nombre décimal sur une demi-droite graduée (6e)',
    'Comparer des nombres décimaux (6e)',
    'Se repérer dans un quadrillage (6e)',
  ],
  savoirFaire: [sf31, sf32, sf33, sf34],
};
