// Séance 9 — Sujets multiples et sujets collectifs.
//
// Format : voir s06.js, la séance de référence.
//
// Deux pièges se répondent ici, et c'est voulu : « et » pousse vers le pluriel,
// « un groupe de » pousse vers le pluriel lui aussi — mais l'un a raison et
// l'autre a tort. Les items neutres de chaque palier empêchent l'élève de
// retenir un motif visuel (« un mot pluriel avant le verbe ») au lieu de la
// question « qui est-ce qui… ? ».

export default {
  numero: 9,
  bloc: 2,
  titre: 'Sujets multiples et sujets collectifs',
  sousTitre: "Compter les sujets avant d'accorder",
  objectif:
    "Accorder le verbe quand deux sujets font l'action ensemble, et quand un seul mot désigne un groupe entier.",

  rappels: [
    {
      id: 'r1',
      titre: 'Deux sujets valent un pluriel',
      texte:
        "Quand deux sujets sont reliés par **et**, ils font l'action ensemble : " +
        "le verbe se met au **pluriel**, même si chacun est au singulier.\n\n" +
        "Le test : remplace les deux sujets par **« ils »** ou **« elles »**. " +
        "« Le chat et le chien » → **ils**.\n\n" +
        "Attention : « et » ne relie pas toujours des sujets. Dans " +
        "*Théo range ses livres et ses cahiers*, il relie deux compléments — " +
        "le sujet reste *Théo*, tout seul.",
      exemples: [
        { phrase: 'Le chat et le chien **dorment**.', note: 'Qui est-ce qui dort ? Le chat et le chien → **ils**.' },
        { phrase: 'Théo **range** ses livres et ses cahiers.', note: "Ici « et » relie les compléments. Le sujet, c'est Théo — un seul." },
      ],
    },
    {
      id: 'r2',
      titre: "Un groupe, c'est un seul",
      texte:
        "**Un groupe d'élèves attend.** Un seul mot commande : *groupe*. " +
        "« d'élèves » ne fait que le compléter.\n\n" +
        "Une équipe, une foule, un troupeau, une bande : ces mots désignent " +
        "plusieurs êtres mais restent **singuliers**. C'est le nom principal — " +
        "celui qui porte le déterminant — qui décide.\n\n" +
        "Et si le nom principal est lui-même au pluriel (*les élèves de la classe*), " +
        "le verbe se met au pluriel. Ce n'est jamais la distance qui compte, " +
        "toujours le nom principal.",
      exemples: [
        { phrase: "Un groupe d'élèves **attend** devant la porte.", note: 'Qui est-ce qui attend ? **Le groupe** — un seul.' },
        { phrase: 'Les élèves de la classe **attendent** devant la porte.', note: 'Ici le nom principal est *les élèves* : plusieurs.' },
      ],
    },
  ],

  exercices: [
    // ── Palier 1 : deux sujets reliés par « et » ─────────────────────────
    {
      id: 's09-e1', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujets-coordonnes',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Léo et Sarah ', verbe: 'préparer', apres: ' leur exposé.', attendu: 'préparent',
    },
    {
      id: 's09-e2', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujets-coordonnes',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Mon chien et mon chat ', verbe: 'dormir', apres: ' sur le canapé.', attendu: 'dorment',
    },
    {
      // Deux mots attendus : 0 Le, 1 gardien, 2 et, 3 l'arbitre, 4 entrent,
      // 5 sur, 6 le, 7 terrain. → les sujets sont en 1 et 3.
      id: 's09-e3', rappel: 'r1', type: 'toucher', palier: 1, piege: 'sujets-coordonnes',
      consigne: 'Touche les deux sujets du verbe.',
      mots: ['Le', 'gardien', 'et', "l'arbitre", 'entrent', 'sur', 'le', 'terrain.'], attendus: [1, 3],
    },
    {
      // NEUTRE : « et » est bien là, mais il relie deux compléments. Sans cet
      // item, l'élève apprendrait « je vois "et" → je mets le pluriel ».
      id: 's09-e4', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujets-coordonnes',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Mon frère ', verbe: 'ranger', apres: ' ses livres et ses cahiers.', attendu: 'range',
    },
    {
      // NEUTRE : 0 Théo, 1 collectionne, 2 les, 3 cartes, 4 et, 5 les,
      // 6 autocollants. → un seul sujet, en 0.
      id: 's09-e5', rappel: 'r1', type: 'toucher', palier: 1, piege: 'sujets-coordonnes',
      neutre: true,
      consigne: 'Touche le sujet du verbe.',
      mots: ['Théo', 'collectionne', 'les', 'cartes', 'et', 'les', 'autocollants.'], attendus: [0],
    },

    // ── Palier 2 : le sujet collectif ────────────────────────────────────
    {
      id: 's09-e6', rappel: 'r2', type: 'completer', palier: 2, piege: 'sujet-collectif',
      consigne: 'Conjugue le verbe au présent.',
      avant: "Un groupe d'élèves ", verbe: 'attendre', apres: ' devant la porte.', attendu: 'attend',
    },
    {
      // 0 Une, 1 équipe, 2 de, 3 joueurs, 4 arrive, 5 au, 6 stade. → sujet en 1.
      id: 's09-e7', rappel: 'r2', type: 'toucher', palier: 2, piege: 'sujet-collectif',
      consigne: 'Touche le sujet du verbe.',
      mots: ['Une', 'équipe', 'de', 'joueurs', 'arrive', 'au', 'stade.'], attendus: [1],
    },
    {
      id: 's09-e8', rappel: 'r2', type: 'completer', palier: 2, piege: 'sujet-collectif',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'La foule de supporters ', verbe: 'crier', apres: ' très fort.', attendu: 'crie',
    },
    {
      // NEUTRE : le nom principal est au pluriel, donc le verbe l'est aussi.
      // Sans cet item, l'élève retiendrait « nom pluriel avant le verbe →
      // singulier », exactement la fausse règle qu'on veut éviter.
      id: 's09-e9', rappel: 'r2', type: 'completer', palier: 2, piege: 'sujet-collectif',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Les joueurs de mon équipe ', verbe: 'gagner', apres: ' souvent.', attendu: 'gagnent',
    },
    {
      // NEUTRE
      id: 's09-e10', rappel: 'r2', type: 'completer', palier: 2, piege: 'sujet-collectif',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Les élèves de la classe ', verbe: 'sortir', apres: ' en récréation.', attendu: 'sortent',
    },

    // ── Palier 3 : le sujet est loin du verbe ────────────────────────────
    {
      id: 's09-e11', rappel: 'r1', type: 'completer', palier: 3, piege: 'sujets-coordonnes',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Le chien et le chat de ma voisine ', verbe: 'jouer', apres: ' dans le jardin.', attendu: 'jouent',
    },
    {
      id: 's09-e12', rappel: 'r2', type: 'completer', palier: 3, piege: 'sujet-collectif',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Le troupeau de vaches ', verbe: 'traverser', apres: ' la route.', attendu: 'traverse',
    },
    {
      // NEUTRE : sujet éloigné, mais pluriel. La distance ne décide de rien.
      id: 's09-e13', rappel: 'r2', type: 'completer', palier: 3, piege: 'sujet-collectif',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Les cahiers de mon frère ', verbe: 'rester', apres: ' sur la table.', attendu: 'restent',
    },
    {
      // NEUTRE : sujet éloigné et « et » présent, mais il relie les compléments.
      id: 's09-e14', rappel: 'r1', type: 'completer', palier: 3, piege: 'sujets-coordonnes',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: "Le capitaine de l'équipe ", verbe: 'choisir', apres: ' les maillots et les ballons.', attendu: 'choisit',
    },
    {
      id: 's09-e15', rappel: 'r1', type: 'qcm', palier: 1, piege: 'sujets-coordonnes',
      consigne: 'Compte les sujets, puis choisis la bonne forme.',
      avant: 'Anto et Hugo ', apres: ' au tennis le mercredi.',
      choix: ['joue', 'jouent'], attendu: 'jouent',
    },
    {
      // NEUTRE : deux noms reliés par « et », mais ce sont des compléments. Le
      // sujet est seul devant le verbe — « et » ne décide de rien tout seul.
      id: 's09-e16', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujets-coordonnes',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Emma ', verbe: 'nourrir', apres: ' son chat et son lapin.', attendu: 'nourrit',
    },
    {
      id: 's09-e17', rappel: 'r2', type: 'qcm', palier: 2, piege: 'sujet-collectif',
      consigne: 'Cherche le nom principal, puis choisis la bonne forme.',
      avant: 'La bande de copains ', apres: ' devant le collège.',
      choix: ['attend', 'attendent'], attendu: 'attend',
    },
    {
      // NEUTRE : le nom principal est au pluriel. Le piège tire dans l'autre
      // sens, sinon « un nom pluriel avant le verbe → singulier » s'installerait.
      // 0 Les, 1 joueuses, 2 de, 3 mon, 4 club, 5 gagnent… → sujet en 1.
      id: 's09-e18', rappel: 'r2', type: 'toucher', palier: 2, piege: 'sujet-collectif',
      neutre: true,
      consigne: 'Touche le sujet du verbe.',
      mots: ['Les', 'joueuses', 'de', 'mon', 'club', 'gagnent', 'le', 'match.'], attendus: [1],
    },
    {
      // 0 Le, 1 frère, 2 et, 3 la, 4 sœur, 5 de, 6 Zoé, 7 partent…
      // → les deux sujets sont en 1 et 4, malgré le complément qui les éloigne.
      id: 's09-e19', rappel: 'r1', type: 'toucher', palier: 3, piege: 'sujets-coordonnes',
      consigne: 'Touche les deux sujets du verbe.',
      mots: ['Le', 'frère', 'et', 'la', 'sœur', 'de', 'Zoé', 'partent', 'en', 'vacances.'],
      attendus: [1, 4],
    },
    {
      id: 's09-e20', rappel: 'r2', type: 'completer', palier: 3, piege: 'sujet-collectif',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Le groupe de musiciens de mon collège ', verbe: 'répéter', apres: ' tous les jeudis.',
      attendu: 'répète',
    },

    // ── Réserve ──────────────────────────────────────────────────────────
    //
    // `reserve: true` : jamais jouées dans le parcours. Elles sont gardées pour
    // la reprise en début de séance suivante et pour la seconde chance après
    // une erreur, qui réclament l'une comme l'autre une phrase JAMAIS VUE
    // portant le même piège. Toutes sont piégeantes : les reprises écartent les
    // items neutres, un neutre en réserve ne servirait jamais.
    {
      id: 's09-r1', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujets-coordonnes',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Noé et Tom ', verbe: 'ranger', apres: ' le matériel après le match.', attendu: 'rangent',
    },
    {
      id: 's09-r2', rappel: 'r1', type: 'qcm', palier: 1, piege: 'sujets-coordonnes',
      reserve: true,
      consigne: 'Compte les sujets, puis choisis la bonne forme.',
      avant: 'Ma sœur et mon cousin ', apres: ' le bus tous les matins.',
      choix: ['prend', 'prennent'], attendu: 'prennent',
    },
    {
      // 0 Zoé, 1 et, 2 Sarah, 3 préparent, 4 un, 5 gâteau. → sujets en 0 et 2.
      id: 's09-r3', rappel: 'r1', type: 'toucher', palier: 1, piege: 'sujets-coordonnes',
      reserve: true,
      consigne: 'Touche les deux sujets du verbe.',
      mots: ['Zoé', 'et', 'Sarah', 'préparent', 'un', 'gâteau.'], attendus: [0, 2],
    },
    {
      id: 's09-r4', rappel: 'r1', type: 'completer', palier: 3, piege: 'sujets-coordonnes',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Le professeur et le surveillant du collège ', verbe: 'discuter', apres: ' dans la cour.',
      attendu: 'discutent',
    },
    {
      id: 's09-r5', rappel: 'r2', type: 'completer', palier: 2, piege: 'sujet-collectif',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Un troupeau de moutons ', verbe: 'brouter', apres: ' dans le pré.', attendu: 'broute',
    },
    {
      id: 's09-r6', rappel: 'r2', type: 'qcm', palier: 2, piege: 'sujet-collectif',
      reserve: true,
      consigne: 'Cherche le nom principal, puis choisis la bonne forme.',
      avant: 'La file de voitures ', apres: ' au ralenti.',
      choix: ['avance', 'avancent'], attendu: 'avance',
    },
    {
      // 0 La, 1 famille, 2 de, 3 mes, 4 voisins, 5 déménage, 6 samedi.
      // → sujet en 1 : c'est *la famille* qui déménage, pas les voisins un par un.
      id: 's09-r7', rappel: 'r2', type: 'toucher', palier: 2, piege: 'sujet-collectif',
      reserve: true,
      consigne: 'Touche le sujet du verbe.',
      mots: ['La', 'famille', 'de', 'mes', 'voisins', 'déménage', 'samedi.'], attendus: [1],
    },
    {
      id: 's09-r8', rappel: 'r2', type: 'completer', palier: 3, piege: 'sujet-collectif',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'La foule de spectateurs ', verbe: 'applaudir', apres: ' à la fin du match.',
      attendu: 'applaudit',
    },
  ],
};
