// Chapitre 2 — Les fractions.
//
// Le prérequis direct de la 5e : c'est sur les fractions que l'année suivante
// s'ouvre, et un élève qui arrive sans elles y perd pied tout de suite.
//
// ── Ce que le programme 2025 met sous ce mot ──────────────────────────────
//
// Trois sens se superposent, et le troisième est la nouveauté de la 6e :
//
//   partie d'un tout   depuis le CE1 : couper en parts égales, en prendre
//                      quelques-unes. Intuitif, mais il coince dès que la
//                      fraction dépasse 1.
//   mesure             depuis le CM1 : 1/4 devient une UNITÉ, et 7/4 vaut sept
//                      de ces unités — ce qui débloque justement les fractions
//                      supérieures à 1.
//   quotient           NOUVEAU en 6e : 3/4 n'est pas seulement trois quarts
//                      d'une unité, c'est aussi LE QUART DE 3. Le programme
//                      insiste : ce sens « fait explicitement le lien avec la
//                      division », et les égalités à trous qu'il permet
//                      « préfigurent l'équation a × x = b ».
//
// S'y ajoute le sens d'OPÉRATEUR — prendre une fraction d'un nombre — dont le
// programme précise qu'en 6e « la fraction opère également sur un nombre,
// notamment quand elle est exprimée sous forme de pourcentage ».
//
// ── L'obstacle, et il est de la même famille qu'au chapitre 1 ─────────────
//
// Une fraction se lit comme DEUX entiers, exactement comme un décimal.
// « 1/3 > 1/2 parce que 3 > 2 » est le pendant de « 2,54 > 2,7 parce que
// 54 > 7 ». C'est pour ça que les décimaux passent en premier : le geste de
// contrôle est le même, on le réutilise ici.
//
// Les items `neutre: true` sont ceux où le piège ne joue pas — une comparaison
// où le plus grand dénominateur donne bien la plus grande fraction, parce que
// les numérateurs diffèrent. Sans eux, l'élève apprend « le plus grand
// dénominateur perd » au lieu de la règle.

export default {
  numero: 2,
  titre: 'Les fractions',
  theme: 'Nombres, calcul et résolution de problèmes',
  trimestre: 1,
  programme: '2025',
  prerequis: [
    'Partager en parts égales (CM)',
    'La fraction unitaire comme unité de mesure (CM1)',
    'Les nombres décimaux et leurs rangs (chapitre 1)',
  ],

  savoirFaire: [
    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-2-1',
      titre: 'Lire, écrire et placer une fraction',
      attendus: [
        'Il nomme la fraction représentée par un partage en parts égales.',
        'Il place une fraction sur une demi-droite graduée, y compris au-delà de 1.',
      ],

      decouvrir: {
        titre: 'Sept quarts, avec seulement quatre quarts par bande',
        texte:
          'Une bande de papier est partagée en 4 parts égales. Chaque part vaut '
          + 'donc un quart de bande.',
        lignes: [
          { calcul: '3 parts prises', resultat: '3/4 de bande' },
          { calcul: '4 parts prises', resultat: '1 bande entière' },
          { calcul: '5 parts prises', resultat: '?' },
        ],
        question: 'Pour prendre 7 quarts, combien de bandes entières faut-il au minimum ? Et combien de quarts reste-t-il en plus d\'une bande entière ?',
        champs: [
          { id: 'a', etiquette: 'Nombre de bandes nécessaires', attendu: 2 },
          { id: 'b', etiquette: 'Quarts en plus d\'une bande entière', attendu: 3 },
        ],
        conclusion:
          'Une fraction **peut dépasser 1**. Le quart est devenu une unité de mesure : '
          + 'on en compte sept, comme on compterait sept centimètres. 7/4, c\'est '
          + '**une bande entière et trois quarts**.',
      },

      cours: [
        {
          type: 'definition',
          titre: 'Numérateur et dénominateur',
          texte:
            'Dans une fraction, le nombre du **bas** — le dénominateur — dit en '
            + 'combien de parts égales on a partagé.\n'
            + 'Le nombre du **haut** — le numérateur — dit combien de ces parts on prend.',
        },
        {
          type: 'remarque',
          titre: 'Parts ÉGALES, sinon rien',
          texte:
            'Le partage doit être en parts **égales**. Une figure coupée en quatre '
            + 'morceaux de tailles différentes ne montre pas des quarts : elle ne '
            + 'montre aucune fraction.',
        },
        {
          type: 'propriete',
          titre: 'Comparer la fraction à 1',
          texte:
            'Si le numérateur est **plus petit** que le dénominateur, la fraction '
            + 'est plus petite que 1.\n'
            + 'S\'ils sont **égaux**, elle vaut 1.\n'
            + 'S\'il est **plus grand**, elle dépasse 1.',
        },
        { type: 'exemple', texte: '3/4 < 1   ·   4/4 = 1   ·   7/4 > 1, et vaut une unité plus 3/4' },
      ],

      methode: {
        titre: 'Placer 7/4 sur une demi-droite',
        enonce: 'Placer 7/4 sur une demi-droite graduée de 0 à 3.',
        etapes: [
          { texte: 'Le dénominateur est 4 : je partage chaque unité en 4 parts égales.', note: 'Chaque graduation vaut 1/4.' },
          { texte: 'Le numérateur est 7 : je compte 7 graduations à partir de 0.', note: '' },
          { texte: '4 graduations font 1, donc les 3 suivantes dépassent 1.', note: '' },
          { texte: '7/4 se place entre 1 et 2, aux trois quarts.', note: 'C\'est 1,75.' },
        ],
        controle:
          'Le contrôle : 7 est plus grand que 4, donc le point doit tomber APRÈS 1. '
          + 'S\'il tombe avant, c\'est que tu as compté à l\'envers.',
      },

      entrainement: [
        {
          id: 'e-2-1-1', type: 'calcul', palier: 1,
          consigne: 'Une bande est partagée en 5 parts égales et on en prend 3. Combien vaut le dénominateur de la fraction obtenue ?',
          enonce: '\\dfrac{\\square}{\\square}', attendu: 5,
        },
        {
          id: 'e-2-1-2', type: 'vraifaux', palier: 1,
          consigne: 'Vrai ou faux ?', enonce: '\\dfrac{4}{4} = 1', attendu: true,
        },
        {
          id: 'e-2-1-3', type: 'vraifaux', palier: 1,
          consigne: 'Vrai ou faux ?', enonce: '\\dfrac{7}{4} > 1', attendu: true,
          fausses: [{ valeur: false, piege: 'fraction-toujours-inferieure-a-un' }],
        },
        {
          // Neutre : ici la fraction est bien inférieure à 1, le piège ne joue pas.
          // Formulée au VRAI à dessein — une affirmation fausse demanderait un
          // contre-exemple, et il n'y a rien à réfuter dans un cas si simple.
          id: 'e-2-1-4', type: 'vraifaux', palier: 1, neutre: true,
          consigne: 'Vrai ou faux ?', enonce: '\\dfrac{3}{8} < 1', attendu: true,
        },
        {
          // Réfuter, pas cocher : répondre « faux » ne suffit pas, il faut
          // PRODUIRE une fraction qui dépasse 1. La validation vérifie la
          // propriété, pas une réponse mémorisée — 7/4, 3/2, 10/9 sont tous
          // acceptés.
          id: 'e-2-1-7', type: 'vraifaux', palier: 3,
          affirmation: 'Une fraction est toujours plus petite que 1.',
          attendu: false,
          contreExemple: {
            invite: 'Donne une fraction qui vaut plus que 1 : son numérateur, puis son dénominateur.',
            champs: [{ id: 'a', etiquette: 'numérateur' }, { id: 'b', etiquette: 'dénominateur' }],
            valide: (a, b) => b > 0 && a > b,
            exemple: '7 et 4 : sept quarts valent 1,75, donc plus que 1.',
          },
        },
        {
          id: 'e-2-1-5', type: 'calcul', palier: 2,
          consigne: 'Combien d\'unités entières y a-t-il dans cette fraction ?',
          enonce: '\\dfrac{9}{4}', attendu: 2,
          fausses: [{ valeur: 0, piege: 'fraction-toujours-inferieure-a-un' }],
        },
        {
          id: 'e-2-1-6', type: 'calcul', palier: 3,
          consigne: 'Cette fraction vaut combien de quarts en tout ?',
          enonce: '2 + \\dfrac{3}{4}', attendu: 11,
          fausses: [{ valeur: 5, piege: 'fraction-lue-comme-deux-entiers' }],
        },
      ],

      problemes: [
        {
          id: 'p-2-1-1',
          enonce:
            'Une tablette de chocolat est partagée en 8 carrés égaux. Anto en '
            + 'mange 3, sa sœur en mange 2.',
          questions: [
            { texte: 'Combien de carrés ont-ils mangés à eux deux ?', attendu: 5 },
            { texte: 'Combien de carrés reste-t-il ?', attendu: 3 },
          ],
        },
        {
          id: 'p-2-1-2',
          enonce:
            'Des bandes de papier sont toutes partagées en 5 parts égales. On '
            + 'veut prendre 12 cinquièmes.',
          questions: [
            { texte: 'Combien de bandes entières cela représente-t-il ?', attendu: 2 },
            { texte: 'Combien de cinquièmes reste-t-il en plus des bandes entières ?', attendu: 2 },
          ],
        },
        {
          id: 'p-2-1-3',
          enonce:
            'Sur une demi-droite graduée, chaque unité est partagée en 3 parts égales.',
          questions: [
            { texte: 'Combien de graduations faut-il compter depuis 0 pour atteindre 2 ?', attendu: 6 },
            { texte: 'Le point placé à 8 graduations correspond à combien de tiers ?', attendu: 8 },
          ],
        },
      ],

      test: [
        { id: 't-2-1-1', type: 'vraifaux', enonce: '\\dfrac{5}{5} = 1', attendu: true, revoir: 'propriete' },
        { id: 't-2-1-2', type: 'vraifaux', enonce: '\\dfrac{9}{7} > 1', attendu: true, revoir: 'propriete' },
        { id: 't-2-1-3', type: 'vraifaux', enonce: '\\dfrac{2}{9} > 1', attendu: false, revoir: 'propriete' },
        { id: 't-2-1-4', type: 'calcul', consigne: 'Combien d\'unités entières dans cette fraction ?', enonce: '\\dfrac{13}{5}', attendu: 2, revoir: 'propriete' },
        { id: 't-2-1-5', type: 'calcul', consigne: 'Combien de tiers en tout ?', enonce: '3 + \\dfrac{1}{3}', attendu: 10, revoir: 'exemple' },
        { id: 't-2-1-6', type: 'vraifaux', enonce: '\\dfrac{6}{6} > 1', attendu: false, revoir: 'propriete' },
        { id: 't-2-1-7', type: 'calcul', consigne: 'Combien de demis dans 4 unités ?', enonce: '4', attendu: 8, revoir: 'definition' },
        { id: 't-2-1-8', type: 'calcul', consigne: 'Combien d\'unités entières dans cette fraction ?', enonce: '\\dfrac{8}{4}', attendu: 2, revoir: 'propriete' },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-2-2',
      titre: 'La fraction comme quotient',
      attendus: [
        'Il comprend que a/b est le quotient de a par b.',
        'Il complète une égalité à trous du type a × ? = b.',
      ],

      decouvrir: {
        titre: 'Trois gâteaux pour quatre enfants',
        texte:
          'Trois gâteaux identiques doivent être partagés équitablement entre '
          + 'quatre enfants. On coupe chaque gâteau en quatre parts égales.',
        lignes: [
          { calcul: 'Parts obtenues', resultat: '3 × 4 = 12 quarts' },
          { calcul: 'Parts par enfant', resultat: '12 ÷ 4 = 3 quarts' },
        ],
        question: 'Chaque enfant reçoit donc 3 quarts de gâteau. Écris cette part sous forme de fraction : donne le numérateur, puis le dénominateur.',
        champs: [
          { id: 'a', etiquette: 'Numérateur', attendu: 3 },
          { id: 'b', etiquette: 'Dénominateur', attendu: 4 },
        ],
        conclusion:
          'On vient de partager **3 en 4 parts** et d\'obtenir **3/4**. C\'est le sens '
          + 'nouveau de la 6e : une fraction est un **quotient**. La barre de fraction '
          + 'se lit « divisé par » : 3/4 = 3 ÷ 4 = 0,75.',
      },

      cours: [
        {
          type: 'definition',
          titre: 'La fraction est un quotient',
          texte:
            'Pour deux nombres a et b, avec b non nul, la fraction a/b est le '
            + '**quotient de a par b** : c\'est le nombre qui, multiplié par b, '
            + 'donne a.',
        },
        {
          type: 'remarque',
          titre: 'La barre se lit « divisé par »',
          texte:
            'De haut en bas : 3/4 se lit « 3 divisé par 4 ». Le nombre du HAUT est '
            + 'celui qu\'on partage. Le résultat est donc **plus petit** que 3.',
        },
        {
          type: 'propriete',
          titre: 'Les égalités à trous',
          texte:
            'Chercher le nombre manquant dans **4 × ? = 3** revient à calculer 3 ÷ 4, '
            + 'c\'est-à-dire 3/4. C\'est la première rencontre avec ce qui deviendra '
            + 'une équation.',
        },
        { type: 'exemple', texte: '3 ÷ 4 = 3/4 = 0,75   ·   5 ÷ 2 = 5/2 = 2,5   ·   1 ÷ 8 = 1/8 = 0,125' },
      ],

      methode: {
        titre: 'Compléter 5 × ? = 3',
        enonce: 'Trouver le nombre manquant dans 5 × ? = 3.',
        etapes: [
          { texte: 'Je cherche ce qui, multiplié par 5, donne 3.', note: 'Ce n\'est pas un entier : 5 × 1 = 5, c\'est déjà trop.' },
          { texte: 'Par définition du quotient, ce nombre est 3 ÷ 5.', note: '' },
          { texte: 'Donc le nombre manquant est 3/5.', note: 'Soit 0,6.' },
          { texte: 'Vérification : 5 × 0,6 = 3.', note: '' },
        ],
        controle:
          'Le contrôle : remultiplie ta réponse par le nombre de départ. Si tu '
          + 'retombes sur le second nombre, c\'est juste.',
      },

      entrainement: [
        {
          id: 'e-2-2-1', type: 'calcul', palier: 1,
          consigne: 'Donne la valeur décimale de cette fraction.',
          enonce: '\\dfrac{3}{4}', attendu: 0.75,
          fausses: [{ valeur: 1.333, piege: 'quotient-inverse' }],
        },
        {
          id: 'e-2-2-2', type: 'calcul', palier: 1,
          consigne: 'Donne la valeur décimale de cette fraction.',
          enonce: '\\dfrac{1}{4}', attendu: 0.25,
          fausses: [{ valeur: 4, piege: 'quotient-inverse' }],
        },
        {
          // Neutre : ici le quotient dépasse 1, donc « diviser le grand par le
          // petit » donne la BONNE réponse. Sans cet item, l'élève croirait que
          // le résultat est toujours inférieur à 1.
          id: 'e-2-2-3', type: 'calcul', palier: 2, neutre: true,
          consigne: 'Donne la valeur décimale de cette fraction.',
          enonce: '\\dfrac{5}{2}', attendu: 2.5,
        },
        {
          id: 'e-2-2-4', type: 'calcul', palier: 2,
          consigne: 'Donne la valeur décimale de cette fraction.',
          enonce: '\\dfrac{2}{5}', attendu: 0.4,
          fausses: [{ valeur: 2.5, piege: 'quotient-inverse' }],
        },
        {
          id: 'e-2-2-5', type: 'trous', palier: 2,
          consigne: 'Complète.', enonce: '4 \\times \\square = 3',
          champs: [{ id: 'a', attendu: 0.75 }],
          fausses: [{ valeur: 1.333, piege: 'quotient-inverse' }],
        },
        {
          id: 'e-2-2-6', type: 'trous', palier: 3,
          consigne: 'Complète.', enonce: '8 \\times \\square = 5',
          champs: [{ id: 'a', attendu: 0.625 }],
        },
      ],

      problemes: [
        {
          id: 'p-2-2-1',
          enonce: 'Trois pizzas identiques sont partagées équitablement entre 4 amis.',
          questions: [
            { texte: 'Quelle part de pizza reçoit chacun ? Donne la valeur décimale.', attendu: 0.75, unite: 'pizza' },
            { texte: 'Et si les mêmes 3 pizzas étaient partagées entre 6 amis ?', attendu: 0.5, unite: 'pizza' },
          ],
        },
        {
          id: 'p-2-2-2',
          enonce:
            'Un ruban de 5 mètres est coupé en 4 morceaux de même longueur.',
          questions: [
            { texte: 'Quelle est la longueur d\'un morceau, en mètres ?', attendu: 1.25, unite: 'm' },
            { texte: 'Et si on le coupait en 10 morceaux égaux ?', attendu: 0.5, unite: 'm' },
          ],
        },
        {
          id: 'p-2-2-3',
          enonce:
            'Une bouteille de 2 litres remplit exactement 8 verres identiques.',
          questions: [
            { texte: 'Quelle est la contenance d\'un verre, en litres ?', attendu: 0.25, unite: 'L' },
            { texte: 'Combien de verres remplit-on avec 5 litres ?', attendu: 20, unite: 'verres' },
          ],
        },
      ],

      test: [
        { id: 't-2-2-1', type: 'calcul', consigne: 'Valeur décimale ?', enonce: '\\dfrac{1}{2}', attendu: 0.5, revoir: 'definition' },
        { id: 't-2-2-2', type: 'calcul', consigne: 'Valeur décimale ?', enonce: '\\dfrac{3}{4}', attendu: 0.75, revoir: 'exemple' },
        { id: 't-2-2-3', type: 'calcul', consigne: 'Valeur décimale ?', enonce: '\\dfrac{1}{5}', attendu: 0.2, revoir: 'definition' },
        { id: 't-2-2-4', type: 'calcul', consigne: 'Valeur décimale ?', enonce: '\\dfrac{7}{2}', attendu: 3.5, revoir: 'exemple' },
        { id: 't-2-2-5', type: 'trous', enonce: '5 \\times \\square = 2', champs: [{ id: 'a', attendu: 0.4 }], revoir: 'propriete' },
        { id: 't-2-2-6', type: 'trous', enonce: '4 \\times \\square = 1', champs: [{ id: 'a', attendu: 0.25 }], revoir: 'propriete' },
        { id: 't-2-2-7', type: 'calcul', consigne: 'Valeur décimale ?', enonce: '\\dfrac{9}{4}', attendu: 2.25, revoir: 'exemple' },
        { id: 't-2-2-8', type: 'trous', enonce: '10 \\times \\square = 3', champs: [{ id: 'a', attendu: 0.3 }], revoir: 'propriete' },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-2-3',
      titre: 'Fractions égales et comparaison',
      attendus: [
        'Il reconnaît deux fractions égales et simplifie une fraction.',
        'Il compare deux fractions de même dénominateur, puis de même numérateur.',
      ],

      decouvrir: {
        titre: 'La pizza coupée deux fois',
        texte:
          'Une pizza est coupée en 4 parts égales ; on en prend 2. Une autre, '
          + 'identique, est coupée en 8 parts égales ; on en prend 4.',
        lignes: [
          { calcul: 'Première pizza', resultat: '2/4 pris' },
          { calcul: 'Seconde pizza', resultat: '4/8 pris' },
        ],
        question: 'Dans les deux cas, quelle part de la pizza a-t-on prise ? Donne le numérateur puis le dénominateur de la fraction la plus simple.',
        champs: [
          { id: 'a', etiquette: 'Numérateur', attendu: 1 },
          { id: 'b', etiquette: 'Dénominateur', attendu: 2 },
        ],
        conclusion:
          'Les deux valent **la moitié**. Multiplier ou diviser le haut ET le bas '
          + 'par le même nombre ne change pas la fraction : 1/2 = 2/4 = 4/8.',
      },

      cours: [
        {
          type: 'propriete',
          titre: 'Fractions égales',
          texte:
            'On ne change pas une fraction en multipliant — ou en divisant — son '
            + 'numérateur **et** son dénominateur par un même nombre non nul.',
        },
        {
          type: 'propriete',
          titre: 'Comparer, à dénominateur égal',
          texte:
            'Quand les dénominateurs sont les mêmes, les parts ont la même taille : '
            + 'la plus grande fraction est celle qui en prend le plus. '
            + '3/7 < 5/7.',
        },
        {
          type: 'propriete',
          titre: 'Comparer, à numérateur égal',
          texte:
            'Quand les numérateurs sont les mêmes, on prend le même nombre de parts. '
            + 'La plus grande fraction est alors celle dont les parts sont les plus '
            + 'grosses, donc celle dont le **dénominateur est le plus petit** : '
            + '1/3 > 1/4.',
        },
        {
          type: 'remarque',
          titre: 'Le piège du dénominateur',
          texte:
            'C\'est ici que presque tout le monde se trompe : un plus grand '
            + 'dénominateur donne une **plus petite** part. En coupant en 8 plutôt '
            + 'qu\'en 4, chaque morceau rétrécit.',
        },
        { type: 'exemple', texte: '2/4 = 1/2   ·   3/7 < 5/7   ·   1/3 > 1/4   ·   6/9 = 2/3' },
      ],

      methode: {
        titre: 'Comparer 1/3 et 1/4',
        enonce: 'Quelle est la plus grande : 1/3 ou 1/4 ?',
        etapes: [
          { texte: 'Les numérateurs sont égaux : on prend une part dans les deux cas.', note: 'Reste à savoir laquelle est la plus grosse.' },
          { texte: 'À gauche on a coupé en 3, à droite en 4.', note: 'Plus on coupe, plus les parts sont petites.' },
          { texte: 'Un tiers est donc plus gros qu\'un quart.', note: '' },
          { texte: 'Donc 1/3 > 1/4.', note: '1/3 ≈ 0,33 et 1/4 = 0,25.' },
        ],
        controle:
          'Le contrôle : imagine la pizza. Préfères-tu un tiers ou un quart de la '
          + 'même pizza ? La réponse est évidente, et c\'est la bonne.',
      },

      entrainement: [
        {
          id: 'e-2-3-1', type: 'comparer', palier: 1,
          consigne: 'Compare ces deux fractions.',
          enonce: '\\dfrac{1}{3} \\ldots \\dfrac{1}{4}', attendu: '>',
          fausses: [{ valeur: '<', piege: 'fraction-lue-comme-deux-entiers' }],
        },
        {
          id: 'e-2-3-2', type: 'comparer', palier: 1,
          consigne: 'Compare ces deux fractions.',
          enonce: '\\dfrac{1}{2} \\ldots \\dfrac{1}{5}', attendu: '>',
          fausses: [{ valeur: '<', piege: 'fraction-lue-comme-deux-entiers' }],
        },
        {
          // Neutre : dénominateurs égaux, le piège du dénominateur ne joue pas.
          id: 'e-2-3-3', type: 'comparer', palier: 1, neutre: true,
          consigne: 'Compare ces deux fractions.',
          enonce: '\\dfrac{3}{7} \\ldots \\dfrac{5}{7}', attendu: '<',
        },
        {
          // Neutre : ici le plus grand dénominateur donne bien la plus grande
          // fraction. Sans cet item, « le plus grand dénominateur perd » deviendrait
          // la règle apprise — et elle serait fausse.
          id: 'e-2-3-4', type: 'comparer', palier: 2, neutre: true,
          consigne: 'Compare ces deux fractions.',
          enonce: '\\dfrac{1}{2} \\ldots \\dfrac{5}{8}', attendu: '<',
        },
        {
          id: 'e-2-3-5', type: 'fraction', palier: 2,
          consigne: 'Simplifie cette fraction autant que possible.',
          enonce: '\\dfrac{6}{9}', attendu: [2, 3],
        },
        {
          id: 'e-2-3-6', type: 'fraction', palier: 2,
          consigne: 'Simplifie cette fraction autant que possible.',
          enonce: '\\dfrac{4}{8}', attendu: [1, 2],
        },
        {
          id: 'e-2-3-7', type: 'comparer', palier: 3,
          consigne: 'Compare ces deux fractions.',
          enonce: '\\dfrac{2}{3} \\ldots \\dfrac{2}{5}', attendu: '>',
          fausses: [{ valeur: '<', piege: 'fraction-lue-comme-deux-entiers' }],
        },
      ],

      problemes: [
        {
          id: 'p-2-3-1',
          enonce:
            'Deux tablettes de chocolat identiques. Anto coupe la sienne en 6 carrés '
            + 'égaux et en mange 2. Sa sœur coupe la sienne en 3 carrés égaux et en '
            + 'mange 1.',
          questions: [
            { texte: 'Quelle fraction de tablette Anto a-t-il mangée ? Donne le dénominateur de la fraction simplifiée.', attendu: 3 },
            { texte: 'Ont-ils mangé la même quantité ? Réponds 1 pour oui, 0 pour non.', attendu: 1 },
          ],
        },
        {
          id: 'p-2-3-2',
          enonce:
            'Trois amis se partagent des parts de gâteau : Léa prend 1/4 du gâteau, '
            + 'Théo 1/3, Sami 1/6.',
          questions: [
            { texte: 'Qui a la plus grosse part ? Réponds 4, 3 ou 6 selon son dénominateur.', attendu: 3 },
            { texte: 'Qui a la plus petite ? Réponds par son dénominateur.', attendu: 6 },
          ],
        },
        {
          id: 'p-2-3-3',
          enonce:
            'Une recette demande 3/4 de litre de lait. Anto n\'a qu\'un verre '
            + 'doseur gradué en huitièmes de litre.',
          questions: [
            { texte: 'Combien de huitièmes de litre doit-il verser ?', attendu: 6 },
            { texte: 'S\'il en versait 8, combien de litres aurait-il ?', attendu: 1, unite: 'L' },
          ],
        },
      ],

      test: [
        { id: 't-2-3-1', type: 'comparer', consigne: 'Compare.', enonce: '\\dfrac{1}{4} \\ldots \\dfrac{1}{6}', attendu: '>', revoir: 'propriete' },
        { id: 't-2-3-2', type: 'comparer', consigne: 'Compare.', enonce: '\\dfrac{2}{9} \\ldots \\dfrac{5}{9}', attendu: '<', revoir: 'propriete' },
        { id: 't-2-3-3', type: 'comparer', consigne: 'Compare.', enonce: '\\dfrac{3}{5} \\ldots \\dfrac{3}{8}', attendu: '>', revoir: 'propriete' },
        { id: 't-2-3-4', type: 'fraction', consigne: 'Simplifie.', enonce: '\\dfrac{10}{15}', attendu: [2, 3], revoir: 'propriete' },
        { id: 't-2-3-5', type: 'fraction', consigne: 'Simplifie.', enonce: '\\dfrac{9}{12}', attendu: [3, 4], revoir: 'propriete' },
        { id: 't-2-3-6', type: 'comparer', consigne: 'Compare.', enonce: '\\dfrac{1}{2} \\ldots \\dfrac{3}{4}', attendu: '<', revoir: 'exemple' },
        { id: 't-2-3-7', type: 'fraction', consigne: 'Simplifie.', enonce: '\\dfrac{8}{12}', attendu: [2, 3], revoir: 'propriete' },
        { id: 't-2-3-8', type: 'comparer', consigne: 'Compare.', enonce: '\\dfrac{5}{6} \\ldots \\dfrac{5}{9}', attendu: '>', revoir: 'propriete' },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-2-4',
      titre: 'Prendre une fraction d\'une quantité',
      attendus: [
        'Il calcule la fraction d\'un nombre.',
        'Il multiplie une fraction par un entier.',
      ],

      decouvrir: {
        titre: 'Les trois quarts de 20',
        texte:
          'Une classe de 20 élèves. Les trois quarts d\'entre eux mangent à la '
          + 'cantine. Pour trouver combien cela fait, on procède en deux temps.',
        lignes: [
          { calcul: 'Un quart de 20', resultat: '20 ÷ 4 = 5' },
          { calcul: 'Trois quarts', resultat: '3 × 5 = ?' },
        ],
        question: 'Combien d\'élèves mangent à la cantine ? Et combien n\'y mangent pas ?',
        champs: [
          { id: 'a', etiquette: 'À la cantine', attendu: 15 },
          { id: 'b', etiquette: 'Pas à la cantine', attendu: 5 },
        ],
        conclusion:
          'Prendre les 3/4 de 20, c\'est **diviser par 4, puis multiplier par 3**. '
          + 'On peut aussi faire 3 × 20 = 60, puis 60 ÷ 4 = 15 : les deux ordres '
          + 'donnent le même résultat.',
      },

      cours: [
        {
          type: 'propriete',
          titre: 'La fraction d\'un nombre',
          texte:
            'Prendre a/b d\'un nombre, c\'est le **diviser par b** puis le '
            + '**multiplier par a**. L\'ordre des deux opérations est libre.',
        },
        {
          type: 'propriete',
          titre: 'Un pourcentage est une fraction',
          texte:
            'Un pourcentage est une fraction de dénominateur 100 : '
            + '**25 % = 25/100 = 1/4**, **50 % = 1/2**, **10 % = 1/10**.\n'
            + 'Prendre 25 % d\'un nombre, c\'est donc en prendre le quart.',
        },
        {
          type: 'remarque',
          titre: 'Le contrôle de bon sens',
          texte:
            'Tant que la fraction est plus petite que 1 — ou le pourcentage plus '
            + 'petit que 100 % — le résultat est plus **petit** que le nombre de '
            + 'départ. 25 % de 80 ne peut pas dépasser 80.',
        },
        { type: 'exemple', texte: '3/4 de 20 = 15   ·   25 % de 80 = 20   ·   10 % de 350 = 35' },
      ],

      methode: {
        titre: 'Calculer 25 % de 80',
        enonce: 'Calculer 25 % de 80.',
        etapes: [
          { texte: '25 %, c\'est 25/100, qui se simplifie en 1/4.', note: 'Reconnaître les pourcentages courants fait gagner du temps.' },
          { texte: 'Prendre le quart de 80 : 80 ÷ 4 = 20.', note: '' },
          { texte: 'Donc 25 % de 80 = 20.', note: '' },
          { texte: 'Contrôle : 20 est bien plus petit que 80.', note: '' },
        ],
        controle:
          'Le contrôle : 25 % c\'est un peu moins que le quart… non, c\'est '
          + 'exactement le quart. Le résultat doit valoir environ le quart du '
          + 'nombre de départ.',
      },

      entrainement: [
        {
          id: 'e-2-4-1', type: 'calcul', palier: 1,
          consigne: 'Calcule la moitié de ce nombre.', enonce: '48', attendu: 24,
        },
        {
          id: 'e-2-4-2', type: 'calcul', palier: 1,
          consigne: 'Calcule le quart de ce nombre.', enonce: '36', attendu: 9,
        },
        {
          id: 'e-2-4-3', type: 'calcul', palier: 2,
          consigne: 'Calcule les trois quarts de ce nombre.', enonce: '20', attendu: 15,
          fausses: [{ valeur: 5, piege: 'fraction-lue-comme-deux-entiers' }],
        },
        {
          id: 'e-2-4-4', type: 'calcul', palier: 2,
          consigne: 'Calcule 25 % de ce nombre.', enonce: '80', attendu: 20,
          fausses: [
            { valeur: 2000, piege: 'pourcentage-mal-applique' },
            { valeur: 3.2, piege: 'pourcentage-mal-applique' },
          ],
        },
        {
          id: 'e-2-4-5', type: 'calcul', palier: 2,
          consigne: 'Calcule 10 % de ce nombre.', enonce: '350', attendu: 35,
          fausses: [{ valeur: 3500, piege: 'pourcentage-mal-applique' }],
        },
        {
          // Neutre : 100 % laisse le nombre inchangé. Sans cet item, « un
          // pourcentage rapetisse toujours » deviendrait la règle.
          id: 'e-2-4-6', type: 'calcul', palier: 3, neutre: true,
          consigne: 'Calcule 100 % de ce nombre.', enonce: '45', attendu: 45,
        },
        {
          id: 'e-2-4-7', type: 'calcul', palier: 3,
          consigne: 'Calcule les deux tiers de ce nombre.', enonce: '54', attendu: 36,
          fausses: [{ valeur: 18, piege: 'fraction-lue-comme-deux-entiers' }],
        },
      ],

      problemes: [
        {
          id: 'p-2-4-1',
          enonce:
            'Un jean coûte 60 €. Le magasin annonce une remise de 25 %.',
          questions: [
            { texte: 'Quel est le montant de la remise, en euros ?', attendu: 15, unite: '€' },
            { texte: 'Quel est le prix payé ?', attendu: 45, unite: '€' },
          ],
        },
        {
          id: 'p-2-4-2',
          enonce:
            'Une classe compte 28 élèves. Les trois quarts sont venus à la sortie '
            + 'scolaire.',
          questions: [
            { texte: 'Combien d\'élèves sont venus ?', attendu: 21, unite: 'élèves' },
            { texte: 'Combien sont restés ?', attendu: 7, unite: 'élèves' },
          ],
        },
        {
          id: 'p-2-4-3',
          enonce:
            'Un réservoir de 240 litres est rempli aux deux tiers.',
          questions: [
            { texte: 'Combien de litres contient-il ?', attendu: 160, unite: 'L' },
            { texte: 'Combien de litres manque-t-il pour le remplir ?', attendu: 80, unite: 'L' },
          ],
        },
      ],

      test: [
        { id: 't-2-4-1', type: 'calcul', consigne: 'La moitié de :', enonce: '64', attendu: 32, revoir: 'propriete' },
        { id: 't-2-4-2', type: 'calcul', consigne: 'Le quart de :', enonce: '48', attendu: 12, revoir: 'propriete' },
        { id: 't-2-4-3', type: 'calcul', consigne: 'Les trois quarts de :', enonce: '40', attendu: 30, revoir: 'propriete' },
        { id: 't-2-4-4', type: 'calcul', consigne: '50 % de :', enonce: '90', attendu: 45, revoir: 'propriete' },
        { id: 't-2-4-5', type: 'calcul', consigne: '25 % de :', enonce: '200', attendu: 50, revoir: 'exemple' },
        { id: 't-2-4-6', type: 'calcul', consigne: '10 % de :', enonce: '70', attendu: 7, revoir: 'exemple' },
        { id: 't-2-4-7', type: 'calcul', consigne: 'Les deux tiers de :', enonce: '30', attendu: 20, revoir: 'propriete' },
        { id: 't-2-4-8', type: 'calcul', consigne: '75 % de :', enonce: '80', attendu: 60, revoir: 'propriete' },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-2-5',
      titre: 'Passer d\'une écriture à l\'autre',
      attendus: [
        'Il écrit une fraction décimale sous forme décimale, et inversement.',
        'Il passe d\'une fraction à un pourcentage.',
      ],

      decouvrir: {
        titre: 'Trois façons d\'écrire le même nombre',
        texte:
          'Un quart d\'une pizza, c\'est aussi 0,25 pizza, c\'est aussi 25 % de la '
          + 'pizza. Trois écritures, un seul nombre.',
        lignes: [
          { calcul: 'Fraction', resultat: '1/4' },
          { calcul: 'Décimale', resultat: '0,25' },
          { calcul: 'Pourcentage', resultat: '25 %' },
        ],
        question: 'Fais la même chose pour un demi : donne sa valeur décimale, puis son pourcentage.',
        champs: [
          { id: 'a', etiquette: 'Écriture décimale', attendu: 0.5 },
          { id: 'b', etiquette: 'Pourcentage (sans le signe %)', attendu: 50 },
        ],
        conclusion:
          'Les trois écritures désignent le **même nombre**. Savoir passer de l\'une '
          + 'à l\'autre, c\'est pouvoir choisir la plus commode : la fraction pour '
          + 'raisonner, la décimale pour calculer, le pourcentage pour comparer.',
      },

      cours: [
        {
          type: 'definition',
          titre: 'Les fractions décimales',
          texte:
            'Une fraction décimale a pour dénominateur 10, 100, 1000…\n'
            + 'Elle se lit directement en décimal : 7/10 = 0,7 ; 25/100 = 0,25 ; '
            + '3/1000 = 0,003.',
        },
        {
          type: 'propriete',
          titre: 'De la fraction à la décimale',
          texte:
            'Toute fraction est un quotient : on divise le numérateur par le '
            + 'dénominateur. 3/4 = 3 ÷ 4 = 0,75.',
        },
        {
          type: 'propriete',
          titre: 'De la fraction au pourcentage',
          texte:
            'On écrit la fraction avec 100 au dénominateur. '
            + '1/4 = 25/100 = 25 % ; 1/2 = 50/100 = 50 % ; 3/4 = 75/100 = 75 %.',
        },
        { type: 'exemple', texte: '1/10 = 0,1 = 10 %   ·   1/5 = 0,2 = 20 %   ·   1/2 = 0,5 = 50 %' },
      ],

      methode: {
        titre: 'Écrire 3/5 en pourcentage',
        enonce: 'Écrire 3/5 sous forme de pourcentage.',
        etapes: [
          { texte: 'Je cherche par combien multiplier 5 pour obtenir 100.', note: '5 × 20 = 100.' },
          { texte: 'Je multiplie le haut ET le bas par 20 : 3 × 20 = 60.', note: 'La fraction ne change pas.' },
          { texte: '3/5 = 60/100.', note: '' },
          { texte: 'Donc 3/5 = 60 %.', note: 'Soit 0,6 en décimal.' },
        ],
        controle:
          'Le contrôle : 3/5, c\'est un peu plus que la moitié. 60 % est bien un peu '
          + 'plus que 50 %.',
      },

      entrainement: [
        {
          id: 'e-2-5-1', type: 'calcul', palier: 1,
          consigne: 'Donne l\'écriture décimale.', enonce: '\\dfrac{7}{10}', attendu: 0.7,
        },
        {
          id: 'e-2-5-2', type: 'calcul', palier: 1,
          consigne: 'Donne l\'écriture décimale.', enonce: '\\dfrac{25}{100}', attendu: 0.25,
          fausses: [{ valeur: 25, piege: 'virgule-decalee' }],
        },
        {
          id: 'e-2-5-3', type: 'calcul', palier: 2,
          consigne: 'Donne le pourcentage correspondant (sans le signe %).',
          enonce: '\\dfrac{1}{2}', attendu: 50,
        },
        {
          id: 'e-2-5-4', type: 'calcul', palier: 2,
          consigne: 'Donne le pourcentage correspondant (sans le signe %).',
          enonce: '\\dfrac{3}{4}', attendu: 75,
          fausses: [{ valeur: 34, piege: 'fraction-lue-comme-deux-entiers' }],
        },
        {
          // Neutre : une fraction déjà sur 100, aucune transformation à faire.
          id: 'e-2-5-5', type: 'calcul', palier: 2, neutre: true,
          consigne: 'Donne le pourcentage correspondant (sans le signe %).',
          enonce: '\\dfrac{40}{100}', attendu: 40,
        },
        {
          id: 'e-2-5-6', type: 'calcul', palier: 3,
          consigne: 'Donne le pourcentage correspondant (sans le signe %).',
          enonce: '\\dfrac{3}{5}', attendu: 60,
          fausses: [{ valeur: 35, piege: 'fraction-lue-comme-deux-entiers' }],
        },
        {
          id: 'e-2-5-7', type: 'calcul', palier: 3,
          consigne: 'Donne l\'écriture décimale.', enonce: '\\dfrac{1}{8}', attendu: 0.125,
          fausses: [{ valeur: 8, piege: 'quotient-inverse' }],
        },
      ],

      problemes: [
        {
          id: 'p-2-5-1',
          enonce:
            'Dans une classe de 25 élèves, 15 pratiquent un sport en club.',
          questions: [
            { texte: 'Quel pourcentage d\'élèves cela représente-t-il ?', attendu: 60, unite: '%' },
            { texte: 'Quel pourcentage n\'en pratique pas ?', attendu: 40, unite: '%' },
          ],
        },
        {
          id: 'p-2-5-2',
          enonce:
            'Une bouteille de 1 litre est remplie aux 3/4.',
          questions: [
            { texte: 'Combien de litres contient-elle ? Donne l\'écriture décimale.', attendu: 0.75, unite: 'L' },
            { texte: 'Quel pourcentage de la bouteille est rempli ?', attendu: 75, unite: '%' },
          ],
        },
        {
          id: 'p-2-5-3',
          enonce:
            'Un panier contient 20 fruits, dont 5 pommes.',
          questions: [
            { texte: 'Quelle fraction du panier les pommes représentent-elles ? Donne le dénominateur simplifié.', attendu: 4 },
            { texte: 'Quel pourcentage cela fait-il ?', attendu: 25, unite: '%' },
          ],
        },
      ],

      test: [
        { id: 't-2-5-1', type: 'calcul', consigne: 'Écriture décimale ?', enonce: '\\dfrac{3}{10}', attendu: 0.3, revoir: 'definition' },
        { id: 't-2-5-2', type: 'calcul', consigne: 'Écriture décimale ?', enonce: '\\dfrac{9}{100}', attendu: 0.09, revoir: 'definition' },
        { id: 't-2-5-3', type: 'calcul', consigne: 'Pourcentage (sans le signe) ?', enonce: '\\dfrac{1}{4}', attendu: 25, revoir: 'propriete' },
        { id: 't-2-5-4', type: 'calcul', consigne: 'Pourcentage (sans le signe) ?', enonce: '\\dfrac{1}{5}', attendu: 20, revoir: 'exemple' },
        { id: 't-2-5-5', type: 'calcul', consigne: 'Écriture décimale ?', enonce: '\\dfrac{1}{4}', attendu: 0.25, revoir: 'propriete' },
        { id: 't-2-5-6', type: 'calcul', consigne: 'Pourcentage (sans le signe) ?', enonce: '\\dfrac{7}{10}', attendu: 70, revoir: 'propriete' },
        { id: 't-2-5-7', type: 'calcul', consigne: 'Écriture décimale ?', enonce: '\\dfrac{2}{5}', attendu: 0.4, revoir: 'propriete' },
        { id: 't-2-5-8', type: 'calcul', consigne: 'Pourcentage (sans le signe) ?', enonce: '\\dfrac{9}{10}', attendu: 90, revoir: 'propriete' },
      ],
    },
  ],
};
