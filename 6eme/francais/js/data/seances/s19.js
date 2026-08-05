// Séance 19 — Dictée continue.
//
// Format : voir s06.js pour la séance de référence, s18.js pour le type
// `dictee` (texte lu à voix haute, comparaison mot à mot, points de contrôle).
//
// Ici les phrases font 12 à 18 mots et portent deux ou trois difficultés
// chacune. Ce n'est plus la règle qui est testée — elle l'a été séance après
// séance — c'est la capacité à ne pas en oublier une pendant qu'on pense aux
// autres. D'où les points de contrôle multiples.
//
// NEUTRES. Le motif à casser reste le même qu'en s18 : « il y a du pluriel
// dans la phrase, donc j'ajoute des lettres ». Les items neutres sont ceux où
// ce réflexe donne la mauvaise réponse — écran singulier et sujet pluriel
// (e2, d3), participe qui reste nu (d4, d7), adjectif masculin singulier qui
// ne prend rien (e4). d7 est le plus important : trois difficultés, et pas une
// seule lettre à ajouter.

export default {
  numero: 19,
  bloc: 4,
  titre: 'Dictée continue',
  sousTitre: 'Plusieurs pièges dans la même phrase',
  objectif:
    "Tenir tous les tests à la fois sur des phrases longues, sans en oublier un en cours de route.",

  rappels: [
    {
      id: 'r1',
      titre: 'Un verbe à la fois',
      texte:
        "Dans une phrase longue, l'erreur ne vient presque jamais d'une règle qu'on ignore : " +
        "elle vient d'un test qu'on n'a pas fait, parce qu'on pensait déjà au mot suivant.\n\n" +
        "Alors on avance dans l'ordre. **Verbe par verbe**, sans en sauter un — surtout pas celui de la fin.\n\n" +
        "Puis, deuxième passage : **groupe de mots par groupe de mots**. Le nom commande son déterminant et ses adjectifs.\n\n" +
        "Deux passages lents valent mieux qu'une relecture rapide.",
      exemples: [
        { phrase: 'Le chien des voisins **aboyait** quand les enfants **rentraient**.', note: 'Deux verbes, deux fois la question. Un seul chien → **-ait** ; plusieurs enfants → **-aient**.' },
        { phrase: 'La liste des exercices **est affichée**.', note: "Qui est-ce qui est affiché ? La liste — une seule, féminin. Le verbe et le participe suivent." },
      ],
    },
    {
      id: 'r2',
      titre: 'Les petits mots qui reviennent toujours',
      texte:
        "Cinq paires reviennent dans presque toutes les dictées : " +
        "**a / à**, **et / est**, **on / ont**, **son / sont**, **ou / où**.\n\n" +
        "Un seul geste pour les quatre premières : **remplace par la forme à l'imparfait**. " +
        "*a* → *avait*, *est* → *était*, *ont* → *avaient*, *sont* → *étaient*.\n\n" +
        "Si la phrase tient, c'est le verbe. Sinon, c'est l'autre mot — celui qui ne se conjugue pas.\n\n" +
        "La cinquième paire ne cache aucun verbe : si tu peux dire *ou bien*, c'est **ou** ; " +
        "sinon c'est **où**, celui qui dit le lieu.",
      exemples: [
        { phrase: 'Anto **a** rangé son vélo.', note: '« Anto **avait** rangé » → ça tient : c\'est le verbe, donc **a**.' },
        { phrase: 'Anto pense **à** son vélo.', note: '« Anto pense **avait** son vélo » → ça ne tient pas, donc **à**.' },
      ],
    },
  ],

  exercices: [
    // ── Palier 1 : deux difficultés par phrase ───────────────────────────
    {
      id: 's19-e1', rappel: 'r1', type: 'toucher', palier: 1, piege: 'ecran-complement-du-nom',
      consigne: 'Touche les deux sujets : celui de « aboyait », puis celui de « rentraient ».',
      mots: ['Le', 'chien', 'des', 'voisins', 'aboyait', 'quand', 'les', 'enfants', 'rentraient.'],
      attendus: [1, 7],
    },
    {
      // NEUTRE : écran singulier, sujet pluriel → verbe au pluriel.
      id: 's19-e2', rappel: 'r1', type: 'completer', palier: 1, piege: 'ecran-complement-du-nom',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Les affiches du couloir ', verbe: 'annoncer', apres: ' le tournoi de basket.',
      attendu: 'annoncent',
    },
    {
      id: 's19-d1', rappel: 'r1', type: 'dictee', palier: 1,
      consigne: 'Écoute la phrase, puis écris-la en entier.',
      texte: 'Le chien des voisins aboyait dès que les enfants rentraient du collège.',
      pointsControle: [
        { mot: 'aboyait', piege: 'ait-aient' },
        { mot: 'rentraient', piege: 'ait-aient' },
      ],
    },
    {
      id: 's19-d2', rappel: 'r1', type: 'dictee', palier: 1,
      consigne: 'Écoute la phrase, puis écris-la en entier.',
      texte: 'La liste des exercices est affichée sur la porte de la classe.',
      pointsControle: [
        { mot: 'est', piege: 'ecran-complement-du-nom' },
        { mot: 'affichée', piege: 'participe-etre' },
      ],
    },
    {
      // NEUTRE : le nom voisin est singulier et le sujet pluriel ; le verbe part
      // au pluriel. Rien ne tire vers le singulier.
      id: 's19-d3', rappel: 'r1', type: 'dictee', palier: 1, neutre: true,
      consigne: 'Écoute la phrase, puis écris-la en entier.',
      texte: 'Les élèves de ma classe rangent leurs affaires avant la sonnerie du soir.',
      pointsControle: [
        { mot: 'rangent', piege: 'ecran-complement-du-nom' },
        { mot: 'leurs', piege: 'chaine-groupe-nominal' },
      ],
    },
    {
      // NEUTRE : auxiliaire avoir, sujet masculin singulier, complément après le
      // verbe — le participe ne prend rien. Porte 'participe-etre' comme en s14 :
      // c'est le contre-exemple de l'accord avec être.
      id: 's19-d4', rappel: 'r1', type: 'dictee', palier: 1, neutre: true,
      consigne: 'Écoute la phrase, puis écris-la en entier.',
      texte: 'Mon cousin a retrouvé ses clés dans la poche de son manteau.',
      pointsControle: [
        { mot: 'retrouvé', piege: 'participe-etre' },
        { mot: 'clés', piege: 'chaine-groupe-nominal' },
      ],
    },

    // ── Palier 2 : trois difficultés, et les homophones ──────────────────
    {
      id: 's19-e3', rappel: 'r2', type: 'qcm', palier: 2, piege: 'homophone-grammatical',
      consigne: 'Remplace par « avait » dans ta tête, puis choisis.',
      avant: 'Anto ', apres: ' rangé son vélo dans le garage.',
      choix: ['a', 'à'], attendu: 'a',
    },
    {
      // NEUTRE : masculin singulier, l'adjectif ne prend aucune marque. Sans cet
      // item, l'élève apprend « adjectif dans une dictée → j'ajoute un -s ».
      id: 's19-e4', rappel: 'r2', type: 'qcm', palier: 2, piege: 'chaine-groupe-nominal',
      neutre: true,
      consigne: "Accorde l'adjectif avec le nom qu'il accompagne.",
      avant: 'Anto a rangé son ', apres: ' cartable dans le couloir.',
      choix: ['vieux', 'vieille', 'vieilles'], attendu: 'vieux',
    },
    {
      id: 's19-d5', rappel: 'r2', type: 'dictee', palier: 2,
      consigne: 'Écoute la phrase, puis écris-la en entier.',
      texte: 'Mon frère et sa copine sont partis à la piscine sans oublier leurs affaires de sport.',
      pointsControle: [
        { mot: 'sont', piege: 'homophone-grammatical' },
        { mot: 'partis', piege: 'participe-etre' },
        { mot: 'oublier', piege: 'e-ou-er' },
      ],
    },
    {
      id: 's19-d6', rappel: 'r2', type: 'dictee', palier: 2,
      consigne: 'Écoute la phrase, puis écris-la en entier.',
      texte: 'Les copains de mon frère ont gagné leur match et sont rentrés très fiers.',
      pointsControle: [
        { mot: 'ont', piege: 'ecran-complement-du-nom' },
        { mot: 'gagné', piege: 'participe-avoir' },
        { mot: 'rentrés', piege: 'participe-etre' },
      ],
    },
    {
      // NEUTRE, et le plus utile de la séance : trois difficultés, et pas une
      // seule lettre à ajouter. Tous les sujets sont singuliers, le participe
      // reste nu. L'élève qui « accorde un peu partout » se trompe trois fois.
      id: 's19-d7', rappel: 'r2', type: 'dictee', palier: 2, neutre: true,
      consigne: 'Écoute la phrase, puis écris-la en entier.',
      texte: 'Mon père a préparé le repas pendant que mon frère jouait dans le jardin.',
      pointsControle: [
        { mot: 'a', piege: 'homophone-grammatical' },
        { mot: 'préparé', piege: 'e-ou-er' },
        { mot: 'jouait', piege: 'ait-aient' },
      ],
    },
  ],
};
