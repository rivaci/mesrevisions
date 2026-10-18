// Séance 23 — L'attribut du sujet.
//
// Bloc 5, en 5e : la deuxième partie du chapitre 9 du cahier d'Antonin.
// L'attribut dit ce qu'est le sujet, ou comment il est, par un verbe
// attributif ; le test du signe = le sépare du COD (son exercice 5, où
// « veulent être pompiers » a été marqué ≠). Et l'accord : un attribut
// adjectif s'accorde avec le sujet, même quand le verbe les sépare — le
// réflexe « cherche le sujet » des séances 6 à 10, appliqué à l'adjectif.
//
// Les items neutres de l'accord : un sujet masculin singulier, où l'adjectif
// ne prend aucune marque. Sans eux, Antonin apprendrait « attribut = -e ou -s ».

export default {
  numero: 23,
  bloc: 5,
  titre: 'L\'attribut du sujet',
  sousTitre: 'Ce qu\'est le sujet, ou comment il est',
  objectif: 'Reconnaître l\'attribut grâce au verbe attributif et au signe =, et l\'accorder avec le sujet.',

  rappels: [
    {
      id: 'r1',
      titre: 'Un attribut, un verbe attributif',
      texte:
        'L\'**attribut du sujet** dit **ce qu\'est** le sujet ou **comment il est**, par l\'intermédiaire d\'un **verbe attributif** :\n\n' +
        '**être, sembler, paraître, devenir, rester**… et parfois *avoir l\'air, passer pour, s\'appeler, tomber (malade), rentrer, arriver*.\n\n' +
        'Le test : le **sujet = l\'attribut**. Avec un verbe d\'action, le groupe est **autre chose** que le sujet : c\'est souvent un **COD** (≠).',
      exemples: [
        { phrase: 'Mon cousin est devenu **un excellent nageur**.', note: 'Mon cousin = un excellent nageur : attribut du sujet.' },
        { phrase: 'Mon cousin a battu **un excellent nageur**.', note: 'Mon cousin ≠ ce nageur : COD.' },
      ],
    },
    {
      id: 'r2',
      titre: 'Sa nature, et son accord',
      texte:
        'L\'attribut peut être un **adjectif** (*déserte*), un **participe**, un **nom**, un **groupe nominal**, un **pronom** (*je le suis*), un **groupe infinitif** (*de devenir pilote*) ou une **proposition subordonnée**.\n\n' +
        'L\'attribut **adjectif s\'accorde avec le sujet**, en genre et en nombre, même si le verbe les sépare.',
      exemples: [
        { phrase: 'Les rues semblent **désertes**.', note: 'Qu\'est-ce qui semble désert ? Les rues : féminin pluriel → désertes.' },
        { phrase: 'Le gâteau paraît **délicieux**.', note: 'Le gâteau : masculin singulier → délicieux, sans marque.' },
      ],
    },
  ],

  exercices: [
    // ── Rappel 1 : reconnaître l'attribut ────────────────────────────────
    {
      id: 's23-e1', rappel: 'r1', type: 'toucher', palier: 1, piege: 'epithete-ou-attribut',
      consigne: 'Touche l\'attribut du sujet.',
      mots: ['La', 'grosse', 'valise', 'semble', 'lourde.'], attendus: [4],
    },
    {
      id: 's23-e2', rappel: 'r1', type: 'toucher', palier: 2, piege: 'epithete-ou-attribut',
      consigne: 'Touche l\'attribut du sujet.',
      mots: ['Mon', 'vieux', 'vélo', 'est', 'solide.'], attendus: [4],
    },
    {
      id: 's23-e3', rappel: 'r1', type: 'qcm', palier: 1, piege: 'attribut-ou-cod',
      consigne: 'Le groupe en gras est-il attribut du sujet ou COD ?',
      phrase: 'Mon cousin est devenu **un excellent nageur**.',
      choix: ['attribut du sujet', 'COD'], attendu: 'attribut du sujet',
    },
    {
      id: 's23-e4', rappel: 'r1', type: 'qcm', palier: 1, piege: 'attribut-ou-cod',
      consigne: 'Le groupe en gras est-il attribut du sujet ou COD ?',
      phrase: 'Mon cousin a battu **un excellent nageur**.',
      choix: ['attribut du sujet', 'COD'], attendu: 'COD',
    },
    {
      id: 's23-e5', rappel: 'r1', type: 'qcm', palier: 2, piege: 'attribut-ou-cod',
      consigne: 'Le groupe en gras est-il attribut du sujet ou COD ?',
      phrase: 'Mes sœurs veulent être **infirmières**.',
      choix: ['attribut du sujet', 'COD'], attendu: 'attribut du sujet',
    },
    {
      id: 's23-e6', rappel: 'r1', type: 'qcm', palier: 2, piege: 'attribut-ou-cod',
      consigne: 'Le groupe en gras est-il attribut du sujet ou COD ?',
      phrase: 'Les enfants regardent **les pompiers**.',
      choix: ['attribut du sujet', 'COD'], attendu: 'COD',
    },
    {
      id: 's23-e7', rappel: 'r1', type: 'qcm', palier: 3, piege: 'attribut-ou-cod',
      consigne: 'Le groupe en gras est-il attribut du sujet ou COD ?',
      phrase: 'Ce garçon s\'appelle **Malo**.',
      choix: ['attribut du sujet', 'COD'], attendu: 'attribut du sujet',
    },

    // ── Rappel 2 : la nature, et l'accord ────────────────────────────────
    {
      id: 's23-e8', rappel: 'r2', type: 'qcm', palier: 1, piege: 'nature-groupe',
      consigne: 'Quelle est la nature de l\'attribut en gras ?',
      phrase: 'Cette plage semble **déserte**.',
      choix: ['un adjectif', 'un groupe nominal', 'un groupe infinitif'], attendu: 'un adjectif',
    },
    {
      id: 's23-e9', rappel: 'r2', type: 'qcm', palier: 2, piege: 'nature-groupe',
      consigne: 'Quelle est la nature de l\'attribut en gras ?',
      phrase: 'Son rêve est **de devenir pilote**.',
      choix: ['un groupe infinitif', 'un infinitif', 'une proposition subordonnée'], attendu: 'un groupe infinitif',
    },
    {
      id: 's23-e10', rappel: 'r2', type: 'completer', palier: 1, piege: 'accord-attribut',
      consigne: 'Accorde l\'adjectif avec le sujet.',
      avant: 'Les rues semblent ', verbe: 'désert', apres: ' ce matin.',
      attendu: 'désertes',
    },
    {
      id: 's23-e11', rappel: 'r2', type: 'completer', palier: 1, piege: 'accord-attribut', neutre: true,
      consigne: 'Accorde l\'adjectif avec le sujet.',
      avant: 'Le gâteau paraît ', verbe: 'délicieux', apres: '.',
      attendu: 'délicieux',
    },
    {
      id: 's23-e12', rappel: 'r2', type: 'completer', palier: 2, piege: 'accord-attribut',
      consigne: 'Accorde l\'adjectif avec le sujet.',
      avant: 'Ma petite sœur est devenue ', verbe: 'grand', apres: '.',
      attendu: 'grande',
    },
    {
      id: 's23-e13', rappel: 'r2', type: 'completer', palier: 2, piege: 'accord-attribut', neutre: true,
      consigne: 'Accorde l\'adjectif avec le sujet.',
      avant: 'Ton frère a l\'air ', verbe: 'content', apres: ' de son match.',
      attendu: 'content',
    },
    {
      id: 's23-e14', rappel: 'r2', type: 'completer', palier: 3, piege: 'accord-attribut',
      consigne: 'Accorde l\'adjectif avec le sujet.',
      avant: 'Les fenêtres de la classe sont restées ', verbe: 'ouvert', apres: ' toute la nuit.',
      attendu: 'ouvertes',
    },
    {
      id: 's23-e15', rappel: 'r2', type: 'completer', palier: 3, piege: 'accord-attribut',
      consigne: 'Accorde l\'adjectif avec le sujet.',
      avant: 'Ces deux chiennes sont très ', verbe: 'joueur', apres: '.',
      attendu: 'joueuses',
    },

    // Réserve.
    {
      id: 's23-r1', rappel: 'r1', type: 'qcm', palier: 2, piege: 'attribut-ou-cod', reserve: true,
      consigne: 'Le groupe en gras est-il attribut du sujet ou COD ?',
      phrase: 'Ce chien est **un berger allemand**.',
      choix: ['attribut du sujet', 'COD'], attendu: 'attribut du sujet',
    },
    {
      id: 's23-r2', rappel: 'r1', type: 'qcm', palier: 2, piege: 'attribut-ou-cod', reserve: true,
      consigne: 'Le groupe en gras est-il attribut du sujet ou COD ?',
      phrase: 'Mon père répare **la vieille voiture**.',
      choix: ['attribut du sujet', 'COD'], attendu: 'COD',
    },
    {
      id: 's23-r3', rappel: 'r1', type: 'qcm', palier: 3, piege: 'attribut-ou-cod', reserve: true,
      consigne: 'Le groupe en gras est-il attribut du sujet ou COD ?',
      phrase: 'Plus tard, je serai **vétérinaire**.',
      choix: ['attribut du sujet', 'COD'], attendu: 'attribut du sujet',
    },
    {
      id: 's23-r4', rappel: 'r2', type: 'completer', palier: 2, piege: 'accord-attribut', reserve: true,
      consigne: 'Accorde l\'adjectif avec le sujet.',
      avant: 'Les chaussures de Léo sont ', verbe: 'mouillé', apres: '.',
      attendu: 'mouillées',
    },
    {
      id: 's23-r5', rappel: 'r2', type: 'completer', palier: 2, piege: 'accord-attribut', reserve: true,
      consigne: 'Accorde l\'adjectif avec le sujet.',
      avant: 'Mes grands-mères semblent ', verbe: 'fatigué', apres: ' ce soir.',
      attendu: 'fatiguées',
    },
    {
      id: 's23-r6', rappel: 'r2', type: 'completer', palier: 3, piege: 'accord-attribut', reserve: true,
      consigne: 'Accorde l\'adjectif avec le sujet.',
      avant: 'La lumière du salon est restée ', verbe: 'allumé', apres: ' toute la soirée.',
      attendu: 'allumée',
    },
  ],
};
