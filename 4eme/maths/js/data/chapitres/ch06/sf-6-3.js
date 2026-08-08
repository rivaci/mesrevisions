// Chapitre 6, savoir-faire 3 — Utiliser les puissances de 10.
//
// Tout ce savoir-faire tient sur une phrase que les élèves n'entendent presque
// jamais dite aussi platement : un exposant négatif ne donne PAS un nombre
// négatif. 10⁻³ vaut 0,001 — un nombre petit, et positif. La confusion est si
// stable qu'elle survit à la règle apprise par cœur : l'élève sait réciter
// « 10⁻³ = 1/1000 » et écrit −1000 deux lignes plus bas.
//
// ── Pourquoi l'activité descend une suite ─────────────────────────────────
//
// On ne DÉFINIT pas 10⁻¹ : on le fait apparaître comme la seule façon de
// prolonger 10³, 10², 10¹, 10⁰ sans casser la régularité « on divise par 10 à
// chaque ligne ». C'est la même honnêteté qu'au chapitre 1 pour le produit de
// deux négatifs : la définition est un CHOIX de cohérence, et l'élève le voit
// se faire au lieu de le subir. Un élève qui a descendu la suite lui-même ne
// peut plus croire que le résultat passe sous zéro : il vient de le voir
// rester positif à chaque étape.
//
// ── Les deux items neutres ────────────────────────────────────────────────
//
// Item 3 : un exposant POSITIF au milieu d'une série d'exposants négatifs.
// Sans lui, « puissance de 10 = petit nombre » remplacerait la règle par une
// autre règle fausse, tout aussi coûteuse.
// Item 10 : un « plausible » dont la réponse est oui. Sans lui, « on me demande
// si c'est plausible, donc c'est faux » suffirait à réussir la série.

export default {
  id: 'sf-6-3',
  titre: 'Utiliser les puissances de 10',
  attendus: [
    'Il utilise les puissances de 10 d\'exposant positif ou négatif.',
  ],

  // La suite descend d'un rang par ligne, et le résultat est divisé par 10 à
  // chaque fois. Arrivé à 10⁰ = 1, la ligne suivante ne peut donner que 0,1 :
  // l'élève produit lui-même la valeur avant qu'on lui donne le nom
  // « exposant négatif ». Et il constate que rien ne passe sous zéro.
  decouvrir: {
    titre: 'La suite qui descend sans jamais passer sous zéro',
    texte:
      'Regarde cette suite. À chaque ligne, l\'exposant diminue de 1 — et le '
      + 'résultat est divisé par 10.',
    lignes: [
      { calcul: '10³', resultat: '1 000' },
      { calcul: '10²', resultat: '100' },
      { calcul: '10¹', resultat: '10' },
      { calcul: '10⁰', resultat: '1' },
    ],
    question: 'Si on continue de la même façon, que valent 10⁻¹ puis 10⁻² ?',
    champs: [
      { id: 'a', etiquette: '10⁻¹ =', attendu: 0.1 },
      { id: 'b', etiquette: '10⁻² =', attendu: 0.01 },
    ],
    conclusion:
      'Un exposant négatif donne un nombre **petit**, mais toujours **positif** : '
      + 'on divise par 10, on ne descend pas sous zéro. 10⁻³ vaut 0,001 — et pas '
      + '−1 000, ni −0,001.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Puissance de 10 d\'exposant positif',
      texte:
        'Pour un entier n positif, **10ⁿ** est le produit de **n** facteurs 10.\n'
        + 'Son écriture décimale est un **1 suivi de n zéros** : 10⁴ = 10 000.\n'
        + 'Par convention, **10⁰ = 1**.',
    },
    {
      type: 'definition',
      titre: 'Puissance de 10 d\'exposant négatif',
      texte:
        'Pour un entier n positif, **10⁻ⁿ** est l\'inverse de 10ⁿ : 10⁻ⁿ = 1 ÷ 10ⁿ.\n'
        + 'Son écriture décimale est **0, puis n−1 zéros, puis un 1** : 10⁻³ = 0,001.\n'
        + 'C\'est un nombre plus petit que 1, et **positif**. Le signe − porte sur '
        + 'l\'exposant, pas sur le nombre.',
    },
    {
      type: 'propriete',
      titre: 'Produit et quotient de deux puissances de 10',
      texte:
        '10^a × 10^b = 10^(a+b)   —   on **additionne** les exposants.\n'
        + '10^a ÷ 10^b = 10^(a−b)   —   on les **soustrait**.\n'
        + 'Ces règles valent pour des exposants positifs comme négatifs.',
    },
    {
      type: 'remarque',
      titre: 'Ce qui n\'existe pas',
      texte:
        'Il n\'y a **aucune** règle pour une **somme** : 10³ + 10² ne s\'écrit pas '
        + 'comme une puissance de 10. On calcule les deux, puis on additionne : '
        + '1 000 + 100 = 1 100.\n'
        + 'Et les règles ci-dessus exigent la **même base** : 2³ × 5² ne devient '
        + 'pas 10⁵. On calcule chaque puissance séparément : 8 × 25 = 200.',
    },
    {
      type: 'exemple',
      texte:
        '10⁶ = 1 000 000   ·   10⁻⁴ = 0,0001\n'
        + '10⁵ × 10⁻³ = 10⁵⁺⁽⁻³⁾ = 10² = 100\n'
        + '10⁶ ÷ 10⁴ = 10⁶⁻⁴ = 10² = 100',
    },
  ],

  // La méthode prend exprès un produit où les deux exposants sont de signes
  // contraires : c'est là que les deux confusions du savoir-faire se croisent
  // — additionner au lieu de multiplier les exposants, et croire que le − du
  // 10⁻³ va ressortir dans le résultat.
  methode: {
    titre: 'D\'un produit de puissances de 10 à l\'écriture décimale',
    enonce: 'Écrire A = 10⁵ × 10⁻³ en écriture décimale.',
    etapes: [
      {
        texte: 'Les deux puissances ont la même base, 10. Je peux donc additionner les exposants.',
        note: 'La base d\'abord : c\'est la condition d\'emploi de la règle.',
      },
      {
        texte: 'A = 10⁵⁺⁽⁻³⁾ = 10².',
        note: '5 + (−3) = 2. On additionne les exposants, on ne les multiplie pas : 5 × (−3) donnerait −15, qui n\'a rien à voir.',
      },
      {
        texte: 'A = 10² = 100.',
        note: 'Un 1 suivi de deux zéros.',
      },
    ],
    controle:
      'Le contrôle : réécris les deux facteurs en entier et refais le calcul. '
      + '100 000 × 0,001 = 100 — tu retombes bien sur ta réponse. Et regarde le '
      + 'signe avant de rendre : une puissance de 10 est toujours positive, '
      + 'exposant négatif ou pas. Si ta réponse est négative, c\'est le − de '
      + 'l\'exposant qui a glissé au mauvais endroit.',
  },

  entrainement: [
    {
      id: 'e-6-3-1', type: 'calcul', palier: 1, piege: 'exposant-negatif-pris-pour-nombre-negatif',
      consigne: 'Donne l\'écriture décimale de ce nombre.',
      enonce: '10^{-3}',
      attendu: 0.001,
      fausses: [
        { valeur: -1000, piege: 'exposant-negatif-pris-pour-nombre-negatif' },
        { valeur: -0.001, piege: 'exposant-negatif-pris-pour-nombre-negatif' },
        { valeur: 0.0001, piege: 'exposant-negatif-pris-pour-nombre-negatif' },
      ],
    },
    {
      id: 'e-6-3-2', type: 'calcul', palier: 1, piege: 'exposant-negatif-pris-pour-nombre-negatif',
      consigne: 'Donne l\'écriture décimale de ce nombre.',
      enonce: '10^{-5}',
      attendu: 0.00001,
      fausses: [
        { valeur: -100000, piege: 'exposant-negatif-pris-pour-nombre-negatif' },
        // Cinq zéros écrits APRÈS la virgule au lieu de quatre : l'exposant
        // compte les rangs de décalage, pas les zéros. C'est la version
        // « comptage » de la même confusion.
        { valeur: 0.000001, piege: 'exposant-negatif-pris-pour-nombre-negatif' },
      ],
    },
    {
      // NEUTRE — l'exposant est positif, donc la confusion « exposant négatif
      // = nombre négatif » ne joue pas ici. L'item garde exactement la forme
      // des deux précédents et reste piégeux par ailleurs (la valeur 70), pour
      // qu'il ne se repère pas comme « le facile de la série ».
      id: 'e-6-3-3', type: 'calcul', palier: 1, neutre: true, piege: 'exposant-negatif-pris-pour-nombre-negatif',
      consigne: 'Donne l\'écriture décimale de ce nombre.',
      enonce: '10^{7}',
      attendu: 10000000,
      fausses: [
        { valeur: 70, piege: 'exposant-pris-pour-facteur' },
      ],
    },
    {
      id: 'e-6-3-4', type: 'comparer', palier: 1, piege: 'exposant-negatif-pris-pour-nombre-negatif',
      consigne: 'Compare ces deux nombres.',
      enonce: '10^{-3} \\ldots -10^{3}',
      attendu: '>',
      fausses: [
        { valeur: '<', piege: 'exposant-negatif-pris-pour-nombre-negatif' },
        // Répondre « = », c'est lire les deux écritures comme la même chose :
        // le signe − n'est pas au même endroit, et ça change tout.
        { valeur: '=', piege: 'signe-et-exposant' },
      ],
    },
    {
      id: 'e-6-3-5', type: 'trous', palier: 2, piege: 'exposants-multiplies',
      consigne: 'Complète l\'exposant manquant.',
      enonce: '10^{3} \\times 10^{4} = 10^{\\square}',
      champs: [{ id: 'a', attendu: 7 }],
      fausses: [
        { valeur: 12, piege: 'exposants-multiplies' },
      ],
    },
    {
      id: 'e-6-3-6', type: 'trous', palier: 2, piege: 'exposants-multiplies',
      consigne: 'Complète l\'exposant manquant.',
      enonce: '10^{5} \\times 10^{-3} = 10^{\\square}',
      champs: [{ id: 'a', attendu: 2 }],
      fausses: [
        { valeur: -15, piege: 'exposants-multiplies' },
      ],
    },
    {
      id: 'e-6-3-7', type: 'calcul', palier: 2, piege: 'regle-inventee-pour-la-somme',
      consigne: 'Donne l\'écriture décimale de ce nombre.',
      enonce: '10^{3} + 10^{2}',
      attendu: 1100,
      fausses: [
        { valeur: 100000, piege: 'regle-inventee-pour-la-somme' },
        // 10⁶ vient de la même confusion que 10⁵ : avoir appliqué UNE règle des
        // produits à une somme. Le piège reste donc celui de la somme, et non
        // « exposants multipliés » — dont la règle (« on additionne les
        // exposants ») renverrait ici l'élève vers 10⁵, l'autre réponse fausse
        // du même exercice.
        { valeur: 1000000, piege: 'regle-inventee-pour-la-somme' },
      ],
    },
    {
      id: 'e-6-3-8', type: 'calcul', palier: 2, piege: 'bases-differentes-fusionnees',
      consigne: 'Donne l\'écriture décimale de ce nombre.',
      enonce: '2^{3} \\times 5^{2}',
      attendu: 200,
      fausses: [
        // 2 × 5 = 10 et 3 + 2 = 5 : deux règles mélangées, et le résultat a
        // l'air d'une belle puissance de 10, ce qui le rend très tentant.
        { valeur: 100000, piege: 'bases-differentes-fusionnees' },
        { valeur: 60, piege: 'exposant-pris-pour-facteur' },
      ],
    },
    {
      id: 'e-6-3-9', type: 'plausible', palier: 2, piege: 'exposant-negatif-pris-pour-nombre-negatif',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '10^{-4} = -10\\,000',
      attendu: false,
      explication:
        'Non : 10⁻⁴ vaut 0,0001. L\'exposant négatif rend le nombre **petit**, il '
        + 'ne le fait pas passer sous zéro. La réponse proposée, −10 000, est à la '
        + 'fois négative et immense — deux fois à côté.',
    },
    {
      // NEUTRE — que des exposants positifs : la confusion travaillée dans les
      // autres items ne joue pas. Et la réponse est « oui », ce qui casse la
      // stratégie « on me demande si c'est plausible, donc c'est faux ». Il
      // n'est pas plus facile pour autant : il faut soustraire les exposants.
      id: 'e-6-3-10', type: 'plausible', palier: 2, neutre: true, piege: 'exposant-negatif-pris-pour-nombre-negatif',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '10^{6} \\div 10^{4} = 100',
      attendu: true,
      explication:
        'Oui : pour un quotient de puissances de même base, on soustrait les '
        + 'exposants. 6 − 4 = 2, donc le résultat vaut 10², c\'est-à-dire 100.',
    },
  ],

  problemes: [
    {
      id: 'p-6-3-1',
      enonce:
        'Un cheveu humain a un diamètre d\'environ 0,0001 m. On veut écrire ce '
        + 'diamètre sous la forme d\'une puissance de 10.',
      questions: [
        { texte: 'Quel exposant faut-il donner à 10 ?', attendu: -4 },
        { texte: 'Combien de zéros séparent la virgule du chiffre 1 dans 0,0001 ?', attendu: 3 },
      ],
    },
    {
      id: 'p-6-3-2',
      enonce:
        'La lumière parcourt environ 300 000 km en une seconde. On veut écrire '
        + 'cette distance sous la forme 3 × 10ⁿ km.',
      questions: [
        { texte: 'Que vaut n ?', attendu: 5 },
        { texte: 'Quelle distance la lumière parcourt-elle en 100 secondes, en km ?', attendu: 30000000, unite: 'km' },
      ],
    },
    {
      id: 'p-6-3-3',
      enonce:
        'Un virus mesure environ 10⁻⁷ m et une bactérie environ 10⁻⁶ m. Les deux '
        + 'sont invisibles à l\'œil nu, mais pas de la même façon.',
      questions: [
        { texte: 'Combien de fois la bactérie est-elle plus grande que le virus ?', attendu: 10 },
        { texte: 'Dans l\'écriture décimale de 10⁻⁷, combien de zéros séparent la virgule du chiffre 1 ?', attendu: 6 },
      ],
    },
    {
      id: 'p-6-3-4',
      enonce:
        'Une feuille de papier a une épaisseur de 10⁻⁴ m. On empile des feuilles '
        + 'identiques, bien à plat.',
      questions: [
        { texte: 'Quelle est l\'épaisseur d\'une pile de 10 000 feuilles, en m ?', attendu: 1, unite: 'm' },
        { texte: 'Et celle d\'une pile de 100 feuilles, en m ?', attendu: 0.01, unite: 'm' },
      ],
    },
    {
      id: 'p-6-3-5',
      enonce:
        'Un disque dur peut stocker 10¹² octets. Une photo prise avec un téléphone '
        + 'pèse environ 10⁶ octets.',
      questions: [
        { texte: 'Combien de photos le disque peut-il contenir ?', attendu: 1000000, unite: 'photos' },
        { texte: 'Quel est l\'exposant de 10 dans ce nombre de photos ?', attendu: 6 },
      ],
    },
  ],

  test: [
    {
      id: 't-6-3-1', type: 'calcul',
      consigne: 'Donne l\'écriture décimale de ce nombre.',
      enonce: '10^{-2}', attendu: 0.01, revoir: 'definition',
    },
    {
      id: 't-6-3-2', type: 'calcul',
      consigne: 'Donne l\'écriture décimale de ce nombre.',
      enonce: '10^{8}', attendu: 100000000, revoir: 'definition',
    },
    {
      id: 't-6-3-3', type: 'calcul',
      consigne: 'Donne l\'écriture décimale de ce nombre.',
      enonce: '10^{-6}', attendu: 0.000001, revoir: 'definition',
    },
    {
      id: 't-6-3-4', type: 'trous',
      consigne: 'Complète l\'exposant manquant.',
      enonce: '10^{4} \\times 10^{3} = 10^{\\square}',
      champs: [{ id: 'a', attendu: 7 }],
      piege: 'exposants-multiplies', revoir: 'propriete',
    },
    {
      id: 't-6-3-5', type: 'trous',
      consigne: 'Complète l\'exposant manquant.',
      enonce: '10^{6} \\div 10^{2} = 10^{\\square}',
      champs: [{ id: 'a', attendu: 4 }],
      piege: 'exposants-multiplies', revoir: 'propriete',
    },
    {
      id: 't-6-3-6', type: 'calcul',
      consigne: 'Donne l\'écriture décimale de ce nombre.',
      enonce: '10^{2} + 10^{3}', attendu: 1100,
      piege: 'regle-inventee-pour-la-somme', revoir: 'remarque',
    },
    {
      id: 't-6-3-7', type: 'calcul',
      consigne: 'Donne l\'écriture décimale de ce nombre.',
      enonce: '2^{2} \\times 5^{3}', attendu: 500,
      piege: 'bases-differentes-fusionnees', revoir: 'remarque',
    },
    {
      id: 't-6-3-8', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '10^{-2} = -100', attendu: false,
      explication:
        'Non : 10⁻² vaut 0,01. Le signe − est sur l\'exposant, donc il rend le '
        + 'nombre petit, pas négatif.',
      piege: 'exposant-negatif-pris-pour-nombre-negatif', revoir: 'definition',
    },
    {
      id: 't-6-3-9', type: 'comparer',
      consigne: 'Compare ces deux nombres.',
      enonce: '10^{-4} \\ldots 10^{-2}',
      attendu: '<',
      fausses: [{ valeur: '>', piege: 'exposant-negatif-pris-pour-nombre-negatif' }],
      piege: 'exposant-negatif-pris-pour-nombre-negatif', revoir: 'definition',
    },
    {
      id: 't-6-3-10', type: 'corriger',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '10^{4} \\times 10^{-2}',
      lignes: [
        { texte: 'Les deux puissances ont la même base, donc on additionne les exposants.', fausse: false },
        { texte: '4 + (−2) = 2, donc 10⁴ × 10⁻² = 10²', fausse: false },
        { texte: '10² = 20', fausse: true },
      ],
      explication:
        'Les deux premières lignes sont justes : le calcul des exposants est bon. '
        + 'C\'est à la troisième que ça casse — l\'exposant a été lu comme un '
        + 'facteur. 10² vaut 10 × 10 = 100, pas 10 × 2.',
      piege: 'exposant-pris-pour-facteur', revoir: 'definition',
    },
  ],
};
