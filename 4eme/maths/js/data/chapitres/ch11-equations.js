// Chapitre 11 — Équations du premier degré.
//
// ── La formule la plus dangereuse du programme ────────────────────────────
//
// « Ça change de côté, ça change de signe » est une compression du procédé
// légitime — retrancher aux deux membres — enseignée sans le procédé. L'élève
// la récite sans connaître son domaine de validité, et l'applique donc au
// coefficient multiplicatif, où elle est fausse : de 2x = 8 il tire x = 6.
//
// Tout le chapitre repose donc sur une question posée avant chaque geste :
// ce nombre est-il AJOUTÉ à x, ou MULTIPLIÉ par x ? On annule une addition
// par une soustraction, une multiplication par une division.
//
// ── Le seul chapitre où l'on peut toujours savoir seul ────────────────────
//
// Résoudre une équation offre une vérification gratuite : remplacer x par sa
// réponse dans l'équation de départ. Aucun autre chapitre n'a ce luxe, et
// presque aucun élève ne s'en sert. C'est le geste de contrôle du chapitre.
//
// ── Ce que ce chapitre n'a PAS ────────────────────────────────────────────
//
// Ni équation produit, ni x² = a, ni inéquation : les repères les placent en 3e.

import sf111 from './ch11/sf-11-1.js';
import sf112 from './ch11/sf-11-2.js';
import sf113 from './ch11/sf-11-3.js';
import sf114 from './ch11/sf-11-4.js';
import sf115 from './ch11/sf-11-5.js';

export default {
  numero: 11,
  titre: 'Équations du premier degré',
  theme: 'Nombres et calculs',
  trimestre: 2,
  programme: '2020',
  signesEnJeu: true,
  prerequis: [
    'Calcul littéral : réduire, développer (chapitre 7)',
    'Opérations sur les relatifs (chapitre 1)',
    'Fractions (chapitres 4 et 9)',
  ],
  savoirFaire: [sf111, sf112, sf113, sf114, sf115],
};
