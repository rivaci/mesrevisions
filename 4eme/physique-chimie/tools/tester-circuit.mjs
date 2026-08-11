// Tests du vérificateur topologique de circuit, hors navigateur.
//
//     node tools/tester-circuit.mjs
//
// Site (M) de la charte, contre-mesure de l'invariant 7 : « décider que deux
// graphes de circuit sont équivalents est un programme non trivial, écrit à la
// main, que rien ne teste. Un bug y produirait des faux négatifs silencieux sur
// toute une famille de savoir-faire. »
//
// Ces tests ne cherchent donc pas à confirmer que le module marche. Ils
// cherchent les deux verdicts qui coûtent : compter faux un élève qui a raison,
// et ne rien dire à un élève qui a tort. Cinq familles d'attaque :
//
//   · les cas limites que la charte NOMME pour le circuit — deux schémas
//     topologiquement identiques dessinés autrement, le voltmètre aux mauvaises
//     bornes, le court-circuit partiel, le circuit mixte série-dérivation ;
//   · les nombres : le module affirme qu'aucun n'entre dans ce fichier. On le
//     vérifie par l'entrée (une borne flottante est refusée) et par la sortie
//     (deux noms de nœuds que seule une conversion numérique confondrait
//     restent deux nœuds) ;
//   · les entrées malformées : chaîne vide, null, type inventé, graphe sans
//     arête, boucle dégénérée, pont non série-parallèle. Un code, jamais une
//     exception, jamais une valeur plausible ;
//   · l'ÉNONCÉ malformé, symétrique du précédent : un `attendu` illisible ne
//     doit pas ressortir en « aucun constat », qui se lit comme un schéma juste ;
//   · l'ORDRE des constats, que le module rend opposable en donnant une gravité
//     à chaque code : le geste à corriger avant sa conséquence.

import {
  CAS_TEMOINS,
  CODES_ERREUR_CIRCUIT,
  FAMILLES_CHARTE,
  branches,
  diagnostiquer,
  enDerivationAuxBornesDe,
  enSerieAvecBranche,
  extremitesDeBranche,
  formeCanonique,
  memeCircuit,
  normaliser,
  relationTopologique,
  sensDuCourant,
  sontEnDerivation,
  sontEnSerie,
  typeDeCircuit,
  verifierCasTemoins,
} from '../js/circuit.js';

let passes = 0;
const echecs = [];

const verifier = (nom, condition) => {
  if (condition) passes += 1;
  else echecs.push(nom);
};

// Une exception qui remonte ferait passer le test suivant pour l'échec du
// précédent : toute la section « entrées malformées » repose sur ce filet.
const sansLever = (f) => {
  try {
    return f();
  } catch (e) {
    return { ok: `A LEVÉ ${e.constructor.name}`, raison: `A LEVÉ ${e.constructor.name}`, leve: e };
  }
};

const dip = (id, type, moins, plus, extra = {}) => ({ id, type, bornes: [moins, plus], ...extra });
const codes = (circuit, attendu) => diagnostiquer(circuit, attendu).codes;
const cle = (circuit) => formeCanonique(circuit).cle;
const type = (circuit) => typeDeCircuit(circuit).type;

// ════════════════════════════════════════════════════════════════════════════
// 1. Les cas-témoins déclarés dans le contenu — invariant 7
// ════════════════════════════════════════════════════════════════════════════
//
// « Refuse : un vérificateur sans cas-témoins ; un cas-témoin qui échoue. » Le
// module porte les siens ; ils sont rejoués ici pour que ce fichier soit le
// point d'entrée unique du site M, et non un deuxième jeu concurrent.

const temoins = verifierCasTemoins();
verifier(`les ${temoins.passes} assertions des cas-témoins passent`, temoins.echecs.length === 0);
for (const e of temoins.echecs) echecs.push(`cas-témoin : ${e}`);

verifier('tout code du diagnostic se rattache à l\'énuméré fermé de la charte',
  Object.values(CODES_ERREUR_CIRCUIT).every((d) => FAMILLES_CHARTE.includes(d.famille)));
verifier('chaque famille de l\'énuméré est atteignable par au moins un code',
  FAMILLES_CHARTE.every((f) => Object.values(CODES_ERREUR_CIRCUIT).some((d) => d.famille === f)));
verifier('les cas-témoins couvrent les deux moitiés de la contre-mesure : équivalents et non équivalents',
  CAS_TEMOINS.equivalences.some((c) => c.memes === true)
  && CAS_TEMOINS.equivalences.some((c) => c.memes === false)
  && CAS_TEMOINS.equivalences.some((c) => c.memes === null));

// ════════════════════════════════════════════════════════════════════════════
// 2. Deux schémas topologiquement identiques, dessinés autrement
// ════════════════════════════════════════════════════════════════════════════
//
// C'est le faux négatif le plus cher : l'élève a le bon circuit et le
// comparateur dit non parce qu'il l'a dessiné dans l'autre sens. Chaque test
// ci-dessous redessine SANS changer la topologie, et exige `true`.

const DERIVATION_SIMPLE = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'),
    dip('K', 'interrupteur', 'b', 'c', { etat: 'ferme' }),
    dip('L1', 'lampe', 'c', 'd'),
    dip('L2', 'lampe', 'c', 'd'),
    dip('f', 'fil', 'd', 'a'),
  ],
};

// Le même : autres identifiants, autres noms de nœuds, quatre fils de liaison
// au lieu d'un, l'interrupteur et une lampe tracés dans l'autre sens, et les
// dipôles listés dans un autre ordre.
const DERIVATION_REDESSINEE = {
  dipoles: [
    dip('G', 'pile', 'n9', 'n1'),
    dip('w1', 'fil', 'n1', 'n2'),
    dip('inter', 'interrupteur', 'n3', 'n2', { etat: 'ferme' }),
    dip('w2', 'fil', 'n3', 'n4'),
    dip('la2', 'lampe', 'n5', 'n4'),
    dip('w3', 'fil', 'n5', 'n6'),
    dip('w4', 'fil', 'n6', 'n9'),
    dip('la1', 'lampe', 'n4', 'n6'),
  ],
};

verifier('un circuit en dérivation redessiné de fond en comble reste le même circuit',
  memeCircuit(DERIVATION_SIMPLE, DERIVATION_REDESSINEE) === true);
verifier('et les deux clés sont littéralement la même chaîne',
  cle(DERIVATION_SIMPLE) === cle(DERIVATION_REDESSINEE));
verifier('une chaîne de fils ne change pas le type du circuit',
  type(DERIVATION_SIMPLE) === type(DERIVATION_REDESSINEE));

// Retourner un dipôle non polarisé ne change rien ; retourner un dipôle
// polarisé change tout. Les deux tests se tiennent l'un l'autre : sans le
// second, « la polarité est comparée » ne serait pas testé.
const MOTEUR = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'), dip('M', 'moteur', 'b', 'c'),
    dip('K', 'interrupteur', 'c', 'a', { etat: 'ferme' }),
  ],
};
const MOTEUR_RETOURNE = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'), dip('M', 'moteur', 'c', 'b'),
    dip('K', 'interrupteur', 'c', 'a', { etat: 'ferme' }),
  ],
};
verifier('le moteur retourné donne le même circuit — son sens n\'est un attendu d\'aucun savoir-faire de 4e',
  memeCircuit(MOTEUR, MOTEUR_RETOURNE) === true);

const A_CORRECT = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'), dip('A', 'amperemetre', 'c', 'b'),
    dip('L1', 'lampe', 'c', 'd'), dip('K', 'interrupteur', 'd', 'a', { etat: 'ferme' }),
  ],
};
const A_ET_PILE_RETOURNES = {
  dipoles: [
    dip('P', 'pile', 'b', 'a'), dip('A', 'amperemetre', 'b', 'c'),
    dip('L1', 'lampe', 'c', 'd'), dip('K', 'interrupteur', 'd', 'a', { etat: 'ferme' }),
  ],
};
const PILE_SEULE_RETOURNEE = {
  dipoles: [
    dip('P', 'pile', 'b', 'a'), dip('A', 'amperemetre', 'c', 'b'),
    dip('L1', 'lampe', 'c', 'd'), dip('K', 'interrupteur', 'd', 'a', { etat: 'ferme' }),
  ],
};
verifier('retourner la pile ET l\'ampèremètre laisse le même circuit : le courant entre toujours par « + »',
  memeCircuit(A_CORRECT, A_ET_PILE_RETOURNES) === true);
verifier('retourner la pile SEULE change le circuit — sinon la polarité ne serait pas comparée',
  memeCircuit(A_CORRECT, PILE_SEULE_RETOURNEE) === false);
verifier('et le schéma à pile retournée est diagnostiqué BORNE_INVERSEE, pas « faux »',
  codes(PILE_SEULE_RETOURNEE).join() === 'BORNE_INVERSEE');

// L'état de l'interrupteur entre dans la clé : les deux schémas ont la même
// allure et n'allument pas la même lampe.
const K_FERME = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'),
    dip('K', 'interrupteur', 'c', 'a', { etat: 'ferme' }),
  ],
};
const K_OUVERT = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'),
    dip('K', 'interrupteur', 'c', 'a', { etat: 'ouvert' }),
  ],
};
const K_SANS_ETAT = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'),
    dip('K', 'interrupteur', 'c', 'a'),
  ],
};
verifier('interrupteur ouvert et interrupteur fermé ne sont pas le même circuit',
  memeCircuit(K_FERME, K_OUVERT) === false);
verifier('un interrupteur sans état déclaré vaut fermé, et le vaut partout pareil',
  memeCircuit(K_FERME, K_SANS_ETAT) === true);

// ════════════════════════════════════════════════════════════════════════════
// 3. Les nombres, qui n'entrent pas
// ════════════════════════════════════════════════════════════════════════════
//
// « Un flottant ne peut pas entrer dans ce fichier parce qu'aucun nombre n'y
// entre. » L'affirmation se teste des deux côtés : par la porte d'entrée, et
// par ce qui se passerait si un jour quelqu'un comparait les nœuds autrement
// que comme des chaînes.

verifier('une borne flottante est refusée, pas convertie en chaîne',
  normaliser({ dipoles: [{ id: 'P', type: 'pile', bornes: [0.1 + 0.2, 0.3] }] }).raison === 'BORNES_INVALIDES');
verifier('une borne entière est refusée elle aussi — le type est contrôlé, pas la valeur',
  normaliser({ dipoles: [{ id: 'P', type: 'pile', bornes: [1, 2] }] }).raison === 'BORNES_INVALIDES');

// Si les nœuds étaient comparés après conversion numérique, « 1e3 » et « 1000 »
// deviendraient le même nœud et cette boucle OUVERTE passerait pour fermée :
// l'élève serait félicité pour un circuit qui n'allume rien.
const BOUCLE_OUVERTE_NUMERIQUE = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'),
    dip('L1', 'lampe', 'b', '1e3'),
    dip('K', 'interrupteur', '1000', 'a', { etat: 'ferme' }),
  ],
};
verifier('« 1e3 » et « 1000 » restent deux nœuds distincts : le circuit est ouvert',
  codes(BOUCLE_OUVERTE_NUMERIQUE).join() === 'CIRCUIT_OUVERT');
verifier('« 1.0 » et « 1 » aussi',
  codes({
    dipoles: [
      dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', '1.0'),
      dip('K', 'interrupteur', '1', 'a', { etat: 'ferme' }),
    ],
  }).join() === 'CIRCUIT_OUVERT');
// L'équivalent, pour un graphe, de la suite de conversions qui ment en
// flottants : deux paires de nœuds qu'une clé mal construite confondrait.
// Avec un séparateur naïf, (« a b », « c ») et (« a », « b c ») donnent la même
// clé, les deux lampes sont réduites en parallèle, et ce circuit SÉRIE est
// rendu à l'élève comme un circuit en dérivation.
const NOMS_DE_NOEUDS_A_ESPACES = {
  dipoles: [
    dip('P', 'pile', 'n0', 'a b'),
    dip('L1', 'lampe', 'a b', 'c'),
    dip('L2', 'lampe', 'c', 'a'),
    dip('L3', 'lampe', 'a', 'b c'),
    dip('L4', 'lampe', 'b c', 'n0'),
  ],
};
verifier('des noms de nœuds à espaces ne se recollent pas en une fausse paire : le circuit reste en série',
  type(NOMS_DE_NOEUDS_A_ESPACES) === 'SERIE');
verifier('et les quatre lampes restent quatre arêtes distinctes dans la clé',
  ((cle(NOMS_DE_NOEUDS_A_ESPACES) ?? '').match(/lampe/g) ?? []).length === 4);
verifier('un identifiant « 0 » est un identifiant valide, pas une valeur fausse',
  normaliser({
    dipoles: [dip('0', 'pile', '0', 'b'), dip('L1', 'lampe', 'b', '0')],
  }).ok === true);
verifier('et un nœud nommé « 0 » se raccorde comme les autres',
  codes({ dipoles: [dip('0', 'pile', '0', 'b'), dip('L1', 'lampe', 'b', '0')] }).length === 0);

// ════════════════════════════════════════════════════════════════════════════
// 4. Les entrées malformées — un refus motivé, jamais une exception
// ════════════════════════════════════════════════════════════════════════════

const raisonDe = (x) => sansLever(() => diagnostiquer(x)).raison;

verifier('null', raisonDe(null) === 'GRAPHE_VIDE');
verifier('undefined', raisonDe(undefined) === 'GRAPHE_VIDE');
verifier('chaîne vide', raisonDe('') === 'GRAPHE_VIDE');
verifier('un nombre', raisonDe(42) === 'GRAPHE_VIDE');
verifier('un graphe sans arête', raisonDe({ dipoles: [] }) === 'GRAPHE_VIDE');
verifier('des dipôles qui ne sont pas un tableau', raisonDe({ dipoles: 'P' }) === 'GRAPHE_VIDE');
verifier('un dipôle nul dans la liste', raisonDe({ dipoles: [null] }) === 'DIPOLE_SANS_ID');
verifier('un dipôle sans identifiant', raisonDe({ dipoles: [{ type: 'pile', bornes: ['a', 'b'] }] }) === 'DIPOLE_SANS_ID');
verifier('un identifiant vide', raisonDe({ dipoles: [dip('', 'pile', 'a', 'b')] }) === 'DIPOLE_SANS_ID');
verifier('deux dipôles du même identifiant',
  raisonDe({ dipoles: [dip('P', 'pile', 'a', 'b'), dip('P', 'lampe', 'b', 'a')] }) === 'IDENTIFIANT_DUPLIQUE');
verifier('un type inventé', raisonDe({ dipoles: [dip('X', 'zorglub', 'a', 'b')] }) === 'TYPE_INCONNU');
verifier('un type absent', raisonDe({ dipoles: [{ id: 'X', bornes: ['a', 'b'] }] }) === 'TYPE_INCONNU');
verifier('une seule borne', raisonDe({ dipoles: [{ id: 'P', type: 'pile', bornes: ['a'] }] }) === 'BORNES_INVALIDES');
verifier('trois bornes', raisonDe({ dipoles: [{ id: 'P', type: 'pile', bornes: ['a', 'b', 'c'] }] }) === 'BORNES_INVALIDES');
verifier('une borne vide', raisonDe({ dipoles: [dip('P', 'pile', '', 'b')] }) === 'BORNES_INVALIDES');
verifier('un état d\'interrupteur hors énuméré',
  raisonDe({ dipoles: [dip('K', 'interrupteur', 'a', 'b', { etat: 'ouverte' })] }) === 'ETAT_INCONNU');
verifier('un graphe illisible ne produit AUCUN constat — l\'erreur de contenu ne devient pas une réponse fausse',
  sansLever(() => diagnostiquer(null)).constats.length === 0);
verifier('et il ressort avec ok: false, pas avec un diagnostic vide',
  sansLever(() => diagnostiquer(null)).ok === false);

// Un graphe fait d'un seul fil est lisible et ne contient aucun dipôle : le
// module doit le dire, pas se rompre sur une liste vide.
verifier('un graphe fait d\'un seul fil est lisible et signale l\'absence de générateur',
  codes({ dipoles: [dip('F', 'fil', 'a', 'b')] }).join() === 'PAS_DE_GENERATEUR');

// Boucles dégénérées : un dipôle dont les deux bornes sont le même nœud.
const LAMPE_SUR_ELLE_MEME = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'b'),
    dip('K', 'interrupteur', 'b', 'a', { etat: 'ferme' }),
  ],
};
verifier('une lampe refermée sur elle-même est un court-circuit, pas une exception',
  sansLever(() => codes(LAMPE_SUR_ELLE_MEME)).includes('COURT_CIRCUIT'));
verifier('et le circuit ne prétend pas être en série ou en dérivation',
  type(LAMPE_SUR_ELLE_MEME) === null);
verifier('une pile refermée sur elle-même refuse la forme canonique avec sa raison',
  formeCanonique({
    dipoles: [
      dip('P', 'pile', 'a', 'a'), dip('L1', 'lampe', 'a', 'b'),
      dip('K', 'interrupteur', 'b', 'a', { etat: 'ferme' }),
    ],
  }).raison === 'GENERATEUR_EN_COURT_CIRCUIT');

// Un pont de Wheatstone n'est pas série-parallèle. Le module doit refuser, pas
// approcher — et surtout pas boucler.
const PONT = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'),
    dip('R1', 'resistance', 'b', 'c'), dip('R2', 'resistance', 'b', 'd'),
    dip('R3', 'resistance', 'c', 'd'),
    dip('R4', 'resistance', 'c', 'a'), dip('R5', 'resistance', 'd', 'a'),
  ],
};
verifier('un pont refuse la forme canonique', cle(PONT) === null);
verifier('et nomme sa raison, pour que l\'appelant sache qu\'il n\'a pas été compté faux',
  formeCanonique(PONT).raison === 'NON_SERIE_PARALLELE');
verifier('memeCircuit rend null sur un pont — jamais false',
  memeCircuit(PONT, K_FERME) === null && memeCircuit(PONT, PONT) === null);
verifier('le diagnostic d\'un pont reste lisible et porte la raison du refus canonique',
  (() => {
    const r = diagnostiquer(PONT);
    return r.ok === true && r.cle === null && r.raisonCanonique === 'NON_SERIE_PARALLELE';
  })());

verifier('deux générateurs refusent la forme canonique plutôt que d\'en choisir un',
  formeCanonique({
    dipoles: [dip('P1', 'pile', 'a', 'b'), dip('P2', 'pile', 'b', 'c'), dip('L1', 'lampe', 'c', 'a')],
  }).raison === 'PLUSIEURS_GENERATEURS');
verifier('memeCircuit rend null quand un seul des deux graphes est illisible',
  memeCircuit(null, K_FERME) === null && memeCircuit(K_FERME, { dipoles: [] }) === null);

// ════════════════════════════════════════════════════════════════════════════
// 5. L'ÉNONCÉ malformé — le silence est le pire des verdicts
// ════════════════════════════════════════════════════════════════════════════
//
// Symétrique de la section précédente, et moins évidente : c'est ici que le
// module rendrait une valeur plausible. « Aucun constat » se lit comme « le
// schéma est juste » ; le rendre sur un énoncé illisible ferait valider un
// élève sans que rien n'ait été comparé.

verifier('un circuit demandé illisible ne se lit pas « aucun constat »',
  (() => {
    const r = sansLever(() => diagnostiquer(K_FERME, { graphe: { dipoles: [] } }));
    return r.ok === false && r.raison === 'ATTENDU_INVALIDE';
  })());
verifier('un circuit demandé au type inventé est refusé de la même façon',
  sansLever(() => diagnostiquer(K_FERME, { graphe: { dipoles: [dip('X', 'zorglub', 'a', 'b')] } })).raison === 'ATTENDU_INVALIDE');
verifier('et le refus dit ce qui n\'allait pas dans l\'énoncé',
  sansLever(() => diagnostiquer(K_FERME, { graphe: { dipoles: [dip('X', 'zorglub', 'a', 'b')] } }))
    .details?.includes('TYPE_INCONNU') === true);
verifier('un circuit demandé lisible, lui, se compare normalement',
  diagnostiquer(K_FERME, { graphe: K_FERME }).conforme === true);

// La mesure demandée porte sur un appareil que l'élève n'a pas dessiné : c'est
// un composant manquant, pas un schéma sans faute.
const SANS_VOLTMETRE = { dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'a')] };
verifier('l\'appareil de mesure absent du schéma est signalé, pas ignoré',
  codes(SANS_VOLTMETRE, { mesure: { appareil: 'V', auxBornesDe: 'L1' } }).join() === 'COMPOSANT_MANQUANT');
verifier('et le constat nomme l\'appareil qui manque',
  diagnostiquer(SANS_VOLTMETRE, { mesure: { appareil: 'V', auxBornesDe: 'L1' } })
    .constats[0]?.precision.includes('V') === true);
verifier('un dipôle cible absent du schéma est signalé lui aussi',
  codes({ dipoles: [...SANS_VOLTMETRE.dipoles, dip('V', 'voltmetre', 'a', 'b')] },
    { mesure: { appareil: 'V', auxBornesDe: 'L9' } }).join() === 'COMPOSANT_MANQUANT');
verifier('un appareil de mesure qui n\'en est pas un est une erreur d\'énoncé, pas une réponse fausse',
  sansLever(() => diagnostiquer(K_FERME, { mesure: { appareil: 'L1', auxBornesDe: 'P' } })).raison === 'MESURE_HORS_VOLTMETRE');
verifier('un attendu vide ne déclenche rien', codes(K_FERME, {}).length === 0);
verifier('un attendu absent non plus', codes(K_FERME).length === 0);
verifier('un attendu null ne lève pas — il n\'y a rien à comparer, ce n\'est pas une raison de rompre',
  sansLever(() => diagnostiquer(K_FERME, null)).ok === true);
verifier('un attendu qui n\'est pas un objet non plus',
  sansLever(() => diagnostiquer(K_FERME, 'le circuit du cours')).ok === true);

// ════════════════════════════════════════════════════════════════════════════
// 6. Le voltmètre — le geste que 40 % des élèves ratent
// ════════════════════════════════════════════════════════════════════════════

const V_CORRECT = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'),
    dip('K', 'interrupteur', 'c', 'a', { etat: 'ferme' }), dip('V', 'voltmetre', 'c', 'b'),
  ],
};
verifier('un voltmètre en dérivation aux bornes demandées ne produit aucun constat',
  codes(V_CORRECT, { mesure: { appareil: 'V', auxBornesDe: 'L1' } }).length === 0);
verifier('un voltmètre en dérivation ne fait pas passer le circuit pour « en dérivation »',
  type(V_CORRECT) === 'SERIE');

const V_INVERSE = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'),
    dip('K', 'interrupteur', 'c', 'a', { etat: 'ferme' }), dip('V', 'voltmetre', 'b', 'c'),
  ],
};
verifier('le voltmètre bien placé mais retourné est BORNE_INVERSEE, pas « en dérivation, c\'est bon »',
  codes(V_INVERSE, { mesure: { appareil: 'V', auxBornesDe: 'L1' } }).join() === 'BORNE_INVERSEE');

// Le geste est bon, la cible ne l'est pas. Le message doit nommer ce que le
// voltmètre mesure VRAIMENT : sans cela, l'élève lit « pas de L2 » sans savoir
// ce qu'il a mesuré, et le constat ne se corrige pas.
const V_SUR_L1 = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'), dip('L2', 'lampe', 'c', 'd'),
    dip('K', 'interrupteur', 'd', 'a', { etat: 'ferme' }), dip('V', 'voltmetre', 'c', 'b'),
  ],
};
verifier('un voltmètre en dérivation sur L1 quand on demandait L2 est signalé',
  codes(V_SUR_L1, { mesure: { appareil: 'V', auxBornesDe: 'L2' } }).join() === 'VOLTMETRE_AUX_MAUVAISES_BORNES');
verifier('et le constat nomme le dipôle réellement mesuré : L1',
  diagnostiquer(V_SUR_L1, { mesure: { appareil: 'V', auxBornesDe: 'L2' } })
    .constats[0]?.precision.includes('aux bornes de L1') === true);
verifier('il ne cite pas le générateur parmi les dipôles mesurés — la branche du générateur n\'est pas la cible',
  diagnostiquer(V_SUR_L1, { mesure: { appareil: 'V', auxBornesDe: 'L2' } })
    .constats[0]?.precision.includes('P') === false);
verifier('et il ne cite pas non plus le dipôle demandé comme s\'il était mesuré',
  (() => {
    const p = diagnostiquer(V_SUR_L1, { mesure: { appareil: 'V', auxBornesDe: 'L2' } }).constats[0]?.precision ?? '';
    return p.indexOf('L2') === p.lastIndexOf('L2');
  })());

// Le voltmètre aux bornes d'une branche entière, et le même refusé quand la
// branche demandée est plus longue que ce qu'il couvre.
const V_SUR_BRANCHE = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'), dip('L2', 'lampe', 'c', 'd'),
    dip('K', 'interrupteur', 'd', 'a', { etat: 'ferme' }), dip('V', 'voltmetre', 'd', 'b'),
  ],
};
verifier('un voltmètre aux bornes de la branche L1+L2 répond à une cible de branche',
  enDerivationAuxBornesDe(V_SUR_BRANCHE, 'V', ['L1', 'L2']) === true);
verifier('le même voltmètre n\'est pas aux bornes de L1 seule',
  enDerivationAuxBornesDe(V_SUR_BRANCHE, 'V', 'L1') === false);
verifier('un voltmètre sur L1 ne répond pas à la branche L1+L2 demandée',
  codes(V_SUR_L1, { mesure: { appareil: 'V', auxBornesDe: ['L1', 'L2'] } }).join() === 'VOLTMETRE_AUX_MAUVAISES_BORNES');

// L'erreur des 60 % : le voltmètre inséré dans le circuit.
const V_EN_SERIE = {
  dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'), dip('V', 'voltmetre', 'c', 'a')],
};
verifier('le voltmètre inséré en série est nommé pour ce qu\'il est',
  codes(V_EN_SERIE).includes('VOLTMETRE_EN_SERIE'));
verifier('et le circuit est déclaré ouvert par sa faute — la conséquence est dite aussi',
  codes(V_EN_SERIE).includes('CIRCUIT_OUVERT'));
verifier('un voltmètre en série n\'est pas en plus accusé d\'être à l\'envers',
  !codes(V_EN_SERIE).includes('BORNE_INVERSEE'));
verifier('le constat de circuit ouvert nomme la coupure',
  diagnostiquer(V_EN_SERIE).constats.find((c) => c.code === 'CIRCUIT_OUVERT')?.dipoles.includes('V') === true);

// ════════════════════════════════════════════════════════════════════════════
// 7. L'ampèremètre — en série, et surtout pas ailleurs
// ════════════════════════════════════════════════════════════════════════════

// Le faux positif à ne pas produire : un ampèremètre inséré EN SÉRIE dans une
// branche dérivée est correct. Le critère naïf « il relie deux nœuds de
// jonction » l'aurait compté faux.
const A_DANS_UNE_BRANCHE = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'),
    dip('L1', 'lampe', 'b', 'c'), dip('A', 'amperemetre', 'a', 'c'),
    dip('L2', 'lampe', 'b', 'a'),
  ],
};
verifier('un ampèremètre en série dans une branche dérivée ne produit aucun constat',
  codes(A_DANS_UNE_BRANCHE).length === 0);
verifier('le courant y entre bien par la borne « + » : sens = -1',
  sensDuCourant(A_DANS_UNE_BRANCHE).get('A') === -1);
verifier('et le générateur vaut +1 par définition',
  sensDuCourant(A_DANS_UNE_BRANCHE).get('P') === 1);
verifier('sensDuCourant se tait sur un circuit hors cadre', sensDuCourant(PONT) === null);

const A_EN_DERIVATION = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'),
    dip('K', 'interrupteur', 'c', 'a', { etat: 'ferme' }), dip('A', 'amperemetre', 'c', 'b'),
  ],
};
verifier('l\'ampèremètre posé en travers de la lampe est signalé pour le geste',
  codes(A_EN_DERIVATION).includes('AMPEREMETRE_EN_DERIVATION'));
verifier('et la conséquence est dite séparément : la lampe est court-circuitée',
  codes(A_EN_DERIVATION).filter((c) => c === 'COURT_CIRCUIT').length === 2);
verifier('le geste est nommé AVANT sa conséquence — sinon l\'élève lit ce qui ne se corrige pas',
  codes(A_EN_DERIVATION).indexOf('AMPEREMETRE_EN_DERIVATION')
  < codes(A_EN_DERIVATION).indexOf('COURT_CIRCUIT'));
verifier('l\'ampèremètre mal placé n\'est pas en plus accusé d\'être à l\'envers',
  !codes(A_EN_DERIVATION).includes('BORNE_INVERSEE'));
verifier('le constat nomme le dipôle court-circuité par l\'appareil',
  diagnostiquer(A_EN_DERIVATION).constats[0]?.dipoles.includes('L1') === true);

// ════════════════════════════════════════════════════════════════════════════
// 8. Le court-circuit partiel
// ════════════════════════════════════════════════════════════════════════════
//
// Un fil qui ne shunte QU'UNE lampe sur deux. Le piège : signaler la pile, ou
// l'autre lampe, ou les trois — c'est-à-dire noyer le seul constat vrai.

const CC_PARTIEL = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'), dip('L2', 'lampe', 'c', 'd'),
    dip('K', 'interrupteur', 'd', 'a', { etat: 'ferme' }), dip('F', 'fil', 'c', 'd'),
  ],
};
verifier('un seul court-circuit est signalé', codes(CC_PARTIEL).join() === 'COURT_CIRCUIT');
verifier('et il porte sur L2, pas sur L1 ni sur la pile',
  diagnostiquer(CC_PARTIEL).constats[0]?.dipoles[0] === 'L2');
verifier('le fil fautif est nommé — c\'est lui que l\'élève doit enlever',
  diagnostiquer(CC_PARTIEL).constats[0]?.dipoles.includes('F') === true);
verifier('la lampe court-circuitée n\'est pas EN PLUS déclarée isolée',
  !codes(CC_PARTIEL).includes('DIPOLE_ISOLE'));

verifier('le court-circuit par un interrupteur fermé est un court-circuit aussi',
  codes({
    dipoles: [
      dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'), dip('L2', 'lampe', 'c', 'd'),
      dip('f', 'fil', 'd', 'a'), dip('K', 'interrupteur', 'c', 'd', { etat: 'ferme' }),
    ],
  }).includes('COURT_CIRCUIT'));
verifier('un interrupteur OUVERT shunté par un fil n\'est pas un court-circuit — il est seulement inutile',
  codes({
    dipoles: [
      dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'),
      dip('K', 'interrupteur', 'c', 'a', { etat: 'ouvert' }), dip('f', 'fil', 'c', 'a'),
    ],
  }).length === 0);

// La pile court-circuitée : le cas qui fait chauffer le matériel.
verifier('la pile court-circuitée est signalée avec le fil en cause',
  (() => {
    const r = diagnostiquer({
      dipoles: [
        dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'),
        dip('K', 'interrupteur', 'c', 'a', { etat: 'ferme' }), dip('F', 'fil', 'a', 'b'),
      ],
    });
    const c = r.constats.find((x) => x.dipoles[0] === 'P');
    return c?.code === 'COURT_CIRCUIT' && c.dipoles.includes('F');
  })());

// ════════════════════════════════════════════════════════════════════════════
// 9. Série, dérivation, mixte — la question posée à l'élève
// ════════════════════════════════════════════════════════════════════════════

verifier('un circuit d\'une seule boucle est en série', type(K_FERME) === 'SERIE');
verifier('deux lampes aux mêmes bornes, c\'est une dérivation',
  type({ dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'a'), dip('L2', 'lampe', 'b', 'a')] }) === 'DERIVATION');
verifier('trois lampes aux mêmes bornes, c\'est toujours une dérivation',
  type({
    dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'a'),
      dip('L2', 'lampe', 'b', 'a'), dip('L3', 'lampe', 'b', 'a')],
  }) === 'DERIVATION');
verifier('un interrupteur en série qui commande deux lampes en dérivation laisse une dérivation',
  type(DERIVATION_SIMPLE) === 'DERIVATION');

// Le cas nommé par la charte : le circuit mixte série-dérivation. Une lampe est
// traversée par TOUT le courant, les deux autres se le partagent — ce n'est pas
// le même circuit qu'une dérivation, et l'élève à qui l'on demande de le
// qualifier ne répondra pas la même chose.
const MIXTE_SERIE_DERIVATION = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'),
    dip('L2', 'lampe', 'c', 'd'), dip('L3', 'lampe', 'c', 'd'), dip('f', 'fil', 'd', 'a'),
  ],
};
verifier('une lampe en série avec deux lampes en dérivation est un circuit MIXTE',
  type(MIXTE_SERIE_DERIVATION) === 'MIXTE');
verifier('deux blocs en dérivation en série l\'un avec l\'autre sont mixtes aussi',
  type({
    dipoles: [
      dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'), dip('L2', 'lampe', 'b', 'c'),
      dip('L3', 'lampe', 'c', 'a'), dip('L4', 'lampe', 'c', 'a'),
    ],
  }) === 'MIXTE');
verifier('et le mixte n\'est pas confondu avec la dérivation qu\'il contient',
  memeCircuit(MIXTE_SERIE_DERIVATION, DERIVATION_SIMPLE) === false);
verifier('le type est refusé, jamais deviné, quand le circuit sort du cadre',
  typeDeCircuit(PONT).type === null && typeDeCircuit(PONT).raison === 'NON_SERIE_PARALLELE');
verifier('série et dérivation de mêmes dipôles ne sont pas le même circuit',
  memeCircuit(
    { dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'), dip('L2', 'lampe', 'c', 'a')] },
    { dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'a'), dip('L2', 'lampe', 'b', 'a')] },
  ) === false);

// ════════════════════════════════════════════════════════════════════════════
// 10. Les relations topologiques nommées à l'élève
// ════════════════════════════════════════════════════════════════════════════

const DEUX_LAMPES_DERIVATION = {
  dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'a'), dip('L2', 'lampe', 'b', 'a')],
};
verifier('une pile et une lampe seules dans une boucle sont EN SÉRIE, pas en dérivation',
  relationTopologique({ dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'a')] }, 'P', 'L1') === 'SERIE');
verifier('deux lampes aux mêmes bornes sont en dérivation',
  relationTopologique(DEUX_LAMPES_DERIVATION, 'L1', 'L2') === 'DERIVATION');
// Dans le circuit mixte, L1 est traversée par tout le courant et L2 par une
// partie : elles ne sont NI en série NI en dérivation. Le troisième mot existe
// pour ce cas, et l'employer est plus juste que de trancher entre les deux.
verifier('la lampe du tronc commun et une lampe de branche ne sont ni en série ni en dérivation',
  relationTopologique(MIXTE_SERIE_DERIVATION, 'L1', 'L2') === 'INDEPENDANTS');
verifier('mais les deux lampes de branches, elles, sont bien en dérivation',
  relationTopologique(MIXTE_SERIE_DERIVATION, 'L2', 'L3') === 'DERIVATION');
verifier('sontEnSerie et sontEnDerivation ne sont jamais vrais ensemble',
  !(sontEnSerie(DEUX_LAMPES_DERIVATION, 'L1', 'L2') && sontEnDerivation(DEUX_LAMPES_DERIVATION, 'L1', 'L2')));
verifier('un dipôle avec lui-même n\'a pas de relation', relationTopologique(K_FERME, 'L1', 'L1') === null);
verifier('un identifiant inconnu rend null, pas « indépendants »',
  relationTopologique(K_FERME, 'L1', 'L9') === null && sontEnSerie(K_FERME, 'L9', 'P') === null);
verifier('un graphe illisible rend null lui aussi', sontEnDerivation(null, 'a', 'b') === null);

verifier('les extrémités d\'une branche série sont ses deux bouts libres',
  (extremitesDeBranche(V_SUR_BRANCHE, ['L1', 'L2']) ?? []).sort().join() === 'b,d');
verifier('une boucle fermée n\'est pas une branche',
  extremitesDeBranche({
    dipoles: [dip('L1', 'lampe', 'a', 'b'), dip('L2', 'lampe', 'b', 'c'), dip('L3', 'lampe', 'c', 'a')],
  }, ['L1', 'L2', 'L3']) === null);
verifier('deux dipôles disjoints ne forment pas une branche, même avec deux bouts libres à eux deux',
  extremitesDeBranche({
    dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'),
      dip('L2', 'lampe', 'd', 'e'), dip('K', 'interrupteur', 'c', 'a', { etat: 'ferme' })],
  }, ['L1', 'L2']) === null);
verifier('une liste vide n\'est pas une branche', extremitesDeBranche(K_FERME, []) === null);
verifier('un identifiant inconnu n\'est pas une branche', extremitesDeBranche(K_FERME, ['L9']) === null);
verifier('la pile est en série avec la branche lampe + interrupteur',
  enSerieAvecBranche(K_FERME, 'P', ['L1', 'K']) === true);
verifier('un dipôle n\'est pas en série avec une branche qui le contient',
  enSerieAvecBranche(K_FERME, 'L1', ['L1', 'K']) === null);
verifier('un dipôle ne se mesure pas à ses propres bornes',
  enDerivationAuxBornesDe(V_CORRECT, 'V', 'V') === null);

verifier('les branches partitionnent les dipôles, sans en perdre ni en dupliquer',
  (() => {
    const b = branches(MIXTE_SERIE_DERIVATION);
    const tous = b.flatMap((x) => x.dipoles);
    return tous.length === 4 && new Set(tous).size === 4;
  })());

// ════════════════════════════════════════════════════════════════════════════
// 11. L'ORDRE des constats — le geste avant sa conséquence
// ════════════════════════════════════════════════════════════════════════════
//
// Le module donne une gravité à chaque code : ce qui empêche le circuit de
// fonctionner (1), puis ce qui fausse la mesure (2), puis ce qui est seulement
// inutile (3). Les tests qui suivent sont ceux qui BASCULENT si le tri saute :
// dans chacun, l'ordre d'insertion est l'inverse de l'ordre servi.

const ISOLE_ET_MANQUANT = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'),
    dip('K', 'interrupteur', 'c', 'a', { etat: 'ferme' }), dip('L2', 'lampe', 'c', 'd'),
  ],
};
const DEMANDE_TROIS_LAMPES = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'),
    dip('K', 'interrupteur', 'c', 'a', { etat: 'ferme' }),
    dip('L2', 'lampe', 'c', 'a'), dip('L3', 'lampe', 'c', 'a'),
  ],
};
verifier('le composant manquant (gravité 2) passe avant la lampe pendante (gravité 3), bien qu\'il soit constaté après',
  codes(ISOLE_ET_MANQUANT, { graphe: DEMANDE_TROIS_LAMPES }).join() === 'COMPOSANT_MANQUANT,DIPOLE_ISOLE');
verifier('les gravités servies sont croissantes sur tous les cas-témoins',
  CAS_TEMOINS.circuits.every((cas) => {
    const g = diagnostiquer(cas.graphe, cas.attendu).constats.map((c) => c.gravite);
    return g.every((v, i) => i === 0 || g[i - 1] <= v);
  }));
verifier('le circuit ouvert (gravité 1) est servi avant le voltmètre en série (gravité 2)',
  codes(V_EN_SERIE)[0] === 'CIRCUIT_OUVERT');
verifier('aucun constat n\'est servi sans nommer de dipôle ni préciser',
  CAS_TEMOINS.circuits.every((cas) => diagnostiquer(cas.graphe, cas.attendu).constats
    .every((c) => c.precision.length > 0 && typeof c.message === 'string')));

// « TOPOLOGIE_INCORRECTE n'est servi que si RIEN de plus précis n'a pu être
// dit. » Le test mord ici : le circuit N'EST PAS celui demandé, et un constat
// précis existe.
verifier('le verdict par défaut ne s\'ajoute pas à un constat précis',
  (() => {
    const r = diagnostiquer(PILE_SEULE_RETOURNEE, { graphe: A_CORRECT });
    return r.conforme === false && r.codes.join() === 'BORNE_INVERSEE';
  })());
verifier('mais il est bien servi quand il n\'y a rien de plus précis à dire',
  codes(
    { dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'a'), dip('L2', 'lampe', 'b', 'a')] },
    { graphe: { dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'), dip('L2', 'lampe', 'c', 'a')] } },
  ).join() === 'TOPOLOGIE_INCORRECTE');
verifier('un circuit conforme ne reçoit ni constat ni verdict par défaut',
  (() => {
    const r = diagnostiquer(DERIVATION_REDESSINEE, { graphe: DERIVATION_SIMPLE });
    return r.conforme === true && r.codes.length === 0;
  })());
verifier('conforme reste null — jamais false — quand le schéma sort du cadre série-parallèle',
  diagnostiquer(PONT, { graphe: K_FERME }).conforme === null);

// ════════════════════════════════════════════════════════════════════════════
// 12. Le générateur
// ════════════════════════════════════════════════════════════════════════════

verifier('deux piles montées tête-bêche en série sont signalées',
  codes({
    dipoles: [dip('P1', 'pile', 'a', 'b'), dip('P2', 'pile', 'c', 'b'), dip('L1', 'lampe', 'c', 'a')],
  }).join() === 'GENERATEURS_OPPOSES');
verifier('deux piles montées dans le bon sens ne le sont pas',
  codes({
    dipoles: [dip('P1', 'pile', 'a', 'b'), dip('P2', 'pile', 'b', 'c'), dip('L1', 'lampe', 'c', 'a')],
  }).length === 0);
verifier('deux piles en dérivation tête-bêche sont signalées',
  codes({
    dipoles: [dip('P1', 'pile', 'a', 'b'), dip('P2', 'pile', 'b', 'a'), dip('L1', 'lampe', 'b', 'a')],
  }).join() === 'GENERATEURS_OPPOSES');
verifier('deux piles en dérivation dans le même sens ne le sont pas',
  codes({
    dipoles: [dip('P1', 'pile', 'a', 'b'), dip('P2', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'a')],
  }).length === 0);
verifier('un circuit sans générateur est signalé, et une fois seulement',
  codes({
    dipoles: [dip('L1', 'lampe', 'a', 'b'), dip('K', 'interrupteur', 'b', 'c', { etat: 'ferme' }),
      dip('L2', 'lampe', 'c', 'a')],
  }).join() === 'PAS_DE_GENERATEUR');
verifier('sans générateur, aucun dipôle n\'est déclaré isolé — l\'énumération noierait le constat utile',
  !codes({
    dipoles: [dip('L1', 'lampe', 'a', 'b'), dip('K', 'interrupteur', 'b', 'c', { etat: 'ferme' }),
      dip('L2', 'lampe', 'c', 'a')],
  }).includes('DIPOLE_ISOLE'));
verifier('circuit ouvert : les dipôles ne sont pas tous déclarés isolés en plus',
  codes(K_OUVERT).join() === 'CIRCUIT_OUVERT');
verifier('et la coupure est nommée', diagnostiquer(K_OUVERT).constats[0]?.dipoles.includes('K') === true);

// ════════════════════════════════════════════════════════════════════════════
// 13. Terminaison
// ════════════════════════════════════════════════════════════════════════════
//
// La réduction série-parallèle est une boucle `while (progres)`. Un graphe
// dégénéré qui la ferait tourner sans fin bloquerait la séance de l'élève, pas
// un test : d'où ces cas à la limite, tous chronométrés par le simple fait
// qu'ils rendent la main.

const CENT_LAMPES = { dipoles: [dip('P', 'pile', 'a', 'b')] };
for (let i = 0; i < 100; i += 1) CENT_LAMPES.dipoles.push(dip(`L${i}`, 'lampe', 'b', 'a'));
verifier('cent lampes en dérivation rendent la main, et une dérivation',
  type(CENT_LAMPES) === 'DERIVATION');

const CENT_EN_SERIE = { dipoles: [dip('P', 'pile', 'n0', 'n100')] };
for (let i = 0; i < 100; i += 1) CENT_EN_SERIE.dipoles.push(dip(`L${i}`, 'lampe', `n${i}`, `n${i + 1}`));
verifier('cent lampes en série rendent la main, et une série', type(CENT_EN_SERIE) === 'SERIE');

const CHAINE_DE_FILS = { dipoles: [dip('P', 'pile', 'f0', 'z'), dip('L1', 'lampe', 'z', 'f50')] };
for (let i = 0; i < 50; i += 1) CHAINE_DE_FILS.dipoles.push(dip(`w${i}`, 'fil', `f${i}`, `f${i + 1}`));
verifier('cinquante fils en cascade se contractent en un seul nœud',
  memeCircuit(CHAINE_DE_FILS, { dipoles: [dip('P', 'pile', 'x', 'z'), dip('L1', 'lampe', 'z', 'x')] }) === true);

// ── Rapport ─────────────────────────────────────────────────────────────────

console.log(`${passes} test(s) passé(s).`);
for (const e of echecs) console.log(`  ✗ ${e}`);
if (echecs.length) {
  console.log(`\n${echecs.length} échec(s).`);
  process.exit(1);
}
