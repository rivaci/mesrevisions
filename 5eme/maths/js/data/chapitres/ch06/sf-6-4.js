// Chapitre 6, savoir-faire 4 — Construire un triangle à partir de données partielles.
//
// ── D'où vient ce savoir-faire ────────────────────────────────────────────
//
// Du point « construire à partir de données partielles » de la liste de la
// professeure.
//
// ── Ce que l'écran peut faire d'une construction ─────────────────────────
//
// La construction elle-même se fait sur papier, au compas et au rapporteur.
// L'application travaille ce qui la précède et ce qui la rend juste :
// reconnaître si les données suffisent (et lequel des trois cas on a),
// choisir la première étape, et calculer la mesure qui manque avant de
// tracer.

const SUFFIT = ['oui', 'non'];
const suffisent = (id, palier, enonce, attendu, extra = {}) => ({
  id, type: 'choix', palier,
  consigne: 'Ces données suffisent-elles pour construire un triangle ABC unique ?',
  enonce, choix: SUFFIT, attendu,
  ...extra,
});
const fausseSuffit = (attendu) => [{ valeur: attendu === 'oui' ? 'non' : 'oui', piege: 'donnees-insuffisantes' }];

export default {
  id: 'sf-6-4',
  titre: 'Construire un triangle à partir de données partielles',
  attendus: [
    'Il sait quelles données suffisent pour construire un triangle.',
    'Il ordonne les étapes d\'une construction à la règle, au compas et au rapporteur.',
    'Il calcule une longueur ou un angle manquant avant de construire.',
  ],

  decouvrir: {
    titre: 'Qui construit le bon triangle ?',
    texte:
      'Trois élèves doivent reproduire le même triangle ABC. Le premier connaît AB = 5 cm et '
      + 'BC = 4 cm. Le deuxième connaît AB = 5 cm, BC = 4 cm et l\'angle en B, 60°. Le troisième '
      + 'connaît les trois angles : 60°, 70° et 50°.',
    question: 'Combien de ces élèves sont sûrs de construire exactement le triangle ABC ?',
    champs: [{ id: 'a', etiquette: 'nombre d\'élèves', attendu: 1 }],
    conclusion:
      'Un seul : le **deuxième**. Avec deux côtés seulement, le triangle peut s\'ouvrir plus ou '
      + 'moins. Avec trois angles, on connaît sa forme, mais pas sa taille.\n'
      + 'Pour construire un triangle, il faut **trois longueurs**, ou **deux longueurs et l\'angle '
      + 'compris**, ou **une longueur et les deux angles adjacents**.',
  },

  cours: [
    {
      type: 'propriete',
      titre: 'Les trois cas de construction',
      texte:
        'On peut construire un triangle si l\'on connaît :\n'
        + '• ses **trois longueurs** — au compas ;\n'
        + '• **deux longueurs** et **l\'angle compris** entre ces deux côtés — au rapporteur ;\n'
        + '• **une longueur** et les **deux angles** situés à ses extrémités — au rapporteur.',
    },
    {
      type: 'remarque',
      titre: 'Trois angles ne suffisent pas',
      texte:
        'Trois angles donnent la **forme** du triangle, pas sa **taille** : un petit et un grand '
        + 'triangle équilatéral ont les mêmes angles.',
    },
    {
      type: 'remarque',
      titre: 'Calculer avant de construire',
      texte:
        'Si on connaît deux angles, le troisième se calcule. Si le triangle est isocèle ou '
        + 'équilatéral, des longueurs et des angles se déduisent de sa nature.',
    },
    {
      type: 'exemple',
      texte:
        'ABC avec AB = 6 cm, angle en A = 40°, angle en B = 75° : on trace [AB], on reporte 40° en '
        + 'A et 75° en B ; les deux demi-droites se coupent en C.',
    },
  ],

  methode: {
    titre: 'Construire ABC avec AB = 5 cm, AC = 3 cm et BC = 4 cm',
    enonce: 'Construire le triangle ABC tel que AB = 5 cm, AC = 3 cm et BC = 4 cm.',
    etapes: [
      { texte: 'Je vérifie qu\'il est constructible : 5 < 3 + 4.', note: 'La plus grande longueur est plus petite que la somme des deux autres.' },
      { texte: 'Je trace le segment [AB] de 5 cm.', note: 'On commence souvent par le plus grand côté.' },
      { texte: 'Je trace un arc de cercle de centre A et de rayon 3 cm.', note: 'C est à 3 cm de A.' },
      { texte: 'Je trace un arc de cercle de centre B et de rayon 4 cm.', note: 'C est à 4 cm de B.' },
      { texte: 'Les deux arcs se coupent en C. Je trace [AC] et [BC].', note: '' },
    ],
    controle:
      'Le contrôle : mesure AC et BC à la règle. Ce triangle 3-4-5 a en plus un angle droit en '
      + 'C, que l\'équerre confirme.',
  },

  entrainement: [
    // ── Palier 1 : les données suffisent-elles ? ───────────────────────────
    // NEUTRE : les trois longueurs, le cas le plus connu.
    suffisent('e-6-4-1', 1, 'AB = 5 cm, BC = 7 cm et AC = 6 cm.', 'oui', { neutre: true }),
    suffisent('e-6-4-2', 1, 'Les trois angles mesurent 45°, 60° et 75°.', 'non',
      { piege: 'donnees-insuffisantes', fausses: fausseSuffit('non') }),
    suffisent('e-6-4-3', 1, 'AB = 4 cm et AC = 6 cm.', 'non',
      { piege: 'donnees-insuffisantes', fausses: fausseSuffit('non') }),
    suffisent('e-6-4-4', 1, 'AB = 4 cm, AC = 6 cm, et l\'angle en A mesure 50°.', 'oui',
      { piege: 'donnees-insuffisantes', fausses: fausseSuffit('oui') }),
    // ── Palier 2 : préparer la construction ────────────────────────────────
    {
      // NEUTRE : l'instrument de chaque geste.
      id: 'e-6-4-5', type: 'choix', palier: 2, neutre: true,
      consigne: 'Quel instrument sert à placer un point à 3 cm d\'un autre, sans connaître la direction ?',
      enonce: 'Le bon instrument.',
      choix: ['le rapporteur', 'le compas', 'l\'équerre'], attendu: 'le compas',
    },
    {
      id: 'e-6-4-6', type: 'choix', palier: 2, piege: 'donnees-insuffisantes',
      consigne: 'Quelle est la première étape de la construction ?',
      enonce: 'Construire ABC avec AB = 7 cm, un angle de 35° en A et un angle de 70° en B.',
      choix: ['tracer un angle de 35°', 'tracer le segment [AB] de 7 cm', 'tracer un arc de cercle de centre A'],
      attendu: 'tracer le segment [AB] de 7 cm',
      fausses: [
        { valeur: 'tracer un angle de 35°', piege: 'donnees-insuffisantes' },
        { valeur: 'tracer un arc de cercle de centre A', piege: 'donnees-insuffisantes' },
      ],
    },
    {
      id: 'e-6-4-7', type: 'calcul', palier: 2, piege: 'somme-angles-oubliee',
      consigne: 'Réponds en degrés.',
      enonce: 'On construit ABC avec AB = 7 cm, un angle de 35° en A et un angle de 70° en B. Combien mesurera l\'angle en C ?',
      attendu: 75,
      fausses: [
        { valeur: 145, piege: 'somme-angles-oubliee' },
        { valeur: 110, piege: 'somme-angles-oubliee' },
      ],
    },
    {
      id: 'e-6-4-8', type: 'choix', palier: 2, piege: 'donnees-insuffisantes',
      consigne: 'Est-ce le cas « deux longueurs et l\'angle compris » ?',
      enonce: 'AB = 5 cm, BC = 3 cm, et l\'angle en C mesure 40°.',
      choix: ['oui', 'non : l\'angle compris entre [AB] et [BC] est l\'angle en B'],
      attendu: 'non : l\'angle compris entre [AB] et [BC] est l\'angle en B',
      fausses: [{ valeur: 'oui', piege: 'donnees-insuffisantes' }],
    },
    // ── Palier 3 : déduire ce qui manque ───────────────────────────────────
    {
      id: 'e-6-4-9', type: 'calcul', palier: 3, piege: 'triangle-particulier-ignore',
      consigne: 'Réponds en centimètres.',
      enonce: 'On veut construire un triangle équilatéral de périmètre 15 cm. Quelle longueur faut-il pour chaque côté ?',
      attendu: 5,
      fausses: [{ valeur: 15, piege: 'triangle-particulier-ignore' }],
    },
    {
      id: 'e-6-4-10', type: 'calcul', palier: 3, piege: 'triangle-particulier-ignore',
      consigne: 'Réponds en centimètres.',
      enonce: 'ABC est isocèle en A, avec AB = 7 cm et BC = 4 cm. Combien mesure AC ?',
      attendu: 7,
      fausses: [{ valeur: 4, piege: 'triangle-particulier-ignore' }],
    },
    {
      id: 'e-6-4-11', type: 'vraifaux', palier: 3, piege: 'donnees-insuffisantes',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Deux triangles qui ont les mêmes trois angles ont aussi les mêmes longueurs.',
      attendu: false,
      contreExemple: {
        invite: 'Donne la longueur du côté de deux triangles équilatéraux différents.',
        champs: [{ id: 'a', etiquette: 'premier triangle' }, { id: 'b', etiquette: 'second triangle' }],
        valide: (a, b) => a > 0 && b > 0 && a !== b,
        exemple: 'Un triangle équilatéral de 2 cm et un de 5 cm : mêmes angles, 60°, mais longueurs différentes.',
      },
    },
    {
      id: 'e-6-4-12', type: 'choix', palier: 3, piege: 'donnees-insuffisantes',
      consigne: 'Laquelle de ces séries de données ne permet pas de construire un triangle unique ?',
      enonce: 'Trois séries de données.',
      choix: [
        'AB = 6 cm, BC = 5 cm et AC = 4 cm',
        'les angles 30°, 70° et 80°',
        'AB = 6 cm, un angle de 30° en A et un angle de 70° en B',
      ],
      attendu: 'les angles 30°, 70° et 80°',
      fausses: [
        { valeur: 'AB = 6 cm, BC = 5 cm et AC = 4 cm', piege: 'donnees-insuffisantes' },
        { valeur: 'AB = 6 cm, un angle de 30° en A et un angle de 70° en B', piege: 'donnees-insuffisantes' },
      ],
    },
  ],

  problemes: [
    {
      id: 'p-6-4-1',
      enonce: 'Un terrain triangulaire ABC a un côté [AB] de 50 m, un angle de 35° en A et un angle de 65° en B.',
      questions: [{ texte: 'Combien mesure l\'angle en C ?', attendu: 80, unite: '°' }],
    },
    {
      id: 'p-6-4-2',
      enonce: 'On veut construire un triangle ABC isocèle en A, avec BC = 6 cm et un angle de 50° en B.',
      questions: [
        { texte: 'Combien mesure l\'angle en C ?', attendu: 50, unite: '°' },
        { texte: 'Combien mesure l\'angle en A ?', attendu: 80, unite: '°' },
      ],
    },
    {
      id: 'p-6-4-3',
      enonce: 'Un triangle isocèle a un périmètre de 20 cm, et sa base mesure 6 cm.',
      questions: [{ texte: 'Combien mesure chacun des deux côtés égaux ?', attendu: 7, unite: 'cm' }],
    },
    {
      id: 'p-6-4-4',
      enonce: 'On construit un triangle ABC rectangle en A, avec AB = 4 cm et AC = 3 cm.',
      questions: [
        { texte: 'Combien mesure l\'angle compris entre [AB] et [AC] ?', attendu: 90, unite: '°' },
        { texte: 'Combien vaut la somme des deux autres angles ?', attendu: 90, unite: '°' },
      ],
    },
    {
      id: 'p-6-4-5',
      enonce: 'On construit un triangle équilatéral dont le périmètre mesure 22,5 cm.',
      questions: [
        { texte: 'Quelle longueur faut-il pour chaque côté ?', attendu: 7.5, unite: 'cm' },
        { texte: 'Quel angle faut-il reporter au rapporteur à chaque sommet ?', attendu: 60, unite: '°' },
      ],
    },
  ],

  test: [
    suffisent('t-6-4-1', undefined, 'Les trois longueurs : 4 cm, 5 cm et 6 cm.', 'oui', { revoir: 'propriete' }),
    suffisent('t-6-4-2', undefined, 'Deux longueurs : AB = 4 cm et BC = 5 cm.', 'non', { revoir: 'propriete' }),
    suffisent('t-6-4-3', undefined, 'Les trois angles : 50°, 60° et 70°.', 'non', { revoir: 'remarque' }),
    suffisent('t-6-4-4', undefined, 'AB = 5 cm, un angle de 30° en A et un angle de 100° en B.', 'oui', { revoir: 'propriete' }),
    suffisent('t-6-4-5', undefined, 'AB = 5 cm, AC = 4 cm, et l\'angle en A mesure 70°.', 'oui', { revoir: 'propriete' }),
    {
      id: 't-6-4-6', type: 'calcul', consigne: 'Réponds en degrés.',
      enonce: 'On construit ABC avec un angle de 35° en A et un angle de 80° en B. Combien mesurera l\'angle en C ?',
      attendu: 65, revoir: 'remarque',
    },
    {
      id: 't-6-4-7', type: 'calcul', consigne: 'Réponds en centimètres.',
      enonce: 'ABC est isocèle en A, avec AB = 6 cm et BC = 5 cm. Quel est son périmètre ?', attendu: 17, revoir: 'remarque',
    },
    {
      id: 't-6-4-8', type: 'choix', consigne: 'Quelle est la première étape pour construire un triangle dont on connaît les trois longueurs ?',
      enonce: 'Trois longueurs connues.',
      choix: ['tracer un angle de 60°', 'tracer l\'un des trois côtés', 'tracer une hauteur'],
      attendu: 'tracer l\'un des trois côtés', revoir: 'propriete',
    },
    {
      id: 't-6-4-9', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Trois angles suffisent pour construire un triangle unique.', attendu: false, revoir: 'remarque',
    },
    {
      id: 't-6-4-10', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Pour construire un triangle avec deux longueurs et un angle, cet angle doit être compris entre les deux côtés connus.',
      attendu: true, revoir: 'propriete',
    },
  ],
};
