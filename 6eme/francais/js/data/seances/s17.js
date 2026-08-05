// Séance 17 — Les homophones grammaticaux.
//
// Format : voir s06.js, la séance de référence.
//
// Neuf paires en une seule séance, c'est beaucoup — mais elles se ramènent à
// deux gestes, d'où les deux rappels : mettre la phrase à l'imparfait (r1), ou
// remplacer le petit mot par son équivalent (r2). L'élève n'a pas neuf règles
// à retenir, il a deux tests à déclencher.
//
// NEUTRES. Le piège, ici, ne vient pas du sens de la phrase mais du format :
// dans une séance sur les homophones, l'élève finit par répondre « la forme la
// moins évidente », puisque c'est presque toujours celle-là qu'on lui demande.
// Un item neutre est donc un item où la graphie spontanée est la bonne — « mon
// chat **a** faim », « Anto **et** son frère », « **ce** film », « **leurs**
// affaires » : la paire est bien là, le test reste à faire, mais elle ne piège
// personne. Sans ces items, l'élève apprend à parier contre son intuition au
// lieu d'appliquer le test — et il se trompera partout ailleurs, en dictée,
// là où les deux formes sont également probables.
//
// Chaque phrase-piège, elle, affiche l'autre membre de la paire ailleurs dans
// la phrase (« Anto et ___ voisin **sont** dans la même équipe »). Le choix
// reste un vrai choix, et l'élève voit les deux graphies coexister : c'est
// exactement la situation de la dictée.

export default {
  numero: 17,
  bloc: 4,
  titre: 'Les homophones grammaticaux',
  sousTitre: 'Neuf paires, deux tests',
  objectif: "Trancher entre deux mots qui se prononcent pareil par un test de remplacement, jamais à l'oreille.",

  rappels: [
    {
      id: 'r1',
      titre: 'Le verbe déguisé',
      texte:
        "Certains de ces petits mots sont des **verbes**. Un seul test les démasque : " +
        "**mets la phrase à l'imparfait.**\n\n" +
        "**a** → *avait* · **est** → *était* · **ont** → *avaient* · " +
        "**sont** → *étaient* · **l'a** → *l'avait*\n\n" +
        "Si l'imparfait passe, c'est le verbe. Sinon, c'est l'autre mot — celui qui ne " +
        "change jamais :\n\n" +
        "**à**, **et** (→ *et puis*), **on** (→ *il*), **son** (→ *le sien*), " +
        "**la** / **là** (→ *ici*).",
      exemples: [
        { phrase: 'Anto **a** oublié son sac.', note: '« Anto **avait** oublié » → ça tient, donc **a**.' },
        { phrase: 'Anto pense **à** son match.', note: '« pense **avait** son match » → impossible, donc **à**.' },
      ],
    },
    {
      id: 'r2',
      titre: 'Déterminant ou pronom',
      texte:
        "Ici, aucun verbe caché : il faut voir quel **travail** fait le petit mot. " +
        "Chaque paire a son test.\n\n" +
        "**ce** → *cela* (*ce sera long*), ou devant un nom (*ce film*) · " +
        "**se** ne vit que devant un verbe (*il se lave* → *je me lave*).\n\n" +
        "**ces** → *ceux-là*, on montre · **ses** → *les siens*, on possède · " +
        "**ou** → *ou bien*, c'est un choix · **où** porte l'accent et dit le **lieu**.\n\n" +
        "**leur** devant un verbe se remplace par *lui* : il est **invariable**, jamais de -s. " +
        "Devant un nom, c'est un déterminant et il s'accorde : *leurs cahiers*.",
      exemples: [
        { phrase: 'Le professeur **leur** parle.', note: '« **lui** parle » → ça tient, donc **leur**, sans -s.' },
        { phrase: 'Ils rangent **leurs** cahiers.', note: 'Devant un nom, il s\'accorde → **leurs**.' },
      ],
    },
  ],

  exercices: [
    // ── Palier 1 : les paires où un verbe se cache ───────────────────────
    {
      // Piège : le schéma « nom + a » est si fréquent qu'il s'écrit tout seul.
      id: 's17-e1', rappel: 'r1', type: 'qcm', palier: 1, piege: 'homophone-grammatical',
      consigne: "Mets la phrase à l'imparfait, puis choisis.",
      avant: 'Anto pense ', apres: ' son match de samedi.',
      choix: ['a', 'à'], attendu: 'à',
    },
    {
      // NEUTRE : personne n'est tenté d'écrire « à faim ». La paire est là,
      // le test reste à faire, mais la graphie spontanée est la bonne.
      id: 's17-e2', rappel: 'r1', type: 'qcm', palier: 1, piege: 'homophone-grammatical',
      neutre: true,
      consigne: "Mets la phrase à l'imparfait, puis choisis.",
      avant: 'Mon chat ', apres: ' toujours faim le matin.',
      choix: ['a', 'à'], attendu: 'a',
    },
    {
      // Le « et » visible plus loin rend le choix réel.
      id: 's17-e3', rappel: 'r1', type: 'qcm', palier: 1, piege: 'homophone-grammatical',
      consigne: "Mets la phrase à l'imparfait, puis choisis.",
      avant: 'Le match ', apres: ' fini, et tout le monde rentre.',
      choix: ['et', 'est'], attendu: 'est',
    },
    {
      // NEUTRE : « et » entre deux sujets s'écrit sans hésiter.
      id: 's17-e4', rappel: 'r1', type: 'qcm', palier: 1, piege: 'homophone-grammatical',
      neutre: true,
      consigne: "Mets la phrase à l'imparfait, puis choisis.",
      avant: 'Anto ', apres: ' son frère jouent au foot le mercredi.',
      choix: ['et', 'est'], attendu: 'et',
    },
    {
      // Piège fort : « ont » juste avant, et un sujet pluriel en tête.
      id: 's17-e5', rappel: 'r1', type: 'qcm', palier: 1, piege: 'homophone-grammatical',
      consigne: "Mets la phrase à l'imparfait, puis choisis.",
      avant: 'Mes parents ont un chien, et ', apres: ' le promène tous les soirs.',
      choix: ['on', 'ont'], attendu: 'on',
    },
    {
      // Les deux graphies sont dans la phrase : il faut désigner la bonne.
      id: 's17-e6', rappel: 'r1', type: 'toucher', palier: 1, piege: 'homophone-grammatical',
      consigne: 'Touche le mot que tu peux remplacer par « avaient ».',
      mots: ['Les', 'voisins', 'ont', 'un', 'trampoline', 'et', 'on', 'y', 'saute', 'souvent.'],
      attendus: [2],
    },
    {
      // Piège : « sont » figure dans la phrase, et les deux sujets sont deux.
      id: 's17-e7', rappel: 'r1', type: 'qcm', palier: 1, piege: 'homophone-grammatical',
      consigne: "Mets la phrase à l'imparfait, puis choisis.",
      avant: 'Anto et ', apres: ' voisin sont dans la même équipe.',
      choix: ['son', 'sont'], attendu: 'son',
    },
    {
      id: 's17-e8', rappel: 'r1', type: 'qcm', palier: 1, piege: 'homophone-grammatical',
      consigne: "Mets la phrase à l'imparfait, puis choisis.",
      avant: 'Anto cherche sa raquette : il ', apres: ' oubliée au gymnase.',
      choix: ['la', "l'a", 'là'], attendu: "l'a",
    },

    // ── Palier 2 : déterminant contre pronom ─────────────────────────────
    {
      // « Ce » ouvre la phrase : l'écho pousse à le réécrire devant le verbe.
      id: 's17-e9', rappel: 'r2', type: 'qcm', palier: 2, piege: 'homophone-grammatical',
      consigne: 'Fais le test de remplacement, puis choisis.',
      avant: 'Ce matin, Anto ', apres: " lève plus tard que d'habitude.",
      choix: ['ce', 'se'], attendu: 'se',
    },
    {
      // NEUTRE : devant un nom, « ce » vient tout seul.
      id: 's17-e10', rappel: 'r2', type: 'qcm', palier: 2, piege: 'homophone-grammatical',
      neutre: true,
      consigne: 'Fais le test de remplacement, puis choisis.',
      avant: "Je n'ai pas du tout aimé ", apres: ' film.',
      choix: ['ce', 'se'], attendu: 'ce',
    },
    {
      // « ces » apparaît plus loin dans la phrase : les deux se disputent.
      id: 's17-e11', rappel: 'r2', type: 'qcm', palier: 2, piege: 'homophone-grammatical',
      consigne: 'Fais le test de remplacement, puis choisis.',
      avant: 'Anto a rangé ', apres: ' cahiers dans ces deux tiroirs.',
      choix: ['ces', 'ses'], attendu: 'ses',
    },
    {
      // « ou » figure dans la phrase, à trois mots de la réponse.
      id: 's17-e12', rappel: 'r2', type: 'qcm', palier: 2, piege: 'homophone-grammatical',
      consigne: 'Fais le test de remplacement, puis choisis.',
      avant: 'Dis-moi ', apres: ' tu veux aller : au parc ou à la piscine ?',
      choix: ['ou', 'où'], attendu: 'où',
    },
    {
      // Piège central de la paire : « les copies » est au pluriel, et pourtant
      // « leur » devant un verbe ne prend jamais de -s.
      id: 's17-e13', rappel: 'r2', type: 'qcm', palier: 2, piege: 'homophone-grammatical',
      consigne: 'Fais le test de remplacement, puis choisis.',
      avant: 'Le professeur ', apres: ' a rendu les copies corrigées.',
      choix: ['leur', 'leurs'], attendu: 'leur',
    },
    {
      // NEUTRE : devant un nom pluriel, « leurs » s'écrit sans effort. Sans cet
      // item, l'élève retiendrait « leur ne prend jamais de -s ».
      id: 's17-e14', rappel: 'r2', type: 'qcm', palier: 2, piege: 'homophone-grammatical',
      neutre: true,
      consigne: 'Fais le test de remplacement, puis choisis.',
      avant: 'Les élèves rangent ', apres: ' affaires dans le casier.',
      choix: ['leur', 'leurs'], attendu: 'leurs',
    },
  ],
};
