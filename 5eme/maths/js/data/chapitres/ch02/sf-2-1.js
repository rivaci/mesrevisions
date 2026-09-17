// Chapitre 2, savoir-faire 1 — La nature d'un angle.
//
// ── D'où vient ce savoir-faire ────────────────────────────────────────────
//
// Du cahier d'Antonin, « Vocabulaire des angles (rappels) » : aigu, obtus,
// droit, plat, nul. C'est un rappel de 6e, mais il sert de socle à tout le
// chapitre — on ne peut pas dire « ces deux angles ne peuvent pas être égaux,
// l'un est aigu et l'autre obtus » sans ce vocabulaire.
//
// ── Une précision par rapport au cahier ──────────────────────────────────
//
// Le cahier note « angle aigu : mesure inférieure à 90° ». C'est STRICTEMENT
// inférieure, et strictement supérieure à 0° : un angle de 90° est droit, un
// angle de 0° est nul, ni l'un ni l'autre n'est aigu. Les bornes ont chacune
// leur item, parce que c'est là que l'erreur se loge.

const figureCroisement = (angle, mesures) => ({ modele: 'croisement', angle, mesures });

export default {
  id: 'sf-2-1',
  titre: 'Reconnaître la nature d\'un angle',
  attendus: [
    'Il nomme un angle d\'après sa mesure : nul, aigu, droit, obtus, plat.',
    'Il sait que les bornes 0°, 90° et 180° ont leur propre nom.',
  ],

  decouvrir: {
    titre: 'Ranger des angles selon leur ouverture',
    texte:
      'Voici cinq mesures d\'angles : 35°, 90°, 120°, 180° et 60°. On les compare à '
      + 'l\'angle droit, qui mesure 90°.',
    lignes: [
      { calcul: 'Plus petits que 90°', resultat: 'plus fermés qu\'un angle droit' },
      { calcul: 'Plus grands que 90°', resultat: 'plus ouverts qu\'un angle droit' },
    ],
    question: 'Combien de ces angles sont plus petits que 90° ? Combien sont entre 90° et 180°, sans les toucher ?',
    champs: [
      { id: 'a', etiquette: 'plus petits que 90°', attendu: 2 },
      { id: 'b', etiquette: 'entre 90° et 180°', attendu: 1 },
    ],
    conclusion:
      '35° et 60° sont **aigus** ; 120° est **obtus**. Les deux autres ont leur propre '
      + 'nom : 90° est un angle **droit**, 180° un angle **plat**.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Le vocabulaire des angles',
      texte:
        '**Angle nul** : il mesure 0°.\n'
        + '**Angle aigu** : il mesure entre 0° et 90°.\n'
        + '**Angle droit** : il mesure 90°.\n'
        + '**Angle obtus** : il mesure entre 90° et 180°.\n'
        + '**Angle plat** : il mesure 180°.',
    },
    {
      type: 'remarque',
      titre: 'Les bornes ont leur propre nom',
      texte:
        'Un angle de 90° n\'est **pas** aigu : il est droit. Un angle de 180° n\'est '
        + '**pas** obtus : il est plat. « Aigu » et « obtus » ne concernent que ce qui '
        + 'est **strictement** entre les bornes.',
    },
    {
      type: 'remarque',
      titre: 'Quand deux droites se coupent',
      texte:
        'Elles forment quatre angles : en général deux aigus et deux obtus. Sur la '
        + 'figure, les angles 2 et 4 sont aigus, les angles 1 et 3 obtus.',
      figure: figureCroisement(60),
    },
    {
      type: 'exemple',
      texte: '35° : aigu   ·   90° : droit   ·   120° : obtus   ·   180° : plat   ·   0° : nul',
    },
  ],

  methode: {
    titre: 'Donner la nature d\'un angle de 135°',
    enonce: 'Quelle est la nature d\'un angle de 135° ?',
    etapes: [
      { texte: 'Je compare à 90° : 135° est plus grand.', note: 'Donc ni nul, ni aigu, ni droit.' },
      { texte: 'Je compare à 180° : 135° est plus petit.', note: 'Donc pas plat.' },
      { texte: '135° est strictement entre 90° et 180° : c\'est un angle obtus.', note: '' },
    ],
    controle:
      'Le contrôle : place la mesure sur une ligne 0 — 90 — 180. Avant 90 : aigu. '
      + 'Après : obtus. Pile sur une borne : nul, droit ou plat.',
  },

  entrainement: [
    // ── Palier 1 : loin des bornes ─────────────────────────────────────────
    {
      // NEUTRE : très loin de toute borne. Contrepoids des items qui suivent,
      // tous posés sur une borne ou tout près.
      id: 'e-2-1-1', type: 'choix', palier: 1, neutre: true, piege: 'nature-angle-confondue',
      consigne: 'Quelle est la nature de cet angle ?', enonce: 'Un angle de 20°.',
      choix: ['aigu', 'droit', 'obtus', 'plat'], attendu: 'aigu',
    },
    {
      id: 'e-2-1-2', type: 'choix', palier: 1, piege: 'nature-angle-confondue',
      consigne: 'Quelle est la nature de cet angle ?', enonce: 'Un angle de 130°.',
      choix: ['aigu', 'droit', 'obtus', 'plat'], attendu: 'obtus',
      fausses: [{ valeur: 'aigu', piege: 'nature-angle-confondue' }],
    },
    {
      id: 'e-2-1-3', type: 'choix', palier: 1, piege: 'nature-angle-confondue',
      consigne: 'Sur la figure, quelle est la nature de l\'angle 2 ?', enonce: 'L\'angle 2 mesure 70°.',
      figure: figureCroisement(70, { 2: '70°' }),
      choix: ['aigu', 'droit', 'obtus', 'plat'], attendu: 'aigu',
      fausses: [{ valeur: 'obtus', piege: 'nature-angle-confondue' }],
    },
    // ── Palier 2 : sur les bornes ─────────────────────────────────────────
    {
      id: 'e-2-1-4', type: 'choix', palier: 2, piege: 'nature-angle-confondue',
      consigne: 'Quelle est la nature de cet angle ?', enonce: 'Un angle de 90°.',
      choix: ['aigu', 'droit', 'obtus', 'plat'], attendu: 'droit',
      fausses: [{ valeur: 'aigu', piege: 'nature-angle-confondue' }],
    },
    {
      id: 'e-2-1-5', type: 'choix', palier: 2, piege: 'nature-angle-confondue',
      consigne: 'Quelle est la nature de cet angle ?', enonce: 'Un angle de 180°.',
      choix: ['aigu', 'droit', 'obtus', 'plat'], attendu: 'plat',
      fausses: [{ valeur: 'obtus', piege: 'nature-angle-confondue' }],
    },
    {
      id: 'e-2-1-6', type: 'choix', palier: 2, piege: 'nature-angle-confondue',
      consigne: 'Sur la figure, quelle est la nature de l\'angle 1 ?', enonce: 'L\'angle 1 mesure 110°.',
      figure: figureCroisement(70, { 1: '110°' }),
      choix: ['aigu', 'droit', 'obtus', 'plat'], attendu: 'obtus',
      fausses: [{ valeur: 'aigu', piege: 'nature-angle-confondue' }],
    },
    {
      id: 'e-2-1-7', type: 'choix', palier: 2, piege: 'nature-angle-confondue',
      consigne: 'Quelle est la nature de cet angle ?', enonce: 'Un angle de 0°.',
      choix: ['nul', 'aigu', 'droit', 'plat'], attendu: 'nul',
      fausses: [{ valeur: 'aigu', piege: 'nature-angle-confondue' }],
    },
    // ── Palier 3 : tout près des bornes, et ce qu'il manque ────────────────
    {
      id: 'e-2-1-8', type: 'choix', palier: 3, piege: 'nature-angle-confondue',
      consigne: 'Quelle est la nature de cet angle ?', enonce: 'Un angle de 179°.',
      choix: ['aigu', 'droit', 'obtus', 'plat'], attendu: 'obtus',
      fausses: [{ valeur: 'plat', piege: 'nature-angle-confondue' }],
    },
    {
      id: 'e-2-1-9', type: 'calcul', palier: 3, piege: 'nature-angle-confondue',
      consigne: 'Combien de degrés manque-t-il à un angle de 65° pour devenir un angle droit ?',
      enonce: 'Un angle de 65°.', attendu: 25,
      fausses: [{ valeur: 115, piege: 'complementaire-supplementaire' }],
    },
    {
      id: 'e-2-1-10', type: 'vraifaux', palier: 3, piege: 'nature-angle-confondue',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Un angle obtus est plus ouvert qu\'un angle droit.',
      attendu: true,
    },
  ],

  problemes: [
    {
      id: 'p-2-1-1',
      enonce:
        'Les aiguilles d\'une horloge tournent d\'un tour complet, 360°, en 12 heures. '
        + 'Chaque heure correspond donc à 30°.',
      questions: [
        { texte: 'Quel angle forment les aiguilles à 3 h ?', attendu: 90, unite: '°' },
        { texte: 'Quel angle forment-elles à 6 h ?', attendu: 180, unite: '°' },
      ],
    },
    {
      id: 'p-2-1-2',
      enonce: 'Une pizza ronde (360°) est coupée en 8 parts égales, depuis le centre.',
      questions: [
        { texte: 'Quel angle mesure une part, au centre ?', attendu: 45, unite: '°' },
        { texte: 'Quel angle mesurent deux parts côte à côte ?', attendu: 90, unite: '°' },
      ],
    },
    {
      id: 'p-2-1-3',
      enonce: 'Un éventail s\'ouvre d\'un angle de 150°.',
      questions: [
        { texte: 'De combien de degrés dépasse-t-il un angle droit ?', attendu: 60, unite: '°' },
        { texte: 'Combien de degrés lui manque-t-il pour former un angle plat ?', attendu: 30, unite: '°' },
      ],
    },
    {
      id: 'p-2-1-4',
      enonce: 'Les aiguilles d\'une horloge forment un angle de 30° par heure d\'écart.',
      questions: [
        { texte: 'Quel angle forment-elles à 1 h ?', attendu: 30, unite: '°' },
        { texte: 'Quel angle forment-elles à 5 h ?', attendu: 150, unite: '°' },
      ],
    },
    {
      id: 'p-2-1-5',
      enonce: 'Un angle aigu mesure 38°.',
      questions: [
        { texte: 'Combien faut-il lui ajouter pour obtenir un angle droit ?', attendu: 52, unite: '°' },
        { texte: 'Combien faut-il lui ajouter pour obtenir un angle plat ?', attendu: 142, unite: '°' },
      ],
    },
  ],

  test: [
    {
      id: 't-2-1-1', type: 'choix', consigne: 'Quelle est la nature de cet angle ?', enonce: 'Un angle de 45°.',
      choix: ['aigu', 'droit', 'obtus', 'plat'], attendu: 'aigu', revoir: 'definition',
    },
    {
      id: 't-2-1-2', type: 'choix', consigne: 'Quelle est la nature de cet angle ?', enonce: 'Un angle de 150°.',
      choix: ['aigu', 'droit', 'obtus', 'plat'], attendu: 'obtus', revoir: 'definition',
    },
    {
      id: 't-2-1-3', type: 'choix', consigne: 'Quelle est la nature de cet angle ?', enonce: 'Un angle de 90°.',
      choix: ['aigu', 'droit', 'obtus', 'plat'], attendu: 'droit', revoir: 'remarque',
    },
    {
      id: 't-2-1-4', type: 'choix', consigne: 'Quelle est la nature de cet angle ?', enonce: 'Un angle de 180°.',
      choix: ['aigu', 'droit', 'obtus', 'plat'], attendu: 'plat', revoir: 'remarque',
    },
    {
      id: 't-2-1-5', type: 'choix', consigne: 'Quelle est la nature de cet angle ?', enonce: 'Un angle de 91°.',
      choix: ['aigu', 'droit', 'obtus', 'plat'], attendu: 'obtus', revoir: 'remarque',
    },
    {
      id: 't-2-1-6', type: 'choix', consigne: 'Quelle est la nature de cet angle ?', enonce: 'Un angle de 0°.',
      choix: ['nul', 'aigu', 'droit', 'plat'], attendu: 'nul', revoir: 'definition',
    },
    {
      id: 't-2-1-7', type: 'choix', consigne: 'Sur la figure, quelle est la nature de l\'angle 3 ?', enonce: 'L\'angle 3 mesure 125°.',
      figure: figureCroisement(55, { 3: '125°' }),
      choix: ['aigu', 'droit', 'obtus', 'plat'], attendu: 'obtus', revoir: 'remarque',
    },
    {
      id: 't-2-1-8', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Un angle de 90° est un angle aigu.', attendu: false, revoir: 'remarque',
    },
    { id: 't-2-1-9', type: 'calcul', consigne: 'Combien manque-t-il à un angle de 40° pour devenir un angle droit ?', enonce: 'Un angle de 40°.', attendu: 50, revoir: 'definition' },
    { id: 't-2-1-10', type: 'calcul', consigne: 'Combien manque-t-il à un angle de 40° pour devenir un angle plat ?', enonce: 'Un angle de 40°.', attendu: 140, revoir: 'definition' },
  ],
};
