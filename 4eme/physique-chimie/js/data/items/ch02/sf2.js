// Chapitre 2, savoir-faire 2 — « Distinguer un circuit en série d’un circuit en
// dérivation ».
//
// Premier contenu écrit CONTRE `js/circuit.js`. Le chapitre 1 n’avait produit
// qu’un seul item de cercle 3 sur 175 et n’avait jamais fait tourner le
// vérificateur topologique : ses douze codes d’erreur, sa forme canonique et ses
// cas-témoins n’étaient exercés que par eux-mêmes. Ce fichier est le premier à
// s’en servir pour de bon, et ce qui suit dit ce que le vérificateur a imposé, ce
// qu’il a refusé, et où le savoir-faire s’arrête.
//
// ── Ce que ce fichier contient ─────────────────────────────────────────────
//
//   DECOUVERTE   deux guirlandes, aucune règle énoncée
//   COURS        six blocs typés
//   METHODE      un exercice résolu en deux colonnes, geste de contrôle compris
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
//   B  18   la correction est DÉRIVÉE du graphe par `circuit.js`
//   C   7   relu par un humain, scellé ; 7 sur 25, soit 28 %, sous le tiers
//
//   Aucun item de classe A ni A′, et ce n’est pas une facilité : **il n’y a
//   rien à calculer ici**. Une topologie n’est pas un nombre — « ces deux
//   lampes sont-elles en série ? » n’a pas de chaîne à rejouer en rationnels
//   exacts, et la fabriquer (compter des branches, diviser par le nombre de
//   nœuds) aurait produit un calcul qui ne mesure pas le savoir-faire. La
//   garantie mécanique de ce fichier n’est pas l’arithmétique, c’est la classe
//   B : les 18 items qui la portent ne contiennent AUCUNE correction écrite à
//   la main. Elle sort du graphe, par `typeDeCircuit`, `memeCircuit` et
//   `diagnostiquer` — voir « la correction ne se saisit pas » plus bas.
//
// ── Répartition des cercles ────────────────────────────────────────────────
//
//   cercle 3  15   lecture ou construction d’un schéma
//   cercle 1   2   raisonnement sur un dispositif décrit
//   cercle 0   8   raisonnement conceptuel : ce qui reste allumé, et pourquoi
//
// Soit 60 % de cercle 3, contre une bande de 10 à 20 %. Ce n’est pas une
// infraction et il faut dire pourquoi, sinon quelqu’un « corrigera » le fichier :
// **la bande porte sur les séances effectivement générées, jamais sur le stock**
// (charte, § « La proportion cible »), et c’est `seance.js` qui la tient. Un
// savoir-faire de cercle 3 dont le vivier serait à 15 % de cercle 3 ne fournirait
// simplement rien à composer. Le chapitre 1 laissait le moteur signaler le
// plancher de cette bande comme intenable faute de vivier ; c’est ce vivier-là
// que ce fichier remplit.
//
// Les 10 items hors cercle 3 ne sont pas un quota : ils sont la condition
// d’acquisition. « Aucun savoir-faire n’est déclaré acquis sur des items de
// cercle 3 seuls » — un schéma à l’écran relève de la simulation informatique,
// la moitié BASSE de l’éventail de Shavelson, et le contrôle refuse
// (`SAVOIR_FAIRE_TOUT_EN_CERCLE_3`) un savoir-faire qui n’en porterait pas. Ils
// travaillent tous quelque chose que le geste ne donne pas : prévoir ce qui
// reste allumé, dire pourquoi deux dessins sont le même circuit, critiquer une
// mesure prise au bon geste sur le mauvais dipôle.
//
// « Au moins un » n’est pourtant pas la vraie barre, et il fallait la vérifier
// plutôt que la supposer : `estMaitrise` exige que les TROIS DERNIÈRES RÉUSSITES
// portent ensemble une réussite hors cercle 3, un double QCM juste/juste, au
// plus une classe C, une réussite au format diagnostique du piège, et le palier
// le plus haut déjà rencontré. Le vivier le permet, et par un chemin unique :
//
//   `e09`             seul item `estFormatDiagnostique` — palier 3, classe B, cercle 3
//   un double QCM     `e08`, `p03` ou `t07` — palier 3, classe C, cercle 0 ou 1,
//                     donc il tient à lui seul « hors cercle 3 » et « double QCM »,
//                     et il est la SEULE classe C admise des trois
//   un item palier 4  de classe B — huit sont disponibles
//
// Ce chemin passe par un point de rupture qu’il faut connaître : `e09` est le
// seul item du savoir-faire au format diagnostique. Le retirer, ou le rendre
// injouable, rend le savoir-faire définitivement inacquérable sans qu’aucun
// contrôle ne le dise autrement que par `FORMAT_DIAGNOSTIQUE_SANS_ITEM`.
//
// ── La correction ne se saisit pas : elle sort du graphe ───────────────────
//
// C’est le point qui fait tout le fichier, et c’est la reprise, sur un autre
// objet, de ce que le chapitre 1 avait fait des dossiers documentaires : la
// grandeur manquante n’y était pas écrite à côté du dossier, elle en était
// DÉRIVÉE. Ici, trois fonctions de trois lignes suffisent, et elles n’appellent
// que `js/circuit.js` :
//
//   `allureDe(circuit)`          → `typeDeCircuit` : série, dérivation ou mixte ;
//   `verdictDuDevissage(c, id)`  → `diagnostiquer` sur le graphe PRIVÉ de la
//                                  lampe dévissée : le circuit est-il ouvert,
//                                  les autres lampes sont-elles isolées ;
//   `allumeesSansLui(c, id)`     → la liste de celles qui restent traversées.
//
// Conséquence à mesurer : `choix: allureDe(PAILLASSE_SERIE)` vaut `'en-serie'`
// parce que le graphe le dit, et le jour où quelqu’un déplacera une borne dans
// le graphe, la correction suivra toute seule. Le chapitre 1 écrivait encore
// `choix:` à la main sur ses items de classe B ; c’est le seul endroit où sa
// classe B laissait une couture, et elle est fermée ici.
//
// ── Ce que le schéma a refusé, et qui a changé le contenu ──────────────────
//
//   · **La question est portée par le GRAPHE.** `item.js` compare la figure et
//     la correction par IDENTITÉ DE RÉFÉRENCE : sur un item de classe B,
//     `figure.circuit` et `reponse.objetFormel` doivent être le même objet.
//     Il n’y a donc aucune place pour un objet qui envelopperait le circuit et
//     porterait la consigne — `{ question, circuit }` est refusé deux fois
//     (FIGURE_ET_CORRECTION_DISJOINTES, puis CHAMP_D_OBJET_FORMEL_INCONNU sur
//     `circuit`). Les circuits de ce fichier portent donc un champ `question`,
//     que `circuit.js` ignore et que le lexique dit en français. C’est la seule
//     forme qui passe, et elle a une vertu : la consigne ne peut pas être
//     détachée du graphe auquel elle s’applique.
//   · **« Corrige ce montage » ne peut PAS porter le piège.** La condition de
//     validité de `mesurer-en-coupant-le-circuit` exige que l’appareil à placer
//     ne figure pas encore au circuit (`g.parId.has(mesure.appareil)` → faux).
//     Or un montage à corriger porte l’appareil, mal placé : c’est tout son
//     objet. Les trois items de correction de ce fichier (`e06`, `p04`, `t10`)
//     ne déclarent donc AUCUN piège, et ce n’est pas un oubli — la condition a
//     raison, un item où l’appareil est déjà posé ne teste plus le geste de
//     placement, il teste la lecture d’un montage fait. Ils sont de classe C
//     pour la même raison mécanique : la figure montre le montage FAUTIF et la
//     correction est un AUTRE graphe, donc l’identité de référence est
//     impossible.
//   · **Le double QCM ne peut pas porter le piège non plus**, et c’est plus
//     gênant : la condition exige `demande: 'schema'`, or un double QCM ne rend
//     pas de schéma. La deuxième condition de maîtrise réclame pourtant une
//     réussite juste/juste. Les trois doubles QCM d’ici (`e08`, `p03`, `t07`)
//     travaillent la conception du piège et citent ses `raisonnements` dans
//     leurs justifications, mais ils ne sont pas comptés à son crédit par le
//     suivi. C’est une limite du catalogue, pas du contenu, et elle est écrite
//     ici plutôt que contournée par une `situation` complaisante.
//   · **Un montage court-circuité ne se dessine pas.** `schemaCircuit` passe par
//     `formeCanonique`, qui REFUSE un graphe non série-parallèle : un fil posé
//     aux bornes d’une lampe confond ses deux nœuds et la réduction échoue
//     (FIGURE_NON_ENGENDREE). Les montages fautifs servis en figure sont donc
//     tous des montages réductibles — voltmètre inséré dans la boucle,
//     voltmètre aux mauvaises bornes, deux lampes montées en série quand on en
//     voulait deux en dérivation. Le court-circuit reste dans le cours et dans
//     les constats du piège, jamais dans une figure.
//   · **La polarité entre dans la clé du circuit.** `serialiser` écrit `>` ou
//     `<` derrière chaque dipôle polarisé : un voltmètre retourné n’est pas le
//     même circuit. Les huit voltmètres correctement branchés de ce fichier
//     déclarent donc leurs bornes dans l’ordre `[COM, +]` avec le « + » du côté
//     du potentiel le plus haut, c’est-à-dire vers la borne « + » de la pile.
//     Une inversion ne produit pas un item plus difficile : elle produit un
//     BORNE_INVERSEE sur la correction elle-même.
//
// ── LE COMPARATEUR N’EST PAS `memeCircuit`, ET C’EST LE POINT LE PLUS ───────
//    DANGEREUX DU FICHIER
//
// Ce fichier a d’abord été écrit en annonçant que les schémas rendus seraient
// comparés par `memeCircuit`. C’est FAUX pour les six items de mesure, et le
// vérifier prend trois lignes :
//
//     memeCircuit(MONTAGE_DE_YANIS, MONTAGE_DE_YANIS_CORRIGE)  →  true
//
// C’est-à-dire : le montage que `t10` sert comme FAUTIF et la correction que le
// même item attend sont LE MÊME CIRCUIT pour la forme canonique. La raison est
// écrite dans `circuit.js` sans y être présentée comme une limite : `serialiser`
// n’écrit que le TYPE d’un dipôle, jamais son identité. Trois lampes en série
// sont donc trois occurrences interchangeables de `lampe`, et « voltmètre aux
// bornes de L2 » a exactement la même clé que « voltmètre aux bornes de L1 ».
//
// Quatre des six items de mesure sont exposés, et deux ne le sont pas :
//
//   e04, e09  la cible est une lampe d’une chaîne de deux → confondue avec l’autre
//   t04, t10  la cible est une lampe d’une chaîne de trois → confondue avec les deux autres
//   e07, p02  la cible est le récepteur EN SÉRIE d’un mixte → topologiquement unique
//   t06       la cible est la pile → topologiquement unique
//
// Ce qui rend l’erreur coûteuse plutôt que théorique : la faute ainsi acceptée
// est EXACTEMENT celle que le piège existe pour attraper — son troisième
// constat, « le geste est bon, la cible ne l’est pas », celui dont
// `electricite.js` dit qu’une relecture adverse l’avait trouvé sans réfutation.
// Corriger ces items au `memeCircuit` referait la faute d’un cran plus bas, dans
// le comparateur cette fois, et elle y serait invisible : l’élève lirait
// « juste ».
//
// Le bon comparateur existe déjà et il ne demande rien de nouveau — chaque item
// de mesure déclare la cible dans sa `situation.mesure` :
//
//     diagnostiquer(schemaDeLEleve, {
//       graphe: item.reponse.objetFormel,
//       mesure: { appareil: 'V', auxBornesDe: item.situation.mesure.cible },
//     })
//
// Sur le montage de Yanis, il rend `['VOLTMETRE_AUX_MAUVAISES_BORNES']` — le
// code que `circuit.js` a écrit pour ça, avec son message préécrit. C’est le
// contrat de correction de ces six items, et il est écrit ici parce que la
// couche qui corrigera n’existe pas encore (voir la section suivante).
//
// `memeCircuit` reste le bon comparateur pour `e10` et `t08`, qui ne portent
// aucun appareil et demandent précisément « le même circuit, autrement dessiné ».
// C’est la question qu’il sait trancher, et il la tranche : le schéma de Sam et
// celui de la paillasse ont la même clé.
//
// ── CE QUE L’APPLICATION NE SAIT PAS ENCORE SERVIR ─────────────────────────
//
// `reponse.js` ne connaît pas la forme « circuit » : `FORMES_D_OBJET_FORMEL` n’a
// pas d’entrée pour `dipoles`, donc `formeDeLObjetFormel` rend `null`,
// `aComposer` rend `null`, et les onze items dont la réponse est un graphe sont
// INERTES à l’écran — ils s’affichent avec « question suivante » et rien à
// composer. Ce n’est pas propre à ce fichier ; c’est la même dette que la
// huitième forme (`nature-et-especes`), et elle se solde dans `reponse.js` et
// `app.js`, pas ici.
//
// Mais il y a une conséquence qui, elle, se voit tout de suite et qui est plus
// grave que l’inertie. `figureDeLEnonce` ne tait la figure que si `aComposer`
// déclare `figureEstLaReponse` ; sur `null`, elle l’AFFICHE. Or l’invariant 6
// impose `figure.circuit === reponse.objetFormel` sur un item de classe B :
// huit items — `e04`, `e07`, `e09`, `e10`, `p02`, `t04`, `t06`, `t08` — montrent
// donc au-dessus de leur énoncé exactement le schéma que l’énoncé demande de
// composer, voltmètre posé et orienté compris. C’est le défaut que `app.js`
// décrit avoir corrigé pour les treize grilles de particules, resservi ici par
// une forme qu’il ne connaît pas encore.
//
// Les trois items de correction de montage (`e06`, `p04`, `t10`) n’en souffrent
// pas : leur figure est le montage FAUTIF, la correction est un autre graphe, et
// la montrer est le sujet même de l’item.
//
// ── Le piège, et sa couverture ─────────────────────────────────────────────
//
//   mesurer-en-coupant-le-circuit   6 items, paliers 1 à 4
//   aucun piège                    19 items
//
// Les six sont les seuls que la condition de validité accepte : un montage
// donné, un appareil à placer qui n’y est pas encore, un dipôle cible qui y est,
// et au moins deux récepteurs — sans quoi « aux bornes de la lampe » et « aux
// bornes de la pile » sont le même branchement et l’item ne distingue rien.
//
// Les paliers 2 et 3 déclarent deux dimensions DISTINCTES, sans quoi le refus
// MEME_DIMENSION_AUX_DEUX_PALIERS n’aurait rien à mordre :
//
//   palier 2 → `objet-support`    le montage n’est plus une simple boucle : le
//                                 dipôle à mesurer est dans un circuit mixte,
//                                 puis dans une chaîne de trois lampes ;
//   palier 3 → `mode-de-reponse`  on ne complète plus un schéma donné, on
//                                 CONSTRUIT le schéma entier à partir d’un
//                                 texte, appareil compris.
//
// `e09` est l’item déclaré au format diagnostique, et son motif dit exactement
// quelle moitié du format il tient et laquelle il ne tient pas.
//
// ── L’ATTRIBUTION DES CONCEPTIONS, PASSÉE AU CRIBLE ────────────────────────
//
// Un distracteur ou une justification fausse ne se rattache pas à un piège parce
// que le sujet se ressemble : il s’y rattache si la RÈGLE et le CONTRÔLE de ce
// piège RÉFUTENT la réponse fausse. La première rédaction de ce fichier portait
// quatre rattachements ; trois ne tenaient pas, et le pire donnait raison à
// l’élève.
//
//   RETIRÉ  `e02` / « l’interrupteur est en série avec les lampes, donc tout le
//           montage est en série » → `raisonnement-sequentiel`. Erreur de
//           généralisation de la partie au tout ; la règle du piège porte sur
//           l’aval qui agit sur l’amont et n’en dit rien. Son contrôle, appliqué
//           mot pour mot, CONFIRME l’élève.
//   RETIRÉ  `p01` / « beaucoup de fils en sortent, donc les lampes sont sur des
//           branches différentes » → `reponse-conforme-sans-adhesion`. Ce piège
//           exige une PAIRE d’items appariés et réfute l’écart entre une loi
//           récitée et une prédiction. Il est muet sur une topologie déduite du
//           nombre de fils visibles.
//   REFAIT  `e03` / le distracteur ne pouvait pas être réfuté tant qu’on
//           dévissait la PREMIÈRE lampe : le piège dit lui-même qu’une
//           modification en amont ne teste rien. On dévisse la DERNIÈRE, et la
//           règle mord.
//   CHANGÉ  `t07` / « en série, la tension est la même partout » →
//           `courant-qui-s-use` devenait `mesurer-en-coupant-le-circuit`. La
//           règle de l’ancien piège est « en série, l’INTENSITÉ est la même en
//           tout point » : servie à cet élève, elle lui donne raison par
//           analogie sur le motif exact de son erreur — et traîne le chapitre 7
//           dans un savoir-faire qui le déclare hors périmètre. Le bon piège
//           porte cette faute dans sa `conception`, au mot près.
//
// Il reste UN distracteur (`e03`) et CINQ justifications fausses rattachées.
// Le distracteur porte la clé du choix faux, donc `distracteurTouche` le
// reconnaît et l’élève reçoit la réfutation de SA conception ; les distracteurs
// à identifiant descriptif, eux, ne sont jamais touchés et ne réfutent personne.
//
// ── D’où viennent les justifications des doubles QCM ───────────────────────
//
// Le corpus d’énoncés d’élèves n’existe pas. Les justifications fausses qui
// correspondent à un raisonnement du catalogue sont `reformulee` et citent leur
// source dans `js/data/pieges/electricite.js` ; celles qui n’y correspondent à
// rien — « l’ordre n’est pas le même, donc ce n’est pas le même circuit » — sont
// `locale`, c’est-à-dire écrites ici et assumées comme telles. Aucune citation
// institutionnelle n’est inventée.
//
// ── CE QUE CE SAVOIR-FAIRE NE COUVRE PAS ───────────────────────────────────
//
//   · **Le geste réel.** On ne visse aucun fil, on ne branche rien. Tous les
//     énoncés portent sur un montage DÉJÀ FAIT ou sur un schéma à composer, et
//     le cours l’écrit à l’élève. « Mettre en œuvre » est hors périmètre.
//   · **La valeur affichée par le voltmètre.** « Prévoir ce qu’il indiquera »
//     est `ch02-sf3`, la lire avec son calibre est `ch02-sf4`. Ici, aucun item
//     ne demande un nombre de volts : ce qu’on demande, c’est OÙ l’appareil se
//     pose et CE QUE le montage devient. C’est aussi pourquoi aucun item ne
//     porte d’unité.
//   · **Les lois de tension.** Unicité (`ch02-sf5`) et additivité (`ch02-sf6`)
//     supposent la distinction série/dérivation, elles ne s’y enseignent pas.
//     Aucun énoncé d’ici ne fait additionner ni égaler deux tensions.
//   · **L’ampèremètre.** Le piège est symétrique et son deuxième constat porte
//     sur un ampèremètre posé en travers d’un moteur, mais l’intensité est le
//     chapitre 7 et l’ordre « tension avant intensité » est une décision
//     assumée du plan. Servir ici un ampèremètre reviendrait à demander à
//     l’élève de brancher un appareil dont il ne sait pas encore ce qu’il
//     mesure ; le dispositif existe, il sera servi par `ch07-sf1`.
//   · **La résistance et le rhéostat.** Hors attendus du chapitre.
//   · **La discrimination mathématique.** Le savoir-faire ne déclare aucun
//     `prerequisMaths` — il n’y a pas une opération dans tout le fichier —, et
//     poser un `discriminationMaths` serait refusé (DISCRIMINATION_SANS_PREREQUIS).

import { diagnostiquer, typeDeCircuit } from '../../../circuit.js';

// ════════════════════════════════════════════════════════════════════════════
// Les objets formels — un graphe écrit une fois, cité partout où il sert
// ════════════════════════════════════════════════════════════════════════════
//
// Convention de bornes, imposée par `circuit.js` et valable pour tout dipôle
// polarisé : `bornes = [ borne « − » (COM) , borne « + » ]`. Le courant sort de
// la pile par sa borne « + », donc par `bornes[1]`. Un voltmètre est bien
// orienté quand le courant du dipôle qu’il observe va de sa borne « + » vers sa
// borne « COM » — autrement dit quand ses bornes sont déclarées `[aval, amont]`.

const dip = (id, type, moins, plus, extra = {}) => Object.freeze({
  id, type, bornes: Object.freeze([moins, plus]), ...extra,
});

/** Un montage simplement MONTRÉ : il n’est pas la correction, il est le
 *  stimulus. Pas de `question` — rien ne le compose. */
const montage = (dipoles) => Object.freeze({ dipoles: Object.freeze(dipoles) });

/** Un montage qui est AUSSI la correction : il porte la consigne, parce que
 *  l’identité de référence n’ouvre aucun autre endroit où l’écrire. */
const aComposer = (question, dipoles) => Object.freeze({
  question, dipoles: Object.freeze(dipoles),
});

// ── Les trois dérivations de correction, et rien d’autre ───────────────────

const ALLURES = Object.freeze({ SERIE: 'en-serie', DERIVATION: 'en-derivation', MIXTE: 'mixte' });

/** Série, dérivation ou mixte — lu sur le graphe, jamais déclaré. `typeDeCircuit`
 *  écarte les voltmètres avant de conclure : un circuit série muni d’un
 *  voltmètre correctement branché reste un circuit série, et c’est la question
 *  posée à l’élève. */
const allureDe = (c) => ALLURES[typeDeCircuit(c).type];

/** Ce qui reste traversé quand on dévisse une lampe : le graphe est privé de
 *  cette lampe et `diagnostiquer` le relit. Un circuit ouvert éteint tout ; une
 *  lampe qu’aucune boucle ne traverse est isolée. Personne n’écrit la réponse. */
const allumeesSansLui = (c, id) => {
  const prive = { dipoles: c.dipoles.filter((d) => d.id !== id) };
  const r = diagnostiquer(prive);
  if (!r.ok) return null;
  const ouvert = r.constats.some((k) => k.code === 'CIRCUIT_OUVERT');
  const isolees = new Set(r.constats.filter((k) => k.code === 'DIPOLE_ISOLE').flatMap((k) => k.dipoles));
  return c.dipoles
    .filter((d) => d.type === 'lampe' && d.id !== id && !ouvert && !isolees.has(d.id))
    .map((d) => d.id);
};

/** Les deux issues offertes à l’élève, choisies par la liste précédente. Le
 *  raccourci « toutes ou aucune » ne vaut que sur un montage purement série ou
 *  purement en dérivation : les items mixtes de ce fichier ne posent pas cette
 *  question-là, ils posent celle du branchement. */
const verdictDuDevissage = (c, id) => (allumeesSansLui(c, id).length === 0
  ? 'toutes-les-autres-s-eteignent'
  : 'les-autres-restent-allumees');

const ISSUES_DU_DEVISSAGE = Object.freeze([
  'toutes-les-autres-s-eteignent',
  'les-autres-restent-allumees',
]);

const ALLURES_POSSIBLES = Object.freeze(['en-serie', 'en-derivation', 'mixte']);

// ── Les montages de l’entraînement ─────────────────────────────────────────

/** Deux lampes et un interrupteur sur une seule boucle. Le montage le plus
 *  simple qui soit, et celui sur lequel « en série » se lit sans le mot. */
const PAILLASSE_SERIE = aComposer('ce-montage-est-il-en-serie-ou-en-derivation', [
  dip('P', 'pile', 'a', 'b'),
  dip('K', 'interrupteur', 'b', 'c', { etat: 'ferme' }),
  dip('L1', 'lampe', 'c', 'd'),
  dip('L2', 'lampe', 'd', 'a'),
]);

/** Les mêmes trois dipôles, mais les deux lampes partagent leurs deux bornes :
 *  l’interrupteur commande la dérivation sans en faire partie, et `circuit.js`
 *  le sait — il ne compte pas comme le récepteur qui rendrait le montage mixte. */
const COULOIR_DERIVATION = aComposer('ce-montage-est-il-en-serie-ou-en-derivation', [
  dip('P', 'pile', 'a', 'b'),
  dip('K', 'interrupteur', 'b', 'c', { etat: 'ferme' }),
  dip('L1', 'lampe', 'c', 'd'),
  dip('L2', 'lampe', 'c', 'd'),
  dip('F', 'fil', 'd', 'a'),
]);

/** Trois lampes sur une boucle unique : dévisser la première ouvre le circuit,
 *  et `allumeesSansLui` rend la liste vide. */
const PORTIQUE_SERIE_TROIS = aComposer('que-deviennent-les-autres-si-on-devisse-une-lampe', [
  dip('P', 'pile', 'a', 'b'),
  dip('L1', 'lampe', 'b', 'c'),
  dip('L2', 'lampe', 'c', 'd'),
  dip('L3', 'lampe', 'd', 'e'),
  dip('K', 'interrupteur', 'e', 'a', { etat: 'ferme' }),
]);

/** Le montage DONNÉ de `e04` : aucun appareil de mesure, deux récepteurs. Il
 *  porte la `situation`, et c’est sur lui que la condition de validité du piège
 *  se lit. */
const BORD_DONNE = montage([
  dip('P', 'pile', 'a', 'b'),
  dip('L1', 'lampe', 'b', 'c'),
  dip('L2', 'lampe', 'c', 'd'),
  dip('K', 'interrupteur', 'd', 'a', { etat: 'ferme' }),
]);

/** Le montage ATTENDU : le même, voltmètre posé en travers de L2. Le courant va
 *  de `c` vers `d` dans la lampe, donc le potentiel est plus haut en `c` : les
 *  bornes du voltmètre s’écrivent `['d', 'c']`. */
const BORD_AVEC_VOLTMETRE = aComposer('ou-brancher-le-voltmetre', [
  dip('P', 'pile', 'a', 'b'),
  dip('L1', 'lampe', 'b', 'c'),
  dip('L2', 'lampe', 'c', 'd'),
  dip('K', 'interrupteur', 'd', 'a', { etat: 'ferme' }),
  dip('V', 'voltmetre', 'd', 'c'),
]);

/** Deux lampes en dérivation, servies sans schéma : c’est le support qui varie
 *  au palier 2, pas la question. */
const VITRINE_DERIVATION = aComposer('que-deviennent-les-autres-si-on-devisse-une-lampe', [
  dip('P', 'pile', 'a', 'b'),
  dip('K', 'interrupteur', 'b', 'c', { etat: 'ferme' }),
  dip('L1', 'lampe', 'c', 'd'),
  dip('L2', 'lampe', 'c', 'd'),
  dip('F', 'fil', 'd', 'a'),
]);

/** Le montage de Léa : le voltmètre inséré dans la boucle, entre les deux
 *  lampes. `diagnostiquer` en dit deux choses — VOLTMETRE_EN_SERIE, qui se
 *  corrige, et CIRCUIT_OUVERT, qui en est la conséquence — et le schéma reste
 *  parfaitement traçable, ce qui est la condition pour le montrer. */
const MONTAGE_DE_LEA = montage([
  dip('P', 'pile', 'a', 'b'),
  dip('L1', 'lampe', 'b', 'c'),
  dip('V', 'voltmetre', 'c', 'd'),
  dip('L2', 'lampe', 'd', 'a'),
]);

/** Ce que Léa aurait dû dessiner. Le courant va de `c` vers `a` dans L2. */
const MONTAGE_DE_LEA_CORRIGE = aComposer('corrige-le-montage', [
  dip('P', 'pile', 'a', 'b'),
  dip('L1', 'lampe', 'b', 'c'),
  dip('L2', 'lampe', 'c', 'a'),
  dip('V', 'voltmetre', 'a', 'c'),
]);

/** Le phare : une lampe traversée par tout le courant, puis deux qui se le
 *  partagent. `typeDeCircuit` le déclare MIXTE — et pas « en dérivation » —
 *  parce qu’un récepteur est en série avec le bloc, ce qui est exactement la
 *  lecture qu’on demande. */
const PHARE_MIXTE = montage([
  dip('P', 'pile', 'a', 'b'),
  dip('L1', 'lampe', 'b', 'c'),
  dip('L2', 'lampe', 'c', 'a'),
  dip('L3', 'lampe', 'c', 'a'),
]);

/** Voltmètre aux bornes de L1, la lampe en série : le courant va de `b` vers
 *  `c`, donc les bornes s’écrivent `['c', 'b']`. */
const PHARE_AVEC_VOLTMETRE = aComposer('ou-brancher-le-voltmetre', [
  dip('P', 'pile', 'a', 'b'),
  dip('L1', 'lampe', 'b', 'c'),
  dip('L2', 'lampe', 'c', 'a'),
  dip('L3', 'lampe', 'c', 'a'),
  dip('V', 'voltmetre', 'c', 'b'),
]);

/** Le montage décrit en toutes lettres de `e09` : il n’est pas dessiné, l’élève
 *  le construit. La `situation` le porte quand même — la condition de validité
 *  du piège se lit sur un graphe, pas sur une phrase. */
const SONNETTE_DONNEE = montage([
  dip('P', 'pile', 'a', 'b'),
  dip('K', 'interrupteur', 'b', 'c', { etat: 'ferme' }),
  dip('L1', 'lampe', 'c', 'd'),
  dip('L2', 'lampe', 'd', 'a'),
]);

const SONNETTE_AVEC_VOLTMETRE = aComposer('ou-brancher-le-voltmetre', [
  dip('P', 'pile', 'a', 'b'),
  dip('K', 'interrupteur', 'b', 'c', { etat: 'ferme' }),
  dip('L1', 'lampe', 'c', 'd'),
  dip('L2', 'lampe', 'd', 'a'),
  dip('V', 'voltmetre', 'a', 'd'),
]);

/** Le schéma de Sam : deux lampes et un interrupteur en série, dessinés dans un
 *  autre ordre, avec d’autres noms de nœuds et un fil de liaison de plus. C’est
 *  le MÊME circuit que `PAILLASSE_SERIE` — `memeCircuit` le dit, et c’est
 *  précisément ce que l’item fait travailler. */
const SCHEMA_DE_SAM = aComposer('redessine-le-meme-circuit', [
  dip('G', 'pile', 'n1', 'n2'),
  dip('Lb', 'lampe', 'n2', 'n3'),
  dip('f', 'fil', 'n3', 'n4'),
  dip('La', 'lampe', 'n4', 'n5'),
  dip('I', 'interrupteur', 'n5', 'n1', { etat: 'ferme' }),
]);

// ── Les montages des problèmes ─────────────────────────────────────────────

/** Le classement du palier non étiqueté : deux situations racontées, aucune
 *  n’étant dessinée, et le mot « série » n’apparaît nulle part dans l’énoncé.
 *  Les CLÉS sont des étiquettes françaises écrites par l’auteur ; seules les
 *  valeurs sont des identifiants, que le lexique dit. */
const CLASSEMENT_DES_PANNES = Object.freeze({
  question: 'range-chaque-montage',
  categories: Object.freeze(['montage-en-serie', 'montage-en-derivation']),
  affectation: Object.freeze({
    'la guirlande où une seule lampe grillée éteint toute la rangée': 'montage-en-serie',
    'les deux lampes du couloir, dont une grillée laisse l’autre allumée': 'montage-en-derivation',
    'les deux feux du vélo, qui s’éteignent ensemble quand on débranche le premier': 'montage-en-serie',
    'les lampes du plafond de la classe, qu’on remplace une par une sans éteindre les autres': 'montage-en-derivation',
  }),
});

const ATELIER_DONNE = montage([
  dip('P', 'pile', 'a', 'b'),
  dip('K', 'interrupteur', 'b', 'c', { etat: 'ferme' }),
  dip('L1', 'lampe', 'c', 'd'),
  dip('L2', 'lampe', 'd', 'a'),
  dip('L3', 'lampe', 'd', 'a'),
]);

/** Voltmètre aux bornes de L1 : le courant va de `c` vers `d`. */
const ATELIER_AVEC_VOLTMETRE = aComposer('ou-brancher-le-voltmetre', [
  dip('P', 'pile', 'a', 'b'),
  dip('K', 'interrupteur', 'b', 'c', { etat: 'ferme' }),
  dip('L1', 'lampe', 'c', 'd'),
  dip('L2', 'lampe', 'd', 'a'),
  dip('L3', 'lampe', 'd', 'a'),
  dip('V', 'voltmetre', 'd', 'c'),
]);

/** Le montage de Noah : deux lampes en série, alors qu’on lui demandait qu’en
 *  dévisser une laisse l’autre allumée. */
const MONTAGE_DE_NOAH = montage([
  dip('P', 'pile', 'a', 'b'),
  dip('K', 'interrupteur', 'b', 'c', { etat: 'ferme' }),
  dip('L1', 'lampe', 'c', 'd'),
  dip('L2', 'lampe', 'd', 'a'),
]);

const MONTAGE_DE_NOAH_CORRIGE = aComposer('corrige-le-montage', [
  dip('P', 'pile', 'a', 'b'),
  dip('K', 'interrupteur', 'b', 'c', { etat: 'ferme' }),
  dip('L1', 'lampe', 'c', 'd'),
  dip('L2', 'lampe', 'c', 'd'),
  dip('F', 'fil', 'd', 'a'),
]);

/** Trois lampes en dérivation directe sur la pile, sans interrupteur : la
 *  prédiction engagée porte sur celle du milieu. */
const RAMPE_DERIVATION = aComposer('que-deviennent-les-autres-si-on-devisse-une-lampe', [
  dip('P', 'pile', 'a', 'b'),
  dip('L1', 'lampe', 'b', 'a'),
  dip('L2', 'lampe', 'b', 'a'),
  dip('L3', 'lampe', 'b', 'a'),
]);

// ── Les montages du test ───────────────────────────────────────────────────
//
// « Aucun n’est repris de l’entraînement » : c’est ce qui était écrit ici, et
// `memeCircuit` le contredit. Deux topologies REVIENNENT, et il vaut mieux les
// nommer que les nier :
//
//   pile[S(interrupteur:ferme|lampe|lampe|lampe)]  `e03` et `t01`
//   pile[S(P(lampe|lampe)|interrupteur:ferme)]     `e02`, `e05`, la correction de
//                                                  `p04`, le montage donné de `t06`
//
// Ce n’est pas rattrapable et il ne faut pas essayer : avec deux formes — une
// boucle, un bloc en dérivation — et trois lampes au plus, un savoir-faire ne
// dispose pas de vingt-cinq topologies distinctes. Ce qui doit ne pas se
// répéter, c’est la TÂCHE posée sur une topologie donnée, et là, rien ne se
// répète : `t01` demande l’allure d’un montage dont `e03` demandait ce qu’il
// devient quand on dévisse une lampe ; `t06` fait CONSTRUIRE sans modèle, le
// voltmètre aux bornes de la pile, une forme que `e02` donnait à lire. Un test
// qui recopie mesure la mémoire de l’item ; un test qui repose une AUTRE
// question sur une forme connue mesure le savoir-faire.

const GUIRLANDE_SERIE = aComposer('ce-montage-est-il-en-serie-ou-en-derivation', [
  dip('P', 'pile', 'a', 'b'),
  dip('K', 'interrupteur', 'b', 'c', { etat: 'ferme' }),
  dip('L1', 'lampe', 'c', 'd'),
  dip('L2', 'lampe', 'd', 'e'),
  dip('L3', 'lampe', 'e', 'a'),
]);

const VITRINE_TROIS_BRANCHES = aComposer('ce-montage-est-il-en-serie-ou-en-derivation', [
  dip('P', 'pile', 'a', 'b'),
  dip('K', 'interrupteur', 'b', 'c', { etat: 'ferme' }),
  dip('L1', 'lampe', 'c', 'd'),
  dip('L2', 'lampe', 'c', 'd'),
  dip('L3', 'lampe', 'c', 'd'),
  dip('F', 'fil', 'd', 'a'),
]);

/** Deux lampes directement aux bornes de la pile, sans interrupteur : le
 *  montage en dérivation le plus dépouillé qui soit. */
const FRIGO_DERIVATION = aComposer('que-deviennent-les-autres-si-on-devisse-une-lampe', [
  dip('P', 'pile', 'a', 'b'),
  dip('L1', 'lampe', 'b', 'a'),
  dip('L2', 'lampe', 'b', 'a'),
]);

const ETABLI_DONNE = montage([
  dip('P', 'pile', 'a', 'b'),
  dip('L1', 'lampe', 'b', 'c'),
  dip('L2', 'lampe', 'c', 'd'),
  dip('L3', 'lampe', 'd', 'a'),
]);

/** Voltmètre aux bornes de L3, la dernière de la chaîne : le courant va de `d`
 *  vers `a`, donc les bornes s’écrivent `['a', 'd']`. */
const ETABLI_AVEC_VOLTMETRE = aComposer('ou-brancher-le-voltmetre', [
  dip('P', 'pile', 'a', 'b'),
  dip('L1', 'lampe', 'b', 'c'),
  dip('L2', 'lampe', 'c', 'd'),
  dip('L3', 'lampe', 'd', 'a'),
  dip('V', 'voltmetre', 'a', 'd'),
]);

const BUREAU_DONNE = montage([
  dip('P', 'pile', 'a', 'b'),
  dip('K', 'interrupteur', 'b', 'c', { etat: 'ferme' }),
  dip('L1', 'lampe', 'c', 'd'),
  dip('L2', 'lampe', 'c', 'd'),
  dip('F', 'fil', 'd', 'a'),
]);

/** Le seul voltmètre du fichier posé aux bornes de la PILE, et non d’une lampe.
 *  Le courant sort par la borne « + », en `b`, et revient en `a` : les bornes
 *  du voltmètre s’écrivent donc `['a', 'b']`. */
const BUREAU_AVEC_VOLTMETRE = aComposer('ou-brancher-le-voltmetre', [
  dip('P', 'pile', 'a', 'b'),
  dip('K', 'interrupteur', 'b', 'c', { etat: 'ferme' }),
  dip('L1', 'lampe', 'c', 'd'),
  dip('L2', 'lampe', 'c', 'd'),
  dip('F', 'fil', 'd', 'a'),
  dip('V', 'voltmetre', 'a', 'b'),
]);

/** Le schéma de Maya : un circuit MIXTE, dessiné avec deux fils de liaison et
 *  les dipôles rencontrés dans un autre ordre. */
const SCHEMA_DE_MAYA = aComposer('redessine-le-meme-circuit', [
  dip('G', 'pile', 'm1', 'm2'),
  dip('La', 'lampe', 'm2', 'm3'),
  dip('f', 'fil', 'm3', 'm4'),
  dip('Lb', 'lampe', 'm4', 'm5'),
  dip('Lc', 'lampe', 'm4', 'm5'),
  dip('I', 'interrupteur', 'm5', 'm1', { etat: 'ferme' }),
]);

const CLASSEMENT_DES_ATELIERS = Object.freeze({
  question: 'range-chaque-montage',
  categories: Object.freeze(['montage-en-serie', 'montage-en-derivation']),
  affectation: Object.freeze({
    'les trois lampes de l’atelier, qu’un seul interrupteur allume et qui s’éteignent toutes si l’une grille': 'montage-en-serie',
    'les phares et les feux arrière d’une voiture, qui fonctionnent séparément': 'montage-en-derivation',
    'la sonnette et la lampe du portail, branchées l’une après l’autre sur la même boucle': 'montage-en-serie',
    'les prises d’une maison, dont on peut débrancher une sans couper les autres': 'montage-en-derivation',
  }),
});

/** Le montage de Yanis : le voltmètre est bien en dérivation — le geste est
 *  acquis — mais aux bornes de L1 alors qu’on demandait L2. C’est le troisième
 *  constat du piège, celui qu’un contrôle en un seul temps valide à tort. */
const MONTAGE_DE_YANIS = montage([
  dip('P', 'pile', 'a', 'b'),
  dip('L1', 'lampe', 'b', 'c'),
  dip('L2', 'lampe', 'c', 'd'),
  dip('L3', 'lampe', 'd', 'a'),
  dip('V', 'voltmetre', 'c', 'b'),
]);

const MONTAGE_DE_YANIS_CORRIGE = aComposer('corrige-le-montage', [
  dip('P', 'pile', 'a', 'b'),
  dip('L1', 'lampe', 'b', 'c'),
  dip('L2', 'lampe', 'c', 'd'),
  dip('L3', 'lampe', 'd', 'a'),
  dip('V', 'voltmetre', 'd', 'c'),
]);

// ── Les identités qui ne se réécrivent pas ─────────────────────────────────

const SF = 'ch02-sf2-distinguer-serie-et-derivation';
const CH = 'ch02-tension-electrique';
const PIEGE = 'mesurer-en-coupant-le-circuit';

// ════════════════════════════════════════════════════════════════════════════
// DÉCOUVERTE — une situation, aucune règle énoncée
// ════════════════════════════════════════════════════════════════════════════

export const DECOUVERTE = Object.freeze({
  titre: 'Deux guirlandes, deux pannes qui ne se ressemblent pas',
  texte:
    'Deux guirlandes attendent dans le même carton depuis un an. On les branche. '
    + 'La première reste entièrement noire. La deuxième s’allume, sauf une lampe au '
    + 'milieu. On les démonte : dans les deux, une seule lampe est grillée — la même '
    + 'panne, exactement.',
  questions: Object.freeze([
    'Une seule lampe est morte dans chaque guirlande. Pourquoi la première est-elle '
      + 'entièrement éteinte et pas la deuxième ? Écris ta réponse avant de lire la suite.',
    'Sans rien démonter, quel geste te permettrait de savoir, sur une guirlande qui '
      + 'marche, à laquelle des deux familles elle appartient ?',
    'Dans laquelle des deux le courant a-t-il un seul chemin possible ? Dessine ce '
      + 'chemin du doigt, en partant de la prise et en y revenant.',
  ]),
  cePourQuoiOnNeTranchePasEncore:
    'Aucune règle n’est donnée ici. Deux idées différentes tiennent debout à ce stade : '
    + '« la deuxième guirlande a plusieurs fils, la première n’en a qu’un » et « les lampes '
    + 'de la deuxième sont plus solides ». Le cours ne va pas dire que la seconde est bête — '
    + 'elle est même la première chose qu’on vérifie quand un appareil tombe en panne. Il va '
    + 'dire pourquoi elle ne peut pas expliquer CE cas-là, où les deux lampes grillées sont '
    + 'identiques, et ce qu’il faut regarder à la place : non pas les lampes, mais la façon '
    + 'dont les fils les relient.',
});

// ════════════════════════════════════════════════════════════════════════════
// COURS — six blocs typés
// ════════════════════════════════════════════════════════════════════════════

export const COURS = Object.freeze({
  titre: 'En série, en dérivation : ce que les fils décident',
  blocs: Object.freeze([
    {
      type: 'definition',
      titre: 'En série',
      texte:
        'Des dipôles sont montés **en série** quand ils sont sur la **même boucle** : le '
        + 'courant n’a qu’un seul chemin, il les traverse **l’un après l’autre**. On peut '
        + 'partir d’une borne de la pile et revenir à l’autre en passant par tous, sans jamais '
        + 'avoir à choisir. Conséquence immédiate : **si l’un s’arrête, tout s’arrête**, parce '
        + 'qu’il n’existe aucun autre chemin.',
    },
    {
      type: 'definition',
      titre: 'En dérivation',
      texte:
        'Des dipôles sont montés **en dérivation** quand ils ont leurs **deux bornes '
        + 'communes** : le courant arrive à un point où les fils se séparent — un **nœud** —, '
        + 'et il **se partage** entre plusieurs branches qui se rejoignent plus loin. Chaque '
        + 'branche est un chemin complet à elle seule : **si l’une s’ouvre, les autres '
        + 'continuent**.',
    },
    {
      type: 'propriete',
      titre: 'Le geste qui tranche, et qui ne demande rien d’autre qu’un doigt',
      texte:
        'Pose ton doigt sur la borne « + » de la pile et suis le fil. **Compte les endroits '
        + 'où tu dois choisir.** Aucun choix jusqu’au retour : c’est une **série**. Au moins un '
        + 'point où trois fils se rejoignent, donc un choix : il y a une **dérivation**. Ce '
        + 'geste ne dépend ni de la place des symboles sur la feuille, ni de la longueur des '
        + 'traits : il ne regarde que **ce qui est relié à quoi**.',
    },
    {
      type: 'propriete',
      titre: 'Deux dessins peuvent être le même circuit',
      texte:
        'Un schéma n’est pas une photographie du montage : c’est la **carte de ses '
        + 'liaisons**. Deux schémas qui n’ont ni la même forme, ni le même ordre, ni les mêmes '
        + 'noms peuvent donc être **le même circuit** — il suffit que chaque dipôle y soit '
        + 'relié aux mêmes voisins. Déplacer l’interrupteur avant la lampe plutôt qu’après ne '
        + 'change **rien** : c’est toujours la même boucle. Et l’inverse est vrai aussi — deux '
        + 'schémas qui se ressemblent beaucoup peuvent être deux circuits différents, si un '
        + 'seul fil ne part pas du même point.',
    },
    {
      type: 'remarque',
      titre: 'Il existe des montages mixtes',
      texte:
        'Un circuit n’est pas toujours entièrement l’un ou l’autre. Une lampe peut être '
        + 'traversée par **tout** le courant, puis deux autres se le partager après elle : on '
        + 'dit alors que le montage est **mixte**. Ce n’est pas un troisième mystère, c’est un '
        + 'assemblage des deux — et « série » comme « dérivation » sont alors des réponses '
        + 'incomplètes, pas des réponses fausses.',
    },
    {
      type: 'remarque',
      titre: 'Ce que cette application ne te fera pas faire',
      texte:
        'Tu ne visseras aucun fil ici, et tu ne brancheras rien : **le geste se fait en salle, '
        + 'pas sur un écran**. Ce qu’on travaille, c’est ce qui vient avant et après — lire un '
        + 'schéma, dire où un appareil se pose, prévoir ce que le montage devient, reconnaître '
        + 'que deux dessins sont le même circuit. Et un point qui coûte cher à qui l’ignore : '
        + 'un **voltmètre se pose en travers, sans rien couper**, alors qu’un ampèremètre '
        + 's’insère dans la boucle. Le savoir ne suffit pas — encore faut-il le voir sur le '
        + 'schéma, et c’est là que ça se joue.',
    },
  ].map(Object.freeze)),
});

// ════════════════════════════════════════════════════════════════════════════
// MÉTHODE — un exercice résolu, geste de contrôle compris
// ════════════════════════════════════════════════════════════════════════════

export const METHODE = Object.freeze({
  titre: 'Lire un montage, et dire où poser le voltmètre',
  enonce:
    'Un schéma porte une pile, un interrupteur fermé et deux lampes L1 et L2. En partant de '
    + 'la borne « + » de la pile, on rencontre l’interrupteur, puis un point où deux fils '
    + 'partent ensemble vers L1 et vers L2 ; les deux fils se retrouvent ensuite au même point, '
    + 'qui revient à la borne « − ». Ce montage est-il en série ou en dérivation ? Et où '
    + 'faut-il poser le voltmètre pour mesurer la tension aux bornes de L2 ?',
  etapes: Object.freeze([
    {
      geste: 'Pars de la borne « + » et suis le fil du doigt, en comptant les choix.',
      redaction:
        'Borne « + » → interrupteur → un point où **deux fils partent**. Il y a un choix : '
        + 'ce point est un **nœud**. Le montage n’est donc pas une boucle unique.',
    },
    {
      geste: 'Regarde ce que les branches ont en commun.',
      redaction:
        'L1 et L2 partent du même point et arrivent au même point : elles ont leurs **deux '
        + 'bornes communes**. Elles sont donc montées **en dérivation**.',
    },
    {
      geste: 'Vérifie par le test du dévissage, qui ne demande aucun calcul.',
      redaction:
        'Si je dévisse L1, il reste le chemin qui passe par L2 : **L2 reste allumée**. C’est '
        + 'bien une dérivation ; en série, tout se serait éteint.',
    },
    {
      geste: 'Pour le voltmètre : une tension se mesure ENTRE deux points, pas sur un trajet.',
      redaction:
        'Je ne coupe rien. Je pose le voltmètre **en travers de L2**, un fil sur chacune de '
        + 'ses deux bornes. La borne « + » de l’appareil va du côté d’où vient le courant, '
        + 'c’est-à-dire du côté de la borne « + » de la pile.',
    },
    {
      geste: 'Nomme ce que tu mesures, pas seulement où tu l’as posé.',
      redaction:
        'Mes deux fils encadrent **L2**, et rien d’autre : je mesure la tension **aux bornes '
        + 'de L2**. Posé de la même façon sur L1, l’appareil aurait donné une valeur tout '
        + 'aussi lisible — et qui n’aurait pas répondu à la question.',
    },
  ].map(Object.freeze)),
  controle:
    'Deux vérifications, dans cet ordre, et la deuxième est celle qu’on oublie. **Un** : enlève '
    + 'l’appareil par la pensée. Si le circuit se retrouve **coupé**, c’est que tu l’avais mis '
    + 'en série — bon pour un ampèremètre, faux pour un voltmètre. S’il continue de fonctionner '
    + 'comme si l’appareil n’était pas là, c’est une dérivation, et c’est ce qu’il faut pour un '
    + 'voltmètre. **Deux** : relis la question et suis du doigt les deux fils de ton appareil. '
    + 'Aboutissent-ils bien de part et d’autre du dipôle **qu’on te demandait**, pas de son '
    + 'voisin, pas de deux d’un coup ? Un branchement irréprochable peut mesurer autre chose que '
    + 'ce qu’on t’a demandé, et rien à l’écran ne te le dira.',
  erreurQuOnAttend:
    'La faute la plus fréquente n’est pas de se tromper de mot : c’est de **couper le fil pour y '
    + 'insérer le voltmètre**, comme on insère un ampèremètre. Le circuit s’ouvre, les lampes '
    + 's’éteignent, et l’appareil affiche presque toute la tension de la pile — une valeur qui a '
    + 'l’air correcte. C’est ce qui la rend coûteuse : la panne ne se voit pas dans le nombre.',
});

// ════════════════════════════════════════════════════════════════════════════
// ENTRAÎNEMENT — 10 items
// ════════════════════════════════════════════════════════════════════════════

export const ENTRAINEMENT = Object.freeze([

  // ── e01 — palier 1 · classe B · cercle 3 · la lecture nue ────────────────
  //
  // Le schéma est engendré par le graphe, et la correction sort du même graphe :
  // `allureDe(PAILLASSE_SERIE)` vaut `'en-serie'` parce que `typeDeCircuit` le
  // dit. Rien n’est écrit à la main, donc rien ne peut diverger du dessin.
  {
    id: 'ch02-sf2-e01-deux-lampes-de-la-paillasse',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 1,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'deux-lampes-de-la-paillasse',
    enonce:
      'Voici le montage réalisé sur la paillasse. Pars de la borne « + » de la pile et suis '
      + 'le fil du doigt : les deux lampes sont-elles montées en série ou en dérivation ?',
    figure: { sorte: 'circuit', circuit: PAILLASSE_SERIE, titre: 'Le montage de la paillasse' },
    reponse: {
      objetFormel: PAILLASSE_SERIE,
      libre: false,
      choix: allureDe(PAILLASSE_SERIE),
      choixPossibles: ALLURES_POSSIBLES,
    },
  },

  // ── e02 — palier 1 · classe B · cercle 3 · l’autre allure ────────────────
  //
  // Même question, même palier, même mode de réponse : ce qui change est le
  // circuit, et c’est tout ce qui doit changer. L’interrupteur est en série avec
  // le bloc en dérivation, et `typeDeCircuit` ne s’y trompe pas — il ne compte
  // pas comme un récepteur, donc le montage n’est pas mixte.
  //
  // AUCUN DISTRACTEUR, et c’est un retrait, pas un oubli. Cet item en portait un
  // — « l’interrupteur est bien l’un après l’autre avec les lampes, donc tout le
  // montage est en série » — rattaché à `raisonnement-sequentiel`. La relecture
  // adverse l’a refusé : cette erreur est une GÉNÉRALISATION DE LA PARTIE AU
  // TOUT, et la règle du piège (« ce que tu ajoutes après le point de mesure
  // change aussi ce qui s’y lit ») n’en dit rien. Pire, son contrôle — « repars
  // du dipôle et suis la boucle du doigt ; s’il est sur la même boucle, il est
  // concerné » — CONFIRME l’élève : oui, l’interrupteur est bien sur la même
  // boucle que les lampes, et c’est justement ce dont il tirait « en série ».
  // Aucun piège du catalogue ne réfute cette erreur-là ; le schéma interdit un
  // distracteur sans piège, et un distracteur mal rattaché rééduque sur une
  // conception que l’élève n’a pas. Il est donc retiré plutôt que replacé.
  {
    id: 'ch02-sf2-e02-lampes-du-couloir',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 1,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'lampes-du-couloir',
    enonce:
      'Les deux lampes du couloir sont branchées sur la même pile, avec un seul interrupteur. '
      + 'Regarde où les fils se séparent et où ils se rejoignent : ce montage est-il en série '
      + 'ou en dérivation ?',
    figure: { sorte: 'circuit', circuit: COULOIR_DERIVATION, titre: 'Les deux lampes du couloir' },
    reponse: {
      objetFormel: COULOIR_DERIVATION,
      libre: false,
      choix: allureDe(COULOIR_DERIVATION),
      choixPossibles: ALLURES_POSSIBLES,
    },
  },

  // ── e03 — palier 1 · classe B · cercle 0 · l’item qui raisonne ───────────
  //
  // Le premier des dix items hors cercle 3, et il n’est pas là pour faire le
  // compte : sans lui le savoir-faire n’est jamais acquérable. La correction est
  // dérivée deux fois — la liste des lampes qui restent traversées, puis le
  // verdict binaire — et l’une comme l’autre sortent de `diagnostiquer` sur le
  // graphe privé de la lampe retirée.
  //
  // ON DÉVISSE L3, ET LE CHOIX DE LA LAMPE EST CE QUI FAIT L’ITEM. L’item
  // dévissait L1, la PREMIÈRE de la chaîne, et son distracteur était rattaché à
  // `raisonnement-sequentiel` : la relecture adverse a montré que le piège ne
  // pouvait pas y mordre. Le piège dit lui-même pourquoi — « une modification en
  // AMONT ne teste rien, les deux modèles y prédisent la même chose ». Un élève
  // qui raisonne en séquence, L1 retirée, prédit exactement la bonne réponse :
  // tout ce qui vient après s’éteint. Le distracteur décrivait donc une erreur
  // que ce piège ne produit pas, et sa règle ne la réfutait pas.
  //
  // En retirant L3, la DERNIÈRE de la chaîne, la modification passe en aval de
  // ce qu’on observe, et c’est le cas que le piège existe pour attraper : « L1 et
  // L2 sont avant, le courant y est déjà passé, elles restent allumées ». La
  // règle la contredit mot pour mot (« ce que tu ajoutes après le point de mesure
  // change aussi ce qui s’y lit ») et le contrôle aussi (« repars du dipôle et
  // suis la boucle : tu reviens à ton point de mesure »). Le distracteur porte en
  // outre la CLÉ DU CHOIX FAUX, ce qui le rend cochable : `distracteurTouche` le
  // reconnaît, et l’élève qui coche reçoit la réfutation de sa conception au lieu
  // de celle de l’item.
  {
    id: 'ch02-sf2-e03-portique-a-trois-lampes',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 1,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'portique-a-trois-lampes',
    enonce:
      'Les trois lampes du portique sont montées comme le montre ce schéma : en partant de la '
      + 'borne « + » de la pile, on rencontre L1, puis L2, puis L3. On dévisse L3, la dernière, '
      + 'et on la retire. Que deviennent L1 et L2 ?',
    figure: { sorte: 'circuit', circuit: PORTIQUE_SERIE_TROIS, titre: 'Le portique à trois lampes' },
    reponse: {
      objetFormel: PORTIQUE_SERIE_TROIS,
      libre: false,
      choix: verdictDuDevissage(PORTIQUE_SERIE_TROIS, 'L3'),
      choixPossibles: ISSUES_DU_DEVISSAGE,
      allumees: allumeesSansLui(PORTIQUE_SERIE_TROIS, 'L3'),
    },
    distracteurs: [
      {
        // La clé du choix faux : le distracteur est COCHABLE, et cocher revient à
        // dire « L1 et L2 sont avant la lampe retirée, elles restent allumées ».
        id: 'les-autres-restent-allumees',
        texte:
          'L1 et L2 sont avant L3 : quand le courant arrive à la lampe qu’on a retirée, il '
          + 'les a déjà traversées. Ce qui vient après ne peut pas changer ce qui est avant, '
          + 'donc elles restent allumées.',
        piege: 'raisonnement-sequentiel',
      },
    ],
  },

  // ── e04 — palier 1 · classe B · cercle 3 · le piège, au format le plus nu ─
  //
  // Le montage donné ne porte aucun appareil, la cible y est, il reste deux
  // récepteurs : c’est exactement ce que la condition de validité du piège lit
  // sur le graphe. Sans le second récepteur, « aux bornes de L2 » et « aux
  // bornes de la pile » seraient le même branchement et l’item ne testerait rien.
  {
    id: 'ch02-sf2-e04-ou-poser-le-voltmetre-sur-la-boucle',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 1,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'tableau-de-bord-a-deux-lampes',
    enonce:
      'Le montage comporte une pile, deux lampes L1 et L2 et un interrupteur fermé, tous sur '
      + 'la même boucle. Complète le schéma pour mesurer la tension aux bornes de L2 : place le '
      + 'voltmètre et oriente-le, sa borne « + » du côté d’où vient le courant.',
    figure: { sorte: 'circuit', circuit: BORD_AVEC_VOLTMETRE, titre: 'Le montage attendu' },
    reponse: { objetFormel: BORD_AVEC_VOLTMETRE },
    piege: PIEGE,
    situation: {
      demande: 'schema',
      mesure: { appareil: 'V', cible: 'L2' },
      circuit: BORD_DONNE,
    },
    dispositifServi: 'voltmetre-insere-dans-la-boucle',
  },

  // ── e05 — palier 2 · classe B · cercle 0 · le support change ─────────────
  //
  // `objet-support` : la même question qu’en `e03`, mais le circuit n’est plus
  // dessiné — il est décrit. Un item de type `court` ne PEUT pas porter de
  // figure (`SORTES_PAR_TYPE` n’en ouvre qu’à trois types), ce qui rend la
  // variation gratuite ici, et honnête : ce qu’on mesure, c’est la lecture d’une
  // description, pas celle d’un dessin.
  //
  // Geste de contrôle : le test du dévissage est la vérification que le cours
  // installe, et il est servi comme rituel, hors de la fenêtre des cinq séances.
  {
    id: 'ch02-sf2-e05-vitrine-decrite-en-mots',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'vitrine-du-boulanger',
    enonce:
      'Dans la vitrine du boulanger, deux lampes sont branchées sur la même pile : les fils se '
      + 'séparent juste après l’interrupteur, chaque lampe reçoit un fil, et les deux fils se '
      + 'rejoignent avant de revenir à la pile. On dévisse L1. Que devient L2 ?',
    reponse: {
      objetFormel: VITRINE_DERIVATION,
      libre: false,
      choix: verdictDuDevissage(VITRINE_DERIVATION, 'L1'),
      choixPossibles: ISSUES_DU_DEVISSAGE,
      allumees: allumeesSansLui(VITRINE_DERIVATION, 'L1'),
    },
    rituelDeControle: true,
  },

  // ── e06 — palier 2 · classe C · cercle 3 · corriger un montage ───────────
  //
  // Classe C, et par obligation mécanique : la figure montre le montage FAUTIF,
  // la correction en est un autre, et l’identité de référence de la classe B est
  // donc impossible. Aucun piège déclaré non plus — sa condition de validité
  // exige que l’appareil ne soit pas déjà au circuit, et il y est.
  //
  // La réponse attendue est un GRAPHE, pas une phrase : « il fallait le mettre
  // en dérivation » se récite sans savoir où poser les deux fils.
  {
    id: 'ch02-sf2-e06-corriger-le-montage-de-lea',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 3,
    palier: 2,
    registre: 'macro',
    type: 'schema-circuit',
    dimensionVariee: 'sens-du-changement',
    contexteDeSurface: 'montage-de-lea-a-corriger',
    enonce:
      'Léa devait mesurer la tension aux bornes de L2. Voici ce qu’elle a dessiné : elle a '
      + 'coupé le fil entre les deux lampes et y a inséré le voltmètre. Les deux lampes restent '
      + 'éteintes. Redessine le montage correct, avec les mêmes dipôles : rétablis le fil '
      + 'qu’elle a coupé, puis pose le voltmètre en travers de L2, orienté.',
    figure: { sorte: 'circuit', circuit: MONTAGE_DE_LEA, titre: 'Le montage de Léa' },
    reponse: { objetFormel: MONTAGE_DE_LEA_CORRIGE },
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: '2894b05fdfba5873' },
  },

  // ── e07 — palier 2 · classe B · cercle 3 · le piège, sur un mixte ────────
  //
  // `objet-support` pour le palier 2 du piège : le montage n’est plus une boucle
  // unique, c’est un circuit mixte, et le dipôle à mesurer est celui que TOUT le
  // courant traverse. Le geste ne change pas ; ce qui change est ce qu’il faut
  // lire avant de le faire.
  {
    id: 'ch02-sf2-e07-voltmetre-sur-le-phare',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 2,
    registre: 'macro',
    type: 'schema-circuit',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'phare-et-deux-veilleuses',
    enonce:
      'Sur ce montage, la lampe L1 est traversée par tout le courant, puis L2 et L3 se le '
      + 'partagent. Complète le schéma pour mesurer la tension aux bornes de L1 : place le '
      + 'voltmètre et oriente-le, sa borne « + » du côté d’où vient le courant.',
    figure: { sorte: 'circuit', circuit: PHARE_AVEC_VOLTMETRE, titre: 'Le montage attendu' },
    reponse: { objetFormel: PHARE_AVEC_VOLTMETRE },
    piege: PIEGE,
    situation: {
      demande: 'schema',
      mesure: { appareil: 'V', cible: 'L1' },
      circuit: PHARE_MIXTE,
    },
    dispositifServi: 'voltmetre-aux-bornes-de-la-mauvaise-lampe',
  },

  // ── e08 — palier 3 · classe C · cercle 0 · le double QCM ─────────────────
  //
  // Le format différenciant, et le seul du fichier sans aucune garantie
  // mécanique : compté, plafonné, relu, scellé sur l’item entier moins le bloc
  // `relu` — parce que ce qui est risqué dans un double QCM n’est pas l’énoncé,
  // ce sont les justifications.
  //
  // Il ne DÉCLARE pas le piège, et ce n’est pas un oubli : la condition de
  // validité de `mesurer-en-coupant-le-circuit` exige `demande: 'schema'`, et un
  // double QCM ne rend pas de schéma. Ses trois justifications fausses viennent
  // pourtant mot pour mot des `raisonnements` du piège, et elles le citent.
  {
    id: 'ch02-sf2-e08-double-qcm-ou-brancher-le-voltmetre',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 3,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'trois-branchements-proposes',
    enonce:
      'Une pile, un interrupteur et deux lampes L1 et L2 sont montés sur une seule boucle. On '
      + 'te demande la tension aux bornes de L2. Où branches-tu le voltmètre ? Puis choisis la '
      + 'phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'aux-bornes-de-la-lampe-sans-rien-couper',
      choixPossibles: [
        'aux-bornes-de-la-lampe-sans-rien-couper',
        'dans-la-boucle-a-la-place-d-un-fil',
        'entre-la-pile-et-l-interrupteur',
      ],
    },
    justifications: [
      {
        id: 'une-tension-est-un-ecart-entre-deux-points',
        texte:
          'Une tension n’est pas quelque chose qui passe : c’est un écart entre deux endroits. '
          + 'Je pose donc l’appareil en travers de L2, sans rien couper, un fil sur chacune de '
          + 'ses bornes.',
        juste: true,
        provenance: 'locale',
      },
      {
        id: 'il-faut-etre-sur-le-passage',
        texte:
          'Pour mesurer quelque chose, il faut être sur son passage : je coupe le fil et je '
          + 'mets l’appareil dedans, sinon il ne verra rien passer.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « mesurer-en-coupant-le-circuit », raisonnement « il-faut-etre-sur-le-passage » '
          + '— js/data/pieges/electricite.js',
        piege: PIEGE,
      },
      {
        id: 'meme-geste-que-l-amperemetre',
        texte: 'J’ai fait comme pour l’ampèremètre : on l’intercale sur le trajet, c’est le même geste.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « mesurer-en-coupant-le-circuit », raisonnement « meme-geste-que-l-amperemetre » '
          + '— js/data/pieges/electricite.js',
        piege: PIEGE,
      },
      {
        id: 'en-travers-il-ne-verra-rien',
        texte:
          'Posé en travers, il ne verrait rien passer : je le mets entre la pile et '
          + 'l’interrupteur, là où le courant est le plus fort.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « mesurer-en-coupant-le-circuit », raisonnement « en-travers-il-ne-verra-rien » '
          + '— js/data/pieges/electricite.js',
        piege: PIEGE,
      },
    ],
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: '611dc1e8093243a2' },
  },

  // ── e09 — palier 3 · classe B · cercle 3 · le format diagnostique ────────
  //
  // `mode-de-reponse` pour le palier 3 du piège : on ne complète plus un schéma
  // donné, on le CONSTRUIT entièrement à partir d’un texte. Le montage de départ
  // n’est nulle part dessiné — il n’existe que dans la `situation`, où la
  // condition de validité va le lire.
  {
    id: 'ch02-sf2-e09-construire-le-schema-de-la-sonnette',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 3,
    registre: 'macro',
    type: 'schema-circuit',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'sonnette-et-lampe-du-portail',
    enonce:
      'À décrire entièrement par un schéma, sans modèle : une pile, un interrupteur fermé, la '
      + 'lampe L1 puis la lampe L2, toutes sur une seule boucle. Dessine ce montage, et '
      + 'ajoutes-y le voltmètre qui mesure la tension aux bornes de L2, orienté, sa borne « + » '
      + 'du côté d’où vient le courant.',
    figure: { sorte: 'circuit', circuit: SONNETTE_AVEC_VOLTMETRE, titre: 'Le schéma attendu' },
    reponse: { objetFormel: SONNETTE_AVEC_VOLTMETRE },
    piege: PIEGE,
    situation: {
      demande: 'schema',
      mesure: { appareil: 'V', cible: 'L2' },
      circuit: SONNETTE_DONNEE,
    },
    estFormatDiagnostique: true,
    motifFormatDiagnostique:
      'Le format déclaré par le piège tient en deux moitiés : « l’élève place lui-même '
      + 'l’appareil sur le graphe » et « dit ce qu’il affichera ». La première est tenue '
      + 'entièrement, et au-delà de ce que le format demande — rien n’est proposé, aucune '
      + 'liste de positions à cocher, le graphe entier est produit par l’élève, appareil '
      + 'compris. Il est comparé par `diagnostiquer(schema, { graphe, mesure })` et NON par '
      + '`memeCircuit` : sur une chaîne de lampes identiques, la forme canonique ne '
      + 'distingue pas « aux bornes de L2 » de « aux bornes de L1 », et corriger cet item '
      + 'au `memeCircuit` validerait la faute même que le piège vise — voir « le '
      + 'comparateur n’est pas `memeCircuit` » en tête de fichier. La seconde est tenue '
      + 'dans sa forme QUALITATIVE : la '
      + 'correction dit ce que le montage devient une fois l’appareil posé — les lampes '
      + 'restent allumées, l’appareil mesure L2 et pas L1. Le nombre de volts, lui, n’est PAS '
      + 'demandé, et il ne peut pas l’être ici : « prévoir l’indication » est '
      + '`ch02-sf3`, et le lire avec son calibre est `ch02-sf4`. C’est la seule moitié du '
      + 'format que ce savoir-faire ne peut pas porter, elle est écrite plutôt que passée '
      + 'sous silence, et elle est portée par les items de ces deux savoir-faire-là.',
  },

  // ── e10 — palier 4 · classe B · cercle 3 · deux dessins, un circuit ──────
  //
  // L’item que ce fichier existe pour écrire. Le schéma de Sam n’a ni les mêmes
  // noms de nœuds, ni le même ordre, ni le même nombre de traits que celui de la
  // paillasse — et c’est le MÊME circuit : `memeCircuit` le dit, parce que les
  // enfants d’un nœud série sont un multi-ensemble trié et qu’un fil est une
  // identité entre deux nœuds, pas un composant.
  //
  // La conséquence pour l’élève est celle qui compte : sa réponse n’a pas à
  // ressembler au modèle. Deux dessins différents du même circuit sont tous les
  // deux justes, et c’est le seul endroit du corpus où on peut le lui prouver.
  //
  // Palier non étiqueté : rien dans l’énoncé ne dit « série », « dérivation »,
  // ni même qu’il faut regarder la topologie.
  {
    id: 'ch02-sf2-e10-le-schema-de-sam-redessine',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 4,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'schema-de-sam-a-refaire',
    enonce:
      'Voici le schéma de Sam. Refais-le à ta façon, sans le recopier : tu peux placer la pile '
      + 'où tu veux et rencontrer les dipôles dans un autre ordre, mais chacun doit rester relié '
      + 'aux mêmes voisins. Ton schéma sera comparé au sien sur les LIAISONS et sur elles seules '
      + '— deux dessins différents du même circuit sont tous les deux acceptés.',
    figure: { sorte: 'circuit', circuit: SCHEMA_DE_SAM, titre: 'Le schéma de Sam' },
    reponse: { objetFormel: SCHEMA_DE_SAM },
  },
]);

// ════════════════════════════════════════════════════════════════════════════
// PROBLÈMES — 5 items
// ════════════════════════════════════════════════════════════════════════════

export const PROBLEMES = Object.freeze([

  // ── p01 — palier 4 · classe B · cercle 0 · le classement ─────────────────
  //
  // Aucun schéma, aucun mot du chapitre dans les quatre étiquettes : ce sont
  // quatre pannes racontées, et c’est à l’élève de reconnaître de quoi il s’agit.
  // C’est ce que le palier non étiqueté demande — la première tâche y est de
  // savoir de quoi on parle.
  //
  // AUCUN DISTRACTEUR, et c’est un retrait. L’item en portait un — « la guirlande
  // en dérivation : il y a beaucoup de fils qui en sortent, donc les lampes sont
  // forcément sur des branches différentes » — rattaché à
  // `reponse-conforme-sans-adhesion`. Ce piège porte sur l’ÉCART entre ce qu’un
  // élève récite et ce qu’il prédit ; sa condition de validité exige une PAIRE
  // d’items appariés (restitution + prédiction) servis séparément, et sa règle
  // parle de lois qu’on sait dire sans s’en servir. Elle ne dit rien d’une
  // topologie déduite du NOMBRE DE FILS VISIBLES, qui est une inférence de
  // surface et non une réponse conforme sans adhésion. La règle est muette, le
  // contrôle est muet, et le rattachement rééduquait l’élève sur une conception
  // étrangère. Cette erreur-là — celle que la DÉCOUVERTE fait dire à l’élève,
  // « la deuxième guirlande a plusieurs fils » — n’a pas de piège au catalogue.
  {
    id: 'ch02-sf2-p01-quatre-pannes-a-ranger',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'quatre-pannes-de-la-maison',
    enonce:
      'Quatre installations, quatre façons de tomber en panne : la guirlande où une seule '
      + 'lampe grillée éteint toute la rangée ; les deux lampes du couloir, dont une grillée '
      + 'laisse l’autre allumée ; les deux feux du vélo, qui s’éteignent ensemble quand on '
      + 'débranche le premier ; les lampes du plafond de la classe, qu’on remplace une par une '
      + 'sans éteindre les autres. Range chacune dans la bonne colonne.',
    reponse: { objetFormel: CLASSEMENT_DES_PANNES },
  },

  // ── p02 — palier 4 · classe B · cercle 3 · le piège, non étiqueté ────────
  //
  // Le piège au palier 4 : l’énoncé ne dit ni « série », ni « dérivation », ni
  // « en travers ». Il donne un montage mixte et nomme le dipôle à mesurer ; il
  // faut d’abord voir que L1 n’est pas dans une branche, ensuite seulement poser
  // l’appareil.
  {
    id: 'ch02-sf2-p02-atelier-trois-lampes',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 4,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'atelier-a-trois-lampes',
    enonce:
      'Dans l’atelier, trois lampes sont branchées sur la même pile : L1 est traversée par '
      + 'tout le courant, L2 et L3 se le partagent ensuite. On veut connaître la tension aux '
      + 'bornes de L1. Complète le schéma avec le voltmètre, orienté.',
    figure: { sorte: 'circuit', circuit: ATELIER_AVEC_VOLTMETRE, titre: 'Le montage attendu' },
    reponse: { objetFormel: ATELIER_AVEC_VOLTMETRE },
    piege: PIEGE,
    situation: {
      demande: 'schema',
      mesure: { appareil: 'V', cible: 'L1' },
      circuit: ATELIER_DONNE,
    },
  },

  // ── p03 — palier 3 · classe C · cercle 0 · deux schémas, une question ────
  //
  // Un double QCM ne peut porter aucune figure : les deux schémas sont donc
  // écrits en toutes lettres, et c’est la limite du format — rien de mécanique
  // ne garantit que les deux descriptions sont bien les deux circuits qu’on
  // croit. C’est la raison même pour laquelle cet item est relu.
  //
  // La justification fausse « l’ordre n’est pas le même » ne correspond à aucun
  // `raisonnement` du catalogue : elle est donc `locale`, c’est-à-dire écrite
  // ici et assumée, plutôt que rattachée de force à un piège qui ne la porte pas.
  {
    id: 'ch02-sf2-p03-double-qcm-deux-schemas',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 3,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'deux-schemas-de-deux-eleves',
    enonce:
      'Deux élèves ont rendu un schéma. Sur celui d’Inès : pile, puis interrupteur, puis la '
      + 'lampe A, puis la lampe B, et retour à la pile. Sur celui de Tom : pile, puis la lampe '
      + 'B, puis un fil, puis la lampe A, puis l’interrupteur, et retour à la pile. '
      + 'Représentent-ils le même circuit ? Puis choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'c-est-le-meme-circuit',
      choixPossibles: ['c-est-le-meme-circuit', 'ce-sont-deux-circuits-differents'],
    },
    justifications: [
      {
        id: 'les-liaisons-sont-les-memes',
        texte:
          'Dans les deux, chaque dipôle est sur la même boucle unique et rien ne se sépare : '
          + 'ce sont les mêmes liaisons, et un fil de plus n’ajoute aucun dipôle. Seul le '
          + 'dessin change.',
        juste: true,
        provenance: 'locale',
      },
      {
        id: 'l-ordre-n-est-pas-le-meme',
        texte:
          'Non : chez Inès la lampe A vient avant la lampe B, chez Tom c’est l’inverse. '
          + 'L’ordre des dipôles fait partie du circuit.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'tom-a-un-fil-de-plus',
        texte:
          'Non : Tom a un fil de plus, donc son circuit a un composant de plus que celui '
          + 'd’Inès.',
        juste: false,
        provenance: 'locale',
      },
    ],
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: '86f2cedfb26730a0' },
  },

  // ── p04 — palier 4 · classe C · cercle 3 · un montage à refaire ──────────
  //
  // Le montage de Noah n’est pas fautif au sens du vérificateur : il est
  // parfaitement fonctionnel, et c’est le CAHIER DES CHARGES qu’il ne remplit
  // pas. Aucun code de `circuit.js` ne le signale, et c’est normal — un
  // vérificateur topologique dit ce qui ne marche pas, pas ce qu’on voulait.
  // D’où la classe C : cette correction-là est un jugement, pas un constat.
  {
    id: 'ch02-sf2-p04-refaire-le-montage-de-noah',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 3,
    palier: 4,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'montage-de-noah-a-refaire',
    enonce:
      'On avait demandé à Noah un montage où dévisser une lampe laisse l’autre allumée. Voici '
      + 'ce qu’il a rendu : le circuit fonctionne, les deux lampes s’allument, l’interrupteur '
      + 'les commande. Pourtant il ne convient pas. Redessine-le pour qu’il réponde à la '
      + 'demande, avec les mêmes dipôles.',
    figure: { sorte: 'circuit', circuit: MONTAGE_DE_NOAH, titre: 'Le montage de Noah' },
    reponse: { objetFormel: MONTAGE_DE_NOAH_CORRIGE },
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: '940113934f4c3319' },
  },

  // ── p05 — palier 4 · classe B · cercle 0 · la prédiction engagée ─────────
  //
  // La prédiction est verrouillée avant le résultat : sans engagement préalable
  // il n’y a pas de conflit, juste une information de plus. Un item de type
  // `prediction-engagee` ne peut porter aucune figure ; le montage est donc
  // décrit, et c’est l’objet formel qui le porte pour la correction.
  {
    id: 'ch02-sf2-p05-prediction-rampe-de-trois-lampes',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 4,
    registre: 'macro',
    type: 'prediction-engagee',
    contexteDeSurface: 'rampe-de-trois-spots',
    enonce:
      'Trois spots sont branchés directement sur la même pile : chacun a un fil qui part de la '
      + 'borne « + » et un fil qui revient à la borne « − ». On dévisse celui du milieu. Écris '
      + 'ce que deviennent les deux autres. Ta prédiction sera verrouillée avant le résultat.',
    reponse: {
      objetFormel: RAMPE_DERIVATION,
      libre: false,
      choix: verdictDuDevissage(RAMPE_DERIVATION, 'L2'),
      choixPossibles: ISSUES_DU_DEVISSAGE,
      allumees: allumeesSansLui(RAMPE_DERIVATION, 'L2'),
    },
  },
]);

// ════════════════════════════════════════════════════════════════════════════
// TEST — 10 items
// ════════════════════════════════════════════════════════════════════════════
//
// Aucune TÂCHE n’est reprise de l’entraînement : trois lampes là où il y en
// avait deux, le voltmètre aux bornes de la pile là où il était aux bornes d’une
// lampe, un circuit mixte à redessiner là où c’était une simple boucle. Deux
// topologies reviennent, en revanche, et « Les montages du test » plus haut dit
// lesquelles et pourquoi il n’y a pas à s’en excuser.

export const TEST = Object.freeze([

  // ── t01 — palier 1 · classe B · cercle 3 ─────────────────────────────────
  {
    id: 'ch02-sf2-t01-guirlande-a-trois-lampes',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 1,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'guirlande-du-sapin',
    enonce:
      'Voici le schéma d’une petite guirlande à trois lampes. En série ou en dérivation ?',
    figure: { sorte: 'circuit', circuit: GUIRLANDE_SERIE, titre: 'La guirlande à trois lampes' },
    reponse: {
      objetFormel: GUIRLANDE_SERIE,
      libre: false,
      choix: allureDe(GUIRLANDE_SERIE),
      choixPossibles: ALLURES_POSSIBLES,
    },
  },

  // ── t02 — palier 1 · classe B · cercle 3 ─────────────────────────────────
  //
  // Trois branches, et non deux : le nombre de branches ne change pas la
  // réponse, et c’est ce qu’il faut avoir compris.
  {
    id: 'ch02-sf2-t02-vitrine-a-trois-branches',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 1,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'vitrine-a-trois-spots',
    enonce:
      'Les trois spots de la vitrine sont branchés comme le montre ce schéma. En série ou en '
      + 'dérivation ?',
    figure: { sorte: 'circuit', circuit: VITRINE_TROIS_BRANCHES, titre: 'Les trois spots de la vitrine' },
    reponse: {
      objetFormel: VITRINE_TROIS_BRANCHES,
      libre: false,
      choix: allureDe(VITRINE_TROIS_BRANCHES),
      choixPossibles: ALLURES_POSSIBLES,
    },
  },

  // ── t03 — palier 1 · classe B · cercle 0 · le rituel de contrôle ─────────
  {
    id: 'ch02-sf2-t03-deux-lampes-du-refrigerateur',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'deux-lampes-du-refrigerateur',
    enonce:
      'Deux lampes sont branchées directement sur les deux bornes de la même pile : chacune a '
      + 'un fil sur la borne « + » et un fil sur la borne « − ». On en dévisse une. Que devient '
      + 'l’autre ?',
    reponse: {
      objetFormel: FRIGO_DERIVATION,
      libre: false,
      choix: verdictDuDevissage(FRIGO_DERIVATION, 'L1'),
      choixPossibles: ISSUES_DU_DEVISSAGE,
      allumees: allumeesSansLui(FRIGO_DERIVATION, 'L1'),
    },
    rituelDeControle: true,
  },

  // ── t04 — palier 2 · classe B · cercle 3 · le piège ──────────────────────
  //
  // `objet-support`, comme `e07` : la chaîne compte trois lampes et le dipôle à
  // mesurer est le dernier, celui qu’on atteint en dernier depuis la borne « + ».
  {
    id: 'ch02-sf2-t04-voltmetre-sur-la-derniere-lampe',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 2,
    registre: 'macro',
    type: 'schema-circuit',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'etabli-a-trois-lampes',
    enonce:
      'Trois lampes L1, L2 et L3 sont montées l’une après l’autre sur la même boucle, avec une '
      + 'pile. Complète le schéma pour mesurer la tension aux bornes de L3 : place le voltmètre '
      + 'et oriente-le, sa borne « + » du côté d’où vient le courant.',
    figure: { sorte: 'circuit', circuit: ETABLI_AVEC_VOLTMETRE, titre: 'Le montage attendu' },
    reponse: { objetFormel: ETABLI_AVEC_VOLTMETRE },
    piege: PIEGE,
    situation: {
      demande: 'schema',
      mesure: { appareil: 'V', cible: 'L3' },
      circuit: ETABLI_DONNE,
    },
  },

  // ── t05 — palier 2 · classe C · cercle 1 · la réponse écrite ─────────────
  //
  // Le seul item du fichier à réponse libre. Il ne porte aucun calcul — il n’y
  // en a pas un dans tout le savoir-faire —, donc rien à scinder : ce que
  // ITEM_SCINDABLE_NON_SCINDE refuse, c’est un item qui porterait les deux.
  {
    id: 'ch02-sf2-t05-pourquoi-les-deux-pannes-different',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'deux-guirlandes-du-carton',
    enonce:
      'Deux guirlandes, une lampe grillée dans chacune, et exactement la même lampe grillée. '
      + 'La première est entièrement noire ; la deuxième s’allume, sauf une. Explique la '
      + 'différence en parlant des fils, pas des lampes.',
    reponse: {
      libre: true,
      elementsAttendus: [
        'dans la première, toutes les lampes sont sur la même boucle : il n’y a qu’un chemin, '
        + 'et la lampe grillée le coupe',
        'dans la deuxième, chaque lampe a ses deux bornes reliées aux mêmes points : les autres '
        + 'chemins existent toujours et restent parcourus',
        'ce n’est donc pas la lampe qui diffère mais la façon dont les fils la relient aux autres',
      ],
    },
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: 'be61cee137bd4f7e' },
  },

  // ── t06 — palier 3 · classe B · cercle 3 · le piège, schéma entier ───────
  //
  // `mode-de-reponse`, comme `e09` : le schéma est construit de bout en bout à
  // partir d’un texte. Le seul voltmètre du fichier posé aux bornes de la PILE :
  // le geste est le même, la cible n’est plus une lampe, et c’est le point où le
  // troisième constat du piège se joue.
  {
    id: 'ch02-sf2-t06-construire-avec-le-voltmetre-sur-la-pile',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 3,
    registre: 'macro',
    type: 'schema-circuit',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'lampe-de-bureau-a-deux-ampoules',
    enonce:
      'À décrire entièrement par un schéma, sans modèle : une pile, un interrupteur fermé, et '
      + 'deux lampes L1 et L2 qui ont leurs deux bornes communes. Dessine ce montage, et '
      + 'ajoutes-y le voltmètre qui mesure la tension aux bornes de la pile, orienté, sa borne '
      + '« + » du côté de la borne « + » de la pile.',
    figure: { sorte: 'circuit', circuit: BUREAU_AVEC_VOLTMETRE, titre: 'Le schéma attendu' },
    reponse: { objetFormel: BUREAU_AVEC_VOLTMETRE },
    piege: PIEGE,
    situation: {
      demande: 'schema',
      mesure: { appareil: 'V', cible: 'P' },
      circuit: BUREAU_DONNE,
    },
  },

  // ── t07 — palier 3 · classe C · cercle 1 · le bon geste, mauvaise cible ──
  //
  // Le troisième constat du piège, celui que la relecture adverse avait trouvé
  // sans réfutation : en dérivation, correctement, et aux bornes du mauvais
  // dipôle. La quatrième justification du catalogue existe pour cet élève-là, et
  // c’est elle qu’on lui sert.
  {
    id: 'ch02-sf2-t07-double-qcm-en-derivation-donc-c-est-bon',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'mesure-rendue-par-un-camarade',
    enonce:
      'Trois lampes L1, L2 et L3 sont montées l’une après l’autre sur la même boucle. On '
      + 'demandait la tension aux bornes de L3. Un camarade a posé son voltmètre en travers, '
      + 'sans rien couper, un fil de chaque côté de L1 : le circuit fonctionne et l’appareil '
      + 'affiche une valeur stable. Sa mesure répond-elle à la question ? Puis choisis la '
      + 'phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'non-il-a-mesure-la-tension-d-un-autre-dipole',
      choixPossibles: ['oui-la-mesure-est-bonne', 'non-il-a-mesure-la-tension-d-un-autre-dipole'],
    },
    justifications: [
      {
        id: 'le-geste-est-bon-la-cible-ne-l-est-pas',
        texte:
          'Le geste est bon — en dérivation, sans rien couper — et c’est déjà l’essentiel. '
          + 'Mais ses deux fils encadrent L1 : il a mesuré la tension de L1, pas celle de L3. '
          + 'Une tension est un écart entre deux points nommés.',
        juste: true,
        provenance: 'locale',
      },
      {
        id: 'en-derivation-donc-c-est-bon',
        texte: 'Il l’a bien mis en dérivation, comme on nous l’a appris : la mesure est donc bonne.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « mesurer-en-coupant-le-circuit », raisonnement « en-derivation-donc-c-est-bon » '
          + '— js/data/pieges/electricite.js',
        piege: PIEGE,
      },
      // Rattachée à `courant-qui-s-use` dans la première rédaction, et c’était le
      // pire rattachement possible : la règle de ce piège-là est « dans un circuit
      // EN SÉRIE, l’intensité est LA MÊME EN TOUT POINT ». Servie à l’élève qui
      // vient d’écrire « en série, la tension est la même partout », elle ne le
      // réfute pas — elle lui donne raison par analogie, sur le motif exact de son
      // erreur. Elle traînait de surcroît l’intensité, c’est-à-dire le chapitre 7,
      // dans un savoir-faire qui la déclare hors périmètre.
      //
      // Le bon piège est celui de l’item, et il porte cette faute au mot près dans
      // sa `conception` : « si la tension circule, elle est la même partout, et il
      // suffit d’être en dérivation quelque part — le dipôle aux bornes duquel on
      // se pose devient indifférent ». Sa règle la contredit : « une tension est un
      // écart entre deux points NOMMÉS : “aux bornes de L3” n’est pas “aux bornes
      // de L1” ». Son contrôle aussi, par sa deuxième question.
      {
        id: 'c-est-la-meme-tension-partout',
        texte:
          'Les trois lampes sont sur la même boucle, donc la tension est la même partout : '
          + 'peu importe laquelle il a mesurée.',
        juste: false,
        provenance: 'locale',
        piege: PIEGE,
      },
    ],
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: '49fa994aee63be69' },
  },

  // ── t08 — palier 4 · classe B · cercle 3 · l’équivalence, sur un mixte ───
  //
  // Le pendant de `e10`, sur un circuit qui n’est pas une simple boucle : deux
  // fils de liaison, un autre ordre, un bloc en dérivation. `memeCircuit`
  // accepte toujours, et l’élève doit produire un dessin, pas le recopier.
  {
    id: 'ch02-sf2-t08-le-schema-de-maya-redessine',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 4,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'schema-de-maya-a-refaire',
    enonce:
      'Maya a rendu ce schéma. Refais-le à ta façon, sans le recopier : le tien doit montrer '
      + 'exactement les mêmes liaisons, mais rien ne t’oblige à la même disposition ni au même '
      + 'ordre. Deux dessins différents du même circuit sont tous les deux acceptés.',
    figure: { sorte: 'circuit', circuit: SCHEMA_DE_MAYA, titre: 'Le schéma de Maya' },
    reponse: { objetFormel: SCHEMA_DE_MAYA },
  },

  // ── t09 — palier 4 · classe B · cercle 0 · le classement ─────────────────
  {
    id: 'ch02-sf2-t09-quatre-installations-a-ranger',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'quatre-installations-du-quartier',
    enonce:
      'Quatre installations : les trois lampes de l’atelier, qu’un seul interrupteur allume et '
      + 'qui s’éteignent toutes si l’une grille ; les phares et les feux arrière d’une voiture, '
      + 'qui fonctionnent séparément ; la sonnette et la lampe du portail, branchées l’une après '
      + 'l’autre sur la même boucle ; les prises d’une maison, dont on peut débrancher une sans '
      + 'couper les autres. Range chacune dans la bonne colonne.',
    reponse: { objetFormel: CLASSEMENT_DES_ATELIERS },
  },

  // ── t10 — palier 4 · classe C · cercle 3 · corriger la cible ─────────────
  //
  // Le montage de Yanis ne déclenche aucun code de `circuit.js` tant qu’on ne
  // lui dit pas ce qui était demandé : c’est `VOLTMETRE_AUX_MAUVAISES_BORNES`,
  // qui n’existe que rapporté à un `attendu`. Sans énoncé, ce schéma est correct.
  {
    id: 'ch02-sf2-t10-corriger-la-cible-de-yanis',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 3,
    palier: 4,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'montage-de-yanis-a-corriger',
    enonce:
      'On demandait à Yanis la tension aux bornes de L2. Il a posé son voltmètre en travers, '
      + 'sans rien couper — le circuit fonctionne, l’appareil affiche une valeur stable. '
      + 'Pourtant ce n’est pas la mesure demandée. Redessine le montage avec le voltmètre à sa '
      + 'place, orienté.',
    figure: { sorte: 'circuit', circuit: MONTAGE_DE_YANIS, titre: 'Le montage de Yanis' },
    reponse: { objetFormel: MONTAGE_DE_YANIS_CORRIGE },
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: '77706728566be9d8' },
  },
]);

// ════════════════════════════════════════════════════════════════════════════

export const ITEMS = Object.freeze([...ENTRAINEMENT, ...PROBLEMES, ...TEST]);

export default ITEMS;
