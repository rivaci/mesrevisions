// Merlin en maths — ce qui est propre à la matière.
//
// Le moteur d'appel est dans commun/merlin.js et ne sait pas de quoi on parle.
// Ici : les consignes pédagogiques, la forme du contexte d'exercice, le schéma
// de réponse, et la mémoire de l'élève.
//
// ── Ce que Merlin n'est pas ───────────────────────────────────────────────
//
// Ce n'est pas un solveur. Le benchmark a montré que la ligne de partage chez
// les élèves est nette : Photomath et ChatGPT servent d'outil de vérification
// à ceux qui travaillent déjà, et de contournement aux autres. Merlin ne donne
// donc jamais le résultat d'un exercice — il explique la confusion qui a mené
// à l'erreur et rend un geste de contrôle.
//
// ── Deux couches de mémoire ───────────────────────────────────────────────
//
// TRANSVERSALE   Comment il apprend : longueur d'explication qu'il supporte,
//                exemple plutôt que règle, moment où il décroche. Ça vaut dans
//                toutes les matières, donc c'est stocké sous une clé partagée —
//                la même que l'appli de français. Merlin arrive en maths en
//                connaissant déjà l'élève.
//
// DISCIPLINAIRE  Ce qui résiste en maths, ce qui marche pour l'expliquer, ce
//                qu'on a déjà essayé sans effet. Ne se transfère pas.
//
// Les CHIFFRES viennent toujours de la progression réelle, jamais du modèle :
// sinon il inventerait des statistiques plausibles et fausses.

import * as moteur from '../../../commun/merlin.js';
import { PIEGES } from './data/pieges.js';
import { estAcquis } from './srs.js';
import { cleTransversale, eleve } from './eleve.js';

export const { disponible, configIA, definirConfig, verifierReglages, FOURNISSEURS, lireCout } = moteur;

const APPLI = 'maths6e';
const CLE_DISCIPLINAIRE = 'maths6e.memoire.v1';
const MAX_NOTES = 6;

// ── Consignes ───────────────────────────────────────────────────────────────
//
// Fonction et non constante : le prénom en fait partie. Le texte reste
// identique d'un appel à l'autre pour un même élève, donc la mise en cache du
// prompt fonctionne exactement pareil.

const consignes = (prenom) => `Tu t'appelles Merlin. Tu es le professeur particulier de ${prenom}, 12 ans, qui entre en 5e et révise son programme de 6e.

Cet élève sait souvent réciter une règle mais l'applique de travers, et surtout
il n'a aucun moyen de S'APERCEVOIR qu'il s'est trompé. Ton rôle n'est donc pas
de redonner la règle : c'est de lui montrer pourquoi il s'est fait avoir sur CE
calcul-là, et de lui laisser un geste de vérification qu'il pourra refaire seul
en contrôle.

Comment tu réponds :
- Trois à quatre phrases. Au-delà, il ne lit pas.
- Tu le tutoies. Ton chaleureux, jamais mièvre, jamais infantilisant.
- Tu réponds à SON raisonnement à lui, pas à l'erreur en général. S'il a coché
  « au hasard », ne fais pas semblant qu'il a réfléchi.
- Tu ne donnes JAMAIS le résultat d'un exercice qu'il n'a pas encore fait, et
  tu ne fais pas le calcul à sa place. Il aura un exercice semblable juste après.
- Tu donnes un geste concret à refaire, pas un principe abstrait.
- Si une explication a déjà été essayée sans effet, tu en changes. Ne répète
  pas une image qui n'a pas pris.
- Tu n'inventes aucun chiffre sur lui : les statistiques te sont fournies.
- Tu ne présumes jamais de son genre : écris « tu », jamais « il » ni « elle ».

Deux choses propres aux maths :
- Quand une règle n'a pas d'explication concrète — le produit de deux nombres
  négatifs en est le cas type — dis-le franchement plutôt que d'inventer une
  image avec des dettes qui ne tient pas. Il a le droit de savoir qu'on la
  retient par cohérence.
- Privilégie toujours un geste VÉRIFIABLE par lui : refaire l'opération inverse,
  estimer un ordre de grandeur, tester avec un nombre simple.

Le champ "explication" est lu tel quel par ${prenom}, à l'écran. Écris-le pour lui.`;

const consignesChat = (prenom) => `${consignes(prenom)}

Vous discutez maintenant librement. Mêmes règles : court, tutoiement, aucun
résultat donné à sa place. S'il te demande la réponse d'un exercice, propose-lui
une piste ou une question qui l'y mène, jamais le résultat.`;

const SCHEMA_REPONSE = {
  type: 'object',
  properties: {
    explication: { type: 'string', description: "L'explication montrée à l'élève, 3 à 4 phrases maximum." },
    geste: { type: 'string', description: 'Le geste de vérification à refaire, en une phrase impérative courte.' },
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

export const memoireMaths = () => lireJson(CLE_DISCIPLINAIRE, vierge);
export const memoireTransversale = () => lireJson(cleTransversale(), () => ({ notes: [] }));

let compteur = 0;
const nouvelId = () => `n${Date.now().toString(36)}${(compteur++).toString(36)}`;

/** Ajoute des observations et élague. Les plus anciennes sortent en premier. */
function ajouterNotes(liste, textes, seance) {
  const ajoutees = (textes ?? [])
    .filter((t) => t && t.trim())
    .map((texte) => ({ id: nouvelId(), texte: texte.trim(), seance }));
  // Dédoublonnage grossier : deux notes qui commencent pareil disent
  // probablement la même chose, et la plus récente est la mieux formulée.
  const empreinte = (n) => n.texte.slice(0, 40).toLowerCase();
  const vues = new Set(ajoutees.map(empreinte));
  return [...liste.filter((n) => !vues.has(empreinte(n))), ...ajoutees].slice(-MAX_NOTES);
}

export function supprimerNote(id) {
  const m = memoireMaths();
  ecrireJson(CLE_DISCIPLINAIRE, {
    marche: m.marche.filter((n) => n.id !== id),
    aEviter: m.aEviter.filter((n) => n.id !== id),
  });
  const t = memoireTransversale();
  ecrireJson(cleTransversale(), { notes: t.notes.filter((n) => n.id !== id) });
}

/** Les savoir-faire qui coûtent le plus, chiffres à l'appui. Calculé, jamais écrit par le modèle. */
export function pointsQuiResistent(etats, maximum = 5) {
  return etats
    .filter((e) => e.etat.echecs > 0 && !estAcquis(e.etat))
    .sort((a, b) => b.etat.echecs - a.etat.echecs)
    .slice(0, maximum)
    .map((e) => ({
      nom: e.nom,
      detail:
        `${e.etat.echecs} erreur${e.etat.echecs > 1 ? 's' : ''}`
        + (e.etat.reussites ? `, ${e.etat.reussites} réussite${e.etat.reussites > 1 ? 's' : ''}` : '')
        + (e.etat.palierRate > e.etat.palierMax
          ? ` — tient au palier ${e.etat.palierMax}, lâche au palier ${e.etat.palierRate}`
          : ''),
    }));
}

/**
 * Le profil injecté dans le prompt système.
 *
 * Stable pendant toute une séance : mis à jour une seule fois, à la fin. C'est
 * ce qui permet de le placer dans la partie mise en cache du prompt. S'il
 * changeait à chaque échange, le cache serait cassé à chaque appel.
 */
export function profilPourIA(etats, seance) {
  const nom = (eleve().prenom || "L'ÉLÈVE").toUpperCase();
  const m = memoireMaths();
  const t = memoireTransversale();
  const sections = [];

  const resiste = pointsQuiResistent(etats);
  if (resiste.length) {
    sections.push(`CE QUI RÉSISTE\n${resiste.map((p) => `• ${p.nom} — ${p.detail}`).join('\n')}`);
  }
  const acquis = etats.filter((e) => estAcquis(e.etat));
  if (acquis.length) {
    sections.push(`DÉJÀ ACQUIS (ne pas réexpliquer depuis le début)\n${acquis.map((e) => `• ${e.nom}`).join('\n')}`);
  }
  if (m.marche.length) {
    sections.push(`CE QUI MARCHE POUR LUI\n${m.marche.map((n) => `• ${n.texte}`).join('\n')}`);
  }
  if (m.aEviter.length) {
    sections.push(`DÉJÀ ESSAYÉ SANS EFFET — NE PAS REFAIRE\n${m.aEviter.map((n) => `• ${n.texte}`).join('\n')}`);
  }
  if (t.notes.length) {
    sections.push(`COMMENT IL APPREND (observé dans toutes ses matières)\n${t.notes.map((n) => `• ${n.texte}`).join('\n')}`);
  }

  if (!sections.length) return `PROFIL DE ${nom} — première séance, rien d'observé pour l'instant.`;
  return `PROFIL DE ${nom} — séance ${seance}\n\n${sections.join('\n\n')}`;
}

// ── Appels ──────────────────────────────────────────────────────────────────

const prenom = () => eleve().prenom || 'cet élève';

/** Le contexte d'exercice, mis à plat pour le modèle. */
export const contexteEnTexte = (c) => (c ? [
  `Savoir-faire travaillé : ${c.savoirFaire}`,
  `Consigne : ${c.consigne}`,
  `Énoncé : ${c.enonce}`,
  `Réponse attendue : ${c.attendu}`,
  `Ce que l'élève a répondu : ${c.donnee}`,
  c.piege ? `Confusion identifiée : ${c.piege.nom} — ${c.piege.regle}` : '',
].filter(Boolean).join('\n') : null);

/**
 * Réagit à une erreur : on lui a demandé POURQUOI il a répondu ça, et on
 * répond à ce raisonnement précis.
 */
export function expliquerErreur({ profil, contexte, raisonnement, dejaDit = [] }) {
  const message = [
    contexteEnTexte(contexte),
    '',
    raisonnement
      ? `Interrogé sur son raisonnement, il a répondu : « ${raisonnement} »`
      : "Il n'a pas expliqué son raisonnement.",
    dejaDit.length
      ? `\nExplications déjà données sur cette confusion (ne les répète pas) :\n${dejaDit.map((e) => `— ${e}`).join('\n')}`
      : '',
  ].filter((l) => l !== null).join('\n');

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
 * Le coup de pouce sur un problème — l'endroit le plus utile et le plus risqué.
 *
 * C'est là qu'un élève est tenté de faire faire, et c'est le reproche
 * documenté fait à ChatGPT dans le benchmark. La parade n'est pas de refuser
 * l'aide, c'est de la GRADUER :
 *
 *   niveau 1  une question qui fait relire l'énoncé. Aucune méthode, aucun
 *             calcul, aucun nombre repris de la solution.
 *   niveau 2  la mise en route : quelle opération, sur quelles données, et
 *             pourquoi — mais le calcul reste à faire.
 *
 * Il n'y a pas de niveau 3. Passé le second coup de pouce, l'élève a tout ce
 * qu'il faut ; s'il ne trouve toujours pas, c'est la correction qui s'affiche,
 * après sa tentative — pas à sa place.
 */
export function aiderSurProbleme({ profil, savoirFaire, enonce, question, niveau, donnee }) {
  const cadre = niveau === 1
    ? [
        "COUP DE POUCE DE NIVEAU 1. Tu poses UNE question qui l'aide à relire",
        "l'énoncé et à repérer ce qu'on cherche. Tu ne donnes aucune méthode,",
        'aucune opération, aucun nombre. Tu ne calcules rien.',
      ]
    : [
        'COUP DE POUCE DE NIVEAU 2. Tu indiques par quoi commencer : quelle',
        'opération, sur quelles données de l\'énoncé, et pourquoi celle-là.',
        'Tu ne fais PAS le calcul et tu ne donnes PAS le résultat — il doit',
        'rester quelque chose à faire à l\'élève.',
      ];

  const message = [
    ...cadre,
    '',
    `Savoir-faire travaillé : ${savoirFaire}`,
    `Énoncé : ${enonce}`,
    `Question posée : ${question}`,
    donnee ? `Ce qu'il a déjà tenté : ${donnee}` : "Il n'a rien saisi.",
  ].join('\n');

  return moteur.appeler({
    consignes: consignes(prenom()),
    profil,
    message,
    schema: SCHEMA_AIDE,
    nomSchema: 'aide',
    appli: APPLI,
  });
}

/**
 * La relance sur une activité de découverte.
 *
 * L'activité est un moment de recherche : l'écourter la vide. Merlin ne donne
 * donc jamais la réponse ici — il rend visible ce qu'il fallait remarquer.
 */
export function relancerDecouverte({ profil, savoirFaire, titre, question, donnee }) {
  const message = [
    "RELANCE D'ACTIVITÉ. L'élève cherche et ne voit pas. Tu lui fais remarquer",
    "ce qu'il y a à observer — une régularité, une comparaison, un lien entre",
    'deux lignes. Tu ne donnes ni la réponse, ni le résultat des calculs :',
    "l'activité perd tout son sens s'il n'a pas trouvé lui-même.",
    '',
    `Savoir-faire : ${savoirFaire}`,
    `Activité : ${titre}`,
    `Ce qu'on lui demande : ${question}`,
    donnee ? `Ce qu'il a saisi : ${donnee}` : "Il n'a rien saisi.",
  ].join('\n');

  return moteur.appeler({
    consignes: consignes(prenom()),
    profil,
    message,
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

/**
 * Consolidation de fin de séance : le seul moment où la mémoire est réécrite.
 * Un appel par séance, ce qui la rend quasiment gratuite à l'usage — et surtout
 * ce qui préserve le cache du prompt pendant toute la séance.
 */
export async function consoliderMemoire({ profil, resume, seance }) {
  if (!disponible()) return;
  const message = [
    `Séance terminée : ${resume.reussites} réussites, ${resume.echecs} erreurs.`,
    resume.dominant ? `Confusion dominante : ${resume.dominant}.` : 'Aucune confusion dominante.',
    '',
    'Note ce qui mérite d\'être retenu pour les prochaines séances. Sois bref et',
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

  const m = memoireMaths();
  ecrireJson(CLE_DISCIPLINAIRE, {
    marche: ajouterNotes(m.marche, r.donnees.marche, seance),
    aEviter: ajouterNotes(m.aEviter, r.donnees.aEviter, seance),
  });
  const t = memoireTransversale();
  ecrireJson(cleTransversale(), { notes: ajouterNotes(t.notes, r.donnees.transversales, seance) });
}
