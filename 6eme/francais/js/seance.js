// Déroulé d'une séance.
//
// Structure : on reprend d'abord ce qui résiste, puis un micro-rappel est suivi
// immédiatement de ses exercices. Jamais la leçon complète en tête de séance —
// elle serait défilée sans être lue.
//
// ── Le dialogue après une erreur ──────────────────────────────────────────
//
// Anto se trompe → on lui demande POURQUOI il a choisi ça, par options guidées.
// Chaque option correspond à une confusion réelle, donc l'appli sait exactement
// quoi corriger. La réponse préécrite s'affiche INSTANTANÉMENT, et si l'IA est
// joignable son explication vient la remplacer quelques secondes après. Pas de
// roue qui tourne, pas de temps mort, et l'exercice reste jouable hors ligne.
//
// Puis reprise sur une phrase NEUVE portant le même piège — jamais la même,
// sinon on testerait sa mémoire de la correction et non la règle.

import { PIEGES } from './data/pieges.js';
import { exercicesDuPiege } from './data/seances/index.js';
import { enonceLisible, reponseAttendue } from './exercice.js';
import { profilPourIA } from './memoire.js';
import * as store from './store.js';
import * as ia from './ia.js';

const MAX_REMEDIATION = 4;

/**
 * Plafond de reprises par séance.
 *
 * Sans lui, une séance ne se termine jamais : chaque reprise ratée en insère
 * une nouvelle, qui ratée en insère une autre. C'est justement l'élève en
 * difficulté — celui pour qui l'appli est faite — qui se retrouverait enfermé.
 * Passé ce plafond, la notion revient en début de séance suivante plutôt que
 * de s'acharner tout de suite.
 */
const MAX_REPRISES = 5;

export function lancerSeance({ seance, conteneur, surFin }) {
  const suivi = store.demarrerSeance(seance.numero);
  const etapes = construireEtapes(seance);
  const profilTexte = profilPourIA(store.profil(), store.tousLesPieges(), suivi.numero);

  let index = 0;
  const dejaJoues = new Set();

  conteneur.innerHTML = '';
  const entete = document.createElement('header');
  entete.className = 'seance-entete';
  const zone = document.createElement('div');
  zone.className = 'seance-zone';
  conteneur.append(entete, zone);

  const majEntete = () => {
    const total = etapes.filter((e) => e.type === 'exercice').length;
    const faits = etapes.slice(0, index).filter((e) => e.type === 'exercice').length;
    entete.innerHTML = `
      <button class="bouton-retour" type="button" aria-label="Quitter">←</button>
      <div class="jauge"><div class="jauge-remplie" style="width:${total ? (faits / total) * 100 : 0}%"></div></div>
      <span class="compteur">${faits}/${total}</span>`;
    entete.querySelector('.bouton-retour').addEventListener('click', () => {
      store.terminerSeance();
      surFin(null);
    });
  };

  const suivante = () => {
    if (index >= etapes.length) return terminer();
    majEntete();
    const etape = etapes[index];
    zone.innerHTML = '';
    zone.scrollIntoView({ block: 'start' });

    if (etape.type === 'rappel') return afficherRappel(etape, avancer);
    if (etape.type === 'transition') return afficherTransition(etape, avancer);
    return afficherExercice(etape.exercice, avancer, Boolean(etape.reprise));
  };

  const avancer = () => { index += 1; suivante(); };

  let reprisesFaites = 0;

  /**
   * Insère une phrase neuve portant le même piège, juste après l'exercice raté.
   * Renvoie l'exercice inséré, ou null si on n'en propose pas.
   *
   * Deux refus possibles, et les deux comptent : on ne rebondit jamais sur une
   * reprise (sinon la boucle est infinie), et on s'arrête au plafond de la
   * séance.
   */
  const proposerReprise = (exercice, estDejaUneReprise) => {
    if (estDejaUneReprise || reprisesFaites >= MAX_REPRISES) return null;
    const reprise = choisirReprise(exercice, dejaJoues);
    if (!reprise) return null;
    reprisesFaites += 1;
    etapes.splice(index + 1, 0, { type: 'exercice', exercice: reprise, reprise: true });
    return reprise;
  };

  function afficherRappel(etape, ensuite) {
    const { rappel } = etape;
    const bloc = document.createElement('section');
    bloc.className = 'rappel';
    bloc.innerHTML = `
      <p class="rappel-etiquette">${etape.reprise ? 'On reprend' : 'À retenir'}</p>
      <h2>${rappel.titre}</h2>
      <div class="rappel-texte">${enrichir(rappel.texte)}</div>
      ${(rappel.exemples ?? []).map((ex) => `
        <div class="exemple">
          <p class="exemple-phrase">${enrichir(ex.phrase)}</p>
          <p class="exemple-note">${enrichir(ex.note)}</p>
        </div>`).join('')}
      <button class="bouton bouton--principal" type="button">J'ai compris</button>`;
    zone.append(bloc);
    bloc.querySelector('button').addEventListener('click', ensuite);
  }

  function afficherTransition(etape, ensuite) {
    const bloc = document.createElement('section');
    bloc.className = 'transition';
    bloc.innerHTML = `<p>${etape.texte}</p>
      <button class="bouton bouton--principal" type="button">C'est parti</button>`;
    zone.append(bloc);
    bloc.querySelector('button').addEventListener('click', ensuite);
  }

  function afficherExercice(exercice, ensuite, estUneReprise) {
    dejaJoues.add(exercice.id);
    const bloc = document.createElement('section');
    bloc.className = 'exercice';
    bloc.innerHTML = `<p class="consigne">${exercice.consigne}</p>`;
    zone.append(bloc);

    const correction = document.createElement('div');
    correction.className = 'correction';

    const surReponse = (reponseDonnee, correct) => {
      store.enregistrerReponse({
        piegeId: exercice.piege,
        exerciceId: exercice.id,
        correct,
        palier: exercice.palier ?? 1,
        reponseDonnee,
      });
      if (correct) return afficherReussite(correction, exercice, ensuite);
      return ouvrirDialogue({
        exercice, reponseDonnee, correction, ensuite, profilTexte,
        proposerReprise: () => proposerReprise(exercice, estUneReprise),
      });
    };

    if (exercice.type === 'completer') rendreCompleter(bloc, exercice, surReponse);
    else if (exercice.type === 'toucher') rendreToucher(bloc, exercice, surReponse);
    else if (exercice.type === 'dictee') rendreDictee(bloc, exercice, surReponse);
    else rendreQcm(bloc, exercice, surReponse);

    bloc.append(correction);
  }

  async function terminer() {
    const resume = store.terminerSeance();
    entete.innerHTML = '';
    afficherResume(zone, resume, surFin);
    // La mémoire n'est réécrite qu'ici, une fois par séance : c'est ce qui
    // permet de la garder dans la partie mise en cache du prompt.
    if (resume && ia.disponible()) {
      const r = await ia.consoliderMemoire({
        profilTexte,
        resume,
        ratesDetail: resume.ratesDetail ?? [],
      });
      if (r.disponible) store.consoliderMemoire(r.donnees);
    }
  }

  suivante();
}

// --- Construction du parcours de la séance ----------------------------------

function construireEtapes(seance) {
  const etapes = [];

  const remediation = choisirRemediation(seance.numero);
  if (remediation.length) {
    // Un piège peut revenir sans avoir jamais été raté : la répétition espacée
    // repasse aussi ce qui est réussi mais pas encore acquis. Annoncer « ce qui
    // a résisté » dans ce cas-là accuse l'élève d'une erreur qu'il n'a pas faite.
    const aResiste = remediation.some((ex) => store.etatPiege(ex.piege).echecs > 0);
    etapes.push({
      type: 'transition',
      texte: aResiste
        ? (remediation.length > 1
          ? 'On commence par reprendre ce qui a résisté la dernière fois.'
          : 'On commence par reprendre le point qui a résisté la dernière fois.')
        : 'On commence par revoir deux ou trois choses déjà vues, pour qu\'elles tiennent.',
    });
    for (const exercice of remediation) etapes.push({ type: 'exercice', exercice, reprise: true });
  }

  for (const rappel of seance.rappels) {
    etapes.push({ type: 'rappel', rappel });
    for (const exercice of seance.exercices.filter((e) => e.rappel === rappel.id)) {
      etapes.push({ type: 'exercice', exercice });
    }
  }

  // Exercices sans rappel rattaché (dictées notamment).
  const orphelins = seance.exercices.filter((e) => !e.rappel);
  for (const exercice of orphelins) etapes.push({ type: 'exercice', exercice });

  return etapes;
}

/** Les exercices de reprise : pièges dus et non acquis, sur des phrases jamais vues. */
function choisirRemediation(numeroSeanceParcours) {
  const etat = store.lireEtat();
  const choisis = [];

  for (const { id } of store.piegesARevoir()) {
    if (choisis.length >= MAX_REMEDIATION) break;
    const candidats = exercicesDuPiege(id)
      .filter((ex) => ex.seance < numeroSeanceParcours)
      .filter((ex) => etat.exercicesVus[ex.id] === undefined);
    if (candidats.length) choisis.push(candidats[Math.floor(Math.random() * candidats.length)]);
  }
  return choisis;
}

// --- Rendu des exercices ----------------------------------------------------

const normaliser = (s) => s.trim().toLowerCase().replace(/\s+/g, ' ');

const estJuste = (donnee, exercice) =>
  [exercice.attendu, ...(exercice.variantes ?? [])].some(
    (a) => normaliser(a) === normaliser(donnee),
  );

function rendreCompleter(bloc, exercice, surReponse) {
  const phrase = document.createElement('p');
  phrase.className = 'phrase';
  phrase.innerHTML = `<span>${exercice.avant ?? ''}</span>`;

  const champ = document.createElement('input');
  champ.type = 'text';
  champ.className = 'saisie';
  champ.autocapitalize = 'off';
  champ.autocomplete = 'off';
  champ.spellcheck = false;
  champ.setAttribute('aria-label', 'Ta réponse');
  phrase.append(champ);

  if (exercice.verbe) {
    const indice = document.createElement('span');
    indice.className = 'verbe';
    indice.textContent = ` (${exercice.verbe})`;
    phrase.append(indice);
  }
  phrase.insertAdjacentHTML('beforeend', `<span>${exercice.apres ?? ''}</span>`);

  const valider = document.createElement('button');
  valider.type = 'button';
  valider.className = 'bouton bouton--principal';
  valider.textContent = 'Valider';

  let repondu = false;
  const envoyer = () => {
    if (repondu || !champ.value.trim()) return;
    repondu = true;
    const juste = estJuste(champ.value, exercice);
    champ.classList.add(juste ? 'est-juste' : 'est-faux');
    champ.disabled = true;
    valider.remove();
    surReponse(champ.value.trim(), juste);
  };

  valider.addEventListener('click', envoyer);
  champ.addEventListener('keydown', (e) => { if (e.key === 'Enter') envoyer(); });

  bloc.append(phrase, valider);
  champ.focus();
}

function rendreToucher(bloc, exercice, surReponse) {
  const phrase = document.createElement('p');
  phrase.className = 'phrase phrase--mots';

  let repondu = false;
  exercice.mots.forEach((mot, i) => {
    const jeton = document.createElement('button');
    jeton.type = 'button';
    jeton.className = 'mot';
    jeton.textContent = mot;
    jeton.addEventListener('click', () => {
      if (repondu) return;
      repondu = true;
      const juste = exercice.attendus.includes(i);
      jeton.classList.add(juste ? 'est-juste' : 'est-faux');
      if (!juste) {
        for (const bon of exercice.attendus) phrase.children[bon].classList.add('est-attendu');
      }
      phrase.classList.add('est-fige');
      surReponse(mot, juste);
    });
    phrase.append(jeton);
  });

  bloc.append(phrase);
}

function rendreQcm(bloc, exercice, surReponse) {
  // Le qcm reprend le cadre de phrase du completer — `avant` / `apres` — avec
  // un trou à la place de la saisie. Sans ça, l'élève ne verrait que les
  // boutons : « serai / serais » ne veut rien dire hors de sa phrase.
  if (exercice.avant !== undefined || exercice.apres !== undefined) {
    bloc.insertAdjacentHTML('beforeend',
      `<p class="phrase"><span>${exercice.avant ?? ''}</span>`
      + `<span class="trou">…</span>`
      + `<span>${exercice.apres ?? ''}</span></p>`);
  } else if (exercice.phrase) {
    bloc.insertAdjacentHTML('beforeend', `<p class="phrase">${enrichir(exercice.phrase)}</p>`);
  }
  const liste = document.createElement('div');
  liste.className = 'choix';

  let repondu = false;
  for (const choix of exercice.choix) {
    const bouton = document.createElement('button');
    bouton.type = 'button';
    bouton.className = 'choix-bouton';
    bouton.textContent = choix;
    bouton.addEventListener('click', () => {
      if (repondu) return;
      repondu = true;
      const juste = normaliser(choix) === normaliser(exercice.attendu);
      bouton.classList.add(juste ? 'est-juste' : 'est-faux');
      if (!juste) {
        [...liste.children]
          .find((b) => normaliser(b.textContent) === normaliser(exercice.attendu))
          ?.classList.add('est-attendu');
      }
      liste.classList.add('est-fige');
      surReponse(choix, juste);
    });
    liste.append(bouton);
  }
  bloc.append(liste);
}

function rendreDictee(bloc, exercice, surReponse) {
  const commandes = document.createElement('div');
  commandes.className = 'dictee-commandes';
  commandes.innerHTML = `
    <button class="bouton bouton--ecouter" type="button">🔊 Écouter</button>
    <button class="bouton bouton--lent" type="button">🐢 Plus lentement</button>`;

  const [ecouter, lent] = commandes.querySelectorAll('button');
  ecouter.addEventListener('click', () => lire(exercice.texte, 0.9));
  lent.addEventListener('click', () => lire(exercice.texte, 0.6));

  const champ = document.createElement('textarea');
  champ.className = 'saisie saisie--dictee';
  champ.rows = 3;
  champ.setAttribute('aria-label', 'Écris la phrase');

  const valider = document.createElement('button');
  valider.type = 'button';
  valider.className = 'bouton bouton--principal';
  valider.textContent = 'Valider';

  let repondu = false;
  valider.addEventListener('click', () => {
    if (repondu || !champ.value.trim()) return;
    repondu = true;
    champ.disabled = true;
    valider.remove();

    const rates = pointsRates(champ.value, exercice);
    const juste = rates.length === 0;
    champ.classList.add(juste ? 'est-juste' : 'est-faux');

    // Chaque point de contrôle raté fait reculer SON piège : une dictée n'est
    // pas une note globale, c'est un diagnostic par difficulté. Mais il ne
    // compte pas comme une réponse de plus dans le score de la séance, sinon
    // six phrases dictées s'afficheraient « sur 34 ».
    for (const point of rates) {
      store.enregistrerReponse({
        piegeId: point.piege,
        exerciceId: `${exercice.id}:${point.mot}`,
        correct: false,
        palier: exercice.palier ?? 3,
        reponseDonnee: point.ecrit ?? '(manquant)',
        horsScore: true,
      });
    }

    bloc.insertAdjacentHTML('beforeend', `
      <div class="dictee-correction">
        <p class="dictee-attendu">${exercice.texte}</p>
        ${rates.length
          ? `<p class="dictee-bilan">${rates.length} mot${rates.length > 1 ? 's' : ''} à revoir : ${rates.map((r) => `<strong>${r.mot}</strong>`).join(', ')}</p>`
          : '<p class="dictee-bilan est-juste">Aucune erreur sur les points difficiles.</p>'}
      </div>`);

    surReponse(champ.value.trim(), juste);
  });

  ecouter.addEventListener('click', () => champ.focus(), { once: true });
  bloc.append(commandes, champ, valider);
}

/** Compare mot à mot et renvoie les points de contrôle manqués. */
function pointsRates(saisie, exercice) {
  const mots = normaliser(saisie).replace(/[.,;:!?]/g, ' ').split(' ').filter(Boolean);
  return (exercice.pointsControle ?? [])
    .map((point) => {
      const attendu = normaliser(point.mot);
      if (mots.includes(attendu)) return null;
      // On cherche ce qu'il a écrit à la place, pour le lui montrer.
      const proche = mots.find((m) => m.slice(0, 3) === attendu.slice(0, 3));
      return { ...point, ecrit: proche };
    })
    .filter(Boolean);
}

const lire = (texte, vitesse) => {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const message = new SpeechSynthesisUtterance(texte);
  message.lang = 'fr-FR';
  message.rate = vitesse;
  const voixFr = speechSynthesis.getVoices().find((v) => v.lang.startsWith('fr'));
  if (voixFr) message.voice = voixFr;
  speechSynthesis.speak(message);
};

// --- Correction et dialogue -------------------------------------------------

function afficherReussite(correction, exercice, ensuite) {
  correction.className = 'correction est-visible est-juste';
  correction.innerHTML = `
    <p class="verdict">✓ Bonne réponse</p>
    <button class="bouton bouton--principal" type="button">Continuer</button>`;
  const bouton = correction.querySelector('button');
  bouton.addEventListener('click', ensuite);
  bouton.focus();
}

function ouvrirDialogue({ exercice, reponseDonnee, correction, ensuite, proposerReprise, profilTexte }) {
  const piege = PIEGES[exercice.piege];
  correction.className = 'correction est-visible est-faux';

  if (!piege) {
    correction.innerHTML = `
      <p class="verdict">✗ La réponse était : <strong>${reponseAttendue(exercice)}</strong></p>
      <button class="bouton bouton--principal" type="button">Continuer</button>`;
    correction.querySelector('button').addEventListener('click', ensuite);
    return;
  }

  correction.innerHTML = `
    <p class="verdict">✗ La réponse était : <strong>${reponseAttendue(exercice)}</strong></p>
    <p class="question-raisonnement">Pourquoi as-tu choisi ça&nbsp;?</p>
    <div class="raisonnements">
      ${piege.raisonnements.map((r) => `
        <button class="raisonnement" type="button" data-id="${r.id}">${r.texte}</button>`).join('')}
    </div>`;

  correction.querySelector('.raisonnements').addEventListener('click', (evenement) => {
    const bouton = evenement.target.closest('[data-id]');
    if (!bouton) return;
    const raisonnement = piege.raisonnements.find((r) => r.id === bouton.dataset.id);
    repondreAuRaisonnement({
      exercice, piege, raisonnement, reponseDonnee, correction, ensuite,
      proposerReprise, profilTexte,
    });
  });
}

function repondreAuRaisonnement({ exercice, piege, raisonnement, reponseDonnee, correction, ensuite, proposerReprise, profilTexte }) {
  // Le raisonnement est journalisé SANS recompter l'erreur : elle l'a déjà été
  // au moment de la réponse. C'est le signal le plus utile du résumé parents —
  // « au hasard », un enfant le coche mais ne l'écrirait jamais.
  store.enregistrerRaisonnement(raisonnement.id);

  const reprise = proposerReprise();

  correction.innerHTML = `
    <p class="verdict">✗ La réponse était : <strong>${reponseAttendue(exercice)}</strong></p>
    <p class="raisonnement-choisi">Tu as répondu : « ${raisonnement.texte} »</p>
    <div class="explication">${enrichir(raisonnement.reponse)}</div>
    <p class="geste">${piege.geste}</p>
    <button class="bouton bouton--principal" type="button">
      ${reprise ? 'On réessaie sur une autre phrase' : 'Continuer'}
    </button>`;
  const bouton = correction.querySelector('button');
  bouton.addEventListener('click', ensuite);
  bouton.focus();

  // L'explication préécrite est déjà à l'écran : si l'IA répond, elle la
  // remplace. Si elle ne répond pas, rien ne bouge et rien ne bloque.
  if (!ia.disponible()) return;

  ia.expliquerErreur({
    profilTexte,
    exercice: {
      consigne: exercice.consigne,
      enonce: enonceLisible(exercice),
      attendu: reponseAttendue(exercice),
    },
    piege,
    reponseDonnee,
    raisonnement,
    dejaDit: store.echangesRecents(exercice.piege),
  }).then((r) => {
    if (!r.disponible || !correction.isConnected) return;
    const zone = correction.querySelector('.explication');
    const geste = correction.querySelector('.geste');
    if (zone) zone.innerHTML = enrichir(r.donnees.explication);
    if (geste && r.donnees.geste) geste.textContent = r.donnees.geste;
    store.memoriserEchange({
      piegeId: exercice.piege,
      question: enonceLisible(exercice),
      explication: r.donnees.explication,
    });
  });
}

/** Une phrase neuve portant le même piège — jamais celle qu'il vient de rater. */
function choisirReprise(exercice, dejaJoues) {
  const candidats = exercicesDuPiege(exercice.piege).filter(
    (ex) => !dejaJoues.has(ex.id) && !ex.neutre,
  );
  return candidats.length ? candidats[Math.floor(Math.random() * candidats.length)] : null;
}


// --- Fin de séance ----------------------------------------------------------

function afficherResume(zone, resume, surFin) {
  if (!resume) return surFin(null);
  const total = resume.reussites + resume.echecs;
  const hasard = resume.raisonnements?.hasard ?? 0;

  zone.innerHTML = `
    <div class="resume">
      <p class="resume-emoji">${resume.echecs === 0 ? '🎯' : '💪'}</p>
      <h2>Séance terminée</h2>
      <p class="resume-score">${resume.reussites} bonne${resume.reussites > 1 ? 's' : ''} réponse${resume.reussites > 1 ? 's' : ''} sur ${total}</p>
      ${resume.typeDominant ? `
        <p class="resume-type">Ce qui a le plus coincé : <strong>${resume.typeDominant.nom}</strong></p>` : ''}
      ${hasard ? `<p class="resume-note">Tu as répondu au hasard ${hasard} fois — la prochaine fois, essaie le geste avant de valider.</p>` : ''}
      ${resume.aRevoir.length ? `
        <p class="resume-suite">Ce qui t'a piégé aujourd'hui, on le refait au début de la prochaine séance :
        ${resume.aRevoir.join(', ')}.</p>` : ''}
      ${!resume.aRevoir.length && resume.echecs === 0 ? `
        <p class="resume-suite">Rien à reprendre : la prochaine séance ira de l'avant.</p>` : ''}
      <button class="bouton bouton--principal" type="button">Retour</button>
    </div>`;
  zone.querySelector('button').addEventListener('click', () => surFin(resume));
}

/** Gras minimal : **texte** → <strong>. Les contenus sont écrits par nous, pas saisis. */
const enrichir = (texte) =>
  (texte ?? '').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n\n/g, '</p><p>');
