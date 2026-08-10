// Chapitre 10, savoir-faire 1 — Construire l'image d'un point par une translation.
//
// ── Pourquoi tout passe par les coordonnées ───────────────────────────────
//
// L'application n'affiche aucune figure. En géométrie c'est une contrainte,
// mais ici elle tombe bien : sur un dessin, l'image d'un point se « voit » —
// on pose la règle, on reporte, et le geste réussit sans qu'aucune idée soit
// mobilisée. Dans un repère, le déplacement doit être LU sur un couple
// point/image, écrit comme un couple de nombres, puis APPLIQUÉ. Trois étapes,
// dont deux sont invisibles sur une feuille quadrillée.
//
// Le déplacement est donc toujours donné de la même façon : un point, son
// image, et à l'élève de trouver de combien on a bougé. C'est la seule
// information dont il dispose, et c'est celle qui porte le piège.
//
// ── Le piège du moment, et ses deux neutres ───────────────────────────────
//
// « sens-de-translation-inverse » : le déplacement se lit de l'original vers
// l'image, jamais l'inverse. Confondre les deux, c'est appliquer −5 là où il
// fallait +5 — une erreur qui produit un point parfaitement plausible, jamais
// absurde, donc jamais repérée toute seule. D'où l'insistance sur le contrôle :
// on revérifie le déplacement SUR le couple de départ avant de s'en servir.
//
// Deux items neutres, parce que deux motifs de surface menacent :
//   — « je cherche toujours deux points et je fais la différence » : l'item 3
//     donne le déplacement en toutes lettres, il n'y a rien à lire ;
//   — « les deux coordonnées bougent forcément » : l'item 6 a un déplacement
//     purement horizontal, et l'ordonnée demandée ne change pas — ajouter ou
//     retirer zéro donne le même résultat, le sens ne peut donc pas jouer.

export default {
  id: 'sf-10-1',
  titre: 'Construire l\'image d\'un point par une translation',
  attendus: [
    'Il transforme un point, un segment, une figure par translation.',
    'Il détermine les coordonnées de l\'image d\'un point par une translation donnée.',
  ],

  // On ne dit pas ce qu'est une translation : on donne trois points et leurs
  // images, et l'élève constate que le même couple de nombres revient à chaque
  // ligne. Le mot « translation » n'arrive qu'au cours, une fois le geste fait.
  decouvrir: {
    titre: 'Le même glissement pour tout le monde',
    texte:
      'Un motif est recopié plus loin sur une frise, sans être tourné ni '
      + 'retourné : il a seulement glissé. Voici trois de ses points, repérés dans '
      + 'un repère, et les points correspondants sur la copie.',
    lignes: [
      // Le mot « point » n'est pas décoratif : sans lui, le rendu relie les deux
      // colonnes par un « = » et affiche « A(1 ; 3) = A′(6 ; 1) », qui est faux.
      { calcul: 'le point A(1 ; 3)', resultat: 'A′(6 ; 1)' },
      { calcul: 'le point B(4 ; 3)', resultat: 'B′(9 ; 1)' },
      { calcul: 'le point C(1 ; 7)', resultat: 'C′(6 ; 5)' },
    ],
    question:
      'Compare chaque point à son image : de combien change l\'abscisse ? et '
      + 'l\'ordonnée ? Applique le même changement à D(2 ; 6).',
    champs: [
      { id: 'a', etiquette: 'abscisse de D′ :', attendu: 7 },
      { id: 'b', etiquette: 'ordonnée de D′ :', attendu: 4 },
    ],
    conclusion:
      'Le déplacement est **le même pour tous les points** : +5 en abscisse et '
      + '−2 en ordonnée. C\'est ça, une **translation** — un glissement, sans '
      + 'rotation ni retournement. Une fois ce couple de nombres lu sur un seul '
      + 'point et son image, il s\'applique tel quel à tous les autres.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Translation',
      texte:
        'Une **translation** fait **glisser** toute une figure : chaque point se '
        + 'déplace dans la **même direction**, dans le **même sens** et de la '
        + '**même longueur**.\n'
        + 'Dans un repère, ce déplacement s\'écrit avec deux nombres : ce qu\'on '
        + 'ajoute à l\'abscisse, et ce qu\'on ajoute à l\'ordonnée. Il se lit sur '
        + 'n\'importe quel couple formé d\'un point et de son image.',
    },
    {
      type: 'propriete',
      titre: 'Coordonnées de l\'image',
      texte:
        'Si le déplacement vaut **+a en abscisse** et **+b en ordonnée**, alors '
        + 'l\'image de M(x ; y) est le point M′(x + a ; y + b).\n'
        + 'Le même couple (a ; b) s\'ajoute aux coordonnées de **tous** les points : '
        + 'c\'est ce qui distingue une translation de n\'importe quel autre '
        + 'déplacement.',
    },
    {
      type: 'propriete',
      titre: 'Ce qu\'une translation conserve',
      texte:
        'Une translation conserve les **longueurs**, les **angles**, les **aires**, '
        + 'le **parallélisme** et l\'**alignement**. La figure image est superposable '
        + 'à la figure de départ, et dans le même sens.\n'
        + 'Autrement dit : **seule la position change**.',
    },
    {
      type: 'remarque',
      titre: 'Le déplacement a un sens',
      texte:
        'Il se lit **de l\'original vers l\'image**, dans cet ordre. Repère bien '
        + 'lequel des deux points part et lequel arrive : les deux se ressemblent '
        + 'sur le papier, mais ils ne jouent pas le même rôle.\n'
        + 'Et quand on connaît l\'image et qu\'on cherche l\'original, il faut faire '
        + 'le chemin **inverse** : retirer ce qu\'on avait ajouté.',
    },
    {
      type: 'exemple',
      texte:
        'Déplacement de +4 en abscisse et −3 en ordonnée : l\'image de M(2 ; 5) '
        + 'est M′(6 ; 2), et celle de N(−1 ; 0) est N′(3 ; −3).',
    },
  ],

  methode: {
    titre: 'Trouver les coordonnées d\'une image',
    enonce: 'Par une translation, A(−2 ; 4) a pour image A′(3 ; 2). Quelle est l\'image de B(5 ; −1) ?',
    etapes: [
      {
        texte: 'Je lis le déplacement en abscisse, de A vers A′ : on passe de −2 à 3, donc on ajoute 5.',
        note: '3 − (−2) = 5. Je pars du point, j\'arrive à l\'image — jamais l\'inverse.',
      },
      {
        texte: 'Je lis le déplacement en ordonnée : on passe de 4 à 2, donc on retire 2.',
        note: '2 − 4 = −2. Le déplacement s\'écrit donc (+5 ; −2).',
      },
      {
        texte: 'J\'applique ce même déplacement à B. Abscisse : 5 + 5 = 10.',
        note: 'Le déplacement ne change pas d\'un point à l\'autre, c\'est toute l\'idée.',
      },
      {
        texte: 'Ordonnée : −1 + (−2) = −3. Donc l\'image de B est B′(10 ; −3).',
        note: '',
      },
    ],
    controle:
      'Le contrôle : reteste ton déplacement sur le couple de départ, dans le bon '
      + 'sens. Pars de A(−2 ; 4), ajoute +5 et −2 : tu dois retomber exactement sur '
      + 'A′(3 ; 2). Si c\'est en soustrayant que tu retombes dessus, c\'est que tu as '
      + 'lu le déplacement à l\'envers — et tous tes autres points seront faux de la '
      + 'même façon.',
  },

  entrainement: [
    {
      id: 'e-10-1-1', type: 'trous', palier: 1, piege: 'sens-de-translation-inverse',
      consigne:
        'Par une translation, A(2 ; 1) a pour image A′(7 ; 4). Donne les coordonnées '
        + 'de l\'image de B(4 ; 2).',
      enonce: 'B\'(\\square \\, ; \\, \\square)',
      champs: [
        { id: 'a', etiquette: 'abscisse de B′', attendu: 9 },
        { id: 'b', etiquette: 'ordonnée de B′', attendu: 5 },
      ],
      // 4 − 5 et 2 − 3 donnent tous deux −1 : le déplacement appliqué à l'envers
      // se reconnaît sur l'une ou l'autre coordonnée.
      fausses: [{ valeur: -1, piege: 'sens-de-translation-inverse' }],
    },
    {
      id: 'e-10-1-2', type: 'calcul', palier: 1, piege: 'sens-de-translation-inverse',
      consigne:
        'Par une translation, C(1 ; 5) a pour image C′(6 ; 2). Calcule l\'ordonnée '
        + 'de l\'image de D(4 ; 9).',
      enonce: '\\text{ordonnée de } D\'', attendu: 6,
      fausses: [{ valeur: 12, piege: 'sens-de-translation-inverse' }],
    },
    {
      // Premier neutre : le déplacement est donné en toutes lettres, il n'y a
      // aucun couple point/image à lire. Le piège du sens ne peut donc pas jouer
      // — rien n'est orienté, rien ne peut être pris à l'envers. Sans cet item,
      // « je cherche deux points et je fais la différence » deviendrait le seul
      // geste connu, et une translation annoncée autrement bloquerait tout.
      id: 'e-10-1-3', type: 'trous', palier: 1, neutre: true, piege: 'sens-de-translation-inverse',
      consigne:
        'Cette translation ajoute 4 à l\'abscisse et retire 3 à l\'ordonnée. Donne '
        + 'les coordonnées de l\'image de E(2 ; 8).',
      enonce: 'E\'(\\square \\, ; \\, \\square)',
      champs: [
        { id: 'a', etiquette: 'abscisse de E′', attendu: 6 },
        { id: 'b', etiquette: 'ordonnée de E′', attendu: 5 },
      ],
      fausses: [],
    },
    {
      id: 'e-10-1-4', type: 'trous', palier: 2, piege: 'sens-de-translation-inverse',
      consigne:
        'Par une translation, F(−3 ; 2) a pour image F′(1 ; −4). Donne les '
        + 'coordonnées de l\'image de G(5 ; −2).',
      enonce: 'G\'(\\square \\, ; \\, \\square)',
      champs: [
        { id: 'a', etiquette: 'abscisse de G′', attendu: 9 },
        { id: 'b', etiquette: 'ordonnée de G′', attendu: -8 },
      ],
      // Déplacement (+4 ; −6) : l'appliquer à l'envers donne (1 ; 4). Aucune de
      // ces deux valeurs n'est atteignable par un autre égarement — la
      // symétrique de G donnerait (−5 ; 2) —, le piège servi est donc le bon.
      fausses: [
        { valeur: 1, piege: 'sens-de-translation-inverse' },
        { valeur: 4, piege: 'sens-de-translation-inverse' },
      ],
    },
    {
      // Le chemin inverse : on donne l'image, on cherche l'original. C'est là
      // que le sens du déplacement se paie comptant — appliquer (+3 ; −4) au
      // lieu de le retirer donne un point tout à fait présentable, et faux.
      id: 'e-10-1-5', type: 'calcul', palier: 2, piege: 'sens-de-translation-inverse',
      consigne:
        'Par une translation, H(2 ; 3) a pour image H′(−1 ; 7). Le point K′(4 ; 5) '
        + 'est l\'image d\'un point K. Calcule l\'abscisse de K.',
      enonce: '\\text{abscisse de } K', attendu: 7,
      fausses: [{ valeur: 1, piege: 'sens-de-translation-inverse' }],
    },
    {
      // Second neutre : le déplacement est purement horizontal (+8 ; 0), et on
      // demande l'ordonnée. Ajouter 0 ou retirer 0 donne le même nombre : le
      // sens ne joue vraiment pas. Sans cet item, « les deux coordonnées bougent
      // forcément » resterait une évidence, et un élève qui trouve l'ordonnée
      // inchangée croirait s'être trompé.
      id: 'e-10-1-6', type: 'calcul', palier: 2, neutre: true, piege: 'sens-de-translation-inverse',
      consigne:
        'Par une translation, P(1 ; 4) a pour image P′(9 ; 4). Calcule l\'ordonnée '
        + 'de l\'image de Q(−3 ; −5).',
      enonce: '\\text{ordonnée de } Q\'', attendu: -5,
      fausses: [],
    },
    {
      id: 'e-10-1-7', type: 'calcul', palier: 2, piege: 'conservation-mal-attribuee',
      consigne:
        'Une translation transforme le segment [RS] en le segment [R′S′]. On sait '
        + 'que RS = 6,4 cm. Calcule R′S′, en cm.',
      enonce: 'R\'S\'', attendu: 6.4,
      fausses: [
        { valeur: 12.8, piege: 'conservation-mal-attribuee' },
        { valeur: 3.2, piege: 'conservation-mal-attribuee' },
      ],
    },
    {
      // Les fausses sont ici les coordonnées de la symétrique de M par rapport à
      // l'origine : c'est exactement ce que produit « la figure se retourne ».
      // M ne peut pas avoir de coordonnée nulle, sinon la symétrique partage
      // cette coordonnée avec M et la fausse ne révèle plus rien ; et il faut
      // que (−1 ; 3) reste distinct du (−4 ; 1) qu'obtient l'élève qui lit le
      // déplacement à l'envers, sans quoi c'est la mauvaise règle qui lui est
      // servie.
      id: 'e-10-1-8', type: 'trous', palier: 3, piege: 'translation-et-symetrie-confondues',
      consigne:
        'Par une translation, L(−2 ; 3) a pour image L′(3 ; −1). Donne les '
        + 'coordonnées de l\'image de M(1 ; −3).',
      enonce: 'M\'(\\square \\, ; \\, \\square)',
      champs: [
        { id: 'a', etiquette: 'abscisse de M′', attendu: 6 },
        { id: 'b', etiquette: 'ordonnée de M′', attendu: -7 },
      ],
      fausses: [
        { valeur: -1, piege: 'translation-et-symetrie-confondues' },
        { valeur: 3, piege: 'translation-et-symetrie-confondues' },
      ],
    },
    {
      // Deux points différents, une seule translation : l'item ne se réussit que
      // si le déplacement a été compris comme une donnée valable partout, et pas
      // comme un calcul refait à chaque question.
      id: 'e-10-1-9', type: 'trous', palier: 3, piege: 'sens-de-translation-inverse',
      consigne:
        'Par une translation, N(4 ; −2) a pour image N′(−1 ; 3). Les points '
        + 'T(6 ; 0) et U(−5 ; 8) ont pour images T′ et U′. Complète.',
      enonce: 'T\'(\\square \\, ; \\, 5) \\qquad U\'(-10 \\, ; \\, \\square)',
      champs: [
        { id: 'a', etiquette: 'abscisse de T′', attendu: 1 },
        { id: 'b', etiquette: 'ordonnée de U′', attendu: 13 },
      ],
      fausses: [
        { valeur: 11, piege: 'sens-de-translation-inverse' },
        { valeur: 3, piege: 'sens-de-translation-inverse' },
      ],
    },
    {
      id: 'e-10-1-10', type: 'calcul', palier: 3, piege: 'conservation-mal-attribuee',
      consigne:
        'Une translation transforme le rectangle VWXY en V′W′X′Y′. Le rectangle '
        + 'VWXY a pour longueur 9 cm et pour largeur 4 cm. Calcule l\'aire de '
        + 'V′W′X′Y′, en cm².',
      enonce: '\\text{aire de } V\'W\'X\'Y\'', attendu: 36,
      fausses: [
        { valeur: 72, piege: 'conservation-mal-attribuee' },
        { valeur: 18, piege: 'conservation-mal-attribuee' },
      ],
    },
  ],

  problemes: [
    {
      id: 'p-10-1-1',
      enonce:
        'Sur une frise de carrelage, un motif est reproduit à l\'identique en le '
        + 'faisant glisser horizontalement. Le sommet A(1 ; 2) du premier motif '
        + 'devient A′(4 ; 2) sur le second.',
      questions: [
        { texte: 'De combien d\'unités le motif glisse-t-il en abscisse ?', attendu: 3 },
        { texte: 'Un autre sommet du premier motif est B(3 ; 5). Quelle est l\'abscisse de son image B′ ?', attendu: 6 },
        { texte: 'Quelle est l\'ordonnée de B′ ?', attendu: 5 },
      ],
    },
    {
      id: 'p-10-1-2',
      enonce:
        'Dans un jeu, un vaisseau occupe la case de coordonnées (7 ; 3). Le joueur '
        + 'lance un déplacement qui l\'amène en (2 ; 6). Toutes les pièces accrochées '
        + 'au vaisseau subissent exactement le même déplacement.',
      questions: [
        { texte: 'De combien varie l\'abscisse au cours de ce déplacement ?', attendu: -5 },
        { texte: 'De combien varie l\'ordonnée ?', attendu: 3 },
        { texte: 'Un réacteur se trouvait en (8 ; 1). Quelle est son abscisse après le déplacement ?', attendu: 3 },
      ],
    },
    {
      // Le problème où l'on remonte le déplacement : la machine a gravé, on
      // cherche ce qu'il y avait sur le modèle. Même translation, sens opposé.
      id: 'p-10-1-3',
      enonce:
        'Une machine à graver décale toujours ses motifs de la même façon : le '
        + 'point de repère (0 ; 0) du modèle se retrouve gravé en (6 ; −2). Un motif '
        + 'a été gravé avec un sommet en (10 ; 5).',
      questions: [
        { texte: 'Quelle est l\'abscisse du sommet correspondant sur le modèle de départ ?', attendu: 4 },
        { texte: 'Quelle est son ordonnée ?', attendu: 7 },
      ],
    },
    {
      id: 'p-10-1-4',
      enonce:
        'Un logiciel de dessin déplace une figure par translation. Le triangle de '
        + 'départ a pour côtés 5 cm, 6 cm et 9 cm, et son plus grand angle mesure '
        + 'environ 109°.',
      questions: [
        { texte: 'Combien mesure, en cm, le plus grand côté du triangle image ?', attendu: 9, unite: 'cm' },
        { texte: 'Combien mesure, en degrés, le plus grand angle du triangle image ?', attendu: 109, unite: '°' },
        { texte: 'Quel est le périmètre du triangle image, en cm ?', attendu: 20, unite: 'cm' },
      ],
    },
    {
      id: 'p-10-1-5',
      enonce:
        'Un dessinateur affirme avoir déplacé un motif par translation. Sur le motif '
        + 'de départ, trois sommets : P(1 ; 1), Q(4 ; 2) et R(2 ; 5). Sur le motif '
        + 'obtenu : P′(5 ; 0), Q′(8 ; 1) et R′(6 ; 4).',
      questions: [
        { texte: 'De combien varie l\'abscisse quand on passe de P à P′ ?', attendu: 4 },
        { texte: 'De combien varie l\'ordonnée quand on passe de P à P′ ?', attendu: -1 },
        { texte: 'Un quatrième sommet S(−2 ; 3) suit le même déplacement. Quelle est l\'ordonnée de S′ ?', attendu: 2 },
      ],
    },
  ],

  test: [
    {
      id: 't-10-1-1', type: 'calcul',
      consigne: 'Par une translation, A(0 ; 0) a pour image A′(3 ; 7). Calcule l\'abscisse de l\'image de B(5 ; 1).',
      enonce: '\\text{abscisse de } B\'', attendu: 8,
      fausses: [{ valeur: 2, piege: 'sens-de-translation-inverse' }],
      revoir: 'propriete',
    },
    {
      id: 't-10-1-2', type: 'trous',
      consigne: 'Par une translation, C(2 ; 5) a pour image C′(6 ; 1). Donne les coordonnées de l\'image de D(−3 ; 4).',
      enonce: 'D\'(\\square \\, ; \\, \\square)',
      champs: [
        { id: 'a', etiquette: 'abscisse de D′', attendu: 1 },
        { id: 'b', etiquette: 'ordonnée de D′', attendu: 0 },
      ],
      fausses: [
        { valeur: -7, piege: 'sens-de-translation-inverse' },
        { valeur: 8, piege: 'sens-de-translation-inverse' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-10-1-3', type: 'calcul',
      consigne: 'Par une translation, E(−4 ; 1) a pour image E′(−1 ; −2). Calcule l\'ordonnée de l\'image de F(3 ; 6).',
      enonce: '\\text{ordonnée de } F\'', attendu: 3,
      fausses: [{ valeur: 9, piege: 'sens-de-translation-inverse' }],
      revoir: 'exemple',
    },
    {
      id: 't-10-1-4', type: 'calcul',
      consigne: 'Une translation transforme le segment [GH] en [G′H′], avec GH = 12,5 cm. Calcule G′H′, en cm.',
      enonce: 'G\'H\'', attendu: 12.5,
      fausses: [{ valeur: 25, piege: 'conservation-mal-attribuee' }],
      revoir: 'propriete',
    },
    {
      id: 't-10-1-5', type: 'trous',
      consigne:
        'Par une translation, I(1 ; 1) a pour image I′(−2 ; 5). Le point J′(0 ; 0) '
        + 'est l\'image d\'un point J. Donne les coordonnées de J.',
      enonce: 'J(\\square \\, ; \\, \\square)',
      champs: [
        { id: 'a', etiquette: 'abscisse de J', attendu: 3 },
        { id: 'b', etiquette: 'ordonnée de J', attendu: -4 },
      ],
      fausses: [
        { valeur: -3, piege: 'sens-de-translation-inverse' },
        { valeur: 4, piege: 'sens-de-translation-inverse' },
      ],
      revoir: 'remarque',
    },
    {
      id: 't-10-1-6', type: 'calcul',
      consigne: 'Par une translation, K(6 ; −3) a pour image K′(6 ; 2). Calcule l\'abscisse de l\'image de L(−8 ; 4).',
      enonce: '\\text{abscisse de } L\'', attendu: -8,
      revoir: 'definition',
    },
    {
      id: 't-10-1-7', type: 'trous',
      consigne:
        'Cette translation retire 7 à l\'abscisse et ajoute 2 à l\'ordonnée. Donne '
        + 'les coordonnées de l\'image de M(3 ; −5).',
      enonce: 'M\'(\\square \\, ; \\, \\square)',
      champs: [
        { id: 'a', etiquette: 'abscisse de M′', attendu: -4 },
        { id: 'b', etiquette: 'ordonnée de M′', attendu: -3 },
      ],
      revoir: 'definition',
    },
    {
      id: 't-10-1-8', type: 'calcul',
      consigne:
        'Une translation transforme un rectangle de 7 cm de longueur et 3 cm de '
        + 'largeur. Calcule l\'aire du rectangle image, en cm².',
      enonce: '\\text{aire de l\'image}', attendu: 21,
      fausses: [{ valeur: 42, piege: 'conservation-mal-attribuee' }],
      revoir: 'propriete',
    },
    {
      id: 't-10-1-9', type: 'trous',
      consigne: 'Par une translation, N(2 ; 2) a pour image N′(−3 ; 5). Donne les coordonnées de l\'image de P(3 ; −2).',
      enonce: 'P\'(\\square \\, ; \\, \\square)',
      champs: [
        { id: 'a', etiquette: 'abscisse de P′', attendu: -2 },
        { id: 'b', etiquette: 'ordonnée de P′', attendu: 1 },
      ],
      // La symétrique de P par rapport à l'origine, (−3 ; 2). Le déplacement
      // (−5 ; +3) pris à l'envers donnerait (8 ; −5) : les deux erreurs ne se
      // croisent sur aucune valeur, chacune reçoit donc sa propre règle.
      fausses: [
        { valeur: -3, piege: 'translation-et-symetrie-confondues' },
        { valeur: 2, piege: 'translation-et-symetrie-confondues' },
      ],
      revoir: 'remarque',
    },
    {
      id: 't-10-1-10', type: 'calcul',
      consigne:
        'Par une translation, Q(−1 ; 8) a pour image Q′(4 ; 3). Le point R′(2 ; 2) '
        + 'est l\'image d\'un point R. Calcule l\'ordonnée de R.',
      enonce: '\\text{ordonnée de } R', attendu: 7,
      fausses: [{ valeur: -3, piege: 'sens-de-translation-inverse' }],
      revoir: 'remarque',
    },
  ],
};
