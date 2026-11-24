// Comparer une réponse tapée à ce qu'attend un item.
//
// ── Ce qui ne compte pas ──────────────────────────────────────────────────
//
// La casse, la ponctuation, les articles (« le phénotype », « l'ADN ») et la
// ligature : « cellule-oeuf » s'écrit au clavier sans œ, et c'est le même mot.
//
// ── Presque : les accents, l'orthographe ──────────────────────────────────
//
// « liquefaction », « solute » : le mot est su, l'accent manque. C'est
// « presque », avec le mot bien écrit sous les yeux : au contrôle, le
// vocabulaire s'écrit juste. Même chose pour une lettre de travers
// (« vaporisasion ») — une sur un mot de cinq lettres, deux à partir de dix.
//
// ── Les calculs ───────────────────────────────────────────────────────────
//
// Un item qui porte un `nombre` attend un résultat de calcul. On lit le nombre
// tapé — virgule ou point, espaces des milliers, unité à la suite, et après le
// dernier « = » si l'élève a écrit son calcul (« 520 ÷ 28 = 18,6 ») — et on
// le juge à `ecart` près : 18,6 et 18,57 sont justes pour 520 ÷ 28. Mais
// aucune tolérance de frappe : 1 857 n'est pas une coquille pour 18,57, c'est
// un volume laissé en dL.
//
// ── Les erreurs prévues ───────────────────────────────────────────────────
//
// Un item peut porter des `pieges` : les confusions classiques du chapitre
// (soluté et solvant, fusion et dissolution) et le message qui les démêle.
// Elles passent avant la tolérance aux accents : « solute » pour un solvant
// mérite mieux que « attention à l'accent ». Pour un calcul, un piège porte un
// `nombre` : le résultat qu'on obtient en oubliant une conversion, ou en
// divisant à l'envers.
//
// Ce fichier ne touche pas à la page : il se teste sous node.

const ARTICLES = new Set(['le', 'la', 'les', 'l', 'un', 'une', 'des', 'du']);

export const sansAccents = (texte) => String(texte).normalize('NFD').replace(/[̀-ͯ]/g, '');

export function normaliser(texte) {
  return String(texte ?? '')
    .toLowerCase()
    .replace(/œ/g, 'oe')
    .replace(/[’`'"«»“”()?!.,;:/=+–—-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter((mot) => mot && !ARTICLES.has(mot))
    .join(' ');
}

const liste = (x) => (Array.isArray(x) ? x : x == null ? [] : [x]);

/** Les réponses acceptées, normalisées. La première est celle qu'on affiche. */
export const attendues = (item) => [item.attendu, ...liste(item.accepte)].filter(Boolean).map(normaliser);

/** Le nombre de lettres à changer pour passer de a à b. */
export function distance(a, b) {
  let ligne = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i += 1) {
    const suivante = [i];
    for (let j = 1; j <= b.length; j += 1) {
      suivante[j] = Math.min(ligne[j] + 1, suivante[j - 1] + 1, ligne[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    ligne = suivante;
  }
  return ligne[b.length];
}

const chiffres = (texte) => texte.replace(/\D/g, '');
const tolerance = (n) => (n >= 10 ? 2 : n >= 5 ? 1 : 0);

/** Une erreur prévue, accents mis à part : « genotype » reste la confusion avec le génotype. */
function piegeDe(item, saisie) {
  const s = sansAccents(saisie);
  for (const p of liste(item.pieges)) {
    if (liste(p.si).some((si) => sansAccents(normaliser(si)) === s)) {
      return { resultat: p.resultat ?? 'faux', raison: 'piege', message: p.message };
    }
  }
  return null;
}

/**
 * Le verdict d'une réponse.
 *
 *   { resultat: 'vide' }                         rien de tapé ;
 *   { resultat: 'juste' }
 *   { resultat: 'presque', raison: 'accent' | 'orthographe' } | { …, raison: 'piege', message }
 *   { resultat: 'faux', raison?: 'piege', message? }
 *
 * Pour un QCM (`choix`), `saisie` est l'option cliquée.
 */
export function comparer(saisie, item) {
  if (item.type === 'choix') {
    if (saisie == null || saisie === '') return { resultat: 'vide' };
    return { resultat: saisie === item.attendu ? 'juste' : 'faux' };
  }
  if (item.nombre != null) return comparerNombre(saisie, item);

  const s = normaliser(saisie);
  if (!s) return { resultat: 'vide' };

  const bonnes = attendues(item);
  if (bonnes.includes(s)) return { resultat: 'juste' };

  const piege = piegeDe(item, s);
  if (piege) return piege;

  const sa = sansAccents(s);
  if (bonnes.some((b) => sansAccents(b) === sa)) return { resultat: 'presque', raison: 'accent' };

  const proche = bonnes.find((b) => chiffres(b) === chiffres(s) && distance(sansAccents(b), sa) <= tolerance(b.length));
  if (proche) return { resultat: 'presque', raison: 'orthographe' };

  return { resultat: 'faux' };
}

/**
 * Le nombre d'une saisie : « 18,57 g/cm3 », « ρ = 520 ÷ 28 = 18.6 », « 18 571 kg ».
 * Après le dernier « = » (ou « soit », « → ») s'il y en a un ; `null` s'il n'y
 * a pas de nombre.
 */
export function nombreDe(saisie) {
  const apres = String(saisie ?? '').split(/=|→|\bsoit\b/).pop();
  const sansMilliers = apres.replace(/(\d)[\s  ]+(?=\d{3}(?!\d))/g, '$1');
  const m = sansMilliers.match(/-?\d+(?:[.,]\d+)?/);
  return m ? Number(m[0].replace(',', '.')) : null;
}

const proche = (x, cible, ecart) => Math.abs(x - cible) <= ecart + 1e-9;

/** Un résultat de calcul, jugé à `ecart` près ; les pièges sont des nombres. */
function comparerNombre(saisie, item) {
  if (!String(saisie ?? '').trim()) return { resultat: 'vide' };
  const x = nombreDe(saisie);
  if (x == null) return { resultat: 'faux', raison: 'pas-de-nombre', message: 'La réponse attendue est un nombre.' };
  const ecart = item.ecart ?? 0;
  if (proche(x, item.nombre, ecart)) return { resultat: 'juste' };
  for (const p of liste(item.pieges)) {
    if (p.nombre != null && proche(x, p.nombre, p.ecart ?? ecart)) {
      return { resultat: p.resultat ?? 'faux', raison: 'piege', message: p.message };
    }
  }
  return { resultat: 'faux' };
}

/**
 * Un coup de pouce : la première lettre de chaque mot (« s······· m······ »
 * pour « solubilité maximale »). Un calcul porte son propre `indice` : la
 * première lettre d'un nombre ne dit rien.
 */
export function indiceDe(item) {
  if (item.indice) return item.indice;
  return String(item.attendu)
    .split(' ')
    .map((mot) => {
      const lettres = [...mot];
      return lettres[0] + lettres.slice(1).map((c) => (/[\p{L}\p{N}]/u.test(c) ? '·' : c)).join('');
    })
    .join(' ');
}
