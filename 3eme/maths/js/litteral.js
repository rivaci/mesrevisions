// Le calcul littéral : lire une expression, la comparer, juger sa forme.
//
// ── Pourquoi un moteur de plus ────────────────────────────────────────────
//
// verification.js compare deux écritures en remplaçant UNE lettre par
// quelques nombres. Il dit « équivalent », il ne dit pas « développé »,
// « réduit » ou « factorisé » — or c'est toute la consigne : à « Factorise
// 6x + 6y », recopier 6x + 6y est équivalent, et faux. La fiche de calcul
// littéral d'Evan emploie aussi plusieurs lettres (a, b, x, y, z, m, n, k).
//
// Ici, une expression est lue en ARBRE — pour juger sa forme — et calculée en
// POLYNÔME exact, à plusieurs lettres et à coefficients fractionnaires
// (exact.js) — pour juger son équivalence. Deux expressions sont
// équivalentes si leurs polynômes sont identiques : c'est une preuve, pas un
// sondage sur quelques valeurs.
//
// La même lecture sert au contenu et à l'élève : MathLive envoie du LaTeX
// (\left( \right) \frac \cdot), le contenu s'écrit au clavier ; tout passe
// par `lire`.
//
// Ce fichier ne touche ni à la page ni au réseau : il se teste sous node.

import {
  decimales, divise, egales, enNombre, fois, fraction, lireDecimal, plus, texteDecimal, texteFraction,
} from './exact.js';

// ── Lire ────────────────────────────────────────────────────────────────────
//
// Le trait de fraction est un groupement TRANSPARENT (⟦ ⟧) : \frac{25x^2}{16}
// n'a pas de parenthèse à développer, alors que (25x²)/16 tapé au clavier en a
// une — qui ne contient qu'un monôme, et ne gêne donc pas non plus.

const OUVRE = '⟦';
const FERME = '⟧';

function groupe(s, i) {
  if (s[i] !== '{') return [s[i] ?? '', i + 1];
  let profondeur = 0;
  for (let k = i; k < s.length; k += 1) {
    if (s[k] === '{') profondeur += 1;
    else if (s[k] === '}') {
      profondeur -= 1;
      if (profondeur === 0) return [s.slice(i + 1, k), k + 1];
    }
  }
  throw new Error('accolade non fermée');
}

/** \frac{a}{b} devient ⟦⟦a⟧/⟦b⟧⟧, fractions imbriquées comprises. */
function sansFractions(s) {
  const m = /\\[dt]?frac/.exec(s);
  if (!m) return s;
  const [a, j] = groupe(s, m.index + m[0].length);
  const [b, k] = groupe(s, j);
  return sansFractions(`${s.slice(0, m.index)}${OUVRE}${OUVRE}${sansFractions(a)}${FERME}/${OUVRE}${sansFractions(b)}${FERME}${FERME}${s.slice(k)}`);
}

/** Le LaTeX de MathLive et l'écriture au clavier, ramenés à une seule syntaxe. */
export function normaliser(source) {
  let s = String(source ?? '')
    .replace(/\\left|\\right/g, '')
    .replace(/\\(?:lbrack|lbrace)/g, '(')
    .replace(/\\(?:rbrack|rbrace)/g, ')')
    .replace(/\\\{/g, '(')
    .replace(/\\\}/g, ')')
    .replace(/\[/g, '(')
    .replace(/\]/g, ')')
    .replace(/\\[,;:! ]/g, '')
    .replace(/\\(?:cdot|times)/g, '*')
    .replace(/\\div/g, '/')
    .replace(/\{,\}/g, '.')
    .replace(/[−–—]/g, '-')
    .replace(/[×·]/g, '*')
    .replace(/÷/g, '/')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/\s+/g, '');
  s = sansFractions(s).replace(/\{/g, '(').replace(/\}/g, ')').replace(/,/g, '.');
  // « F = (2x − 3)(x + 4) = 2x² + 5x − 12 » : ce qui compte est la dernière
  // écriture ; le nom de l'expression, recopié par habitude, n'en fait pas partie.
  const morceaux = s.split('=').filter(Boolean);
  // Une majuscule tapée par mégarde (2X²) est la même lettre.
  return (morceaux.at(-1) ?? '').toLowerCase();
}

function jetons(s) {
  const liste = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    const nb = /^\d+(?:\.\d+)?/.exec(s.slice(i));
    if (nb) {
      if (nb[0].replace(/\D/g, '').length > 12) throw new Error('nombre trop long');
      liste.push({ t: 'nb', v: lireDecimal(nb[0]) });
      i += nb[0].length;
    } else if (/[a-z]/.test(c)) {
      liste.push({ t: 'var', nom: c });
      i += 1;
    } else if ('+-*/^()'.includes(c) || c === OUVRE || c === FERME) {
      liste.push({ t: c });
      i += 1;
    } else {
      throw new Error(`caractère inattendu : « ${c} »`);
    }
  }
  return liste;
}

/**
 * L'arbre d'une expression. Les nœuds :
 *   nb { v }   var { nom }   par { n }   grp { n }   neg { n }   puiss { base, e }
 *   somme { termes: [{ signe, n }] }   produit { facteurs }   div { num, den }
 * Les parenthèses sont gardées (`par`) : c'est ce qui dit si une expression
 * est développée. `grp` est le groupement d'un trait de fraction.
 */
function arbreDe(source) {
  const j = jetons(normaliser(source));
  if (!j.length) throw new Error('expression vide');
  if (j.length > 200) throw new Error('expression trop longue');
  let k = 0;
  const voir = () => j[k]?.t;
  const prendre = (t) => {
    if (voir() !== t) throw new Error(`« ${t} » attendu`);
    k += 1;
  };

  function somme() {
    const termes = [];
    let signe = 1;
    if (voir() === '+' || voir() === '-') {
      signe = voir() === '-' ? -1 : 1;
      k += 1;
    }
    termes.push({ signe, n: produit() });
    while (voir() === '+' || voir() === '-') {
      const s = voir() === '-' ? -1 : 1;
      k += 1;
      termes.push({ signe: s, n: produit() });
    }
    if (termes.length === 1) return termes[0].signe === 1 ? termes[0].n : { t: 'neg', n: termes[0].n };
    return { t: 'somme', termes };
  }

  function produit() {
    let facteurs = [facteur()];
    for (;;) {
      const t = voir();
      const avant = j[k - 1]?.t;
      if (t === '*') {
        k += 1;
        facteurs.push(facteur());
      } else if (t === '/') {
        k += 1;
        const den = facteur();
        const num = facteurs.length === 1 ? facteurs[0] : { t: 'produit', facteurs };
        facteurs = [{ t: 'div', num, den }];
      } else if (t === 'var' || t === '(' || t === OUVRE || (t === 'nb' && (avant === ')' || avant === FERME))) {
        // La multiplication implicite : 2x, x(x + 1), (x + 1)(x − 1), ½x.
        facteurs.push(facteur());
      } else {
        break;
      }
    }
    return facteurs.length === 1 ? facteurs[0] : { t: 'produit', facteurs };
  }

  function facteur() {
    if (voir() === '-') { k += 1; return { t: 'neg', n: facteur() }; }
    if (voir() === '+') { k += 1; return facteur(); }
    return puissance();
  }

  function puissance() {
    const base = atome();
    if (voir() !== '^') return base;
    k += 1;
    const parenthese = voir() === '(';
    if (parenthese) k += 1;
    if (voir() !== 'nb' || j[k].v.d !== 1n) throw new Error('un exposant est un nombre entier');
    const e = Number(j[k].v.n);
    k += 1;
    if (parenthese) prendre(')');
    if (e > 12) throw new Error('exposant trop grand');
    return { t: 'puiss', base, e };
  }

  function atome() {
    const t = voir();
    if (t === 'nb') { k += 1; return { t: 'nb', v: j[k - 1].v }; }
    if (t === 'var') { k += 1; return { t: 'var', nom: j[k - 1].nom }; }
    if (t === '(' || t === OUVRE) {
      k += 1;
      const n = somme();
      prendre(t === '(' ? ')' : FERME);
      return { t: t === '(' ? 'par' : 'grp', n };
    }
    throw new Error(t ? `« ${t} » mal placé` : 'expression incomplète');
  }

  const resultat = somme();
  if (k !== j.length) throw new Error('écriture incomplète ou en trop');
  return resultat;
}

// ── Calculer : des polynômes exacts ─────────────────────────────────────────
//
// Un polynôme est une Map : clé du monôme → { exp: { x: 2 }, coef }. La clé
// range les lettres : x²y et yx² sont le même monôme.

const cleDe = (exp) => Object.keys(exp).filter((v) => exp[v]).sort().map((v) => `${v}${exp[v]}`).join('.');

/** Au-delà, une expression n'est plus un exercice : on refuse plutôt que de figer la page. */
const MONOMES_MAX = 300;

function nettoyer(p) {
  for (const [k, m] of p) if (m.coef.n === 0n) p.delete(k);
  if (p.size > MONOMES_MAX) throw new Error('expression trop grosse');
  return p;
}
const constante = (c) => nettoyer(new Map([['', { exp: {}, coef: c }]]));
const lettre = (v) => new Map([[`${v}1`, { exp: { [v]: 1 }, coef: fraction(1) }]]);

function ajouter(p, q, signe = 1) {
  const r = new Map([...p].map(([k, m]) => [k, { ...m }]));
  for (const [k, m] of q) {
    const c = signe === 1 ? m.coef : fois(fraction(-1), m.coef);
    r.set(k, r.has(k) ? { exp: m.exp, coef: plus(r.get(k).coef, c) } : { exp: m.exp, coef: c });
  }
  return nettoyer(r);
}

function multiplier(p, q) {
  if (p.size * q.size > 20 * MONOMES_MAX) throw new Error('expression trop grosse');
  const r = new Map();
  for (const a of p.values()) {
    for (const b of q.values()) {
      const exp = { ...a.exp };
      for (const [v, e] of Object.entries(b.exp)) exp[v] = (exp[v] ?? 0) + e;
      const k = cleDe(exp);
      const c = fois(a.coef, b.coef);
      r.set(k, r.has(k) ? { exp, coef: plus(r.get(k).coef, c) } : { exp, coef: c });
    }
  }
  return nettoyer(r);
}

/** La valeur d'un polynôme constant, ou null s'il contient une lettre. */
function valeurConstante(p) {
  if (!p.size) return fraction(0);
  return p.size === 1 && p.has('') ? p.get('').coef : null;
}

function polynome(n) {
  switch (n.t) {
    case 'nb': return constante(n.v);
    case 'var': return lettre(n.nom);
    case 'par':
    case 'grp': return polynome(n.n);
    case 'neg': return multiplier(constante(fraction(-1)), polynome(n.n));
    case 'somme': return n.termes.reduce((p, t) => ajouter(p, polynome(t.n), t.signe), new Map());
    case 'produit': return n.facteurs.reduce((p, f) => multiplier(p, polynome(f)), constante(fraction(1)));
    case 'div': {
      const d = valeurConstante(polynome(n.den));
      if (d === null) throw new Error('on ne divise que par un nombre');
      if (d.n === 0n) throw new Error('division par zéro');
      return multiplier(polynome(n.num), constante(divise(fraction(1), d)));
    }
    case 'puiss': {
      const b = polynome(n.base);
      if (n.e === 0 && !b.size) throw new Error('0⁰ n\'a pas de valeur');
      let r = constante(fraction(1));
      for (let i = 0; i < n.e; i += 1) r = multiplier(r, b);
      return r;
    }
    default: throw new Error('nœud inconnu');
  }
}

/**
 * Lit une expression. Lève une erreur lisible si l'écriture n'en est pas une.
 * Rend { arbre, poly }.
 */
export function lire(source) {
  const arbre = arbreDe(source);
  return { arbre, poly: polynome(arbre) };
}

/** Lit sans lever : null si l'écriture n'est pas une expression. */
export function lireOuNull(source) {
  try { return lire(source); } catch { return null; }
}

/** Deux polynômes identiques, monôme par monôme. */
export function memesPolynomes(p, q) {
  if (p.size !== q.size) return false;
  for (const [k, m] of p) if (!q.has(k) || !egales(m.coef, q.get(k).coef)) return false;
  return true;
}

/** Le nombre λ tel que p = λ q, ou null : deux sommes « proportionnelles ». */
function rapportConstant(p, q) {
  if (!p.size || p.size !== q.size) return null;
  let lambda = null;
  for (const [k, m] of p) {
    if (!q.has(k)) return null;
    const r = divise(m.coef, q.get(k).coef);
    if (lambda && !egales(lambda, r)) return null;
    lambda = r;
  }
  return lambda;
}

/** Deux écritures équivalentes ? null si l'une ne se lit pas. */
export function equivalentes(a, b) {
  const x = lireOuNull(a);
  const y = lireOuNull(b);
  return x && y ? memesPolynomes(x.poly, y.poly) : null;
}

/** Les lettres d'une expression : ['x'], ['a', 'b']. */
export const lettresDe = (p) => [...new Set([...p.values()].flatMap((m) => Object.keys(m.exp)))].sort();

// ── Écrire ──────────────────────────────────────────────────────────────────

const degre = (m) => Object.values(m.exp).reduce((t, e) => t + e, 0);

/** L'ordre d'un corrigé : les degrés décroissants, puis a² avant ab avant b². */
function ordreMonomes(a, b) {
  if (degre(b) !== degre(a)) return degre(b) - degre(a);
  const lettres = [...new Set([...Object.keys(a.exp), ...Object.keys(b.exp)])].sort();
  for (const v of lettres) {
    const d = (b.exp[v] ?? 0) - (a.exp[v] ?? 0);
    if (d) return d;
  }
  return 0;
}

/**
 * Un polynôme en forme développée réduite, à la manière d'un corrigé :
 * 2x^2+5x-12, les degrés décroissants, les fractions en \frac.
 */
export function ecrire(p) {
  const monomes = [...p.values()].sort(ordreMonomes);
  if (!monomes.length) return '0';
  return monomes.map((m, i) => {
    const negatif = m.coef.n < 0n;
    const absolu = fraction(negatif ? -m.coef.n : m.coef.n, m.coef.d);
    const lettres = Object.keys(m.exp).sort().map((v) => (m.exp[v] === 1 ? v : `${v}^${m.exp[v]}`)).join('');
    let coef = absolu.d === 1n ? String(absolu.n) : `\\frac{${absolu.n}}{${absolu.d}}`;
    if (lettres && absolu.n === 1n && absolu.d === 1n) coef = '';
    const signe = negatif ? '-' : i ? '+' : '';
    return `${signe}${coef}${lettres}`;
  }).join('');
}

const nombreLatex = (v) => `${v.n < 0n ? '-' : ''}\\frac{${v.n < 0n ? -v.n : v.n}}{${v.d}}`;

/** Sans les parenthèses ni les groupements qui l'entourent. */
const nu = (n) => (n.t === 'par' || n.t === 'grp' ? nu(n.n) : n);
const estFraction = (n) => nu(n).t === 'div';
const commenceParMoins = (n) => n.t === 'par'
  && (n.n.t === 'neg' || (n.n.t === 'somme' && n.n.termes[0].signe < 0));
// Une parenthèse affichée comme telle — pas une fraction, qui s'en passe.
const finitParParenthese = (n) => (n.t === 'par' && n.n.t !== 'div') || (n.t === 'puiss' && n.base.t === 'par');

/**
 * L'arbre réécrit en LaTeX, tel qu'il a été lu. C'est lui qu'on affiche, pas
 * la chaîne d'origine : ce qui est montré est forcément ce qui est calculé, et
 * une expression proposée par Merlin ne peut rien glisser d'autre qu'une
 * expression.
 */
export function versLatex(n) {
  switch (n.t) {
    case 'nb': return texteDecimalLatex(n.v);
    case 'var': return n.nom;
    case 'grp': return versLatex(n.n);
    // Le trait de fraction groupe déjà : \frac{4}{5} n'a pas besoin de parenthèses.
    case 'par': return n.n.t === 'div' ? versLatex(n.n) : `\\left(${versLatex(n.n)}\\right)`;
    case 'neg': return `-${versLatex(n.n)}`;
    case 'somme': return n.termes.map((t, i) => `${t.signe < 0 ? '-' : i ? '+' : ''}${versLatex(t.n)}`).join('');
    case 'produit': return n.facteurs.map((f, i) => {
      const s = versLatex(f);
      // Un nombre, ou une parenthèse qui commence par un moins, se lit mal
      // collé au facteur d'avant : 6x × 4x, −6 × (−4x), (a − 0,25) × 8. Après
      // une parenthèse, non : (−11y − 3)(−2y + 5), comme sur sa fiche.
      const apresParenthese = i && finitParParenthese(n.facteurs[i - 1]);
      return i && (f.t === 'nb' || f.t === 'neg' || estFraction(f) || (commenceParMoins(f) && !apresParenthese)) ? `\\times ${s}` : s;
    }).join('');
    case 'div': return `\\frac{${versLatex(nu(n.num))}}{${versLatex(nu(n.den))}}`;
    case 'puiss': return `${versLatex(n.base)}^{${n.e}}`;
    default: return '';
  }
}

/** Un nombre de l'arbre, écrit comme sur une copie : 0{,}25, pas 1/4. */
function texteDecimalLatex(v) {
  const t = texteDecimal(v);
  return t === null ? nombreLatex(v) : t.replace('−', '-').replace(',', '{,}');
}

/** Une expression, réécrite pour l'affichage : null si elle ne se lit pas. */
export function afficher(source) {
  const r = lireOuNull(source);
  return r ? versLatex(r.arbre) : null;
}

const EXPOSANTS = '⁰¹²³⁴⁵⁶⁷⁸⁹';

/** L'arbre en texte simple, comme on l'écrit à la main. */
function versTexte(n) {
  switch (n.t) {
    case 'nb': return texteDecimal(n.v) ?? texteFraction(n.v);
    case 'var': return n.nom;
    case 'grp': return versTexte(n.n);
    case 'par': return n.n.t === 'div' ? versTexte(n.n) : `(${versTexte(n.n)})`;
    case 'neg': return `−${versTexte(n.n)}`;
    case 'somme': return n.termes.map((t, i) => `${i ? (t.signe < 0 ? ' − ' : ' + ') : (t.signe < 0 ? '−' : '')}${versTexte(t.n)}`).join('');
    case 'produit': return n.facteurs.map((f, i) => {
      // Une fraction suivie d'une lettre s'entoure de parenthèses : (25/16)x², pas 25/16x².
      const s = estFraction(f) && i < n.facteurs.length - 1 ? `(${versTexte(f)})` : versTexte(f);
      return i && (f.t === 'nb' || f.t === 'neg' || commenceParMoins(f)) ? ` × ${s}` : s;
    }).join('');
    case 'div': {
      const cote = (x) => {
        const y = nu(x);
        return ['nb', 'var'].includes(y.t) ? versTexte(y) : `(${versTexte(y)})`;
      };
      return `${cote(n.num)}/${cote(n.den)}`;
    }
    case 'puiss': return `${versTexte(n.base)}${[...String(n.e)].map((c) => EXPOSANTS[c]).join('')}`;
    default: return '';
  }
}

/** Une expression en texte simple, pour un rapport envoyé par message : 4x² − 12x + 9. */
export function enTexte(source) {
  const r = lireOuNull(source);
  return r ? versTexte(r.arbre) : String(source ?? '');
}

// ── Juger la forme ──────────────────────────────────────────────────────────

/** Un nombre écrit simplement : 3, −3, 3/4, (−3). Pas un calcul à faire. */
const nombreSimple = (n) => n.t === 'nb'
  || ((n.t === 'neg' || n.t === 'par' || n.t === 'grp') && nombreSimple(n.n))
  || (n.t === 'div' && nombreSimple(n.num) && nombreSimple(n.den));

/** Les termes d'une somme, signes sortis : −(x + 1) reste un terme entre parenthèses. */
function termesDe(n) {
  if (n.t === 'somme') return n.termes.flatMap((t) => termesDe(t.n));
  if (n.t === 'neg' && !nombreSimple(n.n)) return termesDe(n.n);
  if (n.t === 'grp') return termesDe(n.n);
  return [n];
}

/** La clé d'un monôme bien écrit — un seul coefficient, chaque lettre une fois —, ou null. */
function cleMonome(n) {
  if (n.t === 'neg' || n.t === 'grp' || n.t === 'par') return cleMonome(n.n);
  if (n.t === 'div' && nombreSimple(n.den)) return cleMonome(n.num);
  const facteurs = n.t === 'produit' ? n.facteurs : [n];
  const exp = {};
  let nombres = 0;
  for (let f of facteurs) {
    while ((f.t === 'neg' || f.t === 'grp') && !nombreSimple(f)) f = f.n;
    if (nombreSimple(f)) { nombres += 1; continue; }
    if (f.t === 'var' && !exp[f.nom]) { exp[f.nom] = 1; continue; }
    if (f.t === 'puiss' && f.base.t === 'var' && f.e >= 1 && !exp[f.base.nom]) { exp[f.base.nom] = f.e; continue; }
    if (f.t === 'div' && nombreSimple(f.den)) {
      const k = cleMonome(f.num);
      if (k === null) return null;
      // Le monôme du numérateur compte comme les autres facteurs : ses lettres s'ajoutent.
      for (const morceau of k ? k.split('.') : []) {
        const [, v, e] = /^([a-z])(\d+)$/.exec(morceau);
        if (exp[v]) return null;
        exp[v] = Number(e);
      }
      nombres += 1;
      continue;
    }
    return null;
  }
  return nombres > 1 ? null : cleDe(exp);
}

/** Un terme qui n'est qu'un monôme entre parenthèses : le (−12x) de 9x² + (−12x) + 4. */
const monomeEntreParentheses = (n) => n.t === 'par' && cleMonome(n.n) !== null;

/** Reste-t-il une parenthèse à développer, ou une puissance d'une somme ? */
function aDevelopper(n) {
  if (nombreSimple(n)) return false;
  switch (n.t) {
    case 'par': return true;
    case 'grp': return aDevelopper(n.n);
    case 'puiss': return n.base.t !== 'var' && !nombreSimple(n.base);
    case 'neg': return aDevelopper(n.n);
    // Un monôme entre parenthèses, terme d'une somme, n'a rien à développer :
    // 9x² + (−12x) + 4 est développé, comme x² + (−3) ou x² + −3x.
    case 'somme': return n.termes.some((t) => !monomeEntreParentheses(t.n) && aDevelopper(t.n));
    case 'produit': return n.facteurs.some(aDevelopper);
    // (x + 1)/2 est une somme divisée : elle se développe en x/2 + 1/2.
    case 'div': return nu(n.num).t === 'somme' || aDevelopper(n.num) || !nombreSimple(n.den);
    default: return false;
  }
}

/**
 * L'état d'une écriture :
 *   reduite          développée, et chaque monôme n'apparaît qu'une fois ;
 *   developpee       plus de parenthèses, mais des termes à regrouper ;
 *   non-developpee   une parenthèse ou une puissance de somme demeure.
 */
export function etatForme(arbre) {
  if (aDevelopper(arbre)) return 'non-developpee';
  const cles = termesDe(arbre).map(cleMonome);
  if (cles.some((c) => c === null) || new Set(cles).size !== cles.length) return 'developpee';
  return 'reduite';
}

/** Les facteurs d'un produit, signes, groupements et parenthèses autour d'un produit enlevés. */
function facteursDe(n) {
  if (n.t === 'neg' || n.t === 'grp') return facteursDe(n.n);
  if (n.t === 'produit') return n.facteurs.flatMap(facteursDe);
  if (n.t === 'par' && n.n.t !== 'somme') return facteursDe(n.n);
  if (n.t === 'div' && nombreSimple(n.den)) return facteursDe(n.num);
  return [n];
}

const estSomme = (n) => nu(n).t === 'somme';

/**
 * Une écriture factorisée : un produit dont au moins un facteur est une
 * somme. Rend { compte, sommes, multiplicites } — le nombre de facteurs non
 * constants, une puissance comptant autant de fois que son exposant —, ou null.
 */
export function analyseProduit(arbre) {
  let n = arbre;
  while (n.t === 'neg' || n.t === 'grp') n = n.n;
  if (n.t === 'somme') return null;
  let compte = 0;
  const sommes = [];
  const multiplicites = [];
  for (const f of facteursDe(n)) {
    if (nombreSimple(f)) continue;
    if (f.t === 'var') compte += 1;
    else if (f.t === 'puiss' && f.base.t === 'var') compte += f.e;
    else if (f.t === 'puiss' && estSomme(f.base)) { compte += f.e; sommes.push(nu(f.base)); multiplicites.push(f.e); }
    else if (estSomme(f)) { compte += 1; sommes.push(nu(f)); multiplicites.push(1); }
    else return null;
  }
  return sommes.length ? { compte, sommes, multiplicites } : null;
}

const pgcdBig = (a, b) => {
  let [x, y] = [a < 0n ? -a : a, b < 0n ? -b : b];
  while (y) [x, y] = [y, x % y];
  return x;
};

/**
 * Une somme d'où l'on ne peut plus rien sortir : des coefficients entiers
 * sans diviseur commun, et aucune lettre commune à tous ses termes. C'est ce
 * que « factoriser » laisse dans la parenthèse quand on a sorti le plus grand
 * facteur commun — 2(3x + 4,5) pour 6x + 9 n'en est pas une.
 */
export function primitive(somme) {
  const p = polynome(somme);
  const monomes = [...p.values()];
  if (monomes.length < 2) return true;
  if (monomes.some((m) => m.coef.d !== 1n)) return false;
  if (monomes.reduce((g, m) => pgcdBig(g, m.coef.n), 0n) > 1n) return false;
  const lettres = lettresDe(p);
  return !lettres.some((v) => monomes.every((m) => (m.exp[v] ?? 0) >= 1));
}

/** Chaque somme en facteur est-elle réduite ? (2x + 3)(2x + 3 − x − 7) n'est pas fini. */
const facteursReduits = (sommes) => sommes.every((s) => etatForme(s) === 'reduite');

/**
 * Une factorisation qui peut servir de corrigé : des facteurs réduits du
 * premier degré, et, s'il n'y a qu'une seule somme en facteur, plus rien à en
 * sortir. 8x² − 2x = 2x(4x − 1) l'est ; 2(4x² − x) ne l'est pas. Deux sommes en
 * facteur viennent d'une identité et peuvent garder un nombre : (9 − 6x)(9 + 6x).
 */
export function factorisationComplete(arbre) {
  const a = analyseProduit(arbre);
  if (!a || !facteursReduits(a.sommes)) return false;
  if (a.sommes.some((s) => [...polynome(s).values()].some((m) => degre(m) > 1))) return false;
  const sommesComptees = a.multiplicites.reduce((t, m) => t + m, 0);
  return sommesComptees >= 2 || a.sommes.every(primitive);
}

/** Deux sommes conjuguées : a + b et a − b. Leur somme et leur différence sont des monômes. */
function conjuguees(p, q) {
  const s = ajouter(p, q);
  const d = ajouter(p, q, -1);
  return s.size <= 1 && d.size <= 1;
}

/** Les termes d'une somme avec leur signe : dans 49 − (x − 3)², le carré est compté en moins. */
function termesSignes(n, signe = 1) {
  if (n.t === 'somme') return n.termes.flatMap((t) => termesSignes(t.n, signe * t.signe));
  if (n.t === 'neg') return termesSignes(n.n, -signe);
  if (n.t === 'grp') return termesSignes(n.n, signe);
  return [{ n, signe }];
}

const carreParfait = (v) => {
  const r = BigInt(Math.round(Math.sqrt(Number(v < 0n ? -v : v))));
  return r * r === (v < 0n ? -v : v);
};
/** Un monôme qui est un carré, au signe près : 25x², 49, 9/4. */
const monomeCarre = (m) => carreParfait(m.coef.n) && carreParfait(m.coef.d) && Object.values(m.exp).every((e) => e % 2 === 0);

/** Un terme écrit comme un carré : (x + 3)², ou un monôme carré. */
function termeCarre(n) {
  if (n.t === 'puiss' && n.e === 2) return true;
  const [m, ...autres] = polynome(n).values();
  return Boolean(m) && !autres.length && m.coef.n > 0n && monomeCarre(m);
}

/** a² − b², a et b pouvant être des parenthèses : (2x + 1)² − 16, 49 − (x − 3)². */
function differenceDeCarres(expression) {
  const t = termesSignes(expression);
  return t.length === 2 && t[0].signe !== t[1].signe && t.every(({ n }) => termeCarre(n));
}

/** Un polynôme de la forme a² − b² ou ±(a² ± 2ab + b²), a et b des monômes : x² − 9, −9x² + 30x − 25. */
function identiteRemarquable(p) {
  const m = [...p.values()];
  const positif = (x) => x.coef.n > 0n;
  if (m.length === 2) return positif(m[0]) !== positif(m[1]) && m.every(monomeCarre);
  if (m.length !== 3) return false;
  return m.some((milieu, j) => {
    const [a, b] = m.filter((_, i) => i !== j);
    if (positif(a) !== positif(b) || !monomeCarre(a) || !monomeCarre(b)) return false;
    // Le double produit : (2ab)² = 4a²b², et ses lettres à mi-chemin de celles des carrés.
    const lettres = new Set([...Object.keys(a.exp), ...Object.keys(b.exp), ...Object.keys(milieu.exp)]);
    return egales(fois(milieu.coef, milieu.coef), fois(fraction(4), fois(a.coef, b.coef)))
      && [...lettres].every((v) => 2 * (milieu.exp[v] ?? 0) === (a.exp[v] ?? 0) + (b.exp[v] ?? 0));
  });
}

/** p s'annule-t-il là où s'annule le facteur f, du premier degré en une lettre ? */
function annulePar(p, f) {
  const [v, ...autres] = lettresDe(f);
  if (!v || autres.length || lettresDe(p).some((w) => w !== v) || [...f.values()].some((m) => degre(m) > 1)) return false;
  const racine = divise(fois(fraction(-1), f.get('')?.coef ?? fraction(0)), f.get(`${v}1`).coef);
  let total = fraction(0);
  for (const m of p.values()) {
    let terme = m.coef;
    for (let i = 0; i < (m.exp[v] ?? 0); i += 1) terme = fois(terme, racine);
    total = plus(total, terme);
  }
  return total.n === 0n;
}

/** Le terme a-t-il la somme s — ou un multiple de s — en facteur ? */
const contientFacteur = (n, ps) => facteursDe(n).some((f) => {
  const g = f.t === 'puiss' ? f.base : f;
  return estSomme(g) && rapportConstant(polynome(nu(g)), ps) !== null;
});

/**
 * Une factorisation qu'on sait faire en 3e : un facteur commun — un nombre,
 * une lettre, une parenthèse —, ou une identité remarquable, y compris sur
 * des parenthèses : (2x + 1)² − 16. Le facteur commun peut être caché dans
 * une partie de l'expression, si un geste de 3e le fait apparaître : 3x + 3
 * = 3(x + 1), x² − 9 = (x − 3)(x + 3) — les « pour les champions » de sa
 * fiche. x² + 5x + 6 = (x + 2)(x + 3) est juste, mais hors programme : on ne
 * le donne pas en exercice.
 */
export function factorisationDe3e(expression, reponse) {
  const a = analyseProduit(reponse);
  if (!a) return false;
  // Une seule somme en facteur : un facteur commun sorti, ou le carré d'une somme.
  if (a.sommes.length === 1) return true;
  // Deux sommes conjuguées : a² − b².
  if (a.sommes.length === 2 && conjuguees(polynome(a.sommes[0]), polynome(a.sommes[1]))) return true;
  if (differenceDeCarres(expression)) return true;
  // Une parenthèse de l'expression, à retrouver dans la réponse. Les termes qui
  // ne la contiennent pas doivent la faire apparaître d'un seul geste.
  const p = polynome(expression);
  const termes = termesSignes(expression);
  return a.sommes.some((s) => {
    const ps = polynome(s);
    const avec = termes.filter(({ n }) => contientFacteur(n, ps));
    if (!avec.length) return false;
    const reste = avec.reduce((r, { n, signe }) => ajouter(r, polynome(n), -signe), p);
    return reste.size === 0 || rapportConstant(reste, ps) !== null || (identiteRemarquable(reste) && annulePar(reste, ps));
  });
}

/** Un produit de deux sommes, ou le carré d'une somme : c'est un développement, pas une réduction. */
export function contientProduitDeSommes(n) {
  switch (n.t) {
    case 'produit':
      return n.facteurs.filter((f) => estSomme(f) || (f.t === 'puiss' && estSomme(f.base))).length >= 2
        || n.facteurs.some(contientProduitDeSommes);
    case 'puiss': return (estSomme(n.base) && n.e >= 2) || contientProduitDeSommes(n.base);
    case 'somme': return n.termes.some((t) => contientProduitDeSommes(t.n));
    case 'par':
    case 'grp':
    case 'neg': return contientProduitDeSommes(n.n);
    case 'div': return contientProduitDeSommes(n.num);
    default: return false;
  }
}

// ── Juger une réponse ───────────────────────────────────────────────────────
//
//   forme 'reduite'      « développe et réduis », « réduis » ;
//   forme 'factorisee'   « factorise ».
//
// La valeur juste mais la forme pas tout à fait est « presque » — développé
// sans regrouper les termes semblables, factorisé en laissant un facteur
// commun ou un facteur à réduire —, à condition que le travail demandé ait été
// fait : recopier l'énoncé n'est jamais « presque ».

/**
 * { statut: 'juste' | 'presque' | 'faux' | 'illisible', raison? }
 *   raison : 'pas-developpe' | 'pas-reduit' | 'pas-factorise'
 *          | 'factorisation-incomplete' | 'facteur-a-reduire'
 */
export function jugerExpression(saisie, { attendu, forme, enonce }) {
  const r = lireOuNull(saisie);
  if (!r) return { statut: 'illisible' };
  const a = lire(attendu);
  if (!memesPolynomes(r.poly, a.poly)) return { statut: 'faux' };

  if (forme === 'reduite') {
    const etat = etatForme(r.arbre);
    if (etat === 'reduite') return { statut: 'juste' };
    const aDevelopperAuDepart = enonce ? etatForme(lire(enonce).arbre) === 'non-developpee' : true;
    if (etat === 'developpee') {
      return { statut: aDevelopperAuDepart ? 'presque' : 'faux', raison: 'pas-reduit' };
    }
    return { statut: 'faux', raison: 'pas-developpe' };
  }

  if (forme === 'factorisee') {
    const f = analyseProduit(r.arbre);
    if (!f) return { statut: 'faux', raison: 'pas-factorise' };
    // L'expression elle-même entre parenthèses, multipliée par 1 ou −1 :
    // 1(30x + 45), −(49 − 25x²). Rien n'a été factorisé.
    if (f.sommes.length === 1 && f.compte === 1) {
      const lambda = rapportConstant(polynome(f.sommes[0]), r.poly);
      if (lambda && lambda.d === 1n && (lambda.n === 1n || lambda.n === -1n)) return { statut: 'faux', raison: 'pas-factorise' };
    }
    if (!facteursReduits(f.sommes)) return { statut: 'presque', raison: 'facteur-a-reduire' };
    const g = analyseProduit(a.arbre);
    // Le plus grand facteur commun est exigé quand le corrigé l'a sorti :
    // 6x + 9 = 3(2x + 3), pas 2(3x + 4,5). Une factorisation par une identité,
    // elle, peut laisser un nombre dans ses facteurs : 81 − 36x² = (9 − 6x)(9 + 6x).
    const pgcdExige = g ? g.sommes.every(primitive) : false;
    if ((g && f.compte < g.compte) || (pgcdExige && !f.sommes.every(primitive))) {
      return { statut: 'presque', raison: 'factorisation-incomplete' };
    }
    return { statut: 'juste' };
  }

  return { statut: 'juste' };
}

// ── L'équation produit nul ──────────────────────────────────────────────────

/** Un nombre ou une fraction tapés : « −5/3 », « 1,2 », « x = 6/5 ». */
export function lireNombreOuFraction(saisie) {
  const s = String(saisie ?? '')
    .replace(/[−–—]/g, '-')
    .replace(/\s/g, '')
    .replace(/,/g, '.')
    .replace(/^[a-z]=/i, '');
  const m = /^([+-]?)(\d+(?:\.\d+)?)\/([+-]?)(\d+(?:\.\d+)?)$/.exec(s);
  if (m) {
    const [a, b] = [lireDecimal(m[2]), lireDecimal(m[4])];
    if (b.n === 0n) return null;
    const v = divise(a, b);
    return (m[1] === '-') !== (m[3] === '-') ? fois(fraction(-1), v) : v;
  }
  return lireDecimal(s);
}

/** Une fraction tapée qui se simplifie encore : « −10/6 ». */
function fractionReductible(saisie) {
  const m = /^[+\-−–]?\s*(\d+)\s*\/\s*[+\-−–]?\s*(\d+)$/.exec(String(saisie ?? '').trim().replace(/^[a-z]\s*=\s*/i, ''));
  return Boolean(m) && pgcdBig(BigInt(m[1]), BigInt(m[2])) > 1n;
}

/**
 * Les facteurs du premier degré d'un produit nul : (3x + 5)(5x − 6) = 0.
 * Rend [{ a, b, racine }] pour chaque facteur ax + b, ou lève.
 */
export function facteursLineaires(equation) {
  const { arbre } = lire(equation);
  let n = arbre;
  while (n.t === 'neg') n = n.n;
  const tous = facteursDe(n);
  // 0 × (x + 1) = 0 est vrai pour tout x : ce n'est plus une équation à deux solutions.
  if (tous.some((f) => nombreSimple(f) && polynome(f).size === 0)) throw new Error('un facteur est nul');
  const facteurs = tous.filter((f) => !nombreSimple(f));
  if (!facteurs.length) throw new Error('pas de facteur');
  return facteurs.map((f) => {
    const p = polynome(f);
    const lettres = lettresDe(p);
    if (lettres.length !== 1 || [...p.values()].some((m) => degre(m) > 1)) throw new Error('un facteur n\'est pas du premier degré');
    const a = p.get(`${lettres[0]}1`).coef;
    const b = p.get('')?.coef ?? fraction(0);
    return { lettre: lettres[0], a, b, racine: divise(fois(fraction(-1), b), a) };
  });
}

/** Les solutions d'un produit nul, sans doublon. */
export function solutionsDe(equation) {
  const vues = [];
  for (const f of facteursLineaires(equation)) if (!vues.some((v) => egales(v, f.racine))) vues.push(f.racine);
  return vues;
}

/**
 * Juge les solutions tapées. { statut, donnee, piege?, remarque? }
 *   juste    toutes les solutions, et rien d'autre ;
 *   presque  une partie seulement, ou une fraction à simplifier ;
 *   faux, vide, illisible.
 * Le piège se lit sur la valeur : b/a au lieu de −b/a, c'est le signe ; −a/b,
 * la fraction retournée ; −1,67 pour −5/3, une valeur approchée. Une solution
 * de trop, quand toutes sont là, vient souvent d'un facteur qui n'est qu'un
 * nombre. Une valeur fausse qu'on ne sait pas expliquer n'a pas de piège :
 * l'appli ne devine pas.
 */
export function jugerSolutions(saisies, equation) {
  const tapees = saisies.map((s) => String(s ?? '').trim()).filter(Boolean);
  const donnee = tapees.join(' ; ');
  if (!tapees.length) return { statut: 'vide', donnee };
  const lues = tapees.map(lireNombreOuFraction);
  if (lues.some((v) => v === null)) return { statut: 'illisible', donnee };
  const facteurs = facteursLineaires(equation);
  const attendues = solutionsDe(equation);
  // Une même valeur tapée deux fois — une solution double — ne compte qu'une fois.
  const distinctes = lues.filter((v, i) => !lues.slice(0, i).some((w) => egales(v, w)));
  const trouvees = attendues.filter((r) => distinctes.some((v) => egales(v, r)));
  const enTrop = distinctes.filter((v) => !attendues.some((r) => egales(r, v)));

  if (trouvees.length === attendues.length && !enTrop.length) {
    return tapees.some(fractionReductible)
      ? {
        statut: 'presque', donnee, piege: 'cl-produit-nul-fraction-a-simplifier',
        remarque: 'Les solutions sont justes, mais une fraction se simplifie encore.',
      }
      : { statut: 'juste', donnee };
  }

  let piege = null;
  for (const v of enTrop) {
    for (const f of facteurs) {
      if (piege) break;
      if (f.b.n !== 0n && egales(v, divise(f.b, f.a))) piege = 'cl-produit-nul-signe';
      else if (f.b.n !== 0n && (egales(v, divise(fois(fraction(-1), f.a), f.b)) || egales(v, divise(f.a, f.b)))) piege = 'cl-produit-nul-inverse';
    }
    if (!piege && attendues.some((r) => decimales(r) === null && Math.abs(enNombre(v) - enNombre(r)) < 0.01)) {
      piege = 'cl-produit-nul-valeur-approchee';
    }
  }
  if (!piege && !enTrop.length) piege = 'cl-produit-nul-une-solution';
  if (!piege && trouvees.length === attendues.length) piege = 'cl-produit-nul-solution-en-trop';
  return { statut: trouvees.length ? 'presque' : 'faux', donnee, piege };
}

/** Les solutions en clair : « −5/3 et 6/5 ». */
export const texteSolutions = (equation) => solutionsDe(equation).map(texteFraction).join(' et ');

/** L'expression d'une équation produit nul « … = 0 » : ce qui est à gauche du signe égal. */
export const equationDe = (enonce) => String(enonce ?? '').split('=')[0];

/** Une équation « … = 0 », réécrite pour l'affichage. */
export function afficherEquation(enonce) {
  const gauche = afficher(equationDe(enonce));
  return gauche === null ? null : `${gauche}=0`;
}
