// Séance 22 — Le sujet : qui est-ce qui ?
//
// Bloc 5, en 5e : le chapitre 9 du cahier d'Antonin, « Le sujet et l'attribut
// du sujet ». Cette séance reprend la première partie : trouver le sujet, même
// placé après le verbe ou long de plusieurs mots, et dire sa nature (nom, GN,
// pronom, infinitif, groupe infinitif, proposition subordonnée).
//
// Le réflexe « qui est-ce qui + verbe ? » est celui des séances 6 à 10 : il
// servait à accorder le verbe, il sert ici à nommer la fonction. Les phrases
// sont écrites pour l'appli, pas reprises du cahier.

export default {
  numero: 22,
  bloc: 5,
  titre: 'Le sujet : qui est-ce qui ?',
  sousTitre: 'Le trouver, même après le verbe, et dire sa nature',
  objectif: 'Trouver tout le groupe sujet, même inversé, et reconnaître sa nature.',

  rappels: [
    {
      id: 'r1',
      titre: 'Trouver le sujet',
      texte:
        'Le **sujet** répond à la question « **Qui est-ce qui ?** » ou « **Qu\'est-ce qui ?** » suivie du **verbe**.\n\n' +
        'Il est souvent **avant** le verbe, mais parfois **après** : c\'est un **sujet inversé** (dans une question, après « peut-être », après un complément de lieu ou de temps).\n\n' +
        'Le sujet, c\'est **tout le groupe** qui répond à la question, pas seulement un mot.',
      exemples: [
        { phrase: '**La pharmacie du quartier** ferme à vingt heures.', note: 'Qu\'est-ce qui ferme ? La pharmacie du quartier : tout le groupe.' },
        { phrase: 'Bientôt arrivera **le train de Lyon**.', note: 'Qu\'est-ce qui arrivera ? Le train de Lyon, placé après le verbe : un sujet inversé.' },
      ],
    },
    {
      id: 'r2',
      titre: 'Les natures du sujet',
      texte:
        'Le sujet n\'est pas toujours un nom. Il peut être :\n\n' +
        'un **nom** (*Lucie*) · un **groupe nominal** (*le chat de la voisine*) · un **pronom** (*elles*) · ' +
        'un **infinitif** (*Nager*) · un **groupe infinitif** (*Faire du vélo le dimanche*) · ' +
        'une **proposition subordonnée** (*Que tu sois déjà prêt*).',
      exemples: [
        { phrase: '**Nager** me détend.', note: 'Qu\'est-ce qui me détend ? Nager : un infinitif.' },
        { phrase: '**Que tu sois déjà prêt** nous étonne.', note: 'Qu\'est-ce qui nous étonne ? Que tu sois déjà prêt : une proposition subordonnée.' },
      ],
    },
  ],

  exercices: [
    // ── Rappel 1 : trouver le sujet ──────────────────────────────────────
    {
      id: 's22-e1', rappel: 'r1', type: 'toucher', palier: 1, piege: 'trouver-sujet',
      consigne: 'Touche le sujet du verbe « ferme ».',
      mots: ['La', 'pharmacie', 'du', 'quartier', 'ferme', 'à', 'vingt', 'heures.'], attendus: [0, 1, 2, 3],
    },
    {
      id: 's22-e2', rappel: 'r1', type: 'toucher', palier: 1, piege: 'trouver-sujet',
      consigne: 'Touche le sujet du verbe « aboie ».',
      mots: ['Dans', 'la', 'cour,', 'le', 'chien', 'aboie.'], attendus: [3, 4],
    },
    {
      id: 's22-e3', rappel: 'r1', type: 'toucher', palier: 2, piege: 'trouver-sujet',
      consigne: 'Touche le sujet du verbe « sont ».',
      mots: ['Les', 'clés', 'de', 'la', 'voiture', 'sont', 'sur', 'la', 'table.'], attendus: [0, 1, 2, 3, 4],
    },
    {
      id: 's22-e4', rappel: 'r1', type: 'toucher', palier: 2, piege: 'trouver-sujet',
      consigne: 'Touche le sujet du verbe « arrivera ».',
      mots: ['Bientôt', 'arrivera', 'le', 'train', 'de', 'Lyon.'], attendus: [2, 3, 4, 5],
    },
    {
      id: 's22-e5', rappel: 'r1', type: 'toucher', palier: 2, piege: 'trouver-sujet',
      consigne: 'Touche le sujet du verbe « habitent ».',
      mots: ['Où', 'habitent', 'tes', 'cousins', '?'], attendus: [2, 3],
    },
    {
      id: 's22-e6', rappel: 'r1', type: 'toucher', palier: 3, piege: 'trouver-sujet',
      consigne: 'Touche le sujet du verbe « détend ».',
      mots: ['Nager', 'me', 'détend', 'après', 'les', 'cours.'], attendus: [0],
    },
    {
      id: 's22-e7', rappel: 'r1', type: 'toucher', palier: 3, piege: 'trouver-sujet',
      consigne: 'Touche le sujet du verbe « étonne ».',
      mots: ['Que', 'tu', 'sois', 'déjà', 'prêt', 'nous', 'étonne.'], attendus: [0, 1, 2, 3, 4],
    },

    // ── Rappel 2 : la nature du sujet ────────────────────────────────────
    {
      id: 's22-e8', rappel: 'r2', type: 'qcm', palier: 1, piege: 'nature-groupe',
      consigne: 'Quelle est la nature du sujet en gras ?',
      phrase: '**Lucie** prépare un gâteau.',
      choix: ['un nom', 'un groupe nominal', 'un pronom'], attendu: 'un nom',
    },
    {
      id: 's22-e9', rappel: 'r2', type: 'qcm', palier: 1, piege: 'nature-groupe',
      consigne: 'Quelle est la nature du sujet en gras ?',
      phrase: '**Le chat de la voisine** dort au soleil.',
      choix: ['un groupe nominal', 'un nom', 'un pronom'], attendu: 'un groupe nominal',
    },
    {
      id: 's22-e10', rappel: 'r2', type: 'qcm', palier: 1, piege: 'nature-groupe',
      consigne: 'Quelle est la nature du sujet en gras ?',
      phrase: 'Demain, **elles** partiront tôt.',
      choix: ['un pronom', 'un nom', 'un groupe nominal'], attendu: 'un pronom',
    },
    {
      id: 's22-e11', rappel: 'r2', type: 'qcm', palier: 2, piege: 'nature-groupe',
      consigne: 'Quelle est la nature du sujet en gras ?',
      phrase: '**Nager** me détend.',
      choix: ['un infinitif', 'un groupe infinitif', 'un nom'], attendu: 'un infinitif',
    },
    {
      id: 's22-e12', rappel: 'r2', type: 'qcm', palier: 2, piege: 'nature-groupe',
      consigne: 'Quelle est la nature du sujet en gras ?',
      phrase: '**Faire du vélo le dimanche** me plaît.',
      choix: ['un groupe infinitif', 'un infinitif', 'un groupe nominal'], attendu: 'un groupe infinitif',
    },
    {
      id: 's22-e13', rappel: 'r2', type: 'qcm', palier: 3, piege: 'nature-groupe',
      consigne: 'Quelle est la nature du sujet en gras ?',
      phrase: '**Que tu sois déjà prêt** nous étonne.',
      choix: ['une proposition subordonnée', 'un groupe nominal', 'un groupe infinitif'], attendu: 'une proposition subordonnée',
    },

    // Réserve.
    {
      id: 's22-r1', rappel: 'r1', type: 'toucher', palier: 2, piege: 'trouver-sujet', reserve: true,
      consigne: 'Touche le sujet du verbe « pousse ».',
      mots: ['Au', 'fond', 'du', 'jardin', 'pousse', 'un', 'vieux', 'pommier.'], attendus: [5, 6, 7],
    },
    {
      id: 's22-r2', rappel: 'r1', type: 'toucher', palier: 2, piege: 'trouver-sujet', reserve: true,
      consigne: 'Touche le sujet du verbe « tombent ».',
      mots: ['Les', 'feuilles', 'du', 'vieux', 'chêne', 'tombent.'], attendus: [0, 1, 2, 3, 4],
    },
    {
      id: 's22-r3', rappel: 'r1', type: 'toucher', palier: 3, piege: 'trouver-sujet', reserve: true,
      consigne: 'Touche le sujet du verbe « calme ».',
      mots: ['Lire', 'avant', 'de', 'dormir', 'me', 'calme.'], attendus: [0, 1, 2, 3],
    },
    {
      id: 's22-r4', rappel: 'r2', type: 'qcm', palier: 2, piege: 'nature-groupe', reserve: true,
      consigne: 'Quelle est la nature du sujet en gras ?',
      phrase: '**Courir** fatigue mon grand-père.',
      choix: ['un infinitif', 'un groupe infinitif', 'un nom'], attendu: 'un infinitif',
    },
    {
      id: 's22-r5', rappel: 'r2', type: 'qcm', palier: 2, piege: 'nature-groupe', reserve: true,
      consigne: 'Quelle est la nature du sujet en gras ?',
      phrase: '**Le bus de l\'école** est en retard.',
      choix: ['un groupe nominal', 'un nom', 'un pronom'], attendu: 'un groupe nominal',
    },
    {
      id: 's22-r6', rappel: 'r2', type: 'qcm', palier: 3, piege: 'nature-groupe', reserve: true,
      consigne: 'Quelle est la nature du sujet en gras ?',
      phrase: '**Qu\'il pleuve demain** serait dommage.',
      choix: ['une proposition subordonnée', 'un groupe infinitif', 'un groupe nominal'], attendu: 'une proposition subordonnée',
    },
  ],
};
