// Fabrique les questions d'une séance à partir des connaissances à réviser.
//
// Trois formes de question, choisies pour couvrir ce que demande la fiche :
//
//   'carte'   placer sur la carte      → « savoir placer »
//   'qcm'     reconnaître parmi 4      → vérification rapide, praticable au doigt
//   'carte-nom' nommer une zone montrée → « savoir nommer »
//
// La saisie au clavier a été écartée : sur téléphone, une faute d'accent ou de
// trait d'union serait comptée fausse alors que la connaissance est là.

import { THEMES } from './data/themes.js';

/** Mélange une copie du tableau (Fisher-Yates). */
export function melanger(tableau) {
  const copie = [...tableau];
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

/**
 * Construit une question pour une connaissance donnée.
 *
 * `formesAutorisees` permet au mode appelant de restreindre le choix : le mode
 * carte ne veut que des questions cartographiques, par exemple.
 */
export function construireQuestion({ cle, themeId, item }, formesAutorisees = null) {
  const theme = THEMES[themeId];
  const possibles = (formesAutorisees ?? formesPossibles(themeId))
    .filter((f) => formesPossibles(themeId).includes(f));
  const forme = possibles[Math.floor(Math.random() * possibles.length)];

  // `attendu` est ce à quoi on compare la réponse ; `attenduLibelle` est ce
  // qu'on montre à l'élève. Sur une carte les deux diffèrent : on compare un
  // identifiant (« 11 ») mais on affiche un nom (« Île-de-France »).
  const base = { cle, themeId, theme, item, forme, attenduLibelle: theme.reponse(item) };

  if (forme === 'carte') {
    return { ...base, enonce: theme.question(item), attendu: item.id };
  }
  if (forme === 'carte-nom') {
    return {
      ...base,
      enonce: libelleDeReconnaissance(themeId),
      designe: item.id,
      attendu: theme.reponse(item),
      choix: choixParmi(theme, item),
    };
  }
  return {
    ...base,
    enonce: theme.question(item),
    attendu: theme.reponse(item),
    choix: choixParmi(theme, item),
  };
}

/**
 * Un thème cartographique n'admet pas de QCM : sa question et sa réponse sont
 * toutes deux le nom du lieu, donc proposer ce nom parmi quatre options
 * reviendrait à donner la réponse dans l'énoncé. Ces thèmes s'interrogent dans
 * les deux sens de la carte — placer, et nommer ce qui est montré.
 */
export const formesPossibles = (themeId) =>
  THEMES[themeId].carte ? ['carte', 'carte-nom'] : ['qcm'];

const libelleDeReconnaissance = (themeId) =>
  themeId === 'ue-carte' ? 'Quel est ce pays ?'
    : themeId === 'drom-carte' ? 'Quel DROM est-ce ?'
    : themeId === 'fleuves-carte' ? 'Quel est ce fleuve ?'
    : themeId === 'massifs-carte' ? 'Quel est ce massif ?'
    : themeId === 'mers-carte' ? 'Quelle est cette mer ?'
    : 'Quelle est cette région ?';

/** Bonne réponse + 3 leurres pris dans le même thème, donc plausibles. */
function choixParmi(theme, item, nombre = 4) {
  const bonne = theme.reponse(item);
  const leurres = melanger(
    theme.items.filter((autre) => theme.reponse(autre) !== bonne).map((autre) => theme.reponse(autre)),
  ).slice(0, nombre - 1);
  return melanger([bonne, ...leurres]);
}
