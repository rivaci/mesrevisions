// Comparer une réponse tapée en anglais à ce qu'attend un item.
//
// ── Ce qui ne compte pas ──────────────────────────────────────────────────
//
// La casse, la ponctuation, les accents, et les articles « the », « a », « an » :
// en histoire, « the Tower of London » et « Tower of London » disent la même
// chose. Ni la façon d'écrire le numéro d'un roi : « Edward III », « Edward 3 »
// et « Edward 3rd » sont le même roi.
//
// ── Presque : l'orthographe d'un nom ──────────────────────────────────────
//
// « Wallas », « Poitier » : le fait est su, le nom est mal écrit. C'est
// « presque », avec le nom bien écrit sous les yeux — une lettre de travers
// sur un mot de cinq lettres, deux à partir de dix. Jamais pour un nombre :
// 1357 n'est pas une faute de frappe pour 1356, c'est une autre date. Ni pour
// le numéro d'un roi : Edward II n'est pas une faute de frappe pour Edward III,
// c'est son père.
//
// ── Les erreurs prévues ───────────────────────────────────────────────────
//
// Un item peut porter des `pieges` : des réponses fausses qu'on attend (le
// mot français, « massacre » pour 1915–1917) et le message qui explique.
//
// Ce fichier ne touche pas à la page : il se teste sous node.

const ARTICLES = new Set(['the', 'a', 'an']);

// Un numéro de roi en chiffres romains (un mot seul, de i à xxxix) devient un
// nombre, et un ordinal (3rd, 6th) aussi : les trois écritures se valent, et
// la règle des nombres s'applique ensuite — Edward II n'est jamais « presque »
// Edward III.
const ROMAINS = { i: 1, v: 5, x: 10 };
const ROMAIN = /^x{0,3}(ix|iv|v?i{0,3})$/;
function enNombre(mot) {
  if (ROMAIN.test(mot)) {
    return String([...mot].reduce((total, c, k, t) => {
      const v = ROMAINS[c];
      return ROMAINS[t[k + 1]] > v ? total - v : total + v;
    }, 0));
  }
  return mot.replace(/^(\d+)(st|nd|rd|th)$/, '$1');
}

export const sansAccents = (texte) => String(texte).normalize('NFD').replace(/[̀-ͯ]/g, '');

export function normaliser(texte) {
  return sansAccents(String(texte ?? '').toLowerCase())
    .replace(/[’`'"«»“”()?!.,;:/–—-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter((mot) => mot && !ARTICLES.has(mot))
    .map(enNombre)
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

// Les groupes de chiffres, séparés : « 2 5 » (2.5, normalisé) n'est pas « 25 ».
const chiffres = (texte) => (texte.match(/\d+/g) ?? []).join(' ');
const tolerance = (n) => (n >= 10 ? 2 : n >= 5 ? 1 : 0);

function piegeDe(item, saisie) {
  for (const p of liste(item.pieges)) {
    if (liste(p.si).map(normaliser).includes(saisie)) {
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
 *   { resultat: 'presque', raison: 'orthographe', attendu } | { …, raison: 'piege', message }
 *   { resultat: 'faux', raison?: 'piege', message? }
 *
 * Pour un QCM (`choix`), `saisie` est l'option cliquée.
 */
export function comparer(saisie, item) {
  if (item.type === 'choix') {
    if (saisie == null || saisie === '') return { resultat: 'vide' };
    return { resultat: saisie === item.attendu ? 'juste' : 'faux' };
  }

  const s = normaliser(saisie);
  if (!s) return { resultat: 'vide' };

  const bonnes = attendues(item);
  if (bonnes.includes(s)) return { resultat: 'juste' };

  const piege = piegeDe(item, s);
  if (piege) return piege;

  const proche = bonnes.find((b) => chiffres(b) === chiffres(s) && distance(b, s) <= tolerance(b.length));
  if (proche) return { resultat: 'presque', raison: 'orthographe' };

  return { resultat: 'faux' };
}

/**
 * Un coup de pouce : la première lettre de chaque mot.
 * « William Wallace » → « W······ W······ ».
 *
 * Pour une année, la première lettre ne dit rien (« 1··· ») : l'indice donne
 * la décennie, et il reste le dernier chiffre à trouver (1296 → « 129· »,
 * 1337–1453 → « 133·–145· »). Un item peut aussi porter son propre `indice`.
 */
export function indiceDe(item) {
  if (item.indice) return item.indice;
  return String(item.attendu)
    .split(' ')
    .map((mot) => {
      if (/\d{4}/.test(mot)) return mot.replace(/(\d{3})\d/g, '$1·');
      const lettres = [...mot];
      return lettres[0] + lettres.slice(1).map((c) => (/[\p{L}\p{N}]/u.test(c) ? '·' : c)).join('');
    })
    .join(' ');
}
