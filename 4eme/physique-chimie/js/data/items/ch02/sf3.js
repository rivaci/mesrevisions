// Chapitre 2, savoir-faire 3 — « Indiquer où placer un voltmètre sur un schéma,
// et prévoir ce qu’il indiquera ».
//
// C’est le savoir-faire que le chapitre existe pour tenir, et le seul du corpus
// dont le chiffre soit français, primaire et récent : CEDRE 2024 (DEPP, note
// n°26.13) donne 64 % de branchements corrects pour l’ampèremètre et 40 %
// seulement pour le voltmètre, en fin de troisième. Les deux gestes sont le même
// geste ; ce qui les sépare est le branchement EN DÉRIVATION, donc la LECTURE DE
// LA TOPOLOGIE. Ce fichier travaille cette lecture-là, et rien d’autre.
//
// ── Ce que ce fichier contient ─────────────────────────────────────────────
//
//   DECOUVERTE   deux branchements, une lampe éteinte, aucune règle énoncée
//   COURS        six blocs typés
//   METHODE      un exercice résolu en deux colonnes, contrôle en DEUX temps
//   ENTRAINEMENT 10 items
//   PROBLEMES     5 items
//   TEST         10 items
//
// L’export par défaut est la concaténation des trois sections d’items — 25 —,
// parce que c’est cette liste-là que `validerItem` et `tools/verifier-contenu.mjs`
// lisent. `DECOUVERTE`, `COURS` et `METHODE` ne sont PAS des items.
//
// ── Répartition des classes de garantie ────────────────────────────────────
//
//   A   12    la chaîne est rejouée en rationnels exacts, avec dimensions
//   B    7    la figure et la correction sont LE MÊME graphe, par identité
//   C    6    relu par un humain, scellé ; 6 sur 25, soit 24 %, sous le tiers
//
// Aucun item de classe A′ : il n’y a pas de table de tensions à interroger, et
// une valeur de pile n’est pas un fait tabulé — elle est écrite sur la pile.
//
// ── Répartition des cercles, et pourquoi elle est ce qu’elle est ───────────
//
//   cercle 3   11    le geste figuré : placer, corriger, désigner sur le graphe
//   cercle 2    3    on fait varier UNE chose et on prévoit ce qui reste
//   cercle 1   10    exploiter unicité et additivité pour prévoir une indication
//   cercle 0    1    ce qu’une tension EST, et pourquoi zéro n’est pas une panne
//
// Le chapitre 1 n’offrait qu’UN item de cercle 3 sur 175, et le moteur signalait
// le plancher de cette bande comme intenable faute de vivier. Onze items ici
// commencent à le combler. Mais le cercle 3 est **plafonné et non encouragé** :
// un schéma à l’écran relève de la simulation informatique, la moitié basse de
// l’éventail de Shavelson, et il n’est pas substituable au geste de paillasse.
// La conséquence est écrite dans le contrôle et non dans une intention :
// **quatorze items sur vingt-cinq sont hors cercle 3**, chaque palier en porte,
// et la maîtrise ne peut donc jamais être déclarée sur des schémas seuls. Elle
// se paie en raisonnement — prévoir une indication, exploiter une loi, critiquer
// une valeur, dire pourquoi une lecture est impossible.
//
// ── Les circuits sont des GRAPHES, et rien d’autre ─────────────────────────
//
// Aucune image, aucune disposition stockée. `schema.js` DÉDUIT le tracé de
// l’arbre série-parallèle, `circuit.js` juge la topologie, et deux schémas
// dessinés autrement mais topologiquement identiques sont le même circuit.
//
// **Et c’est `memeCircuit` qui en décide, jamais l’œil ni le nom de la
// constante.** Une relecture adverse a passé tous les graphes du fichier deux à
// deux dans le comparateur, et trois affirmations de ce bandeau étaient fausses :
// un graphe du TEST était le circuit d’un item d’entraînement, les montages
// ATTENDUS de p01 et t01 étaient le même circuit, et deux constantes de
// l’entraînement en décrivaient un seul. La cause est toujours la même, et elle
// est écrite dans `circuit.js` : dans une maille unique, les enfants d’un nœud
// SÉRIE sont un multi-ensemble TRIÉ, donc déplacer l’interrupteur entre les deux
// lampes ne change pas le circuit — cela ne change que le dessin. Les douze
// graphes qui restent sont écrits une fois et cités là où ils servent, et deux
// d’entre eux — `CIRCUIT_QCM_SERIE_DONNE` et `CIRCUIT_ATELIER_DONNE` — sont
// délibérément le même circuit, pour la raison écrite à leur déclaration.
//
// **Le patron des items de classe B est celui d’`exemples.js:ch07-sf1-i01`, et
// il demande d’être lu deux fois pour ne pas être mal recopié :**
//
//   · `situation.circuit` est le circuit DONNÉ à l’élève — celui d’AVANT, sans
//     l’appareil. C’est lui que la `conditionValidite` du piège inspecte, et
//     elle refuse un circuit où le voltmètre figurerait déjà : s’il est là, il
//     n’y a plus de geste à évaluer ;
//   · `figure.circuit` et `reponse.objetFormel` sont **le même objet JavaScript**
//     — pas deux copies —, et c’est le montage ATTENDU. L’identité de référence
//     est la seule forme de « le même objet formel » qu’une machine sache lire :
//     `validerItem` compare les deux par `!==`, et deux graphes égaux champ pour
//     champ divergeraient au premier auteur qui corrige l’un des deux.
//
// **Ce que l’écran n’en fait pas encore, et qu’il faut savoir avant de lire la
// suite.** `reponse.js` ne connaît aucune forme d’objet formel « circuit » :
// `FORMES_D_OBJET_FORMEL` est indexée par les champs `affectation`, `contenu`,
// `ordre`, `choisi`, `lieu`, `points`, `nature`, et un graphe n’en porte aucun.
// `aComposer` rend donc `null` sur les sept items de classe B de ce fichier — et
// comme `app.js` déduit de ce même appel le drapeau `figureEstLaReponse`, il
// AFFICHE la figure avec l’énoncé, c’est-à-dire le montage attendu sous la
// consigne qui demande de le construire. C’est une lacune de `reponse.js`, pas
// du contenu : `exemples.js:ch07-sf1-i01`, dont ces items reprennent le patron,
// la porte à l’identique. Elle se referme le jour où un septième widget sait
// composer un circuit ; elle n’a pas à se refermer en écrivant ici un item de
// moins bonne classe.
//
// ── Ce que la `conditionValidite` du piège a imposé au contenu ─────────────
//
// Elle est le prédicat le moins évident du catalogue, et elle lit le GRAPHE :
//
//   1. `demande: 'schema'` — l’item doit demander un BRANCHEMENT. Un item qui
//      demande seulement « que lira-t-il ? » ne porte donc PAS ce piège, et
//      aucun des douze items de classe A n’en porte : ils travaillent la
//      prévision, pas le geste, et leur attribuer le piège aurait gonflé sa
//      couverture d’items qui ne l’éprouvent pas ;
//   2. l’appareil ne doit PAS déjà figurer au circuit donné ;
//   3. la cible doit y figurer ;
//   4. **au moins deux récepteurs.** Avec un seul, « aux bornes de la lampe » et
//      « aux bornes de la pile » sont le MÊME branchement — `circuit.js` l’écrit
//      noir sur blanc : deux dipôles seuls dans une boucle satisfont à la fois la
//      définition de la série et celle de la dérivation. Aucun circuit de ce
//      fichier n’a moins de deux récepteurs, et ce n’est pas une élégance : le
//      prédicat refusait les premiers que j’avais écrits.
//
// Les trois doubles QCM déclarent eux aussi `demande: 'schema'`, et c’est
// délibéré : `demande` dit CE QU’ON DEMANDE — un branchement —, pas comment la
// réponse se saisit. Le mode de réponse est porté par le `type` de l’item, et
// c’est précisément ce que le palier 3 fait varier.
//
// ── Ce que les douze codes de `circuit.js` deviennent ici ──────────────────
//
// Ils ne sont pas des distracteurs écrits à la main : ce sont les constats que
// le vérificateur RENDRA sur le schéma de l’élève, avec leur message déjà écrit.
// Le contenu n’a donc à fournir que les montages où ils peuvent se produire.
//
//   VOLTMETRE_EN_SERIE              e01, e03, e05, e09, p01, p05, t01, t06
//   VOLTMETRE_AUX_MAUVAISES_BORNES  e07, e09, t05, t06, t08
//   CIRCUIT_OUVERT                  p05 (constat), t10 (critique de la lecture)
//   AMPEREMETRE_EN_DERIVATION       e03 (dispositif servi), le geste symétrique
//
// Les trois `dispositifServi` du fichier sont les trois constats du piège, et
// aucun autre : `apresReponsePiege` LÈVE sur un dispositif étranger, et
// `validerItem` transforme cette exception en faute d’auteur au build.
//
// ── Les paliers, et la variation qui les sépare ────────────────────────────
//
//   palier 1   8 items   le geste et la loi, nommés
//   palier 2   5 items   `objet-support` — le circuit change d’allure : dérivation,
//                        mixte, trois branches ; et une fois `registre`, où la
//                        tension s’écrit U et non plus en toutes lettres
//   palier 3   4 items   `mode-de-reponse` — on ne construit plus, on choisit et
//                        on critique ; et `sens-du-changement` sur les deux items
//                        où l’on ajoute ou retire une lampe
//   palier 4   8 items   le palier NON ÉTIQUETÉ : rien ne dit de quoi il s’agit
//
// Les paliers 2 et 3 du piège déclarent deux dimensions DISTINCTES —
// `objet-support` et `mode-de-reponse` — sans quoi le refus
// MEME_DIMENSION_AUX_DEUX_PALIERS n’aurait rien à mordre.
//
// ── Aucun distracteur quantitatif, et c’est un choix motivé ────────────────
//
// La règle du projet est qu’un distracteur numérique soit produit par un modèle
// erroné EXÉCUTABLE, rattaché à un piège du catalogue. Ce savoir-faire ne porte
// qu’un piège, et il est TOPOLOGIQUE : « soustraire au lieu d’additionner » n’est
// aucune des conceptions que `mesurer-en-coupant-le-circuit` décrit. Écrire un
// distracteur d’arithmétique et le rattacher à ce piège-là attribuerait au
// catalogue une conception qu’il ne porte pas, et gonflerait la couverture du
// seul piège du corpus dont la source soit ✔. Les douze items de classe A sont
// donc à sémantique `exacte`, sans tolérance et sans distracteur : la faute
// qu’ils attrapent est celle de la loi employée, et elle se lit sur la valeur.
//
// ── CE QUE CE SAVOIR-FAIRE NE COUVRE PAS ───────────────────────────────────
//
//   · **Le geste réel.** On ne branche rien, on ne tourne aucun bouton :
//     « mettre en œuvre » est hors périmètre, et l’application l’écrit à l’élève
//     dans le cours. On travaille « indiquer où brancher », « prévoir ce
//     qu’affichera », « dire pourquoi cette lecture est impossible ».
//   · **Le calibre et la lecture d’un afficheur** : c’est
//     `ch02-sf4-lire-une-tension-avec-son-calibre`, et le piège de l’unité y vit.
//     Aucune valeur de ce fichier n’est à convertir, aucune n’est en millivolts.
//   · **Les lois elles-mêmes.** Unicité (`ch02-sf5`) et additivité (`ch02-sf6`)
//     sont ÉTABLIES ailleurs ; ici elles servent d’outil pour prévoir une
//     indication, et les items qui s’y appuient les déclarent en `sfSollicites`
//     plutôt que de s’en attribuer la réussite.
//   · **L’ampèremètre**, qui est `ch07-sf1`. Il apparaît une fois, comme
//     `dispositifServi` du constat symétrique — le même geste avec l’autre
//     appareil n’a pas du tout la même conséquence —, jamais comme tâche.
//   · **La loi d’Ohm, la puissance, le régime alternatif** : hors chapitre et,
//     pour les deux derniers, hors cycle 4 (`nonDemande` du chapitre 2).
//   · **La discrimination mathématique.** Le savoir-faire ne déclare aucun
//     `prerequisMaths` : additionner et soustraire des décimaux est installé
//     depuis le cycle 3. Aucun item ne porte `discriminationMaths` — en poser un
//     serait refusé (DISCRIMINATION_SANS_PREREQUIS), et à juste titre.

// ════════════════════════════════════════════════════════════════════════════
// Les graphes — écrits une fois, cités partout où ils servent
// ════════════════════════════════════════════════════════════════════════════
//
// Convention de bornes, celle de `circuit.js` et valable pour TOUT dipôle
// polarisé :
//
//     bornes = [ borne « − » (COM, noire) , borne « + » (rouge) ]
//
// Pour un voltmètre posé aux bornes d’un dipôle, cela se lit simplement : la
// borne « − » va du côté par où le courant SORT du dipôle, la borne « + » du
// côté par où il y entre. `circuit.js` compare la polarité — un appareil
// retourné n’est pas le même circuit — et un montage à l’envers ressortirait en
// BORNE_INVERSEE.
//
// Aucun `fil` n’est écrit. Ce n’est pas un oubli : un fil est une identité entre
// deux nœuds, `normaliser` le contracte, et `schema.js` le rend sous la forme des
// liaisons elles-mêmes. Les nœuds portent donc directement les bonnes identités.

const dipole = (id, type, moins, plus, extra = {}) => Object.freeze({
  id, type, bornes: Object.freeze([moins, plus]), ...extra,
});

const circuit = (dipoles) => Object.freeze({ dipoles: Object.freeze(dipoles) });

// ── e01 — deux lampes en dérivation, commandées par un interrupteur ────────
//
// Le circuit DONNÉ. Deux récepteurs : la condition de validité du piège est
// tenue. La cible est L2 ; comme L1 et L2 relient les deux mêmes nœuds, « aux
// bornes de L2 » et « aux bornes de L1 » sont ici le même branchement — c’est
// physiquement vrai (les deux lampes ont la même tension), et c’est pourquoi ce
// circuit sert au palier 1, où la question est le GESTE. La cible, elle, se
// travaille sur les circuits mixtes des paliers suivants.

const CIRCUIT_DERIVATION_DONNE = circuit([
  dipole('P', 'pile', 'a', 'b'),
  dipole('K', 'interrupteur', 'b', 'c', { etat: 'ferme' }),
  dipole('L1', 'lampe', 'c', 'a'),
  dipole('L2', 'lampe', 'c', 'a'),
]);

/** Le montage ATTENDU : le voltmètre en dérivation aux bornes de L2. Le courant
 *  sort de la pile par « b », traverse K, arrive en « c » et se partage entre les
 *  deux lampes : « c » est donc du côté par où le courant ENTRE dans L2, et c’est
 *  là que va la borne « + » du voltmètre. */
const CIRCUIT_DERIVATION_AVEC_VOLTMETRE = circuit([
  dipole('P', 'pile', 'a', 'b'),
  dipole('K', 'interrupteur', 'b', 'c', { etat: 'ferme' }),
  dipole('L1', 'lampe', 'c', 'a'),
  dipole('L2', 'lampe', 'c', 'a'),
  dipole('V', 'voltmetre', 'a', 'c'),
]);

// ── e03 — une lampe et un moteur en série ──────────────────────────────────

const CIRCUIT_LAMPE_ET_MOTEUR_DONNE = circuit([
  dipole('P', 'pile', 'a', 'b'),
  dipole('L1', 'lampe', 'b', 'c'),
  dipole('M', 'moteur', 'c', 'd'),
  dipole('K', 'interrupteur', 'd', 'a', { etat: 'ferme' }),
]);

const CIRCUIT_VOLTMETRE_AUX_BORNES_DU_MOTEUR = circuit([
  dipole('P', 'pile', 'a', 'b'),
  dipole('L1', 'lampe', 'b', 'c'),
  dipole('M', 'moteur', 'c', 'd'),
  dipole('K', 'interrupteur', 'd', 'a', { etat: 'ferme' }),
  dipole('V', 'voltmetre', 'd', 'c'),
]);

// ── e05 — le circuit du double QCM : trois dipôles en série ────────────────
//
// Aucune figure : un `double-qcm` n’en porte pas (SORTES_PAR_TYPE n’ouvre de
// figure qu’aux types `lecture`, `schema-circuit` et `schema-particulaire`). Le
// circuit est donc décrit en toutes lettres dans l’énoncé — c’est une vraie
// limite du format, et c’est l’une des raisons pour lesquelles ces trois items
// sont relus : rien de mécanique ne garantit que la phrase et le graphe déclaré
// dans la `situation` parlent du même montage.

const CIRCUIT_QCM_SERIE_DONNE = circuit([
  dipole('P', 'pile', 'x1', 'x2'),
  dipole('L1', 'lampe', 'x2', 'x3'),
  dipole('L2', 'lampe', 'x3', 'x4'),
  dipole('K', 'interrupteur', 'x4', 'x1', { etat: 'ferme' }),
]);

// ── e06 — trois lampes en série, le voltmètre DÉJÀ placé ───────────────────
//
// Item de classe A : la figure n’a pas à être l’objet formel de la correction,
// puisque la correction est une VALEUR et qu’elle est rejouée. Le voltmètre est
// posé, l’élève n’a rien à brancher — c’est ce qui range l’item en cercle 1 et
// non en cercle 3 : le travail demandé est l’additivité, pas le geste.

const CIRCUIT_TROIS_LAMPES_AVEC_VOLTMETRE = circuit([
  dipole('P', 'pile', 'a', 'b'),
  dipole('L1', 'lampe', 'b', 'c'),
  dipole('L2', 'lampe', 'c', 'd'),
  dipole('L3', 'lampe', 'd', 'e'),
  dipole('K', 'interrupteur', 'e', 'a', { etat: 'ferme' }),
  dipole('V', 'voltmetre', 'e', 'd'),
]);

// ── e07 — le circuit MIXTE, où la cible cesse d’être indifférente ──────────
//
// Deux lampes en dérivation, puis une troisième traversée par tout le courant.
// « Aux bornes de L3 » et « aux bornes de L1 » sont maintenant deux branchements
// DIFFÉRENTS, et VOLTMETRE_AUX_MAUVAISES_BORNES a enfin quelque chose à dire.

const CIRCUIT_MIXTE_DONNE = circuit([
  dipole('P', 'pile', 'a', 'b'),
  dipole('K', 'interrupteur', 'b', 'c', { etat: 'ferme' }),
  dipole('L1', 'lampe', 'c', 'd'),
  dipole('L2', 'lampe', 'c', 'd'),
  dipole('L3', 'lampe', 'd', 'a'),
]);

const CIRCUIT_MIXTE_AVEC_VOLTMETRE_SUR_L3 = circuit([
  dipole('P', 'pile', 'a', 'b'),
  dipole('K', 'interrupteur', 'b', 'c', { etat: 'ferme' }),
  dipole('L1', 'lampe', 'c', 'd'),
  dipole('L2', 'lampe', 'c', 'd'),
  dipole('L3', 'lampe', 'd', 'a'),
  dipole('V', 'voltmetre', 'a', 'd'),
]);

// ── e09 — le circuit du double QCM de palier 3 ─────────────────────────────
//
// Il n’y en a pas. Ce fichier en portait un, écrit sous les nœuds `y1..y3`, et
// `memeCircuit` a tranché : c’était `CIRCUIT_DERIVATION_DONNE`, au renommage
// près. Deux constantes pour un seul circuit sont une faute même quand la
// duplication est invisible — c’est l’auteur qui corrige l’une et pas l’autre.
// Et la réutilisation est ici JUSTE : la dimension déclarée au palier 3 est
// `mode-de-reponse`, c’est-à-dire que le circuit doit précisément NE PAS
// changer. e09 cite donc le graphe de e01.

// ── p01 — le palier non étiqueté : rien ne nomme la tâche ──────────────────
//
// `CIRCUIT_ATELIER_DONNE` est, topologiquement, `CIRCUIT_QCM_SERIE_DONNE` : dans
// une maille unique l’ordre des dipôles ne compte pas, `circuit.js` trie les
// enfants d’un nœud série, et `memeCircuit` répond `true`. C’est écrit ici parce
// que ce n’était pas dit, et ce n’est pas un défaut : e05 est un double QCM de
// palier 1 qui NOMME la dérivation, p01 est un problème de palier 4 où rien ne
// la nomme. Retrouver le même montage sans son étiquette est exactement la tâche
// du palier 4. Ce qui serait un défaut, et que le TEST évite, c’est de resservir
// ce circuit à l’auto-évaluation.

const CIRCUIT_ATELIER_DONNE = circuit([
  dipole('P', 'pile', 'n1', 'n2'),
  dipole('K', 'interrupteur', 'n2', 'n3', { etat: 'ferme' }),
  dipole('L1', 'lampe', 'n3', 'n4'),
  dipole('L2', 'lampe', 'n4', 'n1'),
]);

const CIRCUIT_ATELIER_AVEC_VOLTMETRE = circuit([
  dipole('P', 'pile', 'n1', 'n2'),
  dipole('K', 'interrupteur', 'n2', 'n3', { etat: 'ferme' }),
  dipole('L1', 'lampe', 'n3', 'n4'),
  dipole('L2', 'lampe', 'n4', 'n1'),
  dipole('V', 'voltmetre', 'n1', 'n4'),
]);

// ── Les graphes du TEST — aucun circuit, aucune valeur repris de l’entraînement ──

/** t01 — une chaîne série de TROIS récepteurs.
 *
 *  Ce graphe portait auparavant deux lampes et un interrupteur placé ENTRE
 *  elles, avec ce commentaire : « ni la même topologie que
 *  `CIRCUIT_QCM_SERIE_DONNE`, ni les mêmes nœuds ». La seconde moitié était
 *  vraie et sans intérêt ; la PREMIÈRE était fausse, et `memeCircuit` le dit :
 *  dans une maille unique, `circuit.js` trie les enfants d’un nœud série et
 *  l’ordre ne compte pas — c’est le choix qu’il assume pour ne pas compter faux
 *  l’élève qui place l’appareil après la lampe au lieu d’avant. Les trois graphes
 *  e05, p01 et t01 avaient donc la même clé `pile[S(interrupteur:ferme|lampe|
 *  lampe)]`, et les montages ATTENDUS de p01 et t01 aussi : l’item du test
 *  demandait, au graphe près, la réponse d’un item déjà travaillé.
 *
 *  Un troisième récepteur suffit à en faire un autre circuit, et il ne change ni
 *  le palier ni le geste : la tâche reste « poser le voltmètre aux bornes du
 *  dipôle qu’on me nomme », sur une chaîne où deux dipôles portent maintenant le
 *  même nom de famille que la cible. */
const CIRCUIT_TEST_SERIE_DONNE = circuit([
  dipole('P', 'pile', 'p1', 'p2'),
  dipole('L1', 'lampe', 'p2', 'p3'),
  dipole('M', 'moteur', 'p3', 'p4'),
  dipole('L2', 'lampe', 'p4', 'p5'),
  dipole('K', 'interrupteur', 'p5', 'p1', { etat: 'ferme' }),
]);

const CIRCUIT_TEST_SERIE_AVEC_VOLTMETRE = circuit([
  dipole('P', 'pile', 'p1', 'p2'),
  dipole('L1', 'lampe', 'p2', 'p3'),
  dipole('M', 'moteur', 'p3', 'p4'),
  dipole('L2', 'lampe', 'p4', 'p5'),
  dipole('K', 'interrupteur', 'p5', 'p1', { etat: 'ferme' }),
  dipole('V', 'voltmetre', 'p3', 'p2'),
]);

/** t04 — mixte, le voltmètre DÉJÀ posé aux bornes de la lampe qui est seule sur
 *  le passage de tout le courant. Classe A : on prévoit, on ne branche pas. */
const CIRCUIT_TEST_MIXTE_AVEC_VOLTMETRE = circuit([
  dipole('P', 'pile', 'q1', 'q2'),
  dipole('L1', 'lampe', 'q2', 'q3'),
  dipole('L2', 'lampe', 'q3', 'q1'),
  dipole('L3', 'lampe', 'q3', 'q1'),
  dipole('V', 'voltmetre', 'q3', 'q2'),
]);

/** t05 — la cible n’est plus un récepteur mais LA PILE. C’est le seul montage du
 *  fichier où le voltmètre se pose aux bornes du générateur, et il fallait qu’il
 *  y en ait un : « aux bornes de quoi » se travaille aussi sur ce dipôle-là.
 *
 *  TROIS branches en dérivation, et pas deux. Deux raisons, dont une était un
 *  défaut : avec deux branches, ce graphe et `CIRCUIT_QCM_MIXTE_DONNE` avaient la
 *  même clé — deux items voisins du même test tournaient sur une seule topologie
 *  décrite en deux phrases différentes. Et le bandeau de ce fichier annonce, au
 *  palier 2, un support qui va jusqu’aux « trois branches » : aucun graphe n’en
 *  portait. C’est celui-ci, et c’est bien un item de palier 2 à dimension
 *  `objet-support`. */
const CIRCUIT_TEST_MIXTE_DONNE = circuit([
  dipole('P', 'pile', 'r1', 'r2'),
  dipole('L1', 'lampe', 'r2', 'r3'),
  dipole('L2', 'lampe', 'r3', 'r4'),
  dipole('L3', 'lampe', 'r3', 'r4'),
  dipole('M', 'moteur', 'r3', 'r4'),
  dipole('K', 'interrupteur', 'r4', 'r1', { etat: 'ferme' }),
]);

const CIRCUIT_TEST_VOLTMETRE_AUX_BORNES_DE_LA_PILE = circuit([
  dipole('P', 'pile', 'r1', 'r2'),
  dipole('L1', 'lampe', 'r2', 'r3'),
  dipole('L2', 'lampe', 'r3', 'r4'),
  dipole('L3', 'lampe', 'r3', 'r4'),
  dipole('M', 'moteur', 'r3', 'r4'),
  dipole('K', 'interrupteur', 'r4', 'r1', { etat: 'ferme' }),
  dipole('V', 'voltmetre', 'r1', 'r2'),
]);

/** t06 — le circuit du double QCM du test. */
const CIRCUIT_QCM_MIXTE_DONNE = circuit([
  dipole('P', 'pile', 'z1', 'z2'),
  dipole('K', 'interrupteur', 'z2', 'z3', { etat: 'ferme' }),
  dipole('L1', 'lampe', 'z3', 'z4'),
  dipole('M', 'moteur', 'z3', 'z4'),
  dipole('L2', 'lampe', 'z4', 'z1'),
]);

/** t08 — le palier non étiqueté du test, et son format diagnostique : deux
 *  lampes en dérivation d’abord, puis le moteur. La cible est le moteur, qui est
 *  le seul dipôle traversé par tout le courant. */
const CIRCUIT_TEST_PALIER4_DONNE = circuit([
  dipole('P', 'pile', 's1', 's2'),
  dipole('L1', 'lampe', 's2', 's3'),
  dipole('L2', 'lampe', 's2', 's3'),
  dipole('M', 'moteur', 's3', 's4'),
  dipole('K', 'interrupteur', 's4', 's1', { etat: 'ferme' }),
]);

const CIRCUIT_TEST_PALIER4_AVEC_VOLTMETRE = circuit([
  dipole('P', 'pile', 's1', 's2'),
  dipole('L1', 'lampe', 's2', 's3'),
  dipole('L2', 'lampe', 's2', 's3'),
  dipole('M', 'moteur', 's3', 's4'),
  dipole('K', 'interrupteur', 's4', 's1', { etat: 'ferme' }),
  dipole('V', 'voltmetre', 's4', 's3'),
]);

// ════════════════════════════════════════════════════════════════════════════
// DÉCOUVERTE — deux branchements, une lampe éteinte, aucune règle
// ════════════════════════════════════════════════════════════════════════════

export const DECOUVERTE = Object.freeze({
  titre: 'Deux branchements, et deux nombres qui ont l’air corrects',
  texte:
    'Deux binômes doivent mesurer la tension aux bornes de la lampe L1, dans le même circuit : '
    + 'une pile, la lampe L1, une seconde lampe L2 et un interrupteur, les quatre à la suite sur '
    + 'une seule boucle. Le premier binôme débranche '
    + 'un fil, glisse le voltmètre dans la coupure et le rebranche : les deux lampes restent '
    + 'éteintes, et l’appareil affiche un nombre. Le second binôme ne débranche rien : il pose les '
    + 'deux fils du voltmètre de part et d’autre de L1. Les lampes brillent, et l’appareil affiche '
    + 'un nombre lui aussi — plus petit.',
  releve: Object.freeze([
    'Premier binôme : lampes éteintes, voltmètre 4,4 V',
    'Second binôme : lampes allumées, voltmètre 2,3 V',
  ]),
  questions: Object.freeze([
    'Les deux appareils affichent quelque chose. Est-ce que cela suffit à dire que les deux '
      + 'mesures sont bonnes ? Écris ta réponse avant de lire la suite.',
    'Le premier binôme a éteint les lampes en branchant son appareil. Est-ce grave, si le nombre '
      + 'affiché a l’air juste ?',
    'Si on te demandait maintenant de dire à quoi on reconnaît un bon branchement SANS regarder '
      + 'l’écran de l’appareil, que regarderais-tu ?',
  ]),
  cePourQuoiOnNeTranchePasEncore:
    'Aucune règle n’est donnée ici. Deux idées tiennent debout à ce stade : « pour mesurer, il '
    + 'faut être sur le passage » — c’est vrai d’un compteur d’eau, d’un péage, d’un tourniquet, '
    + 'et c’est vrai de l’ampèremètre — et « il ne faut rien couper ». Le cours ne va pas dire que '
    + 'la première est bête : elle est bonne pour tout ce qui CIRCULE. Il va dire pourquoi une '
    + 'tension n’est pas de cela, et à quoi on le reconnaît sur le schéma, avant même de brancher.',
});

// ════════════════════════════════════════════════════════════════════════════
// COURS — six blocs typés
// ════════════════════════════════════════════════════════════════════════════

export const COURS = Object.freeze({
  titre: 'Où placer un voltmètre, et ce qu’il indiquera',
  blocs: Object.freeze([
    {
      type: 'definition',
      titre: 'Une tension est un écart entre deux points',
      texte:
        'La **tension** n’est pas quelque chose qui circule dans un fil : c’est un **écart entre '
        + 'deux points** du circuit. On ne dit jamais « la tension de ce fil », on dit toujours '
        + '**« la tension entre A et B »**, ou **« aux bornes de L1 »** — ce qui revient au même, '
        + 'les bornes de L1 étant deux points. Elle s’exprime en **volts (V)**. Un appareil qui '
        + 'mesure un écart entre deux points doit donc toucher **ces deux points-là**, et rien '
        + 'd’autre.',
    },
    {
      type: 'propriete',
      titre: 'Le voltmètre se branche en dérivation',
      texte:
        'Un voltmètre se pose **en travers**, aux bornes du dipôle : on ne débranche rien, on ne '
        + 'coupe rien, on ajoute juste deux fils de part et d’autre. C’est ce qu’on appelle un '
        + 'branchement **en dérivation**. La borne « + » du voltmètre va du côté par où le courant '
        + '**entre** dans le dipôle ; branché dans l’autre sens, l’appareil affiche la bonne valeur '
        + 'précédée d’un signe moins.',
    },
    {
      type: 'propriete',
      titre: 'En série, il ouvre le circuit',
      texte:
        'Un voltmètre laisse passer un courant si faible qu’on le considère comme **nul**. Inséré '
        + 'dans la boucle — c’est-à-dire en série —, il se comporte donc comme une **coupure** : '
        + 'plus rien ne fonctionne, aucune lampe ne s’allume. Et il affiche tout de même un '
        + 'nombre, proche de la tension de la pile : **une valeur qui a l’air correcte est le pire '
        + 'des résultats**, parce que rien à l’écran ne dit qu’elle répond à une autre question.',
    },
    {
      type: 'remarque',
      titre: 'Le même geste avec l’autre appareil',
      texte:
        'L’échange se paie **dans les deux sens**. Un **ampèremètre** compte ce qui le traverse : '
        + 'il se branche **en série**, et posé en travers d’une lampe il lui offre un chemin sans '
        + 'résistance — la lampe s’éteint, et c’est le branchement qui **détruit l’appareil**. '
        + 'Retiens la question, pas le mot : **qu’est-ce que je mesure ?** Un débit se coupe pour '
        + 'être compté, un écart se lit entre deux points.',
    },
    {
      type: 'remarque',
      titre: 'Zéro volt n’est pas une panne',
      texte:
        'Un voltmètre qui affiche **0 V** peut être parfaitement juste. Aux bornes d’un fil, d’un '
        + 'interrupteur **fermé**, ou de deux points qui sont électriquement le même point, l’écart '
        + 'est bien nul : il n’y a rien à franchir. Et si le circuit est **ouvert**, une lampe qui '
        + 'ne s’allume pas peut afficher 0 V à ses bornes pendant que toute la tension de la pile '
        + 'se retrouve aux bornes de la coupure. Avant d’accuser l’appareil, regarde le montage.',
    },
    {
      type: 'remarque',
      titre: 'Ce que cette application ne te fera pas faire',
      texte:
        'Tu ne brancheras rien ici, et tu ne toucheras aucun bouton : **le geste s’apprend en '
        + 'salle, pas sur un écran**. Ce qu’on travaille, c’est ce qui vient avant et après — '
        + 'dire **où** brancher sur un schéma, **prévoir** ce que l’appareil affichera, et dire '
        + '**pourquoi** une lecture annoncée est impossible. Un schéma juste dans la tête est ce '
        + 'qui fait tenir le geste à la paillasse, et c’est aussi ce que le brevet évalue.',
    },
  ].map(Object.freeze)),
});

// ════════════════════════════════════════════════════════════════════════════
// MÉTHODE — un exercice résolu, contrôle en DEUX temps
// ════════════════════════════════════════════════════════════════════════════

export const METHODE = Object.freeze({
  titre: 'Placer un voltmètre, puis prévoir ce qu’il indiquera',
  enonce:
    'Un circuit comporte une pile de 6 V, une lampe L1 et une lampe L2 en série, et un '
    + 'interrupteur fermé. Un voltmètre placé aux bornes de L1 indique 3,5 V. Indique où brancher '
    + 'un second voltmètre pour mesurer la tension aux bornes de L2, et donne ce qu’il indiquera, '
    + 'avec son unité.',
  etapes: Object.freeze([
    {
      geste: 'Dis d’abord QUELLE grandeur on te demande.',
      redaction:
        'On demande une **tension**, donc un écart entre deux points — pas un débit. L’appareil '
        + 'est un voltmètre, il se branche donc **en dérivation**, sans rien couper.',
    },
    {
      geste: 'Nomme les deux points, avant de dessiner quoi que ce soit.',
      redaction:
        'Aux bornes de **L2** : le point juste avant L2 et le point juste après L2. Pas « quelque '
        + 'part en dérivation » — **ces deux points-là**.',
    },
    {
      geste: 'Pose l’appareil, et oriente-le.',
      redaction:
        'Les deux fils du voltmètre vont de part et d’autre de L2, sans qu’aucun fil du circuit '
        + 'soit débranché. La borne « + » va du côté par où le courant **entre** dans L2, '
        + 'c’est-à-dire du côté de L1.',
    },
    {
      geste: 'Choisis la loi AVANT de calculer.',
      redaction:
        'L1 et L2 sont **en série** : les tensions **s’ajoutent** et leur somme vaut celle de la '
        + 'pile. Ce n’est pas l’unicité — celle-là vaut pour des dipôles **en dérivation**, qui '
        + 'relient les deux mêmes points.',
    },
    {
      geste: 'Fais l’opération, et écris l’unité.',
      redaction: '6 − 3,5 = 2,5. Le second voltmètre indiquera **2,5 V**.',
    },
  ].map(Object.freeze)),
  controle:
    'Deux questions, dans cet ordre — et la seconde manque presque toujours. **Un, le geste :** '
    + 'enlève l’appareil par la pensée. Si le circuit se retrouve **coupé**, c’est que tu l’avais '
    + 'mis en série : bon pour un ampèremètre, faux pour un voltmètre. S’il continue de fonctionner '
    + 'comme si l’appareil n’était pas là, c’est une dérivation : bon pour un voltmètre, faux pour '
    + 'un ampèremètre. **Deux, la cible :** relis la question et suis du doigt les deux fils de '
    + 'ton appareil. Aboutissent-ils bien de part et d’autre du dipôle qu’on te demandait — pas de '
    + 'son voisin, pas de deux d’un coup ? Un branchement irréprochable sur le mauvais dipôle donne '
    + 'une valeur parfaitement lisible, et rien à l’écran ne te dira qu’elle répond à une autre '
    + 'question. Enfin, l’ordre de grandeur : une tension aux bornes d’une lampe d’un circuit '
    + 'alimenté par une pile de 6 V ne peut pas valoir 40 V.',
  erreurQuOnAttend:
    'La faute la plus fréquente n’est pas la soustraction : c’est d’avoir répondu **6 V**, en '
    + 'appliquant aux deux lampes en série la loi qui vaut pour deux lampes en dérivation. La '
    + 'seconde, presque aussi fréquente, est d’avoir coupé le fil pour y glisser l’appareil — '
    + 'auquel cas il n’y a plus de tension aux bornes de L2 à mesurer, puisque plus rien ne passe.',
});

// ════════════════════════════════════════════════════════════════════════════
// ENTRAÎNEMENT — 10 items
// ════════════════════════════════════════════════════════════════════════════

export const ENTRAINEMENT = Object.freeze([

  // ── e01 — palier 1 · classe B · cercle 3 · LE FORMAT DIAGNOSTIQUE ────────
  //
  // Le piège déclare son format : « schéma de circuit à construire : l’élève
  // place lui-même l’appareil sur le graphe, ET dit ce qu’il affichera ». Cet
  // item porte donc les DEUX moitiés, et il faut dire exactement ce que la
  // classe B garantit de chacune : le GRAPHE est garanti par engendrement — la
  // figure et la correction sont le même objet JavaScript, un désaccord y est
  // impossible et non improbable —, la VALEUR ne l’est pas. Elle est ici sans
  // risque parce qu’il n’y a rien à calculer : les deux lampes sont en
  // dérivation aux bornes de la pile, la tension est celle qui est écrite sur la
  // pile, et c’est l’énoncé qui la donne. L’item ne demande pas d’arithmétique,
  // il demande de savoir DE QUEL DIPÔLE on parle.
  {
    id: 'ch02-sf3-e01-placer-le-voltmetre-aux-bornes-de-l2',
    sfPrincipal: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication',
    sfSollicites: ['ch02-sf5-loi-d-unicite-des-tensions'],
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 1,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'deux-lampes-en-derivation-sur-une-pile-plate',
    enonce:
      'Le circuit comporte une pile de {{donnee:upile}}, un interrupteur fermé, et deux lampes L1 '
      + 'et L2 branchées en dérivation. Complète le montage pour mesurer la tension aux bornes de '
      + 'L2 : place le voltmètre et oriente-le, sa borne « + » du côté par où le courant entre '
      + 'dans L2. Puis écris ce qu’il indiquera, avec son unité.',
    figure: { sorte: 'circuit', circuit: CIRCUIT_DERIVATION_AVEC_VOLTMETRE, titre: 'Montage attendu' },
    donnees: {
      upile: { valeur: [6, 1], unite: 'V' },
    },
    reponse: {
      objetFormel: CIRCUIT_DERIVATION_AVEC_VOLTMETRE,
      valeur: [6, 1], unite: 'V', semantique: 'exacte',
    },
    piege: 'mesurer-en-coupant-le-circuit',
    situation: {
      demande: 'schema',
      mesure: { appareil: 'V', cible: 'L2' },
      circuit: CIRCUIT_DERIVATION_DONNE,
    },
    dispositifServi: 'voltmetre-insere-dans-la-boucle',
    estFormatDiagnostique: true,
    motifFormatDiagnostique:
      'Le piège exige un SCHÉMA À CONSTRUIRE, où l’élève place lui-même l’appareil sur le graphe '
      + 'et dit ce qu’il affichera : cet item demande les deux, et il ne demande rien d’autre. Le '
      + 'voltmètre ne figure pas au circuit donné — s’il y était, il n’y aurait plus de geste à '
      + 'évaluer —, et le montage attendu est un graphe, pas une phrase : `circuit.js` le jugera '
      + 'avec ses douze codes, et un voltmètre inséré dans la boucle y ressortira en '
      + 'VOLTMETRE_EN_SERIE, pas en « faux ». Un QCM « en série ou en dérivation ? » ne suffirait '
      + 'pas, le piège l’écrit lui-même : le mot se récite sans que le geste soit tenu.',
  },

  // ── e02 — palier 1 · classe A · cercle 1 · prévoir, sans rien brancher ───
  //
  // Aucun piège : la `conditionValidite` de `mesurer-en-coupant-le-circuit`
  // exige `demande: 'schema'`, et cet item ne demande aucun branchement. Le lui
  // attribuer gonflerait la couverture d’un piège que l’item n’éprouve pas.
  {
    id: 'ch02-sf3-e02-prevoir-la-tension-aux-bornes-de-l2',
    sfPrincipal: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication',
    sfSollicites: ['ch02-sf6-loi-d-additivite-des-tensions'],
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'guirlande-de-deux-lampes-sur-etabli',
    enonce:
      'Une pile de {{donnee:upile}} alimente deux lampes L1 et L2 branchées en série. Un premier '
      + 'voltmètre, aux bornes de L1, indique {{donnee:u1}}. Un second voltmètre est posé aux '
      + 'bornes de L2. Que va-t-il indiquer ? Donne la valeur avec son unité.',
    donnees: {
      upile: { valeur: [9, 1], unite: 'V' },
      u1: { valeur: [35, 10], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'u2', expr: '@upile − @u1', unite: 'V' }],
      reponse: 'u2',
    },
    reponse: { valeur: [55, 10], unite: 'V', semantique: 'exacte' },
  },

  // ── e03 — palier 1 · classe B · cercle 3 · une lampe et un moteur ────────
  //
  // Le `dispositifServi` est le constat SYMÉTRIQUE — l’ampèremètre posé aux
  // bornes du moteur —, et ce n’est pas une fantaisie de décor : la règle du
  // piège se paie dans les deux sens, et l’élève qui a compris « il faut être en
  // dérivation » sans comprendre « pour un voltmètre » commettra l’autre faute
  // trois chapitres plus loin. Le contexte de surface du constat est
  // « batterie-moteur », celui de cet item aussi.
  {
    id: 'ch02-sf3-e03-placer-le-voltmetre-aux-bornes-du-moteur',
    sfPrincipal: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 1,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'petit-moteur-et-lampe-temoin',
    enonce:
      'Une pile, une lampe L1 et un petit moteur M sont branchés en série avec un interrupteur '
      + 'fermé. Complète le montage pour mesurer la tension aux bornes du moteur : place le '
      + 'voltmètre et oriente-le, sa borne « + » du côté par où le courant entre dans le moteur.',
    figure: { sorte: 'circuit', circuit: CIRCUIT_VOLTMETRE_AUX_BORNES_DU_MOTEUR, titre: 'Montage attendu' },
    reponse: { objetFormel: CIRCUIT_VOLTMETRE_AUX_BORNES_DU_MOTEUR },
    piege: 'mesurer-en-coupant-le-circuit',
    situation: {
      demande: 'schema',
      mesure: { appareil: 'V', cible: 'M' },
      circuit: CIRCUIT_LAMPE_ET_MOTEUR_DONNE,
    },
    dispositifServi: 'amperemetre-pose-aux-bornes-du-moteur',
  },

  // ── e04 — palier 1 · classe A · cercle 1 · on remonte à la pile ──────────
  //
  // Le sens du calcul est inversé par rapport à `e02` : on connaît les tensions
  // des récepteurs, on cherche celle du générateur. C’est la même loi lue dans
  // l’autre sens, et c’est la lecture qui manque le plus souvent.
  {
    id: 'ch02-sf3-e04-prevoir-la-tension-aux-bornes-de-la-pile',
    sfPrincipal: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication',
    sfSollicites: ['ch02-sf6-loi-d-additivite-des-tensions'],
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'pile-sans-etiquette-lisible',
    enonce:
      'L’étiquette de la pile est effacée. Deux lampes identiques L1 et L2 sont branchées en série '
      + 'avec elle et avec un interrupteur fermé. Un voltmètre indique {{donnee:u1}} aux bornes de '
      + 'L1, puis {{donnee:u2}} aux bornes de L2. On le place maintenant aux bornes de la pile : '
      + 'que va-t-il indiquer ? Donne la valeur avec son unité.',
    donnees: {
      u1: { valeur: [25, 10], unite: 'V' },
      u2: { valeur: [25, 10], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'upile', expr: '@u1 + @u2', unite: 'V' }],
      reponse: 'upile',
    },
    reponse: { valeur: [5, 1], unite: 'V', semantique: 'exacte' },
  },

  // ── e05 — palier 1 · classe C · cercle 3 · double QCM ────────────────────
  //
  // Un `double-qcm` ne peut PAS porter de figure : le circuit est donc décrit en
  // toutes lettres, et le graphe déclaré à la `situation` sert au seul prédicat
  // du piège. Rien de mécanique ne garantit que la phrase et le graphe parlent du
  // même montage — c’est exactement ce que la relecture humaine couvre ici, et
  // c’est la raison de la classe C.
  //
  // Les trois justifications fausses sont `reformulee` et citent les
  // `raisonnements` du catalogue, qui sont écrits en voix d’élève. Aucune
  // citation institutionnelle n’est inventée : le corpus d’énoncés d’élèves
  // n’existe pas encore, et la provenance graduée existe pour ne pas avoir à
  // mentir en l’attendant.
  {
    id: 'ch02-sf3-e05-double-qcm-ou-brancher-le-voltmetre',
    sfPrincipal: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'C',
    cercle: 3,
    palier: 1,
    registre: 'macro',
    type: 'double-qcm',
    contexteDeSurface: 'binome-qui-hesite-devant-la-paillasse',
    enonce:
      'Un circuit comporte, dans cet ordre : une pile, la lampe L1, la lampe L2, un interrupteur '
      + 'fermé. Un binôme doit mesurer la tension aux bornes de L1. Où doit-il brancher le '
      + 'voltmètre ? Puis choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'en-derivation-aux-bornes-de-l1',
      choixPossibles: [
        'en-serie-juste-avant-l1',
        'en-derivation-aux-bornes-de-l1',
        'en-serie-juste-apres-l1',
        'en-derivation-aux-bornes-de-la-pile',
      ],
    },
    justifications: [
      {
        id: 'une-tension-est-un-ecart-entre-deux-points',
        texte:
          'Une tension n’est pas quelque chose qui passe : c’est l’écart entre deux points. Je '
          + 'pose donc les deux fils de part et d’autre de L1, sans rien débrancher, et le circuit '
          + 'continue de fonctionner comme si l’appareil n’était pas là.',
        juste: true,
        provenance: 'locale',
      },
      {
        id: 'il-faut-etre-sur-le-passage',
        texte:
          'Pour mesurer quelque chose, il faut être sur son passage : je coupe le fil juste avant '
          + 'L1 et je glisse l’appareil dans la coupure.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « mesurer-en-coupant-le-circuit », raisonnement '
          + '« il-faut-etre-sur-le-passage » — js/data/pieges/electricite.js',
        piege: 'mesurer-en-coupant-le-circuit',
      },
      {
        id: 'meme-geste-que-l-amperemetre',
        texte:
          'J’ai fait comme pour l’ampèremètre : on l’intercale sur le trajet, juste après la '
          + 'lampe. Un appareil de mesure se branche toujours de la même façon.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « mesurer-en-coupant-le-circuit », raisonnement '
          + '« meme-geste-que-l-amperemetre » — js/data/pieges/electricite.js',
        piege: 'mesurer-en-coupant-le-circuit',
      },
      {
        id: 'en-derivation-donc-c-est-bon',
        texte:
          'Je le mets en dérivation aux bornes de la pile : c’est bien une dérivation, comme on me '
          + 'l’a appris, et la tension est la même partout dans le circuit.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « mesurer-en-coupant-le-circuit », raisonnement '
          + '« en-derivation-donc-c-est-bon » — js/data/pieges/electricite.js',
        piege: 'mesurer-en-coupant-le-circuit',
      },
    ],
    piege: 'mesurer-en-coupant-le-circuit',
    situation: {
      demande: 'schema',
      mesure: { appareil: 'V', cible: 'L1' },
      circuit: CIRCUIT_QCM_SERIE_DONNE,
    },
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: '3cc770fc503e6a95' },
  },

  // ── e06 — palier 2 · classe A · cercle 1 · dimension : objet-support ─────
  //
  // Le support change : le circuit n’est plus décrit en toutes lettres, il est
  // DESSINÉ — et le voltmètre y est déjà posé. L’élève n’a donc rien à brancher :
  // le geste figuré n’est pas évalué, seule la loi l’est, et c’est ce qui range
  // cet item en cercle 1. Un item de cercle 3 est un item où le GESTE est la
  // tâche ; ici il est le décor.
  {
    id: 'ch02-sf3-e06-lire-le-schema-et-prevoir-la-tension-de-l3',
    sfPrincipal: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication',
    sfSollicites: ['ch02-sf6-loi-d-additivite-des-tensions'],
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'schema-circuit',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'trois-lampes-en-serie-sur-un-schema',
    enonce:
      'Sur ce schéma, trois lampes sont branchées en série avec une pile de {{donnee:upile}} et un '
      + 'interrupteur fermé. Le voltmètre est déjà en place, aux bornes de L3. On sait par ailleurs '
      + 'que la tension aux bornes de L1 vaut {{donnee:u1}} et celle aux bornes de L2 '
      + '{{donnee:u2}}. Que va indiquer le voltmètre ? Donne la valeur avec son unité.',
    figure: { sorte: 'circuit', circuit: CIRCUIT_TROIS_LAMPES_AVEC_VOLTMETRE, titre: 'Le montage tel qu’il est câblé' },
    donnees: {
      upile: { valeur: [12, 1], unite: 'V' },
      u1: { valeur: [4, 1], unite: 'V' },
      u2: { valeur: [3, 1], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'u3', expr: '@upile − @u1 − @u2', unite: 'V' }],
      reponse: 'u3',
    },
    reponse: { valeur: [5, 1], unite: 'V', semantique: 'exacte' },
  },

  // ── e07 — palier 2 · classe B · cercle 3 · dimension : objet-support ─────
  //
  // Le circuit devient MIXTE, et c’est là que la seconde moitié de la règle
  // commence à exister : « aux bornes de L3 » et « aux bornes de L1 » ne sont
  // plus le même branchement. Un voltmètre irréprochablement posé en dérivation
  // sur L1 sortira ici en VOLTMETRE_AUX_MAUVAISES_BORNES — le geste est bon, la
  // cible ne l’est pas, et `circuit.js` a deux codes pour le dire au lieu d’un.
  {
    id: 'ch02-sf3-e07-circuit-mixte-placer-le-voltmetre-sur-l3',
    sfPrincipal: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 2,
    registre: 'macro',
    type: 'schema-circuit',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'lampes-de-velo-avant-et-arriere',
    enonce:
      'Dans ce circuit, les lampes L1 et L2 sont branchées en dérivation l’une de l’autre, et la '
      + 'lampe L3 est traversée par tout le courant. Complète le montage pour mesurer la tension '
      + 'aux bornes de L3 — de L3, pas d’une autre : place le voltmètre et oriente-le, sa borne '
      + '« + » du côté par où le courant entre dans L3.',
    figure: { sorte: 'circuit', circuit: CIRCUIT_MIXTE_AVEC_VOLTMETRE_SUR_L3, titre: 'Montage attendu' },
    reponse: { objetFormel: CIRCUIT_MIXTE_AVEC_VOLTMETRE_SUR_L3 },
    piege: 'mesurer-en-coupant-le-circuit',
    situation: {
      demande: 'schema',
      mesure: { appareil: 'V', cible: 'L3' },
      circuit: CIRCUIT_MIXTE_DONNE,
    },
    dispositifServi: 'voltmetre-aux-bornes-de-la-mauvaise-lampe',
  },

  // ── e08 — palier 2 · classe A · cercle 1 · dimension : registre ──────────
  //
  // Le registre passe de macro à SYMBOLIQUE : la tension n’est plus « la tension
  // aux bornes de L1 », elle s’écrit U(L1), et la loi s’écrit avant de se
  // calculer. C’est le triplet de Johnstone appliqué à l’électricité, et le champ
  // `registre` le déclare — sans quoi « il ne connaît pas le fait » et « il ne
  // sait pas de quel niveau on parle » seraient le même échec.
  {
    id: 'ch02-sf3-e08-ecrire-la-loi-puis-prevoir',
    sfPrincipal: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication',
    sfSollicites: ['ch02-sf6-loi-d-additivite-des-tensions'],
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'symbolique',
    type: 'court',
    dimensionVariee: 'registre',
    contexteDeSurface: 'cahier-ou-la-loi-est-ecrite-avant-le-calcul',
    enonce:
      'Dans un circuit à une seule boucle, une pile, la lampe L1 et la lampe L2 sont en série. On '
      + 'note U(pile), U(L1) et U(L2) les tensions aux bornes de chacun. La loi d’additivité '
      + 's’écrit U(pile) = U(L1) + U(L2). On mesure U(pile) = {{donnee:upile}} et U(L1) = '
      + '{{donnee:u1}}. Que vaut U(L2) ? Donne la valeur avec son unité.',
    donnees: {
      upile: { valeur: [45, 10], unite: 'V' },
      u1: { valeur: [18, 10], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'u2', expr: '@upile − @u1', unite: 'V' }],
      reponse: 'u2',
    },
    reponse: { valeur: [27, 10], unite: 'V', semantique: 'exacte' },
  },

  // ── e09 — palier 3 · classe C · cercle 3 · dimension : mode-de-reponse ───
  //
  // Au palier 3, on ne construit plus : on CRITIQUE trois montages déjà faits.
  // C’est le mode de réponse qui varie, et c’est la dimension déclarée — les
  // paliers 2 et 3 de ce piège en portent donc deux distinctes, sans quoi le
  // refus MEME_DIMENSION_AUX_DEUX_PALIERS n’aurait rien à mordre.
  //
  // Le circuit est CELUI DE e01, et c’est ce que « la dimension variée est le
  // mode de réponse » veut dire : si le support changeait aussi, on ne saurait
  // plus lequel des deux a fait échouer l’élève.
  //
  // Les trois montages proposés sont les trois constats du piège, dans l’ordre :
  // inséré dans la boucle, posé aux bornes de la pile, posé correctement.
  {
    id: 'ch02-sf3-e09-double-qcm-lequel-des-trois-montages',
    sfPrincipal: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'C',
    cercle: 3,
    palier: 3,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'trois-comptes-rendus-ramasses-en-fin-d-heure',
    enonce:
      'Une pile alimente deux lampes L1 et L2 branchées en dérivation, avec un interrupteur fermé. '
      + 'Trois élèves ont voulu mesurer la tension aux bornes de L2. Léa a débranché un fil et '
      + 'glissé le voltmètre dans la coupure. Sacha a posé les deux fils du voltmètre de part et '
      + 'd’autre de L2, sans rien débrancher. Nour a posé le voltmètre aux bornes de '
      + 'l’interrupteur. Lequel des trois montages mesure la tension aux bornes de L2 ? Puis '
      + 'choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'le-montage-de-sacha',
      choixPossibles: [
        'le-montage-de-lea',
        'le-montage-de-sacha',
        'le-montage-de-nour',
        'aucun-des-trois',
      ],
    },
    justifications: [
      {
        id: 'seul-sacha-n-a-rien-coupe-et-vise-les-bonnes-bornes',
        texte:
          'Sacha est le seul à n’avoir rien débranché : son appareil est en dérivation, et ses '
          + 'deux fils aboutissent de part et d’autre de L2. Léa a coupé la boucle, donc plus rien '
          + 'ne fonctionne ; Nour est bien en dérivation, mais aux bornes d’un autre dipôle.',
        juste: true,
        provenance: 'locale',
      },
      {
        id: 'lea-est-sur-le-passage',
        texte:
          'C’est Léa qui a raison : son appareil est sur le trajet du courant, donc il peut voir '
          + 'ce qui passe. Les deux autres sont posés à côté du circuit.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « mesurer-en-coupant-le-circuit », raisonnement '
          + '« il-faut-etre-sur-le-passage » — js/data/pieges/electricite.js',
        piege: 'mesurer-en-coupant-le-circuit',
      },
      {
        id: 'nour-est-en-derivation-donc-c-est-bon',
        texte:
          'Nour convient aussi : son appareil est bien en dérivation, comme on nous l’a appris, et '
          + 'la tension est la même partout dans le circuit — le dipôle choisi n’a pas '
          + 'd’importance.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « mesurer-en-coupant-le-circuit », raisonnement '
          + '« en-derivation-donc-c-est-bon » — js/data/pieges/electricite.js',
        piege: 'mesurer-en-coupant-le-circuit',
      },
      {
        id: 'aucun-des-trois-ne-verrait-rien-en-travers',
        texte:
          'Aucun des trois : posé en travers, un appareil ne verrait rien passer, et il faudrait '
          + 'de toute façon un montage à part pour mesurer une tension.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « mesurer-en-coupant-le-circuit », raisonnement '
          + '« en-travers-il-ne-verra-rien » — js/data/pieges/electricite.js',
        piege: 'mesurer-en-coupant-le-circuit',
      },
    ],
    piege: 'mesurer-en-coupant-le-circuit',
    situation: {
      demande: 'schema',
      mesure: { appareil: 'V', cible: 'L2' },
      circuit: CIRCUIT_DERIVATION_DONNE,
    },
    dispositifServi: 'voltmetre-insere-dans-la-boucle',
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: 'fe309ddd78bc78bc' },
  },

  // ── e10 — palier 3 · classe A · cercle 2 · dimension : sens-du-changement ─
  //
  // Cercle 2 : on fait varier UNE seule chose — le nombre de lampes — et on
  // prévoit ce que devient la lecture. Le savoir-faire reste « prévoir ce
  // qu’indiquera le voltmètre » ; ce qui change est qu’on le demande APRÈS une
  // modification, et non sur un montage figé.
  {
    id: 'ch02-sf3-e10-une-lampe-de-plus-que-lit-le-voltmetre',
    sfPrincipal: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication',
    sfSollicites: ['ch02-sf6-loi-d-additivite-des-tensions'],
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 2,
    palier: 3,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'sens-du-changement',
    contexteDeSurface: 'guirlande-a-laquelle-on-ajoute-une-lampe',
    enonce:
      'Une pile de {{donnee:upile}} alimente deux lampes identiques en série ; un voltmètre posé '
      + 'aux bornes de l’une d’elles indique la moitié de la tension de la pile. On ajoute une '
      + 'troisième lampe identique, toujours en série, et on laisse le voltmètre là où il est. '
      + 'Que va-t-il indiquer maintenant ? Donne la valeur avec son unité.',
    donnees: {
      upile: { valeur: [6, 1], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'u', expr: '@upile ÷ 3', unite: 'V' }],
      reponse: 'u',
    },
    reponse: { valeur: [2, 1], unite: 'V', semantique: 'exacte' },
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════
// PROBLÈMES — 5 items, tous au palier NON ÉTIQUETÉ
// ════════════════════════════════════════════════════════════════════════════
//
// Au palier 4, rien ne dit à l’élève de quoi il s’agit : ni « en dérivation », ni
// « additivité », ni « attention au branchement ». La première tâche est de
// RECONNAÎTRE ce qu’on lui demande — c’est là que se joue le contrat didactique,
// et c’est là que le critère de maîtrise l’attend.

export const PROBLEMES = Object.freeze([

  // ── p01 — palier 4 · classe B · cercle 3 · piège ─────────────────────────
  {
    id: 'ch02-sf3-p01-atelier-completer-le-montage',
    sfPrincipal: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 4,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'atelier-de-reparation-d-une-lampe-de-poche',
    enonce:
      'Une lampe de poche à deux ampoules ne fonctionne plus correctement. Le circuit comporte une '
      + 'pile, un interrupteur fermé, puis les deux lampes L1 et L2 l’une après l’autre. Le '
      + 'technicien veut savoir combien de volts arrivent sur L2 avant de la remplacer. Complète le '
      + 'montage pour qu’il puisse le savoir, sans rien débrancher de ce qui existe.',
    figure: { sorte: 'circuit', circuit: CIRCUIT_ATELIER_AVEC_VOLTMETRE, titre: 'Montage attendu' },
    reponse: { objetFormel: CIRCUIT_ATELIER_AVEC_VOLTMETRE },
    piege: 'mesurer-en-coupant-le-circuit',
    situation: {
      demande: 'schema',
      mesure: { appareil: 'V', cible: 'L2' },
      circuit: CIRCUIT_ATELIER_DONNE,
    },
    dispositifServi: 'voltmetre-insere-dans-la-boucle',
  },

  // ── p02 — palier 4 · classe A · cercle 1 · deux gestes, aucun nommé ──────
  //
  // Il y a deux choses à voir et l’énoncé n’en nomme aucune : que le bloc de deux
  // lampes en dérivation compte pour UN terme dans l’addition, et que le dernier
  // terme s’obtient par soustraction. Nommer l’un des deux ferait réussir l’élève
  // qui ne regarde jamais la topologie.
  {
    id: 'ch02-sf3-p02-combien-reste-t-il-pour-la-derniere-lampe',
    sfPrincipal: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication',
    sfSollicites: ['ch02-sf6-loi-d-additivite-des-tensions', 'ch02-sf5-loi-d-unicite-des-tensions'],
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'eclairage-de-maquette-a-trois-lampes',
    enonce:
      'Une maquette est éclairée par une pile de {{donnee:upile}}. Deux lampes L1 et L2 sont '
      + 'branchées côte à côte entre les deux mêmes points ; une troisième lampe L3 est branchée à '
      + 'la suite, sur le chemin du retour vers la pile. Un voltmètre posé aux bornes de L1 indique '
      + '{{donnee:ubloc}}. On le déplace aux bornes de L3 : que va-t-il indiquer ? Donne la valeur '
      + 'avec son unité.',
    donnees: {
      upile: { valeur: [45, 10], unite: 'V' },
      ubloc: { valeur: [12, 10], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'u3', expr: '@upile − @ubloc', unite: 'V' }],
      reponse: 'u3',
    },
    reponse: { valeur: [33, 10], unite: 'V', semantique: 'exacte' },
  },

  // ── p03 — palier 4 · classe C · cercle 2 · pourquoi c’est impossible ─────
  //
  // Aucune chaîne de calcul : un item qui porterait à la fois un calcul et une
  // réponse libre serait scindable et refusé (ITEM_SCINDABLE_NON_SCINDE), à
  // raison. « Donne la valeur » et « explique pourquoi ce relevé ne tient pas
  // debout » sont deux items, et c’est le second qui est ici.
  {
    id: 'ch02-sf3-p03-expliquer-pourquoi-ce-releve-est-impossible',
    sfPrincipal: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'C',
    cercle: 2,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'compte-rendu-avec-un-releve-invraisemblable',
    enonce:
      'Un binôme rend ce compte rendu : « Pile de 6 V. Lampes L1 et L2 branchées en série avec un '
      + 'interrupteur fermé. Voltmètre aux bornes de L1 : 6,5 V. Voltmètre aux bornes de L2 : '
      + '6,5 V. » Écris en deux phrases pourquoi ce relevé ne peut pas être exact, et ce qu’il '
      + 'faudrait vérifier avant de refaire la mesure.',
    reponse: {
      libre: true,
      elementsAttendus: [
        'les deux lampes sont en série : les tensions s’ajoutent, et leur somme doit valoir celle '
          + 'de la pile',
        '6,5 + 6,5 fait plus du double de 6 : aucune des deux valeurs ne peut être juste',
        'une valeur aux bornes d’un récepteur ne peut pas dépasser celle de la pile qui l’alimente',
        'vérifier d’abord le branchement de l’appareil — en dérivation, et aux bornes du dipôle '
          + 'annoncé — avant de mettre en cause la pile',
      ],
    },
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: 'b9c2947754fc9a7d' },
  },

  // ── p04 — palier 4 · classe A · cercle 1 · la lecture qui vaut ZÉRO ──────
  //
  // Zéro est ici le résultat d’un vrai calcul, pas une convention : toute la
  // tension de la pile se retrouve répartie sur les deux lampes, il n’en reste
  // rien aux bornes de l’interrupteur fermé. C’est ce que la charte demande à une
  // classe A — une chaîne rejouée en rationnels exacts, avec dimensions — et
  // c’est aussi la seule façon honnête de faire tomber un zéro : le faire
  // CALCULER, jamais l’affirmer.
  {
    id: 'ch02-sf3-p04-zero-aux-bornes-de-l-interrupteur',
    sfPrincipal: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication',
    sfSollicites: ['ch02-sf6-loi-d-additivite-des-tensions'],
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'interrupteur-que-l-on-soupconne-de-mal-conduire',
    enonce:
      'Une pile de {{donnee:upile}} alimente les lampes L1 et L2 et un interrupteur fermé, tous en '
      + 'série. Un voltmètre indique {{donnee:u1}} aux bornes de L1 et {{donnee:u2}} aux bornes de '
      + 'L2. On le place enfin aux bornes de l’interrupteur : que va-t-il indiquer ? Donne la '
      + 'valeur avec son unité.',
    donnees: {
      upile: { valeur: [6, 1], unite: 'V' },
      u1: { valeur: [4, 1], unite: 'V' },
      u2: { valeur: [2, 1], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'uk', expr: '@upile − @u1 − @u2', unite: 'V' }],
      reponse: 'uk',
    },
    reponse: { valeur: [0, 1], unite: 'V', semantique: 'exacte' },
  },

  // ── p05 — palier 4 · classe C · cercle 3 · prédiction engagée ────────────
  //
  // La prédiction est verrouillée avant l’affichage du résultat : sans engagement
  // préalable il n’y a pas de conflit, juste une information de plus. C’est le
  // seul item du fichier où l’élève annonce ce qu’il verra sur un montage FAUX —
  // et il y a deux choses à annoncer, dont l’une est « rien ne s’allume ».
  //
  // Le prénom est TAO, et il n’est ni celui de Léa, ni celui de Sacha, ni celui
  // de Nour. Cet item s’appelait « le montage de Sacha » — or en e09 Sacha est
  // celui qui a JUSTE, et le montage décrit ici est le geste de Léa. L’élève qui
  // enchaîne les deux items lisait donc « Sacha » sur les deux branchements
  // opposés. Un prénom n’est pas un décor quand il traverse deux items : il fait
  // référence, ou il ne doit pas se répéter.
  //
  // Aucun piège déclaré, et il faut dire pourquoi : la `conditionValidite` de
  // `mesurer-en-coupant-le-circuit` exige que l’appareil reste À PLACER. Ici il
  // est déjà placé, et mal. L’item rejoue le premier constat du piège, mais il
  // ne peut pas s’en réclamer, et le déclarer quand même aurait été cocher une
  // case que le prédicat refuse.
  {
    id: 'ch02-sf3-p05-predire-ce-que-donnera-un-voltmetre-insere',
    sfPrincipal: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'C',
    cercle: 3,
    palier: 4,
    registre: 'macro',
    type: 'prediction-engagee',
    contexteDeSurface: 'montage-execute-tel-qu-il-a-ete-dessine',
    enonce:
      'Tao a monté ceci : une pile, la lampe L1, puis — à la place du fil qui reliait L1 à L2 — '
      + 'un voltmètre inséré dans la coupure, puis la lampe L2, puis l’interrupteur fermé. Son '
      + 'montage va être exécuté tel qu’il l’a dessiné. Avant l’exécution, écris deux choses : les '
      + 'lampes s’allument-elles, et que va indiquer le voltmètre ? Ta prédiction sera verrouillée '
      + 'avant le résultat.',
    reponse: {
      libre: true,
      elementsAttendus: [
        'aucune lampe ne s’allume : le voltmètre laisse passer un courant qu’on considère comme '
          + 'nul, il se comporte comme une coupure',
        'le voltmètre affiche tout de même un nombre, proche de la tension de la pile',
        'ce nombre a l’air correct et ne répond pas à la question posée : c’est ce qui rend cette '
          + 'faute plus dangereuse qu’une panne franche',
      ],
    },
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: 'd4fc8b3db9273828' },
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════
// TEST — 10 items
// ════════════════════════════════════════════════════════════════════════════
//
// Aucun item du test ne recopie un item d’entraînement, valeurs comprises : ni
// un circuit, ni un jeu de tensions, ni un contexte de surface.
//
// Des identifiants de nœuds distincts ne le garantissaient PAS, et l’affirmation
// ci-dessus était fausse quand elle s’appuyait sur eux : `CIRCUIT_TEST_SERIE_*`
// avait beau s’écrire en `p1..p4`, `memeCircuit` le rendait égal au circuit de
// e05 et de p01, et son montage attendu égal à celui de p01. Ce qui la tient
// maintenant est le comparateur lui-même : les graphes du test ont des clés
// canoniques qu’aucun graphe d’entraînement ne porte, et deux items du test n’en
// partagent pas non plus.

export const TEST = Object.freeze([

  // ── t01 — palier 1 · classe B · cercle 3 · piège ─────────────────────────
  {
    id: 'ch02-sf3-t01-placer-le-voltmetre-aux-bornes-de-l1',
    sfPrincipal: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 1,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'lampe-temoin-moteur-et-lampe-de-travail',
    enonce:
      'Le circuit comporte une pile, la lampe L1, un petit moteur M, la lampe L2 et un interrupteur '
      + 'fermé, tous en série. Complète le montage pour mesurer la tension aux bornes de L1 — de '
      + 'L1, pas d’une autre : place le voltmètre et oriente-le, sa borne « + » du côté par où le '
      + 'courant entre dans L1.',
    figure: { sorte: 'circuit', circuit: CIRCUIT_TEST_SERIE_AVEC_VOLTMETRE, titre: 'Montage attendu' },
    reponse: { objetFormel: CIRCUIT_TEST_SERIE_AVEC_VOLTMETRE },
    piege: 'mesurer-en-coupant-le-circuit',
    situation: {
      demande: 'schema',
      mesure: { appareil: 'V', cible: 'L1' },
      circuit: CIRCUIT_TEST_SERIE_DONNE,
    },
    dispositifServi: 'voltmetre-insere-dans-la-boucle',
  },

  // ── t02 — palier 1 · classe A · cercle 1 ─────────────────────────────────
  {
    id: 'ch02-sf3-t02-prevoir-la-tension-de-la-seconde-lampe',
    sfPrincipal: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication',
    sfSollicites: ['ch02-sf6-loi-d-additivite-des-tensions'],
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'deux-lampes-de-vitrine-en-serie',
    enonce:
      'Une pile de {{donnee:upile}} alimente deux lampes en série avec un interrupteur fermé. Un '
      + 'voltmètre aux bornes de la première indique {{donnee:u1}}. On le déplace aux bornes de la '
      + 'seconde : que va-t-il indiquer ? Donne la valeur avec son unité.',
    donnees: {
      upile: { valeur: [75, 10], unite: 'V' },
      u1: { valeur: [28, 10], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'u2', expr: '@upile − @u1', unite: 'V' }],
      reponse: 'u2',
    },
    reponse: { valeur: [47, 10], unite: 'V', semantique: 'exacte' },
  },

  // ── t03 — palier 1 · classe A · cercle 1 · trois termes ──────────────────
  {
    id: 'ch02-sf3-t03-remonter-a-la-tension-du-generateur',
    sfPrincipal: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication',
    sfSollicites: ['ch02-sf6-loi-d-additivite-des-tensions'],
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'banc-d-essai-a-trois-recepteurs',
    enonce:
      'Sur un banc d’essai, la lampe L1, la lampe L2 et un petit moteur M sont branchés en série '
      + 'avec un générateur et un interrupteur fermé. Un voltmètre indique {{donnee:u1}} aux bornes '
      + 'de L1, {{donnee:u2}} aux bornes de L2 et {{donnee:um}} aux bornes du moteur. On le place '
      + 'aux bornes du générateur : que va-t-il indiquer ? Donne la valeur avec son unité.',
    donnees: {
      u1: { valeur: [14, 10], unite: 'V' },
      u2: { valeur: [14, 10], unite: 'V' },
      um: { valeur: [27, 10], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'ug', expr: '@u1 + @u2 + @um', unite: 'V' }],
      reponse: 'ug',
    },
    reponse: { valeur: [55, 10], unite: 'V', semantique: 'exacte' },
  },

  // ── t04 — palier 2 · classe A · cercle 1 · dimension : objet-support ─────
  {
    id: 'ch02-sf3-t04-lire-le-schema-mixte-et-prevoir',
    sfPrincipal: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication',
    sfSollicites: ['ch02-sf6-loi-d-additivite-des-tensions', 'ch02-sf5-loi-d-unicite-des-tensions'],
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'schema-circuit',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'panneau-lumineux-a-deux-branches',
    enonce:
      'Sur ce schéma, la lampe L1 est traversée par tout le courant, puis les lampes L2 et L3 se '
      + 'partagent le reste du circuit entre les deux mêmes points. Le générateur délivre '
      + '{{donnee:upile}} et un voltmètre placé aux bornes de L2 indiquerait {{donnee:ubloc}}. Le '
      + 'voltmètre du schéma est aux bornes de L1 : que va-t-il indiquer ? Donne la valeur avec son '
      + 'unité.',
    figure: { sorte: 'circuit', circuit: CIRCUIT_TEST_MIXTE_AVEC_VOLTMETRE, titre: 'Le montage tel qu’il est câblé' },
    donnees: {
      upile: { valeur: [8, 1], unite: 'V' },
      ubloc: { valeur: [26, 10], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'u1', expr: '@upile − @ubloc', unite: 'V' }],
      reponse: 'u1',
    },
    reponse: { valeur: [54, 10], unite: 'V', semantique: 'exacte' },
  },

  // ── t05 — palier 2 · classe B · cercle 3 · piège · objet-support ─────────
  //
  // La cible n’est plus un récepteur mais LA PILE. C’est une variation de support
  // au sens propre : le dipôle aux bornes duquel on se pose change de nature, et
  // l’élève qui a mémorisé « aux bornes de la lampe » plutôt que « aux bornes du
  // dipôle qu’on me nomme » n’a plus de recette à appliquer.
  {
    id: 'ch02-sf3-t05-placer-le-voltmetre-aux-bornes-de-la-pile',
    sfPrincipal: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 2,
    registre: 'macro',
    type: 'schema-circuit',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'pile-que-l-on-soupconne-d-etre-usee',
    enonce:
      'Le circuit comporte une pile, la lampe L1 traversée par tout le courant, puis les lampes L2 '
      + 'et L3 et le moteur M branchés tous les trois entre les deux mêmes points, et enfin un '
      + 'interrupteur fermé. On soupçonne la pile d’être usée. Complète le montage pour mesurer la '
      + 'tension aux bornes de la pile : place le voltmètre et oriente-le, sa borne « + » du côté '
      + 'de la borne « + » de la pile.',
    figure: { sorte: 'circuit', circuit: CIRCUIT_TEST_VOLTMETRE_AUX_BORNES_DE_LA_PILE, titre: 'Montage attendu' },
    reponse: { objetFormel: CIRCUIT_TEST_VOLTMETRE_AUX_BORNES_DE_LA_PILE },
    piege: 'mesurer-en-coupant-le-circuit',
    situation: {
      demande: 'schema',
      mesure: { appareil: 'V', cible: 'P' },
      circuit: CIRCUIT_TEST_MIXTE_DONNE,
    },
    dispositifServi: 'voltmetre-aux-bornes-de-la-mauvaise-lampe',
  },

  // ── t06 — palier 3 · classe C · cercle 3 · double QCM · mode-de-reponse ──
  //
  // Le cas que la relecture adverse du catalogue avait trouvé sans réfutation :
  // le geste est bon, la cible ne l’est pas, et rien à l’écran ne le dit. Le
  // contrôle du cours se fait donc en deux temps, et cet item ne porte que le
  // second — c’est celui que personne n’enseigne.
  {
    id: 'ch02-sf3-t06-double-qcm-en-derivation-mais-sur-l-autre-lampe',
    sfPrincipal: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'C',
    cercle: 3,
    palier: 3,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'copie-ou-le-branchement-est-irreprochable',
    enonce:
      'Le circuit comporte une pile, un interrupteur fermé, puis la lampe L1 et le moteur M '
      + 'branchés entre les deux mêmes points, et enfin la lampe L2 sur le chemin du retour. On '
      + 'demandait la tension aux bornes de L2. Un élève a posé son voltmètre en dérivation, sans '
      + 'rien débrancher — mais aux bornes de L1. Les lampes brillent et l’appareil affiche une '
      + 'valeur stable. Que faut-il en conclure ? Puis choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'la-lecture-est-bonne-mais-ce-n-est-pas-la-tension-demandee',
      // Le troisième choix disait « la mesure est impossible : LE CIRCUIT EST
      // COUPÉ », et il était réfuté par l’énoncé — qui écrit que les lampes
      // brillent — au lieu de l’être par la règle. Il ne décrivait donc aucune
      // conception, pendant que la conception « en travers, il ne verra rien »
      // était présente au menu des justifications sans avoir de réponse où se
      // poser : son élève devait choisir une phrase qui n’était pas la sienne.
      // C’est exactement ce que le piège reproche à un menu incomplet, et il
      // fallait le lire dans les deux menus, pas seulement dans celui du bas.
      choixPossibles: [
        'la-mesure-est-bonne-le-branchement-est-en-derivation',
        'la-lecture-est-bonne-mais-ce-n-est-pas-la-tension-demandee',
        'la-valeur-affichee-ne-veut-rien-dire-rien-ne-traverse-l-appareil',
        'le-voltmetre-va-etre-detruit',
      ],
    },
    justifications: [
      {
        id: 'une-tension-est-un-ecart-entre-deux-points-nommes',
        texte:
          'Le geste est bon : rien n’est coupé, l’appareil est bien en dérivation. Mais une tension '
          + 'est un écart entre deux points NOMMÉS, et ses deux fils encadrent L1, pas L2. La '
          + 'valeur affichée est juste — elle répond à une autre question que celle qu’on a posée.',
        juste: true,
        provenance: 'locale',
      },
      {
        id: 'en-derivation-donc-c-est-bon',
        texte:
          'Le branchement est en dérivation, comme on nous l’a appris : la mesure est donc bonne. '
          + 'La tension est la même partout dans le circuit, le dipôle choisi n’a pas '
          + 'd’importance.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « mesurer-en-coupant-le-circuit », raisonnement '
          + '« en-derivation-donc-c-est-bon » — js/data/pieges/electricite.js',
        piege: 'mesurer-en-coupant-le-circuit',
      },
      {
        id: 'pose-en-travers-il-ne-verra-rien',
        texte:
          'Posé en travers, l’appareil ne voit rien passer : il ne peut rien mesurer, et la valeur '
          + 'affichée ne veut rien dire.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « mesurer-en-coupant-le-circuit », raisonnement '
          + '« en-travers-il-ne-verra-rien » — js/data/pieges/electricite.js',
        piege: 'mesurer-en-coupant-le-circuit',
      },
      {
        id: 'il-fallait-etre-sur-le-passage',
        texte:
          'Il fallait couper le fil et intercaler l’appareil sur le trajet, comme pour un '
          + 'ampèremètre : sinon rien ne le traverse et il va griller.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « mesurer-en-coupant-le-circuit », raisonnement '
          + '« il-faut-etre-sur-le-passage » — js/data/pieges/electricite.js',
        piege: 'mesurer-en-coupant-le-circuit',
      },
    ],
    piege: 'mesurer-en-coupant-le-circuit',
    situation: {
      demande: 'schema',
      mesure: { appareil: 'V', cible: 'L2' },
      circuit: CIRCUIT_QCM_MIXTE_DONNE,
    },
    dispositifServi: 'voltmetre-aux-bornes-de-la-mauvaise-lampe',
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: '6a27e4ba6c1da1d2' },
  },

  // ── t07 — palier 3 · classe A · cercle 2 · sens-du-changement ────────────
  //
  // Le sens du changement est l’inverse de celui de `e10` : on RETIRE une lampe
  // au lieu d’en ajouter une, et la lecture monte au lieu de baisser. C’est la
  // même loi, éprouvée dans l’autre sens — un élève qui a retenu « quand on
  // touche au circuit, la lecture baisse » y échoue, et c’est ce qu’on veut voir.
  {
    id: 'ch02-sf3-t07-une-lampe-de-moins-que-lit-le-voltmetre',
    sfPrincipal: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication',
    sfSollicites: ['ch02-sf6-loi-d-additivite-des-tensions'],
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 2,
    palier: 3,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'sens-du-changement',
    contexteDeSurface: 'rampe-d-eclairage-dont-on-retire-une-lampe',
    enonce:
      'Une rampe comporte quatre lampes identiques en série, alimentées par un générateur de '
      + '{{donnee:upile}} et commandées par un interrupteur fermé. Un voltmètre est posé aux bornes '
      + 'de l’une d’elles. On retire une lampe et on referme le circuit sur les trois autres, en '
      + 'laissant le voltmètre là où il est. Que va-t-il indiquer ? Donne la valeur avec son unité.',
    donnees: {
      upile: { valeur: [12, 1], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'u', expr: '@upile ÷ 3', unite: 'V' }],
      reponse: 'u',
    },
    reponse: { valeur: [4, 1], unite: 'V', semantique: 'exacte' },
  },

  // ── t08 — palier 4 · classe B · cercle 3 · piège · FORMAT DIAGNOSTIQUE ───
  //
  // Le second item au format diagnostique du fichier, et il est au palier NON
  // ÉTIQUETÉ : rien dans l’énoncé ne nomme « dérivation », ni « additivité », ni
  // l’appareil à choisir. Les deux moitiés du format y sont — placer, puis dire
  // ce que l’appareil indiquera —, et la valeur s’obtient par une soustraction
  // que l’énoncé ne demande pas explicitement.
  //
  // Comme pour `e01`, ce que la classe B garantit est le GRAPHE, et rien que lui.
  // La valeur est écrite par l’auteur et relue par lui ; elle n’a pas de chaîne
  // rejouée, parce qu’un item ne peut pas être à la fois de classe A et de classe
  // B, et que c’est l’accord entre la figure et la correction qui est ici le plus
  // coûteux à perdre — un schéma faux n’est pas relu, une valeur fausse l’est.
  {
    id: 'ch02-sf3-t08-completer-et-prevoir-sur-le-moteur',
    sfPrincipal: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication',
    sfSollicites: ['ch02-sf6-loi-d-additivite-des-tensions'],
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 4,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'ventilateur-de-maquette-qui-tourne-trop-lentement',
    enonce:
      'Le ventilateur d’une maquette tourne trop lentement. Son moteur M est alimenté par une pile '
      + 'de {{donnee:upile}} ; deux lampes L1 et L2 sont branchées entre les deux mêmes points, '
      + 'avant le moteur, et un interrupteur fermé referme le circuit. On sait que la tension aux '
      + 'bornes de L1 vaut {{donnee:ubloc}}. Complète le montage pour connaître la tension qui '
      + 'arrive sur le moteur, puis écris ce que l’appareil indiquera, avec son unité.',
    figure: { sorte: 'circuit', circuit: CIRCUIT_TEST_PALIER4_AVEC_VOLTMETRE, titre: 'Montage attendu' },
    donnees: {
      upile: { valeur: [9, 1], unite: 'V' },
      ubloc: { valeur: [28, 10], unite: 'V' },
    },
    reponse: {
      objetFormel: CIRCUIT_TEST_PALIER4_AVEC_VOLTMETRE,
      valeur: [62, 10], unite: 'V', semantique: 'exacte',
    },
    piege: 'mesurer-en-coupant-le-circuit',
    situation: {
      demande: 'schema',
      mesure: { appareil: 'V', cible: 'M' },
      circuit: CIRCUIT_TEST_PALIER4_DONNE,
    },
    dispositifServi: 'amperemetre-pose-aux-bornes-du-moteur',
    estFormatDiagnostique: true,
    motifFormatDiagnostique:
      'Schéma de circuit à construire, et prévision de l’indication : les deux moitiés que le '
      + 'piège déclare, au palier non étiqueté, sur un énoncé qui ne nomme ni la dérivation ni la '
      + 'loi à employer. Le voltmètre ne figure pas au circuit donné, sa cible y figure, et le '
      + 'montage attendu est un graphe que `circuit.js` jugera — un appareil inséré dans la boucle '
      + 'y ressortira en VOLTMETRE_EN_SERIE, un appareil posé sur les lampes en '
      + 'VOLTMETRE_AUX_MAUVAISES_BORNES, et l’élève lira ce qu’il doit refaire plutôt que « faux ».',
  },

  // ── t09 — palier 4 · classe A · cercle 1 · aux bornes de DEUX dipôles ────
  //
  // Le voltmètre n’est plus aux bornes d’un dipôle mais d’une BRANCHE entière —
  // deux dipôles pris ensemble. C’est parfaitement légitime, et c’est le cas que
  // l’élève n’a jamais vu : `circuit.js` l’admet d’ailleurs explicitement, sa
  // cible pouvant être une liste d’identifiants et non un seul.
  {
    id: 'ch02-sf3-t09-le-voltmetre-a-cheval-sur-deux-lampes',
    sfPrincipal: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication',
    sfSollicites: ['ch02-sf6-loi-d-additivite-des-tensions'],
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'deux-lampes-mesurees-d-un-seul-coup',
    enonce:
      'Dans un circuit à une seule boucle, les lampes L1 et L2 se suivent en série. Un voltmètre '
      + 'aux bornes de L1 indique {{donnee:u1}} ; aux bornes de L2, il indique {{donnee:u2}}. On le '
      + 'branche maintenant entre le point situé juste avant L1 et le point situé juste après L2 : '
      + 'que va-t-il indiquer ? Donne la valeur avec son unité.',
    donnees: {
      u1: { valeur: [21, 10], unite: 'V' },
      u2: { valeur: [39, 10], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'ubranche', expr: '@u1 + @u2', unite: 'V' }],
      reponse: 'ubranche',
    },
    reponse: { valeur: [6, 1], unite: 'V', semantique: 'exacte' },
  },

  // ── t10 — palier 4 · classe C · cercle 0 · ce qu’une tension EST ─────────
  //
  // Le seul item de cercle 0 du fichier, et il porte ce sur quoi tout le reste
  // repose : zéro volt n’est pas une panne d’appareil. Réponse libre, relue —
  // aucune chaîne de calcul, donc aucun risque d’item scindable non scindé.
  {
    id: 'ch02-sf3-t10-expliquer-un-zero-qui-n-est-pas-une-panne',
    sfPrincipal: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'appareil-que-l-on-croit-casse',
    enonce:
      'Un élève pose son voltmètre aux bornes de l’interrupteur fermé de son circuit. L’appareil '
      + 'affiche 0,00 V. Il en conclut que le voltmètre est cassé et va en chercher un autre. '
      + 'Écris en deux phrases pourquoi cette conclusion est trop rapide, et donne une autre '
      + 'situation, dans un circuit, où un voltmètre bien branché affiche zéro à juste titre.',
    reponse: {
      libre: true,
      elementsAttendus: [
        'une tension est un écart entre deux points : aux bornes d’un interrupteur fermé, il n’y a '
          + 'rien à franchir, l’écart est bien nul',
        'zéro est donc la bonne indication, et elle prouve que l’appareil fonctionne au lieu du '
          + 'contraire',
        'autre situation acceptée : aux bornes d’un simple fil, ou aux bornes d’une lampe '
          + 'court-circuitée par un fil',
        'pour vérifier que l’appareil marche, le poser aux bornes de la pile — là, la valeur ne '
          + 'peut pas être nulle',
      ],
    },
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: 'd09c1182ffebf0ee' },
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════

/** Les 25 items du savoir-faire, dans l’ordre où le chapitre les présente.
 *  C’est cette liste que `validerItem` et `tools/verifier-contenu.mjs` lisent :
 *  `DECOUVERTE`, `COURS` et `METHODE` n’en font pas partie et n’ont pas à en
 *  faire — ils ne portent ni classe de garantie, ni cercle, ni palier. */
export default Object.freeze([...ENTRAINEMENT, ...PROBLEMES, ...TEST]);
