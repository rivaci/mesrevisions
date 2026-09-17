// Chapitre 7 — Multiplier et diviser des nombres relatifs.
//
// ── D'où vient ce chapitre ───────────────────────────────────────────────
//
// Du point 7 de la liste de la professeure, entièrement propre au parcours
// EIB : « relatifs : multiplication et division ». Écrit avant le cours
// d'Antonin, comme les chapitres 3 à 6.
//
// Quatre savoir-faire : le produit de deux relatifs, le produit de plusieurs
// relatifs, le quotient, puis les calculs qui mêlent les quatre opérations.
//
// ── L'erreur qui traverse le chapitre ────────────────────────────────────
//
// Deux règles des signes cohabitent désormais : celle de l'addition
// (chapitre 5) et celle du produit. Chacune est juste pour son opération, et
// fausse pour l'autre. Les pièges du chapitre 5 restent donc actifs ici,
// et le dernier savoir-faire met les deux règles dans une même ligne.

import sf71 from './ch07/sf-7-1.js';
import sf72 from './ch07/sf-7-2.js';
import sf73 from './ch07/sf-7-3.js';
import sf74 from './ch07/sf-7-4.js';

export default {
  numero: 7,
  titre: 'Multiplier et diviser des relatifs',
  theme: 'Nombres et calculs',
  trimestre: 2,
  programme: '2025',
  signesEnJeu: true,
  prerequis: [
    'Additionner et soustraire des nombres relatifs (chapitre 5)',
    'Priorités opératoires (chapitre 1)',
  ],
  savoirFaire: [sf71, sf72, sf73, sf74],
};
