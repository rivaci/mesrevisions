// Chapitre 1, savoir-faire 2 — Appliquer les priorités : × et ÷ avant + et −.
//
// ── La phrase exacte du cahier ───────────────────────────────────────────
//
// « Additions et soustractions sont au même niveau de priorité. Multiplication
// et division sont à un même niveau mais supérieur aux additions et
// soustractions. » Et l'exemple qui suit : 2 + 3 × 5 = 2 + 15 = 17.
//
// ── Ce qui rend ce savoir-faire difficile ────────────────────────────────
//
// Ce n'est pas la règle, qui s'énonce en une phrase et que tout élève sait
// réciter. C'est qu'elle CONTREDIT une habitude installée depuis le CP : lire
// de gauche à droite. Et cette habitude reste vraie la moitié du temps — dans
// 12 − 4 − 3, elle donne le bon résultat.
//
// L'élève n'a donc pas à remplacer une règle par une autre, mais à apprendre
// QUAND chacune s'applique. C'est pourquoi presque un item sur trois est
// neutre : un calcul où il n'y a que des additions et des soustractions, et où
// l'ordre de lecture est la bonne méthode. Sans eux, on fabriquerait un élève
// qui cherche une multiplication là où il n'y en a pas.
//
// ── Le geste, plutôt que la formule ──────────────────────────────────────
//
// Le contrôle proposé n'est pas un moyen mnémotechnique mais un geste :
// SOULIGNER les × et les ÷ avant de commencer. Un moyen mnémotechnique se
// récite au moment où on y pense — c'est-à-dire jamais, puisque l'erreur
// consiste précisément à ne pas y penser. Un trait sur la feuille, lui, se voit.

export default {
  id: 'sf-1-2',
  titre: 'Appliquer les priorités opératoires',
  attendus: [
    'Il calcule une multiplication ou une division avant une addition ou une soustraction.',
    'Il reconnaît les calculs où l\'ordre de lecture suffit.',
  ],

  decouvrir: {
    titre: 'Le même calcul, deux résultats',
    texte:
      'Deux élèves calculent 2 + 3 × 5. Le premier lit de gauche à droite : '
      + 'il fait 2 + 3, puis multiplie par 5. Le second commence par la '
      + 'multiplication : il fait 3 × 5, puis ajoute 2.',
    lignes: [
      { calcul: 'Le premier élève', resultat: '(2 + 3) puis × 5' },
      { calcul: 'Le second élève', resultat: '2 + (3 × 5)' },
    ],
    question: 'Calcule les deux résultats.',
    champs: [
      { id: 'a', etiquette: 'le premier trouve', attendu: 25 },
      { id: 'b', etiquette: 'le second trouve', attendu: 17 },
    ],
    conclusion:
      'C\'est le **second** qui a raison : 2 + 3 × 5 = 2 + 15 = **17**.\n'
      + 'La multiplication et la division sont à un niveau **supérieur** à '
      + 'l\'addition et à la soustraction : elles se calculent d\'abord, où '
      + 'qu\'elles soient écrites dans la ligne.\n'
      + 'L\'ordre de lecture ne redevient la bonne méthode que lorsqu\'il n\'y a '
      + 'plus que des + et des −.',
  },

  cours: [
    {
      type: 'propriete',
      titre: 'Les deux niveaux',
      texte:
        '**Niveau du dessus** : la multiplication × et la division ÷.\n'
        + '**Niveau du dessous** : l\'addition + et la soustraction −.\n'
        + 'On calcule d\'abord tout le niveau du dessus, puis le niveau du '
        + 'dessous.',
    },
    {
      type: 'propriete',
      titre: 'À l\'intérieur d\'un même niveau',
      texte:
        'Une fois les niveaux respectés, on applique la règle du savoir-faire '
        + 'précédent : de gauche à droite.\n'
        + '**20 − 3 × 4 + 2** : on calcule 3 × 4 = 12, il reste 20 − 12 + 2, '
        + 'qu\'on lit de gauche à droite : 8 + 2 = **10**.',
    },
    {
      type: 'remarque',
      titre: 'La place dans la ligne ne donne aucun droit',
      texte:
        'Une multiplication écrite **à la fin** passe quand même en premier : '
        + 'dans 10 + 2 × 3, c\'est 2 × 3 qu\'on calcule d\'abord, bien qu\'il '
        + 'soit écrit en dernier.\n'
        + 'Et une addition écrite en premier attend son tour.',
    },
    {
      type: 'remarque',
      titre: 'Quand l\'ordre de lecture suffit',
      texte:
        'S\'il n\'y a **que** des additions et des soustractions, il n\'y a rien '
        + 'à prioriser : on lit de gauche à droite, et c\'est juste.\n'
        + 'De même s\'il n\'y a que des multiplications et des divisions. La règle '
        + 'des priorités ne sert que dans les **mélanges**.',
    },
    {
      type: 'exemple',
      texte:
        '2 + 3 × 5 = 17   ·   10 + 2 × 3 = 16   ·   20 − 3 × 4 + 2 = 10   ·   '
        + '12 − 4 − 3 = 5 (aucune priorité en jeu)',
    },
  ],

  methode: {
    titre: 'Calculer 20 − 3 × 4 + 2',
    enonce: 'Calculer 20 − 3 × 4 + 2.',
    etapes: [
      {
        texte: 'Je souligne les multiplications et les divisions : il y a 3 × 4.',
        note: 'Un trait sur la feuille, avant tout calcul. C\'est ce geste qui évite l\'erreur.',
      },
      { texte: 'Je calcule ce que j\'ai souligné : 3 × 4 = 12.', note: '' },
      {
        texte: 'Je recopie la ligne en remplaçant : 20 − 12 + 2.',
        note: 'Recopier évite de perdre un nombre en route.',
      },
      {
        texte: 'Il ne reste que des + et des − : je lis de gauche à droite. 20 − 12 = 8, puis 8 + 2 = 10.',
        note: '',
      },
      { texte: 'Donc 20 − 3 × 4 + 2 = 10.', note: '' },
    ],
    controle:
      'Le contrôle : compare ton résultat à celui qu\'on obtiendrait en lisant '
      + 'bêtement de gauche à droite (ici 20 − 3 = 17, × 4 = 68, + 2 = 70). Si '
      + 'les deux coïncident, vérifie — c\'est souvent qu\'on a oublié la '
      + 'priorité. S\'ils diffèrent nettement, c\'est bon signe.',
  },

  entrainement: [
    // ── Palier 1 : une seule multiplication dans une addition ──────────────
    {
      id: 'e-1-2-1', type: 'calcul', palier: 1, piege: 'priorite-ignoree',
      consigne: 'Calcule.', enonce: '2 + 3 \\times 5', attendu: 17,
      fausses: [{ valeur: 25, piege: 'priorite-ignoree' }],
    },
    {
      // La multiplication est écrite EN DERNIER et passe quand même devant.
      id: 'e-1-2-2', type: 'calcul', palier: 1, piege: 'priorite-ignoree',
      consigne: 'Calcule.', enonce: '12 + 4 \\times 5', attendu: 32,
      fausses: [{ valeur: 80, piege: 'priorite-ignoree' }],
    },
    {
      // NEUTRE. Que des soustractions : l'ordre de lecture est la bonne
      // méthode. Sans cet item, l'élève chercherait une priorité partout.
      id: 'e-1-2-3', type: 'calcul', palier: 1, neutre: true,
      consigne: 'Calcule.', enonce: '15 - 6 - 2', attendu: 7,
    },
    {
      id: 'e-1-2-4', type: 'calcul', palier: 1, piege: 'priorite-ignoree',
      consigne: 'Calcule.', enonce: '20 - 4 \\times 3', attendu: 8,
      fausses: [{ valeur: 48, piege: 'priorite-ignoree' }],
    },
    // ── Palier 2 : la division, et les mélanges à trois opérations ─────────
    {
      id: 'e-1-2-5', type: 'calcul', palier: 2, piege: 'priorite-ignoree',
      consigne: 'Calcule.', enonce: '7 + 12 \\div 4', attendu: 10,
      fausses: [
        // (7 + 12) ÷ 4 = 4,75 : l'ordre de lecture appliqué à une division.
        { valeur: 4.75, piege: 'priorite-ignoree' },
      ],
    },
    {
      id: 'e-1-2-6', type: 'calcul', palier: 2, piege: 'priorite-ignoree',
      consigne: 'Calcule.', enonce: '20 - 3 \\times 4 + 2', attendu: 10,
      fausses: [{ valeur: 70, piege: 'priorite-ignoree' }],
    },
    {
      // NEUTRE. Que des multiplications et des divisions : même niveau, donc
      // lecture de gauche à droite — et le piège de la division y guette.
      id: 'e-1-2-7', type: 'calcul', palier: 2, neutre: true, piege: 'division-de-gauche-a-droite',
      consigne: 'Calcule.', enonce: '30 \\div 5 \\times 2', attendu: 12,
      fausses: [{ valeur: 3, piege: 'division-de-gauche-a-droite' }],
    },
    {
      id: 'e-1-2-8', type: 'trous', palier: 2, piege: 'priorite-ignoree',
      consigne: 'Calcule 8 + 5 × 6 en deux étapes.',
      enonce: '8 + 5 \\times 6',
      champs: [
        { id: 'a', etiquette: 'ce qui est prioritaire : 5 × 6', attendu: 30 },
        { id: 'b', etiquette: 'résultat final', attendu: 38 },
      ],
    },
    // ── Palier 3 : deux opérations prioritaires dans la même ligne ─────────
    {
      id: 'e-1-2-9', type: 'calcul', palier: 3, piege: 'priorite-ignoree',
      consigne: 'Calcule.', enonce: '3 \\times 4 + 2 \\times 5', attendu: 22,
      fausses: [
        // 3 × 6 × 5 : l'élève enchaîne tout de gauche à droite.
        { valeur: 90, piege: 'priorite-ignoree' },
        // 12 + 2 = 14, puis × 5 : une seule des deux multiplications vue.
        { valeur: 70, piege: 'priorite-ignoree' },
      ],
    },
    {
      id: 'e-1-2-10', type: 'corriger', palier: 3, piege: 'priorite-ignoree',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{Calculer } 15 - 2 \\times 6',
      lignes: [
        { texte: 'Je repère la multiplication : 2 × 6.', fausse: false },
        { texte: 'Mais 15 − 2 est écrit avant, donc je le calcule en premier : 15 − 2 = 13.', fausse: true },
        { texte: 'Puis 13 × 6 = 78.', fausse: false },
        { texte: 'Donc 15 − 2 × 6 = 78.', fausse: false },
      ],
      explication:
        'La première ligne repère bien la multiplication, et la deuxième la '
        + 'laisse quand même passer après — au motif qu\'elle est écrite plus '
        + 'loin. Or la place dans la ligne ne donne aucun droit : 2 × 6 = 12 se '
        + 'calcule d\'abord, et il reste 15 − 12 = 3.',
    },
  ],

  problemes: [
    {
      id: 'p-1-2-1',
      enonce:
        'Antonin achète 3 stylos à 2 € pièce et un cahier à 4 €.',
      questions: [
        { texte: 'Combien coûtent les stylos ?', attendu: 6, unite: '€' },
        { texte: 'Combien paie-t-il en tout ?', attendu: 10, unite: '€' },
      ],
    },
    {
      id: 'p-1-2-2',
      enonce:
        'Une place de cinéma coûte 9 €. Une famille achète 4 places et '
        + 'dispose d\'un bon de réduction de 5 €.',
      questions: [
        { texte: 'Combien coûtent les places sans réduction ?', attendu: 36, unite: '€' },
        { texte: 'Combien la famille paie-t-elle finalement ?', attendu: 31, unite: '€' },
      ],
    },
    {
      id: 'p-1-2-3',
      enonce:
        'Un professeur distribue 5 feuilles à chacun de ses 24 élèves. Il '
        + 'avait 150 feuilles au départ.',
      questions: [
        { texte: 'Combien de feuilles distribue-t-il ?', attendu: 120, unite: 'feuilles' },
        { texte: 'Combien lui en reste-t-il ?', attendu: 30, unite: 'feuilles' },
      ],
    },
    {
      id: 'p-1-2-4',
      enonce:
        'Dans une boîte, il y a 48 billes. On en retire 8, puis on partage '
        + 'le reste entre 5 enfants.',
      questions: [
        { texte: 'Combien de billes reste-t-il à partager ?', attendu: 40, unite: 'billes' },
        { texte: 'Combien de billes reçoit chaque enfant ?', attendu: 8, unite: 'billes' },
      ],
    },
    {
      id: 'p-1-2-5',
      enonce:
        'Un menu comprend un plat à 12 € et un dessert à 5 €. Trois amis '
        + 'prennent le menu complet, et un quatrième prend seulement le plat.',
      questions: [
        { texte: 'Combien coûte un menu complet ?', attendu: 17, unite: '€' },
        { texte: 'Combien coûtent les trois menus complets ?', attendu: 51, unite: '€' },
        { texte: 'Combien coûte l\'addition totale ?', attendu: 63, unite: '€' },
      ],
    },
  ],

  test: [
    { id: 't-1-2-1', type: 'calcul', consigne: 'Calcule.', enonce: '4 + 2 \\times 6', attendu: 16, revoir: 'propriete' },
    { id: 't-1-2-2', type: 'calcul', consigne: 'Calcule.', enonce: '30 - 5 \\times 4', attendu: 10, revoir: 'propriete' },
    { id: 't-1-2-3', type: 'calcul', consigne: 'Calcule.', enonce: '9 + 20 \\div 5', attendu: 13, revoir: 'propriete' },
    { id: 't-1-2-4', type: 'calcul', consigne: 'Calcule.', enonce: '18 - 6 - 5', attendu: 7, revoir: 'remarque' },
    { id: 't-1-2-5', type: 'calcul', consigne: 'Calcule.', enonce: '2 \\times 7 + 3 \\times 4', attendu: 26, revoir: 'exemple' },
    {
      id: 't-1-2-6', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Une multiplication écrite à la fin du calcul se fait quand même en premier.',
      attendu: true, revoir: 'remarque',
    },
    { id: 't-1-2-7', type: 'calcul', consigne: 'Calcule.', enonce: '40 - 2 \\times 8 + 1', attendu: 25, revoir: 'propriete' },
    {
      id: 't-1-2-8', type: 'trous', consigne: 'Calcule 6 + 7 × 3 en deux étapes.',
      enonce: '6 + 7 \\times 3',
      champs: [
        { id: 'a', etiquette: 'ce qui est prioritaire : 7 × 3', attendu: 21 },
        { id: 'b', etiquette: 'résultat final', attendu: 27 },
      ],
      revoir: 'propriete',
    },
    { id: 't-1-2-9', type: 'calcul', consigne: 'Calcule.', enonce: '50 \\div 10 \\times 3', attendu: 15, revoir: 'remarque' },
    {
      id: 't-1-2-10', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Quand un calcul ne contient que des additions et des soustractions, on le lit de gauche à droite.',
      attendu: true, revoir: 'remarque',
    },
  ],
};
