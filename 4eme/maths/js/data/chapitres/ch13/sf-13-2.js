// Chapitre 13, savoir-faire 2 — Calculer une longueur à l'aide du cosinus.
//
// ── Le vrai piège n'est pas la formule, c'est l'opération ──────────────────
//
// L'élève retient très vite « cos = adjacent ÷ hypoténuse ». Ce qu'il ne
// retient pas, c'est que cette égalité se lit dans les deux sens : quand
// l'inconnue est en HAUT du quotient on multiplie, quand elle est en BAS on
// divise. Un lot d'exercices qui ne demanderait que le côté adjacent
// installerait le geste « je multiplie par le cosinus » comme une règle — et
// la première question sur l'hypoténuse, en contrôle, tomberait à côté.
//
// D'où la contrainte structurante de ce fichier : les deux cas alternent dès le
// palier 1, et les paliers 1 et 2 contiennent chacun les deux. Sur les dix
// exercices d'entraînement, trois font chercher le côté adjacent (e-13-2-2,
// e-13-2-5, e-13-2-7), quatre l'hypoténuse (e-13-2-3, e-13-2-4, e-13-2-6,
// e-13-2-10) et trois ne font calculer aucune longueur : e-13-2-1 nomme les
// côtés, e-13-2-8 ne compare que deux mesures, e-13-2-9 réfute l'emploi même du
// cosinus. Le palier 3 ne redemande pas de choisir l'opération à froid — il la
// fait choisir en relisant un résultat, et e-13-2-10 fait poser les deux calculs
// côte à côte.
//
// ── Le contrôle qui attrape les deux erreurs d'un coup ────────────────────
//
// L'hypoténuse est le plus long des trois côtés. Multiplier quand il fallait
// diviser donne une hypoténuse plus courte qu'un de ses côtés ; diviser quand
// il fallait multiplier donne un côté plus long que l'hypoténuse. Les deux
// erreurs se voient donc SANS refaire le calcul, et sans calculatrice — c'est
// le geste que la méthode et le cours répètent.
//
// ── Pourquoi ces items neutres ────────────────────────────────────────────
//
// Trois, et chacun casse une stratégie de surface différente.
//
// e-13-2-1 ne demande aucun calcul : seulement nommer l'hypoténuse et le côté
// adjacent parmi trois longueurs données. Le choix multiplier/diviser ne s'y
// pose pas, donc l'élève qui porte cette confusion y répond juste — et celui
// qui confond adjacent et opposé s'y fait prendre, lui.
//
// e-13-2-6 nomme explicitement, dans l'énoncé, quel côté est l'hypoténuse et
// quel côté est l'adjacent. La confusion « adjacent-mal-identifie » ne peut
// pas y jouer ; seule l'opération reste à choisir.
//
// e-13-2-8 ne porte que sur l'ordre des longueurs : deux mesures annoncées,
// aucun cosinus à manipuler. Sans lui, « il y a un cosinus dans l'énoncé donc
// je multiplie les deux nombres » traverserait le savoir-faire entier.
//
// ── Les valeurs de cosinus sont données, et les résultats tombent juste ────
//
// Il n'y a pas de calculatrice dans l'application : chaque énoncé porte donc
// la valeur du cosinus dont il a besoin. Les nombres ont été choisis pour que
// le résultat exact tienne au dixième — et, quand c'est possible, pour que
// l'erreur prévisible tombe juste elle aussi, sinon elle ne serait jamais
// tapée telle quelle et le diagnostic ne se déclencherait pas.
//
// Plusieurs triangles sont des agrandissements du 3-4-5 (9-12-15, 12-16-20,
// 21-28-35, 24-32-40) : cos 53° ≈ 0,60 et cos 37° ≈ 0,80 y sont exacts au
// centième, et l'élève qui vérifie avec Pythagore retombe sur ses pieds. Ce
// n'est pas un hasard mis là pour faire joli : c'est un second contrôle,
// disponible sans matériel.
//
// ── Aucune figure n'est affichée ──────────────────────────────────────────
//
// Le sommet de l'angle droit est nommé dans chaque énoncé de triangle
// rectangle, les longueurs sont écrites en toutes lettres, et les deux
// exercices sur « cosinus-sans-angle-droit » disent explicitement qu'aucun
// angle n'est droit — c'est justement ce que l'élève doit voir.
//
// ── Ce que ce savoir-faire ne couvre pas ──────────────────────────────────
//
// Retrouver la mesure d'un angle à partir d'un rapport de longueurs : c'est
// le trajet inverse, il demande une table de valeurs dans l'énoncé et il fait
// l'objet d'un autre savoir-faire. Ici, l'angle est toujours connu et c'est
// une longueur qu'on cherche.

export default {
  id: 'sf-13-2',
  titre: 'Calculer une longueur à l\'aide du cosinus',
  attendus: [
    'Il utilise le cosinus d\'un angle aigu pour calculer une longueur dans un triangle rectangle.',
    'Il identifie l\'hypoténuse et le côté adjacent à un angle aigu dans un triangle rectangle.',
  ],

  // On ne donne pas les deux formules : on montre un rapport qui ne bouge pas,
  // et on fait parcourir la relation dans les deux sens. Les deux opérations
  // sortent alors du même fait, au lieu d'être deux règles à retenir.
  decouvrir: {
    titre: 'Un seul rapport, deux trajets',
    texte:
      'Dans un triangle rectangle, le cosinus d\'un angle aigu est le quotient '
      + 'de la longueur du côté adjacent à cet angle par celle de l\'hypoténuse. '
      + 'Voici trois triangles rectangles qui ont chacun un angle de 60°, avec '
      + 'leur hypoténuse et le côté adjacent à cet angle de 60°.',
    lignes: [
      { calcul: 'hypoténuse 8 cm, côté adjacent 4 cm', resultat: '4 ÷ 8 = 0,5' },
      { calcul: 'hypoténuse 14 cm, côté adjacent 7 cm', resultat: '7 ÷ 14 = 0,5' },
      { calcul: 'hypoténuse 30 cm, côté adjacent 15 cm', resultat: '15 ÷ 30 = 0,5' },
    ],
    question:
      'Le quotient vaut 0,5 à chaque fois : c\'est le cosinus de 60°. Deux autres '
      + 'triangles rectangles ont eux aussi un angle de 60°. Complète les deux cases.',
    champs: [
      { id: 'a', etiquette: 'son hypoténuse mesure 24 cm, donc son côté adjacent mesure, en cm', attendu: 12 },
      { id: 'b', etiquette: 'son côté adjacent mesure 11 cm, donc son hypoténuse mesure, en cm', attendu: 22 },
    ],
    conclusion:
      'Pour la première case, tu es parti de l\'hypoténuse et tu as **multiplié** '
      + 'par 0,5 : 24 × 0,5 = 12. Pour la seconde, tu es parti du côté adjacent et '
      + 'tu as **divisé** par 0,5 : 11 ÷ 0,5 = 22.\n'
      + 'C\'est pourtant la même relation dans les deux cas. Ce qui change, c\'est '
      + 'le côté qu\'on cherche : l\'adjacent est en haut du quotient, l\'hypoténuse '
      + 'est en bas. **Un seul rapport, deux opérations** — et c\'est la question '
      + '« quel côté est-ce que je cherche ? » qui décide, jamais l\'habitude.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Hypoténuse et côté adjacent',
      texte:
        'Dans un triangle **rectangle**, l\'**hypoténuse** est le côté opposé à '
        + 'l\'angle droit : c\'est le seul des trois côtés qui ne touche pas le '
        + 'sommet de l\'angle droit, et c\'est toujours le plus long.\n'
        + 'Le **côté adjacent** à un angle aigu est celui qui touche cet angle '
        + 'sans être l\'hypoténuse. Deux côtés partent du sommet de l\'angle : '
        + 'l\'hypoténuse, et l\'adjacent.',
    },
    {
      type: 'propriete',
      titre: 'Le cosinus, et les deux calculs qu\'il permet',
      texte:
        'Dans un triangle rectangle, pour un angle aigu :\n'
        + '**cos de l\'angle = côté adjacent ÷ hypoténuse**.\n'
        + 'Cette égalité se parcourt dans les deux sens.\n'
        + 'Pour trouver le **côté adjacent**, on **multiplie** : '
        + 'adjacent = hypoténuse × cos.\n'
        + 'Pour trouver l\'**hypoténuse**, on **divise** : '
        + 'hypoténuse = adjacent ÷ cos.',
    },
    {
      type: 'remarque',
      titre: 'Le contrôle qui attrape les deux erreurs',
      texte:
        'L\'hypoténuse est le plus long des trois côtés. Compare toujours ton '
        + 'résultat aux longueurs de l\'énoncé.\n'
        + 'Si tu trouves une hypoténuse plus **courte** qu\'un côté, tu as '
        + 'multiplié là où il fallait diviser. Si tu trouves un côté plus '
        + '**long** que l\'hypoténuse, tu as divisé là où il fallait multiplier.\n'
        + 'Ce coup d\'œil ne coûte rien et il suffit : le cosinus d\'un angle aigu '
        + 'est compris entre 0 et 1, donc multiplier par lui raccourcit et diviser '
        + 'par lui allonge.',
    },
    {
      type: 'remarque',
      titre: 'L\'adjacent change quand l\'angle change',
      texte:
        'Le mot « adjacent » ne désigne pas un côté une fois pour toutes : il '
        + 'dépend de l\'angle dont on parle.\n'
        + 'Dans un triangle ABC rectangle en B, l\'hypoténuse est AC. Le côté '
        + 'adjacent à l\'angle en A est **AB** ; le côté adjacent à l\'angle en C '
        + 'est **BC**. Seule l\'hypoténuse ne bouge pas.\n'
        + 'Le réflexe : nomme les deux côtés qui partent du sommet de l\'angle, '
        + 'écarte l\'hypoténuse, il reste l\'adjacent.',
    },
    {
      type: 'remarque',
      titre: 'Sans angle droit, rien de tout cela n\'existe',
      texte:
        'La relation cos = adjacent ÷ hypoténuse n\'a de sens que dans un '
        + 'triangle **rectangle**. Dans un triangle quelconque, il n\'y a ni '
        + 'hypoténuse ni côté adjacent : les deux mots ne désignent plus rien.\n'
        + 'Avant d\'écrire le moindre cosinus, cherche dans l\'énoncé la mention '
        + 'de l\'angle droit. Avoir un angle et deux longueurs ne suffit pas.',
    },
    {
      type: 'exemple',
      titre: 'Chercher le côté adjacent : on multiplie',
      texte:
        'ABC est un triangle rectangle en B, l\'angle BAC mesure 30° et '
        + 'AC = 10 cm. On donne cos 30° ≈ 0,87. L\'hypoténuse est AC, le côté '
        + 'adjacent à l\'angle en A est AB, et c\'est lui qu\'on cherche : '
        + 'AB = 10 × 0,87 = 8,7 cm. Contrôle : 8,7 cm est bien plus court que '
        + 'les 10 cm de l\'hypoténuse.\n'
        + 'DEF est un triangle rectangle en E, l\'angle EDF mesure 50° et '
        + 'DF = 50 cm. On donne cos 50° ≈ 0,64. L\'hypoténuse est DF, l\'adjacent '
        + 'à l\'angle en D est DE : DE = 50 × 0,64 = 32 cm. Là encore, 32 cm est '
        + 'plus court que 50 cm.',
    },
    {
      type: 'exemple',
      titre: 'Chercher l\'hypoténuse : on divise',
      texte:
        'GHK est un triangle rectangle en H, l\'angle HGK mesure 45° et '
        + 'GH = 7,1 cm. On donne cos 45° ≈ 0,71. L\'hypoténuse est GK, l\'adjacent '
        + 'à l\'angle en G est GH, qui est connu : on cherche donc l\'hypoténuse et '
        + 'on divise. GK = 7,1 ÷ 0,71 = 10 cm. Contrôle : 10 cm est bien plus long '
        + 'que 7,1 cm.\n'
        + 'JKL est un triangle rectangle en K, l\'angle KJL mesure 30° et '
        + 'JK = 26,1 cm. On donne cos 30° ≈ 0,87. L\'hypoténuse est JL : '
        + 'JL = 26,1 ÷ 0,87 = 30 cm. Diviser par un nombre plus petit que 1 a '
        + 'bien allongé la longueur.',
    },
  ],

  methode: {
    titre: 'Décider entre multiplier et diviser',
    enonce:
      'ABC est un triangle rectangle en B. L\'angle BAC mesure 65° et '
      + 'AB = 8,4 cm. On donne cos 65° ≈ 0,42. Quelle est la longueur AC ?',
    etapes: [
      {
        texte: 'Je repère l\'angle droit : il est en B. L\'hypoténuse est donc le côté qui ne touche pas B, c\'est-à-dire AC.',
        note: 'L\'hypoténuse se lit sur l\'angle droit, jamais sur l\'ordre de l\'énoncé.',
      },
      {
        texte: 'L\'angle dont on parle est en A. Les deux côtés qui partent de A sont AB et AC ; AC est l\'hypoténuse, donc le côté adjacent à l\'angle en A est AB.',
        note: 'BC ne touche pas A : ce n\'est pas l\'adjacent à cet angle-là.',
      },
      {
        texte: 'J\'écris la relation : cos 65° = AB ÷ AC, c\'est-à-dire 0,42 = 8,4 ÷ AC.',
        note: 'Adjacent en haut, hypoténuse en bas : toujours dans cet ordre.',
      },
      {
        texte: 'L\'inconnue AC est en bas du quotient : je divise. AC = 8,4 ÷ 0,42 = 20 cm.',
        note: 'Si l\'inconnue avait été en haut, j\'aurais multiplié.',
      },
    ],
    controle:
      'Le contrôle : l\'hypoténuse est le plus long des trois côtés. Ici AC vaut '
      + '20 cm et AB vaut 8,4 cm — l\'hypoténuse est bien la plus longue, l\'ordre '
      + 'est respecté. Si j\'avais multiplié, j\'aurais annoncé une hypoténuse de '
      + '8,4 × 0,42 = 3,528 cm, plus COURTE que le côté AB : impossible, et '
      + 'visible sans refaire le calcul. Ce seul coup d\'œil attrape les deux '
      + 'erreurs, celle qui raccourcit l\'hypoténuse et celle qui allonge le côté.',
  },

  entrainement: [
    // ── Palier 1 : nommer les côtés, puis les deux cas séparément ───────────
    {
      // NEUTRE. Aucune opération n'est demandée : la confusion entre multiplier
      // et diviser ne peut pas produire d'erreur ici. En revanche, celui qui
      // prend l'opposé pour l'adjacent y laisse sa trace — d'où la « fausse »
      // rattachée à l'AUTRE piège.
      id: 'e-13-2-1', type: 'trous', palier: 1, neutre: true, piege: 'multiplier-au-lieu-de-diviser',
      // Le triangle est un 12-16-20 et non le 15-20-25 : celui-ci est déjà posé,
      // avec exactement les deux mêmes questions, par p-13-1-5 au savoir-faire
      // précédent. Un rappel doit refaire le geste, pas rendre la même copie.
      consigne:
        'ABC est un triangle rectangle en C. On donne AB = 20 cm, AC = 16 cm et '
        + 'BC = 12 cm. Complète les deux longueurs, en cm.',
      enonce:
        '\\text{longueur de l\'hypoténuse : } \\square \\qquad '
        + '\\text{longueur du côté adjacent à l\'angle en A : } \\square',
      champs: [
        { id: 'a', etiquette: 'longueur de l\'hypoténuse, en cm', attendu: 20 },
        { id: 'b', etiquette: 'longueur du côté adjacent à l\'angle en A, en cm', attendu: 16 },
      ],
      fausses: [
        // BC ne touche pas le sommet A : c'est le côté opposé à cet angle, pas
        // son adjacent.
        { valeur: 12, piege: 'adjacent-mal-identifie' },
      ],
    },
    {
      id: 'e-13-2-2', type: 'calcul', palier: 1, piege: 'multiplier-au-lieu-de-diviser',
      consigne:
        'ABC est un triangle rectangle en B : son hypoténuse est donc AC, et le '
        + 'côté adjacent à l\'angle en A est AB. L\'angle BAC mesure 37° et '
        + 'AC = 20 cm. Calcule AB, en cm.',
      enonce: '\\text{ABC rectangle en B, angle BAC = 37°, AC = 20 cm, cos 37° ≈ 0,80}',
      attendu: 16,
      fausses: [
        // 20 ÷ 0,80 : on a divisé alors qu'on cherchait l'adjacent. Le résultat,
        // 25 cm, dépasse l'hypoténuse de 20 cm — impossible.
        { valeur: 25, piege: 'multiplier-au-lieu-de-diviser' },
      ],
    },
    {
      id: 'e-13-2-3', type: 'calcul', palier: 1, piege: 'multiplier-au-lieu-de-diviser',
      consigne:
        'DEF est un triangle rectangle en E. L\'angle EDF mesure 65° et '
        + 'DE = 21 cm. Calcule DF, en cm.',
      enonce: '\\text{DEF rectangle en E, angle EDF = 65°, DE = 21 cm, cos 65° ≈ 0,42}',
      attendu: 50,
      fausses: [
        // 21 × 0,42 : on a multiplié alors que l'inconnue était l'hypoténuse.
        // 8,82 cm serait une hypoténuse plus courte que le côté DE = 21 cm.
        { valeur: 8.82, piege: 'multiplier-au-lieu-de-diviser' },
      ],
    },

    // ── Palier 2 : les deux cas mélangés, et l'adjacent à retrouver ─────────
    {
      // Les deux côtés de l'angle droit sont donnés : c'est là que le choix du
      // côté adjacent devient une vraie décision, et que l'erreur se chiffre.
      // Vérification possible sans cosinus : 9² + 12² = 225 = 15².
      id: 'e-13-2-4', type: 'calcul', palier: 2, piege: 'adjacent-mal-identifie',
      consigne:
        'ABC est un triangle rectangle en B. L\'angle BAC mesure 53°, AB = 9 cm '
        + 'et BC = 12 cm. Calcule AC, en cm.',
      enonce: '\\text{ABC rectangle en B, angle BAC = 53°, AB = 9 cm, BC = 12 cm, cos 53° ≈ 0,60}',
      attendu: 15,
      fausses: [
        // 12 ÷ 0,60 : on a pris BC pour le côté adjacent à l'angle en A. Or BC
        // ne touche pas A. Le contrôle des longueurs ne voit rien ici (20 est
        // bien la plus grande) : seule l'identification des côtés le corrige.
        { valeur: 20, piege: 'adjacent-mal-identifie' },
        // 9 × 0,60 : bon côté, mauvaise opération. 5,4 cm serait une hypoténuse
        // plus courte que AB = 9 cm.
        { valeur: 5.4, piege: 'multiplier-au-lieu-de-diviser' },
      ],
    },
    {
      id: 'e-13-2-5', type: 'calcul', palier: 2, piege: 'multiplier-au-lieu-de-diviser',
      consigne:
        'MNP est un triangle rectangle en N. L\'angle NMP mesure 60° et '
        + 'MP = 18 cm. Calcule MN, en cm.',
      enonce: '\\text{MNP rectangle en N, angle NMP = 60°, MP = 18 cm, cos 60° = 0,5}',
      attendu: 9,
      fausses: [
        // 18 ÷ 0,5 : diviser par 0,5 double, et 36 cm dépasse largement
        // l'hypoténuse MP = 18 cm.
        { valeur: 36, piege: 'multiplier-au-lieu-de-diviser' },
      ],
    },
    {
      // NEUTRE. L'énoncé nomme lui-même l'hypoténuse et le côté adjacent :
      // l'élève qui confond adjacent et opposé ne peut pas se tromper ici. Il
      // reste exactement une décision à prendre, celle de l'opération — et la
      // « fausse » pointe donc vers l'AUTRE piège.
      id: 'e-13-2-6', type: 'calcul', palier: 2, neutre: true, piege: 'adjacent-mal-identifie',
      consigne:
        'KLM est un triangle rectangle en L : son hypoténuse est KM, et le côté '
        + 'adjacent à l\'angle en K est KL. L\'angle en K mesure 70° et '
        + 'KL = 17 cm. Calcule KM, en cm.',
      enonce: '\\text{KLM rectangle en L, angle en K = 70°, KL = 17 cm, cos 70° ≈ 0,34}',
      attendu: 50,
      fausses: [
        // 17 × 0,34 : l'inconnue est l'hypoténuse, elle est au dénominateur du
        // quotient, il fallait diviser. 5,78 cm serait plus court que KL.
        { valeur: 5.78, piege: 'multiplier-au-lieu-de-diviser' },
      ],
    },
    {
      id: 'e-13-2-7', type: 'plausible', palier: 2, piege: 'multiplier-au-lieu-de-diviser',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{ABC rectangle en B, angle BAC = 45°, AC = 20 cm, cos 45° ≈ 0,71 : }'
        + '\\text{ on annonce AB = 14,2 cm.}',
      attendu: true,
      explication:
        'L\'angle droit est en B, donc l\'hypoténuse est AC — le côté qui ne '
        + 'touche pas B. Le côté adjacent à l\'angle en A est AB, et c\'est lui '
        + 'qu\'on cherche : on multiplie. 20 × 0,71 = 14,2, c\'est bien la valeur '
        + 'annoncée. Et 14,2 cm est plus court que les 20 cm de l\'hypoténuse : '
        + 'tout tient.',
    },

    // ── Palier 3 : contrôler, relire un raisonnement, réfuter une règle ─────
    {
      // NEUTRE. Aucun cosinus à manipuler : la question ne porte que sur l'ordre
      // des longueurs, donc la confusion multiplier/diviser ne peut pas y
      // produire d'erreur. C'est le geste de contrôle isolé, celui qui servira
      // à relire tous les autres exercices.
      id: 'e-13-2-8', type: 'plausible', palier: 3, neutre: true, piege: 'multiplier-au-lieu-de-diviser',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{RST est un triangle rectangle en S : on annonce RT = 12 cm et RS = 15 cm.}',
      attendu: false,
      explication:
        'L\'angle droit est en S, donc l\'hypoténuse est RT : c\'est le côté qui '
        + 'ne touche pas S. Une hypoténuse est toujours le plus long des trois '
        + 'côtés, or 12 cm est plus court que les 15 cm de RS. Ces deux mesures '
        + 'ne peuvent pas être celles de ce triangle.',
    },
    {
      id: 'e-13-2-9', type: 'corriger', palier: 3, piege: 'cosinus-sans-angle-droit',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce:
        '\\text{Dans le triangle PQR, l\'angle en P mesure 60° et PQ = 10 cm. Aucun angle de ce triangle n\'est droit.} '
        + '\\quad \\text{On donne cos 60° = 0,5. Quelle est la longueur PR ?}',
      lignes: [
        { texte: 'Les deux côtés qui partent du sommet P sont PQ et PR.', fausse: false },
        { texte: 'PR est donc l\'hypoténuse du triangle, et PQ le côté adjacent à l\'angle en P.', fausse: true },
        { texte: 'J\'écris cos 60° = PQ ÷ PR, donc PR = 10 ÷ 0,5 = 20 cm.', fausse: false },
      ],
      explication:
        'La première ligne ne fait que lire l\'énoncé, et la troisième calcule '
        + 'correctement à partir de la deuxième. C\'est la deuxième qui casse '
        + 'tout : les mots « hypoténuse » et « côté adjacent » n\'existent que '
        + 'dans un triangle RECTANGLE, et l\'énoncé dit qu\'aucun angle de PQR '
        + 'n\'est droit. Le cosinus ne s\'applique pas ici. Avec un angle de 60° '
        + 'en P et PQ = 10 cm, la longueur PR n\'est d\'ailleurs pas déterminée : '
        + 'il manque une donnée, et aucun calcul ne peut la remplacer.',
    },
    {
      id: 'e-13-2-10', type: 'vraifaux', palier: 3, piege: 'multiplier-au-lieu-de-diviser',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation:
        'Dans un triangle rectangle, pour calculer une longueur avec le cosinus '
        + 'd\'un angle, on multiplie toujours la longueur connue par ce cosinus.',
      attendu: false,
      contreExemple: {
        // On ne demande pas de réciter « ça dépend » : on fait CALCULER les deux
        // nombres, et c'est leur comparaison qui réfute. Un élève qui obtient
        // 12,6 cm pour une hypoténuse dont un côté mesure 21 cm voit l'absurdité
        // sans qu'on la lui annonce.
        invite:
          'ABC est un triangle rectangle en B. L\'angle BAC mesure 53° et '
          + 'AB = 21 cm ; on donne cos 53° ≈ 0,60. Donne d\'abord le résultat de '
          + '21 × 0,60, puis la vraie longueur de l\'hypoténuse AC.',
        champs: [
          { id: 'a', etiquette: 'résultat de 21 × 0,60, en cm' },
          { id: 'b', etiquette: 'longueur de l\'hypoténuse AC, en cm' },
        ],
        valide: (a, b) => Math.abs(a - 12.6) < 1e-9 && Math.abs(b - 35) < 1e-9,
        temoin: [12.6, 35],
        exemple:
          'Multiplier donne 21 × 0,60 = 12,6 cm. Or AC est l\'hypoténuse : elle '
          + 'doit être plus LONGUE que le côté AB, qui mesure 21 cm. Le résultat '
          + 'est donc impossible, et c\'est le signe qu\'il fallait diviser : '
          + 'AC = 21 ÷ 0,60 = 35 cm. On multiplie pour trouver le côté adjacent, '
          + 'on divise pour trouver l\'hypoténuse.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-13-2-1',
      enonce:
        'Une échelle rectiligne est appuyée contre un mur vertical, sur un sol '
        + 'horizontal. Le pied de l\'échelle, le pied du mur et le point où '
        + 'l\'échelle touche le mur forment un triangle rectangle au pied du mur. '
        + 'L\'échelle fait un angle de 75° avec le sol, et l\'échelle elle-même '
        + 'est l\'hypoténuse de ce triangle. On donne cos 75° ≈ 0,26.',
      questions: [
        { texte: 'La première échelle mesure 5 m. À quelle distance du mur son pied est-il posé ?', attendu: 1.3, unite: 'm' },
        { texte: 'Une seconde échelle, posée avec le même angle de 75°, a son pied à 2,6 m du mur. Quelle est sa longueur ?', attendu: 10, unite: 'm' },
        { texte: 'De combien de mètres la seconde échelle est-elle plus longue que la première ?', attendu: 5, unite: 'm' },
      ],
    },
    {
      id: 'p-13-2-2',
      enonce:
        'Un mât vertical est maintenu par des câbles tendus depuis le sol '
        + 'horizontal. Pour chaque câble, le pied du mât, le point d\'ancrage au '
        + 'sol et le point d\'attache sur le mât forment un triangle rectangle au '
        + 'pied du mât, dont le câble est l\'hypoténuse. Chaque câble fait un '
        + 'angle de 65° avec le sol. On donne cos 65° ≈ 0,42.',
      questions: [
        { texte: 'Le premier câble mesure 20 m. À quelle distance du pied du mât est-il ancré ?', attendu: 8.4, unite: 'm' },
        { texte: 'Le second câble est ancré à 4,2 m du pied du mât. Quelle est sa longueur ?', attendu: 10, unite: 'm' },
        { texte: 'Quelle longueur de câble faut-il en tout pour ces deux haubans ?', attendu: 30, unite: 'm' },
      ],
    },
    {
      id: 'p-13-2-3',
      enonce:
        'Une voie de funiculaire monte en ligne droite. La gare de départ, la '
        + 'gare d\'arrivée et le point situé à la verticale sous la gare '
        + 'd\'arrivée forment un triangle rectangle en ce dernier point ; la voie '
        + 'en est l\'hypoténuse. La voie fait un angle de 37° avec '
        + 'l\'horizontale. On donne cos 37° ≈ 0,80.',
      questions: [
        { texte: 'La première voie mesure 500 m. Quelle distance horizontale sépare ses deux gares ?', attendu: 400, unite: 'm' },
        { texte: 'Une seconde voie, inclinée elle aussi à 37°, franchit une distance horizontale de 720 m. Quelle est sa longueur ?', attendu: 900, unite: 'm' },
        { texte: 'De combien de mètres la seconde voie est-elle plus longue que la première ?', attendu: 400, unite: 'm' },
      ],
    },
    {
      // Les deux angles aigus sont donnés : le côté adjacent change d'un angle
      // à l'autre, et il faut les deux opérations pour boucler le périmètre.
      // Contrôle possible sans cosinus : 21² + 28² = 1225 = 35².
      id: 'p-13-2-4',
      enonce:
        'ABC est un triangle rectangle en B. L\'angle BAC mesure 53° et l\'angle '
        + 'BCA mesure 37°. On sait que AB = 21 cm. On donne cos 53° ≈ 0,60 et '
        + 'cos 37° ≈ 0,80.',
      questions: [
        { texte: 'Quelle est la longueur de l\'hypoténuse AC ?', attendu: 35, unite: 'cm' },
        { texte: 'Quelle est la longueur de BC ?', attendu: 28, unite: 'cm' },
        { texte: 'Quel est le périmètre du triangle ABC ?', attendu: 84, unite: 'cm' },
      ],
    },
    {
      // Les deux côtés du rectangle se calculent avec le MÊME triangle et la
      // même hypoténuse : seul l'angle change, donc seul le côté adjacent
      // change. L'énoncé ne donne aucune autre longueur — sinon elle entrerait
      // en conflit avec l'arrondi de cos 30°.
      id: 'p-13-2-5',
      enonce:
        'ABCD est un rectangle, et AC est l\'une de ses diagonales. Le triangle '
        + 'ABC est donc rectangle en B, et AC en est l\'hypoténuse. Dans ce '
        + 'triangle, l\'angle BAC mesure 30° et l\'angle BCA mesure 60°. La '
        + 'diagonale AC mesure 20 cm. On donne cos 30° ≈ 0,87 et cos 60° = 0,5.',
      questions: [
        { texte: 'Quelle est la longueur AB ?', attendu: 17.4, unite: 'cm' },
        { texte: 'Quelle est la longueur BC ?', attendu: 10, unite: 'cm' },
        { texte: 'Quel est le périmètre du rectangle ABCD ?', attendu: 54.8, unite: 'cm' },
      ],
    },
  ],

  test: [
    {
      id: 't-13-2-1', type: 'calcul',
      consigne:
        'ABC est un triangle rectangle en B. L\'angle BAC mesure 37° et '
        + 'AC = 10 cm. Calcule AB, en cm.',
      enonce: '\\text{ABC rectangle en B, angle BAC = 37°, AC = 10 cm, cos 37° ≈ 0,80}',
      attendu: 8,
      fausses: [{ valeur: 12.5, piege: 'multiplier-au-lieu-de-diviser' }],
      revoir: 'propriete',
    },
    {
      id: 't-13-2-2', type: 'calcul',
      consigne:
        'DEF est un triangle rectangle en E. L\'angle EDF mesure 53° et '
        + 'DE = 27 cm. Calcule DF, en cm.',
      enonce: '\\text{DEF rectangle en E, angle EDF = 53°, DE = 27 cm, cos 53° ≈ 0,60}',
      attendu: 45,
      fausses: [{ valeur: 16.2, piege: 'multiplier-au-lieu-de-diviser' }],
      revoir: 'propriete',
    },
    {
      id: 't-13-2-3', type: 'trous',
      consigne:
        'ABC est un triangle rectangle en A. On donne AB = 8 cm, AC = 15 cm et '
        + 'BC = 17 cm. Complète les deux longueurs, en cm.',
      enonce:
        '\\text{longueur de l\'hypoténuse : } \\square \\qquad '
        + '\\text{longueur du côté adjacent à l\'angle en B : } \\square',
      champs: [
        { id: 'a', etiquette: 'longueur de l\'hypoténuse, en cm', attendu: 17 },
        { id: 'b', etiquette: 'longueur du côté adjacent à l\'angle en B, en cm', attendu: 8 },
      ],
      fausses: [{ valeur: 15, piege: 'adjacent-mal-identifie' }],
      revoir: 'definition',
    },
    {
      id: 't-13-2-4', type: 'calcul',
      consigne:
        'ABC est un triangle rectangle en B. L\'angle BCA mesure 37°, BC = 32 cm '
        + 'et AB = 24 cm. Calcule AC, en cm.',
      enonce: '\\text{ABC rectangle en B, angle BCA = 37°, BC = 32 cm, AB = 24 cm, cos 37° ≈ 0,80}',
      attendu: 40,
      fausses: [
        // 24 ÷ 0,80 : AB ne touche pas le sommet C, ce n'est pas l'adjacent à
        // cet angle.
        { valeur: 30, piege: 'adjacent-mal-identifie' },
        // 32 × 0,80 : bon côté, mauvaise opération — l'hypoténuse serait plus
        // courte que BC.
        { valeur: 25.6, piege: 'multiplier-au-lieu-de-diviser' },
      ],
      revoir: 'remarque',
    },
    {
      id: 't-13-2-5', type: 'calcul',
      consigne:
        'MNP est un triangle rectangle en N. L\'angle NMP mesure 60° et '
        + 'MP = 22 cm. Calcule MN, en cm.',
      enonce: '\\text{MNP rectangle en N, angle NMP = 60°, MP = 22 cm, cos 60° = 0,5}',
      attendu: 11,
      fausses: [{ valeur: 44, piege: 'multiplier-au-lieu-de-diviser' }],
      revoir: 'propriete',
    },
    {
      id: 't-13-2-6', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{ABC rectangle en B, angle BAC = 50°, AB = 16 cm, cos 50° ≈ 0,64 : }'
        + '\\text{ on annonce AC = 10,24 cm.}',
      attendu: false,
      explication:
        'AC est l\'hypoténuse, puisque c\'est le côté qui ne touche pas l\'angle '
        + 'droit en B. Elle ne peut pas mesurer 10,24 cm alors que le côté AB en '
        + 'mesure 16 : une hypoténuse est le plus long des trois côtés. La valeur '
        + 'annoncée est celle de 16 × 0,64 — on a multiplié au lieu de diviser. '
        + 'La bonne réponse est AC = 16 ÷ 0,64 = 25 cm.',
      piege: 'multiplier-au-lieu-de-diviser', revoir: 'remarque',
    },
    {
      id: 't-13-2-7', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{RST rectangle en S, angle SRT = 40°, RT = 20 cm, cos 40° ≈ 0,77 : }'
        + '\\text{ on annonce RS = 15,4 cm.}',
      attendu: true,
      // Le seul « plausible » vrai de l'auto-évaluation : répondre « non » ici,
      // c'est avoir divisé (20 ÷ 0,77 ≈ 26) là où l'inconnue était l'adjacent.
      // Sans cette ligne, la seule erreur possible sur cet item ne serait
      // rattachée à rien.
      fausses: [{ valeur: false, piege: 'multiplier-au-lieu-de-diviser' }],
      explication:
        'L\'hypoténuse est RT, le côté qui ne touche pas l\'angle droit en S. Le '
        + 'côté adjacent à l\'angle en R est RS : on le cherche, donc on '
        + 'multiplie. 20 × 0,77 = 15,4, et 15,4 cm est bien plus court que les '
        + '20 cm de l\'hypoténuse. Le résultat tient.',
      revoir: 'exemple',
    },
    {
      id: 't-13-2-8', type: 'corriger',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce:
        '\\text{Dans le triangle KLM, l\'angle en K mesure 50° et KL = 16 cm. Aucun angle de ce triangle n\'est droit.} '
        + '\\quad \\text{On donne cos 50° ≈ 0,64. Quelle est la longueur KM ?}',
      lignes: [
        { texte: 'Les deux côtés qui partent du sommet K sont KL et KM.', fausse: false },
        { texte: 'KM est donc l\'hypoténuse du triangle, et KL le côté adjacent à l\'angle en K.', fausse: true },
        { texte: 'J\'écris cos 50° = KL ÷ KM, donc KM = 16 ÷ 0,64 = 25 cm.', fausse: false },
      ],
      explication:
        'La première ligne se contente de lire l\'énoncé, et la troisième calcule '
        + 'correctement à partir de la deuxième. C\'est la deuxième qui est '
        + 'fausse : sans angle droit, le triangle KLM n\'a ni hypoténuse ni côté '
        + 'adjacent, et la relation du cosinus ne s\'écrit pas. Avoir un angle et '
        + 'une longueur ne suffit pas — c\'est l\'angle droit qui autorise le '
        + 'cosinus, et l\'énoncé dit qu\'il n\'y en a aucun.',
      piege: 'cosinus-sans-angle-droit', revoir: 'remarque',
    },
    {
      id: 't-13-2-9', type: 'calcul',
      consigne:
        'ABC est un triangle rectangle en B. L\'angle BAC mesure 75° et '
        + 'AB = 13 cm. Calcule AC, en cm.',
      enonce: '\\text{ABC rectangle en B, angle BAC = 75°, AB = 13 cm, cos 75° ≈ 0,26}',
      attendu: 50,
      fausses: [{ valeur: 3.38, piege: 'multiplier-au-lieu-de-diviser' }],
      revoir: 'propriete',
    },
    {
      id: 't-13-2-10', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{DEF est un triangle rectangle en E : on annonce DF = 9 cm et DE = 12 cm.}',
      attendu: false,
      // L'énoncé ne contient ni cosinus ni calcul : rien ne permet de dire quelle
      // opération aurait produit ce 9. Ce qui manque à l'élève qui répond « oui »,
      // c'est de savoir que l'hypoténuse est le plus long des trois côtés — donc
      // le piège de la DÉSIGNATION, pas celui de l'opération. C'est aussi la
      // raison pour laquelle e-13-2-8, de structure identique, est déclaré neutre
      // pour « multiplier-au-lieu-de-diviser » : ce piège n'y joue pas.
      explication:
        'L\'angle droit est en E, donc l\'hypoténuse est DF — le côté qui ne '
        + 'touche pas E. Elle devrait être le plus long des trois côtés, or 9 cm '
        + 'est plus court que les 12 cm de DE. Ces deux mesures ne peuvent pas '
        + 'être celles de ce triangle, et il n\'y a aucun calcul à refaire pour '
        + 's\'en apercevoir : l\'ordre des longueurs suffit.',
      piege: 'hypotenuse-mal-identifiee', revoir: 'definition',
    },
  ],
};
