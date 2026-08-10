// Savoir-faire 7-4 — Développer un produit.
//
// C'est le geste que le lycée réclame le plus, et celui que la 4e rate le plus
// souvent. La raison est connue depuis Pépite : l'élève ne « oublie » pas le
// second terme, il applique une règle qui lui paraît complète — le facteur se
// pose sur ce qu'il touche, c'est-à-dire sur le premier terme. Répéter « il
// faut tout multiplier » ne défait pas cette règle-là.
//
// D'où deux partis pris :
//
//   1. La distributivité n'est pas annoncée, elle est CONSTATÉE. On compte le
//      même rectangle de deux façons, et les deux comptes tombent pareil. Le
//      « paquet » n'est pas une image décorative : c'est ce qui rend évident
//      que le facteur porte sur tout ce qu'il y a dedans.
//   2. Le contrôle est numérique. Remplacer la lettre par un nombre et comparer
//      les deux écritures, c'est le seul geste qui survit au contrôle sans
//      l'appli — et il attrape TOUS les pièges de ce savoir-faire d'un coup.
//
// Le moins devant la parenthèse est traité ici, pas ailleurs : c'est le même
// geste avec k = −1, et l'isoler en ferait une règle de plus à retenir. La
// double distributivité (a + b)(c + d) est en 3e ; on n'y touche pas.

export default {
  id: 'sf-7-4',
  titre: 'Développer un produit',
  attendus: [
    'Il développe une expression du type k(a + b) en utilisant la distributivité simple.',
    'Il développe une expression comportant un signe moins devant une parenthèse.',
  ],

  // On ne montre pas la règle : on montre qu'elle tient. Les deux premières
  // lignes fournissent la preuve pour une valeur, et l'élève la refait pour une
  // autre — c'est lui qui constate que ce n'était pas un accident. La question
  // porte sur des nombres, jamais sur la lettre : à ce stade il n'y a encore
  // aucune règle à appliquer.
  decouvrir: {
    titre: 'Deux façons de compter le même rectangle',
    texte:
      'Un rectangle a 5 carreaux de hauteur. Sa largeur est faite de deux '
      + 'morceaux : un morceau de longueur x, et un morceau de longueur 4. On '
      + 'peut compter ses carreaux d\'un seul coup, ou morceau par morceau.',
    lignes: [
      { calcul: 'avec x = 6, d\'un seul coup : 5 × (6 + 4)', resultat: '50' },
      { calcul: 'avec x = 6, morceau par morceau : 5 × 6 + 5 × 4', resultat: '50' },
    ],
    question: 'Recommence avec x = 10 : calcule les deux écritures.',
    champs: [
      { id: 'a', etiquette: 'd\'un seul coup : 5 × (10 + 4) =', attendu: 70 },
      { id: 'b', etiquette: 'morceau par morceau : 5 × 10 + 5 × 4 =', attendu: 70 },
    ],
    conclusion:
      'Les deux écritures donnent **toujours** le même nombre, et ce n\'est pas '
      + 'un hasard : 5 paquets de (x + 4), ce sont 5 paquets de x **et** 5 '
      + 'paquets de 4. On peut donc écrire **5(x + 4) = 5x + 20**, quelle que '
      + 'soit la valeur de x. Le 5 ne se pose pas sur le premier terme : il se '
      + 'partage entre les deux.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Développer',
      texte:
        '**Développer** une expression, c\'est transformer un **produit** en une '
        + '**somme**.\n'
        + 'On passe d\'une écriture avec parenthèses à une écriture faite de '
        + 'termes additionnés.',
    },
    {
      type: 'propriete',
      titre: 'Distributivité simple',
      texte:
        'Pour tous nombres k, a et b :\n'
        + 'k(a + b) = k × a + k × b\n'
        + 'k(a − b) = k × a − k × b\n'
        + 'Le facteur k multiplie **chaque** terme de la parenthèse, sans exception.',
    },
    {
      // La forme qui fait chuter le plus, parce qu'aucun nombre n'est écrit
      // devant la parenthèse : l'élève ne voit pas de facteur, donc ne
      // distribue pas. Le nommer « k = −1 » évite d'en faire une règle à part.
      type: 'remarque',
      titre: 'Le moins devant la parenthèse',
      texte:
        'Quand rien n\'est écrit devant la parenthèse à part un signe moins, le '
        + 'facteur vaut **−1** : −(x − 3) = (−1) × (x − 3).\n'
        + 'Chaque terme change donc de signe : −(x − 3) = −x + 3.',
    },
    {
      type: 'exemple',
      texte:
        '6(x + 3) = 6x + 18   ·   2(4x − 9) = 8x − 18   ·   −(x + 5) = −x − 5',
    },
  ],

  methode: {
    titre: 'Développer, et ne rien laisser dans la parenthèse',
    enonce: 'Développer A = 4(x + 7), puis B = −3(x − 5).',
    etapes: [
      {
        texte: 'Dans A, le facteur 4 multiplie les deux termes de la parenthèse : le x, puis le 7.',
        note: 'Je trace mentalement une flèche du 4 vers chacun des deux.',
      },
      {
        texte: 'A = 4 × x + 4 × 7 = 4x + 28.',
        note: 'Je n\'essaie pas de réunir 4x et 28 : ils ne comptent pas la même chose.',
      },
      {
        texte: 'Dans B, le facteur est −3, signe compris. Il multiplie lui aussi les deux termes.',
        note: '−3 × x donne −3x.',
      },
      {
        texte: 'B = (−3) × x + (−3) × (−5) = −3x + 15.',
        note: 'Deux facteurs négatifs, donc un produit positif : la règle du chapitre 1 sert ici.',
      },
    ],
    controle:
      'Le contrôle : remplace x par un nombre et calcule les deux écritures — '
      + 'elles doivent donner le même résultat. Pour A avec x = 3 : '
      + '4 × (3 + 7) = 40, et 4 × 3 + 28 = 40. Évite x = 0 et x = 1, qui laissent '
      + 'passer trop d\'erreurs.',
  },

  entrainement: [
    // ── Palier 1 : k(a + b), le facteur et les deux termes ──────────────────
    {
      id: 'e-7-4-1', type: 'expression', palier: 1, piege: 'distributivite-incomplete',
      consigne: 'Développe cette expression.',
      enonce: '3(x + 4)', attendu: '3x+12',
      fausses: [
        { valeur: '3x+4', piege: 'distributivite-incomplete' },
        { valeur: '15x', piege: 'concatenation' },
      ],
    },
    {
      id: 'e-7-4-2', type: 'expression', palier: 1, piege: 'distributivite-incomplete',
      consigne: 'Développe cette expression.',
      enonce: '7(x + 3)', attendu: '7x+21',
      fausses: [
        { valeur: '7x+3', piege: 'distributivite-incomplete' },
        { valeur: '28x', piege: 'concatenation' },
      ],
    },
    {
      // Neutre : il n'y a qu'un seul terme dans la parenthèse, donc rien à
      // oublier — la distributivité incomplète ne peut pas jouer. Sans cet
      // item, « je vois un nombre devant une parenthèse, donc j'écris deux
      // termes » réussirait partout et deviendrait la règle. L'erreur prévue
      // ici est autre : additionner 3 et 5 au lieu de les multiplier.
      id: 'e-7-4-3', type: 'expression', palier: 1, neutre: true, piege: 'distributivite-incomplete',
      consigne: 'Écris cette expression sans parenthèses.',
      enonce: '3(5x)', attendu: '15x',
      fausses: [
        { valeur: '8x', piege: 'somme-et-produit-confondus' },
      ],
    },

    // ── Palier 2 : un coefficient dans la parenthèse, puis les signes ───────
    {
      id: 'e-7-4-4', type: 'expression', palier: 2, piege: 'distributivite-incomplete',
      consigne: 'Développe cette expression.',
      enonce: '4(2x + 3)', attendu: '8x+12',
      fausses: [
        { valeur: '8x+3', piege: 'distributivite-incomplete' },
        { valeur: '20x', piege: 'concatenation' },
      ],
    },
    {
      id: 'e-7-4-5', type: 'expression', palier: 2, piege: 'distributivite-incomplete',
      consigne: 'Développe cette expression.',
      enonce: '6(x - 2)', attendu: '6x-12',
      fausses: [
        { valeur: '6x-2', piege: 'distributivite-incomplete' },
        { valeur: '-6x', piege: 'concatenation' },
      ],
    },
    {
      id: 'e-7-4-6', type: 'expression', palier: 2, piege: 'moins-devant-la-parenthese',
      consigne: 'Développe cette expression.',
      enonce: '-(x - 3)', attendu: '-x+3',
      fausses: [
        { valeur: '-x-3', piege: 'moins-devant-la-parenthese' },
      ],
    },
    {
      id: 'e-7-4-7', type: 'expression', palier: 2, piege: 'moins-devant-la-parenthese',
      consigne: 'Développe cette expression.',
      enonce: '-2(x - 4)', attendu: '-2x+8',
      fausses: [
        { valeur: '-2x-8', piege: 'moins-devant-la-parenthese' },
        { valeur: '-2x-4', piege: 'distributivite-incomplete' },
      ],
    },

    // ── Palier 3 : relire une production, et se contrôler ───────────────────
    {
      id: 'e-7-4-8', type: 'corriger', palier: 3, piege: 'distributivite-incomplete',
      consigne: 'Ce développement est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '5(2x - 3)',
      lignes: [
        { texte: '5(2x − 3)', fausse: false },
        { texte: '= 10x − 3', fausse: true },
        { texte: 'L\'expression développée est donc 10x − 3.', fausse: false },
      ],
      explication:
        'La première ligne ne fait que recopier l\'énoncé : elle est juste. C\'est '
        + 'à la deuxième que ça casse — le 5 multiplie les deux termes, donc aussi '
        + 'le −3. Le développement correct est 10x − 15. Contrôle avec x = 3 : '
        + '5 × (6 − 3) = 15, et 10 × 3 − 15 = 15.',
    },
    {
      // L'affirmation est fausse, mais x = 1 la rendrait vraie : c'est
      // exactement ce que la charte veut faire rencontrer. Un seul essai bien
      // choisi réfute ; un seul essai mal choisi confirme une erreur.
      id: 'e-7-4-9', type: 'vraifaux', palier: 3, piege: 'concatenation',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Une fois développée, l\'expression 5(x + 3) peut s\'écrire 20x.',
      attendu: false,
      contreExemple: {
        invite: 'Trouve une valeur de x pour laquelle les deux écritures ne donnent pas le même résultat.',
        champs: [{ id: 'a', etiquette: 'valeur de x' }],
        // On vérifie la PROPRIÉTÉ qui fait le contre-exemple — les deux
        // écritures diffèrent — et non une valeur imposée. x = 1 sera refusé,
        // et c'est voulu : c'est la seule valeur qui donne raison à l'erreur.
        valide: (a) => Number.isFinite(a) && 5 * (a + 3) !== 20 * a,
        temoin: [3],
        exemple:
          'Avec x = 3 : 5 × (3 + 3) = 30, alors que 20 × 3 = 60. Les deux '
          + 'écritures ne disent pas la même chose. Attention à x = 1, la seule '
          + 'valeur pour laquelle elles coïncident par hasard.',
      },
    },
    {
      id: 'e-7-4-10', type: 'expression', palier: 3, piege: 'distributivite-incomplete',
      consigne: 'Développe puis réduis cette expression.',
      enonce: '3(x + 2) + 4(x - 1)', attendu: '7x+2',
      fausses: [
        { valeur: '7x+1', piege: 'distributivite-incomplete' },
        { valeur: '9x', piege: 'concatenation' },
      ],
    },
  ],

  problemes: [
    {
      id: 'p-7-4-1',
      enonce:
        'Un potager rectangulaire mesure 7 m de large. Sa longueur est faite de '
        + 'deux parties : une partie de x mètres plantée en tomates, et une '
        + 'partie de 5 m plantée en courgettes.',
      questions: [
        { texte: 'Quelle est l\'aire du potager si x = 8 ?', attendu: 91, unite: 'm²' },
        { texte: 'Et si x = 15 ?', attendu: 140, unite: 'm²' },
      ],
    },
    {
      id: 'p-7-4-2',
      enonce:
        'Au cinéma, une place coûte x euros et chaque spectateur paie en plus '
        + '3 € de location de lunettes 3D. Un groupe de 4 amis y va ensemble.',
      questions: [
        { texte: 'Combien le groupe paie-t-il en tout si la place coûte 9 € ?', attendu: 48, unite: '€' },
        { texte: 'Et si la place passait à 11 € ?', attendu: 56, unite: '€' },
      ],
    },
    {
      id: 'p-7-4-3',
      enonce:
        'Un jardinier plante 6 rangées identiques. Chaque rangée contient x '
        + 'salades et 2 choux. Cette année, il a mis 15 salades par rangée.',
      questions: [
        { texte: 'Combien a-t-il planté de salades en tout ?', attendu: 90, unite: 'salades' },
        { texte: 'Combien a-t-il planté de plants en tout ?', attendu: 102, unite: 'plants' },
      ],
    },
    {
      id: 'p-7-4-4',
      enonce:
        'Une salle de tennis fait payer x euros la séance, plus 2 € de location '
        + 'de raquette à chaque fois. Malo a pris 8 séances, et la séance coûtait 7 €.',
      questions: [
        { texte: 'Combien lui a coûté la location des raquettes en tout ?', attendu: 16, unite: '€' },
        { texte: 'Combien a-t-il payé en tout ?', attendu: 72, unite: '€' },
      ],
    },
    {
      id: 'p-7-4-5',
      enonce:
        'Un terrain rectangulaire mesure 12 m de large et x mètres de long. Sur '
        + 'la longueur, on réserve les 5 premiers mètres pour un chemin qui '
        + 'traverse toute la largeur ; le reste est semé en gazon. Le terrain '
        + 'mesure 30 m de long.',
      questions: [
        { texte: 'Quelle est l\'aire du chemin ?', attendu: 60, unite: 'm²' },
        { texte: 'Quelle est l\'aire semée en gazon ?', attendu: 300, unite: 'm²' },
      ],
    },
  ],

  test: [
    {
      id: 't-7-4-1', type: 'expression', consigne: 'Développe cette expression.',
      enonce: '4(x + 5)', attendu: '4x+20',
      fausses: [
        { valeur: '4x+5', piege: 'distributivite-incomplete' },
        { valeur: '24x', piege: 'concatenation' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-7-4-2', type: 'expression', consigne: 'Développe cette expression.',
      enonce: '9(x - 2)', attendu: '9x-18',
      fausses: [
        { valeur: '9x-2', piege: 'distributivite-incomplete' },
        { valeur: '-9x', piege: 'concatenation' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-7-4-3', type: 'expression', consigne: 'Développe cette expression.',
      enonce: '-(x + 7)', attendu: '-x-7',
      fausses: [
        { valeur: '-x+7', piege: 'moins-devant-la-parenthese' },
      ],
      revoir: 'remarque',
    },
    {
      id: 't-7-4-4', type: 'expression', consigne: 'Développe cette expression.',
      enonce: '-4(x - 3)', attendu: '-4x+12',
      fausses: [
        { valeur: '-4x-12', piege: 'moins-devant-la-parenthese' },
      ],
      revoir: 'remarque',
    },
    {
      id: 't-7-4-5', type: 'expression', consigne: 'Développe cette expression.',
      enonce: '2(3x + 4)', attendu: '6x+8',
      fausses: [
        { valeur: '6x+4', piege: 'distributivite-incomplete' },
      ],
      revoir: 'exemple',
    },
    {
      id: 't-7-4-6', type: 'expression', consigne: 'Développe cette expression.',
      enonce: '5(2x - 1)', attendu: '10x-5',
      fausses: [
        { valeur: '10x-1', piege: 'distributivite-incomplete' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-7-4-7', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '6(x + 4) = 6x + 4', attendu: false,
      explication:
        'Le 6 doit multiplier les deux termes, donc aussi le 4 : le développement '
        + 'est 6x + 24. Contrôle avec x = 3 : 6 × (3 + 4) = 42, alors que '
        + '6 × 3 + 4 = 22.',
      piege: 'distributivite-incomplete', revoir: 'propriete',
    },
    {
      id: 't-7-4-8', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '-2(x - 6) = -2x + 12', attendu: true,
      explication:
        'Chaque terme est multiplié par −2 : −2 × x donne −2x, et −2 × (−6) donne '
        + '+12. Contrôle avec x = 5 : −2 × (5 − 6) = 2, et −2 × 5 + 12 = 2. Un '
        + '« plus » après un facteur négatif n\'a rien d\'anormal.',
      revoir: 'remarque',
    },
    {
      id: 't-7-4-9', type: 'corriger',
      consigne: 'Ce développement est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '-(2x - 5)',
      lignes: [
        { texte: '−(2x − 5) = (−1) × (2x − 5)', fausse: false },
        { texte: '= −2x − 5', fausse: true },
        { texte: 'L\'expression développée est donc −2x − 5.', fausse: false },
      ],
      explication:
        'La première ligne est juste : le moins seul devant la parenthèse, c\'est '
        + 'le facteur −1. L\'erreur est à la deuxième — le −1 multiplie aussi le '
        + '−5, qui devient +5. Le développement correct est −2x + 5.',
      piege: 'moins-devant-la-parenthese', revoir: 'remarque',
    },
    {
      id: 't-7-4-10', type: 'expression', consigne: 'Développe puis réduis cette expression.',
      enonce: '3 + 5(x + 2)', attendu: '5x+13',
      fausses: [
        { valeur: '5x+5', piege: 'distributivite-incomplete' },
        { valeur: '18x', piege: 'concatenation' },
      ],
      revoir: 'exemple',
    },
  ],
};
