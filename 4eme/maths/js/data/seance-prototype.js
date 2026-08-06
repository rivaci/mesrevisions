// Séance 1 — prototype à valider par l'élève-pilote avant toute production.
//
// Elle n'existe pas pour couvrir un chapitre, mais pour répondre à trois
// questions posées par la charte : est-ce que ça accroche, est-ce que le
// dialogue après l'erreur tourne à vide, est-ce que le rituel est vécu comme
// une punition. Si la réponse est mauvaise, on corrige la charte — pas le
// contenu.
//
// ── Format ────────────────────────────────────────────────────────────────
//
// rituel[]    Automatismes du socle, en répétition espacée. Type `calcul` :
//             l'élève tape un nombre. On ne propose pas de choix — reconnaître
//             7 parmi quatre propositions n'est pas le même geste que le
//             produire, et c'est le second qu'on veut automatiser.
//
// exercices[] Type `qcm` : l'élève choisit une expression. Les distracteurs ne
//             sont jamais décoratifs, chacun EST un piège du catalogue — c'est
//             ce qui permet de savoir quelle confusion a joué, et de servir le
//             contre-exemple qui réfute précisément celle-là.
//
//             Type `outil` : la réponse attendue est une stratégie (« on ne
//             peut pas conclure »), pas un calcul. C'est le palier mélangé.
//
// valeur      Ce que vaut l'expression AFFICHÉE, transcrite à part.
// evaluer     Ce que vaut chaque option, transcrite à part.
//
//             Les deux disent la même chose pour la bonne réponse — et c'est
//             exactement l'intérêt : ce sont deux transcriptions indépendantes,
//             et le contrôle vérifie qu'elles coïncident. Un auteur qui écrit
//             « 2(x + 5) » au tableau et coche « 2x + 5 » se fait attraper par
//             la machine, pas par une relecture attentive. C'est la réponse
//             directe à la plainte n°1 du benchmark contre les plateformes
//             existantes : des corrections fausses en production.
//
// indetermination  Pour un énoncé dont la réponse est « on ne peut pas
//             conclure » : deux modèles compatibles avec les données et
//             donnant des résultats différents. C'est le témoin qui PROUVE
//             l'indétermination, au lieu de la supposer.
//
// temoin      La valeur qui sépare CE distracteur de la bonne réponse. Portée
//             par le distracteur et non par l'exercice : un témoin qui
//             discrimine l'un peut coïncider avec l'autre. Jamais −1, 0, 1
//             ni 2 — avec a = 2, le contre-exemple censé réfuter « a² = 2a »
//             la confirmerait.
//
// sansTransformation  La bonne réponse est « on ne peut pas réduire » ou « on
//             ne peut pas conclure ». Le contrôle exige les deux réponses à
//             chaque palier : un lot qui n'en contiendrait que de celles-là
//             apprendrait « réponds toujours rien à faire », motif de surface
//             aussi faux que celui qu'on combat.

export default {
  numero: 1,
  titre: "Une lettre, c'est un nombre qu'on ne connaît pas encore",
  objectif:
    "Vérifier soi-même si un calcul avec des lettres est juste, en remplaçant la lettre par un nombre.",

  // ── Le rituel : le socle, en répétition espacée ────────────────────────────
  rituel: [
    {
      id: 'r-s1', type: 'calcul', piege: 'soustraire-un-negatif',
      enonce: '4 − (−3)', attendu: 7,
    },
    {
      id: 'r-s2', type: 'calcul', piege: 'regle-des-signes-sur-laddition',
      enonce: '−2 + 5', attendu: 3,
    },
    {
      id: 'r-s3', type: 'calcul', piege: 'soustraire-un-negatif',
      enonce: '7 − (−2)', attendu: 9,
    },
    {
      id: 'r-s4', type: 'calcul', piege: 'regle-des-signes-sur-laddition',
      enonce: '−6 + 4', attendu: -2,
    },
  ],

  rappels: [
    {
      id: 'r1',
      titre: "La lettre est un nombre",
      texte:
        "En algèbre, **x** n'est pas un symbole mystérieux : c'est un nombre qu'on ne connaît pas encore.\n\n" +
        "Ça donne un pouvoir énorme : **tu peux toujours vérifier ton calcul en remplaçant la lettre par un nombre.** " +
        "Si les deux écritures ne donnent pas la même chose, c'est que tu t'es trompé.",
      exemples: [
        { phrase: 'a + a = 2a ?', note: 'Avec a = 3 : 3 + 3 = **6**, et 2 × 3 = **6**. Pareil → l\'écriture est juste.' },
        { phrase: 'a × a = 2a ?', note: 'Avec a = 3 : 3 × 3 = **9**, et 2 × 3 = **6**. Différent → l\'écriture est fausse.' },
      ],
    },
  ],

  exercices: [
    // ── Palier 1 : registre numérique, le contrôle est encore disponible ─────
    {
      id: 's01-e1', rappel: 'r1', type: 'qcm', palier: 1, piege: 'linearisation',
      registre: 'numerique', question: 'valeur',
      consigne: 'Que vaut cette puissance ?',
      expression: '3²', valeur: () => 3 * 3,
      options: [
        { texte: '9', correct: true, evaluer: () => 9 },
        { texte: '6', piege: 'linearisation', evaluer: () => 6 },
      ],
    },
    {
      id: 's01-e2', rappel: 'r1', type: 'qcm', palier: 1, piege: 'linearisation',
      registre: 'numerique', question: 'valeur',
      consigne: 'Que vaut cette puissance ?',
      expression: '2³', valeur: () => 2 * 2 * 2,
      options: [
        { texte: '8', correct: true, evaluer: () => 8 },
        { texte: '6', piege: 'linearisation', evaluer: () => 6 },
      ],
    },
    {
      // Équilibre du palier : ici la réponse EST un produit de deux facteurs.
      // Sans cet item, « quand il y a un petit chiffre en haut, ce n'est jamais
      // une multiplication » deviendrait un motif suffisant pour réussir.
      id: 's01-e3', rappel: 'r1', type: 'qcm', palier: 1, piege: 'linearisation',
      registre: 'numerique', question: 'valeur',
      consigne: 'Que vaut ce produit ?',
      expression: '2 × 3', valeur: () => 2 * 3,
      options: [
        { texte: '6', correct: true, evaluer: () => 6 },
        { texte: '8', piege: 'linearisation', evaluer: () => 8 },
      ],
    },

    // ── Palier 2 : littéral simple, annoncé ─────────────────────────────────
    {
      id: 's01-e4', rappel: 'r1', type: 'qcm', palier: 2, piege: 'linearisation',
      question: 'reduire',
      consigne: "Réduis si c'est possible.",
      expression: 'a + a', valeur: (a) => a + a,
      options: [
        { texte: '2a', correct: true, evaluer: (a) => 2 * a },
        { texte: 'a²', piege: 'linearisation', evaluer: (a) => a * a, temoin: 3 },
      ],
    },
    {
      id: 's01-e5', rappel: 'r1', type: 'qcm', palier: 2, piege: 'linearisation',
      question: 'reduire',
      consigne: "Réduis si c'est possible.",
      expression: 'a × a', valeur: (a) => a * a,
      options: [
        { texte: 'a²', correct: true, evaluer: (a) => a * a },
        { texte: '2a', piege: 'linearisation', evaluer: (a) => 2 * a, temoin: 3 },
      ],
    },
    {
      id: 's01-e6', rappel: 'r1', type: 'qcm', palier: 2, piege: 'concatenation',
      question: 'reduire', sansTransformation: true,
      consigne: "Réduis si c'est possible.",
      expression: '3x + 2', valeur: (x) => 3 * x + 2,
      options: [
        { texte: 'On ne peut pas réduire', correct: true, evaluer: (x) => 3 * x + 2 },
        { texte: '5x', piege: 'concatenation', evaluer: (x) => 5 * x, temoin: 3 },
      ],
    },
    {
      // Équilibre : ici on PEUT réduire. Les deux réponses coexistent dans le
      // palier, donc « réponds toujours rien à faire » ne suffit pas.
      id: 's01-e7', rappel: 'r1', type: 'qcm', palier: 2, piege: 'concatenation',
      question: 'reduire',
      consigne: "Réduis si c'est possible.",
      expression: '3x + 5x', valeur: (x) => 3 * x + 5 * x,
      options: [
        { texte: '8x', correct: true, evaluer: (x) => 8 * x },
        { texte: '8x²', piege: 'linearisation', evaluer: (x) => 8 * x * x, temoin: 3 },
      ],
    },
    {
      // NEUTRE apparié en surface : même lettre, même forme que « 3x + 5x »
      // qu'on vient de réduire — seuls les exposants diffèrent. Un motif
      // « deux termes en x → j'additionne les coefficients » échoue ici.
      id: 's01-e8', rappel: 'r1', type: 'qcm', palier: 2, piege: 'concatenation',
      question: 'reduire', neutre: true, sansTransformation: true,
      consigne: "Réduis si c'est possible.",
      expression: '3x² + 5x', valeur: (x) => 3 * x * x + 5 * x,
      options: [
        { texte: 'On ne peut pas réduire', correct: true, evaluer: (x) => 3 * x * x + 5 * x },
        { texte: '8x²', piege: 'concatenation', evaluer: (x) => 8 * x * x, temoin: 3 },
      ],
    },

    // ── Palier 3 : la même règle, avec un signe ou un facteur qui gêne ───────
    {
      id: 's01-e9', rappel: 'r1', type: 'qcm', palier: 3, piege: 'distributivite-incomplete',
      question: 'developper',
      consigne: 'Développe.',
      expression: '2(x + 5)', valeur: (x) => 2 * (x + 5),
      options: [
        { texte: '2x + 10', correct: true, evaluer: (x) => 2 * x + 10 },
        { texte: '2x + 5', piege: 'distributivite-incomplete', evaluer: (x) => 2 * x + 5, temoin: 3 },
      ],
    },
    {
      id: 's01-e10', rappel: 'r1', type: 'qcm', palier: 3, piege: 'moins-devant-la-parenthese',
      question: 'developper',
      consigne: 'Développe.',
      expression: '−(x − 3)', valeur: (x) => -(x - 3),
      options: [
        { texte: '−x + 3', correct: true, evaluer: (x) => -x + 3 },
        { texte: '−x − 3', piege: 'moins-devant-la-parenthese', evaluer: (x) => -x - 3, temoin: 3 },
      ],
    },
    {
      // NEUTRE du palier 3, et le plus retors de la séance : ici la bonne
      // réponse a EXACTEMENT la forme de la mauvaise réponse précédente
      // (« −x − 3 »). Sans cet item, « quand je vois −( ), je mets un + » est
      // un motif de surface qui réussit partout ailleurs — on aurait remplacé
      // une règle fausse par une autre.
      id: 's01-e10b', rappel: 'r1', type: 'qcm', palier: 3, piege: 'moins-devant-la-parenthese',
      question: 'developper', neutre: true,
      consigne: 'Développe.',
      expression: '−(x + 3)', valeur: (x) => -(x + 3),
      options: [
        { texte: '−x − 3', correct: true, evaluer: (x) => -x - 3 },
        { texte: '−x + 3', piege: 'moins-devant-la-parenthese', evaluer: (x) => -x + 3, temoin: 3 },
      ],
    },
    {
      id: 's01-e11', rappel: 'r1', type: 'qcm', palier: 3, piege: 'somme-et-produit-confondus',
      question: 'reduire',
      consigne: "Réduis si c'est possible.",
      expression: '3x × 5x', valeur: (x) => 3 * x * (5 * x),
      options: [
        { texte: '15x²', correct: true, evaluer: (x) => 15 * x * x },
        { texte: '8x', piege: 'somme-et-produit-confondus', evaluer: (x) => 8 * x, temoin: 3 },
      ],
    },
    {
      // Le pendant non réductible du « 3x × 5x » précédent, avec un signe
      // négatif pour l'interférence. Sans lui, la seule question « réduis si
      // c'est possible » du palier était réductible : répondre sans regarder
      // suffisait.
      id: 's01-e11b', rappel: 'r1', type: 'qcm', palier: 3, piege: 'concatenation',
      question: 'reduire', sansTransformation: true,
      consigne: "Réduis si c'est possible.",
      expression: '−2x + 5x²', valeur: (x) => -2 * x + 5 * x * x,
      options: [
        { texte: 'On ne peut pas réduire', correct: true, evaluer: (x) => -2 * x + 5 * x * x },
        { texte: '3x²', piege: 'concatenation', evaluer: (x) => 3 * x * x, temoin: 3 },
      ],
    },
    {
      id: 's01-e12', rappel: 'r1', type: 'qcm', palier: 3, piege: 'moins-devant-la-parenthese',
      question: 'developper',
      consigne: 'Développe.',
      expression: '−2(x − 4)', valeur: (x) => -2 * (x - 4),
      options: [
        { texte: '−2x + 8', correct: true, evaluer: (x) => -2 * x + 8 },
        { texte: '−2x − 8', piege: 'moins-devant-la-parenthese', evaluer: (x) => -2 * x - 8, temoin: 3 },
      ],
    },

    // ── Palier 4 : plus rien n'annonce quoi faire ────────────────────────────
    {
      // Ni consigne « développe », ni « réduis » : c'est la question qui est
      // en jeu. Et l'énoncé ne dit PAS que le triangle est rectangle.
      id: 's01-m1', type: 'outil', palier: 4, piege: 'outil-du-chapitre',
      question: 'outil', sansTransformation: true,
      consigne: 'Lis bien, puis choisis.',
      enonce: 'Dans un triangle ABC, on sait que AB = 6 cm et BC = 8 cm. Combien mesure AC ?',
      // Témoin d'indétermination : deux triangles respectant l'énoncé et
      // donnant des AC différents. Sans lui, « on ne peut pas conclure » serait
      // une affirmation d'auteur ; avec lui, c'est vérifié par la machine.
      indetermination: { cotesConnus: [6, 8], reponsesPossibles: [5, 12] },
      options: [
        {
          texte: "On ne peut pas savoir : rien ne dit que le triangle est rectangle",
          correct: true,
        },
        {
          texte: '10 cm, par le théorème de Pythagore',
          piege: 'outil-du-chapitre',
        },
      ],
    },
    {
      // NEUTRE : ici l'outil s'applique vraiment. Sans cet item, « quand on me
      // parle de triangle, je réponds qu'on ne peut pas savoir » suffirait.
      id: 's01-m2', type: 'outil', palier: 4, piege: 'outil-du-chapitre',
      question: 'outil', neutre: true,
      consigne: 'Lis bien, puis choisis.',
      enonce: 'Dans un triangle ABC rectangle en B, on sait que AB = 6 cm et BC = 8 cm. Combien mesure AC ?',
      // Ici l'outil s'applique : le contrôle vérifie que 6² + 8² fait bien 10².
      pythagore: { cotes: [6, 8], hypotenuse: 10 },
      options: [
        { texte: '10 cm, par le théorème de Pythagore', correct: true },
        {
          texte: "On ne peut pas savoir",
          piege: 'outil-du-chapitre',
        },
      ],
    },
    {
      // Un littéral qui revient sans être annoncé, entre deux questions de
      // géométrie : c'est le mélange qui empêche « c'est le chapitre du jour ».
      id: 's01-m3', type: 'qcm', palier: 4, piege: 'concatenation',
      question: 'reduire', sansTransformation: true,
      consigne: "Réduis si c'est possible.",
      expression: '4a + 3', valeur: (a) => 4 * a + 3,
      options: [
        { texte: 'On ne peut pas réduire', correct: true, evaluer: (a) => 4 * a + 3 },
        { texte: '7a', piege: 'concatenation', evaluer: (a) => 7 * a, temoin: 5 },
      ],
    },
    {
      id: 's01-m4', type: 'qcm', palier: 4, piege: 'linearisation',
      question: 'reduire',
      consigne: "Réduis si c'est possible.",
      expression: 'y × y × y', valeur: (y) => y * y * y,
      options: [
        { texte: 'y³', correct: true, evaluer: (y) => y * y * y },
        { texte: '3y', piege: 'linearisation', evaluer: (y) => 3 * y, temoin: 4 },
      ],
    },
  ],
};
