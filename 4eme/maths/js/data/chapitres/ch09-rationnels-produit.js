// Chapitre 9 — Multiplier et diviser des nombres rationnels.
//
// ── Pourquoi il vient après le chapitre 4, et pas avec lui ────────────────
//
// La somme exige un dénominateur commun, le produit non. Les traiter ensemble
// fabrique la confusion la plus tenace du programme — mettre au même
// dénominateur pour multiplier, ou additionner terme à terme comme on
// multiplie. Lelivrescolaire, iParcours et Transmath les séparent tous les
// trois, et c'est pour cette raison.
//
// Entre les deux, le calcul littéral et les statistiques ont donné aux
// fractions un usage plutôt qu'un exercice.
//
// ── Ce que ce chapitre n'a PAS ────────────────────────────────────────────
//
// Pas de fraction « irréductible » nommée : c'est de la 3e. On simplifie
// autant qu'on peut, ce qui est l'attendu de 4e.

import sf91 from './ch09/sf-9-1.js';
import sf92 from './ch09/sf-9-2.js';
import sf93 from './ch09/sf-9-3.js';
import sf94 from './ch09/sf-9-4.js';
import sf95 from './ch09/sf-9-5.js';

export default {
  numero: 9,
  titre: 'Multiplier et diviser des rationnels',
  theme: 'Nombres et calculs',
  trimestre: 2,
  programme: '2020',
  signesEnJeu: true,
  prerequis: [
    'Additionner et soustraire des fractions (chapitre 4)',
    'Simplifier une fraction (chapitre 2)',
    'Multiplication et division des relatifs (chapitre 1)',
  ],
  savoirFaire: [sf91, sf92, sf93, sf94, sf95],
};
