// Chapitre 3, savoir-faire 5 — Démontrer qu'un triangle est rectangle.
//
// C'est le savoir-faire qui clôt le chapitre, et le seul où l'élève ne cherche
// pas une longueur : il produit une PREUVE. La difficulté n'est pas le calcul
// — deux carrés et une addition — mais le geste de raisonnement : calculer les
// deux membres SÉPARÉMENT, sans jamais écrire l'égalité avant de l'avoir
// vérifiée. Écrire « AB² = AC² + BC² » en tête de copie, c'est déjà supposer
// ce qu'on veut démontrer.
//
// D'où le choix du type `comparer` comme colonne vertébrale de l'entraînement :
// répondre par <, = ou > oblige à traiter les deux membres comme deux nombres
// à confronter, jamais comme une égalité posée d'avance.

export default {
  id: 'sf-3-5',
  titre: 'Démontrer qu\'un triangle est rectangle',
  attendus: [
    'Il utilise la réciproque du théorème de Pythagore pour démontrer qu\'un triangle est rectangle.',
    'Il détermine si un triangle est rectangle à partir des longueurs de ses trois côtés.',
  ],

  // On ne part pas du théorème : on part d'un problème de chantier où l'équerre
  // ne sert à rien, parce que le coin est trop grand pour elle. La mesure des
  // trois côtés devient alors le seul recours — et l'égalité apparaît comme un
  // TEST, pas comme une formule à réciter.
  decouvrir: {
    titre: 'Le coin est-il vraiment droit ?',
    texte:
      'Sur un chantier, aucune équerre n\'est assez grande pour vérifier l\'angle '
      + 'd\'un mur de plusieurs mètres. Alors on mesure les trois côtés au '
      + 'décamètre, et on compare deux nombres.',
    lignes: [
      { calcul: 'Mur A : 3 m, 4 m et 5 m', resultat: '5² = 25 et 3² + 4² = 25 → le coin est droit' },
      { calcul: 'Mur B : 5 m, 12 m et 13 m', resultat: '13² = 169 et 5² + 12² = 169 → le coin est droit' },
      { calcul: 'Mur C : 4 m, 7 m et 9 m', resultat: '9² = 81 et 4² + 7² = 65 → le coin n\'est pas droit' },
    ],
    question: 'À ton tour : un quatrième mur mesure 9 m, 12 m et 15 m. Calcule les deux nombres.',
    champs: [
      { id: 'a', etiquette: '15² =', attendu: 225 },
      { id: 'b', etiquette: '9² + 12² =', attendu: 225 },
    ],
    conclusion:
      'Tes deux nombres sont **égaux** : le coin est droit. C\'est la **réciproque '
      + 'du théorème de Pythagore**. Quand l\'égalité tombe juste, l\'angle droit est '
      + 'là ; quand elle ne tombe pas juste — comme au mur C — il n\'y est pas.',
  },

  cours: [
    {
      type: 'theoreme',
      titre: 'Réciproque du théorème de Pythagore',
      texte:
        'Si, dans un triangle, le **carré du plus grand côté** est **égal** à la '
        + 'somme des carrés des deux autres, alors ce triangle est **rectangle**.\n'
        + 'L\'angle droit se trouve au sommet **opposé** à ce plus grand côté.',
    },
    {
      type: 'propriete',
      titre: 'Quand l\'égalité ne tombe pas juste',
      texte:
        'Si le carré du plus grand côté **n\'est pas égal** à la somme des carrés '
        + 'des deux autres, alors le triangle **n\'est pas rectangle**.\n'
        + 'Il n\'y a pas de « presque » : l\'égalité est exacte ou elle n\'est pas.',
    },
    {
      type: 'remarque',
      titre: 'Un seul côté peut être l\'hypoténuse',
      texte:
        'Commence toujours par repérer le **plus grand** des trois côtés : c\'est le '
        + 'seul candidat au rôle d\'hypoténuse. L\'ordre dans lequel l\'énoncé cite '
        + 'les longueurs ne veut rien dire.',
    },
    {
      type: 'remarque',
      titre: 'La rédaction attendue',
      texte:
        'On calcule les deux membres **séparément**, puis on compare :\n'
        + '**D\'une part** : le carré du plus grand côté.\n'
        + '**D\'autre part** : la somme des carrés des deux autres.\n'
        + '**Donc**, d\'après la réciproque du théorème de Pythagore…',
    },
    {
      type: 'exemple',
      texte:
        'Triangle de côtés 6 cm, 8 cm et 10 cm : 10² = 100 et 6² + 8² = 36 + 64 = 100. '
        + 'Les deux membres sont égaux, donc le triangle est rectangle.',
    },
  ],

  methode: {
    titre: 'Rédiger la démonstration',
    enonce: 'Le triangle ABC a pour côtés AB = 6,5 cm, BC = 5,2 cm et AC = 3,9 cm. Est-il rectangle ?',
    etapes: [
      {
        texte: 'Le plus grand côté est [AB], qui mesure 6,5 cm.',
        note: 'S\'il y a un angle droit, il est au sommet C — celui qui n\'est pas sur [AB].',
      },
      {
        texte: 'D\'une part : AB² = 6,5² = 42,25.',
        note: 'Je calcule ce membre tout seul, sans rien écrire de l\'autre côté.',
      },
      {
        texte: 'D\'autre part : BC² + AC² = 5,2² + 3,9² = 27,04 + 15,21 = 42,25.',
        note: 'Deuxième membre, calculé de son côté lui aussi.',
      },
      {
        texte: 'Je compare : 42,25 = 42,25, donc AB² = BC² + AC².',
        note: 'C\'est seulement maintenant que l\'égalité s\'écrit.',
      },
      {
        texte: 'Donc, d\'après la réciproque du théorème de Pythagore, le triangle ABC est rectangle en C.',
        note: 'On cite le théorème par son nom, et on nomme le sommet.',
      },
    ],
    controle:
      'Le contrôle : l\'angle droit est toujours au sommet OPPOSÉ au plus grand côté. '
      + 'Ici le plus grand côté est [AB], donc l\'angle droit est en C — jamais en A '
      + 'ni en B. Si tu as annoncé l\'angle droit sur un sommet du plus grand côté, '
      + 'reprends.',
  },

  entrainement: [
    {
      id: 'e-3-5-1', type: 'calcul', palier: 1, piege: 'carre-pris-pour-double',
      consigne: 'Un triangle a pour côtés 10 cm, 24 cm et 26 cm. Calcule le carré du plus grand côté.',
      enonce: '26^2', attendu: 676,
      fausses: [{ valeur: 52, piege: 'carre-pris-pour-double' }],
    },
    {
      id: 'e-3-5-2', type: 'calcul', palier: 1, piege: 'carre-pris-pour-double',
      consigne: 'Dans ce même triangle, calcule la somme des carrés des deux autres côtés.',
      enonce: '10^2 + 24^2', attendu: 676,
      fausses: [{ valeur: 68, piege: 'carre-pris-pour-double' }],
    },
    {
      id: 'e-3-5-3', type: 'comparer', palier: 1, piege: 'reciproque-confondue',
      consigne: 'Compare ces deux nombres.',
      enonce: '26^2 \\ldots 10^2 + 24^2', attendu: '=',
      fausses: [{ valeur: '<', piege: 'carre-pris-pour-double' }],
    },
    {
      // Neutre : ici l'égalité ne tombe PAS juste. Sans cet item, « on me montre
      // trois longueurs, donc le triangle est rectangle » suffirait à réussir
      // toute la série sans jamais comparer quoi que ce soit.
      id: 'e-3-5-4', type: 'comparer', palier: 1, neutre: true, piege: 'reciproque-confondue',
      consigne: 'Compare ces deux nombres.',
      enonce: '9^2 \\ldots 4^2 + 7^2', attendu: '>',
      fausses: [{ valeur: '=', piege: 'reciproque-confondue' }],
    },
    {
      id: 'e-3-5-5', type: 'plausible', palier: 2, piege: 'hypotenuse-mal-identifiee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Triangle } 8 ; 15 ; 17 \\quad \\text{: } 15^2 = 8^2 + 17^2',
      attendu: false,
      explication:
        'Même sans calculer : 8² + 17² est forcément **plus grand** que 17², donc plus '
        + 'grand que 15². L\'égalité est impossible. C\'est le carré du **plus grand** '
        + 'côté, 17, qu\'il fallait isoler — et là, 17² = 289 = 64 + 225.',
    },
    {
      // Neutre : ici la réponse est « oui ». Un élève qui répond au motif que
      // « quand on me demande si c'est plausible, c'est que ça ne l'est pas »
      // se trompe — et les nombres 20, 21, 29 ne sont pas un triplet connu,
      // donc il faut vraiment calculer.
      id: 'e-3-5-6', type: 'plausible', palier: 2, neutre: true, piege: 'reciproque-confondue',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Triangle } 20 ; 21 ; 29 \\quad \\text{: } 29^2 = 20^2 + 21^2',
      attendu: true,
      explication:
        '29² = 841, et 20² + 21² = 400 + 441 = 841. Les deux membres sont égaux : le '
        + 'triangle est bien rectangle, en l\'angle opposé au côté de 29.',
    },
    {
      // Le plus grand côté est cité au MILIEU de l'énoncé : impossible de s'en
      // sortir par la position, il faut comparer les trois longueurs.
      id: 'e-3-5-7', type: 'trous', palier: 2, piege: 'hypotenuse-mal-identifiee',
      consigne: 'Un triangle a pour côtés 24 cm, 25 cm et 7 cm. Complète l\'égalité qu\'il faut vérifier.',
      enonce: '\\square^2 = 7^2 + 24^2',
      champs: [{ id: 'a', attendu: 25 }],
      fausses: [{ valeur: 24, piege: 'hypotenuse-mal-identifiee' }],
    },
    {
      id: 'e-3-5-8', type: 'corriger', palier: 3, piege: 'reciproque-confondue',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '5 ; 6 ; 8',
      lignes: [
        { texte: 'Le plus grand côté mesure 8 cm.', fausse: false },
        { texte: "D'une part : 8² = 64.", fausse: false },
        { texte: "D'autre part : 5² + 6² = 25 + 36 = 61.", fausse: false },
        { texte: '64 et 61 sont presque égaux, donc le triangle est rectangle.', fausse: true },
      ],
      explication:
        'Tous les calculs sont justes : c\'est la conclusion qui ne l\'est pas. La '
        + 'réciproque exige une égalité **exacte**. Comme 64 ≠ 61, le triangle n\'est '
        + 'pas rectangle — et « presque » ne démontre rien.',
    },
    {
      id: 'e-3-5-9', type: 'corriger', palier: 3, piege: 'hypotenuse-mal-identifiee',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '12 ; 16 ; 20',
      lignes: [
        { texte: 'Le plus grand côté mesure 20 cm.', fausse: false },
        { texte: "D'une part : 16² = 256.", fausse: true },
        { texte: "D'autre part : 12² + 20² = 144 + 400 = 544.", fausse: false },
        { texte: "256 ≠ 544, donc le triangle n'est pas rectangle.", fausse: false },
      ],
      explication:
        'La première ligne repérait bien le plus grand côté, puis il a été oublié : '
        + 'c\'est 20² qu\'il fallait isoler, pas 16². Le bon calcul donne 20² = 400 et '
        + '12² + 16² = 144 + 256 = 400. Le triangle **est** rectangle.',
    },
    {
      id: 'e-3-5-10', type: 'vraifaux', palier: 3, piege: 'pythagore-sans-angle-droit',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Dans un triangle, le carré du plus long côté est toujours égal à la somme des carrés des deux autres.',
      attendu: false,
      contreExemple: {
        invite:
          'Un triangle a deux côtés de 3 cm et 4 cm. Donne une longueur possible pour '
          + 'le troisième côté, plus grande que 4 cm, telle que le triangle ne soit PAS rectangle.',
        champs: [{ id: 'a', etiquette: 'le troisième côté, en cm' }],
        // On vérifie trois propriétés, pas une valeur : le côté doit être le plus
        // long (> 4), le triangle doit exister (< 3 + 4), et l'égalité de Pythagore
        // ne doit pas tomber juste (≠ 5). Beaucoup de réponses conviennent.
        valide: (a) => Number.isFinite(a) && a > 4 && a < 7 && a * a !== 25,
        exemple: '6 convient : 6² = 36, alors que 3² + 4² = 25. Le triangle existe, mais il n\'est pas rectangle.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-3-5-1',
      enonce:
        'Un menuisier assemble un cadre. Il mesure les deux baguettes qui se '
        + 'rejoignent dans un coin : 60 cm et 80 cm. Puis il mesure la distance entre '
        + 'leurs deux extrémités libres : 100 cm.',
      questions: [
        { texte: 'Combien vaut le carré de cette distance ?', attendu: 10000, unite: 'cm²' },
        { texte: 'Combien vaut la somme des carrés des deux baguettes ?', attendu: 10000, unite: 'cm²' },
        { texte: 'Le coin est-il droit ? Réponds 1 pour oui, 0 pour non.', attendu: 1 },
      ],
    },
    {
      id: 'p-3-5-2',
      enonce:
        'Léa délimite un potager triangulaire avec de la ficelle. Les trois côtés '
        + 'mesurent 1,2 m, 3,5 m et 3,7 m. Elle voudrait un coin bien droit pour y '
        + 'poser un bac rectangulaire.',
      questions: [
        { texte: 'Combien vaut le carré du plus grand côté ?', attendu: 13.69, unite: 'm²' },
        { texte: 'Combien vaut la somme des carrés des deux autres ?', attendu: 13.69, unite: 'm²' },
      ],
    },
    {
      id: 'p-3-5-3',
      enonce:
        'Un technicien vérifie qu\'une porte est d\'équerre. Depuis le coin, il marque '
        + 'un point à 45 cm sur le montant et un autre à 60 cm sur la traverse, puis '
        + 'il mesure la distance entre ces deux points : 76 cm.',
      questions: [
        { texte: 'Combien vaut le carré de la distance mesurée ?', attendu: 5776, unite: 'cm²' },
        { texte: 'Combien vaut la somme des carrés des deux repères ?', attendu: 5625, unite: 'cm²' },
        { texte: 'Le coin est-il droit ? Réponds 1 pour oui, 0 pour non.', attendu: 0 },
      ],
    },
    {
      id: 'p-3-5-4',
      enonce:
        'Un cerf-volant a la forme d\'un triangle dont les côtés mesurent 42 cm, '
        + '58 cm et 40 cm. Le fabricant affirme sur la notice qu\'il possède un angle droit.',
      questions: [
        { texte: 'Combien vaut le carré du plus grand côté ?', attendu: 3364, unite: 'cm²' },
        { texte: 'Combien vaut la somme des carrés des deux autres ?', attendu: 3364, unite: 'cm²' },
      ],
    },
    {
      id: 'p-3-5-5',
      enonce:
        'Les bâtisseurs égyptiens tendaient une corde à 13 nœuds régulièrement '
        + 'espacés, qui délimitent 12 intervalles égaux. En la tendant en triangle de '
        + '3, 4 et 5 intervalles, ils obtenaient un coin parfaitement droit.',
      questions: [
        { texte: 'Combien vaut 5² ?', attendu: 25 },
        { texte: 'Combien vaut 3² + 4² ?', attendu: 25 },
        { texte: 'Avec 2, 5 et 5 intervalles, le coin serait-il droit ? Réponds 1 pour oui, 0 pour non.', attendu: 0 },
      ],
    },
  ],

  test: [
    {
      id: 't-3-5-1', type: 'comparer', consigne: 'Compare ces deux nombres.',
      enonce: '13^2 \\ldots 5^2 + 12^2', attendu: '=', revoir: 'theoreme',
    },
    {
      id: 't-3-5-2', type: 'comparer', consigne: 'Compare ces deux nombres.',
      enonce: '11^2 \\ldots 6^2 + 8^2', attendu: '>', revoir: 'propriete',
    },
    {
      id: 't-3-5-3', type: 'calcul',
      consigne: 'Un triangle a pour côtés 9 cm, 12 cm et 15 cm. Calcule la somme des carrés des deux plus petits côtés.',
      enonce: '9^2 + 12^2', attendu: 225, revoir: 'exemple',
    },
    {
      id: 't-3-5-4', type: 'trous',
      consigne: 'Un triangle a pour côtés 40 cm, 9 cm et 41 cm. Complète l\'égalité qu\'il faut vérifier.',
      enonce: '\\square^2 = 9^2 + 40^2', champs: [{ id: 'a', attendu: 41 }], revoir: 'remarque',
    },
    {
      id: 't-3-5-5', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Triangle } 7 ; 8 ; 11 \\quad \\text{: } 11^2 = 7^2 + 8^2',
      attendu: false,
      explication:
        '11² = 121, alors que 7² + 8² = 49 + 64 = 113. Les deux membres diffèrent, '
        + 'donc le triangle n\'est pas rectangle.',
      piege: 'reciproque-confondue', revoir: 'propriete',
    },
    {
      id: 't-3-5-6', type: 'comparer', consigne: 'Compare ces deux nombres.',
      enonce: '17^2 \\ldots 8^2 + 15^2', attendu: '=', revoir: 'theoreme',
    },
    {
      id: 't-3-5-7', type: 'calcul',
      consigne: 'Un triangle a pour côtés 1,6 m ; 3 m et 3,4 m. Calcule le carré du plus grand côté.',
      enonce: '(3{,}4)^2', attendu: 11.56, revoir: 'exemple',
    },
    {
      id: 't-3-5-8', type: 'corriger',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '15 ; 20 ; 25',
      lignes: [
        { texte: 'Le plus grand côté mesure 25 cm.', fausse: false },
        { texte: "D'une part : 25² = 625.", fausse: false },
        { texte: "D'autre part : 15² + 20² = 30 + 40 = 70.", fausse: true },
        { texte: "625 ≠ 70, donc le triangle n'est pas rectangle.", fausse: false },
      ],
      explication:
        'Troisième ligne : 15² n\'est pas 30 et 20² n\'est pas 40 — un carré n\'est pas '
        + 'un double. En réalité 225 + 400 = 625 : le triangle **est** rectangle.',
      piege: 'carre-pris-pour-double', revoir: 'remarque',
    },
    {
      id: 't-3-5-9', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Triangle } 1{,}5 ; 2 ; 2{,}5 \\quad \\text{: } (2{,}5)^2 = (1{,}5)^2 + 2^2',
      attendu: true,
      explication:
        '2,5² = 6,25 et 1,5² + 2² = 2,25 + 4 = 6,25. L\'égalité est exacte : le triangle '
        + 'est rectangle.',
      revoir: 'theoreme',
    },
    {
      id: 't-3-5-10', type: 'vraifaux',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Un triangle de côtés 5 cm, 12 cm et 13 cm est rectangle en l\'angle opposé au côté de 12 cm.',
      attendu: false,
      contreExemple: {
        invite: 'Quelle est la longueur du côté opposé à l\'angle droit ?',
        champs: [{ id: 'a', etiquette: 'longueur, en cm' }],
        valide: (a) => a === 13,
        exemple: 'L\'angle droit est opposé au PLUS GRAND côté, celui de 13 cm, puisque 13² = 5² + 12².',
      },
      piege: 'hypotenuse-mal-identifiee', revoir: 'remarque',
    },
  ],
};
