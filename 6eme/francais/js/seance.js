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
import { monterChat } from './chat.js';
import { animerPhrase, meilleureVoixFr } from './animation.js';
import { sauvegarderMaintenant } from '../../../commun/sauvegarde.js';
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
      // Quitter n'est pas terminer : sinon la séance se cochait comme faite.
      store.abandonnerSeance();
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
    const reprise = choisirReprise(exercice, dejaJoues, seance.numero);
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
      <div class="anim-hote"></div>
      <div class="rappel-texte">${enrichir(rappel.texte)}</div>
      ${(rappel.exemples ?? []).map((ex) => `
        <div class="exemple">
          <p class="exemple-phrase">${enrichir(ex.phrase)}</p>
          <p class="exemple-note">${enrichir(ex.note)}</p>
        </div>`).join('')}
      <button class="bouton bouton--principal" type="button">J'ai compris</button>`;
    zone.append(bloc);

    // L'animation MONTRE ce que le texte décrit — elle le complète, elle ne le
    // remplace pas : le texte reste là pour la relecture, et l'appli reste
    // entière si l'animation ne se joue pas.
    let animation = null;
    if (rappel.animation) {
      animation = animerPhrase(bloc.querySelector('.anim-hote'), rappel.animation);
    }
    bloc.querySelector('button').addEventListener('click', () => {
      animation?.arreter();
      ensuite();
    });
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

    // La dictée a son propre déroulé : elle diagnostique par point de contrôle
    // et affiche les mots à revoir, sans passer par le dialogue « pourquoi
    // as-tu répondu ça ? » qui n'a de sens que pour un piège unique.
    if (exercice.type === 'dictee') {
      rendreDictee(bloc, exercice, correction, ensuite);
      bloc.append(correction);
      return;
    }

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
    else rendreQcm(bloc, exercice, surReponse);

    bloc.append(correction);
  }

  async function terminer() {
    const resume = store.terminerSeance();
    entete.innerHTML = '';
    afficherResume(zone, resume, surFin);
    // Les écritures sont déjà sauvegardées au fil de l'eau ; la fin de séance
    // est un jalon, on n'attend pas le regroupement.
    sauvegarderMaintenant().catch(() => {});
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
    // Sans `reprise: true` : un exercice de remédiation raté doit pouvoir, lui
    // aussi, déclencher une phrase neuve. Ce drapeau sert à empêcher une reprise
    // d'en engendrer une autre — une remédiation n'est pas une reprise.
    for (const exercice of remediation) etapes.push({ type: 'exercice', exercice });
  }

  for (const rappel of seance.rappels) {
    etapes.push({ type: 'rappel', rappel });
    // Les exercices de RÉSERVE ne sont pas joués dans le parcours : ils sont
    // gardés intacts pour la remédiation et les reprises. Sans eux, une séance
    // consommait tous ses exercices et il ne restait jamais rien de neuf à
    // reproposer — la reprise en début de séance ne se déclenchait donc jamais.
    //
    // Tri par palier, et non ordre du fichier : une séance se joue du facile au
    // difficile, et un exercice ajouté à la fin du tableau se retrouvait sinon
    // joué après des exercices plus durs que lui. Le tri de JavaScript est
    // stable, donc l'ordre d'écriture est conservé à palier égal.
    const duRappel = seance.exercices
      .filter((e) => e.rappel === rappel.id && !e.reserve)
      .sort((a, b) => (a.palier ?? 0) - (b.palier ?? 0));
    for (const exercice of duRappel) {
      etapes.push({ type: 'exercice', exercice });
    }
  }

  // Exercices sans rappel rattaché (dictées notamment).
  const orphelins = seance.exercices.filter((e) => !e.rappel && !e.reserve);
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
      // Une phrase d'une séance déjà faite, ou une phrase de réserve — jamais
      // une phrase du parcours qu'il n'a pas encore atteinte, sinon on la lui
      // dévoile et on la retire de la séance où elle devait servir.
      .filter((ex) => (ex.reserve ? ex.seance <= numeroSeanceParcours : ex.seance < numeroSeanceParcours))
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

  // Combien de mots l'élève doit désigner. Certains exercices en demandent deux
  // (« Touche les deux sujets ») : au premier clic, l'ancien code figeait déjà
  // la phrase et comptait juste — impossible d'en toucher un second.
  const cible = exercice.attendus.length;
  const attendus = new Set(exercice.attendus);
  const choisis = new Set();
  let repondu = false;

  const jetons = exercice.mots.map((mot, i) => {
    const jeton = document.createElement('button');
    jeton.type = 'button';
    jeton.className = 'mot';
    jeton.textContent = mot;
    jeton.addEventListener('click', () => {
      if (repondu) return;
      if (cible === 1) return conclure([i]);
      // Plusieurs mots à désigner : on sélectionne, et l'on ne tranche qu'une
      // fois le bon nombre atteint. Tant qu'on n'y est pas, un clic bascule.
      if (choisis.has(i)) { choisis.delete(i); jeton.classList.remove('est-choisi'); }
      else { choisis.add(i); jeton.classList.add('est-choisi'); }
      if (choisis.size === cible) conclure([...choisis]);
    });
    phrase.append(jeton);
    return jeton;
  });

  function conclure(indices) {
    repondu = true;
    const juste = indices.length === attendus.size && indices.every((i) => attendus.has(i));
    for (const i of indices) jetons[i].classList.remove('est-choisi');
    for (const i of indices) jetons[i].classList.add(juste ? 'est-juste' : 'est-faux');
    if (!juste) for (const bon of attendus) jetons[bon].classList.add('est-attendu');
    phrase.classList.add('est-fige');
    surReponse(indices.map((i) => exercice.mots[i]).join(' '), juste);
  }

  if (cible > 1) {
    const aide = document.createElement('p');
    aide.className = 'toucher-aide';
    aide.textContent = `Touche les ${cible} mots.`;
    bloc.append(aide);
  }
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

function rendreDictee(bloc, exercice, correction, ensuite) {
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

    // La dictée elle-même compte pour une réponse dans le score, sans piège :
    // c'est la garde de enregistrerReponse qui empêche la clé « undefined ».
    store.enregistrerReponse({
      piegeId: exercice.piege, // volontairement absent sur les dictées
      exerciceId: exercice.id,
      correct: juste,
      palier: exercice.palier ?? 3,
      reponseDonnee: champ.value.trim(),
    });

    // La correction va dans le bloc prévu, à sa place — avant, elle était
    // insérée après le verdict et le bouton « Continuer », donc au-dessus.
    correction.className = `correction est-visible ${juste ? 'est-juste' : 'est-faux'}`;
    correction.innerHTML = `
      <p class="dictee-attendu">${exercice.texte}</p>
      ${rates.length
        ? `<p class="dictee-bilan">${rates.length} mot${rates.length > 1 ? 's' : ''} à revoir : ${rates.map((r) => `<strong>${r.mot}</strong>`).join(', ')}</p>`
        : '<p class="dictee-bilan est-juste">Aucune erreur sur les points difficiles.</p>'}
      <button class="bouton bouton--principal" type="button">Continuer</button>`;
    const bouton = correction.querySelector('button');
    bouton.addEventListener('click', ensuite);
    bouton.focus();
  });

  ecouter.addEventListener('click', () => champ.focus(), { once: true });
  bloc.append(commandes, champ, valider);
}

/**
 * Compare la dictée mot à mot et renvoie les points de contrôle manqués.
 *
 * Exporté pour être testé sans navigateur : c'est un comparateur subtil, et une
 * dictée est le seul exercice où l'appli juge du texte libre.
 */
export function pointsRates(saisie, exercice) {
  const decouper = (s) => normaliser(s).replace(/[.,;:!?«»"'’]/g, ' ').split(/\s+/).filter(Boolean);
  const modele = decouper(exercice.texte);
  const ecrits = decouper(saisie);
  const alignable = modele.length === ecrits.length;

  let curseur = 0;
  return (exercice.pointsControle ?? [])
    .map((point) => {
      const cible = normaliser(point.mot);
      const pos = modele.indexOf(cible, curseur);
      if (pos !== -1) curseur = pos + 1;

      // Quand l'élève a écrit le bon nombre de mots, on compare CHAQUE mot à sa
      // place. « son » et « sont » deviennent distincts : les intervertir est une
      // vraie erreur, même si les deux figurent dans la phrase. C'est aussi ce qui
      // permet de montrer le mot exact écrit à la place, fût-il d'une lettre
      // (« à » pour « a »), là où l'ancien repêchage renvoyait « (manquant) ».
      if (alignable && pos !== -1) {
        return ecrits[pos] === cible ? null : { ...point, ecrit: ecrits[pos] };
      }

      // Longueur différente (un mot ajouté ou oublié décale tout) : l'alignement
      // par position n'est plus sûr. On retombe sur « le mot est-il présent ? »
      // pour ne pas signaler à tort un mot correct qui a simplement glissé.
      if (ecrits.includes(cible)) return null;
      const proche = ecrits.find((m) => m !== cible && m.slice(0, 3) === cible.slice(0, 3));
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
  // La même sélection que les animations : la meilleure voix française
  // disponible, pas la première venue — pour une dictée, ça compte double.
  const voixFr = meilleureVoixFr();
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
  const libelle = reprise ? 'On réessaie sur une autre phrase' : 'Continuer';

  // Quand Merlin est branché, on n'affiche PAS l'explication préécrite : elle
  // clignoterait une seconde avant d'être remplacée. On montre qu'il réfléchit,
  // et le bouton n'apparaît qu'une fois sa réponse (ou son échec) arrivée.
  const avecMerlin = ia.disponible();

  // Certains exercices portent leur propre explication, quand l'explication
  // générique du piège ne suffit pas — ainsi ses/ces, que le test de
  // remplacement ne tranche pas : les deux donnent une phrase correcte.
  const preecrite = exercice.explication ?? raisonnement.reponse;

  correction.innerHTML = `
    <p class="verdict">✗ La réponse était : <strong>${reponseAttendue(exercice)}</strong></p>
    <p class="raisonnement-choisi">Tu as répondu : « ${raisonnement.texte} »</p>
    <div class="explication">${avecMerlin ? indicateurMerlin() : enrichir(preecrite)}</div>
    <p class="geste">${avecMerlin ? '' : piege.geste}</p>
    <button class="bouton bouton--principal" type="button" ${avecMerlin ? 'hidden' : ''}>${libelle}</button>`;

  const bouton = correction.querySelector('button');
  const revelerBouton = () => {
    bouton.hidden = false;
    bouton.addEventListener('click', ensuite);
    bouton.focus();
  };

  if (!avecMerlin) return revelerBouton();

  ia.expliquerErreur({
    profilTexte,
    exercice: {
      consigne: exercice.consigne,
      enonce: enonceLisible(exercice),
      attendu: reponseAttendue(exercice),
      objectif: exercice.explication,
    },
    piege,
    reponseDonnee,
    raisonnement,
    dejaDit: store.echangesRecents(exercice.piege),
  }).then((r) => {
    if (!correction.isConnected) return;
    const zone = correction.querySelector('.explication');
    const geste = correction.querySelector('.geste');

    if (r.disponible) {
      zone.innerHTML = enrichir(r.donnees.explication);
      // Merlin peut joindre une animation de la phrase ratée : le geste montré
      // sur SA phrase, pas sur un exemple générique. Elle se joue sous le texte.
      if (r.donnees.animation) {
        const hote = document.createElement('div');
        zone.append(hote);
        animerPhrase(hote, r.donnees.animation);
      }
      geste.textContent = r.donnees.geste || piege.geste;
      store.memoriserEchange({
        piegeId: exercice.piege,
        question: enonceLisible(exercice),
        explication: r.donnees.explication,
      });
      // Une fois l'explication là, l'élève peut relancer Merlin sur CET exercice.
      // On lui passe ce que Merlin vient de dire : c'est le début de la
      // conversation, pour lui comme pour le récapitulatif des parents.
      ajouterLanceurChat(
        correction,
        contexteExercice(exercice, piege, reponseDonnee),
        profilTexte,
        r.donnees.explication,
      );
    } else {
      // Merlin n'a pas répondu (pas de réseau, quota, délai dépassé) : on
      // retombe sur l'explication préécrite plutôt que de laisser un vide.
      zone.innerHTML = enrichir(preecrite);
      geste.textContent = piege.geste;
    }
    revelerBouton();
  });
}

/**
 * Ce que Merlin doit savoir de l'exercice pour répondre à une relance.
 *
 * Objet et non chaîne : il sert AUSSI à l'écran parents, qui doit pouvoir
 * afficher la phrase et l'erreur en clair plutôt qu'un bloc de texte destiné
 * au modèle.
 */
const contexteExercice = (exercice, piege, reponseDonnee) => ({
  consigne: exercice.consigne,
  phrase: enonceLisible(exercice),
  attendu: reponseAttendue(exercice),
  donnee: reponseDonnee,
  piege: piege.nom,
  regle: piege.regle,
});

/** Un discret « Une question à Merlin ? » qui déplie le chat, ancré à l'exercice. */
function ajouterLanceurChat(correction, contexte, profilTexte, amorce) {
  if (correction.querySelector('.chat')) return;
  const lanceur = document.createElement('button');
  lanceur.type = 'button';
  lanceur.className = 'lien-discret chat-lanceur';
  lanceur.textContent = 'Une question à Merlin ?';
  const principal = correction.querySelector('.bouton--principal');
  correction.insertBefore(lanceur, principal);
  lanceur.addEventListener('click', () => {
    const panneau = document.createElement('div');
    lanceur.replaceWith(panneau);
    monterChat({ conteneur: panneau, contexte, profilTexte, amorce });
  });
}

/** L'attente pendant que le modèle répond. Le nom donne un visage à l'aide. */
const indicateurMerlin = () => `
  <span class="reflexion">
    <span class="reflexion-chapeau" aria-hidden="true">🎩</span>
    <span>Merlin réfléchit<span class="points"><span>.</span><span>.</span><span>.</span></span></span>
  </span>`;

/**
 * Une phrase neuve portant le même piège — jamais celle qu'il vient de rater,
 * et jamais tirée d'une séance qu'il n'a pas encore atteinte : sinon la reprise
 * lui montre une notion pas encore vue, la marque comme rencontrée, et la retire
 * de la file de remédiation.
 */
function choisirReprise(exercice, dejaJoues, seanceMax) {
  const candidats = exercicesDuPiege(exercice.piege).filter(
    (ex) => !dejaJoues.has(ex.id) && !ex.neutre && ex.seance <= seanceMax,
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
