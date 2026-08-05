// Séance 18 — Dictée guidée.
//
// Format : voir s06.js, la séance de référence.
//
// TYPE `dictee`. Nouveau ici. `texte` est lu à voix haute par le navigateur,
// l'élève tape la phrase entière, l'appli compare mot à mot et signale
// lesquels des `pointsControle` ont échoué. Chaque `mot` d'un point de
// contrôle figure tel quel dans `texte`, une seule fois, et jamais en fin de
// phrase — un mot final traînerait son point avec lui à la comparaison.
//
// Le type `dictee` ne porte pas de champ `piege` : les pièges sont dans les
// points de contrôle, un par difficulté. Ici, une seule difficulté par phrase.
//
// NEUTRES. En dictée, la fausse règle qui guette est « il y a du pluriel dans
// la phrase, donc j'ajoute des lettres ». Les items neutres sont ceux où le
// motif de surface donne la mauvaise réponse : écran singulier et sujet
// pluriel (d2, d4), participe qui reste nu malgré un sujet féminin (d7) ou
// masculin singulier (d8), verbe du 3ᵉ groupe où le son [é] ne piège plus (e4).
//
// d7 porte 'participe-etre' alors que son auxiliaire est *avoir* : c'est la
// convention de s14. Le raisonnement « mauvais-auxiliaire » de ce piège est
// exactement la réponse attendue, et l'item ne vaut que comme contre-exemple
// de l'accord avec être.

export default {
  numero: 18,
  bloc: 4,
  titre: 'Dictée guidée',
  sousTitre: 'Une seule difficulté à la fois',
  objectif:
    "Écrire sous la dictée des phrases courtes en appliquant, à chaque fois, un seul des tests appris.",

  rappels: [
    {
      id: 'r1',
      titre: 'Les trois gestes',
      texte:
        "Fini les leçons : à partir d'ici, on applique.\n\n" +
        "**Chaque verbe** → « qui est-ce qui… ? », puis on compte : un seul, ou plusieurs ?\n\n" +
        "**Chaque son [é] en fin de verbe** → test « vendre / vendu ». Si *vendre* va → **-er**. Si *vendu* va → **-é**.\n\n" +
        "**Chaque participe passé** → quel auxiliaire ? Avec **être**, il s'accorde avec le sujet. Avec **avoir**, il ne bouge pas.\n\n" +
        "Trois gestes, et presque toute la dictée est couverte.",
      exemples: [
        { phrase: 'Le bruit des voitures **réveillait** mon frère.', note: 'Qui est-ce qui réveillait ? Le bruit — un seul → **-ait**.' },
        { phrase: 'Les vélos de mon voisin **roulent** vite.', note: "Qui est-ce qui roule ? Les vélos — plusieurs, malgré « voisin » juste avant." },
      ],
    },
    {
      id: 'r2',
      titre: "Ce qui ne s'entend pas",
      texte:
        "Les fautes de dictée se logent presque toutes dans ce qui **ne s'entend pas** : " +
        "le *-s* d'un pluriel, le *-e* d'un féminin, le *-nt* d'un verbe.\n\n" +
        "Donc on ne se relit pas à l'oreille. On relit avec les yeux, **verbe par verbe**.\n\n" +
        "Une phrase dictée s'écrit une fois et se relit deux fois : la deuxième relecture ne sert qu'aux accords.",
      exemples: [
        { phrase: 'Mes cousines sont **arrivées**.', note: "Auxiliaire *être* → accord avec le sujet, féminin pluriel. On n'entend rien." },
        { phrase: 'Ma cousine a **gagné**.', note: 'Auxiliaire *avoir* → rien ne bouge, même avec un sujet féminin.' },
      ],
    },
  ],

  exercices: [
    // ── Palier 1 : l'accord sujet-verbe, préparé puis dicté ──────────────
    {
      id: 's18-e1', rappel: 'r1', type: 'toucher', palier: 1, piege: 'ecran-complement-du-nom',
      consigne: 'Touche le sujet du verbe.',
      mots: ['La', 'cage', 'des', 'hamsters', 'est', 'ouverte.'], attendus: [1],
    },
    {
      // NEUTRE : le mot voisin est singulier et le sujet pluriel. Sans lui,
      // l'élève retiendrait « nom voisin → prends le contraire ».
      id: 's18-e2', rappel: 'r1', type: 'completer', palier: 1, piege: 'ecran-complement-du-nom',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Les cahiers de ma cousine ', verbe: 'rester', apres: ' dans le cartable.',
      attendu: 'restent',
    },
    {
      id: 's18-d1', rappel: 'r1', type: 'dictee', palier: 1,
      consigne: 'Écoute la phrase, puis écris-la en entier.',
      texte: 'La cage des hamsters est ouverte depuis ce matin.',
      pointsControle: [
        { mot: 'est', piege: 'ecran-complement-du-nom' },
      ],
    },
    {
      // NEUTRE
      id: 's18-d2', rappel: 'r1', type: 'dictee', palier: 1, neutre: true,
      consigne: 'Écoute la phrase, puis écris-la en entier.',
      texte: 'Les vélos de mon voisin roulent sur le trottoir.',
      pointsControle: [
        { mot: 'roulent', piege: 'ecran-complement-du-nom' },
      ],
    },
    {
      id: 's18-d3', rappel: 'r1', type: 'dictee', palier: 1,
      consigne: 'Écoute la phrase, puis écris-la en entier.',
      texte: 'Le bruit des voitures réveillait mon petit frère.',
      pointsControle: [
        { mot: 'réveillait', piege: 'ait-aient' },
      ],
    },
    {
      // NEUTRE : écran singulier, sujet pluriel → -aient.
      id: 's18-d4', rappel: 'r1', type: 'dictee', palier: 1, neutre: true,
      consigne: 'Écoute la phrase, puis écris-la en entier.',
      texte: 'Les joueurs de mon équipe entraient sur le terrain.',
      pointsControle: [
        { mot: 'entraient', piege: 'ait-aient' },
      ],
    },

    // ── Palier 2 : é / er, puis le participe passé ───────────────────────
    {
      // Le faux indice « a » est là, et pourtant c'est -er.
      id: 's18-e3', rappel: 'r2', type: 'qcm', palier: 2, piege: 'e-ou-er',
      consigne: 'Fais le test « vendre / vendu », puis choisis.',
      avant: 'Anto a pensé à ', apres: ' son maillot de sport.',
      choix: ['emporté', 'emporter'], attendu: 'emporter',
    },
    {
      // NEUTRE : « pris » et « prendre » ne se prononcent pas pareil, le son
      // ne piège plus. Le test, lui, reste à faire.
      id: 's18-e4', rappel: 'r2', type: 'completer', palier: 2, piege: 'e-ou-er',
      neutre: true,
      consigne: 'Fais le test « vendre / vendu », puis écris le verbe.',
      avant: 'Anto a voulu ', verbe: 'prendre', apres: ' le bus tout seul.',
      attendu: 'prendre',
    },
    {
      // Deux fois le même son dans la phrase, deux réponses différentes.
      id: 's18-d5', rappel: 'r2', type: 'dictee', palier: 2,
      consigne: 'Écoute la phrase, puis écris-la en entier.',
      texte: 'Anto a oublié de fermer la porte du garage.',
      pointsControle: [
        { mot: 'oublié', piege: 'e-ou-er' },
        { mot: 'fermer', piege: 'e-ou-er' },
      ],
    },
    {
      id: 's18-d6', rappel: 'r2', type: 'dictee', palier: 2,
      consigne: 'Écoute la phrase, puis écris-la en entier.',
      texte: 'Mes cousines sont arrivées avant le début du match.',
      pointsControle: [
        { mot: 'arrivées', piege: 'participe-etre' },
      ],
    },
    {
      // NEUTRE : sujet féminin, mais l'auxiliaire est *avoir* — rien ne bouge.
      // C'est la phrase la plus utile du palier : elle empêche la fausse règle
      // « sujet féminin → participe en -e ».
      id: 's18-d7', rappel: 'r2', type: 'dictee', palier: 2, neutre: true,
      consigne: 'Écoute la phrase, puis écris-la en entier.',
      texte: 'Ma cousine a gagné sa course samedi matin.',
      pointsControle: [
        { mot: 'gagné', piege: 'participe-etre' },
      ],
    },
    {
      // NEUTRE : auxiliaire être, mais sujet masculin singulier → aucune lettre
      // à ajouter. Casse le réflexe « avec être, j'ajoute quelque chose ».
      id: 's18-d8', rappel: 'r2', type: 'dictee', palier: 2, neutre: true,
      consigne: 'Écoute la phrase, puis écris-la en entier.',
      texte: 'Mon frère est tombé de son vélo hier soir.',
      pointsControle: [
        { mot: 'tombé', piege: 'participe-etre' },
      ],
    },
  ],
};
