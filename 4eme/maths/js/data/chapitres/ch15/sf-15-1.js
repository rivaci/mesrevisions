// Chapitre 15, savoir-faire 1 — Reconnaître et représenter une pyramide, un cône.
//
// ── Un savoir-faire de VOCABULAIRE, et c’est exactement là qu’on se trompe ──
//
// Il n’y a rien à calculer ici : ni volume, ni aire. Ce qui se joue, c’est le
// nom des choses — et les deux erreurs de nom qu’on retrouve ensuite dans tous
// les calculs du chapitre. La première : le compte des faces oublie la base,
// parce qu’un élève qui pose le solide sur la table ne voit plus le dessous. La
// seconde : plusieurs longueurs partent du sommet, et une seule est la hauteur.
// Ces deux confusions ne se corrigent pas au moment du volume, quand elles sont
// noyées dans un grand nombre : elles se corrigent ici, où la réponse est un
// petit entier qu’on peut vérifier en refermant le solide dans sa tête.
//
// ── La découverte fait FABRIQUER, elle ne fait pas réciter ─────────────────
//
// « n + 1 faces » est une formule qui se retient en septembre et qui perd son
// « + 1 » en juin. La découverte ne l’énonce donc pas : elle décrit des
// pyramides qu’on assemble en collant des triangles de carton autour d’un
// polygone, et fait compter les MORCEAUX de carton nécessaires. Le morceau de
// base est alors matériellement là, dans la pile, et le « + 1 » n’est plus un
// chiffre à retenir mais une pièce qu’on a découpée. Les deux cases portent
// d’ailleurs sur des choses différentes — les triangles d’abord, le total
// ensuite — pour que l’écart entre les deux comptes soit produit par l’élève.
//
// ── Pourquoi ces trois items neutres ──────────────────────────────────────
//
// La stratégie de surface à casser est facile à nommer : « on me demande de
// compter, donc j’ajoute 1 ». Un lot fait uniquement de comptes totaux la
// récompenserait du début à la fin.
//
// e-15-1-3 ne demande aucun compte : seulement de reconnaître, parmi trois
// longueurs nommées, celle qui est la hauteur. Le piège du savoir-faire ne peut
// pas y produire d’erreur — l’élève qui oublie systématiquement la base répond
// juste. Ses deux fausses pointent donc vers `hauteur-et-arete-confondues`.
//
// e-15-1-7 demande le nombre de faces LATÉRALES, pas le total : oublier la base
// n’y coûte rien, et c’est le « + 1 » automatique qui s’y fait prendre. C’est
// le plus important des trois, parce qu’il est le seul à sanctionner la
// stratégie de surface au lieu de la récompenser.
//
// e-15-1-9 ne contient aucune longueur : la confusion hauteur/arête n’a rien à
// quoi s’accrocher, et sa fausse pointe vers `base-non-comptee`.
//
// `rayon-et-diametre-confondus` n’a pas d’item neutre : il n’apparaît que là où
// il y a un disque, donc dans deux items sur dix, et un neutre pour lui se
// résumerait à « cet énoncé ne parle pas de cercle » — vrai, mais sans valeur
// diagnostique. Les trois neutres désarment donc les deux pièges qui, eux,
// traversent tout le lot : deux pour `base-non-comptee` (e-15-1-3, sans aucun
// compte, et e-15-1-7, dont le compte demandé exclut la base), un pour
// `hauteur-et-arete-confondues` (e-15-1-9, sans aucune longueur). Un seul des
// trois — e-15-1-7 — tombe sur un compte, et c’est donc le seul à sanctionner
// la stratégie de surface : c’est peu, et c’est ce qui le rend irremplaçable.
//
// ── Aucune figure, donc chaque longueur est nommée pour ce qu’elle est ─────
//
// Pas un seul dessin. Chaque énoncé dit la nature de la base et son nombre de
// côtés, le nom des sommets, et pour chaque longueur donnée ce qu’elle EST :
// « la hauteur SH, perpendiculaire au plan de la base », « l’arête latérale
// SA », « l’apothème SM, où M est le milieu du côté [BC] », « le diamètre du
// disque de base ». Sans figure, c’est l’énoncé qui doit tout fixer.
//
// Les triplets de longueurs sont toujours géométriquement possibles, même quand
// le côté de la base n’est pas donné : dans une pyramide régulière à base
// carrée, l’arête latérale est déterminée par la hauteur et l’apothème
// (SA² = 2 SM² − SH²). Les triplets employés — (7 ; 13 ; 17), (17 ; 25 ; 31),
// (14 ; 26 ; 34), (21 ; 39 ; 51) — vérifient tous cette égalité, et les cônes
// reposent sur des triangles rectangles connus (9-12-15, 7-24-25, 5-12-13,
// 12-16-20, 8-15-17). Restent deux pyramides décrites par leur seule hauteur et
// leur seule arête latérale, sans apothème à accorder : (9 ; 41) en e-15-1-7 et
// (15 ; 39) en t-15-1-10. La seule condition est que l’arête dépasse la hauteur,
// et elle est remplie — le pied H tombe alors à 40 cm, puis à 36 cm, du sommet
// A de la base. Rien de tout cela n’est demandé à l’élève ici : c’est une
// garantie de relecture, pour qu’aucun énoncé ne décrive un solide impossible.
//
// ── Aucune calculatrice, et il n’en faut aucune ───────────────────────────
//
// Toutes les réponses sont de petits entiers : des comptes, une moitié ou un
// double — le disque se parcourt dans les deux sens, 18 → 9 en e-15-1-2 et
// 7 → 14 en e-15-1-6 —, ou une longueur recopiée de l’énoncé. Aucun π
// n’intervient, puisqu’aucune aire n’est demandée.
//
// ── Ce que ce savoir-faire ne couvre pas ──────────────────────────────────
//
// Aucun volume, aucune aire : elles font l’objet des savoir-faire suivants du
// chapitre. Aucun tracé de patron non plus — un patron ne peut pas être dessiné
// dans l’application, il se travaille donc ici en comptant et en nommant ses
// pièces. Ni sphère, ni section de solide : hors programme de 4e. Et le compte
// des arêtes d’un CÔNE n’est jamais demandé : sa surface latérale n’étant pas
// plane, la question n’a pas de réponse unique à ce niveau, et le cours le dit.

export default {
  id: 'sf-15-1',
  titre: 'Reconnaître et représenter une pyramide, un cône',
  attendus: [
    'Il reconnaît une pyramide et un cône de révolution, et en nomme les éléments : base, faces latérales, arêtes, sommets, hauteur.',
    'Il dénombre les faces, les arêtes et les sommets d’une pyramide à partir de sa base.',
    'Il distingue la hauteur d’une arête latérale, d’un apothème ou d’une génératrice.',
  ],

  // On ne dit pas « une pyramide a n + 1 faces » : on fait compter des morceaux
  // de carton, base comprise, sur trois pyramides déjà assemblées. Le « + 1 »
  // n’est alors pas un chiffre de la formule, c’est une pièce qu’on a découpée.
  decouvrir: {
    titre: 'Les morceaux de carton qu’il a fallu découper',
    texte:
      'Un club de bricolage fabrique des pyramides en carton. On découpe d’abord '
      + 'un polygone qui servira de base, puis on colle des triangles tout autour, '
      + 'et on les rabat jusqu’à ce qu’ils se rejoignent en un même point. Le '
      + 'solide obtenu est entièrement fermé : on ne peut plus voir l’intérieur. '
      + 'Voici, pour trois pyramides déjà fabriquées, le compte des morceaux de '
      + 'carton qu’il a fallu découper.',
    lignes: [
      { calcul: 'base triangulaire, un triangle à 3 côtés', resultat: '3 triangles collés autour, plus le triangle de base : 4 morceaux' },
      { calcul: 'base carrée, un carré à 4 côtés', resultat: '4 triangles collés autour, plus le carré de base : 5 morceaux' },
      { calcul: 'base pentagonale, un pentagone à 5 côtés', resultat: '5 triangles collés autour, plus le pentagone de base : 6 morceaux' },
    ],
    question:
      'Le club fabrique une quatrième pyramide, dont la base est un hexagone, '
      + 'c’est-à-dire un polygone à 6 côtés. Complète les deux cases.',
    champs: [
      { id: 'a', etiquette: 'nombre de triangles à coller autour de la base', attendu: 6 },
      { id: 'b', etiquette: 'nombre total de morceaux de carton à découper', attendu: 7 },
    ],
    conclusion:
      'Il faut **6** triangles, un par côté de la base : chaque côté en porte un, '
      + 'et il n’y a pas de raison qu’il en porte deux. Mais il faut découper '
      + '**7** morceaux, parce que la base en est un elle aussi.\n'
      + 'Ces morceaux de carton sont les **faces** du solide. Une pyramide dont la '
      + 'base a 6 côtés a donc 6 faces latérales et **7 faces en tout**. Le '
      + '« morceau en plus », c’est la base — et la meilleure façon de ne pas '
      + 'l’oublier, c’est de refermer le solide dans sa tête : sans elle, il reste '
      + 'un trou par lequel on voit l’intérieur.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'La pyramide et le cône de révolution',
      texte:
        'Une **pyramide** est un solide dont une face est un polygone — la '
        + '**base** — et dont toutes les autres faces sont des triangles qui se '
        + 'rejoignent en un même point, le **sommet** de la pyramide. Ces '
        + 'triangles sont les **faces latérales**.\n'
        + 'Les **arêtes** d’une pyramide sont de deux sortes : les côtés de la '
        + 'base, et les **arêtes latérales**, qui joignent le sommet aux sommets '
        + 'de la base. Attention au mot « sommet » : il désigne le point où se '
        + 'rejoignent les triangles, mais aussi chacun des coins du solide.\n'
        + 'Un **cône de révolution** a pour base un **disque**, et son sommet est '
        + 'situé à la verticale du centre de ce disque. Sa surface latérale n’est '
        + 'pas plane : ce n’est pas un polyèdre, et on ne compte donc ni ses '
        + 'faces ni ses arêtes comme celles d’une pyramide.',
    },
    {
      type: 'definition',
      titre: 'Les longueurs qui partent du sommet, et le disque de base',
      texte:
        'Plusieurs longueurs partent du sommet S, et elles ne se valent pas :\n'
        + 'la **hauteur** est la distance du sommet à la base, mesurée '
        + '**perpendiculairement**. On la note SH, où H est le pied de cette '
        + 'perpendiculaire ;\n'
        + 'une **arête latérale** joint le sommet à un sommet de la base ;\n'
        + 'une **apothème** joint le sommet au milieu d’un côté de la base ;\n'
        + 'une **génératrice** joint le sommet d’un cône à un point du bord de son '
        + 'disque de base.\n'
        + 'Ces trois dernières sont **obliques** : elles sont toujours plus longues '
        + 'que la hauteur, qui est le plus court chemin du sommet à la base.\n'
        + 'Sur le disque de base d’un cône, le **rayon** va du centre au bord, et '
        + 'le **diamètre** va d’un bord à l’autre en passant par le centre : le '
        + 'rayon est la **moitié** du diamètre.',
    },
    {
      type: 'propriete',
      titre: 'Compter les faces, les arêtes et les sommets d’une pyramide',
      texte:
        'Si la base d’une pyramide a **n côtés**, alors la pyramide a :\n'
        + '**n + 1 faces** — les n triangles latéraux, plus la base ;\n'
        + '**2 × n arêtes** — les n côtés de la base, plus les n arêtes latérales ;\n'
        + '**n + 1 sommets** — les n sommets de la base, plus le sommet de la '
        + 'pyramide.\n'
        + 'Ces égalités se lisent aussi dans l’autre sens : une pyramide qui a F '
        + 'faces a une base à F − 1 côtés, et une pyramide qui a A arêtes a une '
        + 'base à A ÷ 2 côtés.',
    },
    {
      type: 'remarque',
      titre: 'La base est une face, et elle compte partout',
      texte:
        'C’est l’erreur la plus fréquente du chapitre : on compte les triangles '
        + 'qu’on voit, et on oublie celui sur lequel le solide pose.\n'
        + 'Le **patron** le rend visible. Pour fabriquer une pyramide fermée dont '
        + 'la base a n côtés, il faut découper n triangles **et** la base : '
        + 'n + 1 pièces. Pour un cône de révolution fermé, il faut deux pièces — la '
        + 'surface latérale, et le **disque de base**.\n'
        + 'Le geste de contrôle : referme le solide dans ta tête. S’il reste un '
        + 'trou par lequel on voit l’intérieur, c’est qu’une face manque à ton '
        + 'compte.',
    },
    {
      type: 'remarque',
      titre: 'Une seule de ces longueurs est la hauteur',
      texte:
        'Quand un énoncé donne plusieurs longueurs partant du sommet, il faut les '
        + 'trier avant tout : c’est le mot de l’énoncé qui décide, pas l’ordre '
        + 'dans lequel elles sont écrites.\n'
        + 'La hauteur est celle qui tombe **perpendiculairement** sur la base, et '
        + 'c’est la **plus courte** de toutes. Une arête latérale, un apothème ou '
        + 'une génératrice partent bien du sommet, mais en biais : elles sont plus '
        + 'longues.\n'
        + 'Le contrôle est gratuit : si la longueur que tu appelles « hauteur » '
        + 'dépasse une autre longueur partie du sommet, ce n’est pas elle.',
    },
    {
      type: 'exemple',
      titre: 'Compter, dans les deux sens',
      texte:
        'Une pyramide a pour base un heptagone, c’est-à-dire un polygone à '
        + '7 côtés. Elle a donc 7 faces latérales, plus la base : **8 faces**. Ses '
        + 'arêtes sont les 7 côtés de la base et les 7 arêtes latérales : '
        + '**14 arêtes**. Ses sommets sont les 7 sommets de la base et le sommet de '
        + 'la pyramide : **8 sommets**.\n'
        + 'Une autre pyramide a 21 faces en tout. L’une d’elles est la base, donc '
        + 'il y a 20 faces latérales, et la base a **20 côtés**. Cette pyramide a '
        + 'alors 20 + 20 = **40 arêtes** et 20 + 1 = **21 sommets** — autant de '
        + 'sommets que de faces, comme toujours dans une pyramide.',
    },
    {
      type: 'exemple',
      titre: 'Trier les longueurs avant de répondre',
      texte:
        'SABCD est une pyramide de sommet S dont la base ABCD est un carré de '
        + 'centre H, et [SH] est perpendiculaire au plan de la base. M est le '
        + 'milieu du côté [AB]. On donne SH = 21 cm, SM = 39 cm et SA = 51 cm. La '
        + 'hauteur est **SH = 21 cm** : c’est la seule perpendiculaire à la base, '
        + 'et c’est bien la plus courte des trois. SM = 39 cm est l’apothème, '
        + 'puisque M est le milieu d’un côté ; SA = 51 cm est l’arête latérale, '
        + 'puisque A est un sommet de la base.\n'
        + 'Un cône de révolution a pour sommet S et pour centre de base O, et A est '
        + 'un point du bord du disque de base. Le diamètre du disque mesure 30 cm, '
        + 'donc son rayon OA mesure **15 cm**, la moitié. Le segment [SO], '
        + 'perpendiculaire à la base, mesure 8 cm : c’est la **hauteur**. Le segment '
        + 'SA mesure 17 cm : c’est la **génératrice**, oblique, et elle est bien '
        + 'plus longue que la hauteur.',
    },
    {
      type: 'exemple',
      titre: 'Juger un compte qu’on t’annonce',
      texte:
        'On annonce : « une pyramide dont la base est un carré a 4 faces ». C’est '
        + 'faux. Les 4 triangles latéraux ne referment pas le solide : posé sur la '
        + 'table, il aurait un trou carré par-dessous. Il y a 4 faces latérales '
        + '**plus la base**, donc **5 faces**.\n'
        + 'On annonce : « une pyramide dont la base est un triangle a 6 arêtes ». '
        + 'C’est vrai : 3 côtés de base et 3 arêtes latérales, donc 2 × 3 = '
        + '6 arêtes — le double du nombre de côtés de la base, comme toujours. Le '
        + 'compte des faces et celui des sommets se contrôlent, eux, l’un par '
        + 'l’autre : ce solide a 4 faces et 4 sommets, et ces deux nombres-là sont '
        + 'toujours égaux dans une pyramide.',
    },
  ],

  methode: {
    titre: 'Compter sans oublier la base',
    enonce:
      'Une pyramide a pour base un polygone à 11 côtés. Combien a-t-elle de '
      + 'faces, d’arêtes et de sommets ?',
    etapes: [
      {
        texte: 'Je note d’abord le nombre de côtés de la base : 11. C’est lui qui commande tout le reste.',
        note: 'Tous les comptes se déduisent de ce seul nombre.',
      },
      {
        texte: 'Chaque côté de la base porte une face latérale triangulaire : il y a donc 11 faces latérales.',
        note: 'Un côté, un triangle : ni plus, ni moins.',
      },
      {
        texte: 'La base est une face elle aussi : la pyramide a 11 + 1 = 12 faces.',
        note: 'C’est ici que le compte se perd le plus souvent.',
      },
      {
        texte: 'Les arêtes sont les 11 côtés de la base et les 11 arêtes latérales : 11 + 11 = 22 arêtes.',
        note: 'Les côtés de la base sont des arêtes du solide, puisque la base en est une face.',
      },
      {
        texte: 'Les sommets sont les 11 sommets de la base et le sommet de la pyramide : 11 + 1 = 12 sommets.',
        note: 'Le sommet de la pyramide compte, lui aussi.',
      },
    ],
    controle:
      'Le contrôle : referme le solide dans ta tête. Onze triangles collés autour '
      + 'd’un polygone à 11 côtés laissent un trou par-dessous — il faut bien une '
      + 'douzième face pour le boucher.\n'
      + 'Et un second contrôle, purement numérique : dans une pyramide, le nombre '
      + 'de faces est TOUJOURS égal au nombre de sommets, et le nombre d’arêtes '
      + 'vaut le double du nombre de côtés de la base. Ici 12 faces et 12 sommets, '
      + 'et 22 = 2 × 11 : tout concorde. Si tes deux comptes ne tombaient pas sur '
      + 'le même nombre, c’est que l’un des deux aurait perdu la base ou le sommet.\n'
      + 'Ce second contrôle ne remplace pas le premier, il le complète : si tu '
      + 'oubliais la base ET le sommet, tu trouverais 11 faces et 11 sommets — deux '
      + 'nombres égaux, et pourtant deux comptes faux. C’est justement l’erreur la '
      + 'plus fréquente du chapitre, et seul le solide refermé dans ta tête '
      + 'l’attrape.',
  },

  entrainement: [
    // ── Palier 1 : nommer les faces, nommer les longueurs ──────────────────
    {
      id: 'e-15-1-1', type: 'calcul', palier: 1, piege: 'base-non-comptee',
      consigne:
        'SABCDE est une pyramide de sommet S dont la base ABCDE est un pentagone : '
        + 'sa base a donc 5 côtés. Combien cette pyramide a-t-elle de faces en tout ?',
      enonce: '\\text{pyramide de sommet S, base pentagonale à 5 côtés}',
      attendu: 6,
      fausses: [
        // Les 5 triangles latéraux comptés seuls : le solide n’est pas fermé,
        // il resterait un trou pentagonal par-dessous.
        { valeur: 5, piege: 'base-non-comptee' },
      ],
    },
    {
      // Le diamètre est donné, le rayon est demandé — et deux longueurs partent
      // du sommet, dont une seule est la hauteur. Les deux décisions du chapitre
      // sont posées dès le premier item de lecture. Cône cohérent : 9-12-15.
      id: 'e-15-1-2', type: 'trous', palier: 1, piege: 'rayon-et-diametre-confondus',
      consigne:
        'Un cône de révolution a pour sommet S et pour centre de base O ; A est un '
        + 'point du bord du disque de base. Le diamètre de ce disque mesure 18 cm. '
        + 'Le segment [SO] est perpendiculaire au disque de base et mesure 12 cm, et '
        + 'la génératrice SA mesure 15 cm. Complète le rayon du disque de base, puis '
        + 'la hauteur du cône.',
      enonce:
        '\\text{cône : diamètre de la base 18 cm, SO = 12 cm perpendiculaire à la base, SA = 15 cm} \\qquad '
        + '\\text{rayon = } \\square \\text{ cm} \\qquad '
        + '\\text{hauteur = } \\square \\text{ cm}',
      champs: [
        { id: 'a', etiquette: 'rayon du disque de base, en cm', attendu: 9 },
        { id: 'b', etiquette: 'hauteur du cône, en cm', attendu: 12 },
      ],
      fausses: [
        // Le diamètre recopié comme rayon : le rayon en est la moitié.
        { valeur: 18, piege: 'rayon-et-diametre-confondus' },
        // La génératrice prise pour la hauteur : elle part bien du sommet, mais
        // en biais, et elle est plus longue.
        { valeur: 15, piege: 'hauteur-et-arete-confondues' },
      ],
    },
    {
      // NEUTRE. Aucun compte n’est demandé : oublier la base ne peut produire
      // aucune erreur ici, et l’élève qui porte cette confusion répond juste. Ce
      // qui se joue, c’est le tri des longueurs — d’où les deux fausses
      // rattachées à l’AUTRE piège. Pyramide cohérente :
      // SA² = 2 SM² − SH² = 338 − 49 = 289 = 17².
      id: 'e-15-1-3', type: 'calcul', palier: 1, neutre: true, piege: 'base-non-comptee',
      consigne:
        'SABCD est une pyramide de sommet S dont la base ABCD est un carré de '
        + 'centre H. Le segment [SH] est perpendiculaire au plan de la base, et M '
        + 'est le milieu du côté [BC]. On donne SH = 7 cm, SM = 13 cm et SA = 17 cm. '
        + 'Quelle est la hauteur de cette pyramide, en cm ?',
      enonce: '\\text{pyramide : SH = 7 cm perpendiculaire à la base, apothème SM = 13 cm, arête latérale SA = 17 cm}',
      attendu: 7,
      fausses: [
        // L’arête latérale prise pour la hauteur : elle est oblique, donc plus
        // longue que la hauteur.
        { valeur: 17, piege: 'hauteur-et-arete-confondues' },
        // L’apothème pris pour la hauteur : même erreur, même réfutation.
        { valeur: 13, piege: 'hauteur-et-arete-confondues' },
      ],
    },

    // ── Palier 2 : le patron, et les longueurs qu’on doit nommer ───────────
    {
      id: 'e-15-1-4', type: 'calcul', palier: 2, piege: 'base-non-comptee',
      consigne:
        'On fabrique en carton un cône de révolution entièrement fermé : sa surface '
        + 'latérale se découpe d’un seul tenant, et son disque de base est en carton '
        + 'lui aussi. Combien de pièces de carton distinctes faut-il découper pour '
        + 'en tracer le patron ?',
      enonce: '\\text{patron d’un cône de révolution fermé, surface latérale d’un seul tenant}',
      attendu: 2,
      fausses: [
        // La seule surface latérale : roulée, elle forme un entonnoir ouvert. Il
        // manque le disque de base pour fermer le solide.
        { valeur: 1, piege: 'base-non-comptee' },
      ],
    },
    {
      // Trois longueurs, et la hauteur n’est pas la première citée : c’est le
      // mot de l’énoncé qui décide, pas l’ordre. Pyramide cohérente :
      // SA² = 2 × 25² − 17² = 1250 − 289 = 961 = 31².
      id: 'e-15-1-5', type: 'calcul', palier: 2, piege: 'hauteur-et-arete-confondues',
      consigne:
        'SABCD est une pyramide de sommet S dont la base ABCD est un carré de '
        + 'centre H. M est le milieu du côté [AB]. L’apothème SM mesure 25 cm, '
        + 'l’arête latérale SA mesure 31 cm, et le segment [SH], perpendiculaire au '
        + 'plan de la base, mesure 17 cm. Quelle est la hauteur de cette pyramide, '
        + 'en cm ?',
      enonce: '\\text{pyramide : apothème SM = 25 cm, arête latérale SA = 31 cm, SH = 17 cm perpendiculaire à la base}',
      attendu: 17,
      fausses: [
        // L’arête latérale, citée en deuxième et la plus longue des trois.
        { valeur: 31, piege: 'hauteur-et-arete-confondues' },
        // L’apothème, cité en premier — l’ordre de l’énoncé ne désigne rien.
        { valeur: 25, piege: 'hauteur-et-arete-confondues' },
      ],
    },
    {
      // Le trajet inverse du premier item sur le disque : le rayon est donné, le
      // diamètre est demandé. Un lot qui n’irait que dans un sens installerait
      // « je divise par 2 » comme un réflexe. Cône cohérent : 7-24-25.
      id: 'e-15-1-6', type: 'trous', palier: 2, piege: 'rayon-et-diametre-confondus',
      consigne:
        'Un cône de révolution a pour sommet S et pour centre de base O ; A est un '
        + 'point du bord du disque de base. Le rayon OA mesure 7 cm. Le segment '
        + '[SO] est perpendiculaire au disque de base et mesure 24 cm, et le segment '
        + 'SA mesure 25 cm. Complète le diamètre du disque de base, puis la '
        + 'génératrice du cône.',
      enonce:
        '\\text{cône : rayon OA = 7 cm, SO = 24 cm perpendiculaire à la base, SA = 25 cm} \\qquad '
        + '\\text{diamètre = } \\square \\text{ cm} \\qquad '
        + '\\text{génératrice = } \\square \\text{ cm}',
      champs: [
        { id: 'a', etiquette: 'diamètre du disque de base, en cm', attendu: 14 },
        { id: 'b', etiquette: 'longueur de la génératrice, en cm', attendu: 25 },
      ],
      fausses: [
        // Le rayon recopié comme diamètre : le diamètre en est le double.
        { valeur: 7, piege: 'rayon-et-diametre-confondus' },
        // La hauteur donnée comme génératrice : la génératrice joint le sommet
        // au BORD du disque, en biais, et elle est plus longue que la hauteur.
        { valeur: 24, piege: 'hauteur-et-arete-confondues' },
      ],
    },
    {
      // NEUTRE, et le plus important des trois. On demande les faces LATÉRALES :
      // oublier la base n’y coûte rien, et l’élève qui l’oublie toujours répond
      // juste. C’est le « + 1 » automatique qui s’y fait prendre — sans cet item,
      // « on me demande de compter, donc j’ajoute 1 » traverserait tout le lot.
      // La fausse pointe donc vers l’AUTRE piège, celui des longueurs.
      // Pyramide cohérente : SH = 9 et HA = 40 donnent SA = 41.
      id: 'e-15-1-7', type: 'trous', palier: 2, neutre: true, piege: 'base-non-comptee',
      consigne:
        'Une pyramide de sommet S a pour base un décagone, c’est-à-dire un polygone '
        + 'à 10 côtés. Le segment [SH] est perpendiculaire au plan de la base et '
        + 'mesure 9 cm ; l’arête latérale SA mesure 41 cm. Complète le nombre de '
        + 'faces LATÉRALES de cette pyramide, puis sa hauteur, en cm.',
      enonce:
        '\\text{pyramide : base à 10 côtés, SH = 9 cm perpendiculaire à la base, arête latérale SA = 41 cm} \\qquad '
        + '\\text{faces latérales : } \\square \\qquad '
        + '\\text{hauteur : } \\square \\text{ cm}',
      champs: [
        { id: 'a', etiquette: 'nombre de faces latérales', attendu: 10 },
        { id: 'b', etiquette: 'hauteur de la pyramide, en cm', attendu: 9 },
      ],
      fausses: [
        // L’arête latérale prise pour la hauteur : oblique, donc plus longue.
        { valeur: 41, piege: 'hauteur-et-arete-confondues' },
      ],
    },

    // ── Palier 3 : relire un raisonnement, juger, réfuter ──────────────────
    {
      id: 'e-15-1-8', type: 'corriger', palier: 3, piege: 'base-non-comptee',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l’erreur apparaît.',
      enonce:
        '\\text{Une pyramide a 14 faces en tout.} '
        + '\\quad \\text{Combien de côtés a sa base ?}',
      lignes: [
        { texte: 'Chaque côté de la base porte une face latérale triangulaire.', fausse: false },
        { texte: 'Une pyramide a donc exactement autant de faces que sa base a de côtés.', fausse: true },
        { texte: 'La base a donc 14 côtés.', fausse: false },
      ],
      explication:
        'La première ligne est juste : un côté de la base, un triangle. Et la '
        + 'troisième calcule correctement à partir de la deuxième. C’est la '
        + 'deuxième qui casse tout : la base est une face elle aussi, donc une '
        + 'pyramide a une face de PLUS que le nombre de côtés de sa base. Avec '
        + '14 faces en tout, il y a 13 faces latérales, et la base a **13 côtés**. '
        + 'Le contrôle : 13 triangles ne referment pas le solide, il faut bien une '
        + 'quatorzième pièce pour boucher le dessous.',
    },
    {
      // NEUTRE. Aucune longueur dans l’énoncé : la confusion hauteur/arête ne
      // peut pas y produire d’erreur, et l’élève qui la porte répond juste. La
      // fausse pointe donc vers l’AUTRE piège — répondre « oui » ici, c’est
      // précisément avoir laissé la base de côté.
      id: 'e-15-1-9', type: 'plausible', palier: 3, neutre: true, piege: 'hauteur-et-arete-confondues',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Une pyramide a pour base un octogone, c’est-à-dire un polygone à 8 côtés.} '
        + '\\quad \\text{On annonce qu’elle a 8 faces en tout.}',
      attendu: false,
      fausses: [
        { valeur: true, piege: 'base-non-comptee' },
      ],
      explication:
        'Les 8 côtés de la base portent bien 8 faces latérales, mais elles ne '
        + 'suffisent pas à fermer le solide : posé sur la table, il aurait un trou '
        + 'octogonal par-dessous. La base est une face, donc cette pyramide a '
        + '8 + 1 = 9 faces en tout. Contrôle : elle a aussi 9 sommets, et dans une '
        + 'pyramide ces deux comptes sont toujours égaux.',
    },
    {
      id: 'e-15-1-10', type: 'vraifaux', palier: 3, piege: 'base-non-comptee',
      consigne: 'Vrai ou faux ? Si c’est faux, donne un contre-exemple.',
      affirmation:
        'Le nombre de faces d’une pyramide est égal au nombre de côtés de sa base.',
      attendu: false,
      contreExemple: {
        // On ne demande pas de réciter « il y a la base en plus » : on fait
        // COMPTER les deux nombres sur la même pyramide, et c’est leur écart qui
        // réfute. C’est le geste de la découverte, refait sans le carton.
        invite:
          'Prends une pyramide dont la base est un hexagone, c’est-à-dire un '
          + 'polygone à 6 côtés. Donne d’abord son nombre de faces latérales, puis '
          + 'son nombre total de faces.',
        champs: [
          { id: 'a', etiquette: 'nombre de faces latérales' },
          { id: 'b', etiquette: 'nombre total de faces' },
        ],
        valide: (a, b) => Math.abs(a - 6) < 1e-9 && Math.abs(b - 7) < 1e-9,
        temoin: [6, 7],
        exemple:
          'Il y a 6 faces latérales, une par côté de la base — jusque-là, le compte '
          + 'suit bien les côtés. Mais le solide n’est pas fermé : il y a aussi la '
          + 'base, donc 7 faces en tout. Les deux nombres ne sont pas égaux, et ils '
          + 'ne le sont jamais : une pyramide a toujours une face de plus que le '
          + 'nombre de côtés de sa base.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-15-1-1',
      enonce:
        'Une tente a la forme d’une pyramide de sommet S dont la base ABCD est un '
        + 'carré. Le tapis de sol fait partie de la tente : c’est sa face du bas, '
        + 'et il est cousu aux autres.',
      questions: [
        { texte: 'Combien la tente a-t-elle de faces latérales ?', attendu: 4 },
        { texte: 'Combien a-t-elle de faces en tout, tapis de sol compris ?', attendu: 5 },
        { texte: 'Combien a-t-elle d’arêtes en tout ?', attendu: 8 },
      ],
    },
    {
      // Trois longueurs à nommer, aucune à calculer : c’est le tri qui est
      // évalué. Cône cohérent : 12-16-20.
      id: 'p-15-1-2',
      enonce:
        'Un chapeau de fête a la forme d’un cône de révolution de sommet S. Le '
        + 'centre de son disque de base est O, et A est un point du bord de ce '
        + 'disque. Le segment [SO] est perpendiculaire au disque de base. Le '
        + 'diamètre du disque de base mesure 24 cm, SO mesure 16 cm et SA mesure '
        + '20 cm.',
      questions: [
        { texte: 'Quel est le rayon du disque de base ?', attendu: 12, unite: 'cm' },
        { texte: 'Quelle est la hauteur du chapeau ?', attendu: 16, unite: 'cm' },
        { texte: 'Quelle est la longueur de sa génératrice ?', attendu: 20, unite: 'cm' },
      ],
    },
    {
      id: 'p-15-1-3',
      enonce:
        'Un architecte dessine une verrière en forme de pyramide dont la base est '
        + 'un polygone à 15 côtés.',
      questions: [
        { texte: 'Combien cette pyramide a-t-elle de faces en tout ?', attendu: 16 },
        { texte: 'Combien a-t-elle d’arêtes ?', attendu: 30 },
        { texte: 'Combien a-t-elle de sommets ?', attendu: 16 },
      ],
    },
    {
      // Le patron sans le tracer : on compte et on nomme les pièces. La consigne
      // dit explicitement que le solide est fermé et que la surface latérale du
      // cône vient d’un seul tenant — sans ça, l’énoncé aurait deux lectures.
      id: 'p-15-1-4',
      enonce:
        'Un club de bricolage fabrique des solides en carton entièrement fermés : '
        + 'chaque face, base comprise, est une pièce de carton distincte, et la '
        + 'surface latérale d’un cône se découpe d’un seul tenant.',
      questions: [
        { texte: 'Combien de pièces faut-il pour une pyramide dont la base est un carré ?', attendu: 5 },
        { texte: 'Combien de pièces faut-il pour une pyramide dont la base est un polygone à 9 côtés ?', attendu: 10 },
        { texte: 'Combien de pièces faut-il pour un cône de révolution ?', attendu: 2 },
      ],
    },
    {
      // Le trajet inverse, deux fois : des faces vers la base, puis des arêtes
      // vers les faces. C’est là que le « + 1 » se transforme en « − 1 », et
      // qu’un compte appris par cœur ne suffit plus.
      id: 'p-15-1-5',
      enonce:
        'Un artisan fabrique des lanternes qui ont toutes la forme d’une pyramide. '
        + 'Il les décrit à ses clients par leur nombre de faces ou leur nombre '
        + 'd’arêtes.',
      questions: [
        { texte: 'Une première lanterne a 9 faces en tout. Combien de côtés a sa base ?', attendu: 8 },
        { texte: 'Combien d’arêtes cette première lanterne a-t-elle ?', attendu: 16 },
        { texte: 'Une seconde lanterne a 20 arêtes. Combien de faces a-t-elle en tout ?', attendu: 11 },
      ],
    },
  ],

  test: [
    {
      id: 't-15-1-1', type: 'calcul',
      consigne:
        'On fabrique en carton une pyramide entièrement fermée dont la base est un '
        + 'triangle. Chaque face est une pièce de carton distincte. Combien de '
        + 'pièces faut-il découper ?',
      enonce: '\\text{patron d’une pyramide fermée à base triangulaire}',
      attendu: 4,
      fausses: [{ valeur: 3, piege: 'base-non-comptee' }],
      piege: 'base-non-comptee', revoir: 'remarque',
    },
    {
      id: 't-15-1-2', type: 'calcul',
      consigne:
        'Une pyramide a pour base un polygone à 9 côtés. Combien a-t-elle de faces '
        + 'en tout ?',
      enonce: '\\text{pyramide dont la base a 9 côtés}',
      attendu: 10,
      fausses: [{ valeur: 9, piege: 'base-non-comptee' }],
      piege: 'base-non-comptee', revoir: 'propriete',
    },
    {
      // Cône cohérent : 5-12-13.
      id: 't-15-1-3', type: 'trous',
      consigne:
        'Un cône de révolution a pour sommet S et pour centre de base O ; A est un '
        + 'point du bord du disque de base. Le diamètre de ce disque mesure 10 cm. '
        + 'Le segment [SO] est perpendiculaire au disque de base et mesure 12 cm, et '
        + 'la génératrice SA mesure 13 cm. Complète le rayon du disque de base, puis '
        + 'la hauteur du cône.',
      enonce:
        '\\text{cône : diamètre de la base 10 cm, SO = 12 cm perpendiculaire à la base, SA = 13 cm} \\qquad '
        + '\\text{rayon = } \\square \\text{ cm} \\qquad '
        + '\\text{hauteur = } \\square \\text{ cm}',
      champs: [
        { id: 'a', etiquette: 'rayon du disque de base, en cm', attendu: 5 },
        { id: 'b', etiquette: 'hauteur du cône, en cm', attendu: 12 },
      ],
      fausses: [
        { valeur: 10, piege: 'rayon-et-diametre-confondus' },
        { valeur: 13, piege: 'hauteur-et-arete-confondues' },
      ],
      piege: 'rayon-et-diametre-confondus', revoir: 'definition',
    },
    {
      // Pyramide cohérente : SA² = 2 × 26² − 14² = 1352 − 196 = 1156 = 34².
      id: 't-15-1-4', type: 'calcul',
      consigne:
        'SABCD est une pyramide de sommet S dont la base ABCD est un carré de '
        + 'centre H. M est le milieu du côté [CD]. L’arête latérale SA mesure '
        + '34 cm, l’apothème SM mesure 26 cm, et le segment [SH], perpendiculaire au '
        + 'plan de la base, mesure 14 cm. Quelle est la hauteur de cette pyramide, '
        + 'en cm ?',
      enonce: '\\text{pyramide : arête latérale SA = 34 cm, apothème SM = 26 cm, SH = 14 cm perpendiculaire à la base}',
      attendu: 14,
      fausses: [
        { valeur: 34, piege: 'hauteur-et-arete-confondues' },
        { valeur: 26, piege: 'hauteur-et-arete-confondues' },
      ],
      piege: 'hauteur-et-arete-confondues', revoir: 'definition',
    },
    {
      id: 't-15-1-5', type: 'calcul',
      consigne:
        'Une pyramide a 24 arêtes en tout. Combien a-t-elle de faces en tout ?',
      enonce: '\\text{pyramide ayant 24 arêtes}',
      attendu: 13,
      fausses: [
        // 24 ÷ 2 = 12 est le nombre de côtés de la base, donc le nombre de faces
        // LATÉRALES. La base n’a pas été comptée.
        { valeur: 12, piege: 'base-non-comptee' },
      ],
      piege: 'base-non-comptee', revoir: 'propriete',
    },
    {
      id: 't-15-1-6', type: 'calcul',
      consigne:
        'Une pyramide a pour base un polygone à 16 côtés. Combien a-t-elle '
        + 'd’arêtes en tout ?',
      enonce: '\\text{pyramide dont la base a 16 côtés}',
      attendu: 32,
      revoir: 'propriete',
    },
    {
      id: 't-15-1-7', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Une pyramide a pour base un pentagone, c’est-à-dire un polygone à 5 côtés.} '
        + '\\quad \\text{On annonce qu’elle a 6 sommets en tout.}',
      attendu: true,
      explication:
        'Les sommets du solide sont les 5 sommets de la base, plus le sommet de la '
        + 'pyramide : 5 + 1 = 6. Le compte tient. Contrôle : cette pyramide a aussi '
        + '6 faces — 5 triangles et la base — et dans une pyramide le nombre de '
        + 'faces est toujours égal au nombre de sommets.',
      revoir: 'propriete',
    },
    {
      id: 't-15-1-8', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Un cône de révolution a pour sommet S et pour centre de base O, et [SO] est perpendiculaire au disque de base ;} '
        + '\\quad \\text{A est un point du bord de ce disque. On annonce SO = 30 cm et SA = 24 cm.}',
      attendu: false,
      fausses: [{ valeur: true, piege: 'hauteur-et-arete-confondues' }],
      explication:
        'SO est la hauteur : elle tombe perpendiculairement sur la base, c’est donc '
        + 'le plus court chemin du sommet à ce plan. SA, la génératrice, part du '
        + 'même sommet mais en biais : elle est forcément plus LONGUE que SO. Or on '
        + 'annonce 24 cm contre 30 cm. Ces deux mesures ne peuvent pas être celles '
        + 'de ce cône, et il n’y a aucun calcul à faire pour s’en apercevoir.',
      piege: 'hauteur-et-arete-confondues', revoir: 'remarque',
    },
    {
      id: 't-15-1-9', type: 'corriger',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l’erreur apparaît.',
      enonce:
        '\\text{Le disque de base d’un cône de révolution a un diamètre de 16 cm.} '
        + '\\quad \\text{Quel est le rayon de ce disque ?}',
      lignes: [
        { texte: 'Le diamètre va d’un bord à l’autre du disque en passant par le centre, et il mesure 16 cm.', fausse: false },
        { texte: 'Le rayon, qui va du centre au bord, est donc le double du diamètre.', fausse: true },
        { texte: 'Le rayon mesure donc 16 × 2 = 32 cm.', fausse: false },
      ],
      explication:
        'La première ligne ne fait que relire l’énoncé, et la troisième calcule '
        + 'correctement à partir de la deuxième. C’est la deuxième qui casse tout : '
        + 'le rayon ne va que du centre au bord, donc il fait la MOITIÉ du chemin du '
        + 'diamètre. Le rayon mesure 16 ÷ 2 = 8 cm. Un rayon plus grand que le '
        + 'diamètre est impossible : il sortirait du disque.',
      piege: 'rayon-et-diametre-confondus', revoir: 'definition',
    },
    {
      // Pyramide cohérente : SH = 15 et HA = 36 donnent SA = 39.
      id: 't-15-1-10', type: 'trous',
      consigne:
        'SABCDEF est une pyramide de sommet S dont la base ABCDEF est un hexagone : '
        + 'sa base a donc 6 côtés. Le segment [SH] est perpendiculaire au plan de la '
        + 'base et mesure 15 cm ; l’arête latérale SA mesure 39 cm. Complète le '
        + 'nombre total de faces de cette pyramide, puis sa hauteur, en cm.',
      enonce:
        '\\text{pyramide : base hexagonale à 6 côtés, SH = 15 cm perpendiculaire à la base, arête latérale SA = 39 cm} \\qquad '
        + '\\text{faces en tout : } \\square \\qquad '
        + '\\text{hauteur : } \\square \\text{ cm}',
      champs: [
        { id: 'a', etiquette: 'nombre total de faces', attendu: 7 },
        { id: 'b', etiquette: 'hauteur de la pyramide, en cm', attendu: 15 },
      ],
      fausses: [
        { valeur: 6, piege: 'base-non-comptee' },
        { valeur: 39, piege: 'hauteur-et-arete-confondues' },
      ],
      piege: 'base-non-comptee', revoir: 'exemple',
    },
  ],
};
