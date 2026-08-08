// Savoir-faire 6-4 — Écrire un nombre en notation scientifique.
//
// Tout le savoir-faire tient sur une contrainte de FORMAT : le premier facteur
// doit être dans [1 ; 10[. Rien n'est faux dans 32 × 10³ ni dans 0,32 × 10⁵ —
// ce sont les mêmes 32 000. Ce qui manque, c'est le cadrage. La difficulté
// n'est donc pas de calculer mais d'accepter qu'une écriture juste puisse être
// refusée, et de savoir la rectifier.
//
// Deux gestes se perdent séparément, et les items les séparent :
//   · cadrer le premier facteur (un seul chiffre non nul avant la virgule) ;
//   · ajuster l'exposant du même nombre de rangs, dans le bon sens.
//
// L'élève ne tape jamais l'écriture entière en texte libre : le type `trous`
// avec deux champs — mantisse, puis exposant — sépare les deux gestes, et
// permet de savoir lequel des deux a lâché.

export default {
  id: 'sf-6-4',
  titre: 'Écrire un nombre en notation scientifique',
  attendus: [
    'Il écrit un nombre en notation scientifique.',
    'Il reconnaît qu\'une écriture n\'est pas en notation scientifique et la rectifie.',
  ],

  // On ne donne pas le format : on met sous les yeux trois écritures TOUTES
  // JUSTES du même nombre, et on laisse l'élève constater qu'il faut un
  // critère supplémentaire pour n'en garder qu'une. Le format apparaît alors
  // comme une convention utile, pas comme une exigence arbitraire.
  decouvrir: {
    titre: 'Trois écritures pour un seul nombre',
    texte:
      'On a demandé d\'écrire 32 000 sous la forme d\'un nombre multiplié par une '
      + 'puissance de 10. Voici trois copies : vérifie-le, les trois donnent bien 32 000.',
    copies: [
      { nom: 'Nour', calcul: '32 × 10³ = 32 × 1 000', resultat: '32 000' },
      { nom: 'Sacha', calcul: '3,2 × 10⁴ = 3,2 × 10 000', resultat: '32 000' },
      { nom: 'Tom', calcul: '0,32 × 10⁵ = 0,32 × 100 000', resultat: '32 000' },
    ],
    question:
      'Une seule de ces écritures est en notation scientifique : celle dont le '
      + 'premier nombre est supérieur ou égal à 1 et strictement inférieur à 10. '
      + 'Écris ce premier nombre, puis son exposant.',
    champs: [
      { id: 'a', etiquette: 'le premier nombre :', attendu: 3.2 },
      { id: 'b', etiquette: 'son exposant :', attendu: 4 },
    ],
    conclusion:
      'C\'est l\'écriture de **Sacha**. Les trois valent 32 000, mais une seule '
      + 'respecte le format : **un seul chiffre avant la virgule, et ce chiffre '
      + 'n\'est pas 0**. C\'est ce format qu\'on appelle la notation scientifique. '
      + 'Son intérêt : deux nombres écrits ainsi se comparent d\'un coup d\'œil, '
      + 'aussi grands ou aussi petits soient-ils.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Notation scientifique',
      texte:
        'Un nombre est écrit en **notation scientifique** quand il se présente sous '
        + 'la forme a × 10ⁿ, où n est un entier relatif et où a vérifie 1 ≤ a < 10.\n'
        + 'Autrement dit : **un seul chiffre avant la virgule, et ce chiffre n\'est pas 0**. '
        + 'Si le nombre est négatif, son signe se place devant a.',
    },
    {
      type: 'propriete',
      titre: 'Déplacer la virgule, ajuster l\'exposant',
      texte:
        'Déplacer la virgule d\'un rang vers la **gauche** divise le nombre par 10 : '
        + 'pour que la valeur ne change pas, l\'exposant **augmente de 1**.\n'
        + 'Vers la **droite**, c\'est l\'inverse : l\'exposant **diminue de 1**.\n'
        + 'Chaque rang compte pour 1, jamais plus.',
    },
    {
      type: 'remarque',
      titre: 'Le signe de l\'exposant n\'est pas le signe du nombre',
      texte:
        'Pour un nombre **positif** : plus grand que 10, son exposant est **positif** ; '
        + 'plus petit que 1, son exposant est **négatif**. Mais un exposant négatif ne '
        + 'rend pas le nombre négatif : 4,5 × 10⁻³ vaut 0,0045, un nombre petit et bien '
        + 'positif.\n'
        + 'Le signe du nombre, lui, se place **devant le premier facteur** : '
        + '−520 = −5,2 × 10². Son exposant reste **positif** : c\'est la distance à zéro '
        + 'qui le décide, pas le signe.',
    },
    {
      type: 'exemple',
      texte:
        '32 000 = 3,2 × 10⁴   ·   4 000 = 4 × 10³   ·   0,00063 = 6,3 × 10⁻⁴   ·   −520 = −5,2 × 10²',
    },
  ],

  methode: {
    titre: 'Écrire un nombre en notation scientifique',
    enonce: 'Écrire 0,00063 en notation scientifique.',
    etapes: [
      {
        texte: 'Je repère le premier chiffre non nul : c\'est le 6. Je place la virgule juste après, ce qui donne 6,3.',
        note: 'C\'est le seul cadrage possible entre 1 et 10.',
      },
      {
        texte: 'Je compte les rangs parcourus par la virgule : 0,0063 ; 0,063 ; 0,63 ; 6,3. Quatre rangs vers la droite.',
        note: 'On compte les déplacements, pas les zéros — les deux ne tombent pas toujours pareil.',
      },
      {
        texte: '6,3 est bien plus grand que 0,00063 : il faut le rapetisser, donc l\'exposant est négatif.',
        note: 'Quatre rangs vers la droite, donc −4.',
      },
      { texte: 'Donc 0,00063 = 6,3 × 10⁻⁴.', note: '' },
    ],
    controle:
      'Le contrôle : refais le trajet à l\'envers. 6,3 × 10⁻⁴, c\'est la virgule qui '
      + 'recule de 4 rangs — tu retombes sur 0,00063, le nombre de départ. Et relis '
      + 'toujours ton premier facteur : un seul chiffre avant la virgule, différent de 0.',
  },

  entrainement: [
    {
      id: 'e-6-4-1', type: 'trous', palier: 1, piege: 'notation-scientifique-mal-cadree',
      consigne: 'Écris ce nombre en notation scientifique.',
      enonce: '32\\,000 = \\square \\times 10^{\\square}',
      champs: [{ id: 'a', etiquette: 'mantisse', attendu: 3.2 }, { id: 'b', etiquette: 'exposant', attendu: 4 }],
      fausses: [
        { valeur: 32, piege: 'notation-scientifique-mal-cadree' },
        { valeur: 3, piege: 'notation-scientifique-mal-cadree' },
      ],
    },
    {
      // Neutre : ici « j'écris les chiffres significatifs, puis je compte les
      // zéros » donne exactement la bonne réponse, et il n'y a aucune virgule à
      // déplacer — le cadrage est bon d'emblée. Sans cet item, l'élève
      // apprendrait que la notation scientifique consiste TOUJOURS à bouger la
      // virgule, et il en ajouterait une là où il n'en faut pas.
      id: 'e-6-4-2', type: 'trous', palier: 1, neutre: true, piege: 'notation-scientifique-mal-cadree',
      consigne: 'Écris ce nombre en notation scientifique.',
      enonce: '4\\,000 = \\square \\times 10^{\\square}',
      champs: [{ id: 'a', etiquette: 'mantisse', attendu: 4 }, { id: 'b', etiquette: 'exposant', attendu: 3 }],
      fausses: [],
    },
    {
      id: 'e-6-4-3', type: 'trous', palier: 1, piege: 'exposant-negatif-pris-pour-nombre-negatif',
      consigne: 'Écris ce nombre en notation scientifique.',
      enonce: '0{,}0045 = \\square \\times 10^{\\square}',
      champs: [{ id: 'a', etiquette: 'mantisse', attendu: 4.5 }, { id: 'b', etiquette: 'exposant', attendu: -3 }],
      fausses: [
        { valeur: 3, piege: 'exposant-negatif-pris-pour-nombre-negatif' },
        { valeur: -4.5, piege: 'exposant-negatif-pris-pour-nombre-negatif' },
      ],
    },
    {
      // La fausse valeur 7 pour l'exposant n'est pas prise au hasard : c'est le
      // nombre de zéros. Elle va de pair avec 64 comme premier facteur, et
      // 64 × 10⁷ vaut bien 640 000 000 — l'écriture est juste, seulement mal
      // cadrée. C'est exactement la confusion que le piège décrit.
      id: 'e-6-4-4', type: 'trous', palier: 2, piege: 'notation-scientifique-mal-cadree',
      consigne: 'Écris ce nombre en notation scientifique.',
      enonce: '640\\,000\\,000 = \\square \\times 10^{\\square}',
      champs: [{ id: 'a', etiquette: 'mantisse', attendu: 6.4 }, { id: 'b', etiquette: 'exposant', attendu: 8 }],
      fausses: [
        { valeur: 64, piege: 'notation-scientifique-mal-cadree' },
        { valeur: 7, piege: 'notation-scientifique-mal-cadree' },
      ],
    },
    {
      // Quatre zéros après la virgule, mais cinq rangs de déplacement. L'écart
      // entre « compter les zéros » et « compter les rangs » vaut toujours 1 sur
      // un nombre plus petit que 1 ; ici seulement, la réponse fausse qu'il
      // produit — −4 — est listée, donc reconnue.
      id: 'e-6-4-5', type: 'trous', palier: 2, piege: 'exposant-negatif-pris-pour-nombre-negatif',
      consigne: 'Écris ce nombre en notation scientifique.',
      enonce: '0{,}000072 = \\square \\times 10^{\\square}',
      champs: [{ id: 'a', etiquette: 'mantisse', attendu: 7.2 }, { id: 'b', etiquette: 'exposant', attendu: -5 }],
      fausses: [
        { valeur: 5, piege: 'exposant-negatif-pris-pour-nombre-negatif' },
        { valeur: -4, piege: 'exposant-negatif-pris-pour-nombre-negatif' },
      ],
    },
    {
      // Le seul item où les deux « moins » cohabitent : celui du nombre et
      // celui de l'exposant. Ils ne disent pas la même chose, et c'est le
      // meilleur endroit pour le vérifier.
      id: 'e-6-4-6', type: 'trous', palier: 2, piege: 'exposant-negatif-pris-pour-nombre-negatif',
      consigne: 'Écris ce nombre en notation scientifique.',
      enonce: '-0{,}0037 = \\square \\times 10^{\\square}',
      champs: [{ id: 'a', etiquette: 'mantisse', attendu: -3.7 }, { id: 'b', etiquette: 'exposant', attendu: -3 }],
      fausses: [
        { valeur: 3.7, piege: 'exposant-negatif-pris-pour-nombre-negatif' },
        { valeur: 3, piege: 'exposant-negatif-pris-pour-nombre-negatif' },
      ],
    },
    {
      id: 'e-6-4-7', type: 'plausible', palier: 2, piege: 'notation-scientifique-mal-cadree',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '87\\,000 = 87 \\times 10^{3}',
      attendu: false,
      explication:
        'L\'égalité est **vraie** : 87 × 1 000 fait bien 87 000. Mais ce n\'est pas une '
        + 'notation scientifique, car 87 n\'est pas compris entre 1 et 10. Il faut '
        + 'reculer la virgule d\'un rang et augmenter l\'exposant d\'autant : 8,7 × 10⁴.',
    },
    {
      // Neutre : le résultat proposé est correct, et correctement cadré — le
      // piège ne joue pas. Sans cet item, « on me demande si c'est plausible,
      // donc c'est faux » suffirait à réussir. Il n'est pas plus facile : il
      // faut vraiment vérifier les deux choses, la valeur et le cadrage.
      id: 'e-6-4-8', type: 'plausible', palier: 2, neutre: true, piege: 'notation-scientifique-mal-cadree',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '0{,}00058 = 5{,}8 \\times 10^{-4}',
      attendu: true,
      explication:
        'Les deux conditions sont remplies. La valeur d\'abord : 5,8 × 10⁻⁴, c\'est la '
        + 'virgule qui recule de 4 rangs, donc 0,00058. Le format ensuite : 5,8 a bien '
        + 'un seul chiffre non nul avant la virgule.',
    },
    {
      // Comparer deux écritures scientifiques, c'est le service que rend le
      // format. Ici le premier facteur le plus grand appartient au nombre le
      // plus petit : lire les mantisses ne suffit jamais, l'exposant décide.
      id: 'e-6-4-9', type: 'comparer', palier: 3, piege: 'exposant-pris-pour-facteur',
      consigne: 'Compare ces deux nombres.',
      enonce: '9{,}9 \\times 10^{4} \\ldots 1{,}2 \\times 10^{5}',
      attendu: '<',
      fausses: [{ valeur: '>', piege: 'exposant-pris-pour-facteur' }],
    },
    {
      id: 'e-6-4-10', type: 'corriger', palier: 3, piege: 'notation-scientifique-mal-cadree',
      consigne: 'Cette mise en notation scientifique est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '0{,}00025',
      lignes: [
        { texte: '0,000 25 = 25 × 10⁻⁵', fausse: false },
        { texte: '25 n\'est pas entre 1 et 10 : je recule la virgule d\'un rang, 25 = 2,5 × 10.', fausse: false },
        { texte: 'Donc 0,000 25 = 2,5 × 10⁻⁶.', fausse: true },
        { texte: 'Le premier facteur, 2,5, est bien compris entre 1 et 10.', fausse: false },
      ],
      explication:
        'Les deux premières lignes sont justes : 25 × 10⁻⁵ vaut bien 0,000 25. '
        + 'C\'est à la troisième que l\'exposant part du mauvais côté. Reculer la '
        + 'virgule d\'un rang divise le premier facteur par 10 : pour compenser, '
        + 'l\'exposant doit **augmenter** de 1, et non diminuer. '
        + '25 × 10⁻⁵ = 2,5 × 10 × 10⁻⁵ = 2,5 × 10⁻⁴.',
    },
  ],

  problemes: [
    {
      id: 'p-6-4-1',
      enonce:
        'La distance moyenne entre la Terre et le Soleil est d\'environ '
        + '150 000 000 km. On veut l\'écrire en notation scientifique.',
      questions: [
        { texte: 'Quel est le premier facteur ?', attendu: 1.5 },
        { texte: 'Quel est l\'exposant de 10 ?', attendu: 8 },
      ],
    },
    {
      id: 'p-6-4-2',
      enonce:
        'Un cheveu a un diamètre d\'environ 0,00007 m. Un globule rouge, lui, '
        + 'mesure environ 0,000007 m de diamètre.',
      questions: [
        { texte: 'En notation scientifique, quel est l\'exposant de 10 pour le diamètre du cheveu ?', attendu: -5 },
        { texte: 'Combien de fois le cheveu est-il plus large que le globule rouge ?', attendu: 10 },
      ],
    },
    {
      id: 'p-6-4-3',
      enonce:
        'Un virus de la grippe mesure environ 0,000 000 12 m. Un manuel de SVT '
        + 'demande cette taille en notation scientifique.',
      questions: [
        { texte: 'Quel est le premier facteur ?', attendu: 1.2 },
        { texte: 'Quel est l\'exposant de 10 ?', attendu: -7 },
      ],
    },
    {
      id: 'p-6-4-4',
      enonce:
        'Une année-lumière vaut environ 9 500 000 000 000 km : c\'est la distance '
        + 'parcourue par la lumière en un an.',
      questions: [
        { texte: 'En notation scientifique, quel est le premier facteur ?', attendu: 9.5 },
        { texte: 'Quel est l\'exposant de 10 ?', attendu: 12 },
        { texte: 'Deux années-lumière s\'écrivent 1,9 × 10ⁿ km. Que vaut n ?', attendu: 13 },
      ],
    },
    {
      id: 'p-6-4-5',
      enonce:
        'Nour a écrit la masse d\'un grain de sable : 46 × 10⁻⁶ kg. Son professeur '
        + 'lui répond que le calcul est juste, mais que ce n\'est pas une notation '
        + 'scientifique.',
      questions: [
        { texte: 'Quel doit être le premier facteur ?', attendu: 4.6 },
        { texte: 'Quel doit être l\'exposant de 10 ?', attendu: -5 },
      ],
    },
  ],

  test: [
    {
      id: 't-6-4-1', type: 'trous',
      consigne: 'Écris ce nombre en notation scientifique.',
      enonce: '5\\,400 = \\square \\times 10^{\\square}',
      champs: [{ id: 'a', etiquette: 'mantisse', attendu: 5.4 }, { id: 'b', etiquette: 'exposant', attendu: 3 }],
      revoir: 'definition',
    },
    {
      id: 't-6-4-2', type: 'trous',
      consigne: 'Écris ce nombre en notation scientifique.',
      enonce: '0{,}062 = \\square \\times 10^{\\square}',
      champs: [{ id: 'a', etiquette: 'mantisse', attendu: 6.2 }, { id: 'b', etiquette: 'exposant', attendu: -2 }],
      piege: 'exposant-negatif-pris-pour-nombre-negatif', revoir: 'remarque',
    },
    {
      id: 't-6-4-3', type: 'trous',
      consigne: 'Écris ce nombre en notation scientifique.',
      enonce: '78\\,000\\,000 = \\square \\times 10^{\\square}',
      champs: [{ id: 'a', etiquette: 'mantisse', attendu: 7.8 }, { id: 'b', etiquette: 'exposant', attendu: 7 }],
      piege: 'notation-scientifique-mal-cadree', revoir: 'propriete',
    },
    {
      id: 't-6-4-4', type: 'trous',
      consigne: 'Écris ce nombre en notation scientifique.',
      enonce: '0{,}0000045 = \\square \\times 10^{\\square}',
      champs: [{ id: 'a', etiquette: 'mantisse', attendu: 4.5 }, { id: 'b', etiquette: 'exposant', attendu: -6 }],
      piege: 'exposant-negatif-pris-pour-nombre-negatif', revoir: 'propriete',
    },
    {
      id: 't-6-4-5', type: 'trous',
      consigne: 'Écris ce nombre en notation scientifique.',
      enonce: '-520 = \\square \\times 10^{\\square}',
      champs: [{ id: 'a', etiquette: 'mantisse', attendu: -5.2 }, { id: 'b', etiquette: 'exposant', attendu: 2 }],
      piege: 'exposant-negatif-pris-pour-nombre-negatif', revoir: 'remarque',
    },
    {
      id: 't-6-4-6', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '0{,}0031 = 3{,}1 \\times 10^{-3}',
      attendu: true,
      explication:
        '3,1 × 10⁻³, c\'est la virgule qui recule de 3 rangs : 0,0031. Et 3,1 est bien '
        + 'compris entre 1 et 10. L\'écriture est correcte.',
      revoir: 'exemple',
    },
    {
      id: 't-6-4-7', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '250\\,000 = 25 \\times 10^{4}',
      attendu: false,
      explication:
        'Le produit est juste — 25 × 10 000 fait bien 250 000 — mais 25 n\'est pas '
        + 'compris entre 1 et 10. La notation scientifique est 2,5 × 10⁵.',
      piege: 'notation-scientifique-mal-cadree', revoir: 'definition',
    },
    {
      id: 't-6-4-8', type: 'comparer',
      consigne: 'Compare ces deux nombres.',
      enonce: '3{,}4 \\times 10^{5} \\ldots 8{,}1 \\times 10^{4}',
      attendu: '>',
      piege: 'exposant-pris-pour-facteur', revoir: 'propriete',
    },
    {
      id: 't-6-4-9', type: 'vraifaux',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Un nombre écrit avec un exposant négatif est un nombre négatif.',
      attendu: false,
      contreExemple: {
        invite:
          'Donne un nombre positif écrit en notation scientifique avec un exposant '
          + 'négatif : le premier facteur, puis l\'exposant.',
        champs: [
          { id: 'a', etiquette: 'premier facteur' },
          { id: 'b', etiquette: 'exposant' },
        ],
        // On vérifie la PROPRIÉTÉ : premier facteur cadré dans [1 ; 10[ et
        // exposant entier strictement négatif. N'importe lequel des multiples
        // couples possibles réfute l'affirmation — l'élève choisit le sien.
        valide: (a, b) => a >= 1 && a < 10 && Number.isInteger(b) && b < 0,
        exemple: '3 × 10⁻² vaut 0,03 : plus petit que 1, et pourtant bien positif.',
      },
      piege: 'exposant-negatif-pris-pour-nombre-negatif', revoir: 'remarque',
    },
    {
      id: 't-6-4-10', type: 'corriger',
      consigne: 'Cette mise en notation scientifique est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '0{,}00092',
      lignes: [
        { texte: 'Le premier chiffre non nul est 9, donc le premier facteur est 9,2.', fausse: false },
        { texte: 'Pour passer de 0,000 92 à 9,2, la virgule avance de 3 rangs.', fausse: true },
        { texte: 'Le nombre de départ est plus petit que 1, donc l\'exposant est négatif.', fausse: false },
        { texte: 'Donc 0,000 92 = 9,2 × 10⁻³.', fausse: false },
      ],
      explication:
        'La première ligne est juste, et la troisième aussi. L\'erreur est à la '
        + 'deuxième : la virgule avance de **4** rangs, pas de 3 — 0,0092 ; 0,092 ; '
        + '0,92 ; 9,2. Les zéros après la virgule sont trois, mais les rangs '
        + 'parcourus sont quatre. L\'écriture correcte est 9,2 × 10⁻⁴.',
      piege: 'notation-scientifique-mal-cadree', revoir: 'propriete',
    },
  ],
};
