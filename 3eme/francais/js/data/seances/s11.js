// Séance 11 — L'accord du participe passé.
//
// La dernière carte, l'arbre de décision du participe passé : sans
// auxiliaire, avec être, avec avoir, et les verbes pronominaux.
//
// Ici Evan ÉCRIT la forme : participes à accorder, phrases où il faut trouver
// l'accord fautif. C'est le seul moyen de savoir s'il applique l'arbre, et
// pas seulement s'il le reconnaît.
//
// L'erreur visée : appliquer une règle à la place d'une autre — accorder avec
// le sujet après « avoir », oublier le COD placé avant, accorder tout verbe
// pronominal avec son sujet.

export default {
  numero: 11,
  bloc: 2,
  titre: 'L\'accord du participe passé',
  sousTitre: 'Sans auxiliaire, avec être, avec avoir, verbes pronominaux',
  objectif: 'Accorder le participe passé en suivant l\'arbre : auxiliaire ? être ou avoir ? pronominal ? COD placé avant ?',

  rappels: [
    {
      id: 'r1',
      titre: 'Sans auxiliaire, avec être, avec avoir',
      texte:
        '**Sans auxiliaire**, le participe passé s\'accorde comme un adjectif avec le nom qu\'il qualifie : *des volets **fermés***.\n\n' +
        'Avec **être**, il s\'accorde avec le **sujet** : *Mes tantes sont **venues***.\n\n' +
        'Avec **avoir**, il ne s\'accorde **jamais avec le sujet**. Il s\'accorde avec le **COD** seulement si celui-ci est placé **avant** le verbe : *J\'ai cueilli des fleurs* → *les fleurs que j\'ai **cueillies***.',
      exemples: [
        {
          phrase: 'Les photos ? Je **les** ai **imprimées**.',
          note: '*les* reprend « les photos » : c\'est un COD placé avant le verbe, féminin pluriel. D\'où l\'accord : imprimées.',
        },
      ],
    },
    {
      id: 'r2',
      titre: 'Les verbes pronominaux',
      texte:
        'Verbe **toujours pronominal** (*se souvenir, s\'enfuir, s\'évanouir*) ou de **sens passif** (*ces livres se sont bien vendus*) : accord avec le **sujet**.\n\n' +
        'Les autres : remplace *être* par *avoir* et cherche le **COD**. S\'il est **avant** (souvent *se*), on accorde : *Elle s\'est **coiffée***. S\'il est **après**, ou s\'il n\'y en a pas, le participe reste **invariable** : *Elle s\'est **coiffé** les cheveux. Ils se sont **parlé**.*',
      exemples: [
        {
          phrase: 'Elles se sont **téléphoné**.',
          note: 'On téléphone **à** quelqu\'un : *se* est COI, il n\'y a pas de COD. Le participe reste invariable.',
        },
      ],
    },
  ],

  exercices: [
    // ── Rappel 1 : sans auxiliaire, être, avoir ──────────────────────────
    {
      id: 's11-e1', rappel: 'r1', type: 'completer', palier: 1, piege: 'pp-etre',
      consigne: 'Écris le participe passé, bien accordé.',
      avant: 'Mes cousines sont ', verbe: 'arriver', apres: ' hier soir.', attendu: 'arrivées',
    },
    {
      id: 's11-e2', rappel: 'r1', type: 'completer', palier: 1, piege: 'pp-etre',
      consigne: 'Écris le participe passé, bien accordé.',
      avant: 'Le jardin est ', verbe: 'fleurir', apres: ' tout l\'été.', attendu: 'fleuri',
    },
    {
      id: 's11-e3', rappel: 'r1', type: 'completer', palier: 2, piege: 'pp-etre',
      consigne: 'Écris le participe passé, bien accordé.',
      avant: '', verbe: 'épuiser', apres: ', les randonneuses s\'assirent.', attendu: 'épuisées',
    },
    {
      id: 's11-e4', rappel: 'r1', type: 'corriger', palier: 2, piege: 'pp-etre',
      consigne: 'Relis cette phrase et touche le participe mal accordé.',
      mots: ['Les', 'fenêtres', 'sont', 'resté', 'ouvertes', 'toute', 'la', 'nuit.'],
      fautes: [{ mot: 3, juste: 'restées' }],
    },
    {
      id: 's11-e5', rappel: 'r1', type: 'completer', palier: 1, piege: 'pp-avoir',
      consigne: 'Écris le participe passé, bien accordé.',
      avant: 'Elles ont ', verbe: 'manger', apres: ' toute la tarte.', attendu: 'mangé',
    },
    {
      id: 's11-e6', rappel: 'r1', type: 'completer', palier: 2, piege: 'pp-avoir',
      consigne: 'Écris le participe passé, bien accordé.',
      avant: 'La tarte qu\'elles ont ', verbe: 'manger', apres: ' était délicieuse.', attendu: 'mangée',
    },
    {
      id: 's11-e7', rappel: 'r1', type: 'completer', palier: 3, piege: 'pp-avoir',
      consigne: 'Écris le participe passé, bien accordé.',
      avant: 'Ces chansons, je les ai ', verbe: 'apprendre', apres: ' par cœur.', attendu: 'apprises',
    },
    {
      id: 's11-e8', rappel: 'r1', type: 'corriger', palier: 2, piege: 'pp-avoir',
      consigne: 'Relis cette phrase et touche le participe mal accordé.',
      mots: ['Mes', 'sœurs', 'ont', 'achetées', 'des', 'billets', 'de', 'train.'],
      fautes: [{ mot: 3, juste: 'acheté' }],
    },
    {
      id: 's11-e9', rappel: 'r1', type: 'qcm', palier: 3, piege: 'pp-avoir',
      consigne: 'Quelle est la bonne orthographe ?',
      phrase: 'Les lettres que tu as ___ sont arrivées.',
      choix: ['écrit', 'écrite', 'écrites'], attendu: 'écrites',
    },

    // Réserve du rappel 1.
    {
      id: 's11-r1', rappel: 'r1', type: 'completer', palier: 2, piege: 'pp-etre', reserve: true,
      consigne: 'Écris le participe passé, bien accordé.',
      avant: 'Les invitées sont ', verbe: 'partir', apres: ' à minuit.', attendu: 'parties',
    },
    {
      id: 's11-r2', rappel: 'r1', type: 'corriger', palier: 2, piege: 'pp-etre', reserve: true,
      consigne: 'Relis cette phrase et touche le participe mal accordé.',
      mots: ['Fatigué', 'par', 'le', 'voyage,', 'les', 'enfants', 'dormaient.'],
      fautes: [{ mot: 0, juste: 'Fatigués' }],
    },
    {
      id: 's11-r3', rappel: 'r1', type: 'completer', palier: 2, piege: 'pp-etre', reserve: true,
      consigne: 'Écris le participe passé, bien accordé.',
      avant: 'Ma grand-mère est ', verbe: 'naître', apres: ' en Bretagne.', attendu: 'née',
    },
    {
      id: 's11-r4', rappel: 'r1', type: 'completer', palier: 2, piege: 'pp-avoir', reserve: true,
      consigne: 'Écris le participe passé, bien accordé.',
      avant: 'Les gâteaux qu\'il a ', verbe: 'préparer', apres: ' ont disparu.', attendu: 'préparés',
    },
    {
      id: 's11-r5', rappel: 'r1', type: 'completer', palier: 2, piege: 'pp-avoir', reserve: true,
      consigne: 'Écris le participe passé, bien accordé.',
      avant: 'Nos voisines ont ', verbe: 'visiter', apres: ' deux musées.', attendu: 'visité',
    },
    {
      id: 's11-r6', rappel: 'r1', type: 'corriger', palier: 3, piege: 'pp-avoir', reserve: true,
      consigne: 'Relis cette phrase et touche le participe mal accordé.',
      mots: ['La', 'robe', 'que', 'j\'ai', 'cousu', 'hier', 'te', 'plaît.'],
      fautes: [{ mot: 4, juste: 'cousue' }],
    },

    // ── Rappel 2 : les verbes pronominaux ────────────────────────────────
    {
      id: 's11-e10', rappel: 'r2', type: 'completer', palier: 1, piege: 'pp-pronominal',
      consigne: 'Écris le participe passé, bien accordé.',
      avant: 'Elle s\'est ', verbe: 'laver', apres: ' avant de dîner.', attendu: 'lavée',
    },
    {
      id: 's11-e11', rappel: 'r2', type: 'completer', palier: 2, piege: 'pp-pronominal',
      consigne: 'Écris le participe passé, bien accordé.',
      avant: 'Elle s\'est ', verbe: 'laver', apres: ' les mains.', attendu: 'lavé',
    },
    {
      id: 's11-e12', rappel: 'r2', type: 'completer', palier: 2, piege: 'pp-pronominal',
      consigne: 'Écris le participe passé, bien accordé.',
      avant: 'Les oiseaux se sont ', verbe: 'enfuir', apres: ' à notre approche.', attendu: 'enfuis',
    },
    {
      id: 's11-e13', rappel: 'r2', type: 'qcm', palier: 2, piege: 'pp-pronominal',
      consigne: 'Quelle est la bonne orthographe ?',
      phrase: 'Ils se sont ___ des cadeaux.',
      choix: ['offert', 'offerts'], attendu: 'offert',
    },
    {
      id: 's11-e14', rappel: 'r2', type: 'qcm', palier: 3, piege: 'pp-pronominal',
      consigne: 'Quelle est la bonne orthographe ?',
      phrase: 'Mes amies se sont ___ longtemps au téléphone.',
      choix: ['parlé', 'parlées'], attendu: 'parlé',
    },
    {
      id: 's11-e15', rappel: 'r2', type: 'corriger', palier: 3, piege: 'pp-pronominal',
      consigne: 'Relis cette phrase et touche le participe mal accordé.',
      mots: ['Ces', 'maisons', 'se', 'sont', 'vendu', 'en', 'une', 'semaine.'],
      fautes: [{ mot: 4, juste: 'vendues' }],
    },

    // Réserve du rappel 2.
    {
      id: 's11-r7', rappel: 'r2', type: 'completer', palier: 2, piege: 'pp-pronominal', reserve: true,
      consigne: 'Écris le participe passé, bien accordé.',
      avant: 'Elles se sont ', verbe: 'souvenir', apres: ' de cette journée.', attendu: 'souvenues',
    },
    {
      id: 's11-r8', rappel: 'r2', type: 'completer', palier: 2, piege: 'pp-pronominal', reserve: true,
      consigne: 'Écris le participe passé, bien accordé.',
      avant: 'Elle s\'est ', verbe: 'couper', apres: ' le doigt en cuisinant.', attendu: 'coupé',
    },
    {
      id: 's11-r9', rappel: 'r2', type: 'qcm', palier: 2, piege: 'pp-pronominal', reserve: true,
      consigne: 'Quelle est la bonne orthographe ?',
      phrase: 'Ils se sont ___ dans le parc.',
      choix: ['promené', 'promenés'], attendu: 'promenés',
    },
  ],
};
