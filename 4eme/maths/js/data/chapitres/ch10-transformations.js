// Chapitre 10 — Translations, cas d'égalité des triangles, parallélogrammes.
//
// ── Une contrainte devenue un choix ───────────────────────────────────────
//
// L'application n'affiche aucune figure. Tout se raisonne donc par
// COORDONNÉES dans un repère, ou par propriétés énoncées en texte. C'est une
// limite technique assumée — mais elle a un effet secondaire heureux : elle
// interdit de « voir » la réponse et force à démontrer, ce que le programme
// demande précisément.
//
// Un élève qui lit « ABCD est un quadrilatère tel que (AB) // (CD) et
// AB = CD » ne peut pas s'en tirer en regardant un dessin. Il doit nommer la
// propriété qu'il utilise.
//
// ── Ce que ce chapitre n'a PAS ────────────────────────────────────────────
//
// Ni vecteur, ni définition ponctuelle de la translation, ni rotation : les
// repères de progression les placent en 3e. Ici la translation est un
// glissement, décrit par son effet sur les coordonnées.

import sf101 from './ch10/sf-10-1.js';
import sf102 from './ch10/sf-10-2.js';
import sf103 from './ch10/sf-10-3.js';
import sf104 from './ch10/sf-10-4.js';
import sf105 from './ch10/sf-10-5.js';

export default {
  numero: 10,
  titre: 'Translations, triangles égaux et parallélogrammes',
  theme: 'Espace et géométrie',
  trimestre: 2,
  programme: '2020',
  signesEnJeu: true,
  prerequis: [
    'Symétries axiale et centrale, parallélogramme (5e)',
    'Repérage dans le plan (5e)',
    'Nombres relatifs (chapitre 1)',
  ],
  savoirFaire: [sf101, sf102, sf103, sf104, sf105],
};
