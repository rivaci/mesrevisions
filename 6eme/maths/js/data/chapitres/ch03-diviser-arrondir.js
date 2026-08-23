// Chapitre 3 — Diviser, arrondir, estimer.
//
// ── Pourquoi ce découpage, et pas « les quatre opérations » ───────────────
//
// Le plan annonçait « les quatre opérations et les priorités ». En relisant le
// programme 2025, les priorités opératoires n'y sont PAS : les parenthèses sont
// un objectif du cours moyen (« savoir réaliser un calcul contenant une ou deux
// paires de parenthèses »), consolidé ensuite. Les inventer en 6e aurait fait
// réviser à côté.
//
// Ce chapitre reprend donc les objectifs que la fiche officielle nomme
// vraiment, et que les chapitres 1 et 2 n'ont pas couverts :
//
//   · effectuer la division euclidienne d'un entier par un entier < 100
//   · diviser un nombre décimal par un entier non nul < 10
//   · multiplier par 0,1 ; 0,01 ; 0,001, et connaître le lien avec ÷ 10, ÷ 100, ÷ 1000
//   · donner la valeur arrondie à l'unité, au dixième ou au centième
//   · encadrer un nombre décimal
//   · contrôler les résultats à l'aide d'ordres de grandeur
//   · résoudre des problèmes mettant en jeu ces divisions
//
// ── Les deux sens de la division ──────────────────────────────────────────
//
// Le programme les distingue explicitement, et c'est la clé des problèmes :
// la division PARTITION cherche la valeur d'une part (« combien chacun
// reçoit-il ? »), la division QUOTITION cherche le nombre de parts (« combien
// de paquets peut-on faire ? »). Le calcul est le même, la question ne l'est
// pas — et c'est là que l'élève se trompe d'opération.
//
// ── L'ordre de grandeur, geste de contrôle du chapitre ────────────────────
//
// Le programme le demande deux fois : « le recours systématique à un ordre de
// grandeur lui permet de contrôler le résultat » et « contrôler les résultats à
// l'aide d'ordres de grandeur ». C'est le geste qui rattrape presque toutes les
// erreurs de virgule des chapitres précédents ; il a donc son savoir-faire.

export default {
  numero: 3,
  titre: 'Diviser, arrondir, estimer',
  theme: 'Nombres, calcul et résolution de problèmes',
  trimestre: 2,
  programme: '2025',
  prerequis: [
    'Les rangs et la comparaison des décimaux (chapitre 1)',
    'La fraction comme quotient (chapitre 2)',
    'Les tables de multiplication (CM)',
  ],

  savoirFaire: [
    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-3-1',
      titre: 'La division euclidienne',
      attendus: [
        'Il effectue la division euclidienne d\'un entier par un entier inférieur à 100.',
        'Il vérifie que le reste est plus petit que le diviseur.',
      ],

      decouvrir: {
        titre: 'Quarante-sept bonbons, cinq enfants',
        texte:
          '47 bonbons doivent être partagés équitablement entre 5 enfants. On donne '
          + 'les bonbons un par un, en faisant le tour.',
        lignes: [
          { calcul: 'Après 5 bonbons donnés', resultat: 'chacun en a 1, il en reste 42' },
          { calcul: 'Après 45 bonbons donnés', resultat: 'chacun en a 9, il en reste 2' },
        ],
        question: 'Peut-on encore faire un tour complet avec les 2 bonbons restants ? Réponds 1 pour oui, 0 pour non. Puis donne le nombre de bonbons par enfant.',
        champs: [
          { id: 'a', etiquette: 'Encore un tour ? (1 ou 0)', attendu: 0 },
          { id: 'b', etiquette: 'Bonbons par enfant', attendu: 9 },
        ],
        conclusion:
          'On s\'arrête quand il **reste moins que le nombre d\'enfants**. On écrit '
          + '**47 = 9 × 5 + 2** : 9 est le quotient, 2 est le reste. Et le reste est '
          + 'forcément plus petit que 5 — sinon on pourrait continuer.',
      },

      cours: [
        {
          type: 'definition',
          titre: 'Quotient et reste',
          texte:
            'Diviser un entier a par un entier b non nul, c\'est trouver deux nombres '
            + 'entiers q et r tels que **a = b × q + r**, avec **r plus petit que b**.\n'
            + 'q est le **quotient**, r est le **reste**.',
        },
        {
          type: 'propriete',
          titre: 'Le reste est toujours plus petit que le diviseur',
          texte:
            'Si le reste est égal ou supérieur au diviseur, la division n\'est pas '
            + 'finie : on peut encore faire une part. C\'est le premier contrôle à faire.',
        },
        {
          type: 'remarque',
          titre: 'La vérification qui ne trompe pas',
          texte:
            'Multiplie le quotient par le diviseur, ajoute le reste : tu dois '
            + 'retomber exactement sur le nombre de départ. 9 × 5 + 2 = 47.',
        },
        { type: 'exemple', texte: '47 = 9 × 5 + 2   ·   100 = 14 × 7 + 2   ·   36 = 4 × 9 + 0' },
      ],

      methode: {
        titre: 'Diviser 100 par 7',
        enonce: 'Effectuer la division euclidienne de 100 par 7.',
        etapes: [
          { texte: 'Je cherche combien de fois 7 tient dans 100.', note: '7 × 10 = 70, 7 × 14 = 98, 7 × 15 = 105 — trop.' },
          { texte: 'Le quotient est donc 14.', note: '' },
          { texte: 'Le reste : 100 − 98 = 2.', note: '' },
          { texte: 'Je vérifie : 2 est bien plus petit que 7, et 14 × 7 + 2 = 100.', note: '' },
        ],
        controle:
          'Le contrôle : le reste doit être plus petit que le diviseur, ET '
          + 'quotient × diviseur + reste doit redonner le nombre de départ. Les deux, '
          + 'pas seulement l\'un.',
      },

      entrainement: [
        {
          id: 'e-3-1-1', type: 'calcul', palier: 1,
          consigne: 'Quel est le quotient de cette division euclidienne ?',
          enonce: '47 \\div 5', attendu: 9,
          fausses: [{ valeur: 2, piege: 'reste-mal-compris' }],
        },
        {
          id: 'e-3-1-2', type: 'calcul', palier: 1,
          consigne: 'Quel est le reste de cette division euclidienne ?',
          enonce: '47 \\div 5', attendu: 2,
          fausses: [{ valeur: 9, piege: 'reste-mal-compris' }],
        },
        {
          // Neutre : division exacte, le reste vaut 0. Sans cet item, l'élève
          // croirait qu'il y a toujours un reste.
          id: 'e-3-1-3', type: 'calcul', palier: 1, neutre: true,
          consigne: 'Quel est le reste de cette division euclidienne ?',
          enonce: '36 \\div 9', attendu: 0,
        },
        {
          id: 'e-3-1-4', type: 'calcul', palier: 2,
          consigne: 'Quel est le quotient de cette division euclidienne ?',
          enonce: '100 \\div 7', attendu: 14,
          fausses: [{ valeur: 15, piege: 'reste-mal-compris' }],
        },
        {
          id: 'e-3-1-5', type: 'calcul', palier: 2,
          consigne: 'Quel est le reste de cette division euclidienne ?',
          enonce: '100 \\div 7', attendu: 2,
        },
        {
          id: 'e-3-1-6', type: 'trous', palier: 3,
          consigne: 'Complète l\'égalité de la division euclidienne de 83 par 6.',
          enonce: '83 = 6 \\times \\square + \\square',
          champs: [{ id: 'a', attendu: 13 }, { id: 'b', attendu: 5 }],
        },
        {
          id: 'e-3-1-7', type: 'vraifaux', palier: 3,
          affirmation: 'Dans une division euclidienne, le reste peut être égal au diviseur.',
          attendu: false,
          contreExemple: {
            invite: 'Montre que c\'est impossible : donne un nombre à diviser, puis un diviseur, tels que le reste soit STRICTEMENT plus petit que le diviseur.',
            champs: [{ id: 'a', etiquette: 'nombre à diviser' }, { id: 'b', etiquette: 'diviseur' }],
            valide: (a, b) => b > 0 && a % b < b,
            exemple: '47 et 5 : le reste vaut 2, et 2 est plus petit que 5. C\'est toujours le cas.',
          },
        },
      ],

      problemes: [
        {
          id: 'p-3-1-1',
          enonce:
            'Un professeur range 94 cahiers dans des cartons contenant chacun '
            + '12 cahiers.',
          questions: [
            { texte: 'Combien de cartons peut-il remplir complètement ?', attendu: 7, unite: 'cartons' },
            { texte: 'Combien de cahiers restent en dehors ?', attendu: 10, unite: 'cahiers' },
          ],
        },
        {
          id: 'p-3-1-2',
          enonce:
            'Une classe de 29 élèves part en sortie. Chaque voiture peut emmener '
            + '4 élèves.',
          questions: [
            { texte: 'Combien de voitures sont pleines ?', attendu: 7, unite: 'voitures' },
            { texte: 'Combien de voitures faut-il en tout pour emmener tout le monde ?', attendu: 8, unite: 'voitures' },
          ],
        },
        {
          id: 'p-3-1-3',
          enonce:
            'Anto a 75 billes. Il veut faire des sachets de 8 billes.',
          questions: [
            { texte: 'Combien de sachets complets peut-il faire ?', attendu: 9, unite: 'sachets' },
            { texte: 'Combien de billes lui reste-t-il ?', attendu: 3, unite: 'billes' },
          ],
        },
      ],

      test: [
        { id: 't-3-1-1', type: 'calcul', consigne: 'Quotient ?', enonce: '38 \\div 5', attendu: 7, revoir: 'definition' },
        { id: 't-3-1-2', type: 'calcul', consigne: 'Reste ?', enonce: '38 \\div 5', attendu: 3, revoir: 'definition' },
        { id: 't-3-1-3', type: 'calcul', consigne: 'Quotient ?', enonce: '90 \\div 12', attendu: 7, revoir: 'exemple' },
        { id: 't-3-1-4', type: 'calcul', consigne: 'Reste ?', enonce: '90 \\div 12', attendu: 6, revoir: 'propriete' },
        { id: 't-3-1-5', type: 'calcul', consigne: 'Reste ?', enonce: '56 \\div 8', attendu: 0, revoir: 'definition' },
        { id: 't-3-1-6', type: 'calcul', consigne: 'Quotient ?', enonce: '61 \\div 9', attendu: 6, revoir: 'definition' },
        { id: 't-3-1-7', type: 'calcul', consigne: 'Reste ?', enonce: '61 \\div 9', attendu: 7, revoir: 'propriete' },
        { id: 't-3-1-8', type: 'trous', enonce: '50 = 7 \\times \\square + \\square', champs: [{ id: 'a', attendu: 7 }, { id: 'b', attendu: 1 }], revoir: 'remarque' },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-3-2',
      titre: 'Diviser un décimal par un entier',
      attendus: [
        'Il divise un nombre décimal par un entier non nul inférieur à 10.',
        'Il place correctement la virgule au quotient.',
      ],

      decouvrir: {
        titre: 'Le reste qu\'on continue à partager',
        texte:
          'On partage 7 litres de jus entre 4 personnes. En division euclidienne, '
          + 'chacun aurait 1 litre et il resterait 3 litres.',
        lignes: [
          { calcul: 'Division euclidienne', resultat: '7 = 1 × 4 + 3' },
          { calcul: 'Mais le jus se partage', resultat: 'les 3 litres aussi !' },
        ],
        question: 'Les 3 litres restants, partagés en 4, donnent combien de litres chacun ? Et au total, combien chacun reçoit-il ?',
        champs: [
          { id: 'a', etiquette: 'Part des 3 litres restants', attendu: 0.75 },
          { id: 'b', etiquette: 'Total par personne', attendu: 1.75 },
        ],
        conclusion:
          'Quand ce qu\'on partage se coupe en morceaux — des litres, des mètres, des '
          + 'euros — on ne s\'arrête pas au reste : on continue après la virgule. '
          + '**7 ÷ 4 = 1,75**.',
      },

      cours: [
        {
          type: 'propriete',
          titre: 'Continuer après la virgule',
          texte:
            'Quand le reste n\'est pas nul, on **abaisse un zéro** et on continue la '
            + 'division. Au moment où l\'on descend le premier zéro, on place la '
            + 'virgule au quotient.',
        },
        {
          type: 'remarque',
          titre: 'Euclidienne ou décimale ?',
          texte:
            'Tout dépend de ce qu\'on partage. Des **bonbons** ne se coupent pas : '
            + 'division euclidienne, avec un reste. Des **litres** se coupent : '
            + 'division décimale, on continue.',
        },
        {
          type: 'propriete',
          titre: 'Le contrôle par la multiplication',
          texte:
            'Multiplie ton quotient par le diviseur : tu dois retomber sur le nombre '
            + 'de départ. 1,75 × 4 = 7.',
        },
        { type: 'exemple', texte: '7 ÷ 4 = 1,75   ·   9 ÷ 2 = 4,5   ·   4,8 ÷ 3 = 1,6' },
      ],

      methode: {
        titre: 'Calculer 9 ÷ 4',
        enonce: 'Calculer 9 ÷ 4.',
        etapes: [
          { texte: '4 tient 2 fois dans 9, il reste 1.', note: 'Quotient entier : 2.' },
          { texte: 'Je place la virgule au quotient et j\'abaisse un zéro : il reste 10.', note: 'On écrit 2,' },
          { texte: '4 tient 2 fois dans 10, il reste 2. J\'abaisse encore un zéro : 20.', note: 'On écrit 2,2' },
          { texte: '4 tient 5 fois dans 20, il reste 0. Donc 9 ÷ 4 = 2,25.', note: '' },
        ],
        controle:
          'Le contrôle : 2,25 × 4 = 9. Et l\'ordre de grandeur : 9 ÷ 4, c\'est un peu '
          + 'plus que 2. Un résultat de 22,5 ou de 0,225 serait absurde.',
      },

      entrainement: [
        {
          id: 'e-3-2-1', type: 'calcul', palier: 1,
          consigne: 'Calcule.', enonce: '9 \\div 2', attendu: 4.5,
        },
        {
          id: 'e-3-2-2', type: 'calcul', palier: 1,
          consigne: 'Calcule.', enonce: '7 \\div 4', attendu: 1.75,
          fausses: [{ valeur: 1.3, piege: 'reste-mal-compris' }],
        },
        {
          // Neutre : division exacte, pas de virgule à placer.
          id: 'e-3-2-3', type: 'calcul', palier: 1, neutre: true,
          consigne: 'Calcule.', enonce: '48 \\div 6', attendu: 8,
        },
        {
          id: 'e-3-2-4', type: 'calcul', palier: 2,
          consigne: 'Calcule.', enonce: '4{,}8 \\div 3', attendu: 1.6,
          fausses: [{ valeur: 16, piege: 'virgule-decalee' }],
        },
        {
          id: 'e-3-2-5', type: 'calcul', palier: 2,
          consigne: 'Calcule.', enonce: '5{,}4 \\div 4', attendu: 1.35,
        },
        {
          id: 'e-3-2-6', type: 'calcul', palier: 3,
          consigne: 'Calcule.', enonce: '2{,}1 \\div 6', attendu: 0.35,
          fausses: [{ valeur: 3.5, piege: 'virgule-decalee' }],
        },
        {
          id: 'e-3-2-7', type: 'plausible', palier: 3,
          consigne: 'Sans poser le calcul, ce résultat est-il plausible ?',
          enonce: '9{,}6 \\div 4 = 24', attendu: false,
          explication: '9,6 partagé en 4 doit donner environ 2,5. Un résultat de 24 est dix fois trop grand : la vraie réponse est 2,4.',
        },
      ],

      problemes: [
        {
          id: 'p-3-2-1',
          enonce:
            'Quatre amis se partagent équitablement une facture de 74 € au restaurant.',
          questions: [
            { texte: 'Combien paie chacun, en euros ?', attendu: 18.5, unite: '€' },
            { texte: 'Et s\'ils avaient été 5 ?', attendu: 14.8, unite: '€' },
          ],
        },
        {
          id: 'p-3-2-2',
          enonce:
            'Un ruban de 5,4 mètres est coupé en 4 morceaux de même longueur.',
          questions: [
            { texte: 'Quelle est la longueur d\'un morceau, en mètres ?', attendu: 1.35, unite: 'm' },
            { texte: 'Et si on le coupait en 6 morceaux égaux ?', attendu: 0.9, unite: 'm' },
          ],
        },
        {
          id: 'p-3-2-3',
          enonce:
            'Une voiture parcourt 273 km avec 21 litres d\'essence.',
          questions: [
            { texte: 'Combien de kilomètres parcourt-elle avec 1 litre ?', attendu: 13, unite: 'km' },
            { texte: 'Combien de litres faut-il pour 39 km ?', attendu: 3, unite: 'L' },
          ],
        },
      ],

      test: [
        { id: 't-3-2-1', type: 'calcul', enonce: '7 \\div 2', attendu: 3.5, revoir: 'propriete' },
        { id: 't-3-2-2', type: 'calcul', enonce: '9 \\div 4', attendu: 2.25, revoir: 'exemple' },
        { id: 't-3-2-3', type: 'calcul', enonce: '6{,}4 \\div 4', attendu: 1.6, revoir: 'propriete' },
        { id: 't-3-2-4', type: 'calcul', enonce: '54 \\div 6', attendu: 9, revoir: 'propriete' },
        { id: 't-3-2-5', type: 'calcul', enonce: '3{,}5 \\div 5', attendu: 0.7, revoir: 'propriete' },
        { id: 't-3-2-6', type: 'calcul', enonce: '12{,}6 \\div 3', attendu: 4.2, revoir: 'exemple' },
        { id: 't-3-2-7', type: 'calcul', enonce: '1 \\div 8', attendu: 0.125, revoir: 'propriete' },
        { id: 't-3-2-8', type: 'calcul', enonce: '4{,}5 \\div 9', attendu: 0.5, revoir: 'propriete' },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-3-3',
      titre: 'Multiplier par 0,1 ; 0,01 ; 0,001',
      attendus: [
        'Il multiplie un nombre par 0,1 ; 0,01 ou 0,001.',
        'Il fait le lien avec la division par 10, 100 ou 1000.',
      ],

      decouvrir: {
        titre: 'Une multiplication qui divise',
        texte:
          'On a vu au chapitre 1 que multiplier par un nombre plus petit que 1 '
          + 'rapetisse le résultat. Regarde de combien.',
        lignes: [
          { calcul: '50 × 0,1', resultat: '5' },
          { calcul: '50 ÷ 10', resultat: '5' },
        ],
        question: 'Ces deux calculs donnent le même résultat. Calcule maintenant 50 × 0,01, puis 50 ÷ 100.',
        champs: [
          { id: 'a', etiquette: '50 × 0,01 =', attendu: 0.5 },
          { id: 'b', etiquette: '50 ÷ 100 =', attendu: 0.5 },
        ],
        conclusion:
          'Multiplier par **0,1**, c\'est diviser par **10**. Multiplier par **0,01**, '
          + 'c\'est diviser par **100**. Ce sont deux façons de dire la même chose — '
          + 'et 0,1, c\'est justement un dixième.',
      },

      cours: [
        {
          type: 'propriete',
          titre: 'Le lien avec la division',
          texte:
            'Multiplier par **0,1** revient à **diviser par 10**.\n'
            + 'Multiplier par **0,01** revient à **diviser par 100**.\n'
            + 'Multiplier par **0,001** revient à **diviser par 1000**.',
        },
        {
          type: 'remarque',
          titre: 'Pourquoi ça marche',
          texte:
            '0,1 est un dixième, 0,01 un centième, 0,001 un millième. Prendre le '
            + 'dixième d\'un nombre, c\'est bien le diviser par 10.',
        },
        {
          type: 'propriete',
          titre: 'Le sens du déplacement',
          texte:
            'La virgule se déplace vers la **gauche** : d\'un rang pour 0,1, de deux '
            + 'pour 0,01, de trois pour 0,001. Le résultat est plus **petit**.',
        },
        { type: 'exemple', texte: '50 × 0,1 = 5   ·   3,2 × 0,01 = 0,032   ·   7 × 0,001 = 0,007' },
      ],

      methode: {
        titre: 'Calculer 42 × 0,01',
        enonce: 'Calculer 42 × 0,01.',
        etapes: [
          { texte: '0,01 est plus petit que 1 : le résultat sera plus petit que 42.', note: 'Le contrôle, avant le calcul.' },
          { texte: 'Multiplier par 0,01, c\'est diviser par 100.', note: '' },
          { texte: 'La virgule recule de deux rangs : 42 → 0,42.', note: '' },
          { texte: 'Donc 42 × 0,01 = 0,42.', note: '' },
        ],
        controle:
          'Le contrôle : 0,42 est bien plus petit que 42. Si tu avais trouvé 4200, '
          + 'c\'est que tu as confondu 0,01 avec 100.',
      },

      entrainement: [
        {
          id: 'e-3-3-1', type: 'calcul', palier: 1,
          consigne: 'Calcule.', enonce: '50 \\times 0{,}1', attendu: 5,
          fausses: [{ valeur: 500, piege: 'multiplier-rend-plus-grand' }],
        },
        {
          id: 'e-3-3-2', type: 'calcul', palier: 1,
          consigne: 'Calcule.', enonce: '42 \\times 0{,}01', attendu: 0.42,
          fausses: [{ valeur: 4200, piege: 'multiplier-rend-plus-grand' }, { valeur: 4.2, piege: 'virgule-decalee' }],
        },
        {
          // Neutre : ici on multiplie par 10, le résultat grandit bien. Sans cet
          // item, « multiplier rapetisse toujours » deviendrait la règle apprise.
          id: 'e-3-3-3', type: 'calcul', palier: 1, neutre: true,
          consigne: 'Calcule.', enonce: '50 \\times 10', attendu: 500,
        },
        {
          id: 'e-3-3-4', type: 'calcul', palier: 2,
          consigne: 'Calcule.', enonce: '3{,}2 \\times 0{,}01', attendu: 0.032,
          fausses: [{ valeur: 0.32, piege: 'virgule-decalee' }],
        },
        {
          id: 'e-3-3-5', type: 'calcul', palier: 2,
          consigne: 'Calcule.', enonce: '7 \\times 0{,}001', attendu: 0.007,
          fausses: [{ valeur: 0.07, piege: 'virgule-decalee' }],
        },
        {
          id: 'e-3-3-6', type: 'vraifaux', palier: 3,
          affirmation: 'Multiplier 80 par 0,1 donne le même résultat que diviser 80 par 10.', attendu: true,
        },
        {
          id: 'e-3-3-7', type: 'trous', palier: 3,
          consigne: 'Complète.', enonce: '600 \\times \\square = 6',
          champs: [{ id: 'a', attendu: 0.01 }],
        },
      ],

      problemes: [
        {
          id: 'p-3-3-1',
          enonce:
            'Un article coûte 250 €. Le vendeur applique une réduction de 0,1 fois '
            + 'le prix, c\'est-à-dire un dixième.',
          questions: [
            { texte: 'Quel est le montant de la réduction, en euros ?', attendu: 25, unite: '€' },
            { texte: 'Quel est le prix payé ?', attendu: 225, unite: '€' },
          ],
        },
        {
          id: 'p-3-3-2',
          enonce:
            'Une pièce mesure 3 centimètres. On veut sa mesure en mètres, sachant '
            + 'que 1 cm = 0,01 m.',
          questions: [
            { texte: 'Combien cela fait-il de mètres ?', attendu: 0.03, unite: 'm' },
            { texte: 'Et 45 centimètres ?', attendu: 0.45, unite: 'm' },
          ],
        },
        {
          id: 'p-3-3-3',
          enonce:
            'Un sachet pèse 8 grammes. On rappelle que 1 g = 0,001 kg.',
          questions: [
            { texte: 'Combien pèse un sachet, en kilogrammes ?', attendu: 0.008, unite: 'kg' },
            { texte: 'Combien pèsent 250 sachets, en kilogrammes ?', attendu: 2, unite: 'kg' },
          ],
        },
      ],

      test: [
        { id: 't-3-3-1', type: 'calcul', enonce: '70 \\times 0{,}1', attendu: 7, revoir: 'propriete' },
        { id: 't-3-3-2', type: 'calcul', enonce: '9 \\times 0{,}01', attendu: 0.09, revoir: 'propriete' },
        { id: 't-3-3-3', type: 'calcul', enonce: '4{,}5 \\times 0{,}1', attendu: 0.45, revoir: 'exemple' },
        { id: 't-3-3-4', type: 'calcul', enonce: '2 \\times 0{,}001', attendu: 0.002, revoir: 'propriete' },
        { id: 't-3-3-5', type: 'calcul', enonce: '350 \\times 0{,}01', attendu: 3.5, revoir: 'exemple' },
        { id: 't-3-3-6', type: 'calcul', enonce: '6 \\times 0{,}1', attendu: 0.6, revoir: 'propriete' },
        { id: 't-3-3-7', type: 'trous', enonce: '40 \\times \\square = 4', champs: [{ id: 'a', attendu: 0.1 }], revoir: 'propriete' },
        { id: 't-3-3-8', type: 'calcul', enonce: '1200 \\times 0{,}001', attendu: 1.2, revoir: 'propriete' },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-3-4',
      titre: 'Arrondir et encadrer',
      attendus: [
        'Il donne la valeur arrondie d\'un décimal à l\'unité, au dixième ou au centième.',
        'Il encadre un décimal entre deux nombres.',
      ],

      decouvrir: {
        titre: 'Le plus proche, pas le plus court',
        texte:
          'On veut donner une valeur approchée de 3,47 avec un seul chiffre après '
          + 'la virgule. Deux candidats : 3,4 et 3,5.',
        lignes: [
          { calcul: 'Écart avec 3,4', resultat: '3,47 − 3,40 = 0,07' },
          { calcul: 'Écart avec 3,5', resultat: '3,50 − 3,47 = 0,03' },
        ],
        question: 'Duquel 3,47 est-il le plus proche ? Réponds 34 pour 3,4 ou 35 pour 3,5. Puis donne l\'arrondi de 3,42 au dixième, de la même façon.',
        champs: [
          { id: 'a', etiquette: 'Arrondi de 3,47 (34 ou 35)', attendu: 35 },
          { id: 'b', etiquette: 'Arrondi de 3,42 (34 ou 35)', attendu: 34 },
        ],
        conclusion:
          'Arrondir, c\'est choisir le **plus proche**, pas couper la fin. Le raccourci : '
          + 'on regarde le chiffre **juste après** le rang demandé. S\'il vaut 5 ou '
          + 'plus, on augmente ; sinon on garde.',
      },

      cours: [
        {
          type: 'propriete',
          titre: 'La règle de l\'arrondi',
          texte:
            'On regarde le chiffre **situé juste après** le rang demandé.\n'
            + 'S\'il vaut **5, 6, 7, 8 ou 9** : on augmente de 1 le chiffre du rang.\n'
            + 'S\'il vaut **0, 1, 2, 3 ou 4** : on le laisse tel quel.\n'
            + 'Dans les deux cas, on supprime tout ce qui suit.',
        },
        {
          type: 'remarque',
          titre: 'Arrondir n\'est pas couper',
          texte:
            'Couper 3,47 donne 3,4 : c\'est **tronquer**, et c\'est faux. 3,47 est plus '
            + 'proche de 3,5. C\'est l\'erreur la plus fréquente du chapitre.',
        },
        {
          type: 'definition',
          titre: 'Le rang demandé',
          texte:
            'Arrondir **à l\'unité** ne laisse aucun chiffre après la virgule.\n'
            + 'Arrondir **au dixième** en laisse un. Au **centième**, deux.',
        },
        { type: 'exemple', texte: '3,47 → 3,5 au dixième   ·   3,47 → 3 à l\'unité   ·   2,384 → 2,38 au centième' },
      ],

      methode: {
        titre: 'Arrondir 7,268 au centième',
        enonce: 'Donner la valeur arrondie de 7,268 au centième.',
        etapes: [
          { texte: 'Au centième : je garde deux chiffres après la virgule, donc 7,26…', note: '' },
          { texte: 'Je regarde le chiffre juste après : c\'est 8.', note: '' },
          { texte: '8 vaut 5 ou plus, donc j\'augmente le 6 de 1 : il devient 7.', note: '' },
          { texte: 'L\'arrondi est 7,27.', note: '' },
        ],
        controle:
          'Le contrôle : compte les chiffres après la virgule de ta réponse. Au '
          + 'centième, il doit y en avoir exactement deux.',
      },

      entrainement: [
        {
          id: 'e-3-4-1', type: 'calcul', palier: 1,
          consigne: 'Arrondis ce nombre au dixième.', enonce: '3{,}47', attendu: 3.5,
          fausses: [{ valeur: 3.4, piege: 'arrondi-tronque' }],
        },
        {
          // Neutre : ici arrondir et couper donnent le MÊME résultat, puisque le
          // chiffre suivant vaut moins de 5. Sans cet item, l'élève croirait
          // qu'il faut toujours augmenter.
          id: 'e-3-4-2', type: 'calcul', palier: 1, neutre: true,
          consigne: 'Arrondis ce nombre au dixième.', enonce: '3{,}42', attendu: 3.4,
        },
        {
          id: 'e-3-4-3', type: 'calcul', palier: 1,
          consigne: 'Arrondis ce nombre à l\'unité.', enonce: '3{,}47', attendu: 3,
          fausses: [{ valeur: 3.5, piege: 'rang-d-arrondi-confondu' }],
        },
        {
          id: 'e-3-4-4', type: 'calcul', palier: 2,
          consigne: 'Arrondis ce nombre au centième.', enonce: '7{,}268', attendu: 7.27,
          fausses: [{ valeur: 7.26, piege: 'arrondi-tronque' }, { valeur: 7.3, piege: 'rang-d-arrondi-confondu' }],
        },
        {
          id: 'e-3-4-5', type: 'calcul', palier: 2,
          consigne: 'Arrondis ce nombre à l\'unité.', enonce: '12{,}6', attendu: 13,
          fausses: [{ valeur: 12, piege: 'arrondi-tronque' }],
        },
        {
          id: 'e-3-4-6', type: 'calcul', palier: 3,
          consigne: 'Arrondis ce nombre au dixième.', enonce: '9{,}96', attendu: 10,
          fausses: [{ valeur: 9.9, piege: 'arrondi-tronque' }],
        },
        {
          id: 'e-3-4-7', type: 'trous', palier: 3,
          consigne: 'Encadre ce nombre par deux entiers consécutifs.',
          enonce: '\\square < 8{,}3 < \\square',
          champs: [{ id: 'a', attendu: 8 }, { id: 'b', attendu: 9 }],
        },
      ],

      problemes: [
        {
          id: 'p-3-4-1',
          enonce:
            'Une facture s\'élève à 47,368 €. On paie toujours au centime près, '
            + 'c\'est-à-dire au centième d\'euro.',
          questions: [
            { texte: 'Quelle somme paie-t-on, en euros ?', attendu: 47.37, unite: '€' },
            { texte: 'Arrondie à l\'euro, cette facture vaut combien ?', attendu: 47, unite: '€' },
          ],
        },
        {
          id: 'p-3-4-2',
          enonce:
            'Un coureur a mis 12,847 secondes. Le chronomètre officiel affiche les '
            + 'temps au centième.',
          questions: [
            { texte: 'Quel temps est affiché, en secondes ?', attendu: 12.85, unite: 's' },
            { texte: 'Arrondi au dixième, ce temps vaut combien ?', attendu: 12.8, unite: 's' },
          ],
        },
        {
          id: 'p-3-4-3',
          enonce:
            'Trois amis se partagent 20 € équitablement. Le partage exact donne '
            + '6,666… € chacun.',
          questions: [
            { texte: 'Arrondi au centime, combien reçoit chacun ?', attendu: 6.67, unite: '€' },
            { texte: 'Arrondi à l\'euro, combien reçoit chacun ?', attendu: 7, unite: '€' },
          ],
        },
      ],

      test: [
        { id: 't-3-4-1', type: 'calcul', consigne: 'Au dixième :', enonce: '5{,}68', attendu: 5.7, revoir: 'propriete' },
        { id: 't-3-4-2', type: 'calcul', consigne: 'Au dixième :', enonce: '5{,}61', attendu: 5.6, revoir: 'propriete' },
        { id: 't-3-4-3', type: 'calcul', consigne: 'À l\'unité :', enonce: '7{,}5', attendu: 8, revoir: 'definition' },
        { id: 't-3-4-4', type: 'calcul', consigne: 'À l\'unité :', enonce: '7{,}4', attendu: 7, revoir: 'definition' },
        { id: 't-3-4-5', type: 'calcul', consigne: 'Au centième :', enonce: '0{,}456', attendu: 0.46, revoir: 'exemple' },
        { id: 't-3-4-6', type: 'calcul', consigne: 'Au centième :', enonce: '3{,}214', attendu: 3.21, revoir: 'exemple' },
        { id: 't-3-4-7', type: 'calcul', consigne: 'Au dixième :', enonce: '19{,}97', attendu: 20, revoir: 'propriete' },
        { id: 't-3-4-8', type: 'trous', enonce: '\\square < 4{,}7 < \\square', champs: [{ id: 'a', attendu: 4 }, { id: 'b', attendu: 5 }], revoir: 'definition' },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-3-5',
      titre: 'Estimer avant de calculer',
      attendus: [
        'Il donne un ordre de grandeur du résultat d\'une opération.',
        'Il utilise cet ordre de grandeur pour rejeter un résultat faux.',
      ],

      decouvrir: {
        titre: 'Trouver la faute sans refaire le calcul',
        texte:
          'Un élève a posé trois calculs. Sans les refaire, on peut en éliminer un '
          + 'tout de suite.',
        lignes: [
          { calcul: '19 × 21', resultat: '399' },
          { calcul: '4,9 × 8,1', resultat: '396,9' },
          { calcul: '198 + 203', resultat: '401' },
        ],
        question: '4,9 c\'est presque 5, et 8,1 presque 8. Combien font 5 × 8 ? Le résultat annoncé, 396,9, est-il plausible ? Réponds 1 pour oui, 0 pour non.',
        champs: [
          { id: 'a', etiquette: '5 × 8 =', attendu: 40 },
          { id: 'b', etiquette: 'Plausible ? (1 ou 0)', attendu: 0 },
        ],
        conclusion:
          'Le résultat devrait tourner autour de **40**, pas de 400 : il y a une '
          + 'virgule mal placée. On a trouvé la faute **sans poser le calcul**. '
          + 'C\'est ça, l\'ordre de grandeur — et c\'est le geste qui rattrape presque '
          + 'toutes les erreurs de virgule.',
      },

      cours: [
        {
          type: 'definition',
          titre: 'Un ordre de grandeur',
          texte:
            'Un ordre de grandeur est une valeur **approchée et simple** du résultat, '
            + 'obtenue en remplaçant chaque nombre par un nombre rond facile à '
            + 'calculer de tête.',
        },
        {
          type: 'propriete',
          titre: 'Comment faire',
          texte:
            'On arrondit chaque nombre à l\'unité, à la dizaine ou à la centaine — '
            + 'ce qui rend le calcul faisable de tête — puis on calcule.\n'
            + '4,9 × 8,1 devient 5 × 8 = 40.',
        },
        {
          type: 'remarque',
          titre: 'À quoi ça sert vraiment',
          texte:
            'Pas à trouver la réponse : à **rejeter** une réponse fausse. Un résultat '
            + 'dix fois trop grand ou dix fois trop petit se repère en deux secondes, '
            + 'alors qu\'il faudrait une minute pour refaire le calcul.',
        },
        { type: 'exemple', texte: '4,9 × 8,1 ≈ 40   ·   198 + 203 ≈ 400   ·   61 ÷ 2,9 ≈ 20' },
      ],

      methode: {
        titre: 'Contrôler 12,4 × 4,9 = 60,76',
        enonce: 'Ce résultat est-il plausible : 12,4 × 4,9 = 60,76 ?',
        etapes: [
          { texte: 'J\'arrondis : 12,4 devient 12, et 4,9 devient 5.', note: 'Des nombres calculables de tête.' },
          { texte: '12 × 5 = 60.', note: '' },
          { texte: 'Le résultat annoncé, 60,76, est très proche de 60.', note: '' },
          { texte: 'Il est donc plausible.', note: 'Ça ne prouve pas qu\'il est exact — mais rien ne le contredit.' },
        ],
        controle:
          'Attention à ce que l\'ordre de grandeur prouve : il permet de dire « c\'est '
          + 'faux », jamais « c\'est juste ». Un résultat plausible peut encore avoir '
          + 'une petite erreur.',
      },

      entrainement: [
        {
          id: 'e-3-5-1', type: 'calcul', palier: 1,
          consigne: 'Donne un ordre de grandeur de ce calcul, en arrondissant chaque nombre à l\'unité.',
          enonce: '4{,}9 \\times 8{,}1', attendu: 40,
        },
        {
          id: 'e-3-5-2', type: 'plausible', palier: 1,
          consigne: 'Sans poser le calcul, ce résultat est-il plausible ?',
          enonce: '4{,}9 \\times 8{,}1 = 396{,}9', attendu: false,
          explication: '5 × 8 = 40 : le résultat doit tourner autour de 40, pas de 400. La virgule est mal placée.',
        },
        {
          // Neutre : ici le résultat EST plausible. Sans cet item, « répondre
          // toujours faux » suffirait à réussir la section.
          id: 'e-3-5-3', type: 'plausible', palier: 1, neutre: true,
          consigne: 'Sans poser le calcul, ce résultat est-il plausible ?',
          enonce: '12{,}4 \\times 4{,}9 = 60{,}76', attendu: true,
          explication: '12 × 5 = 60 : le résultat annoncé en est très proche.',
        },
        {
          id: 'e-3-5-4', type: 'calcul', palier: 2,
          consigne: 'Donne un ordre de grandeur, en arrondissant chaque nombre à la centaine.',
          enonce: '198 + 203', attendu: 400,
        },
        {
          id: 'e-3-5-5', type: 'plausible', palier: 2,
          consigne: 'Sans poser le calcul, ce résultat est-il plausible ?',
          enonce: '61 \\div 2{,}9 = 2{,}1', attendu: false,
          explication: '60 ÷ 3 = 20 : le résultat doit tourner autour de 20, pas de 2. La vraie réponse est environ 21.',
        },
        {
          id: 'e-3-5-6', type: 'plausible', palier: 3, neutre: true,
          consigne: 'Sans poser le calcul, ce résultat est-il plausible ?',
          enonce: '19 \\times 21 = 399', attendu: true,
          explication: '20 × 20 = 400 : le résultat annoncé en est très proche.',
        },
        {
          id: 'e-3-5-7', type: 'plausible', palier: 3,
          consigne: 'Sans poser le calcul, ce résultat est-il plausible ?',
          enonce: '3{,}2 \\times 0{,}9 = 28{,}8', attendu: false,
          explication: '0,9 est plus petit que 1, donc le résultat doit être un peu PLUS PETIT que 3,2. La vraie réponse est 2,88.',
        },
      ],

      problemes: [
        {
          id: 'p-3-5-1',
          enonce:
            'Anto achète 3 cahiers à 2,95 € et 2 stylos à 1,05 €. Il veut vérifier '
            + 'sa facture de tête avant de payer.',
          questions: [
            { texte: 'Quel ordre de grandeur obtient-il en arrondissant à l\'euro ?', attendu: 11, unite: '€' },
            { texte: 'Quel est le montant exact, en euros ?', attendu: 10.95, unite: '€' },
          ],
        },
        {
          id: 'p-3-5-2',
          enonce:
            'Une salle contient 38 rangées de 21 sièges.',
          questions: [
            { texte: 'Quel ordre de grandeur du nombre de sièges obtient-on en arrondissant à la dizaine ?', attendu: 800, unite: 'sièges' },
            { texte: 'Quel est le nombre exact de sièges ?', attendu: 798, unite: 'sièges' },
          ],
        },
        {
          id: 'p-3-5-3',
          enonce:
            'Un plein d\'essence de 41 litres coûte 78,90 €.',
          questions: [
            { texte: 'Quel ordre de grandeur du prix du litre obtient-on, en arrondissant à la dizaine et à l\'unité ?', attendu: 2, unite: '€' },
            { texte: 'Un ami annonce 19,20 € le litre. Est-ce plausible ? Réponds 1 pour oui, 0 pour non.', attendu: 0 },
          ],
        },
      ],

      test: [
        { id: 't-3-5-1', type: 'calcul', consigne: 'Ordre de grandeur (arrondis à l\'unité) :', enonce: '5{,}1 \\times 3{,}9', attendu: 20, revoir: 'propriete' },
        {
          id: 't-3-5-2', type: 'plausible', enonce: '5{,}1 \\times 3{,}9 = 199', attendu: false, revoir: 'remarque',
          explication: '5 × 4 = 20 : le résultat doit tourner autour de 20, pas de 200.',
        },
        {
          id: 't-3-5-3', type: 'plausible', enonce: '9{,}8 + 10{,}1 = 19{,}9', attendu: true, revoir: 'exemple',
          explication: '10 + 10 = 20 : le résultat annoncé en est très proche.',
        },
        { id: 't-3-5-4', type: 'calcul', consigne: 'Ordre de grandeur (arrondis à la dizaine) :', enonce: '39 \\times 11', attendu: 400, revoir: 'propriete' },
        {
          id: 't-3-5-5', type: 'plausible', enonce: '102 \\div 4{,}9 = 2{,}08', attendu: false, revoir: 'remarque',
          explication: '100 ÷ 5 = 20 : le résultat doit tourner autour de 20, pas de 2.',
        },
        {
          id: 't-3-5-6', type: 'plausible', enonce: '8{,}1 \\times 0{,}98 = 7{,}94', attendu: true, revoir: 'exemple',
          explication: '0,98 est presque 1, donc le résultat doit être un peu plus petit que 8,1. C\'est le cas.',
        },
        { id: 't-3-5-7', type: 'calcul', consigne: 'Ordre de grandeur (arrondis à la centaine) :', enonce: '297 + 106', attendu: 400, revoir: 'propriete' },
        {
          id: 't-3-5-8', type: 'plausible', enonce: '24 \\times 0{,}5 = 48', attendu: false, revoir: 'remarque',
          explication: '0,5 est plus petit que 1 : multiplier par 0,5 c\'est prendre la moitié, donc 12. Le résultat annoncé est le double au lieu de la moitié.',
        },
      ],
    },
  ],
};
