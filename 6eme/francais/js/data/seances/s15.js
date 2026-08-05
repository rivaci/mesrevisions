// Séance 15 — Le participe passé avec avoir.
//
// Format : voir s06.js, la séance de référence.
//
//   qcm  reprend les champs `avant` / `apres` du completer, plus `choix`.
//        `attendu` est l'une des chaînes de `choix`, à la lettre près.
//
// PIÈGE. La séance porte 'participe-avoir', sauf sur les items à l'auxiliaire
// être, qui portent 'participe-etre' : c'est là que se trouve le raisonnement
// « je pensais que c'était l'auxiliaire avoir », exactement l'erreur commise
// sur ces items-là. Symétrique de ce que fait s14, qui garde 'participe-etre'
// sur ses items à l'auxiliaire avoir.
//
// ÉQUILIBRE. Autant d'items où il ne faut RIEN ajouter que d'items où il faut
// accorder. Sur les seuls items à l'auxiliaire avoir : cinq invariables
// (mangé, perdu, regardé, oublié, réparé) contre quatre accords (prises,
// achetées, écrite, vues). Sans cette parité, l'élève sortirait de la séance
// avec « participe passé → j'accorde », qui est précisément la faute que la
// règle doit empêcher.
//
// NEUTRES — deux par palier, de deux sortes :
//   — auxiliaire être (e3, e5, e13) : le participe bouge, alors que la règle
//     de la séance dit « rien ne bouge ». Ces items forcent la vérification de
//     l'auxiliaire au lieu de l'automatisme « avec avoir, jamais rien » ;
//   — complément antéposé masculin singulier (e8, e14) ou resté après le verbe
//     (e10) : il y a bien un « que » ou un « a » devant, mais aucune lettre à
//     ajouter. Sans eux, l'élève apprendrait « je vois "que" → j'ajoute -s ».

export default {
  numero: 15,
  bloc: 3,
  titre: 'Le participe passé avec avoir',
  sousTitre: "Immobile, sauf si le complément est passé devant",
  objectif:
    "Laisser le participe passé invariable avec avoir, et ne l'accorder que lorsque le complément d'objet direct est placé avant le verbe.",

  rappels: [
    {
      id: 'r1',
      titre: 'Avec avoir, rien ne bouge',
      texte:
        "Au passé composé avec **avoir**, le participe passé ne bouge pas. " +
        "Le sujet, lui, ne commande rien du tout.\n\n" +
        "*Mes sœurs ont **mangé** toute la tarte.* Sujet féminin pluriel, et " +
        "pourtant : *mangé*, sans rien au bout.\n\n" +
        "C'est l'inverse exact de la séance précédente. Avec **être**, on " +
        "accorde avec le sujet ; avec **avoir**, on n'y touche pas.\n\n" +
        "Premier réflexe, donc : **regarde le petit verbe placé devant**. " +
        "*a*, *ont*, *avait* → c'est avoir → on laisse le participe tel quel.",
      exemples: [
        { phrase: 'Mes sœurs ont **mangé** toute la tarte.', note: 'Auxiliaire *avoir* → aucun accord, même avec un sujet féminin pluriel.' },
        { phrase: 'Mes sœurs sont **rentrées** tard.', note: "Auxiliaire *être* → là, on accorde avec le sujet." },
      ],
    },
    {
      id: 'r2',
      titre: 'Sauf si le complément est passé devant',
      texte:
        "Une seule exception, mais elle tombe souvent en dictée : quand ce qu'on " +
        "subit — le **complément d'objet direct** — est placé **avant** le verbe, " +
        "le participe s'accorde avec lui.\n\n" +
        "Pose la question juste après le participe : *j'ai mangé **quoi** ?*\n\n" +
        "Si la réponse est **derrière** le verbe, rien ne bouge. Si elle est " +
        "**devant** — un *que*, un *les*, un *l'* — on accorde avec elle.\n\n" +
        "*J'ai mangé les pommes* → rien. *Les pommes **que** j'ai **mangées*** → " +
        "« que » remplace *les pommes*, féminin pluriel → **-es**.",
      exemples: [
        { phrase: "J'ai **mangé** les pommes.", note: 'Mangé quoi ? *les pommes* — placées après → aucun accord.' },
        { phrase: "Les pommes que j'ai **mangées** étaient vertes.", note: '« que » remplace *les pommes*, placé avant → féminin pluriel.' },
        { phrase: 'Ces séries, je **les** ai **vues** deux fois.', note: '« les » remplace *ces séries* : il est devant → on accorde.' },
      ],
    },
  ],

  exercices: [
    // ── Palier 1 : le complément reste après le verbe ────────────────────
    {
      id: 's15-e1', rappel: 'r1', type: 'completer', palier: 1, piege: 'participe-avoir',
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Mes sœurs ont ', verbe: 'manger', apres: ' toute la tarte.',
      attendu: 'mangé',
    },
    {
      id: 's15-e2', rappel: 'r1', type: 'completer', palier: 1, piege: 'participe-avoir',
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Les joueuses ont ', verbe: 'perdre', apres: ' leur match.',
      attendu: 'perdu',
    },
    {
      // NEUTRE : auxiliaire *être*, donc le participe s'accorde avec le sujet.
      // Sans cet item, l'élève retiendrait « participe passé → je n'accorde
      // jamais » et raterait tout ce qu'il vient d'apprendre en séance 14.
      id: 's15-e3', rappel: 'r1', type: 'completer', palier: 1, piege: 'participe-etre',
      neutre: true,
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Mes cousines sont ', verbe: 'rentrer', apres: ' avant la nuit.',
      attendu: 'rentrées',
    },
    {
      // 0 Anto, 1 et, 2 Léa, 3 ont, 4 rangé, 5 les, 6 cartes.
      // → le nom complément est en 6, après le verbe : rien ne bouge.
      id: 's15-e4', rappel: 'r1', type: 'toucher', palier: 1, piege: 'participe-avoir',
      consigne: "Touche le nom qui dit ce qu'Anto et Léa ont rangé.",
      mots: ['Anto', 'et', 'Léa', 'ont', 'rangé', 'les', 'cartes.'],
      attendus: [6],
    },
    {
      // NEUTRE : auxiliaire *être*.
      id: 's15-e5', rappel: 'r1', type: 'completer', palier: 1, piege: 'participe-etre',
      neutre: true,
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Ma sœur est ', verbe: 'partir', apres: ' au collège à pied.',
      attendu: 'partie',
    },

    // ── Palier 2 : le complément est passé devant le verbe ───────────────
    {
      // 0 Les, 1 pommes, 2 que, 3 j'ai, 4 mangées, 5 étaient, 6 vertes.
      // → le nom qui commande l'accord est en 1.
      id: 's15-e6', rappel: 'r2', type: 'toucher', palier: 2, piege: 'participe-avoir',
      consigne: "Touche le nom avec lequel « mangées » s'accorde.",
      mots: ['Les', 'pommes', 'que', "j'ai", 'mangées', 'étaient', 'vertes.'],
      attendus: [1],
    },
    {
      id: 's15-e7', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-avoir',
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: "Les photos que j'ai ", verbe: 'prendre', apres: ' sont floues.',
      attendu: 'prises',
    },
    {
      // NEUTRE : le complément est bien placé avant (« que » = le film), donc
      // l'accord se fait — mais au masculin singulier, il ne se voit pas. Sans
      // cet item, l'élève apprendrait « je vois "que" → j'ajoute -es ».
      id: 's15-e8', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-avoir',
      neutre: true,
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Le film que nous avons ', verbe: 'regarder', apres: ' était nul.',
      attendu: 'regardé',
    },
    {
      id: 's15-e9', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-avoir',
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Ces chaussures, je les ai ', verbe: 'acheter', apres: ' en soldes.',
      attendu: 'achetées',
    },
    {
      // NEUTRE : rien n'est passé devant, le complément suit le verbe. L'élève
      // qui accorde par habitude dans ce palier se fait prendre ici.
      id: 's15-e10', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-avoir',
      neutre: true,
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Ma sœur a ', verbe: 'oublier', apres: ' ses clés et son sac.',
      attendu: 'oublié',
    },

    // ── Palier 3 : décider à chaque phrase ───────────────────────────────
    {
      id: 's15-e11', rappel: 'r2', type: 'qcm', palier: 3, piege: 'participe-avoir',
      consigne: 'Choisis la forme qui convient.',
      avant: 'La lettre que Léa a ', apres: ' est arrivée ce matin.',
      choix: ['écrit', 'écrite', 'écrits', 'écrites'], attendu: 'écrite',
    },
    {
      id: 's15-e12', rappel: 'r2', type: 'completer', palier: 3, piege: 'participe-avoir',
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Ces séries, je les ai ', verbe: 'voir', apres: ' deux fois.',
      attendu: 'vues',
    },
    {
      // NEUTRE : auxiliaire *être*, au milieu d'un palier qui parle d'avoir.
      id: 's15-e13', rappel: 'r1', type: 'completer', palier: 3, piege: 'participe-etre',
      neutre: true,
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Mes copines sont ', verbe: 'venir', apres: ' à mon anniversaire.',
      attendu: 'venues',
    },
    {
      // NEUTRE : même tournure que e7 et e11 — un « que » devant le verbe —
      // mais le complément est masculin singulier : aucune lettre à ajouter.
      id: 's15-e14', rappel: 'r2', type: 'completer', palier: 3, piege: 'participe-avoir',
      neutre: true,
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: "Le vélo que j'ai ", verbe: 'réparer', apres: ' roule mieux.',
      attendu: 'réparé',
    },
  ],
};
