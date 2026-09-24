// Chapitre 1, savoir-faire 5 — Reconnaître des triangles semblables.
//
// ── Pourquoi ce savoir-faire ouvre le chapitre ───────────────────────────
//
// C'est la partie I du cours d'Evan. Le chapitre avait d'abord écarté les
// triangles semblables, en pensant qu'ils feraient leur propre chapitre ; sa
// professeure les place au contraire en tête du chapitre Thalès, et y définit
// le coefficient k qui revient ensuite dans le théorème. Il passe donc en
// premier dans la liste.
//
// Son identifiant reste « sf-1-5 » : la progression de l'élève est rangée par
// identifiant, et renuméroter les quatre autres aurait mélangé ce qu'il a
// déjà fait.
//
// ── Ce que reprend le cours, mot pour mot ────────────────────────────────
//
// La définition par les angles ; le vocabulaire « homologues » — sommets,
// angles, et côtés OPPOSÉS à des angles égaux ; la remarque « deux paires
// d'angles suffisent » ; la proportionnalité des côtés homologues, écrite en
// tableau puis en rapports ; k < 1 réduction, k > 1 agrandissement, k' = 1/k.
// La figure du cours — ABC à 60°, 40°, 80° et DEF, retourné, qui associe A à
// E — est celle du premier bloc.
//
// ── L'erreur à attendre ──────────────────────────────────────────────────
//
// Associer les sommets dans l'ordre des lettres, ou d'après leur place sur le
// dessin. Le cours choisit exprès un exemple où A va avec E ; les figures des
// exercices sont tournées ou retournées, et leurs angles ne sont pas colorés
// quand c'est justement l'élève qui doit retrouver les homologues.

const semblablesParAngles = (t1, angles, t2, k, rotation, miroir, etiquettes) => ({
  modele: 'semblables',
  t1: { sommets: t1, angles },
  t2: { sommets: t2, k, rotation, miroir },
  couleurs: false,
  etiquettes,
});
const OUI_NON = ['oui', 'non'];

export default {
  id: 'sf-1-5',
  titre: 'Reconnaître des triangles semblables',
  attendus: [
    'Il sait que deux triangles sont semblables quand leurs angles sont deux à deux de même mesure, et qu\'il suffit d\'en vérifier deux paires.',
    'Il identifie les sommets, les angles et les côtés homologues.',
    'Il utilise la proportionnalité des côtés homologues, le coefficient k, et k\' = 1/k.',
  ],

  decouvrir: {
    titre: 'Deux triangles de même forme',
    texte:
      'Les deux triangles ci-dessous ont leurs angles deux à deux de même mesure : les angles '
      + 'de même couleur sont égaux. On a mesuré leurs côtés.',
    figure: {
      modele: 'semblables',
      t1: { sommets: ['A', 'B', 'C'], longueurs: { AB: 4, BC: 6, CA: 5 } },
      t2: { sommets: ['E', 'F', 'D'], k: 1.5, rotation: 200, miroir: true },
      etiquettes: { AB: '4 cm', BC: '6 cm', CA: '5 cm', EF: '6 cm', FD: '9 cm', DE: '7,5 cm' },
    },
    question:
      'Chaque côté du grand triangle fait face à un angle qui a la même couleur qu\'un angle du '
      + 'petit. Divise chaque côté du grand par le côté du petit qui fait face à l\'angle de même '
      + 'couleur.',
    champs: [
      { id: 'a', etiquette: 'EF ÷ AB =', attendu: 1.5 },
      { id: 'b', etiquette: 'FD ÷ BC =', attendu: 1.5 },
      { id: 'c', etiquette: 'DE ÷ CA =', attendu: 1.5 },
    ],
    conclusion:
      'Trois fois **1,5** : les longueurs des côtés qui se font face sont **proportionnelles**. '
      + 'Le grand triangle est un agrandissement du petit, de coefficient 1,5.\n'
      + 'Deux triangles dont les angles sont deux à deux égaux sont dits **semblables**, et c\'est '
      + 'toujours ainsi : mêmes angles, côtés proportionnels.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Triangles semblables',
      texte:
        'Deux triangles sont **semblables** si leurs angles sont **deux à deux de même '
        + 'mesure**.\n'
        + 'Sur la figure, les angles de même couleur sont égaux : 60°, 40° et 80° dans chacun '
        + 'des deux triangles.',
      figure: {
        modele: 'semblables',
        t1: { sommets: ['A', 'B', 'C'], angles: { B: 40, C: 80 } },
        t2: { sommets: ['E', 'F', 'D'], k: 1.3, rotation: 150, miroir: true },
        etiquettes: { A: '60°', B: '40°', C: '80°', E: '60°', F: '40°', D: '80°' },
      },
    },
    {
      type: 'definition',
      titre: 'Sommets, angles et côtés homologues',
      texte:
        'Lorsque deux triangles sont semblables :\n'
        + '• les angles égaux sont dits **homologues**, ainsi que leurs sommets — ici A et E, '
        + 'B et F, C et D ;\n'
        + '• les côtés **opposés à des angles égaux** sont dits homologues — ici [AB] et [EF], '
        + '[BC] et [DF], [CA] et [ED].',
    },
    {
      type: 'remarque',
      titre: 'Deux paires d\'angles suffisent',
      texte:
        'Pour démontrer que deux triangles sont semblables, il suffit de montrer qu\'ils ont '
        + '**deux paires d\'angles de même mesure** : la troisième suit, puisque la somme des '
        + 'angles d\'un triangle vaut 180°.',
    },
    {
      type: 'propriete',
      titre: 'Les côtés homologues sont proportionnels',
      texte:
        'Si deux triangles sont semblables, alors les longueurs de leurs côtés homologues sont '
        + '**proportionnelles**.\n'
        + 'Longueurs du triangle ABC : AB, BC, CA — multipliées par k — longueurs du triangle '
        + 'DEF : EF, DF, DE.\n'
        + 'Ce que l\'on écrit aussi : EF/AB = DF/BC = DE/CA = k, où k est le **coefficient de '
        + 'proportionnalité**.',
    },
    {
      type: 'propriete',
      titre: 'Réduction ou agrandissement',
      texte:
        'Si **k < 1**, il s\'agit d\'un coefficient de **réduction** ; si **k > 1**, d\'un '
        + 'coefficient d\'**agrandissement**.\n'
        + 'Si k est un coefficient de réduction, le coefficient d\'agrandissement associé est '
        + '**k\' = 1/k**, et k × k\' = 1. Avec k = 0,5 : k\' = 2.',
    },
    {
      type: 'exemple',
      texte:
        'ABC et DEF semblables, [AB] et [EF] homologues : AB = 4 cm et EF = 6 cm, donc '
        + 'k = 6 ÷ 4 = 1,5. Si BC = 6 cm, son homologue [DF] mesure 6 × 1,5 = 9 cm.',
    },
  ],

  methode: {
    titre: 'Trouver les côtés homologues, puis une longueur',
    enonce:
      'Les triangles RST et UVW sont semblables : les angles de même couleur sont égaux. '
      + 'RS = 6 cm, ST = 8 cm, TR = 7 cm et UV = 9 cm. Calculer UW et VW.',
    figure: {
      modele: 'semblables',
      t1: { sommets: ['R', 'S', 'T'], longueurs: { RS: 6, ST: 8, TR: 7 } },
      t2: { sommets: ['V', 'U', 'W'], k: 1.5, rotation: 160, miroir: false },
      etiquettes: { RS: '6 cm', ST: '8 cm', TR: '7 cm', UV: '9 cm', UW: '?', VW: '?' },
    },
    etapes: [
      {
        texte: 'Je repère les sommets homologues grâce aux angles égaux : R et V, S et U, T et W.',
        note: 'Les lettres ne sont pas dans le même ordre : seuls les angles comptent.',
      },
      {
        texte: 'J\'en déduis les côtés homologues : [RS] et [VU], [ST] et [UW], [TR] et [WV].',
        note: 'Un côté relie deux sommets ; son homologue relie leurs deux homologues.',
      },
      {
        texte: 'Je calcule le coefficient avec la paire connue : k = UV ÷ RS = 9 ÷ 6 = 1,5.',
        note: 'Longueur d\'arrivée ÷ longueur de départ : de RST vers UVW.',
      },
      {
        texte: 'UW = ST × 1,5 = 8 × 1,5 = 12 cm, et VW = TR × 1,5 = 7 × 1,5 = 10,5 cm.',
        note: '',
      },
    ],
    controle:
      'Le contrôle : k = 1,5 est plus grand que 1, donc UVW est un agrandissement de RST — '
      + 'ses côtés doivent être plus longs que leurs homologues. 12 > 8 et 10,5 > 7 : c\'est '
      + 'cohérent. Et k\' = 1 ÷ 1,5 ramènerait de UVW à RST.',
  },

  entrainement: [
    // ── Palier 1 : semblables ou non, par les angles ───────────────────────
    {
      // NEUTRE : les trois angles sont donnés, rien à calculer ni à apparier.
      id: 'e-1-5-1', type: 'choix', palier: 1, neutre: true,
      consigne: 'Ces deux triangles sont-ils semblables ?',
      enonce: 'Le premier a pour angles 50°, 60° et 70° ; le second, 70°, 50° et 60°.',
      semblablesAngles: [[50, 60], [70, 50]],
      choix: OUI_NON, attendu: 'oui',
    },
    {
      // NEUTRE : le calcul des troisièmes angles, qui prépare l'item suivant.
      id: 'e-1-5-2', type: 'trous', palier: 1, neutre: true,
      consigne: 'Calcule le troisième angle de chaque triangle, en degrés.',
      enonce: 'Triangle ABC : angle en A = 45°, angle en B = 65°. Triangle DEF : angle en D = 45°, angle en E = 70°.',
      champs: [
        { id: 'a', etiquette: 'angle en C', attendu: 70 },
        { id: 'b', etiquette: 'angle en F', attendu: 65 },
      ],
    },
    {
      id: 'e-1-5-3', type: 'choix', palier: 1, piege: 'semblables-mal-justifies',
      consigne: 'Ces deux triangles sont-ils semblables ?',
      enonce: 'Triangle ABC : angle en A = 45°, angle en B = 65°. Triangle DEF : angle en D = 45°, angle en E = 70°.',
      semblablesAngles: [[45, 65], [45, 70]],
      choix: OUI_NON, attendu: 'oui',
      // « Non » : l'angle en B comparé à l'angle en E, sans calculer les
      // troisièmes angles — qui valent 70° et 65°.
      fausses: [{ valeur: 'non', piege: 'semblables-mal-justifies' }],
    },
    {
      id: 'e-1-5-4', type: 'choix', palier: 1, piege: 'homologues-par-position',
      consigne: 'Ces deux triangles sont semblables. Quel est le sommet homologue de A ?',
      enonce: 'Lis les angles sur la figure.',
      figure: semblablesParAngles(['A', 'B', 'C'], { B: 55, C: 75 }, ['F', 'D', 'E'], 1.4, 120, false,
        { A: '50°', B: '55°', C: '75°', D: '55°', E: '75°', F: '50°' }),
      homologueDe: 'A',
      choix: ['D', 'E', 'F'], attendu: 'F',
      fausses: [
        { valeur: 'D', piege: 'homologues-par-position' },
        { valeur: 'E', piege: 'homologues-par-position' },
      ],
    },

    // ── Palier 2 : côtés homologues et coefficient ─────────────────────────
    {
      id: 'e-1-5-5', type: 'choix', palier: 2, piege: 'homologues-par-position',
      consigne: 'Ces deux triangles sont semblables. Quel est le côté homologue de [BC] ?',
      enonce: 'Lis les angles sur la figure.',
      figure: semblablesParAngles(['A', 'B', 'C'], { B: 70, C: 45 }, ['E', 'D', 'F'], 0.8, 200, true,
        { A: '65°', B: '70°', C: '45°', D: '70°', E: '65°', F: '45°' }),
      homologueDe: 'BC',
      choix: ['[DE]', '[EF]', '[DF]'], attendu: '[DF]',
      fausses: [
        // [EF] : les deux dernières lettres, comme [BC] dans ABC.
        { valeur: '[EF]', piege: 'homologues-par-position' },
        { valeur: '[DE]', piege: 'homologues-par-position' },
      ],
    },
    {
      id: 'e-1-5-6', type: 'calcul', palier: 2, piege: 'coefficient-inverse',
      consigne:
        'Les triangles ABC et DEF sont semblables, et [AB] et [DE] sont homologues. '
        + 'Calcule le coefficient k qui permet de passer de ABC à DEF.',
      enonce: '\\text{AB = 4 cm, DE = 10 cm}',
      attendu: 2.5,
      fausses: [{ valeur: 0.4, piege: 'coefficient-inverse' }],
    },
    {
      id: 'e-1-5-7', type: 'calcul', palier: 2, piege: 'coefficient-inverse',
      consigne: 'Les triangles ABC et MNP sont semblables : les angles de même couleur sont égaux. Calcule NP, en cm.',
      enonce: 'Lis les longueurs sur la figure.',
      figure: {
        modele: 'semblables',
        t1: { sommets: ['A', 'B', 'C'], longueurs: { AB: 4, BC: 8, CA: 6 } },
        t2: { sommets: ['M', 'N', 'P'], k: 1.25, rotation: 170, miroir: false },
        etiquettes: { AB: '4 cm', BC: '8 cm', MN: '5 cm', NP: '?' },
      },
      longueurDe: 'NP', attendu: 10,
      // 6,4 = 8 ÷ 1,25 : le coefficient appliqué dans le mauvais sens.
      fausses: [{ valeur: 6.4, piege: 'coefficient-inverse' }],
    },
    {
      id: 'e-1-5-8', type: 'calcul', palier: 2, piege: 'inverse-et-complement',
      consigne: 'Un coefficient de réduction vaut k = 0,4. Quel est le coefficient d\'agrandissement associé ?',
      enonce: 'k = 0,4',
      attendu: 2.5,
      // 0,6 = 1 − 0,4 : le « complément » au lieu de l'inverse.
      fausses: [{ valeur: 0.6, piege: 'inverse-et-complement' }],
    },

    // ── Palier 3 : justifier, réfuter ──────────────────────────────────────
    {
      id: 'e-1-5-9', type: 'choix', palier: 3, piege: 'semblables-mal-justifies',
      consigne: 'Ces deux triangles sont-ils semblables ?',
      enonce: 'Deux triangles rectangles ont chacun un angle de 35°.',
      semblablesAngles: [[90, 35], [90, 35]],
      choix: OUI_NON, attendu: 'oui',
      // « Non » : l'angle droit, pourtant donné par le mot « rectangle », oublié.
      fausses: [{ valeur: 'non', piege: 'semblables-mal-justifies' }],
    },
    {
      id: 'e-1-5-10', type: 'vraifaux', palier: 3, piege: 'un-angle-ne-suffit-pas',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Deux triangles qui ont un angle de même mesure sont semblables.',
      attendu: false,
      contreExemple: {
        invite:
          'Un premier triangle a pour angles 50°, 60° et 70°. Un second a lui aussi un angle de '
          + '50°. Donne ses deux autres angles, de façon qu\'il ne soit pas semblable au premier.',
        champs: [
          { id: 'a', etiquette: 'deuxième angle, en degrés' },
          { id: 'b', etiquette: 'troisième angle, en degrés' },
        ],
        // La propriété, pas un couple imposé : deux angles positifs qui
        // complètent 50° jusqu'à 180°, sans redonner 60° et 70°.
        valide: (a, b) => a > 0 && b > 0 && Math.abs(a + b - 130) < 1e-9
          && !(Math.abs(Math.min(a, b) - 60) < 1e-9 && Math.abs(Math.max(a, b) - 70) < 1e-9),
        temoin: [30, 100],
        exemple:
          '30° et 100° : le triangle 50°, 30°, 100° a bien un angle de 50°, mais ses deux autres '
          + 'angles ne sont pas ceux du premier. Une seule paire d\'angles égaux ne suffit pas.',
      },
    },
    {
      id: 'e-1-5-11', type: 'vraifaux', palier: 3, piege: 'semblables-mal-justifies',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Deux triangles qui n\'ont pas les mêmes longueurs ne peuvent pas être semblables.',
      attendu: false,
      contreExemple: {
        invite:
          'Tous les triangles équilatéraux ont des angles de 60° : ils sont semblables. Donne la '
          + 'longueur du côté d\'un premier triangle équilatéral, puis celle d\'un second qui n\'a '
          + 'pas les mêmes longueurs.',
        champs: [
          { id: 'a', etiquette: 'côté du premier, en cm' },
          { id: 'b', etiquette: 'côté du second, en cm' },
        ],
        valide: (a, b) => a > 0 && b > 0 && Math.abs(a - b) > 1e-9,
        temoin: [2, 5],
        exemple:
          '2 cm et 5 cm : les deux triangles équilatéraux sont semblables, mais le second est un '
          + 'agrandissement du premier, de coefficient 2,5.',
      },
    },
    {
      // NEUTRE : lire k, sans rien calculer ni retourner.
      id: 'e-1-5-12', type: 'choix', palier: 3, neutre: true,
      consigne: 'Deux triangles sont semblables, avec un coefficient k = 0,75. Il s\'agit…',
      enonce: 'k = 0,75',
      choix: ['d\'un coefficient de réduction', 'd\'un coefficient d\'agrandissement'],
      attendu: 'd\'un coefficient de réduction',
    },
  ],

  problemes: [
    {
      id: 'p-1-5-1',
      enonce:
        'Au même moment, un bâton vertical de 1,2 m a une ombre de 1,6 m, et un arbre vertical '
        + 'a une ombre de 12 m. Les rayons du soleil étant parallèles, le triangle formé par le '
        + 'bâton et son ombre et celui formé par l\'arbre et son ombre ont les mêmes angles : ils '
        + 'sont semblables.',
      questions: [
        { texte: 'Par combien faut-il multiplier l\'ombre du bâton pour obtenir celle de l\'arbre ?', attendu: 7.5 },
        { texte: 'Quelle est la hauteur de l\'arbre ?', attendu: 9, unite: 'm' },
      ],
    },
    {
      id: 'p-1-5-2',
      enonce:
        'Un triangle a des côtés de 3 cm, 4 cm et 5 cm. On construit un triangle semblable dont '
        + 'le plus grand côté mesure 12,5 cm.',
      questions: [
        { texte: 'Quel est le coefficient d\'agrandissement ?', attendu: 2.5 },
        { texte: 'Combien mesure le plus petit côté du grand triangle ?', attendu: 7.5, unite: 'cm' },
        { texte: 'Quel est le périmètre du grand triangle ?', attendu: 30, unite: 'cm' },
      ],
    },
    {
      id: 'p-1-5-3',
      enonce:
        'Dans le triangle ABC, l\'angle en A mesure 38° et l\'angle en B mesure 64°. Dans le '
        + 'triangle DEF, l\'angle en D mesure 64° et l\'angle en E mesure 78°.',
      questions: [
        { texte: 'Combien mesure l\'angle en C ?', attendu: 78, unite: '°' },
        { texte: 'Combien mesure l\'angle en F ?', attendu: 38, unite: '°' },
        { texte: 'Combien de paires d\'angles égaux les deux triangles ont-ils ?', attendu: 3 },
      ],
    },
    {
      id: 'p-1-5-4',
      enonce:
        'Deux triangles sont semblables. Pour passer du grand au petit, on multiplie les '
        + 'longueurs par le coefficient de réduction k = 0,8. Le petit triangle a un périmètre de '
        + '24 cm.',
      questions: [
        { texte: 'Quel est le coefficient d\'agrandissement k\' qui fait passer du petit au grand ?', attendu: 1.25 },
        { texte: 'Quel est le périmètre du grand triangle ?', attendu: 30, unite: 'cm' },
      ],
    },
    {
      id: 'p-1-5-5',
      enonce:
        'Sur un plan, un terrain triangulaire a des côtés de 6 cm, 8 cm et 9 cm. Le vrai terrain '
        + 'a la même forme, et son plus petit côté mesure 30 m.',
      questions: [
        { texte: 'Par combien faut-il multiplier une longueur du plan, en cm, pour obtenir la vraie longueur, en m ?', attendu: 5 },
        { texte: 'Combien mesure le plus grand côté du vrai terrain ?', attendu: 45, unite: 'm' },
      ],
    },
  ],

  // ── Par cœur ──────────────────────────────────────────────────────────────
  //
  // Les énoncés de la partie I de son cours, dans ses mots à lui : ce sont eux
  // qu'il devra restituer en contrôle. Chaque grille dit ce qu'un énoncé juste
  // doit contenir ; Merlin la remplit, l'appli en tire le verdict.
  aSavoir: [
    {
      id: 'as-semblables',
      titre: 'Définition : triangles semblables',
      consigne: 'Écris la définition : quand dit-on que deux triangles sont semblables ?',
      enonce: 'On dit que deux triangles sont **semblables** si leurs angles sont **deux à deux de même mesure**.',
      indice: 'On dit que deux triangles sont semblables si leurs … sont … à … de même …',
      elements: [
        { id: 'angles', texte: 'ce sont les angles qui sont comparés, pas les côtés' },
        { id: 'deux-a-deux', texte: 'deux à deux' },
        { id: 'meme-mesure', texte: 'de même mesure (égaux)' },
      ],
    },
    {
      id: 'as-homologues',
      titre: 'Vocabulaire : les homologues',
      consigne: 'Deux triangles sont semblables. Qu\'appelle-t-on des angles, des sommets et des côtés homologues ?',
      enonce:
        'Lorsque deux triangles sont semblables, les angles égaux sont dits **homologues**, ainsi que leurs '
        + 'sommets ; les côtés **opposés à des angles égaux** sont dits homologues.',
      indice: 'Les angles … sont homologues, ainsi que leurs … ; les côtés … à des angles égaux aussi.',
      elements: [
        { id: 'angles', texte: 'les angles égaux sont homologues' },
        { id: 'sommets', texte: 'leurs sommets sont homologues' },
        { id: 'cotes', texte: 'les côtés opposés à des angles égaux sont homologues' },
      ],
    },
    {
      id: 'as-deux-paires',
      titre: 'Démontrer que deux triangles sont semblables',
      consigne: 'Que suffit-il de montrer pour démontrer que deux triangles sont semblables ?',
      enonce:
        'Pour démontrer que deux triangles sont semblables, il **suffit** de montrer qu\'ils ont **deux paires '
        + 'd\'angles de même mesure**.',
      indice: 'Il suffit de montrer qu\'ils ont … paires d\'… de même mesure.',
      elements: [
        { id: 'deux-paires', texte: 'deux paires d\'angles — pas une seule, et pas besoin des trois' },
        { id: 'meme-mesure', texte: 'de même mesure' },
      ],
    },
    {
      id: 'as-proportionnels',
      titre: 'Propriété : les côtés homologues',
      consigne: 'Écris la propriété des longueurs des côtés de deux triangles semblables, sous la forme « Si…, alors… ».',
      enonce: 'Si deux triangles sont semblables, alors les longueurs de leurs côtés **homologues** sont **proportionnelles**.',
      indice: 'Si deux triangles sont …, alors les longueurs de leurs côtés … sont …',
      elements: [
        { id: 'hypothese', texte: 'l\'hypothèse, dans le « si » : les deux triangles sont semblables' },
        { id: 'homologues', texte: 'il s\'agit des côtés homologues' },
        { id: 'proportionnelles', texte: 'la conclusion : leurs longueurs sont proportionnelles' },
      ],
    },
    {
      id: 'as-coefficient',
      titre: 'Réduction, agrandissement, et k\' = 1/k',
      consigne:
        'Deux triangles semblables ont un coefficient de proportionnalité k. Que signifie k < 1 ? Et k > 1 ? '
        + 'Et quel lien y a-t-il entre un coefficient de réduction k et le coefficient d\'agrandissement k\' associé ?',
      enonce:
        'Si **k < 1**, il s\'agit d\'un coefficient de **réduction** ; si **k > 1**, d\'un coefficient '
        + 'd\'**agrandissement**. Si k est un coefficient de réduction et k\' le coefficient d\'agrandissement '
        + 'associé, alors **k\' = 1/k**.',
      indice: 'k < 1 : … ; k > 1 : … ; et k\' = …',
      elements: [
        { id: 'reduction', texte: 'k < 1 : un coefficient de réduction' },
        { id: 'agrandissement', texte: 'k > 1 : un coefficient d\'agrandissement' },
        { id: 'inverse', texte: 'k\' = 1/k (ou k × k\' = 1)' },
      ],
    },
  ],

  // ── Rédiger ───────────────────────────────────────────────────────────────
  redactions: [
    {
      id: 'r-1-5-1',
      titre: 'Démontrer que deux triangles sont semblables',
      enonce:
        'Dans le triangle ABC, l\'angle en A mesure 52° et l\'angle en B mesure 71°. Dans le triangle DEF, '
        + 'l\'angle en D mesure 57° et l\'angle en E mesure 52°.',
      consigne: 'Démontre que les triangles ABC et DEF sont semblables. Rédige chaque étape.',
      semblablesAngles: [[52, 71], [57, 52]], semblables: true,
      criteres: [
        {
          id: 'troisieme-angle',
          texte: 'un troisième angle calculé avec la somme des angles d\'un triangle : 180° − 52° − 71° = 57° '
            + 'pour l\'angle en C (ou 180° − 57° − 52° = 71° pour l\'angle en F)',
        },
        { id: 'deux-paires', texte: 'deux paires d\'angles égaux, nommées : par exemple les angles en A et en E (52°), en C et en D (57°)' },
        { id: 'justification', texte: 'la justification : deux paires d\'angles de même mesure suffisent' },
        { id: 'conclusion', texte: 'la conclusion : les triangles ABC et DEF sont semblables' },
      ],
      modele: [
        'Dans le triangle ABC, la somme des angles vaut 180°, donc l\'angle en C mesure 180° − 52° − 71° = 57°.',
        'Les triangles ABC et DEF ont donc deux paires d\'angles de même mesure : les angles en A et en E (52°), et les angles en C et en D (57°).',
        'Or deux triangles qui ont deux paires d\'angles de même mesure sont semblables.',
        'Donc les triangles ABC et DEF sont semblables.',
      ],
    },
  ],
  test: [
    {
      id: 't-1-5-1', type: 'choix', consigne: 'Ces deux triangles sont-ils semblables ?',
      enonce: 'Triangle ABC : angle en A = 40°, angle en B = 80°. Triangle DEF : angle en D = 60°, angle en E = 80°.',
      semblablesAngles: [[40, 80], [60, 80]],
      choix: OUI_NON, attendu: 'oui', piege: 'semblables-mal-justifies', revoir: 'remarque',
    },
    {
      id: 't-1-5-2', type: 'choix', consigne: 'Ces deux triangles sont-ils semblables ?',
      enonce: 'Triangle ABC : angle en A = 50°, angle en B = 30°. Triangle DEF : angle en D = 50°, angle en E = 90°.',
      semblablesAngles: [[50, 30], [50, 90]],
      choix: OUI_NON, attendu: 'non', piege: 'un-angle-ne-suffit-pas', revoir: 'definition',
    },
    {
      id: 't-1-5-3', type: 'choix', consigne: 'Ces deux triangles sont semblables. Quel est le sommet homologue de B ?',
      enonce: 'Lis les angles sur la figure.',
      figure: semblablesParAngles(['A', 'B', 'C'], { B: 35, C: 85 }, ['D', 'F', 'E'], 1.5, 250, true,
        { A: '60°', B: '35°', C: '85°', D: '60°', E: '85°', F: '35°' }),
      homologueDe: 'B', choix: ['D', 'E', 'F'], attendu: 'F', revoir: 'definition',
    },
    {
      id: 't-1-5-4', type: 'choix', consigne: 'Sur la même figure, quel est le côté homologue de [AC] ?',
      enonce: 'Lis les angles sur la figure.',
      figure: semblablesParAngles(['A', 'B', 'C'], { B: 35, C: 85 }, ['D', 'F', 'E'], 1.5, 250, true,
        { A: '60°', B: '35°', C: '85°', D: '60°', E: '85°', F: '35°' }),
      homologueDe: 'AC', choix: ['[DE]', '[DF]', '[EF]'], attendu: '[DE]', revoir: 'definition',
    },
    {
      id: 't-1-5-5', type: 'calcul',
      consigne: 'ABC et DEF sont semblables, [AB] et [EF] homologues. Calcule le coefficient qui fait passer de ABC à DEF.',
      enonce: '\\text{AB = 5 cm, EF = 8 cm}', attendu: 1.6, revoir: 'propriete',
    },
    {
      id: 't-1-5-6', type: 'calcul', consigne: 'Les triangles ABC et RST sont semblables : les angles de même couleur sont égaux. Calcule ST, en cm.',
      enonce: 'Lis les longueurs sur la figure.',
      figure: {
        modele: 'semblables',
        t1: { sommets: ['A', 'B', 'C'], longueurs: { AB: 6, BC: 9, CA: 8 } },
        t2: { sommets: ['R', 'S', 'T'], k: 0.5, rotation: 30, miroir: true },
        etiquettes: { AB: '6 cm', BC: '9 cm', RS: '3 cm', ST: '?' },
      },
      longueurDe: 'ST', attendu: 4.5, revoir: 'propriete',
    },
    {
      id: 't-1-5-7', type: 'calcul', consigne: 'Un coefficient de réduction vaut k = 0,25. Quel est le coefficient d\'agrandissement associé ?',
      enonce: 'k = 0,25', attendu: 4, revoir: 'propriete',
    },
    {
      id: 't-1-5-8', type: 'choix', consigne: 'Deux triangles sont semblables, avec un coefficient k = 1,2. Il s\'agit…',
      enonce: 'k = 1,2',
      choix: ['d\'un coefficient de réduction', 'd\'un coefficient d\'agrandissement'],
      attendu: 'd\'un coefficient d\'agrandissement', revoir: 'propriete',
    },
    {
      id: 't-1-5-9', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Pour démontrer que deux triangles sont semblables, il suffit de montrer que deux de leurs angles sont deux à deux égaux.',
      attendu: true, revoir: 'remarque',
    },
    {
      id: 't-1-5-10', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Deux triangles semblables ont des côtés homologues de même longueur.',
      attendu: false, revoir: 'propriete',
    },
  ],
};
