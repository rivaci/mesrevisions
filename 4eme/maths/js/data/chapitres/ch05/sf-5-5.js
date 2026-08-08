// Chapitre 5, savoir-faire 5 — Calculer avec une grandeur quotient.
//
// Deux gestes seulement, et ils se perdent séparément :
//   1. lire l'unité comme une division (km/h = kilomètres ÷ heures) ;
//   2. mettre les durées en heures décimales avant de diviser.
//
// Le second est celui qui coûte le plus de points en contrôle : « 1 h 30 »
// devient « 1,30 » sous le stylo parce que l'écriture y ressemble. Les minutes
// se comptent par 60, les décimales par 100 — c'est toute l'affaire, et c'est
// pour ça que la conversion occupe la moitié des items.
//
// ── Pourquoi deux items neutres ───────────────────────────────────────────
//
// À force de convertir, l'élève installe le réflexe inverse : « il y a des
// minutes dans l'énoncé, donc je divise par 60 ». Ce réflexe est faux dès
// qu'on demande des L/min. Les deux items neutres portent tous les deux sur
// « unites-non-converties » et sont des situations où il n'y a RIEN à
// convertir : le débit en L/min à partir de minutes, la masse volumique en
// g/cm³ à partir de grammes et de centimètres cubes.

export default {
  id: 'sf-5-5',
  titre: 'Calculer avec une grandeur quotient',
  attendus: [
    'Il calcule avec des grandeurs quotients : vitesse, débit, masse volumique.',
  ],

  // Deux copies plutôt qu'une suite de calculs : le désaccord porte sur la
  // conversion, pas sur la division. Et on ne tranche pas en donnant la règle
  // — on fait calculer la distance en 3 h puis en 1 h, ce qui donne la vitesse
  // sans jamais avoir eu besoin d'écrire 1,5.
  decouvrir: {
    titre: 'Une heure et demie, ça s\'écrit comment ?',
    texte:
      'Un cycliste parcourt 45 km en 1 h 30. On demande sa vitesse moyenne, en '
      + 'km/h. Voici deux copies.',
    copies: [
      { nom: 'Sacha', calcul: '1 h 30, je l\'écris 1,30 : 45 ÷ 1,30', resultat: '≈ 34,6 km/h' },
      { nom: 'Inès', calcul: '1 h 30, c\'est une heure et demie : 45 ÷ 1,5', resultat: '30 km/h' },
    ],
    question:
      'Ne tranche pas tout de suite. À cette allure, quelle distance le cycliste '
      + 'parcourt-il en 3 h ? Et donc en 1 h ?',
    champs: [
      { id: 'a', etiquette: 'en 3 h, il parcourt … km', attendu: 90 },
      { id: 'b', etiquette: 'en 1 h, il parcourt … km', attendu: 30 },
    ],
    conclusion:
      'En une heure il fait 30 km : sa vitesse est donc de **30 km/h**, et c\'est '
      + '**Inès** qui a raison. Une heure et demie s\'écrit **1,5 h**, jamais '
      + '1,30 h — les minutes se comptent par 60, pas par 100. Au passage, l\'unité '
      + 'annonçait déjà le calcul : des km/h, ce sont des kilomètres **divisés par** '
      + 'des heures.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Grandeur quotient',
      texte:
        'Une **grandeur quotient** s\'obtient en divisant une grandeur par une '
        + 'autre. Son unité contient le calcul :\n'
        + '**km/h** = kilomètres ÷ heures (une vitesse)\n'
        + '**L/min** = litres ÷ minutes (un débit)\n'
        + '**g/cm³** = grammes ÷ centimètres cubes (une masse volumique)',
    },
    {
      type: 'propriete',
      titre: 'Les trois calculs',
      texte:
        'vitesse = distance ÷ durée\n'
        + 'distance = vitesse × durée\n'
        + 'durée = distance ÷ vitesse\n'
        + 'Le débit et la masse volumique fonctionnent exactement pareil : il suffit '
        + 'de remplacer « distance » par volume ou masse.',
    },
    {
      type: 'remarque',
      titre: 'Les durées ne se comptent pas par 100',
      texte:
        '1 h 30 vaut **1,5 h**, pas 1,30 h. Pour convertir des minutes en heures, '
        + 'on **divise par 60** :\n'
        + '15 min = 0,25 h   ·   30 min = 0,5 h   ·   45 min = 0,75 h\n'
        + 'Et si ça ne tombe pas rond : 40 min = 40 ÷ 60 ≈ 0,67 h.',
    },
    {
      type: 'remarque',
      titre: 'C\'est l\'unité demandée qui commande',
      texte:
        'On convertit en fonction de ce qu\'on cherche, pas par habitude. Pour des '
        + '**km/h**, il faut une durée en heures. Pour des **L/min**, il faut une '
        + 'durée en minutes — et là, convertir en heures serait une erreur.',
    },
    {
      type: 'exemple',
      texte:
        '45 km en 1 h 30 : 1 h 30 = 1,5 h, donc v = 45 ÷ 1,5 = 30 km/h.\n'
        + '480 L en 12 min : débit = 480 ÷ 12 = 40 L/min.\n'
        + '1 000 g pour 500 cm³ : masse volumique = 1 000 ÷ 500 = 2 g/cm³.',
    },
  ],

  methode: {
    titre: 'Calculer une vitesse quand la durée mêle heures et minutes',
    enonce: 'Un train parcourt 210 km en 1 h 45. Calculer sa vitesse moyenne, en km/h.',
    etapes: [
      {
        texte: 'On demande des km/h : je vais donc diviser des kilomètres par des heures.',
        note: 'L\'unité dit le calcul, y compris dans quel sens diviser.',
      },
      {
        texte: 'Je convertis la durée : 45 min = 45 ÷ 60 = 0,75 h, donc 1 h 45 = 1,75 h.',
        note: 'Surtout pas 1,45 h : une heure vaut 60 minutes, pas 100.',
      },
      { texte: 'v = 210 ÷ 1,75 = 120.', note: 'Maintenant seulement, la division.' },
      {
        texte: 'La vitesse moyenne du train est de 120 km/h.',
        note: 'On écrit l\'unité : sans elle, le nombre ne veut rien dire.',
      },
    ],
    controle:
      'Le contrôle : refais le trajet dans l\'autre sens. À 120 km/h pendant '
      + '1,75 h, on parcourt 120 × 1,75 = 210 km — on retombe sur l\'énoncé, donc '
      + 'c\'est juste. Et regarde l\'ordre de grandeur : 120 km/h pour un train, '
      + 'c\'est crédible ; 120 km/h pour un marcheur, non.',
  },

  entrainement: [
    {
      id: 'e-5-5-1', type: 'calcul', palier: 1, piege: 'grandeur-quotient-inversee',
      consigne: 'Un cycliste parcourt 60 km en 3 h. Calcule sa vitesse moyenne, en km/h.',
      enonce: 'd = 60\\text{ km} \\quad t = 3\\text{ h}',
      attendu: 20,
      fausses: [
        { valeur: 180, piege: 'grandeur-quotient-inversee' },
        { valeur: 0.05, piege: 'grandeur-quotient-inversee' },
      ],
    },
    {
      id: 'e-5-5-2', type: 'calcul', palier: 1, piege: 'grandeur-quotient-inversee',
      consigne: 'Un bloc de métal de 200 cm³ a une masse de 800 g. Calcule sa masse volumique, en g/cm³.',
      enonce: 'm = 800\\text{ g} \\quad V = 200\\text{ cm}^{3}',
      attendu: 4,
      fausses: [{ valeur: 0.25, piege: 'grandeur-quotient-inversee' }],
    },
    {
      // NEUTRE : on demande des L/min et la durée est DÉJÀ en minutes — il n'y a
      // rien à convertir. Sans cet item, « il y a des minutes, donc je divise
      // par 60 » deviendrait la règle, et elle est fausse une fois sur deux.
      // La fausse valeur 2400 est exactement ce que produit cette sur-conversion.
      id: 'e-5-5-3', type: 'calcul', palier: 1, neutre: true, piege: 'unites-non-converties',
      consigne: 'Une pompe verse 480 L en 12 min. Calcule son débit, en L/min.',
      enonce: 'V = 480\\text{ L} \\quad t = 12\\text{ min}',
      attendu: 40,
      fausses: [{ valeur: 2400, piege: 'unites-non-converties' }],
    },
    {
      id: 'e-5-5-4', type: 'calcul', palier: 2, piege: 'unites-non-converties',
      consigne: 'Un train parcourt 270 km en 1 h 30. Calcule sa vitesse moyenne, en km/h.',
      enonce: 'd = 270\\text{ km} \\quad t = 1\\text{ h }30',
      attendu: 180,
      fausses: [
        { valeur: 3, piege: 'unites-non-converties' },
        { valeur: 405, piege: 'grandeur-quotient-inversee' },
      ],
    },
    {
      id: 'e-5-5-5', type: 'trous', palier: 2, piege: 'unites-non-converties',
      consigne: 'Écris ces deux durées en heures.',
      enonce: '1\\text{ h }45 = \\square\\text{ h} \\qquad 45\\text{ min} = \\square\\text{ h}',
      champs: [{ id: 'a', attendu: 1.75 }, { id: 'b', attendu: 0.75 }],
      fausses: [
        { valeur: 1.45, piege: 'unites-non-converties' },
        { valeur: 45, piege: 'unites-non-converties' },
      ],
    },
    {
      id: 'e-5-5-6', type: 'calcul', palier: 2, piege: 'grandeur-quotient-inversee',
      consigne: 'Une voiture roule à 90 km/h pendant 2 h 30. Quelle distance parcourt-elle, en km ?',
      enonce: 'v = 90\\text{ km/h} \\quad t = 2\\text{ h }30',
      attendu: 225,
      fausses: [
        { valeur: 36, piege: 'grandeur-quotient-inversee' },
        { valeur: 207, piege: 'unites-non-converties' },
      ],
    },
    {
      id: 'e-5-5-7', type: 'plausible', palier: 2, piege: 'unites-non-converties',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: 'd = 6\\text{ km} \\quad t = 1\\text{ h }30 \\quad v \\approx 4{,}6\\text{ km/h}',
      attendu: false,
      explication:
        '1 h 30 vaut 1,5 h, donc v = 6 ÷ 1,5 = **4 km/h**. Le 4,6 sort d\'une '
        + 'division par 1,30 — une durée qui n\'existe pas. Contrôle : à 4,6 km/h '
        + 'pendant 1,5 h on ferait 6,9 km, pas 6.',
    },
    {
      // NEUTRE, et sur deux plans à la fois. D'abord les unités : des grammes et
      // des centimètres cubes pour des g/cm³, il n'y a rien à convertir. Ensuite
      // la réponse est « oui » — sans cet item, « on me demande si c'est
      // plausible, donc c'est faux » suffirait à réussir la série.
      id: 'e-5-5-8', type: 'plausible', palier: 2, neutre: true, piege: 'unites-non-converties',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: 'm = 393\\text{ g} \\quad V = 50\\text{ cm}^{3} \\quad \\rho = 7{,}86\\text{ g/cm}^{3}',
      attendu: true,
      explication:
        '393 ÷ 50 = 7,86 : le calcul tombe juste. Et l\'ordre de grandeur confirme — '
        + 'c\'est du fer, presque huit fois plus lourd que l\'eau à volume égal.',
    },
    {
      id: 'e-5-5-9', type: 'corriger', palier: 3, piege: 'unites-non-converties',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: 'd = 21\\text{ km} \\quad t = 1\\text{ h }15',
      lignes: [
        { texte: 'On veut des km/h : je divise les kilomètres par les heures.', fausse: false },
        { texte: '1 h 15 = 1,15 h', fausse: true },
        { texte: 'v = 21 ÷ 1,15 ≈ 18,3 km/h', fausse: false },
      ],
      explication:
        'La première ligne est juste, et la troisième applique correctement la '
        + 'deuxième — c\'est bien la deuxième qui casse tout. 15 min, c\'est un quart '
        + 'd\'heure, soit 0,25 h : donc 1 h 15 = 1,25 h. Le bon calcul donne '
        + '21 ÷ 1,25 = 16,8 km/h.',
    },
    {
      id: 'e-5-5-10', type: 'vraifaux', palier: 3, piege: 'unites-non-converties',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Pour écrire 3 h 45 en heures, il suffit de remplacer le « h » par une virgule : 3 h 45 = 3,45 h.',
      attendu: false,
      contreExemple: {
        invite:
          'Choisis un nombre de minutes entre 1 et 59 — 15, 30 ou 45 sont les plus '
          + 'faciles — puis écris cette durée en heures.',
        champs: [
          { id: 'a', etiquette: 'minutes choisies' },
          { id: 'b', etiquette: 'la même durée, en heures' },
        ],
        // On vérifie la PROPRIÉTÉ « b vaut a divisé par 60 », quel que soit le
        // nombre de minutes choisi. La tolérance de 0,01 est là parce que
        // 20 min = 0,333… h ne se tape pas exactement : refuser 0,33 punirait
        // un élève qui a parfaitement compris.
        valide: (a, b) => Number.isInteger(a) && a > 0 && a < 60
          && Math.abs(b - a / 60) < 0.01,
        // Une réponse dont on affirme qu'elle convient : le contrôle la vérifie
        // exactement, au lieu de chercher au hasard une solution qui lie les
        // deux champs par un facteur d'échelle.
        temoin: [30, 0.5],
        exemple:
          '45 min valent 45 ÷ 60 = 0,75 h. L\'écriture 0,45 h désignerait 27 minutes '
          + '(0,45 × 60), donc pas du tout la même durée.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-5-5-1',
      enonce:
        'Un car scolaire relie deux villages distants de 54 km. Le trajet dure '
        + '45 minutes.',
      questions: [
        { texte: 'Combien vaut cette durée en heures ?', attendu: 0.75, unite: 'h' },
        { texte: 'Quelle est la vitesse moyenne du car ?', attendu: 72, unite: 'km/h' },
      ],
    },
    {
      // Pas de contenance annoncée : avec « une baignoire de 150 litres », la
      // seconde question aurait admis DEUX réponses défendables — 250 L versés,
      // ou 150 L parce que la baignoire déborde à la douzième minute. L'appli
      // n'en accepte qu'une.
      id: 'p-5-5-2',
      enonce:
        'Un robinet remplit un bassin à débit constant : il y verse 150 litres '
        + 'en 12 minutes.',
      questions: [
        { texte: 'Quel est son débit, en litres par minute ?', attendu: 12.5, unite: 'L/min' },
        { texte: 'Combien de litres verse-t-il en 20 minutes ?', attendu: 250, unite: 'L' },
      ],
    },
    {
      id: 'p-5-5-3',
      enonce:
        'Un lingot d\'aluminium occupe un volume de 250 cm³ et sa masse est de '
        + '675 g.',
      questions: [
        { texte: 'Quelle est la masse volumique de l\'aluminium ?', attendu: 2.7, unite: 'g/cm³' },
        { texte: 'Quelle serait la masse d\'un lingot de 400 cm³ du même métal ?', attendu: 1080, unite: 'g' },
      ],
    },
    {
      id: 'p-5-5-4',
      enonce:
        'Un TGV met 2 h 15 pour relier deux villes distantes de 486 km, à vitesse '
        + 'constante.',
      questions: [
        { texte: 'Combien vaut la durée du trajet en heures ?', attendu: 2.25, unite: 'h' },
        { texte: 'Quelle est sa vitesse moyenne ?', attendu: 216, unite: 'km/h' },
        { texte: 'Quelle distance parcourt-il en 40 minutes à cette vitesse ?', attendu: 144, unite: 'km' },
      ],
    },
    {
      id: 'p-5-5-5',
      enonce:
        'Un sprinteur couvre les 100 mètres en 12,5 secondes. On suppose qu\'il '
        + 'garde la même allure du début à la fin.',
      questions: [
        { texte: 'Quelle est sa vitesse, en mètres par seconde ?', attendu: 8, unite: 'm/s' },
        { texte: 'Quelle distance parcourrait-il en une minute à cette allure ?', attendu: 480, unite: 'm' },
        { texte: 'Combien de secondes lui faudrait-il pour 400 m ?', attendu: 50, unite: 's' },
      ],
    },
  ],

  test: [
    {
      id: 't-5-5-1', type: 'calcul',
      consigne: 'Une voiture parcourt 150 km en 2 h. Calcule sa vitesse moyenne, en km/h.',
      enonce: 'd = 150\\text{ km} \\quad t = 2\\text{ h}',
      attendu: 75, revoir: 'definition',
    },
    {
      id: 't-5-5-2', type: 'calcul',
      consigne: 'Un train parcourt 240 km en 1 h 30. Calcule sa vitesse moyenne, en km/h.',
      enonce: 'd = 240\\text{ km} \\quad t = 1\\text{ h }30',
      attendu: 160,
      fausses: [{ valeur: 360, piege: 'grandeur-quotient-inversee' }],
      piege: 'unites-non-converties', revoir: 'remarque',
    },
    {
      id: 't-5-5-3', type: 'trous',
      consigne: 'Écris ces deux durées en heures.',
      enonce: '2\\text{ h }15 = \\square\\text{ h} \\qquad 30\\text{ min} = \\square\\text{ h}',
      champs: [{ id: 'a', attendu: 2.25 }, { id: 'b', attendu: 0.5 }],
      fausses: [
        { valeur: 2.15, piege: 'unites-non-converties' },
        { valeur: 30, piege: 'unites-non-converties' },
      ],
      revoir: 'remarque',
    },
    {
      id: 't-5-5-4', type: 'calcul',
      consigne: 'Une pompe verse 320 L en 8 min. Calcule son débit, en L/min.',
      enonce: 'V = 320\\text{ L} \\quad t = 8\\text{ min}',
      attendu: 40,
      fausses: [{ valeur: 0.025, piege: 'grandeur-quotient-inversee' }],
      revoir: 'definition',
    },
    {
      id: 't-5-5-5', type: 'calcul',
      consigne: 'Un bloc de 200 cm³ a une masse de 1 400 g. Calcule sa masse volumique, en g/cm³.',
      enonce: 'm = 1400\\text{ g} \\quad V = 200\\text{ cm}^{3}',
      attendu: 7, revoir: 'propriete',
    },
    {
      id: 't-5-5-6', type: 'calcul',
      consigne: 'Un cycliste roule à 60 km/h pendant 45 min. Quelle distance parcourt-il, en km ?',
      enonce: 'v = 60\\text{ km/h} \\quad t = 45\\text{ min}',
      attendu: 45,
      fausses: [
        { valeur: 80, piege: 'grandeur-quotient-inversee' },
        { valeur: 2700, piege: 'unites-non-converties' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-5-5-7', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: 'd = 8\\text{ km} \\quad t = 30\\text{ min} \\quad v = 4\\text{ km/h}',
      attendu: false,
      explication:
        '30 min = 0,5 h, donc v = 8 ÷ 0,5 = **16 km/h**. Le 4 vient d\'une '
        + 'multiplication par 0,5 au lieu d\'une division : parcourir 8 km en une '
        + 'demi-heure, c\'est aller plus vite que 8 km/h, pas deux fois moins vite.',
      piege: 'grandeur-quotient-inversee', revoir: 'propriete',
    },
    {
      id: 't-5-5-8', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: 'd = 200\\text{ km} \\quad t = 2\\text{ h }30 \\quad v = 80\\text{ km/h}',
      attendu: true,
      explication:
        '2 h 30 = 2,5 h et 200 ÷ 2,5 = 80. Le contrôle inverse tombe juste aussi : '
        + '80 × 2,5 = 200 km.',
      revoir: 'exemple',
    },
    {
      id: 't-5-5-9', type: 'corriger',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: 'V = 90\\text{ L} \\quad t = 1\\text{ h }30',
      lignes: [
        { texte: 'On veut un débit en L/min : je divise les litres par les minutes.', fausse: false },
        { texte: '1 h 30 = 90 min', fausse: false },
        { texte: 'débit = 90 ÷ 1,5 = 60 L/min', fausse: true },
      ],
      explication:
        'Les deux premières lignes sont justes, y compris la conversion. C\'est la '
        + 'troisième qui trahit : elle divise par 1,5 heure alors qu\'on veut des '
        + 'L/min. Il fallait diviser par les 90 minutes trouvées juste au-dessus : '
        + '90 ÷ 90 = 1 L/min.',
      piege: 'unites-non-converties', revoir: 'remarque',
    },
    {
      id: 't-5-5-10', type: 'calcul',
      consigne: 'Un cycliste roule à 20 km/h. Combien de temps lui faut-il pour parcourir 50 km, en heures ?',
      enonce: 'v = 20\\text{ km/h} \\quad d = 50\\text{ km}',
      attendu: 2.5,
      fausses: [
        { valeur: 0.4, piege: 'grandeur-quotient-inversee' },
        { valeur: 1000, piege: 'grandeur-quotient-inversee' },
      ],
      revoir: 'propriete',
    },
  ],
};
