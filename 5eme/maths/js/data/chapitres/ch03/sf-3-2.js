// Chapitre 3, savoir-faire 2 — Lire et placer un point sur une droite graduée.
//
// ── D'où vient ce savoir-faire ────────────────────────────────────────────
//
// Du point « droite graduée : lire l'abscisse d'un point, placer un point
// d'abscisse donnée » de la liste de la professeure. La demi-droite graduée
// est connue depuis la 6e ; ce qui change, c'est la partie gauche.
//
// ── Deux erreurs, deux familles d'items ──────────────────────────────────
//
// Le signe oublié (−3 lu « 3 ») et la graduation mal comptée (une graduation
// qui vaut 0,5 lue comme 1). Les paliers les séparent : au palier 1, une
// graduation vaut toujours 1 et seul le signe est en jeu ; au palier 2, elle
// vaut 0,5 ou 10 ; au palier 3, 0,2 ou 5.
//
// « Placer un point » se fait à l'écran en choisissant parmi des points déjà
// placés : chaque mauvais point est une erreur prévue — le symétrique par
// rapport à 0 pour le signe, un point décalé d'une graduation pour le comptage.

const droite = (min, max, pas, points, ecrites) => ({ modele: 'droite', min, max, pas, points, ecrites });

export default {
  id: 'sf-3-2',
  titre: 'Lire et placer un point sur une droite graduée',
  attendus: [
    'Il lit l\'abscisse d\'un point sur une droite graduée, y compris quand elle est négative.',
    'Il repère ce que vaut une graduation avant de compter.',
    'Il place un point d\'abscisse donnée.',
  ],

  decouvrir: {
    titre: 'Un thermomètre couché',
    texte:
      'Une droite graduée, c\'est un thermomètre couché : zéro au milieu, les nombres '
      + 'positifs à droite, les négatifs à gauche. Ici, une graduation vaut 1.',
    figure: droite(-6, 6, 1, { A: 3, B: -4 }, [-5, 0, 5]),
    question: 'Quel nombre repère le point A ? Et le point B ?',
    champs: [
      { id: 'a', etiquette: 'le point A', attendu: 3 },
      { id: 'b', etiquette: 'le point B', attendu: -4 },
    ],
    conclusion:
      'A est à 3 graduations à droite de zéro : il est repéré par **3**. B est à 4 '
      + 'graduations à gauche : il est repéré par **−4**.\n'
      + 'Ce nombre s\'appelle l\'**abscisse** du point. On écrit **A(3)** et **B(−4)**.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Droite graduée et abscisse',
      texte:
        'Une **droite graduée** a une **origine** (le point d\'abscisse 0), un sens (la '
        + 'flèche) et une **unité**, reportée régulièrement.\n'
        + 'Chaque point de la droite est repéré par un nombre relatif : son **abscisse**. '
        + 'On écrit **A(−2)** : « le point A d\'abscisse −2 ».\n'
        + 'À droite de l\'origine, les abscisses sont positives ; à gauche, elles sont négatives.',
      figure: droite(-4, 4, 1, { A: -2, B: 3 }, [-4, -2, 0, 2, 4]),
    },
    {
      type: 'propriete',
      titre: 'Que vaut une graduation ?',
      texte:
        'Avant de lire, on choisit deux nombres écrits et on compte les **intervalles** entre eux.\n'
        + 'Si 0 et 1 sont séparés par **2** intervalles, une graduation vaut **0,5** ; par '
        + '**5** intervalles, **0,2** ; par **10** intervalles, **0,1**.\n'
        + 'Sur cette droite, une graduation vaut 0,5 : C a pour abscisse −1,5.',
      figure: droite(-2, 2, 0.5, { C: -1.5 }, [-2, -1, 0, 1, 2]),
    },
    {
      type: 'remarque',
      titre: 'Un point entre deux graduations',
      texte:
        'Un point placé au milieu de deux graduations a pour abscisse le nombre du milieu : '
        + 'entre −3 et −2, c\'est **−2,5**.',
    },
    {
      type: 'exemple',
      texte: 'A(−2) : 2 unités à gauche de 0   ·   B(3) : 3 unités à droite   ·   C(−1,5) : entre −2 et −1',
    },
  ],

  methode: {
    titre: 'Lire l\'abscisse du point M',
    enonce: 'Quelle est l\'abscisse du point M ?',
    figure: droite(-3, 1, 0.5, { M: -2.5 }, [-3, -2, -1, 0, 1]),
    etapes: [
      {
        texte: 'Je choisis deux nombres écrits, 0 et 1, et je compte les intervalles entre eux : il y en a 2.',
        note: 'Une graduation vaut donc 1 ÷ 2 = 0,5.',
      },
      {
        texte: 'M est à gauche de 0 : son abscisse est négative.',
        note: 'J\'écris le « − » tout de suite, pour ne pas l\'oublier.',
      },
      { texte: 'De 0 à M, je compte 5 graduations : 5 × 0,5 = 2,5.', note: '' },
      { texte: 'L\'abscisse de M est −2,5. On écrit M(−2,5).', note: '' },
    ],
    controle:
      'Le contrôle : encadre ton résultat par les deux nombres écrits les plus proches. '
      + 'M est entre −3 et −2 : −2,5 convient, 2,5 non.',
  },

  entrainement: [
    // ── Palier 1 : une graduation vaut 1, seul le signe est en jeu ─────────
    {
      // NEUTRE : un point à droite de zéro, le signe ne peut pas manquer.
      id: 'e-3-2-1', type: 'calcul', palier: 1, neutre: true,
      consigne: 'Lis l\'abscisse du point A.', enonce: 'Quelle est l\'abscisse de A ?',
      figure: droite(-5, 5, 1, { A: 4 }, [-5, 0, 5]),
      abscisseDe: 'A', attendu: 4,
    },
    {
      id: 'e-3-2-2', type: 'calcul', palier: 1, piege: 'signe-oublie',
      consigne: 'Lis l\'abscisse du point B.', enonce: 'Quelle est l\'abscisse de B ?',
      figure: droite(-5, 5, 1, { B: -3 }),
      abscisseDe: 'B', attendu: -3,
      fausses: [{ valeur: 3, piege: 'signe-oublie' }],
    },
    {
      id: 'e-3-2-3', type: 'choix', palier: 1, piege: 'graduation-mal-lue',
      consigne: 'Quel point a pour abscisse −2 ?', enonce: 'Trouve le point d\'abscisse −2.',
      figure: droite(-5, 5, 1, { A: 2, B: -2, C: -3, D: -1 }),
      lettreDAbscisse: -2,
      choix: ['A', 'B', 'C', 'D'], attendu: 'B',
      fausses: [
        { valeur: 'A', piege: 'signe-oublie' },
        { valeur: 'C', piege: 'graduation-mal-lue' },
        // −1 : le trait de l'origine compté comme le premier.
        { valeur: 'D', piege: 'graduation-mal-lue' },
      ],
    },
    {
      id: 'e-3-2-4', type: 'calcul', palier: 1, piege: 'signe-oublie',
      consigne: 'Lis l\'abscisse du point E.', enonce: 'Quelle est l\'abscisse de E ?',
      figure: droite(-8, 2, 1, { E: -7 }, [-5, 0]),
      abscisseDe: 'E', attendu: -7,
      fausses: [
        { valeur: 7, piege: 'signe-oublie' },
        { valeur: -6, piege: 'graduation-mal-lue' },
        { valeur: -8, piege: 'graduation-mal-lue' },
      ],
    },
    // ── Palier 2 : une graduation vaut 0,5 ou 10 ───────────────────────────
    {
      id: 'e-3-2-5', type: 'calcul', palier: 2, piege: 'graduation-mal-lue',
      consigne: 'Lis l\'abscisse du point F.', enonce: 'Quelle est l\'abscisse de F ?',
      figure: droite(-3, 3, 0.5, { F: -1.5 }, [0, 1]),
      abscisseDe: 'F', attendu: -1.5,
      fausses: [
        // 3 graduations lues comme 3 unités.
        { valeur: -3, piege: 'graduation-mal-lue' },
        { valeur: 1.5, piege: 'signe-oublie' },
      ],
    },
    {
      id: 'e-3-2-6', type: 'calcul', palier: 2, piege: 'graduation-mal-lue',
      consigne: 'Lis l\'abscisse du point G.', enonce: 'Quelle est l\'abscisse de G ?',
      figure: droite(-60, 40, 10, { G: -40 }),
      abscisseDe: 'G', attendu: -40,
      fausses: [
        { valeur: -4, piege: 'graduation-mal-lue' },
        { valeur: 40, piege: 'signe-oublie' },
      ],
    },
    {
      id: 'e-3-2-7', type: 'choix', palier: 2, piege: 'graduation-mal-lue',
      consigne: 'Quel point a pour abscisse −0,5 ?', enonce: 'Trouve le point d\'abscisse −0,5.',
      figure: droite(-3, 1, 0.5, { A: -2.5, B: -0.5, C: 0.5 }, [-2, -1, 0, 1]),
      lettreDAbscisse: -0.5,
      choix: ['A', 'B', 'C'], attendu: 'B',
      fausses: [
        // « 0,5 », c'est 5 graduations — la valeur d'une graduation ignorée.
        { valeur: 'A', piege: 'graduation-mal-lue' },
        { valeur: 'C', piege: 'signe-oublie' },
      ],
    },
    {
      // NEUTRE pour le signe : un point à droite de zéro. La graduation, elle,
      // compte toujours.
      id: 'e-3-2-8', type: 'calcul', palier: 2, neutre: true,
      consigne: 'Lis l\'abscisse du point H.', enonce: 'Quelle est l\'abscisse de H ?',
      figure: droite(-1, 4, 0.5, { H: 3.5 }, [0, 2, 4]),
      abscisseDe: 'H', attendu: 3.5,
      fausses: [{ valeur: 7, piege: 'graduation-mal-lue' }],
    },
    // ── Palier 3 : 0,2 et 5, puis encadrer ─────────────────────────────────
    {
      id: 'e-3-2-9', type: 'calcul', palier: 3, piege: 'graduation-mal-lue',
      consigne: 'Lis l\'abscisse du point K.', enonce: 'Quelle est l\'abscisse de K ?',
      figure: droite(-1, 1, 0.2, { K: -0.6 }, [-1, 0, 1]),
      abscisseDe: 'K', attendu: -0.6,
      fausses: [
        { valeur: -3, piege: 'graduation-mal-lue' },
        // Chaque graduation prise pour 0,1.
        { valeur: -0.3, piege: 'graduation-mal-lue' },
        { valeur: 0.6, piege: 'signe-oublie' },
      ],
    },
    {
      id: 'e-3-2-10', type: 'choix', palier: 3, piege: 'graduation-mal-lue',
      consigne: 'Quel point a pour abscisse −15 ?', enonce: 'Trouve le point d\'abscisse −15.',
      figure: droite(-25, 15, 5, { P: 15, Q: -10, R: -15 }, [0, 10]),
      lettreDAbscisse: -15,
      choix: ['P', 'Q', 'R'], attendu: 'R',
      fausses: [
        { valeur: 'P', piege: 'signe-oublie' },
        { valeur: 'Q', piege: 'graduation-mal-lue' },
      ],
    },
    {
      id: 'e-3-2-11', type: 'vraifaux', palier: 3, piege: 'signe-oublie',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Sur une droite graduée orientée vers la droite, tout point situé à gauche de l\'origine a une abscisse négative.',
      attendu: true,
    },
    {
      id: 'e-3-2-12', type: 'trous', palier: 3, piege: 'negatifs-compares-comme-positifs',
      consigne: 'Encadre l\'abscisse du point M par deux nombres entiers qui se suivent.',
      enonce: 'Entre quels entiers se trouve l\'abscisse de M ?',
      figure: droite(-4, 1, 0.5, { M: -2.5 }, [0, 1]),
      champs: [
        { id: 'a', etiquette: 'l\'entier juste à gauche de M', attendu: -3 },
        { id: 'b', etiquette: 'l\'entier juste à droite de M', attendu: -2 },
      ],
      fausses: [
        { valeur: 3, piege: 'signe-oublie' },
        { valeur: 2, piege: 'signe-oublie' },
      ],
    },
  ],

  problemes: [
    {
      id: 'p-3-2-1',
      enonce:
        'Ce thermomètre couché indique, en degrés, la température de la nuit (point N) '
        + 'et celle de midi (point M).',
      figure: droite(-10, 10, 2, { N: -6, M: 8 }, [-10, 0, 10]),
      questions: [
        { texte: 'Quelle température fait-il la nuit ?', attendu: -6, unite: '°C' },
        { texte: 'De combien de degrés la température a-t-elle monté entre la nuit et midi ?', attendu: 14, unite: '°C' },
      ],
    },
    {
      id: 'p-3-2-2',
      enonce:
        'Sur cette frise chronologique, l\'origine est la naissance de J.-C. Le point P '
        + 'marque la construction d\'un pont, le point T celle d\'une tour.',
      figure: droite(-800, 400, 100, { P: -600, T: -200 }, [-500, 0]),
      questions: [
        { texte: 'Que vaut une graduation, en années ?', attendu: 100, unite: 'ans' },
        { texte: 'En quelle année le pont a-t-il été construit ? Réponds avec un nombre relatif.', attendu: -600 },
        { texte: 'Combien d\'années séparent la construction du pont de celle de la tour ?', attendu: 400, unite: 'ans' },
      ],
    },
    {
      id: 'p-3-2-3',
      enonce:
        'Un plongeur (point P) et une mouette (point O) sont repérés par leur altitude, en '
        + 'mètres. L\'origine est le niveau de la mer.',
      figure: droite(-30, 20, 5, { P: -25, O: 15 }, [-20, -10, 0, 10, 20]),
      questions: [
        { texte: 'À quelle altitude est le plongeur ?', attendu: -25, unite: 'm' },
        { texte: 'Quelle distance verticale sépare le plongeur de la mouette ?', attendu: 40, unite: 'm' },
      ],
    },
    {
      id: 'p-3-2-4',
      enonce: 'Sur cette droite graduée, on a placé les points A et B. Le point C est le milieu du segment [AB].',
      figure: droite(-6, 4, 1, { A: -5, B: 3 }),
      questions: [
        { texte: 'Quelle est l\'abscisse de A ?', attendu: -5 },
        { texte: 'Combien d\'unités séparent A et B ?', attendu: 8 },
        { texte: 'Quelle est l\'abscisse de C ?', attendu: -1 },
      ],
    },
    {
      id: 'p-3-2-5',
      enonce:
        'Un pion part de l\'origine d\'une droite graduée, où une graduation vaut 1. Il '
        + 'avance de 3 graduations vers la droite, puis recule de 7 graduations vers la gauche.',
      questions: [
        { texte: 'Quelle est l\'abscisse du pion après avoir avancé ?', attendu: 3 },
        { texte: 'Quelle est son abscisse à la fin ?', attendu: -4 },
      ],
    },
  ],

  test: [
    {
      id: 't-3-2-1', type: 'calcul', consigne: 'Lis l\'abscisse du point A.', enonce: 'Quelle est l\'abscisse de A ?',
      figure: droite(-5, 5, 1, { A: -2 }), abscisseDe: 'A', attendu: -2, revoir: 'definition',
    },
    {
      id: 't-3-2-2', type: 'calcul', consigne: 'Lis l\'abscisse du point B.', enonce: 'Quelle est l\'abscisse de B ?',
      figure: droite(-5, 5, 1, { B: 4 }), abscisseDe: 'B', attendu: 4, revoir: 'definition',
    },
    {
      id: 't-3-2-3', type: 'calcul', consigne: 'Lis l\'abscisse du point C.', enonce: 'Quelle est l\'abscisse de C ?',
      figure: droite(-3, 2, 0.5, { C: -2.5 }, [0, 1]), abscisseDe: 'C', attendu: -2.5, revoir: 'propriete',
    },
    {
      id: 't-3-2-4', type: 'calcul', consigne: 'Lis l\'abscisse du point D.', enonce: 'Quelle est l\'abscisse de D ?',
      figure: droite(-50, 50, 10, { D: -30 }), abscisseDe: 'D', attendu: -30, revoir: 'propriete',
    },
    {
      id: 't-3-2-5', type: 'choix', consigne: 'Quel point a pour abscisse −4 ?', enonce: 'Trouve le point d\'abscisse −4.',
      figure: droite(-6, 6, 1, { A: 4, B: -3, C: -4 }), lettreDAbscisse: -4,
      choix: ['A', 'B', 'C'], attendu: 'C', revoir: 'definition',
    },
    {
      id: 't-3-2-6', type: 'choix', consigne: 'Quel point a pour abscisse 1,5 ?', enonce: 'Trouve le point d\'abscisse 1,5.',
      figure: droite(-2, 2, 0.5, { E: -1.5, F: 1.5, G: 0.5 }, [0, 1]), lettreDAbscisse: 1.5,
      choix: ['E', 'F', 'G'], attendu: 'F', revoir: 'propriete',
    },
    {
      id: 't-3-2-7', type: 'calcul', consigne: 'Lis l\'abscisse du point H.', enonce: 'Quelle est l\'abscisse de H ?',
      figure: droite(-1, 1, 0.2, { H: -0.4 }, [-1, 0, 1]), abscisseDe: 'H', attendu: -0.4, revoir: 'propriete',
    },
    {
      id: 't-3-2-8', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Sur une droite graduée, les points d\'abscisses 3 et −3 sont à la même distance de l\'origine.',
      attendu: true, revoir: 'definition',
    },
    {
      id: 't-3-2-9', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Si 0 et 1 sont séparés par 4 intervalles, une graduation vaut 0,4.',
      attendu: false, revoir: 'propriete',
    },
    {
      id: 't-3-2-10', type: 'trous', consigne: 'Encadre l\'abscisse du point K par deux nombres entiers qui se suivent.',
      enonce: 'Entre quels entiers se trouve l\'abscisse de K ?',
      figure: droite(-5, 1, 0.5, { K: -3.5 }, [0, 1]),
      champs: [
        { id: 'a', etiquette: 'l\'entier juste à gauche de K', attendu: -4 },
        { id: 'b', etiquette: 'l\'entier juste à droite de K', attendu: -3 },
      ],
      revoir: 'remarque',
    },
  ],
};
