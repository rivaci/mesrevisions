// Chapitre 6, savoir-faire 5 — Reconnaître des triangles isométriques.
//
// ── D'où vient ce savoir-faire ────────────────────────────────────────────
//
// Du point [EIB] « triangles isométriques » de la liste de la professeure.
//
// ── La correspondance, plus que la définition ────────────────────────────
//
// « Mêmes trois longueurs » se retient vite. Ce qui résiste, c'est d'associer
// les bons éléments : [AB] ne correspond pas forcément à [DE], et l'angle en
// A est celui qui fait face au côté [BC]. Les réponses fausses prévues sont
// celles qu'on obtient en suivant l'ordre des lettres. Les items « oui/non »
// portent leurs deux listes de longueurs (`isometriques`), et le contrôle de
// contenu les compare.

const OUI_NON = ['oui', 'non'];
const enCm = (longueurs) => `${longueurs.slice(0, -1).join(' cm, ')} cm et ${longueurs.at(-1)} cm`;
const isometriques = (id, palier, t1, t2, attendu, extra = {}) => ({
  id, type: 'choix', palier,
  consigne: 'Ces deux triangles sont-ils isométriques ?',
  enonce: `ABC a pour côtés ${enCm(t1)} ; DEF a pour côtés ${enCm(t2)}.`,
  isometriques: [t1, t2], choix: OUI_NON, attendu,
  ...extra,
});
const fausseOuiNon = (attendu) => [{ valeur: attendu === 'oui' ? 'non' : 'oui', piege: 'isometrie-mal-comprise' }];
const SOMMETS_XYZ = ['l\'angle en X', 'l\'angle en Y', 'l\'angle en Z'];

export default {
  id: 'sf-6-5',
  titre: 'Reconnaître des triangles isométriques',
  attendus: [
    'Il sait que deux triangles sont isométriques s\'ils ont leurs trois côtés deux à deux de même longueur.',
    'Il sait que deux triangles isométriques ont leurs angles deux à deux égaux.',
    'Il associe les côtés et les angles qui se correspondent.',
  ],

  decouvrir: {
    titre: 'Deux triangles superposables',
    texte:
      'Le triangle ABC a pour côtés AB = 5 cm, BC = 6 cm et CA = 4 cm. Le triangle DEF a pour '
      + 'côtés DE = 4 cm, EF = 5 cm et FD = 6 cm.',
    question: 'Combien mesure le côté de DEF qui a la même longueur que [BC] ? Et le côté qui a la même longueur que [AB] ?',
    champs: [
      { id: 'a', etiquette: 'comme [BC], en cm', attendu: 6 },
      { id: 'b', etiquette: 'comme [AB], en cm', attendu: 5 },
    ],
    conclusion:
      'Les deux triangles ont les mêmes longueurs, 4, 5 et 6 cm : ils sont **isométriques**. On '
      + 'peut les superposer, en les retournant si besoin.\n'
      + '[BC] correspond à [FD], et [AB] à [EF] : les côtés se correspondent par leur **longueur**, '
      + 'pas par l\'ordre des lettres.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Triangles isométriques',
      texte:
        'Deux triangles sont **isométriques** s\'ils ont leurs **trois côtés deux à deux de même '
        + 'longueur**. On peut alors les superposer, par un glissement, un demi-tour ou un '
        + 'retournement.',
    },
    {
      type: 'propriete',
      titre: 'Les angles aussi',
      texte:
        'Si deux triangles sont isométriques, leurs angles sont **deux à deux égaux** : l\'angle '
        + 'qui fait face à un côté est égal à l\'angle qui fait face au côté de même longueur.\n'
        + 'Leurs périmètres et leurs aires sont aussi égaux.',
    },
    {
      type: 'remarque',
      titre: 'Les mêmes angles ne suffisent pas',
      texte:
        'Deux triangles qui ont les mêmes angles ne sont pas forcément isométriques : l\'un peut '
        + 'être un **agrandissement** de l\'autre.',
    },
    {
      type: 'exemple',
      texte: 'ABC : 4, 5 et 6 cm   ·   DEF : 6, 4 et 5 cm → isométriques   ·   GHI : 4, 5 et 7 cm → pas isométrique à ABC',
    },
  ],

  methode: {
    titre: 'Associer les angles de deux triangles isométriques',
    enonce:
      'ABC (AB = 7 cm, BC = 5 cm, CA = 3 cm) et RST (RS = 3 cm, ST = 7 cm, TR = 5 cm) sont '
      + 'isométriques. Quel angle de RST est égal à l\'angle en A ?',
    etapes: [
      {
        texte: 'J\'associe les côtés de même longueur : [AB] et [ST] (7 cm), [BC] et [TR] (5 cm), [CA] et [RS] (3 cm).',
        note: '',
      },
      { texte: 'L\'angle en A est formé par les côtés [AB] et [AC], de 7 cm et 3 cm.', note: 'Un angle se repère par les deux côtés qui le forment.' },
      { texte: 'Dans RST, les côtés de 7 cm et 3 cm sont [ST] et [RS] : ils se rejoignent en S.', note: '' },
      { texte: 'L\'angle en A est donc égal à l\'angle en S.', note: '' },
    ],
    controle:
      'Le contrôle : l\'angle en A fait face au côté [BC], de 5 cm ; l\'angle en S fait face au '
      + 'côté [TR], de 5 cm aussi.',
  },

  entrainement: [
    // ── Palier 1 : comparer les longueurs ──────────────────────────────────
    // NEUTRE : les mêmes longueurs, dans le même ordre.
    isometriques('e-6-5-1', 1, [3, 4, 5], [3, 4, 5], 'oui', { neutre: true }),
    // Les mêmes longueurs, dans un autre ordre.
    isometriques('e-6-5-2', 1, [4, 6, 7], [7, 4, 6], 'oui',
      { piege: 'isometrie-mal-comprise', fausses: fausseOuiNon('oui') }),
    isometriques('e-6-5-3', 1, [5, 5, 8], [5, 8, 8], 'non',
      { piege: 'isometrie-mal-comprise', fausses: fausseOuiNon('non') }),
    {
      id: 'e-6-5-4', type: 'choix', palier: 1, piege: 'isometrie-mal-comprise',
      consigne: 'Ces deux triangles sont-ils forcément isométriques ?',
      enonce: 'Deux triangles ont chacun des angles de 30°, 60° et 90°.',
      choix: OUI_NON, attendu: 'non',
      fausses: fausseOuiNon('non'),
    },
    // ── Palier 2 : les éléments qui se correspondent ───────────────────────
    {
      id: 'e-6-5-5', type: 'calcul', palier: 2, piege: 'isometrie-mal-comprise',
      consigne: 'Réponds en centimètres.',
      enonce: 'ABC et DEF sont isométriques, avec AB = 6 cm, BC = 8 cm et CA = 5 cm. Dans DEF, DE = 8 cm et EF = 5 cm. Combien mesure FD ?',
      attendu: 6,
      fausses: [{ valeur: 8, piege: 'isometrie-mal-comprise' }],
    },
    {
      // NEUTRE : la correspondance est donnée, il n'y a qu'à la lire.
      id: 'e-6-5-6', type: 'calcul', palier: 2, neutre: true,
      consigne: 'Réponds en degrés.',
      enonce: 'ABC et DEF sont isométriques, et l\'angle en A correspond à l\'angle en D. L\'angle en A mesure 72°. Combien mesure l\'angle en D ?',
      attendu: 72,
    },
    {
      id: 'e-6-5-7', type: 'calcul', palier: 2, piege: 'isometrie-mal-comprise',
      consigne: 'Réponds en centimètres.',
      enonce: 'ABC et DEF sont isométriques, et le périmètre de ABC mesure 18 cm. Quel est le périmètre de DEF ?',
      attendu: 18,
      fausses: [{ valeur: 36, piege: 'isometrie-mal-comprise' }],
    },
    {
      id: 'e-6-5-8', type: 'choix', palier: 2, piege: 'isometrie-mal-comprise',
      consigne: 'Quel côté de MNP correspond au côté [AB] ?',
      enonce: 'ABC (AB = 4 cm, BC = 6 cm, CA = 5 cm) et MNP (MN = 6 cm, NP = 5 cm, PM = 4 cm) sont isométriques.',
      choix: ['[MN]', '[NP]', '[PM]'], attendu: '[PM]',
      fausses: [
        // [AB] et [MN] : les deux premières lettres de chaque nom.
        { valeur: '[MN]', piege: 'isometrie-mal-comprise' },
        { valeur: '[NP]', piege: 'isometrie-mal-comprise' },
      ],
    },
    // ── Palier 3 : les angles, et réfuter ──────────────────────────────────
    {
      id: 'e-6-5-9', type: 'choix', palier: 3, piege: 'isometrie-mal-comprise',
      consigne: 'Quel angle de XYZ est égal à l\'angle en C ?',
      enonce: 'ABC (AB = 8 cm, BC = 6 cm, CA = 5 cm) et XYZ (XY = 5 cm, YZ = 8 cm, ZX = 6 cm) sont isométriques.',
      choix: SOMMETS_XYZ, attendu: 'l\'angle en X',
      fausses: [
        // C et Z : les troisièmes lettres.
        { valeur: 'l\'angle en Z', piege: 'isometrie-mal-comprise' },
        { valeur: 'l\'angle en Y', piege: 'isometrie-mal-comprise' },
      ],
    },
    {
      id: 'e-6-5-10', type: 'calcul', palier: 3, piege: 'isometrie-mal-comprise',
      consigne: 'Réponds en degrés.',
      enonce: 'ABC et DEF sont isométriques. L\'angle en A mesure 50° et l\'angle en B mesure 60°. L\'angle en D correspond à l\'angle en C. Combien mesure l\'angle en D ?',
      attendu: 70,
      fausses: [{ valeur: 50, piege: 'isometrie-mal-comprise' }],
    },
    {
      id: 'e-6-5-11', type: 'vraifaux', palier: 3, piege: 'isometrie-mal-comprise',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Deux triangles qui ont le même périmètre sont isométriques.',
      attendu: false,
      contreExemple: {
        invite:
          'Le triangle de côtés 3 cm, 4 cm et 5 cm a un périmètre de 12 cm. Quel côté doit avoir un '
          + 'triangle équilatéral pour avoir le même périmètre ?',
        champs: [{ id: 'a', etiquette: 'côté, en cm' }],
        valide: (a) => a === 4,
        exemple: '4 cm : le triangle 4-4-4 a le même périmètre que le triangle 3-4-5, et ils ne sont pas isométriques.',
      },
    },
    {
      id: 'e-6-5-12', type: 'vraifaux', palier: 3, piege: 'isometrie-mal-comprise',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Deux triangles isométriques ont la même aire.',
      attendu: true,
    },
  ],

  problemes: [
    {
      id: 'p-6-5-1',
      enonce: 'Un carré de 6 cm de côté est coupé par une diagonale en deux triangles isométriques.',
      questions: [
        { texte: 'Quelle est l\'aire de chaque triangle ?', attendu: 18, unite: 'cm²' },
        { texte: 'Combien mesure chacun des angles aigus de ces triangles ?', attendu: 45, unite: '°' },
      ],
    },
    {
      id: 'p-6-5-2',
      enonce: 'Un rectangle de 8 cm sur 5 cm est coupé par une diagonale en deux triangles isométriques.',
      questions: [
        { texte: 'Quelle est l\'aire de chaque triangle ?', attendu: 20, unite: 'cm²' },
        { texte: 'Quel est le périmètre du rectangle ?', attendu: 26, unite: 'cm' },
      ],
    },
    {
      id: 'p-6-5-3',
      enonce: 'Des tuiles triangulaires isométriques ont des côtés de 12 cm, 15 cm et 20 cm.',
      questions: [
        { texte: 'Quel est le périmètre d\'une tuile ?', attendu: 47, unite: 'cm' },
        { texte: 'Quelle longueur de bordure faut-il pour entourer quatre tuiles posées séparément ?', attendu: 188, unite: 'cm' },
      ],
    },
    {
      id: 'p-6-5-4',
      enonce:
        'Le parallélogramme ABCD est coupé par la diagonale [AC] en deux triangles isométriques, '
        + 'ABC et CDA. On sait que AB = 7 cm, BC = 4 cm, et que l\'angle en B mesure 110°.',
      questions: [
        { texte: 'Combien mesure l\'angle en D ?', attendu: 110, unite: '°' },
        { texte: 'Combien mesure CD ?', attendu: 7, unite: 'cm' },
      ],
    },
    {
      id: 'p-6-5-5',
      enonce:
        'Un losange de 5 cm de côté est coupé par ses deux diagonales, de 6 cm et 8 cm, en quatre '
        + 'triangles rectangles isométriques.',
      questions: [
        { texte: 'Combien mesure le plus petit côté de chaque triangle ?', attendu: 3, unite: 'cm' },
        { texte: 'Combien mesure son plus grand côté ?', attendu: 5, unite: 'cm' },
        { texte: 'Quelle est l\'aire de chaque triangle ?', attendu: 6, unite: 'cm²' },
      ],
    },
  ],

  test: [
    isometriques('t-6-5-1', undefined, [5, 6, 7], [7, 5, 6], 'oui', { revoir: 'definition' }),
    isometriques('t-6-5-2', undefined, [3, 3, 4], [3, 4, 4], 'non', { revoir: 'definition' }),
    isometriques('t-6-5-3', undefined, [2, 5, 6], [6, 2, 5], 'oui', { revoir: 'definition' }),
    {
      id: 't-6-5-4', type: 'choix', consigne: 'Ces deux triangles sont-ils forcément isométriques ?',
      enonce: 'Deux triangles équilatéraux.', choix: OUI_NON, attendu: 'non', revoir: 'remarque',
    },
    {
      id: 't-6-5-5', type: 'calcul', consigne: 'Réponds en centimètres.',
      enonce: 'ABC (AB = 9 cm, BC = 7 cm, CA = 4 cm) et DEF sont isométriques, avec DE = 4 cm et EF = 9 cm. Combien mesure FD ?',
      attendu: 7, revoir: 'definition',
    },
    {
      id: 't-6-5-6', type: 'calcul', consigne: 'Réponds en centimètres.',
      enonce: 'ABC a pour côtés 3 cm, 7 cm et 8 cm, et DEF lui est isométrique. Quel est le périmètre de DEF ?',
      attendu: 18, revoir: 'propriete',
    },
    {
      id: 't-6-5-7', type: 'calcul', consigne: 'Réponds en degrés.',
      enonce: 'ABC et DEF sont isométriques, et l\'angle en E correspond à l\'angle en B. L\'angle en A mesure 35° et l\'angle en B mesure 100°. Combien mesure l\'angle en E ?',
      attendu: 100, revoir: 'propriete',
    },
    {
      id: 't-6-5-8', type: 'choix', consigne: 'Quel côté de KLM correspond au côté [BC] ?',
      enonce: 'ABC (AB = 3 cm, BC = 5 cm, CA = 4 cm) et KLM (KL = 5 cm, LM = 4 cm, MK = 3 cm) sont isométriques.',
      choix: ['[KL]', '[LM]', '[MK]'], attendu: '[KL]', revoir: 'propriete',
    },
    {
      id: 't-6-5-9', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Deux triangles isométriques sont superposables.', attendu: true, revoir: 'definition',
    },
    {
      id: 't-6-5-10', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Deux triangles qui ont les mêmes angles sont toujours isométriques.', attendu: false, revoir: 'remarque',
    },
  ],
};
