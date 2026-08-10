// Chapitre 13, savoir-faire 1 — Identifier l'hypoténuse et le côté adjacent
// à un angle.
//
// Ce savoir-faire ne calcule rien. Il n'y a pas un seul cosinus dans tout le
// fichier, pas une formule, pas un quotient : on nomme des côtés, et c'est
// tout. C'est délibéré. L'erreur qui coûte le plus cher au chapitre 13 n'est
// pas une erreur de calcul, c'est une erreur de DÉSIGNATION — l'élève écrit
// une formule impeccable sur les deux mauvais côtés, et aucun contrôle sur le
// résultat ne l'attrape, puisque le résultat est un nombre entre 0 et 1 qui a
// l'air parfaitement raisonnable. On isole donc le geste de nommage, avant
// que la formule ne vienne le cacher.
//
// ── Pourquoi la réponse est une LONGUEUR ──────────────────────────────────
//
// L'application corrige des nombres, pas des noms de côtés. Demander « quelle
// est la longueur du côté adjacent à l'angle en A ? » plutôt que « comment
// s'appelle-t-il ? » n'est pas un contournement technique : pour répondre, il
// faut de toute façon avoir choisi le côté, et le nombre le prouve. Le choix
// des longueurs suit d'ailleurs : dans chaque triangle, les trois côtés ont
// trois mesures distinctes, sauf là où l'on veut justement qu'elles ne le
// soient pas (voir l'item neutre e-13-1-6).
//
// Conséquence : tous les triangles rectangles décrits ici vérifient l'égalité
// de Pythagore — le plus souvent avec un triplet d'entiers (3-4-5, 5-12-13,
// 8-15-17, 12-35-37…), parfois avec des décimaux (1,5-2-2,5 ; 4,5-6-7,5). Un
// triangle « rectangle en B » dont les longueurs ne vérifieraient pas
// l'égalité serait une figure fausse dans un chapitre où l'on demande
// justement à l'élève de vérifier l'angle droit.
//
// ── La découverte : le même triangle, deux angles ─────────────────────────
//
// On ne définit pas « adjacent » pour ensuite l'appliquer. On fait poser deux
// fois la même question sur le même triangle, en changeant seulement l'angle,
// et l'élève constate lui-même qu'il obtient deux nombres différents. C'est le
// point dur du savoir-faire, et c'est ce qui ne s'installe pas par une
// définition : « adjacent » ne désigne pas un côté du triangle, il désigne un
// côté POUR UN ANGLE DONNÉ.
//
// ── Les trois items neutres ───────────────────────────────────────────────
//
// Le piège du chapitre, adjacent-mal-identifie, se déclencherait à tous les
// coups si toutes les questions portaient sur l'adjacent : « je prends le côté
// qui me reste » finirait par passer partout. Trois items le neutralisent, par
// deux mécanismes distincts :
//   · e-13-1-3 et e-13-1-10 portent sur l'HYPOTÉNUSE, qui ne dépend pas de
//     l'angle choisi — un élève qui confond adjacent et opposé y répond juste ;
//   · e-13-1-6 est un triangle rectangle isocèle : les deux côtés de l'angle
//     droit mesurent la même chose, donc échanger l'adjacent et l'opposé donne
//     le même nombre. Son hypoténuse n'est pas donnée, et pour cause : elle
//     serait irrationnelle, et l'énoncé ne peut pas mentir.
// Les deux premiers déclarent des réponses fausses qui pointent vers un autre
// piège — hypotenuse-mal-identifiee, hérité du chapitre 3, qui est exactement
// la confusion en jeu quand on prend un côté de l'angle droit pour
// l'hypoténuse. Le troisième n'en déclare aucune, et il ne peut pas en
// déclarer : avec deux côtés égaux et l'hypoténuse absente, le seul nombre
// que l'énoncé propose est le bon.
//
// ── Ce que ce savoir-faire ne couvre PAS ──────────────────────────────────
//
// Aucun calcul de cosinus, aucune recherche d'angle, aucune longueur à
// CALCULER : les longueurs demandées sont toutes déjà écrites dans l'énoncé,
// il n'y a qu'à choisir la bonne — c'est le choix qu'on évalue, et lui seul.
// Tout le reste vient aux savoir-faire suivants. Ici on ne fait que
// préparer le terrain — mais si ce terrain n'est pas net, rien de ce qui
// suivra ne tiendra. Le sinus et la tangente, eux, ne sont pas au programme
// de 4e et n'apparaissent nulle part.

export default {
  id: 'sf-13-1',
  titre: 'Identifier l’hypoténuse et le côté adjacent à un angle',
  attendus: [
    'Il repère l’hypoténuse et le côté adjacent à un angle aigu dans un triangle rectangle.',
    'Il vérifie la présence de l’angle droit avant d’employer le vocabulaire du triangle rectangle.',
  ],

  // Deux questions, un seul triangle, et un changement d'angle entre les deux.
  // L'élève trouve deux nombres différents là où il en attendait un seul :
  // c'est le constat qui fait le savoir-faire, et il ne se remplace pas par
  // une définition récitée.
  decouvrir: {
    titre: 'Le même triangle, deux angles, deux côtés',
    texte:
      'Le triangle ABC est rectangle en B. Ses trois côtés mesurent AB = 6 cm, '
      + 'BC = 8 cm et AC = 10 cm.\n'
      + 'Un côté se nomme par ses deux extrémités : le côté AB relie le sommet A '
      + 'au sommet B, donc il touche ces deux sommets — et pas le sommet C. '
      + 'Voici, pour chacun des trois côtés, les sommets qu’il touche.',
    lignes: [
      { calcul: 'le côté AB, qui mesure 6 cm', resultat: 'il touche A et B, pas C' },
      { calcul: 'le côté BC, qui mesure 8 cm', resultat: 'il touche B et C, pas A' },
      { calcul: 'le côté AC, qui mesure 10 cm', resultat: 'il touche A et C, pas B' },
    ],
    question:
      'Le seul côté qui ne touche pas l’angle droit est AC : on l’appelle '
      + 'l’hypoténuse. Le côté adjacent à un angle aigu, c’est l’autre côté qui '
      + 'touche cet angle. Donne la longueur du côté adjacent à l’angle en A, '
      + 'puis celle du côté adjacent à l’angle en C.',
    champs: [
      { id: 'a', etiquette: 'le côté adjacent à l’angle en A mesure, en cm', attendu: 6 },
      { id: 'b', etiquette: 'le côté adjacent à l’angle en C mesure, en cm', attendu: 8 },
    ],
    conclusion:
      'Le côté adjacent à l’angle en A est **AB**, qui mesure 6 cm. Celui de '
      + 'l’angle en C est **CB**, qui mesure 8 cm. Deux angles pris dans le '
      + '**même** triangle, et deux côtés adjacents **différents**.\n'
      + 'C’est là toute la difficulté du mot : « adjacent » ne désigne pas un '
      + 'côté du triangle, il désigne un côté **pour un angle donné**. Change '
      + 'd’angle, et il change.\n'
      + 'L’hypoténuse, elle, ne bouge pas : AC reste l’hypoténuse quel que soit '
      + 'l’angle qu’on regarde, parce qu’elle est désignée par l’angle droit, et '
      + 'par lui seul.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'L’hypoténuse',
      texte:
        'Dans un triangle **rectangle**, l’**hypoténuse** est le côté **opposé à '
        + 'l’angle droit** : c’est le seul des trois côtés qui ne touche pas le '
        + 'sommet de l’angle droit.\n'
        + 'C’est aussi le plus long des trois. Un triangle rectangle n’a qu’une '
        + 'hypoténuse, et elle ne dépend pas de l’angle que l’on regarde.',
    },
    {
      type: 'definition',
      titre: 'Le côté adjacent à un angle',
      texte:
        'Le côté **adjacent** à un angle aigu d’un triangle rectangle est le côté '
        + 'qui **touche cet angle sans être l’hypoténuse**.\n'
        + 'Deux côtés seulement partent du sommet d’un angle aigu : l’hypoténuse, '
        + 'et un autre. Cet autre est le côté adjacent. Le troisième côté ne '
        + 'touche pas l’angle du tout.',
    },
    {
      // La propriété qui porte tout le savoir-faire : l'adjacent est relatif à
      // un angle. Sans elle, « adjacent » devient le nom d'un côté, et l'élève
      // garde le même pour les deux angles du triangle.
      type: 'propriete',
      titre: 'Changer d’angle change le côté adjacent',
      texte:
        'Un triangle rectangle a **deux** angles aigus, donc **deux** côtés '
        + 'adjacents différents — un pour chacun.\n'
        + 'Le côté adjacent à l’un des deux angles aigus est celui qui ne touche '
        + 'pas l’autre. L’hypoténuse, elle, est la même pour les deux.',
    },
    {
      // Un contrôle purement mécanique, qui ne demande ni figure ni mémoire :
      // c'est ce qui reste quand l'élève doute en contrôle.
      type: 'remarque',
      titre: 'Les lettres donnent la réponse',
      texte:
        'Un côté se nomme par ses deux extrémités, et cela suffit à trancher :\n'
        + 'l’**hypoténuse** porte les deux lettres qui ne sont **pas** celle de '
        + 'l’angle droit ;\n'
        + 'le côté **adjacent** à un angle porte la lettre de **cet angle** et '
        + 'celle de l’**angle droit**.\n'
        + 'Dans ABC rectangle en B : l’hypoténuse est AC, le côté adjacent à '
        + 'l’angle en A est AB, et le côté adjacent à l’angle en C est CB.',
    },
    {
      type: 'remarque',
      titre: 'Sans angle droit, ces deux mots ne désignent rien',
      texte:
        'Les mots « hypoténuse » et « côté adjacent » n’ont de sens que dans un '
        + 'triangle **rectangle**. Si l’énoncé ne dit pas où se trouve l’angle '
        + 'droit, aucun des trois côtés ne porte ces noms.\n'
        + 'Chercher l’angle droit est donc la **première** chose à faire, avant '
        + 'même de regarder les longueurs. Et si l’énoncé donne les trois côtés '
        + 'sans rien dire, la réciproque de Pythagore permet de vérifier.',
    },
    {
      type: 'exemple',
      texte:
        'Le triangle IJK est rectangle en J, avec IJ = 5 cm, JK = 12 cm et '
        + 'IK = 13 cm. L’angle droit est en J, donc l’hypoténuse est IK : elle '
        + 'mesure 13 cm, et c’est bien le plus long des trois côtés. Pour l’angle '
        + 'en I, les deux côtés qui partent de I sont IJ et IK ; IK est '
        + 'l’hypoténuse, donc le côté adjacent à l’angle en I est IJ, qui mesure '
        + '5 cm. Le côté JK, lui, ne touche pas I.',
    },
    {
      type: 'exemple',
      texte:
        'Le triangle RST est rectangle en R : l’angle droit est cette fois sur la '
        + 'première lettre. On donne RS = 16 cm, RT = 12 cm et ST = 20 cm. '
        + 'L’hypoténuse porte les deux lettres qui ne sont pas R : c’est ST, qui '
        + 'mesure 20 cm. Le côté adjacent à l’angle en S porte la lettre S et la '
        + 'lettre R : c’est SR, qui mesure 16 cm. Celui de l’angle en T porte T '
        + 'et R : c’est TR, qui mesure 12 cm. Deux angles, deux côtés adjacents '
        + 'différents.',
    },
    {
      type: 'exemple',
      texte:
        'Le triangle VWX a pour côtés VW = 4 cm, WX = 7 cm et VX = 10 cm. Rien '
        + 'n’indique d’angle droit — et il n’y en a pas : 4² + 7² = 65 alors que '
        + '10² = 100, donc l’égalité de Pythagore n’est pas vérifiée. Ce triangle '
        + 'n’a donc ni hypoténuse ni côté adjacent, et la question « quel est le '
        + 'côté adjacent à l’angle en V ? » n’a tout simplement pas de réponse.',
    },
  ],

  methode: {
    titre: 'Nommer les côtés dans l’ordre',
    enonce:
      'Le triangle PQR est rectangle en Q. On donne PQ = 20 cm, QR = 21 cm et '
      + 'PR = 29 cm. Quelle est la longueur de l’hypoténuse, et celle du côté '
      + 'adjacent à l’angle en R ?',
    etapes: [
      {
        texte: 'Je cherche l’angle droit : l’énoncé dit « rectangle en Q ». Tout part de là.',
        note: 'Si aucun angle droit n’était annoncé, il n’y aurait rien à nommer et je m’arrêterais ici.',
      },
      {
        texte: 'L’hypoténuse porte les deux lettres qui ne sont pas Q : c’est PR, qui mesure 29 cm.',
        note: 'C’est bien le plus long des trois : 29 devant 21 et 20.',
      },
      {
        texte: 'On me demande l’angle en R. Les deux côtés qui partent de R sont RQ et RP.',
        note: 'Le troisième, PQ, ne touche pas R : il est hors course.',
      },
      {
        texte: 'RP est l’hypoténuse, donc le côté adjacent à l’angle en R est RQ, qui mesure 21 cm.',
        note: '',
      },
    ],
    controle:
      'Le contrôle : relis les deux lettres. Le côté adjacent à un angle porte '
      + 'la lettre de cet angle et celle de l’angle droit — ici R et Q, donc RQ. '
      + 'C’est ce test-là qui tranche, et il tranche à tous les coups.\n'
      + 'La comparaison des longueurs vient après, et elle n’attrape qu’une '
      + 'erreur sur deux : l’adjacent est forcément plus court que l’hypoténuse, '
      + '21 cm contre 29 cm, donc un « adjacent » plus long que l’hypoténuse est '
      + 'faux à coup sûr. Mais le troisième côté, celui qui ne touche pas '
      + 'l’angle, est court lui aussi — le prendre par erreur ne se voit dans '
      + 'aucune comparaison de longueurs. Seules les deux lettres le disent.',
  },

  entrainement: [
    // ── Palier 1 : lire un triangle décrit en toutes lettres ───────────────
    {
      id: 'e-13-1-1', type: 'calcul', palier: 1, piege: 'adjacent-mal-identifie',
      consigne: 'Le triangle DEF est rectangle en E. Quelle est la longueur, en cm, du côté adjacent à l’angle en D ?',
      enonce: '\\text{DEF rectangle en E — DE = 9 cm, EF = 12 cm, DF = 15 cm}',
      attendu: 9,
      fausses: [
        // 12 cm, c'est EF : ce côté ne touche pas le sommet D.
        { valeur: 12, piege: 'adjacent-mal-identifie' },
        // 15 cm, c'est DF : elle touche bien D, mais c'est l'hypoténuse.
        { valeur: 15, piege: 'adjacent-mal-identifie' },
      ],
    },
    {
      // Les deux angles du même triangle, dans le même exercice : c'est la
      // forme la plus directe du point dur, et le seul type d'item où l'élève
      // ne peut pas répondre deux fois la même chose sans le voir.
      id: 'e-13-1-2', type: 'trous', palier: 1, piege: 'adjacent-mal-identifie',
      consigne: 'Le triangle GHI est rectangle en H. Complète les deux longueurs, en cm.',
      enonce:
        '\\text{GHI rectangle en H — GH = 7 cm, HI = 24 cm, GI = 25 cm} \\quad '
        + '\\text{adjacent à l’angle en G : } \\square \\qquad '
        + '\\text{adjacent à l’angle en I : } \\square',
      champs: [
        { id: 'a', etiquette: 'côté adjacent à l’angle en G, en cm', attendu: 7 },
        { id: 'b', etiquette: 'côté adjacent à l’angle en I, en cm', attendu: 24 },
      ],
      fausses: [
        // 25 cm dans l'un ou l'autre champ : c'est GI, l'hypoténuse.
        { valeur: 25, piege: 'adjacent-mal-identifie' },
      ],
    },
    {
      // NEUTRE. La question porte sur l'hypoténuse, qui ne dépend pas de
      // l'angle : un élève qui échange systématiquement l'adjacent et l'opposé
      // répond juste ici. Sans un item comme celui-ci, « on me parle de
      // triangle rectangle, donc je cherche un côté de l'angle droit »
      // traverserait tout le savoir-faire sans être mis en défaut.
      id: 'e-13-1-3', type: 'calcul', palier: 1, neutre: true, piege: 'adjacent-mal-identifie',
      consigne: 'Le triangle JKL est rectangle en K. Quelle est la longueur, en cm, de l’hypoténuse ?',
      enonce: '\\text{JKL rectangle en K — JK = 10 cm, KL = 24 cm, JL = 26 cm}',
      attendu: 26,
      fausses: [
        // KL touche l'angle droit et mesure moins que JL : deux raisons de ne
        // pas être l'hypoténuse.
        { valeur: 24, piege: 'hypotenuse-mal-identifiee' },
        { valeur: 10, piege: 'hypotenuse-mal-identifiee' },
      ],
    },

    // ── Palier 2 : juger une désignation, et vérifier l'angle droit ────────
    {
      id: 'e-13-1-4', type: 'plausible', palier: 2, piege: 'adjacent-mal-identifie',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{MNO rectangle en N — MN = 8 cm, NO = 15 cm, MO = 17 cm.} \\quad '
        + '\\text{Le côté adjacent à l’angle en M mesurerait 15 cm.}',
      attendu: false,
      explication:
        'Le côté qui mesure 15 cm est NO, et il ne touche pas le sommet M. Les '
        + 'deux côtés qui partent de M sont MN et MO ; MO est l’hypoténuse, '
        + 'puisqu’elle est opposée à l’angle droit. Le côté adjacent à l’angle en '
        + 'M est donc MN, qui mesure 8 cm.',
    },
    {
      // Le même triangle que l'item précédent, l'autre angle, et cette fois la
      // désignation est JUSTE. Qui a retenu « l'adjacent, c'est celui de tout à
      // l'heure » répond « pas plausible » et se fait prendre exactement là.
      id: 'e-13-1-5', type: 'plausible', palier: 2, piege: 'adjacent-mal-identifie',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{MNO rectangle en N — MN = 8 cm, NO = 15 cm, MO = 17 cm.} \\quad '
        + '\\text{Le côté adjacent à l’angle en O mesurerait 15 cm.}',
      attendu: true,
      fausses: [
        { valeur: false, piege: 'adjacent-mal-identifie' },
      ],
      explication:
        'Les deux côtés qui partent de O sont ON et OM. OM est l’hypoténuse — '
        + 'elle est opposée à l’angle droit, en N. Le côté adjacent à l’angle en '
        + 'O est donc ON, qui mesure bien 15 cm. Dans ce même triangle, le côté '
        + 'adjacent à l’angle en M est MN, qui mesure 8 cm : deux angles, deux '
        + 'côtés adjacents différents.',
    },
    {
      // NEUTRE, et par un autre mécanisme que e-13-1-3 : les deux côtés de
      // l'angle droit mesurent la même chose, donc échanger l'adjacent et
      // l'opposé donne le même nombre. L'hypoténuse SU n'est pas donnée, et
      // elle ne peut pas l'être : elle vaut 7 × √2, qui n'est pas décimal, et
      // écrire une valeur approchée serait mentir dans l'énoncé.
      id: 'e-13-1-6', type: 'calcul', palier: 2, neutre: true, piege: 'adjacent-mal-identifie',
      consigne: 'Le triangle STU est rectangle en T. Quelle est la longueur, en cm, du côté adjacent à l’angle en S ?',
      enonce: '\\text{STU rectangle en T — ST = 7 cm, TU = 7 cm}',
      attendu: 7,
      fausses: [],
    },
    {
      // Le triangle du cours qui n'a pas d'angle droit s'appelle VWX, et la
      // question qu'on y écarte porte sur l'angle en V. Reprendre les mêmes
      // lettres ici rendrait l'item réussissable de mémoire, sans vérifier
      // quoi que ce soit : d'où LMN, et l'angle en M.
      id: 'e-13-1-7', type: 'plausible', palier: 2, piege: 'cosinus-sans-angle-droit',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Dans le triangle LMN, LM = 6 cm, MN = 7 cm et LN = 9 cm.} \\quad '
        + '\\text{Le côté adjacent à l’angle en M mesurerait 6 cm.}',
      attendu: false,
      explication:
        'Rien dans l’énoncé ne dit que ce triangle est rectangle — et il ne l’est '
        + 'pas : le plus long côté est LN, et 6² + 7² = 85 alors que 9² = 81, donc '
        + 'l’égalité de Pythagore n’est pas vérifiée. Sans angle droit, aucun côté '
        + 'ne s’appelle l’hypoténuse et aucun ne s’appelle le côté adjacent. La '
        + 'question n’a pas de réponse, et c’est cela qu’il fallait repérer.',
    },

    // ── Palier 3 : relire une désignation, et la réfuter par un nombre ─────
    {
      id: 'e-13-1-8', type: 'corriger', palier: 3, piege: 'adjacent-mal-identifie',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l’erreur apparaît.',
      enonce:
        '\\text{Le triangle CDE est rectangle en D, avec CD = 18 cm, DE = 24 cm et CE = 30 cm.} \\quad '
        + '\\text{Quel est le côté adjacent à l’angle en E, et combien mesure-t-il ?}',
      lignes: [
        { texte: 'L’angle droit est en D, donc l’hypoténuse est CE : c’est le côté qui ne touche pas D, et il mesure 30 cm.', fausse: false },
        { texte: 'Le côté adjacent à l’angle en E est celui qui touche E sans être l’hypoténuse.', fausse: false },
        { texte: 'C’est donc le côté CD, qui mesure 18 cm.', fausse: true },
      ],
      explication:
        'Les deux premières lignes sont justes, et la deuxième avait même donné '
        + 'la méthode. La troisième désigne un côté qui ne touche pas E : CD '
        + 'relie C et D. Les deux côtés qui partent de E sont ED et EC ; EC est '
        + 'l’hypoténuse, donc le côté adjacent à l’angle en E est ED, qui mesure '
        + '24 cm. Les lettres le disaient : l’adjacent porte celle de l’angle, E, '
        + 'et celle de l’angle droit, D.',
    },
    {
      id: 'e-13-1-9', type: 'vraifaux', palier: 3, piege: 'adjacent-mal-identifie',
      consigne: 'Vrai ou faux ? Si c’est faux, donne un contre-exemple.',
      affirmation:
        'Dans un triangle rectangle, le côté adjacent est le même quel que soit l’angle aigu que l’on considère.',
      attendu: false,
      contreExemple: {
        // On ne demande pas de réciter la propriété : on fait DÉSIGNER les deux
        // côtés adjacents du même triangle. Deux nombres différents sortis de
        // la main de l'élève réfutent l'affirmation mieux qu'une phrase.
        invite:
          'Le triangle ABC est rectangle en B, avec AB = 3 cm, BC = 4 cm et '
          + 'AC = 5 cm. Donne la longueur du côté adjacent à l’angle en A, puis '
          + 'celle du côté adjacent à l’angle en C.',
        champs: [
          { id: 'a', etiquette: 'côté adjacent à l’angle en A, en cm' },
          { id: 'b', etiquette: 'côté adjacent à l’angle en C, en cm' },
        ],
        valide: (a, b) => Math.abs(a - 3) < 1e-9 && Math.abs(b - 4) < 1e-9,
        temoin: [3, 4],
        exemple:
          'Le côté adjacent à l’angle en A est AB : 3 cm. Le côté adjacent à '
          + 'l’angle en C est CB : 4 cm. Même triangle, deux angles, deux '
          + 'longueurs différentes — donc deux côtés différents. Seule '
          + 'l’hypoténuse AC ne change pas, parce qu’elle est désignée par '
          + 'l’angle droit et non par l’angle qu’on regarde.',
      },
    },
    {
      // NEUTRE. La question porte sur l'hypoténuse, et la réponse annoncée est
      // JUSTE : deux stratégies de surface tombent d'un coup, « je cherche un
      // côté de l'angle droit » et « on me demande si c'est plausible, donc
      // c'est faux ».
      id: 'e-13-1-10', type: 'plausible', palier: 3, neutre: true, piege: 'adjacent-mal-identifie',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{FGH rectangle en G — FG = 40 cm, GH = 9 cm, FH = 41 cm.} \\quad '
        + '\\text{L’hypoténuse serait le côté FH, qui mesure 41 cm.}',
      attendu: true,
      fausses: [
        { valeur: false, piege: 'hypotenuse-mal-identifiee' },
      ],
      explication:
        'L’angle droit est en G, et FH est le seul côté qui ne touche pas G : '
        + 'c’est donc l’hypoténuse. Elle est aussi la plus longue des trois, '
        + '41 cm devant 40 cm et 9 cm. Le résultat tient. Et cette question-là ne '
        + 'dépend pas de l’angle choisi : un triangle rectangle n’a qu’une '
        + 'hypoténuse.',
    },
  ],

  problemes: [
    {
      id: 'p-13-1-1',
      enonce:
        'Une échelle est appuyée contre un mur vertical. Son pied touche le sol '
        + 'au point P, son sommet touche le mur au point S, et le mur rencontre '
        + 'le sol au point M. Le triangle PMS est rectangle en M. On mesure '
        + 'PM = 1,5 m, MS = 2 m et PS = 2,5 m.',
      questions: [
        { texte: 'Quelle est la longueur de l’hypoténuse ?', attendu: 2.5, unite: 'm' },
        { texte: 'Quelle est la longueur du côté adjacent à l’angle en P ?', attendu: 1.5, unite: 'm' },
        { texte: 'Quelle est la longueur du côté adjacent à l’angle en S ?', attendu: 2, unite: 'm' },
      ],
    },
    {
      id: 'p-13-1-2',
      enonce:
        'Une rampe d’accès relie le sol au haut d’une marche. Elle part du point '
        + 'A, au sol, et arrive au point B, en haut de la marche. Le point C est '
        + 'au sol, juste sous B. Le triangle ABC est rectangle en C. On mesure '
        + 'AC = 2,4 m, CB = 1 m et AB = 2,6 m.',
      questions: [
        { texte: 'Quelle est la longueur de l’hypoténuse ?', attendu: 2.6, unite: 'm' },
        { texte: 'Quelle est la longueur du côté adjacent à l’angle en A ?', attendu: 2.4, unite: 'm' },
        { texte: 'Quelle est la longueur du côté qui ne touche pas l’angle en A ?', attendu: 1, unite: 'm' },
      ],
    },
    {
      id: 'p-13-1-3',
      enonce:
        'Un mât vertical est maintenu par un câble tendu. Le pied du mât est le '
        + 'point M, son sommet le point S, et le câble est fixé au sol au point '
        + 'A. Le triangle MAS est rectangle en M. On mesure MA = 8 m, MS = 6 m et '
        + 'AS = 10 m.',
      questions: [
        { texte: 'Le câble est l’hypoténuse du triangle. Quelle est sa longueur ?', attendu: 10, unite: 'm' },
        { texte: 'Quelle est la longueur du côté adjacent à l’angle en A ?', attendu: 8, unite: 'm' },
        { texte: 'Quelle est la longueur du côté adjacent à l’angle en S ?', attendu: 6, unite: 'm' },
      ],
    },
    {
      // L'angle droit n'est pas donné : il se PROUVE, par la réciproque de
      // Pythagore, avant que le vocabulaire du chapitre ait le droit de servir.
      // C'est la situation réelle de la plupart des exercices de contrôle.
      id: 'p-13-1-4',
      enonce:
        'Un jardinier veut savoir si le coin situé en B, dans sa parcelle '
        + 'triangulaire ABC, forme bien un angle droit. Il mesure AB = 9 m, '
        + 'BC = 12 m et AC = 15 m.',
      questions: [
        { texte: 'Combien vaut AB² + BC² ?', attendu: 225, unite: 'm²' },
        { texte: 'Combien vaut AC² ?', attendu: 225, unite: 'm²' },
        { texte: 'Les deux résultats sont égaux : le triangle est donc rectangle en B. Quelle est alors la longueur du côté adjacent à l’angle en C ?', attendu: 12, unite: 'm' },
      ],
    },
    {
      id: 'p-13-1-5',
      enonce:
        'Sur un plan, trois bornes R, S et T délimitent un terrain triangulaire. '
        + 'Le triangle RST est rectangle en R. On mesure RS = 20 m, RT = 15 m et '
        + 'ST = 25 m.',
      questions: [
        { texte: 'Quelle est la longueur de l’hypoténuse ?', attendu: 25, unite: 'm' },
        { texte: 'Quelle est la longueur du côté adjacent à l’angle en S ?', attendu: 20, unite: 'm' },
        { texte: 'Quelle est la longueur du côté adjacent à l’angle en T ?', attendu: 15, unite: 'm' },
      ],
    },
  ],

  test: [
    {
      id: 't-13-1-1', type: 'calcul',
      consigne: 'Le triangle BCD est rectangle en C. Quelle est la longueur, en cm, du côté adjacent à l’angle en B ?',
      enonce: '\\text{BCD rectangle en C — BC = 15 cm, CD = 8 cm, BD = 17 cm}',
      attendu: 15,
      fausses: [
        { valeur: 8, piege: 'adjacent-mal-identifie' },
        { valeur: 17, piege: 'adjacent-mal-identifie' },
      ],
      revoir: 'definition',
    },
    {
      id: 't-13-1-2', type: 'calcul',
      consigne: 'Le triangle EFG est rectangle en F. Quelle est la longueur, en cm, de l’hypoténuse ?',
      enonce: '\\text{EFG rectangle en F — EF = 30 cm, FG = 40 cm, EG = 50 cm}',
      attendu: 50,
      fausses: [
        { valeur: 40, piege: 'hypotenuse-mal-identifiee' },
      ],
      revoir: 'definition',
    },
    {
      id: 't-13-1-3', type: 'trous',
      consigne: 'Le triangle HIJ est rectangle en I. Complète les deux longueurs, en cm.',
      enonce:
        '\\text{HIJ rectangle en I — HI = 4,5 cm, IJ = 6 cm, HJ = 7,5 cm} \\quad '
        + '\\text{adjacent à l’angle en H : } \\square \\qquad '
        + '\\text{adjacent à l’angle en J : } \\square',
      champs: [
        { id: 'a', etiquette: 'côté adjacent à l’angle en H, en cm', attendu: 4.5 },
        { id: 'b', etiquette: 'côté adjacent à l’angle en J, en cm', attendu: 6 },
      ],
      fausses: [
        { valeur: 7.5, piege: 'adjacent-mal-identifie' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-13-1-4', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{KLM rectangle en L — KL = 16 cm, LM = 30 cm, KM = 34 cm.} \\quad '
        + '\\text{Le côté adjacent à l’angle en K mesurerait 30 cm.}',
      attendu: false,
      explication:
        'Le côté de 30 cm est LM, et il ne touche pas K. Les deux côtés qui '
        + 'partent de K sont KL et KM ; KM est l’hypoténuse, opposée à l’angle '
        + 'droit. Le côté adjacent à l’angle en K mesure donc 16 cm.',
      piege: 'adjacent-mal-identifie', revoir: 'definition',
    },
    {
      id: 't-13-1-5', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{KLM rectangle en L — KL = 16 cm, LM = 30 cm, KM = 34 cm.} \\quad '
        + '\\text{Le côté adjacent à l’angle en M mesurerait 30 cm.}',
      attendu: true,
      fausses: [
        { valeur: false, piege: 'adjacent-mal-identifie' },
      ],
      explication:
        'Les deux côtés qui partent de M sont ML et MK. MK est l’hypoténuse, '
        + 'donc le côté adjacent à l’angle en M est ML, qui mesure bien 30 cm. '
        + 'Ce n’est pas le même côté que pour l’angle en K, et c’est normal : '
        + 'l’adjacent dépend de l’angle qu’on regarde.',
      revoir: 'propriete',
    },
    {
      id: 't-13-1-6', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Dans le triangle NOP, NO = 5 cm, OP = 6 cm et NP = 8 cm.} \\quad '
        + '\\text{Le côté adjacent à l’angle en N mesurerait 5 cm.}',
      attendu: false,
      explication:
        'L’énoncé ne dit nulle part que ce triangle est rectangle, et il ne l’est '
        + 'pas : 5² + 6² = 61 alors que 8² = 64. Sans angle droit, il n’y a ni '
        + 'hypoténuse ni côté adjacent — la question ne veut rien dire.',
      piege: 'cosinus-sans-angle-droit', revoir: 'remarque',
    },
    {
      id: 't-13-1-7', type: 'corriger',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l’erreur apparaît.',
      enonce:
        '\\text{Le triangle QRS est rectangle en R, avec QR = 12 cm, RS = 35 cm et QS = 37 cm.} \\quad '
        + '\\text{Quel est le côté adjacent à l’angle en Q, et combien mesure-t-il ?}',
      lignes: [
        { texte: 'L’angle droit est en R : l’hypoténuse est donc QS, le côté qui ne touche pas R.', fausse: false },
        { texte: 'Les deux côtés qui partent de Q sont QR et QS, et QS est l’hypoténuse.', fausse: false },
        { texte: 'Le côté adjacent à l’angle en Q est donc RS, qui mesure 35 cm.', fausse: true },
      ],
      explication:
        'La deuxième ligne avait déjà tout dit : des deux côtés qui partent de Q, '
        + 'il ne restait que QR. Le côté RS ne touche pas Q — il relie R et S. Le '
        + 'côté adjacent à l’angle en Q est QR, qui mesure 12 cm, et ses deux '
        + 'lettres sont bien celle de l’angle, Q, et celle de l’angle droit, R.',
      piege: 'adjacent-mal-identifie', revoir: 'remarque',
    },
    {
      id: 't-13-1-8', type: 'calcul',
      consigne: 'Le triangle TUV est rectangle en T. Quelle est la longueur, en cm, du côté adjacent à l’angle en U ?',
      enonce: '\\text{TUV rectangle en T — TU = 21 cm, TV = 28 cm, UV = 35 cm}',
      attendu: 21,
      fausses: [
        { valeur: 28, piege: 'adjacent-mal-identifie' },
        { valeur: 35, piege: 'adjacent-mal-identifie' },
      ],
      revoir: 'exemple',
    },
    {
      id: 't-13-1-9', type: 'calcul',
      consigne: 'Le triangle WXY est rectangle en X. Quelle est la longueur, en cm, du côté qui ne touche pas l’angle en W ?',
      enonce: '\\text{WXY rectangle en X — WX = 24 cm, XY = 32 cm, WY = 40 cm}',
      attendu: 32,
      fausses: [
        // 24 cm, c'est WX : il touche W, c'est même le côté adjacent.
        { valeur: 24, piege: 'adjacent-mal-identifie' },
        // 40 cm, c'est WY : elle touche W aussi, et c'est l'hypoténuse.
        { valeur: 40, piege: 'adjacent-mal-identifie' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-13-1-10', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{ABC rectangle en B — AB = 1,5 m, BC = 2 m, AC = 2,5 m.} \\quad '
        + '\\text{L’hypoténuse serait le côté AC, qui mesure 2,5 m.}',
      attendu: true,
      fausses: [
        { valeur: false, piege: 'hypotenuse-mal-identifiee' },
      ],
      explication:
        'AC est le seul côté qui ne touche pas B, le sommet de l’angle droit : '
        + 'c’est l’hypoténuse. Elle est aussi la plus longue des trois, 2,5 m '
        + 'devant 2 m et 1,5 m. Les deux repères se confirment l’un l’autre.',
      revoir: 'definition',
    },
  ],
};
