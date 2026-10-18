// Séance 13 — Opposer, amplifier, atténuer.
//
// D'après la fiche « Les figures de style » d'Evan : les figures d'opposition
// (antithèse, antiphrase, oxymore), puis d'amplification et d'atténuation
// (hyperbole, accumulation, gradation, euphémisme, litote). Phrases écrites
// pour l'appli.
//
// Sur sa feuille, un oxymore (deux contraires soudés dans le même groupe) a
// reçu « antithèse ». Le piège antithèse/oxymore se
// joue donc sur la PLACE des contraires, pas sur leur présence.

export default {
  numero: 13,
  bloc: 3,
  titre: 'Opposer, amplifier, atténuer',
  sousTitre: 'Antithèse, oxymore, hyperbole, gradation, litote…',
  objectif: 'Distinguer l\'antithèse de l\'oxymore, l\'accumulation de la gradation, et l\'euphémisme de la litote et de l\'antiphrase.',

  rappels: [
    {
      id: 'r1',
      titre: 'Les figures d\'opposition',
      texte:
        'L\'**antithèse** **oppose** deux éléments dans la phrase pour souligner un contraste.\n\n' +
        'L\'**oxymore** **unit** deux termes contraires **dans le même groupe de mots** : l\'alliance est inattendue.\n\n' +
        'L\'**antiphrase** dit **le contraire** de ce qu\'on veut exprimer ; elle est souvent ironique.',
      exemples: [
        { phrase: 'Le matin il était **riche**, le soir **ruiné**.', note: 'Deux contraires répartis dans la phrase : antithèse.' },
        { phrase: 'Un **silence assourdissant**.', note: 'Deux contraires soudés dans un même groupe : oxymore.' },
      ],
    },
    {
      id: 'r2',
      titre: 'Amplifier ou atténuer',
      texte:
        'Pour **amplifier** : l\'**hyperbole** **exagère** la réalité ; l\'**accumulation** **énumère** beaucoup d\'éléments ; la **gradation** les range **du plus faible au plus fort** (ou l\'inverse).\n\n' +
        'Pour **atténuer** : l\'**euphémisme** **adoucit** une réalité pénible ou choquante ; la **litote** **dit moins pour faire entendre plus**, souvent avec une négation.',
      exemples: [
        { phrase: 'Il **sourit**, **rit**, puis **éclata de rire**.', note: 'De plus en plus fort : gradation.' },
        { phrase: 'Notre voisin **est parti** cet hiver.', note: 'Pour « il est mort », en plus doux : euphémisme.' },
        { phrase: 'Ce film ? **Pas mal du tout.**', note: 'Pour « il est excellent » : litote.' },
      ],
    },
  ],

  exercices: [
    // ── Rappel 1 : opposer ───────────────────────────────────────────────
    {
      id: 's13-e1', rappel: 'r1', type: 'qcm', palier: 1, piege: 'antithese-ou-oxymore',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Je **pleure** quand tu **ris**.',
      choix: ['une antithèse', 'un oxymore'], attendu: 'une antithèse',
    },
    {
      id: 's13-e2', rappel: 'r1', type: 'qcm', palier: 1, piege: 'antithese-ou-oxymore',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Ce fut **un doux supplice**.',
      choix: ['une antithèse', 'un oxymore'], attendu: 'un oxymore',
    },
    {
      id: 's13-e3', rappel: 'r1', type: 'toucher', palier: 2, piege: 'antithese-ou-oxymore',
      consigne: 'Touche les deux mots qui s\'opposent.',
      mots: ['Son', 'visage', 'restait', 'calme,', 'mais', 'son', 'cœur', 'était', 'en', 'tempête.'], attendus: [3, 9],
    },
    {
      id: 's13-e4', rappel: 'r1', type: 'qcm', palier: 2, piege: 'antithese-ou-oxymore',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Dans la pièce régnait **une lumineuse obscurité**.',
      choix: ['une antithèse', 'un oxymore'], attendu: 'un oxymore',
    },
    {
      id: 's13-e5', rappel: 'r1', type: 'qcm', palier: 3, piege: 'antithese-ou-oxymore',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Le **jour**, il travaille ; la **nuit**, il rêve.',
      choix: ['une antithèse', 'un oxymore'], attendu: 'une antithèse',
    },
    {
      id: 's13-e6', rappel: 'r1', type: 'qcm', palier: 2, piege: 'attenuation-ou-ironie',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Tu as renversé tout le plateau ? **Bravo, quel talent !**',
      choix: ['une antiphrase', 'une litote', 'un euphémisme'], attendu: 'une antiphrase',
    },

    // ── Rappel 2 : amplifier ─────────────────────────────────────────────
    {
      id: 's13-e7', rappel: 'r2', type: 'qcm', palier: 1, piege: 'hyperbole-gradation-accumulation',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'J\'ai **un million de devoirs** pour demain.',
      choix: ['une hyperbole', 'une accumulation', 'une gradation'], attendu: 'une hyperbole',
    },
    {
      id: 's13-e8', rappel: 'r2', type: 'qcm', palier: 2, piege: 'hyperbole-gradation-accumulation',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Dans son sac traînaient **des cahiers, des stylos, des clés, des miettes, des tickets, des bonbons**.',
      choix: ['une hyperbole', 'une accumulation', 'une gradation'], attendu: 'une accumulation',
    },
    {
      id: 's13-e9', rappel: 'r2', type: 'qcm', palier: 2, piege: 'hyperbole-gradation-accumulation',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Il **marcha**, **courut**, puis **vola** vers elle.',
      choix: ['une hyperbole', 'une accumulation', 'une gradation'], attendu: 'une gradation',
    },

    // ── Rappel 2 : atténuer ──────────────────────────────────────────────
    {
      id: 's13-e10', rappel: 'r2', type: 'qcm', palier: 1, piege: 'attenuation-ou-ironie',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Notre grand-père **s\'est éteint** cette nuit.',
      choix: ['un euphémisme', 'une litote', 'une antiphrase'], attendu: 'un euphémisme',
    },
    {
      id: 's13-e11', rappel: 'r2', type: 'qcm', palier: 2, piege: 'attenuation-ou-ironie',
      consigne: 'Quelle est cette figure de style ?',
      phrase: '**Je ne suis pas mécontent** de mon 19 sur 20.',
      choix: ['un euphémisme', 'une litote', 'une antiphrase'], attendu: 'une litote',
    },
    {
      id: 's13-e12', rappel: 'r2', type: 'qcm', palier: 3, piege: 'attenuation-ou-ironie',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Il est **un peu fatigué**, dit l\'infirmière d\'un malade très gravement atteint.',
      choix: ['un euphémisme', 'une litote', 'une antiphrase'], attendu: 'un euphémisme',
    },

    // Réserve.
    {
      id: 's13-r1', rappel: 'r1', type: 'qcm', palier: 2, piege: 'antithese-ou-oxymore', reserve: true,
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'C\'était **une joie triste**.',
      choix: ['une antithèse', 'un oxymore'], attendu: 'un oxymore',
    },
    {
      id: 's13-r2', rappel: 'r1', type: 'qcm', palier: 2, piege: 'antithese-ou-oxymore', reserve: true,
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Hier **vainqueur**, aujourd\'hui **vaincu**.',
      choix: ['une antithèse', 'un oxymore'], attendu: 'une antithèse',
    },
    {
      id: 's13-r3', rappel: 'r1', type: 'qcm', palier: 3, piege: 'antithese-ou-oxymore', reserve: true,
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Elle avançait dans **une nuit éclatante**.',
      choix: ['une antithèse', 'un oxymore'], attendu: 'un oxymore',
    },
    {
      id: 's13-r4', rappel: 'r2', type: 'qcm', palier: 2, piege: 'hyperbole-gradation-accumulation', reserve: true,
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Ce sac pèse **une tonne** !',
      choix: ['une hyperbole', 'une accumulation', 'une gradation'], attendu: 'une hyperbole',
    },
    {
      id: 's13-r5', rappel: 'r2', type: 'qcm', palier: 2, piege: 'hyperbole-gradation-accumulation', reserve: true,
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'C\'était **un souffle**, **un murmure**, **un cri**.',
      choix: ['une hyperbole', 'une accumulation', 'une gradation'], attendu: 'une gradation',
    },
    {
      id: 's13-r6', rappel: 'r2', type: 'qcm', palier: 3, piege: 'hyperbole-gradation-accumulation', reserve: true,
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Au marché : **des pommes, des poireaux, des fromages, des fleurs, des poissons, des épices**.',
      choix: ['une hyperbole', 'une accumulation', 'une gradation'], attendu: 'une accumulation',
    },
    {
      id: 's13-r7', rappel: 'r2', type: 'qcm', palier: 2, piege: 'attenuation-ou-ironie', reserve: true,
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Ton gâteau ? **Ce n\'est pas mauvais du tout.**',
      choix: ['un euphémisme', 'une litote', 'une antiphrase'], attendu: 'une litote',
    },
    {
      id: 's13-r8', rappel: 'r2', type: 'qcm', palier: 2, piege: 'attenuation-ou-ironie', reserve: true,
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Il pleut à verse et tu as oublié ton parapluie : **quelle belle journée !**',
      choix: ['un euphémisme', 'une litote', 'une antiphrase'], attendu: 'une antiphrase',
    },
    {
      id: 's13-r9', rappel: 'r2', type: 'qcm', palier: 3, piege: 'attenuation-ou-ironie', reserve: true,
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Les **personnes non voyantes** ont accès au musée.',
      choix: ['un euphémisme', 'une litote', 'une antiphrase'], attendu: 'un euphémisme',
    },
  ],
};
