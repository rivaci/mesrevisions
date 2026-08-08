// Savoir-faire 3-3 — Calculer la longueur de l'hypoténuse.
//
// C'est le premier usage du théorème direct, et le seul cas où l'on ADDITIONNE
// les carrés. Tout le savoir-faire tient sur deux gestes qui se perdent
// séparément : repérer l'hypoténuse (le côté opposé à l'angle droit), et ne
// pas s'arrêter au carré.
//
// En géométrie, la méthode ne montre pas un résultat : elle montre la
// RÉDACTION attendue en contrôle, phrase par phrase.

export default {
  id: 'sf-3-3',
  titre: 'Calculer la longueur de l\'hypoténuse',
  attendus: [
    'Il utilise le théorème de Pythagore pour calculer la longueur de l\'hypoténuse d\'un triangle rectangle.',
  ],

  // On ne donne pas le théorème : on le fait apparaître comme la régularité
  // commune à deux triangles déjà mesurés. L'élève l'utilise avant qu'il ait
  // un nom — et il découvre au passage que la racine est la dernière étape.
  decouvrir: {
    titre: 'Trois carrés qui se répondent',
    texte:
      'Voici deux triangles rectangles dont on a mesuré les trois côtés. Pour '
      + 'chacun, on a calculé le carré de chaque longueur.',
    lignes: [
      { calcul: 'côtés de l\'angle droit 3 et 4, troisième côté 5', resultat: '3² = 9, 4² = 16, 5² = 25' },
      { calcul: 'côtés de l\'angle droit 6 et 8, troisième côté 10', resultat: '6² = 36, 8² = 64, 10² = 100' },
    ],
    question:
      'Sur chaque ligne, les deux premiers carrés donnent le troisième. Un autre '
      + 'triangle rectangle a des côtés de l\'angle droit de 5 cm et 12 cm : calcule '
      + '5² + 12², puis cherche le nombre dont le carré vaut ce résultat.',
    champs: [
      { id: 'a', etiquette: '5² + 12² =', attendu: 169 },
      { id: 'b', etiquette: 'troisième côté :', attendu: 13 },
    ],
    conclusion:
      'Dans un triangle rectangle, la somme des carrés des deux côtés de l\'angle '
      + 'droit est égale au **carré** du troisième côté. Pour obtenir la longueur '
      + 'elle-même, il reste à prendre la **racine carrée** — c\'est ce que tu viens '
      + 'de faire en trouvant 13.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Hypoténuse',
      texte:
        'Dans un triangle rectangle, l\'**hypoténuse** est le côté **opposé à '
        + 'l\'angle droit** — celui qui ne touche pas le sommet de l\'angle droit. '
        + 'C\'est toujours le côté le plus long.',
    },
    {
      type: 'theoreme',
      titre: 'Théorème de Pythagore',
      texte:
        'Si un triangle ABC est **rectangle en A**, alors :\n'
        + 'BC² = AB² + AC².\n'
        + 'Le carré de l\'hypoténuse est égal à la **somme** des carrés des deux '
        + 'autres côtés.',
    },
    {
      type: 'remarque',
      titre: 'Deux pièges au bout du calcul',
      texte:
        'Le théorème donne BC², pas BC : il faut encore prendre la **racine carrée**.\n'
        + 'Et √(a² + b²) n\'est **pas** a + b : on additionne les carrés d\'abord, on '
        + 'extrait ensuite. Si la somme n\'est pas un carré parfait, on donne une '
        + 'valeur arrondie — au dixième, sauf indication contraire.',
    },
    {
      type: 'exemple',
      texte:
        'ABC rectangle en A, AB = 5 cm et AC = 12 cm :\n'
        + 'BC² = 5² + 12² = 25 + 144 = 169, donc BC = √169 = 13 cm.',
    },
  ],

  methode: {
    titre: 'Rédiger un calcul d\'hypoténuse',
    enonce: 'ABC est un triangle rectangle en A, avec AB = 6 cm et AC = 8 cm. Calculer BC.',
    etapes: [
      {
        texte: 'Le triangle ABC est rectangle en A : son hypoténuse est [BC], le côté opposé à l\'angle droit.',
        note: 'C\'est BC qu\'on cherche, et c\'est bien le côté le plus long.',
      },
      {
        texte: 'D\'après le théorème de Pythagore, BC² = AB² + AC².',
        note: 'Cette phrase se cite en entier : c\'est elle qui justifie la ligne suivante.',
      },
      {
        texte: 'BC² = 6² + 8² = 36 + 64 = 100.',
        note: 'On additionne les carrés, jamais les longueurs.',
      },
      {
        texte: 'Donc BC = √100 = 10 cm.',
        note: 'La racine carrée : l\'étape qu\'on oublie le plus souvent.',
      },
    ],
    controle:
      'Le contrôle : l\'hypoténuse doit être le plus long des trois côtés, mais '
      + 'plus courte que la somme des deux autres. Ici 10 est bien plus grand que 8, '
      + 'et plus petit que 6 + 8 = 14. Si ton résultat sort de cet intervalle, '
      + 'reprends le calcul.',
  },

  entrainement: [
    {
      id: 'e-3-3-1', type: 'calcul', palier: 1, piege: 'racine-oubliee',
      consigne: 'ABC est un triangle rectangle en A. Calcule BC, en cm.',
      enonce: 'AB = 3\\text{ cm} \\quad AC = 4\\text{ cm}',
      attendu: 5,
      fausses: [
        { valeur: 25, piege: 'racine-oubliee' },
        { valeur: 7, piege: 'racine-linearisee' },
      ],
    },
    {
      id: 'e-3-3-2', type: 'calcul', palier: 1, piege: 'racine-linearisee',
      consigne: 'ABC est un triangle rectangle en A. Calcule BC, en cm.',
      enonce: 'AB = 6\\text{ cm} \\quad AC = 8\\text{ cm}',
      attendu: 10,
      fausses: [
        { valeur: 14, piege: 'racine-linearisee' },
        { valeur: 100, piege: 'racine-oubliee' },
      ],
    },
    {
      // L'angle droit n'est plus au premier sommet nommé : la lettre absente de
      // « rectangle en S » ne suffit plus, il faut vraiment chercher le côté
      // opposé. Les triangles de contrôle ne s'appellent pas tous ABC.
      id: 'e-3-3-3', type: 'calcul', palier: 1, piege: 'hypotenuse-mal-identifiee',
      consigne: 'RST est un triangle rectangle en S. Calcule RT, en cm.',
      enonce: 'RS = 9\\text{ cm} \\quad ST = 12\\text{ cm}',
      attendu: 15,
      fausses: [
        { valeur: 225, piege: 'racine-oubliee' },
        { valeur: 21, piege: 'racine-linearisee' },
      ],
    },
    {
      // Neutre : le motif « la réponse tombe toujours ronde » ne joue pas ici.
      // Sans cet item, un résultat non entier serait lu comme une erreur, et
      // l'élève refarait un calcul pourtant juste. La fausse valeur 8 vient de
      // la soustraction — elle, tombe ronde, et c'est exactement ce qui la
      // rend tentante.
      id: 'e-3-3-4', type: 'calcul', palier: 2, neutre: true, piege: 'somme-au-lieu-de-difference',
      consigne: 'ABC est un triangle rectangle en A. Calcule BC en cm, arrondi au dixième.',
      enonce: 'AB = 6\\text{ cm} \\quad AC = 10\\text{ cm}',
      attendu: 11.7,
      fausses: [
        { valeur: 136, piege: 'racine-oubliee' },
        { valeur: 16, piege: 'racine-linearisee' },
        { valeur: 8, piege: 'somme-au-lieu-de-difference' },
      ],
    },
    {
      id: 'e-3-3-5', type: 'trous', palier: 2, piege: 'carre-pris-pour-double',
      consigne: 'ABC est rectangle en A, avec AB = 5 cm et AC = 12 cm. Complète les deux carrés manquants.',
      enonce: 'BC^2 = 5^2 + 12^2 = \\square + \\square = 169',
      champs: [
        { id: 'a', attendu: 25 },
        { id: 'b', attendu: 144 },
      ],
      fausses: [
        { valeur: 10, piege: 'carre-pris-pour-double' },
        { valeur: 24, piege: 'carre-pris-pour-double' },
      ],
    },
    {
      id: 'e-3-3-6', type: 'plausible', palier: 2, piege: 'racine-oubliee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Rectangle en } A : \\quad AB = 5\\text{ cm} \\quad AC = 7\\text{ cm} \\quad BC = 74\\text{ cm}',
      attendu: false,
      explication:
        'ABC est rectangle en A, donc BC² = 25 + 49 = 74. C\'est le **carré** qui '
        + 'vaut 74, pas la longueur : BC = √74 ≈ 8,6 cm. Une hypoténuse de 74 cm à '
        + 'côté de côtés de 5 et 7 cm serait impossible.',
    },
    {
      // Neutre : ici le résultat proposé est juste. Sans cet item, « on me
      // demande si c'est plausible, donc c'est faux » suffirait à réussir la
      // série. Il est même déroutant : 41 dépasse à peine 40.
      id: 'e-3-3-7', type: 'plausible', palier: 2, neutre: true, piege: 'hypotenuse-mal-identifiee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Rectangle en } A : \\quad AB = 9\\text{ cm} \\quad AC = 40\\text{ cm} \\quad BC = 41\\text{ cm}',
      attendu: true,
      explication:
        '9² + 40² = 81 + 1600 = 1681, et 41² = 1681 : l\'égalité tombe juste. '
        + 'L\'hypoténuse dépasse à peine le plus grand côté de l\'angle droit, et '
        + 'c\'est normal quand les deux côtés sont très inégaux.',
    },
    {
      id: 'e-3-3-8', type: 'corriger', palier: 3, piege: 'racine-linearisee',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: 'AB = 5\\text{ cm} \\quad AC = 12\\text{ cm}',
      lignes: [
        { texte: 'Le triangle ABC est rectangle en A, donc BC² = AB² + AC².', fausse: false },
        { texte: 'BC² = 5² + 12² = 25 + 144 = 169', fausse: false },
        { texte: 'BC = 5 + 12 = 17 cm', fausse: true },
        { texte: 'L\'hypoténuse mesure donc 17 cm.', fausse: false },
      ],
      explication:
        'Les deux premières lignes sont justes : le carré vaut bien 169. C\'est à la '
        + 'troisième que ça casse — la racine a été distribuée sur la somme. '
        + '√169 vaut 13, pas 5 + 12. L\'hypoténuse mesure 13 cm.',
    },
    {
      id: 'e-3-3-9', type: 'vraifaux', palier: 3, piege: 'encadrement-inverse',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Si le carré de l\'hypoténuse vaut 50, alors l\'hypoténuse mesure exactement 7 cm.',
      attendu: false,
      contreExemple: {
        invite: 'Encadre √50 entre deux entiers qui se suivent : écris celui du dessous, puis celui du dessus.',
        champs: [
          { id: 'a', etiquette: 'entier juste en dessous' },
          { id: 'b', etiquette: 'entier juste au-dessus' },
        ],
        // On vérifie la PROPRIÉTÉ de l'encadrement — deux entiers consécutifs
        // dont les carrés entourent 50 — et pas une réponse recopiée.
        valide: (a, b) => Number.isInteger(a) && Number.isInteger(b)
          && b === a + 1 && a > 0 && a * a < 50 && b * b > 50,
        exemple: '7² = 49 et 8² = 64, donc 7 < √50 < 8. L\'hypoténuse mesure environ 7,1 cm, pas exactement 7.',
      },
    },
    {
      id: 'e-3-3-10', type: 'calcul', palier: 3, piege: 'hypotenuse-mal-identifiee',
      consigne: 'MNP est un triangle rectangle en N. Calcule MP, en cm.',
      enonce: 'MN = 7\\text{ cm} \\quad NP = 24\\text{ cm}',
      attendu: 25,
      fausses: [
        { valeur: 625, piege: 'racine-oubliee' },
        { valeur: 31, piege: 'racine-linearisee' },
      ],
    },
  ],

  problemes: [
    {
      id: 'p-3-3-1',
      enonce:
        'Une échelle est posée contre un mur vertical, sur un sol horizontal. Son '
        + 'pied est à 1,5 m du mur et son sommet touche le mur à 3,6 m de hauteur. '
        + 'Le mur et le sol forment un angle droit.',
      questions: [
        { texte: 'Quelle est la longueur de l\'échelle ?', attendu: 3.9, unite: 'm' },
      ],
    },
    {
      id: 'p-3-3-2',
      enonce:
        'Un terrain de handball rectangulaire mesure 40 m de long et 20 m de large. '
        + 'Un joueur part d\'un coin et court en ligne droite jusqu\'au coin opposé.',
      questions: [
        { texte: 'Quelle distance parcourt-il, arrondie au dixième de mètre ?', attendu: 44.7, unite: 'm' },
        { texte: 'Combien de mètres économise-t-il par rapport au trajet le long des deux côtés ?', attendu: 15.3, unite: 'm' },
      ],
    },
    {
      id: 'p-3-3-3',
      enonce:
        'Un écran de télévision rectangulaire mesure 80 cm de large et 60 cm de haut. '
        + 'La taille annoncée par le fabricant est la longueur de sa diagonale. On '
        + 'arrondit le pouce à 2,5 cm.',
      questions: [
        { texte: 'Quelle est la longueur de la diagonale ?', attendu: 100, unite: 'cm' },
        { texte: 'Quelle taille en pouces le fabricant annonce-t-il ?', attendu: 40, unite: 'pouces' },
      ],
    },
    {
      id: 'p-3-3-4',
      enonce:
        'Un bateau quitte le port, navigue 8 km plein est, puis 15 km plein nord. '
        + 'Les deux directions forment un angle droit.',
      questions: [
        { texte: 'À quelle distance du port se trouve-t-il alors ?', attendu: 17, unite: 'km' },
        { texte: 'Quelle distance a-t-il réellement parcourue ?', attendu: 23, unite: 'km' },
        { texte: 'Combien de kilomètres aurait-il économisés en allant droit au but ?', attendu: 6, unite: 'km' },
      ],
    },
    {
      id: 'p-3-3-5',
      enonce:
        'Une place rectangulaire mesure 45 m sur 28 m. Un skateur la traverse en '
        + 'diagonale, d\'un coin au coin opposé.',
      questions: [
        { texte: 'Quelle est la longueur de cette diagonale ?', attendu: 53, unite: 'm' },
        { texte: 'Combien de mètres économise-t-il par rapport au trajet le long des deux côtés ?', attendu: 20, unite: 'm' },
      ],
    },
  ],

  test: [
    {
      id: 't-3-3-1', type: 'calcul',
      consigne: 'ABC est rectangle en A. Calcule BC, en cm.',
      enonce: 'AB = 9\\text{ cm} \\quad AC = 12\\text{ cm}',
      attendu: 15, revoir: 'theoreme',
    },
    {
      id: 't-3-3-2', type: 'calcul',
      consigne: 'ABC est rectangle en A. Calcule BC, en cm.',
      enonce: 'AB = 5\\text{ cm} \\quad AC = 12\\text{ cm}',
      attendu: 13, revoir: 'exemple',
    },
    {
      id: 't-3-3-3', type: 'calcul',
      consigne: 'DEF est rectangle en E. Calcule DF, en cm.',
      enonce: 'DE = 8\\text{ cm} \\quad EF = 15\\text{ cm}',
      attendu: 17, revoir: 'definition',
    },
    {
      id: 't-3-3-4', type: 'trous',
      consigne: 'ABC est rectangle en A, avec AB = 7 cm et AC = 24 cm. Complète les deux carrés manquants.',
      enonce: 'BC^2 = 7^2 + 24^2 = \\square + \\square = 625',
      champs: [
        { id: 'a', attendu: 49 },
        { id: 'b', attendu: 576 },
      ],
      revoir: 'theoreme',
    },
    {
      id: 't-3-3-5', type: 'calcul',
      consigne: 'ABC est rectangle en A. Calcule BC en cm, arrondi au dixième.',
      enonce: 'AB = 2\\text{ cm} \\quad AC = 3\\text{ cm}',
      attendu: 3.6, revoir: 'remarque',
    },
    {
      id: 't-3-3-6', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Rectangle en } A : \\quad AB = 8\\text{ cm} \\quad AC = 6\\text{ cm} \\quad BC = 14\\text{ cm}',
      attendu: false,
      explication:
        '8² + 6² = 64 + 36 = 100, donc BC = √100 = 10 cm. La réponse 14 est la '
        + 'somme des deux côtés : la racine a été distribuée sur la somme.',
      piege: 'racine-linearisee', revoir: 'theoreme',
    },
    {
      id: 't-3-3-7', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Rectangle en } A : \\quad AB = 20\\text{ cm} \\quad AC = 21\\text{ cm} \\quad BC = 29\\text{ cm}',
      attendu: true,
      explication: '20² + 21² = 400 + 441 = 841, et 29² = 841. L\'égalité est exacte.',
      revoir: 'exemple',
    },
    {
      id: 't-3-3-8', type: 'vraifaux',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Le théorème de Pythagore s\'applique dans tous les triangles.',
      attendu: false,
      contreExemple: {
        invite: 'Prends un triangle équilatéral : ses trois côtés sont égaux. Choisis la longueur du côté, puis calcule la somme des carrés de deux côtés.',
        champs: [
          { id: 'a', etiquette: 'longueur du côté' },
          { id: 'b', etiquette: 'somme des deux carrés' },
        ],
        // L'élève choisit son côté : on vérifie que sa somme vaut bien 2a² et
        // qu'elle diffère de a², le carré du troisième côté. L'égalité de
        // Pythagore est donc en défaut, quel que soit le côté choisi.
        valide: (a, b) => a > 0 && Math.abs(b - 2 * a * a) < 1e-9 && Math.abs(b - a * a) > 1e-9,
        exemple:
          'Avec un côté de 5 cm : 5² + 5² = 50, alors que le carré du troisième côté '
          + 'vaut 25. L\'égalité est fausse — sans angle droit, le théorème ne s\'applique pas.',
      },
      piege: 'pythagore-sans-angle-droit', revoir: 'theoreme',
    },
    {
      id: 't-3-3-9', type: 'calcul',
      consigne: 'GHI est rectangle en H. Calcule GI, en cm.',
      enonce: 'GH = 12\\text{ cm} \\quad HI = 35\\text{ cm}',
      attendu: 37, revoir: 'definition',
    },
    {
      id: 't-3-3-10', type: 'corriger',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: 'AB = 9\\text{ cm} \\quad AC = 12\\text{ cm}',
      lignes: [
        { texte: 'Le triangle ABC est rectangle en A, donc BC² = AB² + AC².', fausse: false },
        { texte: 'BC² = 9² + 12² = 18 + 24 = 42', fausse: true },
        { texte: 'BC = √42 ≈ 6,5 cm', fausse: false },
      ],
      explication:
        'La première ligne est juste. À la deuxième, les carrés ont été remplacés par '
        + 'des doubles : 9² vaut 81, pas 18, et 12² vaut 144, pas 24. Le bon calcul '
        + 'donne BC² = 81 + 144 = 225, donc BC = 15 cm.',
      piege: 'carre-pris-pour-double', revoir: 'remarque',
    },
  ],
};
