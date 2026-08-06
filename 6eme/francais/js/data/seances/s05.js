// Séance 5 — Le passé simple et le passé composé.
//
// Format et conventions : voir s06.js, la séance de référence.
//
// Deux temps du passé qui ne servent pas au même endroit : le passé simple
// s'écrit et se lit (le récit), le passé composé se parle. Le passé simple est
// donc travaillé presque uniquement à la 3ᵉ personne, la seule qu'Anto
// rencontrera vraiment.
//
// PÉRIMÈTRE : cette séance prépare les séances 14 et 15 mais ne traite PAS
// l'accord du participe passé. Tous les participes employés avec *être* ont ici
// un sujet masculin singulier, si bien que la réponse est la même qu'on pense
// à l'accord ou non. Ce qui est évalué, c'est le choix de l'auxiliaire et la
// forme du participe — pas sa terminaison variable. Le piège `participe-etre`
// est donc mobilisé pour son diagnostic « je pensais que c'était l'auxiliaire
// avoir », qui est exactement l'erreur visée au palier 2.

export default {
  numero: 5,
  bloc: 1,
  titre: 'Le passé simple et le passé composé',
  sousTitre: "Le temps qu'on lit, le temps qu'on parle",
  objectif:
    'Écrire un verbe au passé simple à la 3ᵉ personne, et construire un passé composé ' +
    'avec le bon auxiliaire et le bon participe.',

  rappels: [
    {
      id: 'r1',
      titre: 'Le passé simple : le temps du récit',
      texte:
        "Le passé simple, on ne le parle pas : on le **lit** et on l'**écrit**. " +
        "C'est le temps des romans, des contes et des récits historiques, presque " +
        'toujours à la **3ᵉ personne**.\n\n' +
        'Verbes en *-er* : **-a** pour un seul, **-èrent** pour plusieurs.\n' +
        'Les autres verbes : **-it** ou **-ut** pour un seul, **-irent** ou ' +
        '**-urent** pour plusieurs.\n\n' +
        "Dans un récit, il marche presque toujours avec l'imparfait : l'imparfait " +
        'plante le décor, le passé simple raconte ce qui arrive.',
      exemples: [
        { phrase: 'Le chevalier **ouvrit** la porte.', note: 'Un seul, verbe en *-ir* → *-it*.' },
        { phrase: 'Les villageois **arrivèrent** au château.', note: 'Plusieurs, verbe en *-er* → *-èrent*.' },
        { phrase: 'Il **faisait** nuit quand le train **entra** en gare.', note: 'Le décor à l\'imparfait, l\'événement au passé simple.' },
      ],
    },
    {
      id: 'r2',
      titre: 'Le passé composé : deux morceaux',
      texte:
        'Le passé composé s\'écrit en **deux mots** : un **auxiliaire** ' +
        '(*avoir* ou *être*) conjugué au présent, puis le **participe passé**.\n\n' +
        '*nous **avons** **mangé*** → auxiliaire *avons* + participe *mangé*.\n' +
        '*il **est** **parti*** → auxiliaire *est* + participe *parti*.\n\n' +
        'La plupart des verbes prennent **avoir**. Une petite bande prend ' +
        '**être** : *aller, venir, partir, arriver, entrer, sortir, monter, ' +
        'descendre, rester, tomber, naître*.\n\n' +
        "Pour l'instant, une seule chose à faire : repérer l'auxiliaire.",
      exemples: [
        { phrase: "J'**ai pris** mon vélo.", note: '*prendre* → auxiliaire **avoir**, participe **pris**.' },
        { phrase: 'Mon ballon **est tombé**.', note: '*tomber* → auxiliaire **être**, participe **tombé**.' },
      ],
    },
  ],

  exercices: [
    // ── Palier 1 : le passé simple, 3ᵉ personne ──────────────────────────
    {
      id: 's05-e1', rappel: 'r1', type: 'completer', palier: 1, piege: 'irregulier',
      consigne: 'Conjugue le verbe au passé simple.',
      avant: 'En voyant le dragon, le chevalier ', verbe: 'prendre', apres: ' son épée.', attendu: 'prit',
    },
    {
      // NEUTRE : verbe en -er parfaitement régulier. Sans ces items, Anto
      // apprendrait « passé simple = forme bizarre à deviner ».
      id: 's05-e2', rappel: 'r1', type: 'completer', palier: 1, piege: 'irregulier',
      neutre: true,
      consigne: 'Conjugue le verbe au passé simple.',
      avant: 'Le loup ', verbe: 'arriver', apres: ' devant la maison de paille.', attendu: 'arriva',
    },
    {
      id: 's05-e3', rappel: 'r1', type: 'completer', palier: 1, piege: 'irregulier',
      consigne: 'Conjugue le verbe au passé simple.',
      avant: 'Les trois amis ', verbe: 'faire', apres: ' un grand feu.', attendu: 'firent',
    },
    {
      // NEUTRE
      id: 's05-e4', rappel: 'r1', type: 'completer', palier: 1, piege: 'irregulier',
      neutre: true,
      consigne: 'Conjugue le verbe au passé simple.',
      avant: 'Les villageois ', verbe: 'finir', apres: ' la construction du pont.', attendu: 'finirent',
    },
    {
      // mots[6] = 'vint'. L'autre verbe, 'faisait', est à l'imparfait : c'est
      // le décor, pas l'événement.
      id: 's05-e5', rappel: 'r1', type: 'toucher', palier: 1, piege: 'irregulier',
      consigne: 'Touche le verbe conjugué au passé simple.',
      mots: ['Il', 'faisait', 'nuit', 'quand', 'le', 'chevalier', 'vint', 'frapper', 'à', 'la', 'porte.'],
      attendus: [6],
    },

    // ── Palier 2 : le passé composé, choisir l'auxiliaire ────────────────
    {
      id: 's05-e6', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-etre',
      consigne: 'Conjugue le verbe au passé composé.',
      avant: 'Ce matin, mon frère ', verbe: 'partir', apres: ' avant moi.', attendu: 'est parti',
    },
    {
      // NEUTRE : auxiliaire avoir. Sans ces items, Anto apprendrait
      // « au passé composé, on met être ».
      id: 's05-e7', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-etre',
      neutre: true,
      consigne: 'Conjugue le verbe au passé composé.',
      avant: 'Hier soir, mes cousins ', verbe: 'manger', apres: ' toute la pizza.', attendu: 'ont mangé',
    },
    {
      id: 's05-e8', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-etre',
      consigne: 'Conjugue le verbe au passé composé.',
      avant: 'Mon ballon ', verbe: 'tomber', apres: ' dans le jardin du voisin.', attendu: 'est tombé',
    },
    {
      // NEUTRE
      id: 's05-e9', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-etre',
      neutre: true,
      consigne: 'Conjugue le verbe au passé composé.',
      avant: 'Nous ', verbe: 'finir', apres: ' le match sous la pluie.', attendu: 'avons fini',
    },
    {
      // mots[2] = 'est'. L'auxiliaire, pas le participe.
      id: 's05-e10', rappel: 'r2', type: 'toucher', palier: 2, piege: 'participe-etre',
      consigne: "Touche l'auxiliaire du verbe au passé composé.",
      mots: ['Mon', 'chien', 'est', 'resté', 'devant', 'la', 'porte.'],
      attendus: [2],
    },

    // ── Palier 3 : le participe passé qu'il faut connaître ───────────────
    {
      id: 's05-e11', rappel: 'r2', type: 'completer', palier: 3, piege: 'irregulier',
      consigne: 'Conjugue le verbe au passé composé.',
      avant: 'Léo ', verbe: 'prendre', apres: ' son vélo pour aller au collège.', attendu: 'a pris',
    },
    {
      // NEUTRE : participe régulier en -é. Sans ces items, Anto apprendrait
      // « le participe est toujours court et bizarre ».
      id: 's05-e12', rappel: 'r2', type: 'completer', palier: 3, piege: 'irregulier',
      neutre: true,
      consigne: 'Conjugue le verbe au passé composé.',
      avant: 'Nous ', verbe: 'jouer', apres: ' aux cartes pendant tout le voyage.', attendu: 'avons joué',
    },
    {
      id: 's05-e13', rappel: 'r2', type: 'completer', palier: 3, piege: 'irregulier',
      consigne: 'Conjugue le verbe au passé composé.',
      avant: 'Ils ', verbe: 'voir', apres: ' un renard au bord de la route.', attendu: 'ont vu',
    },
    {
      // NEUTRE
      id: 's05-e14', rappel: 'r2', type: 'completer', palier: 3, piege: 'irregulier',
      neutre: true,
      consigne: 'Conjugue le verbe au passé composé.',
      avant: 'Ma classe ', verbe: 'visiter', apres: ' le musée lundi dernier.', attendu: 'a visité',
    },
    {
      id: 's05-e15', rappel: 'r1', type: 'qcm', palier: 1, piege: 'irregulier',
      consigne: 'Cherche le sujet, puis choisis la forme du passé simple.',
      avant: 'Quand la cloche sonna, les élèves ', apres: ' se ranger.',
      choix: ['vint', 'vinrent'], attendu: 'vinrent',
    },
    {
      // NEUTRE
      id: 's05-e16', rappel: 'r1', type: 'completer', palier: 1, piege: 'irregulier',
      neutre: true,
      consigne: 'Conjugue le verbe au passé simple.',
      avant: 'Le prince ', verbe: 'monter', apres: ' sur son cheval.', attendu: 'monta',
    },
    {
      id: 's05-e17', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-etre',
      consigne: 'Conjugue le verbe au passé composé.',
      avant: 'Hugo ', verbe: 'venir', apres: ' me chercher à la sortie du collège.', attendu: 'est venu',
    },
    {
      // NEUTRE
      id: 's05-e18', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-etre',
      neutre: true,
      consigne: 'Conjugue le verbe au passé composé.',
      avant: 'Sarah ', verbe: 'regarder', apres: ' un film avec sa sœur.', attendu: 'a regardé',
    },
    {
      // mots[2] = 'pris'. Le participe, cette fois, pas l'auxiliaire : le
      // palier 3 porte sur la forme du participe, il faut qu'Anto sache
      // lequel des deux morceaux on lui demande.
      id: 's05-e19', rappel: 'r2', type: 'toucher', palier: 3, piege: 'irregulier',
      consigne: 'Touche le participe passé.',
      mots: ['Nous', 'avons', 'pris', 'le', 'train', 'de', 'huit', 'heures.'],
      attendus: [2],
    },
    {
      // NEUTRE
      id: 's05-e20', rappel: 'r2', type: 'completer', palier: 3, piege: 'irregulier',
      neutre: true,
      consigne: 'Conjugue le verbe au passé composé.',
      avant: 'Emma ', verbe: 'chercher', apres: ' ses lunettes dans toute la maison.', attendu: 'a cherché',
    },

    // ── Réserve ─────────────────────────────────────────────────────────
    //
    // Jamais jouées dans le parcours. La reprise en début de séance et la
    // seconde chance après une erreur exigent toutes deux une phrase JAMAIS
    // VUE portant le même piège : si la séance a consommé tous ses exercices,
    // il n'en reste aucune. Ces phrases sont donc toutes PIÉGEANTES — les
    // reprises écartent les items neutres, un neutre en réserve ne servirait
    // jamais.
    {
      id: 's05-r1', rappel: 'r1', type: 'completer', palier: 1, piege: 'irregulier',
      reserve: true,
      consigne: 'Conjugue le verbe au passé simple.',
      avant: 'En entendant le bruit, le renard ', verbe: 'prendre', apres: ' la fuite.', attendu: 'prit',
    },
    {
      id: 's05-r2', rappel: 'r1', type: 'completer', palier: 1, piege: 'irregulier',
      reserve: true,
      consigne: 'Conjugue le verbe au passé simple.',
      avant: 'Les soldats ', verbe: 'venir', apres: ' au secours du village.', attendu: 'vinrent',
    },
    {
      id: 's05-r3', rappel: 'r2', type: 'completer', palier: 3, piege: 'irregulier',
      reserve: true,
      consigne: 'Conjugue le verbe au passé composé.',
      avant: 'Emma ', verbe: 'vouloir', apres: ' goûter la tarte aux pommes.', attendu: 'a voulu',
    },
    {
      id: 's05-r4', rappel: 'r2', type: 'completer', palier: 3, piege: 'irregulier',
      reserve: true,
      consigne: 'Conjugue le verbe au passé composé.',
      avant: 'Nous ', verbe: 'faire', apres: " un gâteau pour l'anniversaire de Zoé.", attendu: 'avons fait',
    },
    {
      id: 's05-r5', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-etre',
      reserve: true,
      consigne: 'Conjugue le verbe au passé composé.',
      avant: 'Après le match, Noé ', verbe: 'rentrer', apres: ' à vélo.', attendu: 'est rentré',
    },
    {
      id: 's05-r6', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-etre',
      reserve: true,
      consigne: 'Conjugue le verbe au passé composé.',
      avant: 'Anto ', verbe: 'arriver', apres: ' en retard au cours de maths.', attendu: 'est arrivé',
    },
    {
      id: 's05-r7', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-etre',
      reserve: true,
      consigne: 'Conjugue le verbe au passé composé.',
      avant: 'Mon chat ', verbe: 'monter', apres: ' sur le toit du garage.', attendu: 'est monté',
    },
    {
      // mots[1] = 'est'.
      id: 's05-r8', rappel: 'r2', type: 'toucher', palier: 2, piege: 'participe-etre',
      reserve: true,
      consigne: "Touche l'auxiliaire du verbe au passé composé.",
      mots: ['Tom', 'est', 'sorti', 'de', 'la', 'salle', 'sans', 'un', 'bruit.'],
      attendus: [1],
    },
  ],
};
