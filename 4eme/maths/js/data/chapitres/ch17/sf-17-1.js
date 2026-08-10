// Chapitre 17, savoir-faire 1 — Lire et comprendre un programme.
//
// ── Le geste est une SIMULATION, pas une lecture ──────────────────────────
//
// Un élève de 4e sait lire un programme au sens où il en comprend chaque ligne
// isolément. Ce qu'il ne fait pas spontanément, c'est l'EXÉCUTER : suivre les
// lignes dans l'ordre en notant, à chaque étape, ce que vaut la variable. Une
// expression mathématique est vraie une fois pour toutes ; une variable, elle,
// vaut des choses différentes selon le moment où on la regarde, et rien dans le
// reste du programme de 4e ne prépare à ça.
//
// Tout le savoir-faire tient donc à un seul outil, la TABLE DE SUIVI — une
// ligne par instruction exécutée, une colonne par variable. Elle est énoncée
// dans le cours (bloc « remarque »), déroulée dans la méthode, et c'est elle
// que rappellent les gestes de contrôle de trois des cinq pièges du chapitre —
// affectation lue comme égalité, ordre ignoré, boucle comptée à un près. Les
// deux autres envoient d'abord chercher ailleurs : la ligne qui donne sa valeur
// à la variable, et la condition à évaluer.
//
// ── Six paires de programmes jumeaux ──────────────────────────────────────
//
// L'ordre des instructions ne se voit pas : on ne peut que le CONSTATER. Quatre
// endroits présentent donc deux programmes faits exactement des mêmes lignes,
// rangées autrement, et qui n'affichent pas la même chose — la découverte
// (14 et 11), e-17-1-3 (26 et 44), e-17-1-6 (170 et 35, avec une boucle qui
// change de place) et p-17-1-2 (5 et 11). Deux autres endroits refont la
// mesure : le contre-exemple de e-17-1-10, où c'est la ligne « afficher » qui
// bouge (15 et 3), et t-17-1-2 en auto-évaluation (30 et 84).
//
// Dans les exercices, l'affichage du premier programme est DONNÉ : l'élève n'a
// qu'un programme à exécuter, et la seule question est de savoir s'il ose
// répondre autre chose que le nombre qu'on vient de lui écrire. C'est ce que
// mesure la réponse fausse égale à l'affichage du jumeau.
//
// ── Les trois items neutres, et ce que chacun casse ───────────────────────
//
// e-17-1-1 ne contient aucune boucle : compter les tours à un près ne peut pas
// y produire d'erreur. Sans lui, « dans ce savoir-faire on multiplie par le
// nombre de tours » traverserait le lot entier. Ses trois fausses pointent vers
// d'AUTRES pièges.
//
// e-17-1-2 est le plus important des trois : ses deux instructions sont deux
// additions, donc les échanger ne change rien au résultat. Un élève qui ignore
// l'ordre y répond juste. Sans cet item, « l'ordre change toujours le
// résultat » deviendrait la règle apprise — l'erreur symétrique de celle qu'on
// combat, et tout aussi coûteuse : l'ordre se vérifie, il ne se suppose pas.
//
// e-17-1-5 a une boucle, mais son bloc écrit une constante dans la variable :
// quatre, cinq ou six tours donnent le même 7. Compter les tours à un près y
// est sans effet, et ce que l'item met à l'épreuve est ailleurs — « prend la
// valeur » écrase, il n'ajoute pas.
//
// ── Ce que ce savoir-faire n'a pas ────────────────────────────────────────
//
// Niveaux 1 et 2 de fin de 4e : variable, boucle bornée, instruction
// conditionnelle. Pas de « tant que » non bornée, pas de fonction ni de
// procédure, pas de liste, pas de récursivité. Aucun programme ne dépasse dix
// lignes, et t-17-1-10 est le seul à en avoir dix.
//
// Toutes les valeurs d'entrée sont écrites dans le programme : aucune variable
// n'est lue avant d'avoir reçu une valeur, aucun « afficher » ne laisse planer
// de doute sur ce qui est affiché, et le retrait est écrit partout où il porte
// une information — quatre espaces, jamais de tabulation. Les résultats sont
// tous entiers, et chacun a été obtenu en déroulant le programme à la main.
//
// Écrire un programme, le corriger ou le compléter n'est pas ici : ce
// savoir-faire ne demande qu'une chose, dire ce qu'un programme donné produit.

export default {
  id: 'sf-17-1',
  titre: 'Lire et comprendre un programme',
  attendus: [
    'Il exécute pas à pas un programme comportant des variables, une boucle bornée et une instruction conditionnelle.',
    'Il détermine ce qu’affiche un programme donné, ou la valeur d’une variable à la fin de son exécution.',
  ],

  // On ne dit pas « l’ordre compte » : on donne deux programmes faits des mêmes
  // quatre lignes, et c’est l’élève qui trouve deux nombres différents là où il
  // n’attendait rien de particulier.
  decouvrir: {
    titre: 'Les mêmes lignes, deux nombres différents',
    texte:
      'Voici deux programmes. Regarde-les bien avant de calculer : ils sont '
      + 'faits exactement des mêmes quatre lignes, et seul l’ordre de ces lignes '
      + 'change. Exécute chacun d’eux ligne par ligne, en notant à chaque fois '
      + 'ce que vaut n.',
    programme: [
      'Programme A',
      'n prend la valeur 4',
      'n prend la valeur n + 3',
      'n prend la valeur n × 2',
      'afficher n',
      '',
      'Programme B',
      'n prend la valeur 4',
      'n prend la valeur n × 2',
      'n prend la valeur n + 3',
      'afficher n',
    ],
    question: 'Qu’affiche le programme A ? Et le programme B ?',
    champs: [
      { id: 'a', etiquette: 'le programme A affiche', attendu: 14 },
      { id: 'b', etiquette: 'le programme B affiche', attendu: 11 },
    ],
    conclusion:
      'Le programme A donne 4, puis 4 + 3 = **7**, puis 7 × 2 = **14**.\n'
      + 'Le programme B donne 4, puis 4 × 2 = **8**, puis 8 + 3 = **11**.\n'
      + 'Mêmes lignes, mêmes nombres, même variable — et pourtant **14** d’un '
      + 'côté, **11** de l’autre.\n'
      + 'Ce n’est pas une bizarrerie : un programme s’exécute **dans le temps**. '
      + 'Chaque ligne travaille sur ce que la variable vaut À CE MOMENT-LÀ, et '
      + 'pas sur ce qu’elle valait au départ. Déplacer une ligne change donc '
      + 'tout ce qui vient après elle. C’est pour ça qu’on ne lit pas un '
      + 'programme : on l’exécute, une ligne après l’autre, en notant les '
      + 'valeurs au fur et à mesure.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Une variable, et l’instruction qui la remplit',
      texte:
        'Une **variable** est une case qui porte un nom et qui contient un '
        + 'nombre.\n'
        + '« n prend la valeur 4 » range 4 dans la case n, et **efface** ce '
        + 'qu’elle contenait avant. On appelle cette instruction une '
        + '**affectation**.\n'
        + '« n prend la valeur n + 3 » n’est pas une équation, c’est un ordre : '
        + 'on calcule d’abord n + 3 avec la valeur que n contient à cet '
        + 'instant, puis on range le résultat dans n. Le n de droite est '
        + 'l’ancien, celui de gauche est le nouveau — ils ne coexistent jamais.',
    },
    {
      type: 'propriete',
      titre: 'Les instructions s’exécutent dans l’ordre où elles sont écrites',
      texte:
        'Un programme s’exécute **une ligne après l’autre, de haut en bas**. '
        + 'Aucune ligne n’est sautée, et aucune n’attend son tour.\n'
        + 'Conséquence directe : deux programmes faits exactement des mêmes '
        + 'lignes rangées dans un autre ordre **peuvent afficher deux nombres '
        + 'différents**. Déplacer une instruction change la valeur que voient '
        + 'toutes celles qui la suivent.\n'
        + 'Attention à la règle inverse, fausse elle aussi : changer l’ordre ne '
        + 'change pas TOUJOURS le résultat. Échanger « x prend la valeur x + 1 » '
        + 'et « x prend la valeur x + 4 » donne le même nombre des deux côtés. '
        + 'On ne suppose donc rien, ni dans un sens ni dans l’autre : on exécute '
        + 'les deux programmes, et on compare.\n'
        + 'Attention aussi : ce n’est pas un calcul unique où les multiplications '
        + 'passeraient avant les additions. Chaque ligne est un ordre séparé, et '
        + 'c’est la place de la ligne qui décide, pas la priorité des '
        + 'opérations.',
    },
    {
      type: 'propriete',
      titre: '« répéter … fois » : le bloc s’exécute exactement ce nombre de fois',
      texte:
        '« répéter 5 fois » exécute le bloc **exactement 5 fois** : ni 4, ni 6. '
        + 'La valeur de départ n’est pas un tour, c’est ce qu’il y a AVANT le '
        + 'premier.\n'
        + 'Le **retrait** dit ce qui est dans la boucle : les lignes décalées '
        + 'vers la droite sont répétées, celles qui reviennent à gauche après '
        + '« fin répéter » viennent après le dernier tour et ne s’exécutent '
        + 'qu’une seule fois.\n'
        + 'Un « afficher » placé DANS la boucle affiche donc un nombre à chaque '
        + 'tour ; placé APRÈS, il n’en affiche qu’un.',
    },
    {
      type: 'propriete',
      titre: '« si … alors … sinon … » : une seule branche s’exécute',
      texte:
        'On évalue d’abord la **condition**, avec les valeurs que les variables '
        + 'ont à cet instant. Sa réponse désigne une branche, et l’autre est '
        + 'sautée entièrement, comme si elle n’était pas écrite.\n'
        + 'Condition vraie : la branche du **si**. Condition fausse : la branche '
        + 'du **sinon**. Jamais les deux, jamais aucune.\n'
        + 'Là encore le retrait porte l’information : les lignes décalées sous '
        + '« si … alors » forment la première branche, celles décalées sous '
        + '« sinon » la seconde, et ce qui revient à gauche après « fin si » '
        + 's’exécute dans tous les cas.',
    },
    {
      type: 'remarque',
      titre: 'La table de suivi : le seul geste à retenir',
      texte:
        'Ne lis pas le programme, **exécute-le** — avec le doigt, une ligne à '
        + 'la fois.\n'
        + 'Dessine une colonne par variable, et écris une nouvelle valeur à '
        + 'chaque fois qu’une affectation la modifie. Pour une boucle, numérote '
        + 'les tours 1, 2, 3… et écris la valeur à la fin de chacun.\n'
        + 'C’est ce qui empêche de confondre ce que la variable vaut et ce '
        + 'qu’elle valait, et c’est le seul moyen sûr de ne sauter aucune '
        + 'ligne — même celles qui semblent sans effet.',
    },
    {
      type: 'exemple',
      titre: 'Suivre une suite d’affectations',
      texte:
        'Le programme « x prend la valeur 6 », puis « x prend la valeur '
        + 'x + 5 », puis « x prend la valeur x × 4 », puis « afficher x » : la '
        + 'table de suivi donne 6, puis 6 + 5 = 11, puis 11 × 4 = 44. Il '
        + 'affiche 44. Remarque bien la troisième ligne : on multiplie 11 par 4, '
        + 'pas 6 par 4 — le 6 a été écrasé par le 11.\n'
        + 'Le programme « x prend la valeur 6 », puis « x prend la valeur '
        + 'x × 4 », puis « x prend la valeur x + 5 », puis « afficher x » est '
        + 'fait des mêmes quatre lignes, rangées autrement : 6, puis '
        + '6 × 4 = 24, puis 24 + 5 = 29. Il affiche 29, et non 44.',
    },
    {
      type: 'exemple',
      titre: 'Compter les tours d’une boucle',
      texte:
        'Le programme « c prend la valeur 0 », puis « répéter 5 fois » avec, '
        + 'dans la boucle, « c prend la valeur c + 3 », puis « afficher c » '
        + 'après la boucle : les cinq tours donnent 3, 6, 9, 12, 15. Il affiche '
        + '15, une seule fois, à la fin. Le 0 du départ n’est pas un tour.\n'
        + 'Le programme « u prend la valeur 2 », puis « répéter 3 fois » avec, '
        + 'dans la boucle, « u prend la valeur u × 5 », puis « afficher u » '
        + 'après la boucle : les trois tours donnent 10, puis 50, puis 250. Il '
        + 'affiche 250. Si l’on comptait un tour de trop on annoncerait 1 250, '
        + 'et un tour de moins 50 : d’où les tours numérotés.',
    },
    {
      type: 'exemple',
      titre: 'Choisir une branche',
      texte:
        'Le programme « t prend la valeur 18 », puis « si t > 20 alors » avec '
        + '« t prend la valeur t + 100 », « sinon » avec « t prend la valeur '
        + 't + 1 », puis « afficher t » : on évalue d’abord la condition, et 18 '
        + 'n’est pas plus grand que 20. C’est donc la branche du sinon qui '
        + 's’exécute, et elle seule : le programme affiche 19. La ligne '
        + '« t prend la valeur t + 100 » est sautée entièrement.\n'
        + 'Le même programme avec « t prend la valeur 25 » à la première ligne : '
        + '25 est plus grand que 20, donc la condition est vraie. C’est la '
        + 'branche du si qui s’exécute, et le programme affiche 125. Une seule '
        + 'des deux branches est prise à chaque exécution.',
    },
  ],

  methode: {
    titre: 'Exécuter un programme avec une table de suivi',
    enonce:
      'Voici un programme de cinq lignes, dans cet ordre : « a prend la '
      + 'valeur 3 » ; « répéter 4 fois » ; à l’intérieur de la boucle, « a '
      + 'prend la valeur a + 5 » ; puis, après « fin répéter », « afficher a ». '
      + 'Qu’affiche ce programme ?',
    etapes: [
      {
        texte: 'Je trace une table de suivi : une colonne pour a, et une ligne par instruction exécutée.',
        note: 'C’est la première chose à poser, avant tout calcul.',
      },
      {
        texte: 'Première ligne : « a prend la valeur 3 ». J’écris 3 dans ma table.',
        note: 'C’est la valeur de départ, pas un tour de boucle.',
      },
      {
        texte: 'La boucle dit « répéter 4 fois » : le bloc s’exécute exactement 4 fois. Je numérote les tours et j’écris a à la fin de chacun — tour 1 : 8, tour 2 : 13, tour 3 : 18, tour 4 : 23.',
        note: 'Je ne récite pas « ça fait à peu près quatre fois », je numérote.',
      },
      {
        texte: '« afficher a » est écrit APRÈS « fin répéter », donc à gauche du bloc : il s’exécute une seule fois, une fois la boucle terminée. Le programme affiche 23.',
        note: 'S’il avait été décalé vers la droite, il aurait affiché quatre nombres.',
      },
    ],
    controle:
      'Le contrôle : recompte les tours sur tes doigts, et vérifie le résultat '
      + 'autrement. Ici a part de 3 et gagne 5 à chacun des 4 tours, donc '
      + '3 + 4 × 5 = 23. Tu retombes sur le même nombre sans avoir déroulé la '
      + 'table : elle tient.\n'
      + 'Ce raccourci ne vaut QUE parce que le bloc ajoute toujours la même '
      + 'chose : si le bloc multipliait, il ne marcherait pas. Et il ne voit PAS '
      + 'un tour de trop ou de moins, puisqu’il repart du même 4 que la table. '
      + 'Il attrape les erreurs de calcul, pas les erreurs de comptage.\n'
      + 'Pour celles-là, pose-toi les deux questions qui décident de tout — '
      + 'combien de fois le bloc est-il exécuté, et le « afficher » est-il DANS '
      + 'la boucle ou APRÈS elle ? Le retrait répond aux deux.',
  },

  entrainement: [
    // ── Palier 1 : suivre une suite d’affectations ─────────────────────────
    {
      // NEUTRE. Aucune boucle dans ce programme : compter les tours à un près
      // ne peut y produire aucune erreur — et c’est justement ce qui le rend
      // indispensable. Sans lui, « dans ce savoir-faire je multiplie par le
      // nombre de tours » réussirait partout et deviendrait la règle apprise.
      // Ses trois fausses pointent vers d’AUTRES pièges.
      id: 'e-17-1-1', type: 'calcul', palier: 1, neutre: true, piege: 'boucle-comptee-a-un-pres',
      consigne: 'Exécute ce programme ligne par ligne. Quel nombre affiche-t-il ?',
      programme: [
        'x prend la valeur 7',
        'x prend la valeur x + 5',
        'x prend la valeur x × 3',
        'afficher x',
      ],
      enonce: '\\text{le nombre affiché par ce programme}',
      attendu: 36,
      fausses: [
        // 7 × 3 : la troisième ligne calculée avec la valeur de DÉPART. Or elle
        // a été écrasée par 12 à la ligne précédente.
        { valeur: 21, piege: 'affectation-lue-comme-egalite' },
        // (0 + 5) × 3 : x supposé nul au départ, alors que la première ligne lui
        // donne explicitement la valeur 7.
        { valeur: 15, piege: 'variable-non-initialisee' },
        // Arrêt après la deuxième ligne : la troisième n’a pas été exécutée.
        { valeur: 12, piege: 'ordre-des-instructions-ignore' },
      ],
    },
    {
      // NEUTRE, et le plus important des trois : les deux instructions sont deux
      // ADDITIONS, donc les échanger ne change rien — un élève qui ignore
      // l’ordre répond juste ici. Sans cet item, « l’ordre change toujours le
      // résultat » deviendrait la règle, ce qui est faux et coûteux : l’ordre se
      // vérifie, il ne se suppose pas. Ses fausses pointent vers d’AUTRES
      // pièges.
      id: 'e-17-1-2', type: 'calcul', palier: 1, neutre: true, piege: 'ordre-des-instructions-ignore',
      consigne: 'Exécute ce programme ligne par ligne. Quel nombre affiche-t-il ?',
      programme: [
        'y prend la valeur 4',
        'y prend la valeur y + 9',
        'y prend la valeur y + 2',
        'afficher y',
      ],
      enonce: '\\text{le nombre affiché par ce programme}',
      attendu: 15,
      fausses: [
        // 4 + 2 : la dernière ligne calculée avec la valeur de départ, alors que
        // y vaut 13 à cet instant.
        { valeur: 6, piege: 'affectation-lue-comme-egalite' },
        // 0 + 9 + 2 : la première ligne ignorée, y supposé nul au départ.
        { valeur: 11, piege: 'variable-non-initialisee' },
      ],
    },
    {
      id: 'e-17-1-3', type: 'calcul', palier: 1, piege: 'ordre-des-instructions-ignore',
      consigne:
        'Ces deux programmes sont faits exactement des mêmes lignes, rangées '
        + 'dans un autre ordre. Le programme A affiche 26. Quel nombre affiche '
        + 'le programme B ?',
      programme: [
        'Programme A',
        'k prend la valeur 5',
        'k prend la valeur k × 4',
        'k prend la valeur k + 6',
        'afficher k',
        '',
        'Programme B',
        'k prend la valeur 5',
        'k prend la valeur k + 6',
        'k prend la valeur k × 4',
        'afficher k',
      ],
      enonce: '\\text{le nombre affiché par le programme B}',
      attendu: 44,
      fausses: [
        // « Les mêmes lignes, donc le même résultat » : l’affichage de A recopié
        // sans avoir exécuté B. Ici l’ordre change bien le résultat, et seule
        // l’exécution pouvait le dire.
        { valeur: 26, piege: 'ordre-des-instructions-ignore' },
        // 5 × 4 : la dernière ligne de B calculée avec la valeur de départ, alors
        // que k vaut 11 à cet instant.
        { valeur: 20, piege: 'affectation-lue-comme-egalite' },
      ],
    },

    // ── Palier 2 : les boucles, et le nombre exact de tours ────────────────
    {
      id: 'e-17-1-4', type: 'calcul', palier: 2, piege: 'boucle-comptee-a-un-pres',
      consigne: 'Exécute ce programme. Quel nombre affiche-t-il ?',
      programme: [
        'c prend la valeur 0',
        'répéter 6 fois',
        '    c prend la valeur c + 4',
        'fin répéter',
        'afficher c',
      ],
      enonce: '\\text{le nombre affiché par ce programme}',
      attendu: 24,
      fausses: [
        // Cinq tours au lieu de six.
        { valeur: 20, piege: 'boucle-comptee-a-un-pres' },
        // Sept tours : la valeur de départ comptée comme un tour.
        { valeur: 28, piege: 'boucle-comptee-a-un-pres' },
      ],
    },
    {
      // NEUTRE. Il y a bien une boucle, mais son bloc écrit une CONSTANTE dans
      // la variable : quatre, cinq ou six tours donnent tous 7. Compter les
      // tours à un près ne peut donc produire aucune erreur ici. Ce que l’item
      // met à l’épreuve est ailleurs — « prend la valeur » écrase, il n’ajoute
      // pas. Ses deux fausses pointent vers d’AUTRES pièges.
      id: 'e-17-1-5', type: 'calcul', palier: 2, neutre: true, piege: 'boucle-comptee-a-un-pres',
      consigne: 'Exécute ce programme. Quel nombre affiche-t-il ?',
      programme: [
        'p prend la valeur 9',
        'répéter 5 fois',
        '    p prend la valeur 7',
        'fin répéter',
        'afficher p',
      ],
      enonce: '\\text{le nombre affiché par ce programme}',
      attendu: 7,
      fausses: [
        // La boucle sautée : on garde la valeur de la première ligne.
        { valeur: 9, piege: 'ordre-des-instructions-ignore' },
        // 9 + 5 × 7 : « p prend la valeur 7 » lu comme « p augmente de 7 ». La
        // règle du piège tranche — une affectation ÉCRASE l’ancienne valeur.
        { valeur: 44, piege: 'affectation-lue-comme-egalite' },
      ],
    },
    {
      id: 'e-17-1-6', type: 'calcul', palier: 2, piege: 'ordre-des-instructions-ignore',
      consigne:
        'Ces deux programmes sont faits exactement des mêmes lignes, rangées '
        + 'dans un autre ordre : c’est la boucle qui a changé de place. Le '
        + 'programme A affiche 170. Quel nombre affiche le programme B ?',
      programme: [
        'Programme A',
        's prend la valeur 2',
        'répéter 3 fois',
        '    s prend la valeur s + 5',
        'fin répéter',
        's prend la valeur s × 10',
        'afficher s',
        '',
        'Programme B',
        's prend la valeur 2',
        's prend la valeur s × 10',
        'répéter 3 fois',
        '    s prend la valeur s + 5',
        'fin répéter',
        'afficher s',
      ],
      enonce: '\\text{le nombre affiché par le programme B}',
      attendu: 35,
      fausses: [
        // Les mêmes lignes, donc le même résultat.
        { valeur: 170, piege: 'ordre-des-instructions-ignore' },
        // Deux tours au lieu de trois.
        { valeur: 30, piege: 'boucle-comptee-a-un-pres' },
        // Quatre tours au lieu de trois.
        { valeur: 40, piege: 'boucle-comptee-a-un-pres' },
      ],
    },
    {
      id: 'e-17-1-7', type: 'trous', palier: 2, piege: 'boucle-comptee-a-un-pres',
      consigne:
        'Ce programme fait avancer deux variables dans la même boucle, puis '
        + 'affiche deux nombres. Donne-les dans l’ordre où ils sont affichés.',
      programme: [
        'n prend la valeur 0',
        'd prend la valeur 1',
        'répéter 4 fois',
        '    n prend la valeur n + 1',
        '    d prend la valeur d × 3',
        'fin répéter',
        'afficher n',
        'afficher d',
      ],
      enonce:
        '\\text{nombre affiché par « afficher n » : } \\square \\qquad '
        + '\\text{nombre affiché par « afficher d » : } \\square',
      champs: [
        { id: 'a', etiquette: 'nombre affiché par « afficher n »', attendu: 4 },
        { id: 'b', etiquette: 'nombre affiché par « afficher d »', attendu: 81 },
      ],
      fausses: [
        // Cinq tours : la valeur de départ comptée comme un tour.
        { valeur: 5, piege: 'boucle-comptee-a-un-pres' },
        // Trois tours : arrêt un tour trop tôt.
        { valeur: 3, piege: 'boucle-comptee-a-un-pres' },
        // 3⁵ : cinq tours pour d.
        { valeur: 243, piege: 'boucle-comptee-a-un-pres' },
      ],
    },

    // ── Palier 3 : la condition, et ce qu’elle fait sauter ─────────────────
    {
      id: 'e-17-1-8', type: 'calcul', palier: 3, piege: 'si-et-sinon-tous-deux-executes',
      consigne: 'Exécute ce programme. Quel nombre affiche-t-il ?',
      programme: [
        't prend la valeur 8',
        'si t > 10 alors',
        '    t prend la valeur t + 100',
        'sinon',
        '    t prend la valeur t × 5',
        'fin si',
        'afficher t',
      ],
      enonce: '\\text{le nombre affiché par ce programme}',
      attendu: 40,
      fausses: [
        // La branche du si prise alors que 8 n’est pas plus grand que 10.
        { valeur: 108, piege: 'si-et-sinon-tous-deux-executes' },
        // Les deux branches exécutées, dans l’ordre où elles sont écrites :
        // (8 + 100) × 5.
        { valeur: 540, piege: 'si-et-sinon-tous-deux-executes' },
        // Les deux branches exécutées dans l’autre ordre : 8 × 5, puis + 100.
        { valeur: 140, piege: 'si-et-sinon-tous-deux-executes' },
      ],
    },
    {
      id: 'e-17-1-9', type: 'plausible', palier: 3, piege: 'si-et-sinon-tous-deux-executes',
      consigne: 'Ce résultat est-il plausible ?',
      programme: [
        'r prend la valeur 30',
        'si r > 25 alors',
        '    r prend la valeur r + 4',
        'sinon',
        '    r prend la valeur r + 40',
        'fin si',
        'afficher r',
      ],
      enonce: '\\text{Quelqu’un annonce que ce programme affiche 74.}',
      attendu: false,
      fausses: [
        // Accepter 74, c’est avoir ajouté 4 PUIS 40 : les deux branches.
        { valeur: true, piege: 'si-et-sinon-tous-deux-executes' },
      ],
      explication:
        'Le nombre 74, c’est 30 + 4 + 40 : les deux branches ont été exécutées. '
        + 'Or une seule l’est. On évalue d’abord la condition avec la valeur du '
        + 'moment : r vaut 30, et 30 est bien plus grand que 25, donc la '
        + 'condition est vraie. C’est la branche du si qui s’exécute, et elle '
        + 'seule : r prend la valeur 30 + 4 = 34. La ligne « r prend la valeur '
        + 'r + 40 » est sautée entièrement, comme si elle n’était pas écrite. Le '
        + 'programme affiche 34.',
    },
    {
      id: 'e-17-1-10', type: 'vraifaux', palier: 3, piege: 'ordre-des-instructions-ignore',
      consigne: 'Vrai ou faux ? Si c’est faux, donne un contre-exemple.',
      affirmation:
        'Deux programmes faits exactement des mêmes lignes affichent toujours '
        + 'la même chose, quel que soit l’ordre dans lequel ces lignes sont '
        + 'écrites.',
      attendu: false,
      contreExemple: {
        // On ne demande pas de réciter « l’ordre compte » : on fait EXÉCUTER
        // deux programmes de trois lignes, les mêmes trois, et c’est l’élève qui
        // écrit 15 d’un côté et 3 de l’autre. Ici c’est la ligne « afficher »
        // qui a bougé — le cas le plus net, parce que le calcul, lui, est
        // identique dans les deux programmes.
        invite:
          'Exécute ces deux programmes. Le premier : « z prend la valeur 3 », '
          + 'puis « z prend la valeur z × 5 », puis « afficher z ». Le second '
          + 'est fait des mêmes trois lignes : « z prend la valeur 3 », puis '
          + '« afficher z », puis « z prend la valeur z × 5 ». Donne le nombre '
          + 'qu’affiche le premier, puis celui qu’affiche le second.',
        champs: [
          { id: 'a', etiquette: 'nombre affiché par le premier programme' },
          { id: 'b', etiquette: 'nombre affiché par le second programme' },
        ],
        valide: (a, b) => Math.abs(a - 15) < 1e-9 && Math.abs(b - 3) < 1e-9,
        temoin: [15, 3],
        exemple:
          'Le premier programme range 3 dans z, le multiplie par 5 — donc z '
          + 'vaut 15 — puis affiche z : il affiche 15. Le second range 3 dans z, '
          + 'affiche z tout de suite — donc 3 — puis multiplie z par 5, mais '
          + 'plus rien ne vient après : le 15 n’est jamais affiché. Les mêmes '
          + 'trois lignes affichent 15 dans un cas et 3 dans l’autre.',
      },
    },
  ],

  problemes: [
    {
      // Les deux premières questions font écrire la table de suivi tour par
      // tour ; la troisième seulement demande l’affichage. L’élève ne récite pas
      // « je numérote les tours », il les numérote.
      id: 'p-17-1-1',
      enonce:
        'Une application compte les points de Lina. Le programme ci-dessous '
        + 'part de son score du jour et lui ajoute des points, tour après tour.',
      programme: [
        'b prend la valeur 50',
        'répéter 4 fois',
        '    b prend la valeur b + 25',
        'fin répéter',
        'afficher b',
      ],
      questions: [
        { texte: 'Que vaut b à la fin du premier tour de boucle ?', attendu: 75 },
        { texte: 'Que vaut b à la fin du troisième tour de boucle ?', attendu: 125 },
        { texte: 'Quel nombre le programme affiche-t-il ?', attendu: 150 },
      ],
    },
    {
      // Deux programmes jumeaux, mais ici l’élève exécute les DEUX : la
      // troisième question chiffre l’écart, et c’est ce nombre-là qui rend
      // l’ordre indiscutable.
      id: 'p-17-1-2',
      enonce:
        'Ces deux programmes sont faits exactement des mêmes quatre lignes, '
        + 'rangées dans un ordre différent. Exécute-les l’un après l’autre.',
      programme: [
        'Programme A',
        'e prend la valeur 12',
        'e prend la valeur e + 8',
        'e prend la valeur e ÷ 4',
        'afficher e',
        '',
        'Programme B',
        'e prend la valeur 12',
        'e prend la valeur e ÷ 4',
        'e prend la valeur e + 8',
        'afficher e',
      ],
      questions: [
        { texte: 'Quel nombre le programme A affiche-t-il ?', attendu: 5 },
        { texte: 'Quel nombre le programme B affiche-t-il ?', attendu: 11 },
        { texte: 'De combien ces deux nombres diffèrent-ils ?', attendu: 6 },
      ],
    },
    {
      // La même condition évaluée deux fois, avec deux valeurs de départ : c’est
      // ce qui montre qu’une branche n’est pas « la bonne » une fois pour
      // toutes, mais choisie à chaque exécution.
      id: 'p-17-1-3',
      enonce:
        'Un magasin applique une remise avec le programme ci-dessous. La '
        + 'variable prix contient le prix de l’article, en euros.',
      programme: [
        'prix prend la valeur 80',
        'si prix > 60 alors',
        '    prix prend la valeur prix − 12',
        'sinon',
        '    prix prend la valeur prix − 3',
        'fin si',
        'afficher prix',
      ],
      questions: [
        { texte: 'Quelle valeur la variable prix reçoit-elle à la première ligne ?', attendu: 80, unite: '€' },
        { texte: 'Quel nombre le programme affiche-t-il ?', attendu: 68, unite: '€' },
        { texte: 'On remplace 80 par 45 à la première ligne, sans rien changer d’autre. Quel nombre le programme affiche-t-il alors ?', attendu: 42, unite: '€' },
      ],
    },
    {
      // Deux variables dans la même boucle, et l’ordre COMPTE à l’intérieur du
      // bloc : la deuxième ligne du bloc utilise la valeur que la première vient
      // d’écrire, pas celle du tour précédent.
      id: 'p-17-1-4',
      enonce:
        'Ce programme fait avancer deux variables en même temps. Attention à '
        + 'l’intérieur de la boucle : la seconde ligne du bloc utilise la valeur '
        + 'que la première vient d’écrire.',
      programme: [
        'h prend la valeur 1',
        'j prend la valeur 0',
        'répéter 5 fois',
        '    h prend la valeur h × 2',
        '    j prend la valeur j + h',
        'fin répéter',
        'afficher h',
        'afficher j',
      ],
      questions: [
        { texte: 'Que vaut h à la fin du troisième tour de boucle ?', attendu: 8 },
        { texte: 'Quel nombre « afficher h » affiche-t-il ?', attendu: 32 },
        { texte: 'Quel nombre « afficher j » affiche-t-il ?', attendu: 62 },
      ],
    },
    {
      // Le « afficher » est DANS la boucle : le retrait est ici toute
      // l’information, et la première question fait dire combien de nombres
      // sortent avant de demander lesquels.
      id: 'p-17-1-5',
      enonce:
        'Regarde bien le retrait : l’instruction « afficher w » est décalée '
        + 'vers la droite, donc elle fait partie du bloc répété.',
      programme: [
        'w prend la valeur 6',
        'répéter 3 fois',
        '    w prend la valeur w + 6',
        '    afficher w',
        'fin répéter',
      ],
      questions: [
        { texte: 'Combien de nombres ce programme affiche-t-il en tout ?', attendu: 3, unite: 'nombres' },
        { texte: 'Quel est le premier nombre affiché ?', attendu: 12 },
        { texte: 'Quel est le dernier nombre affiché ?', attendu: 24 },
      ],
    },
  ],

  test: [
    {
      id: 't-17-1-1', type: 'calcul',
      consigne: 'Exécute ce programme ligne par ligne. Quel nombre affiche-t-il ?',
      programme: [
        'x prend la valeur 2',
        'x prend la valeur x + 7',
        'x prend la valeur x × 6',
        'afficher x',
      ],
      enonce: '\\text{le nombre affiché par ce programme}',
      attendu: 54,
      fausses: [
        // 2 × 6 : la dernière ligne calculée avec la valeur de départ.
        { valeur: 12, piege: 'affectation-lue-comme-egalite' },
        // (0 + 7) × 6 : la première ligne ignorée.
        { valeur: 42, piege: 'variable-non-initialisee' },
      ],
      revoir: 'definition',
    },
    {
      id: 't-17-1-2', type: 'calcul',
      consigne:
        'Ces deux programmes sont faits exactement des mêmes lignes, rangées '
        + 'dans un autre ordre. Le programme A affiche 30. Quel nombre affiche '
        + 'le programme B ?',
      programme: [
        'Programme A',
        'g prend la valeur 3',
        'g prend la valeur g × 7',
        'g prend la valeur g + 9',
        'afficher g',
        '',
        'Programme B',
        'g prend la valeur 3',
        'g prend la valeur g + 9',
        'g prend la valeur g × 7',
        'afficher g',
      ],
      enonce: '\\text{le nombre affiché par le programme B}',
      attendu: 84,
      fausses: [
        { valeur: 30, piege: 'ordre-des-instructions-ignore' },
        // 3 × 7 : la dernière ligne de B calculée avec la valeur de départ.
        { valeur: 21, piege: 'affectation-lue-comme-egalite' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-17-1-3', type: 'calcul',
      consigne: 'Exécute ce programme. Quel nombre affiche-t-il ?',
      programme: [
        'c prend la valeur 0',
        'répéter 7 fois',
        '    c prend la valeur c + 5',
        'fin répéter',
        'afficher c',
      ],
      enonce: '\\text{le nombre affiché par ce programme}',
      attendu: 35,
      fausses: [
        { valeur: 30, piege: 'boucle-comptee-a-un-pres' },
        { valeur: 40, piege: 'boucle-comptee-a-un-pres' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-17-1-4', type: 'trous',
      consigne:
        'Ce programme fait avancer deux variables dans la même boucle, puis '
        + 'affiche deux nombres. Donne-les dans l’ordre où ils sont affichés.',
      programme: [
        'i prend la valeur 0',
        'm prend la valeur 2',
        'répéter 5 fois',
        '    i prend la valeur i + 1',
        '    m prend la valeur m × 2',
        'fin répéter',
        'afficher i',
        'afficher m',
      ],
      enonce:
        '\\text{nombre affiché par « afficher i » : } \\square \\qquad '
        + '\\text{nombre affiché par « afficher m » : } \\square',
      champs: [
        { id: 'a', etiquette: 'nombre affiché par « afficher i »', attendu: 5 },
        { id: 'b', etiquette: 'nombre affiché par « afficher m »', attendu: 64 },
      ],
      fausses: [
        { valeur: 6, piege: 'boucle-comptee-a-un-pres' },
        { valeur: 4, piege: 'boucle-comptee-a-un-pres' },
        { valeur: 128, piege: 'boucle-comptee-a-un-pres' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-17-1-5', type: 'calcul',
      consigne: 'Exécute ce programme. Quel nombre affiche-t-il ?',
      programme: [
        'v prend la valeur 24',
        'si v > 20 alors',
        '    v prend la valeur v ÷ 2',
        'sinon',
        '    v prend la valeur v + 50',
        'fin si',
        'afficher v',
      ],
      enonce: '\\text{le nombre affiché par ce programme}',
      attendu: 12,
      fausses: [
        // La branche du sinon prise alors que 24 est bien plus grand que 20.
        { valeur: 74, piege: 'si-et-sinon-tous-deux-executes' },
        // Les deux branches : 24 ÷ 2 = 12, puis + 50.
        { valeur: 62, piege: 'si-et-sinon-tous-deux-executes' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-17-1-6', type: 'calcul',
      consigne: 'Exécute ce programme. Quel nombre affiche-t-il ?',
      programme: [
        'q prend la valeur 6',
        'si q > 15 alors',
        '    q prend la valeur q × 10',
        'sinon',
        '    q prend la valeur q + 11',
        'fin si',
        'afficher q',
      ],
      enonce: '\\text{le nombre affiché par ce programme}',
      attendu: 17,
      fausses: [
        // La branche du si prise alors que 6 n’est pas plus grand que 15.
        { valeur: 60, piege: 'si-et-sinon-tous-deux-executes' },
        // Les deux branches : 6 × 10 = 60, puis + 11.
        { valeur: 71, piege: 'si-et-sinon-tous-deux-executes' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-17-1-7', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      programme: [
        'z prend la valeur 0',
        'répéter 5 fois',
        '    z prend la valeur z + 8',
        'fin répéter',
        'afficher z',
      ],
      enonce: '\\text{Quelqu’un annonce que ce programme affiche 48.}',
      attendu: false,
      fausses: [
        { valeur: true, piege: 'boucle-comptee-a-un-pres' },
      ],
      explication:
        'Le nombre 48, c’est 8 ajouté six fois — un tour de trop. « Répéter 5 '
        + 'fois » exécute le bloc exactement 5 fois : les tours donnent 8, 16, '
        + '24, 32, 40. Le programme affiche 40. Le 0 de la première ligne n’est '
        + 'pas un tour : c’est ce qu’il y a avant le premier.',
      piege: 'boucle-comptee-a-un-pres', revoir: 'propriete',
    },
    {
      // Le seul « plausible » vrai de l’auto-évaluation : sans lui, « on me
      // demande si c’est plausible, donc c’est faux » suffirait. Répondre « pas
      // plausible », c’est presque toujours avoir calculé 5 + 3 × 2 = 11, en
      // appliquant les priorités opératoires à ce qui n’est pas un calcul mais
      // une suite d’ordres.
      id: 't-17-1-8', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      programme: [
        'a prend la valeur 5',
        'a prend la valeur a + 3',
        'a prend la valeur a × 2',
        'afficher a',
      ],
      enonce: '\\text{Quelqu’un annonce que ce programme affiche 16.}',
      attendu: true,
      fausses: [
        { valeur: false, piege: 'ordre-des-instructions-ignore' },
      ],
      explication:
        'La table de suivi donne 5, puis 5 + 3 = 8, puis 8 × 2 = 16 : la valeur '
        + 'annoncée est la bonne. Ce n’est pas le calcul 5 + 3 × 2, qui vaudrait '
        + '11 : les priorités opératoires n’ont rien à faire ici, parce que ces '
        + 'trois lignes ne forment pas un seul calcul. Ce sont trois ordres '
        + 'séparés, exécutés de haut en bas, et chacun travaille sur ce que a '
        + 'vaut à cet instant.',
      revoir: 'propriete',
    },
    {
      id: 't-17-1-9', type: 'trous',
      consigne:
        'Regarde le retrait : « afficher f » est décalé vers la droite, donc il '
        + 'est dans la boucle. Le programme affiche plusieurs nombres.',
      programme: [
        'f prend la valeur 1',
        'répéter 4 fois',
        '    f prend la valeur f × 5',
        '    afficher f',
        'fin répéter',
      ],
      enonce:
        '\\text{premier nombre affiché : } \\square \\qquad '
        + '\\text{dernier nombre affiché : } \\square',
      champs: [
        { id: 'a', etiquette: 'premier nombre affiché', attendu: 5 },
        { id: 'b', etiquette: 'dernier nombre affiché', attendu: 625 },
      ],
      fausses: [
        // 1 : la valeur affichée avant la multiplication. Or dans le bloc, la
        // multiplication est écrite AVANT l’affichage.
        { valeur: 1, piege: 'ordre-des-instructions-ignore' },
        // Cinq tours au lieu de quatre.
        { valeur: 3125, piege: 'boucle-comptee-a-un-pres' },
        // Trois tours au lieu de quatre.
        { valeur: 125, piege: 'boucle-comptee-a-un-pres' },
      ],
      revoir: 'remarque',
    },
    {
      id: 't-17-1-10', type: 'calcul',
      consigne:
        'Ce programme enchaîne une boucle puis une condition. Exécute-le. Quel '
        + 'nombre affiche-t-il ?',
      programme: [
        'd prend la valeur 1',
        'répéter 3 fois',
        '    d prend la valeur d × 4',
        'fin répéter',
        'si d > 50 alors',
        '    d prend la valeur d + 100',
        'sinon',
        '    d prend la valeur d + 1',
        'fin si',
        'afficher d',
      ],
      enonce: '\\text{le nombre affiché par ce programme}',
      attendu: 164,
      fausses: [
        // La branche du sinon prise alors que 64 est bien plus grand que 50.
        { valeur: 65, piege: 'si-et-sinon-tous-deux-executes' },
        // Les deux branches : 64 + 100, puis + 1.
        { valeur: 165, piege: 'si-et-sinon-tous-deux-executes' },
        // Quatre tours de boucle au lieu de trois : d vaut alors 256.
        { valeur: 356, piege: 'boucle-comptee-a-un-pres' },
      ],
      revoir: 'remarque',
    },
  ],
};
