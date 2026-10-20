// Les questions de l'épreuve blanche et d'« Entraîne-moi » : leurs formes, et
// comment on les note.
//
// Six formes, communes aux deux écrans :
//
//   exact      un calcul de la feuille, écrit dans la syntaxe de exact.js ; la
//              réponse est CALCULÉE, jamais écrite à la main.
//                { type: 'exact', nom: 'A', calcul: '7 − 4 × (2 − 5)', forme: 'decimal' }
//   nombres    un ou plusieurs nombres à trouver : une longueur, une aire.
//                { type: 'nombres', enonce, figure?, champs: [{ id, etiquette, attendu }] }
//   choix      une décision justifiée : chaque option peut valoir une part
//              des points — « non, d'après la réciproque » a la bonne
//              conclusion et le mauvais théorème.
//                { type: 'choix', enonce, figure?, choix: [...], attendu, credits?: { option: part } }
//   enonce     un énoncé du cours écrit de mémoire, corrigé sur sa grille ;
//   redaction  une démonstration rédigée, corrigée critère par critère.
//              Ces deux-là ont la forme des écrits de « Par cœur » et de
//              « Rédiger » (voir ecrit.js) : Merlin les lit avec la même grille.
//
// Ce fichier ne touche ni à la page ni au réseau : il se teste sous node.

import { analyser, jugerExact, lireDecimal, egales, texteAttendu, texteDecimal } from './exact.js';

export const ECRITS = ['enonce', 'redaction'];
export const estEcrit = (q) => ECRITS.includes(q.type);

/** Un nombre du contenu (2.4) écrit à la française (2,4). */
export const fr = (n) => {
  const v = lireDecimal(String(n));
  return (v && texteDecimal(v)) ?? String(n);
};

/** Arrondi au quart de point : le barème d'une copie de collège. */
export const auQuart = (x) => Math.round(x * 4) / 4;

/** « 13,75 », « 1,5 », « 2 ». */
export const points = (x) => String(auQuart(x)).replace('.', ',');

/** Le calcul d'une question 'exact', lu une fois pour toutes. */
export const calculDe = (q) => analyser(q.calcul);

/** « IM = 6 cm » : un champ et sa valeur, pour la correction et le rapport. */
const ecrireChamp = (c, valeur) => `${c.nom ?? c.etiquette} = ${valeur}${c.unite ? ` ${c.unite}` : ''}`;

/** La réponse attendue, en clair : pour la correction et pour le rapport. */
export function attenduDe(q) {
  if (q.type === 'exact') return texteAttendu(calculDe(q).valeur, q.forme);
  if (q.type === 'nombres') return q.champs.map((c) => ecrireChamp(c, fr(c.attendu))).join(' ; ');
  if (q.type === 'choix') return q.attendu;
  return '';
}

/** La question a-t-elle reçu une réponse complète ? */
export function estRepondue(q, rep) {
  if (!rep) return false;
  if (estEcrit(q)) return Boolean(String(rep.texte ?? '').trim());
  if (q.type === 'choix') return rep.a != null;
  if (q.type === 'nombres') return q.champs.every((c) => tape(rep[c.id]));
  if (q.forme === 'fraction') return [rep.num, rep.den].every((v) => String(v ?? '').trim());
  if (q.forme === 'scientifique') return [rep.m, rep.e].every((v) => String(v ?? '').trim());
  return Boolean(String(rep.a ?? '').trim());
}

/**
 * Une longueur tapée avec son unité, comme on l'écrit sur une copie :
 * « 6 cm » se lit 6. L'unité n'est pas vérifiée — elle est dans l'étiquette du
 * champ —, elle ne doit simplement pas rendre la réponse illisible.
 */
export const sansUnite = (saisie) => String(saisie ?? '').trim()
  .replace(/\s*(cm²|cm2|cm³|cm3|mm|cm|m²|m2|m|°)\s*$/i, '');

const tape = (v) => Boolean(String(v ?? '').trim());

/**
 * Note une question corrigée par l'appli. Ne lève jamais.
 *
 *   { part, statut, donnee, attendu, remarque? }
 *
 * `part` va de 0 à 1 : la fraction des points obtenue. Une case blanche vaut
 * 0 et se dit « vide » ; une saisie que l'appli ne sait pas lire vaut 0 aussi,
 * mais se dit « illisible », avec ce qui a été tapé : le rapport ne confond ni
 * l'une ni l'autre avec une erreur de calcul.
 */
export function noterQuestion(q, rep = {}) {
  let attendu = '';
  try {
    attendu = attenduDe(q);
    const vide = { part: 0, statut: 'vide', donnee: '', attendu };
    const illisible = (donnee) => ({ part: 0, statut: 'illisible', donnee, attendu });

    if (q.type === 'exact') {
      const c = calculDe(q);
      if (!c.ok) return vide;
      const j = jugerExact(c.valeur, q.forme, rep);
      if (!j) {
        const champs = ['a', 'num', 'den', 'm', 'e'].filter((k) => tape(rep[k]));
        return champs.length ? illisible(champs.map((k) => String(rep[k]).trim()).join(' ; ')) : vide;
      }
      const part = { juste: 1, presque: 0.5, faux: 0 }[j.statut];
      return { part, statut: j.statut, donnee: j.donnee, attendu, remarque: j.remarque };
    }

    if (q.type === 'nombres') {
      if (!q.champs.some((c) => tape(rep[c.id]))) return vide;
      const lus = q.champs.map((c) => lireDecimal(sansUnite(rep[c.id])));
      const donnee = q.champs.map((c) => ecrireChamp(c, String(rep[c.id] ?? '').trim() || '…')).join(' ; ');
      if (lus.every((v) => v === null)) return illisible(donnee);
      const justes = q.champs.filter((c, i) => lus[i] !== null && egales(lus[i], lireDecimal(String(c.attendu))));
      const part = justes.length / q.champs.length;
      return { part, statut: part === 1 ? 'juste' : part > 0 ? 'presque' : 'faux', donnee, attendu };
    }

    if (q.type === 'choix') {
      const choisi = q.choix[rep.a];
      if (choisi === undefined) return vide;
      const part = choisi === q.attendu ? 1 : (q.credits?.[choisi] ?? 0);
      return { part, statut: part === 1 ? 'juste' : part > 0 ? 'presque' : 'faux', donnee: choisi, attendu };
    }

    return vide;
  } catch {
    // Rien de ce qu'un élève tape ne doit empêcher sa copie d'être notée.
    return { part: 0, statut: 'illisible', donnee: '(réponse impossible à lire)', attendu };
  }
}

/**
 * La part des points d'un écrit, tirée des statuts de sa grille : les
 * éléments obligatoires présents, sur le nombre d'éléments obligatoires. Un
 * élément faux ne rapporte rien, comme un élément absent.
 */
export function partEcrit(statuts, grille) {
  const obligatoires = grille.filter((g) => g.obligatoire !== false);
  if (!obligatoires.length) return 0;
  return obligatoires.filter((g) => statuts?.[g.id] === 'present').length / obligatoires.length;
}

/** Le statut d'un écrit noté, pour le rapport : juste, presque ou faux, comme les autres questions. */
export const statutEcrit = (part) => (part === 1 ? 'juste' : part >= 0.5 ? 'presque' : 'faux');
