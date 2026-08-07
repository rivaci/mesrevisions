// Séance 4 — L'imparfait et le futur.
//
// Format et conventions : voir s06.js, la séance de référence.
//
// Deux temps qui portent chacun une MARQUE visible : -ai-/-i- pour l'imparfait,
// -r- pour le futur. Les trois paliers isolent trois questions distinctes, une
// par piège, pour qu'Anto sache toujours ce qu'on lui demande de chercher :
//
//   1. `sujet-colle`             quelle terminaison ? → c'est le sujet qui décide,
//                                puisque -ait et -aient se prononcent pareil ;
//   2. `irregulier`              quel radical ? → les huit verbes à savoir par cœur ;
//   3. `radical-premier-groupe`  quand la consonne double-t-elle ?
//
// Les neutres du palier 1 sont aux personnes *nous* / *vous*, là où la
// terminaison s'entend : le piège ne joue pas, et Anto ne peut pas retenir
// « à l'imparfait, on hésite toujours entre -ait et -aient ».
//
// Le neutre le plus utile de la séance est s04-e12 : *appeler à l'imparfait*.
// Même verbe et même personne qu'à l'exercice précédent, mais pas de double
// consonne. Sans lui, Anto retient « appeler → deux L » au lieu de la vraie
// condition (la consonne double quand la terminaison est muette).

export default {
  numero: 4,
  bloc: 1,
  titre: "L'imparfait et le futur",
  sousTitre: 'Deux temps, deux marques à repérer',
  objectif:
    "Écrire un verbe à l'imparfait et au futur en s'appuyant sur la marque du temps, " +
    'même quand le radical change.',

  rappels: [
    {
      id: 'r1',
      titre: "L'imparfait : une seule série de terminaisons",
      texte:
        "À l'imparfait, **tous les verbes** prennent les mêmes terminaisons, " +
        'sans aucune exception : **-ais, -ais, -ait, -ions, -iez, -aient**.\n\n' +
        "La marque du temps, c'est le **-ai-** ou le **-i-** juste avant la fin.\n\n" +
        "Laquelle des six choisir ? C'est le **sujet** qui décide — et *-ait* et " +
        "*-aient* se prononcent exactement pareil, donc l'oreille ne sert à rien.\n\n" +
        'Ce qui change ensuite, c\'est le **radical** : prends le verbe avec *nous* ' +
        'au présent et enlève *-ons*. *nous fais**ons*** → **fais-** → *je faisais*.',
      exemples: [
        { phrase: 'Le gardien **arrêtait** tous les ballons.', note: 'Un seul gardien → *-ait*.' },
        { phrase: 'Les joueurs **arrêtaient** de courir.', note: 'Plusieurs → *-aient*. Même son, autre orthographe.' },
        { phrase: 'Nous **faisions** du judo.', note: '*nous faisons* → radical **fais-**, puis *-ions*.' },
      ],
      // -ait et -aient se prononcent exactement pareil : c'est une leçon qu'on
      // ne peut pas entendre. On la donne donc à VOIR — même phrase, même son,
      // deux orthographes, et c'est le sujet qui a tranché.
      animation: {
        mots: ['Le', 'gardien', 'arrêtait', 'les', 'ballons.'],
        scenes: [
          { type: 'surligner', mots: [2], role: 'verbe',
            texte: 'Le verbe est à l\'imparfait : « arrêtait ».' },
          { type: 'surligner', mots: [1], role: 'sujet',
            texte: 'Qui est-ce qui arrêtait ? Le gardien. Un seul → -ait.' },
          { type: 'dire', texte: 'Mets-en plusieurs, et n\'écoute surtout pas.' },
          { type: 'terminaison', mot: 0, devient: 'Les', texte: 'Le déterminant passe au pluriel.' },
          { type: 'terminaison', mot: 1, devient: 'gardiens', texte: 'Le nom aussi : « les gardiens ».' },
          { type: 'terminaison', mot: 2, devient: 'arrêtaient',
            texte: '-ait devient -aient. Ça se prononce pareil : seul le sujet t\'a dit lequel écrire.' },
        ],
      },
    },
    {
      id: 'r2',
      titre: 'Le futur : la marque -r-',
      texte:
        'Au futur, il y a toujours un **-r-** avant la terminaison : ' +
        '*je chante**r**ai*, *nous fini**r**ons*. Pas de -r-, pas de futur.\n\n' +
        "Pour les verbes en *-er* et *-ir*, on garde **l'infinitif entier** et on " +
        'ajoute *-ai, -as, -a, -ons, -ez, -ont*.\n\n' +
        "*appeler* et *jeter* font exception : au futur, leur consonne double à " +
        "**toutes** les personnes — *j'appe**ll**erai*, *tu appe**ll**eras*, " +
        '*nous appe**ll**erons* ; *je je**tt**erai*, *ils je**tt**eront*.\n\n' +
        'Huit verbes se fabriquent un radical à eux — il faut les savoir par cœur :\n' +
        "*je **ferai***, *j'**irai***, *je **dirai***, *je **viendrai***, " +
        '*je **pourrai***, *je **verrai***, *je **voudrai***, *je **prendrai***.',
      exemples: [
        { phrase: 'Demain, je **visiterai** le musée.', note: 'Infinitif *visiter* + *-ai*. Le **-r-** est déjà dans le verbe.' },
        { phrase: "Samedi, j'**irai** au cinéma.", note: '*aller* ne donne pas « allerai » : son radical de futur est **ir-**.' },
      ],
      // « Pas de -r-, pas de futur » : la règle tient en une lettre, et cette
      // lettre est minuscule au milieu d'un mot. L'animation la fait apparaître
      // seule, puis montre le seul cas où elle ne suffit pas.
      animation: {
        mots: ['Demain,', 'tu', 'visites', 'le', 'musée.'],
        scenes: [
          { type: 'dire', texte: '« Demain » annonce le futur. Mais le verbe, lui, est au présent.' },
          { type: 'fausse-piste', mot: 2,
            texte: '« tu visites » : cherche le -r-. Il n\'y en a pas — donc ce n\'est pas du futur.' },
          { type: 'terminaison', mot: 2, devient: 'visiteras',
            texte: 'Au futur : l\'infinitif entier, « visiter », plus -as. Le -r- est déjà dedans.' },
          { type: 'surligner', mots: [2], role: 'accord',
            texte: 'Pas de -r-, pas de futur. C\'est le test le plus rapide de la séance.' },
          // Les huit radicaux irréguliers se DISENT ici plutôt que de se jouer :
          // remplacer « visiter » par « aller » casserait le complément
          // (« tu iras le musée »), et l'animation apprendrait une faute.
          { type: 'dire',
            texte: 'Huit verbes se fabriquent un radical à eux : « aller » donne « tu iras », jamais « tu alleras ». Le -r- est là, le radical a disparu.' },
        ],
      },
    },
  ],

  exercices: [
    // ── Palier 1 : à l'imparfait, c'est le sujet qui choisit la fin ───────
    {
      id: 's04-e1', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-colle',
      consigne: "Conjugue le verbe à l'imparfait.",
      avant: 'À la récréation, les élèves ', verbe: 'finir', apres: ' leur partie de cartes.', attendu: 'finissaient',
    },
    {
      // NEUTRE : à la 2ᵉ personne du pluriel, la terminaison s'entend. Le piège
      // ne joue pas — et Anto ne peut pas retenir « imparfait = -ait ou -aient ».
      id: 's04-e2', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-colle',
      neutre: true,
      consigne: "Conjugue le verbe à l'imparfait.",
      avant: 'Le mercredi, vous ', verbe: 'jouer', apres: ' au basket au gymnase.', attendu: 'jouiez',
    },
    {
      id: 's04-e3', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-colle',
      consigne: "Conjugue le verbe à l'imparfait.",
      avant: 'Mon voisin ', verbe: 'arroser', apres: ' son jardin tous les soirs.', attendu: 'arrosait',
    },
    {
      // NEUTRE
      id: 's04-e4', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-colle',
      neutre: true,
      consigne: "Conjugue le verbe à l'imparfait.",
      avant: 'Pendant les vacances, nous ', verbe: 'partir', apres: ' à la mer chaque été.', attendu: 'partions',
    },

    // ── Palier 2 : le radical des huit irréguliers, aux deux temps ────────
    {
      id: 's04-e5', rappel: 'r1', type: 'completer', palier: 2, piege: 'irregulier',
      consigne: "Conjugue le verbe à l'imparfait.",
      avant: 'Quand il était petit, mon frère ', verbe: 'aller', apres: " à l'école à pied.", attendu: 'allait',
    },
    {
      // NEUTRE : verbe régulier, radical prévisible. Sans ces items, Anto
      // apprendrait « à l'imparfait, le début du mot change toujours ».
      id: 's04-e6', rappel: 'r1', type: 'completer', palier: 2, piege: 'irregulier',
      neutre: true,
      consigne: "Conjugue le verbe à l'imparfait.",
      avant: 'Chaque samedi, nous ', verbe: 'regarder', apres: ' un film ensemble.', attendu: 'regardions',
    },
    {
      id: 's04-e7', rappel: 'r1', type: 'completer', palier: 2, piege: 'irregulier',
      consigne: "Conjugue le verbe à l'imparfait.",
      avant: 'De ma fenêtre, je ', verbe: 'voir', apres: ' tout le terrain de foot.', attendu: 'voyais',
    },
    {
      id: 's04-e8', rappel: 'r2', type: 'completer', palier: 2, piege: 'irregulier',
      consigne: 'Conjugue le verbe au futur.',
      avant: 'Samedi prochain, tu ', verbe: 'aller', apres: ' au cinéma avec Léo.', attendu: 'iras',
    },
    {
      // NEUTRE : infinitif entier + terminaison, aucune surprise au futur.
      id: 's04-e9', rappel: 'r2', type: 'completer', palier: 2, piege: 'irregulier',
      neutre: true,
      consigne: 'Conjugue le verbe au futur.',
      avant: 'Demain, nous ', verbe: 'visiter', apres: ' le château avec la classe.', attendu: 'visiterons',
    },
    {
      // mots[9] = 'prendrai', le seul verbe qui porte le -r- du futur.
      // 'prenais' (mots[2]) est le même verbe à l'imparfait : c'est la marque
      // du temps, pas le verbe, qui permet de trancher.
      id: 's04-e10', rappel: 'r2', type: 'toucher', palier: 2, piege: 'irregulier',
      consigne: 'Touche le verbe conjugué au futur.',
      mots: ['Avant,', 'je', 'prenais', 'le', 'bus,', 'mais', "l'an", 'prochain,', 'je', 'prendrai', 'le', 'train.'],
      attendus: [9],
    },

    // ── Palier 3 : le radical des verbes en -er qui double sa consonne ────
    {
      id: 's04-e11', rappel: 'r2', type: 'completer', palier: 3, piege: 'radical-premier-groupe',
      consigne: 'Conjugue le verbe au futur.',
      avant: 'Ce soir, tu ', verbe: 'appeler', apres: ' ton grand-père.', attendu: 'appelleras',
    },
    {
      // NEUTRE — le plus important de la séance : même verbe, même personne
      // qu'à l'exercice précédent, mais à l'imparfait le radical ne double pas.
      // Sans lui, Anto retient « appeler → deux L » au lieu de la condition.
      id: 's04-e12', rappel: 'r1', type: 'completer', palier: 3, piege: 'radical-premier-groupe',
      neutre: true,
      consigne: "Conjugue le verbe à l'imparfait.",
      avant: "L'an dernier, tu ", verbe: 'appeler', apres: ' ton grand-père tous les dimanches.', attendu: 'appelais',
    },
    {
      id: 's04-e13', rappel: 'r2', type: 'completer', palier: 3, piege: 'radical-premier-groupe',
      consigne: 'Conjugue le verbe au futur.',
      avant: 'Après le goûter, les enfants ', verbe: 'jeter', apres: ' leurs emballages à la poubelle.', attendu: 'jetteront',
    },
    {
      // NEUTRE : verbe en -er dont le radical ne bouge jamais.
      id: 's04-e14', rappel: 'r2', type: 'completer', palier: 3, piege: 'radical-premier-groupe',
      neutre: true,
      consigne: 'Conjugue le verbe au futur.',
      avant: 'Dimanche, nous ', verbe: 'jouer', apres: ' au foot avec les voisins.', attendu: 'jouerons',
    },

    // ── Seconde vague, même progression : on repasse par les trois paliers ──
    //
    // Quatre exercices par palier ne suffisent pas à installer un réflexe :
    // Anto trouve la réponse, passe à la suite, et à la dictée suivante il
    // hésite encore. Ces six-là reprennent les trois mêmes questions avec
    // d'autres verbes et d'autres personnes, pour que ce soit la démarche qui
    // reste, pas la phrase.
    {
      id: 's04-e15', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-colle',
      consigne: "Conjugue le verbe à l'imparfait.",
      avant: 'Le samedi, Zoé ', verbe: 'retrouver', apres: ' ses cousines au parc.', attendu: 'retrouvait',
    },
    {
      // Les deux formes proposées se prononcent exactement pareil : seul le
      // sujet permet de trancher, et c'est tout l'enjeu du palier.
      id: 's04-e16', rappel: 'r1', type: 'qcm', palier: 1, piege: 'sujet-colle',
      consigne: "Choisis la forme qui s'accorde avec le sujet.",
      avant: 'Pendant le cours de dessin, les élèves ', apres: ' sur leurs cahiers.',
      choix: ['dessinait', 'dessinaient'], attendu: 'dessinaient',
    },
    {
      id: 's04-e17', rappel: 'r2', type: 'completer', palier: 2, piege: 'irregulier',
      consigne: 'Conjugue le verbe au futur.',
      avant: 'Après le collège, mes cousins ', verbe: 'venir', apres: ' réviser à la maison.', attendu: 'viendront',
    },
    {
      id: 's04-e18', rappel: 'r2', type: 'completer', palier: 2, piege: 'irregulier',
      consigne: 'Conjugue le verbe au futur.',
      avant: 'Ce week-end, je ', verbe: 'faire', apres: ' un gâteau avec Emma.', attendu: 'ferai',
    },
    {
      id: 's04-e19', rappel: 'r2', type: 'completer', palier: 3, piege: 'radical-premier-groupe',
      consigne: 'Conjugue le verbe au futur.',
      avant: 'Demain, Sarah ', verbe: 'appeler', apres: ' Emma pour organiser la sortie.', attendu: 'appellera',
    },
    {
      // NEUTRE, en miroir de s04-e13 : même verbe *jeter*, mais à l'imparfait
      // la consonne ne double pas. Le couple des deux items dit la condition —
      // sans lui, Anto retiendrait « jeter → deux T, toujours ».
      id: 's04-e20', rappel: 'r1', type: 'completer', palier: 3, piege: 'radical-premier-groupe',
      neutre: true,
      consigne: "Conjugue le verbe à l'imparfait.",
      avant: "L'an dernier, Tom ", verbe: 'jeter', apres: " son cartable dans l'entrée.", attendu: 'jetait',
    },

    // ── Réserve ──────────────────────────────────────────────────────────
    //
    // `reserve: true` : ces phrases ne sont PAS jouées dans le parcours. Elles
    // restent intactes pour la reprise en début de séance suivante et pour la
    // seconde chance après une erreur — qui exigent l'une comme l'autre une
    // phrase JAMAIS vue portant le même piège. Toutes piègent vraiment : les
    // reprises écartent les items neutres, une réserve neutre ne servirait
    // jamais.
    {
      id: 's04-r1', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-colle',
      reserve: true,
      consigne: "Conjugue le verbe à l'imparfait.",
      avant: 'Chaque dimanche, mon oncle ', verbe: 'préparer', apres: ' des crêpes.', attendu: 'préparait',
    },
    {
      id: 's04-r2', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-colle',
      reserve: true,
      consigne: "Conjugue le verbe à l'imparfait.",
      avant: 'Avant, les voisins ', verbe: 'promener', apres: ' leur chien le matin.', attendu: 'promenaient',
    },
    {
      id: 's04-r3', rappel: 'r1', type: 'toucher', palier: 1, piege: 'sujet-colle',
      reserve: true,
      consigne: 'Touche le sujet du verbe.',
      mots: ['Pendant', 'la', 'récréation,', 'les', 'grands', 'jouaient', 'au', 'ballon.'],
      attendus: [4],
    },
    {
      id: 's04-r4', rappel: 'r2', type: 'completer', palier: 2, piege: 'irregulier',
      reserve: true,
      consigne: 'Conjugue le verbe au futur.',
      avant: 'Si tu finis tes devoirs, tu ', verbe: 'pouvoir', apres: ' regarder un épisode.', attendu: 'pourras',
    },
    {
      id: 's04-r5', rappel: 'r2', type: 'completer', palier: 2, piege: 'irregulier',
      reserve: true,
      consigne: 'Conjugue le verbe au futur.',
      avant: 'Demain, Noé ', verbe: 'dire', apres: ' le résultat du match à toute la classe.', attendu: 'dira',
    },
    {
      id: 's04-r6', rappel: 'r2', type: 'qcm', palier: 2, piege: 'irregulier',
      reserve: true,
      consigne: 'Choisis la forme correcte du futur.',
      avant: 'Samedi, nous ', apres: ' à la piscine avec la classe.',
      choix: ['allerons', 'irons'], attendu: 'irons',
    },
    {
      id: 's04-r7', rappel: 'r2', type: 'completer', palier: 3, piege: 'radical-premier-groupe',
      reserve: true,
      consigne: 'Conjugue le verbe au futur.',
      avant: 'Après le match, les entraîneurs ', verbe: 'appeler', apres: ' les joueurs.', attendu: 'appelleront',
    },
    {
      id: 's04-r8', rappel: 'r2', type: 'completer', palier: 3, piege: 'radical-premier-groupe',
      reserve: true,
      consigne: 'Conjugue le verbe au futur.',
      avant: 'Ce soir, Anto ', verbe: 'jeter', apres: ' les papiers dans la poubelle jaune.', attendu: 'jettera',
    },
    {
      id: 's04-r9', rappel: 'r2', type: 'completer', palier: 3, piege: 'radical-premier-groupe',
      reserve: true,
      consigne: 'Conjugue le verbe au futur.',
      avant: 'Dimanche, nous ', verbe: 'appeler', apres: ' Mamie pour son anniversaire.', attendu: 'appellerons',
    },
  ],
};
