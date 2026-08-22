// Assemblage de l'application : navigation et écrans.
//
// La navigation passe par le fragment d'URL (#/...). C'est ce qui permet à
// GitHub Pages de servir le site sans configuration : il n'y a qu'une seule
// page, et le bouton « retour » du navigateur fonctionne.

import { ETAPES, etapeParId, itemsDeLEtape, SEUIL_DEFI } from './data/parcours.js';
import { THEMES } from './data/themes.js';
import { MODES, lancerSeance } from './seance.js';
import {
  lireEtat, progressionEtape, etapeAccessible, rang, tauxAcquis, toutesLesCles,
  etatItem, BADGES, OBJECTIF_QUOTIDIEN, reinitialiser,
} from './store.js';
import { estAcquis, NIVEAU_MAX } from './srs.js';
import { monterSauvegarde } from '../../../commun/sauvegarde-ui.js';

const app = document.getElementById('app');

// --- Navigation -------------------------------------------------------------

const routes = [
  { motif: /^\/$/, ecran: accueil },
  { motif: /^\/etape\/([\w-]+)$/, ecran: etape },
  { motif: /^\/seance\/([\w-]+)\/([\w-]+)$/, ecran: seance },
  { motif: /^\/progression$/, ecran: progression },
];

function router() {
  const chemin = location.hash.slice(1) || '/';
  for (const { motif, ecran } of routes) {
    const trouve = chemin.match(motif);
    if (trouve) {
      app.innerHTML = '';
      ecran(...trouve.slice(1));
      // Une nouvelle page commence en haut, même après avoir fait défiler.
      window.scrollTo(0, 0);
      return;
    }
  }
  aller('/');
}

const aller = (chemin) => { location.hash = chemin; };

window.addEventListener('hashchange', router);

// --- Écran d'accueil --------------------------------------------------------

function accueil() {
  const etat = lireEtat();
  const r = rang();
  const global = tauxAcquis(toutesLesCles());
  const objectif = etat.jour.bonnesReponses ?? 0;

  app.append(html(`
    <header class="entete">
      <div class="entete-titre">
        <h1>Objectif 5<sup>e</sup></h1>
        <p>Histoire &amp; géographie — révisions d'été</p>
      </div>
      <a class="lien-progression" href="#/progression">Ma progression</a>
    </header>

    <section class="tableau-bord">
      <div class="carte-stat carte-stat--rang">
        <span class="stat-icone">${r.icone}</span>
        <span class="stat-valeur">${r.nom}</span>
        <span class="stat-detail">${etat.xp} XP</span>
        <div class="jauge jauge--fine"><div class="jauge-remplie" style="width:${Math.round(r.versSuivant * 100)}%"></div></div>
        <span class="stat-detail">${r.suivant ? `${r.suivant.seuil - etat.xp} XP avant ${r.suivant.nom}` : 'Rang maximal'}</span>
      </div>
      <div class="carte-stat">
        <span class="stat-icone">🔥</span>
        <span class="stat-valeur">${etat.serie.jours}</span>
        <span class="stat-detail">jour${etat.serie.jours > 1 ? 's' : ''} d'affilée</span>
      </div>
      <div class="carte-stat">
        <span class="stat-icone">🎯</span>
        <span class="stat-valeur">${Math.min(objectif, OBJECTIF_QUOTIDIEN)}/${OBJECTIF_QUOTIDIEN}</span>
        <span class="stat-detail">objectif du jour</span>
        <div class="jauge jauge--fine"><div class="jauge-remplie" style="width:${Math.min(objectif / OBJECTIF_QUOTIDIEN, 1) * 100}%"></div></div>
      </div>
    </section>

    <section class="progression-globale">
      <div class="progression-globale-texte">
        <strong>${Math.round(global * 100)} %</strong> du programme maîtrisé
      </div>
      <div class="jauge"><div class="jauge-remplie" style="width:${global * 100}%"></div></div>
    </section>

    <h2 class="titre-section">Géographie</h2>
    <ol class="etapes">${ETAPES.filter((e) => e.matiere === 'geo').map(carteEtape).join('')}</ol>

    <h2 class="titre-section">Histoire</h2>
    <ol class="etapes">${ETAPES.filter((e) => e.matiere === 'histoire').map(carteEtape).join('')}</ol>

    <footer class="pied">
      <p>Ta progression est enregistrée sur cet appareil uniquement. Aucun compte, aucune donnée envoyée.</p>
      <button class="lien-discret" type="button" data-action="reinitialiser">Tout remettre à zéro</button>
    </footer>`));

  app.querySelector('[data-action="reinitialiser"]').addEventListener('click', () => {
    if (confirm('Effacer toute ta progression ? Cette action est définitive.')) {
      reinitialiser();
      router();
    }
  });
}

function carteEtape(e) {
  const p = progressionEtape(e);
  const ouverte = etapeAccessible(e);
  const validee = p.meilleurDefi >= SEUIL_DEFI;

  return `
    <li class="etape-carte ${ouverte ? '' : 'est-verrouillee'} ${validee ? 'est-validee' : ''}">
      <a href="${ouverte ? `#/etape/${e.id}` : '#/'}" ${ouverte ? '' : 'aria-disabled="true"'}>
        <span class="etape-icone">${ouverte ? e.icone : '🔒'}</span>
        <span class="etape-corps">
          <span class="etape-titre">${e.titre} ${validee ? '<span class="etape-sceau" title="Défi réussi">✓</span>' : ''}</span>
          <span class="etape-soustitre">${ouverte ? e.sousTitre : "Termine l'étape précédente pour débloquer"}</span>
          <span class="jauge jauge--fine"><span class="jauge-remplie" style="width:${p.taux * 100}%"></span></span>
          <span class="etape-compte">${p.acquis} / ${p.total} maîtrisées</span>
        </span>
      </a>
    </li>`;
}

// --- Écran d'une étape ------------------------------------------------------

function etape(id) {
  const e = etapeParId(id);
  // Le verrou vaut aussi pour une adresse tapée à la main.
  if (!e || !etapeAccessible(e)) return aller('/');
  const p = progressionEtape(e);

  app.append(html(`
    <header class="entete entete--secondaire">
      <a class="bouton-retour" href="#/" aria-label="Retour à l'accueil">←</a>
      <div class="entete-titre">
        <h1>${e.icone} ${e.titre}</h1>
        <p>${e.sousTitre}</p>
      </div>
    </header>

    <section class="progression-globale">
      <div class="progression-globale-texte">
        <strong>${p.acquis} / ${p.total}</strong> connaissances maîtrisées
        ${p.meilleurDefi ? ` — meilleur défi : ${Math.round(p.meilleurDefi * 100)} %` : ''}
      </div>
      <div class="jauge"><div class="jauge-remplie" style="width:${p.taux * 100}%"></div></div>
    </section>

    <h2 class="titre-section">Comment réviser&nbsp;?</h2>
    <div class="modes">
      ${Object.entries(MODES).map(([cle, m]) => `
        <a class="mode-carte mode-carte--${cle}" href="#/seance/${e.id}/${cle}">
          <span class="mode-icone">${m.icone}</span>
          <span class="mode-nom">${m.nom}</span>
          <span class="mode-description">${m.description}</span>
        </a>`).join('')}
    </div>

    <h2 class="titre-section">Les connaissances de cette étape</h2>
    <ul class="liste-savoirs">${itemsDeLEtape(e).map(ligneSavoir).join('')}</ul>`));
}

function ligneSavoir({ cle, themeId, item }) {
  const theme = THEMES[themeId];
  const etat = etatItem(cle);
  const points = Array.from({ length: NIVEAU_MAX }, (_, i) =>
    `<span class="point ${i < etat.niveau ? 'est-plein' : ''}"></span>`).join('');

  return `
    <li class="savoir ${estAcquis(etat) ? 'est-acquis' : ''}">
      <span class="savoir-texte">
        <span class="savoir-question">${theme.question(item)}</span>
        <span class="savoir-reponse">${theme.reponse(item)}</span>
      </span>
      <span class="savoir-niveau" title="Niveau de maîtrise : ${etat.niveau} sur ${NIVEAU_MAX}">${points}</span>
    </li>`;
}

// --- Séance -----------------------------------------------------------------

function seance(etapeId, mode) {
  const e = etapeParId(etapeId);
  if (!e || !MODES[mode]) return aller('/');

  // Vider explicitement : « Recommencer » rappelle cette fonction sans repasser
  // par le routeur, qui est le seul autre endroit à nettoyer l'écran.
  app.innerHTML = '';
  const conteneur = document.createElement('main');
  conteneur.className = 'seance';
  app.append(conteneur);

  lancerSeance({
    etape: e,
    mode,
    conteneur,
    surFin: (resultat) => {
      if (resultat?.rejouer) {
        // Même route : on relance à la main plutôt que de passer par le routeur.
        return seance(etapeId, mode);
      }
      aller(`/etape/${etapeId}`);
    },
  });
}

// --- Écran de progression ---------------------------------------------------

function progression() {
  const etat = lireEtat();
  const global = tauxAcquis(toutesLesCles());

  app.append(html(`
    <header class="entete entete--secondaire">
      <a class="bouton-retour" href="#/" aria-label="Retour à l'accueil">←</a>
      <div class="entete-titre">
        <h1>Ma progression</h1>
        <p>${Math.round(global * 100)} % du programme maîtrisé</p>
      </div>
    </header>

    <h2 class="titre-section">Par étape</h2>
    <ul class="liste-progression">
      ${ETAPES.map((e) => {
        const p = progressionEtape(e);
        return `
          <li>
            <div class="ligne-progression">
              <span class="ligne-icone">${e.icone}</span>
              <span class="ligne-titre">${e.titre}</span>
              <span class="ligne-compte">${p.acquis}/${p.total}</span>
            </div>
            <div class="jauge jauge--fine"><div class="jauge-remplie" style="width:${p.taux * 100}%"></div></div>
          </li>`;
      }).join('')}
    </ul>

    <h2 class="titre-section">Badges <span class="titre-compteur">${etat.badges.length}/${BADGES.length}</span></h2>
    <ul class="badges">
      ${BADGES.map((b) => {
        const obtenu = etat.badges.includes(b.id);
        return `
          <li class="badge ${obtenu ? 'est-obtenu' : ''}">
            <span class="badge-icone">${obtenu ? b.icone : '🔒'}</span>
            <span class="badge-nom">${b.nom}</span>
            <span class="badge-description">${b.description}</span>
          </li>`;
      }).join('')}
    </ul>

    <div class="sauv-hote"></div>`));

  monterSauvegarde(app.querySelector('.sauv-hote'), {
    surRestauration: () => window.location.reload(),
  });
}

// --- Utilitaire -------------------------------------------------------------

/** Transforme une chaîne HTML en fragment DOM. */
function html(chaine) {
  const modele = document.createElement('template');
  modele.innerHTML = chaine.trim();
  return modele.content;
}

router();
