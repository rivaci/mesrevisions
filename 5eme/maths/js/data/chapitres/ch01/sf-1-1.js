// Chapitre 1, savoir-faire 1 — Enchaîner des opérations de même niveau.
//
// ── Pourquoi celui-ci vient en premier ───────────────────────────────────
//
// Le cours d'Antonin ouvre exactement là-dessus : « Dans une suite d'additions,
// l'ordre ne change pas. Dans un mélange d'additions et de soustractions, les
// opérations se font dans l'ordre de la lecture. » Puis la même phrase pour les
// multiplications et les divisions.
//
// C'est plus subtil que ça n'en a l'air. La phrase dit DEUX choses opposées :
// pour + et ×, l'ordre est libre ; pour − et ÷, il ne l'est pas. Un élève qui
// n'entend que la première moitié calcule 20 − 5 − 3 = 18. Un élève qui
// n'entend que la seconde s'interdit tout regroupement astucieux, y compris
// quand il est permis.
//
// ── L'ordre de traitement compte ─────────────────────────────────────────
//
// Ce savoir-faire précède celui des priorités, et ce n'est pas l'ordre des
// manuels. La raison : « on calcule de gauche à droite » est une règle VRAIE
// que l'élève va ensuite devoir restreindre. Il faut donc l'installer
// correctement — avec son domaine de validité — avant que le savoir-faire 2 ne
// vienne dire « sauf quand il y a un × ». Faire l'inverse produit un élève qui
// croit que la lecture de gauche à droite est toujours fausse.
//
// ── Le vocabulaire est dans le cours, pas dans les réponses ──────────────
//
// Somme, différence, produit, quotient : le cours d'Antonin les nomme, et les
// blocs de définition les reprennent. Mais l'application ne fait taper que des
// NOMBRES — les champs de réponse sont numériques. Le vocabulaire est donc
// travaillé par des « vrai ou faux », jamais par une réponse à écrire.

export default {
  id: 'sf-1-1',
  titre: 'Enchaîner des opérations de même niveau',
  attendus: [
    'Il sait que l\'ordre est libre entre additions, et entre multiplications.',
    'Il calcule de gauche à droite une suite de soustractions ou de divisions.',
    'Il nomme le résultat d\'une addition, d\'une soustraction, d\'une multiplication et d\'une division.',
  ],

  // On ne dit pas la règle : on fait calculer les deux versions du même
  // enchaînement, et l'écart apparaît tout seul. Le passage par 20 − (5 − 3)
  // est essentiel : c'est exactement ce que fait l'élève qui se trompe, et le
  // voir écrit noir sur blanc vaut mieux que de le lui interdire.
  decouvrir: {
    titre: 'Deux façons de lire le même calcul',
    texte:
      'On veut calculer 20 − 5 − 3. Deux élèves s\'y prennent différemment : '
      + 'le premier enlève 5, puis enlève 3. Le second calcule d\'abord 5 − 3, '
      + 'et enlève le résultat.',
    lignes: [
      { calcul: 'Le premier élève', resultat: '(20 − 5) puis − 3' },
      { calcul: 'Le second élève', resultat: '20 − (5 − 3)' },
    ],
    question: 'Calcule les deux. Que trouve chacun ?',
    champs: [
      { id: 'a', etiquette: 'le premier trouve', attendu: 12 },
      { id: 'b', etiquette: 'le second trouve', attendu: 18 },
    ],
    conclusion:
      'Les deux résultats diffèrent, donc l\'ordre **compte**. C\'est le premier '
      + 'qui a raison : on lit de gauche à droite. Enlever 5 puis 3, c\'est '
      + 'enlever 8 en tout — le second élève a rendu 3 au lieu de les enlever.\n'
      + 'Avec des additions, la question ne se poserait pas : 20 + 5 + 3 donne '
      + '28 quel que soit l\'ordre.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Le nom de chaque résultat',
      texte:
        'Le résultat d\'une addition est une **somme**. Les nombres additionnés '
        + 'sont ses **termes**.\n'
        + 'Le résultat d\'une soustraction est une **différence**.\n'
        + 'Le résultat d\'une multiplication est un **produit**. Les nombres '
        + 'multipliés sont ses **facteurs**.\n'
        + 'Le résultat d\'une division est un **quotient**.',
    },
    {
      type: 'propriete',
      titre: 'Avec + et ×, l\'ordre est libre',
      texte:
        'Dans une suite d\'**additions**, on peut calculer dans l\'ordre qu\'on '
        + 'veut : 7 + 25 + 3 = 35, qu\'on commence par 7 + 25 ou par 7 + 3.\n'
        + 'Dans une suite de **multiplications**, c\'est pareil : '
        + '2 × 17 × 5 = 170, qu\'on commence par 2 × 17 ou par 2 × 5.',
    },
    {
      type: 'propriete',
      titre: 'Avec − et ÷, on lit de gauche à droite',
      texte:
        'Dès qu\'une **soustraction** entre dans le calcul, on suit l\'ordre de '
        + 'la lecture : 20 − 5 − 3 = 15 − 3 = **12**.\n'
        + 'Dès qu\'une **division** entre dans le calcul, de même : '
        + '24 ÷ 6 ÷ 2 = 4 ÷ 2 = **2**.\n'
        + 'C\'est aussi vrai dans un mélange : 18 − 4 + 7 se calcule '
        + '(18 − 4) + 7 = 21.',
    },
    {
      // La remarque du cahier d'Antonin, « penser aux groupements », dite avec
      // sa condition. Sans elle, elle devient le piège « groupement-abusif ».
      type: 'remarque',
      titre: 'Penser aux groupements — mais regarder le signe d\'abord',
      texte:
        'Regrouper pour tomber sur un compte rond fait gagner du temps : dans '
        + '17 + 25 + 3, on calcule 17 + 3 = 20, puis 20 + 25 = **45**.\n'
        + 'Mais on ne peut rapprocher deux nombres que s\'ils ont le **même '
        + 'rôle**. Dans 17 − 25 + 3, le 25 est enlevé et le 3 ajouté : les '
        + 'regrouper changerait le résultat.',
    },
    {
      type: 'exemple',
      texte:
        '20 − 5 − 3 = 12   ·   24 ÷ 6 ÷ 2 = 2   ·   18 − 4 + 7 = 21   ·   '
        + '7 + 25 + 3 = 35 (en regroupant 7 + 3)',
    },
  ],

  methode: {
    titre: 'Calculer 30 − 12 − 8',
    enonce: 'Calculer 30 − 12 − 8.',
    etapes: [
      {
        texte: 'Je repère qu\'il n\'y a que des soustractions : l\'ordre compte.',
        note: 'S\'il n\'y avait que des additions, je pourrais commencer où je veux.',
      },
      {
        texte: 'Je calcule les deux premiers nombres : 30 − 12 = 18.',
        note: 'De gauche à droite, toujours.',
      },
      { texte: 'Puis j\'enlève le troisième : 18 − 8 = 10.', note: '' },
      { texte: 'Donc 30 − 12 − 8 = 10.', note: '' },
    ],
    controle:
      'Le contrôle : enlever 12 puis 8, c\'est enlever 20 en tout. Or '
      + '30 − 20 = 10 : ça concorde. Si tu avais trouvé 26, c\'est que tu as '
      + 'calculé 12 − 8 d\'abord — et rendu 8 au lieu de les enlever.',
  },

  entrainement: [
    // ── Palier 1 : une seule opération répétée ─────────────────────────────
    {
      id: 'e-1-1-1', type: 'calcul', palier: 1, piege: 'soustraction-de-gauche-a-droite',
      consigne: 'Calcule.', enonce: '20 - 5 - 3', attendu: 12,
      fausses: [{ valeur: 18, piege: 'soustraction-de-gauche-a-droite' }],
    },
    {
      // NEUTRE. Que des additions : l'ordre est libre, et aucun piège ne peut
      // jouer. Sans cet item, « il faut toujours aller de gauche à droite »
      // deviendrait une contrainte au lieu d'une règle avec un domaine.
      id: 'e-1-1-2', type: 'calcul', palier: 1, neutre: true,
      consigne: 'Calcule.', enonce: '9 + 36 + 1', attendu: 46,
    },
    {
      id: 'e-1-1-3', type: 'calcul', palier: 1, piege: 'division-de-gauche-a-droite',
      consigne: 'Calcule.', enonce: '60 \\div 5 \\div 3', attendu: 4,
      fausses: [{ valeur: 36, piege: 'division-de-gauche-a-droite' }],
    },
    {
      id: 'e-1-1-4', type: 'vraifaux', palier: 1,
      consigne: 'Vrai ou faux ?',
      affirmation: 'Le résultat d\'une multiplication s\'appelle un produit.',
      attendu: true,
    },
    // ── Palier 2 : les mélanges de même niveau ─────────────────────────────
    {
      id: 'e-1-1-5', type: 'calcul', palier: 2, piege: 'soustraction-de-gauche-a-droite',
      consigne: 'Calcule.', enonce: '23 - 6 + 9', attendu: 26,
      fausses: [
        // 23 − 15 : l'élève a regroupé 6 + 9 alors que le 6 est retranché.
        { valeur: 8, piege: 'groupement-abusif' },
      ],
    },
    {
      id: 'e-1-1-6', type: 'calcul', palier: 2, piege: 'division-de-gauche-a-droite',
      consigne: 'Calcule.', enonce: '100 \\div 10 \\div 2', attendu: 5,
      fausses: [{ valeur: 20, piege: 'division-de-gauche-a-droite' }],
    },
    {
      // NEUTRE. Que des multiplications : le regroupement astucieux est ici
      // parfaitement permis, et même recommandé (2 × 5 = 10).
      id: 'e-1-1-7', type: 'calcul', palier: 2, neutre: true,
      consigne: 'Calcule.', enonce: '5 \\times 19 \\times 2', attendu: 190,
    },
    {
      id: 'e-1-1-8', type: 'trous', palier: 2, piege: 'soustraction-de-gauche-a-droite',
      consigne: 'Calcule 40 − 15 − 9 en deux étapes.',
      enonce: '40 - 15 - 9',
      champs: [
        { id: 'a', etiquette: 'première étape : 40 − 15', attendu: 25 },
        { id: 'b', etiquette: 'résultat final', attendu: 16 },
      ],
    },
    // ── Palier 3 : décider si le regroupement est permis ───────────────────
    {
      id: 'e-1-1-9', type: 'calcul', palier: 3, piege: 'groupement-abusif',
      consigne: 'Calcule.', enonce: '17 - 25 + 3', attendu: -5,
      fausses: [
        // 17 − 28 : le 25 et le 3 ont été regroupés, alors que l'un est enlevé
        // et l'autre ajouté.
        { valeur: -11, piege: 'groupement-abusif' },
      ],
    },
    {
      id: 'e-1-1-10', type: 'corriger', palier: 3, piege: 'division-de-gauche-a-droite',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{Calculer } 36 \\div 3 \\div 2',
      lignes: [
        { texte: 'Il n\'y a que des divisions, donc je lis de gauche à droite.', fausse: false },
        { texte: 'Je commence par la droite : 3 ÷ 2 = 1,5.', fausse: true },
        { texte: 'Puis 36 ÷ 1,5 = 24.', fausse: false },
        { texte: 'Donc 36 ÷ 3 ÷ 2 = 24.', fausse: false },
      ],
      explication:
        'La première ligne annonce la bonne règle, et la deuxième fait '
        + 'exactement le contraire : elle commence par la droite. Les deux '
        + 'lignes suivantes sont des calculs justes, mais sur un mauvais départ. '
        + 'Il fallait 36 ÷ 3 = 12, puis 12 ÷ 2 = 6.',
    },
  ],

  problemes: [
    {
      id: 'p-1-1-1',
      enonce:
        'Antonin avait 50 € sur sa carte cadeau. Il achète un livre à 13 €, '
        + 'puis un jeu à 22 €.',
      questions: [
        { texte: 'Combien lui reste-t-il après le livre ?', attendu: 37, unite: '€' },
        { texte: 'Combien lui reste-t-il à la fin ?', attendu: 15, unite: '€' },
      ],
    },
    {
      id: 'p-1-1-2',
      enonce:
        'Une plaquette contient 24 carrés de chocolat. On la partage entre '
        + '3 amis, puis chacun partage sa part en 2 pour la garder pour le '
        + 'lendemain.',
      questions: [
        { texte: 'Combien de carrés reçoit chaque ami ?', attendu: 8, unite: 'carrés' },
        { texte: 'Combien de carrés y a-t-il dans chaque moitié ?', attendu: 4, unite: 'carrés' },
      ],
    },
    {
      id: 'p-1-1-3',
      enonce:
        'Dans un bus, il y a 32 passagers. À un arrêt, 9 descendent et '
        + '14 montent. À l\'arrêt suivant, 6 descendent.',
      questions: [
        { texte: 'Combien de passagers après le premier arrêt ?', attendu: 37, unite: 'passagers' },
        { texte: 'Combien de passagers après le second arrêt ?', attendu: 31, unite: 'passagers' },
      ],
    },
    {
      id: 'p-1-1-4',
      enonce:
        'Un cahier coûte 3 €. Antonin en achète 4, et sa sœur en achète 5.',
      questions: [
        { texte: 'Combien de cahiers en tout ?', attendu: 9, unite: 'cahiers' },
        { texte: 'Combien coûtent-ils en tout, en euros ?', attendu: 27, unite: '€' },
      ],
    },
    {
      id: 'p-1-1-5',
      enonce:
        'Une salle contient 6 rangées de 5 chaises. On ajoute 2 rangées '
        + 'identiques, puis on retire 4 chaises cassées.',
      questions: [
        { texte: 'Combien de chaises au départ ?', attendu: 30, unite: 'chaises' },
        { texte: 'Combien après avoir ajouté les rangées ?', attendu: 40, unite: 'chaises' },
        { texte: 'Combien de chaises utilisables à la fin ?', attendu: 36, unite: 'chaises' },
      ],
    },
  ],

  test: [
    { id: 't-1-1-1', type: 'calcul', consigne: 'Calcule.', enonce: '30 - 12 - 8', attendu: 10, revoir: 'propriete' },
    { id: 't-1-1-2', type: 'calcul', consigne: 'Calcule.', enonce: '9 + 14 + 6', attendu: 29, revoir: 'propriete' },
    { id: 't-1-1-3', type: 'calcul', consigne: 'Calcule.', enonce: '48 \\div 4 \\div 3', attendu: 4, revoir: 'propriete' },
    { id: 't-1-1-4', type: 'calcul', consigne: 'Calcule.', enonce: '25 - 8 + 6', attendu: 23, revoir: 'exemple' },
    {
      id: 't-1-1-5', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Dans une suite de soustractions, on peut commencer par les deux derniers nombres.',
      attendu: false, revoir: 'propriete',
    },
    { id: 't-1-1-6', type: 'calcul', consigne: 'Calcule.', enonce: '4 \\times 13 \\times 5', attendu: 260, revoir: 'propriete' },
    {
      id: 't-1-1-7', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Le résultat d\'une soustraction s\'appelle une différence.',
      attendu: true, revoir: 'definition',
    },
    { id: 't-1-1-8', type: 'calcul', consigne: 'Calcule.', enonce: '14 - 20 + 3', attendu: -3, revoir: 'remarque' },
    {
      id: 't-1-1-9', type: 'trous', consigne: 'Calcule 60 − 25 − 11 en deux étapes.',
      enonce: '60 - 25 - 11',
      champs: [
        { id: 'a', etiquette: 'première étape : 60 − 25', attendu: 35 },
        { id: 'b', etiquette: 'résultat final', attendu: 24 },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-1-1-10', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Dans une suite d\'additions, on peut regrouper les nombres comme on veut.',
      attendu: true, revoir: 'remarque',
    },
  ],
};
