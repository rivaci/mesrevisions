// Déroulement d'une séance de révision.
//
// Trois façons de travailler une même étape :
//
//   'decouverte'   flashcards à retourner, l'élève s'auto-évalue. Pour un
//                  premier contact, quand se tromper n'a pas de sens.
//   'entrainement' questions notées avec correction immédiate et explication.
//   'defi'         même chose sans filet, avec un score à la fin.
//
// La sélection des questions passe par la répétition espacée : ce qui est mal
// su revient d'abord.

import { itemsDeLEtape, SEUIL_DEFI } from './data/parcours.js';
import { THEMES } from './data/themes.js';
import { construireQuestion, melanger } from './questions.js';
import { chargerCarte, dessinerCarte } from './carte.js';
import { enregistrerReponse, enregistrerDefi, enregistrerTestBlanc, etatItem, lireEtat } from './store.js';
import { composerTestBlanc, corrigerReponseOuverte, estJuste, noteSur20 } from './test-blanc.js';
import * as merlin from '../../../commun/merlin.js';
import { ordonnerPourSeance } from './srs.js';
import { sauvegarderMaintenant } from '../../../commun/sauvegarde.js';

/** Longueur d'une séance d'entraînement. Le défi, lui, couvre toute l'étape. */
const LONGUEUR_SEANCE = 12;

export const MODES = {
  decouverte: { nom: 'Découvrir', icone: '💡', description: 'Des cartes à retourner, sans note' },
  entrainement: { nom: "S'entraîner", icone: '🎯', description: 'Des questions avec correction expliquée' },
  defi: { nom: 'Défi', icone: '🏆', description: "Toute l'étape, sans aide : réussis-le pour la valider" },
};

/**
 * Lance une séance dans `conteneur`.
 * `surFin(resume)` est appelé quand l'élève quitte l'écran de résultat.
 */
export function lancerSeance({ etape, mode, conteneur, surFin }) {
  const questions = mode === 'test-blanc'
    ? composerTestBlanc({ avecQuestionsOuvertes: merlin.disponible() })
    : preparerQuestions(etape, mode);
  const reponses = [];
  let index = 0;

  conteneur.innerHTML = '';
  const entete = document.createElement('header');
  entete.className = 'seance-entete';
  const zone = document.createElement('div');
  zone.className = 'seance-zone';
  conteneur.append(entete, zone);

  const majEntete = () => {
    const justes = reponses.filter((r) => r.correct).length;
    entete.innerHTML = `
      <button class="bouton-retour" type="button" aria-label="Quitter la séance">←</button>
      <div class="seance-jauge" role="progressbar" aria-valuenow="${index}" aria-valuemin="0" aria-valuemax="${questions.length}">
        <div class="seance-jauge-remplie" style="width:${(index / questions.length) * 100}%"></div>
      </div>
      <span class="seance-compteur">${Math.min(index + 1, questions.length)}/${questions.length}</span>
      ${mode === 'entrainement' || mode === 'defi' ? `<span class="seance-score">✓ ${justes}</span>` : ''}`;
    entete.querySelector('.bouton-retour').addEventListener('click', () => surFin(null));
  };

  const suivante = async () => {
    if (index >= questions.length) return terminer();
    majEntete();
    const question = questions[index];
    await afficherQuestion({
      question,
      mode,
      zone,
      surReponse: (correct, donnee) => {
        // Une réponse rédigée part tout de suite chez Merlin, sans rien
        // afficher : la correction est attendue à la fin, et les secondes de
        // l'appel se perdent pendant que l'élève répond aux questions suivantes.
        // Elle ne rejoint la répétition espacée qu'une fois notée.
        if (question.forme === 'ouverte') {
          const correction = corrigerReponseOuverte(question, donnee, { appeler: merlin.appeler });
          reponses.push({ question, donnee, bareme: question.bareme, correction });
          return;
        }
        // Le défi ne fait pas exception : ses réponses nourrissent aussi la
        // répétition espacée, sinon l'élève réviserait deux fois la même chose.
        const gain = question.forme === 'frise'
          ? enregistrerFrise(question, donnee)
          : enregistrerReponse(question.cle, correct);
        const bareme = question.bareme;
        reponses.push({ question, correct, donnee, gain, bareme, points: bareme === undefined ? undefined : (correct ? bareme : 0) });
      },
      surSuite: () => { index += 1; suivante(); },
    });
  };

  const terminer = () => {
    if (mode === 'test-blanc') {
      entete.innerHTML = '';
      return afficherResumeTestBlanc({ zone, reponses, surFin });
    }
    const justes = reponses.filter((r) => r.correct).length;
    const score = reponses.length ? justes / reponses.length : 0;
    const resultatDefi = mode === 'defi' ? enregistrerDefi(etape.id, score) : null;
    entete.innerHTML = '';
    afficherResume({ zone, etape, mode, reponses, score, resultatDefi, surFin });
  };

  suivante();
}

/** Choisit et ordonne les questions de la séance. */
function preparerQuestions(etape, mode) {
  const items = itemsDeLEtape(etape);
  // Mélanger AVANT le tri : à priorité égale l'ordre d'origine l'emporterait,
  // et une séance de 12 questions ne verrait jamais que le premier thème de
  // l'étape (les 13 régions avant la moindre capitale).
  const ordonnes = ordonnerPourSeance(melanger(items).map((i) => ({ ...i, etat: etatItem(i.cle) })));

  if (mode === 'defi') {
    // Le défi porte sur l'INTÉGRALITÉ de l'étape, dans un ordre aléatoire : il
    // valide l'étape, il ne peut donc pas se contenter d'un échantillon. On
    // n'y privilégie pas ce qui est mal su, pour que le score reste le reflet
    // du niveau réel.
    return melanger(items).map((entree) => construireQuestion(entree));
  }

  const selection = ordonnes.slice(0, LONGUEUR_SEANCE);
  if (mode === 'decouverte') {
    return selection.map((entree) => ({ ...entree, forme: 'flashcard', theme: THEMES[entree.themeId] }));
  }
  return selection.map((entree) => construireQuestion(entree));
}

// --- Affichage d'une question ----------------------------------------------

async function afficherQuestion({ question, mode, zone, surReponse, surSuite }) {
  zone.innerHTML = '';
  if (question.forme === 'flashcard') return afficherFlashcard({ question, zone, surReponse, surSuite });
  if (question.forme === 'carte') return afficherQuestionCarte({ question, mode, zone, surReponse, surSuite });
  if (question.forme === 'saisie') return afficherSaisie({ question, mode, zone, surReponse, surSuite });
  if (question.forme === 'frise') return afficherFrise({ question, mode, zone, surReponse, surSuite });
  if (question.forme === 'ouverte') return afficherOuverte({ question, mode, zone, surReponse, surSuite });
  return afficherQcm({ question, mode, zone, surReponse, surSuite });
}

/**
 * Carte à retourner : l'élève juge lui-même s'il savait.
 *
 * Pour un thème cartographique, la carte est MONTRÉE des deux côtés — sans
 * elle, « Trouve sur la carte : Océanie » se retournait en « Océanie », ce qui
 * n'apprend strictement rien. Découvrir, ici, c'est chercher des yeux puis voir
 * la réponse s'allumer au bon endroit.
 *
 * Elle n'est jamais cliquable : ce mode ne note pas, il montre.
 */
async function afficherFlashcard({ question, zone, surReponse, surSuite }) {
  const modele = question.theme;

  const carte = document.createElement('div');
  carte.className = 'flashcard';
  carte.innerHTML = `
    <p class="flashcard-consigne flashcard-consigne--recto">Réfléchis, puis retourne la carte.</p>
    <p class="flashcard-recto">${modele.question(question.item)}</p>
    <button class="bouton bouton--principal" type="button">Voir la réponse</button>`;
  zone.append(carte);

  // Chargée une fois pour les deux faces : le tracé ne change pas, seule la
  // mise en valeur arrive au retournement.
  const dessiner = async (revelee) => {
    if (!modele.carte) return null;
    const donnees = await chargerCarte(modele.carte.fichier);
    const vue = dessinerCarte(donnees, modele.carte.couche, {});
    if (revelee) vue.revelerCible(question.item.id);
    vue.figer();
    const cadre = document.createElement('div');
    cadre.className = 'carte-cadre carte-cadre--illustration';
    cadre.append(vue.element);
    return cadre;
  };

  const posee = await dessiner(false);
  if (posee) carte.insertBefore(posee, carte.querySelector('button'));

  carte.querySelector('button').addEventListener('click', async () => {
    carte.classList.add('est-retournee');
    carte.innerHTML = `
      <p class="flashcard-recto flashcard-recto--petit">${modele.question(question.item)}</p>
      <p class="flashcard-verso">${modele.reponse(question.item)}</p>
      <p class="flashcard-detail">${modele.detail(question.item)}</p>
      <p class="flashcard-consigne">Tu le savais&nbsp;?</p>
      <div class="flashcard-choix">
        <button class="bouton bouton--rate" type="button">Pas vraiment</button>
        <button class="bouton bouton--reussi" type="button">Oui&nbsp;!</button>
      </div>`;
    const revelee = await dessiner(true);
    if (revelee) carte.insertBefore(revelee, carte.querySelector('.flashcard-verso'));
    const [rate, reussi] = carte.querySelectorAll('.flashcard-choix button');
    rate.addEventListener('click', () => { surReponse(false); surSuite(); });
    reussi.addEventListener('click', () => { surReponse(true); surSuite(); });
  });
}

/**
 * Pose l'énoncé tout de suite et renvoie de quoi retirer le mot d'attente.
 *
 * Sans lui, la première carte d'une séance laisse un écran vide le temps du
 * téléchargement : une centaine de kilo-octets, ce qui se remarque en 4G.
 */
function poserEnonce(zone, texte) {
  const enonce = document.createElement('p');
  enonce.className = 'question-enonce';
  enonce.textContent = texte;
  const attente = document.createElement('p');
  attente.className = 'chargement';
  attente.textContent = 'Chargement de la carte…';
  zone.append(enonce, attente);
  return () => attente.remove();
}

/** Question cartographique : l'élève clique la bonne zone. */
async function afficherQuestionCarte({ question, mode, zone, surReponse, surSuite }) {
  const { carte: config } = question.theme;
  const carteChargee = poserEnonce(zone, question.enonce);
  const donnees = await chargerCarte(config.fichier);
  carteChargee();

  const correction = document.createElement('div');
  correction.className = 'correction';

  let repondu = false;
  const carte = dessinerCarte(donnees, config.couche, {
    cibleRenforcee: question.attendu,
    surClic: (id) => {
      if (repondu) return;
      repondu = true;
      const correct = id === question.attendu;
      if (mode === 'test-blanc') {
        carte.designer(id);
      } else {
        carte.marquerReponse(id, correct);
        if (!correct) carte.revelerCible(question.attendu);
      }
      carte.figer();
      surReponse(correct, id);
      afficherCorrection({ correction, question, correct, mode, surSuite });
    },
  });

  const cadre = document.createElement('div');
  cadre.className = 'carte-cadre';
  cadre.append(carte.element);
  // L'énoncé est déjà en place : poserEnonce l'a affiché avant le chargement.
  zone.append(cadre, correction);
}

/** Question à choix multiples, éventuellement accompagnée d'une carte. */
async function afficherQcm({ question, mode, zone, surReponse, surSuite }) {
  const enonce = document.createElement('p');
  enonce.className = 'question-enonce';
  enonce.textContent = question.enonce;
  zone.append(enonce);

  // Forme « nommer » : on montre la zone et on demande son nom.
  if (question.forme === 'carte-nom') {
    const config = question.theme.carte;
    const donnees = await chargerCarte(config.fichier);
    const carte = dessinerCarte(donnees, config.couche, {});
    carte.designer(question.designe);
    carte.figer();
    const cadre = document.createElement('div');
    cadre.className = 'carte-cadre carte-cadre--illustration';
    cadre.append(carte.element);
    zone.append(cadre);
  }

  const liste = document.createElement('div');
  liste.className = 'choix';
  const correction = document.createElement('div');
  correction.className = 'correction';

  let repondu = false;
  for (const choix of question.choix) {
    const bouton = document.createElement('button');
    bouton.type = 'button';
    bouton.className = 'choix-bouton';
    bouton.textContent = choix;
    bouton.addEventListener('click', () => {
      if (repondu) return;
      repondu = true;
      const correct = choix === question.attendu;
      if (mode === 'test-blanc') {
        bouton.classList.add('est-choisi');
        liste.classList.add('est-fige');
        surReponse(correct, choix);
        return afficherCorrection({ correction, question, correct, mode, surSuite });
      }
      bouton.classList.add(correct ? 'est-juste' : 'est-faux');
      if (!correct) {
        [...liste.children]
          .find((b) => b.textContent === question.attendu)
          ?.classList.add('est-attendu');
      }
      liste.classList.add('est-fige');
      surReponse(correct, choix);
      afficherCorrection({ correction, question, correct, mode, surSuite });
    });
    liste.append(bouton);
  }

  zone.append(liste, correction);
}

/** Retour après réponse. Le défi reste sobre : pas d'explication pendant l'épreuve. */
function afficherCorrection({ correction, question, correct, mode, surSuite }) {
  // Test blanc : ni verdict ni explication pendant l'épreuve, comme sur une
  // copie. Le court délai laisse voir que le choix a bien été pris en compte.
  if (mode === 'test-blanc') {
    setTimeout(surSuite, 350);
    return;
  }
  const detail = mode === 'defi' ? '' : `<p class="correction-detail">${question.theme.detail(question.item)}</p>`;
  correction.className = `correction est-visible ${correct ? 'est-juste' : 'est-faux'}`;
  correction.innerHTML = `
    <p class="correction-verdict">${correct ? '✓ Bonne réponse' : `✗ La réponse était : ${question.attenduLibelle}`}</p>
    ${detail}
    <button class="bouton bouton--principal" type="button">Continuer</button>`;
  const bouton = correction.querySelector('button');
  bouton.addEventListener('click', surSuite);
  bouton.focus();
}

/** Écrire l'année au clavier. Des chiffres seuls : pas de faute d'accent possible. */
function afficherSaisie({ question, mode, zone, surReponse, surSuite }) {
  zone.insertAdjacentHTML('beforeend', `
    <p class="question-enonce"></p>
    <form class="saisie-annee">
      <input type="text" inputmode="numeric" maxlength="4" autocomplete="off" aria-label="L'année">
      <button class="bouton bouton--principal" type="submit" disabled>Valider</button>
    </form>`);
  zone.querySelector('.question-enonce').textContent = question.enonce;
  const formulaire = zone.querySelector('form');
  const champ = formulaire.querySelector('input');
  const valider = formulaire.querySelector('button');
  const correction = document.createElement('div');
  correction.className = 'correction';
  zone.append(correction);

  champ.addEventListener('input', () => {
    champ.value = champ.value.replace(/\D/g, '');
    valider.disabled = champ.value.length !== 4;
  });
  formulaire.addEventListener('submit', (evenement) => {
    evenement.preventDefault();
    if (valider.disabled) return;
    champ.disabled = true;
    valider.disabled = true;
    const correct = estJuste(question, champ.value);
    surReponse(correct, champ.value);
    afficherCorrection({ correction, question, correct, mode, surSuite });
  });
  champ.focus();
}

/**
 * Remettre quatre événements dans l'ordre : l'élève les touche du plus ancien
 * au plus récent. Les dates ne sont pas affichées — elles donneraient l'ordre.
 */
function afficherFrise({ question, mode, zone, surReponse, surSuite }) {
  zone.insertAdjacentHTML('beforeend', `
    <p class="question-enonce"></p>
    <p class="frise-aide">Touche d'abord le plus ancien.</p>
    <ol class="frise"></ol>
    <div class="frise-actions">
      <button class="bouton" type="button" data-action="effacer">Recommencer l'ordre</button>
      <button class="bouton bouton--principal" type="button" data-action="valider" disabled>Valider</button>
    </div>`);
  zone.querySelector('.question-enonce').textContent = question.enonce;
  const liste = zone.querySelector('.frise');
  const effacer = zone.querySelector('[data-action="effacer"]');
  const valider = zone.querySelector('[data-action="valider"]');
  const correction = document.createElement('div');
  correction.className = 'correction';
  zone.append(correction);

  let ordre = [];
  const boutons = question.elements.map(({ item }) => {
    const li = document.createElement('li');
    const bouton = document.createElement('button');
    bouton.type = 'button';
    bouton.className = 'frise-evenement';
    bouton.innerHTML = '<span class="frise-rang" aria-hidden="true"></span><span class="frise-texte"></span>';
    bouton.querySelector('.frise-texte').textContent = item.evenement;
    bouton.addEventListener('click', () => {
      if (ordre.includes(item.id)) return;
      ordre.push(item.id);
      bouton.classList.add('est-choisi');
      bouton.querySelector('.frise-rang').textContent = String(ordre.length);
      valider.disabled = ordre.length !== question.elements.length;
    });
    li.append(bouton);
    liste.append(li);
    return bouton;
  });

  effacer.addEventListener('click', () => {
    ordre = [];
    for (const b of boutons) {
      b.classList.remove('est-choisi');
      b.querySelector('.frise-rang').textContent = '';
    }
    valider.disabled = true;
  });
  valider.addEventListener('click', () => {
    for (const b of [...boutons, effacer, valider]) b.disabled = true;
    const correct = estJuste(question, ordre);
    surReponse(correct, ordre);
    afficherCorrection({ correction, question, correct, mode, surSuite });
  });
}

/** Répondre par écrit, en quelques phrases. Corrigé par Merlin à la fin du test. */
function afficherOuverte({ question, mode, zone, surReponse, surSuite }) {
  zone.insertAdjacentHTML('beforeend', `
    <p class="question-enonce"></p>
    <p class="ouverte-aide">Réponse rédigée, sur 1 point — corrigée par Merlin à la fin du test.</p>
    <form class="ouverte">
      <textarea rows="5" maxlength="800" aria-label="Ta réponse"></textarea>
      <button class="bouton bouton--principal" type="submit" disabled>Valider</button>
    </form>`);
  zone.querySelector('.question-enonce').textContent = question.enonce;
  const formulaire = zone.querySelector('form');
  const champ = formulaire.querySelector('textarea');
  const valider = formulaire.querySelector('button');
  const correction = document.createElement('div');
  correction.className = 'correction';
  zone.append(correction);

  champ.addEventListener('input', () => { valider.disabled = !champ.value.trim(); });
  formulaire.addEventListener('submit', (evenement) => {
    evenement.preventDefault();
    if (valider.disabled) return;
    champ.disabled = true;
    valider.disabled = true;
    surReponse(null, champ.value);
    afficherCorrection({ correction, question, correct: null, mode, surSuite });
  });
  champ.focus();
}

/**
 * Attend les corrections de Merlin, puis fait corriger par l'élève lui-même
 * celles que Merlin n'a pas pu trancher. Chaque réponse rédigée repart ensuite
 * avec ses points, et rejoint la répétition espacée.
 */
async function finaliserReponsesOuvertes(zone, reponses) {
  const ouvertes = reponses.filter((r) => r.question.forme === 'ouverte');
  if (!ouvertes.length) return;

  zone.innerHTML = '<div class="resume"><p class="resume-emoji">🎩</p><h2 class="resume-titre">Merlin corrige tes réponses rédigées…</h2></div>';
  for (const r of ouvertes) Object.assign(r, await r.correction);

  const aCorriger = ouvertes.filter((r) => r.aCorrigerSoiMeme);
  if (aCorriger.length) await autoCorrection(zone, aCorriger);

  for (const r of ouvertes) {
    r.correct = r.points === r.bareme;
    r.gain = enregistrerReponse(r.question.cle, r.correct);
  }
}

/** Merlin n'a pas pu noter : l'élève se corrige à partir du corrigé. */
function autoCorrection(zone, aCorriger) {
  return new Promise((terminer) => {
    zone.innerHTML = `
      <div class="resume resume--test-blanc">
        <h2 class="resume-titre">Merlin n'a pas pu corriger ${aCorriger.length > 1 ? 'ces réponses' : 'cette réponse'}</h2>
        <p class="resume-score">Compare avec le corrigé, et note-toi honnêtement.</p>
        <ul class="auto-correction"></ul>
        <div class="resume-actions">
          <button class="bouton bouton--principal" type="button" disabled>Voir ma note</button>
        </div>
      </div>`;
    const liste = zone.querySelector('.auto-correction');
    const voir = zone.querySelector('.resume-actions button');
    const majBouton = () => { voir.disabled = aCorriger.some((r) => r.points === null); };

    for (const r of aCorriger) {
      const li = document.createElement('li');
      for (const [classe, texte] of [
        ['corrige-enonce', r.question.enonce],
        ['corrige-donne', `Ta réponse : ${r.donnee}`],
        ['corrige-attendu', `Corrigé : ${r.question.attenduLibelle}`],
      ]) {
        const p = document.createElement('p');
        p.className = classe;
        p.textContent = texte;
        li.append(p);
      }
      const choix = document.createElement('div');
      choix.className = 'auto-correction-choix';
      for (const [points, libelle] of [[1, "J'avais l'essentiel"], [0.5, 'À moitié'], [0, 'Faux']]) {
        const bouton = document.createElement('button');
        bouton.type = 'button';
        bouton.className = 'choix-bouton';
        bouton.textContent = libelle;
        bouton.addEventListener('click', () => {
          r.points = points;
          r.commentaire = 'Corrigé par toi-même.';
          for (const b of choix.children) b.classList.toggle('est-choisi', b === bouton);
          majBouton();
        });
        choix.append(bouton);
      }
      li.append(choix);
      liste.append(li);
    }
    voir.addEventListener('click', terminer);
  });
}

/**
 * Une frise engage quatre connaissances : chacune compte juste si elle est à
 * sa place. Les compter toutes fausses pour une seule inversion punirait la
 * répétition espacée sur des dates pourtant sues.
 */
function enregistrerFrise(question, ordre = []) {
  const gains = question.elements.map((e) => enregistrerReponse(
    e.cle, ordre.indexOf(e.item.id) === question.attendu.indexOf(e.item.id),
  ));
  return {
    xpGagnes: gains.reduce((total, g) => total + g.xpGagnes, 0),
    nouveauxBadges: gains.flatMap((g) => g.nouveauxBadges),
  };
}

// --- Écran de fin du test blanc ---------------------------------------------

const enFrancais = (nombre) => String(nombre).replace('.', ',');

/** Ce que l'élève a répondu, lisible : un nom de lieu plutôt qu'un identifiant. */
function reponseLisible({ question, donnee }) {
  if (question.forme === 'frise') {
    const parId = new Map(question.elements.map((e) => [e.item.id, e.item.evenement]));
    return (donnee ?? []).map((id) => parId.get(id)).join(' → ');
  }
  if (question.forme === 'carte') {
    return question.theme.items.find((i) => i.id === donnee)?.nom ?? donnee;
  }
  return donnee;
}

async function afficherResumeTestBlanc({ zone, reponses, surFin }) {
  await finaliserReponsesOuvertes(zone, reponses);
  sauvegarderMaintenant().catch(() => {});

  const precedent = lireEtat().testsBlancs?.[0];
  const note = noteSur20(reponses);
  // Chaque matière pèse la moitié du test : sa note se lit sur 10.
  const surDix = (matiere) => noteSur20(reponses.filter((r) => r.question.theme.matiere === matiere)) / 2;
  const geo = surDix('geo');
  const histoire = surDix('histoire');
  enregistrerTestBlanc({ note, geo, histoire });

  const ecart = precedent ? note - precedent.note : null;
  const pluriel = (n) => (Math.abs(n) > 1 ? 's' : '');
  const ligneEcart = ecart === null ? ''
    : ecart === 0 ? 'Même note qu\'au test précédent.'
    : `${ecart > 0 ? '+' : ''}${enFrancais(ecart)} point${pluriel(ecart)} par rapport au test précédent.`;
  const rates = reponses.filter((r) => !r.correct && r.question.forme !== 'ouverte');
  const ouvertes = reponses.filter((r) => r.question.forme === 'ouverte');

  zone.innerHTML = `
    <div class="resume resume--test-blanc">
      <p class="resume-emoji">${note >= 16 ? '🏆' : note >= 10 ? '👍' : '💪'}</p>
      <h2 class="resume-titre">Test blanc terminé</h2>
      <p class="resume-note">${enFrancais(note)}<span>/20</span></p>
      <p class="resume-score">Géographie : ${enFrancais(geo)}/10 · Histoire : ${enFrancais(histoire)}/10</p>
      ${ligneEcart ? `<p class="resume-ecart">${ligneEcart}</p>` : ''}
      ${ouvertes.length ? `
        <div class="resume-revoir redactions">
          <h3>Tes réponses rédigées</h3>
          <ul></ul>
        </div>` : ''}
      ${rates.length ? `
        <div class="resume-revoir corrige">
          <h3>Le corrigé de tes ${rates.length} erreur${rates.length > 1 ? 's' : ''}</h3>
          <p class="corrige-note">Tout ce que tu as raté revient dans tes révisions.</p>
          <ul></ul>
        </div>` : '<p class="resume-score">Aucune erreur. Impressionnant.</p>'}
      <div class="resume-actions">
        <button class="bouton bouton--principal" data-action="rejouer" type="button">Refaire un test blanc</button>
        <button class="bouton" data-action="retour" type="button">Retour à l'accueil</button>
      </div>
    </div>`;

  // Le corrigé passe par textContent : une réponse tapée n'est jamais
  // interprétée comme du HTML.
  const ul = zone.querySelector('.corrige ul');
  for (const r of rates) {
    const li = document.createElement('li');
    const lignes = [
      ['corrige-enonce', r.question.enonce],
      ['corrige-donne', `Ta réponse : ${reponseLisible(r) || '—'}`],
      ['corrige-attendu', `Réponse : ${r.question.attenduLibelle}`],
    ];
    for (const [classe, texte] of lignes) {
      const p = document.createElement('p');
      p.className = classe;
      p.textContent = texte;
      li.append(p);
    }
    ul.append(li);
  }

  const redactions = zone.querySelector('.redactions ul');
  for (const r of ouvertes) {
    const li = document.createElement('li');
    for (const [classe, texte] of [
      ['corrige-enonce', r.question.enonce],
      ['corrige-donne-neutre', `Ta réponse : ${r.donnee}`],
      ['corrige-merlin', `${enFrancais(r.points)}/1 — ${r.commentaire}`],
      ['corrige-attendu', `Corrigé : ${r.question.attenduLibelle}`],
    ]) {
      const p = document.createElement('p');
      p.className = classe;
      p.textContent = texte;
      li.append(p);
    }
    redactions.append(li);
  }

  zone.querySelector('[data-action="rejouer"]').addEventListener('click', () => surFin({ rejouer: true }));
  zone.querySelector('[data-action="retour"]').addEventListener('click', () => surFin(null));
}

// --- Écran de fin -----------------------------------------------------------

function afficherResume({ zone, etape, mode, reponses, score, resultatDefi, surFin }) {
  // Les écritures sont déjà sauvegardées au fil de l'eau ; la fin de séance est
  // un jalon, on n'attend pas le regroupement. Silencieux et sans blocage — ce
  // n'est pas au résultat de la séance d'attendre après un disque.
  sauvegarderMaintenant().catch(() => {});

  const justes = reponses.filter((r) => r.correct).length;
  const xp = reponses.reduce((total, r) => total + r.gain.xpGagnes, 0);
  const badges = reponses.flatMap((r) => r.gain.nouveauxBadges).concat(resultatDefi?.nouveauxBadges ?? []);
  const reussi = score >= SEUIL_DEFI;

  const rates = reponses.filter((r) => !r.correct);

  zone.innerHTML = `
    <div class="resume">
      <p class="resume-emoji">${mode === 'defi' ? (reussi ? '🏆' : '💪') : '✨'}</p>
      <h2 class="resume-titre">${titreDeFin(mode, reussi, score)}</h2>
      <p class="resume-score">${justes} bonne${justes > 1 ? 's' : ''} réponse${justes > 1 ? 's' : ''} sur ${reponses.length}</p>
      <p class="resume-xp">+${xp} XP</p>
      ${badges.length ? `<div class="resume-badges">${badges.map(badgeGagne).join('')}</div>` : ''}
      ${rates.length ? `
        <div class="resume-revoir">
          <h3>À revoir</h3>
          <ul>${rates.map((r) => `<li><strong>${r.question.attenduLibelle}</strong> — ${r.question.enonce}</li>`).join('')}</ul>
        </div>` : ''}
      <div class="resume-actions">
        <button class="bouton bouton--principal" data-action="rejouer" type="button">Recommencer</button>
        <button class="bouton" data-action="retour" type="button">Retour à l'étape</button>
      </div>
    </div>`;

  zone.querySelector('[data-action="rejouer"]').addEventListener('click', () => surFin({ rejouer: true, etape, mode }));
  zone.querySelector('[data-action="retour"]').addEventListener('click', () => surFin({ etape }));
}

const badgeGagne = (badge) => `
  <div class="badge-gagne">
    <span class="badge-gagne-icone">${badge.icone}</span>
    <span class="badge-gagne-nom">Badge débloqué : ${badge.nom}</span>
  </div>`;

function titreDeFin(mode, reussi, score) {
  if (mode !== 'defi') return 'Séance terminée';
  return reussi
    ? 'Défi réussi !'
    : `Encore un effort — il faut ${Math.round(SEUIL_DEFI * 100)} % (tu as ${Math.round(score * 100)} %)`;
}
