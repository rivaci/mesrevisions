// Séance 14 — Le participe passé avec être.
//
// Format : voir s06.js, la séance de référence.
//
//   qcm  reprend les champs `avant` / `apres` du completer, plus `choix`.
//        `attendu` est l'une des chaînes de `choix`, à la lettre près.
//
// Les neutres de cette séance cassent deux automatismes distincts :
//   — « il faut toujours ajouter une lettre » (e3, e5 : sujet masculin
//     singulier, le participe ne bouge pas) ;
//   — « sujet féminin ou pluriel → j'accorde » (e8, e10 : l'auxiliaire est
//     *avoir*, donc rien ne bouge). Ces deux-là portent tout de même le piège
//     'participe-etre', dont le raisonnement « mauvais-auxiliaire » est
//     exactement la réponse attendue. 'participe-avoir' conviendrait aussi,
//     mais il est le piège d'une séance ultérieure.

export default {
  numero: 14,
  bloc: 3,
  titre: 'Le participe passé avec être',
  sousTitre: "Un participe qui se comporte comme un adjectif",
  objectif: "Accorder le participe passé avec le sujet dès que l'auxiliaire est être.",

  rappels: [
    {
      id: 'r1',
      titre: 'Avec être, le participe suit le sujet',
      texte:
        "Au passé composé, deux petits verbes servent d'auxiliaire : **être** et **avoir**.\n\n" +
        "Avec **être**, le participe passé se comporte comme un **adjectif** : " +
        "il prend le genre et le nombre du **sujet**.\n\n" +
        "*il est parti* — *elle est parti**e*** — *ils sont parti**s*** — *elles sont parti**es***.\n\n" +
        "On n'entend rien de tout ça. On l'écrit quand même.",
      exemples: [
        { phrase: 'Ma sœur est **partie** à la piscine.', note: "Qui est-ce qui est parti ? Ma sœur — féminin singulier → **-e**." },
        { phrase: 'Mes frères sont **partis** à la piscine.', note: 'Masculin pluriel → **-s**, muet à l\'oreille.' },
      ],
    },
    {
      id: 'r2',
      titre: "Deux vérifications avant d'écrire",
      texte:
        "**1. Quel auxiliaire ?** *est*, *sont*, *était*, *sommes* viennent d'**être** → " +
        "on accorde. *a*, *ont*, *avait* viennent d'**avoir** → on ne touche à rien.\n\n" +
        "**2. Quel sujet ?** Pas le mot le plus proche : celui qui répond à " +
        "« qui est-ce qui… ? ». Dans *la copine de mes frères est partie*, c'est *la copine*.\n\n" +
        "Et quand le sujet mélange garçons et filles, le **masculin pluriel** l'emporte.",
      exemples: [
        { phrase: 'Ma sœur a **gagné** sa course.', note: "Auxiliaire *avoir* → aucun accord, même avec un sujet féminin." },
        { phrase: 'Anto et ses copines sont **montés** dans le bus.', note: 'Un garçon dans le groupe → masculin pluriel.' },
      ],
    },
  ],

  exercices: [
    // ── Palier 1 : le sujet est juste devant l'auxiliaire ────────────────
    {
      id: 's14-e1', rappel: 'r1', type: 'completer', palier: 1, piege: 'participe-etre',
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Ma sœur est ', verbe: 'partir', apres: ' à la piscine.',
      attendu: 'partie',
    },
    {
      id: 's14-e2', rappel: 'r1', type: 'completer', palier: 1, piege: 'participe-etre',
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Mes cousines sont ', verbe: 'arriver', apres: ' hier soir.',
      attendu: 'arrivées',
    },
    {
      // NEUTRE : sujet masculin singulier, le participe ne prend rien. Sans cet
      // item, l'élève apprend « participe avec être → j'ajoute une lettre ».
      id: 's14-e3', rappel: 'r1', type: 'completer', palier: 1, piege: 'participe-etre',
      neutre: true,
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Mon frère est ', verbe: 'tomber', apres: ' de son vélo.',
      attendu: 'tombé',
    },
    {
      id: 's14-e4', rappel: 'r1', type: 'completer', palier: 1, piege: 'participe-etre',
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Les joueuses sont ', verbe: 'entrer', apres: ' sur le terrain.',
      attendu: 'entrées',
    },
    {
      // NEUTRE
      id: 's14-e5', rappel: 'r1', type: 'completer', palier: 1, piege: 'participe-etre',
      neutre: true,
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Le chien est ', verbe: 'rester', apres: ' devant la porte.',
      attendu: 'resté',
    },
    {
      id: 's14-e6', rappel: 'r1', type: 'toucher', palier: 1, piege: 'participe-etre',
      consigne: "Touche le mot qui commande l'accord du participe.",
      mots: ['Mes', 'sœurs', 'sont', 'rentrées', 'très', 'tard.'],
      attendus: [1],
    },

    // ── Palier 2 : auxiliaire trompeur, sujet éloigné ────────────────────
    {
      id: 's14-e7', rappel: 'r2', type: 'qcm', palier: 2, piege: 'participe-etre',
      consigne: 'Choisis la forme qui convient.',
      avant: 'Les filles de ma classe sont ', apres: ' au musée.',
      choix: ['allé', 'allée', 'allés', 'allées'], attendu: 'allées',
    },
    {
      // NEUTRE : sujet féminin, mais l'auxiliaire est *avoir* — donc rien ne
      // bouge. C'est l'item le plus important du palier : il empêche la fausse
      // règle « sujet féminin → participe en -e ».
      id: 's14-e8', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-etre',
      neutre: true,
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Ma sœur a ', verbe: 'gagner', apres: ' sa course.',
      attendu: 'gagné',
    },
    {
      id: 's14-e9', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-etre',
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Anto et ses copines sont ', verbe: 'monter', apres: ' dans le bus.',
      attendu: 'montés',
    },
    {
      // NEUTRE : sujet pluriel, auxiliaire *avoir*, aucun accord.
      id: 's14-e10', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-etre',
      neutre: true,
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Mes parents ont ', verbe: 'oublier', apres: ' les clés à la maison.',
      attendu: 'oublié',
    },
    {
      id: 's14-e11', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-etre',
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'La copine de mes frères est ', verbe: 'partir', apres: ' avant la fin du match.',
      attendu: 'partie',
    },
    {
      id: 's14-e12', rappel: 'r2', type: 'toucher', palier: 2, piege: 'participe-etre',
      consigne: "Touche le mot qui commande l'accord du participe.",
      mots: ['La', 'porte', 'du', 'garage', 'est', 'restée', 'ouverte.'],
      attendus: [1],
    },
    {
      id: 's14-e13', rappel: 'r2', type: 'qcm', palier: 2, piege: 'participe-etre',
      consigne: 'Choisis la forme qui convient.',
      avant: 'Mes deux frères sont ', apres: ' en retard au tournoi.',
      choix: ['arrivé', 'arrivée', 'arrivés', 'arrivées'], attendu: 'arrivés',
    },
  ],
};
