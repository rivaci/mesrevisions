// Séance 4 — Le même mot, plusieurs classes.
//
// La séance-bilan avant le test en classe. Plus de nouvelle classe : les neuf
// sont connues. Ce qui reste, c'est ce qui fait perdre les points au contrôle —
// les mots dont la classe change avec la phrase.
//
// Le deuxième rappel donne une méthode en quatre tests, dans l'ordre où Evan
// peut les faire sur sa copie : conjuguer, mettre au pluriel, remplacer, et
// sinon c'est un invariable. C'est la version « outil » des définitions que la
// professeure demande d'apprendre.
//
// Les pronoms relatifs et les conjonctions de subordination se rencontrent ici
// pour la première fois côte à côte, à travers « que » : c'est la paire la plus
// classique des interrogations de 3e.

export default {
  numero: 4,
  bloc: 1,
  titre: 'Le même mot, plusieurs classes',
  sousTitre: 'Le bilan avant le test',
  objectif: 'Identifier la classe d\'un mot d\'après son rôle dans la phrase, même quand ce mot peut appartenir à plusieurs classes.',

  rappels: [
    {
      id: 'r1',
      titre: 'La classe dépend de la phrase',
      texte:
        'Un même mot peut changer de classe selon son rôle. On ne classe donc **jamais un mot seul**, toujours **un mot dans sa phrase**.\n\n' +
        '*le* : déterminant devant un nom (*le chat*), pronom devant un verbe (*je le vois*).\n\n' +
        '*que* : **pronom relatif** s\'il reprend le nom juste avant lui (*le livre que je lis*), **conjonction de subordination** sinon (*je crois que tu as raison*).',
      exemples: [
        {
          phrase: 'Le film **que** j\'ai vu dit **que** tout est possible.',
          note: 'Le premier *que* reprend « le film » (j\'ai vu le film) : pronom relatif. Le second ne remplace rien : conjonction.',
        },
      ],
    },
    {
      id: 'r2',
      titre: 'Les quatre tests du contrôle',
      texte:
        '**Test 1.** Mets « hier » devant la phrase : le mot change ? C\'est un **verbe**.\n\n' +
        '**Test 2.** Mets le nom au pluriel : le mot change avec lui ? **Adjectif** ou **déterminant**.\n\n' +
        '**Test 3.** Le mot remplace un nom ? C\'est un **pronom**.\n\n' +
        '**Test 4.** Rien ne bouge ? Mot invariable : **adverbe**, **préposition**, **conjonction** ou **interjection**.',
    },
  ],

  exercices: [
    // ── Palier 1 : « le » et « que » ─────────────────────────────────────
    {
      id: 's04-e1', rappel: 'r1', type: 'qcm', palier: 1, piege: 'determinant-ou-pronom',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Je **le** connais depuis longtemps.',
      choix: ['déterminant', 'pronom', 'adverbe'], attendu: 'pronom',
    },
    {
      id: 's04-e2', rappel: 'r1', type: 'qcm', palier: 1, piege: 'determinant-ou-pronom',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Passe-moi **le** sel, s\'il te plaît.',
      choix: ['déterminant', 'pronom', 'adverbe'], attendu: 'déterminant',
    },
    {
      id: 's04-e3', rappel: 'r1', type: 'qcm', palier: 1, piege: 'que-relatif-ou-conjonction',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'C\'est la ville **que** je préfère.',
      choix: ['pronom relatif', 'conjonction de subordination'], attendu: 'pronom relatif',
    },
    {
      id: 's04-e4', rappel: 'r1', type: 'qcm', palier: 1, piege: 'que-relatif-ou-conjonction',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Je crois **que** tu as raison.',
      choix: ['pronom relatif', 'conjonction de subordination'], attendu: 'conjonction de subordination',
    },

    // ── Palier 2 : les paires trompeuses ─────────────────────────────────
    {
      // Un nom juste avant « que », et pourtant « que » ne le reprend pas :
      // l'item qui empêche la fausse règle « nom avant → pronom relatif ».
      id: 's04-e5', rappel: 'r1', type: 'qcm', palier: 2, piege: 'que-relatif-ou-conjonction',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Il explique à sa sœur **que** le film commence.',
      choix: ['pronom relatif', 'conjonction de subordination'], attendu: 'conjonction de subordination',
    },
    {
      id: 's04-e6', rappel: 'r2', type: 'toucher', palier: 2, piege: 'adjectif-ou-adverbe',
      consigne: 'Touche l\'adverbe.',
      mots: ['Ce', 'parfum', 'sent', 'bon.'], attendus: [3],
    },
    {
      id: 's04-e7', rappel: 'r2', type: 'qcm', palier: 2, piege: 'adjectif-ou-adverbe',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Ce gâteau est vraiment **bon**.',
      choix: ['adjectif', 'adverbe'], attendu: 'adjectif',
    },
    {
      id: 's04-e8', rappel: 'r2', type: 'qcm', palier: 2, piege: 'nom-ou-verbe',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Nous ferons une longue **marche** en forêt.',
      choix: ['nom', 'verbe', 'adjectif'], attendu: 'nom',
    },

    // ── Palier 3 : comme au contrôle, toute la phrase ────────────────────
    {
      id: 's04-e9', rappel: 'r1', type: 'toucher', palier: 3, piege: 'pronom-meconnu',
      consigne: 'Touche les deux pronoms.',
      mots: ['Le', 'chat', 'que', 'tu', 'vois', 'dort.'], attendus: [2, 3],
    },
    {
      id: 's04-e10', rappel: 'r1', type: 'toucher', palier: 3, piege: 'que-relatif-ou-conjonction',
      consigne: 'Touche la conjonction de subordination.',
      mots: ['Je', 'sais', 'que', 'tu', 'viendras.'], attendus: [2],
    },
    {
      id: 's04-e11', rappel: 'r2', type: 'toucher', palier: 3, piege: 'preposition-ou-conjonction',
      consigne: 'Touche la préposition.',
      mots: ['Il', 'est', 'parti', 'sans', 'bruit.'], attendus: [3],
    },
    {
      id: 's04-e12', rappel: 'r2', type: 'qcm', palier: 3,
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: '**Oh** ! Quelle belle surprise !',
      choix: ['interjection', 'adverbe', 'déterminant'], attendu: 'interjection',
    },
    {
      id: 's04-e13', rappel: 'r1', type: 'qcm', palier: 3, piege: 'determinant-ou-pronom',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Hier, ils **leur** ont offert un livre.',
      choix: ['déterminant', 'pronom'], attendu: 'pronom',
    },
    {
      id: 's04-e14', rappel: 'r1', type: 'qcm', palier: 3, piege: 'determinant-ou-pronom',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Ils ont enfin retrouvé **leurs** clés.',
      choix: ['déterminant', 'pronom'], attendu: 'déterminant',
    },

    // ── Réserve ──────────────────────────────────────────────────────────
    {
      id: 's04-r1', rappel: 'r2', type: 'qcm', palier: 2, piege: 'nom-ou-verbe',
      reserve: true,
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Il **marche** en regardant ses pieds.',
      choix: ['nom', 'verbe'], attendu: 'verbe',
    },
    {
      id: 's04-r2', rappel: 'r1', type: 'qcm', palier: 3, piege: 'que-relatif-ou-conjonction',
      reserve: true,
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Les enfants **que** j\'ai vus jouaient au ballon.',
      choix: ['pronom relatif', 'conjonction de subordination'], attendu: 'pronom relatif',
    },
    {
      id: 's04-r3', rappel: 'r1', type: 'qcm', palier: 3, piege: 'que-relatif-ou-conjonction',
      reserve: true,
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: "Elle espère **que** le train sera à l'heure.",
      choix: ['pronom relatif', 'conjonction de subordination'], attendu: 'conjonction de subordination',
    },
    {
      id: 's04-r4', rappel: 'r1', type: 'qcm', palier: 3, piege: 'que-relatif-ou-conjonction',
      reserve: true,
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: "La chanson **que** tu écoutes me plaît.",
      choix: ['pronom relatif', 'conjonction de subordination'], attendu: 'pronom relatif',
    },
  ],
};
