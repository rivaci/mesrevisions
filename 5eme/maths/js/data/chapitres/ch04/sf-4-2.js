// Chapitre 4, savoir-faire 2 — Le milieu et la médiatrice d'un segment.
//
// ── D'où vient ce savoir-faire ────────────────────────────────────────────
//
// Du point [EIB] « médiatrice (tracé et propriétés), définition du milieu »
// de la liste de la professeure. Le milieu est la clé de tout le chapitre :
// la symétrie axiale se définit par la médiatrice, la symétrie centrale par
// le milieu.
//
// ── Deux conditions, chaque fois ─────────────────────────────────────────
//
// Le milieu : SUR le segment ET à égale distance. La médiatrice :
// PERPENDICULAIRE ET par le milieu. L'erreur type ne se trompe pas de
// définition, elle en garde la moitié. Les QCM de reconnaissance proposent
// donc chaque fois une droite qui remplit une seule des deux conditions, et
// le contrôle de contenu vérifie la réponse sur la figure (`mediatriceDe`).

const repere = (points, extra = {}) => ({ modele: 'repere', points, ...extra });
const droite = (min, max, pas, points, ecrites) => ({ modele: 'droite', min, max, pas, points, ecrites });
const coordonnees = (x, y) => [
  { id: 'x', etiquette: 'abscisse', attendu: x },
  { id: 'y', etiquette: 'ordonnée', attendu: y },
];
const reponsesMediatrice = (s) => [
  'oui',
  `non : (d) ne passe pas par le milieu de [${s}]`,
  `non : (d) n'est pas perpendiculaire à [${s}]`,
];

export default {
  id: 'sf-4-2',
  titre: 'Utiliser le milieu et la médiatrice d\'un segment',
  attendus: [
    'Il définit le milieu d\'un segment et le trouve sur une droite graduée ou dans un repère.',
    'Il définit la médiatrice d\'un segment et la reconnaît.',
    'Il utilise la propriété : un point de la médiatrice est à égale distance des extrémités.',
    'Il connaît le tracé de la médiatrice au compas.',
  ],

  decouvrir: {
    titre: 'À égale distance',
    texte:
      'A et B sont deux maisons. On cherche où creuser un puits à la même distance des deux. '
      + 'I est le milieu du segment [AB] ; la droite (d) passe par I.',
    figure: repere({ A: [-2, -1], B: [4, -1], I: [1, -1], P: [1, 3] }, { axe: { x: 1 }, segments: [['A', 'B']] }),
    question: 'Combien de carreaux séparent I de A ? Et I de B ?',
    champs: [
      { id: 'a', etiquette: 'de I à A', attendu: 3 },
      { id: 'b', etiquette: 'de I à B', attendu: 3 },
    ],
    conclusion:
      'I est le **milieu** de [AB] : il est **sur** le segment, à la même distance de A et de B.\n'
      + 'La droite (d) passe par I et fait un angle droit avec [AB] : c\'est la **médiatrice** de '
      + '[AB]. Tous ses points sont à égale distance de A et de B — le point P aussi. Mais P '
      + 'n\'est pas sur le segment : ce n\'est pas le milieu.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Le milieu d\'un segment',
      texte:
        'Le **milieu** d\'un segment [AB] est le point I **du segment** tel que **IA = IB**.\n'
        + 'Sur une droite graduée, il est à mi-chemin entre A et B : de −3 à 5, il y a 8 unités ; '
        + 'le milieu est à 4 unités de chacun, en 1.',
      figure: droite(-4, 6, 1, { A: -3, I: 1, B: 5 }),
    },
    {
      type: 'definition',
      titre: 'La médiatrice d\'un segment',
      texte:
        'La **médiatrice** d\'un segment est la droite **perpendiculaire** à ce segment qui passe '
        + 'par son **milieu**.',
      figure: repere({ A: [-2, -1], B: [4, -1], I: [1, -1] }, { axe: { x: 1 }, segments: [['A', 'B']] }),
    },
    {
      type: 'propriete',
      titre: 'La propriété de la médiatrice',
      texte:
        'Si un point est **sur la médiatrice** de [AB], alors il est **à égale distance** de A '
        + 'et de B.\n'
        + 'Réciproquement, si un point est à égale distance de A et de B, alors il est sur la '
        + 'médiatrice de [AB].',
    },
    {
      type: 'remarque',
      titre: 'Tracer la médiatrice au compas',
      texte:
        'On pointe le compas en A, avec un écartement **plus grand que la moitié de AB**, et on '
        + 'trace un arc de chaque côté du segment. On recommence en B **avec le même '
        + 'écartement**. Les deux arcs se coupent en deux points : la droite qui les joint est la '
        + 'médiatrice.\n'
        + 'Ça marche grâce à la propriété : chacun de ces deux points est à la même distance de '
        + 'A et de B.',
    },
    {
      type: 'exemple',
      texte: 'I milieu de [AB] : I est sur [AB] et IA = IB   ·   M sur la médiatrice de [AB] : MA = MB',
    },
  ],

  methode: {
    titre: 'Trouver le milieu de [AB] dans un repère',
    enonce: 'Quelles sont les coordonnées du milieu I de [AB] ?',
    figure: repere({ A: [-3, 1], B: [3, -3] }, { segments: [['A', 'B']] }),
    etapes: [
      { texte: 'Horizontalement, de A à B, il y a 6 carreaux vers la droite. La moitié : 3 carreaux.', note: '' },
      { texte: 'Verticalement, de A à B, il y a 4 carreaux vers le bas. La moitié : 2 carreaux.', note: '' },
      {
        texte: 'Depuis A, je fais la moitié du trajet : 3 carreaux à droite, 2 vers le bas. J\'arrive en I(0 ; −1).',
        note: 'On part de A, pas de l\'origine.',
      },
    ],
    controle:
      'Le contrôle : depuis I, refais le même demi-trajet (3 à droite, 2 vers le bas). Tu '
      + 'dois arriver en B.',
  },

  entrainement: [
    // ── Palier 1 : le milieu sur une droite graduée ────────────────────────
    {
      // NEUTRE : deux abscisses positives, la moitié se voit.
      id: 'e-4-2-1', type: 'calcul', palier: 1, neutre: true,
      consigne: 'Donne l\'abscisse du milieu de [AB].', enonce: 'Quelle est l\'abscisse du milieu de [AB] ?',
      figure: droite(-1, 7, 1, { A: 1, B: 5 }), milieuDe: ['A', 'B'], attendu: 3,
    },
    {
      id: 'e-4-2-2', type: 'calcul', palier: 1, piege: 'milieu-mal-compris',
      consigne: 'Donne l\'abscisse du milieu de [CD].', enonce: 'Quelle est l\'abscisse du milieu de [CD] ?',
      figure: droite(-6, 4, 1, { C: -5, D: 3 }), milieuDe: ['C', 'D'], attendu: -1,
      fausses: [
        // La moitié de CD (8 ÷ 2) comptée depuis 0.
        { valeur: 4, piege: 'milieu-mal-compris' },
        { valeur: 1, piege: 'signe-oublie' },
      ],
    },
    {
      id: 'e-4-2-3', type: 'calcul', palier: 1, piege: 'milieu-mal-compris',
      consigne: 'Donne l\'abscisse du milieu de [EF].', enonce: 'Quelle est l\'abscisse du milieu de [EF] ?',
      figure: droite(-8, 2, 1, { E: -7, F: -1 }), milieuDe: ['E', 'F'], attendu: -4,
      fausses: [
        { valeur: 3, piege: 'milieu-mal-compris' },
        { valeur: -3, piege: 'milieu-mal-compris' },
      ],
    },
    // ── Palier 2 : dans le repère, et la propriété de la médiatrice ────────
    {
      id: 'e-4-2-4', type: 'trous', palier: 2, piege: 'milieu-mal-compris',
      consigne: 'Donne les coordonnées du milieu I de [AB].', enonce: 'Quelles sont les coordonnées de I ?',
      figure: repere({ A: [-4, 3], B: [2, -1] }, { segments: [['A', 'B']] }),
      milieuDe: ['A', 'B'], champs: coordonnees(-1, 1),
      fausses: [
        // Les demi-trajets (3 et 2) comptés depuis l'origine.
        { valeur: 3, piege: 'milieu-mal-compris' },
        { valeur: 2, piege: 'milieu-mal-compris' },
      ],
    },
    {
      id: 'e-4-2-5', type: 'calcul', palier: 2, piege: 'mediatrice-mal-comprise',
      consigne: 'Réponds en centimètres.',
      enonce: 'Le point M est sur la médiatrice de [AB], et MA = 5,2 cm. Combien mesure MB ?',
      attendu: 5.2,
      fausses: [{ valeur: 2.6, piege: 'mediatrice-mal-comprise' }],
    },
    {
      id: 'e-4-2-6', type: 'calcul', palier: 2, piege: 'milieu-mal-compris',
      consigne: 'Réponds en centimètres.',
      enonce: 'I est le milieu de [AB], et AB = 9 cm. Combien mesure AI ?',
      attendu: 4.5,
      fausses: [
        { valeur: 9, piege: 'milieu-mal-compris' },
        { valeur: 18, piege: 'milieu-mal-compris' },
      ],
    },
    {
      id: 'e-4-2-7', type: 'choix', palier: 2, piege: 'mediatrice-mal-comprise',
      consigne: 'La droite (d) est-elle la médiatrice du segment [AB] ?', enonce: 'Observe la droite (d) et le segment [AB].',
      figure: repere({ A: [-1, -1], B: [3, 3] }, { axe: { x: 1 }, segments: [['A', 'B']] }),
      mediatriceDe: ['A', 'B'],
      choix: reponsesMediatrice('AB'), attendu: reponsesMediatrice('AB')[2],
      fausses: [
        { valeur: 'oui', piege: 'mediatrice-mal-comprise' },
        { valeur: reponsesMediatrice('AB')[1], piege: 'milieu-mal-compris' },
      ],
    },
    {
      id: 'e-4-2-8', type: 'choix', palier: 2, piege: 'mediatrice-mal-comprise',
      consigne: 'La droite (d) est-elle la médiatrice du segment [CD] ?', enonce: 'Observe la droite (d) et le segment [CD].',
      figure: repere({ C: [-3, 2], D: [3, 2] }, { axe: { x: 1 }, segments: [['C', 'D']] }),
      mediatriceDe: ['C', 'D'],
      choix: reponsesMediatrice('CD'), attendu: reponsesMediatrice('CD')[1],
      fausses: [
        { valeur: 'oui', piege: 'mediatrice-mal-comprise' },
        { valeur: reponsesMediatrice('CD')[2], piege: 'mediatrice-mal-comprise' },
      ],
    },
    {
      // NEUTRE : cette fois, c'est bien la médiatrice — sans lui, « non »
      // deviendrait la réponse réflexe.
      id: 'e-4-2-9', type: 'choix', palier: 2, neutre: true,
      consigne: 'La droite (d) est-elle la médiatrice du segment [EF] ?', enonce: 'Observe la droite (d) et le segment [EF].',
      figure: repere({ E: [2, -2], F: [2, 4] }, { axe: { y: 1 }, segments: [['E', 'F']] }),
      mediatriceDe: ['E', 'F'],
      choix: reponsesMediatrice('EF'), attendu: 'oui',
    },
    // ── Palier 3 : réfuter, tracer, raisonner ──────────────────────────────
    {
      id: 'e-4-2-10', type: 'vraifaux', palier: 3, piege: 'milieu-mal-compris',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Un point situé à la même distance de A et de B est forcément le milieu de [AB].',
      figure: repere({ A: [-2, 0], B: [2, 0] }, { segments: [['A', 'B']] }),
      attendu: false,
      contreExemple: {
        invite: 'Donne les coordonnées d\'un point à égale distance de A et de B, qui n\'est pas le milieu de [AB].',
        champs: [{ id: 'a', etiquette: 'abscisse' }, { id: 'b', etiquette: 'ordonnée' }],
        valide: (a, b) => a === 0 && b !== 0,
        exemple: 'Le point (0 ; 3) est sur la médiatrice de [AB] : il est à égale distance de A et de B, mais pas sur le segment.',
      },
    },
    {
      id: 'e-4-2-11', type: 'choix', palier: 3, piege: 'mediatrice-mal-comprise',
      consigne: 'Pour tracer la médiatrice de [AB] au compas, quel écartement peut-on prendre ?',
      enonce: 'Le segment [AB] mesure 6 cm.',
      choix: ['2 cm', '3 cm', '4 cm'], attendu: '4 cm',
      fausses: [
        { valeur: '2 cm', piege: 'mediatrice-mal-comprise' },
        { valeur: '3 cm', piege: 'mediatrice-mal-comprise' },
      ],
    },
    {
      id: 'e-4-2-12', type: 'calcul', palier: 3, piege: 'mediatrice-mal-comprise',
      consigne: 'Réponds en centimètres.',
      enonce: 'Le triangle ABM a un périmètre de 20 cm, AB = 6 cm, et M est sur la médiatrice de [AB]. Combien mesure MA ?',
      attendu: 7,
      fausses: [
        // MA + MB = 14 cm, sans partager en deux longueurs égales.
        { valeur: 14, piege: 'mediatrice-mal-comprise' },
        { valeur: 10, piege: 'mediatrice-mal-comprise' },
      ],
    },
  ],

  problemes: [
    {
      id: 'p-4-2-1',
      enonce:
        'Deux fermes F et G sont à 800 m l\'une de l\'autre. On creuse un puits P sur la '
        + 'médiatrice de [FG], à 500 m de la ferme F.',
      questions: [
        { texte: 'À quelle distance de la ferme G est le puits ?', attendu: 500, unite: 'm' },
        { texte: 'Si le puits était au milieu de [FG], à quelle distance de F serait-il ?', attendu: 400, unite: 'm' },
      ],
    },
    {
      id: 'p-4-2-2',
      enonce: 'Sur une droite graduée, A a pour abscisse −6 et B a pour abscisse 10.',
      questions: [
        { texte: 'Combien d\'unités séparent A et B ?', attendu: 16 },
        { texte: 'Quelle est l\'abscisse du milieu de [AB] ?', attendu: 2 },
      ],
    },
    {
      id: 'p-4-2-3',
      enonce: 'Dans ce repère, I est le milieu du segment [AB]. Le point B n\'est pas tracé.',
      figure: repere({ A: [-4, -3], I: [0, -1] }, { segments: [['A', 'I']] }),
      questions: [
        { texte: 'Quelle est l\'abscisse de B ?', attendu: 4 },
        { texte: 'Quelle est l\'ordonnée de B ?', attendu: 1 },
      ],
    },
    {
      id: 'p-4-2-4',
      enonce: 'Le point C est sur la médiatrice du segment [AB], avec AB = 5 cm et AC = 7 cm.',
      questions: [
        { texte: 'Combien mesure BC ?', attendu: 7, unite: 'cm' },
        { texte: 'Quel est le périmètre du triangle ABC ?', attendu: 19, unite: 'cm' },
      ],
    },
    {
      id: 'p-4-2-5',
      enonce:
        'Une antenne est à la même distance de deux villages A et B, distants de 10 km. '
        + 'Elle est à 13 km du village A.',
      questions: [
        { texte: 'À combien de kilomètres du village B est-elle ?', attendu: 13, unite: 'km' },
        { texte: 'La médiatrice de [AB] coupe [AB] en I. À combien de kilomètres de A se trouve I ?', attendu: 5, unite: 'km' },
      ],
    },
  ],

  test: [
    {
      id: 't-4-2-1', type: 'calcul', consigne: 'Donne l\'abscisse du milieu de [AB].', enonce: 'Quelle est l\'abscisse du milieu de [AB] ?',
      figure: droite(-2, 8, 1, { A: 0, B: 6 }), milieuDe: ['A', 'B'], attendu: 3, revoir: 'definition',
    },
    {
      id: 't-4-2-2', type: 'calcul', consigne: 'Donne l\'abscisse du milieu de [CD].', enonce: 'Quelle est l\'abscisse du milieu de [CD] ?',
      figure: droite(-9, 1, 1, { C: -8, D: -2 }), milieuDe: ['C', 'D'], attendu: -5, revoir: 'definition',
    },
    {
      id: 't-4-2-3', type: 'calcul', consigne: 'Donne l\'abscisse du milieu de [EF].', enonce: 'Quelle est l\'abscisse du milieu de [EF] ?',
      figure: droite(-5, 5, 1, { E: -4, F: 2 }), milieuDe: ['E', 'F'], attendu: -1, revoir: 'definition',
    },
    {
      id: 't-4-2-4', type: 'trous', consigne: 'Donne les coordonnées du milieu I de [AB].', enonce: 'Quelles sont les coordonnées de I ?',
      figure: repere({ A: [-3, 3], B: [1, -1] }, { segments: [['A', 'B']] }),
      milieuDe: ['A', 'B'], champs: coordonnees(-1, 1), revoir: 'definition',
    },
    {
      id: 't-4-2-5', type: 'calcul', consigne: 'Réponds en centimètres.',
      enonce: 'I est le milieu de [AB], et AI = 3,5 cm. Combien mesure AB ?', attendu: 7, revoir: 'definition',
    },
    {
      id: 't-4-2-6', type: 'calcul', consigne: 'Réponds en centimètres.',
      enonce: 'M est sur la médiatrice de [AB], et MB = 8 cm. Combien mesure MA ?', attendu: 8, revoir: 'propriete',
    },
    {
      id: 't-4-2-7', type: 'choix', consigne: 'La droite (d) est-elle la médiatrice du segment [AB] ?', enonce: 'Observe la droite (d) et le segment [AB].',
      figure: repere({ A: [-2, 2], B: [4, 2] }, { axe: { x: 1 }, segments: [['A', 'B']] }),
      mediatriceDe: ['A', 'B'], choix: reponsesMediatrice('AB'), attendu: 'oui', revoir: 'definition',
    },
    {
      id: 't-4-2-8', type: 'choix', consigne: 'La droite (d) est-elle la médiatrice du segment [CD] ?', enonce: 'Observe la droite (d) et le segment [CD].',
      figure: repere({ C: [-2, -3], D: [-2, 3] }, { axe: { y: 1 }, segments: [['C', 'D']] }),
      mediatriceDe: ['C', 'D'], choix: reponsesMediatrice('CD'), attendu: reponsesMediatrice('CD')[1], revoir: 'definition',
    },
    {
      id: 't-4-2-9', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'La médiatrice d\'un segment est perpendiculaire à ce segment.', attendu: true, revoir: 'definition',
    },
    {
      id: 't-4-2-10', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Toute droite qui passe par le milieu d\'un segment est sa médiatrice.', attendu: false, revoir: 'definition',
    },
  ],
};
