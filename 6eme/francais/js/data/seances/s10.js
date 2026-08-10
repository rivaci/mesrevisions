// Séance 10 — Le pronom relatif sujet.
//
// Format : voir s06.js, la séance de référence.
//
// La séance la plus difficile du bloc, et la seule qui s'apprend entièrement :
// « c'est moi qui suis » ne se devine pas, ne s'entend pas, ne se déduit pas.
// D'où deux rappels très explicites, et une progression en trois temps :
// d'abord « qui » avec un antécédent de 3ᵉ personne (le cas familier), puis
// moi / toi (le cas contre-intuitif), puis nous / vous et les antécédents
// éloignés.
//
// Les items neutres cassent la fausse règle que le palier 2 pourrait installer :
// « après c'est… qui, on met je ou tu ». Non — « c'est mon frère qui range ».

export default {
  numero: 10,
  bloc: 2,
  titre: 'Le pronom relatif sujet',
  sousTitre: '« qui » emprunte la personne du mot qu\'il remplace',
  objectif:
    "Conjuguer le verbe placé après « qui » à la personne de son antécédent, et pas systématiquement à la 3ᵉ.",

  rappels: [
    {
      id: 'r1',
      titre: "« qui » n'a pas de personne à lui",
      texte:
        "**qui** ne désigne personne tout seul : il prend la place d'un mot écrit " +
        "**juste devant lui**. Ce mot s'appelle l'**antécédent**, et c'est lui qui " +
        "commande le verbe.\n\n" +
        "Le geste, toujours le même : repère le mot placé avant « qui », remplace " +
        "« qui » par ce mot, puis conjugue comme d'habitude.\n\n" +
        "*Les élèves **qui** travaillent* → « les élèves travaillent ». " +
        "*Le chien **qui** aboie* → « le chien aboie ».",
      // « qui » est un mot vide : il prend la personne de son voisin de gauche.
      // La flèche vers l'arrière puis vers le verbe montre le relais, que le
      // texte ne peut que décrire.
      animation: {
        mots: ['Les', 'élèves', 'qui', 'travaillent', 'réussissent.'],
        scenes: [
          { type: 'surligner', mots: [2], role: 'ecran',
            texte: '« qui » ne désigne personne tout seul.' },
          { type: 'fleche', de: 2, vers: 1, label: 'remplace',
            texte: 'Il prend la place du mot écrit juste devant : « les élèves ».' },
          { type: 'surligner', mots: [3], role: 'verbe',
            texte: 'Et c\'est ce mot-là qui commande « travaillent ».' },
          { type: 'fleche', de: 1, vers: 3, label: 'antécédent → verbe',
            texte: 'Relis sans « qui » : « les élèves travaillent ». Plusieurs → -ent.' },
          { type: 'dire', texte: 'Change l\'antécédent : le verbe suit.' },
          { type: 'terminaison', mot: 0, devient: 'Un', texte: 'Un seul, cette fois.' },
          { type: 'terminaison', mot: 1, devient: 'ami', texte: '« Un ami »…' },
          { type: 'terminaison', mot: 3, devient: 'travaille', texte: '…« qui travaille »…' },
          { type: 'terminaison', mot: 4, devient: 'réussit.', texte: '…« réussit ». Deux verbes, un seul patron.' },
        ],
      },
      exemples: [
        { phrase: 'Les élèves **qui travaillent** réussissent.', note: '« qui » remplace *les élèves* → plusieurs → **travaillent**.' },
        { phrase: "J'ai un ami **qui joue** au basket.", note: '« qui » remplace *un ami* → un seul → **joue**.' },
      ],
    },
    {
      id: 'r2',
      titre: "C'est moi qui suis, c'est toi qui es",
      texte:
        "Voici ce que presque personne ne devine seul : quand « qui » remplace " +
        "**moi**, **toi**, **nous** ou **vous**, le verbe se conjugue à cette " +
        "personne-là — pas à la troisième.\n\n" +
        "On écrit *c'est moi qui **suis*** (comme « je suis »), *c'est toi qui **es*** " +
        "(comme « tu es »), *c'est nous qui **avons*** (comme « nous avons »). " +
        "« C'est moi qui est » n'existe pas.\n\n" +
        "Mais après « c'est… qui », l'antécédent n'est pas toujours *moi* ou *toi* : " +
        "dans *c'est mon frère qui range*, on revient à la 3ᵉ personne. " +
        "Regarde le mot, pas la tournure.",
      // « C'est moi qui suis » : presque personne ne le devine seul, et l'erreur
      // vient de la tournure, pas du raisonnement. L'animation fait donc deux
      // passages sur la MÊME tournure, avec deux antécédents différents.
      animation: {
        mots: ['C\'est', 'moi', 'qui', 'suis', 'de', 'service.'],
        scenes: [
          { type: 'surligner', mots: [2], role: 'ecran', texte: '« qui » reprend le mot d\'avant.' },
          { type: 'fleche', de: 2, vers: 1, label: 'remplace', texte: 'Ici, ce mot est « moi ».' },
          { type: 'dire', texte: 'Et « moi », c\'est « je ». Donc première personne.' },
          { type: 'surligner', mots: [3], role: 'verbe',
            texte: '« c\'est moi qui suis », comme « je suis ». « C\'est moi qui est » n\'existe pas.' },
          { type: 'dire', texte: 'Attention : regarde le mot, pas la tournure.' },
          { type: 'terminaison', mot: 1, devient: 'mon frère', texte: 'Change l\'antécédent.' },
          { type: 'terminaison', mot: 3, devient: 'est',
            texte: '« C\'est mon frère qui est de service. » La 3ᵉ personne revient — parce que le mot a changé.' },
        ],
      },
      exemples: [
        { phrase: "C'est moi **qui suis** de service.", note: '« qui » remplace *moi* → je suis → **suis**.' },
        { phrase: "C'est toi **qui as** gagné.", note: '« qui » remplace *toi* → tu as → **as**.' },
        { phrase: "C'est mon frère **qui a** gagné.", note: 'Ici « qui » remplace *mon frère* → il a. La 3ᵉ personne revient.' },
      ],
    },
  ],

  exercices: [
    // ── Palier 1 : l'antécédent est à la 3ᵉ personne ─────────────────────
    {
      id: 's10-e1', rappel: 'r1', type: 'completer', palier: 1, piege: 'pronom-relatif-sujet',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Les élèves qui ', verbe: 'travailler', apres: ' en silence réussissent mieux.', attendu: 'travaillent',
    },
    {
      // NEUTRE : antécédent singulier collé à « qui ». Celui qui conjugue à la
      // 3ᵉ du singulier sans réfléchir tombe juste — c'est justement pourquoi
      // cet item doit exister : sinon l'élève apprendrait « après qui, pluriel ».
      id: 's10-e2', rappel: 'r1', type: 'completer', palier: 1, piege: 'pronom-relatif-sujet',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: "J'ai un ami qui ", verbe: 'jouer', apres: ' au basket.', attendu: 'joue',
    },
    {
      // 0 Les, 1 joueurs, 2 qui, 3 marquent, 4 sont, 5 applaudis.
      // → l'antécédent est en 1.
      id: 's10-e3', rappel: 'r1', type: 'toucher', palier: 1, piege: 'pronom-relatif-sujet',
      consigne: 'Touche le mot que « qui » remplace.',
      mots: ['Les', 'joueurs', 'qui', 'marquent', 'sont', 'applaudis.'], attendus: [1],
    },
    {
      // NEUTRE
      id: 's10-e4', rappel: 'r1', type: 'completer', palier: 1, piege: 'pronom-relatif-sujet',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Le chien qui ', verbe: 'aboyer', apres: ' appartient à mon voisin.', attendu: 'aboie',
    },

    // ── Palier 2 : « qui » remplace moi ou toi ───────────────────────────
    {
      id: 's10-e5', rappel: 'r2', type: 'completer', palier: 2, piege: 'pronom-relatif-sujet',
      consigne: 'Conjugue le verbe au présent.',
      avant: "C'est moi qui ", verbe: 'être', apres: ' le plus rapide.', attendu: 'suis',
    },
    {
      id: 's10-e6', rappel: 'r2', type: 'completer', palier: 2, piege: 'pronom-relatif-sujet',
      consigne: 'Conjugue le verbe au présent.',
      avant: "C'est toi qui ", verbe: 'avoir', apres: ' raison.', attendu: 'as',
    },
    {
      // 0 C'est, 1 moi, 2 qui, 3 ai, 4 rangé, 5 la, 6 table.
      // → l'antécédent est en 1.
      id: 's10-e7', rappel: 'r2', type: 'toucher', palier: 2, piege: 'pronom-relatif-sujet',
      consigne: 'Touche le mot que « qui » remplace.',
      mots: ["C'est", 'moi', 'qui', 'ai', 'rangé', 'la', 'table.'], attendus: [1],
    },
    {
      id: 's10-e8', rappel: 'r2', type: 'completer', palier: 2, piege: 'pronom-relatif-sujet',
      consigne: 'Conjugue le verbe au présent.',
      avant: "C'est toi qui ", verbe: 'être', apres: ' en retard.', attendu: 'es',
    },
    {
      // NEUTRE : même tournure « c'est… qui », mais l'antécédent est à la 3ᵉ
      // personne. Sans cet item, l'élève retiendrait « c'est… qui → je ou tu ».
      id: 's10-e9', rappel: 'r2', type: 'completer', palier: 2, piege: 'pronom-relatif-sujet',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: "C'est mon frère qui ", verbe: 'ranger', apres: ' la cuisine.', attendu: 'range',
    },
    {
      // NEUTRE
      id: 's10-e10', rappel: 'r2', type: 'completer', palier: 2, piege: 'pronom-relatif-sujet',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: "C'est le professeur qui ", verbe: 'choisir', apres: ' les groupes.', attendu: 'choisit',
    },

    // ── Palier 3 : nous, vous, et les antécédents éloignés ───────────────
    {
      id: 's10-e11', rappel: 'r2', type: 'completer', palier: 3, piege: 'pronom-relatif-sujet',
      consigne: 'Conjugue le verbe au présent.',
      avant: "C'est nous qui ", verbe: 'avoir', apres: ' gagné le tournoi.', attendu: 'avons',
    },
    {
      id: 's10-e12', rappel: 'r2', type: 'completer', palier: 3, piege: 'pronom-relatif-sujet',
      consigne: 'Conjugue le verbe au présent.',
      avant: "C'est vous qui ", verbe: 'être', apres: ' arrivés les premiers.', attendu: 'êtes',
    },
    {
      // NEUTRE : l'antécédent reste à la 3ᵉ personne, mais un complément du nom
      // s'intercale — c'est le nom principal qui commande, comme en séance 6.
      id: 's10-e13', rappel: 'r1', type: 'completer', palier: 3, piege: 'pronom-relatif-sujet',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Ce sont les parents des joueurs qui ', verbe: 'apporter', apres: ' le goûter.', attendu: 'apportent',
    },
    {
      // NEUTRE
      id: 's10-e14', rappel: 'r1', type: 'completer', palier: 3, piege: 'pronom-relatif-sujet',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: "C'est ma sœur qui ", verbe: 'garder', apres: ' le chat pendant les vacances.', attendu: 'garde',
    },
    {
      id: 's10-e15', rappel: 'r1', type: 'qcm', palier: 1, piege: 'pronom-relatif-sujet',
      consigne: 'Cherche le mot que « qui » remplace, puis choisis la bonne forme.',
      avant: 'Anto a des cousins qui ', apres: ' à Lyon.',
      choix: ['habite', 'habitent'], attendu: 'habitent',
    },
    {
      // 0 Zoé, 1 écoute, 2 les, 3 chansons, 4 qui, 5 passent, 6 à, 7 la, 8 radio.
      // → l'antécédent est en 3. Le leurre, c'est « Zoé » : c'est le sujet de la
      // phrase, mais ce n'est pas elle que « qui » remplace.
      id: 's10-e16', rappel: 'r1', type: 'toucher', palier: 1, piege: 'pronom-relatif-sujet',
      consigne: 'Touche le mot que « qui » remplace.',
      mots: ['Zoé', 'écoute', 'les', 'chansons', 'qui', 'passent', 'à', 'la', 'radio.'], attendus: [3],
    },
    {
      id: 's10-e17', rappel: 'r2', type: 'qcm', palier: 2, piege: 'pronom-relatif-sujet',
      consigne: 'Cherche le mot que « qui » remplace, puis choisis la bonne forme.',
      avant: "C'est moi qui ", apres: ' la table tous les soirs.',
      choix: ['met', 'mets'], attendu: 'mets',
    },
    {
      // NEUTRE : la tournure « c'est… qui » avec un prénom. Celui qui conjugue à
      // la 3ᵉ sans réfléchir tombe juste — et c'est voulu : sans ces items,
      // Anto retiendrait « c'est… qui → je ou tu » au lieu de regarder le mot.
      id: 's10-e18', rappel: 'r2', type: 'completer', palier: 2, piege: 'pronom-relatif-sujet',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: "C'est Léa qui ", verbe: 'apporter', apres: ' le gâteau samedi.', attendu: 'apporte',
    },
    {
      id: 's10-e19', rappel: 'r2', type: 'completer', palier: 3, piege: 'pronom-relatif-sujet',
      consigne: 'Conjugue le verbe au présent.',
      avant: "C'est vous qui ", verbe: 'avoir', apres: ' choisi le film.', attendu: 'avez',
    },
    {
      // 0 C'est, 1 nous, 2 qui, 3 promenons, 4 le, 5 chien, 6 le, 7 week-end.
      // → l'antécédent est en 1. Le leurre, c'est « chien » : c'est le seul nom
      // de la phrase, mais « qui » remplace *nous*, d'où la 1ʳᵉ du pluriel.
      id: 's10-e20', rappel: 'r2', type: 'toucher', palier: 3, piege: 'pronom-relatif-sujet',
      consigne: 'Touche le mot que « qui » remplace.',
      mots: ["C'est", 'nous', 'qui', 'promenons', 'le', 'chien', 'le', 'week-end.'], attendus: [1],
    },

    // ── Réserve ──────────────────────────────────────────────────────────
    //
    // `reserve: true` : jamais jouées dans le parcours. Elles restent neuves
    // pour la reprise en début de séance suivante et pour la seconde chance
    // après une erreur, qui réclament l'une comme l'autre une phrase JAMAIS vue
    // portant le même piège. Toutes sont piégeantes : les reprises écartent les
    // items neutres, un neutre en réserve ne servirait jamais.
    {
      id: 's10-r1', rappel: 'r1', type: 'completer', palier: 1, piege: 'pronom-relatif-sujet',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Anto a deux chats qui ', verbe: 'dormir', apres: ' sur le canapé.', attendu: 'dorment',
    },
    {
      // 0 Hugo, 1 range, 2 les, 3 livres, 4 qui, 5 traînent, 6 par, 7 terre.
      id: 's10-r2', rappel: 'r1', type: 'toucher', palier: 1, piege: 'pronom-relatif-sujet',
      reserve: true,
      consigne: 'Touche le mot que « qui » remplace.',
      mots: ['Hugo', 'range', 'les', 'livres', 'qui', 'traînent', 'par', 'terre.'], attendus: [3],
    },
    {
      id: 's10-r3', rappel: 'r2', type: 'completer', palier: 2, piege: 'pronom-relatif-sujet',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: "C'est moi qui ", verbe: 'avoir', apres: ' nourri le lapin ce matin.', attendu: 'ai',
    },
    {
      id: 's10-r4', rappel: 'r2', type: 'qcm', palier: 2, piege: 'pronom-relatif-sujet',
      reserve: true,
      consigne: 'Cherche le mot que « qui » remplace, puis choisis la bonne forme.',
      avant: "C'est toi qui ", apres: " le plus jeune de l'équipe.",
      choix: ['es', 'est'], attendu: 'es',
    },
    {
      id: 's10-r5', rappel: 'r2', type: 'completer', palier: 3, piege: 'pronom-relatif-sujet',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: "C'est nous qui ", verbe: 'préparer', apres: ' le pique-nique.', attendu: 'préparons',
    },
  ],
};
