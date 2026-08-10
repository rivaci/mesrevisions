// Chapitre 10, savoir-faire 5 — Démontrer qu'un quadrilatère est un parallélogramme.
//
// ── Pourquoi ce savoir-faire est le plus exposé du chapitre ───────────────
//
// C'est le seul où l'élève ne calcule pas : il CONCLUT. Et une conclusion se
// vérifie mal à l'œil — « ça y ressemble » n'est pas un argument, mais ça
// ressemble à un argument. Sur une figure, un trapèze un peu régulier passe
// pour un parallélogramme sans que personne s'en aperçoive.
//
// L'application n'affiche aucune figure, et ici c'est un cadeau : privé du
// dessin, il ne reste que la propriété citée et ses conditions. C'est
// exactement ce que le programme demande — nommer la propriété, vérifier
// qu'elle est complète, et seulement alors conclure.
//
// ── Le chemin choisi : les coordonnées, dans la continuité du chapitre ────
//
// Deux outils portent tout le savoir-faire, et tous deux sont numériques :
//   — le milieu d'une diagonale, moyenne des coordonnées des extrémités ;
//   — le déplacement d'un sommet à l'autre, déjà installé par la translation
//     du premier savoir-faire du chapitre.
// Le second n'est pas un ajout : ABCD est un parallélogramme exactement quand
// la translation qui envoie A sur B envoie aussi D sur C. Le chapitre se
// referme donc sur lui-même, et l'élève réutilise un geste qu'il maîtrise.
//
// ── Le piège du moment, et ses deux neutres ───────────────────────────────
//
// « parallelogramme-conclu-trop-vite » : un seul couple de côtés parallèles
// donne un TRAPÈZE, pas un parallélogramme. L'erreur est tenace parce qu'elle
// est économique — on a trouvé une propriété vraie, pourquoi continuer ? D'où
// le trapèze installé dès l'activité, avant même le mot « parallélogramme »,
// et deux démonstrations à corriger où la propriété est citée à moitié.
//
// Deux items neutres, parce que deux motifs de surface menacent :
//   — « quand on me demande de conclure, c'est que la conclusion est fausse » :
//     l'item 4 cite une propriété COMPLÈTE, et la conclusion est bonne ;
//   — « je conclus toujours quelque chose » : l'item 2 ne demande que deux
//     nombres, sans propriété à invoquer ni conclusion à tirer.

export default {
  id: 'sf-10-5',
  titre: 'Démontrer qu\'un quadrilatère est un parallélogramme',
  attendus: [
    'Il utilise les propriétés caractéristiques du parallélogramme.',
    'Il démontre qu\'un quadrilatère est un parallélogramme en citant la propriété utilisée.',
  ],

  // On ne donne pas la liste des propriétés : on met côte à côte un
  // parallélogramme et un trapèze, et l'élève constate que « des côtés
  // parallèles », les deux en ont. Ce qui les sépare se mesure — et c'est
  // cette mesure qu'on lui fait faire. Le mot « trapèze » n'arrive qu'à la
  // conclusion, une fois la différence trouvée.
  decouvrir: {
    titre: 'Deux côtés parallèles, et pourtant',
    texte:
      'Voici deux quadrilatères, donnés par les coordonnées de leurs sommets. '
      + 'Pour chacun, on regarde une paire de côtés opposés et on calcule le '
      + 'déplacement qui mène d\'une extrémité à l\'autre — exactement comme pour '
      + 'une translation.',
    lignes: [
      { calcul: 'ABCD : de A(1 ; 1) à B(5 ; 2)', resultat: 'on ajoute (+4 ; +1)' },
      { calcul: 'ABCD : de D(2 ; 4) à C(6 ; 5)', resultat: 'on ajoute (+4 ; +1)' },
      { calcul: 'EFGH : de E(0 ; 0) à F(6 ; 0)', resultat: 'on ajoute (+6 ; 0)' },
      { calcul: 'EFGH : de H(2 ; 3) à G(4 ; 3)', resultat: 'on ajoute (+2 ; 0)' },
    ],
    question:
      'Dans EFGH, les côtés [EF] et [HG] sont tous les deux horizontaux : ils '
      + 'sont donc parallèles. Mais sont-ils de même longueur ? Calcule EF, puis HG.',
    champs: [
      { id: 'a', etiquette: 'EF =', attendu: 6 },
      { id: 'b', etiquette: 'HG =', attendu: 2 },
    ],
    conclusion:
      'Dans ABCD, le déplacement de A à B est **exactement** celui de D à C : '
      + 'les côtés [AB] et [DC] sont parallèles **et** de même longueur. ABCD est '
      + 'un **parallélogramme**. Dans EFGH, [EF] et [HG] sont bien parallèles eux '
      + 'aussi, mais l\'un mesure 6 et l\'autre 2 : EFGH est un **trapèze**. '
      + '**Un seul couple de côtés parallèles ne suffit jamais.**',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Parallélogramme',
      texte:
        'Un **parallélogramme** est un quadrilatère dont les côtés opposés sont '
        + '**parallèles deux à deux**.\n'
        + 'Dans le quadrilatère ABCD, les côtés opposés sont [AB] et [DC] d\'une '
        + 'part, [AD] et [BC] d\'autre part. Ses **diagonales** sont [AC] et [BD] — '
        + 'jamais [AB], qui est un côté.',
    },
    {
      type: 'propriete',
      titre: 'Trois façons de le démontrer',
      texte:
        'Un quadrilatère **non croisé** est un parallélogramme dans chacun de ces cas :\n'
        + '· ses côtés opposés sont parallèles **deux à deux** ;\n'
        + '· **un** couple de côtés opposés est à la fois **parallèle et de même longueur** ;\n'
        + '· ses **diagonales se coupent en leur milieu**.\n'
        + 'Une seule de ces trois conditions suffit — mais elle doit être **complète**.',
    },
    {
      type: 'propriete',
      titre: 'Dans un repère',
      texte:
        'ABCD est un parallélogramme **exactement quand** ses diagonales [AC] et '
        + '[BD] ont le **même milieu**. Le milieu d\'un segment se calcule en '
        + 'faisant la **moyenne** des coordonnées de ses extrémités.\n'
        + 'Autre lecture, dans l\'esprit de ce chapitre : ABCD est un '
        + 'parallélogramme quand la translation qui transforme A en B transforme '
        + 'aussi D en C. Le déplacement de A à B et celui de D à C doivent être le '
        + 'même couple de nombres.',
    },
    {
      type: 'remarque',
      titre: 'Le trapèze, ou l\'arrêt en chemin',
      texte:
        'Un quadrilatère qui n\'a qu\'**un seul** couple de côtés parallèles '
        + 's\'appelle un **trapèze**. C\'est précisément ce qu\'on obtient quand on '
        + 's\'arrête à la première propriété trouvée.\n'
        + 'Méfie-toi aussi des demi-propriétés. « Les diagonales se coupent » est '
        + 'vrai dans presque tous les quadrilatères et ne prouve rien ; ce qui '
        + 'prouve, c\'est qu\'elles se coupent **en leur milieu**. De même, deux '
        + 'côtés opposés de même longueur ne suffisent pas : il les faut aussi '
        + 'parallèles.',
    },
    {
      type: 'exemple',
      texte:
        'K(0 ; 4), L(6 ; 5), M(7 ; 9) et N(1 ; 8) : le milieu de [KM] est '
        + '(3,5 ; 6,5) et celui de [LN] est (3,5 ; 6,5). Les diagonales se coupent '
        + 'en leur milieu, donc KLMN est un parallélogramme.',
    },
  ],

  methode: {
    titre: 'Rédiger la démonstration',
    enonce: 'Dans un repère, A(−1 ; 2), B(3 ; 3), C(4 ; 6) et D(0 ; 5). Démontrer que ABCD est un parallélogramme.',
    etapes: [
      {
        texte: 'Je repère les diagonales du quadrilatère ABCD : ce sont [AC] et [BD].',
        note: 'Elles joignent des sommets opposés. [AB] est un côté, pas une diagonale.',
      },
      {
        texte: 'Milieu de [AC] : abscisse (−1 + 4) ÷ 2 = 1,5 ; ordonnée (2 + 6) ÷ 2 = 4.',
        note: 'Le milieu, c\'est la moyenne des coordonnées des deux extrémités.',
      },
      {
        texte: 'Milieu de [BD] : abscisse (3 + 0) ÷ 2 = 1,5 ; ordonnée (3 + 5) ÷ 2 = 4.',
        note: 'Je le calcule à part, sans regarder le résultat précédent.',
      },
      {
        texte: 'Les deux milieux sont le même point : (1,5 ; 4).',
        note: 'C\'est seulement maintenant que la comparaison se fait.',
      },
      {
        texte:
          'Donc, d\'après la propriété « si les diagonales d\'un quadrilatère se '
          + 'coupent en leur milieu, alors c\'est un parallélogramme », ABCD est un '
          + 'parallélogramme.',
        note: 'On nomme la propriété entière. Sans elle, rien n\'est démontré.',
      },
    ],
    controle:
      'Le contrôle : reprends par l\'autre chemin. Le déplacement de A à B doit '
      + 'être exactement celui de D à C. De A(−1 ; 2) à B(3 ; 3) : (+4 ; +1). De '
      + 'D(0 ; 5) à C(4 ; 6) : (+4 ; +1). Les deux méthodes s\'accordent, la '
      + 'démonstration tient. Si l\'une disait oui et l\'autre non, c\'est qu\'une '
      + 'soustraction s\'est perdue en route — ou que tu as pris un côté pour une '
      + 'diagonale.',
  },

  entrainement: [
    {
      // La fausse 5,5 est l'abscisse du milieu de [AB], et 2 son ordonnée :
      // c'est ce que produit « j'ai pris les deux premiers sommets ». Le cours
      // dit explicitement que [AB] est un côté — la propriété parle de
      // diagonales, et ses conditions se lisent jusqu'au bout.
      id: 'e-10-5-1', type: 'trous', palier: 1, piege: 'parallelogramme-conclu-trop-vite',
      consigne:
        'ABCD est un quadrilatère avec A(2 ; 1), B(9 ; 3), C(8 ; 5) et D(1 ; 3). '
        + 'Donne les coordonnées du milieu de la diagonale [AC].',
      enonce: '\\text{milieu de } [AC] \\; (\\square \\, ; \\, \\square)',
      champs: [
        { id: 'a', etiquette: 'abscisse du milieu de [AC]', attendu: 5 },
        { id: 'b', etiquette: 'ordonnée du milieu de [AC]', attendu: 3 },
      ],
      fausses: [
        { valeur: 5.5, piege: 'parallelogramme-conclu-trop-vite' },
        { valeur: 2, piege: 'parallelogramme-conclu-trop-vite' },
      ],
    },
    {
      // Premier neutre : on ne demande que deux nombres. Aucune propriété n'est
      // invoquée, aucune conclusion n'est tirée — le piège du moment ne peut pas
      // jouer, et une erreur ici est une erreur de moyenne, pas de raisonnement.
      // Sans cet item, « on me montre un quadrilatère, donc je dois conclure »
      // deviendrait un réflexe, et l'élève annoncerait une réponse avant d'avoir
      // les deux nombres à comparer. Ici les deux milieux diffèrent : c'est le
      // calcul qui le dit, pas l'intuition.
      id: 'e-10-5-2', type: 'trous', palier: 1, neutre: true, piege: 'parallelogramme-conclu-trop-vite',
      consigne:
        'Un autre quadrilatère : E(0 ; 1), F(7 ; 0), G(8 ; 5) et H(3 ; 4). Calcule '
        + 'l\'abscisse du milieu de [EG], puis l\'abscisse du milieu de [FH].',
      enonce: '\\text{milieu de } [EG] : \\square \\qquad \\text{milieu de } [FH] : \\square',
      champs: [
        { id: 'a', etiquette: 'abscisse du milieu de [EG]', attendu: 4 },
        { id: 'b', etiquette: 'abscisse du milieu de [FH]', attendu: 5 },
      ],
      fausses: [],
    },
    {
      // Le sens du déplacement se paie ici : dans MNPQ, c'est la translation qui
      // mène de M à N qui doit mener de Q à P. La prendre de N à M donne 12 —
      // un point parfaitement présentable, et faux.
      id: 'e-10-5-3', type: 'calcul', palier: 1, piege: 'sens-de-translation-inverse',
      consigne:
        'On veut que MNPQ soit un parallélogramme, avec M(1 ; 2), N(6 ; 3) et '
        + 'P(7 ; 8). Calcule l\'abscisse de Q.',
      enonce: '\\text{abscisse de } Q', attendu: 2,
      fausses: [{ valeur: 12, piege: 'sens-de-translation-inverse' }],
    },
    {
      // Second neutre : la propriété citée est COMPLÈTE, et la conclusion suit.
      // Le piège ne joue pas — il n'y a rien de trop rapide dans ce raisonnement.
      // Sans cet item, « on me demande de juger un raisonnement, donc il est
      // faux » suffirait à réussir tous les autres, et l'élève finirait par se
      // méfier des démonstrations justes.
      id: 'e-10-5-4', type: 'plausible', palier: 2, neutre: true, piege: 'parallelogramme-conclu-trop-vite',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Dans ABCD : } [AC] \\text{ et } [BD] \\text{ ont le même milieu} '
        + '\\quad \\Rightarrow \\quad \\text{ABCD est un parallélogramme}',
      attendu: true,
      explication:
        'La propriété est citée en entier : les diagonales se coupent **en leur '
        + 'milieu**, ce qui est exactement la condition demandée. La conclusion est '
        + 'donc légitime. Toutes les démonstrations ne sont pas fausses — celle-ci '
        + 'tient.',
    },
    {
      id: 'e-10-5-5', type: 'plausible', palier: 2, piege: 'parallelogramme-conclu-trop-vite',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Dans EFGH : } (EF) \\parallel (HG) \\quad \\Rightarrow \\quad '
        + '\\text{EFGH est un parallélogramme}',
      attendu: false,
      explication:
        'Un seul couple de côtés parallèles ne donne qu\'un **trapèze** : c\'est le '
        + 'cas d\'EFGH dans l\'activité, où [EF] et [HG] sont parallèles alors que '
        + 'l\'un mesure 6 et l\'autre 2. Pour conclure, il faudrait en plus que ces '
        + 'deux côtés aient la **même longueur**, ou que l\'autre couple soit '
        + 'parallèle lui aussi.',
    },
    {
      id: 'e-10-5-6', type: 'trous', palier: 2, piege: 'parallelogramme-conclu-trop-vite',
      consigne:
        'ABCD est un quadrilatère non croisé tel que (AB) et (DC) sont parallèles, '
        + 'et AB = 5,4 cm. Quelle doit être la longueur DC, en cm, pour qu\'on '
        + 'puisse affirmer que ABCD est un parallélogramme ?',
      enonce: 'AB = 5{,}4 \\text{ cm} \\qquad DC = \\square \\text{ cm}',
      champs: [{ id: 'a', attendu: 5.4 }],
      fausses: [{ valeur: 10.8, piege: 'parallelogramme-conclu-trop-vite' }],
    },
    {
      // Mêmes gestes que l'item 3, mais avec des coordonnées négatives : c'est là
      // que la soustraction se perd et que le sens s'inverse sans qu'on le voie.
      id: 'e-10-5-7', type: 'trous', palier: 2, piege: 'sens-de-translation-inverse',
      consigne:
        'On veut que RSTU soit un parallélogramme, avec R(−3 ; 2), S(1 ; −1) et '
        + 'T(6 ; 1). Donne les coordonnées de U.',
      enonce: 'U(\\square \\, ; \\, \\square)',
      champs: [
        { id: 'a', etiquette: 'abscisse de U', attendu: 2 },
        { id: 'b', etiquette: 'ordonnée de U', attendu: 4 },
      ],
      fausses: [
        { valeur: 10, piege: 'sens-de-translation-inverse' },
        { valeur: -2, piege: 'sens-de-translation-inverse' },
      ],
    },
    {
      id: 'e-10-5-8', type: 'corriger', palier: 3, piege: 'parallelogramme-conclu-trop-vite',
      consigne: 'Cette démonstration est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{Dans ABCD : } (AB) \\parallel (DC), \\; AB = 4 \\text{ cm}, \\; DC = 7 \\text{ cm}',
      lignes: [
        { texte: 'Les côtés opposés [AB] et [DC] sont parallèles.', fausse: false },
        { texte: 'Un quadrilatère qui a deux côtés parallèles est un parallélogramme.', fausse: true },
        { texte: 'Donc ABCD est un parallélogramme.', fausse: false },
      ],
      explication:
        'La première ligne est juste, et la troisième découle bien de la deuxième — '
        + 'c\'est la deuxième qui est fausse. Deux côtés parallèles ne donnent qu\'un '
        + '**trapèze**. Il faudrait que [AB] et [DC] soient parallèles **et de même '
        + 'longueur**, or 4 ≠ 7. ABCD est un trapèze.',
    },
    {
      id: 'e-10-5-9', type: 'corriger', palier: 3, piege: 'parallelogramme-conclu-trop-vite',
      consigne: 'Cette démonstration est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{Dans EFGH, les diagonales } [EG] \\text{ et } [FH] \\text{ se coupent en } K',
      lignes: [
        { texte: 'Les diagonales [EG] et [FH] se coupent en K.', fausse: false },
        { texte: 'Si les diagonales d\'un quadrilatère se coupent, alors c\'est un parallélogramme.', fausse: true },
        { texte: 'Donc EFGH est un parallélogramme.', fausse: false },
      ],
      explication:
        'La propriété a été citée à moitié. Dans presque tous les quadrilatères les '
        + 'diagonales se coupent : ça ne prouve rien. Ce qu\'il faut, c\'est '
        + 'qu\'elles se coupent **en leur milieu**, c\'est-à-dire que K soit à la '
        + 'fois le milieu de [EG] **et** celui de [FH].',
    },
    {
      id: 'e-10-5-10', type: 'vraifaux', palier: 3, piege: 'parallelogramme-conclu-trop-vite',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Un quadrilatère qui a deux côtés parallèles est un parallélogramme.',
      attendu: false,
      contreExemple: {
        invite:
          'On pose E(0 ; 0), F(6 ; 0) et H(2 ; 3). Le point G aura pour ordonnée 3, '
          + 'comme H : les côtés [EF] et [HG] seront donc parallèles. Donne une '
          + 'abscisse de G, plus grande que 2, telle que EFGH ne soit PAS un '
          + 'parallélogramme.',
        champs: [{ id: 'a', etiquette: 'abscisse de G' }],
        // On vérifie une propriété, pas une valeur : il suffit que G soit à droite
        // de H (le quadrilatère reste non croisé) et que HG ne mesure pas 6 —
        // c'est-à-dire que l'abscisse ne soit pas 8. Beaucoup de réponses passent.
        valide: (a) => Number.isFinite(a) && a > 2 && a !== 8,
        temoin: [4],
        exemple:
          'Avec G(4 ; 3) : [EF] et [HG] sont bien parallèles, mais EF = 6 alors que '
          + 'HG = 2. EFGH est un trapèze, pas un parallélogramme.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-10-5-1',
      enonce:
        'Un vitrier découpe un panneau en forme de quadrilatère ABCD. Sur son plan '
        + 'gradué en centimètres, A(0 ; 0), B(60 ; 20), C(75 ; 65) et D(15 ; 45). '
        + 'Il veut vérifier que le panneau est bien un parallélogramme.',
      questions: [
        { texte: 'Quelle est l\'abscisse du milieu de la diagonale [AC] ?', attendu: 37.5 },
        { texte: 'Quelle est l\'ordonnée du milieu de la diagonale [AC] ?', attendu: 32.5 },
        {
          texte:
            'Le milieu de [BD] a pour coordonnées (37,5 ; 32,5). ABCD est-il un '
            + 'parallélogramme ? Réponds 1 pour oui, 0 pour non.',
          attendu: 1,
        },
      ],
    },
    {
      id: 'p-10-5-2',
      enonce:
        'Le plateau d\'une table a la forme d\'un quadrilatère EFGH dont les côtés '
        + 'opposés [EF] et [HG] sont parallèles. Le menuisier mesure EF = 120 cm et '
        + 'HG = 80 cm.',
      questions: [
        {
          texte: 'Quelle devrait être la longueur HG, en cm, pour que EFGH soit un parallélogramme ?',
          attendu: 120, unite: 'cm',
        },
        { texte: 'De combien de centimètres HG est-il trop court pour cela ?', attendu: 40, unite: 'cm' },
        { texte: 'EFGH est-il un parallélogramme ? Réponds 1 pour oui, 0 pour non.', attendu: 0 },
      ],
    },
    {
      id: 'p-10-5-3',
      enonce:
        'Un jardinier veut délimiter une parcelle en forme de parallélogramme. '
        + 'Trois piquets sont déjà plantés : sur son plan, P(2 ; 1), Q(9 ; 3) et '
        + 'R(11 ; 8). Il cherche où planter le quatrième piquet S pour que PQRS '
        + 'soit un parallélogramme.',
      questions: [
        { texte: 'Quelle est l\'abscisse de S ?', attendu: 4 },
        { texte: 'Quelle est l\'ordonnée de S ?', attendu: 6 },
        {
          texte:
            'Le déplacement de P à Q vaut (+7 ; +2). Quel est le déplacement de S à '
            + 'R en abscisse ?',
          attendu: 7,
        },
      ],
    },
    {
      // Le problème où la vérification dit NON. Sans lui, « on me demande de
      // vérifier, donc c'en est un » traverserait toute la section.
      id: 'p-10-5-4',
      enonce:
        'Dans un jeu de dessin, quatre points sont affichés à l\'écran : A(1 ; 1), '
        + 'B(6 ; 2), C(8 ; 7) et D(2 ; 6). Le joueur affirme que ABCD est un '
        + 'parallélogramme.',
      questions: [
        { texte: 'Quelle est l\'abscisse du milieu de [AC] ?', attendu: 4.5 },
        { texte: 'Quelle est l\'abscisse du milieu de [BD] ?', attendu: 4 },
        { texte: 'ABCD est-il un parallélogramme ? Réponds 1 pour oui, 0 pour non.', attendu: 0 },
      ],
    },
    {
      // Le lien avec le début du chapitre : c'est la translation elle-même qui
      // fabrique le parallélogramme, et l'élève le constate en nombres.
      id: 'p-10-5-5',
      enonce:
        'Sur une frise, un motif est reproduit plus loin par une translation qui '
        + 'ajoute (+5 ; 0) à chaque point. Le segment [AB] du premier motif a pour '
        + 'extrémités A(1 ; 2) et B(4 ; 3). La translation transforme A en D et B '
        + 'en C. On veut savoir si ABCD est un parallélogramme.',
      questions: [
        { texte: 'Quelle est l\'abscisse de D ?', attendu: 6 },
        { texte: 'Quelle est l\'abscisse de C ?', attendu: 9 },
        {
          texte:
            'Le déplacement de A à B vaut (+3 ; +1). Calcule le déplacement de D à '
            + 'C en abscisse.',
          attendu: 3,
        },
      ],
    },
  ],

  test: [
    {
      id: 't-10-5-1', type: 'trous',
      consigne: 'A(1 ; −4) et C(7 ; 2). Donne les coordonnées du milieu de [AC].',
      enonce: '\\text{milieu de } [AC] \\; (\\square \\, ; \\, \\square)',
      champs: [
        { id: 'a', etiquette: 'abscisse du milieu', attendu: 4 },
        { id: 'b', etiquette: 'ordonnée du milieu', attendu: -1 },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-10-5-2', type: 'trous',
      consigne:
        'On veut que ABCD soit un parallélogramme, avec A(0 ; 0), B(5 ; 2) et '
        + 'C(7 ; 6). Donne les coordonnées de D.',
      enonce: 'D(\\square \\, ; \\, \\square)',
      champs: [
        { id: 'a', etiquette: 'abscisse de D', attendu: 2 },
        { id: 'b', etiquette: 'ordonnée de D', attendu: 4 },
      ],
      fausses: [
        { valeur: 12, piege: 'sens-de-translation-inverse' },
        { valeur: 8, piege: 'sens-de-translation-inverse' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-10-5-3', type: 'calcul',
      consigne:
        'EFGH est un quadrilatère avec E(−1 ; 0), F(4 ; 1), G(5 ; 6) et H(0 ; 5). '
        + 'Calcule l\'ordonnée du milieu de la diagonale [EG].',
      enonce: '\\text{ordonnée du milieu de } [EG]', attendu: 3,
      revoir: 'propriete',
    },
    {
      id: 't-10-5-4', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Dans ABCD : } (AD) \\parallel (BC) \\quad \\Rightarrow \\quad '
        + '\\text{ABCD est un parallélogramme}',
      attendu: false,
      explication:
        'Un seul couple de côtés parallèles ne donne qu\'un **trapèze**. Il '
        + 'faudrait en plus que AD = BC, ou que [AB] et [DC] soient parallèles eux '
        + 'aussi.',
      piege: 'parallelogramme-conclu-trop-vite', revoir: 'remarque',
    },
    {
      id: 't-10-5-5', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Dans MNPQ non croisé : } (MN) \\parallel (QP) \\text{ et } MN = QP \\quad '
        + '\\Rightarrow \\quad \\text{MNPQ est un parallélogramme}',
      attendu: true,
      explication:
        'Les deux conditions portent sur le **même couple** de côtés opposés : '
        + 'parallèles et de même longueur. C\'est exactement la deuxième propriété '
        + 'du cours, et elle est complète.',
      revoir: 'propriete',
    },
    {
      id: 't-10-5-6', type: 'trous',
      consigne:
        'ABCD est un quadrilatère non croisé tel que (AB) et (DC) sont parallèles, '
        + 'et AB = 8,2 cm. Quelle doit être la longueur DC, en cm, pour que ABCD '
        + 'soit un parallélogramme ?',
      enonce: 'AB = 8{,}2 \\text{ cm} \\qquad DC = \\square \\text{ cm}',
      champs: [{ id: 'a', attendu: 8.2 }],
      revoir: 'propriete',
    },
    {
      id: 't-10-5-7', type: 'corriger',
      consigne: 'Cette démonstration est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{Dans ABCD : } AB = DC = 5 \\text{ cm}',
      lignes: [
        { texte: 'Les côtés opposés [AB] et [DC] ont la même longueur, 5 cm.', fausse: false },
        { texte: 'Deux côtés opposés de même longueur suffisent : ABCD est un parallélogramme.', fausse: true },
        { texte: 'Donc les diagonales [AC] et [BD] ont le même milieu.', fausse: false },
      ],
      explication:
        'La deuxième ligne coupe la propriété en deux. Deux côtés opposés de même '
        + 'longueur ne suffisent pas : il les faut **aussi parallèles**. Dans le '
        + 'trapèze E(0 ; 0), F(6 ; 0), G(4 ; 3), H(2 ; 3), les côtés opposés [FG] et '
        + '[HE] ont la même longueur, et ce n\'est pas un parallélogramme.',
      piege: 'parallelogramme-conclu-trop-vite', revoir: 'remarque',
    },
    {
      id: 't-10-5-8', type: 'calcul',
      consigne:
        'RSTU est un parallélogramme, avec R(3 ; 1), S(8 ; 2) et T(9 ; 7). Calcule '
        + 'l\'ordonnée de U.',
      enonce: '\\text{ordonnée de } U', attendu: 6,
      fausses: [{ valeur: 8, piege: 'sens-de-translation-inverse' }],
      revoir: 'exemple',
    },
    {
      id: 't-10-5-9', type: 'vraifaux',
      consigne: 'Vrai ou faux ?',
      affirmation:
        'Si les diagonales d\'un quadrilatère non croisé se coupent en leur milieu, '
        + 'alors ce quadrilatère est un parallélogramme.',
      attendu: true,
      piege: 'parallelogramme-conclu-trop-vite', revoir: 'propriete',
    },
    {
      id: 't-10-5-10', type: 'trous',
      consigne:
        'On veut que KLMN soit un parallélogramme, avec K(−4 ; −1), L(0 ; −3) et '
        + 'M(3 ; 2). Donne les coordonnées de N.',
      enonce: 'N(\\square \\, ; \\, \\square)',
      champs: [
        { id: 'a', etiquette: 'abscisse de N', attendu: -1 },
        { id: 'b', etiquette: 'ordonnée de N', attendu: 4 },
      ],
      fausses: [
        { valeur: 7, piege: 'sens-de-translation-inverse' },
        { valeur: 0, piege: 'sens-de-translation-inverse' },
      ],
      revoir: 'exemple',
    },
  ],
};
