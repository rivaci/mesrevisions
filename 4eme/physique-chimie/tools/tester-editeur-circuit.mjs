// Relecture ADVERSE de l'éditeur de circuit — hors navigateur.
//
//     node tools/tester-editeur-circuit.mjs
//
// ── Pourquoi une suite de plus ─────────────────────────────────────────────
//
// `tools/tester-circuit.mjs` éprouve le GRAPHE, `tools/tester-reponse.mjs`
// éprouve la couche de verdict sur le corpus. Ce fichier-ci éprouve la JOINTURE,
// et il la suppose fautive : un widget qui compose un circuit, une correction qui
// le juge, et entre les deux un comparateur — `memeCircuit` — qui a raison sur
// son propre terrain et qui aurait tort ici.
//
// Cinq questions, dans l'ordre où elles coûtent cher :
//
//   ① le comparateur est-il le bon, et le restera-t-il ? Trois lampes en série,
//     un voltmètre aux bornes de L1, le même aux bornes de L2 : `memeCircuit`
//     les déclare IDENTIQUES, et il a raison — ce sont les mêmes classes
//     d'équivalence. La correction, elle, doit les séparer. Le test est écrit
//     pour ÉCHOUER le jour où quelqu'un rebranche `conforme` à la place des
//     constats ; c'est le seul garde-fou contre ce retour-là, et le corpus n'en
//     est pas un (il pourrait un jour n'avoir que des cibles distinguables) ;
//   ② les douze codes d'erreur sont-ils justes ? Un par un : la réponse d'élève
//     qui doit le déclencher, et l'exigence qu'il soit déclenché POUR LUI SEUL.
//     Là où deux codes sortent ensemble, la coïncidence est déclarée et motivée
//     — un voltmètre en série ouvre vraiment le circuit, et l'élève doit LIRE
//     les deux constats, pas en subir un silencieux ;
//   ③ les items de circuit sont-ils branchés, et quand ils ne le sont pas, quelle
//     garde exactement les a refusés ? Le compte seul ne dit rien : un item qui
//     passerait d'un refus à un autre resterait inerte sans que rien ne bouge ;
//   ④ la figure ne montre-t-elle pas la réponse ? C'est le défaut trouvé sur les
//     grilles de particules, et l'invariant 6 le rend structurel : la figure est
//     ENGENDRÉE par l'objet formel de la correction. Item par item, jamais par
//     un compte global ;
//   ⑤ rien d'illisible sous les yeux de l'élève, et rien de validable sans un
//     geste.
//
// ── Ce que ce fichier NE peut pas éprouver ─────────────────────────────────
//
// `js/app.js` touche le DOM à l'import : ses gabarits ne sont pas atteignables
// ici. Les contrôles de la section ⑤ portent donc sur les CHAÎNES que
// `js/reponse.js` fabrique et que le widget se contente d'assembler, et les
// formules d'assemblage y sont recopiées à l'identique — ce qui est une
// duplication, et elle est signalée en réserve. Les 375 px et les 44 px se
// mesurent au navigateur, pas ici.

import {
  CODES_ERREUR_CIRCUIT,
  diagnostiquer,
  enDerivationAuxBornesDe,
  memeCircuit,
  normaliser,
  typeDeCircuit,
} from '../js/circuit.js';
import {
  aComposer,
  circuitCompose,
  corriger,
  formeDeLObjetFormel,
  laFigureEstLaReponse,
  solutionsDeCircuit,
  sorteDeReponse,
} from '../js/reponse.js';
import { rendreFigure } from '../js/schema.js';
import { avecUn, libelleFormel } from '../js/lexique.js';
import { VERDICTS } from '../js/unites.js';
import { ITEMS } from '../js/data/items/index.js';

let passes = 0;
const echecs = [];
const reserves = [];
const verifier = (nom, condition) => { if (condition) passes += 1; else echecs.push(nom); };
const reserve = (texte) => reserves.push(texte);

const dip = (id, type, moins, plus, extra = {}) => ({ id, type, bornes: [moins, plus], ...extra });
const codesDe = (g, attendu) => {
  const d = diagnostiquer(g, attendu);
  return d.ok ? [...d.codes].sort() : [`REFUS:${d.raison}`];
};
const memes = (a, b) => a.length === b.length && [...a].sort().join(',') === [...b].sort().join(',');

// ════════════════════════════════════════════════════════════════════════════
// ① LE PIÈGE DU COMPARATEUR
// ════════════════════════════════════════════════════════════════════════════
//
// Trois lampes identiques en série, et un voltmètre. Aux bornes de L1, puis aux
// bornes de L2. Les deux schémas ont la MÊME forme canonique : la permutation
// dans une branche série est libre — c'est une décision explicite de
// `circuit.js`, et elle a raison, l'élève qui place son ampèremètre après la
// lampe au lieu d'avant ne s'est pas trompé.
//
// Mais la question posée n'est pas « est-ce le même circuit ? », c'est « la
// tension de QUELLE lampe as-tu mesurée ? ». Sur cette question-là, l'unique
// comparateur qui répond est celui qui NOMME la cible. Un `memeCircuit` rebranché
// ici validerait, en silence et sur toute la famille, l'élève qui a mesuré la
// mauvaise lampe — et c'est très exactement l'erreur que le chapitre vise.

const TROIS_LAMPES = (moins, plus) => ({
  dipoles: [
    dip('P', 'pile', 'a', 'b'),
    dip('L1', 'lampe', 'b', 'c'),
    dip('L2', 'lampe', 'c', 'd'),
    dip('L3', 'lampe', 'd', 'a'),
    dip('V', 'voltmetre', moins, plus),
  ],
});
// « + » du côté par où le courant entre dans la lampe : il sort de la pile par
// « b », donc pour L1 (b→c) la borne « + » est en « b », soit bornes = [c, b].
const V_SUR_L1 = TROIS_LAMPES('c', 'b');
const V_SUR_L2 = TROIS_LAMPES('d', 'c');
const V_SUR_L3 = TROIS_LAMPES('a', 'd');

{
  verifier('trois lampes en série : le voltmètre sur L1 et sur L2 sont LE MÊME circuit pour memeCircuit',
    memeCircuit(V_SUR_L1, V_SUR_L2) === true);
  verifier('…et sur L3 aussi : les trois sont dans la même classe d\'équivalence',
    memeCircuit(V_SUR_L1, V_SUR_L3) === true);
  // Ce n'est pas un défaut à corriger : la clé canonique est la même parce que
  // les trois lampes sont interchangeables. Le comparateur ne ment pas, il
  // répond à une autre question.
  verifier('…et ce n\'est pas un refus déguisé : les deux formes canoniques existent',
    diagnostiquer(V_SUR_L1).cle !== null && diagnostiquer(V_SUR_L2).cle !== null);

  const attenduL1 = { graphe: V_SUR_L1, mesure: { appareil: 'V', auxBornesDe: 'L1' } };
  verifier('le voltmètre aux bornes de L1, quand on demandait L1 : aucun constat',
    memes(codesDe(V_SUR_L1, attenduL1), []));
  for (const [nom, graphe] of [['L2', V_SUR_L2], ['L3', V_SUR_L3]]) {
    verifier(`le voltmètre aux bornes de ${nom}, quand on demandait L1 : VOLTMETRE_AUX_MAUVAISES_BORNES`,
      memes(codesDe(graphe, attenduL1), ['VOLTMETRE_AUX_MAUVAISES_BORNES']));
    // LA ligne. `conforme` vaut `true` en même temps que le constat qui refuse :
    // un seul caractère sépare le verdict juste du verdict faux.
    verifier(`…et diagnostiquer rend pourtant conforme: true sur ${nom} — le piège est là, pas ailleurs`,
      diagnostiquer(graphe, attenduL1).conforme === true);
  }
  // Le constat doit NOMMER les deux lampes : « tu as mesuré L2, on demandait
  // L1 ». Un TOPOLOGIE_INCORRECTE générique aurait la même issue et n'apprendrait
  // rien — c'est la raison d'être du module tout entier.
  const c = diagnostiquer(V_SUR_L2, attenduL1).constats[0];
  verifier('…et le constat nomme la lampe mesurée ET la lampe demandée',
    /\bL2\b/.test(c.precision) && /\bL1\b/.test(c.precision));
  verifier('…et il dit que le GESTE est bon : c\'est la cible qui ne l\'est pas',
    /en dérivation/.test(c.message) && /le geste est bon/.test(c.message));
}

// ── Le même piège, mais par le chemin que l'élève emprunte ─────────────────
//
// Ce qui précède éprouve `circuit.js`. Ce qui suit éprouve la COUCHE DE VERDICT
// sur le même circuit, par `corriger` : c'est là que le rebranchement se ferait,
// et c'est donc là que l'alarme doit se déclencher. L'item est fabriqué ici, à la
// main, pour que le garde-fou survive à un corpus qui changerait.

const ITEM_TROIS_LAMPES = Object.freeze({
  id: 'test-editeur-trois-lampes-en-serie',
  sfPrincipal: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication',
  reponse: { objetFormel: V_SUR_L1 },
  situation: {
    demande: 'schema',
    mesure: { appareil: 'V', cible: 'L1' },
    circuit: { dipoles: V_SUR_L1.dipoles.filter((d) => d.id !== 'V') },
  },
});

// Un plan absent ferait LEVER tout ce qui suit, et une suite qui s'interrompt
// cesse de rendre compte des cent tests suivants. On le dit et on s'arrête là.
if (aComposer(ITEM_TROIS_LAMPES) === null) {
  echecs.push('l\'item fabriqué n\'est plus servi par le widget — la section ① ne peut pas s\'exécuter');
} else {
  const plan = aComposer(ITEM_TROIS_LAMPES);
  verifier('l\'item fabriqué est bien servi par le widget', plan.forme === 'circuit');
  verifier('…et sa cible est L1, celle que la situation déclare', plan.mesure?.auxBornesDe === 'L1');

  const juste = corriger(ITEM_TROIS_LAMPES, { compose: { emplacement: 'travers:L1', sens: -1 } });
  verifier('le voltmètre posé en travers de L1, « + » du bon côté : JUSTE',
    juste.juste === true && juste.issue === 'reussite');

  // Le cœur du garde-fou. Pour chacune des deux lampes jumelles, dans les deux
  // sens. La polarité entre dans la clé canonique — un voltmètre retourné n'est
  // pas le même circuit —, donc seules les deux compositions BIEN ORIENTÉES sur
  // la mauvaise lampe sont déclarées identiques à l'attendu. Ce sont elles, les
  // trompeuses : le geste est irréprochable, l'orientation est juste, et la
  // lampe est la mauvaise. Les quatre doivent être refusées, et par le même code.
  const trompeuses = [];
  for (const cible of ['L2', 'L3']) {
    for (const sens of [1, -1]) {
      const compose = { emplacement: `travers:${cible}`, sens };
      const r = corriger(ITEM_TROIS_LAMPES, { compose });
      trompeuses.push({
        cible,
        sens,
        identique: memeCircuit(circuitCompose(plan, compose), plan.attendu) === true,
        refuse: r.juste !== true && r.issue === 'echec'
          && (r.constats ?? []).some((x) => x.code === 'VOLTMETRE_AUX_MAUVAISES_BORNES'),
      });
    }
  }
  const bienOrientees = trompeuses.filter((t) => t.sens === -1);
  verifier(`memeCircuit valide les deux compositions bien orientées sur la mauvaise lampe — ${bienOrientees.filter((t) => t.identique).length}/2`,
    bienOrientees.length === 2 && bienOrientees.every((t) => t.identique));
  verifier('…et refuse les deux autres, parce que la polarité entre dans la clé canonique',
    trompeuses.filter((t) => t.sens === 1).every((t) => t.identique === false));
  verifier(`…et le VERDICT les refuse toutes les quatre, du même code — ${trompeuses.filter((t) => t.refuse).length}/4`,
    trompeuses.every((t) => t.refuse));

  // Le pendant, sans lequel le test précédent serait satisfait par un module qui
  // refuse tout : une composition que le comparateur déclare DIFFÉRENTE doit
  // elle aussi être refusée, et pour une autre raison.
  const enSerie = plan.emplacements.find((e) => e.sorte === 'fil');
  const gSerie = circuitCompose(plan, { emplacement: enSerie.cle, sens: 1 });
  const rSerie = corriger(ITEM_TROIS_LAMPES, { compose: { emplacement: enSerie.cle, sens: 1 } });
  verifier('le voltmètre INSÉRÉ dans la boucle n\'est pas le circuit attendu',
    memeCircuit(gSerie, plan.attendu) === false);
  verifier('…et il est refusé en disant l\'erreur de CEDRE : en série, et le circuit ouvert',
    rSerie.juste !== true
      && (rSerie.constats ?? []).some((x) => x.code === 'VOLTMETRE_EN_SERIE')
      && (rSerie.constats ?? []).some((x) => x.code === 'CIRCUIT_OUVERT'));

  // Une seule composition juste sur tout le jeu de boutons : ni ingagnable, ni
  // gagné sans un geste.
  const offertes = plan.emplacements.length * 2;
  verifier(`une seule composition sur ${offertes} est acceptée`,
    solutionsDeCircuit(plan).length === 1);
}

// ── …et le corpus en porte, pour que le garde-fou ne soit pas que théorique ─
{
  const CIRCUITS = ITEMS.filter((i) => sorteDeReponse(i) === 'objet-formel'
    && formeDeLObjetFormel(i.reponse?.objetFormel) === 'circuit' && aComposer(i) !== null);
  const porteuses = CIRCUITS.filter((item) => {
    const plan = aComposer(item);
    if (!plan.mesure) return false;
    return plan.emplacements.some((e) => [1, -1].some((sens) => {
      const compose = { emplacement: e.cle, sens };
      return memeCircuit(circuitCompose(plan, compose), plan.attendu) === true
        && corriger(item, { compose }).juste !== true;
    }));
  });
  verifier(`le corpus porte lui aussi des compositions que memeCircuit validerait — ${porteuses.length} items`,
    porteuses.length >= 1);
  const codesServis = new Set(porteuses.flatMap((item) => {
    const plan = aComposer(item);
    return plan.emplacements.flatMap((e) => [1, -1].flatMap((sens) => {
      const compose = { emplacement: e.cle, sens };
      if (memeCircuit(circuitCompose(plan, compose), plan.attendu) !== true) return [];
      return (corriger(item, { compose }).constats ?? []).map((c) => c.code);
    }));
  }));
  verifier(`…et chacune ressort en VOLTMETRE_AUX_MAUVAISES_BORNES, jamais en générique — vus : ${[...codesServis].join(', ')}`,
    codesServis.size === 1 && codesServis.has('VOLTMETRE_AUX_MAUVAISES_BORNES'));
}

// ── Le trou symétrique : accepter sans avoir comparé ───────────────────────
//
// `memeCircuit` rend `null` — jamais `false` — sur un graphe hors cadre
// série-parallèle, et `diagnostiquer` n'ajoute alors PAS `TOPOLOGIE_INCORRECTE`
// (le test est `conforme === false`). Une composition hors cadre qui ne
// déclencherait aucun autre constat passerait donc pour juste sans qu'aucune
// comparaison ait eu lieu. Le corpus n'en produit aucune ; la vérification est
// écrite pour que l'apparition de la première se voie.
{
  const servis = ITEMS.filter((i) => sorteDeReponse(i) === 'objet-formel'
    && formeDeLObjetFormel(i.reponse?.objetFormel) === 'circuit' && aComposer(i) !== null);
  const trous = [];
  let examinees = 0;
  for (const item of servis) {
    const plan = aComposer(item);
    const attendu = plan.mesure ? { graphe: plan.attendu, mesure: plan.mesure } : { graphe: plan.attendu };
    for (const e of plan.emplacements) {
      for (const sens of [1, -1]) {
        examinees += 1;
        const d = diagnostiquer(circuitCompose(plan, { emplacement: e.cle, sens }), attendu);
        if (d.ok && d.constats.length === 0 && d.conforme !== true) {
          trous.push(`${item.id} ${e.cle}@${sens} (conforme=${d.conforme}, ${d.raisonCanonique})`);
        }
      }
    }
  }
  verifier(`aucune composition n'est acceptée sans avoir été comparée — ${examinees} examinées, ${trous.slice(0, 3).join(' | ')}`,
    trous.length === 0);
}

// ════════════════════════════════════════════════════════════════════════════
// ② LES DOUZE CODES, UN PAR UN — ET POUR EUX SEULS
// ════════════════════════════════════════════════════════════════════════════
//
// Pour chaque code : la réponse d'élève qui doit le déclencher, et l'ensemble
// EXACT des codes attendus. L'exactitude est la moitié qui compte — un code de
// plus est un reproche que l'élève n'a pas mérité, un code de moins est une
// erreur qu'on lui laisse.
//
// Trois cas rendent DEUX codes, et les trois sont des faits de physique, pas des
// approximations du module. Le champ `pourquoiDeux` l'écrit à chaque fois : si
// un jour l'un d'eux se met à rendre un code unique, ce n'est pas un progrès de
// concision, c'est un constat perdu.

const CAS = Object.freeze([
  {
    nom: 'aucun générateur',
    // La boucle est fermée, rien ne l'alimente. Deux lampes, pour que
    // l'interrupteur ne court-circuite pas la seule.
    graphe: { dipoles: [dip('L1', 'lampe', 'a', 'b'), dip('K', 'interrupteur', 'b', 'c', { etat: 'ferme' }), dip('L2', 'lampe', 'c', 'a')] },
    codes: ['PAS_DE_GENERATEUR'],
  },
  {
    nom: 'deux piles tête-bêche',
    graphe: { dipoles: [dip('P1', 'pile', 'a', 'b'), dip('P2', 'pile', 'c', 'b'), dip('L1', 'lampe', 'c', 'a')] },
    codes: ['GENERATEURS_OPPOSES'],
  },
  {
    nom: 'interrupteur ouvert',
    graphe: { dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'), dip('K', 'interrupteur', 'c', 'a', { etat: 'ouvert' })] },
    codes: ['CIRCUIT_OUVERT'],
  },
  {
    nom: 'une lampe court-circuitée par un fil, la pile épargnée',
    // Deux lampes : le fil ne shunte que L1. Avec une seule lampe, la pile
    // serait court-circuitée par la même occasion et le cas en dirait deux.
    graphe: { dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'), dip('L2', 'lampe', 'c', 'a'), dip('F', 'fil', 'b', 'c')] },
    codes: ['COURT_CIRCUIT'],
  },
  {
    nom: 'ampèremètre posé en travers d\'une lampe',
    graphe: { dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'), dip('L2', 'lampe', 'c', 'a'), dip('A', 'amperemetre', 'b', 'c')] },
    codes: ['AMPEREMETRE_EN_DERIVATION', 'COURT_CIRCUIT'],
    pourquoiDeux: 'un ampèremètre en dérivation COURT-CIRCUITE ce qu\'il enjambe : c\'est le '
      + 'même geste, mais « refais ton branchement » et « L1 ne s\'allume plus » ne se '
      + 'remplacent pas l\'un l\'autre.',
  },
  {
    nom: 'voltmètre inséré dans la boucle',
    graphe: { dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'), dip('V', 'voltmetre', 'c', 'a')] },
    codes: ['VOLTMETRE_EN_SERIE', 'CIRCUIT_OUVERT'],
    pourquoiDeux: 'l\'erreur de CEDRE : le voltmètre inséré OUVRE le circuit, et plus rien ne '
      + 'fonctionne. Le taire laisserait l\'élève croire que seule la mesure est fausse.',
  },
  {
    nom: 'voltmètre inséré dans UNE branche d\'une dérivation',
    // La variante qui n'ouvre pas le circuit : l'autre branche le referme. Ce
    // qui meurt, c'est la branche coupée — et c'est DIPOLE_ISOLE qui le dit.
    graphe: {
      dipoles: [
        dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'x'), dip('V', 'voltmetre', 'x', 'c'),
        dip('L2', 'lampe', 'b', 'c'), dip('K', 'interrupteur', 'c', 'a', { etat: 'ferme' }),
      ],
    },
    codes: ['VOLTMETRE_EN_SERIE', 'DIPOLE_ISOLE'],
    pourquoiDeux: 'ici le circuit reste fermé par L2 : ce n\'est donc pas CIRCUIT_OUVERT qui '
      + 'accompagne, c\'est « L1 n\'est plus traversée ». Le module choisit le bon des deux.',
  },
  {
    nom: 'voltmètre en dérivation, mais sur l\'autre lampe',
    graphe: V_SUR_L2,
    attendu: { graphe: V_SUR_L1, mesure: { appareil: 'V', auxBornesDe: 'L1' } },
    codes: ['VOLTMETRE_AUX_MAUVAISES_BORNES'],
  },
  {
    nom: 'ampèremètre à l\'envers',
    graphe: { dipoles: [dip('P', 'pile', 'a', 'b'), dip('A', 'amperemetre', 'b', 'c'), dip('L1', 'lampe', 'c', 'd'), dip('K', 'interrupteur', 'd', 'a', { etat: 'ferme' })] },
    codes: ['BORNE_INVERSEE'],
  },
  {
    nom: 'lampe pendante',
    graphe: { dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'), dip('K', 'interrupteur', 'c', 'a', { etat: 'ferme' }), dip('L2', 'lampe', 'c', 'd')] },
    codes: ['DIPOLE_ISOLE'],
  },
  {
    nom: 'une lampe manquante',
    graphe: { dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'a')] },
    attendu: { graphe: { dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'), dip('L2', 'lampe', 'c', 'a')] } },
    codes: ['COMPOSANT_MANQUANT'],
  },
  {
    nom: 'une lampe en trop',
    graphe: { dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'), dip('L2', 'lampe', 'c', 'a')] },
    attendu: { graphe: { dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'a')] } },
    codes: ['COMPOSANT_EN_TROP'],
  },
  {
    nom: 'les bons dipôles, mal reliés',
    graphe: { dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'a'), dip('L2', 'lampe', 'b', 'a')] },
    attendu: { graphe: { dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'), dip('L2', 'lampe', 'c', 'a')] } },
    codes: ['TOPOLOGIE_INCORRECTE'],
  },
]);

// Les témoins MUETS. Ils font la moitié « pour lui seul » du contrôle : un
// module qui crierait au loup sur tout schéma passerait les treize cas ci-dessus
// et échouerait ici.
const MUETS = Object.freeze([
  { nom: 'série canonique', graphe: { dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'), dip('K', 'interrupteur', 'c', 'a', { etat: 'ferme' })] } },
  {
    nom: 'voltmètre en dérivation aux bornes demandées',
    graphe: { dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'), dip('K', 'interrupteur', 'c', 'a', { etat: 'ferme' }), dip('V', 'voltmetre', 'c', 'b')] },
    attendu: { mesure: { appareil: 'V', auxBornesDe: 'L1' } },
  },
  { nom: 'ampèremètre en série, bien orienté', graphe: { dipoles: [dip('P', 'pile', 'a', 'b'), dip('A', 'amperemetre', 'c', 'b'), dip('L1', 'lampe', 'c', 'd'), dip('K', 'interrupteur', 'd', 'a', { etat: 'ferme' })] } },
  // Le contre-exemple que `circuit.js` se donne à lui-même : un ampèremètre
  // inséré dans UNE branche d'une dérivation est correct. Le critère naïf
  // « il relie deux nœuds de jonction » l'aurait compté faux.
  {
    nom: 'ampèremètre en série dans une branche d\'une dérivation',
    graphe: {
      dipoles: [
        dip('P', 'pile', 'a', 'b'), dip('A', 'amperemetre', 'x', 'b'), dip('L1', 'lampe', 'x', 'c'),
        dip('L2', 'lampe', 'b', 'c'), dip('K', 'interrupteur', 'c', 'a', { etat: 'ferme' }),
      ],
    },
  },
  { nom: 'deux piles en série, dans le même sens', graphe: { dipoles: [dip('P1', 'pile', 'a', 'b'), dip('P2', 'pile', 'b', 'c'), dip('L1', 'lampe', 'c', 'a')] } },
  { nom: 'deux lampes en dérivation', graphe: { dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'a'), dip('L2', 'lampe', 'b', 'a')] } },
  { nom: 'circuit mixte', graphe: { dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'), dip('L2', 'lampe', 'b', 'c'), dip('L3', 'lampe', 'c', 'a')] } },
]);

{
  const produits = new Map(Object.keys(CODES_ERREUR_CIRCUIT).map((c) => [c, []]));
  for (const cas of CAS) {
    const d = diagnostiquer(cas.graphe, cas.attendu);
    verifier(`« ${cas.nom} » : le graphe est lisible`, d.ok === true);
    if (!d.ok) continue;
    const obtenus = [...d.codes].sort();
    verifier(`« ${cas.nom} » → [${cas.codes.join(', ')}] · obtenu [${obtenus.join(', ')}]`,
      memes(obtenus, cas.codes));
    for (const c of d.codes) produits.get(c)?.push(cas.nom);

    // Chaque constat NOMME ce qu'il met en cause : sans cela le message est un
    // « c'est faux » plus long.
    //
    // Pas TOUS ses dipôles, et c'est délibéré : `CIRCUIT_OUVERT` porte la pile
    // en tête de liste et nomme dans sa phrase la CAUSE — « la boucle est
    // interrompue par K » —, ce qui est le seul des deux qui se corrige. Ce qui
    // se vérifie est donc qu'au moins un dipôle mis en cause soit nommé, et
    // qu'aucun constat n'accuse un dipôle absent du graphe.
    verifier(`« ${cas.nom} » : chaque constat est circonstancié et nomme ce qu'il met en cause`,
      d.constats.every((x) => typeof x.precision === 'string' && x.precision.trim().length > 0
        && (x.dipoles.length === 0 || x.dipoles.some((id) => x.precision.includes(id)))
        // Sur les identifiants BRUTS, fils compris : `normaliser` range les fils
        // à part, et un COURT_CIRCUIT nomme justement le fil qui l'a produit.
        && x.dipoles.every((id) => cas.graphe.dipoles.some((d) => d.id === id))));
    // Deux constats ne se paraphrasent pas : deux codes, deux messages distincts.
    verifier(`« ${cas.nom} » : les constats servis sont distincts`,
      new Set(d.constats.map((x) => x.message)).size === d.constats.length);
    // Ordre de service : ce qui empêche le circuit de fonctionner d'abord.
    verifier(`« ${cas.nom} » : les constats sont servis par gravité croissante`,
      d.constats.every((x, i) => i === 0 || d.constats[i - 1].gravite <= x.gravite));
    if (cas.codes.length > 1) {
      verifier(`« ${cas.nom} » : la coïncidence des ${cas.codes.length} codes est déclarée`,
        typeof cas.pourquoiDeux === 'string' && cas.pourquoiDeux.length > 40);
    }
  }

  // Les douze codes sont couverts, et chacun par les cas qu'on a déclarés.
  for (const [code, cas] of produits) {
    verifier(`${code} est déclenché par au moins un cas — ${cas.join(' / ') || 'AUCUN'}`, cas.length >= 1);
  }
  verifier(`les ${Object.keys(CODES_ERREUR_CIRCUIT).length} codes du module sont tous éprouvés ici`,
    Object.keys(CODES_ERREUR_CIRCUIT).length === 12 && [...produits.values()].every((c) => c.length >= 1));

  // « Pour lui seul » : aucun code ne sort d'un témoin muet.
  for (const m of MUETS) {
    const obtenus = codesDe(m.graphe, m.attendu);
    verifier(`« ${m.nom} » ne déclenche RIEN — obtenu [${obtenus.join(', ')}]`, obtenus.length === 0);
  }
}

// ── Le silence d'un code n'est jamais un silence de l'autre ────────────────
//
// La demande exacte : « un voltmètre en série ne doit pas rendre AUSSI circuit
// ouvert sans le dire, ni l'inverse ». Le module rend les deux — c'est vrai des
// deux côtés — et ce qui se vérifie est donc que les deux SE DISENT : deux
// constats, deux messages, deux listes de dipôles.
{
  const insere = { dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'), dip('V', 'voltmetre', 'c', 'a')] };
  const d = diagnostiquer(insere);
  const serie = d.constats.find((c) => c.code === 'VOLTMETRE_EN_SERIE');
  const ouvert = d.constats.find((c) => c.code === 'CIRCUIT_OUVERT');
  verifier('le voltmètre en série dit le geste — et nomme le dipôle derrière lequel il s\'est glissé',
    serie && serie.dipoles[0] === 'V' && /L1/.test(serie.precision));
  verifier('…et le circuit ouvert dit la conséquence — et nomme le voltmètre comme la cause',
    ouvert && /V/.test(ouvert.precision) && ouvert.dipoles.includes('V'));
  verifier('…et le premier servi est celui qui empêche le circuit de fonctionner',
    d.constats[0].code === 'CIRCUIT_OUVERT');

  // L'inverse : un circuit ouvert par un interrupteur ne doit RIEN dire du
  // voltmètre correctement posé qui s'y trouve.
  const ouvertAvecV = {
    dipoles: [
      dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'),
      dip('K', 'interrupteur', 'c', 'a', { etat: 'ouvert' }), dip('V', 'voltmetre', 'c', 'b'),
    ],
  };
  verifier('un circuit ouvert par l\'interrupteur ne reproche rien au voltmètre bien posé',
    memes(codesDe(ouvertAvecV, { mesure: { appareil: 'V', auxBornesDe: 'L1' } }), ['CIRCUIT_OUVERT']));
}

// ── Un appareil mal placé n'est pas jugé DEUX fois ─────────────────────────
//
// Le voltmètre posé sur la mauvaise lampe ET à l'envers reçoit un seul constat :
// lui reprocher son sens en même temps que sa cible brouillerait la seule chose
// à refaire. Le contrôle existe parce que la garde qui l'assure (`dejaMisEnCause`)
// lit `dipoles[0]`, et qu'un constat dont l'ordre des dipôles changerait la
// romprait en silence.
{
  const attenduL1 = { graphe: V_SUR_L1, mesure: { appareil: 'V', auxBornesDe: 'L1' } };
  const surL2Inverse = TROIS_LAMPES('c', 'd'); // « + » du mauvais côté, en plus
  verifier('mauvaise cible ET mauvais sens : un seul constat, celui qui se corrige',
    memes(codesDe(surL2Inverse, attenduL1), ['VOLTMETRE_AUX_MAUVAISES_BORNES']));
  verifier('…et le voltmètre en série n\'est pas jugé en plus sur son sens',
    memes(codesDe({ dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'), dip('V', 'voltmetre', 'a', 'c')] }),
      ['VOLTMETRE_EN_SERIE', 'CIRCUIT_OUVERT']));
}

// ── Une erreur de CONTENU ne ressort jamais en réponse fausse ──────────────
{
  const g = { dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'a')] };
  const horsVoltmetre = diagnostiquer(g, { mesure: { appareil: 'L1', auxBornesDe: 'P' } });
  verifier('« mesurer aux bornes de P avec une lampe » est un énoncé faux, pas une réponse fausse',
    horsVoltmetre.ok === false && horsVoltmetre.raison === 'MESURE_HORS_VOLTMETRE'
      && horsVoltmetre.constats.length === 0);
  const attenduIllisible = diagnostiquer(g, { graphe: { dipoles: [] } });
  verifier('un circuit demandé illisible ne rend pas « aucun constat », il rend ATTENDU_INVALIDE',
    attenduIllisible.ok === false && attenduIllisible.raison === 'ATTENDU_INVALIDE');
  const schemaIllisible = diagnostiquer({ dipoles: [{ id: 'X', type: 'trompette', bornes: ['a', 'b'] }] });
  verifier('un schéma illisible non plus', schemaIllisible.ok === false && schemaIllisible.constats.length === 0);
}

// ════════════════════════════════════════════════════════════════════════════
// ③ LES ITEMS DE CIRCUIT SONT-ILS BRANCHÉS ?
// ════════════════════════════════════════════════════════════════════════════
//
// Le compte seul ne dit rien : « quatorze inertes » reste vrai si un item change
// de raison d'être refusé. On redérive donc, pour chaque item muet, la garde de
// `planDeCircuit` qui l'a arrêté — par un oracle écrit ici, à partir des seules
// données de l'item. Deux dérivations indépendantes doivent tomber d'accord ; si
// elles divergent, c'est que l'une des deux a changé sans qu'on le veuille.

const OBJETS_DE_CIRCUIT = ITEMS.filter((i) => formeDeLObjetFormel(i.reponse?.objetFormel) === 'circuit');
const A_COMPOSER = OBJETS_DE_CIRCUIT.filter((i) => sorteDeReponse(i) === 'objet-formel');
const SERVIS = A_COMPOSER.filter((i) => aComposer(i) !== null);
const INERTES = A_COMPOSER.filter((i) => aComposer(i) === null);

/** La garde de `planDeCircuit` qui refuse cet item — redérivée, dans l'ordre. */
function refusDe(item) {
  if (item.dimensionVariee === 'mode-de-reponse') return 'MODE_DE_REPONSE';
  const appareils = (item.reponse.objetFormel.dipoles ?? [])
    .filter((d) => d.type === 'voltmetre' || d.type === 'amperemetre');
  if (appareils.length !== 1) return 'PAS_UN_SEUL_APPAREIL';
  const [appareil] = appareils;
  const montre = laFigureEstLaReponse(item) ? null : item.figure?.circuit;
  const base = item.situation?.circuit
    ?? (montre?.dipoles ? { dipoles: montre.dipoles.filter((d) => d.id !== appareil.id) } : null);
  if (!base) return 'AUCUN_MONTAGE_SERVI';
  const g = normaliser(base);
  if (!g.ok || g.parId.has(appareil.id) || typeDeCircuit(g).type === null) return 'MONTAGE_INTRAITABLE';
  if (appareil.type === 'voltmetre') {
    const declaree = item.situation?.mesure;
    const cible = declaree?.appareil === appareil.id && declaree.cible !== undefined
      ? declaree.cible
      : (item.reponse.objetFormel.dipoles ?? [])
        .filter((d) => d !== appareil && d.type !== 'fil')
        .find((d) => enDerivationAuxBornesDe(item.reponse.objetFormel, appareil.id, d.id) === true)?.id ?? null;
    if (typeof cible !== 'string' || !g.parId.has(cible)) return 'VOLTMETRE_SANS_CIBLE';
  } else if (typeDeCircuit(g).type !== 'SERIE') return 'AMPEREMETRE_HORS_SERIE';
  return null;
}

{
  verifier(`${OBJETS_DE_CIRCUIT.length} items du corpus ont un circuit pour réponse formelle`,
    OBJETS_DE_CIRCUIT.length === 35);
  // Dix d'entre eux se répondent autrement — un QCM « série ou dérivation ? »,
  // une valeur à taper. Leur graphe est la DONNÉE, pas ce qu'on compose.
  verifier(`${A_COMPOSER.length} de ces items demandent qu'on COMPOSE le graphe`,
    A_COMPOSER.length === 25);
  verifier(`${SERVIS.length} sont servis par l'éditeur, ${INERTES.length} restent muets`,
    SERVIS.length === 11 && INERTES.length === 14);
  verifier('les 24 items de circuit du chapitre 2 plus l\'exemple du chapitre 7',
    A_COMPOSER.filter((i) => i.id.startsWith('ch02-')).length === 24);

  // Chaque item servi l'est pour de bon : le plan est jouable de bout en bout.
  const boiteux = SERVIS.filter((i) => {
    const p = aComposer(i);
    const sols = solutionsDeCircuit(p);
    return sols.length === 0 || sols.length >= p.emplacements.length * 2;
  });
  verifier(`chaque item servi est gagnable, et jamais sans un geste — ${boiteux.map((i) => i.id).join(', ')}`,
    boiteux.length === 0);
  verifier('…et aucun ne se joue sans que le geste FAUTIF soit à portée de doigt',
    SERVIS.every((i) => aComposer(i).emplacements.some((e) => e.sorte === 'fil')
      && aComposer(i).emplacements.filter((e) => e.sorte === 'travers').length >= 2));

  // L'oracle et le module tombent-ils d'accord ?
  const desaccords = [
    ...SERVIS.filter((i) => refusDe(i) !== null).map((i) => `${i.id} servi mais refusé par l'oracle (${refusDe(i)})`),
    ...INERTES.filter((i) => refusDe(i) === null).map((i) => `${i.id} muet sans raison lisible`),
  ];
  verifier(`l'oracle des refus et planDeCircuit disent la même chose — ${desaccords.slice(0, 3).join(' | ')}`,
    desaccords.length === 0);

  // Et la RÉPARTITION, nommément : c'est elle qui distingue « un item de moins »
  // de « un item qui a changé de raison ».
  const parRaison = new Map();
  for (const i of INERTES) {
    const r = refusDe(i);
    if (!parRaison.has(r)) parRaison.set(r, []);
    parRaison.get(r).push(i.id);
  }
  const ATTENDU = {
    // Leur palier fait varier le MODE DE RÉPONSE — « on ne complète plus un
    // schéma donné, on construit le schéma entier ». Ils portent pourtant
    // `situation.circuit` : les servir afficherait le modèle sous « sans modèle ».
    MODE_DE_REPONSE: 2,
    // Aucun appareil de mesure dans l'attendu : il n'y a pas de geste unique à
    // évaluer. Les sept « trace le schéma » de ch02-sf1 et les trois montages à
    // refaire — Sam, Maya, Noah. C'est le widget qui manque, pas la correction.
    PAS_UN_SEUL_APPAREIL: 10,
    // `ch02-sf1-p04` : « trace le schéma COMPLET ». Il a bien un voltmètre, mais
    // rien ne lui est SERVI comme montage de départ — et lui en fabriquer un
    // reviendrait à tracer trois de ses quatre dipôles à sa place.
    AUCUN_MONTAGE_SERVI: 1,
    // Le montage de Léa, privé de son voltmètre, est un circuit OUVERT : elle
    // avait coupé le fil. Son énoncé demande deux gestes, l'éditeur n'en offre
    // qu'un.
    MONTAGE_INTRAITABLE: 1,
  };
  for (const [raison, compte] of Object.entries(ATTENDU)) {
    const vus = parRaison.get(raison) ?? [];
    verifier(`${compte} item(s) refusés pour ${raison} — vus ${vus.length} : ${vus.join(', ')}`,
      vus.length === compte);
  }
  verifier(`aucune autre raison de refus n'apparaît — ${[...parRaison.keys()].join(', ')}`,
    [...parRaison.keys()].every((r) => r in ATTENDU));
  // Les deux gardes que le corpus ne mord PAS aujourd'hui, et qui doivent le
  // rester : un voltmètre sans cible et un ampèremètre hors série seraient tous
  // deux corrigés par `memeCircuit` seul si on les servait.
  verifier('aucun item n\'est refusé faute de cible ni pour un ampèremètre hors série — les deux gardes du comparateur',
    !parRaison.has('VOLTMETRE_SANS_CIBLE') && !parRaison.has('AMPEREMETRE_HORS_SERIE'));

  // Un item muet ne compte JAMAIS faux : il redemande, il n'enregistre rien.
  const verdicts = INERTES.map((i) => corriger(i, { compose: {} }));
  verifier('les items muets rendent NON_BRANCHE, redemandent, et ne consomment aucun essai',
    verdicts.every((v) => v.redemande === true && v.issue === null && v.juste !== true));
  verifier('…et leur phrase parle de TRACER un schéma, pas de nommer des espèces chimiques',
    verdicts.every((v) => /schéma entier/.test(v.message ?? '') && !/espèce/.test(v.message ?? '')));
}

// ════════════════════════════════════════════════════════════════════════════
// ④ LE SCHÉMA NE MONTRE-T-IL PAS LA RÉPONSE ?
// ════════════════════════════════════════════════════════════════════════════
//
// L'invariant 6 impose que la figure d'un item de classe B et sa réponse soient
// LE MÊME objet, par identité de référence. La conséquence est mécanique : dès
// qu'un item de circuit porte une figure, cette figure DESSINE le corrigé. C'est
// le défaut trouvé sur les grilles de particules, et il s'est reproduit ici deux
// fois — une fois sur les items inertes (réparé avec l'éditeur), une fois sur les
// deux items qui demandent le schéma ET la valeur (réparé par cette relecture).
//
// Le contrôle porte donc item par item, sur TOUS ceux qui portent une figure de
// circuit, et la liste de ceux qui la MONTRENT est écrite en clair : c'est la
// seule forme sous laquelle une nouvelle fuite se verra.

const AVEC_FIGURE_CIRCUIT = ITEMS.filter((i) => i.figure?.circuit !== undefined);

{
  const montrent = AVEC_FIGURE_CIRCUIT.filter((i) => !laFigureEstLaReponse(i));
  const corrige = montrent.filter((i) => i.figure.circuit === i.reponse?.objetFormel);

  // Ceux qui montrent une figure QUI EST leur objet formel : la liste doit être
  // exactement celle des items dont la réponse n'est pas ce graphe.
  const parRaison = {
    // « Ce montage est-il en série ou en dérivation ? » — la réponse est un MOT.
    // Le graphe est la donnée : le taire rendrait la question sans objet.
    'la-reponse-est-un-mot': corrige.filter((i) => sorteDeReponse(i) === 'choix'),
    // « Voici le schéma de Sam : redessine-le autrement. » Sa figure EST sa
    // réponse, et l'énoncé la désigne. Exception déclarée dans `FIGURE_DONNEE`.
    'redessine-le-meme-circuit': corrige.filter((i) => i.reponse?.objetFormel?.question === 'redessine-le-meme-circuit'),
  };
  const classes = new Set(Object.values(parRaison).flat().map((i) => i.id));
  verifier(`${corrige.length} items montrent une figure qui EST leur objet formel — ${corrige.map((i) => i.id).join(', ')}`,
    corrige.length === 7);
  verifier('…et chacun a sa raison déclarée : la réponse est un mot, ou l\'énoncé désigne la figure',
    corrige.every((i) => classes.has(i.id)) && parRaison['la-reponse-est-un-mot'].length === 5
      && parRaison['redessine-le-meme-circuit'].length === 2);

  // Les autres figures montrées ne sont pas leur objet formel, et elles se
  // partagent en deux familles — aucune troisième n'est admise, parce qu'une
  // troisième serait précisément la fuite qu'on cherche.
  const autres = montrent.filter((i) => i.figure.circuit !== i.reponse?.objetFormel);
  //   · le circuit est la DONNÉE : « lis ce schéma et prévois la tension ». Ces
  //     items n'ont aucun objet formel — il n'y a rien à composer, donc rien à
  //     trahir ;
  const donnees = autres.filter((i) => i.reponse?.objetFormel === undefined);
  //   · le montage est FAUTIF : Léa a coupé le fil, Noah a monté en série,
  //     Yanis vise la mauvaise lampe. Le montrer EST le sujet de l'item, et
  //     l'objet formel — la correction — reste caché.
  const fautifs = autres.filter((i) => i.reponse?.objetFormel?.question === 'corrige-le-montage');
  verifier(`les ${autres.length} autres figures montrées se partagent en donnée (${donnees.length}) et montage à corriger (${fautifs.length})`,
    donnees.length + fautifs.length === autres.length && fautifs.length === 3);
  verifier('…et aucun item ne montre une figure de circuit sans que sa réponse soit ailleurs',
    donnees.every((i) => sorteDeReponse(i) !== 'objet-formel'));

  // La régression réparée par cette relecture, nommée pour qu'elle ne revienne
  // pas : deux items dont la figure est titrée « Montage attendu » et qui ont
  // une valeur à taper. `sorteDeReponse` les rangeait avec les lectures
  // graphiques, dont la figure est la DONNÉE ; ici la donnée est la PROSE, et la
  // figure est le corrigé de la première moitié de l'énoncé.
  const aDeuxMoities = ITEMS.filter((i) => i.situation?.demande === 'schema'
    && i.reponse?.valeur !== undefined && i.reponse?.objetFormel !== undefined);
  verifier(`les ${aDeuxMoities.length} items « place le voltmètre ET prévois » taisent leur montage attendu`,
    aDeuxMoities.length === 2
      && aDeuxMoities.every((i) => i.figure?.circuit === i.reponse.objetFormel
        && laFigureEstLaReponse(i) === true));
  verifier('…et leur énoncé décrit le circuit en toutes lettres : la question reste répondable sans la figure',
    aDeuxMoities.every((i) => /pile/.test(i.enonce ?? '') && /lampe|moteur/.test(i.enonce ?? '')));
}

// ── Ce que l'élève voit PENDANT qu'il compose ──────────────────────────────
//
// Le widget dessine `plan.base` tant que rien n'est orienté, puis le graphe que
// `circuitCompose` fabrique. Aucun des deux ne doit porter l'appareil déjà posé,
// et l'aperçu de départ ne doit pas être le montage attendu.
{
  const fuites = [];
  for (const item of SERVIS) {
    const plan = aComposer(item);
    const g = normaliser(plan.base);
    if (g.parId.has(plan.appareil.id)) fuites.push(`${item.id} : l'appareil est déjà sur le montage servi`);
    if (memeCircuit(plan.base, plan.attendu) === true) fuites.push(`${item.id} : le montage servi EST le montage attendu`);
    // Le dessin de départ ne doit pas non plus porter le nom de l'appareil :
    // `schema.js` engendre son étiquette depuis le graphe, donc si l'appareil
    // n'y est pas, il n'y est pas — mais c'est ce que le contrôle vérifie.
    const f = rendreFigure({ sorte: 'circuit', circuit: plan.base });
    if (!f.ok) fuites.push(`${item.id} : le montage de départ ne se dessine pas (${f.raison})`);
    else if (new RegExp(`>${plan.appareil.id}<`).test(f.html)) fuites.push(`${item.id} : l'appareil est étiqueté sur le dessin de départ`);
  }
  verifier(`aucun montage de départ ne porte déjà l'appareil à poser — ${fuites.slice(0, 3).join(' | ')}`,
    fuites.length === 0);

  // Et la correction, elle, reparaît APRÈS coup : `corriger` la rédige.
  verifier('chaque item servi rédige un geste en français, avec son côté',
    SERVIS.every((item) => {
      const e = aComposer(item).emplacements[0];
      const r = corriger(item, { compose: { emplacement: e.cle, sens: 1 } });
      return typeof r.correction === 'string' && /borne « \+ » du côté de/.test(r.correction);
    }));
}

// ════════════════════════════════════════════════════════════════════════════
// ⑤ RIEN D'ILLISIBLE, RIEN DE VALIDABLE SANS UN GESTE
// ════════════════════════════════════════════════════════════════════════════
//
// Les identifiants nus de ce module se reconnaissent à leur absence d'accent :
// `voltmetre` est une clé, « voltmètre » est un mot. Le contrôle balaie toute
// chaîne que l'élève peut lire — libellés de boutons, orientation, consigne
// d'incomplétude, constats, correction — et y cherche ces clés, les `undefined`,
// et les clés d'emplacement (`travers:L1`), qui ne doivent jamais quitter les
// attributs de données.
//
// ⚠ `pile`, `lampe`, `moteur`, `fil` et `interrupteur` NE PEUVENT PAS être
// contrôlés ainsi : la clé et le mot français sont le même mot. Pour ceux-là,
// c'est le contrôle des noms français plus bas — `avecUn` et `libelleFormel` sur
// tout type servi — qui répond, et le lexique refuse déjà au build un type sans
// libellé. Une première rédaction de cette expression les cherchait quand même,
// et déclarait « P — une pile » illisible.

const CLE_NUE = /voltmetre|amperemetre|\bresistance\b|travers:|fil:|undefined|\[object|\bnull\b/;

/** Les libellés que `js/app.js` assemble, recopiés à l'identique depuis
 *  `zoneCircuit`. La duplication est signalée en réserve : l'écran n'est pas
 *  importable ici, et deux formules qui divergeraient ne se verraient pas. */
function libellesDuWidget(plan) {
  const boutons = plan.emplacements.map((e) => (e.sorte === 'travers'
    ? `${e.nom} — ${avecUn(e.type) ?? e.type}`
    : `Entre ${e.entre[0]} et ${e.entre[1]}`));
  const orientations = plan.emplacements.flatMap((e) => [
    `Du côté de ${e.cotes[0].join(', ')}`,
    `Du côté de ${e.cotes[1].join(', ')}`,
  ]);
  const consignes = [
    `Pose ${avecUn(plan.appareil.type) ?? plan.appareil.type} en travers d'un dipôle`,
    '…ou coupe un fil et mets-le dedans',
    'De quel côté se trouve sa borne « + » ?',
  ];
  return [...boutons, ...orientations, ...consignes];
}

{
  const nus = [];
  const vides = [];
  const longs = [];
  for (const item of SERVIS) {
    const plan = aComposer(item);
    const textes = [...libellesDuWidget(plan)];
    // Tout ce que la correction peut écrire, sur TOUTES les compositions.
    for (const e of plan.emplacements) {
      for (const sens of [1, -1]) {
        const r = corriger(item, { compose: { emplacement: e.cle, sens } });
        textes.push(r.correction ?? '', r.message ?? '', ...(r.constats ?? []).map((c) => c.texte));
      }
    }
    textes.push(corriger(item, { compose: {} }).message ?? '');
    textes.push(corriger(item, { compose: { emplacement: plan.emplacements[0].cle } }).message ?? '');

    for (const t of textes) {
      if (typeof t !== 'string') { nus.push(`${item.id} : chaîne absente`); continue; }
      // Les libellés du widget doivent être NON VIDES ; les champs facultatifs
      // d'un verdict (correction, message) peuvent l'être selon le cas.
      if (CLE_NUE.test(t)) nus.push(`${item.id} : « ${t.slice(0, 70)} »`);
    }
    for (const t of libellesDuWidget(plan)) {
      if (!t.trim() || /—\s*$|de\s*$|et\s*$/.test(t.trim())) vides.push(`${item.id} : « ${t} »`);
      // Garde-fou de largeur, et c'est un PROXY : la mesure vraie est au
      // navigateur, à 375 px. Un libellé qui double de longueur est le signe
      // qu'une liste de voisins s'est mise à énumérer tout le circuit.
      if (t.length > 48) longs.push(`${item.id} : ${t.length} car. « ${t} »`);
    }
  }
  verifier(`aucun identifiant nu sous les yeux de l'élève — ${nus.slice(0, 3).join(' | ')}`, nus.length === 0);
  verifier(`aucun libellé vide ou tronqué — ${vides.slice(0, 3).join(' | ')}`, vides.length === 0);
  verifier(`aucun libellé de bouton au-delà de 48 caractères — ${longs.slice(0, 3).join(' | ')}`, longs.length === 0);

  // Les types employés par le corpus ont tous un nom français, dans les deux
  // formes que l'écran demande — l'article indéfini pour la phrase, le libellé
  // seul pour une tête de bouton.
  const types = new Set(SERVIS.flatMap((i) => aComposer(i).emplacements
    .filter((e) => e.sorte === 'travers').map((e) => e.type)));
  verifier(`les ${types.size} types de dipôle servis ont leur nom français — ${[...types].join(', ')}`,
    [...types].every((t) => avecUn(t) && libelleFormel(t)));
}

// ── Un élève qui n'a rien composé ne peut pas valider ──────────────────────
//
// Les trois états incomplets, sur les onze items, pas seulement sur le premier :
// rien de choisi, un emplacement sans orientation, une orientation sans
// emplacement. Aucun ne doit rendre un verdict, aucun ne doit consommer d'essai.
{
  const fautes = [];
  for (const item of SERVIS) {
    const plan = aComposer(item);
    const cas = [
      ['rien', {}],
      ['emplacement seul', { emplacement: plan.emplacements[0].cle }],
      ['orientation seule', { sens: 1 }],
      ['orientation seule, à rebours', { sens: -1 }],
      ['emplacement + sens illisible', { emplacement: plan.emplacements[0].cle, sens: 0 }],
      ['emplacement inexistant', { emplacement: 'travers:CE-DIPOLE-N-EXISTE-PAS', sens: 1 }],
    ];
    for (const [quoi, compose] of cas) {
      const r = corriger(item, { compose });
      if (r.juste === true || r.issue !== null || r.redemande !== true) {
        fautes.push(`${item.id} / ${quoi} → ${r.code} juste=${r.juste} issue=${r.issue}`);
      }
    }
    // …et la phrase dit CE QUI MANQUE, pas « c'est faux ».
    const rien = corriger(item, { compose: {} });
    const sansSens = corriger(item, { compose: { emplacement: plan.emplacements[0].cle } });
    if (rien.code !== VERDICTS.REPONSE_INCOMPLETE || !/où poser/.test(rien.message ?? '')) {
      fautes.push(`${item.id} : « rien composé » ne dit pas quoi faire`);
    }
    if (sansSens.code !== VERDICTS.REPONSE_INCOMPLETE || !/borne/.test(sansSens.message ?? '')) {
      fautes.push(`${item.id} : « non orienté » ne dit pas quoi faire`);
    }
    // Et aucun montage n'est fabriqué tant que la réponse est incomplète :
    // dessiner une borne « + » non choisie répondrait à la place de l'élève.
    if (circuitCompose(plan, { emplacement: plan.emplacements[0].cle }) !== null
      || circuitCompose(plan, { sens: 1 }) !== null
      || circuitCompose(plan, {}) !== null) {
      fautes.push(`${item.id} : un montage est fabriqué sur une composition incomplète`);
    }
  }
  verifier(`aucune composition incomplète ne se valide ni ne consomme d'essai — ${fautes.slice(0, 3).join(' | ')}`,
    fautes.length === 0);
}

// ── Toute composition offerte se DESSINE ──────────────────────────────────
//
// Un refus de tracé afficherait « figure non traçable » là où l'élève attend son
// montage — et il l'afficherait APRÈS son geste, donc sans qu'il puisse rien y
// faire.
{
  const nonTraces = [];
  for (const item of SERVIS) {
    const plan = aComposer(item);
    for (const e of plan.emplacements) {
      for (const sens of [1, -1]) {
        const f = rendreFigure({ sorte: 'circuit', circuit: circuitCompose(plan, { emplacement: e.cle, sens }) });
        if (!f.ok) nonTraces.push(`${item.id} ${e.cle}@${sens} → ${f.raison}`);
        // Les nœuds fabriqués par l'insertion en série s'appellent « c·1 » : ce
        // sont des noms de graphe, et ils ne doivent jamais atteindre le dessin.
        else if (/·\d/.test(f.html)) nonTraces.push(`${item.id} ${e.cle}@${sens} : un nom de nœud est dessiné`);
      }
    }
  }
  verifier(`les ${SERVIS.reduce((s, i) => s + aComposer(i).emplacements.length * 2, 0)} compositions offertes se dessinent toutes — ${nonTraces.slice(0, 3).join(' | ')}`,
    nonTraces.length === 0);
}

// ── Réserves ────────────────────────────────────────────────────────────────

reserve('les 375 px et les 44 px NE SONT PAS mesurés ici : `js/app.js` touche le DOM à'
  + '\n      l\'import et ses gabarits ne sont pas atteignables hors navigateur. La section ⑤'
  + '\n      contrôle les CHAÎNES, et borne la longueur des libellés à 48 caractères — un'
  + '\n      proxy, pas une mesure. Les cibles tactiles se vérifient à l\'écran.');
reserve('`libellesDuWidget` RECOPIE les formules d\'assemblage de `zoneCircuit`. Deux'
  + '\n      rédactions qui divergeraient ne se verraient pas ici : ce fichier prouve que les'
  + '\n      MORCEAUX sont lisibles, pas que l\'écran les assemble comme il le dit.');
reserve('la coïncidence de deux codes est déclarée cas par cas (`pourquoiDeux`) et non'
  + '\n      dérivée : rien ici ne prouve qu\'un troisième code ne pourrait pas sortir avec eux'
  + '\n      sur un graphe qu\'aucun des treize cas ne dessine. Le jeu des cas est fini et'
  + '\n      écrit à la main, comme celui de `CAS_TEMOINS`.');
reserve('VOLTMETRE_EN_SERIE et AMPEREMETRE_EN_DERIVATION ne peuvent pas être isolés, et'
  + '\n      c\'est physique : un voltmètre inséré coupe quelque chose, un ampèremètre posé en'
  + '\n      travers court-circuite quelque chose. Le contrôle porte donc sur le fait que la'
  + '\n      conséquence soit DITE, avec son propre message et ses propres dipôles — pas sur'
  + '\n      un code unique, qui serait une perte.');
reserve('les 14 items muets consomment une place dans une séance sans pouvoir être'
  + '\n      répondus : `corriger` rend NON_BRANCHE, `srs.js` n\'enregistre rien, et rien dans'
  + '\n      `seance.js` ne sait qu\'un item est inerte. Un lot de dix pourrait en contenir'
  + '\n      plusieurs. Ce n\'est pas un défaut de l\'éditeur, c\'est une entente qui manque'
  + '\n      entre la couche de verdict et le compositeur de séance.');
reserve('`ch02-sf3-e01` et `t08` demandent DEUX choses — placer l\'appareil et prévoir son'
  + '\n      indication — et `sorteDeReponse` n\'en sert qu\'une, la valeur. Leur figure ne les'
  + '\n      trahit plus (④), mais la moitié « geste » de leur énoncé reste sans zone où'
  + '\n      répondre. Servir deux zones à un même item est une décision de la couche de'
  + '\n      verdict, hors de portée de cette relecture.');
reserve('l\'ampèremètre n\'a QU\'UN item servi, et il vient de `exemples.js` — pas du corpus'
  + '\n      d\'un chapitre écrit. Le chemin « ampèremètre » de `planDeCircuit` (refus hors'
  + '\n      circuit série, `{ graphe }` sans `mesure`) n\'est donc éprouvé que par lui et par'
  + '\n      les cas fabriqués ici. Le chapitre 7 le mettra à l\'épreuve pour de bon.');

// ── Rapport ─────────────────────────────────────────────────────────────────

console.log(`${OBJETS_DE_CIRCUIT.length} items à réponse formelle de circuit, `
  + `${SERVIS.length} servis par l'éditeur, ${INERTES.length} muets.`);
console.log(`${passes} test(s) passé(s).`);
for (const e of echecs) console.log(`  ✗ ${e}`);
if (reserves.length) {
  console.log(`\n${reserves.length} réserve(s) :`);
  for (const r of reserves) console.log(`  ⚠ ${r}`);
}
if (echecs.length) {
  console.log(`\n${echecs.length} échec(s).`);
  process.exit(1);
}
