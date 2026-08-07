// Séance 21 — L'impératif présent.
//
// Format : voir s06.js, la séance de référence.
//
// ── Pourquoi cette séance existe ──────────────────────────────────────────
//
// Les vingt séances précédentes n'ont fait qu'une chose : installer le réflexe
// « cherche le sujet, accorde le verbe ». L'impératif est le seul temps où le
// sujet n'est PAS écrit. L'élève applique donc consciencieusement le réflexe
// qu'on vient de lui donner, retrouve un « tu » sous-entendu, et écrit
// « manges ta soupe », « n'oublies pas ton maillot ».
//
// Ce piège-là, l'appli le fabrique elle-même. D'où cette séance, et d'où sa
// place tard dans le parcours : avant que le réflexe soit solide, il n'y aurait
// rien à corriger.
//
// ── Ce que « neutre » veut dire ici ───────────────────────────────────────
//
// Un item neutre est une phrase où le -s est LÉGITIME, et où le mauvais réflexe
// donne donc la bonne réponse :
//   — présent de l'indicatif avec un sujet écrit (« tu manges », e2, e4, e7,
//     e14) ;
//   — impératif d'un verbe qui n'est pas en -er, où le -s se met normalement
//     (« prends », « viens », « relis-le », e8, e17, e18).
// Sans eux, Anto retiendrait « impératif = jamais de -s » — une fausse règle qui
// lui ferait écrire « prend ton temps » et « va-y ».
//
// Les items en -en / -y (e11, e12) ne sont pas marqués neutres : ils exigent au
// contraire de savoir POURQUOI le -s revient, ce qu'aucun motif de surface ne
// donne.

export default {
  numero: 21,
  bloc: 4,
  titre: "Mange, pas « manges »",
  sousTitre: "L'impératif, le seul temps sans sujet",
  objectif: "Reconnaître un ordre et l'écrire sans -s — sauf devant « en » et « y ».",

  rappels: [
    {
      id: 'r1',
      titre: 'Un ordre : pas de sujet, pas de -s',
      texte:
        "À l'**impératif**, on donne un ordre ou un conseil, et le sujet **n'est " +
        "pas écrit**. Trois personnes seulement : *mange*, *mangeons*, *mangez*.\n\n" +
        "Pas de sujet, donc rien avec quoi accorder : à la 2ᵉ personne, les verbes " +
        "en **-er** et le verbe **aller** ne prennent **pas de -s**.\n\n" +
        "C'est exactement là qu'on se fait avoir : *tu manges* a un sujet, donc un " +
        "-s. *Mange ta soupe* n'a ni l'un ni l'autre.",
      exemples: [
        { phrase: 'Tu **manges** ta soupe.', note: "Il y a un sujet, « tu » → le verbe porte le -s." },
        { phrase: '**Mange** ta soupe !', note: "C'est un ordre : aucun sujet écrit, donc pas de -s." },
      ],
      // L'animation joue la scène que le texte décrit : le sujet qu'on retire, et
      // le -s qui part avec lui. Format : voir js/animation.js.
      animation: {
        mots: ['Tu', 'manges', 'ta', 'soupe.'],
        scenes: [
          { type: 'surligner', mots: [1], role: 'verbe', texte: "D'abord, repère le verbe : « manges »." },
          { type: 'surligner', mots: [0], role: 'sujet', texte: 'Un sujet est écrit juste devant : « tu ».' },
          { type: 'fleche', de: 0, vers: 1, label: 'sujet → verbe', texte: "« tu » commande le verbe : « manges », avec son -s." },
          { type: 'dire', texte: "Maintenant, transforme la phrase en ordre." },
          { type: 'fausse-piste', mot: 0, texte: "Le sujet disparaît — et il n'y a plus rien avec quoi accorder." },
          { type: 'terminaison', mot: 1, devient: 'Mange', texte: "Le -s part avec le sujet : « Mange ta soupe ! »" },
        ],
      },
    },
    {
      id: 'r2',
      titre: "Le -s qui revient, et les traits d'union",
      texte:
        "Le -s réapparaît dans un seul cas : devant les petits mots **en** et **y**, " +
        "parce que sans lui ça ne se prononce pas. *Manges-en*, *vas-y*, *penses-y*.\n\n" +
        "Quand un pronom suit le verbe, on les relie par un **trait d'union** : " +
        "*donne-le-moi*, *dépêche-toi*, *attends-nous*.\n\n" +
        "Quatre irréguliers à connaître : **sois** patient, **aie** confiance, " +
        "**va** te coucher, **sache** attendre. Attention, *aie* ne prend pas de -s.",
      // Le -s qui revient est une affaire de prononciation, pas d'accord : sans
      // lui, « mange-en » ne se dit pas. On le fait donc entendre — la scène est
      // lue à voix haute quand la voix est active.
      animation: {
        // Le verbe et son « en » tiennent dans une seule case : séparés, l'écran
        // affichait « Manges- en soupe. » Le trait d'union fait partie du mot,
        // et c'est justement ce que la leçon veut faire voir.
        mots: ['Mange-en', 'une', 'part.'],
        scenes: [
          { type: 'surligner', mots: [0], role: 'verbe',
            texte: 'À l\'impératif, pas de sujet, donc pas de -s : on écrit « Mange ».' },
          { type: 'dire', texte: 'Sauf devant deux petits mots : « en » et « y ».' },
          { type: 'fausse-piste', mot: 0,
            texte: 'Essaie de dire « mange-en » à voix haute. Les deux voyelles se cognent, ça ne passe pas.' },
          { type: 'terminaison', mot: 0, devient: 'Manges-en',
            texte: 'Le -s revient pour qu\'on puisse le prononcer : « Manges-en une part ». Même chose pour « vas-y », « penses-y ».' },
          { type: 'dire',
            texte: 'Et quand un pronom suit le verbe, un trait d\'union les relie : donne-le-moi, dépêche-toi, attends-nous.' },
        ],
      },
      exemples: [
        { phrase: 'Il reste du gâteau. **Manges-en** une part.', note: '« en » suit le verbe → le -s revient pour qu\'on puisse le dire.' },
        { phrase: '**Dépêche-toi**, et **sois** prêt à huit heures.', note: "Trait d'union avec le pronom ; « sois » s'apprend par cœur." },
      ],
    },
  ],

  exercices: [
    // ── Palier 1 : un ordre, ou une phrase avec sujet ? ───────────────────
    {
      id: 's21-e1', rappel: 'r1', type: 'completer', palier: 1, piege: 'imperatif',
      consigne: 'Écris le verbe à la forme qui convient.',
      avant: 'Anto, ', verbe: 'ranger', apres: ' ta chambre avant le dîner.', attendu: 'range',
    },
    {
      // NEUTRE : sujet écrit, présent de l'indicatif. Le -s est obligatoire.
      // C'est l'item qui empêche « impératif ou pas, je n'en mets jamais ».
      id: 's21-e2', rappel: 'r1', type: 'qcm', palier: 1, piege: 'imperatif',
      neutre: true,
      consigne: 'Choisis la forme qui convient.',
      avant: 'Tu ', apres: ' vraiment vite pour ton âge.',
      choix: ['nage', 'nages'], attendu: 'nages',
    },
    {
      id: 's21-e3', rappel: 'r1', type: 'completer', palier: 1, piege: 'imperatif',
      consigne: 'Écris le verbe à la forme qui convient.',
      avant: "N'", verbe: 'oublier', apres: ' pas ton maillot demain.', attendu: 'oublie',
    },
    {
      // NEUTRE : le même verbe que l'exemple du rappel, mais cette fois avec son
      // sujet. Les deux phrases se ressemblent, et c'est le sujet qui tranche.
      id: 's21-e4', rappel: 'r1', type: 'completer', palier: 1, piege: 'imperatif',
      neutre: true,
      consigne: 'Écris le verbe à la forme qui convient.',
      avant: 'Le samedi, tu ', verbe: 'manger', apres: ' chez ta grand-mère.', attendu: 'manges',
    },
    {
      // Deux ordres, deux personnes différentes (2ᵉ du singulier et 2ᵉ du
      // pluriel), et « fait » comme leurre : c'est un verbe, mais il ne donne
      // aucun ordre. « vous deux » non plus n'est pas un sujet : on interpelle.
      id: 's21-e5', rappel: 'r1', type: 'toucher', palier: 1, piege: 'imperatif',
      consigne: 'Touche les deux verbes qui donnent un ordre.',
      mots: ['Léa,', 'ferme', 'la', 'fenêtre,', 'et', 'vous', 'deux,', 'baissez', 'le', 'son.'],
      attendus: [1, 7],
    },
    {
      // La 1ʳᵉ personne du pluriel : là encore aucun sujet écrit, et pourtant la
      // terminaison change. C'est bien la personne qui décide, pas un « tu »
      // sous-entendu.
      id: 's21-e6', rappel: 'r1', type: 'completer', palier: 1, piege: 'imperatif',
      consigne: 'Écris le verbe à la forme qui convient.',
      avant: 'Nous sommes tous là : ', verbe: 'monter', apres: ' dans le bus.', attendu: 'montons',
    },
    {
      // NEUTRE
      id: 's21-e7', rappel: 'r1', type: 'completer', palier: 1, piege: 'imperatif',
      neutre: true,
      consigne: 'Écris le verbe à la forme qui convient.',
      avant: 'Tu ', verbe: 'travailler', apres: ' mieux depuis la rentrée.', attendu: 'travailles',
    },
    {
      // NEUTRE : un ordre, mais avec un verbe du 3ᵉ groupe. Le -s est normal —
      // « prend ton temps » serait faux. Sans cet item, la séance apprendrait
      // « ordre → pas de -s », ce qui est encore une fausse règle.
      id: 's21-e8', rappel: 'r1', type: 'completer', palier: 1, piege: 'imperatif',
      neutre: true,
      consigne: 'Écris le verbe à la forme qui convient.',
      avant: 'Hugo, ', verbe: 'prendre', apres: ' ton temps pour relire.', attendu: 'prends',
    },
    {
      id: 's21-e9', rappel: 'r1', type: 'qcm', palier: 1, piege: 'imperatif',
      consigne: 'Choisis la forme qui convient.',
      avant: 'Zoé, ', apres: " un peu plus fort, je ne t'entends pas.",
      choix: ['parle', 'parles'], attendu: 'parle',
    },
    {
      // La relecture, c'est-à-dire le geste de la dictée : la faute est écrite,
      // il faut la voir. Le premier verbe est juste, le second porte le -s de
      // trop.
      id: 's21-e10', rappel: 'r1', type: 'corriger', palier: 1, piege: 'imperatif',
      consigne: 'Touche le ou les mots mal écrits, puis valide.',
      mots: ['Ferme', 'la', 'porte', 'et', 'écoutes', 'bien', 'la', 'consigne.'],
      fautes: [{ mot: 4, juste: 'écoute' }],
    },

    // ── Palier 2 : « en », « y », traits d'union et irréguliers ───────────
    {
      id: 's21-e11', rappel: 'r2', type: 'completer', palier: 2, piege: 'imperatif',
      consigne: 'Écris le verbe « manger » à la forme qui convient.',
      avant: 'Il reste des crêpes : ', apres: '-en une.', attendu: 'manges',
    },
    {
      id: 's21-e12', rappel: 'r2', type: 'completer', palier: 2, piege: 'imperatif',
      consigne: 'Écris le verbe « aller » à la forme qui convient.',
      avant: 'Le film commence, ', apres: '-y tout de suite.', attendu: 'vas',
    },
    {
      // Le même verbe qu'en e12, sans « y » : le -s disparaît. Les deux items se
      // répondent, et aucun détail de surface ne les sépare.
      id: 's21-e13', rappel: 'r2', type: 'qcm', palier: 2, piege: 'imperatif',
      consigne: 'Choisis la forme qui convient.',
      avant: 'Ne ', apres: ' pas trop loin du groupe.',
      choix: ['va', 'vas'], attendu: 'va',
    },
    {
      // NEUTRE : troisième version d'« aller », cette fois avec un sujet écrit.
      // « tu vas » prend son -s comme n'importe quel présent.
      id: 's21-e14', rappel: 'r2', type: 'qcm', palier: 2, piege: 'imperatif',
      neutre: true,
      consigne: 'Choisis la forme qui convient.',
      avant: 'Chaque dimanche, tu ', apres: ' au marché avec papa.',
      choix: ['va', 'vas'], attendu: 'vas',
    },
    {
      id: 's21-e15', rappel: 'r2', type: 'completer', palier: 2, piege: 'imperatif',
      consigne: 'Écris le verbe « donner » à la forme qui convient.',
      avant: 'Ce cahier est à moi, ', apres: '-le-moi.', attendu: 'donne',
    },
    {
      // Un pronom suit le verbe, comme en e11 et e12 — mais « toi » n'est ni
      // « en » ni « y » : le -s ne revient pas.
      id: 's21-e16', rappel: 'r2', type: 'completer', palier: 2, piege: 'imperatif',
      consigne: 'Écris le verbe « se dépêcher » à la forme qui convient.',
      avant: 'Le bus arrive : ', apres: '-toi !', attendu: 'dépêche',
    },
    {
      // NEUTRE
      id: 's21-e17', rappel: 'r2', type: 'completer', palier: 2, piege: 'imperatif',
      neutre: true,
      consigne: 'Écris le verbe à la forme qui convient.',
      avant: 'Le repas est prêt : ', verbe: 'venir', apres: ' à table.', attendu: 'viens',
    },
    {
      // NEUTRE : l'ordre est bien là, avec son trait d'union — et son -s, parce
      // que « relire » n'est pas un verbe en -er. Le leurre est « as », un verbe
      // qui ne donne aucun ordre.
      id: 's21-e18', rappel: 'r2', type: 'toucher', palier: 2, piege: 'imperatif',
      neutre: true,
      consigne: 'Touche le verbe qui donne un ordre.',
      mots: ['Tu', 'as', 'fini', 'ton', 'exercice', 'alors', 'relis-le', 'calmement.'],
      attendus: [6],
    },
    {
      id: 's21-e19', rappel: 'r2', type: 'qcm', palier: 2, piege: 'imperatif',
      consigne: 'Choisis la forme qui convient.',
      avant: "N'", apres: ' pas peur de ce gros chien.',
      choix: ['aie', 'aies'], attendu: 'aie',
    },
    {
      // Deux fautes, dont celle d'« aller » : c'est la phrase que la séance
      // entière prépare. Rien ne signale les mots fautifs, il faut relire.
      id: 's21-e20', rappel: 'r2', type: 'corriger', palier: 2, piege: 'imperatif',
      consigne: 'Touche le ou les mots mal écrits, puis valide.',
      mots: ['Anto,', 'ranges', 'tes', 'affaires', 'et', 'vas', 'te', 'laver', 'les', 'mains.'],
      fautes: [{ mot: 1, juste: 'range' }, { mot: 5, juste: 'va' }],
    },

    // ── Réserve ──────────────────────────────────────────────────────────
    //
    // `reserve: true` : ces phrases ne sont jamais jouées dans le parcours.
    // Elles sont gardées intactes pour la reprise en début de séance suivante et
    // pour la seconde chance après une erreur, qui réclament l'une comme l'autre
    // une phrase JAMAIS VUE portant le même piège. Toutes sont piégeantes : les
    // reprises écartent les items neutres, une réserve neutre ne serait jamais
    // proposée.
    {
      id: 's21-r1', rappel: 'r1', type: 'completer', palier: 1, piege: 'imperatif',
      reserve: true,
      consigne: 'Écris le verbe à la forme qui convient.',
      avant: 'Noé, ', verbe: 'arroser', apres: ' les tomates du potager.', attendu: 'arrose',
    },
    {
      id: 's21-r2', rappel: 'r1', type: 'qcm', palier: 1, piege: 'imperatif',
      reserve: true,
      consigne: 'Choisis la forme qui convient.',
      avant: 'Sarah, ', apres: ' le portail derrière toi.',
      choix: ['ferme', 'fermes'], attendu: 'ferme',
    },
    {
      id: 's21-r3', rappel: 'r1', type: 'corriger', palier: 1, piege: 'imperatif',
      reserve: true,
      consigne: 'Touche le ou les mots mal écrits, puis valide.',
      mots: ['Zoé,', 'penses', 'à', 'ton', 'goûter', 'et', 'ferme', 'ton', 'casier.'],
      fautes: [{ mot: 1, juste: 'pense' }],
    },
    {
      id: 's21-r4', rappel: 'r2', type: 'completer', palier: 2, piege: 'imperatif',
      reserve: true,
      consigne: 'Écris le verbe « aller » à la forme qui convient.',
      avant: 'La piscine ouvre à dix heures : ', apres: '-y à vélo.', attendu: 'vas',
    },
    {
      id: 's21-r5', rappel: 'r2', type: 'completer', palier: 2, piege: 'imperatif',
      reserve: true,
      consigne: 'Écris le verbe « manger » à la forme qui convient.',
      avant: 'Ces bonbons sont pour toi, ', apres: '-en deux.', attendu: 'manges',
    },
    {
      id: 's21-r6', rappel: 'r2', type: 'completer', palier: 2, piege: 'imperatif',
      reserve: true,
      consigne: 'Écris le verbe « regarder » à la forme qui convient.',
      avant: "J'ai terminé mon dessin : ", apres: '-le bien.', attendu: 'regarde',
    },
  ],
};
