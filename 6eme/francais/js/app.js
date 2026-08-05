// Navigation et écrans.
//
// Une seule page, navigation par fragment d'URL : GitHub Pages sert le site
// sans configuration et le bouton « retour » du navigateur fonctionne.

import { SEANCES, BLOCS, seanceParNumero } from './data/seances/index.js';
import { PIEGES } from './data/pieges.js';
import { lancerSeance } from './seance.js';
import { pointsQuiResistent } from './memoire.js';
import { estAcquis } from './srs.js';
import * as store from './store.js';
import * as ia from './ia.js';
import * as eleve from './eleve.js';

const app = document.getElementById('app');

const routes = [
  { motif: /^\/$/, ecran: accueil },
  { motif: /^\/seance\/(\d+)$/, ecran: (n) => seance(Number(n)) },
  { motif: /^\/parents$/, ecran: parents },
  { motif: /^\/reglages$/, ecran: reglages },
];

const ECRANS_PARENTS = ['/parents', '/reglages'];

function router() {
  const chemin = location.hash.slice(1) || '/';
  app.innerHTML = '';

  // Tant que l'élève ne s'est pas présenté, il n'y a rien d'autre à faire.
  if (!eleve.estConfigure()) { bienvenue(); return; }

  // Le code parental est un rideau, pas une serrure : il évite que l'enfant
  // tombe par hasard sur la liste de ses difficultés et sur ce que l'IA a noté
  // de lui. Sur un site statique, il ne prétend à rien de plus.
  if (ECRANS_PARENTS.includes(chemin) && !eleve.estDeverrouille()) {
    demanderCode(chemin);
    return;
  }

  for (const { motif, ecran } of routes) {
    const trouve = chemin.match(motif);
    if (trouve) {
      ecran(...trouve.slice(1));
      window.scrollTo(0, 0);
      return;
    }
  }
  aller('/');
}

const aller = (chemin) => { location.hash = chemin; };
window.addEventListener('hashchange', router);

// --- Accueil ----------------------------------------------------------------

function accueil() {
  const moi = eleve.eleve();
  const etat = store.lireEtat();
  const taux = store.progressionGlobale();
  const resiste = pointsQuiResistent(store.tousLesPieges(), 3);

  app.append(html(`
    <header class="entete">
      <span class="avatar" aria-hidden="true">${moi.avatar}</span>
      <div class="entete-titre">
        <h1>Salut ${echapper(moi.prenom)} !</h1>
        <p>Le verbe et les accords</p>
      </div>
      <nav class="entete-actions">
        <a class="lien-entete" href="#/parents">Parents</a>
        <a class="bouton-icone" href="#/reglages" aria-label="Réglages" title="Réglages">⚙️</a>
      </nav>
    </header>

    <section class="tableau-bord">
      <div class="carte-stat carte-stat--large">
        <span class="stat-valeur">${Math.round(taux * 100)} %</span>
        <span class="stat-detail">des difficultés maîtrisées</span>
        <div class="jauge"><div class="jauge-remplie" style="width:${taux * 100}%"></div></div>
      </div>
      <div class="carte-stat">
        <span class="stat-valeur">${etat.numeroSeance}</span>
        <span class="stat-detail">séance${etat.numeroSeance > 1 ? 's' : ''} faite${etat.numeroSeance > 1 ? 's' : ''}</span>
      </div>
    </section>

    ${resiste.length ? `
      <section class="focus">
        <h2>Ce qui résiste en ce moment</h2>
        <ul>${resiste.map((p) => `<li><strong>${p.nom}</strong><span>${p.detail}</span></li>`).join('')}</ul>
        <p class="focus-note">On les reprend au début de chaque séance.</p>
      </section>` : ''}

    ${BLOCS.map(carteBloc).join('')}

    <footer class="pied">
      <p>${ia.disponible()
        ? 'Merlin t\'explique tes erreurs, rien que pour toi.'
        : 'Mode hors ligne : les explications sont préécrites.'}</p>
    </footer>`));
}

function carteBloc(bloc) {
  const etat = store.lireEtat();
  return `
    <section class="bloc">
      <h2 class="bloc-titre"><span class="bloc-numero">${bloc.numero}</span> ${bloc.titre}</h2>
      <ol class="seances">
        ${bloc.seances.map((n) => {
          const s = seanceParNumero(n);
          if (!s) return '';
          const faite = n < etat.seanceCourante;
          const ouverte = n <= etat.seanceCourante;
          return `
            <li class="seance-carte ${faite ? 'est-faite' : ''} ${ouverte ? '' : 'est-verrouillee'}">
              <a href="${ouverte ? `#/seance/${n}` : '#/'}" ${ouverte ? '' : 'aria-disabled="true"'}>
                <span class="seance-numero">${faite ? '✓' : ouverte ? n : '🔒'}</span>
                <span class="seance-corps">
                  <span class="seance-titre">${s.titre}</span>
                  <span class="seance-soustitre">${s.sousTitre ?? ''}</span>
                </span>
              </a>
            </li>`;
        }).join('')}
      </ol>
    </section>`;
}

// --- Séance -----------------------------------------------------------------

function seance(numero) {
  const s = seanceParNumero(numero);
  if (!s || numero > store.lireEtat().seanceCourante) return aller('/');

  app.innerHTML = '';
  const conteneur = document.createElement('main');
  conteneur.className = 'seance';
  app.append(conteneur);

  lancerSeance({ seance: s, conteneur, surFin: () => aller('/') });
}

// --- Écran parents ----------------------------------------------------------

function parents() {
  const derniere = store.derniereSeance();
  const profil = store.profil();
  const journal = [...store.journal()].reverse();

  app.append(html(`
    <header class="entete entete--secondaire">
      <a class="bouton-retour" href="#/" aria-label="Retour">←</a>
      <div class="entete-titre"><h1>Suivi ${echapper(eleve.de())}</h1></div>
    </header>

    ${derniere ? bilanSeance(derniere) : '<p class="vide">Aucune séance pour l\'instant.</p>'}

    <h2 class="titre-section">Ce que l'appli a retenu</h2>
    <p class="avertissement">
      Ces observations sont écrites par l'IA au fil des séances. Elles peuvent se
      tromper — supprime celles qui ne correspondent pas à ton enfant.
    </p>
    ${listeNotes('Ce qui marche pour lui', 'marche', profil.francais.marche)}
    ${listeNotes('Déjà essayé sans effet', 'aEviter', profil.francais.aEviter)}
    ${listeNotes('Comment il apprend', 'transversal', profil.transversal.notes)}

    <h2 class="titre-section">Difficultés suivies</h2>
    <ul class="liste-pieges">
      ${store.tousLesPieges().filter((p) => p.etat.reussites + p.etat.echecs > 0).map((p) => `
        <li class="${estAcquis(p.etat) ? 'est-acquis' : ''}">
          <span class="piege-nom">${PIEGES[p.id]?.nom ?? p.id}</span>
          <span class="piege-chiffres">${p.etat.reussites} ✓ · ${p.etat.echecs} ✗</span>
        </li>`).join('') || '<li class="vide">Rien encore.</li>'}
    </ul>

    ${journal.length > 1 ? `
      <h2 class="titre-section">Séances précédentes</h2>
      <ul class="historique">
        ${journal.slice(1).map((s) => `
          <li>
            <span class="historique-date">${s.date}</span>
            <span class="historique-score">${s.reussites}/${s.reussites + s.echecs}</span>
            <span class="historique-type">${s.typeDominant?.nom ?? '—'}</span>
          </li>`).join('')}
      </ul>` : ''}

    <div class="actions-parents">
      <button class="bouton bouton--principal" data-action="exporter" type="button">Copier le bilan</button>
      <button class="lien-discret" data-action="raz" type="button">Tout remettre à zéro</button>
    </div>
    <p class="pied">
      Tout est stocké sur cet appareil. Vider les données de navigation efface le suivi —
      d'où le bouton de copie ci-dessus.
    </p>`));

  app.querySelector('[data-action="exporter"]').addEventListener('click', exporterBilan);
  app.querySelector('[data-action="raz"]').addEventListener('click', () => {
    if (confirm(`Effacer toute la progression et la mémoire ${eleve.de()} ? La clé d'API est conservée.`)) {
      store.reinitialiser();
      router();
    }
  });
  // Délégation sur le conteneur : les listes de notes sont réécrites à chaque
  // suppression, un écouteur par bouton serait perdu au rendu suivant.
  app.addEventListener('click', (evenement) => {
    const bouton = evenement.target.closest('[data-oublier]');
    if (!bouton) return;
    store.oublierNote(bouton.dataset.couche, bouton.dataset.oublier);
    router();
  });
}

function bilanSeance(s) {
  const hasard = s.raisonnements?.hasard ?? 0;
  return `
    <section class="bilan">
      <h2>Dernière séance — ${s.date}</h2>
      <p class="bilan-ligne"><strong>${s.reussites} réussites, ${s.echecs} erreurs</strong> en ${s.duree} min.</p>
      ${s.typeDominant
        ? `<p class="bilan-ligne">Les erreurs portent surtout sur : <strong>${s.typeDominant.nom}</strong> (${s.typeDominant.echecs} fois).</p>`
        : '<p class="bilan-ligne">Aucune erreur.</p>'}
      ${hasard
        ? `<p class="bilan-ligne bilan-alerte">Il a coché « au hasard » ${hasard} fois. C'est le signal à surveiller : il devine au lieu d'appliquer la méthode.</p>`
        : ''}
      ${s.aRevoir?.length
        ? `<p class="bilan-ligne">Sera repris au début de la prochaine séance : ${s.aRevoir.join(', ')}.</p>`
        : ''}
    </section>`;
}

function listeNotes(titre, couche, notes) {
  if (!notes?.length) return '';
  return `
    <section class="notes">
      <h3>${titre}</h3>
      <ul>${notes.map((n) => `
        <li>
          <span>${n.texte}</span>
          <button class="oublier" type="button" data-oublier="${n.id}" data-couche="${couche}"
                  aria-label="Supprimer cette observation">×</button>
        </li>`).join('')}</ul>
    </section>`;
}

function exporterBilan() {
  const profil = store.profil();
  const lignes = [
    `SUIVI ${eleve.de().toUpperCase()} — FRANÇAIS 6e`,
    `Export du ${new Date().toLocaleDateString('fr-FR')}`,
    '',
    'SÉANCES',
    ...store.journal().map((s) =>
      `${s.date} · ${s.reussites}/${s.reussites + s.echecs} · ${s.duree} min · ${s.typeDominant?.nom ?? 'aucune erreur dominante'}`),
    '',
    'DIFFICULTÉS',
    ...store.tousLesPieges()
      .filter((p) => p.etat.reussites + p.etat.echecs > 0)
      .map((p) => `${PIEGES[p.id]?.nom ?? p.id} — ${p.etat.reussites} réussites, ${p.etat.echecs} erreurs${estAcquis(p.etat) ? ' (acquis)' : ''}`),
    '',
    'OBSERVATIONS',
    ...profil.francais.marche.map((n) => `+ ${n.texte}`),
    ...profil.francais.aEviter.map((n) => `− ${n.texte}`),
    ...profil.transversal.notes.map((n) => `· ${n.texte}`),
  ];
  const texte = lignes.join('\n');

  navigator.clipboard?.writeText(texte).then(
    () => alert('Bilan copié. Tu peux le coller où tu veux.'),
    () => telecharger(texte),
  );
}

function telecharger(texte) {
  const lien = document.createElement('a');
  lien.href = URL.createObjectURL(new Blob([texte], { type: 'text/plain' }));
  lien.download = `suivi-${eleve.slug()}-francais.txt`;
  lien.click();
  URL.revokeObjectURL(lien.href);
}

// --- Réglages ---------------------------------------------------------------

function reglages() {
  app.append(html(`
    <header class="entete entete--secondaire">
      <a class="bouton-retour" href="#/" aria-label="Retour">←</a>
      <div class="entete-titre"><h1>Réglages</h1></div>
    </header>

    ${sectionIA()}

    <section class="reglage">
      <h2>Qui utilise l'appli</h2>
      <label class="champ">
        <span>Prénom</span>
        <input type="text" id="prenom-reglage" maxlength="20" value="${echapper(eleve.eleve().prenom)}">
      </label>
      <p class="champ-titre">Avatar</p>
      <div class="avatars">
        ${eleve.AVATARS.map((a) => `
          <button type="button" class="avatar-choix ${a === eleve.eleve().avatar ? 'est-choisi' : ''}"
                  data-avatar="${a}">${a}</button>`).join('')}
      </div>
      <p class="reglage-note">
        Changer le prénom repart d'une mémoire vierge : c'est lui qui identifie
        l'élève d'une matière à l'autre.
      </p>
    </section>

    <section class="reglage">
      <h2>Code parental</h2>
      <p>
        Quatre chiffres pour que cet écran et le suivi ne s'ouvrent pas par hasard.
      </p>
      <p class="reglage-note">
        C'est un rideau, pas une serrure : tout est stocké dans le navigateur, et
        qui sait ouvrir les outils de développement passe outre. Son rôle est
        d'éviter que l'enfant tombe sur la liste de ses difficultés, pas de
        protéger la clé d'API.
      </p>
      <label class="champ">
        <span>Code (vide = pas de code)</span>
        <input type="password" id="code-parent" inputmode="numeric" maxlength="8"
               autocomplete="off" placeholder="${eleve.codeParentDefini() ? '••••' : 'aucun'}">
      </label>
      <div class="reglage-actions">
        <button class="bouton bouton--principal" data-action="code" type="button">Enregistrer le code</button>
        ${eleve.codeParentDefini()
          ? '<button class="bouton" data-action="sans-code" type="button">Retirer le code</button>'
          : ''}
      </div>
      <p class="code-resultat" role="status"></p>
    </section>`));

  brancherSectionIA();

  // --- Identité de l'élève ---
  const champPrenom = app.querySelector('#prenom-reglage');
  const enregistrerIdentite = (avatar) => {
    const prenom = champPrenom.value.trim();
    if (!prenom) return;
    eleve.definirEleve({ prenom, avatar: avatar ?? eleve.eleve().avatar });
  };

  champPrenom.addEventListener('change', () => enregistrerIdentite());

  app.querySelectorAll('.avatars')[0]?.addEventListener('click', (evenement) => {
    const choix = evenement.target.closest('[data-avatar]');
    if (!choix) return;
    enregistrerIdentite(choix.dataset.avatar);
    for (const b of app.querySelectorAll('.avatar-choix')) {
      b.classList.toggle('est-choisi', b === choix);
    }
  });

  // --- Code parental ---
  const champCode = app.querySelector('#code-parent');
  const codeResultat = app.querySelector('.code-resultat');

  app.querySelector('[data-action="code"]').addEventListener('click', () => {
    const valeur = champCode.value.trim();
    if (!/^\d{4,8}$/.test(valeur)) {
      codeResultat.textContent = 'Saisis entre 4 et 8 chiffres.';
      codeResultat.className = 'code-resultat est-faux';
      return;
    }
    eleve.definirCodeParent(valeur);
    eleve.deverrouiller();
    champCode.value = '';
    codeResultat.textContent = '✓ Code enregistré. Il sera demandé à la prochaine ouverture.';
    codeResultat.className = 'code-resultat est-juste';
  });

  app.querySelector('[data-action="sans-code"]')?.addEventListener('click', () => {
    eleve.definirCodeParent(null);
    codeResultat.textContent = 'Code retiré. Les écrans parents sont accessibles directement.';
    codeResultat.className = 'code-resultat';
  });
}

// --- Réglages : le service d'IA ---------------------------------------------
//
// Deux fournisseurs, une clé par fournisseur, un modèle au choix. Le champ
// « Autre » n'est pas de la souplesse gratuite : les catalogues bougent plus
// vite que cette appli, qui n'a pas d'étape de build ni de mise à jour
// automatique. Sans lui, un modèle retiré du service condamnerait les
// explications personnalisées jusqu'à ce que quelqu'un republie le site.

function sectionIA() {
  const actif = store.fournisseur();
  const f = ia.FOURNISSEURS[actif];
  const modeleChoisi = store.modele();
  const surMesure = Boolean(modeleChoisi) && !f.modeles.some((m) => m.id === modeleChoisi);

  return `
    <section class="reglage" id="reglage-ia">
      <h2>Merlin, le professeur particulier</h2>
      <p>
        Avec une clé d'API, Merlin explique chaque erreur en tenant compte de ce que
        l'élève a répondu et de ce qui a déjà été essayé. Sans clé, l'appli utilise des
        explications préécrites : moins fines, mais elle reste entièrement utilisable.
      </p>

      <p class="champ-titre">Service</p>
      <div class="fournisseurs" role="radiogroup" aria-label="Service d'IA">
        ${Object.entries(ia.FOURNISSEURS).map(([id, four]) => `
          <button type="button" class="fournisseur ${id === actif ? 'est-choisi' : ''}"
                  role="radio" aria-checked="${id === actif}" data-fournisseur="${id}">
            ${four.nom}
            ${store.configIA().cles[id] ? '<span class="fournisseur-etat">clé enregistrée</span>' : ''}
          </button>`).join('')}
      </div>

      <label class="champ">
        <span>Clé d'API ${f.nom}</span>
        <input type="password" id="cle" autocomplete="off" value="${echapper(store.cleApi())}"
               placeholder="clé créée sur ${f.console}">
      </label>

      <label class="champ">
        <span>Modèle</span>
        <select id="modele">
          ${f.modeles.map((m) => `
            <option value="${m.id}" ${m.id === modeleChoisi ? 'selected' : ''}>${m.libelle}</option>`).join('')}
          <option value="autre" ${surMesure ? 'selected' : ''}>Autre — saisir l'identifiant</option>
        </select>
      </label>

      <label class="champ" id="champ-modele-libre" ${surMesure ? '' : 'hidden'}>
        <span>Identifiant du modèle</span>
        <input type="text" id="modele-libre" autocomplete="off" spellcheck="false"
               value="${echapper(surMesure ? modeleChoisi : '')}">
      </label>

      <p class="reglage-note">
        La clé reste sur cet appareil et n'est jamais envoyée ailleurs qu'à ${f.nom}.
        Pense à lui fixer une limite de dépense : toutes les pages publiées sur le même
        compte GitHub partagent une origine, donc une autre page pourrait la lire.
      </p>

      <div class="reglage-actions">
        <button class="bouton bouton--principal" data-action="tester" type="button">Vérifier et enregistrer</button>
        <button class="bouton" data-action="effacer" type="button">Retirer la clé</button>
      </div>
      <p class="reglage-resultat" role="status"></p>
    </section>`;
}

function brancherSectionIA() {
  const champCle = app.querySelector('#cle');
  const choixModele = app.querySelector('#modele');
  const champLibre = app.querySelector('#modele-libre');
  const blocLibre = app.querySelector('#champ-modele-libre');
  const resultat = app.querySelector('.reglage-resultat');

  const modeleSaisi = () =>
    choixModele.value === 'autre' ? champLibre.value.trim() : choixModele.value;

  // Changer de fournisseur change la clé ET la liste des modèles : on redessine
  // plutôt que de rafistoler trois champs à la main.
  app.querySelector('.fournisseurs').addEventListener('click', (evenement) => {
    const choix = evenement.target.closest('[data-fournisseur]');
    if (!choix || choix.dataset.fournisseur === store.fournisseur()) return;
    store.definirFournisseur(choix.dataset.fournisseur);
    router();
  });

  choixModele.addEventListener('change', () => {
    blocLibre.hidden = choixModele.value !== 'autre';
    if (!blocLibre.hidden) champLibre.focus();
  });

  app.querySelector('[data-action="tester"]').addEventListener('click', async () => {
    const cle = champCle.value.trim();
    if (!cle) { resultat.textContent = 'Saisis une clé.'; return; }

    resultat.textContent = 'Vérification…';
    resultat.className = 'reglage-resultat';
    const r = await ia.verifierReglages({ fournisseur: store.fournisseur(), cle, modele: modeleSaisi() });

    if (r.ok) {
      store.definirCleApi(cle);
      store.definirModele(modeleSaisi());
      resultat.textContent = `✓ Enregistré. Les explications passeront par ${ia.modeleCourant()}.`;
      resultat.className = 'reglage-resultat est-juste';
    } else {
      resultat.textContent = `✗ ${r.message}`;
      resultat.className = 'reglage-resultat est-faux';
    }
  });

  app.querySelector('[data-action="effacer"]').addEventListener('click', () => {
    store.definirCleApi('');
    champCle.value = '';
    resultat.textContent = "Clé retirée. L'appli passe en explications préécrites.";
    resultat.className = 'reglage-resultat';
  });
}

// --- Première connexion -----------------------------------------------------

/**
 * Le seul écran que l'élève voit avant d'avoir un prénom.
 *
 * Le prénom n'est pas qu'un affichage : il sert de clé à la mémoire
 * transversale, celle qui se partage entre les matières d'un même enfant. Sans
 * lui, deux enfants sur le même appareil se partageraient un profil.
 */
function bienvenue() {
  const moi = eleve.eleve();
  let avatarChoisi = moi.avatar || eleve.AVATARS[0];

  app.append(html(`
    <section class="bienvenue">
      <p class="bienvenue-emoji">✍️</p>
      <h1>Bienvenue&nbsp;!</h1>
      <p class="bienvenue-intro">
        Ici on travaille les verbes et les accords — pas en récitant les règles,
        en les appliquant pour de vrai.
      </p>

      <label class="champ">
        <span>Comment tu t'appelles&nbsp;?</span>
        <input type="text" id="prenom" maxlength="20" autocomplete="given-name"
               placeholder="Ton prénom" value="${echapper(moi.prenom)}">
      </label>

      <p class="champ-titre">Choisis ton avatar</p>
      <div class="avatars" role="radiogroup" aria-label="Choisis ton avatar">
        ${eleve.AVATARS.map((a) => `
          <button type="button" class="avatar-choix ${a === avatarChoisi ? 'est-choisi' : ''}"
                  role="radio" aria-checked="${a === avatarChoisi}" data-avatar="${a}">${a}</button>`).join('')}
      </div>

      <button class="bouton bouton--principal" data-action="commencer" type="button">C'est parti</button>
      <p class="bienvenue-note">
        Tout reste sur cet appareil : ni compte, ni inscription, rien d'envoyé.
      </p>
    </section>`));

  const champ = app.querySelector('#prenom');
  const bouton = app.querySelector('[data-action="commencer"]');

  app.querySelector('.avatars').addEventListener('click', (evenement) => {
    const choix = evenement.target.closest('[data-avatar]');
    if (!choix) return;
    avatarChoisi = choix.dataset.avatar;
    for (const b of app.querySelectorAll('.avatar-choix')) {
      const actif = b === choix;
      b.classList.toggle('est-choisi', actif);
      b.setAttribute('aria-checked', String(actif));
    }
  });

  const valider = () => {
    if (!champ.value.trim()) { champ.focus(); return; }
    eleve.definirEleve({ prenom: champ.value, avatar: avatarChoisi });
    aller('/');
    router();
  };

  bouton.addEventListener('click', valider);
  champ.addEventListener('keydown', (e) => { if (e.key === 'Enter') valider(); });
  champ.focus();
}

// --- Rideau parental --------------------------------------------------------

function demanderCode(destination) {
  app.append(html(`
    <section class="rideau">
      <p class="rideau-emoji">🔒</p>
      <h1>Espace parents</h1>
      <p>Saisis le code à quatre chiffres.</p>
      <label class="champ">
        <span class="visuellement-cache">Code parental</span>
        <input type="password" id="code" inputmode="numeric" maxlength="8"
               autocomplete="off" placeholder="••••">
      </label>
      <button class="bouton bouton--principal" data-action="ouvrir" type="button">Entrer</button>
      <a class="lien-discret" href="#/">Retour</a>
      <p class="rideau-resultat" role="status"></p>
    </section>`));

  const champ = app.querySelector('#code');
  const resultat = app.querySelector('.rideau-resultat');

  const essayer = () => {
    if (eleve.verifierCodeParent(champ.value)) {
      eleve.deverrouiller();
      aller(destination);
      router();
    } else {
      resultat.textContent = 'Code incorrect.';
      champ.value = '';
      champ.focus();
    }
  };

  app.querySelector('[data-action="ouvrir"]').addEventListener('click', essayer);
  champ.addEventListener('keydown', (e) => { if (e.key === 'Enter') essayer(); });
  champ.focus();
}

// --- Utilitaire -------------------------------------------------------------

function html(chaine) {
  const modele = document.createElement('template');
  modele.innerHTML = chaine.trim();
  return modele.content;
}

// Le prénom et la clé sont saisis à la main puis réinjectés dans ces gabarits.
// Un prénom contenant une apostrophe ou un chevron casserait la page.
const ENTITES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const echapper = (valeur = '') => String(valeur).replace(/[&<>"']/g, (c) => ENTITES[c]);

router();
