// Chapitre 6, savoir-faire 5 — Comparer des nombres écrits avec des puissances
// de 10.
//
// ── Pourquoi le type « comparer » domine ──────────────────────────────────
//
// Le geste réel de l'exercice, c'est de poser un symbole entre deux nombres.
// Faire taper un résultat obligerait à détourner la question (« combien vaut
// ce nombre en entier ? »), et l'élève passerait alors par l'écriture décimale
// — c'est-à-dire par la méthode qu'on cherche justement à lui faire dépasser.
// Six des dix items d'entraînement sont donc des « comparer », et les réponses
// restent partagées : deux « < », trois « > », un « = ».
//
// ── La mantisse qui ment ──────────────────────────────────────────────────
//
// Toute la difficulté tient en un point : le premier nombre se lit d'abord,
// et il ne décide de rien. 9 × 10² est plus PETIT que 1,2 × 10³, alors que 9
// écrase 1,2. On ne peut pas se contenter d'énoncer « l'exposant d'abord » :
// il faut que l'élève voie l'ordre de lecture naturel produire une réponse
// fausse, d'où l'activité construite sur ce couple exact.
//
// Ce piège est rattaché à « exposant-pris-pour-facteur » : son geste de
// contrôle — écrire la puissance en toutes lettres — est exactement celui qui
// répare l'erreur, puisque 10² = 100 et 10³ = 1000 rendent visible le poids
// que l'exposant a et que la mantisse n'a pas.
//
// ── Les deux autres fronts ────────────────────────────────────────────────
//
// Les exposants négatifs, où comparer −5 et −3 rouvre le chapitre 1 : beaucoup
// d'élèves lisent 10⁻⁵ comme « plus grand » parce que 5 > 3.
// Et le format : la règle des exposants ne vaut QUE sur des notations
// scientifiques. 42 × 10³ et 4,2 × 10⁴ sont le même nombre, et 0,4 × 10⁵ est
// plus petit que 6,2 × 10⁴ alors que son exposant est plus grand. Ces deux
// situations sont les seules du savoir-faire où comparer les exposants tout de
// suite est une faute.

export default {
  id: 'sf-6-5',
  titre: 'Comparer des nombres écrits avec des puissances de 10',
  attendus: [
    'Il compare des nombres écrits en notation scientifique.',
    'Il donne un ordre de grandeur d\'un nombre écrit avec une puissance de 10.',
  ],

  // Deux copies plutôt qu'une suite de calculs : le désaccord entre Sacha et
  // Inès EST le problème. L'élève ne découvre pas une règle, il découvre que la
  // lecture de gauche à droite — la plus naturelle — donne la mauvaise réponse.
  decouvrir: {
    titre: 'Deux copies, deux verdicts',
    texte: 'On demande de comparer 9 × 10² et 1,2 × 10³. Voici deux copies.',
    copies: [
      { nom: 'Sacha', calcul: '9 est bien plus grand que 1,2', resultat: '9 × 10² > 1,2 × 10³' },
      { nom: 'Inès', calcul: 'J\'écris les deux nombres en entier avant de comparer', resultat: '9 × 10² < 1,2 × 10³' },
    ],
    question: 'Fais comme Inès : écris chaque nombre sans puissance de 10.',
    champs: [
      { id: 'a', etiquette: '9 × 10² =', attendu: 900 },
      { id: 'b', etiquette: '1,2 × 10³ =', attendu: 1200 },
    ],
    conclusion:
      'C\'est **Inès** : 900 est plus petit que 1200. Le premier nombre se lit '
      + 'd\'abord, mais c\'est l\'**exposant** qui décide — un rang de plus, et le '
      + 'nombre est dix fois plus grand. Face à 1,2 contre 9, la différence '
      + 'd\'exposant l\'emporte quand même.',
  },

  cours: [
    {
      type: 'propriete',
      titre: 'Comparer deux nombres positifs en notation scientifique',
      texte:
        'On compare d\'abord les **exposants** : le nombre qui a le plus grand '
        + 'exposant est le plus grand.\n'
        + 'Si les exposants sont **égaux**, on compare alors les nombres placés '
        + 'devant la puissance de 10.',
    },
    {
      type: 'remarque',
      titre: 'Les exposants se comparent comme des nombres relatifs',
      texte:
        '−3 est plus grand que −5, donc 10⁻³ est plus grand que 10⁻⁵ : 0,001 '
        + 'contre 0,00001.\n'
        + 'Un exposant négatif ne rend pas le nombre négatif — il le rend **petit**, '
        + 'et il reste positif.',
    },
    {
      type: 'remarque',
      titre: 'Vérifie le format avant de comparer les exposants',
      texte:
        'La règle ci-dessus ne vaut que si les deux nombres sont vraiment en '
        + 'notation scientifique, c\'est-à-dire si le nombre placé devant est '
        + '**compris entre 1 et 10** (10 exclu).\n'
        + '0,4 × 10⁵ n\'en est pas une : son exposant est plus grand que celui de '
        + '6,2 × 10⁴, et pourtant 40 000 est plus petit que 62 000. Il faut d\'abord '
        + 'remettre en forme.',
    },
    {
      type: 'definition',
      titre: 'Ordre de grandeur',
      texte:
        'Quand un nombre est écrit en notation scientifique, sa **puissance de 10** '
        + 'donne son **ordre de grandeur** : 4,5 × 10⁻⁴ est de l\'ordre de 10⁻⁴, et '
        + '3,2 × 10⁸ de l\'ordre de 10⁸.\n'
        + 'C\'est ce qui permet de situer deux nombres très éloignés sans écrire un '
        + 'seul zéro.',
    },
    {
      type: 'exemple',
      texte:
        '9 × 10² < 1,2 × 10³, car 2 < 3.\n'
        + '4,9 × 10⁵ > 4,7 × 10⁵, car les exposants sont égaux et 4,9 > 4,7.\n'
        + '8 × 10⁻² > 3 × 10⁻⁴, car −2 > −4.\n'
        + '42 × 10³ = 4,2 × 10⁴ : c\'est le même nombre, 42 000, écrit deux fois.',
    },
  ],

  // La méthode prend exprès deux exposants NÉGATIFS avec une mantisse
  // trompeuse : c'est le cas où les deux difficultés du savoir-faire tombent
  // ensemble, donc celui où la rédaction ligne à ligne sert vraiment.
  methode: {
    titre: 'Comparer deux nombres à exposants négatifs',
    enonce: 'Comparer 4,2 × 10⁻³ et 8,5 × 10⁻⁴.',
    etapes: [
      {
        texte: 'Je vérifie le format : 4,2 et 8,5 sont bien compris entre 1 et 10. Les deux nombres sont en notation scientifique.',
        note: 'Sans ce contrôle, la règle des exposants ne s\'applique pas.',
      },
      {
        texte: 'Je compare les exposants : −3 et −4. Sur une droite graduée, −3 est à droite de −4, donc −3 > −4.',
        note: 'Un exposant se compare comme un nombre relatif, pas comme sa distance à zéro.',
      },
      {
        texte: 'Le plus grand exposant l\'emporte : 4,2 × 10⁻³ > 8,5 × 10⁻⁴.',
        note: 'Les nombres 4,2 et 8,5 ne servent à rien ici : ils ne départagent que des exposants égaux.',
      },
    ],
    controle:
      'Le contrôle : quand tu doutes, écris les deux nombres en entier. '
      + '4,2 × 10⁻³ = 0,0042 et 8,5 × 10⁻⁴ = 0,00085. Compte les zéros juste après '
      + 'la virgule : deux pour le premier, trois pour le second. Plus il y a de '
      + 'zéros, plus le nombre est petit.',
  },

  entrainement: [
    {
      id: 'e-6-5-1', type: 'comparer', palier: 1, piege: 'exposant-pris-pour-facteur',
      consigne: 'Compare ces deux nombres.',
      enonce: '9 \\times 10^{2} \\ldots 1{,}2 \\times 10^{3}', attendu: '<',
      fausses: [{ valeur: '>', piege: 'exposant-pris-pour-facteur' }],
    },
    {
      id: 'e-6-5-2', type: 'comparer', palier: 1, piege: 'exposant-pris-pour-facteur',
      consigne: 'Compare ces deux nombres.',
      enonce: '3{,}5 \\times 10^{4} \\ldots 8{,}1 \\times 10^{3}', attendu: '>',
      fausses: [{ valeur: '<', piege: 'exposant-pris-pour-facteur' }],
    },
    {
      // NEUTRE : les exposants sont égaux, donc comparer les nombres de devant
      // est ici LA bonne méthode. Sans cet item, l'élève remplacerait une règle
      // fausse par une autre — « le premier nombre ne sert jamais » — et il se
      // retrouverait sans rien pour départager deux exposants identiques.
      // L'item n'est pas plus facile : il faut d'abord constater l'égalité des
      // exposants, ce qui est précisément le geste demandé partout ailleurs.
      id: 'e-6-5-3', type: 'comparer', palier: 1, neutre: true, piege: 'exposant-pris-pour-facteur',
      consigne: 'Compare ces deux nombres.',
      enonce: '4{,}9 \\times 10^{5} \\ldots 4{,}7 \\times 10^{5}', attendu: '>',
    },
    {
      // Les mantisses (8 et 3) pointent dans le bon sens : la seule façon de se
      // tromper ici est de lire −2 et −4 comme 2 et 4.
      id: 'e-6-5-4', type: 'comparer', palier: 2, piege: 'exposant-negatif-pris-pour-nombre-negatif',
      consigne: 'Compare ces deux nombres.',
      enonce: '8 \\times 10^{-2} \\ldots 3 \\times 10^{-4}', attendu: '>',
      fausses: [{ valeur: '<', piege: 'exposant-negatif-pris-pour-nombre-negatif' }],
    },
    {
      id: 'e-6-5-5', type: 'comparer', palier: 2, piege: 'exposant-pris-pour-facteur',
      consigne: 'Compare ces deux nombres.',
      enonce: '9 \\times 10^{-5} \\ldots 2 \\times 10^{-3}', attendu: '<',
      fausses: [{ valeur: '>', piege: 'exposant-pris-pour-facteur' }],
    },
    {
      // Le seul item dont la réponse est « = ». Il interdit la stratégie « on me
      // demande de comparer, donc l'un des deux l'emporte », et il oblige à
      // remettre 42 × 10³ en forme avant toute chose.
      id: 'e-6-5-6', type: 'comparer', palier: 2, piege: 'notation-scientifique-mal-cadree',
      consigne: 'Compare ces deux nombres.',
      enonce: '42 \\times 10^{3} \\ldots 4{,}2 \\times 10^{4}', attendu: '=',
      fausses: [{ valeur: '>', piege: 'notation-scientifique-mal-cadree' }],
    },
    {
      id: 'e-6-5-7', type: 'trous', palier: 2, piege: 'exposant-negatif-pris-pour-nombre-negatif',
      consigne: 'Écris chacun de ces nombres sans puissance de 10.',
      enonce: '3 \\times 10^{-2} = \\square \\qquad 5 \\times 10^{3} = \\square',
      champs: [{ id: 'a', etiquette: 'mantisse', attendu: 0.03 }, { id: 'b', etiquette: 'exposant', attendu: 5000 }],
      fausses: [
        { valeur: -0.03, piege: 'exposant-negatif-pris-pour-nombre-negatif' },
        { valeur: 300, piege: 'exposant-negatif-pris-pour-nombre-negatif' },
      ],
    },
    {
      id: 'e-6-5-8', type: 'plausible', palier: 2, piege: 'exposant-negatif-pris-pour-nombre-negatif',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '3 \\times 10^{-5} < 3 \\times 10^{-2}', attendu: true,
      explication:
        '0,00003 contre 0,03. Les deux nombres commencent par 3 : ce sont les '
        + 'exposants qui tranchent, et −5 < −2. L\'affirmation est juste — un '
        + 'exposant plus négatif donne bien un nombre plus petit, et non un nombre '
        + 'en dessous de zéro.',
    },
    {
      id: 'e-6-5-9', type: 'plausible', palier: 3, piege: 'exposant-pris-pour-facteur',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '6 \\times 10^{4} > 2 \\times 10^{5}', attendu: false,
      explication:
        '60 000 contre 200 000 : l\'affirmation est fausse. Le 6 est trois fois '
        + 'plus grand que le 2, mais il ne pèse rien face à un exposant de plus, '
        + 'qui multiplie par 10.',
    },
    {
      id: 'e-6-5-10', type: 'vraifaux', palier: 3, piege: 'exposant-pris-pour-facteur',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Entre deux nombres positifs écrits avec une puissance de 10, le plus grand est celui dont le nombre de devant est le plus grand.',
      attendu: false,
      contreExemple: {
        invite: 'Le nombre 9 × 10² vaut 900. Trouve un exposant n pour que 2 × 10ⁿ le dépasse, alors que 2 est plus petit que 9.',
        champs: [{ id: 'a', etiquette: 'exposant n' }],
        // On vérifie la PROPRIÉTÉ — un exposant assez grand pour renverser la
        // comparaison — et non une valeur unique : 3, 4, 5… conviennent tous.
        valide: (a) => Number.isInteger(a) && 2 * 10 ** a > 900,
        exemple: 'Avec n = 3 : 2 × 10³ = 2000, plus grand que 900 — alors que 2 est bien plus petit que 9.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-6-5-1',
      enonce:
        'La Lune est à environ 3,8 × 10⁵ km de la Terre. Mars, au plus près, se '
        + 'trouve à environ 7,8 × 10⁷ km.',
      questions: [
        { texte: 'Écris la distance Terre-Lune en kilomètres, sans puissance de 10.', attendu: 380000, unite: 'km' },
        { texte: 'Quel est l\'exposant de 10 dans la distance Terre-Mars ?', attendu: 7 },
        { texte: 'Laquelle des deux distances est la plus grande ? Réponds 1 pour la Lune, 2 pour Mars.', attendu: 2 },
      ],
    },
    {
      id: 'p-6-5-2',
      enonce:
        'Un virus mesure environ 1,2 × 10⁻⁷ m. Une bactérie mesure environ '
        + '2 × 10⁻⁶ m.',
      questions: [
        { texte: 'Quel est l\'exposant de 10 dans la taille du virus ?', attendu: -7 },
        { texte: 'Lequel des deux est le plus grand ? Réponds 1 pour le virus, 2 pour la bactérie.', attendu: 2 },
      ],
    },
    {
      id: 'p-6-5-3',
      enonce:
        'Trois villes annoncent leur population : Alma compte 4,5 × 10⁵ habitants, '
        + 'Bréa 9 × 10⁴ habitants et Cerny 1,2 × 10⁶ habitants.',
      questions: [
        { texte: 'Combien d\'habitants compte Bréa ?', attendu: 90000, unite: 'habitants' },
        { texte: 'Quelle est la ville la plus peuplée ? Réponds 1 pour Alma, 2 pour Bréa, 3 pour Cerny.', attendu: 3 },
        { texte: 'Et la moins peuplée ? Même code de réponse.', attendu: 2 },
      ],
    },
    {
      id: 'p-6-5-4',
      enonce:
        'Deux usines annoncent leur production annuelle. La première écrit '
        + '68 × 10⁴ pièces, la seconde 7,1 × 10⁵ pièces. Une seule des deux '
        + 'écritures est une notation scientifique.',
      questions: [
        { texte: 'Réécris 68 × 10⁴ en notation scientifique : quel nombre se place devant la puissance de 10 ?', attendu: 6.8 },
        { texte: 'Quel exposant obtiens-tu alors ?', attendu: 5 },
        { texte: 'Quelle usine produit le plus ? Réponds 1 pour la première, 2 pour la seconde.', attendu: 2 },
      ],
    },
    {
      id: 'p-6-5-5',
      enonce:
        'Un cheveu a un diamètre d\'environ 7 × 10⁻⁵ m. Un globule rouge a un '
        + 'diamètre d\'environ 7 × 10⁻⁶ m.',
      questions: [
        { texte: 'Lequel est le plus large ? Réponds 1 pour le cheveu, 2 pour le globule.', attendu: 1 },
        { texte: 'Combien de globules rouges faut-il aligner pour atteindre le diamètre d\'un cheveu ?', attendu: 10 },
        { texte: 'Écris le diamètre du globule rouge en mètres, sans puissance de 10.', attendu: 0.000007, unite: 'm' },
      ],
    },
  ],

  test: [
    {
      id: 't-6-5-1', type: 'comparer', consigne: 'Compare ces deux nombres.',
      enonce: '5 \\times 10^{6} \\ldots 8 \\times 10^{5}', attendu: '>',
      fausses: [{ valeur: '<', piege: 'exposant-pris-pour-facteur' }],
      revoir: 'propriete',
    },
    {
      id: 't-6-5-2', type: 'comparer', consigne: 'Compare ces deux nombres.',
      enonce: '6 \\times 10^{4} \\ldots 1{,}5 \\times 10^{5}', attendu: '<',
      fausses: [{ valeur: '>', piege: 'exposant-pris-pour-facteur' }],
      revoir: 'propriete',
    },
    {
      id: 't-6-5-3', type: 'comparer', consigne: 'Compare ces deux nombres.',
      enonce: '7 \\times 10^{-3} \\ldots 7 \\times 10^{-5}', attendu: '>',
      fausses: [{ valeur: '<', piege: 'exposant-negatif-pris-pour-nombre-negatif' }],
      revoir: 'remarque',
    },
    {
      id: 't-6-5-4', type: 'comparer', consigne: 'Compare ces deux nombres.',
      enonce: '9 \\times 10^{-8} \\ldots 3 \\times 10^{-6}', attendu: '<',
      fausses: [{ valeur: '>', piege: 'exposant-pris-pour-facteur' }],
      revoir: 'remarque',
    },
    {
      id: 't-6-5-5', type: 'comparer', consigne: 'Compare ces deux nombres.',
      enonce: '25 \\times 10^{2} \\ldots 2{,}5 \\times 10^{3}', attendu: '=',
      fausses: [{ valeur: '>', piege: 'notation-scientifique-mal-cadree' }],
      revoir: 'remarque',
    },
    {
      // L'exposant le plus grand appartient au plus PETIT des deux nombres :
      // c'est le seul cas où comparer les exposants tout de suite est une faute.
      id: 't-6-5-6', type: 'comparer', consigne: 'Compare ces deux nombres.',
      enonce: '0{,}6 \\times 10^{6} \\ldots 8 \\times 10^{5}', attendu: '<',
      fausses: [{ valeur: '>', piege: 'notation-scientifique-mal-cadree' }],
      revoir: 'remarque',
    },
    {
      id: 't-6-5-7', type: 'trous', consigne: 'Écris chacun de ces nombres sans puissance de 10.',
      enonce: '4 \\times 10^{-3} = \\square \\qquad 2 \\times 10^{5} = \\square',
      champs: [{ id: 'a', etiquette: 'mantisse', attendu: 0.004 }, { id: 'b', etiquette: 'exposant', attendu: 200000 }],
      fausses: [{ valeur: -0.004, piege: 'exposant-negatif-pris-pour-nombre-negatif' }],
      revoir: 'remarque',
    },
    {
      id: 't-6-5-8', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: '8 \\times 10^{3} < 5 \\times 10^{4}', attendu: true,
      explication:
        '8000 contre 50 000 : l\'affirmation est juste. Le 8 est plus grand que le '
        + '5, mais l\'exposant de plus renverse la comparaison.',
      revoir: 'propriete',
    },
    {
      id: 't-6-5-9', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: '4 \\times 10^{-2} < 9 \\times 10^{-3}', attendu: false,
      explication:
        '0,04 contre 0,009 : l\'affirmation est fausse. −2 est plus grand que −3, '
        + 'donc 4 × 10⁻² est le plus grand des deux, malgré son 4.',
      piege: 'exposant-pris-pour-facteur', revoir: 'remarque',
    },
    {
      id: 't-6-5-10', type: 'calcul',
      consigne: 'Écris ce nombre en notation scientifique, puis donne l\'exposant de 10.',
      enonce: '0{,}00045', attendu: -4,
      fausses: [{ valeur: 4, piege: 'exposant-negatif-pris-pour-nombre-negatif' }],
      revoir: 'definition',
    },
  ],
};
