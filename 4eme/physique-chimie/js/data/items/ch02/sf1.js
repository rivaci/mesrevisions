// Chapitre 2, savoir-faire 1 — « Schématiser un circuit avec les symboles
// normalisés ».
//
// Premier contenu écrit contre `circuit.js`. Le chapitre 1 n’avait aucun graphe :
// ses figures étaient des tableaux et des nuages de points, et le vérificateur
// topologique — douze codes d’erreur, une forme canonique, des cas-témoins — n’a
// jamais été appelé par un item publié. Ce fichier est le premier à s’en servir,
// et ce qui suit dit autant ce que le vérificateur a permis que ce qu’il a
// refusé.
//
// ── Ce que ce fichier contient ─────────────────────────────────────────────
//
//   DECOUVERTE   un montage dicté au téléphone, aucune règle énoncée
//   COURS        six blocs typés
//   METHODE      un montage traduit en schéma, geste de relecture compris
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
//   B  18   la correction est un OBJET FORMEL — un graphe de circuit, un choix
//           raisonné, une permutation d’étapes
//   C   7   relu par un humain, scellé ; 7 sur 25, soit 28 %, sous le tiers
//
// Aucun item de classe A ni A′, et ce n’est pas un manque : **il n’y a rien à
// calculer ici**. Schématiser ne produit aucune valeur, aucune unité, aucune
// chaîne rejouable. Un item de classe A dans ce savoir-faire aurait fallu
// l’inventer — compter les dipôles, additionner des symboles —, c’est-à-dire
// fabriquer de l’arithmétique là où le savoir-faire n’en demande pas, pour la
// seule satisfaction d’un compteur de classes. La garantie de ce fichier est
// ailleurs, et elle est plus forte : dix-huit items sur vingt-cinq portent une
// correction que `circuit.js` ou `reponse.js` savent comparer sans relecture.
//
// ── Le savoir-faire est de cercle 3, et il ne peut pas être déclaré acquis ──
//
// Il ne porte AUCUN piège au catalogue (`diagnostic: 'absent'`). La deuxième des
// cinq conditions de maîtrise — « au moins une réussite juste/juste sur le piège
// du savoir-faire » — est donc structurellement hors d’atteinte, et l’application
// le dit déjà à l’élève. Ce fichier ne cherche pas à contourner cela : **aucun
// item ne porte de `piege`**, aucun ne porte de `distracteurs`, et c’est une
// décision, pas un oubli.
//
// Rattacher un distracteur à un piège que le savoir-faire ne déclare pas aurait
// passé le contrôle — `refusDesDistracteurs` vérifie seulement que le piège
// existe au catalogue, jamais que le savoir-faire le porte — et aurait
// reprogrammé, dans le suivi de l’élève, une conception que ce savoir-faire n’a
// pas mission de réfuter. Le trou est dans le contrôleur ; on ne s’y engouffre
// pas.
//
// ── L’effet iatrogène, qui décide de la moitié du cours ────────────────────
//
// `raisonnement-sequentiel` est un piège de RANG 2, et son champ `iatrogene`
// nomme ce savoir-faire-ci : **c’est « schématiser un circuit » qui le
// fabrique**, dès que le sens du courant y est introduit. Le piège démarre au
// chapitre 7 ; nous sommes au chapitre 2, cinq chapitres avant que quoi que ce
// soit ne vienne le réfuter.
//
// Conséquence, tenue partout : **le sens du courant n’est nulle part dans ce
// fichier.** Aucun énoncé ne dit « le courant part de la borne + et rencontre
// d’abord… », aucune méthode ne fait parcourir le circuit dans un sens, et le
// bloc `remarque` « Ce qu’un schéma ne dit pas » l’écrit à l’élève en toutes
// lettres. Un schéma dit QUI EST RELIÉ À QUI, et rien d’autre. `schema.js` place
// bien le réseau extérieur de la borne « + » vers la borne « − » — c’est son
// affaire de tracé, pas un contenu enseigné ici.
//
// La seule polarité qui apparaît est celle de la PILE (barre longue et fine du
// côté « + », barre courte et épaisse du côté « − ») et celle du voltmètre de
// `p04`, parce que ce sont des faits de symbole, pas des faits de circulation.
//
// ── Les circuits sont des graphes, écrits une fois ─────────────────────────
//
// Treize graphes sont déclarés en tête de fichier et cités là où ils servent —
// huit qui sont ATTENDUS (figure et correction à la fois), cinq qui sont
// seulement MONTRÉS. Un graphe qui sert de figure ET de correction est le MÊME
// objet, par identité de référence : `item.js` refuse
// `FIGURE_ET_CORRECTION_DISJOINTES` sur deux objets égaux champ pour champ.
// Aucune disposition n’est stockée nulle part — deux schémas topologiquement
// identiques dessinés autrement sont le même circuit, et `memeCircuit` le sait.
//
// Les treize ont chacun leur clé canonique, et les treize sont DISTINCTES : deux
// items du fichier ne servent jamais le même circuit. Chacun a été passé à
// `formeCanonique`, `typeDeCircuit`, `diagnostiquer` et `schemaCircuit`. Ce qui
// en est ressorti :
//
//   · **Une pile, une seule.** `formeCanonique` refuse `PAS_DE_GENERATEUR` et
//     `PLUSIEURS_GENERATEURS`, et `schema.js` refuse par voie de conséquence.
//     Un item « voici un schéma où l’élève a oublié la pile » est donc
//     inécrivable en tant que FIGURE : il n’y a pas de figure. Il est écrit
//     autrement — `e05` et `t06` décrivent le dessin inachevé en français et
//     demandent quel symbole manque.
//   · **Un court-circuit ne se dessine pas.** Un fil posé aux bornes d’une lampe
//     confond ses deux nœuds à la normalisation ; l’arête devient une boucle sur
//     elle-même, la réduction série-parallèle échoue, `schema.js` rend
//     `NON_SERIE_PARALLELE` et le contrôle refuse `FIGURE_NON_ENGENDREE`. Aucune
//     figure de ce fichier ne montre un court-circuit, et ce n’est pas un choix
//     pédagogique : c’est une limite du tracé, nommée ici plutôt que découverte
//     au chapitre 7.
//   · **Un interrupteur OUVERT se dessine très bien.** La réduction ne lit pas
//     l’état ; seule la clé canonique le porte. `e06` et `t05` s’appuient
//     là-dessus, et ce sont les deux seuls items du fichier dont le registre est
//     `macro` : la question n’y porte pas sur le schéma mais sur ce que le
//     montage réel fait — rien.
//
// ── Ce que la classe B a imposé, et qui a changé le contenu ────────────────
//
// **La figure d’un item de classe B est nécessairement sa CORRECTION.** Le refus
// `FIGURE_ET_CORRECTION_DISJOINTES` compare `figure.circuit` à
// `reponse.objetFormel` par identité de référence : un item qui montrerait un
// montage FAUX et attendrait le montage CORRIGÉ porte deux graphes distincts, et
// il est refusé.
//
// C’est la contrainte la plus lourde du fichier, et elle a une conséquence qu’il
// faut écrire : **« corrige ce schéma » n’existe pas ici.** Les huit items qui
// attendent un graphe — `e01`, `e04`, `e09`, `p01`, `p04`, `t01`, `t04`, `t09` —
// décrivent le montage EN FRANÇAIS dans l’énoncé et portent le schéma attendu en
// figure, titrée « Le schéma attendu ». Les cinq items qui MONTRENT un schéma
// pour le faire lire ou critiquer — `e03`, `e06`, `p02`, `t03`, `t05` — sont de
// classe C, et c’est exactement là que part le budget de relecture : leur réponse
// est une phrase, pas un objet. Treize items portent donc une figure, huit une
// correction composable.
//
// **Ce que cela laisse ouvert, et que ce fichier n’a pas comblé.** Un item qui
// ferait corriger un montage fautif — montrer, puis attendre un graphe — est
// écrivable le jour où `figure` pourra porter un second graphe, celui qu’on
// donne, à côté de celui qu’on attend. `js/data/items/exemples.js` le contourne
// en rangeant le circuit donné dans `situation.circuit` ; c’est légitime là-bas,
// où l’item porte un piège dont la condition de validité lit ce champ. Ici, sans
// piège, `situation` ne serait lue par aucun module : le circuit donné
// n’atteindrait jamais l’écran. Le champ n’est donc employé nulle part dans ce
// fichier.
//
// ── Ce que `reponse.js` ne sait pas encore corriger ────────────────────────
//
// `FORMES_D_OBJET_FORMEL` connaît sept formes — classement, grille particulaire,
// remise en ordre, choix raisonné, où est la matière, relevé, nature et espèces.
// **Aucune ne se déclenche sur un objet formel à `dipoles`** : sur les huit items
// à graphe de ce fichier, `formeDeLObjetFormel` rend `null` et `aComposer` rend
// `null`. La correction existe pourtant, entière, dans `circuit.js`
// (`diagnostiquer`, `memeCircuit`) — elle n’est simplement pas branchée à
// `reponse.js`.
//
// Ce n’est pas une faute de ce fichier : `ch07-sf1-i01`, l’item de démonstration
// du projet, porte déjà un `reponse.objetFormel` à `dipoles` et rencontre le même
// trou. C’est écrit ici parce que huit items de plus tombent dedans, et qu’un
// contenu qui se tait sur ce qui ne s’affichera pas est un contenu qui sera
// découvert par un élève. Les huit items à `choisi`, les deux à `ordre` et les
// deux doubles QCM — douze sur vingt-cinq — sont servables aujourd’hui, et les
// cinq items à réponse rédigée sont en auto-évaluation déclarée, comme les trois
// du chapitre 1.
//
// ── Le lexique, et les lignes qu’il a fallu y écrire ───────────────────────
//
// Tout identifiant d’objet formel doit avoir son libellé français, sinon le build
// refuse `IDENTIFIANT_SANS_LIBELLE`. Les graphes en portent :
// `CHAMPS_D_OBJET_FORMEL` lit le `type` et l’`etat` de chaque dipôle, et le
// chapitre 2 est le premier à en servir. Les huit types de dipôles et les deux
// états d’interrupteur sont désormais au lexique — l’énuméré de `circuit.js` est
// fermé, la table peut donc l’être aussi, une fois, plutôt que de rattraper son
// retard chapitre après chapitre.
//
// Ce fichier y a ajouté ses propres consignes et ses propositions : trois clés de
// `LIBELLES` pour les deux doubles QCM, et une vingtaine de `LIBELLES_FORMELS`
// pour les questions, les étapes des deux permutations et les trois topologies
// décrites de `t08`. Aucun graphe de ce fichier ne porte de `resistance` : le
// conducteur ohmique et la loi d’Ohm sont de troisième, et le symbole ne figure
// dans aucun énoncé ni aucune liste de propositions.
//
// ── Le registre, et pourquoi il est presque toujours `symbolique` ──────────
//
// Vingt-trois items sur vingt-cinq sont déclarés `symbolique`, et c’est la
// lecture littérale du triplet de Johnstone : un schéma normalisé EST le registre
// symbolique de l’électricité, au même titre qu’une formule chimique l’est de la
// matière. Les deux exceptions sont `e06` et `t05`, où la question porte sur ce
// que le montage RÉEL fait — une lampe qui ne brille pas —, donc sur
// l’observable.
//
// Une proportion pareille serait suspecte ailleurs ; ici, un savoir-faire dont
// l’objet est la traduction macro → symbolique ne peut pas se répartir autrement,
// et le déclarer `macro` par souci d’équilibre reviendrait à mentir sur ce que
// l’item travaille.
//
// ── Les cercles ────────────────────────────────────────────────────────────
//
//   3   10 items   traduire un montage en schéma, ordonner les étapes du tracé
//   0   10 items   le vocabulaire graphique : quel symbole, pour quel dipôle
//   1    5 items   lire un schéma, compter ses boucles, dire pourquoi rien ne
//                  fonctionne
//
// Dix items de cercle 3 : le chapitre 1 en offrait UN sur 175, et le moteur
// signalait le plancher de cette bande comme intenable faute de vivier. Ce
// fichier le comble sans le saturer — le cercle 3 est plafonné, pas encouragé, et
// quinze items sur vingt-cinq raisonnent au lieu de figurer un geste. C’est ce
// qui rend le savoir-faire ACQUÉRABLE au sens de la charte : « au moins une des
// trois réussites porte sur un item hors cercle 3 ».
//
// ── CE QUE CE SAVOIR-FAIRE NE COUVRE PAS ───────────────────────────────────
//
//   · **Le geste de câblage.** On ne branche aucun fil, on ne visse aucune
//     douille. Tous les énoncés décrivent un montage ou montrent un schéma, et
//     demandent de le traduire, de le lire ou de dire ce qui lui manque. Le cours
//     l’écrit à l’élève.
//   · **Nommer un circuit « en série » ou « en dérivation »** : c’est
//     `ch02-sf2-distinguer-serie-et-derivation`, et il porte un piège que
//     celui-ci n’a pas. `e10` va au plus près — il fait COMPTER les boucles
//     fermées qu’on peut suivre au doigt — et s’arrête avant le mot. Le
//     savoir-faire est déclaré en `sfSollicites`, jamais en `sfPrincipal` : les
//     réussites de `e10` ne doivent pas être portées au crédit d’un savoir-faire
//     que l’item n’entraîne pas.
//   · **Où placer un voltmètre, et prévoir son indication** : c’est
//     `ch02-sf3`. `p04` fait dessiner un voltmètre aux bornes d’une lampe parce
//     que l’énoncé DIT où il va ; il ne demande jamais de le décider, et encore
//     moins ce qu’il affichera.
//   · **La tension elle-même** — sa valeur, son unité, son additivité, son
//     unicité : `ch02-sf4` à `ch02-sf6`. Aucun volt n’apparaît dans ce fichier.
//   · **L’intensité, l’ampèremètre, le sens du courant** : chapitre 7. Le symbole
//     de l’ampèremètre est reconnu (`e02`, `e05`, `p03`, `t06`, `t10` le servent
//     comme distracteur de vocabulaire), jamais placé.
//   · **La résistance et la loi d’Ohm** : troisième.
//   · **La discrimination mathématique.** Le savoir-faire ne déclare aucun
//     `prerequisMaths`, et aucun item ne porte `discriminationMaths` : en poser
//     un serait refusé (`DISCRIMINATION_SANS_PREREQUIS`), et à juste titre — il
//     n’y aurait rien à séparer.

// ════════════════════════════════════════════════════════════════════════════
// Les graphes — écrits une fois, cités partout où ils servent
// ════════════════════════════════════════════════════════════════════════════
//
// Convention de `circuit.js`, tenue sans exception : `bornes = [borne « − », borne
// « + »]` pour tout dipôle polarisé. Pour la pile, le réseau extérieur part donc
// de `bornes[1]`. Pour le voltmètre, `bornes[1]` est la borne « + », celle du
// potentiel le plus haut.
//
// Les identifiants sont ceux qu’un cahier de quatrième porte — G pour le
// générateur, L pour les lampes, K pour l’interrupteur, M pour le moteur, V pour
// le voltmètre. `schema.js` les écrit sous les symboles ; ils n’ont pas besoin
// d’un champ `nom`.

const dipole = (id, type, moins, plus, extra = {}) => Object.freeze({
  id, type, bornes: Object.freeze([moins, plus]), ...extra,
});

const circuit = (...dipoles) => Object.freeze({ dipoles: Object.freeze(dipoles) });

// ── Les graphes ATTENDUS : figure et correction sont le même objet ─────────

/** Une pile, une lampe, un interrupteur fermé, en une seule boucle. Le montage
 *  le plus court qui soit un circuit ; c’est celui du palier 1. */
const C_SERIE_LAMPE = circuit(
  dipole('G', 'pile', 'n1', 'n2'),
  dipole('L1', 'lampe', 'n2', 'n3'),
  dipole('K', 'interrupteur', 'n3', 'n1', { etat: 'ferme' }),
);

/** Deux lampes reliées aux deux mêmes points, commandées par un interrupteur.
 *  `typeDeCircuit` rend DERIVATION : l’interrupteur ne compte pas comme récepteur
 *  en série, il commande la dérivation sans en sortir. */
const C_DEUX_LAMPES_MEMES_POINTS = circuit(
  dipole('G', 'pile', 'n1', 'n2'),
  dipole('K', 'interrupteur', 'n2', 'n3', { etat: 'ferme' }),
  dipole('L1', 'lampe', 'n3', 'n1'),
  dipole('L2', 'lampe', 'n3', 'n1'),
);

/** Une lampe que tout traverse, puis deux lampes qui se partagent le reste.
 *  `typeDeCircuit` rend MIXTE — un récepteur en série avec un bloc en
 *  dérivation —, et c’est le graphe du palier non étiqueté. */
const C_UNE_LAMPE_PUIS_DEUX = circuit(
  dipole('G', 'pile', 'n1', 'n2'),
  dipole('K', 'interrupteur', 'n2', 'n3', { etat: 'ferme' }),
  dipole('L1', 'lampe', 'n3', 'n4'),
  dipole('L2', 'lampe', 'n4', 'n1'),
  dipole('L3', 'lampe', 'n4', 'n1'),
);

/** Une lampe et un moteur aux deux mêmes points : la dérivation de l’atelier,
 *  distincte de `C_DEUX_LAMPES_MEMES_POINTS` par ses dipôles. */
const C_LAMPE_ET_MOTEUR_MEMES_POINTS = circuit(
  dipole('G', 'pile', 'n1', 'n2'),
  dipole('K', 'interrupteur', 'n2', 'n3', { etat: 'ferme' }),
  dipole('L1', 'lampe', 'n3', 'n1'),
  dipole('M', 'moteur', 'n3', 'n1'),
);

/** Le seul graphe du fichier qui porte un voltmètre.
 *
 *  Sa borne « + » est du côté de la borne « + » de la pile — donc `bornes[1]`
 *  vaut `n2`. C’est ce que `sensDuCourant` lit : le voltmètre y ressort avec
 *  `sens = -1`, ce que `bienOriente` accepte. Écrit dans l’autre ordre, le même
 *  schéma aurait porté un appareil monté à l’envers, et `diagnostiquer` l’aurait
 *  dit — sur le schéma ATTENDU, c’est-à-dire sur la correction. */
const C_VOLTMETRE_AUX_BORNES_DE_LA_LAMPE = circuit(
  dipole('G', 'pile', 'n1', 'n2'),
  dipole('L1', 'lampe', 'n2', 'n3'),
  dipole('K', 'interrupteur', 'n3', 'n1', { etat: 'ferme' }),
  dipole('V', 'voltmetre', 'n3', 'n2'),
);

/** Deux lampes qui se suivent dans une seule boucle. Le graphe du test au
 *  palier 1 : aucun item d’entraînement ne le porte. */
const C_DEUX_LAMPES_QUI_SE_SUIVENT = circuit(
  dipole('G', 'pile', 'p1', 'p2'),
  dipole('L1', 'lampe', 'p2', 'p3'),
  dipole('L2', 'lampe', 'p3', 'p4'),
  dipole('K', 'interrupteur', 'p4', 'p1', { etat: 'ferme' }),
);

/** Trois lampes aux deux mêmes points — la vitrine. */
const C_TROIS_LAMPES_MEMES_POINTS = circuit(
  dipole('G', 'pile', 'p1', 'p2'),
  dipole('K', 'interrupteur', 'p2', 'p3', { etat: 'ferme' }),
  dipole('L1', 'lampe', 'p3', 'p1'),
  dipole('L2', 'lampe', 'p3', 'p1'),
  dipole('L3', 'lampe', 'p3', 'p1'),
);

/** Un moteur que tout traverse, puis deux lampes qui se partagent le reste.
 *  MIXTE lui aussi, et distinct de `C_UNE_LAMPE_PUIS_DEUX` : le dipôle en série
 *  n’est pas le même, et il n’y a pas d’interrupteur. */
const C_UN_MOTEUR_PUIS_DEUX_LAMPES = circuit(
  dipole('G', 'pile', 'p1', 'p2'),
  dipole('M', 'moteur', 'p2', 'p3'),
  dipole('L1', 'lampe', 'p3', 'p1'),
  dipole('L2', 'lampe', 'p3', 'p1'),
);

// ── Les graphes MONTRÉS : ils sont la figure d’un item de classe C ─────────
//
// Ils ne sont la correction de rien. C’est précisément ce qui interdit à leurs
// items d’être de classe B, et ce qui fait tomber les cinq en relecture humaine.

/** Une pile, un moteur, un interrupteur fermé : le schéma qu’on fait LIRE au
 *  palier 1. Sa lecture est du vocabulaire, pas un raisonnement. */
const F_MOTEUR_EN_BOUCLE = circuit(
  dipole('G', 'pile', 'm1', 'm2'),
  dipole('M', 'moteur', 'm2', 'm3'),
  dipole('K', 'interrupteur', 'm3', 'm1', { etat: 'ferme' }),
);

/** Le même montage que `C_SERIE_LAMPE`, à l’état de l’interrupteur près — et
 *  c’est tout l’item : la clé canonique porte l’état, donc ce n’est PAS le même
 *  circuit, et la lampe ne peut pas briller. */
const F_INTERRUPTEUR_OUVERT = circuit(
  dipole('G', 'pile', 'm1', 'm2'),
  dipole('L1', 'lampe', 'm2', 'm3'),
  dipole('K', 'interrupteur', 'm3', 'm1', { etat: 'ouvert' }),
);

/** Le schéma à décrire au téléphone : cinq dipôles, une lampe traversée par
 *  tout, puis un moteur et une lampe aux deux mêmes points. */
const F_SCHEMA_A_DECRIRE = circuit(
  dipole('G', 'pile', 'm1', 'm2'),
  dipole('K', 'interrupteur', 'm2', 'm3', { etat: 'ferme' }),
  dipole('L1', 'lampe', 'm3', 'm4'),
  dipole('M', 'moteur', 'm4', 'm1'),
  dipole('L2', 'lampe', 'm4', 'm1'),
);

/** Le schéma du banc de mesure, à lire dipôle par dipôle : un voltmètre y
 *  figure, aux bornes du moteur. */
const F_BANC_DE_MESURE = circuit(
  dipole('G', 'pile', 'p1', 'p2'),
  dipole('M', 'moteur', 'p2', 'p3'),
  dipole('K', 'interrupteur', 'p3', 'p1', { etat: 'ferme' }),
  dipole('V', 'voltmetre', 'p3', 'p2'),
);

/** La vitrine éteinte : une lampe et un moteur aux deux mêmes points, derrière
 *  un interrupteur ouvert. Rien ne fonctionne, et la coupure est unique. */
const F_VITRINE_ETEINTE = circuit(
  dipole('G', 'pile', 'p1', 'p2'),
  dipole('K', 'interrupteur', 'p2', 'p3', { etat: 'ouvert' }),
  dipole('L1', 'lampe', 'p3', 'p1'),
  dipole('M', 'moteur', 'p3', 'p1'),
);

// ════════════════════════════════════════════════════════════════════════════
// DÉCOUVERTE — une situation, aucune règle énoncée
// ════════════════════════════════════════════════════════════════════════════

// ⚠ Le verdict ne se donne PAS ici, et pas seulement pour laisser la question
// ouverte : les deux montages décrits ci-dessous SONT le même circuit.
// « pile, lampe, bouton en une boucle » et « pile, bouton, lampe, je referme »
// ont la même clé canonique — `memeCircuit` rend `true`, comme sur `e08`, dont
// c'est exactement la situation. Une version de ce bloc affirmait « ce n'est pas
// le même circuit » : elle posait en fait qu'il faut dire l'ORDRE des dipôles,
// c'est-à-dire la conception que le cours, `e08` et `p05` réfutent tous les
// trois — et elle la posait AVANT toute règle, là où l'élève n'a rien pour la
// contredire. La découverte laisse donc les deux idées debout, ce qui est son
// office, et le désaccord est entre Camille et Sofiane, pas dans le texte.

export const DECOUVERTE = Object.freeze({
  titre: 'Le montage dicté au téléphone',
  texte:
    'Camille a monté un circuit sur sa paillasse et doit le faire refaire à Sofiane, '
    + 'qui est chez lui. Elle le décrit au téléphone, avec ses mots à elle : « tu prends '
    + 'la pile, tu mets la lampe à côté, tu ajoutes le petit bouton, et tu relies tout ». '
    + 'Sofiane raccroche et monte quelque chose. Quand ils comparent, ils ne sont pas '
    + 'd’accord : Camille est sûre que ce n’est pas le même circuit, Sofiane est sûr que si.',
  descriptions: Object.freeze([
    'Camille : « la pile en haut, la lampe juste en dessous, le bouton à droite ».',
    'Sofiane : « la pile, puis le bouton, puis la lampe, et je referme ».',
    'Camille : « moi j’ai fait un carré, toi tu as fait un rond, mais bon ».',
  ]),
  questions: Object.freeze([
    'Sofiane a-t-il monté le même circuit que Camille, ou un autre ? Écris ta réponse '
      + 'avant de lire la suite.',
    'Camille dit que la forme du dessin — un carré ou un rond — ne change rien. '
      + 'Est-ce que tu es d’accord ? Et l’ordre dans lequel elle a cité les dipôles, '
      + 'est-ce que ça change quelque chose ?',
    'Qu’est-ce qu’il aurait fallu dire au téléphone pour qu’il n’y ait aucun doute ?',
  ]),
  cePourQuoiOnNeTranchePasEncore:
    'Aucune règle n’est donnée ici. Deux idées différentes tiennent debout à ce stade : '
    + '« il faut dire l’ordre des dipôles, sinon on ne peut pas savoir » et « l’ordre ne '
    + 'compte pas, ce qui compte c’est ce qui est relié à quoi ». Le cours ne va pas dire '
    + 'que la première est bête — elle est même le réflexe le plus utile quand on dicte. '
    + 'Il va dire ce qui, dans un circuit, se décide vraiment, et pourquoi un dessin '
    + 'normalisé règle la question que le téléphone laisse ouverte.',
});

// ════════════════════════════════════════════════════════════════════════════
// COURS — six blocs typés
// ════════════════════════════════════════════════════════════════════════════

// Deux blocs de ce cours portent une charge que leur titre ne laisse pas voir,
// et les défaire casserait des items :
//
//   · « Les symboles à connaître » dit que le VOLTMÈTRE est l'appareil qui mesure
//     une tension, et que l'ampèremètre en est un AUTRE. Sans cette phrase, rien
//     dans le fichier ne distingue les deux, et `e02`, `e05` et `t06` — qui
//     demandent tous les trois de choisir le voltmètre CONTRE l'ampèremètre —
//     n'ont aucune règle qui réfute le distracteur : elle est muette, et l'élève
//     qui répond « ampèremètre » est compté faux sans qu'on lui ait jamais rien
//     dit. Le mot « intensité » reste hors du fichier (chapitre 7) : il n'est pas
//     nécessaire pour écarter, il suffit de dire que ce n'est pas la tension.
//   · « Un schéma se relit » porte QUATRE gestes et leur ordre, et c'est cet
//     ordre-là que `t07` fait remettre. Le bloc n'en portait que trois — compter,
//     suivre, nommer — alors que `t07` en permutait quatre : la position de
//     « vérifier chaque symbole » n'était donnée nulle part, trois permutations
//     sur quatre étaient conformes au cours et une seule était acceptée. Un item
//     dont la correction ne se déduit d'aucune règle enseignée ne mesure rien.

export const COURS = Object.freeze({
  titre: 'Schématiser un circuit',
  blocs: Object.freeze([
    {
      type: 'definition',
      titre: 'Un schéma n’est pas un dessin',
      texte:
        'Le **schéma** d’un circuit est un dessin où chaque dipôle est remplacé par son '
        + '**symbole normalisé**, et où les fils sont des **traits droits**. Normalisé veut '
        + 'dire : le même partout, dans tous les cahiers et tous les livres. On ne dessine '
        + 'ni la couleur, ni la taille, ni la forme réelle des objets — un schéma n’essaie '
        + 'pas de ressembler au montage, il dit **ce qui est relié à quoi**.',
    },
    {
      type: 'propriete',
      titre: 'Les symboles à connaître en quatrième',
      texte:
        'La **pile** (ou générateur) : deux traits parallèles, l’un **long et fin** du côté '
        + 'de la borne **+**, l’autre **court et épais** du côté de la borne **−**. '
        + 'La **lampe** : un rond barré d’une croix. '
        + 'L’**interrupteur** : deux petits points, reliés par un trait quand il est '
        + '**fermé**, et un trait relevé qui laisse une **coupure** quand il est **ouvert**. '
        + 'Le **moteur** : un rond marqué **M**. '
        + 'Le **voltmètre**, c’est-à-dire l’appareil qui **mesure une tension** : un rond '
        + 'marqué **V**, avec sa borne **+** repérée. '
        + 'L’**ampèremètre** : un rond marqué **A**, avec sa borne **+** repérée lui aussi. '
        + 'C’est un **autre** appareil de mesure — il ne mesure pas la tension, et on ne '
        + 's’en sert pas dans ce chapitre ; il faut seulement savoir le reconnaître pour ne '
        + 'pas le confondre avec le voltmètre. '
        + 'Chaque symbole porte à côté de lui le **nom du dipôle** — L1, L2, K, M — pour '
        + 'qu’on puisse en parler sans le montrer du doigt.',
    },
    {
      type: 'propriete',
      titre: 'Ce qui fait un circuit, ce sont les liaisons',
      texte:
        'Deux schémas qui n’ont pas la même allure peuvent être **le même circuit** : un '
        + 'carré ou un rond, la lampe en haut ou à droite, les dipôles cités dans un autre '
        + 'ordre — rien de tout cela ne change ce qui est relié à quoi. À l’inverse, deux '
        + 'schémas qui se **ressemblent beaucoup** peuvent être deux circuits différents : '
        + 'deux lampes qui **se suivent** dans une seule boucle, et deux lampes reliées '
        + 'chacune aux **deux mêmes points**, ce n’est pas le même montage, et ça ne se '
        + 'comporte pas pareil. La seule question à se poser devant un schéma est donc : '
        + '**quels dipôles partagent le même point ?**',
    },
    {
      type: 'remarque',
      titre: 'Un schéma se relit, et voici comment',
      texte:
        'Quatre gestes, dans cet ordre : les **symboles** d’abord, les **traits** ensuite, '
        + 'les **noms** en dernier — un nom ne se pose que sur un symbole déjà arrêté. '
        + '**Compter** : autant de symboles sur le schéma que de dipôles dans le montage, '
        + 'ni un de plus, ni un de moins. **Vérifier chaque symbole** : une fois le compte '
        + 'juste, le bon dessin pour le bon dipôle. **Suivre** : on part d’une borne de la '
        + 'pile et on doit pouvoir revenir à l’autre **sans lever le crayon** — si on n’y '
        + 'arrive pas, le circuit n’est pas fermé, et alors **plus rien** ne fonctionne, pas '
        + 'seulement le dipôle qui manque. **Nommer** : chaque symbole porte son nom à côté.',
    },
    {
      type: 'remarque',
      titre: 'Ce qu’un schéma ne dit pas',
      texte:
        'Un schéma dit ce qui est relié à quoi. Il ne dit **pas** dans quel ordre les '
        + 'choses se passent, et il n’y a pas de « premier » ni de « deuxième » dipôle : '
        + 'sur une boucle, il n’y a **ni début ni fin**. Quand tu changes quelque chose '
        + 'dans un circuit, ne cherche donc pas ce qui est « avant » ou « après » — '
        + 'regarde quels points sont reliés. C’est une habitude à prendre tout de suite, '
        + 'parce qu’elle sert dans tout le reste de l’électricité.',
    },
    {
      type: 'remarque',
      titre: 'Ce que cette application ne te fera pas faire',
      texte:
        'Tu ne brancheras aucun fil ici, et tu ne visseras aucune lampe : **le câblage '
        + 's’apprend en salle, pas sur un écran**. Ce qu’on travaille, c’est ce qui vient '
        + 'avant et après — traduire un montage en schéma, lire un schéma qu’on te donne, '
        + 'repérer ce qui lui manque, et dire de deux schémas s’ils représentent le même '
        + 'circuit.',
    },
  ].map(Object.freeze)),
});

// ════════════════════════════════════════════════════════════════════════════
// MÉTHODE — un montage traduit en schéma, geste de relecture compris
// ════════════════════════════════════════════════════════════════════════════

export const METHODE = Object.freeze({
  titre: 'Traduire un montage en schéma',
  enonce:
    'Sur la paillasse : une pile plate, un interrupteur, une lampe et un petit moteur. '
    + 'Un seul fil part de chaque objet vers le suivant, et le dernier revient à la pile. '
    + 'Trace le schéma de ce montage.',
  etapes: Object.freeze([
    {
      geste: 'Fais la liste des dipôles, et donne un nom à chacun.',
      redaction:
        'Quatre dipôles : la pile G, l’interrupteur K, la lampe L1, le moteur M. Quatre '
        + 'symboles à dessiner, pas cinq — les **fils ne sont pas des dipôles**, ce sont '
        + 'les traits qui relient les symboles.',
    },
    {
      geste: 'Regarde combien de points sont partagés par plus de deux dipôles.',
      redaction:
        'Aucun : chaque objet est relié à exactement deux voisins. Le schéma sera donc une '
        + '**seule boucle**, sans embranchement — un rectangle.',
    },
    {
      geste: 'Place la pile, puis les autres symboles sur la boucle.',
      redaction:
        'La pile en bas, ses deux traits inégaux bien distincts. Les trois autres symboles '
        + 'sur la ligne du haut. Leur ordre le long de la boucle **n’a pas d’importance** : '
        + 'K, L1, M ou M, L1, K donnent le même circuit, puisque les liaisons sont les '
        + 'mêmes.',
    },
    {
      geste: 'Ferme la boucle par des traits droits.',
      redaction:
        'Deux traits verticaux referment le rectangle. Aucun trait n’en croise un autre : '
        + 'un croisement se lit comme une **connexion**, et il y en aurait une que le '
        + 'montage n’a pas.',
    },
    {
      geste: 'Écris le nom de chaque dipôle à côté de son symbole.',
      redaction: 'G, K, L1, M. Sans ces noms, on ne peut plus parler du schéma.',
    },
  ].map(Object.freeze)),
  controle:
    'Deux vérifications, dans cet ordre. **Le compte** : quatre objets sur la paillasse, '
    + 'quatre symboles sur le schéma. **La boucle** : je pose le doigt sur une borne de la '
    + 'pile, je suis les traits, je dois revenir à l’autre borne sans lever le doigt et '
    + 'sans repasser deux fois au même endroit. Si le tour se ferme, le schéma est fermé.',
  erreurQuOnAttend:
    'La faute la plus fréquente n’est pas le mauvais symbole : c’est le **fil dessiné '
    + 'comme un dipôle**, un petit rectangle de plus entre deux symboles. On se retrouve '
    + 'alors avec cinq symboles pour quatre objets, et le compte le dit tout de suite. '
    + 'La deuxième est le trait oublié entre le dernier dipôle et la pile : le schéma a '
    + 'l’air complet, et pourtant le doigt ne revient pas.',
});

// ════════════════════════════════════════════════════════════════════════════
// Les items
// ════════════════════════════════════════════════════════════════════════════

const SF = 'ch02-sf1-schematiser-un-circuit';
const CH02 = 'ch02-tension-electrique';

/** Le bloc de relecture des sept items de classe C. Le hachage porte sur l’item
 *  MOINS ce bloc, et il est recalculé à chaque édition — un item de classe C
 *  qu’on retouche sans le faire relire ressort en `RELECTURE_PERIMEE`. */
const relu = (hash) => Object.freeze({ par: 'auteur-du-corpus', date: '2026-08-13', hash });

export const ENTRAINEMENT = Object.freeze([

  // ── e01 · palier 1 · classe B · cercle 3 — la boucle la plus courte ──────
  //
  // Le montage est décrit en français, la correction est le graphe, et la figure
  // EST le graphe : un seul objet, cité deux fois. C’est ce que l’invariant 6
  // demande, et c’est aussi ce qui interdit de montrer un montage fautif ici.
  {
    id: 'ch02-sf1-e01-la-lampe-de-poche-du-labo',
    sfPrincipal: SF,
    chapitre: CH02,
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 1,
    registre: 'symbolique',
    type: 'schema-circuit',
    contexteDeSurface: 'la-lampe-de-poche-du-labo',
    enonce:
      'Sur la paillasse : une pile, une lampe et un interrupteur fermé. Un fil relie la '
      + 'pile à la lampe, un autre la lampe à l’interrupteur, un dernier l’interrupteur à '
      + 'la pile. Trace le schéma de ce montage, avec les symboles normalisés, et nomme '
      + 'les dipôles G, L1 et K.',
    figure: { sorte: 'circuit', circuit: C_SERIE_LAMPE, titre: 'Le schéma attendu' },
    reponse: { objetFormel: C_SERIE_LAMPE },
  },

  // ── e02 · palier 1 · classe B · cercle 0 — du rôle au symbole ────────────
  //
  // Choix raisonné : `choisi` est UN identifiant, `ecartes` les autres, et
  // `aComposer` en fait le jeu de propositions. Les trois écartés ne sont pas
  // décoratifs — l’ampèremètre est l’appareil de mesure voisin, le moteur et la
  // lampe sont les deux ronds que l’élève confond avec les ronds lettrés.
  {
    id: 'ch02-sf1-e02-l-appareil-qui-mesure-la-tension',
    sfPrincipal: SF,
    chapitre: CH02,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 1,
    registre: 'symbolique',
    type: 'court',
    contexteDeSurface: 'l-appareil-qui-mesure-la-tension',
    enonce:
      'Dans un montage, un appareil est chargé de mesurer la tension aux bornes de la '
      + 'lampe. Sur le schéma, il se dessine par un rond portant une lettre. Quel dipôle '
      + 'est-ce ? Choisis, et écarte les trois autres.',
    reponse: {
      objetFormel: Object.freeze({
        question: 'par-quel-symbole-se-dessine-t-il',
        choisi: 'voltmetre',
        ecartes: Object.freeze(['amperemetre', 'moteur', 'lampe']),
      }),
    },
  },

  // ── e03 · palier 1 · classe C · cercle 0 — lire un schéma ────────────────
  //
  // Le premier des cinq items qui MONTRENT un schéma. Il est de classe C parce
  // que sa figure n’est pas sa correction : la réponse est une phrase, et rien
  // ne la recalcule. C’est le prix exact de la contrainte écrite en tête.
  {
    id: 'ch02-sf1-e03-le-schema-affiche-au-tableau',
    sfPrincipal: SF,
    chapitre: CH02,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 1,
    registre: 'symbolique',
    type: 'schema-circuit',
    contexteDeSurface: 'le-schema-affiche-au-tableau',
    enonce:
      'Voici un schéma affiché au tableau. Écris, dipôle par dipôle, ce qu’il faudrait '
      + 'poser sur la paillasse pour monter ce circuit. Donne le nombre de dipôles et le '
      + 'nom de chacun.',
    figure: { sorte: 'circuit', circuit: F_MOTEUR_EN_BOUCLE, titre: 'Le schéma du tableau' },
    reponse: {
      libre: true,
      elementsAttendus: Object.freeze([
        'trois dipôles, et trois seulement',
        'une pile — les deux traits inégaux, le long et fin du côté +',
        'un moteur — le rond marqué M',
        'un interrupteur fermé — les deux points reliés par un trait',
        'les traits qui relient les symboles sont des fils, pas des dipôles à compter',
      ]),
    },
    relu: relu('128431b77bd1e476'),
  },

  // ── e04 · palier 2 · classe B · cercle 3 — deux lampes, deux mêmes points ─
  //
  // Palier 2 : le support change — la boucle unique devient un montage à
  // embranchement. `dimensionVariee: 'objet-support'`.
  //
  // L’énoncé dit « reliées aux deux mêmes points » et JAMAIS « en dérivation » :
  // le mot appartient à `ch02-sf2`, et le donner ici ferait réussir l’item à un
  // élève qui reconnaît le vocabulaire sans lire la topologie.
  {
    id: 'ch02-sf1-e04-les-deux-lampes-de-la-maquette',
    sfPrincipal: SF,
    chapitre: CH02,
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 2,
    registre: 'symbolique',
    type: 'schema-circuit',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'les-deux-lampes-de-la-maquette',
    enonce:
      'Une maquette porte une pile, un interrupteur fermé et deux lampes. Les deux lampes '
      + 'sont reliées aux deux mêmes points du montage ; l’interrupteur, lui, est sur le '
      + 'chemin commun, entre la pile et ces deux points. Trace le schéma, et nomme les '
      + 'dipôles G, K, L1 et L2.',
    figure: { sorte: 'circuit', circuit: C_DEUX_LAMPES_MEMES_POINTS, titre: 'Le schéma attendu' },
    reponse: { objetFormel: C_DEUX_LAMPES_MEMES_POINTS },
  },

  // ── e05 · palier 2 · classe B · cercle 0 — le symbole qui manque ─────────
  //
  // Palier 2, autre dimension : ce n’est plus le rôle d’un appareil qui est
  // donné, c’est l’écart entre une liste et un dessin. `grandeur-en-jeu`.
  //
  // Le dessin inachevé est DÉCRIT et non montré, et c’est une contrainte du
  // tracé, pas un choix : un schéma auquel il manque l’interrupteur reste
  // dessinable, mais le montrer donnerait la réponse — le trou se verrait.
  {
    id: 'ch02-sf1-e05-le-schema-inacheve-d-amir',
    sfPrincipal: SF,
    chapitre: CH02,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 2,
    registre: 'symbolique',
    type: 'court',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'le-schema-inacheve-d-amir',
    enonce:
      'Le montage comporte quatre dipôles : une pile, une lampe, un interrupteur, et un '
      + 'appareil qui mesure la tension aux bornes de la lampe. Amir a dessiné trois '
      + 'symboles : les deux traits inégaux de la pile, le rond barré d’une croix, et un '
      + 'rond marqué V. Quel symbole manque-t-il à son schéma ?',
    reponse: {
      objetFormel: Object.freeze({
        question: 'quel-symbole-manque-t-il',
        choisi: 'interrupteur',
        ecartes: Object.freeze(['amperemetre', 'moteur']),
      }),
    },
  },

  // ── e06 · palier 2 · classe C · cercle 1 · registre macro ────────────────
  //
  // Le schéma est complet et pourtant rien ne fonctionne : la coupure est un
  // SYMBOLE, pas un oubli. `sens-du-changement` — ce qui varie ici est l’état
  // d’un dipôle, pas le support ni la grandeur.
  //
  // Registre `macro` : la question porte sur ce que le montage réel fait, et la
  // réponse attendue nomme une observation — la lampe reste éteinte.
  {
    id: 'ch02-sf1-e06-la-lampe-qui-refuse-de-briller',
    sfPrincipal: SF,
    chapitre: CH02,
    programme: '2020',
    classe: 'C',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'schema-circuit',
    dimensionVariee: 'sens-du-changement',
    contexteDeSurface: 'la-lampe-qui-refuse-de-briller',
    enonce:
      'Ce schéma porte tous les dipôles du montage, et aucun symbole n’y est faux. '
      + 'Pourtant la lampe ne brille pas. Explique en deux phrases ce que le schéma montre, '
      + 'et ce qu’il faudrait changer sur la paillasse pour que la lampe s’allume.',
    figure: { sorte: 'circuit', circuit: F_INTERRUPTEUR_OUVERT, titre: 'Le schéma du montage' },
    reponse: {
      libre: true,
      elementsAttendus: Object.freeze([
        'l’interrupteur K est dessiné OUVERT : sa lame est relevée, elle laisse une coupure',
        'on ne peut pas partir d’une borne de la pile et revenir à l’autre sans lever le crayon',
        'le circuit n’est pas fermé : la lampe ne peut pas briller',
        'il suffit de fermer K — rien d’autre n’est à changer, aucun dipôle ne manque',
      ]),
    },
    relu: relu('5676602245ba03a9'),
  },

  // ── e07 · palier 3 · classe B · cercle 3 — la fiche méthode en désordre ──
  //
  // Palier 3 : le mode de réponse change — on ne trace plus, on ORDONNE. La
  // charte range explicitement « ordonner les étapes » dans le cercle 3, geste
  // instrumental figuré.
  //
  // Les cinq étapes sont réellement contraintes l’une par l’autre : on ne peut
  // pas placer des symboles avant d’avoir la liste, ni refermer une boucle avant
  // d’avoir placé les symboles. Une permutation arbitraire aurait fait un item
  // qui mesure la mémoire d’une fiche, pas la lecture d’un montage.
  {
    id: 'ch02-sf1-e07-la-fiche-methode-en-desordre',
    sfPrincipal: SF,
    chapitre: CH02,
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 3,
    registre: 'symbolique',
    type: 'court',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'la-fiche-methode-en-desordre',
    enonce:
      'La fiche « comment tracer le schéma d’un montage » a été découpée et ses cinq '
      + 'étapes sont mélangées. Remets-les dans l’ordre où on les fait.',
    reponse: {
      objetFormel: Object.freeze({
        question: 'ordonner-les-etapes-du-schema',
        ordre: Object.freeze([
          'lister-les-dipoles-du-montage',
          'reperer-les-points-partages-par-plus-de-deux-dipoles',
          'placer-les-symboles-normalises',
          'fermer-les-liaisons-par-des-traits-droits',
          'ecrire-le-nom-de-chaque-dipole',
        ]),
      }),
    },
  },

  // ── e08 · palier 3 · classe C · cercle 0 — double QCM ────────────────────
  //
  // Un `double-qcm` ne peut PAS porter de figure : `SORTES_PAR_TYPE` n’en ouvre
  // qu’aux trois types qui en désignent une. Les deux schémas comparés sont donc
  // décrits en toutes lettres, et c’est une vraie limite — rien de mécanique ne
  // garantit que la description dit bien ce que deux graphes diraient. C’est
  // aussi ce qui met l’item en classe C.
  //
  // Toutes les justifications sont de provenance `locale` : aucun corpus
  // d’énoncés d’élèves n’existe, et ce savoir-faire ne porte aucun piège dont on
  // pourrait reformuler les `raisonnements`. Emprunter la voix d’un piège
  // étranger aurait été s’attribuer une source qu’on n’a pas.
  {
    id: 'ch02-sf1-e08-nour-et-theo-dessinent-le-meme-montage',
    sfPrincipal: SF,
    chapitre: CH02,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 3,
    registre: 'symbolique',
    type: 'double-qcm',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'nour-et-theo-dessinent-le-meme-montage',
    enonce:
      'Nour et Théo schématisent le même montage — une pile, un interrupteur fermé et une '
      + 'lampe, reliés en une seule boucle. Nour dessine un rectangle, la pile en bas et '
      + 'la lampe en haut. Théo dessine une boucle arrondie, la pile à gauche et la lampe '
      + 'à droite, et il a cité l’interrupteur avant la lampe. Leurs deux schémas '
      + 'représentent-ils le même circuit ? Puis choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'oui-c-est-le-meme-circuit',
      choixPossibles: Object.freeze([
        'oui-c-est-le-meme-circuit',
        'non-les-dipoles-ne-sont-pas-au-meme-endroit',
        'on-ne-peut-pas-savoir',
      ]),
    },
    justifications: Object.freeze([
      {
        id: 'les-liaisons-sont-les-memes',
        texte:
          'Dans les deux schémas, chaque dipôle est relié aux deux mêmes voisins et la '
          + 'boucle se referme. Ce qui fait le circuit, ce sont ces liaisons : la forme du '
          + 'dessin et l’ordre où l’on cite les dipôles n’en font pas partie.',
        juste: true,
        provenance: 'locale',
      },
      {
        id: 'la-lampe-n-est-pas-au-meme-endroit',
        texte:
          'Chez Nour la lampe est en haut, chez Théo elle est à droite : elle n’est pas au '
          + 'même endroit, donc ce n’est pas le même circuit.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'un-rectangle-n-est-pas-un-rond',
        texte:
          'L’un a dessiné un rectangle, l’autre une boucle arrondie. Deux dessins '
          + 'différents, donc deux circuits différents.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'l-ordre-des-dipoles-a-change',
        texte:
          'Théo a mis l’interrupteur avant la lampe et Nour après : l’ordre n’est pas le '
          + 'même, on ne peut pas dire que c’est le même circuit.',
        juste: false,
        provenance: 'locale',
      },
    ]),
    relu: relu('3ec1929be1121210'),
  },

  // ── e09 · palier 4 · classe B · cercle 3 — la guirlande de l’atelier ─────
  //
  // Palier non étiqueté : rien ne dit à l’élève de quel type de montage il
  // s’agit, et il y a deux gestes à faire — repérer le point partagé, puis
  // décider de ce qui est sur le chemin commun. `typeDeCircuit` rend MIXTE, et
  // le mot n’apparaît nulle part dans l’énoncé.
  //
  // ⚠ L’énoncé est TOPOLOGIQUE, et il l’est délibérément. Il disait « en partant
  // de la pile, on rencontre d’abord l’interrupteur, puis L1 ; après L1, le
  // montage se sépare » : un parcours du circuit dans un sens, c’est-à-dire
  // exactement ce que le bloc « Ce qu’un schéma ne dit pas » interdit à l’élève
  // deux écrans plus haut — « il n’y a pas de premier ni de deuxième dipôle » —
  // et exactement l’habitude dont `raisonnement-sequentiel` est le piège. Le
  // même énoncé se dit sans aucun « avant » : quels points sont partagés, et
  // par qui.
  {
    id: 'ch02-sf1-e09-la-guirlande-de-l-atelier',
    sfPrincipal: SF,
    chapitre: CH02,
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 4,
    registre: 'symbolique',
    type: 'schema-circuit',
    contexteDeSurface: 'la-guirlande-de-l-atelier',
    enonce:
      'Un atelier monte une pile, un interrupteur fermé et trois lampes. L’interrupteur K '
      + 'et la lampe L1 sont sur le chemin commun : K partage un de ses points avec la '
      + 'pile, et l’autre avec L1. Les lampes L2 et L3, elles, sont reliées aux deux mêmes '
      + 'points — le point que L1 partage avec elles, et la seconde borne de la pile. '
      + 'Trace le schéma.',
    figure: { sorte: 'circuit', circuit: C_UNE_LAMPE_PUIS_DEUX, titre: 'Le schéma attendu' },
    reponse: { objetFormel: C_UNE_LAMPE_PUIS_DEUX },
  },

  // ── e10 · palier 4 · classe B · cercle 1 — compter les boucles ───────────
  //
  // L’item qui va au plus près de `ch02-sf2` sans y entrer : on compte les
  // boucles fermées, on ne les nomme pas. Le savoir-faire voisin est déclaré en
  // `sfSollicites` — jamais compté, jamais dénominateur.
  //
  // Cercle 1 : il n’y a rien à tracer, il y a une topologie à lire.
  {
    id: 'ch02-sf1-e10-les-boucles-a-suivre-au-doigt',
    sfPrincipal: SF,
    sfSollicites: Object.freeze(['ch02-sf2-distinguer-serie-et-derivation']),
    chapitre: CH02,
    programme: '2020',
    classe: 'B',
    cercle: 1,
    palier: 4,
    registre: 'symbolique',
    type: 'court',
    contexteDeSurface: 'les-boucles-a-suivre-au-doigt',
    enonce:
      'Un schéma porte une pile, un interrupteur fermé et deux lampes ; les deux lampes '
      + 'sont reliées aux deux mêmes points. Tu poses le doigt sur une borne de la pile et '
      + 'tu reviens à l’autre borne sans lever le doigt et sans repasser deux fois au même '
      + 'endroit. Combien de trajets différents peux-tu faire ?',
    reponse: {
      objetFormel: Object.freeze({
        question: 'combien-de-boucles-peut-on-suivre',
        choisi: 'deux-boucles',
        ecartes: Object.freeze(['une-seule-boucle', 'trois-boucles']),
      }),
    },
  },
]);

// ════════════════════════════════════════════════════════════════════════════
// PROBLÈMES — 5 items, tous au palier non étiqueté
// ════════════════════════════════════════════════════════════════════════════

export const PROBLEMES = Object.freeze([

  // ── p01 · classe B · cercle 3 — le ventilateur et la lampe ──────────────
  {
    id: 'ch02-sf1-p01-le-ventilateur-et-la-lampe-de-l-atelier',
    sfPrincipal: SF,
    chapitre: CH02,
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 4,
    registre: 'symbolique',
    type: 'schema-circuit',
    contexteDeSurface: 'le-ventilateur-et-la-lampe-de-l-atelier',
    enonce:
      'Dans une cabane, une pile alimente une lampe et un petit ventilateur — un moteur. '
      + 'Un seul interrupteur commande les deux : quand on l’ouvre, la lampe s’éteint et '
      + 'le ventilateur s’arrête en même temps. La lampe et le moteur sont branchés aux '
      + 'deux mêmes points. Trace le schéma, et nomme les dipôles G, K, L1 et M.',
    figure: {
      sorte: 'circuit', circuit: C_LAMPE_ET_MOTEUR_MEMES_POINTS, titre: 'Le schéma attendu',
    },
    reponse: { objetFormel: C_LAMPE_ET_MOTEUR_MEMES_POINTS },
  },

  // ── p02 · classe C · cercle 1 — décrire un schéma sans le montrer ───────
  //
  // L’exercice inverse de tous les autres : le schéma est donné, et c’est la
  // description en français qui est attendue. Il est de classe C pour la raison
  // habituelle — une phrase ne se recalcule pas — et c’est le seul item du
  // fichier qui demande de rendre COMPTE d’un embranchement avec des mots.
  {
    id: 'ch02-sf1-p02-le-schema-dicte-au-telephone',
    sfPrincipal: SF,
    chapitre: CH02,
    programme: '2020',
    classe: 'C',
    cercle: 1,
    palier: 4,
    registre: 'symbolique',
    type: 'schema-circuit',
    contexteDeSurface: 'le-schema-dicte-au-telephone',
    enonce:
      'Tu as ce schéma sous les yeux ; ton camarade ne l’a pas. Décris-le-lui au téléphone '
      + 'pour qu’il puisse le retracer exactement : dis combien il y a de dipôles, lesquels, '
      + 'et surtout ce qui est relié à quoi.',
    figure: { sorte: 'circuit', circuit: F_SCHEMA_A_DECRIRE, titre: 'Le schéma à décrire' },
    reponse: {
      libre: true,
      elementsAttendus: Object.freeze([
        'cinq dipôles : une pile G, un interrupteur K fermé, deux lampes L1 et L2, un moteur M',
        'K et L1 sont sur le chemin commun, entre la pile et le point où le montage se sépare',
        'L2 et M sont reliés aux deux mêmes points : c’est là que le montage se sépare en deux',
        'ces deux points sont celui que L1 partage avec eux, et la seconde borne de la pile',
        'la place des symboles sur la feuille n’a pas à être dictée : elle ne change pas le circuit',
      ]),
    },
    relu: relu('955a2f30db00b79f'),
  },

  // ── p03 · classe B · cercle 0 — du symbole au dipôle ────────────────────
  //
  // Le mouvement inverse de `e02` : on donne le dessin, on demande le nom. Les
  // trois écartés sont les trois ronds — le moteur, le voltmètre et
  // l’ampèremètre —, parce que c’est entre ronds que la confusion se joue, pas
  // entre un rond et deux traits.
  {
    id: 'ch02-sf1-p03-le-rond-barre-d-une-croix',
    sfPrincipal: SF,
    chapitre: CH02,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 4,
    registre: 'symbolique',
    type: 'court',
    contexteDeSurface: 'le-rond-barre-d-une-croix',
    enonce:
      'Sur un schéma, un dipôle est représenté par un rond barré d’une croix — deux traits '
      + 'qui se coupent en son centre, et aucune lettre. De quel dipôle est-ce le symbole ?',
    reponse: {
      objetFormel: Object.freeze({
        question: 'de-quel-dipole-est-ce-le-symbole',
        choisi: 'lampe',
        ecartes: Object.freeze(['moteur', 'voltmetre', 'amperemetre']),
      }),
    },
  },

  // ── p04 · classe B · cercle 3 — le seul voltmètre du fichier ────────────
  //
  // L’énoncé DIT où va le voltmètre — « aux bornes de la lampe » — et ne demande
  // jamais de le décider : décider, c’est `ch02-sf3`, déclaré en `sfSollicites`.
  // Ce qui est travaillé ici est le SYMBOLE et sa borne « + ».
  //
  // La polarité du voltmètre est portée par le graphe : sa borne « + » est du
  // côté de la borne « + » de la pile, et `sensDuCourant` le confirme. Un graphe
  // écrit dans l’autre ordre aurait produit une correction montrant un appareil
  // monté à l’envers — sur un schéma, qui n’est pas relu.
  {
    id: 'ch02-sf1-p04-la-tension-aux-bornes-de-la-lampe-du-banc',
    sfPrincipal: SF,
    sfSollicites: Object.freeze(['ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication']),
    chapitre: CH02,
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 4,
    registre: 'symbolique',
    type: 'schema-circuit',
    contexteDeSurface: 'la-tension-aux-bornes-de-la-lampe-du-banc',
    enonce:
      'Un banc de mesure porte une pile, une lampe et un interrupteur fermé, reliés en une '
      + 'seule boucle. On y ajoute un voltmètre, branché aux deux bornes de la lampe et à '
      + 'rien d’autre, sa borne « + » du côté de la borne « + » de la pile. Trace le schéma '
      + 'complet, et nomme les dipôles G, L1, K et V.',
    figure: {
      sorte: 'circuit', circuit: C_VOLTMETRE_AUX_BORNES_DE_LA_LAMPE, titre: 'Le schéma attendu',
    },
    reponse: { objetFormel: C_VOLTMETRE_AUX_BORNES_DE_LA_LAMPE },
  },

  // ── p05 · classe C · cercle 0 — deux schémas de même allure ─────────────
  //
  // Le pendant exact de `e08`. Là-bas, deux dessins différents pour un même
  // circuit ; ici, deux dessins qui se ressemblent pour deux circuits
  // différents. Les deux items ensemble disent ce que `memeCircuit` sait faire,
  // et ce sont les deux cas-témoins que `circuit.js` s’impose à lui-même.
  {
    id: 'ch02-sf1-p05-deux-schemas-de-meme-allure',
    sfPrincipal: SF,
    chapitre: CH02,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 4,
    registre: 'symbolique',
    type: 'double-qcm',
    contexteDeSurface: 'deux-schemas-de-meme-allure',
    enonce:
      'Deux schémas portent exactement les mêmes dipôles : une pile et deux lampes. Sur le '
      + 'premier, les deux lampes se suivent le long d’une seule boucle. Sur le second, '
      + 'chacune est reliée aux deux mêmes points, ceux de la pile. Les deux dessins ont la '
      + 'même allure et tiennent dans le même rectangle. Représentent-ils le même circuit ? '
      + 'Puis choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'non-ce-ne-sont-pas-les-memes-liaisons',
      choixPossibles: Object.freeze([
        'oui-c-est-le-meme-circuit',
        'non-ce-ne-sont-pas-les-memes-liaisons',
        'on-ne-peut-pas-savoir',
      ]),
    },
    justifications: Object.freeze([
      {
        id: 'le-point-partage-n-est-pas-le-meme',
        texte:
          'Sur le premier schéma, les deux lampes partagent un seul point, et rien d’autre '
          + 'n’y arrive. Sur le second, elles partagent leurs DEUX points, ceux de la pile. '
          + 'Ce ne sont pas les mêmes liaisons, donc pas le même circuit.',
        juste: true,
        provenance: 'locale',
      },
      {
        id: 'memes-dipoles-donc-meme-circuit',
        texte:
          'Il y a une pile et deux lampes des deux côtés, ni plus ni moins. Les mêmes '
          + 'dipôles font le même circuit.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'les-deux-dessins-tiennent-dans-le-meme-rectangle',
        texte:
          'Les deux schémas ont la même allure et occupent la même place sur la feuille : '
          + 'c’est donc le même circuit dessiné deux fois.',
        juste: false,
        provenance: 'locale',
      },
    ]),
    relu: relu('53f11f671dd58b72'),
  },
]);

// ════════════════════════════════════════════════════════════════════════════
// TEST — 10 items
// ════════════════════════════════════════════════════════════════════════════
//
// Aucun graphe, aucun montage, aucun jeu de propositions n’est repris de
// l’entraînement. Les huit circuits du test sont écrits à part, et deux d’entre
// eux — `C_DEUX_LAMPES_QUI_SE_SUIVENT` et `C_TROIS_LAMPES_MEMES_POINTS` — sont
// choisis pour n’avoir aucune clé canonique commune avec ceux de l’entraînement :
// le montage à deux lampes en boucle unique n’y figure nulle part, et la
// dérivation y compte deux lampes, pas trois.

export const TEST = Object.freeze([

  // ── t01 · palier 1 · classe B · cercle 3 ────────────────────────────────
  {
    id: 'ch02-sf1-t01-les-deux-lampes-du-couloir',
    sfPrincipal: SF,
    chapitre: CH02,
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 1,
    registre: 'symbolique',
    type: 'schema-circuit',
    contexteDeSurface: 'les-deux-lampes-du-couloir',
    enonce:
      'Une pile, deux lampes et un interrupteur fermé sont montés en une seule boucle : la '
      + 'pile est reliée à L1, L1 à L2, L2 à l’interrupteur, et l’interrupteur revient à la '
      + 'pile. Trace le schéma, et nomme les dipôles G, L1, L2 et K.',
    figure: {
      sorte: 'circuit', circuit: C_DEUX_LAMPES_QUI_SE_SUIVENT, titre: 'Le schéma attendu',
    },
    reponse: { objetFormel: C_DEUX_LAMPES_QUI_SE_SUIVENT },
  },

  // ── t02 · palier 1 · classe B · cercle 0 ────────────────────────────────
  {
    id: 'ch02-sf1-t02-les-deux-traits-inegaux',
    sfPrincipal: SF,
    chapitre: CH02,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 1,
    registre: 'symbolique',
    type: 'court',
    contexteDeSurface: 'les-deux-traits-inegaux',
    enonce:
      'Sur un schéma, un dipôle est représenté par deux traits parallèles de longueurs '
      + 'différentes : l’un long et fin, l’autre court et épais. De quel dipôle est-ce le '
      + 'symbole ?',
    reponse: {
      objetFormel: Object.freeze({
        question: 'de-quel-dipole-est-ce-le-symbole',
        choisi: 'pile',
        ecartes: Object.freeze(['interrupteur', 'lampe', 'moteur']),
      }),
    },
  },

  // ── t03 · palier 1 · classe C · cercle 0 ────────────────────────────────
  {
    id: 'ch02-sf1-t03-le-schema-du-banc-de-mesure',
    sfPrincipal: SF,
    chapitre: CH02,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 1,
    registre: 'symbolique',
    type: 'schema-circuit',
    contexteDeSurface: 'le-schema-du-banc-de-mesure',
    enonce:
      'Voici le schéma d’un banc de mesure. Écris le nombre de dipôles qu’il porte, puis '
      + 'le nom de chacun, en disant à chaque fois à quoi tu l’as reconnu sur le dessin.',
    figure: { sorte: 'circuit', circuit: F_BANC_DE_MESURE, titre: 'Le schéma du banc' },
    reponse: {
      libre: true,
      elementsAttendus: Object.freeze([
        'quatre dipôles',
        'une pile G — deux traits parallèles inégaux',
        'un moteur M — un rond marqué M',
        'un interrupteur K fermé — deux points reliés par un trait',
        'un voltmètre V — un rond marqué V, avec sa borne + repérée',
      ]),
    },
    relu: relu('890180377f3a6b60'),
  },

  // ── t04 · palier 2 · classe B · cercle 3 · objet-support ────────────────
  {
    id: 'ch02-sf1-t04-les-trois-lampes-de-la-vitrine',
    sfPrincipal: SF,
    chapitre: CH02,
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 2,
    registre: 'symbolique',
    type: 'schema-circuit',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'les-trois-lampes-de-la-vitrine',
    enonce:
      'Une vitrine est éclairée par trois lampes. Les trois sont reliées aux deux mêmes '
      + 'points du montage, et un seul interrupteur fermé les commande toutes : il se '
      + 'trouve entre la pile et ces deux points. Trace le schéma, et nomme les dipôles G, '
      + 'K, L1, L2 et L3.',
    figure: {
      sorte: 'circuit', circuit: C_TROIS_LAMPES_MEMES_POINTS, titre: 'Le schéma attendu',
    },
    reponse: { objetFormel: C_TROIS_LAMPES_MEMES_POINTS },
  },

  // ── t05 · palier 2 · classe C · cercle 1 · registre macro ───────────────
  {
    id: 'ch02-sf1-t05-la-vitrine-eteinte',
    sfPrincipal: SF,
    chapitre: CH02,
    programme: '2020',
    classe: 'C',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'schema-circuit',
    dimensionVariee: 'sens-du-changement',
    contexteDeSurface: 'la-vitrine-eteinte',
    enonce:
      'Ce schéma est complet : aucun dipôle n’y manque et aucun symbole n’y est faux. '
      + 'Pourtant, ni la lampe ni le moteur ne fonctionnent. Dis quel symbole du schéma '
      + 'l’explique, et pourquoi les DEUX sont arrêtés et pas seulement l’un des deux.',
    figure: { sorte: 'circuit', circuit: F_VITRINE_ETEINTE, titre: 'Le schéma de la vitrine' },
    reponse: {
      libre: true,
      elementsAttendus: Object.freeze([
        'l’interrupteur K est dessiné ouvert : sa lame relevée laisse une coupure',
        'K est sur le chemin commun, entre la pile et le point où le montage se sépare',
        'aucune boucle ne part de la pile et n’y revient : le circuit est ouvert',
        'les deux dipôles sont donc arrêtés ensemble, ce n’est pas l’un qui empêche l’autre',
      ]),
    },
    relu: relu('86c9bcfeabda965d'),
  },

  // ── t06 · palier 2 · classe B · cercle 0 · grandeur-en-jeu ──────────────
  {
    id: 'ch02-sf1-t06-le-schema-inacheve-de-lina',
    sfPrincipal: SF,
    chapitre: CH02,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 2,
    registre: 'symbolique',
    type: 'court',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'le-schema-inacheve-de-lina',
    enonce:
      'Le montage comporte quatre dipôles : une pile, un moteur, un interrupteur, et un '
      + 'appareil qui mesure la tension aux bornes du moteur. Lina a dessiné trois '
      + 'symboles : les deux traits inégaux, un rond marqué M, et deux points reliés par un '
      + 'trait. Quel symbole manque-t-il à son schéma ?',
    reponse: {
      objetFormel: Object.freeze({
        question: 'quel-symbole-manque-t-il',
        choisi: 'voltmetre',
        ecartes: Object.freeze(['amperemetre', 'lampe']),
      }),
    },
  },

  // ── t07 · palier 3 · classe B · cercle 3 · mode-de-reponse ──────────────
  //
  // La permutation porte cette fois sur la RELECTURE d’un schéma, pas sur son
  // tracé : les quatre étapes ne sont pas celles de `e07`, et le test ne recopie
  // donc pas son objet formel.
  {
    id: 'ch02-sf1-t07-la-relecture-avant-de-rendre',
    sfPrincipal: SF,
    chapitre: CH02,
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 3,
    registre: 'symbolique',
    type: 'court',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'la-relecture-avant-de-rendre',
    enonce:
      'Ton schéma est tracé et tu vas le rendre. Les quatre gestes de relecture sont '
      + 'donnés dans le désordre : remets-les dans l’ordre où on les fait.',
    reponse: {
      objetFormel: Object.freeze({
        question: 'ordonner-les-etapes-de-la-relecture',
        ordre: Object.freeze([
          'compter-les-symboles-et-les-comparer-aux-dipoles-du-montage',
          'verifier-que-chaque-symbole-est-le-bon',
          'suivre-la-boucle-du-doigt-sans-lever-la-main',
          'verifier-que-chaque-dipole-porte-son-nom',
        ]),
      }),
    },
  },

  // ── t08 · palier 3 · classe B · cercle 1 · mode-de-reponse ──────────────
  //
  // Le seul item du fichier dont les propositions sont des DESCRIPTIONS de
  // schéma plutôt que des dipôles. Il est de cercle 1 : rien n’est à tracer, il
  // faut comparer trois topologies décrites à un montage décrit.
  {
    id: 'ch02-sf1-t08-trois-descriptions-un-seul-montage',
    sfPrincipal: SF,
    chapitre: CH02,
    programme: '2020',
    classe: 'B',
    cercle: 1,
    palier: 3,
    registre: 'symbolique',
    type: 'court',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'trois-descriptions-un-seul-montage',
    enonce:
      'Le montage est le suivant : une pile, puis deux lampes que le même fil relie l’une '
      + 'à l’autre, et un interrupteur fermé qui referme la boucle sur la pile. Trois '
      + 'schémas ont été proposés, et un seul convient. Lequel ?',
    reponse: {
      objetFormel: Object.freeze({
        question: 'lequel-de-ces-schemas-represente-le-montage',
        choisi: 'une-seule-boucle-ou-les-deux-lampes-se-suivent',
        ecartes: Object.freeze([
          'deux-branches-portant-chacune-une-lampe',
          'une-boucle-ou-la-deuxieme-lampe-est-reliee-par-un-seul-fil',
        ]),
      }),
    },
  },

  // ── t09 · palier 4 · classe B · cercle 3 ────────────────────────────────
  //
  // Énoncé topologique, pour la raison écrite en tête de `e09` : il faisait
  // « sortir de la pile », « passer d'abord par le moteur », puis « se séparer
  // après le moteur ». Le montage se dit sans un seul « avant », et il se dit
  // aussi précisément — `memeCircuit` compare des liaisons, pas des parcours.
  {
    id: 'ch02-sf1-t09-le-moteur-et-les-deux-lampes',
    sfPrincipal: SF,
    chapitre: CH02,
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 4,
    registre: 'symbolique',
    type: 'schema-circuit',
    contexteDeSurface: 'le-moteur-et-les-deux-lampes',
    enonce:
      'Une pile alimente un moteur et deux lampes, sans aucun interrupteur. Le moteur est '
      + 'seul sur le chemin commun : il partage un de ses points avec la pile. Les deux '
      + 'lampes sont reliées aux deux mêmes points — l’autre point du moteur, et la seconde '
      + 'borne de la pile. Trace le schéma, et nomme les dipôles G, M, L1 et L2.',
    figure: {
      sorte: 'circuit', circuit: C_UN_MOTEUR_PUIS_DEUX_LAMPES, titre: 'Le schéma attendu',
    },
    reponse: { objetFormel: C_UN_MOTEUR_PUIS_DEUX_LAMPES },
  },

  // ── t10 · palier 4 · classe B · cercle 0 ────────────────────────────────
  {
    id: 'ch02-sf1-t10-le-rond-marque-d-une-lettre',
    sfPrincipal: SF,
    chapitre: CH02,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 4,
    registre: 'symbolique',
    type: 'court',
    contexteDeSurface: 'le-rond-marque-d-une-lettre',
    enonce:
      'Sur un schéma, trois dipôles se dessinent par un rond marqué d’une lettre. Celui-ci '
      + 'porte un M, et aucune borne n’est repérée à côté de lui. De quel dipôle est-ce le '
      + 'symbole ?',
    reponse: {
      objetFormel: Object.freeze({
        question: 'de-quel-dipole-est-ce-le-symbole',
        choisi: 'moteur',
        ecartes: Object.freeze(['voltmetre', 'amperemetre', 'lampe']),
      }),
    },
  },
]);

/** Les 25 items du savoir-faire, dans l’ordre des trois sections. C’est cette
 *  liste que `validerItem` et `tools/verifier-contenu.mjs` lisent. */
export default Object.freeze([...ENTRAINEMENT, ...PROBLEMES, ...TEST]);
