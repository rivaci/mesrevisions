// Merlin en physique-chimie — ce qui est propre à la matière.
//
// Le moteur d'appel est dans `commun/merlin.js` et ne sait pas de quoi on parle.
// Ici : les consignes, la forme du contexte, le schéma de sortie, la mémoire.
//
// ── Ce que Merlin fait ici, et qu'il ne fait pas en maths ──────────────────
//
// En maths, il explique une confusion de calcul. Ici, il répond à une
// CONCEPTION — un modèle du monde que l'élève a construit et qui marche presque
// partout. Le catalogue la lui donne en toutes lettres : la conception, l'énoncé
// d'élève qui la dit, la règle qui la contredit, le geste de contrôle. Merlin
// n'a donc rien à diagnostiquer : il a à répondre à CELLE-CI, au raisonnement
// précis que l'élève vient de cocher, sans répéter ce qui a déjà été essayé.
//
// Deux phrases sont vraies de toutes les conceptions du catalogue et Merlin doit
// les tenir plutôt que les contredire : la conception de l'élève prédit
// correctement la quasi-totalité de sa vie quotidienne, et il devra apprendre à
// l'INHIBER plutôt qu'à l'oublier — c'est ce que font les experts, dont
// l'imagerie montre qu'ils activent plus que les novices leurs régions
// d'inhibition. Elles sont dans les consignes, et elles sont aussi servies sans
// lui : `app.js` les écrit, préécrites, quand aucune clé n'est saisie.
//
// ── Ce qu'il ne dit JAMAIS ────────────────────────────────────────────────
//
//   · un pourcentage, un effectif, une date d'étude. Aucun chiffre de recherche
//     ne figure dans le contenu servi à l'élève — c'est la règle de sourçage du
//     projet, et l'épisode du « 57 % d'ampèremètre » dit ce que coûte l'inverse ;
//   · « des savants l'ont cru » sur un piège qui ne porte pas
//     d'`antecedentHistorique`. Deux pièges en portent un, et fabriquer la
//     filiation des autres serait inventer de l'histoire des sciences sur un
//     projet dont le différenciant est de dire ce qui est vrai ;
//   · le résultat d'un exercice qu'il n'a pas encore fait ;
//   · un geste de TP. L'application n'entraîne pas le geste et ne remplace pas
//     le TP : lui conseiller de « refaire la manipulation » serait promettre une
//     paillasse qu'il n'a pas.

import * as moteur from '../../../commun/merlin.js';
import { PIEGES } from './data/pieges/index.js';
import { estMaitrise } from './srs.js';
import { cleTransversale, eleve } from './eleve.js';

export const { disponible, configIA, definirConfig, verifierReglages, FOURNISSEURS, lireCout } = moteur;

const APPLI = 'physique4e';
const CLE_DISCIPLINAIRE = 'physique4e.memoire.v1';
const MAX_NOTES = 6;

// ── Consignes ───────────────────────────────────────────────────────────────

const consignes = (prenom) => `Tu t'appelles Merlin. Tu es le professeur particulier de ${prenom}, 13 ans, qui entre en 3e et révise son programme de physique-chimie de 4e.

Ce qui fait échouer cet élève n'est presque jamais l'ignorance d'un fait : c'est
un MODÈLE du monde qu'il s'est construit, cohérent, et qui donne la bonne
prédiction dans la quasi-totalité de sa vie quotidienne. « Ce qu'on ne voit plus
n'est plus là », « un gaz ne pèse rien », « le courant s'use en chemin » : ces
phrases marchent presque partout. Ton rôle n'est pas de les corriger comme des
fautes, c'est de montrer OÙ elles cessent de marcher.

Comment tu réponds :
- Trois à quatre phrases. Au-delà, il ne lit pas.
- Tu le tutoies. Ton chaleureux, jamais mièvre, jamais infantilisant.
- Tu réponds à SON raisonnement à lui, celui qu'il vient de cocher, pas à
  l'erreur en général. S'il a répondu « au hasard », ne fais pas semblant qu'il
  a réfléchi.
- Tu commences par lui accorder ce qui est juste dans son raisonnement. Il y a
  toujours quelque chose : ces conceptions sont fausses par leur portée, pas par
  leurs observations.
- Tu ne lui dis jamais d'oublier son idée. Tu lui dis quand la mettre de côté,
  et à quel signe reconnaître ce moment-là. C'est exactement ce que font les
  physiciens : l'idée ne s'efface pas, elle s'inhibe.
- Tu donnes un geste de contrôle concret, qu'il puisse refaire seul en devoir
  sur table, sans matériel.
- Si une explication a déjà été essayée sans effet, tu en changes.

Quatre interdits, propres à cette matière :
- Aucun pourcentage, aucun effectif, aucune date d'étude sur les élèves. Tu ne
  dis pas « la moitié des élèves pensent comme toi ».
- Tu ne dis « des savants l'ont cru avant toi » QUE si l'antécédent historique
  t'est fourni dans le contexte. Il ne l'est que pour deux conceptions.
- Aucun geste de laboratoire : l'application n'entraîne pas le geste et ne
  remplace pas le TP. Tu ne lui demandes pas de refaire la manipulation.
- Aucune unité inventée, aucun résultat calculé à sa place.

Le champ "explication" est lu tel quel par ${prenom}, à l'écran. Écris-le pour lui.`;

const consignesChat = (prenom) => `${consignes(prenom)}

Vous discutez maintenant librement. Mêmes règles : court, tutoiement, aucun
résultat donné à sa place. S'il te demande la réponse d'un exercice, propose-lui
une piste ou une question qui l'y mène, jamais le résultat.`;

const SCHEMA_REPONSE = {
  type: 'object',
  properties: {
    explication: { type: 'string', description: "L'explication montrée à l'élève, 3 à 4 phrases maximum." },
    geste: { type: 'string', description: 'Le geste de contrôle à refaire seul, en une phrase impérative courte.' },
  },
  required: ['explication', 'geste'],
  additionalProperties: false,
};

const SCHEMA_AIDE = {
  type: 'object',
  properties: {
    aide: { type: 'string', description: "Le coup de pouce montré à l'élève, 2 à 3 phrases maximum." },
  },
  required: ['aide'],
  additionalProperties: false,
};

const SCHEMA_MEMOIRE = {
  type: 'object',
  properties: {
    marche: { type: 'array', items: { type: 'string' }, description: 'Ce qui a fonctionné pour lui expliquer. Vide si rien de notable.' },
    aEviter: { type: 'array', items: { type: 'string' }, description: 'Ce qui a été essayé sans effet et ne doit pas être refait.' },
    transversales: { type: 'array', items: { type: 'string' }, description: "Comment il apprend, indépendamment de la matière." },
  },
  required: ['marche', 'aEviter', 'transversales'],
  additionalProperties: false,
};

// ── Mémoire ─────────────────────────────────────────────────────────────────

const vierge = () => ({ marche: [], aEviter: [] });

const lireJson = (cle, parDefaut) => {
  try { return { ...parDefaut(), ...JSON.parse(localStorage.getItem(cle) ?? 'null') }; }
  catch { return parDefaut(); }
};
const ecrireJson = (cle, valeur) => {
  try { localStorage.setItem(cle, JSON.stringify(valeur)); } catch { /* ignoré */ }
};

export const memoirePhysique = () => lireJson(CLE_DISCIPLINAIRE, vierge);
export const memoireTransversale = () => lireJson(cleTransversale(), () => ({ notes: [] }));

let compteur = 0;
const nouvelId = () => `n${Date.now().toString(36)}${(compteur++).toString(36)}`;

function ajouterNotes(liste, textes, seance) {
  const ajoutees = (textes ?? [])
    .filter((t) => t && t.trim())
    .map((texte) => ({ id: nouvelId(), texte: texte.trim(), seance }));
  const empreinte = (n) => n.texte.slice(0, 40).toLowerCase();
  const vues = new Set(ajoutees.map(empreinte));
  return [...liste.filter((n) => !vues.has(empreinte(n))), ...ajoutees].slice(-MAX_NOTES);
}

export function supprimerNote(id) {
  const m = memoirePhysique();
  ecrireJson(CLE_DISCIPLINAIRE, {
    marche: m.marche.filter((n) => n.id !== id),
    aEviter: m.aEviter.filter((n) => n.id !== id),
  });
  const t = memoireTransversale();
  ecrireJson(cleTransversale(), { notes: t.notes.filter((n) => n.id !== id) });
}

/**
 * Les conceptions qui résistent, chiffres à l'appui — CALCULÉS, jamais écrits
 * par le modèle, qui inventerait des statistiques plausibles et fausses.
 *
 * Ce sont les PIÈGES qu'on liste et non les savoir-faire, parce que c'est là
 * qu'est le diagnostic de cette matière. Et il n'y a aucun filtre d'acquisition :
 * `srs.js` n'en a pas non plus pour les pièges, et en ajouter un ici
 * réintroduirait par la fenêtre l'état absorbant que ce module refuse.
 */
export function conceptionsQuiResistent(etatsPieges, maximum = 5) {
  return Object.entries(etatsPieges ?? {})
    .map(([id, etat]) => ({ id, piege: PIEGES[id], etat }))
    .filter((e) => e.piege && e.etat.echecs > 0)
    .sort((a, b) => b.etat.echecs - a.etat.echecs || a.piege.rang - b.piege.rang)
    .slice(0, maximum)
    .map((e) => ({
      nom: e.piege.conception,
      detail: `${e.etat.echecs} erreur${e.etat.echecs > 1 ? 's' : ''}`
        + (e.etat.reussites ? `, ${e.etat.reussites} réussite${e.etat.reussites > 1 ? 's' : ''}` : '')
        + (e.etat.sansJustification
          ? `, ${e.etat.sansJustification} fois la bonne réponse avec la mauvaise raison`
          : ''),
    }));
}

/**
 * Le profil injecté dans le prompt système.
 *
 * Stable pendant toute une séance : mis à jour une seule fois, à la fin. C'est
 * ce qui permet de le placer dans la partie mise en cache du prompt.
 */
export function profilPourIA({ pieges = {}, savoirFaire = {}, catalogueSf = {}, seance = 1 } = {}) {
  const nom = (eleve().prenom || "L'ÉLÈVE").toUpperCase();
  const m = memoirePhysique();
  const t = memoireTransversale();
  const sections = [];

  const resiste = conceptionsQuiResistent(pieges);
  if (resiste.length) {
    sections.push(`CE QUI RÉSISTE\n${resiste.map((p) => `• ${p.nom} — ${p.detail}`).join('\n')}`);
  }

  // « Acquis » n'est pas un booléen du profil : c'est le verdict de `srs.js`, et
  // il n'y en a qu'un. Un savoir-faire sans piège typé n'est jamais « acquis »
  // mais « couvert, non diagnostiqué », et Merlin doit pouvoir faire la
  // différence — c'est exactement ce qu'il ne faut pas présenter comme su.
  const acquis = Object.entries(savoirFaire)
    .filter(([id, etat]) => estMaitrise(etat, catalogueSf[id] ?? {}).maitrise)
    .map(([id]) => catalogueSf[id]?.titre ?? id);
  if (acquis.length) {
    sections.push(`DÉJÀ ACQUIS (ne pas réexpliquer depuis le début)\n${acquis.map((n) => `• ${n}`).join('\n')}`);
  }
  if (m.marche.length) sections.push(`CE QUI MARCHE POUR LUI\n${m.marche.map((n) => `• ${n.texte}`).join('\n')}`);
  if (m.aEviter.length) sections.push(`DÉJÀ ESSAYÉ SANS EFFET — NE PAS REFAIRE\n${m.aEviter.map((n) => `• ${n.texte}`).join('\n')}`);
  if (t.notes.length) sections.push(`COMMENT IL APPREND (observé dans toutes ses matières)\n${t.notes.map((n) => `• ${n.texte}`).join('\n')}`);

  if (!sections.length) return `PROFIL DE ${nom} — première séance, rien d'observé pour l'instant.`;
  return `PROFIL DE ${nom} — séance ${seance}\n\n${sections.join('\n\n')}`;
}

// ── Appels ──────────────────────────────────────────────────────────────────

const prenom = () => eleve().prenom || 'cet élève';

/**
 * Le contexte d'exercice, mis à plat pour le modèle.
 *
 * La conception y est donnée EN ENTIER — conception, énoncé d'élève, règle,
 * geste de contrôle — parce que c'est ce qui évite à Merlin d'inventer un
 * diagnostic quand le catalogue en porte déjà un. L'antécédent historique n'est
 * transmis QUE s'il existe : c'est ce qui rend l'interdit « ne dis pas que des
 * savants l'ont cru » exécutable au lieu d'être une consigne pieuse.
 */
export function contexteEnTexte(c) {
  if (!c) return null;
  const p = c.piege ? PIEGES[c.piege] : null;
  return [
    `Savoir-faire travaillé : ${c.savoirFaire}`,
    `Énoncé : ${c.enonce}`,
    `Réponse attendue : ${c.attendu}`,
    `Ce que l'élève a répondu : ${c.donnee}`,
    c.verdict ? `Verdict du moteur : ${c.verdict}` : '',
    c.quadrant
      ? `Double QCM : réponse ${c.quadrant.reponseJuste ? 'juste' : 'fausse'}, `
        + `justification ${c.quadrant.justificationJuste ? 'juste' : 'fausse'}.`
      : '',
    p ? `\nCONCEPTION IDENTIFIÉE — ${p.conception}` : '',
    p ? `Ce que l'élève dirait lui-même : « ${p.enonceEleve} »` : '',
    p ? `La règle qui la contredit : ${p.regle}` : '',
    p ? `Le geste de contrôle déjà écrit (tu peux le reformuler, pas le contredire) : ${p.controle}` : '',
    p?.antecedentHistorique
      ? `Antécédent historique AUTORISÉ pour cette conception : ${p.antecedentHistorique.texte}`
      : 'Aucun antécédent historique pour cette conception : ne dis pas que des savants l\'ont crue.',
  ].filter(Boolean).join('\n');
}

/** Réagit à une erreur : on lui a demandé POURQUOI, et on répond à ce
 *  raisonnement précis. */
export function expliquerErreur({ profil, contexte, raisonnement, dejaDit = [] }) {
  const message = [
    contexteEnTexte(contexte),
    '',
    raisonnement
      ? `Interrogé sur son raisonnement, il a répondu : « ${raisonnement} »`
      : "Il n'a pas expliqué son raisonnement.",
    dejaDit.length
      ? `\nExplications déjà données sur cette conception (ne les répète pas) :\n${dejaDit.map((e) => `— ${e}`).join('\n')}`
      : '',
  ].filter(Boolean).join('\n');

  return moteur.appeler({
    consignes: consignes(prenom()),
    profil,
    message,
    schema: SCHEMA_REPONSE,
    nomSchema: 'explication',
    appli: APPLI,
  });
}

/**
 * Le coup de pouce sur un problème — gradué, jamais complet.
 *
 *   niveau 1  une question qui fait relire l'énoncé. Aucune méthode, aucun
 *             nombre, aucune unité.
 *   niveau 2  la mise en route : quelle grandeur, lue où, et pourquoi — mais ni
 *             le calcul ni la conversion.
 *
 * Il n'y a pas de niveau 3 : passé le second, c'est la correction qui s'affiche,
 * après sa tentative, pas à sa place.
 */
export function aiderSurProbleme({ profil, savoirFaire, enonce, niveau, donnee }) {
  const cadre = niveau === 1
    ? ["COUP DE POUCE DE NIVEAU 1. Tu poses UNE question qui l'aide à relire l'énoncé et à",
      "repérer la grandeur cherchée. Aucune méthode, aucune opération, aucun nombre, aucune unité."]
    : ['COUP DE POUCE DE NIVEAU 2. Tu indiques quelle grandeur il faut, où elle se lit dans',
      "l'énoncé ou sur la figure, et pourquoi celle-là. Tu ne fais NI le calcul NI la conversion."];

  return moteur.appeler({
    consignes: consignes(prenom()),
    profil,
    message: [...cadre, '', `Savoir-faire travaillé : ${savoirFaire}`, `Énoncé : ${enonce}`,
      donnee ? `Ce qu'il a déjà tenté : ${donnee}` : "Il n'a rien saisi."].join('\n'),
    schema: SCHEMA_AIDE,
    nomSchema: 'aide',
    appli: APPLI,
  });
}

/** Un échange libre, streamé. */
export function discuter({ profil, contexte, historique, onDelta }) {
  return moteur.discuter({
    consignes: consignesChat(prenom()),
    profil,
    contexte: contexteEnTexte(contexte),
    historique,
    onDelta,
    appli: APPLI,
  });
}

/** Consolidation de fin de séance : le seul moment où la mémoire est réécrite. */
export async function consoliderMemoire({ profil, resume, seance }) {
  if (!disponible()) return;
  const message = [
    `Séance terminée : ${resume.reussites} réussites, ${resume.echecs} erreurs`
    + (resume.sansJustification ? `, ${resume.sansJustification} bonne(s) réponse(s) avec la mauvaise raison` : '') + '.',
    resume.dominante ? `Conception dominante : ${resume.dominante}.` : 'Aucune conception dominante.',
    '',
    "Note ce qui mérite d'être retenu pour les prochaines séances. Sois bref et",
    'concret. Laisse les listes vides si rien de notable ne s\'est passé — une',
    'mémoire qui gonfle noie les deux ou trois choses qui comptent.',
  ].join('\n');

  const r = await moteur.appeler({
    consignes: consignes(prenom()),
    profil,
    message,
    schema: SCHEMA_MEMOIRE,
    nomSchema: 'memoire',
    appli: APPLI,
  });
  if (!r.disponible) return;

  const m = memoirePhysique();
  ecrireJson(CLE_DISCIPLINAIRE, {
    marche: ajouterNotes(m.marche, r.donnees.marche, seance),
    aEviter: ajouterNotes(m.aEviter, r.donnees.aEviter, seance),
  });
  const t = memoireTransversale();
  ecrireJson(cleTransversale(), { notes: ajouterNotes(t.notes, r.donnees.transversales, seance) });
}
