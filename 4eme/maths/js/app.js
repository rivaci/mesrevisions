// Prototype maths 4e — une séance, à faire jouer par l'élève-pilote.
//
// Ce qu'on cherche à valider n'est pas la couverture du programme, c'est la
// mécanique de la charte : est-ce que le contre-exemple numérique fonctionne
// comme geste, ou est-ce qu'il devient un rituel de clics ?
//
// D'où le choix central de cet écran : après une erreur, l'élève CALCULE
// lui-même les deux valeurs avant de voir le verdict. Une substitution
// exécutée par la machine serait une animation ; exécutée par lui, c'est un
// moyen de contrôle qu'il emporte en contrôle, sans l'appli.

import SEANCE from './data/seance-prototype.js';
import { PIEGES } from './data/pieges.js';
import { apresReponse, estAcquis, etatInitial, fileDeRemediation } from './srs.js';
import { contreExemple } from './verification.js';

const CLE = 'maths4e.prototype';
const app = document.getElementById('app');

// ── État ────────────────────────────────────────────────────────────────────

const chargerProfil = () => {
  try {
    return JSON.parse(localStorage.getItem(CLE)) ?? null;
  } catch {
    return null;
  }
};

const profilNeuf = () => ({
  pieges: {},
  seance: 1,
  // Les latences ne sont JAMAIS montrées à l'élève : pas de chronomètre, pas
  // de score de vitesse. Elles servent à distinguer « il sait » de « il
  // recompte sur ses doigts », signal que le récap parents peut restituer.
  latences: {},
});

let profil = chargerProfil() ?? profilNeuf();
const sauver = () => localStorage.setItem(CLE, JSON.stringify(profil));

const etatDuPiege = (id) => profil.pieges[id] ?? etatInitial();

let vue = { ecran: 'accueil' };

// ── Déroulé de la séance ────────────────────────────────────────────────────

/** Le rituel de cette séance : les automatismes du socle qui sont dus.
 *
 *  À la première séance tout est dû, donc tout est servi. C'est ensuite que la
 *  répétition espacée prend son sens — et c'est précisément ce que le
 *  prototype ne peut pas encore valider avec une seule séance. */
function rituelDuJour() {
  const dus = new Set(
    fileDeRemediation(
      [...new Set(SEANCE.rituel.map((r) => r.piege))].map((id) => ({ id, etat: etatDuPiege(id) })),
      profil.seance,
    ).map((e) => e.id),
  );
  const retenus = SEANCE.rituel.filter((r) => dus.has(r.piege));
  return retenus.length ? retenus : SEANCE.rituel.slice(0, 2);
}

const melanger = (liste) => {
  const copie = [...liste];
  for (let i = copie.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
};

let parcours = [];
let index = 0;

function demarrer() {
  parcours = [
    ...rituelDuJour().map((ex) => ({ ...ex, phase: 'rituel' })),
    { phase: 'rappel', rappel: SEANCE.rappels[0] },
    ...SEANCE.exercices.map((ex) => ({ ...ex, phase: 'coeur' })),
  ];
  index = 0;
  avancer();
}

function avancer() {
  if (index >= parcours.length) {
    vue = { ecran: 'fin' };
    return rendre();
  }
  const etape = parcours[index];
  if (etape.phase === 'rappel') {
    vue = { ecran: 'rappel', rappel: etape.rappel };
  } else if (etape.type === 'calcul') {
    vue = { ecran: 'rituel', ex: etape, saisie: '', depart: Date.now(), erreur: false };
  } else {
    vue = { ecran: 'exercice', ex: etape, options: melanger(etape.options) };
  }
  rendre();
}

const suivant = () => {
  index += 1;
  avancer();
};

// ── Réponses ────────────────────────────────────────────────────────────────

function enregistrer(piegeId, correct, palier, latence) {
  if (!piegeId) return;
  profil.pieges[piegeId] = apresReponse(etatDuPiege(piegeId), correct, profil.seance, palier);
  if (latence != null) {
    profil.latences[piegeId] = [...(profil.latences[piegeId] ?? []), latence].slice(-10);
  }
  sauver();
}

function repondreRituel() {
  const { ex, depart } = vue;
  const valeur = Number.parseInt(vue.saisie, 10);
  if (Number.isNaN(valeur)) return;
  const correct = valeur === ex.attendu;
  enregistrer(ex.piege, correct, 1, Date.now() - depart);
  if (correct) return suivant();
  vue = { ecran: 'pourquoi', ex, choix: null, option: null };
  rendre();
}

function repondreQcm(option) {
  const { ex } = vue;
  enregistrer(ex.piege, !!option.correct, ex.palier ?? 1);
  if (option.correct) return suivant();
  vue = { ecran: 'pourquoi', ex, option, choix: null };
  rendre();
}

function choisirRaisonnement(raisonnement) {
  const { ex, option } = vue;
  const attendu = ex.options?.find((o) => o.correct);
  // Le contre-exemple n'existe que si les deux écritures sont évaluables : au
  // registre numérique il n'y a rien à substituer, et « on ne peut pas
  // conclure » ne se réfute pas par un nombre.
  const ce = option?.evaluer && attendu?.evaluer && option.temoin != null
    ? contreExemple(option, attendu, option.temoin)
    : null;
  vue = ce
    ? { ecran: 'contre-exemple', ex, option, raisonnement, ce, sien: '', juste: '', essais: 0 }
    : { ecran: 'regle', ex, raisonnement, ce: null };
  rendre();
}

function verifierContreExemple() {
  const { ce } = vue;
  const sien = Number.parseInt(vue.sien, 10);
  const juste = Number.parseInt(vue.juste, 10);
  if (Number.isNaN(sien) || Number.isNaN(juste)) return;
  if (sien === ce.sien && juste === ce.juste) {
    vue = { ...vue, ecran: 'regle' };
  } else {
    // On ne bloque pas : deux essais, puis on montre. L'objectif est le geste,
    // pas la performance de calcul mental.
    vue = { ...vue, essais: vue.essais + 1 };
    if (vue.essais >= 2) vue = { ...vue, ecran: 'regle', revele: true };
  }
  rendre();
}

// ── Rendu ───────────────────────────────────────────────────────────────────

const echapper = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/** Le gras des rappels, sans embarquer un moteur markdown pour trois étoiles. */
const enrichir = (s) => echapper(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

const champNombre = (id, valeur, etiquette) => `
  <div class="champ">
    <label for="${id}">${echapper(etiquette)}</label>
    <div class="champ-saisie">
      <button type="button" class="signe" data-signe="${id}" aria-label="Changer le signe">±</button>
      <input id="${id}" data-champ="${id}" value="${echapper(valeur)}"
             type="text" inputmode="numeric" autocomplete="off" spellcheck="false">
    </div>
  </div>`;

function rendre() {
  app.innerHTML = ecran();
  const premier = app.querySelector('input');
  if (premier) premier.focus();
}

function ecran() {
  switch (vue.ecran) {
    case 'accueil': return vueAccueil();
    case 'rituel': return vueRituel();
    case 'rappel': return vueRappel();
    case 'exercice': return vueExercice();
    case 'pourquoi': return vuePourquoi();
    case 'contre-exemple': return vueContreExemple();
    case 'regle': return vueRegle();
    case 'fin': return vueFin();
    default: return '';
  }
}

const vueAccueil = () => `
  <header class="entete">
    <div class="entete-titre">
      <h1>Maths — vers la 3<sup>e</sup></h1>
      <p>Prototype, séance ${SEANCE.numero}</p>
    </div>
  </header>
  <section class="carte">
    <h2>${echapper(SEANCE.titre)}</h2>
    <p>${echapper(SEANCE.objectif)}</p>
    <p class="note">Compte une dizaine de minutes. Tu peux t'arrêter quand tu veux, ça se garde.</p>
    <button class="principal" data-action="demarrer">Commencer</button>
  </section>`;

const vueRituel = () => `
  <header class="entete-mince"><p>Pour s'échauffer</p></header>
  <section class="carte">
    <p class="consigne">Calcule.</p>
    <p class="expression">${echapper(vue.ex.enonce)}</p>
    ${champNombre('reponse', vue.saisie, 'Ta réponse')}
    <button class="principal" data-action="valider-rituel">Valider</button>
  </section>`;

const vueRappel = () => `
  <section class="carte">
    <h2>${echapper(vue.rappel.titre)}</h2>
    ${vue.rappel.texte.split('\n\n').map((p) => `<p>${enrichir(p)}</p>`).join('')}
    <ul class="exemples">
      ${vue.rappel.exemples.map((e) => `
        <li><span class="exemple-phrase">${enrichir(e.phrase)}</span>
            <span class="exemple-note">${enrichir(e.note)}</span></li>`).join('')}
    </ul>
    <button class="principal" data-action="suivant">J'ai compris</button>
  </section>`;

function vueExercice() {
  const { ex, options } = vue;
  const enonce = ex.type === 'outil'
    ? `<p class="enonce">${echapper(ex.enonce)}</p>`
    : `<p class="expression">${echapper(ex.expression)}</p>`;
  return `
    <header class="entete-mince"><p>${ex.palier >= 4 ? 'À toi de voir' : 'Exercice'}</p></header>
    <section class="carte">
      <p class="consigne">${echapper(ex.consigne)}</p>
      ${enonce}
      <div class="options">
        ${options.map((o, i) => `
          <button class="option" data-option="${i}">${echapper(o.texte)}</button>`).join('')}
      </div>
    </section>`;
}

function vuePourquoi() {
  const piege = PIEGES[vue.ex.piege];
  return `
    <section class="carte">
      <p class="verdict-faux">Ce n'est pas ça.</p>
      <p class="consigne">Pourquoi as-tu répondu ça ?</p>
      <div class="options">
        ${piege.raisonnements.map((r, i) => `
          <button class="option option-douce" data-raisonnement="${i}">${echapper(r.texte)}</button>`).join('')}
      </div>
    </section>`;
}

function vueContreExemple() {
  const { ce, raisonnement, essais } = vue;
  const aide = essais > 0
    ? `<p class="aide">Remplace la lettre par ${ce.temoin} dans chaque écriture, puis calcule.</p>`
    : '';
  return `
    <section class="carte">
      <p class="reponse-raisonnement">${echapper(raisonnement.reponse)}</p>
      <hr>
      <p class="consigne">Vérifions-le toi-même. On remplace la lettre par <strong>${ce.temoin}</strong>.</p>
      ${champNombre('sien', vue.sien, `Ce que tu as écrit, ${ce.texteSien}, vaut`)}
      ${champNombre('juste', vue.juste, `Et ${ce.texteJuste} vaut`)}
      ${aide}
      <button class="principal" data-action="verifier-ce">Vérifier</button>
    </section>`;
}

function vueRegle() {
  const piege = PIEGES[vue.ex.piege];
  const { ce, raisonnement, revele } = vue;
  const bloc = ce
    ? `<p class="constat">
         Avec ${ce.temoin} : <strong>${ce.texteSien}</strong> donne ${ce.sien},
         <strong>${ce.texteJuste}</strong> donne ${ce.juste}.
         ${ce.sien !== ce.juste ? "Ce n'est pas la même chose — donc les deux écritures ne sont pas égales." : ''}
       </p>${revele ? '<p class="aide">Pas grave pour le calcul : ce qui compte, c\'est le réflexe.</p>' : ''}`
    : `<p class="reponse-raisonnement">${echapper(raisonnement.reponse)}</p>`;
  return `
    <section class="carte">
      ${bloc}
      <p class="regle">${enrichir(piege.regle)}</p>
      <p class="geste"><strong>Le réflexe :</strong> ${echapper(piege.geste)}</p>
      <button class="principal" data-action="suivant">Continuer</button>
    </section>`;
}

function vueFin() {
  const entrees = Object.entries(profil.pieges).map(([id, etat]) => ({ id, etat }));
  const acquis = entrees.filter((e) => estAcquis(e.etat));
  const fragiles = entrees.filter((e) => !estAcquis(e.etat) && e.etat.echecs > 0);
  return `
    <section class="carte">
      <h2>Séance terminée</h2>
      <p>Tu as travaillé ${entrees.length} points. ${acquis.length ? `${acquis.length} sont en bonne voie.` : ''}</p>
      ${fragiles.length ? `
        <p class="consigne">À revoir la prochaine fois :</p>
        <ul class="bilan">
          ${fragiles.map((f) => `<li>${echapper(PIEGES[f.id]?.nom ?? f.id)}</li>`).join('')}
        </ul>` : '<p>Rien à revoir pour l\'instant.</p>'}
      <p class="note">Une seule séance ne suffit pas à juger : la répétition espacée
        ne se voit qu'à partir de la deuxième.</p>
      <button class="principal" data-action="rejouer">Recommencer</button>
    </section>`;
}

// ── Interactions ────────────────────────────────────────────────────────────

app.addEventListener('click', (e) => {
  const cible = e.target.closest('[data-action], [data-option], [data-raisonnement], [data-signe]');
  if (!cible) return;

  if (cible.dataset.signe) {
    const champ = app.querySelector(`[data-champ="${cible.dataset.signe}"]`);
    const v = champ.value.trim();
    champ.value = v.startsWith('-') ? v.slice(1) : `-${v}`;
    majSaisie(cible.dataset.signe, champ.value);
    return;
  }
  if (cible.dataset.option != null) return repondreQcm(vue.options[Number(cible.dataset.option)]);
  if (cible.dataset.raisonnement != null) {
    return choisirRaisonnement(PIEGES[vue.ex.piege].raisonnements[Number(cible.dataset.raisonnement)]);
  }

  switch (cible.dataset.action) {
    case 'demarrer': return demarrer();
    case 'suivant': return suivant();
    case 'valider-rituel': return repondreRituel();
    case 'verifier-ce': return verifierContreExemple();
    case 'rejouer':
      profil.seance += 1;
      sauver();
      return demarrer();
  }
});

const majSaisie = (champ, valeur) => {
  if (champ === 'reponse') vue.saisie = valeur;
  else vue[champ] = valeur;
};

app.addEventListener('input', (e) => {
  if (e.target.dataset.champ) majSaisie(e.target.dataset.champ, e.target.value);
});

app.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' || !e.target.dataset.champ) return;
  e.preventDefault();
  if (vue.ecran === 'rituel') repondreRituel();
  else if (vue.ecran === 'contre-exemple') verifierContreExemple();
});

rendre();
