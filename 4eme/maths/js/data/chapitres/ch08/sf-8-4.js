// Chapitre 8, savoir-faire 4 — Lire et construire un diagramme circulaire.
//
// ── Pourquoi ce savoir-faire est plus dur qu'il n'en a l'air ──────────────
//
// Tout est proportionnel ici, et l'élève sait faire de la proportionnalité
// depuis le chapitre 5. Ce qui coince n'est pas le calcul : c'est qu'un
// diagramme circulaire fait cohabiter TROIS nombres pour une même catégorie —
// un effectif (des personnes), une fréquence (une part du tout) et un angle
// (des degrés). Trois nombres différents qui désignent la même chose, et deux
// confusions qui en découlent mécaniquement :
//
//   1. lire un pourcentage comme un nombre de degrés — 25 % devient 25°,
//      alors que c'est le quart du disque, donc 90° ;
//   2. rendre l'effectif quand on demande la fréquence, ou l'inverse.
//
// D'où le parti pris : chaque fois qu'on demande un angle, on demande aussi,
// quelque part, l'effectif ou la fréquence correspondants. L'élève ne peut pas
// s'installer dans un seul des trois registres.
//
// ── Le contrôle qui rend ce savoir-faire autonome ─────────────────────────
//
// La somme des angles fait 360°, toujours. C'est le seul chapitre du programme
// où l'élève dispose d'une vérification aussi complète : elle attrape le
// pourcentage pris pour des degrés (la somme tombe à 100), le total oublié (la
// somme explose), et une erreur de calcul isolée. Elle est donc répétée dans le
// cours, dans la méthode, et travaillée pour elle-même à l'entraînement.
//
// ── Pas d'image ───────────────────────────────────────────────────────────
//
// L'application n'affiche pas de dessin : les diagrammes sont décrits par des
// tableaux en texte dans les énoncés. Ce n'est pas un pis-aller — lire « le
// secteur mesure 108° » oblige à faire le calcul, là où un dessin laisserait
// deviner la réponse à vue d'œil.

export default {
  id: 'sf-8-4',
  titre: 'Lire et construire un diagramme circulaire',
  attendus: ['Il lit, interprète et construit un diagramme circulaire.'],

  // Deux copies, et surtout un cas dont l'élève connaît déjà la réponse : un
  // quart de disque. Il n'a pas à croire sur parole que 25 % ne fait pas 25° —
  // il le constate en partageant 360 en quatre. Le second champ ajoute le
  // contrôle qui servira tout le savoir-faire : les deux angles font 360°.
  decouvrir: {
    titre: 'Un quart du disque, ce n\'est pas 25°',
    texte:
      'On interroge 40 élèves sur leur sport préféré : 10 répondent « le '
      + 'football ». On veut représenter ce sondage par un diagramme circulaire, '
      + 'et donc trouver l\'angle du secteur « football ». Voici deux copies.',
    copies: [
      { nom: 'Sacha', calcul: '10 sur 40, cela fait 25 %, donc l\'angle mesure 25°', resultat: '25°' },
      { nom: 'Inès', calcul: '10 sur 40, c\'est un quart des élèves, donc un quart du disque', resultat: '90°' },
    ],
    question:
      'Un disque entier mesure 360°. Calcule le quart du disque, puis la part '
      + 'des 30 autres élèves.',
    champs: [
      { id: 'a', etiquette: 'un quart du disque : 360 ÷ 4 =', attendu: 90 },
      { id: 'b', etiquette: 'part des 30 autres : 30 ÷ 40 × 360 =', attendu: 270 },
    ],
    conclusion:
      'C\'est **Inès**. Un quart du disque mesure **90°**, pas 25° — le '
      + 'pourcentage et l\'angle ne se comptent pas dans la même unité.\n'
      + 'Et la vérification tombe toute seule : 90 + 270 = **360**, le disque '
      + 'est exactement rempli. Avec la copie de Sacha, on aurait obtenu 25 + 75 '
      + '= 100, et il serait resté 260° de disque vides.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Diagramme circulaire',
      texte:
        'Dans un **diagramme circulaire**, le disque entier représente '
        + 'l\'**effectif total**, et chaque catégorie occupe un **secteur**.\n'
        + 'L\'angle de chaque secteur est **proportionnel à l\'effectif** de sa '
        + 'catégorie. Le disque entier mesure **360°**.',
    },
    {
      type: 'propriete',
      titre: 'Angle d\'un secteur',
      texte:
        'angle = **fréquence × 360**, c\'est-à-dire :\n'
        + 'angle = (effectif de la catégorie ÷ effectif total) × 360.\n'
        + 'La **fréquence** est la part du total : un nombre entre 0 et 1. C\'est '
        + 'elle qu\'on multiplie par 360, jamais l\'effectif tout seul. Un '
        + 'pourcentage doit d\'abord être ramené à cette forme : 25 %, c\'est 0,25.',
    },
    {
      // Le contrôle du chapitre, et la raison pour laquelle ce savoir-faire peut
      // se réviser sans corrigé : l'élève sait tout seul s'il s'est trompé.
      type: 'remarque',
      titre: 'La somme des angles fait 360°',
      texte:
        'Quand tous les secteurs sont calculés, leurs angles doivent totaliser '
        + '**exactement 360°**.\n'
        + 'Si tu trouves 100, c\'est que tu as gardé des pourcentages. Si tu '
        + 'trouves beaucoup plus que 360, c\'est que tu as oublié de diviser par '
        + 'l\'effectif total.',
    },
    {
      type: 'remarque',
      titre: 'Lire un diagramme, c\'est faire le chemin inverse',
      texte:
        'À partir d\'un angle mesuré sur le diagramme :\n'
        + 'fréquence = **angle ÷ 360**, et effectif = (angle ÷ 360) × effectif total.\n'
        + 'Un angle n\'est donc jamais un nombre de personnes : il faut le '
        + 'convertir avant de répondre.',
    },
    {
      type: 'exemple',
      texte:
        'Sur 30 personnes, 12 répondent « souvent » : 12 ÷ 30 × 360 = **144°**.\n'
        + 'Dans le même diagramme, un secteur de 60° représente '
        + '60 ÷ 360 × 30 = **5 personnes**.',
    },
  ],

  methode: {
    titre: 'Construire un diagramme circulaire',
    enonce:
      'Un vétérinaire a reçu 45 animaux dans la journée : 20 chiens, 15 chats et '
      + '10 animaux d\'autres espèces. Calculer les angles des trois secteurs.',
    etapes: [
      {
        texte: 'Je vérifie d\'abord l\'effectif total : 20 + 15 + 10 = 45. C\'est bien le total annoncé.',
        note: 'Ce total est le nombre par lequel je vais diviser à chaque ligne — autant s\'assurer qu\'il est juste.',
      },
      {
        texte: 'Chiens : 20 ÷ 45 × 360 = 160°.',
        note: 'Fréquence puis multiplication par 360, dans cet ordre.',
      },
      {
        texte: 'Chats : 15 ÷ 45 × 360 = 120°.',
        note: '15 sur 45, c\'est le tiers du total, donc le tiers du disque.',
      },
      {
        texte: 'Autres : 10 ÷ 45 × 360 = 80°.',
        note: '',
      },
      {
        texte: 'Je vérifie : 160 + 120 + 80 = 360. Le disque est exactement rempli.',
        note: 'Sans cette ligne, une erreur sur un seul secteur passerait inaperçue.',
      },
    ],
    controle:
      'Le contrôle : additionne tes angles. Ils doivent faire **exactement 360°**. '
      + 'Une somme de 100 signale des pourcentages laissés en degrés ; une somme '
      + 'énorme signale un effectif multiplié par 360 sans avoir été divisé par le '
      + 'total. Ce contrôle se fait de tête et il attrape presque tout.',
  },

  entrainement: [
    {
      id: 'e-8-4-1', type: 'calcul', palier: 1, piege: 'angle-du-diagramme',
      consigne: 'Calcule l\'angle du secteur « vélo », en degrés.',
      enonce: '\\text{Effectif « vélo » : } 6 \\qquad \\text{effectif total : } 24',
      attendu: 90,
      fausses: [
        { valeur: 25, piege: 'angle-du-diagramme' },
        { valeur: 2160, piege: 'angle-du-diagramme' },
      ],
    },
    {
      id: 'e-8-4-2', type: 'calcul', palier: 1, piege: 'angle-du-diagramme',
      consigne: 'Calcule l\'angle du secteur « oui », en degrés.',
      enonce: '\\text{Réponses « oui » : } 15 \\qquad \\text{personnes interrogées : } 50',
      attendu: 108,
      fausses: [
        { valeur: 30, piege: 'angle-du-diagramme' },
        { valeur: 5400, piege: 'angle-du-diagramme' },
      ],
    },
    {
      // NEUTRE : aucune fréquence ici, donc rien à multiplier par 360 — le piège
      // ne peut pas jouer. C'est justement pour ça qu'il est là : neuf items sur
      // dix demandent « × 360 », et sans celui-ci le réflexe deviendrait aveugle.
      // On travaille ici le contrôle pour lui-même, avant de s'en servir.
      // Aucune réponse fausse n'est prévisible sur une soustraction aussi simple.
      id: 'e-8-4-3', type: 'trous', palier: 1, neutre: true, piege: 'angle-du-diagramme',
      consigne: 'Un diagramme circulaire comporte trois secteurs. Deux mesurent 150° et 90°. Complète.',
      enonce: '150^\\circ + 90^\\circ + \\square^\\circ = 360^\\circ',
      champs: [{ id: 'a', attendu: 120 }],
      fausses: [],
    },
    {
      id: 'e-8-4-4', type: 'calcul', palier: 2, piege: 'angle-du-diagramme',
      consigne: 'Dans un sondage, 15 % des personnes ont répondu « jamais ». Calcule l\'angle de ce secteur, en degrés.',
      enonce: '15\\ \\% \\text{ du disque}',
      attendu: 54,
      fausses: [{ valeur: 15, piege: 'angle-du-diagramme' }],
    },
    {
      id: 'e-8-4-5', type: 'calcul', palier: 2, piege: 'frequence-et-effectif-confondus',
      consigne: 'Ce diagramme représente 120 spectateurs. Combien ont choisi la comédie ?',
      enonce: '\\text{Angle du secteur « comédie » : } 108^\\circ \\qquad \\text{effectif total : } 120',
      attendu: 36,
      fausses: [
        { valeur: 108, piege: 'frequence-et-effectif-confondus' },
        { valeur: 30, piege: 'frequence-et-effectif-confondus' },
      ],
    },
    {
      id: 'e-8-4-6', type: 'calcul', palier: 2, piege: 'frequence-et-effectif-confondus',
      consigne: 'Calcule la fréquence de la réponse « oui », en pourcentage.',
      enonce: '\\text{Réponses « oui » : } 50 \\qquad \\text{personnes interrogées : } 200',
      attendu: 25,
      fausses: [
        { valeur: 50, piege: 'frequence-et-effectif-confondus' },
        { valeur: 400, piege: 'frequence-et-effectif-confondus' },
      ],
    },
    {
      id: 'e-8-4-7', type: 'trous', palier: 2, piege: 'angle-du-diagramme',
      consigne:
        'Un club de 60 membres se répartit en trois activités. Le secteur '
        + '« escrime » mesure déjà 90°. Complète les deux autres angles, en degrés.',
      enonce:
        '\\text{Danse } 25 \\to \\square^\\circ \\qquad '
        + '\\text{Judo } 20 \\to \\square^\\circ \\qquad '
        + '\\text{Escrime } 15 \\to 90^\\circ',
      champs: [
        { id: 'a', etiquette: 'angle du secteur « danse »', attendu: 150 },
        { id: 'b', etiquette: 'angle du secteur « judo »', attendu: 120 },
      ],
      fausses: [
        { valeur: 9000, piege: 'angle-du-diagramme' },
        { valeur: 7200, piege: 'angle-du-diagramme' },
      ],
    },
    {
      id: 'e-8-4-8', type: 'plausible', palier: 3, piege: 'angle-du-diagramme',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Sur } 80 \\text{ personnes, } 20 \\text{ ont choisi le rouge : angle du secteur } 25^\\circ',
      attendu: false,
      explication:
        '20 sur 80, c\'est bien 25 %, mais 25 % du disque, ce n\'est pas 25° : '
        + 'c\'est 0,25 × 360 = **90°**, le quart du disque. Un secteur de 25° '
        + 'occuperait à peine un quatorzième du diagramme.',
    },
    {
      id: 'e-8-4-9', type: 'plausible', palier: 3, piege: 'frequence-et-effectif-confondus',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Sur } 240 \\text{ personnes, } 90 \\text{ ont répondu « oui » : angle du secteur } 135^\\circ',
      attendu: true,
      explication:
        '90 sur 240, c\'est 0,375, soit 37,5 % du total. L\'angle vaut donc '
        + '0,375 × 360 = **135°**, et le résultat est juste. Un angle plus grand '
        + 'que l\'effectif n\'a rien d\'anormal : ce ne sont pas les mêmes unités, '
        + 'l\'un compte des personnes et l\'autre des degrés.',
    },
    {
      id: 'e-8-4-10', type: 'vraifaux', palier: 3, piege: 'angle-du-diagramme',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Dans un diagramme circulaire, un secteur qui représente 30 personnes mesure 30°.',
      attendu: false,
      contreExemple: {
        invite:
          'Choisis un effectif total d\'au moins 30 personnes, puis calcule '
          + 'l\'angle du secteur qui en représente 30.',
        champs: [
          { id: 'a', etiquette: 'effectif total' },
          { id: 'b', etiquette: 'angle du secteur, en degrés' },
        ],
        // On vérifie la PROPRIÉTÉ : l'angle annoncé est bien celui que donne la
        // formule pour cet effectif total, et il diffère de 30. N'importe quel
        // total d'au moins 30 convient — l'élève choisit le sien.
        valide: (a, b) => a >= 30
          && Math.abs(b - (30 / a) * 360) < 1e-9
          && Math.abs(b - 30) > 1e-9,
        temoin: [120, 90],
        exemple:
          'Avec 120 personnes interrogées : 30 ÷ 120 × 360 = 90°, et non 30°. '
          + 'L\'angle dépend de l\'effectif total, pas seulement de l\'effectif '
          + 'de la catégorie.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-8-4-1',
      enonce:
        'Dans une classe de 24 élèves, on demande comment chacun vient au '
        + 'collège : 10 à pied, 8 à vélo, 4 en bus et 2 en voiture. On veut '
        + 'représenter ces réponses par un diagramme circulaire.',
      questions: [
        { texte: 'Quel est l\'angle du secteur « à pied » ?', attendu: 150, unite: '°' },
        { texte: 'Quel est l\'angle du secteur « en bus » ?', attendu: 60, unite: '°' },
        { texte: 'Quelle est la somme des quatre angles ?', attendu: 360, unite: '°' },
      ],
    },
    {
      id: 'p-8-4-2',
      enonce:
        'Un sondage auprès de 400 personnes porte sur la boisson préférée au '
        + 'goûter : 160 répondent « eau », 100 « jus de fruit », 90 « soda » et '
        + '50 « thé ».',
      questions: [
        { texte: 'Quelle est la fréquence de la réponse « eau », en pourcentage ?', attendu: 40, unite: '%' },
        { texte: 'Quel est l\'angle du secteur « eau » ?', attendu: 144, unite: '°' },
        { texte: 'Quel est l\'angle du secteur « soda » ?', attendu: 81, unite: '°' },
      ],
    },
    {
      id: 'p-8-4-3',
      enonce:
        'Un diagramme circulaire représente les 250 réponses à un sondage. Le '
        + 'secteur « oui » mesure 216°, le secteur « non » mesure 108°, et le '
        + 'reste du disque correspond aux personnes sans avis.',
      questions: [
        { texte: 'Quel est l\'angle du secteur « sans avis » ?', attendu: 36, unite: '°' },
        { texte: 'Combien de personnes ont répondu « oui » ?', attendu: 150, unite: 'personnes' },
        { texte: 'Combien de personnes sont sans avis ?', attendu: 25, unite: 'personnes' },
      ],
    },
    {
      id: 'p-8-4-4',
      enonce:
        'Les 500 élèves d\'un collège ont indiqué leur langue vivante 2 : 45 % '
        + 'l\'espagnol, 30 % l\'allemand, 15 % l\'italien, et les autres le chinois.',
      questions: [
        { texte: 'Quel pourcentage d\'élèves a choisi le chinois ?', attendu: 10, unite: '%' },
        { texte: 'Quel est l\'angle du secteur « espagnol » ?', attendu: 162, unite: '°' },
        { texte: 'Combien d\'élèves ont choisi l\'allemand ?', attendu: 150, unite: 'élèves' },
      ],
    },
    {
      id: 'p-8-4-5',
      enonce:
        'Un magasin a vendu 180 vêtements en une semaine : 60 tee-shirts, '
        + '45 pantalons, 45 pulls et 30 vestes. Le gérant veut afficher ces '
        + 'ventes sous forme de diagramme circulaire.',
      questions: [
        { texte: 'Quel est l\'angle du secteur « tee-shirts » ?', attendu: 120, unite: '°' },
        { texte: 'Quel est l\'angle du secteur « vestes » ?', attendu: 60, unite: '°' },
        { texte: 'Deux catégories ont le même angle. Quelle est sa mesure ?', attendu: 90, unite: '°' },
      ],
    },
  ],

  test: [
    {
      id: 't-8-4-1', type: 'calcul',
      consigne: 'Calcule l\'angle du secteur « oui », en degrés.',
      enonce: '\\text{Réponses « oui » : } 12 \\qquad \\text{personnes interrogées : } 36',
      attendu: 120,
      fausses: [{ valeur: 4320, piege: 'angle-du-diagramme' }],
      piege: 'angle-du-diagramme', revoir: 'propriete',
    },
    {
      id: 't-8-4-2', type: 'calcul',
      consigne: 'Une catégorie représente 20 % du total. Calcule l\'angle de son secteur, en degrés.',
      enonce: '20\\ \\% \\text{ du disque}',
      attendu: 72,
      fausses: [{ valeur: 20, piege: 'angle-du-diagramme' }],
      piege: 'angle-du-diagramme', revoir: 'propriete',
    },
    {
      id: 't-8-4-3', type: 'calcul',
      consigne: 'Ce diagramme représente 60 personnes. Combien sont dans la catégorie décrite ?',
      enonce: '\\text{Angle du secteur : } 96^\\circ \\qquad \\text{effectif total : } 60',
      attendu: 16,
      fausses: [{ valeur: 96, piege: 'frequence-et-effectif-confondus' }],
      piege: 'frequence-et-effectif-confondus', revoir: 'remarque',
    },
    {
      id: 't-8-4-4', type: 'trous',
      consigne: 'Un diagramme circulaire comporte trois secteurs. Deux mesurent 140° et 130°. Complète.',
      enonce: '140^\\circ + 130^\\circ + \\square^\\circ = 360^\\circ',
      champs: [{ id: 'a', attendu: 90 }],
      revoir: 'remarque',
    },
    {
      id: 't-8-4-5', type: 'calcul',
      consigne: 'Calcule la fréquence de la réponse « non », en pourcentage.',
      enonce: '\\text{Réponses « non » : } 28 \\qquad \\text{personnes interrogées : } 80',
      attendu: 35,
      fausses: [{ valeur: 28, piege: 'frequence-et-effectif-confondus' }],
      piege: 'frequence-et-effectif-confondus', revoir: 'propriete',
    },
    {
      id: 't-8-4-6', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Sur } 150 \\text{ personnes, } 45 \\text{ ont répondu « oui » : angle du secteur } 30^\\circ',
      attendu: false,
      explication:
        '45 sur 150, c\'est 0,3, soit 30 % du total — mais 30 % du disque font '
        + '0,3 × 360 = **108°**. Le pourcentage a été recopié tel quel en degrés.',
      piege: 'angle-du-diagramme', revoir: 'propriete',
    },
    {
      id: 't-8-4-7', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Un diagramme circulaire à trois secteurs : } 168^\\circ,\\ 120^\\circ,\\ 72^\\circ',
      attendu: true,
      explication:
        '168 + 120 + 72 = 360. Les trois secteurs remplissent exactement le '
        + 'disque, donc ces angles sont possibles.',
      revoir: 'remarque',
    },
    {
      id: 't-8-4-8', type: 'corriger',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{Sur } 48 \\text{ personnes, } 12 \\text{ ont choisi le vert. Quel est l\'angle de ce secteur ?}',
      lignes: [
        { texte: '12 sur 48, cela fait 12 ÷ 48 = 0,25.', fausse: false },
        { texte: 'La fréquence du vert est donc de 25 %.', fausse: false },
        { texte: 'L\'angle du secteur « vert » mesure donc 25°.', fausse: true },
      ],
      explication:
        'Les deux premières lignes sont justes : la fréquence vaut bien 25 %. '
        + 'C\'est la troisième qui casse tout — un pourcentage n\'est pas un '
        + 'nombre de degrés. Il reste à multiplier par 360 : 0,25 × 360 = **90°**, '
        + 'le quart du disque.',
      piege: 'angle-du-diagramme', revoir: 'propriete',
    },
    {
      id: 't-8-4-9', type: 'trous',
      consigne:
        'Un club de 90 membres se répartit en trois sports. Le secteur « basket » '
        + 'mesure déjà 100°. Complète les deux autres angles, en degrés.',
      enonce:
        '\\text{Natation } 35 \\to \\square^\\circ \\qquad '
        + '\\text{Tennis } 30 \\to \\square^\\circ \\qquad '
        + '\\text{Basket } 25 \\to 100^\\circ',
      champs: [
        { id: 'a', etiquette: 'angle du secteur « natation »', attendu: 140 },
        { id: 'b', etiquette: 'angle du secteur « tennis »', attendu: 120 },
      ],
      piege: 'angle-du-diagramme', revoir: 'propriete',
    },
    {
      id: 't-8-4-10', type: 'vraifaux',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Dans un diagramme circulaire, deux catégories de même effectif ont des secteurs de même angle.',
      attendu: true,
      revoir: 'definition',
    },
  ],
};
