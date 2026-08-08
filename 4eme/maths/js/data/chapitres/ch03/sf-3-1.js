// Chapitre 3, savoir-faire 1 — Reconnaître un carré parfait et donner sa
// racine carrée.
//
// C'est la brique sur laquelle tout Pythagore va reposer : sans les carrés de
// 1 à 12 disponibles dans les deux sens, le théorème devient un calcul à la
// calculatrice au lieu d'un raisonnement.
//
// ── Le fil conducteur : la table se lit dans les deux sens ────────────────
//
// L'activité, la méthode et l'entraînement disent tous la même chose sous des
// formes différentes : 7 × 7 = 49 et √49 = 7 sont la MÊME ligne de table, lue
// dans un sens puis dans l'autre. C'est ce va-et-vient qui installe la racine
// carrée comme opération inverse, et pas comme un symbole de plus.
//
// ── Le piège dominant, et pourquoi il a deux faces ────────────────────────
//
// « carre-pris-pour-double » se manifeste dans les deux sens : 5² lu comme
// 5 + 5, et √36 lu comme 36 ÷ 2. Les deux erreurs viennent de la même
// conception — le petit 2 pris pour un facteur 2 — donc elles partagent le
// même piège, et les réponses fausses déclarées couvrent les deux faces.

export default {
  id: 'sf-3-1',
  titre: 'Reconnaître un carré parfait et donner sa racine carrée',
  attendus: [
    'Il connaît les carrés des nombres entiers de 1 à 12 et les racines carrées correspondantes.',
    'Il utilise la définition de la racine carrée d\'un nombre positif.',
  ],

  // On part de l'aire d'un carré, la seule situation où la racine carrée a
  // une existence concrète avant d'avoir un nom. L'élève fait le chemin
  // inverse SANS qu'on lui ait dit qu'il existait un symbole pour ça.
  decouvrir: {
    titre: 'Du carré à son côté',
    texte:
      'On construit des carrés avec des carreaux. Voici l\'aire obtenue selon '
      + 'le nombre de carreaux sur un côté.',
    lignes: [
      { calcul: 'côté 3 : 3 × 3', resultat: '9 carreaux' },
      { calcul: 'côté 4 : 4 × 4', resultat: '16 carreaux' },
      { calcul: 'côté 5 : 5 × 5', resultat: '25 carreaux' },
      { calcul: 'côté 6 : 6 × 6', resultat: '36 carreaux' },
    ],
    question:
      'Fais maintenant le chemin inverse : un carré a une aire de 49 carreaux, '
      + 'un autre de 144 carreaux. Combien de carreaux mesure leur côté ?',
    champs: [
      { id: 'a', etiquette: 'aire 49 → côté :', attendu: 7 },
      { id: 'b', etiquette: 'aire 144 → côté :', attendu: 12 },
    ],
    conclusion:
      'Ce chemin inverse — partir de l\'aire pour retrouver le côté — s\'appelle '
      + 'prendre la **racine carrée**. On écrit √49 = 7 et √144 = 12. Et remarque '
      + 'au passage : 7² vaut **49**, pas 14.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Racine carrée',
      texte:
        'La **racine carrée** d\'un nombre positif est le nombre **positif** dont '
        + 'le carré vaut ce nombre. On la note avec le signe √.\n'
        + 'Ainsi √49 = 7, parce que 7² = 49.',
    },
    {
      type: 'propriete',
      titre: 'Carré parfait',
      texte:
        'Un nombre est un **carré parfait** s\'il est le carré d\'un entier. Sa '
        + 'racine carrée est alors un **entier**.\n'
        + 'Sinon, la racine carrée tombe **entre deux entiers qui se suivent** : '
        + 'ceux dont les carrés entourent le nombre. Comme 49 < 60 < 64, on a '
        + '7 < √60 < 8.',
    },
    {
      type: 'exemple',
      texte:
        'Les carrés des entiers de 1 à 12, à connaître par cœur :\n'
        + '1 · 4 · 9 · 16 · 25 · 36 · 49 · 64 · 81 · 100 · 121 · 144\n'
        + 'Lue à l\'envers, cette ligne donne les racines carrées : √64 = 8, √121 = 11.',
    },
    {
      type: 'remarque',
      titre: 'Un carré n\'est pas un double',
      texte:
        '5² se lit « 5 au carré » et vaut 5 × 5 = **25**, pas 5 + 5 = 10. Le petit 2 '
        + 'compte les **facteurs**, il ne multiplie pas.\n'
        + 'Dans l\'autre sens, √36 vaut **6** et non 18 : prendre la racine carrée, '
        + 'ce n\'est pas diviser par 2.',
    },
  ],

  methode: {
    titre: 'Lire la table des carrés dans les deux sens',
    enonce: 'Donner la valeur exacte de √81, puis encadrer √60 entre deux entiers qui se suivent.',
    etapes: [
      {
        texte: 'Pour √81, je cherche le nombre positif dont le carré vaut 81. Dans la table : 9 × 9 = 81.',
        note: 'Je lis la table à l\'envers, du carré vers l\'entier.',
      },
      { texte: 'Donc √81 = 9.', note: '81 est un carré parfait : la racine tombe juste.' },
      {
        texte: 'Pour 60, je cherche les carrés parfaits qui l\'entourent : 49 < 60 < 64.',
        note: '49 = 7² et 64 = 8².',
      },
      {
        texte: 'Les entiers correspondants sont 7 et 8, donc 7 < √60 < 8.',
        note: '60 n\'est pas un carré parfait : sa racine ne tombe pas juste.',
      },
    ],
    controle:
      'Le contrôle : élève ta réponse au carré. 9² = 81, on retombe sur le nombre '
      + 'de départ. Pour l\'encadrement, vérifie que les carrés de tes deux entiers '
      + 'entourent bien 60 — 49 en dessous, 64 au-dessus.',
  },

  entrainement: [
    {
      id: 'e-3-1-1', type: 'calcul', palier: 1, piege: 'carre-pris-pour-double',
      consigne: 'Calcule.', enonce: '7^2', attendu: 49,
      fausses: [{ valeur: 14, piege: 'carre-pris-pour-double' }],
    },
    {
      // La même table, lue dans l'autre sens. L'erreur prévisible change de
      // forme — 64 ÷ 2 au lieu de 64 × 2 — mais c'est la même confusion.
      id: 'e-3-1-2', type: 'calcul', palier: 1, piege: 'carre-pris-pour-double',
      consigne: 'Donne la valeur exacte.', enonce: '\\sqrt{64}', attendu: 8,
      fausses: [{ valeur: 32, piege: 'carre-pris-pour-double' }],
    },
    {
      // Neutre : ici la moitié de 4 vaut 2, et √4 vaut 2 aussi. La confusion
      // « prendre la racine, c'est diviser par 2 » ne se voit donc pas — ce qui
      // interdit la contre-stratégie de surface « la moitié n'est jamais la
      // bonne réponse ». L'item ressemble aux autres, il ne tranche pas.
      id: 'e-3-1-3', type: 'calcul', palier: 1, neutre: true, piege: 'carre-pris-pour-double',
      consigne: 'Donne la valeur exacte.', enonce: '\\sqrt{4}', attendu: 2,
    },
    {
      id: 'e-3-1-4', type: 'calcul', palier: 1, piege: 'carre-pris-pour-double',
      consigne: 'Donne la valeur exacte.', enonce: '\\sqrt{144}', attendu: 12,
      fausses: [{ valeur: 72, piege: 'carre-pris-pour-double' }],
    },
    {
      id: 'e-3-1-5', type: 'trous', palier: 2, piege: 'carre-pris-pour-double',
      consigne: 'Complète pour que l\'égalité soit vraie.',
      enonce: '\\square^2 = 81',
      champs: [{ id: 'a', attendu: 9 }],
      fausses: [{ valeur: 40.5, piege: 'carre-pris-pour-double' }],
    },
    {
      id: 'e-3-1-6', type: 'plausible', palier: 2, piege: 'carre-pris-pour-double',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\sqrt{81} = 40{,}5', attendu: false,
      explication:
        'Non : 40,5 est la **moitié** de 81, pas sa racine carrée. On cherche le '
        + 'nombre dont le carré vaut 81, et c\'est 9. D\'ailleurs 40,5 × 40,5 dépasse '
        + '1 600 — beaucoup trop.',
    },
    {
      // Neutre : 50 n'est pas un carré parfait, donc la stratégie « je lis la
      // table des carrés » ne donne aucune réponse. Sans cet item, l'élève
      // apprendrait que toute racine tombe juste — et se bloquerait au premier
      // triangle dont le côté n'est pas entier.
      id: 'e-3-1-7', type: 'plausible', palier: 2, neutre: true, piege: 'encadrement-inverse',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\sqrt{50} \\approx 7{,}1', attendu: true,
      explication:
        'Oui : 49 < 50 < 64, donc √50 est compris entre 7 et 8. Comme 50 dépasse à '
        + 'peine 49, la racine est tout près de 7 — et 7,1 tombe bien là.',
    },
    {
      id: 'e-3-1-8', type: 'trous', palier: 2, piege: 'encadrement-inverse',
      consigne: 'Complète avec deux entiers qui se suivent.',
      enonce: 'a < \\sqrt{60} < b',
      champs: [{ id: 'a', attendu: 7 }, { id: 'b', attendu: 8 }],
      fausses: [
        { valeur: 59, piege: 'encadrement-inverse' },
        { valeur: 61, piege: 'encadrement-inverse' },
      ],
    },
    {
      id: 'e-3-1-9', type: 'vraifaux', palier: 3, piege: 'encadrement-inverse',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Tout nombre entier positif a une racine carrée qui est un nombre entier.',
      attendu: false,
      contreExemple: {
        invite: 'Trouve un entier positif qui n\'est pas un carré parfait.',
        champs: [{ id: 'a', etiquette: 'ce nombre' }],
        // On vérifie une propriété — « sa racine n'est pas entière » — et non une
        // réponse unique : 2, 3, 5, 10, 60… conviennent tous.
        valide: (a) => Number.isInteger(a) && a > 0 && !Number.isInteger(Math.sqrt(a)),
        exemple: '10 n\'est pas un carré parfait : 3² = 9 et 4² = 16, donc √10 est entre 3 et 4 sans jamais tomber juste.',
      },
    },
    {
      id: 'e-3-1-10', type: 'corriger', palier: 3, piege: 'racine-linearisee',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\sqrt{9 + 16}',
      lignes: [
        { texte: '√(9 + 16)', fausse: false },
        { texte: '= √9 + √16', fausse: true },
        { texte: '= 3 + 4 = 7', fausse: false },
      ],
      explication:
        'C\'est la deuxième ligne qui casse : la racine carrée ne se distribue pas '
        + 'sur une somme. Il faut d\'abord additionner, 9 + 16 = 25, puis extraire : '
        + '√25 = 5. La troisième ligne calcule juste, mais à partir d\'une écriture '
        + 'déjà fausse.',
    },
  ],

  problemes: [
    {
      id: 'p-3-1-1',
      enonce: 'Un tapis carré a une aire de 64 dm².',
      questions: [
        { texte: 'Quelle est la longueur de son côté ?', attendu: 8, unite: 'dm' },
        { texte: 'Quelle longueur de galon faut-il pour border ses quatre côtés ?', attendu: 32, unite: 'dm' },
      ],
    },
    {
      id: 'p-3-1-2',
      enonce:
        'Une salle carrée est entièrement pavée de dalles carrées identiques : il '
        + 'en faut 121 en tout, autant en largeur qu\'en longueur.',
      questions: [
        { texte: 'Combien de dalles compte une rangée ?', attendu: 11 },
        { texte: 'Chaque dalle mesure 50 cm de côté. Quelle est la longueur du côté de la salle ?', attendu: 550, unite: 'cm' },
      ],
    },
    {
      // Le seul problème où la racine ne tombe pas juste : il oblige à
      // encadrer plutôt qu'à chercher une valeur exacte qui n'existe pas.
      id: 'p-3-1-3',
      enonce:
        'Un potager carré a une aire de 90 m². Son côté ne tombe pas juste, mais on '
        + 'veut savoir entre quels nombres entiers de mètres il se situe.',
      questions: [
        { texte: 'Quel est l\'entier juste en dessous ?', attendu: 9, unite: 'm' },
        { texte: 'Et l\'entier juste au-dessus ?', attendu: 10, unite: 'm' },
      ],
    },
    {
      id: 'p-3-1-4',
      enonce: 'Une photo carrée de 5 cm de côté est agrandie : son côté passe à 9 cm.',
      questions: [
        { texte: 'Quelle était son aire au départ ?', attendu: 25, unite: 'cm²' },
        { texte: 'Quelle est son aire après l\'agrandissement ?', attendu: 81, unite: 'cm²' },
        { texte: 'De combien de cm² l\'aire a-t-elle augmenté ?', attendu: 56, unite: 'cm²' },
      ],
    },
    {
      id: 'p-3-1-5',
      enonce:
        'Un club range ses 144 ballons au sol en un carré parfait : autant de rangées '
        + 'que de ballons par rangée. Il reçoit ensuite 25 ballons supplémentaires, '
        + 'rangés eux aussi en carré.',
      questions: [
        { texte: 'Combien de ballons par rangée pour les 144 premiers ?', attendu: 12 },
        { texte: 'Et pour les 25 nouveaux ?', attendu: 5 },
        { texte: 'Réunis, les 169 ballons forment encore un carré. Combien y en a-t-il par rangée ?', attendu: 13 },
      ],
    },
  ],

  test: [
    {
      id: 't-3-1-1', type: 'calcul', consigne: 'Calcule.', enonce: '6^2', attendu: 36,
      fausses: [{ valeur: 12, piege: 'carre-pris-pour-double' }], revoir: 'exemple',
    },
    {
      id: 't-3-1-2', type: 'calcul', consigne: 'Donne la valeur exacte.', enonce: '\\sqrt{25}', attendu: 5,
      fausses: [{ valeur: 12.5, piege: 'carre-pris-pour-double' }], revoir: 'definition',
    },
    {
      id: 't-3-1-3', type: 'calcul', consigne: 'Calcule.', enonce: '11^2', attendu: 121,
      fausses: [{ valeur: 22, piege: 'carre-pris-pour-double' }], revoir: 'exemple',
    },
    {
      id: 't-3-1-4', type: 'calcul', consigne: 'Donne la valeur exacte.', enonce: '\\sqrt{100}', attendu: 10,
      fausses: [{ valeur: 50, piege: 'carre-pris-pour-double' }], revoir: 'definition',
    },
    {
      id: 't-3-1-5', type: 'trous', consigne: 'Complète pour que l\'égalité soit vraie.',
      enonce: '\\square^2 = 49', champs: [{ id: 'a', attendu: 7 }],
      fausses: [{ valeur: 24.5, piege: 'carre-pris-pour-double' }], revoir: 'definition',
    },
    {
      id: 't-3-1-6', type: 'calcul', consigne: 'Donne la valeur exacte.', enonce: '\\sqrt{9}', attendu: 3,
      fausses: [{ valeur: 4.5, piege: 'carre-pris-pour-double' }], revoir: 'exemple',
    },
    {
      id: 't-3-1-7', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\sqrt{36} = 18', attendu: false,
      explication:
        '18 est la moitié de 36, pas sa racine carrée. La racine de 36 vaut 6, '
        + 'car 6 × 6 = 36 — alors que 18 × 18 fait 324.',
      piege: 'carre-pris-pour-double', revoir: 'remarque',
    },
    {
      id: 't-3-1-8', type: 'trous', consigne: 'Complète avec deux entiers qui se suivent.',
      enonce: 'a < \\sqrt{30} < b', champs: [{ id: 'a', attendu: 5 }, { id: 'b', attendu: 6 }],
      fausses: [
        { valeur: 29, piege: 'encadrement-inverse' },
        { valeur: 31, piege: 'encadrement-inverse' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-3-1-9', type: 'calcul', consigne: 'Donne la valeur exacte.', enonce: '\\sqrt{121}', attendu: 11,
      fausses: [{ valeur: 60.5, piege: 'carre-pris-pour-double' }], revoir: 'exemple',
    },
    {
      id: 't-3-1-10', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\sqrt{40} \\approx 6{,}3', attendu: true,
      explication: '36 < 40 < 49, donc √40 est compris entre 6 et 7. La valeur 6,3 tombe bien dans cet intervalle.',
      revoir: 'propriete',
    },
  ],
};
