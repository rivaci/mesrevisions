// Chapitre 5 — Grandeurs et mesures.
//
// ── Ce que le programme 2025 demande en 6e ────────────────────────────────
//
//   longueurs   les préfixes du kilo- au milli- ; le périmètre du carré et du
//               rectangle ; le PÉRIMÈTRE DU DISQUE, nouveauté de la 6e ; les
//               périmètres de figures composées.
//   aires       les conversions d'unités d'aire — nouveauté aussi — et les
//               formules du carré et du rectangle.
//   volumes     l'unité cm³, comparer et déterminer des volumes, en lien avec
//               le dénombrement d'assemblages de cubes.
//   durées      les calculs sur horaires, et les conversions entre système
//               décimal et système sexagésimal.
//
// ── Deux liens que le programme demande explicitement ─────────────────────
//
// « Savoir que le périmètre du disque est PROPORTIONNEL à son diamètre » : le
// nombre π n'est pas une formule tombée du ciel, c'est le coefficient de
// proportionnalité entre le tour et le diamètre. L'activité de découverte le
// fait apparaître comme tel, en réutilisant le chapitre 4.
//
// « Ces formules constituent une première sensibilisation au CALCUL LITTÉRAL.
// L'élève substitue une valeur numérique à une lettre. » C'est la seule
// manipulation de lettres autorisée en 6e — remplacer, pas transformer.
//
// ── L'obstacle central : la conversion des aires ──────────────────────────
//
// Un mètre vaut dix décimètres, mais un mètre CARRÉ vaut cent décimètres
// carrés. L'élève applique le facteur des longueurs à une aire, et se trompe
// d'un facteur dix à chaque changement d'unité. Le chapitre construit l'image
// qui l'en empêche : le carré de 1 m de côté contient dix rangées de dix.

export default {
  numero: 5,
  titre: 'Grandeurs et mesures',
  theme: 'Grandeurs et mesures',
  trimestre: 2,
  programme: '2025',
  prerequis: [
    'Multiplier et diviser par 10, 100, 1000 (chapitre 1)',
    'La proportionnalité et le retour à l\'unité (chapitre 4)',
    'Les préfixes des unités de longueur (CM)',
  ],

  savoirFaire: [
    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-5-1',
      titre: 'Convertir des longueurs',
      attendus: [
        'Il connaît les préfixes du kilo- au milli-.',
        'Il convertit une longueur d\'une unité vers une autre.',
      ],

      decouvrir: {
        titre: 'Les préfixes disent le facteur',
        texte:
          'Les préfixes des unités ne sont pas des noms au hasard : chacun dit par '
          + 'combien on multiplie le mètre.',
        lignes: [
          { calcul: 'kilo-', resultat: 'mille fois : 1 km = 1000 m' },
          { calcul: 'centi-', resultat: 'un centième : 1 cm = 0,01 m' },
          { calcul: 'milli-', resultat: 'un millième : 1 mm = 0,001 m' },
        ],
        question: 'Combien de centimètres dans 1 mètre ? Et combien de millimètres dans 1 mètre ?',
        champs: [
          { id: 'a', etiquette: 'cm dans 1 m', attendu: 100 },
          { id: 'b', etiquette: 'mm dans 1 m', attendu: 1000 },
        ],
        conclusion:
          'Ce sont exactement les rangs du chapitre 1 : le centimètre est au mètre '
          + 'ce que le centième est à l\'unité. Convertir une longueur, c\'est '
          + '**déplacer la virgule**.',
      },

      cours: [
        {
          type: 'definition',
          titre: 'Les préfixes',
          texte:
            '**kilo-** : mille fois (1 km = 1000 m)\n'
            + '**hecto-** : cent fois · **déca-** : dix fois\n'
            + '**déci-** : un dixième · **centi-** : un centième · **milli-** : un millième',
        },
        {
          type: 'propriete',
          titre: 'Le sens de la conversion',
          texte:
            'Vers une unité **plus petite**, le nombre devient plus **grand** : '
            + '3 m = 300 cm.\n'
            + 'Vers une unité **plus grande**, le nombre devient plus **petit** : '
            + '450 m = 0,45 km.',
        },
        {
          type: 'remarque',
          titre: 'Le contrôle qui ne trompe pas',
          texte:
            'Compare la taille des unités. Un centimètre est petit : il en faut '
            + 'beaucoup pour faire un mètre. Donc le nombre de centimètres est plus '
            + 'grand que le nombre de mètres.',
        },
        { type: 'exemple', texte: '3 m = 300 cm   ·   450 m = 0,45 km   ·   2,5 cm = 25 mm' },
      ],

      methode: {
        titre: 'Convertir 450 m en kilomètres',
        enonce: 'Convertir 450 m en kilomètres.',
        etapes: [
          { texte: 'Le kilomètre est plus grand que le mètre.', note: 'Le nombre va donc rétrécir.' },
          { texte: '1 km = 1000 m, donc je divise par 1000.', note: '' },
          { texte: '450 ÷ 1000 = 0,45.', note: 'La virgule recule de trois rangs.' },
          { texte: 'Donc 450 m = 0,45 km.', note: '' },
        ],
        controle:
          'Le contrôle : 450 m, c\'est moins d\'un kilomètre. Un résultat supérieur à '
          + '1 serait forcément faux.',
      },

      entrainement: [
        {
          id: 'e-5-1-1', type: 'calcul', palier: 1,
          consigne: 'Convertis en centimètres.', enonce: '7 \\text{ m}', attendu: 700,
        },
        {
          id: 'e-5-1-2', type: 'calcul', palier: 1,
          consigne: 'Convertis en millimètres.', enonce: '3{,}5 \\text{ cm}', attendu: 35,
        },
        {
          id: 'e-5-1-3', type: 'calcul', palier: 2,
          consigne: 'Convertis en kilomètres.', enonce: '620 \\text{ m}', attendu: 0.62,
          fausses: [{ valeur: 620000, piege: 'virgule-decalee' }],
        },
        {
          // Neutre : conversion vers une unité plus petite, le nombre grandit.
          // Sans cet item, « convertir rapetisse toujours » s'installerait.
          id: 'e-5-1-4', type: 'calcul', palier: 2, neutre: true,
          consigne: 'Convertis en mètres.', enonce: '1{,}2 \\text{ km}', attendu: 1200,
        },
        {
          id: 'e-5-1-5', type: 'calcul', palier: 2,
          consigne: 'Convertis en mètres.', enonce: '75 \\text{ cm}', attendu: 0.75,
          fausses: [{ valeur: 7500, piege: 'virgule-decalee' }],
        },
        {
          id: 'e-5-1-6', type: 'calcul', palier: 3,
          consigne: 'Convertis en centimètres.', enonce: '0{,}08 \\text{ m}', attendu: 8,
        },
        {
          id: 'e-5-1-7', type: 'calcul', palier: 3,
          consigne: 'Additionne et donne le résultat en mètres.',
          enonce: '2{,}5 \\text{ m} + 80 \\text{ cm}', attendu: 3.3,
          fausses: [{ valeur: 82.5, piege: 'virgule-decalee' }],
        },
      ],

      problemes: [
        {
          id: 'p-5-1-1',
          enonce: 'Un couloir mesure 12,5 m de long. On y pose des dalles de 25 cm.',
          questions: [
            { texte: 'Quelle est la longueur du couloir en centimètres ?', attendu: 1250, unite: 'cm' },
            { texte: 'Combien de dalles faut-il pour couvrir cette longueur ?', attendu: 50, unite: 'dalles' },
          ],
        },
        {
          id: 'p-5-1-2',
          enonce: 'Anto court 3 tours d\'un stade dont le tour mesure 450 m.',
          questions: [
            { texte: 'Quelle distance parcourt-il, en mètres ?', attendu: 1350, unite: 'm' },
            { texte: 'Combien cela fait-il de kilomètres ?', attendu: 1.35, unite: 'km' },
          ],
        },
        {
          id: 'p-5-1-3',
          enonce: 'Une planche de 2 m est coupée en morceaux de 40 cm.',
          questions: [
            { texte: 'Combien de morceaux obtient-on ?', attendu: 5, unite: 'morceaux' },
            { texte: 'Si les morceaux faisaient 30 cm, combien en obtiendrait-on de complets ?', attendu: 6, unite: 'morceaux' },
          ],
        },
      ],

      test: [
        { id: 't-5-1-1', type: 'calcul', consigne: 'En centimètres :', enonce: '5 \\text{ m}', attendu: 500, revoir: 'propriete' },
        { id: 't-5-1-2', type: 'calcul', consigne: 'En mètres :', enonce: '2{,}4 \\text{ km}', attendu: 2400, revoir: 'propriete' },
        { id: 't-5-1-3', type: 'calcul', consigne: 'En kilomètres :', enonce: '800 \\text{ m}', attendu: 0.8, revoir: 'exemple' },
        { id: 't-5-1-4', type: 'calcul', consigne: 'En millimètres :', enonce: '4 \\text{ cm}', attendu: 40, revoir: 'definition' },
        { id: 't-5-1-5', type: 'calcul', consigne: 'En mètres :', enonce: '45 \\text{ cm}', attendu: 0.45, revoir: 'propriete' },
        { id: 't-5-1-6', type: 'calcul', consigne: 'En centimètres :', enonce: '0{,}6 \\text{ m}', attendu: 60, revoir: 'exemple' },
        { id: 't-5-1-7', type: 'calcul', consigne: 'En mètres :', enonce: '1250 \\text{ mm}', attendu: 1.25, revoir: 'propriete' },
        { id: 't-5-1-8', type: 'calcul', consigne: 'En kilomètres :', enonce: '2500 \\text{ m}', attendu: 2.5, revoir: 'propriete' },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-5-2',
      titre: 'Périmètres, y compris celui du disque',
      attendus: [
        'Il calcule le périmètre d\'un carré, d\'un rectangle et d\'un disque.',
        'Il sait que le périmètre d\'un disque est proportionnel à son diamètre.',
      ],

      decouvrir: {
        titre: 'Le tour divisé par le diamètre donne toujours la même chose',
        texte:
          'On mesure le tour de trois objets ronds et leur diamètre, puis on divise '
          + 'le premier par le second.',
        lignes: [
          { calcul: 'Une pièce', resultat: 'tour 7,5 cm · diamètre 2,4 cm' },
          { calcul: 'Une assiette', resultat: 'tour 75,4 cm · diamètre 24 cm' },
          { calcul: 'Une roue', resultat: 'tour 219,9 cm · diamètre 70 cm' },
        ],
        question: 'Calcule 75,4 ÷ 24, puis 219,9 ÷ 70. Arrondis chaque résultat au dixième.',
        champs: [
          { id: 'a', etiquette: '75,4 ÷ 24 ≈', attendu: 3.1 },
          { id: 'b', etiquette: '219,9 ÷ 70 ≈', attendu: 3.1 },
        ],
        conclusion:
          'On retrouve **toujours le même nombre**, environ 3,14. Le périmètre est '
          + 'donc **proportionnel au diamètre**, et ce nombre est le coefficient : '
          + 'on l\'appelle **π**. La formule n\'est pas tombée du ciel — c\'est un '
          + 'coefficient de proportionnalité, comme au chapitre 4.',
      },

      cours: [
        {
          type: 'propriete',
          titre: 'Carré et rectangle',
          texte:
            'Périmètre d\'un carré de côté c : **P = 4 × c**.\n'
            + 'Périmètre d\'un rectangle de longueur L et de largeur l : '
            + '**P = 2 × (L + l)**.',
        },
        {
          type: 'propriete',
          titre: 'Le disque',
          texte:
            'Le périmètre d\'un disque est **proportionnel à son diamètre**, et le '
            + 'coefficient est **π ≈ 3,14**.\n'
            + '**P = π × d**, ou **P = 2 × π × r** puisque le diamètre vaut deux fois '
            + 'le rayon.',
        },
        {
          type: 'remarque',
          titre: 'Remplacer une lettre par un nombre',
          texte:
            'Ces formules sont ta première rencontre avec le calcul littéral : la '
            + 'lettre attend un nombre. Pour un carré de 7 cm de côté, on remplace c '
            + 'par 7 et on calcule 4 × 7 = 28 cm.',
        },
        {
          type: 'remarque',
          titre: 'Rayon ou diamètre ?',
          texte:
            'C\'est l\'erreur la plus fréquente. Regarde ce que l\'énoncé donne. '
            + 'S\'il donne le rayon et que tu veux utiliser π × d, double-le d\'abord.',
        },
        { type: 'exemple', texte: 'Carré de 7 cm : P = 28 cm   ·   Rectangle 5 × 3 : P = 16 cm   ·   Disque de diamètre 10 cm : P ≈ 31,4 cm' },
      ],

      methode: {
        titre: 'Périmètre d\'un disque de rayon 5 cm',
        enonce: 'Calculer le périmètre d\'un disque de rayon 5 cm, avec π ≈ 3,14.',
        etapes: [
          { texte: 'L\'énoncé donne le RAYON. Le diamètre vaut donc 2 × 5 = 10 cm.', note: 'C\'est l\'étape qu\'on oublie.' },
          { texte: 'J\'applique P = π × d : 3,14 × 10 = 31,4.', note: '' },
          { texte: 'Le périmètre vaut environ 31,4 cm.', note: '' },
        ],
        controle:
          'Le contrôle : le tour d\'un disque fait un peu plus de trois fois son '
          + 'diamètre. Ici, un peu plus de 30 cm — c\'est cohérent.',
      },

      entrainement: [
        {
          id: 'e-5-2-1', type: 'calcul', palier: 1,
          consigne: 'Périmètre d\'un carré de 9 cm de côté, en cm ?',
          enonce: 'c = 9 \\text{ cm}', attendu: 36,
          fausses: [{ valeur: 81, piege: 'perimetre-aire-confondus' }],
        },
        {
          id: 'e-5-2-2', type: 'calcul', palier: 1,
          consigne: 'Périmètre d\'un rectangle de 6 cm sur 4 cm, en cm ?',
          enonce: 'L = 6 \\text{ cm}, \\; l = 4 \\text{ cm}', attendu: 20,
          fausses: [{ valeur: 24, piege: 'perimetre-aire-confondus' }, { valeur: 10, piege: 'perimetre-aire-confondus' }],
        },
        {
          id: 'e-5-2-3', type: 'calcul', palier: 2,
          consigne: 'Périmètre d\'un disque de diamètre 8 cm, en cm ? Prends π ≈ 3,14.',
          enonce: 'd = 8 \\text{ cm}', attendu: 25.12,
        },
        {
          id: 'e-5-2-4', type: 'calcul', palier: 2,
          consigne: 'Périmètre d\'un disque de rayon 7 cm, en cm ? Prends π ≈ 3,14.',
          enonce: 'r = 7 \\text{ cm}', attendu: 43.96,
          fausses: [{ valeur: 21.98, piege: 'cercle-rayon-diametre' }],
        },
        {
          // Neutre : ici l'énoncé donne bien le diamètre, pas le rayon. Sans cet
          // item, « il faut toujours doubler » deviendrait la règle apprise.
          id: 'e-5-2-5', type: 'calcul', palier: 2, neutre: true,
          consigne: 'Périmètre d\'un disque de diamètre 4 cm, en cm ? Prends π ≈ 3,14.',
          enonce: 'd = 4 \\text{ cm}', attendu: 12.56,
        },
        {
          id: 'e-5-2-6', type: 'calcul', palier: 3,
          consigne: 'Périmètre d\'un disque de rayon 3 cm, en cm ? Prends π ≈ 3,14.',
          enonce: 'r = 3 \\text{ cm}', attendu: 18.84,
          fausses: [{ valeur: 9.42, piege: 'cercle-rayon-diametre' }],
        },
        {
          id: 'e-5-2-7', type: 'vraifaux', palier: 3,
          affirmation: 'Si on double le diamètre d\'un disque, son périmètre double aussi.',
          attendu: true,
        },
      ],

      problemes: [
        {
          id: 'p-5-2-1',
          enonce: 'Un jardin rectangulaire mesure 12 m sur 8 m. On veut le clôturer.',
          questions: [
            { texte: 'Quelle longueur de clôture faut-il, en mètres ?', attendu: 40, unite: 'm' },
            { texte: 'À 15 € le mètre, combien coûte la clôture, en euros ?', attendu: 600, unite: '€' },
          ],
        },
        {
          id: 'p-5-2-2',
          enonce: 'Une roue de vélo a un rayon de 35 cm. On prend π ≈ 3,14.',
          questions: [
            { texte: 'Quel est son diamètre, en centimètres ?', attendu: 70, unite: 'cm' },
            { texte: 'Quelle distance parcourt-elle en un tour, en centimètres ?', attendu: 219.8, unite: 'cm' },
          ],
        },
        {
          id: 'p-5-2-3',
          enonce: 'Une table ronde a un diamètre de 1,20 m. On veut poser un ruban tout autour. On prend π ≈ 3,14.',
          questions: [
            { texte: 'Quelle longueur de ruban faut-il, en mètres ?', attendu: 3.768, unite: 'm' },
            { texte: 'Arrondie au centimètre près, cette longueur vaut combien de mètres ?', attendu: 3.77, unite: 'm' },
          ],
        },
      ],

      test: [
        { id: 't-5-2-1', type: 'calcul', consigne: 'Périmètre d\'un carré de 6 cm de côté :', enonce: 'c = 6', attendu: 24, revoir: 'propriete' },
        { id: 't-5-2-2', type: 'calcul', consigne: 'Périmètre d\'un rectangle 8 cm sur 2 cm :', enonce: 'L = 8, \\; l = 2', attendu: 20, revoir: 'propriete' },
        { id: 't-5-2-3', type: 'calcul', consigne: 'Périmètre d\'un disque de diamètre 20 cm (π ≈ 3,14) :', enonce: 'd = 20', attendu: 62.8, revoir: 'propriete' },
        { id: 't-5-2-4', type: 'calcul', consigne: 'Périmètre d\'un disque de rayon 10 cm (π ≈ 3,14) :', enonce: 'r = 10', attendu: 62.8, revoir: 'remarque' },
        { id: 't-5-2-5', type: 'calcul', consigne: 'Diamètre d\'un disque de rayon 7 cm :', enonce: 'r = 7', attendu: 14, revoir: 'remarque' },
        { id: 't-5-2-6', type: 'calcul', consigne: 'Périmètre d\'un carré de 2,5 cm de côté :', enonce: 'c = 2{,}5', attendu: 10, revoir: 'propriete' },
        { id: 't-5-2-7', type: 'calcul', consigne: 'Périmètre d\'un disque de diamètre 5 cm (π ≈ 3,14) :', enonce: 'd = 5', attendu: 15.7, revoir: 'exemple' },
        { id: 't-5-2-8', type: 'calcul', consigne: 'Périmètre d\'un rectangle 7 m sur 4 m :', enonce: 'L = 7, \\; l = 4', attendu: 22, revoir: 'propriete' },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-5-3',
      titre: 'Aires et conversions d\'aire',
      attendus: [
        'Il calcule l\'aire d\'un carré et d\'un rectangle.',
        'Il convertit une aire d\'une unité vers une autre.',
      ],

      decouvrir: {
        titre: 'Combien de carrés de 1 dm dans un carré de 1 m ?',
        texte:
          'On dessine un carré de 1 mètre de côté, et on le quadrille en carrés de '
          + '1 décimètre de côté. Comme 1 m = 10 dm, chaque côté porte 10 carrés.',
        lignes: [
          { calcul: 'Sur une rangée', resultat: '10 carrés' },
          { calcul: 'Nombre de rangées', resultat: '10' },
        ],
        question: 'Combien de carrés de 1 dm de côté y a-t-il en tout ? Et combien de dm² vaut donc 1 m² ?',
        champs: [
          { id: 'a', etiquette: 'Nombre de carrés', attendu: 100 },
          { id: 'b', etiquette: '1 m² = … dm²', attendu: 100 },
        ],
        conclusion:
          'Un mètre vaut dix décimètres, mais un mètre **carré** vaut **cent** '
          + 'décimètres carrés. L\'unité change dans les deux dimensions, donc le '
          + 'facteur est **10 × 10**. C\'est l\'erreur numéro un des aires.',
      },

      cours: [
        {
          type: 'propriete',
          titre: 'Les formules',
          texte:
            'Aire d\'un carré de côté c : **A = c × c**.\n'
            + 'Aire d\'un rectangle de longueur L et de largeur l : **A = L × l**.',
        },
        {
          type: 'propriete',
          titre: 'Les conversions d\'aire',
          texte:
            'Chaque changement d\'unité d\'aire multiplie ou divise par **100**, pas '
            + 'par 10.\n'
            + '1 m² = 100 dm² = 10 000 cm².\n'
            + '1 km² = 1 000 000 m².',
        },
        {
          type: 'remarque',
          titre: 'Périmètre ou aire ?',
          texte:
            'Le périmètre est une **longueur** — en cm, m, km. L\'aire est une '
            + '**surface** — en cm², m², km². L\'unité demandée dit laquelle chercher.',
        },
        { type: 'exemple', texte: 'Carré de 7 cm : A = 49 cm²   ·   Rectangle 5 × 3 : A = 15 cm²   ·   2,5 m² = 250 dm²' },
      ],

      methode: {
        titre: 'Convertir 3 m² en cm²',
        enonce: 'Convertir 3 m² en centimètres carrés.',
        etapes: [
          { texte: 'Le centimètre carré est plus petit : le nombre va grandir.', note: '' },
          { texte: '1 m = 100 cm, donc 1 m² = 100 × 100 = 10 000 cm².', note: 'Le facteur est le CARRÉ de celui des longueurs.' },
          { texte: '3 × 10 000 = 30 000.', note: '' },
          { texte: 'Donc 3 m² = 30 000 cm².', note: '' },
        ],
        controle:
          'Le contrôle : si tu as trouvé 300 cm², tu as converti comme une longueur. '
          + 'Pour une aire, le facteur est toujours au carré.',
      },

      entrainement: [
        {
          id: 'e-5-3-1', type: 'calcul', palier: 1,
          consigne: 'Aire d\'un carré de 8 cm de côté, en cm² ?',
          enonce: 'c = 8 \\text{ cm}', attendu: 64,
          fausses: [{ valeur: 32, piege: 'perimetre-aire-confondus' }],
        },
        {
          id: 'e-5-3-2', type: 'calcul', palier: 1,
          consigne: 'Aire d\'un rectangle de 9 cm sur 4 cm, en cm² ?',
          enonce: 'L = 9 \\text{ cm}, \\; l = 4 \\text{ cm}', attendu: 36,
          fausses: [{ valeur: 26, piege: 'perimetre-aire-confondus' }],
        },
        {
          id: 'e-5-3-3', type: 'calcul', palier: 2,
          consigne: 'Convertis en dm².', enonce: '1 \\text{ m}^2', attendu: 100,
          fausses: [{ valeur: 10, piege: 'conversion-aire-lineaire' }],
        },
        {
          id: 'e-5-3-4', type: 'calcul', palier: 2,
          consigne: 'Convertis en cm².', enonce: '4 \\text{ m}^2', attendu: 40000,
          fausses: [{ valeur: 400, piege: 'conversion-aire-lineaire' }],
        },
        {
          // Neutre : une conversion de LONGUEUR, où le facteur est bien 10.
          // Sans cet item, « toujours multiplier par 100 » deviendrait la règle.
          id: 'e-5-3-5', type: 'calcul', palier: 2, neutre: true,
          consigne: 'Convertis en dm.', enonce: '1 \\text{ m}', attendu: 10,
        },
        {
          id: 'e-5-3-6', type: 'calcul', palier: 3,
          consigne: 'Convertis en m².', enonce: '25000 \\text{ cm}^2', attendu: 2.5,
          fausses: [{ valeur: 2500, piege: 'conversion-aire-lineaire' }],
        },
        {
          id: 'e-5-3-7', type: 'calcul', palier: 3,
          consigne: 'Aire d\'un rectangle de 2 m sur 50 cm, en m² ?',
          enonce: 'L = 2 \\text{ m}, \\; l = 50 \\text{ cm}', attendu: 1,
          fausses: [{ valeur: 100, piege: 'conversion-aire-lineaire' }],
        },
      ],

      problemes: [
        {
          id: 'p-5-3-1',
          enonce: 'Une pièce rectangulaire mesure 4 m sur 3 m. On veut y poser un parquet.',
          questions: [
            { texte: 'Quelle est l\'aire de la pièce, en m² ?', attendu: 12, unite: 'm²' },
            { texte: 'À 25 € le mètre carré, combien coûte le parquet, en euros ?', attendu: 300, unite: '€' },
          ],
        },
        {
          id: 'p-5-3-2',
          enonce: 'Un carreau carré mesure 20 cm de côté. On carrelle un sol de 6 m².',
          questions: [
            { texte: 'Quelle est l\'aire d\'un carreau, en cm² ?', attendu: 400, unite: 'cm²' },
            { texte: 'Combien de cm² fait le sol de 6 m² ?', attendu: 60000, unite: 'cm²' },
          ],
        },
        {
          id: 'p-5-3-3',
          enonce: 'Un terrain rectangulaire mesure 50 m sur 40 m.',
          questions: [
            { texte: 'Quelle est son aire, en m² ?', attendu: 2000, unite: 'm²' },
            { texte: 'Quel est son périmètre, en mètres ?', attendu: 180, unite: 'm' },
          ],
        },
      ],

      test: [
        { id: 't-5-3-1', type: 'calcul', consigne: 'Aire d\'un carré de 9 cm de côté :', enonce: 'c = 9', attendu: 81, revoir: 'propriete' },
        { id: 't-5-3-2', type: 'calcul', consigne: 'Aire d\'un rectangle 6 cm sur 4 cm :', enonce: 'L = 6, \\; l = 4', attendu: 24, revoir: 'propriete' },
        { id: 't-5-3-3', type: 'calcul', consigne: 'En dm² :', enonce: '2 \\text{ m}^2', attendu: 200, revoir: 'propriete' },
        { id: 't-5-3-4', type: 'calcul', consigne: 'En cm² :', enonce: '1 \\text{ m}^2', attendu: 10000, revoir: 'propriete' },
        { id: 't-5-3-5', type: 'calcul', consigne: 'En m² :', enonce: '50000 \\text{ cm}^2', attendu: 5, revoir: 'exemple' },
        { id: 't-5-3-6', type: 'calcul', consigne: 'Aire d\'un carré de 1,5 m de côté, en m² :', enonce: 'c = 1{,}5', attendu: 2.25, revoir: 'propriete' },
        { id: 't-5-3-7', type: 'calcul', consigne: 'En dm² :', enonce: '0{,}5 \\text{ m}^2', attendu: 50, revoir: 'propriete' },
        { id: 't-5-3-8', type: 'calcul', consigne: 'Aire d\'un rectangle 10 m sur 2,5 m, en m² :', enonce: 'L = 10, \\; l = 2{,}5', attendu: 25, revoir: 'propriete' },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-5-4',
      titre: 'Volumes et centimètres cubes',
      attendus: [
        'Il connaît l\'unité centimètre cube.',
        'Il détermine le volume d\'un assemblage de cubes ou d\'un pavé.',
      ],

      decouvrir: {
        titre: 'Compter les cubes, étage par étage',
        texte:
          'On empile des petits cubes de 1 cm de côté pour former un pavé de '
          + '4 cm de long, 3 cm de large et 2 cm de haut.',
        lignes: [
          { calcul: 'Une rangée', resultat: '4 cubes' },
          { calcul: 'Un étage', resultat: '4 × 3 = 12 cubes' },
        ],
        question: 'Combien d\'étages y a-t-il ? Et combien de cubes en tout ?',
        champs: [
          { id: 'a', etiquette: 'Nombre d\'étages', attendu: 2 },
          { id: 'b', etiquette: 'Total de cubes', attendu: 24 },
        ],
        conclusion:
          'Chaque petit cube occupe **1 centimètre cube**, noté 1 cm³. Le pavé en '
          + 'contient 24, donc son volume est de **24 cm³**. On l\'obtient en '
          + 'multipliant les trois dimensions : 4 × 3 × 2.',
      },

      cours: [
        {
          type: 'definition',
          titre: 'Le centimètre cube',
          texte:
            'Un **centimètre cube** (cm³) est le volume d\'un cube de 1 cm d\'arête. '
            + 'C\'est l\'unité de volume de référence à ce niveau.',
        },
        {
          type: 'propriete',
          titre: 'Le volume d\'un pavé',
          texte:
            'Volume d\'un pavé droit de dimensions L, l et h :\n'
            + '**V = L × l × h**.\n'
            + 'Pour un cube d\'arête a : **V = a × a × a**.',
        },
        {
          type: 'remarque',
          titre: 'Trois dimensions, trois puissances',
          texte:
            'Une longueur se mesure en cm, une aire en cm², un volume en cm³. Le '
            + 'petit chiffre dit le nombre de dimensions — et c\'est aussi lui qui '
            + 'donne le facteur de conversion : 10, puis 100, puis 1000.',
        },
        { type: 'exemple', texte: 'Pavé 4 × 3 × 2 : V = 24 cm³   ·   Cube de 5 cm : V = 125 cm³   ·   1 L = 1000 cm³' },
      ],

      methode: {
        titre: 'Volume d\'un pavé de 6 cm sur 4 cm sur 5 cm',
        enonce: 'Calculer le volume d\'un pavé droit de 6 cm de long, 4 cm de large et 5 cm de haut.',
        etapes: [
          { texte: 'Un étage contient 6 × 4 = 24 cubes de 1 cm³.', note: 'C\'est l\'aire de la base.' },
          { texte: 'Il y a 5 étages.', note: 'C\'est la hauteur.' },
          { texte: '24 × 5 = 120.', note: '' },
          { texte: 'Le volume est de 120 cm³.', note: '' },
        ],
        controle:
          'Le contrôle : l\'unité doit être en cm³. Si tu as multiplié seulement deux '
          + 'dimensions, tu as calculé une aire, pas un volume.',
      },

      entrainement: [
        {
          id: 'e-5-4-1', type: 'calcul', palier: 1,
          consigne: 'Volume d\'un pavé de 5 cm sur 3 cm sur 2 cm, en cm³ ?',
          enonce: '5 \\times 3 \\times 2', attendu: 30,
        },
        {
          id: 'e-5-4-2', type: 'calcul', palier: 1,
          consigne: 'Volume d\'un cube de 6 cm d\'arête, en cm³ ?',
          enonce: 'a = 6 \\text{ cm}', attendu: 216,
          fausses: [{ valeur: 36, piege: 'perimetre-aire-confondus' }],
        },
        {
          id: 'e-5-4-3', type: 'calcul', palier: 2,
          consigne: 'Volume d\'un pavé de 7 cm sur 3 cm sur 5 cm, en cm³ ?',
          enonce: '7 \\times 3 \\times 5', attendu: 105,
        },
        {
          // Neutre : ici on demande une AIRE, pas un volume. Sans cet item,
          // « multiplier les trois nombres » deviendrait un réflexe aveugle.
          id: 'e-5-4-4', type: 'calcul', palier: 2, neutre: true,
          consigne: 'Aire de la base d\'un pavé de 7 cm sur 3 cm, en cm² ?',
          enonce: '7 \\times 3', attendu: 21,
        },
        {
          id: 'e-5-4-5', type: 'calcul', palier: 2,
          consigne: 'Volume d\'un cube de 3 cm d\'arête, en cm³ ?',
          enonce: 'a = 3 \\text{ cm}', attendu: 27,
          fausses: [{ valeur: 9, piege: 'perimetre-aire-confondus' }],
        },
        {
          id: 'e-5-4-6', type: 'calcul', palier: 3,
          consigne: 'Un pavé a un volume de 60 cm³ et une base de 12 cm². Quelle est sa hauteur, en cm ?',
          enonce: 'V = 60 \\text{ cm}^3, \\; \\text{base} = 12 \\text{ cm}^2', attendu: 5,
        },
        {
          id: 'e-5-4-7', type: 'vraifaux', palier: 3,
          affirmation: 'Deux pavés de dimensions différentes peuvent avoir le même volume.',
          attendu: true,
        },
      ],

      problemes: [
        {
          id: 'p-5-4-1',
          enonce: 'Une boîte a la forme d\'un pavé droit de 20 cm sur 10 cm sur 8 cm.',
          questions: [
            { texte: 'Quel est son volume, en cm³ ?', attendu: 1600, unite: 'cm³' },
            { texte: 'Combien de cubes de 2 cm d\'arête, de volume 8 cm³, peut-on y ranger ?', attendu: 200, unite: 'cubes' },
          ],
        },
        {
          id: 'p-5-4-2',
          enonce: 'Un aquarium mesure 50 cm de long, 30 cm de large et 40 cm de haut. On rappelle que 1 L = 1000 cm³.',
          questions: [
            { texte: 'Quel est son volume, en cm³ ?', attendu: 60000, unite: 'cm³' },
            { texte: 'Combien de litres cela fait-il ?', attendu: 60, unite: 'L' },
          ],
        },
        {
          id: 'p-5-4-3',
          enonce: 'Anto empile des cubes de 1 cm³ pour former un pavé de 5 cm sur 4 cm sur 3 cm.',
          questions: [
            { texte: 'Combien de cubes utilise-t-il ?', attendu: 60, unite: 'cubes' },
            { texte: 'S\'il doublait la hauteur, combien de cubes lui faudrait-il en tout ?', attendu: 120, unite: 'cubes' },
          ],
        },
      ],

      test: [
        { id: 't-5-4-1', type: 'calcul', consigne: 'Volume d\'un pavé 3 × 2 × 4, en cm³ :', enonce: '3 \\times 2 \\times 4', attendu: 24, revoir: 'propriete' },
        { id: 't-5-4-2', type: 'calcul', consigne: 'Volume d\'un cube de 4 cm d\'arête :', enonce: 'a = 4', attendu: 64, revoir: 'propriete' },
        { id: 't-5-4-3', type: 'calcul', consigne: 'Volume d\'un cube de 2 cm d\'arête :', enonce: 'a = 2', attendu: 8, revoir: 'exemple' },
        { id: 't-5-4-4', type: 'calcul', consigne: 'Volume d\'un pavé 10 × 5 × 2, en cm³ :', enonce: '10 \\times 5 \\times 2', attendu: 100, revoir: 'propriete' },
        { id: 't-5-4-5', type: 'calcul', consigne: 'Volume d\'un cube de 10 cm d\'arête :', enonce: 'a = 10', attendu: 1000, revoir: 'exemple' },
        { id: 't-5-4-6', type: 'calcul', consigne: 'Un pavé de base 20 cm² et de hauteur 3 cm : volume en cm³ ?', enonce: '20 \\times 3', attendu: 60, revoir: 'propriete' },
        { id: 't-5-4-7', type: 'calcul', consigne: 'Volume d\'un pavé 7 × 2 × 3, en cm³ :', enonce: '7 \\times 2 \\times 3', attendu: 42, revoir: 'propriete' },
        { id: 't-5-4-8', type: 'calcul', consigne: 'Combien de cm³ dans 2 litres ?', enonce: '2 \\text{ L}', attendu: 2000, revoir: 'exemple' },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-5-5',
      titre: 'Horaires et durées',
      attendus: [
        'Il calcule une durée entre deux horaires.',
        'Il convertit entre le système décimal et le système sexagésimal.',
      ],

      decouvrir: {
        titre: 'Une heure et demie n\'est pas 1,30',
        texte:
          'Un trajet dure 1,5 heure. Un élève écrit « 1 h 50 ». Un autre écrit '
          + '« 1 h 5 ». Aucun des deux n\'a raison.',
        lignes: [
          { calcul: '0,5 heure', resultat: 'la moitié d\'une heure' },
          { calcul: 'Une heure', resultat: '60 minutes' },
        ],
        question: 'Combien font la moitié de 60 minutes ? Et donc, combien de minutes vaut 1,5 heure en tout ?',
        champs: [
          { id: 'a', etiquette: 'Moitié de 60 min', attendu: 30 },
          { id: 'b', etiquette: '1,5 h en minutes', attendu: 90 },
        ],
        conclusion:
          '**1,5 h = 1 h 30 min**, soit 90 minutes. Le temps ne compte pas par dix : '
          + 'une heure vaut **60** minutes. Pour convertir la partie décimale, on la '
          + 'multiplie par 60.',
      },

      cours: [
        {
          type: 'definition',
          titre: 'Le système sexagésimal',
          texte:
            '1 heure = **60** minutes.\n'
            + '1 minute = **60** secondes.\n'
            + 'Contrairement aux longueurs ou aux masses, le temps ne se compte pas '
            + 'par dix.',
        },
        {
          type: 'propriete',
          titre: 'D\'une heure décimale vers des minutes',
          texte:
            'On multiplie la partie décimale par 60.\n'
            + '2,25 h : 0,25 × 60 = 15, donc **2 h 15 min**.',
        },
        {
          type: 'propriete',
          titre: 'Calculer une durée entre deux horaires',
          texte:
            'On avance jusqu\'à l\'heure ronde, puis jusqu\'à l\'horaire d\'arrivée.\n'
            + 'De 8 h 40 à 11 h 15 : 20 min pour atteindre 9 h, puis 2 h pour '
            + 'atteindre 11 h, puis 15 min. Total : **2 h 35 min**.',
        },
        {
          type: 'remarque',
          titre: 'La retenue de soixante',
          texte:
            'Quand une addition de minutes dépasse 59, on retire 60 et on ajoute une '
            + 'heure. 45 min + 30 min = 75 min = 1 h 15 min.',
        },
        { type: 'exemple', texte: '1,5 h = 1 h 30   ·   2,25 h = 2 h 15   ·   de 8 h 40 à 11 h 15 : 2 h 35' },
      ],

      methode: {
        titre: 'Calculer la durée de 8 h 40 à 11 h 15',
        enonce: 'Un train part à 8 h 40 et arrive à 11 h 15. Quelle est la durée du trajet ?',
        etapes: [
          { texte: 'De 8 h 40 à 9 h 00 : 20 minutes.', note: 'On rejoint d\'abord l\'heure ronde.' },
          { texte: 'De 9 h 00 à 11 h 00 : 2 heures.', note: '' },
          { texte: 'De 11 h 00 à 11 h 15 : 15 minutes.', note: '' },
          { texte: 'Total : 2 h + 20 min + 15 min = 2 h 35 min.', note: '' },
        ],
        controle:
          'Le contrôle : additionne la durée trouvée à l\'heure de départ, tu dois '
          + 'retomber sur l\'heure d\'arrivée. 8 h 40 + 2 h 35 = 11 h 15.',
      },

      entrainement: [
        {
          id: 'e-5-5-1', type: 'calcul', palier: 1,
          consigne: 'Convertis en minutes.', enonce: '3{,}5 \\text{ h}', attendu: 210,
          fausses: [{ valeur: 230, piege: 'duree-decimale' }, { valeur: 350, piege: 'duree-decimale' }],
        },
        {
          id: 'e-5-5-2', type: 'calcul', palier: 1,
          consigne: 'Convertis en minutes.', enonce: '2 \\text{ h } 15 \\text{ min}', attendu: 135,
        },
        {
          id: 'e-5-5-3', type: 'calcul', palier: 2,
          consigne: 'Convertis en minutes.', enonce: '3{,}25 \\text{ h}', attendu: 195,
          fausses: [{ valeur: 205, piege: 'duree-decimale' }],
        },
        {
          // Neutre : une durée déjà entière, sans partie décimale à convertir.
          id: 'e-5-5-4', type: 'calcul', palier: 2, neutre: true,
          consigne: 'Convertis en minutes.', enonce: '3 \\text{ h}', attendu: 180,
        },
        {
          id: 'e-5-5-5', type: 'calcul', palier: 2,
          consigne: 'Un train part à 7 h 50 et arrive à 10 h 20. Combien de minutes dure le trajet ?',
          enonce: '7\\text{h}50 \\rightarrow 10\\text{h}20', attendu: 150,
        },
        {
          id: 'e-5-5-6', type: 'calcul', palier: 3,
          consigne: 'Additionne et donne le résultat en minutes.',
          enonce: '50 \\text{ min} + 40 \\text{ min}', attendu: 90,
        },
        {
          id: 'e-5-5-7', type: 'vraifaux', palier: 3,
          affirmation: 'Une durée de 1,75 heure vaut 1 heure et 75 minutes.',
          attendu: false,
          contreExemple: {
            invite: 'Convertis correctement. Combien de minutes vaut 0,75 heure, et combien de minutes vaut 1,75 heure en tout ?',
            champs: [{ id: 'a', etiquette: '0,75 h en minutes' }, { id: 'b', etiquette: '1,75 h en minutes' }],
            valide: (a, b) => a === 45 && b === 105,
            exemple: '45 et 105 : 0,75 × 60 = 45 min, donc 1,75 h vaut 1 h 45 min, soit 105 minutes.',
          },
        },
      ],

      problemes: [
        {
          id: 'p-5-5-1',
          enonce: 'Un film commence à 20 h 35 et dure 1 h 50.',
          questions: [
            { texte: 'Combien de minutes dure le film ?', attendu: 110, unite: 'min' },
            { texte: 'À quelle heure se termine-t-il ? Donne les minutes après 22 h.', attendu: 25, unite: 'min' },
          ],
        },
        {
          id: 'p-5-5-2',
          enonce: 'Anto travaille 2,5 heures le matin et 1,75 heure l\'après-midi.',
          questions: [
            { texte: 'Combien de minutes travaille-t-il le matin ?', attendu: 150, unite: 'min' },
            { texte: 'Combien de minutes en tout dans la journée ?', attendu: 255, unite: 'min' },
          ],
        },
        {
          id: 'p-5-5-3',
          enonce: 'Un car part à 7 h 25 et arrive à 9 h 10.',
          questions: [
            { texte: 'Combien de minutes dure le trajet ?', attendu: 105, unite: 'min' },
            { texte: 'Combien cela fait-il d\'heures, en écriture décimale ?', attendu: 1.75, unite: 'h' },
          ],
        },
      ],

      test: [
        { id: 't-5-5-1', type: 'calcul', consigne: 'En minutes :', enonce: '1{,}5 \\text{ h}', attendu: 90, revoir: 'propriete' },
        { id: 't-5-5-2', type: 'calcul', consigne: 'En minutes :', enonce: '0{,}5 \\text{ h}', attendu: 30, revoir: 'propriete' },
        { id: 't-5-5-3', type: 'calcul', consigne: 'En minutes :', enonce: '2{,}5 \\text{ h}', attendu: 150, revoir: 'exemple' },
        { id: 't-5-5-4', type: 'calcul', consigne: 'En minutes :', enonce: '1 \\text{ h } 20 \\text{ min}', attendu: 80, revoir: 'definition' },
        { id: 't-5-5-5', type: 'calcul', consigne: 'De 9 h 15 à 11 h 00 : durée en minutes ?', enonce: '9\\text{h}15 \\rightarrow 11\\text{h}00', attendu: 105, revoir: 'propriete' },
        { id: 't-5-5-6', type: 'calcul', consigne: 'En minutes :', enonce: '0{,}25 \\text{ h}', attendu: 15, revoir: 'propriete' },
        { id: 't-5-5-7', type: 'calcul', consigne: 'Combien de secondes dans 3 minutes ?', enonce: '3 \\text{ min}', attendu: 180, revoir: 'definition' },
        { id: 't-5-5-8', type: 'calcul', consigne: 'De 14 h 50 à 16 h 20 : durée en minutes ?', enonce: '14\\text{h}50 \\rightarrow 16\\text{h}20', attendu: 90, revoir: 'propriete' },
      ],
    },
  ],
};
