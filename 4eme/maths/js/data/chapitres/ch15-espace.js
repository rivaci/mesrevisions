// Chapitre 15 — Pyramides, cônes, repérage dans l'espace.
//
// ── Le chapitre où la feuille ne montre l'objet que de biais ──────────────
//
// Toute la difficulté tient là. Un solide dessiné en perspective ment sur ses
// longueurs : ce qui est perpendiculaire paraît penché, ce qui est égal paraît
// inégal. L'élève doit donc tenir l'objet dans sa tête, et la figure ne l'y
// aide qu'à moitié.
//
// Ici l'application n'en dessine aucune, et cette contrainte tombe plutôt
// bien : elle oblige chaque énoncé à dire ce qu'EST chaque longueur donnée —
// « la hauteur SH », « l'arête latérale SA », « l'apothème SM, où M est le
// milieu du côté [BC] ». Un manuel peut se permettre de laisser la figure
// répondre ; ici, l'énoncé doit tout fixer, sous peine d'être indéterminé.
//
// ── Deux familles d'erreurs, et ce ne sont pas les mêmes ──────────────────
//
// Celles qui portent sur la FORMULE — le tiers oublié, le périmètre du disque
// pris pour son aire — se corrigent en énonçant la règle. Celles qui portent
// sur la LONGUEUR qu'on y porte ne se corrigent pas comme ça : elles
// produisent un calcul parfaitement mené sur la mauvaise donnée, et rien dans
// le résultat ne les signale. La hauteur confondue avec une oblique, le
// diamètre employé comme rayon : ce sont les plus tenaces du chapitre, et
// c'est pourquoi plusieurs items obligent à trouver la hauteur par Pythagore
// au lieu de la lire.
//
// ── Ce que ce chapitre n'a PAS ────────────────────────────────────────────
//
// Ni sphère, ni boule, ni section de solide : elles sont en 3e. Et aucun
// patron à tracer — l'appli ne saurait pas l'évaluer. Un patron s'y travaille
// autrement : compter et nommer les pièces, donner les dimensions de chacune,
// juger si un patron proposé se referme bien sur le solide annoncé.

import sf151 from './ch15/sf-15-1.js';
import sf152 from './ch15/sf-15-2.js';
import sf153 from './ch15/sf-15-3.js';
import sf154 from './ch15/sf-15-4.js';

export default {
  numero: 15,
  titre: 'Pyramides, cônes et repérage dans l\'espace',
  theme: 'Espace et géométrie',
  trimestre: 3,
  programme: '2020',
  prerequis: [
    'Théorème de Pythagore (chapitre 3)',
    'Aires et périmètres du cycle 4',
    'Puissances et unités (chapitre 6)',
  ],
  savoirFaire: [sf151, sf152, sf153, sf154],
};
