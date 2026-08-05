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
  ],
};
