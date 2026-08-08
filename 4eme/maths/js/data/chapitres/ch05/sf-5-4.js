// Chapitre 5, savoir-faire 4 — Utiliser une échelle.
//
// Une échelle, c'est un coefficient de proportionnalité déguisé. Ce qui se perd
// n'est presque jamais le calcul : c'est le SENS (multiplier ou diviser) et
// l'UNITÉ (le plan est en centimètres, la réalité en mètres ou en kilomètres).
// Les deux se contrôlent par le même geste — l'ordre de grandeur — et c'est ce
// geste que le savoir-faire installe.
//
// ── Pourquoi l'ordre de grandeur revient partout ──────────────────────────
//
// Sur les autres savoir-faire du chapitre, un résultat faux reste crédible.
// Ici non : une maison de 3 cm ou un couloir de 180 km se voient à l'œil nu.
// C'est le seul endroit du programme où l'élève dispose d'un vrai détecteur
// d'erreur, indépendant du calcul qu'il vient de faire. La méthode, les deux
// « plausible » et le contrôle de chaque item s'appuient dessus.
//
// ── Les deux items neutres ────────────────────────────────────────────────
//
// Le périmètre (item 6) et l'absence de conversion (item 3) empêchent deux
// contre-règles symétriques de s'installer : « dès qu'on parle de figure, il
// faut se méfier de la proportionnalité » et « il faut toujours convertir ».
// Les deux seraient aussi coûteuses que les pièges qu'elles remplacent.

export default {
  id: 'sf-5-4',
  titre: 'Utiliser une échelle',
  attendus: [
    'Il utilise une échelle pour passer d\'une longueur sur un plan à la longueur réelle, et inversement.',
    'Il vérifie la vraisemblance d\'un résultat, notamment en estimant son ordre de grandeur.',
  ],

  // On ne donne pas l'échelle : on la fait apparaître comme le rapport constant
  // entre deux colonnes déjà remplies. L'élève trouve « 200 fois » avant que le
  // mot « échelle » soit prononcé — et il le trouve en cherchant ce que vaut
  // 1 cm, ce qui est exactement la définition qu'on écrira ensuite.
  decouvrir: {
    titre: 'Ce que vaut un centimètre',
    texte:
      'Voici trois longueurs relevées sur le plan d\'un appartement, à côté des '
      + 'longueurs que le propriétaire a mesurées chez lui, mètre à la main.',
    lignes: [
      { calcul: 'le placard : 0,5 cm sur le plan', resultat: '1 m en réalité' },
      { calcul: 'le salon : 3 cm sur le plan', resultat: '6 m en réalité' },
      { calcul: 'le couloir : 5 cm sur le plan', resultat: '10 m en réalité' },
    ],
    question:
      'Chaque longueur réelle s\'obtient de la même façon à partir du plan. '
      + 'Que représente 1 cm du plan ? Et combien mesure une chambre longue de '
      + '4 cm sur le plan ?',
    champs: [
      { id: 'a', etiquette: '1 cm sur le plan représente … m', attendu: 2 },
      { id: 'b', etiquette: 'la chambre de 4 cm mesure … m', attendu: 8 },
    ],
    conclusion:
      'Une longueur réelle vaut toujours **2 m** pour 1 cm de plan, c\'est-à-dire '
      + '**200 cm pour 1 cm**. On dit que le plan est à l\'**échelle 1/200**. '
      + 'Retiens le sens avant la formule : la réalité est **plus grande** que le plan.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Échelle',
      texte:
        'L\'**échelle** d\'un plan ou d\'une carte est le quotient :\n'
        + 'longueur sur le plan ÷ longueur réelle, les deux exprimées dans la '
        + '**même unité**.\n'
        + 'Une échelle de 1/200 signifie que **1 cm sur le plan représente 200 cm '
        + 'en réalité**.',
    },
    {
      type: 'propriete',
      titre: 'Passer du plan à la réalité, et inversement',
      texte:
        'Les longueurs sur le plan et les longueurs réelles sont '
        + '**proportionnelles**.\n'
        + 'Du **plan vers la réalité** : on **multiplie** par le dénominateur de '
        + 'l\'échelle.\n'
        + 'De la **réalité vers le plan** : on **divise** par ce même dénominateur.',
    },
    {
      type: 'remarque',
      titre: 'Les unités d\'abord',
      texte:
        'Une échelle n\'a pas d\'unité : c\'est le quotient de deux longueurs '
        + 'écrites dans la même unité. Le calcul se fait donc en centimètres, et '
        + 'la conversion vient **à la fin** :\n'
        + '100 cm = 1 m   ·   100 000 cm = 1 km.\n'
        + 'Oublier cette dernière ligne donne un résultat au bon chiffre et à la '
        + 'mauvaise taille — l\'erreur la plus fréquente du chapitre.',
    },
    {
      type: 'remarque',
      titre: 'Les longueurs, oui ; les aires, non',
      texte:
        'Toutes les **longueurs** sont multipliées par le même nombre : un '
        + 'périmètre aussi, puisque c\'est une longueur.\n'
        + 'Mais une **aire** ne suit pas : si les longueurs sont multipliées par '
        + '100, l\'aire l\'est par 100 × 100 = 10 000. Pour une aire, calcule les '
        + 'longueurs réelles d\'abord, l\'aire ensuite.',
    },
    {
      type: 'exemple',
      texte:
        'Échelle 1/200. Un mur mesure 7 cm sur le plan : en réalité 7 × 200 = 1 400 cm, '
        + 'soit 14 m.\n'
        + 'Un mur réel de 9 m, soit 900 cm : sur le plan 900 ÷ 200 = 4,5 cm.',
    },
  ],

  // La méthode prend exprès un cas où la réponse doit changer d'unité : c'est
  // là que la rédaction ligne à ligne évite l'erreur, en séparant le calcul de
  // la conversion. Les fusionner de tête est précisément ce qui la produit.
  methode: {
    titre: 'Du plan à la réalité, en trois lignes',
    enonce: 'Un plan est à l\'échelle 1/250. Sur ce plan, un couloir mesure 6 cm. Quelle est sa longueur réelle, en mètres ?',
    etapes: [
      {
        texte: 'L\'échelle 1/250 veut dire que 1 cm sur le plan représente 250 cm en réalité.',
        note: 'Le plan est le petit, la réalité le grand. C\'est le sens à poser avant tout calcul.',
      },
      {
        texte: 'Je vais du plan vers la réalité, donc je multiplie : 6 × 250 = 1 500.',
        note: 'Le résultat est en centimètres, puisque j\'ai travaillé en centimètres.',
      },
      {
        texte: 'Je convertis : 1 500 cm = 15 m.',
        note: 'La question demandait des mètres. On divise par 100.',
      },
      {
        texte: 'Le couloir mesure 15 m.',
        note: '',
      },
    ],
    controle:
      'Le contrôle : deux questions, dans cet ordre. Le sens d\'abord — la réalité '
      + 'est-elle plus grande que le plan ? Si ton résultat est plus petit que 6 cm, '
      + 'tu as divisé au lieu de multiplier. La taille ensuite — un couloir de 15 m '
      + 'existe, un couloir de 15 cm ou de 1,5 km n\'existe pas. Ces deux questions '
      + 'attrapent presque toutes les erreurs d\'échelle.',
  },

  entrainement: [
    {
      id: 'e-5-4-1', type: 'calcul', palier: 1, piege: 'echelle-inversee',
      consigne: 'Le plan est à l\'échelle 1/200. Un mur y mesure 7 cm. Calcule sa longueur réelle, en cm.',
      enonce: '\\text{échelle } \\dfrac{1}{200} \\qquad \\text{plan} : 7\\text{ cm}',
      attendu: 1400,
      fausses: [
        { valeur: 0.035, piege: 'echelle-inversee' },
        { valeur: 207, piege: 'traitement-additif' },
      ],
    },
    {
      id: 'e-5-4-2', type: 'calcul', palier: 1, piege: 'unites-non-converties',
      consigne: 'Le plan est à l\'échelle 1/500. Une allée y mesure 12 cm. Calcule sa longueur réelle, en m.',
      enonce: '\\text{échelle } \\dfrac{1}{500} \\qquad \\text{plan} : 12\\text{ cm}',
      attendu: 60,
      fausses: [
        { valeur: 6000, piege: 'unites-non-converties' },
        { valeur: 0.024, piege: 'echelle-inversee' },
      ],
    },
    {
      // NEUTRE pour « unités non converties » : la question et le plan sont tous
      // les deux en centimètres, donc il n'y a rien à convertir. Sans cet item,
      // « après avoir multiplié, je divise toujours par 100 » deviendrait un
      // réflexe aveugle. L'item n'est pas plus facile pour autant : multiplier
      // 3,5 par 50 demande le même soin que les autres.
      id: 'e-5-4-3', type: 'calcul', palier: 1, neutre: true, piege: 'unites-non-converties',
      consigne: 'Le plan d\'un meuble est à l\'échelle 1/50. Le tiroir y mesure 3,5 cm. Calcule sa longueur réelle, en cm.',
      enonce: '\\text{échelle } \\dfrac{1}{50} \\qquad \\text{plan} : 3{,}5\\text{ cm}',
      attendu: 175,
      fausses: [
        { valeur: 0.07, piege: 'echelle-inversee' },
        { valeur: 53.5, piege: 'traitement-additif' },
      ],
    },
    {
      // Le sens s'inverse : réalité → plan, donc on divise. C'est l'item où le
      // piège « échelle inversée » est le plus tentant, parce que le réflexe
      // installé par les trois précédents est de multiplier.
      id: 'e-5-4-4', type: 'calcul', palier: 2, piege: 'echelle-inversee',
      consigne: 'Le plan est à l\'échelle 1/250. Un mur réel mesure 20 m. Calcule sa longueur sur le plan, en cm.',
      enonce: '\\text{échelle } \\dfrac{1}{250} \\qquad \\text{réalité} : 20\\text{ m}',
      attendu: 8,
      fausses: [
        { valeur: 5000, piege: 'echelle-inversee' },
        { valeur: 0.08, piege: 'unites-non-converties' },
      ],
    },
    {
      // Les deux sens dans le même item : un trou se remplit en multipliant,
      // l'autre en divisant. Impossible d'y répondre avec une seule opération
      // apprise par cœur.
      id: 'e-5-4-5', type: 'trous', palier: 2, piege: 'echelle-inversee',
      consigne: 'Le plan est à l\'échelle 1/400. Complète les deux longueurs manquantes, en cm.',
      enonce:
        '\\text{échelle } \\dfrac{1}{400} \\qquad \\text{plan } 6\\text{ cm} \\to '
        + '\\text{réalité } \\square\\text{ cm} \\qquad \\text{plan } \\square\\text{ cm} \\to '
        + '\\text{réalité } 1600\\text{ cm}',
      champs: [
        { id: 'a', attendu: 2400 },
        { id: 'b', attendu: 4 },
      ],
      fausses: [
        { valeur: 0.015, piege: 'echelle-inversee' },
        { valeur: 640000, piege: 'echelle-inversee' },
      ],
    },
    {
      // NEUTRE pour l'illusion de linéarité : un périmètre EST une longueur,
      // donc il se multiplie bien par 200, sans mise au carré. Sans cet item,
      // l'élève retiendrait « dès qu'on parle d'une figure, il faut multiplier
      // deux fois » — la contre-règle est aussi fausse que le piège. Il n'est
      // pas plus facile : la conversion cm → m reste à faire.
      id: 'e-5-4-6', type: 'calcul', palier: 2, neutre: true, piege: 'illusion-de-linearite',
      consigne: 'Le plan est à l\'échelle 1/200. Une pièce rectangulaire a un périmètre de 16 cm sur le plan. Calcule son périmètre réel, en m.',
      enonce: '\\text{échelle } \\dfrac{1}{200} \\qquad \\text{périmètre sur le plan} : 16\\text{ cm}',
      attendu: 32,
      fausses: [
        { valeur: 3200, piege: 'unites-non-converties' },
        { valeur: 0.08, piege: 'echelle-inversee' },
      ],
    },
    {
      id: 'e-5-4-7', type: 'plausible', palier: 2, piege: 'echelle-inversee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{échelle } \\dfrac{1}{25000} \\qquad \\text{carte} : 8\\text{ cm} '
        + '\\quad \\Rightarrow \\quad \\text{réalité} : 2\\text{ km}',
      attendu: true,
      explication:
        '8 × 25 000 = 200 000 cm, soit 2 000 m, donc 2 km. Le repère à garder pour '
        + 'les cartes de randonnée : au 1/25 000, **4 cm valent 1 km**.',
    },
    {
      id: 'e-5-4-8', type: 'plausible', palier: 2, piege: 'unites-non-converties',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{échelle } \\dfrac{1}{200} \\qquad \\text{plan} : 6\\text{ cm} '
        + '\\quad \\Rightarrow \\quad \\text{réalité} : 12\\text{ cm}',
      attendu: false,
      explication:
        '6 × 200 = 1 200 cm, soit **12 m**. Le nombre est bon, l\'unité ne l\'est '
        + 'pas — et l\'absurdité se voit sans calcul : 12 cm serait deux fois le '
        + 'plan, alors que la réalité doit être 200 fois plus grande.',
    },
    {
      id: 'e-5-4-9', type: 'corriger', palier: 3, piege: 'echelle-inversee',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{échelle } \\dfrac{1}{2000} \\qquad \\text{plan} : 9\\text{ cm}',
      lignes: [
        { texte: 'Sur ce plan, 1 cm représente 2 000 cm en réalité.', fausse: false },
        { texte: 'La longueur réelle vaut donc 9 ÷ 2 000 = 0,0045 cm.', fausse: true },
        { texte: 'Soit 0,000045 m.', fausse: false },
      ],
      explication:
        'La première ligne dit la bonne chose. C\'est la deuxième qui renverse le '
        + 'sens : pour aller du plan à la réalité, on **multiplie**. 9 × 2 000 = 18 000 cm, '
        + 'soit 180 m. La troisième ligne convertit correctement, mais un nombre déjà '
        + 'faux — et un résultat plus petit que le plan aurait dû alerter dès la '
        + 'deuxième ligne.',
    },
    {
      id: 'e-5-4-10', type: 'vraifaux', palier: 3, piege: 'illusion-de-linearite',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Sur le plan d\'un meuble à l\'échelle 1/10, une surface de 3 cm² sur le plan mesure 30 cm² en réalité.',
      attendu: false,
      contreExemple: {
        invite:
          'Dessine un carré sur le plan et choisis la longueur de son côté, en cm. '
          + 'Donne ensuite l\'aire réelle de ce carré, en cm².',
        champs: [
          { id: 'a', etiquette: 'côté du carré sur le plan, en cm' },
          { id: 'b', etiquette: 'aire réelle de ce carré, en cm²' },
        ],
        // On vérifie la PROPRIÉTÉ « l'aire est multipliée par 10 × 10 » pour le
        // carré que l'élève a choisi, et on exige qu'elle diffère du résultat
        // linéaire (× 10). N'importe quel côté convient : 1, 2, 7, 0,5…
        valide: (a, b) => a > 0
          && Math.abs(b - 100 * a * a) < 1e-6
          && Math.abs(b - 10 * a * a) > 1e-6,
        exemple:
          'Avec un carré de 2 cm de côté : son aire vaut 4 cm² sur le plan. En '
          + 'réalité le côté mesure 20 cm, donc l\'aire vaut 20 × 20 = 400 cm². '
          + 'L\'aire est multipliée par 100, pas par 10.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-5-4-1',
      enonce:
        'Le plan d\'un appartement est à l\'échelle 1/100. Sur ce plan, le séjour '
        + 'est un rectangle de 7 cm de long et 4,5 cm de large.',
      questions: [
        { texte: 'Quelle est la longueur réelle du séjour ?', attendu: 7, unite: 'm' },
        { texte: 'Quelle est sa largeur réelle ?', attendu: 4.5, unite: 'm' },
        { texte: 'Quelle est son aire réelle ?', attendu: 31.5, unite: 'm²' },
      ],
    },
    {
      id: 'p-5-4-2',
      enonce:
        'Sur une carte de randonnée à l\'échelle 1/25 000, deux refuges sont '
        + 'séparés par 14 cm en ligne droite.',
      questions: [
        { texte: 'Quelle distance réelle sépare les deux refuges ?', attendu: 3.5, unite: 'km' },
        { texte: 'Un sentier long de 6 km en réalité est représenté par un trait de quelle longueur ?', attendu: 24, unite: 'cm' },
      ],
    },
    {
      id: 'p-5-4-3',
      enonce:
        'Une maquette de voilier est construite à l\'échelle 1/40. Sur la maquette, '
        + 'le mât mesure 30 cm.',
      questions: [
        { texte: 'Quelle est la hauteur réelle du mât ?', attendu: 12, unite: 'm' },
        { texte: 'La coque du vrai voilier mesure 10 m. Quelle est la longueur de la coque de la maquette ?', attendu: 25, unite: 'cm' },
      ],
    },
    {
      id: 'p-5-4-4',
      enonce:
        'Le plan d\'une cour de récréation est à l\'échelle 1/500. Sur le plan, la '
        + 'cour est un rectangle de 8 cm de long et 5 cm de large.',
      questions: [
        { texte: 'Quelle est la longueur réelle de la cour ?', attendu: 40, unite: 'm' },
        { texte: 'Quel est son périmètre réel ?', attendu: 130, unite: 'm' },
        { texte: 'Quelle est son aire réelle ?', attendu: 1000, unite: 'm²' },
      ],
    },
    {
      id: 'p-5-4-5',
      enonce:
        'Sur un plan sans échelle indiquée, un terrain de basket est dessiné avec '
        + '14 cm de long. Le vrai terrain mesure 28 m de long.',
      questions: [
        { texte: 'Combien de centimètres mesure le vrai terrain ?', attendu: 2800, unite: 'cm' },
        { texte: 'L\'échelle du plan s\'écrit 1/n. Que vaut n ?', attendu: 200 },
        { texte: 'Sur ce plan, la largeur du terrain mesure 7,5 cm. Quelle est sa largeur réelle ?', attendu: 15, unite: 'm' },
      ],
    },
  ],

  test: [
    {
      id: 't-5-4-1', type: 'calcul',
      consigne: 'Le plan est à l\'échelle 1/100. Un mur y mesure 6 cm. Calcule sa longueur réelle, en m.',
      enonce: '\\text{échelle } \\dfrac{1}{100} \\qquad \\text{plan} : 6\\text{ cm}',
      attendu: 6,
      fausses: [{ valeur: 600, piege: 'unites-non-converties' }],
      revoir: 'propriete',
    },
    {
      id: 't-5-4-2', type: 'calcul',
      consigne: 'Le plan est à l\'échelle 1/300. Une pièce y mesure 5 cm. Calcule sa longueur réelle, en cm.',
      enonce: '\\text{échelle } \\dfrac{1}{300} \\qquad \\text{plan} : 5\\text{ cm}',
      attendu: 1500,
      fausses: [{ valeur: 305, piege: 'traitement-additif' }],
      revoir: 'definition',
    },
    {
      id: 't-5-4-3', type: 'calcul',
      consigne: 'Le plan est à l\'échelle 1/200. Un mur réel mesure 9 m. Calcule sa longueur sur le plan, en cm.',
      enonce: '\\text{échelle } \\dfrac{1}{200} \\qquad \\text{réalité} : 9\\text{ m}',
      attendu: 4.5,
      fausses: [
        { valeur: 1800, piege: 'echelle-inversee' },
        { valeur: 0.045, piege: 'unites-non-converties' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-5-4-4', type: 'trous',
      consigne: 'Le plan est à l\'échelle 1/400. Complète les deux longueurs manquantes, en cm.',
      enonce:
        '\\text{échelle } \\dfrac{1}{400} \\qquad \\text{plan } 3\\text{ cm} \\to '
        + '\\text{réalité } \\square\\text{ cm} \\qquad \\text{plan } \\square\\text{ cm} \\to '
        + '\\text{réalité } 2000\\text{ cm}',
      champs: [
        { id: 'a', attendu: 1200 },
        { id: 'b', attendu: 5 },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-5-4-5', type: 'calcul',
      consigne: 'La carte est à l\'échelle 1/50 000. Deux villages y sont séparés de 6 cm. Calcule la distance réelle, en km.',
      enonce: '\\text{échelle } \\dfrac{1}{50000} \\qquad \\text{carte} : 6\\text{ cm}',
      attendu: 3,
      fausses: [{ valeur: 300000, piege: 'unites-non-converties' }],
      revoir: 'exemple',
    },
    {
      id: 't-5-4-6', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{échelle } \\dfrac{1}{1000} \\qquad \\text{plan} : 5\\text{ cm} '
        + '\\quad \\Rightarrow \\quad \\text{réalité} : 5\\text{ mm}',
      attendu: false,
      explication:
        '5 × 1 000 = 5 000 cm, soit 50 m. La réponse proposée est plus **petite** '
        + 'que le plan lui-même : c\'est la signature d\'une division à la place '
        + 'd\'une multiplication.',
      piege: 'echelle-inversee', revoir: 'remarque',
    },
    {
      id: 't-5-4-7', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{échelle } \\dfrac{1}{25000} \\qquad \\text{carte} : 12\\text{ cm} '
        + '\\quad \\Rightarrow \\quad \\text{réalité} : 3\\text{ km}',
      attendu: true,
      explication: '12 × 25 000 = 300 000 cm, soit 3 000 m, donc 3 km. Le compte y est.',
      revoir: 'exemple',
    },
    {
      id: 't-5-4-8', type: 'calcul',
      consigne: 'Le plan est à l\'échelle 1/100. Une pièce y mesure 5 cm sur 4 cm. Calcule son aire réelle, en m².',
      enonce: '\\text{échelle } \\dfrac{1}{100} \\qquad \\text{plan} : 5\\text{ cm} \\times 4\\text{ cm}',
      attendu: 20,
      fausses: [{ valeur: 2000, piege: 'illusion-de-linearite' }],
      revoir: 'remarque',
    },
    {
      id: 't-5-4-9', type: 'corriger',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{échelle } \\dfrac{1}{500} \\qquad \\text{plan} : 4\\text{ cm}',
      lignes: [
        { texte: 'Sur ce plan, 1 cm représente 500 cm en réalité.', fausse: false },
        { texte: 'La longueur réelle vaut 4 × 500 = 2 000 cm.', fausse: false },
        { texte: 'Soit 200 m.', fausse: true },
      ],
      explication:
        'Les deux premières lignes sont justes : la longueur réelle vaut bien '
        + '2 000 cm. C\'est la conversion qui casse. Un mètre vaut 100 cm, donc '
        + '2 000 cm font **20 m**, pas 200 m.',
      piege: 'unites-non-converties', revoir: 'remarque',
    },
    {
      // Le seul item où l'échelle ne sert pas à calculer une longueur, mais à
      // comparer deux cartes. Il vérifie que « 1/50 000 » est lu comme un
      // nombre, et pas seulement recopié dans une multiplication.
      id: 't-5-4-10', type: 'vraifaux',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Sur une carte au 1/50 000, un centimètre représente une distance réelle plus grande que sur une carte au 1/25 000.',
      attendu: true,
      revoir: 'definition',
    },
  ],
};
