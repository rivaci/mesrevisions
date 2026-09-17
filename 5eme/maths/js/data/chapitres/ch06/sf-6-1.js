// Chapitre 6, savoir-faire 1 — Utiliser la somme des angles d'un triangle.
//
// ── D'où vient ce savoir-faire ────────────────────────────────────────────
//
// Du premier point du chapitre 6 dans la liste de la professeure : « somme
// des angles ». La démonstration a son propre savoir-faire, le suivant : ici,
// on s'en sert.
//
// ── Les triangles particuliers ───────────────────────────────────────────
//
// La propriété seule ne suffit pas quand un seul angle est donné : c'est la
// nature du triangle — isocèle, équilatéral, rectangle — qui fournit le
// reste. L'erreur la plus fréquente n'est pas de l'ignorer, mais d'oublier de
// PARTAGER : 180 − 40 = 140, et 140 donné comme angle à la base.

const triangle = (sommets, angles, etiquettes) => ({ modele: 'triangle', sommets, angles, etiquettes });

export default {
  id: 'sf-6-1',
  titre: 'Calculer un angle avec la somme des angles d\'un triangle',
  attendus: [
    'Il connaît la propriété : la somme des angles d\'un triangle vaut 180°.',
    'Il calcule la mesure d\'un angle connaissant les deux autres.',
    'Il utilise les propriétés des triangles isocèle, équilatéral et rectangle.',
  ],

  decouvrir: {
    titre: 'Trois triangles, un même total',
    texte: 'On a mesuré au rapporteur les angles de trois triangles très différents.',
    lignes: [
      { calcul: 'Triangle 1', resultat: '50° ; 60° ; 70°' },
      { calcul: 'Triangle 2', resultat: '30° ; 30° ; 120°' },
      { calcul: 'Triangle 3', resultat: '90° ; 45° ; 45°' },
    ],
    question: 'Calcule la somme des trois angles de chaque triangle.',
    champs: [
      { id: 'a', etiquette: 'triangle 1', attendu: 180 },
      { id: 'b', etiquette: 'triangle 2', attendu: 180 },
      { id: 'c', etiquette: 'triangle 3', attendu: 180 },
    ],
    conclusion:
      'Le total vaut **180°** à chaque fois. Ce n\'est pas un hasard : c\'est une propriété de '
      + '**tous** les triangles, que le savoir-faire suivant démontre.',
  },

  cours: [
    {
      type: 'propriete',
      titre: 'La somme des angles d\'un triangle',
      texte: 'Dans un triangle, la **somme des mesures des trois angles** est égale à **180°**.',
      figure: triangle(['A', 'B', 'C'], { B: 60, C: 70 }, { A: '50°', B: '60°', C: '70°' }),
    },
    {
      type: 'propriete',
      titre: 'Calculer le troisième angle',
      texte:
        'Si on connaît deux angles, le troisième mesure **180° moins la somme des deux '
        + 'autres**.\n'
        + 'Si l\'angle en B mesure 45° et l\'angle en C mesure 75°, l\'angle en A mesure '
        + '180° − (45° + 75°) = 60°.',
    },
    {
      type: 'propriete',
      titre: 'Les triangles particuliers',
      texte:
        '**Isocèle** en A : les angles en B et en C sont égaux.\n'
        + '**Équilatéral** : chaque angle mesure 60° (180 ÷ 3).\n'
        + '**Rectangle** en A : l\'angle en A mesure 90°, et les deux autres ont pour somme 90°.',
    },
    {
      type: 'remarque',
      titre: 'Au plus un angle obtus',
      texte:
        'Deux angles obtus dépasseraient déjà 180° : un triangle a **au plus un** angle droit ou '
        + 'obtus, donc **au moins deux** angles aigus.',
    },
    {
      type: 'exemple',
      texte: 'Angles de 45° et 75° : le troisième mesure 60°   ·   isocèle d\'angle au sommet 40° : deux angles de 70° à la base',
    },
  ],

  methode: {
    titre: 'Calculer les angles d\'un triangle isocèle',
    enonce: 'ABC est isocèle en A, et l\'angle en A mesure 40°. Combien mesurent les angles en B et en C ?',
    figure: triangle(['A', 'B', 'C'], { B: 70, C: 70 }, { A: '40°', B: '?', C: '?' }),
    etapes: [
      { texte: 'Le triangle est isocèle en A : les angles en B et en C sont égaux.', note: 'C\'est la propriété du triangle isocèle.' },
      { texte: 'Ensemble, ils mesurent 180° − 40° = 140°.', note: 'La somme des trois angles vaut 180°.' },
      { texte: 'Chacun mesure donc 140° ÷ 2 = 70°.', note: '' },
    ],
    controle:
      'Le contrôle : 40° + 70° + 70° = 180°, et les deux angles à la base sont bien égaux.',
  },

  entrainement: [
    // ── Palier 1 : deux angles connus ──────────────────────────────────────
    {
      // NEUTRE : la propriété elle-même, sans calcul.
      id: 'e-6-1-1', type: 'calcul', palier: 1, neutre: true,
      consigne: 'Réponds en degrés.', enonce: 'Quelle est la somme des trois angles d\'un triangle ?',
      attendu: 180,
    },
    {
      id: 'e-6-1-2', type: 'calcul', palier: 1, piege: 'somme-angles-oubliee',
      consigne: 'Calcule la mesure de l\'angle en A, en degrés.', enonce: 'Combien mesure l\'angle en A ?',
      figure: triangle(['A', 'B', 'C'], { B: 50, C: 60 }, { B: '50°', C: '60°', A: '?' }),
      angleDe: 'A', attendu: 70,
      fausses: [
        { valeur: 130, piege: 'somme-angles-oubliee' },
        { valeur: 250, piege: 'somme-angles-oubliee' },
      ],
    },
    {
      id: 'e-6-1-3', type: 'calcul', palier: 1, piege: 'somme-angles-oubliee',
      consigne: 'Réponds en degrés.',
      enonce: 'Dans le triangle DEF, l\'angle en D mesure 35° et l\'angle en E mesure 85°. Combien mesure l\'angle en F ?',
      attendu: 60,
      fausses: [
        { valeur: 145, piege: 'somme-angles-oubliee' },
        { valeur: 95, piege: 'somme-angles-oubliee' },
        { valeur: 240, piege: 'somme-angles-oubliee' },
      ],
    },
    {
      id: 'e-6-1-4', type: 'calcul', palier: 1, piege: 'somme-angles-oubliee',
      consigne: 'Calcule la mesure de l\'angle en R, en degrés.', enonce: 'Combien mesure l\'angle en R ?',
      figure: triangle(['R', 'S', 'T'], { S: 35, T: 100 }, { S: '35°', T: '100°', R: '?' }),
      angleDe: 'R', attendu: 45,
      fausses: [
        { valeur: 145, piege: 'somme-angles-oubliee' },
        { valeur: 225, piege: 'somme-angles-oubliee' },
      ],
    },
    // ── Palier 2 : un seul angle connu, et la nature du triangle ───────────
    {
      id: 'e-6-1-5', type: 'calcul', palier: 2, piege: 'triangle-particulier-ignore',
      consigne: 'ABC est isocèle en A. Calcule l\'angle en B, en degrés.', enonce: 'Combien mesure l\'angle en B ?',
      figure: triangle(['A', 'B', 'C'], { B: 65, C: 65 }, { A: '50°', B: '?' }),
      angleDe: 'B', attendu: 65,
      fausses: [
        { valeur: 130, piege: 'triangle-particulier-ignore' },
        { valeur: 50, piege: 'triangle-particulier-ignore' },
      ],
    },
    {
      id: 'e-6-1-6', type: 'calcul', palier: 2, piege: 'triangle-particulier-ignore',
      consigne: 'MNP est isocèle en M. Calcule l\'angle en M, en degrés.', enonce: 'Combien mesure l\'angle en M ?',
      figure: triangle(['M', 'N', 'P'], { N: 72, P: 72 }, { N: '72°', M: '?' }),
      angleDe: 'M', attendu: 36,
      fausses: [
        // 180 − 72 : l'angle en P, égal à l'angle en N, oublié.
        { valeur: 108, piege: 'triangle-particulier-ignore' },
        { valeur: 72, piege: 'triangle-particulier-ignore' },
      ],
    },
    {
      id: 'e-6-1-7', type: 'calcul', palier: 2, piege: 'triangle-particulier-ignore',
      consigne: 'EFG est rectangle en E. Calcule l\'angle en G, en degrés.', enonce: 'Combien mesure l\'angle en G ?',
      figure: triangle(['E', 'F', 'G'], { F: 34, G: 56 }, { E: '90°', F: '34°', G: '?' }),
      angleDe: 'G', attendu: 56,
      fausses: [{ valeur: 146, piege: 'triangle-particulier-ignore' }],
    },
    {
      // NEUTRE : l'équilatéral, un partage en trois sans piège.
      id: 'e-6-1-8', type: 'calcul', palier: 2, neutre: true,
      consigne: 'Réponds en degrés.', enonce: 'Combien mesure chaque angle d\'un triangle équilatéral ?',
      attendu: 60,
    },
    // ── Palier 3 : raisonner sur les angles ────────────────────────────────
    {
      id: 'e-6-1-9', type: 'vraifaux', palier: 3, piege: 'somme-angles-oubliee',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Si deux angles d\'un triangle sont aigus, le troisième est forcément obtus.',
      attendu: false,
      contreExemple: {
        invite: 'Donne deux angles aigus d\'un triangle dont le troisième angle est aussi aigu.',
        champs: [{ id: 'a', etiquette: 'premier angle' }, { id: 'b', etiquette: 'deuxième angle' }],
        valide: (a, b) => a > 0 && a < 90 && b > 0 && b < 90 && 180 - a - b > 0 && 180 - a - b < 90,
        exemple: '60° et 60° : le troisième angle mesure 60°, il est aigu.',
      },
    },
    {
      id: 'e-6-1-10', type: 'vraifaux', palier: 3, piege: 'somme-angles-oubliee',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Un triangle a toujours au moins deux angles aigus.',
      attendu: true,
    },
    {
      id: 'e-6-1-11', type: 'trous', palier: 3, piege: 'triangle-particulier-ignore',
      consigne: 'ABC est isocèle en A, et l\'angle en B mesure 38°. Donne les deux autres angles, en degrés.',
      enonce: 'Combien mesurent les angles en C et en A ?',
      figure: triangle(['A', 'B', 'C'], { B: 38, C: 38 }, { B: '38°' }),
      champs: [
        { id: 'a', etiquette: 'angle en C', attendu: 38 },
        { id: 'b', etiquette: 'angle en A', attendu: 104 },
      ],
      fausses: [{ valeur: 142, piege: 'triangle-particulier-ignore' }],
    },
    {
      id: 'e-6-1-12', type: 'calcul', palier: 3, piege: 'triangle-particulier-ignore',
      consigne: 'Réponds en degrés.',
      enonce: 'Un triangle est rectangle, et l\'un de ses angles aigus mesure le double de l\'autre. Combien mesure le plus petit angle ?',
      attendu: 30,
      fausses: [
        { valeur: 60, piege: 'triangle-particulier-ignore' },
        { valeur: 45, piege: 'triangle-particulier-ignore' },
      ],
    },
  ],

  problemes: [
    {
      id: 'p-6-1-1',
      enonce: 'La façade d\'un chalet a un toit en forme de triangle isocèle, dont l\'angle au sommet mesure 110°.',
      questions: [
        { texte: 'Quelle est la somme des deux angles à la base ?', attendu: 70, unite: '°' },
        { texte: 'Combien mesure chacun de ces deux angles ?', attendu: 35, unite: '°' },
      ],
    },
    {
      id: 'p-6-1-2',
      enonce: 'Une équerre a la forme d\'un triangle rectangle, et l\'un de ses angles aigus mesure 30°.',
      questions: [
        { texte: 'Combien mesure l\'autre angle aigu ?', attendu: 60, unite: '°' },
        { texte: 'Combien mesure son plus grand angle ?', attendu: 90, unite: '°' },
      ],
    },
    {
      id: 'p-6-1-3',
      enonce: 'Un panneau routier « danger » a la forme d\'un triangle équilatéral.',
      questions: [
        { texte: 'Combien mesure chacun de ses angles ?', attendu: 60, unite: '°' },
        { texte: 'On le coupe en deux le long d\'un axe de symétrie. Combien mesure le plus petit angle de chaque moitié ?', attendu: 30, unite: '°' },
      ],
    },
    {
      id: 'p-6-1-4',
      enonce:
        'Dans un triangle ABC, l\'angle en B mesure 20° de plus que l\'angle en A, et l\'angle en C '
        + 'mesure 20° de plus que l\'angle en B.',
      questions: [
        { texte: 'Combien mesure l\'angle en A ?', attendu: 40, unite: '°' },
        { texte: 'Combien mesure l\'angle en C ?', attendu: 80, unite: '°' },
      ],
    },
    {
      id: 'p-6-1-5',
      enonce:
        'Un cerf-volant est formé de deux triangles isocèles collés par leur base. Le triangle du '
        + 'haut a un angle au sommet de 70°, celui du bas un angle au sommet de 40°.',
      questions: [
        { texte: 'Combien mesure chaque angle à la base du triangle du haut ?', attendu: 55, unite: '°' },
        { texte: 'Et chaque angle à la base du triangle du bas ?', attendu: 70, unite: '°' },
      ],
    },
  ],

  test: [
    {
      id: 't-6-1-1', type: 'calcul', consigne: 'Calcule la mesure de l\'angle en A, en degrés.', enonce: 'Combien mesure l\'angle en A ?',
      figure: triangle(['A', 'B', 'C'], { B: 55, C: 45 }, { B: '55°', C: '45°', A: '?' }),
      angleDe: 'A', attendu: 80, revoir: 'propriete',
    },
    {
      id: 't-6-1-2', type: 'calcul', consigne: 'Réponds en degrés.',
      enonce: 'Dans un triangle, deux angles mesurent 28° et 102°. Combien mesure le troisième ?', attendu: 50, revoir: 'propriete',
    },
    {
      id: 't-6-1-3', type: 'calcul', consigne: 'Réponds en degrés.',
      enonce: 'ABC est isocèle en A, et l\'angle en A mesure 80°. Combien mesure l\'angle en B ?', attendu: 50, revoir: 'propriete',
    },
    {
      id: 't-6-1-4', type: 'calcul', consigne: 'Réponds en degrés.',
      enonce: 'ABC est isocèle en A, et l\'angle en B mesure 65°. Combien mesure l\'angle en A ?', attendu: 50, revoir: 'propriete',
    },
    {
      id: 't-6-1-5', type: 'calcul', consigne: 'Réponds en degrés.',
      enonce: 'Un triangle est rectangle, et l\'un de ses angles aigus mesure 57°. Combien mesure l\'autre ?', attendu: 33, revoir: 'propriete',
    },
    { id: 't-6-1-6', type: 'calcul', consigne: 'Réponds en degrés.', enonce: 'Combien mesure chaque angle d\'un triangle équilatéral ?', attendu: 60, revoir: 'propriete' },
    {
      id: 't-6-1-7', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'La somme des angles d\'un triangle dépend de sa taille.', attendu: false, revoir: 'propriete',
    },
    {
      id: 't-6-1-8', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Un triangle rectangle ne peut pas avoir d\'angle obtus.', attendu: true, revoir: 'remarque',
    },
    {
      id: 't-6-1-9', type: 'choix', consigne: 'Ces trois mesures peuvent-elles être celles des angles d\'un triangle ?',
      enonce: 'Les angles 50°, 60° et 80°.', choix: ['oui', 'non'], attendu: 'non', revoir: 'propriete',
    },
    {
      id: 't-6-1-10', type: 'choix', consigne: 'Ces trois mesures peuvent-elles être celles des angles d\'un triangle ?',
      enonce: 'Les angles 35°, 45° et 100°.', choix: ['oui', 'non'], attendu: 'oui', revoir: 'propriete',
    },
  ],
};
