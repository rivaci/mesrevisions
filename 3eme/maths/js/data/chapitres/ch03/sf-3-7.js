// Chapitre 3, savoir-faire 7 — Résoudre une équation produit nul.
//
// La troisième question des exercices 10 à 13 de la fiche d'Evan, et
// l'enchaînement qui les structure tous : développer, factoriser, résoudre.
// La réponse est la liste des solutions, dans l'ordre qu'on veut ; une
// fraction se tape « −5/3 ». litteral.js lit chaque facteur, en calcule la
// racine, et reconnaît les deux erreurs prévisibles sur la valeur : le signe
// oublié (5/3 au lieu de −5/3) et la fraction retournée (−3/5).

export default {
  id: 'sf-3-7',
  titre: 'Résoudre une équation produit nul',
  attendus: [
    'Il résout une équation de la forme (ax + b)(cx + d) = 0.',
    'Il enchaîne développer, factoriser et résoudre dans un même exercice.',
  ],

  cours: [
    {
      type: 'propriete',
      titre: 'Le produit nul',
      texte:
        '**Un produit est nul si et seulement si l\'un au moins de ses facteurs est nul.**\n'
        + 'A × B = 0 équivaut à : A = 0 ou B = 0.',
    },
    {
      type: 'exemple',
      texte: '(x + 9)(4x − 1) = 0 : x + 9 = 0 ou 4x − 1 = 0, donc x = −9 ou x = 1/4.',
    },
    {
      type: 'remarque',
      titre: 'Une solution par facteur',
      texte:
        'Chaque facteur qui contient x donne une équation du premier degré, donc une solution : deux facteurs, '
        + 'deux solutions. Un facteur qui n\'est qu\'un nombre, comme le 6 de 6(x − 7) = 0, n\'en donne aucune.',
    },
    {
      type: 'remarque',
      titre: 'Factoriser d\'abord',
      texte:
        'Pour résoudre une équation qui n\'est pas un produit, on la factorise d\'abord. C\'est pour ça que les '
        + 'exercices enchaînent : 1. développer, 2. factoriser, 3. résoudre.',
    },
  ],

  methode: {
    titre: 'Un facteur, une équation',
    enonce: 'Résoudre (2x − 6)(5x + 4) = 0.',
    etapes: [
      { texte: 'Un produit est nul si l\'un au moins de ses facteurs est nul : 2x − 6 = 0 ou 5x + 4 = 0.', note: 'On cite la règle.' },
      { texte: '2x − 6 = 0 donne 2x = 6, donc x = 3. 5x + 4 = 0 donne 5x = −4, donc x = −4/5.', note: 'Le nombre change de signe en passant de l\'autre côté ; on divise par le nombre devant x.' },
      { texte: 'L\'équation a deux solutions : 3 et −4/5.', note: '' },
    ],
    controle: 'Le contrôle : je remplace x dans chaque facteur. 2 × 3 − 6 = 0, et 5 × (−4/5) + 4 = −4 + 4 = 0.',
  },

  aSavoir: [
    {
      id: 'as-produit-nul',
      titre: 'La règle du produit nul',
      consigne: 'Écris la propriété du produit nul.',
      enonce: '**Un produit est nul si et seulement si l\'un au moins de ses facteurs est nul.**',
      indice: 'Un produit est nul si et seulement si …',
      elements: [
        { id: 'produit', texte: 'il s\'agit d\'un produit égal à zéro' },
        { id: 'un-facteur', texte: 'l\'un au moins de ses facteurs est nul' },
        { id: 'equivalence', texte: '« si et seulement si » : la règle marche dans les deux sens', obligatoire: false },
      ],
    },
  ],

  entrainement: [
    // ── Palier 1 : des solutions entières ──────────────────────────────────
    { id: 'e-3-7-1', type: 'solutions', palier: 1, piege: 'cl-produit-nul-signe', consigne: 'Résous l\'équation.', enonce: '(x-3)(x+5)=0' },
    { id: 'e-3-7-2', type: 'solutions', palier: 1, piege: 'cl-produit-nul-signe', consigne: 'Résous l\'équation.', enonce: '(x+7)(x-1)=0' },
    {
      // NEUTRE : un seul facteur contient x. Le piège de la solution oubliée
      // ne peut pas jouer ; celui d'en inventer une seconde, si.
      id: 'e-3-7-3', type: 'solutions', palier: 1, neutre: true, piege: 'cl-produit-nul-une-solution',
      consigne: 'Résous l\'équation.', enonce: '4(x-9)=0',
    },
    // ── Palier 2 : des fractions ───────────────────────────────────────────
    { id: 'e-3-7-4', type: 'solutions', palier: 2, piege: 'cl-produit-nul-inverse', consigne: 'Résous l\'équation.', enonce: '(2x-8)(3x+6)=0' },
    { id: 'e-3-7-5', type: 'solutions', palier: 2, piege: 'cl-produit-nul-inverse', consigne: 'Résous l\'équation.', enonce: '(3x+5)(5x-6)=0' },
    { id: 'e-3-7-6', type: 'solutions', palier: 2, piege: 'cl-produit-nul-une-solution', consigne: 'Résous l\'équation.', enonce: 'x(4x-3)=0' },
    // ── Palier 3 : des signes partout ──────────────────────────────────────
    { id: 'e-3-7-7', type: 'solutions', palier: 3, piege: 'cl-produit-nul-signe', consigne: 'Résous l\'équation.', enonce: '(4x-3)(-2x-4)=0' },
    { id: 'e-3-7-8', type: 'solutions', palier: 3, piege: 'cl-produit-nul-inverse', consigne: 'Résous l\'équation.', enonce: '(2x-3)(2x+5)=0' },
    { id: 'e-3-7-9', type: 'solutions', palier: 3, piege: 'cl-produit-nul-signe', consigne: 'Résous l\'équation.', enonce: '(7-2x)(5x+1)=0' },
  ],

  // ── Rédiger ───────────────────────────────────────────────────────────────
  //
  // La rédaction attendue en contrôle : la règle citée, les deux équations,
  // leur résolution, la conclusion. Puis l'exercice type de la fiche, en entier.
  redactions: [
    {
      id: 'r-3-7-1',
      titre: 'Résoudre une équation produit nul',
      enonce: 'On veut résoudre l\'équation (4x + 3)(2x − 9) = 0.',
      consigne: 'Résous cette équation en rédigeant chaque étape.',
      criteres: [
        { id: 'regle', texte: 'la règle citée : un produit est nul si et seulement si l\'un au moins de ses facteurs est nul' },
        { id: 'deux-equations', texte: 'les deux équations : 4x + 3 = 0 ou 2x − 9 = 0' },
        { id: 'premiere', texte: '4x + 3 = 0 donne 4x = −3, donc x = −3/4' },
        { id: 'seconde', texte: '2x − 9 = 0 donne 2x = 9, donc x = 9/2' },
        { id: 'conclusion', texte: 'la conclusion : les solutions sont −3/4 et 9/2' },
      ],
      modele: [
        'Un produit est nul si et seulement si l\'un au moins de ses facteurs est nul.',
        'Donc 4x + 3 = 0 ou 2x − 9 = 0.',
        '4x + 3 = 0 donne 4x = −3, soit x = −3/4.',
        '2x − 9 = 0 donne 2x = 9, soit x = 9/2.',
        'L\'équation a deux solutions : −3/4 et 9/2.',
      ],
    },
    {
      id: 'r-3-7-2',
      titre: 'Développer, factoriser, résoudre',
      enonce: 'On donne l\'expression D = (x − 2)² − 4x(x − 2).',
      consigne:
        '1. Développe et réduis D. 2. Factorise D. 3. Résous l\'équation (x − 2)(−3x − 2) = 0. Rédige les trois '
        + 'questions, avec chaque étape de calcul.',
      criteres: [
        { id: 'developper', texte: 'le développement : D = x² − 4x + 4 − 4x² + 8x' },
        { id: 'reduire', texte: 'la forme réduite : D = −3x² + 4x + 4' },
        { id: 'facteur-commun', texte: 'le facteur commun (x − 2) repéré : D = (x − 2)[(x − 2) − 4x]' },
        { id: 'factorisee', texte: 'la forme factorisée : D = (x − 2)(−3x − 2)' },
        { id: 'regle', texte: 'la règle du produit nul citée' },
        { id: 'equations', texte: 'les deux équations : x − 2 = 0 ou −3x − 2 = 0' },
        { id: 'resolution', texte: 'x − 2 = 0 donne x = 2 ; −3x − 2 = 0 donne −3x = 2, donc x = −2/3' },
        { id: 'solutions', texte: 'la conclusion : les solutions sont 2 et −2/3' },
      ],
      modele: [
        '1. D = (x − 2)² − 4x(x − 2) = x² − 4x + 4 − 4x² + 8x = −3x² + 4x + 4.',
        '2. Le facteur commun est (x − 2) : D = (x − 2)[(x − 2) − 4x] = (x − 2)(−3x − 2).',
        '3. Un produit est nul si et seulement si l\'un au moins de ses facteurs est nul.',
        'Donc x − 2 = 0 ou −3x − 2 = 0, soit x = 2 ou x = −2/3.',
        'L\'équation a deux solutions : 2 et −2/3.',
      ],
    },
  ],

  test: [
    { id: 't-3-7-1', type: 'solutions', consigne: 'Résous l\'équation.', enonce: '(x-6)(x+2)=0', revoir: 'propriete' },
    { id: 't-3-7-2', type: 'solutions', consigne: 'Résous l\'équation.', enonce: '(x+4)(x+10)=0', revoir: 'propriete' },
    { id: 't-3-7-3', type: 'solutions', consigne: 'Résous l\'équation.', enonce: '(2x+1)(x-3)=0', revoir: 'exemple' },
    { id: 't-3-7-4', type: 'solutions', consigne: 'Résous l\'équation.', enonce: '(5x-10)(3x-1)=0', revoir: 'exemple' },
    { id: 't-3-7-5', type: 'solutions', consigne: 'Résous l\'équation.', enonce: 'x(x+8)=0', revoir: 'remarque' },
    { id: 't-3-7-6', type: 'solutions', consigne: 'Résous l\'équation.', enonce: '(6x+27)(5-x)=0', revoir: 'exemple' },
    { id: 't-3-7-7', type: 'solutions', consigne: 'Résous l\'équation.', enonce: '-3(2x-5)=0', revoir: 'remarque' },
    { id: 't-3-7-8', type: 'solutions', consigne: 'Résous l\'équation.', enonce: '(4x+5)(4x-5)=0', revoir: 'exemple' },
    { id: 't-3-7-9', type: 'solutions', consigne: 'Résous l\'équation.', enonce: '(10x-4)(x+0{,}5)=0', revoir: 'exemple' },
    { id: 't-3-7-10', type: 'solutions', consigne: 'Résous l\'équation.', enonce: '(8-4x)(2x+7)=0', revoir: 'exemple' },
  ],
};
