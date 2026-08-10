// Savoir-faire 8-3 — Calculer et interpréter des fréquences.
//
// Une fréquence n'est pas un calcul de plus à ranger à côté de la moyenne :
// c'est ce qui rend deux groupes COMPARABLES quand ils n'ont pas la même
// taille. Tant qu'on reste sur les effectifs, « 14 contre 10 » tranche tout
// seul et il n'y a rien à apprendre. D'où la découverte : deux classes où
// l'effectif désigne l'une et la fréquence désigne l'autre.
//
// ── Les deux gestes travaillés, et seulement eux ──────────────────────────
//
//   1. diviser par l'effectif TOTAL, et dans ce sens-là. La fréquence tombe
//      alors entre 0 et 1, son pourcentage entre 0 et 100 — un résultat qui
//      sort de ces bornes est un effectif déguisé, et se repère sans corrigé.
//   2. contrôler par la somme : toutes les fréquences réunies font 1, ou
//      100 %. C'est le seul contrôle qui attrape à la fois la catégorie
//      oubliée et l'effectif recopié à la place de sa part.
//
// Le diagramme circulaire n'est pas un troisième geste : c'est le premier,
// appliqué à 360 au lieu de 100. Il est traité ici parce que l'erreur qu'il
// produit — « 25 %, donc 25° » — est exactement la même confusion entre un
// nombre d'individus et une part du tout.
//
// ── L'item neutre, et d'où vient la confusion ─────────────────────────────
//
// Quand le total vaut 100, l'effectif et la fréquence en pourcentage sont le
// MÊME nombre : 37 sur 100, c'est 37 %. C'est très exactement de là que naît
// la confusion — les sondages qu'on lit sont presque tous « sur 100 ». La
// rencontrer une fois, nommée, empêche d'en faire une règle.

export default {
  id: 'sf-8-3',
  titre: 'Calculer et interpréter des fréquences',
  attendus: [
    'Il calcule des effectifs, des fréquences.',
    'Il exprime une fréquence en pourcentage.',
  ],

  // Le cœur du savoir-faire tient dans ce renversement : l'effectif dit B,
  // la fréquence dit A, et les deux réponses sont des lectures honnêtes des
  // mêmes chiffres. On ne prévient pas — on fait calculer les deux parts, et
  // c'est le calcul de l'élève qui produit la contradiction.
  decouvrir: {
    titre: 'Deux classes, et deux réponses possibles',
    texte:
      'Dans deux classes du collège, on a compté les élèves inscrits au club '
      + 'de sport. Les classes n\'ont pas le même nombre d\'élèves.',
    lignes: [
      { calcul: '\\text{Classe A : } 25 \\text{ élèves}', resultat: '10 \\text{ inscrits au club}' },
      { calcul: '\\text{Classe B : } 40 \\text{ élèves}', resultat: '14 \\text{ inscrits au club}' },
    ],
    question:
      'Dans chaque classe, calcule combien cela ferait d\'inscrits pour 100 '
      + 'élèves : divise le nombre d\'inscrits par l\'effectif de la classe, '
      + 'puis multiplie par 100.',
    champs: [
      { id: 'a', etiquette: 'classe A : 10 ÷ 25 × 100 =', attendu: 40 },
      { id: 'b', etiquette: 'classe B : 14 ÷ 40 × 100 =', attendu: 35 },
    ],
    conclusion:
      'En **nombre d\'élèves**, c\'est la classe B qui a le plus d\'inscrits : '
      + '14 contre 10.\n'
      + 'En **part de la classe**, c\'est la classe A : **40 %** contre 35 %.\n'
      + 'Les deux réponses sont justes, mais elles ne répondent pas à la même '
      + 'question. Le nombre d\'inscrits s\'appelle l\'**effectif** ; la part '
      + 'qu\'il représente s\'appelle la **fréquence**. Dès que les groupes '
      + 'n\'ont pas la même taille, seule la fréquence permet de comparer.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Fréquence d\'une valeur',
      texte:
        'La **fréquence** d\'une valeur (ou d\'une catégorie) est le quotient '
        + 'de son **effectif** par l\'**effectif total** :\n'
        + 'fréquence = effectif ÷ effectif total.\n'
        + 'C\'est donc toujours un nombre compris entre **0 et 1**. Pour '
        + 'l\'exprimer en **pourcentage**, on la multiplie par 100 : elle est '
        + 'alors comprise entre **0 % et 100 %**.',
    },
    {
      type: 'propriete',
      titre: 'La somme des fréquences',
      texte:
        'Si l\'on calcule la fréquence de **toutes** les catégories d\'une '
        + 'série, leur somme vaut exactement **1** — ou **100 %**.\n'
        + 'C\'est normal : réunies, les catégories forment le tout.',
    },
    {
      // Le bloc que l'élève relira le plus : c'est la distinction que la
      // découverte a fait vivre, écrite en clair pour qu'elle soit citable.
      type: 'remarque',
      titre: 'Un effectif et une fréquence ne disent pas la même chose',
      texte:
        'Un **effectif** compte des individus : c\'est un nombre entier, et il '
        + 'peut être aussi grand qu\'on veut.\n'
        + 'Une **fréquence** dit quelle **part du total** ces individus '
        + 'représentent : elle ne dépasse jamais 1, ni 100 %.\n'
        + 'Deux groupes de tailles différentes ne se comparent donc **que** '
        + 'par leurs fréquences.',
    },
    {
      type: 'remarque',
      titre: 'De la fréquence à l\'angle d\'un diagramme circulaire',
      texte:
        'Dans un diagramme circulaire, le disque entier représente l\'effectif '
        + 'total, et il vaut **360°** — pas 100.\n'
        + 'L\'angle d\'une catégorie s\'obtient donc en multipliant sa '
        + 'fréquence par **360** : angle = fréquence × 360.\n'
        + 'Un pourcentage n\'est jamais un nombre de degrés : 25 % ne fait pas '
        + '25°, mais le quart du disque, soit 90°.',
    },
    {
      type: 'exemple',
      texte:
        'Dans un groupe de 20 personnes, 9 ont les yeux bleus.\n'
        + 'Fréquence : 9 ÷ 20 = 0,45, soit 45 %. Angle du secteur : 0,45 × 360 = 162°.',
    },
  ],

  methode: {
    titre: 'Calculer les fréquences d\'une série',
    enonce:
      'Un club compte 50 adhérents : 18 font du judo, 21 du karaté et 11 de '
      + 'l\'aïkido. Calculer la fréquence de chaque discipline, en pourcentage.',
    etapes: [
      {
        texte: 'Je repère l\'effectif total : 50 adhérents.',
        note: 'C\'est lui, et lui seul, qui sert de diviseur pour toutes les catégories.',
      },
      {
        texte: 'Judo : 18 ÷ 50 = 0,36, donc 36 %.',
        note: 'On divise, puis on multiplie par 100 pour passer en pourcentage.',
      },
      {
        texte: 'Karaté : 21 ÷ 50 = 0,42, donc 42 %.',
        note: '',
      },
      {
        texte: 'Aïkido : 11 ÷ 50 = 0,22, donc 22 %.',
        note: '',
      },
      {
        texte: 'Je vérifie : 36 + 42 + 22 = 100.',
        note: 'La somme retombe sur 100 % : rien n\'a été perdu en route.',
      },
    ],
    controle:
      'Le contrôle : additionne toutes tes fréquences. Elles doivent faire '
      + 'exactement 1, ou 100 %. Si la somme dépasse, c\'est qu\'un effectif '
      + 's\'est glissé à la place d\'une fréquence ; si elle n\'y arrive pas, '
      + 'une catégorie a été oubliée. Et avant même d\'additionner : une seule '
      + 'fréquence qui dépasse 100 %, c\'est déjà un effectif.',
  },

  entrainement: [
    {
      id: 'e-8-3-1', type: 'calcul', palier: 1, piege: 'frequence-et-effectif-confondus',
      consigne:
        'Dans une trousse, il y a 12 stylos, dont 3 rouges. Calcule la fréquence '
        + 'des stylos rouges, sous forme décimale.',
      enonce: '\\text{12 stylos en tout} \\qquad \\text{rouges : } 3',
      attendu: 0.25,
      fausses: [
        { valeur: 3, piege: 'frequence-et-effectif-confondus' },
        { valeur: 4, piege: 'frequence-et-effectif-confondus' },
      ],
    },
    {
      id: 'e-8-3-2', type: 'calcul', palier: 1, piege: 'frequence-et-effectif-confondus',
      consigne:
        'Sur 200 personnes interrogées, 46 déclarent préférer le thé. Calcule la '
        + 'fréquence en pourcentage. Donne le nombre seul, sans le signe %.',
      enonce: '\\text{200 personnes} \\qquad \\text{thé : } 46',
      attendu: 23,
      fausses: [{ valeur: 46, piege: 'frequence-et-effectif-confondus' }],
    },
    {
      // NEUTRE, et c'est LE cas neutre du savoir-faire : quand le total vaut
      // 100, l'effectif et la fréquence en pourcentage sont le même nombre.
      // Confondre les deux donne ici la bonne réponse — et c'est précisément
      // de ce cas, omniprésent dans les sondages, que vient la confusion. Le
      // rencontrer explicitement empêche d'en faire une règle.
      // Aucune erreur n'est prévisible ici : `fausses` reste vide.
      id: 'e-8-3-3', type: 'calcul', palier: 1, neutre: true, piege: 'frequence-et-effectif-confondus',
      consigne:
        'Sur 100 personnes interrogées, 37 préfèrent le vélo. Calcule la '
        + 'fréquence en pourcentage. Donne le nombre seul, sans le signe %.',
      enonce: '\\text{100 personnes} \\qquad \\text{vélo : } 37',
      attendu: 37,
      fausses: [],
    },
    {
      id: 'e-8-3-4', type: 'trous', palier: 2, piege: 'frequence-et-effectif-confondus',
      consigne:
        'Un magasin a vendu 40 parfums : 16 floraux, 14 boisés et 10 fruités. '
        + 'Complète les trois fréquences, en pourcentage.',
      enonce: '\\text{floral : } \\square\\% \\qquad \\text{boisé : } \\square\\% \\qquad \\text{fruité : } \\square\\%',
      champs: [
        { id: 'a', etiquette: 'floral, en %', attendu: 40 },
        { id: 'b', etiquette: 'boisé, en %', attendu: 35 },
        { id: 'c', etiquette: 'fruité, en %', attendu: 25 },
      ],
      fausses: [
        { valeur: 16, piege: 'frequence-et-effectif-confondus' },
        { valeur: 14, piege: 'frequence-et-effectif-confondus' },
        { valeur: 10, piege: 'frequence-et-effectif-confondus' },
      ],
    },
    {
      id: 'e-8-3-5', type: 'plausible', palier: 2, piege: 'frequence-et-effectif-confondus',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Sur } 80 \\text{ personnes, } 52 \\text{ aiment le chocolat noir : fréquence } 52\\%',
      attendu: false,
      explication:
        '52, c\'est l\'**effectif** : le nombre de personnes. La fréquence, '
        + 'c\'est ce nombre divisé par le total : 52 ÷ 80 = 0,65, soit **65 %**. '
        + 'Un effectif ne devient un pourcentage que si le total vaut 100.',
    },
    {
      id: 'e-8-3-6', type: 'plausible', palier: 2, piege: 'frequence-et-effectif-confondus',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Sur } 250 \\text{ spectateurs, } 90 \\text{ sont des enfants : fréquence } 36\\%',
      attendu: true,
      explication:
        '90 ÷ 250 = 0,36, soit bien **36 %**. Un pourcentage ne compte pas des '
        + 'personnes, il dit une part : ici il tombe en dessous de l\'effectif '
        + 'parce que le total dépasse 100 — avec un total inférieur à 100, il '
        + 'serait au-dessus. Seule la division tranche.',
    },
    {
      id: 'e-8-3-7', type: 'comparer', palier: 2, piege: 'frequence-et-effectif-confondus',
      consigne: 'Compare ces deux nombres.',
      enonce: '\\dfrac{18}{75} \\ldots \\dfrac{16}{50}',
      attendu: '<',
      fausses: [{ valeur: '>', piege: 'frequence-et-effectif-confondus' }],
    },
    {
      id: 'e-8-3-8', type: 'calcul', palier: 3, piege: 'angle-du-diagramme',
      consigne:
        'Sur 40 élèves, 15 pratiquent le football. On représente cette série par '
        + 'un diagramme circulaire. Calcule l\'angle du secteur « football », en degrés.',
      enonce: '\\text{40 élèves} \\qquad \\text{football : } 15',
      attendu: 135,
      fausses: [
        { valeur: 37.5, piege: 'angle-du-diagramme' },
        { valeur: 15, piege: 'frequence-et-effectif-confondus' },
      ],
    },
    {
      id: 'e-8-3-9', type: 'vraifaux', palier: 3, piege: 'frequence-et-effectif-confondus',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation:
        'Entre deux classes, celle qui compte le plus d\'inscrits au club a forcément la plus grande fréquence d\'inscrits.',
      attendu: false,
      contreExemple: {
        invite:
          'La classe A compte 20 élèves, la classe B en compte 50. Choisis un '
          + 'nombre d\'inscrits dans chacune, de façon que B en ait plus que A '
          + 'mais une fréquence plus petite.',
        champs: [
          { id: 'a', etiquette: 'inscrits en A (sur 20 élèves)' },
          { id: 'b', etiquette: 'inscrits en B (sur 50 élèves)' },
        ],
        // On vérifie la PROPRIÉTÉ qui réfute — B a plus d'inscrits, mais une
        // part plus faible — et non un couple imposé. Beaucoup de réponses
        // conviennent, l'élève choisit la sienne ; les bornes 20 et 50 servent
        // seulement à ce que les effectifs restent possibles.
        valide: (a, b) => a > 0 && a <= 20 && b > a && b <= 50 && a / 20 > b / 50,
        temoin: [10, 20],
        exemple:
          'Avec 10 inscrits en A et 20 en B : B en compte deux fois plus, mais '
          + '10 ÷ 20 = 50 % contre 20 ÷ 50 = 40 %. La classe A est la plus sportive.',
      },
    },
    {
      id: 'e-8-3-10', type: 'corriger', palier: 3, piege: 'angle-du-diagramme',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{Sur } 50 \\text{ élèves, } 20 \\text{ prennent le bus. Angle du secteur ?}',
      lignes: [
        { texte: 'Fréquence du bus : 20 ÷ 50 = 0,4', fausse: false },
        { texte: 'soit 0,4 × 100 = 40 %', fausse: false },
        { texte: 'Angle du secteur : 40°', fausse: true },
      ],
      explication:
        'Les deux premières lignes sont justes. C\'est à la troisième que ça '
        + 'casse : 40 %, ce n\'est pas 40°. Le disque entier vaut 360° et non '
        + '100, donc l\'angle est 0,4 × 360 = **144°**.',
    },
  ],

  problemes: [
    {
      id: 'p-8-3-1',
      enonce:
        'On a interrogé 250 personnes sur leur moyen de transport : 100 viennent '
        + 'en voiture, 75 en transports en commun, 50 à vélo et 25 à pied.',
      questions: [
        { texte: 'Quelle est la fréquence des personnes en voiture, en pourcentage ?', attendu: 40, unite: '%' },
        { texte: 'Et celle des personnes à vélo, en pourcentage ?', attendu: 20, unite: '%' },
      ],
    },
    {
      id: 'p-8-3-2',
      enonce:
        'Un collège compte 300 élèves. Le club de théâtre réunit 24 inscrits, '
        + 'et le club de musique 45.',
      questions: [
        { texte: 'Quelle est la fréquence des inscrits au théâtre, en pourcentage ?', attendu: 8, unite: '%' },
        { texte: 'Et celle des inscrits à la musique, en pourcentage ?', attendu: 15, unite: '%' },
      ],
    },
    {
      id: 'p-8-3-3',
      enonce:
        'Au tournoi de badminton, l\'équipe A a gagné 12 de ses 20 matchs. '
        + 'L\'équipe B en a gagné 15 sur les 30 qu\'elle a joués.',
      questions: [
        { texte: 'Quel pourcentage de ses matchs l\'équipe A a-t-elle gagnés ?', attendu: 60, unite: '%' },
        { texte: 'Et l\'équipe B ?', attendu: 50, unite: '%' },
      ],
    },
    {
      id: 'p-8-3-4',
      enonce:
        'Un professeur veut représenter par un diagramme circulaire l\'animal '
        + 'préféré de ses 40 élèves : 14 disent le chien, 11 le chat, 9 le cheval '
        + 'et 6 le lapin.',
      questions: [
        { texte: 'Quel angle, en degrés, représente le chien ?', attendu: 126, unite: '°' },
        { texte: 'Et le lapin ?', attendu: 54, unite: '°' },
      ],
    },
    {
      id: 'p-8-3-5',
      enonce:
        'Dans une enquête menée auprès de 600 personnes, 35 % déclarent lire au '
        + 'moins un livre par mois.',
      questions: [
        { texte: 'Combien de personnes lisent au moins un livre par mois ?', attendu: 210, unite: 'personnes' },
        { texte: 'Combien de personnes lisent moins d\'un livre par mois ?', attendu: 390, unite: 'personnes' },
      ],
    },
  ],

  test: [
    {
      id: 't-8-3-1', type: 'calcul',
      consigne:
        'Sur 25 élèves, 7 sont arrivés en retard. Fréquence des retards, en '
        + 'pourcentage. Donne le nombre seul.',
      enonce: '\\text{25 élèves} \\qquad \\text{en retard : } 7',
      attendu: 28, revoir: 'definition',
    },
    {
      id: 't-8-3-2', type: 'calcul',
      consigne: 'Sur 50 bonbons, 32 sont rouges. Fréquence des rouges, sous forme décimale.',
      enonce: '\\text{50 bonbons} \\qquad \\text{rouges : } 32',
      attendu: 0.64, revoir: 'definition',
    },
    {
      id: 't-8-3-3', type: 'calcul',
      consigne:
        'Sur 300 spectateurs, 78 sont abonnés. Fréquence des abonnés, en '
        + 'pourcentage. Donne le nombre seul.',
      enonce: '\\text{300 spectateurs} \\qquad \\text{abonnés : } 78',
      attendu: 26, revoir: 'definition',
    },
    {
      id: 't-8-3-4', type: 'trous',
      consigne:
        'Un club de 80 membres compte 28 judokas et 52 karatékas. Complète les '
        + 'deux fréquences, en pourcentage.',
      enonce: '\\text{judo : } \\square\\% \\qquad \\text{karaté : } \\square\\%',
      champs: [
        { id: 'a', etiquette: 'judo, en %', attendu: 35 },
        { id: 'b', etiquette: 'karaté, en %', attendu: 65 },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-8-3-5', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Sur } 60 \\text{ personnes, } 21 \\text{ sont gauchères : fréquence } 21\\%',
      attendu: false,
      explication:
        '21, c\'est l\'effectif. La fréquence vaut 21 ÷ 60 = 0,35, soit **35 %**. '
        + 'Le total n\'est pas 100 : le nombre de personnes et le pourcentage ne '
        + 'peuvent pas coïncider.',
      piege: 'frequence-et-effectif-confondus', revoir: 'remarque',
    },
    {
      id: 't-8-3-6', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Sur } 500 \\text{ votants, } 115 \\text{ ont voté pour A : fréquence } 23\\%',
      attendu: true,
      explication: '115 ÷ 500 = 0,23, soit bien 23 %. Le compte y est.',
      revoir: 'definition',
    },
    {
      id: 't-8-3-7', type: 'corriger',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{Sur } 200 \\text{ personnes, } 50 \\text{ préfèrent le train. Angle du secteur ?}',
      lignes: [
        { texte: 'Fréquence du train : 50 ÷ 200 = 0,25', fausse: false },
        { texte: 'soit 25 %', fausse: false },
        { texte: 'Angle du secteur : 25°', fausse: true },
      ],
      explication:
        'Les deux premières lignes sont justes. L\'erreur est à la troisième : '
        + 'le disque entier vaut 360°, pas 100. L\'angle est donc '
        + '0,25 × 360 = **90°**, c\'est-à-dire le quart du disque.',
      piege: 'angle-du-diagramme', revoir: 'remarque',
    },
    {
      id: 't-8-3-8', type: 'calcul',
      consigne:
        'Sur 25 personnes, 5 préfèrent la montagne. Quel angle, en degrés, '
        + 'représente ce secteur dans un diagramme circulaire ?',
      enonce: '\\text{25 personnes} \\qquad \\text{montagne : } 5',
      attendu: 72, revoir: 'remarque',
    },
    {
      id: 't-8-3-9', type: 'trous',
      consigne:
        'Sur 80 personnes, 18 viennent à pied. Donne la fréquence en pourcentage, '
        + 'puis l\'angle du secteur dans un diagramme circulaire.',
      enonce: '\\text{fréquence : } \\square\\% \\qquad \\text{angle : } \\square\\text{ °}',
      champs: [
        { id: 'a', etiquette: 'fréquence, en %', attendu: 22.5 },
        { id: 'b', etiquette: 'angle, en degrés', attendu: 81 },
      ],
      revoir: 'remarque',
    },
    {
      id: 't-8-3-10', type: 'calcul',
      consigne:
        'Dans un groupe de 400 personnes, la fréquence des lunettes est de 12 %. '
        + 'Combien de personnes portent des lunettes ?',
      enonce: '12\\% \\text{ de } 400',
      attendu: 48, revoir: 'definition',
    },
  ],
};
