// Un thème = un lot de connaissances qui se révisent de la même façon.
//
// Chaque thème décrit COMMENT interroger ses items ; les modes de jeu
// (flashcards, quiz, carte) lisent cette description sans rien savoir du
// contenu lui-même. Ajouter un thème ne demande donc de modifier aucun mode.
//
//   question / reponse : les deux faces de la carte à mémoriser
//   detail             : le complément affiché une fois la réponse donnée
//   carte              : présent si l'item se localise (fichier + couche SVG)

import { REGIONS, DROM, FLEUVES, MASSIFS, MERS, PAYS_UE } from './geo.js';
import { DATES, PERSONNAGES } from './histoire.js';

export const THEMES = {
  'regions-carte': {
    titre: 'Situer les régions',
    matiere: 'geo',
    items: REGIONS,
    question: (r) => `Trouve sur la carte : ${r.nom}`,
    reponse: (r) => r.nom,
    detail: (r) => `Capitale : ${r.capitale}.`,
    carte: { fichier: 'france', couche: 'regions' },
  },

  'regions-capitale': {
    titre: 'Les capitales de région',
    matiere: 'geo',
    items: REGIONS,
    question: (r) => `Quelle est la capitale ${r.de} ?`,
    reponse: (r) => r.capitale,
    detail: (r) => `${r.capitale} est la préfecture de région ${r.de}.`,
  },

  'drom-carte': {
    titre: 'Reconnaître les DROM',
    matiere: 'geo',
    items: DROM,
    question: (d) => `Trouve la bonne vignette : ${d.nom}`,
    reponse: (d) => d.nom,
    detail: (d) => `${d.note} Chef-lieu : ${d.capitale}. Dans ${d.ocean}.`,
    carte: { fichier: 'france', couche: 'drom' },
  },

  'drom-capitale': {
    titre: 'Les chefs-lieux des DROM',
    matiere: 'geo',
    items: DROM,
    question: (d) => `Quel est le chef-lieu ${d.de} ?`,
    reponse: (d) => d.capitale,
    detail: (d) => d.note,
  },

  'fleuves-carte': {
    titre: 'Les fleuves',
    matiere: 'geo',
    items: FLEUVES,
    question: (f) => `Trouve sur la carte : ${f.nom}`,
    reponse: (f) => f.nom,
    // La note précise déjà l'embouchure de chaque fleuve, et une phrase générée
    // ne saurait pas accorder « elle » pour la Loire et « il » pour le Rhône.
    detail: (f) => f.note,
    carte: { fichier: 'france', couche: 'fleuves' },
  },

  'massifs-carte': {
    titre: 'Les massifs montagneux',
    matiere: 'geo',
    items: MASSIFS,
    question: (m) => `Trouve sur la carte : ${m.nom}`,
    reponse: (m) => m.nom,
    detail: (m) => m.note,
    carte: { fichier: 'france', couche: 'massifs' },
  },

  'mers-carte': {
    titre: 'Les mers et océans',
    matiere: 'geo',
    items: MERS,
    question: (m) => `Trouve sur la carte : ${m.nom}`,
    reponse: (m) => m.nom,
    detail: (m) => m.note,
    carte: { fichier: 'france', couche: 'mers' },
  },

  'ue-carte': {
    titre: "Les pays de l'Union européenne",
    matiere: 'geo',
    items: PAYS_UE,
    question: (p) => `Trouve sur la carte : ${p.nom}`,
    reponse: (p) => p.nom,
    detail: (p) => `Capitale : ${p.capitale}.`,
    carte: { fichier: 'europe', couche: 'pays' },
  },

  dates: {
    titre: 'Les dates clés',
    matiere: 'histoire',
    items: DATES,
    question: (d) => d.evenement,
    reponse: (d) => d.label,
    detail: (d) => d.detail,
  },

  personnages: {
    titre: 'Les personnages',
    matiere: 'histoire',
    items: PERSONNAGES,
    question: (p) => p.nom,
    reponse: (p) => p.resume,
    detail: (p) => `${p.vie} — ${p.role}`,
  },
};

/** Identifiant stable d'une connaissance, utilisé par le suivi de progression. */
export const cleItem = (themeId, itemId) => `${themeId}:${itemId}`;

/** Tous les items d'un thème, sous forme de couples (clé, item). */
export function itemsDuTheme(themeId) {
  return THEMES[themeId].items.map((item) => ({ cle: cleItem(themeId, item.id), themeId, item }));
}
