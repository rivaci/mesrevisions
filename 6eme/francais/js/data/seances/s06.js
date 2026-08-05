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
  ],
};
