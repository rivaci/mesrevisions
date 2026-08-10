// Séance 7 — Le pronom écran.
//
// Même mécanique qu'en séance 6, mais l'écran n'est plus un nom : c'est un
// pronom complément (le, la, les, me, te, nous, vous). Il colle au verbe, il
// porte parfois un pluriel, et il n'est jamais le sujet.
//
// Le palier 3 prépare la séance 15 : avant d'accorder un participe passé, il
// faut savoir à quel groupe renvoie le pronom. On installe le geste ici, sans
// parler encore d'accord.
//
// Piège : `ecran-pronom` sur toute la séance. Le catalogue n'a pas de piège
// propre à la recherche de l'antécédent ; `ecran-pronom` est le plus proche —
// c'est lui qui porte le test « remplace le pronom par un nom ».
//
// Items neutres — paliers 1 et 2 : l'écran a le MÊME nombre que le sujet, pour
// que « petit mot au pluriel → verbe au singulier » ne marche pas. Palier 3 :
// l'antécédent est le nom le plus proche du pronom, pour que « c'est toujours
// le nom qui précède » ne marche pas non plus.

export default {
  numero: 7,
  bloc: 2,
  titre: 'Le pronom écran',
  sousTitre: 'Le petit mot glissé entre le sujet et le verbe',
  objectif:
    "Accorder le verbe malgré un pronom complément intercalé, et retrouver le groupe que ce pronom remplace.",

  rappels: [
    {
      id: 'r1',
      titre: 'Le petit mot qui s\'intercale',
      texte:
        "Entre le sujet et le verbe vient souvent se glisser un petit mot : " +
        "**le, la, les, me, te, nous, vous**.\n\n" +
        "Ce sont des **pronoms compléments**. Ils disent ce qui subit l'action, " +
        "jamais qui la fait. Ils ne commandent donc rien.\n\n" +
        "Le test : **cache le pronom avec ton doigt**, puis relis. " +
        "*Le gardien … arrête.* L'accord redevient évident.",
      // Le pronom écran EST le diagnostic d'Antonin : un mot au pluriel collé au
      // verbe, et l'accord part avec lui. Le doigt qui cache le pronom se montre
      // mieux qu'il ne se raconte.
      animation: {
        mots: ['Le', 'gardien', 'les', 'arrête.'],
        scenes: [
          { type: 'surligner', mots: [3], role: 'verbe', texte: 'Le verbe : « arrête ».' },
          { type: 'fausse-piste', mot: 2,
            texte: '« les » est juste avant, et il est au pluriel. C\'est exactement le piège.' },
          { type: 'dire', texte: 'Cache-le avec ton doigt et relis : « Le gardien … arrête ».' },
          { type: 'surligner', mots: [1], role: 'sujet',
            texte: 'Qui est-ce qui arrête ? Le gardien. Un seul.' },
          { type: 'fleche', de: 1, vers: 3, label: 'sujet → verbe',
            texte: 'Le pronom dit ce qui SUBIT l\'action. Il ne commande jamais rien.' },
          { type: 'terminaison', mot: 0, devient: 'Les', texte: 'Change le vrai sujet, pour voir.' },
          { type: 'terminaison', mot: 1, devient: 'gardiens', texte: '« Les gardiens »…' },
          { type: 'terminaison', mot: 3, devient: 'arrêtent.', texte: '…« arrêtent ». Le pronom, lui, n\'a pas bougé.' },
        ],
      },
      exemples: [
        { phrase: 'Le gardien **les** arrête.', note: 'Qui est-ce qui arrête ? **Le gardien** — un seul → *arrête*.' },
        { phrase: 'Mes cousins **le** connaissent.', note: 'Qui est-ce qui connaît ? **Mes cousins** — plusieurs → *connaissent*.' },
      ],
    },
    {
      id: 'r2',
      titre: 'À quoi renvoie le pronom',
      texte:
        "Un pronom ne sort pas de nulle part : il **remplace un groupe déjà cité** " +
        "dans la phrase. Ce groupe porte un nom : l'**antécédent**.\n\n" +
        "Dans *Anto a rangé ses cartes, puis il **les** compte*, « les » remplace " +
        "*ses cartes*. Pour le retrouver, remonte en arrière et demande : " +
        "*il compte quoi ?*\n\n" +
        "Garde ce réflexe : il resservira pour l'accord du participe passé, " +
        "où c'est l'antécédent qui décide.",
      // Retrouver l'antécédent est un mouvement : on remonte en arrière. La
      // flèche fait ce mouvement à l'écran. Ce réflexe resservira séance 15,
      // où c'est l'antécédent qui décide de l'accord du participe.
      animation: {
        mots: ['Léa', 'a', 'pris', 'ses', 'baskets', 'et', 'elle', 'les', 'met.'],
        scenes: [
          { type: 'surligner', mots: [7], role: 'ecran',
            texte: 'Le pronom « les ». Tout seul, il ne veut rien dire.' },
          { type: 'dire', texte: 'Remonte en arrière et demande : elle met quoi ?' },
          { type: 'fleche', de: 7, vers: 4, label: 'remplace',
            texte: '« les » remplace « ses baskets ».' },
          { type: 'surligner', mots: [3, 4], role: 'accord',
            texte: 'Ce groupe s\'appelle l\'antécédent. Garde ce réflexe : il resservira pour l\'accord du participe passé.' },
        ],
      },
      exemples: [
        { phrase: 'Léa a pris **ses baskets** et elle **les** met.', note: '« les » remplace **ses baskets**.' },
        { phrase: "J'ai revu **ce film** hier, je **le** trouve génial.", note: '« le » remplace **ce film**.' },
      ],
    },
  ],

  exercices: [
    // ── Palier 1 : le, la, les entre le sujet et le verbe ─────────────────
    {
      id: 's07-e1', rappel: 'r1', type: 'completer', palier: 1, piege: 'ecran-pronom',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Le chien les ', verbe: 'suivre', apres: ' partout dans la maison.', attendu: 'suit',
    },
    {
      // NEUTRE : écran pluriel ET sujet pluriel. Sans lui, l'élève retiendrait
      // « petit mot au pluriel juste avant → verbe au singulier ».
      id: 's07-e2', rappel: 'r1', type: 'completer', palier: 1, piege: 'ecran-pronom',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Les surveillants les ', verbe: 'accompagner', apres: ' au gymnase.', attendu: 'accompagnent',
    },
    {
      // Piège inversé : l'écran est singulier, le sujet est pluriel.
      id: 's07-e3', rappel: 'r1', type: 'completer', palier: 1, piege: 'ecran-pronom',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Mes parents le ', verbe: 'conduire', apres: ' au collège.', attendu: 'conduisent',
    },
    {
      // NEUTRE : écran singulier ET sujet singulier.
      id: 's07-e4', rappel: 'r1', type: 'completer', palier: 1, piege: 'ecran-pronom',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: "L'entraîneur le ", verbe: 'féliciter', apres: ' après le match.', attendu: 'félicite',
    },
    {
      id: 's07-e5', rappel: 'r1', type: 'toucher', palier: 1, piege: 'ecran-pronom',
      consigne: 'Touche le sujet du verbe.',
      mots: ['Le', 'gardien', 'les', 'arrête', 'tous.'], attendus: [1],
    },

    // ── Palier 2 : me, te, nous, vous, et deux pronoms à la suite ─────────
    {
      id: 's07-e6', rappel: 'r1', type: 'completer', palier: 2, piege: 'ecran-pronom',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Mon voisin nous ', verbe: 'prêter', apres: ' son échelle.', attendu: 'prête',
    },
    {
      // NEUTRE : écran singulier ET sujet singulier.
      id: 's07-e7', rappel: 'r1', type: 'completer', palier: 2, piege: 'ecran-pronom',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: "L'entraîneur me ", verbe: 'donner', apres: ' un conseil.', attendu: 'donne',
    },
    {
      id: 's07-e8', rappel: 'r1', type: 'completer', palier: 2, piege: 'ecran-pronom',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Ces exercices me ', verbe: 'fatiguer', apres: ' vraiment.', attendu: 'fatiguent',
    },
    {
      // NEUTRE : écran pluriel ET sujet pluriel.
      id: 's07-e9', rappel: 'r1', type: 'completer', palier: 2, piege: 'ecran-pronom',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Mes grands-parents nous ', verbe: 'attendre', apres: ' à la gare.', attendu: 'attendent',
    },
    {
      // Deux pronoms d'affilée : l'écran s'épaissit, le sujet ne bouge pas.
      id: 's07-e10', rappel: 'r1', type: 'completer', palier: 2, piege: 'ecran-pronom',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Le professeur nous les ', verbe: 'rendre', apres: ' demain.', attendu: 'rend',
    },

    // ── Palier 3 : retrouver l'antécédent ────────────────────────────────
    {
      // NEUTRE : l'antécédent est bien le nom le plus proche du pronom.
      id: 's07-e11', rappel: 'r2', type: 'toucher', palier: 3, piege: 'ecran-pronom',
      neutre: true,
      consigne: 'Touche le nom que « les » remplace.',
      mots: ['Léa', 'a', 'acheté', 'des', 'bonbons', 'et', 'elle', 'les', 'partage.'], attendus: [4],
    },
    {
      // Un autre nom (« boîte ») s'est glissé entre l'antécédent et le pronom.
      id: 's07-e12', rappel: 'r2', type: 'toucher', palier: 3, piege: 'ecran-pronom',
      consigne: 'Touche les deux mots que « les » remplace.',
      mots: ['Anto', 'a', 'rangé', 'ses', 'cartes', 'dans', 'une', 'boîte,', 'puis', 'il', 'les', 'a', 'comptées.'],
      attendus: [3, 4],
    },
    {
      // « cousins » est plus proche du pronom, mais on ne range pas des cousins.
      id: 's07-e13', rappel: 'r2', type: 'toucher', palier: 3, piege: 'ecran-pronom',
      consigne: 'Touche le nom que « le » remplace.',
      mots: ['Ma', 'tante', 'a', 'offert', 'un', 'jeu', 'à', 'mes', 'cousins,', 'et', 'ils', 'le', 'rangent', 'déjà.'],
      attendus: [5],
    },
    {
      // NEUTRE : l'antécédent est de nouveau le nom le plus proche.
      id: 's07-e14', rappel: 'r2', type: 'toucher', palier: 3, piege: 'ecran-pronom',
      neutre: true,
      consigne: 'Touche le nom que « la » remplace.',
      mots: ['Le', 'chat', 'a', 'renversé', 'sa', 'gamelle', 'et', 'je', 'la', 'ramasse.'], attendus: [5],
    },

    // ── Palier 1 (suite) ─────────────────────────────────────────────────
    {
      id: 's07-e15', rappel: 'r1', type: 'qcm', palier: 1, piege: 'ecran-pronom',
      consigne: 'Cache le pronom, puis choisis la bonne forme.',
      avant: 'Le professeur les ', apres: ' devant la salle.',
      choix: ['attend', 'attendent'], attendu: 'attend',
    },
    {
      id: 's07-e16', rappel: 'r1', type: 'toucher', palier: 1, piege: 'ecran-pronom',
      consigne: 'Touche le sujet du verbe.',
      mots: ['Sarah', 'les', 'range', 'dans', 'son', 'casier.'], attendus: [0],
    },

    // ── Palier 2 (suite) ─────────────────────────────────────────────────
    {
      // Piège inversé : l'écran est « me », le sujet est pluriel.
      id: 's07-e17', rappel: 'r1', type: 'completer', palier: 2, piege: 'ecran-pronom',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Mes cousins me ', verbe: 'raconter', apres: ' leurs vacances.', attendu: 'racontent',
    },
    {
      // NEUTRE : deux pronoms d'affilée, mais tous les deux au singulier comme
      // le sujet. L'épaisseur de l'écran ne doit pas devenir à elle seule un
      // signal de pluriel.
      id: 's07-e18', rappel: 'r1', type: 'completer', palier: 2, piege: 'ecran-pronom',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Mon frère me le ', verbe: 'prêter', apres: ' le week-end.', attendu: 'prête',
    },

    // ── Palier 3 (suite) ─────────────────────────────────────────────────
    {
      // « table » est plus proche du pronom, mais ce n'est pas elle qu'il a perdue.
      // Pas de virgule avant « et » : sans ce contre-exemple, tous les items
      // piégeants du palier en porteraient une et aucun neutre — l'élève
      // répondrait à la virgule au lieu de chercher l'antécédent.
      id: 's07-e19', rappel: 'r2', type: 'toucher', palier: 3, piege: 'ecran-pronom',
      consigne: 'Touche les deux mots que « les » remplace.',
      mots: ['Tom', 'a', 'posé', 'ses', 'clés', 'sur', 'la', 'table', 'et', 'il', 'ne', 'les', 'retrouve', 'plus.'],
      attendus: [3, 4],
    },
    {
      // Un prénom s'intercale : c'est le mot le plus proche, ce n'est pas lui.
      id: 's07-e20', rappel: 'r2', type: 'toucher', palier: 3, piege: 'ecran-pronom',
      consigne: 'Touche le nom que « le » remplace.',
      mots: ['Hugo', 'a', 'oublié', 'son', 'cahier', 'chez', 'Léa,', 'et', 'il', 'le', 'cherche', 'partout.'],
      attendus: [4],
    },

    // ── Réserve ──────────────────────────────────────────────────────────
    //
    // `reserve: true` : jamais jouées dans le parcours. Elles sont gardées
    // intactes pour la reprise en début de séance suivante et pour la seconde
    // chance après une erreur — deux moments qui exigent une phrase JAMAIS vue
    // portant le même piège. Toutes sont piégeantes : les reprises écartent les
    // items neutres, une réserve neutre ne serait jamais proposée.
    {
      id: 's07-r1', rappel: 'r1', type: 'completer', palier: 1, piege: 'ecran-pronom',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'La voisine les ', verbe: 'saluer', apres: ' chaque matin.', attendu: 'salue',
    },
    {
      id: 's07-r2', rappel: 'r1', type: 'toucher', palier: 1, piege: 'ecran-pronom',
      reserve: true,
      consigne: 'Touche le sujet du verbe.',
      mots: ['Les', 'joueurs', 'le', 'portent', 'sur', 'leurs', 'épaules.'], attendus: [1],
    },
    {
      id: 's07-r3', rappel: 'r1', type: 'completer', palier: 2, piege: 'ecran-pronom',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Tes messages me ', verbe: 'rassurer', apres: ' toujours.', attendu: 'rassurent',
    },
    {
      id: 's07-r4', rappel: 'r1', type: 'qcm', palier: 2, piege: 'ecran-pronom',
      reserve: true,
      consigne: 'Cache les pronoms, puis choisis la bonne forme.',
      avant: 'Les moniteurs vous le ', apres: ' avant le départ.',
      choix: ['montre', 'montrent'], attendu: 'montrent',
    },
    {
      id: 's07-r5', rappel: 'r2', type: 'toucher', palier: 3, piege: 'ecran-pronom',
      reserve: true,
      consigne: 'Touche le nom que « le » remplace.',
      mots: ['Zoé', 'a', 'rapporté', 'un', 'souvenir', 'à', 'ses', 'parents,', 'et', 'ils', 'le', 'montrent', 'partout.'],
      attendus: [4],
    },
  ],
};
