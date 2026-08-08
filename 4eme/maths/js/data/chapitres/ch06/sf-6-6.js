// Savoir-faire 6-6 — Utiliser les préfixes, de nano à giga.
//
// C'est le savoir-faire qui rend le chapitre utile hors du cours de maths :
// les préfixes sont partout — Go de mémoire, GHz de processeur, nm de longueur
// d'onde, Mbit/s de débit — et l'élève les manipule tous les jours sans savoir
// que ce sont des puissances de 10.
//
// Deux confusions se disputent le terrain, et une seule est vraiment coûteuse :
//
//   1. l'exposant négatif lu comme un nombre négatif — « 10⁻⁶, donc c'est
//      négatif ». C'est le fil rouge du savoir-faire ; presque tous les items
//      le travaillent d'une façon ou d'une autre.
//   2. la notation scientifique mal cadrée quand on convertit — 450 × 10⁻⁹
//      est juste, mais ce n'est pas encore la forme attendue.
//
// L'activité de découverte prolonge un escalier vers le bas plutôt que
// d'annoncer la liste des préfixes : l'exposant négatif apparaît comme la
// seule continuation possible, pas comme une convention à croire sur parole.

export default {
  id: 'sf-6-6',
  titre: 'Utiliser les préfixes, de nano à giga',
  attendus: [
    'Il connaît et utilise les préfixes de nano à giga.',
    'Il passe d\'une écriture avec préfixe à une écriture avec puissance de 10, et inversement.',
  ],

  // On part de ce que l'élève connaît déjà — kilo, méga, giga sont écrits sur
  // sa clé USB — et on descend. Les deux préfixes qu'on lui demande de nommer
  // ne sont pas devinés : ils sont la seule façon de continuer l'escalier sans
  // le casser. Le point dur du savoir-faire est donc rencontré ici, avant
  // d'être nommé.
  decouvrir: {
    titre: 'L\'escalier des puissances de 10',
    texte:
      'Les préfixes écrits sur tes appareils — kilo, méga, giga — sont des '
      + 'raccourcis pour des puissances de 10. Voici les marches du haut, du '
      + 'plus grand au plus petit.',
    lignes: [
      { calcul: '1 giga = 1 000 000 000', resultat: '10⁹' },
      { calcul: '1 méga = 1 000 000', resultat: '10⁶' },
      { calcul: '1 kilo = 1 000', resultat: '10³' },
      { calcul: '1 unité = 1', resultat: '10⁰' },
    ],
    question:
      'À chaque marche, l\'exposant descend de 3. Les deux marches suivantes '
      + 'existent aussi : elles s\'appellent milli et micro. Quels exposants '
      + 'leur donnes-tu ?',
    champs: [
      { id: 'a', etiquette: 'milli : 10 exposant', attendu: -3 },
      { id: 'b', etiquette: 'micro : 10 exposant', attendu: -6 },
    ],
    conclusion:
      'L\'escalier ne s\'arrête pas à 10⁰ : il continue vers le bas avec des '
      + 'exposants **négatifs**. milli = 10⁻³, micro = 10⁻⁶, et une marche plus '
      + 'bas, nano = 10⁻⁹. Attention : un exposant négatif ne rend pas le nombre '
      + 'négatif, il le rend **petit**. 10⁻³ vaut 0,001 — surtout pas −1 000.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Les préfixes, de nano à giga',
      texte:
        'Un **préfixe** se place devant une unité et la multiplie par une '
        + 'puissance de 10.\n'
        + 'nano (n) = 10⁻⁹   ·   micro (µ) = 10⁻⁶   ·   milli (m) = 10⁻³\n'
        + 'kilo (k) = 10³   ·   méga (M) = 10⁶   ·   giga (G) = 10⁹\n'
        + 'Ainsi 1 nm = 10⁻⁹ m, et 1 GHz = 10⁹ Hz.',
    },
    {
      type: 'propriete',
      titre: 'Trois rangs à chaque marche',
      texte:
        'Rangés dans l\'ordre — nano, micro, milli, unité, kilo, méga, giga — '
        + 'chaque préfixe vaut **1 000 fois** le précédent, parce que son '
        + 'exposant augmente de **3**.\n'
        + 'Convertir vers l\'unité de base, c\'est remplacer le préfixe par sa '
        + 'puissance de 10 et multiplier.',
    },
    {
      // La remarque décisive : c'est elle qui empêche « 10⁻⁶ donc négatif »,
      // l'erreur la plus fréquente dès qu'un préfixe descend sous l'unité.
      type: 'remarque',
      titre: 'Un exposant négatif n\'est pas un nombre négatif',
      texte:
        '10⁻⁶ vaut 0,000001 : c\'est un nombre **petit**, mais **positif**. Le '
        + 'signe − porte sur l\'exposant, pas sur le nombre. Un préfixe comme '
        + 'micro ou nano annonce une quantité minuscule, jamais une quantité '
        + 'en dessous de zéro.',
    },
    {
      type: 'remarque',
      titre: 'm minuscule et M majuscule',
      texte:
        'La casse compte : **m** est milli, **M** est méga. Entre 1 mW et 1 MW '
        + 'il y a un facteur un milliard. De même, k est minuscule pour kilo et '
        + 'G majuscule pour giga.',
    },
    {
      type: 'exemple',
      texte:
        '2,5 GHz = 2,5 × 10⁹ Hz = 2 500 000 000 Hz\n'
        + '4 mm = 4 × 10⁻³ m = 0,004 m\n'
        + '450 nm = 450 × 10⁻⁹ m = 4,5 × 10⁻⁷ m',
    },
  ],

  methode: {
    titre: 'Passer d\'un préfixe à la notation scientifique',
    enonce: 'Une lumière rouge a une longueur d\'onde de 650 nm. L\'écrire en mètres, en notation scientifique.',
    etapes: [
      {
        texte: 'Nano vaut 10⁻⁹ : je remplace le préfixe par sa puissance. 650 nm = 650 × 10⁻⁹ m.',
        note: 'Le préfixe n\'est qu\'un raccourci d\'écriture, rien de plus.',
      },
      {
        texte: 'En notation scientifique, le premier nombre doit être entre 1 et 10. Or 650 = 6,5 × 10².',
        note: 'La virgule recule de deux rangs, donc l\'exposant gagne 2.',
      },
      {
        texte: '650 nm = 6,5 × 10² × 10⁻⁹ m.',
        note: 'Deux puissances de 10 côte à côte : je peux les regrouper.',
      },
      {
        texte: 'Même base, donc j\'additionne les exposants : 2 + (−9) = −7. Donc 650 nm = 6,5 × 10⁻⁷ m.',
        note: 'On additionne les exposants, on ne les multiplie jamais.',
      },
    ],
    controle:
      'Le contrôle se fait en deux coups d\'œil. La taille d\'abord : nano '
      + 'annonce quelque chose de minuscule, donc l\'exposant final doit rester '
      + 'négatif et le nombre positif. Le format ensuite : un seul chiffre avant '
      + 'la virgule, et ce chiffre n\'est pas zéro.',
  },

  entrainement: [
    {
      id: 'e-6-6-1', type: 'calcul', palier: 1, piege: 'exposant-negatif-pris-pour-nombre-negatif',
      consigne: 'Le préfixe milli vaut 10⁻³. Donne l\'écriture décimale de cette puissance.',
      enonce: '10^{-3}', attendu: 0.001,
      fausses: [
        { valeur: -1000, piege: 'exposant-negatif-pris-pour-nombre-negatif' },
        { valeur: -0.001, piege: 'exposant-negatif-pris-pour-nombre-negatif' },
      ],
    },
    {
      // Neutre : l'exposant est positif, la confusion « le moins rend négatif »
      // ne peut donc pas jouer. Sans cet item, « un préfixe, donc un petit
      // nombre » deviendrait la règle, et méga comme giga tomberaient avec.
      // Il n'est pas plus facile que le précédent : 10⁶ demande six zéros.
      id: 'e-6-6-2', type: 'calcul', palier: 1, neutre: true, piege: 'exposant-negatif-pris-pour-nombre-negatif',
      consigne: 'Le préfixe méga vaut 10⁶. Donne l\'écriture décimale de cette puissance.',
      enonce: '10^{6}', attendu: 1000000,
      fausses: [{ valeur: 60, piege: 'exposant-pris-pour-facteur' }],
    },
    {
      id: 'e-6-6-3', type: 'trous', palier: 1, piege: 'exposant-negatif-pris-pour-nombre-negatif',
      consigne: 'Complète par l\'exposant qui convient.',
      enonce: '1\\text{ km} = 10^{\\square}\\text{ m} \\qquad 1\\text{ nm} = 10^{\\square}\\text{ m}',
      champs: [
        { id: 'a', attendu: 3 },
        { id: 'b', attendu: -9 },
      ],
      fausses: [{ valeur: 9, piege: 'exposant-negatif-pris-pour-nombre-negatif' }],
    },
    {
      id: 'e-6-6-4', type: 'calcul', palier: 2, piege: 'exposant-negatif-pris-pour-nombre-negatif',
      consigne: 'Convertis en mètres.',
      enonce: '4\\text{ mm}', attendu: 0.004,
      fausses: [
        { valeur: 4000, piege: 'exposant-negatif-pris-pour-nombre-negatif' },
        { valeur: -0.004, piege: 'exposant-negatif-pris-pour-nombre-negatif' },
      ],
    },
    {
      id: 'e-6-6-5', type: 'comparer', palier: 2, piege: 'exposant-negatif-pris-pour-nombre-negatif',
      consigne: 'Compare ces deux nombres.',
      enonce: '10^{-9} \\ldots 0', attendu: '>',
      fausses: [{ valeur: '<', piege: 'exposant-negatif-pris-pour-nombre-negatif' }],
    },
    {
      id: 'e-6-6-6', type: 'trous', palier: 2, piege: 'exposants-multiplies',
      consigne: 'Un gigaoctet vaut mille mégaoctets. Complète l\'exposant.',
      enonce: '10^{3} \\times 10^{6} = 10^{\\square}',
      champs: [{ id: 'a', attendu: 9 }],
      fausses: [{ valeur: 18, piege: 'exposants-multiplies' }],
    },
    {
      id: 'e-6-6-7', type: 'plausible', palier: 2, piege: 'notation-scientifique-mal-cadree',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '450\\text{ nm} = 45 \\times 10^{-8}\\text{ m}', attendu: false,
      explication:
        'L\'égalité est **vraie** — 45 × 10⁻⁸ vaut bien 4,5 × 10⁻⁷ — mais ce '
        + 'n\'est pas une notation scientifique, car 45 n\'est pas compris entre '
        + '1 et 10. 450 nm = 450 × 10⁻⁹ m. Pour ramener 450 entre 1 et 10, la '
        + 'virgule recule de **deux** rangs : 450 = 4,5 × 10². L\'exposant gagne '
        + 'donc 2, et 2 + (−9) = −7. La bonne écriture est 4,5 × 10⁻⁷ m : ici la '
        + 'virgule n\'a été décalée que d\'un rang.',
    },
    {
      // Neutre : l'écriture proposée est déjà bien cadrée — un seul chiffre
      // avant la virgule, et il n'est pas nul. Le piège du format ne peut donc
      // rien produire ici. Sans cet item, « on me demande si c'est plausible,
      // donc c'est faux » suffirait à réussir toute la série.
      id: 'e-6-6-8', type: 'plausible', palier: 2, neutre: true, piege: 'notation-scientifique-mal-cadree',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '2{,}5\\text{ GHz} = 2{,}5 \\times 10^{9}\\text{ Hz}', attendu: true,
      explication:
        'Giga vaut 10⁹, donc 2,5 GHz = 2,5 × 10⁹ Hz. Et le format est bon : 2,5 '
        + 'est bien compris entre 1 et 10. Une conversion peut se faire sans '
        + 'aucun décalage de virgule — c\'est même le cas le plus simple.',
    },
    {
      id: 'e-6-6-9', type: 'corriger', palier: 3, piege: 'exposant-negatif-pris-pour-nombre-negatif',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '6\\ \\mu\\text{m}',
      lignes: [
        { texte: '6 µm = 6 × 10⁻⁶ m', fausse: false },
        { texte: '10⁻⁶ = −1 000 000', fausse: true },
        { texte: 'donc 6 µm = −6 000 000 m', fausse: false },
      ],
      explication:
        'La première ligne est juste : micro vaut bien 10⁻⁶. C\'est à la '
        + 'deuxième que ça casse — un exposant négatif ne donne pas un nombre '
        + 'négatif, il donne un nombre plus petit que 1. 10⁻⁶ = 0,000001, donc '
        + '6 µm = 0,000006 m. Une épaisseur négative de six millions de mètres '
        + 'n\'aurait d\'ailleurs aucun sens.',
    },
    {
      id: 'e-6-6-10', type: 'vraifaux', palier: 3, piege: 'exposant-negatif-pris-pour-nombre-negatif',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Comme nano vaut 10⁻⁹, une longueur en nanomètres devient négative quand on la convertit en mètres.',
      attendu: false,
      contreExemple: {
        invite: 'Choisis une longueur en nanomètres, puis donne la même longueur en mètres.',
        champs: [
          { id: 'a', etiquette: 'longueur en nanomètres' },
          { id: 'b', etiquette: 'la même longueur, en mètres' },
        ],
        // On vérifie la PROPRIÉTÉ : les deux nombres sont positifs et la
        // conversion est juste, quelle que soit la longueur choisie. La
        // comparaison est relative pour absorber les arrondis machine des
        // très petits décimaux.
        valide: (a, b) => a > 0 && b > 0 && Math.abs(b / (a * 1e-9) - 1) < 1e-6,
        temoin: [200, 2e-7],
        exemple: '200 nm = 200 × 10⁻⁹ m = 0,0000002 m. Un nombre minuscule, et pourtant bien positif.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-6-6-1',
      enonce:
        'Une clé USB annonce une capacité de 32 Go. On y copie des fichiers '
        + 'vidéo qui pèsent 4 Go chacun.',
      questions: [
        { texte: 'Combien de fichiers de ce type la clé peut-elle contenir ?', attendu: 8, unite: 'fichiers' },
        { texte: 'Combien de mégaoctets pèse un de ces fichiers ?', attendu: 4000, unite: 'Mo' },
      ],
    },
    {
      id: 'p-6-6-2',
      enonce: 'Le processeur d\'un ordinateur portable fonctionne à une fréquence de 3,2 GHz.',
      questions: [
        { texte: 'Combien cela fait-il de mégahertz ?', attendu: 3200, unite: 'MHz' },
        { texte: 'Et combien de kilohertz ?', attendu: 3200000, unite: 'kHz' },
      ],
    },
    {
      id: 'p-6-6-3',
      enonce:
        'La lumière rouge d\'un pointeur laser a une longueur d\'onde de 650 nm. '
        + 'Celle d\'un pointeur violet vaut 400 nm.',
      questions: [
        { texte: 'De combien de nanomètres la longueur d\'onde rouge dépasse-t-elle la violette ?', attendu: 250, unite: 'nm' },
        { texte: 'Combien de micromètres vaut la longueur d\'onde rouge ?', attendu: 0.65, unite: 'µm' },
      ],
    },
    {
      id: 'p-6-6-4',
      enonce: 'La fibre optique d\'une maison offre un débit de 2 Gbit/s, c\'est-à-dire 2 gigabits par seconde.',
      questions: [
        { texte: 'Combien de mégabits par seconde cela représente-t-il ?', attendu: 2000, unite: 'Mbit/s' },
        { texte: 'Un film pèse 6 000 mégabits. En combien de secondes est-il téléchargé ?', attendu: 3, unite: 's' },
      ],
    },
    {
      id: 'p-6-6-5',
      enonce:
        'Un cheveu a un diamètre d\'environ 70 µm. Une feuille de papier a une '
        + 'épaisseur de 0,08 mm.',
      questions: [
        { texte: 'Quelle est l\'épaisseur de la feuille, en micromètres ?', attendu: 80, unite: 'µm' },
        { texte: 'Combien de feuilles faut-il empiler pour atteindre 1 cm ?', attendu: 125, unite: 'feuilles' },
      ],
    },
  ],

  test: [
    {
      id: 't-6-6-1', type: 'calcul',
      consigne: 'Donne l\'écriture décimale de cette puissance.',
      enonce: '10^{-6}', attendu: 0.000001, revoir: 'definition',
    },
    {
      id: 't-6-6-2', type: 'trous',
      consigne: 'Complète par l\'exposant qui convient.',
      enonce: '1\\ \\mu\\text{m} = 10^{\\square}\\text{ m} \\qquad 1\\text{ Mo} = 10^{\\square}\\text{ octets}',
      champs: [
        { id: 'a', attendu: -6 },
        { id: 'b', attendu: 6 },
      ],
      revoir: 'definition',
    },
    {
      id: 't-6-6-3', type: 'calcul',
      consigne: 'Convertis en mètres.',
      enonce: '7\\text{ mm}', attendu: 0.007, revoir: 'exemple',
    },
    {
      id: 't-6-6-4', type: 'calcul',
      consigne: 'Convertis en octets.',
      enonce: '3\\text{ ko}', attendu: 3000, revoir: 'exemple',
    },
    {
      id: 't-6-6-5', type: 'calcul',
      consigne: 'Convertis en mégahertz.',
      enonce: '2{,}4\\text{ GHz}', attendu: 2400, revoir: 'propriete',
    },
    {
      id: 't-6-6-6', type: 'comparer',
      consigne: 'Compare ces deux nombres.',
      enonce: '1\\ \\mu\\text{m} \\ldots 1\\text{ mm}', attendu: '<', revoir: 'propriete',
    },
    {
      id: 't-6-6-7', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '5\\text{ mm} = 5 \\times 10^{-3}\\text{ m}', attendu: true,
      explication:
        'Milli vaut 10⁻³, donc 5 mm = 5 × 10⁻³ m, soit 0,005 m. Le résultat est '
        + 'un tout petit nombre, et il est positif : c\'est cohérent.',
      revoir: 'exemple',
    },
    {
      id: 't-6-6-8', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '3\\text{ nm} = 3 \\times 10^{9}\\text{ m}', attendu: false,
      explication:
        'Nano vaut 10⁻⁹, pas 10⁹. L\'écriture proposée annoncerait trois '
        + 'milliards de mètres pour quelque chose d\'invisible à l\'œil nu. La '
        + 'bonne écriture est 3 × 10⁻⁹ m.',
      piege: 'exposant-negatif-pris-pour-nombre-negatif', revoir: 'remarque',
    },
    {
      id: 't-6-6-9', type: 'corriger',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '2300\\text{ nm}',
      lignes: [
        { texte: '2 300 nm = 2 300 × 10⁻⁹ m', fausse: false },
        { texte: '2 300 = 2,3 × 10³, donc 2 300 nm = 2,3 × 10³ × 10⁻⁹ m', fausse: false },
        { texte: '= 2,3 × 10⁻²⁷ m', fausse: true },
      ],
      explication:
        'Les deux premières lignes sont justes. À la troisième, les exposants '
        + 'ont été multipliés : 3 × (−9) = −27. Pour un produit de puissances de '
        + 'même base, on les **additionne** : 3 + (−9) = −6. Donc '
        + '2 300 nm = 2,3 × 10⁻⁶ m.',
      piege: 'exposants-multiplies', revoir: 'propriete',
    },
    {
      id: 't-6-6-10', type: 'vraifaux',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Un gigaoctet vaut mille mégaoctets.',
      attendu: true,
      revoir: 'propriete',
    },
  ],
};
