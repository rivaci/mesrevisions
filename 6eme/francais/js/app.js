// Navigation et écrans.
//
// Une seule page, navigation par fragment d'URL : GitHub Pages sert le site
// sans configuration et le bouton « retour » du navigateur fonctionne.

import { SEANCES, BLOCS, seanceParNumero } from './data/seances/index.js';
import { PIEGES } from './data/pieges.js';
import { lancerSeance } from './seance.js';
import { pointsQuiResistent, profilPourIA } from './memoire.js';
import { estAcquis } from './srs.js';
import { composerDefi, lancerDefi, motDeLaFin } from './defi.js';
import { monterChat } from './chat.js';
import { rendreReponseMerlin } from './rendu.js';
import { animerPhrase } from './animation.js';
import { formaterCout, formaterTokens } from './cout.js';
import { monterSauvegarde } from '../../../commun/sauvegarde-ui.js';
import * as store from './store.js';
import * as ia from './ia.js';
import * as eleve from './eleve.js';

const app = document.getElementById('app');

const routes = [
  { motif: /^\/$/, ecran: accueil },
  { motif: /^\/seance\/(\d+)$/, ecran: (n) => seance(Number(n)) },
  { motif: /^\/merlin$/, ecran: merlin },
  { motif: /^\/progres$/, ecran: progres },
  { motif: /^\/animations$/, ecran: animations },
  { motif: /^\/defi\/(\d+)$/, ecran: (n) => defi(Number(n)) },
  { motif: /^\/parents$/, ecran: parents },
  { motif: /^\/conversation\/(.+)$/, ecran: (id) => conversation(id) },
  { motif: /^\/reglages$/, ecran: reglages },
];

// Le rideau ne protège que ce qui est écrit POUR un adulte : les observations
// de l'IA sur l'enfant, l'argent, et les actions destructrices. Ses progrès et
// ses conversations avec Merlin sont à lui — les lui cacher revenait à
// confisquer son propre cahier.
const ECRANS_PARENTS = ['/parents', '/reglages'];

function router() {
  const chemin = location.hash.slice(1) || '/';
  app.innerHTML = '';

  // Tant que l'élève ne s'est pas présenté, il n'y a rien d'autre à faire.
  if (!eleve.estConfigure()) { bienvenue(); return; }

  // Le code parental est un rideau, pas une serrure : il évite que l'enfant
  // tombe par hasard sur la liste de ses difficultés et sur ce que l'IA a noté
  // de lui. Sur un site statique, il ne prétend à rien de plus.
  if (ECRANS_PARENTS.some((p) => chemin === p || chemin.startsWith(p)) && !eleve.estDeverrouille()) {
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

  // Route inconnue : l'accueil s'affiche mais le hash RESTE. Sur un site
  // statique servi avec dix minutes de cache, un lien vers un écran tout juste
  // déployé peut tomber sur un app.js périmé qui ne le connaît pas encore —
  // réécrire l'URL transformait ce cas transitoire en redirection muette, et
  // le même lien remarchait après coup sans qu'on comprenne pourquoi.
  accueil();
  window.scrollTo(0, 0);
}

const aller = (chemin) => { location.hash = chemin; };
window.addEventListener('hashchange', router);

// Le compteur de coût, bien visible : une puce dans l'en-tête, cachée tant que
// rien n'a été dépensé. Elle mène au détail sur l'écran parents.
function puceCout() {
  const c = store.cout();
  return `<a class="puce-cout" href="#/parents" ${c.appels ? '' : 'hidden'}
    title="Coût de l'IA depuis le début — détail sur l'écran parents">${formaterCout(c.total)}</a>`;
}

window.addEventListener('cout-maj', () => {
  const c = store.cout();
  for (const el of document.querySelectorAll('.puce-cout')) {
    el.textContent = formaterCout(c.total);
    el.hidden = !c.appels;
  }
});

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
        ${puceCout()}
        <a class="lien-entete" href="#/parents">Parents</a>
        <a class="bouton-icone" href="#/reglages" aria-label="Réglages" title="Réglages">⚙️</a>
      </nav>
    </header>

    ${ia.disponible() ? `
      <a class="carte-merlin" href="#/merlin">
        <span class="carte-merlin-emoji" aria-hidden="true">🎩</span>
        <span class="carte-merlin-texte">
          <strong>Demander à Merlin</strong>
          <span>Une question sur les verbes ou les accords ? Il t'explique.</span>
        </span>
        <span class="carte-merlin-fleche" aria-hidden="true">→</span>
      </a>` : ''}

    <section class="tableau-bord">
      <a class="carte-stat carte-stat--large" href="#/progres">
        <span class="stat-valeur">${Math.round(taux * 100)} %</span>
        <span class="stat-detail">des difficultés maîtrisées</span>
        <div class="jauge"><div class="jauge-remplie" style="width:${taux * 100}%"></div></div>
        <span class="carte-stat-lien">Voir mes progrès →</span>
      </a>
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

    ${(() => {
      const conseillee = store.prochaineSeance(SEANCES.map((s) => s.numero));
      return BLOCS.map((bloc) => carteBloc(bloc, conseillee)).join('');
    })()}

    <footer class="pied">
      <p>${ia.disponible()
        ? 'Merlin t\'explique tes erreurs, rien que pour toi.'
        : 'Mode hors ligne : les explications sont préécrites.'}</p>
    </footer>`));
}

/**
 * La ligne de détail d'une carte : de quoi la séance est faite, et où on en est.
 *
 * Une ligne, pas un tableau de bord — la carte doit rester lisible d'un coup
 * d'œil d'enfant. Les exercices de réserve ne sont pas comptés : ils ne se
 * jouent pas dans le parcours, les annoncer gonflerait le programme.
 */
function metaSeance(s, faite) {
  const joues = s.exercices.filter((e) => !e.reserve).length;
  const morceaux = [
    `${s.rappels.length} leçon${s.rappels.length > 1 ? 's' : ''}`,
    `${joues} exercice${joues > 1 ? 's' : ''}`,
  ];
  if (s.rappels.some((r) => r.animation)) morceaux.push('🎬 animée');

  if (faite) {
    // Le dernier passage sur CETTE séance du parcours, reprises comprises.
    const passage = [...store.journal()].reverse().find((j) => j.parcours === s.numero);
    if (passage) morceaux.push(`✓ ${passage.reussites}/${passage.reussites + passage.echecs} la dernière fois`);
  }
  return morceaux.join(' · ');
}

// Aucune séance n'est verrouillée. Le parcours reste ordonné — la difficulté
// croît par interférence, la séance 8 suppose les précédentes — mais ça se dit
// par une recommandation, pas par un cadenas : un élève qui veut réviser
// l'imparfait la veille d'un contrôle a raison, et rien ne doit l'en empêcher.
function carteBloc(bloc, conseillee) {
  return `
    <section class="bloc">
      <h2 class="bloc-titre"><span class="bloc-numero">${bloc.numero}</span> ${bloc.titre}</h2>
      <ol class="seances">
        ${bloc.seances.map((n) => {
          const s = seanceParNumero(n);
          if (!s) return '';
          const faite = store.aFait(n);
          return `
            <li class="seance-carte ${faite ? 'est-faite' : ''} ${n === conseillee ? 'est-conseillee' : ''}">
              <a href="#/seance/${n}">
                <span class="seance-numero">${faite ? '✓' : n}</span>
                <span class="seance-corps">
                  <span class="seance-titre">${s.titre}</span>
                  <span class="seance-soustitre">${s.sousTitre ?? ''}</span>
                  <span class="seance-meta">${metaSeance(s, faite)}</span>
                </span>
                ${n === conseillee ? '<span class="seance-conseil">à faire ensuite</span>' : ''}
              </a>
            </li>`;
        }).join('')}
      </ol>
      ${carteDefi(bloc)}
    </section>`;
}

// --- Séance -----------------------------------------------------------------

function seance(numero) {
  const s = seanceParNumero(numero);
  if (!s) return aller('/');

  app.innerHTML = '';
  const conteneur = document.createElement('main');
  conteneur.className = 'seance';
  app.append(conteneur);

  lancerSeance({ seance: s, conteneur, surFin: () => aller('/') });
}

// --- Écran « Demander à Merlin » --------------------------------------------

function merlin() {
  const enTete = `
    <header class="entete entete--secondaire">
      <a class="bouton-retour" href="#/" aria-label="Retour">←</a>
      <div class="entete-titre"><h1>Merlin</h1></div>
      ${puceCout()}
    </header>`;

  // Accessible sans clé par l'URL directe : on le dit plutôt que de planter.
  if (!ia.disponible()) {
    app.append(html(`${enTete}
      <section class="reglage">
        <p>Merlin a besoin d'une clé d'API pour discuter. Sans elle, l'appli reste
        jouable avec les explications préécrites.</p>
        <a class="bouton bouton--principal" href="#/reglages">Ajouter une clé</a>
      </section>`));
    return;
  }

  app.append(html(`${enTete}
    <p class="merlin-intro">Pose ta question sur les verbes, les accords, l'orthographe, le sens d'une phrase…
      Merlin ne parle que de français.</p>
    <div class="chat-hote"></div>`));

  const profilTexte = profilPourIA(store.profil(), store.tousLesPieges(), store.lireEtat().numeroSeance);
  monterChat({ conteneur: app.querySelector('.chat-hote'), contexte: null, profilTexte, pleinePage: true });
}

// --- Écran « Mes progrès » (à l'élève, sans code) ---------------------------
//
// Ce qui est utile à l'élève lui revient : où il en est notion par notion, ses
// séances passées, et le carnet de ce que Merlin lui a expliqué. Le rideau ne
// garde que ce qui est écrit pour un adulte.

function progres() {
  const moi = eleve.eleve();
  const taux = store.progressionGlobale();
  const pourToi = (store.profil().francais.pourToi ?? []);
  const journal = [...store.journal()].reverse();
  // Les DIX-SEPT pièges, pas seulement ceux déjà croisés : une collection ne se
  // comprend que si l'on voit les cases vides. Elle reste honnête — une carte se
  // retourne quand le piège est réellement acquis, jamais parce qu'on a cliqué.
  const tous = store.tousLesPieges();
  const vus = (p) => p.etat.reussites + p.etat.echecs > 0;
  const travailles = tous.filter(vus);
  const acquis = travailles.filter((p) => estAcquis(p.etat));
  const enCours = travailles.filter((p) => !estAcquis(p.etat));
  const aVenir = tous.filter((p) => !vus(p));

  const carte = (p, fini) => `
    <li class="${fini ? 'est-acquis' : ''}">
      <span class="piege-nom">${PIEGES[p.id]?.nom ?? p.id}</span>
      <span class="piege-chiffres">${fini ? '✓ acquis' : `${p.etat.reussites} ✓ · ${p.etat.echecs} ✗`}</span>
    </li>`;

  app.append(html(`
    <header class="entete entete--secondaire">
      <a class="bouton-retour" href="#/" aria-label="Retour">←</a>
      <div class="entete-titre">
        <h1>Mes progrès</h1>
        <p>${acquis.length} pièges domptés sur ${tous.length}</p>
      </div>
    </header>

    <section class="collection" aria-label="Les pièges domptés">
      <div class="collection-jauge"><div style="width:${Math.round(taux * 100)}%"></div></div>
      <ul class="collection-cartes">
        ${tous.map((p) => {
          const fini = estAcquis(p.etat);
          const etat = fini ? 'est-dompte' : vus(p) ? 'est-en-cours' : 'est-a-venir';
          const nom = PIEGES[p.id]?.nom ?? p.id;
          return `<li class="collection-carte ${etat}" title="${echapper(nom)}">
            <span class="collection-marque">${fini ? '✓' : vus(p) ? '·' : ''}</span>
            <span class="collection-nom">${echapper(nom)}</span>
          </li>`;
        }).join('')}
      </ul>
      ${aVenir.length
        ? `<p class="collection-note">${aVenir.length} que tu n'as pas encore rencontrés.</p>`
        : '<p class="collection-note">Tu les as tous rencontrés.</p>'}
    </section>

    ${pourToi.length ? `
      <section class="pour-toi">
        <p class="pour-toi-titre">🎩 Ce que Merlin a remarqué</p>
        ${pourToi.map((n) => `<p class="pour-toi-note">${echapper(n.texte)}</p>`).join('')}
      </section>` : ''}

    ${acquis.length ? `
      <h2 class="titre-section">Ce que tu maîtrises <span class="compte-conv">${acquis.length}</span></h2>
      <ul class="liste-pieges">${acquis.map((p) => carte(p, true)).join('')}</ul>` : ''}

    ${enCours.length ? `
      <h2 class="titre-section">En cours</h2>
      <ul class="liste-pieges">${enCours.map((p) => carte(p, false)).join('')}</ul>` : ''}

    ${!travailles.length ? '<p class="vide">Fais une première séance, tu verras tes progrès ici.</p>' : ''}

    ${journal.length ? `
      <h2 class="titre-section">Tes séances</h2>
      <ul class="historique">
        ${journal.map((s) => `
          <li>
            <span class="historique-date">${s.date}</span>
            <span class="historique-score">${s.reussites}/${s.reussites + s.echecs}</span>
            <span class="historique-type">${s.typeDominant?.nom ?? 'sans faute'}</span>
          </li>`).join('')}
      </ul>` : ''}

    ${store.conversations().some((c) => c.messages.length) ? `
      <h2 class="titre-section">Ton carnet
        <span class="compte-conv">${store.conversations().filter((c) => c.messages.length).length}</span></h2>
      <p class="avertissement avertissement--douce">
        Tout ce que Merlin t'a expliqué est gardé ici. Relis-le quand tu veux.
      </p>
      <div class="conversations"></div>` : ''}`));

  remplirConversations();
}

// --- Le Défi de fin de bloc -------------------------------------------------
//
// Une récompense, pas un examen : il ne tire que sur ce qui est déjà dompté, et
// il n'écrit rien dans la progression. Voir js/defi.js pour le pourquoi.

const blocParNumero = (n) => BLOCS.find((b) => b.numero === n) ?? null;
const blocTermine = (bloc) => bloc?.seances.every((n) => store.aFait(n)) ?? false;

/** Les questions d'une manche, tirées du bloc et de l'état réel des pièges. */
function questionsDuDefi(bloc) {
  const exercices = SEANCES
    .filter((s) => bloc.seances.includes(s.numero))
    .flatMap((s) => s.exercices ?? []);
  const idsDuBloc = new Set(exercices.map((e) => e.piege).filter(Boolean));
  return composerDefi({
    pieges: store.tousLesPieges().filter((p) => idsDuBloc.has(p.id)),
    exercices,
    dejaVus: new Set(Object.keys(store.lireEtat().exercicesVus ?? {})),
  });
}

function defi(numero) {
  const bloc = blocParNumero(numero);
  if (!bloc || !blocTermine(bloc)) return aller('/');

  const conteneur = document.createElement('main');
  conteneur.className = 'defi';
  app.innerHTML = '';
  app.append(conteneur);

  const questions = questionsDuDefi(bloc);
  if (!questions.length) return aller('/');

  const arreter = lancerDefi({
    bloc,
    questions,
    conteneur,
    surFin: (resultat) => {
      if (!resultat) return aller('/');
      const ancien = store.resultatDefi(numero);
      const record = resultat.score > (ancien?.meilleurScore ?? 0);
      store.enregistrerDefi(numero, resultat);
      return afficherResultatDefi({ bloc, resultat, record, conteneur });
    },
  });
  // Quitter l'écran en cours de manche ne doit pas laisser tourner le chrono.
  window.addEventListener('hashchange', arreter, { once: true });
  return undefined;
}

function afficherResultatDefi({ bloc, resultat, record, conteneur }) {
  const meilleur = store.resultatDefi(bloc.numero);
  conteneur.innerHTML = `
    <section class="defi-bilan">
      <p class="defi-bilan-etiquette">Défi — ${echapper(bloc.titre)}</p>
      <p class="defi-bilan-score">${resultat.score}<span> / ${resultat.parfait}</span></p>
      ${record ? '<p class="defi-record">🏅 Nouveau record</p>' : ''}
      <p class="defi-bilan-detail">Meilleure série : ${resultat.meilleureSerie} d'affilée.</p>
      <p class="defi-bilan-mot">${echapper(motDeLaFin(resultat))}</p>
      <p class="defi-bilan-detail">Ton record sur ce bloc : ${meilleur.meilleurScore} points.</p>
      <div class="defi-bilan-boutons">
        <button class="bouton bouton--principal" type="button">Rejouer</button>
        <a class="lien-discret" href="#/">Retour</a>
      </div>
    </section>`;
  conteneur.querySelector('button').addEventListener('click', () => defi(bloc.numero));
}

/** La carte d'un Défi ouvert, posée sous les séances de son bloc. */
function carteDefi(bloc) {
  if (!blocTermine(bloc)) return '';
  const fait = store.resultatDefi(bloc.numero);
  return `
    <a class="carte-defi" href="#/defi/${bloc.numero}">
      <span class="carte-defi-icone">⚡</span>
      <span class="carte-defi-corps">
        <span class="carte-defi-titre">Le Défi du bloc ${bloc.numero}</span>
        <span class="carte-defi-detail">${fait
          ? `Ton record : ${fait.meilleurScore} points · ${fait.parties} partie${fait.parties > 1 ? 's' : ''}`
          : 'Chronomètre, séries, trois vies — sur ce que tu maîtrises déjà.'}</span>
      </span>
    </a>`;
}

// --- Aperçu des animations de leçon -----------------------------------------
//
// Toutes les animations bout à bout, SANS toucher à la progression : rien n'est
// marqué vu, rien n'est joué. C'est un banc d'essai — pour revoir une
// explication sans refaire la séance, et pour vérifier qu'elles tournent toutes.

function animations() {
  const animees = SEANCES.flatMap((s) =>
    (s.rappels ?? []).filter((r) => r.animation).map((r) => ({ seance: s, rappel: r })));

  app.append(html(`
    <header class="entete entete--secondaire">
      <a class="bouton-retour" href="#/" aria-label="Retour">←</a>
      <div class="entete-titre">
        <h1>Les leçons animées</h1>
        <p>${animees.length} animation${animees.length > 1 ? 's' : ''} — la progression n'est pas touchée</p>
      </div>
    </header>
    ${animees.length ? '' : '<p class="vide">Aucune leçon animée pour l\'instant.</p>'}`));

  for (const { seance: s, rappel } of animees) {
    const bloc = document.createElement('section');
    bloc.className = 'rappel';
    bloc.append(html(`
      <p class="rappel-etiquette">Séance ${s.numero} — ${s.titre}</p>
      <h2>${rappel.titre}</h2>
      <div class="anim-hote"></div>`));
    app.append(bloc);
    animerPhrase(bloc.querySelector('.anim-hote'), rappel.animation);
  }
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

    ${sectionConversations()}
    ${sectionCout()}
    <div class="sauv-hote"></div>

    <div class="actions-parents">
      <button class="bouton bouton--principal" data-action="exporter" type="button">Copier le bilan</button>
      <button class="lien-discret" data-action="raz" type="button">Tout remettre à zéro</button>
    </div>
    <p class="pied">
      Tout est stocké sur cet appareil. Vider les données de navigation efface le suivi —
      d'où le bouton de copie ci-dessus.
    </p>`));

  remplirConversations();
  monterSauvegarde(app.querySelector('.sauv-hote'), {
    surRestauration: () => window.location.reload(),
  });

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
    const note = evenement.target.closest('[data-oublier]');
    if (!note) return;
    store.oublierNote(note.dataset.couche, note.dataset.oublier);
    router();
  });
}

// --- Coût et conversations, côté parents ------------------------------------

function sectionCout() {
  const c = store.cout();
  if (!c.appels) return '';
  return `
    <h2 class="titre-section">Coût de l'IA</h2>
    <div class="cout-detail">
      <p class="cout-total">${formaterCout(c.total)}</p>
      <p class="cout-lignes">${c.appels} appel${c.appels > 1 ? 's' : ''} ·
        ${formaterTokens(c.entree)} tokens d'entrée · ${formaterTokens(c.sortie)} de sortie</p>
      <p class="reglage-note">
        Dépensé sur ta clé depuis le début. Ce total survit à la remise à zéro —
        c'est de l'argent réellement facturé. Pense à fixer une limite de dépense
        côté ${ia.fournisseurCourant().console}.
      </p>
    </div>`;
}

function sectionConversations() {
  const convs = store.conversations().filter((c) => c.messages.length);
  if (!convs.length) return '';
  return `
    <h2 class="titre-section">Questions posées à Merlin
      <span class="compte-conv">${convs.length}</span></h2>
    <p class="avertissement">
      Tout ce que ton enfant demande à Merlin, et ce que Merlin répond, est gardé
      ici — tel qu'il l'a vu à l'écran. Ouvre une conversation pour la lire en entier.
    </p>
    <div class="conversations"></div>`;
}

/** Texte mis à plat pour l'aperçu d'une ligne : ni schéma, ni balisage. */
function apercu(texte, max = 95) {
  const plat = String(texte ?? '')
    .replace(/```schema[\s\S]*?```/g, ' ')
    .replace(/[*`|#>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return plat.length > max ? `${plat.slice(0, max)}…` : plat;
}

/**
 * La liste des conversations : une ligne par discussion, la plus récente en
 * haut. Ouvrir mène au détail.
 *
 * Elles étaient toutes dépliées à la suite : passé quelques discussions, la page
 * devenait un mur qu'on ne relit pas. Une ligne dit l'essentiel — quand, à quel
 * propos, et ce que l'enfant a demandé.
 */
function remplirConversations() {
  const hote = app.querySelector('.conversations');
  if (!hote) return;

  for (const c of [...store.conversations()].reverse()) {
    if (!c.messages.length) continue;
    const question = c.messages.find((m) => m.role === 'eleve')?.texte ?? c.messages[0].texte;
    const nb = c.messages.length;

    hote.append(html(`
      <a class="conv-ligne" href="#/conversation/${encodeURIComponent(c.id)}">
        <span class="conv-ligne-corps">
          <span class="conv-ligne-question">${echapper(apercu(question))}</span>
          <span class="conv-ligne-meta">
            ${c.date} · ${c.contexte ? 'après une erreur' : 'question libre'} ·
            ${nb} message${nb > 1 ? 's' : ''}
          </span>
          ${c.contexte?.phrase ? `<span class="conv-ligne-phrase">${echapper(apercu(c.contexte.phrase, 60))}</span>` : ''}
        </span>
        <span class="conv-ligne-fleche" aria-hidden="true">→</span>
      </a>`));
  }
}

/** L'exercice qui a déclenché une discussion, pour l'écran de détail. */
const blocExercice = (contexte) => (contexte ? `
  <div class="conversation-exercice">
    <p class="conversation-consigne">${echapper(contexte.consigne ?? '')}</p>
    <p class="conversation-phrase">${echapper(contexte.phrase ?? '')}</p>
    <p class="conversation-reponses">
      <span class="etiquette-faux">écrit : ${echapper(contexte.donnee ?? '—')}</span>
      <span class="etiquette-juste">attendu : ${echapper(contexte.attendu ?? '—')}</span>
    </p>
    ${contexte.piege ? `<p class="conversation-piege">${echapper(contexte.piege)}</p>` : ''}
  </div>` : '');

/**
 * Le détail d'une conversation.
 *
 * Construit en DOM, et non par gabarit : les réponses de Merlin passent par le
 * MÊME rendu que dans le chat, pour que le parent voie les tableaux et les
 * schémas plutôt qu'un bloc ```schema``` en clair.
 */
function conversation(idBrut) {
  const id = decodeURIComponent(idBrut);
  const conv = store.conversations().find((c) => c.id === id);
  if (!conv) return aller('/parents');

  const prenom = eleve.eleve().prenom || 'Élève';
  // On y arrive depuis « Mes progrès » comme depuis le suivi parents : le
  // retour rend la main à l'écran d'où l'on vient, pas à l'un des deux.
  app.append(html(`
    <header class="entete entete--secondaire">
      <button class="bouton-retour" data-action="retour" type="button" aria-label="Retour">←</button>
      <div class="entete-titre">
        <h1>Conversation</h1>
        <p>${conv.date} · ${conv.contexte ? 'après une erreur' : 'question libre'}</p>
      </div>
    </header>

    ${blocExercice(conv.contexte)}
    <div class="conversation conversation--detail"></div>

    <div class="actions-parents">
      <button class="lien-discret" data-action="oublier-conv" type="button">Supprimer cette conversation</button>
    </div>`));

  app.querySelector('[data-action="retour"]').addEventListener('click', () => {
    if (history.length > 1) history.back();
    else aller('/progres');
  });

  const fil = app.querySelector('.conversation--detail');
  for (const m of conv.messages) {
    const bloc = document.createElement('div');
    bloc.className = `conversation-message conversation-message--${m.role}`;
    const qui = document.createElement('span');
    qui.className = 'conversation-qui';
    qui.textContent = m.role === 'merlin' ? 'Merlin' : prenom;
    bloc.append(qui);

    if (m.role === 'merlin') {
      bloc.append(rendreReponseMerlin(m.texte));
    } else {
      const p = document.createElement('p');
      p.className = 'conversation-question';
      p.textContent = m.texte; // saisie de l'enfant : jamais interprétée
      bloc.append(p);
    }
    fil.append(bloc);
  }

  app.querySelector('[data-action="oublier-conv"]').addEventListener('click', () => {
    if (!confirm('Supprimer cette conversation ?')) return;
    store.oublierConversation(id);
    // Retour à la liste d'où l'on vient, pas systématiquement au suivi parents.
    if (history.length > 1) history.back();
    else aller('/progres');
  });
}

function bilanSeance(s) {
  const hasard = s.raisonnements?.hasard ?? 0;
  const frappe = s.raisonnements?.frappe ?? 0;
  // Ce qu'il a formulé lui-même quand aucune option ne convenait. C'est la
  // ligne la plus instructive du bilan, et la seule qu'aucun catalogue
  // d'options ne pouvait produire.
  const sesMots = (s.ratesDetail ?? []).filter((r) => r.raisonnementTexte);
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
      ${frappe
        ? `<p class="bilan-ligne">Il a invoqué la faute de frappe ${frappe} fois. L'option n'apparaît que si ce qu'il a écrit n'est pas une forme possible du mot — mais si le nombre grimpe, c'est qu'il valide sans se relire.</p>`
        : ''}
      ${sesMots.length
        ? `<section class="bilan-libre">
             <h3>Ce qu'il a expliqué avec ses mots</h3>
             ${sesMots.map((r) => `<blockquote>${echapper(r.raisonnementTexte)}</blockquote>`).join('')}
           </section>`
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
    </section>

    <p class="pied"><a class="lien-discret" href="#/animations">Voir les leçons animées, sans toucher à la progression</a></p>`));

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
  ajouterOeil(champCode);
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
  ajouterOeil(champCle);
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
  let etape = 0;

  const ETAPES = [identite, cleMerlin, codeParental, pret];
  const suivante = () => { etape += 1; rendre(); };
  const rendre = () => { app.replaceChildren(); ETAPES[etape](); };

  /** Le fil d'Ariane : trois points, pour qu'on sache où on en est. */
  const jalons = () => `
    <p class="jalons" aria-hidden="true">
      ${ETAPES.map((_, i) => `<span class="jalon ${i === etape ? 'est-courant' : ''} ${i < etape ? 'est-fait' : ''}"></span>`).join('')}
    </p>`;

  // --- 1. Qui va travailler -------------------------------------------------

  function identite() {
    app.append(html(`
      <section class="bienvenue">
        ${jalons()}
        <p class="bienvenue-emoji">✍️</p>
        <h1>Installation</h1>
        <p class="bienvenue-intro">
          Deux minutes de réglages, à faire par un adulte. Ensuite l'appli est
          celle de l'enfant.
        </p>

        <label class="champ">
          <span>Le prénom de l'enfant</span>
          <input type="text" id="prenom" maxlength="20" autocomplete="off"
                 placeholder="Son prénom" value="${echapper(moi.prenom)}">
        </label>

        <p class="champ-titre">Son avatar</p>
        <div class="avatars" role="radiogroup" aria-label="Choisir un avatar">
          ${eleve.AVATARS.map((a) => `
            <button type="button" class="avatar-choix ${a === avatarChoisi ? 'est-choisi' : ''}"
                    role="radio" aria-checked="${a === avatarChoisi}" data-avatar="${a}">${a}</button>`).join('')}
        </div>

        <button class="bouton bouton--principal" data-action="suite" type="button">Continuer</button>
        <p class="bienvenue-note">
          Le prénom sert aussi à identifier l'élève d'une matière à l'autre.
          Tout reste sur cet appareil : ni compte, ni inscription.
        </p>
      </section>`));

    const champ = app.querySelector('#prenom');
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
      suivante();
    };
    app.querySelector('[data-action="suite"]').addEventListener('click', valider);
    champ.addEventListener('keydown', (e) => { if (e.key === 'Enter') valider(); });
    champ.focus();
  }

  // --- 2. Merlin ------------------------------------------------------------

  function cleMerlin() {
    const actif = store.fournisseur();
    app.append(html(`
      <section class="bienvenue bienvenue--large">
        ${jalons()}
        <p class="bienvenue-emoji">🎩</p>
        <h1>Merlin</h1>
        <p class="bienvenue-intro">
          Avec une clé d'API, Merlin explique chaque erreur sur mesure et répond aux
          questions. Sans clé, l'appli fonctionne quand même, avec des explications
          préécrites — tu pourras en ajouter une plus tard.
        </p>

        <div class="fournisseurs" role="radiogroup" aria-label="Service d'IA">
          ${Object.entries(ia.FOURNISSEURS).map(([id, four]) => `
            <button type="button" class="fournisseur ${id === actif ? 'est-choisi' : ''}"
                    role="radio" aria-checked="${id === actif}" data-fournisseur="${id}">${four.nom}</button>`).join('')}
        </div>

        <label class="champ">
          <span>Clé d'API</span>
          <input type="password" id="cle-install" autocomplete="off"
                 placeholder="clé créée sur ${ia.FOURNISSEURS[actif].console}">
        </label>

        <p class="reglage-note">
          Elle reste sur cet appareil, n'est jamais mise dans les sauvegardes, et
          les explications te sont facturées. Pense à lui fixer une limite de dépense.
        </p>

        <button class="bouton bouton--principal" data-action="verifier" type="button">Vérifier et continuer</button>
        <button class="lien-discret" data-action="plus-tard" type="button">Plus tard</button>
        <p class="reglage-resultat" role="status"></p>
      </section>`));

    const champ = app.querySelector('#cle-install');
    ajouterOeil(champ);
    const resultat = app.querySelector('.reglage-resultat');

    app.querySelector('.fournisseurs').addEventListener('click', (evenement) => {
      const choix = evenement.target.closest('[data-fournisseur]');
      if (!choix || choix.dataset.fournisseur === store.fournisseur()) return;
      store.definirFournisseur(choix.dataset.fournisseur);
      rendre();
    });

    app.querySelector('[data-action="verifier"]').addEventListener('click', async () => {
      const cle = champ.value.trim();
      if (!cle) { resultat.textContent = 'Saisis une clé, ou choisis « Plus tard ».'; return; }
      resultat.textContent = 'Vérification…';
      resultat.className = 'reglage-resultat';
      const r = await ia.verifierReglages({ fournisseur: store.fournisseur(), cle, modele: '' });
      if (!r.ok) {
        resultat.textContent = `✗ ${r.message}`;
        resultat.className = 'reglage-resultat est-faux';
        return;
      }
      store.definirCleApi(cle);
      suivante();
    });

    app.querySelector('[data-action="plus-tard"]').addEventListener('click', suivante);
  }

  // --- 3. Code parental -----------------------------------------------------

  function codeParental() {
    app.append(html(`
      <section class="bienvenue">
        ${jalons()}
        <p class="bienvenue-emoji">🔒</p>
        <h1>Code parental</h1>
        <p class="bienvenue-intro">
          Quatre chiffres pour que l'écran de suivi et les réglages ne s'ouvrent
          pas par hasard.
        </p>
        <p class="reglage-note">
          C'est un rideau, pas une serrure : tout est dans le navigateur, et qui
          sait ouvrir les outils de développement passe outre. Son rôle est
          d'éviter que l'enfant tombe sur la liste de ses difficultés et sur ce
          que Merlin a noté de lui.
        </p>

        <label class="champ">
          <span>Code à quatre chiffres</span>
          <input type="password" id="code-install" inputmode="numeric" maxlength="8"
                 autocomplete="off" placeholder="••••">
        </label>

        <button class="bouton bouton--principal" data-action="poser" type="button">Enregistrer et continuer</button>
        <button class="lien-discret" data-action="sans" type="button">Sans code</button>
        <p class="code-resultat" role="status"></p>
      </section>`));

    const champ = app.querySelector('#code-install');
    ajouterOeil(champ);
    const resultat = app.querySelector('.code-resultat');

    const poser = () => {
      const valeur = champ.value.trim();
      if (!/^\d{4,8}$/.test(valeur)) {
        resultat.textContent = 'Saisis entre 4 et 8 chiffres, ou choisis « Sans code ».';
        resultat.className = 'code-resultat est-faux';
        return;
      }
      eleve.definirCodeParent(valeur);
      eleve.deverrouiller(); // l'adulte vient de le poser : on ne le lui redemande pas
      suivante();
    };

    app.querySelector('[data-action="poser"]').addEventListener('click', poser);
    champ.addEventListener('keydown', (e) => { if (e.key === 'Enter') poser(); });
    app.querySelector('[data-action="sans"]').addEventListener('click', () => {
      eleve.definirCodeParent(null);
      suivante();
    });
    champ.focus();
  }

  // --- 4. Passage de relais -------------------------------------------------

  function pret() {
    const prenom = eleve.eleve().prenom;
    app.append(html(`
      <section class="bienvenue">
        <p class="bienvenue-emoji">🎉</p>
        <h1>C'est prêt</h1>
        <p class="bienvenue-intro">
          Tu peux passer l'appareil à ${echapper(prenom)}.
          ${ia.disponible() ? 'Merlin est branché.' : 'Merlin pourra être ajouté plus tard, dans les réglages.'}
        </p>
        <p class="reglage-note">
          Le suivi de ses séances t'attend derrière le bouton « Parents », sur
          l'écran d'accueil. Pense aussi à mettre en place une sauvegarde, en bas
          de cet écran.
        </p>
        <button class="bouton bouton--principal" data-action="commencer" type="button">
          Commencer avec ${echapper(prenom)}
        </button>
      </section>`));

    app.querySelector('[data-action="commencer"]').addEventListener('click', () => {
      aller('/');
      router();
    });
  }

  rendre();
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
  // Le rideau aussi : c'est un rideau, pas une serrure — rien à protéger en
  // masquant la saisie, et un parent qui se trompe de chiffre doit pouvoir voir.
  ajouterOeil(champ);
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

/**
 * Ajoute un œil « voir en clair » à un champ masqué.
 *
 * Coller une clé d'API sans jamais la relire, c'est la faute de frappe assurée —
 * et le message d'erreur du service ne dit pas toujours laquelle. Même chose
 * pour le code parental : il vaut mieux le vérifier que le redéfinir.
 */
function ajouterOeil(champ) {
  if (!champ) return;
  const enveloppe = document.createElement('div');
  enveloppe.className = 'champ-masque';
  champ.replaceWith(enveloppe);

  const bouton = document.createElement('button');
  bouton.type = 'button';
  bouton.className = 'oeil';
  bouton.textContent = '👁';
  bouton.setAttribute('aria-label', 'Voir en clair');
  bouton.setAttribute('aria-pressed', 'false');
  enveloppe.append(champ, bouton);

  bouton.addEventListener('click', () => {
    const enClair = champ.type === 'text';
    champ.type = enClair ? 'password' : 'text';
    bouton.textContent = enClair ? '👁' : '🙈';
    bouton.setAttribute('aria-label', enClair ? 'Voir en clair' : 'Masquer');
    bouton.setAttribute('aria-pressed', String(!enClair));
    champ.focus();
  });
}

// Le prénom et la clé sont saisis à la main puis réinjectés dans ces gabarits.
// Un prénom contenant une apostrophe ou un chevron casserait la page.
const ENTITES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const echapper = (valeur = '') => String(valeur).replace(/[&<>"']/g, (c) => ENTITES[c]);

router();
