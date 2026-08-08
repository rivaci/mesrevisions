// Chapitre 4 — Comparer, additionner et soustraire des nombres rationnels.
//
// ── Pourquoi les fractions sont scindées en deux chapitres ────────────────
//
// Addition et soustraction ici, multiplication et division au chapitre 9.
// C'est le découpage de Lelivrescolaire, d'iParcours et de Transmath, et il a
// une raison pédagogique : la somme exige un dénominateur commun, le produit
// non. Les traiter ensemble, c'est fabriquer la confusion la plus tenace du
// programme — mettre au même dénominateur pour multiplier, ou additionner
// terme à terme comme on multiplie.
//
// Entre les deux, le calcul littéral et les équations auront donné aux
// fractions un usage plutôt qu'un exercice.
//
// ── Ce que ce chapitre n'a PAS ────────────────────────────────────────────
//
// Pas de fraction « irréductible » nommée — c'est de la 3e. On simplifie
// autant qu'on peut, ce qui est l'attendu de 4e.

import sf41 from './ch04/sf-4-1.js';
import sf42 from './ch04/sf-4-2.js';
import sf43 from './ch04/sf-4-3.js';
import sf44 from './ch04/sf-4-4.js';
import sf45 from './ch04/sf-4-5.js';

export default {
  numero: 4,
  titre: 'Comparer, additionner et soustraire des rationnels',
  theme: 'Nombres et calculs',
  trimestre: 1,
  programme: '2020',
  // Les fractions négatives sont au programme de ce chapitre : le signe varie
  // d'un exercice à l'autre, donc le contrôle doit vérifier qu'il ne se devine pas.
  signesEnJeu: true,
  prerequis: [
    'Fractions égales et simplification (chapitre 2)',
    'Additionner des fractions de dénominateurs multiples l\'un de l\'autre (5e)',
    'Nombres relatifs (chapitre 1)',
  ],
  savoirFaire: [sf41, sf42, sf43, sf44, sf45],
};
