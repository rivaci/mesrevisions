// Séance 13 — « je serai ou je serais ? »
//
// Format : voir s06.js, la séance de référence.
//
// Deux précisions propres à ce fichier :
//
//   qcm    reprend les champs `avant` / `apres` du completer, plus `choix`.
//          `attendu` est l'une des chaînes de `choix`, à la lettre près.
//
//   Le conditionnel présent est ici traité comme un TEMPS DE L'INDICATIF,
//   conformément à la terminologie du programme. Aucun texte de la séance ne
//   parle de « mode conditionnel ».
//
// Les neutres de cette séance cassent deux automatismes distincts :
//   — « il y a un si, donc -rais » (e8, e10, e11) ;
//   — « c'est toujours la fin -ai/-ais qui se joue » (e5, e6, où la personne
//     rend les deux temps parfaitement audibles).

export default {
  numero: 13,
  bloc: 3,
  titre: 'Je serai ou je serais ?',
  sousTitre: 'Deux temps séparés par une seule lettre',
  objectif: 'Choisir entre -ai et -ais en cherchant la condition dans la phrase, pas dans le son.',

  rappels: [
    {
      id: 'r1',
      titre: 'Deux temps, un seul -r-',
      texte:
        "Le **futur** annonce ce qui arrivera pour de bon : *demain, je **serai** prêt*.\n\n" +
        "Le **conditionnel présent** dit ce qui arriverait **à une condition** : " +
        "*je **serais** prêt si tu m'aidais*.\n\n" +
        "Ce sont deux temps de l'indicatif, et tous les deux portent le **-r-**. " +
        "Seule la fin change : **-ai** au futur, **-ais** au conditionnel.\n\n" +
        "L'oreille n'entend presque rien. C'est le **sens de la phrase** qui tranche.",
      exemples: [
        { phrase: 'Demain, je **serai** au stade.', note: "C'est certain, ça arrivera → futur, **-ai**." },
        { phrase: "Si j'avais un vélo, je **serais** déjà là.", note: "Ça dépend d'une condition → conditionnel, **-ais**." },
      ],
    },
    {
      id: 'r2',
      titre: 'Le mot « si » ne décide pas tout seul',
      texte:
        "Beaucoup d'élèves écrivent **-rais** dès qu'ils voient un « si ». " +
        "C'est faux une fois sur deux.\n\n" +
        "Regarde le verbe qui suit « si » :\n" +
        "— *si tu **venais*** (imparfait) → l'autre verbe prend **-rais** ;\n" +
        "— *si tu **viens*** (présent) → l'autre verbe est au **futur**.\n\n" +
        "Et retiens ceci : **après « si », jamais de -rais.** " +
        "On écrit *si j'avais*, jamais *si j'aurais*.",
      exemples: [
        { phrase: 'Si tu **viens**, je **viendrai** avec toi.', note: '« si » + présent → futur dans l\'autre moitié.' },
        { phrase: 'Si tu **venais**, je **viendrais** avec toi.', note: '« si » + imparfait → **-ais** dans l\'autre moitié.' },
      ],
    },
  ],

  exercices: [
    // ── Palier 1 : le sens est écrit dans la phrase ───────────────────────
    {
      id: 's13-e1', rappel: 'r1', type: 'qcm', palier: 1, piege: 'futur-conditionnel',
      consigne: 'Choisis la forme qui convient.',
      avant: 'Demain, je ', apres: ' au stade avec mon frère.',
      choix: ['serai', 'serais'], attendu: 'serai',
    },
    {
      id: 's13-e2', rappel: 'r1', type: 'qcm', palier: 1, piege: 'futur-conditionnel',
      consigne: 'Choisis la forme qui convient.',
      avant: "Si j'avais un vélo, j'", apres: " à l'école en cinq minutes.",
      choix: ['irai', 'irais'], attendu: 'irais',
    },
    {
      id: 's13-e3', rappel: 'r1', type: 'completer', palier: 1, piege: 'futur-conditionnel',
      consigne: 'Conjugue au futur ou au conditionnel présent, selon le sens.',
      avant: "Si je m'entraînais tous les jours, je ", verbe: 'gagner', apres: ' peut-être le tournoi.',
      attendu: 'gagnerais',
    },
    {
      id: 's13-e4', rappel: 'r1', type: 'completer', palier: 1, piege: 'futur-conditionnel',
      consigne: 'Conjugue au futur ou au conditionnel présent, selon le sens.',
      avant: 'Ce soir, je ', verbe: 'finir', apres: ' mon exposé sur les loups.',
      attendu: 'finirai',
    },
    {
      // NEUTRE : à la 1ʳᵉ personne du pluriel, les deux temps s'entendent
      // (-ons / -ions). Sans cet item, l'élève croirait que la séance ne porte
      // que sur le choix d'une lettre finale à « je ».
      id: 's13-e5', rappel: 'r1', type: 'completer', palier: 1, piege: 'futur-conditionnel',
      neutre: true,
      consigne: 'Conjugue au futur ou au conditionnel présent, selon le sens.',
      avant: "L'an prochain, nous ", verbe: 'partir', apres: ' en classe de neige.',
      attendu: 'partirons',
    },
    {
      // NEUTRE : la phrase contient un « si » et un imparfait, mais la personne
      // rend le conditionnel audible. Le raisonnement reste le même.
      id: 's13-e6', rappel: 'r1', type: 'completer', palier: 1, piege: 'futur-conditionnel',
      neutre: true,
      consigne: 'Conjugue au futur ou au conditionnel présent, selon le sens.',
      avant: 'Si nous avions un jardin, nous ', verbe: 'être', apres: " dehors tout l'été.",
      attendu: 'serions',
    },
    {
      id: 's13-e7', rappel: 'r1', type: 'toucher', palier: 1, piege: 'futur-conditionnel',
      consigne: 'Touche le verbe au conditionnel présent.',
      mots: ['Si', 'tu', 'venais', 'demain,', 'nous', 'irions', 'à', 'la', 'piscine.'],
      attendus: [5],
    },

    // ── Palier 2 : le « si » trompeur, et la condition sans « si » ────────
    {
      // NEUTRE : « si » + présent → futur. C'est l'item qui empêche la fausse
      // règle « dès qu'il y a un si, j'écris -rais ».
      id: 's13-e8', rappel: 'r2', type: 'completer', palier: 2, piege: 'futur-conditionnel',
      neutre: true,
      consigne: 'Conjugue au futur ou au conditionnel présent, selon le sens.',
      avant: 'Si tu viens dimanche, je te ', verbe: 'montrer', apres: ' ma nouvelle manette.',
      attendu: 'montrerai',
    },
    {
      id: 's13-e9', rappel: 'r2', type: 'completer', palier: 2, piege: 'futur-conditionnel',
      consigne: 'Conjugue au futur ou au conditionnel présent, selon le sens.',
      avant: 'Si tu venais dimanche, tu ', verbe: 'être', apres: " le premier à l'essayer.",
      attendu: 'serais',
    },
    {
      // NEUTRE : après « si », c'est l'imparfait — jamais une forme en -rais.
      // Le piège de la séance ne se déclenche pas ici, et c'est tout l'intérêt.
      id: 's13-e10', rappel: 'r2', type: 'completer', palier: 2, piege: 'futur-conditionnel',
      neutre: true,
      consigne: 'Conjugue le verbe qui suit « si ».',
      avant: "Si j'", verbe: 'avoir', apres: ' un peu plus de temps, je relirais ma rédaction.',
      attendu: 'avais',
    },
    {
      // NEUTRE : deuxième « si » + présent, au même endroit que le piège
      // (1ʳᵉ personne du singulier), pour que le contre-exemple porte vraiment.
      id: 's13-e11', rappel: 'r2', type: 'qcm', palier: 2, piege: 'futur-conditionnel',
      neutre: true,
      consigne: 'Choisis la forme qui convient.',
      avant: 'Si tu me prêtes ta manette, je ', apres: ' avec toi.',
      choix: ['jouerai', 'jouerais'], attendu: 'jouerai',
    },
    {
      id: 's13-e12', rappel: 'r2', type: 'completer', palier: 2, piege: 'futur-conditionnel',
      consigne: 'Conjugue au futur ou au conditionnel présent, selon le sens.',
      avant: "Maman, j'", verbe: 'aimer', apres: ' bien inviter deux copains samedi.',
      attendu: 'aimerais',
    },
    {
      id: 's13-e13', rappel: 'r2', type: 'completer', palier: 2, piege: 'futur-conditionnel',
      consigne: 'Conjugue au futur ou au conditionnel présent, selon le sens.',
      avant: 'À ta place, je ne ', verbe: 'prendre', apres: ' pas ce chemin.',
      attendu: 'prendrais',
    },
    {
      id: 's13-e14', rappel: 'r2', type: 'toucher', palier: 2, piege: 'futur-conditionnel',
      consigne: "Touche le verbe qui dépend d'une condition.",
      mots: ['Si', "j'avais", 'un', 'chien,', 'je', 'le', 'promènerais', 'tous', 'les', 'soirs.'],
      attendus: [6],
    },
  ],
};
