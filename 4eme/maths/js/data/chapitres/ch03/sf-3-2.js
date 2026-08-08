// Chapitre 3, savoir-faire 2 — Encadrer une racine carrée entre deux entiers
// consécutifs.
//
// ── Ce que ce savoir-faire n'a PAS ────────────────────────────────────────
//
// Aucune propriété algébrique des racines : ni √(ab) = √a × √b, ni √(a/b),
// ni simplification de radical. Rien de tout cela n'est au programme de 4e.
// Ici, une racine carrée se manipule par les CARRÉS qu'on connaît, et par eux
// seuls. Tout le savoir-faire tient dans un aller-retour : je connais les
// carrés, donc je sais entre quels entiers une racine se trouve.
//
// ── Pourquoi ce savoir-faire compte plus qu'il n'en a l'air ───────────────
//
// Il n'a pas d'intérêt en lui-même. Il en a un énorme au savoir-faire suivant :
// quand Pythagore donnera « le carré de l'hypoténuse vaut 74 », l'encadrement
// est ce qui permet de dire tout de suite « donc entre 8 et 9 cm » — et donc de
// repérer qu'une réponse de 74 cm est absurde. C'est le geste de contrôle de
// tout le chapitre, installé avant d'en avoir besoin.
//
// ── Le piège du moment, et son neutre ─────────────────────────────────────
//
// Le piège travaillé est « encadrement-inverse », sous ses deux faces :
// encadrer le nombre au lieu de sa racine (59 < 60 < 61), et recopier les
// carrés au lieu des entiers dont ils viennent (64 < √75 < 81).
// L'item neutre est celui où la racine TOMBE JUSTE : sans lui, « il faut
// toujours répondre deux entiers différents » deviendrait la règle apprise,
// et √169 mettrait l'élève en échec.

export default {
  id: 'sf-3-2',
  titre: 'Encadrer une racine carrée entre deux entiers consécutifs',
  attendus: [
    'Il encadre la racine carrée d\'un entier entre deux entiers consécutifs, sans calculatrice.',
    'Il connaît et utilise les carrés des entiers de 1 à 15.',
  ],

  // On ne parle pas d'encadrement : on met l'élève en face d'un nombre qui
  // n'existe pas dans la table des carrés, et il constate lui-même qu'il ne
  // peut le situer qu'entre deux lignes. Le mot vient après le geste.
  decouvrir: {
    titre: 'Le nombre qui manque entre deux lignes',
    texte:
      'On cherche un nombre dont le carré vaut exactement 60. Voici la table des '
      + 'carrés dans laquelle le chercher.',
    lignes: [
      { calcul: '6 × 6', resultat: '36' },
      { calcul: '7 × 7', resultat: '49' },
      { calcul: '8 × 8', resultat: '64' },
      { calcul: '9 × 9', resultat: '81' },
    ],
    question:
      'Aucune ligne ne donne 60 : le nombre cherché n\'est pas un entier. Mais 60 '
      + 'se glisse entre deux carrés de la table. Entre quels deux entiers se '
      + 'trouve donc le nombre cherché ?',
    champs: [
      { id: 'a', etiquette: 'plus grand que', attendu: 7 },
      { id: 'b', etiquette: 'et plus petit que', attendu: 8 },
    ],
    conclusion:
      'Ce nombre existe bel et bien : il s\'appelle **√60**. Sa valeur exacte ne '
      + 's\'écrit pas, même avec une calculatrice — mais on sait le **coincer**. '
      + 'Puisque 49 < 60 < 64, on a **7 < √60 < 8**. Encadrer, c\'est exactement ça.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Carré parfait',
      texte:
        'Un **carré parfait** est le carré d\'un entier. Les quinze premiers sont :\n'
        + '1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225.\n'
        + 'Leur racine carrée est un entier : √144 = 12, parce que 12 × 12 = 144.',
    },
    {
      type: 'propriete',
      titre: 'Encadrer une racine carrée',
      texte:
        'Chez les nombres positifs, **le plus grand est celui qui a le plus grand '
        + 'carré**. Comparer des nombres revient donc à comparer leurs carrés.\n'
        + 'Ainsi, si a et b sont deux entiers consécutifs et si a² < n < b², alors '
        + '**a < √n < b**.',
    },
    {
      type: 'remarque',
      titre: 'Quand la racine tombe juste',
      texte:
        'Si le nombre est lui-même un carré parfait, il n\'y a rien à encadrer : '
        + '√169 vaut exactement 13. Regarde donc toujours d\'abord si le nombre '
        + 'figure dans la table des carrés.',
    },
    {
      type: 'exemple',
      texte:
        '49 < 60 < 64, donc 7 < √60 < 8   ·   100 < 110 < 121, donc 10 < √110 < 11   '
        + '·   196 < 200 < 225, donc 14 < √200 < 15',
    },
  ],

  methode: {
    titre: 'Encadrer sans calculatrice',
    enonce: 'Encadrer √150 entre deux entiers consécutifs.',
    etapes: [
      {
        texte: 'Je remonte la table des carrés jusqu\'à dépasser 150 : 11² = 121, 12² = 144, 13² = 169.',
        note: '144 est en dessous de 150, 169 au-dessus : je suis allé assez loin.',
      },
      {
        texte: 'J\'écris l\'encadrement des carrés, avec 150 au milieu : 144 < 150 < 169.',
        note: 'Autrement dit 12² < 150 < 13².',
      },
      {
        texte: 'Je remplace chaque carré par l\'entier dont il vient : 12 < √150 < 13.',
        note: 'Le plus petit à gauche, toujours.',
      },
    ],
    controle:
      'Le contrôle : élève tes deux entiers au carré. 12² = 144 et 13² = 169, et 150 '
      + 'est bien entre les deux. Si le nombre de départ ne tombe pas entre tes deux '
      + 'carrés, l\'encadrement est faux.',
  },

  entrainement: [
    // Palier 1 : l'outil avant l'usage. Sans les carrés en mémoire, aucun
    // encadrement n'est possible — autant vérifier qu'ils sont là.
    {
      id: 'e-3-2-1', type: 'calcul', palier: 1, piege: 'carre-pris-pour-double',
      consigne: 'Calcule ce carré.', enonce: '12^2', attendu: 144,
      fausses: [{ valeur: 24, piege: 'carre-pris-pour-double' }],
    },
    {
      id: 'e-3-2-2', type: 'calcul', palier: 1, piege: 'carre-pris-pour-double',
      consigne: 'Calcule cette racine carrée.', enonce: '\\sqrt{49}', attendu: 7,
      fausses: [{ valeur: 24.5, piege: 'carre-pris-pour-double' }],
    },
    {
      id: 'e-3-2-3', type: 'trous', palier: 1, piege: 'encadrement-inverse',
      consigne: 'Encadre cette racine carrée par deux entiers consécutifs.',
      enonce: '\\square < \\sqrt{60} < \\square',
      champs: [{ id: 'a', attendu: 7 }, { id: 'b', attendu: 8 }],
      // 59 et 61 encadrent 60 lui-même : c'est la confusion à diagnostiquer.
      fausses: [
        { valeur: 59, piege: 'encadrement-inverse' },
        { valeur: 61, piege: 'encadrement-inverse' },
      ],
    },
    {
      id: 'e-3-2-4', type: 'trous', palier: 2, piege: 'encadrement-inverse',
      consigne: 'Encadre cette racine carrée par deux entiers consécutifs.',
      enonce: '\\square < \\sqrt{30} < \\square',
      champs: [{ id: 'a', attendu: 5 }, { id: 'b', attendu: 6 }],
      fausses: [
        { valeur: 29, piege: 'encadrement-inverse' },
        { valeur: 31, piege: 'encadrement-inverse' },
      ],
    },
    {
      id: 'e-3-2-5', type: 'plausible', palier: 2, piege: 'encadrement-inverse',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '8 < \\sqrt{90} < 9', attendu: false,
      explication:
        '8² = 64 et 9² = 81 : 90 dépasse déjà 81, il n\'est pas entre les deux. '
        + 'Comme 81 < 90 < 100, l\'encadrement correct est 9 < √90 < 10.',
    },
    {
      // L'item neutre : la racine tombe juste, donc le piège de l'encadrement
      // ne joue pas du tout. Il ressemble aux autres — même consigne, même
      // forme — mais répondre « il faut deux entiers » y mène à l'échec.
      id: 'e-3-2-6', type: 'plausible', palier: 2, neutre: true, piege: 'encadrement-inverse',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\sqrt{169} = 13', attendu: true,
      explication:
        '13 × 13 = 169 : c\'est un carré parfait. La racine tombe juste, il n\'y a '
        + 'rien à encadrer.',
    },
    {
      id: 'e-3-2-7', type: 'comparer', palier: 2, piege: 'encadrement-inverse',
      consigne: 'Compare ces deux nombres.',
      enonce: '\\sqrt{40} \\ldots 7', attendu: '<',
      fausses: [{ valeur: '>', piege: 'encadrement-inverse' }],
    },
    {
      id: 'e-3-2-8', type: 'trous', palier: 3, piege: 'encadrement-inverse',
      consigne: 'Encadre cette racine carrée par deux entiers consécutifs.',
      enonce: '\\square < \\sqrt{150} < \\square',
      champs: [{ id: 'a', attendu: 12 }, { id: 'b', attendu: 13 }],
      fausses: [
        { valeur: 149, piege: 'encadrement-inverse' },
        { valeur: 151, piege: 'encadrement-inverse' },
      ],
    },
    {
      // La seconde face du piège : le raisonnement est juste jusqu'au bout,
      // et c'est la recopie finale qui garde les carrés au lieu des entiers.
      id: 'e-3-2-9', type: 'corriger', palier: 3, piege: 'encadrement-inverse',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\sqrt{75}',
      lignes: [
        { texte: 'Je cherche les carrés parfaits qui entourent 75.', fausse: false },
        { texte: '8² = 64 et 9² = 81, donc 64 < 75 < 81.', fausse: false },
        { texte: 'Donc 64 < √75 < 81.', fausse: true },
      ],
      explication:
        'Les deux premières lignes sont justes. À la troisième, ce sont les carrés '
        + 'qui ont été recopiés au lieu des entiers dont ils viennent. L\'encadrement '
        + 'correct est 8 < √75 < 9.',
    },
    {
      id: 'e-3-2-10', type: 'vraifaux', palier: 3, piege: 'encadrement-inverse',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'La racine carrée d\'un entier est toujours coincée entre deux entiers consécutifs.',
      attendu: false,
      contreExemple: {
        invite: 'Trouve un entier dont la racine carrée est, elle aussi, un entier.',
        champs: [{ id: 'a', etiquette: 'cet entier' }],
        // On vérifie la propriété « être un carré parfait », pas une réponse
        // unique : 1, 4, 9, 16, 25… conviennent tous.
        valide: (a) => Number.isInteger(a) && a > 0 && Number.isInteger(Math.sqrt(a)),
        exemple: '36 : sa racine carrée vaut exactement 6, elle n\'est coincée entre rien.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-3-2-1',
      enonce:
        'Un carré de papier a une aire de 200 cm². On cherche la longueur de son '
        + 'côté, sans calculatrice.',
      questions: [
        { texte: 'Quel est le plus grand entier dont le carré ne dépasse pas 200 ?', attendu: 14 },
        { texte: 'Quel est le plus petit entier dont le carré dépasse 200 ?', attendu: 15 },
      ],
    },
    {
      id: 'p-3-2-2',
      enonce:
        'Un terrain carré a une aire de 500 m². Le vendeur annonce un côté « d\'un '
        + 'peu plus de 22 mètres ». On veut vérifier.',
      questions: [
        { texte: 'Entre quels entiers se trouve la longueur du côté ? Donne le plus petit.', attendu: 22, unite: 'm' },
        { texte: 'Donne maintenant le plus grand.', attendu: 23, unite: 'm' },
      ],
    },
    {
      // Deux aires qui sont des carrés parfaits : c'est le pendant du neutre,
      // côté problèmes. On n'encadre pas quand la réponse tombe juste.
      id: 'p-3-2-3',
      enonce:
        'Une salle carrée est pavée de dalles carrées identiques. Il en faut 324 '
        + 'pour couvrir toute la salle.',
      questions: [
        { texte: 'Combien y a-t-il de dalles sur un côté ?', attendu: 18 },
        { texte: 'Et s\'il en fallait 400 en tout, combien y en aurait-il sur un côté ?', attendu: 20 },
      ],
    },
    {
      id: 'p-3-2-4',
      enonce:
        'On veut un potager carré d\'au moins 150 m², dont le côté mesure un nombre '
        + 'entier de mètres.',
      questions: [
        { texte: 'Quel est le plus petit côté possible ?', attendu: 13, unite: 'm' },
        { texte: 'Quelle est alors l\'aire du potager ?', attendu: 169, unite: 'm²' },
      ],
    },
    {
      // Un avant-goût du savoir-faire suivant : c'est là que l'encadrement
      // sert vraiment, en donnant une longueur plausible avant tout calcul.
      id: 'p-3-2-5',
      enonce:
        'Dans un triangle rectangle, les deux côtés de l\'angle droit mesurent 5 cm '
        + 'et 7 cm. On sait que le carré de la longueur de l\'hypoténuse est égal à '
        + '5² + 7².',
      questions: [
        { texte: 'Combien vaut 25 + 49 ?', attendu: 74 },
        { texte: 'L\'hypoténuse est entre deux entiers. Donne le plus petit.', attendu: 8, unite: 'cm' },
        { texte: 'Donne le plus grand.', attendu: 9, unite: 'cm' },
      ],
    },
  ],

  test: [
    { id: 't-3-2-1', type: 'calcul', consigne: 'Calcule ce carré.', enonce: '11^2', attendu: 121, revoir: 'definition' },
    { id: 't-3-2-2', type: 'calcul', consigne: 'Calcule cette racine carrée.', enonce: '\\sqrt{64}', attendu: 8, revoir: 'definition' },
    {
      id: 't-3-2-3', type: 'trous', consigne: 'Encadre par deux entiers consécutifs.',
      enonce: '\\square < \\sqrt{20} < \\square',
      champs: [{ id: 'a', attendu: 4 }, { id: 'b', attendu: 5 }],
      fausses: [{ valeur: 19, piege: 'encadrement-inverse' }],
      revoir: 'propriete',
    },
    {
      id: 't-3-2-4', type: 'trous', consigne: 'Encadre par deux entiers consécutifs.',
      enonce: '\\square < \\sqrt{50} < \\square',
      champs: [{ id: 'a', attendu: 7 }, { id: 'b', attendu: 8 }],
      fausses: [{ valeur: 49, piege: 'encadrement-inverse' }],
      revoir: 'propriete',
    },
    {
      id: 't-3-2-5', type: 'trous', consigne: 'Encadre par deux entiers consécutifs.',
      enonce: '\\square < \\sqrt{110} < \\square',
      champs: [{ id: 'a', attendu: 10 }, { id: 'b', attendu: 11 }],
      revoir: 'exemple',
    },
    { id: 't-3-2-6', type: 'calcul', consigne: 'Calcule cette racine carrée.', enonce: '\\sqrt{196}', attendu: 14, revoir: 'remarque' },
    {
      id: 't-3-2-7', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: '6 < \\sqrt{45} < 7', attendu: true,
      explication: '6² = 36 et 7² = 49, et 36 < 45 < 49. L\'encadrement est correct.',
      revoir: 'propriete',
    },
    {
      id: 't-3-2-8', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: '10 < \\sqrt{85} < 11', attendu: false,
      explication:
        '10² = 100, or 85 est plus petit que 100. Comme 81 < 85 < 100, l\'encadrement '
        + 'correct est 9 < √85 < 10.',
      piege: 'encadrement-inverse', revoir: 'propriete',
    },
    {
      id: 't-3-2-9', type: 'comparer', consigne: 'Compare ces deux nombres.',
      enonce: '\\sqrt{55} \\ldots 8', attendu: '<',
      fausses: [{ valeur: '>', piege: 'encadrement-inverse' }],
      revoir: 'propriete',
    },
    {
      id: 't-3-2-10', type: 'trous', consigne: 'Encadre par deux entiers consécutifs.',
      enonce: '\\square < \\sqrt{200} < \\square',
      champs: [{ id: 'a', attendu: 14 }, { id: 'b', attendu: 15 }],
      revoir: 'exemple',
    },
  ],
};
