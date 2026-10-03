// Comparer une réponse tapée à ce qu'attend un item.
//
// ── Ce qui ne compte pas ──────────────────────────────────────────────────
//
// La casse, la ponctuation, les articles (« le phénotype », « l'ADN ») et la
// ligature : « cellule-oeuf » s'écrit au clavier sans œ, et c'est le même mot.
//
// ── Presque : les accents, l'orthographe ──────────────────────────────────
//
// « genotype », « meiose » : le mot est su, l'accent manque. C'est « presque »,
// avec le mot bien écrit sous les yeux : au contrôle, le vocabulaire s'écrit
// juste. Même chose pour une lettre de travers (« caryotipe ») — une sur un
// mot de cinq lettres, deux à partir de dix. Jamais pour un nombre : 47
// chromosomes, ce n'est pas une faute de frappe pour 46.
//
// ── Les erreurs prévues ───────────────────────────────────────────────────
//
// Un item peut porter des `pieges` : les confusions classiques du chapitre
// (gène et allèle, mitose et méiose, génotype et phénotype, 23 et 46) et le
// message qui les démêle. Elles passent avant la tolérance aux accents :
// « genotype » pour un phénotype mérite mieux que « attention à l'accent ».
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
 * Un coup de pouce : la première lettre de chaque mot.
 * « patrimoine génétique » → « p········· g········ ».
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
