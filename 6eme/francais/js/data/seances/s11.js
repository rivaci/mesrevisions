// Séance 11 — « é ou er ? »
//
// Format : voir s06.js, la séance de référence.
//
// Le type `qcm` n'apparaissait pas dans s06. Il reprend le cadre de phrase de
// `completer` — `avant` / `apres` — et y ajoute `choix`, les formes
// concurrentes, dont `attendu` est l'une, à la lettre près.
//
// NEUTRES. Ici le piège tient au SON : -é et -er se prononcent pareil. Un item
// neutre est donc un item où ce son ne piège pas — un verbe du 3ᵉ groupe, où
// « pris » et « prendre » s'entendent nettement. Le raisonnement demandé reste
// exactement le même (infinitif, ou participe ?), mais l'élève ne peut pas
// s'en tirer en piochant au hasard entre deux formes qui sonnent pareil : il
// doit faire le test. Sans ces items, il apprendrait à jouer à pile ou face.
//
// Les phrases où « a » ou « est » figure alors que la réponse est -er ne sont
// pas neutres : ce sont les pièges les plus utiles de la séance, ceux qui
// cassent le faux réflexe « il y a "a" dans la phrase, donc -é ».

export default {
  numero: 11,
  bloc: 3,
  titre: 'é ou er ?',
  sousTitre: 'Le test « vendre / vendu »',
  objectif: "Choisir entre -é et -er en remplaçant le verbe par « vendre ».",

  rappels: [
    {
      id: 'r1',
      titre: 'Le test « vendre / vendu »',
      texte:
        "À l'oreille, **-é** et **-er**, c'est le même son. Écouter ne sert à rien : " +
        "il faut un test.\n\n" +
        "**Remplace le verbe par « vendre ».**\n\n" +
        "Si **vendre** va → on écrit **-er**. Si c'est **vendu** qui va → on écrit **-é**.\n\n" +
        "C'est le test le plus rentable de toute l'orthographe : il tranche à tous les coups.",
      // Le test le plus rentable de l'orthographe se joue en deux temps : on
      // substitue, on regarde ce qui tient. Voir « vendre » puis « vendu »
      // prendre la place du verbe vaut mieux que lire la consigne.
      animation: {
        mots: ['Il', 'va', 'jouer', 'dehors.'],
        scenes: [
          { type: 'dire', texte: 'À l\'oreille, -é et -er, c\'est le même son. Écouter ne sert à rien.' },
          { type: 'terminaison', mot: 2, devient: 'vendre',
            texte: 'Remplace le verbe par « vendre » : « Il va vendre ». Ça tient.' },
          { type: 'terminaison', mot: 2, devient: 'jouer',
            texte: 'Donc on écrit -er : « il va jouer ».' },
          { type: 'dire', texte: 'Change le début de la phrase, et refais le test.' },
          // On repose « vendre » AVANT de changer l'auxiliaire : dans l'autre
          // ordre, l'écran affichait « Il a jouer dehors » — l'erreur exacte que
          // la séance corrige, écrite en grand et présentée comme une phrase.
          { type: 'terminaison', mot: 2, devient: 'vendre', texte: 'On repart du test : « Il va vendre ».' },
          { type: 'terminaison', mot: 1, devient: 'a', texte: '« Il a vendre » ? Ça ne tient plus.' },
          { type: 'terminaison', mot: 2, devient: 'vendu',
            texte: 'C\'est « vendu » qui va, cette fois : « Il a vendu ».' },
          { type: 'terminaison', mot: 2, devient: 'joué',
            texte: 'Donc -é : « il a joué dehors ». Le test tranche à tous les coups.' },
        ],
      },
      exemples: [
        { phrase: 'Il va **jouer** dehors.', note: '« Il va **vendre** » → ça tient, donc **-er**.' },
        { phrase: 'Il a **joué** dehors.', note: '« Il a **vendu** » → ça tient, donc **-é**.' },
      ],
    },
    {
      id: 'r2',
      titre: 'Les faux indices',
      texte:
        "Après **à, de, pour, sans**, et après un autre verbe (**il va, il veut, il faut**), " +
        "c'est l'infinitif : **-er**.\n\n" +
        "Méfie-toi du faux indice : voir « a » ou « est » quelque part dans la phrase ne " +
        "prouve rien. Dans *il a des devoirs à terminer*, le verbe suit **à**, pas **a**.\n\n" +
        "Ne regarde pas les petits mots : fais le test, lui ne se trompe jamais.",
      // Le faux indice est un « a » qui traîne ailleurs dans la phrase. On le
      // barre pour de bon, puis on montre le vrai indice : la préposition qui
      // précède le verbe.
      animation: {
        mots: ['Il', 'a', 'des', 'devoirs', 'à', 'terminer.'],
        scenes: [
          { type: 'fausse-piste', mot: 1,
            texte: 'Il y a bien un « a » dans la phrase. Ça ne prouve rien du tout.' },
          { type: 'surligner', mots: [4], role: 'ecran',
            texte: 'Le verbe ne suit pas « a » : il suit « à ». Ce n\'est pas le même mot.' },
          { type: 'fleche', de: 4, vers: 5, label: 'annonce un infinitif',
            texte: 'Après à, de, pour, sans — et après un autre verbe — c\'est l\'infinitif.' },
          { type: 'terminaison', mot: 5, devient: 'vendre.',
            texte: 'Vérifie quand même : « des devoirs à vendre ». Ça tient.' },
          { type: 'terminaison', mot: 5, devient: 'terminer.',
            texte: 'Donc -er. Ne regarde pas les petits mots : fais le test, lui ne se trompe jamais.' },
        ],
      },
      exemples: [
        { phrase: 'Il a des devoirs à **terminer**.', note: '« des devoirs à **vendre** » → **-er**.' },
        { phrase: 'Le chat a **sauté** de la table.', note: '« Le chat a **vendu** » → **-é**.' },
      ],
    },
  ],

  exercices: [
    // ── Palier 1 : le test, en situation simple ──────────────────────────
    {
      id: 's11-e1', rappel: 'r1', type: 'qcm', palier: 1, piege: 'e-ou-er',
      consigne: 'Fais le test « vendre / vendu », puis choisis.',
      avant: 'Anto veut ', apres: ' au foot avec ses copains.',
      choix: ['joué', 'jouer'], attendu: 'jouer',
    },
    {
      id: 's11-e2', rappel: 'r1', type: 'qcm', palier: 1, piege: 'e-ou-er',
      consigne: 'Fais le test « vendre / vendu », puis choisis.',
      avant: 'Il a ', apres: ' toute la soirée.',
      choix: ['travaillé', 'travailler'], attendu: 'travaillé',
    },
    {
      id: 's11-e3', rappel: 'r1', type: 'completer', palier: 1, piege: 'e-ou-er',
      consigne: 'Fais le test « vendre / vendu », puis écris le verbe.',
      avant: 'Ma sœur va ', verbe: 'promener', apres: ' le chien.', attendu: 'promener',
    },
    {
      id: 's11-e4', rappel: 'r1', type: 'completer', palier: 1, piege: 'e-ou-er',
      consigne: 'Fais le test « vendre / vendu », puis écris le verbe.',
      avant: "J'ai ", verbe: 'oublier', apres: ' mon cartable dans le bus.', attendu: 'oublié',
    },
    {
      // NEUTRE : « pris » et « prendre » ne se prononcent pas pareil, donc le
      // piège du son ne joue pas. Le test, lui, reste à faire.
      id: 's11-e5', rappel: 'r1', type: 'completer', palier: 1, piege: 'e-ou-er',
      neutre: true,
      consigne: 'Fais le test « vendre / vendu », puis écris le verbe.',
      avant: 'Il a ', verbe: 'prendre', apres: ' le bus tout seul.', attendu: 'pris',
    },
    {
      // NEUTRE
      id: 's11-e6', rappel: 'r1', type: 'completer', palier: 1, piege: 'e-ou-er',
      neutre: true,
      consigne: 'Fais le test « vendre / vendu », puis écris le verbe.',
      avant: 'Tu peux ', verbe: 'ouvrir', apres: ' la fenêtre.', attendu: 'ouvrir',
    },

    // ── Palier 2 : les petits mots, et le faux indice « a / est » ────────
    {
      // Piège central du palier : « a » est là, et pourtant c'est -er.
      id: 's11-e7', rappel: 'r2', type: 'qcm', palier: 2, piege: 'e-ou-er',
      consigne: 'Fais le test « vendre / vendu », puis choisis.',
      avant: 'Il a beaucoup de devoirs à ', apres: ' ce soir.',
      choix: ['terminé', 'terminer'], attendu: 'terminer',
    },
    {
      id: 's11-e8', rappel: 'r2', type: 'completer', palier: 2, piege: 'e-ou-er',
      consigne: 'Fais le test « vendre / vendu », puis écris le verbe.',
      avant: 'Mon frère est ', verbe: 'aller', apres: ' à la piscine.', attendu: 'allé',
    },
    {
      id: 's11-e9', rappel: 'r2', type: 'qcm', palier: 2, piege: 'e-ou-er',
      consigne: 'Fais le test « vendre / vendu », puis choisis.',
      avant: 'Pour ', apres: ' cette partie, il faut de la chance.',
      choix: ['gagné', 'gagner'], attendu: 'gagner',
    },
    {
      // NEUTRE : « dit » et « dire » s'entendent, le son ne piège plus.
      id: 's11-e10', rappel: 'r2', type: 'completer', palier: 2, piege: 'e-ou-er',
      neutre: true,
      consigne: 'Fais le test « vendre / vendu », puis écris le verbe.',
      avant: 'Il est sorti sans ', verbe: 'dire', apres: ' au revoir.', attendu: 'dire',
    },
    {
      id: 's11-e11', rappel: 'r2', type: 'completer', palier: 2, piege: 'e-ou-er',
      consigne: 'Fais le test « vendre / vendu », puis écris le verbe.',
      avant: 'Le chat a ', verbe: 'sauter', apres: ' de la table.', attendu: 'sauté',
    },
    {
      // Deuxième phrase avec « a » et pourtant -er : le faux réflexe ne peut
      // pas se réinstaller.
      id: 's11-e12', rappel: 'r2', type: 'qcm', palier: 2, piege: 'e-ou-er',
      consigne: 'Fais le test « vendre / vendu », puis choisis.',
      avant: "Anto n'a pas pensé à ", apres: ' son cahier de maths.',
      choix: ['rapporté', 'rapporter'], attendu: 'rapporter',
    },
    {
      // NEUTRE
      id: 's11-e13', rappel: 'r2', type: 'completer', palier: 2, piege: 'e-ou-er',
      neutre: true,
      consigne: 'Fais le test « vendre / vendu », puis écris le verbe.',
      avant: 'Nous avons ', verbe: 'voir', apres: ' un film hier soir.', attendu: 'vu',
    },
    {
      id: 's11-e14', rappel: 'r2', type: 'toucher', palier: 2, piege: 'e-ou-er',
      consigne: 'Touche le verbe que tu peux remplacer par « vendre ».',
      mots: ['Il', 'a', 'décidé', 'de', 'ranger', 'sa', 'chambre.'], attendus: [4],
    },
    {
      // La virgule du complément en tête arrive sur un item PIÉGEANT : si elle
      // n'apparaissait que dans les neutres, Anto apprendrait la virgule au
      // lieu du test.
      id: 's11-e15', rappel: 'r1', type: 'qcm', palier: 1, piege: 'e-ou-er',
      consigne: 'Fais le test « vendre / vendu », puis choisis.',
      avant: 'Hier soir, Emma a ', apres: ' un gâteau au chocolat.',
      choix: ['préparé', 'préparer'], attendu: 'préparé',
    },
    {
      id: 's11-e16', rappel: 'r1', type: 'completer', palier: 1, piege: 'e-ou-er',
      consigne: 'Fais le test « vendre / vendu », puis écris le verbe.',
      avant: 'Hugo va ', verbe: 'nager', apres: ' à la piscine avec Tom.', attendu: 'nager',
    },
    {
      // NEUTRE : « écrit » et « écrire » ne sonnent pas pareil. Le test reste
      // à faire, mais le tirage au sort entre deux formes identiques à
      // l'oreille n'est plus possible.
      id: 's11-e17', rappel: 'r1', type: 'completer', palier: 1, piege: 'e-ou-er',
      neutre: true,
      consigne: 'Fais le test « vendre / vendu », puis écris le verbe.',
      avant: 'Zoé a ', verbe: 'écrire', apres: ' une lettre à sa grand-mère.', attendu: 'écrit',
    },
    {
      // Troisième phrase où « a » figure alors que la réponse est -er.
      id: 's11-e18', rappel: 'r2', type: 'qcm', palier: 2, piege: 'e-ou-er',
      consigne: 'Fais le test « vendre / vendu », puis choisis.',
      avant: 'Ce matin, Anto a oublié de ', apres: ' son sac.',
      choix: ['fermé', 'fermer'], attendu: 'fermer',
    },
    {
      id: 's11-e19', rappel: 'r2', type: 'completer', palier: 2, piege: 'e-ou-er',
      consigne: 'Fais le test « vendre / vendu », puis écris le verbe.',
      // Sujet masculin singulier, et rien entre lui et le participe : le seul
      // choix à faire est celui du son, -é ou -er. Un sujet du type « le chien
      // de Léa » ajouterait un accord à trancher, piège d'une autre séance.
      avant: 'Mon frère est ', verbe: 'rentrer', apres: " tout mouillé de l'entraînement.",
      attendu: 'rentré',
    },
    {
      // NEUTRE, et avec virgule : le détail typographique se retrouve des deux
      // côtés, il ne peut donc servir d'indice à personne.
      id: 's11-e20', rappel: 'r2', type: 'completer', palier: 2, piege: 'e-ou-er',
      neutre: true,
      consigne: 'Fais le test « vendre / vendu », puis écris le verbe.',
      avant: 'Ce soir, Anto va ', verbe: 'lire', apres: ' un chapitre de son roman.',
      attendu: 'lire',
    },

    // ── Réserve ──────────────────────────────────────────────────────────
    //
    // `reserve: true` : ces phrases ne sont jamais jouées dans le parcours.
    // Elles restent neuves pour la reprise en début de séance suivante et pour
    // la seconde chance après une erreur, qui réclament l'une comme l'autre une
    // phrase encore jamais vue portant le même piège. Toutes sont piégeantes —
    // les reprises écartent les items neutres, un neutre en réserve dormirait
    // pour rien.
    {
      id: 's11-r1', rappel: 'r1', type: 'qcm', palier: 1, piege: 'e-ou-er',
      reserve: true,
      consigne: 'Fais le test « vendre / vendu », puis choisis.',
      avant: 'Noé a ', apres: ' son exercice de maths au propre.',
      choix: ['recopié', 'recopier'], attendu: 'recopié',
    },
    {
      id: 's11-r2', rappel: 'r1', type: 'completer', palier: 1, piege: 'e-ou-er',
      reserve: true,
      consigne: 'Fais le test « vendre / vendu », puis écris le verbe.',
      avant: 'Tom veut ', verbe: 'inviter', apres: ' Anto à son anniversaire.',
      attendu: 'inviter',
    },
    {
      id: 's11-r3', rappel: 'r2', type: 'completer', palier: 2, piege: 'e-ou-er',
      reserve: true,
      consigne: 'Fais le test « vendre / vendu », puis écris le verbe.',
      avant: 'Emma a réussi à ', verbe: 'grimper', apres: " jusqu'en haut du mur.",
      attendu: 'grimper',
    },
    {
      id: 's11-r4', rappel: 'r2', type: 'qcm', palier: 2, piege: 'e-ou-er',
      reserve: true,
      consigne: 'Fais le test « vendre / vendu », puis choisis.',
      avant: 'Zoé a promis de ', apres: ' le hamster pendant les vacances.',
      choix: ['nourri', 'nourrir'], attendu: 'nourrir',
    },
    {
      id: 's11-r5', rappel: 'r2', type: 'toucher', palier: 2, piege: 'e-ou-er',
      reserve: true,
      consigne: 'Touche le verbe que tu peux remplacer par « vendre ».',
      mots: ['Hugo', 'a', 'préféré', 'marcher', "jusqu'au", 'collège.'], attendus: [3],
    },
  ],
};
