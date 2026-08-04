// Le parcours découpe le programme en étapes courtes.
//
// Une étape se termine par un défi : le réussir débloque la suivante. Le
// découpage vise des lots d'une dizaine à une vingtaine de connaissances, pour
// qu'une séance reste faisable en une fois.
//
// `lots` désigne les thèmes travaillés, éventuellement restreints à une partie
// de leurs items (`filtre`), ce qui évite de dupliquer le contenu.

import { THEMES } from './themes.js';

/** Réussite minimale au défi pour débloquer l'étape suivante. */
export const SEUIL_DEFI = 0.8;

export const ETAPES = [
  {
    id: 'regions',
    titre: 'Les régions de France',
    sousTitre: 'Les 13 régions métropolitaines et leurs capitales',
    icone: '🗺️',
    matiere: 'geo',
    lots: [{ themeId: 'regions-carte' }, { themeId: 'regions-capitale' }],
  },
  {
    id: 'outre-mer',
    titre: "La France d'outre-mer",
    sousTitre: 'Les 5 DROM et leurs chefs-lieux',
    icone: '🏝️',
    matiere: 'geo',
    lots: [{ themeId: 'drom-carte' }, { themeId: 'drom-capitale' }],
  },
  {
    id: 'relief',
    titre: 'Fleuves, montagnes et mers',
    sousTitre: 'Le relief et les eaux qui bordent la France',
    icone: '🏔️',
    matiere: 'geo',
    lots: [{ themeId: 'fleuves-carte' }, { themeId: 'massifs-carte' }, { themeId: 'mers-carte' }],
  },
  {
    id: 'europe',
    titre: "L'Union européenne",
    sousTitre: 'Nommer et placer les 27 États membres',
    icone: '🇪🇺',
    matiere: 'geo',
    lots: [{ themeId: 'ue-carte' }],
  },
  {
    id: 'dates-gm1',
    titre: "La Grande Guerre et l'entre-deux-guerres",
    sousTitre: 'De 1914 à 1936',
    icone: '📅',
    matiere: 'histoire',
    lots: [{ themeId: 'dates', filtre: (d) => d.periode === 'gm1' || d.periode === 'entre-deux-guerres' }],
  },
  {
    id: 'dates-gm2',
    titre: 'La Seconde Guerre mondiale',
    sousTitre: 'De 1939 à 1945',
    icone: '📅',
    matiere: 'histoire',
    lots: [{ themeId: 'dates', filtre: (d) => d.periode === 'gm2' }],
  },
  {
    id: 'dates-apres',
    titre: "La guerre froide et l'Europe",
    sousTitre: "De 1947 à l'euro",
    icone: '📅',
    matiere: 'histoire',
    lots: [{ themeId: 'dates', filtre: (d) => d.periode === 'guerre-froide' || d.periode === 'europe' }],
  },
  {
    id: 'personnages-guerres',
    titre: 'Les personnages des deux guerres',
    sousTitre: 'Dirigeants, dictateurs et résistants',
    icone: '👤',
    matiere: 'histoire',
    lots: [{
      themeId: 'personnages',
      filtre: (p) => ['gm1', 'entre-deux-guerres', 'gm2'].includes(p.periode),
    }],
  },
  {
    id: 'personnages-apres',
    titre: 'Les personnages après 1945',
    sousTitre: 'Guerre froide, décolonisation et Europe',
    icone: '👤',
    matiere: 'histoire',
    lots: [{
      themeId: 'personnages',
      filtre: (p) => ['guerre-froide', 'decolonisation', 'europe'].includes(p.periode),
    }],
  },
];

/** Les connaissances d'une étape, à plat : [{ cle, themeId, item }]. */
export function itemsDeLEtape(etape) {
  return etape.lots.flatMap(({ themeId, filtre }) =>
    THEMES[themeId].items
      .filter(filtre ?? (() => true))
      .map((item) => ({ cle: `${themeId}:${item.id}`, themeId, item })),
  );
}

export const etapeParId = (id) => ETAPES.find((e) => e.id === id);
