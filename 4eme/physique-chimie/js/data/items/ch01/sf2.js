// Ch. 1 — « Distinguer un mélange homogène d’un mélange hétérogène ».
//
// Premier contenu écrit contre le moteur. Tout ce qui suit a été plié au schéma
// de `js/item.js` et passé sous `tools/verifier-contenu.mjs` ; ce qui n’y entrait
// pas a été réécrit, jamais contourné.
//
// ── Ce que le savoir-faire demande, et pourquoi il piège ──────────────────
//
// Le critère est à l’œil nu : un mélange est hétérogène quand on y distingue
// des constituants. C’est ce critère-là qui piège, parce qu’il est SENSIBLE À
// L’ÉCHELLE ET AU TEMPS D’OBSERVATION. Une eau boueuse décantée paraît
// homogène dans sa moitié haute et ne l’est pas dans la bouteille ; un lait
// paraît uniformément blanc et montre ses gouttelettes de matière grasse dès
// qu’on regarde d’assez près ; un brouillard est un gaz et se voit ; un acier
// ne montre rien et reste un mélange. Le cercle 0 le dit : l’apparence décide,
// et c’est justement ce qu’il faut apprendre à ne pas croire sur parole.
//
// Les items sont donc construits autour de trois gestes, et jamais autour du
// mot « homogène » : (1) nommer ce qu’on distingue, (2) dire à quelle échelle
// et après combien de temps on a regardé, (3) agiter ou laisser reposer avant
// de conclure. Onze des vingt-cinq items décrivent un cas où l’apparence
// trompe, et dans les trois sens : ce qui paraît uniforme et ne l’est pas — le
// lait, la poudre grise vue de loin, la moitié haute d’une bouteille décantée
// —, ce qui paraît un corps pur et n’en est pas un — l’eau minérale, l’acier,
// l’air —, et ce qui se distingue parfaitement alors que c’est un gaz : le
// brouillard. L’eau minérale ne relève PAS de la première famille : elle est
// uniforme et elle est homogène ; ce qu’elle trompe, c’est le compte des
// constituants, pas leur visibilité.
//
// ── Ce que ce savoir-faire NE couvre PAS ──────────────────────────────────
//
//   · **Corps pur ou mélange** — c’est `ch01-sf1`. Deux items l’effleurent
//     (`p05`, `t01`) parce qu’un élève propose spontanément « corps pur »
//     comme troisième réponse ; ils le déclarent en `sfSollicites` et le
//     dénominateur reste `ch01-sf2`.
//   · **La miscibilité de deux liquides** — c’est `ch01-sf4`. Aucun item ne
//     demande de PRÉVOIR si deux liquides se mélangeront ; les items d’eau et
//     d’huile partent tous d’un mélange déjà fait et déjà observé.
//   · **La solubilité, la valeur d’une saturation, la courbe** — `ch01-sf5` et
//     `ch01-sf6`. Aucun item n’estime une solubilité et aucun ne moyenne une
//     série. Le tableau de `e08` additionne cinq dépôts, il ne cherche pas de
//     valeur vraie et ne repère aucune mesure aberrante.
//   · **La conservation de la masse à la dissolution** — `ch06-sf6`, avec son
//     piège documenté. `t06` additionne une masse de sel et une masse d’eau,
//     mais l’item ne fait aucune prédiction sur une balance et ne porte pas le
//     piège de conservation : il serait malhonnête d’en réclamer le crédit.
//   · **Le geste expérimental.** Aucun item ne fait filtrer, décanter ou
//     centrifuger. L’application ne l’entraîne pas et le dit à l’élève : on
//     travaille sur situation décrite — choisir, critiquer, exploiter,
//     contrôler.
//   · **Le pH, la concentration, la mole, l’effet de la pression** — écartés
//     par le chapitre lui-même (`nonDemande`), aucun item ne les frôle.
//
// ── Les décomptes, vérifiés sur le fichier ────────────────────────────────
//
//   · Sections : 1 découverte, 1 cours, 1 méthode, 10 items d’entraînement,
//     5 problèmes, 10 items d’auto-évaluation — soit **25 items** dans le
//     tableau par défaut. Les trois blocs de prose ne sont pas des items et ne
//     passent pas par `validerItem` : le schéma est fermé à trente champs et
//     n’en porte aucun pour la section. La section est donc une propriété du
//     MODULE (trois tableaux exportés), jamais un champ d’item — un champ hors
//     schéma est refusé, et c’est exactement le refus qu’on veut garder.
//   · Classes : **A 9 · A_TABLE 3 · B 5 · C 8**. La classe C vaut 8 sur 25,
//     soit 32 %, sous le plafond du tiers — et il a fallu la dépenser à
//     l’économie, parce que ce savoir-faire rend surtout des verdicts
//     qualitatifs. Les huit sont les huit items où la réponse EST un jugement :
//     cinq doubles QCM, deux verdicts à deux choix, une explication libre —
//     5 + 2 + 1 = 8, et le fichier ne porte aucun item de classement. Partout
//     ailleurs, la garantie mécanique a été trouvée : un volume ou une masse
//     qui se recalcule (A), une masse volumique qui se rejoue sur la table
//     centrale (A′), une grille de particules qui EST la correction (B).
//   · Paliers : 1 → 7 items, 2 → 6, 3 → 6, 4 → 6. Aucun palier n’est
//     intégralement de classe C.
//   · Cercles : 0 → 12, 1 → 10, 2 → 3, 3 → **aucun**. C’est délibéré et il faut
//     l’écrire : le cercle 3 est le geste figuré — brancher, lire un appareil,
//     schématiser un montage. Ce savoir-faire n’en comporte aucun, et en
//     fabriquer un (« place le filtre sur le schéma ») aurait été inventer un
//     attendu pour remplir une bande. Le plancher de 10 % du cercle 3 est une
//     contrainte de SÉANCE, pas de savoir-faire ; les chapitres d’électricité
//     le fournissent.
//   · Piège : `serie-etiquetee-par-le-chapitre`, le seul que le catalogue
//     attache à ce savoir-faire. **4 items** le portent — paliers 2, 3 et 4×2 —
//     et tous les quatre sont servis HORS du chapitre 1, parce que la condition
//     de validité l’exige : `chapitreReel !== chapitreEnCours`. Un item de
//     mélange servi pendant le chapitre des mélanges ne diagnostique rien, il
//     conforte. Les paliers 2 et 3 déclarent deux dimensions distinctes
//     (`objet-support`, `mode-de-reponse`) ; `p02` porte le format
//     diagnostique, avec son motif écrit.
//
//     **Et les quatre sont des doubles QCM, ce qui n’est pas un hasard.** Sur un
//     item à saisie libre, la stratégie « je réponds ce que dit le chapitre » ne
//     laisse aucune trace : l’élève rend un nombre faux, indiscernable d’une
//     étourderie, et aucun modèle erroné exécutable ne saurait l’engendrer —
//     l’en fabriquer un serait inventer un distracteur, ce que la charte refuse.
//     `p03` portait ce piège sur une soustraction de volumes ; il ne l’a plus.
//     Son énoncé DIT ce qu’il y a à reconnaître (« deux couches se sont formées :
//     on les distingue nettement ») et ne demande plus qu’une différence, que
//     tout le monde calcule de la même façon : l’item ne pouvait qu’enregistrer
//     une réussite pour une conception intacte — exactement ce que le `pourquoi`
//     du piège nomme comme sa panne. Il reste un problème de palier 4 servi hors
//     chapitre ; il ne réclame plus le crédit d’un diagnostic.
//
//     **Et chacun des quatre offre à la conception une case où atterrir.** Une
//     justification qui dirait « ce n’est pas le chapitre, il n’y a rien à
//     répondre » ne justifie AUCUNE des réponses que le même item force à
//     cocher : elle est invraisemblable au moment même où elle serait choisie,
//     donc l’élève qui tient la conception ne la prend pas et l’item ne le voit
//     pas. Le chapitre où l’item est servi doit donc proposer une catégorie
//     concurrente parmi les choix : transformation chimique au ch. 6 (`p02`) et
//     au ch. 5 (`t09`), mélange homogène au ch. 3 (`t05`), corps pur au ch. 8
//     (`p05`). C’est cette contrainte-là, et non la variété du décor, qui décide
//     du chapitre de service.
//
// ── Trois décisions qu’il vaut mieux lire que découvrir ───────────────────
//
// **Les justifications fausses sont `locale`, pas `reformulee`.** La charte
// gradue la provenance précisément parce que le corpus d’énoncés d’élèves
// n’existe pas encore. Aucune typologie publiée ne couvre les conceptions de
// mélange comme Andersson couvre la combustion ou Shipstone le courant :
// écrire `reformulee` avec un `deriveDe` inventé aurait produit une
// provenance résoluble et fausse, ce que le contrôleur ne peut pas voir et
// qu’un relecteur ne pourrait plus démêler. Les justifications justes citent
// la ressource d’accompagnement Éduscol, qui est réelle et déjà citée par le
// corpus d’exemples.
//
// **Aucun distracteur quantitatif n’est écrit.** Un distracteur numérique doit
// être produit par un modèle erroné EXÉCUTABLE, nommé au catalogue des pièges.
// Les neuf items de classe A d’ici sont des additions et des soustractions de
// volumes ou de masses ; le seul modèle faux qu’on saurait leur opposer serait
// « il a ajouté au lieu de retrancher », qui n’est pas une conception du
// catalogue mais une étourderie. Un distracteur inventé étant refusé — et
// devant l’être —, ces items sont à saisie libre et à sémantique `exacte` :
// pas de fenêtre de tolérance, donc pas de modèle erroné exigé, et rien qui
// fasse semblant de diagnostiquer.
//
// **Aucune figure n’est un dessin.** Les six figures du fichier sont engendrées
// par `js/schema.js` à partir des objets formels déclarés en tête de fichier.
// Les CINQ GRILLES sont citées une fois par la figure et une fois par la
// correction, par identité de référence : sur les items de classe B, il n’y a
// rien à faire coïncider, c’est le même objet, et `item.js` le CONSTATE
// (`FIGURE_ET_CORRECTION_DISJOINTES`).
//
// Le TABLEAU des cinq tubes ne peut pas obtenir cette garantie-là, et il faut le
// dire au lieu de le laisser croire : `e08` est de classe A, sa correction n’est
// pas un objet formel mais une chaîne de calcul, et une chaîne lit des `donnees`
// nommées, pas les points d’un tableau. Écrire les cinq nombres une deuxième
// fois dans `donnees` aurait rouvert dans un seul item exactement la divergence
// que l’invariant 6 ferme partout ailleurs — le tableau montrant 4 mL et la
// somme comptant 5. Les `donnees` sont donc DÉRIVÉES des points du tableau, en
// une ligne : il n’y a toujours qu’une écriture des cinq mesures, et corriger le
// tableau corrige la somme.

// ════════════════════════════════════════════════════════════════════════════
// Les objets formels — écrits UNE fois, cités deux
// ════════════════════════════════════════════════════════════════════════════
//
// `schema.js` ne sait dessiner qu’un échantillon BRASSÉ : « un mélange dessiné
// en couches serait un schéma de mélange hétérogène ». C’est une limite du
// module, et elle tombe juste — les cinq grilles ci-dessous représentent
// toutes des mélanges HOMOGÈNES, et c’est exactement ce qu’un schéma
// particulaire a de mieux à apprendre ici : à l’échelle des particules, un
// mélange homogène montre plusieurs espèces, mêlées et indiscernables à notre
// échelle. L’hétérogène, lui, se raconte à l’échelle macroscopique, et c’est
// là que les autres items le traitent.

/** L’air : deux gaz mêlés, aucun constituant visible. */
const AIR = Object.freeze({
  etat: 'gaz',
  graine: 3,
  contenu: Object.freeze([
    Object.freeze({
      nom: 'diazote',
      formule: 'N₂',
      nombre: 8,
      atomes: Object.freeze([{ element: 'N', nombre: 2 }]),
    }),
    Object.freeze({
      nom: 'dioxygène',
      formule: 'O₂',
      nombre: 2,
      atomes: Object.freeze([{ element: 'O', nombre: 2 }]),
    }),
  ]),
});

/** Une eau gazeuse fermée : le dioxyde de carbone y est dissous, donc invisible. */
const EAU_GAZEUSE = Object.freeze({
  etat: 'liquide',
  graine: 5,
  contenu: Object.freeze([
    Object.freeze({
      nom: 'eau',
      formule: 'H₂O',
      nombre: 10,
      atomes: Object.freeze([{ element: 'O' }, { element: 'H', nombre: 2 }]),
    }),
    Object.freeze({
      nom: 'dioxyde de carbone',
      formule: 'CO₂',
      nombre: 3,
      atomes: Object.freeze([{ element: 'C' }, { element: 'O', nombre: 2 }]),
    }),
  ]),
});

/** Un acier : un métal uniforme à l’œil, et pourtant un mélange solide. */
const ACIER = Object.freeze({
  etat: 'solide',
  graine: 8,
  contenu: Object.freeze([
    Object.freeze({
      nom: 'fer',
      formule: 'Fe',
      nombre: 14,
      atomes: Object.freeze([{ element: 'Fe' }]),
    }),
    Object.freeze({
      nom: 'carbone',
      formule: 'C',
      nombre: 2,
      atomes: Object.freeze([{ element: 'C' }]),
    }),
  ]),
});

/** L’eau d’une rivière : limpide, et pourtant un mélange — sans quoi aucun
 *  poisson n’y respirerait. */
const EAU_ET_DIOXYGENE = Object.freeze({
  etat: 'liquide',
  graine: 13,
  contenu: Object.freeze([
    Object.freeze({
      nom: 'eau',
      formule: 'H₂O',
      nombre: 12,
      atomes: Object.freeze([{ element: 'O' }, { element: 'H', nombre: 2 }]),
    }),
    Object.freeze({
      nom: 'dioxygène',
      formule: 'O₂',
      nombre: 2,
      atomes: Object.freeze([{ element: 'O', nombre: 2 }]),
    }),
  ]),
});

/** Un gel hydroalcoolique : deux liquides miscibles, un seul liquide visible. */
const EAU_ET_ETHANOL = Object.freeze({
  etat: 'liquide',
  graine: 21,
  contenu: Object.freeze([
    Object.freeze({
      nom: 'eau',
      formule: 'H₂O',
      nombre: 9,
      atomes: Object.freeze([{ element: 'O' }, { element: 'H', nombre: 2 }]),
    }),
    Object.freeze({
      nom: 'éthanol',
      formule: 'C₂H₆O',
      nombre: 3,
      atomes: Object.freeze([
        { element: 'C', nombre: 2 },
        { element: 'H', nombre: 6 },
        { element: 'O' },
      ]),
    }),
  ]),
});

/** Les cinq dépôts recueillis au fond de cinq tubes d’eau boueuse. Le tableau
 *  montre ce que la chaîne de calcul additionne : un seul objet, deux lectures. */
const DEPOTS_DE_CINQ_TUBES = Object.freeze({
  titre: 'Volume de dépôt recueilli au fond de cinq tubes d’eau boueuse, après une nuit de repos',
  x: Object.freeze({ titre: 'Tube n°', min: 1, max: 5, pas: 1 }),
  y: Object.freeze({ titre: 'Volume du dépôt (mL)', min: 0, max: 20, pas: 2 }),
  points: Object.freeze([[1, 4], [2, 6], [3, 5], [4, 8], [5, 7]].map(Object.freeze)),
});

// ════════════════════════════════════════════════════════════════════════════
// La découverte
// ════════════════════════════════════════════════════════════════════════════
//
// Une situation décrite, pas un protocole à mettre en œuvre : l’élève ne verse
// rien, il prévoit et il critique. Le conflit est choisi pour que le critère
// « à l’œil nu » se retourne contre lui-même dès la deuxième question.

export const DECOUVERTE = Object.freeze({
  titre: 'Trois verres, et le même verdict à l’œil',
  situation:
    'Sur une table, trois verres. Le premier contient du lait. Le deuxième contient de '
    + 'l’eau dans laquelle on vient de remuer de la farine. Le troisième contient de '
    + 'l’eau dans laquelle on vient de remuer du sucre, jusqu’à ce qu’il n’en reste pas '
    + 'un grain. Les trois n’ont pas la même couleur, mais dans chacun le liquide paraît '
    + 'le même partout : dans aucun des trois on ne montrerait du doigt deux choses '
    + 'différentes.',
  questions: Object.freeze([
    Object.freeze({
      id: 'lequel-est-homogene',
      texte:
        'Sans rien toucher, lequel des trois dirais-tu homogène ? Réponds d’abord, '
        + 'tu verras la suite ensuite.',
      pourquoiElleEstPosee:
        'Elle engage l’élève sur le critère qu’il a — « ça se voit » — avant qu’on ne '
        + 'le mette en défaut. Sans engagement préalable, la suite n’est qu’une '
        + 'information de plus.',
    }),
    Object.freeze({
      id: 'une-heure-plus-tard',
      texte:
        'Une heure plus tard, le deuxième verre montre un dépôt blanc au fond et un '
        + 'liquide presque clair au-dessus. Les deux autres n’ont pas changé. Est-ce que '
        + 'ta réponse tient encore ?',
      pourquoiElleEstPosee:
        'Le temps d’observation est une variable, et personne ne la déclare jamais. '
        + 'Un mélange hétérogène peut être parfaitement uniforme pendant qu’on le remue.',
    }),
    Object.freeze({
      id: 'la-goutte-au-microscope',
      texte:
        'On pose une goutte de lait sous un microscope : on y voit de fines '
        + 'gouttelettes de matière grasse, séparées les unes des autres. Et maintenant ?',
      pourquoiElleEstPosee:
        'L’échelle est la seconde variable cachée. Elle est ce qui empêche de faire du '
        + 'critère une règle mécanique, et ce qui oblige à dire À QUELLE ÉCHELLE on a '
        + 'regardé.',
    }),
  ]),
  cequilFautEnRetenir:
    'Le troisième verre — l’eau sucrée — est le seul mélange homogène des trois. Le '
    + 'deuxième s’est trahi tout seul, en une heure. Le premier ne se trahit qu’au '
    + 'microscope, et il était hétérogène depuis le début : ce n’est pas le lait qui a '
    + 'changé, c’est la façon de regarder. **Un mélange n’est pas homogène parce qu’on '
    + 'n’y voit rien : il est homogène quand on n’y distingue rien, même en s’en '
    + 'donnant les moyens.**',
  ceQuOnNeFaitPas:
    'On ne verse rien et on ne filtre rien : l’application n’entraîne pas le geste '
    + 'expérimental, elle entraîne le raisonnement sur une situation décrite. Le geste, '
    + 'c’est en classe qu’il se fait.',
});

// ════════════════════════════════════════════════════════════════════════════
// Le cours
// ════════════════════════════════════════════════════════════════════════════

export const COURS = Object.freeze({
  titre: 'Mélange homogène, mélange hétérogène',
  points: Object.freeze([
    Object.freeze({
      id: 'la-definition',
      titre: 'La définition, et le mot qui compte',
      texte:
        'Un mélange est **hétérogène** quand on y **distingue** au moins deux '
        + 'constituants. Il est **homogène** quand on n’en distingue aucun : il a partout '
        + 'le même aspect. Le mot qui compte est **distinguer**, pas « voir » : distinguer, '
        + 'c’est pouvoir montrer du doigt deux choses différentes dans le même récipient.',
    }),
    Object.freeze({
      id: 'les-deux-variables-cachees',
      titre: 'Deux variables que personne n’écrit jamais',
      texte:
        '**L’échelle** : à l’œil nu, à la loupe, au microscope, on ne voit pas la même '
        + 'chose. Le lait paraît uniforme et montre ses gouttelettes de matière grasse au '
        + 'microscope — il est hétérogène. **Le temps** : un mélange qu’on vient d’agiter '
        + 'paraît uniforme quelques secondes, puis se sépare. Une eau boueuse remuée est '
        + 'hétérogène pendant qu’on la remue, et elle l’est encore une heure après, même '
        + 'si le haut de la bouteille est devenu clair. Dire homogène ou hétérogène, c’est '
        + 'donc toujours dire **à quelle échelle** et **après combien de temps** on a '
        + 'regardé.',
    }),
    Object.freeze({
      id: 'ce-que-l-etat-ne-decide-pas',
      titre: 'L’état ne décide de rien',
      texte:
        'Un gaz n’est pas forcément homogène : le brouillard est un mélange hétérogène de '
        + 'gouttelettes d’eau et d’air, et c’est bien pour cela qu’on le voit. Un solide '
        + 'n’est pas forcément hétérogène : un acier est un mélange homogène de fer et de '
        + 'carbone, et rien n’y est visible, même à la loupe. Le critère porte sur ce qu’on '
        + 'distingue, jamais sur l’état.',
    }),
    Object.freeze({
      id: 'a-l-echelle-des-particules',
      titre: 'Ce qu’on verrait à l’échelle des particules',
      texte:
        'Dans un mélange homogène, il y a **plusieurs espèces**, mêlées les unes aux '
        + 'autres, réparties partout de la même façon. « Homogène » ne veut donc jamais '
        + 'dire « un seul constituant » : un corps pur n’a qu’une espèce, un mélange '
        + 'homogène en a plusieurs et ne les montre pas. C’est la différence que les '
        + 'grilles de particules servent à installer.',
    }),
    Object.freeze({
      id: 'separer',
      titre: 'Séparer, et ce que cela prouve',
      texte:
        'Un mélange hétérogène se sépare par **décantation** (on laisse reposer, le plus '
        + 'dense descend) ou par **filtration** (le filtre retient ce qui est en morceaux). '
        + 'Ces deux façons de faire ne fonctionnent que sur de l’hétérogène : si le filtre '
        + 'ne retient rien et si rien ne se dépose, ce n’est pas une preuve d’homogénéité, '
        + 'mais c’est un argument sérieux.',
    }),
  ]),
  aRetenir:
    'Hétérogène : on distingue des constituants. Homogène : on n’en distingue aucun. '
    + 'Toujours dire à quelle échelle et après combien de temps on a regardé — et se '
    + 'souvenir qu’un mélange homogène contient plusieurs constituants, invisibles.',
});

// ════════════════════════════════════════════════════════════════════════════
// La méthode
// ════════════════════════════════════════════════════════════════════════════
//
// Un geste refaisable seul, sans l’application. Le quatrième pas est celui du
// piège `serie-etiquetee-par-le-chapitre` : il ne parle pas de mélanges, il
// parle de la façon dont on lit un énoncé.

export const METHODE = Object.freeze({
  titre: 'Trancher entre homogène et hétérogène, en quatre pas',
  etapes: Object.freeze([
    Object.freeze({
      rang: 1,
      titre: 'Liste ce qui a été mis dedans',
      texte:
        'Relis l’énoncé et écris les constituants, un par un. Deux constituants au '
        + 'moins : c’est un mélange, et la question a un sens. Un seul : ce n’est pas un '
        + 'mélange, et la question ne se pose pas.',
    }),
    Object.freeze({
      rang: 2,
      titre: 'Dis ce que tu DISTINGUES, et à quelle échelle',
      texte:
        'Souligne dans l’énoncé les mots qui disent ce qu’on voit : « des grains », '
        + '« deux couches », « un dépôt », « limpide », « uniforme », « à la loupe », '
        + '« au microscope ». Si tu distingues au moins deux choses différentes : '
        + 'hétérogène. Si tu n’en distingues aucune : homogène.',
    }),
    Object.freeze({
      rang: 3,
      titre: 'Regarde combien de temps a passé',
      texte:
        'Cherche « on remue », « aussitôt », « une heure plus tard », « après une nuit ». '
        + 'Un mélange qu’on agite paraît toujours uniforme. Si l’énoncé décrit une '
        + 'observation faite pendant l’agitation, la réponse ne vaut que pour cet '
        + 'instant-là — et il faut le dire.',
    }),
    Object.freeze({
      rang: 4,
      titre: 'Cache le titre avec la main',
      texte:
        'Ta réponse tiendrait-elle si cet exercice était tombé au milieu d’un autre '
        + 'chapitre ? Si ta seule raison est « c’est ce qu’on fait en ce moment », tu n’as '
        + 'pas encore de raison. Et dans l’autre sens aussi : as-tu écarté une réponse '
        + 'uniquement parce qu’elle était celle du chapitre ? Montre le mot de l’énoncé '
        + 'sur lequel ta réponse s’appuie.',
    }),
  ]),
  piegeTravaille: 'serie-etiquetee-par-le-chapitre',
  erreurQueLaMethodeAttrape:
    'Conclure « homogène » sur une eau boueuse décantée en ne regardant que le haut de '
    + 'la bouteille. Le premier pas rétablit la liste — eau et boue —, le deuxième oblige '
    + 'à dire qu’on distingue un dépôt, et la question se referme.',
});

// ════════════════════════════════════════════════════════════════════════════
// L’entraînement — 10 items
// ════════════════════════════════════════════════════════════════════════════

export const ENTRAINEMENT = Object.freeze([

  // ── e01 · palier 1 · classe C ────────────────────────────────────────────
  //
  // Le cas d’école, servi le premier et sans piège : on distingue les grains
  // pendant qu’on remue. Classe C parce que le verdict est un jugement et rien
  // d’autre — aucune chaîne ne le recalcule, aucune table ne le rejoue.
  {
    id: 'ch01-sf2-e01-sable-remue-dans-l-eau',
    sfPrincipal: 'ch01-sf2-distinguer-melange-homogene-et-heterogene',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'sable-remue-dans-un-verre-d-eau',
    enonce:
      'On verse une cuillère de sable dans un verre d’eau et on remue. On regarde le '
      + 'verre pendant qu’on remue encore : le liquide est trouble et des grains tournent '
      + 'dedans. Ce mélange est-il homogène ou hétérogène ?',
    reponse: {
      libre: false,
      choix: 'heterogene',
      choixPossibles: ['homogene', 'heterogene'],
    },
    relu: { par: 'auteur-du-corpus', date: '2026-08-12', hash: 'f659dd04e7509e13' },
  },

  // ── e02 · palier 1 · classe A ────────────────────────────────────────────
  //
  // La décantation, par le volume. L’item ne demande pas de décanter : il donne
  // le résultat de la nuit et demande d’en tirer un volume. C’est la première
  // fois que « deux parties » devient un nombre.
  {
    id: 'ch01-sf2-e02-eau-boueuse-decantee',
    sfPrincipal: 'ch01-sf2-distinguer-melange-homogene-et-heterogene',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'bouteille-d-eau-boueuse-laissee-une-nuit',
    enonce:
      'Une bouteille contient {{donnee:volumeTotal}} d’eau boueuse. On la laisse reposer '
      + 'une nuit : au matin, la boue tassée au fond occupe {{donnee:volumeDepot}}, et '
      + 'au-dessus le liquide paraît clair. Le mélange est hétérogène : on y distingue deux '
      + 'parties. Quel volume la partie claire occupe-t-elle, avec son unité ?',
    donnees: {
      volumeTotal: { valeur: [250, 1], unite: 'mL' },
      volumeDepot: { valeur: [30, 1], unite: 'mL' },
    },
    calcul: {
      etapes: [{ id: 'clair', expr: '@volumeTotal - @volumeDepot', unite: 'mL' }],
      reponse: 'clair',
    },
    reponse: { valeur: [220, 1], unite: 'mL', semantique: 'exacte' },
  },

  // ── e03 · palier 1 · classe B ────────────────────────────────────────────
  //
  // Premier passage au registre submicroscopique, et il porte tout le poids du
  // cours : un mélange homogène a PLUSIEURS constituants. La grille et la
  // correction sont le même objet — `AIR`, cité deux fois.
  {
    id: 'ch01-sf2-e03-air-a-l-echelle-des-particules',
    sfPrincipal: 'ch01-sf2-distinguer-melange-homogene-et-heterogene',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 1,
    registre: 'submicro',
    type: 'schema-particulaire',
    contexteDeSurface: 'l-air-de-la-salle-de-classe',
    enonce:
      'L’air de la salle est un mélange homogène : on n’y distingue aucun constituant, à '
      + 'aucune échelle accessible à l’œil. Compose la grille qui le représente à l’échelle '
      + 'des particules : huit molécules de diazote, faites chacune de deux atomes d’azote, '
      + 'et deux molécules de dioxygène, faites chacune de deux atomes d’oxygène, à l’état '
      + 'gazeux.',
    figure: { sorte: 'particulaire', description: AIR },
    reponse: { objetFormel: AIR },
  },

  // ── e04 · palier 1 · classe A′ ───────────────────────────────────────────
  //
  // Un fait, rejoué sur la table centrale sourcée : la masse volumique de
  // l’huile. Ce n’est pas un théorème, cela ne se démontre pas — cela se lit,
  // et le contrôle relit la même case.
  {
    id: 'ch01-sf2-e04-masse-volumique-de-l-huile',
    sfPrincipal: 'ch01-sf2-distinguer-melange-homogene-et-heterogene',
    sfSollicites: ['ch04-sf6-identifier-un-materiau-par-sa-masse-volumique'],
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A_TABLE',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'flacon-d-eau-et-d-huile-a-deux-couches',
    enonce:
      'Dans un flacon d’eau et d’huile de tournesol, on distingue deux couches nettement '
      + 'séparées : le mélange est hétérogène. Pour dire laquelle des deux est en haut, on '
      + 'compare deux masses volumiques. Lis dans la table des masses volumiques celle de '
      + 'l’huile de tournesol, et recopie-la avec son unité.',
    requete: { table: 'masses-volumiques', cle: 'huile-de-tournesol', colonne: 'masseVolumique' },
    reponse: { valeur: [92, 100], unite: 'g/cm³', semantique: 'exacte' },
  },

  // ── e05 · palier 2 · classe C · double QCM ───────────────────────────────
  //
  // Le cas où l’apparence trompe, et le format qui le diagnostique. La
  // dimension qui varie est l’objet-support : on passe du sable visible au lait
  // qui ne montre rien. La justification fausse n° 1 est la conception
  // elle-même — « ce qu’un microscope ajoute ne compte pas » — et elle est
  // cohérente : c’est ce qui la rend utile.
  {
    id: 'ch01-sf2-e05-le-lait-double-qcm',
    sfPrincipal: 'ch01-sf2-distinguer-melange-homogene-et-heterogene',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 2,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'un-verre-de-lait-observe-au-microscope',
    enonce:
      'Un verre de lait paraît uniformément blanc : à l’œil nu, on n’y distingue rien. '
      + 'Une goutte posée sous un microscope montre de fines gouttelettes de matière grasse, '
      + 'séparées les unes des autres. Ce mélange est-il homogène ou hétérogène ? Puis '
      + 'choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'heterogene',
      choixPossibles: ['homogene', 'heterogene'],
    },
    justifications: [
      {
        id: 'les-gouttelettes-se-distinguent',
        texte:
          'On y distingue deux constituants dès qu’on regarde d’assez près : les '
          + 'gouttelettes de matière grasse sont là, séparées, et elles ne se sont pas '
          + 'mêlées jusqu’à disparaître.',
        juste: true,
        provenance: 'institutionnelle',
        source: 'Éduscol, ressource d’accompagnement du cycle 4, juin 2016',
      },
      {
        id: 'l-oeil-nu-suffit',
        texte:
          'À l’œil nu on ne voit rien, donc c’est homogène : ce qu’un microscope ajoute '
          + 'ne compte pas, on n’en a pas un sur la table.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'une-seule-couleur',
        texte:
          'Le lait est un seul liquide, d’une seule couleur, partout pareil : il n’a donc '
          + 'qu’un seul constituant.',
        juste: false,
        provenance: 'locale',
      },
    ],
    relu: { par: 'auteur-du-corpus', date: '2026-08-12', hash: 'ee31e212a181ae19' },
  },

  // ── e06 · palier 2 · classe A ────────────────────────────────────────────
  //
  // Même palier, même dimension variée que e05 — l’objet-support change, la
  // tâche reste la même — mais l’item est de classe A : la séparation est
  // décrite, et ce qu’elle laisse passer se calcule.
  {
    id: 'ch01-sf2-e06-filtration-d-une-eau-boueuse',
    sfPrincipal: 'ch01-sf2-distinguer-melange-homogene-et-heterogene',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'filtre-en-papier-pose-sur-un-erlenmeyer',
    enonce:
      'Un technicien fait passer {{donnee:masseMelange}} d’eau boueuse à travers un filtre '
      + 'en papier. Le filtre retient {{donnee:masseDepot}} de dépôt : c’est bien un mélange '
      + 'hétérogène, puisque le filtre a quelque chose à retenir. Quelle masse de liquide '
      + 'est passée à travers, avec son unité ?',
    donnees: {
      masseMelange: { valeur: [180, 1], unite: 'g' },
      masseDepot: { valeur: [7, 1], unite: 'g' },
    },
    calcul: {
      etapes: [{ id: 'filtrat', expr: '@masseMelange - @masseDepot', unite: 'g' }],
      reponse: 'filtrat',
    },
    reponse: { valeur: [173, 1], unite: 'g', semantique: 'exacte' },
  },

  // ── e07 · palier 2 · classe B ────────────────────────────────────────────
  //
  // La dimension qui varie est le REGISTRE, et c’est la seconde des deux
  // dimensions distinctes du palier 2. Une eau gazeuse fermée est le cas où
  // « je ne le vois pas » et « il n’y est pas » se séparent le plus nettement.
  {
    id: 'ch01-sf2-e07-eau-gazeuse-a-l-echelle-des-particules',
    sfPrincipal: 'ch01-sf2-distinguer-melange-homogene-et-heterogene',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 2,
    registre: 'submicro',
    type: 'schema-particulaire',
    dimensionVariee: 'registre',
    contexteDeSurface: 'bouteille-d-eau-gazeuse-fermee',
    enonce:
      'Tant qu’elle est fermée, une eau gazeuse est parfaitement limpide : aucune bulle, '
      + 'rien à distinguer. C’est pourtant un mélange homogène, et le gaz y est bien '
      + 'présent. Compose la grille qui le montre à l’échelle des particules : dix molécules '
      + 'd’eau et trois molécules de dioxyde de carbone mêlées entre elles, à l’état liquide.',
    figure: { sorte: 'particulaire', description: EAU_GAZEUSE },
    reponse: { objetFormel: EAU_GAZEUSE },
  },

  // ── e08 · palier 3 · classe A · lecture ──────────────────────────────────
  //
  // Le mode de réponse change : on ne répond plus à partir d’une phrase, mais à
  // partir d’un tableau. Le tableau est ENGENDRÉ par `DEPOTS_DE_CINQ_TUBES`,
  // qui est aussi ce que la chaîne additionne. Ce n’est pas un item de série :
  // on n’y cherche aucune valeur vraie et on n’y écarte aucune mesure.
  {
    id: 'ch01-sf2-e08-cinq-tubes-de-depot',
    sfPrincipal: 'ch01-sf2-distinguer-melange-homogene-et-heterogene',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'cinq-tubes-d-eau-boueuse-d-une-classe',
    enonce:
      'Cinq élèves ont chacun laissé reposer une nuit un tube d’eau boueuse, puis mesuré le '
      + 'dépôt tombé au fond. Le tableau donne leurs cinq mesures : chaque tube a donné un '
      + 'dépôt, donc chaque tube contenait un mélange hétérogène. Quel volume de dépôt les '
      + 'cinq tubes ont-ils donné en tout, avec son unité ?',
    figure: { sorte: 'tableau', donnees: DEPOTS_DE_CINQ_TUBES },
    // Les cinq mesures ne sont PAS réécrites ici : elles sont lues sur les points
    // du tableau. Une classe A ne peut pas obtenir l'identité de référence de la
    // classe B — sa correction est une chaîne, et une chaîne lit des `donnees`
    // nommées —, mais elle peut au moins n'avoir qu'UNE écriture des nombres.
    // Recopiés, ils auraient pu diverger du tableau affiché sans que rien
    // n'échoue : le contrôle rejoue la chaîne, il ne regarde pas la figure.
    donnees: Object.fromEntries(DEPOTS_DE_CINQ_TUBES.points
      .map(([tube, depot]) => [`t${tube}`, { valeur: [depot, 1], unite: 'mL' }])),
    calcul: {
      etapes: [{ id: 'total', expr: '@t1 + @t2 + @t3 + @t4 + @t5', unite: 'mL' }],
      reponse: 'total',
    },
    reponse: { valeur: [30, 1], unite: 'mL', semantique: 'exacte' },
  },

  // ── e09 · palier 3 · classe C · réponse libre ────────────────────────────
  //
  // Le mode de réponse change encore : on demande d’ÉCRIRE le raisonnement, pas
  // de cocher. C’est le seul item du savoir-faire à réponse libre, et il est
  // seul parce que la relecture humaine coûte cher — l’item porte donc la
  // question sur laquelle une phrase apprend plus qu’un clic.
  //
  // Aucune chaîne de calcul ici : un item qui porterait à la fois un calcul et
  // une réponse libre serait scindable et refusé, à raison.
  {
    id: 'ch01-sf2-e09-expliquer-la-bouteille-decantee',
    sfPrincipal: 'ch01-sf2-distinguer-melange-homogene-et-heterogene',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 3,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'la-moitie-haute-d-une-bouteille-decantee',
    enonce:
      'Une eau boueuse laissée au repos toute une nuit donne, en haut de la bouteille, un '
      + 'liquide qui paraît parfaitement clair. Un élève regarde cette partie-là et conclut : '
      + '« la bouteille contient maintenant un mélange homogène ». Écris en deux phrases ce '
      + 'que son raisonnement laisse de côté, et ce qu’il faudrait regarder pour trancher.',
    reponse: {
      libre: true,
      elementsAttendus: [
        'il n’a regardé qu’une partie de la bouteille, pas la bouteille entière',
        'le dépôt au fond est un constituant qu’on distingue : le mélange reste hétérogène',
        'pour trancher, regarder tout le récipient, et dire à quelle échelle on a regardé',
      ],
    },
    relu: { par: 'auteur-du-corpus', date: '2026-08-12', hash: '16e66bd6fa3214b7' },
  },

  // ── e10 · palier 3 · classe A · prédiction engagée ───────────────────────
  //
  // La prédiction est verrouillée avant l’affichage : sans engagement, il n’y a
  // pas de conflit, juste une information de plus. Cercle 2 — on fait varier
  // une seule chose, ce que le filtre retient, et on prévoit ce qui reste.
  {
    id: 'ch01-sf2-e10-prevoir-le-volume-de-filtrat',
    sfPrincipal: 'ch01-sf2-distinguer-melange-homogene-et-heterogene',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 2,
    palier: 3,
    registre: 'macro',
    type: 'prediction-engagee',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'entonnoir-et-eprouvette-graduee',
    enonce:
      'On verse {{donnee:volumeVerse}} d’eau boueuse dans un filtre posé sur une éprouvette '
      + 'graduée. Le dépôt humide qui restera dans le filtre occupera {{donnee:volumeDepot}}. '
      + 'Écris le volume que tu prévois de lire dans l’éprouvette, avec son unité. Ta '
      + 'prédiction sera verrouillée avant l’affichage du résultat.',
    donnees: {
      volumeVerse: { valeur: [240, 1], unite: 'mL' },
      volumeDepot: { valeur: [15, 1], unite: 'mL' },
    },
    calcul: {
      etapes: [{ id: 'filtrat', expr: '@volumeVerse - @volumeDepot', unite: 'mL' }],
      reponse: 'filtrat',
    },
    reponse: { valeur: [225, 1], unite: 'mL', semantique: 'exacte' },
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════
// Les problèmes — 5 items, tous au palier non étiqueté
// ════════════════════════════════════════════════════════════════════════════
//
// Le palier 4 est celui où la première tâche est de RECONNAÎTRE de quoi il
// s’agit. Trois des cinq portent le piège `serie-etiquetee-par-le-chapitre` et
// sont donc servis hors du chapitre 1 : la condition de validité l’exige, et
// elle a raison — sur un item du chapitre courant, la stratégie « c’est le
// chapitre en cours » donne la bonne réponse et nous compterions une réussite
// pour une conception intacte.

export const PROBLEMES = Object.freeze([

  // ── p01 · palier 4 · classe A ────────────────────────────────────────────
  //
  // Trois couches, donc deux soustractions. Sans piège : c’est le problème de
  // référence, servi dans son chapitre, et il sert de point de comparaison aux
  // trois suivants.
  {
    id: 'ch01-sf2-p01-tube-a-trois-couches',
    sfPrincipal: 'ch01-sf2-distinguer-melange-homogene-et-heterogene',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'tube-ferme-a-trois-couches-superposees',
    enonce:
      'Dans un tube fermé, on a versé du sable, de l’eau et de l’huile, puis on a laissé '
      + 'reposer une nuit. Trois couches se sont formées, nettement distinctes. Le tube '
      + 'contient {{donnee:volumeTotal}} en tout ; le sable au fond occupe '
      + '{{donnee:volumeSable}} et l’eau {{donnee:volumeEau}}. Quel volume la couche d’huile '
      + 'occupe-t-elle, avec son unité ?',
    donnees: {
      volumeTotal: { valeur: [90, 1], unite: 'mL' },
      volumeSable: { valeur: [15, 1], unite: 'mL' },
      volumeEau: { valeur: [50, 1], unite: 'mL' },
    },
    calcul: {
      etapes: [{ id: 'huile', expr: '@volumeTotal - @volumeSable - @volumeEau', unite: 'mL' }],
      reponse: 'huile',
    },
    reponse: { valeur: [25, 1], unite: 'mL', semantique: 'exacte' },
  },

  // ── p02 · palier 4 · classe C · double QCM · FORMAT DIAGNOSTIQUE ─────────
  //
  // Servi au chapitre 6, au milieu d’une série mélangée et sans titre. La
  // réponse attendue n’est PAS celle du chapitre en cours — c’est la clause
  // décisive de la condition de validité : sur un item de transformation
  // chimique servi pendant le chapitre des transformations chimiques, la
  // stratégie de l’élève gagne et l’item le conforte.
  //
  // Le drapeau `estFormatDiagnostique` porte son motif écrit : aucun programme
  // ne sait comparer un item à la prose d’un `formatDiagnostique`, seul un
  // auteur le peut, et il l’écrit.
  {
    id: 'ch01-sf2-p02-sucre-remue-servi-au-chapitre-6',
    sfPrincipal: 'ch01-sf2-distinguer-melange-homogene-et-heterogene',
    sfSollicites: ['ch06-sf1-identifier-une-transformation-chimique'],
    chapitre: 'ch06-transformations-chimiques',
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 4,
    registre: 'macro',
    type: 'double-qcm',
    contexteDeSurface: 'sucre-en-poudre-remue-dans-un-verre-d-eau-tiede',
    enonce:
      'On remue du sucre en poudre dans un verre d’eau tiède jusqu’à ce qu’on n’en voie '
      + 'plus un seul grain. Le liquide est limpide et sucré partout. De quoi s’agit-il ? '
      + 'Puis choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'melange-homogene',
      choixPossibles: ['melange-homogene', 'melange-heterogene', 'transformation-chimique'],
    },
    justifications: [
      {
        id: 'rien-de-nouveau-n-est-apparu',
        texte:
          'Rien de nouveau n’est apparu : c’est toujours de l’eau et du sucre, réparti si '
          + 'finement qu’on ne le distingue plus. Le mélange obtenu est homogène.',
        juste: true,
        provenance: 'institutionnelle',
        source: 'Éduscol, ressource d’accompagnement du cycle 4, juin 2016',
      },
      {
        id: 'c-est-le-chapitre-des-transformations',
        texte:
          'On est dans le chapitre des transformations chimiques, alors le sucre s’est '
          + 'transformé en autre chose : c’est une transformation chimique.',
        juste: false,
        provenance: 'locale',
        piege: 'serie-etiquetee-par-le-chapitre',
      },
      {
        id: 'le-sucre-a-disparu',
        texte:
          'On ne voit plus le sucre, donc il n’est plus là : il ne reste que de l’eau, et '
          + 'de l’eau seule n’est pas un mélange.',
        juste: false,
        provenance: 'locale',
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
      },
    ],
    piege: 'serie-etiquetee-par-le-chapitre',
    situation: {
      chapitreAnnonce: null,
      chapitreEnCours: 'ch06-transformations-chimiques',
      chapitreReel: 'ch01-melanges-et-solubilite',
      serieMelangee: true,
    },
    dispositifServi: 'la-page-qui-ne-tient-pas-sa-promesse',
    estFormatDiagnostique: true,
    motifFormatDiagnostique:
      'Les trois exigences du `formatDiagnostique` sont tenues et vérifiables sur l’item. '
      + '(1) Rien n’annonce le chapitre : ni titre, ni encadré de rappel, ni loi nommée — '
      + '`situation.chapitreAnnonce` vaut null, et l’énoncé ne contient aucun mot du cours '
      + 'du jour. (2) L’item est servi dans une série MÉLANGÉE, avec des items d’au moins '
      + 'deux chapitres différents dont le chapitre 6 en cours : c’est ce mélange, et lui '
      + 'seul, qui rend perdante la stratégie inverse — « la série est mélangée, donc ce '
      + 'n’est jamais le chapitre du jour ». (3) La première question posée est « de quoi '
      + 's’agit-il ? », avant toute question de valeur : l’item ne demande aucun nombre. Et '
      + 'la réponse attendue, « mélange homogène », relève du chapitre 1, pas du chapitre 6 '
      + '— sans quoi la stratégie de l’élève donnerait la bonne réponse et nous compterions '
      + 'une réussite pour une conception intacte.',
    relu: { par: 'auteur-du-corpus', date: '2026-08-12', hash: '17f30e75193525dd' },
  },

  // ── p03 · palier 4 · classe A · SANS piège ───────────────────────────────
  //
  // Servi au chapitre 4, celui de la masse volumique, et sans piège déclaré.
  //
  // Il en portait un — `serie-etiquetee-par-le-chapitre` — sur l’argument que
  // « l’élève qui répond au titre cherche un quotient là où l’énoncé demande une
  // différence ». L’argument ne tient pas à l’exécution : l’énoncé ne fournit
  // aucune masse, donc il n’y a pas de quotient à former, et la seule opération
  // possible est la soustraction que tout le monde fait. L’item ne pouvait pas
  // échouer pour la conception qu’il déclarait viser — il n’aurait su
  // qu’enregistrer des réussites, ce que le `pourquoi` du piège nomme lui-même
  // comme sa panne : « nous aurions compté une réussite pour une conception
  // intacte ». S’ajoutait la saisie libre à sémantique exacte, sans distracteur
  // ni modèle erroné : un nombre faux y est indiscernable d’une étourderie.
  //
  // Il reste ce qu’il est vraiment : un problème de palier 4, servi hors de son
  // chapitre, où deux couches décrites donnent un volume. C’est utile, et ça ne
  // réclame pas le crédit d’un diagnostic.
  {
    id: 'ch01-sf2-p03-deux-couches-servi-au-chapitre-4',
    sfPrincipal: 'ch01-sf2-distinguer-melange-homogene-et-heterogene',
    chapitre: 'ch04-masse-volumique',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'flacon-gradue-pose-sur-la-paillasse',
    enonce:
      'Un flacon gradué contient {{donnee:volumeTotal}} d’un mélange d’eau et d’huile. '
      + 'Après une nuit de repos, deux couches se sont formées : on les distingue nettement. '
      + 'La couche d’huile, en haut, occupe {{donnee:volumeHuile}}. Quel volume la couche '
      + 'd’eau occupe-t-elle, avec son unité ?',
    donnees: {
      volumeTotal: { valeur: [200, 1], unite: 'mL' },
      volumeHuile: { valeur: [50, 1], unite: 'mL' },
    },
    calcul: {
      etapes: [{ id: 'eau', expr: '@volumeTotal - @volumeHuile', unite: 'mL' }],
      reponse: 'eau',
    },
    reponse: { valeur: [150, 1], unite: 'mL', semantique: 'exacte' },
  },

  // ── p04 · palier 4 · classe B ────────────────────────────────────────────
  //
  // Le contre-exemple d’état : un solide, uniforme jusqu’à la loupe, et
  // pourtant un mélange. Cercle 2 — c’est le même critère appliqué en faisant
  // varier une seule chose, l’état de la matière.
  {
    id: 'ch01-sf2-p04-l-acier-est-un-melange',
    sfPrincipal: 'ch01-sf2-distinguer-melange-homogene-et-heterogene',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'B',
    cercle: 2,
    palier: 4,
    registre: 'submicro',
    type: 'schema-particulaire',
    contexteDeSurface: 'une-lame-d-acier-observee-a-la-loupe',
    enonce:
      'Une lame d’acier est grise, brillante et uniforme : on n’y distingue rien, ni à '
      + 'l’œil nu ni à la loupe. C’est pourtant un mélange homogène de deux constituants. '
      + 'Compose la grille qui le représente à l’échelle des particules : quatorze atomes de '
      + 'fer et deux atomes de carbone, à l’état solide.',
    figure: { sorte: 'particulaire', description: ACIER },
    reponse: { objetFormel: ACIER },
  },

  // ── p05 · palier 4 · classe C · double QCM · piège ───────────────────────
  //
  // Servi au chapitre 8, celui du mouvement. Le second dispositif de
  // re-confrontation du piège est servi ici, pour ne pas resservir le premier.
  //
  // La troisième justification IMPORTE le critère du chapitre en cours et
  // atterrit sur « corps pur », qui est l’un des trois choix : c’est ce qui la
  // rend prenable. Elle disait auparavant « il n’y a rien à répondre sur le
  // mélange » — une phrase qui ne justifie aucune des trois cases que le même
  // item force à cocher, donc que l’élève porteur de la conception n’aurait
  // jamais choisie. Elle partage sa case avec `rien-ne-s-est-depose`, et c’est
  // voulu : deux conceptions différentes peuvent mener au même verdict, et c’est
  // précisément ce que le double QCM sert à séparer — l’une lit la perception
  // (« rien ne se voit, donc il n’y a rien »), l’autre lit le contrat (« le
  // chapitre parle de mouvement, donc je juge avec le mouvement »).
  {
    id: 'ch01-sf2-p05-eau-minerale-servie-au-chapitre-8',
    sfPrincipal: 'ch01-sf2-distinguer-melange-homogene-et-heterogene',
    sfSollicites: ['ch01-sf1-distinguer-corps-pur-et-melange'],
    chapitre: 'ch08-mouvement-et-vitesse',
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 4,
    registre: 'macro',
    type: 'double-qcm',
    contexteDeSurface: 'bouteille-d-eau-minerale-posee-depuis-un-mois',
    enonce:
      'Une bouteille d’eau minérale est posée sur une étagère depuis un mois. Le liquide '
      + 'est parfaitement limpide, rien ne s’est déposé au fond. L’étiquette annonce des '
      + 'sels minéraux dissous. De quoi s’agit-il ? Puis choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'melange-homogene',
      choixPossibles: ['corps-pur', 'melange-homogene', 'melange-heterogene'],
    },
    justifications: [
      {
        id: 'plusieurs-constituants-aucun-distingue',
        texte:
          'L’étiquette annonce plusieurs constituants dissous, et pourtant on n’en '
          + 'distingue aucun, même après un mois de repos : c’est la définition d’un '
          + 'mélange homogène.',
        juste: true,
        provenance: 'institutionnelle',
        source: 'Éduscol, ressource d’accompagnement du cycle 4, juin 2016',
      },
      {
        id: 'rien-ne-s-est-depose',
        texte:
          'Rien ne s’est déposé et rien ne se voit, donc il n’y a qu’un seul constituant : '
          + 'c’est de l’eau, et rien d’autre.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'rien-n-a-bouge-donc-rien-n-est-melange',
        texte:
          'On étudie les mouvements et les vitesses en ce moment, et le critère du '
          + 'chapitre, c’est ce qui se déplace : ici rien n’a bougé depuis un mois, donc '
          + 'rien ne s’est mélangé à l’eau — la bouteille ne contient que de l’eau.',
        juste: false,
        provenance: 'locale',
        piege: 'serie-etiquetee-par-le-chapitre',
      },
    ],
    piege: 'serie-etiquetee-par-le-chapitre',
    situation: {
      chapitreAnnonce: null,
      chapitreEnCours: 'ch08-mouvement-et-vitesse',
      chapitreReel: 'ch01-melanges-et-solubilite',
      serieMelangee: true,
    },
    dispositifServi: 'la-question-de-brevet-sans-etiquette',
    relu: { par: 'auteur-du-corpus', date: '2026-08-12', hash: '7864193fdf53b1c2' },
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════
// L’auto-évaluation — 10 items
// ════════════════════════════════════════════════════════════════════════════
//
// Aucun item n’est repris de l’entraînement, VALEURS COMPRISES : les dix
// contextes de surface sont neufs — les vingt-cinq du fichier sont distincts —
// et aucun des triplets de nombres des items de classe A n’apparaît plus haut.
// Un test qui recopie son entraînement se réussit de mémoire, et ne mesure
// alors que la mémoire.

export const AUTO_EVALUATION = Object.freeze([

  // ── t01 · palier 1 · classe C ────────────────────────────────────────────
  {
    id: 'ch01-sf2-t01-jus-d-orange-avec-pulpe',
    sfPrincipal: 'ch01-sf2-distinguer-melange-homogene-et-heterogene',
    sfSollicites: ['ch01-sf1-distinguer-corps-pur-et-melange'],
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'verre-de-jus-d-orange-avec-pulpe',
    enonce:
      'Dans un verre de jus d’orange, on distingue nettement des morceaux de pulpe en '
      + 'suspension, qui remontent quand on remue. Ce mélange est-il homogène ou hétérogène ?',
    reponse: {
      libre: false,
      choix: 'heterogene',
      choixPossibles: ['homogene', 'heterogene'],
    },
    relu: { par: 'auteur-du-corpus', date: '2026-08-12', hash: '7c5d0117b26d2372' },
  },

  // ── t02 · palier 1 · classe A ────────────────────────────────────────────
  {
    id: 'ch01-sf2-t02-sirop-de-menthe',
    sfPrincipal: 'ch01-sf2-distinguer-melange-homogene-et-heterogene',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'verre-de-sirop-de-menthe-prepare',
    enonce:
      'On verse {{donnee:volumeSirop}} de sirop de menthe dans un verre, puis '
      + '{{donnee:volumeEau}} d’eau, et on remue jusqu’à obtenir un liquide vert, de la même '
      + 'teinte partout : le mélange est homogène. Quel volume occupe-t-il, avec son unité ?',
    donnees: {
      volumeSirop: { valeur: [30, 1], unite: 'mL' },
      volumeEau: { valeur: [170, 1], unite: 'mL' },
    },
    calcul: {
      etapes: [{ id: 'melange', expr: '@volumeSirop + @volumeEau', unite: 'mL' }],
      reponse: 'melange',
    },
    reponse: { valeur: [200, 1], unite: 'mL', semantique: 'exacte' },
  },

  // ── t03 · palier 1 · classe A′ ───────────────────────────────────────────
  {
    id: 'ch01-sf2-t03-masse-volumique-du-bois-de-chene',
    sfPrincipal: 'ch01-sf2-distinguer-melange-homogene-et-heterogene',
    sfSollicites: ['ch04-sf6-identifier-un-materiau-par-sa-masse-volumique'],
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A_TABLE',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'copeaux-de-chene-dans-un-seau-d-eau',
    enonce:
      'Des copeaux de bois de chêne flottent à la surface d’un seau d’eau : on les '
      + 'distingue un par un, le mélange est hétérogène. Pour expliquer qu’ils flottent, on '
      + 'compare deux masses volumiques. Lis dans la table des masses volumiques celle du '
      + 'bois de chêne, et recopie-la avec son unité.',
    requete: { table: 'masses-volumiques', cle: 'bois-de-chene', colonne: 'masseVolumique' },
    reponse: { valeur: [75, 100], unite: 'g/cm³', semantique: 'exacte' },
  },

  // ── t04 · palier 2 · classe B ────────────────────────────────────────────
  {
    id: 'ch01-sf2-t04-eau-de-riviere-a-l-echelle-des-particules',
    sfPrincipal: 'ch01-sf2-distinguer-melange-homogene-et-heterogene',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 2,
    registre: 'submicro',
    type: 'schema-particulaire',
    dimensionVariee: 'registre',
    contexteDeSurface: 'l-eau-limpide-d-une-riviere-a-truites',
    enonce:
      'L’eau d’une rivière à truites est limpide : on n’y distingue rien. Des poissons y '
      + 'respirent pourtant, donc du dioxygène y est dissous, et le mélange est homogène. '
      + 'Compose la grille qui le représente à l’échelle des particules : douze molécules '
      + 'd’eau et deux molécules de dioxygène mêlées entre elles, à l’état liquide.',
    figure: { sorte: 'particulaire', description: EAU_ET_DIOXYGENE },
    reponse: { objetFormel: EAU_ET_DIOXYGENE },
  },

  // ── t05 · palier 2 · classe C · double QCM · piège ───────────────────────
  //
  // Le piège au palier 2, dimension `objet-support` : c’est le décor qui change
  // — un gaz, et non plus un liquide. Servi au chapitre 3, celui de l’air.
  //
  // Il était servi au chapitre 7, celui de l’intensité du courant, et c’était le
  // choix qui empêchait le piège de se voir : l’électricité n’offre AUCUNE des
  // trois réponses possibles, donc la stratégie « je réponds ce que dit le
  // chapitre » n’avait nulle part où atterrir, et la justification qui la portait
  // devait se replier sur « il n’y a rien à répondre » — une phrase qu’aucun
  // élève ne coche à côté d’une réponse qu’il vient de cocher. Le chapitre 3
  // enseigne exactement la réponse fausse : « l’air est un mélange homogène de
  // diazote et de dioxygène ». L’élève qui répond au chapitre dit donc
  // « homogène », se trompe, et se voit. La condition de validité tient toujours
  // — la réponse attendue, « mélange hétérogène », relève du chapitre 1 et non du
  // chapitre 3.
  {
    id: 'ch01-sf2-t05-brouillard-servi-au-chapitre-3',
    sfPrincipal: 'ch01-sf2-distinguer-melange-homogene-et-heterogene',
    chapitre: 'ch03-air-et-composition',
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 2,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'brouillard-epais-dans-une-vallee',
    enonce:
      'Un brouillard épais est posé sur la vallée : on ne voit pas à dix mètres, et les '
      + 'phares des voitures y tracent des faisceaux blancs. De quoi s’agit-il ? Puis '
      + 'choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'melange-heterogene',
      choixPossibles: ['melange-homogene', 'melange-heterogene', 'corps-pur'],
    },
    justifications: [
      {
        id: 'des-gouttelettes-en-suspension',
        texte:
          'Le brouillard est fait de fines gouttelettes d’eau en suspension dans l’air. On '
          + 'les distingue — c’est même pour cela qu’on le voit — donc le mélange est '
          + 'hétérogène.',
        juste: true,
        provenance: 'institutionnelle',
        source: 'Éduscol, ressource d’accompagnement du cycle 4, juin 2016',
      },
      {
        id: 'un-gaz-est-toujours-homogene',
        texte:
          'C’est du gaz, et un gaz se mélange toujours complètement : un gaz est donc '
          + 'toujours homogène.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'l-air-du-chapitre-est-homogene',
        texte:
          'On étudie l’air en ce moment, et le cours dit que l’air est un mélange homogène '
          + 'de diazote et de dioxygène. Le brouillard, c’est de l’air : c’est donc un '
          + 'mélange homogène.',
        juste: false,
        provenance: 'locale',
        piege: 'serie-etiquetee-par-le-chapitre',
      },
    ],
    piege: 'serie-etiquetee-par-le-chapitre',
    situation: {
      chapitreAnnonce: null,
      chapitreEnCours: 'ch03-air-et-composition',
      chapitreReel: 'ch01-melanges-et-solubilite',
      serieMelangee: true,
    },
    relu: { par: 'auteur-du-corpus', date: '2026-08-12', hash: 'e593d40392aac03f' },
  },

  // ── t06 · palier 2 · classe A ────────────────────────────────────────────
  {
    id: 'ch01-sf2-t06-sel-fin-dissous',
    sfPrincipal: 'ch01-sf2-distinguer-melange-homogene-et-heterogene',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'saladier-d-eau-salee-sur-une-balance',
    enonce:
      'On remue {{donnee:masseSel}} de sel fin dans {{donnee:masseEau}} d’eau, jusqu’à ne '
      + 'plus voir un seul grain : le mélange obtenu est homogène, et le sel y est toujours. '
      + 'Quelle masse ce mélange a-t-il, avec son unité ?',
    donnees: {
      masseSel: { valeur: [9, 1], unite: 'g' },
      masseEau: { valeur: [111, 1], unite: 'g' },
    },
    calcul: {
      etapes: [{ id: 'melange', expr: '@masseSel + @masseEau', unite: 'g' }],
      reponse: 'melange',
    },
    reponse: { valeur: [120, 1], unite: 'g', semantique: 'exacte' },
  },

  // ── t07 · palier 3 · classe B ────────────────────────────────────────────
  {
    id: 'ch01-sf2-t07-gel-hydroalcoolique-a-l-echelle-des-particules',
    sfPrincipal: 'ch01-sf2-distinguer-melange-homogene-et-heterogene',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 3,
    registre: 'submicro',
    type: 'schema-particulaire',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'flacon-de-gel-hydroalcoolique',
    enonce:
      'Un gel hydroalcoolique est limpide : on n’y distingue ni l’eau ni l’alcool, et '
      + 'pourtant les deux y sont. Compose la grille qui représente ce mélange homogène à '
      + 'l’échelle des particules : neuf molécules d’eau et trois molécules d’éthanol, de '
      + 'formule C₂H₆O, mêlées entre elles, à l’état liquide.',
    figure: { sorte: 'particulaire', description: EAU_ET_ETHANOL },
    reponse: { objetFormel: EAU_ET_ETHANOL },
  },

  // ── t08 · palier 3 · classe A · prédiction engagée ───────────────────────
  {
    id: 'ch01-sf2-t08-lait-centrifuge',
    sfPrincipal: 'ch01-sf2-distinguer-melange-homogene-et-heterogene',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 2,
    palier: 3,
    registre: 'macro',
    type: 'prediction-engagee',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'tube-de-lait-dans-une-centrifugeuse',
    enonce:
      'Un tube contient {{donnee:volumeLait}} de lait, qui paraît parfaitement uniforme. On '
      + 'le fait tourner longuement dans une centrifugeuse : la crème monte et forme une '
      + 'couche de {{donnee:volumeCreme}} en haut du tube — le lait était donc bien '
      + 'hétérogène. Écris le volume que tu prévois pour la partie restée en bas, avec son '
      + 'unité. Ta prédiction sera verrouillée avant l’affichage du résultat.',
    donnees: {
      volumeLait: { valeur: [260, 1], unite: 'mL' },
      volumeCreme: { valeur: [18, 1], unite: 'mL' },
    },
    calcul: {
      etapes: [{ id: 'ecreme', expr: '@volumeLait - @volumeCreme', unite: 'mL' }],
      reponse: 'ecreme',
    },
    reponse: { valeur: [242, 1], unite: 'mL', semantique: 'exacte' },
  },

  // ── t09 · palier 3 · classe C · double QCM · piège ───────────────────────
  //
  // Le piège au palier 3, dimension `mode-de-reponse` — distincte de celle du
  // palier 2, sans quoi rien de neuf ne varierait et il n’y aurait pas de
  // palier. Servi au chapitre 5, celui des atomes et des molécules : le mot
  // « sulfure de fer » est exactement ce que le titre souffle.
  {
    id: 'ch01-sf2-t09-fer-et-soufre-servi-au-chapitre-5',
    sfPrincipal: 'ch01-sf2-distinguer-melange-homogene-et-heterogene',
    chapitre: 'ch05-atomes-molecules',
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 3,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'limaille-de-fer-et-poudre-de-soufre-secouees',
    enonce:
      'On verse de la limaille de fer et de la poudre de soufre dans un bécher, et on '
      + 'secoue longuement, sans chauffer. On obtient une poudre grise, uniforme de loin ; '
      + 'à la loupe, on y distingue encore des grains gris et des grains jaunes. De quoi '
      + 's’agit-il ? Puis choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'melange-heterogene',
      choixPossibles: ['melange-homogene', 'melange-heterogene', 'transformation-chimique'],
    },
    justifications: [
      {
        id: 'a-la-loupe-on-distingue-encore',
        texte:
          'À la loupe on distingue encore les deux constituants, côte à côte : ils ne se '
          + 'sont pas mêlés jusqu’à disparaître, et rien de nouveau n’est apparu.',
        juste: true,
        provenance: 'institutionnelle',
        source: 'Éduscol, ressource d’accompagnement du cycle 4, juin 2016',
      },
      {
        id: 'on-fait-les-atomes-donc-nouveau-corps',
        texte:
          'On travaille les atomes et les molécules en ce moment, donc le fer et le soufre '
          + 'se sont combinés : il s’est formé du sulfure de fer.',
        juste: false,
        provenance: 'locale',
        piege: 'serie-etiquetee-par-le-chapitre',
      },
      {
        id: 'gris-de-loin-donc-homogene',
        texte:
          'La poudre obtenue est grise et pareille partout quand on la regarde de loin : '
          + 'le mélange est donc homogène.',
        juste: false,
        provenance: 'locale',
      },
    ],
    piege: 'serie-etiquetee-par-le-chapitre',
    situation: {
      chapitreAnnonce: null,
      chapitreEnCours: 'ch05-atomes-molecules',
      chapitreReel: 'ch01-melanges-et-solubilite',
      serieMelangee: true,
    },
    relu: { par: 'auteur-du-corpus', date: '2026-08-12', hash: '4923fbe647da9c70' },
  },

  // ── t10 · palier 4 · classe A′ · rituel de contrôle ──────────────────────
  //
  // Pas un automatisme de calcul : le repère qu’il faut avoir en tête pour dire
  // laquelle des deux couches flotte. Exclu de la fenêtre des cinq séances,
  // sinon il sature mécaniquement le cercle 1.
  {
    id: 'ch01-sf2-t10-rituel-masse-volumique-de-l-eau',
    sfPrincipal: 'ch01-sf2-distinguer-melange-homogene-et-heterogene',
    sfSollicites: ['ch04-sf6-identifier-un-materiau-par-sa-masse-volumique'],
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A_TABLE',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'repere-a-connaitre-avant-de-comparer-deux-couches',
    enonce:
      'Devant un mélange à deux couches, on ne peut dire laquelle flotte sur l’autre qu’en '
      + 'comparant à un repère qu’il faut connaître par cœur. Donne la masse volumique de '
      + 'l’eau, avec son unité.',
    requete: { table: 'masses-volumiques', cle: 'eau', colonne: 'masseVolumique' },
    reponse: { valeur: [1, 1], unite: 'g/cm³', semantique: 'exacte' },
    rituelDeControle: true,
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════
// Le tableau servi au moteur
// ════════════════════════════════════════════════════════════════════════════
//
// 10 + 5 + 10 = 25 items. La section n’est pas un champ d’item — le schéma est
// fermé et un champ hors schéma est refusé —, elle est la structure du module.

export default Object.freeze([...ENTRAINEMENT, ...PROBLEMES, ...AUTO_EVALUATION]);
