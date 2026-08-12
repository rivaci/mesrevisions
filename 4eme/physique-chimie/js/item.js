// Le schéma d'item — la pièce contre laquelle le premier chapitre sera écrit.
//
//     import { CHAMPS, validerItem, evaluerCalcul } from './item.js';
//
// ── Ce qui manquait, et ce que son absence produisait ───────────────────────
//
// Trois modules lisaient l'item et aucun ne le définissait. `seance.js` en
// documentait neuf champs — ceux sans lesquels une séance se compose de travers
// —, `srs.js` en réclamait cinq de plus dans ses événements, et personne ne
// disait ce qu'un item en porte. Le résultat n'était pas une erreur : c'était un
// moteur qui tourne à vide.
//
//   · `estFormatDiagnostique` n'étant écrit nulle part, la quatrième condition
//     de `estMaitrise` n'était JAMAIS satisfaite — aucun savoir-faire ne pouvait
//     être acquis, et le verdict rendu (« aucune réussite dans le format
//     diagnostique ») était parfaitement normal ;
//   · `schema.js` sait tracer un graphe de circuit, une description
//     particulaire et un jeu de mesures, mais aucun champ d'item ne les portait :
//     l'invariant 6 — « toute figure est engendrée par le même objet formel que
//     la correction » — n'avait aucun chemin d'exécution ;
//   · `apresReponsePiege` LÈVE sur un `dispositifServi` étranger au piège, et
//     rien ne l'écrivait ;
//   · `classe` pilote le plafond d'un tiers par savoir-faire, et rien ne la
//     déclarait ;
//   · `unites.js:controlerItemAuteur` lit `item.reponse.unite`, et l'item
//     n'avait ni réponse, ni énoncé, ni correction.
//
// ── Le principe qui a décidé de chaque champ ───────────────────────────────
//
// **Ce qui peut être dérivé n'est pas déclaré.** La charte le dit d'un cas
// précis et le motif vaut partout : la v1 faisait de la condition de validité un
// drapeau saisi par l'auteur, comparé à un autre champ saisi par le même auteur
// — « une case à cocher qui se vérifie elle-même, sur le point que la charte
// présente comme le plus utile du dossier ». Ici :
//
//   · `doubleQcm` n'existe pas : il se lit sur `type === 'double-qcm'` ;
//   · la condition de validité n'est pas un booléen : elle est le prédicat du
//     piège, ÉVALUÉ sur l'objet `situation` de l'item ;
//   · la trivialité d'un item de discrimination mathématique n'est pas un
//     adjectif : elle est dérivée de la chaîne de calcul ;
//   · la tolérance d'une lecture graphique n'est pas saisie : `schema.js` la
//     calcule, une demi-graduation.
//
// Deux drapeaux résistent et sont déclarés — `estFormatDiagnostique` et
// `rituelDeControle`. Le premier ne se dérive pas : le `formatDiagnostique` du
// piège est de la prose (« dessin annoté sur objet non lumineux »), qu'aucun
// programme ne compare à un item. Il porte donc le même garde-fou que
// `unite: 'imposee'` — **un motif écrit, obligatoire** —, qui est le dispositif
// que la charte emploie elle-même quand la dérivation est impossible.
//
// ── Ce que ce module ne fait pas ───────────────────────────────────────────
//
// Il ne corrige pas une réponse d'élève : `unites.js` le fait. Il ne compose pas
// de séance : `seance.js` le fait. Il ne dessine rien : `schema.js` le fait. Il
// décrit un item et il dit ce qu'un item ne peut pas être — c'est tout, et c'est
// ce qui manquait.

import { COUTS, SORTES_PAR_TYPE, TYPES_D_ITEM, CERCLES } from './seance.js';
import { SORTES_DE_FIGURE, rendreFigure, toleranceDeLecture } from './schema.js';
import {
  SEMANTIQUES,
  additionner,
  analyserUnite,
  comparerRationnels,
  controlerItemAuteur,
  memeDimension,
  multiplier,
  puissance,
  rationnel,
  rationnelVersTexte,
  rationnelsEgaux,
  soustraire,
} from './unites.js';
import { PIEGES } from './data/pieges/index.js';
import { dispositifsDeReconfrontation } from './srs.js';
import { CHAPITRE_PAR_ID, SAVOIR_FAIRE_PAR_ID, transpositionDisponible } from './data/savoir-faire.js';
import { CONSTANTES, interrogerTable } from './data/tables.js';

// ════════════════════════════════════════════════════════════════════════════
// Les énumérés fermés — sans eux, aucun refus n'est écrivable
// ════════════════════════════════════════════════════════════════════════════

/** Les quatre classes de garantie. A′ s'écrit `A_TABLE` : un identifiant ne
 *  porte pas d'apostrophe, et `A'` dans une clé finit par se perdre au premier
 *  export JSON. A et A_TABLE comptent ENSEMBLE dans le plafond. */
export const CLASSES = Object.freeze(['A', 'A_TABLE', 'B', 'C']);

export const PALIERS = Object.freeze([1, 2, 3, 4]);

/** Le triplet de Johnstone. C'est le champ qui sépare « il ne connaît pas le
 *  fait » de « il ne sait pas de quel niveau on parle ». */
export const REGISTRES = Object.freeze(['macro', 'submicro', 'symbolique']);

/**
 * L'énuméré des dimensions variées est PLUS FIN que le palier, et c'est tout son
 * objet. La v1 exigeait que les paliers 2 et 3 déclarent « quelle dimension
 * varie », puis définissait le palier 2 *comme* le changement de contexte et le
 * palier 3 *comme* le changement de mode de réponse : la dimension était
 * déterminée par le palier, le champ était redondant, et le refus « deux paliers
 * déclarant la même dimension » ne pouvait jamais se déclencher.
 */
export const DIMENSIONS_VARIEES = Object.freeze([
  'objet-support', 'grandeur-en-jeu', 'sens-du-changement', 'registre', 'mode-de-reponse',
]);

/** La provenance d'une justification de double QCM. Graduée, parce que le corpus
 *  d'énoncés d'élèves n'existe pas encore et que l'exiger sous peine de refus
 *  bloquait toute publication. */
export const PROVENANCES = Object.freeze(['nationale', 'institutionnelle', 'reformulee', 'locale']);

/** Les deux rôles d'un item de discrimination mathématique : ils viennent par
 *  paire, et c'est la paire qui sépare l'échec de physique de l'échec de maths. */
export const ROLES_DISCRIMINATION = Object.freeze(['geste-isole', 'choix-de-relation']);

/** Les états de la frontière d'un système, pour les items du fil « énergie » et
 *  ceux de conservation : `charte.md` exige qu'elle soit déclarée, jamais
 *  implicite, et jamais à découper par l'élève. */
export const FRONTIERES_DE_SYSTEME = Object.freeze(['ouvert', 'ferme']);

export { CLASSES as CLASSES_DE_GARANTIE, TYPES_D_ITEM, CERCLES, SEMANTIQUES, SORTES_DE_FIGURE };

// ════════════════════════════════════════════════════════════════════════════
// Les champs — la liste fermée, et ce que chacun décide
// ════════════════════════════════════════════════════════════════════════════

/**
 * Le schéma, sous forme de données plutôt que de prose.
 *
 * Il est ici, et pas dans un `.json` d'annexe, pour une raison de mode de panne :
 * un champ absent de cette liste est REFUSÉ sur l'item. C'est ce qui attrape la
 * faute la plus coûteuse et la plus discrète du projet — le champ mal nommé.
 * `formatDiagnostique` écrit à la place de `estFormatDiagnostique` ne produit
 * aucune erreur : il produit un item dont le drapeau vaut `undefined`, donc un
 * savoir-faire qui n'est jamais acquis, et un contrôle qui ne dit rien parce
 * qu'un savoir-faire non acquis est un état normal. C'est le désaccord
 * d'interface que ce projet vient de passer une réconciliation entière à
 * éliminer entre trois modules ; il n'est pas question de le rouvrir côté
 * contenu.
 *
 *   obligation : 'toujours' | 'facultatif' | 'selon-la-classe' | 'selon-le-type'
 *              | 'selon-le-piege' | 'selon-le-palier' | 'selon-le-drapeau'
 *              | 'selon-la-semantique'
 *
 * Seul 'toujours' est contrôlé ici comme une présence : les autres obligations
 * sont conditionnelles et chacune a son bloc de refus plus bas, avec son code.
 */
export const CHAMPS = Object.freeze([
  // ── Identité et place dans la progression ────────────────────────────────
  { nom: 'id', obligation: 'toujours', role: "clé d'unicité du tirage — deux items sans id en partagent une, et servir l'un rend l'autre indisponible" },
  { nom: 'sfPrincipal', obligation: 'toujours', role: 'le dénominateur de TOUTE proportion de la charte ; un seul, jamais deux' },
  { nom: 'sfSollicites', obligation: 'facultatif', role: 'les autres savoir-faire mobilisés — jamais comptés, jamais dénominateur' },
  { nom: 'chapitre', obligation: 'toujours', role: 'cœur, rituel, re-confrontation hors chapitre : les trois créneaux le lisent' },
  { nom: 'programme', obligation: 'toujours', valeurs: ['2020'], role: "la version du programme ; le projet 2025 déplacerait des blocs entiers" },

  // ── Les cinq énumérés fermés ─────────────────────────────────────────────
  { nom: 'classe', obligation: 'toujours', valeurs: CLASSES, role: 'la classe de garantie — plafond, relecture, recalcul' },
  { nom: 'cercle', obligation: 'toujours', valeurs: CERCLES, role: 'les bandes de proportion, et la condition « au moins une réussite hors cercle 3 »' },
  { nom: 'palier', obligation: 'toujours', valeurs: PALIERS, role: 'la difficulté par VARIATION ; le palier 4 est le palier non étiqueté' },
  { nom: 'registre', obligation: 'toujours', valeurs: REGISTRES, role: 'macro / submicro / symbolique — le triplet de Johnstone' },
  { nom: 'type', obligation: 'toujours', valeurs: TYPES_D_ITEM, role: 'porte le COÛT en minutes, et décide si une figure est attendue' },

  // ── Ce que l'élève voit ──────────────────────────────────────────────────
  { nom: 'enonce', obligation: 'toujours', role: 'aucune référence de fichier image, aucun nombre nu suivi de % ou de « points »' },
  { nom: 'donnees', obligation: 'facultatif', role: 'les grandeurs de l\'énoncé, `{ id: { valeur, unite } }` — référencées par @id dans le calcul' },
  { nom: 'figure', obligation: 'selon-le-type', role: "l'OBJET FORMEL de la figure ; l'énoncé en est engendré, jamais l'inverse" },

  // ── La correction, selon la classe ───────────────────────────────────────
  { nom: 'reponse', obligation: 'toujours', role: 'valeur + unité, ou objet formel, ou réponse libre relue' },
  { nom: 'calcul', obligation: 'selon-la-classe', role: 'classe A : la chaîne rejouée en rationnels exacts, avec dimensions' },
  { nom: 'requete', obligation: 'selon-la-classe', role: "classe A′ : `{ table, cle, colonne }`, rejouée sur la table centrale sourcée" },
  { nom: 'relu', obligation: 'selon-la-classe', role: "classe C : `{ par, date, hash }`, le hachage portant sur l'item MOINS ce bloc" },

  // ── Le piège, le diagnostic, la variation ────────────────────────────────
  { nom: 'piege', obligation: 'facultatif', role: 'le piège de conception que cet item vise' },
  { nom: 'situation', obligation: 'selon-le-piege', role: "l'objet formel dont la condition de validité est DÉRIVÉE — jamais un drapeau" },
  { nom: 'dispositifServi', obligation: 'facultatif', role: 'le constat ou le contre-modèle joué — `apresReponsePiege` LÈVE si étranger au piège' },
  { nom: 'estFormatDiagnostique', obligation: 'facultatif', role: 'le format dans lequel la conception se voit — exige un motif écrit' },
  { nom: 'motifFormatDiagnostique', obligation: 'selon-le-drapeau', role: 'pourquoi cet item RESPECTE le format déclaré par le piège' },
  { nom: 'contexteDeSurface', obligation: 'toujours', role: "le décor ; `seance.js` s'en sert pour ne jamais resservir le même" },
  { nom: 'dimensionVariee', obligation: 'selon-le-palier', valeurs: DIMENSIONS_VARIEES, role: 'ce qui change aux paliers 2 et 3 — deux dimensions DISTINCTES pour un même piège' },

  // ── Le double QCM et les distracteurs ────────────────────────────────────
  { nom: 'distracteurs', obligation: 'facultatif', role: 'chacun rattaché à un piège, et produit par un modèle erroné EXÉCUTABLE si quantitatif' },
  { nom: 'modelesErrones', obligation: 'selon-la-semantique', role: "les modèles exécutables d'un item à tolérance sans distracteur" },
  { nom: 'motifSansModeleErrone', obligation: 'selon-la-semantique', role: "l'aveu écrit qu'il n'existe pas de modèle erroné — la seule alternative admise" },
  { nom: 'justifications', obligation: 'selon-le-type', role: 'double QCM : chacune typée par sa provenance, `reformulee` citant sa source' },

  // ── Le rôle dans la séance ───────────────────────────────────────────────
  { nom: 'rituelDeControle', obligation: 'facultatif', role: 'le geste de contrôle ; EXCLU de la fenêtre des cinq séances' },
  { nom: 'discriminationMaths', obligation: 'facultatif', valeurs: ROLES_DISCRIMINATION, role: "sépare l'échec de physique de l'échec de mathématiques" },
].map(Object.freeze));

const NOMS_DE_CHAMPS = new Set(CHAMPS.map((c) => c.nom));

// ════════════════════════════════════════════════════════════════════════════
// Le langage de calcul — défini, donc rejouable
// ════════════════════════════════════════════════════════════════════════════
//
// « Le contrôle rejoue le calcul » n'est testable que si le langage est défini,
// sinon chaque auteur écrit une forme différente et le contrôle en lit une
// seule. La grammaire est celle de `charte.md` § « Les objets du contenu » :
//
//   calcul : { etapes: [{ id, expr, unite }], reponse: <id d'étape> }
//   expr   : + − × ÷ ^ , littéraux rationnels [numérateur, dénominateur] entiers,
//            références @donnee, #etape, $constante
//
// Aucun littéral flottant n'est accepté — c'est la barrière qui empêche 2.7
// d'entrer dans une algèbre où 27/10 est exact. Et le contrôle exige au moins
// une étape et au moins une opération, ce qui EST le refus « réponse tabulée
// déclarée classe A », dérivé au lieu d'être déclaré.

const DIMENSION_NULLE = Object.freeze([0, 0, 0, 0, 0]);

const dimPlus = (a, b, signe = 1) => a.map((v, i) => v + signe * b[i]);
const dimFois = (a, k) => a.map((v) => v * k);

// Le trait d'union n'est admis dans une référence qu'ENTRE deux caractères
// alphanumériques : `$vitesse-de-la-lumiere` est une constante, `@m-@v` est une
// soustraction. Sans cette précaution, `@m-@v` se lisait comme une donnée
// nommée « m- » suivie d'un jeton inattendu — c'est-à-dire un refus au bon
// endroit pour la mauvaise raison, et, sur `@masse-@tare`, une donnée inconnue
// là où l'auteur avait écrit une soustraction correcte.
const JETONS = /\s*(\[\s*[+-]?\d+\s*(?:,\s*[+-]?\d+\s*)?\]|[@#$][A-Za-z0-9_.]+(?:-[A-Za-z0-9_.]+)*|\d+[.,]\d+|\d+|[+\-−×*÷/^()])/y;

function decouper(expr) {
  const source = String(expr ?? '');
  const jetons = [];
  JETONS.lastIndex = 0;
  let position = 0;
  while (position < source.length) {
    JETONS.lastIndex = position;
    const m = JETONS.exec(source);
    if (!m) {
      const reste = source.slice(position).trim();
      if (!reste) break;
      return { erreur: 'EXPRESSION_ILLISIBLE', detail: reste };
    }
    jetons.push(m[1]);
    position = JETONS.lastIndex;
  }
  return { jetons };
}

/** Une grandeur dans le calcul : sa valeur en unité SI cohérente, et sa dimension. */
const grandeur = (q, dim) => ({ q, dim });

const litteralRationnel = (jeton) => {
  if (jeton.startsWith('[')) {
    const [n, d = '1'] = jeton.slice(1, -1).split(',').map((s) => s.trim());
    if (d === '0') return null;
    return rationnel(BigInt(n), BigInt(d));
  }
  return rationnel(BigInt(jeton));
};

/**
 * L'analyseur de la grammaire, en descente récursive.
 *
 * Les erreurs sont rendues par exception interne et rattrapées par
 * `evaluerCalcul` : à cette profondeur, propager un `{ ok: false }` à chaque
 * niveau doublerait la longueur du code pour la même information.
 */
function analyser(jetons, resoudre) {
  let i = 0;
  const fin = () => i >= jetons.length;
  const tete = () => jetons[i];
  const lever = (code, detail) => { const e = new Error(code); e.code = code; e.detail = detail; throw e; };

  const primaire = () => {
    if (fin()) lever('EXPRESSION_INCOMPLETE', jetons.join(' '));
    const j = jetons[i];
    if (j === '(') {
      i += 1;
      const v = expression();
      if (tete() !== ')') lever('PARENTHESE_NON_FERMEE', jetons.join(' '));
      i += 1;
      return v;
    }
    if (j === '-' || j === '−') {
      i += 1;
      const v = primaire();
      return grandeur(multiplier(v.q, rationnel(-1)), v.dim);
    }
    if (/^\d+[.,]\d+$/.test(j)) {
      // La barrière. Un auteur qui écrit 2,7 au lieu de [27,10] l'apprend au
      // build — et l'apprendre au build est le seul moment où c'est réparable.
      lever('LITTERAL_FLOTTANT', j);
    }
    if (/^\d/.test(j) || j.startsWith('[')) {
      i += 1;
      const r = litteralRationnel(j);
      if (r === null) lever('DENOMINATEUR_NUL', j);
      return grandeur(r, [...DIMENSION_NULLE]);
    }
    if (/^[@#$]/.test(j)) {
      i += 1;
      return resoudre(j);
    }
    return lever('JETON_INATTENDU', j);
  };

  const facteur = () => {
    let v = primaire();
    while (!fin() && tete() === '^') {
      i += 1;
      const e = jetons[i];
      if (e === undefined || !/^[+-]?\d+$/.test(e.replace(/^\[|\]$/g, ''))) lever('EXPOSANT_NON_ENTIER', String(e));
      i += 1;
      const n = Number(e.replace(/[[\]]/g, ''));
      v = grandeur(puissance(v.q, n), dimFois(v.dim, n));
    }
    return v;
  };

  const terme = () => {
    let v = facteur();
    while (!fin() && ['×', '*', '÷', '/'].includes(tete())) {
      const op = tete();
      i += 1;
      const d = facteur();
      if (op === '×' || op === '*') v = grandeur(multiplier(v.q, d.q), dimPlus(v.dim, d.dim));
      else {
        if (d.q.n === 0n) lever('DIVISION_PAR_ZERO', jetons.join(' '));
        v = grandeur(multiplier(v.q, rationnel(d.q.d, d.q.n)), dimPlus(v.dim, d.dim, -1));
      }
    }
    return v;
  };

  const expression = () => {
    let v = terme();
    while (!fin() && ['+', '-', '−'].includes(tete())) {
      const op = tete();
      i += 1;
      const d = terme();
      // Additionner deux grandeurs de dimensions différentes est la faute que
      // l'algèbre des unités existe pour attraper. Elle est refusée ici, dans le
      // calcul de l'AUTEUR, avant de pouvoir être servie à un élève.
      if (!memeDimension({ dim: v.dim }, { dim: d.dim })) {
        lever('ADDITION_DE_DIMENSIONS_DIFFERENTES', jetons.join(' '));
      }
      v = grandeur(op === '+' ? additionner(v.q, d.q) : soustraire(v.q, d.q), v.dim);
    }
    return v;
  };

  const valeur = expression();
  if (!fin()) lever('JETON_INATTENDU', tete());
  return valeur;
}

/** Le nombre d'opérations d'une expression — ce qui rend « au moins une
 *  opération » et « au plus une opération » décidables sans relire l'auteur. */
export function compterOperations(expr) {
  const { jetons } = decouper(expr);
  if (!jetons) return 0;
  let n = 0;
  jetons.forEach((j, k) => {
    if (!['+', '-', '−', '×', '*', '÷', '/', '^'].includes(j)) return;
    // Un « − » en tête ou juste après un opérateur ou une parenthèse ouvrante est
    // un signe, pas une soustraction : le compter ferait échouer « −5 » sur le
    // plafond d'une opération de l'item de choix de relation.
    const avant = jetons[k - 1];
    const unaire = (j === '-' || j === '−') && (k === 0 || avant === '(' || ['+', '-', '−', '×', '*', '÷', '/', '^'].includes(avant));
    if (!unaire) n += 1;
  });
  return n;
}

/** Une chaîne purement multiplicative ne transpose aucun terme : c'est la
 *  dérivation que la charte donne, et le seul endroit où elle est écrite. */
export const chaineMultiplicative = (calcul) => (calcul?.etapes ?? []).every((e) => {
  const { jetons } = decouper(e.expr);
  if (!jetons) return false;
  return !jetons.some((j, k) => {
    if (j !== '+' && j !== '-' && j !== '−') return false;
    const avant = jetons[k - 1];
    return !(k === 0 || avant === '(' || ['+', '-', '−', '×', '*', '÷', '/', '^'].includes(avant));
  });
});

/** L'arrondi d'un rationnel à n décimales, au plus proche, moitié au-dessus.
 *  En entiers : la fenêtre de tolérance doit couvrir la route arrondie, et une
 *  borne calculée en flottants ne serait pas une borne. */
export function arrondirRationnel(q, decimales) {
  const facteur = 10n ** BigInt(decimales);
  const n = q.n * facteur;
  const deux = 2n * q.d;
  const arrondi = q.n >= 0n
    ? (2n * n + q.d) / deux
    : -((-2n * n + q.d) / deux);
  return rationnel(arrondi, facteur);
}

/**
 * Rejoue une chaîne de calcul.
 *
 *   evaluerCalcul(item.calcul, { donnees: item.donnees })
 *
 * `arrondiIntermediaire` rejoue la MÊME chaîne en arrondissant chaque étape à
 * `n` décimales dans son unité déclarée. C'est ce qui rend calculable la borne
 * que la charte impose aux fenêtres de tolérance : « la fenêtre couvre la valeur
 * obtenue en arrondissant à chaque étape intermédiaire du calcul ». Un élève qui
 * arrondit en cours de route n'est pas compté faux, et la largeur nécessaire est
 * calculée au lieu d'être devinée par l'auteur.
 */
export function evaluerCalcul(calcul, { donnees = {}, arrondiIntermediaire = null } = {}) {
  if (!calcul || !Array.isArray(calcul.etapes) || calcul.etapes.length === 0) {
    return { ok: false, code: 'CALCUL_SANS_ETAPE', detail: '' };
  }
  const etapes = {};
  let operations = 0;

  for (const etape of calcul.etapes) {
    if (!etape || typeof etape.id !== 'string' || !etape.id) {
      return { ok: false, code: 'ETAPE_SANS_ID', detail: JSON.stringify(etape ?? null) };
    }
    if (etapes[etape.id]) return { ok: false, code: 'ETAPE_EN_DOUBLE', detail: etape.id };

    const lueUnite = analyserUnite(etape.unite ?? '', { lexique: 'auteur' });
    if (!lueUnite.ok) return { ok: false, code: 'UNITE_D_ETAPE_REFUSEE', detail: `${etape.id} : ${etape.unite}` };

    const decoupe = decouper(etape.expr);
    if (decoupe.erreur) return { ok: false, code: decoupe.erreur, detail: `${etape.id} : ${decoupe.detail}` };
    operations += compterOperations(etape.expr);

    const resoudre = (reference) => {
      const nom = reference.slice(1);
      if (reference[0] === '#') {
        const vue = etapes[nom];
        if (!vue) { const e = new Error('ETAPE_INCONNUE'); e.code = 'ETAPE_INCONNUE'; e.detail = reference; throw e; }
        return grandeur(vue.q, vue.dim);
      }
      const source = reference[0] === '@' ? donnees[nom] : CONSTANTES[nom];
      if (!source) {
        const e = new Error(reference[0] === '@' ? 'DONNEE_INCONNUE' : 'CONSTANTE_HORS_TABLE');
        e.code = e.message; e.detail = reference; throw e;
      }
      const u = analyserUnite(source.unite ?? '', { lexique: 'auteur' });
      if (!u.ok) { const e = new Error('UNITE_DE_DONNEE_REFUSEE'); e.code = e.message; e.detail = reference; throw e; }
      const v = versRationnelExact(source.valeur);
      if (v === null) { const e = new Error('VALEUR_NON_EXACTE'); e.code = e.message; e.detail = reference; throw e; }
      return grandeur(multiplier(v, u.unite.facteur), [...u.unite.dim]);
    };

    let valeur;
    try {
      valeur = analyser(decoupe.jetons, resoudre);
    } catch (e) {
      if (!e.code) throw e;
      return { ok: false, code: e.code, detail: `${etape.id} : ${e.detail ?? ''}` };
    }

    if (!memeDimension({ dim: valeur.dim }, { dim: lueUnite.unite.dim })) {
      return {
        ok: false,
        code: 'DIMENSION_D_ETAPE_INCOHERENTE',
        detail: `${etape.id} : le calcul rend ${valeur.dim.join(',')}, l'unité déclarée « ${etape.unite} » vaut ${lueUnite.unite.dim.join(',')}`,
      };
    }

    let q = valeur.q;
    // L'étape de réponse n'est PAS arrondie : la charte parle des étapes
    // INTERMÉDIAIRES, et l'écriture de la réponse finale a son propre champ
    // (`reponse.ecriture`) et son propre verdict. Arrondir la dernière ferait
    // mesurer deux choses différentes sous le même nom.
    if (Number.isInteger(arrondiIntermediaire) && etape.id !== calcul.reponse) {
      // On arrondit dans l'UNITÉ DÉCLARÉE, pas en SI : un élève qui arrondit
      // arrondit ce qu'il écrit, et il écrit des g/cm³, pas des kg/m³.
      const dansSonUnite = multiplier(q, rationnel(lueUnite.unite.facteur.d, lueUnite.unite.facteur.n));
      q = multiplier(arrondirRationnel(dansSonUnite, arrondiIntermediaire), lueUnite.unite.facteur);
    }
    etapes[etape.id] = { q, dim: valeur.dim, unite: lueUnite.unite, texteUnite: etape.unite };
  }

  const finale = etapes[calcul.reponse];
  if (!finale) return { ok: false, code: 'ETAPE_DE_REPONSE_INCONNUE', detail: String(calcul.reponse) };

  return { ok: true, etapes, operations, reponse: finale };
}

/** Les écritures exactes qu'un contenu peut porter : entier, `[n, d]`, ou un
 *  rationnel déjà construit. Jamais un flottant — `2.7` rend `null`. */
export function versRationnelExact(valeur) {
  if (valeur === null || valeur === undefined) return null;
  if (typeof valeur === 'object' && !Array.isArray(valeur) && typeof valeur.n === 'bigint') return valeur;
  if (Array.isArray(valeur)) {
    const [n, d = 1] = valeur;
    if (!Number.isInteger(n) || !Number.isInteger(d) || d === 0) return null;
    return rationnel(n, d);
  }
  if (typeof valeur === 'number') return Number.isInteger(valeur) ? rationnel(valeur) : null;
  if (typeof valeur === 'bigint') return rationnel(valeur);
  return null;
}

/** La valeur d'une grandeur SI, exprimée dans une unité analysée. */
export const dansSonUnite = (q, unite) => multiplier(q, rationnel(unite.facteur.d, unite.facteur.n));

// ════════════════════════════════════════════════════════════════════════════
// Le hachage de relecture — ce qui ferme l'effet pervers du plafond
// ════════════════════════════════════════════════════════════════════════════

/**
 * Le hachage de l'item MOINS son bloc `relu`.
 *
 * La règle de la v1 — « toute modification de l'énoncé invalide la relecture » —
 * avait deux défauts qui se composaient. D'abord, éditer un item de classe C le
 * retirait du numérateur *et* du dénominateur du plafond, donc **améliorait la
 * conformité**. Ensuite et surtout, dans un double QCM ce qui est risqué n'est
 * pas l'énoncé, ce sont les **distracteurs et les justifications** : on pouvait
 * les remplacer tous les quatre sans toucher à l'énoncé, c'est-à-dire modifier
 * exactement la partie que la relecture était censée couvrir.
 *
 * Le hachage porte donc sur l'item entier, sérialisé à clés triées.
 */
export function hachageItem(item) {
  const sansRelu = { ...item };
  delete sansRelu.relu;
  const texte = serialiserStable(sansRelu);
  // FNV-1a 64 bits. Ce n'est pas de la cryptographie et ce n'est pas prétendu :
  // c'est un scellé contre l'édition distraite, pas contre un adversaire.
  let h = 0xcbf29ce484222325n;
  const octets = new TextEncoder().encode(texte);
  for (const o of octets) {
    h ^= BigInt(o);
    h = (h * 0x100000001b3n) & 0xffffffffffffffffn;
  }
  return h.toString(16).padStart(16, '0');
}

function serialiserStable(v) {
  if (v === null || v === undefined) return 'null';
  if (typeof v === 'bigint') return `${v}n`;
  if (Array.isArray(v)) return `[${v.map(serialiserStable).join(',')}]`;
  if (typeof v === 'object') {
    return `{${Object.keys(v).sort().map((k) => `${JSON.stringify(k)}:${serialiserStable(v[k])}`).join(',')}}`;
  }
  return JSON.stringify(v);
}

// ════════════════════════════════════════════════════════════════════════════
// La validation
// ════════════════════════════════════════════════════════════════════════════

/** Un refus porte un CODE — l'énuméré est ce qui permet à l'épreuve du
 *  contrôleur de vérifier qu'un item fautif est refusé POUR LA BONNE RAISON.
 *  Refuser un item pour un motif qui n'est pas le sien est un contrôle qui
 *  passe par accident. */
export const CODES_DE_REFUS = Object.freeze([
  'CHAMP_INCONNU', 'CHAMP_ABSENT', 'VALEUR_HORS_ENUMERE',
  'SAVOIR_FAIRE_INCONNU', 'CHAPITRE_INCONNU', 'CHAPITRE_ANTERIEUR_AU_SAVOIR_FAIRE',
  'CLASSE_A_SANS_CALCUL', 'CLASSE_A_SANS_OPERATION', 'CALCUL_REFUSE', 'CORRECTION_NON_RETROUVEE',
  'TRANSPOSITION_AVANT_MATHS_CH11',
  'CLASSE_A_TABLE_SANS_REQUETE', 'REQUETE_SANS_RESULTAT', 'TABLE_SANS_SOURCE',
  'CLASSE_B_SANS_OBJET_FORMEL', 'CLASSE_C_SANS_RELECTURE', 'RELECTURE_PERIMEE',
  'FIGURE_ABSENTE', 'FIGURE_HORS_TYPE', 'FIGURE_NON_ENGENDREE', 'FIGURE_SORTE_INCONNUE',
  'FIGURE_ET_CORRECTION_DISJOINTES',
  'REFERENCE_A_UNE_IMAGE', 'NOMBRE_NU_DANS_LA_PROSE',
  'ITEM_SCINDABLE_NON_SCINDE',
  'UNITE_AUTEUR_REFUSEE', 'SEMANTIQUE_NON_DECLAREE', 'TOLERANCE_SANS_MODELE_ERRONE',
  'TOLERANCE_TROP_ETROITE', 'MODELE_ERRONE_DANS_LA_FENETRE',
  'DISTRACTEUR_SANS_MODELE', 'DISTRACTEUR_SANS_PIEGE', 'MODELE_ERRONE_NON_DISCRIMINANT',
  'DISTRACTEURS_DE_MEME_VALEUR', 'DISTRACTEUR_DANS_LA_FENETRE',
  'JUSTIFICATIONS_HORS_DOUBLE_QCM', 'DOUBLE_QCM_SANS_JUSTIFICATIONS',
  'JUSTIFICATION_SANS_PROVENANCE', 'JUSTIFICATION_REFORMULEE_SANS_SOURCE',
  'DOUBLE_QCM_SANS_JUSTIFICATION_JUSTE', 'DOUBLE_QCM_SANS_JUSTIFICATION_FAUSSE',
  'PIEGE_INCONNU', 'CONDITION_DE_VALIDITE_NON_SATISFAITE', 'SITUATION_ABSENTE',
  'DISPOSITIF_ETRANGER_AU_PIEGE',
  'FORMAT_DIAGNOSTIQUE_SANS_MOTIF', 'FORMAT_DIAGNOSTIQUE_SANS_PIEGE',
  'DIMENSION_VARIEE_ABSENTE', 'DIMENSION_VARIEE_HORS_PALIER',
  'FRONTIERE_DE_SYSTEME_ABSENTE',
  'DISCRIMINATION_TROP_COMPLEXE', 'DISCRIMINATION_SANS_PREREQUIS',
]);

const refus = (liste, code, message) => liste.push(Object.freeze({ code, message }));

const estObjet = (v) => !!v && typeof v === 'object' && !Array.isArray(v);

/** Une référence de fichier image dans un énoncé. C'est ce qui rend le refus
 *  « dessiné à la main » détectable par un programme, l'intention de l'auteur ne
 *  l'étant pas. */
const REFERENCE_IMAGE = /(?:<img\b|!\[[^\]]*\]\(|\b[\w/-]+\.(?:png|jpe?g|gif|svg|webp|pdf)\b)/i;

/** Un nombre nu suivi de % ou de « points » dans la prose publiée. Aucun
 *  programme ne peut déterminer la provenance d'un nombre écrit dans une phrase :
 *  la citation typée `{{cite:…}}` est obligatoire, et c'est cette forme-ci qui
 *  est refusée. */
const NOMBRE_NU = /(?<!\{\{[^}]{0,80})\b\d+(?:[.,]\d+)?\s*(?:%|points?\b)/;

/**
 * Ce qu'un item ne peut pas être.
 *
 * Rend `{ ok, refus: [{ code, message }] }`. Jamais d'exception : un contrôleur
 * qui lève sur le premier item fautif ne rend pas la liste des fautes, il rend
 * la première — et un auteur corrige alors une faute par exécution.
 *
 * Le contexte est injectable pour que les tests puissent éprouver le schéma sans
 * le corpus réel ; par défaut il EST le corpus réel, comme partout dans ce
 * projet.
 */
export function validerItem(item, {
  savoirFaire = SAVOIR_FAIRE_PAR_ID,
  chapitres = CHAPITRE_PAR_ID,
  pieges = PIEGES,
} = {}) {
  const r = [];
  if (!estObjet(item)) {
    refus(r, 'CHAMP_ABSENT', "ce n'est pas un item");
    return { ok: false, refus: r };
  }
  const ou = `item « ${item.id ?? '?'} »`;

  // ── 1. Le schéma : champs connus, champs présents, énumérés fermés ───────
  for (const nom of Object.keys(item)) {
    if (!NOMS_DE_CHAMPS.has(nom)) {
      refus(r, 'CHAMP_INCONNU', `${ou} : champ « ${nom} » hors schéma. Un champ mal nommé ne produit aucune erreur — il produit un item dont le drapeau vaut undefined.`);
    }
  }
  for (const champ of CHAMPS) {
    if (champ.obligation !== 'toujours') continue;
    const v = item[champ.nom];
    if (v === undefined || v === null || v === '') {
      refus(r, 'CHAMP_ABSENT', `${ou} : \`${champ.nom}\` absent — ${champ.role}.`);
      continue;
    }
    if (champ.valeurs && !champ.valeurs.includes(v)) {
      refus(r, 'VALEUR_HORS_ENUMERE', `${ou} : \`${champ.nom}\` = « ${v} » hors énuméré (${champ.valeurs.join(' | ')}).`);
    }
  }
  if (item.sfSollicites !== undefined && !Array.isArray(item.sfSollicites)) {
    refus(r, 'VALEUR_HORS_ENUMERE', `${ou} : \`sfSollicites\` doit être une liste.`);
  }
  if (item.discriminationMaths !== undefined && item.discriminationMaths !== null
    && !ROLES_DISCRIMINATION.includes(item.discriminationMaths)) {
    refus(r, 'VALEUR_HORS_ENUMERE', `${ou} : \`discriminationMaths\` hors énuméré (${ROLES_DISCRIMINATION.join(' | ')}).`);
  }

  const sf = savoirFaire[item.sfPrincipal];
  if (item.sfPrincipal && !sf) {
    refus(r, 'SAVOIR_FAIRE_INCONNU', `${ou} : \`sfPrincipal\` « ${item.sfPrincipal} » n'est dans aucun chapitre du programme.`);
  }
  const chapitre = chapitres[item.chapitre];
  if (item.chapitre && !chapitre) {
    refus(r, 'CHAPITRE_INCONNU', `${ou} : \`chapitre\` « ${item.chapitre} » inconnu.`);
  }
  // Un item ne peut pas être servi AVANT le chapitre de son savoir-faire : il
  // demanderait un geste que la progression n'a pas encore installé. L'inverse
  // est légitime — c'est le palier 4, mélangé, servi plus tard.
  if (sf && chapitre) {
    const origine = chapitres[sf.chapitre];
    if (origine && chapitre.numero < origine.numero) {
      refus(r, 'CHAPITRE_ANTERIEUR_AU_SAVOIR_FAIRE', `${ou} : servi au chapitre ${chapitre.numero} pour un savoir-faire du chapitre ${origine.numero}.`);
    }
  }

  // ── 2. La prose publiée ─────────────────────────────────────────────────
  const enonce = String(item.enonce ?? '');
  if (REFERENCE_IMAGE.test(enonce)) {
    refus(r, 'REFERENCE_A_UNE_IMAGE', `${ou} : référence à un fichier image dans l'énoncé. Toute figure est ENGENDRÉE par l'objet formel de la correction ; une image est un dessin que rien ne relie à la réponse.`);
  }
  if (NOMBRE_NU.test(enonce)) {
    refus(r, 'NOMBRE_NU_DANS_LA_PROSE', `${ou} : nombre nu suivi de « % » ou de « points » dans la prose. Écrire {{cite:…}} — aucun programme ne peut retrouver la provenance d'un nombre dans une phrase.`);
  }

  // ── 3. La figure : engendrée, ou pas de figure ──────────────────────────
  r.push(...refusDeLaFigure(item, ou));

  // ── 4. La classe de garantie ────────────────────────────────────────────
  r.push(...refusDeLaClasse(item, sf, ou));

  // ── 5. L'algèbre des unités, côté auteur ────────────────────────────────
  if (attendUneReponseDimensionnee(item)) {
    for (const a of controlerItemAuteur(item, sf ?? {})) {
      refus(r, 'UNITE_AUTEUR_REFUSEE', `${ou} : ${a.message}`);
    }
    if (!SEMANTIQUES.includes(item.reponse?.semantique)) {
      refus(r, 'SEMANTIQUE_NON_DECLAREE', `${ou} : \`reponse.semantique\` hors énuméré (${SEMANTIQUES.join(' | ')}).`);
    }
  }

  // ── 6. La tolérance et les modèles erronés ──────────────────────────────
  r.push(...refusDeLaTolerance(item, ou));

  // ── 7. Les distracteurs ─────────────────────────────────────────────────
  r.push(...refusDesDistracteurs(item, pieges, ou));

  // ── 8. Le double QCM et la provenance des justifications ────────────────
  r.push(...refusDuDoubleQcm(item, ou));

  // ── 9. Le piège : condition de validité, dispositif, format ─────────────
  r.push(...refusDuPiege(item, sf, pieges, ou));

  // ── 9 bis. La frontière de système, HORS du bloc « piège » ──────────────
  // Elle en dépendait, et c'est ce qui la rendait morte : un item d'énergie ne
  // porte jamais de piège, par décision de la charte elle-même.
  r.push(...refusDeLaFrontiereDeSysteme(item, sf, ou));

  // ── 10. La variation ────────────────────────────────────────────────────
  const paliersAVariation = [2, 3];
  if (paliersAVariation.includes(item.palier) && !DIMENSIONS_VARIEES.includes(item.dimensionVariee)) {
    refus(r, 'DIMENSION_VARIEE_ABSENTE', `${ou} : palier ${item.palier} sans \`dimensionVariee\` de l'énuméré fin. Le palier ne suffit pas : s'il déterminait la dimension, le refus « deux paliers, même dimension » ne pourrait jamais se déclencher.`);
  }
  if (!paliersAVariation.includes(item.palier) && item.dimensionVariee !== undefined && item.dimensionVariee !== null) {
    refus(r, 'DIMENSION_VARIEE_HORS_PALIER', `${ou} : \`dimensionVariee\` déclarée au palier ${item.palier}, où rien ne varie par rapport au palier précédent.`);
  }

  // ── 11. La discrimination mathématique ──────────────────────────────────
  r.push(...refusDeLaDiscrimination(item, sf, ou));

  return { ok: r.length === 0, refus: r };
}

// ── Les blocs, dans l'ordre où la charte les énonce ────────────────────────

function refusDeLaFigure(item, ou) {
  const r = [];
  const sortes = SORTES_PAR_TYPE[item.type];
  if (!sortes) {
    if (item.figure !== undefined && item.figure !== null) {
      refus(r, 'FIGURE_HORS_TYPE', `${ou} : \`figure\` sur un type « ${item.type} » qui n'en désigne aucune — un dessin que personne n'affichera, ou pire, affiché là où l'énoncé n'en parle pas.`);
    }
    return r;
  }
  if (!estObjet(item.figure)) {
    refus(r, 'FIGURE_ABSENTE', `${ou} : type « ${item.type} » sans \`figure\` (sortes possibles : ${sortes.join(', ')}).`);
    return r;
  }
  if (!sortes.includes(item.figure.sorte)) {
    refus(r, 'FIGURE_SORTE_INCONNUE', `${ou} : \`figure.sorte\` « ${item.figure.sorte} » hors des sortes du type « ${item.type} » (${sortes.join(', ')}).`);
    return r;
  }
  // Le refus décisif : la figure doit être TRAÇABLE depuis sa seule déclaration.
  // Une figure que `schema.js` refuse est une figure que l'élève ne verra pas —
  // ou verra fausse, ce qui est pire, parce qu'un schéma n'est pas relu.
  const tracee = rendreFigure(item.figure);
  if (!tracee.ok) {
    refus(r, 'FIGURE_NON_ENGENDREE', `${ou} : \`schema.js\` refuse la figure (${tracee.raison}${tracee.details?.length ? ` : ${tracee.details.join(', ')}` : ''}).`);
  }
  return r;
}

/** L'item attend-il une valeur dimensionnée saisie ? Dérivé de la réponse, pas
 *  déclaré : c'est la présence d'une `valeur` numérique qui décide. */
const attendUneReponseDimensionnee = (item) => estObjet(item.reponse) && item.reponse.valeur !== undefined;

function refusDeLaClasse(item, sf, ou) {
  const r = [];
  const classe = item.classe;

  if (classe === 'A') {
    if (!estObjet(item.calcul)) {
      refus(r, 'CLASSE_A_SANS_CALCUL', `${ou} : classe A sans \`calcul\` rejouable.`);
      return r;
    }
    const rejeu = evaluerCalcul(item.calcul, { donnees: item.donnees ?? {} });
    if (!rejeu.ok) {
      refus(r, 'CALCUL_REFUSE', `${ou} : ${rejeu.code} — ${rejeu.detail}`);
      return r;
    }
    // « Au moins une opération » EST le refus « réponse tabulée déclarée classe
    // A », dérivé au lieu d'être déclaré : une chaîne sans opération ne calcule
    // rien, elle recopie. Sa place est en A′, où la requête est rejouée.
    if (rejeu.operations === 0) {
      refus(r, 'CLASSE_A_SANS_OPERATION', `${ou} : classe A dont la chaîne ne comporte aucune opération. Une valeur recopiée n'est pas un calcul : c'est une requête tabulée, donc une classe A_TABLE.`);
    }
    r.push(...refusDeLaCorrection(item, rejeu, ou));
    if (sf && !transpositionDisponible(sf) && sf.prerequisMaths && !chaineMultiplicative(item.calcul)) {
      refus(r, 'TRANSPOSITION_AVANT_MATHS_CH11', `${ou} : la chaîne n'est pas purement multiplicative alors que « ${sf.id} » est programmé au trimestre ${CHAPITRE_PAR_ID[sf.chapitre]?.trimestre} — les équations sont au chapitre 11 de maths-4e, en trimestre 3.`);
    }
  }

  if (classe === 'A_TABLE') {
    if (!estObjet(item.requete)) {
      refus(r, 'CLASSE_A_TABLE_SANS_REQUETE', `${ou} : classe A′ sans \`requete\` déclarée — un fait n'est pas un théorème, mais il se rejoue.`);
      return r;
    }
    const cellule = interrogerTable(item.requete);
    if (cellule === null) {
      refus(r, 'REQUETE_SANS_RESULTAT', `${ou} : la requête { ${item.requete.table}, ${item.requete.cle}, ${item.requete.colonne} } ne rend rien.`);
      return r;
    }
    r.push(...refusDeLaCorrectionTabulee(item, cellule, ou));
  }

  if (classe === 'B') {
    if (!estObjet(item.reponse?.objetFormel)) {
      refus(r, 'CLASSE_B_SANS_OBJET_FORMEL', `${ou} : classe B sans \`reponse.objetFormel\`. Ce que la classe B garantit, c'est l'ACCORD entre l'énoncé et la correction, par engendrement — sans objet formel, il n'y a rien qui engendre.`);
    } else if (estObjet(item.figure)) {
      // Le refus qui fait exister l'invariant 6 au lieu de l'énoncer.
      //
      // « Le dessin ne peut pas contredire la réponse, puisqu'il en dérive » n'a
      // de valeur que si le programme peut le CONSTATER. Deux objets égaux
      // champ pour champ ne suffisent pas : ils divergent au premier auteur qui
      // corrige l'un des deux. L'identité de référence est la seule forme de
      // « le même objet formel » qu'une machine sache lire, et elle oblige
      // l'auteur à écrire le graphe une fois et à le citer deux fois.
      const objetDeLaFigure = item.figure.circuit ?? item.figure.description ?? item.figure.donnees;
      if (objetDeLaFigure !== item.reponse.objetFormel) {
        refus(r, 'FIGURE_ET_CORRECTION_DISJOINTES', `${ou} : la figure et la correction sont deux objets distincts. Un schéma dessiné à côté de sa réponse finit par la contredire, et un schéma faux coûte plus cher qu'une phrase fausse : il n'est pas relu.`);
      }
    }
  }

  if (classe === 'C') {
    const relu = item.relu;
    if (!estObjet(relu) || !relu.par || !relu.date || !relu.hash) {
      refus(r, 'CLASSE_C_SANS_RELECTURE', `${ou} : classe C sans \`relu: { par, date, hash }\`. Aucune garantie mécanique : c'est la relecture qui tient, et elle se prouve.`);
    } else if (relu.hash !== hachageItem(item)) {
      refus(r, 'RELECTURE_PERIMEE', `${ou} : le hachage de relecture ne correspond plus à l'item. Dans un double QCM, ce qui est risqué n'est pas l'énoncé, ce sont les distracteurs et les justifications — et la règle de la v1 permettait de les remplacer tous les quatre sans invalider la relecture.`);
    }
  }

  // Un item scindable non scindé : il porte à la fois un `calcul` et une réponse
  // libre. Le plafond de classe C ne se respecte pas en supprimant des formats,
  // il se respecte en les découpant correctement.
  if (item.calcul && item.reponse?.libre === true) {
    refus(r, 'ITEM_SCINDABLE_NON_SCINDE', `${ou} : porte à la fois un \`calcul\` et une réponse libre. Désigner la valeur absurde est vérifiable (A′), expliquer pourquoi ne l'est pas (C) : ce sont deux items.`);
  }

  return r;
}

function refusDeLaCorrection(item, rejeu, ou) {
  const r = [];
  const attendue = versRationnelExact(item.reponse?.valeur);
  if (attendue === null) {
    refus(r, 'CORRECTION_NON_RETROUVEE', `${ou} : \`reponse.valeur\` n'est pas un rationnel exact (entier ou [n, d]).`);
    return r;
  }
  const lue = analyserUnite(item.reponse?.unite ?? '', { lexique: 'auteur' });
  if (!lue.ok) return r; // déjà refusé par l'algèbre des unités
  const calculee = dansSonUnite(rejeu.reponse.q, lue.unite);
  if (!memeDimension(rejeu.reponse.unite, lue.unite)) {
    refus(r, 'CORRECTION_NON_RETROUVEE', `${ou} : l'étape de réponse rend une dimension que « ${item.reponse.unite} » ne porte pas.`);
  } else if (!rationnelsEgaux(calculee, attendue)) {
    refus(r, 'CORRECTION_NON_RETROUVEE', `${ou} : le recalcul rend ${rationnelVersTexte(calculee)} ${item.reponse.unite}, la correction déclare ${rationnelVersTexte(attendue)}.`);
  }
  return r;
}

function refusDeLaCorrectionTabulee(item, cellule, ou) {
  const r = [];
  if (typeof cellule === 'string') {
    if (String(item.reponse?.valeur) !== cellule) {
      refus(r, 'CORRECTION_NON_RETROUVEE', `${ou} : la table rend « ${cellule} », la correction déclare « ${item.reponse?.valeur} ».`);
    }
    return r;
  }
  const attendue = versRationnelExact(item.reponse?.valeur);
  const tabulee = versRationnelExact(cellule.valeur);
  if (attendue === null || tabulee === null) {
    refus(r, 'CORRECTION_NON_RETROUVEE', `${ou} : valeur tabulée ou déclarée non exacte.`);
    return r;
  }
  const uReponse = analyserUnite(item.reponse?.unite ?? '', { lexique: 'auteur' });
  const uTable = analyserUnite(cellule.unite ?? '', { lexique: 'auteur' });
  if (!uReponse.ok || !uTable.ok) {
    refus(r, 'CORRECTION_NON_RETROUVEE', `${ou} : unité illisible côté item ou côté table.`);
    return r;
  }
  const enSiTable = multiplier(tabulee, uTable.unite.facteur);
  const enSiItem = multiplier(attendue, uReponse.unite.facteur);
  if (!memeDimension(uReponse.unite, uTable.unite) || !rationnelsEgaux(enSiTable, enSiItem)) {
    refus(r, 'CORRECTION_NON_RETROUVEE', `${ou} : la table rend ${rationnelVersTexte(tabulee)} ${cellule.unite}, la correction déclare ${rationnelVersTexte(attendue)} ${item.reponse.unite}.`);
  }
  return r;
}

/**
 * La tolérance, et la faille que la v1 laissait ouverte.
 *
 * Elle exigeait un modèle erroné exécutable pour les distracteurs QUANTITATIFS,
 * c'est-à-dire les QCM. Un item à saisie libre avec tolérance n'a pas de
 * distracteur, donc pas de modèle, donc l'invariant passait trivialement **sur
 * tous les items où la tolérance est réellement à risque**. Un invariant qui
 * passe toujours est pire qu'aucun invariant : il donne la sensation d'une
 * garantie.
 */
function refusDeLaTolerance(item, ou) {
  const r = [];
  if (item.reponse?.semantique !== 'tolerante') {
    if (item.modelesErrones !== undefined || item.motifSansModeleErrone !== undefined) {
      // Pas un refus : déclarer un modèle erroné sur un item exact est
      // simplement inutile, jamais dangereux. On laisse passer.
    }
    return r;
  }
  const modeles = [...(item.modelesErrones ?? []), ...(item.distracteurs ?? []).map((d) => d.modeleErrone).filter(Boolean)];
  if (modeles.length === 0 && !String(item.motifSansModeleErrone ?? '').trim()) {
    refus(r, 'TOLERANCE_SANS_MODELE_ERRONE', `${ou} : \`semantique: 'tolerante'\` sans modèle erroné exécutable ni motif écrit.`);
    return r;
  }

  const fenetre = fenetreDeTolerance(item);
  if (!fenetre) return r;

  for (const modele of modeles) {
    const rejeu = evaluerCalcul(modele.calcul, { donnees: item.donnees ?? {} });
    if (!rejeu.ok) {
      refus(r, 'TOLERANCE_SANS_MODELE_ERRONE', `${ou} : le modèle erroné « ${modele.id ?? '?'} » ne s'exécute pas (${rejeu.code}).`);
      continue;
    }
    if (dansLaFenetre(rejeu.reponse.q, fenetre)) {
      refus(r, 'MODELE_ERRONE_DANS_LA_FENETRE', `${ou} : la valeur du modèle erroné « ${modele.id ?? '?'} » tombe dans la fenêtre de tolérance — l'élève qui applique le modèle faux est compté juste.`);
    }
  }

  // La borne que la charte impose, et qui n'était nulle part : la fenêtre doit
  // COUVRIR la valeur obtenue en arrondissant à chaque étape intermédiaire.
  if (item.classe === 'A' && item.calcul) {
    const decimales = Number.isInteger(item.reponse?.decimalesIntermediaires) ? item.reponse.decimalesIntermediaires : 2;
    const arrondi = evaluerCalcul(item.calcul, { donnees: item.donnees ?? {}, arrondiIntermediaire: decimales });
    if (arrondi.ok && !dansLaFenetre(arrondi.reponse.q, fenetre)) {
      refus(r, 'TOLERANCE_TROP_ETROITE', `${ou} : la fenêtre ne couvre pas la route arrondie à ${decimales} décimales par étape. Un élève qui arrondit en cours de route serait compté faux.`);
    }
  }
  return r;
}

/**
 * La fenêtre de tolérance, en valeurs SI exactes.
 *
 * Sur un item de lecture graphique, elle est CALCULÉE — une demi-graduation,
 * `schema.js:toleranceDeLecture` — et non saisie. C'est le bénéfice collatéral
 * de l'engendrement des figures : sur les items où la tolérance est le gros du
 * bataillon, la faille « la tolérance est un contenu faillible » se referme
 * d'elle-même.
 */
export function fenetreDeTolerance(item) {
  const lue = analyserUnite(item.reponse?.unite ?? '', { lexique: 'auteur' });
  const attendue = versRationnelExact(item.reponse?.valeur);
  if (!lue.ok || attendue === null) return null;
  const centre = multiplier(attendue, lue.unite.facteur);

  const demiGraduation = item.figure?.sorte === 'graphique'
    ? toleranceDeLecture(item.figure.donnees?.y)
    : null;
  if (demiGraduation !== null && demiGraduation !== undefined) {
    // La demi-graduation est un nombre de l'axe : on la ramène en rationnel par
    // son écriture décimale au millionième, jamais en propageant un flottant.
    const demi = rationnel(Math.round(demiGraduation * 1e6), 1000000);
    const marge = multiplier(demi, lue.unite.facteur);
    return { bas: soustraire(centre, marge), haut: additionner(centre, marge) };
  }

  const pourcent = item.reponse?.tolerancePourcent;
  if (!Number.isInteger(pourcent) || pourcent <= 0) return null;
  const marge = multiplier(centre.n < 0n ? multiplier(centre, rationnel(-1)) : centre, rationnel(pourcent, 100));
  return { bas: soustraire(centre, marge), haut: additionner(centre, marge) };
}

const dansLaFenetre = (q, fenetre) =>
  comparerRationnels(q, fenetre.bas) >= 0 && comparerRationnels(q, fenetre.haut) <= 0;

/**
 * Les distracteurs. L'invariant 11 est celui qui a le plus de clauses, parce
 * qu'un distracteur est le seul endroit du contenu où l'auteur écrit une réponse
 * FAUSSE — et une réponse fausse inventée ne diagnostique rien.
 */
function refusDesDistracteurs(item, pieges, ou) {
  const r = [];
  const liste = item.distracteurs ?? [];
  const quantitatifs = liste.filter((d) => d && d.valeur !== undefined);

  for (const d of liste) {
    if (!d?.piege) {
      refus(r, 'DISTRACTEUR_SANS_PIEGE', `${ou} : distracteur « ${d?.id ?? '?'} » non rattaché à un piège du catalogue.`);
    } else if (!pieges[d.piege]) {
      refus(r, 'PIEGE_INCONNU', `${ou} : distracteur « ${d.id} » rattaché au piège inconnu « ${d.piege} ».`);
    }
  }

  const bonne = versRationnelExact(item.reponse?.valeur);
  const uniteReponse = analyserUnite(item.reponse?.unite ?? '', { lexique: 'auteur' });

  for (const d of quantitatifs) {
    if (!estObjet(d.modeleErrone) || !estObjet(d.modeleErrone.calcul)) {
      refus(r, 'DISTRACTEUR_SANS_MODELE', `${ou} : distracteur numérique « ${d.id} » sans modèle erroné exécutable. Un distracteur inventé ne dit rien de ce que l'élève croit.`);
      continue;
    }
    const rejeu = evaluerCalcul(d.modeleErrone.calcul, { donnees: item.donnees ?? {} });
    if (!rejeu.ok) {
      refus(r, 'DISTRACTEUR_SANS_MODELE', `${ou} : le modèle erroné de « ${d.id} » ne s'exécute pas (${rejeu.code} — ${rejeu.detail}).`);
      continue;
    }
    const attendueD = versRationnelExact(d.valeur);
    const uniteD = analyserUnite(d.unite ?? item.reponse?.unite ?? '', { lexique: 'auteur' });
    if (attendueD === null || !uniteD.ok) {
      refus(r, 'DISTRACTEUR_SANS_MODELE', `${ou} : distracteur « ${d.id} » sans valeur exacte ou sans unité lisible.`);
      continue;
    }
    const enSi = multiplier(attendueD, uniteD.unite.facteur);
    if (!rationnelsEgaux(enSi, rejeu.reponse.q)) {
      refus(r, 'DISTRACTEUR_SANS_MODELE', `${ou} : le modèle erroné de « ${d.id} » rend ${rationnelVersTexte(dansSonUnite(rejeu.reponse.q, uniteD.unite))}, le distracteur affiche ${rationnelVersTexte(attendueD)}.`);
      continue;
    }
    if (bonne !== null && uniteReponse.ok && rationnelsEgaux(enSi, multiplier(bonne, uniteReponse.unite.facteur))) {
      refus(r, 'MODELE_ERRONE_NON_DISCRIMINANT', `${ou} : sur les données de cet item, le modèle erroné de « ${d.id} » redonne la bonne réponse — il ne discrimine rien.`);
    }
  }

  // Deux distracteurs de même valeur : l'élève ne peut pas les distinguer, et la
  // reprogrammation devient ambiguë — on ne sait plus quel piège reprogrammer.
  const vues = new Map();
  for (const d of quantitatifs) {
    const v = versRationnelExact(d.valeur);
    const u = analyserUnite(d.unite ?? item.reponse?.unite ?? '', { lexique: 'auteur' });
    if (v === null || !u.ok) continue;
    const cle = rationnelVersTexte(multiplier(v, u.unite.facteur));
    if (vues.has(cle)) {
      refus(r, 'DISTRACTEURS_DE_MEME_VALEUR', `${ou} : « ${vues.get(cle)} » et « ${d.id} » portent la même valeur.`);
    }
    vues.set(cle, d.id);
  }

  const fenetre = fenetreDeTolerance(item);
  if (fenetre) {
    for (const d of quantitatifs) {
      const v = versRationnelExact(d.valeur);
      const u = analyserUnite(d.unite ?? item.reponse?.unite ?? '', { lexique: 'auteur' });
      if (v === null || !u.ok) continue;
      if (dansLaFenetre(multiplier(v, u.unite.facteur), fenetre)) {
        refus(r, 'DISTRACTEUR_DANS_LA_FENETRE', `${ou} : le distracteur « ${d.id} » tombe dans la fenêtre de tolérance de la bonne réponse.`);
      }
    }
  }
  return r;
}

/** Un double QCM se lit sur le TYPE, jamais sur un drapeau : deux champs qui
 *  disent la même chose finissent par se contredire. */
export const estDoubleQcm = (item) => item?.type === 'double-qcm';

function refusDuDoubleQcm(item, ou) {
  const r = [];
  const liste = item.justifications ?? [];
  if (!estDoubleQcm(item)) {
    if (liste.length) {
      refus(r, 'JUSTIFICATIONS_HORS_DOUBLE_QCM', `${ou} : des justifications sur un item de type « ${item.type} ». Le double QCM est la porte, pas le volume — et un item qui en porte sans en être un fausse le comptage.`);
    }
    return r;
  }
  if (liste.length < 2) {
    refus(r, 'DOUBLE_QCM_SANS_JUSTIFICATIONS', `${ou} : un double QCM demande au moins deux justifications — c'est ce qui sépare « il a coché juste » de « il a compris ».`);
    return r;
  }
  for (const j of liste) {
    if (!PROVENANCES.includes(j?.provenance)) {
      refus(r, 'JUSTIFICATION_SANS_PROVENANCE', `${ou} : justification « ${j?.id ?? '?'} » sans \`provenance\` typée (${PROVENANCES.join(' | ')}).`);
    }
    if (j?.provenance === 'reformulee' && !String(j.deriveDe ?? '').trim()) {
      refus(r, 'JUSTIFICATION_REFORMULEE_SANS_SOURCE', `${ou} : justification « ${j.id} » \`reformulee\` sans \`deriveDe\` — une conception erronée n'est pas protégeable, mais sa provenance se cite.`);
    }
  }
  if (!liste.some((j) => j?.juste === true)) {
    refus(r, 'DOUBLE_QCM_SANS_JUSTIFICATION_JUSTE', `${ou} : aucune justification juste — le juste/juste, qui est la seule réussite du format, serait inatteignable.`);
  }
  if (!liste.some((j) => j?.juste === false)) {
    refus(r, 'DOUBLE_QCM_SANS_JUSTIFICATION_FAUSSE', `${ou} : aucune justification fausse — l'élève ne peut pas produire un juste/faux, donc le format ne diagnostique rien.`);
  }
  return r;
}

/**
 * La condition de validité, DÉRIVÉE de la `situation` et non d'un drapeau.
 *
 * C'est la donnée la plus utile que la didactique fournisse : un exercice ne
 * teste l'adhérence force-vitesse que s'il place force et vitesse en
 * incompatibilité. Une chute libre simple ne mesure rien ; la phase de montée
 * d'un lancer vertical, oui. La v1 en faisait une case à cocher qui se vérifie
 * elle-même, sur le point que la charte présente comme le plus utile du dossier.
 */
function refusDuPiege(item, sf, pieges, ou) {
  const r = [];
  if (!item.piege) {
    if (item.dispositifServi) {
      refus(r, 'DISPOSITIF_ETRANGER_AU_PIEGE', `${ou} : \`dispositifServi\` sans \`piege\`.`);
    }
    if (item.estFormatDiagnostique === true) {
      refus(r, 'FORMAT_DIAGNOSTIQUE_SANS_PIEGE', `${ou} : \`estFormatDiagnostique\` sur un item qui ne vise aucun piège — le format diagnostique est celui d'un piège, il n'existe pas dans l'absolu.`);
    }
    return r;
  }
  const piege = pieges[item.piege];
  if (!piege) {
    refus(r, 'PIEGE_INCONNU', `${ou} : \`piege\` « ${item.piege} » absent du catalogue.`);
    return r;
  }
  if (sf && !sf.pieges.includes(item.piege)) {
    refus(r, 'PIEGE_INCONNU', `${ou} : le savoir-faire « ${sf.id} » ne déclare pas le piège « ${item.piege} » — l'item viserait une conception que le suivi n'attribue pas à ce savoir-faire.`);
  }

  // `apresReponsePiege` LÈVE sur un dispositif étranger. Le refuser ici, c'est
  // transformer une exception à l'exécution en faute d'auteur au build.
  if (item.dispositifServi) {
    // La liste des dispositifs est celle de `srs.js`, jamais reconstruite ici :
    // c'est `apresReponsePiege` qui LÈVE sur un dispositif étranger, et un
    // contrôle qui referait sa propre liste contrôlerait autre chose que ce qui
    // lèvera devant l'élève.
    const connus = dispositifsDeReconfrontation(piege).map((d) => d.id);
    if (!connus.includes(item.dispositifServi)) {
      refus(r, 'DISPOSITIF_ETRANGER_AU_PIEGE', `${ou} : dispositif « ${item.dispositifServi} » étranger au piège « ${piege.id} ». Le compter comme servi refermerait son cycle de variation trop tôt.`);
    }
  }

  if (item.estFormatDiagnostique === true && !String(item.motifFormatDiagnostique ?? '').trim()) {
    refus(r, 'FORMAT_DIAGNOSTIQUE_SANS_MOTIF', `${ou} : \`estFormatDiagnostique\` sans motif écrit. Le \`formatDiagnostique\` du piège est de la prose — aucun programme ne peut vérifier qu'un item la respecte, seul un auteur le peut, et il l'écrit.`);
  }

  const condition = lireConditionDeValidite(piege.conditionValidite);
  if (condition) {
    if (!estObjet(item.situation)) {
      refus(r, 'SITUATION_ABSENTE', `${ou} : le piège « ${piege.id} » porte une condition de validité${condition.champs ? ` sur { ${condition.champs.join(', ')} }` : ''} et l'item ne déclare aucune \`situation\`.`);
    } else {
      const manquants = (condition.champs ?? []).filter((c) => item.situation[c] === undefined);
      if (manquants.length) {
        refus(r, 'SITUATION_ABSENTE', `${ou} : \`situation\` sans ${manquants.map((m) => `\`${m}\``).join(', ')} — le prédicat ne peut pas être évalué.`);
      } else if (condition.evaluer(item.situation) !== true) {
        refus(r, 'CONDITION_DE_VALIDITE_NON_SATISFAITE', `${ou} : ${condition.enClair}`);
      }
    }
  }

  return r;
}

/**
 * Le fil « énergie » : le système est TOUJOURS fourni et délimité par l'énoncé.
 *
 * Délimiter est précisément le geste que le diagnostic fondateur désigne comme
 * le lieu de l'erreur ; le laisser à l'élève reviendrait à évaluer, sous le nom
 * de bilan énergétique, la conception qu'on soigne.
 *
 * ⚠ Ce contrôle vivait DANS `refusDuPiege`, après son `if (!item.piege) return`.
 * Or les quatre savoir-faire du fil « énergie » portent tous
 * `diagnostic: 'absent'` — c'est la décision même de la charte, « zéro piège
 * d'énergie n'est écrit » — donc aucun item d'énergie ne porte de `piege`, donc
 * la fonction sortait TOUJOURS avant d'y arriver. La seule contrainte de contenu
 * opposable que la charte écrive pour l'énergie était du code mort : elle ne
 * pouvait se déclencher sur aucun item, et le drapeau `frontiereDeSystemeObligatoire`
 * posé sur un savoir-faire n'y changeait rien. Un invariant qui ne s'exécute
 * jamais rend exactement le même verdict qu'un invariant qui passe toujours.
 *
 * ⚠ Et la PORTÉE est dérivée du fil, pas d'un drapeau posé savoir-faire par
 * savoir-faire. La charte écrit « le contrôle refuse UN ITEM D'ÉNERGIE » ;
 * filtrer sur le seul `frontiereDeSystemeObligatoire` aurait réduit la règle à
 * UN savoir-faire sur les quatre du fil — celui où l'auteur avait pensé à écrire
 * le drapeau — et un cinquième savoir-faire d'énergie ajouté demain y aurait
 * échappé sans une ligne. « Distinguer une source, un transfert et une
 * conversion » n'a pas moins besoin d'une frontière : un transfert n'est défini
 * que par rapport à elle. Le drapeau reste lu pour ÉLARGIR la règle hors du fil,
 * jamais pour la restreindre à l'intérieur.
 */
function refusDeLaFrontiereDeSysteme(item, sf, ou) {
  const r = [];
  if (!(sf?.filTransversal === 'energie' || sf?.frontiereDeSystemeObligatoire)) return r;
  if (!FRONTIERES_DE_SYSTEME.includes(item.situation?.systeme)) {
    refus(r, 'FRONTIERE_DE_SYSTEME_ABSENTE', `${ou} : item d'énergie dont la \`situation\` ne déclare pas sa frontière de système (${FRONTIERES_DE_SYSTEME.join(' | ')}).`);
  }
  return r;
}

/**
 * La condition de validité, sous les TROIS formes que le catalogue emploie.
 *
 * Les six familles de pièges ont été écrites en parallèle et n'ont pas convergé
 * sur la forme de ce champ — c'est le même mode de panne que le vocabulaire
 * d'état de `srs.js` et `seance.js`, un cran plus bas :
 *
 *   · `{ champs: [...], predicat: '<source JS>' }`      — 8 pièges ;
 *   · `(situation) => boolean`, la fonction nue         — 9 pièges ;
 *   · `{ situation: '<type en prose>', predicat: fn }`  — 14 pièges.
 *
 * Les trois sont exécutables, et c'est ce qui compte : la condition est DÉRIVÉE
 * de l'objet `situation`, jamais d'un drapeau. Ce lecteur les normalise en un
 * seul contrat plutôt que de n'en reconnaître qu'une — ne lire que la première
 * aurait laissé 23 pièges sur 31 sans aucune condition évaluée, et le contrôle
 * n'aurait rien dit : une condition qu'on ne sait pas lire est une condition
 * toujours satisfaite.
 *
 * `champs` reste facultatif : quand le catalogue le donne, il produit un refus
 * précis (« il manque `systeme` ») au lieu du refus générique ; quand il ne le
 * donne pas, seul le verdict du prédicat est disponible.
 */
export function lireConditionDeValidite(condition) {
  if (typeof condition === 'function') {
    return { champs: null, enClair: 'la situation ne satisfait pas la condition de validité du piège', evaluer: sansLever(condition) };
  }
  if (!estObjet(condition)) return null;
  const enClair = condition.enClair ?? condition.pourquoi ?? String(condition.predicat ?? '');
  const champs = Array.isArray(condition.champs) ? condition.champs : null;

  if (typeof condition.predicat === 'function') {
    return { champs, enClair, evaluer: sansLever(condition.predicat) };
  }
  if (typeof condition.predicat === 'string' && condition.predicat.trim()) {
    // La source est évaluée dans une fonction dont les seuls noms visibles sont
    // les clés de la situation : rien du corpus n'est saisi par un élève, et un
    // prédicat qui référencerait autre chose lèvera plutôt que de lire une
    // variable d'environnement.
    const source = condition.predicat;
    return {
      champs,
      enClair,
      evaluer: (situation) => {
        const noms = Object.keys(situation);
        try {
          // eslint-disable-next-line no-new-func
          const f = new Function(...noms, `"use strict"; return (${source});`);
          return f(...noms.map((n) => situation[n])) === true;
        } catch {
          return false;
        }
      },
    };
  }
  return null;
}

/** Un prédicat de contenu qui lève sur une situation mal formée dit « non »,
 *  jamais « boum » : le contrôleur doit rendre la liste des fautes, pas la
 *  première pile d'appels. */
const sansLever = (predicat) => (situation) => {
  try {
    return predicat(situation) === true;
  } catch {
    return false;
  }
};

/**
 * Les deux items de discrimination mathématique.
 *
 * « Encore faut-il savoir LAQUELLE des deux a échoué » : un item où la relation
 * est donnée et où seul le geste mathématique reste, et un item où le geste est
 * trivial et où seul le choix de la relation compte. La trivialité du second
 * n'est pas un adjectif — elle est dérivée de la chaîne de calcul : une seule
 * opération, littéraux entiers de valeur absolue inférieure à 100. Faire
 * confiance à l'auteur sur ce point suffirait à rendre le croisement muet.
 */
function refusDeLaDiscrimination(item, sf, ou) {
  const r = [];
  if (!item.discriminationMaths) return r;
  if (sf && !sf.prerequisMaths) {
    refus(r, 'DISCRIMINATION_SANS_PREREQUIS', `${ou} : rôle de discrimination sur « ${sf.id} », qui ne déclare aucun prérequis mathématique — il n'y a alors rien à séparer.`);
  }
  if (item.discriminationMaths !== 'choix-de-relation') return r;
  if (!item.calcul) {
    refus(r, 'DISCRIMINATION_TROP_COMPLEXE', `${ou} : item « choix de relation » sans chaîne de calcul — la trivialité du geste est dérivée de la chaîne, pas déclarée.`);
    return r;
  }
  const operations = (item.calcul.etapes ?? []).reduce((n, e) => n + compterOperations(e.expr), 0);
  if (operations > 1) {
    refus(r, 'DISCRIMINATION_TROP_COMPLEXE', `${ou} : item « choix de relation » à ${operations} opérations — au-delà d'une, l'échec ne dit plus si c'est la relation ou le calcul qui a cédé.`);
  }
  for (const etape of item.calcul.etapes ?? []) {
    const { jetons = [] } = decouper(etape.expr);
    for (const j of jetons) {
      if (!/^\d/.test(j) && !j.startsWith('[')) continue;
      const v = litteralRationnel(j);
      if (v && (v.d !== 1n || (v.n < 0n ? -v.n : v.n) >= 100n)) {
        refus(r, 'DISCRIMINATION_TROP_COMPLEXE', `${ou} : littéral « ${j} » non entier ou de valeur absolue ≥ 100 dans un item « choix de relation ».`);
      }
    }
  }
  return r;
}

/** Le coût d'un item, relayé depuis `seance.js` : une seule table de coûts. */
export const coutDeLItem = (item) => COUTS[item?.type] ?? 0;
