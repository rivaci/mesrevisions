// Comparer une réponse tapée en anglais à ce qu'attend un item.
//
// ── Ce qui ne compte pas ──────────────────────────────────────────────────
//
// La casse, la ponctuation, les accents, et les articles « the », « a », « an » :
// en histoire, « the Schlieffen Plan » et « Schlieffen Plan » disent la même
// chose, et « Austria-Hungary » s'écrit aussi « Austria Hungary ».
//
// ── Presque : l'orthographe d'un nom ──────────────────────────────────────
//
// « Schliefen », « Sarajevho » : le fait est su, le nom est mal écrit. C'est
// « presque », avec le nom bien écrit sous les yeux — une lettre de travers
// sur un mot de cinq lettres, deux à partir de dix. Jamais pour un nombre :
// 1915 n'est pas une faute de frappe pour 1914, c'est une autre date.
//
// ── Les erreurs prévues ───────────────────────────────────────────────────
//
// Un item peut porter des `pieges` : des réponses fausses qu'on attend (le
// mot français, « massacre » pour 1915–1917) et le message qui explique.
//
// Ce fichier ne touche pas à la page : il se teste sous node.

const ARTICLES = new Set(['the', 'a', 'an']);

export const sansAccents = (texte) => String(texte).normalize('NFD').replace(/[̀-ͯ]/g, '');

export function normaliser(texte) {
  return sansAccents(String(texte ?? '').toLowerCase())
    .replace(/[’`'"«»“”()?!.,;:/–—-]/g, ' ')
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
 * « Schlieffen Plan » → « S········· P··· ».
 */
export function indiceDe(item) {
  return String(item.attendu)
    .split(' ')
    .map((mot) => {
      const lettres = [...mot];
      return lettres[0] + lettres.slice(1).map((c) => (/[\p{L}\p{N}]/u.test(c) ? '·' : c)).join('');
    })
    .join(' ');
}
