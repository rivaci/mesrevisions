// Chapitre 17, savoir-faire 3 — Utiliser une variable.
//
// ── Le seul endroit du programme où le signe « = » se dédouble ─────────────
//
// L'élève arrive ici en sortant du chapitre 11, où il a appris qu'une équation
// se résout et que x = x + 1 n'a aucune solution. On lui demande maintenant
// d'exécuter « x prend la valeur x + 1 » sans broncher. Les deux énoncés se
// ressemblent au point de se confondre, et pourtant l'un est faux pour tout x
// tandis que l'autre s'exécute très bien.
//
// La différence n'est pas une subtilité de vocabulaire, c'est le TEMPS. Dans
// une équation, les deux x désignent le même nombre au même instant. Dans une
// affectation, le x de droite est celui d'AVANT la ligne et celui de gauche
// celui d'APRÈS : ils ne coexistent jamais. Tout ce savoir-faire tient à faire
// voir ce décalage, et le seul instrument qui le rend visible est la table de
// suivi — une valeur par ligne, la précédente barrée.
//
// ── La découverte ne dit rien, elle fait remplir ──────────────────────────
//
// Le programme de la découverte fait passer x par 5, puis 9, puis 27, et
// l'élève écrit ces trois nombres lui-même, un par champ. Il n'y a rien à
// croire : il a sous les yeux une variable qui a valu trois choses différentes
// dans un programme de quatre lignes. La conclusion arrive après, et elle ne
// fait que nommer ce qu'il vient d'écrire — puis elle rouvre explicitement le
// chapitre 11, parce que c'est là que la confusion se loge.
//
// ── Les trois items neutres, et ce que chacun casse ───────────────────────
//
// e-17-3-1 : trois variables, chacune remplie une seule fois, aucune ne lit sa
// propre valeur. Un élève qui porte la confusion « prend la valeur = égalité »
// y répond juste, donc le piège ne peut pas produire l'erreur. Sans cet item,
// « dans ce savoir-faire, la réponse est toujours la valeur écrasée »
// traverserait le lot entier. Sa fausse pointe vers un AUTRE piège, celui de
// l'addition mise à la place du produit.
//
// e-17-3-6 : la boucle ne contient qu'un « afficher ». La variable n'est jamais
// modifiée, donc le piège du savoir-faire est hors-jeu. Le premier champ se
// joue au comptage des tours — d'où les deux fausses rattachées au piège de la
// boucle comptée à un près — et le second sur un point que rien d'autre ne
// vérifie : « afficher » LIT la variable, il ne la vide pas, donc x vaut encore
// 7 quand le programme s'arrête.
//
// e-17-3-7 : une chaîne de trois variables distinctes, et un « plausible » dont
// la réponse est OUI. Deux stratégies de surface tombent d'un coup : « on me
// demande si c'est plausible, donc c'est non », et « il y a forcément une
// valeur écrasée quelque part ».
//
// ── Ce que les items non neutres attrapent ───────────────────────────────
//
// affectation-lue-comme-egalite est le piège principal, et il apparaît sous ses
// trois formes : la valeur ancienne qu'on garde (e-17-3-2, t-17-3-8 — où « u
// prend la valeur v » est une COPIE, et le 5 n'est plus nulle part), la valeur
// ancienne réutilisée alors qu'elle a déjà été remplacée (e-17-3-3, e-17-3-4,
// e-17-3-9), et la ligne prise pour une formule qui resterait vraie — c ne suit
// pas b quand b change après coup (e-17-3-5, t-17-3-4).
//
// variable-non-initialisee est porté par e-17-3-8 et t-17-3-5, deux
// « plausible » dont la réponse est NON, et par t-17-3-9 qui fait exécuter le
// programme UNE FOIS RÉPARÉ : nommer le bogue ne suffit pas, il faut savoir ce
// que la ligne manquante aurait changé. Le raisonnement visé est nommé dans le
// piège lui-même — « elle vaut zéro au départ » — et c'est exactement le nombre
// que produit l'élève qui l'applique.
//
// ── Pourquoi aucun item de type « corriger » ─────────────────────────────
//
// Le type « corriger » affiche ses trois lignes de raisonnement et rien
// d'autre : l'application n'y rend ni l'énoncé, ni le listing. Un programme
// posé là serait invisible, et l'élève devrait juger un raisonnement sans voir
// ce sur quoi il porte. La relecture critique est donc portée autrement, par le
// vrai/faux à contre-exemple e-17-3-10 et par les deux « plausible » du lot.
//
// ── Les listings ─────────────────────────────────────────────────────────
//
// Pseudo-code français, dans les mots des blocs Scratch : « prend la valeur »,
// « répéter … fois », « fin répéter », « afficher ». Retrait de quatre espaces,
// jamais de tabulation, et il ne sert qu'à dire ce qui est dans la boucle.
// Aucun programme ne dépasse six lignes, et tous les résultats sont des
// entiers, obtenus en exécutant le programme ligne à ligne.
//
// Une seule valeur d'entrée est laissée sans ligne qui la fournisse, et jamais
// par négligence : c'est le programme bogué de e-17-3-8, t-17-3-5, t-17-3-9 et
// p-17-3-4, où l'initialisation manquante EST la question posée. Partout
// ailleurs, chaque variable lue a été remplie plus haut.
//
// ── Ce que ce savoir-faire ne couvre pas ─────────────────────────────────
//
// Ni boucle « tant que », ni fonction, ni liste, ni récursivité : le niveau
// attendu en fin de 4e s'arrête à la variable, à la boucle bornée et à
// l'instruction conditionnelle. Le « si … sinon » relève du savoir-faire voisin
// et n'apparaît ici dans aucun programme. Les boucles bornées, elles, sont
// présentes — une variable qui accumule dans une boucle est le contexte où
// l'affectation se rencontre vraiment — mais le comptage des tours n'est jugé
// que par des réponses fausses rattachées à son propre piège.
//
// Volume : 1 découverte, 8 blocs de cours dont 3 d'exemples travaillés (trois
// exemples pour le palier 1, deux pour le palier 2, deux pour le palier 3),
// 1 méthode, 10 exercices d'entraînement (3 + 4 + 3), 5 problèmes et 10 items
// d'auto-évaluation. Aucun item de « se tester » ne reprend les VALEURS d'un
// exercice d'entraînement : t-17-3-1, t-17-3-3 et t-17-3-4 en reprennent
// délibérément la structure — c'est le principe d'une auto-évaluation, qui
// mesure le même geste sur d'autres nombres — mais aucun programme ne se
// retrouve à l'identique d'une section à l'autre, et aucune réponse ne se
// récupère de mémoire.

export default {
  id: 'sf-17-3',
  titre: 'Utiliser une variable',
  attendus: [
    'Il utilise la notion de variable informatique et suit la valeur d’une variable au cours de l’exécution d’un programme.',
    'Il exécute un programme comportant des variables et des instructions d’affectation.',
  ],

  // On ne dit pas « l’affectation écrase l’ancienne valeur » : on fait remplir
  // la table de suivi ligne à ligne, et c’est l’élève qui écrit trois nombres
  // différents dans la même variable.
  decouvrir: {
    titre: 'La variable qui change de valeur en cours de route',
    texte:
      'Voici un programme de quatre lignes. La variable x y reçoit une valeur, '
      + 'puis deux autres instructions la visent encore.\n'
      + 'Exécute-le à la main, ligne par ligne, et note ce que vaut x après '
      + 'chacune des trois premières lignes.',
    programme: [
      'x prend la valeur 5',
      'x prend la valeur x + 4',
      'x prend la valeur x × 3',
      'afficher x',
    ],
    question: 'Que vaut x après chacune des trois premières lignes ?',
    champs: [
      { id: 'a', etiquette: 'valeur de x après la ligne 1', attendu: 5 },
      { id: 'b', etiquette: 'valeur de x après la ligne 2', attendu: 9 },
      { id: 'c', etiquette: 'valeur de x après la ligne 3', attendu: 27 },
    ],
    conclusion:
      'Après la ligne 1, x vaut **5**. La ligne 2 calcule d’abord 5 + 4 = 9 — '
      + 'avec la valeur que x a à ce moment-là — puis range **9** dans x : le 5 '
      + 'est effacé. La ligne 3 calcule 9 × 3 = 27 avec le 9, et non avec le 5, '
      + 'et range **27**.\n'
      + 'Regarde les trois nombres que tu viens d’écrire : la même variable a '
      + 'valu trois choses différentes, l’une après l’autre. Une variable n’a '
      + 'pas UNE valeur — elle a une valeur **à chaque instant**, et la nouvelle '
      + 'efface l’ancienne.\n'
      + 'C’est pour ça que « x prend la valeur x + 4 » n’est pas une équation. '
      + 'Au chapitre 11, l’équation x = x + 4 n’a aucune solution, et c’est '
      + 'vrai : dans une équation, les deux x sont le même nombre au même '
      + 'moment. Ici, le x de droite est celui d’**avant** la ligne, celui de '
      + 'gauche celui d’**après**. La ligne ne décrit rien, elle **ordonne** : '
      + 'prends l’ancienne valeur, ajoute 4, range le résultat à la place.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Une variable, un nom, une valeur à la fois',
      texte:
        'Une **variable** est une case de la mémoire de la machine. Elle porte '
        + 'un **nom** — x, n, cagnotte — et elle contient **une seule valeur à '
        + 'la fois**.\n'
        + 'On la remplit avec l’instruction **« x prend la valeur … »**, appelée '
        + 'une **affectation**. Tant qu’aucune autre affectation ne la vise, la '
        + 'variable garde ce qu’on y a mis.\n'
        + 'L’instruction **« afficher x »** montre ce que x contient à cet '
        + 'instant. Elle ne le change pas, et elle ne le retire pas non plus.',
    },
    {
      type: 'propriete',
      titre: 'Ce que fait exactement une affectation',
      texte:
        '« x prend la valeur … » n’est pas une phrase qui décrit un état : c’est '
        + 'un **ordre**, exécuté à l’instant où on l’atteint, en trois temps.\n'
        + '**1.** On calcule ce qui est écrit à **droite**, avec les valeurs '
        + 'qu’ont les variables **à ce moment-là**.\n'
        + '**2.** On range le résultat dans la variable écrite à **gauche**.\n'
        + '**3.** Ce que cette variable contenait avant est **effacé**.\n'
        + 'La valeur va donc de la droite vers la gauche, et dans ce sens '
        + 'seulement. Le nom écrit à gauche est la seule variable que la ligne '
        + 'modifie ; toutes celles qui n’apparaissent qu’à droite sont lues, pas '
        + 'touchées.',
    },
    {
      type: 'remarque',
      titre: '« x prend la valeur x + 1 » n’est pas une équation',
      texte:
        'Au chapitre 11, l’équation x = x + 1 n’a aucune solution : aucun nombre '
        + 'n’est égal à lui-même augmenté de 1. Et pourtant l’instruction '
        + '« x prend la valeur x + 1 » s’exécute sans le moindre problème.\n'
        + 'Il n’y a pas de contradiction, parce qu’il ne s’agit pas de la même '
        + 'chose. Dans une équation, les deux x désignent le **même nombre au '
        + 'même moment**. Dans une affectation, le x de droite est celui '
        + 'd’**avant** la ligne, celui de gauche celui d’**après** : ils ne '
        + 'coexistent jamais.\n'
        + 'Si x vaut 8, la machine calcule 8 + 1 = 9 avec l’ancienne valeur, '
        + 'puis range 9 à la place du 8. La ligne ne dit pas que x est égal à '
        + 'x + 1 ; elle dit **augmente x de 1**.',
    },
    {
      type: 'remarque',
      titre: 'Une copie n’est pas un lien',
      texte:
        '« c prend la valeur a − b » calcule une valeur **une seule fois**, au '
        + 'moment où la ligne est exécutée, et la range dans c. Ce n’est pas une '
        + 'formule qui resterait vraie ensuite.\n'
        + 'Si a ou b change plus loin dans le programme, **c ne bouge pas** : il '
        + 'faudrait réécrire la ligne pour la recalculer.\n'
        + 'C’est vrai aussi de « b prend la valeur a » : b reçoit une **copie** '
        + 'de la valeur de a, pas un lien vers a. Les deux variables restent '
        + 'indépendantes l’une de l’autre.\n'
        + 'Conséquence à connaître : quand on range une valeur dans une variable '
        + 'qui en contenait déjà une, l’ancienne est **perdue**. Si on en a '
        + 'encore besoin plus loin, il faut l’avoir rangée ailleurs avant.',
    },
    {
      type: 'remarque',
      titre: 'Une variable doit avoir reçu une valeur avant d’être lue',
      texte:
        'Une variable ne contient rien tant qu’aucune affectation ne l’a '
        + 'remplie. Une ligne comme « total prend la valeur total + 5 » **lit** '
        + 'total à droite : si aucune ligne au-dessus ne lui a donné de valeur, '
        + 'le programme ne calcule pas ce qu’on croit.\n'
        + 'Ne compte pas sur un zéro par défaut. Un programme qui a besoin d’un '
        + 'point de départ doit l’**écrire** — c’est le rôle de la ligne '
        + '« total prend la valeur 0 » qu’on place avant la boucle.\n'
        + 'Le contrôle : pour chaque variable lue à droite d’un « prend la '
        + 'valeur », remonte le programme. Trouves-tu au-dessus une ligne qui la '
        + 'remplit ? Sinon, c’est là qu’est le bogue.',
    },
    {
      type: 'exemple',
      titre: 'Remplir une variable, la remplacer, la suivre',
      texte:
        'Premier programme : « a prend la valeur 7 », puis « a prend la valeur '
        + '2 », puis « afficher a ». La première ligne range 7 dans a. La '
        + 'deuxième range 2 à la place : le 7 est effacé, il n’est plus nulle '
        + 'part. Le programme affiche 2 — ni 7, ni 9 : une variable ne contient '
        + 'jamais deux valeurs à la fois.\n'
        + 'Deuxième programme : « base prend la valeur 8 », puis « hauteur prend '
        + 'la valeur 5 », puis « aire prend la valeur base × hauteur », puis '
        + '« afficher aire ». Trois variables, chacune remplie une seule fois. '
        + 'La troisième ligne calcule 8 × 5 = 40 avec les valeurs du moment et '
        + 'range 40 dans aire ; base et hauteur, elles, ne sont que lues. Le '
        + 'programme affiche 40.\n'
        + 'Troisième programme : « c prend la valeur 4 », puis « c prend la '
        + 'valeur c × 5 », puis « c prend la valeur c − 6 », puis « afficher '
        + 'c ». On tient la table de suivi : après la première ligne c vaut 4 ; '
        + 'la deuxième calcule 4 × 5 = 20 et range 20 ; la troisième calcule '
        + '20 − 6 = 14 avec 20, et non avec 4, et range 14. Le programme '
        + 'affiche 14.',
    },
    {
      type: 'exemple',
      titre: 'La valeur d’avant, la valeur d’après',
      texte:
        'Premier programme : « d prend la valeur 6 », puis « d prend la valeur '
        + 'd + 5 », puis « d prend la valeur d + 5 », puis « afficher d ». Les '
        + 'deux lignes du milieu sont écrites exactement pareil, et pourtant '
        + 'elles ne calculent pas la même chose : la première fait 6 + 5 = 11, '
        + 'la seconde 11 + 5 = 16, parce qu’entre les deux le 6 a été remplacé '
        + 'par 11. Le programme affiche 16, pas 11.\n'
        + 'Deuxième programme : « u prend la valeur 9 », puis « v prend la '
        + 'valeur 2 », puis « w prend la valeur u + v », puis « u prend la '
        + 'valeur 100 », puis « afficher w ». La troisième ligne calcule '
        + '9 + 2 = 11 et range 11 dans w. La quatrième change u, mais w a déjà '
        + 'sa valeur et aucune ligne ne la recalcule : le programme affiche 11, '
        + 'et surtout pas 102.',
    },
    {
      type: 'exemple',
      titre: 'Accumuler dans une boucle, et réparer un programme',
      texte:
        'Premier programme : « r prend la valeur 1 », puis « répéter 3 fois », '
        + 'avec en retrait « r prend la valeur r × 4 », puis « fin répéter », '
        + 'puis « afficher r ». La ligne en retrait est exécutée trois fois, ni '
        + 'deux ni quatre. Premier tour : 1 × 4 = 4. Deuxième tour : 4 × 4 = 16, '
        + 'à partir de la valeur du tour précédent. Troisième tour : '
        + '16 × 4 = 64. Le programme affiche 64.\n'
        + 'Deuxième programme : « n prend la valeur 3 », puis « somme prend la '
        + 'valeur somme + n », puis « afficher somme ». Il a l’air correct, et '
        + 'il ne l’est pas : la deuxième ligne lit somme alors qu’aucune ligne '
        + 'ne lui a donné de valeur. On ne peut pas dire ce qu’il affiche, et '
        + 'surtout pas 3. Pour le réparer, on ajoute tout en haut « somme prend '
        + 'la valeur 0 » : la deuxième ligne calcule alors 0 + 3 = 3, et le '
        + 'programme affiche bien 3.',
    },
  ],

  methode: {
    titre: 'Suivre une variable ligne par ligne',
    enonce:
      'Voici un programme de quatre lignes : « x prend la valeur 9 », puis '
      + '« x prend la valeur x − 4 », puis « x prend la valeur x × 3 », puis '
      + '« afficher x ». Quel nombre s’affiche ?',
    etapes: [
      {
        texte: 'Je trace une table de suivi : une colonne par variable, une ligne par instruction. Ici il n’y a qu’une variable, x.',
        note: 'Sans table, on retient la valeur de départ et on ne voit plus les suivantes.',
      },
      {
        texte: 'Ligne 1 — « x prend la valeur 9 » range 9 dans x. J’écris 9 dans la table.',
        note: 'Rien à calculer : ce qui est à droite est déjà un nombre.',
      },
      {
        texte: 'Ligne 2 — « x prend la valeur x − 4 ». Je calcule d’abord la droite avec la valeur que x a MAINTENANT : 9 − 4 = 5. Puis je range 5 dans x, et le 9 est effacé. J’écris 5.',
        note: 'Ce n’est pas une équation : le x de droite est celui d’avant la ligne.',
      },
      {
        texte: 'Ligne 3 — « x prend la valeur x × 3 ». La valeur du moment est 5, donc 5 × 3 = 15. Je range 15, et le 5 disparaît à son tour. J’écris 15.',
        note: 'L’erreur classique est de repartir de 9 : cette valeur n’existe plus.',
      },
      {
        texte: 'Ligne 4 — « afficher x » montre ce que x contient, sans le modifier. Le programme affiche 15.',
        note: '',
      },
    ],
    controle:
      'Relis ta table ligne par ligne, avec une seule question à chaque fois : '
      + 'le calcul écrit à droite du « prend la valeur » a-t-il été fait avec la '
      + 'valeur inscrite juste au-dessus dans la table, ou avec celle du départ ? '
      + 'Ici la troisième ligne part de 5 : si tu avais trouvé 27, c’est que le 9 '
      + 'était resté alors qu’il avait été effacé.\n'
      + 'Deuxième contrôle, qui attrape une AUTRE erreur et pas celle-là : ta '
      + 'table ne doit jamais porter deux valeurs à la fois pour une même '
      + 'variable. Si tu as gardé l’ancienne à côté de la nouvelle, ou si tu les '
      + 'as additionnées, c’est là que ça se voit — mais une table qui repart du '
      + 'nombre de départ, elle, a l’air parfaitement propre : seule la première '
      + 'relecture l’attrape. Fais les deux.\n'
      + 'Et si tu doutes encore, refais tourner le programme avec un autre nombre '
      + 'de départ, en suivant les mêmes gestes : en partant de 10, tu dois '
      + 'trouver (10 − 4) × 3 = 18. Le résultat t’est donné, donc la comparaison '
      + 'tranche.',
  },

  entrainement: [
    // ── Palier 1 : une variable, une valeur à la fois ──────────────────────
    {
      // NEUTRE. Trois variables, chacune remplie une seule fois, et aucune ne
      // lit sa propre valeur : rien n’est jamais écrasé, donc la confusion
      // entre affectation et égalité ne peut pas produire d’erreur ici. C’est
      // exactement ce qui le rend nécessaire — sans lui, « dans ce
      // savoir-faire, la réponse est la valeur écrasée » réussirait partout et
      // deviendrait la règle apprise. Sa fausse pointe vers un AUTRE piège.
      id: 'e-17-3-1', type: 'calcul', palier: 1, neutre: true, piege: 'affectation-lue-comme-egalite',
      consigne: 'Exécute ce programme ligne par ligne. Quel nombre la dernière ligne affiche-t-elle ?',
      enonce: '\\text{trois variables, chacune remplie une seule fois}',
      programme: [
        'longueur prend la valeur 9',
        'largeur prend la valeur 4',
        'aire prend la valeur longueur × largeur',
        'afficher aire',
      ],
      attendu: 36,
      fausses: [
        // 9 + 4 : la ligne demande un produit, pas une somme.
        { valeur: 13, piege: 'addition-au-lieu-du-produit' },
      ],
    },
    {
      id: 'e-17-3-2', type: 'calcul', palier: 1, piege: 'affectation-lue-comme-egalite',
      consigne: 'Exécute ce programme ligne par ligne. Quel nombre la dernière ligne affiche-t-elle ?',
      enonce: '\\text{une seule variable, et deux lignes qui lui donnent une valeur}',
      programme: [
        'x prend la valeur 12',
        'x prend la valeur 5',
        'afficher x',
      ],
      attendu: 5,
      fausses: [
        // La première valeur gardée : la deuxième ligne a pourtant écrasé le 12.
        { valeur: 12, piege: 'affectation-lue-comme-egalite' },
        // 12 + 5 : les deux valeurs conservées ensemble, comme si la variable
        // pouvait en contenir deux. L’ancienne est effacée, pas ajoutée.
        { valeur: 17, piege: 'affectation-lue-comme-egalite' },
      ],
    },
    {
      id: 'e-17-3-3', type: 'trous', palier: 1, piege: 'affectation-lue-comme-egalite',
      consigne: 'Suis la variable n ligne après ligne, et complète la table de suivi.',
      enonce:
        '\\text{valeur de n après la deuxième ligne : } \\square \\qquad '
        + '\\text{valeur de n après la troisième ligne : } \\square',
      programme: [
        'n prend la valeur 20',
        'n prend la valeur n − 8',
        'n prend la valeur n + 5',
        'afficher n',
      ],
      champs: [
        { id: 'a', etiquette: 'valeur de n après la deuxième ligne', attendu: 12 },
        { id: 'b', etiquette: 'valeur de n après la troisième ligne', attendu: 17 },
      ],
      fausses: [
        // n inchangée : la ligne serait « impossible », donc rien ne bougerait.
        { valeur: 20, piege: 'affectation-lue-comme-egalite' },
        // 20 + 5 : la troisième ligne repart de la valeur de départ, alors que
        // le 12 l’a remplacée.
        { valeur: 25, piege: 'affectation-lue-comme-egalite' },
      ],
    },

    // ── Palier 2 : la valeur d’avant, et la valeur d’après ─────────────────
    {
      id: 'e-17-3-4', type: 'calcul', palier: 2, piege: 'affectation-lue-comme-egalite',
      consigne: 'Exécute ce programme ligne par ligne. Quel nombre la dernière ligne affiche-t-elle ?',
      enonce: '\\text{la même instruction est écrite deux fois de suite}',
      programme: [
        'x prend la valeur 5',
        'x prend la valeur x + 2',
        'x prend la valeur x + 2',
        'afficher x',
      ],
      attendu: 9,
      fausses: [
        // Les deux lignes exécutées à partir du 5 : la seconde part pourtant de
        // 7, la valeur que la première vient de ranger.
        { valeur: 7, piege: 'affectation-lue-comme-egalite' },
        // Rien ne change : l’instruction est lue comme une égalité impossible.
        { valeur: 5, piege: 'affectation-lue-comme-egalite' },
      ],
    },
    {
      id: 'e-17-3-5', type: 'calcul', palier: 2, piege: 'affectation-lue-comme-egalite',
      consigne: 'Exécute ce programme ligne par ligne. Quel nombre la dernière ligne affiche-t-elle ?',
      enonce: '\\text{on demande la valeur de c à la fin du programme}',
      programme: [
        'a prend la valeur 10',
        'b prend la valeur 3',
        'c prend la valeur a − b',
        'b prend la valeur 8',
        'afficher c',
      ],
      attendu: 7,
      fausses: [
        // 10 − 8 : la troisième ligne est prise pour une formule qui resterait
        // vraie. C’est un ordre exécuté une fois : c a reçu 7, et le changement
        // de b ensuite ne le recalcule pas.
        { valeur: 2, piege: 'affectation-lue-comme-egalite' },
      ],
    },
    {
      // NEUTRE. La boucle ne contient qu’un « afficher » : aucune ligne ne donne
      // de valeur à x en dehors de la première, donc la confusion entre
      // affectation et égalité ne peut rien produire ici. Ce qui décide, c’est
      // le nombre de tours — et les deux fausses pointent vers ce piège-là.
      id: 'e-17-3-6', type: 'trous', palier: 2, neutre: true, piege: 'affectation-lue-comme-egalite',
      consigne: 'Ce programme ne contient qu’un affichage dans sa boucle. Complète les deux réponses.',
      enonce:
        '\\text{nombre de valeurs affichées : } \\square \\qquad '
        + '\\text{valeur de x à la fin du programme : } \\square',
      programme: [
        'x prend la valeur 7',
        'répéter 3 fois',
        '    afficher x',
        'fin répéter',
      ],
      champs: [
        { id: 'a', etiquette: 'nombre de valeurs affichées', attendu: 3 },
        { id: 'b', etiquette: 'valeur de x à la fin du programme', attendu: 7 },
      ],
      fausses: [
        // Un tour de moins : « répéter 3 fois » exécute le bloc trois fois.
        { valeur: 2, piege: 'boucle-comptee-a-un-pres' },
        // Un tour de trop : la valeur de départ a été comptée comme un tour.
        { valeur: 4, piege: 'boucle-comptee-a-un-pres' },
      ],
    },
    {
      // NEUTRE, et « plausible » dont la réponse est OUI. Chaque variable est
      // remplie une seule fois : le piège du savoir-faire est hors-jeu, et un
      // élève qui le porte répond juste. Deux stratégies de surface tombent
      // ensemble — « c’est un plausible, donc c’est non » et « il y a forcément
      // une valeur écrasée quelque part ».
      id: 'e-17-3-7', type: 'plausible', palier: 2, neutre: true, piege: 'affectation-lue-comme-egalite',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Quelqu’un affirme que ce programme affiche 16.}',
      programme: [
        'a prend la valeur 6',
        'b prend la valeur a + 4',
        'c prend la valeur a + b',
        'afficher c',
      ],
      attendu: true,
      explication:
        'On suit les trois variables dans l’ordre. La première ligne range 6 '
        + 'dans a. La deuxième calcule 6 + 4 = 10 et range 10 dans b — a n’est '
        + 'que lue, elle vaut toujours 6. La troisième calcule 6 + 10 = 16 et '
        + 'range 16 dans c. Le programme affiche bien 16.\n'
        + 'Remarque qu’aucune valeur n’a été effacée ici : chaque variable a été '
        + 'remplie une seule fois. Les questions de ce chapitre ne portent donc '
        + 'pas toutes sur une valeur perdue — il faut exécuter le programme pour '
        + 'le savoir, pas le deviner.',
    },

    // ── Palier 3 : accumuler, réparer, réfuter ─────────────────────────────
    {
      id: 'e-17-3-8', type: 'plausible', palier: 3, piege: 'variable-non-initialisee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Quelqu’un affirme que ce programme affiche 6.}',
      programme: [
        'x prend la valeur 6',
        'y prend la valeur y + x',
        'afficher y',
      ],
      attendu: false,
      fausses: [
        // Répondre « plausible », c’est avoir calculé 0 + 6 : la variable y
        // aurait valu zéro au départ. Rien ne le garantit, et aucune ligne ne
        // l’écrit.
        { valeur: true, piege: 'variable-non-initialisee' },
      ],
      explication:
        'La deuxième ligne doit lire y pour calculer y + x. Or aucune ligne '
        + 'au-dessus n’a donné de valeur à y : le programme lit une variable '
        + 'vide, et on ne peut pas dire ce qu’il affiche.\n'
        + 'Le nombre 6 est celui qu’on obtiendrait si y valait 0 au départ. Ne '
        + 'compte pas là-dessus : un programme qui a besoin d’un point de départ '
        + 'doit l’écrire. Il suffirait d’ajouter tout en haut la ligne « y prend '
        + 'la valeur 0 » pour que l’affichage de 6 devienne, lui, parfaitement '
        + 'sûr.',
    },
    {
      id: 'e-17-3-9', type: 'calcul', palier: 3, piege: 'affectation-lue-comme-egalite',
      consigne: 'Exécute ce programme ligne par ligne. Quel nombre la dernière ligne affiche-t-elle ?',
      enonce: '\\text{la ligne en retrait est exécutée à chaque tour de la boucle}',
      programme: [
        's prend la valeur 0',
        'répéter 4 fois',
        '    s prend la valeur s + 6',
        'fin répéter',
        'afficher s',
      ],
      attendu: 24,
      fausses: [
        // 0 + 6 refait à chaque tour : la valeur rangée au tour précédent est
        // ignorée, alors que c’est elle que la ligne lit.
        { valeur: 6, piege: 'affectation-lue-comme-egalite' },
        // s reste à sa valeur de départ : la ligne est lue comme une égalité
        // impossible, donc sans effet.
        { valeur: 0, piege: 'affectation-lue-comme-egalite' },
        // Cinq tours au lieu de quatre.
        { valeur: 30, piege: 'boucle-comptee-a-un-pres' },
        // Trois tours au lieu de quatre.
        { valeur: 18, piege: 'boucle-comptee-a-un-pres' },
      ],
    },
    {
      id: 'e-17-3-10', type: 'vraifaux', palier: 3, piege: 'affectation-lue-comme-egalite',
      consigne: 'Vrai ou faux ? Si c’est faux, donne un contre-exemple.',
      affirmation:
        'L’instruction x prend la valeur x + 1 est impossible, parce qu’aucun '
        + 'nombre n’est égal à lui-même augmenté de 1.',
      attendu: false,
      contreExemple: {
        // On ne demande pas de réciter « c’est un ordre, pas une équation » : on
        // fait exécuter la ligne et écrire les DEUX valeurs, celle d’avant et
        // celle d’après. Un élève qui écrit lui-même 8 puis 9 a sous les yeux
        // que les deux x n’ont jamais coexisté.
        invite:
          'Voici un programme de trois lignes : « x prend la valeur 8 », puis '
          + '« x prend la valeur x + 1 », puis « afficher x ». Exécute-le à la '
          + 'main. Donne la valeur de x juste avant la deuxième ligne, puis '
          + 'juste après.',
        champs: [
          { id: 'a', etiquette: 'valeur de x juste avant la deuxième ligne' },
          { id: 'b', etiquette: 'valeur de x juste après la deuxième ligne' },
        ],
        valide: (a, b) => Math.abs(a - 8) < 1e-9 && Math.abs(b - 9) < 1e-9,
        temoin: [8, 9],
        exemple:
          'Juste avant la deuxième ligne, x vaut 8. La machine calcule alors '
          + '8 + 1 = 9 avec cette ancienne valeur, puis range 9 dans x : juste '
          + 'après, x vaut 9, et le programme affiche 9. Les deux x ne se sont '
          + 'jamais trouvés là en même temps — le 8 a disparu au moment précis '
          + 'où le 9 est arrivé. L’équation x = x + 1 n’a effectivement aucune '
          + 'solution, mais ceci n’est pas une équation : c’est un ordre.',
      },
    },
  ],

  problemes: [
    {
      // La table de suivi comme tâche à part entière, et une dernière question
      // qui fait relancer le même programme avec une autre entrée : c’est le
      // contrôle de la méthode, transformé en question.
      id: 'p-17-3-1',
      enonce:
        'Voici un programme qui ne manipule qu’une seule variable. Suis-la '
        + 'ligne après ligne, et note ce qu’elle vaut à chaque étape.',
      programme: [
        'x prend la valeur 30',
        'x prend la valeur x − 6',
        'x prend la valeur x × 3',
        'afficher x',
      ],
      questions: [
        { texte: 'Que vaut x après la deuxième ligne ?', attendu: 24 },
        { texte: 'Que vaut x après la troisième ligne ?', attendu: 72 },
        { texte: 'On remplace la première ligne par « x prend la valeur 10 ». Quel nombre le programme affiche-t-il alors ?', attendu: 12 },
      ],
    },
    {
      // Une variable qui accumule dans une boucle bornée : le contexte où
      // l’affectation se rencontre vraiment. La question du milieu fait compter
      // les tours avant que la dernière ne fasse calculer le total.
      id: 'p-17-3-2',
      enonce:
        'Léa note ses économies dans un programme. La variable cagnotte est en '
        + 'euros, et elle ajoute la même somme à chaque tour de boucle.',
      programme: [
        'cagnotte prend la valeur 12',
        'répéter 5 fois',
        '    cagnotte prend la valeur cagnotte + 4',
        'fin répéter',
        'afficher cagnotte',
      ],
      questions: [
        { texte: 'Que vaut cagnotte à la fin du premier tour de boucle ?', attendu: 16, unite: '€' },
        { texte: 'Combien de fois la ligne en retrait est-elle exécutée ?', attendu: 5, unite: 'fois' },
        { texte: 'Quel nombre la dernière ligne affiche-t-elle ?', attendu: 32, unite: '€' },
      ],
    },
    {
      // L’échange raté, et il est spectaculaire : les deux variables finissent
      // avec la même valeur, et le 3 n’est plus nulle part. La troisième
      // question le fait constater par un comptage, sans mot de vocabulaire.
      id: 'p-17-3-3',
      enonce:
        'Ce programme essaie d’échanger le contenu de a et de b. Exécute-le '
        + 'ligne par ligne, sans supposer qu’il réussit.',
      programme: [
        'a prend la valeur 3',
        'b prend la valeur 9',
        'a prend la valeur b',
        'b prend la valeur a',
        'afficher a',
        'afficher b',
      ],
      questions: [
        { texte: 'Que vaut a à la fin du programme ?', attendu: 9 },
        { texte: 'Que vaut b à la fin du programme ?', attendu: 9 },
        { texte: 'Combien de fois le nombre 3 est-il affiché ?', attendu: 0, unite: 'fois' },
      ],
    },
    {
      // Nommer le bogue ne suffit pas : les deux premières questions font
      // exécuter le programme UNE FOIS RÉPARÉ, avec deux points de départ
      // différents, pour que la ligne manquante ait un effet visible.
      id: 'p-17-3-4',
      enonce:
        'Ce programme ne peut rien afficher de sûr : à la deuxième ligne, la '
        + 'machine doit lire la valeur de total pour calculer total + prix, '
        + 'alors qu’aucune ligne ne la lui a encore donnée. On le répare en '
        + 'insérant une ligne tout en haut.',
      programme: [
        'prix prend la valeur 15',
        'total prend la valeur total + prix',
        'afficher total',
      ],
      questions: [
        { texte: 'On insère tout en haut la ligne « total prend la valeur 0 ». Quel nombre le programme affiche-t-il alors ?', attendu: 15 },
        { texte: 'On remplace cette nouvelle première ligne par « total prend la valeur 100 ». Quel nombre le programme affiche-t-il alors ?', attendu: 115 },
        { texte: 'Combien de variables différentes le programme réparé utilise-t-il ?', attendu: 2, unite: 'variables' },
      ],
    },
    {
      // La copie qui ne suit pas, dans un contexte où l’élève a envie de
      // recalculer. La dernière question lui fait écrire le nombre qu’il aurait
      // obtenu s’il avait vraiment recalculé — l’écart est alors le sien.
      id: 'p-17-3-5',
      enonce:
        'Un magasin suit son stock avec ce programme. Toutes les valeurs sont '
        + 'des nombres d’articles.',
      programme: [
        'stock prend la valeur 50',
        'vendus prend la valeur 12',
        'reste prend la valeur stock − vendus',
        'vendus prend la valeur 20',
        'afficher reste',
      ],
      questions: [
        { texte: 'Que vaut reste juste après la troisième ligne ?', attendu: 38, unite: 'articles' },
        { texte: 'Quel nombre la dernière ligne affiche-t-elle ?', attendu: 38, unite: 'articles' },
        { texte: 'Si on réécrivait la ligne « reste prend la valeur stock − vendus » juste avant l’affichage, quel nombre serait affiché ?', attendu: 30, unite: 'articles' },
      ],
    },
  ],

  test: [
    {
      id: 't-17-3-1', type: 'calcul',
      consigne: 'Exécute ce programme ligne par ligne. Quel nombre la dernière ligne affiche-t-elle ?',
      enonce: '\\text{une seule variable, visée par deux affectations}',
      programme: [
        'y prend la valeur 30',
        'y prend la valeur 8',
        'afficher y',
      ],
      attendu: 8,
      fausses: [
        { valeur: 30, piege: 'affectation-lue-comme-egalite' },
        { valeur: 38, piege: 'affectation-lue-comme-egalite' },
      ],
      piege: 'affectation-lue-comme-egalite', revoir: 'propriete',
    },
    {
      id: 't-17-3-2', type: 'trous',
      consigne: 'Suis la variable k ligne après ligne, et complète la table de suivi.',
      enonce:
        '\\text{valeur de k après la deuxième ligne : } \\square \\qquad '
        + '\\text{valeur de k après la troisième ligne : } \\square',
      programme: [
        'k prend la valeur 6',
        'k prend la valeur k × 3',
        'k prend la valeur k − 5',
        'afficher k',
      ],
      champs: [
        { id: 'a', etiquette: 'valeur de k après la deuxième ligne', attendu: 18 },
        { id: 'b', etiquette: 'valeur de k après la troisième ligne', attendu: 13 },
      ],
      fausses: [
        { valeur: 6, piege: 'affectation-lue-comme-egalite' },
        // 6 − 5 : la troisième ligne repart de la valeur de départ.
        { valeur: 1, piege: 'affectation-lue-comme-egalite' },
      ],
      piege: 'affectation-lue-comme-egalite', revoir: 'propriete',
    },
    {
      id: 't-17-3-3', type: 'calcul',
      consigne: 'Exécute ce programme ligne par ligne. Quel nombre la dernière ligne affiche-t-elle ?',
      enonce: '\\text{deux lignes identiques, l’une après l’autre}',
      programme: [
        'm prend la valeur 4',
        'm prend la valeur m + 10',
        'm prend la valeur m + 10',
        'afficher m',
      ],
      attendu: 24,
      fausses: [
        { valeur: 14, piege: 'affectation-lue-comme-egalite' },
        { valeur: 4, piege: 'affectation-lue-comme-egalite' },
      ],
      piege: 'affectation-lue-comme-egalite', revoir: 'remarque',
    },
    {
      id: 't-17-3-4', type: 'calcul',
      consigne: 'Exécute ce programme ligne par ligne. Quel nombre la dernière ligne affiche-t-elle ?',
      enonce: '\\text{on demande la valeur de r à la fin du programme}',
      programme: [
        'p prend la valeur 25',
        'q prend la valeur 5',
        'r prend la valeur p + q',
        'p prend la valeur 40',
        'afficher r',
      ],
      attendu: 30,
      fausses: [
        // 40 + 5 : la troisième ligne est prise pour une formule qui se
        // recalculerait quand p change. Elle a été exécutée une fois, et r vaut
        // déjà 30.
        { valeur: 45, piege: 'affectation-lue-comme-egalite' },
      ],
      piege: 'affectation-lue-comme-egalite', revoir: 'remarque',
    },
    {
      id: 't-17-3-5', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Quelqu’un affirme que ce programme affiche 14.}',
      programme: [
        'total prend la valeur total + 7',
        'total prend la valeur total × 2',
        'afficher total',
      ],
      attendu: false,
      fausses: [
        { valeur: true, piege: 'variable-non-initialisee' },
      ],
      explication:
        'La toute première ligne lit déjà total, pour calculer total + 7. Or '
        + 'rien ne l’a rempli : le programme part d’une variable vide, et on ne '
        + 'peut pas dire ce qu’il affiche.\n'
        + 'Le nombre 14 est celui qu’on obtiendrait si total valait 0 au '
        + 'départ : 0 + 7 = 7, puis 7 × 2 = 14. Ce zéro n’est écrit nulle part, '
        + 'et il ne faut pas compter dessus. Avec une ligne « total prend la '
        + 'valeur 0 » ajoutée tout en haut, l’affichage de 14 serait alors '
        + 'exact.',
      piege: 'variable-non-initialisee', revoir: 'remarque',
    },
    {
      id: 't-17-3-6', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Quelqu’un affirme que ce programme affiche 3.}',
      programme: [
        'a prend la valeur 11',
        'a prend la valeur a − 4',
        'a prend la valeur a − 4',
        'afficher a',
      ],
      attendu: true,
      fausses: [
        // Répondre « pas plausible », c’est presque toujours avoir exécuté les
        // deux soustractions à partir de 11 et trouvé 7 les deux fois.
        { valeur: false, piege: 'affectation-lue-comme-egalite' },
      ],
      explication:
        'La deuxième ligne calcule 11 − 4 = 7 et range 7 dans a. La troisième '
        + 'ne repart pas de 11, qui vient d’être effacé, mais de 7 : elle '
        + 'calcule 7 − 4 = 3. Le programme affiche bien 3.',
      piege: 'affectation-lue-comme-egalite', revoir: 'exemple',
    },
    {
      id: 't-17-3-7', type: 'calcul',
      consigne: 'Exécute ce programme ligne par ligne. Quel nombre la dernière ligne affiche-t-elle ?',
      enonce: '\\text{la ligne en retrait est exécutée à chaque tour de la boucle}',
      programme: [
        's prend la valeur 100',
        'répéter 3 fois',
        '    s prend la valeur s − 20',
        'fin répéter',
        'afficher s',
      ],
      attendu: 40,
      fausses: [
        // 100 − 20 refait à chaque tour depuis la valeur de départ.
        { valeur: 80, piege: 'affectation-lue-comme-egalite' },
        // s reste à 100 : la ligne est lue comme une égalité, donc sans effet.
        { valeur: 100, piege: 'affectation-lue-comme-egalite' },
        // Quatre tours au lieu de trois.
        { valeur: 20, piege: 'boucle-comptee-a-un-pres' },
        // Deux tours au lieu de trois.
        { valeur: 60, piege: 'boucle-comptee-a-un-pres' },
      ],
      piege: 'affectation-lue-comme-egalite', revoir: 'exemple',
    },
    {
      id: 't-17-3-8', type: 'trous',
      consigne: 'Ce programme affiche deux nombres, dans l’ordre. Complète-les.',
      enonce:
        '\\text{nombre affiché par la quatrième ligne : } \\square \\qquad '
        + '\\text{nombre affiché par la cinquième ligne : } \\square',
      programme: [
        'u prend la valeur 5',
        'v prend la valeur 12',
        'u prend la valeur v',
        'afficher u',
        'afficher v',
      ],
      champs: [
        { id: 'a', etiquette: 'nombre affiché par la quatrième ligne', attendu: 12 },
        { id: 'b', etiquette: 'nombre affiché par la cinquième ligne', attendu: 12 },
      ],
      fausses: [
        // 5 gardé quelque part : « u prend la valeur v » copie 12 dans u et
        // efface le 5. Aucune des deux variables ne vaut plus 5.
        { valeur: 5, piege: 'affectation-lue-comme-egalite' },
      ],
      piege: 'affectation-lue-comme-egalite', revoir: 'definition',
    },
    {
      id: 't-17-3-9', type: 'calcul',
      consigne:
        'Ce programme lit total à la troisième ligne alors qu’aucune ligne ne '
        + 'lui a donné de valeur : il ne peut rien afficher de sûr. On le répare '
        + 'en insérant tout en haut la ligne « total prend la valeur 0 ». Quel '
        + 'nombre le programme réparé affiche-t-il ?',
      enonce: '\\text{le programme avant réparation}',
      programme: [
        'a prend la valeur 6',
        'b prend la valeur 9',
        'total prend la valeur total + a + b',
        'afficher total',
      ],
      attendu: 15,
      fausses: [
        // total resterait à 0 : la ligne serait lue comme une égalité
        // impossible, donc sans effet. Elle range pourtant 0 + 6 + 9 dans total.
        { valeur: 0, piege: 'affectation-lue-comme-egalite' },
      ],
      piege: 'variable-non-initialisee', revoir: 'remarque',
    },
    {
      id: 't-17-3-10', type: 'calcul',
      consigne: 'Exécute ce programme ligne par ligne. Quel nombre la dernière ligne affiche-t-elle ?',
      enonce: '\\text{à chaque tour, la variable se sert de sa propre valeur}',
      programme: [
        'x prend la valeur 6',
        'répéter 4 fois',
        '    x prend la valeur x + x',
        'fin répéter',
        'afficher x',
      ],
      attendu: 96,
      fausses: [
        // 6 + 6 refait à chaque tour : la valeur rangée au tour précédent est
        // ignorée, alors que c’est elle que la ligne lit deux fois.
        { valeur: 12, piege: 'affectation-lue-comme-egalite' },
        // x reste à 6 : la ligne est lue comme une égalité impossible.
        { valeur: 6, piege: 'affectation-lue-comme-egalite' },
        // Trois tours au lieu de quatre.
        { valeur: 48, piege: 'boucle-comptee-a-un-pres' },
        // Cinq tours au lieu de quatre.
        { valeur: 192, piege: 'boucle-comptee-a-un-pres' },
      ],
      piege: 'affectation-lue-comme-egalite', revoir: 'exemple',
    },
  ],
};
