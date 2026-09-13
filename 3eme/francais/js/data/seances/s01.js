// Séance 1 — Le nom, le déterminant et l'adjectif.
//
// Première des quatre séances sur les classes grammaticales, la leçon qu'Evan
// révise pour le test en classe. On commence par les mots du groupe nominal :
// ce sont ceux qu'on reconnaît le plus facilement, et ceux qui servent de
// repère pour tous les autres (le pronom remplace un nom, l'adjectif précise
// un nom, le déterminant annonce un nom).
//
// Deux gestes, conformes à la consigne de la professeure — « identifier la
// classe grammaticale des mots dans une phrase » :
//   toucher  désigner le mot d'une classe donnée dans la phrase ;
//   qcm      nommer la classe du mot en gras.
//
// Dès cette séance, les paires de mots qui changent de classe sont posées côte
// à côte (« la course » / « ils courent », « un homme fort » / « ils parlent
// fort ») : c'est la seule façon d'empêcher Evan de classer un mot d'après son
// sens au lieu de ce qu'il fait dans la phrase.

export default {
  numero: 1,
  bloc: 1,
  titre: 'Le nom, le déterminant et l\'adjectif',
  sousTitre: 'Les mots du groupe nominal',
  objectif: 'Reconnaître le nom, le déterminant et l\'adjectif dans une phrase, même quand ils ressemblent à autre chose.',

  rappels: [
    {
      id: 'r1',
      titre: 'Le nom et le déterminant',
      texte:
        'Le **nom** désigne une personne, un animal, une chose ou une idée : *Evan, chien, table, courage*.\n\n' +
        'Le **déterminant** se place **devant le nom** et l\'annonce : *le, un, des, mon, ce, trois, chaque…*\n\n' +
        'Le test du nom : peut-on mettre un déterminant devant ? *la course, le rire, un dîner* sont des noms, même s\'ils parlent d\'une action.',
      exemples: [
        {
          phrase: '**Mon** **frère** a gagné **la** **course**.',
          note: '*frère* et *course* sont des noms, annoncés par les déterminants *mon* et *la*. *course* dit une action, mais c\'est bien un nom.',
        },
      ],
    },
    {
      id: 'r2',
      titre: 'L\'adjectif',
      texte:
        'L\'**adjectif** précise un nom : il dit comment il est. Il **s\'accorde** avec lui : *un chat noir, des chattes noires*.\n\n' +
        'Il n\'est pas toujours collé au nom : dans *le ciel est bleu*, *bleu* est séparé du nom par le verbe.\n\n' +
        'Le test : mets le nom au pluriel ou au féminin. Si le mot change avec lui, c\'est un adjectif. S\'il ne bouge pas et précise un verbe, c\'est un **adverbe** (séance 3).',
      exemples: [
        {
          phrase: 'Un homme **fort** porte la caisse. / Ils parlent **fort**.',
          note: 'Des hommes *forts* : le mot change, adjectif. Elles parlent *fort* : il ne bouge pas, adverbe.',
        },
      ],
    },
  ],

  exercices: [
    // ── Palier 1 : le nom et le déterminant ──────────────────────────────
    {
      id: 's01-e1', rappel: 'r1', type: 'toucher', palier: 1, piege: 'nom-ou-verbe',
      consigne: 'Touche le nom.',
      mots: ['Le', 'chien', 'aboie.'], attendus: [1],
    },
    {
      id: 's01-e2', rappel: 'r1', type: 'toucher', palier: 1, piege: 'determinant-ou-pronom',
      consigne: 'Touche les deux déterminants.',
      mots: ['Mon', 'frère', 'lit', 'un', 'roman.'], attendus: [0, 3],
    },
    {
      id: 's01-e3', rappel: 'r1', type: 'qcm', palier: 1, piege: 'nom-ou-verbe',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'La **course** a duré une heure.',
      choix: ['nom', 'verbe', 'adjectif'], attendu: 'nom',
    },
    {
      id: 's01-e4', rappel: 'r1', type: 'qcm', palier: 1, piege: 'nom-ou-verbe',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Les enfants **courent** dans la cour.',
      choix: ['nom', 'verbe', 'adjectif'], attendu: 'verbe',
    },
    {
      id: 's01-e5', rappel: 'r1', type: 'toucher', palier: 1, piege: 'nom-ou-verbe',
      consigne: 'Touche les deux noms.',
      mots: ['Son', 'rire', 'résonne', 'dans', 'la', 'maison.'], attendus: [1, 5],
    },

    // ── Palier 2 : l'adjectif, collé ou non au nom ───────────────────────
    {
      id: 's01-e6', rappel: 'r2', type: 'toucher', palier: 2, piege: 'adjectif-ou-adverbe',
      consigne: 'Touche l\'adjectif.',
      mots: ['Un', 'vent', 'froid', 'souffle.'], attendus: [2],
    },
    {
      id: 's01-e7', rappel: 'r2', type: 'toucher', palier: 2, piege: 'adjectif-ou-adverbe',
      consigne: 'Touche l\'adjectif.',
      mots: ['Le', 'ciel', 'reste', 'gris.'], attendus: [3],
    },
    {
      id: 's01-e8', rappel: 'r2', type: 'qcm', palier: 2, piege: 'adjectif-ou-adverbe',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Un homme **fort** porte la caisse.',
      choix: ['adjectif', 'adverbe', 'nom'], attendu: 'adjectif',
    },
    {
      id: 's01-e9', rappel: 'r2', type: 'qcm', palier: 2, piege: 'adjectif-ou-adverbe',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Le vent souffle **fort** cette nuit.',
      choix: ['adjectif', 'adverbe', 'nom'], attendu: 'adverbe',
    },
    {
      id: 's01-e10', rappel: 'r2', type: 'toucher', palier: 2, piege: 'adjectif-ou-adverbe',
      consigne: 'Touche les deux adjectifs.',
      mots: ['Une', 'petite', 'maison', 'blanche', 'apparaît.'], attendus: [1, 3],
    },

    // ── Palier 3 : les mots qui changent de classe ───────────────────────
    {
      id: 's01-e11', rappel: 'r1', type: 'qcm', palier: 3, piege: 'nom-ou-verbe',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Nous avons préparé le **dîner** ensemble.',
      choix: ['nom', 'verbe'], attendu: 'nom',
    },
    {
      id: 's01-e12', rappel: 'r1', type: 'qcm', palier: 3, piege: 'nom-ou-verbe',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Il faut **dîner** tôt ce soir.',
      choix: ['nom', 'verbe'], attendu: 'verbe',
    },
    {
      id: 's01-e13', rappel: 'r1', type: 'toucher', palier: 3, piege: 'nom-ou-verbe',
      consigne: 'Touche le nom.',
      mots: ['Cette', 'marche', 'est', 'raide.'], attendus: [1],
    },
    {
      id: 's01-e14', rappel: 'r2', type: 'qcm', palier: 3, piege: 'adjectif-ou-adverbe',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Elle porte une robe **légère**.',
      choix: ['adjectif', 'adverbe', 'nom'], attendu: 'adjectif',
    },

    // ── Réserve : jamais jouée d'office, gardée pour la remédiation ──────
    {
      id: 's01-r1', rappel: 'r1', type: 'toucher', palier: 1, piege: 'determinant-ou-pronom',
      reserve: true,
      consigne: 'Touche les deux déterminants.',
      mots: ['Chaque', 'élève', 'range', 'son', 'casier.'], attendus: [0, 3],
    },
    {
      id: 's01-r2', rappel: 'r2', type: 'qcm', palier: 3, piege: 'adjectif-ou-adverbe',
      reserve: true,
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Ces fleurs sentent **bon**.',
      choix: ['adjectif', 'adverbe'], attendu: 'adverbe',
    },
    {
      id: 's01-r3', rappel: 'r2', type: 'qcm', palier: 3, piege: 'adjectif-ou-adverbe',
      reserve: true,
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: "Le soleil tape **fort** aujourd'hui.",
      choix: ['adjectif', 'adverbe'], attendu: 'adverbe',
    },
    {
      id: 's01-r4', rappel: 'r2', type: 'qcm', palier: 2, piege: 'adjectif-ou-adverbe',
      reserve: true,
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: "Elle a une voix très **douce**.",
      choix: ['adjectif', 'adverbe'], attendu: 'adjectif',
    },
    {
      id: 's01-r5', rappel: 'r1', type: 'qcm', palier: 3, piege: 'nom-ou-verbe',
      reserve: true,
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: "Le **rire** de ma sœur est contagieux.",
      choix: ['nom', 'verbe'], attendu: 'nom',
    },
    {
      id: 's01-r6', rappel: 'r1', type: 'toucher', palier: 2, piege: 'determinant-ou-pronom',
      reserve: true,
      consigne: "Touche les deux déterminants.",
      mots: ['Ces', 'enfants', 'adorent', 'leur', 'professeur.'], attendus: [0, 3],
    },
    {
      id: 's01-r7', rappel: 'r1', type: 'toucher', palier: 1, piege: 'determinant-ou-pronom',
      reserve: true,
      consigne: "Touche le déterminant.",
      mots: ['Trois', 'oiseaux', 'chantent.'], attendus: [0],
    },
    {
      id: 's01-r8', rappel: 'r1', type: 'qcm', palier: 2, piege: 'nom-ou-verbe',
      reserve: true,
      consigne: "Quelle est la classe grammaticale du mot en gras ?",
      phrase: "Ferme la **porte** en sortant.",
      choix: ['nom', 'verbe'], attendu: 'nom',
    },
    {
      id: 's01-r9', rappel: 'r1', type: 'toucher', palier: 1, piege: 'nom-ou-verbe',
      reserve: true,
      consigne: "Touche le nom.",
      mots: ['Ce', 'repas', 'était', 'délicieux.'], attendus: [1],
    },
  ],
};
