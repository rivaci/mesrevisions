// Savoir-faire 7-1 — Reconnaître la structure d'une expression.
//
// C'est le premier savoir-faire du chapitre le plus lourd de conséquences du
// cycle 4, et il ne calcule rien : il apprend à LIRE. Tout ce qui suit —
// réduire, développer, factoriser — suppose qu'on sache d'abord dire de quoi
// on parle. Un élève qui prend 3(x + 2) pour une somme distribuera de travers
// pendant quatre ans.
//
// Le critère tient en une phrase, et c'est la seule chose à installer ici :
// la DERNIÈRE opération effectuée donne la nature de l'expression. Pas le
// signe qu'on voit en premier, pas le nombre de symboles — la dernière
// opération. D'où l'entrée par les programmes de calcul : deux programmes
// faits des mêmes opérations dans un ordre différent ne donnent pas le même
// résultat, et c'est l'ordre qui produit la structure.
//
// Le geste de contrôle est celui de tout le chapitre : remplacer la lettre
// par un nombre. Il ne sert pas qu'à vérifier un résultat, il sert à VOIR
// dans quel ordre les opérations se font.

export default {
  id: 'sf-7-1',
  titre: 'Reconnaître la structure d\'une expression',
  attendus: [
    'Il décrit la structure d\'une expression littérale : est-ce une somme ou un produit ?',
    'Il identifie les termes d\'une somme et les facteurs d\'un produit.',
  ],

  // On ne donne pas le critère : on met deux programmes de calcul côte à côte,
  // faits des mêmes opérations, et on laisse l'écart entre 18 et 14 poser la
  // question. L'élève découvre que l'ordre des opérations n'est pas un détail
  // d'écriture — c'est ce qui fait la nature de l'expression.
  decouvrir: {
    titre: 'Mêmes opérations, deux résultats',
    texte:
      'Voici deux programmes de calcul. Ils utilisent exactement les mêmes '
      + 'opérations — seul l\'ordre change.\n'
      + '**Programme de Sacha** : choisis un nombre, ajoute 2, puis multiplie par 3.\n'
      + '**Programme d\'Inès** : choisis un nombre, multiplie par 3, puis ajoute 2.',
    question: 'Fais tourner les deux programmes en partant du nombre 4.',
    champs: [
      { id: 'a', etiquette: 'programme de Sacha :', attendu: 18 },
      { id: 'b', etiquette: 'programme d\'Inès :', attendu: 14 },
    ],
    conclusion:
      'Même nombre de départ, mêmes opérations, et pourtant deux résultats '
      + 'différents. Ce qui sépare les deux programmes, c\'est la **dernière '
      + 'opération effectuée**.\n'
      + 'Sacha finit par une multiplication : son expression 3(x + 2) est un '
      + '**produit**.\n'
      + 'Inès finit par une addition : son expression 3x + 2 est une **somme**.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Somme et produit',
      texte:
        'Une **somme** est une expression dont la dernière opération effectuée '
        + 'est une **addition** (ou une soustraction). Les nombres qu\'on ajoute '
        + 'sont ses **termes**.\n'
        + 'Un **produit** est une expression dont la dernière opération effectuée '
        + 'est une **multiplication**. Les nombres qu\'on multiplie sont ses '
        + '**facteurs**.',
    },
    {
      type: 'propriete',
      titre: 'La dernière opération donne la nature',
      texte:
        'Pour reconnaître la structure d\'une expression, cherche l\'opération '
        + 'que tu ferais **en dernier** si tu remplaçais la lettre par un nombre.\n'
        + 'C\'est elle, et elle seule, qui dit si l\'expression est une somme ou '
        + 'un produit. Le signe que tu vois en premier ne dit rien.',
    },
    {
      // La distinction que tout le chapitre réutilise, et celle sur laquelle
      // les contrôles se jouent. Elle prolonge directement l'activité.
      type: 'remarque',
      titre: 'Une parenthèse change tout',
      texte:
        'Dans **3(x + 2)**, l\'addition est enfermée dans la parenthèse : on la '
        + 'calcule d\'abord, la multiplication vient en dernier. C\'est donc un '
        + '**produit**, dont les deux facteurs sont 3 et (x + 2).\n'
        + 'Dans **3x + 2**, la multiplication 3 × x se fait d\'abord, l\'addition '
        + 'vient en dernier. C\'est donc une **somme**, dont les deux termes sont '
        + '3x et 2.',
    },
    {
      type: 'remarque',
      titre: 'Un terme peut lui-même être un produit',
      texte:
        'Un terme n\'est pas forcément un nombre tout seul : dans 6x + 4y − 9, '
        + 'les **trois** termes sont 6x, 4y et −9. Les deux premiers sont '
        + 'eux-mêmes des produits, et ça ne change rien à la nature de '
        + 'l\'ensemble, qui reste une somme.\n'
        + 'Le signe placé devant un terme lui appartient : le troisième terme '
        + 'est bien −9, et non 9.',
    },
    {
      type: 'exemple',
      texte:
        '2x + 9 : somme de 2 termes   ·   2(x + 9) : produit de 2 facteurs\n'
        + '(x + 4)(x + 5) : produit de 2 facteurs   ·   x² + 9x + 20 : somme de 3 termes',
    },
  ],

  methode: {
    titre: 'Dire si une expression est une somme ou un produit',
    enonce: 'Dire si A = 5(x − 4) et B = 5x − 4 sont des sommes ou des produits, et donner leurs termes ou leurs facteurs.',
    etapes: [
      {
        texte: 'Dans A, je remplace mentalement x par un nombre, disons 6, et je regarde dans quel ordre je calcule : d\'abord 6 − 4, puis le résultat multiplié par 5.',
        note: 'La parenthèse passe toujours en premier.',
      },
      {
        texte: 'La dernière opération est une multiplication : A est un produit.',
        note: 'Ses deux facteurs sont 5 et (x − 4).',
      },
      {
        texte: 'Dans B, toujours avec x = 6 : d\'abord 5 × 6, puis on retire 4.',
        note: 'La multiplication passe avant la soustraction.',
      },
      {
        texte: 'La dernière opération est une soustraction : B est une somme.',
        note: 'Ses deux termes sont 5x et −4.',
      },
    ],
    controle:
      'Le contrôle : remplace la lettre par un nombre et mène le calcul jusqu\'au '
      + 'bout. La toute dernière opération que ta main écrit donne la nature de '
      + 'l\'expression. Ici, avec x = 6, A vaut 10 et B vaut 26 — deux résultats '
      + 'différents, donc bien deux expressions différentes.',
  },

  entrainement: [
    {
      id: 'e-7-1-1', type: 'calcul', palier: 1, piege: 'concatenation',
      consigne: 'Combien de termes cette somme a-t-elle ?',
      enonce: '4x + 7', attendu: 2,
      fausses: [{ valeur: 1, piege: 'concatenation' }],
    },
    {
      id: 'e-7-1-2', type: 'calcul', palier: 1, piege: 'concatenation',
      consigne: 'Combien de termes cette somme a-t-elle ?',
      enonce: '2x + 5y - 3', attendu: 3,
      fausses: [{ valeur: 2, piege: 'concatenation' }],
    },
    {
      id: 'e-7-1-3', type: 'calcul', palier: 1, piege: 'distributivite-incomplete',
      consigne: 'Cette expression est un produit. Combien a-t-elle de facteurs ?',
      enonce: '6(x + 1)', attendu: 2,
      // Répondre 3, c'est avoir compté 6, x et 1 : la parenthèse n'a pas été
      // vue comme un bloc, exactement ce qui fait rater les développements.
      fausses: [{ valeur: 3, piege: 'distributivite-incomplete' }],
    },
    {
      // Item neutre, et c'est LE cas neutre du savoir-faire : ici la stratégie
      // de surface « il y a un +, donc c'est une somme » donne la bonne
      // réponse. C'est très exactement de là que vient la confusion — la règle
      // fausse s'est construite sur des expressions comme celle-ci. La
      // rencontrer explicitement empêche d'en refaire une règle.
      id: 'e-7-1-4', type: 'vraifaux', palier: 1, neutre: true, piege: 'somme-et-produit-confondus',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'L\'expression 7x + 3 est une somme.',
      attendu: true,
    },
    {
      // Les deux expressions sont jumelles : mêmes nombres, même lettre, seule
      // la parenthèse diffère. Les traiter d'affilée oblige à regarder l'ordre
      // des opérations plutôt que les symboles présents.
      id: 'e-7-1-5', type: 'trous', palier: 2, piege: 'somme-et-produit-confondus',
      consigne: 'Écris 1 si l\'expression est une somme, 2 si c\'est un produit.',
      enonce: '8x + 5 : \\square \\qquad 8(x + 5) : \\square',
      champs: [
        { id: 'a', etiquette: '8x + 5', attendu: 1 },
        { id: 'b', etiquette: '8(x + 5)', attendu: 2 },
      ],
    },
    {
      id: 'e-7-1-6', type: 'plausible', palier: 2, piege: 'distributivite-incomplete',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '5(x + 2) = 5x + 2', attendu: false,
      explication:
        'Remplace x par 3 : à gauche, 5 × (3 + 2) = 25 ; à droite, 5 × 3 + 2 = 17. '
        + 'Les deux écritures ne disent pas la même chose. Le facteur 5 doit '
        + 'multiplier les **deux** termes de la parenthèse, donc 5(x + 2) = 5x + 10.',
    },
    {
      id: 'e-7-1-7', type: 'plausible', palier: 2, piege: 'moins-devant-la-parenthese',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '-(x - 4) = -x + 4', attendu: true,
      explication:
        'Le signe moins porte sur **toute** la parenthèse : chaque terme change '
        + 'de signe, donc le −4 devient +4. Vérifie avec x = 7 : à gauche, '
        + '−(7 − 4) = −3 ; à droite, −7 + 4 = −3. Les deux écritures se valent.',
    },
    {
      id: 'e-7-1-8', type: 'vraifaux', palier: 3, piege: 'reduction-de-termes-non-semblables',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Les expressions x + x² et 2x² désignent le même nombre, quelle que soit la valeur de x.',
      attendu: false,
      contreExemple: {
        invite: 'Choisis une valeur de x, puis calcule ce que vaut x + x² pour cette valeur.',
        champs: [
          { id: 'a', etiquette: 'valeur de x' },
          { id: 'b', etiquette: 'ce que vaut x + x²' },
        ],
        // On vérifie la PROPRIÉTÉ : le calcul annoncé est juste, et il ne donne
        // pas le même nombre que 2x². La condition écarte d'elle-même 0 et 1,
        // les deux valeurs où les deux écritures coïncident — un élève qui les
        // choisirait n'aurait rien réfuté.
        valide: (a, b) => b === a + a * a && b !== 2 * a * a,
        temoin: [3, 12],
        exemple: 'Avec x = 3 : x + x² vaut 3 + 9 = 12, alors que 2x² vaut 2 × 9 = 18.',
      },
    },
    {
      id: 'e-7-1-9', type: 'corriger', palier: 3, piege: 'egal-qui-donne-le-resultat',
      consigne: 'On calcule 2(x + 5) pour x = 3. Cette rédaction est fausse : trouve la ligne où l\'erreur apparaît.',
      enonce: '2(x + 5)',
      lignes: [
        { texte: 'Pour x = 3 : 2(3 + 5)', fausse: false },
        { texte: '= 3 + 5 = 8 × 2 = 16', fausse: true },
        { texte: 'L\'expression vaut donc 16.', fausse: false },
      ],
      explication:
        'Le résultat final, 16, est pourtant juste — c\'est la rédaction qui ne '
        + 'l\'est pas. La deuxième ligne écrit « 3 + 5 = 8 × 2 », c\'est-à-dire '
        + '« 8 = 16 ». Le signe = relie deux écritures qui valent la même chose ; '
        + 'il n\'annonce pas la suite du calcul. Il fallait écrire '
        + '2(3 + 5) = 2 × 8 = 16.',
    },
    {
      // Le type phare du chapitre : l'élève PRODUIT une écriture au lieu de
      // reconnaître la bonne. Le programme de calcul est celui de l'activité,
      // avec d'autres nombres — et l'ordre des étapes impose la parenthèse.
      // Toute écriture équivalente est acceptée, développée ou non : l'enjeu
      // est la structure, pas la forme.
      id: 'e-7-1-10', type: 'expression', palier: 3, piege: 'distributivite-incomplete',
      consigne:
        'Voici un programme de calcul : choisis un nombre, ajoute 7, puis '
        + 'multiplie le résultat par 2. Écris l\'expression obtenue quand le '
        + 'nombre choisi est x.',
      enonce: '\\text{nombre choisi : } x',
      attendu: '2(x+7)',
      fausses: [
        { valeur: '2x+7', piege: 'distributivite-incomplete' },
        { valeur: 'x+9', piege: 'concatenation' },
      ],
    },
  ],

  problemes: [
    {
      id: 'p-7-1-1',
      enonce:
        'Voici un programme de calcul : choisis un nombre, ajoute 5, puis '
        + 'multiplie le résultat par 4.',
      questions: [
        { texte: 'Quel résultat obtiens-tu en partant de 7 ?', attendu: 48 },
        { texte: 'Et en partant de 2,5 ?', attendu: 30 },
      ],
    },
    {
      id: 'p-7-1-2',
      enonce:
        'Un rectangle a pour largeur 6 cm et pour longueur x + 2 centimètres. '
        + 'On choisit x = 5.',
      questions: [
        { texte: 'Quelle est son aire ?', attendu: 42, unite: 'cm²' },
        { texte: 'Quel est son périmètre ?', attendu: 26, unite: 'cm' },
      ],
    },
    {
      id: 'p-7-1-3',
      enonce:
        'Sacha et Inès partent tous les deux du nombre 4. Sacha ajoute 3, puis '
        + 'multiplie par 5. Inès multiplie par 5, puis ajoute 3.',
      questions: [
        { texte: 'Quel résultat obtient Sacha ?', attendu: 35 },
        { texte: 'Quel résultat obtient Inès ?', attendu: 23 },
      ],
    },
    {
      id: 'p-7-1-4',
      enonce:
        'Une course en taxi coûte 4 € de prise en charge, puis 2 € par kilomètre '
        + 'parcouru.',
      questions: [
        { texte: 'Combien coûte une course de 9 km ?', attendu: 22, unite: '€' },
        { texte: 'Et une course de 15 km ?', attendu: 34, unite: '€' },
      ],
    },
    {
      id: 'p-7-1-5',
      enonce: 'On donne A = 3(x + 5) et B = 3x + 5. On choisit x = 4.',
      questions: [
        { texte: 'Combien vaut A ?', attendu: 27 },
        { texte: 'Combien vaut B ?', attendu: 17 },
      ],
    },
  ],

  test: [
    {
      id: 't-7-1-1', type: 'calcul',
      consigne: 'Combien de termes cette somme a-t-elle ?',
      enonce: '3x + 8', attendu: 2,
      fausses: [{ valeur: 1, piege: 'concatenation' }],
      revoir: 'definition',
    },
    {
      id: 't-7-1-2', type: 'calcul',
      consigne: 'Combien de termes cette somme a-t-elle ?',
      enonce: '7x + 2y - 6', attendu: 3,
      fausses: [{ valeur: 2, piege: 'concatenation' }],
      revoir: 'remarque',
    },
    {
      id: 't-7-1-3', type: 'calcul',
      consigne: 'Cette expression est un produit. Combien a-t-elle de facteurs ?',
      enonce: '5(x + 8)', attendu: 2,
      fausses: [{ valeur: 3, piege: 'distributivite-incomplete' }],
      revoir: 'definition',
    },
    {
      id: 't-7-1-4', type: 'trous', piege: 'somme-et-produit-confondus',
      consigne: 'Écris 1 si l\'expression est une somme, 2 si c\'est un produit.',
      enonce: '4x - 9 : \\square \\qquad 4(x - 9) : \\square',
      champs: [
        { id: 'a', etiquette: '4x − 9', attendu: 1 },
        { id: 'b', etiquette: '4(x − 9)', attendu: 2 },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-7-1-5', type: 'vraifaux', piege: 'somme-et-produit-confondus',
      consigne: 'Vrai ou faux ?',
      affirmation: 'L\'expression 8(x + 3) est un produit.',
      attendu: true,
      revoir: 'propriete',
    },
    {
      id: 't-7-1-6', type: 'vraifaux', piege: 'distributivite-incomplete',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Les expressions 4(x + 1) et 4x + 1 désignent le même nombre, quelle que soit la valeur de x.',
      attendu: false,
      contreExemple: {
        invite: 'Choisis une valeur de x, puis calcule ce que vaut 4(x + 1) pour cette valeur.',
        champs: [
          { id: 'a', etiquette: 'valeur de x' },
          { id: 'b', etiquette: 'ce que vaut 4(x + 1)' },
        ],
        valide: (a, b) => b === 4 * (a + 1) && b !== 4 * a + 1,
        temoin: [3, 16],
        exemple: 'Avec x = 3 : 4(x + 1) vaut 4 × 4 = 16, alors que 4x + 1 vaut 12 + 1 = 13.',
      },
      revoir: 'remarque',
    },
    {
      id: 't-7-1-7', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '7(x + 2) = 7x + 14', attendu: true,
      explication:
        'Vérifie avec x = 3 : à gauche, 7 × (3 + 2) = 35 ; à droite, 21 + 14 = 35. '
        + 'Le facteur 7 a bien été distribué sur les deux termes de la parenthèse.',
      revoir: 'exemple',
    },
    {
      id: 't-7-1-8', type: 'plausible', piege: 'moins-devant-la-parenthese',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '-(x - 6) = -x - 6', attendu: false,
      explication:
        'Vérifie avec x = 6 : à gauche, −(6 − 6) = 0 ; à droite, −6 − 6 = −12. '
        + 'Le signe moins porte sur toute la parenthèse, donc **chaque** terme '
        + 'change de signe : −(x − 6) = −x + 6.',
      revoir: 'remarque',
    },
    {
      id: 't-7-1-9', type: 'corriger', piege: 'distributivite-incomplete',
      consigne: 'Ce développement est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '5(x + 3)',
      lignes: [
        { texte: '5(x + 3)', fausse: false },
        { texte: '= 5x + 3', fausse: true },
        { texte: 'L\'expression vaut donc 5x + 3.', fausse: false },
      ],
      explication:
        'La deuxième ligne est fausse : le facteur 5 multiplie x **et** 3. '
        + 'Avec x = 2, 5 × (2 + 3) = 25, alors que 5 × 2 + 3 = 13. Le bon '
        + 'développement est 5x + 15.',
      revoir: 'remarque',
    },
    {
      id: 't-7-1-10', type: 'calcul',
      consigne: 'Combien de termes cette somme a-t-elle ?',
      enonce: 'x^{2} + 3x + 5', attendu: 3,
      fausses: [{ valeur: 2, piege: 'reduction-de-termes-non-semblables' }],
      revoir: 'definition',
    },
  ],
};
