// Chapitre 10, savoir-faire 3 — Utiliser les propriétés conservées par une translation.
//
// ── Le savoir-faire le plus facile à réussir sans rien comprendre ─────────
//
// « Une translation conserve tout » tient en cinq mots, et ces cinq mots
// suffisent à réussir tous les exercices d'un chapitre où l'on ne parle que de
// translations : recopier le nombre de l'énoncé donne la bonne réponse à tous
// les coups. C'est un savoir-faire à haut risque de réussite creuse.
//
// D'où le parti pris de ce fichier : la moitié des items ne portent PAS sur
// une translation. On y trouve des agrandissements, où recopier le nombre est
// exactement l'erreur. La conservation cesse alors d'être un réflexe pour
// redevenir ce qu'elle est — une propriété de la transformation, à vérifier
// avant de s'en servir.
//
// ── Aucune figure, et c'est tant mieux ────────────────────────────────────
//
// L'application n'affiche rien. Sur un dessin, « la figure est la même »
// se constate à l'œil et n'engage aucun raisonnement. Ici, l'élève ne dispose
// que de mesures écrites et du nom de la transformation : répondre suppose
// donc de décider ce que cette transformation a le droit de changer. Deux
// items vont plus loin et demandent un angle qui n'était pas donné — il ne
// s'obtient que par la somme des angles du triangle image, ce qui n'a de sens
// que si les angles ont bien été conservés.
//
// ── Le piège du moment, et ses deux neutres ───────────────────────────────
//
// « conservation-mal-attribuee » : croire qu'une translation déforme, agrandit
// ou rétrécit. Ses réponses fausses sont presque toujours le double ou la
// moitié du bon nombre : puisqu'une transformation est censée transformer,
// autant « faire quelque chose » au nombre donné.
//
// Deux items neutres, tous deux des agrandissements, parce que deux motifs de
// surface menacent :
//   — « la réponse est toujours le nombre de l'énoncé » : l'item 3 punit la
//     recopie, la bonne réponse est quatre fois plus grande ;
//   — « une transformation ne change jamais l'aire » : l'item 6 montre des
//     côtés multipliés par 3 et une aire multipliée par 9, et il est vrai —
//     ce qui casse aussi le « on me demande si c'est plausible, donc c'est
//     faux » de la section.

export default {
  id: 'sf-10-3',
  titre: 'Utiliser les propriétés conservées par une translation',
  attendus: [
    'Il utilise la conservation des longueurs, des angles, des aires et du parallélisme.',
  ],

  // On ne dit pas « une translation conserve tout » : on fait passer le MÊME
  // rectangle dans deux machines, et l'élève constate que l'une le laisse
  // intact quand l'autre quadruple son aire. Le mot « conserver » n'a de sens
  // que par ce contraste — sans la machine Z, il ne voudrait rien dire.
  decouvrir: {
    titre: 'Deux machines, un seul rectangle',
    texte:
      'Un rectangle ABCD mesure 6 cm de long et 4 cm de large. On le fait passer '
      + 'dans deux machines différentes. La machine G le fait glisser de 7 unités '
      + 'vers la droite, sans rien changer d\'autre. La machine Z multiplie chacune '
      + 'de ses longueurs par 2.',
    lignes: [
      { calcul: 'longueur de ABCD', resultat: '6 cm' },
      { calcul: 'largeur de ABCD', resultat: '4 cm' },
      { calcul: 'aire de ABCD', resultat: '24 cm²' },
    ],
    question:
      'Quelle est l\'aire du rectangle qui sort de chaque machine ? (Pour la '
      + 'machine Z, commence par calculer ses nouvelles dimensions.)',
    champs: [
      { id: 'a', etiquette: 'aire à la sortie de G, en cm² :', attendu: 24 },
      { id: 'b', etiquette: 'aire à la sortie de Z, en cm² :', attendu: 96 },
    ],
    conclusion:
      'Le glissement de la machine G est une **translation** : il ne change '
      + '**rien** — ni les longueurs, ni les angles, ni l\'aire. Seule la position '
      + 'change. La machine Z, elle, agrandit : les côtés sont multipliés par 2, '
      + 'mais l\'aire est multipliée par **quatre**, pas par deux. Retiens donc la '
      + 'conservation comme une propriété de la **translation**, et non des '
      + 'transformations en général : dire « une transformation ne change rien » '
      + 'serait aussi faux que dire « elle change tout ».',
  },

  cours: [
    {
      type: 'propriete',
      titre: 'Ce qu\'une translation conserve',
      texte:
        'Une translation conserve les **longueurs**, les **angles**, les **aires**, '
        + 'le **parallélisme**, l\'**alignement** et les **milieux**.\n'
        + 'La figure image est **superposable** à la figure de départ, et dans le '
        + 'même sens. Autrement dit : **seule la position change**.',
    },
    {
      type: 'propriete',
      titre: 'Ce que deviennent les objets usuels',
      texte:
        'L\'image d\'un **segment** est un segment de **même longueur**.\n'
        + 'L\'image d\'une **droite** est une droite **parallèle** à celle de départ.\n'
        + 'L\'image d\'un **cercle** est un cercle de **même rayon**.\n'
        + 'L\'image d\'un **triangle** est un triangle **égal** au premier : mêmes '
        + 'côtés, mêmes angles, donc même périmètre et même aire.',
    },
    {
      type: 'remarque',
      titre: 'Une conservation, ça s\'attribue à une transformation précise',
      texte:
        'Toutes les transformations ne conservent pas tout. Un **agrandissement** '
        + 'de rapport 3 multiplie les longueurs par 3, mais les aires par 9 — et '
        + 'il laisse pourtant les **angles** inchangés.\n'
        + 'Avant d\'écrire une réponse, lis donc **quelle transformation** agit. '
        + '« La figure ne change pas » n\'est vrai que pour une translation.',
    },
    {
      type: 'remarque',
      titre: 'Conserver n\'est pas « ne pas bouger »',
      texte:
        'Le point A et son image A′ ne sont pas au même endroit — sinon il ne se '
        + 'passerait rien. Ce que la translation conserve, ce sont les **mesures** '
        + 'et les **relations** entre les points : distances, angles, parallélisme. '
        + 'Pas leur position.',
    },
    {
      type: 'exemple',
      texte:
        'Un triangle de côtés 3 cm, 5 cm et 7 cm, dont un angle mesure 120°, a pour '
        + 'image par translation un triangle de côtés 3 cm, 5 cm et 7 cm dont le même '
        + 'angle mesure 120° : même périmètre, 15 cm, et même aire. Agrandi avec le '
        + 'rapport 3, il aurait pour côtés 9 cm, 15 cm et 21 cm — mais son angle '
        + 'mesurerait toujours 120°.',
    },
  ],

  methode: {
    titre: 'Décider ce qui change et ce qui ne change pas',
    enonce:
      'Le triangle RST a pour côtés RS = 5 cm, ST = 8 cm et RT = 7 cm ; son angle '
      + 'en S mesure 60°. Une translation le transforme en R′S′T′. Donner le '
      + 'périmètre de R′S′T′ et la mesure de l\'angle en S′.',
    etapes: [
      {
        texte: 'Je lis d\'abord quelle transformation agit : c\'est une translation.',
        note: 'C\'est la question à se poser avant toute autre. Un agrandissement ne donnerait pas du tout les mêmes réponses.',
      },
      {
        texte: 'Une translation conserve les longueurs : R′S′ = 5 cm, S′T′ = 8 cm et R′T′ = 7 cm.',
        note: 'Rien à calculer ici — je recopie, et je sais pourquoi j\'ai le droit.',
      },
      {
        texte: 'Le périmètre de R′S′T′ vaut donc 5 + 8 + 7 = 20 cm.',
        note: 'C\'est exactement celui de RST : le périmètre est une somme de longueurs, toutes conservées.',
      },
      {
        texte: 'Une translation conserve aussi les angles : l\'angle en S′ mesure 60°.',
        note: '',
      },
    ],
    controle:
      'Le contrôle : demande-toi ce que la transformation a le **droit** de changer. '
      + 'Pour une translation, la réponse est « rien, sauf la place » — si l\'un de '
      + 'tes nombres a bougé, c\'est que tu as appliqué autre chose. Et pose-toi la '
      + 'question dans l\'autre sens, qui est la plus utile en contrôle : si l\'énoncé '
      + 'parlait d\'un agrandissement, recopier les longueurs serait tout aussi faux.',
  },

  entrainement: [
    {
      id: 'e-10-3-1', type: 'trous', palier: 1, piege: 'conservation-mal-attribuee',
      consigne:
        'Une translation transforme le triangle ABC en A′B′C′. Dans ABC, AB = 8 cm '
        + 'et l\'angle en A mesure 37°. Complète.',
      enonce: 'A\'B\' = \\square \\text{ cm} \\qquad \\text{angle en } A\' = \\square^\\circ',
      champs: [
        { id: 'a', etiquette: 'longueur A′B′, en cm', attendu: 8 },
        { id: 'b', etiquette: 'angle en A′, en degrés', attendu: 37 },
      ],
      // Les deux fausses sont les doubles : c'est la forme que prend presque
      // toujours « une transformation doit bien transformer quelque chose ».
      fausses: [
        { valeur: 16, piege: 'conservation-mal-attribuee' },
        { valeur: 74, piege: 'conservation-mal-attribuee' },
      ],
    },
    {
      id: 'e-10-3-2', type: 'calcul', palier: 1, piege: 'conservation-mal-attribuee',
      consigne:
        'Une translation transforme un parallélogramme d\'aire 46 cm² en un '
        + 'parallélogramme P′. Calcule l\'aire de P′, en cm².',
      enonce: '\\text{aire de } P\'', attendu: 46,
      fausses: [
        { valeur: 92, piege: 'conservation-mal-attribuee' },
        { valeur: 23, piege: 'conservation-mal-attribuee' },
      ],
    },
    {
      // Premier neutre : ce n'est PAS une translation, donc le piège du moment
      // — croire qu'une translation déforme — ne peut pas jouer : il n'y a pas
      // de translation. Ici c'est l'inverse qui est en jeu, et c'est le seul
      // item du palier où recopier le nombre de l'énoncé donne une réponse
      // fausse. Sans lui, « la réponse est toujours le nombre déjà écrit »
      // suffirait à traverser le palier sans lire la transformation.
      id: 'e-10-3-3', type: 'calcul', palier: 1, neutre: true, piege: 'conservation-mal-attribuee',
      consigne:
        'Attention : il ne s\'agit pas d\'une translation. Le segment [CD] mesure '
        + '9 cm ; on l\'agrandit en multipliant sa longueur par 4. Calcule la '
        + 'longueur du segment obtenu, en cm.',
      enonce: '\\text{longueur du segment agrandi}', attendu: 36,
      fausses: [],
    },
    {
      id: 'e-10-3-4', type: 'trous', palier: 2, piege: 'conservation-mal-attribuee',
      consigne:
        'Une translation transforme le rectangle EFGH en E′F′G′H′. EFGH a pour '
        + 'longueur 12 cm et pour largeur 5 cm. Complète.',
      enonce: '\\text{périmètre} = \\square \\text{ cm} \\qquad \\text{aire} = \\square \\text{ cm}^2',
      champs: [
        { id: 'a', etiquette: 'périmètre de E′F′G′H′, en cm', attendu: 34 },
        { id: 'b', etiquette: 'aire de E′F′G′H′, en cm²', attendu: 60 },
      ],
      fausses: [
        { valeur: 68, piege: 'conservation-mal-attribuee' },
        { valeur: 120, piege: 'conservation-mal-attribuee' },
      ],
    },
    {
      id: 'e-10-3-5', type: 'plausible', palier: 2, piege: 'conservation-mal-attribuee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Une translation transforme un triangle d\'aire } 18 \\text{ cm}^2 '
        + '\\text{ en un triangle d\'aire } 36 \\text{ cm}^2.',
      attendu: false,
      explication:
        'Une translation conserve les aires : le triangle image a une aire de 18 cm², '
        + 'pas 36. Doubler une aire suppose une transformation qui agrandit — un '
        + 'glissement, lui, ne déforme rien.',
    },
    {
      // Second neutre : là encore aucune translation, donc le piège ne joue pas.
      // Cet item porte deux charges à lui seul. Il montre qu'un agrandissement
      // ne traite pas les longueurs et les aires de la même façon — ×3 et ×9 —,
      // et sa réponse est « oui », ce qui empêche « on me demande si c'est
      // plausible, donc c'est faux » de fonctionner dans cette section.
      id: 'e-10-3-6', type: 'plausible', palier: 2, neutre: true, piege: 'conservation-mal-attribuee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Un agrandissement multiplie par 3 les côtés d\'un carré : son aire est multipliée par 9.}',
      attendu: true,
      explication:
        'Oui. Un carré de côté 2 cm a une aire de 4 cm² ; agrandi, il a un côté de '
        + '6 cm et une aire de 36 cm². Or 36 = 9 × 4. Quand les côtés sont multipliés '
        + 'par 3, l\'aire l\'est par 3 × 3 = 9.',
    },
    {
      id: 'e-10-3-7', type: 'vraifaux', palier: 2, piege: 'conservation-mal-attribuee',
      consigne: 'Vrai ou faux ?',
      affirmation:
        'Si deux droites d\'une figure sont parallèles, leurs images par une translation sont deux droites parallèles.',
      attendu: true,
    },
    {
      id: 'e-10-3-8', type: 'vraifaux', palier: 3, piege: 'conservation-mal-attribuee',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Une transformation qui conserve les angles conserve aussi les longueurs.',
      attendu: false,
      contreExemple: {
        invite:
          'Un agrandissement garde tous les angles d\'un carré droits. Donne le côté '
          + 'd\'un carré, puis le côté du carré obtenu en l\'agrandissant.',
        champs: [
          { id: 'a', etiquette: 'côté du carré de départ, en cm' },
          { id: 'b', etiquette: 'côté du carré agrandi, en cm' },
        ],
        // On vérifie la PROPRIÉTÉ qui fait le contre-exemple : deux longueurs
        // différentes suffisent, puisque les quatre angles restent droits dans
        // les deux carrés. N'importe quel agrandissement convient — l'élève
        // fabrique le sien plutôt que de retrouver un couple imposé.
        valide: (a, b) => a > 0 && b > 0 && a !== b,
        temoin: [5, 15],
        exemple:
          'Un carré de côté 5 cm agrandi en un carré de côté 15 cm : les angles '
          + 'valent encore 90°, tous les quatre, alors qu\'aucune longueur n\'a été '
          + 'conservée.',
      },
    },
    {
      id: 'e-10-3-9', type: 'corriger', palier: 3, piege: 'conservation-mal-attribuee',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{Le triangle } KLM \\text{ a pour côtés 6 cm, 8 cm et 10 cm ; une translation le transforme en } K\'L\'M\'.',
      lignes: [
        { texte: 'Une translation conserve les longueurs.', fausse: false },
        { texte: 'Donc K′L′ = 6 cm, L′M′ = 8 cm et K′M′ = 10 cm.', fausse: false },
        { texte: 'Le périmètre de K′L′M′ vaut donc 2 × 24 = 48 cm, puisque la figure a été déplacée.', fausse: true },
      ],
      explication:
        'Les deux premières lignes sont justes, et la troisième les contredit : si '
        + 'les trois côtés valent 6, 8 et 10 cm, le périmètre vaut 6 + 8 + 10 = 24 cm. '
        + 'Le déplacement n\'ajoute rien — il n\'y a aucune raison de doubler quoi que '
        + 'ce soit.',
    },
    {
      // L'angle en Q′ n'est donné nulle part : il ne s'obtient qu'en utilisant
      // la somme des angles DU TRIANGLE IMAGE, ce qui n'a de sens que si les
      // angles ont d'abord été conservés. Recopier ne suffit plus.
      id: 'e-10-3-10', type: 'trous', palier: 3, piege: 'conservation-mal-attribuee',
      consigne:
        'Dans le triangle NPQ, l\'angle en N mesure 63° et l\'angle en P mesure 41°. '
        + 'Une translation transforme NPQ en N′P′Q′. Complète.',
      enonce: '\\text{angle en } N\' = \\square^\\circ \\qquad \\text{angle en } Q\' = \\square^\\circ',
      champs: [
        { id: 'a', etiquette: 'angle en N′, en degrés', attendu: 63 },
        { id: 'b', etiquette: 'angle en Q′, en degrés', attendu: 76 },
      ],
      fausses: [{ valeur: 126, piege: 'conservation-mal-attribuee' }],
    },
  ],

  problemes: [
    {
      id: 'p-10-3-1',
      enonce:
        'Sur une frise, un motif triangulaire est reproduit encore et encore : '
        + 'chaque motif est l\'image du précédent par une même translation. Le motif '
        + 'de départ a pour côtés 5 cm, 5 cm et 8 cm, et son aire vaut 12 cm².',
      questions: [
        { texte: 'Quel est le périmètre du motif de départ, en cm ?', attendu: 18, unite: 'cm' },
        { texte: 'Quel est le périmètre du troisième motif de la frise, en cm ?', attendu: 18, unite: 'cm' },
        { texte: 'Quelle est l\'aire totale des quatre premiers motifs, en cm² ?', attendu: 48, unite: 'cm²' },
      ],
    },
    {
      // La dernière question attend 0 : la seule façon de la manquer est de
      // croire qu'un long déplacement « use » la figure. Une réponse nulle est
      // rare dans un problème, et elle marque.
      id: 'p-10-3-2',
      enonce:
        'Un carreleur pose des carreaux carrés de 20 cm de côté. Chaque carreau est '
        + 'l\'image du précédent par une translation.',
      questions: [
        { texte: 'Quelle est l\'aire d\'un carreau, en cm² ?', attendu: 400, unite: 'cm²' },
        { texte: 'Quelle aire couvrent 25 carreaux, en cm² ?', attendu: 10000, unite: 'cm²' },
        { texte: 'De combien de cm² l\'aire du dernier carreau posé diffère-t-elle de celle du premier ?', attendu: 0, unite: 'cm²' },
      ],
    },
    {
      id: 'p-10-3-3',
      enonce:
        'Une affiche rectangulaire mesure 60 cm de long et 40 cm de large. Un '
        + 'graphiste en fait deux copies : la copie A est simplement déplacée sur la '
        + 'page, la copie B est agrandie en multipliant chaque longueur par 2.',
      questions: [
        { texte: 'Quelle est l\'aire de l\'affiche de départ, en cm² ?', attendu: 2400, unite: 'cm²' },
        { texte: 'Quelle est l\'aire de la copie A, en cm² ?', attendu: 2400, unite: 'cm²' },
        { texte: 'Quelle est l\'aire de la copie B, en cm² ?', attendu: 9600, unite: 'cm²' },
      ],
    },
    {
      id: 'p-10-3-4',
      enonce:
        'Un panneau de signalisation a la forme d\'un triangle dont les angles '
        + 'mesurent 90°, 55° et 35°. Le service technique le déplace de 3 m vers la '
        + 'gauche et de 1 m vers le haut, sans le tourner ni le retourner.',
      questions: [
        { texte: 'Combien mesure, en degrés, le plus grand angle du panneau après le déplacement ?', attendu: 90, unite: '°' },
        { texte: 'Et le plus petit, en degrés ?', attendu: 35, unite: '°' },
        { texte: 'De combien de degrés la somme des trois angles a-t-elle changé ?', attendu: 0, unite: '°' },
      ],
    },
    {
      // Le problème où l'on doit changer de transformation en cours de route :
      // les deux premières questions relèvent de la translation, la troisième
      // d'un agrandissement. Répondre 150 partout revient à n'avoir lu qu'un
      // seul mot de l'énoncé.
      id: 'p-10-3-5',
      enonce:
        'Un rail de placard est fait de deux barres parallèles distantes de 24 cm ; '
        + 'la barre du haut mesure 150 cm. On déplace l\'ensemble du rail par '
        + 'translation vers le fond du placard.',
      questions: [
        { texte: 'Quelle est la longueur de la barre du haut après le déplacement, en cm ?', attendu: 150, unite: 'cm' },
        { texte: 'Quelle est la distance entre les deux barres après le déplacement, en cm ?', attendu: 24, unite: 'cm' },
        { texte: 'Le fabricant propose un modèle agrandi dont toutes les longueurs sont multipliées par 1,5. Quelle est alors la longueur de la barre du haut, en cm ?', attendu: 225, unite: 'cm' },
      ],
    },
  ],

  test: [
    {
      id: 't-10-3-1', type: 'calcul',
      consigne: 'Une translation transforme le segment [JK] en [J′K′], avec JK = 14,2 cm. Calcule J′K′, en cm.',
      enonce: 'J\'K\'', attendu: 14.2,
      fausses: [{ valeur: 28.4, piege: 'conservation-mal-attribuee' }],
      revoir: 'propriete',
    },
    {
      id: 't-10-3-2', type: 'calcul',
      consigne: 'Une translation transforme un triangle d\'aire 27 cm² en un triangle T′. Calcule l\'aire de T′, en cm².',
      enonce: '\\text{aire de } T\'', attendu: 27,
      fausses: [{ valeur: 54, piege: 'conservation-mal-attribuee' }],
      revoir: 'propriete',
    },
    {
      id: 't-10-3-3', type: 'trous',
      consigne:
        'Une translation transforme un rectangle de 9 cm de longueur et 6 cm de '
        + 'largeur en un rectangle image. Complète.',
      enonce: '\\text{périmètre} = \\square \\text{ cm} \\qquad \\text{aire} = \\square \\text{ cm}^2',
      champs: [
        { id: 'a', etiquette: 'périmètre de l\'image, en cm', attendu: 30 },
        { id: 'b', etiquette: 'aire de l\'image, en cm²', attendu: 54 },
      ],
      fausses: [
        { valeur: 60, piege: 'conservation-mal-attribuee' },
        { valeur: 108, piege: 'conservation-mal-attribuee' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-10-3-4', type: 'calcul',
      consigne:
        'Attention : ce n\'est pas une translation. Un côté de 7 cm est agrandi en '
        + 'multipliant sa longueur par 5. Calcule la longueur obtenue, en cm.',
      enonce: '\\text{longueur du côté agrandi}', attendu: 35,
      revoir: 'remarque',
    },
    {
      id: 't-10-3-5', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Une translation transforme un carré de côté 4 cm en un carré de côté 8 cm.}',
      attendu: false,
      explication:
        'Une translation conserve les longueurs : le carré image a encore 4 cm de '
        + 'côté. Un côté qui double, c\'est un agrandissement, pas un glissement.',
      piege: 'conservation-mal-attribuee', revoir: 'propriete',
    },
    {
      id: 't-10-3-6', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Un agrandissement double les côtés d\'un rectangle : son périmètre double et son aire quadruple.}',
      attendu: true,
      explication:
        'Oui. Le périmètre est une somme de longueurs, toutes doublées : il double. '
        + 'L\'aire, elle, est un produit de deux longueurs doublées : elle est '
        + 'multipliée par 2 × 2 = 4.',
      revoir: 'remarque',
    },
    {
      id: 't-10-3-7', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Deux points d\'une figure sont, après une translation, à la même distance l\'un de l\'autre qu\'avant.',
      attendu: true,
      piege: 'conservation-mal-attribuee', revoir: 'propriete',
    },
    {
      id: 't-10-3-8', type: 'trous',
      consigne:
        'Dans le triangle STU, l\'angle en S mesure 48° et l\'angle en T mesure 72°. '
        + 'Une translation transforme STU en S′T′U′. Complète.',
      enonce: '\\text{angle en } T\' = \\square^\\circ \\qquad \\text{angle en } U\' = \\square^\\circ',
      champs: [
        { id: 'a', etiquette: 'angle en T′, en degrés', attendu: 72 },
        { id: 'b', etiquette: 'angle en U′, en degrés', attendu: 60 },
      ],
      fausses: [{ valeur: 144, piege: 'conservation-mal-attribuee' }],
      revoir: 'propriete',
    },
    {
      id: 't-10-3-9', type: 'corriger',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{Un disque d\'aire } 50 \\text{ cm}^2 \\text{ est déplacé par une translation.}',
      lignes: [
        { texte: 'Une translation conserve les aires.', fausse: false },
        { texte: 'L\'aire du disque image vaut donc 50 cm².', fausse: false },
        { texte: 'Mais comme le disque a changé de place, son rayon a diminué.', fausse: true },
      ],
      explication:
        'Les deux premières lignes sont justes, la troisième se contredit toute '
        + 'seule : un rayon plus petit donnerait une aire plus petite, alors qu\'on '
        + 'vient d\'écrire qu\'elle ne change pas. Le rayon est conservé lui aussi.',
      piege: 'conservation-mal-attribuee', revoir: 'remarque',
    },
    {
      id: 't-10-3-10', type: 'calcul',
      consigne:
        'Une translation transforme un parallélogramme de base 13 cm et de hauteur '
        + '4 cm en un parallélogramme image. Calcule l\'aire de cette image, en cm².',
      enonce: '\\text{aire de l\'image}', attendu: 52,
      fausses: [{ valeur: 104, piege: 'conservation-mal-attribuee' }],
      revoir: 'exemple',
    },
  ],
};
