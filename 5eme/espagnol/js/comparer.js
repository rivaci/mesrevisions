// Comparer une réponse tapée à ce qu'attend un item.
//
// ── Trois verdicts, pas deux ──────────────────────────────────────────────
//
// « juste », « presque », « faux ». Presque, c'est le mot su mais mal écrit :
// un accent ou un ñ oublié, l'article oublié ou du mauvais genre. En interro
// ça coûte un demi-point, pas le point entier — et ça ne se retravaille pas
// pareil : on ne réapprend pas « falda », on retient « LA falda ».
//
// ── Les erreurs prévues ───────────────────────────────────────────────────
//
// Un item peut porter des `pieges` : des réponses fausses qu'on attend (camisa
// pour le tee-shirt, grande pour une personne) et le message qui explique la
// confusion. Ils passent AVANT la tolérance aux accents : « los pantalónes »
// mérite mieux que « attention à l'accent ».
//
// Ce fichier ne touche pas à la page : il se teste sous node.

const ARTICLES = new Set(['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas']);
// Le réflexe du francophone — « le pantalón » — est reconnu pour être signalé.
const ARTICLES_FR = new Set(['le', 'les']);

export const sansAccents = (texte) => String(texte).normalize('NFD').replace(/[̀-ͯ]/g, '');

/** Casse, ponctuation et espaces ne comptent pas ; les accents, si. */
export function normaliser(texte) {
  return String(texte ?? '')
    .toLowerCase()
    .replace(/[’`]/g, "'")
    .replace(/[¿?¡!.,;:«»"()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const liste = (x) => (Array.isArray(x) ? x : x == null ? [] : [x]);

/** Les réponses acceptées, normalisées. La première est celle qu'on affiche. */
export const attendues = (item) =>
  [item.es, item.fem, ...liste(item.accepte)].filter(Boolean).map(normaliser);

const couper = (texte) => {
  const [tete, ...reste] = texte.split(' ');
  if (reste.length && (ARTICLES.has(tete) || ARTICLES_FR.has(tete))) return { article: tete, nom: reste.join(' ') };
  return { article: '', nom: texte };
};

function piegeDe(item, saisie, tolerant) {
  for (const p of liste(item.pieges)) {
    const formes = liste(p.si).map(normaliser);
    const touche = tolerant
      ? formes.some((f) => sansAccents(f) === sansAccents(saisie))
      : formes.includes(saisie);
    if (touche) return { resultat: p.resultat ?? 'faux', raison: 'piege', message: p.message };
  }
  return null;
}

/**
 * « alto », « alta », « alto, alta », « alto/a », « alto(a) » : pour un
 * adjectif, toute écriture qui ne contient que des formes justes est juste.
 */
function formeAdjectif(saisie, item) {
  const mots = normaliser(saisie).split(/[\s,/]+/).filter((m) => m && m !== 'a' && m !== 'o');
  if (!mots.length) return '';
  const formes = attendues(item);
  if (mots.every((m) => formes.includes(m))) return mots[0];
  return mots.join(' ');
}

/**
 * Le bon nom, mais sans article ou avec celui de l'autre genre. `accent` dit
 * si le nom a en plus perdu un accent : « pantalon » cumule les deux.
 */
function diagnosticArticle(saisie, bonnes) {
  const tape = couper(saisie);
  for (const b of bonnes) {
    const attendu = couper(b);
    if (!attendu.article || sansAccents(tape.nom) !== sansAccents(attendu.nom)) continue;
    const accent = tape.nom !== attendu.nom;
    if (!tape.article) return { resultat: 'presque', raison: 'article-oublie', attendu: b, accent };
    if (tape.article !== attendu.article) return { resultat: 'presque', raison: 'article-faux', attendu: b, accent };
  }
  return null;
}

/**
 * Le verdict d'une réponse.
 *
 *   { resultat: 'vide' }                              rien de tapé ;
 *   { resultat: 'juste' }
 *   { resultat: 'presque', raison: 'accent' | 'article-oublie' | 'article-faux' | 'piege', … }
 *   { resultat: 'faux', raison?: 'piege', message? }
 *
 * Pour un QCM (`choix`), `saisie` est l'option cliquée.
 */
export function comparer(saisie, item) {
  if (item.type === 'choix') {
    if (saisie == null || saisie === '') return { resultat: 'vide' };
    return { resultat: saisie === item.es ? 'juste' : 'faux' };
  }

  const s = item.type === 'adjectif' ? formeAdjectif(saisie, item) : normaliser(saisie);
  if (!s) return { resultat: 'vide' };

  const bonnes = attendues(item);
  if (bonnes.includes(s)) return { resultat: 'juste' };

  const piege = piegeDe(item, s, false);
  if (piege) return piege;

  if (bonnes.some((b) => sansAccents(b) === sansAccents(s))) return { resultat: 'presque', raison: 'accent' };

  const piegeSansAccent = piegeDe(item, s, true);
  if (piegeSansAccent) return piegeSansAccent;

  if (item.type === 'mot') {
    const article = diagnosticArticle(s, bonnes);
    if (article) return article;
  }
  return { resultat: 'faux' };
}

/** Un ñ oublié se signale à part : ce n'est pas un accent, c'est une autre lettre. */
export const nOublie = (saisie, attendu) => /ñ/.test(attendu) && !/ñ/.test(String(saisie));

/**
 * La réponse attendue, mot à mot, avec ce que l'élève en a eu juste : les mots
 * marqués `ok: false` sont ceux qu'il a ratés, mal écrits ou oubliés. C'est la
 * plus longue sous-suite commune, pour qu'un mot oublié ne décale pas tout.
 */
export function marquerDifferences(saisie, attendu) {
  const mots = String(attendu).split(/\s+/).filter(Boolean);
  const cles = mots.map(normaliser);
  const tapes = normaliser(saisie).split(' ').filter(Boolean);
  const n = cles.length;
  const m = tapes.length;
  const t = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i -= 1) {
    for (let j = m - 1; j >= 0; j -= 1) {
      t[i][j] = cles[i] === tapes[j] ? t[i + 1][j + 1] + 1 : Math.max(t[i + 1][j], t[i][j + 1]);
    }
  }
  const ok = new Array(n).fill(false);
  for (let i = 0, j = 0; i < n && j < m;) {
    if (cles[i] === tapes[j]) { ok[i] = true; i += 1; j += 1; }
    else if (t[i + 1][j] >= t[i][j + 1]) i += 1;
    else j += 1;
  }
  return mots.map((mot, i) => ({ mot, ok: ok[i] }));
}

/**
 * Un coup de pouce : l'article, puis la première lettre de chaque mot.
 * « el pantalón » → « el p······ ».
 */
export function indiceDe(item) {
  const texte = String(item.es);
  const mots = texte.split(' ');
  return mots
    .map((mot, i) => {
      if (i === 0 && mots.length > 1 && ARTICLES.has(mot.toLowerCase())) return mot;
      const lettres = [...mot];
      return lettres[0] + lettres.slice(1).map((c) => (/[\p{L}]/u.test(c) ? '·' : c)).join('');
    })
    .join(' ');
}
