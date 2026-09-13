// Séance 2 — Le verbe et le pronom.
//
// Le verbe d'abord, parce que c'est le seul mot qui a un test infaillible —
// il change avec le temps — et que ce test sert ensuite à écarter tous les
// noms qui lui ressemblent (« la porte » / « il porte »).
//
// Le pronom ensuite, et c'est le cœur de la séance. Deux difficultés distinctes,
// portées par deux pièges différents :
//   determinant-ou-pronom  « le, la, les, leur » sont tantôt l'un, tantôt
//                          l'autre : c'est le mot qui SUIT qui tranche ;
//   pronom-meconnu         « le mien, personne, chacun, en, y, qui » sont des
//                          pronoms qui n'ont pas l'allure de « il » ou « elle ».
//
// Les items vont par paires : « je leur ai prêté » / « ils ont oublié leur
// ballon », « personne n'a répondu » / « une personne a sonné ». Sans ces
// jumeaux, Evan apprendrait « leur = pronom » au lieu de regarder la phrase.

export default {
  numero: 2,
  bloc: 1,
  titre: 'Le verbe et le pronom',
  sousTitre: 'Celui qui se conjugue, celui qui remplace',
  objectif: 'Reconnaître le verbe, même à l\'infinitif, et le pronom, même quand il ne ressemble pas à « il ».',

  rappels: [
    {
      id: 'r1',
      titre: 'Le verbe',
      texte:
        'Le **verbe** est le seul mot qui **change avec le temps** : mets « hier » ou « demain » devant la phrase, et regarde quel mot bouge.\n\n' +
        'Un verbe à l\'**infinitif** (*partir, finir, prendre*) reste un verbe, même s\'il ne se conjugue pas.\n\n' +
        'Attention aux mots qui existent aussi comme noms : *il porte* (verbe), *la porte* (nom).',
      exemples: [
        {
          phrase: 'Il **veut** **partir** avant la pluie.',
          note: 'Hier, il *voulait* partir : *veut* est le verbe conjugué. *partir* ne bouge pas, mais c\'est aussi un verbe, à l\'infinitif.',
        },
      ],
    },
    {
      id: 'r2',
      titre: 'Le pronom',
      texte:
        'Le **pronom** **remplace un nom** ou un groupe nominal, pour éviter de le répéter.\n\n' +
        'Il n\'y a pas que *je, tu, il* : *le mien, celui-ci, qui, que, dont, personne, rien, chacun, en, y* sont aussi des pronoms.\n\n' +
        '*le, la, les, leur* sont des pronoms quand ils sont **devant un verbe** : *je les vois*. Devant un nom, ce sont des déterminants : *les oiseaux*.',
      exemples: [
        {
          phrase: 'Mes cousins arrivent, je **les** attends.',
          note: '*les* est devant le verbe *attends* et remplace « mes cousins » : c\'est un pronom.',
        },
      ],
    },
  ],

  exercices: [
    // ── Palier 1 : le verbe, conjugué ou non ─────────────────────────────
    {
      id: 's02-e1', rappel: 'r1', type: 'toucher', palier: 1, piege: 'nom-ou-verbe',
      consigne: 'Touche le verbe conjugué.',
      mots: ['Evan', 'range', 'ses', 'affaires.'], attendus: [1],
    },
    {
      id: 's02-e2', rappel: 'r1', type: 'qcm', palier: 1, piege: 'nom-ou-verbe',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'La **porte** du garage est ouverte.',
      choix: ['nom', 'verbe'], attendu: 'nom',
    },
    {
      id: 's02-e3', rappel: 'r1', type: 'qcm', palier: 1, piege: 'nom-ou-verbe',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Il **porte** un sac très lourd.',
      choix: ['nom', 'verbe'], attendu: 'verbe',
    },
    {
      id: 's02-e4', rappel: 'r1', type: 'toucher', palier: 1, piege: 'nom-ou-verbe',
      consigne: 'Touche les deux verbes.',
      mots: ['Nous', 'devons', 'rentrer', 'maintenant.'], attendus: [1, 2],
    },

    // ── Palier 2 : déterminant ou pronom ─────────────────────────────────
    {
      id: 's02-e5', rappel: 'r2', type: 'toucher', palier: 2, piege: 'determinant-ou-pronom',
      consigne: 'Touche les deux pronoms.',
      mots: ['Mes', 'amis', 'arrivent,', 'je', 'les', 'attends.'], attendus: [3, 4],
    },
    {
      id: 's02-e6', rappel: 'r2', type: 'qcm', palier: 2, piege: 'determinant-ou-pronom',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Je **les** retrouve devant le cinéma.',
      choix: ['déterminant', 'pronom'], attendu: 'pronom',
    },
    {
      id: 's02-e7', rappel: 'r2', type: 'qcm', palier: 2, piege: 'determinant-ou-pronom',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'J\'attends **les** élèves devant le collège.',
      choix: ['déterminant', 'pronom'], attendu: 'déterminant',
    },
    {
      id: 's02-e8', rappel: 'r2', type: 'qcm', palier: 2, piege: 'determinant-ou-pronom',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Je **leur** ai prêté mon vélo.',
      choix: ['déterminant', 'pronom'], attendu: 'pronom',
    },
    {
      id: 's02-e9', rappel: 'r2', type: 'qcm', palier: 2, piege: 'determinant-ou-pronom',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Ils ont oublié **leur** ballon.',
      choix: ['déterminant', 'pronom'], attendu: 'déterminant',
    },

    // ── Palier 3 : les pronoms qui n'en ont pas l'air ────────────────────
    {
      id: 's02-e10', rappel: 'r2', type: 'qcm', palier: 3, piege: 'pronom-meconnu',
      consigne: 'Quelle est la classe grammaticale des mots en gras ?',
      phrase: 'Ton vélo est bleu, **le mien** est rouge.',
      choix: ['nom', 'pronom', 'adjectif'], attendu: 'pronom',
    },
    {
      id: 's02-e11', rappel: 'r2', type: 'qcm', palier: 3, piege: 'pronom-meconnu',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: '**Personne** n\'a répondu au téléphone.',
      choix: ['nom', 'pronom'], attendu: 'pronom',
    },
    {
      id: 's02-e12', rappel: 'r2', type: 'qcm', palier: 3, piege: 'pronom-meconnu',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Une **personne** a sonné à la porte.',
      choix: ['nom', 'pronom'], attendu: 'nom',
    },
    {
      id: 's02-e13', rappel: 'r2', type: 'toucher', palier: 3, piege: 'pronom-meconnu',
      consigne: 'Touche les deux pronoms.',
      mots: ['Ce', 'gâteau', 'est', 'bon,', 'nous', 'en', 'reprenons.'], attendus: [4, 5],
    },
    {
      id: 's02-e14', rappel: 'r2', type: 'qcm', palier: 3, piege: 'pronom-meconnu',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Le garçon **qui** chante est mon frère.',
      choix: ['nom', 'pronom', 'déterminant'], attendu: 'pronom',
    },

    // ── Réserve ──────────────────────────────────────────────────────────
    {
      id: 's02-r1', rappel: 'r2', type: 'qcm', palier: 3, piege: 'pronom-meconnu',
      reserve: true,
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: '**Chacun** apporte un dessert.',
      choix: ['déterminant', 'pronom'], attendu: 'pronom',
    },
    {
      id: 's02-r2', rappel: 'r1', type: 'toucher', palier: 1, piege: 'nom-ou-verbe',
      reserve: true,
      consigne: 'Touche le verbe conjugué.',
      mots: ['Le', 'rire', 'de', 'mon', 'frère', 'éclate.'], attendus: [5],
    },
    {
      id: 's02-r3', rappel: 'r2', type: 'qcm', palier: 2, piege: 'determinant-ou-pronom',
      reserve: true,
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: "Ces bonbons ? Je **les** partage avec toi.",
      choix: ['déterminant', 'pronom'], attendu: 'pronom',
    },
    {
      id: 's02-r4', rappel: 'r2', type: 'qcm', palier: 2, piege: 'determinant-ou-pronom',
      reserve: true,
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: "Les voisins promènent **leur** chien.",
      choix: ['déterminant', 'pronom'], attendu: 'déterminant',
    },
    {
      id: 's02-r5', rappel: 'r2', type: 'qcm', palier: 3, piege: 'pronom-meconnu',
      reserve: true,
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: "Ce stylo est à toi, **celui-ci** est à moi.",
      choix: ['nom', 'pronom', 'déterminant'], attendu: 'pronom',
    },
    {
      id: 's02-r6', rappel: 'r2', type: 'qcm', palier: 3, piege: 'pronom-meconnu',
      reserve: true,
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: "**Rien** ne l'arrête.",
      choix: ['nom', 'pronom', 'adverbe'], attendu: 'pronom',
    },
  ],
};
