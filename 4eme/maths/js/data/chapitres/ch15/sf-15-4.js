// Chapitre 15, savoir-faire 4 — Se repérer dans un pavé droit.
//
// ── Un seul piège, mais deux formes qui ne se corrigent pas pareil ─────────
//
// `troisieme-coordonnee-oubliee` recouvre deux erreurs distinctes, et un lot
// qui n’attraperait que la première laisserait l’autre intacte :
//
//   · la COORDONNÉE MANQUANTE — deux nombres donnés là où il en faut trois,
//     parce que dans le plan deux suffisaient ;
//   · le MAUVAIS ORDRE — les trois bons nombres, rangés autrement, ce qui
//     désigne un autre point du pavé.
//
// Les deux sont atteintes séparément. La coordonnée manquante : e-15-4-4 (un
// sommet annoncé avec deux nombres), e-15-4-8 (le volume calculé avec deux des
// trois coordonnées) et e-15-4-10, dont le contre-exemple fait produire à
// l’élève les deux sommets que deux nombres confondraient. Le mauvais ordre :
// e-15-4-3 (une longueur lue sur une autre arête donnée comme troisième
// coordonnée), e-15-4-6 (un triplet juste rejeté parce qu’on l’attendait dans
// un autre ordre) et e-15-4-7, où la ligne fausse range un 6 en première
// coordonnée au lieu de la deuxième et fait tomber D sur B.
//
// ── Les deux sens, parce qu’ils ne s’apprennent pas l’un par l’autre ───────
//
// Cinq items partent d’un sommet et demandent ses coordonnées (e-15-4-1,
// e-15-4-2, e-15-4-3, e-15-4-4, e-15-4-7) ; quatre partent d’un triplet et
// demandent ce qu’il désigne — quel sommet (e-15-4-5, e-15-4-6), ou quelles
// dimensions du pavé (e-15-4-8, e-15-4-9). Le dixième réfute la règle « deux
// nombres suffisent ». L’auto-évaluation garde le même équilibre.
//
// ── Pourquoi ces trois items neutres ──────────────────────────────────────
//
// La stratégie de surface à casser est double : « je range les nombres dans
// l’ordre où l’énoncé donne les dimensions » et « le troisième nombre, c’est
// la hauteur, donc 0 quand je n’y pense pas ». La première ne se casse qu’en
// citant les dimensions dans un ordre AUTRE que celui de la convention : c’est
// fait dans la méthode résolue (AE, puis AB, puis AD) et dans e-15-4-3 (AD,
// puis AE, puis AB), où recopier l’ordre de citation produit exactement l’une
// des réponses fausses déclarées. Partout ailleurs les deux ordres coïncident,
// et c’est volontaire : l’élève ne doit pas avoir à démêler deux difficultés
// à la fois. Trois items, eux, sont hors de portée des DEUX formes du piège,
// et c’est vérifiable item par item.
//
// e-15-4-2 demande les coordonnées de l’origine — et l’origine y est E, pas A,
// pour que la réponse ne soit pas un souvenir attaché à la lettre A. La réponse
// est (0 ; 0 ; 0) : la permuter ne la change pas, et l’élève qui néglige une
// direction écrit 0 dans la case correspondante, ce qui est justement juste.
//
// e-15-4-5 demande si le triplet (15 ; 4 ; 9) est le sommet D. Il ne l’est pas,
// et il ne l’est dans AUCUN ordre : D vaut (0 ; 4 ; 0), et ses trois nombres ne
// sont pas ceux du triplet annoncé. L’élève qui permute rejette, l’élève qui
// s’arrête à deux nombres rejette aussi — le piège ne peut pas produire le
// « oui ».
//
// e-15-4-9 fait lire la plus longue arête sur les coordonnées du coin opposé.
// Le plus grand de trois nombres ne dépend pas de l’ordre dans lequel on les
// range, et laisser tomber le dernier ne le change pas non plus ici : 12 reste
// le plus grand. L’item se joue ailleurs — comprendre que ce triplet EST le
// jeu des trois dimensions.
//
// Sans ces trois-là, un élève qui ne compte que deux directions traverserait le
// lot en marquant des points, et e-15-4-8, qui le prend en défaut, passerait
// pour un accident.
//
// ── Aucune figure, donc la convention est écrite en entier partout ────────
//
// Un pavé ne se repère pas sans qu’on ait dit OÙ est l’origine, QUELLES arêtes
// portent les trois directions et DANS QUEL ORDRE les coordonnées s’écrivent.
// Ces trois informations figurent dans chaque consigne, exercices, problèmes et
// auto-évaluation compris.
// Le nom des sommets (ABCD en bas, EFGH en haut, E au-dessus de A, F au-dessus
// de B, G au-dessus de C, H au-dessus de D) est rappelé partout où la position
// du point demandé en dépend. Quatre items ne le portent pas en entier, et
// c’est vérifiable : e-15-4-7 ne parle que de B et de D, t-15-4-5 que de E —
// trois sommets que les arêtes [AB], [AD] et [AE] de la convention suffisent à
// placer ; t-15-4-10 ne parle que de B et de D ; t-15-4-8 ne nomme aucun sommet
// et ne demande que si un triplet peut en être un, ce qui ne tient qu’aux trois
// longueurs. Les trois derniers rappellent tout de même que E est au-dessus
// de A.
// Les trois dimensions sont données de même, sauf dans les items dont c’est
// justement l’objet de les faire lire sur les coordonnées du coin opposé
// (e-15-4-8, e-15-4-9, p-15-4-3, t-15-4-6, t-15-4-9).
// Aucun énoncé ne renvoie à un dessin, et aucun ne suppose une orientation
// « naturelle » de la feuille.
//
// ── Aucune calculatrice, donc des nombres qui tombent juste ───────────────
//
// Tous les résultats sont exacts : des entiers, sauf trois milieux ou centres de
// face, choisis pour tomber sur un demi-entier exact (3,5 puis 1,5 dans les
// problèmes, 4,5 dans l’auto-évaluation).
// Les réponses fausses déclarées tombent juste elles aussi — une erreur qui ne
// tomberait pas juste ne serait jamais tapée telle quelle, et le diagnostic ne
// se déclencherait pas.
//
// ── Ce que ce savoir-faire ne couvre pas ──────────────────────────────────
//
// Ni le volume d’une pyramide ou d’un cône, ni les patrons, ni les longueurs
// obliques calculées par Pythagore : ce sont les autres savoir-faire du
// chapitre. Aucune distance entre deux points quelconques de l’espace non plus
// — hors programme de 4e. La seule distance calculée ici, dans p-15-4-5, sépare
// deux points qui ne diffèrent que par leur troisième coordonnée : c’est une
// soustraction, et c’est précisément l’idée du savoir-faire.

export default {
  id: 'sf-15-4',
  titre: 'Se repérer dans un pavé droit',
  attendus: [
    'Il se repère dans un pavé droit à l’aide de trois coordonnées.',
    'Il utilise la convention donnée par l’énoncé pour lire et pour écrire des coordonnées dans l’espace.',
  ],

  // On n’énonce pas « il faut trois nombres » : on donne quatre sommets déjà
  // repérés, on fait compléter le cinquième, et c’est le tableau lui-même qui
  // montre les deux choses à retenir — B et F que deux nombres confondraient,
  // B et D qui portent les mêmes nombres dans un autre ordre.
  decouvrir: {
    titre: 'Deux nombres, et deux coins confondus',
    texte:
      'ABCDEFGH est un pavé droit posé sur une table. Sa face du bas est le '
      + 'carré ABCD, sa face du haut est le carré EFGH, et E est au-dessus de A, '
      + 'F au-dessus de B, G au-dessus de C, H au-dessus de D. Ses dimensions : '
      + 'AB = 4 cm, AD = 4 cm, AE = 7 cm. On repère ses sommets à partir de A : '
      + 'la première coordonnée se lit en cm sur l’arête [AB], la deuxième sur '
      + 'l’arête [AD], la troisième sur l’arête [AE], et on écrit toujours les '
      + 'trois nombres dans cet ordre. Voici quatre sommets déjà repérés.',
    lignes: [
      { calcul: 'le sommet A, celui dont on part', resultat: '(0 ; 0 ; 0)' },
      { calcul: 'le sommet B, au bout de l’arête [AB]', resultat: '(4 ; 0 ; 0)' },
      { calcul: 'le sommet D, au bout de l’arête [AD]', resultat: '(0 ; 4 ; 0)' },
      { calcul: 'le sommet E, au bout de l’arête [AE]', resultat: '(0 ; 0 ; 7)' },
    ],
    question:
      'Le sommet F est situé juste au-dessus de B. Complète deux de ses '
      + 'coordonnées.',
    champs: [
      { id: 'a', etiquette: 'la première coordonnée de F', attendu: 4 },
      { id: 'b', etiquette: 'la troisième coordonnée de F', attendu: 7 },
    ],
    conclusion:
      'F a pour coordonnées **(4 ; 0 ; 7)**, et B **(4 ; 0 ; 0)**. Leurs deux '
      + 'premiers nombres sont exactement les mêmes : si l’on s’arrêtait à deux '
      + 'nombres, comme dans le plan, B et F seraient le même point. Or ce sont '
      + 'deux coins différents — l’un sur la table, l’autre 7 cm plus haut. C’est '
      + 'la **troisième** coordonnée, et elle seule, qui les sépare.\n'
      + 'Regarde maintenant B **(4 ; 0 ; 0)** et D **(0 ; 4 ; 0)** dans le '
      + 'tableau : les mêmes trois nombres, rangés autrement, et deux coins '
      + 'différents. **Trois nombres, toujours dans l’ordre annoncé** — c’est ce '
      + 'qui fait qu’un triplet désigne un point, et un seul.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Le pavé droit et le nom de ses sommets',
      texte:
        'Un **pavé droit** a 8 sommets, 12 arêtes et 6 faces rectangulaires. On '
        + 'le note ABCDEFGH : **ABCD** est la face du bas, **EFGH** la face du '
        + 'haut, et les arêtes verticales sont [AE], [BF], [CG] et [DH] — donc E '
        + 'est au-dessus de A, F au-dessus de B, G au-dessus de C, H au-dessus '
        + 'de D.\n'
        + 'Trois arêtes partent du sommet A : [AB], [AD] et [AE]. Elles sont '
        + 'perpendiculaires deux à deux, et elles donnent les **trois '
        + 'directions** du pavé. Les arêtes parallèles ont la même longueur : '
        + 'BC = AD, DC = AB, CG = AE.\n'
        + 'Le sommet **C** est le coin du bas qui n’est pas voisin de A : pour y '
        + 'aller depuis A en suivant les arêtes, on parcourt [AB], puis la '
        + 'direction de [AD]. Le sommet **G**, juste au-dessus de C, est le coin '
        + 'le plus éloigné de A.',
    },
    {
      type: 'propriete',
      titre: 'Repérer un point par trois nombres',
      texte:
        'Pour se repérer dans un pavé, l’énoncé annonce trois choses, et il faut '
        + 'les trois :\n'
        + 'quel sommet est l’**origine** ;\n'
        + 'quelles **arêtes** portent les trois directions ;\n'
        + 'dans quel **ordre** les coordonnées s’écrivent.\n'
        + 'Les **coordonnées** d’un point sont alors les trois longueurs '
        + 'parcourues depuis l’origine, une par direction, écrites dans l’ordre '
        + 'annoncé. L’origine, quel que soit le sommet choisi, a pour '
        + 'coordonnées **(0 ; 0 ; 0)**.\n'
        + 'Il en faut **trois**, jamais deux : la troisième direction a besoin de '
        + 'son nombre, même quand ce nombre vaut 0.',
    },
    {
      type: 'remarque',
      titre: 'Pour un sommet : 0, ou l’arête entière',
      texte:
        'Un sommet est un coin. Dans chacune des trois directions, ou bien on '
        + 'n’a pas bougé — la coordonnée vaut **0** —, ou bien on a parcouru '
        + 'l’**arête entière** : la coordonnée vaut la longueur de cette arête. '
        + 'Rien d’autre n’est possible.\n'
        + 'Un triplet dont un nombre n’est ni 0 ni la longueur de l’arête '
        + 'correspondante ne désigne donc aucun sommet, et on peut le refuser '
        + 'sans chercher lequel.\n'
        + 'Conséquence utile : le coin le plus éloigné de l’origine porte comme '
        + 'coordonnées les **trois dimensions** du pavé. Si l’origine est A, le '
        + 'sommet G a pour coordonnées (AB ; AD ; AE).',
    },
    {
      type: 'remarque',
      titre: 'Deux nombres ne suffisent pas, et l’ordre n’est pas libre',
      texte:
        'Prenons le pavé de dimensions AB = 8 cm, AD = 3 cm, AE = 5 cm, repéré à '
        + 'partir de A dans l’ordre [AB], [AD], [AE].\n'
        + 'B a pour coordonnées (8 ; 0 ; 0) et F, juste au-dessus de lui, '
        + '(8 ; 0 ; 5). Leurs deux premiers nombres sont identiques : **deux '
        + 'nombres les confondraient**, alors que ce sont deux sommets '
        + 'différents. Seule la troisième coordonnée les distingue.\n'
        + 'Et les mêmes nombres dans un autre ordre ne désignent plus le même '
        + 'point. Parfois ils en désignent un autre : (0 ; 3 ; 0) est le sommet '
        + 'D, alors que (3 ; 0 ; 0) est un point de l’arête [AB], à 3 cm de A — '
        + 'et ce n’est même pas un coin. Parfois ils ne désignent plus rien : '
        + '(8 ; 0 ; 0) '
        + 'est le sommet B, mais (0 ; 0 ; 8) n’existe pas ici, puisque l’arête '
        + '[AE] ne mesure que 5 cm. Dans les deux cas la réponse est perdue. '
        + '**Compte toujours trois nombres, et vérifie que chacun est bien sur '
        + 'sa direction.**',
    },
    {
      type: 'exemple',
      titre: 'Deux sommets dont on cherche les coordonnées',
      texte:
        'Même pavé : AB = 8 cm, AD = 3 cm, AE = 5 cm, origine A, ordre [AB], '
        + '[AD], [AE].\n'
        + 'Le sommet C est le coin du bas non voisin de A : depuis A, on parcourt '
        + '8 cm dans la direction de [AB], 3 cm dans celle de [AD], et on ne '
        + 'monte pas. C a donc pour coordonnées **(8 ; 3 ; 0)** — le 0 s’écrit, '
        + 'il fait partie de la réponse.\n'
        + 'Le sommet F est juste au-dessus de B : 8 cm dans la direction de [AB], '
        + 'rien dans celle de [AD], 5 cm dans celle de [AE]. Donc '
        + 'F **(8 ; 0 ; 5)**. Contrôle : chaque coordonnée vaut bien 0 ou la '
        + 'longueur entière de son arête.',
    },
    {
      type: 'exemple',
      titre: 'Le trajet inverse : d’un triplet au sommet',
      texte:
        'Toujours le même pavé et la même convention.\n'
        + 'Que désigne (0 ; 3 ; 5) ? Le premier nombre est 0 : on ne bouge pas '
        + 'dans la direction de [AB]. Le deuxième vaut 3, soit l’arête [AD] '
        + 'entière ; le troisième vaut 5, soit [AE] entière. On est donc au-dessus '
        + 'de D : c’est le sommet **H**.\n'
        + 'Et (3 ; 8 ; 0) ? Ce sont les mêmes nombres que C, rangés autrement. Le '
        + 'premier se lit sur [AB], qui mesure 8 cm : avancer de 3 cm est '
        + 'possible, mais on n’est plus sur un coin. Le deuxième se lit sur [AD], '
        + 'qui ne mesure que 3 cm : on ne peut pas y avancer de 8 cm. Ce triplet '
        + 'ne désigne **aucun point du pavé**. Changer l’ordre ne réarrange pas '
        + 'une réponse : ça la remplace par autre chose — un autre point, ou '
        + 'rien du tout.',
    },
    {
      type: 'exemple',
      titre: 'Deux points qui ne sont pas des sommets',
      texte:
        'Un autre pavé : AB = 10 cm, AD = 6 cm, AE = 4 cm, origine A, ordre '
        + '[AB], [AD], [AE].\n'
        + 'Soit M le milieu de l’arête [EH]. E a pour coordonnées (0 ; 0 ; 4) et '
        + 'H (0 ; 6 ; 4) : seule la deuxième coordonnée change, et le milieu la '
        + 'prend à mi-chemin, 6 ÷ 2 = 3. Donc M **(0 ; 3 ; 4)**.\n'
        + 'Soit N le centre de la face ABCD. A a pour coordonnées (0 ; 0 ; 0) et '
        + 'C (10 ; 6 ; 0) ; le centre est à mi-chemin dans les deux directions du '
        + 'bas : 10 ÷ 2 = 5 et 6 ÷ 2 = 3. Donc N **(5 ; 3 ; 0)**. La troisième '
        + 'coordonnée vaut 0 et s’écrit quand même : N est bien sur la face du '
        + 'bas.',
    },
  ],

  methode: {
    titre: 'Écrire les coordonnées d’un sommet',
    enonce:
      'ABCDEFGH est un pavé droit. Sa face du bas est le rectangle ABCD, sa face '
      + 'du haut le rectangle EFGH, et E est au-dessus de A, F au-dessus de B, G '
      + 'au-dessus de C, H au-dessus de D. On donne AE = 8 cm, AB = 12 cm et '
      + 'AD = 5 cm. On repère les sommets à partir de A : la première coordonnée '
      + 'se lit en cm sur l’arête [AB], la deuxième sur l’arête [AD], la '
      + 'troisième sur l’arête [AE], toujours dans cet ordre. Quelles sont les '
      + 'coordonnées du sommet G ?',
    etapes: [
      {
        texte: 'Je relis la convention avant tout : origine A, puis [AB], puis [AD], puis [AE]. Trois directions, donc trois nombres à écrire.',
        note: 'Sans cette phrase, aucune réponse n’a de sens : c’est l’énoncé qui fixe l’ordre.',
      },
      {
        texte: 'Je vais de A à G en suivant les arêtes : je parcours [AB] en entier, puis la direction de [AD] en entier, puis je monte de toute la hauteur.',
        note: 'G est le coin le plus éloigné de A : il est au-dessus de C.',
      },
      {
        texte: 'Direction de [AB] : 12 cm, c’est la première coordonnée. Direction de [AD] : 5 cm, c’est la deuxième. Direction de [AE] : 8 cm, c’est la troisième.',
        note: 'Chaque nombre est étiqueté par sa direction au moment où je le trouve.',
      },
      {
        texte: 'J’écris dans l’ordre annoncé : G (12 ; 5 ; 8).',
        note: 'L’énoncé cite les dimensions dans l’ordre AE, AB, AD : recopier cet ordre donnerait (8 ; 12 ; 5), et les ranger du plus grand au plus petit (12 ; 8 ; 5). Ni l’un ni l’autre n’est la réponse — seule compte la convention.',
      },
    ],
    controle:
      'Deux coups d’œil, et aucun calcul.\n'
      + 'D’abord, **compte les nombres** de ta réponse : il en faut trois, un par '
      + 'direction du pavé. Deux, c’est un repérage de plan, et il confondrait '
      + 'deux coins l’un au-dessus de l’autre — ici G et C, qui ne se distinguent '
      + 'que par leur troisième coordonnée.\n'
      + 'Ensuite, **relis chaque nombre avec sa direction** : 12 se lit sur [AB], '
      + '5 sur [AD], 8 sur [AE], et pour un sommet chaque coordonnée doit valoir '
      + '0 ou l’arête entière. Si tu avais écrit (5 ; 12 ; 8), le 12 serait porté '
      + 'sur [AD], une arête de 5 cm : impossible. Les mêmes nombres dans un '
      + 'autre ordre ne sont pas la même réponse.\n'
      + 'Attention, ce deuxième coup d’œil ne suffit plus quand **deux arêtes ont '
      + 'la même longueur** : dans un pavé à base carrée, (6 ; 0 ; 0) et '
      + '(0 ; 6 ; 0) sont tous les deux possibles, et pourtant l’un est B et '
      + 'l’autre D. Là, rien ne remplace le trajet : sur QUELLE arête ai-je '
      + 'parcouru ces 6 cm ?',
  },

  entrainement: [
    // ── Palier 1 : la convention, et les trois nombres ──────────────────────
    {
      // Le sommet F n’est ni le plus proche ni le plus éloigné de l’origine :
      // une de ses coordonnées vaut 0 alors que les deux autres sont pleines,
      // et c’est ce 0 qui s’écrit au lieu de disparaître.
      id: 'e-15-4-1', type: 'trous', palier: 1, piege: 'troisieme-coordonnee-oubliee',
      consigne:
        'ABCDEFGH est un pavé droit : sa face du bas est le rectangle ABCD, sa '
        + 'face du haut le rectangle EFGH, et E est au-dessus de A, F au-dessus '
        + 'de B, G au-dessus de C, H au-dessus de D. On donne AB = 9 cm, '
        + 'AD = 2 cm et AE = 6 cm. On repère les sommets à partir de A : la '
        + 'première coordonnée se lit en cm sur l’arête [AB], la deuxième sur '
        + 'l’arête [AD], la troisième sur l’arête [AE], toujours dans cet ordre. '
        + 'Complète les trois coordonnées du sommet F.',
      enonce:
        '\\text{pavé : AB = 9 cm, AD = 2 cm, AE = 6 cm} \\qquad '
        + '\\text{F ( } \\square \\text{ ; } \\square \\text{ ; } \\square \\text{ )}',
      champs: [
        { id: 'a', etiquette: 'première coordonnée de F', attendu: 9 },
        { id: 'b', etiquette: 'deuxième coordonnée de F', attendu: 0 },
        { id: 'c', etiquette: 'troisième coordonnée de F', attendu: 6 },
      ],
      fausses: [],
    },
    {
      // NEUTRE. On demande les coordonnées de l’origine, et l’origine est E, pas
      // A : la réponse ne peut pas être un souvenir accroché à la lettre A. Le
      // triplet (0 ; 0 ; 0) est insensible à l’ordre, et l’élève qui néglige une
      // direction écrit 0 dans sa case — ce qui est justement la bonne réponse.
      // Ni l’une ni l’autre forme du piège ne peut donc produire d’erreur ici.
      // Ce qui reste à comprendre est ailleurs, et c’est le point de l’item :
      // « origine » veut dire « point d’où l’on part », donc trois fois zéro.
      id: 'e-15-4-2', type: 'trous', palier: 1, neutre: true, piege: 'troisieme-coordonnee-oubliee',
      consigne:
        'ABCDEFGH est un pavé droit : sa face du bas est le rectangle ABCD, sa '
        + 'face du haut le rectangle EFGH, et E est au-dessus de A, F au-dessus '
        + 'de B, G au-dessus de C, H au-dessus de D. Cette fois on repère les '
        + 'sommets à partir de E : la première coordonnée se lit en cm sur '
        + 'l’arête [EF], la deuxième sur l’arête [EH], la troisième sur l’arête '
        + '[EA], toujours dans cet ordre. On donne EF = 13 cm, EH = 8 cm et '
        + 'EA = 5 cm. Complète les trois coordonnées du sommet E.',
      enonce:
        '\\text{pavé repéré à partir de E : EF = 13 cm, EH = 8 cm, EA = 5 cm} \\qquad '
        + '\\text{E ( } \\square \\text{ ; } \\square \\text{ ; } \\square \\text{ )}',
      champs: [
        { id: 'a', etiquette: 'première coordonnée de E', attendu: 0 },
        { id: 'b', etiquette: 'deuxième coordonnée de E', attendu: 0 },
        { id: 'c', etiquette: 'troisième coordonnée de E', attendu: 0 },
      ],
      fausses: [],
    },
    {
      // Une seule coordonnée est demandée : c’est le format où l’erreur d’ordre
      // se chiffre, puisque la réponse tapée est un nombre unique et qu’on sait
      // sur quelle arête il a été lu. Les dimensions sont citées dans l’ordre
      // AD, AE, AB — donc pas dans celui de la convention : l’élève qui recopie
      // l’ordre de citation donne 6 comme troisième coordonnée, et c’est
      // exactement la première réponse fausse déclarée.
      id: 'e-15-4-3', type: 'calcul', palier: 1, piege: 'troisieme-coordonnee-oubliee',
      consigne:
        'ABCDEFGH est un pavé droit : sa face du bas est le rectangle ABCD, sa '
        + 'face du haut le rectangle EFGH, et E est au-dessus de A, F au-dessus '
        + 'de B, G au-dessus de C, H au-dessus de D. On donne AD = 11 cm, '
        + 'AE = 4 cm et AB = 6 cm. On repère les sommets à partir de A : la '
        + 'première coordonnée se lit en cm sur l’arête [AB], la deuxième sur '
        + 'l’arête [AD], la troisième sur l’arête [AE], toujours dans cet ordre. '
        + 'Attention : l’énoncé ne cite pas les dimensions dans l’ordre des '
        + 'coordonnées. Quelle est la troisième coordonnée du sommet G ?',
      enonce: '\\text{pavé : AD = 11 cm, AE = 4 cm, AB = 6 cm ; troisième coordonnée du sommet G}',
      attendu: 4,
      fausses: [
        // 6 est la longueur lue sur [AB] : c’est la PREMIÈRE coordonnée. La
        // donner comme troisième, c’est ranger les nombres dans un autre ordre
        // que celui annoncé — et (4 ; 11 ; 6) désignerait un point qui n’existe
        // même pas, puisque [AE] ne mesure que 4 cm.
        { valeur: 6, piege: 'troisieme-coordonnee-oubliee' },
        // 11 est la longueur lue sur [AD] : c’est la deuxième coordonnée, pas la
        // troisième. Même confusion, autre glissement.
        { valeur: 11, piege: 'troisieme-coordonnee-oubliee' },
      ],
    },

    // ── Palier 2 : les deux sens, et l’ordre qui désigne un autre point ─────
    {
      // La forme « coordonnée manquante », prise là où elle est la plus lisible :
      // le nombre absent vaut 0, et c’est exactement le cas que l’élève croit
      // pouvoir sauter.
      id: 'e-15-4-4', type: 'plausible', palier: 2, piege: 'troisieme-coordonnee-oubliee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{ABCDEFGH est un pavé droit : ABCD est la face du bas, EFGH la face du haut, E au-dessus de A, F au-dessus de B, G au-dessus de C, H au-dessus de D.} '
        + '\\quad \\text{AB = 7 cm, AD = 4 cm, AE = 11 cm. Origine A : première coordonnée sur [AB], deuxième sur [AD], troisième sur [AE], dans cet ordre.} '
        + '\\quad \\text{On annonce que le sommet F a pour coordonnées (7 ; 11).}',
      attendu: false,
      fausses: [
        // Accepter deux nombres, c’est repérer dans le plan. Le contrôle du
        // piège suffit à le voir : on compte les nombres de la réponse, il en
        // faut trois, un par direction.
        { valeur: true, piege: 'troisieme-coordonnee-oubliee' },
      ],
      explication:
        'Compte les nombres annoncés : il n’y en a que deux, et un pavé a trois '
        + 'directions. F est juste au-dessus de B : on parcourt 7 cm dans la '
        + 'direction de [AB], **rien** dans celle de [AD], puis 11 cm dans celle '
        + 'de [AE]. Ses coordonnées sont donc (7 ; 0 ; 11). Le nombre sauté vaut '
        + '0, mais il s’écrit : sans lui, (7 ; 11) ne dit pas si le 11 a été lu '
        + 'sur [AD] ou sur [AE], et F ne serait plus distingué d’aucun autre '
        + 'point.',
    },
    {
      // NEUTRE. Le triplet annoncé n’est celui de D dans AUCUN ordre : D vaut
      // (0 ; 4 ; 0), et ses trois nombres ne sont pas ceux de (15 ; 4 ; 9). Un
      // élève qui permute les coordonnées rejette donc lui aussi, et un élève
      // qui n’en compte que deux compare (15 ; 4) à (0 ; 4) et rejette également.
      // Aucune des deux formes du piège ne produit le « oui » : ce qui se joue
      // ici, c’est de savoir OÙ est D, et le triplet proposé est en fait celui de
      // G, le coin le plus éloigné de A.
      id: 'e-15-4-5', type: 'plausible', palier: 2, neutre: true, piege: 'troisieme-coordonnee-oubliee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{ABCDEFGH est un pavé droit : ABCD est la face du bas, EFGH la face du haut, E au-dessus de A, F au-dessus de B, G au-dessus de C, H au-dessus de D.} '
        + '\\quad \\text{AB = 15 cm, AD = 4 cm, AE = 9 cm. Origine A : première coordonnée sur [AB], deuxième sur [AD], troisième sur [AE], dans cet ordre.} '
        + '\\quad \\text{On annonce que le point de coordonnées (15 ; 4 ; 9) est le sommet D.}',
      attendu: false,
      fausses: [],
      explication:
        'Pour aller de A à D, on ne suit que l’arête [AD] : 4 cm dans la deuxième '
        + 'direction, et rien dans les deux autres. D a donc pour coordonnées '
        + '(0 ; 4 ; 0). Le triplet annoncé, lui, avance dans les trois directions '
        + 'à la fois, et chacun de ses nombres est une arête entière : '
        + '(15 ; 4 ; 9) est le sommet **G**, le coin le plus éloigné de A. Les '
        + 'trois dimensions du pavé sont toujours les coordonnées de ce coin-là.',
    },
    {
      // Le seul « plausible » vrai du lot, et il n’est pas décoratif : répondre
      // « non » ici, c’est avoir calculé C dans un autre ordre — (12 ; 5 ; 0) au
      // lieu de (5 ; 12 ; 0) — et avoir refusé un triplet pourtant exact.
      id: 'e-15-4-6', type: 'plausible', palier: 2, piege: 'troisieme-coordonnee-oubliee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{ABCDEFGH est un pavé droit : ABCD est la face du bas, EFGH la face du haut, E au-dessus de A, F au-dessus de B, G au-dessus de C, H au-dessus de D.} '
        + '\\quad \\text{AB = 5 cm, AD = 12 cm, AE = 3 cm. Origine A : première coordonnée sur [AB], deuxième sur [AD], troisième sur [AE], dans cet ordre.} '
        + '\\quad \\text{On annonce que le point de coordonnées (5 ; 12 ; 0) est le sommet C.}',
      attendu: true,
      fausses: [
        // Refuser ce triplet, c’est avoir rangé les nombres dans un autre ordre
        // que celui annoncé — le plus souvent du plus grand au plus petit,
        // (12 ; 5 ; 0). L’énoncé dit pourtant que la première coordonnée se lit
        // sur [AB], donc 5 vient en premier.
        { valeur: false, piege: 'troisieme-coordonnee-oubliee' },
      ],
      explication:
        'C est le coin du bas qui n’est pas voisin de A : depuis A, on parcourt '
        + '[AB] en entier, soit 5 cm dans la première direction, puis la '
        + 'direction de [AD] en entier, soit 12 cm dans la deuxième, et on ne '
        + 'monte pas — troisième coordonnée 0. Le triplet (5 ; 12 ; 0) est donc '
        + 'exact. Le 12 est plus grand que le 5, mais l’ordre des coordonnées ne '
        + 'dépend pas de la taille des nombres : il dépend des arêtes annoncées '
        + 'par l’énoncé.',
    },
    {
      // La forme « mauvais ordre » mise à nu : la ligne fausse range le 6 en
      // première coordonnée alors qu’il a été parcouru sur [AD], et la ligne
      // suivante en tire la conséquence — D se retrouverait au même endroit que
      // B. La base est carrée exprès : les deux sommets portent alors les mêmes
      // nombres, et seul l’ordre les distingue.
      id: 'e-15-4-7', type: 'corriger', palier: 2, piege: 'troisieme-coordonnee-oubliee',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l’erreur apparaît.',
      enonce:
        '\\text{ABCDEFGH est un pavé droit à base carrée : AB = 6 cm, AD = 6 cm, AE = 10 cm.} '
        + '\\quad \\text{Origine A : première coordonnée sur [AB], deuxième sur [AD], troisième sur [AE], dans cet ordre.} '
        + '\\quad \\text{Quelles sont les coordonnées du sommet D ?}',
      lignes: [
        { texte: 'La convention dit : origine A, première coordonnée sur [AB], deuxième sur [AD], troisième sur [AE].', fausse: false },
        { texte: 'Pour aller de A à D, on parcourt 6 cm sur l’arête [AD] : les coordonnées de D sont donc (6 ; 0 ; 0).', fausse: true },
        { texte: 'Le sommet D a donc exactement les mêmes coordonnées que le sommet B.', fausse: false },
      ],
      explication:
        'La première ligne ne fait que relire la convention, et la troisième dit '
        + 'vrai SI l’on accepte la deuxième : (6 ; 0 ; 0), ce sont bien les '
        + 'coordonnées de B. C’est la deuxième qui casse tout. Les 6 cm ont été '
        + 'parcourus sur l’arête [AD], qui porte la **deuxième** coordonnée : D a '
        + 'donc pour coordonnées (0 ; 6 ; 0). Les mêmes trois nombres, rangés '
        + 'autrement, désignent un autre sommet — et la troisième ligne le montre '
        + 'jusqu’à l’absurde, puisque B et D sont deux coins bien distincts du '
        + 'pavé.',
    },

    // ── Palier 3 : lire un triplet comme un jeu de trois dimensions ─────────
    {
      // Le sens inverse poussé jusqu’au bout : les coordonnées du coin opposé
      // SONT les trois dimensions. L’erreur prévisible est la forme « coordonnée
      // manquante », et elle se chiffre ici — 7 × 5, la troisième laissée de côté.
      id: 'e-15-4-8', type: 'calcul', palier: 3, piege: 'troisieme-coordonnee-oubliee',
      consigne:
        'ABCDEFGH est un pavé droit : sa face du bas est le rectangle ABCD, sa '
        + 'face du haut le rectangle EFGH, et E est au-dessus de A, F au-dessus '
        + 'de B, G au-dessus de C, H au-dessus de D. On repère les sommets à '
        + 'partir de A : la première coordonnée se lit en cm sur l’arête [AB], la '
        + 'deuxième sur l’arête [AD], la troisième sur l’arête [AE], toujours '
        + 'dans cet ordre. On sait que le sommet G a pour coordonnées '
        + '(7 ; 5 ; 4). Calcule le volume du pavé, en cm³.',
      enonce: '\\text{pavé : le sommet G a pour coordonnées (7 ; 5 ; 4) ; volume en cm³}',
      attendu: 140,
      fausses: [
        // 7 × 5 : la troisième coordonnée n’a pas été portée dans le calcul. Le
        // contrôle du piège le dit sans rien recalculer — il faut trois nombres,
        // un par direction, et un volume en multiplie trois.
        { valeur: 35, piege: 'troisieme-coordonnee-oubliee' },
      ],
    },
    {
      // NEUTRE. Le plus grand de trois nombres ne dépend pas de l’ordre dans
      // lequel on les range : la forme « mauvais ordre » ne peut pas produire
      // d’erreur. Et laisser tomber le dernier nombre ne change rien non plus
      // ici, puisque 12 reste le plus grand des deux premiers : la forme
      // « coordonnée manquante » est neutralisée elle aussi. Ce qui se joue,
      // c’est de reconnaître que ce triplet est le jeu des trois dimensions.
      id: 'e-15-4-9', type: 'calcul', palier: 3, neutre: true, piege: 'troisieme-coordonnee-oubliee',
      consigne:
        'ABCDEFGH est un pavé droit : sa face du bas est le rectangle ABCD, sa '
        + 'face du haut le rectangle EFGH, et E est au-dessus de A, F au-dessus '
        + 'de B, G au-dessus de C, H au-dessus de D. On repère les sommets à '
        + 'partir de A : la première coordonnée se lit en cm sur l’arête [AB], la '
        + 'deuxième sur l’arête [AD], la troisième sur l’arête [AE], toujours '
        + 'dans cet ordre. On sait que le sommet G a pour coordonnées '
        + '(12 ; 9 ; 4). Quelle est la longueur, en cm, de la plus longue arête '
        + 'du pavé ?',
      enonce: '\\text{pavé : le sommet G a pour coordonnées (12 ; 9 ; 4) ; longueur de la plus longue arête, en cm}',
      attendu: 12,
      fausses: [],
    },
    {
      id: 'e-15-4-10', type: 'vraifaux', palier: 3, piege: 'troisieme-coordonnee-oubliee',
      consigne: 'Vrai ou faux ? Si c’est faux, donne un contre-exemple.',
      affirmation:
        'Dans un pavé droit, deux nombres suffisent pour repérer un sommet.',
      attendu: false,
      contreExemple: {
        // On ne demande pas de réciter « il en faut trois » : on fait produire à
        // l’élève les deux nombres qui séparent B de F. Ce sont deux sommets que
        // deux coordonnées confondraient, et c’est lui qui les écrit.
        invite:
          'ABCDEFGH est un pavé droit : ABCD est la face du bas, EFGH la face du '
          + 'haut, et E est au-dessus de A, F au-dessus de B, G au-dessus de C, '
          + 'H au-dessus de D. On donne AB = 8 cm, AD = 5 cm et AE = 3 cm. '
          + 'Origine A : première coordonnée sur [AB], deuxième sur [AD], '
          + 'troisième sur [AE], dans cet ordre. Les sommets B et F ont tous les '
          + 'deux 8 pour première coordonnée et 0 pour deuxième. Donne la '
          + 'troisième coordonnée de B, puis la troisième coordonnée de F.',
        champs: [
          { id: 'a', etiquette: 'troisième coordonnée de B' },
          { id: 'b', etiquette: 'troisième coordonnée de F' },
        ],
        valide: (a, b) => Math.abs(a - 0) < 1e-9 && Math.abs(b - 3) < 1e-9,
        temoin: [0, 3],
        exemple:
          'B a pour coordonnées (8 ; 0 ; 0) et F (8 ; 0 ; 3). Leurs deux premiers '
          + 'nombres sont identiques : si deux nombres suffisaient, B et F '
          + 'seraient le même point. Or ce sont deux sommets différents, l’un sur '
          + 'la face du bas, l’autre 3 cm au-dessus de lui. Seule la troisième '
          + 'coordonnée les sépare — et elle vaut 0 pour B, ce qui ne l’autorise '
          + 'pas à disparaître.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-15-4-1',
      enonce:
        'Une salle de réunion a la forme d’un pavé droit ABCDEFGH. Le sol est le '
        + 'rectangle ABCD, le plafond le rectangle EFGH, et E est au-dessus de A, '
        + 'F au-dessus de B, G au-dessus de C, H au-dessus de D. On donne '
        + 'AB = 12 m, AD = 7 m et AE = 4 m. On repère les points à partir de A : '
        + 'la première coordonnée se lit en mètres sur l’arête [AB], la deuxième '
        + 'sur l’arête [AD], la troisième sur l’arête [AE], toujours dans cet '
        + 'ordre. Un projecteur est fixé au centre du plafond, c’est-à-dire au '
        + 'centre du rectangle EFGH.',
      questions: [
        { texte: 'Quelle est la première coordonnée du projecteur ?', attendu: 6, unite: 'm' },
        { texte: 'Quelle est la deuxième coordonnée du projecteur ?', attendu: 3.5, unite: 'm' },
        { texte: 'Quelle est la troisième coordonnée du projecteur ?', attendu: 4, unite: 'm' },
      ],
    },
    {
      id: 'p-15-4-2',
      enonce:
        'Une caisse a la forme d’un pavé droit ABCDEFGH : sa face du bas est le '
        + 'rectangle ABCD, sa face du haut le rectangle EFGH, et E est au-dessus '
        + 'de A, F au-dessus de B, G au-dessus de C, H au-dessus de D. On donne '
        + 'AB = 20 cm, AD = 9 cm et AE = 5 cm. On repère les sommets à partir de '
        + 'A : la première coordonnée se lit en cm sur l’arête [AB], la deuxième '
        + 'sur l’arête [AD], la troisième sur l’arête [AE], toujours dans cet '
        + 'ordre.',
      questions: [
        { texte: 'Quelle est la deuxième coordonnée du sommet G ?', attendu: 9, unite: 'cm' },
        { texte: 'Quelle est la troisième coordonnée du sommet C ?', attendu: 0, unite: 'cm' },
        { texte: 'Quelle est la troisième coordonnée du sommet H ?', attendu: 5, unite: 'cm' },
      ],
    },
    {
      // Le sens inverse en grandeur réelle : on ne donne aucune dimension, mais
      // les coordonnées du coin opposé les contiennent toutes les trois.
      id: 'p-15-4-3',
      enonce:
        'Un carton a la forme d’un pavé droit ABCDEFGH : sa face du bas est le '
        + 'rectangle ABCD, sa face du haut le rectangle EFGH, et E est au-dessus '
        + 'de A, F au-dessus de B, G au-dessus de C, H au-dessus de D. On repère '
        + 'les sommets à partir de A : la première coordonnée se lit en cm sur '
        + 'l’arête [AB], la deuxième sur l’arête [AD], la troisième sur l’arête '
        + '[AE], toujours dans cet ordre. On sait seulement que le sommet G, le '
        + 'coin le plus éloigné de A, a pour coordonnées (10 ; 6 ; 3).',
      questions: [
        { texte: 'Quelle est la longueur de l’arête [AB] ?', attendu: 10, unite: 'cm' },
        { texte: 'Quelle est la longueur de l’arête [AE] ?', attendu: 3, unite: 'cm' },
        { texte: 'Quel est le volume du carton ?', attendu: 180, unite: 'cm³' },
      ],
    },
    {
      id: 'p-15-4-4',
      enonce:
        'Un plateau de jeu tient dans une boîte en forme de pavé droit ABCDEFGH : '
        + 'sa face du bas est le rectangle ABCD, sa face du haut le rectangle '
        + 'EFGH, et E est au-dessus de A, F au-dessus de B, G au-dessus de C, H '
        + 'au-dessus de D. On donne AB = 16 cm, AD = 6 cm et AE = 9 cm. On repère '
        + 'les points à partir de A : la première coordonnée se lit en cm sur '
        + 'l’arête [AB], la deuxième sur l’arête [AD], la troisième sur l’arête '
        + '[AE], toujours dans cet ordre. Un aimant est posé au centre de la face '
        + 'du bas ABCD.',
      questions: [
        { texte: 'Quelle est la première coordonnée de l’aimant ?', attendu: 8, unite: 'cm' },
        { texte: 'Quelle est la deuxième coordonnée de l’aimant ?', attendu: 3, unite: 'cm' },
        { texte: 'Quelle est la troisième coordonnée de l’aimant ?', attendu: 0, unite: 'cm' },
      ],
    },
    {
      // Deux points qui ne diffèrent que par leur troisième coordonnée : c’est
      // le cœur du savoir-faire, et la distance se lit par une soustraction,
      // sans aucune formule d’espace.
      id: 'p-15-4-5',
      enonce:
        'Un hangar a la forme d’un pavé droit ABCDEFGH. Le sol est le rectangle '
        + 'ABCD, le toit plat le rectangle EFGH, et E est au-dessus de A, F '
        + 'au-dessus de B, G au-dessus de C, H au-dessus de D. On donne '
        + 'AB = 10 m, AD = 7 m et AE = 3 m. On repère les points à partir de A : '
        + 'la première coordonnée se lit en mètres sur l’arête [AB], la deuxième '
        + 'sur l’arête [AD], la troisième sur l’arête [AE], toujours dans cet '
        + 'ordre. Un capteur S1 est fixé au sol, en (6 ; 4 ; 0), et un capteur S2 '
        + 'est fixé au toit, en (6 ; 4 ; 3) : ils ont donc les mêmes deux '
        + 'premières coordonnées, S2 étant exactement à la verticale de S1.',
      questions: [
        { texte: 'Quelle est la distance, en mètres, entre S1 et S2 ?', attendu: 3, unite: 'm' },
        { texte: 'Un capteur S3 est placé au milieu du segment [S1S2] : quelle est sa troisième coordonnée ?', attendu: 1.5, unite: 'm' },
        { texte: 'Quelle est la première coordonnée de S3 ?', attendu: 6, unite: 'm' },
      ],
    },
  ],

  test: [
    {
      id: 't-15-4-1', type: 'trous',
      consigne:
        'ABCDEFGH est un pavé droit : sa face du bas est le rectangle ABCD, sa '
        + 'face du haut le rectangle EFGH, et E est au-dessus de A, F au-dessus '
        + 'de B, G au-dessus de C, H au-dessus de D. On donne AB = 11 cm, '
        + 'AD = 3 cm et AE = 7 cm. On repère les sommets à partir de A : la '
        + 'première coordonnée se lit en cm sur l’arête [AB], la deuxième sur '
        + 'l’arête [AD], la troisième sur l’arête [AE], toujours dans cet ordre. '
        + 'Complète les trois coordonnées du sommet G.',
      enonce:
        '\\text{pavé : AB = 11 cm, AD = 3 cm, AE = 7 cm} \\qquad '
        + '\\text{G ( } \\square \\text{ ; } \\square \\text{ ; } \\square \\text{ )}',
      champs: [
        { id: 'a', etiquette: 'première coordonnée de G', attendu: 11 },
        { id: 'b', etiquette: 'deuxième coordonnée de G', attendu: 3 },
        { id: 'c', etiquette: 'troisième coordonnée de G', attendu: 7 },
      ],
      piege: 'troisieme-coordonnee-oubliee', revoir: 'propriete',
    },
    {
      id: 't-15-4-2', type: 'calcul',
      consigne:
        'ABCDEFGH est un pavé droit : sa face du bas est le rectangle ABCD, sa '
        + 'face du haut le rectangle EFGH, et E est au-dessus de A, F au-dessus '
        + 'de B, G au-dessus de C, H au-dessus de D. On donne AB = 5 cm, '
        + 'AD = 13 cm et AE = 2 cm. On repère les sommets à partir de A : la '
        + 'première coordonnée se lit en cm sur l’arête [AB], la deuxième sur '
        + 'l’arête [AD], la troisième sur l’arête [AE], toujours dans cet ordre. '
        + 'Quelle est la deuxième coordonnée du sommet H ?',
      enonce: '\\text{pavé : AB = 5 cm, AD = 13 cm, AE = 2 cm ; deuxième coordonnée du sommet H}',
      attendu: 13,
      fausses: [
        // 5 se lit sur [AB] : c’est la première coordonnée, pas la deuxième.
        { valeur: 5, piege: 'troisieme-coordonnee-oubliee' },
        // 2 se lit sur [AE] : c’est la troisième.
        { valeur: 2, piege: 'troisieme-coordonnee-oubliee' },
      ],
      revoir: 'definition',
    },
    {
      id: 't-15-4-3', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{ABCDEFGH est un pavé droit : ABCD est la face du bas, EFGH la face du haut, E au-dessus de A, F au-dessus de B, G au-dessus de C, H au-dessus de D.} '
        + '\\quad \\text{AB = 7 cm, AD = 6 cm, AE = 4 cm. Origine A : première coordonnée sur [AB], deuxième sur [AD], troisième sur [AE], dans cet ordre.} '
        + '\\quad \\text{On annonce que le sommet G a pour coordonnées (7 ; 6).}',
      attendu: false,
      fausses: [{ valeur: true, piege: 'troisieme-coordonnee-oubliee' }],
      explication:
        'Compte les nombres annoncés : deux, alors qu’un pavé a trois directions. '
        + 'G est le coin le plus éloigné de A : il a pour coordonnées '
        + '(7 ; 6 ; 4). Sans le troisième nombre, rien ne distinguerait G de C, '
        + 'qui est juste en dessous et vaut (7 ; 6 ; 0).',
      piege: 'troisieme-coordonnee-oubliee', revoir: 'remarque',
    },
    {
      id: 't-15-4-4', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{ABCDEFGH est un pavé droit : ABCD est la face du bas, EFGH la face du haut, E au-dessus de A, F au-dessus de B, G au-dessus de C, H au-dessus de D.} '
        + '\\quad \\text{AB = 6 cm, AD = 9 cm, AE = 5 cm. Origine A : première coordonnée sur [AB], deuxième sur [AD], troisième sur [AE], dans cet ordre.} '
        + '\\quad \\text{On annonce que le point de coordonnées (0 ; 9 ; 5) est le sommet H.}',
      attendu: true,
      // Répondre « non » ici, c’est avoir rangé les nombres autrement — par
      // exemple (9 ; 0 ; 5) — et refusé un triplet pourtant exact. Sans cette
      // ligne, la seule erreur possible sur cet item ne serait rattachée à rien.
      fausses: [{ valeur: false, piege: 'troisieme-coordonnee-oubliee' }],
      explication:
        'H est le sommet situé au-dessus de D. Depuis A, on ne bouge pas dans la '
        + 'direction de [AB] — première coordonnée 0 —, on parcourt les 9 cm de '
        + '[AD] — deuxième coordonnée 9 — puis les 5 cm de [AE] — troisième '
        + 'coordonnée 5. Le triplet (0 ; 9 ; 5) est donc bien celui de H, et '
        + 'chacun de ses nombres vaut 0 ou l’arête entière, comme pour tout '
        + 'sommet.',
      revoir: 'propriete',
    },
    {
      id: 't-15-4-5', type: 'corriger',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l’erreur apparaît.',
      enonce:
        '\\text{ABCDEFGH est un pavé droit : AB = 12 cm, AD = 8 cm, AE = 3 cm, et E est au-dessus de A.} '
        + '\\quad \\text{Origine A : première coordonnée sur [AB], deuxième sur [AD], troisième sur [AE], dans cet ordre.} '
        + '\\quad \\text{Quelles sont les coordonnées du sommet E ?}',
      lignes: [
        { texte: 'E est le sommet situé juste au-dessus de A, à 3 cm de lui.', fausse: false },
        { texte: 'On parcourt donc 3 cm, et les coordonnées de E sont (3 ; 0 ; 0).', fausse: true },
        { texte: 'Le sommet E est donc repéré comme le point situé à 3 cm de A sur l’arête [AB].', fausse: false },
      ],
      explication:
        'La première ligne lit correctement l’énoncé, et la troisième tire la '
        + 'conséquence exacte de la deuxième. C’est la deuxième qui est fausse : '
        + 'les 3 cm ont été parcourus sur l’arête [AE], qui porte la '
        + '**troisième** coordonnée. E a donc pour coordonnées (0 ; 0 ; 3). Placé '
        + 'en premier, le 3 désigne un point de l’arête [AB] — c’est-à-dire un '
        + 'point du sol, pas le sommet du dessus.',
      piege: 'troisieme-coordonnee-oubliee', revoir: 'remarque',
    },
    {
      id: 't-15-4-6', type: 'calcul',
      consigne:
        'ABCDEFGH est un pavé droit : sa face du bas est le rectangle ABCD, sa '
        + 'face du haut le rectangle EFGH, et E est au-dessus de A, F au-dessus '
        + 'de B, G au-dessus de C, H au-dessus de D. On repère les sommets à '
        + 'partir de A : la première coordonnée se lit en cm sur l’arête [AB], la '
        + 'deuxième sur l’arête [AD], la troisième sur l’arête [AE], toujours '
        + 'dans cet ordre. Le sommet G a pour coordonnées (8 ; 6 ; 5). Calcule le '
        + 'volume du pavé, en cm³.',
      enonce: '\\text{pavé : le sommet G a pour coordonnées (8 ; 6 ; 5) ; volume en cm³}',
      attendu: 240,
      // 8 × 6 : la troisième coordonnée n’est pas entrée dans le calcul.
      fausses: [{ valeur: 48, piege: 'troisieme-coordonnee-oubliee' }],
      piege: 'troisieme-coordonnee-oubliee', revoir: 'remarque',
    },
    {
      id: 't-15-4-7', type: 'trous',
      consigne:
        'ABCDEFGH est un pavé droit : sa face du bas est le rectangle ABCD, sa '
        + 'face du haut le rectangle EFGH, et E est au-dessus de A, F au-dessus '
        + 'de B, G au-dessus de C, H au-dessus de D. On donne AB = 14 cm, '
        + 'AD = 5 cm et AE = 9 cm. On repère les points à partir de A : la '
        + 'première coordonnée se lit en cm sur l’arête [AB], la deuxième sur '
        + 'l’arête [AD], la troisième sur l’arête [AE], toujours dans cet ordre. '
        + 'M est le milieu de l’arête [BF]. Complète les trois coordonnées de M.',
      enonce:
        '\\text{pavé : AB = 14 cm, AD = 5 cm, AE = 9 cm ; M milieu de [BF]} \\qquad '
        + '\\text{M ( } \\square \\text{ ; } \\square \\text{ ; } \\square \\text{ )}',
      champs: [
        { id: 'a', etiquette: 'première coordonnée de M', attendu: 14 },
        { id: 'b', etiquette: 'deuxième coordonnée de M', attendu: 0 },
        { id: 'c', etiquette: 'troisième coordonnée de M', attendu: 4.5 },
      ],
      piege: 'troisieme-coordonnee-oubliee', revoir: 'exemple',
    },
    {
      id: 't-15-4-8', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{ABCDEFGH est un pavé droit à base carrée : AB = 6 cm, AD = 6 cm, AE = 4 cm, E au-dessus de A.} '
        + '\\quad \\text{Origine A : première coordonnée sur [AB], deuxième sur [AD], troisième sur [AE], dans cet ordre.} '
        + '\\quad \\text{On annonce que le point de coordonnées (6 ; 6 ; 6) est un sommet du pavé.}',
      attendu: false,
      // Répondre « oui », c’est n’avoir vérifié que les deux premiers nombres :
      // la troisième direction, elle, ne mesure que 4 cm.
      fausses: [{ valeur: true, piege: 'troisieme-coordonnee-oubliee' }],
      explication:
        'Les deux premiers nombres tombent juste : 6 est bien la longueur de '
        + '[AB], et 6 celle de [AD]. Mais la troisième coordonnée se lit sur '
        + '[AE], qui ne mesure que 4 cm : aucun point du pavé n’est à 6 cm de '
        + 'hauteur. Pour un sommet, chaque coordonnée vaut 0 ou l’arête entière — '
        + 'ici 0 ou 4 pour la troisième. Le triplet du sommet G est '
        + '(6 ; 6 ; 4).',
      piege: 'troisieme-coordonnee-oubliee', revoir: 'propriete',
    },
    {
      id: 't-15-4-9', type: 'trous',
      consigne:
        'ABCDEFGH est un pavé droit : sa face du bas est le rectangle ABCD, sa '
        + 'face du haut le rectangle EFGH, et E est au-dessus de A, F au-dessus '
        + 'de B, G au-dessus de C, H au-dessus de D. On repère les sommets à '
        + 'partir de A : la première coordonnée se lit en cm sur l’arête [AB], la '
        + 'deuxième sur l’arête [AD], la troisième sur l’arête [AE], toujours '
        + 'dans cet ordre. On sait que le sommet G a pour coordonnées '
        + '(9 ; 4 ; 6). Complète les trois coordonnées du sommet D.',
      enonce:
        '\\text{pavé : le sommet G a pour coordonnées (9 ; 4 ; 6)} \\qquad '
        + '\\text{D ( } \\square \\text{ ; } \\square \\text{ ; } \\square \\text{ )}',
      champs: [
        { id: 'a', etiquette: 'première coordonnée de D', attendu: 0 },
        { id: 'b', etiquette: 'deuxième coordonnée de D', attendu: 4 },
        { id: 'c', etiquette: 'troisième coordonnée de D', attendu: 0 },
      ],
      piege: 'troisieme-coordonnee-oubliee', revoir: 'remarque',
    },
    {
      id: 't-15-4-10', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{ABCDEFGH est un pavé droit à base carrée : AB = 7 cm, AD = 7 cm, AE = 2 cm, E au-dessus de A.} '
        + '\\quad \\text{Origine A : première coordonnée sur [AB], deuxième sur [AD], troisième sur [AE], dans cet ordre.} '
        + '\\quad \\text{On annonce que les sommets B et D ont les mêmes coordonnées.}',
      attendu: false,
      // Répondre « oui », c’est tenir l’ordre pour libre : B et D portent bien
      // les mêmes trois nombres, mais pas aux mêmes places.
      fausses: [{ valeur: true, piege: 'troisieme-coordonnee-oubliee' }],
      explication:
        'B est au bout de l’arête [AB] : ses coordonnées sont (7 ; 0 ; 0). D est '
        + 'au bout de l’arête [AD] : les siennes sont (0 ; 7 ; 0). Ce sont les '
        + 'mêmes trois nombres, mais pas aux mêmes places — et ce sont deux coins '
        + 'différents du pavé. L’ordre fait partie de la réponse : c’est lui qui '
        + 'dit sur quelle arête chaque longueur a été parcourue.',
      piege: 'troisieme-coordonnee-oubliee', revoir: 'definition',
    },
  ],
};
