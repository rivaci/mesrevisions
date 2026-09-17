// Chapitre 4, savoir-faire 3 — Le symétrique d'un point par rapport à un point.
//
// ── D'où vient ce savoir-faire ────────────────────────────────────────────
//
// Du point « demi-tour (symétrie centrale) » de la liste de la professeure :
// c'est la notion nouvelle du chapitre.
//
// ── Le demi-tour contre le pliage ────────────────────────────────────────
//
// L'erreur la plus attendue n'est pas un mauvais comptage : c'est de plier au
// lieu de tourner. Un point en haut à gauche du centre, plié le long d'une
// verticale, reste en haut ; retourné d'un demi-tour, il passe en bas à
// droite. Les QCM placent donc toujours les deux « symétriques par pliage »
// (droite verticale et droite horizontale passant par le centre) à côté du
// bon point.
//
// Le centre s'appelle K dans les figures : sur le repère, la lettre O est
// déjà prise par l'origine.

const repere = (points, extra = {}) => ({ modele: 'repere', points, ...extra });
const droite = (min, max, pas, points, ecrites) => ({ modele: 'droite', min, max, pas, points, ecrites });
const coordonnees = (x, y) => [
  { id: 'x', etiquette: 'abscisse', attendu: x },
  { id: 'y', etiquette: 'ordonnée', attendu: y },
];
const COTES = ['en haut à gauche de K', 'en haut à droite de K', 'en bas à gauche de K', 'en bas à droite de K'];
const TRANSFORMATIONS = [
  'la symétrie par rapport à l\'origine O',
  'la symétrie par rapport à l\'axe des abscisses',
  'la symétrie par rapport à l\'axe des ordonnées',
];

export default {
  id: 'sf-4-3',
  titre: 'Construire le symétrique d\'un point par rapport à un point',
  attendus: [
    'Il sait que A\' est le symétrique de A par rapport à K quand K est le milieu de [AA\'].',
    'Il construit le symétrique d\'un point sur un quadrillage, par un demi-tour.',
    'Il distingue la symétrie centrale de la symétrie axiale.',
  ],

  decouvrir: {
    titre: 'Le demi-tour',
    texte:
      'On plante une punaise au point K et on fait faire un demi-tour à la feuille. Le point A '
      + 'arrive en un point A\'. Pour aller de A à K, on fait 3 carreaux vers la droite et 2 '
      + 'vers le bas ; A\' s\'obtient en refaisant le même trajet à partir de K.',
    figure: repere({ A: [-2, 3], K: [1, 1] }, { segments: [['A', 'K']] }),
    question: 'Quelles sont les coordonnées de A\' ?',
    champs: [
      { id: 'a', etiquette: 'abscisse de A\'', attendu: 4 },
      { id: 'b', etiquette: 'ordonnée de A\'', attendu: -1 },
    ],
    conclusion:
      'A\'(4 ; −1) est le **symétrique** de A par rapport à K : K est le **milieu** de [AA\'].\n'
      + 'Ce demi-tour s\'appelle la **symétrie centrale** de centre K. A était en haut à gauche '
      + 'de K ; A\' est en bas à droite : il a changé de côté dans les **deux** directions.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Le symétrique d\'un point par rapport à un point',
      texte:
        'Le **symétrique** d\'un point A par rapport à un point K est le point A\' tel que '
        + '**K soit le milieu de [AA\']**.\n'
        + 'La transformation s\'appelle la **symétrie centrale** de centre K : c\'est un '
        + '**demi-tour** autour de K. Le symétrique de K est K lui-même.',
      figure: repere({ A: [-3, 2], K: [1, 0], 'A\'': [5, -2] }, { segments: [['A', 'A\'']] }),
    },
    {
      type: 'propriete',
      titre: 'Construire sur un quadrillage',
      texte:
        'On compte le trajet de A jusqu\'à K (tant de carreaux horizontalement, tant '
        + 'verticalement), puis on refait **exactement le même trajet** à partir de K.\n'
        + 'Sans quadrillage : on trace la demi-droite [AK), puis on reporte la longueur AK '
        + 'au-delà de K, au compas.',
    },
    {
      type: 'remarque',
      titre: 'Demi-tour ou pliage ?',
      texte:
        'Symétrie **axiale** : un **pliage** le long d\'une droite. Symétrie **centrale** : un '
        + '**demi-tour** autour d\'un point.\n'
        + 'Un point en haut à gauche de K arrive **en bas à droite** de K par la symétrie de '
        + 'centre K. Plié le long d\'une droite verticale passant par K, il resterait en haut.',
    },
    {
      type: 'exemple',
      texte:
        'K(1 ; 0) et A(−3 ; 2) : de A à K, 4 à droite et 2 vers le bas ; de K à A\', encore 4 à '
        + 'droite et 2 vers le bas : A\'(5 ; −2).',
    },
  ],

  methode: {
    titre: 'Construire le symétrique de B par rapport à K',
    enonce: 'Quelles sont les coordonnées du symétrique de B par rapport à K ?',
    figure: repere({ B: [2, 3], K: [-1, 1] }),
    etapes: [
      { texte: 'Je compte le trajet de B à K : 3 carreaux vers la gauche, 2 vers le bas.', note: 'Les deux directions comptent.' },
      {
        texte: 'Je refais le même trajet depuis K : 3 carreaux vers la gauche, 2 vers le bas.',
        note: 'Même sens, même longueur : c\'est ce qui place K au milieu.',
      },
      { texte: 'J\'arrive en B\'(−4 ; −1).', note: '' },
    ],
    controle:
      'Le contrôle : K doit être le milieu de [BB\']. B, K et B\' sont alignés, et il y a '
      + 'autant de carreaux de B à K que de K à B\'.',
  },

  entrainement: [
    // ── Palier 1 : construire sur le quadrillage ───────────────────────────
    {
      // NEUTRE : aucune construction, seulement la définition par le milieu.
      id: 'e-4-3-1', type: 'calcul', palier: 1, neutre: true,
      consigne: 'Réponds en centimètres.',
      enonce: 'A\' est le symétrique de A par rapport à K, et KA = 3,8 cm. Combien mesure KA\' ?',
      attendu: 3.8,
    },
    {
      id: 'e-4-3-2', type: 'choix', palier: 1, piege: 'symetries-confondues',
      consigne: 'Quel point est le symétrique de A par rapport à K ?', enonce: 'Trouve le symétrique de A.',
      figure: repere({ A: [-2, 3], K: [1, 1], B: [4, 3], C: [-2, -1], D: [4, -1], E: [2.5, 0] }),
      symetriqueDe: { point: 'A', centre: 'K' },
      choix: ['B', 'C', 'D', 'E'], attendu: 'D',
      fausses: [
        // Plié le long de la verticale, puis de l'horizontale, passant par K.
        { valeur: 'B', piege: 'symetries-confondues' },
        { valeur: 'C', piege: 'symetries-confondues' },
        // La moitié du trajet seulement après K.
        { valeur: 'E', piege: 'centre-pas-milieu' },
      ],
    },
    {
      id: 'e-4-3-3', type: 'trous', palier: 1, piege: 'symetries-confondues',
      consigne: 'Donne les coordonnées du symétrique de B par rapport à K.',
      enonce: 'Quelles sont les coordonnées du symétrique de B ?',
      figure: repere({ B: [3, 2], K: [1, 0] }),
      symetriqueDe: { point: 'B', centre: 'K' }, champs: coordonnees(-1, -2),
      fausses: [
        // L'ordonnée gardée : un pliage.
        { valeur: 2, piege: 'symetries-confondues' },
        // Le demi-tour fait autour de l'origine.
        { valeur: -3, piege: 'centre-pas-milieu' },
      ],
    },
    {
      id: 'e-4-3-4', type: 'choix', palier: 1, piege: 'symetries-confondues',
      consigne: 'Quel point est le symétrique de C par rapport à K ?', enonce: 'Trouve le symétrique de C.',
      figure: repere({ C: [1, 2], K: [-1, -1], F: [-3, 2], G: [1, -4], H: [-2, -2.5], L: [-3, -4] }),
      symetriqueDe: { point: 'C', centre: 'K' },
      choix: ['F', 'G', 'H', 'L'], attendu: 'L',
      fausses: [
        { valeur: 'F', piege: 'symetries-confondues' },
        { valeur: 'G', piege: 'symetries-confondues' },
        { valeur: 'H', piege: 'centre-pas-milieu' },
      ],
    },
    // ── Palier 2 : sans figure, puis le cas particulier ────────────────────
    {
      id: 'e-4-3-5', type: 'trous', palier: 2, piege: 'symetries-confondues',
      consigne: 'Donne les coordonnées du symétrique de D par rapport à K.',
      enonce: 'Quelles sont les coordonnées du symétrique de D ?',
      figure: repere({ D: [-4, 3], K: [-1, 1] }),
      symetriqueDe: { point: 'D', centre: 'K' }, champs: coordonnees(2, -1),
      fausses: [
        { valeur: 3, piege: 'symetries-confondues' },
        { valeur: 4, piege: 'centre-pas-milieu' },
      ],
    },
    {
      id: 'e-4-3-6', type: 'calcul', palier: 2, piege: 'centre-pas-milieu',
      consigne: 'Réponds en centimètres.',
      enonce: 'A\' est le symétrique de A par rapport à K, et AA\' = 10 cm. Combien mesure KA ?',
      attendu: 5,
      fausses: [
        { valeur: 10, piege: 'centre-pas-milieu' },
        { valeur: 20, piege: 'centre-pas-milieu' },
      ],
    },
    {
      id: 'e-4-3-7', type: 'choix', palier: 2, piege: 'symetries-confondues',
      consigne: 'Où se trouve son symétrique par rapport à K ?',
      enonce: 'Le point A est en haut à gauche du point K.',
      choix: COTES, attendu: 'en bas à droite de K',
      fausses: [
        { valeur: 'en haut à droite de K', piege: 'symetries-confondues' },
        { valeur: 'en bas à gauche de K', piege: 'symetries-confondues' },
        { valeur: 'en haut à gauche de K', piege: 'centre-pas-milieu' },
      ],
    },
    {
      // NEUTRE : un point sur l'horizontale de K. Pliage et demi-tour donnent
      // ici le même point — l'item ne départage pas, il rassure.
      id: 'e-4-3-8', type: 'trous', palier: 2, neutre: true,
      consigne: 'Donne les coordonnées du symétrique de E par rapport à K.',
      enonce: 'Quelles sont les coordonnées du symétrique de E ?',
      figure: repere({ E: [-2, 1], K: [1, 1] }),
      symetriqueDe: { point: 'E', centre: 'K' }, champs: coordonnees(4, 1),
    },
    // ── Palier 3 : droite graduée, milieu, réfutation ──────────────────────
    {
      id: 'e-4-3-9', type: 'calcul', palier: 3, piege: 'centre-pas-milieu',
      consigne: 'Donne l\'abscisse du symétrique de A par rapport à K.',
      enonce: 'Quelle est l\'abscisse du symétrique de A par rapport à K ?',
      figure: droite(-5, 3, 1, { A: 2, K: -1 }),
      attendu: -4,
      fausses: [
        // La moitié du trajet après K.
        { valeur: -2.5, piege: 'centre-pas-milieu' },
        // Le demi-tour fait autour de 0.
        { valeur: -2, piege: 'centre-pas-milieu' },
      ],
    },
    {
      id: 'e-4-3-10', type: 'trous', palier: 3, piege: 'centre-pas-milieu',
      consigne: 'K est le milieu de [AB]. Donne les coordonnées de B.',
      enonce: 'Quelles sont les coordonnées de B ?',
      figure: repere({ A: [-3, -2], K: [0, -1] }),
      symetriqueDe: { point: 'A', centre: 'K' }, champs: coordonnees(3, 0),
      fausses: [{ valeur: 1.5, piege: 'centre-pas-milieu' }],
    },
    {
      id: 'e-4-3-11', type: 'vraifaux', palier: 3, piege: 'centre-pas-milieu',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Le symétrique d\'un point par rapport à K est toujours un autre point.',
      figure: repere({ K: [1, 2] }),
      attendu: false,
      contreExemple: {
        invite: 'Donne les coordonnées d\'un point qui est son propre symétrique par rapport à K.',
        champs: [{ id: 'a', etiquette: 'abscisse' }, { id: 'b', etiquette: 'ordonnée' }],
        valide: (a, b) => a === 1 && b === 2,
        exemple: 'Le point K(1 ; 2) lui-même : le demi-tour autour de K ne le déplace pas.',
      },
    },
    {
      id: 'e-4-3-12', type: 'choix', palier: 3, piege: 'symetries-confondues',
      consigne: 'Quelle symétrie transforme A en A\' ?', enonce: 'Dans un repère : A(−2 ; 3) et A\'(2 ; −3).',
      choix: TRANSFORMATIONS, attendu: TRANSFORMATIONS[0],
      fausses: [
        { valeur: TRANSFORMATIONS[1], piege: 'symetries-confondues' },
        { valeur: TRANSFORMATIONS[2], piege: 'symetries-confondues' },
      ],
    },
  ],

  problemes: [
    {
      id: 'p-4-3-1',
      enonce:
        'Les ailes d\'un moulin tournent autour de leur centre K. L\'extrémité P d\'une aile est à '
        + '6 m de K, et l\'aile opposée est symétrique de la première par rapport à K.',
      questions: [
        { texte: 'À quelle distance de K se trouve l\'extrémité P\' de l\'aile opposée ?', attendu: 6, unite: 'm' },
        { texte: 'Quelle est la distance PP\' ?', attendu: 12, unite: 'm' },
      ],
    },
    {
      id: 'p-4-3-2',
      enonce: 'Dans ce repère, on construit les symétriques A\' et B\' des points A et B par rapport à K.',
      figure: repere({ A: [-3, 2], B: [-1, -1], K: [1, 0] }, { xmin: -6, xmax: 6 }),
      questions: [
        { texte: 'Quelle est l\'abscisse de A\' ?', attendu: 5 },
        { texte: 'Quelle est l\'ordonnée de A\' ?', attendu: -2 },
        { texte: 'Quelle est l\'abscisse de B\' ?', attendu: 3 },
      ],
    },
    {
      id: 'p-4-3-3',
      enonce: 'Sur une droite graduée, K a pour abscisse 2 et le point M a pour abscisse −3.',
      questions: [
        { texte: 'Combien d\'unités séparent M de K ?', attendu: 5 },
        { texte: 'Quelle est l\'abscisse du symétrique de M par rapport à K ?', attendu: 7 },
      ],
    },
    {
      id: 'p-4-3-4',
      enonce:
        'Un robot va du point A au point K en faisant 5 pas vers l\'est et 2 pas vers le nord. '
        + 'Il continue jusqu\'au symétrique A\' de A par rapport à K.',
      questions: [
        { texte: 'Combien de pas vers l\'est fait-il entre K et A\' ?', attendu: 5 },
        { texte: 'Combien de pas vers le nord fait-il entre K et A\' ?', attendu: 2 },
        { texte: 'Combien de pas vers l\'est a-t-il faits en tout, de A à A\' ?', attendu: 10 },
      ],
    },
    {
      id: 'p-4-3-5',
      enonce: 'Le segment [AB] mesure 7,4 cm, et B est le symétrique de A par rapport au point K.',
      questions: [
        { texte: 'Combien mesure KA ?', attendu: 3.7, unite: 'cm' },
        { texte: 'Combien mesure KB ?', attendu: 3.7, unite: 'cm' },
      ],
    },
  ],

  test: [
    {
      id: 't-4-3-1', type: 'choix', consigne: 'Quel point est le symétrique de A par rapport à K ?', enonce: 'Trouve le symétrique de A.',
      figure: repere({ A: [-1, 3], K: [1, 1], B: [3, -1], C: [3, 3], D: [-1, -1] }),
      symetriqueDe: { point: 'A', centre: 'K' }, choix: ['B', 'C', 'D'], attendu: 'B', revoir: 'propriete',
    },
    {
      id: 't-4-3-2', type: 'trous', consigne: 'Donne les coordonnées du symétrique de E par rapport à K.',
      enonce: 'Quelles sont les coordonnées du symétrique de E ?',
      figure: repere({ E: [-3, -2], K: [-1, 0] }),
      symetriqueDe: { point: 'E', centre: 'K' }, champs: coordonnees(1, 2), revoir: 'propriete',
    },
    {
      id: 't-4-3-3', type: 'trous', consigne: 'Donne les coordonnées du symétrique de F par rapport à K.',
      enonce: 'Quelles sont les coordonnées du symétrique de F ?',
      figure: repere({ F: [2, 4], K: [1, 1] }),
      symetriqueDe: { point: 'F', centre: 'K' }, champs: coordonnees(0, -2), revoir: 'propriete',
    },
    {
      id: 't-4-3-4', type: 'trous', consigne: 'Donne les coordonnées du symétrique de G par rapport à K.',
      enonce: 'Quelles sont les coordonnées du symétrique de G ?',
      figure: repere({ G: [-4, 1], K: [-2, 1] }),
      symetriqueDe: { point: 'G', centre: 'K' }, champs: coordonnees(0, 1), revoir: 'propriete',
    },
    {
      id: 't-4-3-5', type: 'calcul', consigne: 'Réponds en centimètres.',
      enonce: 'A\' est le symétrique de A par rapport à K, et KA = 4,5 cm. Combien mesure AA\' ?', attendu: 9, revoir: 'definition',
    },
    {
      id: 't-4-3-6', type: 'calcul', consigne: 'Donne l\'abscisse du symétrique de M par rapport à K.',
      enonce: 'Quelle est l\'abscisse du symétrique de M par rapport à K ?',
      figure: droite(-4, 6, 1, { M: -3, K: 1 }), attendu: 5, revoir: 'definition',
    },
    {
      id: 't-4-3-7', type: 'choix', consigne: 'Où se trouve son symétrique par rapport à K ?',
      enonce: 'Le point A est en bas à gauche du point K.',
      choix: COTES, attendu: 'en haut à droite de K', revoir: 'remarque',
    },
    {
      id: 't-4-3-8', type: 'choix', consigne: 'Quelle symétrie transforme A en A\' ?', enonce: 'Dans un repère : A(3 ; 1) et A\'(−3 ; −1).',
      choix: TRANSFORMATIONS, attendu: TRANSFORMATIONS[0], revoir: 'remarque',
    },
    {
      id: 't-4-3-9', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Si A\' est le symétrique de A par rapport à K, alors K est le milieu de [AA\'].', attendu: true, revoir: 'definition',
    },
    {
      id: 't-4-3-10', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Le symétrique d\'un point par rapport à un point s\'obtient par pliage.', attendu: false, revoir: 'remarque',
    },
  ],
};
