// Le calcul exact : des fractions, jamais des flottants.
//
// L'épreuve blanche et « Entraîne-moi » posent des calculs comme ceux de la
// feuille d'Evan : priorités, relatifs, fractions, puissances, puissances de
// 10. La réponse attendue n'est jamais écrite à la main ni demandée à Merlin :
// elle est CALCULÉE ici, à partir du calcul affiché. Et c'est le même arbre
// qui sert à afficher le calcul et à le calculer : ce qui est montré à
// l'élève est forcément ce qui a été calculé.
//
// En fractions de BigInt : 0,1 + 0,2 vaut 3/10 et pas 0,30000000000000004,
// et 36 × 10⁻² × 45 × 10⁷ ne déborde pas.
//
// Ce fichier ne touche ni à la page ni au réseau : il se teste sous node.

const abs = (a) => (a < 0n ? -a : a);
function pgcd(a, b) {
  let [x, y] = [abs(a), abs(b)];
  while (y) [x, y] = [y, x % y];
  return x;
}

/** Une fraction irréductible, dénominateur positif. */
export function fraction(n, d = 1n) {
  let [a, b] = [BigInt(n), BigInt(d)];
  if (b === 0n) throw new Error('division par zéro');
  if (b < 0n) [a, b] = [-a, -b];
  const g = pgcd(a, b) || 1n;
  return { n: a / g, d: b / g };
}

export const plus = (a, b) => fraction(a.n * b.d + b.n * a.d, a.d * b.d);
export const moins = (a, b) => fraction(a.n * b.d - b.n * a.d, a.d * b.d);
export const fois = (a, b) => fraction(a.n * b.n, a.d * b.d);
export function divise(a, b) {
  if (b.n === 0n) throw new Error('division par zéro');
  return fraction(a.n * b.d, a.d * b.n);
}
/** Le plus grand exposant calculé : au-delà, les nombres n'ont plus de sens au collège. */
export const EXPOSANT_MAX = 20;

function puissance(a, e) {
  if (!Number.isInteger(e) || Math.abs(e) > EXPOSANT_MAX) throw new Error('exposant hors de portée');
  if (e === 0 && a.n === 0n) throw new Error('0⁰ n\'a pas de valeur au collège');
  if (e >= 0) return fraction(a.n ** BigInt(e), a.d ** BigInt(e));
  if (a.n === 0n) throw new Error('division par zéro');
  return fraction(a.d ** BigInt(-e), a.n ** BigInt(-e));
}
function racineEntiere(x) {
  if (x < 2n) return x;
  let y = BigInt(Math.floor(Math.sqrt(Number(x))));
  while (y * y > x) y -= 1n;
  while ((y + 1n) * (y + 1n) <= x) y += 1n;
  return y;
}
function racine(a) {
  if (a.n < 0n) throw new Error('racine d\'un nombre négatif');
  const [n, d] = [racineEntiere(a.n), racineEntiere(a.d)];
  // Au collège, √144 = 12 ; √2 n'a pas de valeur exacte à taper.
  if (n * n !== a.n || d * d !== a.d) throw new Error('racine carrée non exacte');
  return fraction(n, d);
}

export const egales = (a, b) => a.n === b.n && a.d === b.d;
export const enNombre = (a) => Number(a.n) / Number(a.d);
export const estIrreductible = (n, d) => pgcd(BigInt(n), BigInt(d)) === 1n;

/** Combien de chiffres après la virgule, ou null si l'écriture décimale ne s'arrête pas. */
export function decimales(a) {
  let d = a.d;
  let deux = 0;
  let cinq = 0;
  while (d % 2n === 0n) { d /= 2n; deux += 1; }
  while (d % 5n === 0n) { d /= 5n; cinq += 1; }
  return d === 1n ? Math.max(deux, cinq) : null;
}

/** L'écriture décimale française : « −2,8 ». Null si elle ne s'arrête pas. */
export function texteDecimal(a) {
  const k = decimales(a);
  if (k === null) return null;
  const entier = abs(a.n * 10n ** BigInt(k) / a.d);
  let chiffres = String(entier);
  if (k) {
    chiffres = chiffres.padStart(k + 1, '0');
    chiffres = `${chiffres.slice(0, -k)},${chiffres.slice(-k)}`;
  }
  return `${a.n < 0n ? '−' : ''}${chiffres}`;
}

/** « 9/20 », « −2/3 », ou l'entier seul. */
export const texteFraction = (a) => (a.d === 1n
  ? `${a.n < 0n ? '−' : ''}${abs(a.n)}`
  : `${a.n < 0n ? '−' : ''}${abs(a.n)}/${a.d}`);

/** L'écriture scientifique a × 10ⁿ, avec 1 ≤ a < 10 — ou null pour 0, ou si a ne s'écrit pas en décimal. */
export function scientifique(a) {
  if (a.n === 0n) return null;
  let e = String(abs(a.n)).length - String(a.d).length;
  let m = divise(a, puissance(fraction(10), e));
  const absM = (x) => fraction(abs(x.n), x.d);
  while (moins(absM(m), fraction(10)).n >= 0n) { e += 1; m = divise(a, puissance(fraction(10), e)); }
  while (moins(absM(m), fraction(1)).n < 0n) { e -= 1; m = divise(a, puissance(fraction(10), e)); }
  return decimales(m) === null ? null : { mantisse: m, exposant: e };
}

/** Un décimal tapé par l'élève, lu EXACTEMENT : « 0,563 » vaut 563/1000. */
export function lireDecimal(saisie) {
  const s = String(saisie ?? '')
    .replace(/[−–—]/g, '-')
    .replace(/[\s  ]/g, '')
    .replace(',', '.');
  // « 4. » ou « 300, » : une virgule laissée en fin de saisie ne change rien.
  const m = s.match(/^([+-]?)(\d*)(?:\.(\d*))?$/);
  if (!m || !(m[2] || m[3])) return null;
  const apres = m[3] ?? '';
  const n = BigInt(`${m[2] || '0'}${apres}`);
  return fraction(m[1] === '-' ? -n : n, 10n ** BigInt(apres.length));
}

/** Un entier tapé par l'élève (numérateur, exposant), ou null. */
export function lireEntier(saisie) {
  const s = String(saisie ?? '').replace(/[−–—]/g, '-').replace(/[\s  ]/g, '');
  return /^[+-]?\d{1,15}$/.test(s) ? BigInt(s) : null;
}

// ── Lire un calcul ──────────────────────────────────────────────────────────
//
// La syntaxe est celle qu'on tape au clavier : + − × ÷ (ou * / :), les
// parenthèses et les crochets, ^ pour les puissances (10^-3, ou 10⁻³),
// √ ou sqrt(…) pour la racine carrée, la virgule décimale.
//
// La barre « / » est la barre de FRACTION : elle lie plus fort que × et ÷.
// « 1/4 × 6/5 » se lit donc (1/4) × (6/5), comme sur la feuille, et s'affiche
// avec deux traits de fraction. La division s'écrit ÷ ou « : ».
//
// Le moins devant un nombre porte sur la puissance entière : −3² vaut −9, et
// (−3)² vaut 9 — le piège de la feuille d'Evan.

const EXPOSANTS = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-' };

function jetons(source) {
  const s = String(source ?? '')
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, (x) => `^(${[...x].map((c) => EXPOSANTS[c]).join('')})`)
    .replace(/[−–—]/g, '-')
    .replace(/sqrt/gi, '√');
  if (s.length > 160) throw new Error('calcul trop long');
  const liste = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/\s/.test(c)) { i += 1; continue; }
    const nombre = s.slice(i).match(/^\d+(?:[.,]\d+)?/);
    if (nombre) {
      if (nombre[0].replace(/\D/g, '').length > 12) throw new Error('nombre trop long');
      liste.push({ t: 'nb', texte: nombre[0].replace('.', ',') });
      i += nombre[0].length;
      continue;
    }
    if ('+-×*÷:/^()[]√'.includes(c)) {
      liste.push({ t: c === '*' ? '×' : c === ':' ? '÷' : c });
      i += 1;
      continue;
    }
    throw new Error(`caractère inattendu : « ${c} »`);
  }
  return liste;
}

/** L'arbre d'un calcul. Lève une erreur lisible si l'écriture n'est pas un calcul. */
function arbreDe(source) {
  const j = jetons(source);
  let k = 0;
  const voir = () => j[k]?.t;
  const prendre = (t) => {
    if (voir() !== t) throw new Error(t ? `« ${t} » attendu` : 'calcul incomplet');
    k += 1;
  };

  function expression() {
    let g = terme();
    while (voir() === '+' || voir() === '-') {
      const op = j[k].t;
      k += 1;
      g = { t: 'op', op, g, d: terme() };
    }
    return g;
  }
  function terme() {
    let g = facteur();
    while (voir() === '×' || voir() === '÷') {
      const op = j[k].t;
      k += 1;
      g = { t: 'op', op, g, d: facteur() };
    }
    return g;
  }
  function facteur() {
    if (voir() === '-' || voir() === '+') {
      // Sur une copie, un nombre négatif après une opération s'écrit entre
      // parenthèses : 5 − (−3), jamais 5 − −3.
      if (['+', '-', '×', '÷', '/'].includes(j[k - 1]?.t)) throw new Error('un nombre relatif après une opération s\'écrit entre parenthèses');
      const signe = j[k].t;
      k += 1;
      return { t: signe === '-' ? 'neg' : 'pos', e: facteur() };
    }
    return quotient();
  }
  function quotient() {
    let n = puiss();
    while (voir() === '/') {
      k += 1;
      n = { t: 'frac', n, d: puiss() };
    }
    return n;
  }
  function puiss() {
    const b = primaire();
    if (voir() !== '^') return b;
    k += 1;
    let signe = 1;
    const parenthese = voir() === '(';
    if (parenthese) k += 1;
    if (voir() === '-') { signe = -1; k += 1; } else if (voir() === '+') k += 1;
    if (voir() !== 'nb' || j[k].texte.includes(',')) throw new Error('un exposant est un nombre entier');
    const e = signe * Number(j[k].texte);
    k += 1;
    if (parenthese) prendre(')');
    return { t: 'pow', b, e };
  }
  function primaire() {
    const t = voir();
    if (t === 'nb') { k += 1; return { t: 'nb', texte: j[k - 1].texte }; }
    if (t === '(' || t === '[') {
      k += 1;
      const e = expression();
      prendre(t === '(' ? ')' : ']');
      return { t: 'groupe', e, crochets: t === '[' };
    }
    if (t === '√') {
      k += 1;
      return { t: 'racine', e: primaire() };
    }
    throw new Error(t ? `« ${t} » mal placé` : 'calcul incomplet');
  }

  const arbre = expression();
  if (k !== j.length) throw new Error(`« ${j[k].t === 'nb' ? j[k].texte : j[k].t} » en trop`);
  return arbre;
}

function valeurDe(a) {
  switch (a.t) {
    case 'nb': return lireDecimal(a.texte);
    case 'groupe': return valeurDe(a.e);
    case 'neg': return fois(fraction(-1), valeurDe(a.e));
    case 'pos': return valeurDe(a.e);
    case 'frac': return divise(valeurDe(a.n), valeurDe(a.d));
    case 'pow': return puissance(valeurDe(a.b), a.e);
    case 'racine': return racine(valeurDe(a.e));
    default: {
      const [g, d] = [valeurDe(a.g), valeurDe(a.d)];
      if (a.op === '+') return plus(g, d);
      if (a.op === '-') return moins(g, d);
      if (a.op === '×') return fois(g, d);
      return divise(g, d);
    }
  }
}

// Dans un trait de fraction, les parenthèses écrites pour la saisie au
// clavier disparaissent : (−48)/49 s'affiche −48 sur 49.
const sansGroupe = (a) => (a.t === 'groupe' && !a.crochets ? a.e : a);

function latexDe(a) {
  switch (a.t) {
    case 'nb': return a.texte.replace(',', '{,}');
    case 'groupe': return a.crochets ? `\\left[${latexDe(a.e)}\\right]` : `\\left(${latexDe(a.e)}\\right)`;
    case 'neg': return `-${latexDe(a.e)}`;
    case 'pos': return `+${latexDe(a.e)}`;
    case 'frac': return `\\dfrac{${latexDe(sansGroupe(a.n))}}{${latexDe(sansGroupe(a.d))}}`;
    case 'pow': return `${latexDe(a.b)}^{${a.e}}`;
    case 'racine': return `\\sqrt{${latexDe(sansGroupe(a.e))}}`;
    default: {
      const op = { '+': ' + ', '-': ' - ', '×': ' \\times ', '÷': ' \\div ' }[a.op];
      return `${latexDe(a.g)}${op}${latexDe(a.d)}`;
    }
  }
}

// Le même calcul en texte simple, pour le rapport que les parents reçoivent
// par message : une fraction composée garde ses parenthèses.
function texteDe(a) {
  const simple = (x) => ['nb', 'groupe', 'pow', 'racine'].includes(x.t);
  switch (a.t) {
    case 'nb': return a.texte;
    case 'groupe': return a.crochets ? `[${texteDe(a.e)}]` : `(${texteDe(a.e)})`;
    case 'neg': return `−${texteDe(a.e)}`;
    case 'pos': return `+${texteDe(a.e)}`;
    case 'frac': {
      const cote = (x) => (simple(x) ? texteDe(x) : `(${texteDe(x)})`);
      return `${cote(a.n)}/${cote(a.d)}`;
    }
    case 'pow': return `${texteDe(a.b)}^${a.e}`;
    case 'racine': return `√${texteDe(a.e)}`;
    default: return `${texteDe(a.g)} ${a.op === '-' ? '−' : a.op} ${texteDe(a.d)}`;
  }
}

/** Le nombre d'opérations d'un calcul : « (−5) » n'en a aucune, ce n'est pas un calcul. */
function operations(a) {
  const enfants = [a.e, a.g, a.d, a.n, a.b].filter((x) => x && typeof x === 'object' && x.t);
  return (['op', 'frac', 'pow', 'racine'].includes(a.t) ? 1 : 0) + enfants.reduce((t, x) => t + operations(x), 0);
}

/**
 * Lit un calcul et le calcule. Ne lève jamais.
 *
 *   { ok: true, valeur, latex, texte, operations }   valeur : fraction exacte ;
 *   { ok: false, raison }                            l'écriture n'est pas un calcul, ou il est impossible.
 */
export function analyser(source) {
  try {
    const arbre = arbreDe(source);
    return { ok: true, valeur: valeurDe(arbre), latex: latexDe(arbre), texte: texteDe(arbre), operations: operations(arbre) };
  } catch (e) {
    return { ok: false, raison: e.message };
  }
}

// ── Juger une réponse ───────────────────────────────────────────────────────
//
// Trois formes de réponse, celles que demande la feuille :
//   decimal       un nombre décimal (ou entier) ;
//   fraction      une fraction irréductible : numérateur et dénominateur ;
//   scientifique  a × 10ⁿ avec 1 ≤ a < 10 : le nombre a et l'exposant n.
//
// La valeur juste mais la forme pas tout à fait — une fraction qu'on peut
// encore simplifier, 24 × 10³ au lieu de 2,4 × 10⁴ — est « presque » : en
// contrôle, la moitié des points. Une saisie illisible n'est pas jugée.

export const FORMES = ['decimal', 'fraction', 'scientifique'];

/** La forme est-elle possible pour cette valeur ? Une fraction qui tombe juste ne se demande pas en fraction. */
export function formePossible(valeur, forme) {
  if (forme === 'decimal') return decimales(valeur) !== null && decimales(valeur) <= 4;
  if (forme === 'fraction') return valeur.d !== 1n && valeur.d <= 1000n;
  if (forme === 'scientifique') return scientifique(valeur) !== null && decimales(scientifique(valeur).mantisse) <= 4;
  return false;
}

/** La réponse attendue, en clair. */
export function texteAttendu(valeur, forme) {
  if (forme === 'fraction') return texteFraction(valeur);
  if (forme === 'scientifique') {
    const s = scientifique(valeur);
    return `${texteDecimal(s.mantisse)} × 10^${s.exposant}`;
  }
  return texteDecimal(valeur);
}

/**
 * Le verdict d'une réponse à un calcul.
 *
 *   null                                     rien d'exploitable n'a été saisi ;
 *   { statut: 'juste' | 'presque' | 'faux', donnee, remarque? }
 */
export function jugerExact(valeur, forme, rep = {}) {
  if (forme === 'fraction') {
    const [n, d] = [lireEntier(rep.num), lireEntier(rep.den)];
    if (n === null || d === null) return null;
    const donnee = `${rep.num}/${rep.den}`;
    if (d === 0n) return { statut: 'faux', donnee, remarque: 'Un dénominateur n\'est jamais nul.' };
    if (!egales(fraction(n, d), valeur)) return { statut: 'faux', donnee };
    return estIrreductible(n, d)
      ? { statut: 'juste', donnee }
      : { statut: 'presque', donnee, remarque: 'La valeur est juste, mais la fraction se simplifie encore.' };
  }
  if (forme === 'scientifique') {
    const [m, e] = [lireDecimal(rep.m), lireEntier(rep.e)];
    if (m === null || e === null) return null;
    const donnee = `${rep.m} × 10^${rep.e}`;
    // Un exposant démesuré est une réponse fausse, pas un calcul à tenter.
    if (Math.abs(Number(e)) > EXPOSANT_MAX) return { statut: 'faux', donnee };
    if (!egales(fois(m, puissance(fraction(10), Number(e))), valeur)) return { statut: 'faux', donnee };
    const absM = fraction(abs(m.n), m.d);
    const bienEcrit = moins(absM, fraction(1)).n >= 0n && moins(absM, fraction(10)).n < 0n;
    return bienEcrit
      ? { statut: 'juste', donnee }
      : { statut: 'presque', donnee, remarque: 'La valeur est juste, mais en écriture scientifique le premier nombre est entre 1 et 10.' };
  }
  const n = lireDecimal(rep.a);
  if (n === null) return null;
  return { statut: egales(n, valeur) ? 'juste' : 'faux', donnee: String(rep.a).trim() };
}
