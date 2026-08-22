// Un thème = un lot de connaissances qui se révisent de la même façon.
//
// Chaque thème décrit COMMENT interroger ses items ; les modes de jeu
// (flashcards, quiz, carte) lisent cette description sans rien savoir du contenu
// lui-même. Ajouter un thème ne demande donc de modifier aucun mode.
//
//   question / reponse : les deux faces de la carte à mémoriser
//   detail             : le complément affiché une fois la réponse donnée
//   carte              : présent si l'item se localise (fichier + couche SVG)

import {
  CONTINENTS, OCEANS, LIGNES, FAMILLES_LIGNES, DIRECTIONS, OUTILS_CARTE, CALCULS_ECHELLE, VILLES,
} from './monde.js';
import {
  PERIODES, SYMBOLES_ROMAINS, REGLES_ROMAINES, NOMBRES_ROMAINS, SIECLES, AVANT_APRES,
} from './temps.js';

export const THEMES = {
  // --- Le planisphère -------------------------------------------------------

  'continents-carte': {
    titre: 'Placer les continents',
    matiere: 'geo',
    items: CONTINENTS,
    question: (c) => `Trouve sur la carte : ${c.court}`,
    reponse: (c) => c.court,
    detail: (c) => c.note,
    reconnaissance: 'Quel continent est mis en valeur ?',
    carte: { fichier: 'monde', couche: 'pays' },
  },

  'oceans-carte': {
    titre: 'Placer les océans',
    matiere: 'geo',
    items: OCEANS,
    question: (o) => `Trouve sur la carte : ${o.court}`,
    reponse: (o) => o.court,
    detail: (o) => o.note,
    reconnaissance: 'Quel est cet océan ?',
    carte: { fichier: 'monde', couche: 'marqueurs' },
  },

  'lignes-carte': {
    titre: 'Placer les lignes imaginaires',
    matiere: 'geo',
    items: LIGNES,
    question: (l) => `Trouve sur la carte : ${l.nom}`,
    reponse: (l) => l.nom,
    detail: (l) => l.note,
    reconnaissance: 'Quelle est cette ligne ?',
    carte: { fichier: 'monde', couche: 'lignes' },
  },

  'lignes-familles': {
    titre: 'Parallèles et méridiens',
    matiere: 'geo',
    items: FAMILLES_LIGNES,
    question: (f) => `${f.nom}, qu'est-ce que c'est ?`,
    reponse: (f) => f.reponse,
    detail: (f) => f.note,
  },

  // --- Lire une carte -------------------------------------------------------

  'rose-des-vents': {
    titre: 'La rose des vents',
    matiere: 'geo',
    items: DIRECTIONS,
    question: (d) => `Quelle direction s'abrège « ${d.abrege} » ?`,
    reponse: (d) => d.nom,
    detail: (d) => d.note,
  },

  'outils-carte': {
    titre: 'Ce que porte une carte',
    matiere: 'geo',
    items: OUTILS_CARTE,
    question: (o) => o.question,
    reponse: (o) => o.reponse,
    detail: (o) => o.note,
  },

  'echelle-calcul': {
    titre: "Calculer avec l'échelle",
    matiere: 'geo',
    items: CALCULS_ECHELLE,
    question: (e) => e.question,
    reponse: (e) => e.reponse,
    detail: (e) => e.note,
  },

  // --- Le monde méditerranéen ----------------------------------------------

  'villes-carte': {
    titre: 'Placer les villes de la Méditerranée',
    matiere: 'geo',
    items: VILLES,
    question: (v) => `Trouve sur la carte : ${v.nom}`,
    reponse: (v) => v.nom,
    detail: (v) => v.note,
    reconnaissance: 'Quelle est cette ville ?',
    carte: { fichier: 'mediterranee', couche: 'marqueurs' },
  },

  'villes-role': {
    titre: 'Ces villes, dans quel pays ?',
    matiere: 'geo',
    items: VILLES,
    question: (v) => `Dans quel pays actuel se trouve ${v.nom} ?`,
    reponse: (v) => v.pays,
    detail: (v) => v.note,
  },

  // --- Le temps -------------------------------------------------------------

  'periodes-ordre': {
    titre: 'Les grandes périodes, dans l\'ordre',
    matiere: 'histoire',
    items: PERIODES,
    question: (p) => `${p.nom} : quelle place sur la frise ?`,
    reponse: (p) => `${p.ordre}ᵉ période`,
    detail: (p) => `${p.debut}. ${p.note}`,
  },

  'periodes-bornes': {
    titre: 'Ce qui ferme chaque période',
    matiere: 'histoire',
    items: PERIODES,
    question: (p) => `Quel événement marque la fin de ${p.nom.replace(/^L[ae'] ?/, '').replace(/^Les /, '')} ?`,
    reponse: (p) => p.borne,
    detail: (p) => `${p.nom} : ${p.debut}. ${p.note}`,
  },

  'periodes-dates': {
    titre: 'Les dates des périodes',
    matiere: 'histoire',
    items: PERIODES,
    question: (p) => `${p.nom} : de quand à quand ?`,
    reponse: (p) => p.debut,
    detail: (p) => `Elle se termine avec ${p.borne}. Durée : ${p.duree}.`,
  },

  // --- Les chiffres romains -------------------------------------------------

  'romains-symboles': {
    titre: 'Les sept symboles',
    matiere: 'histoire',
    items: SYMBOLES_ROMAINS,
    question: (s) => `Que vaut ${s.signe} ?`,
    reponse: (s) => String(s.valeur),
    detail: () => 'Les sept symboles : I, V, X, L, C, D, M. Tout le reste se compose à partir d\'eux.',
  },

  'romains-regles': {
    titre: 'Les règles d\'écriture',
    matiere: 'histoire',
    items: REGLES_ROMAINES,
    question: (r) => r.question,
    reponse: (r) => r.reponse,
    detail: (r) => r.note,
  },

  'romains-lire': {
    titre: 'Lire un chiffre romain',
    matiere: 'histoire',
    items: NOMBRES_ROMAINS,
    question: (n) => `Que vaut ${n.romain} ?`,
    reponse: (n) => String(n.arabe),
    detail: (n) => n.note,
  },

  'romains-ecrire': {
    titre: 'Écrire un chiffre romain',
    matiere: 'histoire',
    items: NOMBRES_ROMAINS,
    question: (n) => `Comment s'écrit ${n.arabe} en chiffres romains ?`,
    reponse: (n) => n.romain,
    detail: (n) => n.note,
  },

  siecles: {
    titre: 'Trouver le siècle',
    matiere: 'histoire',
    items: SIECLES,
    question: (s) => `${s.annee} : à quel siècle ?`,
    reponse: (s) => s.siecle,
    detail: (s) => s.note,
  },

  'avant-apres': {
    titre: 'Avant et après Jésus-Christ',
    matiere: 'histoire',
    items: AVANT_APRES,
    question: (a) => a.question,
    reponse: (a) => a.reponse,
    detail: (a) => a.note,
  },
};
