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
  ],
};
