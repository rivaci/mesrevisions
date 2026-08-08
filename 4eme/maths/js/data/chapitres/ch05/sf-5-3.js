// Savoir-faire 5-3 — Calculer et appliquer un pourcentage.
//
// Le pourcentage est l'endroit du programme où la proportionnalité rencontre
// la vie courante, et où elle se casse le plus vite. Deux gestes sont en jeu,
// et un seul est réellement difficile :
//
//   appliquer   prendre t % d'une quantité — mécanique, une multiplication ;
//   calculer    exprimer une partie en pourcentage du tout — une division,
//               dont le sens s'inverse une fois sur deux.
//
// Mais l'erreur qui décide de tout est ailleurs : SUR QUOI porte le
// pourcentage. « 20 % du reste » n'est pas « 20 % du total », et deux remises
// successives ne s'additionnent pas. C'est le piège `pourcentage-du-mauvais-tout`,
// et il traverse tout ce savoir-faire — activité, méthode, problèmes.
//
// Pas de coefficient multiplicateur nommé ici : ×0,8 pour « −20 % » est un
// outil de 3e. En 4e on calcule la remise, puis on la retire. C'est plus long,
// mais c'est ce geste-là qui rend visible la quantité sur laquelle on travaille
// — et donc ce qui empêche l'erreur.

export default {
  id: 'sf-5-3',
  titre: 'Calculer et appliquer un pourcentage',
  attendus: [
    'Il calcule une proportion et l\'exprime sous forme de pourcentage.',
    'Il applique un pourcentage à une quantité, y compris lorsque deux pourcentages se succèdent.',
  ],

  // On ne dit pas « les pourcentages ne s'additionnent pas » : on met deux
  // copies côte à côte et l'élève termine celle qui est juste. Il produit
  // lui-même le 56, et le 50 de Sacha devient faux sous ses yeux — bien plus
  // solide qu'une règle annoncée.
  decouvrir: {
    titre: 'Deux copies pour le même blouson',
    texte:
      'Un blouson coûte 100 €. L\'étiquette annonce −30 %, et une affiche promet '
      + '−20 % supplémentaires en caisse. Voici deux copies.',
    copies: [
      { nom: 'Sacha', calcul: '30 % + 20 % = 50 %, donc la remise vaut 50 €', resultat: '50 €' },
      { nom: 'Inès', calcul: '30 % de 100 € = 30 €, il reste 70 €. Puis 20 % de 70 €…', resultat: '?' },
    ],
    question:
      'Termine le calcul d\'Inès : combien font 20 % de 70 €, et quel prix paie-t-on '
      + 'alors en caisse ?',
    champs: [
      { id: 'a', etiquette: '20 % de 70 € =', attendu: 14 },
      { id: 'b', etiquette: 'prix payé en caisse :', attendu: 56 },
    ],
    conclusion:
      'C\'est **Inès**. La seconde remise ne porte pas sur les 100 € de départ, mais '
      + 'sur les **70 € qui restent**. Un pourcentage s\'applique toujours à une '
      + 'quantité précise — et deux pourcentages ne **s\'additionnent pas**.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Appliquer un pourcentage',
      texte:
        'Prendre **t %** d\'une quantité, c\'est la multiplier par **t/100**.\n'
        + '15 % de 240, c\'est 240 × 15 ÷ 100 = 36.',
    },
    {
      type: 'propriete',
      titre: 'Calculer un pourcentage',
      texte:
        'Pour savoir quel pourcentage une **partie** représente d\'un **tout**, on '
        + 'divise la partie par le tout, puis on multiplie par 100.\n'
        + '18 élèves sur 45 : 18 ÷ 45 × 100 = 40 %.',
    },
    {
      // La remarque qui porte le chapitre. Elle est courte exprès : c'est une
      // consigne de lecture, pas une théorie.
      type: 'remarque',
      titre: 'Un pourcentage porte toujours sur une quantité précise',
      texte:
        '« 20 % du reste » n\'est pas « 20 % du total ». Avant de calculer, repère '
        + 'la quantité sur laquelle le pourcentage s\'applique : c\'est elle que tu '
        + 'vas multiplier, et elle seule.',
    },
    {
      type: 'remarque',
      titre: 'Deux pourcentages successifs ne s\'additionnent pas',
      texte:
        'Une remise de 30 % puis une remise de 20 % ne font pas 50 %. La seconde '
        + 'porte sur le prix **déjà réduit** : sur 100 €, on paie 56 € et non 50 €.',
    },
    {
      type: 'exemple',
      texte:
        'Sur 250 € : −20 % enlève 50 €, il reste 200 €. Puis −10 % sur ces 200 € '
        + 'enlève 20 €, il reste 180 €.\n'
        + 'De 250 € à 180 €, la baisse totale vaut 70 €, soit 28 % — pas 30 %.',
    },
  ],

  methode: {
    titre: 'Enchaîner deux pourcentages',
    enonce:
      'Un vélo coûte 480 €. Le magasin fait une remise de 25 %, puis 10 % '
      + 'supplémentaires en caisse. Quel prix paie-t-on ?',
    etapes: [
      {
        texte: 'La première remise porte sur les 480 €. 25 % de 480 = 480 × 25 ÷ 100 = 120 €.',
        note: '25 %, c\'est le quart : 480 ÷ 4 = 120.',
      },
      {
        texte: 'Après cette remise, le vélo est affiché à 480 − 120 = 360 €.',
        note: 'C\'est ce prix-là qui sert pour la suite, et plus jamais 480.',
      },
      {
        texte: 'La seconde remise porte sur 360 €. 10 % de 360 = 36 €.',
        note: '10 %, c\'est diviser par 10.',
      },
      {
        texte: 'Le prix payé est donc 360 − 36 = 324 €.',
        note: '',
      },
    ],
    controle:
      'Le contrôle : les deux remises ont enlevé 120 + 36 = 156 €. Une remise unique '
      + 'de 35 % aurait enlevé 168 €. Les deux nombres diffèrent — c\'est la preuve '
      + 'que les pourcentages ne s\'additionnent pas. Et si tu trouves 312 €, c\'est '
      + 'que tu as pris les 10 % sur 480 € au lieu de 360 €.',
  },

  entrainement: [
    {
      id: 'e-5-3-1', type: 'calcul', palier: 1, piege: 'produit-en-croix-mecanique',
      consigne: 'Calcule.',
      enonce: '25\\% \\text{ de } 180',
      attendu: 45,
      fausses: [
        { valeur: 7.2, piege: 'produit-en-croix-mecanique' },
        { valeur: 4500, piege: 'produit-en-croix-mecanique' },
      ],
    },
    {
      id: 'e-5-3-2', type: 'calcul', palier: 1, piege: 'produit-en-croix-mecanique',
      consigne: 'Calcule.',
      enonce: '12\\% \\text{ de } 150',
      attendu: 18,
      fausses: [
        { valeur: 12.5, piege: 'produit-en-croix-mecanique' },
        { valeur: 1800, piege: 'produit-en-croix-mecanique' },
      ],
    },
    {
      id: 'e-5-3-3', type: 'calcul', palier: 1, piege: 'produit-en-croix-mecanique',
      consigne: 'Dans un club, 21 adhérents sur 60 sont mineurs. Quel pourcentage cela fait-il ? Donne le nombre seul.',
      enonce: '21 \\text{ sur } 60',
      attendu: 35,
      fausses: [
        { valeur: 286, piege: 'produit-en-croix-mecanique' },
        { valeur: 0.35, piege: 'produit-en-croix-mecanique' },
      ],
    },
    {
      id: 'e-5-3-4', type: 'calcul', palier: 2, piege: 'traitement-additif',
      consigne: 'Un article coûtait 80 €, il coûte maintenant 100 €. De quel pourcentage a-t-il augmenté ? Donne le nombre seul.',
      enonce: '80\\text{ €} \\;\\longrightarrow\\; 100\\text{ €}',
      attendu: 25,
      fausses: [
        { valeur: 20, piege: 'traitement-additif' },
        { valeur: 125, piege: 'produit-en-croix-mecanique' },
      ],
    },
    {
      // ITEM NEUTRE. Ici les deux pourcentages portent tous les deux sur les
      // 300 € de départ : les enchaîner serait une faute, et les additionner
      // donne par exception le bon résultat (15 % de 300 = 45). Le piège
      // `pourcentage-du-mauvais-tout` ne joue donc pas — c'est exactement pour
      // ça que l'item existe. Sans lui, « dès qu'il y a deux pourcentages,
      // j'applique le second au résultat du premier » suffirait à réussir toute
      // la série, et deviendrait la nouvelle règle fausse. L'item n'est pas plus
      // facile : il faut lire sur quoi chaque pourcentage porte, et c'est
      // précisément le geste qu'on installe.
      id: 'e-5-3-5', type: 'calcul', palier: 2, neutre: true, piege: 'pourcentage-du-mauvais-tout',
      consigne: 'Sur une facture de 300 €, on ajoute 10 % de frais de livraison et 5 % de frais de dossier. Les deux sont calculés sur les 300 € de départ. Calcule le total à payer, en euros.',
      enonce: '300\\text{ €} \\;+\\; 10\\% \\;+\\; 5\\%',
      attendu: 345,
      fausses: [
        { valeur: 346.5, piege: 'pourcentage-du-mauvais-tout' },
        { valeur: 315, piege: 'traitement-additif' },
      ],
    },
    {
      id: 'e-5-3-6', type: 'trous', palier: 2, piege: 'pourcentage-du-mauvais-tout',
      consigne: 'Un article coûte 250 €. Le magasin applique une remise de 20 %, puis 10 % de plus sur le prix déjà réduit. Complète les deux prix.',
      enonce: '250\\text{ €} \\;\\longrightarrow\\; \\square\\text{ €} \\;\\longrightarrow\\; \\square\\text{ €}',
      champs: [
        { id: 'a', attendu: 200 },
        { id: 'b', attendu: 180 },
      ],
      fausses: [
        { valeur: 175, piege: 'pourcentage-du-mauvais-tout' },
        { valeur: 230, piege: 'traitement-additif' },
      ],
    },
    {
      id: 'e-5-3-7', type: 'plausible', palier: 2, piege: 'pourcentage-du-mauvais-tout',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '200\\text{ €} \\;-30\\% \\text{ puis } -20\\% \\;\\longrightarrow\\; 100\\text{ €}',
      attendu: false,
      explication:
        'Les deux remises ont été additionnées : 30 % + 20 % = 50 %, soit la moitié '
        + 'de 200 €. Mais la seconde porte sur ce qui reste : 200 − 60 = 140 €, puis '
        + '20 % de 140 = 28 €, donc 112 € au final. Deux remises successives enlèvent '
        + 'toujours **moins** que leur somme.',
    },
    {
      id: 'e-5-3-8', type: 'plausible', palier: 3, piege: 'pourcentage-du-mauvais-tout',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '80\\text{ €} \\;+25\\% \\text{ puis } -20\\% \\;\\longrightarrow\\; 80\\text{ €}',
      attendu: true,
      explication:
        '25 % de 80 = 20, donc le prix monte à 100 €. Puis 20 % de 100 = 20, donc il '
        + 'redescend à 80 €. On retombe bien sur le prix de départ — mais pas parce '
        + 'que « +25 puis −20 » ferait « +5 » : c\'est que la baisse porte sur 100 €, '
        + 'plus gros que 80 €, et 20 % de 100 valent autant que 25 % de 80. Avec deux '
        + 'pourcentages égaux, on ne reviendrait pas au départ : +20 % puis −20 % sur '
        + '80 € donne 80 → 96 → 76,80 €.',
    },
    {
      id: 'e-5-3-9', type: 'vraifaux', palier: 3, piege: 'illusion-de-linearite',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Si le côté d\'un carré augmente de 10 %, son aire augmente elle aussi de 10 %.',
      attendu: false,
      contreExemple: {
        invite: 'Choisis la longueur du côté de départ, puis calcule l\'aire du carré une fois le côté augmenté de 10 %.',
        champs: [
          { id: 'a', etiquette: 'côté de départ' },
          { id: 'b', etiquette: 'aire après l\'augmentation' },
        ],
        // On vérifie la PROPRIÉTÉ, pas une valeur : l'aire d'arrivée doit valoir
        // (1,1 × côté)², et surtout différer de 1,1 × l'aire de départ — c'est
        // cette différence-là qui fait le contre-exemple, quel que soit le côté choisi.
        valide: (a, b) => a > 0
          && Math.abs(b - 1.21 * a * a) < 1e-6 * a * a
          && Math.abs(b - 1.1 * a * a) > 1e-9,
        exemple:
          'Avec un côté de 10 cm : le côté passe à 11 cm et l\'aire de 100 cm² à '
          + '121 cm². C\'est une hausse de 21 %, pas de 10 %.',
      },
    },
    {
      id: 'e-5-3-10', type: 'corriger', palier: 3, piege: 'pourcentage-du-mauvais-tout',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{Un forfait de } 60\\text{ € : } +20\\% \\text{ puis } -20\\%',
      lignes: [
        { texte: '20 % de 60 € = 12 €, donc le forfait passe à 72 €.', fausse: false },
        { texte: 'La baisse de 20 % porte sur 60 €, soit 12 €.', fausse: true },
        { texte: 'Le forfait revient donc à 60 €.', fausse: false },
      ],
      explication:
        'La première ligne est juste. C\'est à la deuxième que ça casse : la baisse '
        + 'porte sur le prix du moment, 72 €, et pas sur les 60 € de départ. '
        + '20 % de 72 = 14,40 €, donc le forfait finit à 72 − 14,40 = 57,60 €. '
        + 'Une hausse puis une baisse du même pourcentage ne ramènent pas au point '
        + 'de départ — elles font perdre un peu.',
    },
  ],

  problemes: [
    {
      id: 'p-5-3-1',
      enonce:
        'Un blouson coûte 90 €. Le magasin affiche une remise de 20 %, et une '
        + 'remise supplémentaire de 10 % est accordée en caisse sur le prix déjà réduit.',
      questions: [
        { texte: 'Quel est le prix après la première remise ?', attendu: 72, unite: '€' },
        { texte: 'Quel prix paies-tu en caisse ?', attendu: 64.8, unite: '€' },
      ],
    },
    {
      id: 'p-5-3-2',
      enonce:
        'Un collège compte 480 élèves, dont 168 sont demi-pensionnaires. Le '
        + 'principal espère augmenter ce nombre de 25 % l\'an prochain.',
      questions: [
        { texte: 'Quel pourcentage des élèves sont demi-pensionnaires ?', attendu: 35, unite: '%' },
        { texte: 'Combien de demi-pensionnaires y aurait-il l\'an prochain ?', attendu: 210, unite: 'élèves' },
      ],
    },
    {
      id: 'p-5-3-3',
      enonce:
        'Léa a 60 € d\'argent de poche. Elle en dépense 40 % pour un jeu, puis '
        + '25 % de ce qui lui reste pour un cadeau.',
      questions: [
        { texte: 'Combien coûte le jeu ?', attendu: 24, unite: '€' },
        { texte: 'Combien lui reste-t-il après le jeu ?', attendu: 36, unite: '€' },
        { texte: 'Combien coûte le cadeau ?', attendu: 9, unite: '€' },
      ],
    },
    {
      id: 'p-5-3-4',
      enonce:
        'Un film dure 2 h 30. Tu en as regardé 45 minutes avant d\'être interrompu.',
      questions: [
        { texte: 'Quelle est la durée du film en minutes ?', attendu: 150, unite: 'min' },
        { texte: 'Quel pourcentage du film as-tu regardé ?', attendu: 30, unite: '%' },
      ],
    },
    {
      id: 'p-5-3-5',
      enonce:
        'L\'an dernier, un club de judo comptait 250 adhérents. Cette année, il en '
        + 'compte 290.',
      questions: [
        { texte: 'Combien d\'adhérents le club a-t-il gagnés ?', attendu: 40, unite: 'adhérents' },
        { texte: 'De quel pourcentage le nombre d\'adhérents a-t-il augmenté ?', attendu: 16, unite: '%' },
      ],
    },
  ],

  test: [
    {
      id: 't-5-3-1', type: 'calcul',
      consigne: 'Calcule.',
      enonce: '20\\% \\text{ de } 350',
      attendu: 70, revoir: 'definition',
    },
    {
      id: 't-5-3-2', type: 'calcul',
      consigne: 'Calcule.',
      enonce: '6\\% \\text{ de } 250',
      attendu: 15, revoir: 'definition',
    },
    {
      id: 't-5-3-3', type: 'calcul',
      consigne: 'Sur 60 spectateurs, 27 sont des enfants. Quel pourcentage cela fait-il ? Donne le nombre seul.',
      enonce: '27 \\text{ sur } 60',
      attendu: 45, revoir: 'propriete',
    },
    {
      id: 't-5-3-4', type: 'calcul',
      consigne: 'Un abonnement passe de 40 € à 46 €. De quel pourcentage a-t-il augmenté ? Donne le nombre seul.',
      enonce: '40\\text{ €} \\;\\longrightarrow\\; 46\\text{ €}',
      attendu: 15, piege: 'traitement-additif', revoir: 'propriete',
    },
    {
      id: 't-5-3-5', type: 'trous',
      consigne: 'Un manteau coûte 150 €. On applique une remise de 20 %, puis 10 % de plus sur le prix déjà réduit. Complète les deux prix.',
      enonce: '150\\text{ €} \\;\\longrightarrow\\; \\square\\text{ €} \\;\\longrightarrow\\; \\square\\text{ €}',
      champs: [
        { id: 'a', attendu: 120 },
        { id: 'b', attendu: 108 },
      ],
      revoir: 'remarque',
    },
    {
      id: 't-5-3-6', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '60\\text{ €} \\;-10\\% \\text{ puis } -10\\% \\;\\longrightarrow\\; 48\\text{ €}',
      attendu: false,
      explication:
        'Les deux remises ont été additionnées en 20 %. En réalité : 10 % de 60 = 6, '
        + 'il reste 54 € ; puis 10 % de 54 = 5,40 €, il reste 54 − 5,40 = 48,60 €. '
        + 'La seconde remise porte sur 54 €, pas sur 60 €.',
      piege: 'pourcentage-du-mauvais-tout', revoir: 'remarque',
    },
    {
      id: 't-5-3-7', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '200\\text{ €} \\;-15\\% \\;\\longrightarrow\\; 170\\text{ €}',
      attendu: true,
      explication: '15 % de 200 = 30, et 200 − 30 = 170. Une seule remise, un seul tout : le compte y est.',
      revoir: 'exemple',
    },
    {
      id: 't-5-3-8', type: 'calcul',
      consigne: 'Sur un trajet de 3 heures, 36 minutes se sont passées à l\'arrêt. Quel pourcentage du trajet cela représente-t-il ? Donne le nombre seul.',
      enonce: '36\\text{ min} \\text{ sur } 3\\text{ h}',
      attendu: 20, piege: 'unites-non-converties', revoir: 'propriete',
    },
    {
      id: 't-5-3-9', type: 'corriger',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{Un sac de } 50 \\text{ billes : } 30\\% \\text{ de rouges, } 20\\% \\text{ du reste de bleues}',
      lignes: [
        { texte: '30 % de 50 = 15, donc il y a 15 billes rouges.', fausse: false },
        { texte: 'Il reste 50 − 15 = 35 billes.', fausse: false },
        { texte: '20 % de 50 = 10, donc il y a 10 billes bleues.', fausse: true },
      ],
      explication:
        'Les deux premières lignes sont justes. À la troisième, le pourcentage a été '
        + 'appliqué au sac entier alors que l\'énoncé dit « 20 % du reste » : '
        + '20 % de 35 = 7. Il y a 7 billes bleues.',
      piege: 'pourcentage-du-mauvais-tout', revoir: 'remarque',
    },
    {
      id: 't-5-3-10', type: 'vraifaux',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Deux remises successives de 10 % reviennent à une seule remise de 20 %.',
      attendu: false,
      contreExemple: {
        invite: 'Choisis un prix de départ, applique-lui deux remises de 10 % l\'une après l\'autre, et donne le prix final.',
        champs: [
          { id: 'a', etiquette: 'prix de départ' },
          { id: 'b', etiquette: 'prix après les deux remises' },
        ],
        // Le prix final doit valoir 0,81 fois le prix de départ, et surtout
        // différer des 0,80 qu'aurait donnés une remise unique de 20 %. On
        // vérifie l'écart, pas un nombre : n'importe quel prix de départ marche.
        valide: (a, b) => a > 0
          && Math.abs(b - 0.81 * a) < 1e-6 * a
          && Math.abs(b - 0.8 * a) > 1e-9,
        exemple:
          'Avec 100 € : 100 → 90 → 81 €. Une remise unique de 20 % aurait donné 80 €. '
          + 'Les deux remises de 10 % enlèvent moins, parce que la seconde porte sur 90 €.',
      },
      piege: 'pourcentage-du-mauvais-tout', revoir: 'remarque',
    },
  ],
};
