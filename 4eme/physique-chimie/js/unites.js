// Algèbre des unités — ce qui permet de dire « ta valeur est juste, ton unité
// est fausse », et surtout « ce que tu as écrit n'est pas une masse volumique,
// c'est une masse ».
//
// Sans ce module, `g/cm³`, `g·cm⁻³` et `g/mL` sont trois réponses différentes,
// et l'élève qui répond 2 700 kg/m³ à une question posée en g/cm³ est compté
// faux alors qu'il a raison. C'est le retour le plus utile du moteur et celui
// qu'aucune plateforme du benchmark ne donne.
//
// ── Pourquoi des rationnels et pas des flottants ────────────────────────────
//
// La charte maths pouvait s'en passer : tout y est entier. Ici, non — 2,7 g/cm³,
// un facteur 1/1000 de conversion, une masse volumique quotient de deux mesures.
// Or 0.1 + 0.2 vaut 0.30000000000000004, et (1/100)**3 ne vaut pas exactement
// 1e-6 : une comparaison de valeurs physiques faite en flottants finirait par
// valider une correction fausse, ou par refuser une réponse juste. Tous les
// facteurs de conversion sont donc des fractions d'entiers, et l'arithmétique
// est en BigInt. `rationnel(0.5)` LÈVE, et c'est voulu : un littéral flottant
// dans le contenu doit exploser au contrôle, pas glisser en silence.
//
// ── Pourquoi on refuse plutôt que d'approcher ───────────────────────────────
//
// Tout ce qui sort du cadre renvoie un code explicite. Un cas non prévu — un
// symbole que le lexique ne connaît pas, un exposant à deux chiffres, une
// température dans un quotient — doit rester DISTINGUABLE d'une réponse fausse.
// C'est le quatrième verdict de la charte : `UNITE_NON_RECONNUE` n'est ni juste
// ni faux, ne consomme pas d'essai, et redemande.
//
// Module ES pur : ni DOM, ni dépendance. Il se charge sous node comme dans le
// navigateur — c'est ce qui rend le contrôle de contenu possible hors ligne.

// ════════════════════════════════════════════════════════════════════════════
// Arithmétique rationnelle exacte
// ════════════════════════════════════════════════════════════════════════════

const valeurAbsolue = (x) => (x < 0n ? -x : x);

const pgcd = (a, b) => {
  let x = valeurAbsolue(a);
  let y = valeurAbsolue(b);
  while (y) [x, y] = [y, x % y];
  return x;
};

/**
 * Un rationnel exact, sous forme irréductible et de dénominateur positif.
 *
 * Les entrées passent par `BigInt()`, qui lève sur un nombre non entier : c'est
 * la barrière qui interdit à un flottant d'entrer dans l'algèbre. Un auteur qui
 * écrit `rationnel(0.001)` au lieu de `rationnel(1, 1000)` l'apprend au build.
 */
export function rationnel(numerateur, denominateur = 1) {
  let n = BigInt(numerateur);
  let d = BigInt(denominateur);
  if (d === 0n) throw new Error('rationnel : dénominateur nul');
  if (d < 0n) { n = -n; d = -d; }
  const g = pgcd(n, d) || 1n;
  return { n: n / g, d: d / g };
}

const ZERO = rationnel(0);
const UN = rationnel(1);
const DIX = rationnel(10);

const multiplier = (a, b) => rationnel(a.n * b.n, a.d * b.d);
const additionner = (a, b) => rationnel(a.n * b.d + b.n * a.d, a.d * b.d);
const soustraire = (a, b) => additionner(a, { n: -b.n, d: b.d });
const absolu = (a) => ({ n: valeurAbsolue(a.n), d: a.d });

/** −1, 0 ou 1. Le dénominateur étant toujours positif, le produit en croix suffit. */
const comparer = (a, b) => {
  const g = a.n * b.d - b.n * a.d;
  return g < 0n ? -1 : g > 0n ? 1 : 0;
};

/** Exposant entier, négatif compris — c'est ce qui donne cm⁻³ son facteur exact. */
function puissance(r, exposant) {
  if (exposant === 0) return UN;
  const base = exposant < 0 ? rationnel(r.d, r.n) : r;
  const k = BigInt(Math.abs(exposant));
  return rationnel(base.n ** k, base.d ** k);
}

/** Deux rationnels irréductibles sont égaux ssi leurs deux termes le sont. */
export const rationnelsEgaux = (a, b) => a.n === b.n && a.d === b.d;

// L'arithmétique exacte est ouverte à `js/item.js`, qui rejoue les chaînes de
// calcul de la classe A. Elle n'est pas dupliquée là-bas, et c'est la règle du
// projet : un contrôle qui referait sa propre arithmétique contrôlerait autre
// chose que ce que le moteur exécute. Deux implémentations de rationnels
// diffèrent toujours quelque part, et ce quelque part est silencieux.
export {
  multiplier, additionner, soustraire, puissance,
  comparer as comparerRationnels, absolu as valeurAbsolueRationnelle,
};

/** Pour les journaux et les messages. Jamais pour comparer. */
export const rationnelVersTexte = (r) => (r.d === 1n ? `${r.n}` : `${r.n}/${r.d}`);

// Les espaces qu'un clavier de téléphone ou un copier-coller peut produire dans
// un nombre : espace ordinaire, insécable, fine insécable, fine. La charte les
// déclare ignorées — c'est le séparateur de milliers français.
const ESPACES = /[\s   ]/g;

const INDICES_HAUTS = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-' };
const exposantDepuisIndices = (bloc) => `^${[...bloc].map((c) => INDICES_HAUTS[c]).join('')}`;

/**
 * Un nombre écrit par un élève (ou par un auteur), rendu en rationnel EXACT.
 *
 * `2,7` devient 27/10, pas 2.7000000000000002. La virgule décimale et les
 * espaces de milliers sont des variantes déclarées du lexique élève : le
 * séparateur décimal est la première cause de faux négatifs d'un exerciseur
 * français, et se tromper là coûte plus cher que tout le reste du module.
 *
 * `null` si l'écriture n'est pas lisible — l'appelant redemande, il ne compte
 * pas faux.
 */
export function rationnelDepuisTexte(saisie) {
  let s = String(saisie ?? '')
    .replace(ESPACES, '')
    .replace(/[−–—]/g, '-')
    .replace(/,/g, '.');
  if (!s) return null;

  // Les puissances de dix, dans les écritures du chapitre 11 : 3,0×10⁸,
  // 3,0×10^8, 3.0e8. On les ramène toutes à la forme `…e8`.
  s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, exposantDepuisIndices);
  s = s.replace(/[×x*·]?10\^(-?\d+)/g, 'e$1');
  if (s.startsWith('e')) s = `1${s}`;

  const m = /^([+-]?)(\d+)(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/.exec(s);
  if (!m) return null;
  const [, signe, entier, decimales = '', exposant = '0'] = m;
  const mantisse = rationnel(
    (signe === '-' ? -1n : 1n) * BigInt(entier + decimales),
    10n ** BigInt(decimales.length),
  );
  return multiplier(mantisse, puissance(DIX, Number(exposant)));
}

/**
 * L'exposant décimal e tel que 10^e ≤ |x| < 10^(e+1), calculé exactement.
 *
 * `Math.log10` répondrait, et répondrait faux sur les bords : log10(1000) vaut
 * 2.9999999999999996 selon la route de calcul, ce qui rangerait 1000 dans les
 * centaines. Or c'est exactement la comparaison que fait la sémantique
 * « ordre de grandeur ». On boucle donc sur des entiers.
 */
function exposantDecimal(r) {
  if (r.n === 0n) return null;
  let n = valeurAbsolue(r.n);
  let d = r.d;
  let e = 0;
  while (n >= 10n * d) { d *= 10n; e += 1; }
  while (n < d) { n *= 10n; e -= 1; }
  return e;
}

// ════════════════════════════════════════════════════════════════════════════
// Le lexique
// ════════════════════════════════════════════════════════════════════════════

/** La base dimensionnelle : masse, longueur, temps, intensité, température. */
const dim = (M = 0, L = 0, T = 0, I = 0, Th = 0) => [M, L, T, I, Th];

const DIMENSION_NULLE = dim();

/**
 * Le lexique AUTEUR : liste blanche fermée. Toute unité écrite dans le contenu
 * hors de cette table est une erreur d'énoncé refusée au build (invariant 8).
 *
 * `facteur` est la valeur du symbole dans l'unité SI cohérente de sa dimension,
 * en rationnel exact. `prefixable` autorise les préfixes SI à l'étendre — les
 * formes déjà préfixées de la liste blanche (kg, cm, mL, kJ…) sont marquées
 * false, sinon `kkg` et `mmm` deviendraient lexables.
 *
 * Les identités exactes sont DÉCLARÉES ici, pas dérivées d'un calcul flottant :
 * L ≡ dm³ (1/1000 m³) et mL ≡ cm³ (1/1000000 m³). C'est ce qui fait que g/mL et
 * g/cm³ se réduisent au même couple, donc sont la même unité, point final.
 */
const SYMBOLES = new Map(Object.entries({
  // ── Masse ──
  kg:  { dim: dim(1), facteur: rationnel(1) },
  g:   { dim: dim(1), facteur: rationnel(1, 1000), prefixable: true },
  t:   { dim: dim(1), facteur: rationnel(1000) },
  // ── Longueur ──
  m:   { dim: dim(0, 1), facteur: rationnel(1), prefixable: true },
  dm:  { dim: dim(0, 1), facteur: rationnel(1, 10) },
  cm:  { dim: dim(0, 1), facteur: rationnel(1, 100) },
  mm:  { dim: dim(0, 1), facteur: rationnel(1, 1000) },
  km:  { dim: dim(0, 1), facteur: rationnel(1000) },
  // L'année-lumière vaut exactement 9 460 730 472 580 800 m (année julienne de
  // 365,25 jours × c). L'unité astronomique vaut exactement 149 597 870 700 m
  // depuis la résolution B2 de l'UAI (2012). Les deux sont des ENTIERS : les
  // distances astronomiques du chapitre 11 restent donc dans l'exigence de
  // rationnels exacts, contrairement à ce qu'on pourrait craindre.
  al:  { dim: dim(0, 1), facteur: rationnel('9460730472580800') },
  ua:  { dim: dim(0, 1), facteur: rationnel('149597870700') },
  // ── Volume ──
  L:   { dim: dim(0, 3), facteur: rationnel(1, 1000), prefixable: true },
  mL:  { dim: dim(0, 3), facteur: rationnel(1, 1000000) },
  // ── Durée ──
  s:   { dim: dim(0, 0, 1), facteur: rationnel(1), prefixable: true },
  min: { dim: dim(0, 0, 1), facteur: rationnel(60) },
  h:   { dim: dim(0, 0, 1), facteur: rationnel(3600) },
  // ── Électricité ──
  A:   { dim: dim(0, 0, 0, 1), facteur: rationnel(1), prefixable: true },
  mA:  { dim: dim(0, 0, 0, 1), facteur: rationnel(1, 1000) },
  V:   { dim: dim(1, 2, -3, -1), facteur: rationnel(1), prefixable: true },
  mV:  { dim: dim(1, 2, -3, -1), facteur: rationnel(1, 1000) },
  // ── Énergie et force ──
  J:   { dim: dim(1, 2, -2), facteur: rationnel(1), prefixable: true },
  kJ:  { dim: dim(1, 2, -2), facteur: rationnel(1000) },
  Wh:  { dim: dim(1, 2, -2), facteur: rationnel(3600), prefixable: true },
  kWh: { dim: dim(1, 2, -2), facteur: rationnel(3600000) },
  N:   { dim: dim(1, 1, -2), facteur: rationnel(1), prefixable: true },
  // ── Hors algèbre : voir plus bas ──
  '°C': { dim: dim(0, 0, 0, 0, 1), facteur: rationnel(1), kind: 'affine' },
}));

/** La liste blanche fermée, pour l'invariant 8. */
export const LEXIQUE_AUTEUR = Object.freeze([...SYMBOLES.keys()]);

const LONGUEUR_MAX_SYMBOLE = Math.max(...LEXIQUE_AUTEUR.map((s) => s.length));

/**
 * Les préfixes SI, triés du plus long au plus court — `da` doit être essayé
 * avant `d`, sans quoi `dam` serait lu `d` + `am` et échouerait.
 *
 * `µ` est accepté sous ses deux points de code : U+00B5 (micro, celui du pavé
 * numérique et des claviers français) et U+03BC (mu grec, celui que produisent
 * certains correcteurs). Ils sont visuellement indistinguables ; refuser l'un
 * des deux produirait un UNITE_NON_RECONNUE incompréhensible pour l'élève.
 */
const PREFIXES = [
  ['da', rationnel(10)],
  ['k', rationnel(1000)],
  ['h', rationnel(100)],
  ['d', rationnel(1, 10)],
  ['c', rationnel(1, 100)],
  ['m', rationnel(1, 1000)],
  ['µ', rationnel(1, 1000000)],
  ['μ', rationnel(1, 1000000)],
];

/**
 * Les variantes tolérées du lexique ÉLÈVE, déclarées et testables.
 *
 * Un élève de 13 ans sur un clavier de téléphone ne tape ni `³` ni `·`.
 * L'invariant 9 rejoue cette table : chaque `saisie` doit se réduire au même
 * couple (dimension, facteur) que sa forme `canonique`. Une variante déclarée
 * que l'analyseur n'accepterait pas est un refus de build.
 *
 * `kmh` est irrégulière (aucune règle générale ne l'engendre) et vit dans
 * `VARIANTES_LITTERALES`. `m3`, `cm3`, `m/s2` relèvent, elles, d'une règle
 * générale — un chiffre collé derrière un symbole est un exposant — qui couvre
 * aussi `dm3`, `mm3`, `s2` sans avoir à les énumérer. La règle est sûre parce
 * que la grammaire interdit par ailleurs tout facteur numérique : dans une
 * unité, un chiffre ne peut être qu'un exposant.
 */
export const VARIANTES_ELEVE = Object.freeze([
  { saisie: 'm3', canonique: 'm³' },
  { saisie: 'cm3', canonique: 'cm³' },
  { saisie: 'm/s2', canonique: 'm/s²' },
  { saisie: 'kmh', canonique: 'km/h' },
]);

const VARIANTES_LITTERALES = new Map([['kmh', 'km/h']]);

/** Le choix explicite « ma réponse n'a pas d'unité », par opposition au champ vide. */
export const SANS_UNITE = 'SANS_UNITE';

// ════════════════════════════════════════════════════════════════════════════
// L'analyse lexicale
// ════════════════════════════════════════════════════════════════════════════

/**
 * Plus longue correspondance sur le lexique déclaré, à cette position.
 *
 * C'est le premier palier, et il passe AVANT toute tentative préfixe + symbole
 * (charte, § algèbre des unités). Sans cet ordre, `hL` est ambigu entre
 * hecto-litre et heure-litre, et `da` entre déca et `d`+`a`.
 *
 * Conséquence assumée, qu'il vaut mieux écrire que découvrir : `ms` est lu
 * mètre-seconde et non milliseconde, `hm` heure-mètre et non hectomètre, parce
 * que `m` et `h` sont dans le lexique déclaré et gagnent au palier 1. Ce n'est
 * pas un accident, c'est la règle appliquée. L'élève qui écrit `ms` pour une
 * durée reçoit DIMENSION_FAUSSE — un verdict lisible — et la milliseconde n'est
 * attendue nulle part en 4e. Le jour où elle le serait, elle entrerait dans le
 * lexique déclaré, où le palier 1 la trouverait.
 */
function lireSymboleDeclare(texte, position) {
  const restant = texte.length - position;
  for (let n = Math.min(LONGUEUR_MAX_SYMBOLE, restant); n >= 1; n -= 1) {
    const candidat = texte.slice(position, position + n);
    const entree = SYMBOLES.get(candidat);
    if (entree) return { symbole: candidat, entree, longueur: n };
  }
  return null;
}

/**
 * Le symbole, avec repli sur préfixe + symbole préfixable.
 *
 * `autoriserPrefixes` est faux côté auteur : la liste blanche y est fermée au
 * sens strict, `µm` n'y figure pas et doit être refusé au build. Côté élève,
 * les préfixes étendent mécaniquement la liste et c'est la table ENGENDRÉE qui
 * est fermée — on reconnaît plus de l'élève qu'on n'autorise à l'auteur, et
 * c'est le bon sens de l'asymétrie.
 */
function lireSymbole(texte, position, autoriserPrefixes) {
  const direct = lireSymboleDeclare(texte, position);
  if (direct) return direct;
  if (!autoriserPrefixes) return null;

  for (const [prefixe, facteurPrefixe] of PREFIXES) {
    if (!texte.startsWith(prefixe, position)) continue;
    const racine = lireSymboleDeclare(texte, position + prefixe.length);
    if (!racine || !racine.entree.prefixable) continue;
    return {
      symbole: prefixe + racine.symbole,
      entree: {
        dim: racine.entree.dim,
        facteur: multiplier(facteurPrefixe, racine.entree.facteur),
      },
      longueur: prefixe.length + racine.longueur,
    };
  }
  return null;
}

/**
 * La grammaire de la charte, en une passe :
 *
 *     facteur   := (aucun — les facteurs numériques sont interdits)
 *     terme     := symbole exposant?
 *     exposant  := (⁻|-)? chiffre        formes : ², ⁻³, ^2, ^-3
 *
 * `g/100 mL`, usuel pour la solubilité, est refusé ici : la solubilité s'exprime
 * en g/L dans toute l'application. C'est une décision de contenu, plus simple
 * qu'une extension de grammaire.
 */
function analyserTermes(texte, autoriserPrefixes) {
  const termes = [];
  let i = 0;
  // Le début d'un côté compte comme séparé : c'est la juxtaposition INTERNE
  // qu'on traque, pas le premier symbole.
  let separeeAvant = true;
  while (i < texte.length) {
    if (texte[i] === '·') { separeeAvant = true; i += 1; continue; }

    if (/\d/.test(texte[i])) {
      return { code: 'FACTEUR_NUMERIQUE', detail: texte.slice(i) };
    }

    const lu = lireSymbole(texte, i, autoriserPrefixes);
    if (!lu) return { code: 'SYMBOLE_INCONNU', detail: texte.slice(i) };

    // Deux symboles collés ne sont pas un produit.
    //
    // La règle de plus-longue-correspondance fait lire « ms » comme
    // mètre-seconde et « mN » comme mètre-newton, la milliseconde et le
    // millinewton n'étant pas au lexique de 4e. C'est cohérent, et c'est un
    // piège : l'élève qui tape « ms » pour une durée reçoit alors « ce n'est
    // pas une durée », un message vrai et incompréhensible.
    //
    // Or personne n'écrit un produit sans séparateur. L'auteur écrit « N·m »,
    // l'élève écrit « N m » — que la normalisation ramène au même point médian.
    // Une juxtaposition nue est donc toujours l'un des deux : un symbole que
    // le lexique ne connaît pas, ou une faute de frappe. Dans les deux cas on
    // redemande, au lieu de lui répondre sur une unité qu'il n'a pas voulue.
    //
    // Aucune unité de 4e n'a besoin de cette écriture : les seuls produits du
    // programme s'écrivent avec un séparateur ou sont des symboles déclarés
    // d'un seul tenant (kWh, mA, cm).
    if (termes.length > 0 && !separeeAvant) {
      return { code: 'JUXTAPOSITION_AMBIGUE', detail: texte.slice(i - termes[termes.length - 1].longueur) };
    }
    separeeAvant = false;
    i += lu.longueur;

    let exposant = 1;
    if (texte[i] === '^') {
      const m = /^\^(-?)(\d)/.exec(texte.slice(i));
      if (!m) return { code: 'EXPOSANT_INVALIDE', detail: texte.slice(i) };
      i += m[0].length;
      // La grammaire dit « chiffre », au singulier. Un exposant à deux chiffres
      // n'est pas une écriture de 4e : c'est le signe qu'on lit autre chose
      // qu'une unité (un nombre collé, une saisie parasite). On refuse.
      if (/\d/.test(texte[i] ?? '')) return { code: 'EXPOSANT_INVALIDE', detail: texte.slice(i - m[0].length) };
      exposant = Number(m[2]) * (m[1] ? -1 : 1);
    }
    termes.push({ ...lu, exposant });
  }
  return { termes };
}

/**
 * Les écritures ramenées à la forme que le lexeur attend.
 *
 * Ce qui vaut pour les deux lexiques : indices hauts, moins exotiques, marques
 * de produit. Ce qui est réservé à l'élève : les variantes tolérées. L'auteur
 * écrit `m³` et non `m3` — sa liste blanche est fermée au sens strict — mais on
 * ne lui impose pas `·` là où une espace se lit aussi bien.
 */
function normaliser(brut, eleve) {
  const depart = eleve ? (VARIANTES_LITTERALES.get(brut) ?? brut) : brut;
  const avecExposants = depart
    .replace(/[−–—]/g, '-')
    // Les exposants en indices hauts : cm³ → cm^3, g·cm⁻³ → g·cm^-3.
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, exposantDepuisIndices);

  // Un chiffre collé derrière un symbole EST un exposant : m3, s2, m/s2. La
  // règle est sûre parce que la grammaire interdit par ailleurs tout facteur
  // numérique : dans une unité, un chiffre ne peut être qu'un exposant.
  const avecVariantes = eleve
    ? avecExposants.replace(/([A-Za-zµμ°])(\d)/g, '$1^$2')
    : avecExposants;

  return avecVariantes
    // Les marques de produit, y compris l'espace : `N m` vaut N·m. On ne
    // supprime PAS les espaces, sinon `m s` deviendrait `ms`, dont on vient de
    // dire qu'il se lit mètre-seconde — donc une réponse fausse au lieu d'une
    // réponse juste écrite avec une espace.
    .replace(/[.*×\s   ]+/g, '·');
}

/**
 * Une unité écrite, réduite au couple (vecteur de dimensions, facteur exact).
 *
 * Renvoie `{ ok: true, unite }` ou `{ ok: false, code, detail }`. Le code est
 * précis — il sert au contrôle de contenu et aux journaux — mais côté élève
 * TOUS les codes se rendent en un seul verdict, `UNITE_NON_RECONNUE`, qui ne
 * consomme pas d'essai : lui expliquer que son exposant est mal formé ne l'aide
 * pas, lui redemander d'écrire son unité autrement, si.
 */
export function analyserUnite(saisie, { lexique = 'eleve' } = {}) {
  const brut = String(saisie ?? '').trim();
  if (!brut) return { ok: false, code: 'CHAMP_VIDE', detail: '' };

  if (brut === SANS_UNITE) {
    return {
      ok: true,
      unite: {
        dim: DIMENSION_NULLE, facteur: UN, kind: 'multiplicatif',
        sansUnite: true, texte: brut, symboles: [],
      },
    };
  }

  const eleve = lexique === 'eleve';
  const texte = normaliser(brut, eleve);

  // Un seul niveau de division. `a/b/c` est ambigu (est-ce a/(b·c) ou (a/b)/c ?)
  // et aucune réponse de 4e n'en a besoin : on refuse au lieu de choisir.
  const parts = texte.split('/');
  if (parts.length > 2) return { ok: false, code: 'GRAMMAIRE_INVALIDE', detail: texte };
  if (parts.some((p) => p.replace(/·/g, '') === '')) {
    return { ok: false, code: 'GRAMMAIRE_INVALIDE', detail: texte };
  }

  const cotes = [];
  for (const part of parts) {
    const lu = analyserTermes(part, eleve);
    if (lu.code) return { ok: false, code: lu.code, detail: lu.detail };
    cotes.push(lu.termes);
  }

  const tous = cotes.flat();

  // ── Les températures sortent de l'algèbre ────────────────────────────────
  //
  // °C → K est une conversion AFFINE, pas multiplicative : le facteur de
  // conversion n'existe pas. Une unité affine ne peut donc apparaître dans
  // AUCUN produit ni quotient — sans quoi J/°C serait réduit avec un facteur
  // qui ne veut rien dire, et l'erreur serait invisible. L'interdiction est
  // structurelle plutôt que documentaire : elle est appliquée ici.
  const affine = tous.find((t) => t.entree.kind === 'affine');
  if (affine && (tous.length > 1 || affine.exposant !== 1 || cotes.length > 1)) {
    return { ok: false, code: 'AFFINE_COMPOSEE', detail: affine.symbole };
  }

  let dimensions = [...DIMENSION_NULLE];
  let facteur = UN;
  cotes.forEach((termes, cote) => {
    const signe = cote === 0 ? 1 : -1;
    for (const terme of termes) {
      const e = signe * terme.exposant;
      terme.entree.dim.forEach((v, k) => { dimensions[k] += v * e; });
      facteur = multiplier(facteur, puissance(terme.entree.facteur, e));
    }
  });

  return {
    ok: true,
    unite: {
      dim: dimensions,
      facteur,
      kind: affine ? 'affine' : 'multiplicatif',
      sansUnite: false,
      texte: brut,
      symboles: tous.map((t) => t.symbole),
    },
  };
}

/** Deux écritures qui se réduisent au même couple sont la même unité, point final. */
export const memeUnite = (a, b) => memeDimension(a, b) && rationnelsEgaux(a.facteur, b.facteur);

export const memeDimension = (a, b) => a.dim.every((v, i) => v === b.dim[i]);

// ════════════════════════════════════════════════════════════════════════════
// Nommer une dimension — le verdict le plus utile du moteur
// ════════════════════════════════════════════════════════════════════════════

const BASE = ['M', 'L', 'T', 'I', 'Θ'];

/**
 * « Ce que tu as écrit n'est pas une masse volumique, c'est une masse. »
 *
 * Cette phrase est la raison d'être du module. Elle exige de savoir nommer un
 * vecteur de dimensions ; les grandeurs du programme de 4e tiennent en une
 * quinzaine de lignes. Hors table, on rend la formule dimensionnelle plutôt
 * qu'une invention — un nom approximatif serait pire que pas de nom.
 */
const NOMS_DE_DIMENSION = new Map([
  ['0,0,0,0,0', 'un nombre sans unité'],
  ['1,0,0,0,0', 'une masse'],
  ['0,1,0,0,0', 'une longueur'],
  ['0,2,0,0,0', 'une aire'],
  ['0,3,0,0,0', 'un volume'],
  ['0,0,1,0,0', 'une durée'],
  ['0,0,0,1,0', 'une intensité électrique'],
  ['0,0,0,0,1', 'une température'],
  ['1,-3,0,0,0', 'une masse volumique'],
  ['0,1,-1,0,0', 'une vitesse'],
  ['0,1,-2,0,0', 'une accélération'],
  ['1,1,-2,0,0', 'une force'],
  ['1,2,-2,0,0', 'une énergie'],
  ['1,2,-3,0,0', 'une puissance'],
  ['1,2,-3,-1,0', 'une tension'],
  ['0,3,-1,0,0', 'un débit'],
  ['1,-1,-2,0,0', 'une pression'],
]);

export function decrireDimension(dimensions) {
  const nom = NOMS_DE_DIMENSION.get(dimensions.join(','));
  if (nom) return nom;
  const formule = dimensions
    .map((v, i) => (v === 0 ? null : v === 1 ? BASE[i] : `${BASE[i]}^${v}`))
    .filter(Boolean)
    .join('·');
  return `une grandeur en ${formule}`;
}

// ════════════════════════════════════════════════════════════════════════════
// La comparaison
// ════════════════════════════════════════════════════════════════════════════

/**
 * Les verdicts. Les quatre premiers sont ceux de la charte et ne se confondent
 * jamais ; les suivants ne sont PAS des verdicts de correction — ils disent que
 * la correction n'a pas eu lieu, et il faut pouvoir les distinguer d'un échec.
 */
export const VERDICTS = Object.freeze({
  JUSTE: 'JUSTE',
  DIMENSION_FAUSSE: 'DIMENSION_FAUSSE',
  UNITE_NON_DEMANDEE: 'UNITE_NON_DEMANDEE',
  VALEUR_FAUSSE: 'VALEUR_FAUSSE',
  UNITE_NON_RECONNUE: 'UNITE_NON_RECONNUE',
  // Le troisième temps de la comparaison (notation scientifique, arrondi). Il
  // ne peut pas être fondu dans VALEUR_FAUSSE : la valeur EST juste, seule son
  // écriture ne l'est pas, et dire « faux » à cet élève serait un mensonge.
  ECRITURE_NON_CONFORME: 'ECRITURE_NON_CONFORME',
  // L'élève n'a pas fini de répondre. Distinct de « sans unité », qui est un
  // choix, et distinct de UNITE_NON_RECONNUE, qui est une saisie illisible.
  REPONSE_INCOMPLETE: 'REPONSE_INCOMPLETE',
  // Le contenu est fautif. Inatteignable sur du contenu publié — l'invariant 8
  // le refuse au build — mais on préfère un verdict bruyant à un silence.
  CONTENU_INVALIDE: 'CONTENU_INVALIDE',
});

export const SEMANTIQUES = Object.freeze(['exacte', 'tolerante', 'ordre-de-grandeur']);

/**
 * Les trois états du champ unité.
 *
 * Sans le deuxième, on ne distingue pas l'oubli d'unité du refus légitime, et
 * tout vérificateur « l'élève a-t-il mis une unité ? » produit des faux positifs
 * sur chaque réponse adimensionnée du corpus.
 */
export function etatChampUnite(saisie) {
  const brut = String(saisie ?? '').trim();
  if (!brut) return 'vide';
  if (brut === SANS_UNITE) return 'sans-unite';
  return 'saisie';
}

/** Les écritures d'un entier exact qu'un item peut porter — jamais un flottant. */
const estEntierExact = (v) => typeof v === 'bigint'
  || Number.isInteger(v)
  || (typeof v === 'string' && /^[+-]?\d+$/.test(v));

/**
 * Un rationnel exact depuis les formes qu'un item ou un élève peuvent porter.
 *
 * `rationnel` LÈVE sur un flottant, et c'est voulu — au build. Ici, non : on est
 * dans la correction, où le contenu fautif a un verdict à lui, `CONTENU_INVALIDE`,
 * dont tout l'objet est de faire du bruit sans interrompre la séance. Un même
 * énoncé mal écrit ne peut pas rendre un verdict sous la forme `valeur: 2.7` et
 * une exception sous la forme `valeur: [2.7, 1]` : les deux écritures portent la
 * même faute d'auteur. Les formes non exactes sont donc filtrées ici, et
 * `rationnel` garde son contrat pour l'outil de contrôle qui l'appelle en direct.
 */
function versRationnel(valeur) {
  if (valeur === null || valeur === undefined) return null;
  if (typeof valeur === 'object' && !Array.isArray(valeur) && 'n' in valeur) {
    return typeof valeur.n === 'bigint' && typeof valeur.d === 'bigint' && valeur.d > 0n ? valeur : null;
  }
  if (Array.isArray(valeur)) {
    const [n, d = 1] = valeur;
    if (!estEntierExact(n) || !estEntierExact(d) || BigInt(d) === 0n) return null;
    return rationnel(n, d);
  }
  if (typeof valeur === 'number') return Number.isInteger(valeur) ? rationnel(valeur) : null;
  return rationnelDepuisTexte(valeur);
}

/**
 * Compare la réponse d'un élève à la réponse attendue.
 *
 *   reponse = { valeur: '2,7', unite: 'g/cm3' }
 *   attendu = { valeur: [27, 10] | '2,7', unite: 'g/cm³',
 *               semantique, tolerancePourcent, toleranceAbsolue, uniteImposee,
 *               ecriture }
 *
 * ── Pourquoi DEUX tolérances, et pourquoi l'absolue prime ─────────────────
 *
 * `tolerancePourcent` est une fenêtre RELATIVE, et elle ne veut rien dire autour
 * de zéro : le palier de fusion de la glace est à 0 °C, et ± 2 % de zéro vaut
 * zéro. Un élève qui lit 0,5 °C sur un axe gradué tous les 5 °C — donc à moins
 * d'une demi-graduation — serait compté faux, ce qui est exactement la panne que
 * ce module existe pour interdire.
 *
 * `toleranceAbsolue` est la fenêtre des lectures graphiques, exprimée DANS
 * L'UNITÉ ATTENDUE et convertie ici comme la valeur elle-même. Elle n'est jamais
 * saisie par un auteur : `schema.js:toleranceDeLecture` la calcule à la
 * demi-graduation de l'axe, et c'est le bénéfice collatéral de l'engendrement
 * des figures — sur les items où la tolérance est le gros du bataillon, elle
 * cesse d'être un contenu faillible. `item.js:fenetreDeTolerance` fait déjà le
 * même arbitrage côté contrôle d'auteur, et lui donne la même priorité.
 *
 * L'ORDRE des trois temps — dimension, puis valeur, puis écriture — n'est pas
 * un détail d'implémentation : l'invariant 9 refuse un verdict de valeur rendu
 * avant le verdict de dimension. Dire « ta valeur est fausse » à un élève qui a
 * répondu une masse là où on demandait une masse volumique, c'est lui cacher la
 * seule information qui lui servirait.
 */
export function comparerReponse(reponse = {}, attendu = {}) {
  // `??` serait un piège ici : `accepte: null` est une valeur SIGNIFIANTE — ni
  // juste ni faux — et `null ?? false` la remplacerait par « faux ». C'est
  // exactement la confusion que le quatrième verdict existe pour éviter.
  const rendre = (verdict, extra = {}) => ({
    verdict,
    accepte: 'accepte' in extra ? extra.accepte : verdict === VERDICTS.JUSTE,
    consommeEssai: 'consommeEssai' in extra ? extra.consommeEssai : true,
    ...extra,
  });

  // ── Temps 0 : la réponse est-elle complète ? ──────────────────────────────
  const etatUnite = etatChampUnite(reponse.unite);
  if (etatUnite === 'vide') {
    return rendre(VERDICTS.REPONSE_INCOMPLETE, {
      champ: 'unite', accepte: null, consommeEssai: false,
      message: "Il manque l'unité — ou coche « sans unité » si ta réponse n'en a pas.",
    });
  }
  const valeurEleve = versRationnel(reponse.valeur);
  if (valeurEleve === null) {
    return rendre(VERDICTS.REPONSE_INCOMPLETE, {
      champ: 'valeur', accepte: null, consommeEssai: false,
      message: 'Je ne sais pas lire ce nombre.',
    });
  }

  // ── Le contenu ───────────────────────────────────────────────────────────
  const cible = analyserUnite(attendu.unite, { lexique: 'auteur' });
  const valeurCible = versRationnel(attendu.valeur);
  const semantique = attendu.semantique ?? 'exacte';
  if (!cible.ok || valeurCible === null || !SEMANTIQUES.includes(semantique)) {
    return rendre(VERDICTS.CONTENU_INVALIDE, {
      accepte: null, consommeEssai: false,
      detail: cible.ok ? (valeurCible === null ? 'valeur attendue illisible' : `sémantique « ${semantique} » hors énuméré`) : cible.code,
    });
  }

  const lue = analyserUnite(reponse.unite, { lexique: 'eleve' });
  if (!lue.ok) {
    return rendre(VERDICTS.UNITE_NON_RECONNUE, {
      accepte: null, consommeEssai: false, detail: lue.code,
      message: "Je ne reconnais pas cette unité. Réécris-la — par exemple g/cm³ ou kg/m³.",
    });
  }

  // ── Temps 1 : la dimension ───────────────────────────────────────────────
  if (!memeDimension(lue.unite, cible.unite)) {
    return rendre(VERDICTS.DIMENSION_FAUSSE, {
      accepte: false,
      attendue: decrireDimension(cible.unite.dim),
      recue: decrireDimension(lue.unite.dim),
      message: `Ce que tu as écrit n'est pas ${decrireDimension(cible.unite.dim)}, c'est ${decrireDimension(lue.unite.dim)}.`,
    });
  }

  // Les températures se comparent dans leur unité déclarée : il n'y a pas de
  // facteur qui mène de l'une à l'autre. Le lexique ne contient que °C, donc ce
  // refus n'est pas atteignable aujourd'hui — il le deviendrait le jour où le
  // kelvin entrerait, et il vaut mieux qu'il existe avant ce jour-là.
  const affineEnJeu = lue.unite.kind === 'affine' || cible.unite.kind === 'affine';
  if (affineEnJeu && lue.unite.symboles.join('·') !== cible.unite.symboles.join('·')) {
    return rendre(VERDICTS.UNITE_NON_RECONNUE, {
      accepte: null, consommeEssai: false, detail: 'AFFINE_NON_CONVERTIBLE',
      message: `Réponds en ${cible.unite.texte}.`,
    });
  }

  // ── Temps 2 : la valeur ──────────────────────────────────────────────────
  // Ramenées à l'unité SI cohérente, sauf pour les affines qui n'ont pas de
  // conversion et qui, arrivées ici, portent la même unité de part et d'autre.
  const siEleve = affineEnJeu ? valeurEleve : multiplier(valeurEleve, lue.unite.facteur);
  const siCible = affineEnJeu ? valeurCible : multiplier(valeurCible, cible.unite.facteur);

  // La tolérance absolue est déclarée dans l'unité attendue : elle se convertit
  // par le même facteur que la valeur, sans quoi une demi-graduation en °C serait
  // comparée à un écart en unité SI cohérente.
  let margeAbsolue = null;
  if (attendu.toleranceAbsolue !== undefined && attendu.toleranceAbsolue !== null) {
    const t = versRationnel(attendu.toleranceAbsolue);
    if (t === null || comparer(t, ZERO) < 0) {
      return rendre(VERDICTS.CONTENU_INVALIDE, {
        accepte: null, consommeEssai: false, detail: 'tolérance absolue illisible ou négative',
      });
    }
    margeAbsolue = affineEnJeu ? t : multiplier(t, cible.unite.facteur);
  }

  const bonneValeur = valeurAcceptee(siEleve, siCible, semantique, attendu.tolerancePourcent, margeAbsolue);
  if (bonneValeur === null) {
    return rendre(VERDICTS.CONTENU_INVALIDE, {
      accepte: null, consommeEssai: false, detail: 'tolérance illisible ou absente',
    });
  }
  if (!bonneValeur) return rendre(VERDICTS.VALEUR_FAUSSE, { accepte: false });

  // ── Temps 3 : l'écriture ─────────────────────────────────────────────────
  const ecriture = attendu.ecriture ? verifierEcriture(reponse.valeur, attendu.ecriture) : null;
  if (ecriture) return rendre(VERDICTS.ECRITURE_NON_CONFORME, { accepte: false, ...ecriture });

  // ── L'unité équivalente non demandée ─────────────────────────────────────
  //
  // Elle est ACCEPTÉE et signalée : partout ailleurs que dans les trois cas où
  // la conversion est le savoir-faire lui-même (g/cm³ ↔ kg/m³, m/s ↔ km/h,
  // J ↔ kWh), refuser une unité équivalente punit un élève qui a raison.
  if (!memeUnite(lue.unite, cible.unite)) {
    const impose = attendu.uniteImposee === true;
    return rendre(VERDICTS.UNITE_NON_DEMANDEE, {
      accepte: !impose,
      motif: impose ? 'unite-imposee' : null,
      message: impose
        ? `On demandait des ${cible.unite.texte} : c'est justement la conversion qu'on travaille ici.`
        : `Juste — on demandait des ${cible.unite.texte}, tu as répondu en ${lue.unite.texte}.`,
    });
  }

  return rendre(VERDICTS.JUSTE, { accepte: true });
}

/**
 * Les trois sémantiques déclarées par l'item.
 *
 * `null` quand le contenu ne permet pas de trancher (tolérance manquante) —
 * plutôt que de retomber silencieusement sur l'égalité exacte, ce qui compterait
 * faux des réponses que l'auteur voulait accepter.
 */
function valeurAcceptee(eleve, cible, semantique, tolerancePourcent, margeAbsolue = null) {
  if (semantique === 'exacte') return rationnelsEgaux(eleve, cible);

  if (semantique === 'tolerante') {
    // L'absolue prime : c'est la demi-graduation d'une lecture graphique,
    // calculée et non saisie, et la seule qui ait un sens autour de zéro.
    if (margeAbsolue !== null) {
      return comparer(absolu(soustraire(eleve, cible)), margeAbsolue) <= 0;
    }
    const p = versRationnel(tolerancePourcent);
    if (p === null || comparer(p, ZERO) < 0) return null;
    // |v − a| ≤ |a| × p/100, tout en rationnels : une fenêtre à ± 2 % calculée
    // en flottants exclut ou inclut les bornes selon l'humeur de l'arrondi.
    const ecart = absolu(soustraire(eleve, cible));
    const fenetre = multiplier(absolu(cible), rationnel(p.n, p.d * 100n));
    return comparer(ecart, fenetre) <= 0;
  }

  // Ordre de grandeur : même puissance de dix, une fois ramenés en SI.
  const ee = exposantDecimal(eleve);
  const ec = exposantDecimal(cible);
  if (ee === null || ec === null) return ee === ec; // zéro ne vaut que zéro
  return ee === ec;
}

/**
 * Le troisième temps : l'écriture, quand l'item la demande.
 *
 * Il porte sur la CHAÎNE saisie et non sur sa valeur — c'est tout son objet :
 * 300 000 000 et 3×10⁸ ont la même valeur, et l'item du chapitre 11 qui demande
 * la notation scientifique demande précisément l'autre écriture.
 */
export function verifierEcriture(saisie, ecriture = {}) {
  const s = String(saisie ?? '').replace(ESPACES, '').replace(/,/g, '.');

  if (ecriture.notationScientifique) {
    const m = /^[+-]?(\d)(?:\.\d+)?(?:[eE][+-]?\d+|[×x*·]10\^?-?\d+|[×x*·]10[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+)$/.exec(s);
    if (!m || m[1] === '0') {
      return { code: 'NOTATION_SCIENTIFIQUE_ATTENDUE', message: 'Écris ta réponse en notation scientifique, par exemple 3,0×10⁸.' };
    }
  }

  if (Number.isInteger(ecriture.decimales)) {
    const mantisse = s.split(/[eE×x*·]/)[0];
    const obtenues = mantisse.includes('.') ? mantisse.split('.')[1].length : 0;
    if (obtenues !== ecriture.decimales) {
      return { code: 'ARRONDI_NON_CONFORME', message: `On demandait ${ecriture.decimales} chiffre(s) après la virgule.` };
    }
  }

  return null;
}

/**
 * Le verdict traduit en `issue` au sens de la charte, pour le SRS.
 *
 * C'est ici que se joue l'invariant 9 : une saisie non reconnue ne doit JAMAIS
 * devenir un échec. `null` signifie qu'il n'y a rien à comptabiliser du tout —
 * ni réussite, ni échec, ni essai consommé.
 */
export function issueDepuisVerdict(resultat) {
  switch (resultat.verdict) {
    case VERDICTS.JUSTE:
      return 'reussite';
    case VERDICTS.UNITE_NON_DEMANDEE:
      return resultat.accepte ? 'reussite' : 'echec';
    case VERDICTS.DIMENSION_FAUSSE:
    case VERDICTS.VALEUR_FAUSSE:
    case VERDICTS.ECRITURE_NON_CONFORME:
      return 'echec';
    case VERDICTS.UNITE_NON_RECONNUE:
      return 'unite-non-reconnue';
    default:
      return null;
  }
}

// ════════════════════════════════════════════════════════════════════════════
// Le contrôle côté auteur — invariant 8
// ════════════════════════════════════════════════════════════════════════════

/**
 * Ce que l'invariant 8 refuse, en une fonction destinée à
 * `tools/verifier-contenu.mjs`. Renvoie la liste des anomalies ; vide = conforme.
 *
 * Elle est ici plutôt que dans l'outil de contrôle pour la raison qui vaut dans
 * tout le projet : le lexique et l'analyseur vivent ici, et un contrôle qui
 * réimplémenterait sa propre lecture des unités contrôlerait autre chose que ce
 * que le moteur exécute.
 */
export function controlerUniteAuteur(saisie) {
  const brut = String(saisie ?? '').trim();
  if (!brut) return [{ code: 'CHAMP_UNITE_ABSENT', message: "Aucune unité déclarée, et l'état « sans unité » n'est pas posé." }];
  if (brut === SANS_UNITE) return [];

  const lue = analyserUnite(brut, { lexique: 'auteur' });
  if (lue.ok) return [];

  const messages = {
    SYMBOLE_INCONNU: `« ${lue.detail} » est hors du lexique auteur (${LEXIQUE_AUTEUR.join(', ')}).`,
    FACTEUR_NUMERIQUE: `Facteur numérique « ${lue.detail} » dans une unité : g/100 mL est refusé, la solubilité s'écrit g/L.`,
    AFFINE_COMPOSEE: `« ${lue.detail} » est une unité affine : elle ne peut apparaître dans aucun produit ni quotient.`,
    EXPOSANT_INVALIDE: `Exposant hors grammaire : « ${lue.detail} ».`,
    GRAMMAIRE_INVALIDE: `Écriture d'unité hors grammaire : « ${brut} ».`,
  };
  return [{ code: lue.code, message: messages[lue.code] ?? `Unité refusée : « ${brut} ».` }];
}

/**
 * Le même contrôle, au niveau de l'item et du savoir-faire qui le porte.
 *
 *   item        = { reponse: { unite } }        `unite` vaut SANS_UNITE ou une écriture
 *   savoirFaire = { unite: 'libre'|'imposee', motifUniteImposee }
 *
 * Les deux clauses « un item à réponse dimensionnée sans champ unité » et « un
 * item à réponse adimensionnée sans l'état sans-unité » se contrôlent d'un seul
 * geste : le champ est obligatoire dans les deux cas, et il vaut SANS_UNITE dans
 * le second. Un champ absent ne permet justement pas de savoir dans lequel des
 * deux cas on est — c'est exactement pour cela qu'il est refusé.
 */
export function controlerItemAuteur(item = {}, savoirFaire = {}) {
  const anomalies = controlerUniteAuteur(item?.reponse?.unite);

  if (savoirFaire.unite === 'imposee' && !String(savoirFaire.motifUniteImposee ?? '').trim()) {
    anomalies.push({
      code: 'MOTIF_UNITE_IMPOSEE_ABSENT',
      message: "unite: 'imposee' exige un motif écrit — le seul recevable est que la conversion soit le savoir-faire lui-même.",
    });
  }
  if (savoirFaire.unite !== undefined && !['libre', 'imposee'].includes(savoirFaire.unite)) {
    anomalies.push({ code: 'UNITE_HORS_ENUMERE', message: `unite: « ${savoirFaire.unite} » hors énuméré (libre | imposee).` });
  }

  return anomalies;
}
