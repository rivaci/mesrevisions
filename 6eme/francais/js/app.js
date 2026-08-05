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

const app = document.getElementById('app');

const routes = [
  { motif: /^\/$/, ecran: accueil },
  { motif: /^\/seance\/(\d+)$/, ecran: (n) => seance(Number(n)) },
  { motif: /^\/parents$/, ecran: parents },
  { motif: /^\/reglages$/, ecran: reglages },
];

function router() {
  const chemin = location.hash.slice(1) || '/';
  for (const { motif, ecran } of routes) {
    const trouve = chemin.match(motif);
    if (trouve) {
      app.innerHTML = '';
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
  const etat = store.lireEtat();
  const taux = store.progressionGlobale();
  const resiste = pointsQuiResistent(store.tousLesPieges(), 3);

  app.append(html(`
    <header class="entete">
      <div class="entete-titre">
        <h1>Français 6<sup>e</sup></h1>
        <p>Le verbe et les accords</p>
      </div>
      <a class="lien-entete" href="#/parents">Parents</a>
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
        ? 'Les explications sont personnalisées par IA.'
        : 'Mode hors ligne : les explications sont préécrites.'}</p>
      <a class="lien-discret" href="#/reglages">Réglages</a>
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
      <div class="entete-titre"><h1>Suivi d'Anto</h1></div>
    </header>

    ${derniere ? bilanSeance(derniere) : '<p class="vide">Aucune séance pour l\'instant.</p>'}

    <h2 class="titre-section">Ce que l'appli a retenu de lui</h2>
    <p class="avertissement">
      Ces observations sont écrites par l'IA au fil des séances. Elles peuvent se
      tromper — supprime celles qui ne correspondent pas à ton fils.
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
    if (confirm("Effacer toute la progression et la mémoire d'Anto ? La clé d'API est conservée.")) {
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
    "SUIVI D'ANTO — FRANÇAIS 6e",
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
  lien.download = 'suivi-anto-francais.txt';
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

    <section class="reglage">
      <h2>Explications personnalisées</h2>
      <p>
        Avec une clé d'API Anthropic, l'appli explique chaque erreur en tenant compte
        de ce qu'Anto a répondu et de ce qui a déjà été essayé. Sans clé, elle utilise
        des explications préécrites : moins fines, mais l'appli reste entièrement utilisable.
      </p>
      <p class="reglage-note">
        La clé reste sur cet appareil et n'est jamais envoyée ailleurs qu'à Anthropic.
        Pense à lui fixer une limite de dépense.
      </p>
      <label class="champ">
        <span>Clé d'API</span>
        <input type="password" id="cle" placeholder="sk-ant-..." value="${store.cleApi()}" autocomplete="off">
      </label>
      <div class="reglage-actions">
        <button class="bouton bouton--principal" data-action="tester" type="button">Vérifier et enregistrer</button>
        <button class="bouton" data-action="effacer" type="button">Retirer la clé</button>
      </div>
      <p class="reglage-resultat" role="status"></p>
    </section>`));

  const champ = app.querySelector('#cle');
  const resultat = app.querySelector('.reglage-resultat');

  app.querySelector('[data-action="tester"]').addEventListener('click', async () => {
    const valeur = champ.value.trim();
    if (!valeur) { resultat.textContent = 'Saisis une clé.'; return; }
    resultat.textContent = 'Vérification…';
    const r = await ia.verifierCle(valeur);
    if (r.ok) {
      store.definirCleApi(valeur);
      resultat.textContent = '✓ Clé valide et enregistrée.';
      resultat.className = 'reglage-resultat est-juste';
    } else {
      resultat.textContent = `✗ ${r.message}`;
      resultat.className = 'reglage-resultat est-faux';
    }
  });

  app.querySelector('[data-action="effacer"]').addEventListener('click', () => {
    store.definirCleApi('');
    champ.value = '';
    resultat.textContent = 'Clé retirée. L\'appli passe en explications préécrites.';
    resultat.className = 'reglage-resultat';
  });
}

// --- Utilitaire -------------------------------------------------------------

function html(chaine) {
  const modele = document.createElement('template');
  modele.innerHTML = chaine.trim();
  return modele.content;
}

router();
