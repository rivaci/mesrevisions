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
// (e2, e7, e8, d3), participe qui reste nu (d4, d7), adjectif qui ne prend
// rien (e4). d7 est le plus important : trois difficultés, et pas une seule
// lettre à ajouter.
//
// e14 casse la fausse règle symétrique — celle que e12, e13 et les réserves
// finiraient par installer : « le nom d'à côté n'est jamais le bon ». Là, le
// voisin a le même genre et le même nombre que le nom principal ; accorder
// avec lui tombe juste.

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

    // ── Palier 1, suite : le sujet, à froid, avant les dictées ───────────
    //
    // Les dictées coûtent cher en attention. Ces phrases courtes remettent le
    // geste en place — « qui est-ce qui… ? » — sans rien d'autre à tenir.
    {
      id: 's19-e5', rappel: 'r1', type: 'toucher', palier: 1, piege: 'ecran-complement-du-nom',
      consigne: 'Touche le sujet du verbe.',
      mots: ['Le', 'maillot', 'des', 'joueurs', 'sèche', 'sur', 'le', 'radiateur.'],
      attendus: [1],
    },
    {
      id: 's19-e6', rappel: 'r1', type: 'completer', palier: 1, piege: 'ecran-complement-du-nom',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Pendant la récréation, le ballon des grands ', verbe: 'rouler',
      apres: " jusqu'au portail.", attendu: 'roule',
    },
    {
      // NEUTRE, et avec virgule comme le piégeant du dessus : si les neutres
      // étaient les seules phrases ponctuées, Anto apprendrait la virgule au
      // lieu de l'accord.
      id: 's19-e7', rappel: 'r1', type: 'completer', palier: 1, piege: 'ecran-complement-du-nom',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Le mercredi, les élèves de la chorale ', verbe: 'chanter',
      apres: ' devant les parents.', attendu: 'chantent',
    },
    {
      // NEUTRE : écran singulier, sujet pluriel — rien ne tire vers le singulier.
      id: 's19-e8', rappel: 'r1', type: 'toucher', palier: 1, piege: 'ecran-complement-du-nom',
      neutre: true,
      consigne: 'Touche le sujet du verbe.',
      mots: ['Les', 'copines', 'de', 'Zoé', 'attendent', 'devant', 'le', 'gymnase.'],
      attendus: [1],
    },

    // ── Palier 2, suite : les petits mots, un par un ─────────────────────
    //
    // En dictée continue, ce sont eux qui tombent en premier : on les écrit
    // sans réfléchir parce qu'on pense au verbe suivant. Ici, isolés, on ne
    // peut que faire le test.
    {
      id: 's19-e9', rappel: 'r2', type: 'qcm', palier: 2, piege: 'homophone-grammatical',
      consigne: 'Remplace par « avaient » dans ta tête, puis choisis.',
      avant: 'Les parents de Zoé ', apres: ' préparé le pique-nique.',
      choix: ['on', 'ont'], attendu: 'ont',
    },
    {
      id: 's19-e10', rappel: 'r2', type: 'qcm', palier: 2, piege: 'homophone-grammatical',
      consigne: 'Essaie de dire « ou bien » à la place, puis choisis.',
      avant: 'Anto ne sait pas ', apres: ' ranger ses chaussures de sport.',
      choix: ['ou', 'où'], attendu: 'où',
    },
    {
      id: 's19-e11', rappel: 'r2', type: 'qcm', palier: 2, piege: 'homophone-grammatical',
      consigne: 'Remplace par « étaient » dans ta tête, puis choisis.',
      avant: 'Tom et Noé ', apres: ' arrivés en avance au tournoi.',
      choix: ['son', 'sont'], attendu: 'sont',
    },
    {
      id: 's19-e12', rappel: 'r2', type: 'qcm', palier: 2, piege: 'chaine-groupe-nominal',
      consigne: "Accorde l'adjectif avec le nom qu'il accompagne.",
      avant: 'Les chaussures de Tom sont ', apres: ' depuis la pluie de ce matin.',
      choix: ['mouillé', 'mouillée', 'mouillées'], attendu: 'mouillées',
    },
    {
      // Le plus piégeant de la séance, et pas un neutre : l'écran est féminin
      // PLURIEL et le nom principal masculin singulier. Qui accorde avec le mot
      // le plus proche écrit « cassées ». L'adjectif, lui, ne prend rien.
      id: 's19-e13', rappel: 'r2', type: 'qcm', palier: 2, piege: 'chaine-groupe-nominal',
      consigne: "Accorde l'adjectif avec le nom qu'il accompagne.",
      avant: 'Le vélo de mes cousines est ', apres: ' depuis la semaine dernière.',
      choix: ['cassé', 'cassée', 'cassées'], attendu: 'cassé',
    },
    {
      // NEUTRE : le voisin (« vacances ») a le même genre et le même nombre que
      // le nom principal (« photos »). Accorder avec le mot le plus proche donne
      // ici la bonne réponse — c'est tout son intérêt : sans lui, l'élève retient
      // « le nom d'à côté, on l'ignore toujours », et se trompe dès qu'il tombe
      // juste. Second contre-exemple du piège avec e4.
      id: 's19-e14', rappel: 'r2', type: 'qcm', palier: 2, piege: 'chaine-groupe-nominal',
      neutre: true,
      consigne: "Accorde l'adjectif avec le nom qu'il accompagne.",
      avant: 'Les photos des vacances sont ', apres: ' dans un album.',
      choix: ['collé', 'collée', 'collées'], attendu: 'collées',
    },

    // ── Textes à corriger : la relecture, à deux fautes ──────────────────
    //
    // Tous les autres exercices mettent Anto en position de CHOISIR : la forme
    // à trouver est désignée, il ne reste qu'à trancher entre des options. Rien
    // ne l'entraînait à la RELECTURE — balayer un texte où rien n'est signalé,
    // décider tout seul où poser les yeux. C'est pourtant exactement ce qu'on
    // lui demande à la fin d'une dictée, et c'est là qu'il perd ses points.
    //
    // Deuxième étage : DEUX fautes par phrase, de deux pièges différents. Le
    // danger propre à ce niveau, c'est de s'arrêter à la première trouvée. La
    // consigne ne dit pas combien il y en a, donc rien n'annonce qu'il faut
    // continuer de chercher.
    //
    // Les fautes ne tombent ni toujours au même endroit ni toujours sur le même
    // type de mot : verbe, participe, adjectif, petit mot homophone.
    //
    // Tous les autres mots sont irréprochables — et plusieurs ressemblent à des
    // fautes sans en être : « à » juste, « retrouvé » invariable, « pleines »
    // déjà accordé.
    {
      // Écran du complément du nom (le verbe) + é/er (l'infinitif après « à »).
      // Rien avant l'indice 4, rien après l'indice 7.
      id: 's19-c1', rappel: 'r1', type: 'corriger', palier: 1, piege: 'ecran-complement-du-nom',
      consigne: 'Relis cette phrase et touche les mots mal écrits.',
      mots: ['Le', 'responsable', 'des', 'équipes', 'ont', 'pensé', 'à', 'réservé', 'le', 'terrain', 'pour', 'dimanche.'],
      fautes: [
        { mot: 4, juste: 'a' },
        { mot: 7, juste: 'réserver' },
      ],
    },
    {
      // Participe passé avec être (au début) + é/er (tout à la fin). « aider »
      // à l'indice 8 est un infinitif JUSTE, entre les deux fautes : qui touche
      // tous les sons [é] se trompe.
      id: 's19-c2', rappel: 'r1', type: 'corriger', palier: 1, piege: 'participe-etre',
      consigne: 'Relis, puis touche tout ce qui est mal écrit.',
      mots: ['Emma', 'et', 'Zoé', 'sont', 'arrivé', 'en', 'avance', 'pour', 'aider', 'les', 'parents', 'à', 'installé', 'les', 'tables.'],
      fautes: [
        { mot: 4, juste: 'arrivées' },
        { mot: 12, juste: 'installer' },
      ],
    },
    {
      // Homophone (on / ont) + -ait / -aient. « où » à l'indice 8 est le bon
      // des deux, et « retrouvé » à l'indice 4 ne prend rien : deux mots qui
      // appellent le test et le passent.
      id: 's19-c3', rappel: 'r2', type: 'corriger', palier: 2, piege: 'homophone-grammatical',
      consigne: 'Relis cette phrase et touche les mots mal écrits.',
      mots: ['Tom', 'et', 'Noé', 'on', 'retrouvé', 'leur', 'ballon', 'là', 'où', 'les', 'grands', 'jouait', "d'habitude."],
      fautes: [
        { mot: 3, juste: 'ont' },
        { mot: 11, juste: 'jouaient' },
      ],
    },
    {
      // Chaîne du groupe nominal (l'adjectif, deuxième mot de la phrase) +
      // participe passé avec avoir dont le complément est passé devant.
      // « pleines » est déjà accordé et ne doit pas être touché.
      id: 's19-c4', rappel: 'r2', type: 'corriger', palier: 2, piege: 'chaine-groupe-nominal',
      consigne: 'Relis, puis touche tout ce qui est mal écrit.',
      mots: ['Les', 'nouvelle', 'baskets', 'que', 'Hugo', 'a', 'acheté', 'sont', 'déjà', 'pleines', 'de', 'boue.'],
      fautes: [
        { mot: 1, juste: 'nouvelles' },
        { mot: 6, juste: 'achetées' },
      ],
    },

    // ── Réserve ──────────────────────────────────────────────────────────
    //
    // `reserve: true` : jamais jouées dans le parcours. Elles sont gardées pour
    // la reprise en début de séance suivante et pour la seconde chance après
    // une erreur, qui réclament l'une comme l'autre une phrase JAMAIS vue
    // portant le même piège. Toutes sont piégeantes : les reprises écartent les
    // items neutres, un neutre en réserve ne servirait jamais. Et aucune
    // dictée : les reprises excluent ce type.
    {
      id: 's19-r1', rappel: 'r1', type: 'completer', palier: 1, piege: 'ecran-complement-du-nom',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'La porte des vestiaires ', verbe: 'claquer', apres: ' à chaque passage.',
      attendu: 'claque',
    },
    {
      id: 's19-r2', rappel: 'r1', type: 'qcm', palier: 1, piege: 'ecran-complement-du-nom',
      reserve: true,
      consigne: 'Cherche le sujet, puis choisis la bonne forme.',
      avant: 'La cage des perruches ', apres: ' près de la fenêtre.',
      choix: ['reste', 'restent'], attendu: 'reste',
    },
    {
      id: 's19-r3', rappel: 'r1', type: 'toucher', palier: 1, piege: 'ecran-complement-du-nom',
      reserve: true,
      consigne: 'Touche le sujet du verbe.',
      mots: ['Le', 'casier', 'des', 'sixièmes', 'se', 'trouve', 'au', 'fond', 'du', 'couloir.'],
      attendus: [1],
    },
    {
      id: 's19-r4', rappel: 'r2', type: 'qcm', palier: 2, piege: 'homophone-grammatical',
      reserve: true,
      consigne: 'Remplace par « avait » dans ta tête, puis choisis.',
      avant: 'Zoé raconte tout ', apres: ' sa meilleure amie.',
      choix: ['a', 'à'], attendu: 'à',
    },
    {
      id: 's19-r5', rappel: 'r2', type: 'qcm', palier: 2, piege: 'homophone-grammatical',
      reserve: true,
      consigne: 'Remplace par « avaient » dans ta tête, puis choisis.',
      avant: 'Ce soir, ', apres: ' mange des crêpes à la maison.',
      choix: ['on', 'ont'], attendu: 'on',
    },
    {
      id: 's19-r6', rappel: 'r2', type: 'qcm', palier: 2, piege: 'homophone-grammatical',
      reserve: true,
      consigne: 'Remplace par « était » dans ta tête, puis choisis.',
      avant: 'Sarah ', apres: ' rentrée avec son frère.',
      choix: ['et', 'est'], attendu: 'est',
    },
    {
      // Le nom principal est féminin SINGULIER et les deux mots qui le suivent
      // sont au pluriel : configuration qu'aucun item joué de la séance ne
      // présente.
      id: 's19-r7', rappel: 'r2', type: 'qcm', palier: 2, piege: 'chaine-groupe-nominal',
      reserve: true,
      consigne: "Accorde l'adjectif avec le nom qu'il accompagne.",
      avant: 'La sortie des classes de sixième est ', apres: ' à seize heures.',
      choix: ['prévu', 'prévue', 'prévues'], attendu: 'prévue',
    },
    {
      // Deux noms coordonnés, l'un masculin l'autre féminin : le pluriel passe
      // au masculin. Qui accorde avec le mot le plus proche écrit « froissée ».
      id: 's19-r8', rappel: 'r2', type: 'qcm', palier: 2, piege: 'chaine-groupe-nominal',
      reserve: true,
      consigne: "Accorde l'adjectif avec le nom qu'il accompagne.",
      avant: 'Le short et la casquette de Léa sont ', apres: ' au fond du sac.',
      choix: ['froissé', 'froissée', 'froissés', 'froissées'], attendu: 'froissés',
    },
    {
      // 0 Les, 1 oreilles, 2 de, 3 mon, 4 chien, 5 sont, 6 douces.
      // → le nom qui commande est en 1, pas le voisin « chien » en 4.
      id: 's19-r9', rappel: 'r2', type: 'toucher', palier: 2, piege: 'chaine-groupe-nominal',
      reserve: true,
      consigne: "Touche le nom qui commande l'accord de « douces ».",
      mots: ['Les', 'oreilles', 'de', 'mon', 'chien', 'sont', 'douces.'],
      attendus: [1],
    },
  ],
};
