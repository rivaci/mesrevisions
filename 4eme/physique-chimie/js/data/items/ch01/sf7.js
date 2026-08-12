// Chapitre 1, savoir-faire 7 — Décrire la dissolution d'un gaz dans l'eau et son
// effet sur la masse.
//
// C'est le savoir-faire qui porte le piège FONDATEUR du programme : « la matière
// disparaît quand on ne la voit plus ». Tout ce qui suit a été plié au schéma
// d'item, jamais l'inverse — quand une idée d'exercice ne rentrait pas dans un
// champ existant, c'est l'exercice qui a changé.
//
// ── Le problème de ce savoir-faire, en une phrase ─────────────────────────
//
// **Un gaz dissous ne se voit pas.** Il n'a ni bulle, ni couleur, ni volume
// propre : il n'a que des traces indirectes — un goût qui pique, un poisson qui
// respire, une balance qui bouge. C'est le cas le plus dur de la conception
// fondatrice, parce que tous les autres laissent au moins un indice à l'œil : le
// sucre dissous laisse un liquide qu'on a vu se troubler, la flaque évaporée
// laisse une trace. Ici il n'y a **rien à voir du début à la fin**, et l'élève
// pour qui invisible veut dire absent répond juste à toutes les questions de
// définition sans jamais avoir concédé un mot.
//
// D'où la forme de ce fichier :
//
//   · **Aucun item ne demande « y a-t-il un gaz dissous ? »** La condition de
//     validité du piège refuse le oui/non, et pour une raison qui n'est pas
//     décorative : pendant le chapitre des mélanges, rien ne disparaît jamais, et
//     l'élève le sait avant d'avoir réfléchi. Les items demandent **où** il est et
//     **sous quelle forme** — la question productive que le `formatDiagnostique`
//     du piège déclare canonique.
//   · **La masse est servie comme TRACE, jamais comme leçon.** « De combien la
//     bouteille s'est-elle allégée » est la seule question à laquelle « il a
//     disparu » et « il est parti quelque part » ne répondent pas pareil. C'est ce
//     qui donne à ce savoir-faire ses items de classe A : le désaccord entre les
//     deux modèles y devient un nombre.
//   · **La prédiction est VERROUILLÉE avant le résultat.** Les deux items de type
//     `prediction-engagee` (`p01`, `p02`) engagent l'élève sur une valeur ou sur un
//     lieu avant tout affichage. Sans engagement préalable il n'y a pas de conflit,
//     juste une information de plus — et une information de plus se range à côté
//     de la conception sans la déloger.
//
// ── Les constats du catalogue, et lequel est servi ici ────────────────────
//
// Le piège porte trois constats, et ils sont servis **tels qu'ils sont écrits**,
// jamais réinventés : `js/data/pieges/matiere.js` les tient, `srs.js` les
// distribue, et un `dispositifServi` étranger au piège FAIT LEVER le moteur. Un
// seul est joué ici, et c'est délibéré :
//
//   · `soucoupe-sous-cloche` → `p02`. C'est le seul des trois où la matière
//     invisible est un **gaz** : l'eau quitte la soucoupe, passe dans l'air
//     enfermé, et en ressort sur une paroi froide. Le mouvement est celui de ce
//     savoir-faire, à l'envers.
//   · `sucre-dissous-puis-evapore` porte sur un solide dissous : sa place est aux
//     deux AUTRES savoir-faire qui portent le piège, `ch06-sf2` et `ch06-sf6`.
//     (Et à eux seuls : `savoir-faire.js` n'en déclare pas d'autre. `ch01-sf1`
//     ne porte que `serie-etiquetee-par-le-chapitre` — lui confier un constat de
//     ce piège-ci reviendrait à servir un dispositif que le moteur ne peut pas
//     lui adresser.)
//   · `parfum-a-l-autre-bout-de-la-piece` est une diffusion d'un gaz dans un gaz,
//     sans eau ni masse : il n'y a rien à y décrire de la dissolution.
//
// Les servir tous les trois ici aurait monopolisé le cycle de re-confrontation
// d'un piège de rang 1 que trois savoir-faire portent (`ch01-sf7`, `ch06-sf2`,
// `ch06-sf6`) : `srs.js` refuse de resservir un dispositif tant qu'il en reste un
// non servi, et un savoir-faire qui les épuise tous laisse les deux autres sans
// variation — c'est-à-dire, à la deuxième rencontre, un élève qui se souvient du
// résultat de la pesée.
//
// ── Ce que ce savoir-faire NE COUVRE PAS ──────────────────────────────────
//
//   · **La solubilité d'un solide, son estimation par une série, sa courbe** :
//     `ch01-sf5` et `ch01-sf6`. La courbe de `e09` est bien une courbe de
//     solubilité, mais elle est ici en position de PREUVE du sens de variation, et
//     l'item ne demande ni de la construire ni de critiquer la série.
//   · **Le palier de température comme critère de corps pur** : `ch01-sf3`.
//   · **La conservation de la masse comme savoir-faire** : `ch06-sf6`, et le piège
//     `conservation-de-la-masse` n'est pas déclaré ici. La masse n'apparaît que
//     comme trace d'un gaz ; aucun item ne demande de faire un bilan.
//   · **Le modèle particulaire pour lui-même** : `ch05`. Les deux grilles (`e07`,
//     `t05`) montrent une dispersion, elles ne font pas compter des atomes.
//   · **La pression, la loi de Henry, l'effet de l'ouverture chiffré.** Hors
//     programme de 4ᵉ. Seul le SENS de la variation avec la température est servi,
//     et seulement là où une courbe engendrée le montre.
//   · **Le geste expérimental.** L'application ne l'entraîne pas et elle l'écrit à
//     l'élève : `e03`, `p05` et `t10` demandent de CHOISIR, d'EXPLOITER ou de
//     CRITIQUER un dispositif décrit, jamais de le mettre en œuvre. Aucun énoncé ne
//     dit « fais barboter », « chauffe au bain-marie », « monte le montage ».
//   · **La respiration des poissons**, qui est de la SVT. Elle est un décor et une
//     trace, jamais l'objet d'une question.
//
// ── Le piège que les items ne peuvent PAS porter, et qui est partout ──────
//
// `gaz-n-est-pas-de-la-matiere` est le voisin immédiat de ce savoir-faire — « le
// gaz parti ne pesait rien » — et le catalogue le fait partir du chapitre 3.
// `ch01-sf7` ne le déclare pas, donc **aucun item ne peut l'écrire dans `piege`** :
// `item.js` refuse un piège que le savoir-faire ne porte pas, et il a raison, le
// suivi attribuerait la conception à un savoir-faire qui ne la travaille pas.
// Il apparaît donc là où c'est légitime : dans les **distracteurs** et les
// **justifications fausses**, qui sont rattachés à un piège du catalogue sans
// exiger que le savoir-faire le porte. C'est exactement la précédence de la
// dépendance d'Andersson vue depuis le chapitre 1 : l'élève rencontre l'idée
// avant que le piège ne démarre sa file, et la file démarre au chapitre 3.
//
// ── Les classes, et le compte ─────────────────────────────────────────────
//
// 25 items : 13 en B, 8 en A, 1 en A′, 3 en C. Les trois C sont les trois doubles
// QCM, où la JUSTIFICATION n'a aucune garantie mécanique — 3 sur 25, soit 12 %,
// bien sous le tiers. Aucun item n'est à la fois calculé et rédigé : `p05`
// exploite une série et rend un nombre, la critique du dispositif est un item
// séparé (`t10`), avec sa propre réponse formelle.
//
// La classe B domine parce que **désigner est un objet formel** : « où est-il et
// sous quelle forme » se corrige sur un couple (lieu, forme), pas sur une phrase.
// C'est ce qui permet à la question productive du format diagnostique de ne PAS
// coûter du budget de relecture humaine.
//
// ── Ce qui n'est pas dans le schéma d'item, et vit à côté ─────────────────
//
// `DECOUVERTE`, `COURS` et `METHODE` ne sont pas des items : le schéma est une
// liste fermée de trente champs et aucun ne porte de la prose de cours. Ils sont
// exportés séparément, et aucun module ne les lit encore — écrit ici plutôt que
// découvert plus tard. Ils CITENT le catalogue des pièges (`regle`, `controle`)
// au lieu de le recopier : deux proses égales par copie divergent au premier
// auteur qui corrige l'une des deux.

import { SANS_UNITE } from '../../../unites.js';

// ════════════════════════════════════════════════════════════════════════════
// Les objets formels — écrits une fois, cités par la correction
// ════════════════════════════════════════════════════════════════════════════
//
// Pour les items de classe B sans figure, l'objet formel n'engendre aucun dessin :
// il EST la correction, et l'énoncé n'en est que la lecture en français. Pour les
// deux grilles et les deux graphiques, la même constante est citée par la figure
// ET par `reponse.objetFormel` — identité de référence, contrôlée par `item.js`.

/** La réponse à la question productive du format diagnostique : un LIEU, une
 *  FORME, et la trace qui le prouve. Trois champs, parce que « il est dans l'eau »
 *  sans la forme laisse passer l'élève qui imagine une flaque de gaz au fond du
 *  verre, et parce que la trace est ce que le `controle` du piège demande de
 *  chercher — autre chose que la vue. */
const ouEstIl = (e) => Object.freeze({ question: 'ou-est-il-et-sous-quelle-forme', ...e });

const OU_EST_LE_GAZ_BOUTEILLE_FERMEE = ouEstIl({
  lieu: 'dans-l-eau-elle-meme',
  forme: 'molecules-dispersees-entre-celles-de-l-eau',
  visible: false,
  trace: 'l-eau-pique-la-langue',
});

const OU_EST_LE_GAZ_CANETTE_FERMEE = ouEstIl({
  lieu: 'dans-le-liquide-de-la-canette',
  forme: 'molecules-dispersees-entre-celles-du-liquide',
  visible: false,
  trace: 'la-canette-est-dure-au-toucher-et-mousse-a-l-ouverture',
});

const OU_EST_LE_DIOXYGENE_DE_L_AQUARIUM = ouEstIl({
  lieu: 'dans-l-eau-de-l-aquarium',
  forme: 'molecules-dispersees-entre-celles-de-l-eau',
  visible: false,
  trace: 'les-poissons-respirent-sans-remonter-a-la-surface',
});

/** La trace nomme le récipient et le moment de l'item qui la cite — `e10`, une
 *  carafe pesée le soir. Une trace qui parle d'une bouteille et d'hier soir est
 *  servie telle quelle à l'élève comme correction : elle doit décrire SA
 *  situation, pas celle du voisin. */
const OU_EST_LE_GAZ_DE_LA_CARAFE_OUVERTE = ouEstIl({
  lieu: 'dans-l-air-de-la-piece',
  forme: 'molecules-melangees-a-celles-de-l-air',
  visible: false,
  trace: 'la-carafe-pese-quelques-grammes-de-moins-que-ce-matin',
});

const OU_EST_LE_GAZ_DU_SODA_EVENTE = ouEstIl({
  lieu: 'dans-l-air-du-refrigerateur',
  forme: 'molecules-melangees-a-celles-de-l-air',
  visible: false,
  trace: 'le-soda-ne-pique-plus-et-le-verre-s-est-allege',
});

const OU_EST_LE_DIOXYGENE_APRES_EBULLITION = ouEstIl({
  lieu: 'dans-l-air-au-dessus-de-la-casserole',
  forme: 'molecules-melangees-a-celles-de-l-air',
  visible: false,
  trace: 'un-poisson-place-dans-cette-eau-manque-d-air',
});

/** Le constat `soucoupe-sous-cloche` du catalogue, rendu en objet formel : l'eau
 *  n'a pas quitté l'existence, elle a quitté la soucoupe. La `trace` est celle que
 *  le constat décrit — les gouttes sur la paroi —, et c'est elle qui fait du
 *  dispositif une réfutation plutôt qu'une affirmation de plus. */
const OU_EST_L_EAU_SOUS_LA_CLOCHE = ouEstIl({
  lieu: 'dans-l-air-enferme-sous-la-cloche',
  forme: 'vapeur-invisible-melangee-a-l-air',
  visible: false,
  trace: 'des-gouttes-apparaissent-sur-la-paroi-interieure',
});

/** Le geste de contrôle, choisi parmi des contrôles nommés — pas une phrase. Le
 *  rituel du savoir-faire : chercher une trace AUTRE QUE LA VUE, ce que le
 *  `controle` du piège écrit une fois pour toutes. */
const CONTROLE_DU_GAZ_DISSOUS = Object.freeze({
  question: 'quel-controle-prouve-la-presence-du-gaz',
  choisi: 'rechauffer-doucement-l-eau-et-regarder-des-bulles-se-former-sur-les-parois',
  ecartes: Object.freeze([
    'regarder-le-verre-a-contre-jour',
    'verser-l-eau-dans-un-verre-plus-large',
    'attendre-que-l-eau-devienne-trouble',
  ]),
});

/** Le dispositif qui TRANCHE, parmi trois décrits. Cercle 2 : ce n'est pas la
 *  mesure qui décide, c'est ce qu'elle SÉPARE. Regarder les bulles ne sépare rien,
 *  puisque l'absence de bulle est justement ce qu'on veut interpréter. */
// ⚠ Le dispositif retenu ne tranche QUE sur une eau gazeuse. Sur une eau plate,
// le gaz dissous est déjà en équilibre avec l'air de la pièce : ouvrir la
// bouteille ne le fait pas partir, et ce qu'une balance de classe lirait est
// nul. La version d'origine de `t10` faisait porter le doute sur une « eau
// minérale plate » et déclarait la pesée concluante — elle ne l'était pas.
const DISPOSITIF_QUI_TRANCHE = Object.freeze({
  question: 'lequel-permet-de-conclure',
  choisi: 'peser-la-bouteille-fermee-puis-la-repeser-ouverte-apres-deux-jours',
  ecartes: Object.freeze([
    'regarder-s-il-monte-des-bulles',
    'comparer-la-transparence-avec-une-bouteille-d-eau-plate',
  ]),
  pourquoi: 'seule-la-balance-repond-quand-il-n-y-a-rien-a-voir',
});

// ── Les descriptions particulaires ────────────────────────────────────────
//
// Le rayon d'un atome est dérivé de son seul symbole par `schema.js` : deux
// grilles du même fichier ne peuvent pas dessiner l'oxygène à deux tailles. Ce
// qui est montré n'est pas un comptage d'atomes — c'est une DISPERSION : les
// molécules du gaz sont éparpillées entre celles de l'eau, jamais réunies en
// paquet, et le brassage de `schema.js` le garantit sans qu'aucun auteur ait à
// placer un disque.

const GRILLE_EAU_GAZEUSE_FERMEE = Object.freeze({
  etat: 'liquide',
  graine: 19,
  contenu: Object.freeze([
    Object.freeze({
      nom: 'eau',
      formule: 'H₂O',
      nombre: 12,
      atomes: Object.freeze([{ element: 'O' }, { element: 'H', nombre: 2 }]),
    }),
    Object.freeze({
      nom: 'dioxyde de carbone',
      formule: 'CO₂',
      nombre: 4,
      atomes: Object.freeze([{ element: 'C' }, { element: 'O', nombre: 2 }]),
    }),
  ]),
});

const GRILLE_EAU_DU_ROBINET = Object.freeze({
  etat: 'liquide',
  graine: 41,
  contenu: Object.freeze([
    Object.freeze({
      nom: 'eau',
      formule: 'H₂O',
      nombre: 14,
      atomes: Object.freeze([{ element: 'O' }, { element: 'H', nombre: 2 }]),
    }),
    Object.freeze({
      nom: 'dioxygène',
      formule: 'O₂',
      nombre: 2,
      atomes: Object.freeze([{ element: 'O' }, { element: 'O' }]),
    }),
  ]),
});

// ── Les jeux de mesures ───────────────────────────────────────────────────
//
// Le graphique et le tableau sont ENGENDRÉS par ces objets. Sur les deux items de
// lecture graphique, la tolérance n'est pas saisie : `schema.js` la calcule, une
// demi-graduation de l'axe des ordonnées. C'est le bénéfice collatéral de
// l'engendrement des figures, et il tombe exactement là où la tolérance est un
// contenu faillible.

/** La solubilité du dioxyde de carbone, en grammes par litre d'eau. Elle DÉCROÎT
 *  quand la température monte, à l'inverse de tout ce que l'élève a vu sur le
 *  sucre — c'est le seul point de l'item, et il est montré, pas affirmé. */
const SOLUBILITE_DU_DIOXYDE_DE_CARBONE = Object.freeze({
  titre: "Masse maximale de dioxyde de carbone qu'un litre d'eau peut contenir dissoute, selon la température",
  x: Object.freeze({ titre: 'Température (°C)', min: 0, max: 50, pas: 10 }),
  y: Object.freeze({ titre: 'Dioxyde de carbone dissous (g/L)', min: 0, max: 3.5, pas: 0.5 }),
  points: Object.freeze([[0, 3.3], [10, 2.3], [20, 1.7], [30, 1.3], [40, 1], [50, 0.8]].map(Object.freeze)),
});

// ── Le plafond que ces trois jeux ne doivent pas franchir ─────────────────
//
// Une eau gazeuse ne contient pas la quantité de gaz qu'on veut : les eaux
// pétillantes du commerce tiennent entre 5 et 8 grammes de dioxyde de carbone
// par litre, et la limite n'est pas commerciale — c'est la pression que tient
// une bouteille. Un jeu de mesures qui fait partir 5,5 g d'un demi-litre
// annonce 11 g/L, soit une eau qui n'existe pas ; l'élève ne le verra pas, et
// c'est exactement pourquoi il faut le voir ici. Les trois jeux ci-dessous
// tiennent tous sous 8 g/L, et les items chiffrés du fichier aussi.

/** Le dégazage d'une petite bouteille laissée ouverte : la masse tombe, puis se
 *  stabilise. La stabilisation est la partie utile — elle dit que le départ du gaz
 *  s'arrête, ce qu'aucun modèle « ça s'évapore petit à petit » ne prédit.
 *  Un demi-litre, 3 g de gaz en tout : 6 g/L. */
const DEGAZAGE_D_UNE_PETITE_BOUTEILLE = Object.freeze({
  titre: "Masse d'une petite bouteille d'eau gazeuse de 50 cL laissée ouverte, pesée toutes les deux heures",
  x: Object.freeze({ titre: 'Temps (h)', min: 0, max: 12, pas: 2 }),
  y: Object.freeze({ titre: 'Masse de la bouteille (g)', min: 510, max: 516, pas: 2 }),
  points: Object.freeze([[0, 514], [2, 512.5], [4, 512], [6, 511.5], [8, 511.2], [10, 511], [12, 511]].map(Object.freeze)),
});

/** Les six pesées d'un verre d'eau gazeuse, heure par heure. Le tableau montre ce
 *  que la chaîne de calcul exploite : le stimulus et la donnée sont le même objet.
 *  Un verre de 20 cL, 1,2 g de gaz en tout : 6 g/L. */
const PESEES_D_UN_VERRE_D_EAU_GAZEUSE = Object.freeze({
  titre: "Masse d'un verre contenant 20 cL d'eau gazeuse, pesé toutes les heures",
  x: Object.freeze({ titre: 'Temps (h)', min: 0, max: 5, pas: 1 }),
  y: Object.freeze({ titre: 'Masse du verre (g)', min: 248, max: 250.5, pas: 0.5 }),
  points: Object.freeze([[0, 250], [1, 249.4], [2, 249.1], [3, 248.9], [4, 248.8], [5, 248.8]].map(Object.freeze)),
});

// ════════════════════════════════════════════════════════════════════════════
// La découverte, le cours, la méthode — hors schéma d'item
// ════════════════════════════════════════════════════════════════════════════

/**
 * La découverte. Elle ne DIT pas que le gaz est là : elle fait rater une
 * prédiction sur une balance.
 *
 * La forme est celle des `constats` du catalogue — prédiction verrouillée, puis
 * résultat, puis conflit —, et le résultat est DÉTERMINÉ : il ne dépend pas de ce
 * que l'élève fait, donc le dispositif ne peut pas tomber à plat. C'est le point
 * que `didactique.md` § 2.1 pose comme condition d'un conflit qui déplace
 * quelque chose.
 */
export const DECOUVERTE = Object.freeze({
  titre: 'La bouteille qui maigrit sans rien perdre',
  texte:
    'Une bouteille d’eau gazeuse fermée est posée sur une balance de cuisine. '
    + 'Rien ne bouge dedans : pas une bulle, pas un mouvement. On ôte le bouchon '
    + 'et on la laisse simplement là, à l’air libre, deux jours durant. Personne '
    + 'ne verse rien, personne ne boit, et le niveau de l’eau ne baisse pas assez '
    + 'pour se voir.',
  predictionEngagee:
    'Verrouille ta prédiction avant de voir le résultat : au bout de deux jours, '
    + 'la balance affichera-t-elle plus, autant, ou moins qu’au départ ? Et si '
    + 'elle affiche moins, écris ce qui est parti.',
  resultat:
    'Elle affiche moins — quatre grammes de moins, et le niveau de l’eau est resté '
    + 'le même. Rien de visible n’a quitté la bouteille.',
  conflit:
    'Quatre grammes sont partis, et personne ne les a vus partir. Ils étaient donc '
    + 'là avant, sans se voir non plus : le gaz était DANS l’eau, dissous, et il '
    + 's’en est allé molécule après molécule. Ce qu’on ne voit pas peut peser, et '
    + 'ce qui pèse est quelque part.',
  citeLePiege: 'matiere-disparait-quand-on-ne-la-voit-plus',
});

/**
 * Le cours. Trois blocs, et pas un de plus.
 *
 * La règle du piège n'est pas recopiée : elle est écrite une fois dans
 * `js/data/pieges/matiere.js`, et `renvoiRegle` la cite.
 */
export const COURS = Object.freeze([
  Object.freeze({
    type: 'definition',
    titre: 'Un gaz peut se dissoudre dans l’eau',
    texte:
      'Un gaz peut se **dissoudre** dans un liquide : ses molécules se dispersent '
      + 'entre celles du liquide, si loin les unes des autres qu’**aucune bulle ne '
      + 'se voit**. L’eau gazeuse contient du dioxyde de carbone dissous ; l’eau '
      + 'd’un aquarium contient du dioxygène dissous, et c’est lui que les poissons '
      + 'respirent.\n'
      + 'Le mélange obtenu est **homogène** : on ne distingue pas le gaz du liquide. '
      + 'Il n’en est pas moins un mélange — il y a bien deux espèces chimiques.',
  }),
  Object.freeze({
    type: 'propriete',
    titre: 'Le gaz s’en va quand l’eau se réchauffe',
    texte:
      'Un gaz se dissout **d’autant moins que l’eau est chaude**. C’est l’inverse '
      + 'du sucre, et c’est le point à retenir : en réchauffant une eau gazeuse, on '
      + 'voit des bulles apparaître sur les parois, puis monter. Le gaz ne se '
      + 'fabrique pas à ce moment-là — **il était déjà là**, et il ressort.\n'
      + 'Ouvrir la bouteille produit le même effet, pour une autre raison.',
  }),
  Object.freeze({
    type: 'exemple',
    titre: 'Le gaz dissous pèse',
    texte:
      'Un gaz dissous fait partie de ce que la balance mesure.\n'
      + '**Bouteille fermée** : le gaz sort de l’eau, fait des bulles, mais reste '
      + 'dans la bouteille — la masse **ne change pas**.\n'
      + '**Bouteille ouverte** : le gaz s’en va dans l’air de la pièce — la masse '
      + '**diminue**, et elle diminue exactement de la masse du gaz parti.',
  }),
]);

/**
 * La méthode. Trois gestes, dans l'ordre, et le troisième est le contrôle.
 *
 * Le contrôle n'est pas réécrit : c'est celui du piège, cité par son identifiant.
 * Le geste propre à ce savoir-faire est le premier — dire OÙ, au lieu de dire si
 * on voit.
 */
export const METHODE = Object.freeze({
  titre: 'Un gaz qu’on ne voit pas : trois gestes',
  etapes: Object.freeze([
    Object.freeze({
      geste: 'Demande-toi OÙ il est, jamais s’il est encore là.',
      detail:
        'Trois réponses possibles, et trois seulement : **dans le liquide** '
        + '(dissous), **au-dessus du liquide** (en bulles, dans le haut de la '
        + 'bouteille), ou **dehors** (dans l’air de la pièce). Choisis-en une et '
        + 'dis sous quelle forme.',
    }),
    Object.freeze({
      geste: 'Regarde ce qui a changé : la température, ou le bouchon.',
      detail:
        'L’eau s’est réchauffée → le gaz quitte l’eau. Le bouchon est ouvert → le '
        + 'gaz peut quitter la bouteille. Bouchon fermé → il a beau sortir de '
        + 'l’eau, il ne va nulle part, et la balance ne bouge pas.',
    }),
    Object.freeze({
      geste: 'Contrôle : cherche une trace autre que la vue.',
      detail:
        'Le goût qui pique, le poisson qui respire, la balance qui descend. Si une '
        + 'seule de ces traces répond, « je ne vois rien » n’est plus une réponse '
        + 'recevable — et si aucune ne répond là où tu cherches, cherche ailleurs.',
    }),
  ]),
  renvoiControle: 'matiere-disparait-quand-on-ne-la-voit-plus',
});

// ════════════════════════════════════════════════════════════════════════════
// Les items
// ════════════════════════════════════════════════════════════════════════════

const SF = 'ch01-sf7-decrire-la-dissolution-d-un-gaz';
const CH01 = 'ch01-melanges-et-solubilite';
const PIEGE = 'matiere-disparait-quand-on-ne-la-voit-plus';
const EDUSCOL = "Éduscol, ressource d'accompagnement du cycle 4, juin 2016";

export default Object.freeze([

  // ══════════════════════════════════════════════════════════════════════════
  // ENTRAÎNEMENT — 10 items
  // ══════════════════════════════════════════════════════════════════════════

  // ── e01 · palier 1 · LE FORMAT DIAGNOSTIQUE, versant dissolution ─────────
  //
  // La question productive du piège, dans le seul cas où il n'y a strictement
  // rien à voir : bouteille fermée, aucune bulle, et pourtant le gaz est là. La
  // réponse n'est pas un mot mais un couple (lieu, forme) — objet formel, donc
  // classe B, donc corrigé sans coûter de relecture humaine.
  {
    id: 'ch01-sf7-e01-ou-est-le-gaz-de-la-bouteille-fermee',
    sfPrincipal: SF,
    chapitre: CH01,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'bouteille-d-eau-gazeuse-fermee-et-froide',
    enonce:
      'Une bouteille d’eau gazeuse sort du réfrigérateur, bouchon vissé. Elle est '
      + 'parfaitement transparente : pas une bulle ne monte, rien ne bouge. '
      + 'Pourtant, dès qu’on en boira, l’eau piquera la langue. Où est le dioxyde '
      + 'de carbone en ce moment, et sous quelle forme ?',
    reponse: { objetFormel: OU_EST_LE_GAZ_BOUTEILLE_FERMEE },
    piege: PIEGE,
    // La condition de validité est DÉRIVÉE de cet objet, jamais d'un drapeau :
    // rien n'est visible à la fin, et la réponse demandée n'est pas un oui/non.
    situation: {
      visibiliteApres: 'invisible',
      modeDeReponse: 'designation-du-lieu-et-de-la-forme',
      ouEstLaMatiere: 'dans-le-liquide',
      contenant: 'ferme',
    },
    estFormatDiagnostique: true,
    motifFormatDiagnostique:
      'Question PRODUCTIVE — « où est-il, sous quelle forme » — et non « y a-t-il '
      + 'encore du gaz ? », que le contrat didactique remplirait à la place de '
      + 'l’élève : pendant le chapitre des mélanges, rien ne disparaît jamais. Le '
      + 'contexte est une DISSOLUTION, la matière restant dans le récipient : c’est '
      + 'l’un des deux contextes que le `formatDiagnostique` du piège impose sur la '
      + 'série des réussites, l’autre étant couvert par `p02`.',
    distracteurs: [
      {
        id: 'il-n-y-en-a-pas-encore',
        texte: 'Il n’y en a pas encore : le gaz se fabriquera quand on ouvrira la bouteille.',
        piege: PIEGE,
      },
      // ⚠ Ce distracteur portait `vide-entre-les-particules-rempli`, et cette
      // attribution ne tenait pas : la `regle` de ce piège dit qu'entre deux
      // particules il n'y a RIEN — « pas de vapeur, pas de gaz » —, ce qui ne
      // contredit pas « dans l'eau, il n'y a que de l'eau », mais le conforte ;
      // et son `controle` (« ce que tu as mis entre les particules, de quoi
      // est-il fait ? ») ne mord sur rien, puisque cet élève-là n'y a justement
      // rien mis. Le piège qui le réfute est le fondateur : son `controle` dit
      // de chercher une trace autre que la vue, et l'énoncé en tend une — l'eau
      // piquera la langue, donc le gaz est DANS l'eau et pas seulement en haut.
      {
        id: 'une-poche-de-gaz-en-haut',
        texte: 'Tout le gaz est en haut, dans le vide sous le bouchon : dans l’eau, il n’y a que de l’eau.',
        piege: PIEGE,
      },
    ],
  },

  // ── e02 · palier 1 · la masse comme TRACE ────────────────────────────────
  //
  // La seule question à laquelle « il a disparu » et « il est parti quelque
  // part » ne répondent pas pareil. Classe A : la chaîne est rejouée en
  // rationnels exacts avec dimensions, et le distracteur n'est pas inventé — il
  // est produit par un modèle erroné EXÉCUTABLE, celui qui compte pour rien ce
  // qu'on n'a pas vu partir.
  {
    id: 'ch01-sf7-e02-de-combien-la-bouteille-s-est-elle-allegee',
    sfPrincipal: SF,
    chapitre: CH01,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'grande-bouteille-pesee-avant-et-apres-deux-jours',
    enonce:
      'Fermée, une bouteille d’eau gazeuse pèse {{donnee:mAvant}}. On ôte le '
      + 'bouchon et on la laisse deux jours sur la table, sans y toucher : le '
      + 'niveau de l’eau n’a pas bougé, mais elle ne pique plus. La balance affiche '
      + 'alors {{donnee:mApres}}. Quelle masse de gaz s’est échappée ? Donne-la avec '
      + 'son unité.',
    donnees: {
      mAvant: { valeur: [1543, 1], unite: 'g' },
      mApres: { valeur: [1538, 1], unite: 'g' },
    },
    calcul: {
      etapes: [{ id: 'gazParti', expr: '@mAvant - @mApres', unite: 'g' }],
      reponse: 'gazParti',
    },
    reponse: { valeur: [5, 1], unite: 'g', semantique: 'exacte' },
    distracteurs: [
      // ⚠ Ce distracteur portait le piège fondateur, et le nom de son propre
      // modèle disait déjà pourquoi c'était faux : « ne PESAIT rien ». Le
      // fondateur soutient que la matière invisible EXISTE encore — il ne
      // réfute pas un élève qui répond « rien n'est sorti », lequel conserve
      // tout plutôt que de faire disparaître quoi que ce soit. Le piège qui le
      // réfute est celui du gaz sans masse : sa `regle` dit qu'un gaz « entre
      // et sort d'un bilan de masse en emportant sa masse avec lui », et son
      // `controle` demande dans quel sens la balance doit bouger.
      {
        id: 'rien-n-est-parti',
        valeur: [0, 1],
        unite: 'g',
        piege: 'gaz-n-est-pas-de-la-matiere',
        modeleErrone: {
          id: 'ce-qu-on-n-a-pas-vu-partir-ne-pesait-rien',
          nom:
            'modèle « rien de visible n’est sorti, donc rien n’est sorti » : la masse '
            + 'partie est comptée nulle',
          calcul: { etapes: [{ id: 'x', expr: '@mAvant × 0', unite: 'g' }], reponse: 'x' },
        },
      },
    ],
  },

  // ── e03 · palier 1 · le rituel du contrôle ───────────────────────────────
  //
  // Pas un automatisme de calcul : le GESTE DE CONTRÔLE, qui est ce qui manque au
  // diagnostic. Le `controle` du piège dit « cherche une trace autre que la vue » ;
  // l'item demande LAQUELLE, sur un cas où toutes les traces visuelles sont
  // muettes. Exclu de la fenêtre des cinq séances par le moteur.
  {
    id: 'ch01-sf7-e03-quel-controle-avant-de-conclure',
    sfPrincipal: SF,
    chapitre: CH01,
    programme: '2020',
    classe: 'B',
    cercle: 2,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'verre-d-eau-du-robinet-qu-on-croit-sans-gaz',
    enonce:
      'Un camarade remplit un verre au robinet, le regarde et conclut : « aucune '
      + 'bulle, donc il n’y a aucun gaz là-dedans ». Parmi ces quatre gestes, lequel '
      + 'permettrait de le contredire ? Choisis-en un seul : regarder le verre à '
      + 'contre-jour ; le laisser sur un radiateur et regarder les parois ; verser '
      + 'l’eau dans un verre plus large ; attendre que l’eau devienne trouble.',
    reponse: { objetFormel: CONTROLE_DU_GAZ_DISSOUS },
    distracteurs: [
      {
        id: 'regarder-mieux',
        texte: 'Le contre-jour : si on ne voit rien, c’est qu’il n’y a rien.',
        piege: PIEGE,
      },
    ],
    rituelDeControle: true,
  },

  // ── e04 · palier 1 · classe A′, et le registre symbolique ────────────────
  //
  // Un fait n'est pas un théorème : le symbole de l'élément ne se démontre pas, il
  // se LIT dans la table centrale sourcée, et le contrôle rejoue la lecture. Sans
  // cette classe, l'item tombait en C et consommait du budget de relecture pour
  // une valeur mécaniquement vérifiable. C'est aussi le seul item du fichier au
  // registre symbolique — le triplet de Johnstone n'est pas décoratif : il sépare
  // « il ne sait pas ce qu'est un gaz dissous » de « il ne sait pas de quel niveau
  // on parle ».
  {
    id: 'ch01-sf7-e04-le-symbole-de-l-element-carbone',
    sfPrincipal: SF,
    // `ch05-sf2`, et non `ch05-sf7` : ce qui est sollicité ici est « associer un
    // symbole à un élément », pas « interpréter un changement d'état au niveau
    // microscopique », dont cet item ne fait rien — il n'y a aucun changement
    // d'état dans une étiquette de bouteille.
    sfSollicites: ['ch05-sf2-associer-un-symbole-a-un-element'],
    chapitre: CH01,
    programme: '2020',
    classe: 'A_TABLE',
    cercle: 1,
    palier: 1,
    registre: 'symbolique',
    type: 'court',
    contexteDeSurface: 'etiquette-d-une-eau-gazeuse',
    enonce:
      'L’étiquette d’une eau gazeuse annonce du dioxyde de carbone dissous, de '
      + 'formule CO₂. Cette formule est faite de deux symboles d’éléments. Écris '
      + 'celui du carbone, puis coche « sans unité ».',
    requete: { table: 'symboles-des-elements', cle: 'carbone', colonne: 'symbole' },
    reponse: { valeur: 'C', unite: SANS_UNITE, semantique: 'exacte' },
  },

  // ── e05 · palier 2 · même piège, autre support ───────────────────────────
  //
  // La dimension variée est `objet-support` : on quitte la bouteille pour
  // l'aquarium, et le gaz change — dioxygène au lieu de dioxyde de carbone. Rien
  // d'autre ne bouge, et c'est le principe : la difficulté croît par VARIATION, et
  // le contrôle refuse que les paliers 2 et 3 d'un même piège en déclarent une
  // seule pour deux.
  {
    id: 'ch01-sf7-e05-ou-est-le-dioxygene-de-l-aquarium',
    sfPrincipal: SF,
    chapitre: CH01,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'aquarium-de-salon-sans-bulleur',
    enonce:
      'Un aquarium sans bulleur : l’eau est limpide, immobile, et les poissons y '
      + 'vivent depuis des mois sans jamais remonter respirer à la surface. Le '
      + 'dioxygène qu’ils respirent, où est-il, et sous quelle forme ?',
    reponse: { objetFormel: OU_EST_LE_DIOXYGENE_DE_L_AQUARIUM },
    piege: PIEGE,
    situation: {
      visibiliteApres: 'invisible',
      modeDeReponse: 'designation-du-lieu-et-de-la-forme',
      ouEstLaMatiere: 'dans-le-liquide',
      contenant: 'ouvert',
    },
    distracteurs: [
      {
        id: 'ils-le-prennent-en-surface',
        texte: 'Il n’y en a pas dans l’eau : les poissons le prennent dans l’air, en haut.',
        piege: PIEGE,
      },
      {
        id: 'l-eau-en-contient-par-nature',
        texte: 'L’eau, c’est H₂O : l’oxygène est déjà dedans, ils respirent celui-là.',
        piege: 'formule-substance-ou-entite',
      },
    ],
  },

  // ── e06 · palier 2 · la grandeur en jeu change ───────────────────────────
  //
  // Même piège de fond, autre grandeur : on ne demande plus où est le gaz mais
  // COMBIEN il y en a par litre. `unite: 'libre'` sur ce savoir-faire — un élève
  // qui répondrait en g/mL aurait raison, et le lui refuser serait une faute. Ce
  // qui est refusé, c'est l'écriture g/100 mL, et côté AUTEUR seulement : la
  // solubilité s'écrit g/L dans tout le corpus.
  {
    id: 'ch01-sf7-e06-combien-de-gaz-par-litre',
    sfPrincipal: SF,
    chapitre: CH01,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'bouteille-de-deux-litres-dont-l-etiquette-donne-la-masse-de-gaz',
    enonce:
      'Une bouteille contient {{donnee:volume}} d’eau gazeuse. Le fabricant indique '
      + 'qu’elle renferme {{donnee:masseGaz}} de dioxyde de carbone dissous. Quelle '
      + 'masse de gaz y a-t-il dans un litre de cette eau ? Donne-la avec son unité.',
    donnees: {
      volume: { valeur: [2, 1], unite: 'L' },
      masseGaz: { valeur: [34, 10], unite: 'g' },
    },
    calcul: {
      etapes: [{ id: 'parLitre', expr: '@masseGaz ÷ @volume', unite: 'g/L' }],
      reponse: 'parLitre',
    },
    reponse: { valeur: [17, 10], unite: 'g/L', semantique: 'exacte' },
    distracteurs: [
      {
        id: 'le-quotient-a-l-envers',
        valeur: [10, 17],
        unite: 'L/g',
        piege: 'unite-absente-ou-fausse',
        modeleErrone: {
          id: 'diviser-dans-l-autre-sens',
          nom:
            'modèle « le grand nombre en haut » : le volume est divisé par la masse, et '
            + 'l’unité obtenue — des litres par gramme — dit exactement ce qui a été fait',
          calcul: { etapes: [{ id: 'x', expr: '@volume ÷ @masseGaz', unite: 'L/g' }], reponse: 'x' },
        },
      },
    ],
  },

  // ── e07 · palier 2 · le registre submicroscopique ────────────────────────
  //
  // Ce que « dissous » veut dire quand on descend d'un cran : les molécules du gaz
  // sont DISPERSÉES entre celles de l'eau, pas réunies en poche. La figure est
  // engendrée par le même objet formel que la correction — identité de référence,
  // pas deux objets égaux champ pour champ —, et le brassage de `schema.js` interdit
  // qu'elles ressortent en paquet.
  {
    id: 'ch01-sf7-e07-l-eau-gazeuse-au-niveau-des-molecules',
    sfPrincipal: SF,
    // `ch05-sf6` (représenter une molécule) et non `ch05-sf7` : la grille montre
    // UN état, elle n'en montre pas le changement — rien n'y fond, rien n'y
    // bout. Même correction sur `t05`.
    sfSollicites: ['ch05-sf6-associer-formule-et-modele-moleculaire'],
    chapitre: CH01,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 2,
    registre: 'submicro',
    type: 'schema-particulaire',
    dimensionVariee: 'registre',
    contexteDeSurface: 'echantillon-d-eau-gazeuse-vu-de-tres-pres',
    enonce:
      'On regarde de très près un échantillon d’eau gazeuse, à l’échelle des '
      + 'particules. Compose la grille qui la représente à l’état liquide : douze '
      + 'molécules d’eau, faites chacune d’un atome d’oxygène et de deux atomes '
      + 'd’hydrogène, et quatre molécules de dioxyde de carbone, faites chacune d’un '
      + 'atome de carbone et de deux atomes d’oxygène.',
    figure: { sorte: 'particulaire', description: GRILLE_EAU_GAZEUSE_FERMEE },
    reponse: { objetFormel: GRILLE_EAU_GAZEUSE_FERMEE },
  },

  // ── e08 · palier 3 · le double QCM, et le mode de réponse ────────────────
  //
  // Le format différenciant, et le seul de la charte sans aucune garantie
  // mécanique : compté, plafonné, relu, scellé sur l'item entier moins le bloc
  // `relu` — parce que ce qui est risqué ici n'est pas l'énoncé, ce sont les
  // justifications. Les trois fausses viennent de trois conceptions distinctes, et
  // la dernière est la phrase du cours récitée à contretemps.
  {
    id: 'ch01-sf7-e08-la-bouteille-ouverte-toute-la-nuit',
    sfPrincipal: SF,
    chapitre: CH01,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 3,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'bouteille-restee-ouverte-sur-la-table-de-la-cuisine',
    enonce:
      'Une bouteille d’eau gazeuse est restée ouverte toute la nuit sur la table. '
      + 'Ce matin, plus une seule bulle ne monte et l’eau ne pique plus la langue. '
      + 'Où est passé le dioxyde de carbone qui y était dissous ? Puis choisis la '
      + 'phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'dans-l-air-de-la-piece',
      choixPossibles: ['il-n-existe-plus', 'dans-l-air-de-la-piece', 'au-fond-de-la-bouteille'],
    },
    justifications: [
      {
        id: 'sorti-bulle-apres-bulle',
        texte:
          'Il est sorti de l’eau et s’est mélangé à l’air de la pièce : la bouteille '
          + 'pèse moins qu’hier soir, et c’est exactement ce qui manque.',
        juste: true,
        provenance: 'institutionnelle',
        source: EDUSCOL,
      },
      {
        id: 'il-a-disparu',
        texte: 'Il a disparu : on ne le voit plus, on ne le goûte plus, il n’y a plus rien.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'Prieto et al. 1989, « le soluté disparaît à la dissolution » — énoncé-élève '
          + 'rapporté dans didactique.md § 3.1',
        piege: PIEGE,
      },
      {
        id: 'un-gaz-ne-pese-rien',
        texte:
          'Un gaz, ça ne pèse rien : parti ou pas parti, la bouteille pèse pareil, donc '
          + 'la question ne veut rien dire.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'Stavy 1990a, le propanone évaporé jugé « sans poids » parce qu’invisible — '
          + 'rapporté dans didactique.md § 3.1',
        piege: 'gaz-n-est-pas-de-la-matiere',
      },
      {
        id: 'rien-ne-se-perd',
        texte:
          'Rien ne se perd, rien ne se crée : la masse ne change jamais, donc le gaz est '
          + 'forcément encore dans la bouteille.',
        juste: false,
        // ⚠ Cette justification portait `reponse-conforme-sans-adhesion`, et
        // c'était la mauvaise porte. Ce piège-là décrit un élève qui a DEUX
        // réponses — celle du cours et celle qu'il prédirait vraiment — et sa
        // `regle` ne parle que de ce désaccord (« si ce que tu écris et ce que
        // tu prédis ne disent pas la même chose »). Ici il n'y a pas de
        // désaccord : l'élève applique sa phrase de bout en bout, et il en tire
        // une conclusion FAUSSE. Ce qui le réfute est la règle de la
        // conservation de la masse, qui porte justement sur la frontière du
        // système : « si le récipient est ouvert, la masse change, de la masse
        // exacte de ce qui a traversé la frontière ». Son `controle` — trace la
        // frontière, demande si quelque chose l'a franchie — mord d'un geste.
        // Le cas symétrique est en `t07` : là, la phrase récitée donne la BONNE
        // conclusion, et c'est bien `reponse-conforme-sans-adhesion`.
        provenance: 'locale',
        piege: 'conservation-de-la-masse',
      },
    ],
    piege: PIEGE,
    situation: {
      visibiliteApres: 'invisible',
      modeDeReponse: 'choix-et-justification',
      ouEstLaMatiere: 'hors-du-recipient',
      contenant: 'ouvert',
    },
    relu: {
      par: 'auteur-du-corpus',
      date: '2026-08-12',
      // FNV-1a 64 de l'item entier MOINS ce bloc, clés triées. Éditer une seule
      // justification le change : c'est tout l'objet du scellé.
      hash: '71b06cf3cca96d67',
    },
  },

  // ── e09 · palier 3 · la courbe, et sa tolérance CALCULÉE ─────────────────
  //
  // La fenêtre n'est pas saisie par l'auteur : `schema.js` la dérive de l'axe — une
  // demi-graduation, donc 0,25 g/L ici. Le modèle erroné est EXÉCUTÉ et le contrôle
  // vérifie qu'il tombe hors de la fenêtre : l'élève qui lit la courbe comme si
  // elle montait — « le sucre se dissout mieux à chaud, donc le gaz aussi » — ne
  // peut pas être compté juste.
  //
  // Classe B et non A : rien n'est calculé, la valeur est LUE sur la figure, et la
  // figure est engendrée par l'objet que la correction cite. C'est le sens exact de
  // la classe B — la garantie porte sur l'ACCORD entre ce qu'on montre et ce qu'on
  // attend.
  {
    id: 'ch01-sf7-e09-la-courbe-qui-descend',
    sfPrincipal: SF,
    sfSollicites: ['ch01-sf6-exploiter-une-courbe-de-solubilite'],
    chapitre: CH01,
    programme: '2020',
    classe: 'B',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'courbe-de-solubilite-du-dioxyde-de-carbone',
    enonce:
      'Voici la masse de dioxyde de carbone qu’un litre d’eau peut contenir '
      + 'dissoute, selon la température de l’eau. Lis la courbe : à 30 °C, quelle '
      + 'masse de gaz un litre d’eau contient-il au maximum ? Donne-la avec son '
      + 'unité.',
    figure: { sorte: 'graphique', donnees: SOLUBILITE_DU_DIOXYDE_DE_CARBONE },
    donnees: {
      s0: { valeur: [33, 10], unite: 'g/L' },
      s10: { valeur: [23, 10], unite: 'g/L' },
      s20: { valeur: [17, 10], unite: 'g/L' },
      s30: { valeur: [13, 10], unite: 'g/L' },
      s40: { valeur: [1, 1], unite: 'g/L' },
      s50: { valeur: [8, 10], unite: 'g/L' },
    },
    reponse: {
      objetFormel: SOLUBILITE_DU_DIOXYDE_DE_CARBONE,
      valeur: [13, 10],
      unite: 'g/L',
      semantique: 'tolerante',
    },
    modelesErrones: [
      {
        id: 'courbe-lue-comme-si-elle-montait',
        nom:
          'modèle « le sucre se dissout mieux quand c’est chaud, donc le gaz aussi » : la '
          + 'courbe est lue à l’envers et la valeur rendue est celle du point symétrique',
        piege: PIEGE,
        calcul: { etapes: [{ id: 'x', expr: '@s20 × 1', unite: 'g/L' }], reponse: 'x' },
      },
    ],
  },

  // ── e10 · palier 4 · le piège, servi au chapitre des combustions ─────────
  //
  // Le palier non étiqueté : la première tâche est de RECONNAÎTRE de quoi il
  // s'agit. Servi au chapitre 6, où le contrat pousse à répondre « transformation
  // chimique » — c'est ce que fait le distracteur, et il est rattaché au piège qui
  // le produit. Servir un savoir-faire APRÈS son chapitre est légitime ; l'inverse
  // demanderait un geste que la progression n'a pas installé, et le contrôle le
  // refuse.
  {
    id: 'ch01-sf7-e10-l-eau-plate-au-chapitre-des-combustions',
    sfPrincipal: SF,
    sfSollicites: ['ch06-sf2-distinguer-transformation-chimique-physique-et-melange'],
    chapitre: 'ch06-transformations-chimiques',
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'serie-sans-titre-carafe-oubliee-au-soleil',
    enonce:
      'Cette série ne porte aucun titre et ses questions viennent de plusieurs '
      + 'chapitres. Celle-ci : une carafe d’eau gazeuse est restée ouverte tout '
      + 'l’après-midi sur la table de la cuisine, en plein soleil. Le soir, l’eau '
      + 'est plate, le niveau du liquide n’a pas bougé, et la carafe est plus '
      + 'légère de quelques grammes. Où est le gaz, et sous quelle forme ?',
    // Le niveau invariant est dit, et il n'est pas décoratif : sans lui, le
    // troisième distracteur — « c'est de l'eau qui s'est évaporée » — cesse
    // d'être faux. Une carafe ouverte au soleil perd bel et bien de l'eau, et un
    // élève qui l'écrit aurait raison contre la correction.
    reponse: { objetFormel: OU_EST_LE_GAZ_DE_LA_CARAFE_OUVERTE },
    piege: PIEGE,
    situation: {
      visibiliteApres: 'invisible',
      modeDeReponse: 'designation-du-lieu-et-de-la-forme',
      ouEstLaMatiere: 'hors-du-recipient',
      contenant: 'ouvert',
    },
    distracteurs: [
      {
        id: 'une-transformation-chimique',
        texte: 'Le gaz a réagi avec l’eau : c’est une transformation chimique, il n’existe plus.',
        piege: 'frontiere-physique-chimique',
      },
      {
        id: 'le-soleil-l-a-detruit',
        texte: 'Le soleil l’a détruit : la chaleur fait disparaître les gaz.',
        piege: PIEGE,
      },
      {
        id: 'la-carafe-a-perdu-de-l-eau',
        texte: 'C’est de l’eau qui s’est évaporée : un gaz ne pèse rien, il ne peut pas manquer sur une balance.',
        piege: 'gaz-n-est-pas-de-la-matiere',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PROBLÈMES — 5 items
  // ══════════════════════════════════════════════════════════════════════════

  // ── p01 · palier 4 · la prédiction engagée, sur une VALEUR ───────────────
  //
  // La valeur prédite est saisie et VERROUILLÉE avant l'affichage du résultat :
  // sans engagement préalable, il n'y a pas de conflit, juste une information de
  // plus. Le sens seul ne suffirait pas — « plus léger » et « un peu plus léger »
  // se disent pareil, et l'élève qui accorde du bout des lèvres une masse
  // « négligeable » au gaz a répondu juste sans avoir bougé.
  {
    id: 'ch01-sf7-p01-ce-que-la-balance-affichera',
    sfPrincipal: SF,
    chapitre: CH01,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'prediction-engagee',
    contexteDeSurface: 'bouteille-de-limonade-debouchee-devant-la-classe',
    enonce:
      'Une bouteille de limonade fermée pèse {{donnee:mFermee}}. On la débouche et '
      + 'on la laisse deux jours sur la balance, sans y toucher. Une mesure faite '
      + 'ailleurs indique que {{donnee:mGaz}} de gaz s’en échappent en deux jours, et '
      + 'que le niveau du liquide ne bouge pas. Écris ce que la balance affichera à '
      + 'la fin, avec son unité. Ta prédiction sera verrouillée avant le résultat.',
    donnees: {
      mFermee: { valeur: [1620, 1], unite: 'g' },
      mGaz: { valeur: [7, 1], unite: 'g' },
    },
    calcul: {
      etapes: [{ id: 'finale', expr: '@mFermee - @mGaz', unite: 'g' }],
      reponse: 'finale',
    },
    reponse: { valeur: [1613, 1], unite: 'g', semantique: 'exacte' },
    piege: PIEGE,
    situation: {
      visibiliteApres: 'invisible',
      modeDeReponse: 'valeur-et-unite',
      ouEstLaMatiere: 'hors-du-recipient',
      contenant: 'ouvert',
    },
    distracteurs: [
      {
        id: 'la-balance-ne-bouge-pas',
        valeur: [1620, 1],
        unite: 'g',
        piege: 'gaz-n-est-pas-de-la-matiere',
        modeleErrone: {
          id: 'un-gaz-ne-pese-rien',
          nom:
            'modèle « le gaz parti ne pesait rien » : la masse finale est la masse '
            + 'initiale, à l’unité près',
          calcul: { etapes: [{ id: 'x', expr: '@mFermee × 1', unite: 'g' }], reponse: 'x' },
        },
      },
      {
        id: 'la-bouteille-s-alourdit',
        valeur: [1627, 1],
        unite: 'g',
        piege: 'conservation-de-la-masse',
        modeleErrone: {
          id: 'le-gaz-entre-au-lieu-de-sortir',
          nom:
            'modèle « ouvrir, c’est laisser entrer » : la frontière du système est lue '
            + 'dans le mauvais sens et la masse est ajoutée',
          calcul: { etapes: [{ id: 'x', expr: '@mFermee + @mGaz', unite: 'g' }], reponse: 'x' },
        },
      },
    ],
  },

  // ── p02 · palier 4 · LE CONSTAT DU CATALOGUE, servi tel quel ─────────────
  //
  // `soucoupe-sous-cloche`, joué comme `matiere.js` l'écrit : prédiction verrouillée
  // sur DEUX champs (la soucoupe se vide-t-elle, et où est l'eau à la fin), puis le
  // résultat, puis le conflit. `item.js` refuse un `dispositifServi` étranger au
  // piège — et `apresReponsePiege` LÈVE à l'exécution —, de sorte que l'identifiant
  // écrit ici est le même objet que celui que le moteur servira.
  //
  // C'est le second des deux contextes que le `formatDiagnostique` impose : la
  // matière QUITTE le récipient, ce qui demande un pas de plus que la dissolution
  // de `e01` — il faut d'abord admettre que « partie » veut dire « partie quelque
  // part ».
  {
    id: 'ch01-sf7-p02-la-soucoupe-sous-la-cloche',
    sfPrincipal: SF,
    chapitre: CH01,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 4,
    registre: 'macro',
    type: 'prediction-engagee',
    contexteDeSurface: 'soucoupe-d-eau-sous-une-cloche-de-verre-fermee',
    enonce:
      'Une soucoupe d’eau est posée sous une cloche de verre transparente, fermée '
      + 'hermétiquement sur une plaque. On laisse au soleil une journée entière. '
      + 'Avant de voir la suite : la soucoupe va-t-elle se vider ? Et si elle se '
      + 'vide, où sera l’eau à la fin, et sous quelle forme ? Ta réponse sera '
      + 'verrouillée avant le résultat.',
    reponse: { objetFormel: OU_EST_L_EAU_SOUS_LA_CLOCHE },
    piege: PIEGE,
    situation: {
      visibiliteApres: 'invisible',
      modeDeReponse: 'designation-du-lieu-et-de-la-forme',
      ouEstLaMatiere: 'hors-du-recipient-mais-dans-l-enceinte',
      contenant: 'ferme',
    },
    dispositifServi: 'soucoupe-sous-cloche',
    estFormatDiagnostique: true,
    motifFormatDiagnostique:
      'Question productive à deux champs — l’état de la soucoupe le soir, et OÙ est '
      + 'l’eau —, jamais un oui/non, et l’élève s’engage avant l’affichage. Le '
      + 'contexte est celui d’une matière qui QUITTE le récipient : c’est le second '
      + 'des deux contextes que le `formatDiagnostique` du piège impose sur la série '
      + 'des trois réussites, `e01` couvrant la dissolution. Rien n’est sorti de la '
      + 'cloche, donc « c’est parti dehors » ne peut pas servir d’échappatoire : il '
      + 'faut désigner un lieu, sous la cloche.',
    distracteurs: [
      // ⚠ Portait `vide-entre-les-particules-rempli`. La phrase de l'élève est
      // entièrement MACROSCOPIQUE — elle ne dit rien de ce qu'il y a entre deux
      // particules —, et la `regle` de ce piège (« entre deux particules il n'y
      // a rien ») comme son `controle` (« de quoi est fait ce que tu y as mis
      // ? ») n'ont alors aucune prise. Le fondateur, lui, la réfute mot pour
      // mot : sa `regle` dit que « l'eau évaporée n'est pas partie nulle part :
      // elle est dans l'air, en vapeur, et elle en ressort dès qu'elle touche
      // une surface froide » — c'est la cloche, exactement.
      {
        id: 'elle-ne-se-videra-pas',
        texte: 'La soucoupe ne se videra pas : c’est fermé, l’eau n’a nulle part où aller.',
        piege: PIEGE,
      },
      {
        id: 'l-eau-est-partie',
        texte: 'La soucoupe se vide et l’eau est partie : elle n’est plus nulle part.',
        piege: PIEGE,
      },
    ],
  },

  // ── p03 · palier 3 · le double QCM du sens de variation ──────────────────
  //
  // Le seul point du savoir-faire qui contredit frontalement une expérience
  // quotidienne : le sucre se dissout mieux à chaud, le gaz non. La réponse
  // « moins » se coche au hasard une fois sur trois, et c'est la justification qui
  // sépare celui qui sait de celui qui a deviné — d'où le double QCM, et d'où la
  // classe C.
  //
  // ⚠ La deuxième justification fausse ne porte AUCUN piège, et c'est délibéré : le
  // transfert « ce qui vaut pour le sucre vaut pour le gaz » n'est dans aucune des
  // six familles du catalogue, et lui en attribuer un au jugé ferait reprogrammer
  // une conception que l'élève n'a pas. Un piège inventé vaut moins que pas de
  // piège.
  {
    id: 'ch01-sf7-p03-l-etang-en-plein-ete',
    sfPrincipal: SF,
    chapitre: CH01,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 3,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'sens-du-changement',
    contexteDeSurface: 'etang-dont-l-eau-se-rechauffe-en-plein-ete',
    enonce:
      'En plein été, l’eau d’un étang se réchauffe de jour en jour et des poissons '
      + 'commencent à manquer d’air près de la surface. Le dioxygène dissous dans '
      + 'cette eau : y en a-t-il plus, autant, ou moins qu’au printemps ? Puis '
      + 'choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'moins',
      choixPossibles: ['plus', 'autant', 'moins'],
    },
    justifications: [
      {
        id: 'un-gaz-se-dissout-moins-a-chaud',
        texte:
          'Un gaz se dissout d’autant moins que l’eau est chaude : une partie du '
          + 'dioxygène quitte l’eau et passe dans l’air au-dessus.',
        juste: true,
        provenance: 'institutionnelle',
        source: EDUSCOL,
      },
      {
        id: 'a-chaud-tout-se-dissout-mieux',
        texte:
          'Quand c’est chaud, tout se dissout mieux — le sucre fond bien plus vite dans '
          + 'le thé brûlant — donc il y a plus de dioxygène dissous.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'il-n-y-en-a-pas',
        texte:
          'Le dioxygène dissous, on ne le voit pas : il n’y en a ni plus ni moins, il n’y '
          + 'en a pas du tout, sinon on verrait des bulles.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'Prieto et al. 1989, « le soluté disparaît à la dissolution » — énoncé-élève '
          + 'rapporté dans didactique.md § 3.1',
        piege: PIEGE,
      },
      {
        id: 'il-en-faut-pour-respirer',
        texte:
          'C’est écrit dans le cours qu’il faut du dioxygène pour respirer : il y en a '
          + 'donc toujours la même quantité dans l’eau.',
        juste: false,
        provenance: 'locale',
        piege: 'reponse-conforme-sans-adhesion',
      },
    ],
    piege: PIEGE,
    situation: {
      visibiliteApres: 'invisible',
      modeDeReponse: 'choix-et-justification',
      ouEstLaMatiere: 'hors-du-recipient',
      contenant: 'ouvert',
    },
    relu: {
      par: 'auteur-du-corpus',
      date: '2026-08-12',
      hash: 'a5bfd8e29772b596',
    },
  },

  // ── p04 · palier 3 · combien pèse ce qu'on ne voit pas ───────────────────
  //
  // Le produit d'un volume par une masse par litre : l'algèbre des unités contrôle
  // que L × g/L rend bien des grammes, chez l'AUTEUR, avant que l'énoncé ne soit
  // servi. Le résultat est petit — moins d'un gramme pour tout un aquarium — et
  // c'est le point : « petit » n'est pas « nul », et un demi-gramme suffit à faire
  // vivre des poissons.
  {
    id: 'ch01-sf7-p04-la-masse-de-dioxygene-de-l-aquarium',
    sfPrincipal: SF,
    chapitre: CH01,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'aquarium-de-soixante-litres-au-magasin',
    enonce:
      'Un aquarium contient {{donnee:volume}} d’eau. À la température de la pièce, '
      + 'chaque litre de cette eau renferme {{donnee:parLitre}} de dioxygène dissous. '
      + 'Quelle masse de dioxygène l’aquarium contient-il en tout ? Donne-la avec son '
      + 'unité.',
    donnees: {
      volume: { valeur: [60, 1], unite: 'L' },
      parLitre: { valeur: [8, 1000], unite: 'g/L' },
    },
    calcul: {
      etapes: [{ id: 'masseTotale', expr: '@volume × @parLitre', unite: 'g' }],
      reponse: 'masseTotale',
    },
    reponse: { valeur: [48, 100], unite: 'g', semantique: 'exacte' },
    distracteurs: [
      {
        id: 'diviser-au-lieu-de-multiplier',
        valeur: [7500, 1],
        unite: 'L²/g',
        piege: 'unite-absente-ou-fausse',
        modeleErrone: {
          id: 'le-volume-divise-par-la-teneur',
          nom:
            'modèle « le grand nombre divise le petit » : le volume est divisé par la '
            + 'masse par litre, et le résultat garde le nom de masse',
          calcul: { etapes: [{ id: 'x', expr: '@volume ÷ @parLitre', unite: 'L²/g' }], reponse: 'x' },
        },
      },
    ],
  },

  // ── p05 · palier 3 · exploiter la série, et voir qu'elle s'arrête ────────
  //
  // Le tableau est engendré par le même objet que la chaîne exploite : le stimulus
  // et la donnée ne peuvent pas diverger. Cercle 2 — ce qui est en jeu n'est pas la
  // soustraction, c'est de repérer que la masse SE STABILISE, donc que le départ du
  // gaz s'arrête. Un modèle « ça s’évapore petit à petit » ne prédit pas un palier.
  {
    id: 'ch01-sf7-p05-six-pesees-d-un-verre-d-eau-gazeuse',
    sfPrincipal: SF,
    sfSollicites: ['ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite'],
    chapitre: CH01,
    programme: '2020',
    classe: 'A',
    cercle: 2,
    palier: 3,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'verre-pese-toutes-les-heures-pendant-cinq-heures',
    enonce:
      'Un verre contenant 20 cL d’eau gazeuse est posé sur une balance et pesé '
      + 'toutes les heures ; le niveau du liquide ne bouge pas. Le voici, heure par '
      + 'heure. Entre la première et la dernière pesée, quelle masse de gaz s’est '
      + 'échappée en tout ? Donne-la avec son unité — et remarque à quel moment la '
      + 'balance cesse de descendre.',
    figure: { sorte: 'tableau', donnees: PESEES_D_UN_VERRE_D_EAU_GAZEUSE },
    donnees: {
      pesee0: { valeur: [250, 1], unite: 'g' },
      pesee1: { valeur: [2494, 10], unite: 'g' },
      pesee5: { valeur: [2488, 10], unite: 'g' },
    },
    calcul: {
      etapes: [{ id: 'gazParti', expr: '@pesee0 - @pesee5', unite: 'g' }],
      reponse: 'gazParti',
    },
    reponse: { valeur: [12, 10], unite: 'g', semantique: 'exacte' },
    distracteurs: [
      {
        id: 'la-derniere-pesee',
        valeur: [2488, 10],
        unite: 'g',
        piege: 'donnees-superflues-et-questions-sans-reponse',
        modeleErrone: {
          id: 'rendre-la-derniere-valeur-lue',
          nom:
            'modèle « la question demande une masse, je lis une masse » : la dernière '
            + 'pesée est rendue au lieu de l’écart',
          calcul: { etapes: [{ id: 'x', expr: '@pesee5 × 1', unite: 'g' }], reponse: 'x' },
        },
      },
      // ⚠ Portait `valeur-aberrante-d-une-serie-non-reperee`, et ce piège n'a
      // rien à dire ici : la série ne contient AUCUNE valeur aberrante — sa
      // `conditionValidite` le prévoit (`aberrante: null`) et son `controle`
      // conclut alors « garde tout », ce qui ne reproche rien à l'élève qui s'est
      // arrêté à la deuxième pesée. Le piège qui le réfute est celui des données
      // superflues, par sa branche INVERSE, écrite exprès dans la `regle` : « qu'une
      // donnée te reste sur les bras ne prouve pas qu'elle est inutile — c'est
      // peut-être ton chemin qui a sauté une étape ». Il en reste quatre.
      {
        id: 'l-ecart-de-la-premiere-heure',
        valeur: [6, 10],
        unite: 'g',
        piege: 'donnees-superflues-et-questions-sans-reponse',
        modeleErrone: {
          id: 'ne-lire-que-les-deux-premieres-pesees',
          nom:
            'modèle « la série a commencé, donc j’ai compris » : l’écart est pris entre '
            + 'les deux premières pesées et la suite n’est pas regardée',
          calcul: { etapes: [{ id: 'x', expr: '@pesee0 - @pesee1', unite: 'g' }], reponse: 'x' },
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // AUTO-ÉVALUATION — 10 items
  //
  // Aucun n'est la copie d'un item d'entraînement, VALEURS COMPRISES : un test qui
  // resert les mêmes nombres se réussit de mémoire et ne mesure plus rien. Les
  // décors, les gaz, les volumes et les masses sont tous différents ; ce qui est
  // conservé, ce sont les paliers, les classes et les dimensions variées, qui sont
  // précisément ce que le test doit mesurer.
  // ══════════════════════════════════════════════════════════════════════════

  // ── t01 · palier 1 · où est le gaz, autre contenant ──────────────────────
  {
    id: 'ch01-sf7-t01-ou-est-le-gaz-de-la-canette',
    sfPrincipal: SF,
    chapitre: CH01,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'canette-de-soda-non-ouverte-et-dure-au-toucher',
    enonce:
      'Une canette de soda n’a jamais été ouverte. On ne voit rien à l’intérieur, '
      + 'mais elle est dure sous les doigts, et elle moussera dès qu’on tirera la '
      + 'languette. Où est le gaz en ce moment, et sous quelle forme ?',
    reponse: { objetFormel: OU_EST_LE_GAZ_CANETTE_FERMEE },
    piege: PIEGE,
    situation: {
      visibiliteApres: 'invisible',
      modeDeReponse: 'designation-du-lieu-et-de-la-forme',
      ouEstLaMatiere: 'dans-le-liquide',
      contenant: 'ferme',
    },
    distracteurs: [
      {
        id: 'il-nait-a-l-ouverture',
        texte: 'Il n’y en a pas : la mousse se fabrique au moment où on ouvre.',
        piege: PIEGE,
      },
    ],
  },

  // ── t02 · palier 1 · la masse comme trace, autres valeurs ────────────────
  {
    id: 'ch01-sf7-t02-de-combien-la-canette-s-est-elle-allegee',
    sfPrincipal: SF,
    chapitre: CH01,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'canette-ouverte-oubliee-un-week-end',
    enonce:
      'Une canette de soda de 33 cL, ouverte, est oubliée tout un week-end. Le '
      + 'vendredi, la balance affichait {{donnee:mVendredi}} ; le lundi, elle '
      + 'affiche {{donnee:mLundi}}, et le niveau du liquide n’a pas bougé. Quelle '
      + 'masse de gaz s’est échappée ? Donne-la avec son unité.',
    // 2 g pour 33 cL, soit 6 g/L : la gazéification d'un soda du commerce. Les
    // valeurs d'origine (331 → 328 g) en annonçaient 9, au-dessus de ce qu'une
    // canette peut tenir, et 331 g était par ailleurs léger pour une canette
    // pleine — le métal seul en pèse une douzaine.
    donnees: {
      mVendredi: { valeur: [345, 1], unite: 'g' },
      mLundi: { valeur: [343, 1], unite: 'g' },
    },
    calcul: {
      etapes: [{ id: 'gazParti', expr: '@mVendredi - @mLundi', unite: 'g' }],
      reponse: 'gazParti',
    },
    reponse: { valeur: [2, 1], unite: 'g', semantique: 'exacte' },
    distracteurs: [
      {
        id: 'la-masse-du-lundi',
        valeur: [343, 1],
        unite: 'g',
        piege: 'donnees-superflues-et-questions-sans-reponse',
        modeleErrone: {
          id: 'rendre-la-derniere-masse-lue',
          nom: 'modèle « on demande une masse, j’écris la masse affichée à la fin »',
          calcul: { etapes: [{ id: 'x', expr: '@mLundi × 1', unite: 'g' }], reponse: 'x' },
        },
      },
    ],
  },

  // ── t03 · palier 2 · objet-support : le soda éventé ──────────────────────
  {
    id: 'ch01-sf7-t03-ou-est-le-gaz-du-soda-evente',
    sfPrincipal: SF,
    chapitre: CH01,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'verre-de-soda-oublie-au-refrigerateur',
    enonce:
      'Un verre de soda a été oublié trois jours au réfrigérateur, sans couvercle. '
      + 'Le liquide a le même niveau et la même couleur qu’au départ, mais il ne '
      + 'pique plus du tout, et le verre pèse un peu moins. Où est le gaz qui y '
      + 'était dissous, et sous quelle forme ?',
    reponse: { objetFormel: OU_EST_LE_GAZ_DU_SODA_EVENTE },
    piege: PIEGE,
    situation: {
      visibiliteApres: 'invisible',
      modeDeReponse: 'designation-du-lieu-et-de-la-forme',
      ouEstLaMatiere: 'hors-du-recipient',
      contenant: 'ouvert',
    },
    distracteurs: [
      {
        id: 'le-froid-l-a-tue',
        texte: 'Le froid l’a fait disparaître : au réfrigérateur, le gaz s’éteint.',
        piege: PIEGE,
      },
      // ⚠ Ce distracteur disait « Il est descendu au fond du verre : un gaz,
      // c’est lourd, ça tombe » sous le piège des particules qui héritent du
      // macroscopique. Il n'y avait aucune particule dans la phrase : le piège
      // porte sur ce qu'on attribue à UN GRAIN, sa `regle` compare une molécule
      // d'un état à l'autre et son `controle` s'applique à un schéma — trois
      // choses absentes d'un raisonnement entièrement macroscopique. Pire, la
      // prémisse « le dioxyde de carbone est lourd et descend » est VRAIE dans
      // l'air (le catalogue en fait un constat : le bécher versé sur la
      // bougie) ; l'énoncé la réfuterait donc à tort. Le texte est refait pour
      // que le piège déclaré morde : « même taille, même forme, même masse d'un
      // état à l'autre » contredit des molécules qui rétrécissent au froid.
      {
        id: 'les-molecules-ont-retreci-au-froid',
        texte:
          'Il est toujours dans le verre : le froid a fait rétrécir ses molécules, '
          + 'elles sont devenues trop petites pour qu’on les goûte.',
        piege: 'particules-heritent-du-macroscopique',
      },
    ],
  },

  // ── t04 · palier 2 · grandeur-en-jeu, autres nombres ─────────────────────
  {
    id: 'ch01-sf7-t04-combien-de-gaz-par-litre-dans-la-carafe',
    sfPrincipal: SF,
    chapitre: CH01,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'carafe-de-cinq-litres-d-une-machine-a-gazeifier',
    enonce:
      'Une machine à gazéifier remplit une carafe de {{donnee:volume}} d’eau et y '
      + 'dissout {{donnee:masseGaz}} de dioxyde de carbone. Quelle masse de gaz cette '
      + 'eau contient-elle par litre ? Donne-la avec son unité.',
    donnees: {
      volume: { valeur: [5, 1], unite: 'L' },
      masseGaz: { valeur: [95, 10], unite: 'g' },
    },
    calcul: {
      etapes: [{ id: 'parLitre', expr: '@masseGaz ÷ @volume', unite: 'g/L' }],
      reponse: 'parLitre',
    },
    reponse: { valeur: [19, 10], unite: 'g/L', semantique: 'exacte' },
  },

  // ── t05 · palier 2 · registre submicro, autre gaz ────────────────────────
  //
  // L'eau du robinet, et non l'eau gazeuse : deux molécules de dioxygène pour
  // quatorze d'eau. Le rayon de l'oxygène est le même que dans la grille de `e07`
  // — `schema.js` le dérive du seul symbole, et deux grilles du fichier ne peuvent
  // pas le dessiner à deux tailles.
  {
    id: 'ch01-sf7-t05-l-eau-du-robinet-au-niveau-des-molecules',
    sfPrincipal: SF,
    sfSollicites: ['ch05-sf6-associer-formule-et-modele-moleculaire'],
    chapitre: CH01,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 2,
    registre: 'submicro',
    type: 'schema-particulaire',
    dimensionVariee: 'registre',
    contexteDeSurface: 'echantillon-d-eau-du-robinet-vu-de-tres-pres',
    enonce:
      'L’eau du robinet contient du dioxygène dissous, celui-là même que respirent '
      + 'les poissons. Compose la grille qui la représente à l’état liquide : '
      + 'quatorze molécules d’eau, faites chacune d’un atome d’oxygène et de deux '
      + 'atomes d’hydrogène, et deux molécules de dioxygène, faites chacune de deux '
      + 'atomes d’oxygène.',
    figure: { sorte: 'particulaire', description: GRILLE_EAU_DU_ROBINET },
    reponse: { objetFormel: GRILLE_EAU_DU_ROBINET },
  },

  // ── t06 · palier 3 · lecture graphique, autre phénomène ──────────────────
  //
  // La courbe de `e09` montrait une solubilité selon la température ; celle-ci
  // montre une masse selon le temps. La tolérance reste CALCULÉE — une
  // demi-graduation, donc un gramme — et le modèle erroné exécuté est celui de
  // l'élève qui affirme que rien n'a pu partir.
  {
    id: 'ch01-sf7-t06-la-masse-qui-descend-puis-s-arrete',
    sfPrincipal: SF,
    sfSollicites: ['ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite'],
    chapitre: CH01,
    programme: '2020',
    classe: 'B',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'petite-bouteille-pesee-toutes-les-deux-heures',
    enonce:
      'Une petite bouteille de 50 cL d’eau gazeuse est débouchée puis pesée toutes '
      + 'les deux heures ; le niveau de l’eau ne bouge pas. Voici la courbe de sa '
      + 'masse. Lis-la : que pèse la bouteille au bout de quatre heures ? Donne la '
      + 'masse avec son unité.',
    figure: { sorte: 'graphique', donnees: DEGAZAGE_D_UNE_PETITE_BOUTEILLE },
    donnees: {
      m0: { valeur: [514, 1], unite: 'g' },
      m4: { valeur: [512, 1], unite: 'g' },
      m12: { valeur: [511, 1], unite: 'g' },
    },
    reponse: {
      objetFormel: DEGAZAGE_D_UNE_PETITE_BOUTEILLE,
      valeur: [512, 1],
      unite: 'g',
      semantique: 'tolerante',
    },
    modelesErrones: [
      {
        id: 'la-masse-ne-peut-pas-avoir-bouge',
        nom:
          'modèle « rien de visible n’est sorti, donc la masse est celle du départ » : la '
          + 'courbe est lue comme une droite horizontale',
        piege: PIEGE,
        calcul: { etapes: [{ id: 'x', expr: '@m0 × 1', unite: 'g' }], reponse: 'x' },
      },
    ],
  },

  // ── t07 · palier 3 · le double QCM du système fermé ──────────────────────
  //
  // Le pendant de `e08` : là, la bouteille était ouverte et la masse tombait ; ici
  // elle est fermée et la masse ne bouge pas, alors même que les bulles rendent le
  // gaz VISIBLE. Cet item ne porte donc PAS le piège : la condition de validité
  // exige une matière invisible à la fin, et la refuser ici est exactement ce qui
  // empêche de compter comme réfutation un item qui n'en est pas une.
  {
    id: 'ch01-sf7-t07-la-bouteille-fermee-au-soleil',
    sfPrincipal: SF,
    sfSollicites: ['ch06-sf6-conservation-de-la-masse'],
    chapitre: CH01,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 3,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'sens-du-changement',
    contexteDeSurface: 'bouteille-fermee-sortie-du-frigo-et-posee-au-soleil',
    enonce:
      'Une bouteille d’eau gazeuse fermée sort du réfrigérateur ; on la pèse, puis '
      + 'on la pose au soleil, toujours fermée. Une heure plus tard, des bulles se '
      + 'sont formées partout dans le liquide. On la repèse, sans l’avoir ouverte. '
      + 'Que lit-on sur la balance ? Puis choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'la-meme-masse',
      choixPossibles: ['plus-leger', 'la-meme-masse', 'plus-lourd'],
    },
    justifications: [
      {
        id: 'rien-n-est-entre-rien-n-est-sorti',
        texte:
          'Le gaz a quitté l’eau, mais il est toujours dans la bouteille, au-dessus du '
          + 'liquide : rien n’est entré, rien n’est sorti.',
        juste: true,
        provenance: 'institutionnelle',
        source: EDUSCOL,
      },
      {
        id: 'les-bulles-allegent',
        texte:
          'Les bulles sont montées, et ce qui monte pèse moins : la bouteille est '
          + 'devenue plus légère.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'Stavy 1990a, le gaz jugé « sans poids » — rapporté dans didactique.md § 3.1',
        piege: 'gaz-n-est-pas-de-la-matiere',
      },
      {
        id: 'le-gaz-est-apparu',
        texte:
          'Avant, on ne voyait rien ; maintenant on voit des bulles : il y a plus de '
          + 'matière qu’avant, donc c’est plus lourd.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'Prieto et al. 1989, « le soluté disparaît à la dissolution », lu à l’envers — '
          + 'rapporté dans didactique.md § 3.1',
        piege: PIEGE,
      },
      {
        id: 'la-masse-se-conserve-toujours',
        texte: 'La masse se conserve toujours, dans tous les cas et dans tous les récipients.',
        juste: false,
        // Conforme, récitée, et sans adhésion : la phrase donne ici la bonne
        // conclusion pour une raison fausse — elle est démentie dès qu'on ouvre
        // la bouteille, ce que `e08` fait.
        provenance: 'locale',
        piege: 'reponse-conforme-sans-adhesion',
      },
    ],
    relu: {
      par: 'auteur-du-corpus',
      date: '2026-08-12',
      hash: 'd051bd09c3aaa2dd',
    },
  },

  // ── t08 · palier 4 · le piège, servi au chapitre de l'air ────────────────
  {
    id: 'ch01-sf7-t08-l-eau-bouillie-au-chapitre-de-l-air',
    sfPrincipal: SF,
    sfSollicites: ['ch03-sf1-composition-de-l-air'],
    chapitre: 'ch03-air-et-composition',
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'serie-sans-titre-eau-bouillie-puis-refroidie',
    enonce:
      'Cette série ne porte aucun titre et ses questions viennent de plusieurs '
      + 'chapitres. Celle-ci : on fait bouillir de l’eau du robinet dix minutes, puis '
      + 'on la laisse refroidir à couvercle ouvert. Un poisson placé dans cette eau '
      + 'manquerait d’air, alors qu’il vivrait très bien dans la même eau non '
      + 'bouillie. Où est passé le dioxygène qui y était dissous, et sous quelle '
      + 'forme ?',
    reponse: { objetFormel: OU_EST_LE_DIOXYGENE_APRES_EBULLITION },
    piege: PIEGE,
    situation: {
      visibiliteApres: 'invisible',
      modeDeReponse: 'designation-du-lieu-et-de-la-forme',
      ouEstLaMatiere: 'hors-du-recipient',
      contenant: 'ouvert',
    },
    distracteurs: [
      {
        id: 'la-chaleur-l-a-detruit',
        texte: 'La chaleur l’a détruit : au-dessus de cent degrés, le dioxygène n’existe plus.',
        piege: PIEGE,
      },
      // ⚠ Portait `gaz-n-est-pas-de-la-matiere`. Cette phrase ne dit rien d'une
      // masse, et cet item n'en demande aucune : la `regle` de ce piège (« un
      // gaz pèse ») et son `controle` (« le gaz peut-il entrer ou sortir de ce
      // que tu pèses, et dans quel sens ? ») n'ont ici rien à mordre. Le
      // fondateur la réfute au mot près : « l'eau évaporée n'est pas partie
      // NULLE PART : elle est dans l'air, en VAPEUR ».
      {
        id: 'il-est-dans-la-vapeur-donc-nulle-part',
        texte: 'Il est parti avec la vapeur, et la vapeur, ça ne va nulle part : ça se dissipe.',
        piege: PIEGE,
      },
    ],
  },

  // ── t09 · palier 4 · la pastille, au chapitre des transformations ────────
  //
  // Deux opérations, servies au chapitre 6 : la masse totale avant, la masse
  // après, et le gaz parti comme différence. Le décor est une transformation
  // chimique — c'est la contrainte du palier non étiqueté — mais la question posée
  // est celle de ce savoir-faire : où est passé ce qui manque, et combien pèse-t-il.
  {
    id: 'ch01-sf7-t09-la-pastille-effervescente',
    sfPrincipal: SF,
    sfSollicites: ['ch06-sf6-conservation-de-la-masse'],
    chapitre: 'ch06-transformations-chimiques',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'serie-sans-titre-pastille-effervescente-dans-un-verre',
    enonce:
      'Série sans titre, questions de plusieurs chapitres. Celle-ci : sur la '
      + 'balance, un verre d’eau qui pèse {{donnee:mVerre}} et, à côté, une pastille '
      + 'effervescente qui pèse {{donnee:mPastille}}. On jette la pastille dans le '
      + 'verre : ça mousse, puis tout s’arrête, et la balance affiche '
      + '{{donnee:mApres}}. Quelle masse de gaz est partie dans la pièce ? Donne-la '
      + 'avec son unité.',
    // ⚠ La version d'origine faisait partir 2 g de gaz d'une pastille de 3 g.
    // C'est impossible, et le calcul se fait sans table : le dioxyde de carbone
    // vient du bicarbonate de sodium, et 84 g de bicarbonate ne rendent que 44 g
    // de gaz. Même une pastille de bicarbonate PUR n'en donnerait que 1,6 g ;
    // une vraie pastille effervescente, qui est pour moitié de l'acide et des
    // excipients, en rend un demi-gramme. C'est cette valeur-là qui est servie.
    donnees: {
      mVerre: { valeur: [218, 1], unite: 'g' },
      mPastille: { valeur: [3, 1], unite: 'g' },
      mApres: { valeur: [2205, 10], unite: 'g' },
    },
    calcul: {
      etapes: [
        { id: 'avant', expr: '@mVerre + @mPastille', unite: 'g' },
        { id: 'gazParti', expr: '#avant - @mApres', unite: 'g' },
      ],
      reponse: 'gazParti',
    },
    reponse: { valeur: [5, 10], unite: 'g', semantique: 'exacte' },
    distracteurs: [
      {
        id: 'toute-la-pastille',
        valeur: [3, 1],
        unite: 'g',
        piege: PIEGE,
        modeleErrone: {
          id: 'ce-qui-a-disparu-c-est-la-pastille',
          nom:
            'modèle « la pastille ne se voit plus, donc c’est elle qui est partie » : la '
            + 'masse du gaz est confondue avec celle du solide dissous',
          calcul: { etapes: [{ id: 'x', expr: '@mPastille × 1', unite: 'g' }], reponse: 'x' },
        },
      },
    ],
  },

  // ── t10 · palier 4 · quel dispositif TRANCHE ─────────────────────────────
  //
  // Cercle 2, et le seul item du fichier où la question n'est pas « où est le
  // gaz » mais « quelle mesure permettrait de répondre ». Regarder s'il monte des
  // bulles ne sépare rien : l'absence de bulle est justement ce qu'il s'agit
  // d'interpréter, et un dispositif qui ne peut pas contredire ne prouve rien.
  //
  // ⚠ L'énoncé faisait d'abord porter le doute sur une EAU MINÉRALE PLATE, et
  // déclarait la pesée concluante. Elle ne l'est pas : le gaz dissous dans une
  // eau plate est déjà en équilibre avec l'air de la pièce, l'ouvrir n'en fait
  // rien partir, et ce qu'il y aurait à peser se compte en centièmes de gramme
  // pour toute la bouteille. Le dispositif « qui tranche » n'aurait tranché
  // nulle part. Le doute porte donc sur une eau GAZEUSE dont aucune bulle ne
  // monte — la situation de `e01` prise par l'autre bout —, où les grammes
  // existent. La question posée reste celle du cercle 2, et elle reste distincte
  // de `e03`, qui demande un CONTRÔLE sur un verre d'eau du robinet.
  {
    id: 'ch01-sf7-t10-lequel-des-trois-dispositifs-tranche',
    sfPrincipal: SF,
    chapitre: CH01,
    programme: '2020',
    classe: 'B',
    cercle: 2,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'serie-sans-titre-trois-protocoles-proposes-en-classe',
    enonce:
      'Série sans titre. Une bouteille d’eau gazeuse fermée est posée sur la table : '
      + 'pas une bulle n’y monte. Un élève en conclut qu’elle ne contient plus aucun '
      + 'gaz. Trois camarades proposent chacun un moyen de le vérifier : regarder '
      + 'plus longtemps s’il monte des bulles ; comparer la transparence de cette '
      + 'bouteille avec celle d’une bouteille d’eau plate ; peser la bouteille '
      + 'fermée, puis la repeser ouverte deux jours plus tard. Lequel des trois '
      + 'permet de conclure à coup sûr ?',
    reponse: { objetFormel: DISPOSITIF_QUI_TRANCHE },
    distracteurs: [
      {
        id: 'les-bulles-suffisent',
        texte: 'Les bulles : s’il n’en monte aucune, c’est qu’il n’y a aucun gaz.',
        piege: PIEGE,
      },
      {
        id: 'la-transparence-suffit',
        texte: 'La transparence : les deux bouteilles sont aussi claires, donc elles contiennent la même chose.',
        piege: PIEGE,
      },
    ],
  },
].map(Object.freeze));
