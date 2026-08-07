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
// Chaque fois que la langue le permet, la phrase-piège affiche l'autre membre
// de la paire ailleurs dans la phrase (« Anto et ___ voisin **sont** dans la
// même équipe ») : le choix reste un vrai choix, et l'élève voit les deux
// graphies coexister — exactement la situation de la dictée. Ce n'est pas
// toujours possible : « ces » et « ses », « leur » et « leurs », « la » et
// « l'a » ne cohabitent pas dans une phrase courte sans la tordre. Ces
// items-là s'appuient donc sur le seul test de remplacement. Et quand le test
// lui-même ne tranche pas, parce que les deux graphies donnent une phrase
// correcte (ces/ses), la consigne pose explicitement la question de sens.

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
        "**là** (→ *ici*), **la** (→ *une* devant un nom, *le* devant un verbe).",
      // Le test de l'imparfait démasque le verbe déguisé. On l'applique aux DEUX
      // mots de la phrase : celui qui accepte l'imparfait, et celui qui le
      // refuse. Voir le test échouer vaut autant que le voir réussir.
      animation: {
        mots: ['Anto', 'a', 'oublié', 'son', 'sac.'],
        scenes: [
          { type: 'dire', texte: 'Certains petits mots sont des verbes déguisés. Un seul test les démasque.' },
          { type: 'terminaison', mot: 1, devient: 'avait',
            texte: 'Mets la phrase à l\'imparfait : « Anto avait oublié son sac ». Ça tient.' },
          { type: 'terminaison', mot: 1, devient: 'a',
            texte: 'Donc c\'est le verbe avoir : « a », sans accent.' },
          // Le contre-exemple se dit : « Anto a oublié » et « Anto pense à »
          // n'ont pas le même ordre des mots. Le rejouer case par case donnait
          // « Anto à pense son sac », qui n'apprend rien à personne.
          { type: 'dire',
            texte: 'Essaie sur l\'autre mot : « Anto pense à son match ». À l\'imparfait, ça donnerait « Anto pense avait son match » — impossible.' },
          { type: 'dire',
            texte: 'Donc c\'est « à », la préposition : celle qui ne se conjugue jamais, et qui garde son accent.' },
        ],
      },
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
      // « leur » est le piège de la paire : invariable devant un verbe, accordé
      // devant un nom. C'est le MOT SUIVANT qui décide, et la flèche le désigne.
      animation: {
        // Les deux emplois dans UNE phrase : transformer « leur parle » en
        // « leurs cahiers » laissait la phrase sans verbe. Ici, le même mot est
        // écrit deux fois à deux places, et c'est le voisin de droite qui tranche.
        mots: ['Il', 'leur', 'parle', 'de', 'leur', 'cahier.'],
        scenes: [
          { type: 'dire', texte: 'Ici, aucun verbe caché. La question est : quel travail fait ce petit mot ?' },
          { type: 'surligner', mots: [1], role: 'ecran', texte: 'Le premier « leur » est devant un verbe.' },
          { type: 'fleche', de: 1, vers: 2, label: 'précède un verbe',
            texte: 'Remplace-le par « lui » : « il lui parle ». Ça tient. Donc invariable, jamais de -s.' },
          { type: 'surligner', mots: [4], role: 'accord',
            texte: 'Le second est devant un nom. Là, c\'est un déterminant.' },
          { type: 'terminaison', mot: 5, devient: 'cahiers.', texte: 'Mets le nom au pluriel…' },
          { type: 'terminaison', mot: 4, devient: 'leurs',
            texte: '…et il s\'accorde : « leurs cahiers ». Même mot, deux places, deux orthographes — c\'est le voisin de droite qui décide.' },
        ],
      },
      exemples: [
        { phrase: 'Le professeur **leur** parle.', note: '« **lui** parle » → ça tient, donc **leur**, sans -s.' },
        { phrase: 'Ils rangent **leurs** cahiers.', note: 'Devant un nom, il s\'accorde → **leurs**.' },
      ],
    },
  ],

  exercices: [
    // ── Palier 1 : les paires où un verbe se cache ───────────────────────
    {
      // Piège : « a » vient d'être écrit deux mots plus tôt, et la main enchaîne.
      // Le verbe est déjà passé — ce qui reste est la préposition.
      id: 's17-e1', rappel: 'r1', type: 'qcm', palier: 1, piege: 'homophone-grammatical',
      consigne: "Mets la phrase à l'imparfait, puis choisis.",
      avant: 'Léa a appris ', apres: ' faire du skate cet été.',
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
      // ces/ses ne se tranche PAS par un test mécanique : les deux donnent une
      // phrase correcte. C'est le sens — à qui sont les cahiers — qui décide. On
      // garde « ses » attendu (la leçon porte sur le possessif) mais on l'explique,
      // sinon l'élève qui lit « ces cahiers » (ceux-là) se croit puni à tort.
      id: 's17-e11', rappel: 'r2', type: 'qcm', palier: 2, piege: 'homophone-grammatical',
      consigne: 'À qui sont les cahiers ? Choisis en pensant au sens.',
      avant: 'Anto a rangé ', apres: ' cahiers dans ces deux tiroirs.',
      choix: ['ces', 'ses'], attendu: 'ses',
      explication:
        "« Ces cahiers » (ceux-là) se dirait aussi : les deux existent en français. " +
        "Mais ici, ce sont les cahiers **d'Anto** — **les siens**. Quand le mot dit " +
        "à qui appartient la chose, c'est le possessif **« ses »**.",
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
    {
      // Désigner plutôt que choisir : les deux graphies sont sous les yeux, et
      // c'est le test « avait » qui tranche, pas la place du mot dans la phrase.
      id: 's17-e15', rappel: 'r1', type: 'toucher', palier: 1, piege: 'homophone-grammatical',
      consigne: 'Touche le mot que tu peux remplacer par « avait ».',
      mots: ['Emma', 'a', 'prêté', 'sa', 'raquette', 'à', 'Tom', 'hier', 'soir.'],
      attendus: [1],
    },
    {
      // Contre-pied de e5 : là c'était « on » qu'il fallait, ici c'est « ont ».
      // Sans ce retour, l'élève retiendrait « après un pluriel, on écrit on ».
      id: 's17-e16', rappel: 'r1', type: 'qcm', palier: 1, piege: 'homophone-grammatical',
      consigne: "Mets la phrase à l'imparfait, puis choisis.",
      avant: 'On part en vacances demain, et mes cousins ', apres: ' déjà fait leurs valises.',
      choix: ['on', 'ont'], attendu: 'ont',
    },
    {
      // NEUTRE : « son sac » s'écrit tout seul, personne n'hésite. La paire est
      // pourtant bien là — et la virgule du début empêche qu'un détail de
      // ponctuation serve d'indice pour repérer les phrases piégeantes.
      id: 's17-e17', rappel: 'r1', type: 'completer', palier: 1, piege: 'homophone-grammatical',
      neutre: true,
      consigne: "Mets la phrase à l'imparfait, puis écris le petit mot qui manque : son ou sont.",
      avant: 'Après le match, Anto range ', apres: ' sac de sport.', attendu: 'son',
    },
    {
      // Les deux graphies coexistent dans la phrase : seul le sens du mot — le
      // lieu — permet de désigner la bonne.
      id: 's17-e18', rappel: 'r2', type: 'toucher', palier: 2, piege: 'homophone-grammatical',
      consigne: 'Deux petits mots se prononcent « ou ». Touche celui qui dit le lieu.',
      mots: ['Le', 'stade', 'où', 'nous', 'jouons', 'est', 'ouvert', 'le', 'mercredi', 'ou', 'le', 'samedi.'],
      attendus: [2],
    },
    {
      // Contre-pied de e11 : cette fois c'est bien « ces » (ceux-là) qu'il faut.
      // Un seul exercice sur cette paire apprendrait « ces/ses → toujours ses ».
      id: 's17-e19', rappel: 'r2', type: 'qcm', palier: 2, piege: 'homophone-grammatical',
      consigne: 'Ceux-là ou les siens ? Choisis en pensant au sens.',
      avant: 'Regarde ', apres: ' nuages : il va pleuvoir avant la fin du match.',
      choix: ['ces', 'ses'], attendu: 'ces',
    },
    {
      // NEUTRE : « ou » entre deux possibilités vient sans effort. Il équilibre
      // e12, où c'était « où » qu'on attendait, et il porte une virgule pour la
      // même raison que e17.
      id: 's17-e20', rappel: 'r2', type: 'qcm', palier: 2, piege: 'homophone-grammatical',
      neutre: true,
      consigne: 'Fais le test de remplacement, puis choisis.',
      avant: 'Le mercredi, Anto va à la piscine ', apres: ' au skatepark.',
      choix: ['ou', 'où'], attendu: 'ou',
    },

    // ── Réserve ──────────────────────────────────────────────────────────
    //
    // `reserve: true` : ces phrases ne sont PAS jouées dans le parcours. Elles
    // restent intactes pour la reprise en début de séance suivante et pour la
    // seconde chance après une erreur — qui exigent l'une comme l'autre une
    // phrase JAMAIS vue portant le même piège. Toutes sont piégeantes : les
    // reprises écartent les items neutres, un neutre en réserve ne servirait à
    // rien.
    {
      id: 's17-r1', rappel: 'r1', type: 'qcm', palier: 1, piege: 'homophone-grammatical',
      reserve: true,
      consigne: "Mets la phrase à l'imparfait, puis choisis.",
      avant: 'Anto a réussi ', apres: ' réparer son vélo tout seul.',
      choix: ['a', 'à'], attendu: 'à',
    },
    {
      id: 's17-r2', rappel: 'r1', type: 'qcm', palier: 1, piege: 'homophone-grammatical',
      reserve: true,
      consigne: "Mets la phrase à l'imparfait, puis choisis.",
      avant: 'Zoé ', apres: ' arrivée première, et tout le monde applaudit.',
      choix: ['et', 'est'], attendu: 'est',
    },
    {
      id: 's17-r3', rappel: 'r1', type: 'toucher', palier: 1, piege: 'homophone-grammatical',
      reserve: true,
      consigne: 'Touche le mot que tu peux remplacer par « il ».',
      mots: ['Quand', 'on', 'arrive', 'à', 'la', 'cantine,', 'les', 'grands', 'ont', 'déjà', 'choisi', 'leur', 'dessert.'],
      attendus: [1],
    },
    {
      id: 's17-r4', rappel: 'r2', type: 'qcm', palier: 2, piege: 'homophone-grammatical',
      reserve: true,
      consigne: 'Fais le test de remplacement, puis choisis.',
      avant: 'Anto ne ', apres: ' rappelle plus ce numéro de téléphone.',
      choix: ['ce', 'se'], attendu: 'se',
    },
    {
      id: 's17-r5', rappel: 'r2', type: 'qcm', palier: 2, piege: 'homophone-grammatical',
      reserve: true,
      consigne: 'Fais le test de remplacement, puis choisis.',
      avant: 'Emma et Sarah ont oublié leurs gants, alors je ', apres: ' prête les miens.',
      choix: ['leur', 'leurs'], attendu: 'leur',
    },
    {
      id: 's17-r6', rappel: 'r2', type: 'completer', palier: 2, piege: 'homophone-grammatical',
      reserve: true,
      consigne: 'Un choix, ou un lieu ? Écris le petit mot qui manque, avec ou sans accent.',
      avant: 'Anto a retrouvé le parc ', apres: ' il jouait quand il était petit.',
      attendu: 'où',
    },
  ],
};
