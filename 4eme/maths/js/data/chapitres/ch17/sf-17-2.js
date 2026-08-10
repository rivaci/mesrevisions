// Chapitre 17, savoir-faire 2 — Corriger un programme.
//
// ── Un bogue se trouve en exécutant, jamais en devinant l'intention ───────
//
// Le savoir-faire précédent fait dire ce qu'un programme produit. Celui-ci
// donne un programme qui NE FAIT PAS ce qu'on lui demandait, et fait désigner
// la ligne fautive. C'est un geste différent : il faut deux nombres — ce que le
// programme affiche, ce qu'il devrait afficher — et la première ligne où les
// deux s'écartent.
//
// D'où une règle tenue partout : aucun bogue de ce fichier ne se devine. Chaque
// consigne écrit l'objectif en toutes lettres et, quand le programme s'exécute,
// donne le nombre qu'il sort ET le nombre attendu. Un élève qui déroule le
// programme à la main trouve la ligne ; un élève qui l'interprète ne trouve
// rien. C'est exactement ce qu'on veut mesurer.
//
// ── Les items « corriger » portent le listing dans leurs lignes ───────────
//
// Le type `corriger` affiche ses `lignes` comme autant de boutons à chasse
// fixe, et l'élève clique celui qu'il accuse. Dans ce savoir-faire, ces lignes
// SONT le programme : une ligne de code par bouton, dans l'ordre, numérotées
// par leur position — « la réponse était la ligne 8 » se lit alors sans
// traduction. Ces items ne portent donc pas de champ `programme`, qui
// afficherait le même listing deux fois ; les items d'un autre type (`calcul`,
// `trous`, `plausible`) et les problèmes, eux, le portent.
//
// Le retrait est écrit dans tous les listings — quatre espaces, jamais de
// tabulation. Et comme un bouton HTML ne conserve pas les blancs, chaque bloc
// est en plus fermé explicitement par « fin si » ou « fin répéter » : la portée
// d'une ligne reste lisible même sans son décalage. C'est ce qui permet à
// e-17-2-3 de poser sa vraie question — la dernière réduction est-elle DANS le
// « sinon », ou après le « fin si » ?
//
// ── Les trois items neutres, et ce que chacun casse ───────────────────────
//
// e-17-2-1 ne contient aucune instruction conditionnelle : croire que les deux
// branches d'un « si … sinon » s'exécutent n'y produit aucune erreur. Sans lui,
// « dans ce savoir-faire, le bogue est toujours dans la condition »
// traverserait le lot entier et deviendrait la règle apprise.
//
// e-17-2-6 ne contient aucune boucle : compter les tours à un près y est sans
// effet. Ses trois fausses pointent vers d'AUTRES pièges, dont deux vers
// si-et-sinon-tous-deux-executes — 12 pour la branche prise sans évaluer la
// condition, 13 pour les deux branches enchaînées.
//
// e-17-2-8 est le plus important des trois : le programme y est JUSTE, et la
// réponse est « plausible ». Sans lui, « on me donne un programme à relire,
// donc il est faux » suffirait à traverser le savoir-faire — l'erreur
// symétrique de celle qu'on combat, et tout aussi coûteuse en contrôle. Aucune
// condition dedans non plus, d'où le piège qu'il neutralise.
//
// ── Ce que ce savoir-faire n'a pas ────────────────────────────────────────
//
// Niveaux 1 et 2 de fin de 4e : variable, boucle bornée, instruction
// conditionnelle. Pas de « tant que » non bornée, pas de fonction ni de
// procédure à paramètres, pas de liste, pas de récursivité. Aucun programme ne
// dépasse neuf lignes. Toutes les valeurs d'entrée sont écrites dans le
// programme, sauf là où l'absence de valeur EST le bogue — et l'énoncé le dit
// alors : « il ne peut pas s'exécuter ».
//
// Les quatre pièges du savoir-faire sont chacun le piège d'au moins un item non
// neutre : si-et-sinon-tous-deux-executes (e-17-2-3, e-17-2-7, e-17-2-10),
// variable-non-initialisee (e-17-2-9), boucle-comptee-a-un-pres (e-17-2-4,
// e-17-2-5) et ordre-des-instructions-ignore (e-17-2-2). Le cinquième piège du
// chapitre, affectation-lue-comme-egalite, n'apparaît que dans des réponses
// fausses : il est travaillé pour lui-même au savoir-faire précédent.
//
// Le lot compte 1 découverte, 8 blocs de cours (dont 3 blocs d'exemples portant
// six programmes travaillés, deux par bloc), 1 méthode, 10 exercices
// d'entraînement, 5 problèmes et 10 items d'auto-évaluation. Tous les nombres
// ont été obtenus en déroulant les programmes à la main, et l'auto-évaluation
// ne reprend les valeurs d'aucun exercice d'entraînement.

export default {
  id: 'sf-17-2',
  titre: 'Corriger un programme',
  attendus: [
    'Il met au point un programme : il repère l’instruction fautive et la corrige.',
    'Il comprend l’effet d’une instruction conditionnelle et d’une boucle bornée sur le déroulement d’un programme.',
  ],

  // On ne dit pas « une seule branche s’exécute » : on fait exécuter à la main
  // les deux premières lignes, et c’est l’élève qui compte combien de lignes
  // « prend la valeur » passent ensuite — une, là où il en attendait deux.
  decouvrir: {
    titre: 'Le « sinon » que le programme n’exécute pas',
    texte:
      'Ce programme calcule le prix à payer à la caisse. Deux élèves ne sont pas '
      + 'd’accord sur ce qu’il affiche : Lina annonce 30, Tom annonce 28. Pour '
      + 'les départager, on l’exécute ligne par ligne, comme le ferait la '
      + 'machine. Voici les deux premières lignes.',
    programme: [
      'prix prend la valeur 40',
      'si prix > 30 alors',
      '    prix prend la valeur prix − 10',
      'sinon',
      '    prix prend la valeur prix − 2',
      'fin si',
      'afficher prix',
    ],
    lignes: [
      { calcul: 'ligne 1 — prix prend la valeur 40', resultat: 'prix vaut 40' },
      { calcul: 'ligne 2 — la condition « prix > 30 »', resultat: 'vraie, car 40 dépasse 30' },
    ],
    question:
      'Après la ligne 2, combien de lignes « prend la valeur » ce programme '
      + 'exécute-t-il encore ? Et quel nombre affiche-t-il ?',
    champs: [
      { id: 'a', etiquette: 'nombre de lignes « prend la valeur » exécutées après la ligne 2', attendu: 1 },
      { id: 'b', etiquette: 'le nombre affiché', attendu: 30 },
    ],
    conclusion:
      'Une seule ligne « prend la valeur » s’exécute après la condition : la '
      + 'ligne 3, celle du « si ». Le prix passe à **30**, et c’est ce que le '
      + 'programme affiche. Lina a raison.\n'
      + 'La ligne 5, celle du « sinon », est **sautée entièrement** — comme si '
      + 'elle n’était pas écrite. C’est là que Tom se trompe : il a enchaîné les '
      + 'deux, 40 − 10 = 30 puis 30 − 2 = 28. Or un « si … sinon » ne fait '
      + 'jamais les deux.\n'
      + 'Retiens le mécanisme, parce que c’est lui qu’on retrouvera dans presque '
      + 'tous les programmes à corriger : la condition décide, et elle décide '
      + '**une fois**. Vraie, on prend la branche du « si » ; fausse, on prend '
      + 'celle du « sinon ». Jamais les deux, jamais aucune. Une ligne écrite '
      + 'après le « fin si », en revanche, ne fait partie d’aucune branche : '
      + 'celle-là s’exécute toujours.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Corriger un programme, c’est l’exécuter',
      texte:
        'Un programme **bogué** n’est pas un programme incompréhensible : c’est '
        + 'un programme qui s’exécute très bien, mais qui ne fait pas ce qu’on '
        + 'lui demandait.\n'
        + 'Le corriger, c’est trouver la **ligne fautive**, puis dire ce qu’il '
        + 'faut écrire à sa place. Et le seul moyen sûr de la trouver, c’est '
        + 'd’**exécuter le programme à la main**, une ligne à la fois, en notant '
        + 'la valeur de chaque variable — exactement comme le ferait la machine, '
        + 'sans rien deviner de l’intention de celui qui l’a écrit.\n'
        + 'Deux nombres commandent tout : celui que le programme affiche, et '
        + 'celui qu’il devrait afficher. La ligne fautive est la **première** où '
        + 'ta table de suivi s’écarte de ce que tu attendais.',
    },
    {
      type: 'propriete',
      titre: 'Les quatre endroits où un programme casse',
      texte:
        '**L’initialisation** — une variable lue avant d’avoir reçu une valeur. '
        + 'Le programme s’arrête là : on ne peut pas ajouter quelque chose à ce '
        + 'qui ne vaut rien.\n'
        + '**L’ordre** — les instructions s’exécutent de haut en bas, et chacune '
        + 'n’agit que sur ce qui vient APRÈS elle. Un « afficher » placé trop '
        + 'tôt montre une valeur périmée.\n'
        + '**Le nombre de tours** — « répéter n fois » exécute le bloc '
        + 'exactement n fois, ni une de plus, ni une de moins.\n'
        + '**La condition** — dans un « si … sinon », une branche s’exécute et '
        + 'l’autre est sautée. Jamais les deux.',
    },
    {
      type: 'remarque',
      titre: 'Une branche, et une seule',
      texte:
        'C’est l’erreur la plus fréquente, et la plus coûteuse.\n'
        + 'Quand la machine arrive sur « si … alors », elle calcule la condition '
        + 'avec les valeurs que les variables ont **à cet instant**. Condition '
        + 'vraie : la branche du « si ». Condition fausse : la branche du '
        + '« sinon ». La branche sautée n’est pas exécutée « un peu moins » : '
        + 'elle n’est pas exécutée **du tout**.\n'
        + 'Deux endroits trompent, et ce sont eux qu’il faut regarder en '
        + 'premier. Une ligne écrite **après le « fin si »** ne fait partie '
        + 'd’aucune branche : elle s’applique à tout le monde. Et une condition '
        + 'peut être écrite à l’envers — « si age > 14 » là où l’énoncé dit '
        + '« avant 14 ans ». Dans les deux cas le programme tourne sans broncher, '
        + 'et il donne un résultat faux.\n'
        + 'Un « si » peut enfin venir seul, sans « sinon » : il n’a alors qu’une '
        + 'branche, celle du « si ». Condition vraie, elle s’exécute ; condition '
        + 'fausse, il ne se passe rien du tout et le programme reprend après le '
        + '« fin si ».',
    },
    {
      type: 'remarque',
      titre: 'Compter les tours sur ses doigts',
      texte:
        '« Répéter 4 fois » veut dire quatre exécutions du bloc : ni trois, ni '
        + 'cinq.\n'
        + 'La valeur de départ n’est pas un tour, c’est ce qu’il y a **avant** '
        + 'le premier. Numérote les tours 1, 2, 3, 4 et écris la valeur de la '
        + 'variable à la fin de chacun : le dernier nombre écrit est celui que le '
        + 'programme affiche.\n'
        + 'Compare-le alors au nombre attendu. Si l’écart vaut exactement un '
        + 'tour, trois lignes peuvent en être la cause, et trois seulement : la '
        + 'valeur de départ, le nombre ajouté dans le bloc, et le nombre écrit '
        + 'dans « répéter … fois ». Relis les deux premières : si elles sont '
        + 'conformes à l’énoncé, c’est la troisième.',
    },
    {
      type: 'remarque',
      titre: 'Ce qu’une variable vaut, et ce qu’elle valait',
      texte:
        '« total prend la valeur total + 5 » n’est pas une équation, c’est un '
        + '**ordre** : on calcule total + 5 avec l’ANCIENNE valeur, puis on range '
        + 'le résultat dans total. L’ancienne est écrasée.\n'
        + 'Et une variable ne vaut pas zéro par défaut. Si aucune ligne au-dessus '
        + 'ne l’a remplie, le programme ne peut pas continuer.\n'
        + 'Le geste qui l’attrape : remonte le programme depuis la ligne qui '
        + 'emploie la variable, et cherche au-dessus une ligne qui lui donne une '
        + 'valeur. Si tu n’en trouves aucune, ou si elle est écrite plus bas, '
        + 'c’est là qu’est le bogue.',
    },
    {
      type: 'exemple',
      titre: 'Deux programmes à corriger : la ligne qui bloque, et la ligne mal placée',
      texte:
        'PREMIER PROGRAMME. Ligne 1 : « compteur prend la valeur compteur + 1 ». '
        + 'Ligne 2 : « afficher compteur ». On veut afficher 1. Exécution : dès '
        + 'la ligne 1, il faut connaître compteur pour lui ajouter 1 — et rien, '
        + 'au-dessus, ne lui a donné de valeur. L’exécution s’arrête là. La '
        + 'correction : ajouter avant, une ligne « compteur prend la valeur 0 ». '
        + 'Le programme affiche alors 1.\n'
        + 'DEUXIÈME PROGRAMME. Ligne 1 : « score prend la valeur 0 ». Ligne 2 : '
        + '« afficher score ». Ligne 3 : « score prend la valeur score + 10 ». On '
        + 'veut afficher le score une fois les 10 points gagnés. Exécution : '
        + 'score vaut 0, on affiche 0, puis score passe à 10 — mais plus aucune '
        + 'ligne ne l’affiche. Prise une par une, chaque ligne est juste ; c’est '
        + 'leur ORDRE qui ne l’est pas. La correction : la ligne 2 doit passer en '
        + 'dernier, et le programme affiche alors 10.',
    },
    {
      type: 'exemple',
      titre: 'Deux programmes à corriger : le nombre de tours, et la ligne de trop',
      texte:
        'TROISIÈME PROGRAMME. Ligne 1 : « somme prend la valeur 0 ». Ligne 2 : '
        + '« répéter 3 fois ». Ligne 3, dans la boucle : « somme prend la valeur '
        + 'somme + 10 ». Ligne 4 : « fin répéter ». Ligne 5 : « afficher somme ». '
        + 'On veut la somme de quatre paquets de 10, soit 40. Exécution, tour par '
        + 'tour : 10, puis 20, puis 30, et la boucle s’arrête — « répéter 3 '
        + 'fois », c’est exactement trois tours. Le programme affiche 30. La '
        + 'ligne fautive est la ligne 2 : elle doit devenir « répéter 4 fois ».\n'
        + 'QUATRIÈME PROGRAMME. Ligne 1 : « points prend la valeur 50 ». Ligne '
        + '2 : « si points > 40 alors ». Ligne 3 : « points prend la valeur '
        + 'points + 20 ». Ligne 4 : « sinon ». Ligne 5 : « points prend la valeur '
        + 'points + 5 ». Ligne 6 : « fin si ». Ligne 7 : « points prend la valeur '
        + 'points + 5 ». Ligne 8 : « afficher points ». On veut UN seul bonus. '
        + 'Exécution : 50 dépasse 40, donc la ligne 3 s’exécute et points passe à '
        + '70 ; la ligne 5 est sautée. Puis la ligne 7, écrite APRÈS le « fin '
        + 'si », s’exécute quand même : points passe à 75. Le programme affiche '
        + '75 au lieu de 70. La ligne fautive est la ligne 7, et il faut la '
        + 'supprimer.',
    },
    {
      type: 'exemple',
      titre: 'Un programme juste, et une valeur de départ à corriger',
      texte:
        'CINQUIÈME PROGRAMME. Ligne 1 : « jetons prend la valeur 0 ». Ligne 2 : '
        + '« répéter 5 fois ». Ligne 3, dans la boucle : « jetons prend la valeur '
        + 'jetons + 4 ». Ligne 4 : « fin répéter ». Ligne 5 : « afficher '
        + 'jetons ». On annonce qu’il affiche 20. Exécution, tour par tour : 4, '
        + '8, 12, 16, 20 — cinq tours, cinq nombres. L’annonce est juste, et il '
        + 'n’y a rien à corriger. Un programme donné à relire n’est pas forcément '
        + 'faux : c’est l’exécution qui tranche, jamais le soupçon.\n'
        + 'SIXIÈME PROGRAMME. Ligne 1 : « n prend la valeur 7 ». Ligne 2 : « si n '
        + '> 10 alors ». Ligne 3 : « n prend la valeur n × 3 ». Ligne 4 : '
        + '« sinon ». Ligne 5 : « n prend la valeur n + 6 ». Ligne 6 : « fin '
        + 'si ». Ligne 7 : « afficher n ». On veut qu’il affiche 33 en ne '
        + 'changeant que la ligne 1. On essaie les deux branches, une à la fois, '
        + 'et on vérifie à chaque fois que la condition désigne bien celle qu’on '
        + 'a utilisée. Branche du « sinon » : la valeur de départ plus 6 vaut 33, '
        + 'donc elle vaut 27 — mais 27 dépasse 10, la condition serait vraie et '
        + 'cette branche ne serait pas prise. Impossible. Branche du « si » : la '
        + 'valeur de départ multipliée par 3 vaut 33, donc elle vaut 11 — et 11 '
        + 'dépasse bien 10, donc la condition est vraie et c’est bien cette '
        + 'branche qui s’exécute. La ligne 1 doit devenir « n prend la valeur '
        + '11 ». Vérification en exécutant : 11 dépasse 10, et 11 × 3 = 33.\n'
        + 'Cette vérification n’est pas une politesse : sans elle, on retient la '
        + 'première valeur qui tombe juste, sans avoir regardé si la branche '
        + 'qu’on vient d’utiliser est celle que le programme prendrait.',
    },
  ],

  methode: {
    titre: 'Trouver la ligne fautive en exécutant à la main',
    enonce:
      'Dans ce jeu, un joueur qui dépasse 25 points gagne un bonus de 10 points ; '
      + 'sinon il en gagne 2. Un seul bonus, jamais les deux. En partant de 30 '
      + 'points, le programme devrait afficher 40, mais il affiche 42. Ligne 1 : '
      + '« points prend la valeur 30 ». Ligne 2 : « si points > 25 alors ». Ligne '
      + '3 : « points prend la valeur points + 10 ». Ligne 4 : « sinon ». Ligne '
      + '5 : « points prend la valeur points + 2 ». Ligne 6 : « fin si ». Ligne '
      + '7 : « points prend la valeur points + 2 ». Ligne 8 : « afficher '
      + 'points ». Quelle ligne faut-il corriger ?',
    etapes: [
      {
        texte: 'J’écris d’abord ce que le programme DOIT afficher : 40, puisque 30 dépasse 25 et qu’un seul bonus s’applique, celui de 10 points.',
        note: 'Sans ce nombre, je cherche une erreur sans savoir à quoi la comparer.',
      },
      {
        texte: 'J’exécute ligne à ligne en notant points après chaque ligne. Ligne 1 : points vaut 30. Ligne 2 : la condition « points > 25 » est vraie.',
        note: 'La condition se calcule avec la valeur du moment, 30 — pas avec celle de la fin.',
      },
      {
        texte: 'La condition est vraie, donc la ligne 3 s’exécute et points vaut 40. La ligne 5 est sautée entièrement : à la ligne 6, points vaut toujours 40.',
        note: 'Une branche et une seule. Jusqu’ici, le programme fait exactement ce qu’on lui demande.',
      },
      {
        texte: 'Ligne 7 : elle est écrite APRÈS le « fin si », donc elle ne fait partie d’aucune branche et s’exécute quand même. points passe à 42, et c’est ce que la ligne 8 affiche.',
        note: 'C’est la première ligne où ma table s’écarte de 40 : c’est elle, la ligne fautive.',
      },
      {
        texte: 'La correction : supprimer la ligne 7. Le bonus de 2 points est déjà prévu par la ligne 5, pour les joueurs qui ne dépassent pas 25 points.',
        note: '',
      },
    ],
    controle:
      'Le contrôle : réexécute le programme corrigé, puis recommence avec une '
      + 'valeur de départ qui prend l’AUTRE branche. Sans la ligne 7 et en '
      + 'partant de 30, on obtient 40 : c’est bien ce qu’on attendait. En partant '
      + 'de 20, la condition « points > 25 » est fausse, la ligne 3 est sautée, '
      + 'la ligne 5 donne 22 — et 22 est bien ce qu’on attend pour un joueur qui '
      + 'n’atteint pas 25 points. Les deux branches sont vérifiées, chacune une '
      + 'fois.\n'
      + 'Une correction qui ne marche que sur la valeur de l’énoncé n’est pas une '
      + 'correction : elle a été devinée, pas trouvée.',
  },

  entrainement: [
    // ── Palier 1 : un seul bogue, et il se voit à l’exécution ──────────────
    {
      // NEUTRE. Aucune instruction conditionnelle dans ce programme : croire que
      // les deux branches d’un « si … sinon » s’exécutent ne peut y produire
      // aucune erreur — et c’est justement ce qui le rend indispensable. Sans
      // lui, « dans ce savoir-faire, le bogue est toujours dans la condition »
      // réussirait souvent et deviendrait la règle apprise.
      id: 'e-17-2-1', type: 'corriger', palier: 1, neutre: true, piege: 'si-et-sinon-tous-deux-executes',
      consigne:
        'Ce programme devrait afficher le nombre de points de Léa après ses deux '
        + 'gains : 7 points, puis 5 points. Il ne peut pas s’exécuter. Trouve la '
        + 'première ligne qu’il est impossible d’exécuter.',
      enonce: '\\text{objectif : afficher le total des points de Léa après ses deux gains}',
      lignes: [
        { texte: 'total prend la valeur 0', fausse: false },
        { texte: 'points prend la valeur points + 7', fausse: true },
        { texte: 'points prend la valeur points + 5', fausse: false },
        { texte: 'afficher points', fausse: false },
      ],
      fausses: [],
      explication:
        'La ligne 1 remplit bien une variable — mais « total », qui ne resservira '
        + 'jamais. Remonte maintenant le programme depuis la ligne 2 : aucune '
        + 'ligne, au-dessus, ne donne de valeur à « points ». On demande donc '
        + '« points + 7 » sans savoir ce que vaut points, et l’exécution s’arrête '
        + 'là. Les lignes 3 et 4 sont justes : elles arriveraient au bon moment '
        + 'si la ligne 2 avait de quoi travailler. Pour corriger, la ligne 1 doit '
        + 'remplir « points » et non « total » ; le programme affiche alors 12.',
    },
    {
      id: 'e-17-2-2', type: 'corriger', palier: 1, piege: 'ordre-des-instructions-ignore',
      consigne:
        'Ce programme doit retirer 15 € au solde, puis lui ajouter 25 €, et '
        + 'afficher le solde une seule fois, tout à la fin. Il affiche 45 au lieu '
        + 'de 70. Trouve la ligne qui n’est pas à sa place.',
      enonce: '\\text{objectif : n’afficher que le solde final}',
      lignes: [
        { texte: 'solde prend la valeur 60', fausse: false },
        { texte: 'solde prend la valeur solde − 15', fausse: false },
        { texte: 'afficher solde', fausse: true },
        { texte: 'solde prend la valeur solde + 25', fausse: false },
      ],
      explication:
        'Exécute avec le doigt, sans sauter de ligne. Ligne 1 : solde vaut 60. '
        + 'Ligne 2 : il vaut 45. Ligne 3 : on affiche 45 — et c’est exact, c’est '
        + 'bien ce que vaut solde à cet instant. Ligne 4 : solde passe à 70, mais '
        + 'plus aucune ligne ne l’affiche.\n'
        + 'Prise une par une, chaque ligne est juste ; c’est leur ORDRE qui ne '
        + 'l’est pas. Les deux opérations sont déjà dans l’ordre demandé — retirer '
        + '15, puis ajouter 25 — donc c’est l’affichage qui arrive trop tôt. La '
        + 'ligne 3 doit passer après la ligne 4, et le programme affiche alors 70.',
    },
    {
      id: 'e-17-2-3', type: 'corriger', palier: 1, piege: 'si-et-sinon-tous-deux-executes',
      consigne:
        'À l’entrée du musée, le tarif baisse de 4 € avant 14 ans, et de 2 € à '
        + 'partir de 14 ans : une seule de ces deux réductions s’applique. Avec '
        + 'un visiteur de 12 ans, ce programme devrait afficher 5, mais il '
        + 'affiche 4. Trouve la ligne fautive.',
      enonce: '\\text{objectif : une réduction, et une seule}',
      lignes: [
        { texte: 'age prend la valeur 12', fausse: false },
        { texte: 'tarif prend la valeur 9', fausse: false },
        { texte: 'si age < 14 alors', fausse: false },
        { texte: '    tarif prend la valeur tarif − 4', fausse: false },
        { texte: 'sinon', fausse: false },
        { texte: '    tarif prend la valeur tarif − 2', fausse: false },
        { texte: 'fin si', fausse: false },
        { texte: 'tarif prend la valeur tarif − 1', fausse: true },
        { texte: 'afficher tarif', fausse: false },
      ],
      explication:
        'Calcule la condition avec la valeur du moment : age vaut 12, donc '
        + '« age < 14 » est vraie. La ligne 4 s’exécute et le tarif passe à 5 € ; '
        + 'la ligne 6 est sautée entièrement — une branche, et une seule. À la '
        + 'ligne 7, le tarif vaut donc 5 €, exactement ce qu’on attendait : tout '
        + 'ce qui précède est juste.\n'
        + 'C’est la ligne 8 qui casse tout. Écrite APRÈS le « fin si », elle ne '
        + 'fait partie d’aucune branche : elle retire 1 € à tout le monde, quel '
        + 'que soit l’âge. Il faut la supprimer.',
    },

    // ── Palier 2 : deux nombres à comparer, celui qui sort et celui qu’on
    //    attend ──────────────────────────────────────────────────────────────
    {
      id: 'e-17-2-4', type: 'trous', palier: 2, piege: 'boucle-comptee-a-un-pres',
      consigne:
        'Chaque semaine, Nour met 5 € dans sa tirelire, et elle le fait pendant '
        + 'six semaines. Ce programme est censé afficher ce qu’elle a économisé. '
        + 'Exécute-le à la main : donne le nombre qu’il affiche, puis le nombre '
        + 'qu’il devrait afficher.',
      programme: [
        'tirelire prend la valeur 0',
        'répéter 4 fois',
        '    tirelire prend la valeur tirelire + 5',
        'fin répéter',
        'afficher tirelire',
      ],
      enonce:
        '\\text{ce que le programme affiche : } \\square \\qquad '
        + '\\text{ce qu’il devrait afficher : } \\square',
      champs: [
        { id: 'a', etiquette: 'le nombre affiché par ce programme', attendu: 20 },
        { id: 'b', etiquette: 'le nombre qu’il devrait afficher', attendu: 30 },
      ],
      fausses: [
        // Un tour de trop : cinq additions au lieu de quatre. « Répéter 4 fois »
        // en exécute exactement quatre, ni une de plus, ni une de moins.
        { valeur: 25, piege: 'boucle-comptee-a-un-pres' },
        // Sept semaines au lieu de six, du côté du nombre attendu.
        { valeur: 35, piege: 'boucle-comptee-a-un-pres' },
        // « tirelire prend la valeur tirelire + 5 » lu comme une égalité qui
        // fixerait tirelire à 5. C’est un ordre : chaque tour repart de la valeur
        // du tour précédent, d’où 5, 10, 15, 20.
        { valeur: 5, piege: 'affectation-lue-comme-egalite' },
      ],
    },
    {
      id: 'e-17-2-5', type: 'corriger', palier: 2, piege: 'boucle-comptee-a-un-pres',
      consigne:
        'Ce programme doit afficher le nombre de marches gravies par Tom : 7 '
        + 'marches à chaque montée, et il monte trois fois. Il affiche 14 au lieu '
        + 'de 21. Trouve la ligne fautive.',
      enonce: '\\text{objectif : sept marches, trois montées}',
      lignes: [
        { texte: 'marches prend la valeur 0', fausse: false },
        { texte: 'répéter 2 fois', fausse: true },
        { texte: '    marches prend la valeur marches + 7', fausse: false },
        { texte: 'fin répéter', fausse: false },
        { texte: 'afficher marches', fausse: false },
      ],
      explication:
        'Numérote les tours. Tour 1 : marches vaut 7. Tour 2 : marches vaut 14, '
        + 'et la boucle s’arrête — « répéter 2 fois », c’est exactement deux '
        + 'tours, ni un de plus, ni un de moins.\n'
        + 'Les autres lignes sont justes : on part bien de 0, on ajoute bien 7 à '
        + 'chaque montée, et l’affichage est bien placé après la boucle. L’écart '
        + 'vaut exactement une montée, donc c’est le nombre de tours qui ne '
        + 'correspond pas à l’énoncé : la ligne 2 doit devenir « répéter 3 fois », '
        + 'et le programme affiche alors 21.',
    },
    {
      // NEUTRE. Aucune boucle dans ce programme : compter les tours à un près y
      // est sans effet. L’item met en jeu tout autre chose — il faut essayer les
      // deux branches, une à la fois, et vérifier que la condition désigne bien
      // celle qu’on a utilisée. Ses trois fausses pointent vers d’AUTRES pièges.
      id: 'e-17-2-6', type: 'calcul', palier: 2, neutre: true, piege: 'boucle-comptee-a-un-pres',
      consigne:
        'Ce programme devrait afficher 8, et il affiche autre chose. On ne '
        + 'corrige que la ligne 1, sans toucher au reste. Quelle valeur faut-il y '
        + 'écrire ?',
      programme: [
        'prix prend la valeur 12',
        'si prix > 15 alors',
        '    prix prend la valeur prix − 4',
        'sinon',
        '    prix prend la valeur prix − 1',
        'fin si',
        'afficher prix',
      ],
      enonce: '\\text{la valeur à écrire à la ligne 1 pour que le programme affiche 8}',
      attendu: 9,
      fausses: [
        // La branche du « si » utilisée sans évaluer la condition : 12 − 4 = 8.
        // Or avec 12, « 12 > 15 » est fausse : c’est la branche du « sinon » qui
        // s’exécute, et le programme afficherait 11.
        { valeur: 12, piege: 'si-et-sinon-tous-deux-executes' },
        // Les deux branches enchaînées : 13 − 4 − 1 = 8. Une seule s’exécute, et
        // avec 13 la condition est fausse : le programme afficherait 12.
        { valeur: 13, piege: 'si-et-sinon-tous-deux-executes' },
        // La valeur voulue recopiée à la ligne 1, comme si les lignes suivantes
        // ne s’exécutaient plus. Elles s’exécutent : 8 ne dépasse pas 15, donc le
        // programme afficherait 7.
        { valeur: 8, piege: 'ordre-des-instructions-ignore' },
      ],
    },
    {
      id: 'e-17-2-7', type: 'plausible', palier: 2, piege: 'si-et-sinon-tous-deux-executes',
      consigne: 'Ce résultat est-il plausible ?',
      programme: [
        'bonus prend la valeur 0',
        'niveau prend la valeur 3',
        'si niveau > 5 alors',
        '    bonus prend la valeur bonus + 20',
        'sinon',
        '    bonus prend la valeur bonus + 10',
        'fin si',
        'afficher bonus',
      ],
      enonce: '\\text{Quelqu’un annonce que ce programme affiche 30.}',
      attendu: false,
      fausses: [
        // Accepter 30, c’est avoir ajouté 20 PUIS 10 : les deux branches.
        { valeur: true, piege: 'si-et-sinon-tous-deux-executes' },
      ],
      explication:
        'Le nombre 30, c’est 0 + 20 + 10 : les deux branches enchaînées. Or une '
        + 'seule s’exécute. Évalue la condition avec la valeur du moment : niveau '
        + 'vaut 3, et 3 ne dépasse pas 5, donc « niveau > 5 » est **fausse**. '
        + 'C’est la ligne 6 qui s’exécute et la ligne 4 qui est sautée '
        + 'entièrement : bonus passe à 10, et le programme affiche **10**.',
    },

    // ── Palier 3 : juger un programme entier, et réfuter ───────────────────
    {
      // NEUTRE, et le plus important des trois : ce programme est JUSTE, et il
      // n’y a rien à corriger. Aucune condition dedans, donc le piège du
      // savoir-faire ne peut pas produire l’erreur. Sans cet item, « on me donne
      // un programme à relire, donc il est faux » suffirait à traverser tout le
      // lot — l’erreur symétrique de celle qu’on combat. Sa fausse pointe vers un
      // AUTRE piège.
      id: 'e-17-2-8', type: 'plausible', palier: 3, neutre: true, piege: 'si-et-sinon-tous-deux-executes',
      consigne: 'Ce résultat est-il plausible ?',
      programme: [
        'mots prend la valeur 0',
        'répéter 5 fois',
        '    mots prend la valeur mots + 2',
        'fin répéter',
        'afficher mots',
      ],
      enonce: '\\text{Quelqu’un annonce que ce programme affiche 10.}',
      attendu: true,
      fausses: [
        // Refuser 10, c’est presque toujours s’être arrêté au quatrième tour (8)
        // ou en avoir compté un sixième (12).
        { valeur: false, piege: 'boucle-comptee-a-un-pres' },
      ],
      explication:
        'Numérote les tours et écris la valeur à la fin de chacun : 2, 4, 6, 8, '
        + '10. Cinq tours, cinq nombres, et le dernier est **10** — l’annonce est '
        + 'juste, et il n’y a rien à corriger.\n'
        + 'Un programme donné à relire n’est pas forcément faux : c’est '
        + 'l’exécution qui tranche, jamais le soupçon. Répondre « pas plausible » '
        + 'ici, c’est le plus souvent s’être arrêté au quatrième tour, ou en avoir '
        + 'compté un sixième.',
    },
    {
      id: 'e-17-2-9', type: 'corriger', palier: 3, piege: 'variable-non-initialisee',
      consigne:
        'Ce programme doit compter les jetons gagnés : on part de zéro et on en '
        + 'ajoute 6 à chaque tour, trois tours de suite. Il ne peut pas '
        + 's’exécuter. Trouve la première ligne qu’il est impossible d’exécuter.',
      enonce: '\\text{objectif : trois tours, six jetons par tour}',
      lignes: [
        { texte: 'répéter 3 fois', fausse: false },
        { texte: '    jetons prend la valeur jetons + 6', fausse: true },
        { texte: 'fin répéter', fausse: false },
        { texte: 'afficher jetons', fausse: false },
      ],
      explication:
        'La ligne 1 s’exécute sans problème : elle annonce trois tours. C’est au '
        + 'premier tour que tout s’arrête. Remonte le programme depuis la ligne '
        + '2 : aucune ligne, au-dessus, ne donne de valeur à « jetons ». On ne '
        + 'peut donc pas calculer « jetons + 6 ».\n'
        + 'La boucle est bonne, l’affichage aussi. Ce qui manque, c’est une ligne '
        + '« jetons prend la valeur 0 » placée AVANT la ligne 1 : une variable ne '
        + 'vaut pas zéro par défaut, il faut l’écrire. Le programme affiche alors '
        + '18.',
    },
    {
      id: 'e-17-2-10', type: 'vraifaux', palier: 3, piege: 'si-et-sinon-tous-deux-executes',
      consigne: 'Vrai ou faux ? Si c’est faux, donne un contre-exemple.',
      affirmation:
        'Dans un « si … sinon … », les deux blocs finissent par s’exécuter : '
        + 'celui du « si » d’abord, celui du « sinon » ensuite.',
      attendu: false,
      contreExemple: {
        // On ne demande pas de réciter « une seule branche s’exécute » : on fait
        // CALCULER les deux nombres, celui que le programme sort vraiment et
        // celui qu’on obtiendrait en enchaînant les deux blocs. L’élève écrit
        // lui-même 16 et 116, et l’écart de 100 rend la différence indiscutable.
        invite:
          'Voici un programme de sept lignes. Ligne 1 : « n prend la valeur 6 ». '
          + 'Ligne 2 : « si n > 4 alors ». Ligne 3 : « n prend la valeur n + 10 ». '
          + 'Ligne 4 : « sinon ». Ligne 5 : « n prend la valeur n + 100 ». Ligne '
          + '6 : « fin si ». Ligne 7 : « afficher n ». Donne le nombre que ce '
          + 'programme affiche réellement, puis celui qu’il afficherait si les '
          + 'deux blocs s’exécutaient l’un après l’autre.',
        champs: [
          { id: 'a', etiquette: 'le nombre réellement affiché' },
          { id: 'b', etiquette: 'le nombre qu’on obtiendrait avec les deux blocs' },
        ],
        valide: (a, b) => Math.abs(a - 16) < 1e-9 && Math.abs(b - 116) < 1e-9,
        temoin: [16, 116],
        exemple:
          'n vaut 6, et « n > 4 » est vraie : la ligne 3 s’exécute, n passe à 16, '
          + 'et la ligne 5 est sautée entièrement. Le programme affiche 16. Si les '
          + 'deux blocs s’exécutaient l’un après l’autre, on aurait 6 + 10 = 16, '
          + 'puis 16 + 100 = 116 : le programme afficherait 116. Les deux nombres '
          + 'diffèrent de 100, et c’est bien 16 qui sort. Une seule branche '
          + 's’exécute ; l’autre est sautée comme si elle n’était pas écrite.',
      },
    },
  ],

  problemes: [
    {
      // Les deux premières questions font écrire les deux nombres qui comptent —
      // celui qui sort, celui qu’on attend — avant que la troisième ne demande la
      // ligne. L’élève ne récite pas la méthode, il la déroule.
      id: 'p-17-2-1',
      enonce:
        'Ce programme doit afficher le nombre de billes de Sacha. Il part de zéro '
        + 'bille, en gagne 8 à chaque partie, et il joue cinq parties.',
      programme: [
        'billes prend la valeur 0',
        'répéter 3 fois',
        '    billes prend la valeur billes + 8',
        'fin répéter',
        'afficher billes',
      ],
      questions: [
        { texte: 'Quel nombre ce programme affiche-t-il tel qu’il est écrit ?', attendu: 24, unite: 'billes' },
        { texte: 'Quel nombre devrait-il afficher ?', attendu: 40, unite: 'billes' },
        { texte: 'Donne le numéro de la ligne à corriger.', attendu: 2 },
      ],
    },
    {
      // La ligne en trop est écrite exactement comme celle du « sinon » : c’est
      // le retrait, et lui seul, qui les distingue. Le listing d’un problème est
      // affiché dans un bloc à chasse fixe, où le décalage se voit.
      id: 'p-17-2-2',
      enonce:
        'Dans ce club, la cotisation baisse de 12 € pour les moins de 15 ans, et '
        + 'de 5 € pour les autres : une seule de ces deux réductions s’applique. '
        + 'Le programme calcule la cotisation d’un adhérent de 11 ans.',
      programme: [
        'age prend la valeur 11',
        'cotisation prend la valeur 60',
        'si age < 15 alors',
        '    cotisation prend la valeur cotisation − 12',
        'sinon',
        '    cotisation prend la valeur cotisation − 5',
        'fin si',
        'cotisation prend la valeur cotisation − 5',
        'afficher cotisation',
      ],
      questions: [
        { texte: 'Quel nombre ce programme affiche-t-il tel qu’il est écrit ?', attendu: 43, unite: '€' },
        { texte: 'Quel nombre devrait-il afficher ?', attendu: 48, unite: '€' },
        { texte: 'Donne le numéro de la ligne à supprimer.', attendu: 8 },
      ],
    },
    {
      // Ici le programme ne s’exécute pas du tout : la première question fait
      // donc dire OÙ il s’arrête, et les deux suivantes construisent la
      // correction avant de la faire tourner.
      id: 'p-17-2-3',
      enonce:
        'Ce programme doit compter les cartes d’un jeu : on ajoute 9 cartes à '
        + 'chaque paquet ouvert, et on ouvre quatre paquets. Tel qu’il est écrit, '
        + 'il ne peut pas s’exécuter.',
      programme: [
        'répéter 4 fois',
        '    cartes prend la valeur cartes + 9',
        'fin répéter',
        'afficher cartes',
      ],
      questions: [
        { texte: 'À quelle ligne l’exécution s’arrête-t-elle ?', attendu: 2 },
        { texte: 'On ajoute avant la boucle une ligne « cartes prend la valeur … ». Quelle valeur faut-il y écrire ?', attendu: 0, unite: 'cartes' },
        { texte: 'Une fois cette ligne ajoutée, quel nombre le programme affiche-t-il ?', attendu: 36, unite: 'cartes' },
      ],
    },
    {
      id: 'p-17-2-4',
      enonce:
        'Ce programme doit calculer le prix d’un vélo : on retire d’abord une '
        + 'remise de 40 €, puis on ajoute 25 € de frais de montage, et on '
        + 'n’affiche que le prix final.',
      programme: [
        'prix prend la valeur 300',
        'prix prend la valeur prix − 40',
        'afficher prix',
        'prix prend la valeur prix + 25',
      ],
      questions: [
        { texte: 'Quel nombre ce programme affiche-t-il tel qu’il est écrit ?', attendu: 260, unite: '€' },
        { texte: 'Quel nombre devrait-il afficher ?', attendu: 285, unite: '€' },
        { texte: 'À quel numéro de ligne la ligne « afficher prix » doit-elle se trouver ?', attendu: 4 },
      ],
    },
    {
      // La condition est écrite à l’envers : le programme tourne sans broncher et
      // ne fait rien. C’est le bogue le plus discret des cinq problèmes, et le
      // seul moyen de le voir est de comparer la condition à la phrase de
      // l’énoncé.
      id: 'p-17-2-5',
      enonce:
        'À la piscine, l’entrée coûte 3 € de moins pour les nageurs de moins de '
        + '16 ans ; les autres paient le plein tarif, qui est de 7 €. Le '
        + 'programme calcule l’entrée d’un nageur de 13 ans.',
      programme: [
        'age prend la valeur 13',
        'entree prend la valeur 7',
        'si age > 16 alors',
        '    entree prend la valeur entree − 3',
        'fin si',
        'afficher entree',
      ],
      questions: [
        { texte: 'Quel nombre ce programme affiche-t-il tel qu’il est écrit ?', attendu: 7, unite: '€' },
        { texte: 'Quel nombre devrait-il afficher ?', attendu: 4, unite: '€' },
        { texte: 'Donne le numéro de la ligne à corriger.', attendu: 3 },
      ],
    },
  ],

  test: [
    {
      id: 't-17-2-1', type: 'corriger',
      consigne:
        'Ce programme devrait afficher le nombre de livres lus par Iris : 3 '
        + 'livres, puis 4 de plus. Il ne peut pas s’exécuter. Trouve la première '
        + 'ligne qu’il est impossible d’exécuter.',
      enonce: '\\text{objectif : afficher le total des livres lus par Iris}',
      lignes: [
        { texte: 'livres prend la valeur livres + 3', fausse: true },
        { texte: 'livres prend la valeur livres + 4', fausse: false },
        { texte: 'afficher livres', fausse: false },
      ],
      explication:
        'Remonte le programme depuis la ligne 1 : il n’y a rien au-dessus, donc '
        + 'aucune ligne n’a donné de valeur à « livres ». On demande pourtant '
        + '« livres + 3 », et l’exécution s’arrête aussitôt. Une variable ne vaut '
        + 'pas zéro par défaut : il manque, tout en haut, une ligne « livres prend '
        + 'la valeur 0 ». Le programme affiche alors 7.',
      piege: 'variable-non-initialisee', revoir: 'remarque',
    },
    {
      id: 't-17-2-2', type: 'corriger',
      consigne:
        'Ce programme doit ajouter 30 points au score, puis en retirer 12, et '
        + 'afficher le score une seule fois, tout à la fin. Il affiche 110 au '
        + 'lieu de 98. Trouve la ligne qui n’est pas à sa place.',
      enonce: '\\text{objectif : n’afficher que le score final}',
      lignes: [
        { texte: 'score prend la valeur 80', fausse: false },
        { texte: 'score prend la valeur score + 30', fausse: false },
        { texte: 'afficher score', fausse: true },
        { texte: 'score prend la valeur score − 12', fausse: false },
      ],
      explication:
        'Ligne 1 : score vaut 80. Ligne 2 : il vaut 110. Ligne 3 : on affiche 110, '
        + 'et c’est bien ce que score vaut à cet instant. Ligne 4 : score passe à '
        + '98, mais plus aucune ligne ne l’affiche. Les deux opérations sont déjà '
        + 'dans l’ordre demandé ; c’est l’affichage qui arrive trop tôt. La ligne '
        + '3 doit passer après la ligne 4, et le programme affiche alors 98.',
      piege: 'ordre-des-instructions-ignore', revoir: 'propriete',
    },
    {
      id: 't-17-2-3', type: 'corriger',
      consigne:
        'Au cinéma, la place coûte 3 € de moins avant 12 ans, et 1 € de moins à '
        + 'partir de 12 ans : une seule de ces deux réductions s’applique. Avec '
        + 'un spectateur de 9 ans, ce programme devrait afficher 8, mais il '
        + 'affiche 6. Trouve la ligne fautive.',
      enonce: '\\text{objectif : une réduction, et une seule}',
      lignes: [
        { texte: 'age prend la valeur 9', fausse: false },
        { texte: 'place prend la valeur 11', fausse: false },
        { texte: 'si age < 12 alors', fausse: false },
        { texte: '    place prend la valeur place − 3', fausse: false },
        { texte: 'sinon', fausse: false },
        { texte: '    place prend la valeur place − 1', fausse: false },
        { texte: 'fin si', fausse: false },
        { texte: 'place prend la valeur place − 2', fausse: true },
        { texte: 'afficher place', fausse: false },
      ],
      explication:
        'age vaut 9, donc « age < 12 » est vraie : la ligne 4 s’exécute, la place '
        + 'passe à 8 €, et la ligne 6 est sautée entièrement. À la ligne 7, le '
        + 'compte est exactement celui qu’on attendait. C’est la ligne 8 qui '
        + 'casse : écrite après le « fin si », elle ne fait partie d’aucune '
        + 'branche et retire 2 € à tout le monde. Il faut la supprimer.',
      piege: 'si-et-sinon-tous-deux-executes', revoir: 'remarque',
    },
    {
      id: 't-17-2-4', type: 'corriger',
      consigne:
        'Ce programme doit afficher la distance parcourue par Yanis : 6 km à '
        + 'chaque sortie, et il fait cinq sorties. Il affiche 36 au lieu de 30. '
        + 'Trouve la ligne fautive.',
      enonce: '\\text{objectif : cinq sorties de six kilomètres}',
      lignes: [
        { texte: 'distance prend la valeur 0', fausse: false },
        { texte: 'répéter 6 fois', fausse: true },
        { texte: '    distance prend la valeur distance + 6', fausse: false },
        { texte: 'fin répéter', fausse: false },
        { texte: 'afficher distance', fausse: false },
      ],
      explication:
        'Numérote les tours : 6, 12, 18, 24, 30, 36. Six tours, six nombres — et '
        + 'l’énoncé n’en demande que cinq. On part bien de 0 et on ajoute bien 6 à '
        + 'chaque sortie : c’est le nombre écrit dans « répéter … fois » qui ne '
        + 'correspond pas. La ligne 2 doit devenir « répéter 5 fois », et le '
        + 'programme affiche alors 30.',
      piege: 'boucle-comptee-a-un-pres', revoir: 'remarque',
    },
    {
      id: 't-17-2-5', type: 'trous',
      consigne:
        'Chaque mois, Adam ajoute 12 photos à son album, pendant sept mois. Ce '
        + 'programme est censé afficher le nombre de photos. Donne le nombre '
        + 'qu’il affiche, puis le nombre qu’il devrait afficher.',
      programme: [
        'photos prend la valeur 0',
        'répéter 5 fois',
        '    photos prend la valeur photos + 12',
        'fin répéter',
        'afficher photos',
      ],
      enonce:
        '\\text{ce que le programme affiche : } \\square \\qquad '
        + '\\text{ce qu’il devrait afficher : } \\square',
      champs: [
        { id: 'a', etiquette: 'le nombre affiché par ce programme', attendu: 60 },
        { id: 'b', etiquette: 'le nombre qu’il devrait afficher', attendu: 84 },
      ],
      fausses: [
        { valeur: 72, piege: 'boucle-comptee-a-un-pres' },
        { valeur: 96, piege: 'boucle-comptee-a-un-pres' },
        { valeur: 12, piege: 'affectation-lue-comme-egalite' },
      ],
      piege: 'boucle-comptee-a-un-pres', revoir: 'exemple',
    },
    {
      id: 't-17-2-6', type: 'calcul',
      consigne:
        'Ce programme devrait afficher 30, et il affiche autre chose. On ne '
        + 'corrige que la ligne 1, sans toucher au reste. Quelle valeur faut-il y '
        + 'écrire ?',
      programme: [
        'n prend la valeur 5',
        'si n > 9 alors',
        '    n prend la valeur n × 3',
        'sinon',
        '    n prend la valeur n + 6',
        'fin si',
        'afficher n',
      ],
      enonce: '\\text{la valeur à écrire à la ligne 1 pour que le programme affiche 30}',
      attendu: 10,
      fausses: [
        // La branche du « sinon » utilisée sans évaluer la condition :
        // 24 + 6 = 30. Or 24 dépasse 9 : c’est la branche du « si » qui
        // s’exécuterait, et le programme afficherait 72.
        { valeur: 24, piege: 'si-et-sinon-tous-deux-executes' },
        // Les deux branches enchaînées : 8 × 3 = 24, puis 24 + 6 = 30. Une seule
        // s’exécute, et 8 ne dépasse pas 9 : le programme afficherait 14.
        { valeur: 8, piege: 'si-et-sinon-tous-deux-executes' },
        // La valeur voulue recopiée à la ligne 1 : les lignes suivantes
        // s’exécutent quand même, et 30 dépasse 9, donc le programme afficherait
        // 90.
        { valeur: 30, piege: 'ordre-des-instructions-ignore' },
      ],
      piege: 'si-et-sinon-tous-deux-executes', revoir: 'exemple',
    },
    {
      id: 't-17-2-7', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      programme: [
        'gain prend la valeur 0',
        'temps prend la valeur 20',
        'si temps < 15 alors',
        '    gain prend la valeur gain + 50',
        'sinon',
        '    gain prend la valeur gain + 8',
        'fin si',
        'afficher gain',
      ],
      enonce: '\\text{Quelqu’un annonce que ce programme affiche 58.}',
      attendu: false,
      fausses: [
        { valeur: true, piege: 'si-et-sinon-tous-deux-executes' },
      ],
      explication:
        'Le nombre 58, c’est 0 + 50 + 8 : les deux branches enchaînées. Évalue la '
        + 'condition avec la valeur du moment : temps vaut 20, donc '
        + '« temps < 15 » est fausse. C’est la ligne 6 qui s’exécute et la ligne 4 '
        + 'qui est sautée entièrement : gain passe à 8, et le programme affiche 8.',
      piege: 'si-et-sinon-tous-deux-executes', revoir: 'remarque',
    },
    {
      // Le seul « plausible » vrai de l’auto-évaluation : le programme est juste,
      // et il n’y a rien à corriger. Sans lui, « on me donne un programme à
      // relire, donc il est faux » suffirait.
      id: 't-17-2-8', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      programme: [
        'cases prend la valeur 0',
        'répéter 7 fois',
        '    cases prend la valeur cases + 3',
        'fin répéter',
        'afficher cases',
      ],
      enonce: '\\text{Quelqu’un annonce que ce programme affiche 21.}',
      attendu: true,
      fausses: [
        { valeur: false, piege: 'boucle-comptee-a-un-pres' },
      ],
      explication:
        'Numérote les tours et note la valeur à la fin de chacun : 3, 6, 9, 12, '
        + '15, 18, 21. Sept tours, sept nombres, et le dernier est 21 : l’annonce '
        + 'est juste, il n’y a rien à corriger. Répondre « pas plausible » ici, '
        + 'c’est presque toujours s’être arrêté au sixième tour, ou en avoir '
        + 'compté un huitième.',
      piege: 'boucle-comptee-a-un-pres', revoir: 'definition',
    },
    {
      // La condition est écrite à l’envers. Le « sinon » n’est pas décoratif :
      // sans lui, le piège nommé — les DEUX branches exécutées — n’aurait aucune
      // seconde branche à exécuter, et la règle servie à l’élève qui se trompe
      // parlerait d’un « sinon » absent du programme sous ses yeux.
      id: 't-17-2-9', type: 'corriger',
      consigne:
        'À la médiathèque, l’abonnement baisse de 2 € avant 18 ans, et de 1 € à '
        + 'partir de 18 ans : une seule de ces deux réductions s’applique. Avec '
        + 'un abonné de 14 ans, ce programme devrait afficher 13, mais il '
        + 'affiche 14. Trouve la ligne fautive.',
      enonce: '\\text{objectif : la réduction pour les moins de 18 ans}',
      lignes: [
        { texte: 'age prend la valeur 14', fausse: false },
        { texte: 'abonnement prend la valeur 15', fausse: false },
        { texte: 'si age > 18 alors', fausse: true },
        { texte: '    abonnement prend la valeur abonnement − 2', fausse: false },
        { texte: 'sinon', fausse: false },
        { texte: '    abonnement prend la valeur abonnement − 1', fausse: false },
        { texte: 'fin si', fausse: false },
        { texte: 'afficher abonnement', fausse: false },
      ],
      explication:
        'Calcule la condition avec la valeur du moment : age vaut 14, et '
        + '« age > 18 » est fausse. C’est donc la ligne 6 qui s’exécute et la '
        + 'ligne 4 qui est sautée entièrement : l’abonnement tombe à 14 €, alors '
        + 'qu’un abonné de 14 ans a droit à la réduction de 2 €. Prises une à '
        + 'une, les lignes 1, 2, 4 et 6 sont justes : c’est la condition de la '
        + 'ligne 3 qui ne dit pas ce que dit l’énoncé. La médiathèque fait la '
        + 'réduction de 2 € aux MOINS de 18 ans, donc la ligne 3 doit devenir '
        + '« si age < 18 alors ». Le programme affiche alors 13.',
      piege: 'si-et-sinon-tous-deux-executes', revoir: 'remarque',
    },
    {
      id: 't-17-2-10', type: 'corriger',
      consigne:
        'Ce programme doit afficher le nombre de graines semées : 4 graines à '
        + 'chaque rangée, et il y a trois rangées. Il ne peut pas s’exécuter. '
        + 'Trouve la première ligne qu’il est impossible d’exécuter.',
      enonce: '\\text{objectif : trois rangées de quatre graines}',
      lignes: [
        { texte: 'répéter 3 fois', fausse: false },
        { texte: '    graines prend la valeur graines + 4', fausse: true },
        { texte: 'fin répéter', fausse: false },
        { texte: 'graines prend la valeur 0', fausse: false },
        { texte: 'afficher graines', fausse: false },
      ],
      explication:
        'La ligne 4 donne bien une valeur à « graines » — mais elle arrive APRÈS '
        + 'la boucle. Les instructions s’exécutent de haut en bas, et une ligne '
        + 'n’agit que sur ce qui vient après elle. Au premier tour, à la ligne 2, '
        + '« graines » n’a donc encore reçu aucune valeur, et l’exécution s’arrête '
        + 'là. Il faut déplacer la ligne 4 tout en haut, avant la ligne 1 ; le '
        + 'programme affiche alors 12.',
      piege: 'ordre-des-instructions-ignore', revoir: 'propriete',
    },
  ],
};
