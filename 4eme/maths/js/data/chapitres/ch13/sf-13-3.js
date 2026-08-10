// Chapitre 13, savoir-faire 3 — Calculer une mesure d'angle à l'aide du cosinus.
//
// C'est le trajet RETOUR du chapitre : le savoir-faire 1 nomme les côtés, le
// savoir-faire 2 va de l'angle vers une longueur ; celui-ci part de deux
// longueurs et remonte à l'angle. Deux gestes, dans cet ordre : on forme le
// quotient adjacent ÷ hypoténuse, puis on lit l'angle. Les séparer n'est pas
// une coquetterie — c'est entre les deux que se place le seul contrôle que
// l'élève puisse refaire seul en devoir : ce quotient doit tomber entre 0 et 1.
//
// ── Pas de calculatrice, donc des tables données dans l'énoncé ────────────
//
// L'application n'en a pas, et c'est une contrainte heureuse. Une touche cos⁻¹
// escamote la question « quel angle a ce cosinus-là ? » ; une table de trois
// valeurs bien séparées l'oblige à se poser. Toute valeur nécessaire à un
// CALCUL figure donc dans l'énoncé qui la demande. Les deux seules valeurs à
// connaître sans table sont les bornes — cos 0° = 1 et cos 90° = 0 — et elles
// ne servent jamais à calculer : uniquement à encadrer, dans le geste de
// contrôle du cours et de la méthode.
//
// ── La découverte fait varier l'angle, pas le triangle ────────────────────
//
// Trois triangles rectangles de même hypoténuse, d'angles 30°, 60° et 70°. En
// calculant deux des trois quotients, l'élève constate d'un coup les deux
// propriétés du chapitre : ils sont tous plus petits que 1, et ils DIMINUENT
// quand l'angle grandit. Énoncer « le cosinus décroît » ne coûte rien et ne
// laisse rien ; le voir sur trois nombres qu'on vient d'obtenir soi-même, si.
//
// ── Pourquoi ces trois items neutres ──────────────────────────────────────
//
// Le piège principal — un cosinus supérieur à 1, donc le quotient écrit à
// l'envers — ne peut jouer que là où il y a deux longueurs à diviser. Les
// items 1, 6 et 7 n'en ont aucune : le cosinus y est donné, ou bien la
// question ne porte que sur le sens de variation. Un élève qui inverse
// systématiquement ses quotients y répond juste, et c'est le but : sans eux,
// « je divise le petit par le grand et je cherche dans la table » traverserait
// le savoir-faire entier, y compris chez qui ne sait pas ce qu'est un côté
// adjacent. Leurs réponses fausses pointent donc ailleurs — vers la croissance
// supposée du cosinus, et vers la confusion entre le rapport et l'angle.
//
// ── Ce que ce savoir-faire ne couvre pas ──────────────────────────────────
//
// Il ne calcule aucune longueur AVEC LE COSINUS : c'est l'objet du savoir-faire
// 2, et le piège « produit et quotient échangés » s'y travaille. La seule
// longueur cherchée ici l'est par Pythagore, à la dernière question de
// p-13-3-5 : c'est un réinvestissement, pas l'objet. Il ne construit pas
// non plus de figure — tout est écrit en toutes lettres, l'angle droit nommé
// dans chaque énoncé, les sommets et les longueurs énumérés. Sinus et tangente
// ne sont pas au programme de 4e et n'apparaissent nulle part.

export default {
  id: 'sf-13-3',
  titre: 'Calculer une mesure d’angle à l’aide du cosinus',
  attendus: [
    'Il utilise le cosinus d’un angle aigu pour calculer une mesure d’angle dans un triangle rectangle.',
    'Il sait qu’un cosinus d’angle aigu est compris entre 0 et 1, et s’en sert pour contrôler son résultat.',
  ],

  // On ne dit pas « le cosinus décroît » : on donne trois triangles de même
  // hypoténuse et d'angles croissants, et c'est l'élève qui obtient deux
  // quotients dont le plus grand angle porte le plus petit. Les deux
  // propriétés du chapitre — entre 0 et 1, et décroissant — sortent du même
  // calcul.
  decouvrir: {
    titre: 'Trois triangles, trois quotients',
    texte:
      'Voici trois triangles rectangles. Dans chacun, on connaît l’angle aigu, '
      + 'la longueur de l’hypoténuse et celle du côté adjacent à cet angle. '
      + 'L’hypoténuse mesure 10 cm dans les trois. Les longueurs sont arrondies '
      + 'au dixième de centimètre.',
    lignes: [
      { calcul: 'angle de 30°, côté adjacent 8,7 cm, hypoténuse 10 cm', resultat: 'adjacent ÷ hypoténuse : à calculer' },
      { calcul: 'angle de 60°, côté adjacent 5 cm, hypoténuse 10 cm', resultat: 'adjacent ÷ hypoténuse = 0,5' },
      { calcul: 'angle de 70°, côté adjacent 3,4 cm, hypoténuse 10 cm', resultat: 'adjacent ÷ hypoténuse : à calculer' },
    ],
    question:
      'Calcule le quotient « côté adjacent ÷ hypoténuse » dans le premier '
      + 'triangle, puis dans le troisième.',
    champs: [
      { id: 'a', etiquette: 'pour l’angle de 30° : 8,7 ÷ 10 =', attendu: 0.87 },
      { id: 'b', etiquette: 'pour l’angle de 70° : 3,4 ÷ 10 =', attendu: 0.34 },
    ],
    conclusion:
      'Les trois quotients valent **0,87 ; 0,5 ; 0,34**. Deux choses sautent aux yeux.\n'
      + 'D’abord ils sont tous **compris entre 0 et 1** — et ce n’est pas un hasard : '
      + 'l’hypoténuse est le plus long des trois côtés, donc le côté adjacent divisé '
      + 'par elle donne toujours moins de 1.\n'
      + 'Ensuite ils **diminuent** quand l’angle grandit : 30° donne 0,87, mais 70° ne '
      + 'donne que 0,34. Un angle plus ouvert a un cosinus plus petit, jamais plus grand.\n'
      + 'Ce quotient s’appelle le **cosinus** de l’angle. Chaque angle aigu a le sien, '
      + 'et un seul : c’est ce qui permet de faire le trajet en sens inverse — connaître '
      + 'le quotient, et retrouver l’angle.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Le cosinus d’un angle aigu',
      texte:
        'Dans un triangle rectangle, le **cosinus** d’un angle aigu est le quotient :\n'
        + 'cos(angle) = (côté adjacent à l’angle) ÷ (hypoténuse).\n'
        + 'L’**hypoténuse** est le côté opposé à l’angle droit. Le côté **adjacent** '
        + 'est celui qui touche l’angle sans être l’hypoténuse.\n'
        + 'Un cosinus n’est pas une longueur : c’est un nombre sans unité, qui ne '
        + 'dépend que de l’angle.',
    },
    {
      type: 'propriete',
      titre: 'Un cosinus est toujours compris entre 0 et 1',
      texte:
        'L’hypoténuse est le plus long des trois côtés d’un triangle rectangle. Le '
        + 'côté adjacent, divisé par elle, donne donc un nombre **compris entre 0 et 1**.\n'
        + 'Un cosinus de 1,25 ou de 3 n’existe pas. Si tu en trouves un, ce n’est pas '
        + 'la peine de refaire le même calcul : les deux longueurs ont été **échangées**, '
        + 'et c’est l’hypoténuse qui doit aller au dénominateur.',
    },
    {
      type: 'propriete',
      titre: 'Plus l’angle est grand, plus son cosinus est petit',
      texte:
        'cos 0° = 1 et cos 90° = 0. Entre les deux, quand l’angle **augmente**, son '
        + 'cosinus **diminue**.\n'
        + 'Deux conséquences à retenir. Dans une table, le **plus petit** cosinus est '
        + 'celui du **plus grand** angle. Et doubler l’angle ne double pas le cosinus : '
        + 'cos 30° ≈ 0,87 alors que cos 60° = 0,5, soit moins, et non le double.',
    },
    {
      type: 'remarque',
      titre: 'Du nombre vers l’angle',
      texte:
        'Calculer un cosinus, c’est aller de l’angle vers un nombre. Ici on fait le '
        + 'trajet **inverse** : on connaît le nombre, on cherche l’angle. Sur une '
        + 'calculatrice ce retour s’écrit cos⁻¹, et cos⁻¹ n’est **pas** 1 ÷ cos.\n'
        + 'Dans cette application il n’y a pas de calculatrice : l’énoncé te donne une '
        + 'petite table, et tu y lis l’angle dont le cosinus est celui que tu as calculé.\n'
        + 'Une mesure d’angle se donne en **degrés**. Si tu réponds 0,6, tu as rendu le '
        + 'cosinus au lieu de l’angle : le calcul s’est arrêté à mi-chemin.',
    },
    {
      type: 'exemple',
      texte:
        'ABC est un triangle rectangle en B, avec AB = 9 cm et AC = 12 cm. On donne '
        + 'cos 30° ≈ 0,87 ; cos 41° ≈ 0,75 ; cos 60° = 0,50. Quelle est la mesure de '
        + 'l’angle de sommet A ?\n'
        + 'L’angle droit est en B, donc l’hypoténuse est le côté opposé à B : c’est '
        + '[AC] = 12 cm. De A partent [AB] et [AC] ; [AC] est l’hypoténuse, donc le '
        + 'côté adjacent est [AB] = 9 cm.\n'
        + 'cos(angle de sommet A) = 9 ÷ 12 = 0,75. Ce nombre est bien compris entre 0 '
        + 'et 1. Dans la table, 0,75 est le cosinus de 41° : l’angle de sommet A mesure '
        + '**41°**.',
    },
    {
      type: 'exemple',
      texte:
        'MNP est un triangle rectangle en N, avec MN = 5,2 cm et MP = 20 cm. On donne '
        + 'cos 50° ≈ 0,64 ; cos 65° ≈ 0,42 ; cos 75° ≈ 0,26. Quelle est la mesure de '
        + 'l’angle de sommet M ?\n'
        + 'L’hypoténuse est [MP] = 20 cm, opposée à l’angle droit N ; le côté adjacent '
        + 'à l’angle de sommet M est [MN] = 5,2 cm.\n'
        + 'cos(angle de sommet M) = 5,2 ÷ 20 = 0,26. C’est le plus petit des trois '
        + 'nombres de la table, donc c’est le plus GRAND des trois angles : **75°**.\n'
        + 'Et si on avait écrit le quotient à l’envers, 20 ÷ 5,2, on aurait trouvé '
        + 'environ 3,8 — un cosinus plus grand que 1, donc impossible. Le contrôle se '
        + 'fait avant de regarder la table, pas après.',
    },
  ],

  methode: {
    titre: 'Du quotient à l’angle',
    enonce:
      'PQR est un triangle rectangle en Q, avec PQ = 5,7 cm et PR = 10 cm. On donne '
      + 'cos 40° ≈ 0,77 ; cos 55° ≈ 0,57 ; cos 70° ≈ 0,34. Quelle est la mesure de '
      + 'l’angle de sommet P ?',
    etapes: [
      {
        texte: 'Je repère l’hypoténuse : le triangle est rectangle en Q, donc c’est le côté opposé à Q, c’est-à-dire [PR] = 10 cm.',
        note: 'L’hypoténuse ne change pas quand on change d’angle : elle est toujours face à l’angle droit.',
      },
      {
        texte: 'Je repère le côté adjacent : de P partent [PQ] et [PR] ; [PR] est l’hypoténuse, donc l’adjacent est [PQ] = 5,7 cm.',
        note: 'Adjacent veut dire « qui touche l’angle » — et ce n’est pas l’hypoténuse.',
      },
      {
        texte: 'Je forme le quotient : cos(angle de sommet P) = 5,7 ÷ 10 = 0,57.',
        note: 'Le côté adjacent en haut, l’hypoténuse en bas.',
      },
      {
        texte: 'Je vérifie que 0,57 est bien compris entre 0 et 1 : oui, je peux continuer.',
        note: 'Un nombre plus grand que 1 voudrait dire que j’ai écrit le quotient à l’envers. Ce contrôle se fait ici, avant la table.',
      },
      {
        texte: 'Je lis l’angle dans la table : 0,57, c’est cos 55°. L’angle de sommet P mesure 55°.',
        note: 'La réponse est un nombre de degrés, pas un rapport de longueurs.',
      },
    ],
    controle:
      'Le contrôle : situe ton quotient dans la table, en te rappelant les deux '
      + 'bornes — cos 0° = 1, cos 90° = 0 — et le fait qu’entre elles le cosinus '
      + 'DESCEND. Ici 0,57 est la valeur du MILIEU des trois : l’angle cherché est '
      + 'donc l’angle du milieu, 55°. Si tu avais répondu 70°, tu aurais annoncé le '
      + 'plus GRAND des trois angles alors que ton quotient n’est pas le plus PETIT '
      + 'des trois — impossible, puisque le cosinus diminue quand l’angle grandit.',
  },

  entrainement: [
    // ── Palier 1 : former le quotient, puis lire l'angle ───────────────────
    {
      // NEUTRE. Aucune longueur n'est donnée : il n'y a pas de quotient à
      // écrire, donc pas de quotient à écrire à l'envers. Un élève qui inverse
      // systématiquement répond juste ici. Sans cet item, le savoir-faire ne
      // serait qu'un exercice de division, alors que sa seconde moitié — lire
      // l'angle, et le rendre en degrés — s'entraîne séparément.
      id: 'e-13-3-1', type: 'calcul', palier: 1, neutre: true, piege: 'cosinus-plus-grand-que-un',
      consigne: 'Donne la mesure de cet angle, en degrés.',
      enonce:
        '\\text{Dans un triangle rectangle, le cosinus d’un angle aigu vaut 0,26. '
        + 'On donne : cos 35° ≈ 0,82 ; cos 55° ≈ 0,57 ; cos 75° ≈ 0,26.}',
      attendu: 75,
      fausses: [
        // Rendre 0,26 comme mesure d'angle, c'est s'arrêter au rapport : on
        // avait déjà le cosinus, c'est l'angle qui manquait.
        { valeur: 0.26, piege: 'arccos-et-cosinus-confondus' },
      ],
    },
    {
      id: 'e-13-3-2', type: 'trous', palier: 1, piege: 'cosinus-plus-grand-que-un',
      consigne: 'Calcule le cosinus de l’angle de sommet A, puis donne la mesure de cet angle.',
      enonce:
        '\\text{ABC est un triangle rectangle en B. AB = 5 cm et AC = 10 cm. '
        + 'On donne : cos 30° ≈ 0,87 ; cos 45° ≈ 0,71 ; cos 60° = 0,50.}',
      champs: [
        { id: 'a', etiquette: 'le cosinus de l’angle de sommet A', attendu: 0.5 },
        { id: 'b', etiquette: 'la mesure de l’angle de sommet A, en degrés', attendu: 60 },
      ],
      fausses: [
        // 10 ÷ 5 : l'hypoténuse passée au numérateur. 2 est plus grand que 1,
        // donc ce n'est pas un cosinus — la règle du piège le dit exactement.
        { valeur: 2, piege: 'cosinus-plus-grand-que-un' },
      ],
    },
    {
      id: 'e-13-3-3', type: 'calcul', palier: 1, piege: 'arccos-et-cosinus-confondus',
      consigne: 'Donne la mesure de l’angle de sommet D, en degrés.',
      enonce:
        '\\text{DEF est un triangle rectangle en E. DE = 4,2 cm et DF = 10 cm. '
        + 'On donne : cos 40° ≈ 0,77 ; cos 50° ≈ 0,64 ; cos 65° ≈ 0,42.}',
      attendu: 65,
      fausses: [
        { valeur: 0.42, piege: 'arccos-et-cosinus-confondus' },
      ],
    },

    // ── Palier 2 : refuser l'impossible, et le sens de variation ───────────
    {
      id: 'e-13-3-4', type: 'plausible', palier: 2, piege: 'cosinus-plus-grand-que-un',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Dans un triangle rectangle, un élève calcule le cosinus d’un angle aigu et trouve 1,25.}',
      attendu: false,
      explication:
        'Le côté adjacent à un angle aigu est toujours plus court que l’hypoténuse : '
        + 'leur quotient est donc compris entre 0 et 1, et un cosinus de 1,25 n’existe '
        + 'pas. Ce nombre dit une chose précise — les deux longueurs ont été échangées. '
        + 'L’hypoténuse doit aller au dénominateur, et le cosinus cherché est '
        + '1 ÷ 1,25 = 0,8.',
    },
    {
      id: 'e-13-3-5', type: 'trous', palier: 2, piege: 'cosinus-plus-grand-que-un',
      consigne: 'Calcule le cosinus de l’angle de sommet K, puis donne la mesure de cet angle.',
      // L'hypoténuse est citée la première : lire l'énoncé dans l'ordre conduit
      // droit au quotient inversé, ce que le contrôle « entre 0 et 1 » attrape.
      enonce:
        '\\text{KLM est un triangle rectangle en L. KM = 20 cm et KL = 12,8 cm. '
        + 'On donne : cos 40° ≈ 0,77 ; cos 50° ≈ 0,64 ; cos 60° = 0,50.}',
      champs: [
        { id: 'a', etiquette: 'le cosinus de l’angle de sommet K', attendu: 0.64 },
        { id: 'b', etiquette: 'la mesure de l’angle de sommet K, en degrés', attendu: 50 },
      ],
      fausses: [
        { valeur: 1.5625, piege: 'cosinus-plus-grand-que-un' },
      ],
    },
    {
      // NEUTRE. Ni longueur ni quotient : le piège principal ne peut rien
      // produire ici. Ce qui se joue est la seule chose que la table ne dit
      // pas — le SENS dans lequel le cosinus varie.
      id: 'e-13-3-6', type: 'comparer', palier: 2, neutre: true, piege: 'cosinus-plus-grand-que-un',
      consigne: 'Compare ces deux nombres, sans calculer aucun quotient et sans table de valeurs.',
      enonce: '\\text{cos 40° … cos 70°}',
      attendu: '>',
      fausses: [
        // « L'angle est plus grand, donc son cosinus l'est aussi » : c'est
        // exactement la conception que la règle du piège renverse.
        { valeur: '<', piege: 'cosinus-croit-avec-langle' },
      ],
    },
    {
      // NEUTRE, et vrai : deux façons de casser une stratégie de surface d'un
      // coup. Aucun quotient à inverser, et « on me demande si c'est plausible,
      // donc c'est faux » échoue ici.
      id: 'e-13-3-7', type: 'plausible', palier: 2, neutre: true, piege: 'cosinus-plus-grand-que-un',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Dans deux triangles rectangles, on a calculé le cosinus d’un angle aigu : '
        + '0,26 dans le premier, 0,87 dans le second. Un élève en conclut que l’angle du '
        + 'premier triangle est le plus grand des deux.}',
      attendu: true,
      explication:
        'C’est juste, même si le résultat surprend. Le cosinus DIMINUE quand l’angle '
        + 'augmente : il vaut 1 pour 0° et 0 pour 90°. Le plus petit des deux cosinus '
        + 'appartient donc au plus grand des deux angles. Ici il s’agit de 75° et de 30°.',
      fausses: [
        { valeur: false, piege: 'cosinus-croit-avec-langle' },
      ],
    },

    // ── Palier 3 : relire un raisonnement, le réfuter, synthétiser ─────────
    {
      id: 'e-13-3-8', type: 'corriger', palier: 3, piege: 'cosinus-croit-avec-langle',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l’erreur apparaît.',
      enonce:
        '\\text{GHI est un triangle rectangle en H. GH = 12 cm et GI = 20 cm. '
        + 'On donne : cos 30° ≈ 0,87 ; cos 45° ≈ 0,71 ; cos 53° ≈ 0,60. '
        + 'Quelle est la mesure de l’angle de sommet G ?}',
      lignes: [
        { texte: 'L’angle droit est en H, donc l’hypoténuse est [GI] = 20 cm et le côté adjacent à l’angle de sommet G est [GH] = 12 cm.', fausse: false },
        { texte: 'cos(angle de sommet G) = 12 ÷ 20 = 0,6, un nombre bien compris entre 0 et 1.', fausse: false },
        { texte: '0,6 est le plus petit des trois nombres de la table, donc l’angle de sommet G est le plus petit des trois : il mesure 30°.', fausse: true },
      ],
      explication:
        'Les deux premières lignes sont justes, et il est vrai que 0,6 est le plus '
        + 'petit des trois cosinus. C’est la conclusion qui s’inverse : le cosinus '
        + 'DIMINUE quand l’angle augmente, donc le plus petit cosinus appartient au '
        + 'plus GRAND des trois angles. La table le dit d’ailleurs sans détour — '
        + 'cos 53° ≈ 0,60. L’angle de sommet G mesure 53°.',
    },
    {
      id: 'e-13-3-9', type: 'vraifaux', palier: 3, piege: 'cosinus-croit-avec-langle',
      consigne: 'Vrai ou faux ? Si c’est faux, donne un contre-exemple.',
      affirmation: 'Quand un angle aigu est deux fois plus grand, son cosinus est deux fois plus grand.',
      attendu: false,
      contreExemple: {
        // On ne demande pas de réciter « le cosinus décroît » : on fait
        // CALCULER les deux quotients. Deux nombres qu'on a obtenus soi-même et
        // qui ne sont pas dans le rapport annoncé, c'est ce qui déloge la
        // conception — l'énoncer ne suffit pas.
        invite:
          'Voici deux triangles rectangles, tous deux d’hypoténuse 20 cm. Dans le '
          + 'premier, l’angle aigu mesure 35° et son côté adjacent 16,4 cm. Dans le '
          + 'second, l’angle aigu mesure 70° et son côté adjacent 6,8 cm. Calcule le '
          + 'cosinus de chacun de ces deux angles.',
        champs: [
          { id: 'a', etiquette: 'cosinus de l’angle de 35°' },
          { id: 'b', etiquette: 'cosinus de l’angle de 70°' },
        ],
        valide: (a, b) => Math.abs(a - 0.82) < 1e-9 && Math.abs(b - 0.34) < 1e-9,
        temoin: [0.82, 0.34],
        exemple:
          '16,4 ÷ 20 = 0,82 et 6,8 ÷ 20 = 0,34. L’angle a doublé, de 35° à 70°, et '
          + 'pourtant son cosinus n’a pas doublé : il a été divisé par plus de deux. '
          + 'S’il avait doublé, il vaudrait 1,64 — un cosinus plus grand que 1, ce qui '
          + 'n’existe pas. Le cosinus descend quand l’angle monte.',
      },
    },
    {
      // Trois longueurs, et l'angle demandé est celui dont le côté adjacent est
      // le PLUS LONG des deux côtés de l'angle droit. « Je divise le petit par
      // le grand » donne alors 0,6, une réponse fausse qui figure pourtant dans
      // la table : la seule issue est de nommer le côté adjacent.
      id: 'e-13-3-10', type: 'trous', palier: 3, piege: 'adjacent-mal-identifie',
      consigne: 'Calcule le cosinus de l’angle de sommet R, puis donne la mesure de cet angle.',
      enonce:
        '\\text{RST est un triangle rectangle en T. RT = 12 cm, ST = 9 cm et RS = 15 cm. '
        + 'On donne : cos 37° ≈ 0,80 ; cos 53° ≈ 0,60 ; cos 65° ≈ 0,42.}',
      champs: [
        { id: 'a', etiquette: 'le cosinus de l’angle de sommet R', attendu: 0.8 },
        { id: 'b', etiquette: 'la mesure de l’angle de sommet R, en degrés', attendu: 37 },
      ],
      fausses: [
        // 9 ÷ 15 : [ST] ne touche pas R, c'est le côté opposé. La règle du
        // piège — « l'adjacent est celui qui touche l'angle sans être
        // l'hypoténuse » — écarte [ST] sans hésitation possible.
        { valeur: 0.6, piege: 'adjacent-mal-identifie' },
        { valeur: 53, piege: 'adjacent-mal-identifie' },
      ],
    },
  ],

  problemes: [
    {
      id: 'p-13-3-1',
      enonce:
        'Une échelle rectiligne de 4 m est posée contre un mur vertical, sur un sol '
        + 'horizontal. Le triangle formé par le mur, le sol et l’échelle est rectangle '
        + 'au pied du mur. Le pied de l’échelle est à 2 m du mur. On donne '
        + 'cos 45° ≈ 0,71 ; cos 60° = 0,50 ; cos 75° ≈ 0,26.',
      questions: [
        { texte: 'Quel est le cosinus de l’angle que l’échelle fait avec le sol ?', attendu: 0.5 },
        { texte: 'Quelle est la mesure de cet angle ?', attendu: 60, unite: '°' },
        { texte: 'Quelle est alors la mesure de l’angle que l’échelle fait avec le mur ?', attendu: 30, unite: '°' },
      ],
    },
    {
      id: 'p-13-3-2',
      enonce:
        'Un escalier droit de 20 m relie le sol horizontal au sommet d’une plateforme '
        + 'd’observation portée par un poteau vertical. Le triangle formé par '
        + 'l’escalier, le sol et le poteau est rectangle au pied du poteau. Au sol, le '
        + 'pied de l’escalier est à 15,4 m du pied du poteau. On donne cos 30° ≈ 0,87 ; '
        + 'cos 40° ≈ 0,77 ; cos 50° ≈ 0,64.',
      questions: [
        { texte: 'Quel est le cosinus de l’angle que l’escalier fait avec le sol ?', attendu: 0.77 },
        { texte: 'Quelle est la mesure de cet angle ?', attendu: 40, unite: '°' },
      ],
    },
    {
      id: 'p-13-3-3',
      enonce:
        'Un câble rectiligne de 25 m relie le sommet d’un pylône vertical à un piquet '
        + 'planté dans le sol horizontal. Le triangle formé par le câble, le sol et le '
        + 'pylône est rectangle au pied du pylône. Le piquet est à 6,5 m du pied du '
        + 'pylône. On donne cos 65° ≈ 0,42 ; cos 75° ≈ 0,26 ; cos 80° ≈ 0,17.',
      questions: [
        { texte: 'Quel est le cosinus de l’angle que le câble fait avec le sol ?', attendu: 0.26 },
        { texte: 'Quelle est la mesure de cet angle ?', attendu: 75, unite: '°' },
        { texte: 'Quelle est la mesure de l’angle que le câble fait avec le pylône ?', attendu: 15, unite: '°' },
      ],
    },
    {
      // Deux situations à comparer : c'est là que le sens de variation cesse
      // d'être une phrase à retenir. La seconde échelle est plus longue et son
      // cosinus plus petit — et c'est elle qui est la plus redressée.
      id: 'p-13-3-4',
      enonce:
        'Deux échelles rectilignes sont posées contre le même mur vertical, sur un sol '
        + 'horizontal ; dans les deux cas, le triangle formé par le mur, le sol et '
        + 'l’échelle est rectangle au pied du mur. La première mesure 4 m et son pied '
        + 'est à 2 m du mur. La seconde mesure 5 m et son pied est à 1,3 m du mur. On '
        + 'donne cos 60° = 0,50 ; cos 70° ≈ 0,34 ; cos 75° ≈ 0,26.',
      questions: [
        { texte: 'Quelle est la mesure de l’angle que la première échelle fait avec le sol ?', attendu: 60, unite: '°' },
        { texte: 'Quelle est la mesure de l’angle que la seconde échelle fait avec le sol ?', attendu: 75, unite: '°' },
        { texte: 'De combien de degrés l’angle de la seconde échelle avec le sol dépasse-t-il celui de la première ?', attendu: 15, unite: '°' },
      ],
    },
    {
      // Le réinvestissement de Pythagore : la troisième question se résout sans
      // cosinus, et rappelle que les deux outils vivent dans le même triangle.
      id: 'p-13-3-5',
      enonce:
        'ABCD est un rectangle. AB = 12 cm, et sa diagonale [AC] mesure 15 cm. Le '
        + 'triangle ABC est donc rectangle en B. On donne cos 37° ≈ 0,80 ; '
        + 'cos 45° ≈ 0,71 ; cos 53° ≈ 0,60.',
      questions: [
        { texte: 'Quel est le cosinus de l’angle de sommet A dans le triangle ABC ?', attendu: 0.8 },
        { texte: 'Quelle est la mesure de cet angle ?', attendu: 37, unite: '°' },
        { texte: 'Quelle est la longueur BC ?', attendu: 9, unite: 'cm' },
      ],
    },
  ],

  test: [
    {
      id: 't-13-3-1', type: 'calcul',
      consigne: 'Donne la mesure de cet angle, en degrés.',
      enonce:
        '\\text{Dans un triangle rectangle, le cosinus d’un angle aigu vaut 0,71. '
        + 'On donne : cos 45° ≈ 0,71 ; cos 60° = 0,50 ; cos 75° ≈ 0,26.}',
      attendu: 45,
      fausses: [{ valeur: 0.71, piege: 'arccos-et-cosinus-confondus' }],
      revoir: 'remarque',
    },
    {
      id: 't-13-3-2', type: 'trous',
      consigne: 'Calcule le cosinus de l’angle de sommet G, puis donne la mesure de cet angle.',
      enonce:
        '\\text{GHI est un triangle rectangle en H. GH = 16 cm et GI = 20 cm. '
        + 'On donne : cos 25° ≈ 0,91 ; cos 37° ≈ 0,80 ; cos 53° ≈ 0,60.}',
      champs: [
        { id: 'a', etiquette: 'le cosinus de l’angle de sommet G', attendu: 0.8 },
        { id: 'b', etiquette: 'la mesure de l’angle de sommet G, en degrés', attendu: 37 },
      ],
      fausses: [{ valeur: 1.25, piege: 'cosinus-plus-grand-que-un' }],
      revoir: 'propriete',
    },
    {
      id: 't-13-3-3', type: 'calcul',
      consigne: 'Donne la mesure de l’angle de sommet D, en degrés.',
      enonce:
        '\\text{DEF est un triangle rectangle en F. DF = 6,8 cm et DE = 20 cm. '
        + 'On donne : cos 45° ≈ 0,71 ; cos 60° = 0,50 ; cos 70° ≈ 0,34.}',
      attendu: 70,
      fausses: [{ valeur: 0.34, piege: 'arccos-et-cosinus-confondus' }],
      revoir: 'exemple',
    },
    {
      id: 't-13-3-4', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Dans un triangle rectangle, un élève calcule le cosinus d’un angle aigu et trouve 1,4.}',
      attendu: false,
      explication:
        'Un cosinus d’angle aigu est compris entre 0 et 1, parce que le côté adjacent '
        + 'est plus court que l’hypoténuse. 1,4 signale que les deux longueurs ont été '
        + 'échangées dans le quotient.',
      piege: 'cosinus-plus-grand-que-un', revoir: 'propriete',
    },
    {
      id: 't-13-3-5', type: 'comparer',
      consigne: 'Compare ces deux nombres, sans calculer aucun quotient et sans table de valeurs.',
      enonce: '\\text{cos 25° … cos 55°}',
      attendu: '>',
      fausses: [{ valeur: '<', piege: 'cosinus-croit-avec-langle' }],
      revoir: 'propriete',
    },
    {
      id: 't-13-3-6', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Dans deux triangles rectangles, on a calculé le cosinus d’un angle aigu : '
        + '0,34 dans le premier, 0,77 dans le second. Un élève en conclut que l’angle du '
        + 'premier triangle est le plus grand des deux.}',
      attendu: true,
      explication:
        'C’est exact : le cosinus diminue quand l’angle augmente, donc le plus petit '
        + 'des deux cosinus est celui du plus grand des deux angles. Il s’agit ici de '
        + '70° et de 40°.',
      fausses: [{ valeur: false, piege: 'cosinus-croit-avec-langle' }],
      revoir: 'propriete',
    },
    {
      id: 't-13-3-7', type: 'trous',
      consigne: 'Calcule le cosinus de l’angle de sommet T, puis donne la mesure de cet angle.',
      enonce:
        '\\text{RST est un triangle rectangle en S. RS = 12 cm, ST = 9 cm et RT = 15 cm. '
        + 'On donne : cos 37° ≈ 0,80 ; cos 53° ≈ 0,60 ; cos 65° ≈ 0,42.}',
      champs: [
        { id: 'a', etiquette: 'le cosinus de l’angle de sommet T', attendu: 0.6 },
        { id: 'b', etiquette: 'la mesure de l’angle de sommet T, en degrés', attendu: 53 },
      ],
      fausses: [
        { valeur: 0.8, piege: 'adjacent-mal-identifie' },
        { valeur: 37, piege: 'adjacent-mal-identifie' },
      ],
      revoir: 'definition',
    },
    {
      id: 't-13-3-8', type: 'corriger',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l’erreur apparaît.',
      enonce:
        '\\text{MNP est un triangle rectangle en N. MN = 8,4 cm et MP = 20 cm. '
        + 'On donne : cos 40° ≈ 0,77 ; cos 50° ≈ 0,64 ; cos 65° ≈ 0,42. '
        + 'Quelle est la mesure de l’angle de sommet M ?}',
      lignes: [
        { texte: 'L’angle droit est en N, donc l’hypoténuse est [MP] = 20 cm et le côté adjacent à l’angle de sommet M est [MN] = 8,4 cm.', fausse: false },
        { texte: 'cos(angle de sommet M) = 20 ÷ 8,4, soit environ 2,38.', fausse: true },
        { texte: 'Je cherche 2,38 dans la table : aucune des trois valeurs n’en approche, je ne trouve donc pas l’angle.', fausse: false },
      ],
      explication:
        'La première ligne est juste, et la troisième ne fait que constater l’impasse '
        + 'où la deuxième l’a menée. Tout se joue dans la deuxième : le cosinus est le '
        + 'côté ADJACENT divisé par l’hypoténuse, donc 8,4 ÷ 20 = 0,42, et non '
        + 'l’inverse. Un cosinus de 2,38 aurait dû arrêter le calcul sur-le-champ : il '
        + 'est plus grand que 1, ce qui est impossible. La table donne cos 65° ≈ 0,42 : '
        + 'l’angle de sommet M mesure 65°.',
      piege: 'cosinus-plus-grand-que-un', revoir: 'propriete',
    },
    {
      // Ni 15,4 ni 20 ensemble, et pas 40° : p-13-3-2 pose déjà exactement
      // 15,4 ÷ 20 = 0,77 → 40°. Une auto-évaluation qui redemande le calcul
      // d'un problème du même savoir-faire mesure la mémoire, pas le geste.
      id: 't-13-3-9', type: 'calcul',
      consigne: 'Donne la mesure de l’angle de sommet S, en degrés.',
      enonce:
        '\\text{STU est un triangle rectangle en U. SU = 18,2 cm et ST = 20 cm. '
        + 'On donne : cos 25° ≈ 0,91 ; cos 40° ≈ 0,77 ; cos 55° ≈ 0,57.}',
      attendu: 25,
      fausses: [{ valeur: 0.91, piege: 'arccos-et-cosinus-confondus' }],
      revoir: 'exemple',
    },
    {
      id: 't-13-3-10', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Un élève sait que cos 40° ≈ 0,77. Il en déduit que cos 80° ≈ 1,54.}',
      attendu: false,
      explication:
        'Deux choses le contredisent, et une seule suffirait. D’abord un cosinus '
        + 'd’angle aigu ne dépasse jamais 1. Ensuite le cosinus ne double pas quand '
        + 'l’angle double : il diminue quand l’angle augmente. cos 80° vaut environ 0,17.',
      piege: 'cosinus-croit-avec-langle', revoir: 'propriete',
    },
  ],
};
