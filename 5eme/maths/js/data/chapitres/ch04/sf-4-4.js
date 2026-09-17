// Chapitre 4, savoir-faire 4 — Les propriétés de la symétrie centrale.
//
// ── D'où vient ce savoir-faire ────────────────────────────────────────────
//
// Du point « demi-tour et ses propriétés » de la liste de la professeure :
// ce que la symétrie centrale conserve, l'image d'une droite, et le centre
// de symétrie d'une figure.
//
// ── Axe ou centre ────────────────────────────────────────────────────────
//
// « Cette figure est symétrique » ne dit pas COMMENT. Les lettres servent de
// terrain d'essai parce qu'on les a sous les yeux tous les jours : A et T
// ont un axe sans centre, N et Z un centre sans axe, H et X les deux. Les
// options des QCM mélangent systématiquement les trois familles.

const repere = (points, extra = {}) => ({ modele: 'repere', points, ...extra });
const coordonnees = (x, y) => [
  { id: 'x', etiquette: 'abscisse', attendu: x },
  { id: 'y', etiquette: 'ordonnée', attendu: y },
];
const IMAGES_DROITE = [
  'une droite parallèle à la première',
  'une droite perpendiculaire à la première',
  'une droite qui coupe la première en K',
];

export default {
  id: 'sf-4-4',
  titre: 'Utiliser les propriétés de la symétrie centrale',
  attendus: [
    'Il sait que la symétrie centrale conserve les longueurs, les angles, les aires et l\'alignement.',
    'Il sait que l\'image d\'une droite par une symétrie centrale est une droite parallèle.',
    'Il reconnaît une figure qui a un centre de symétrie, et la distingue d\'une figure qui a un axe.',
  ],

  decouvrir: {
    titre: 'Un demi-tour ne déforme rien',
    texte:
      'Le segment [A\'B\'] est le symétrique du segment [AB] par rapport au point K. Pour aller '
      + 'de A à B, on fait 2 carreaux vers la droite et 2 vers le haut.',
    figure: repere(
      { A: [-3, 1], B: [-1, 3], K: [1, 0], 'A\'': [5, -1], 'B\'': [3, -3] },
      { segments: [['A', 'B'], ['A\'', 'B\'']] },
    ),
    question: 'Pour aller de B\' à A\', combien de carreaux fait-on vers la droite ? Et vers le haut ?',
    champs: [
      { id: 'a', etiquette: 'vers la droite', attendu: 2 },
      { id: 'b', etiquette: 'vers le haut', attendu: 2 },
    ],
    conclusion:
      'Le même trajet : [A\'B\'] a la **même longueur** que [AB], et il lui est **parallèle**. '
      + 'Seul le sens est retourné — de A vers B, on monte vers la droite ; de A\' vers B\', on '
      + 'descend vers la gauche.\n'
      + 'La symétrie centrale **conserve les longueurs**, et transforme une droite en une droite '
      + '**parallèle**.',
  },

  cours: [
    {
      type: 'propriete',
      titre: 'Ce que la symétrie centrale conserve',
      texte:
        'La symétrie centrale **conserve** les longueurs, les angles, les périmètres, les aires '
        + 'et l\'alignement : une figure et sa symétrique se superposent par un demi-tour.',
    },
    {
      type: 'propriete',
      titre: 'L\'image d\'une droite',
      texte:
        'Le symétrique d\'une droite par rapport à un point est une droite **parallèle** à la '
        + 'première.\n'
        + 'Le symétrique d\'un segment est un segment **parallèle et de même longueur** ; celui '
        + 'd\'un cercle est un cercle **de même rayon**.',
      figure: repere(
        { A: [-3, 1], B: [-1, 3], K: [1, 0], 'A\'': [5, -1], 'B\'': [3, -3] },
        { segments: [['A', 'B'], ['A\'', 'B\'']] },
      ),
    },
    {
      type: 'definition',
      titre: 'Centre de symétrie d\'une figure',
      texte:
        'Un point K est **centre de symétrie** d\'une figure si le demi-tour autour de K laisse '
        + 'la figure inchangée.\n'
        + 'Le parallélogramme, le rectangle, le losange et le carré ont un centre de symétrie : '
        + 'le point de rencontre de leurs diagonales. Le cercle a pour centre de symétrie son '
        + 'centre. Un triangle n\'en a jamais.',
    },
    {
      type: 'remarque',
      titre: 'Axe ou centre : deux questions différentes',
      texte:
        'Les lettres **N, S, Z** ont un centre de symétrie mais aucun axe. Les lettres **A, T, M** '
        + 'ont un axe mais pas de centre. Les lettres **H, I, O, X** ont les deux.',
    },
    {
      type: 'exemple',
      texte:
        'Symétrique d\'un segment de 4 cm : un segment parallèle de 4 cm   ·   d\'un angle de '
        + '50° : un angle de 50°   ·   d\'un cercle de rayon 2 cm : un cercle de rayon 2 cm',
    },
  ],

  methode: {
    titre: 'Utiliser les propriétés sans rien mesurer',
    enonce:
      'A\' et B\' sont les symétriques de A et de B par rapport à K, et AB = 5 cm. Que peut-on '
      + 'dire du segment [A\'B\'] ?',
    etapes: [
      {
        texte: 'La symétrie centrale transforme un segment en un segment parallèle : [A\'B\'] est parallèle à [AB].',
        note: 'C\'est une propriété du cours : on n\'a rien à tracer.',
      },
      { texte: 'Elle conserve les longueurs : A\'B\' = AB = 5 cm.', note: '' },
    ],
    controle:
      'Le contrôle : sur un quadrillage, le trajet de A à B et le trajet de B\' à A\' sont '
      + 'identiques.',
  },

  entrainement: [
    // ── Palier 1 : ce qui est conservé ─────────────────────────────────────
    {
      // NEUTRE : une longueur, la conservation la plus intuitive.
      id: 'e-4-4-1', type: 'calcul', palier: 1, neutre: true,
      consigne: 'Réponds en centimètres.',
      enonce: 'Un segment mesure 6,5 cm. Combien mesure son symétrique par rapport à un point ?',
      attendu: 6.5,
    },
    {
      id: 'e-4-4-2', type: 'calcul', palier: 1, piege: 'symetrie-deforme',
      consigne: 'Réponds en degrés.',
      enonce: 'Un angle mesure 47°. Combien mesure son symétrique par rapport à un point ?',
      attendu: 47,
      fausses: [
        { valeur: 133, piege: 'symetrie-deforme' },
        { valeur: 43, piege: 'symetrie-deforme' },
      ],
    },
    {
      id: 'e-4-4-3', type: 'calcul', palier: 1, piege: 'symetrie-deforme',
      consigne: 'Réponds en cm².',
      enonce: 'Une figure a une aire de 24 cm². Quelle est l\'aire de sa symétrique par rapport à un point ?',
      attendu: 24,
      fausses: [{ valeur: 48, piege: 'symetrie-deforme' }],
    },
    {
      id: 'e-4-4-4', type: 'choix', palier: 1, piege: 'axe-et-centre-confondus',
      consigne: 'Laquelle de ces lettres a un centre de symétrie ?', enonce: 'Les lettres majuscules A, T, N et M.',
      choix: ['A', 'T', 'N', 'M'], attendu: 'N',
      fausses: [
        { valeur: 'A', piege: 'axe-et-centre-confondus' },
        { valeur: 'T', piege: 'axe-et-centre-confondus' },
        { valeur: 'M', piege: 'axe-et-centre-confondus' },
      ],
    },
    // ── Palier 2 : les droites, les figures usuelles ───────────────────────
    {
      id: 'e-4-4-5', type: 'choix', palier: 2, piege: 'symetrie-deforme',
      consigne: 'Quel est le symétrique d\'une droite par rapport à un point K qui n\'est pas sur elle ?',
      enonce: 'Une droite, et un point K en dehors de cette droite.',
      choix: IMAGES_DROITE, attendu: IMAGES_DROITE[0],
      fausses: [
        { valeur: IMAGES_DROITE[1], piege: 'symetrie-deforme' },
        { valeur: IMAGES_DROITE[2], piege: 'symetrie-deforme' },
      ],
    },
    {
      id: 'e-4-4-6', type: 'choix', palier: 2, piege: 'axe-et-centre-confondus',
      consigne: 'Laquelle de ces figures n\'a pas de centre de symétrie ?', enonce: 'Quatre figures usuelles.',
      choix: ['un rectangle', 'un losange', 'un triangle équilatéral', 'un cercle'],
      attendu: 'un triangle équilatéral',
      fausses: [
        { valeur: 'un rectangle', piege: 'axe-et-centre-confondus' },
        { valeur: 'un losange', piege: 'axe-et-centre-confondus' },
      ],
    },
    {
      // NEUTRE : le rayon, conservé comme toute longueur.
      id: 'e-4-4-7', type: 'calcul', palier: 2, neutre: true,
      consigne: 'Réponds en centimètres.',
      enonce: 'Un cercle a un rayon de 3,5 cm. Quel est le rayon de son symétrique par rapport à un point ?',
      attendu: 3.5,
    },
    {
      id: 'e-4-4-8', type: 'trous', palier: 2, piege: 'symetries-confondues',
      consigne: 'Donne les coordonnées de B\', le symétrique de B par rapport à K.',
      enonce: 'Quelles sont les coordonnées de B\' ?',
      figure: repere({ A: [-3, 1], B: [-1, 3], K: [1, 0] }, { segments: [['A', 'B']] }),
      symetriqueDe: { point: 'B', centre: 'K' }, champs: coordonnees(3, -3),
    },
    // ── Palier 3 : raisonner avec les propriétés ───────────────────────────
    {
      id: 'e-4-4-9', type: 'calcul', palier: 3, piege: 'symetrie-deforme',
      consigne: 'Réponds en centimètres.',
      enonce: 'Un triangle a un périmètre de 15 cm. Quel est le périmètre de son symétrique par rapport à un point ?',
      attendu: 15,
      fausses: [{ valeur: 30, piege: 'symetrie-deforme' }],
    },
    {
      id: 'e-4-4-10', type: 'calcul', palier: 3, piege: 'axe-et-centre-confondus',
      consigne: 'Combien de centres de symétrie cette figure a-t-elle ?', enonce: 'Un carré.',
      attendu: 1,
      // Les quatre axes du carré comptés comme des centres.
      fausses: [{ valeur: 4, piege: 'axe-et-centre-confondus' }],
    },
    {
      id: 'e-4-4-11', type: 'vraifaux', palier: 3, piege: 'symetrie-deforme',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Plus le centre est loin d\'un segment, plus le symétrique de ce segment est long.',
      attendu: false,
      contreExemple: {
        invite:
          'Un segment mesure 4 cm. Donne la longueur de son symétrique par rapport à un point '
          + 'situé à 1 cm du segment, puis par rapport à un point situé à 10 cm.',
        champs: [{ id: 'a', etiquette: 'centre à 1 cm' }, { id: 'b', etiquette: 'centre à 10 cm' }],
        valide: (a, b) => a === 4 && b === 4,
        exemple: '4 cm dans les deux cas : la symétrie conserve les longueurs, où que soit le centre.',
      },
    },
    {
      id: 'e-4-4-12', type: 'choix', palier: 3, piege: 'axe-et-centre-confondus',
      consigne: 'Laquelle de ces lettres a à la fois un axe et un centre de symétrie ?',
      enonce: 'Les lettres majuscules S, H, A et Z.',
      choix: ['S', 'H', 'A', 'Z'], attendu: 'H',
      fausses: [
        { valeur: 'S', piege: 'axe-et-centre-confondus' },
        { valeur: 'A', piege: 'axe-et-centre-confondus' },
        { valeur: 'Z', piege: 'axe-et-centre-confondus' },
      ],
    },
  ],

  problemes: [
    {
      id: 'p-4-4-1',
      enonce:
        'ABCD est un parallélogramme de centre K, avec AB = 6 cm, BC = 4 cm, et un angle de 70° '
        + 'en A. Par la symétrie de centre K, A va en C et B va en D.',
      questions: [
        { texte: 'Le symétrique de [AB] est [CD]. Combien mesure CD ?', attendu: 6, unite: 'cm' },
        { texte: 'Quel est le périmètre de ABCD ?', attendu: 20, unite: 'cm' },
        { texte: 'L\'angle en C est le symétrique de l\'angle en A. Combien mesure-t-il ?', attendu: 70, unite: '°' },
      ],
    },
    {
      id: 'p-4-4-2',
      enonce:
        'Un logo est formé d\'un triangle d\'aire 9 cm² et de son symétrique par rapport à un '
        + 'point K. Les deux triangles ne se chevauchent pas.',
      questions: [
        { texte: 'Quelle est l\'aire du triangle symétrique ?', attendu: 9, unite: 'cm²' },
        { texte: 'Quelle est l\'aire totale du logo ?', attendu: 18, unite: 'cm²' },
      ],
    },
    {
      id: 'p-4-4-3',
      enonce: 'On étudie les quatre lettres du mot NOIX, écrit en majuscules.',
      questions: [
        { texte: 'Combien de ces lettres ont un centre de symétrie ?', attendu: 4 },
        { texte: 'Combien ont au moins un axe de symétrie ?', attendu: 3 },
      ],
    },
    {
      id: 'p-4-4-4',
      enonce: 'Dans ce repère, [A\'B\'] est le symétrique du segment [AB] par rapport au point K.',
      figure: repere({ A: [-4, -1], B: [-1, -1], K: [0, 1] }, { segments: [['A', 'B']] }),
      questions: [
        { texte: 'Combien de carreaux mesure [AB] ?', attendu: 3 },
        { texte: 'Quelle est l\'ordonnée de A\' ?', attendu: 3 },
        { texte: 'Combien de carreaux mesure [A\'B\'] ?', attendu: 3 },
      ],
    },
    {
      id: 'p-4-4-5',
      enonce: 'Un carré a pour centre K, et chacune de ses diagonales mesure 8 cm.',
      questions: [
        { texte: 'À quelle distance de K se trouve chaque sommet ?', attendu: 4, unite: 'cm' },
        { texte: 'Combien le carré a-t-il de centres de symétrie ?', attendu: 1 },
        { texte: 'Combien a-t-il d\'axes de symétrie ?', attendu: 4 },
      ],
    },
  ],

  test: [
    {
      id: 't-4-4-1', type: 'calcul', consigne: 'Réponds en centimètres.',
      enonce: 'Un segment mesure 7,3 cm. Combien mesure son symétrique par rapport à un point ?', attendu: 7.3, revoir: 'propriete',
    },
    {
      id: 't-4-4-2', type: 'calcul', consigne: 'Réponds en degrés.',
      enonce: 'Un angle mesure 118°. Combien mesure son symétrique par rapport à un point ?', attendu: 118, revoir: 'propriete',
    },
    {
      id: 't-4-4-3', type: 'calcul', consigne: 'Réponds en cm².',
      enonce: 'Une figure a une aire de 30 cm². Quelle est l\'aire de sa symétrique par rapport à un point ?', attendu: 30, revoir: 'propriete',
    },
    {
      id: 't-4-4-4', type: 'choix', consigne: 'Laquelle de ces lettres a un centre de symétrie ?', enonce: 'Les lettres majuscules E, Z, V et A.',
      choix: ['E', 'Z', 'V', 'A'], attendu: 'Z', revoir: 'remarque',
    },
    {
      id: 't-4-4-5', type: 'choix', consigne: 'Laquelle de ces lettres a un axe de symétrie, mais pas de centre ?',
      enonce: 'Les lettres majuscules N, S, T et H.',
      choix: ['N', 'S', 'T', 'H'], attendu: 'T', revoir: 'remarque',
    },
    {
      id: 't-4-4-6', type: 'choix', consigne: 'Quel est le symétrique d\'une droite par rapport à un point K qui n\'est pas sur elle ?',
      enonce: 'Une droite, et un point K en dehors de cette droite.',
      choix: IMAGES_DROITE, attendu: IMAGES_DROITE[0], revoir: 'propriete',
    },
    {
      id: 't-4-4-7', type: 'choix', consigne: 'Laquelle de ces figures a un centre de symétrie ?', enonce: 'Trois figures usuelles.',
      choix: ['un triangle isocèle', 'un parallélogramme', 'un triangle rectangle'], attendu: 'un parallélogramme', revoir: 'definition',
    },
    {
      id: 't-4-4-8', type: 'trous', consigne: 'Donne les coordonnées du symétrique de C par rapport à K.',
      enonce: 'Quelles sont les coordonnées du symétrique de C ?',
      figure: repere({ C: [2, 3], K: [0, 1] }),
      symetriqueDe: { point: 'C', centre: 'K' }, champs: coordonnees(-2, -1), revoir: 'propriete',
    },
    {
      id: 't-4-4-9', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Un triangle et son symétrique par rapport à un point ont le même périmètre.', attendu: true, revoir: 'propriete',
    },
    {
      id: 't-4-4-10', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Un triangle équilatéral a un centre de symétrie.', attendu: false, revoir: 'definition',
    },
  ],
};
