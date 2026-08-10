// Chapitre 15, savoir-faire 3 — Calculer le volume d’une pyramide, d’un cône.
//
// ── Le tiers ne s’énonce pas, il se CONSTATE ──────────────────────────────
//
// « V = B × h ÷ 3 » est une formule qu’on récite en septembre et qu’on écrit
// sans le ÷ 3 en juin. La raison est simple : rien dans l’écriture ne dit d’où
// vient ce tiers, donc rien ne le retient. La découverte ne l’énonce donc pas.
// Elle décrit une expérience — un cône et un cylindre de même disque de base et
// de même hauteur, le cône rempli de sable et vidé dans le cylindre — et fait
// lire le même compte sur trois paires d’objets de tailles différentes : trois
// versées, à chaque fois. Les deux cases à compléter font ensuite parcourir le
// rapport dans les deux sens (le cylindre connu, puis le cône connu), pour que
// le tiers ne soit pas mémorisé comme « il y a un 3 quelque part » mais comme
// un rapport orienté entre deux solides.
//
// ── La vraie difficulté est la LONGUEUR qu’on porte dans la formule ────────
//
// La formule est courte ; ce qu’on y met ne l’est pas. Trois décisions se
// prennent avant tout calcul, et chacune a son piège :
//
//   · le nombre donné est-il le rayon ou le diamètre ? (`rayon-et-diametre-confondus`)
//   · est-il la hauteur, ou une longueur oblique partant du sommet — génératrice
//     d’un cône, apothème d’une pyramide ? (`hauteur-et-arete-confondues`)
//   · pour un disque, écrit-on π r² ou 2 π r ? (`perimetre-au-lieu-de-laire`)
//
// Deux items d’entraînement obligent à trouver la hauteur par Pythagore :
// e-15-3-5 (cône, rayon 6 cm et génératrice 10 cm) et e-15-3-6 (pyramide, côté
// 18 cm et apothème 15 cm). Le second est un « trous » exprès : en demandant la
// hauteur AVANT le volume, il rend visible la réponse « 15 » — l’apothème pris
// pour la hauteur — et la réponse « 144 », le carré gardé pour la longueur.
// Dans un item de calcul unique, ces deux erreurs se seraient noyées dans un
// grand nombre final impossible à interpréter.
//
// ── Pourquoi ces trois items neutres ──────────────────────────────────────
//
// La stratégie de surface à casser ici est massive : « on me parle d’un cône ou
// d’une pyramide, donc je divise par 3 ». Trois items la mettent en défaut.
//
// e-15-3-2 ne demande que l’aire du disque de base, pas le volume : le tiers n’y
// intervient pas, et l’élève qui l’oublie systématiquement y répond juste. Ses
// deux réponses fausses pointent donc ailleurs — le diamètre pris pour le rayon,
// et le périmètre écrit à la place de l’aire.
//
// e-15-3-8 porte sur un CYLINDRE, avec un volume annoncé qui est exactement le
// tiers du bon. Répondre « oui, c’est plausible » n’est pas oublier le tiers,
// c’est en mettre un là où il n’y en a pas : le piège du savoir-faire ne peut
// pas produire cette erreur-là, et l’élève qui le porte répond juste. C’est
// l’item le plus important des trois, parce qu’il est le seul à sanctionner la
// stratégie de surface au lieu de la récompenser.
//
// e-15-3-7 neutralise l’autre piège : l’énoncé ne donne QUE la hauteur, aucune
// arête ni apothème. La confusion hauteur/oblique n’a rien à quoi s’accrocher,
// et il ne reste que le tiers à ne pas perdre — d’où sa fausse rattachée à
// `tiers-oublie`.
//
// ── Aucune figure, donc chaque longueur est nommée pour ce qu’elle est ─────
//
// Pas un seul dessin : chaque énoncé dit la nature de la base, ses dimensions,
// le nom des sommets, et surtout ce qu’EST chaque longueur donnée — « la hauteur
// SH, perpendiculaire à la base », « le segment SA qui joint le sommet au bord
// du disque de base », « l’apothème SM, avec M milieu du côté [BC] ». Quand
// Pythagore est en jeu, le triangle rectangle est nommé et son angle droit
// localisé, faute de quoi l’énoncé serait indécidable sans figure.
//
// ── Aucune calculatrice, donc des nombres choisis ─────────────────────────
//
// Tous les résultats tombent juste, y compris les réponses fausses déclarées —
// une erreur prévisible qui ne tomberait pas juste ne serait jamais tapée telle
// quelle, et le diagnostic ne se déclencherait pas. Quand π intervient, chaque
// énoncé porte « on prend π ≈ 3,14 » et r² × h est un multiple de 3, ce qui rend
// le volume exact au centième. Les triangles rectangles cachés sont des triplets
// connus — 6-8-10, 9-12-15 et 15-20-25, tous agrandissements du 3-4-5, plus
// 5-12-13 et 8-15-17 : l’élève qui doute de sa hauteur peut la revérifier par
// Pythagore et retomber sur un entier, sans matériel.
//
// ── Ce que ce savoir-faire ne couvre pas ──────────────────────────────────
//
// Ni les patrons, ni le repérage dans un pavé : ce sont d’autres savoir-faire du
// chapitre. Ni l’aire latérale d’un cône, ni la sphère, ni les sections de
// solides : elles ne sont pas au programme de 4e. Le cylindre et le prisme apparaissent
// ici uniquement comme termes de comparaison — c’est d’eux que vient le tiers,
// et c’est contre eux qu’on le contrôle.
//
// Une erreur prévisible n’est volontairement PAS déclarée : sur une base carrée
// ou rectangulaire, prendre le périmètre pour l’aire. Le piège
// `perimetre-au-lieu-de-laire` a une règle écrite pour le disque (π r² contre
// 2 π r) ; l’étendre au carré serait rattacher une réponse à un piège dont la
// règle ne la réfute pas nommément. Le geste de contrôle — compter les longueurs
// multipliées — est donné dans le cours pour toutes les bases.

export default {
  id: 'sf-15-3',
  titre: 'Calculer le volume d’une pyramide, d’un cône',
  attendus: [
    'Il calcule le volume d’une pyramide et d’un cône de révolution.',
    'Il utilise l’aire du disque dans le calcul du volume d’un cône.',
    'Il relie les unités de volume et les unités de contenance.',
  ],

  // On ne dit pas « le volume vaut le tiers » : on décrit une expérience dont
  // le compte est le même sur trois paires d’objets, et c’est l’élève qui en
  // tire le rapport. Les deux cases le font parcourir dans les deux sens, pour
  // qu’il reste un rapport orienté et non un « 3 » à placer quelque part.
  decouvrir: {
    titre: 'Trois cônes pour remplir un cylindre',
    texte:
      'On dispose d’un cône et d’un cylindre en plastique transparent qui ont '
      + 'exactement le même disque de base et exactement la même hauteur. On '
      + 'remplit le cône de sable ras bord, on le vide dans le cylindre, et on '
      + 'recommence jusqu’à ce que le cylindre soit plein. On refait l’expérience '
      + 'avec trois paires d’objets de tailles différentes.',
    lignes: [
      { calcul: 'la paire de 4 cm de haut', resultat: 'il a fallu 3 cônes pleins' },
      { calcul: 'la paire de 9 cm de haut', resultat: 'il a fallu 3 cônes pleins' },
      { calcul: 'la paire de 25 cm de haut', resultat: 'il a fallu 3 cônes pleins' },
    ],
    question:
      'Le compte ne change pas : il faut toujours trois cônes pleins pour remplir '
      + 'le cylindre. Une quatrième paire est plus grande, et son cylindre a un '
      + 'volume de 150 cm³. Une cinquième paire est plus petite, et c’est son cône '
      + 'qui a un volume de 8 cm³. Complète les deux cases.',
    champs: [
      { id: 'a', etiquette: 'le cône de la quatrième paire a un volume, en cm³, de', attendu: 50 },
      { id: 'b', etiquette: 'le cylindre de la cinquième paire a un volume, en cm³, de', attendu: 24 },
    ],
    conclusion:
      'Trois cônes pleins remplissent le cylindre : le cône vaut donc le **tiers** '
      + 'du cylindre. Pour la quatrième paire, 150 ÷ 3 = **50**. Pour la cinquième, '
      + 'le trajet est l’autre : 8 × 3 = **24**.\n'
      + 'Le cylindre, on sait le calculer depuis la 5e : son volume vaut **aire de '
      + 'la base × hauteur**. Le cône, qui a la même base et la même hauteur, en '
      + 'occupe le tiers :\n'
      + '**V = aire de la base × hauteur ÷ 3**.\n'
      + 'Et ce n’est pas propre au cône : une pyramide tient elle aussi exactement '
      + 'trois fois dans le prisme de même base et de même hauteur. Le tiers n’est '
      + 'pas un chiffre de la formule à retenir — c’est ce que tu viens de verser.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Pyramide, cône, et les longueurs qui partent du sommet',
      texte:
        'Une **pyramide** a une seule base, un polygone, et un **sommet** qui '
        + 'n’est pas dans le plan de cette base. Un **cône de révolution** a pour '
        + 'base un disque et un sommet situé au-dessus du centre de ce disque.\n'
        + 'La **hauteur** est la distance du sommet à la base, mesurée '
        + 'perpendiculairement : c’est le segment qui va du sommet au plan de la '
        + 'base en tombant droit. On la note souvent SH, où H est le pied de cette '
        + 'perpendiculaire.\n'
        + 'D’autres longueurs partent du sommet, et elles ne sont pas la hauteur : '
        + 'l’**arête latérale** d’une pyramide joint le sommet à un sommet de la '
        + 'base ; son **apothème** joint le sommet au milieu d’un côté de la base ; '
        + 'la **génératrice** d’un cône joint le sommet à un point du bord du '
        + 'disque. Toutes sont plus longues que la hauteur, parce qu’elles sont '
        + 'obliques.',
    },
    {
      type: 'propriete',
      titre: 'Le volume d’une pyramide et d’un cône',
      texte:
        'Pour une pyramide comme pour un cône de révolution :\n'
        + '**V = aire de la base × hauteur ÷ 3**.\n'
        + 'Le prisme ou le cylindre de même base et de même hauteur a pour volume '
        + 'aire de la base × hauteur, **sans** le tiers. Un cône tient trois fois '
        + 'dans son cylindre ; une pyramide tient trois fois dans son prisme.',
    },
    {
      type: 'propriete',
      titre: 'L’aire de la base, selon la base',
      texte:
        'Le tiers ne sert à rien si l’aire de la base est fausse. Selon la base :\n'
        + 'un **carré** de côté c a pour aire c × c ;\n'
        + 'un **rectangle** de dimensions L et l a pour aire L × l ;\n'
        + 'un **disque** de rayon r a pour aire **π × r × r**.\n'
        + 'Attention au disque : **2 × π × r** est la longueur de son bord, donc '
        + 'une longueur, en cm. L’aire, elle, se mesure en cm² : elle multiplie '
        + 'deux longueurs, et c’est pour cela qu’il y a deux r.\n'
        + 'Le compte vaut pour les trois bases : une aire multiplie toujours '
        + '**deux** longueurs — c × c, L × l, r × r. Une formule qui n’en '
        + 'multiplie qu’une, comme 2 × π × r pour le disque ou 4 × c pour le '
        + 'carré, rend le périmètre de la base, pas son aire.',
    },
    {
      type: 'remarque',
      titre: 'Quand la hauteur n’est pas donnée : Pythagore',
      texte:
        'Souvent l’énoncé donne une longueur oblique — une génératrice, un '
        + 'apothème, une arête latérale — et pas la hauteur. Il faut alors la '
        + 'calculer, et le triangle est toujours là :\n'
        + 'pour un **cône**, la hauteur, le rayon de la base et la génératrice '
        + 'forment un triangle rectangle dont l’angle droit est au centre du '
        + 'disque ;\n'
        + 'pour une **pyramide à base carrée**, la hauteur, la moitié d’un côté de '
        + 'la base et l’apothème forment un triangle rectangle dont l’angle droit '
        + 'est au pied de la hauteur.\n'
        + 'Dans les deux cas, la longueur oblique est l’**hypoténuse** : on cherche '
        + 'un côté de l’angle droit, donc on **soustrait** les carrés, et on '
        + 'n’oublie pas la racine carrée à la fin.',
    },
    {
      type: 'remarque',
      titre: 'Des cm³ aux litres',
      texte:
        'Un volume multiplie **trois** longueurs : le facteur de conversion se met '
        + 'donc au cube. Passer des cm aux dm divise les longueurs par 10, mais les '
        + 'volumes par 10 × 10 × 10 = **1 000**.\n'
        + '**1 dm³ = 1 000 cm³**, et **1 dm³ = 1 L**. Un volume de 7 000 cm³ vaut '
        + 'donc 7 dm³, c’est-à-dire 7 L. Et 1 cm³ = 1 mL.',
    },
    {
      type: 'exemple',
      titre: 'Deux pyramides, quand la hauteur est donnée',
      texte:
        'Une pyramide a pour base un carré de 4 cm de côté, et sa hauteur SH, '
        + 'perpendiculaire à la base, mesure 6 cm. L’aire de la base vaut '
        + '4 × 4 = 16 cm². Le volume vaut 16 × 6 ÷ 3 = 32 cm³. Contrôle : le prisme '
        + 'de même base et de même hauteur ferait 16 × 6 = 96 cm³, et 32 × 3 = 96.\n'
        + 'Une autre pyramide a pour base un rectangle de 7 cm sur 3 cm, et sa '
        + 'hauteur mesure 8 cm. L’aire de la base vaut 7 × 3 = 21 cm², et le volume '
        + '21 × 8 ÷ 3 = 56 cm³.',
    },
    {
      type: 'exemple',
      titre: 'Deux cônes, et le piège du diamètre',
      texte:
        'Un cône de révolution a un disque de base de rayon 5 cm et une hauteur de '
        + '9 cm ; on prend π ≈ 3,14. L’aire de la base vaut 3,14 × 5 × 5 = '
        + '78,5 cm². Le volume vaut 78,5 × 9 ÷ 3 = 235,5 cm³.\n'
        + 'Un second cône a un disque de base de **diamètre** 20 cm et une hauteur '
        + 'de 6 cm. Le rayon est la moitié du diamètre : r = 10 cm. L’aire de la '
        + 'base vaut 3,14 × 10 × 10 = 314 cm², et le volume 314 × 6 ÷ 3 = 628 cm³. '
        + 'Avec 20 à la place de 10, on aurait trouvé quatre fois trop.',
    },
    {
      type: 'exemple',
      titre: 'Deux solides dont la hauteur est à trouver',
      texte:
        'Un cône de révolution a pour sommet S et pour centre de base O. Le rayon '
        + 'OA vaut 8 cm et la génératrice SA vaut 17 cm ; le triangle SOA est '
        + 'rectangle en O. La génératrice est l’hypoténuse, donc on soustrait : '
        + 'SO² = 17² − 8² = 289 − 64 = 225, donc SO = 15 cm. Avec π ≈ 3,14, l’aire '
        + 'de la base vaut 3,14 × 8 × 8 = 200,96 cm², et le volume '
        + '200,96 × 15 ÷ 3 = 1 004,8 cm³.\n'
        + 'Une pyramide a pour base un carré de 10 cm de côté, de centre H. M est '
        + 'le milieu d’un côté de la base, HM vaut donc 5 cm, et l’apothème SM vaut '
        + '13 cm ; le triangle SHM est rectangle en H. On soustrait : '
        + 'SH² = 13² − 5² = 169 − 25 = 144, donc SH = 12 cm. Le volume vaut '
        + '100 × 12 ÷ 3 = 400 cm³. Employer 13 au lieu de 12 aurait donné une '
        + 'pyramide aussi haute que son apothème est long : impossible, puisque '
        + 'l’apothème est oblique et donc toujours plus long que la hauteur.',
    },
  ],

  methode: {
    titre: 'Trier les longueurs avant de calculer',
    enonce:
      'Un cône de révolution a pour sommet S et pour centre de base O. Son disque '
      + 'de base a un diamètre de 40 cm. Le segment SA, qui joint le sommet à un '
      + 'point A du bord du disque, mesure 25 cm ; le triangle SOA est rectangle '
      + 'en O. On prend π ≈ 3,14. Quel est le volume de ce cône, en cm³ ?',
    etapes: [
      {
        texte: 'Je relis l’énoncé longueur par longueur. 40 cm est le DIAMÈTRE du disque de base : le rayon en est la moitié, donc OA = 20 cm.',
        note: 'Rien n’est calculé tant que je ne sais pas ce qu’est chaque nombre.',
      },
      {
        texte: 'SA n’est pas la hauteur : c’est la génératrice, oblique. La hauteur est SO, qui tombe perpendiculairement au centre O.',
        note: 'Deux longueurs partent du sommet ; la hauteur est la plus courte des deux.',
      },
      {
        texte: 'Le triangle SOA est rectangle en O et SA en est l’hypoténuse. Je soustrais : SO² = 25² − 20² = 625 − 400 = 225, donc SO = 15 cm.',
        note: 'Je cherche un côté de l’angle droit : on soustrait, et on prend la racine.',
      },
      {
        texte: 'L’aire du disque de base vaut π × r × r = 3,14 × 20 × 20 = 1 256 cm².',
        note: 'Le rayon est multiplié deux fois — pas 2 × π × r, qui ne le multiplie qu’une fois et donne une longueur.',
      },
      {
        texte: 'Le volume vaut 1 256 × 15 ÷ 3 = 6 280 cm³.',
        note: 'Le tiers arrive en dernier, et c’est là qu’il se perd.',
      },
    ],
    controle:
      'Le contrôle : compare ton cône au cylindre qui l’enveloppe — même disque de '
      + 'base, même hauteur. Ce cylindre a pour volume 1 256 × 15 = 18 840 cm³, et '
      + 'le cône doit en faire exactement le tiers. Or 6 280 × 3 = 18 840 : le '
      + 'compte y est. Si ton résultat était du même ordre que celui du cylindre, '
      + 'le tiers manquerait.\n'
      + 'Et un second coup d’œil, gratuit : la hauteur trouvée doit être plus '
      + 'COURTE que la longueur oblique de l’énoncé. Ici 15 cm contre 25 cm, l’ordre '
      + 'est respecté. Une hauteur plus longue que la génératrice est impossible, et '
      + 'ça se voit sans refaire un seul calcul.\n'
      + 'Reste l’étape 1, celle du rayon, et elle se contrôle elle aussi : si tu '
      + 'avais gardé 40 comme rayon, Pythagore t’aurait demandé '
      + '25² − 40² = 625 − 1 600, un nombre négatif. Un carré de longueur ne peut '
      + 'pas l’être : c’est le signe que la longueur employée est trop grande pour '
      + 'être un rayon — 40 cm était le diamètre.',
  },

  entrainement: [
    // ── Palier 1 : la formule, et le tiers qui ne s’oublie pas ─────────────
    {
      id: 'e-15-3-1', type: 'calcul', palier: 1, piege: 'tiers-oublie',
      consigne:
        'SABCD est une pyramide dont la base ABCD est un carré de 9 cm de côté. Le '
        + 'point H est le centre de ce carré, et la hauteur SH, perpendiculaire à la '
        + 'base, mesure 7 cm. Calcule le volume de la pyramide, en cm³.',
      enonce: '\\text{base carrée de 9 cm de côté, hauteur SH = 7 cm}',
      attendu: 189,
      fausses: [
        // 81 × 7 : c’est le volume du PRISME de même base et de même hauteur.
        { valeur: 567, piege: 'tiers-oublie' },
      ],
    },
    {
      // NEUTRE. On ne demande que l’aire de la base, pas le volume : le tiers
      // n’intervient nulle part, et l’élève qui l’oublie toujours répond juste
      // ici. Sans cet item, « pyramide ou cône, donc je divise par 3 » ne serait
      // jamais mis en défaut au palier 1. Les deux fausses pointent donc vers
      // les deux AUTRES confusions que ce calcul peut révéler.
      id: 'e-15-3-2', type: 'calcul', palier: 1, neutre: true, piege: 'tiers-oublie',
      consigne:
        'Un cône de révolution a un disque de base dont le diamètre mesure 8 cm. On '
        + 'prend π ≈ 3,14. Calcule l’aire de ce disque de base, en cm². (On ne '
        + 'demande pas le volume.)',
      enonce: '\\text{disque de base de diamètre 8 cm, π ≈ 3,14}',
      attendu: 50.24,
      fausses: [
        // 3,14 × 8 × 8 : le diamètre porté dans la formule à la place du rayon.
        // L’aire s’en trouve multipliée par 4.
        { valeur: 200.96, piege: 'rayon-et-diametre-confondus' },
        // 2 × 3,14 × 4 : c’est la longueur du bord du disque, en cm, pas son aire.
        { valeur: 25.12, piege: 'perimetre-au-lieu-de-laire' },
      ],
    },
    {
      id: 'e-15-3-3', type: 'calcul', palier: 1, piege: 'perimetre-au-lieu-de-laire',
      consigne:
        'Un cône de révolution a un disque de base de rayon 3 cm, et sa hauteur, '
        + 'perpendiculaire à la base, mesure 10 cm. On prend π ≈ 3,14. Calcule son '
        + 'volume, en cm³.',
      enonce: '\\text{cône : rayon de la base 3 cm, hauteur 10 cm, π ≈ 3,14}',
      attendu: 94.2,
      fausses: [
        // 2 × 3,14 × 3 = 18,84 employé comme aire de base : 18,84 × 10 ÷ 3.
        { valeur: 62.8, piege: 'perimetre-au-lieu-de-laire' },
        // 3,14 × 9 × 10 : le tiers manque, c’est le volume du cylindre.
        { valeur: 282.6, piege: 'tiers-oublie' },
      ],
    },

    // ── Palier 2 : la longueur qu’on porte dans la formule ─────────────────
    {
      id: 'e-15-3-4', type: 'calcul', palier: 2, piege: 'rayon-et-diametre-confondus',
      consigne:
        'Un cône de révolution a un disque de base dont le diamètre mesure 6 cm. Sa '
        + 'hauteur, perpendiculaire à la base, mesure 5 cm. On prend π ≈ 3,14. '
        + 'Calcule son volume, en cm³.',
      enonce: '\\text{cône : diamètre de la base 6 cm, hauteur 5 cm, π ≈ 3,14}',
      attendu: 47.1,
      fausses: [
        // 3,14 × 6 × 6 × 5 ÷ 3 : le diamètre pris pour le rayon. Le volume est
        // multiplié par 4.
        { valeur: 188.4, piege: 'rayon-et-diametre-confondus' },
        // 3,14 × 3 × 3 × 5 : bon rayon, tiers manquant.
        { valeur: 141.3, piege: 'tiers-oublie' },
        // 2 × 3,14 × 3 = 18,84 employé comme aire de base : 18,84 × 5 ÷ 3.
        { valeur: 31.4, piege: 'perimetre-au-lieu-de-laire' },
      ],
    },
    {
      // La hauteur n’est PAS donnée : elle se calcule par Pythagore à partir du
      // rayon et de la génératrice. Contrôle possible sans π : 6² + 8² = 100 = 10².
      id: 'e-15-3-5', type: 'calcul', palier: 2, piege: 'hauteur-et-arete-confondues',
      consigne:
        'Un cône de révolution a pour sommet S et pour centre de base O. Le rayon OA '
        + 'du disque de base mesure 6 cm, où A est un point du bord. Le segment SA, '
        + 'qui joint le sommet au point A, mesure 10 cm : c’est la génératrice. La '
        + 'hauteur SO est perpendiculaire à la base, donc le triangle SOA est '
        + 'rectangle en O. On prend π ≈ 3,14. Calcule le volume du cône, en cm³.',
      enonce: '\\text{cône : OA = 6 cm, SA = 10 cm, triangle SOA rectangle en O, π ≈ 3,14}',
      attendu: 301.44,
      fausses: [
        // 3,14 × 36 × 10 ÷ 3 : la génératrice employée comme hauteur. Elle est
        // oblique, donc plus longue que la hauteur — le volume est trop grand.
        { valeur: 376.8, piege: 'hauteur-et-arete-confondues' },
        // 3,14 × 36 × 8 : bonne hauteur, tiers manquant.
        { valeur: 904.32, piege: 'tiers-oublie' },
      ],
    },
    {
      // Deuxième Pythagore, et en « trous » exprès : demander la hauteur AVANT le
      // volume rend lisibles deux erreurs qu’un calcul unique aurait noyées —
      // l’apothème recopié tel quel (15) et le carré gardé pour la longueur
      // (144). Contrôle sans π : 9² + 12² = 225 = 15².
      id: 'e-15-3-6', type: 'trous', palier: 2, piege: 'hauteur-et-arete-confondues',
      consigne:
        'SABCD est une pyramide dont la base ABCD est un carré de 18 cm de côté. H '
        + 'est le centre de ce carré et la hauteur SH est perpendiculaire à la base. '
        + 'M est le milieu du côté [BC], et l’apothème SM mesure 15 cm. Le triangle '
        + 'SHM est rectangle en H, et HM mesure 9 cm, la moitié du côté. Complète la '
        + 'hauteur, puis le volume.',
      enonce:
        '\\text{base carrée de 18 cm de côté, SM = 15 cm, HM = 9 cm} \\qquad '
        + '\\text{hauteur SH = } \\square \\text{ cm} \\qquad '
        + '\\text{volume = } \\square \\text{ cm³}',
      champs: [
        { id: 'a', etiquette: 'hauteur SH, en cm', attendu: 12 },
        { id: 'b', etiquette: 'volume de la pyramide, en cm³', attendu: 1296 },
      ],
      fausses: [
        // L’apothème recopié comme hauteur : SM est oblique, donc plus long.
        { valeur: 15, piege: 'hauteur-et-arete-confondues' },
        // 324 × 15 ÷ 3 : la même confusion, propagée jusqu’au volume.
        { valeur: 1620, piege: 'hauteur-et-arete-confondues' },
        // 225 − 81 = 144 : le calcul est juste, mais 144 est le CARRÉ de la
        // hauteur. Il reste la racine à prendre.
        { valeur: 144, piege: 'racine-oubliee' },
        // 324 × 12 : bonne hauteur, tiers manquant.
        { valeur: 3888, piege: 'tiers-oublie' },
      ],
    },
    {
      // NEUTRE. L’énoncé ne donne QUE la hauteur — aucune arête, aucun apothème,
      // et il le dit. La confusion hauteur/longueur oblique n’a rien à quoi
      // s’accrocher : l’élève qui la porte répond juste ici. Ce qui reste à ne pas
      // perdre, c’est le tiers, et c’est vers lui que pointe la fausse.
      id: 'e-15-3-7', type: 'trous', palier: 2, neutre: true, piege: 'hauteur-et-arete-confondues',
      consigne:
        'SABCD est une pyramide dont la base ABCD est un rectangle de 15 cm sur '
        + '4 cm. Sa hauteur SH, perpendiculaire à la base, mesure 7 cm. Aucune autre '
        + 'longueur n’est donnée. Complète l’aire de la base, puis le volume.',
      enonce:
        '\\text{base rectangulaire de 15 cm sur 4 cm, hauteur SH = 7 cm} \\qquad '
        + '\\text{aire de la base = } \\square \\text{ cm²} \\qquad '
        + '\\text{volume = } \\square \\text{ cm³}',
      champs: [
        { id: 'a', etiquette: 'aire de la base, en cm²', attendu: 60 },
        { id: 'b', etiquette: 'volume de la pyramide, en cm³', attendu: 140 },
      ],
      fausses: [
        // 60 × 7 : le volume du prisme de même base et de même hauteur.
        { valeur: 420, piege: 'tiers-oublie' },
      ],
    },

    // ── Palier 3 : discriminer, convertir, réfuter ─────────────────────────
    {
      // NEUTRE, et le plus important des trois. Le solide est un CYLINDRE, et le
      // volume annoncé est exactement le tiers du bon. Répondre « oui » n’est pas
      // oublier le tiers : c’est en mettre un là où il n’y en a pas. Le piège du
      // savoir-faire ne peut donc pas produire cette erreur — l’élève qui le
      // porte calcule 471 et répond juste. Sans cet item, la stratégie « on me
      // parle de volume, donc je divise par 3 » serait récompensée partout.
      id: 'e-15-3-8', type: 'plausible', palier: 3, neutre: true, piege: 'tiers-oublie',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Un cylindre de révolution a un disque de base de rayon 5 cm et une hauteur de 6 cm.} '
        + '\\quad \\text{On prend π ≈ 3,14 : on annonce un volume de 157 cm³.}',
      attendu: false,
      fausses: [],
      explication:
        'Un cylindre a deux disques de base parallèles, et son volume vaut aire de '
        + 'la base × hauteur, sans tiers. L’aire de la base vaut 3,14 × 5 × 5 = '
        + '78,5 cm², donc le volume vaut 78,5 × 6 = 471 cm³. Les 157 cm³ annoncés '
        + 'sont exactement le tiers de 471 : c’est le volume du CÔNE de même base et '
        + 'de même hauteur, pas celui du cylindre. Le tiers appartient à la pyramide '
        + 'et au cône, jamais au prisme ni au cylindre.',
    },
    {
      id: 'e-15-3-9', type: 'calcul', palier: 3, piege: 'unite-de-volume-mal-convertie',
      consigne:
        'Un récipient a la forme d’un cône de révolution. Son disque de base a un '
        + 'rayon de 15 cm, et sa hauteur, perpendiculaire à la base, mesure 20 cm. '
        + 'On prend π ≈ 3,14, et on rappelle que 1 dm³ = 1 L. Calcule le volume de '
        + 'ce récipient, en litres.',
      enonce: '\\text{cône : rayon 15 cm, hauteur 20 cm, π ≈ 3,14 ; réponse en litres, avec 1 dm³ = 1 L}',
      attendu: 4.71,
      fausses: [
        // Le volume en cm³, annoncé tel quel en litres : la conversion manque.
        { valeur: 4710, piege: 'unite-de-volume-mal-convertie' },
        // Divisé par 10, comme on le ferait pour des longueurs. Un volume demande
        // trois longueurs, donc 10 × 10 × 10.
        { valeur: 471, piege: 'unite-de-volume-mal-convertie' },
        // 14 130 cm³ correctement converti : la conversion est bonne, c’est le
        // tiers qui manque en amont.
        { valeur: 14.13, piege: 'tiers-oublie' },
      ],
    },
    {
      id: 'e-15-3-10', type: 'vraifaux', palier: 3, piege: 'tiers-oublie',
      consigne: 'Vrai ou faux ? Si c’est faux, donne un contre-exemple.',
      affirmation:
        'Une pyramide et un prisme droit qui ont la même base et la même hauteur '
        + 'ont le même volume.',
      attendu: false,
      contreExemple: {
        // On ne demande pas de réciter « il y a un tiers » : on fait CALCULER les
        // deux volumes sur la même base et la même hauteur. Le rapport 3 sort
        // alors des nombres de l’élève, comme il sortait du sable de la découverte.
        invite:
          'Une pyramide et un prisme droit ont tous les deux une base d’aire '
          + '21 cm² et une hauteur de 4 cm. Donne d’abord le volume du prisme, puis '
          + 'celui de la pyramide.',
        champs: [
          { id: 'a', etiquette: 'volume du prisme, en cm³' },
          { id: 'b', etiquette: 'volume de la pyramide, en cm³' },
        ],
        valide: (a, b) => Math.abs(a - 84) < 1e-9 && Math.abs(b - 28) < 1e-9,
        temoin: [84, 28],
        exemple:
          'Le prisme a pour volume 21 × 4 = 84 cm³. La pyramide, elle, n’en occupe '
          + 'que le tiers : 84 ÷ 3 = 28 cm³. Même base, même hauteur, et pourtant '
          + 'trois fois moins de place — c’est exactement ce que montraient les '
          + 'trois versées de sable.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-15-3-1',
      enonce:
        'Un chapiteau de cirque a la forme d’un cône de révolution posé sur le sol. '
        + 'Son disque de base a un rayon de 15 m, et sa hauteur, perpendiculaire au '
        + 'sol, mesure 12 m. On prend π ≈ 3,14.',
      questions: [
        { texte: 'Quelle est l’aire du disque de sol occupé par le chapiteau ?', attendu: 706.5, unite: 'm²' },
        { texte: 'Quel volume d’air le chapiteau contient-il ?', attendu: 2826, unite: 'm³' },
        { texte: 'Un second chapiteau a le même disque de base, mais une hauteur deux fois plus grande. Quel est son volume ?', attendu: 5652, unite: 'm³' },
      ],
    },
    {
      // Le lien avec la découverte, en grandeur réelle : le prisme, puis le tiers.
      id: 'p-15-3-2',
      enonce:
        'Un monument a la forme d’une pyramide dont la base est un carré de 30 m de '
        + 'côté. Sa hauteur, perpendiculaire à la base, mesure 20 m.',
      questions: [
        { texte: 'Quelle est l’aire de la base du monument ?', attendu: 900, unite: 'm²' },
        { texte: 'Quel est le volume du monument ?', attendu: 6000, unite: 'm³' },
        { texte: 'Quel serait le volume d’un prisme droit ayant la même base et la même hauteur ?', attendu: 18000, unite: 'm³' },
      ],
    },
    {
      // Pythagore, puis le passage aux litres : les deux gestes du savoir-faire
      // enchaînés sur un même objet. Contrôle sans π : 5² + 12² = 169 = 13².
      id: 'p-15-3-3',
      enonce:
        'Un entonnoir a la forme d’un cône de révolution, pointe en bas. Son sommet '
        + 'est S et le centre de son disque du haut est O. Le rayon OA de ce disque '
        + 'mesure 5 cm, et la génératrice SA mesure 13 cm ; le triangle SOA est '
        + 'rectangle en O. On prend π ≈ 3,14, et on rappelle que 1 dm³ = 1 L.',
      questions: [
        { texte: 'Quelle est la hauteur SO de l’entonnoir ?', attendu: 12, unite: 'cm' },
        { texte: 'Quel est le volume de l’entonnoir, en cm³ ?', attendu: 314, unite: 'cm³' },
        { texte: 'Quel est ce même volume, en litres ?', attendu: 0.314, unite: 'L' },
      ],
    },
    {
      id: 'p-15-3-4',
      enonce:
        'Un cornet de glace a la forme d’un cône de révolution, pointe en bas. Le '
        + 'disque du haut a un diamètre de 12 cm, et la hauteur du cornet, '
        + 'perpendiculaire à ce disque, mesure 7 cm. On prend π ≈ 3,14.',
      questions: [
        { texte: 'Quel est le rayon du disque du haut ?', attendu: 6, unite: 'cm' },
        { texte: 'Quelle est l’aire de ce disque ?', attendu: 113.04, unite: 'cm²' },
        { texte: 'Quel est le volume du cornet ?', attendu: 263.76, unite: 'cm³' },
      ],
    },
    {
      // Second Pythagore, côté pyramide, avec l’apothème.
      // Contrôle sans calculatrice : 6² + 8² = 100 = 10².
      id: 'p-15-3-5',
      enonce:
        'Un abri de jardin a un toit en forme de pyramide dont la base est un carré '
        + 'de 16 cm de côté sur la maquette. H est le centre de ce carré et la '
        + 'hauteur SH est perpendiculaire à la base. M est le milieu d’un côté de la '
        + 'base, HM mesure donc 8 cm, et l’apothème SM mesure 10 cm ; le triangle '
        + 'SHM est rectangle en H.',
      questions: [
        { texte: 'Quelle est la hauteur SH du toit sur la maquette ?', attendu: 6, unite: 'cm' },
        { texte: 'Quelle est l’aire de la base du toit ?', attendu: 256, unite: 'cm²' },
        { texte: 'Quel est le volume du toit sur la maquette ?', attendu: 512, unite: 'cm³' },
      ],
    },
  ],

  test: [
    {
      id: 't-15-3-1', type: 'calcul',
      consigne:
        'SABCD est une pyramide dont la base ABCD est un carré de 6 cm de côté. Sa '
        + 'hauteur SH, perpendiculaire à la base, mesure 5 cm. Calcule son volume, '
        + 'en cm³.',
      enonce: '\\text{base carrée de 6 cm de côté, hauteur SH = 5 cm}',
      attendu: 60,
      fausses: [{ valeur: 180, piege: 'tiers-oublie' }],
      revoir: 'propriete',
    },
    {
      id: 't-15-3-2', type: 'calcul',
      consigne:
        'Un cône de révolution a un disque de base de rayon 4 cm et une hauteur de '
        + '9 cm, perpendiculaire à la base. On prend π ≈ 3,14. Calcule son volume, '
        + 'en cm³.',
      enonce: '\\text{cône : rayon de la base 4 cm, hauteur 9 cm, π ≈ 3,14}',
      attendu: 150.72,
      fausses: [
        { valeur: 452.16, piege: 'tiers-oublie' },
        // 2 × 3,14 × 4 = 25,12 employé comme aire de base.
        { valeur: 75.36, piege: 'perimetre-au-lieu-de-laire' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-15-3-3', type: 'trous',
      consigne:
        'Un cône de révolution a un disque de base dont le diamètre mesure 14 cm. Sa '
        + 'hauteur, perpendiculaire à la base, mesure 6 cm. On prend π ≈ 3,14. '
        + 'Complète le rayon, puis le volume.',
      enonce:
        '\\text{cône : diamètre de la base 14 cm, hauteur 6 cm, π ≈ 3,14} \\qquad '
        + '\\text{rayon = } \\square \\text{ cm} \\qquad '
        + '\\text{volume = } \\square \\text{ cm³}',
      champs: [
        { id: 'a', etiquette: 'rayon du disque de base, en cm', attendu: 7 },
        { id: 'b', etiquette: 'volume du cône, en cm³', attendu: 307.72 },
      ],
      fausses: [
        { valeur: 14, piege: 'rayon-et-diametre-confondus' },
        { valeur: 1230.88, piege: 'rayon-et-diametre-confondus' },
        { valeur: 923.16, piege: 'tiers-oublie' },
      ],
      piege: 'rayon-et-diametre-confondus', revoir: 'exemple',
    },
    {
      id: 't-15-3-4', type: 'calcul',
      consigne:
        'Un cône de révolution a pour sommet S et pour centre de base O. Le rayon OA '
        + 'du disque de base mesure 9 cm, et la génératrice SA mesure 15 cm ; le '
        + 'triangle SOA est rectangle en O. On prend π ≈ 3,14. Calcule le volume du '
        + 'cône, en cm³.',
      enonce: '\\text{cône : OA = 9 cm, SA = 15 cm, triangle SOA rectangle en O, π ≈ 3,14}',
      attendu: 1017.36,
      fausses: [
        { valeur: 1271.7, piege: 'hauteur-et-arete-confondues' },
        { valeur: 3052.08, piege: 'tiers-oublie' },
      ],
      piege: 'hauteur-et-arete-confondues', revoir: 'remarque',
    },
    {
      id: 't-15-3-5', type: 'calcul',
      consigne:
        'Un bac a la forme d’une pyramide dont la base est un carré de 50 cm de '
        + 'côté. Sa hauteur, perpendiculaire à la base, mesure 12 cm. On rappelle '
        + 'que 1 dm³ = 1 L. Calcule son volume, en litres.',
      enonce: '\\text{pyramide : base carrée de 50 cm de côté, hauteur 12 cm ; réponse en litres, avec 1 dm³ = 1 L}',
      attendu: 10,
      fausses: [
        { valeur: 10000, piege: 'unite-de-volume-mal-convertie' },
        { valeur: 1000, piege: 'unite-de-volume-mal-convertie' },
        { valeur: 30, piege: 'tiers-oublie' },
      ],
      piege: 'unite-de-volume-mal-convertie', revoir: 'remarque',
    },
    {
      id: 't-15-3-6', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Une pyramide a une base d’aire 12 cm² et une hauteur de 5 cm : on annonce un volume de 20 cm³.}',
      attendu: true,
      // Le seul « plausible » vrai du test : répondre « non » ici, c’est avoir
      // calculé 12 × 5 = 60 sans le tiers. Sans cette ligne, la seule erreur
      // possible sur cet item ne serait rattachée à rien.
      fausses: [{ valeur: false, piege: 'tiers-oublie' }],
      explication:
        'Le volume d’une pyramide vaut aire de la base × hauteur ÷ 3, soit '
        + '12 × 5 ÷ 3 = 20 cm³. C’est bien la valeur annoncée. Contrôle : le prisme '
        + 'de même base et de même hauteur ferait 60 cm³, et 20 × 3 = 60.',
      revoir: 'propriete',
    },
    {
      id: 't-15-3-7', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Un cône de révolution a un disque de base de rayon 3 cm et une hauteur de 4 cm.} '
        + '\\quad \\text{On prend π ≈ 3,14 : on annonce un volume de 113,04 cm³.}',
      attendu: false,
      explication:
        'L’aire du disque de base vaut 3,14 × 3 × 3 = 28,26 cm², et 28,26 × 4 = '
        + '113,04 : c’est le volume du CYLINDRE de même base et de même hauteur. Le '
        + 'cône n’en occupe que le tiers, soit 113,04 ÷ 3 = 37,68 cm³. La valeur '
        + 'annoncée est trois fois trop grande.',
      piege: 'tiers-oublie', revoir: 'propriete',
    },
    {
      id: 't-15-3-8', type: 'corriger',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l’erreur apparaît.',
      enonce:
        '\\text{Un cône de révolution a un disque de base de rayon 10 cm et une hauteur de 9 cm.} '
        + '\\quad \\text{On prend π ≈ 3,14. Quel est son volume ?}',
      lignes: [
        { texte: 'Le volume d’un cône vaut aire de la base × hauteur ÷ 3.', fausse: false },
        { texte: 'L’aire du disque de base vaut 2 × 3,14 × 10 = 62,8 cm².', fausse: true },
        { texte: 'Le volume vaut donc 62,8 × 9 ÷ 3 = 188,4 cm³.', fausse: false },
      ],
      explication:
        'La première ligne énonce correctement la formule, et la troisième calcule '
        + 'juste à partir de la deuxième. C’est la deuxième qui casse tout : '
        + '2 × π × r est la longueur du BORD du disque, en cm, pas son aire. L’aire '
        + 'vaut π × r × r = 3,14 × 10 × 10 = 314 cm², et le volume '
        + '314 × 9 ÷ 3 = 942 cm³. Le contrôle tient en une question : combien de '
        + 'longueurs faut-il multiplier pour obtenir une aire ?',
      piege: 'perimetre-au-lieu-de-laire', revoir: 'propriete',
    },
    {
      id: 't-15-3-9', type: 'trous',
      consigne:
        'SABCD est une pyramide dont la base ABCD est un carré de 24 cm de côté. H '
        + 'est le centre de ce carré et la hauteur SH est perpendiculaire à la base. '
        + 'M est le milieu du côté [BC], et l’apothème SM mesure 13 cm. Le triangle '
        + 'SHM est rectangle en H, et HM mesure 12 cm. Complète la hauteur, puis le '
        + 'volume.',
      enonce:
        '\\text{base carrée de 24 cm de côté, SM = 13 cm, HM = 12 cm} \\qquad '
        + '\\text{hauteur SH = } \\square \\text{ cm} \\qquad '
        + '\\text{volume = } \\square \\text{ cm³}',
      champs: [
        { id: 'a', etiquette: 'hauteur SH, en cm', attendu: 5 },
        { id: 'b', etiquette: 'volume de la pyramide, en cm³', attendu: 960 },
      ],
      fausses: [
        { valeur: 13, piege: 'hauteur-et-arete-confondues' },
        { valeur: 2496, piege: 'hauteur-et-arete-confondues' },
        { valeur: 25, piege: 'racine-oubliee' },
        { valeur: 2880, piege: 'tiers-oublie' },
      ],
      piege: 'hauteur-et-arete-confondues', revoir: 'remarque',
    },
    {
      id: 't-15-3-10', type: 'calcul',
      consigne:
        'Une pyramide a une base d’aire 15 cm² et un volume de 90 cm³. Calcule sa '
        + 'hauteur, en cm.',
      enonce: '\\text{pyramide : aire de la base 15 cm², volume 90 cm³}',
      attendu: 18,
      fausses: [
        // 90 ÷ 15 : le tiers oublié, cette fois dans le trajet inverse. Comme
        // V = B × h ÷ 3, on a h = V × 3 ÷ B, et non V ÷ B.
        { valeur: 6, piege: 'tiers-oublie' },
      ],
      piege: 'tiers-oublie', revoir: 'propriete',
    },
  ],
};
