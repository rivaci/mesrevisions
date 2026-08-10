// Chapitre 16, savoir-faire 3 — Utiliser l'événement contraire.
//
// ── La formule tient en six caractères ; ce qu'elle exige, non ────────────
//
// « p(contraire) = 1 − p » se recopie au tableau en trois secondes, et un
// savoir-faire qui se contenterait de la faire appliquer serait une page de
// soustractions. Le travail réel est ailleurs, et il est double.
//
// D'abord, DIRE ce qu'est le contraire. Le contraire d'un événement rassemble
// tout ce qui n'est pas lui — pas une autre catégorie choisie parmi plusieurs,
// pas « la même chose en un peu moins ». Un élève à qui l'on demande le
// contraire de « tirer un jeton vert » dans un sac qui contient aussi du rouge
// et du bleu répond très souvent « tirer un jeton rouge » : il n'a pas raté un
// calcul, il a formé un contraire qui laisse les bleus dehors. C'est exactement
// ce que met en scène e-16-3-9, et le contrôle du chapitre l'attrape sans rien
// recalculer : 0,25 + 0,35 ne fait pas 1.
//
// Ensuite, « au moins un ». Le contraire de « au moins un » est « aucun », et
// la formulation qui trompe — « au moins un AUTRE » — est nommée dans le piège
// lui-même. Elle est jugée deux fois, une fois où elle est absente et la phrase
// correcte (e-16-3-8, réponse « plausible »), une fois où elle est présente et
// la phrase fausse (t-16-3-10). Un élève qui répondrait toujours pareil se fait
// prendre à l'un des deux.
//
// ── Pourquoi la découverte ne fait aucune soustraction ────────────────────
//
// Elle fait calculer DEUX probabilités par comptage direct, sur la même urne :
// 9 billes vertes sur 25, puis 16 billes non vertes sur 25. L'élève écrit 0,36
// et 0,64, et c'est lui qui constate que la somme fait exactement 1. La règle
// 1 − p n'est alors plus une formule à croire : c'est le raccourci d'un fait
// qu'il vient de vérifier à la main. C'est aussi ce que refait le contre-exemple
// de e-16-3-10, avec d'autres nombres, contre l'idée que le contraire
// s'obtiendrait en changeant le signe.
//
// ── Les trois items neutres, et ce que chacun casse ───────────────────────
//
// e-16-3-1 ne demande aucun contraire : on tire une boule et on donne la
// probabilité qu'elle soit rouge, point. Le piège du savoir-faire ne peut pas y
// jouer, et c'est justement ce qui le rend indispensable — sans lui, « on me
// parle de probabilités dans ce savoir-faire, donc je fais 1 moins quelque
// chose » traverserait tout le lot. Ses trois fausses pointent vers d'AUTRES
// pièges.
//
// e-16-3-3 ne demande aucune probabilité : deux nombres de jetons, celui de
// l'événement et celui de son contraire. Un résultat hors de l'intervalle
// [0 ; 1] n'a aucun sens ici puisqu'on compte des objets — le piège des bornes
// est donc neutralisé, et c'est lui que le champ « piege » nomme. En revanche
// un contraire mal formé s'y voit tout de suite, d'où la fausse à 60.
//
// e-16-3-4 dit explicitement qu'il s'agit du tout premier tirage et qu'aucun
// jeton n'a été tiré avant. Sans passé, le sophisme du joueur ne peut pas
// produire d'erreur ; ses trois fausses pointent vers d'autres pièges.
//
// ── Avec remise, sans remise : le contraire de QUOI, et à QUEL moment ─────
//
// « 1 − p » suppose qu'on connaisse p, et p se lit sur l'objet AU MOMENT du
// tirage. Le lot contient donc les deux cas, et ils se contredisent : e-16-3-7
// est sans remise (l'urne a changé, il faut la recompter avant de soustraire)
// et t-16-3-9 est avec remise (rien n'a changé, malgré cinq tirages perdants de
// suite). Un élève qui aurait retenu « les tirages précédents ne comptent
// jamais » échoue au premier ; celui qui aurait retenu l'inverse échoue au
// second. Chaque énoncé concerné dit explicitement s'il y a remise ou non.
//
// ── Aucune figure, et aucun résultat approché ─────────────────────────────
//
// Tout est écrit en toutes lettres : le contenu exact de chaque sac, le nombre
// de secteurs de chaque roue, ce qui a déjà été tiré et s'il a été remis. Il
// n'y a pas de calculatrice dans l'application et les résultats sont comparés
// au milliardième : les effectifs sont donc tous choisis pour que la
// probabilité tombe exactement juste en écriture décimale (sur 20, 25, 40, 50,
// 200, 250), ou pour que la fraction demandée soit DÉJÀ irréductible — 7/15,
// 19/24, 11/20. La consigne exige la forme irréductible à chaque fois qu'une
// fraction est demandée, et jamais ailleurs.
//
// Les valeurs fausses ont subi le même traitement, sans quoi elles ne seraient
// jamais tapées telles quelles et le diagnostic ne se déclencherait pas :
// 5 ÷ 20 = 0,25 dans e-16-3-1, 10 ÷ 40 = 0,25 dans t-16-3-4, et surtout
// 6 ÷ 15 = 0,4 dans t-16-3-9, la valeur que produit le sophisme du joueur.
//
// ── Ce que ce savoir-faire ne couvre pas ──────────────────────────────────
//
// Le programme de 4e s'en tient aux expériences à UNE SEULE épreuve : ni arbre
// à deux niveaux, ni probabilité composée, ni indépendance. « Au moins un » n'y
// désigne donc jamais « au moins un tirage parmi plusieurs », mais toujours une
// propriété de l'objet unique qu'on vient de tirer : un jeton qui porte au
// moins une étoile, un élève qui possède au moins un animal. Les tirages
// successifs qui apparaissent servent uniquement à savoir ce que contient le
// sac au moment où l'on tire — on recompte, on ne multiplie rien.
//
// Le calcul de p par « favorables ÷ possibles » et la distinction entre
// fréquence et probabilité sont travaillés par les deux savoir-faire
// précédents, et ils ne reviennent pas ici au même titre. Le premier reste
// bien présent, mais comme MOYEN : on ne peut pas retirer p à 1 sans connaître
// p, et plusieurs items le font écrire explicitement avant le contraire
// (e-16-3-2, t-16-3-2, p-16-3-1) ; e-16-3-1 est le seul à s'y arrêter, et
// c'est parce qu'il est neutre. La distinction fréquence/probabilité, elle,
// n'apparaît qu'une fois et seulement dans une réponse fausse — la valeur 1 de
// t-16-3-9 — pour que l'élève qui bute encore dessus soit tout de même
// diagnostiqué.

export default {
  id: 'sf-16-3',
  titre: 'Utiliser l’événement contraire',
  attendus: [
    'Il détermine la probabilité de l’événement contraire d’un événement donné.',
    'Il reconnaît que la probabilité d’un événement et celle de son événement contraire ont pour somme 1.',
  ],

  // On ne donne pas la formule : on fait calculer deux probabilités par
  // comptage direct sur la même urne, et c’est l’élève qui trouve une somme
  // égale à 1 là où il n’attendait rien de particulier.
  decouvrir: {
    titre: 'Deux probabilités qui se partagent le nombre 1',
    texte:
      'Une urne contient 25 billes indiscernables au toucher : 9 billes vertes, '
      + 'et 16 billes qui ne sont pas vertes (elles sont rouges ou bleues). On '
      + 'en tire une au hasard : chaque bille a la même chance d’être tirée. '
      + 'Voici le compte des billes.',
    lignes: [
      { calcul: 'billes vertes', resultat: '9 billes' },
      { calcul: 'billes qui ne sont pas vertes', resultat: '16 billes' },
      { calcul: 'billes en tout', resultat: '25 billes' },
    ],
    question:
      'Donne la probabilité de tirer une bille verte, puis la probabilité de '
      + 'tirer une bille qui n’est pas verte. Les deux en écriture décimale.',
    champs: [
      { id: 'a', etiquette: 'probabilité de tirer une bille verte', attendu: 0.36 },
      { id: 'b', etiquette: 'probabilité de tirer une bille qui n’est pas verte', attendu: 0.64 },
    ],
    conclusion:
      'Tu obtiens 9 ÷ 25 = **0,36** et 16 ÷ 25 = **0,64**. Additionne les deux : '
      + '0,36 + 0,64 = **1**, exactement.\n'
      + 'Ce n’est pas une coïncidence. Chaque bille de l’urne est comptée une '
      + 'fois et une seule : ou bien elle est verte, ou bien elle ne l’est pas. '
      + 'Les deux comptes se partagent les 25 billes sans en oublier aucune et '
      + 'sans en compter deux fois ; les deux probabilités se partagent donc le '
      + 'nombre 1.\n'
      + 'C’est ce qui permet d’obtenir la seconde **sans recompter** : '
      + '1 − 0,36 = 0,64. Tout ce que dit la règle de l’événement contraire est '
      + 'déjà dans cette addition.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'L’événement contraire',
      texte:
        'Le **contraire** d’un événement A est l’événement qui rassemble '
        + '**toutes les issues qui ne réalisent pas A**, et elles seules. On le '
        + 'note souvent « non A ».\n'
        + 'Deux conditions, et elles vont ensemble : aucune issue ne doit être '
        + 'laissée dehors, et aucune ne doit se trouver dans les deux à la fois. '
        + 'Chaque issue de l’expérience est donc dans A, ou dans son contraire — '
        + 'jamais dans les deux, jamais dans aucun des deux.',
    },
    {
      type: 'propriete',
      titre: 'p(A) + p(non A) = 1',
      texte:
        'Un événement et son contraire se partagent toutes les issues : la somme '
        + 'de leurs probabilités vaut donc **exactement 1**.\n'
        + '**p(non A) = 1 − p(A)**, et de la même façon p(A) = 1 − p(non A).\n'
        + 'C’est un raccourci de calcul : il évite de recompter les cas '
        + 'favorables du contraire quand on connaît déjà ceux de A.',
    },
    {
      type: 'remarque',
      titre: 'Rédiger le contraire en toutes lettres',
      texte:
        'Avant de soustraire quoi que ce soit, écris la phrase du contraire.\n'
        + 'Le contraire de « la boule est verte » est « la boule n’est PAS '
        + 'verte » — et non « la boule est rouge », même quand le rouge est là. '
        + 'S’il y a aussi des bleues, les dire rouges les laisserait dehors.\n'
        + 'Le contraire de « **au moins un** » est « **aucun** ». Le contraire '
        + 'de « aucun » est « au moins un ».\n'
        + 'La formulation qui trompe, c’est « au moins un **autre** » : elle '
        + 'décrit encore des objets qui réalisent l’événement de départ, donc '
        + 'elle n’en est pas le contraire.',
    },
    {
      type: 'remarque',
      titre: 'Le contraire n’est pas l’opposé',
      texte:
        'On calcule **1 − p**, jamais **−p**.\n'
        + 'Une probabilité n’est jamais négative et ne dépasse jamais 1. Un '
        + 'résultat négatif, ou plus grand que 1, signale une opération faite de '
        + 'travers : −p au lieu de 1 − p, p − 1 au lieu de 1 − p, ou 1 + p au '
        + 'lieu de 1 − p.\n'
        + 'Le contrôle est le même dans tous les cas : additionne les deux '
        + 'probabilités. Elles doivent faire **exactement 1**. Si la somme ne '
        + 'fait pas 1, regarde d’abord tes deux nombres. L’un est négatif, ou '
        + 'plus grand que 1 ? C’est l’opération qui est fautive : signe changé, '
        + 'soustraction prise à l’envers, ou addition mise à sa place. Les deux '
        + 'sont bien entre 0 et 1 ? C’est alors le contraire qui est mal formé — '
        + 'en dessous de 1 il laisse des issues sans camp, au-dessus il empiète '
        + 'sur l’événement de départ.',
    },
    {
      type: 'remarque',
      titre: 'Le contraire se lit sur l’objet du moment',
      texte:
        '« 1 − p » ne vaut quelque chose que si p est la bonne probabilité, '
        + 'c’est-à-dire celle du tirage qu’on est en train de faire.\n'
        + 'Tirage **avec remise** : l’objet est remis, le sac est exactement le '
        + 'même qu’avant, et p ne change pas — quels que soient les tirages déjà '
        + 'sortis. Un sac, un dé, une pièce n’ont pas de mémoire.\n'
        + 'Tirage **sans remise** : le sac a réellement changé. Il faut le '
        + 'recompter, calculer le nouveau p, et seulement ensuite faire 1 − p.\n'
        + 'La question qui décide : **qu’est-ce qui a changé dans le sac ?** — et '
        + 'c’est le mot « remise » qui répond, jamais l’impression que « ça doit '
        + 'bien finir par s’équilibrer ».',
    },
    {
      type: 'exemple',
      titre: 'Passer d’un événement à son contraire',
      texte:
        'Un sac contient 60 billes indiscernables au toucher, dont 12 billes '
        + 'dorées. La probabilité de tirer une bille dorée vaut 12 ÷ 60 = 0,2. '
        + 'Celle de tirer une bille qui n’est pas dorée vaut donc '
        + '1 − 0,2 = 0,8. Contrôle : 0,2 + 0,8 = 1. On peut aussi recompter, et '
        + 'c’est rassurant la première fois : 48 billes ne sont pas dorées, et '
        + '48 ÷ 60 = 0,8. Le même nombre, obtenu sans la règle.\n'
        + 'Une roue est partagée en 50 secteurs identiques, chacun ayant la même '
        + 'chance, dont 35 secteurs rouges. La probabilité de s’arrêter sur un '
        + 'secteur rouge vaut 35 ÷ 50 = 0,7 ; celle de s’arrêter sur un secteur '
        + 'qui n’est pas rouge vaut 1 − 0,7 = 0,3. Là encore 0,7 + 0,3 = 1, et '
        + 'aucun secteur n’a été oublié.',
    },
    {
      type: 'exemple',
      titre: 'Rédiger le contraire, puis le calculer',
      texte:
        'Dans un club de 250 membres, 190 membres possèdent au moins un vélo. On '
        + 'choisit un membre au hasard, chacun ayant la même chance d’être '
        + 'choisi. L’événement « le membre choisi possède au moins un vélo » a '
        + 'pour contraire « le membre choisi ne possède AUCUN vélo » : c’est bien '
        + 'la phrase qui rassemble tous les autres membres, et rien qu’eux. La '
        + 'probabilité du premier vaut 190 ÷ 250 = 0,76, celle du second '
        + '1 − 0,76 = 0,24. Contrôle : 0,76 + 0,24 = 1, et 250 − 190 = 60 membres '
        + 'sans vélo, soit 60 ÷ 250 = 0,24.\n'
        + 'Une boîte contient 50 perles indiscernables au toucher : 7 perles ne '
        + 'portent aucun motif, les 43 autres portent au moins un motif. Le '
        + 'contraire de « la perle porte au moins un motif » n’est pas « la perle '
        + 'porte au moins un autre motif » — cette phrase-là décrit encore des '
        + 'perles à motif, et elle laisserait les 7 perles nues sans aucun camp. '
        + 'C’est « la perle ne porte aucun motif », de probabilité '
        + '7 ÷ 50 = 0,14 ; l’événement de départ vaut donc 1 − 0,14 = 0,86.',
    },
    {
      type: 'exemple',
      titre: 'Avec remise, sans remise : recompter avant de soustraire',
      texte:
        'AVEC REMISE. Un sac contient 50 jetons indiscernables au toucher : 11 '
        + 'jetons blancs et 39 jetons noirs. On tire un jeton, on note sa '
        + 'couleur, et on le REMET. Quatre jetons noirs viennent de sortir de '
        + 'suite. Au tirage suivant, le sac contient toujours 11 blancs sur 50 : '
        + 'la probabilité d’obtenir un blanc vaut encore 11 ÷ 50 = 0,22, et celle '
        + 'de ne pas obtenir de blanc 1 − 0,22 = 0,78. Les quatre noirs déjà '
        + 'sortis ne sont écrits nulle part dans le sac.\n'
        + 'SANS REMISE. Un sac contient 21 jetons indiscernables au toucher : 9 '
        + 'rouges et 12 noirs. On tire un jeton, il est rouge, et on le GARDE. Le '
        + 'sac contient alors 20 jetons dont 8 rouges. Au tirage suivant, la '
        + 'probabilité d’obtenir un rouge vaut 8 ÷ 20 = 0,4, et celle de ne pas '
        + 'en obtenir 1 − 0,4 = 0,6. On a recompté le sac AVANT de soustraire : '
        + 'partir de l’ancien 9 ÷ 21 aurait faussé les deux résultats à la fois.',
    },
  ],

  methode: {
    titre: 'Écrire le contraire, puis retirer p à 1',
    enonce:
      'Un sac contient 50 jetons indiscernables au toucher : 6 jetons gagnants '
      + 'et 44 jetons perdants. On en tire un au hasard. Quelle est la '
      + 'probabilité de NE PAS gagner ?',
    etapes: [
      {
        texte: 'Je nomme l’événement dont je sais compter les cas : « le jeton tiré est gagnant ». Il y a 6 jetons gagnants sur 50.',
        note: 'On part toujours de celui qui se compte le plus facilement.',
      },
      {
        texte: 'J’écris son contraire en toutes lettres : « le jeton tiré n’est pas gagnant », c’est-à-dire « le jeton tiré est perdant ». Aucun jeton n’est laissé dehors, aucun n’est dans les deux.',
        note: 'Cette phrase se rédige AVANT tout calcul : c’est elle qui décide du reste.',
      },
      {
        texte: 'Je calcule la probabilité de l’événement de départ : 6 ÷ 50 = 0,12.',
        note: 'Le dénominateur est le total, 50, et il compte aussi les 6 gagnants.',
      },
      {
        texte: 'Je passe au contraire en retirant p à la certitude : 1 − 0,12 = 0,88.',
        note: 'C’est 1 − p, jamais −p : une probabilité n’est jamais négative.',
      },
    ],
    controle:
      'Le contrôle tient en une addition, et il ne demande aucune '
      + 'calculatrice : les deux probabilités doivent faire **exactement 1**. '
      + 'Ici 0,12 + 0,88 = 1, le compte y est. Si j’avais changé le signe, '
      + 'j’aurais annoncé −0,12, et 0,12 + (−0,12) = 0 : les deux événements ne '
      + 'couvriraient plus rien du tout. Si j’avais formé un contraire trop '
      + 'étroit — seulement une partie des jetons perdants — la somme serait '
      + 'restée en dessous de 1, et des jetons se retrouveraient sans camp.\n'
      + 'Deuxième contrôle, quand les nombres le permettent : recompte. 44 '
      + 'jetons ne sont pas gagnants, et 44 ÷ 50 = 0,88. Le même résultat, '
      + 'obtenu sans la règle. Dernier coup d’œil, enfin : une probabilité reste '
      + 'entre 0 et 1.',
  },

  entrainement: [
    // ── Palier 1 : compter d’abord, puis passer au contraire ────────────────
    {
      // NEUTRE. Aucun contraire n’est demandé : on lit la probabilité sur l’urne
      // et c’est tout. Le piège du savoir-faire ne peut donc pas produire
      // d’erreur ici — et c’est exactement pour ça que l’item est indispensable :
      // sans lui, « dans ce savoir-faire je fais 1 moins quelque chose »
      // réussirait partout et deviendrait la règle apprise. Les trois fausses
      // pointent vers d’AUTRES pièges.
      id: 'e-16-3-1', type: 'calcul', palier: 1, neutre: true, piege: 'contraire-mal-forme',
      consigne:
        'Une urne contient 25 boules indiscernables au toucher : 5 boules rouges '
        + 'et 20 boules noires. On en tire une au hasard. Quelle est la '
        + 'probabilité d’obtenir une boule rouge ? Donne la réponse en écriture '
        + 'décimale.',
      enonce: '\\text{urne : 5 boules rouges et 20 boules noires, soit 25 boules — un seul tirage}',
      attendu: 0.2,
      fausses: [
        // 5 ÷ 20 : les rouges rapportées aux seules noires. Le total compte
        // AUSSI les rouges.
        { valeur: 0.25, piege: 'favorables-sur-defavorables' },
        // Deux couleurs, donc une chance sur deux — alors qu’il y a quatre fois
        // plus de noires que de rouges.
        { valeur: 0.5, piege: 'equiprobabilite-supposee' },
        // 25 ÷ 5 : le quotient à l’envers, et le résultat dépasse largement 1.
        { valeur: 5, piege: 'probabilite-hors-des-bornes' },
      ],
    },
    {
      id: 'e-16-3-2', type: 'trous', palier: 1, piege: 'contraire-mal-forme',
      consigne:
        'Une roue est partagée en 20 secteurs identiques, chacun ayant la même '
        + 'chance de s’arrêter devant le repère : 3 secteurs sont gagnants et 17 '
        + 'secteurs sont perdants. On la fait tourner une fois. Complète les deux '
        + 'probabilités, en écriture décimale.',
      enonce:
        '\\text{probabilité de gagner : } \\square \\qquad '
        + '\\text{probabilité de ne pas gagner : } \\square',
      champs: [
        { id: 'a', etiquette: 'probabilité de gagner', attendu: 0.15 },
        { id: 'b', etiquette: 'probabilité de ne pas gagner', attendu: 0.85 },
      ],
      fausses: [
        // L’opposé au lieu du contraire : la règle du piège dit 1 − p, et une
        // probabilité n’est jamais négative.
        { valeur: -0.15, piege: 'contraire-mal-forme' },
        // 1 + p : la soustraction faite au mauvais endroit. Le contrôle des
        // bornes suffit à l’écarter, sans refaire le calcul.
        { valeur: 1.15, piege: 'probabilite-hors-des-bornes' },
      ],
    },
    {
      // NEUTRE. On ne demande pas des probabilités mais des NOMBRES DE JETONS :
      // sortir de l’intervalle [0 ; 1] n’a aucun sens quand on compte des
      // objets, donc le piège des bornes ne peut pas jouer ici. C’est aussi
      // l’item qui isole le geste du savoir-faire : le contraire, c’est ce qui
      // reste. Les deux fausses pointent vers d’AUTRES pièges.
      id: 'e-16-3-3', type: 'trous', palier: 1, neutre: true, piege: 'probabilite-hors-des-bornes',
      consigne:
        'Un sac contient 60 jetons indiscernables au toucher. 24 jetons portent '
        + 'au moins une étoile ; les autres n’en portent aucune. On en tire un au '
        + 'hasard, et on considère l’événement « le jeton tiré porte au moins une '
        + 'étoile ». Complète les deux nombres de jetons.',
      enonce:
        '\\text{nombre de jetons qui réalisent cet événement : } \\square \\qquad '
        + '\\text{nombre de jetons qui réalisent son contraire : } \\square',
      champs: [
        { id: 'a', etiquette: 'nombre de jetons qui réalisent l’événement', attendu: 24 },
        { id: 'b', etiquette: 'nombre de jetons qui réalisent son contraire', attendu: 36 },
      ],
      fausses: [
        // 60 : tous les jetons du sac. Le contraire rassemble ce qui n’est PAS
        // l’événement — il ne peut pas contenir aussi les 24 jetons à étoile.
        { valeur: 60, piege: 'contraire-mal-forme' },
        // Deux catégories, donc moitié-moitié : 30 et 30. Ce sont les jetons
        // qu’il faut compter, pas les catégories.
        { valeur: 30, piege: 'equiprobabilite-supposee' },
      ],
    },

    // ── Palier 2 : « au moins un », et le sac au moment du tirage ───────────
    {
      // NEUTRE. L’énoncé dit que c’est le tout premier tirage et qu’aucun jeton
      // n’a été tiré avant : il n’y a pas de passé à invoquer, donc le sophisme
      // du joueur ne peut pas produire d’erreur. Les trois fausses pointent vers
      // d’AUTRES pièges — dont celui du savoir-faire, avec 8/15.
      id: 'e-16-3-4', type: 'fraction', palier: 2, neutre: true, piege: 'sophisme-du-joueur',
      consigne:
        'Un sac contient 3 jetons verts, 4 jetons bleus et 8 jetons rouges, tous '
        + 'indiscernables au toucher. On effectue un seul tirage, le tout '
        + 'premier : aucun jeton n’a été tiré avant celui-ci. Quelle est la '
        + 'probabilité que le jeton tiré NE soit PAS rouge ? Donne la réponse '
        + 'sous forme de fraction irréductible.',
      enonce:
        '\\text{sac : 3 jetons verts, 4 bleus et 8 rouges} \\quad '
        + '\\text{c’est le tout premier tirage : aucun jeton n’a été tiré avant}',
      attendu: [7, 15],
      fausses: [
        // La probabilité de l’événement lui-même, donnée à la place de celle de
        // son contraire. La règle tranche : p(non A) = 1 − p(A), donc
        // 1 − 8/15 = 7/15, et sûrement pas 8/15.
        { valeur: '8/15', piege: 'contraire-mal-forme' },
        // Les 7 non-rouges rapportées aux 8 rouges : le dénominateur doit être
        // le total.
        { valeur: '7/8', piege: 'favorables-sur-defavorables' },
        // Deux couleurs favorables sur trois couleurs : on a compté les
        // catégories au lieu des jetons.
        { valeur: '2/3', piege: 'equiprobabilite-supposee' },
      ],
    },
    {
      id: 'e-16-3-5', type: 'calcul', palier: 2, piege: 'contraire-mal-forme',
      consigne:
        'Dans un club, on choisit un enfant au hasard, chacun ayant la même '
        + 'chance d’être choisi. La probabilité que l’enfant choisi ait au moins '
        + 'un frère ou une sœur vaut 0,84. Quelle est la probabilité que l’enfant '
        + 'choisi n’ait AUCUN frère ni sœur ? Donne la réponse en écriture '
        + 'décimale.',
      enonce:
        '\\text{probabilité d’avoir au moins un frère ou une sœur : 0,84} \\quad '
        + '\\text{probabilité de n’avoir aucun frère ni sœur : ?}',
      attendu: 0.16,
      fausses: [
        // L’opposé de p : c’est exactement le raisonnement « j’ai pris −p » que
        // le piège nomme, et une probabilité n’est jamais négative.
        { valeur: -0.84, piege: 'contraire-mal-forme' },
        // 0,84 − 1 : la soustraction dans le mauvais sens. Le résultat est
        // négatif, donc impossible.
        { valeur: -0.16, piege: 'probabilite-hors-des-bornes' },
      ],
    },
    {
      id: 'e-16-3-6', type: 'plausible', palier: 2, piege: 'probabilite-hors-des-bornes',
      consigne: 'Cette affirmation est-elle plausible ?',
      enonce:
        '\\text{Un sac contient 40 jetons indiscernables au toucher, dont 30 sont noirs : la probabilité de tirer } '
        + '\\text{un jeton noir vaut donc 0,75.} \\quad '
        + '\\text{Quelqu’un annonce que la probabilité de tirer un jeton qui n’est pas noir vaut −0,75.}',
      attendu: false,
      fausses: [
        // Accepter une probabilité négative, c’est ignorer les bornes : c’est le
        // contrôle même du piège qui manque.
        { valeur: true, piege: 'probabilite-hors-des-bornes' },
      ],
      explication:
        'Une probabilité est toujours comprise entre 0 et 1 : −0,75 est '
        + 'impossible, et cela se voit sans rien recalculer. Le contraire ne '
        + 's’obtient pas en changeant le signe, mais en retirant p à la '
        + 'certitude : 1 − 0,75 = 0,25. Le contrôle le confirme, '
        + '0,75 + 0,25 = 1 exactement, alors que 0,75 + (−0,75) = 0 — les deux '
        + 'événements ne couvriraient plus rien. On peut d’ailleurs recompter : '
        + '10 jetons ne sont pas noirs, et 10 ÷ 40 = 0,25.',
    },
    {
      id: 'e-16-3-7', type: 'fraction', palier: 2, piege: 'sophisme-du-joueur',
      consigne:
        'Une urne contient 25 boules indiscernables au toucher : 6 boules rouges '
        + 'et 19 boules noires. On tire une boule au hasard : elle est rouge, et '
        + 'on ne la remet PAS dans l’urne. On tire alors une seconde boule au '
        + 'hasard. Quelle est la probabilité qu’elle NE soit PAS rouge ? Donne la '
        + 'réponse sous forme de fraction irréductible.',
      enonce:
        '\\text{urne : 6 boules rouges et 19 noires, soit 25 boules — tirage SANS remise} \\quad '
        + '\\text{la première boule tirée était rouge, elle n’est pas remise dans l’urne}',
      attendu: [19, 24],
      fausses: [
        // La composition d’AVANT le retrait. L’urne a pourtant réellement
        // changé : une boule rouge de moins, et une boule de moins en tout.
        { valeur: '19/25', piege: 'sophisme-du-joueur' },
        // L’urne est bien recomptée, mais c’est la probabilité de l’événement
        // lui-même qui est donnée, pas celle de son contraire : 1 − 5/24 = 19/24.
        { valeur: '5/24', piege: 'contraire-mal-forme' },
        // Les 19 noires rapportées aux 5 rouges restantes : le dénominateur doit
        // être le total des 24 boules.
        { valeur: '19/5', piege: 'favorables-sur-defavorables' },
      ],
    },

    // ── Palier 3 : rédiger le contraire, relire un raisonnement, réfuter ────
    {
      id: 'e-16-3-8', type: 'plausible', palier: 3, piege: 'contraire-mal-forme',
      consigne: 'Cette affirmation est-elle plausible ?',
      enonce:
        '\\text{Dans un club, on choisit un élève au hasard. On considère l’événement A : « l’élève choisi } '
        + '\\text{possède au moins un animal de compagnie ».} \\quad '
        + '\\text{Quelqu’un affirme que le contraire de A est « l’élève choisi ne possède aucun animal de compagnie ».}',
      attendu: true,
      fausses: [
        // Refuser « aucun », c’est très généralement lui préférer « au moins un
        // autre » — le raisonnement que le piège nomme mot pour mot.
        { valeur: false, piege: 'contraire-mal-forme' },
      ],
      explication:
        'La phrase proposée est bien le contraire de A. Chaque élève du club est '
        + 'dans un cas et un seul : ou bien il possède au moins un animal, ou '
        + 'bien il n’en possède aucun. Rien n’est laissé dehors, rien n’est '
        + 'compté deux fois — et les deux probabilités additionnées font donc '
        + 'exactement 1. La formulation qui trompe est « au moins un AUTRE '
        + 'animal » : elle décrit encore des élèves qui possèdent un animal, donc '
        + 'elle ne peut pas être le contraire de A. Retiens la paire : le '
        + 'contraire de « au moins un » est « aucun ».',
    },
    {
      id: 'e-16-3-9', type: 'corriger', palier: 3, piege: 'contraire-mal-forme',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l’erreur apparaît.',
      enonce:
        '\\text{Un sac contient 40 jetons indiscernables au toucher : 10 jetons verts, 14 jetons rouges et 16 jetons bleus.} '
        + '\\quad \\text{On en tire un au hasard. Quelle est la probabilité que le jeton tiré ne soit pas vert ?}',
      lignes: [
        { texte: 'Le sac contient 40 jetons, dont 10 sont verts : la probabilité de tirer un jeton vert vaut 10 ÷ 40 = 0,25.', fausse: false },
        { texte: 'Le contraire de « le jeton est vert », c’est « le jeton est rouge » : il est réalisé par les 14 jetons rouges.', fausse: true },
        { texte: 'La probabilité de tirer un jeton qui n’est pas vert vaut donc 14 ÷ 40 = 0,35.', fausse: false },
      ],
      explication:
        'La première ligne compte juste, et la troisième calcule correctement à '
        + 'partir de la deuxième. C’est la deuxième qui casse tout : le contraire '
        + 'rassemble TOUT ce qui n’est pas l’événement, donc les jetons rouges ET '
        + 'les jetons bleus, soit 14 + 16 = 30 jetons. La probabilité vaut '
        + '30 ÷ 40 = 0,75, ou aussi bien 1 − 0,25.\n'
        + 'Le contrôle le disait tout de suite, sans refaire le moindre calcul : '
        + '0,25 + 0,35 = 0,6, et non 1. Les 16 jetons bleus n’étaient ni dans '
        + 'l’événement, ni dans son prétendu contraire — ils étaient sans camp.',
    },
    {
      id: 'e-16-3-10', type: 'vraifaux', palier: 3, piege: 'contraire-mal-forme',
      consigne: 'Vrai ou faux ? Si c’est faux, donne un contre-exemple.',
      affirmation:
        'La probabilité de l’événement contraire d’un événement A s’obtient en '
        + 'changeant le signe de la probabilité de A.',
      attendu: false,
      contreExemple: {
        // On ne demande pas de réciter « c’est 1 − p » : on fait CALCULER les
        // deux probabilités par comptage direct, comme dans la découverte. Un
        // élève qui écrit lui-même 0,44 puis 0,56 voit que la seconde n’est ni
        // l’opposée de la première, ni négative — et que les deux font 1.
        invite:
          'Une urne contient 50 billes indiscernables au toucher : 22 billes '
          + 'jaunes et 28 billes qui ne sont pas jaunes. On en tire une au '
          + 'hasard. Donne la probabilité de tirer une bille jaune, puis celle de '
          + 'tirer une bille qui n’est pas jaune, les deux en écriture décimale.',
        champs: [
          { id: 'a', etiquette: 'probabilité de tirer une bille jaune' },
          { id: 'b', etiquette: 'probabilité de tirer une bille qui n’est pas jaune' },
        ],
        valide: (a, b) => Math.abs(a - 0.44) < 1e-9 && Math.abs(b - 0.56) < 1e-9,
        temoin: [0.44, 0.56],
        exemple:
          '22 billes sur 50 sont jaunes : 22 ÷ 50 = 0,44. Et 28 billes sur 50 ne '
          + 'le sont pas : 28 ÷ 50 = 0,56. Les deux additionnées font exactement '
          + '1. Si le contraire s’obtenait en changeant le signe, la seconde '
          + 'probabilité vaudrait −0,44 : un nombre négatif, qu’aucune '
          + 'probabilité ne peut valoir, et qui ne complète pas 0,44 jusqu’à 1. '
          + 'Le contraire se calcule par 1 − 0,44 = 0,56.',
      },
    },
  ],

  problemes: [
    {
      // Trois couleurs, un contraire qui en rassemble deux : la question du
      // milieu fait compter les billes avant que la dernière ne demande la
      // probabilité. C’est le même trajet que e-16-3-9, mais mené juste.
      id: 'p-16-3-1',
      enonce:
        'Une urne contient 25 billes indiscernables au toucher : 13 billes '
        + 'rouges, 5 billes vertes et 7 billes bleues. On en tire une au hasard : '
        + 'chaque bille a la même chance d’être tirée. Les probabilités sont '
        + 'demandées en écriture décimale.',
      questions: [
        { texte: 'Quelle est la probabilité de tirer une bille rouge ?', attendu: 0.52 },
        { texte: 'Combien de billes de l’urne ne sont pas rouges ?', attendu: 12, unite: 'billes' },
        { texte: 'Quelle est la probabilité de tirer une bille qui n’est pas rouge ?', attendu: 0.48 },
      ],
    },
    {
      id: 'p-16-3-2',
      enonce:
        'Une tombola met en vente 200 billets numérotés de 1 à 200. On tire un '
        + 'billet au hasard, chacun ayant la même chance d’être tiré. 8 billets '
        + 'donnent un gros lot et 26 billets donnent un petit lot ; tous les '
        + 'autres ne donnent rien. Les probabilités sont demandées en écriture '
        + 'décimale.',
      questions: [
        { texte: 'Quelle est la probabilité de gagner quelque chose, gros lot ou petit lot ?', attendu: 0.17 },
        { texte: 'Quelle est la probabilité de ne rien gagner ?', attendu: 0.83 },
        { texte: 'Combien de billets ne donnent rien ?', attendu: 166, unite: 'billets' },
      ],
    },
    {
      // SANS remise. Les deux premières questions font recompter le sac ; la
      // troisième seulement demande le contraire. L’élève ne récite pas « le sac
      // a changé », il l’écrit.
      id: 'p-16-3-3',
      enonce:
        'Un sac contient 26 jetons indiscernables au toucher : 8 jetons blancs '
        + 'et 18 jetons noirs. Sofia tire un jeton au hasard : il est blanc. Elle '
        + 'le garde et ne le remet PAS dans le sac. Elle tire alors un second '
        + 'jeton au hasard. Les probabilités sont demandées en écriture décimale.',
      questions: [
        { texte: 'Combien de jetons reste-t-il dans le sac avant le second tirage ?', attendu: 25, unite: 'jetons' },
        { texte: 'Quelle est la probabilité que le second jeton tiré soit blanc ?', attendu: 0.28 },
        { texte: 'Quelle est la probabilité que le second jeton tiré ne soit pas blanc ?', attendu: 0.72 },
      ],
    },
    {
      // AVEC remise, et volontairement après six tirages perdants de suite : les
      // deux premières questions font CONSTATER que le sac est intact avant que
      // la troisième ne fasse calculer le contraire.
      id: 'p-16-3-4',
      enonce:
        'Un sac contient 50 jetons indiscernables au toucher : 9 jetons gagnants '
        + 'et 41 jetons perdants. Léo tire un jeton au hasard, note s’il est '
        + 'gagnant, puis le REMET dans le sac avant de recommencer. Il vient de '
        + 'tirer six jetons perdants de suite. Les probabilités sont demandées en '
        + 'écriture décimale.',
      questions: [
        { texte: 'Combien de jetons gagnants le sac contient-il au moment du septième tirage ?', attendu: 9, unite: 'jetons' },
        { texte: 'Quelle est la probabilité que le septième jeton tiré soit gagnant ?', attendu: 0.18 },
        { texte: 'Quelle est la probabilité que le septième jeton tiré ne soit pas gagnant ?', attendu: 0.82 },
      ],
    },
    {
      // « Au moins une » dans une expérience à une seule épreuve : c’est une
      // propriété du livre qu’on vient de prendre, pas un enchaînement de
      // tirages. Le contraire, « aucune », se compte et se calcule.
      id: 'p-16-3-5',
      enonce:
        'Une bibliothèque de classe contient 50 livres. Sous leur couverture, '
        + 'ils sont impossibles à distinguer les uns des autres, et on en prend '
        + 'un au hasard : chacun a la même chance d’être pris. 47 livres portent '
        + 'au moins une illustration ; les autres n’en portent aucune. Les '
        + 'probabilités sont demandées en écriture décimale.',
      questions: [
        { texte: 'Combien de livres ne portent aucune illustration ?', attendu: 3, unite: 'livres' },
        { texte: 'Quelle est la probabilité que le livre pris ne porte aucune illustration ?', attendu: 0.06 },
        { texte: 'Quelle est la probabilité que le livre pris porte au moins une illustration ?', attendu: 0.94 },
      ],
    },
  ],

  test: [
    {
      id: 't-16-3-1', type: 'calcul',
      consigne:
        'La probabilité qu’un événement se produise vaut 0,38. Quelle est la '
        + 'probabilité de son événement contraire ? Donne la réponse en écriture '
        + 'décimale.',
      enonce: '\\text{probabilité de l’événement : 0,38 — probabilité de son contraire : ?}',
      attendu: 0.62,
      fausses: [
        { valeur: -0.38, piege: 'contraire-mal-forme' },
        { valeur: 1.38, piege: 'probabilite-hors-des-bornes' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-16-3-2', type: 'trous',
      consigne:
        'Une roue est partagée en 40 secteurs identiques, chacun ayant la même '
        + 'chance de s’arrêter devant le repère : 14 secteurs sont gagnants et 26 '
        + 'sont perdants. Complète les deux probabilités, en écriture décimale.',
      enonce:
        '\\text{probabilité de gagner : } \\square \\qquad '
        + '\\text{probabilité de ne pas gagner : } \\square',
      champs: [
        { id: 'a', etiquette: 'probabilité de gagner', attendu: 0.35 },
        { id: 'b', etiquette: 'probabilité de ne pas gagner', attendu: 0.65 },
      ],
      fausses: [{ valeur: -0.35, piege: 'contraire-mal-forme' }],
      revoir: 'propriete',
    },
    {
      id: 't-16-3-3', type: 'fraction',
      consigne:
        'Un sac contient 5 jetons verts, 6 jetons bleus et 9 jetons jaunes, tous '
        + 'indiscernables au toucher. On en tire un au hasard. Quelle est la '
        + 'probabilité que le jeton tiré NE soit PAS jaune ? Donne la réponse '
        + 'sous forme de fraction irréductible.',
      enonce: '\\text{sac : 5 jetons verts, 6 bleus et 9 jaunes — un seul tirage}',
      attendu: [11, 20],
      fausses: [
        // La probabilité de l’événement lui-même à la place de celle de son
        // contraire : 1 − 9/20 vaut 11/20.
        { valeur: '9/20', piege: 'contraire-mal-forme' },
        { valeur: '11/9', piege: 'favorables-sur-defavorables' },
        { valeur: '2/3', piege: 'equiprobabilite-supposee' },
      ],
      revoir: 'definition',
    },
    {
      id: 't-16-3-4', type: 'calcul',
      consigne:
        'Un sac contient 50 jetons indiscernables au toucher : 10 jetons '
        + 'gagnants et 40 jetons perdants. On en tire un au hasard. Quelle est la '
        + 'probabilité de NE PAS gagner ? Donne la réponse en écriture décimale.',
      enonce: '\\text{sac : 10 jetons gagnants et 40 perdants, soit 50 jetons — un seul tirage}',
      attendu: 0.8,
      fausses: [
        // La probabilité de gagner, donnée à la place de celle de son contraire.
        // La règle tranche : 1 − 0,2 = 0,8, et 0,2 + 0,2 ne fait pas 1.
        { valeur: 0.2, piege: 'contraire-mal-forme' },
        // 10 ÷ 40 : les gagnants rapportés aux seuls perdants.
        { valeur: 0.25, piege: 'favorables-sur-defavorables' },
        // 50 ÷ 10 : le quotient à l’envers.
        { valeur: 5, piege: 'probabilite-hors-des-bornes' },
      ],
      revoir: 'exemple',
    },
    {
      id: 't-16-3-5', type: 'plausible',
      consigne: 'Cette affirmation est-elle plausible ?',
      enonce:
        '\\text{Un sac contient 20 billes indiscernables au toucher, dont 13 sont bleues : la probabilité de tirer } '
        + '\\text{une bille bleue vaut donc 0,65.} \\quad '
        + '\\text{Quelqu’un annonce que la probabilité de tirer une bille qui n’est pas bleue vaut 1,65.}',
      attendu: false,
      fausses: [{ valeur: true, piege: 'probabilite-hors-des-bornes' }],
      explication:
        'Une probabilité ne dépasse jamais 1 : 1,65 est plus d’une fois et demie '
        + 'la certitude, c’est impossible. La valeur annoncée est celle de '
        + '1 + 0,65 — l’addition a remplacé la soustraction. Le contraire vaut '
        + '1 − 0,65 = 0,35, et le contrôle le confirme : 0,65 + 0,35 = 1 '
        + 'exactement. On peut aussi recompter, 7 billes ne sont pas bleues et '
        + '7 ÷ 20 = 0,35.',
      piege: 'probabilite-hors-des-bornes', revoir: 'remarque',
    },
    {
      id: 't-16-3-6', type: 'plausible',
      consigne: 'Cette affirmation est-elle plausible ?',
      enonce:
        '\\text{Un sac contient 25 jetons indiscernables au toucher : 17 jetons portent au moins une lettre, } '
        + '\\text{les 8 autres n’en portent aucune ; on en tire un au hasard.} \\quad '
        + '\\text{On annonce que la probabilité que le jeton tiré ne porte aucune lettre vaut 0,32.}',
      attendu: true,
      // Le seul « plausible » vrai de l’auto-évaluation. Répondre « non », c’est
      // presque toujours avoir calculé 17 ÷ 25 = 0,68 — la probabilité de
      // l’événement au lieu de celle de son contraire.
      fausses: [{ valeur: false, piege: 'contraire-mal-forme' }],
      explication:
        '8 jetons sur 25 ne portent aucune lettre : 8 ÷ 25 = 0,32, c’est bien la '
        + 'valeur annoncée. On pouvait aussi passer par le contraire : les jetons '
        + 'qui portent au moins une lettre donnent 17 ÷ 25 = 0,68, et '
        + '1 − 0,68 = 0,32. Les deux chemins tombent sur le même nombre, et le '
        + 'contrôle boucle : 0,68 + 0,32 = 1.',
      revoir: 'propriete',
    },
    {
      id: 't-16-3-7', type: 'corriger',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l’erreur apparaît.',
      enonce:
        '\\text{Une urne contient 20 boules indiscernables au toucher : 6 boules jaunes et 14 boules violettes.} '
        + '\\quad \\text{On en tire une au hasard. Quelle est la probabilité que la boule tirée ne soit pas jaune ?}',
      lignes: [
        { texte: 'L’urne contient 20 boules, dont 6 sont jaunes : la probabilité de tirer une boule jaune vaut 6 ÷ 20 = 0,3.', fausse: false },
        { texte: 'La probabilité de l’événement contraire s’obtient en changeant le signe de 0,3.', fausse: true },
        { texte: 'La probabilité de tirer une boule qui n’est pas jaune vaut donc −0,3.', fausse: false },
      ],
      explication:
        'La première ligne calcule juste, et la troisième applique correctement '
        + 'la deuxième. C’est la deuxième qui est fausse : le contraire ne '
        + 's’obtient pas en changeant le signe, mais en retirant p à la '
        + 'certitude. On écrit 1 − 0,3 = 0,7, et une probabilité n’est jamais '
        + 'négative. Le contrôle sépare les deux d’un coup d’œil : '
        + '0,3 + 0,7 = 1, alors que 0,3 + (−0,3) = 0. Et on peut recompter : 14 '
        + 'boules ne sont pas jaunes, 14 ÷ 20 = 0,7.',
      piege: 'contraire-mal-forme', revoir: 'remarque',
    },
    {
      id: 't-16-3-8', type: 'trous',
      consigne:
        'Un sac contient 36 jetons indiscernables au toucher. 15 jetons portent '
        + 'au moins un point ; les autres n’en portent aucun. On en tire un au '
        + 'hasard, et on considère l’événement « le jeton tiré porte au moins un '
        + 'point ». Complète les deux nombres de jetons.',
      enonce:
        '\\text{nombre de jetons qui réalisent cet événement : } \\square \\qquad '
        + '\\text{nombre de jetons qui réalisent son contraire : } \\square',
      champs: [
        { id: 'a', etiquette: 'nombre de jetons qui réalisent l’événement', attendu: 15 },
        { id: 'b', etiquette: 'nombre de jetons qui réalisent son contraire', attendu: 21 },
      ],
      fausses: [
        { valeur: 36, piege: 'contraire-mal-forme' },
        { valeur: 18, piege: 'equiprobabilite-supposee' },
      ],
      revoir: 'definition',
    },
    {
      // Le cas discriminant, et l’inverse de e-16-3-7 : ici le sac n’a PAS
      // changé, et l’élève qui aurait retenu « un tirage passé se retire du
      // compte » tombe sur 0,4.
      id: 't-16-3-9', type: 'calcul',
      consigne:
        'Un sac contient 20 jetons indiscernables au toucher : 9 jetons gagnants '
        + 'et 11 jetons perdants. On tire un jeton au hasard, on note s’il est '
        + 'gagnant, et on le REMET dans le sac. Les cinq derniers tirages ont '
        + 'tous donné des jetons perdants. On fait un nouveau tirage. Quelle est '
        + 'la probabilité que le jeton tiré NE soit PAS gagnant ? Donne la '
        + 'réponse en écriture décimale.',
      enonce:
        '\\text{sac : 9 jetons gagnants et 11 perdants, soit 20 jetons — tirages AVEC remise} \\quad '
        + '\\text{les cinq derniers tirages ont donné cinq jetons perdants}',
      attendu: 0.55,
      fausses: [
        // 6 ÷ 15 : les cinq perdants sortis ont été retirés du sac, alors qu’ils
        // y ont été remis. Rien n’a changé dans le sac.
        { valeur: 0.4, piege: 'sophisme-du-joueur' },
        // 9 ÷ 20 : la probabilité de gagner, à la place de celle de son
        // contraire.
        { valeur: 0.45, piege: 'contraire-mal-forme' },
        // Les cinq derniers tirages ont tous été perdants : la fréquence
        // observée vaut 1, et on la prend pour la probabilité.
        { valeur: 1, piege: 'frequence-et-probabilite-confondues' },
      ],
      revoir: 'remarque',
    },
    {
      id: 't-16-3-10', type: 'plausible',
      consigne: 'Cette affirmation est-elle plausible ?',
      enonce:
        '\\text{Une boîte contient des perles. Certaines portent des étoiles, d’autres des points, certaines les } '
        + '\\text{deux à la fois, et certaines aucun motif. On en tire une au hasard, et on considère l’événement A : } '
        + '\\text{« la perle tirée porte au moins une étoile ».} \\quad '
        + '\\text{Quelqu’un affirme que le contraire de A est « la perle tirée porte au moins un autre motif ».}',
      attendu: false,
      fausses: [{ valeur: true, piege: 'contraire-mal-forme' }],
      explication:
        'Le contraire de A rassemble exactement les perles qui ne réalisent pas '
        + 'A, c’est-à-dire celles qui ne portent AUCUNE étoile. « Au moins un '
        + 'autre motif » ne convient pas, et pour deux raisons à la fois : une '
        + 'perle qui porte une étoile ET un point réaliserait A et son prétendu '
        + 'contraire en même temps, tandis qu’une perle sans aucun motif ne '
        + 'réaliserait ni l’un ni l’autre. Or entre un événement et son '
        + 'contraire, il ne doit rester aucun cas dehors ni aucun cas compté deux '
        + 'fois — c’est ce que dit la somme des probabilités, qui vaut '
        + 'exactement 1. Le contraire de « au moins un » est « aucun ».',
      piege: 'contraire-mal-forme', revoir: 'remarque',
    },
  ],
};
