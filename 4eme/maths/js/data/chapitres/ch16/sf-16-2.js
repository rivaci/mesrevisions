// Chapitre 16, savoir-faire 2 — Calculer une probabilité dans une situation simple.
//
// ── Le quotient est facile ; sa CONDITION ne l’est pas ────────────────────
//
// « Cas favorables ÷ cas possibles » s’apprend en une minute. Ce qui ne
// s’apprend pas en une minute, c’est que ce quotient ne vaut RIEN hors
// équiprobabilité, et surtout que l’élève ne compte pas ce qu’il croit compter :
// devant un sac de 3 boules rouges et 1 verte, il voit deux issues — rouge,
// verte — et écrit une chance sur deux. Il n’a pas fait d’erreur de calcul : il
// a compté les catégories au lieu des objets. Énoncer la règle ne l’atteint pas,
// parce qu’il croit précisément l’appliquer.
//
// D’où le parti pris du fichier : la moitié des situations ont des catégories en
// nombres INÉGAUX, et le raccourci « une couleur = une chance » y donne un
// nombre faux qu’on a prévu et qu’on nomme. Les trois couleurs de e-16-2-7
// donnent 1/3 au lieu de 5/12, les deux secteurs de e-16-2-4 donnent 0,5 au lieu
// de 0,2 : à chaque fois l’écart est visible, et à chaque fois la réponse fausse
// est déclarée.
//
// ── Pourquoi ces trois items neutres ──────────────────────────────────────
//
// e-16-2-1 : un dé équilibré à six faces numérotées. Chaque face est à la fois un
// objet et une catégorie, donc compter les catégories donne le bon compte —
// l’élève qui porte la confusion répond juste. Sans cet item, « compter les
// catégories est toujours faux » deviendrait la règle apprise, ce qui est une
// deuxième erreur : c’est vrai quand les catégories SONT les objets, et il faut
// l’avoir vu au moins une fois. La seule erreur possible y est le dénominateur,
// d’où ses deux fausses rattachées aux AUTRES pièges.
//
// e-16-2-6 : une roue de dix secteurs identiques, un seul favorable. Là encore
// les catégories sont les objets, et l’item est en plus un « plausible » VRAI —
// sans lui, « on me demande de juger, donc c’est faux » suffirait.
//
// e-16-2-8 : la valeur annoncée, 8/12, est celle que produit favorables ÷
// défavorables. Un élève qui compte les catégories attend 0,5, voit que 8/12 n’en
// est pas, et répond « pas plausible » — c’est-à-dire juste. Le piège du
// savoir-faire ne peut pas y produire l’erreur ; celui du dénominateur, si.
//
// ── Le cours dit lui-même où son contrôle est aveugle ─────────────────────
//
// Le contrôle du chapitre, « une probabilité est entre 0 et 1 », n’attrape pas
// le piège principal : 0,5 est un nombre parfaitement légal, et la somme des
// probabilités reste 1 quand on compte deux catégories au lieu des objets. Le
// taire installerait une fausse sécurité au seul endroit qui compte. Le
// troisième bloc d’exemples le dit donc franchement, sur un sac de 14 rouges et
// 26 vertes où l’annonce « 0,5 » franchit les deux contrôles sans être vue, et
// il rappelle la seule question qui la refuse : ce que je compte en bas, est-ce
// que ce sont des objets de même chance ? Son second exemple est le cas
// inverse, celui où les bornes suffisent seules (8 ÷ 5 = 1,6, donc impossible).
// Ces deux-là travaillent le geste du palier 3 — juger une valeur annoncée —
// que les quatre exemples des deux premiers blocs ne font pas.
//
// ── Les nombres tombent juste, et les erreurs prévues aussi ───────────────
//
// Il n’y a pas de calculatrice dans l’application et les résultats sont comparés
// au milliardième : tous les effectifs ont été choisis pour que la probabilité
// soit exacte en écriture décimale (les totaux en jeu sont 10, 15, 16, 20, 24,
// 25 et 50), ou pour que la fraction demandée soit DÉJÀ irréductible (1/6, 7/20,
// 7/8, 5/12, 3/16, 9/11, 3/8). Ce
// second point n’est pas cosmétique : la consigne exige la forme irréductible
// partout, et exiger une simplification que les nombres n’imposent pas
// reviendrait à compter faux une réponse juste, sans pouvoir la diagnostiquer.
//
// Les valeurs fausses ont subi le même traitement. 4 ÷ 16 = 0,25 et 20 ÷ 4 = 5
// dans e-16-2-4, 25 ÷ 4 = 6,25 dans e-16-2-5, 9 ÷ 24 = 0,375 dans t-16-2-10 :
// une erreur qui ne tomberait pas juste ne serait jamais tapée telle quelle, et
// le diagnostic ne se déclencherait pas.
//
// ── La remise est dite à chaque fois ──────────────────────────────────────
//
// Le programme de 4e s’arrête à une seule épreuve. Aucun arbre, aucun produit de
// probabilités. Mais la composition du sac AU MOMENT du tirage, elle, est bien
// du ressort de ce savoir-faire : p-16-2-4 fait constater qu’un tirage sans
// remise fait passer la probabilité de 0,25 à 0,2 parce que l’urne a changé, et
// p-16-2-5 fait constater qu’avec remise elle ne bouge pas, même après trois
// noirs de suite. Chaque énoncé concerné dit explicitement si l’objet tiré est
// remis ou non ; t-16-2-9 et t-16-2-10 reprennent les deux cas.
//
// ── Ce que ce savoir-faire ne couvre pas ──────────────────────────────────
//
// La fréquence observée et son écart à la probabilité (deux séries de dix
// lancers, deux fréquences, une seule pièce) relèvent d’un autre savoir-faire du
// chapitre : ici, tout nombre se lit sur la composition de l’objet, jamais sur
// un comptage d’expériences déjà faites. L’événement contraire n’est pas
// travaillé pour lui-même non plus — quand il apparaît (p-16-2-1, p-16-2-2), il
// se calcule en comptant les cas favorables, pas par 1 − p.

export default {
  id: 'sf-16-2',
  titre: 'Calculer une probabilité dans une situation simple',
  attendus: [
    'Il calcule des probabilités dans des situations d’équiprobabilité, pour une expérience aléatoire à une seule épreuve.',
    'Il reconnaît qu’une probabilité est un nombre compris entre 0 et 1.',
  ],

  // On ne dit pas « attention, deux issues ne font pas une chance sur deux » :
  // on met côte à côte deux sacs qui ont exactement les mêmes couleurs, on fait
  // calculer les deux probabilités, et c’est l’élève qui trouve deux nombres
  // différents là où la lecture par catégories en annonçait un seul.
  decouvrir: {
    titre: 'Deux sacs, deux couleurs, et pourtant pas les mêmes chances',
    texte:
      'Voici deux sacs. Dans chacun, les boules sont identiques au toucher : '
      + 'aucune n’est plus facile à attraper qu’une autre, donc chaque boule du '
      + 'sac a la même chance d’être tirée. La probabilité de tirer une boule '
      + 'rouge, c’est la part des boules rouges parmi toutes les boules du sac.',
    lignes: [
      { calcul: 'sac A : ses boules, une par une', resultat: 'une rouge, une verte' },
      { calcul: 'sac B : ses boules, une par une', resultat: 'une rouge, une rouge, une rouge, une verte' },
      { calcul: 'les couleurs présentes dans les deux sacs', resultat: 'rouge et verte, dans les deux' },
    ],
    question:
      'Dans chaque sac, on tire une boule au hasard, sans regarder. Donne les '
      + 'deux probabilités de tirer une boule rouge, en écriture décimale.',
    champs: [
      { id: 'a', etiquette: 'sac A : probabilité de tirer une rouge', attendu: 0.5 },
      { id: 'b', etiquette: 'sac B : probabilité de tirer une rouge', attendu: 0.75 },
    ],
    conclusion:
      'Dans le sac A, une boule sur deux est rouge : 1 ÷ 2 = **0,5**. Dans le '
      + 'sac B, trois boules sur quatre le sont : 3 ÷ 4 = **0,75**.\n'
      + 'Les deux sacs contiennent pourtant exactement les mêmes couleurs, rouge '
      + 'et verte, et donc les mêmes deux issues. Si les couleurs avaient la même '
      + 'chance, les deux réponses seraient identiques — elles ne le sont pas.\n'
      + 'Ce qui a la même chance, ce sont les **boules**, pas les couleurs. Compter '
      + 'les catégories au lieu de compter les objets donne 0,5 dans les deux '
      + 'sacs, et se trompe dès que les couleurs ne sont pas en nombres égaux.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Expérience aléatoire, issue, événement',
      texte:
        'Une **expérience aléatoire** est une expérience dont on ne peut pas '
        + 'prévoir le résultat, même en la refaisant dans les mêmes conditions : '
        + 'lancer un dé, tirer une boule dans un sac, faire tourner une roue.\n'
        + 'Chacun des résultats possibles s’appelle une **issue**. Un '
        + '**événement** est décrit par une phrase et rassemble les issues qui le '
        + 'réalisent : « obtenir un nombre pair », « tirer une boule rouge ».\n'
        + 'La **probabilité** d’un événement est un nombre compris entre 0 et 1 '
        + 'qui mesure sa chance de se produire : 0 pour un événement impossible, '
        + '1 pour un événement certain.',
    },
    {
      type: 'propriete',
      titre: 'Cas favorables ÷ cas possibles, et la condition qui va avec',
      texte:
        'Lorsque toutes les issues d’une expérience ont la **même chance** de se '
        + 'produire — on dit qu’il y a **équiprobabilité** — la probabilité d’un '
        + 'événement se calcule ainsi :\n'
        + '**p = nombre de cas favorables ÷ nombre de cas possibles**.\n'
        + 'Les **cas possibles** sont TOUTES les issues de l’expérience. Les '
        + '**cas favorables** sont celles qui réalisent l’événement — et elles '
        + 'font partie des cas possibles.\n'
        + 'Cette formule ne vaut que sous la condition écrite en premier. Hors '
        + 'équiprobabilité, elle donne un résultat faux.',
    },
    {
      type: 'remarque',
      titre: 'Compte les objets, pas les catégories',
      texte:
        'Un sac de 3 boules rouges et 1 boule verte contient deux **couleurs**, '
        + 'mais quatre **boules**. Ce sont les boules qui sont indiscernables au '
        + 'toucher, donc ce sont elles qui ont la même chance d’être tirées — pas '
        + 'les couleurs.\n'
        + 'La probabilité de tirer une rouge vaut donc 3/4, et pas 1/2. Avant '
        + 'd’écrire le moindre quotient, pose-toi la question : « ce que je compte '
        + 'en bas, est-ce que ce sont des objets qui ont tous la même chance ? »\n'
        + '**Deux issues ne veulent jamais dire une chance sur deux.**',
    },
    {
      type: 'remarque',
      titre: 'Le dénominateur, c’est le TOTAL',
      texte:
        'Pour 3 boules rouges dans un sac de 10 boules, la probabilité de tirer '
        + 'une rouge vaut **3/10**, et pas 3/7. Les 3 rouges font partie des 10 : '
        + 'le total compte AUSSI les cas favorables.\n'
        + '« 3 chances contre 7 » est le langage des paris, et il dit quelque '
        + 'chose de vrai. Mais une probabilité rapporte au total, jamais aux seuls '
        + 'cas défavorables.',
    },
    {
      type: 'remarque',
      titre: 'Le contrôle : entre 0 et 1',
      texte:
        'Une probabilité n’est jamais négative et ne dépasse jamais 1. Un '
        + 'résultat de 5, ou de 6,25, n’est donc pas une probabilité : c’est le '
        + 'signe qu’on a mis le total en haut du quotient au lieu de le mettre en '
        + 'bas.\n'
        + 'Second contrôle, plus fin : les probabilités de toutes les issues d’une '
        + 'expérience, additionnées, font exactement **1**. Si ta somme dépasse 1, '
        + 'un dénominateur est trop petit quelque part.',
    },
    {
      type: 'remarque',
      titre: 'Avec remise, sans remise : regarde le sac au moment du tirage',
      texte:
        'Une probabilité se lit sur la composition de l’objet **au moment où on '
        + 'tire**, et sur rien d’autre.\n'
        + 'Si l’objet tiré est remis dans le sac (tirage **avec remise**), le sac '
        + 'est exactement le même qu’avant : la probabilité ne change pas, quels '
        + 'que soient les tirages déjà faits. Un sac, un dé ou une pièce n’ont pas '
        + 'de mémoire.\n'
        + 'Si l’objet n’est pas remis (tirage **sans remise**), le sac a changé : '
        + 'il contient un objet de moins, et un objet de moins de cette '
        + 'catégorie-là. Il faut tout recompter avant de calculer.',
    },
    {
      type: 'exemple',
      titre: 'Deux situations où les issues ont bien la même chance',
      texte:
        'Un sac contient 9 jetons indiscernables au toucher : 2 sont gagnants et '
        + '7 sont perdants. On en tire un au hasard. Les cas possibles sont les 9 '
        + 'jetons, les cas favorables les 2 gagnants : p = 2/9. On ne divise pas '
        + 'par 7, qui ne compte que les perdants.\n'
        + 'Un dé équilibré porte 6 faces numérotées de 1 à 6, et on cherche la '
        + 'probabilité d’obtenir un nombre pair. Les cas possibles sont les 6 '
        + 'faces ; les faces favorables sont celles qui portent 2, 4 et 6, soit 3 '
        + 'faces. p = 3/6, c’est-à-dire 1/2, ou 0,5. Ce sont bien trois FACES que '
        + 'l’on a comptées, pas deux mots.',
    },
    {
      type: 'exemple',
      titre: 'Deux situations où les catégories trompent',
      texte:
        'Un sac contient 30 billes indiscernables au toucher : 24 bleues et 6 '
        + 'blanches. Deux couleurs, donc deux issues — mais sûrement pas une '
        + 'chance sur deux. Les cas possibles sont les 30 billes, les cas '
        + 'favorables les 6 blanches : p = 6/30, c’est-à-dire 0,2. On est loin de '
        + '0,5.\n'
        + 'Une roue est partagée en 16 secteurs identiques : 12 portent le mot '
        + 'PIQUE et 4 portent le mot CŒUR. Elle s’arrête sur l’un de ses secteurs, '
        + 'chacun ayant la même chance. La probabilité d’obtenir CŒUR vaut 4/16, '
        + 'c’est-à-dire 0,25. Ce sont les secteurs qui ont la même chance, pas les '
        + 'deux mots écrits dessus.',
    },
    {
      // Le troisième bloc travaille le geste du palier 3 : juger une valeur
      // annoncée. Et il dit franchement où les deux contrôles sont AVEUGLES —
      // l’erreur d’équiprobabilité passe les deux sans être vue. Un cours qui
      // laisserait croire que « entre 0 et 1 » attrape tout installerait une
      // fausse sécurité, exactement sur le piège principal du savoir-faire.
      type: 'exemple',
      titre: 'Juger un résultat annoncé, et savoir ce que le contrôle ne voit pas',
      texte:
        'Un sac contient 14 billes rouges et 26 billes vertes, indiscernables au '
        + 'toucher. Quelqu’un annonce que la probabilité de tirer une rouge vaut '
        + '0,5, « puisqu’il n’y a que deux couleurs ». Aucun des deux contrôles ne '
        + 'le signale : 0,5 est bien compris entre 0 et 1, et 0,5 pour les rouges '
        + 'plus 0,5 pour les vertes font bien 1. C’est dire qu’ils ne remplacent '
        + 'pas la première question — **ce que je compte en bas, est-ce que ce sont '
        + 'des objets qui ont tous la même chance ?** Ici ce sont les billes : il y '
        + 'en a 40, et 14 sont rouges. La probabilité vaut 14 ÷ 40 = 0,35, celle '
        + 'd’une verte 26 ÷ 40 = 0,65. Annoncer 0,5 revenait à dire qu’il y a '
        + 'autant de rouges que de vertes, alors qu’il y en a presque deux fois '
        + 'moins.\n'
        + 'Une roue est partagée en 8 secteurs identiques, dont 5 sont gagnants. '
        + 'Quelqu’un annonce que la probabilité de gagner vaut 8 ÷ 5 = 1,6. Cette '
        + 'fois le contrôle des bornes suffit, et sans refaire le moindre calcul : '
        + '1,6 dépasse 1, donc dépasse la certitude — c’est impossible. Le quotient '
        + 'a été écrit à l’envers : les cas favorables vont en haut, le total en '
        + 'bas, et la probabilité vaut 5 ÷ 8 = 0,625.',
    },
  ],

  methode: {
    titre: 'Compter les objets avant de compter les chances',
    enonce:
      'Un sac contient 5 jetons rouges, 3 jetons bleus et 2 jetons jaunes, tous '
      + 'indiscernables au toucher. On en tire un au hasard. Quelle est la '
      + 'probabilité de tirer un jeton bleu ?',
    etapes: [
      {
        texte: 'Je cherche l’équiprobabilité dans l’énoncé : les jetons sont indiscernables au toucher, donc chacun a la même chance d’être tiré.',
        note: 'C’est cette phrase qui autorise le calcul. Sans elle, la formule ne s’applique pas.',
      },
      {
        texte: 'Je compte les cas possibles : 5 + 3 + 2 = 10 jetons.',
        note: 'Le total compte TOUS les jetons, les bleus compris.',
      },
      {
        texte: 'Je compte les cas favorables : les jetons bleus, il y en a 3.',
        note: 'Trois couleurs ne veulent pas dire une chance sur trois : ce sont des jetons que je compte, jamais des couleurs.',
      },
      {
        texte: 'La probabilité vaut 3 ÷ 10, c’est-à-dire 0,3.',
        note: '',
      },
    ],
    controle:
      'Le contrôle : ma réponse doit être comprise entre 0 et 1, et 0,3 l’est. '
      + 'Puis je vérifie que tout se boucle en additionnant les probabilités des '
      + 'trois couleurs : 5/10 + 3/10 + 2/10 = 10/10 = 1. Si la somme ne fait pas '
      + '1, un jeton a été compté deux fois ou oublié.\n'
      + 'Ce contrôle-là attrape l’erreur de DÉNOMINATEUR : si j’avais divisé par '
      + '7, le nombre de jetons NON bleus, j’aurais obtenu 3/7 — et en faisant '
      + 'pareil pour les trois couleurs, la somme aurait dépassé 1. Impossible, '
      + 'sans refaire le moindre calcul.\n'
      + 'Mais il ne voit PAS l’erreur des catégories : « trois couleurs, donc une '
      + 'chance sur trois » donne 1/3, un nombre bien compris entre 0 et 1, et '
      + 'trois tiers font exactement 1. Les deux contrôles la laissent passer. '
      + 'Contre celle-là, un seul geste : recompter les jetons un par un, comme à '
      + 'l’étape 2.',
  },

  entrainement: [
    // ── Palier 1 : compter les objets, poser le quotient ───────────────────
    {
      // NEUTRE. Les six faces sont à la fois les objets et les catégories :
      // compter les catégories donne ici le bon compte, et l’élève qui porte la
      // confusion répond juste. C’est le seul endroit du lot où le raccourci
      // fonctionne, et il faut l’avoir vu — sinon l’entraînement installe
      // l’erreur symétrique, « compter les catégories est toujours faux ».
      // Les deux fausses portent donc sur le DÉNOMINATEUR, seul écart possible.
      id: 'e-16-2-1', type: 'fraction', palier: 1, neutre: true, piege: 'equiprobabilite-supposee',
      consigne:
        'Un dé équilibré a six faces, numérotées de 1 à 6. On le lance une fois. '
        + 'Quelle est la probabilité d’obtenir le 6 ? Donne la fraction sous forme '
        + 'irréductible.',
      enonce: '\\text{dé équilibré, faces numérotées de 1 à 6 — probabilité d’obtenir le 6}',
      attendu: [1, 6],
      fausses: [
        // 1 face favorable rapportée aux 5 faces qui restent : le total compte
        // aussi la face cherchée.
        { valeur: '1/5', piege: 'favorables-sur-defavorables' },
        // Le quotient à l’envers : 6, c’est six fois la certitude.
        { valeur: '6/1', piege: 'probabilite-hors-des-bornes' },
      ],
    },
    {
      id: 'e-16-2-2', type: 'fraction', palier: 1, piege: 'favorables-sur-defavorables',
      consigne:
        'Un sac contient 7 billes vertes et 13 billes noires, toutes '
        + 'indiscernables au toucher. On en tire une au hasard. Quelle est la '
        + 'probabilité de tirer une bille verte ? Donne la fraction sous forme '
        + 'irréductible.',
      enonce: '\\text{7 billes vertes, 13 billes noires, indiscernables au toucher — probabilité d’une verte}',
      attendu: [7, 20],
      fausses: [
        // Les 7 vertes rapportées aux 13 noires : les vertes font partie du total.
        { valeur: '7/13', piege: 'favorables-sur-defavorables' },
        // Deux couleurs comptées comme deux chances égales, alors qu’il y a
        // presque deux fois plus de noires que de vertes.
        { valeur: '1/2', piege: 'equiprobabilite-supposee' },
      ],
    },
    {
      id: 'e-16-2-3', type: 'fraction', palier: 1, piege: 'equiprobabilite-supposee',
      consigne:
        'Une urne contient 7 boules rouges et 1 boule verte, toutes '
        + 'indiscernables au toucher. On en tire une au hasard. Quelle est la '
        + 'probabilité de tirer une boule rouge ? Donne la fraction sous forme '
        + 'irréductible.',
      enonce: '\\text{7 boules rouges, 1 boule verte, indiscernables au toucher — probabilité d’une rouge}',
      attendu: [7, 8],
      fausses: [
        // L’écart est ici maximal : deux couleurs, mais sept boules contre une.
        { valeur: '1/2', piege: 'equiprobabilite-supposee' },
        // « 7 chances contre 1 » : le langage des paris. Le geste de contrôle des
        // bornes l’attrape aussi, puisque 7/1 vaut 7.
        { valeur: '7/1', piege: 'favorables-sur-defavorables' },
      ],
    },

    // ── Palier 2 : écritures décimales, et des catégories qui trompent ─────
    {
      // Les trois erreurs prévisibles tombent juste toutes les trois : 0,5 pour
      // les deux catégories, 4 ÷ 16 = 0,25 pour le dénominateur défavorable, et
      // 20 ÷ 4 = 5 pour le quotient renversé. Un seul item, trois diagnostics.
      id: 'e-16-2-4', type: 'calcul', palier: 2, piege: 'equiprobabilite-supposee',
      consigne:
        'Une roue est partagée en 20 secteurs identiques : 4 secteurs sont '
        + 'gagnants et 16 secteurs sont perdants. On la fait tourner ; elle '
        + 's’arrête sur l’un de ses secteurs, chacun ayant la même chance. Quelle '
        + 'est la probabilité de gagner ? Donne le résultat en écriture décimale.',
      enonce: '\\text{roue de 20 secteurs identiques : 4 gagnants, 16 perdants — probabilité de gagner}',
      attendu: 0.2,
      fausses: [
        { valeur: 0.5, piege: 'equiprobabilite-supposee' },
        { valeur: 0.25, piege: 'favorables-sur-defavorables' },
        { valeur: 5, piege: 'probabilite-hors-des-bornes' },
      ],
    },
    {
      // 25 ÷ 4 = 6,25 : le quotient renversé tombe juste, donc il sera tapé tel
      // quel, et le contrôle des bornes le renvoie immédiatement.
      id: 'e-16-2-5', type: 'calcul', palier: 2, piege: 'probabilite-hors-des-bornes',
      consigne:
        'Dans une classe de 25 élèves, 4 élèves portent des lunettes. Le '
        + 'professeur interroge un élève au hasard, chacun ayant la même chance '
        + 'd’être interrogé. Quelle est la probabilité qu’il porte des lunettes ? '
        + 'Donne le résultat en écriture décimale.',
      enonce: '\\text{25 élèves, dont 4 portent des lunettes — probabilité d’interroger un élève à lunettes}',
      attendu: 0.16,
      fausses: [
        { valeur: 6.25, piege: 'probabilite-hors-des-bornes' },
        // Avec ou sans lunettes : deux catégories, très inégales.
        { valeur: 0.5, piege: 'equiprobabilite-supposee' },
      ],
    },
    {
      // NEUTRE. Dix secteurs identiques, un seul favorable : les catégories sont
      // les objets, la confusion ne peut pas produire d’erreur. C’est aussi le
      // seul « plausible » VRAI de l’entraînement — sans lui, « on me demande de
      // juger, donc c’est faux » traverserait le lot.
      id: 'e-16-2-6', type: 'plausible', palier: 2, neutre: true, piege: 'equiprobabilite-supposee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Une roue est partagée en 10 secteurs identiques, numérotés de 1 à 10 ; elle s’arrête sur l’un d’eux, chacun ayant la même chance.} '
        + '\\quad \\text{On annonce que la probabilité de s’arrêter sur le secteur numéro 4 vaut 0,1.}',
      attendu: true,
      fausses: [
        // Refuser 0,1, c’est le plus souvent avoir divisé par 9, les secteurs
        // qui restent une fois le numéro 4 mis de côté.
        { valeur: false, piege: 'favorables-sur-defavorables' },
      ],
      explication:
        'Les dix secteurs sont identiques, donc chacun a la même chance, et un '
        + 'seul porte le numéro 4. La probabilité vaut 1 ÷ 10 = 0,1 : c’est bien '
        + 'la valeur annoncée. Répondre « pas plausible », c’est en général avoir '
        + 'divisé par 9, le nombre de secteurs restants. Le dénominateur est le '
        + 'nombre TOTAL de secteurs, et il compte aussi celui qu’on cherche.',
    },
    {
      // Le piège de l’item est celui du DÉNOMINATEUR — 5 bleus rapportés aux 7
      // non bleus donnent 5/7 — et c’est lui qui sert de repli quand la réponse
      // tapée n’est prévue nulle part. Les trois couleurs ajoutent une seconde
      // erreur déclarée, 1/3 : assez proche de 5/12 pour ne pas alerter l’élève.
      id: 'e-16-2-7', type: 'fraction', palier: 2, piege: 'favorables-sur-defavorables',
      consigne:
        'Un sac contient 4 jetons rouges, 5 jetons bleus et 3 jetons verts, tous '
        + 'indiscernables au toucher. On en tire un au hasard. Quelle est la '
        + 'probabilité de tirer un jeton bleu ? Donne la fraction sous forme '
        + 'irréductible.',
      enonce: '\\text{4 jetons rouges, 5 bleus, 3 verts, indiscernables au toucher — probabilité d’un bleu}',
      attendu: [5, 12],
      fausses: [
        // 5 bleus contre 7 non bleus : le total, c’est 12.
        { valeur: '5/7', piege: 'favorables-sur-defavorables' },
        // Trois couleurs prises pour trois chances égales.
        { valeur: '1/3', piege: 'equiprobabilite-supposee' },
      ],
    },

    // ── Palier 3 : juger un résultat, relire un raisonnement, réfuter ──────
    {
      // NEUTRE, et c’est le plus utile des trois. La valeur annoncée, 8/12, est
      // celle que produit favorables ÷ défavorables. Un élève qui compte les
      // catégories attend 0,5, constate que 8/12 n’en est pas, et répond « pas
      // plausible » — donc juste. Le piège du savoir-faire est hors jeu ici ;
      // celui du dénominateur, lui, décide de tout.
      id: 'e-16-2-8', type: 'plausible', palier: 3, neutre: true, piege: 'equiprobabilite-supposee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Un sac contient 8 jetons rouges et 12 jetons bleus, indiscernables au toucher ; on en tire un au hasard.} '
        + '\\quad \\text{On annonce que la probabilité de tirer un jeton rouge vaut } \\dfrac{8}{12}.',
      attendu: false,
      fausses: [
        { valeur: true, piege: 'favorables-sur-defavorables' },
      ],
      explication:
        'Le sac contient 8 + 12 = 20 jetons, et 8 d’entre eux sont rouges : la '
        + 'probabilité vaut 8/20, c’est-à-dire 0,4. La valeur annoncée rapporte '
        + 'les 8 rouges aux 12 bleus, donc aux cas DÉFAVORABLES. Or les rouges '
        + 'font partie du total : c’est par 20 qu’il faut diviser, pas par 12. '
        + 'D’ailleurs 8/12 vaut environ 0,67, ce qui ferait des rouges la couleur '
        + 'majoritaire du sac — alors qu’elles y sont les moins nombreuses.',
    },
    {
      id: 'e-16-2-9', type: 'corriger', palier: 3, piege: 'equiprobabilite-supposee',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l’erreur apparaît.',
      enonce:
        '\\text{Un sac contient 6 jetons jaunes et 2 jetons noirs, tous indiscernables au toucher. On en tire un au hasard.} '
        + '\\quad \\text{Quelle est la probabilité de tirer un jeton noir ?}',
      lignes: [
        { texte: 'Le sac contient 6 + 2 = 8 jetons, et deux couleurs sont possibles : jaune ou noir.', fausse: false },
        { texte: 'Il y a donc deux issues, et chacune a une chance sur deux.', fausse: true },
        { texte: 'La probabilité de tirer un jeton noir vaut donc 1/2, c’est-à-dire 0,5.', fausse: false },
      ],
      explication:
        'La première ligne ne fait que lire l’énoncé, et ses deux comptes sont '
        + 'justes. La troisième calcule correctement à partir de la deuxième. '
        + 'C’est la deuxième qui casse tout : ce sont les JETONS qui sont '
        + 'indiscernables au toucher, donc ce sont eux qui ont la même chance — '
        + 'pas les couleurs. Il y a 8 cas possibles et 2 cas favorables, donc la '
        + 'probabilité vaut 2/8, c’est-à-dire 0,25. Annoncer une chance sur deux '
        + 'revenait à dire qu’il y a autant de noirs que de jaunes dans ce sac, '
        + 'alors qu’il y en a trois fois moins.',
    },
    {
      id: 'e-16-2-10', type: 'vraifaux', palier: 3, piege: 'equiprobabilite-supposee',
      consigne: 'Vrai ou faux ? Si c’est faux, donne un contre-exemple.',
      affirmation: 'Quand une expérience aléatoire n’a que deux issues, chacune des deux a une chance sur deux.',
      attendu: false,
      contreExemple: {
        // On ne demande pas de réciter « ça dépend » : on fait COMPTER les
        // boules, puis CALCULER la probabilité. C’est le nombre 0,7, obtenu par
        // l’élève lui-même dans une expérience qui n’a bien que deux issues, qui
        // réfute — pas la règle qu’on lui répéterait.
        invite:
          'Un sac contient 7 boules rouges et 3 boules vertes, toutes '
          + 'indiscernables au toucher. On en tire une au hasard : il n’y a bien '
          + 'que deux issues, « rouge » et « verte ». Donne le nombre de boules du '
          + 'sac, puis la probabilité de tirer une rouge en écriture décimale.',
        champs: [
          { id: 'a', etiquette: 'nombre de boules du sac' },
          { id: 'b', etiquette: 'probabilité de tirer une rouge, en écriture décimale' },
        ],
        valide: (a, b) => Math.abs(a - 10) < 1e-9 && Math.abs(b - 0.7) < 1e-9,
        temoin: [10, 0.7],
        exemple:
          'Le sac contient 7 + 3 = 10 boules. Les dix boules ont la même chance '
          + 'd’être tirées et 7 d’entre elles sont rouges : la probabilité vaut '
          + '7 ÷ 10 = 0,7, et non 0,5. L’expérience n’a pourtant que deux issues, '
          + '« rouge » et « verte ». Deux issues ne font donc pas deux chances '
          + 'égales : ce qui a la même chance, ce sont les objets, pas les '
          + 'catégories qu’on met dessus.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-16-2-1',
      enonce:
        'Un sac contient 6 billes rouges, 9 billes bleues et 5 billes jaunes, '
        + 'toutes indiscernables au toucher. On en tire une au hasard : chaque '
        + 'bille a donc la même chance d’être tirée. Les probabilités sont '
        + 'demandées en écriture décimale.',
      questions: [
        { texte: 'Combien y a-t-il de billes dans le sac ?', attendu: 20 },
        { texte: 'Quelle est la probabilité de tirer une bille bleue ?', attendu: 0.45 },
        { texte: 'Quelle est la probabilité de tirer une bille qui n’est pas bleue ?', attendu: 0.55 },
      ],
    },
    {
      id: 'p-16-2-2',
      enonce:
        'Une tombola met en vente 50 billets, numérotés de 1 à 50. Deux billets '
        + 'donnent le gros lot, huit billets donnent un lot de consolation, et '
        + 'les autres ne donnent rien. On tire un billet au hasard, chacun ayant '
        + 'la même chance d’être tiré. Les probabilités sont demandées en '
        + 'écriture décimale.',
      questions: [
        { texte: 'Quelle est la probabilité de tirer le gros lot ?', attendu: 0.04 },
        { texte: 'Quelle est la probabilité de gagner quelque chose, gros lot ou lot de consolation ?', attendu: 0.2 },
        { texte: 'Quelle est la probabilité de ne rien gagner ?', attendu: 0.8 },
      ],
    },
    {
      id: 'p-16-2-3',
      enonce:
        'Une roue de fête foraine est partagée en 20 secteurs identiques : 1 '
        + 'secteur donne une peluche, 3 secteurs donnent un porte-clés, et les 16 '
        + 'autres ne donnent rien. La roue s’arrête sur l’un de ses secteurs, '
        + 'chacun ayant la même chance. Les probabilités sont demandées en '
        + 'écriture décimale.',
      questions: [
        { texte: 'Quelle est la probabilité de gagner la peluche ?', attendu: 0.05 },
        { texte: 'Quelle est la probabilité de gagner un porte-clés ?', attendu: 0.15 },
        { texte: 'Quelle est la probabilité de gagner quelque chose ?', attendu: 0.2 },
      ],
    },
    {
      // SANS remise. Les deux probabilités demandées encadrent le retrait : 0,25
      // avant, 0,2 après. L’élève ne récite pas « l’urne a changé », il obtient
      // deux nombres différents pour la même question posée à deux moments.
      id: 'p-16-2-4',
      enonce:
        'Une urne contient 16 jetons indiscernables au toucher : 4 jetons rouges '
        + 'et 12 jetons noirs. Camille tire un jeton au hasard : il est rouge. '
        + 'Elle le garde et ne le remet pas dans l’urne. Puis elle tire un second '
        + 'jeton au hasard dans l’urne. Les probabilités sont demandées en '
        + 'écriture décimale.',
      questions: [
        { texte: 'Avant le premier tirage, quelle était la probabilité de tirer un jeton rouge ?', attendu: 0.25 },
        { texte: 'Après ce premier tirage, combien reste-t-il de jetons rouges dans l’urne ?', attendu: 3 },
        { texte: 'Quelle est la probabilité que le second jeton tiré soit rouge ?', attendu: 0.2 },
      ],
    },
    {
      // AVEC remise, et volontairement après trois noirs de suite : les deux
      // premières questions font CONSTATER que le sac est intact avant que la
      // troisième ne demande la probabilité. C’est ce constat qui déloge le
      // sophisme du joueur, pas la règle énoncée.
      id: 'p-16-2-5',
      enonce:
        'Un sac contient 20 jetons indiscernables au toucher : 3 jetons blancs '
        + 'et 17 jetons noirs. Léa tire un jeton au hasard, note sa couleur, puis '
        + 'le remet dans le sac avant de recommencer. Elle vient de tirer trois '
        + 'jetons noirs de suite. Les probabilités sont demandées en écriture '
        + 'décimale.',
      questions: [
        { texte: 'Combien y a-t-il de jetons dans le sac au moment du quatrième tirage ?', attendu: 20 },
        { texte: 'Combien de ces jetons sont blancs ?', attendu: 3 },
        { texte: 'Quelle est la probabilité que le quatrième jeton tiré soit blanc ?', attendu: 0.15 },
      ],
    },
  ],

  test: [
    {
      id: 't-16-2-1', type: 'fraction',
      consigne:
        'Une urne contient 9 boules jaunes et 2 boules violettes, toutes '
        + 'indiscernables au toucher. On en tire une au hasard. Quelle est la '
        + 'probabilité de tirer une boule jaune ? Donne la fraction sous forme '
        + 'irréductible.',
      enonce: '\\text{9 boules jaunes, 2 boules violettes, indiscernables au toucher — probabilité d’une jaune}',
      attendu: [9, 11],
      fausses: [
        { valeur: '1/2', piege: 'equiprobabilite-supposee' },
        { valeur: '9/2', piege: 'favorables-sur-defavorables' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-16-2-2', type: 'fraction',
      consigne:
        'Un sac contient 3 jetons verts et 13 jetons rouges, tous indiscernables '
        + 'au toucher. On en tire un au hasard. Quelle est la probabilité de '
        + 'tirer un jeton vert ? Donne la fraction sous forme irréductible.',
      enonce: '\\text{3 jetons verts, 13 jetons rouges, indiscernables au toucher — probabilité d’un vert}',
      attendu: [3, 16],
      fausses: [
        { valeur: '3/13', piege: 'favorables-sur-defavorables' },
        { valeur: '1/2', piege: 'equiprobabilite-supposee' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-16-2-3', type: 'calcul',
      consigne:
        'Dans une classe de 20 élèves, 9 sont demi-pensionnaires. On interroge '
        + 'un élève au hasard, chacun ayant la même chance d’être interrogé. '
        + 'Quelle est la probabilité qu’il soit demi-pensionnaire ? Donne le '
        + 'résultat en écriture décimale.',
      enonce: '\\text{20 élèves, dont 9 demi-pensionnaires — probabilité d’interroger un demi-pensionnaire}',
      attendu: 0.45,
      fausses: [{ valeur: 0.5, piege: 'equiprobabilite-supposee' }],
      revoir: 'propriete',
    },
    {
      id: 't-16-2-4', type: 'calcul',
      consigne:
        'Une boîte contient 50 chocolats identiques d’aspect, dont 10 sont '
        + 'fourrés au caramel. On en prend un au hasard, chacun ayant la même '
        + 'chance d’être pris. Quelle est la probabilité qu’il soit au caramel ? '
        + 'Donne le résultat en écriture décimale.',
      enonce: '\\text{50 chocolats, dont 10 au caramel — probabilité d’en prendre un au caramel}',
      attendu: 0.2,
      fausses: [
        { valeur: 5, piege: 'probabilite-hors-des-bornes' },
        { valeur: 0.25, piege: 'favorables-sur-defavorables' },
        { valeur: 0.5, piege: 'equiprobabilite-supposee' },
      ],
      revoir: 'remarque',
    },
    {
      id: 't-16-2-5', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Un sac contient 12 billes indiscernables au toucher, dont 5 sont vertes ; on en tire une au hasard.} '
        + '\\quad \\text{On annonce que la probabilité de tirer une bille verte vaut 2,4.}',
      attendu: false,
      fausses: [{ valeur: true, piege: 'probabilite-hors-des-bornes' }],
      explication:
        'Une probabilité est toujours comprise entre 0 et 1 : 2,4 est plus de '
        + 'deux fois la certitude, c’est impossible. Cette valeur est celle de '
        + '12 ÷ 5, donc le total divisé par les cas favorables — le quotient a été '
        + 'écrit à l’envers. La bonne réponse est 5 ÷ 12, un nombre plus petit '
        + 'que 1.',
      piege: 'probabilite-hors-des-bornes', revoir: 'remarque',
    },
    {
      id: 't-16-2-6', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Une roue est partagée en 25 secteurs identiques, dont 2 sont gagnants ; elle s’arrête sur l’un d’eux, chacun ayant la même chance.} '
        + '\\quad \\text{On annonce que la probabilité de gagner vaut 0,08.}',
      attendu: true,
      // Le seul « plausible » vrai de l’auto-évaluation : répondre « non » ici,
      // c’est en général avoir attendu 0,5 parce qu’il n’y a que deux issues,
      // gagner ou perdre. Sans cette ligne, la seule erreur possible sur cet
      // item ne serait rattachée à rien.
      fausses: [{ valeur: false, piege: 'equiprobabilite-supposee' }],
      explication:
        'Les 25 secteurs sont identiques, donc chacun a la même chance, et 2 '
        + 'd’entre eux sont gagnants : la probabilité vaut 2 ÷ 25 = 0,08, la '
        + 'valeur annoncée. Il n’y a bien que deux issues, gagner ou perdre, mais '
        + 'elles n’ont pas la même chance — ce sont les secteurs qui l’ont.',
      revoir: 'exemple',
    },
    {
      id: 't-16-2-7', type: 'trous',
      consigne:
        'Un sac contient 4 jetons rouges, 6 jetons bleus et 5 jetons verts, tous '
        + 'indiscernables au toucher. On en tire un au hasard et on s’intéresse à '
        + 'l’événement « tirer un jeton bleu ». Complète les deux nombres.',
      enonce:
        '\\text{nombre de cas possibles : } \\square \\qquad '
        + '\\text{nombre de cas favorables : } \\square',
      champs: [
        { id: 'a', etiquette: 'nombre de cas possibles', attendu: 15 },
        { id: 'b', etiquette: 'nombre de cas favorables', attendu: 6 },
      ],
      fausses: [
        // 15 − 6 : les cas possibles réduits aux seuls jetons non bleus.
        { valeur: 9, piege: 'favorables-sur-defavorables' },
        // Trois couleurs prises pour les trois cas possibles.
        { valeur: 3, piege: 'equiprobabilite-supposee' },
      ],
      revoir: 'definition',
    },
    {
      id: 't-16-2-8', type: 'corriger',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l’erreur apparaît.',
      enonce:
        '\\text{Un sac contient 10 jetons indiscernables au toucher : 6 portent la lettre A et 4 portent la lettre B. On en tire un au hasard.} '
        + '\\quad \\text{Quelle est la probabilité de tirer un jeton portant la lettre B ?}',
      lignes: [
        { texte: 'Le sac contient 10 jetons, et deux lettres sont possibles : A ou B.', fausse: false },
        { texte: 'Chacune des deux lettres a donc la même chance de sortir, soit une chance sur deux.', fausse: true },
        { texte: 'La probabilité de tirer un jeton portant la lettre B vaut donc 0,5.', fausse: false },
      ],
      explication:
        'La première ligne lit l’énoncé sans erreur, et la troisième calcule '
        + 'correctement à partir de la deuxième. C’est la deuxième qui est '
        + 'fausse : ce sont les jetons qui sont indiscernables au toucher, donc '
        + 'ce sont eux qui ont la même chance, pas les lettres écrites dessus. Il '
        + 'y a 10 cas possibles et 4 cas favorables : la probabilité vaut '
        + '4 ÷ 10 = 0,4.',
      piege: 'equiprobabilite-supposee', revoir: 'remarque',
    },
    {
      id: 't-16-2-9', type: 'fraction',
      consigne:
        'Une urne contient 4 boules blanches et 5 boules noires, toutes '
        + 'indiscernables au toucher. On tire une boule au hasard : elle est '
        + 'blanche, et on ne la remet pas dans l’urne. On tire alors une seconde '
        + 'boule au hasard. Quelle est la probabilité qu’elle soit blanche ? '
        + 'Donne la fraction sous forme irréductible.',
      enonce: '\\text{urne de 4 blanches et 5 noires ; une blanche est tirée et non remise — probabilité d’une blanche au tirage suivant}',
      attendu: [3, 8],
      fausses: [
        // La composition d’avant le retrait : l’urne a pourtant changé, elle a
        // une boule blanche de moins et une boule de moins en tout.
        { valeur: '4/9', piege: 'sophisme-du-joueur' },
        { valeur: '1/2', piege: 'equiprobabilite-supposee' },
      ],
      revoir: 'remarque',
    },
    {
      id: 't-16-2-10', type: 'calcul',
      consigne:
        'Un sac contient 25 jetons indiscernables au toucher : 10 jetons rouges '
        + 'et 15 jetons noirs. On tire un jeton au hasard : il est rouge, et on '
        + 'le remet dans le sac. On tire alors un second jeton au hasard. Quelle '
        + 'est la probabilité qu’il soit rouge ? Donne le résultat en écriture '
        + 'décimale.',
      enonce: '\\text{sac de 10 jetons rouges et 15 noirs ; un rouge est tiré puis remis — probabilité d’un rouge au tirage suivant}',
      attendu: 0.4,
      fausses: [
        // 9 ÷ 24 : le jeton a été retiré du compte alors qu’il a été remis. Le
        // sac est intact, donc la probabilité est celle du premier tirage.
        { valeur: 0.375, piege: 'sophisme-du-joueur' },
        { valeur: 0.5, piege: 'equiprobabilite-supposee' },
      ],
      revoir: 'remarque',
    },
  ],
};
