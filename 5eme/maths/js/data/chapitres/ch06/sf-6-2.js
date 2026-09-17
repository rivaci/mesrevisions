// Chapitre 6, savoir-faire 2 — Démontrer que la somme des angles vaut 180°.
//
// ── D'où vient ce savoir-faire ────────────────────────────────────────────
//
// Du point « somme des angles et sa démonstration » de la liste de la
// professeure. C'est souvent la première vraie démonstration du collège, et
// elle réutilise le chapitre 2 : les angles alternes-internes.
//
// ── Ce qu'on peut vérifier d'une démonstration ───────────────────────────
//
// Une application ne corrige pas une rédaction libre. Elle peut, en revanche,
// faire reconnaître la propriété qui justifie une étape, faire repérer
// l'étape qui tourne en rond, et faire calculer les angles de la figure. La
// figure est celle du cours : la parallèle (d) à (BC) passant par A, avec les
// angles 1 et 2 (js/figures-plan.js, option `parallele`).

const figure = (B, C, etiquettes) => ({
  modele: 'triangle', sommets: ['A', 'B', 'C'], angles: { B, C }, etiquettes, parallele: true,
});
const NATURES = ['alternes-internes', 'correspondants', 'opposés par le sommet', 'adjacents'];
const RAISONS_PLAT = [
  'ils forment un angle plat',
  'ce sont les trois angles d\'un triangle',
  'ils sont alternes-internes',
];
const LIGNES_JUSTES = [
  { texte: 'On trace la droite (d), parallèle à (BC), passant par A.' },
  { texte: 'L\'angle 1 et l\'angle en B sont alternes-internes, et (d) est parallèle à (BC) : ils sont égaux.' },
  { texte: 'L\'angle 2 et l\'angle en C sont alternes-internes, et (d) est parallèle à (BC) : ils sont égaux.' },
  { texte: 'L\'angle 1, l\'angle en A et l\'angle 2 forment un angle plat : leur somme vaut 180°.' },
];

export default {
  id: 'sf-6-2',
  titre: 'Démontrer la propriété de la somme des angles',
  attendus: [
    'Il suit les étapes de la démonstration de la somme des angles d\'un triangle.',
    'Il justifie chaque étape par une propriété connue : angles alternes-internes, angle plat.',
    'Il distingue une propriété démontrée d\'une constatation sur un dessin.',
  ],

  decouvrir: {
    titre: 'Mesurer ne suffit pas',
    texte:
      'On a mesuré les angles de plusieurs triangles et trouvé 180° chaque fois. Mais on ne peut '
      + 'pas mesurer tous les triangles, et un rapporteur se trompe souvent d\'un degré.',
    question: 'Un élève mesure les angles d\'un triangle et trouve 49°, 62° et 70°. Quelle somme obtient-il ?',
    champs: [{ id: 'a', etiquette: 'somme, en degrés', attendu: 181 }],
    conclusion:
      '181° : l\'erreur de mesure empêche de conclure. Pour être **sûr** que la somme vaut 180° '
      + 'dans **tous** les triangles, il faut une **démonstration** : un raisonnement qui ne '
      + 's\'appuie que sur des propriétés déjà connues.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Démontrer',
      texte:
        'Une **démonstration** est une suite d\'étapes. Chaque étape part de **données** (ce que '
        + 'l\'on sait), utilise une **propriété** déjà connue, et aboutit à une **conclusion**.\n'
        + 'On n\'a pas le droit d\'utiliser ce que l\'on cherche à démontrer, ni ce que l\'on '
        + '« voit » sur le dessin.',
    },
    {
      type: 'theoreme',
      titre: 'La démonstration, étape par étape',
      texte:
        'Soit ABC un triangle. On trace la droite (d) **parallèle à (BC)** passant par A.\n'
        + '1. L\'angle 1 et l\'angle en B sont **alternes-internes**, formés par les parallèles '
        + '(d) et (BC) et la sécante (AB) : ils sont **égaux**.\n'
        + '2. De même, l\'angle 2 et l\'angle en C sont alternes-internes : ils sont égaux.\n'
        + '3. L\'angle 1, l\'angle en A et l\'angle 2 forment un **angle plat** : leur somme vaut 180°.\n'
        + '4. Donc angle en B + angle en A + angle en C = 180°.',
      figure: figure(55, 65),
    },
    {
      type: 'remarque',
      titre: 'Les deux propriétés utilisées',
      texte:
        '• Si deux droites parallèles sont coupées par une sécante, alors les angles '
        + 'alternes-internes qu\'elles forment sont égaux (chapitre 2).\n'
        + '• Un angle plat mesure 180°.',
    },
    {
      type: 'exemple',
      texte:
        'Données : (d) est parallèle à (BC). Propriété : entre deux parallèles, les angles '
        + 'alternes-internes sont égaux. Conclusion : l\'angle 1 est égal à l\'angle en B.',
    },
  ],

  methode: {
    titre: 'Rédiger une étape de la démonstration',
    enonce: 'On sait que (d) est parallèle à (BC). Pourquoi l\'angle 2 est-il égal à l\'angle en C ?',
    figure: figure(50, 70),
    etapes: [
      { texte: 'Je sais que les droites (d) et (BC) sont parallèles, et que (AC) les coupe.', note: 'Les données.' },
      {
        texte: 'Or, si deux droites parallèles sont coupées par une sécante, les angles alternes-internes sont égaux.',
        note: 'Une propriété déjà démontrée.',
      },
      { texte: 'Donc l\'angle 2 et l\'angle en C, qui sont alternes-internes, sont égaux.', note: 'La conclusion.' },
    ],
    controle:
      'Le contrôle : chaque étape doit se lire « je sais que…, or…, donc… ». Sans « or », il '
      + 'manque la propriété.',
  },

  entrainement: [
    // ── Palier 1 : la figure de la démonstration ───────────────────────────
    {
      // NEUTRE : le geste de départ, sans piège.
      id: 'e-6-2-1', type: 'choix', palier: 1, neutre: true,
      consigne: 'Quelle droite trace-t-on pour démontrer que la somme des angles de ABC vaut 180° ?',
      enonce: 'Le point de départ de la démonstration.',
      choix: ['la parallèle à (BC) passant par A', 'la perpendiculaire à (BC) passant par A', 'la médiatrice de [BC]'],
      attendu: 'la parallèle à (BC) passant par A',
    },
    {
      id: 'e-6-2-2', type: 'choix', palier: 1, piege: 'demonstration-mal-justifiee',
      consigne: 'Comment s\'appellent l\'angle 1 et l\'angle en B ?', enonce: 'Observe la figure.',
      figure: figure(50, 60),
      choix: NATURES, attendu: 'alternes-internes',
      fausses: NATURES.slice(1).map((valeur) => ({ valeur, piege: 'demonstration-mal-justifiee' })),
    },
    {
      id: 'e-6-2-3', type: 'choix', palier: 1, piege: 'demonstration-mal-justifiee',
      consigne: 'Pourquoi l\'angle 1 est-il égal à l\'angle en B ?', enonce: 'Observe la figure.',
      figure: figure(50, 60),
      choix: [
        'parce qu\'ils ont l\'air égaux sur la figure',
        'parce qu\'ils sont alternes-internes et que (d) est parallèle à (BC)',
        'parce que la somme des angles d\'un triangle vaut 180°',
      ],
      attendu: 'parce qu\'ils sont alternes-internes et que (d) est parallèle à (BC)',
      fausses: [
        { valeur: 'parce qu\'ils ont l\'air égaux sur la figure', piege: 'demonstration-mal-justifiee' },
        { valeur: 'parce que la somme des angles d\'un triangle vaut 180°', piege: 'demonstration-mal-justifiee' },
      ],
    },
    {
      id: 'e-6-2-4', type: 'calcul', palier: 1, piege: 'egal-ou-supplementaire',
      consigne: 'L\'angle en B mesure 55°. Combien mesure l\'angle 1, en degrés ?', enonce: 'Combien mesure l\'angle 1 ?',
      figure: figure(55, 60, { B: '55°' }),
      angleDe: '1', attendu: 55,
      fausses: [{ valeur: 125, piege: 'egal-ou-supplementaire' }],
    },
    // ── Palier 2 : les trois angles en A ───────────────────────────────────
    {
      id: 'e-6-2-5', type: 'calcul', palier: 2, piege: 'egal-ou-supplementaire',
      consigne: 'L\'angle en C mesure 65°. Combien mesure l\'angle 2, en degrés ?', enonce: 'Combien mesure l\'angle 2 ?',
      figure: figure(45, 65, { C: '65°' }),
      angleDe: '2', attendu: 65,
      fausses: [{ valeur: 115, piege: 'egal-ou-supplementaire' }],
    },
    {
      id: 'e-6-2-6', type: 'trous', palier: 2, piege: 'egal-ou-supplementaire',
      consigne: 'L\'angle en B mesure 50° et l\'angle en C mesure 70°. Complète, en degrés.',
      enonce: 'Combien mesurent l\'angle 1, l\'angle 2 et l\'angle en A ?',
      figure: figure(50, 70, { B: '50°', C: '70°' }),
      champs: [
        { id: 'a', etiquette: 'angle 1', attendu: 50 },
        { id: 'b', etiquette: 'angle 2', attendu: 70 },
        { id: 'c', etiquette: 'angle en A', attendu: 60 },
      ],
      fausses: [
        { valeur: 130, piege: 'egal-ou-supplementaire' },
        { valeur: 110, piege: 'egal-ou-supplementaire' },
      ],
    },
    {
      id: 'e-6-2-7', type: 'choix', palier: 2, piege: 'demonstration-mal-justifiee',
      consigne: 'Pourquoi l\'angle 1, l\'angle en A et l\'angle 2 ont-ils pour somme 180° ?', enonce: 'Observe la figure.',
      figure: figure(50, 60),
      choix: RAISONS_PLAT, attendu: RAISONS_PLAT[0],
      fausses: RAISONS_PLAT.slice(1).map((valeur) => ({ valeur, piege: 'demonstration-mal-justifiee' })),
    },
    {
      // NEUTRE : reconnaître l'énoncé de la propriété du chapitre 2.
      id: 'e-6-2-8', type: 'choix', palier: 2, neutre: true,
      consigne: 'Quelle propriété du chapitre 2 la démonstration utilise-t-elle ?', enonce: 'Parmi ces trois propriétés.',
      choix: [
        'Deux angles opposés par le sommet sont égaux.',
        'Si deux droites parallèles sont coupées par une sécante, les angles alternes-internes sont égaux.',
        'Deux angles complémentaires ont pour somme 90°.',
      ],
      attendu: 'Si deux droites parallèles sont coupées par une sécante, les angles alternes-internes sont égaux.',
    },
    // ── Palier 3 : repérer l'étape fautive ─────────────────────────────────
    {
      id: 'e-6-2-9', type: 'corriger', palier: 3, piege: 'demonstration-mal-justifiee',
      consigne: 'Cette démonstration contient une étape mal justifiée. Laquelle ?',
      enonce: '\\text{Démonstration de la somme des angles}',
      figure: figure(50, 60),
      lignes: [
        LIGNES_JUSTES[0],
        LIGNES_JUSTES[1],
        { texte: 'L\'angle 2 et l\'angle en C sont égaux, car la somme des angles d\'un triangle vaut 180°.', fausse: true },
        LIGNES_JUSTES[3],
      ],
      explication:
        'La troisième étape s\'appuie sur ce qu\'on cherche à démontrer. Il fallait dire : '
        + 'l\'angle 2 et l\'angle en C sont alternes-internes, et (d) est parallèle à (BC), donc '
        + 'ils sont égaux.',
    },
    {
      id: 'e-6-2-10', type: 'choix', palier: 3, piege: 'demonstration-mal-justifiee',
      consigne: 'Mesurer les angles de trois triangles et trouver 180° chaque fois…', enonce: 'Que peut-on en dire ?',
      choix: [
        'démontre la propriété pour tous les triangles',
        'vérifie la propriété sur trois exemples, sans la démontrer',
      ],
      attendu: 'vérifie la propriété sur trois exemples, sans la démontrer',
      fausses: [{ valeur: 'démontre la propriété pour tous les triangles', piege: 'demonstration-mal-justifiee' }],
    },
    {
      id: 'e-6-2-11', type: 'calcul', palier: 3, piege: 'somme-angles-oubliee',
      consigne: 'L\'angle 1 mesure 42° et l\'angle 2 mesure 63°. Combien mesure l\'angle en A, en degrés ?',
      enonce: 'Combien mesure l\'angle en A ?',
      figure: figure(42, 63),
      angleDe: 'A', attendu: 75,
      fausses: [{ valeur: 105, piege: 'somme-angles-oubliee' }],
    },
    {
      id: 'e-6-2-12', type: 'vraifaux', palier: 3, piege: 'demonstration-mal-justifiee',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Dans cette démonstration, il est indispensable que (d) soit parallèle à (BC).',
      figure: figure(50, 60),
      attendu: true,
    },
  ],

  problemes: [
    {
      id: 'p-6-2-1',
      enonce:
        'Dans le triangle ABC, l\'angle en B mesure 48° et l\'angle en C mesure 67°. On trace la '
        + 'parallèle (d) à (BC) passant par A.',
      figure: figure(48, 67, { B: '48°', C: '67°' }),
      questions: [
        { texte: 'Combien mesure l\'angle 1 ?', attendu: 48, unite: '°' },
        { texte: 'Combien mesure l\'angle 2 ?', attendu: 67, unite: '°' },
        { texte: 'Combien mesure l\'angle en A ?', attendu: 65, unite: '°' },
      ],
    },
    {
      id: 'p-6-2-2',
      enonce: 'Un quadrilatère ABCD est coupé par sa diagonale [AC] en deux triangles.',
      questions: [
        { texte: 'Quelle est la somme des angles d\'un triangle ?', attendu: 180, unite: '°' },
        { texte: 'Quelle est donc la somme des angles du quadrilatère ?', attendu: 360, unite: '°' },
      ],
    },
    {
      id: 'p-6-2-3',
      enonce: 'Un quadrilatère a trois angles qui mesurent 90°, 85° et 110°.',
      questions: [{ texte: 'Combien mesure son quatrième angle ?', attendu: 75, unite: '°' }],
    },
    {
      id: 'p-6-2-4',
      enonce: 'Un pentagone, qui a cinq côtés, se découpe en trois triangles à partir de l\'un de ses sommets.',
      questions: [
        { texte: 'Quelle est la somme des angles du pentagone ?', attendu: 540, unite: '°' },
        { texte: 'S\'il a cinq angles égaux, combien mesure chacun ?', attendu: 108, unite: '°' },
      ],
    },
    {
      id: 'p-6-2-5',
      enonce:
        'Dans un triangle ABC, l\'angle en A mesure 50° et l\'angle en B mesure 60°. On prolonge le '
        + 'côté [BC] au-delà de C.',
      questions: [
        { texte: 'Combien mesure l\'angle en C du triangle ?', attendu: 70, unite: '°' },
        { texte: 'Combien mesure l\'angle formé en C par [CA] et le prolongement de [BC] ?', attendu: 110, unite: '°' },
      ],
    },
  ],

  test: [
    {
      id: 't-6-2-1', type: 'choix', consigne: 'Quelle droite trace-t-on pour démontrer que la somme des angles de ABC vaut 180° ?',
      enonce: 'Le point de départ de la démonstration.',
      choix: ['la hauteur issue de A', 'la parallèle à (BC) passant par A', 'la bissectrice de l\'angle en A'],
      attendu: 'la parallèle à (BC) passant par A', revoir: 'theoreme',
    },
    {
      id: 't-6-2-2', type: 'choix', consigne: 'Comment s\'appellent l\'angle 2 et l\'angle en C ?', enonce: 'Observe la figure.',
      figure: figure(55, 65), choix: NATURES, attendu: 'alternes-internes', revoir: 'theoreme',
    },
    {
      id: 't-6-2-3', type: 'calcul', consigne: 'L\'angle en B mesure 38°. Combien mesure l\'angle 1, en degrés ?', enonce: 'Combien mesure l\'angle 1 ?',
      figure: figure(38, 70, { B: '38°' }), angleDe: '1', attendu: 38, revoir: 'theoreme',
    },
    {
      id: 't-6-2-4', type: 'calcul', consigne: 'L\'angle en C mesure 71°. Combien mesure l\'angle 2, en degrés ?', enonce: 'Combien mesure l\'angle 2 ?',
      figure: figure(50, 71, { C: '71°' }), angleDe: '2', attendu: 71, revoir: 'theoreme',
    },
    {
      id: 't-6-2-5', type: 'choix', consigne: 'Pourquoi l\'angle 1, l\'angle en A et l\'angle 2 ont-ils pour somme 180° ?', enonce: 'Observe la figure.',
      figure: figure(55, 65), choix: RAISONS_PLAT, attendu: RAISONS_PLAT[0], revoir: 'theoreme',
    },
    {
      id: 't-6-2-6', type: 'calcul', consigne: 'L\'angle 1 mesure 35° et l\'angle 2 mesure 80°. Combien mesure l\'angle en A, en degrés ?',
      enonce: 'Combien mesure l\'angle en A ?', figure: figure(35, 80), angleDe: 'A', attendu: 65, revoir: 'theoreme',
    },
    {
      id: 't-6-2-7', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Une propriété vérifiée en mesurant sur un dessin est démontrée.', attendu: false, revoir: 'definition',
    },
    {
      id: 't-6-2-8', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Deux angles alternes-internes formés par deux droites parallèles et une sécante sont égaux.',
      attendu: true, revoir: 'remarque',
    },
    {
      id: 't-6-2-9', type: 'calcul', consigne: 'Réponds en degrés.',
      enonce: 'Quelle est la somme des angles d\'un quadrilatère ?', attendu: 360, revoir: 'theoreme',
    },
    {
      id: 't-6-2-10', type: 'corriger', consigne: 'Cette démonstration contient une étape fausse. Laquelle ?',
      enonce: '\\text{Démonstration de la somme des angles}',
      figure: figure(50, 60),
      lignes: [
        LIGNES_JUSTES[0],
        { texte: 'L\'angle 1 et l\'angle en B sont correspondants, et (d) est parallèle à (BC) : ils sont égaux.', fausse: true },
        LIGNES_JUSTES[2],
        LIGNES_JUSTES[3],
      ],
      explication: 'L\'angle 1 et l\'angle en B sont alternes-internes, pas correspondants.',
      revoir: 'theoreme',
    },
  ],
};
