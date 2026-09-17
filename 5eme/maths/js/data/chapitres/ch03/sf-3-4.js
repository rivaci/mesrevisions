// Chapitre 3, savoir-faire 4 — Lire et placer un point dans un repère.
//
// ── D'où vient ce savoir-faire ────────────────────────────────────────────
//
// Du dernier point de la liste de la professeure pour ce chapitre : « repère
// orthogonal : lire les coordonnées d'un point, placer un point ». En 6e, le
// repère n'avait qu'un quart ; il en a maintenant quatre.
//
// ── L'erreur qui ne se voit pas dans les champs ─────────────────────────
//
// L'inversion abscisse/ordonnée donne les deux BONS nombres, dans le mauvais
// ordre. Avec deux champs, la correction ne peut pas la reconnaître à ses
// valeurs : elle devient donc le piège par défaut de ces items (toute erreur
// imprévue y mène), et les QCM la ciblent directement — le point
// « à l'envers » y est toujours placé.

const repere = (points, extra = {}) => ({ modele: 'repere', points, ...extra });
const coordonnees = (x, y) => [
  { id: 'x', etiquette: 'abscisse', attendu: x },
  { id: 'y', etiquette: 'ordonnée', attendu: y },
];
const ZONES = ['en haut à gauche', 'en haut à droite', 'en bas à gauche', 'en bas à droite'];

export default {
  id: 'sf-3-4',
  titre: 'Lire et placer un point dans un repère',
  attendus: [
    'Il lit les coordonnées d\'un point dans un repère orthogonal, quel que soit le signe.',
    'Il place un point de coordonnées données.',
    'Il écrit l\'abscisse avant l\'ordonnée.',
  ],

  decouvrir: {
    titre: 'Un trajet depuis l\'origine',
    texte:
      'Pour aller de l\'origine O au point A, on se déplace d\'abord horizontalement, puis '
      + 'verticalement. Vers la droite et vers le haut, on compte en positif ; vers la '
      + 'gauche et vers le bas, en négatif.',
    figure: repere({ A: [3, -2] }),
    question: 'De combien de carreaux se déplace-t-on horizontalement ? Et verticalement ?',
    champs: [
      { id: 'a', etiquette: 'horizontalement', attendu: 3 },
      { id: 'b', etiquette: 'verticalement', attendu: -2 },
    ],
    conclusion:
      'Le point A a pour **coordonnées (3 ; −2)** : 3 est son **abscisse**, lue sur l\'axe '
      + 'horizontal ; −2 est son **ordonnée**, lue sur l\'axe vertical.\n'
      + 'On écrit toujours l\'abscisse en premier : **A(3 ; −2)**.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Le repère orthogonal',
      texte:
        'Un **repère orthogonal** est formé de deux droites graduées perpendiculaires, qui se '
        + 'coupent en leur origine **O** :\n'
        + '• l\'**axe des abscisses**, horizontal ;\n'
        + '• l\'**axe des ordonnées**, vertical.',
    },
    {
      type: 'definition',
      titre: 'Les coordonnées d\'un point',
      texte:
        'Chaque point du plan est repéré par deux nombres relatifs, ses **coordonnées** : '
        + 'd\'abord son **abscisse**, lue sur l\'axe horizontal, puis son **ordonnée**, lue '
        + 'sur l\'axe vertical.\n'
        + 'Ici, **A(−3 ; 2)** : abscisse −3, ordonnée 2. L\'origine a pour coordonnées O(0 ; 0).',
      figure: repere({ A: [-3, 2] }),
    },
    {
      type: 'remarque',
      titre: 'Quatre zones, et les axes',
      texte:
        'À droite de l\'axe des ordonnées, l\'abscisse est positive ; à gauche, négative.\n'
        + 'Au-dessus de l\'axe des abscisses, l\'ordonnée est positive ; en dessous, négative.\n'
        + 'Un point **sur l\'axe des abscisses** a une ordonnée nulle, comme B(4 ; 0). Un point '
        + '**sur l\'axe des ordonnées** a une abscisse nulle, comme C(0 ; −1).',
      figure: repere({ B: [4, 0], C: [0, -1] }),
    },
    {
      type: 'exemple',
      texte: 'A(−3 ; 2) : 3 à gauche, 2 en haut   ·   B(4 ; 0) : sur l\'axe des abscisses   ·   C(0 ; −1) : sur l\'axe des ordonnées',
    },
  ],

  methode: {
    titre: 'Lire les coordonnées du point M',
    enonce: 'Quelles sont les coordonnées du point M ?',
    figure: repere({ M: [-4, -1] }),
    etapes: [
      {
        texte: 'Depuis M, je suis la ligne verticale du quadrillage jusqu\'à l\'axe des abscisses : j\'arrive sur −4.',
        note: 'M est à gauche de l\'axe vertical : l\'abscisse est négative.',
      },
      {
        texte: 'Depuis M, je suis la ligne horizontale jusqu\'à l\'axe des ordonnées : j\'arrive sur −1.',
        note: 'M est sous l\'axe horizontal : l\'ordonnée est négative.',
      },
      {
        texte: 'J\'écris l\'abscisse en premier : M(−4 ; −1).',
        note: '« D\'abord je marche, ensuite je monte (ou je descends). »',
      },
    ],
    controle:
      'Le contrôle : refais le trajet depuis O avec tes coordonnées — 4 carreaux vers la '
      + 'gauche, puis 1 vers le bas. Tu dois tomber sur M.',
  },

  entrainement: [
    // ── Palier 1 : des entiers, une zone à la fois ─────────────────────────
    {
      // NEUTRE : les deux coordonnées positives, aucun signe à trouver.
      id: 'e-3-4-1', type: 'trous', palier: 1, neutre: true,
      consigne: 'Lis les coordonnées du point A.', enonce: 'Quelles sont les coordonnées de A ?',
      figure: repere({ A: [2, 3] }), coordonneesDe: 'A', champs: coordonnees(2, 3),
    },
    {
      id: 'e-3-4-2', type: 'trous', palier: 1, piege: 'coordonnees-inversees',
      consigne: 'Lis les coordonnées du point B.', enonce: 'Quelles sont les coordonnées de B ?',
      figure: repere({ B: [-3, 1] }), coordonneesDe: 'B', champs: coordonnees(-3, 1),
      fausses: [{ valeur: 3, piege: 'signe-oublie' }],
    },
    {
      id: 'e-3-4-3', type: 'choix', palier: 1, piege: 'coordonnees-inversees',
      consigne: 'Quel point a pour coordonnées (4 ; −2) ?', enonce: 'Trouve le point de coordonnées (4 ; −2).',
      figure: repere({ A: [-2, 4], B: [4, 2], C: [4, -2], D: [-4, -2] }),
      lettreAux: [4, -2],
      choix: ['A', 'B', 'C', 'D'], attendu: 'C',
      fausses: [
        { valeur: 'A', piege: 'coordonnees-inversees' },
        { valeur: 'B', piege: 'signe-oublie' },
        { valeur: 'D', piege: 'signe-oublie' },
      ],
    },
    {
      id: 'e-3-4-4', type: 'trous', palier: 1, piege: 'coordonnees-inversees',
      consigne: 'Lis les coordonnées du point C.', enonce: 'Quelles sont les coordonnées de C ?',
      figure: repere({ C: [4, -1] }), coordonneesDe: 'C', champs: coordonnees(4, -1),
      fausses: [{ valeur: 1, piege: 'signe-oublie' }],
    },
    // ── Palier 2 : deux signes négatifs, les axes ──────────────────────────
    {
      id: 'e-3-4-5', type: 'choix', palier: 2, piege: 'coordonnees-inversees',
      consigne: 'Quelles sont les coordonnées du point D ?', enonce: 'Lis les coordonnées de D.',
      figure: repere({ D: [-1, -3] }), coordonneesDe: 'D',
      choix: ['(−3 ; −1)', '(1 ; 3)', '(−1 ; −3)', '(−1 ; 3)'], attendu: '(−1 ; −3)',
      fausses: [
        { valeur: '(−3 ; −1)', piege: 'coordonnees-inversees' },
        { valeur: '(1 ; 3)', piege: 'signe-oublie' },
        { valeur: '(−1 ; 3)', piege: 'signe-oublie' },
      ],
    },
    {
      id: 'e-3-4-6', type: 'trous', palier: 2, piege: 'coordonnees-inversees',
      consigne: 'Lis les coordonnées du point E.', enonce: 'Quelles sont les coordonnées de E ?',
      figure: repere({ E: [0, -3] }), coordonneesDe: 'E', champs: coordonnees(0, -3),
      fausses: [{ valeur: 3, piege: 'signe-oublie' }],
    },
    {
      id: 'e-3-4-7', type: 'choix', palier: 2, piege: 'coordonnees-inversees',
      consigne: 'Quel point a pour coordonnées (−3 ; 0) ?', enonce: 'Trouve le point de coordonnées (−3 ; 0).',
      figure: repere({ F: [0, -3], G: [-3, 0], H: [3, 0] }),
      lettreAux: [-3, 0],
      choix: ['F', 'G', 'H'], attendu: 'G',
      fausses: [
        { valeur: 'F', piege: 'coordonnees-inversees' },
        { valeur: 'H', piege: 'signe-oublie' },
      ],
    },
    {
      // NEUTRE pour le signe : un point au milieu d'un carreau, en haut à droite.
      id: 'e-3-4-8', type: 'trous', palier: 2, neutre: true,
      consigne: 'Lis les coordonnées du point K. Il est au milieu d\'un carreau.',
      enonce: 'Quelles sont les coordonnées de K ?',
      figure: repere({ K: [2.5, 1.5] }), coordonneesDe: 'K', champs: coordonnees(2.5, 1.5),
    },
    // ── Palier 3 : demi-carreaux négatifs, zones, réfutation ───────────────
    {
      id: 'e-3-4-9', type: 'trous', palier: 3, piege: 'coordonnees-inversees',
      consigne: 'Lis les coordonnées du point L.', enonce: 'Quelles sont les coordonnées de L ?',
      figure: repere({ L: [-2.5, 3] }), coordonneesDe: 'L', champs: coordonnees(-2.5, 3),
      fausses: [{ valeur: 2.5, piege: 'signe-oublie' }],
    },
    {
      id: 'e-3-4-10', type: 'choix', palier: 3, piege: 'coordonnees-inversees',
      consigne: 'Sans le tracer, dis où se trouve ce point dans le repère.',
      enonce: 'Le point P a pour coordonnées (−7 ; 12).',
      choix: ZONES, attendu: 'en haut à gauche',
      fausses: [
        // (12 ; −7) : les coordonnées lues à l'envers.
        { valeur: 'en bas à droite', piege: 'coordonnees-inversees' },
        { valeur: 'en haut à droite', piege: 'signe-oublie' },
      ],
    },
    {
      id: 'e-3-4-11', type: 'vraifaux', palier: 3, piege: 'coordonnees-inversees',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Si on échange l\'abscisse et l\'ordonnée d\'un point, on retrouve toujours le même point.',
      attendu: false,
      contreExemple: {
        invite: 'Donne les coordonnées d\'un point qui change quand on les échange.',
        champs: [{ id: 'a', etiquette: 'abscisse' }, { id: 'b', etiquette: 'ordonnée' }],
        valide: (a, b) => a !== b,
        exemple: '(2 ; 5) et (5 ; 2) : le premier est plus à gauche et plus haut que le second.',
      },
    },
    {
      id: 'e-3-4-12', type: 'vraifaux', palier: 3, piege: 'signe-oublie',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Un point dont l\'ordonnée est strictement négative est situé sous l\'axe des abscisses.',
      attendu: true,
    },
  ],

  problemes: [
    {
      id: 'p-3-4-1',
      enonce: 'Sur cette carte quadrillée, le trésor est au point T et le bateau au point B.',
      figure: repere({ T: [-4, 3], B: [2, -1] }),
      questions: [
        { texte: 'Quelle est l\'abscisse du trésor ?', attendu: -4 },
        { texte: 'Quelle est son ordonnée ?', attendu: 3 },
        { texte: 'De combien de carreaux le bateau doit-il se déplacer horizontalement pour être à la verticale du trésor ?', attendu: 6 },
      ],
    },
    {
      id: 'p-3-4-2',
      enonce: 'Dans ce repère, A, B et C sont trois sommets du rectangle ABCD.',
      figure: repere({ A: [-3, 2], B: [2, 2], C: [2, -1] }, { segments: [['A', 'B'], ['B', 'C']] }),
      questions: [
        { texte: 'Quelle est l\'abscisse du quatrième sommet D ?', attendu: -3 },
        { texte: 'Quelle est son ordonnée ?', attendu: -1 },
        { texte: 'Combien de carreaux mesure le côté [AB] ?', attendu: 5 },
      ],
    },
    {
      id: 'p-3-4-3',
      enonce:
        'Un robot part de l\'origine O d\'un repère. Il se déplace de 4 carreaux vers la gauche, '
        + 'puis de 3 carreaux vers le haut, puis de 5 carreaux vers la droite.',
      questions: [
        { texte: 'Quelle est l\'abscisse de son point d\'arrivée ?', attendu: 1 },
        { texte: 'Quelle est l\'ordonnée de son point d\'arrivée ?', attendu: 3 },
      ],
    },
    {
      id: 'p-3-4-4',
      enonce: 'On considère les points E(−1 ; −2), F(3 ; −4), G(−5 ; 2), H(4 ; 1) et K(−2 ; −3).',
      questions: [
        { texte: 'Combien de ces points sont situés en bas à gauche du repère ?', attendu: 2 },
        { texte: 'Combien ont une abscisse strictement positive ?', attendu: 2 },
        { texte: 'Combien ont une ordonnée strictement négative ?', attendu: 3 },
      ],
    },
    {
      id: 'p-3-4-5',
      enonce:
        'On place les points A(−2 ; −2), B(2 ; −2), C(2 ; 2) et D(−2 ; 2), puis on les relie '
        + 'dans l\'ordre pour fermer la figure ABCD.',
      questions: [
        { texte: 'Combien de carreaux mesure le côté [AB] ?', attendu: 4 },
        { texte: 'Quel est le périmètre de la figure, si le côté d\'un carreau vaut 1 ?', attendu: 16 },
        { texte: 'Combien de carreaux la figure recouvre-t-elle ?', attendu: 16 },
      ],
    },
  ],

  test: [
    {
      id: 't-3-4-1', type: 'trous', consigne: 'Lis les coordonnées du point A.', enonce: 'Quelles sont les coordonnées de A ?',
      figure: repere({ A: [3, 1] }), coordonneesDe: 'A', champs: coordonnees(3, 1), revoir: 'definition',
    },
    {
      id: 't-3-4-2', type: 'trous', consigne: 'Lis les coordonnées du point B.', enonce: 'Quelles sont les coordonnées de B ?',
      figure: repere({ B: [-2, 4] }), coordonneesDe: 'B', champs: coordonnees(-2, 4), revoir: 'definition',
    },
    {
      id: 't-3-4-3', type: 'trous', consigne: 'Lis les coordonnées du point C.', enonce: 'Quelles sont les coordonnées de C ?',
      figure: repere({ C: [-4, -3] }), coordonneesDe: 'C', champs: coordonnees(-4, -3), revoir: 'remarque',
    },
    {
      id: 't-3-4-4', type: 'trous', consigne: 'Lis les coordonnées du point D.', enonce: 'Quelles sont les coordonnées de D ?',
      figure: repere({ D: [1, -2] }), coordonneesDe: 'D', champs: coordonnees(1, -2), revoir: 'remarque',
    },
    {
      id: 't-3-4-5', type: 'trous', consigne: 'Lis les coordonnées du point E.', enonce: 'Quelles sont les coordonnées de E ?',
      figure: repere({ E: [0, 2] }), coordonneesDe: 'E', champs: coordonnees(0, 2), revoir: 'remarque',
    },
    {
      id: 't-3-4-6', type: 'choix', consigne: 'Quel point a pour coordonnées (−1 ; 3) ?', enonce: 'Trouve le point de coordonnées (−1 ; 3).',
      figure: repere({ K: [3, -1], L: [-1, 3], M: [1, 3] }), lettreAux: [-1, 3],
      choix: ['K', 'L', 'M'], attendu: 'L', revoir: 'definition',
    },
    {
      id: 't-3-4-7', type: 'choix', consigne: 'Quel point a pour coordonnées (2 ; −3) ?', enonce: 'Trouve le point de coordonnées (2 ; −3).',
      figure: repere({ N: [-3, 2], P: [2, -3], R: [2, 3] }), lettreAux: [2, -3],
      choix: ['N', 'P', 'R'], attendu: 'P', revoir: 'definition',
    },
    {
      id: 't-3-4-8', type: 'choix', consigne: 'Quelles sont les coordonnées du point S ?', enonce: 'Lis les coordonnées de S.',
      figure: repere({ S: [-4, 1] }), coordonneesDe: 'S',
      choix: ['(1 ; −4)', '(−4 ; 1)', '(4 ; 1)'], attendu: '(−4 ; 1)', revoir: 'definition',
    },
    {
      id: 't-3-4-9', type: 'choix', consigne: 'Sans le tracer, dis où se trouve ce point dans le repère.',
      enonce: 'Le point Q a pour coordonnées (5 ; −8).',
      choix: ZONES, attendu: 'en bas à droite', revoir: 'remarque',
    },
    {
      id: 't-3-4-10', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Le point de coordonnées (0 ; −4) est sur l\'axe des abscisses.',
      attendu: false, revoir: 'remarque',
    },
  ],
};
