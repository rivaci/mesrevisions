// Séance 6 — Les fonctions autour du verbe (et de l'adjectif).
//
// Deuxième carte, « Les fonctions grammaticales », première moitié : ce qui
// tourne autour du verbe (sujet, COD, COI, attributs, complément d'agent,
// compléments essentiels) et autour de l'adjectif.
//
// L'erreur visée : décider d'une fonction d'après une question récitée
// (« quoi ? », « où ? ») ou d'après la place du groupe, au lieu de faire le
// test sur la phrase — remplacer le verbe par « être », supprimer, déplacer.

export default {
  numero: 6,
  bloc: 2,
  titre: 'Les fonctions autour du verbe',
  sousTitre: 'Sujet, COD, COI, attributs, compléments essentiels',
  objectif: 'Trouver la fonction d\'un groupe par un test sur la phrase, pas par sa place ni par une question récitée.',

  rappels: [
    {
      id: 'r1',
      titre: 'Sujet, COD, COI, complément d\'agent',
      texte:
        'Le **sujet** commande le verbe : « Qui est-ce qui… ? ». Il peut être placé **après** le verbe : *Au loin passait **un cavalier***.\n\n' +
        'Le **COD** se construit sans préposition (*Elle lit **un roman***), le **COI** avec une préposition (*Elle parle **à son frère***).\n\n' +
        'À la voix passive, le **complément d\'agent** désigne celui qui fait l\'action, souvent après *par* : *Le gâteau est dévoré **par les enfants***.',
      exemples: [
        {
          phrase: 'Dans la cour jouaient **les enfants**.',
          note: 'Qui est-ce qui jouait ? — les enfants : c\'est le sujet, placé après le verbe. *Dans la cour* est un complément circonstanciel de lieu.',
        },
      ],
    },
    {
      id: 'r2',
      titre: 'Attributs, compléments essentiels, et l\'adjectif',
      texte:
        'Après un **verbe d\'état** (*être, paraître, sembler, devenir, rester, avoir l\'air*), l\'**attribut du sujet** dit ce qu\'est le sujet : *Ma sœur deviendra **avocate***. L\'**attribut du COD** dit ce qu\'est le COD : *On l\'a nommé **capitaine***.\n\n' +
        'Le **complément essentiel** (lieu, temps, prix, poids, mesure) ne se supprime pas : *Il va **à Rome**. Ce livre coûte **dix euros**.* Le **complément circonstanciel**, lui, se supprime et se déplace.\n\n' +
        'Autour de l\'adjectif : complément de l\'adjectif (*fier **de son fils***), du comparatif (*plus grand **que moi***), du superlatif (*le plus rapide **de la classe***).',
      exemples: [
        {
          phrase: 'Il **reste** calme. / Il **reste** à la maison.',
          note: 'Dans la première phrase, *rester* est un verbe d\'état : *calme* est attribut du sujet. Dans la seconde, *à la maison* dit le lieu et ne peut pas disparaître : complément essentiel de lieu.',
        },
      ],
    },
  ],

  exercices: [
    // ── Rappel 1 : sujet, COD, COI, complément d'agent ───────────────────
    {
      id: 's06-e1', rappel: 'r1', type: 'toucher', palier: 1, piege: 'sujet-inverse',
      consigne: 'Touche le nom qui est sujet du verbe « passait ».',
      mots: ['Sur', 'la', 'route', 'passait', 'un', 'vieux', 'camion.'], attendus: [6],
    },
    {
      id: 's06-e2', rappel: 'r1', type: 'qcm', palier: 1, piege: 'sujet-inverse',
      consigne: 'Quelle est la fonction du groupe en gras ?',
      phrase: 'Dans le grenier dormait **un vieux chat**.',
      choix: ['sujet', 'COD', 'complément circonstanciel de lieu'], attendu: 'sujet',
    },
    {
      id: 's06-e3', rappel: 'r1', type: 'qcm', palier: 1, piege: 'sujet-inverse',
      consigne: 'Quelle est la fonction du groupe en gras ?',
      phrase: 'Le facteur apporte **un colis**.',
      choix: ['sujet', 'COD', 'COI'], attendu: 'COD',
    },
    {
      id: 's06-e4', rappel: 'r1', type: 'qcm', palier: 2, piege: 'sujet-inverse',
      consigne: 'Quelle est la fonction du mot en gras ?',
      phrase: '« Je reviens tout de suite », dit **Paul**.',
      choix: ['sujet', 'COD', 'COI'], attendu: 'sujet',
    },
    {
      id: 's06-e5', rappel: 'r1', type: 'qcm', palier: 2, piege: 'complement-du-verbe-ou-cc',
      consigne: 'Quelle est la fonction du groupe en gras ?',
      phrase: 'Elle parle souvent **à son frère**.',
      choix: ['COD', 'COI', 'complément circonstanciel de lieu'], attendu: 'COI',
    },
    {
      id: 's06-e6', rappel: 'r1', type: 'qcm', palier: 2, piege: 'complement-du-verbe-ou-cc',
      consigne: 'Quelle est la fonction du groupe en gras ?',
      phrase: 'Le gâteau a été mangé **par le chien**.',
      choix: ['complément d\'agent', 'complément circonstanciel de lieu', 'COI'], attendu: 'complément d\'agent',
    },
    {
      id: 's06-e7', rappel: 'r1', type: 'qcm', palier: 3, piege: 'complement-du-verbe-ou-cc',
      consigne: 'Quelle est la fonction du groupe en gras ?',
      phrase: 'Le chat est entré **par la fenêtre**.',
      choix: ['complément d\'agent', 'complément circonstanciel de lieu', 'COI'], attendu: 'complément circonstanciel de lieu',
    },

    // Réserve du rappel 1.
    {
      id: 's06-r1', rappel: 'r1', type: 'qcm', palier: 2, piege: 'sujet-inverse', reserve: true,
      consigne: 'Quelle est la fonction du groupe en gras ?',
      phrase: 'Au bout du chemin apparut **une maison**.',
      choix: ['sujet', 'COD', 'complément circonstanciel de lieu'], attendu: 'sujet',
    },
    {
      id: 's06-r2', rappel: 'r1', type: 'qcm', palier: 2, piege: 'sujet-inverse', reserve: true,
      consigne: 'Quelle est la fonction du groupe en gras ?',
      phrase: '« Viens vite ! » cria **ma mère**.',
      choix: ['sujet', 'COD', 'COI'], attendu: 'sujet',
    },
    {
      id: 's06-r3', rappel: 'r1', type: 'toucher', palier: 2, piege: 'sujet-inverse', reserve: true,
      consigne: 'Touche le nom qui est sujet du verbe « s\'élevait ».',
      mots: ['Au', 'milieu', 'du', 'village', 's\'élevait', 'une', 'église.'], attendus: [6],
    },
    {
      id: 's06-r4', rappel: 'r1', type: 'qcm', palier: 2, piege: 'complement-du-verbe-ou-cc', reserve: true,
      consigne: 'Quelle est la fonction du groupe en gras ?',
      phrase: 'Il rêve **de longues vacances**.',
      choix: ['COD', 'COI', 'complément circonstanciel de cause'], attendu: 'COI',
    },
    {
      id: 's06-r5', rappel: 'r1', type: 'qcm', palier: 2, piege: 'complement-du-verbe-ou-cc', reserve: true,
      consigne: 'Quelle est la fonction du groupe en gras ?',
      phrase: 'La lettre a été postée **par ma voisine**.',
      choix: ['complément d\'agent', 'COI', 'complément circonstanciel de moyen'], attendu: 'complément d\'agent',
    },

    // ── Rappel 2 : attributs, compléments essentiels, adjectif ───────────
    {
      id: 's06-e8', rappel: 'r2', type: 'qcm', palier: 1, piege: 'cod-ou-attribut',
      consigne: 'Quelle est la fonction du mot en gras ?',
      phrase: 'Ma cousine est devenue **pilote**.',
      choix: ['COD', 'attribut du sujet', 'attribut du COD'], attendu: 'attribut du sujet',
    },
    {
      id: 's06-e9', rappel: 'r2', type: 'qcm', palier: 1, piege: 'cod-ou-attribut',
      consigne: 'Quelle est la fonction du groupe en gras ?',
      phrase: 'Ma cousine a rencontré **une pilote**.',
      choix: ['COD', 'attribut du sujet', 'attribut du COD'], attendu: 'COD',
    },
    {
      id: 's06-e10', rappel: 'r2', type: 'qcm', palier: 2, piege: 'cod-ou-attribut',
      consigne: 'Quelle est la fonction du mot en gras ?',
      phrase: 'Ce chemin semble **dangereux**.',
      choix: ['COD', 'attribut du sujet', 'complément circonstanciel de manière'], attendu: 'attribut du sujet',
    },
    {
      id: 's06-e11', rappel: 'r2', type: 'qcm', palier: 3, piege: 'cod-ou-attribut',
      consigne: 'Quelle est la fonction du mot en gras ?',
      phrase: 'Les élèves ont élu Léa **déléguée**.',
      choix: ['COD', 'attribut du sujet', 'attribut du COD'], attendu: 'attribut du COD',
    },
    {
      id: 's06-e12', rappel: 'r2', type: 'toucher', palier: 2, piege: 'cod-ou-attribut',
      consigne: 'Touche l\'attribut du sujet.',
      mots: ['Après', 'la', 'course,', 'les', 'coureurs', 'paraissent', 'épuisés.'], attendus: [6],
    },
    {
      id: 's06-e13', rappel: 'r2', type: 'qcm', palier: 2, piege: 'complement-du-verbe-ou-cc',
      consigne: 'Quelle est la fonction du groupe en gras ?',
      phrase: 'Nous allons **à la piscine**.',
      choix: ['complément circonstanciel de lieu', 'complément essentiel de lieu', 'COI'], attendu: 'complément essentiel de lieu',
    },
    {
      id: 's06-e14', rappel: 'r2', type: 'qcm', palier: 2, piege: 'complement-du-verbe-ou-cc',
      consigne: 'Quelle est la fonction du groupe en gras ?',
      phrase: 'Nous nageons **à la piscine**.',
      choix: ['complément circonstanciel de lieu', 'complément essentiel de lieu', 'COI'], attendu: 'complément circonstanciel de lieu',
    },
    {
      id: 's06-e15', rappel: 'r2', type: 'qcm', palier: 3, piege: 'complement-du-verbe-ou-cc',
      consigne: 'Quelle est la fonction du groupe en gras ?',
      phrase: 'Ce melon pèse **deux kilos**.',
      choix: ['COD', 'complément essentiel de poids', 'attribut du sujet'], attendu: 'complément essentiel de poids',
    },
    {
      id: 's06-e16', rappel: 'r2', type: 'qcm', palier: 2, piege: 'complement-de-l-adjectif',
      consigne: 'Quelle est la fonction du groupe en gras ?',
      phrase: 'Mon cousin est allergique **aux chats**.',
      choix: ['COI', 'complément de l\'adjectif', 'complément du nom'], attendu: 'complément de l\'adjectif',
    },
    {
      id: 's06-e17', rappel: 'r2', type: 'qcm', palier: 2, piege: 'complement-de-l-adjectif',
      consigne: 'Quelle est la fonction du groupe en gras ?',
      phrase: 'Mon frère est plus rapide **que moi**.',
      choix: ['complément du comparatif', 'complément du superlatif', 'COD'], attendu: 'complément du comparatif',
    },
    {
      id: 's06-e18', rappel: 'r2', type: 'qcm', palier: 3, piege: 'complement-de-l-adjectif',
      consigne: 'Quelle est la fonction du groupe en gras ?',
      phrase: 'Léa est la plus rapide **de la classe**.',
      choix: ['complément du comparatif', 'complément du superlatif', 'complément du nom'], attendu: 'complément du superlatif',
    },

    // Réserve du rappel 2.
    {
      id: 's06-r6', rappel: 'r2', type: 'qcm', palier: 2, piege: 'complement-du-verbe-ou-cc', reserve: true,
      consigne: 'Quelle est la fonction du groupe en gras ?',
      phrase: 'Ce vélo coûte **trois cents euros**.',
      choix: ['COD', 'complément essentiel de prix', 'complément circonstanciel de manière'], attendu: 'complément essentiel de prix',
    },
    {
      id: 's06-r7', rappel: 'r2', type: 'qcm', palier: 2, piege: 'cod-ou-attribut', reserve: true,
      consigne: 'Quelle est la fonction du mot en gras ?',
      phrase: 'Le ciel reste **gris**.',
      choix: ['COD', 'attribut du sujet', 'complément circonstanciel de manière'], attendu: 'attribut du sujet',
    },
    {
      id: 's06-r8', rappel: 'r2', type: 'qcm', palier: 3, piege: 'cod-ou-attribut', reserve: true,
      consigne: 'Quelle est la fonction du mot en gras ?',
      phrase: 'Le jury a déclaré Tom **vainqueur**.',
      choix: ['COD', 'attribut du sujet', 'attribut du COD'], attendu: 'attribut du COD',
    },
    {
      id: 's06-r9', rappel: 'r2', type: 'qcm', palier: 2, piege: 'cod-ou-attribut', reserve: true,
      consigne: 'Quelle est la fonction du mot en gras ?',
      phrase: 'Notre voisin a l\'air **malade**.',
      choix: ['COD', 'attribut du sujet', 'complément du nom'], attendu: 'attribut du sujet',
    },
    {
      id: 's06-r10', rappel: 'r2', type: 'qcm', palier: 2, piege: 'complement-de-l-adjectif', reserve: true,
      consigne: 'Quelle est la fonction du groupe en gras ?',
      phrase: 'Elle est heureuse **de ce cadeau**.',
      choix: ['COI', 'complément de l\'adjectif', 'complément du nom'], attendu: 'complément de l\'adjectif',
    },
    {
      id: 's06-r11', rappel: 'r2', type: 'qcm', palier: 2, piege: 'complement-de-l-adjectif', reserve: true,
      consigne: 'Quelle est la fonction du groupe en gras ?',
      phrase: 'Ce sac est plus lourd **que le mien**.',
      choix: ['complément du comparatif', 'complément du superlatif', 'COD'], attendu: 'complément du comparatif',
    },
    {
      id: 's06-r12', rappel: 'r2', type: 'qcm', palier: 3, piege: 'complement-de-l-adjectif', reserve: true,
      consigne: 'Quelle est la fonction du groupe en gras ?',
      phrase: 'Hugo est le plus jeune **de l\'équipe**.',
      choix: ['complément du comparatif', 'complément du superlatif', 'complément du nom'], attendu: 'complément du superlatif',
    },
  ],
};
