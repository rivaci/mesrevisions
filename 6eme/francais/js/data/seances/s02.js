// Séance 2 — Le présent : les verbes réguliers.
//
// Format : voir s06.js, la séance de référence.
//
// NOTE SUR LE PIÈGE : le catalogue ne contient pas d'entrée propre à *être* et
// *avoir* ('irregulier' ne nomme que les huit verbes du programme, qui ne les
// incluent pas). 'sujet-colle' est le plus proche pour les paliers 1 et 2 : la
// difficulté y est bien de remonter au sujet avant de choisir la terminaison.
// Le palier 3 utilise 'radical-premier-groupe', qui lui correspond exactement.

export default {
  numero: 2,
  bloc: 1,
  titre: 'Le présent : les verbes réguliers',
  sousTitre: 'Ceux qui suivent le modèle — et ceux qui bougent un peu',
  objectif:
    'Écrire au présent être, avoir et les verbes des deux premiers groupes, y compris ceux dont le radical change.',

  rappels: [
    {
      id: 'r1',
      titre: 'Les terminaisons du présent',
      texte:
        "**1ᵉʳ groupe** (chanter) : -e, -es, -e, -ons, -ez, **-ent**.\n\n" +
        "**2ᵉ groupe** (finir) : -is, -is, -it, **-issons**, -issez, -issent.\n\n" +
        "**être** : je suis, tu es, il est, nous sommes, vous êtes, ils **sont**.\n" +
        "**avoir** : j'ai, tu as, il a, nous avons, vous avez, ils **ont**.\n\n" +
        "Le *-ent* du pluriel ne s'entend pas : *il joue* et *ils jouent* se disent pareil. " +
        "C'est le sujet qui tranche, jamais l'oreille.",
      exemples: [
        { phrase: 'Mon cousin **joue** au foot.', note: 'Un seul → *joue*.' },
        { phrase: 'Mes cousins **jouent** au foot.', note: 'Plusieurs → *jouent*. Même son, autre orthographe.' },
      ],
      // Le point de la leçon est un SILENCE : « joue » et « jouent » se disent
      // pareil. Un texte peut l'affirmer ; l'animation le fait voir, en changeant
      // le sujet et en montrant la terminaison bouger toute seule.
      animation: {
        mots: ['Mon', 'cousin', 'joue', 'au', 'foot.'],
        scenes: [
          { type: 'surligner', mots: [2], role: 'verbe', texte: 'Le verbe : « joue ».' },
          { type: 'surligner', mots: [1], role: 'sujet',
            texte: 'Qui est-ce qui joue ? Un cousin. Un seul.' },
          { type: 'fleche', de: 1, vers: 2, label: 'sujet → verbe',
            texte: 'Un seul cousin commande la terminaison : « joue ».' },
          { type: 'dire', texte: 'Maintenant, mets-en plusieurs.' },
          { type: 'terminaison', mot: 0, devient: 'Mes',
            texte: 'Le déterminant passe au pluriel : « mes ».' },
          { type: 'terminaison', mot: 1, devient: 'cousins',
            texte: 'Le nom suit : « mes cousins ».' },
          { type: 'terminaison', mot: 2, devient: 'jouent',
            texte: 'Le verbe suit : « jouent ». Écoute bien — ça se prononce exactement pareil.' },
        ],
      },
    },
    {
      id: 'r2',
      titre: 'Le 1ᵉʳ groupe qui bouge',
      texte:
        "Cinq familles de verbes en *-er* modifient leur radical selon la personne :\n\n" +
        "**-cer** → *ç* devant le *o* : nous plaçons, nous commençons.\n" +
        "**-ger** → un *e* devant le *o* : nous mangeons, nous rangeons.\n" +
        "**-yer** → le *y* devient *i*, sauf avec *nous* et *vous* : je nettoie, mais nous nettoyons.\n" +
        "**-eler / -eter** → la consonne double quand on entend le *è* : j'appelle, je jette — " +
        "mais nous appelons, vous jetez.\n\n" +
        "Pour *-yer*, *-eler* et *-eter*, le repère est toujours le même : " +
        "*nous* et *vous* gardent le radical de l'infinitif.",
      exemples: [
        { phrase: "J'**appelle** mon frère.", note: "On entend *è* → la consonne double." },
        { phrase: 'Nous **appelons** nos parents.', note: 'Avec *nous*, le radical redevient celui de l\'infinitif.' },
      ],
      // Ici c'est l'OREILLE qui décide, pour une fois : on entend « è », la
      // consonne double. L'animation fait entendre les deux formes à la suite,
      // ce qu'une liste de règles ne peut pas faire.
      animation: {
        mots: ['J\'', 'appelle', 'Léa.'],
        scenes: [
          { type: 'dire', texte: 'Écoute la fin du radical : « j\'app-È-lle ».' },
          { type: 'surligner', mots: [1], role: 'accord',
            texte: 'On entend « è » → la consonne double : deux L.' },
          { type: 'dire', texte: 'Change la personne : passe à « nous ».' },
          { type: 'terminaison', mot: 0, devient: 'Nous', texte: 'Le sujet devient « nous ».' },
          { type: 'terminaison', mot: 1, devient: 'appelons',
            texte: 'On dit « app-e-lons », plus de « è » — un seul L. Avec nous et vous, le radical redevient celui de l\'infinitif.' },
        ],
      },
    },
  ],

  exercices: [
    // ── Palier 1 : être et avoir ──────────────────────────────────────────
    // Le piège joue quand le sujet est un groupe nominal qu'il faut d'abord
    // repérer et compter.
    {
      id: 's02-e1', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-colle',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Les joueurs ', verbe: 'être', apres: ' sur le terrain.', attendu: 'sont',
    },
    {
      id: 's02-e2', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-colle',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Ma cousine ', verbe: 'avoir', apres: ' un nouveau lapin.', attendu: 'a',
    },
    {
      // NEUTRE : le sujet est un pronom, il n'y a rien à chercher. Sans ces
      // items, Anto apprendrait « il faut toujours compter des noms » et
      // hésiterait sur les phrases les plus simples.
      id: 's02-e3', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-colle',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Nous ', verbe: 'être', apres: ' en retard.', attendu: 'sommes',
    },
    {
      // NEUTRE
      id: 's02-e4', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-colle',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Tu ', verbe: 'avoir', apres: ' de la chance.', attendu: 'as',
    },

    // ── Palier 2 : 1ᵉʳ et 2ᵉ groupes ──────────────────────────────────────
    // Le piège joue sur le *-ent* muet du 1ᵉʳ groupe.
    {
      id: 's02-e5', rappel: 'r1', type: 'completer', palier: 2, piege: 'sujet-colle',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Les enfants ', verbe: 'chanter', apres: ' devant leurs parents.', attendu: 'chantent',
    },
    {
      id: 's02-e6', rappel: 'r1', type: 'completer', palier: 2, piege: 'sujet-colle',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Mes copains ', verbe: 'arriver', apres: ' à midi.', attendu: 'arrivent',
    },
    {
      // NEUTRE : 2ᵉ groupe, la terminaison s'entend nettement — le piège du
      // pluriel muet ne joue pas.
      id: 's02-e7', rappel: 'r1', type: 'completer', palier: 2, piege: 'sujet-colle',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Nous ', verbe: 'grandir', apres: ' vite cette année.', attendu: 'grandissons',
    },
    {
      // NEUTRE
      id: 's02-e8', rappel: 'r1', type: 'completer', palier: 2, piege: 'sujet-colle',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Anto ', verbe: 'choisir', apres: ' son dessert.', attendu: 'choisit',
    },

    // ── Palier 3 : le radical qui bouge ───────────────────────────────────
    // Le piège joue aux personnes où le radical change ; il ne joue pas avec
    // *nous* et *vous*, qui gardent le radical de l'infinitif.
    {
      id: 's02-e9', rappel: 'r2', type: 'completer', palier: 3, piege: 'radical-premier-groupe',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Nous ', verbe: 'manger', apres: ' à la cantine.', attendu: 'mangeons',
    },
    {
      id: 's02-e10', rappel: 'r2', type: 'completer', palier: 3, piege: 'radical-premier-groupe',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Nous ', verbe: 'commencer', apres: ' le match.', attendu: 'commençons',
    },
    {
      id: 's02-e11', rappel: 'r2', type: 'completer', palier: 3, piege: 'radical-premier-groupe',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Elle ', verbe: 'nettoyer', apres: ' la cage du hamster.', attendu: 'nettoie',
    },
    {
      // NEUTRE : même verbe, mais avec *nous* le y reste. Sans cet item, Anto
      // apprendrait « nettoyer → nettoi- toujours ».
      id: 's02-e12', rappel: 'r2', type: 'completer', palier: 3, piege: 'radical-premier-groupe',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Nous ', verbe: 'nettoyer', apres: ' le tableau.', attendu: 'nettoyons',
    },
    {
      id: 's02-e13', rappel: 'r2', type: 'completer', palier: 3, piege: 'radical-premier-groupe',
      consigne: 'Conjugue le verbe au présent.',
      avant: "J'", verbe: 'appeler', apres: ' mes copains.', attendu: 'appelle',
    },
    {
      // NEUTRE : la consonne ne double pas avec *vous*.
      id: 's02-e14', rappel: 'r2', type: 'completer', palier: 3, piege: 'radical-premier-groupe',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Vous ', verbe: 'jeter', apres: ' vos papiers dans la poubelle.', attendu: 'jetez',
    },

    // ── Palier 1 (suite) : désigner le sujet, pas seulement l'accorder ─────
    // Écrire la bonne forme sans savoir dire pourquoi ne tient pas en dictée :
    // il faut aussi pouvoir montrer le mot qui commande.
    {
      id: 's02-e15', rappel: 'r1', type: 'toucher', palier: 1, piege: 'sujet-colle',
      consigne: 'Touche le sujet du verbe.',
      mots: ['Mon', 'frère', 'a', 'deux', 'poissons', 'rouges.'], attendus: [1],
    },
    {
      id: 's02-e16', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-colle',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Mes grands-parents ', verbe: 'avoir', apres: ' un vieux chien.', attendu: 'ont',
    },

    // ── Palier 2 (suite) ──────────────────────────────────────────────────
    {
      // Les deux formes se prononcent pareil : mises côte à côte, elles
      // obligent à trancher par le sujet et non à l'oreille.
      id: 's02-e17', rappel: 'r1', type: 'qcm', palier: 2, piege: 'sujet-colle',
      consigne: 'Choisis la forme qui convient.',
      avant: 'Les voisins ', apres: ' de la musique très fort.',
      choix: ['écoute', 'écoutent'], attendu: 'écoutent',
    },
    {
      // NEUTRE : au 2ᵉ groupe la terminaison du pluriel s'entend, le piège du
      // *-ent* muet ne joue pas.
      id: 's02-e18', rappel: 'r1', type: 'completer', palier: 2, piege: 'sujet-colle',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Vous ', verbe: 'applaudir', apres: ' le gagnant.', attendu: 'applaudissez',
    },

    // ── Palier 3 (suite) ──────────────────────────────────────────────────
    {
      id: 's02-e19', rappel: 'r2', type: 'completer', palier: 3, piege: 'radical-premier-groupe',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Zoé ', verbe: 'jeter', apres: ' son vieux cahier.', attendu: 'jette',
    },
    {
      // NEUTRE : le pendant de « j'appelle » — avec *nous*, la consonne ne
      // double pas. Le couple des deux items empêche de retenir « appeler →
      // toujours deux l ».
      id: 's02-e20', rappel: 'r2', type: 'completer', palier: 3, piege: 'radical-premier-groupe',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Nous ', verbe: 'appeler', apres: " l'entraîneur.", attendu: 'appelons',
    },

    // ── Réserve ───────────────────────────────────────────────────────────
    // Jamais jouées dans le parcours. Elles servent à la reprise en début de
    // séance suivante et à la seconde chance après une erreur, qui exigent
    // toutes deux une phrase JAMAIS VUE portant le même piège. Elles sont donc
    // toutes piégeantes : une phrase neutre ne prouverait rien d'une reprise.
    {
      id: 's02-r1', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-colle',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Les surveillants ', verbe: 'être', apres: ' devant le portail.', attendu: 'sont',
    },
    {
      id: 's02-r2', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-colle',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Mes voisines ', verbe: 'avoir', apres: ' un trampoline.', attendu: 'ont',
    },
    {
      id: 's02-r3', rappel: 'r1', type: 'completer', palier: 2, piege: 'sujet-colle',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Les joueurs ', verbe: 'crier', apres: ' de joie après le but.', attendu: 'crient',
    },
    {
      id: 's02-r4', rappel: 'r1', type: 'toucher', palier: 2, piege: 'sujet-colle',
      reserve: true,
      consigne: 'Touche le sujet du verbe.',
      mots: ['Les', 'deux', 'frères', 'préparent', 'le', 'goûter.'], attendus: [2],
    },
    {
      id: 's02-r5', rappel: 'r1', type: 'qcm', palier: 2, piege: 'sujet-colle',
      reserve: true,
      consigne: 'Choisis la forme qui convient.',
      avant: 'Les spectateurs ', apres: " l'équipe jusqu'à la fin du match.",
      choix: ['encourage', 'encouragent'], attendu: 'encouragent',
    },
    {
      id: 's02-r6', rappel: 'r2', type: 'completer', palier: 3, piege: 'radical-premier-groupe',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Nous ', verbe: 'lancer', apres: ' le ballon très haut.', attendu: 'lançons',
    },
    {
      id: 's02-r7', rappel: 'r2', type: 'completer', palier: 3, piege: 'radical-premier-groupe',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Hugo ', verbe: 'essuyer', apres: ' la table après le repas.', attendu: 'essuie',
    },
    {
      id: 's02-r8', rappel: 'r2', type: 'completer', palier: 3, piege: 'radical-premier-groupe',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Nous ', verbe: 'partager', apres: ' le gâteau en huit parts.', attendu: 'partageons',
    },
    {
      id: 's02-r9', rappel: 'r2', type: 'completer', palier: 3, piege: 'radical-premier-groupe',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Emma ', verbe: 'appeler', apres: ' sa meilleure amie.', attendu: 'appelle',
    },
    {
      id: 's02-r10', rappel: 'r2', type: 'completer', palier: 3, piege: 'radical-premier-groupe',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Tu ', verbe: 'jeter', apres: ' un caillou dans la rivière.', attendu: 'jettes',
    },
  ],
};
