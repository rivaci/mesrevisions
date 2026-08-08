// Chapitre 3 — Calculer la longueur d'un côté de l'angle droit.
//
// Le savoir-faire jumeau de « calculer l'hypoténuse », et celui qui casse : dès
// que Pythagore est installé, l'élève additionne les carrés par réflexe, sans
// regarder ce qu'on lui demande. La difficulté n'est pas le calcul, c'est de
// décider entre + et −.
//
// Deux choix découlent de là.
//
// D'abord, le CONTRÔLE est mis au même rang que la règle : un côté de l'angle
// droit est plus court que l'hypoténuse. C'est un test que l'élève peut faire
// seul, en trois secondes, sans l'appli — et il attrape l'addition à tous les
// coups. Il traverse la découverte, le cours, la méthode et deux items.
//
// Ensuite, les items neutres cherchent l'HYPOTÉNUSE. Sans eux, le motif de
// surface « dans ce paragraphe on soustrait » suffirait à tout réussir, et
// l'élève repartirait avec une règle qui dépend du numéro du chapitre.

export default {
  id: 'sf-3-4',
  titre: 'Calculer la longueur d\'un côté de l\'angle droit',
  attendus: [
    'Il utilise le théorème de Pythagore pour calculer la longueur d\'un côté de l\'angle droit.',
  ],

  // On ne dit pas « il faut soustraire » : on donne trois triangles où la somme
  // des carrés est déjà écrite, et on demande le terme qui manque. La
  // soustraction apparaît comme la question inverse, pas comme une consigne.
  decouvrir: {
    titre: 'Le carré qui manque',
    texte:
      'Dans un triangle rectangle, le carré de l\'hypoténuse est égal à la somme '
      + 'des carrés des deux autres côtés. Voici trois triangles rectangles dont '
      + 'on connaît les trois longueurs.',
    lignes: [
      { calcul: 'côtés 3 et 4, hypoténuse 5', resultat: '9 + 16 = 25' },
      { calcul: 'côtés 6 et 8, hypoténuse 10', resultat: '36 + 64 = 100' },
      { calcul: 'côtés 5 et 12, hypoténuse 13', resultat: '25 + 144 = 169' },
    ],
    question:
      'Un quatrième triangle rectangle a pour hypoténuse 17 et pour côté de '
      + 'l\'angle droit 8. On sait donc que 64 + ? = 289. Trouve le carré qui '
      + 'manque, puis la longueur du troisième côté.',
    champs: [
      { id: 'a', etiquette: '289 − 64 =', attendu: 225 },
      { id: 'b', etiquette: 'troisième côté :', attendu: 15 },
    ],
    conclusion:
      'Pour un côté de l\'angle droit, on **soustrait** : le carré de l\'hypoténuse '
      + 'moins le carré du côté connu. Puis on prend la racine carrée. Et regarde : '
      + '15 est **plus petit** que l\'hypoténuse 17. Ce sera toujours le cas.',
  },

  cours: [
    {
      type: 'theoreme',
      titre: 'Théorème de Pythagore',
      texte:
        'Si un triangle ABC est **rectangle en A**, alors BC² = AB² + AC².\n'
        + 'Le côté BC, opposé à l\'angle droit, est l\'**hypoténuse** : c\'est '
        + 'toujours le plus long des trois.',
    },
    {
      type: 'propriete',
      titre: 'Chercher un côté de l\'angle droit',
      texte:
        'On écrit la même égalité, puis on isole le côté cherché :\n'
        + 'AC² = BC² − AB².\n'
        + 'On **soustrait** : le carré de l\'hypoténuse moins le carré du côté connu.',
    },
    {
      type: 'remarque',
      titre: 'Le premier geste n\'est pas un calcul',
      texte:
        'Avant d\'écrire quoi que ce soit, repère l\'**angle droit**, puis le côté '
        + 'd\'en face : c\'est l\'hypoténuse. C\'est son carré qui reste seul d\'un '
        + 'côté du signe =, quelles que soient les lettres de l\'énoncé.',
    },
    {
      type: 'remarque',
      titre: 'Le contrôle en trois secondes',
      texte:
        'Un côté de l\'angle droit est **plus court** que l\'hypoténuse. Si le nombre '
        + 'que tu trouves la dépasse, tu as additionné au lieu de soustraire — '
        + 'inutile de chercher plus loin, reprends le calcul.',
    },
    {
      type: 'exemple',
      texte:
        'Rectangle en A, avec BC = 17 cm et AB = 8 cm :\n'
        + 'AC² = 289 − 64 = 225, donc AC = 15 cm. Et 15 est bien plus petit que 17.',
    },
  ],

  methode: {
    titre: 'Rédiger le calcul d\'un côté de l\'angle droit',
    enonce: 'Le triangle ABC est rectangle en A. On donne BC = 25 cm et AB = 7 cm. Calculer AC.',
    etapes: [
      {
        texte: 'Le triangle ABC est rectangle en A, donc son hypoténuse est [BC].',
        note: 'C\'est le côté opposé à l\'angle droit. On le repère avant tout calcul.',
      },
      {
        texte: 'D\'après le théorème de Pythagore : BC² = AB² + AC².',
        note: 'L\'hypoténuse est seule à gauche du signe =.',
      },
      {
        texte: 'Donc 25² = 7² + AC², c\'est-à-dire 625 = 49 + AC².',
        note: 'On remplace les longueurs connues, on garde AC² tel quel.',
      },
      {
        texte: 'AC² = 625 − 49 = 576.',
        note: 'C\'est ici qu\'on soustrait : le côté cherché touche l\'angle droit.',
      },
      {
        texte: 'AC = √576 = 24. Le côté AC mesure 24 cm.',
        note: 'La racine carrée est l\'étape la plus souvent oubliée.',
      },
    ],
    controle:
      'Le contrôle : AC = 24 est bien plus petit que l\'hypoténuse BC = 25. Si tu '
      + 'avais trouvé un nombre supérieur à 25, ce serait le signe que tu as '
      + 'additionné les carrés au lieu de les soustraire.',
  },

  entrainement: [
    {
      id: 'e-3-4-1', type: 'calcul', palier: 1, piege: 'somme-au-lieu-de-difference',
      consigne: 'Le triangle ABC est rectangle en A. Calcule AC, en cm.',
      enonce: 'BC = 13 \\text{ cm et } AB = 5 \\text{ cm}',
      attendu: 12,
      fausses: [
        { valeur: 194, piege: 'somme-au-lieu-de-difference' },
        { valeur: 144, piege: 'racine-oubliee' },
        { valeur: 8, piege: 'racine-linearisee' },
        { valeur: 4, piege: 'carre-pris-pour-double' },
      ],
    },
    {
      id: 'e-3-4-2', type: 'calcul', palier: 1, piege: 'somme-au-lieu-de-difference',
      consigne: 'Le triangle DEF est rectangle en D. Calcule DF, en cm.',
      enonce: 'EF = 10 \\text{ cm et } DE = 6 \\text{ cm}',
      attendu: 8,
      fausses: [
        { valeur: 136, piege: 'somme-au-lieu-de-difference' },
        { valeur: 64, piege: 'racine-oubliee' },
        { valeur: 4, piege: 'racine-linearisee' },
      ],
    },
    {
      // NEUTRE. Ici c'est l'hypoténuse qu'on cherche : il faut additionner. Rien
      // ne le signale — même formulation, mêmes lettres, même palier. Sans cet
      // item, « dans ce paragraphe on soustrait » suffirait à tout réussir sans
      // jamais regarder où se trouve l'angle droit.
      id: 'e-3-4-3', type: 'calcul', palier: 1, neutre: true, piege: 'somme-au-lieu-de-difference',
      consigne: 'Le triangle GHI est rectangle en G. Calcule HI, en cm.',
      enonce: 'GH = 9 \\text{ cm et } GI = 12 \\text{ cm}',
      attendu: 15,
      fausses: [
        { valeur: 63, piege: 'somme-au-lieu-de-difference' },
        { valeur: 225, piege: 'racine-oubliee' },
        { valeur: 21, piege: 'racine-linearisee' },
      ],
    },
    {
      // L'angle droit n'est pas au sommet cité en premier, et l'hypoténuse n'est
      // pas le côté nommé en premier : les lettres ne peuvent plus servir
      // d'indice, seule la position de l'angle droit compte.
      id: 'e-3-4-4', type: 'calcul', palier: 2, piege: 'hypotenuse-mal-identifiee',
      consigne: 'Le triangle MNP est rectangle en N. Calcule MN, en cm.',
      enonce: 'MP = 25 \\text{ cm et } NP = 20 \\text{ cm}',
      attendu: 15,
      fausses: [
        { valeur: 1025, piege: 'somme-au-lieu-de-difference' },
        { valeur: 225, piege: 'racine-oubliee' },
        { valeur: 5, piege: 'racine-linearisee' },
      ],
    },
    {
      id: 'e-3-4-5', type: 'trous', palier: 2, piege: 'racine-oubliee',
      consigne: 'Le triangle ABC est rectangle en A, avec BC = 41 cm et AB = 40 cm. Complète.',
      enonce: 'AC^2 = 41^2 - 40^2 = \\square \\qquad AC = \\square \\text{ cm}',
      champs: [
        { id: 'a', attendu: 81 },
        { id: 'b', attendu: 9 },
      ],
      fausses: [
        { valeur: 3281, piege: 'somme-au-lieu-de-difference' },
        { valeur: 1, piege: 'racine-linearisee' },
      ],
    },
    {
      id: 'e-3-4-6', type: 'plausible', palier: 2, piege: 'somme-au-lieu-de-difference',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Rectangle en } A : BC = 15 \\text{ cm}, AB = 9 \\text{ cm}, \\text{ donc } AC = 17{,}5 \\text{ cm}',
      attendu: false,
      explication:
        'AC est un côté de l\'angle droit : il ne peut pas dépasser l\'hypoténuse '
        + 'BC = 15 cm. Trouver 17,5 signale qu\'on a additionné les carrés au lieu '
        + 'de les soustraire. Le bon calcul : 225 − 81 = 144, donc AC = 12 cm.',
    },
    {
      // NEUTRE parmi les « plausible » : le résultat proposé est correct. Sans
      // lui, « on me demande si c'est plausible, donc c'est faux » deviendrait
      // une stratégie gagnante, et le contrôle ne servirait plus à rien.
      id: 'e-3-4-7', type: 'plausible', palier: 2, neutre: true, piege: 'somme-au-lieu-de-difference',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Rectangle en } R : ST = 26 \\text{ cm}, RS = 24 \\text{ cm}, \\text{ donc } RT = 10 \\text{ cm}',
      attendu: true,
      explication:
        '10 est bien plus petit que l\'hypoténuse ST = 26 cm : la taille est '
        + 'cohérente. Le calcul confirme : 676 − 576 = 100, et la racine carrée de '
        + '100 vaut 10.',
    },
    {
      id: 'e-3-4-8', type: 'corriger', palier: 3, piege: 'somme-au-lieu-de-difference',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{Rectangle en } A : BC = 20 \\text{ cm}, AB = 16 \\text{ cm}, AC = ?',
      lignes: [
        { texte: 'Le triangle est rectangle en A, donc [BC] est l\'hypoténuse.', fausse: false },
        { texte: 'D\'après le théorème de Pythagore : BC² = AB² + AC².', fausse: false },
        { texte: 'Donc AC² = 20² + 16² = 400 + 256 = 656.', fausse: true },
        { texte: 'AC ≈ 25,6 cm', fausse: false },
      ],
      explication:
        'La troisième ligne trahit la ligne du dessus : de 20² = 16² + AC² on tire '
        + 'AC² = 400 − 256 = 144, donc AC = 12 cm. La dernière ligne est cohérente '
        + 'avec la faute, mais 25,6 cm dépasse l\'hypoténuse 20 cm — impossible.',
    },
    {
      id: 'e-3-4-9', type: 'vraifaux', palier: 3, piege: 'somme-au-lieu-de-difference',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation:
        'Pour calculer le troisième côté d\'un triangle rectangle, on additionne toujours les carrés des deux côtés connus.',
      attendu: false,
      contreExemple: {
        invite:
          'Donne l\'hypoténuse puis un côté de l\'angle droit d\'un triangle '
          + 'rectangle. En additionnant leurs carrés, on obtiendrait un côté plus '
          + 'long que l\'hypoténuse — ce qui est impossible.',
        champs: [
          { id: 'a', etiquette: 'hypoténuse' },
          { id: 'b', etiquette: 'côté de l\'angle droit' },
        ],
        // On vérifie une propriété, pas un couple précis : n'importe quel couple
        // hypoténuse / côté valable fait un contre-exemple, puisque la racine de
        // la somme des carrés dépasse alors toujours l'hypoténuse.
        valide: (a, b) => b > 0 && b < a && Math.sqrt(a * a + b * b) > a,
        exemple:
          'Hypoténuse 5 et côté 3 : en additionnant on obtiendrait environ 5,8, '
          + 'plus long que l\'hypoténuse. En soustrayant on trouve 4, ce qui convient.',
      },
    },
    {
      id: 'e-3-4-10', type: 'calcul', palier: 3, piege: 'somme-au-lieu-de-difference',
      consigne: 'Le triangle ABC est rectangle en B. Calcule AB, en cm.',
      enonce: 'AC = 6{,}5 \\text{ cm et } BC = 2{,}5 \\text{ cm}',
      attendu: 6,
      fausses: [
        { valeur: 48.5, piege: 'somme-au-lieu-de-difference' },
        { valeur: 36, piege: 'racine-oubliee' },
        { valeur: 4, piege: 'racine-linearisee' },
      ],
    },
  ],

  problemes: [
    {
      id: 'p-3-4-1',
      enonce:
        'Une échelle de 5 m est appuyée contre un mur vertical. Son pied est posé '
        + 'à 3 m du bas du mur, sur un sol horizontal.',
      questions: [
        { texte: 'À quelle hauteur l\'échelle touche-t-elle le mur ?', attendu: 4, unite: 'm' },
        { texte: 'On éloigne le pied jusqu\'à 4 m du mur. À quelle hauteur touche-t-elle alors ?', attendu: 3, unite: 'm' },
      ],
    },
    {
      id: 'p-3-4-2',
      enonce:
        'Un écran de télévision rectangulaire mesure 120 cm de large. Sa diagonale, '
        + 'celle qu\'annonce le fabricant, mesure 130 cm.',
      questions: [
        { texte: 'Quelle est la hauteur de l\'écran ?', attendu: 50, unite: 'cm' },
        { texte: 'Quel est le périmètre de l\'écran ?', attendu: 340, unite: 'cm' },
      ],
    },
    {
      id: 'p-3-4-3',
      enonce:
        'Un mât perpendiculaire au sol est maintenu par deux câbles tendus depuis '
        + 'le sol. Le premier câble mesure 25 m et son ancrage est à 7 m du pied du '
        + 'mât. Le second mesure 26 m et son ancrage est à 10 m du pied.',
      questions: [
        { texte: 'À quelle hauteur le premier câble est-il fixé sur le mât ?', attendu: 24, unite: 'm' },
        { texte: 'Et le second ?', attendu: 24, unite: 'm' },
      ],
    },
    {
      id: 'p-3-4-4',
      enonce:
        'Une rampe d\'accès rectiligne mesure 17 m de long. Au sol, elle couvre une '
        + 'distance horizontale de 15 m. Le dénivelé qu\'elle rattrape est vertical.',
      questions: [
        { texte: 'Quel est ce dénivelé ?', attendu: 8, unite: 'm' },
        { texte: 'Une seconde rampe mesure 41 m et couvre 40 m à l\'horizontale. Quel est son dénivelé ?', attendu: 9, unite: 'm' },
      ],
    },
    {
      id: 'p-3-4-5',
      enonce:
        'Un terrain rectangulaire ABCD mesure 63 m de longueur. Sa diagonale mesure 65 m.',
      questions: [
        { texte: 'Quelle est sa largeur ?', attendu: 16, unite: 'm' },
        { texte: 'Quelle est son aire ?', attendu: 1008, unite: 'm²' },
        { texte: 'Quel est son périmètre ?', attendu: 158, unite: 'm' },
      ],
    },
  ],

  test: [
    {
      id: 't-3-4-1', type: 'calcul',
      consigne: 'Le triangle ABC est rectangle en A. Calcule AC, en cm.',
      enonce: 'BC = 25 \\text{ cm et } AB = 24 \\text{ cm}',
      attendu: 7, revoir: 'propriete',
    },
    {
      id: 't-3-4-2', type: 'calcul',
      consigne: 'Le triangle ABC est rectangle en A. Calcule AC, en cm.',
      enonce: 'BC = 13 \\text{ cm et } AB = 12 \\text{ cm}',
      attendu: 5, revoir: 'propriete',
    },
    {
      id: 't-3-4-3', type: 'calcul',
      consigne: 'Le triangle DEF est rectangle en D. Calcule DF, en cm.',
      enonce: 'EF = 17 \\text{ cm et } DE = 15 \\text{ cm}',
      attendu: 8, revoir: 'propriete',
    },
    {
      // Le seul item du test où l'on cherche l'hypoténuse : il vérifie que le
      // choix entre + et − vient de la figure, pas du titre du chapitre.
      id: 't-3-4-4', type: 'calcul',
      consigne: 'Le triangle GHI est rectangle en G. Calcule HI, en cm.',
      enonce: 'GH = 20 \\text{ cm et } GI = 21 \\text{ cm}',
      attendu: 29, revoir: 'theoreme',
    },
    {
      id: 't-3-4-5', type: 'calcul',
      consigne: 'Le triangle MNP est rectangle en M. Calcule MP, en cm.',
      enonce: 'NP = 15 \\text{ cm et } MN = 9 \\text{ cm}',
      attendu: 12, revoir: 'propriete',
    },
    {
      id: 't-3-4-6', type: 'trous',
      consigne: 'Le triangle ABC est rectangle en A, avec BC = 26 cm et AB = 24 cm. Complète.',
      enonce: 'AC^2 = 26^2 - 24^2 = \\square \\qquad AC = \\square \\text{ cm}',
      champs: [
        { id: 'a', attendu: 100 },
        { id: 'b', attendu: 10 },
      ],
      revoir: 'exemple',
    },
    {
      id: 't-3-4-7', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Rectangle en } A : BC = 10 \\text{ cm}, AB = 8 \\text{ cm}, \\text{ donc } AC = 12{,}8 \\text{ cm}',
      attendu: false,
      explication:
        'AC touche l\'angle droit : il doit rester plus court que l\'hypoténuse '
        + 'BC = 10 cm. Les carrés ont été additionnés. Le bon calcul : '
        + '100 − 64 = 36, donc AC = 6 cm.',
      revoir: 'remarque',
    },
    {
      id: 't-3-4-8', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Rectangle en } A : BC = 41 \\text{ cm}, AB = 40 \\text{ cm}, \\text{ donc } AC = 9 \\text{ cm}',
      attendu: true,
      explication:
        '9 est plus petit que l\'hypoténuse 41 cm, donc la taille tient. '
        + 'Vérification : 1 681 − 1 600 = 81, et la racine carrée de 81 vaut 9.',
      revoir: 'remarque',
    },
    {
      id: 't-3-4-9', type: 'calcul',
      consigne: 'Le triangle ABC est rectangle en B. Calcule AB, en cm.',
      enonce: 'AC = 7{,}5 \\text{ cm et } BC = 4{,}5 \\text{ cm}',
      attendu: 6, revoir: 'exemple',
    },
    {
      id: 't-3-4-10', type: 'calcul',
      consigne: 'Le triangle ABC est rectangle en A. Calcule AC, en cm.',
      enonce: 'BC = 61 \\text{ cm et } AB = 60 \\text{ cm}',
      attendu: 11, revoir: 'propriete',
    },
  ],
};
