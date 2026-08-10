// Chapitre 16, savoir-faire 1 — Utiliser le vocabulaire des expériences aléatoires.
//
// ── Le vocabulaire n'est pas l'objet : la séparation l'est ─────────────────
//
// « Issue », « événement », « certain », « impossible » se récitent en dix
// minutes, et un savoir-faire qui se contenterait de les faire réciter serait
// une perte de temps. Ce qui se joue ici est ailleurs : c'est la seule
// occasion, avant tout calcul, de séparer ce que l'élève OBSERVE de ce à quoi
// il s'ATTEND. Deux nombres se ressemblent — la fréquence et la probabilité —
// et tant qu'ils ne sont pas distingués, le chapitre entier repose sur du
// sable : l'élève calculera 3/10 correctement puis expliquera, deux lignes
// plus bas, que « comme le rouge est déjà sorti trois fois, il a moins de
// chances maintenant ».
//
// ── Pourquoi la découverte compte des lancers au lieu d'énoncer une règle ──
//
// Le sophisme du joueur et la confusion fréquence/probabilité ne sont pas des
// oublis de cours : ce sont des conceptions, et on les retrouve intactes chez
// des adultes instruits. Énoncer « la pièce n'a pas de mémoire » ne les déloge
// pas — l'élève acquiesce et continue. Il faut qu'il CONSTATE.
//
// La découverte fait donc calculer deux fréquences sur quatre séries de vingt
// lancers de la MÊME pièce : 0,65 puis 0,4. Deux nombres différents, un seul
// objet. Aucun des deux ne peut être « la chance d'obtenir pile », et l'élève
// n'a pas à le croire sur parole : il vient de les écrire lui-même. Le
// contre-exemple de e-16-1-10 refait exactement ce geste, avec d'autres
// nombres, sur deux séries de vingt-cinq lancers.
//
// ── Avec remise, sans remise : le seul mot qui décide ──────────────────────
//
// « L'urne n'a pas de mémoire » est faux si l'on ne remet pas la boule. C'est
// précisément ce qui rend le sophisme du joueur difficile : l'intuition « il
// en reste moins, donc c'est moins probable » est parfois JUSTE. Chaque énoncé
// de tirage dit donc explicitement s'il y a remise ou non, et le lot contient
// les deux cas : e-16-1-7 et e-16-1-9 sont avec remise (rien n'a changé),
// t-16-1-9 est sans remise (tout a changé, et il faut recompter l'urne). Un
// élève qui aurait appris « les tirages précédents ne comptent jamais »
// échoue à t-16-1-9 ; celui qui aurait appris l'inverse échoue aux deux
// autres. Aucune des deux règles de surface ne traverse le lot.
//
// ── Les trois items neutres, un par piège ─────────────────────────────────
//
// e-16-1-1 ne mentionne aucune expérience déjà faite : on compte les boules
// d'une urne, rien de plus. Un élève qui substitue systématiquement la
// fréquence observée à la probabilité n'a ici RIEN d'observé à substituer, et
// il répond juste. En revanche celui qui compte les couleurs au lieu des
// boules s'y fait prendre — d'où la « fausse » rattachée à l'équiprobabilité.
//
// e-16-1-5 dit explicitement qu'il s'agit du tout premier tirage et qu'aucune
// boule n'a été tirée avant. Sans passé, le sophisme du joueur ne peut pas
// produire d'erreur ; les deux « fausses » pointent donc vers d'autres pièges.
//
// e-16-1-6 énonce lui-même que les vingt faces du dé ont exactement la même
// chance. Supposer l'équiprobabilité y est CORRECT : la confusion est
// neutralisée, et la seule erreur qui reste est de sortir de l'intervalle
// [0 ; 1].
//
// ── Aucune figure, et aucun résultat approché ─────────────────────────────
//
// Tout est décrit en toutes lettres : le contenu exact de chaque urne, le
// nombre de faces de chaque dé, le nombre de tirages déjà faits et ce qu'ils
// ont donné, et à chaque fois s'il y a remise. Il n'y a pas de calculatrice
// dans l'application : chaque fréquence et chaque probabilité demandée en
// écriture décimale porte donc sur un total de 10, 20, 24, 25, 40, 50 ou 200,
// et tombe exactement juste. Les totaux de 12, 14 ou 30 n'apparaissent que là
// où la réponse se donne en fraction, ou vaut 0 ou 1. Les probabilités
// demandées en fraction le sont toujours sous forme irréductible, et la
// consigne le dit à chaque fois.
//
// ── Ce que ce savoir-faire ne couvre pas ─────────────────────────────────
//
// Le programme de 4e s'en tient aux expériences à UNE SEULE épreuve : il n'y a
// donc ici ni arbre à deux niveaux, ni probabilité composée, ni indépendance —
// tout cela est en 3e. Les tirages successifs qui apparaissent (avec ou sans
// remise) ne servent jamais à multiplier deux probabilités : on recompte
// simplement l'urne avant le tirage suivant, ce qui reste une épreuve unique.
// La formule « favorables ÷ total » n'est pas non plus énoncée comme telle :
// elle est le sujet du savoir-faire suivant, et ici elle se lit seulement sur
// les exemples du cours, une urne à la fois. Sa déformation la plus courante —
// favorables ÷ défavorables — est en revanche diagnostiquée dès e-16-1-4, pour
// que l'élève qui l'anticipe le soit tout de même. L'événement contraire et son
// calcul par 1 − p attendent eux aussi le savoir-faire suivant : quand un
// complément apparaît ici — les boules qui ne sont pas bleues, en e-16-1-1 —
// il se compte boule par boule, jamais par soustraction.

export default {
  id: 'sf-16-1',
  titre: 'Utiliser le vocabulaire des expériences aléatoires',
  attendus: [
    'Il utilise le vocabulaire des expériences aléatoires : issue, événement, événement certain, événement impossible.',
    'Il distingue la fréquence d’un résultat observé et la probabilité d’un événement.',
    'Il compare des événements selon qu’ils sont plus ou moins probables.',
  ],

  // On ne dit pas « la fréquence n’est pas la probabilité » : on fait calculer
  // deux fréquences sur la même pièce, et c’est l’élève qui obtient deux
  // nombres différents là où il en attendait un seul.
  decouvrir: {
    titre: 'La même pièce, et deux nombres qui ne sont pas d’accord',
    texte:
      'On lance une pièce équilibrée 20 fois de suite, puis on recommence : '
      + 'quatre séries de 20 lancers en tout. '
      + 'C’est la même pièce à chaque série : on ne la change pas, '
      + 'on ne la tord pas, on ne fait rien d’autre que la relancer. Voici le '
      + 'nombre de « pile » obtenus dans chaque série.',
    lignes: [
      { calcul: 'série 1 — 20 lancers', resultat: '13 piles' },
      { calcul: 'série 2 — 20 lancers', resultat: '8 piles' },
      { calcul: 'série 3 — 20 lancers', resultat: '11 piles' },
      { calcul: 'série 4 — 20 lancers', resultat: '10 piles' },
    ],
    question:
      'Calcule la part de « pile » dans la série 1, puis dans la série 2. '
      + 'Donne les deux réponses en écriture décimale.',
    champs: [
      { id: 'a', etiquette: 'part de « pile » dans la série 1', attendu: 0.65 },
      { id: 'b', etiquette: 'part de « pile » dans la série 2', attendu: 0.4 },
    ],
    conclusion:
      'Tu obtiens **0,65** puis **0,4**. Deux nombres différents, alors que la '
      + 'pièce, elle, n’a pas changé d’une série à l’autre.\n'
      + 'Ces deux nombres sont des **fréquences** : ils décrivent ce qui EST '
      + 'SORTI, et ils changent à chaque série. Aucun des deux n’est « la '
      + 'chance d’obtenir pile » — sinon la pièce en aurait deux à la fois.\n'
      + 'La **probabilité**, elle, ne se compte pas sur les lancers : elle se '
      + 'lit sur la pièce. Deux faces qui ont la même chance, une seule est '
      + 'pile, donc **0,5**. Elle valait 0,5 avant la série 1, elle vaut encore '
      + '0,5 après la série 4.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Expérience aléatoire, issue, événement',
      texte:
        'Une **expérience aléatoire** est une expérience dont on connaît tous '
        + 'les résultats possibles, mais dont on ne peut pas prévoir lequel se '
        + 'produira : lancer un dé, tirer une boule dans une urne, faire tourner '
        + 'une roue.\n'
        + 'Chaque résultat possible s’appelle une **issue**. Dans un tirage, les '
        + 'issues sont les **objets** eux-mêmes : chaque boule est une issue, '
        + 'même quand plusieurs boules ont la même couleur.\n'
        + 'Un **événement** rassemble une ou plusieurs issues : « obtenir une '
        + 'boule verte », « obtenir un nombre pair ».',
    },
    {
      type: 'propriete',
      titre: 'Événement certain, événement impossible, plus ou moins probable',
      texte:
        'La **probabilité** d’un événement est un nombre compris **entre 0 et '
        + '1** qui mesure la chance qu’il a de se produire.\n'
        + 'Un événement qui se produit à coup sûr est **certain** : sa '
        + 'probabilité vaut **1**.\n'
        + 'Un événement qui ne peut pas se produire est **impossible** : sa '
        + 'probabilité vaut **0**.\n'
        + 'Entre les deux, plus la probabilité est grande, plus l’événement est '
        + 'probable. Dire qu’un événement est **plus probable** qu’un autre, '
        + 'c’est dire que sa probabilité est plus grande.',
    },
    {
      type: 'propriete',
      titre: 'Ce qu’on observe, et ce à quoi on s’attend',
      texte:
        'Deux nombres se ressemblent et ne disent pas la même chose.\n'
        + 'La **fréquence** d’un résultat se calcule APRÈS l’expérience : nombre '
        + 'de fois où il est sorti ÷ nombre d’essais. Elle décrit ce qui **est '
        + 'sorti**, et elle change d’une série à l’autre.\n'
        + 'La **probabilité** se lit AVANT, sur l’objet lui-même : le nombre de '
        + 'faces du dé, le contenu de l’urne. Elle décrit ce à quoi on '
        + '**s’attend**, et elle ne change pas d’une série à l’autre.\n'
        + 'La question qui les sépare : **d’où vient ton nombre ?** D’un '
        + 'comptage d’essais déjà faits, ou de la composition de l’objet ?',
    },
    {
      type: 'remarque',
      titre: 'Un objet n’a pas de mémoire',
      texte:
        'Une pièce, un dé, une urne **avec remise** ne gardent aucune trace de '
        + 'ce qui est déjà sorti. Cinq piles d’affilée ne rendent pas face plus '
        + 'probable au lancer suivant : la pièce est la même, donc la '
        + 'probabilité est la même.\n'
        + 'Le contrôle tient en une question : **qu’est-ce qui a changé dans '
        + 'l’objet ?** Si on remet la boule, rien n’a changé. Si on ne la remet '
        + 'pas, l’urne a réellement changé et il faut la recompter avant le '
        + 'tirage suivant.\n'
        + 'C’est le mot « avec remise » ou « sans remise » qui décide — jamais '
        + 'le sentiment que « ça doit bien finir par s’équilibrer ».',
    },
    {
      type: 'remarque',
      titre: 'Deux issues ne font pas deux chances égales',
      texte:
        'Compter les résultats possibles ne suffit pas : encore faut-il qu’ils '
        + 'aient la même chance.\n'
        + 'Une urne de 8 boules dont 3 jaunes a bien deux couleurs, mais la '
        + 'probabilité d’obtenir une jaune ne vaut pas un demi : elle vaut '
        + '3 ÷ 8. Ce sont les **boules** qui sont interchangeables, pas les '
        + 'couleurs.\n'
        + 'Compte les objets, pas les catégories.',
    },
    {
      type: 'exemple',
      titre: 'Nommer l’expérience, ses issues, ses événements',
      texte:
        'Une urne contient 12 billes indiscernables au toucher : 2 jaunes et '
        + '10 grises. On en tire une au hasard. L’expérience est aléatoire : on '
        + 'sait que la bille sera jaune ou grise, mais on ne peut pas dire '
        + 'laquelle sortira. Elle a 12 issues, une par bille — et non 2, qui '
        + 'n’est que le nombre de couleurs. L’événement « obtenir une bille '
        + 'jaune » rassemble 2 issues. L’événement « obtenir une bille jaune ou '
        + 'grise » les rassemble toutes : il est certain, sa probabilité vaut 1. '
        + 'L’événement « obtenir une bille rouge » n’en rassemble aucune : il '
        + 'est impossible, sa probabilité vaut 0.\n'
        + 'On lance une fois un dé équilibré à 6 faces numérotées de 1 à 6. '
        + 'L’expérience a 6 issues. L’événement « obtenir un nombre pair » '
        + 'rassemble 3 issues : 2, 4 et 6. L’événement « obtenir un nombre plus '
        + 'petit que 7 » est certain ; l’événement « obtenir 9 » est impossible.',
    },
    {
      type: 'exemple',
      titre: 'Séparer la fréquence de la probabilité',
      texte:
        'Une pièce équilibrée est lancée 60 fois : elle donne 33 piles. La '
        + 'fréquence de pile dans cette série vaut 33 ÷ 60 = 0,55. Ce nombre '
        + 'décrit ce qui est sorti pendant ces 60 lancers-là. La probabilité '
        + 'd’obtenir pile, elle, se lit sur la pièce : deux faces de même '
        + 'chance, une seule est pile, donc 0,5. Les deux nombres n’ont aucune '
        + 'raison d’être égaux.\n'
        + 'La même pièce est relancée 60 fois et donne cette fois 27 piles : la '
        + 'fréquence vaut 27 ÷ 60 = 0,45. La pièce n’a pas changé entre les deux '
        + 'séries, et pourtant les deux fréquences diffèrent. Aucune des deux '
        + 'n’est « la » probabilité — une fréquence observée ne remplace jamais '
        + 'la lecture de l’objet.',
    },
    {
      type: 'exemple',
      titre: 'Avec remise ou sans remise : ce qui change vraiment',
      texte:
        'Une urne contient 25 boules indiscernables au toucher : 4 jaunes et '
        + '21 vertes. On tire une boule, on note sa couleur et on la REMET. Les '
        + 'trois premiers tirages ont donné trois vertes. Au quatrième tirage, '
        + 'l’urne contient toujours 4 jaunes sur 25 : la probabilité d’obtenir '
        + 'une jaune vaut encore 4 ÷ 25 = 0,16. Les trois vertes déjà sorties ne '
        + 'sont écrites nulle part dans l’urne.\n'
        + 'Même urne, mais SANS remise : on tire une boule, elle est jaune, et '
        + 'on la garde. Il reste alors 24 boules dont 3 jaunes, et la '
        + 'probabilité d’obtenir une jaune au second tirage vaut 3 ÷ 24 = 0,125. '
        + 'Cette fois l’urne a réellement changé, et le calcul le suit. Le seul '
        + 'mot qui a décidé, dans les deux cas, c’est « remise ».',
    },
  ],

  methode: {
    titre: 'Séparer ce qu’on observe de ce à quoi on s’attend',
    enonce:
      'Une urne contient 50 boules indiscernables au toucher : 20 rouges et '
      + '30 bleues. On tire une boule au hasard, on note sa couleur et on la '
      + 'remet dans l’urne. Les 25 premiers tirages ont donné 17 boules rouges. '
      + 'Quelle est la probabilité d’obtenir une boule rouge au 26ᵉ tirage ?',
    etapes: [
      {
        texte: 'Je nomme l’expérience et ses issues : on tire une boule au hasard parmi 50. Il y a donc 50 issues, une par boule.',
        note: 'Et non 2 : « rouge » et « bleue » sont des couleurs, pas des issues de même chance.',
      },
      {
        texte: 'Je repère ce qui est OBSERVÉ : 17 rouges en 25 tirages. C’est une fréquence, et elle vaut 17 ÷ 25 = 0,68.',
        note: 'Ce nombre décrit ce qui est sorti, pas ce qui va sortir.',
      },
      {
        texte: 'Je repère ce qui a changé dans l’urne : on remet la boule à chaque tirage, donc rien. Elle contient toujours 20 rouges et 30 bleues.',
        note: 'Si l’énoncé disait « sans remise », cette ligne serait fausse et il faudrait recompter.',
      },
      {
        texte: 'Je calcule la probabilité sur l’urne, pas sur la série : 20 rouges parmi 50 boules, donc 20 ÷ 50 = 0,4.',
        note: 'Les 25 tirages déjà faits n’entrent pas dans ce calcul.',
      },
    ],
    controle:
      'Le contrôle tient en trois questions et un dernier coup d’œil, et aucun '
      + 'ne demande de calculatrice. D’abord : d’où vient mon nombre ? De '
      + 'tirages déjà faits, c’est une fréquence ; de la composition de l’urne, '
      + 'c’est une probabilité. On demandait ici une probabilité, donc 0,68 ne '
      + 'pouvait pas être la réponse. Ensuite : qu’ai-je compté au '
      + 'dénominateur, des objets ou des catégories ? Ici 50 boules, et non '
      + '2 couleurs — c’est la question qui écarte 0,5, la réponse la plus '
      + 'difficile à repérer parce qu’elle ressemble à une probabilité et tombe '
      + 'bien entre 0 et 1. Puis : qu’est-ce qui a changé dans l’urne entre le '
      + 'premier tirage et celui-ci ? On remet la boule, donc rien — et si rien '
      + 'n’a changé, la probabilité non plus : elle vaut 0,4 au 26ᵉ tirage comme '
      + 'au premier. Dernier coup d’œil : une probabilité est toujours comprise '
      + 'entre 0 et 1. Un résultat comme 2,5 signale une division prise à '
      + 'l’envers.',
  },

  entrainement: [
    // ── Palier 1 : ce que contient l’objet, avant toute expérience ──────────
    {
      // NEUTRE. Aucune expérience n’a été faite : il n’y a rien d’observé, donc
      // rien que la confusion fréquence/probabilité puisse substituer à quoi
      // que ce soit. Sans cet item, « on me parle de hasard, donc je compte ce
      // qui est sorti » traverserait tout le savoir-faire. En revanche celui
      // qui prend les couleurs pour les issues s’y fait prendre — d’où la
      // « fausse » rattachée à l’AUTRE piège.
      id: 'e-16-1-1', type: 'trous', palier: 1, neutre: true, piege: 'frequence-et-probabilite-confondues',
      consigne:
        'Une urne contient 4 boules vertes, 6 boules rouges et 15 boules '
        + 'bleues, toutes de même taille et de même poids, impossibles à '
        + 'distinguer au toucher. On en tire une au hasard. Complète les deux '
        + 'nombres.',
      enonce:
        '\\text{nombre d’issues de cette expérience, c’est-à-dire de boules qui peuvent sortir : } \\square \\qquad '
        + '\\text{nombre de boules qui ne sont pas bleues : } \\square',
      champs: [
        { id: 'a', etiquette: 'nombre d’issues de l’expérience', attendu: 25 },
        { id: 'b', etiquette: 'nombre de boules qui ne sont pas bleues', attendu: 10 },
      ],
      fausses: [
        // 3, c’est le nombre de COULEURS. Les couleurs ne sont pas
        // interchangeables entre elles : les boules, si.
        { valeur: 3, piege: 'equiprobabilite-supposee' },
      ],
    },
    {
      id: 'e-16-1-2', type: 'trous', palier: 1, piege: 'probabilite-hors-des-bornes',
      consigne:
        'Une urne contient 6 boules rouges et 4 boules noires, indiscernables '
        + 'au toucher, et aucune autre boule. On en tire une au hasard. Donne '
        + 'les deux probabilités demandées, en écriture décimale.',
      enonce:
        '\\text{probabilité que la boule tirée soit rouge ou noire : } \\square \\qquad '
        + '\\text{probabilité que la boule tirée soit verte : } \\square',
      champs: [
        { id: 'a', etiquette: 'probabilité que la boule soit rouge ou noire', attendu: 1 },
        { id: 'b', etiquette: 'probabilité que la boule soit verte', attendu: 0 },
      ],
      fausses: [
        // 10, c’est le nombre de boules : une probabilité ne dépasse jamais 1.
        { valeur: 10, piege: 'probabilite-hors-des-bornes' },
      ],
    },
    {
      id: 'e-16-1-3', type: 'calcul', palier: 1, piege: 'frequence-et-probabilite-confondues',
      consigne:
        'Une urne contient 20 boules indiscernables au toucher : 8 rouges et '
        + '12 noires. Line a déjà fait 25 tirages au hasard, en remettant la '
        + 'boule à chaque fois, et elle a obtenu 15 boules rouges. Elle fait un '
        + 'tirage de plus. Quelle est la probabilité d’obtenir une boule rouge ? '
        + 'Donne la réponse en écriture décimale.',
      enonce:
        '\\text{urne : 8 boules rouges et 12 noires, soit 20 boules — tirages AVEC remise} \\quad '
        + '\\text{déjà observé : 15 boules rouges en 25 tirages}',
      attendu: 0.4,
      fausses: [
        // 15 ÷ 25 : c’est la fréquence observée, pas la probabilité.
        { valeur: 0.6, piege: 'frequence-et-probabilite-confondues' },
        // 20 ÷ 8 : division prise à l’envers, et le résultat dépasse 1.
        { valeur: 2.5, piege: 'probabilite-hors-des-bornes' },
      ],
    },

    // ── Palier 2 : lire la probabilité sur l’objet, et sur lui seul ─────────
    {
      id: 'e-16-1-4', type: 'fraction', palier: 2, piege: 'equiprobabilite-supposee',
      consigne:
        'Une urne contient 5 boules rouges et 1 boule verte, indiscernables au '
        + 'toucher. On en tire une au hasard. Quelle est la probabilité '
        + 'd’obtenir la boule verte ? Donne la réponse sous forme de fraction '
        + 'irréductible.',
      enonce: '\\text{urne : 5 boules rouges et 1 boule verte — un seul tirage}',
      attendu: [1, 6],
      fausses: [
        // Deux couleurs, donc une chance sur deux : c’est exactement ce que la
        // règle du piège réfute.
        { valeur: '1/2', piege: 'equiprobabilite-supposee' },
        // 1 verte « contre » 5 rouges : favorables sur défavorables, pas sur le
        // total.
        { valeur: '1/5', piege: 'favorables-sur-defavorables' },
      ],
    },
    {
      // NEUTRE. L’énoncé dit qu’il s’agit du tout premier tirage et qu’aucune
      // boule n’a été tirée avant : il n’y a pas de passé à invoquer, donc le
      // sophisme du joueur ne peut pas produire d’erreur ici. Les deux
      // « fausses » pointent vers d’AUTRES pièges.
      id: 'e-16-1-5', type: 'fraction', palier: 2, neutre: true, piege: 'sophisme-du-joueur',
      consigne:
        'Une urne contient 3 boules vertes, 8 boules rouges et 9 boules bleues, '
        + 'indiscernables au toucher. On effectue un seul tirage, le tout '
        + 'premier : aucune boule n’a été tirée avant celui-ci. Quelle est la '
        + 'probabilité d’obtenir une boule verte ? Donne la réponse sous forme '
        + 'de fraction irréductible.',
      enonce:
        '\\text{urne : 3 boules vertes, 8 rouges et 9 bleues} \\quad '
        + '\\text{c’est le tout premier tirage : aucun tirage n’a eu lieu avant}',
      attendu: [3, 20],
      fausses: [
        // 3 vertes « contre » 17 autres : le dénominateur doit compter AUSSI
        // les boules favorables.
        { valeur: '3/17', piege: 'favorables-sur-defavorables' },
        // Trois couleurs, donc une chance sur trois : on a compté les
        // catégories au lieu des objets.
        { valeur: '1/3', piege: 'equiprobabilite-supposee' },
      ],
    },
    {
      // NEUTRE. L’énoncé affirme lui-même que les vingt faces ont exactement la
      // même chance : supposer l’équiprobabilité est ici CORRECT, et l’élève
      // qui porte cette confusion répond juste. Sans cet item, « on me parle
      // d’un objet à plusieurs résultats, donc je me méfie de l’équiprobabilité »
      // deviendrait une règle — l’erreur symétrique, tout aussi coûteuse.
      id: 'e-16-1-6', type: 'calcul', palier: 2, neutre: true, piege: 'equiprobabilite-supposee',
      consigne:
        'On lance une fois un dé équilibré à 20 faces, numérotées de 1 à 20 : '
        + 'les 20 faces ont exactement la même chance de sortir. Quelle est la '
        + 'probabilité d’obtenir la face numéro 13 ? Donne la réponse en '
        + 'écriture décimale.',
      enonce: '\\text{dé équilibré à 20 faces numérotées de 1 à 20, toutes de même chance — un seul lancer}',
      attendu: 0.05,
      fausses: [
        // « Une chance sur 20 » écrit 20 : une probabilité ne dépasse jamais 1.
        { valeur: 20, piege: 'probabilite-hors-des-bornes' },
      ],
    },
    {
      id: 'e-16-1-7', type: 'calcul', palier: 2, piege: 'sophisme-du-joueur',
      consigne:
        'Une urne contient 24 boules indiscernables au toucher : 12 rouges et '
        + '12 noires. On tire une boule au hasard, on note sa couleur et on la '
        + 'REMET dans l’urne. Les quatre derniers tirages ont donné quatre '
        + 'boules noires. On fait un nouveau tirage. Quelle est la probabilité '
        + 'd’obtenir une boule rouge ? Donne la réponse en écriture décimale.',
      enonce:
        '\\text{urne : 12 boules rouges et 12 noires, soit 24 boules — tirages AVEC remise} \\quad '
        + '\\text{les quatre derniers tirages : quatre boules noires}',
      attendu: 0.5,
      fausses: [
        // 12 ÷ 20 : on a retiré de l’urne les quatre noires sorties, alors
        // qu’on les y a remises. L’urne n’a pas changé.
        { valeur: 0.6, piege: 'sophisme-du-joueur' },
        // Aucune rouge dans les quatre derniers tirages : la fréquence
        // observée vaut 0, et on la prend pour la probabilité.
        { valeur: 0, piege: 'frequence-et-probabilite-confondues' },
      ],
    },

    // ── Palier 3 : juger une affirmation, relire un raisonnement, réfuter ───
    {
      id: 'e-16-1-8', type: 'plausible', palier: 3, piege: 'frequence-et-probabilite-confondues',
      consigne: 'Ce raisonnement est-il plausible ?',
      enonce:
        '\\text{Un dé équilibré à 6 faces numérotées de 1 à 6 a été lancé 50 fois : le 6 est sorti 12 fois.} \\quad '
        + '\\text{Quelqu’un affirme : « la fréquence du 6 dans cette série vaut 0,24, alors que la probabilité } '
        + '\\text{d’obtenir 6 au prochain lancer vaut un sixième ». }',
      attendu: true,
      fausses: [
        // Répondre « non » ici, c’est exiger que les deux nombres soient égaux
        // — c’est-à-dire confondre la fréquence et la probabilité.
        { valeur: false, piege: 'frequence-et-probabilite-confondues' },
      ],
      explication:
        'Les deux nombres sont justes, et ils n’ont aucune raison d’être '
        + 'égaux. 12 ÷ 50 = 0,24 : c’est la fréquence, elle décrit ce qui EST '
        + 'SORTI pendant ces 50 lancers-là. Un sixième, c’est la probabilité : '
        + 'elle se lit sur le dé — six faces de même chance, une seule porte le '
        + '6. Sur 50 lancers, un écart entre les deux est même tout à fait '
        + 'normal.',
    },
    {
      id: 'e-16-1-9', type: 'corriger', palier: 3, piege: 'sophisme-du-joueur',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l’erreur apparaît.',
      enonce:
        '\\text{Une urne contient 25 boules indiscernables au toucher : 15 rouges et 10 noires. On tire une boule } '
        + '\\text{au hasard, on note sa couleur et on la REMET dans l’urne.} \\quad '
        + '\\text{Les cinq premiers tirages ont donné cinq boules rouges. Quelle est la probabilité d’obtenir } '
        + '\\text{une rouge au sixième tirage ?}',
      lignes: [
        { texte: 'L’urne contient 15 boules rouges sur 25 boules en tout : à un tirage, la probabilité d’obtenir une rouge vaut 15 ÷ 25 = 0,6.', fausse: false },
        { texte: 'Cinq rouges viennent de sortir : l’urne n’en contient donc plus que 10, sur 20 boules restantes.', fausse: true },
        { texte: 'La probabilité d’obtenir une rouge au sixième tirage vaut donc 10 ÷ 20 = 0,5.', fausse: false },
      ],
      explication:
        'La première ligne lit l’urne correctement, et la troisième calcule '
        + 'juste à partir de la deuxième. C’est la deuxième qui casse tout : '
        + 'l’énoncé dit qu’on REMET la boule après chaque tirage. L’urne '
        + 'contient donc encore 15 rouges et 10 noires, exactement comme avant '
        + 'le premier tirage — les cinq rouges sorties ne sont écrites nulle '
        + 'part dedans. La probabilité vaut encore 15 ÷ 25 = 0,6 au sixième '
        + 'tirage. Si l’énoncé avait dit « sans remise », la deuxième ligne '
        + 'serait juste : c’est le seul mot qui décide.',
    },
    {
      id: 'e-16-1-10', type: 'vraifaux', palier: 3, piege: 'frequence-et-probabilite-confondues',
      consigne: 'Vrai ou faux ? Si c’est faux, donne un contre-exemple.',
      affirmation:
        'Quand on lance une pièce équilibrée un certain nombre de fois, la '
        + 'fréquence de « pile » obtenue est égale à la probabilité d’obtenir pile.',
      attendu: false,
      contreExemple: {
        // On ne demande pas de réciter « ça dépend » : on fait CALCULER les
        // deux fréquences. Un élève qui écrit lui-même 0,64 puis 0,44 pour la
        // MÊME pièce voit qu’aucun des deux ne peut être « la » probabilité —
        // et il n’a pas à nous croire sur parole.
        invite:
          'Voici deux séries de 25 lancers faites avec LA MÊME pièce '
          + 'équilibrée. La première a donné 16 piles, la seconde 11 piles. '
          + 'Donne la fréquence de pile de la première série, puis celle de la '
          + 'seconde, en écriture décimale.',
        champs: [
          { id: 'a', etiquette: 'fréquence de pile dans la première série' },
          { id: 'b', etiquette: 'fréquence de pile dans la seconde série' },
        ],
        valide: (a, b) => Math.abs(a - 0.64) < 1e-9 && Math.abs(b - 0.44) < 1e-9,
        temoin: [0.64, 0.44],
        exemple:
          'La première série donne 16 ÷ 25 = 0,64, la seconde 11 ÷ 25 = 0,44. '
          + 'C’est la même pièce, et pourtant les deux fréquences diffèrent : '
          + 'elles ne peuvent donc pas être toutes les deux « la » probabilité '
          + 'd’obtenir pile. La probabilité, elle, ne bouge pas — elle se lit '
          + 'sur la pièce : deux faces de même chance, une seule est pile, donc '
          + '0,5.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-16-1-1',
      enonce:
        'Dans une classe, on a placé dans un sac 20 jetons indiscernables au '
        + 'toucher : 6 verts et 14 rouges. Chaque élève tire un jeton au '
        + 'hasard, note sa couleur, puis le REMET dans le sac. Après 50 '
        + 'tirages, on a compté 17 jetons verts.',
      questions: [
        { texte: 'Quelle est la fréquence des jetons verts sur ces 50 tirages ? Donne-la en écriture décimale.', attendu: 0.34 },
        { texte: 'Quelle est la probabilité qu’un tirage donne un jeton vert ? Donne-la en écriture décimale.', attendu: 0.3 },
        { texte: 'Le 51ᵉ tirage a donné un jeton rouge. Quelle est la probabilité que le 52ᵉ tirage donne un jeton vert ? Écriture décimale.', attendu: 0.3 },
      ],
    },
    {
      // Trois couleurs ne font pas trois chances égales, et deux catégories
      // (jaune / bleu) n’en font pas deux : le problème s’appuie sur des
      // secteurs identiques, donc sur des issues vraiment interchangeables.
      id: 'p-16-1-2',
      enonce:
        'Une roue de loterie est partagée en 10 secteurs identiques, numérotés '
        + 'de 1 à 10. La roue est parfaitement équilibrée : chaque secteur a la '
        + 'même chance de s’arrêter devant le repère. Les secteurs 1, 2 et 3 '
        + 'sont peints en jaune, les sept autres en bleu.',
      questions: [
        { texte: 'Combien la roue a-t-elle de secteurs jaunes ?', attendu: 3, unite: 'secteurs' },
        { texte: 'Quelle est la probabilité que la roue s’arrête sur un secteur jaune ? Écriture décimale.', attendu: 0.3 },
        { texte: 'Quelle est la probabilité que la roue s’arrête sur un secteur bleu ? Écriture décimale.', attendu: 0.7 },
      ],
    },
    {
      // Le cas où le passé compte VRAIMENT : sans remise, l’urne a changé, et
      // c’est ce qui empêche de retenir « les tirages précédents ne comptent
      // jamais ». Chaque question porte sur une seule épreuve.
      id: 'p-16-1-3',
      enonce:
        'Un sac contient 25 billes indiscernables au toucher : 7 noires et '
        + '18 blanches. On tire une bille au hasard : elle est noire. On ne la '
        + 'remet PAS dans le sac. On tire ensuite une seconde bille au hasard.',
      questions: [
        { texte: 'Quelle était la probabilité d’obtenir une bille noire au premier tirage ? Écriture décimale.', attendu: 0.28 },
        { texte: 'Combien de billes reste-t-il dans le sac avant le second tirage ?', attendu: 24, unite: 'billes' },
        { texte: 'Quelle est la probabilité d’obtenir une bille noire au second tirage ? Écriture décimale.', attendu: 0.25 },
      ],
    },
    {
      id: 'p-16-1-4',
      enonce:
        'Trois élèves lancent chacun le même dé équilibré à 6 faces, numérotées '
        + 'de 1 à 6. Alice fait 50 lancers et obtient 13 fois le 6. Basile fait '
        + '50 lancers et obtient 6 fois le 6. Camille fait 100 lancers et '
        + 'obtient 15 fois le 6.',
      questions: [
        { texte: 'Quelle est la fréquence du 6 dans la série d’Alice ? Écriture décimale.', attendu: 0.26 },
        { texte: 'Quelle est la fréquence du 6 dans la série de Basile ? Écriture décimale.', attendu: 0.12 },
        { texte: 'Quelle est la fréquence du 6 sur l’ensemble des 200 lancers des trois élèves ? Écriture décimale.', attendu: 0.17 },
      ],
    },
    {
      id: 'p-16-1-5',
      enonce:
        'Un sac contient 12 cartes indiscernables au toucher : 4 cartes portent '
        + 'la lettre A et 8 cartes portent la lettre B. Aucune carte ne porte '
        + 'une autre lettre. On tire une carte au hasard.',
      questions: [
        { texte: 'Quelle est la probabilité de l’événement « la carte porte un A ou un B » ?', attendu: 1 },
        { texte: 'Quelle est la probabilité de l’événement « la carte porte un C » ?', attendu: 0 },
        { texte: 'Combien de cartes B faudrait-il retirer du sac pour que « obtenir un A » et « obtenir un B » aient la même probabilité ?', attendu: 4, unite: 'cartes' },
      ],
    },
  ],

  test: [
    {
      id: 't-16-1-1', type: 'calcul',
      consigne:
        'Une urne contient 40 jetons indiscernables au toucher : 14 bleus et '
        + '26 jaunes. On en tire un au hasard. Quelle est la probabilité '
        + 'd’obtenir un jeton bleu ? Donne la réponse en écriture décimale.',
      enonce: '\\text{urne : 14 jetons bleus et 26 jaunes, soit 40 jetons — un seul tirage}',
      attendu: 0.35,
      fausses: [{ valeur: 0.5, piege: 'equiprobabilite-supposee' }],
      revoir: 'definition',
    },
    {
      id: 't-16-1-2', type: 'calcul',
      consigne:
        'Une pièce équilibrée a été lancée 50 fois : elle a donné 31 piles. '
        + 'Quelle est la fréquence de « pile » dans cette série ? Donne la '
        + 'réponse en écriture décimale.',
      enonce: '\\text{série observée : 31 piles en 50 lancers d’une pièce équilibrée}',
      attendu: 0.62,
      // Répondre 0,5, c’est donner la probabilité là où on demandait ce qui a
      // été observé : la confusion joue dans ce sens-là aussi.
      fausses: [{ valeur: 0.5, piege: 'frequence-et-probabilite-confondues' }],
      revoir: 'propriete',
    },
    {
      id: 't-16-1-3', type: 'calcul',
      consigne:
        'On lance une pièce équilibrée 40 fois : elle donne 26 piles. On la '
        + 'lance une 41ᵉ fois. Quelle est la probabilité d’obtenir pile à ce '
        + '41ᵉ lancer ? Donne la réponse en écriture décimale.',
      enonce: '\\text{pièce équilibrée — série observée : 26 piles en 40 lancers}',
      attendu: 0.5,
      fausses: [{ valeur: 0.65, piege: 'frequence-et-probabilite-confondues' }],
      revoir: 'propriete',
    },
    {
      id: 't-16-1-4', type: 'fraction',
      consigne:
        'Un sac contient 2 boules blanches, 5 boules noires et 7 boules grises, '
        + 'indiscernables au toucher. On en tire une au hasard. Quelle est la '
        + 'probabilité d’obtenir une boule noire ? Donne la réponse sous forme '
        + 'de fraction irréductible.',
      enonce: '\\text{sac : 2 boules blanches, 5 noires et 7 grises — un seul tirage}',
      attendu: [5, 14],
      fausses: [
        { valeur: '5/9', piege: 'favorables-sur-defavorables' },
        { valeur: '1/3', piege: 'equiprobabilite-supposee' },
      ],
      revoir: 'definition',
    },
    {
      id: 't-16-1-5', type: 'trous',
      consigne:
        'Une boîte contient 30 crayons indiscernables au toucher : 12 rouges et '
        + '18 verts, et aucun autre crayon. On en tire un au hasard. Complète '
        + 'les deux probabilités, en écriture décimale.',
      enonce:
        '\\text{probabilité que le crayon soit rouge ou vert : } \\square \\qquad '
        + '\\text{probabilité que le crayon soit noir : } \\square',
      champs: [
        { id: 'a', etiquette: 'probabilité que le crayon soit rouge ou vert', attendu: 1 },
        { id: 'b', etiquette: 'probabilité que le crayon soit noir', attendu: 0 },
      ],
      fausses: [{ valeur: 30, piege: 'probabilite-hors-des-bornes' }],
      revoir: 'propriete',
    },
    {
      id: 't-16-1-6', type: 'plausible',
      consigne: 'Ce raisonnement est-il plausible ?',
      enonce:
        '\\text{Une urne contient 4 boules rouges et 16 noires, indiscernables au toucher. On tire une boule au } '
        + '\\text{hasard, on note sa couleur et on la REMET dans l’urne.} \\quad '
        + '\\text{Six boules noires viennent de sortir de suite. Quelqu’un affirme : « au tirage suivant, une } '
        + '\\text{rouge a maintenant plus d’une chance sur cinq de sortir ». }',
      attendu: false,
      explication:
        'L’urne contient 4 boules rouges sur 20, soit une chance sur cinq — '
        + '0,2 — à chaque tirage. Et comme on REMET la boule à chaque fois, '
        + 'l’urne n’a pas changé : elle contient encore 4 rouges et 16 noires, '
        + 'exactement comme au départ. Les six noires déjà sorties ne sont '
        + 'écrites nulle part dedans. La probabilité d’obtenir une rouge vaut '
        + 'encore 0,2, ni plus ni moins.',
      piege: 'sophisme-du-joueur', revoir: 'remarque',
    },
    {
      id: 't-16-1-7', type: 'plausible',
      consigne: 'Ce raisonnement est-il plausible ?',
      enonce:
        '\\text{Un dé équilibré à 6 faces numérotées de 1 à 6 a été lancé 40 fois : le 2 est sorti 9 fois.} \\quad '
        + '\\text{Quelqu’un affirme : « la fréquence du 2 dans cette série vaut 0,225, alors que la probabilité } '
        + '\\text{d’obtenir 2 à un lancer vaut un sixième ». }',
      attendu: true,
      fausses: [{ valeur: false, piege: 'frequence-et-probabilite-confondues' }],
      explication:
        'Les deux nombres sont justes et n’ont pas à être égaux. 9 ÷ 40 = 0,225 '
        + 'décrit ce qui est sorti pendant ces 40 lancers : c’est une '
        + 'fréquence. Un sixième se lit sur le dé — six faces de même chance, '
        + 'une seule porte le 2 : c’est la probabilité. Sur 40 lancers, un '
        + 'écart entre les deux est normal.',
      revoir: 'propriete',
    },
    {
      id: 't-16-1-8', type: 'corriger',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l’erreur apparaît.',
      enonce:
        '\\text{Une urne contient 3 boules blanches et 9 boules noires, indiscernables au toucher.} \\quad '
        + '\\text{On tire une boule au hasard. Quelle est la probabilité d’obtenir une boule blanche ?}',
      lignes: [
        { texte: 'Il y a deux résultats possibles : « blanche » et « noire ».', fausse: false },
        { texte: 'Ces deux résultats ont donc la même chance de sortir.', fausse: true },
        { texte: 'La probabilité d’obtenir une boule blanche vaut donc 1 ÷ 2 = 0,5.', fausse: false },
      ],
      explication:
        'La première ligne est exacte : il n’y a bien que deux couleurs dans '
        + 'l’urne. Et la troisième calcule correctement à partir de la '
        + 'deuxième. C’est la deuxième qui casse tout : compter deux résultats '
        + 'ne dit rien de leurs chances. Ce sont les BOULES qui sont '
        + 'interchangeables, pas les couleurs — il y en a 12, dont 3 blanches. '
        + 'La probabilité vaut 3 ÷ 12 = 0,25.',
      piege: 'equiprobabilite-supposee', revoir: 'remarque',
    },
    {
      // Le cas discriminant : ici l’urne a VRAIMENT changé, et répondre « rien
      // n’a changé » est faux. Un élève qui aurait retenu du savoir-faire la
      // seule formule « les tirages précédents ne comptent jamais » tombe ici.
      id: 't-16-1-9', type: 'calcul',
      consigne:
        'Un sac contient 25 jetons indiscernables au toucher : 13 rouges et '
        + '12 bleus. On tire un jeton au hasard : il est rouge, et on ne le '
        + 'remet PAS dans le sac. On tire alors un second jeton au hasard. '
        + 'Quelle est la probabilité qu’il soit rouge ? Donne la réponse en '
        + 'écriture décimale.',
      enonce:
        '\\text{sac : 13 jetons rouges et 12 bleus, soit 25 jetons — tirage SANS remise} \\quad '
        + '\\text{le premier jeton tiré était rouge, il n’est pas remis dans le sac}',
      attendu: 0.5,
      // 13 ÷ 25 : on a supposé que le sac n’avait pas changé alors qu’on n’a
      // pas remis le jeton. Le contrôle du piège tranche exactement ce cas.
      fausses: [{ valeur: 0.52, piege: 'sophisme-du-joueur' }],
      revoir: 'remarque',
    },
    {
      id: 't-16-1-10', type: 'trous',
      consigne:
        'Une urne contient 50 billes indiscernables au toucher : 15 rouges, '
        + '5 vertes et 30 bleues. On en tire une au hasard. Complète les deux '
        + 'probabilités, en écriture décimale.',
      enonce:
        '\\text{probabilité d’obtenir une bille rouge : } \\square \\qquad '
        + '\\text{probabilité d’obtenir une bille verte : } \\square',
      champs: [
        { id: 'a', etiquette: 'probabilité d’obtenir une bille rouge', attendu: 0.3 },
        { id: 'b', etiquette: 'probabilité d’obtenir une bille verte', attendu: 0.1 },
      ],
      // 15, c’est le nombre de billes rouges : une probabilité ne dépasse
      // jamais 1.
      fausses: [{ valeur: 15, piege: 'probabilite-hors-des-bornes' }],
      revoir: 'exemple',
    },
  ],
};
