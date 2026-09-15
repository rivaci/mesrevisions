// Le test blanc : une épreuve sur toute la fiche, notée sur 20.
//
// ── Ce qui le distingue du défi ───────────────────────────────────────────
//
// Le défi valide UNE étape et montre la correction à chaque question. Le test
// blanc imite le contrôle de rentrée : les deux matières mêlées, aucune
// correction pendant l'épreuve, une note sur 20 à la fin, puis le corrigé.
// Ses réponses nourrissent quand même la répétition espacée : ce qui est raté
// revient dans les révisions.
//
// ── La composition ────────────────────────────────────────────────────────
//
// 40 questions, un demi-point chacune : 20 de géographie, 20 d'histoire. Le
// tirage est stratifié par thème, sinon un test pourrait tomber sur huit pays
// de l'UE et aucun fleuve. On ne sait pas comment la professeure interrogera ;
// l'histoire mêle donc les formes classiques d'un contrôle de repères :
//
//   qcm        l'événement, retrouver sa date ; le personnage, retrouver son rôle
//   qui-suis-je  le rôle, retrouver le personnage (un qcm dans l'autre sens)
//   saisie     écrire l'année au clavier
//   frise      remettre quatre événements dans l'ordre chronologique
//
// ── Deux règles qui évitent une question ambiguë ──────────────────────────
//
// La saisie et la frise ne portent que sur une date à UNE seule année : on ne
// peut pas demander « en quelle année ? » pour « 1939-1945 ». Et une frise
// n'assemble que des années toutes différentes : « 8 mai 1945 » et « août
// 1945 » s'ordonnent au mois près, ce que la fiche ne demande pas d'apprendre.

import { THEMES, itemsDuTheme } from './data/themes.js';
import { construireQuestion, melanger } from './questions.js';

export const NOMBRE_QUESTIONS = 40;

/** Nombre de questions par thème de géographie : 20 au total. */
const QUOTAS_GEO = {
  'regions-carte': 3,
  'regions-capitale': 3,
  'drom-carte': 1,
  'drom-capitale': 1,
  'fleuves-carte': 2,
  'massifs-carte': 2,
  'mers-carte': 2,
  'ue-carte': 6,
};

/** Formes d'histoire : 20 questions au total, dont 2 frises. */
const QUOTAS_HISTOIRE = { frises: 2, saisies: 4, datesQcm: 6, personnagesQcm: 4, quiSuisJe: 4 };
const TAILLE_FRISE = 4;

const aUneSeuleAnnee = (date) => (date.label.match(/\d{4}/g) ?? []).length === 1;

/** Compose un test blanc complet, dans un ordre mélangé. */
export function composerTestBlanc() {
  return melanger([...questionsDeGeographie(), ...questionsDHistoire()]);
}

function questionsDeGeographie() {
  return Object.entries(QUOTAS_GEO).flatMap(([themeId, nombre]) =>
    melanger(itemsDuTheme(themeId))
      .slice(0, nombre)
      .map((entree) => construireQuestion(entree)));
}

function questionsDHistoire() {
  const dates = melanger(itemsDuTheme('dates'));
  const personnages = melanger(itemsDuTheme('personnages'));
  const utilisees = new Set();
  const prendre = (entrees, condition = () => true) => {
    const entree = entrees.find((e) => !utilisees.has(e.cle) && condition(e));
    if (entree) utilisees.add(entree.cle);
    return entree;
  };

  const questions = [];

  // Les frises d'abord : ce sont elles qui ont la contrainte la plus forte.
  for (let f = 0; f < QUOTAS_HISTOIRE.frises; f++) {
    const elements = [];
    while (elements.length < TAILLE_FRISE) {
      const annees = elements.map((e) => e.item.annee);
      const entree = prendre(dates, (e) => aUneSeuleAnnee(e.item) && !annees.includes(e.item.annee));
      if (!entree) break;
      elements.push(entree);
    }
    questions.push(questionFrise(elements));
  }

  for (let i = 0; i < QUOTAS_HISTOIRE.saisies; i++) {
    questions.push(questionSaisie(prendre(dates, (e) => aUneSeuleAnnee(e.item))));
  }
  for (let i = 0; i < QUOTAS_HISTOIRE.datesQcm; i++) {
    questions.push(construireQuestion(prendre(dates), ['qcm']));
  }
  for (let i = 0; i < QUOTAS_HISTOIRE.personnagesQcm; i++) {
    questions.push(construireQuestion(prendre(personnages), ['qcm']));
  }
  for (let i = 0; i < QUOTAS_HISTOIRE.quiSuisJe; i++) {
    questions.push(questionQuiSuisJe(prendre(personnages)));
  }
  return questions;
}

function questionSaisie({ cle, themeId, item }) {
  return {
    cle, themeId, item,
    theme: THEMES[themeId],
    forme: 'saisie',
    enonce: `${item.evenement} : en quelle année ?`,
    attendu: item.label.match(/\d{4}/)[0],
    attenduLibelle: item.label,
  };
}

function questionFrise(elements) {
  const chronologique = [...elements].sort((a, b) => a.item.annee - b.item.annee);
  return {
    themeId: 'dates',
    theme: THEMES.dates,
    forme: 'frise',
    enonce: 'Remets ces événements dans l\'ordre chronologique, du plus ancien au plus récent.',
    elements: melanger(elements),
    attendu: chronologique.map((e) => e.item.id),
    attenduLibelle: chronologique.map((e) => `${e.item.label} : ${e.item.evenement}`).join(' → '),
  };
}

/** Le qcm des personnages, dans l'autre sens : le rôle est donné, le nom est demandé. */
function questionQuiSuisJe({ cle, themeId, item }) {
  const noms = THEMES.personnages.items.map((p) => p.nom).filter((n) => n !== item.nom);
  return {
    cle, themeId, item,
    theme: THEMES[themeId],
    forme: 'qcm',
    enonce: `Qui suis-je ? ${item.resume}.`,
    attendu: item.nom,
    attenduLibelle: item.nom,
    choix: melanger([item.nom, ...melanger(noms).slice(0, 3)]),
  };
}

/** Compare une réponse à l'attendu, quelle que soit la forme de la question. */
export function estJuste(question, reponse) {
  if (question.forme === 'saisie') return String(reponse ?? '').trim() === question.attendu;
  if (question.forme === 'frise') {
    return Array.isArray(reponse)
      && reponse.length === question.attendu.length
      && reponse.every((id, i) => id === question.attendu[i]);
  }
  return reponse === question.attendu;
}

/** Note sur 20, au demi-point. Chaque question vaut la même chose. */
export function noteSur20(reponses) {
  if (!reponses.length) return 0;
  const justes = reponses.filter((r) => r.correct).length;
  return Math.round((justes / reponses.length) * 40) / 2;
}
