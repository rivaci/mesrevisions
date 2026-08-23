// Chapitre 1 — Les nombres décimaux.
//
// Premier chapitre écrit, et il fixe le format des autres. Il reprend celui de
// l'application de 4e — savoir-faire, six sections, réponses fausses portant le
// diagnostic — avec une différence qui compte : à ce niveau, l'élève ne
// manipule pas de lettres. Le programme 2025 le dit explicitement, « ce n'est
// qu'au cycle 4 que les lettres seront introduites de manière formelle ».
//
// ── Pourquoi les décimaux d'abord ─────────────────────────────────────────
//
// Parce que c'est l'obstacle le mieux documenté du cycle 3, et parce qu'il
// empoisonne tout le reste : un élève qui croit 2,54 > 2,7 se trompera aussi
// sur les fractions, les aires et la proportionnalité, sans qu'on comprenne
// pourquoi. La recherche en didactique (Brousseau) nomme l'obstacle : l'élève
// transporte sur les décimaux des règles vraies pour les entiers, et lit un
// décimal comme DEUX entiers séparés par une virgule.
//
// ── La règle qui gouverne les comparaisons ────────────────────────────────
//
// Un exercice où les parties entières DIFFÈRENT ne teste rien : comparer 3,7 et
// 5,2 se réussit en comparant 3 et 5, sans jamais toucher au concept. La
// recherche appelle ça des « réussites fictives ». Toute comparaison de ce
// chapitre a donc la MÊME partie entière, et le contrôle de contenu le vérifie.
//
// Les items marqués `neutre: true` sont l'exception voulue : ceux où le piège
// ne joue pas. Sans eux, l'élève apprend un motif — « le plus court gagne » —
// au lieu de la règle, et se trompe partout ailleurs.

export default {
  numero: 1,
  titre: 'Les nombres décimaux',
  theme: 'Nombres, calcul et résolution de problèmes',
  trimestre: 1,
  programme: '2025',
  prerequis: [
    'Les nombres entiers et leur écriture (CM)',
    'Les fractions décimales : dixièmes, centièmes (CM)',
  ],

  savoirFaire: [
    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-1-1',
      titre: 'Lire un décimal par rang',
      attendus: [
        'Il nomme le rang de chaque chiffre : dixièmes, centièmes, millièmes.',
        'Il donne le nombre de dixièmes ou de centièmes contenus dans un décimal.',
      ],

      decouvrir: {
        titre: 'Deux nombres, la même longueur, et pourtant…',
        texte:
          'Voici deux nombres écrits avec les mêmes chiffres, dans un ordre '
          + 'différent. Range-les du plus petit au plus grand.',
        lignes: [
          { calcul: '0,25', resultat: '25 centièmes' },
          { calcul: '0,52', resultat: '52 centièmes' },
        ],
        question: 'Maintenant essaie avec 0,7 et 0,25. Combien de centièmes vaut chacun ?',
        champs: [
          { id: 'a', etiquette: '0,7 vaut … centièmes', attendu: 70 },
          { id: 'b', etiquette: '0,25 vaut … centièmes', attendu: 25 },
        ],
        conclusion:
          'On ne peut pas comparer 7 et 25 : ils ne parlent pas de la même chose. '
          + '**7 dixièmes valent 70 centièmes**, et 70 est bien plus grand que 25. '
          + 'Tout part de là : un décimal se lit **par rang**.',
      },

      cours: [
        {
          type: 'definition',
          titre: 'Les rangs après la virgule',
          texte:
            'Après la virgule viennent, dans l\'ordre : les **dixièmes**, les '
            + '**centièmes**, les **millièmes**.\n'
            + 'Dans **3,478** : le 4 est aux dixièmes, le 7 aux centièmes, le 8 aux millièmes.',
        },
        {
          type: 'propriete',
          titre: 'Changer d\'unité de rang',
          texte:
            '1 dixième = 10 centièmes = 100 millièmes.\n'
            + 'Donc 0,7 = 70 centièmes = 700 millièmes.',
        },
        {
          type: 'remarque',
          titre: 'La lecture qui trompe',
          texte:
            'On dit « trois virgule quarante-sept » par habitude, mais ce n\'est pas '
            + 'ce que le nombre veut dire : 3,47 se lit **trois et quarante-sept '
            + 'centièmes**. Cette habitude de langage est la cause première du piège '
            + 'des décimaux — elle fait entendre deux entiers là où il n\'y en a qu\'un.',
        },
        { type: 'exemple', texte: '2,5 = 25 dixièmes   ·   0,08 = 8 centièmes   ·   1,304 : le 0 est aux centièmes' },
      ],

      methode: {
        titre: 'Trouver le nombre de centièmes',
        enonce: 'Combien de centièmes y a-t-il dans 3,4 ?',
        etapes: [
          { texte: 'J\'écris 3,4 avec deux chiffres après la virgule : 3,40.', note: 'Ajouter un zéro à la FIN ne change pas le nombre.' },
          { texte: 'Je lis : 3 unités et 40 centièmes.', note: '' },
          { texte: 'Une unité vaut 100 centièmes, donc 3 unités valent 300 centièmes.', note: '' },
          { texte: 'En tout : 300 + 40 = 340 centièmes.', note: '' },
        ],
        controle:
          'Le contrôle : le nombre de centièmes s\'obtient en enlevant la virgule '
          + 'après avoir mis deux chiffres derrière. 3,40 → 340.',
      },

      entrainement: [
        {
          id: 'e-1-1-1', type: 'calcul', palier: 1,
          consigne: 'Combien de dixièmes y a-t-il dans ce nombre ?', enonce: '0{,}6', attendu: 6,
        },
        {
          id: 'e-1-1-2', type: 'calcul', palier: 1,
          consigne: 'Combien de centièmes y a-t-il dans ce nombre ?', enonce: '0{,}7', attendu: 70,
          fausses: [{ valeur: 7, piege: 'decimal-lu-comme-deux-entiers' }],
        },
        {
          id: 'e-1-1-3', type: 'calcul', palier: 2,
          consigne: 'Combien de centièmes y a-t-il dans ce nombre ?', enonce: '2{,}5', attendu: 250,
          fausses: [
            { valeur: 25, piege: 'decimal-lu-comme-deux-entiers' },
            { valeur: 5, piege: 'decimal-lu-comme-deux-entiers' },
          ],
        },
        {
          // Item neutre : ici le nombre a déjà deux décimales, donc « enlever la
          // virgule » suffit. Sans lui, l'élève croirait qu'il faut toujours
          // multiplier par dix.
          id: 'e-1-1-4', type: 'calcul', palier: 2, neutre: true,
          consigne: 'Combien de centièmes y a-t-il dans ce nombre ?', enonce: '0{,}43', attendu: 43,
        },
        {
          id: 'e-1-1-5', type: 'calcul', palier: 3,
          consigne: 'Combien de millièmes y a-t-il dans ce nombre ?', enonce: '1{,}2', attendu: 1200,
          fausses: [
            { valeur: 12, piege: 'decimal-lu-comme-deux-entiers' },
            { valeur: 120, piege: 'virgule-decalee' },
          ],
        },
        {
          id: 'e-1-1-6', type: 'calcul', palier: 3,
          consigne: 'Combien de centièmes y a-t-il dans ce nombre ?', enonce: '0{,}05', attendu: 5,
          fausses: [{ valeur: 50, piege: 'zero-inutile-ou-non' }],
        },
      ],

      problemes: [
        {
          id: 'p-1-1-1',
          enonce:
            'Un flacon contient 0,25 L de sirop. On rappelle qu\'un litre vaut '
            + '100 centilitres et 1000 millilitres.',
          questions: [
            { texte: 'Combien cela fait-il de centilitres ?', attendu: 25, unite: 'cL' },
            { texte: 'Et combien de millilitres ?', attendu: 250, unite: 'mL' },
          ],
        },
        {
          id: 'p-1-1-2',
          enonce:
            'Une pièce de 1 € pèse 7,5 g. Une pièce de 2 € pèse 8,5 g.',
          questions: [
            { texte: 'Combien de dixièmes de gramme pèse la pièce de 1 € ?', attendu: 75, unite: 'dixièmes de g' },
            { texte: 'Combien de dixièmes de gramme pèsent les deux pièces ensemble ?', attendu: 160, unite: 'dixièmes de g' },
          ],
        },
        {
          id: 'p-1-1-3',
          enonce:
            'Un athlète a couru en 12,08 s. Le chronomètre affiche les temps en '
            + 'centièmes de seconde.',
          questions: [
            { texte: 'Combien de centièmes de seconde a-t-il mis ?', attendu: 1208, unite: 'centièmes' },
            { texte: 'Le chiffre 8 de son temps, à quel rang est-il ? Réponds 1 pour dixièmes, 2 pour centièmes.', attendu: 2 },
          ],
        },
      ],

      test: [
        { id: 't-1-1-1', type: 'calcul', enonce: '0{,}4 \\text{ vaut combien de dixièmes ?}', attendu: 4, revoir: 'definition' },
        { id: 't-1-1-2', type: 'calcul', enonce: '0{,}9 \\text{ vaut combien de centièmes ?}', attendu: 90, revoir: 'propriete' },
        { id: 't-1-1-3', type: 'calcul', enonce: '1{,}5 \\text{ vaut combien de dixièmes ?}', attendu: 15, revoir: 'propriete' },
        { id: 't-1-1-4', type: 'calcul', enonce: '3{,}4 \\text{ vaut combien de centièmes ?}', attendu: 340, revoir: 'propriete' },
        { id: 't-1-1-5', type: 'calcul', enonce: '0{,}07 \\text{ vaut combien de centièmes ?}', attendu: 7, revoir: 'exemple' },
        { id: 't-1-1-6', type: 'calcul', enonce: '2{,}6 \\text{ vaut combien de centièmes ?}', attendu: 260, revoir: 'propriete' },
        { id: 't-1-1-7', type: 'calcul', enonce: '0{,}8 \\text{ vaut combien de millièmes ?}', attendu: 800, revoir: 'propriete' },
        { id: 't-1-1-8', type: 'calcul', enonce: '5{,}03 \\text{ vaut combien de centièmes ?}', attendu: 503, revoir: 'exemple' },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-1-2',
      titre: 'Comparer et ranger des décimaux',
      attendus: [
        'Il compare deux décimaux de même partie entière.',
        'Il range une liste de décimaux dans l\'ordre croissant.',
        'Il intercale un décimal entre deux autres.',
      ],

      decouvrir: {
        titre: 'Le nombre le plus long n\'est pas le plus grand',
        texte:
          'Trois coureurs. Voici leurs temps, en secondes. Qui a gagné, c\'est-à-dire '
          + 'qui a mis le moins de temps ?',
        lignes: [
          { calcul: 'Lina', resultat: '12,8 s' },
          { calcul: 'Théo', resultat: '12,75 s' },
          { calcul: 'Sami', resultat: '12,9 s' },
        ],
        question: 'Écris le temps de Lina et celui de Sami avec deux chiffres après la virgule, puis dis qui a gagné.',
        champs: [
          { id: 'a', etiquette: 'Lina : 12,…', attendu: 80 },
          { id: 'b', etiquette: 'Sami : 12,…', attendu: 90 },
        ],
        conclusion:
          'Une fois tout le monde à deux chiffres — 12,80 · 12,75 · 12,90 — la '
          + 'comparaison devient évidente : **Théo a gagné**. Son temps était pourtant '
          + 'le plus « long » à écrire.',
      },

      cours: [
        {
          type: 'propriete',
          titre: 'Comparer deux décimaux',
          texte:
            'On compare d\'abord les **parties entières**.\n'
            + 'Si elles sont égales, on compare les **dixièmes**, puis les **centièmes**, '
            + 'et ainsi de suite — rang par rang, de gauche à droite.',
        },
        {
          type: 'remarque',
          titre: 'L\'astuce des zéros',
          texte:
            'Donner à tous les nombres le **même nombre de chiffres après la virgule**, '
            + 'en complétant par des zéros, rend la comparaison immédiate. C\'est permis : '
            + 'un zéro à la fin ne change pas le nombre.',
        },
        {
          type: 'propriete',
          titre: 'Entre deux décimaux, il y en a d\'autres',
          texte:
            'Contrairement aux entiers, un décimal n\'a pas de « suivant ». '
            + 'Entre 2,4 et 2,5 il y a 2,41 ; entre 2,4 et 2,41 il y a 2,405. '
            + 'Il y en a toujours une infinité.',
        },
        { type: 'exemple', texte: '2,7 > 2,54   car   2,70 > 2,54   ·   0,08 < 0,1   car   0,08 < 0,10' },
      ],

      methode: {
        titre: 'Comparer 5,3 et 5,29',
        enonce: 'Quel est le plus grand : 5,3 ou 5,29 ?',
        etapes: [
          { texte: 'Les parties entières sont égales : 5 et 5.', note: 'On ne peut pas conclure ici.' },
          { texte: 'Je complète pour avoir deux chiffres partout : 5,30 et 5,29.', note: 'Un zéro à la fin ne change rien.' },
          { texte: 'Je compare les dixièmes : 3 contre 2. Le 3 gagne.', note: '' },
          { texte: 'Donc 5,3 > 5,29.', note: '' },
        ],
        controle:
          'Le contrôle : compte les chiffres après la virgule. S\'ils ne sont pas '
          + 'en même nombre, tu n\'as pas le droit de comparer directement.',
      },

      entrainement: [
        {
          id: 'e-1-2-1', type: 'comparer', palier: 1,
          consigne: 'Compare ces deux nombres.', enonce: '2{,}7 \\ldots 2{,}54', attendu: '>',
          fausses: [{ valeur: '<', piege: 'decimal-lu-comme-deux-entiers' }],
        },
        {
          id: 'e-1-2-2', type: 'comparer', palier: 1,
          consigne: 'Compare ces deux nombres.', enonce: '0{,}9 \\ldots 0{,}85', attendu: '>',
          fausses: [{ valeur: '<', piege: 'decimal-lu-comme-deux-entiers' }],
        },
        {
          // Neutre : ici le nombre le plus long EST le plus grand. Sans cet item,
          // « le plus court gagne » deviendrait la règle apprise.
          id: 'e-1-2-3', type: 'comparer', palier: 1, neutre: true,
          consigne: 'Compare ces deux nombres.', enonce: '3{,}45 \\ldots 3{,}4', attendu: '>',
        },
        {
          id: 'e-1-2-4', type: 'comparer', palier: 2,
          consigne: 'Compare ces deux nombres.', enonce: '1{,}05 \\ldots 1{,}5', attendu: '<',
          fausses: [{ valeur: '>', piege: 'zero-inutile-ou-non' }],
        },
        {
          id: 'e-1-2-5', type: 'comparer', palier: 2, neutre: true,
          consigne: 'Compare ces deux nombres.', enonce: '7{,}20 \\ldots 7{,}2', attendu: '=',
          fausses: [{ valeur: '>', piege: 'zero-inutile-ou-non' }],
        },
        {
          id: 'e-1-2-6', type: 'calcul', palier: 3,
          consigne: 'Donne un nombre décimal compris entre 2,4 et 2,5. Écris-le avec deux chiffres après la virgule.',
          enonce: '2{,}4 < \\ldots < 2{,}5', attendu: 2.45,
          accepte: (v) => v > 2.4 && v < 2.5,
          fausses: [{ valeur: 2.6, piege: 'pas-de-successeur' }],
        },
        {
          id: 'e-1-2-7', type: 'calcul', palier: 3,
          consigne: 'Donne un nombre décimal compris entre 6,7 et 6,71.',
          enonce: '6{,}7 < \\ldots < 6{,}71', attendu: 6.705,
          accepte: (v) => v > 6.7 && v < 6.71,
          fausses: [{ valeur: 6.8, piege: 'pas-de-successeur' }],
        },
      ],

      problemes: [
        {
          id: 'p-1-2-1',
          enonce:
            'Trois élèves mesurent la même table et annoncent : 1,2 m ; 1,15 m ; '
            + '1,08 m.',
          questions: [
            { texte: 'Quelle est la plus grande des trois mesures ?', attendu: 1.2, unite: 'm' },
            { texte: 'Quelle est la plus petite ?', attendu: 1.08, unite: 'm' },
          ],
        },
        {
          id: 'p-1-2-2',
          enonce:
            'Au 100 m, Lina a couru en 12,8 s, Théo en 12,75 s et Sami en 12,9 s. '
            + 'Le plus rapide est celui qui a mis le moins de temps.',
          questions: [
            { texte: 'Quel est le temps du gagnant ?', attendu: 12.75, unite: 's' },
            { texte: 'Quel est le temps du dernier ?', attendu: 12.9, unite: 's' },
          ],
        },
        {
          id: 'p-1-2-3',
          enonce:
            'Un magasin vend le même stylo à 2,5 € et un autre à 2,45 €.',
          questions: [
            { texte: 'Quel est le prix le plus bas ?', attendu: 2.45, unite: '€' },
            { texte: 'Quelle somme économise-t-on en le prenant au moins cher ?', attendu: 0.05, unite: '€' },
          ],
        },
      ],

      test: [
        { id: 't-1-2-1', type: 'comparer', enonce: '2{,}7 \\ldots 2{,}54', attendu: '>', revoir: 'propriete' },
        { id: 't-1-2-2', type: 'comparer', enonce: '0{,}9 \\ldots 0{,}85', attendu: '>', revoir: 'propriete' },
        { id: 't-1-2-3', type: 'comparer', enonce: '4{,}30 \\ldots 4{,}3', attendu: '=', revoir: 'remarque' },
        { id: 't-1-2-4', type: 'comparer', enonce: '1{,}05 \\ldots 1{,}5', attendu: '<', revoir: 'propriete' },
        { id: 't-1-2-5', type: 'comparer', enonce: '6{,}18 \\ldots 6{,}2', attendu: '<', revoir: 'propriete' },
        { id: 't-1-2-6', type: 'comparer', enonce: '9{,}47 \\ldots 9{,}4', attendu: '>', revoir: 'propriete' },
        { id: 't-1-2-7', type: 'comparer', enonce: '0{,}08 \\ldots 0{,}1', attendu: '<', revoir: 'exemple' },
        { id: 't-1-2-8', type: 'comparer', enonce: '5{,}6 \\ldots 5{,}600', attendu: '=', revoir: 'remarque' },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-1-3',
      titre: 'Multiplier et diviser par 10, 100, 1000',
      attendus: [
        'Il multiplie et divise un décimal par 10, 100 ou 1000.',
        'Il utilise ces règles pour convertir des unités.',
      ],

      decouvrir: {
        titre: 'Le nombre glisse, la virgule reste',
        texte:
          'Observe ce qui arrive quand on multiplie par 10 à chaque ligne.',
        lignes: [
          { calcul: '0,25 × 10', resultat: '2,5' },
          { calcul: '2,5 × 10', resultat: '25' },
          { calcul: '25 × 10', resultat: '250' },
        ],
        question: 'Continue la suite : que valent 250 × 10, puis 0,025 × 10 ?',
        champs: [
          { id: 'a', etiquette: '250 × 10 =', attendu: 2500 },
          { id: 'b', etiquette: '0,025 × 10 =', attendu: 0.25 },
        ],
        conclusion:
          'À chaque fois, les chiffres **glissent d\'un rang vers la gauche** — ce '
          + 'qui revient à déplacer la virgule d\'un rang vers la droite. Multiplier '
          + 'par 10 ne consiste **pas** à ajouter un zéro : ça, c\'est vrai seulement '
          + 'pour les entiers.',
      },

      cours: [
        {
          type: 'propriete',
          titre: 'Multiplier par 10, 100, 1000',
          texte:
            'La virgule se déplace vers la **droite** : d\'un rang pour 10, de deux '
            + 'pour 100, de trois pour 1000. On complète par des zéros si besoin.',
        },
        {
          type: 'propriete',
          titre: 'Diviser par 10, 100, 1000',
          texte:
            'La virgule se déplace vers la **gauche**, du même nombre de rangs.',
        },
        {
          type: 'remarque',
          texte:
            'Le sens ne s\'apprend pas par cœur : multiplier rend plus **grand**, '
            + 'donc la virgule va vers la droite. Diviser rend plus **petit**, elle '
            + 'va vers la gauche.',
        },
        { type: 'exemple', texte: '2,5 × 10 = 25   ·   2,5 × 100 = 250   ·   2,5 ÷ 10 = 0,25' },
      ],

      methode: {
        titre: 'Calculer 3,7 × 100',
        enonce: 'Calculer 3,7 × 100.',
        etapes: [
          { texte: 'Je multiplie, donc le résultat sera plus grand : la virgule va à droite.', note: 'C\'est le contrôle du sens.' },
          { texte: '100, c\'est deux zéros : la virgule saute de deux rangs.', note: '' },
          { texte: '3,7 → 37, → 370.', note: 'Il manquait un chiffre : on complète par un zéro.' },
          { texte: 'Donc 3,7 × 100 = 370.', note: '' },
        ],
        controle:
          'Le contrôle : 3,7 c\'est presque 4, et 4 × 100 = 400. Un résultat de 370 '
          + 'est plausible ; 37 ou 3700 ne le seraient pas.',
      },

      entrainement: [
        {
          id: 'e-1-3-1', type: 'calcul', palier: 1,
          consigne: 'Calcule.', enonce: '2{,}5 \\times 10', attendu: 25,
          fausses: [{ valeur: 2.5, piege: 'virgule-decalee' }, { valeur: 250, piege: 'virgule-decalee' }],
        },
        {
          id: 'e-1-3-2', type: 'calcul', palier: 1,
          consigne: 'Calcule.', enonce: '0{,}8 \\times 100', attendu: 80,
          fausses: [{ valeur: 8, piege: 'virgule-decalee' }, { valeur: 0.8, piege: 'virgule-decalee' }],
        },
        {
          // Neutre : sur un entier, « ajouter un zéro » marche. C'est justement
          // pour ça que l'élève l'applique ensuite aux décimaux.
          id: 'e-1-3-3', type: 'calcul', palier: 1, neutre: true,
          consigne: 'Calcule.', enonce: '34 \\times 10', attendu: 340,
        },
        {
          id: 'e-1-3-4', type: 'calcul', palier: 2,
          consigne: 'Calcule.', enonce: '4{,}6 \\div 10', attendu: 0.46,
          fausses: [{ valeur: 46, piege: 'virgule-decalee' }],
        },
        {
          id: 'e-1-3-5', type: 'calcul', palier: 2,
          consigne: 'Calcule.', enonce: '7 \\div 100', attendu: 0.07,
          fausses: [{ valeur: 0.7, piege: 'virgule-decalee' }, { valeur: 700, piege: 'virgule-decalee' }],
        },
        {
          id: 'e-1-3-6', type: 'calcul', palier: 3,
          consigne: 'Calcule.', enonce: '0{,}03 \\times 1000', attendu: 30,
          fausses: [{ valeur: 3, piege: 'virgule-decalee' }, { valeur: 300, piege: 'virgule-decalee' }],
        },
      ],

      problemes: [
        {
          id: 'p-1-3-1',
          enonce:
            'Un paquet de bonbons pèse 0,35 kg. On rappelle que 1 kg = 1000 g.',
          questions: [
            { texte: 'Combien pèse-t-il en grammes ?', attendu: 350, unite: 'g' },
            { texte: 'Combien pèsent 10 paquets identiques, en grammes ?', attendu: 3500, unite: 'g' },
          ],
        },
        {
          id: 'p-1-3-2',
          enonce: 'Une bouteille contient 75 cL. On rappelle que 1 L = 100 cL.',
          questions: [
            { texte: 'Combien cela fait-il de litres ?', attendu: 0.75, unite: 'L' },
            { texte: 'Combien de litres dans 10 bouteilles ?', attendu: 7.5, unite: 'L' },
          ],
        },
        {
          id: 'p-1-3-3',
          enonce:
            'Un ruban de 4,2 m est coupé en 10 morceaux égaux.',
          questions: [
            { texte: 'Quelle est la longueur d\'un morceau, en mètres ?', attendu: 0.42, unite: 'm' },
            { texte: 'Combien cela fait-il de centimètres ? (1 m = 100 cm)', attendu: 42, unite: 'cm' },
          ],
        },
      ],

      test: [
        { id: 't-1-3-1', type: 'calcul', enonce: '2{,}5 \\times 10', attendu: 25, revoir: 'propriete' },
        { id: 't-1-3-2', type: 'calcul', enonce: '0{,}8 \\times 100', attendu: 80, revoir: 'propriete' },
        { id: 't-1-3-3', type: 'calcul', enonce: '4{,}6 \\div 10', attendu: 0.46, revoir: 'propriete' },
        { id: 't-1-3-4', type: 'calcul', enonce: '7 \\div 100', attendu: 0.07, revoir: 'propriete' },
        { id: 't-1-3-5', type: 'calcul', enonce: '0{,}03 \\times 1000', attendu: 30, revoir: 'exemple' },
        { id: 't-1-3-6', type: 'calcul', enonce: '12{,}5 \\div 100', attendu: 0.125, revoir: 'propriete' },
        { id: 't-1-3-7', type: 'calcul', enonce: '1{,}4 \\times 100', attendu: 140, revoir: 'propriete' },
        { id: 't-1-3-8', type: 'trous', enonce: '0{,}6 \\times \\square = 60', champs: [{ id: 'a', attendu: 100 }], revoir: 'propriete' },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-1-4',
      titre: 'Additionner et soustraire des décimaux',
      attendus: [
        'Il pose et effectue une addition ou une soustraction de décimaux.',
        'Il contrôle son résultat par un ordre de grandeur.',
      ],

      decouvrir: {
        titre: 'Où mettre la virgule ?',
        texte:
          'Un élève a posé 3,4 + 0,25 en alignant les nombres par la droite, '
          + 'comme des entiers. Il a trouvé 3,29.',
        lignes: [
          { calcul: 'Son calcul', resultat: '3,4 + 0,25 = 3,29' },
          { calcul: 'Un ordre de grandeur', resultat: '3,4 c\'est plus de 3' },
        ],
        question: 'Additionner un nombre positif à 3,4 doit donner un résultat plus grand que 3,4. Est-ce le cas de 3,29 ? Réponds par 1 pour oui, 0 pour non.',
        champs: [{ id: 'a', etiquette: 'Réponse', attendu: 0 }],
        conclusion:
          'Non : son résultat est plus **petit** que le nombre de départ, ce qui est '
          + 'impossible. L\'erreur vient de l\'alignement — il faut aligner les '
          + '**virgules**, pas les derniers chiffres. La bonne réponse est **3,65**.',
      },

      cours: [
        {
          type: 'propriete',
          titre: 'Poser une addition ou une soustraction',
          texte:
            'On aligne les **virgules** l\'une sous l\'autre. Chaque rang se retrouve '
            + 'alors sous son semblable : les dixièmes sous les dixièmes, les centièmes '
            + 'sous les centièmes.',
        },
        {
          type: 'remarque',
          titre: 'Compléter par des zéros',
          texte:
            'Si un nombre a moins de décimales que l\'autre, on complète par des '
            + 'zéros : 3,4 + 0,25 devient 3,40 + 0,25. C\'est plus sûr que de laisser '
            + 'une colonne vide.',
        },
        {
          type: 'remarque',
          titre: 'Le contrôle par ordre de grandeur',
          texte:
            'Avant de valider, arrondis : 3,4 + 0,25 ≈ 3 + 0 = 3, donc le résultat '
            + 'doit être un peu plus de 3. Ce réflexe attrape presque toutes les '
            + 'erreurs de virgule.',
        },
        { type: 'exemple', texte: '3,40 + 0,25 = 3,65   ·   5,00 − 1,25 = 3,75' },
      ],

      methode: {
        titre: 'Calculer 5 − 1,25',
        enonce: 'Calculer 5 − 1,25.',
        etapes: [
          { texte: 'J\'écris 5 avec deux décimales : 5,00.', note: 'Sans ça, les colonnes ne correspondent pas.' },
          { texte: 'J\'aligne les virgules et je soustrais rang par rang.', note: '' },
          { texte: '5,00 − 1,25 = 3,75.', note: '' },
          { texte: 'Contrôle : 5 − 1 = 4, et 3,75 est un peu moins de 4. C\'est cohérent.', note: '' },
        ],
        controle:
          'Le contrôle : additionne ta réponse et le nombre retiré. 3,75 + 1,25 = 5. '
          + 'Si tu retombes sur le départ, c\'est juste.',
      },

      entrainement: [
        {
          id: 'e-1-4-1', type: 'calcul', palier: 1,
          consigne: 'Calcule.', enonce: '3{,}4 + 0{,}25', attendu: 3.65,
          fausses: [{ valeur: 3.29, piege: 'rangs-mal-alignes' }, { valeur: 0.59, piege: 'rangs-mal-alignes' }],
        },
        {
          id: 'e-1-4-2', type: 'calcul', palier: 1, neutre: true,
          consigne: 'Calcule.', enonce: '2{,}31 + 1{,}45', attendu: 3.76,
        },
        {
          id: 'e-1-4-3', type: 'calcul', palier: 2,
          consigne: 'Calcule.', enonce: '5 - 1{,}25', attendu: 3.75,
          fausses: [{ valeur: 4.25, piege: 'rangs-mal-alignes' }, { valeur: 3.85, piege: 'rangs-mal-alignes' }],
        },
        {
          id: 'e-1-4-4', type: 'calcul', palier: 2,
          consigne: 'Calcule.', enonce: '7{,}2 - 0{,}45', attendu: 6.75,
          fausses: [{ valeur: 6.85, piege: 'rangs-mal-alignes' }, { valeur: 7.15, piege: 'rangs-mal-alignes' }],
        },
        {
          id: 'e-1-4-5', type: 'calcul', palier: 3,
          consigne: 'Calcule.', enonce: '12{,}08 + 3{,}9', attendu: 15.98,
          fausses: [{ valeur: 12.47, piege: 'rangs-mal-alignes' }, { valeur: 15.17, piege: 'rangs-mal-alignes' }],
        },
        {
          id: 'e-1-4-6', type: 'plausible', palier: 3,
          consigne: 'Sans poser le calcul, ce résultat est-il plausible ?',
          enonce: '8{,}7 + 4{,}6 = 12{,}13', attendu: false,
          explication: '8,7 + 4,6, c\'est à peu près 9 + 5 = 14. Un résultat de 12,13 est trop petit : la vraie réponse est 13,3.',
        },
      ],

      problemes: [
        {
          id: 'p-1-4-1',
          enonce:
            'Anto achète un cahier à 2,45 € et un stylo à 1,80 €. Il paie avec '
            + 'un billet de 10 €.',
          questions: [
            { texte: 'Combien coûtent les deux articles ensemble ?', attendu: 4.25, unite: '€' },
            { texte: 'Combien lui rend-on ?', attendu: 5.75, unite: '€' },
          ],
        },
        {
          id: 'p-1-4-2',
          enonce:
            'Une bouteille pleine pèse 1,45 kg. Vide, elle pèse 0,3 kg.',
          questions: [
            { texte: 'Combien pèse le liquide, en kilogrammes ?', attendu: 1.15, unite: 'kg' },
            { texte: 'Si on en boit la moitié, combien pèse alors la bouteille ?', attendu: 0.875, unite: 'kg' },
          ],
        },
        {
          id: 'p-1-4-3',
          enonce:
            'Un sac de course contient 1,2 kg de pommes, 0,75 kg de poires et '
            + '0,4 kg de raisin.',
          questions: [
            { texte: 'Quelle est la masse totale des fruits ?', attendu: 2.35, unite: 'kg' },
            { texte: 'Combien manque-t-il pour atteindre 3 kg ?', attendu: 0.65, unite: 'kg' },
          ],
        },
      ],

      test: [
        { id: 't-1-4-1', type: 'calcul', enonce: '3{,}4 + 0{,}25', attendu: 3.65, revoir: 'propriete' },
        { id: 't-1-4-2', type: 'calcul', enonce: '5 - 1{,}25', attendu: 3.75, revoir: 'remarque' },
        { id: 't-1-4-3', type: 'calcul', enonce: '7{,}2 - 0{,}45', attendu: 6.75, revoir: 'propriete' },
        { id: 't-1-4-4', type: 'calcul', enonce: '12{,}08 + 3{,}9', attendu: 15.98, revoir: 'propriete' },
        { id: 't-1-4-5', type: 'calcul', enonce: '0{,}75 + 0{,}25', attendu: 1, revoir: 'exemple' },
        { id: 't-1-4-6', type: 'calcul', enonce: '10 - 2{,}4', attendu: 7.6, revoir: 'remarque' },
        { id: 't-1-4-7', type: 'calcul', enonce: '6{,}5 + 2{,}75', attendu: 9.25, revoir: 'propriete' },
        { id: 't-1-4-8', type: 'trous', enonce: '4{,}2 + \\square = 5', champs: [{ id: 'a', attendu: 0.8 }], revoir: 'propriete' },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-1-5',
      titre: 'Multiplier par un décimal, et savoir ce que ça fait',
      attendus: [
        'Il multiplie un nombre par un décimal.',
        'Il anticipe si le résultat sera plus grand ou plus petit que le nombre de départ.',
      ],

      decouvrir: {
        titre: 'Une multiplication qui rapetisse',
        texte:
          'Prends 8, et multiplie-le par des nombres de plus en plus petits.',
        lignes: [
          { calcul: '8 × 3', resultat: '24' },
          { calcul: '8 × 1', resultat: '8' },
          { calcul: '8 × 0,5', resultat: '4' },
        ],
        question: 'Que valent 8 × 0,25, puis 8 × 0,1 ?',
        champs: [
          { id: 'a', etiquette: '8 × 0,25 =', attendu: 2 },
          { id: 'b', etiquette: '8 × 0,1 =', attendu: 0.8 },
        ],
        conclusion:
          'Multiplier par un nombre **plus petit que 1** rend le résultat **plus '
          + 'petit**. « Multiplier, ça agrandit » est vrai pour les entiers, faux '
          + 'ici : × 0,5 c\'est prendre la moitié.',
      },

      cours: [
        {
          type: 'propriete',
          titre: 'Le sens du résultat',
          texte:
            'Si le second facteur est **plus grand que 1**, le produit est plus grand '
            + 'que le premier nombre.\n'
            + 'S\'il est **plus petit que 1**, le produit est plus **petit**.',
        },
        {
          type: 'propriete',
          titre: 'Placer la virgule dans un produit',
          texte:
            'On multiplie sans les virgules, puis on donne au résultat autant de '
            + 'chiffres après la virgule qu\'il y en a **en tout** dans les deux '
            + 'facteurs.',
        },
        {
          type: 'exemple',
          texte:
            '2,5 × 4 : je calcule 25 × 4 = 100. Il y a 1 décimale en tout, donc 10,0 = **10**.\n'
            + '0,3 × 0,2 : je calcule 3 × 2 = 6. Il y a 2 décimales en tout, donc **0,06**.',
        },
      ],

      methode: {
        titre: 'Calculer 1,2 × 0,4',
        enonce: 'Calculer 1,2 × 0,4.',
        etapes: [
          { texte: '0,4 est plus petit que 1, donc le résultat sera plus petit que 1,2.', note: 'C\'est le contrôle, à faire AVANT.' },
          { texte: 'Je calcule sans virgules : 12 × 4 = 48.', note: '' },
          { texte: 'Il y a 1 + 1 = 2 chiffres après la virgule en tout.', note: '' },
          { texte: 'Je place la virgule : 0,48.', note: 'Et 0,48 est bien plus petit que 1,2.' },
        ],
        controle:
          'Le contrôle : compare ta réponse au premier nombre. Si tu as multiplié par '
          + 'moins de 1 et que ton résultat a grandi, c\'est faux.',
      },

      entrainement: [
        {
          id: 'e-1-5-1', type: 'calcul', palier: 1,
          consigne: 'Calcule.', enonce: '8 \\times 0{,}5', attendu: 4,
          fausses: [{ valeur: 40, piege: 'multiplier-rend-plus-grand' }, { valeur: 16, piege: 'multiplier-rend-plus-grand' }],
        },
        {
          // Neutre : ici le second facteur dépasse 1, le produit grandit bien.
          id: 'e-1-5-2', type: 'calcul', palier: 1, neutre: true,
          consigne: 'Calcule.', enonce: '6 \\times 2{,}5', attendu: 15,
        },
        {
          id: 'e-1-5-3', type: 'calcul', palier: 2,
          consigne: 'Calcule.', enonce: '2{,}5 \\times 4', attendu: 10,
          fausses: [{ valeur: 1, piege: 'virgule-decalee' }, { valeur: 100, piege: 'virgule-decalee' }],
        },
        {
          id: 'e-1-5-4', type: 'calcul', palier: 2,
          consigne: 'Calcule.', enonce: '0{,}3 \\times 0{,}2', attendu: 0.06,
          fausses: [{ valeur: 0.6, piege: 'virgule-decalee' }, { valeur: 6, piege: 'virgule-decalee' }],
        },
        {
          id: 'e-1-5-5', type: 'plausible', palier: 3,
          consigne: 'Sans calculer, ce résultat est-il plausible ?',
          enonce: '12 \\times 0{,}9 = 10{,}8', attendu: true,
          explication: '0,9 est un peu moins que 1, donc le résultat doit être un peu moins que 12. C\'est le cas.',
        },
        {
          id: 'e-1-5-6', type: 'plausible', palier: 3,
          consigne: 'Sans calculer, ce résultat est-il plausible ?',
          enonce: '20 \\times 0{,}4 = 80', attendu: false,
          explication: '0,4 est plus petit que 1 : le résultat doit être plus petit que 20. La vraie réponse est 8.',
        },
      ],

      problemes: [
        {
          id: 'p-1-5-1',
          enonce: 'Un tissu coûte 6 € le mètre.',
          questions: [
            { texte: 'Combien coûte 0,5 mètre ?', attendu: 3, unite: '€' },
            { texte: 'Et 2,5 mètres ?', attendu: 15, unite: '€' },
          ],
        },
        {
          id: 'p-1-5-2',
          enonce:
            'Une recette pour 4 personnes demande 0,75 L de lait.',
          questions: [
            { texte: 'Combien faut-il de lait pour 2 personnes ?', attendu: 0.375, unite: 'L' },
            { texte: 'Et pour 8 personnes ?', attendu: 1.5, unite: 'L' },
          ],
        },
        {
          id: 'p-1-5-3',
          enonce:
            'Un litre d\'essence coûte 1,8 €. Anto regarde le prix de plusieurs '
            + 'quantités.',
          questions: [
            { texte: 'Combien coûtent 0,5 L ?', attendu: 0.9, unite: '€' },
            { texte: 'Combien coûtent 10 L ?', attendu: 18, unite: '€' },
          ],
        },
      ],

      test: [
        { id: 't-1-5-1', type: 'calcul', enonce: '8 \\times 0{,}5', attendu: 4, revoir: 'propriete' },
        { id: 't-1-5-2', type: 'calcul', enonce: '6 \\times 2{,}5', attendu: 15, revoir: 'propriete' },
        { id: 't-1-5-3', type: 'calcul', enonce: '2{,}5 \\times 4', attendu: 10, revoir: 'exemple' },
        { id: 't-1-5-4', type: 'calcul', enonce: '0{,}3 \\times 0{,}2', attendu: 0.06, revoir: 'exemple' },
        { id: 't-1-5-5', type: 'calcul', enonce: '12 \\times 0{,}1', attendu: 1.2, revoir: 'propriete' },
        { id: 't-1-5-6', type: 'calcul', enonce: '20 \\times 0{,}4', attendu: 8, revoir: 'propriete' },
        { id: 't-1-5-7', type: 'calcul', enonce: '1{,}2 \\times 0{,}4', attendu: 0.48, revoir: 'exemple' },
        { id: 't-1-5-8', type: 'calcul', enonce: '9 \\times 0{,}5', attendu: 4.5, revoir: 'propriete' },
      ],
    },
  ],
};
