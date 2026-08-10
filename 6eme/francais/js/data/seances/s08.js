// Séance 8 — Le sujet inversé.
//
// Troisième façon de perdre le sujet : il n'est plus caché derrière un écran,
// il est passé DERRIÈRE le verbe. Deux cas au programme de 5e — la question
// (« où vont les enfants ? ») et le complément placé en tête (« sur la table
// traînent des papiers »).
//
// Piège : `sujet-inverse` sur toute la séance.
//
// Items neutres : phrases qui COMMENCENT comme les autres — un mot interrogatif,
// un complément de lieu en tête — mais où le sujet reste devant le verbe.
// Sans elles, l'élève retiendrait « la phrase commence par un complément, donc
// le sujet est après le verbe » et accorderait de travers dès qu'une phrase
// banale débute par « dans la cour ».

export default {
  numero: 8,
  bloc: 2,
  titre: 'Le sujet inversé',
  sousTitre: 'Quand le sujet passe derrière le verbe',
  objectif:
    "Retrouver le sujet quand il est placé après le verbe, dans les questions et après un complément mis en tête.",

  rappels: [
    {
      id: 'r1',
      titre: 'Dans les questions',
      texte:
        "Dans une question, le sujet passe souvent **derrière** le verbe : " +
        "*où vont les enfants ?*\n\n" +
        "Il commande l'accord quand même. Pour le voir, **remets la phrase à " +
        "l'endroit** : *où vont les enfants ?* → *les enfants vont où ?*\n\n" +
        "La question à poser reste la même que d'habitude : **« qui est-ce qui… ? »**",
      // Remettre la phrase à l'endroit est un geste mental. La flèche qui part de
      // derrière le verbe pour y revenir le rend visible : le sujet commande même
      // quand il n'est pas à sa place habituelle.
      animation: {
        mots: ['Où', 'vont', 'les', 'enfants', '?'],
        scenes: [
          { type: 'surligner', mots: [1], role: 'verbe', texte: 'Le verbe : « vont ».' },
          { type: 'dire', texte: 'Devant lui, il n\'y a que « Où ». Le sujet est passé derrière.' },
          { type: 'surligner', mots: [3], role: 'sujet',
            texte: 'Remets la phrase à l\'endroit : « les enfants vont où ? ».' },
          { type: 'fleche', de: 3, vers: 1, label: 'sujet → verbe',
            texte: 'Il est derrière, il commande quand même. Plusieurs → « vont ».' },
          { type: 'terminaison', mot: 2, devient: 'cet', texte: 'Un seul, maintenant.' },
          { type: 'terminaison', mot: 3, devient: 'enfant', texte: '« cet enfant »…' },
          { type: 'terminaison', mot: 1, devient: 'va', texte: '…« va ». La question à poser n\'a pas changé d\'un mot.' },
        ],
      },
      exemples: [
        { phrase: 'Où **vont** les enfants ?', note: "À l'endroit : *les enfants vont où ?* → sujet **les enfants**, plusieurs." },
        { phrase: 'Que **veut** ton frère ?', note: "À l'endroit : *ton frère veut quoi ?* → sujet **ton frère**, un seul." },
      ],
    },
    {
      id: 'r2',
      titre: 'Quand un complément passe devant',
      texte:
        "Hors des questions aussi le sujet peut basculer : quand la phrase " +
        "**commence par un complément**.\n\n" +
        "*Sur la table **traînent** des papiers.* Le mot collé au verbe, *table*, " +
        "n'est pas le sujet : c'est un complément de lieu. Qui est-ce qui traîne ? " +
        "**des papiers**.\n\n" +
        "Repère la petite préposition en tête — *sur, dans, sous, derrière* : " +
        "ce qui la suit ne sera jamais le sujet.",
      // Ici le mot collé au verbe est un complément de lieu, pas un sujet — et
      // c'est la préposition en tête de phrase qui le dit. On la surligne : elle
      // est le vrai indice, et elle passe inaperçue à la lecture.
      animation: {
        mots: ['Sur', 'la', 'table', 'traînent', 'des', 'papiers.'],
        scenes: [
          { type: 'surligner', mots: [3], role: 'verbe', texte: 'Le verbe : « traînent ».' },
          { type: 'fausse-piste', mot: 2,
            texte: '« table » touche le verbe. Ce n\'est pas pour ça qu\'elle traîne.' },
          { type: 'surligner', mots: [0], role: 'ecran',
            texte: 'Regarde le petit mot en tête : « Sur ». Une préposition.' },
          { type: 'dire', texte: 'Ce qui suit une préposition ne sera jamais le sujet.' },
          { type: 'surligner', mots: [5], role: 'sujet',
            texte: 'Qui est-ce qui traîne ? Des papiers.' },
          { type: 'fleche', de: 5, vers: 3, label: 'sujet → verbe',
            texte: 'Plusieurs papiers → « traînent ». Le sujet est derrière, il commande.' },
        ],
      },
      exemples: [
        { phrase: 'Sur la table **traînent** des papiers.', note: 'Qui est-ce qui traîne ? **Des papiers** — plusieurs.' },
        { phrase: 'Derrière les buissons **surgit** un chat.', note: 'Qui est-ce qui surgit ? **Un chat** — un seul.' },
      ],
    },
  ],

  exercices: [
    // ── Palier 1 : les questions ─────────────────────────────────────────
    {
      id: 's08-e1', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-inverse',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Où ', verbe: 'aller', apres: ' les enfants après le cours ?', attendu: 'vont',
    },
    {
      id: 's08-e2', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-inverse',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Que ', verbe: 'vouloir', apres: ' ton petit frère ?', attendu: 'veut',
    },
    {
      // NEUTRE : c'est bien une question, mais le sujet est resté devant le
      // verbe. Sans cet item, l'élève chercherait le sujet après le verbe dès
      // qu'il voit un point d'interrogation.
      id: 's08-e3', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-inverse',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Pourquoi est-ce que les élèves ', verbe: 'crier', apres: ' si fort ?', attendu: 'crient',
    },
    {
      id: 's08-e4', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-inverse',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Quand ', verbe: 'arriver', apres: ' tes cousins ?', attendu: 'arrivent',
    },
    {
      // NEUTRE : question sans inversion, sujet singulier.
      id: 's08-e5', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-inverse',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Est-ce que ton chien ', verbe: 'dormir', apres: ' dans ta chambre ?', attendu: 'dort',
    },

    // ── Palier 2 : un complément en tête de phrase ───────────────────────
    {
      // Complément singulier, sujet pluriel : accorder avec « table » donnerait
      // *traîne*.
      id: 's08-e6', rappel: 'r2', type: 'completer', palier: 2, piege: 'sujet-inverse',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Sur la table ', verbe: 'traîner', apres: ' des papiers.', attendu: 'traînent',
      // L'orthographe rectifiée de 1990 supprime l'accent circonflexe : la
      // séance juge l'accord, pas le chapeau du i.
      variantes: ['trainent'],
    },
    {
      // Complément pluriel, sujet singulier : le piège joue dans l'autre sens.
      id: 's08-e7', rappel: 'r2', type: 'completer', palier: 2, piege: 'sujet-inverse',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Derrière les buissons ', verbe: 'surgir', apres: ' un chat.', attendu: 'surgit',
    },
    {
      // NEUTRE : complément en tête, mais phrase dans l'ordre normal.
      id: 's08-e8', rappel: 'r2', type: 'completer', palier: 2, piege: 'sujet-inverse',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Sur le bureau, les cahiers ', verbe: 'attendre', apres: ' depuis hier.', attendu: 'attendent',
    },
    {
      // Piégeant AVEC virgule, et c'est voulu : la virgule après un complément
      // en tête est correcte que le sujet soit inversé ou non. Sans phrases
      // comme celle-ci, la virgule séparerait à elle seule les items neutres des
      // piégeants et l'élève apprendrait la ponctuation, pas l'inversion.
      id: 's08-e9', rappel: 'r2', type: 'completer', palier: 2, piege: 'sujet-inverse',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Dans le jardin, ', verbe: 'pousser', apres: ' des fraises.', attendu: 'poussent',
    },
    {
      // NEUTRE : même début de phrase que l'exercice précédent, ordre normal.
      id: 's08-e10', rappel: 'r2', type: 'completer', palier: 2, piege: 'sujet-inverse',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Dans la cour, mon frère ', verbe: 'jouer', apres: ' au ballon.', attendu: 'joue',
    },

    // ── Palier 3 : désigner le sujet, où qu'il soit ──────────────────────
    {
      id: 's08-e11', rappel: 'r1', type: 'toucher', palier: 3, piege: 'sujet-inverse',
      consigne: 'Touche le sujet du verbe.',
      mots: ['Où', 'vont', 'tes', 'cousins ?'], attendus: [3],
    },
    {
      id: 's08-e12', rappel: 'r2', type: 'toucher', palier: 3, piege: 'sujet-inverse',
      consigne: 'Touche le sujet du verbe.',
      mots: ['Sur', 'la', 'table', 'traînent', 'des', 'papiers.'], attendus: [5],
    },
    {
      // NEUTRE : la phrase commence par un complément, mais le sujet est devant
      // le verbe. C'est l'item qui empêche la fausse règle.
      id: 's08-e13', rappel: 'r2', type: 'toucher', palier: 3, piege: 'sujet-inverse',
      neutre: true,
      consigne: 'Touche le sujet du verbe.',
      mots: ['Dans', 'la', 'cour,', 'les', 'grands', 'jouent', 'au', 'ballon.'], attendus: [4],
    },
    {
      // NEUTRE : question, sujet non inversé.
      id: 's08-e14', rappel: 'r1', type: 'toucher', palier: 3, piege: 'sujet-inverse',
      neutre: true,
      consigne: 'Touche le sujet du verbe.',
      mots: ['Est-ce', 'que', 'ton', 'frère', 'vient', 'ce', 'soir ?'], attendus: [3],
    },
    {
      // Rien devant le verbe : l'élève n'a aucun mot à qui accorder tant qu'il
      // n'est pas allé chercher le sujet derrière.
      id: 's08-e15', rappel: 'r1', type: 'qcm', palier: 1, piege: 'sujet-inverse',
      consigne: 'Cherche le sujet, puis choisis la bonne forme.',
      avant: 'Où ', apres: ' tes affaires de sport ?',
      choix: ['est', 'sont'], attendu: 'sont',
    },
    {
      id: 's08-e16', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-inverse',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Que ', verbe: 'faire', apres: ' tes copains à la récréation ?', attendu: 'font',
    },
    {
      id: 's08-e17', rappel: 'r2', type: 'completer', palier: 2, piege: 'sujet-inverse',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Dans les branches ', verbe: 'chanter', apres: ' un oiseau.', attendu: 'chante',
    },
    {
      // NEUTRE : le complément en tête est au pluriel, mais le sujet est resté
      // devant le verbe. Sans cet item, « complément pluriel en tête → verbe au
      // pluriel » deviendrait une fausse règle.
      id: 's08-e18', rappel: 'r2', type: 'completer', palier: 2, piege: 'sujet-inverse',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Devant les vestiaires, Hugo ', verbe: 'attendre', apres: ' ses copains.',
      attendu: 'attend',
    },
    {
      id: 's08-e19', rappel: 'r2', type: 'toucher', palier: 3, piege: 'sujet-inverse',
      consigne: 'Touche le sujet du verbe.',
      mots: ['Sous', 'le', 'banc', 'dorment', 'deux', 'chats.'], attendus: [5],
    },
    {
      // NEUTRE : même forme de départ que l'exercice précédent — préposition,
      // complément, virgule — mais l'ordre est normal. C'est le geste de
      // vérification qu'on entraîne, pas le repérage d'un début de phrase.
      id: 's08-e20', rappel: 'r2', type: 'toucher', palier: 3, piege: 'sujet-inverse',
      neutre: true,
      consigne: 'Touche le sujet du verbe.',
      mots: ['Sous', 'les', 'arbres,', 'Emma', 'lit', 'un', 'roman.'], attendus: [3],
    },

    // ── Réserve ──────────────────────────────────────────────────────────
    //
    // `reserve: true` : jamais jouées dans le parcours. Elles sont gardées
    // intactes pour la reprise en début de séance 9 et pour la seconde chance
    // après une erreur, qui réclament l'une comme l'autre une phrase JAMAIS vue
    // portant le même piège. Toutes sont piégeantes : les reprises écartent les
    // items neutres, un neutre mis en réserve ne servirait jamais.
    {
      id: 's08-r1', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-inverse',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Quand ', verbe: 'partir', apres: ' tes grands-parents ?', attendu: 'partent',
    },
    {
      id: 's08-r2', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-inverse',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Que ', verbe: 'dire', apres: ' tes parents de cette note ?', attendu: 'disent',
    },
    {
      id: 's08-r3', rappel: 'r1', type: 'qcm', palier: 1, piege: 'sujet-inverse',
      reserve: true,
      consigne: 'Cherche le sujet, puis choisis la bonne forme.',
      avant: 'Combien ', apres: ' les places de cinéma ?',
      choix: ['coûte', 'coûtent'], attendu: 'coûtent',
    },
    {
      id: 's08-r4', rappel: 'r2', type: 'completer', palier: 2, piege: 'sujet-inverse',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Sous le préau ', verbe: 'discuter', apres: ' les sixièmes.', attendu: 'discutent',
    },
    {
      // Deuxième piégeant à virgule, pour que la reprise n'installe pas non plus
      // le raccourci « virgule → sujet devant le verbe ».
      id: 's08-r5', rappel: 'r2', type: 'completer', palier: 2, piege: 'sujet-inverse',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Dans les couloirs, ', verbe: 'résonner', apres: ' la sonnerie.', attendu: 'résonne',
    },
    {
      id: 's08-r6', rappel: 'r2', type: 'toucher', palier: 3, piege: 'sujet-inverse',
      reserve: true,
      consigne: 'Touche le sujet du verbe.',
      mots: ['Devant', 'le', 'collège', 'attendent', 'les', 'parents.'], attendus: [5],
    },
    {
      id: 's08-r7', rappel: 'r1', type: 'toucher', palier: 3, piege: 'sujet-inverse',
      reserve: true,
      consigne: 'Touche le sujet du verbe.',
      mots: ['Que', 'mangent', 'tes', 'hamsters ?'], attendus: [3],
    },
  ],
};
