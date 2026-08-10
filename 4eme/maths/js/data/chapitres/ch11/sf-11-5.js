// Savoir-faire 11-5 — Résoudre un problème par une équation.
//
// C'est le savoir-faire qui donne une raison d'être à tout le chapitre. Les
// quatre précédents apprennent à résoudre une équation qu'on a sous les yeux ;
// celui-ci apprend à la FABRIQUER, puis à s'en servir pour répondre.
//
// ── Le cycle, et l'étape qu'on escamote ───────────────────────────────────
//
//   1. NOMMER  : « je note x … », en toutes lettres.
//   2. POSER   : exprimer chaque grandeur en fonction de x, puis traduire la
//                phrase qui donne l'égalité.
//   3. RÉSOUDRE: le geste des savoir-faire précédents.
//   4. REVENIR : répondre à la question posée, qui n'est pas toujours x.
//
// L'étape 4 est celle qui manque presque toujours, et elle est invisible à la
// relecture : l'équation est juste, la solution est juste, et la réponse est
// fausse. Aucun contrôle sur le calcul ne l'attrape — seule la relecture de la
// question l'attrape. D'où le poids donné ici au piège `inconnue-mal-choisie`,
// et le choix de deux items `corriger` où l'erreur est dans la DERNIÈRE ligne,
// celle que personne ne relit.
//
// ── Pourquoi la vérification se fait dans l'énoncé ────────────────────────
//
// Vérifier dans son équation ne prouve rien sur le problème : une traduction
// fausse a elle aussi une solution, et cette solution vérifie parfaitement
// l'équation fausse. Le seul contrôle qui vaille remet les nombres trouvés
// dans la SITUATION — 12 garçons et 18 filles, ça fait bien 30 élèves, et
// bien 6 filles de plus. C'est le geste que tous les `plausible` d'ici
// entraînent.
//
// ── Aucune figure n'est affichée ──────────────────────────────────────────
//
// Les problèmes de périmètre décrivent donc le rectangle en toutes lettres :
// « largeur x, longueur 7 cm de plus ». Ça tombe bien, c'est exactement ce
// qu'il faut faire avant de poser une équation.

export default {
  id: 'sf-11-5',
  titre: 'Résoudre un problème par une équation',
  attendus: [
    'Il résout des problèmes se ramenant à une équation du premier degré.',
    'Il modélise une situation à l\'aide d\'une équation et interprète le résultat obtenu.',
  ],

  // Deux copies, la même équation, la même solution — et deux réponses
  // différentes. L'activité ne porte donc pas sur la résolution (elle est
  // donnée, et juste) mais sur la seule étape qui sépare les deux élèves. La
  // question fait REFAIRE le contrôle dans l'énoncé plutôt que d'annoncer qui
  // a raison : c'est le compte des élèves qui tranche, pas le professeur.
  decouvrir: {
    titre: 'Deux copies, la même équation, deux réponses',
    texte:
      'Voici un problème : « Dans une classe de 30 élèves, il y a 4 filles de '
      + 'plus que de garçons. Combien y a-t-il de filles ? »\n'
      + 'Sacha et Inès notent tous les deux x le nombre de garçons. Tous les '
      + 'deux écrivent x + (x + 4) = 30, et tous les deux trouvent x = 13. '
      + 'Pourtant, ils ne rendent pas la même réponse.',
    copies: [
      { nom: 'Sacha', calcul: 'x = 13, donc la classe compte 13 filles.', resultat: '13 filles' },
      { nom: 'Inès', calcul: 'x = 13, donc 13 garçons, et 13 + 4 filles.', resultat: '17 filles' },
    ],
    question:
      'Départage-les en revenant à l\'énoncé : s\'il y a 13 garçons, combien y '
      + 'a-t-il de filles, et combien d\'élèves en tout ?',
    champs: [
      { id: 'a', etiquette: 'nombre de filles :', attendu: 17 },
      { id: 'b', etiquette: 'nombre d\'élèves en tout :', attendu: 30 },
    ],
    conclusion:
      'C\'est **Inès**. Avec la réponse de Sacha, la classe compterait 13 '
      + 'garçons et 13 filles, soit 26 élèves — l\'énoncé en annonce 30.\n'
      + 'Son équation était juste, sa solution aussi. Ce qui a manqué, c\'est la '
      + 'dernière étape : **x n\'était pas la réponse à la question**. x '
      + 'désignait les garçons, et on demandait les filles. Résoudre l\'équation '
      + 'n\'est que l\'avant-dernier geste ; il reste à **revenir à la question '
      + 'posée**.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Mettre un problème en équation',
      texte:
        '**Mettre en équation**, c\'est traduire un énoncé par une égalité qui '
        + 'contient une lettre.\n'
        + 'On procède toujours dans le même ordre :\n'
        + '1. On écrit **« je note x … »** : x est la grandeur inconnue, et on la '
        + 'nomme en toutes lettres.\n'
        + '2. On exprime **toutes les autres grandeurs** en fonction de x.\n'
        + '3. On repère la phrase de l\'énoncé qui donne une **égalité**, et on '
        + 'l\'écrit avec x.',
    },
    {
      type: 'propriete',
      titre: 'Ce qu\'on a le droit de faire aux deux membres',
      texte:
        'Une équation garde les **mêmes solutions** si on :\n'
        + '· ajoute ou retranche un **même nombre** aux deux membres ;\n'
        + '· multiplie ou divise les deux membres par un **même nombre non nul**.\n'
        + 'Les deux membres, à chaque fois : une opération faite d\'un seul côté '
        + 'rompt l\'égalité et change la solution.',
    },
    {
      // La remarque qui porte tout le savoir-faire. Elle est placée après la
      // propriété parce qu'elle ne parle plus de calcul : elle parle de ce
      // qu'on fait du calcul une fois qu'il est fini.
      type: 'remarque',
      titre: 'La réponse n\'est pas toujours x',
      texte:
        'x est la grandeur qu\'on a **choisi** de nommer, pas forcément celle '
        + 'qu\'on demande. Si x est le nombre de garçons et que la question porte '
        + 'sur les filles, il reste un calcul à faire après avoir trouvé x.\n'
        + 'Le réflexe : **relis la question** avant d\'écrire ta phrase de '
        + 'réponse, et vérifie que le nombre que tu rends porte bien le nom qu\'on '
        + 'te demandait.',
    },
    {
      type: 'remarque',
      titre: 'Vérifier dans l\'énoncé, pas dans son équation',
      texte:
        'Une équation mal traduite a elle aussi une solution, et cette solution '
        + 'vérifie parfaitement l\'équation fausse : se relire dans son équation '
        + 'ne prouve donc rien.\n'
        + 'Le seul contrôle qui vaille remet les nombres trouvés dans la '
        + '**situation de départ** : est-ce que le compte tombe juste, phrase '
        + 'par phrase ?',
    },
    {
      type: 'exemple',
      texte:
        'Un livre et un stylo coûtent 23 € ensemble, et le livre coûte 15 € de '
        + 'plus que le stylo. Combien coûte le livre ?\n'
        + 'Je note x le prix du stylo. Le livre coûte alors x + 15, et ensemble : '
        + 'x + (x + 15) = 23, soit 2x + 15 = 23, donc 2x = 8 et x = 4.\n'
        + 'Le stylo coûte 4 €, donc le livre coûte 4 + 15 = 19 €. Contrôle dans '
        + 'l\'énoncé : 4 + 19 = 23, et 19 − 4 = 15.',
    },
  ],

  methode: {
    titre: 'Nommer, poser, résoudre, revenir',
    enonce:
      'Un rectangle a un périmètre de 46 cm. Sa longueur mesure 5 cm de plus '
      + 'que sa largeur. Quelle est sa longueur ?',
    etapes: [
      {
        texte: 'Je note x la largeur du rectangle, en centimètres.',
        note: 'Écrit en toutes lettres : sans ça, je ne saurai plus à la fin ce que x désigne.',
      },
      {
        texte: 'La longueur mesure 5 cm de plus, donc elle vaut x + 5.',
        note: 'Toutes les autres grandeurs s\'expriment avec x — c\'est ce qui rend l\'équation possible.',
      },
      {
        texte: 'Le périmètre vaut 2 × (largeur + longueur), donc 2(x + x + 5) = 46, c\'est-à-dire 4x + 10 = 46.',
        note: 'La phrase « le périmètre est de 46 cm » est celle qui donne l\'égalité.',
      },
      {
        texte: 'Je retire 10 aux deux membres : 4x = 36. Je divise les deux membres par 4 : x = 9.',
        note: 'Le 4 multiplie x : c\'est une division qui l\'annule, pas une soustraction.',
      },
      {
        texte: 'La largeur vaut 9 cm. On demandait la longueur : elle vaut 9 + 5 = 14 cm.',
        note: 'L\'étape qu\'on oublie. Rendre « 9 » ici, c\'est répondre à une autre question.',
      },
    ],
    controle:
      'Le contrôle : remets tes nombres dans l\'ÉNONCÉ, pas dans ton équation. '
      + 'Un rectangle de 9 cm sur 14 cm a bien un périmètre de 2 × (9 + 14) = 46 cm, '
      + 'et 14 dépasse bien 9 de 5. Les deux phrases de l\'énoncé sont vérifiées, '
      + 'donc la réponse tient.',
  },

  entrainement: [
    // ── Palier 1 : traduire l'énoncé, sans encore rien résoudre ─────────────
    //
    // On sépare volontairement la traduction de la résolution : un élève qui
    // pose une équation fausse résout ensuite très bien une équation qui ne
    // répond pas à la question.
    {
      id: 'e-11-5-1', type: 'expression', palier: 1, piege: 'inconnue-mal-choisie',
      consigne:
        'Dans une classe, il y a 6 filles de plus que de garçons. On note x le '
        + 'nombre de garçons. Écris l\'expression du nombre total d\'élèves.',
      enonce: '\\text{nombre de garçons} : x',
      attendu: '2x+6',
      fausses: [
        { valeur: 'x+6', piege: 'inconnue-mal-choisie' },
      ],
    },
    {
      id: 'e-11-5-2', type: 'expression', palier: 1, piege: 'inconnue-mal-choisie',
      consigne:
        'Un stylo coûte x euros, et un classeur coûte 3 fois plus cher que le '
        + 'stylo. Écris l\'expression du prix des deux articles réunis.',
      enonce: '\\text{prix du stylo} : x',
      attendu: '4x',
      fausses: [
        { valeur: '3x', piege: 'inconnue-mal-choisie' },
      ],
    },
    {
      id: 'e-11-5-3', type: 'expression', palier: 1, piege: 'inconnue-mal-choisie',
      consigne:
        'Un rectangle a pour largeur x centimètres, et sa longueur mesure 4 cm '
        + 'de plus que sa largeur. Écris l\'expression de son périmètre.',
      enonce: '\\text{largeur} : x',
      attendu: '4x+8',
      fausses: [
        { valeur: '2x+4', piege: 'inconnue-mal-choisie' },
      ],
    },

    // ── Palier 2 : résoudre l'équation que le problème a produite ───────────
    {
      id: 'e-11-5-4', type: 'calcul', palier: 2, piege: 'operation-sur-un-seul-membre',
      consigne:
        'Cette équation traduit le problème « dans une classe de 30 élèves, il '
        + 'y a 6 filles de plus que de garçons », où x est le nombre de garçons. '
        + 'Résous cette équation. Donne la valeur de x.',
      enonce: '2x + 6 = 30', attendu: 12,
      fausses: [
        { valeur: 15, piege: 'operation-sur-un-seul-membre' },
        { valeur: 22, piege: 'transposition-du-coefficient' },
      ],
    },
    {
      id: 'e-11-5-5', type: 'calcul', palier: 2, piege: 'transposition-du-coefficient',
      consigne:
        'Cette équation traduit un problème d\'abonnement. Résous cette '
        + 'équation. Donne la valeur de x.',
      enonce: '5x + 12 = 47', attendu: 7,
      fausses: [
        { valeur: 30, piege: 'transposition-du-coefficient' },
        // 35, c'est 5x : le 12 a bien été retiré aux DEUX membres, et l'élève
        // s'est arrêté avant la division. Lui servir « opération sur un seul
        // membre » validerait sa ligne et le ramènerait à 35 ; c'est la
        // substitution dans l'équation de départ qui l'attrape (187 ≠ 47).
        { valeur: 35, piege: 'solution-non-verifiee' },
      ],
    },
    {
      id: 'e-11-5-6', type: 'trous', palier: 2, piege: 'operation-sur-un-seul-membre',
      consigne: 'Complète cette résolution.',
      enonce: '3x + 8 = 29 \\quad\\text{donc}\\quad 3x = \\square \\quad\\text{donc}\\quad x = \\square',
      champs: [
        { id: 'a', etiquette: 'après avoir retiré 8 aux deux membres, 3x =', attendu: 21 },
        { id: 'b', etiquette: 'valeur de x', attendu: 7 },
      ],
      fausses: [
        { valeur: 29, piege: 'operation-sur-un-seul-membre' },
        { valeur: 18, piege: 'transposition-du-coefficient' },
      ],
    },
    {
      id: 'e-11-5-7', type: 'plausible', palier: 2, piege: 'solution-non-verifiee',
      consigne:
        'Le problème dit : « dans une classe de 30 élèves, il y a 6 filles de '
        + 'plus que de garçons ». Un élève annonce le nombre de garçons '
        + 'ci-dessous. Ce résultat est-il plausible ?',
      enonce: '\\text{18 garçons}', attendu: false,
      explication:
        'Non. Avec 18 garçons il y aurait 18 + 6 = 24 filles, donc 42 élèves — '
        + 'et l\'énoncé en annonce 30. Le compte ne tombe pas, et un seul '
        + 'contrôle dans l\'énoncé suffit à s\'en apercevoir. La classe compte '
        + '12 garçons et 18 filles : 18 était le nombre de FILLES.',
    },

    // ── Palier 3 : relire une résolution entière, jusqu'à la phrase finale ──
    {
      // Le cœur du savoir-faire : l'équation est juste, la solution est juste,
      // et la copie est fausse. Aucune vérification dans l'équation ne peut
      // l'attraper — il faut relire la QUESTION. C'est pour ça que la ligne
      // fausse est la dernière, celle qu'on ne relit jamais.
      id: 'e-11-5-8', type: 'corriger', palier: 3, piege: 'inconnue-mal-choisie',
      consigne: 'Cette résolution est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '2x + 15 = 41',
      lignes: [
        { texte: 'Problème : deux frères ont 41 ans à eux deux, et l\'aîné a 15 ans de plus que le cadet. Quel âge a l\'aîné ? Je note x l\'âge du cadet, donc l\'aîné a x + 15 ans, et x + (x + 15) = 41.', fausse: false },
        { texte: '2x + 15 = 41, donc 2x = 26, donc x = 13.', fausse: false },
        { texte: 'L\'aîné a donc 13 ans.', fausse: true },
      ],
      explication:
        'Les deux premières lignes sont justes : l\'équation traduit bien '
        + 'l\'énoncé, et 13 est bien sa solution. C\'est la dernière ligne qui '
        + 'casse — x désigne l\'âge du CADET, et la question porte sur l\'aîné. '
        + 'Il fallait revenir à la question : l\'aîné a 13 + 15 = 28 ans. '
        + 'Contrôle dans l\'énoncé : 13 + 28 = 41, et 28 − 13 = 15.',
    },
    {
      id: 'e-11-5-9', type: 'vraifaux', palier: 3, piege: 'inconnue-mal-choisie',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Dans un problème mis en équation, la réponse à la question est toujours la valeur de x.',
      attendu: false,
      contreExemple: {
        invite:
          'Voici un problème où ce n\'est pas le cas : un sac contient 47 billes, '
          + 'dont 9 billes rouges de plus que de bleues, et on demande le nombre '
          + 'de billes ROUGES. On note x le nombre de billes bleues. Donne la '
          + 'valeur de x, puis le nombre de billes rouges.',
        champs: [
          { id: 'a', etiquette: 'valeur de x (billes bleues)' },
          { id: 'b', etiquette: 'nombre de billes rouges' },
        ],
        // Ici le contre-exemple n'est pas un couple à chercher : c'est le
        // résultat d'un problème précis, et une seule paire convient. On la
        // vérifie donc exactement, sans balayage.
        valide: (a, b) => a === 19 && b === 28,
        temoin: [19, 28],
        exemple:
          'L\'équation est x + (x + 9) = 47, soit 2x + 9 = 47, donc x = 19 : il y '
          + 'a 19 billes bleues. Les rouges sont alors 19 + 9 = 28, et '
          + '19 + 28 = 47. La réponse à la question est 28, pas 19.',
      },
    },
    {
      // Item neutre : ici la question porte exactement sur la grandeur qu'on a
      // nommée x, donc « revenir à la question » ne change rien et le piège ne
      // joue pas. Sans lui, « la réponse n'est jamais x » deviendrait la
      // nouvelle règle, et l'élève ajouterait un calcul de trop là où il n'en
      // faut aucun. C'est aussi le seul `plausible` de ce savoir-faire dont la
      // réponse est « oui ».
      id: 'e-11-5-10', type: 'plausible', palier: 3, neutre: true, piege: 'inconnue-mal-choisie',
      consigne:
        'Le problème dit : « un atelier de poterie fait payer 20 € d\'inscription, '
        + 'puis 12 € par séance ; Anaïs a dépensé 116 € en tout ». On demande le '
        + 'nombre de séances, et Anaïs annonce le résultat ci-dessous. Ce '
        + 'résultat est-il plausible ?',
      enonce: '\\text{8 séances}', attendu: true,
      explication:
        'Oui : 12 × 8 + 20 = 96 + 20 = 116 €. Le compte tombe juste dans '
        + 'l\'énoncé. Remarque qu\'ici la question portait sur x lui-même — le '
        + 'nombre de séances — donc il n\'y avait rien à calculer après avoir '
        + 'résolu l\'équation. Ça arrive aussi, et c\'est la question qui le dit.',
    },
  ],

  problemes: [
    {
      id: 'p-11-5-1',
      enonce:
        'Marc a 30 ans de moins que sa mère. À eux deux, ils ont 58 ans.',
      questions: [
        { texte: 'Quel âge a Marc ?', attendu: 14, unite: 'ans' },
        { texte: 'Quel âge a sa mère ?', attendu: 44, unite: 'ans' },
      ],
    },
    {
      id: 'p-11-5-2',
      enonce:
        'Un rectangle a un périmètre de 54 cm. Sa longueur mesure 7 cm de plus '
        + 'que sa largeur.',
      questions: [
        { texte: 'Quelle est sa largeur ?', attendu: 10, unite: 'cm' },
        { texte: 'Quelle est sa longueur ?', attendu: 17, unite: 'cm' },
        { texte: 'Quelle est son aire ?', attendu: 170, unite: 'cm²' },
      ],
    },
    {
      id: 'p-11-5-3',
      enonce:
        'Trois amis se partagent 102 €. Le deuxième reçoit le double du '
        + 'premier, et le troisième reçoit 6 € de plus que le premier.',
      questions: [
        { texte: 'Combien reçoit le premier ?', attendu: 24, unite: '€' },
        { texte: 'Combien reçoit le deuxième ?', attendu: 48, unite: '€' },
        { texte: 'Combien reçoit le troisième ?', attendu: 30, unite: '€' },
      ],
    },
    {
      id: 'p-11-5-4',
      enonce:
        'Une salle d\'escalade fait payer une carte annuelle de 35 €, puis 8 € '
        + 'par séance. Lucas a dépensé 139 € cette année.',
      questions: [
        { texte: 'Combien de séances a-t-il faites ?', attendu: 13, unite: 'séances' },
        { texte: 'Combien aurait-il payé pour 15 séances ?', attendu: 155, unite: '€' },
      ],
    },
    {
      id: 'p-11-5-5',
      enonce:
        'Un cinéma propose deux tarifs. Tarif A : 9 € la place, sans rien '
        + 'd\'autre à payer. Tarif B : une carte à 24 €, puis 5 € la place.',
      questions: [
        { texte: 'Pour combien de places les deux tarifs coûtent-ils exactement le même prix ?', attendu: 6, unite: 'places' },
        { texte: 'Combien paie-t-on alors, avec l\'un ou l\'autre tarif ?', attendu: 54, unite: '€' },
        { texte: 'Combien coûtent 10 places avec le tarif B ?', attendu: 74, unite: '€' },
      ],
    },
  ],

  test: [
    {
      id: 't-11-5-1', type: 'expression',
      consigne:
        'Un carnet coûte x euros, et un stylo coûte 2 € de moins que le carnet. '
        + 'Écris l\'expression du prix des deux articles réunis.',
      enonce: '\\text{prix du carnet} : x', attendu: '2x-2',
      fausses: [{ valeur: 'x-2', piege: 'inconnue-mal-choisie' }],
      revoir: 'definition',
    },
    {
      id: 't-11-5-2', type: 'expression',
      consigne:
        'Un rectangle a pour largeur x centimètres, et sa longueur vaut le '
        + 'triple de sa largeur. Écris l\'expression de son périmètre.',
      enonce: '\\text{largeur} : x', attendu: '8x',
      fausses: [{ valeur: '4x', piege: 'inconnue-mal-choisie' }],
      revoir: 'definition',
    },
    {
      id: 't-11-5-3', type: 'calcul',
      consigne: 'Résous cette équation. Donne la valeur de x.',
      enonce: '6x + 5 = 41', attendu: 6,
      fausses: [
        { valeur: 30, piege: 'transposition-du-coefficient' },
        // 36, c'est 6x : la soustraction a été faite des deux côtés, la
        // division a été oubliée. 6 × 36 + 5 = 221, pas 41.
        { valeur: 36, piege: 'solution-non-verifiee' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-11-5-4', type: 'calcul',
      consigne: 'Résous cette équation. Donne la valeur de x.',
      enonce: '7x - 4 = 45', attendu: 7,
      fausses: [
        { valeur: 42, piege: 'transposition-du-coefficient' },
        // 49, c'est 7x : le + 4 a bien été ajouté aux deux membres, la
        // division par 7 manque. 7 × 49 − 4 = 339, pas 45.
        { valeur: 49, piege: 'solution-non-verifiee' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-11-5-5', type: 'trous',
      consigne: 'Complète cette résolution.',
      enonce: '4x + 9 = 41 \\quad\\text{donc}\\quad 4x = \\square \\quad\\text{donc}\\quad x = \\square',
      champs: [
        { id: 'a', etiquette: 'après avoir retiré 9 aux deux membres, 4x =', attendu: 32 },
        { id: 'b', etiquette: 'valeur de x', attendu: 8 },
      ],
      fausses: [
        { valeur: 41, piege: 'operation-sur-un-seul-membre' },
        { valeur: 28, piege: 'transposition-du-coefficient' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-11-5-6', type: 'plausible',
      consigne:
        'Le problème dit : « un rectangle a un périmètre de 40 cm, et sa '
        + 'longueur mesure 6 cm de plus que sa largeur ». Un élève annonce la '
        + 'largeur ci-dessous. Ce résultat est-il plausible ?',
      enonce: '\\text{largeur} = 12 \\text{ cm}', attendu: false,
      explication:
        'Non. Avec une largeur de 12 cm, la longueur vaudrait 18 cm et le '
        + 'périmètre 2 × (12 + 18) = 60 cm, pas 40 cm. La bonne réponse est une '
        + 'largeur de 7 cm : 4x + 12 = 40 donne x = 7, la longueur vaut 13 cm, '
        + 'et 2 × (7 + 13) = 40.',
      piege: 'solution-non-verifiee', revoir: 'remarque',
    },
    {
      id: 't-11-5-7', type: 'plausible',
      consigne:
        'Le problème dit : « deux sœurs ont 34 ans à elles deux, et l\'aînée a '
        + '4 ans de plus que la cadette ». Un élève annonce l\'âge de la cadette '
        + 'ci-dessous. Ce résultat est-il plausible ?',
      enonce: '\\text{la cadette a } 15 \\text{ ans}', attendu: true,
      explication:
        'Oui : si la cadette a 15 ans, l\'aînée en a 19, et 15 + 19 = 34. Les '
        + 'deux phrases de l\'énoncé sont vérifiées, donc la réponse tient.',
      revoir: 'exemple',
    },
    {
      id: 't-11-5-8', type: 'corriger',
      consigne: 'Cette résolution est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '6x + 30 = 96',
      lignes: [
        { texte: 'Problème : un club demande 30 € d\'inscription, puis 6 € par séance ; Théo a payé 96 € en tout. Je note x le nombre de séances, donc 6x + 30 = 96.', fausse: false },
        { texte: '6x = 96, donc x = 16.', fausse: true },
        { texte: 'Théo a donc fait 16 séances.', fausse: false },
      ],
      explication:
        'La première ligne traduit correctement l\'énoncé. L\'erreur est à la '
        + 'deuxième : les 30 € ont été retirés à gauche seulement. En les '
        + 'retirant aussi à droite, on obtient 6x = 66, donc x = 11. Contrôle '
        + 'dans l\'énoncé : 6 × 11 + 30 = 96 €, alors que 16 séances auraient '
        + 'coûté 126 €.',
      piege: 'operation-sur-un-seul-membre', revoir: 'propriete',
    },
    {
      id: 't-11-5-9', type: 'corriger',
      consigne: 'Cette résolution est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '4x = 96',
      lignes: [
        { texte: 'Problème : un parking contient 3 fois plus de voitures que de motos, et 96 véhicules en tout. Combien y a-t-il de voitures ? Je note x le nombre de motos, donc x + 3x = 96.', fausse: false },
        { texte: '4x = 96, donc x = 24.', fausse: false },
        { texte: 'Il y a donc 24 voitures.', fausse: true },
      ],
      explication:
        'Les deux premières lignes sont justes. Mais x désigne le nombre de '
        + 'MOTOS : il y en a 24, et les voitures sont trois fois plus '
        + 'nombreuses, soit 3 × 24 = 72. Contrôle dans l\'énoncé : 24 + 72 = 96, '
        + 'et 72 est bien le triple de 24.',
      piege: 'inconnue-mal-choisie', revoir: 'remarque',
    },
    {
      id: 't-11-5-10', type: 'calcul',
      consigne:
        'Un panier contient 28 fruits, dont 4 pommes de plus que de poires. On '
        + 'note x le nombre de poires, et l\'équation obtenue est ci-dessous. '
        + 'Résous-la, puis donne le nombre de POMMES.',
      enonce: '2x + 4 = 28', attendu: 16,
      fausses: [{ valeur: 12, piege: 'inconnue-mal-choisie' }],
      revoir: 'remarque',
    },
  ],
};
