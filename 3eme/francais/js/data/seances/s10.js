// Séance 10 — Narrateur et point de vue.
//
// La carte « Narrateur & point de vue ». Les passages sont courts et écrits
// pour l'appli : deux ou trois phrases suffisent à décider, et c'est ce que
// demande un contrôle.
//
// L'erreur visée : décider d'après un détail de surface — « il y a des
// pensées, donc omniscient », « il y a une description, donc externe » — au
// lieu de compter QUI pense dans le passage : plusieurs personnages, un seul,
// ou aucun.

export default {
  numero: 10,
  bloc: 2,
  titre: 'Narrateur et point de vue',
  sousTitre: 'Qui raconte, et par les yeux de qui ?',
  objectif: 'Dire si le narrateur est un personnage ou extérieur, et reconnaître le point de vue d\'un court passage.',

  rappels: [
    {
      id: 'r1',
      titre: 'Qui raconte ?',
      texte:
        'Le **narrateur** est celui qui raconte — à ne pas confondre avec l\'auteur.\n\n' +
        'S\'il est **extérieur** à l\'histoire, le récit est à la **3e personne** (*il, elle*).\n\n' +
        'S\'il est un **personnage** de l\'histoire, le récit est à la **1re personne** (*je*) : il ne raconte que ce qu\'il voit et ce qu\'il pense — c\'est forcément le point de vue **interne**.',
      exemples: [
        {
          phrase: '**Je** poussai la porte : la pièce était vide.',
          note: 'Le narrateur est un personnage : récit à la 1re personne, point de vue interne.',
        },
      ],
    },
    {
      id: 'r2',
      titre: 'Les trois points de vue',
      texte:
        '**Omniscient** : le narrateur sait tout — le passé, l\'avenir, les pensées de **plusieurs** personnages.\n\n' +
        '**Interne** : on découvre tout à travers les yeux et les pensées d\'**un seul** personnage.\n\n' +
        '**Externe** : le narrateur observe de l\'extérieur, comme une caméra : des gestes, des paroles, **aucune** pensée.\n\n' +
        'Attention : au cours d\'un même récit, le narrateur peut **changer** de point de vue.',
      exemples: [
        {
          phrase: 'Paul croyait sa sœur fâchée ; elle, au fond, riait de lui et préparait déjà sa revanche.',
          note: 'On connaît les pensées de Paul ET celles de sa sœur : point de vue omniscient.',
        },
      ],
    },
  ],

  exercices: [
    // ── Rappel 1 : qui raconte ? ─────────────────────────────────────────
    {
      id: 's10-e1', rappel: 'r1', type: 'qcm', palier: 1, piege: 'point-de-vue',
      consigne: 'Qui raconte ce passage ?',
      phrase: 'Je n\'avais jamais vu autant de neige. Mes bottes s\'enfonçaient à chaque pas.',
      choix: ['un narrateur personnage (1re personne)', 'un narrateur extérieur (3e personne)'], attendu: 'un narrateur personnage (1re personne)',
    },
    {
      id: 's10-e2', rappel: 'r1', type: 'qcm', palier: 1, piege: 'point-de-vue',
      consigne: 'Qui raconte ce passage ?',
      phrase: 'Elle n\'avait jamais vu autant de neige. Ses bottes s\'enfonçaient à chaque pas.',
      choix: ['un narrateur personnage (1re personne)', 'un narrateur extérieur (3e personne)'], attendu: 'un narrateur extérieur (3e personne)',
    },
    {
      id: 's10-e3', rappel: 'r1', type: 'qcm', palier: 2, piege: 'point-de-vue',
      consigne: 'Quel est le point de vue de ce passage ?',
      phrase: 'Je compris trop tard que la porte était fermée à clé.',
      choix: ['interne', 'externe', 'omniscient'], attendu: 'interne',
    },

    // ── Rappel 2 : les trois points de vue ───────────────────────────────
    {
      id: 's10-e4', rappel: 'r2', type: 'qcm', palier: 1, piege: 'point-de-vue',
      consigne: 'Quel est le point de vue de ce passage ?',
      phrase: 'L\'homme entra, posa son chapeau sur la table et s\'assit sans un mot. Il alluma une lampe.',
      choix: ['interne', 'externe', 'omniscient'], attendu: 'externe',
    },
    {
      id: 's10-e5', rappel: 'r2', type: 'qcm', palier: 1, piege: 'point-de-vue',
      consigne: 'Quel est le point de vue de ce passage ?',
      phrase: 'Marc regardait la mer. Il se demandait si son père reviendrait un jour ; cette attente lui serrait le cœur.',
      choix: ['interne', 'externe', 'omniscient'], attendu: 'interne',
    },
    {
      id: 's10-e6', rappel: 'r2', type: 'qcm', palier: 2, piege: 'point-de-vue',
      consigne: 'Quel est le point de vue de ce passage ?',
      phrase: 'Marc pensait que son père ne reviendrait pas. Au même moment, à des milliers de kilomètres, son père songeait à son fils et préparait son retour.',
      choix: ['interne', 'externe', 'omniscient'], attendu: 'omniscient',
    },
    {
      id: 's10-e7', rappel: 'r2', type: 'qcm', palier: 2, piege: 'point-de-vue',
      consigne: 'Quel est le point de vue de ce passage ?',
      phrase: 'Les deux voyageurs se saluèrent. L\'un sortit un journal ; l\'autre regarda par la fenêtre.',
      choix: ['interne', 'externe', 'omniscient'], attendu: 'externe',
    },
    {
      id: 's10-e8', rappel: 'r2', type: 'qcm', palier: 3, piege: 'point-de-vue',
      consigne: 'Quel est le point de vue de ce passage ?',
      phrase: 'Lucie avançait dans le couloir sombre. Elle crut entendre un pas derrière elle et sentit son cœur s\'emballer.',
      choix: ['interne', 'externe', 'omniscient'], attendu: 'interne',
    },
    {
      id: 's10-e9', rappel: 'r2', type: 'qcm', palier: 3, piege: 'point-de-vue',
      consigne: 'Quel est le point de vue de ce passage ?',
      phrase: 'Tout le village dormait. Le maire rêvait de sa réélection, la boulangère s\'inquiétait pour sa farine, et personne ne savait encore que la rivière allait déborder.',
      choix: ['interne', 'externe', 'omniscient'], attendu: 'omniscient',
    },

    // Réserve.
    {
      id: 's10-r1', rappel: 'r2', type: 'qcm', palier: 2, piege: 'point-de-vue', reserve: true,
      consigne: 'Quel est le point de vue de ce passage ?',
      phrase: 'Le facteur s\'arrêta devant la grille, sonna deux fois, puis repartit à vélo.',
      choix: ['interne', 'externe', 'omniscient'], attendu: 'externe',
    },
    {
      id: 's10-r2', rappel: 'r1', type: 'qcm', palier: 2, piege: 'point-de-vue', reserve: true,
      consigne: 'Quel est le point de vue de ce passage ?',
      phrase: 'Nous arrivâmes au sommet épuisés ; je n\'avais plus qu\'une envie : dormir.',
      choix: ['interne', 'externe', 'omniscient'], attendu: 'interne',
    },
    {
      id: 's10-r3', rappel: 'r2', type: 'qcm', palier: 3, piege: 'point-de-vue', reserve: true,
      consigne: 'Quel est le point de vue de ce passage ?',
      phrase: 'Le capitaine croyait son équipage fidèle. Il ignorait que trois marins préparaient une mutinerie, et que l\'un d\'eux hésitait encore.',
      choix: ['interne', 'externe', 'omniscient'], attendu: 'omniscient',
    },
  ],
};
