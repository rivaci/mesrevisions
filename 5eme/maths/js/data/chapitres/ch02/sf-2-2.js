// Chapitre 2, savoir-faire 2 — Les paires d'angles.
//
// ── D'où vient ce savoir-faire ────────────────────────────────────────────
//
// Du cahier d'Antonin, « Pour une paire d'angles » : complémentaires,
// supplémentaires, adjacents, opposés par le sommet, et la remarque « deux
// angles opposés par le sommet sont égaux ».
//
// ── Deux précisions par rapport au cahier ────────────────────────────────
//
// 1. Le cahier définit les angles adjacents comme « ayant un côté en commun et
//    un seul ». Il manque deux conditions : le MÊME SOMMET, et être situés de
//    part et d'autre du côté commun. Le cours ci-dessous donne la définition
//    complète, et un raisonnement du dialogue d'erreur vise précisément
//    l'oubli du sommet.
//
// 2. Sur la dernière figure du cahier, sous-titrée « 2 angles adjacents et
//    complémentaires », les deux angles semblent posés sur une droite : leur
//    somme ferait alors 180°, ils seraient SUPPLÉMENTAIRES. C'est peut-être
//    une erreur de copie ; à vérifier avec le cahier ou la professeure. Le
//    cours ci-dessous dit : deux angles adjacents dont les côtés extérieurs
//    forment une droite sont supplémentaires.
//
// ── Le geste ─────────────────────────────────────────────────────────────
//
// Quand deux droites se coupent : côte à côte → adjacents, et leur somme fait
// 180° ; face à face → opposés par le sommet, et ils sont égaux. Presque tous
// les calculs du chapitre suivant s'y ramènent.

const croisement = (angle, mesures, surligner) => ({ modele: 'croisement', angle, mesures, surligner });
const NATURES = ['adjacents', 'opposés par le sommet', 'aucune de ces paires'];

export default {
  id: 'sf-2-2',
  titre: 'Les paires d\'angles',
  attendus: [
    'Il sait que deux angles complémentaires font 90°, et deux supplémentaires 180°.',
    'Il reconnaît deux angles adjacents et deux angles opposés par le sommet.',
    'Il utilise l\'égalité des angles opposés par le sommet pour calculer.',
  ],

  decouvrir: {
    titre: 'Deux droites qui se coupent',
    texte:
      'Deux droites se coupent et forment quatre angles, numérotés de 1 à 4. '
      + 'L\'angle 2 mesure 60°. On mesure les trois autres au rapporteur.',
    figure: croisement(60, { 2: '60°' }),
    lignes: [
      { calcul: 'L\'angle 4', resultat: 'face à l\'angle 2' },
      { calcul: 'L\'angle 1', resultat: 'à côté de l\'angle 2, sur la même droite' },
    ],
    question: 'Que mesurent l\'angle 4 et l\'angle 1 ?',
    champs: [
      { id: 'a', etiquette: 'angle 4, en degrés', attendu: 60 },
      { id: 'b', etiquette: 'angle 1, en degrés', attendu: 120 },
    ],
    conclusion:
      'L\'angle 4, **face à face** avec l\'angle 2, mesure aussi **60°** : deux angles '
      + 'opposés par le sommet sont égaux.\n'
      + 'L\'angle 1, **côte à côte** avec l\'angle 2, mesure **120°** : à eux deux, ils '
      + 'forment la droite, soit 180°. Ils sont supplémentaires.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Complémentaires et supplémentaires',
      texte:
        'Deux angles sont **complémentaires** quand la somme de leurs mesures vaut **90°**.\n'
        + 'Deux angles sont **supplémentaires** quand la somme de leurs mesures vaut **180°**.',
    },
    {
      type: 'definition',
      titre: 'Adjacents et opposés par le sommet',
      texte:
        'Deux angles sont **adjacents** quand ils ont le **même sommet**, un **côté '
        + 'commun**, et qu\'ils sont situés **de part et d\'autre** de ce côté. Sur la '
        + 'figure : 1 et 2, par exemple.\n'
        + 'Deux angles sont **opposés par le sommet** quand ils ont le même sommet et '
        + 'que leurs côtés sont dans le prolongement l\'un de l\'autre : 1 et 3, ou 2 et 4.',
      figure: croisement(55, undefined, { 1: 'a', 2: 'b' }),
    },
    {
      type: 'propriete',
      titre: 'Deux angles opposés par le sommet sont égaux',
      texte:
        'Sur la figure, l\'angle 2 et l\'angle 4 ont la même mesure, comme l\'angle 1 '
        + 'et l\'angle 3.',
      figure: croisement(55, undefined, { 2: 'a', 4: 'a', 1: 'b', 3: 'b' }),
    },
    {
      type: 'remarque',
      titre: 'Côte à côte sur une droite : 180°',
      texte:
        'Deux angles adjacents dont les deux autres côtés forment une **droite** sont '
        + 'supplémentaires : à eux deux, ils font un angle plat.\n'
        + 'Si l\'angle 2 mesure 55°, l\'angle 1 mesure 180° − 55° = **125°**.',
    },
    {
      type: 'exemple',
      texte: 'Le complémentaire de 35° : 55°   ·   le supplémentaire de 35° : 145°   ·   angle 2 = 55°, donc angle 4 = 55° et angle 1 = 125°',
    },
  ],

  methode: {
    titre: 'Calculer les trois autres angles',
    enonce: 'Deux droites se coupent. L\'angle 2 mesure 50°. Calculer les angles 1, 3 et 4.',
    figure: croisement(50, { 2: '50°' }),
    etapes: [
      { texte: 'L\'angle 4 est opposé par le sommet à l\'angle 2 : il mesure aussi 50°.', note: 'Face à face : égaux.' },
      { texte: 'L\'angle 1 est adjacent à l\'angle 2, sur une droite : 180° − 50° = 130°.', note: 'Côte à côte : 180° à eux deux.' },
      { texte: 'L\'angle 3 est opposé par le sommet à l\'angle 1 : il mesure 130°.', note: '' },
    ],
    controle:
      'Le contrôle : les quatre angles font le tour complet, 360°. '
      + '50 + 130 + 50 + 130 = 360 : c\'est juste.',
  },

  entrainement: [
    // ── Palier 1 : les définitions ────────────────────────────────────────
    {
      id: 'e-2-2-1', type: 'calcul', palier: 1, piege: 'complementaire-supplementaire',
      consigne: 'Quelle est la mesure du complémentaire d\'un angle de 35° ?', enonce: 'Un angle de 35°.', attendu: 55,
      fausses: [{ valeur: 145, piege: 'complementaire-supplementaire' }, { valeur: 35, piege: 'complementaire-supplementaire' }],
    },
    {
      id: 'e-2-2-2', type: 'calcul', palier: 1, piege: 'complementaire-supplementaire',
      consigne: 'Quelle est la mesure du supplémentaire d\'un angle de 35° ?', enonce: 'Un angle de 35°.', attendu: 145,
      fausses: [{ valeur: 55, piege: 'complementaire-supplementaire' }],
    },
    {
      // NEUTRE : une addition, et rien à confondre.
      id: 'e-2-2-3', type: 'calcul', palier: 1, neutre: true, piege: 'complementaire-supplementaire',
      consigne: 'Deux angles mesurent 40° et 50°. Quelle est la somme de leurs mesures ?', enonce: '40° et 50°', attendu: 90,
    },
    {
      id: 'e-2-2-4', type: 'choix', palier: 1, piege: 'complementaire-supplementaire',
      consigne: 'Deux angles mesurent 110° et 70°. Ils sont…', enonce: '110° et 70°',
      choix: ['complémentaires', 'supplémentaires', 'ni l\'un ni l\'autre'], attendu: 'supplémentaires',
      fausses: [{ valeur: 'complémentaires', piege: 'complementaire-supplementaire' }],
    },
    // ── Palier 2 : sur la figure ───────────────────────────────────────────
    {
      id: 'e-2-2-5', type: 'choix', palier: 2, piege: 'paire-d-angles-confondue',
      consigne: 'Comment s\'appelle la paire formée par les angles 1 et 3 ?', enonce: 'Les angles 1 et 3.',
      figure: croisement(65, undefined, { 1: 'a', 3: 'a' }), paire: [1, 3],
      choix: NATURES, attendu: 'opposés par le sommet',
      fausses: [{ valeur: 'adjacents', piege: 'paire-d-angles-confondue' }],
    },
    {
      id: 'e-2-2-6', type: 'choix', palier: 2, piege: 'paire-d-angles-confondue',
      consigne: 'Comment s\'appelle la paire formée par les angles 3 et 4 ?', enonce: 'Les angles 3 et 4.',
      figure: croisement(65, undefined, { 3: 'b', 4: 'b' }), paire: [3, 4],
      choix: NATURES, attendu: 'adjacents',
      fausses: [{ valeur: 'opposés par le sommet', piege: 'paire-d-angles-confondue' }],
    },
    {
      id: 'e-2-2-7', type: 'calcul', palier: 2, piege: 'paire-d-angles-confondue',
      consigne: 'L\'angle 2 mesure 65°. Combien mesure l\'angle 4 ?', enonce: 'Angle 2 : 65°.',
      figure: croisement(65, { 2: '65°' }), angleVise: 4, attendu: 65,
      fausses: [{ valeur: 115, piege: 'paire-d-angles-confondue' }],
    },
    {
      id: 'e-2-2-8', type: 'calcul', palier: 2, piege: 'paire-d-angles-confondue',
      consigne: 'L\'angle 2 mesure 65°. Combien mesure l\'angle 3 ?', enonce: 'Angle 2 : 65°.',
      figure: croisement(65, { 2: '65°' }), angleVise: 3, attendu: 115,
      fausses: [{ valeur: 65, piege: 'paire-d-angles-confondue' }],
    },
    // ── Palier 3 : raisonner ───────────────────────────────────────────────
    {
      id: 'e-2-2-9', type: 'vraifaux', palier: 3, piege: 'paire-d-angles-confondue',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Deux angles opposés par le sommet ont toujours la même mesure.',
      attendu: true,
    },
    {
      id: 'e-2-2-10', type: 'corriger', palier: 3, piege: 'paire-d-angles-confondue',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: 'L\'angle 2 mesure 40°. Calculer l\'angle 1.',
      figure: croisement(40, { 2: '40°' }),
      lignes: [
        { texte: 'Les angles 1 et 2 sont côte à côte, sur la même droite.', fausse: false },
        { texte: 'Ils sont donc opposés par le sommet.', fausse: true },
        { texte: 'Donc l\'angle 1 mesure 40°.', fausse: false },
      ],
      explication:
        'La première ligne est juste, et elle dit exactement ce qu\'il fallait : côte '
        + 'à côte sur une droite, les angles sont adjacents, donc supplémentaires. '
        + 'L\'angle 1 mesure 180° − 40° = 140°. Ce sont les angles 2 et 4 qui sont '
        + 'opposés par le sommet.',
    },
  ],

  problemes: [
    {
      id: 'p-2-2-1',
      enonce:
        'Une échelle est posée contre un mur vertical. Le mur et le sol forment un '
        + 'angle droit. L\'échelle fait un angle de 70° avec le sol.',
      questions: [
        { texte: 'Quel angle l\'échelle fait-elle avec le mur ? (Les deux angles sont complémentaires.)', attendu: 20, unite: '°' },
        { texte: 'Quel angle fait-elle avec le sol, de l\'autre côté de son pied ?', attendu: 110, unite: '°' },
      ],
    },
    {
      id: 'p-2-2-2',
      enonce: 'Deux routes droites se croisent. L\'un des quatre angles du carrefour mesure 48°.',
      figure: croisement(48, { 2: '48°' }),
      questions: [
        { texte: 'Combien mesure l\'angle qui lui fait face (l\'angle 4) ?', attendu: 48, unite: '°' },
        { texte: 'Combien mesure l\'angle voisin (l\'angle 1) ?', attendu: 132, unite: '°' },
      ],
    },
    {
      id: 'p-2-2-3',
      enonce: 'Les aiguilles d\'une horloge forment un angle de 60° à 2 h.',
      questions: [
        { texte: 'Quel est le complémentaire de cet angle ?', attendu: 30, unite: '°' },
        { texte: 'Quel est son supplémentaire ?', attendu: 120, unite: '°' },
      ],
    },
    {
      id: 'p-2-2-4',
      enonce: 'Une porte est ouverte de 35° par rapport au mur, qui forme une ligne droite.',
      questions: [
        { texte: 'Quel angle reste-t-il entre la porte et l\'autre partie du mur ?', attendu: 145, unite: '°' },
        { texte: 'Si on ouvre la porte à 90°, quel angle reste-t-il de l\'autre côté ?', attendu: 90, unite: '°' },
      ],
    },
    {
      id: 'p-2-2-5',
      enonce: 'Une planche est coupée en biais : les deux angles de la coupe, de part et d\'autre, sont supplémentaires. L\'un mesure 58°.',
      questions: [
        { texte: 'Combien mesure l\'autre angle de la coupe ?', attendu: 122, unite: '°' },
        { texte: 'Combien mesure le complémentaire de l\'angle de 58° ?', attendu: 32, unite: '°' },
      ],
    },
  ],

  test: [
    { id: 't-2-2-1', type: 'calcul', consigne: 'Complémentaire d\'un angle de 25° ?', enonce: 'Un angle de 25°.', attendu: 65, revoir: 'definition' },
    { id: 't-2-2-2', type: 'calcul', consigne: 'Supplémentaire d\'un angle de 25° ?', enonce: 'Un angle de 25°.', attendu: 155, revoir: 'definition' },
    {
      id: 't-2-2-3', type: 'choix', consigne: 'Deux angles mesurent 30° et 60°. Ils sont…', enonce: '30° et 60°',
      choix: ['complémentaires', 'supplémentaires', 'ni l\'un ni l\'autre'], attendu: 'complémentaires', revoir: 'definition',
    },
    {
      id: 't-2-2-4', type: 'choix', consigne: 'Comment s\'appelle la paire formée par les angles 2 et 4 ?', enonce: 'Les angles 2 et 4.',
      figure: croisement(50, undefined, { 2: 'a', 4: 'a' }), paire: [2, 4],
      choix: NATURES, attendu: 'opposés par le sommet', revoir: 'definition',
    },
    {
      id: 't-2-2-5', type: 'choix', consigne: 'Comment s\'appelle la paire formée par les angles 1 et 2 ?', enonce: 'Les angles 1 et 2.',
      figure: croisement(50, undefined, { 1: 'b', 2: 'b' }), paire: [1, 2],
      choix: NATURES, attendu: 'adjacents', revoir: 'definition',
    },
    {
      id: 't-2-2-6', type: 'calcul', consigne: 'L\'angle 2 mesure 75°. Combien mesure l\'angle 4 ?', enonce: 'Angle 2 : 75°.',
      figure: croisement(75, { 2: '75°' }), angleVise: 4, attendu: 75, revoir: 'propriete',
    },
    {
      id: 't-2-2-7', type: 'calcul', consigne: 'L\'angle 2 mesure 75°. Combien mesure l\'angle 1 ?', enonce: 'Angle 2 : 75°.',
      figure: croisement(75, { 2: '75°' }), angleVise: 1, attendu: 105, revoir: 'remarque',
    },
    {
      id: 't-2-2-8', type: 'calcul', consigne: 'L\'angle 1 mesure 140°. Combien mesure l\'angle 3 ?', enonce: 'Angle 1 : 140°.',
      figure: croisement(40, { 1: '140°' }), angleVise: 3, attendu: 140, revoir: 'propriete',
    },
    {
      id: 't-2-2-9', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Deux angles adjacents ont toujours la même mesure.', attendu: false, revoir: 'definition',
    },
    {
      id: 't-2-2-10', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Deux angles adjacents doivent avoir le même sommet.', attendu: true, revoir: 'definition',
    },
  ],
};
