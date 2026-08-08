// Chapitre 6 — Puissances et notation scientifique.
//
// ── Pourquoi on ne fait pas apprendre les règles ──────────────────────────
//
// Les repères de progression sont explicites : les formules générales sur les
// exposants ne sont PAS un attendu de 4e. Les calculs découlent de la
// définition. Ce n'est pas une facilité, c'est la parade au piège central du
// chapitre : un élève qui retient « on additionne les exposants » sans savoir
// pourquoi appliquera la même règle à une somme, à des bases différentes, et
// inventera au besoin celles qui manquent.
//
// D'où la consigne donnée à tout ce chapitre : on RETROUVE la règle en
// comptant les facteurs, on ne la récite pas. 2³ × 2⁴, c'est trois 2 puis
// quatre 2, donc sept 2 — et ce raisonnement-là ne se transporte pas à une
// somme, parce qu'on voit tout de suite qu'il n'a plus de sens.
//
// ── Ce que ce chapitre n'a PAS ────────────────────────────────────────────
//
// Pas de puissance d'exposant négatif sur une base quelconque : seules les
// puissances de 10 y ont droit en 4e. Le reste est en 3e.

import sf61 from './ch06/sf-6-1.js';
import sf62 from './ch06/sf-6-2.js';
import sf63 from './ch06/sf-6-3.js';
import sf64 from './ch06/sf-6-4.js';
import sf65 from './ch06/sf-6-5.js';
import sf66 from './ch06/sf-6-6.js';

export default {
  numero: 6,
  titre: 'Puissances et notation scientifique',
  theme: 'Nombres et calculs',
  trimestre: 2,
  programme: '2020',
  // Pas de `signesEnJeu` ici, malgré le piège « −3² contre (−3)² ». Un exposant
  // négatif donne un nombre PETIT, pas négatif — c'est même tout le sujet du
  // savoir-faire 3. Les résultats de ce chapitre sont donc positifs par nature,
  // et exiger un mélange de signes reviendrait à fabriquer des exercices
  // artificiels pour satisfaire un contrôle qui ne s'applique pas.
  prerequis: [
    'Multiplication des nombres relatifs (chapitre 1)',
    'Écritures décimales et fractionnaires (chapitre 4)',
    'Ordre de grandeur (chapitre 1)',
  ],
  savoirFaire: [sf61, sf62, sf63, sf64, sf65, sf66],
};
