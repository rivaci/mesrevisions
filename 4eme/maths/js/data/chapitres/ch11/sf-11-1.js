// Savoir-faire 11-1 — Tester si un nombre est solution.
//
// ── Pourquoi ce geste ouvre le chapitre ───────────────────────────────────
//
// C'est le seul savoir-faire du chapitre qui ne demande AUCUNE technique :
// pas de transposition, pas de division des deux membres, rien à retenir. On
// remplace, on calcule, on compare. Et c'est précisément ce qui le rend
// central — quand la résolution s'effondre en contrôle, ce geste-là, lui,
// reste disponible. Il est le contrôle de tous les autres savoir-faire du
// chapitre, et la méthode de chacun d'eux y renvoie.
//
// ── Le signe = n'annonce pas un calcul ────────────────────────────────────
//
// La confusion de fond n'est pas sur les équations : elle est sur le signe
// égal. Depuis l'école primaire il se lit « et ça donne » — une consigne de
// calcul, orientée de gauche à droite. Dans une équation, il AFFIRME que deux
// écritures désignent le même nombre, et cette affirmation n'est vraie que
// pour certaines valeurs de l'inconnue. Un élève qui garde la lecture
// primaire écrit « 5 × 2 − 1 = 9 = 2 × 2 + 8 », enchaîne les deux membres sur
// une seule ligne, et finit par en transformer un en oubliant l'autre.
//
// D'où le parti pris qui traverse tout le fichier : les deux membres se
// calculent SÉPARÉMENT, chacun sur sa ligne, et on ne compare qu'après. Le
// premier exercice est un « trous » à deux champs pour cette seule raison —
// la forme de l'exercice impose la forme du geste.
//
// ── L'item neutre, et ce qu'il protège ────────────────────────────────────
//
// « Ça change de côté, ça change de signe » est faux sur un coefficient, et
// c'est le piège du chapitre. Mais la formule n'est pas fausse en soi : c'est
// une compression d'un procédé légitime, et sur un terme additionné elle
// donne la bonne réponse. Un fichier qui ne montrerait que ses échecs
// installerait la règle inverse — « cette formule est toujours fausse » —,
// aussi coûteuse que la première. L'item 6 est donc une équation où elle
// marche, et où le piège ne peut pas jouer.

export default {
  id: 'sf-11-1',
  titre: 'Tester si un nombre est solution',
  attendus: [
    'Il comprend les notions d\'inconnue et de solution.',
    'Il teste si un nombre est solution d\'une équation.',
  ],

  // On ne définit rien : deux essais ratés sont posés tels quels, et l'élève
  // fait le troisième. Le mot « solution » n'arrive qu'à la conclusion, une
  // fois que le geste a été fait — et il arrive alors comme un nom donné à
  // quelque chose de déjà rencontré, pas comme une définition à mémoriser.
  decouvrir: {
    titre: 'Trois essais, un seul qui tombe juste',
    texte:
      'On cherche le nombre x qui rend vraie l\'égalité 5x − 3 = 2x + 6. Pour '
      + 'savoir si un nombre convient, on le met à la place de x dans les deux '
      + 'côtés de l\'égalité — on les appelle les deux **membres** — et on '
      + 'calcule chacun de son côté. Deux élèves ont déjà essayé.',
    copies: [
      { nom: 'Sacha', calcul: 'x = 1 : à gauche 5 × 1 − 3, à droite 2 × 1 + 6', resultat: '2 et 8 — ce n\'est pas égal' },
      { nom: 'Inès', calcul: 'x = 2 : à gauche 5 × 2 − 3, à droite 2 × 2 + 6', resultat: '7 et 10 — ce n\'est pas égal' },
    ],
    question: 'À ton tour, avec x = 3. Calcule les deux membres, chacun de son côté.',
    champs: [
      { id: 'a', etiquette: 'membre de gauche : 5 × 3 − 3 =', attendu: 12 },
      { id: 'b', etiquette: 'membre de droite : 2 × 3 + 6 =', attendu: 12 },
    ],
    conclusion:
      'Cette fois, les deux membres donnent **le même nombre**, 12. L\'égalité '
      + 'est donc **vraie** pour x = 3 : on dit que 3 est une **solution** de '
      + 'l\'équation. Pour 1 et pour 2, les deux membres ne tombaient pas pareil : '
      + 'ces nombres ne sont pas solutions.\n'
      + 'Remarque ce que tu viens de faire — et surtout ce que tu n\'as pas fait. '
      + 'Tu n\'as rien déplacé, rien divisé, rien résolu. Tu as remplacé, calculé '
      + 'et comparé. Ce geste-là marche sur **n\'importe quelle** équation.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Équation, inconnue, solution',
      texte:
        'Une **équation** est une égalité qui contient une lettre. Cette lettre, '
        + 'appelée l\'**inconnue**, représente un nombre qu\'on ne connaît pas '
        + 'encore.\n'
        + 'L\'égalité a deux côtés, appelés **membres** : le membre de **gauche** '
        + 'et le membre de **droite**.\n'
        + 'Une **solution** de l\'équation est un nombre qui, mis à la place de '
        + 'l\'inconnue, rend l\'égalité **vraie**.',
    },
    {
      type: 'propriete',
      titre: 'Tester un nombre',
      texte:
        'Pour savoir si un nombre est solution d\'une équation :\n'
        + '1. On remplace l\'inconnue par ce nombre dans **les deux membres**.\n'
        + '2. On calcule **chaque membre séparément**.\n'
        + '3. On compare les deux résultats obtenus.\n'
        + 'S\'ils sont **égaux**, le nombre est solution. S\'ils sont '
        + '**différents**, il ne l\'est pas.',
    },
    {
      // La remarque qui donne au savoir-faire sa place réelle dans le chapitre :
      // ce n'est pas un exercice de plus, c'est l'outil de vérification de tous
      // les autres. Le dire ici évite d'avoir à le redire six fois.
      type: 'remarque',
      titre: 'Tester n\'est pas résoudre',
      texte:
        'Résoudre une équation, c\'est **chercher** ses solutions, et ça demande '
        + 'une méthode. Tester, c\'est **vérifier** qu\'un nombre en est une, et ça '
        + 'n\'en demande aucune.\n'
        + 'C\'est pour cette raison que le test reste possible même quand la '
        + 'méthode de résolution t\'échappe — et qu\'il faut le faire à la fin de '
        + 'chaque résolution, sans exception.',
    },
    {
      type: 'remarque',
      titre: 'Le signe = n\'est pas un ordre de calculer',
      texte:
        'Dans une équation, le signe = ne veut pas dire « et ça donne ». Il '
        + '**affirme** que les deux membres désignent le même nombre — ce qui est '
        + 'vrai pour certaines valeurs de l\'inconnue seulement.\n'
        + 'Écris donc les deux calculs **l\'un sous l\'autre**, jamais à la suite '
        + 'sur la même ligne. Enchaîner les deux membres derrière un seul signe = '
        + 'est exactement la façon dont on finit par en transformer un en oubliant '
        + 'l\'autre.',
    },
    {
      type: 'exemple',
      texte:
        'Pour l\'équation 4x − 1 = x + 8 : avec x = 3, le membre de gauche vaut 11 '
        + 'et le membre de droite vaut 11 aussi. Ils sont égaux, donc 3 est '
        + 'solution.\n'
        + 'Avec x = 2, ils valent 7 et 10 : ce n\'est pas égal, donc 2 n\'est pas '
        + 'solution.',
    },
  ],

  methode: {
    titre: 'Tester un nombre, et savoir conclure',
    enonce: 'Le nombre 4 est-il solution de l\'équation 7x − 5 = 3x + 11 ?',
    etapes: [
      {
        texte: 'Je remplace x par 4 dans le membre de gauche, et je le calcule : 7 × 4 − 5 = 28 − 5 = 23.',
        note: 'Je ne touche pas encore au membre de droite. Une chose à la fois.',
      },
      {
        texte: 'Je remplace x par 4 dans le membre de droite, et je le calcule : 3 × 4 + 11 = 12 + 11 = 23.',
        note: 'Sur une ligne à part, sous la précédente.',
      },
      {
        texte: 'Je compare les deux nombres obtenus : 23 et 23. Ils sont égaux.',
        note: 'C\'est seulement maintenant que la comparaison a un sens.',
      },
      {
        texte: 'Donc 4 est solution de l\'équation 7x − 5 = 3x + 11.',
        note: 'Si les deux résultats avaient été différents, la conclusion aurait été : 4 n\'est pas solution.',
      },
    ],
    controle:
      'Le contrôle : refuse d\'écrire les deux membres sur la même ligne. '
      + '« 7 × 4 − 5 = 23 = 3 × 4 + 11 » a l\'air d\'une rédaction, mais c\'est '
      + 'cette écriture-là qui fait glisser vers « je continue le calcul » et qui '
      + 'te fera transformer un membre en oubliant l\'autre. Deux lignes, deux '
      + 'nombres, et la comparaison à la fin.',
  },

  entrainement: [
    // ── Palier 1 : remplacer, et calculer chaque membre de son côté ─────────
    {
      // Deux champs, donc deux calculs séparés : la forme de l'exercice impose
      // le geste qu'on veut installer. Et le nombre testé n'est PAS solution —
      // le premier item de la série montre un test qui échoue, pour que « on me
      // propose un nombre, donc il convient » ne démarre jamais.
      id: 'e-11-1-1', type: 'trous', palier: 1, piege: 'operation-sur-un-seul-membre',
      consigne: 'On teste le nombre 2 dans l\'équation 5x − 1 = 2x + 8. Calcule séparément les deux membres.',
      enonce: '\\text{membre de gauche} = \\square \\qquad \\text{membre de droite} = \\square',
      champs: [
        { id: 'a', etiquette: 'membre de gauche', attendu: 9 },
        { id: 'b', etiquette: 'membre de droite', attendu: 12 },
      ],
      // 8, c'est le membre de droite quand on a remplacé x à gauche seulement et
      // laissé tomber le 2x de droite : la substitution n'a été faite que d'un
      // côté. Ni 9 ni 12 ne peuvent être atteints par ce chemin, la règle servie
      // est donc bien celle qui décrit l'erreur.
      fausses: [{ valeur: 8, piege: 'operation-sur-un-seul-membre' }],
    },
    {
      id: 'e-11-1-2', type: 'calcul', palier: 1,
      consigne: 'Dans l\'équation 7x − 4 = 3x + 8, calcule le membre de gauche pour x = 3.',
      enonce: '7x - 4 \\quad \\text{pour } x = 3', attendu: 17,
      fausses: [],
    },
    {
      // Un membre qui vaut un nombre négatif, et une valeur de x négative : sans
      // ça, « le résultat d'un membre est toujours positif » deviendrait un
      // repère silencieux, et un test qui donne −12 serait pris pour une erreur.
      id: 'e-11-1-3', type: 'calcul', palier: 1,
      consigne: 'Dans l\'équation 5x + 3 = 2x − 6, calcule le membre de droite pour x = −3.',
      enonce: '2x - 6 \\quad \\text{pour } x = -3', attendu: -12,
      fausses: [],
    },

    // ── Palier 2 : conclure — solution, ou pas ──────────────────────────────
    {
      id: 'e-11-1-4', type: 'plausible', palier: 2,
      consigne: 'Ce résultat est-il plausible ?',
      enonce: 'x = 5 \\text{ est solution de } 3x - 2 = x + 8', attendu: true,
      explication:
        'À gauche : 3 × 5 − 2 = 13. À droite : 5 + 8 = 13. Les deux membres '
        + 'donnent 13, donc 5 est bien solution. Un test qui confirme est un test '
        + 'aussi utile qu\'un test qui réfute.',
    },
    {
      id: 'e-11-1-5', type: 'plausible', palier: 2, piege: 'solution-non-verifiee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: 'x = 3 \\text{ est solution de } 6x + 1 = 4x + 9', attendu: false,
      explication:
        'À gauche : 6 × 3 + 1 = 19. À droite : 4 × 3 + 9 = 21. 19 et 21 sont '
        + 'différents, donc 3 n\'est pas solution. Le nombre qui convient est 4 : '
        + 'avec lui, les deux membres valent 25.',
    },
    {
      // ITEM NEUTRE. Le piège du chapitre — faire passer un coefficient de
      // l'autre côté en changeant son signe — ne peut pas jouer ici : devant le
      // x il n'y a aucun coefficient, et le 6 est bien un terme AJOUTÉ. « Ça
      // change de côté, ça change de signe » donne donc la bonne réponse, 4.
      // Sans cet item, le fichier n'exposerait que les échecs de cette formule
      // et installerait la règle inverse — « elle est toujours fausse » — qui
      // coûte aussi cher. L'application ne sert donc ici aucune explication de
      // piège : il n'y a rien à corriger.
      id: 'e-11-1-6', type: 'vraifaux', palier: 2, neutre: true, piege: 'transposition-du-coefficient',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Le nombre 4 est solution de l\'équation x + 6 = 10.',
      attendu: true,
    },
    {
      id: 'e-11-1-7', type: 'calcul', palier: 2, piege: 'transposition-du-coefficient',
      consigne:
        'Un seul de ces trois nombres est solution de l\'équation 2x + 6 = 14 : '
        + '4, 6 ou 7. Teste-les et donne celui qui convient.',
      enonce: '2x + 6 = 14', attendu: 4,
      // Les deux distracteurs ne sont pas décoratifs : chacun est le résultat
      // exact d'une des deux confusions du chapitre, et ils ne se croisent pas.
      // 6 : on arrive à 2x = 8, puis on retranche le 2 au lieu de diviser.
      // 7 : on retire 6 au membre de gauche seulement, d'où 2x = 14.
      fausses: [
        { valeur: 6, piege: 'transposition-du-coefficient' },
        { valeur: 7, piege: 'operation-sur-un-seul-membre' },
      ],
    },

    // ── Palier 3 : relire une production, et se contrôler ───────────────────
    {
      id: 'e-11-1-8', type: 'corriger', palier: 3, piege: 'operation-sur-un-seul-membre',
      consigne: 'Cette résolution est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '3x + 4 = 19',
      lignes: [
        { texte: '3x + 4 = 19', fausse: false },
        { texte: 'Je retire 4 au membre de gauche : 3x = 19', fausse: true },
        { texte: 'Donc x = 19 ÷ 3.', fausse: false },
      ],
      explication:
        'La première ligne ne fait que recopier l\'énoncé. C\'est à la deuxième '
        + 'que ça casse : 4 a été retiré à gauche, mais à droite 19 est resté 19. '
        + 'Une équation est une balance — ce qu\'on enlève d\'un côté, on l\'enlève '
        + 'de l\'autre. Il fallait écrire 3x = 19 − 4, donc 3x = 15 et x = 5.\n'
        + 'Le test tranche en deux calculs : avec x = 5, le membre de gauche vaut '
        + '3 × 5 + 4 = 19 et le membre de droite vaut 19. C\'est bon.',
    },
    {
      // L'affirmation est fausse, et le contre-exemple qu'on demande est un test
      // au sens strict : on prend la solution de l'équation de départ et on
      // regarde ce que devient le membre de gauche une fois modifié. C'est la
      // preuve la plus courte que « travailler d'un seul côté » change tout.
      id: 'e-11-1-9', type: 'vraifaux', palier: 3, piege: 'operation-sur-un-seul-membre',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Ajouter 3 au membre de gauche d\'une équation ne change pas ses solutions.',
      attendu: false,
      contreExemple: {
        invite:
          'On part de l\'équation x + 1 = 5. Donne sa solution, puis calcule ce '
          + 'que vaut le membre de gauche modifié, x + 1 + 3, pour cette même valeur.',
        champs: [
          { id: 'a', etiquette: 'solution de x + 1 = 5' },
          { id: 'b', etiquette: 'valeur de x + 1 + 3 pour cette valeur' },
        ],
        // On vérifie la PROPRIÉTÉ, pas une réponse imposée : le nombre annoncé
        // est bien solution de l'équation de départ, le calcul du membre modifié
        // est juste, et il ne redonne pas 5 — l'égalité est donc rompue.
        valide: (a, b) => a + 1 === 5 && b === a + 4 && b !== 5,
        temoin: [4, 8],
        exemple:
          'La solution est 4. Une fois 3 ajouté à gauche seulement, ce membre '
          + 'vaut 4 + 1 + 3 = 8, alors que la droite vaut toujours 5. Le nombre 4 '
          + 'n\'est plus solution : l\'égalité a été cassée.',
      },
    },
    {
      id: 'e-11-1-10', type: 'calcul', palier: 3, piege: 'inconnue-mal-choisie',
      consigne:
        'Sacha et Malo ont 28 bonbons à eux deux, et Malo en a 6 de plus que '
        + 'Sacha. En notant x le nombre de bonbons de Sacha, on obtient '
        + 'l\'équation x + x + 6 = 28, dont 11 est solution. Combien Malo a-t-il '
        + 'de bonbons ?',
      enonce: 'x + x + 6 = 28', attendu: 17,
      // 11 est la valeur de x, et elle est juste — c'est la question qui n'était
      // pas celle-là. L'erreur n'est ni de calcul ni de méthode : il manque le
      // retour de l'inconnue vers la grandeur demandée.
      fausses: [{ valeur: 11, piege: 'inconnue-mal-choisie' }],
    },
  ],

  problemes: [
    {
      id: 'p-11-1-1',
      enonce:
        'Malo pense à un nombre. Il le multiplie par 4, puis ajoute 7, et annonce '
        + 'qu\'il obtient 31. Sa sœur parie que le nombre de départ est 9, son '
        + 'frère parie que c\'est 6.',
      questions: [
        { texte: 'Quel résultat le programme donne-t-il si le nombre choisi est 9 ?', attendu: 43 },
        { texte: 'Et si le nombre choisi est 6 ?', attendu: 31 },
        { texte: 'À quel nombre Malo pensait-il ?', attendu: 6 },
      ],
    },
    {
      id: 'p-11-1-2',
      enonce:
        'Un rectangle a pour largeur x centimètres, et sa longueur mesure 4 cm de '
        + 'plus que sa largeur. Son périmètre est de 28 cm.',
      questions: [
        { texte: 'Quel serait son périmètre, en cm, si la largeur valait 6 cm ?', attendu: 32, unite: 'cm' },
        { texte: 'Quel serait son périmètre, en cm, si la largeur valait 5 cm ?', attendu: 28, unite: 'cm' },
        { texte: 'Quelle est la largeur de ce rectangle, en cm ?', attendu: 5, unite: 'cm' },
      ],
    },
    {
      id: 'p-11-1-3',
      enonce:
        'Une salle d\'escalade propose deux tarifs. Tarif A : 8 € par entrée, sans '
        + 'abonnement. Tarif B : 30 € d\'abonnement à l\'année, puis 3 € par '
        + 'entrée. On cherche le nombre d\'entrées pour lequel les deux tarifs '
        + 'coûtent exactement le même prix.',
      questions: [
        { texte: 'Combien coûtent 5 entrées au tarif A ?', attendu: 40, unite: '€' },
        { texte: 'Combien coûtent 5 entrées au tarif B ?', attendu: 45, unite: '€' },
        { texte: 'Pour combien d\'entrées les deux tarifs coûtent-ils le même prix ?', attendu: 6, unite: 'entrées' },
      ],
    },
    {
      id: 'p-11-1-4',
      enonce:
        'Sacha et Inès ont 31 autocollants à eux deux. Inès en a 7 de plus que '
        + 'Sacha.',
      questions: [
        { texte: 'Si Sacha en avait 10, combien Inès en aurait-elle ?', attendu: 17, unite: 'autocollants' },
        { texte: 'Combien en auraient-ils alors à eux deux ?', attendu: 27, unite: 'autocollants' },
        { texte: 'Combien Inès a-t-elle d\'autocollants ?', attendu: 19, unite: 'autocollants' },
      ],
    },
    {
      id: 'p-11-1-5',
      enonce:
        'Le père de Malo a 38 ans et Malo en a 8. On cherche dans combien '
        + 'd\'années le père aura exactement trois fois l\'âge de son fils.',
      questions: [
        { texte: 'Quel âge le père aura-t-il dans 5 ans ?', attendu: 43, unite: 'ans' },
        { texte: 'Dans 5 ans, combien vaudra le triple de l\'âge de Malo ?', attendu: 39, unite: 'ans' },
        { texte: 'Dans combien d\'années le père aura-t-il exactement trois fois l\'âge de Malo ?', attendu: 7, unite: 'ans' },
      ],
    },
  ],

  test: [
    {
      id: 't-11-1-1', type: 'trous',
      consigne: 'On teste le nombre 5 dans l\'équation 4x − 3 = 2x + 7. Calcule séparément les deux membres.',
      enonce: '\\text{membre de gauche} = \\square \\qquad \\text{membre de droite} = \\square',
      champs: [
        { id: 'a', etiquette: 'membre de gauche', attendu: 17 },
        { id: 'b', etiquette: 'membre de droite', attendu: 17 },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-11-1-2', type: 'calcul',
      consigne: 'Dans l\'équation 5x + 2 = 8x − 10, calcule le membre de gauche pour x = 4.',
      enonce: '5x + 2 \\quad \\text{pour } x = 4', attendu: 22,
      revoir: 'definition',
    },
    {
      id: 't-11-1-3', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: 'x = 6 \\text{ est solution de } 2x + 9 = 21', attendu: true,
      explication:
        'À gauche : 2 × 6 + 9 = 21. À droite : 21. Les deux membres donnent le '
        + 'même nombre, donc 6 est bien solution.',
      revoir: 'exemple',
    },
    {
      id: 't-11-1-4', type: 'plausible', piege: 'solution-non-verifiee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: 'x = 2 \\text{ est solution de } 9x - 5 = 4x + 15', attendu: false,
      explication:
        'À gauche : 9 × 2 − 5 = 13. À droite : 4 × 2 + 15 = 23. Ce n\'est pas le '
        + 'même nombre, donc 2 n\'est pas solution. Celui qui convient est 4 : les '
        + 'deux membres valent alors 31.',
      revoir: 'propriete',
    },
    {
      id: 't-11-1-5', type: 'vraifaux',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Le nombre −2 est solution de l\'équation 3x + 10 = 4.',
      attendu: true,
      revoir: 'definition',
    },
    {
      id: 't-11-1-6', type: 'vraifaux', piege: 'solution-non-verifiee',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Le nombre 7 est solution de l\'équation 2x + 5 = 20.',
      attendu: false,
      contreExemple: {
        invite: 'Calcule les deux membres pour x = 7, chacun de son côté.',
        champs: [
          { id: 'a', etiquette: 'membre de gauche' },
          { id: 'b', etiquette: 'membre de droite' },
        ],
        valide: (a, b) => a === 19 && b === 20,
        temoin: [19, 20],
        exemple:
          'À gauche : 2 × 7 + 5 = 19. À droite : 20. Les deux membres ne donnent '
          + 'pas le même nombre, donc 7 n\'est pas solution.',
      },
      revoir: 'propriete',
    },
    {
      id: 't-11-1-7', type: 'calcul', piege: 'transposition-du-coefficient',
      consigne:
        'Un seul de ces trois nombres est solution de l\'équation 3x + 6 = 18 : '
        + '4, 6 ou 9. Donne celui qui convient.',
      enonce: '3x + 6 = 18', attendu: 4,
      fausses: [
        { valeur: 9, piege: 'transposition-du-coefficient' },
        { valeur: 6, piege: 'operation-sur-un-seul-membre' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-11-1-8', type: 'corriger', piege: 'transposition-du-coefficient',
      consigne: 'Cette résolution est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '4x = 20',
      lignes: [
        { texte: '4x = 20', fausse: false },
        { texte: 'Le 4 passe de l\'autre côté en changeant de signe : x = 20 − 4', fausse: true },
        { texte: 'Donc x = 16.', fausse: false },
      ],
      explication:
        'Ce geste-là annule une **addition**. Or ici le 4 **multiplie** x : c\'est '
        + 'une division qui l\'annule, donc x = 20 ÷ 4 = 5.\n'
        + 'Le test le dit en une ligne : 4 × 16 = 64, ce qui ne fait pas 20 ; '
        + 'tandis que 4 × 5 = 20, et l\'égalité tient.',
      revoir: 'remarque',
    },
    {
      id: 't-11-1-9', type: 'calcul', piege: 'inconnue-mal-choisie',
      consigne:
        'La longueur d\'un rectangle mesure 7 cm de plus que sa largeur, et son '
        + 'périmètre vaut 46 cm. En notant x la largeur en centimètres, on obtient '
        + 'l\'équation 2x + 2(x + 7) = 46, dont 8 est solution. Quelle est la '
        + 'longueur de ce rectangle, en cm ?',
      enonce: '2x + 2(x + 7) = 46', attendu: 15,
      fausses: [{ valeur: 8, piege: 'inconnue-mal-choisie' }],
      revoir: 'definition',
    },
    {
      id: 't-11-1-10', type: 'calcul',
      consigne: 'Dans l\'équation 2x − 9 = 5x + 6, calcule le membre de gauche pour x = −5.',
      enonce: '2x - 9 \\quad \\text{pour } x = -5', attendu: -19,
      revoir: 'exemple',
    },
  ],
};
