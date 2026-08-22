// Le parcours découpe le programme en étapes courtes.
//
// Une étape se termine par un défi : le réussir débloque la suivante. Le
// découpage suit l'ordre de la fiche — le planisphère, puis les outils du
// géographe, puis la Méditerranée, puis le temps — et vise des lots d'une
// dizaine de connaissances, pour qu'une séance reste faisable en une fois.
//
// `lots` désigne les thèmes travaillés, éventuellement restreints à une partie
// de leurs items (`filtre`), ce qui évite de dupliquer le contenu.

import { THEMES } from './themes.js';

/** Réussite minimale au défi pour débloquer l'étape suivante. */
export const SEUIL_DEFI = 0.8;

export const ETAPES = [
  {
    id: 'continents',
    titre: 'Les continents',
    sousTitre: 'Les six continents, à placer et à nommer',
    icone: '🌍',
    matiere: 'geo',
    // Un seul thème : le moteur interroge déjà dans les deux sens — placer, et
    // nommer ce qui est montré.
    lots: [{ themeId: 'continents-carte' }],
  },
  {
    id: 'oceans',
    titre: 'Les océans',
    sousTitre: 'Les cinq océans sur le planisphère',
    icone: '🌊',
    matiere: 'geo',
    lots: [{ themeId: 'oceans-carte' }],
  },
  {
    id: 'lignes',
    titre: 'Les lignes imaginaires',
    sousTitre: "Équateur, tropiques, cercles polaires et méridien de Greenwich",
    icone: '📐',
    matiere: 'geo',
    lots: [{ themeId: 'lignes-carte' }, { themeId: 'lignes-familles' }],
  },
  {
    id: 'lire-une-carte',
    titre: 'Lire une carte',
    sousTitre: 'La rose des vents, l\'échelle et la légende',
    icone: '🧭',
    matiere: 'geo',
    lots: [{ themeId: 'rose-des-vents' }, { themeId: 'outils-carte' }, { themeId: 'echelle-calcul' }],
  },
  {
    id: 'mediterranee',
    titre: 'Le monde méditerranéen',
    sousTitre: 'Marseille, Rome, Byzance, Alexandrie, Athènes, Jérusalem',
    icone: '🏛️',
    matiere: 'geo',
    lots: [{ themeId: 'villes-carte' }, { themeId: 'villes-role' }],
  },
  {
    id: 'periodes',
    titre: 'Les grandes périodes',
    sousTitre: 'Les cinq périodes et leurs bornes, sur la frise',
    icone: '🕰️',
    matiere: 'histoire',
    lots: [{ themeId: 'periodes-ordre' }, { themeId: 'periodes-dates' }, { themeId: 'periodes-bornes' }],
  },
  {
    id: 'romains-bases',
    titre: 'Les chiffres romains',
    sousTitre: 'Les sept symboles et les règles d\'écriture',
    icone: 'Ⅹ',
    matiere: 'histoire',
    lots: [{ themeId: 'romains-symboles' }, { themeId: 'romains-regles' }],
  },
  {
    id: 'romains-pratique',
    titre: 'Lire et écrire les nombres',
    sousTitre: 'Dans les deux sens, jusqu\'aux milliers',
    icone: '🔢',
    matiere: 'histoire',
    lots: [{ themeId: 'romains-lire' }, { themeId: 'romains-ecrire' }],
  },
  {
    id: 'siecles',
    titre: 'Situer dans le temps',
    sousTitre: 'Trouver le siècle, avant et après J.-C.',
    icone: '📜',
    matiere: 'histoire',
    lots: [{ themeId: 'siecles' }, { themeId: 'avant-apres' }],
  },
];

/**
 * Déplie une étape en connaissances individuelles.
 *
 * La clé `themeId:itemId` est l'unité que la répétition espacée suit : c'est
 * elle, et non l'étape, qui a un niveau et une date de révision.
 */
export function itemsDeLEtape(etape) {
  return etape.lots.flatMap(({ themeId, filtre }) =>
    THEMES[themeId].items
      .filter(filtre ?? (() => true))
      .map((item) => ({ cle: `${themeId}:${item.id}`, themeId, item })),
  );
}

export const etapeParId = (id) => ETAPES.find((e) => e.id === id);

// Garde-fou : une étape qui désigne un thème inexistant produirait une séance
// vide, et l'erreur ne se verrait qu'à l'usage.
for (const etape of ETAPES) {
  for (const lot of etape.lots) {
    if (!THEMES[lot.themeId]) {
      throw new Error(`Étape « ${etape.id} » : thème inconnu « ${lot.themeId} »`);
    }
  }
}
