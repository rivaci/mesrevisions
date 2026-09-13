// Le Défi de fin de bloc — la récompense.
//
// ── Ce qu'il récompense, et ce qu'il ne récompense pas ────────────────────
//
// On renforce ce qu'on récompense. Une récompense donnée pour avoir TERMINÉ un
// bloc apprendrait à cliquer vite — exactement ce que le reste de l'appli
// combat, elle qui n'accorde un piège qu'après trois réussites consécutives,
// dans deux séances distinctes, au palier le plus dur.
//
// Le Défi ne tire donc que sur les pièges déjà domptés, avec des phrases de la
// réserve qu'il n'a jamais vues. Ce n'est pas un examen, c'est un tour
// d'honneur : il gagne parce qu'il sait. Et rappeler du matériel acquis sous
// contrainte de temps est précisément ce que la répétition espacée demande.
//
// ── Il ne touche pas à la progression ─────────────────────────────────────
//
// Le Défi LIT l'état des pièges, il ne l'écrit jamais. Deux raisons.
//
// Si une erreur au chrono faisait reculer un piège, la récompense deviendrait
// une punition, et l'élève apprendrait à ne pas y jouer. Surtout : une faute
// commise en huit secondes n'est pas une faute de méthode, c'est une faute de
// vitesse. Les confondre salirait le diagnostic que l'écran parents affiche.
//
// ── Il s'adapte, il ne filtre pas ─────────────────────────────────────────
//
// Deux pièges domptés font un défi court, dix en font un long. Personne n'en
// est privé : l'élève en difficulté — celui pour qui l'appli est faite — est
// justement celui qu'un seuil aurait exclu.

import { estAcquis } from './srs.js';
import { rendreQcm, rendreToucher } from './seance.js';
import { PIEGES } from './data/pieges.js';

// Un défi se joue au pouce, au chronomètre. Un exercice à trou demande le
// clavier : trop lent, et la faute de frappe y compterait comme une erreur.
const TYPES_RAPIDES = new Set(['qcm', 'toucher']);

export const QUESTIONS_PAR_PIEGE = 3;
export const MINIMUM = 4;
export const MAXIMUM = 15;

/** Secondes accordées par question. Assez pour lire, trop peu pour hésiter. */
export const SECONDES = 10;
export const VIES = 3;

/**
 * Les pièges du bloc, du mieux tenu au plus fragile.
 *
 * Les acquis d'abord — c'est d'eux que le tour d'honneur est fait. Les autres
 * ensuite, par nombre de réussites : quand trop peu sont acquis, ce sont eux
 * qui allongent le défi plutôt que de le laisser vide.
 */
export function classerPieges(pieges) {
  const score = (p) => (estAcquis(p.etat) ? 1000 : 0) + (p.etat.reussites ?? 0);
  return [...pieges]
    .filter((p) => (p.etat.reussites ?? 0) + (p.etat.echecs ?? 0) > 0)
    .sort((a, b) => score(b) - score(a));
}

/**
 * Compose la manche : quelques questions par piège, les phrases neuves
 * d'abord.
 *
 * `tirage` permet au test de rendre la sélection déterministe ; par défaut,
 * deux défis d'affilée ne proposent pas les mêmes phrases.
 */
export function composerDefi({
  pieges,
  exercices,
  dejaVus = new Set(),
  parPiege = QUESTIONS_PAR_PIEGE,
  minimum = MINIMUM,
  maximum = MAXIMUM,
  tirage = Math.random,
}) {
  const classes = classerPieges(pieges);
  const disponibles = exercices.filter((e) => TYPES_RAPIDES.has(e.type) && e.piege);

  // Une phrase jamais vue vaut mieux qu'une phrase reconnue : sinon le défi
  // teste la mémoire de la correction, pas la règle.
  const valeur = (e) => (dejaVus.has(e.id) ? 0 : 2) + (e.reserve ? 1 : 0);

  const choisies = [];
  for (const piege of classes) {
    const lot = disponibles
      .filter((e) => e.piege === piege.id)
      .map((e) => ({ e, rang: valeur(e) + tirage() }))
      .sort((a, b) => b.rang - a.rang)
      .slice(0, parPiege)
      .map((x) => x.e);
    choisies.push(...lot);
    if (choisies.length >= maximum) break;
  }

  // Trop court pour faire une manche : on complète avec le reste du bloc
  // plutôt que d'annoncer un défi de deux questions.
  if (choisies.length < minimum) {
    const dejaPris = new Set(choisies.map((e) => e.id));
    const secours = disponibles
      .filter((e) => !dejaPris.has(e.id))
      .map((e) => ({ e, rang: valeur(e) + tirage() }))
      .sort((a, b) => b.rang - a.rang)
      .slice(0, minimum - choisies.length)
      .map((x) => x.e);
    choisies.push(...secours);
  }

  return melanger(choisies.slice(0, maximum), tirage);
}

/** Mélange sans biais (Fisher-Yates) : enchaîner un piège d'affilée le donnerait. */
export function melanger(liste, tirage = Math.random) {
  const copie = [...liste];
  for (let i = copie.length - 1; i > 0; i -= 1) {
    const j = Math.floor(tirage() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

/**
 * Le multiplicateur de série : ×1, puis ×2 après trois bonnes réponses
 * d'affilée, ×3 après six. Plafonné — au-delà, le score ne veut plus rien dire
 * et une seule erreur coûterait une manche entière.
 */
export const multiplicateur = (serie) => Math.min(3, 1 + Math.floor(serie / 3));

export const pointsPourUneReponse = (serie) => 10 * multiplicateur(serie);

/** Le score maximal atteignable sur une manche, pour situer le sien. */
export function scoreParfait(nombreQuestions) {
  let total = 0;
  for (let i = 0; i < nombreQuestions; i += 1) total += pointsPourUneReponse(i);
  return total;
}

// --- La manche (DOM) --------------------------------------------------------

/**
 * Joue une manche dans `conteneur`. Rend une fonction d'arrêt : quitter l'écran
 * en cours de manche ne doit pas laisser un chronomètre tourner dans le vide.
 */
export function lancerDefi({ bloc, questions, conteneur, surFin }) {
  let index = 0;
  let score = 0;
  let serie = 0;
  let meilleureSerie = 0;
  let vies = VIES;
  let minuterie = null;
  let fini = false;
  const domptes = new Set();

  conteneur.innerHTML = `
    <header class="defi-entete">
      <button class="bouton-retour" type="button" aria-label="Quitter">←</button>
      <span class="defi-vies" aria-label="Vies restantes"></span>
      <span class="defi-score">0</span>
    </header>
    <div class="defi-chrono"><div class="defi-chrono-jauge"></div></div>
    <p class="defi-serie" hidden></p>
    <div class="defi-zone"></div>`;

  const vuesVies = conteneur.querySelector('.defi-vies');
  const vueScore = conteneur.querySelector('.defi-score');
  const vueSerie = conteneur.querySelector('.defi-serie');
  const jauge = conteneur.querySelector('.defi-chrono-jauge');
  const zone = conteneur.querySelector('.defi-zone');

  const arreterChrono = () => {
    if (minuterie) { clearTimeout(minuterie); minuterie = null; }
    jauge.style.transition = 'none';
    jauge.style.width = '100%';
  };

  const arreter = () => { fini = true; arreterChrono(); };

  conteneur.querySelector('.bouton-retour').addEventListener('click', () => {
    arreter();
    surFin(null);
  });

  const majEntete = () => {
    vuesVies.textContent = '❤️'.repeat(vies) + '🖤'.repeat(VIES - vies);
    vueScore.textContent = String(score);
    vueSerie.hidden = serie < 3;
    vueSerie.textContent = `Série de ${serie} — ×${multiplicateur(serie)}`;
  };

  const terminer = () => {
    arreter();
    surFin({
      score,
      meilleureSerie,
      questionsPosees: index,
      questionsTotal: questions.length,
      parfait: scoreParfait(questions.length),
      viesRestantes: vies,
      pieges: [...domptes],
    });
  };

  /**
   * Une réponse : juste, fausse, ou jamais donnée. Le temps écoulé compte comme
   * une erreur — sans quoi il suffirait d'attendre pour ne jamais perdre de vie.
   */
  const repondre = (correct, exercice) => {
    if (fini) return;
    arreterChrono();
    if (correct) {
      score += pointsPourUneReponse(serie);
      serie += 1;
      meilleureSerie = Math.max(meilleureSerie, serie);
      if (exercice?.piege) domptes.add(exercice.piege);
    } else {
      vies -= 1;
      serie = 0;
    }
    majEntete();
    // Le temps de voir la correction que l'exercice vient d'afficher.
    minuterie = setTimeout(() => {
      if (vies <= 0) return terminer();
      index += 1;
      return poser();
    }, correct ? 700 : 1600);
  };

  function poser() {
    if (fini) return;
    if (index >= questions.length) return terminer();
    const exercice = questions[index];

    zone.innerHTML = '';
    const carte = document.createElement('section');
    carte.className = 'exercice exercice--defi';
    carte.innerHTML = `
      <p class="defi-compteur">${index + 1} / ${questions.length}</p>
      <p class="consigne">${exercice.consigne}</p>`;
    zone.append(carte);

    const surReponse = (_donnee, correct) => repondre(correct, exercice);
    if (exercice.type === 'toucher') rendreToucher(carte, exercice, surReponse);
    else rendreQcm(carte, exercice, surReponse);

    // La jauge part pleine et se vide : le chronomètre se voit, il ne se lit pas.
    jauge.style.transition = 'none';
    jauge.style.width = '100%';
    requestAnimationFrame(() => {
      jauge.style.transition = `width ${SECONDES}s linear`;
      jauge.style.width = '0%';
    });
    minuterie = setTimeout(() => {
      // Fige l'exercice comme le ferait une réponse, pour que la bonne réponse
      // reste visible pendant qu'on enchaîne.
      carte.querySelectorAll('button').forEach((b) => { b.disabled = true; });
      repondre(false, exercice);
    }, SECONDES * 1000);

    majEntete();
    return undefined;
  }

  majEntete();
  poser();
  return arreter;
}

/** Le mot de la fin, qui dépend de ce qu'il a fait — jamais « bravo » à vide. */
export function motDeLaFin(resultat) {
  if (!resultat) return '';
  const noms = resultat.pieges.map((id) => PIEGES[id]?.nom ?? id);
  if (resultat.score >= resultat.parfait) {
    return 'Sans faute, et sans une seconde de trop. Il n\'y avait rien de plus à faire.';
  }
  if (resultat.viesRestantes > 0) {
    return `Manche terminée. Tu as tenu sur : ${noms.join(', ')}.`;
  }
  return noms.length
    ? `Trois vies, c'est court. Tu as quand même tenu sur : ${noms.join(', ')}.`
    : 'Trois vies, c\'est court. Refais une séance et reviens — ces phrases-là t\'attendent.';
}
