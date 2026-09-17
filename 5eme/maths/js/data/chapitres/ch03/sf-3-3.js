// Chapitre 3, savoir-faire 3 — Comparer et ranger des nombres relatifs.
//
// ── D'où vient ce savoir-faire ────────────────────────────────────────────
//
// Du point « comparer, ranger (ordre croissant et décroissant) » de la liste
// de la professeure.
//
// ── Pourquoi autant d'items neutres ──────────────────────────────────────
//
// L'erreur type — « −7 > −3 parce que 7 > 3 » — a une contrefaçon : l'élève
// qui a compris « avec des négatifs, c'est à l'envers » et qui retourne
// TOUTES les comparaisons. Il réussit −8 … −5, et rate −2 … 4. Les items
// neutres sont ceux où la lecture des chiffres donne la bonne réponse : ils
// démasquent la règle retournée, qui n'est pas plus juste que l'erreur.
//
// Les options des rangements sont placées à la main : l'application ne les
// mélange pas, la bonne réponse change donc de place d'un item à l'autre.

const droite = (min, max, pas, points, ecrites) => ({ modele: 'droite', min, max, pas, points, ecrites });

export default {
  id: 'sf-3-3',
  titre: 'Comparer et ranger des nombres relatifs',
  attendus: [
    'Il compare deux nombres relatifs, y compris deux nombres négatifs.',
    'Il range une liste de relatifs dans l\'ordre croissant ou décroissant.',
  ],

  decouvrir: {
    titre: 'Où fait-il le plus froid ?',
    texte:
      'Le même matin, trois villes relèvent leur température : Moscou −7 °C, Paris 2 °C, '
      + 'Berlin −3 °C. On les place sur une droite graduée : M pour Moscou, P pour Paris, '
      + 'B pour Berlin.',
    figure: droite(-8, 4, 1, { M: -7, B: -3, P: 2 }, [-5, 0]),
    question: 'Quelle est la température la plus basse ? Et la plus haute ?',
    champs: [
      { id: 'a', etiquette: 'la plus basse, en °C', attendu: -7 },
      { id: 'b', etiquette: 'la plus haute, en °C', attendu: 2 },
    ],
    conclusion:
      'À Moscou, il fait 7 degrés sous zéro : c\'est plus froid qu\'à Berlin, 3 degrés sous '
      + 'zéro. Donc **−7 < −3**, même si 7 est plus grand que 3.\n'
      + 'Sur la droite graduée, M est **à gauche** de B : plus un nombre est à gauche, '
      + 'plus il est petit.',
  },

  cours: [
    {
      type: 'propriete',
      titre: 'Comparer avec la droite graduée',
      texte:
        'Sur une droite graduée orientée vers la droite, **le plus petit** de deux nombres '
        + 'est celui qui est **le plus à gauche**. On en tire trois règles :\n'
        + '• un nombre **négatif** est plus petit qu\'un nombre **positif** : −8 < 3 ;\n'
        + '• entre deux **positifs**, le plus petit est le plus proche de zéro : 2 < 5 ;\n'
        + '• entre deux **négatifs**, le plus petit est le **plus loin** de zéro : −5 < −2.',
      figure: droite(-6, 6, 1, { A: -5, B: -2 }, [-5, 0, 5]),
    },
    {
      type: 'definition',
      titre: 'Ordre croissant, ordre décroissant',
      texte:
        'Ranger dans l\'**ordre croissant**, c\'est aller du plus petit au plus grand : on lit '
        + 'la droite graduée de gauche à droite, et on écrit avec des **<**.\n'
        + 'Dans l\'**ordre décroissant**, on va du plus grand au plus petit, avec des **>**.\n'
        + '**<** se lit « est inférieur à », **>** « est supérieur à ».',
    },
    {
      type: 'remarque',
      titre: 'Le piège des négatifs',
      texte:
        'Entre −7 et −3, on a envie de dire que −7 est le plus grand, parce que 7 > 3. '
        + 'C\'est l\'inverse : **−7 < −3**. Pense à la température : −7 °C, c\'est plus '
        + 'froid que −3 °C.',
    },
    {
      type: 'exemple',
      texte:
        'Croissant : −6 < −2,5 < 0 < 1 < 4   ·   Décroissant : 4 > 1 > 0 > −2,5 > −6',
    },
  ],

  methode: {
    titre: 'Ranger −4 ; 3 ; −1,5 ; 0 ; −6 dans l\'ordre croissant',
    enonce: 'Range dans l\'ordre croissant : −4 ; 3 ; −1,5 ; 0 ; −6.',
    etapes: [
      {
        texte: 'Je sépare les négatifs du reste : −4, −1,5 et −6 d\'un côté ; 0 et 3 de l\'autre.',
        note: 'Les négatifs viendront tous en premier.',
      },
      {
        texte: 'Je range les négatifs : le plus loin de zéro est le plus petit. −6 < −4 < −1,5.',
        note: 'C\'est l\'étape où l\'erreur se loge : 6 est le plus grand chiffre, mais −6 est le plus petit nombre.',
      },
      { texte: 'Je range le reste : 0 < 3.', note: '' },
      { texte: 'J\'assemble : −6 < −4 < −1,5 < 0 < 3.', note: '' },
    ],
    controle:
      'Le contrôle : place les nombres à main levée sur une droite graduée. L\'ordre '
      + 'croissant se lit de gauche à droite.',
  },

  entrainement: [
    // ── Palier 1 : des entiers ─────────────────────────────────────────────
    {
      // NEUTRE : un négatif et un positif dont les chiffres vont dans le même
      // sens que les nombres. Celui qui retourne tout se trompe ici.
      id: 'e-3-3-1', type: 'comparer', palier: 1, neutre: true,
      consigne: 'Compare ces deux nombres.', enonce: '-2 \\ldots 4', attendu: '<',
    },
    {
      id: 'e-3-3-2', type: 'comparer', palier: 1, piege: 'negatifs-compares-comme-positifs',
      consigne: 'Compare ces deux nombres.', enonce: '-8 \\ldots -5', attendu: '<',
      fausses: [{ valeur: '>', piege: 'negatifs-compares-comme-positifs' }],
    },
    {
      id: 'e-3-3-3', type: 'comparer', palier: 1, piege: 'negatifs-compares-comme-positifs',
      consigne: 'Compare ces deux nombres.', enonce: '6 \\ldots -9', attendu: '>',
      fausses: [{ valeur: '<', piege: 'negatifs-compares-comme-positifs' }],
    },
    {
      id: 'e-3-3-4', type: 'comparer', palier: 1, piege: 'negatifs-compares-comme-positifs',
      consigne: 'Compare ces deux nombres.', enonce: '-1 \\ldots -4', attendu: '>',
      fausses: [{ valeur: '<', piege: 'negatifs-compares-comme-positifs' }],
    },
    // ── Palier 2 : décimaux, zéro, le plus petit et le plus grand ─────────
    {
      id: 'e-3-3-5', type: 'comparer', palier: 2, piege: 'negatifs-compares-comme-positifs',
      consigne: 'Compare ces deux nombres.', enonce: '-2{,}5 \\ldots -2{,}3', attendu: '<',
      fausses: [{ valeur: '>', piege: 'negatifs-compares-comme-positifs' }],
    },
    {
      id: 'e-3-3-6', type: 'comparer', palier: 2, piege: 'negatifs-compares-comme-positifs',
      consigne: 'Compare ces deux nombres.', enonce: '0 \\ldots -3{,}5', attendu: '>',
      fausses: [{ valeur: '<', piege: 'negatifs-compares-comme-positifs' }],
    },
    {
      // NEUTRE : deux positifs.
      id: 'e-3-3-7', type: 'comparer', palier: 2, neutre: true,
      consigne: 'Compare ces deux nombres.', enonce: '3{,}7 \\ldots 3{,}07', attendu: '>',
    },
    {
      id: 'e-3-3-8', type: 'trous', palier: 2, piege: 'negatifs-compares-comme-positifs',
      consigne: 'Parmi ces nombres, donne le plus petit et le plus grand.',
      enonce: '-3 \\quad ; \\quad 1{,}5 \\quad ; \\quad -8 \\quad ; \\quad 0 \\quad ; \\quad -0{,}5',
      champs: [
        { id: 'a', etiquette: 'le plus petit', attendu: -8 },
        { id: 'b', etiquette: 'le plus grand', attendu: 1.5 },
      ],
      // −0,5 donné pour le plus petit : 0,5 est le plus petit chiffre.
      fausses: [{ valeur: -0.5, piege: 'negatifs-compares-comme-positifs' }],
    },
    // ── Palier 3 : ranger, et réfuter ──────────────────────────────────────
    {
      id: 'e-3-3-9', type: 'choix', palier: 3, piege: 'negatifs-compares-comme-positifs',
      consigne: 'Quel est le bon rangement dans l\'ordre croissant ?',
      enonce: '-5 \\quad ; \\quad 2 \\quad ; \\quad -1 \\quad ; \\quad -7',
      choix: ['−7 < −5 < −1 < 2', '−1 < −5 < −7 < 2', '−1 < 2 < −5 < −7'],
      attendu: '−7 < −5 < −1 < 2',
      fausses: [
        { valeur: '−1 < −5 < −7 < 2', piege: 'negatifs-compares-comme-positifs' },
        // Rangés par distance à zéro : les signes ont disparu.
        { valeur: '−1 < 2 < −5 < −7', piege: 'signe-oublie' },
      ],
    },
    {
      id: 'e-3-3-10', type: 'choix', palier: 3, piege: 'croissant-decroissant-confondus',
      consigne: 'Quel est le bon rangement dans l\'ordre décroissant ?',
      enonce: '-2{,}5 \\quad ; \\quad 3 \\quad ; \\quad 0 \\quad ; \\quad -4',
      choix: ['3 > 0 > −4 > −2,5', '−4 < −2,5 < 0 < 3', '3 > 0 > −2,5 > −4'],
      attendu: '3 > 0 > −2,5 > −4',
      fausses: [
        { valeur: '3 > 0 > −4 > −2,5', piege: 'negatifs-compares-comme-positifs' },
        { valeur: '−4 < −2,5 < 0 < 3', piege: 'croissant-decroissant-confondus' },
      ],
    },
    {
      id: 'e-3-3-11', type: 'vraifaux', palier: 3, piege: 'zero-et-strictement',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Tout nombre strictement négatif est plus petit que tout nombre positif.',
      attendu: true,
    },
    {
      id: 'e-3-3-12', type: 'vraifaux', palier: 3, piege: 'negatifs-compares-comme-positifs',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Entre deux nombres négatifs, le plus grand est celui qui est le plus loin de zéro.',
      attendu: false,
      contreExemple: {
        invite:
          'Donne deux nombres négatifs différents : le plus loin de zéro sera toujours le plus petit.',
        champs: [{ id: 'a', etiquette: 'premier nombre négatif' }, { id: 'b', etiquette: 'second nombre négatif' }],
        valide: (a, b) => a < 0 && b < 0 && a !== b,
        exemple: '−8 et −2 : −8 est le plus loin de zéro, et pourtant −8 < −2.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-3-3-1',
      enonce:
        'Voici les températures les plus basses relevées cet hiver dans quatre villes : '
        + 'Lyon −6 °C, Brest 1 °C, Strasbourg −11 °C, Lille −4 °C.',
      questions: [
        { texte: 'Quelle est la température la plus basse ?', attendu: -11, unite: '°C' },
        { texte: 'Quelle est la température la plus haute ?', attendu: 1, unite: '°C' },
        { texte: 'Dans combien de ces villes a-t-il fait moins de −5 °C ?', attendu: 2 },
      ],
    },
    {
      id: 'p-3-3-2',
      enonce:
        'Quatre plongeurs sont repérés par leur altitude, en mètres : Ana −12, Bilal −7,5, '
        + 'Chloé −20, Dario −9.',
      questions: [
        { texte: 'Quelle est l\'altitude du plongeur le plus profond ?', attendu: -20, unite: 'm' },
        { texte: 'Quelle est l\'altitude du plongeur le plus proche de la surface ?', attendu: -7.5, unite: 'm' },
        { texte: 'Combien de plongeurs sont plus profonds que Dario ?', attendu: 2 },
      ],
    },
    {
      id: 'p-3-3-3',
      enonce:
        'Voici le solde d\'un compte à la fin de chaque mois, en euros : janvier −45, '
        + 'février 20, mars −60, avril −15.',
      questions: [
        { texte: 'Quel est le solde le plus bas ?', attendu: -60, unite: '€' },
        { texte: 'Pendant combien de ces mois le solde est-il négatif ?', attendu: 3 },
      ],
    },
    {
      id: 'p-3-3-4',
      enonce: 'Un nombre entier est strictement plus grand que −4 et strictement plus petit que −1.',
      questions: [
        { texte: 'Combien de nombres entiers conviennent ?', attendu: 2 },
        { texte: 'Quel est le plus petit d\'entre eux ?', attendu: -3 },
      ],
    },
    {
      id: 'p-3-3-5',
      enonce:
        'Dans un jeu, cinq joueurs ont ces scores : Emma −3, Farid 5, Gaëlle −8, Hugo 0, '
        + 'Inès −1. On les classe du plus grand score au plus petit.',
      questions: [
        { texte: 'Quel score est en tête du classement ?', attendu: 5 },
        { texte: 'Quel score arrive en troisième position ?', attendu: -1 },
        { texte: 'Quel score arrive en dernière position ?', attendu: -8 },
      ],
    },
  ],

  test: [
    { id: 't-3-3-1', type: 'comparer', consigne: 'Compare ces deux nombres.', enonce: '-6 \\ldots -2', attendu: '<', revoir: 'propriete' },
    { id: 't-3-3-2', type: 'comparer', consigne: 'Compare ces deux nombres.', enonce: '-10 \\ldots 1', attendu: '<', revoir: 'propriete' },
    { id: 't-3-3-3', type: 'comparer', consigne: 'Compare ces deux nombres.', enonce: '-0{,}5 \\ldots -5', attendu: '>', revoir: 'propriete' },
    { id: 't-3-3-4', type: 'comparer', consigne: 'Compare ces deux nombres.', enonce: '0 \\ldots -1{,}2', attendu: '>', revoir: 'propriete' },
    { id: 't-3-3-5', type: 'comparer', consigne: 'Compare ces deux nombres.', enonce: '-3{,}4 \\ldots -3{,}6', attendu: '>', revoir: 'remarque' },
    {
      id: 't-3-3-6', type: 'choix', consigne: 'Quel est le bon rangement dans l\'ordre croissant ?',
      enonce: '4 \\quad ; \\quad -9 \\quad ; \\quad -2 \\quad ; \\quad 0',
      choix: ['−2 < −9 < 0 < 4', '−9 < −2 < 0 < 4', '4 > 0 > −2 > −9'],
      attendu: '−9 < −2 < 0 < 4', revoir: 'definition',
    },
    {
      id: 't-3-3-7', type: 'choix', consigne: 'Quel est le bon rangement dans l\'ordre décroissant ?',
      enonce: '-1{,}5 \\quad ; \\quad -6 \\quad ; \\quad 2 \\quad ; \\quad -0{,}5',
      choix: ['2 > −0,5 > −1,5 > −6', '2 > −6 > −1,5 > −0,5', '−6 < −1,5 < −0,5 < 2'],
      attendu: '2 > −0,5 > −1,5 > −6', revoir: 'definition',
    },
    {
      id: 't-3-3-8', type: 'trous', consigne: 'Parmi ces nombres, donne le plus petit et le plus grand.',
      enonce: '-4{,}5 \\quad ; \\quad -12 \\quad ; \\quad 3 \\quad ; \\quad -0{,}1',
      champs: [
        { id: 'a', etiquette: 'le plus petit', attendu: -12 },
        { id: 'b', etiquette: 'le plus grand', attendu: 3 },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-3-3-9', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: '−100 est plus petit que −1.', attendu: true, revoir: 'propriete',
    },
    {
      id: 't-3-3-10', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Entre deux nombres négatifs, le plus petit est le plus proche de zéro.',
      attendu: false, revoir: 'remarque',
    },
  ],
};
