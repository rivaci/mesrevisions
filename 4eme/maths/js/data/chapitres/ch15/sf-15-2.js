// Chapitre 15, savoir-faire 2 — Construire un patron.
//
// ── Un savoir-faire de tracé, dans une application qui ne trace pas ────────
//
// « Construire un patron » se termine normalement par un dessin, et l’élève n’en
// fera aucun ici : pas de figure affichée, pas de règle, pas de compas. Ce
// savoir-faire a donc été réécrit autour des quatre gestes qui PRÉCÈDENT le
// tracé, et qui sont ceux qu’on rate :
//
//   · compter et nommer les pièces (e-15-2-1, e-15-2-2, e-15-2-3) ;
//   · donner les dimensions de chacune (e-15-2-4, e-15-2-5, e-15-2-7) ;
//   · calculer une aire totale (e-15-2-6, e-15-2-8) ;
//   · juger si un patron proposé se referme (e-15-2-9, e-15-2-10).
//
// Un élève qui sait dire « cinq pièces : un carré de 12 cm de côté et quatre
// triangles isocèles de base 12 cm et de hauteur 8 cm » a fait tout le travail
// mathématique du patron. Ce qui reste est du dessin technique.
//
// ── L’oubli du disque est l’erreur reine, et elle a sa découverte ──────────
//
// Le patron d’un cône, c’est un secteur ET un disque. Le secteur seul roule en
// cornet, et le cornet est ouvert par le bas : le solide n’est pas fermé. La
// même chose se joue sur la pyramide, où l’on compte les triangles et où l’on
// oublie ce sur quoi le solide pose. La découverte ne l’énonce donc pas : elle
// fait compter les pièces obtenues en dépliant trois pyramides, le compte
// « n côtés → n triangles + 1 » se lit tout seul sur les trois lignes, et les
// deux cases le font transporter sur une quatrième pyramide puis sur un cône —
// un solide sans arête, où la règle tient pourtant encore.
//
// ── Pourquoi ces trois items neutres ──────────────────────────────────────
//
// La stratégie de surface à casser est courte à écrire : « il y a une base en
// plus, donc j’ajoute 1 » — appliqué partout, y compris là où on ne demande pas
// le total. Trois items la mettent en défaut.
//
// e-15-2-3 ne demande QUE le nombre de faces latérales d’une pyramide à base
// octogonale, et le dit. L’élève qui n’a jamais compté la base répond 8, comme
// il faut : `base-non-comptee` ne peut pas produire d’erreur ici, alors que
// « j’ajoute toujours 1 » en produit une. Cette erreur-là (répondre 9) est donc
// comptée fausse, mais elle n’est rattachée à AUCUN piège, et c’est volontaire :
// la règle de `base-non-comptee` dit « n faces latérales plus la base » — elle
// ne réfute pas un élève qui ajoute la base, elle l’encourage. Lui coller ce
// diagnostic serait lui donner une explication qui valide son erreur.
//
// e-15-2-5 porte sur UNE seule face latérale : la base n’intervient dans aucun
// des deux calculs. Ce qui s’y joue est ailleurs — l’apothème SM n’est pas
// donnée, elle se calcule par Pythagore à partir de la hauteur SH et de la
// demi-longueur HM, et c’est SM, pas SH, qui est la hauteur du triangle. Ses
// trois fausses pointent donc vers d’AUTRES pièges : `hauteur-et-arete-confondues`
// deux fois, `racine-oubliee` une fois.
//
// e-15-2-9 est le plus important des trois. Le patron proposé contient bien ses
// deux pièces, disque compris : l’élève qui oublie la base ne peut pas répondre
// « oui » à tort, donc le piège du savoir-faire est hors jeu. Ce qui cloche est
// la longueur de l’arc — 78,5 cm annoncés, qui sont exactement π r², l’AIRE du
// disque de base et non la longueur de son bord. Sa fausse pointe vers
// `perimetre-au-lieu-de-laire`.
//
// ── Aucune figure, donc chaque longueur est nommée pour ce qu’elle est ─────
//
// Chaque énoncé dit la nature de la base et ses dimensions, le nom des sommets,
// et surtout ce qu’EST chaque longueur donnée : « l’apothème SM, hauteur du
// triangle SBC », « la hauteur SH, perpendiculaire à la base », « le diamètre du
// disque de base », « la génératrice, qui est le rayon du secteur ». Quand
// Pythagore intervient, le triangle rectangle est nommé et son angle droit
// localisé. Les patrons proposés au jugement sont décrits pièce par pièce, avec
// la dimension de chacune — c’est l’énoncé qui tient lieu de dessin.
//
// ── Aucune calculatrice, donc des nombres choisis ─────────────────────────
//
// Tous les résultats tombent juste, y compris les réponses fausses déclarées :
// une erreur prévisible qui ne tomberait pas juste ne serait jamais tapée telle
// quelle, et le diagnostic ne se déclencherait pas. Chaque énoncé où π
// intervient porte « on prend π ≈ 3,14 ». Les triangles rectangles cachés sont
// des agrandissements du 3-4-5 (méthode, t-15-2-6), du 5-12-13 (p-15-2-2,
// p-15-2-3, e-15-2-9) et du 7-24-25 (e-15-2-2, e-15-2-5), et chaque pyramide
// décrite existe vraiment : l’apothème y est toujours plus long que la
// distance du centre de la base au côté qu’elle rejoint — la moitié du côté
// quand la base est un carré — faute de quoi le solide serait impossible.
//
// ── Ce que ce savoir-faire ne couvre pas ──────────────────────────────────
//
// L’aire latérale d’un cône par la formule du secteur n’est pas au programme de
// 4e : quand elle est nécessaire, elle est DONNÉE dans l’énoncé (e-15-2-10,
// t-15-2-7) et l’élève ne fait que lui ajouter le disque. L’angle du secteur
// n’est jamais demandé. Le volume est un autre savoir-faire (sf-15-3), le
// repérage dans un pavé un troisième. Ni sphère, ni section de solide.
//
// Une erreur prévisible n’est volontairement PAS déclarée : oublier de diviser
// par 2 dans l’aire d’un triangle latéral. Aucun piège du fichier n’a de règle
// qui la réfute nommément, et la rattacher à `perimetre-au-lieu-de-laire`, dont
// la règle parle du disque, serait donner un diagnostic faux plutôt que pas de
// diagnostic du tout.

export default {
  id: 'sf-15-2',
  titre: 'Construire un patron',
  attendus: [
    'Il décrit le patron d’une pyramide et d’un cône de révolution : nombre de pièces, nature et dimensions de chacune.',
    'Il calcule l’aire totale de la surface d’une pyramide, et celle d’un cône dont l’aire latérale est donnée.',
    'Il distingue l’aire d’un disque de la longueur de son bord.',
  ],

  // On n’énonce pas « il ne faut pas oublier la base » : on fait compter les
  // pièces obtenues en dépliant trois pyramides, et le « + 1 » se lit sur les
  // trois lignes. Les deux cases le transportent ensuite sur une quatrième
  // pyramide, puis sur un cône — un solide sans arête, où la règle tient encore.
  //
  // On compte des PIÈCES, pas des morceaux de carton : découpé le long de ses
  // seules arêtes latérales, un patron de pyramide reste d’un seul tenant, les
  // triangles tenant à la base par les côtés du polygone. Le mot « morceaux »
  // donnerait 1 à qui prend l’expérience au mot.
  decouvrir: {
    titre: 'Ce qui reste quand on déplie',
    texte:
      'On prend trois pyramides en carton. On découpe chacune le long de ses '
      + 'arêtes latérales, on rabat les faces et on met le tout à plat : on '
      + 'obtient son patron, d’un seul tenant. On compte alors les faces qui le '
      + 'composent — ses pièces.',
    lignes: [
      { calcul: 'la pyramide à base carrée', resultat: '4 triangles latéraux et la base : 5 pièces' },
      { calcul: 'la pyramide à base hexagonale, à 6 côtés', resultat: '6 triangles latéraux et la base : 7 pièces' },
      { calcul: 'la pyramide à base octogonale, à 8 côtés', resultat: '8 triangles latéraux et la base : 9 pièces' },
    ],
    question:
      'Une quatrième pyramide a pour base un polygone à 12 côtés. Et '
      + 'un cône de révolution, lui, n’a aucune arête : on le fend d’un seul coup '
      + 'de ciseaux du sommet jusqu’au bord de sa base, et sa surface latérale se '
      + 'met à plat d’un coup, en un secteur de disque. Comme la pyramide, il '
      + 'repose sur une base. Complète les deux cases.',
    champs: [
      { id: 'a', etiquette: 'le patron de la pyramide à base à 12 côtés compte, en tout, un nombre de pièces égal à', attendu: 13 },
      { id: 'b', etiquette: 'le patron du cône compte, en tout, un nombre de pièces égal à', attendu: 2 },
    ],
    conclusion:
      'Le compte ne change jamais : autant de triangles que la base a de côtés, '
      + '**plus la base**. Douze côtés donnent donc 12 + 1 = **13** pièces.\n'
      + 'Pour le cône, le secteur ne suffit pas. Roulé, il forme bien le cornet — '
      + 'mais le fond reste ouvert, et on voit l’intérieur. Il faut y ajouter le '
      + '**disque de base** : **2** pièces.\n'
      + 'C’est la même idée dans les deux cas, et c’est la seule à retenir : un '
      + 'patron doit **fermer** le solide. Tant qu’il reste un trou par où voir '
      + 'dedans, il manque une pièce — et la pièce qui manque est presque toujours '
      + 'celle sur laquelle le solide pose.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Ce qu’est un patron',
      texte:
        'Un **patron** d’un solide est une figure plane qui, découpée puis pliée '
        + 'le long de ses traits, redonne exactement ce solide : sans trou, et '
        + 'sans qu’aucune pièce ne recouvre une autre.\n'
        + 'Un patron contient donc **toutes** les faces du solide, chacune à sa '
        + 'vraie dimension. Deux bords qui viendront se coller l’un à l’autre '
        + 'doivent avoir la **même longueur** : c’est ce qui permet au solide de '
        + 'se refermer.',
    },
    {
      type: 'propriete',
      titre: 'Le patron d’une pyramide',
      texte:
        'Si la base d’une pyramide est un polygone à **n côtés**, alors la '
        + 'pyramide a **n faces latérales**, toutes triangulaires, **plus la '
        + 'base** : son patron compte donc **n + 1 pièces**.\n'
        + 'Chaque face latérale est un triangle dont la **base est un côté du '
        + 'polygone** de base — c’est le long de ce côté qu’elle vient se coller.\n'
        + 'Quand la pyramide est régulière, ces triangles sont isocèles, et la '
        + '**hauteur** de chacun est l’**apothème** de la pyramide : le segment SM '
        + 'qui joint le sommet S au milieu M d’un côté de la base. Ce n’est PAS la '
        + 'hauteur SH de la pyramide, qui, elle, tombe au centre de la base.',
    },
    {
      type: 'propriete',
      titre: 'Le patron d’un cône de révolution',
      texte:
        'Le patron d’un cône de révolution compte **2 pièces** :\n'
        + 'le **disque de base**, dont le rayon est celui du cône ;\n'
        + 'un **secteur de disque**, qui est la surface latérale mise à plat, et '
        + 'dont le rayon est la **génératrice** du cône — le segment qui joint le '
        + 'sommet à un point du bord de la base.\n'
        + 'Pour que le patron se referme, l’**arc** du secteur doit avoir '
        + 'exactement la longueur du **bord du disque de base**, soit **2 × π × r** '
        + 'si r est le rayon de la base. C’est le long de cet arc que le cornet se '
        + 'pose sur son fond.',
    },
    {
      type: 'propriete',
      titre: 'L’aire totale, et le disque qu’on ne confond pas',
      texte:
        'L’**aire totale** de la surface d’un solide est la somme des aires de '
        + 'toutes les pièces de son patron :\n'
        + '**aire totale = aire de la base + aire des faces latérales**.\n'
        + 'Pour un disque de rayon r, deux formules se ressemblent et ne disent pas '
        + 'la même chose :\n'
        + 'son **aire** vaut **π × r × r**, et se mesure en cm² ;\n'
        + 'la **longueur de son bord** vaut **2 × π × r**, et se mesure en cm.\n'
        + 'Dans π × r × r il y a deux longueurs multipliées, donc une aire. Dans '
        + '2 × π × r il n’y en a qu’une, donc une longueur. Et le rayon est la '
        + '**moitié** du diamètre : un énoncé qui donne 12 cm de diamètre donne un '
        + 'rayon de 6 cm.',
    },
    {
      type: 'remarque',
      titre: 'Quand l’apothème n’est pas donné : Pythagore',
      texte:
        'Pour dessiner un triangle latéral, il faut sa hauteur, c’est-à-dire '
        + 'l’apothème. Souvent l’énoncé donne à la place la hauteur SH de la '
        + 'pyramide. Le triangle est alors là, tout prêt :\n'
        + 'H est le centre de la base, M le milieu d’un côté, et le triangle **SHM '
        + 'est rectangle en H**. Quand la base est un **carré**, HM vaut la '
        + '**moitié du côté** — pour toute autre base, l’énoncé donne HM.\n'
        + 'L’apothème SM en est l’**hypoténuse** : on **additionne** les carrés, et '
        + 'on n’oublie pas de prendre la racine carrée à la fin.\n'
        + 'Contrôle immédiat : l’apothème est oblique, donc toujours **plus long** '
        + 'que la hauteur SH, et toujours plus longue que HM.',
    },
    {
      type: 'remarque',
      titre: 'Le contrôle : referme le solide dans ta tête',
      texte:
        'Deux questions suffisent à relire n’importe quel patron.\n'
        + '**Est-il fermé ?** Rabats les pièces mentalement. S’il reste un trou par '
        + 'où voir l’intérieur, une face manque — et c’est presque toujours la '
        + 'base, celle sur laquelle le solide pose.\n'
        + '**Les bords se rejoignent-ils ?** Deux bords qui doivent se coller ont '
        + 'la même longueur. Le côté d’un triangle latéral qui se colle sur la base '
        + 'mesure exactement ce côté de base ; l’arc du secteur d’un cône mesure '
        + 'exactement le tour de son disque.',
    },
    {
      type: 'exemple',
      titre: 'Compter et nommer les pièces',
      texte:
        'Une pyramide a pour base un quadrilatère : 4 côtés, donc 4 triangles '
        + 'latéraux, plus la base — son patron compte 5 pièces.\n'
        + 'Une pyramide a pour base un heptagone, un polygone à 7 côtés : 7 '
        + 'triangles latéraux plus la base, donc 8 pièces. Répondre 7 reviendrait à '
        + 'construire un solide ouvert par le bas.',
    },
    {
      type: 'exemple',
      titre: 'Donner les dimensions de chaque pièce, et l’aire totale',
      texte:
        'Une pyramide a pour base un carré de 6 cm de côté, et son apothème mesure '
        + '7 cm. Son patron compte 5 pièces : un carré de 6 cm de côté, et quatre '
        + 'triangles isocèles de base 6 cm et de hauteur 7 cm. Chaque triangle a '
        + 'pour aire 6 × 7 ÷ 2 = 21 cm², les quatre font 84 cm², la base en fait '
        + '36 cm² : l’aire totale vaut 84 + 36 = 120 cm².\n'
        + 'Un cône de révolution a un disque de base de rayon 3 cm et une '
        + 'génératrice de 11 cm ; on prend π ≈ 3,14. Son patron compte 2 pièces : '
        + 'un disque de rayon 3 cm, d’aire 3,14 × 3 × 3 = 28,26 cm², et un secteur '
        + 'de disque de rayon 11 cm dont l’arc mesure 2 × 3,14 × 3 = 18,84 cm. '
        + 'L’aire est en cm², l’arc en cm : ce sont deux grandeurs différentes.',
    },
    {
      type: 'exemple',
      titre: 'Juger si un patron proposé se referme',
      texte:
        'On propose, pour une pyramide dont la base est un carré de 9 cm de côté : '
        + 'un carré de 9 cm de côté et quatre triangles isocèles de base 7 cm. Le '
        + 'compte de pièces est bon, mais le patron ne se referme pas : chaque '
        + 'triangle vient se coller le long d’un côté du carré, sa base doit donc '
        + 'mesurer 9 cm et non 7 cm.\n'
        + 'On propose, pour un cône dont le disque de base a un rayon de 4 cm : un '
        + 'secteur de disque de rayon 13 cm dont l’arc mesure 25,12 cm, et rien '
        + 'd’autre. L’arc est juste, car 2 × 3,14 × 4 = 25,12 cm. Mais roulé, ce '
        + 'secteur ne donne qu’un cornet ouvert : il manque le disque de base, dont '
        + 'l’aire vaut 3,14 × 4 × 4 = 50,24 cm².',
    },
  ],

  methode: {
    titre: 'Compter les pièces, puis les mesurer',
    enonce:
      'SABCD est une pyramide dont la base ABCD est un carré de 16 cm de côté. H '
      + 'est le centre de ce carré et la hauteur SH, perpendiculaire à la base, '
      + 'mesure 6 cm. M est le milieu du côté [BC] ; HM mesure 8 cm, la moitié du '
      + 'côté, et le triangle SHM est rectangle en H. Quelle est l’aire totale de '
      + 'la pyramide, base comprise, en cm² ?',
    etapes: [
      {
        texte: 'Je compte d’abord les pièces du patron : la base a 4 côtés, donc 4 triangles latéraux, plus la base — 5 pièces.',
        note: 'Compter avant de calculer : c’est ce compte qui dira combien d’aires additionner.',
      },
      {
        texte: 'Chaque triangle latéral a pour base un côté du carré, donc 16 cm. Sa hauteur est l’apothème SM — pas la hauteur SH de la pyramide, qui tombe au centre.',
        note: 'Deux longueurs partent de S. Celle qui sert ici est celle qui arrive au MILIEU d’un côté.',
      },
      {
        texte: 'SM n’est pas donnée : je la calcule dans le triangle SHM, rectangle en H. SM en est l’hypoténuse, donc j’additionne : SM² = 6² + 8² = 36 + 64 = 100, donc SM = 10 cm.',
        note: 'Je cherche l’hypoténuse : on additionne, et on prend la racine à la fin.',
      },
      {
        texte: 'Un triangle latéral a pour aire 16 × 10 ÷ 2 = 80 cm². Les quatre réunis font 4 × 80 = 320 cm².',
        note: 'Quatre triangles, parce que le carré a quatre côtés.',
      },
      {
        texte: 'La base est un carré de 16 cm de côté : son aire vaut 16 × 16 = 256 cm². L’aire totale vaut donc 320 + 256 = 576 cm².',
        note: 'C’est ici que la base se perd, et c’est la cinquième pièce du patron.',
      },
    ],
    controle:
      'Le contrôle : referme le solide dans ta tête. Quatre triangles rabattus '
      + 'forment le cornet pointu, et il reste un carré de trou par le bas. Une '
      + 'aire totale de 320 cm² serait celle d’un solide ouvert : il manque les '
      + '256 cm² du fond.\n'
      + 'Et un second coup d’œil, gratuit : l’apothème trouvé doit être plus '
      + 'LONG que la hauteur SH, parce qu’il est oblique. Ici 10 cm contre '
      + '6 cm, l’ordre est respecté. Si tu avais trouvé un apothème plus court '
      + 'que 6 cm, c’est que tu aurais soustrait les carrés au lieu de les '
      + 'additionner — et ça se voit sans refaire un seul calcul.',
  },

  entrainement: [
    // ── Palier 1 : compter et nommer les pièces ────────────────────────────
    {
      id: 'e-15-2-1', type: 'calcul', palier: 1, piege: 'base-non-comptee',
      consigne:
        'Une pyramide a pour base un polygone à 14 côtés. On découpe '
        + 'ce solide le long de ses arêtes latérales et on met le tout à plat. '
        + 'Combien de pièces son patron comporte-t-il en tout ?',
      enonce: '\\text{pyramide dont la base a 14 côtés : nombre de pièces du patron}',
      attendu: 15,
      fausses: [
        // Les 14 triangles latéraux comptés, la base oubliée. Le solide obtenu
        // serait ouvert par le bas.
        { valeur: 14, piege: 'base-non-comptee' },
      ],
    },
    {
      id: 'e-15-2-2', type: 'calcul', palier: 1, piege: 'base-non-comptee',
      consigne:
        'Un cône de révolution a un disque de base de rayon 7 cm et une '
        + 'génératrice de 25 cm. On le fend du sommet jusqu’au bord de sa base et '
        + 'on met toute sa surface à plat. Combien de pièces son patron '
        + 'comporte-t-il en tout ?',
      enonce: '\\text{cône : rayon de la base 7 cm, génératrice 25 cm ; nombre de pièces du patron}',
      attendu: 2,
      fausses: [
        // Le secteur seul. Roulé, il donne un cornet ouvert par le bas : le
        // disque de base manque.
        { valeur: 1, piege: 'base-non-comptee' },
      ],
    },
    {
      // NEUTRE. On ne demande QUE les faces latérales, et l’énoncé le dit. L’élève
      // qui ne compte jamais la base répond 8, comme il faut : `base-non-comptee`
      // ne peut pas produire d’erreur ici. En revanche, celui qui a retenu
      // « il y a une base en plus, donc j’ajoute 1 » et l’applique sans lire la
      // question se fait prendre — c’est exactement l’erreur symétrique, et sans
      // cet item elle traverserait le palier sans être vue.
      id: 'e-15-2-3', type: 'calcul', palier: 1, neutre: true, piege: 'base-non-comptee',
      consigne:
        'Une pyramide a pour base un octogone, un polygone à 8 côtés. Combien de '
        + 'faces LATÉRALES a-t-elle, c’est-à-dire combien de triangles son patron '
        + 'contient-il ? On ne demande pas le nombre total de pièces.',
      enonce: '\\text{pyramide à base octogonale : nombre de faces latérales}',
      attendu: 8,
      fausses: [],
    },

    // ── Palier 2 : les dimensions de chaque pièce ──────────────────────────
    {
      id: 'e-15-2-4', type: 'calcul', palier: 2, piege: 'rayon-et-diametre-confondus',
      consigne:
        'Le patron d’un cône de révolution comporte un disque de base et un '
        + 'secteur de disque. Le disque de base de ce cône a un DIAMÈTRE de 10 cm. '
        + 'On prend π ≈ 3,14. Calcule l’aire de ce disque de base, en cm².',
      enonce: '\\text{disque de base de diamètre 10 cm, π ≈ 3,14 ; aire de ce disque}',
      attendu: 78.5,
      fausses: [
        // 3,14 × 10 × 10 : le diamètre porté dans la formule à la place du rayon.
        // L’aire s’en trouve multipliée par 4.
        { valeur: 314, piege: 'rayon-et-diametre-confondus' },
        // 2 × 3,14 × 5 : c’est la longueur du bord du disque, en cm, pas son aire.
        { valeur: 31.4, piege: 'perimetre-au-lieu-de-laire' },
      ],
    },
    {
      // NEUTRE. Une SEULE face latérale : la base n’entre dans aucun des deux
      // calculs, donc `base-non-comptee` ne peut rien produire ici. Ce qui s’y
      // joue est ailleurs, et c’est pour ça que l’item est en « trous » :
      // demander l’apothème AVANT l’aire rend lisibles deux erreurs qu’un calcul
      // unique aurait noyées — la hauteur SH recopiée comme apothème (24), et le
      // carré gardé pour la longueur (625). Contrôle sans calculatrice :
      // 7² + 24² = 625 = 25².
      id: 'e-15-2-5', type: 'trous', palier: 2, neutre: true, piege: 'base-non-comptee',
      consigne:
        'SABCD est une pyramide dont la base ABCD est un carré de 14 cm de côté. H '
        + 'est le centre de ce carré et la hauteur SH, perpendiculaire à la base, '
        + 'mesure 24 cm. M est le milieu du côté [BC] ; HM mesure 7 cm, la moitié '
        + 'du côté, et le triangle SHM est rectangle en H. La face latérale SBC est '
        + 'un triangle isocèle de base [BC] et de hauteur [SM]. Complète l’apothème '
        + 'SM, puis l’aire de cette seule face.',
      enonce:
        '\\text{base carrée de 14 cm de côté, SH = 24 cm, HM = 7 cm} \\qquad '
        + '\\text{apothème SM = } \\square \\text{ cm} \\qquad '
        + '\\text{aire de la face SBC = } \\square \\text{ cm²}',
      champs: [
        { id: 'a', etiquette: 'apothème SM, en cm', attendu: 25 },
        { id: 'b', etiquette: 'aire de la face latérale SBC, en cm²', attendu: 175 },
      ],
      fausses: [
        // La hauteur SH recopiée comme apothème : SM est oblique, donc plus long.
        { valeur: 24, piege: 'hauteur-et-arete-confondues' },
        // 14 × 24 ÷ 2 : la même confusion, propagée jusqu’à l’aire.
        { valeur: 168, piege: 'hauteur-et-arete-confondues' },
        // 49 + 576 = 625 : le calcul est juste, mais 625 est le CARRÉ de
        // l’apothème. Il reste la racine à prendre.
        { valeur: 625, piege: 'racine-oubliee' },
      ],
    },
    {
      id: 'e-15-2-6', type: 'trous', palier: 2, piege: 'base-non-comptee',
      consigne:
        'SABCD est une pyramide dont la base ABCD est un carré de 12 cm de côté. '
        + 'Chaque face latérale est un triangle isocèle dont la base est un côté du '
        + 'carré et dont la hauteur est l’apothème, qui mesure 8 cm. Complète '
        + 'l’aire du carré de base, puis l’aire totale de la pyramide, base '
        + 'comprise.',
      enonce:
        '\\text{base carrée de 12 cm de côté, apothème 8 cm} \\qquad '
        + '\\text{aire de la base = } \\square \\text{ cm²} \\qquad '
        + '\\text{aire totale = } \\square \\text{ cm²}',
      champs: [
        { id: 'a', etiquette: 'aire du carré de base, en cm²', attendu: 144 },
        { id: 'b', etiquette: 'aire totale de la pyramide, base comprise, en cm²', attendu: 336 },
      ],
      fausses: [
        // 4 × (12 × 8 ÷ 2) : les quatre triangles seuls. La base vient d’être
        // calculée juste au-dessus, et elle n’est pas ajoutée.
        { valeur: 192, piege: 'base-non-comptee' },
      ],
    },
    {
      id: 'e-15-2-7', type: 'calcul', palier: 2, piege: 'perimetre-au-lieu-de-laire',
      consigne:
        'Le patron d’un cône de révolution comporte un disque de base et un '
        + 'secteur de disque. Pour que le patron se referme, l’arc du secteur doit '
        + 'avoir exactement la longueur du bord du disque de base. Ce cône a un '
        + 'disque de base de DIAMÈTRE 12 cm, et sa génératrice, qui est le rayon du '
        + 'secteur, mesure 10 cm. On prend π ≈ 3,14. Calcule la longueur de l’arc '
        + 'du secteur, en cm.',
      enonce: '\\text{cône : diamètre de la base 12 cm, génératrice 10 cm, π ≈ 3,14 ; longueur de l’arc}',
      attendu: 37.68,
      fausses: [
        // 3,14 × 6 × 6 : l’aire du disque de base donnée comme longueur d’arc.
        // Une aire est en cm², un arc en cm.
        { valeur: 113.04, piege: 'perimetre-au-lieu-de-laire' },
        // 2 × 3,14 × 12 : le diamètre employé comme rayon. L’arc annoncé est deux
        // fois trop long, et le patron ne se refermerait pas.
        { valeur: 75.36, piege: 'rayon-et-diametre-confondus' },
      ],
    },

    // ── Palier 3 : juger, et réfuter ───────────────────────────────────────
    {
      id: 'e-15-2-8', type: 'plausible', palier: 3, piege: 'base-non-comptee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Une pyramide a pour base un carré de 10 cm de côté, et chaque face latérale est un triangle} '
        + '\\quad \\text{isocèle de base 10 cm et de hauteur 12 cm. On annonce une aire totale, base comprise, de 340 cm².}',
      attendu: true,
      // Le seul « plausible » vrai de l’entraînement : répondre « non » ici, c’est
      // n’avoir compté que les quatre triangles, soit 240 cm². Sans cette ligne,
      // la seule erreur possible sur cet item ne serait rattachée à rien.
      fausses: [{ valeur: false, piege: 'base-non-comptee' }],
      explication:
        'Chaque face latérale a pour aire 10 × 12 ÷ 2 = 60 cm², et il y en a '
        + 'quatre : 240 cm². Le carré de base en fait 10 × 10 = 100. L’aire totale '
        + 'vaut donc 240 + 100 = 340 cm², exactement la valeur annoncée. Le patron '
        + 'compte cinq pièces, et l’aire totale en additionne cinq.',
    },
    {
      // NEUTRE, et le plus important des trois. Le patron proposé contient bien
      // ses deux pièces, disque compris : l’élève qui oublie la base ne peut pas
      // répondre « oui » à tort. Ce qui cloche est ailleurs — l’arc annoncé,
      // 78,5 cm, est exactement 3,14 × 5 × 5, c’est-à-dire l’AIRE du disque de
      // base, en cm². Un élève qui confond les deux formules valide le patron ;
      // c’est cette erreur-là que la fausse rattache.
      id: 'e-15-2-9', type: 'plausible', palier: 3, neutre: true, piege: 'base-non-comptee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Un cône de révolution a un disque de base de rayon 5 cm et une génératrice de 13 cm.} '
        + '\\quad \\text{On propose un patron fait de deux pièces : un disque de rayon 5 cm, et un secteur} '
        + '\\quad \\text{de disque de rayon 13 cm dont l’arc mesure 78,5 cm. On prend π ≈ 3,14 : ce patron se referme-t-il ?}',
      attendu: false,
      fausses: [{ valeur: true, piege: 'perimetre-au-lieu-de-laire' }],
      explication:
        'Les deux pièces sont bien là, et leurs rayons sont bons : 5 cm pour le '
        + 'disque de base, 13 cm pour le secteur, qui est la génératrice. C’est '
        + 'l’arc qui ne va pas. Il doit avoir la longueur du bord du disque de '
        + 'base, soit 2 × 3,14 × 5 = 31,4 cm. Or 78,5 cm, c’est 3,14 × 5 × 5 : '
        + 'l’AIRE du disque, en cm², et non la longueur de son bord, en cm. Avec un '
        + 'arc plus de deux fois trop long, le secteur roulé déborderait tout '
        + 'autour du fond : le patron ne se referme pas.',
    },
    {
      id: 'e-15-2-10', type: 'vraifaux', palier: 3, piege: 'base-non-comptee',
      consigne: 'Vrai ou faux ? Si c’est faux, donne un contre-exemple.',
      affirmation:
        'Pour obtenir le patron d’un cône de révolution, il suffit de dessiner le '
        + 'secteur de disque qui forme sa surface latérale.',
      attendu: false,
      contreExemple: {
        // On ne demande pas de réciter « il manque le disque » : on fait CALCULER
        // l’aire de ce disque, puis l’aire totale. Le carton manquant devient un
        // nombre — 314 cm² sur 714, presque la moitié de la surface du solide.
        invite:
          'Un cône de révolution a un disque de base de rayon 10 cm, et sa surface '
          + 'latérale a une aire de 400 cm². On prend π ≈ 3,14. Donne d’abord '
          + 'l’aire du disque de base, puis l’aire totale de la surface du cône.',
        champs: [
          { id: 'a', etiquette: 'aire du disque de base, en cm²' },
          { id: 'b', etiquette: 'aire totale de la surface du cône, en cm²' },
        ],
        valide: (a, b) => Math.abs(a - 314) < 1e-9 && Math.abs(b - 714) < 1e-9,
        temoin: [314, 714],
        exemple:
          'Le disque de base a pour aire 3,14 × 10 × 10 = 314 cm². La surface '
          + 'totale du cône vaut donc 400 + 314 = 714 cm². Le secteur seul n’en '
          + 'couvre que 400 : il manque 314 cm² de carton, presque la moitié. Et '
          + 'surtout, le solide obtenu serait un cornet ouvert par le bas — pas un '
          + 'cône.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-15-2-1',
      enonce:
        'Une tente a la forme d’une pyramide dont la base est un carré de 3 m de '
        + 'côté. Chaque face latérale est un triangle isocèle dont la base est un '
        + 'côté du carré et dont la hauteur, l’apothème, mesure 2,5 m. Le sol de la '
        + 'tente est en toile, comme les faces latérales.',
      questions: [
        { texte: 'Combien de pièces de toile faut-il découper pour réaliser cette tente ?', attendu: 5 },
        { texte: 'Quelle est l’aire d’une face latérale ?', attendu: 3.75, unite: 'm²' },
        { texte: 'Quelle est l’aire totale de toile nécessaire, sol compris ?', attendu: 24, unite: 'm²' },
      ],
    },
    {
      // Le cornet ouvert, en grandeur réelle : on calcule ce qu’il faudrait
      // AJOUTER pour que le cône soit fermé.
      id: 'p-15-2-2',
      enonce:
        'Un chapeau de fête a la forme d’un cône de révolution sans fond : ce n’est '
        + 'que sa surface latérale. Le disque sur lequel il se pose a un diamètre de '
        + '20 cm, et la génératrice du cône mesure 26 cm. On prend π ≈ 3,14.',
      questions: [
        { texte: 'Quel est le rayon du disque de base ?', attendu: 10, unite: 'cm' },
        { texte: 'Quelle est la longueur du bord bas du chapeau, c’est-à-dire du bord du disque de base ?', attendu: 62.8, unite: 'cm' },
        { texte: 'Quelle serait l’aire du disque à ajouter pour fermer complètement le cône ?', attendu: 314, unite: 'cm²' },
      ],
    },
    {
      // L’apothème par Pythagore, puis l’aire totale : les deux gestes du
      // savoir-faire enchaînés. Contrôle sans calculatrice : 5² + 12² = 169 = 13².
      id: 'p-15-2-3',
      enonce:
        'SABCD est une pyramide dont la base ABCD est un carré de 10 cm de côté. H '
        + 'est le centre de ce carré et la hauteur SH, perpendiculaire à la base, '
        + 'mesure 12 cm. M est le milieu du côté [BC] ; HM mesure 5 cm, la moitié du '
        + 'côté, et le triangle SHM est rectangle en H. Chaque face latérale est un '
        + 'triangle isocèle dont la hauteur est l’apothème.',
      questions: [
        { texte: 'Quelle est la longueur de l’apothème SM ?', attendu: 13, unite: 'cm' },
        { texte: 'Quelle est l’aire d’une face latérale ?', attendu: 65, unite: 'cm²' },
        { texte: 'Quelle est l’aire totale de la pyramide, base comprise ?', attendu: 360, unite: 'cm²' },
      ],
    },
    {
      // Base rectangulaire : les faces latérales ne sont plus toutes identiques,
      // et le patron compte deux paires de triangles différents. Les deux
      // apothèmes sont donnés, chacun rattaché au côté qu’il concerne.
      id: 'p-15-2-4',
      enonce:
        'Une pyramide a pour base un rectangle ABCD de 18 cm sur 10 cm. Ses faces '
        + 'latérales sont deux triangles isocèles de base 18 cm et de hauteur '
        + '13 cm, et deux triangles isocèles de base 10 cm et de hauteur 15 cm.',
      questions: [
        { texte: 'Combien de pièces le patron de cette pyramide comporte-t-il ?', attendu: 5 },
        { texte: 'Quelle est l’aire des quatre faces latérales réunies ?', attendu: 384, unite: 'cm²' },
        { texte: 'Quelle est l’aire totale de la pyramide, base comprise ?', attendu: 564, unite: 'cm²' },
      ],
    },
    {
      // L’aire de l’hexagone est DONNÉE : elle n’est pas au programme, et la
      // calculer n’est pas le geste travaillé ici. Ce qui est travaillé, c’est le
      // compte des pièces et l’addition finale.
      id: 'p-15-2-5',
      enonce:
        'Un presse-papier a la forme d’une pyramide dont la base est un hexagone '
        + 'régulier de 4 cm de côté, dont l’aire est de 41,6 cm². Chaque face '
        + 'latérale est un triangle isocèle dont la base est un côté de l’hexagone '
        + 'et dont la hauteur, l’apothème, mesure 9 cm.',
      questions: [
        { texte: 'Combien de pièces le patron de ce solide comporte-t-il ?', attendu: 7 },
        { texte: 'Quelle est l’aire des six faces latérales réunies ?', attendu: 108, unite: 'cm²' },
        { texte: 'Quelle est l’aire totale du presse-papier, base comprise ?', attendu: 149.6, unite: 'cm²' },
      ],
    },
  ],

  test: [
    {
      id: 't-15-2-1', type: 'calcul',
      consigne:
        'SABCD est une pyramide dont la base ABCD est un carré de 8 cm de côté. '
        + 'Chaque face latérale est un triangle isocèle dont la base est un côté du '
        + 'carré et dont la hauteur, l’apothème, mesure 5 cm. Calcule l’aire totale '
        + 'de la pyramide, base comprise, en cm².',
      enonce: '\\text{base carrée de 8 cm de côté, apothème 5 cm ; aire totale}',
      attendu: 144,
      fausses: [{ valeur: 80, piege: 'base-non-comptee' }],
      piege: 'base-non-comptee', revoir: 'propriete',
    },
    {
      id: 't-15-2-2', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{On propose, comme patron d’un cône de révolution, un secteur de disque de rayon 15 cm} '
        + '\\quad \\text{dont l’arc mesure 43,96 cm, et rien d’autre. On prend π ≈ 3,14 : ce patron se referme-t-il sur un cône ?}',
      attendu: false,
      fausses: [{ valeur: true, piege: 'base-non-comptee' }],
      explication:
        'Le secteur, lui, est correct : son arc de 43,96 cm est exactement le bord '
        + 'd’un disque de rayon 7 cm, puisque 2 × 3,14 × 7 = 43,96. Mais roulé, il '
        + 'ne donne qu’un cornet ouvert par le bas. Le patron d’un cône compte deux '
        + 'pièces : ce secteur ET le disque de base, de rayon 7 cm. Tant qu’on voit '
        + 'l’intérieur du solide, une pièce manque.',
      piege: 'base-non-comptee', revoir: 'propriete',
    },
    {
      id: 't-15-2-3', type: 'calcul',
      consigne:
        'Le disque de base d’un cône de révolution a un DIAMÈTRE de 16 cm. On prend '
        + 'π ≈ 3,14. Calcule l’aire de ce disque, en cm².',
      enonce: '\\text{disque de base de diamètre 16 cm, π ≈ 3,14 ; aire de ce disque}',
      attendu: 200.96,
      fausses: [
        { valeur: 803.84, piege: 'rayon-et-diametre-confondus' },
        { valeur: 50.24, piege: 'perimetre-au-lieu-de-laire' },
      ],
      piege: 'rayon-et-diametre-confondus', revoir: 'exemple',
    },
    {
      id: 't-15-2-4', type: 'calcul',
      consigne:
        'Le patron d’un cône de révolution comporte un disque de base et un secteur '
        + 'de disque, dont l’arc doit avoir exactement la longueur du bord du disque '
        + 'de base. Ce disque de base a un rayon de 20 cm. On prend π ≈ 3,14. '
        + 'Calcule la longueur de l’arc du secteur, en cm.',
      enonce: '\\text{cône : rayon de la base 20 cm, π ≈ 3,14 ; longueur de l’arc du secteur}',
      attendu: 125.6,
      fausses: [{ valeur: 1256, piege: 'perimetre-au-lieu-de-laire' }],
      piege: 'perimetre-au-lieu-de-laire', revoir: 'propriete',
    },
    {
      id: 't-15-2-5', type: 'trous',
      consigne:
        'Une pyramide a pour base un carré de 20 cm de côté. Chaque face latérale '
        + 'est un triangle isocèle dont la base est un côté du carré et dont la '
        + 'hauteur, l’apothème, mesure 26 cm. Complète l’aire du carré de base, puis '
        + 'l’aire totale de la pyramide, base comprise.',
      enonce:
        '\\text{base carrée de 20 cm de côté, apothème 26 cm} \\qquad '
        + '\\text{aire de la base = } \\square \\text{ cm²} \\qquad '
        + '\\text{aire totale = } \\square \\text{ cm²}',
      champs: [
        { id: 'a', etiquette: 'aire du carré de base, en cm²', attendu: 400 },
        { id: 'b', etiquette: 'aire totale de la pyramide, base comprise, en cm²', attendu: 1440 },
      ],
      fausses: [{ valeur: 1040, piege: 'base-non-comptee' }],
      piege: 'base-non-comptee', revoir: 'propriete',
    },
    {
      id: 't-15-2-6', type: 'calcul',
      consigne:
        'SABCD est une pyramide dont la base ABCD est un carré de 30 cm de côté. Sa '
        + 'hauteur SH, perpendiculaire à la base, mesure 20 cm, et son apothème SM, '
        + 'qui joint le sommet S au milieu M du côté [BC], mesure 25 cm. La face '
        + 'latérale SBC est un triangle isocèle de base [BC] et de hauteur [SM]. '
        + 'Calcule l’aire de cette seule face, en cm².',
      enonce: '\\text{base carrée de 30 cm de côté, SH = 20 cm, SM = 25 cm ; aire de la face SBC}',
      attendu: 375,
      fausses: [{ valeur: 300, piege: 'hauteur-et-arete-confondues' }],
      piege: 'hauteur-et-arete-confondues', revoir: 'remarque',
    },
    {
      id: 't-15-2-7', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Un cône de révolution a un disque de base de rayon 5 cm, et sa surface latérale a une aire} '
        + '\\quad \\text{de 200 cm². On prend π ≈ 3,14 : on annonce une aire totale de 278,5 cm² pour toute la surface du cône.}',
      attendu: true,
      // Le seul « plausible » vrai de l’auto-évaluation : répondre « non » ici,
      // c’est n’avoir compté que le secteur, soit 200 cm².
      fausses: [{ valeur: false, piege: 'base-non-comptee' }],
      explication:
        'La surface d’un cône, c’est le secteur ET le disque de base. Le disque a '
        + 'pour aire 3,14 × 5 × 5 = 78,5 cm², et 200 + 78,5 = 278,5 cm² : la valeur '
        + 'annoncée est juste. Le patron compte deux pièces, et l’aire totale en '
        + 'additionne deux.',
      revoir: 'propriete',
    },
    {
      id: 't-15-2-8', type: 'corriger',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l’erreur apparaît.',
      enonce:
        '\\text{Une pyramide a pour base un carré de 7 cm de côté. Chaque face latérale est un triangle} '
        + '\\quad \\text{isocèle de base 7 cm et de hauteur 6 cm. Quelle est l’aire totale de la pyramide, base comprise ?}',
      lignes: [
        { texte: 'Une face latérale a pour aire 7 × 6 ÷ 2 = 21 cm².', fausse: false },
        { texte: 'Le carré a quatre côtés, donc le patron ne contient que ces quatre triangles.', fausse: true },
        { texte: 'L’aire totale vaut donc 4 × 21 = 84 cm².', fausse: false },
      ],
      explication:
        'La première ligne calcule correctement l’aire d’un triangle, et la '
        + 'troisième additionne correctement à partir de la deuxième. C’est la '
        + 'deuxième qui casse tout : le patron contient les quatre triangles ET le '
        + 'carré de base, soit cinq pièces. La base a pour aire 7 × 7 = 49 cm², et '
        + 'l’aire totale vaut 84 + 49 = 133 cm². Les 84 cm² annoncés sont ceux d’un '
        + 'solide ouvert par le bas.',
      piege: 'base-non-comptee', revoir: 'propriete',
    },
    {
      id: 't-15-2-9', type: 'trous',
      consigne:
        'Le patron d’un cône de révolution comporte un disque de base et un secteur '
        + 'de disque. Ce cône a un disque de base de DIAMÈTRE 18 cm, et sa '
        + 'génératrice mesure 15 cm. Complète le rayon du disque de base, puis le '
        + 'rayon du secteur.',
      enonce:
        '\\text{cône : diamètre de la base 18 cm, génératrice 15 cm} \\qquad '
        + '\\text{rayon du disque de base = } \\square \\text{ cm} \\qquad '
        + '\\text{rayon du secteur = } \\square \\text{ cm}',
      champs: [
        { id: 'a', etiquette: 'rayon du disque de base, en cm', attendu: 9 },
        { id: 'b', etiquette: 'rayon du secteur de disque, en cm', attendu: 15 },
      ],
      fausses: [{ valeur: 18, piege: 'rayon-et-diametre-confondus' }],
      piege: 'rayon-et-diametre-confondus', revoir: 'propriete',
    },
    {
      id: 't-15-2-10', type: 'calcul',
      consigne:
        'Une pyramide a pour base un décagone, un polygone à 10 côtés. Combien de '
        + 'pièces son patron comporte-t-il en tout ?',
      enonce: '\\text{pyramide à base décagonale : nombre de pièces du patron}',
      attendu: 11,
      fausses: [{ valeur: 10, piege: 'base-non-comptee' }],
      piege: 'base-non-comptee', revoir: 'definition',
    },
  ],
};
