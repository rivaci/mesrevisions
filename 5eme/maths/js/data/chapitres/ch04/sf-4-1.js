// Chapitre 4, savoir-faire 1 — Le symétrique d'un point par rapport à une droite.
//
// ── D'où vient ce savoir-faire ────────────────────────────────────────────
//
// Du premier point [EIB] de la liste de la professeure : « rappels : symétrie
// axiale ». C'est une notion de 6e ; elle revient ici parce que la symétrie
// centrale se comprend PAR CONTRASTE avec elle — plier ou tourner.
//
// ── Sur le quadrillage ───────────────────────────────────────────────────
//
// Les axes sont verticaux ou horizontaux, tracés en pointillés sur le repère
// (js/figures-plan.js, champ `axe`) : le symétrique se construit en comptant
// des carreaux, sans équerre. Les mauvais points proposés sont les erreurs
// prévues : le symétrique par rapport à un axe du repère au lieu de (d), et
// la distance mal reportée.

const repere = (points, extra = {}) => ({ modele: 'repere', points, ...extra });
const coordonnees = (x, y) => [
  { id: 'x', etiquette: 'abscisse', attendu: x },
  { id: 'y', etiquette: 'ordonnée', attendu: y },
];

export default {
  id: 'sf-4-1',
  titre: 'Construire le symétrique d\'un point par rapport à une droite',
  attendus: [
    'Il construit le symétrique d\'un point par rapport à une droite, sur un quadrillage.',
    'Il sait que la symétrie axiale conserve les longueurs, les angles et les aires.',
    'Il reconnaît les axes de symétrie d\'une figure usuelle.',
  ],

  decouvrir: {
    titre: 'Le pliage',
    texte:
      'On plie la feuille le long de la droite (d), en pointillés. Le point A vient se poser '
      + 'sur un point A\' de l\'autre côté : c\'est son symétrique.',
    figure: repere({ A: [-2, 2] }, { axe: { x: 1 } }),
    question: 'Combien de carreaux séparent A de la droite (d) ? Quelle est l\'abscisse du point A\' ?',
    champs: [
      { id: 'a', etiquette: 'carreaux entre A et (d)', attendu: 3 },
      { id: 'b', etiquette: 'abscisse de A\'', attendu: 4 },
    ],
    conclusion:
      'A est à 3 carreaux à gauche de (d) : A\' est à 3 carreaux **à droite**, sur la même '
      + 'ligne horizontale. Donc A\'(4 ; 2).\n'
      + '(d) coupe [AA\'] **en son milieu** et **à angle droit** : (d) est la **médiatrice** '
      + 'de [AA\'].',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Le symétrique d\'un point',
      texte:
        'Le **symétrique** d\'un point A par rapport à une droite (d) est le point A\' tel que '
        + '(d) soit la **médiatrice** du segment [AA\'] : A\' est de l\'autre côté de (d), à la '
        + 'même distance, sur la perpendiculaire à (d) qui passe par A.\n'
        + 'Si A est sur (d), son symétrique est A lui-même.',
      figure: repere({ A: [-1, 1], 'A\'': [3, 1] }, { axe: { x: 1 }, segments: [['A', 'A\'']] }),
    },
    {
      type: 'propriete',
      titre: 'Ce que la symétrie axiale conserve',
      texte:
        'La symétrie axiale **conserve** les longueurs, les angles, les aires et l\'alignement : '
        + 'une figure et sa symétrique se superposent par pliage.\n'
        + 'Le symétrique d\'un segment de 5 cm mesure 5 cm ; celui d\'un angle de 40° mesure 40°.',
    },
    {
      type: 'definition',
      titre: 'Axe de symétrie d\'une figure',
      texte:
        'Une droite est un **axe de symétrie** d\'une figure si la figure se superpose à '
        + 'elle-même par pliage le long de cette droite.\n'
        + 'Un rectangle en a 2, un losange 2, un carré 4, un triangle isocèle 1, un triangle '
        + 'équilatéral 3, un cercle une infinité.',
    },
    {
      type: 'exemple',
      texte:
        'A(−1 ; 1) et (d) verticale d\'abscisse 1 : A est à 2 carreaux à gauche de (d), donc '
        + 'A\' est à 2 carreaux à droite : A\'(3 ; 1).',
    },
  ],

  methode: {
    titre: 'Construire le symétrique de B par rapport à (d)',
    enonce: 'Où se trouve le symétrique de B par rapport à la droite (d) ?',
    figure: repere({ B: [3, -2] }, { axe: { y: 1 } }),
    etapes: [
      {
        texte: 'Je repère la perpendiculaire à (d) qui passe par B : ici, la ligne verticale du quadrillage.',
        note: '(d) est horizontale, donc on se déplace verticalement.',
      },
      {
        texte: 'Je compte les carreaux de B jusqu\'à (d) : 3 carreaux vers le haut.',
        note: 'On compte jusqu\'à (d), pas jusqu\'à l\'axe du repère.',
      },
      {
        texte: 'Je reporte 3 carreaux de l\'autre côté de (d), toujours vers le haut : j\'arrive en B\'(3 ; 4).',
        note: '',
      },
    ],
    controle:
      'Le contrôle : (d) doit passer au milieu de [BB\'] et le couper à angle droit. Plie la '
      + 'figure en pensée : B doit tomber sur B\'.',
  },

  entrainement: [
    // ── Palier 1 : un axe vertical ─────────────────────────────────────────
    {
      // NEUTRE : aucune distance à reporter, seulement la conservation.
      id: 'e-4-1-1', type: 'calcul', palier: 1, neutre: true,
      consigne: 'Réponds en centimètres.',
      enonce: 'Le segment [AB] mesure 4,5 cm. Combien mesure son symétrique par rapport à une droite ?',
      attendu: 4.5,
    },
    {
      id: 'e-4-1-2', type: 'choix', palier: 1, piege: 'symetrique-axial-mal-place',
      consigne: 'Quel point est le symétrique de A par rapport à (d) ?', enonce: 'Trouve le symétrique de A.',
      figure: repere({ A: [-2, 1], B: [4, 1], C: [2, 1], D: [-2, -1] }, { axe: { x: 1 } }),
      symetriqueDe: { point: 'A' },
      choix: ['B', 'C', 'D'], attendu: 'B',
      fausses: [
        // 1 carreau au lieu de 3 de l'autre côté.
        { valeur: 'C', piege: 'symetrique-axial-mal-place' },
        // Plié le long de l'axe des abscisses.
        { valeur: 'D', piege: 'symetrique-axial-mal-place' },
      ],
    },
    {
      id: 'e-4-1-3', type: 'trous', palier: 1, piege: 'symetrique-axial-mal-place',
      consigne: 'Donne les coordonnées du symétrique de B par rapport à (d).',
      enonce: 'Quelles sont les coordonnées du symétrique de B ?',
      figure: repere({ B: [3, -1] }, { axe: { x: 1 } }),
      symetriqueDe: { point: 'B' }, champs: coordonnees(-1, -1),
      fausses: [
        // Symétrique par rapport à l'axe des ordonnées.
        { valeur: -3, piege: 'symetrique-axial-mal-place' },
        // La distance à (d), 2, reportée depuis 0.
        { valeur: -2, piege: 'symetrique-axial-mal-place' },
        // L'ordonnée changée aussi : un demi-tour au lieu d'un pliage.
        { valeur: 1, piege: 'symetries-confondues' },
      ],
    },
    {
      id: 'e-4-1-4', type: 'choix', palier: 1, piege: 'symetrique-axial-mal-place',
      consigne: 'Quel point est le symétrique de P par rapport à (d) ?', enonce: 'Trouve le symétrique de P.',
      figure: repere({ P: [4, -3], Q: [-2, -3], R: [-4, -3], S: [4, 3] }, { axe: { x: 1 } }),
      symetriqueDe: { point: 'P' },
      choix: ['Q', 'R', 'S'], attendu: 'Q',
      fausses: [
        { valeur: 'R', piege: 'symetrique-axial-mal-place' },
        { valeur: 'S', piege: 'symetrique-axial-mal-place' },
      ],
    },
    // ── Palier 2 : un axe horizontal, les axes des figures ─────────────────
    {
      id: 'e-4-1-5', type: 'choix', palier: 2, piege: 'symetrique-axial-mal-place',
      consigne: 'Quel point est le symétrique de C par rapport à (d) ?', enonce: 'Trouve le symétrique de C.',
      figure: repere({ C: [-3, -1], D: [-3, 3], E: [3, -1], F: [-3, 2] }, { axe: { y: 1 } }),
      symetriqueDe: { point: 'C' },
      choix: ['D', 'E', 'F'], attendu: 'D',
      fausses: [
        { valeur: 'E', piege: 'symetrique-axial-mal-place' },
        { valeur: 'F', piege: 'symetrique-axial-mal-place' },
      ],
    },
    {
      id: 'e-4-1-6', type: 'trous', palier: 2, piege: 'symetrique-axial-mal-place',
      consigne: 'Donne les coordonnées du symétrique de G par rapport à (d).',
      enonce: 'Quelles sont les coordonnées du symétrique de G ?',
      figure: repere({ G: [2, 4] }, { axe: { y: 1 } }),
      symetriqueDe: { point: 'G' }, champs: coordonnees(2, -2),
      fausses: [
        { valeur: -4, piege: 'symetrique-axial-mal-place' },
        { valeur: -3, piege: 'symetrique-axial-mal-place' },
      ],
    },
    {
      // NEUTRE : compter des axes, sans quadrillage.
      id: 'e-4-1-7', type: 'calcul', palier: 2, neutre: true,
      consigne: 'Combien d\'axes de symétrie cette figure a-t-elle ?', enonce: 'Un carré.',
      attendu: 4,
    },
    {
      id: 'e-4-1-8', type: 'calcul', palier: 2, piege: 'axe-et-centre-confondus',
      consigne: 'Combien d\'axes de symétrie cette figure a-t-elle ?',
      enonce: 'Un rectangle de 6 cm sur 4 cm.', attendu: 2,
      // Les deux diagonales comptées comme des axes.
      fausses: [{ valeur: 4, piege: 'axe-et-centre-confondus' }],
    },
    // ── Palier 3 : ce que la symétrie conserve, et les cas limites ─────────
    {
      id: 'e-4-1-9', type: 'calcul', palier: 3, piege: 'symetrie-deforme',
      consigne: 'Réponds en degrés.',
      enonce: 'L\'angle ABC mesure 72°. Combien mesure son symétrique par rapport à une droite ?',
      attendu: 72,
      fausses: [{ valeur: 108, piege: 'symetrie-deforme' }],
    },
    {
      id: 'e-4-1-10', type: 'calcul', palier: 3, piege: 'symetrie-deforme',
      consigne: 'Réponds en cm².',
      enonce: 'Un triangle a une aire de 18 cm². Quelle est l\'aire de son symétrique par rapport à une droite ?',
      attendu: 18,
      fausses: [{ valeur: 36, piege: 'symetrie-deforme' }],
    },
    {
      id: 'e-4-1-11', type: 'vraifaux', palier: 3, piege: 'symetrique-axial-mal-place',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Le symétrique d\'un point par rapport à une droite est toujours un autre point.',
      figure: repere({}, { axe: { x: 1 } }),
      attendu: false,
      contreExemple: {
        invite: 'Sur la figure, donne les coordonnées d\'un point qui est son propre symétrique par rapport à (d).',
        champs: [{ id: 'a', etiquette: 'abscisse' }, { id: 'b', etiquette: 'ordonnée' }],
        valide: (a, b) => a === 1 && b >= -4 && b <= 4,
        exemple: 'Le point (1 ; 2) est sur (d) : son symétrique est lui-même.',
      },
    },
    {
      id: 'e-4-1-12', type: 'choix', palier: 3, piege: 'axe-et-centre-confondus',
      consigne: 'Laquelle de ces lettres a un axe de symétrie ?', enonce: 'Les lettres majuscules N, S, A et Z.',
      choix: ['N', 'S', 'A', 'Z'], attendu: 'A',
      fausses: [
        { valeur: 'N', piege: 'axe-et-centre-confondus' },
        { valeur: 'S', piege: 'axe-et-centre-confondus' },
        { valeur: 'Z', piege: 'axe-et-centre-confondus' },
      ],
    },
  ],

  problemes: [
    {
      id: 'p-4-1-1',
      enonce: 'Dans ce repère, la droite (d) représente un miroir. Une bille est posée au point B.',
      figure: repere({ B: [-3, 2] }, { axe: { x: -1 } }),
      questions: [
        { texte: 'À combien de carreaux du miroir est la bille ?', attendu: 2 },
        { texte: 'Quelle est l\'abscisse de son reflet ?', attendu: 1 },
        { texte: 'Quelle est l\'ordonnée de son reflet ?', attendu: 2 },
      ],
    },
    {
      id: 'p-4-1-2',
      enonce:
        'Un papillon est symétrique par rapport à l\'axe de son corps. Son aile gauche a une '
        + 'aire de 7,5 cm².',
      questions: [
        { texte: 'Quelle est l\'aire de son aile droite ?', attendu: 7.5, unite: 'cm²' },
        { texte: 'Quelle est l\'aire totale des deux ailes ?', attendu: 15, unite: 'cm²' },
      ],
    },
    {
      id: 'p-4-1-3',
      enonce: 'On compte les axes de symétrie de plusieurs figures.',
      questions: [
        { texte: 'Combien d\'axes de symétrie a un triangle équilatéral ?', attendu: 3 },
        { texte: 'Et un losange qui n\'est pas un carré ?', attendu: 2 },
        { texte: 'Et un triangle isocèle qui n\'est pas équilatéral ?', attendu: 1 },
      ],
    },
    {
      id: 'p-4-1-4',
      enonce:
        'Dans un repère, (d) est la droite horizontale qui passe par l\'ordonnée −1. Le point M '
        + 'a pour coordonnées (2 ; 3).',
      questions: [
        { texte: 'À combien de carreaux de (d) se trouve M ?', attendu: 4 },
        { texte: 'Quelle est l\'abscisse du symétrique de M par rapport à (d) ?', attendu: 2 },
        { texte: 'Quelle est son ordonnée ?', attendu: -5 },
      ],
    },
    {
      id: 'p-4-1-5',
      enonce:
        'Un motif est formé d\'un triangle de périmètre 12 cm et de son symétrique par rapport à '
        + 'une droite qui ne le touche pas.',
      questions: [
        { texte: 'Quel est le périmètre du triangle symétrique ?', attendu: 12, unite: 'cm' },
        { texte: 'Quelle est la somme des deux périmètres ?', attendu: 24, unite: 'cm' },
      ],
    },
  ],

  test: [
    {
      id: 't-4-1-1', type: 'choix', consigne: 'Quel point est le symétrique de A par rapport à (d) ?', enonce: 'Trouve le symétrique de A.',
      figure: repere({ A: [-1, 2], B: [3, 2], C: [-1, -2], D: [1, 2] }, { axe: { x: 1 } }),
      symetriqueDe: { point: 'A' }, choix: ['B', 'C', 'D'], attendu: 'B', revoir: 'definition',
    },
    {
      id: 't-4-1-2', type: 'choix', consigne: 'Quel point est le symétrique de E par rapport à (d) ?', enonce: 'Trouve le symétrique de E.',
      figure: repere({ E: [2, 3], F: [2, -3], G: [2, -1], H: [-2, 3] }, { axe: { y: 1 } }),
      symetriqueDe: { point: 'E' }, choix: ['F', 'G', 'H'], attendu: 'G', revoir: 'definition',
    },
    {
      id: 't-4-1-3', type: 'trous', consigne: 'Donne les coordonnées du symétrique de K par rapport à (d).',
      enonce: 'Quelles sont les coordonnées du symétrique de K ?',
      figure: repere({ K: [-4, -2] }, { axe: { x: -1 } }),
      symetriqueDe: { point: 'K' }, champs: coordonnees(2, -2), revoir: 'definition',
    },
    {
      id: 't-4-1-4', type: 'trous', consigne: 'Donne les coordonnées du symétrique de L par rapport à (d).',
      enonce: 'Quelles sont les coordonnées du symétrique de L ?',
      figure: repere({ L: [3, 0] }, { axe: { y: 2 } }),
      symetriqueDe: { point: 'L' }, champs: coordonnees(3, 4), revoir: 'definition',
    },
    {
      id: 't-4-1-5', type: 'calcul', consigne: 'Réponds en centimètres.',
      enonce: 'Un segment mesure 6,2 cm. Combien mesure son symétrique par rapport à une droite ?', attendu: 6.2, revoir: 'propriete',
    },
    {
      id: 't-4-1-6', type: 'calcul', consigne: 'Réponds en degrés.',
      enonce: 'Un angle mesure 125°. Combien mesure son symétrique par rapport à une droite ?', attendu: 125, revoir: 'propriete',
    },
    { id: 't-4-1-7', type: 'calcul', consigne: 'Combien d\'axes de symétrie cette figure a-t-elle ?', enonce: 'Un carré.', attendu: 4, revoir: 'definition' },
    { id: 't-4-1-8', type: 'calcul', consigne: 'Combien d\'axes de symétrie cette figure a-t-elle ?', enonce: 'Un triangle équilatéral.', attendu: 3, revoir: 'definition' },
    {
      id: 't-4-1-9', type: 'choix', consigne: 'Laquelle de ces lettres a un axe de symétrie ?', enonce: 'Les lettres majuscules S, M, Z et N.',
      choix: ['S', 'M', 'Z', 'N'], attendu: 'M', revoir: 'definition',
    },
    {
      id: 't-4-1-10', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Une droite qui coupe un rectangle en deux parties égales est toujours un axe de symétrie.',
      attendu: false, revoir: 'definition',
    },
  ],
};
