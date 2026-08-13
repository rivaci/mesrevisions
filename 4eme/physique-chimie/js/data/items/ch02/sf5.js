// Chapitre 2, savoir-faire 5 — « Utiliser la loi d’unicité des tensions ».
//
// Premier contenu écrit contre `circuit.js`. Le chapitre 1 n’avait aucun graphe :
// ce fichier en porte cinq, écrits une fois, dessinés par `schema.js` et jugés par
// `circuit.js`. Ce qui suit dit ce que le vérificateur topologique a imposé, ce
// que le schéma d’item a refusé, et où le savoir-faire s’arrête.
//
// ── Ce que ce fichier contient ─────────────────────────────────────────────
//
//   DECOUVERTE   une situation, aucune loi énoncée
//   COURS        six blocs typés
//   METHODE      un exercice résolu, geste de contrôle compris
//   ENTRAINEMENT 10 items
//   PROBLEMES     5 items
//   TEST         10 items
//
// L’export par défaut est la concaténation des trois sections d’items — 25 —,
// parce que c’est cette liste-là que `validerItem` et `tools/verifier-contenu.mjs`
// lisent. `DECOUVERTE`, `COURS` et `METHODE` ne sont PAS des items : ils ne
// portent ni classe, ni cercle, ni palier, et les compter fausserait tous les
// dénominateurs de la charte.
//
// ── Répartition des classes de garantie ────────────────────────────────────
//
//   A   12    la chaîne est rejouée en rationnels exacts, avec dimensions
//   B    8    la correction est un objet formel — question, choix retenu,
//             choix écartés — dont l’affichage et le verdict sortent du MÊME
//             objet ; rien n’est écrit deux fois
//   C    5    relu par un humain, scellé ; 5 sur 25, soit 20 %, sous le tiers
//
// ⚠ La huitième classe B est `e06`, et elle n’est pas un choix de rédaction :
// c’est ce qui rend ce savoir-faire ATTEIGNABLE. Voir plus bas, « Le critère de
// maîtrise, et pourquoi il ne se lit pas dans ce fichier seul ».
//
// Aucun item de classe A′ : il n’existe pas de table centrale sourcée de
// tensions, et fabriquer une table pour ranger « 4,5 V » y ferait entrer une
// valeur d’auteur sous couvert de fait tabulé. Le chapitre s’en passe.
//
// ── Pourquoi si peu de calcul, et lequel ───────────────────────────────────
//
// La loi d’unicité dit « la même valeur ». Elle ne produit donc, en elle-même,
// AUCUNE opération : un item qui demande « que lira l’autre voltmètre ? » a pour
// réponse le nombre déjà lu, et une classe A dont la chaîne ne comporte aucune
// opération est refusée (CLASSE_A_SANS_OPERATION) — à juste titre, puisqu’elle
// recopie. Les douze items de classe A sont donc ceux, et seulement ceux, où la
// loi sert à produire un nombre NOUVEAU :
//
//   · la VALEUR RETENUE de deux ou trois lectures que la loi dit égales et que
//     la mesure donne un peu différentes (`e02`, `p03`, `t02`) ;
//   · l’ÉCART entre deux lectures — nul quand la loi s’applique (`e04`, `t03`),
//     non nul quand elle ne s’applique pas et que c’est là le diagnostic
//     (`e10`, `p01`, `t10`) ;
//   · l’écart entre une prévision d’élève et la mesure (`e07`, `t06`) ;
//   · l’écart entre la tension reçue et l’inscription du dipôle (`e08`, `t07`).
//
// Les autres items sont de classe B ou C, et c’est une conséquence de la
// physique, pas un relâchement : là où la réponse est un choix raisonné, elle est
// un objet formel ; là où elle est une prédiction ou une justification, elle est
// relue.
//
// ── Les circuits sont des graphes, et il n’y en a que cinq ─────────────────
//
// Chaque `CIRCUIT_*` ci-dessous est l’unique exemplaire. La figure le rend
// (`schema.js`), l’énoncé le décrit, et `circuit.js` le juge : aucune image,
// aucune disposition stockée. Les cinq passent `diagnostiquer` sans un seul
// constat — pas de dipôle isolé, pas de court-circuit, pas de boucle ouverte, pas
// de borne inversée —, et `formeCanonique` leur rend une clé. Un circuit
// involontairement ouvert serait une faute de contenu que le vérificateur voit ;
// il a été passé, un par un, avant d’écrire le premier énoncé.
//
// Le voltmètre est branché `bornes: [« − », « + »]` comme partout dans
// `circuit.js`, et le « + » est mis DU CÔTÉ DU POTENTIEL LE PLUS HAUT — sans quoi
// le diagnostic rend BORNE_INVERSEE et l’élève voit un schéma d’énoncé
// qu’on lui compterait faux s’il le dessinait.
//
// ── Ce que le schéma d’item a imposé, et qui a changé le contenu ───────────
//
//   · **Seul le type `schema-circuit` peut porter un circuit.** `SORTES_PAR_TYPE`
//     n’ouvre la sorte `circuit` qu’à lui : ni `court`, ni `double-qcm`, ni
//     `prediction-engagee` ne peuvent en montrer un (FIGURE_HORS_TYPE). Les
//     circuits des dix-neuf autres items sont donc DÉCRITS EN TOUTES LETTRES.
//     C’est une vraie limite, et elle a un coût : la description est du texte, et
//     rien ne garantit mécaniquement qu’elle s’accorde au graphe qu’un auteur
//     aurait en tête. Les six items qui montrent un graphe — `e04`, `e08`, `p01`,
//     `t03`, `t07`, `t10`, servis par cinq graphes distincts — sont ceux où la
//     topologie EST la difficulté.
//   · **Un item de classe B ne peut pas porter de figure** sans que la figure
//     soit l’objet formel de la correction lui-même (FIGURE_ET_CORRECTION_DISJOINTES).
//     Or ici la correction est un choix raisonné, pas un circuit : les sept items
//     de classe B n’ont donc pas de schéma, par construction et non par oubli.
//   · **Un item ne peut pas porter à la fois un calcul et une réponse libre**
//     (ITEM_SCINDABLE_NON_SCINDE). « De combien s’est-il trompé ? » et « pourquoi
//     sa prévision était-elle fausse ? » sont deux items, jamais un seul.
//
// ── Le piège, et la condition la plus contraignante du catalogue ───────────
//
// `reponse-conforme-sans-adhesion` ne se déclare PAS sur n’importe quel item : sa
// `conditionValidite` exige une PAIRE — un item de restitution et un item de
// prédiction sur la même loi, jamais sur le même écran, séparés par au moins un
// item — et elle ne se déclenche que sur celui des deux qui est la PRÉDICTION.
// Un item de restitution qui déclarerait le piège serait refusé
// (CONDITION_DE_VALIDITE_NON_SATISFAITE), et c’est correct : l’élève conforme
// réussit la restitution, c’est même sa définition, et elle ne mesure donc rien
// seule.
//
// Trois paires sont écrites, et le `piege` n’est porté que par les trois
// prédictions :
//
//   restitution `e03` (double QCM)          → prédiction `e06` (palier 2)
//   restitution `p02` (double QCM)          → prédiction `p04` (palier 3)
//   restitution `t04` (double QCM)          → prédiction `t09` (palier 4)
//
// Les paliers 2 et 3 déclarent deux dimensions DISTINCTES — `mode-de-reponse` et
// `objet-support` —, sans quoi le refus MEME_DIMENSION_AUX_DEUX_PALIERS n’aurait
// rien à mordre. Le palier non étiqueté est couvert par `t09`, et `e06` porte le
// format diagnostique avec son motif écrit.
//
// ⚠ **Ce refus se lit sur le PIÈGE, pas sur le savoir-faire, et ce fichier n’est
// pas seul à le porter.** `ch02-sf6` — la loi d’additivité — déclare le même
// piège, et `verifier-contenu.mjs` groupe les items par piège sur tout le corpus :
// l’intersection à contrôler est celle de l’UNION des dimensions du palier 2 et de
// l’UNION de celles du palier 3, les deux savoir-faire mêlés. Une première
// rédaction est effectivement passée du REFUS au CONFORME sans qu’une ligne d’ici
// ne bouge, parce que `ch02-sf6` avait déplacé la sienne. L’état qui tient
// aujourd’hui est celui-ci — palier 2 : `mode-de-reponse` (ici) et
// `grandeur-en-jeu` (sf6) ; palier 3 : `objet-support` (ici) et
// `sens-du-changement` (sf6) — et il ne se maintiendra pas tout seul : les deux
// fichiers se relisent ensemble, ou le contrôle le dira.
//
// ── Le critère de maîtrise, et pourquoi il ne se lit pas dans ce fichier seul ─
//
// `estMaitrise` demande, sur LES MÊMES trois réussites : un double QCM juste/juste,
// une réussite dans le `formatDiagnostique` du piège, au plus UNE réussite de
// classe C, et au moins une au palier le plus haut déjà rencontré. Les trois
// premières conditions se lient, et `srs.js` écrit l’hypothèse : « au plus une
// réussite de classe C, ET C’EST CE DOUBLE QCM ».
//
// Une première rédaction ne la tenait pas. Les trois doubles QCM sont de classe C
// — ils le sont partout dans le corpus —, le seul item de format diagnostique
// était `e06`, de classe C lui aussi, et les deux ne sont pas le même item : tout
// triplet satisfaisant les conditions 2 et 4 portait donc DEUX classes C et
// tombait sur la condition 3. Zéro triplet acquérant sur les 2 300 possibles ;
// autrement dit, un savoir-faire que rien ne pouvait jamais déclarer acquis, et
// qu’aucun refus de `validerItem` ne signalait — le contrôleur juge des items, pas
// des trajectoires.
//
// Le format diagnostique doit donc être porté par un item de classe A ou B, ou par
// le double QCM lui-même. Ici la seconde issue est fermée : la `conditionValidite`
// du piège exige `roleDeCetItem === 'prediction'`, et le double QCM est la
// RESTITUTION. `e06` est donc passé en classe B, avec le coût écrit à l’objet
// formel. Le précédent existe — `ch01-sf7-p02`, prédiction engagée de classe B
// portant le format diagnostique de son piège — et les savoir-faire du chapitre 1
// qui n’ont qu’un format diagnostique de classe C sont à relire de la même façon.
//
// `dispositifServi` est servi deux fois, et toujours `tes-deux-reponses-cote-a-cote` :
// c’est le seul des deux constats du piège qui soit transportable ici. L’autre,
// `la-phrase-et-le-dessin`, a un décor de mécanique — un ballon posé sur une
// table, des flèches à orienter — et le servir sur un circuit reviendrait à
// annoncer à l’élève un dispositif qu’il ne verra pas.
//
// ── Les distracteurs : cinq, et pas un de plus ─────────────────────────────
//
// Tout distracteur quantitatif est produit par un modèle erroné EXÉCUTABLE. Deux
// familles seulement sont défendables ici, et les cinq distracteurs s’y rangent :
//
//   · **l’élève qui soustrait ou moyenne les NOMBRES sans convertir** — 2 700 mV
//     et 2,7 V lui font 2 697,3. Le modèle s’écrit `@u × 1000 − @v` et il
//     s’exécute : c’est exactement le geste, pas une valeur inventée. Piège
//     `valeur-invraisemblable-non-critiquee` (`e04`, `p03`, `t03`).
//   · **l’élève qui remplace la lecture qui dérange par ce que la loi annonce** —
//     trois lectures dont une s’écarte de 1,8 V, et il répond « zéro, puisqu’elles
//     sont en dérivation ». Piège `valeur-aberrante-d-une-serie-non-reperee`
//     (`e10`, `t10`).
//
// ⚠ Les deux rattachements ont été REFAITS, et les deux premiers étaient des
// erreurs d’attribution — le défaut dont `pieges/index.js` dit qu’il est le plus
// discret du projet : « un contrôle qui [confirme la réponse fausse] ». Le détail
// est écrit sur chaque distracteur ; en deux lignes :
//
//   · `unite-absente-ou-fausse` ne mordait pas sur 2 697,3 **V**. L’unité rendue
//     est la bonne et de la bonne nature ; ce piège contredit une unité d’une
//     AUTRE nature, il écrit lui-même que la conversion ratée relève de
//     `maths-4e`, son `contexteImpose` exige une grandeur composée, et sa clause
//     la plus insistante (« 2 700 kg/m³ pour des g/cm³, c’est répondre juste »)
//     validait l’élève. Son `controle` aussi : des V moins des V donnent des V.
//   · `reponse-conforme-sans-adhesion` ne mordait pas sur « zéro ». Ce piège
//     décrit l’élève qui dit la loi SANS y croire ; celui-là y croit contre ses
//     mesures. Le piège dit d’ailleurs que sa conception « se lit dans l’ÉCART
//     entre les deux [items], jamais dans l’un des deux pris seul » : un
//     distracteur seul ne peut pas la diagnostiquer. Et sa `regle` (« quand une
//     loi et une impression se contredisent, c’est l’impression qui perd ») comme
//     son `controle` (« donne celle de la loi ») lui dictaient sa réponse fausse.
//
// **Aucun distracteur qualitatif n’est écrit**, et il faut dire pourquoi : le
// catalogue ne porte AUCUNE conception du type « la tension se partage entre les
// dipôles en dérivation ». La plus proche, `mesurer-en-coupant-le-circuit`, parle
// de l’endroit où l’on pose l’appareil, pas du partage de la tension ; la
// rattacher servirait, après l’erreur, l’explication d’une conception que l’élève
// n’a pas. C’est un trou du corpus, il est nommé ici, et un piège inventé vaudrait
// moins que pas de piège. Les mauvaises réponses vivent donc dans les `ecartes`
// des objets formels et dans les justifications fausses des doubles QCM, où elles
// n’engagent aucune réfutation espacée.
//
// ⚠ Ce paragraphe disait le droit et la première rédaction faisait l’inverse
// soixante lignes plus bas : la justification `la-tension-circule-et-se-partage`
// de `e03` portait précisément `mesurer-en-coupant-le-circuit`. Elle est
// redevenue `locale`. Une règle écrite dans un en-tête ne se tient pas toute
// seule ; c’est la relecture qui la tient.
//
// ── Les cercles ────────────────────────────────────────────────────────────
//
//   0    5 items   la loi elle-même, et sa réciproque
//   1   15 items   le raisonnement sur les lectures
//   2    3 items   quel montage tranche, quelle explication tient
//   3    2 items   `p01` et `t10`, où la première tâche est de LIRE sur le
//                  dessin quels dipôles partagent leurs bornes
//
// Deux items de cercle 3 seulement, et c’est délibéré : ce savoir-faire est de
// cercle 1, le cercle 3 est plafonné et non encouragé, et le vivier de geste
// figuré du chapitre vient des quatre savoir-faire qui le portent (`sf1` à `sf4`).
// En pousser davantage ici gonflerait la bande la moins bien justifiée par la
// recherche que ce projet invoque, sur le savoir-faire qui en a le moins besoin.
//
// ── CE QUE CE SAVOIR-FAIRE NE COUVRE PAS ───────────────────────────────────
//
//   · **Le geste.** On ne branche rien, on ne tourne aucun bouton. Tous les
//     énoncés décrivent un montage DÉJÀ FAIT et demandent de prévoir une
//     indication, d’exploiter une lecture ou de dire pourquoi une lecture est
//     impossible. « Mettre en œuvre » est hors périmètre, et le cours l’écrit à
//     l’élève.
//   · **Où placer le voltmètre** : c’est `ch02-sf3`. Ici l’appareil est toujours
//     DÉJÀ posé, et bien posé — sauf en `p05`, où la question est justement de
//     comprendre qu’une lecture aberrante s’explique par un appareil mal posé, et
//     où la réponse reste un raisonnement, pas un branchement.
//   · **La loi d’additivité** : c’est `ch02-sf6`. Aucun item de ce fichier ne
//     demande d’additionner deux tensions ni d’en soustraire une d’une autre pour
//     trouver la troisième. Les soustractions écrites ici comparent deux lectures
//     ou une lecture à une inscription — jamais deux dipôles d’une même maille.
//   · **Le calibre et la lecture d’un afficheur** : c’est `ch02-sf4`. Les
//     tensions de ce fichier sont données lues.
//   · **La loi d’Ohm, la puissance, l’énergie** : hors attendus du cycle 4 pour
//     les deux dernières (rubrique « ce qui n’est pas demandé » du chapitre), et
//     chapitre frontière pour la première.
//   · **La discrimination mathématique.** `ch02-sf5` ne déclare aucun
//     `prerequisMaths` : une soustraction et une moyenne sont installées depuis le
//     cycle 3. Aucun item ne porte `discriminationMaths` — en poser un serait
//     refusé (DISCRIMINATION_SANS_PREREQUIS), et il n’y aurait rien à séparer.

const SF = 'ch02-sf5-loi-d-unicite-des-tensions';
const CH = 'ch02-tension-electrique';

// ════════════════════════════════════════════════════════════════════════════
// Les cinq circuits — écrits une fois, cités partout où ils servent
// ════════════════════════════════════════════════════════════════════════════
//
// Convention de `circuit.js`, valable pour tout dipôle polarisé :
//
//     bornes = [ borne « − » (COM, noire) , borne « + » (rouge) ]
//
// Le courant sort de la pile par `bornes[1]`. Le « + » d’un voltmètre se met donc
// du côté par lequel le courant ARRIVE dans le bloc mesuré, sinon `diagnostiquer`
// rend BORNE_INVERSEE.

const dip = (id, type, moins, plus, extra = {}) => Object.freeze({
  id, type, bornes: Object.freeze([moins, plus]), ...extra,
});

const circuit = (...dipoles) => Object.freeze({ dipoles: Object.freeze(dipoles) });

/** Deux lampes en dérivation, et un voltmètre posé sur les deux points qu’elles
 *  partagent. Le cas canonique du savoir-faire : `sontEnDerivation(L1, L2)` vaut
 *  vrai, `typeDeCircuit` rend DERIVATION, et le voltmètre ne change pas ce verdict
 *  — `typeDeCircuit` le retire avant de conclure, sans quoi tout circuit muni d’un
 *  voltmètre serait déclaré « en dérivation ».
 *
 *  ⚠ Le graphe ne peut PAS distinguer « aux bornes de L1 » de « aux bornes de
 *  L2 » : ce sont les mêmes deux nœuds, et `enDerivationAuxBornesDe` rend vrai
 *  pour les deux. Ce n’est pas une imprécision du modèle, c’est la loi d’unicité
 *  elle-même, écrite dans la topologie. Les énoncés de `e08` et de `t07` le disent
 *  donc à l’élève au lieu de faire mine de désigner une lampe plutôt que l’autre —
 *  une légende « voltmètre aux bornes de L2 » aurait affirmé sur le dessin une
 *  distinction que le dessin ne porte pas. */
const CIRCUIT_DEUX_LAMPES_EN_DERIVATION = circuit(
  dip('P', 'pile', 'a', 'b', { nom: 'Pile' }),
  dip('K', 'interrupteur', 'b', 'c', { etat: 'ferme', nom: 'K' }),
  dip('L1', 'lampe', 'c', 'd', { nom: 'L1' }),
  dip('L2', 'lampe', 'c', 'd', { nom: 'L2' }),
  dip('f', 'fil', 'd', 'a', { nom: 'fil' }),
  dip('V', 'voltmetre', 'd', 'c', { nom: 'V' }),
);

/** Une lampe traversée par tout le courant, puis deux lampes qui se le
 *  partagent. `typeDeCircuit` rend MIXTE — et pas DERIVATION —, parce qu’un
 *  récepteur est en série avec le bloc en dérivation. C’est le circuit où la loi
 *  d’unicité s’applique à L2 et L3 et PAS à L1 : sans lui, « en dérivation »
 *  finirait par vouloir dire « dans le même circuit ». */
const CIRCUIT_MIXTE_UNE_PUIS_DEUX = circuit(
  dip('P', 'pile', 'a', 'b', { nom: 'Pile' }),
  dip('L1', 'lampe', 'b', 'c', { nom: 'L1' }),
  dip('L2', 'lampe', 'c', 'd', { nom: 'L2' }),
  dip('L3', 'lampe', 'c', 'd', { nom: 'L3' }),
  dip('f', 'fil', 'd', 'a', { nom: 'fil' }),
);

/** Une lampe et un moteur en dérivation. Le moteur « demande plus » : c’est
 *  l’intuition, et la loi dit non.
 *
 *  Aucun voltmètre sur ce graphe, et c’est pour la raison écrite plus haut :
 *  l’énoncé de `p01` désigne DEUX mesures, l’une aux bornes de la lampe et
 *  l’autre aux bornes du moteur, et un voltmètre dessiné sur les deux points
 *  qu’ils partagent ne saurait représenter ni l’une ni l’autre. Le schéma montre
 *  donc le montage, l’énoncé décrit les mesures, et rien n’est affirmé sur le
 *  dessin que le dessin ne porte pas. */
const CIRCUIT_LAMPE_ET_MOTEUR = circuit(
  dip('P', 'pile', 'a', 'b', { nom: 'Pile' }),
  dip('K', 'interrupteur', 'b', 'c', { etat: 'ferme', nom: 'K' }),
  dip('L', 'lampe', 'c', 'd', { nom: 'L' }),
  dip('M', 'moteur', 'c', 'd', { nom: 'M' }),
  dip('f', 'fil', 'd', 'a', { nom: 'fil' }),
);

/** Trois lampes en dérivation. La troisième est dessinée le plus loin de la
 *  pile — c’est ce que l’élève regarde, et ce qui ne change rien. */
const CIRCUIT_TROIS_LAMPES_EN_DERIVATION = circuit(
  dip('P', 'pile', 'a', 'b', { nom: 'Pile' }),
  dip('L1', 'lampe', 'b', 'c', { nom: 'L1' }),
  dip('L2', 'lampe', 'b', 'c', { nom: 'L2' }),
  dip('L3', 'lampe', 'b', 'c', { nom: 'L3' }),
  dip('f', 'fil', 'c', 'a', { nom: 'fil' }),
);

/** Deux lampes en série dans une branche, une lampe seule dans l’autre. La loi
 *  d’unicité porte sur des BRANCHES autant que sur des dipôles — la branche
 *  {L1, L2} et la lampe L3 ont les mêmes deux extrémités —, et `t03` est le seul
 *  item du fichier qui le travaille. Pas de voltmètre sur le graphe, même raison
 *  qu’au-dessus : lire que ces deux-là partagent leurs points EST la tâche. */
const CIRCUIT_BRANCHE_DE_DEUX_LAMPES = circuit(
  dip('P', 'pile', 'a', 'b', { nom: 'Pile' }),
  dip('L1', 'lampe', 'b', 'c', { nom: 'L1' }),
  dip('L2', 'lampe', 'c', 'd', { nom: 'L2' }),
  dip('L3', 'lampe', 'b', 'd', { nom: 'L3' }),
  dip('f', 'fil', 'd', 'a', { nom: 'fil' }),
);

// Aucun circuit EN SÉRIE n’est écrit, et c’est une conséquence du schéma d’item,
// pas un oubli. Le contre-exemple — deux lampes l’une derrière l’autre, où la loi
// ne dit rien — est nécessaire, et il est servi trois fois : dans le bloc « ce que
// la loi ne dit pas » du cours, dans `e09` (la réciproque est fausse) et dans
// `t08` (sur quel couple la loi porte). Les trois sont des choix raisonnés, donc
// de classe B, donc SANS FIGURE : un item de classe B dont la figure ne serait pas
// l’objet formel de sa correction est refusé (FIGURE_ET_CORRECTION_DISJOINTES), et
// la correction est ici un choix, pas un circuit. Le contre-exemple est donc
// décrit en toutes lettres, et le dire vaut mieux que dessiner un graphe
// qu’aucun item ne cite.

// ════════════════════════════════════════════════════════════════════════════
// Les objets formels des choix raisonnés — classe B
// ════════════════════════════════════════════════════════════════════════════
//
// `{ question, choisi, ecartes }` : l’affichage et le verdict sortent du MÊME
// objet. Chaque identifiant a son libellé français dans `js/lexique.js`, sans
// quoi le build refuse (IDENTIFIANT_SANS_LIBELLE) et la zone de réponse se
// referme en silence devant l’élève.

const choixRaisonne = (e) => Object.freeze({
  question: e.question,
  choisi: e.choisi,
  ecartes: Object.freeze(e.ecartes),
});

const CHOIX_LA_GROSSE_ET_LA_PETITE = choixRaisonne({
  question: 'que-lira-l-autre-voltmetre',
  choisi: 'la-meme-tension-que-l-autre-dipole',
  ecartes: ['une-tension-plus-grande', 'une-tension-plus-petite', 'la-moitie-de-la-tension-de-la-pile'],
});

const CHOIX_LA_LAMPE_ET_LE_MOTEUR = choixRaisonne({
  question: 'que-lira-l-autre-voltmetre',
  choisi: 'la-meme-tension-que-l-autre-dipole',
  ecartes: ['une-tension-plus-grande', 'zero-volt', 'on-ne-peut-pas-le-savoir-sans-mesurer'],
});

const CHOIX_MONTAGE_QUI_TRANCHE = choixRaisonne({
  question: 'quel-montage-permet-de-trancher',
  choisi: 'deux-dipoles-differents-en-derivation-un-voltmetre-sur-chacun',
  ecartes: [
    'deux-dipoles-identiques-en-derivation-un-voltmetre-sur-chacun',
    'deux-dipoles-differents-en-serie-un-voltmetre-sur-chacun',
    'un-seul-dipole-et-un-voltmetre-a-ses-bornes',
  ],
});

// ⚠ Le `choisi` et le premier `ecarte` étaient INVERSÉS, et c'est une faute de
// méthode sur l'item même qui enseigne le contrôle des variables.
//
// L'affirmation à éprouver est comparative — « plus c'est loin, plus la tension
// est petite ». Il faut donc DEUX lectures à deux distances, et des dipôles
// IDENTIQUES pour que la taille ne varie pas en même temps que la distance.
// « Trois dipôles identiques, un voltmètre sur le plus éloigné » ne donne qu'UNE
// lecture : plus petite que quoi ? Rien dans ce montage ne fournit le terme de
// comparaison, et un élève qui le retient n'a pas construit une expérience, il a
// construit une mesure.
//
// Le montage à deux dipôles IDENTIQUES est écarté dans `e05` et retenu ici, et
// c'est le cœur de la paire : ce qui doit rester constant dépend de l'hypothèse
// qu'on éprouve. Pour la TAILLE, deux dipôles identiques ne tranchent rien — les
// deux hypothèses y prédisent la même chose. Pour la DISTANCE, ce sont eux, et
// eux seuls, qui isolent la variable.
const CHOIX_MONTAGE_QUI_TRANCHE_SUR_LA_DISTANCE = choixRaisonne({
  question: 'quel-montage-permet-de-trancher',
  choisi: 'deux-dipoles-identiques-en-derivation-un-voltmetre-sur-chacun',
  ecartes: [
    'trois-dipoles-identiques-en-derivation-un-voltmetre-sur-le-plus-eloigne',
    'deux-dipoles-differents-en-serie-un-voltmetre-sur-chacun',
    'un-seul-dipole-et-un-voltmetre-a-ses-bornes',
  ],
});

/** La prédiction du bandeau de vitrine — l'item qui porte le format
 *  diagnostique du piège.
 *
 *  ⚠ Cet objet formel existe pour une raison qui n'est PAS pédagogique, et il
 *  faut l'écrire : `e06` était de classe C, et le savoir-faire devenait alors
 *  INATTEIGNABLE. `estMaitrise` demande, sur les mêmes trois réussites, un
 *  double QCM (nécessairement de classe C), une réussite dans le format
 *  diagnostique du piège, et AU PLUS UNE réussite de classe C. Tant que le seul
 *  item de format diagnostique était de classe C et n'était pas ce double QCM,
 *  les trois conditions ne pouvaient pas être satisfaites ensemble — zéro
 *  triplet sur les 2 300 possibles. `srs.js` écrit l'hypothèse de conception en
 *  toutes lettres : « au plus une réussite de classe C, et c'est ce double QCM ».
 *  Le format diagnostique doit donc être porté par un item de classe A ou B, ou
 *  par le double QCM lui-même — et ce dernier est ici impossible, la
 *  `conditionValidite` du piège ne se déclenchant que sur la PRÉDICTION.
 *
 *  Ce que la conversion coûte, et il faut le dire aussi : une prédiction à
 *  quatre propositions engage moins qu'un nombre à écrire, parce que l'élève
 *  conforme RECONNAÎT la phrase du cours dans la liste au lieu d'avoir à la
 *  produire. Les deux autres prédictions de la paire — `p04` et `t09` — restent
 *  donc des nombres libres, et c'est celle-ci, la seule, qui est un choix.
 *  Précédent : `ch01-sf7-p02`, prédiction engagée de classe B portant elle aussi
 *  le format diagnostique de son piège. */
const CHOIX_LA_LAMPE_DU_BOUT_DE_LA_VITRINE = choixRaisonne({
  question: 'que-va-afficher-le-voltmetre-du-bout-de-la-vitrine',
  choisi: 'exactement-la-meme-chose-qu-a-la-premiere-lampe',
  ecartes: [
    'un-peu-moins-parce-que-la-vitrine-est-longue',
    'trois-fois-moins-puisqu-il-y-a-trois-lampes',
    'on-ne-peut-pas-le-savoir-sans-mesurer',
  ],
});

const CHOIX_RECIPROQUE_DE_LA_LOI = choixRaisonne({
  question: 'la-meme-tension-prouve-t-elle-la-derivation',
  choisi: 'non-deux-dipoles-identiques-en-serie-donnent-aussi-deux-tensions-egales',
  ecartes: [
    'oui-c-est-la-definition-de-la-derivation',
    'oui-a-condition-que-les-deux-dipoles-soient-differents',
  ],
});

const CHOIX_EXPLICATION_DE_L_ECART = choixRaisonne({
  question: 'quelle-explication-tient',
  choisi: 'le-troisieme-voltmetre-n-est-pas-aux-bornes-de-sa-lampe',
  ecartes: [
    'la-troisieme-lampe-est-plus-loin-de-la-pile',
    'la-loi-ne-vaut-plus-au-dela-de-deux-lampes',
    'un-ecart-pareil-est-normal-entre-trois-mesures',
  ],
});

const CHOIX_SUR_QUEL_COUPLE = choixRaisonne({
  question: 'sur-quel-couple-la-loi-s-applique-t-elle',
  choisi: 'l2-et-l3-qui-ont-les-memes-bornes',
  ecartes: ['l1-et-l2-qui-se-suivent', 'l1-et-la-pile', 'les-trois-lampes-ensemble'],
});

// ════════════════════════════════════════════════════════════════════════════
// DÉCOUVERTE — une situation, aucune loi énoncée
// ════════════════════════════════════════════════════════════════════════════

export const DECOUVERTE = Object.freeze({
  titre: 'La grosse lampe et la petite',
  texte:
    'Sur la paillasse, une pile plate alimente deux lampes branchées côte à côte, chacune entre '
    + 'les deux mêmes points du circuit : une grosse lampe de vélo, et une petite lampe de poche. '
    + 'Deux voltmètres sont déjà en place, un sur chaque lampe. Le professeur cache les afficheurs '
    + 'avec sa main et demande à la classe de parier.',
  releve: Object.freeze([
    'Pari du groupe A : « la grosse en prend plus, elle est plus grosse »',
    'Pari du groupe B : « elles se partagent, donc chacune la moitié »',
    'Pari du groupe C : « la première en prend plus, la seconde reçoit ce qui reste »',
    'Pari du groupe D : « la même chose pour les deux »',
  ]),
  questions: Object.freeze([
    'Écris ton pari avant de lire la suite. Un seul des quatre est juste, et il n’est pas le plus '
    + 'populaire dans les classes de quatrième.',
    'Le professeur enlève sa main : les deux afficheurs indiquent la même chose. Lequel des quatre '
    + 'paris cela élimine-t-il ? Lequel cela ne suffit PAS à éliminer ?',
    'Il refait la manipulation avec deux lampes identiques. Les deux afficheurs indiquent encore la '
    + 'même chose. Cette seconde expérience apprend-elle quelque chose de plus que la première ?',
  ]),
  cePourQuoiOnNeTranchePasEncore:
    'Aucune règle n’est donnée ici. Deux idées différentes tiennent debout à ce stade : « ce qui '
    + 'compte, c’est la place dans le circuit » et « ce qui compte, c’est la taille du dipôle ». Le '
    + 'cours ne va pas dire que ces idées sont bêtes — elles sont exactement ce qu’on observe quand '
    + 'on met deux lampes l’une derrière l’autre, et elles ont raison là. Il va dire à quel endroit '
    + 'précis du circuit elles cessent d’avoir raison, et comment le reconnaître sur un schéma.',
});

// ════════════════════════════════════════════════════════════════════════════
// COURS — six blocs typés
// ════════════════════════════════════════════════════════════════════════════

export const COURS = Object.freeze({
  titre: 'La loi d’unicité des tensions',
  blocs: Object.freeze([
    {
      type: 'definition',
      titre: 'Une tension, c’est ENTRE deux points',
      texte:
        'La **tension** ne circule pas, ne se consomme pas, ne s’use pas : elle se mesure **entre '
        + 'deux points**, jamais en un seul. C’est pour cela qu’on écrit U avec **deux** lettres, '
        + 'celles des deux points, et c’est pour cela qu’un voltmètre se branche **en dérivation**, '
        + 'les deux fils posés de part et d’autre du dipôle. Un voltmètre inséré dans le circuit ne '
        + 'mesure pas mal : il empêche le courant de passer, et plus rien ne fonctionne.',
    },
    {
      type: 'propriete',
      titre: 'La loi d’unicité',
      texte:
        'Deux dipôles branchés **en dérivation** — c’est-à-dire reliés aux **deux mêmes points** — '
        + 'ont **la même tension** entre leurs bornes. Toujours. Quelle que soit leur taille, leur '
        + 'nature, leur place sur le dessin, leur distance à la pile. Une grosse lampe et une petite '
        + 'lampe en dérivation ont la même tension ; une lampe et un moteur en dérivation ont la même '
        + 'tension.',
    },
    {
      type: 'remarque',
      titre: 'Ce que la loi ne dit pas',
      texte:
        'Elle ne dit pas que les deux dipôles **font** la même chose : la grosse lampe brille plus, '
        + 'le moteur tourne. Elle ne dit rien non plus des dipôles **en série** : deux lampes l’une '
        + 'derrière l’autre n’ont aucune raison d’avoir la même tension, et c’est là que ton '
        + 'intuition du partage a raison. Avant d’appliquer la loi, une seule question : **ces deux '
        + 'dipôles sont-ils reliés aux deux mêmes points ?**',
    },
    {
      type: 'propriete',
      titre: 'Elle vaut aussi pour un groupe de dipôles',
      texte:
        'Si une branche contient **deux lampes en série** et qu’une troisième lampe est branchée en '
        + 'dérivation sur cette branche, alors la tension aux bornes de **l’ensemble** des deux lampes '
        + 'est égale à celle aux bornes de la troisième. Ce qui compte n’est pas le nombre de dipôles, '
        + 'c’est **d’avoir les mêmes deux points aux extrémités**.',
    },
    {
      type: 'remarque',
      titre: 'La réciproque est fausse',
      texte:
        'Deux tensions égales ne prouvent **pas** que les dipôles sont en dérivation : deux lampes '
        + '**identiques** montées en série portent, elles aussi, la même tension — la moitié de celle '
        + 'de la pile chacune. Lire « les deux afficheurs sont d’accord, donc c’est une dérivation » '
        + 'est une conclusion qui tombe juste une fois sur deux, ce qui est la pire des situations : '
        + 'on ne s’aperçoit jamais qu’on se trompe. La topologie se lit sur le **schéma**, pas sur les '
        + 'afficheurs.',
    },
    {
      type: 'remarque',
      titre: 'Ce que cette application ne te fera pas faire',
      texte:
        'Tu ne brancheras rien ici, et tu ne toucheras aucun bouton : **le geste s’apprend en salle, '
        + 'pas sur un écran**. Ce qu’on travaille, c’est ce qui vient avant et après — dire **où** '
        + 'brancher, **prévoir** ce que l’appareil affichera, et dire **pourquoi** telle lecture est '
        + 'impossible. Et une chose de plus, qui est le vrai sujet de ce chapitre : **savoir réciter '
        + 'la loi et savoir s’en servir ne sont pas la même chose.** On te posera régulièrement les '
        + 'deux questions dans la même séance, à distance l’une de l’autre, et on te montrera tes '
        + 'deux réponses côte à côte. Si elles se contredisent, ce n’est pas une étourderie : c’est '
        + 'l’endroit exact où il te reste quelque chose à comprendre, et c’est une bonne nouvelle de '
        + 'le savoir.',
    },
  ].map(Object.freeze)),
});

// ════════════════════════════════════════════════════════════════════════════
// MÉTHODE — un exercice résolu, geste de contrôle compris
// ════════════════════════════════════════════════════════════════════════════

export const METHODE = Object.freeze({
  titre: 'Prévoir une tension avec la loi d’unicité',
  enonce:
    'Une pile alimente une lampe L1, puis deux lampes L2 et L3 branchées entre les deux mêmes '
    + 'points. Un voltmètre aux bornes de L2 affiche 3,6 V ; un autre, aux bornes de L3, affiche '
    + '3,4 V. Quelle valeur retenir pour la tension aux bornes de L3, et pourquoi ?',
  etapes: Object.freeze([
    {
      geste: 'Cherche les deux points, pas les deux dipôles.',
      redaction:
        'L2 et L3 sont reliées aux **deux mêmes points** du circuit : elles sont en dérivation. L1, '
        + 'elle, est traversée par tout le courant avant d’arriver à ces deux points : elle n’est en '
        + 'dérivation avec **aucune** des deux.',
    },
    {
      geste: 'Applique la loi là où elle s’applique, et nulle part ailleurs.',
      redaction:
        'La loi d’unicité dit que L2 et L3 ont la **même** tension. Elle ne dit **rien** de L1 : je '
        + 'n’écris rien sur L1.',
    },
    {
      geste: 'Confronte la loi aux deux lectures.',
      redaction:
        'La loi annonce deux valeurs égales, la mesure en donne deux qui diffèrent de 0,2 V. Ce n’est '
        + 'pas la loi qui est fausse : c’est que deux mesures de la même grandeur ne donnent jamais '
        + 'exactement le même nombre.',
    },
    {
      geste: 'Décide de la valeur à retenir, et dis-le.',
      redaction:
        'Je retiens la **moyenne** des deux lectures : (3,6 + 3,4) ÷ 2 = 3,5 V, et j’écris que les '
        + 'deux voltmètres différaient de 0,2 V.',
    },
    {
      geste: 'Calcule l’unité avant le nombre.',
      redaction:
        'Une tension se mesure en **volts**. La moyenne de deux tensions est une tension : des V ÷ un '
        + 'nombre, donc des **V**. Si les deux lectures avaient été écrites l’une en mV et l’autre en '
        + 'V, il aurait fallu **convertir avant d’additionner** — 3 600 mV et 3,4 V ne s’ajoutent pas '
        + 'tels quels.',
    },
  ].map(Object.freeze)),
  controle:
    'Deux vérifications, dans cet ordre. **La topologie** : ai-je bien deux dipôles reliés aux DEUX '
    + 'MÊMES POINTS ? Si je ne peux pas montrer les deux points du doigt sur le schéma, je n’ai pas '
    + 'le droit d’appliquer la loi. **L’ordre de grandeur** : 3,5 V, sur une pile plate de 4,5 V, '
    + 'c’est plausible. Si j’avais trouvé 0,035 V ou 350 V, je reprendrais mon calcul — et si '
    + 'j’avais trouvé une valeur PLUS GRANDE que celle de la pile, je saurais que j’ai fait une '
    + 'faute quelque part.',
  erreurQuOnAttend:
    'La faute la plus fréquente n’est pas la moyenne : c’est d’avoir appliqué la loi à L1 et L2 '
    + 'parce qu’elles sont « dans le même circuit ». Être dans le même circuit ne suffit pas ; il '
    + 'faut avoir les mêmes deux points. La seconde faute la plus fréquente est de conclure de deux '
    + 'lectures égales que les dipôles sont en dérivation : la réciproque de la loi est fausse.',
});

// ════════════════════════════════════════════════════════════════════════════
// ENTRAÎNEMENT — 10 items
// ════════════════════════════════════════════════════════════════════════════

export const ENTRAINEMENT = Object.freeze([

  // ── e01 — palier 1 · classe B · cercle 1 · le cas canonique ──────────────
  //
  // La situation de la découverte, cette fois tranchée. Pas de figure : la
  // classe B exige que la figure SOIT l’objet formel de la correction, et la
  // correction est ici un choix raisonné. Le circuit est donc décrit.
  {
    id: 'ch02-sf5-e01-la-grosse-lampe-et-la-petite',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'B',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'une-lampe-de-velo-et-une-lampe-de-poche',
    enonce:
      'Une pile de {{donnee:pile}} alimente deux lampes reliées aux deux mêmes points du circuit : '
      + 'L1 est une grosse lampe de vélo, L2 une petite lampe de poche. Un voltmètre branché aux '
      + 'bornes de L1 affiche {{donnee:u1}}. Que va afficher un voltmètre branché aux bornes de L2 ?',
    donnees: {
      pile: { valeur: [45, 10], unite: 'V' },
      u1: { valeur: [45, 10], unite: 'V' },
    },
    reponse: { objetFormel: CHOIX_LA_GROSSE_ET_LA_PETITE },
  },

  // ── e02 — palier 1 · classe A · cercle 1 · la loi et les deux lectures ───
  //
  // Le premier item où la loi produit un nombre NOUVEAU. Elle annonce deux
  // valeurs égales ; la mesure en donne deux qui diffèrent de 0,2 V, et ce n’est
  // pas la loi qui cède. C’est aussi le seul geste que ce savoir-faire partage
  // avec `ch01-sf5` : une série de mesures s’exploite, elle ne se choisit pas.
  {
    id: 'ch02-sf5-e02-deux-voltmetres-qui-ne-disent-pas-tout-a-fait-pareil',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'deux-voltmetres-sur-deux-lampes-identiques',
    enonce:
      'Deux lampes identiques sont branchées en dérivation, reliées aux deux mêmes points. Le '
      + 'voltmètre de la première affiche {{donnee:ua}}, celui de la seconde {{donnee:ub}}. La loi '
      + 'd’unicité dit que ces deux tensions sont égales. Quelle valeur retiens-tu, avec son unité ?',
    donnees: {
      ua: { valeur: [44, 10], unite: 'V' },
      ub: { valeur: [46, 10], unite: 'V' },
    },
    calcul: {
      etapes: [
        { id: 'somme', expr: '@ua + @ub', unite: 'V' },
        { id: 'moyenne', expr: '#somme ÷ 2', unite: 'V' },
      ],
      reponse: 'moyenne',
    },
    reponse: { valeur: [45, 10], unite: 'V', semantique: 'exacte' },
  },

  // ── e03 — palier 1 · classe C · cercle 0 · RESTITUTION de la paire 1 ─────
  //
  // Aucun `piege` déclaré, et c’est la condition de validité du catalogue qui
  // l’impose : le prédicat de `reponse-conforme-sans-adhesion` ne se déclenche
  // que sur l’item de PRÉDICTION. Un item de restitution qui le déclarerait
  // serait refusé — et à raison : l’élève conforme y réussit, c’est sa
  // définition, il ne mesure donc rien seul. Il n’existe qu’en tant que moitié
  // de la paire, et son identifiant est cité par `e06`.
  {
    id: 'ch02-sf5-e03-double-qcm-que-dit-la-loi',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 1,
    registre: 'macro',
    type: 'double-qcm',
    contexteDeSurface: 'la-loi-enoncee-sans-aucun-nombre',
    enonce:
      'Deux lampes sont branchées en dérivation aux bornes d’une même pile. Que peut-on dire de la '
      + 'tension aux bornes de l’une et de la tension aux bornes de l’autre ? Puis choisis la phrase '
      + 'qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'les-deux-tensions-sont-egales',
      choixPossibles: [
        'les-deux-tensions-sont-egales',
        'la-tension-se-partage-entre-les-deux',
        'la-plus-proche-de-la-pile-a-la-plus-grande-tension',
        'on-ne-peut-pas-le-savoir-sans-mesurer',
      ],
    },
    justifications: [
      {
        id: 'les-memes-deux-points',
        texte:
          'Les deux lampes sont reliées aux mêmes deux points du circuit. Une tension se mesure '
          + 'entre deux points : si les deux points sont les mêmes, la tension est la même.',
        juste: true,
        provenance: 'locale',
      },
      // ⚠ Portait `mesurer-en-coupant-le-circuit`, en contradiction avec ce que
      // l'en-tête de ce fichier écrit lui-même soixante lignes plus haut : ce
      // piège « parle de l'endroit où l'on pose l'appareil, pas du partage de la
      // tension », et le rattacher sert à l'élève, après son erreur, l'explication
      // d'une conception qu'il n'a pas.
      //
      // Le contrôle du piège est un geste de BRANCHEMENT de bout en bout —
      // « enlève l'appareil par la pensée », « suis du doigt les deux fils de ton
      // appareil » — et il n'y a rien à brancher dans un double QCM. Et sa
      // conception dit, à son dernier degré, l'INVERSE de cette justification :
      // « si la tension circule, elle est la même partout ». L'élève, lui, dit
      // qu'elle SE SÉPARE.
      //
      // Aucun piège du catalogue ne porte « la tension se partage entre les
      // dipôles en dérivation » : c'est le trou nommé dans l'en-tête. La
      // justification reste donc `locale` et n'engage aucune réfutation espacée —
      // un piège inventé vaudrait moins que pas de piège.
      {
        id: 'la-tension-circule-et-se-partage',
        texte:
          'La pile envoie de la tension dans le circuit ; quand elle arrive à l’embranchement, elle '
          + 'se sépare en deux, donc chaque lampe en reçoit une part.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'c-est-la-phrase-du-cours',
        texte:
          'C’est ce qui est écrit dans la leçon : en dérivation les tensions sont égales. Après, sur '
          + 'la paillasse, je ne sais pas ce que ça donnerait vraiment.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « reponse-conforme-sans-adhesion », raisonnement « c-est-ce-qu-il-faut-repondre » — '
          + 'js/data/pieges/contrat.js',
        piege: 'reponse-conforme-sans-adhesion',
      },
      {
        id: 'ca-depend-des-lampes',
        texte:
          'Ça dépend des deux lampes : si elles sont pareilles ce sera pareil, si l’une est plus '
          + 'grosse elle en prendra plus.',
        juste: false,
        provenance: 'locale',
      },
    ],
    // Re-scellé après la relecture adverse : le retrait du `piege` de la
    // deuxième justification a périmé le hachage, et c'est exactement ce que le
    // sceau existe pour attraper — dans un double QCM, ce qui est risqué n'est
    // pas l'énoncé, ce sont les justifications.
    relu: { par: 'relecture-adverse', date: '2026-08-13', hash: 'cf0c386d1249d9a5' },
  },

  // ── e04 — palier 2 · classe A · cercle 1 · le circuit MIXTE, et l’écart ──
  //
  // Palier 2 : le support change — un graphe dessiné au lieu d’une description.
  // `typeDeCircuit` rend MIXTE et non DERIVATION : L1 est traversée par tout le
  // courant, L2 et L3 se le partagent. La loi porte sur L2 et L3, et sur elles
  // seules — c’est la lecture que l’item demande avant tout calcul.
  //
  // Les deux lectures sont écrites dans DEUX UNITÉS différentes, et l’écart vaut
  // zéro. Le modèle erroné est le geste, pas une valeur inventée : soustraire les
  // nombres sans convertir donne 2 697,3, et il s’exécute.
  {
    id: 'ch02-sf5-e04-mixte-ecart-entre-mv-et-v',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'symbolique',
    type: 'schema-circuit',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'le-schema-ou-une-lampe-precede-deux-autres',
    enonce:
      'Voici le montage. Un voltmètre branché aux bornes de L2 affiche {{donnee:uL2}} ; un autre, '
      + 'branché aux bornes de L3, affiche {{donnee:uL3}}. Quel est l’écart entre ces deux tensions ? '
      + 'Donne-le avec son unité.',
    figure: {
      sorte: 'circuit',
      circuit: CIRCUIT_MIXTE_UNE_PUIS_DEUX,
      titre: 'L1 seule, puis L2 et L3 entre les deux mêmes points',
    },
    donnees: {
      uL2: { valeur: [2700, 1], unite: 'mV' },
      uL3: { valeur: [27, 10], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'ecart', expr: '@uL2 − @uL3', unite: 'V' }],
      reponse: 'ecart',
    },
    reponse: { valeur: [0, 1], unite: 'V', semantique: 'exacte' },
    distracteurs: [
      // ⚠ Portait `unite-absente-ou-fausse`, et ce piège ne réfutait RIEN ici.
      // L'élève répond « 2 697,3 V » : son unité est la bonne, et elle est de la
      // bonne NATURE. Ce que la `regle` de ce piège contredit, c'est une unité
      // d'une autre nature (« des grammes divisés par des centimètres cubes
      // donnent des g/cm³, pas des grammes ») — elle est muette sur la sienne. Sa
      // clause la plus insistante le VALIDE même : « répondre 2 700 kg/m³ à une
      // question posée en g/cm³, c'est répondre juste, c'est la même grandeur
      // écrite autrement ». Et son `controle` — faire l'opération sur les unités
      // seules — la confirme : des V moins des V donnent des V. Le piège écrit
      // d'ailleurs lui-même que la conversion ratée n'est pas à lui (« déjà
      // couverte par `unites-non-converties` dans le catalogue de maths-4e »), et
      // son `contexteImpose` exige une grandeur COMPOSÉE, qu'une tension n'est
      // pas.
      //
      // `valeur-invraisemblable-non-critiquee` la réfute, elle, mot pour mot : sa
      // `regle` dit qu'un calcul correctement mené peut donner un résultat
      // impossible, « il suffit d'une virgule, d'une unité oubliée », et qu'un
      // résultat n'est pas vrai parce qu'il sort d'un calcul. Son `controle` est
      // celui que la MÉTHODE de ce fichier enseigne déjà pour les tensions —
      // comparer à un repère qu'on peut nommer : une pile plate fait 4,5 V, le
      // secteur 230 V, et 2 697 V aux bornes d'une lampe ne tient debout nulle
      // part.
      {
        id: 'ecart-des-nombres-sans-conversion',
        valeur: [26973, 10],
        unite: 'V',
        texte: 'Je soustrais les deux nombres tels qu’ils sont affichés.',
        piege: 'valeur-invraisemblable-non-critiquee',
        modeleErrone: {
          id: 'soustraire-les-nombres-pas-les-grandeurs',
          nom: 'modèle « le nombre affiché est la grandeur » : on soustrait 2,7 de 2 700',
          calcul: {
            etapes: [{ id: 'brut', expr: '@uL2 × 1000 − @uL3', unite: 'V' }],
            reponse: 'brut',
          },
        },
      },
    ],
  },

  // ── e05 — palier 2 · classe B · cercle 2 · quel montage tranche ──────────
  //
  // Contrôle des variables : deux élèves ne sont pas d’accord, et la question
  // n’est pas qui a raison mais quel montage PERMET DE LE SAVOIR. Le montage à
  // deux dipôles IDENTIQUES ne tranche rien — il donne le même résultat sous les
  // deux hypothèses, ce qui est la définition d’une expérience qui ne mesure pas.
  {
    id: 'ch02-sf5-e05-quel-montage-tranche-sur-la-taille',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'B',
    cercle: 2,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'deux-eleves-qui-ne-sont-pas-d-accord',
    enonce:
      'Léa affirme : « un gros dipôle prend une plus grande tension qu’un petit ». Sam affirme : '
      + '« en dérivation, la taille ne change rien ». On dispose d’une pile, de fils, de deux '
      + 'voltmètres, de deux lampes identiques, d’une grosse lampe et d’un petit moteur. Quel montage '
      + 'permet de trancher entre Léa et Sam ?',
    reponse: { objetFormel: CHOIX_MONTAGE_QUI_TRANCHE },
  },

  // ── e06 — palier 2 · classe B · cercle 1 · PRÉDICTION de la paire 1 ──────
  //
  // L’item qui porte le piège. Sa `situation` déclare la paire, le rôle, le fait
  // que les deux items ne sont jamais sur le même écran et le nombre d’items
  // intercalés : le prédicat du catalogue lit ces quatre champs et rien d’autre.
  //
  // Sur le MÊME écran, l’élève aligne sa seconde réponse sur la première — non
  // par tricherie, mais parce que la cohérence est ce qu’on lui a appris à
  // produire — et l’écart qu’on voulait mesurer disparaît sous nos yeux.
  //
  // Classe B, et ni A ni C. Pas A : la réponse ne comporte aucune opération à
  // rejouer — la loi rend le nombre déjà lu — et une classe A sans opération est
  // refusée. Pas C, et c’est la correction que la relecture adverse a imposée :
  // tant que le seul item de format diagnostique du savoir-faire était de classe
  // C sans être le double QCM, `estMaitrise` ne pouvait déclarer ce savoir-faire
  // acquis sur AUCUN triplet de réussites. Voir
  // `CHOIX_LA_LAMPE_DU_BOUT_DE_LA_VITRINE`, qui porte la démonstration et le prix
  // payé.
  {
    id: 'ch02-sf5-e06-prediction-la-lampe-du-bout-de-la-vitrine',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'B',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'prediction-engagee',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'le-bandeau-lumineux-d-une-vitrine-vu-de-loin',
    enonce:
      'Dans la vitrine d’un magasin, trois lampes identiques sont montées côte à côte sur la même '
      + 'paire de fils, chacune reliée aux deux mêmes points, et alimentées par un bloc de '
      + '{{donnee:alimentation}}. La première est tout près du bloc, la troisième à l’autre bout de '
      + 'la vitrine. Un technicien mesure la tension aux bornes de la première : {{donnee:uPremiere}}. '
      + 'Avant de lire la suite, dis ce que le voltmètre affichera aux bornes de la troisième, tout '
      + 'au bout. Ta réponse est verrouillée dès que tu la valides.',
    donnees: {
      alimentation: { valeur: [12, 1], unite: 'V' },
      uPremiere: { valeur: [12, 1], unite: 'V' },
    },
    reponse: { objetFormel: CHOIX_LA_LAMPE_DU_BOUT_DE_LA_VITRINE },
    piege: 'reponse-conforme-sans-adhesion',
    situation: {
      paire: {
        restitution: 'ch02-sf5-e03-double-qcm-que-dit-la-loi',
        prediction: 'ch02-sf5-e06-prediction-la-lampe-du-bout-de-la-vitrine',
      },
      roleDeCetItem: 'prediction',
      memeEcran: false,
      itemsIntercales: 2,
    },
    dispositifServi: 'tes-deux-reponses-cote-a-cote',
    estFormatDiagnostique: true,
    motifFormatDiagnostique:
      'Le format que le piège demande est une PAIRE, et la voici : `e03` est l’item de restitution — '
      + 'double QCM, réponse ET justification, servi en début de séance —, celui-ci est l’item de '
      + 'prédiction sur une situation concrète portant sur la MÊME loi. Le contexte imposé est tenu : '
      + 'les deux ne sont jamais sur le même écran (`memeEcran: false`) et deux items les séparent '
      + '(`itemsIntercales: 2`). Le décor est délibérément éloigné de celui de `e03` — une vitrine, pas '
      + 'une paillasse — et l’énoncé ne rappelle nulle part la loi d’unicité : c’est la condition pour '
      + 'que l’élève réponde ce qu’il PENSE et non ce qu’il vient d’écrire. La conception se lit dans '
      + 'l’écart entre les deux réponses, jamais dans l’une des deux prise seule. La prédiction est '
      + 'ici un choix raisonné et non un nombre libre : l’engagement y est plus faible, l’élève '
      + 'conforme reconnaissant la phrase du cours au lieu d’avoir à la produire, et c’est la '
      + 'contrepartie assumée d’un savoir-faire qui, sans cela, ne pouvait jamais être déclaré acquis.',
  },

  // ── e07 — palier 3 · classe A · cercle 1 · on AJOUTE une lampe ───────────
  //
  // Palier 3, dimension `sens-du-changement` : ce qui varie n’est plus le
  // support ni la grandeur, c’est qu’on MODIFIE le circuit et qu’on demande
  // l’effet de la modification. Contre-intuitif par construction : ajouter une
  // troisième lampe en dérivation ne change rien à la tension aux bornes de la
  // première, et l’écart entre la prévision de l’élève et la mesure est le nombre
  // demandé.
  {
    id: 'ch02-sf5-e07-on-ajoute-une-troisieme-lampe',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'sens-du-changement',
    contexteDeSurface: 'une-lampe-de-plus-sur-la-meme-paire-de-points',
    enonce:
      'Deux lampes sont branchées en dérivation sur une pile ; le voltmètre aux bornes de L1 affiche '
      + '{{donnee:uMesure}}. On ajoute une troisième lampe, reliée aux deux mêmes points. Un élève '
      + 'prévoit que le voltmètre aux bornes de L1 va tomber à {{donnee:uAnnonce}}. On regarde : il '
      + 'affiche toujours {{donnee:uMesure}}. De combien la prévision de l’élève s’écarte-t-elle de la '
      + 'mesure ? Donne l’écart avec son unité.',
    donnees: {
      uMesure: { valeur: [45, 10], unite: 'V' },
      uAnnonce: { valeur: [30, 10], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'ecart', expr: '@uMesure − @uAnnonce', unite: 'V' }],
      reponse: 'ecart',
    },
    reponse: { valeur: [15, 10], unite: 'V', semantique: 'exacte' },
  },

  // ── e08 — palier 3 · classe A · cercle 1 · l’inscription du dipôle ───────
  //
  // La loi sert ici à savoir CE QUE REÇOIT un dipôle dont on n’a pas mesuré la
  // tension, puis à le comparer à ce qui est écrit dessus. La comparaison à
  // l’inscription est le savoir-faire `ch02-sf7` et il est cité comme sollicité :
  // ce qui est évalué ici reste l’usage de la loi, sans quoi une réussite serait
  // portée au crédit d’un savoir-faire que l’item ne travaille pas.
  {
    id: 'ch02-sf5-e08-la-lampe-marquee-3-5-volts',
    sfPrincipal: SF,
    sfSollicites: ['ch02-sf7-verifier-l-adaptation-d-une-lampe'],
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 3,
    registre: 'symbolique',
    type: 'schema-circuit',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'une-lampe-dont-le-culot-porte-une-inscription',
    enonce:
      'Sur ce montage, le voltmètre est branché entre les deux points que L1 et L2 partagent, et il '
      + 'affiche {{donnee:uLue}}. La lampe L1 porte sur son culot l’inscription '
      + '{{donnee:uInscription}}. De combien la tension que reçoit L1 dépasse-t-elle son '
      + 'inscription ? Donne l’écart avec son unité.',
    figure: {
      sorte: 'circuit',
      circuit: CIRCUIT_DEUX_LAMPES_EN_DERIVATION,
      titre: 'L1 et L2 entre les deux mêmes points, avec un voltmètre sur ces deux points',
    },
    donnees: {
      uLue: { valeur: [45, 10], unite: 'V' },
      uInscription: { valeur: [35, 10], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'depassement', expr: '@uLue − @uInscription', unite: 'V' }],
      reponse: 'depassement',
    },
    reponse: { valeur: [1, 1], unite: 'V', semantique: 'exacte' },
  },

  // ── e09 — palier 4 · classe B · cercle 0 · la réciproque, qui est fausse ─
  //
  // Palier non étiqueté : rien ne dit à l’élève qu’on parle de la loi d’unicité,
  // et la loi ne suffit d’ailleurs pas — c’est sa RÉCIPROQUE qui est en jeu, et
  // elle est fausse. L’élève qui a retenu « en dérivation ⇒ tensions égales » et
  // qui le retourne tombe juste une fois sur deux, ce qui est la pire des
  // situations : il ne s’aperçoit jamais qu’il se trompe.
  {
    id: 'ch02-sf5-e09-deux-afficheurs-d-accord-est-ce-une-derivation',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'deux-afficheurs-qui-tombent-d-accord',
    enonce:
      'Un binôme a monté deux lampes et deux voltmètres sans dire comment. Les deux afficheurs '
      + 'indiquent exactement la même valeur. Le binôme en conclut : « les deux lampes sont donc en '
      + 'dérivation ». A-t-il le droit de conclure cela ?',
    reponse: { objetFormel: CHOIX_RECIPROQUE_DE_LA_LOI },
  },

  // ── e10 — palier 4 · classe A · cercle 1 · l’écart qui n’aurait pas dû ───
  //
  // Trois lectures annoncées « en dérivation », dont une s’écarte de 1,8 V.
  // L’écart n’est pas un défaut de mesure : c’est un diagnostic, et le nombre
  // demandé est ce qui le rend opposable. Le distracteur est le piège du
  // savoir-faire pris par son autre bout : l’élève qui RÉCITE la loi répond zéro
  // sans regarder les lectures, et le modèle qui produit ce zéro s’exécute.
  {
    id: 'ch02-sf5-e10-trois-lectures-dont-une-decroche',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'trois-binomes-trois-voltmetres',
    enonce:
      'Trois binômes annoncent avoir branché trois lampes en dérivation, aux deux mêmes points, et '
      + 'avoir posé un voltmètre sur chacune. Ils lisent {{donnee:u1}}, {{donnee:u2}} et '
      + '{{donnee:u3}}. De combien la troisième lecture s’écarte-t-elle des deux autres ? Donne '
      + 'l’écart avec son unité.',
    donnees: {
      u1: { valeur: [45, 10], unite: 'V' },
      u2: { valeur: [45, 10], unite: 'V' },
      u3: { valeur: [27, 10], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'ecart', expr: '@u1 − @u3', unite: 'V' }],
      reponse: 'ecart',
    },
    reponse: { valeur: [18, 10], unite: 'V', semantique: 'exacte' },
    distracteurs: [
      // ⚠ Portait `reponse-conforme-sans-adhesion`, et c'était le piège pris par
      // le mauvais bout — pas « par son autre bout », comme une rédaction
      // antérieure de l'en-tête le soutenait.
      //
      // Ce piège décrit l'élève qui DIT la loi sans y croire. Celui-ci y croit
      // trop : il la fait taire les mesures. Il n'y a chez lui aucun écart entre
      // ce qu'il écrit et ce qu'il pense — et le piège dit lui-même que sa
      // conception « se lit dans l'ÉCART entre les deux [items], jamais dans l'un
      // des deux pris seul » : un distracteur seul ne peut donc pas la
      // diagnostiquer, par construction.
      //
      // Pire, servie à cet élève-là, sa `regle` l'approuve : « quand une loi de
      // physique et une impression se contredisent, c'est l'impression qui
      // perd », et son `controle` lui dicte sa réponse fausse : « si l'exercice
      // t'oblige à n'en donner qu'une, donne celle de la loi ». C'est le défaut
      // que `pieges/index.js` nomme le plus discret du projet — un contrôle qui
      // CONFIRME la réponse fausse.
      //
      // `valeur-aberrante-d-une-serie-non-reperee` la réfute des deux côtés. Sa
      // `regle` : une mesure qui sort franchement du lot se SIGNALE, et « on
      // n'écarte jamais une mesure parce qu'elle est gênante » — or répondre zéro,
      // c'est écarter la troisième lecture en silence. Son `controle` est
      // exactement le geste qui manque : « avant de calculer quoi que ce soit,
      // range les mesures dans l'ordre et regarde les écarts entre voisines »,
      // c'est-à-dire REGARDE-LES.
      //
      // Réserve honnête : la `conditionValidite` de ce piège exige cinq mesures
      // pour un item qui le DÉCLARE, et il n'y en a que trois ici. Elle n'est pas
      // évaluée sur un distracteur — aucun item de ce fichier ne déclare ce piège
      // — mais la borne est celle de son auteur, et le vivier de re-confrontation
      // reste celui du chapitre 1.
      {
        id: 'la-loi-dit-zero-donc-zero',
        valeur: [0, 1],
        unite: 'V',
        texte: 'Zéro : elles sont en dérivation, donc les trois tensions sont égales.',
        piege: 'valeur-aberrante-d-une-serie-non-reperee',
        modeleErrone: {
          id: 'reciter-la-loi-au-lieu-de-lire-les-mesures',
          nom: 'modèle « la loi a réponse à tout » : on rend l’écart que la loi annonce, sans regarder la troisième lecture',
          calcul: {
            etapes: [{ id: 'ecartAnnonce', expr: '@u1 − @u2', unite: 'V' }],
            reponse: 'ecartAnnonce',
          },
        },
      },
    ],
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════
// PROBLÈMES — 5 items
// ════════════════════════════════════════════════════════════════════════════

export const PROBLEMES = Object.freeze([

  // ── p01 — palier 2 · classe A · cercle 3 · lire la topologie sur le dessin
  //
  // Un des deux seuls items de cercle 3 du fichier, et il l’est pour une raison
  // précise : la lampe et le moteur sont dessinés sur DEUX PISTES différentes —
  // `schema.js` empile les branches en dérivation — et la première tâche est de
  // voir, sur le dessin, qu’ils partagent leurs deux points. Un élève qui lit
  // « l’un au-dessus de l’autre, donc l’un après l’autre » n’applique pas la loi.
  {
    id: 'ch02-sf5-p01-la-lampe-et-le-moteur',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 3,
    palier: 2,
    registre: 'macro',
    type: 'schema-circuit',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'une-lampe-et-un-moteur-sur-le-meme-montage',
    enonce:
      'Voici le montage : une lampe et un petit moteur. On pose un voltmètre aux bornes de la '
      + 'lampe : il affiche {{donnee:uLampe}}. On le déplace aux bornes du moteur : il affiche '
      + '{{donnee:uMoteur}}. Quel est l’écart entre les deux lectures ? Donne-le avec son unité.',
    figure: {
      sorte: 'circuit',
      circuit: CIRCUIT_LAMPE_ET_MOTEUR,
      titre: 'Une lampe et un moteur entre les deux mêmes points',
    },
    donnees: {
      uLampe: { valeur: [60, 10], unite: 'V' },
      uMoteur: { valeur: [58, 10], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'ecart', expr: '@uLampe − @uMoteur', unite: 'V' }],
      reponse: 'ecart',
    },
    reponse: { valeur: [2, 10], unite: 'V', semantique: 'exacte' },
  },

  // ── p02 — palier 1 · classe C · cercle 0 · RESTITUTION de la paire 2 ─────
  //
  // Même remarque qu’en `e03` : aucun `piege`, parce que le prédicat du
  // catalogue ne se déclenche que sur la prédiction. Le décor change — un moteur
  // au lieu d’une seconde lampe —, la loi est la même, et c’est ce que la
  // condition de validité exige de la paire.
  {
    id: 'ch02-sf5-p02-double-qcm-la-lampe-et-le-moteur',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 1,
    registre: 'macro',
    type: 'double-qcm',
    contexteDeSurface: 'un-moteur-qui-demande-plus-que-la-lampe',
    enonce:
      'Une lampe et un moteur sont branchés en dérivation, reliés aux deux mêmes points d’un même '
      + 'circuit. Que peut-on dire de la tension aux bornes de la lampe et de la tension aux bornes '
      + 'du moteur ? Puis choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'les-deux-tensions-sont-egales',
      choixPossibles: [
        'les-deux-tensions-sont-egales',
        'le-moteur-a-la-plus-grande-tension',
        'la-lampe-a-la-plus-grande-tension',
        'on-ne-peut-pas-le-savoir-sans-mesurer',
      ],
    },
    justifications: [
      {
        id: 'la-nature-du-dipole-ne-change-rien',
        texte:
          'La loi d’unicité ne parle pas de ce que fait le dipôle, elle parle de l’endroit où il est '
          + 'branché : mêmes deux points, même tension, que ce soit une lampe, un moteur ou autre '
          + 'chose.',
        juste: true,
        provenance: 'locale',
      },
      {
        id: 'le-moteur-en-demande-plus',
        texte:
          'Un moteur, ça demande plus qu’une petite lampe pour tourner : il faut bien qu’il reçoive '
          + 'une plus grande tension.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'je-recite-mais-je-n-y-crois-pas',
        texte:
          'Il faut répondre qu’elles sont égales, c’est la leçon. Mais franchement, sur une vraie '
          + 'paillasse, je ne crois pas que ça se passe comme ça.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « reponse-conforme-sans-adhesion », raisonnement « je-l-ai-appris-sans-y-croire » — '
          + 'js/data/pieges/contrat.js',
        piege: 'reponse-conforme-sans-adhesion',
      },
      {
        id: 'il-faudrait-mesurer-pour-savoir',
        texte:
          'On ne peut rien dire tant qu’on n’a pas branché les deux voltmètres : chaque montage est '
          + 'un cas particulier.',
        juste: false,
        provenance: 'locale',
      },
    ],
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: '7d718cdeb0a4c4b7' },
  },

  // ── p03 — palier 3 · classe A · cercle 1 · trois lectures, deux unités ───
  //
  // La grandeur en jeu change : ce ne sont plus deux lectures mais trois, et
  // elles ne sont pas écrites dans la même unité. L’algèbre des unités fait le
  // travail dans la chaîne de l’auteur ; le modèle erroné fait celui de l’élève
  // qui moyenne les nombres tels qu’ils s’affichent, et il sort très loin de la
  // fenêtre.
  {
    id: 'ch02-sf5-p03-trois-lectures-en-millivolts-et-en-volts',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'trois-appareils-regles-sur-des-calibres-differents',
    enonce:
      'Trois voltmètres sont branchés aux bornes de trois lampes reliées aux deux mêmes points. Ils '
      + 'ne sont pas réglés sur le même calibre : le premier affiche {{donnee:ua}}, le deuxième '
      + '{{donnee:ub}}, le troisième {{donnee:uc}}. La loi d’unicité dit que ces trois tensions sont '
      + 'égales. Quelle valeur retiens-tu, avec son unité ?',
    donnees: {
      ua: { valeur: [4400, 1], unite: 'mV' },
      ub: { valeur: [45, 10], unite: 'V' },
      uc: { valeur: [4600, 1], unite: 'mV' },
    },
    calcul: {
      etapes: [
        { id: 'somme', expr: '@ua + @ub + @uc', unite: 'V' },
        { id: 'moyenne', expr: '#somme ÷ 3', unite: 'V' },
      ],
      reponse: 'moyenne',
    },
    reponse: { valeur: [45, 10], unite: 'V', semantique: 'exacte' },
    distracteurs: [
      {
        // Même réattribution qu'en `e04`, et pour la même raison : l'unité rendue
        // est la bonne, c'est la conversion qui manque, et seul
        // `valeur-invraisemblable-non-critiquee` réfute 3 001,5 V aux bornes
        // d'une lampe.
        id: 'moyenne-des-nombres-affiches',
        valeur: [30015, 10],
        unite: 'V',
        texte: 'Je fais la moyenne des trois nombres affichés.',
        piege: 'valeur-invraisemblable-non-critiquee',
        modeleErrone: {
          id: 'moyenner-les-nombres-pas-les-grandeurs',
          nom: 'modèle « le nombre affiché est la grandeur » : on moyenne 4 400, 4,5 et 4 600',
          calcul: {
            etapes: [
              { id: 'sommeBrute', expr: '@ua × 1000 + @ub + @uc × 1000', unite: 'V' },
              { id: 'moyenneBrute', expr: '#sommeBrute ÷ 3', unite: 'V' },
            ],
            reponse: 'moyenneBrute',
          },
        },
      },
    ],
  },

  // ── p04 — palier 3 · classe C · cercle 1 · PRÉDICTION de la paire 2 ──────
  //
  // Dimension `objet-support`, DISTINCTE de celle de `e06` (`mode-de-reponse`) :
  // sans deux dimensions distinctes aux paliers 2 et 3 d’un même piège, le refus
  // MEME_DIMENSION_AUX_DEUX_PALIERS n’aurait rien à mordre et la difficulté
  // croîtrait sans que rien de neuf ne varie. Ici ce qui change est le support de
  // la situation : un objet de la vie courante, pas un montage de paillasse.
  {
    id: 'ch02-sf5-p04-prediction-les-deux-phares-du-velo',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'prediction-engagee',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'le-phare-avant-et-le-feu-arriere-d-un-velo',
    enonce:
      'Sur un vélo, la dynamo alimente deux lampes reliées aux deux mêmes points : un gros phare '
      + 'blanc à l’avant et un petit feu rouge à l’arrière, au bout de deux mètres de fil. Un '
      + 'voltmètre placé aux bornes du phare avant affiche {{donnee:uAvant}}. Avant de lire la suite, '
      + 'écris ce qu’affichera un voltmètre placé aux bornes du feu arrière. Ta réponse est '
      + 'verrouillée dès que tu la valides.',
    donnees: { uAvant: { valeur: [60, 10], unite: 'V' } },
    reponse: { valeur: [60, 10], unite: 'V', semantique: 'exacte' },
    piege: 'reponse-conforme-sans-adhesion',
    situation: {
      paire: {
        restitution: 'ch02-sf5-p02-double-qcm-la-lampe-et-le-moteur',
        prediction: 'ch02-sf5-p04-prediction-les-deux-phares-du-velo',
      },
      roleDeCetItem: 'prediction',
      memeEcran: false,
      itemsIntercales: 3,
    },
    dispositifServi: 'tes-deux-reponses-cote-a-cote',
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: 'efeb2c09aa00c3ba' },
  },

  // ── p05 — palier 4 · classe B · cercle 2 · l’écart s’explique ────────────
  //
  // Palier non étiqueté : la première tâche est de RECONNAÎTRE de quoi il s’agit.
  // Trois lectures, une qui décroche de 1,8 V. Ce n’est ni un défaut de mesure —
  // deux dixièmes, oui ; presque deux volts, non — ni une limite de la loi.
  // La bonne réponse mobilise `ch02-sf3` sans le faire faire : elle dit qu’un
  // appareil est mal posé, elle ne demande pas de le reposer.
  {
    id: 'ch02-sf5-p05-pourquoi-la-troisieme-lecture-decroche',
    sfPrincipal: SF,
    sfSollicites: ['ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication'],
    chapitre: CH,
    programme: '2020',
    classe: 'B',
    cercle: 2,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'un-compte-rendu-de-tp-avec-trois-releves',
    enonce:
      'Un compte rendu de travaux pratiques indique : « trois lampes branchées en dérivation, aux '
      + 'deux mêmes points ; tensions relevées : 4,5 V, 4,5 V et 2,7 V ». Le binôme conclut que la '
      + 'troisième mesure est « un peu moins précise ». Quelle explication tient vraiment ?',
    reponse: { objetFormel: CHOIX_EXPLICATION_DE_L_ECART },
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════
// TEST — 10 items
// ════════════════════════════════════════════════════════════════════════════
//
// Aucun item du test ne recopie un item d’entraînement, valeurs comprises : les
// tensions servies ici sont 3,8 · 5,9 · 6,1 · 6,0 · 3 400 mV · 3,4 · 3,0 · 4,8 ·
// 2,5 · 3,6 · 230 V, et aucun couple (données, réponse) de ce bloc ne figure
// au-dessus. Deux items en avaient d’abord partagé un avec l’entraînement — la
// prédiction à 230 V de `t09`, que `e06` servait aussi, et l’inscription lue à
// 4,5 V de `t07`, qui était celle de `e08` : `e06` est passé à un bandeau de
// vitrine sous 12 V, et `t07` à 4,8 V.

export const TEST = Object.freeze([

  // ── t01 — palier 1 · classe B · cercle 1 ────────────────────────────────
  {
    id: 'ch02-sf5-t01-la-lampe-et-le-moteur-du-jouet',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'B',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'le-jouet-a-moteur-et-a-lampe',
    enonce:
      'Dans un jouet, une lampe et un moteur sont reliés aux deux mêmes points, alimentés par la '
      + 'même pile. Un voltmètre branché aux bornes du moteur affiche {{donnee:uMoteur}}. Que va '
      + 'afficher un voltmètre branché aux bornes de la lampe ?',
    donnees: { uMoteur: { valeur: [38, 10], unite: 'V' } },
    reponse: { objetFormel: CHOIX_LA_LAMPE_ET_LE_MOTEUR },
  },

  // ── t02 — palier 1 · classe A · cercle 1 ────────────────────────────────
  {
    id: 'ch02-sf5-t02-deux-lectures-a-retenir-en-une',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'deux-voltmetres-sur-une-meme-paire-de-points',
    enonce:
      'Deux dipôles sont branchés en dérivation, reliés aux deux mêmes points. Le premier voltmètre '
      + 'affiche {{donnee:ua}}, le second {{donnee:ub}}. La loi d’unicité dit que ces deux tensions '
      + 'sont égales. Quelle valeur retiens-tu, avec son unité ?',
    donnees: {
      ua: { valeur: [59, 10], unite: 'V' },
      ub: { valeur: [61, 10], unite: 'V' },
    },
    calcul: {
      etapes: [
        { id: 'somme', expr: '@ua + @ub', unite: 'V' },
        { id: 'moyenne', expr: '#somme ÷ 2', unite: 'V' },
      ],
      reponse: 'moyenne',
    },
    reponse: { valeur: [6, 1], unite: 'V', semantique: 'exacte' },
  },

  // ── t03 — palier 2 · classe A · cercle 1 · la branche entière ────────────
  //
  // Le seul item du fichier où la loi porte sur un ENSEMBLE de dipôles : L1 et
  // L2 en série dans une branche, L3 en dérivation sur cette branche.
  //
  // ⚠ Ce commentaire citait `enDerivationAuxBornesDe(V, ['L1', 'L2'])` comme
  // valant vrai « d’après circuit.js ». Il n’y a AUCUN voltmètre sur ce graphe —
  // la déclaration de `CIRCUIT_BRANCHE_DE_DEUX_LAMPES` le dit d’ailleurs elle-même
  // —, et l’appel rend `null`, pas `true` : un identifiant inconnu n’est pas une
  // réponse. Ce que `circuit.js` établit réellement ici, et qui est la propriété
  // dont l’item a besoin, c’est `enDerivationAuxBornesDe(circuit, 'L3',
  // ['L1', 'L2']) === true` : L3 et la branche {L1, L2} ont bien les mêmes deux
  // points. Une invocation fausse du vérificateur dans un fichier écrit CONTRE le
  // vérificateur est exactement ce qu’une relecture doit attraper.
  {
    id: 'ch02-sf5-t03-aux-bornes-de-l-ensemble',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'symbolique',
    type: 'schema-circuit',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'un-voltmetre-pose-sur-deux-lampes-a-la-fois',
    enonce:
      'Voici le montage. On mesure d’abord la tension aux bornes de l’ENSEMBLE formé par L1 et L2 : '
      + '{{donnee:uEnsemble}}. On mesure ensuite la tension aux bornes de L3 : {{donnee:uL3}}. Quel '
      + 'est l’écart entre ces deux tensions ? Donne-le avec son unité.',
    figure: {
      sorte: 'circuit',
      circuit: CIRCUIT_BRANCHE_DE_DEUX_LAMPES,
      titre: 'L1 et L2 en série dans une branche, L3 dans l’autre',
    },
    donnees: {
      uEnsemble: { valeur: [3400, 1], unite: 'mV' },
      uL3: { valeur: [34, 10], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'ecart', expr: '@uEnsemble − @uL3', unite: 'V' }],
      reponse: 'ecart',
    },
    reponse: { valeur: [0, 1], unite: 'V', semantique: 'exacte' },
    distracteurs: [
      {
        // Même réattribution qu'en `e04` et `p03` : 3 396,6 V est un nombre
        // impossible dans le monde décrit, pas une unité de mauvaise nature.
        id: 'ecart-des-nombres-sans-conversion',
        valeur: [33966, 10],
        unite: 'V',
        texte: 'Je soustrais les deux nombres tels qu’ils sont affichés.',
        piege: 'valeur-invraisemblable-non-critiquee',
        modeleErrone: {
          id: 'soustraire-les-nombres-pas-les-grandeurs',
          nom: 'modèle « le nombre affiché est la grandeur » : on soustrait 3,4 de 3 400',
          calcul: {
            etapes: [{ id: 'brut', expr: '@uEnsemble × 1000 − @uL3', unite: 'V' }],
            reponse: 'brut',
          },
        },
      },
    ],
  },

  // ── t04 — palier 1 · classe C · cercle 0 · RESTITUTION de la paire 3 ─────
  {
    id: 'ch02-sf5-t04-double-qcm-l-ensemble-et-la-troisieme',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 1,
    registre: 'macro',
    type: 'double-qcm',
    contexteDeSurface: 'deux-lampes-d-un-cote-une-de-l-autre',
    enonce:
      'Une branche contient deux lampes montées l’une derrière l’autre. Une troisième lampe est '
      + 'branchée en dérivation sur cette branche : les deux extrémités de la branche et les deux '
      + 'bornes de la troisième lampe sont les mêmes points. Que peut-on dire de la tension aux '
      + 'bornes de l’ensemble des deux lampes et de la tension aux bornes de la troisième ? Puis '
      + 'choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'la-tension-aux-bornes-de-l-ensemble-est-la-meme',
      choixPossibles: [
        'la-tension-aux-bornes-de-l-ensemble-est-la-meme',
        'la-tension-aux-bornes-de-l-ensemble-est-double',
        'la-tension-aux-bornes-de-l-ensemble-est-la-moitie',
        'on-ne-peut-pas-le-savoir-sans-mesurer',
      ],
    },
    justifications: [
      {
        id: 'ce-qui-compte-ce-sont-les-extremites',
        texte:
          'Ce qui compte n’est pas le nombre de lampes, ce sont les deux points aux extrémités. La '
          + 'branche et la troisième lampe ont les mêmes deux points : même tension.',
        juste: true,
        provenance: 'locale',
      },
      {
        id: 'deux-lampes-donc-deux-fois-plus',
        texte:
          'Il y a deux lampes d’un côté et une seule de l’autre : la branche des deux lampes doit '
          + 'porter deux fois plus de tension.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'la-loi-ne-vaut-que-pour-des-dipoles-seuls',
        texte:
          'La loi d’unicité s’écrit pour deux dipôles, pas pour un groupe : ici on ne peut pas '
          + 's’en servir.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'je-donne-la-reponse-attendue',
        texte:
          'Je réponds « la même », c’est ce qu’on attend dans ce chapitre. Ce que je pense vraiment '
          + 'de ce montage-là, on ne me le demande pas.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « reponse-conforme-sans-adhesion », raisonnement « c-est-ce-qu-il-faut-repondre » — '
          + 'js/data/pieges/contrat.js',
        piege: 'reponse-conforme-sans-adhesion',
      },
    ],
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: '7123b5195a7828e1' },
  },

  // ── t05 — palier 2 · classe B · cercle 2 ────────────────────────────────
  {
    id: 'ch02-sf5-t05-quel-montage-tranche-sur-la-distance',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'B',
    cercle: 2,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'le-desaccord-sur-la-distance-a-la-pile',
    enonce:
      'Un élève soutient que « plus un dipôle est loin de la pile, plus la tension à ses bornes est '
      + 'petite ». On dispose d’une pile, de fils de différentes longueurs, de voltmètres, de lampes '
      + 'identiques et d’une grosse lampe. Quel montage permet de mettre cette affirmation à '
      + 'l’épreuve ?',
    reponse: { objetFormel: CHOIX_MONTAGE_QUI_TRANCHE_SUR_LA_DISTANCE },
  },

  // ── t06 — palier 3 · classe A · cercle 1 ────────────────────────────────
  {
    id: 'ch02-sf5-t06-on-retire-une-lampe-de-la-derivation',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'sens-du-changement',
    contexteDeSurface: 'une-lampe-devissee-de-son-support',
    enonce:
      'Deux lampes sont branchées en dérivation, reliées aux deux mêmes points ; le voltmètre aux '
      + 'bornes de L1 affiche {{donnee:uMesure}}. On dévisse L2 et on la retire. Un élève prévoit que '
      + 'le voltmètre aux bornes de L1 va tomber à {{donnee:uPrevu}}, « puisqu’il n’y a plus qu’une '
      + 'lampe à alimenter ». On regarde : il affiche toujours {{donnee:uMesure}}. De combien sa '
      + 'prévision s’écarte-t-elle de la mesure ? Donne l’écart avec son unité.',
    donnees: {
      uMesure: { valeur: [60, 10], unite: 'V' },
      uPrevu: { valeur: [30, 10], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'ecart', expr: '@uMesure − @uPrevu', unite: 'V' }],
      reponse: 'ecart',
    },
    reponse: { valeur: [3, 1], unite: 'V', semantique: 'exacte' },
  },

  // ── t07 — palier 3 · classe A · cercle 1 · l’inscription, sur un schéma ──
  //
  // ⚠ Son énoncé ouvrait sur la phrase de `e08`, mot pour mot (« Sur ce montage,
  // le voltmètre est branché entre les deux points que L1 et L2 partagent, et il
  // affiche… »). L’en-tête ne promet la non-recopie que des VALEURS, et les
  // valeurs diffèrent bien ; mais un item d’auto-évaluation qui rouvre sur la
  // phrase exacte d’un item d’entraînement se reconnaît avant d’être lu, et ce
  // qu’il mesure alors est le souvenir de l’autre. La tâche reste
  // volontairement parallèle — c’est ce qu’un test doit faire —, la phrase non.
  {
    id: 'ch02-sf5-t07-la-lampe-marquee-2-5-volts',
    sfPrincipal: SF,
    sfSollicites: ['ch02-sf7-verifier-l-adaptation-d-une-lampe'],
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 3,
    registre: 'symbolique',
    type: 'schema-circuit',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'une-lampe-de-rechange-prise-dans-le-mauvais-tiroir',
    enonce:
      'On a dévissé L1 et on la remplace par une lampe prise dans un autre tiroir, dont le culot '
      + 'porte l’inscription {{donnee:uInscription}}. Le voltmètre du montage, posé sur les deux '
      + 'points communs aux deux lampes, indiquait {{donnee:uLue}} avant l’échange et indique la même '
      + 'chose après. De combien la tension que reçoit la lampe de rechange dépasse-t-elle son '
      + 'inscription ? Donne l’écart avec son unité.',
    figure: {
      sorte: 'circuit',
      circuit: CIRCUIT_DEUX_LAMPES_EN_DERIVATION,
      titre: 'L1 et L2 entre les deux mêmes points, avec un voltmètre sur ces deux points',
    },
    donnees: {
      uLue: { valeur: [48, 10], unite: 'V' },
      uInscription: { valeur: [25, 10], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'depassement', expr: '@uLue − @uInscription', unite: 'V' }],
      reponse: 'depassement',
    },
    reponse: { valeur: [23, 10], unite: 'V', semantique: 'exacte' },
  },

  // ── t08 — palier 4 · classe B · cercle 0 · où la loi s’applique ──────────
  //
  // Palier non étiqueté : le circuit mixte est décrit en toutes lettres — la
  // classe B interdit la figure —, et la seule tâche est de désigner le couple
  // sur lequel la loi porte. « Dans le même circuit » ne suffit pas ; « qui se
  // suivent » est l’erreur symétrique.
  {
    id: 'ch02-sf5-t08-sur-quel-couple-la-loi-porte',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'un-montage-decrit-sans-schema',
    enonce:
      'Une pile alimente une lampe L1. À la sortie de L1, le circuit se sépare en deux : L2 d’un '
      + 'côté, L3 de l’autre, et les deux se rejoignent avant de revenir à la pile. L2 et L3 sont '
      + 'donc reliées aux deux mêmes points. Sur quel couple de dipôles la loi d’unicité des tensions '
      + 's’applique-t-elle ?',
    reponse: { objetFormel: CHOIX_SUR_QUEL_COUPLE },
  },

  // ── t09 — palier 4 · classe C · cercle 1 · PRÉDICTION de la paire 3 ──────
  //
  // Le palier non étiqueté du piège, celui où le critère de maîtrise l’attend :
  // rien ne dit à l’élève de quelle loi on parle, et la situation est celle où
  // l’intuition du partage est la plus forte — une multiprise, où l’on branche
  // « de plus en plus d’appareils ». Aucun `dispositifServi` ici : les deux
  // constats du piège sont servis par `e06` et `p04`, et le cycle de variation se
  // refermerait trop tôt si le troisième les rejouait.
  {
    id: 'ch02-sf5-t09-prediction-la-multiprise',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'prediction-engagee',
    contexteDeSurface: 'la-multiprise-du-salon',
    enonce:
      'Dans un salon, une multiprise relie chaque appareil aux deux mêmes points de l’installation. '
      + 'Une lampe y est branchée seule : un voltmètre à ses bornes indique {{donnee:uSeule}}. On '
      + 'branche ensuite quatre autres appareils sur la même multiprise. Avant de lire la suite, '
      + 'écris ce que le voltmètre indiquera alors aux bornes de la lampe. Ta réponse est verrouillée '
      + 'dès que tu la valides.',
    donnees: { uSeule: { valeur: [230, 1], unite: 'V' } },
    reponse: { valeur: [230, 1], unite: 'V', semantique: 'exacte' },
    piege: 'reponse-conforme-sans-adhesion',
    situation: {
      paire: {
        restitution: 'ch02-sf5-t04-double-qcm-l-ensemble-et-la-troisieme',
        prediction: 'ch02-sf5-t09-prediction-la-multiprise',
      },
      roleDeCetItem: 'prediction',
      memeEcran: false,
      itemsIntercales: 4,
    },
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: 'bef1067b52ae9ff0' },
  },

  // ── t10 — palier 4 · classe A · cercle 3 · lire avant de calculer ───────
  //
  // Le second des deux items de cercle 3, et le plus exigeant du fichier : trois
  // lampes sont bien en dérivation sur le schéma, les deux premières lectures
  // s’accordent, la troisième décroche de 2,4 V. Le nombre demandé est l’écart ;
  // ce qui est évalué est d’avoir REGARDÉ les lectures au lieu d’avoir récité la
  // loi — et le distracteur est exactement l’élève qui a récité.
  //
  // ⚠ L’énoncé disait « il note trois tensions, une par lampe ». Sur un item
  // MUNI D’UNE FIGURE, cette formulation était une seconde lecture ouverte : le
  // graphe est la source de vérité (invariant 6), il montre trois lampes
  // réellement en dérivation, et la loi y impose donc trois tensions égales. Un
  // élève qui raisonnait JUSTE sur le schéma — « le dessin dit dérivation, donc
  // zéro » — était compté faux pour avoir bien lu la figure du chapitre qui
  // apprend à lire les figures. `e10` s’en tirait par sa formulation (« trois
  // binômes ANNONCENT avoir branché »), pas celui-ci. L’énoncé dit maintenant que
  // les trois nombres sont ce que les appareils ont AFFICHÉ, et l’item redevient
  // ce qu’il prétendait être : une confrontation de la loi aux mesures.
  {
    id: 'ch02-sf5-t10-trois-lampes-et-une-lecture-qui-decroche',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 3,
    palier: 4,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'trois-lampes-et-trois-releves-au-tableau',
    enonce:
      'Voici le montage. Un binôme y a posé trois voltmètres, un par lampe, et recopie sur son '
      + 'compte rendu ce que les trois appareils ont AFFICHÉ : {{donnee:u1}} aux bornes de L1, '
      + '{{donnee:u2}} aux bornes de L2, {{donnee:u3}} aux bornes de L3. Ce sont trois lectures, pas '
      + 'trois valeurs calculées. De combien la troisième s’écarte-t-elle des deux autres ? Donne '
      + 'l’écart avec son unité.',
    figure: {
      sorte: 'circuit',
      circuit: CIRCUIT_TROIS_LAMPES_EN_DERIVATION,
      titre: 'Trois lampes entre les deux mêmes points',
    },
    donnees: {
      u1: { valeur: [60, 10], unite: 'V' },
      u2: { valeur: [60, 10], unite: 'V' },
      u3: { valeur: [36, 10], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'ecart', expr: '@u1 − @u3', unite: 'V' }],
      reponse: 'ecart',
    },
    reponse: { valeur: [24, 10], unite: 'V', semantique: 'exacte' },
    distracteurs: [
      {
        // Même réattribution qu'en `e10`, et elle mord plus fort encore ici : le
        // schéma dit vrai, c'est bien une dérivation, et c'est justement pour
        // cela que la troisième LECTURE doit être signalée au lieu d'être
        // remplacée par ce que la loi annonce.
        id: 'la-loi-dit-zero-donc-zero',
        valeur: [0, 1],
        unite: 'V',
        texte: 'Zéro : le schéma montre trois lampes en dérivation, donc les trois tensions sont égales.',
        piege: 'valeur-aberrante-d-une-serie-non-reperee',
        modeleErrone: {
          id: 'reciter-la-loi-au-lieu-de-lire-les-mesures',
          nom: 'modèle « la loi a réponse à tout » : on rend l’écart que la loi annonce, sans regarder la troisième lecture',
          calcul: {
            etapes: [{ id: 'ecartAnnonce', expr: '@u1 − @u2', unite: 'V' }],
            reponse: 'ecartAnnonce',
          },
        },
      },
    ],
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════

/** Les 25 items du savoir-faire, dans l’ordre où le chapitre les présente.
 *  C’est cette liste que `validerItem` et `tools/verifier-contenu.mjs` lisent :
 *  `DECOUVERTE`, `COURS` et `METHODE` n’en font pas partie et n’ont pas à en
 *  faire — ils ne portent ni classe de garantie, ni cercle, ni palier. */
export default Object.freeze([...ENTRAINEMENT, ...PROBLEMES, ...TEST]);

/** Les cinq graphes, exportés pour `tools/tester-circuit.mjs` : un circuit de
 *  contenu doit passer le même vérificateur que les cas-témoins du module. */
export const CIRCUITS = Object.freeze({
  CIRCUIT_DEUX_LAMPES_EN_DERIVATION,
  CIRCUIT_MIXTE_UNE_PUIS_DEUX,
  CIRCUIT_LAMPE_ET_MOTEUR,
  CIRCUIT_TROIS_LAMPES_EN_DERIVATION,
  CIRCUIT_BRANCHE_DE_DEUX_LAMPES,
});
