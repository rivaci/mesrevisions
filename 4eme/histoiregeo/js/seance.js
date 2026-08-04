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
import { enregistrerReponse, enregistrerDefi, etatItem } from './store.js';
import { ordonnerPourSeance } from './srs.js';

const LONGUEUR_SEANCE = 12;
const LONGUEUR_DEFI = 20;

export const MODES = {
  decouverte: { nom: 'Découvrir', icone: '💡', description: 'Des cartes à retourner, sans note' },
  entrainement: { nom: "S'entraîner", icone: '🎯', description: 'Des questions avec correction expliquée' },
  defi: { nom: 'Défi', icone: '🏆', description: "Sans aide : réussis-le pour valider l'étape" },
};

/**
 * Lance une séance dans `conteneur`.
 * `surFin(resume)` est appelé quand l'élève quitte l'écran de résultat.
 */
export function lancerSeance({ etape, mode, conteneur, surFin }) {
  const questions = preparerQuestions(etape, mode);
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
      ${mode !== 'decouverte' ? `<span class="seance-score">✓ ${justes}</span>` : ''}`;
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
      surReponse: (correct) => {
        // Le défi ne fait pas exception : ses réponses nourrissent aussi la
        // répétition espacée, sinon l'élève réviserait deux fois la même chose.
        const gain = enregistrerReponse(question.cle, correct);
        reponses.push({ question, correct, gain });
      },
      surSuite: () => { index += 1; suivante(); },
    });
  };

  const terminer = () => {
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
    // Le défi évalue l'étape entière : on tire au hasard dans tout le lot,
    // sans privilégier ce qui est mal su, pour que le score soit représentatif.
    return melanger(items)
      .slice(0, LONGUEUR_DEFI)
      .map((entree) => construireQuestion(entree));
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
  return afficherQcm({ question, mode, zone, surReponse, surSuite });
}

/** Carte à retourner : l'élève juge lui-même s'il savait. */
function afficherFlashcard({ question, zone, surReponse, surSuite }) {
  const modele = question.theme;

  const carte = document.createElement('div');
  carte.className = 'flashcard';
  carte.innerHTML = `
    <p class="flashcard-recto">${modele.question(question.item)}</p>
    <button class="bouton bouton--principal" type="button">Voir la réponse</button>`;
  zone.append(carte);

  carte.querySelector('button').addEventListener('click', () => {
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
    const [rate, reussi] = carte.querySelectorAll('.flashcard-choix button');
    rate.addEventListener('click', () => { surReponse(false); surSuite(); });
    reussi.addEventListener('click', () => { surReponse(true); surSuite(); });
  });
}

/** Question cartographique : l'élève clique la bonne zone. */
async function afficherQuestionCarte({ question, mode, zone, surReponse, surSuite }) {
  const { carte: config } = question.theme;
  const donnees = await chargerCarte(config.fichier);

  const enonce = document.createElement('p');
  enonce.className = 'question-enonce';
  enonce.textContent = question.enonce;

  const correction = document.createElement('div');
  correction.className = 'correction';

  let repondu = false;
  const carte = dessinerCarte(donnees, config.couche, {
    cibleRenforcee: question.attendu,
    surClic: (id) => {
      if (repondu) return;
      repondu = true;
      const correct = id === question.attendu;
      carte.marquerReponse(id, correct);
      if (!correct) carte.revelerCible(question.attendu);
      carte.figer();
      surReponse(correct);
      afficherCorrection({ correction, question, correct, mode, surSuite });
    },
  });

  const cadre = document.createElement('div');
  cadre.className = 'carte-cadre';
  cadre.append(carte.element);
  zone.append(enonce, cadre, correction);
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
      bouton.classList.add(correct ? 'est-juste' : 'est-faux');
      if (!correct) {
        [...liste.children]
          .find((b) => b.textContent === question.attendu)
          ?.classList.add('est-attendu');
      }
      liste.classList.add('est-fige');
      surReponse(correct);
      afficherCorrection({ correction, question, correct, mode, surSuite });
    });
    liste.append(bouton);
  }

  zone.append(liste, correction);
}

/** Retour après réponse. Le défi reste sobre : pas d'explication pendant l'épreuve. */
function afficherCorrection({ correction, question, correct, mode, surSuite }) {
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

// --- Écran de fin -----------------------------------------------------------

function afficherResume({ zone, etape, mode, reponses, score, resultatDefi, surFin }) {
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
