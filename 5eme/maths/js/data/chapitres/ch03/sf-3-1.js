// Chapitre 3, savoir-faire 1 — Les nombres relatifs : signe, opposé, distance à zéro.
//
// ── D'où vient ce savoir-faire ────────────────────────────────────────────
//
// Des trois premiers points de la liste de la professeure :
//
//   · définir les nombres relatifs ;
//   · positif, strictement positif, négatif, strictement négatif ;
//   · opposé et valeur absolue ;
//
// et du quatrième, « grandeurs (température, temps, altitude…) en
// problèmes » : les nombres négatifs ne sont pas une invention de
// mathématicien, ils disent « sous zéro », « avant J.-C. », « sous le niveau
// de la mer ». Les exercices de traduction viennent de là.
//
// ── La convention sur 0 ──────────────────────────────────────────────────
//
// En France, 0 est à la fois positif ET négatif ; « strictement » l'exclut.
// C'est la convention du collège, et c'est pourquoi aucun item ne demande le
// « signe » de 0 : la réponse « nul » contredirait le cours. Les questions
// sur 0 passent par des phrases à choisir.

export default {
  id: 'sf-3-1',
  titre: 'Reconnaître et écrire des nombres relatifs',
  attendus: [
    'Il utilise un nombre relatif pour dire une température, une altitude, une date, un étage.',
    'Il distingue positif, strictement positif, négatif et strictement négatif.',
    'Il donne l\'opposé et la distance à zéro d\'un nombre relatif.',
  ],

  decouvrir: {
    titre: 'Sous zéro',
    texte:
      'À la station de ski, le thermomètre indique 4 °C à midi. Pendant la nuit, '
      + 'la température baisse de 7 degrés.',
    lignes: [
      { calcul: 'De 4 °C jusqu\'à 0 °C', resultat: '4 degrés de baisse' },
      { calcul: 'Il reste à baisser', resultat: '3 degrés, sous zéro' },
    ],
    question: 'Quelle température fait-il la nuit ? Pour écrire un nombre négatif, utilise le bouton ±.',
    champs: [
      { id: 'a', etiquette: 'la nuit, en °C', attendu: -3 },
    ],
    conclusion:
      'Il fait **−3 °C**, qu\'on lit « moins trois degrés » : 3 degrés **sous** zéro.\n'
      + 'Les nombres **négatifs** servent à dire tout ce qui est « sous zéro » : une '
      + 'température, une altitude sous le niveau de la mer, un sous-sol, une dette…\n'
      + 'Avec les nombres positifs, ils forment les **nombres relatifs**.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Les nombres relatifs',
      texte:
        'Un **nombre relatif** s\'écrit avec un **signe** (+ ou −) et une **distance à zéro**.\n'
        + '**−3** se lit « moins trois » : son signe est −, sa distance à zéro est 3.\n'
        + '**+5** s\'écrit aussi **5** : le signe + peut être sous-entendu.\n'
        + 'Les nombres **positifs** s\'écrivent avec le signe +, les nombres **négatifs** avec le signe −.',
    },
    {
      type: 'definition',
      titre: 'Positif, négatif… et strictement',
      texte:
        'Un nombre **positif** est supérieur ou égal à 0. Un nombre **négatif** est inférieur ou égal à 0.\n'
        + '**0 est à la fois positif et négatif** — c\'est le seul.\n'
        + '**Strictement positif** : positif et différent de 0. **Strictement négatif** : négatif et différent de 0.\n'
        + 'Ainsi −2 est strictement négatif ; 0 est négatif, mais pas strictement.',
    },
    {
      type: 'definition',
      titre: 'Opposé et distance à zéro',
      texte:
        'Deux nombres sont **opposés** quand ils ont la même distance à zéro et des signes '
        + 'contraires : 4 et −4 sont opposés. L\'opposé de 0 est 0.\n'
        + 'La **distance à zéro** d\'un nombre — on dit aussi sa **valeur absolue** — est ce '
        + 'nombre sans son signe. C\'est toujours un nombre positif : la distance à zéro de '
        + '−4 est 4, celle de 4 aussi.',
    },
    {
      type: 'remarque',
      titre: 'Les relatifs dans la vie',
      texte:
        '**Température** : −5 °C, c\'est 5 degrés sous zéro.\n'
        + '**Altitude** : la mer Morte est à environ −430 m, sous le niveau de la mer.\n'
        + '**Date** : l\'an −52, c\'est 52 avant J.-C.\n'
        + '**Étage** : le niveau −2 est le deuxième sous-sol.\n'
        + '**Argent** : un solde de −30 €, c\'est une dette de 30 €.',
    },
    {
      type: 'exemple',
      texte:
        '−7 : négatif, opposé 7, distance à zéro 7   ·   2,5 : positif, opposé −2,5, '
        + 'distance à zéro 2,5   ·   0 : positif et négatif, opposé 0',
    },
  ],

  methode: {
    titre: 'Donner l\'opposé et la distance à zéro de −6,5',
    enonce: 'Quel est l\'opposé de −6,5 ? Quelle est sa distance à zéro ?',
    etapes: [
      {
        texte: 'Je sépare le signe et la distance à zéro : le signe est −, la distance à zéro est 6,5.',
        note: 'Tout nombre relatif se lit en deux morceaux.',
      },
      {
        texte: 'L\'opposé garde la distance à zéro et change le signe : l\'opposé de −6,5 est 6,5.',
        note: 'Changer le signe marche dans les deux sens : un négatif a un opposé positif.',
      },
      {
        texte: 'La distance à zéro, c\'est le nombre sans son signe : 6,5.',
        note: 'Une distance n\'est jamais négative.',
      },
    ],
    controle:
      'Le contrôle : un nombre et son opposé sont de part et d\'autre de zéro, à la '
      + 'même distance. Si tu trouves deux nombres de même signe, il y a une erreur '
      + '(sauf pour 0, qui est son propre opposé).',
  },

  entrainement: [
    // ── Palier 1 : le signe, l'opposé, la distance à zéro ──────────────────
    {
      // NEUTRE : un négatif bien visible, sans opposé ni zéro en jeu.
      id: 'e-3-1-1', type: 'signe', palier: 1, neutre: true,
      consigne: 'Ce nombre est-il positif ou négatif ?', enonce: '-12', attendu: 'négatif',
    },
    {
      id: 'e-3-1-2', type: 'calcul', palier: 1, piege: 'oppose-mal-compris',
      consigne: 'Donne l\'opposé de ce nombre.', enonce: '9', attendu: -9,
      // 9 : le signe n'a pas changé — l'opposé confondu avec la distance à zéro.
      fausses: [{ valeur: 9, piege: 'oppose-mal-compris' }],
    },
    {
      id: 'e-3-1-3', type: 'calcul', palier: 1, piege: 'oppose-mal-compris',
      consigne: 'Donne l\'opposé de ce nombre.', enonce: '-4', attendu: 4,
      // −4 : « l'opposé, c'est le négatif ».
      fausses: [{ valeur: -4, piege: 'oppose-mal-compris' }],
    },
    {
      id: 'e-3-1-4', type: 'calcul', palier: 1, piege: 'oppose-mal-compris',
      consigne: 'Donne la distance à zéro de ce nombre.', enonce: '-15', attendu: 15,
      fausses: [{ valeur: -15, piege: 'oppose-mal-compris' }],
    },
    // ── Palier 2 : traduire une grandeur, et le cas de 0 ───────────────────
    {
      id: 'e-3-1-5', type: 'calcul', palier: 2, piege: 'signe-oublie',
      consigne: 'Écris ce niveau avec un nombre relatif. Le rez-de-chaussée est le niveau 0.',
      enonce: 'La voiture est garée au troisième sous-sol.', attendu: -3,
      fausses: [{ valeur: 3, piege: 'signe-oublie' }],
    },
    {
      id: 'e-3-1-6', type: 'calcul', palier: 2, piege: 'signe-oublie',
      consigne: 'Écris cette altitude avec un nombre relatif, en mètres.',
      enonce: 'Un sous-marin navigue à 250 m sous la surface de la mer.', attendu: -250,
      fausses: [{ valeur: 250, piege: 'signe-oublie' }],
    },
    {
      id: 'e-3-1-7', type: 'calcul', palier: 2, piege: 'signe-oublie',
      consigne: 'Écris cette date avec un nombre relatif.',
      enonce: 'Selon la légende, Rome est fondée en 753 avant J.-C.', attendu: -753,
      fausses: [{ valeur: 753, piege: 'signe-oublie' }],
    },
    {
      id: 'e-3-1-8', type: 'choix', palier: 2, piege: 'zero-et-strictement',
      consigne: 'Quelle phrase est juste ?', enonce: 'À propos du nombre 0.',
      choix: ['0 n\'est ni positif ni négatif', '0 est à la fois positif et négatif', '0 est strictement positif'],
      attendu: '0 est à la fois positif et négatif',
      fausses: [
        { valeur: '0 n\'est ni positif ni négatif', piege: 'zero-et-strictement' },
        { valeur: '0 est strictement positif', piege: 'zero-et-strictement' },
      ],
    },
    {
      // NEUTRE : « strictement » sur un nombre différent de 0 — le mot ne
      // change rien, et il faut le voir aussi.
      id: 'e-3-1-9', type: 'choix', palier: 2, neutre: true,
      consigne: 'Ce nombre est-il strictement négatif ?', enonce: '-0{,}5',
      choix: ['oui', 'non, il est positif', 'non, il est nul'], attendu: 'oui',
    },
    // ── Palier 3 : les idées fausses, à réfuter ────────────────────────────
    {
      id: 'e-3-1-10', type: 'vraifaux', palier: 3, piege: 'oppose-mal-compris',
      consigne: 'Vrai ou faux ?',
      affirmation: 'L\'opposé d\'un nombre est toujours un nombre négatif.',
      attendu: false,
      contreExemple: {
        invite: 'Trouve un nombre dont l\'opposé est strictement positif.',
        champs: [{ id: 'a', etiquette: 'le nombre' }],
        valide: (a) => -a > 0,
        exemple: 'L\'opposé de −6 est 6, un nombre positif.',
      },
    },
    {
      id: 'e-3-1-11', type: 'vraifaux', palier: 3, piege: 'oppose-mal-compris',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Un nombre et son opposé sont toujours différents.',
      attendu: false,
      contreExemple: {
        invite: 'Trouve un nombre égal à son opposé.',
        champs: [{ id: 'a', etiquette: 'le nombre' }],
        valide: (a) => a === -a,
        exemple: '0 : son opposé est 0.',
      },
    },
    {
      id: 'e-3-1-12', type: 'choix', palier: 3, piege: 'zero-et-strictement',
      consigne: 'Lesquels de ces nombres sont strictement positifs ?',
      enonce: 'Les nombres −3 ; 0 ; 2,5 et 7.',
      choix: ['0 ; 2,5 et 7', '−3 ; 2,5 et 7', '2,5 et 7'],
      attendu: '2,5 et 7',
      fausses: [
        { valeur: '0 ; 2,5 et 7', piege: 'zero-et-strictement' },
        // −3 compté comme 3 : le signe lu, puis oublié.
        { valeur: '−3 ; 2,5 et 7', piege: 'signe-oublie' },
      ],
    },
  ],

  problemes: [
    {
      id: 'p-3-1-1',
      enonce:
        'Un matin d\'hiver, le thermomètre indique 8 degrés sous zéro. L\'après-midi, '
        + 'il fait 3 degrés de plus que le matin.',
      questions: [
        { texte: 'Écris la température du matin avec un nombre relatif.', attendu: -8, unite: '°C' },
        { texte: 'Quelle température fait-il l\'après-midi ?', attendu: -5, unite: '°C' },
      ],
    },
    {
      id: 'p-3-1-2',
      enonce:
        'Dans un immeuble, le rez-de-chaussée est le niveau 0 et le parking occupe les '
        + 'niveaux −1, −2 et −3. Un ascenseur part du niveau 4 et descend jusqu\'au '
        + 'dernier niveau du parking.',
      questions: [
        { texte: 'À quel niveau l\'ascenseur s\'arrête-t-il ?', attendu: -3 },
        { texte: 'De combien d\'étages est-il descendu ?', attendu: 7 },
      ],
    },
    {
      id: 'p-3-1-3',
      enonce:
        'Un sommet de montagne est à 2 350 m d\'altitude. Le fond d\'un lac souterrain, '
        + 'tout près, est à 120 m sous le niveau de la mer.',
      questions: [
        { texte: 'Écris l\'altitude du fond du lac avec un nombre relatif.', attendu: -120, unite: 'm' },
        { texte: 'Quelle différence d\'altitude y a-t-il entre le sommet et le fond du lac ?', attendu: 2470, unite: 'm' },
      ],
    },
    {
      id: 'p-3-1-4',
      enonce:
        'Sur une frise chronologique, les dates avant J.-C. s\'écrivent avec des nombres '
        + 'négatifs. Toutankhamon règne vers 1330 avant J.-C. ; Jules César meurt en '
        + '44 avant J.-C.',
      questions: [
        { texte: 'Écris la date du règne de Toutankhamon avec un nombre relatif.', attendu: -1330 },
        { texte: 'Combien d\'années séparent ces deux dates ?', attendu: 1286, unite: 'ans' },
      ],
    },
    {
      id: 'p-3-1-5',
      enonce: 'Le solde d\'un compte bancaire est de 35 €. On paie un achat de 50 € avec ce compte.',
      questions: [
        { texte: 'Quel est le nouveau solde, écrit avec un nombre relatif ?', attendu: -15, unite: '€' },
        { texte: 'Combien faut-il déposer pour que le solde revienne à 0 € ?', attendu: 15, unite: '€' },
      ],
    },
  ],

  test: [
    {
      id: 't-3-1-1', type: 'signe', consigne: 'Ce nombre est-il positif ou négatif ?',
      enonce: '-7', attendu: 'négatif', revoir: 'definition',
    },
    { id: 't-3-1-2', type: 'calcul', consigne: 'Donne l\'opposé de ce nombre.', enonce: '-11', attendu: 11, revoir: 'definition' },
    { id: 't-3-1-3', type: 'calcul', consigne: 'Donne l\'opposé de ce nombre.', enonce: '3{,}5', attendu: -3.5, revoir: 'definition' },
    { id: 't-3-1-4', type: 'calcul', consigne: 'Donne la distance à zéro de ce nombre.', enonce: '-8', attendu: 8, revoir: 'definition' },
    {
      id: 't-3-1-5', type: 'choix', consigne: 'Complète la phrase.', enonce: 'Le nombre 0 est…',
      choix: ['ni positif ni négatif', 'strictement positif', 'à la fois positif et négatif'],
      attendu: 'à la fois positif et négatif', revoir: 'definition',
    },
    {
      id: 't-3-1-6', type: 'choix', consigne: 'Lesquels de ces nombres sont strictement négatifs ?',
      enonce: 'Les nombres −4 ; 0 ; 1 et −0,5.',
      choix: ['−4 ; 0 et −0,5', '−4 et −0,5', '−4 seulement'],
      attendu: '−4 et −0,5', revoir: 'definition',
    },
    {
      id: 't-3-1-7', type: 'calcul', consigne: 'Écris cette température avec un nombre relatif, en °C.',
      enonce: 'Il fait 12 degrés sous zéro.', attendu: -12, revoir: 'remarque',
    },
    {
      id: 't-3-1-8', type: 'calcul', consigne: 'Écris cette altitude avec un nombre relatif, en mètres.',
      enonce: 'Un plongeur est à 18 m sous la surface de la mer.', attendu: -18, revoir: 'remarque',
    },
    {
      id: 't-3-1-9', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'La distance à zéro d\'un nombre est toujours positive.', attendu: true, revoir: 'definition',
    },
    {
      id: 't-3-1-10', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'La distance à zéro de −9 est −9.', attendu: false, revoir: 'definition',
    },
  ],
};
