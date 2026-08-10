// Savoir-faire 7-3 — Réduire une expression.
//
// ── Pourquoi ce savoir-faire est écrit avec le type `expression` ───────────
//
// Reconnaître « 3x + 2 » parmi trois propositions ne coûte rien : la bonne
// réponse est sous les yeux, et le réflexe de concaténation ne se déclenche
// même pas. Il faut que l'élève ÉCRIVE, parce que c'est au moment d'écrire
// qu'il décide de finir la somme ou de la laisser telle quelle. Le moteur
// vérifie l'équivalence en remplaçant x par des nombres : toute écriture qui
// vaut la même chose est acceptée, l'élève n'a donc pas à deviner une forme.
//
// ── Le cœur : une expression peut être une réponse ────────────────────────
//
// La concaténation (3x + 2 → 5x) n'est pas une étourderie de calcul. C'est
// une conviction sur ce qu'est une réponse : héritée du primaire, où le signe
// = annonçait toujours un nombre unique. Tant que cette conviction tient,
// aucune règle sur les termes semblables ne s'installera.
//
// D'où le choix qui structure tout le savoir-faire : plusieurs exercices dont
// la BONNE réponse est l'expression de départ, recopiée telle quelle. Rien
// d'autre ne fait vivre à l'élève qu'« il n'y a rien à faire » est un travail
// achevé, et pas un abandon.
//
// ── Et l'item neutre, dans l'autre sens ───────────────────────────────────
//
// Le risque symétrique est réel : à force de rencontrer des expressions déjà
// réduites, on apprend « ne jamais additionner ». L'item neutre est donc une
// somme entièrement réductible, où finir le calcul est exactement ce qu'il
// faut faire.

export default {
  id: 'sf-7-3',
  titre: 'Réduire une expression',
  attendus: [
    'Il réduit une expression littérale du premier degré, du type 3x − (4x − 2).',
    'Il reconnaît qu\'une expression littérale peut être déjà réduite.',
  ],

  // On ne dit pas la règle : on met une somme « finie » et une somme laissée
  // telle quelle face à face, et on laisse un nombre trancher. C'est le geste
  // de contrôle de tout le chapitre, installé avant même le vocabulaire.
  decouvrir: {
    titre: 'Une somme qu\'on ne peut pas finir',
    texte:
      'On demande d\'écrire 4x + 3 le plus simplement possible. Voici deux copies, '
      + 'et elles ne disent pas la même chose.',
    copies: [
      { nom: 'Sacha', calcul: '4x + 3 = 7x', resultat: '7x' },
      { nom: 'Inès', calcul: 'On ne peut pas aller plus loin', resultat: '4x + 3' },
    ],
    question:
      'Pour départager, remplace x par 5 dans les deux écritures et calcule '
      + 'chacune d\'elles.',
    champs: [
      { id: 'a', etiquette: 'avec x = 5, 4x + 3 vaut', attendu: 23 },
      { id: 'b', etiquette: 'avec x = 5, 7x vaut', attendu: 35 },
    ],
    conclusion:
      'Les deux écritures ne donnent pas le même nombre : **4x + 3 et 7x ne sont '
      + 'pas la même chose**. C\'est **Inès** qui a raison. Le 4 compte des x, le 3 '
      + 'compte des unités — les additionner reviendrait à ajouter 4 pommes et '
      + '3 heures. Une expression peut être **déjà réduite**, et c\'est alors une '
      + 'réponse complète.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Termes, et termes semblables',
      texte:
        'Dans une somme, les **termes** sont les morceaux séparés par les signes '
        + '+ et −. Le signe fait partie du terme qui le suit.\n'
        + 'Deux termes sont **semblables** quand ils ont la même partie littérale : '
        + 'la même lettre, avec le même exposant.\n'
        + '3x et −7x sont semblables. 3x et 3x² ne le sont pas, 3x et 2 non plus.',
    },
    {
      type: 'propriete',
      titre: 'Réduire une somme',
      texte:
        'Deux termes **semblables** s\'additionnent : on additionne leurs '
        + '**coefficients** et on garde la partie littérale.\n'
        + '7x + 6x = 13x, et 8x − 3x = 5x.\n'
        + 'Deux termes qui ne sont **pas** semblables restent tels quels : il n\'y '
        + 'a rien à faire de plus.',
    },
    {
      // Le coefficient sous-entendu : source d'erreurs silencieuses, parce que
      // l'élève ne voit pas de nombre et n'en compte donc aucun.
      type: 'remarque',
      titre: 'Quand aucun nombre n\'est écrit devant la lettre',
      texte:
        'x, c\'est **1x** : le coefficient vaut 1, même s\'il n\'est pas écrit. '
        + 'De même, −x, c\'est −1x.\n'
        + 'Donc x + 6x = 7x, et 4x − x = 3x.',
    },
    {
      // La remarque qui porte tout le savoir-faire. Elle est écrite comme une
      // permission, pas comme un avertissement : ce qui bloque l'élève, c'est
      // de croire qu'il n'a pas le droit de s'arrêter.
      type: 'remarque',
      titre: 'Une expression peut être déjà réduite',
      texte:
        'Devant 3x + 2, il n\'y a rien à réduire : 3x compte des x, 2 compte des '
        + 'unités. Écrire 5x serait **faux**.\n'
        + '« 3x + 2 » est une réponse complète, au même titre qu\'un nombre. En '
        + 'algèbre, c\'est même le cas le plus fréquent.',
    },
    {
      type: 'exemple',
      texte:
        '8x + 3 − 5x + 7 = 3x + 10   ·   x + x² ne se réduit pas\n'
        + '5a + 2a = 7a : la lettre peut changer, la règle non.',
    },
  ],

  methode: {
    titre: 'Réduire pas à pas',
    enonce: 'Réduire E = 8x − 5 + 3x + 2 − x.',
    etapes: [
      {
        texte: 'Je repère les termes avec leur signe : 8x, −5, +3x, +2, −x.',
        note: 'Le signe appartient au terme qui le suit : le « − » de −5 est à lui.',
      },
      {
        texte: 'Je regroupe les termes semblables : les x d\'un côté, les nombres seuls de l\'autre.',
        note: '8x + 3x − x d\'un côté, −5 + 2 de l\'autre.',
      },
      {
        texte: 'J\'additionne les coefficients des x : 8 + 3 − 1 = 10, donc 10x.',
        note: '« −x », c\'est « −1x » : son coefficient vaut −1, pas 0.',
      },
      {
        texte: 'Je fais la somme des nombres seuls : −5 + 2 = −3.',
        note: '',
      },
      {
        texte: 'Donc E = 10x − 3.',
        note: 'Les deux termes restants ne sont pas semblables : c\'est terminé.',
      },
    ],
    controle:
      'Le contrôle, et c\'est LE geste de tout le calcul littéral : remplace x par '
      + 'un nombre — 3 par exemple, jamais 0 ni 1 ni 2, qui rendent trop d\'écritures '
      + 'égales par hasard. L\'expression de départ et ta réponse doivent donner le '
      + 'MÊME nombre. Ici : 8 × 3 − 5 + 3 × 3 + 2 − 3 = 27, et 10 × 3 − 3 = 27. '
      + 'C\'est juste. Ce contrôle marche en contrôle, sans l\'appli, et il ne se '
      + 'trompe jamais.',
  },

  entrainement: [
    {
      // Item neutre, et il ouvre volontairement le palier. Tous les termes sont
      // semblables : « finir la somme » donne ici exactement la bonne réponse,
      // donc le piège de la concaténation ne joue pas. Sans lui, ce savoir-faire
      // enseignerait la règle inverse — « ne jamais additionner » — qui est tout
      // aussi fausse et qui bloquerait l'élève au chapitre suivant.
      id: 'e-7-3-1', type: 'expression', palier: 1, neutre: true, piege: 'concatenation',
      consigne: 'Réduis cette expression.',
      enonce: '5x + 3x', attendu: '8x',
      // Aucune réponse fausse n'est prévisible ici, et c'est cohérent : le piège
      // du moment ne se déclenche pas, et aucun autre piège du chapitre ne peut
      // jouer sur une somme de termes semblables, sans parenthèse ni exposant.
      // `fausses` reste donc vide plutôt que de rattacher une erreur inventée à
      // un piège qui dirait autre chose à l'élève.
      fausses: [],
    },
    {
      // Première expression déjà réduite : la bonne réponse est l'énoncé lui-même.
      id: 'e-7-3-2', type: 'expression', palier: 1, piege: 'concatenation',
      consigne: 'Réduis cette expression si c\'est possible. Sinon, recopie-la telle quelle.',
      enonce: '3x + 7', attendu: '3x+7',
      fausses: [
        { valeur: '10x', piege: 'concatenation' },
        { valeur: '10', piege: 'concatenation' },
      ],
    },
    {
      id: 'e-7-3-3', type: 'expression', palier: 1, piege: 'concatenation',
      consigne: 'Réduis cette expression.',
      enonce: '9x - 4x', attendu: '5x',
      fausses: [
        { valeur: '5', piege: 'concatenation' },
      ],
    },
    {
      // Même situation que l'item 2, mais les termes sont dans l'autre ordre :
      // la réponse n'est plus une recopie littérale de l'énoncé, il faut avoir
      // compris qu'il n'y a rien à faire plutôt que reconnaître une forme.
      id: 'e-7-3-4', type: 'expression', palier: 1, piege: 'concatenation',
      consigne: 'Réduis cette expression si c\'est possible. Sinon, recopie-la telle quelle.',
      enonce: '7 + 5x', attendu: '5x+7',
      fausses: [
        { valeur: '12x', piege: 'concatenation' },
        { valeur: '12', piege: 'concatenation' },
      ],
    },
    {
      id: 'e-7-3-5', type: 'expression', palier: 2, piege: 'concatenation',
      consigne: 'Réduis cette expression.',
      enonce: '6x - 5 + 2x + 9', attendu: '8x+4',
      fausses: [
        { valeur: '12x', piege: 'concatenation' },
        { valeur: '12', piege: 'concatenation' },
      ],
    },
    {
      id: 'e-7-3-6', type: 'expression', palier: 2, piege: 'concatenation',
      consigne: 'Réduis cette expression.',
      enonce: 'x + 7x - 3', attendu: '8x-3',
      fausses: [
        { valeur: '5x', piege: 'concatenation' },
        { valeur: '4x', piege: 'concatenation' },
      ],
    },
    {
      id: 'e-7-3-7', type: 'expression', palier: 2, piege: 'concatenation',
      consigne: 'Réduis cette expression.',
      enonce: '10 - 4x + 3x - 2', attendu: '-x+8',
      fausses: [
        { valeur: '7x', piege: 'concatenation' },
        { valeur: '7', piege: 'concatenation' },
      ],
    },
    {
      // On change de piège : ici les x se réduisent, mais pas le x². Une
      // réduction PARTIELLE, c'est-à-dire le cas où il faut à la fois savoir
      // additionner et savoir s'arrêter.
      id: 'e-7-3-8', type: 'expression', palier: 3, piege: 'reduction-de-termes-non-semblables',
      consigne: 'Réduis cette expression.',
      enonce: '4x + x^{2} + 3x', attendu: 'x^2+7x',
      fausses: [
        { valeur: '8x^2', piege: 'reduction-de-termes-non-semblables' },
        { valeur: '8x', piege: 'reduction-de-termes-non-semblables' },
      ],
    },
    {
      id: 'e-7-3-9', type: 'vraifaux', palier: 3, piege: 'reduction-de-termes-non-semblables',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'L\'expression x + x² se réduit en 2x².',
      attendu: false,
      contreExemple: {
        invite: 'Choisis une valeur de x pour laquelle x + x² et 2x² ne donnent pas le même nombre.',
        champs: [{ id: 'a', etiquette: 'valeur de x' }],
        // On vérifie la PROPRIÉTÉ qui rend le contre-exemple valable — les deux
        // écritures donnent des nombres différents — et non une valeur imposée.
        // Presque tout nombre convient : l'élève choisit le sien.
        valide: (a) => a + a * a !== 2 * a * a,
        temoin: [3],
        exemple: 'Avec x = 3 : x + x² fait 3 + 9 = 12, alors que 2x² en ferait 18.',
      },
    },
    {
      id: 'e-7-3-10', type: 'corriger', palier: 3, piege: 'concatenation',
      consigne: 'Cette réduction est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '9x - 4 + 2x',
      lignes: [
        { texte: '9x − 4 + 2x', fausse: false },
        { texte: '= 11x − 4', fausse: false },
        { texte: '= 7x', fausse: true },
      ],
      explication:
        'Les deux premières lignes sont justes : 9x et 2x sont semblables, ils '
        + 'donnent bien 11x. C\'est la troisième qui casse — 11x compte des x, '
        + '4 compte des unités, on ne peut pas les soustraire l\'un de l\'autre. '
        + 'La réponse s\'arrête à 11x − 4, qui est déjà réduite. Vérifie avec '
        + 'x = 3 : 11 × 3 − 4 = 29, alors que 7 × 3 en ferait 21.',
    },
  ],

  problemes: [
    {
      id: 'p-7-3-1',
      enonce:
        'Un triangle a pour côtés 3x, 2x et x + 4, en centimètres. Son périmètre '
        + 'réduit s\'écrit donc 6x + 4.',
      questions: [
        { texte: 'Quel est son périmètre lorsque x = 5 ?', attendu: 34, unite: 'cm' },
        { texte: 'Et lorsque x = 9 ?', attendu: 58, unite: 'cm' },
      ],
    },
    {
      id: 'p-7-3-2',
      enonce:
        'Voici un programme de calcul : choisis un nombre, multiplie-le par 4, '
        + 'ajoute 6, puis ajoute encore le triple du nombre choisi.',
      questions: [
        { texte: 'Quel résultat obtiens-tu en partant de 5 ?', attendu: 41 },
        { texte: 'Et en partant de 10 ?', attendu: 76 },
      ],
    },
    {
      id: 'p-7-3-3',
      enonce:
        'Au marché, une barquette de fraises coûte x euros et un melon coûte 3 €. '
        + 'Léa achète 4 barquettes et 2 melons, Tom achète 3 barquettes et 1 melon. '
        + 'Ce jour-là, la barquette est à 4 €.',
      questions: [
        { texte: 'Combien Léa dépense-t-elle ?', attendu: 22, unite: '€' },
        { texte: 'Combien Tom dépense-t-il ?', attendu: 15, unite: '€' },
        { texte: 'Combien dépensent-ils à eux deux ?', attendu: 37, unite: '€' },
      ],
    },
    {
      id: 'p-7-3-4',
      enonce:
        'Un jardin rectangulaire mesure x mètres de long et 8 mètres de large. '
        + 'On veut l\'entourer entièrement d\'une clôture.',
      questions: [
        { texte: 'Quelle longueur de clôture faut-il si x = 15 ?', attendu: 46, unite: 'm' },
        { texte: 'Et si x = 22 ?', attendu: 60, unite: 'm' },
      ],
    },
    {
      id: 'p-7-3-5',
      enonce:
        'Dans un jeu, chaque pièce d\'or vaut x points et chaque gemme vaut '
        + '12 points. Marc ramasse 5 pièces d\'or et 2 gemmes, puis 3 pièces d\'or '
        + 'de plus, et il perd enfin une gemme.',
      questions: [
        { texte: 'Combien de pièces d\'or possède-t-il à la fin ?', attendu: 8, unite: 'pièces' },
        { texte: 'Combien de gemmes lui reste-t-il ?', attendu: 1, unite: 'gemme' },
        { texte: 'Combien marque-t-il de points si une pièce d\'or vaut 7 points ?', attendu: 68, unite: 'points' },
      ],
    },
  ],

  test: [
    {
      id: 't-7-3-1', type: 'expression',
      consigne: 'Réduis cette expression.',
      enonce: '7x + 5x', attendu: '12x', revoir: 'propriete',
    },
    {
      id: 't-7-3-2', type: 'expression',
      consigne: 'Réduis cette expression si c\'est possible. Sinon, recopie-la telle quelle.',
      enonce: '4x + 9', attendu: '4x+9',
      fausses: [{ valeur: '13x', piege: 'concatenation' }],
      revoir: 'remarque',
    },
    {
      id: 't-7-3-3', type: 'expression',
      consigne: 'Réduis cette expression.',
      enonce: '11x - 6x', attendu: '5x',
      fausses: [{ valeur: '5', piege: 'concatenation' }],
      revoir: 'propriete',
    },
    {
      id: 't-7-3-4', type: 'expression',
      consigne: 'Réduis cette expression.',
      enonce: '3x + 8 + 5x - 2', attendu: '8x+6',
      fausses: [{ valeur: '14x', piege: 'concatenation' }],
      revoir: 'exemple',
    },
    {
      id: 't-7-3-5', type: 'expression',
      consigne: 'Réduis cette expression.',
      enonce: 'x + 9x', attendu: '10x',
      fausses: [{ valeur: '9x', piege: 'concatenation' }],
      revoir: 'remarque',
    },
    {
      id: 't-7-3-6', type: 'expression',
      consigne: 'Réduis cette expression.',
      enonce: '5x + x^{2} + x', attendu: 'x^2+6x',
      fausses: [{ valeur: '7x', piege: 'reduction-de-termes-non-semblables' }],
      revoir: 'definition',
    },
    {
      id: 't-7-3-7', type: 'expression',
      consigne: 'Réduis cette expression.',
      enonce: '12 - 5x + 2x - 3', attendu: '-3x+9',
      fausses: [{ valeur: '6x', piege: 'concatenation' }],
      revoir: 'exemple',
    },
    {
      id: 't-7-3-8', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '4x + 6x = 10x', attendu: true,
      explication:
        '4x et 6x sont semblables : ils comptent tous les deux des x. On '
        + 'additionne donc leurs coefficients, 4 + 6 = 10. Vérification avec '
        + 'x = 3 : 12 + 18 = 30, et 10 × 3 = 30.',
      revoir: 'propriete',
    },
    {
      id: 't-7-3-9', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '6x + 3 = 9x', attendu: false,
      explication:
        '6x compte des x, 3 compte des unités : ces deux termes ne sont pas '
        + 'semblables, la somme ne peut pas être finie. Avec x = 3 : 18 + 3 = 21, '
        + 'alors que 9 × 3 en ferait 27. L\'expression 6x + 3 est déjà réduite.',
      piege: 'concatenation', revoir: 'remarque',
    },
    {
      id: 't-7-3-10', type: 'corriger',
      consigne: 'Cette réduction est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '8x + x^{2}',
      lignes: [
        { texte: '8x + x²', fausse: false },
        { texte: '= 9x²', fausse: true },
        { texte: 'L\'expression réduite est donc 9x².', fausse: false },
      ],
      explication:
        '8x compte des x et x² compte des carrés : ces termes n\'ont pas le même '
        + 'exposant, ils ne sont donc pas semblables. 8x + x² est déjà réduite. '
        + 'Avec x = 3 : 8 × 3 + 9 = 33, alors que 9x² en ferait 81.',
      piege: 'reduction-de-termes-non-semblables', revoir: 'definition',
    },
  ],
};
