// Savoir-faire 6-2 — Multiplier des puissances de même base.
//
// La règle « on additionne les exposants » est la plus vite récitée et la plus
// vite déformée du chapitre. Elle n'est donc jamais donnée comme une formule à
// retenir : elle est RETROUVÉE en écrivant les facteurs et en les comptant.
// C'est le seul geste qui survive à un trou de mémoire en contrôle.
//
// Trois situations cohabitent volontairement dans la série, parce que la règle
// ne vaut que dans la première :
//
//   2³ × 2⁴   même base    → les exposants s'additionnent ;
//   2³ × 5²   bases différentes → aucune simplification, on calcule ;
//   2³ + 2⁴   une somme    → aucune règle n'existe, on calcule.
//
// Sans les deux dernières, l'élève apprend « il y a des exposants, donc je les
// additionne » — un motif de surface qui réussit ici et échoue partout ailleurs.

export default {
  id: 'sf-6-2',
  titre: 'Multiplier des puissances de même base',
  attendus: [
    'Il simplifie le produit de puissances d\'un même nombre.',
  ],

  // On n'annonce pas la règle : on écrit les deux puissances en toutes lettres
  // et on laisse l'élève COMPTER. L'addition des exposants apparaît alors comme
  // une constatation, pas comme une convention — et le comptage reste
  // disponible le jour où la formule s'efface.
  decouvrir: {
    titre: 'Mettre les facteurs bout à bout',
    texte:
      'Voici deux produits de puissances, réécrits sans rien calculer : chaque '
      + 'puissance est remplacée par ses facteurs.',
    lignes: [
      { calcul: '2² × 2³', resultat: '(2 × 2) × (2 × 2 × 2)' },
      { calcul: '5⁴ × 5²', resultat: '(5 × 5 × 5 × 5) × (5 × 5)' },
    ],
    question:
      'Sur chaque ligne, compte combien de fois le facteur apparaît en tout. '
      + 'Quel exposant permet de résumer le produit en une seule puissance ?',
    champs: [
      { id: 'a', etiquette: '2² × 2³ = 2 exposant…', attendu: 5 },
      { id: 'b', etiquette: '5⁴ × 5² = 5 exposant…', attendu: 6 },
    ],
    conclusion:
      'Les exposants **s\'additionnent** : 2 + 3 = 5, et 4 + 2 = 6. Ce n\'est pas '
      + 'une règle tombée du ciel — c\'est ce que donne le **comptage des '
      + 'facteurs**, qu\'on a simplement mis bout à bout. Si tu l\'oublies un jour, '
      + 'réécris les facteurs : la règle revient toute seule.',
  },

  cours: [
    {
      type: 'propriete',
      titre: 'Produit de puissances de même base',
      texte:
        'Pour multiplier deux puissances **d\'un même nombre**, on **additionne** '
        + 'les exposants.\n'
        + '2³ × 2⁴ = 2⁷, car 3 + 4 = 7.\n'
        + 'Trois facteurs égaux à 2, suivis de quatre facteurs égaux à 2, ça fait '
        + 'bien sept facteurs égaux à 2.',
    },
    {
      // Le premier réflexe à installer n'est pas « j'additionne » mais « je
      // regarde les bases ». Une règle sans sa condition d'emploi est un piège.
      type: 'remarque',
      titre: 'Regarde les bases avant les exposants',
      texte:
        'La règle ne vaut que pour des puissances du **même nombre**. Dans '
        + '2³ × 5², les bases 2 et 5 sont différentes : il n\'y a rien à '
        + 'regrouper, on calcule chaque puissance puis on multiplie — '
        + '8 × 25 = 200.\n'
        + 'En particulier, 2³ × 5² ne donne **pas** 10⁵.',
    },
    {
      type: 'remarque',
      titre: 'Une somme de puissances n\'a aucune règle',
      texte:
        'Il n\'existe **aucune** règle pour additionner deux puissances. '
        + '2³ + 2⁴ ne vaut pas 2⁷ : on calcule les deux, 8 + 16 = 24. Et 24 '
        + 'n\'est même pas une puissance de 2.\n'
        + 'La règle des exposants est réservée aux **produits**.',
    },
    {
      type: 'exemple',
      texte:
        '3⁴ × 3² = 3⁶ = 729   ·   5² × 5 = 5³ = 125   ·   10³ × 10² = 10⁵ = 100 000\n'
        + '2³ × 7² = 8 × 49 = 392 : bases différentes, donc aucune simplification.',
    },
  ],

  methode: {
    titre: 'Simplifier un produit de puissances',
    enonce: 'Écrire A = 3⁴ × 3² sous la forme d\'une seule puissance de 3, puis donner sa valeur.',
    etapes: [
      {
        texte: 'Je regarde les bases avant tout : 3 et 3. Elles sont identiques, donc la règle s\'applique.',
        note: 'Avec deux bases différentes, il n\'y aurait rien à regrouper.',
      },
      {
        texte: 'Je compte les facteurs : quatre 3, puis deux 3, soit six 3 en tout.',
        note: 'C\'est exactement ce que veut dire « additionner les exposants ».',
      },
      {
        texte: 'Donc A = 3⁶.',
        note: 'La forme demandée : une seule puissance de 3.',
      },
      {
        texte: 'Sa valeur : 3⁶ = 729.',
        note: 'Si le calcul t\'effraie : 3⁶ = 3³ × 3³ = 27 × 27 = 729.',
      },
    ],
    controle:
      'Le contrôle : teste ta règle sur un cas minuscule que tu vérifies de tête. '
      + '2² × 2³ = 4 × 8 = 32, et 2⁵ = 32 : les exposants se sont bien additionnés. '
      + 'Si ta règle donnait 2⁶ = 64, elle serait fausse. Ce test prend dix '
      + 'secondes et il tranche à coup sûr.',
  },

  entrainement: [
    {
      id: 'e-6-2-1', type: 'calcul', palier: 1, piege: 'exposants-multiplies',
      consigne: 'Calcule.', enonce: '2^{3} \\times 2^{4}', attendu: 128,
      fausses: [
        { valeur: 4096, piege: 'exposants-multiplies' },
        { valeur: 48, piege: 'exposant-pris-pour-facteur' },
      ],
    },
    {
      id: 'e-6-2-2', type: 'calcul', palier: 1, piege: 'exposant-pris-pour-facteur',
      consigne: 'Calcule.', enonce: '3^{2} \\times 3^{3}', attendu: 243,
      fausses: [
        { valeur: 729, piege: 'exposants-multiplies' },
        { valeur: 54, piege: 'exposant-pris-pour-facteur' },
      ],
    },
    {
      // Neutre : ici additionner les exposants (2 + 2) et les multiplier
      // (2 × 2) donnent le même 4, donc le piège du savoir-faire ne peut pas
      // produire d'erreur. Cet item existe pour une raison précise : c'est le
      // cas d'où naît la confusion. Un élève qui a « vérifié » sa règle sur
      // 3² × 3² repart persuadé que multiplier les exposants marche. Le
      // rencontrer ici, entre deux items où les deux règles divergent, montre
      // qu'un seul cas favorable ne prouve rien.
      id: 'e-6-2-3', type: 'calcul', palier: 1, neutre: true, piege: 'exposants-multiplies',
      consigne: 'Calcule.', enonce: '3^{2} \\times 3^{2}', attendu: 81,
      fausses: [{ valeur: 36, piege: 'exposant-pris-pour-facteur' }],
    },
    {
      id: 'e-6-2-4', type: 'trous', palier: 2, piege: 'exposants-multiplies',
      consigne: 'Complète l\'exposant manquant.',
      enonce: '5^{2} \\times 5^{4} = 5^{\\square}',
      champs: [{ id: 'a', attendu: 6 }],
      fausses: [{ valeur: 8, piege: 'exposants-multiplies' }],
    },
    {
      id: 'e-6-2-5', type: 'calcul', palier: 2, piege: 'bases-differentes-fusionnees',
      consigne: 'Calcule.', enonce: '2^{3} \\times 5^{2}', attendu: 200,
      fausses: [
        { valeur: 100000, piege: 'bases-differentes-fusionnees' },
        { valeur: 60, piege: 'exposant-pris-pour-facteur' },
      ],
    },
    {
      // Neutre à deux titres. D'abord les bases diffèrent : il n'y a aucun
      // exposant à additionner, donc le piège du savoir-faire ne joue pas.
      // Ensuite le résultat proposé est JUSTE — sans cet item, « on me demande
      // si c'est plausible, donc c'est faux » suffirait à réussir la série.
      id: 'e-6-2-6', type: 'plausible', palier: 2, neutre: true, piege: 'exposants-multiplies',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '3^{2} \\times 2^{4} = 144', attendu: true,
      explication:
        'Les bases sont différentes : il n\'y a ici aucun exposant à additionner. '
        + 'On calcule chaque puissance — 3² = 9 et 2⁴ = 16 — puis on multiplie : '
        + '9 × 16 = 144. Le résultat proposé est bien le bon.',
    },
    {
      id: 'e-6-2-7', type: 'plausible', palier: 2, piege: 'exposants-multiplies',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '3^{4} \\times 3^{2} = 3^{8}', attendu: false,
      explication:
        'Quatre facteurs égaux à 3, puis deux facteurs égaux à 3 : six en tout, '
        + 'pas huit. 3⁴ × 3² = 3⁶ = 729, alors que 3⁸ vaut 6 561. Les exposants '
        + 's\'additionnent (4 + 2 = 6), ils ne se multiplient pas (4 × 2 = 8).',
    },
    {
      id: 'e-6-2-8', type: 'calcul', palier: 3, piege: 'regle-inventee-pour-la-somme',
      consigne: 'Calcule.', enonce: '2^{3} + 2^{4}', attendu: 24,
      fausses: [
        { valeur: 128, piege: 'regle-inventee-pour-la-somme' },
        { valeur: 14, piege: 'exposant-pris-pour-facteur' },
      ],
    },
    {
      id: 'e-6-2-9', type: 'corriger', palier: 3, piege: 'exposants-multiplies',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '4^{3} \\times 4^{2}',
      lignes: [
        { texte: '4³ × 4² = (4 × 4 × 4) × (4 × 4)', fausse: false },
        { texte: '= 4 × 4 × 4 × 4 × 4', fausse: false },
        { texte: '= 4⁶', fausse: true },
        { texte: '= 4 096', fausse: false },
      ],
      explication:
        'Les deux premières lignes sont impeccables : le produit compte bien cinq '
        + 'facteurs égaux à 4. C\'est à la troisième que ça casse — cinq facteurs, '
        + 'ça s\'écrit 4⁵, pas 4⁶. Les exposants 3 et 2 ont été multipliés (6) au '
        + 'lieu d\'être additionnés (5). Le bon résultat est 4⁵ = 1 024.',
    },
    {
      id: 'e-6-2-10', type: 'vraifaux', palier: 3, piege: 'bases-differentes-fusionnees',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Pour multiplier deux puissances, on additionne toujours les exposants.',
      attendu: false,
      contreExemple: {
        invite:
          'Deux bases différentes suffisent à faire tomber la règle. Choisis-en '
          + 'deux, entières et supérieures à 1.',
        champs: [
          { id: 'a', etiquette: 'première base' },
          { id: 'b', etiquette: 'seconde base' },
        ],
        // On vérifie la PROPRIÉTÉ qui rend le contre-exemple valable — deux
        // bases entières distinctes — et non un couple précis. N'importe quel
        // choix convient, l'élève fabrique le sien.
        valide: (a, b) => Number.isInteger(a) && Number.isInteger(b)
          && a > 1 && b > 1 && a !== b,
        exemple:
          'Avec 2 et 5 : dans 2³ × 5², les bases diffèrent, donc il n\'y a rien à '
          + 'additionner. Le produit vaut 8 × 25 = 200, et 200 n\'est une puissance '
          + 'ni de 2 ni de 5.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-6-2-1',
      enonce:
        'Une salle de cinéma compte 2⁵ rangées, et chaque rangée compte '
        + '2³ fauteuils. Le même modèle de salle est construit dans 2² villes.',
      questions: [
        { texte: 'Combien de fauteuils compte une salle ?', attendu: 256, unite: 'fauteuils' },
        { texte: 'Combien de fauteuils cela fait-il pour les quatre villes ?', attendu: 1024, unite: 'fauteuils' },
      ],
    },
    {
      id: 'p-6-2-2',
      enonce:
        'Une image numérique carrée mesure 2⁶ pixels de côté. Le nombre total '
        + 'de pixels s\'obtient en multipliant la largeur par la hauteur.',
      questions: [
        { texte: 'Combien de pixels mesure un côté ?', attendu: 64, unite: 'pixels' },
        { texte: 'Combien de pixels contient l\'image entière ?', attendu: 4096, unite: 'pixels' },
      ],
    },
    {
      id: 'p-6-2-3',
      enonce:
        'Une réserve contient 3³ cartons. Chaque carton est rempli de '
        + '2⁴ boîtes identiques.',
      questions: [
        { texte: 'Combien de boîtes contient un seul carton ?', attendu: 16, unite: 'boîtes' },
        { texte: 'Combien de boîtes la réserve contient-elle en tout ?', attendu: 432, unite: 'boîtes' },
      ],
    },
    {
      id: 'p-6-2-4',
      enonce:
        'En informatique, 1 kilo-octet vaut 2¹⁰ octets, soit 1 024 octets. '
        + 'Un fichier occupe 2⁵ kilo-octets.',
      questions: [
        { texte: 'Le nombre d\'octets du fichier s\'écrit 2 exposant combien ?', attendu: 15 },
        { texte: 'Combien d\'octets le fichier occupe-t-il ?', attendu: 32768, unite: 'octets' },
      ],
    },
    {
      id: 'p-6-2-5',
      enonce:
        'Un club de judo compte 2⁴ adhérents en septembre. En janvier, '
        + '2⁵ nouveaux adhérents s\'inscrivent. Un élève propose d\'écrire le '
        + 'total sous la forme 2⁹.',
      questions: [
        { texte: 'Combien le club compte-t-il d\'adhérents en janvier ?', attendu: 48, unite: 'adhérents' },
        { texte: 'Et combien vaut le 2⁹ proposé par l\'élève ?', attendu: 512 },
      ],
    },
  ],

  test: [
    {
      id: 't-6-2-1', type: 'calcul', consigne: 'Calcule.',
      enonce: '2^{4} \\times 2^{2}', attendu: 64, revoir: 'propriete',
    },
    {
      id: 't-6-2-2', type: 'trous', consigne: 'Complète l\'exposant manquant.',
      enonce: '3^{2} \\times 3^{5} = 3^{\\square}',
      champs: [{ id: 'a', attendu: 7 }],
      revoir: 'propriete',
    },
    {
      id: 't-6-2-3', type: 'calcul', consigne: 'Calcule.',
      enonce: '5^{2} \\times 5^{1}', attendu: 125, revoir: 'exemple',
    },
    {
      id: 't-6-2-4', type: 'calcul', consigne: 'Calcule.',
      enonce: '2^{3} \\times 7^{2}', attendu: 392, revoir: 'remarque',
    },
    {
      id: 't-6-2-5', type: 'calcul', consigne: 'Calcule.',
      enonce: '3^{2} + 3^{3}', attendu: 36, revoir: 'remarque',
    },
    {
      id: 't-6-2-6', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '4^{2} \\times 4^{3} = 4^{6}', attendu: false,
      explication:
        'Deux facteurs égaux à 4, puis trois facteurs égaux à 4 : cinq en tout. '
        + '4² × 4³ = 4⁵ = 1 024, et non 4⁶ = 4 096. Les exposants s\'additionnent.',
      piege: 'exposants-multiplies', revoir: 'propriete',
    },
    {
      id: 't-6-2-7', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '10^{3} \\times 10^{2} = 10^{5}', attendu: true,
      explication:
        'Trois facteurs égaux à 10, puis deux facteurs égaux à 10 : cinq en tout. '
        + '10³ × 10² = 10⁵ = 100 000. Le compte y est.',
      revoir: 'exemple',
    },
    {
      id: 't-6-2-8', type: 'trous', consigne: 'Complète l\'exposant manquant.',
      enonce: '10^{4} \\times 10^{\\square} = 10^{9}',
      champs: [{ id: 'a', attendu: 5 }],
      revoir: 'propriete',
    },
    {
      id: 't-6-2-9', type: 'calcul', consigne: 'Calcule.',
      enonce: '2^{2} \\times 2^{2}', attendu: 16, revoir: 'propriete',
    },
    {
      id: 't-6-2-10', type: 'corriger',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '2^{3} \\times 5^{3}',
      lignes: [
        { texte: '2³ × 5³ = (2 × 2 × 2) × (5 × 5 × 5)', fausse: false },
        { texte: '= 10⁶', fausse: true },
        { texte: '= 1 000 000', fausse: false },
      ],
      explication:
        'La première ligne est juste. À la deuxième, deux règles ont été mélangées '
        + 'd\'un coup : les bases multipliées (2 × 5 = 10) ET les exposants '
        + 'additionnés (3 + 3 = 6). On peut bien regrouper les facteurs deux par '
        + 'deux, 2 × 5 = 10, trois fois — mais cela donne 10³ = 1 000. C\'est '
        + 'd\'ailleurs ce que vaut 8 × 125.',
      piege: 'bases-differentes-fusionnees', revoir: 'remarque',
    },
  ],
};
