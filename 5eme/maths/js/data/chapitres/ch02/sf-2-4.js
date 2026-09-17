// Chapitre 2, savoir-faire 4 — Angles et parallélisme.
//
// ── D'où vient ce savoir-faire ────────────────────────────────────────────
//
// De la liste de la professeure : « Caractériser le parallélisme par les
// angles : angles alternes-internes, angles correspondants », et « [EIB]
// Rappels : cas particulier, lien avec les propriétés de sixième ». Le cahier
// d'Antonin s'arrête pour l'instant aux définitions ; la propriété viendra
// sans doute au prochain cours. Ce savoir-faire la prépare — à vérifier avec
// la façon dont elle sera présentée en classe.
//
// ── Les deux sens de la propriété ────────────────────────────────────────
//
//   droites parallèles  →  alternes-internes égaux, correspondants égaux
//   angles égaux        →  droites parallèles (et angles différents → non)
//
// L'erreur la plus fréquente n'est pas de mal calculer : c'est d'affirmer
// l'égalité sans que les droites soient dites parallèles. Chaque exercice
// déclare donc `droitesParalleles`, et le contrôle de contenu vérifie que la
// figure dessine bien ce que l'énoncé dit.
//
// ── Le cas particulier de sixième ────────────────────────────────────────
//
// Quand l'angle vaut 90°, la propriété redonne les règles de 6e : deux
// droites perpendiculaires à une même troisième sont parallèles, et une
// perpendiculaire à l'une de deux parallèles est perpendiculaire à l'autre.

const secante = (angle, extra = {}) => ({ modele: 'secante', angle, ...extra });
const PARALLELES = [
  'Oui : les angles alternes-internes sont égaux',
  'Non : les angles alternes-internes ne sont pas égaux',
  'On ne peut pas savoir',
];

export default {
  id: 'sf-2-4',
  titre: 'Utiliser les angles pour le parallélisme',
  attendus: [
    'Il sait que si deux droites sont parallèles, les angles alternes-internes et les angles correspondants sont égaux.',
    'Il sait que des angles alternes-internes ou correspondants égaux prouvent que les droites sont parallèles.',
    'Il calcule des angles sur une figure de deux droites parallèles coupées par une sécante.',
  ],

  decouvrir: {
    titre: 'Quand les droites sont parallèles',
    texte:
      'Les droites (D) et (D\') sont parallèles, et la sécante (d) les coupe. L\'angle 2 '
      + 'mesure 65°. On mesure au rapporteur l\'angle 6, qui lui correspond, et '
      + 'l\'angle 4, qui est alterne-interne avec l\'angle 6.',
    figure: secante(65, { mesures: { 2: '65°' }, surligner: { 2: 'c', 6: 'c', 4: 'b' } }),
    lignes: [
      { calcul: 'L\'angle 6', resultat: 'correspondant à l\'angle 2' },
      { calcul: 'L\'angle 4', resultat: 'alterne-interne avec l\'angle 6' },
    ],
    question: 'Que mesurent l\'angle 6 et l\'angle 4 ?',
    champs: [
      { id: 'a', etiquette: 'angle 6, en degrés', attendu: 65 },
      { id: 'b', etiquette: 'angle 4, en degrés', attendu: 65 },
    ],
    conclusion:
      'Les deux mesurent **65°**, comme l\'angle 2. Quand deux droites sont **parallèles**, '
      + 'les angles correspondants sont égaux, et les angles alternes-internes aussi.\n'
      + 'Si (D\') penchait un peu, l\'angle 6 changerait : c\'est le parallélisme qui '
      + 'fait l\'égalité.',
  },

  cours: [
    {
      type: 'propriete',
      titre: 'Si les droites sont parallèles…',
      texte:
        'Si deux droites **parallèles** sont coupées par une sécante, alors :\n'
        + '— les angles **alternes-internes** sont égaux ;\n'
        + '— les angles **correspondants** sont égaux.',
      figure: secante(60, { surligner: { 3: 'a', 5: 'a', 2: 'c', 6: 'c' } }),
    },
    {
      type: 'propriete',
      titre: '… et réciproquement',
      texte:
        'Si deux droites coupées par une sécante forment des angles alternes-internes '
        + '**égaux** (ou des angles correspondants égaux), alors ces droites sont '
        + '**parallèles**.\n'
        + 'Et s\'ils ne sont **pas** égaux, les droites ne sont **pas** parallèles.',
    },
    {
      type: 'remarque',
      titre: 'Pas de parallèles, pas d\'égalité',
      texte:
        'Des angles alternes-internes ne sont égaux **que si** les droites sont '
        + 'parallèles. Avant d\'écrire « ces angles sont égaux », cherche le mot '
        + '« parallèles » dans l\'énoncé.',
    },
    {
      type: 'remarque',
      titre: 'Le cas de l\'angle droit, vu en 6e',
      texte:
        'Si la sécante coupe (D) à angle droit, les propriétés redonnent celles de 6e :\n'
        + '— deux droites **perpendiculaires à une même droite** sont **parallèles** ;\n'
        + '— si deux droites sont parallèles, toute droite **perpendiculaire à l\'une** '
        + 'est **perpendiculaire à l\'autre**.',
    },
    {
      type: 'exemple',
      texte: '(D) // (D\') et angle 2 = 65° : angle 6 = 65° (correspondants), angle 4 = 65° (alternes-internes avec 6), angle 5 = 115°',
    },
  ],

  methode: {
    titre: 'Calculer les angles 6 et 5',
    enonce: 'Les droites (D) et (D\') sont parallèles. L\'angle 2 mesure 70°. Calculer l\'angle 6, puis l\'angle 5.',
    figure: secante(70, { mesures: { 2: '70°' } }),
    etapes: [
      { texte: 'Les angles 2 et 6 sont correspondants, et (D) // (D\').', note: 'Je vérifie d\'abord le parallélisme.' },
      { texte: 'Donc l\'angle 6 mesure 70°.', note: 'Correspondants et droites parallèles : égaux.' },
      { texte: 'Les angles 5 et 6 sont adjacents, sur la droite (D\') : 180° − 70° = 110°.', note: 'Côte à côte sur une droite : supplémentaires.' },
    ],
    controle:
      'Le contrôle : l\'angle 5 est obtus, l\'angle 6 aigu — c\'est cohérent avec la '
      + 'figure. Et autour de B, les quatre angles font 70 + 110 + 70 + 110 = 360°.',
  },

  entrainement: [
    // ── Palier 1 : droites parallèles, une seule étape ─────────────────────
    {
      id: 'e-2-4-1', type: 'calcul', palier: 1, piege: 'egal-ou-supplementaire',
      consigne: '(D) et (D\') sont parallèles. L\'angle 2 mesure 58°. Combien mesure l\'angle 6 ?',
      enonce: '(D) // (D\') ; angle 2 : 58°.',
      figure: secante(58, { mesures: { 2: '58°' } }), angleVise: 6, droitesParalleles: true, attendu: 58,
      fausses: [{ valeur: 122, piege: 'egal-ou-supplementaire' }],
    },
    {
      id: 'e-2-4-2', type: 'calcul', palier: 1, piege: 'egal-ou-supplementaire',
      consigne: '(D) et (D\') sont parallèles. L\'angle 3 mesure 122°. Combien mesure l\'angle 5 ?',
      enonce: '(D) // (D\') ; angle 3 : 122°.',
      figure: secante(58, { mesures: { 3: '122°' } }), angleVise: 5, droitesParalleles: true, attendu: 122,
      fausses: [{ valeur: 58, piege: 'egal-ou-supplementaire' }],
    },
    {
      id: 'e-2-4-3', type: 'calcul', palier: 1, piege: 'egal-ou-supplementaire',
      consigne: '(D) et (D\') sont parallèles. L\'angle 4 mesure 72°. Combien mesure l\'angle 6 ?',
      enonce: '(D) // (D\') ; angle 4 : 72°.',
      figure: secante(72, { mesures: { 4: '72°' } }), angleVise: 6, droitesParalleles: true, attendu: 72,
      fausses: [{ valeur: 108, piege: 'egal-ou-supplementaire' }],
    },
    // ── Palier 2 : deux étapes, et la réciproque ───────────────────────────
    {
      id: 'e-2-4-4', type: 'calcul', palier: 2, piege: 'egal-ou-supplementaire',
      consigne: '(D) et (D\') sont parallèles. L\'angle 4 mesure 72°. Combien mesure l\'angle 5 ?',
      enonce: '(D) // (D\') ; angle 4 : 72°.',
      figure: secante(72, { mesures: { 4: '72°' } }), angleVise: 5, droitesParalleles: true, attendu: 108,
      fausses: [{ valeur: 72, piege: 'egal-ou-supplementaire' }],
    },
    {
      // NEUTRE : des angles opposés par le sommet, égaux avec ou sans
      // parallélisme. Le piège du parallélisme oublié ne peut pas jouer.
      id: 'e-2-4-5', type: 'calcul', palier: 2, neutre: true, piege: 'parallelisme-oublie',
      consigne: 'L\'angle 5 mesure 130°. Combien mesure l\'angle 7 ?',
      enonce: 'Angle 5 : 130°.',
      figure: secante(50, { mesures: { 5: '130°' } }), angleVise: 7, attendu: 130,
    },
    {
      id: 'e-2-4-6', type: 'choix', palier: 2, piege: 'parallelisme-oublie',
      consigne: 'Les droites (D) et (D\') sont-elles parallèles ?',
      enonce: 'L\'angle 3 mesure 115° et l\'angle 5 mesure 120°.',
      figure: secante(65, { angleB: 60, mesures: { 3: '115°', 5: '120°' } }), droitesParalleles: false,
      choix: PARALLELES, attendu: 'Non : les angles alternes-internes ne sont pas égaux',
      fausses: [
        { valeur: 'Oui : les angles alternes-internes sont égaux', piege: 'parallelisme-oublie' },
        { valeur: 'On ne peut pas savoir', piege: 'parallelisme-oublie' },
      ],
    },
    {
      id: 'e-2-4-7', type: 'choix', palier: 2, piege: 'parallelisme-oublie',
      consigne: 'Les droites (D) et (D\') sont-elles parallèles ?',
      enonce: 'L\'angle 4 mesure 64° et l\'angle 6 mesure 64°.',
      figure: secante(64, { mesures: { 4: '64°', 6: '64°' } }), droitesParalleles: true,
      choix: PARALLELES, attendu: 'Oui : les angles alternes-internes sont égaux',
      fausses: [{ valeur: 'On ne peut pas savoir', piege: 'parallelisme-oublie' }],
    },
    // ── Palier 3 : raisonner, et le cas de 6e ──────────────────────────────
    {
      id: 'e-2-4-8', type: 'corriger', palier: 3, piege: 'parallelisme-oublie',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: 'L\'énoncé ne dit pas que (D) et (D\') sont parallèles. L\'angle 2 mesure 65°. Calculer l\'angle 6.',
      figure: secante(65, { angleB: 60, mesures: { 2: '65°' } }), droitesParalleles: false,
      lignes: [
        { texte: 'Les angles 2 et 6 sont correspondants.', fausse: false },
        { texte: 'Des angles correspondants sont égaux.', fausse: true },
        { texte: 'Donc l\'angle 6 mesure 65°.', fausse: false },
      ],
      explication:
        'La première ligne est juste : 2 et 6 sont bien correspondants. Mais des '
        + 'angles correspondants ne sont égaux que si les droites sont parallèles, et '
        + 'l\'énoncé ne le dit pas. On ne peut pas calculer l\'angle 6 — d\'ailleurs, '
        + 'sur la figure, il ne mesure pas 65°.',
    },
    {
      id: 'e-2-4-9', type: 'calcul', palier: 3, piege: 'egal-ou-supplementaire',
      consigne: '(D) et (D\') sont parallèles. L\'angle 1 mesure 140°. Combien mesure l\'angle 7 ?',
      enonce: '(D) // (D\') ; angle 1 : 140°.',
      figure: secante(40, { mesures: { 1: '140°' } }), angleVise: 7, droitesParalleles: true, attendu: 140,
      fausses: [{ valeur: 40, piege: 'egal-ou-supplementaire' }],
    },
    {
      id: 'e-2-4-10', type: 'choix', palier: 3, piege: 'parallelisme-oublie',
      consigne: 'Deux droites sont perpendiculaires à une même troisième droite. Que peut-on dire de ces deux droites ?',
      enonce: 'Deux droites perpendiculaires à une même droite.',
      choix: ['Elles sont parallèles', 'Elles sont perpendiculaires', 'On ne peut rien dire'],
      attendu: 'Elles sont parallèles',
      fausses: [
        { valeur: 'Elles sont perpendiculaires', piege: 'parallelisme-oublie' },
        { valeur: 'On ne peut rien dire', piege: 'parallelisme-oublie' },
      ],
    },
  ],

  problemes: [
    {
      id: 'p-2-4-1',
      enonce: 'Les droites (D) et (D\') sont parallèles. L\'angle 2 mesure 75°.',
      figure: secante(75, { mesures: { 2: '75°' } }),
      questions: [
        { texte: 'Combien mesure l\'angle 6 ?', attendu: 75, unite: '°' },
        { texte: 'Combien mesure l\'angle 5 ?', attendu: 105, unite: '°' },
      ],
    },
    {
      id: 'p-2-4-2',
      enonce: 'Les droites (D) et (D\') sont parallèles. L\'angle 3 mesure 118°.',
      figure: secante(62, { mesures: { 3: '118°' } }),
      questions: [
        { texte: 'Combien mesure l\'angle 5 ?', attendu: 118, unite: '°' },
        { texte: 'Combien mesure l\'angle 8 ?', attendu: 62, unite: '°' },
      ],
    },
    {
      id: 'p-2-4-3',
      enonce: 'Les deux rails d\'une voie ferrée sont parallèles. Une route les traverse en faisant un angle de 55° avec le premier rail (angle 2).',
      figure: secante(55, { mesures: { 2: '55°' }, noms: { D: '(rail 1)', Dp: '(rail 2)', d: '(route)' } }),
      questions: [
        { texte: 'Quel angle la route fait-elle avec le second rail, à la même place (angle 6) ?', attendu: 55, unite: '°' },
        { texte: 'Combien mesure l\'angle 4 ?', attendu: 55, unite: '°' },
      ],
    },
    {
      id: 'p-2-4-4',
      enonce: 'Sur cette figure, l\'angle 3 mesure 110° et l\'angle 5 mesure 105°.',
      figure: secante(70, { angleB: 75, mesures: { 3: '110°', 5: '105°' } }),
      questions: [
        { texte: 'Combien devrait mesurer l\'angle 5 pour que (D) et (D\') soient parallèles ?', attendu: 110, unite: '°' },
        { texte: 'De combien de degrés l\'angle 5 s\'en écarte-t-il ?', attendu: 5, unite: '°' },
      ],
    },
    {
      id: 'p-2-4-5',
      enonce: 'Les droites (D) et (D\') sont parallèles. L\'angle 6 mesure 48°.',
      figure: secante(48, { mesures: { 6: '48°' } }),
      questions: [
        { texte: 'Combien mesure l\'angle 2 ?', attendu: 48, unite: '°' },
        { texte: 'Combien mesure l\'angle 3 ?', attendu: 132, unite: '°' },
      ],
    },
  ],

  test: [
    {
      id: 't-2-4-1', type: 'calcul', consigne: '(D) // (D\'). L\'angle 2 mesure 66°. Combien mesure l\'angle 6 ?', enonce: '(D) // (D\') ; angle 2 : 66°.',
      figure: secante(66, { mesures: { 2: '66°' } }), angleVise: 6, droitesParalleles: true, attendu: 66, revoir: 'propriete',
    },
    {
      id: 't-2-4-2', type: 'calcul', consigne: '(D) // (D\'). L\'angle 4 mesure 66°. Combien mesure l\'angle 6 ?', enonce: '(D) // (D\') ; angle 4 : 66°.',
      figure: secante(66, { mesures: { 4: '66°' } }), angleVise: 6, droitesParalleles: true, attendu: 66, revoir: 'propriete',
    },
    {
      id: 't-2-4-3', type: 'calcul', consigne: '(D) // (D\'). L\'angle 2 mesure 66°. Combien mesure l\'angle 5 ?', enonce: '(D) // (D\') ; angle 2 : 66°.',
      figure: secante(66, { mesures: { 2: '66°' } }), angleVise: 5, droitesParalleles: true, attendu: 114, revoir: 'exemple',
    },
    {
      id: 't-2-4-4', type: 'calcul', consigne: '(D) // (D\'). L\'angle 1 mesure 125°. Combien mesure l\'angle 5 ?', enonce: '(D) // (D\') ; angle 1 : 125°.',
      figure: secante(55, { mesures: { 1: '125°' } }), angleVise: 5, droitesParalleles: true, attendu: 125, revoir: 'propriete',
    },
    {
      id: 't-2-4-5', type: 'choix', consigne: 'Les droites (D) et (D\') sont-elles parallèles ?', enonce: 'L\'angle 3 mesure 100° et l\'angle 5 mesure 100°.',
      figure: secante(80, { mesures: { 3: '100°', 5: '100°' } }), droitesParalleles: true,
      choix: PARALLELES, attendu: 'Oui : les angles alternes-internes sont égaux', revoir: 'propriete',
    },
    {
      id: 't-2-4-6', type: 'choix', consigne: 'Les droites (D) et (D\') sont-elles parallèles ?', enonce: 'L\'angle 4 mesure 70° et l\'angle 6 mesure 75°.',
      figure: secante(70, { angleB: 75, mesures: { 4: '70°', 6: '75°' } }), droitesParalleles: false,
      choix: PARALLELES, attendu: 'Non : les angles alternes-internes ne sont pas égaux', revoir: 'propriete',
    },
    {
      id: 't-2-4-7', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Deux angles alternes-internes sont toujours égaux, même si les droites ne sont pas parallèles.', attendu: false, revoir: 'remarque',
    },
    {
      id: 't-2-4-8', type: 'choix', consigne: 'Deux droites sont parallèles. Une troisième droite est perpendiculaire à la première. Que peut-on dire d\'elle et de la seconde ?', enonce: 'Une perpendiculaire à l\'une de deux droites parallèles.',
      choix: ['Elle est perpendiculaire à la seconde', 'Elle est parallèle à la seconde', 'On ne peut rien dire'], attendu: 'Elle est perpendiculaire à la seconde', revoir: 'remarque',
    },
    {
      id: 't-2-4-9', type: 'calcul', consigne: 'L\'angle 6 mesure 80°. Combien mesure l\'angle 8 ?', enonce: 'Angle 6 : 80°.',
      figure: secante(80, { mesures: { 6: '80°' } }), angleVise: 8, attendu: 80, revoir: 'exemple',
    },
    {
      id: 't-2-4-10', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Si deux angles correspondants sont égaux, alors les deux droites sont parallèles.', attendu: true, revoir: 'propriete',
    },
  ],
};
