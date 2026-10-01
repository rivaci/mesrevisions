// Justifier : assembler son raisonnement avec des phrases toutes faites.
//
// ── Pourquoi pas une rédaction libre ──────────────────────────────────────
//
// Écrire une démonstration au clavier prend dix minutes à un élève de 5e, et
// sans Merlin rien ne la corrige. Ce qui s'apprend ici tient en moins d'une
// minute : SAVOIR CE QUI JUSTIFIE. L'élève choisit ses phrases dans une
// banque, dans l'ordre « On sait que… Or… Donc… », et complète les trous — la
// mesure, le nom de la paire d'angles.
//
// ── Les phrases piège ─────────────────────────────────────────────────────
//
// Chacune est une erreur réelle, et commence par les mêmes mots qu'une phrase
// juste : la forme ne la trahit pas. « Deux angles correspondants sont
// toujours égaux » (la condition oubliée), « ils ont l'air égaux sur la
// figure » (le dessin pris pour une preuve), la propriété dans le mauvais
// sens, ou la vraie propriété… qui parle d'autres angles.
//
// ── Ce qui est jugé ───────────────────────────────────────────────────────
//
//   — aucune phrase piège ;
//   — toutes les phrases justes, aucune n'est de trop ;
//   — l'ordre : ce que l'on sait, puis la propriété, puis la conclusion. Deux
//     phrases du même rôle peuvent s'échanger (deux propriétés, par exemple) ;
//   — les trous.
//
// Pur : ne touche ni à la page ni au stockage. Testé par tools/tester-moteur.mjs.

export const ROLES = ['donnee', 'propriete', 'conclusion'];

/** Les premiers mots qui annoncent chaque rôle. Une phrase piège en prend un aussi. */
export const CONNECTEURS = { donnee: 'On sait que', propriete: 'Or', conclusion: 'Donc' };

const RANG = { donnee: 1, propriete: 2, conclusion: 3 };

export const estPiege = (phrase) => !phrase.role;

/** Mélange de Fisher-Yates : l'ordre de la banque ne doit rien souffler. */
export function melanger(tableau, alea = Math.random) {
  const t = [...tableau];
  for (let i = t.length - 1; i > 0; i -= 1) {
    const k = Math.floor(alea() * (i + 1));
    [t[i], t[k]] = [t[k], t[i]];
  }
  return t;
}

/** Le texte d'une phrase, découpé en morceaux de texte et en trous « {id} ». */
export const morceaux = (texte) => String(texte)
  .split(/(\{\w+\})/)
  .filter(Boolean)
  .map((m) => (/^\{\w+\}$/.test(m) ? { trou: m.slice(1, -1) } : { texte: m }));

/** La clé d'un trou dans les réponses de l'élève. */
export const cleTrou = (phraseId, trouId) => `${phraseId}.${trouId}`;

/** Une mesure tapée : « 70 », « 70° », « 70 ° », « 70,0 ». Sinon `null`. */
export function lireMesure(saisie) {
  const propre = String(saisie ?? '').replace(/°/g, '').replace(',', '.').replace(/\s/g, '');
  if (!/^-?\d+(\.\d+)?$/.test(propre)) return null;
  return Number(propre);
}

/**
 * Juge un trou.
 *   { juste: true } ;
 *   { juste: false, vide: true }       rien de mis ;
 *   { juste: false, message? }         faux — avec l'explication prévue s'il y en a une.
 */
export function jugerTrou(trou, saisie) {
  if (String(saisie ?? '').trim() === '') return { juste: false, vide: true };
  if (trou.choix) {
    if (saisie === trou.attendu) return { juste: true };
    return { juste: false, message: (trou.fausses ?? []).find((f) => f.valeur === saisie)?.message };
  }
  const n = lireMesure(saisie);
  if (n !== null && Math.abs(n - trou.attendu) < 1e-9) return { juste: true };
  const prevue = n === null ? undefined : (trou.fausses ?? []).find((f) => Math.abs(f.valeur - n) < 1e-9);
  return { juste: false, message: prevue?.message };
}

/**
 * Le jugement d'une justification assemblée.
 *
 *   placees  identifiants des phrases choisies, dans l'ordre ;
 *   remplis  { 'phrase.trou': saisie }.
 *
 * Renvoie { juste, pieges, manquantes, ordre, trous } : les phrases piège
 * choisies, les phrases justes oubliées, l'ordre respecté ou non, et les trous
 * faux ou vides des phrases justes.
 */
export function juger(exercice, placees, remplis = {}) {
  const parId = Object.fromEntries(exercice.phrases.map((p) => [p.id, p]));
  const choisies = placees.map((id) => parId[id]).filter(Boolean);
  const pieges = choisies.filter(estPiege).map((p) => p.id);
  const justes = choisies.filter((p) => !estPiege(p));
  const manquantes = exercice.phrases.filter((p) => !estPiege(p) && !placees.includes(p.id)).map((p) => p.id);
  const ordre = justes.every((p, i) => i === 0 || RANG[justes[i - 1].role] <= RANG[p.role]);

  const trous = [];
  for (const p of justes) {
    for (const [id, trou] of Object.entries(p.trous ?? {})) {
      const r = jugerTrou(trou, remplis[cleTrou(p.id, id)]);
      if (!r.juste) trous.push({ phrase: p.id, trou: id, ...r });
    }
  }

  return {
    juste: !pieges.length && !manquantes.length && ordre && !trous.length,
    pieges, manquantes, ordre, trous,
  };
}

/** La justification attendue : les phrases justes, dans l'ordre, les trous remplis. */
export function modele(exercice) {
  return exercice.phrases
    .filter((p) => !estPiege(p))
    .map((p, i) => ({ p, i }))
    .sort((a, b) => RANG[a.p.role] - RANG[b.p.role] || a.i - b.i)
    .map(({ p }) => morceaux(p.texte).map((m) => m.texte ?? String(p.trous[m.trou].attendu)).join(''));
}
