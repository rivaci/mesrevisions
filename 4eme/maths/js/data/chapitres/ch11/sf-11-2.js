// Savoir-faire 11-2 — Résoudre une équation du type ax + b = c.
//
// C'est le savoir-faire où une formule apprise en 5e devient dangereuse.
// « Ça change de côté, ça change de signe » est la compression d'un procédé
// légitime — retrancher le même nombre aux deux membres — enseignée sans le
// procédé. Tant qu'il n'y a qu'un terme ajouté, elle marche ; dès qu'un
// coefficient apparaît, elle produit x = 6 pour 2x = 8, et l'élève n'a aucun
// moyen de s'en apercevoir puisqu'il a appliqué « sa » règle jusqu'au bout.
//
// D'où trois partis pris.
//
//   1. On ne combat pas la formule par une autre formule. On la met à
//      l'épreuve : deux copies, deux valeurs, et l'élève REMPLACE x par
//      chacune. Une seule tient. La formule n'est pas déclarée fausse, elle est
//      prise en défaut — et l'élève voit sur quoi elle butait.
//   2. Le cours nomme la vraie distinction : un nombre AJOUTÉ s'annule par une
//      soustraction, un nombre qui MULTIPLIE s'annule par une division. C'est
//      une question à se poser, pas une phrase à réciter.
//   3. Le contrôle est la substitution. C'est le seul geste de tout le
//      programme qui permet à l'élève de savoir SEUL, sans corrigé et sans
//      l'appli, s'il a juste. Il traverse le savoir-faire de bout en bout : la
//      découverte s'en sert pour trancher, la méthode le montre, et deux
//      pièges sur quatre s'attrapent avec lui.
//
// Les coefficients négatifs et les solutions décimales sont là dès le
// palier 2 : une résolution qui ne marcherait qu'avec des entiers positifs
// n'est pas une résolution, c'est une reconnaissance de forme.

export default {
  id: 'sf-11-2',
  titre: 'Résoudre une équation du type ax + b = c',
  attendus: ['Résoudre algébriquement une équation du premier degré.'],

  // Deux copies plutôt qu'une démonstration : le désaccord ne porte pas sur un
  // calcul mais sur un GESTE, et c'est le geste qu'il faut mettre à l'épreuve.
  // La question ne demande pas qui a raison — elle demande de substituer. C'est
  // l'élève qui tranche, avec l'outil qu'il gardera toute l'année.
  decouvrir: {
    titre: 'Deux copies, une seule qui tient',
    texte:
      'On cherche le nombre x tel que 2x = 8. Deux élèves proposent une réponse, '
      + 'et ils ne trouvent pas la même.',
    copies: [
      { nom: 'Sacha', calcul: 'le 2 change de côté, donc il change de signe : x = 8 − 2', resultat: 'x = 6' },
      { nom: 'Inès', calcul: 'x est multiplié par 2, donc je divise : x = 8 ÷ 2', resultat: 'x = 4' },
    ],
    question: 'Ne cherche pas qui a raison : vérifie. Remplace x par chacune des deux valeurs dans 2x.',
    champs: [
      { id: 'a', etiquette: 'avec x = 6 : 2 × 6 =', attendu: 12 },
      { id: 'b', etiquette: 'avec x = 4 : 2 × 4 =', attendu: 8 },
    ],
    conclusion:
      'C\'est **Inès**. Avec la réponse de Sacha, 2x vaut 12 et pas 8 : son x ne '
      + 'rend pas l\'égalité vraie.\n'
      + '« Ça change de côté, ça change de signe » ne parle que des nombres '
      + '**ajoutés**. Ici le 2 **multiplie** x, et une multiplication s\'annule '
      + 'par une **division**.\n'
      + 'Retiens surtout ce que tu viens de faire : remplacer x par sa valeur. '
      + 'C\'est le seul geste qui tranche, et il marche à tous les coups.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Équation, solution',
      texte:
        'Une **équation** est une égalité qui contient un nombre inconnu, désigné '
        + 'par une lettre.\n'
        + 'Une **solution** est une valeur de cette lettre qui rend l\'égalité '
        + '**vraie**. **Résoudre** l\'équation, c\'est trouver ses solutions.\n'
        + 'C\'est ce qui rend le contrôle possible : pour savoir si ta réponse est '
        + 'la bonne, tu n\'as qu\'à la remplacer dans l\'équation de départ.',
    },
    {
      type: 'propriete',
      titre: 'Les deux gestes qui ne changent rien aux solutions',
      texte:
        'On ne change pas les solutions d\'une équation quand on **ajoute** ou on '
        + '**retranche** un même nombre aux deux membres.\n'
        + 'On ne les change pas non plus quand on **multiplie** ou on **divise** '
        + 'les deux membres par un même nombre **non nul**.\n'
        + 'Les **deux** membres à chaque fois : une équation est une balance, ce '
        + 'qu\'on fait d\'un côté se fait de l\'autre.',
    },
    {
      // Le cœur du savoir-faire, et la seule chose que l'élève doit se demander
      // avant d'écrire quoi que ce soit. Formulé comme une question, pas comme
      // une règle : c'est précisément une règle récitée qui l'a mis dedans.
      type: 'remarque',
      titre: 'Ajouté, ou multiplié ?',
      texte:
        'Avant de faire disparaître un nombre, demande-toi ce qu\'il fait à x.\n'
        + 'S\'il est **ajouté**, on le retranche aux deux membres.\n'
        + 'S\'il **multiplie**, on divise les deux membres par lui.\n'
        + 'Dans 2x = 8, le 2 multiplie : la solution est 4, jamais 6. La formule '
        + '« ça change de côté, ça change de signe » ne vaut que pour le premier cas.',
    },
    {
      type: 'exemple',
      texte:
        'Résoudre 5x − 3 = 12.\n'
        + 'J\'ajoute 3 aux deux membres : 5x = 15.\n'
        + 'Je divise les deux membres par 5 : x = 3.\n'
        + 'Je vérifie dans l\'équation de départ : 5 × 3 − 3 = 12. C\'est bien le '
        + 'membre de droite.',
    },
  ],

  methode: {
    titre: 'Enlever les couches dans le bon ordre',
    enonce: 'Résoudre l\'équation 4x − 7 = 9.',
    etapes: [
      {
        texte: 'Je regarde ce qui entoure x : un 4 qui le multiplie, et un 7 qu\'on lui retranche.',
        note: 'Deux couches, donc deux gestes — et l\'ordre compte.',
      },
      {
        texte: 'Je commence par ce qui est ajouté ou retranché. J\'ajoute 7 aux deux membres : 4x = 16.',
        note: 'Aux deux membres. Sinon l\'égalité est rompue et la solution change.',
      },
      {
        texte: 'Il ne reste que le 4, qui multiplie x. Je divise les deux membres par 4 : x = 4.',
        note: 'Une multiplication s\'annule par une division. Écrire 16 − 4 serait l\'erreur du chapitre.',
      },
      {
        texte: 'La solution est x = 4.',
        note: '',
      },
    ],
    controle:
      'Le contrôle : remplace x par ta réponse dans l\'équation de **départ**. Ici '
      + '4 × 4 − 7 = 16 − 7 = 9, et le membre de droite vaut 9 : les deux tombent '
      + 'pareil, donc c\'est juste. C\'est le seul exercice de maths où tu peux '
      + 'savoir tout seul que tu as bon. Ce serait dommage de t\'en priver.',
  },

  entrainement: [
    // ── Palier 1 : un seul geste à la fois ──────────────────────────────────
    {
      id: 'e-11-2-1', type: 'calcul', palier: 1, piege: 'transposition-du-coefficient',
      consigne: 'Résous cette équation. Donne la valeur de x.',
      enonce: '3x = 21', attendu: 7,
      fausses: [
        { valeur: 18, piege: 'transposition-du-coefficient' },
      ],
    },
    {
      id: 'e-11-2-2', type: 'calcul', palier: 1, piege: 'transposition-du-coefficient',
      consigne: 'Résous cette équation. Donne la valeur de x.',
      enonce: '5x = -40', attendu: -8,
      fausses: [
        { valeur: -45, piege: 'transposition-du-coefficient' },
      ],
    },
    {
      // Neutre : il n'y a aucun coefficient devant x, donc le piège du chapitre
      // ne peut pas jouer — et surtout, c'est le cas où « ça change de côté, ça
      // change de signe » est PARFAITEMENT correct. Sans cet item, l'élève
      // sortirait du savoir-faire avec la règle inverse : « ne jamais rien
      // faire passer de l'autre côté », aussi fausse que la première.
      // L'erreur prévue est autre : avoir ajouté 9 à droite au lieu de le
      // retrancher, donc deux opérations différentes sur les deux membres.
      id: 'e-11-2-3', type: 'calcul', palier: 1, neutre: true, piege: 'operation-sur-un-seul-membre',
      consigne: 'Résous cette équation. Donne la valeur de x.',
      enonce: 'x + 9 = 4', attendu: -5,
      fausses: [
        { valeur: 13, piege: 'operation-sur-un-seul-membre' },
      ],
    },

    // ── Palier 2 : les deux gestes enchaînés, et les signes ─────────────────
    {
      id: 'e-11-2-4', type: 'calcul', palier: 2, piege: 'transposition-du-coefficient',
      consigne: 'Résous cette équation. Donne la valeur de x.',
      enonce: '2x + 3 = 11', attendu: 4,
      fausses: [
        { valeur: 6, piege: 'transposition-du-coefficient' },
      ],
    },
    {
      id: 'e-11-2-5', type: 'calcul', palier: 2, piege: 'operation-sur-un-seul-membre',
      consigne: 'Résous cette équation. Donne la valeur de x.',
      enonce: '3x - 9 = 15', attendu: 8,
      fausses: [
        { valeur: 5, piege: 'operation-sur-un-seul-membre' },
        { valeur: 21, piege: 'transposition-du-coefficient' },
      ],
    },
    {
      id: 'e-11-2-6', type: 'calcul', palier: 2, piege: 'solution-non-verifiee',
      consigne: 'Résous cette équation. Donne la valeur de x.',
      enonce: '-2x + 5 = 11', attendu: -3,
      fausses: [
        { valeur: 3, piege: 'solution-non-verifiee' },
        { valeur: 8, piege: 'transposition-du-coefficient' },
      ],
    },

    // ── Palier 3 : solutions décimales, et relire une résolution ────────────
    {
      id: 'e-11-2-7', type: 'calcul', palier: 3, piege: 'transposition-du-coefficient',
      consigne: 'Résous cette équation. Donne la valeur de x.',
      enonce: '4x + 3 = 9', attendu: 1.5,
      fausses: [
        { valeur: 2, piege: 'transposition-du-coefficient' },
      ],
    },
    {
      id: 'e-11-2-8', type: 'calcul', palier: 3, piege: 'solution-non-verifiee',
      consigne: 'Résous cette équation. Donne la valeur de x.',
      enonce: '-2x - 7 = 2', attendu: -4.5,
      fausses: [
        { valeur: 4.5, piege: 'solution-non-verifiee' },
        { valeur: 11, piege: 'transposition-du-coefficient' },
      ],
    },
    {
      id: 'e-11-2-9', type: 'corriger', palier: 3, piege: 'transposition-du-coefficient',
      consigne: 'Cette résolution est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '7x + 2 = 30',
      lignes: [
        { texte: '7x + 2 = 30', fausse: false },
        { texte: '7x = 30 − 2, donc 7x = 28', fausse: false },
        { texte: 'x = 28 − 7 = 21', fausse: true },
        { texte: 'La solution est x = 21.', fausse: false },
      ],
      explication:
        'La deuxième ligne est juste : le 2 est ajouté à 7x, on le retranche donc '
        + 'aux deux membres. C\'est à la troisième que ça casse — le 7 n\'est pas '
        + 'ajouté à x, il le MULTIPLIE. On l\'annule par une division : x = 28 ÷ 7 = 4. '
        + 'La vérification l\'aurait montré tout de suite : 7 × 21 + 2 fait 149, pas 30.',
    },
    {
      // L'affirmation est celle que l'élève récite depuis la 5e, et elle est
      // vraie la moitié du temps : c'est ce qui la rend coriace. Le contre-
      // exemple demandé n'est pas une valeur qui « casse » la règle dans
      // l'abstrait, c'est la solution réelle de l'équation — donc encore une
      // substitution.
      id: 'e-11-2-10', type: 'vraifaux', palier: 3, piege: 'transposition-du-coefficient',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Dans une équation, un nombre qui passe de l\'autre côté du signe égal change toujours de signe.',
      attendu: false,
      contreExemple: {
        invite: 'Pour 5x = 30, cette règle donnerait x = 30 − 5 = 25. Donne la valeur de x qui convient vraiment.',
        champs: [{ id: 'a', etiquette: 'valeur de x' }],
        // On vérifie la PROPRIÉTÉ qui fait la solution — l'égalité devient vraie
        // — et non une valeur imposée. C'est exactement le geste du chapitre.
        valide: (a) => Number.isFinite(a) && 5 * a === 30,
        temoin: [6],
        exemple:
          'Avec x = 25, 5x vaut 125 et pas 30 : la règle a menti. La solution est '
          + '6, car 5 × 6 = 30. Le 5 multiplie x, il s\'en va par une division — '
          + 'pas par un changement de signe.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-11-2-1',
      enonce:
        'Un taxi facture 4 € de prise en charge, puis 2 € par kilomètre parcouru. '
        + 'La course de Malo lui a coûté 30 € en tout.',
      questions: [
        { texte: 'Une fois la prise en charge déduite, combien coûtent les kilomètres ?', attendu: 26, unite: '€' },
        { texte: 'Combien de kilomètres Malo a-t-il parcourus ?', attendu: 13, unite: 'km' },
      ],
    },
    {
      id: 'p-11-2-2',
      enonce:
        'Une salle d\'escalade demande 45 € à l\'inscription, puis 8 € par séance. '
        + 'Léa a dépensé 141 € cette année.',
      questions: [
        { texte: 'Combien a-t-elle dépensé pour les séances seules ?', attendu: 96, unite: '€' },
        { texte: 'Combien de séances a-t-elle faites ?', attendu: 12, unite: 'séances' },
      ],
    },
    {
      id: 'p-11-2-3',
      enonce:
        'Dans un jeu, chaque manche perdue coûte 7 points. Tom est parti de '
        + '50 points et il en affiche 15 à la fin. Il n\'a gagné aucune manche.',
      questions: [
        { texte: 'Quel est l\'écart entre son score de départ et son score final ?', attendu: 35, unite: 'points' },
        { texte: 'Combien de manches a-t-il perdues ?', attendu: 5, unite: 'manches' },
      ],
    },
    {
      id: 'p-11-2-4',
      enonce:
        'Un rectangle a une largeur de 6 cm. Son périmètre mesure 34 cm.',
      questions: [
        { texte: 'Combien vaut la somme d\'une longueur et d\'une largeur ?', attendu: 17, unite: 'cm' },
        { texte: 'Quelle est la longueur du rectangle ?', attendu: 11, unite: 'cm' },
      ],
    },
    {
      id: 'p-11-2-5',
      enonce:
        'Une plante mesure 12 cm et grandit régulièrement de 1,5 cm par semaine. '
        + 'On veut savoir quand elle atteindra 30 cm.',
      questions: [
        { texte: 'De combien de centimètres doit-elle encore grandir ?', attendu: 18, unite: 'cm' },
        { texte: 'Au bout de combien de semaines atteindra-t-elle 30 cm ?', attendu: 12, unite: 'semaines' },
      ],
    },
  ],

  test: [
    {
      id: 't-11-2-1', type: 'calcul',
      consigne: 'Résous cette équation. Donne la valeur de x.',
      enonce: '4x = 28', attendu: 7,
      fausses: [{ valeur: 24, piege: 'transposition-du-coefficient' }],
      revoir: 'remarque',
    },
    {
      id: 't-11-2-2', type: 'calcul',
      consigne: 'Résous cette équation. Donne la valeur de x.',
      enonce: '3x = -18', attendu: -6,
      fausses: [{ valeur: -21, piege: 'transposition-du-coefficient' }],
      revoir: 'remarque',
    },
    {
      id: 't-11-2-3', type: 'calcul',
      consigne: 'Résous cette équation. Donne la valeur de x.',
      enonce: 'x - 4 = -9', attendu: -5,
      fausses: [{ valeur: -13, piege: 'operation-sur-un-seul-membre' }],
      revoir: 'propriete',
    },
    {
      id: 't-11-2-4', type: 'calcul',
      consigne: 'Résous cette équation. Donne la valeur de x.',
      enonce: '5x + 2 = 17', attendu: 3,
      fausses: [{ valeur: 10, piege: 'transposition-du-coefficient' }],
      revoir: 'exemple',
    },
    {
      id: 't-11-2-5', type: 'calcul',
      consigne: 'Résous cette équation. Donne la valeur de x.',
      enonce: '-3x + 4 = 19', attendu: -5,
      fausses: [
        { valeur: 5, piege: 'solution-non-verifiee' },
        { valeur: 18, piege: 'transposition-du-coefficient' },
      ],
      revoir: 'exemple',
    },
    {
      id: 't-11-2-6', type: 'calcul',
      consigne: 'Résous cette équation. Donne la valeur de x.',
      enonce: '2x + 7 = 4', attendu: -1.5,
      fausses: [{ valeur: -5, piege: 'transposition-du-coefficient' }],
      revoir: 'exemple',
    },
    {
      id: 't-11-2-7', type: 'trous',
      consigne: 'Complète cette résolution.',
      enonce: '5x - 8 = 27 \\;\\Rightarrow\\; 5x = \\square \\;\\Rightarrow\\; x = \\square',
      champs: [
        { id: 'a', etiquette: 'valeur de 5x', attendu: 35 },
        { id: 'b', etiquette: 'valeur de x', attendu: 7 },
      ],
      fausses: [
        { valeur: 27, piege: 'operation-sur-un-seul-membre' },
        { valeur: 30, piege: 'transposition-du-coefficient' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-11-2-8', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '5x - 4 = 26 \\text{ a pour solution } x = 6', attendu: true,
      explication:
        'Il suffit de remplacer : 5 × 6 − 4 = 30 − 4 = 26, et le membre de droite '
        + 'vaut 26. Les deux tombent pareil, donc 6 est bien la solution.',
      revoir: 'definition',
    },
    {
      id: 't-11-2-9', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '4x + 5 = 17 \\text{ a pour solution } x = 8', attendu: false,
      explication:
        'Remplace : 4 × 8 + 5 = 37, pas 17. Le 8 vient de 12 − 4, comme si le 4 '
        + 'changeait de côté. Mais le 4 multiplie x : x = 12 ÷ 4 = 3. Vérification : '
        + '4 × 3 + 5 = 17.',
      piege: 'transposition-du-coefficient',
      revoir: 'remarque',
    },
    {
      id: 't-11-2-10', type: 'corriger',
      consigne: 'Cette résolution est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{Un carnet coûte } x \\text{ euros. Quatre carnets et un stylo à } 3 \\text{ € coûtent } 27 \\text{ €.}',
      lignes: [
        { texte: '4x + 3 = 27', fausse: false },
        { texte: '4x = 24, donc x = 6', fausse: false },
        { texte: 'Les quatre carnets coûtent donc 6 €.', fausse: true },
        { texte: 'Réponse : 6 €.', fausse: false },
      ],
      explication:
        'L\'équation est bien posée et sa résolution est juste : x = 6. L\'erreur '
        + 'est à la troisième ligne — x, c\'est le prix d\'UN carnet, pas des '
        + 'quatre. Les quatre carnets coûtent 4 × 6 = 24 €. Quand tu as trouvé x, '
        + 'relis la question avant de conclure.',
      piege: 'inconnue-mal-choisie',
      revoir: 'definition',
    },
  ],
};
