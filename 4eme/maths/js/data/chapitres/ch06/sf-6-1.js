// Savoir-faire 6-1 — Écrire et calculer une puissance.
//
// Premier savoir-faire du chapitre : tout le reste (produit de puissances,
// notation scientifique) s'écroule si l'exposant est lu comme un facteur.
// D'où le choix de ne travailler ici QUE deux gestes, et de les travailler
// jusqu'au bout :
//
//   1. l'exposant compte les facteurs — 2³ vaut 8, pas 6 ;
//   2. la parenthèse décide si le signe est dedans — (−3)² vaut 9, −3² vaut −9.
//
// Le second geste réutilise la règle des signes du chapitre 1 : on ne réapprend
// rien, on applique. C'est aussi pour ça qu'il vient ici plutôt que plus tard.

export default {
  id: 'sf-6-1',
  titre: 'Écrire et calculer une puissance',
  attendus: [
    'Il utilise les puissances d\'exposant entier strictement positif pour simplifier l\'écriture d\'un produit.',
    'Il calcule mentalement des puissances simples : 2³, 5², 10⁴.',
  ],

  // On ne donne pas la définition : on met deux lectures de 2³ face à face, et
  // on laisse le carré — connu depuis la 5e et retravaillé au chapitre 3 —
  // trancher. L'élève ne croit pas sur parole : il teste les deux méthodes sur
  // un cas dont il connaît déjà la réponse.
  decouvrir: {
    titre: 'Le petit chiffre ne multiplie pas',
    texte:
      'On demande de calculer 2³. Voici deux copies, et elles ne donnent pas '
      + 'le même résultat.',
    copies: [
      { nom: 'Sacha', calcul: '2³ = 2 × 3', resultat: '6' },
      { nom: 'Inès', calcul: '2³ = 2 × 2 × 2', resultat: '8' },
    ],
    question:
      'Pour départager, applique chacune des deux méthodes à un carré que tu '
      + 'connais déjà : 3².',
    champs: [
      { id: 'a', etiquette: 'méthode de Sacha, 3 × 2 =', attendu: 6 },
      { id: 'b', etiquette: 'méthode d\'Inès, 3 × 3 =', attendu: 9 },
    ],
    conclusion:
      'Tu sais que 3² vaut **9** : c\'est le nombre de carreaux d\'un carré de '
      + 'côté 3. La méthode de Sacha donne 6, elle est donc fausse. **Inès a '
      + 'raison** : le petit chiffre en haut dit **combien de fois on écrit le '
      + 'facteur**, il ne multiplie pas. Donc 2³ = 2 × 2 × 2 = 8.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Puissance d\'un nombre',
      texte:
        'Pour un nombre a et un entier n supérieur ou égal à 1 :\n'
        + 'aⁿ = a × a × … × a, avec **n facteurs** égaux à a.\n'
        + 'Le nombre a est la **base**, le nombre n est l\'**exposant**. '
        + 'On lit « a exposant n ».',
    },
    {
      type: 'remarque',
      titre: 'Vocabulaire',
      texte:
        'a² se lit « a au carré », a³ se lit « a au cube ».\n'
        + 'Et a¹ = a : un seul facteur, c\'est le nombre lui-même.',
    },
    {
      type: 'propriete',
      titre: 'Signe d\'une puissance d\'un nombre négatif',
      texte:
        'Une puissance d\'un nombre négatif est **positive** si l\'exposant est '
        + '**pair**, **négative** s\'il est **impair**.\n'
        + 'C\'est la règle des signes du chapitre 1 : l\'exposant donne le nombre '
        + 'de facteurs négatifs, et seule sa parité compte.',
    },
    {
      // La distinction que les contrôles sanctionnent le plus, et celle que les
      // calculatrices tranchent silencieusement dans le dos de l'élève.
      type: 'remarque',
      titre: 'Attention : −3² et (−3)² sont différents',
      texte:
        'Dans **(−3)²**, la parenthèse enferme le signe : c\'est −3 tout entier '
        + 'qui est élevé au carré, donc (−3) × (−3) = 9.\n'
        + 'Dans **−3²**, il n\'y a pas de parenthèse : seul le 3 est élevé au '
        + 'carré et le signe reste devant, donc −(3 × 3) = −9.',
    },
    {
      type: 'exemple',
      texte:
        '2³ = 2 × 2 × 2 = 8   ·   5² = 25   ·   10⁴ = 10 000\n'
        + '(−2)³ = −8   ·   (−2)⁴ = 16   ·   −2⁴ = −16',
    },
  ],

  methode: {
    titre: 'Calculer une puissance d\'un nombre négatif',
    enonce: 'Calculer A = (−5)² et B = −5².',
    etapes: [
      {
        texte: 'Dans A, la parenthèse enferme le signe : c\'est le nombre −5 tout entier qui est élevé au carré.',
        note: 'J\'écris la puissance en toutes lettres : A = (−5) × (−5).',
      },
      {
        texte: 'Deux facteurs négatifs, donc un nombre pair de facteurs négatifs : le produit est positif. A = 25.',
        note: 'C\'est la règle des signes du chapitre 1, rien de nouveau.',
      },
      {
        texte: 'Dans B, il n\'y a pas de parenthèse : seul le 5 est élevé au carré, le signe reste devant.',
        note: 'B = −(5 × 5).',
      },
      {
        texte: 'Donc B = −25.',
        note: 'A et B ne sont pas égaux : la parenthèse a tout changé.',
      },
    ],
    controle:
      'Le contrôle : avant de calculer, écris la puissance en toutes lettres. '
      + '(−5)² devient (−5) × (−5), et −5² devient −(5 × 5) — l\'ambiguïté '
      + 'disparaît d\'elle-même. Puis compte les facteurs négatifs : en nombre '
      + 'pair, le résultat est positif.',
  },

  entrainement: [
    {
      id: 'e-6-1-1', type: 'calcul', palier: 1, piege: 'exposant-pris-pour-facteur',
      consigne: 'Calcule.', enonce: '2^{3}', attendu: 8,
      fausses: [{ valeur: 6, piege: 'exposant-pris-pour-facteur' }],
    },
    {
      id: 'e-6-1-2', type: 'calcul', palier: 1, piege: 'exposant-pris-pour-facteur',
      consigne: 'Calcule.', enonce: '5^{4}', attendu: 625,
      fausses: [{ valeur: 20, piege: 'exposant-pris-pour-facteur' }],
    },
    {
      // Neutre, et c'est LE cas neutre du chapitre : 2², c'est le seul endroit
      // où lire l'exposant comme un facteur donne quand même la bonne réponse
      // (2 × 2 des deux côtés). C'est très exactement d'ici que vient la
      // confusion : beaucoup d'élèves ont généralisé à partir de ce cas. Le
      // rencontrer explicitement empêche d'en refaire une règle.
      // Aucune réponse fausse n'est prévisible ici, donc `fausses` est vide.
      id: 'e-6-1-3', type: 'calcul', palier: 1, neutre: true, piege: 'exposant-pris-pour-facteur',
      consigne: 'Calcule.', enonce: '2^{2}', attendu: 4,
      fausses: [],
    },
    {
      id: 'e-6-1-4', type: 'trous', palier: 2, piege: 'exposant-pris-pour-facteur',
      consigne: 'Écris ce produit sous forme de puissance, puis calcule-la.',
      enonce: '3 \\times 3 \\times 3 \\times 3 \\times 3 = 3^{\\square} = \\square',
      champs: [
        { id: 'a', attendu: 5 },
        { id: 'b', attendu: 243 },
      ],
      fausses: [{ valeur: 15, piege: 'exposant-pris-pour-facteur' }],
    },
    {
      id: 'e-6-1-5', type: 'calcul', palier: 2, piege: 'signe-et-exposant',
      consigne: 'Calcule.', enonce: '(-3)^{2}', attendu: 9,
      fausses: [
        { valeur: -9, piege: 'signe-et-exposant' },
        { valeur: -6, piege: 'exposant-pris-pour-facteur' },
      ],
    },
    {
      id: 'e-6-1-6', type: 'calcul', palier: 2, piege: 'signe-et-exposant',
      consigne: 'Calcule.', enonce: '-3^{2}', attendu: -9,
      fausses: [
        { valeur: 9, piege: 'signe-et-exposant' },
        { valeur: -6, piege: 'exposant-pris-pour-facteur' },
      ],
    },
    {
      id: 'e-6-1-7', type: 'plausible', palier: 2, piege: 'exposant-pris-pour-facteur',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '2^{5} = 10', attendu: false,
      explication:
        '2⁵ compte **cinq** facteurs égaux à 2 : 2 × 2 × 2 × 2 × 2 = 32. '
        + 'Le 10 proposé, c\'est 2 × 5 — l\'exposant a été lu comme un facteur.',
    },
    {
      id: 'e-6-1-8', type: 'plausible', palier: 2, piege: 'signe-et-exposant',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '(-2)^{4} = 16', attendu: true,
      explication:
        'La parenthèse enferme le signe : il y a quatre facteurs égaux à −2. '
        + 'Quatre est **pair**, donc le résultat est positif, et 2⁴ = 16. '
        + 'Un résultat positif avec une base négative n\'a rien d\'anormal.',
    },
    {
      id: 'e-6-1-9', type: 'corriger', palier: 3, piege: 'signe-et-exposant',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '-4^{2} + (-4)^{2}',
      lignes: [
        { texte: '−4² + (−4)²', fausse: false },
        { texte: '= 16 + 16', fausse: true },
        { texte: '= 32', fausse: false },
      ],
      explication:
        'L\'erreur est à la deuxième ligne : le premier terme n\'a pas de '
        + 'parenthèse, donc seul le 4 est élevé au carré et le signe reste '
        + 'devant — −4² vaut −16, pas 16. Le second terme, lui, est bien 16. '
        + 'Le bon calcul donne −16 + 16 = 0.',
    },
    {
      id: 'e-6-1-10', type: 'vraifaux', palier: 3, piege: 'signe-et-exposant',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Une puissance d\'un nombre négatif est toujours négative.',
      attendu: false,
      contreExemple: {
        invite: 'Choisis un nombre négatif et un exposant pour lesquels la puissance est positive.',
        champs: [
          { id: 'a', etiquette: 'nombre négatif' },
          { id: 'b', etiquette: 'exposant' },
        ],
        // On vérifie la PROPRIÉTÉ qui rend le contre-exemple valable — base
        // négative et exposant entier pair — et pas un couple précis. Tout
        // exposant pair convient, l'élève choisit le sien.
        valide: (a, b) => a < 0 && Number.isInteger(b) && b > 0 && b % 2 === 0,
        exemple: '(−2)⁴ = 16 : quatre facteurs négatifs, c\'est un nombre pair, donc le produit est positif.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-6-1-1',
      enonce:
        'Une feuille de papier est pliée en deux, puis en deux encore, et ainsi '
        + 'de suite. À chaque pliage, le nombre d\'épaisseurs double. Avant le '
        + 'premier pliage, il y a 1 épaisseur.',
      questions: [
        { texte: 'Combien y a-t-il d\'épaisseurs après 5 pliages ?', attendu: 32, unite: 'épaisseurs' },
        { texte: 'Et après 8 pliages ?', attendu: 256, unite: 'épaisseurs' },
      ],
    },
    {
      id: 'p-6-1-2',
      enonce: 'Un cube en bois a une arête de 6 cm.',
      questions: [
        { texte: 'Quelle est l\'aire d\'une de ses faces ?', attendu: 36, unite: 'cm²' },
        { texte: 'Quel est son volume ?', attendu: 216, unite: 'cm³' },
      ],
    },
    {
      id: 'p-6-1-3',
      enonce:
        'Une culture contient 5 bactéries au départ. Leur nombre est multiplié '
        + 'par 3 toutes les heures.',
      questions: [
        { texte: 'Combien y a-t-il de bactéries au bout de 3 heures ?', attendu: 135, unite: 'bactéries' },
        { texte: 'Et au bout de 4 heures ?', attendu: 405, unite: 'bactéries' },
      ],
    },
    {
      id: 'p-6-1-4',
      enonce:
        'Un tournoi se joue par élimination directe : à chaque tour, la moitié '
        + 'des joueurs est éliminée. Le tournoi compte 6 tours et se termine '
        + 'avec un seul vainqueur.',
      questions: [
        { texte: 'Combien de joueurs participaient au départ ?', attendu: 64, unite: 'joueurs' },
        { texte: 'Combien de joueurs restent après le 2e tour ?', attendu: 16, unite: 'joueurs' },
      ],
    },
    {
      id: 'p-6-1-5',
      enonce:
        'Un cadenas à code possède 4 molettes. Chaque molette porte les chiffres '
        + 'de 0 à 9, et toutes les combinaisons sont autorisées.',
      questions: [
        { texte: 'Combien de codes différents ce cadenas permet-il ?', attendu: 10000, unite: 'codes' },
        { texte: 'Et un modèle à 5 molettes ?', attendu: 100000, unite: 'codes' },
      ],
    },
  ],

  test: [
    {
      id: 't-6-1-1', type: 'calcul', consigne: 'Calcule.',
      enonce: '3^{4}', attendu: 81, revoir: 'definition',
    },
    {
      id: 't-6-1-2', type: 'calcul', consigne: 'Calcule.',
      enonce: '2^{6}', attendu: 64, revoir: 'definition',
    },
    {
      id: 't-6-1-3', type: 'calcul', consigne: 'Calcule.',
      enonce: '10^{3}', attendu: 1000, revoir: 'exemple',
    },
    {
      id: 't-6-1-4', type: 'calcul', consigne: 'Calcule.',
      enonce: '(-2)^{3}', attendu: -8, revoir: 'propriete',
    },
    {
      id: 't-6-1-5', type: 'calcul', consigne: 'Calcule.',
      enonce: '-2^{4}', attendu: -16, revoir: 'remarque',
    },
    {
      id: 't-6-1-6', type: 'calcul', consigne: 'Calcule.',
      enonce: '(-5)^{2}', attendu: 25, revoir: 'propriete',
    },
    {
      id: 't-6-1-7', type: 'trous',
      consigne: 'Écris ce produit sous forme de puissance, puis calcule-la.',
      enonce: '7 \\times 7 \\times 7 = 7^{\\square} = \\square',
      champs: [
        { id: 'a', attendu: 3 },
        { id: 'b', attendu: 343 },
      ],
      revoir: 'definition',
    },
    {
      id: 't-6-1-8', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '4^{3} = 12', attendu: false,
      explication:
        '4³ = 4 × 4 × 4 = 64. Le 12 proposé, c\'est 4 × 3 : l\'exposant a été '
        + 'lu comme un facteur.',
      piege: 'exposant-pris-pour-facteur', revoir: 'definition',
    },
    {
      id: 't-6-1-9', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '(-1)^{7} = -1', attendu: true,
      explication:
        'Sept facteurs égaux à −1, donc sept facteurs négatifs : c\'est un '
        + 'nombre impair, le produit est négatif. Et comme 1⁷ = 1, le résultat '
        + 'est bien −1.',
      revoir: 'propriete',
    },
    {
      id: 't-6-1-10', type: 'corriger',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '(-2)^{5}',
      lignes: [
        { texte: '(−2)⁵ = (−2) × (−2) × (−2) × (−2) × (−2)', fausse: false },
        { texte: '= 32', fausse: true },
        { texte: 'Le résultat est donc 32.', fausse: false },
      ],
      explication:
        'La première ligne est juste : cinq facteurs égaux à −2. C\'est à la '
        + 'deuxième que ça casse — cinq facteurs négatifs, c\'est un nombre '
        + 'impair, donc le produit est négatif. (−2)⁵ = −32.',
      piege: 'signe-et-exposant', revoir: 'propriete',
    },
  ],
};
