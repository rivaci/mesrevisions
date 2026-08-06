// Séance 6 — L'écran du complément du nom.
//
// SÉANCE DE RÉFÉRENCE : c'est le modèle que suivent les dix-neuf autres.
//
// ── Format ────────────────────────────────────────────────────────────────
//
// rappels[]   Un micro-rappel de 5 à 8 lignes, suivi immédiatement de ses
//             exercices. Jamais de leçon complète en tête de séance : l'élève
//             la fait défiler sans la lire.
//
// exercices[] Trois formes :
//
//   completer  L'élève tape la forme attendue. Indispensable en conjugaison et
//              en accord : écrire « je serais » plutôt que « je serai », c'est
//              précisément la compétence évaluée, donc l'orthographe est
//              exigée à la lettre près. `variantes` liste les graphies
//              également correctes, rien de plus.
//
//   toucher    L'élève désigne un mot dans la phrase. C'est l'équivalent de la
//              carte cliquable de l'histoire-géo : même geste, et ça teste
//              l'analyse plutôt que la récitation.
//
//   qcm        Pour ce qui se choisit entre formes concurrentes (homophones,
//              futur contre conditionnel).
//
// piege       Renvoie au catalogue de pieges.js : c'est lui qui fournit les
//             options de raisonnement et la réexplication en cas d'erreur.
//
// palier      Difficulté croissante à l'intérieur de la séance.
//
// neutre      Item où le piège NE joue PAS. Obligatoire, et pas du remplissage :
//             si tous les items d'un palier piègent dans le même sens, l'élève
//             apprend « quand il y a un pluriel juste avant, mets le singulier »
//             — une fausse règle qui le fera échouer partout ailleurs. Les items
//             neutres l'obligent à continuer de chercher le sujet.

export default {
  numero: 6,
  bloc: 2,
  titre: "L'écran du complément du nom",
  sousTitre: 'Le nom voisin qui attire l\'accord',
  objectif: "Trouver le sujet même quand un autre nom s'intercale entre lui et le verbe.",

  rappels: [
    {
      id: 'r1',
      titre: 'Trouver le sujet',
      texte:
        "Pour accorder un verbe, il faut d'abord trouver son **sujet**. " +
        "La question qui ne trompe jamais : **« qui est-ce qui… ? »**\n\n" +
        "Le sujet commande le verbe, toujours — quoi qu'il y ait entre les deux.",
      exemples: [
        { phrase: 'Le chat dort.', note: 'Qui est-ce qui dort ? **Le chat.** Un seul → *dort*.' },
        { phrase: 'Les chats dorment.', note: 'Qui est-ce qui dort ? **Les chats.** Plusieurs → *dorment*.' },
      ],
    },
    {
      id: 'r2',
      titre: 'Le piège du nom voisin',
      texte:
        "Voici le piège le plus fréquent en dictée : **un mot au pluriel juste " +
        "avant le verbe, qui n'est pas le sujet.**\n\n" +
        "Dans *le panier des chats est vide*, « des chats » complète le nom " +
        "*panier*. Ce ne sont pas les chats qui sont vides.\n\n" +
        "**Le mot le plus proche du verbe n'est pas forcément son sujet.**",
      exemples: [
        { phrase: 'Le panier des chats **est** vide.', note: 'Qui est-ce qui est vide ? Le panier — un seul.' },
        { phrase: 'La couleur des murs **a** changé.', note: 'Qui est-ce qui a changé ? La couleur.' },
      ],
      // L'animation joue la scène que le texte décrit : la fausse piste du nom
      // voisin, barrée, puis la question qui remonte au vrai sujet. Format :
      // voir js/animation.js. Elle complète le texte, elle ne le remplace pas.
      animation: {
        mots: ['Le', 'panier', 'des', 'chats', 'est', 'vide.'],
        scenes: [
          { type: 'dire', texte: 'Qui est-ce qui est vide ?' },
          { type: 'surligner', mots: [4], role: 'verbe', texte: "D'abord, repère le verbe : « est »." },
          { type: 'fausse-piste', mot: 3, texte: '« des chats » ? Non — il est juste à côté, mais…' },
          { type: 'fleche', de: 3, vers: 1, label: 'complète', texte: '« des chats » complète « panier ». Il précise de quel panier on parle.' },
          { type: 'surligner', mots: [1], role: 'sujet', texte: 'Qui est-ce qui est vide ? Le panier !' },
          { type: 'fleche', de: 1, vers: 4, label: 'sujet → verbe', texte: 'Un seul panier → « est ». Le sujet commande, même de loin.' },
        ],
      },
    },
  ],

  exercices: [
    // ── Palier 1 : le sujet touche le verbe ──────────────────────────────
    {
      id: 's06-e1', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-colle',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Le chien ', verbe: 'aboyer', apres: ' dans le jardin.', attendu: 'aboie',
    },
    {
      id: 's06-e2', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-colle',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Les enfants ', verbe: 'jouer', apres: ' au ballon.', attendu: 'jouent',
    },
    {
      id: 's06-e3', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-colle',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Ma sœur ', verbe: 'finir', apres: ' ses devoirs.', attendu: 'finit',
    },
    {
      id: 's06-e4', rappel: 'r1', type: 'toucher', palier: 1, piege: 'sujet-colle',
      consigne: 'Touche le sujet du verbe.',
      mots: ['Les', 'voitures', 'roulent', 'trop', 'vite.'], attendus: [1],
    },

    // ── Palier 2 : un complément du nom s'intercale ──────────────────────
    {
      id: 's06-e5', rappel: 'r2', type: 'toucher', palier: 2, piege: 'ecran-complement-du-nom',
      consigne: 'Touche le sujet du verbe.',
      mots: ['Le', 'panier', 'des', 'chats', 'est', 'vide.'], attendus: [1],
    },
    {
      id: 's06-e6', rappel: 'r2', type: 'completer', palier: 2, piege: 'ecran-complement-du-nom',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'La couleur des murs ', verbe: 'être', apres: ' passée.', attendu: 'est',
    },
    {
      id: 's06-e7', rappel: 'r2', type: 'completer', palier: 2, piege: 'ecran-complement-du-nom',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Le bruit des voitures ', verbe: 'déranger', apres: ' les voisins.', attendu: 'dérange',
    },
    {
      // NEUTRE : ici le nom voisin ET le sujet sont au pluriel. Sans cet item,
      // l'élève apprendrait « pluriel juste avant → verbe au singulier ».
      id: 's06-e8', rappel: 'r2', type: 'completer', palier: 2, piege: 'ecran-complement-du-nom',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Les feuilles de cet arbre ', verbe: 'tomber', apres: ' en automne.', attendu: 'tombent',
    },
    {
      id: 's06-e9', rappel: 'r2', type: 'completer', palier: 2, piege: 'ecran-complement-du-nom',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Le professeur des élèves de sixième ', verbe: 'arriver', apres: '.', attendu: 'arrive',
    },
    {
      // NEUTRE
      id: 's06-e10', rappel: 'r2', type: 'completer', palier: 2, piege: 'ecran-complement-du-nom',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Les portes de la maison ', verbe: 'grincer', apres: '.', attendu: 'grincent',
    },
    {
      id: 's06-e11', rappel: 'r2', type: 'toucher', palier: 2, piege: 'ecran-complement-du-nom',
      consigne: 'Touche le sujet du verbe.',
      mots: ['Le', 'prix', 'des', 'billets', 'augmente', 'chaque', 'année.'], attendus: [1],
    },
    {
      id: 's06-e12', rappel: 'r2', type: 'completer', palier: 2, piege: 'ecran-complement-du-nom',
      consigne: 'Conjugue le verbe au présent.',
      avant: "L'odeur des fleurs ", verbe: 'remplir', apres: ' la pièce.', attendu: 'remplit',
    },
    {
      id: 's06-e13', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-colle',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Tom ', verbe: 'ranger', apres: ' sa chambre.', attendu: 'range',
    },
    {
      id: 's06-e14', rappel: 'r1', type: 'toucher', palier: 1, piege: 'sujet-colle',
      consigne: 'Touche le sujet du verbe.',
      mots: ['Léa', 'nourrit', 'son', 'hamster', 'tous', 'les', 'soirs.'], attendus: [0],
    },
    {
      id: 's06-e15', rappel: 'r1', type: 'qcm', palier: 1, piege: 'sujet-colle',
      consigne: 'Cherche le sujet, puis choisis la bonne forme.',
      avant: 'Les joueurs ', apres: ' le ballon.',
      choix: ['attrape', 'attrapent'], attendu: 'attrapent',
    },
    {
      id: 's06-e16', rappel: 'r2', type: 'completer', palier: 2, piege: 'ecran-complement-du-nom',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'La voiture de mes parents ', verbe: 'démarrer', apres: ' du premier coup.',
      attendu: 'démarre',
    },
    {
      id: 's06-e17', rappel: 'r2', type: 'qcm', palier: 2, piege: 'ecran-complement-du-nom',
      consigne: 'Cherche le sujet, puis choisis la bonne forme.',
      avant: 'Le vestiaire des joueurs ', apres: ' à dix-huit heures.',
      choix: ['ferme', 'ferment'], attendu: 'ferme',
    },
    {
      // NEUTRE : le nom voisin est au singulier et le sujet au pluriel. Le piège
      // ne joue donc pas — c'est ce qui empêche Anto de retenir
      // « complément du nom → verbe au singulier ».
      id: 's06-e18', rappel: 'r2', type: 'toucher', palier: 2, piege: 'ecran-complement-du-nom',
      neutre: true,
      consigne: 'Touche le sujet du verbe.',
      mots: ['Les', 'affaires', 'de', 'Tom', 'traînent', 'dans', "l'entrée."], attendus: [1],
    },
    {
      id: 's06-e19', rappel: 'r2', type: 'completer', palier: 2, piege: 'ecran-complement-du-nom',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'La photo de mes cousins ', verbe: 'être', apres: ' sur le frigo.', attendu: 'est',
    },
    {
      // NEUTRE : même chose en conjugaison, pour que le palier ne se termine pas
      // sur une série de singuliers.
      id: 's06-e20', rappel: 'r2', type: 'completer', palier: 2, piege: 'ecran-complement-du-nom',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Les copains de Noé ', verbe: 'arriver', apres: ' samedi après-midi.',
      attendu: 'arrivent',
    },

    // ── Réserve ──────────────────────────────────────────────────────────
    //
    // `reserve: true` : ces phrases ne sont PAS jouées dans le parcours. Elles
    // restent intactes pour la reprise en début de séance suivante et pour la
    // seconde chance après une erreur — qui exigent l'une comme l'autre une
    // phrase JAMAIS vue portant le même piège. Toutes sont piégeantes : les
    // reprises écartent les items neutres, un neutre en réserve ne servirait à
    // rien.
    {
      id: 's06-r1', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-colle',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Les abeilles ', verbe: 'butiner', apres: ' les fleurs du jardin.', attendu: 'butinent',
    },
    {
      id: 's06-r2', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-colle',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Hugo ', verbe: 'choisir', apres: ' un livre à la bibliothèque.', attendu: 'choisit',
    },
    {
      id: 's06-r3', rappel: 'r1', type: 'toucher', palier: 1, piege: 'sujet-colle',
      reserve: true,
      consigne: 'Touche le sujet du verbe.',
      mots: ['Emma', 'termine', 'son', 'exercice', 'de', 'maths.'], attendus: [0],
    },
    {
      id: 's06-r4', rappel: 'r2', type: 'completer', palier: 2, piege: 'ecran-complement-du-nom',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Le chant des oiseaux ', verbe: 'réveiller', apres: ' Zoé chaque matin.',
      attendu: 'réveille',
    },
    {
      id: 's06-r5', rappel: 'r2', type: 'completer', palier: 2, piege: 'ecran-complement-du-nom',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'La chambre des jumeaux ', verbe: 'être', apres: ' toujours en désordre.',
      attendu: 'est',
    },
    {
      id: 's06-r6', rappel: 'r2', type: 'qcm', palier: 2, piege: 'ecran-complement-du-nom',
      reserve: true,
      consigne: 'Cherche le sujet, puis choisis la bonne forme.',
      avant: "L'entraîneur des minimes ", apres: " la fin de l'entraînement.",
      choix: ['siffle', 'sifflent'], attendu: 'siffle',
    },
    {
      id: 's06-r7', rappel: 'r2', type: 'toucher', palier: 2, piege: 'ecran-complement-du-nom',
      reserve: true,
      consigne: 'Touche le sujet du verbe.',
      mots: ['Le', 'cartable', 'de', 'mes', 'frères', 'pèse', 'lourd.'], attendus: [1],
    },
  ],
};
