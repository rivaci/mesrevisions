// Chapitre 9, savoir-faire 1 — Déterminer l'inverse d'un nombre.
//
// ── Pourquoi l'inverse ouvre le chapitre ──────────────────────────────────
//
// Tout le chapitre 9 repose sur une seule idée : diviser par un nombre, c'est
// multiplier par son inverse. Tant que l'inverse n'est pas un objet familier,
// la règle de la division reste une formule à réciter. On l'installe donc
// SEUL, avant tout calcul de produit ou de quotient de fractions.
//
// ── La confusion à désamorcer tout de suite ───────────────────────────────
//
// L'opposé et l'inverse se ressemblent : deux mots courts, deux nombres
// fabriqués à partir d'un troisième, et un vocabulaire scolaire qui les met
// côte à côte. Ils ne se distinguent que par l'OPÉRATION qui les définit —
// somme nulle d'un côté, produit égal à 1 de l'autre. C'est pour ça que la
// découverte, le cours, la méthode et la moitié des exercices ramènent tous à
// la même question : « combien fait le produit ? ». Le geste de contrôle du
// chapitre entier est là.
//
// ── Le format des exercices, et une contrainte technique assumée ──────────
//
// On demande l'inverse par une égalité à compléter — « 9 × □/□ = 1 » — plutôt
// que par un champ « donne l'inverse ». Deux raisons : l'énoncé porte alors sa
// propre définition, et la vérification automatique compare une valeur à une
// valeur. Le type `fraction`, lui, recalcule l'énoncé pour le comparer à la
// réponse : il conviendrait mal ici, où la réponse attendue vaut justement
// l'INVERSE de ce qui est écrit.
//
// ── Zéro ──────────────────────────────────────────────────────────────────
//
// Le cas de 0 n'est pas une curiosité : c'est ce qui donne son sens à
// « nombre non nul » dans l'énoncé du programme. Il a son bloc de cours, son
// item d'entraînement et sa question de problème.

export default {
  id: 'sf-9-1',
  titre: 'Déterminer l\'inverse d\'un nombre',
  attendus: [
    'Il connaît et utilise la notion d\'inverse d\'un nombre non nul.',
  ],

  // On ne nomme pas l'inverse avant de l'avoir rencontré : trois produits qui
  // valent tous 1, et la question « quel est le second nombre ? ». Le mot
  // arrive à la conclusion, une fois le geste fait deux fois.
  decouvrir: {
    titre: 'Le nombre qui ramène à 1',
    texte:
      'Dans chacune de ces lignes, deux nombres se multiplient pour donner '
      + 'exactement 1. Regarde comment le second se déduit du premier.',
    lignes: [
      { calcul: '4 × 0,25', resultat: '1' },
      { calcul: '5 × 0,2', resultat: '1' },
      { calcul: '2/3 × 3/2', resultat: '1' },
    ],
    question: 'À toi. Par quel nombre faut-il multiplier 1/6 pour tomber sur 1 ? Et 0,5 ?',
    champs: [
      { id: 'a', etiquette: 'par combien multiplier 1/6 ?', attendu: 6 },
      { id: 'b', etiquette: 'par combien multiplier 0,5 ?', attendu: 2 },
    ],
    conclusion:
      'Ce second nombre porte un nom : c\'est l\'**inverse** du premier. Deux '
      + 'nombres inverses l\'un de l\'autre ont pour **produit 1**.\n'
      + 'Ne le confonds pas avec l\'**opposé**, qui est le nombre dont la '
      + '**somme** avec le premier fait 0. Pour 5 : son opposé est −5, son '
      + 'inverse est 0,2. Deux mots voisins, deux opérations différentes.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Inverse d\'un nombre',
      texte:
        'Deux nombres non nuls sont **inverses** l\'un de l\'autre lorsque leur '
        + '**produit vaut 1**.\n'
        + 'L\'inverse d\'un nombre a non nul se note 1/a.',
    },
    {
      type: 'propriete',
      titre: 'Inverse d\'une fraction',
      texte:
        'L\'inverse de la fraction a/b (avec a et b non nuls) est **b/a** : on '
        + 'échange le numérateur et le dénominateur.\n'
        + 'Un entier n s\'écrit n/1 : son inverse est donc 1/n.',
    },
    {
      // Le seul nombre exclu, et la raison de la mention « non nul » dans
      // l'attendu du programme. Un élève qui sait dire POURQUOI 0 n'a pas
      // d'inverse a compris la définition, pas seulement retenu le mot.
      type: 'remarque',
      titre: 'Zéro n\'a pas d\'inverse',
      texte:
        'Un produit dont l\'un des facteurs est 0 vaut 0 : il ne pourra jamais '
        + 'valoir 1. **0 est le seul nombre qui n\'a pas d\'inverse.** Son opposé, '
        + 'lui, existe bel et bien : c\'est 0.',
    },
    {
      type: 'remarque',
      titre: 'Inverse et opposé ne se ressemblent que de loin',
      texte:
        'Pour 8 : son opposé est −8, car 8 + (−8) = 0 ; son inverse est 1/8, car '
        + '8 × 1/8 = 1.\n'
        + 'Un nombre et son inverse ont toujours le **même signe** — sinon leur '
        + 'produit serait négatif, et ne pourrait pas valoir 1.',
    },
    {
      type: 'exemple',
      texte:
        'inverse de 7 : 1/7   ·   inverse de 3/10 : 10/3   ·   '
        + 'inverse de 0,125 : 8   ·   inverse de −6 : −1/6',
    },
  ],

  methode: {
    titre: 'Trouver un inverse, et le vérifier',
    enonce: 'Donner l\'inverse de 0,4, puis celui de −9/2.',
    etapes: [
      {
        texte: 'J\'écris d\'abord 0,4 en fraction : 0,4 = 4/10, que je simplifie en 2/5.',
        note: 'Un décimal ne se « retourne » pas tel quel — il lui faut une écriture fractionnaire.',
      },
      {
        texte: 'J\'échange numérateur et dénominateur : l\'inverse de 2/5 est 5/2, c\'est-à-dire 2,5.',
        note: '',
      },
      {
        texte: 'Pour −9/2, j\'échange de la même façon : l\'inverse est −2/9.',
        note: 'Le signe ne bouge pas. Deux nombres inverses ont le même signe, puisque leur produit vaut 1.',
      },
    ],
    controle:
      'Le contrôle : multiplie le nombre de départ par ta réponse, tu dois tomber '
      + 'sur 1. Ici 0,4 × 2,5 = 1 et (−9/2) × (−2/9) = 1. Si tu trouves 0, c\'est '
      + 'l\'opposé que tu as donné, pas l\'inverse.',
  },

  entrainement: [
    {
      id: 'e-9-1-1', type: 'trous', palier: 1, piege: 'inverse-et-oppose-confondus',
      consigne: 'Complète pour que le produit soit égal à 1.',
      enonce: '9 \\times \\dfrac{\\square}{\\square} = 1',
      champs: [
        { id: 'a', etiquette: 'numérateur', attendu: 1 },
        { id: 'b', etiquette: 'dénominateur', attendu: 9 },
      ],
      fausses: [{ valeur: -9, piege: 'inverse-et-oppose-confondus' }],
    },
    {
      id: 'e-9-1-2', type: 'trous', palier: 1, piege: 'inverse-et-oppose-confondus',
      consigne: 'Complète pour que le produit soit égal à 1.',
      enonce: '\\dfrac{3}{8} \\times \\dfrac{\\square}{\\square} = 1',
      champs: [
        { id: 'a', etiquette: 'numérateur', attendu: 8 },
        { id: 'b', etiquette: 'dénominateur', attendu: 3 },
      ],
      fausses: [{ valeur: -3, piege: 'inverse-et-oppose-confondus' }],
    },
    {
      id: 'e-9-1-3', type: 'calcul', palier: 1, piege: 'inverse-et-oppose-confondus',
      consigne: 'Quel est l\'inverse de ce nombre ?',
      enonce: '\\dfrac{1}{5}', attendu: 5,
      fausses: [
        // −0,2 est l'OPPOSÉ de 1/5 : c'est la confusion pure.
        { valeur: -0.2, piege: 'inverse-et-oppose-confondus' },
        // −5, c'est l'inverse trouvé puis affublé d'un signe qui n'a rien à
        // faire là — la même confusion, arrivée une étape plus tard.
        { valeur: -5, piege: 'inverse-et-oppose-confondus' },
      ],
    },
    {
      // Les deux mots demandés côte à côte, sur le même nombre : c'est le seul
      // format où la confusion se voit au lieu de se deviner.
      id: 'e-9-1-4', type: 'trous', palier: 2, piege: 'inverse-et-oppose-confondus',
      consigne: 'Donne l\'opposé, puis l\'inverse de ce nombre.',
      enonce: '25',
      champs: [
        { id: 'a', etiquette: 'son opposé', attendu: -25 },
        { id: 'b', etiquette: 'son inverse, en écriture décimale', attendu: 0.04 },
      ],
      fausses: [{ valeur: -0.04, piege: 'inverse-et-oppose-confondus' }],
    },
    {
      // Le décimal : « retourner la fraction » ne suffit plus, il faut d'abord
      // en écrire une. C'est là que la définition reprend la main sur le geste.
      id: 'e-9-1-5', type: 'calcul', palier: 2, piege: 'inverse-et-oppose-confondus',
      consigne: 'Quel est l\'inverse de ce nombre ?',
      enonce: '0{,}8', attendu: 1.25,
      fausses: [
        { valeur: -0.8, piege: 'inverse-et-oppose-confondus' },
        { valeur: -1.25, piege: 'inverse-et-oppose-confondus' },
      ],
    },
    {
      id: 'e-9-1-6', type: 'calcul', palier: 2, piege: 'inverse-et-oppose-confondus',
      consigne: 'Quel est l\'inverse de ce nombre ?',
      enonce: '-\\dfrac{1}{3}', attendu: -3,
      fausses: [{ valeur: 3, piege: 'inverse-et-oppose-confondus' }],
    },
    {
      id: 'e-9-1-7', type: 'plausible', palier: 2, piege: 'inverse-et-oppose-confondus',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '12 \\times (-12) = 1', attendu: false,
      explication:
        '12 × (−12) vaut −144, et sûrement pas 1 : deux facteurs de signes '
        + 'contraires donnent un produit négatif. −12 est l\'**opposé** de 12 — '
        + 'c\'est leur SOMME qui fait 0. L\'inverse de 12 est 1/12.',
    },
    {
      // Item NEUTRE. La confusion inverse/opposé ne joue pas ici : 0 est son
      // propre opposé, et rien dans la question ne demande de fabriquer un
      // inverse. Ce qui est en jeu, c'est uniquement l'existence — servir
      // l'explication « opposé pour l'addition, inverse pour la
      // multiplication » à qui répond « vrai » ne l'aiderait en rien.
      //
      // Sans cet item, « tout nombre a un inverse » resterait une évidence, et
      // la mention « non nul » du programme un détail décoratif.
      id: 'e-9-1-8', type: 'vraifaux', palier: 3, neutre: true, piege: 'inverse-et-oppose-confondus',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Tout nombre possède un inverse.',
      attendu: false,
      contreExemple: {
        invite: 'Donne le nombre qui n\'a pas d\'inverse.',
        champs: [{ id: 'a', etiquette: 'ce nombre' }],
        valide: (a) => a === 0,
        temoin: [0],
        exemple:
          '0 : quel que soit le nombre par lequel on le multiplie, le produit '
          + 'reste 0. Il ne vaudra jamais 1.',
      },
    },
    {
      // Deux fractions dont l'une dépasse 1 et l'autre non, et un produit qui
      // tombe pile sur 1 : de quoi surprendre qui croit qu'un produit dépasse
      // toujours ses facteurs.
      id: 'e-9-1-9', type: 'plausible', palier: 3, piege: 'produit-de-fractions-plus-grand',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{4}{9} \\times \\dfrac{9}{4} = 1', attendu: true,
      explication:
        'Les deux fractions sont inverses l\'une de l\'autre : le numérateur et le '
        + 'dénominateur ont été échangés. Leur produit vaut donc 1. Multiplier par '
        + '4/9, plus petit que 1, **diminue** bel et bien 9/4 — et ça tombe '
        + 'exactement sur 1.',
    },
    {
      id: 'e-9-1-10', type: 'corriger', palier: 3, piege: 'inverse-et-oppose-confondus',
      consigne: 'Voici la recherche de l\'inverse de ce nombre. Trouve la ligne où l\'erreur apparaît.',
      enonce: '-\\dfrac{4}{5}',
      lignes: [
        { texte: 'Pour trouver l\'inverse, j\'échange le numérateur et le dénominateur.', fausse: false },
        { texte: 'J\'obtiens −5/4.', fausse: false },
        { texte: 'Un inverse ne peut pas être négatif, donc la réponse est 5/4.', fausse: true },
      ],
      explication:
        'Les deux premières lignes sont justes. La troisième invente une règle qui '
        + 'n\'existe pas. Deux nombres inverses ont toujours le MÊME signe, sinon '
        + 'leur produit serait négatif : (−4/5) × (−5/4) = 1, alors que '
        + '(−4/5) × 5/4 donne −1. L\'inverse de −4/5 est donc −5/4.',
    },
  ],

  problemes: [
    {
      id: 'p-9-1-1',
      enonce:
        'Un ruban mesure exactement 1 mètre. On le découpe en morceaux tous '
        + 'identiques, sans aucune perte.',
      questions: [
        { texte: 'Combien obtient-on de morceaux de 0,05 m ?', attendu: 20, unite: 'morceaux' },
        { texte: 'Et combien de morceaux de 1/8 de mètre ?', attendu: 8, unite: 'morceaux' },
      ],
    },
    {
      id: 'p-9-1-2',
      enonce:
        'Dans un jeu, on gagne la manche quand le produit des deux cartes tirées '
        + 'vaut exactement 1. Toutes les cartes portent des fractions '
        + 'irréductibles. Léa vient de tirer la carte 5/7.',
      questions: [
        { texte: 'Quel numérateur doit porter la carte gagnante ?', attendu: 7 },
        { texte: 'Et quel dénominateur ?', attendu: 5 },
        { texte: 'À la manche suivante, Léa tire la carte −4. Quel nombre la ferait gagner ? Donne-le en écriture décimale.', attendu: -0.25 },
      ],
    },
    {
      // L'inverse comme opération qui ANNULE : c'est exactement l'usage qu'en
      // fera la division au savoir-faire suivant, et le contexte le rend
      // visible sans en dire un mot.
      id: 'p-9-1-3',
      enonce:
        'Un programme de calcul multiplie le nombre choisi par 3/4. Anaïs cherche '
        + 'le programme qui annule celui-là : appliqué juste après, il doit '
        + 'redonner le nombre de départ.',
      questions: [
        { texte: 'Anaïs choisit 12. Que donne le premier programme ?', attendu: 9 },
        { texte: 'Le second programme multiplie par l\'inverse de 3/4. Quel est le numérateur de cette fraction ?', attendu: 4 },
        { texte: 'Applique ce second programme à 9 : que trouves-tu ?', attendu: 12 },
      ],
    },
    {
      id: 'p-9-1-4',
      enonce:
        'Dans un tableur, une colonne calcule l\'inverse de chaque nombre saisi '
        + 'dans la colonne d\'à côté. On y entre à la suite : 4 ; 0,5 ; 0 ; −2.',
      questions: [
        { texte: 'Quel résultat pour 4 ? Donne-le en écriture décimale.', attendu: 0.25 },
        { texte: 'Quel résultat pour −2 ? Donne-le en écriture décimale.', attendu: -0.5 },
        { texte: 'Pour combien de ces quatre nombres la colonne affiche-t-elle une erreur ?', attendu: 1 },
      ],
    },
    {
      id: 'p-9-1-5',
      enonce:
        'Un jeu enchaîne deux consignes : « multiplie ton score par −3/5 », puis '
        + '« multiplie le résultat par l\'inverse de −3/5 ». Sacha entre dans la '
        + 'partie avec 45 points.',
      questions: [
        { texte: 'Quel est son score après la première consigne ?', attendu: -27, unite: 'points' },
        { texte: 'Quel est son score après la seconde ?', attendu: 45, unite: 'points' },
      ],
    },
  ],

  test: [
    {
      id: 't-9-1-1', type: 'trous', consigne: 'Complète pour que le produit soit égal à 1.',
      enonce: '11 \\times \\dfrac{\\square}{\\square} = 1',
      champs: [
        { id: 'a', etiquette: 'numérateur', attendu: 1 },
        { id: 'b', etiquette: 'dénominateur', attendu: 11 },
      ],
      fausses: [{ valeur: -11, piege: 'inverse-et-oppose-confondus' }],
      revoir: 'propriete',
    },
    {
      id: 't-9-1-2', type: 'trous', consigne: 'Complète pour que le produit soit égal à 1.',
      enonce: '\\dfrac{5}{6} \\times \\dfrac{\\square}{\\square} = 1',
      champs: [
        { id: 'a', etiquette: 'numérateur', attendu: 6 },
        { id: 'b', etiquette: 'dénominateur', attendu: 5 },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-9-1-3', type: 'calcul', consigne: 'Quel est l\'inverse de ce nombre ?',
      enonce: '\\dfrac{1}{9}', attendu: 9,
      fausses: [{ valeur: -9, piege: 'inverse-et-oppose-confondus' }],
      revoir: 'propriete',
    },
    {
      id: 't-9-1-4', type: 'calcul', consigne: 'Quel est l\'inverse de ce nombre ?',
      enonce: '0{,}5', attendu: 2, revoir: 'exemple',
    },
    {
      id: 't-9-1-5', type: 'calcul', consigne: 'Quel est l\'inverse de ce nombre ?',
      enonce: '-\\dfrac{1}{4}', attendu: -4,
      fausses: [{ valeur: 4, piege: 'inverse-et-oppose-confondus' }],
      revoir: 'remarque',
    },
    {
      id: 't-9-1-6', type: 'trous', consigne: 'Donne l\'opposé, puis l\'inverse de ce nombre.',
      enonce: '20',
      champs: [
        { id: 'a', etiquette: 'son opposé', attendu: -20 },
        { id: 'b', etiquette: 'son inverse, en écriture décimale', attendu: 0.05 },
      ],
      revoir: 'definition',
    },
    {
      id: 't-9-1-7', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{3}{7} \\times \\dfrac{7}{3} = 1', attendu: true,
      explication:
        'Les deux fractions sont inverses l\'une de l\'autre — numérateur et '
        + 'dénominateur échangés. Leur produit vaut donc 1.',
      revoir: 'propriete',
    },
    {
      id: 't-9-1-8', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: '9 \\times (-9) = 1', attendu: false,
      explication:
        '9 × (−9) vaut −81. −9 est l\'**opposé** de 9 : c\'est leur somme qui fait 0. '
        + 'L\'inverse de 9 est 1/9.',
      piege: 'inverse-et-oppose-confondus', revoir: 'remarque',
    },
    {
      id: 't-9-1-9', type: 'calcul', consigne: 'Quel est l\'inverse de ce nombre ?',
      enonce: '\\dfrac{2}{5}', attendu: 2.5, revoir: 'propriete',
    },
    {
      id: 't-9-1-10', type: 'trous', consigne: 'Complète pour que le produit soit égal à 1.',
      enonce: '-\\dfrac{7}{2} \\times \\dfrac{\\square}{\\square} = 1',
      champs: [
        { id: 'a', etiquette: 'numérateur', attendu: -2 },
        { id: 'b', etiquette: 'dénominateur', attendu: 7 },
      ],
      fausses: [{ valeur: 2, piege: 'inverse-et-oppose-confondus' }],
      revoir: 'remarque',
    },
  ],
};
