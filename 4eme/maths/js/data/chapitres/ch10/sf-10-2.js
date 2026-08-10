// Chapitre 10, savoir-faire 2 — Reconnaître une translation.
//
// ── Ce que le savoir-faire précédent ne fait pas ──────────────────────────
//
// En sf-10-1, la translation est ANNONCÉE : l'énoncé dit « par une
// translation », et il ne reste qu'à lire un déplacement et à l'appliquer.
// Ici on retire cette béquille. On donne des points et leurs images, sans
// nommer la transformation, et c'est à l'élève de trancher : translation,
// symétrie axiale, symétrie centrale ? Le programme demande exactement ça —
// identifier des translations dans des frises et des pavages.
//
// ── Pourquoi les coordonnées, et pas les figures ──────────────────────────
//
// L'application n'affiche aucun dessin, et pour une fois c'est un cadeau. Sur
// un dessin, « ça a glissé » ou « ça s'est retourné » se voit, et le critère
// mathématique n'est jamais mobilisé. Dans un repère, il n'y a rien à voir :
// il faut calculer les déplacements de plusieurs points et les comparer. Le
// geste est alors le bon, et il tient en une phrase — même déplacement pour
// tout le monde, ou ce n'est pas une translation.
//
// ── Le piège du moment, et ses deux neutres ──────────────────────────────
//
// « translation-et-symetrie-confondues ». Il est particulièrement retors ici
// parce que les trois transformations se ressemblent par tout ce qui saute
// aux yeux : elles conservent les longueurs, les angles, les aires, et deux
// d'entre elles envoient même une droite sur une droite parallèle. Un élève
// qui cherche « ce qui n'a pas changé » ne trouvera jamais de quoi les
// séparer. Ce qui sépare, c'est le déplacement — la seule chose qui varie.
//
// Deux motifs de surface menacent, d'où deux items neutres :
//   — « il y a un signe moins dans l'image, donc c'est une symétrie » :
//     l'item 5 est une vraie translation aux coordonnées bien négatives, et
//     l'item 3 est neutre pour la raison inverse (voir son commentaire) ;
//   — « je regarde les longueurs pour décider » : l'item 9 rend cette
//     stratégie explicitement inutile, et c'est tout son intérêt.

export default {
  id: 'sf-10-2',
  titre: 'Reconnaître une translation',
  attendus: [
    'Il identifie des translations dans des frises et des pavages.',
    'Il distingue une translation d\'une symétrie axiale et d\'une symétrie centrale.',
  ],

  // On ne dit pas « ce n'est pas une translation » : on fait calculer deux
  // déplacements qui ne coïncident pas, et le constat s'impose tout seul. Le
  // choix de la symétrie centrale n'est pas innocent — c'est celle qui
  // ressemble le plus à une translation, puisqu'elle ne retourne pas la
  // figure et conserve le parallélisme.
  decouvrir: {
    titre: 'Le déplacement qui ne tient pas en place',
    texte:
      'Un motif a été recopié plus loin dans un repère. Voici trois de ses '
      + 'points et les points correspondants sur la copie.',
    lignes: [
      { calcul: 'A(1 ; 2)', resultat: 'A′(−1 ; −2)' },
      { calcul: 'B(4 ; 2)', resultat: 'B′(−4 ; −2)' },
      { calcul: 'C(1 ; 5)', resultat: 'C′(−1 ; −5)' },
    ],
    question:
      'Calcule de combien change l\'abscisse quand on passe de A à A′, puis '
      + 'quand on passe de B à B′.',
    champs: [
      { id: 'a', etiquette: 'déplacement en abscisse, de A à A′ :', attendu: -2 },
      { id: 'b', etiquette: 'déplacement en abscisse, de B à B′ :', attendu: -8 },
    ],
    conclusion:
      'Les deux points ne subissent **pas** le même déplacement : −2 pour A, −8 '
      + 'pour B. Ce n\'est donc **pas une translation**, alors que le motif n\'a été '
      + 'ni tordu ni rétréci — AB mesurait 3, A′B′ mesure encore 3. Ici, chaque '
      + 'coordonnée est devenue son **opposée** : c\'est la **symétrie de centre O**. '
      + 'Retiens le geste : pour reconnaître une translation, on compare les '
      + 'déplacements de **plusieurs** points.',
  },

  cours: [
    {
      type: 'propriete',
      titre: 'Le critère : un seul et même déplacement',
      texte:
        'Une transformation est une **translation** lorsque le déplacement est '
        + 'le **même pour tous les points** : pour chaque point M(x ; y) et son '
        + 'image M′(x′ ; y′), les deux nombres x′ − x et y′ − y ne changent pas '
        + 'd\'un point à l\'autre.\n'
        + 'Un seul point ne décide donc de **rien** : n\'importe quel couple '
        + 'point/image se raconte comme une translation. Il en faut au moins '
        + '**deux**.',
    },
    {
      type: 'propriete',
      titre: 'Les trois transformations, lues sur les coordonnées',
      texte:
        '**Translation** de déplacement (a ; b) : M(x ; y) devient M′(x + a ; y + b).\n'
        + '**Symétrie d\'axe l\'axe des abscisses** : M(x ; y) devient M′(x ; −y). '
        + 'L\'abscisse ne bouge pas, l\'ordonnée change de signe.\n'
        + '**Symétrie d\'axe l\'axe des ordonnées** : M(x ; y) devient M′(−x ; y).\n'
        + '**Symétrie de centre O** : M(x ; y) devient M′(−x ; −y). Les deux '
        + 'coordonnées changent de signe.',
    },
    {
      // Le bloc décisif du savoir-faire : il dit ce qui NE sert à rien. Sans
      // lui, l'élève cherche une conservation qui trancherait, et il n'y en a
      // aucune — il finira par en inventer une.
      type: 'remarque',
      titre: 'Ce qui ne permet pas de trancher',
      texte:
        'Ces transformations conservent **toutes** les longueurs, les angles et '
        + 'les aires. Constater qu\'une longueur n\'a pas changé ne prouve donc '
        + '**rien** du tout : ça ne distingue pas une translation d\'une symétrie.\n'
        + 'La translation et la symétrie de centre O vont même plus loin : elles '
        + 'transforment une droite en une droite qui lui est **parallèle**. Là '
        + 'encore, les deux font pareil.\n'
        + 'Ce qui tranche, c\'est le **déplacement**, et lui seul.',
    },
    {
      type: 'remarque',
      titre: 'Les points qui restent en place',
      texte:
        'Un second contrôle, rapide : cherche un point qui ne bouge pas.\n'
        + 'Une translation qui déplace vraiment quelque chose n\'en laisse '
        + '**aucun**. La symétrie de centre O en laisse **un seul** : son centre. '
        + 'Une symétrie d\'axe en laisse **une infinité** : tous les points de son axe.',
    },
    {
      type: 'exemple',
      texte:
        'E(2 ; 7) devient E′(2 ; −7) et F(−3 ; 1) devient F′(−3 ; −1). Les '
        + 'déplacements valent (0 ; −14) et (0 ; −2) : ils diffèrent, ce n\'est pas '
        + 'une translation. Chaque ordonnée est devenue son opposée — c\'est la '
        + 'symétrie d\'axe l\'axe des abscisses.',
    },
  ],

  methode: {
    titre: 'Reconnaître la transformation à partir des coordonnées',
    enonce:
      'Une transformation envoie A(2 ; 1) sur A′(−2 ; 1), B(5 ; 3) sur B′(−5 ; 3) '
      + 'et C(2 ; 4) sur C′(−2 ; 4). Est-ce une translation ?',
    etapes: [
      {
        texte: 'Je calcule le déplacement de A à A′. En abscisse : −2 − 2 = −4. En ordonnée : 1 − 1 = 0.',
        note: 'Le déplacement se lit toujours de l\'original vers l\'image.',
      },
      {
        texte: 'Je recommence avec B. En abscisse : −5 − 5 = −10. En ordonnée : 3 − 3 = 0.',
        note: 'Le premier point n\'avait rien prouvé : c\'est le second qui décide.',
      },
      {
        texte: '−4 et −10 ne sont pas le même nombre. Les deux points ne subissent donc pas le même déplacement : ce n\'est pas une translation.',
        note: 'Une seule différence suffit à conclure — inutile de vérifier C pour ça.',
      },
      {
        texte: 'Je regarde alors ce qui se passe vraiment : chaque abscisse devient son opposée et chaque ordonnée reste la même. C\'est la symétrie d\'axe l\'axe des ordonnées.',
        note: 'C le confirme : 2 devient −2, et 4 ne bouge pas.',
      },
    ],
    controle:
      'Le contrôle : cherche un point qui ne bouge pas. Ici, tout point '
      + 'd\'abscisse 0 reste exactement à sa place — l\'axe des ordonnées est '
      + 'immobile tout entier, et une translation ne fait jamais ça. Et si tu as '
      + 'commencé par vérifier que les longueurs étaient conservées : elles le '
      + 'sont, mais elles l\'auraient été de toute façon. Cette vérification-là ne '
      + 'te dira jamais rien.',
  },

  entrainement: [
    {
      id: 'e-10-2-1', type: 'trous', palier: 1, piege: 'sens-de-translation-inverse',
      consigne:
        'Une transformation envoie A(1 ; 2) sur A′(5 ; 4), et B(3 ; 6) sur '
        + 'B′(7 ; 8). Calcule le déplacement en abscisse de chacun des deux points.',
      enonce: '\\text{de } A \\text{ à } A\' : \\square \\qquad \\text{de } B \\text{ à } B\' : \\square',
      champs: [
        { id: 'a', etiquette: 'déplacement en abscisse, de A à A′', attendu: 4 },
        { id: 'b', etiquette: 'déplacement en abscisse, de B à B′', attendu: 4 },
      ],
      // Lire le déplacement de l'image vers l'original donne −4 : c'est
      // exactement le bon nombre, avec le mauvais signe.
      fausses: [{ valeur: -4, piege: 'sens-de-translation-inverse' }],
    },
    {
      id: 'e-10-2-2', type: 'vraifaux', palier: 1, piege: 'translation-et-symetrie-confondues',
      consigne: 'Vrai ou faux ?',
      affirmation:
        'Une transformation envoie C(2 ; 5) sur C′(6 ; 1) et D(−1 ; 4) sur '
        + 'D′(3 ; 0). Cette transformation est une translation.',
      attendu: true,
    },
    {
      // Premier neutre. Le déplacement en abscisse vaut 3 − 3 = 0, et le lire à
      // l'envers donne encore 0 : le sens ne peut pas jouer, il n'y a pas de
      // signe à se tromper. L'item apprend en passant que deux déplacements
      // identiques SUR UNE SEULE coordonnée ne prouvent rien — ici les
      // abscisses concordent parfaitement, et pourtant ce n'est pas une
      // translation, comme les ordonnées le diront.
      id: 'e-10-2-3', type: 'calcul', palier: 1, neutre: true, piege: 'sens-de-translation-inverse',
      consigne:
        'Une transformation envoie E(3 ; 2) sur E′(3 ; −2), et F(5 ; 7) sur '
        + 'F′(5 ; −7). Calcule le déplacement en abscisse de E à E′.',
      enonce: '\\text{déplacement en abscisse, de } E \\text{ à } E\'',
      attendu: 0,
      fausses: [],
    },
    {
      id: 'e-10-2-4', type: 'plausible', palier: 2, piege: 'translation-et-symetrie-confondues',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Par une translation : } M(2 \\,;\\, 3) \\to M\'(-2 \\,;\\, -3)'
        + ' \\quad \\text{et} \\quad N(5 \\,;\\, 1) \\to N\'(-5 \\,;\\, -1)',
      attendu: false,
      explication:
        'Le déplacement de M vaut (−4 ; −6), celui de N vaut (−10 ; −2). Ils ne '
        + 'sont pas les mêmes, donc aucune translation ne peut faire ça. Ici chaque '
        + 'coordonnée est devenue son opposée : c\'est la symétrie de centre O.',
    },
    {
      // La contre-attaque du « il y a des moins, donc c'est une symétrie » :
      // une vraie translation, avec des coordonnées franchement négatives des
      // deux côtés. Seul le déplacement décide, et il est constant.
      id: 'e-10-2-5', type: 'plausible', palier: 2, piege: 'translation-et-symetrie-confondues',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Par une translation : } P(-3 \\,;\\, 4) \\to P\'(1 \\,;\\, -2)'
        + ' \\quad \\text{et} \\quad Q(0 \\,;\\, -5) \\to Q\'(4 \\,;\\, -11)',
      attendu: true,
      explication:
        'Les deux déplacements valent (+4 ; −6) : c\'est bien une seule et même '
        + 'translation. Les signes moins dans les coordonnées n\'y changent rien — '
        + 'ce n\'est pas la présence d\'un « moins » qui fait une symétrie, c\'est '
        + 'un déplacement qui varie d\'un point à l\'autre.',
    },
    {
      id: 'e-10-2-6', type: 'vraifaux', palier: 2, piege: 'translation-et-symetrie-confondues',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Si une transformation conserve la longueur de tous les segments, alors c\'est une translation.',
      attendu: false,
      contreExemple: {
        invite:
          'La symétrie d\'axe l\'axe des abscisses conserve elle aussi toutes les '
          + 'longueurs : elle garde l\'abscisse de chaque point et remplace son '
          + 'ordonnée par l\'opposée. Choisis une ordonnée non nulle, puis donne '
          + 'celle de son image par cette symétrie.',
        champs: [
          { id: 'a', etiquette: 'l\'ordonnée que tu choisis' },
          { id: 'b', etiquette: 'l\'ordonnée de son image' },
        ],
        // On vérifie la PROPRIÉTÉ — l'image a l'ordonnée opposée, et le point
        // n'est pas sur l'axe, sinon il ne bougerait pas et ne montrerait rien.
        // L'élève choisit son ordonnée : toutes conviennent sauf zéro.
        valide: (a, b) => Number.isFinite(a) && a !== 0 && b === -a,
        temoin: [6, -6],
        exemple:
          'Avec 6 : l\'image a pour ordonnée −6. Les points (1 ; 6) et (1 ; 2) '
          + 'deviennent alors (1 ; −6) et (1 ; −2), avec des déplacements en '
          + 'ordonnée de −12 et −4 : ils diffèrent, ce n\'est donc pas une '
          + 'translation. Les longueurs, elles, n\'ont pas bougé d\'un millimètre.',
      },
    },
    {
      id: 'e-10-2-7', type: 'corriger', palier: 2, piege: 'translation-et-symetrie-confondues',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: 'G(1 \\,;\\, 3) \\to G\'(1 \\,;\\, -3) \\qquad H(4 \\,;\\, 2) \\to H\'(4 \\,;\\, -2)',
      lignes: [
        { texte: 'Déplacement de G à G′ : 0 en abscisse et −6 en ordonnée.', fausse: false },
        { texte: 'Déplacement de H à H′ : 0 en abscisse et −4 en ordonnée.', fausse: false },
        { texte: 'Les abscisses ne bougent ni pour G ni pour H : c\'est donc une translation.', fausse: true },
      ],
      explication:
        'Les deux calculs sont justes : −3 − 3 = −6 et −2 − 2 = −4. C\'est la '
        + 'conclusion qui casse. Pour une translation, il faut que LES DEUX '
        + 'déplacements coïncident, pas seulement celui en abscisse — et −6 n\'est '
        + 'pas −4. Ici chaque ordonnée devient son opposée : c\'est la symétrie '
        + 'd\'axe l\'axe des abscisses.',
    },
    {
      // Le palier 3 demande d'aller au bout : identifier la règle, puis s'en
      // servir. Les réponses fausses sont celles d'un élève qui a lu un
      // déplacement sur S et l'a appliqué tel quel — le réflexe de sf-10-1,
      // parfaitement légitime là-bas, et faux ici.
      id: 'e-10-2-8', type: 'trous', palier: 3, piege: 'translation-et-symetrie-confondues',
      consigne:
        'Une transformation envoie S(4 ; −1) sur S′(−4 ; 1) et T(2 ; 5) sur '
        + 'T′(−2 ; −5). En appliquant à U(−6 ; 3) la même règle qu\'à S et T, '
        + 'donne les coordonnées de son image U′.',
      enonce: 'U\'(\\square \\, ; \\, \\square)',
      champs: [
        { id: 'a', etiquette: 'abscisse de U′', attendu: 6 },
        { id: 'b', etiquette: 'ordonnée de U′', attendu: -3 },
      ],
      fausses: [
        { valeur: -14, piege: 'translation-et-symetrie-confondues' },
        { valeur: 5, piege: 'translation-et-symetrie-confondues' },
      ],
    },
    {
      // Second neutre, et le plus utile du lot : on ne dit PAS quelle
      // transformation a été appliquée, et ça ne change strictement rien à la
      // réponse. Le piège translation/symétrie ne peut pas jouer, puisque les
      // trois conservent les longueurs. C'est l'item qui prouve à l'élève que
      // « je regarde si les longueurs ont changé » ne décidera jamais rien —
      // et il l'apprend en réussissant, pas en se trompant.
      id: 'e-10-2-9', type: 'calcul', palier: 3, neutre: true, piege: 'translation-et-symetrie-confondues',
      consigne:
        'Un segment [VW] mesure 7,5 cm. On lui applique une transformation sans '
        + 'dire laquelle : c\'est soit une translation, soit une symétrie d\'axe, '
        + 'soit une symétrie de centre O. Calcule V′W′, en cm.',
      enonce: 'V\'W\'',
      attendu: 7.5,
      fausses: [
        { valeur: 15, piege: 'conservation-mal-attribuee' },
        { valeur: 3.75, piege: 'conservation-mal-attribuee' },
      ],
    },
    {
      id: 'e-10-2-10', type: 'vraifaux', palier: 3, piege: 'translation-et-symetrie-confondues',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Si chaque point et son image ont la même ordonnée, alors la transformation est une translation.',
      attendu: false,
      contreExemple: {
        invite:
          'La symétrie d\'axe l\'axe des ordonnées garde l\'ordonnée de chaque '
          + 'point et remplace son abscisse par l\'opposée. Choisis une abscisse '
          + 'non nulle, puis donne celle de son image par cette symétrie.',
        champs: [
          { id: 'a', etiquette: 'l\'abscisse que tu choisis' },
          { id: 'b', etiquette: 'l\'abscisse de son image' },
        ],
        // Même esprit qu'à l'item 6, mais sur l'autre coordonnée : c'est la
        // seconde signature à installer. Zéro est écarté parce qu'un point de
        // l'axe reste immobile et ne réfute rien.
        valide: (a, b) => Number.isFinite(a) && a !== 0 && b === -a,
        temoin: [5, -5],
        exemple:
          'Avec 5 : l\'image a pour abscisse −5. Les points (5 ; 2) et (−1 ; 2) '
          + 'deviennent (−5 ; 2) et (1 ; 2), avec des déplacements en abscisse de '
          + '−10 et +2 : différents. Toutes les ordonnées sont pourtant restées '
          + 'les mêmes — une coordonnée qui ne bouge pas ne fait pas une translation.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-10-2-1',
      enonce:
        'Un pavage recouvre un sol avec toujours le même carreau, sans jamais le '
        + 'tourner ni le retourner : chaque carreau se déduit de son voisin par une '
        + 'translation. Le sommet A(0 ; 0) d\'un carreau se retrouve en (4 ; 0) sur '
        + 'le carreau voisin de droite, et en (0 ; 3) sur le carreau voisin du dessus.',
      questions: [
        { texte: 'Quelle est l\'abscisse de ce sommet sur le carreau situé deux crans à droite ?', attendu: 8 },
        { texte: 'On part du carreau de départ, on va d\'un cran à droite, puis d\'un cran vers le haut. Quelle est alors l\'abscisse de ce sommet ?', attendu: 4 },
        { texte: 'Et quelle est son ordonnée ?', attendu: 3 },
      ],
    },
    {
      // Les deux transformations sont données par leur effet sur les
      // coordonnées, sans être nommées : c'est la lecture que le programme
      // demande, et la troisième question fait travailler le point fixe —
      // le contrôle rapide du cours.
      id: 'p-10-2-2',
      enonce:
        'Un logiciel de dessin propose deux boutons. Le bouton 1 envoie tout point '
        + 'M(x ; y) sur le point de coordonnées (x + 6 ; y − 2). Le bouton 2 envoie '
        + 'tout point M(x ; y) sur le point de coordonnées (−x ; −y). On part du '
        + 'point A(4 ; 3).',
      questions: [
        { texte: 'Quelle est l\'abscisse de l\'image de A par le bouton 1 ?', attendu: 10 },
        { texte: 'Quelle est l\'ordonnée de l\'image de A par le bouton 2 ?', attendu: -3 },
        { texte: 'Un seul des deux boutons laisse un point du plan exactement à sa place. Quelle est l\'abscisse de ce point ?', attendu: 0 },
      ],
    },
    {
      id: 'p-10-2-3',
      enonce:
        'Un carreleur affirme avoir posé le second motif à partir du premier par une '
        + 'simple translation. Sur le premier motif : P(2 ; 1), Q(6 ; 1) et R(2 ; 4). '
        + 'Sur le second : P′(2 ; −1), Q′(6 ; −1) et R′(2 ; −4).',
      questions: [
        { texte: 'De combien varie l\'ordonnée quand on passe de P à P′ ?', attendu: -2 },
        { texte: 'De combien varie l\'ordonnée quand on passe de R à R′ ?', attendu: -8 },
        { texte: 'Ce n\'est donc pas une translation. On code 1 pour « symétrie d\'axe l\'axe des abscisses » et 2 pour « symétrie de centre O ». Quel code donnes-tu ?', attendu: 1 },
      ],
    },
    {
      id: 'p-10-2-4',
      enonce:
        'Sur une frise, un motif est reproduit encore et encore, chaque fois par la '
        + 'même translation. Un sommet S a pour abscisse 0 sur le premier motif, 3 sur '
        + 'le deuxième, 6 sur le troisième, et ainsi de suite. Son ordonnée vaut 2 et '
        + 'ne change jamais.',
      questions: [
        { texte: 'Quelle est l\'abscisse de S sur le cinquième motif ?', attendu: 12 },
        { texte: 'Un autre sommet a pour abscisse 1 sur le premier motif. Quelle est son abscisse sur le quatrième motif ?', attendu: 10 },
        { texte: 'Quelle est l\'ordonnée de S sur le quatrième motif ?', attendu: 2 },
      ],
    },
    {
      // Le problème qui démonte le raccourci le plus fréquent, en le citant
      // dans la bouche d'un élève plutôt qu'en le corrigeant d'avance.
      id: 'p-10-2-5',
      enonce:
        'Une élève affirme : « Dès que les coordonnées de l\'image contiennent des '
        + 'signes moins, c\'est une symétrie. » On observe une transformation qui '
        + 'envoie D(2 ; 1) sur D′(−3 ; −2) et E(5 ; 4) sur E′(0 ; 1).',
      questions: [
        { texte: 'De combien varie l\'abscisse quand on passe de D à D′ ?', attendu: -5 },
        { texte: 'De combien varie l\'abscisse quand on passe de E à E′ ?', attendu: -5 },
        { texte: 'C\'est bien la même translation pour les deux points, de déplacement (−5 ; −3). Quelle est l\'ordonnée de l\'image du point F(−1 ; 6) ?', attendu: 3 },
      ],
    },
  ],

  test: [
    {
      id: 't-10-2-1', type: 'trous',
      consigne: 'Une transformation envoie A(1 ; 4) sur A′(5 ; 2). Calcule le déplacement en abscisse, puis en ordonnée.',
      enonce: '\\text{abscisse} : \\square \\qquad \\text{ordonnée} : \\square',
      champs: [
        { id: 'a', etiquette: 'déplacement en abscisse', attendu: 4 },
        { id: 'b', etiquette: 'déplacement en ordonnée', attendu: -2 },
      ],
      fausses: [
        { valeur: -4, piege: 'sens-de-translation-inverse' },
        { valeur: 2, piege: 'sens-de-translation-inverse' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-10-2-2', type: 'vraifaux',
      consigne: 'Vrai ou faux ?',
      affirmation:
        'Une transformation envoie B(3 ; 1) sur B′(0 ; 5) et C(−2 ; 6) sur '
        + 'C′(−5 ; 10). Cette transformation est une translation.',
      attendu: true,
      piege: 'translation-et-symetrie-confondues',
      revoir: 'propriete',
    },
    {
      id: 't-10-2-3', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Par une translation : } D(1 \\,;\\, 3) \\to D\'(1 \\,;\\, -3)'
        + ' \\quad \\text{et} \\quad E(4 \\,;\\, 9) \\to E\'(4 \\,;\\, -9)',
      attendu: false,
      explication:
        'Les déplacements en ordonnée valent −6 pour D et −18 pour E : ils '
        + 'diffèrent, donc ce n\'est pas une translation. Chaque ordonnée est '
        + 'devenue son opposée — c\'est la symétrie d\'axe l\'axe des abscisses.',
      piege: 'translation-et-symetrie-confondues',
      revoir: 'propriete',
    },
    {
      id: 't-10-2-4', type: 'calcul',
      consigne: 'Une transformation envoie tout point M(x ; y) sur le point de coordonnées (−x ; −y). Calcule l\'ordonnée de l\'image de F(3 ; −8).',
      enonce: '\\text{ordonnée de } F\'',
      attendu: 8,
      fausses: [{ valeur: -8, piege: 'translation-et-symetrie-confondues' }],
      revoir: 'propriete',
    },
    {
      id: 't-10-2-5', type: 'calcul',
      consigne: 'Une symétrie de centre O transforme le segment [GH] en [G′H′], avec GH = 9,2 cm. Calcule G′H′, en cm.',
      enonce: 'G\'H\'',
      attendu: 9.2,
      fausses: [{ valeur: 18.4, piege: 'conservation-mal-attribuee' }],
      revoir: 'remarque',
    },
    {
      id: 't-10-2-6', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Par une translation : } K(-4 \\,;\\, 1) \\to K\'(-1 \\,;\\, -3)'
        + ' \\quad \\text{et} \\quad L(2 \\,;\\, 5) \\to L\'(5 \\,;\\, 1)',
      attendu: true,
      explication:
        'Les deux déplacements valent (+3 ; −4) : c\'est une seule et même '
        + 'translation. Des coordonnées négatives ne signalent pas une symétrie.',
      revoir: 'exemple',
    },
    {
      id: 't-10-2-7', type: 'trous',
      consigne:
        'Une transformation envoie P(3 ; 2) sur P′(−3 ; 2) et Q(5 ; −4) sur '
        + 'Q′(−5 ; −4). En appliquant la même règle, donne les coordonnées de '
        + 'l\'image de R(−1 ; 6).',
      enonce: 'R\'(\\square \\, ; \\, \\square)',
      champs: [
        { id: 'a', etiquette: 'abscisse de R′', attendu: 1 },
        { id: 'b', etiquette: 'ordonnée de R′', attendu: 6 },
      ],
      fausses: [
        { valeur: -7, piege: 'translation-et-symetrie-confondues' },
        { valeur: -6, piege: 'translation-et-symetrie-confondues' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-10-2-8', type: 'vraifaux',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Une translation et une symétrie de centre O ne peuvent jamais donner la même image d\'un même point.',
      attendu: false,
      contreExemple: {
        invite:
          'Choisis une abscisse non nulle. Donne ensuite le déplacement en '
          + 'abscisse qu\'une translation devrait appliquer pour envoyer ce point '
          + 'exactement là où la symétrie de centre O l\'envoie.',
        champs: [
          { id: 'a', etiquette: 'l\'abscisse que tu choisis' },
          { id: 'b', etiquette: 'le déplacement en abscisse de la translation' },
        ],
        // La propriété vérifiée : pour passer de x à −x, il faut ajouter −2x.
        // Vrai pour toute abscisse non nulle, donc l'élève choisit la sienne.
        valide: (a, b) => Number.isFinite(a) && a !== 0 && b === -2 * a,
        temoin: [3, -6],
        exemple:
          'Avec l\'abscisse 3 : la symétrie de centre O l\'envoie sur −3, donc une '
          + 'translation de déplacement −6 en abscisse donne exactement le même '
          + 'point. Sur CE point les deux transformations se confondent — c\'est '
          + 'sur le point suivant qu\'elles se séparent. Voilà pourquoi un seul '
          + 'point ne décide jamais de rien.',
      },
      piege: 'translation-et-symetrie-confondues',
      revoir: 'propriete',
    },
    {
      id: 't-10-2-9', type: 'calcul',
      consigne:
        'Sur une frise, chaque motif se déduit du précédent par la même '
        + 'translation. Un sommet a pour abscisse 2 sur le premier motif et 7 sur '
        + 'le deuxième. Calcule son abscisse sur le quatrième motif.',
      enonce: '\\text{abscisse sur le quatrième motif}',
      attendu: 17,
      fausses: [{ valeur: -13, piege: 'sens-de-translation-inverse' }],
      revoir: 'exemple',
    },
    {
      id: 't-10-2-10', type: 'vraifaux',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Une translation et une symétrie de centre O conservent toutes les deux les longueurs, les angles et les aires.',
      attendu: true,
      piege: 'conservation-mal-attribuee',
      revoir: 'remarque',
    },
  ],
};
