// Chapitre 5, savoir-faire 1 — Reconnaître une situation de proportionnalité.
//
// C'est le savoir-faire qui commande tout le chapitre : tant qu'on n'a pas
// répondu à « est-ce proportionnel ? », aucune des techniques qui suivent —
// coefficient, produit en croix, quatrième proportionnelle — n'a le droit
// d'être employée. Les élèves les appliquent pourtant partout, parce qu'on
// leur a presque toujours donné des situations qui l'étaient.
//
// ── Pourquoi tant de situations NON proportionnelles ──────────────────────
//
// L'illusion de linéarité est le piège le mieux documenté du programme : plus
// de 90 % des élèves de 12-13 ans y tombent sur les agrandissements d'aires,
// et De Bock montre qu'elle RÉSISTE à un enseignement ciblé. On ne peut donc
// pas se contenter de l'énoncer une fois : il faut que l'élève rencontre
// l'aire d'un carré, le tarif avec part fixe et les âges assez souvent pour
// que « ça augmente » cesse de vouloir dire « c'est proportionnel ».
//
// ── Le geste, et le contre-geste ──────────────────────────────────────────
//
// Le geste installé ici est le quotient : une colonne, un quotient, et on
// compare. Mais un savoir-faire entièrement fait de situations piégées
// enseignerait la contre-stratégie « rien n'est jamais proportionnel », aussi
// fausse que le piège lui-même. D'où deux items neutres — un périmètre qui
// double vraiment, et une affirmation vraie sur l'alignement avec l'origine.

export default {
  id: 'sf-5-1',
  titre: 'Reconnaître une situation de proportionnalité',
  attendus: [
    'Il reconnaît une situation de proportionnalité dans un tableau ou sur un graphique.',
    'Il reconnaît une situation de proportionnalité ou de non-proportionnalité.',
  ],

  // Deux tableaux jumeaux : mêmes nombres à gauche, présentation identique.
  // Rien ne les distingue à l'œil — c'est le quotient, et lui seul, qui les
  // sépare. L'élève découvre donc le critère en s'en servant, avant qu'on le
  // nomme, et découvre du même coup qu'une situation peut ne pas être
  // proportionnelle sans avoir l'air bizarre.
  decouvrir: {
    titre: 'Deux tableaux qui se ressemblent',
    texte:
      'Voici deux situations, écrites de la même façon. Dans les deux, le '
      + 'premier nombre passe de 2 à 5 puis à 8.',
    lignes: [
      {
        calcul: '\\text{Croissants : } 2 \\;\\; 5 \\;\\; 8',
        resultat: '\\text{prix en euros : } 1{,}80 \\;\\; 4{,}50 \\;\\; 7{,}20',
      },
      {
        calcul: '\\text{Côté d\'un carré en cm : } 2 \\;\\; 5 \\;\\; 8',
        resultat: '\\text{aire en cm}^2 \\text{ : } 4 \\;\\; 25 \\;\\; 64',
      },
    ],
    question:
      'Dans chaque situation, divise le second nombre par le premier, pour la '
      + 'colonne du milieu.',
    champs: [
      { id: 'a', etiquette: '4,50 ÷ 5 =', attendu: 0.9 },
      { id: 'b', etiquette: '25 ÷ 5 =', attendu: 5 },
    ],
    conclusion:
      'Chez les croissants, ce quotient vaut **0,9 partout** : 1,80 ÷ 2 = 0,9, '
      + '4,50 ÷ 5 = 0,9 et 7,20 ÷ 8 = 0,9. Chaque croissant coûte 0,90 €.\n'
      + 'Chez le carré, il vaut 2, puis 5, puis 8 : il change à chaque colonne.\n'
      + 'La première situation est **proportionnelle**, la seconde **ne l\'est '
      + 'pas** — et pourtant elles se ressemblaient. C\'est ce quotient qui les '
      + 'sépare, rien d\'autre.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Situation de proportionnalité',
      texte:
        'Deux grandeurs sont **proportionnelles** lorsqu\'on passe de l\'une à '
        + 'l\'autre en multipliant **toujours par le même nombre**.\n'
        + 'Ce nombre s\'appelle le **coefficient de proportionnalité**.',
    },
    {
      type: 'propriete',
      titre: 'Reconnaître dans un tableau',
      texte:
        'On calcule, pour **chaque colonne**, le quotient de la seconde ligne '
        + 'par la première.\n'
        + 'Si tous ces quotients sont **égaux**, le tableau est un tableau de '
        + 'proportionnalité, et ce quotient commun est le coefficient.\n'
        + 'Un **seul** quotient différent suffit à conclure que la situation '
        + 'n\'est pas proportionnelle.',
    },
    {
      type: 'propriete',
      titre: 'Reconnaître sur un graphique',
      texte:
        'La situation est proportionnelle lorsque les points sont **alignés** '
        + '**et** que la droite passe par l\'**origine** du repère.\n'
        + 'Des points alignés dont la droite ne passe pas par l\'origine ne '
        + 'représentent **pas** une situation proportionnelle : les deux '
        + 'conditions comptent.',
    },
    {
      // Le bloc le plus important du savoir-faire : trois familles de
      // situations que les élèves traitent presque toujours comme
      // proportionnelles. Les nommer une par une vaut mieux qu'un « attention,
      // ce n'est pas toujours proportionnel » que personne ne retient.
      type: 'remarque',
      titre: 'Trois situations qui ne sont pas proportionnelles',
      texte:
        'L\'**aire** d\'un carré et son côté : si le côté double, l\'aire est '
        + 'multipliée par quatre.\n'
        + 'Un **tarif avec une part fixe** (abonnement, prise en charge, frais '
        + 'de livraison) : la part fixe ne se paie qu\'une fois.\n'
        + 'Les **âges** de deux personnes : l\'écart reste le même, pas le '
        + 'rapport.',
    },
    {
      type: 'exemple',
      texte:
        'Croissants 2 · 5 · 8 et prix 1,80 · 4,50 · 7,20 : les quotients valent '
        + '0,9 ; 0,9 ; 0,9. C\'est proportionnel, de coefficient 0,9.\n'
        + 'Côté 2 · 5 · 8 et aire 4 · 25 · 64 : les quotients valent 2 ; 5 ; 8. '
        + 'Ce n\'est pas proportionnel.',
    },
  ],

  // La méthode prend exprès un tarif avec part fixe : c'est la situation où
  // « ça augmente régulièrement » ressemble le plus à de la proportionnalité,
  // donc celle où le calcul des quotients sert vraiment à quelque chose.
  methode: {
    titre: 'Décider si une situation est proportionnelle',
    enonce:
      'Un plombier facture 40 € de déplacement, puis 30 € par heure de travail. '
      + 'Pour 1 h il demande 70 €, pour 2 h 100 €, pour 4 h 160 €. Le prix est-il '
      + 'proportionnel à la durée ?',
    etapes: [
      {
        texte: 'Je calcule le quotient de la première colonne : 70 ÷ 1 = 70.',
        note: 'Ce serait le prix d\'une heure si la situation était proportionnelle.',
      },
      {
        texte: 'Je calcule celui de la deuxième : 100 ÷ 2 = 50.',
        note: '50 n\'est pas 70 : les deux quotients diffèrent déjà.',
      },
      {
        texte: 'Je m\'arrête là : le prix n\'est pas proportionnel à la durée.',
        note: 'Inutile de faire la troisième colonne — un seul quotient différent suffit.',
      },
      {
        texte: 'Ce qui casse la proportionnalité, c\'est le déplacement : 40 € payés une seule fois, quelle que soit la durée.',
        note: 'Dire POURQUOI, c\'est ce qui distingue une réponse d\'un résultat.',
      },
    ],
    controle:
      'Le contrôle : essaie de doubler. 1 h coûte 70 €, mais 2 h coûtent 100 € '
      + 'et non 140 €. Si doubler la première grandeur ne double pas la seconde, '
      + 'la situation n\'est pas proportionnelle — et ce test se fait de tête, '
      + 'sans poser un seul calcul.',
  },

  entrainement: [
    {
      id: 'e-5-1-1', type: 'calcul', palier: 1, piege: 'traitement-additif',
      consigne:
        'Ce tableau est un tableau de proportionnalité. Calcule son coefficient : '
        + 'le nombre par lequel on multiplie la première ligne pour obtenir la seconde.',
      enonce: '\\text{Masse en kg : } 4 \\;\\; 6 \\;\\; 10 \\qquad \\text{Prix en euros : } 10 \\;\\; 15 \\;\\; 25',
      attendu: 2.5,
      fausses: [
        { valeur: 6, piege: 'traitement-additif' },
        { valeur: 0.4, piege: 'grandeur-quotient-inversee' },
      ],
    },
    {
      id: 'e-5-1-2', type: 'trous', palier: 2, piege: 'traitement-additif',
      consigne:
        'Voici deux colonnes d\'un tableau. Calcule le quotient de chacune, pour '
        + 'savoir si le tableau est un tableau de proportionnalité.',
      enonce: '\\dfrac{7{,}5}{3} = \\square \\qquad \\dfrac{20}{8} = \\square',
      champs: [
        { id: 'a', attendu: 2.5 },
        { id: 'b', attendu: 2.5 },
      ],
      fausses: [
        { valeur: 4.5, piege: 'traitement-additif' },
        { valeur: 12, piege: 'traitement-additif' },
      ],
    },
    {
      id: 'e-5-1-3', type: 'plausible', palier: 2, piege: 'illusion-de-linearite',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Carré de côté } 3\\text{ cm : aire } 9\\text{ cm}^2 \\qquad '
        + '\\text{carré de côté } 6\\text{ cm : aire } 18\\text{ cm}^2',
      attendu: false,
      explication:
        'Le carré de côté 6 cm a pour aire 6 × 6 = **36 cm²**. Quand le côté '
        + 'double, l\'aire est multipliée par **quatre** : le grand carré contient '
        + 'quatre carrés de côté 3 cm. L\'aire n\'est pas proportionnelle au côté.',
    },
    {
      // NEUTRE : le périmètre, lui, EST proportionnel au côté, et doubler le
      // côté double vraiment le périmètre. L'item ressemble trait pour trait au
      // précédent — mêmes carrés, mêmes longueurs — mais le piège n'y joue pas.
      // Sans lui, l'élève apprendrait « dès qu'on parle de carré, il faut
      // multiplier par quatre », ce qui est une règle aussi fausse que l'autre.
      id: 'e-5-1-4', type: 'plausible', palier: 2, neutre: true, piege: 'illusion-de-linearite',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Carré de côté } 3\\text{ cm : périmètre } 12\\text{ cm} \\qquad '
        + '\\text{carré de côté } 6\\text{ cm : périmètre } 24\\text{ cm}',
      attendu: true,
      explication:
        'Le périmètre vaut quatre fois le côté : 4 × 6 = 24 cm. Ici, doubler le '
        + 'côté double bien le périmètre, parce que le périmètre **est** '
        + 'proportionnel au côté. C\'est l\'aire qui ne l\'est pas.',
    },
    {
      id: 'e-5-1-5', type: 'plausible', palier: 2, piege: 'illusion-de-linearite',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Inscription } 20\\text{ euros, puis } 15\\text{ euros par mois} \\qquad '
        + '3\\text{ mois : } 65 \\qquad 6\\text{ mois : } 130',
      attendu: false,
      explication:
        'Six mois coûtent 20 + 6 × 15 = **110 euros**, pas 130. L\'inscription de '
        + '20 euros ne se paie qu\'une seule fois : doubler la durée ne double '
        + 'donc pas la facture. Un tarif avec une part fixe n\'est jamais '
        + 'proportionnel.',
    },
    {
      id: 'e-5-1-6', type: 'vraifaux', palier: 3, piege: 'illusion-de-linearite',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Si on double le côté d\'un carré, on double son aire.',
      attendu: false,
      contreExemple: {
        invite: 'Choisis la longueur du côté d\'un carré, puis donne l\'aire du carré dont le côté est le double.',
        champs: [
          { id: 'a', etiquette: 'côté choisi' },
          { id: 'b', etiquette: 'aire du carré de côté double' },
        ],
        // On vérifie la PROPRIÉTÉ : l'aire annoncée vaut bien celle du carré de
        // côté doublé (4a²) et diffère du double de l'aire de départ (2a²).
        // N'importe quel côté convient — l'élève choisit le sien.
        valide: (a, b) => a > 0
          && Math.abs(b - 4 * a * a) < 1e-9
          && Math.abs(b - 2 * a * a) > 1e-9,
        exemple:
          'Avec un côté de 3 : le carré de côté 6 a pour aire 36, alors que le '
          + 'double de 9 vaut 18. L\'aire est multipliée par quatre, pas par deux.',
      },
    },
    {
      id: 'e-5-1-7', type: 'vraifaux', palier: 3, piege: 'illusion-de-linearite',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Sur un graphique, si les points sont alignés, alors la situation est proportionnelle.',
      attendu: false,
      contreExemple: {
        invite:
          'Un taxi facture une prise en charge fixe, puis un prix par kilomètre : '
          + 'ses points sont alignés. Choisis un tel tarif, puis donne le prix '
          + 'd\'une course de 1 km et celui d\'une course de 2 km.',
        champs: [
          { id: 'a', etiquette: 'prix pour 1 km' },
          { id: 'b', etiquette: 'prix pour 2 km' },
        ],
        // La propriété qui réfute : le prix augmente (donc les points montent
        // en ligne droite) sans que doubler la distance double le prix. Tout
        // tarif avec prise en charge convient.
        valide: (a, b) => a > 0 && b > a && Math.abs(b - 2 * a) > 1e-9,
        exemple:
          'Avec 4 euros de prise en charge et 2 euros par kilomètre : 1 km coûte '
          + '6 euros et 2 km coûtent 8 euros, pas 12. Les points sont bien '
          + 'alignés, mais la droite ne passe pas par l\'origine.',
      },
    },
    {
      id: 'e-5-1-8', type: 'corriger', palier: 3, piege: 'illusion-de-linearite',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{Un taxi facture } 4\\text{ euros de prise en charge, puis } 2\\text{ euros par kilomètre.}',
      lignes: [
        { texte: 'Une course de 5 km coûte 4 + 5 × 2 = 14 €.', fausse: false },
        { texte: 'Le prix augmente régulièrement avec la distance : il lui est donc proportionnel.', fausse: true },
        { texte: '10 km, c\'est le double de 5 km, donc une course de 10 km coûte 28 €.', fausse: false },
      ],
      explication:
        'La première ligne est juste, et la troisième raisonne correctement — mais '
        + 'à partir d\'une affirmation fausse. C\'est la deuxième qui casse tout : '
        + '« augmenter régulièrement » n\'est pas « être proportionnel ». Les 4 € '
        + 'de prise en charge se paient une seule fois, quelle que soit la '
        + 'distance. Une course de 10 km coûte 4 + 10 × 2 = **24 €**, pas 28 €.',
    },
    {
      id: 'e-5-1-9', type: 'trous', palier: 3, piege: 'traitement-additif',
      consigne: 'Ces deux grandeurs sont proportionnelles. Complète le tableau.',
      enonce: '\\text{Nombre de cahiers : } 4 \\;\\; \\square \\qquad \\text{Prix en euros : } 6 \\;\\; 15',
      champs: [{ id: 'a', attendu: 10 }],
      fausses: [{ valeur: 13, piege: 'traitement-additif' }],
    },
    {
      // NEUTRE, et pour la raison inverse des autres : ici l'affirmation est
      // VRAIE. Neuf items sur dix invitent à répondre « ce n'est pas
      // proportionnel » ; sans celui-ci, la méfiance systématique suffirait à
      // réussir la série, et remplacerait l'illusion de linéarité par la
      // contre-illusion « rien n'est jamais proportionnel ». Le « toujours »
      // de l'énoncé est là exprès : il faut résister à l'idée qu'un « toujours »
      // annonce forcément un piège.
      id: 'e-5-1-10', type: 'vraifaux', palier: 3, neutre: true, piege: 'illusion-de-linearite',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Des points alignés avec l\'origine du repère représentent toujours une situation de proportionnalité.',
      attendu: true,
    },
  ],

  problemes: [
    {
      id: 'p-5-1-1',
      enonce:
        'Au marché, 3 kg de pommes coûtent 5,40 €. Le prix est proportionnel à '
        + 'la masse achetée.',
      questions: [
        { texte: 'Combien coûte 1 kg de pommes ?', attendu: 1.8, unite: '€' },
        { texte: 'Combien coûtent 7 kg ?', attendu: 12.6, unite: '€' },
      ],
    },
    {
      id: 'p-5-1-2',
      enonce:
        'Un carré de côté 5 cm est agrandi : son côté est multiplié par 3.',
      questions: [
        { texte: 'Quelle est l\'aire du carré de départ ?', attendu: 25, unite: 'cm²' },
        { texte: 'Quelle est l\'aire du carré agrandi ?', attendu: 225, unite: 'cm²' },
        { texte: 'Par combien l\'aire a-t-elle été multipliée ?', attendu: 9 },
      ],
    },
    {
      id: 'p-5-1-3',
      enonce:
        'Une salle d\'escalade propose deux formules. Sans abonnement, chaque '
        + 'séance coûte 12 €. Avec abonnement, on paie 45 € à l\'inscription, '
        + 'puis 6 € par séance.',
      questions: [
        { texte: 'Combien coûtent 5 séances sans abonnement ?', attendu: 60, unite: '€' },
        { texte: 'Combien coûtent 5 séances avec abonnement ?', attendu: 75, unite: '€' },
        { texte: 'À partir de combien de séances la formule avec abonnement devient-elle la moins chère ?', attendu: 8, unite: 'séances' },
      ],
    },
    {
      id: 'p-5-1-4',
      enonce:
        'Un cycliste roule à allure régulière. On a relevé sur un graphique les '
        + 'points (1 h ; 18 km), (2 h ; 36 km) et (3 h ; 54 km).',
      questions: [
        { texte: 'Quel est le quotient distance ÷ temps pour le premier point ?', attendu: 18, unite: 'km/h' },
        { texte: 'Et pour le troisième point ?', attendu: 18, unite: 'km/h' },
        { texte: 'Quelle distance parcourrait-il en 5 heures ?', attendu: 90, unite: 'km' },
      ],
    },
    {
      id: 'p-5-1-5',
      enonce:
        'Léa a 12 ans et son frère Malo en a 8. Léa affirme que leurs âges sont '
        + 'proportionnels.',
      questions: [
        { texte: 'Quel âge aura Malo quand Léa aura 24 ans ?', attendu: 20, unite: 'ans' },
        { texte: 'Si les deux âges étaient proportionnels, quel âge Malo aurait-il quand Léa a 24 ans ?', attendu: 16, unite: 'ans' },
      ],
    },
  ],

  test: [
    {
      id: 't-5-1-1', type: 'calcul',
      consigne: 'Ce tableau est un tableau de proportionnalité. Calcule son coefficient.',
      // Les écarts colonne par colonne valent 9, 21 et 36 : aucun ne tombe sur
      // 4. Un élève qui soustrait au lieu de diviser ne peut donc pas trouver
      // la bonne réponse par accident, et son erreur reste lisible.
      enonce: '\\text{Masse en kg : } 3 \\;\\; 7 \\;\\; 12 \\qquad \\text{Prix en euros : } 12 \\;\\; 28 \\;\\; 48',
      attendu: 4,
      fausses: [
        { valeur: 9, piege: 'traitement-additif' },
        { valeur: 0.25, piege: 'grandeur-quotient-inversee' },
      ],
      revoir: 'definition',
    },
    {
      id: 't-5-1-2', type: 'trous',
      consigne: 'Ce tableau associe 2 à 9 et 5 à 20. Calcule les deux quotients.',
      enonce: '\\dfrac{9}{2} = \\square \\qquad \\dfrac{20}{5} = \\square',
      champs: [
        { id: 'a', attendu: 4.5 },
        { id: 'b', attendu: 4 },
      ],
      fausses: [
        { valeur: 7, piege: 'traitement-additif' },
        { valeur: 15, piege: 'traitement-additif' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-5-1-3', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Carré de côté } 4\\text{ cm : aire } 16\\text{ cm}^2 \\qquad '
        + '\\text{carré de côté } 12\\text{ cm : aire } 48\\text{ cm}^2',
      attendu: false,
      explication:
        'Le carré de côté 12 cm a pour aire 12 × 12 = **144 cm²**. Le côté est '
        + 'multiplié par 3, donc l\'aire par 3 × 3 = 9 : 16 × 9 = 144. Multiplier '
        + 'l\'aire par 3 reviendrait à la croire proportionnelle au côté.',
      piege: 'illusion-de-linearite', revoir: 'remarque',
    },
    {
      id: 't-5-1-4', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{À allure constante : } 18\\text{ km en } 1\\text{ h} \\qquad 45\\text{ km en } 2\\text{ h } 30\\text{ min}',
      attendu: true,
      explication:
        '2 h 30 min, c\'est 2,5 h. À allure constante, la distance est bien '
        + 'proportionnelle au temps : 18 × 2,5 = 45 km. Le résultat est juste — '
        + 'à condition d\'avoir converti les minutes en heures avant de calculer.',
      piege: 'unites-non-converties', revoir: 'exemple',
    },
    {
      id: 't-5-1-5', type: 'vraifaux',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Dans un tableau de proportionnalité, le quotient de la seconde ligne par la première est le même dans toutes les colonnes.',
      attendu: true,
      revoir: 'propriete',
    },
    {
      id: 't-5-1-6', type: 'vraifaux',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Si le périmètre d\'un carré double, son aire double aussi.',
      attendu: false,
      contreExemple: {
        invite: 'Choisis le côté d\'un carré, puis donne l\'aire du carré dont le périmètre est le double.',
        champs: [
          { id: 'a', etiquette: 'côté choisi' },
          { id: 'b', etiquette: 'aire du carré au périmètre double' },
        ],
        // Doubler le périmètre revient à doubler le côté : l'aire attendue vaut
        // 4a², et elle doit différer du double de l'aire de départ.
        valide: (a, b) => a > 0
          && Math.abs(b - 4 * a * a) < 1e-9
          && Math.abs(b - 2 * a * a) > 1e-9,
        exemple:
          'Un carré de côté 3 a un périmètre de 12 et une aire de 9. Celui de '
          + 'périmètre 24 a pour côté 6 et pour aire 36 : quatre fois plus, pas deux.',
      },
      piege: 'illusion-de-linearite', revoir: 'remarque',
    },
    {
      id: 't-5-1-7', type: 'corriger',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{Nombre de croissants : } 4 \\;\\; 10 \\qquad \\text{Prix en euros : } 3{,}60 \\;\\; 9{,}50',
      lignes: [
        { texte: 'Quotient de la première colonne : 3,60 ÷ 4 = 0,90.', fausse: false },
        { texte: 'Quotient de la seconde colonne : 9,50 ÷ 10 = 0,95.', fausse: false },
        { texte: 'Les deux quotients sont proches, donc le tableau est un tableau de proportionnalité.', fausse: true },
      ],
      explication:
        'Les deux calculs sont justes. C\'est la conclusion qui est fausse : '
        + '« proches » ne suffit pas, il faut que les quotients soient **égaux**. '
        + '0,90 et 0,95 diffèrent, donc le tableau n\'est pas un tableau de '
        + 'proportionnalité.',
      piege: 'illusion-de-linearite', revoir: 'propriete',
    },
    {
      id: 't-5-1-8', type: 'trous',
      consigne: 'Ces deux grandeurs sont proportionnelles. Complète le tableau.',
      enonce: '\\text{Temps en h : } 2 \\;\\; 5 \\qquad \\text{Distance en km : } 30 \\;\\; \\square',
      champs: [{ id: 'a', attendu: 75 }],
      fausses: [{ valeur: 33, piege: 'traitement-additif' }],
      revoir: 'definition',
    },
    {
      id: 't-5-1-9', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Un robinet remplit } 6\\text{ L en } 4\\text{ min} \\qquad 9\\text{ L en } 6\\text{ min}',
      attendu: true,
      explication:
        '6 L en 4 min, c\'est 1,5 L par minute. Pour 9 L il faut donc 9 ÷ 1,5 = 6 min : '
        + 'le résultat est juste. Ajouter 3 min parce qu\'on ajoute 3 L donnerait 7 min, '
        + 'mais en proportionnalité on multiplie, on n\'ajoute pas.',
      piege: 'traitement-additif', revoir: 'exemple',
    },
    {
      id: 't-5-1-10', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Rectangle } 3\\text{ cm sur } 5\\text{ cm : aire } 15\\text{ cm}^2 \\qquad '
        + '\\text{dimensions doublées : aire } 30\\text{ cm}^2',
      attendu: false,
      explication:
        'Les dimensions deviennent 6 cm et 10 cm, donc l\'aire vaut 60 cm². '
        + 'Doubler **deux** longueurs multiplie l\'aire par 2 × 2 = 4, pas par 2.',
      piege: 'illusion-de-linearite', revoir: 'remarque',
    },
  ],
};
