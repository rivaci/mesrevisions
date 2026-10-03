// SVT, 3e — l'application.
//
// ── Pour qui, pour quoi ───────────────────────────────────────────────────
//
// Evan reprend chaque chapitre de SVT au fil des cours, comme son espagnol
// (3eme/espagnol) et son histoire (3eme/histoire-si), dont cette appli reprend
// le moteur : la fiche d'abord, puis des questions où il PRODUIT la réponse ;
// ce qui est raté revient en fin d'étape, puis dans « À revoir » ; des
// séances, et un contrôle blanc.
//
// Ce qui est propre à la SVT : retrouver le mot d'une définition (le
// vocabulaire à maîtriser), remettre des étapes dans l'ordre (une expérience,
// un caryotype, le cycle de développement), des tableaux dans la fiche, et des
// réponses rédigées — démarche J.O.D., tâches complexes — corrigées par
// Merlin, copier-coller refusé comme dans ses autres écrits.

import { CHAPITRES, chapitreParId, itemParId, itemsDe } from './data/chapitres/index.js';
import { comparer, indiceDe } from './comparer.js';
import { avancer, bilan, courant, enregistrer, estFini, estPremierEssai, melanger, note, nouveauTour, tirerInterro } from './tour.js';
import * as progres from './progres.js';
import * as merlin from './merlin.js';
import { autoCorrection, commeResultat, saisieSuspecte } from './ecrit.js';

const app = document.getElementById('app');

let profil = progres.charger();
let vue = { ecran: 'accueil' };

const garder = (p) => { profil = p; progres.sauver(profil); };

const chapitreCourant = () => chapitreParId(vue.chapitreId);
const etapeParId = (id) => chapitreCourant().etapes.find((e) => e.id === id);
const questionCourante = () => courant(vue.tour);
const itemCourant = () => itemParId(chapitreCourant(), questionCourante().id);
const estEcrit = (etape) => etape.items.every((i) => i.type === 'decrire');
const dureeDe = (etapes) => etapes.reduce((s, e) => s + e.duree, 0);

// ── Mise en forme ───────────────────────────────────────────────────────────

const echapper = (texte) => String(texte ?? '').replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

/** Le peu de mise en forme du contenu : **gras** et *italique*. */
const enrichir = (texte) => echapper(texte)
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/\*(.+?)\*/g, '<em>$1</em>');

const formatNote = ({ points, sur }) => `${String(points).replace('.', ',')} / ${sur}`;

const pluriel = (n, mot) => `${n} ${mot}${n > 1 ? 's' : ''}`;

const BRAVO = ['Bravo !', 'Exact !', 'Parfait !', 'Juste !', 'Très bien !'];

const avecTrou = (phrase) => echapper(phrase).replace('___', '<span class="trou">…</span>');

/** Ce que l'item attend, tel qu'on l'affiche. */
function reponseAffichee(item) {
  if (item.type === 'trou') return item.phrase.replace('___', item.attendu);
  if (item.type === 'choix') return item.phrase.includes('___') ? item.phrase.replace('___', item.attendu) : item.attendu;
  if (item.type === 'ordre') return item.elements.join(' → ');
  if (item.type === 'decrire') return item.modele;
  return item.attendu;
}

/** La question, en une ligne, pour les listes du bilan. */
function questionAffichee(item) {
  switch (item.type) {
    case 'terme': return echapper(item.definition);
    case 'reponse': return echapper(item.question);
    case 'trou':
    case 'choix': return echapper(item.phrase);
    case 'ordre': return echapper(item.consigne);
    case 'decrire': return `${item.emoji} ${echapper(item.sujet)}`;
    default: return '';
  }
}

// ── Rendu ───────────────────────────────────────────────────────────────────

function rendre() {
  if (vue.ecran === 'chapitre') app.innerHTML = vueChapitre();
  else if (vue.ecran === 'fiche') app.innerHTML = vueFiche();
  else if (vue.ecran === 'exercice') app.innerHTML = vueExercice();
  else if (vue.ecran === 'bilan') app.innerHTML = vueBilan();
  else app.innerHTML = vueAccueil();

  const cible = app.querySelector('[data-saisie]:not([readonly])') ?? app.querySelector('[data-focus]');
  if (cible) {
    cible.focus({ preventScroll: true });
    if (cible.setSelectionRange && cible.value) cible.setSelectionRange(cible.value.length, cible.value.length);
  }
}

const haut = () => window.scrollTo({ top: 0 });

function vueAccueil() {
  const cartes = CHAPITRES.map((c) => {
    const n = progres.derniereInterro(profil, c.id);
    const faites = c.etapes.filter((e) => profil.etapes[e.id]?.faite).length + (n ? 1 : 0);
    return `
      <button class="unite" data-action="chapitre" data-chapitre="${c.id}">
        <span class="unite-numero">${c.numero}</span>
        <span class="unite-corps">
          <span class="unite-surtitre">Chapitre ${c.numero}</span>
          <span class="unite-titre">${echapper(c.titre)}</span>
          <span class="unite-detail">${faites} / ${c.etapes.length + 1} étapes${n ? ` · contrôle blanc ${formatNote(n)}` : ''}</span>
        </span>
      </button>`;
  }).join('');

  return `
    <header class="entete">
      <p class="surtitre">Sciences de la vie et de la Terre · 3<sup>e</sup></p>
      <h1>SVT 🧬</h1>
      <p class="sous-titre">Chaque chapitre du cours, repris au fil des cours : les définitions, les expériences, et les réponses à rédiger.</p>
    </header>
    <section class="liste">${cartes}</section>
    <p class="pied">
      ${merlin.disponible()
        ? '🎩 Merlin corrige les réponses rédigées sur cet appareil.'
        : '🎩 Pas de clé Merlin sur cet appareil : les réponses rédigées se corrigent avec l\'exemple.'}
      La progression reste dans ce navigateur.
    </p>`;
}

function ligneEtape({ numero, titre, detail, duree, faite, resultat, attributs }) {
  return `
    <button class="etape${faite ? ' est-faite' : ''}" ${attributs}>
      <span class="etape-numero">${faite ? '✓' : numero}</span>
      <span class="etape-corps">
        <span class="etape-titre">${echapper(titre)}</span>
        <span class="etape-detail">${echapper(detail)}${resultat ? ` · <strong>${resultat}</strong>` : ''}</span>
      </span>
      <span class="etape-duree">~${duree} min</span>
    </button>`;
}

function ligneDeEtape(e, numero) {
  const etat = profil.etapes[e.id];
  const total = etat ? etat.justes + etat.presque + etat.faux : 0;
  return ligneEtape({
    numero,
    titre: e.titre,
    detail: e.sousTitre,
    duree: e.duree,
    faite: etat?.faite,
    resultat: etat && total ? `${etat.justes}/${total} ${estEcrit(e) ? 'juste' : 'du premier coup'}` : '',
    attributs: `data-action="etape" data-etape="${e.id}"`,
  });
}

function vueChapitre() {
  const c = chapitreCourant();
  const derniere = progres.derniereInterro(profil, c.id);

  const seances = c.seances.map((s) => {
    const etapes = c.etapes.filter((e) => e.seance === s.numero);
    const faite = etapes.every((e) => profil.etapes[e.id]?.faite);
    return `
      <div class="seance${faite ? ' est-faite' : ''}">
        <p class="seance-titre">
          <span class="seance-numero">Séance ${s.numero} · ${echapper(s.partie)}</span>
          <span class="seance-nom">${echapper(s.titre)}</span>
          <span class="seance-duree">~${dureeDe(etapes)} min</span>
        </p>
        <div class="etapes">${etapes.map((e, k) => ligneDeEtape(e, `${s.numero}.${k + 1}`)).join('')}</div>
      </div>`;
  }).join('');

  const controle = `
    <div class="seance">
      <p class="seance-titre">
        <span class="seance-numero">Pour finir</span>
        <span class="seance-nom">Le contrôle blanc</span>
        <span class="seance-duree">~${c.interro.duree} min</span>
      </p>
      <div class="etapes">${ligneEtape({
        numero: '★',
        titre: 'Contrôle blanc',
        detail: 'Des questions de tout le chapitre, sans indice',
        duree: c.interro.duree,
        faite: Boolean(derniere),
        resultat: derniere ? formatNote(derniere) : '',
        attributs: 'data-action="interro"',
      })}</div>
    </div>`;

  const total = dureeDe(c.etapes) + c.interro.duree;
  const prochaine = c.etapes.find((e) => !profil.etapes[e.id]?.faite);
  const commencee = c.etapes.some((e) => profil.etapes[e.id]?.faite);
  const principal = prochaine
    ? `<button class="principal" data-action="etape" data-etape="${prochaine.id}" data-focus>${commencee ? `Continuer : ${echapper(prochaine.titre)}` : 'Commencer'} →</button>`
    : `<button class="principal" data-action="interro" data-focus>${derniere ? 'Refaire un contrôle blanc' : 'Le contrôle blanc'} →</button>`;

  const revoir = progres.aRevoir(profil, itemsDe(c));
  const carteRevoir = revoir.length ? `
    <button class="raccourci" data-action="revoir">
      <span class="raccourci-titre">🔁 À revoir · ${pluriel(revoir.length, 'question')}</span>
      <span class="raccourci-detail">Ce qui n'est pas encore sorti du premier coup. Cinq minutes avant le contrôle, c'est ici.</span>
    </button>` : '';

  return `
    <header class="entete-section">
      <button class="retour" data-action="accueil">← Mes chapitres</button>
      <p class="surtitre">Chapitre ${c.numero}</p>
      <h1>${echapper(c.titre)}</h1>
      <p class="sous-titre">${echapper(c.detail)}</p>
    </header>
    <section class="carte parcours">
      <h2>Révision <span class="duree-totale">~${total} min</span></h2>
      <p class="parcours-conseil">Une séance par grande partie du cours : d'affilée, ou une par jour avant le contrôle.</p>
      ${seances}
      ${controle}
      <div class="actions">${principal}</div>
    </section>
    <div class="raccourcis">
      ${carteRevoir}
      <button class="raccourci" data-action="fiche">
        <span class="raccourci-titre">📄 Toute la fiche</span>
        <span class="raccourci-detail">Le cours résumé, les définitions et les tableaux, à relire juste avant le contrôle.</span>
      </button>
    </div>`;
}

// ── La fiche ────────────────────────────────────────────────────────────────

function bloc(b) {
  if (b.type === 'tableau') {
    const large = b.colonnes && b.colonnes.length > 3;
    return `
      <div class="bloc">
        ${b.titre ? `<h3>${echapper(b.titre)}</h3>` : ''}
        <table class="tableau${large ? ' tableau--large' : ''}">
          ${b.colonnes ? `<thead><tr>${b.colonnes.map((c) => `<th>${enrichir(c)}</th>`).join('')}</tr></thead>` : ''}
          <tbody>${b.lignes.map((l) => `<tr>${l.map((c) => `<td>${enrichir(c)}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>`;
  }
  if (b.type === 'piege') {
    return `
      <div class="bloc piege">
        <p class="piege-titre">⚠️ Attention</p>
        ${b.lignes.map((l) => `<p>${enrichir(l)}</p>`).join('')}
      </div>`;
  }
  return `
    <div class="bloc regle">
      ${b.titre ? `<h3>${echapper(b.titre)}</h3>` : ''}
      ${b.lignes.map((l) => `<p>${enrichir(l)}</p>`).join('')}
    </div>`;
}

function vueFiche() {
  const c = chapitreCourant();
  const seule = vue.etapeId ? etapeParId(vue.etapeId) : null;
  const corpsEtape = (e) => `
    ${seule ? '' : `<h3 class="fiche-etape">${echapper(e.titre)} <span>${echapper(e.sousTitre)}</span></h3>`}
    ${e.fiche.map(bloc).join('')}`;
  const corps = seule
    ? corpsEtape(seule)
    : c.seances.map((s) => `
        <h2 class="fiche-seance">Séance ${s.numero} · ${echapper(s.titre)}</h2>
        ${c.etapes.filter((e) => e.seance === s.numero).map(corpsEtape).join('')}`).join('');

  return `
    <header class="entete-section">
      <button class="retour" data-action="chapitre" data-chapitre="${c.id}">← Chapitre ${c.numero}</button>
      <h1>${seule ? echapper(seule.titre) : 'Toute la fiche'}</h1>
      <p class="sous-titre">${seule
        ? `${echapper(seule.sousTitre)} — lis la fiche une minute, puis entraîne-toi.`
        : 'Le cours résumé, les définitions et les tableaux du chapitre.'}</p>
    </header>
    <section class="carte fiche">${corps}</section>
    ${seule ? `
      <div class="actions actions--bas">
        <button class="principal" data-action="commencer" data-etape="${seule.id}" data-focus>${estEcrit(seule) ? 'J\'écris →' : 'Je m\'entraîne →'}</button>
      </div>` : ''}`;
}

// ── Les questions ───────────────────────────────────────────────────────────

function vueExercice() {
  const q = questionCourante();
  const item = itemCourant();
  const total = vue.tour.file.length;
  const titre = vue.mode === 'interro' ? 'Contrôle blanc' : vue.mode === 'revoir' ? 'À revoir' : etapeParId(vue.etapeId).titre;

  let corps;
  if (item.type === 'decrire') corps = vueEcrire(item);
  else if (q.mode === 'reconnaitre') corps = vueReconnaitre(item, q);
  else if (item.type === 'choix') corps = vueChoix(item);
  else if (item.type === 'ordre') corps = vueOrdre(item);
  else corps = vueSaisie(item);

  return `
    <header class="entete-section entete-exercice">
      <button class="retour" data-action="quitter">← Arrêter</button>
      <div class="progres-ligne"><span>${echapper(titre)}</span><span>${vue.tour.index + 1} / ${total}</span></div>
      <div class="barre"><span style="width:${Math.round((100 * vue.tour.index) / total)}%"></span></div>
    </header>
    <section class="carte question">
      ${q.reprise ? '<p class="reprise">🔁 On y revient.</p>' : ''}
      ${corps}
    </section>`;
}

function enonceSaisie(item) {
  switch (item.type) {
    case 'terme': return { consigne: 'Quel mot du cours ?', enonce: echapper(item.definition) };
    case 'reponse': return { consigne: 'Réponds :', enonce: echapper(item.question) };
    case 'trou': return { consigne: echapper(item.consigne), enonce: avecTrou(item.phrase) };
    default: return { consigne: '', enonce: '' };
  }
}

function vueSaisie(item) {
  const { consigne, enonce } = enonceSaisie(item);
  const repondu = Boolean(vue.reponse);
  return `
    <p class="consigne">${consigne}</p>
    <p class="enonce enonce--phrase">${enonce}</p>
    <input class="saisie" data-saisie type="text"
           autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" enterkeyhint="done"
           aria-label="Ta réponse" value="${echapper(vue.saisie)}" ${repondu ? 'readonly' : ''}>
    ${repondu ? vueRetour(item) : `
      ${vue.indice ? `<p class="indice">💡 ${echapper(indiceDe(item))}</p>` : ''}
      <div class="actions">
        <button class="principal" data-action="valider">Valider</button>
        ${vue.mode === 'interro' || vue.indice ? '' : '<button class="secondaire" data-action="indice">💡 Indice</button>'}
        <button class="lien" data-action="je-ne-sais-pas">Je ne sais pas</button>
      </div>`}`;
}

/** Ce qu'on dit après une réponse tapée. */
function vueRetour(item) {
  const r = vue.reponse;
  const titres = { juste: `✓ ${BRAVO[vue.tour.index % BRAVO.length]}`, presque: '≈ Presque !', faux: '✗ Pas tout à fait' };

  const pourquoi = [];
  if (r.raison === 'accent') pourquoi.push('C\'est su, mais attention aux accents.');
  if (r.raison === 'orthographe') pourquoi.push('C\'est su, mais attention à l\'orthographe.');
  if (r.raison === 'indice') pourquoi.push("Juste, mais avec l'indice : il reviendra.");
  if (r.message) pourquoi.push(r.message);
  else if (r.resultat !== 'juste' && item.explication) pourquoi.push(item.explication);

  return `
    <div class="retour-reponse est-${r.resultat}">
      <p class="verdict">${titres[r.resultat]}</p>
      <p class="corrige">${echapper(reponseAffichee(item))}</p>
      ${pourquoi.map((p) => `<p class="pourquoi">${echapper(p)}</p>`).join('')}
    </div>
    <div class="actions">
      <button class="principal" data-action="suivant" data-focus>Suivant →</button>
    </div>`;
}

function vueOptions(options, bonne, choisi) {
  return `
    <div class="options">
      ${options.map((o) => {
        const etat = !choisi ? '' : o === bonne ? ' est-bonne' : o === choisi ? ' est-choisie' : ' est-eteinte';
        return `<button class="option${etat}" data-action="choisir" data-option="${echapper(o)}" ${choisi ? 'disabled' : ''}>${echapper(o)}</button>`;
      }).join('')}
    </div>`;
}

function vueChoix(item) {
  const r = vue.reponse;
  // Mélangées à l'ouverture de la question, une fois : la bonne réponse n'a pas
  // de place attitrée qui se devinerait au deuxième passage.
  if (!vue.options) vue.options = melanger(item.options);
  return `
    <p class="consigne">${echapper(item.consigne ?? 'Choisis la bonne réponse :')}</p>
    <p class="enonce enonce--phrase">${avecTrou(item.phrase)}</p>
    ${vueOptions(vue.options, item.attendu, r?.choisi)}
    ${r ? `
      <div class="retour-reponse est-${r.resultat}">
        <p class="verdict">${r.resultat === 'juste' ? `✓ ${BRAVO[vue.tour.index % BRAVO.length]}` : '✗ Pas tout à fait'}</p>
        <p class="pourquoi">${echapper(item.explication)}</p>
      </div>
      <div class="actions"><button class="principal" data-action="suivant" data-focus>Suivant →</button></div>` : ''}`;
}

function vueReconnaitre(item, q) {
  const r = vue.reponse;
  return `
    <p class="consigne">Que veut dire :</p>
    <p class="enonce">${echapper(item.attendu)}</p>
    ${vueOptions(q.options, item.definition, r?.choisi)}
    ${r ? `
      <div class="retour-reponse est-${r.resultat}">
        <p class="verdict">${r.resultat === 'juste' ? `✓ ${BRAVO[vue.tour.index % BRAVO.length]}` : '✗ Pas tout à fait'}</p>
        <p class="pourquoi"><strong>${echapper(item.attendu)}</strong> : ${echapper(item.definition)}.</p>
      </div>
      <div class="actions"><button class="principal" data-action="suivant" data-focus>Suivant →</button></div>` : ''}`;
}

// ── Remettre dans l'ordre ───────────────────────────────────────────────────
//
// Une expérience, une technique, un cycle s'apprennent en les reconstruisant :
// les étapes, mélangées à l'ouverture de la question, se touchent dans
// l'ordre. Dans le contenu, elles sont rangées dans l'ordre juste — c'est le
// corrigé.

function etatOrdre(item) {
  if (!vue.ordre) vue.ordre = { banque: melanger(item.elements.map((_, i) => i)), placees: [] };
  return vue.ordre;
}

function vueOrdre(item) {
  const o = etatOrdre(item);
  const repondu = Boolean(vue.reponse);
  const restants = o.banque.filter((i) => !o.placees.includes(i));
  const construite = o.placees.length
    ? `<ol class="ordre-liste">${o.placees.map((i, rang) => `
        <li><button class="element element--place${repondu ? (i === rang ? ' est-bien-place' : ' est-mal-place') : ''}"
          data-action="ordre-rendre" data-index="${i}" ${repondu ? 'disabled' : ''}>${echapper(item.elements[i])}</button></li>`).join('')}</ol>`
    : '<p class="ordre-vide">Touche les étapes, de la première à la dernière.</p>';

  return `
    <p class="consigne">${echapper(item.consigne)}</p>
    <div class="ordre-zone">${construite}</div>
    ${repondu ? `
      <div class="retour-reponse est-${vue.reponse.resultat}">
        <p class="verdict">${vue.reponse.resultat === 'juste' ? `✓ ${BRAVO[vue.tour.index % BRAVO.length]}` : '✗ Pas tout à fait'}</p>
        <ol class="ordre-corrige">${item.elements.map((e) => `<li>${echapper(e)}</li>`).join('')}</ol>
      </div>
      <div class="actions"><button class="principal" data-action="suivant" data-focus>Suivant →</button></div>` : `
      <div class="ordre-banque">
        ${restants.map((i) => `<button class="element" data-action="ordre-prendre" data-index="${i}">${echapper(item.elements[i])}</button>`).join('')}
      </div>
      <div class="actions">
        <button class="principal" data-action="valider-ordre" ${restants.length ? 'disabled' : ''}>Valider</button>
        <button class="lien" data-action="je-ne-sais-pas">Je ne sais pas</button>
      </div>`}`;
}

// ── Écrire ──────────────────────────────────────────────────────────────────

const VERDICTS = { juste: '✓ Parfait !', presque: '≈ Presque !', 'a-reprendre': '✗ À reprendre' };
const ICONES = { present: '✓', absent: '○', faux: '✗' };

function vueModele(item) {
  return `
    <div class="modele">
      <p class="modele-titre">${echapper(item.titreModele ?? 'Un exemple')}</p>
      <p>${echapper(item.modele)}</p>
    </div>`;
}

function vueEcrire(item) {
  const e = vue.ecrit;
  const entete = `
    <p class="consigne">${echapper(item.consigne)}</p>
    <p class="sujet"><span class="emoji">${item.emoji}</span> ${echapper(item.sujet)}</p>
    <p class="indices">${item.indices.map((m) => `<span>${echapper(m)}</span>`).join('')}</p>`;
  const zone = `
    <textarea class="saisie redaction" data-saisie data-ecrit rows="7" aria-label="Ta réponse"
              autocomplete="off" autocapitalize="sentences" spellcheck="false"
              placeholder="Écris ici…" ${e.etape === 'saisie' ? '' : 'readonly'}>${echapper(e.texte)}</textarea>
    <p class="alerte-collage" data-alerte-collage hidden>Le copier-coller est désactivé : écris-le toi-même, c'est en l'écrivant qu'on le retient.</p>`;

  if (e.etape === 'saisie') {
    return `${entete}${zone}
      <div class="actions">
        <button class="principal" data-action="corriger-ecrit">
          ${merlin.disponible() ? '🎩 Faire corriger par Merlin' : 'Voir l\'exemple et me corriger'}
        </button>
      </div>`;
  }
  if (e.etape === 'attente') return `${entete}${zone}<p class="attente">🎩 Merlin lit ta réponse…</p>`;

  if (e.etape === 'auto') {
    return `${entete}${zone}
      ${e.merlinAbsent ? "<p class=\"note\">Merlin n'a pas pu répondre : corrige-toi avec l'exemple.</p>" : ''}
      ${vueModele(item)}
      <p class="consigne consigne--suite">Coche ce que ta réponse dit, et juste :</p>
      <div class="criteres">
        ${item.criteres.map((c) => {
          const coche = e.cochees.includes(c.id);
          return `
            <button class="critere${coche ? ' est-coche' : ''}" data-action="cocher" data-critere="${c.id}" aria-pressed="${coche}">
              <span class="case" aria-hidden="true">${coche ? '✓' : ''}</span><span>${echapper(c.texte)}</span>
            </button>`;
        }).join('')}
      </div>
      <div class="actions"><button class="principal" data-action="valider-auto">Valider</button></div>`;
  }

  const r = e.resultat;
  return `${entete}${zone}
    <div class="retour-reponse est-${commeResultat(r.verdict)}">
      <p class="verdict">${VERDICTS[r.verdict]}</p>
      ${r.message ? `<p class="pourquoi">🎩 ${echapper(r.message)}</p>` : ''}
    </div>
    <ul class="grille">
      ${item.criteres.map((c) => `
        <li class="est-${r.statuts[c.id]}">
          <span class="icone" aria-hidden="true">${ICONES[r.statuts[c.id]]}</span>
          <span>${echapper(c.texte)}${r.commentaires[c.id] ? `<small>${echapper(r.commentaires[c.id])}</small>` : ''}</span>
        </li>`).join('')}
    </ul>
    ${r.parMerlin && r.corrige ? `
      <div class="modele modele--corrige">
        <p class="modele-titre">Ta réponse corrigée</p>
        <p>${echapper(r.corrige)}</p>
      </div>` : ''}
    ${vueModele(item)}
    <div class="actions"><button class="principal" data-action="suivant" data-focus>Suivant →</button></div>`;
}

// ── Le bilan ────────────────────────────────────────────────────────────────

function vueBilan() {
  const c = chapitreCourant();
  const b = vue.bilan;
  const rates = b.rates.map((id) => itemParId(c, id)).filter(Boolean);
  const etape = vue.etapeId ? etapeParId(vue.etapeId) : null;

  let titre;
  let resume;
  if (vue.mode === 'interro') {
    const n = note(vue.tour);
    titre = `Contrôle blanc : ${formatNote(n)}`;
    resume = n.points === n.sur ? 'Parfait ! Tout est juste.'
      : n.points >= 0.8 * n.sur ? 'Bravo ! Relis juste ce qui est ci-dessous.'
        : n.points >= 0.5 * n.sur ? 'Pas mal ! Relis la fiche de ce que tu as raté, ci-dessous.'
          : 'Reprends « À revoir », puis refais un contrôle blanc.';
  } else if (vue.mode === 'etape' && estEcrit(etape)) {
    titre = `${etape.titre} : terminé ✓`;
    resume = b.justes ? 'Ta réponse est juste.' : 'Relis l\'exemple ci-dessous : c\'est ce qui était attendu.';
  } else {
    titre = vue.mode === 'revoir' ? 'À revoir : terminé' : `${etape.titre} : terminé ✓`;
    resume = `Du premier coup : ${pluriel(b.justes, 'juste')}, ${b.presque} presque, ${pluriel(b.faux, 'raté')}.`;
  }

  const liste = rates.length ? `
    <h2>À retenir</h2>
    <ul class="rates">
      ${rates.map((item) => `
        <li class="est-${vue.tour.premiers[item.id]}">
          <span class="rate-question">${questionAffichee(item)}</span>
          <span class="rate-reponse">${echapper(reponseAffichee(item))}</span>
        </li>`).join('')}
    </ul>` : '<p class="bravo">Tout juste du premier coup. 🎉</p>';

  let suite = '';
  let pause = '';
  if (vue.mode === 'etape') {
    const i = c.etapes.findIndex((e) => e.id === vue.etapeId);
    const prochaine = c.etapes[i + 1];
    if (!prochaine) {
      suite = '<button class="principal" data-action="interro" data-focus>Le contrôle blanc →</button>';
    } else if (prochaine.seance !== etape.seance) {
      const s = c.seances.find((x) => x.numero === prochaine.seance);
      pause = `<p class="pause">Fin de la séance ${etape.seance}. La séance ${s.numero} peut attendre demain — ou continue si tu as le temps.</p>`;
      suite = `<button class="principal" data-action="etape" data-etape="${prochaine.id}" data-focus>Séance ${s.numero} : ${echapper(s.titre)} →</button>`;
    } else {
      suite = `<button class="principal" data-action="etape" data-etape="${prochaine.id}" data-focus>Étape suivante : ${echapper(prochaine.titre)} →</button>`;
    }
  } else if (vue.mode === 'interro') {
    suite = '<button class="principal" data-action="interro" data-focus>Refaire un contrôle blanc</button>';
  }

  return `
    <header class="entete-section">
      <button class="retour" data-action="chapitre" data-chapitre="${c.id}">← Chapitre ${c.numero}</button>
      <h1>${echapper(titre)}</h1>
      <p class="sous-titre">${echapper(resume)}</p>
    </header>
    <section class="carte bilan">${liste}</section>
    ${pause}
    <div class="actions actions--bas">
      ${suite}
      <button class="secondaire" data-action="chapitre" data-chapitre="${c.id}" ${suite ? '' : 'data-focus'}>Retour au chapitre</button>
    </div>`;
}

// ── Déroulé ─────────────────────────────────────────────────────────────────

const questionVierge = () => ({
  saisie: '', reponse: null, indice: false, ordre: null, options: null,
  ecrit: { texte: '', etape: 'saisie', cochees: [] },
});

function lancer(mode, tour, etapeId = null) {
  vue = { ecran: 'exercice', chapitreId: vue.chapitreId, etapeId, mode, tour, ...questionVierge() };
  rendre();
  haut();
}

function commencerEtape(etapeId) {
  const etape = etapeParId(etapeId);
  // Un écrit ne revient pas : réécrit juste après avoir lu l'exemple, il ne
  // prouverait rien.
  const ordre = estEcrit(etape) ? etape.items : melanger(etape.items);
  lancer('etape', nouveauTour(ordre.map((i) => ({ id: i.id })), { reprendre: !estEcrit(etape) }), etapeId);
}

function commencerRevoir() {
  const items = progres.aRevoir(profil, itemsDe(chapitreCourant()));
  if (items.length) lancer('revoir', nouveauTour(melanger(items).map((i) => ({ id: i.id }))));
}

function commencerInterro() {
  lancer('interro', nouveauTour(tirerInterro(chapitreCourant()), { reprendre: false }));
}

/** Enregistre une réponse : le premier essai dans la progression, et la reprise éventuelle. */
function noter(r) {
  const q = questionCourante();
  // Reconnaître une définition ne prouve pas qu'on sait écrire le mot : une
  // reconnaissance réussie n'efface pas un « à revoir », une ratée en crée un.
  const compte = !(q.mode === 'reconnaitre' && r.resultat === 'juste');
  if (compte && estPremierEssai(vue.tour, q.id)) garder(progres.noterEssai(profil, q.id, r.resultat));
  enregistrer(vue.tour, q, r.resultat);
  vue = { ...vue, reponse: r };
}

function valider() {
  if (vue.reponse) return;
  let r = comparer(vue.saisie, itemCourant());
  if (r.resultat === 'vide') return;
  if (vue.indice && r.resultat === 'juste') r = { resultat: 'presque', raison: 'indice' };
  noter(r);
  rendre();
}

function validerOrdre() {
  if (vue.reponse || !vue.ordre) return;
  const juste = vue.ordre.placees.every((i, rang) => i === rang);
  noter({ resultat: juste ? 'juste' : 'faux' });
  rendre();
}

function choisir(option) {
  if (vue.reponse) return;
  const q = questionCourante();
  const item = itemCourant();
  const r = q.mode === 'reconnaitre'
    ? { resultat: option === item.definition ? 'juste' : 'faux' }
    : comparer(option, item);
  noter({ ...r, choisi: option });
  rendre();
}

function suivant() {
  avancer(vue.tour);
  if (estFini(vue.tour)) return terminerTour();
  vue = { ...vue, ...questionVierge() };
  rendre();
  haut();
}

function terminerTour() {
  const b = bilan(vue.tour);
  if (vue.mode === 'etape') garder(progres.terminerEtape(profil, vue.etapeId, b));
  if (vue.mode === 'interro') garder(progres.noterInterro(profil, vue.chapitreId, note(vue.tour)));
  vue = { ecran: 'bilan', chapitreId: vue.chapitreId, etapeId: vue.etapeId, mode: vue.mode, tour: vue.tour, bilan: b };
  rendre();
  haut();
}

function noterEcrit(resultat) {
  noter({ resultat: commeResultat(resultat.verdict) });
  vue = { ...vue, ecrit: { ...vue.ecrit, etape: 'corrige', resultat } };
}

async function corrigerEcrit() {
  const texte = vue.ecrit.texte.trim();
  if (!texte) return;
  if (!merlin.disponible()) {
    vue = { ...vue, ecrit: { ...vue.ecrit, etape: 'auto', cochees: [] } };
    return rendre();
  }
  vue = { ...vue, ecrit: { ...vue.ecrit, etape: 'attente' } };
  const attente = vue.ecrit;
  rendre();

  const r = await merlin.corrigerEcrit({ item: itemCourant(), texte, profil: chapitreCourant().profilMerlin });
  // Il a pu arrêter pendant que Merlin lisait : tout changement d'écran
  // remplace cet état, et la réponse n'a plus où s'afficher.
  if (vue.ecrit !== attente) return;
  if (r.parMerlin) noterEcrit(r);
  else vue = { ...vue, ecrit: { ...vue.ecrit, etape: 'auto', cochees: [], merlinAbsent: true } };
  rendre();
}

function majSaisie(champ) {
  // En place : l'état d'un écrit sert de témoin pendant qu'on attend Merlin,
  // il ne doit pas être remplacé pour une frappe.
  if (champ.tagName === 'TEXTAREA') vue.ecrit.texte = champ.value;
  else vue.saisie = champ.value;
}

// ── Événements ──────────────────────────────────────────────────────────────

// Écrire : le collage est refusé sous toutes ses formes. Ce qui passerait à
// côté — une suggestion du presse-papiers d'un clavier de téléphone — se voit à
// la taille du bloc arrivé d'un coup (voir ecrit.js).
const COLLAGES = ['insertFromPaste', 'insertFromPasteAsQuotation', 'insertFromDrop', 'insertFromYank'];
const signalerCollage = () => {
  const alerte = app.querySelector('[data-alerte-collage]');
  if (alerte) alerte.hidden = false;
};
app.addEventListener('beforeinput', (e) => {
  if (e.target.hasAttribute?.('data-ecrit') && COLLAGES.includes(e.inputType)) {
    e.preventDefault();
    signalerCollage();
  }
});
for (const type of ['paste', 'drop']) {
  app.addEventListener(type, (e) => {
    if (!e.target.closest?.('[data-ecrit]')) return;
    e.preventDefault();
    signalerCollage();
  });
}

app.addEventListener('input', (e) => {
  const champ = e.target.closest('[data-saisie]');
  if (!champ) return;
  // Annuler (Ctrl+Z) ramène d'un coup ce qu'il avait tapé lui-même : le collage
  // étant refusé plus haut, l'historique ne contient rien d'autre.
  if (champ.hasAttribute('data-ecrit') && !e.inputType?.startsWith('history')
    && saisieSuspecte(vue.ecrit.texte, champ.value)) {
    champ.value = vue.ecrit.texte;
    signalerCollage();
    return;
  }
  majSaisie(champ);
});

app.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' || e.isComposing) return;
  if (!e.target.closest('input[data-saisie]')) return;
  e.preventDefault();
  if (vue.reponse) suivant();
  else valider();
});

app.addEventListener('click', (e) => {
  const c = e.target.closest('[data-action]');
  if (!c || c.disabled) return;

  switch (c.dataset.action) {
    case 'accueil':
      vue = { ecran: 'accueil' };
      rendre();
      return haut();
    case 'chapitre':
      vue = { ecran: 'chapitre', chapitreId: c.dataset.chapitre };
      rendre();
      return haut();
    case 'etape':
      vue = { ecran: 'fiche', chapitreId: vue.chapitreId, etapeId: c.dataset.etape };
      rendre();
      return haut();
    case 'fiche':
      vue = { ecran: 'fiche', chapitreId: vue.chapitreId, etapeId: null };
      rendre();
      return haut();
    case 'commencer': return commencerEtape(c.dataset.etape);
    case 'revoir': return commencerRevoir();
    case 'interro': return commencerInterro();
    case 'quitter':
      vue = { ecran: 'chapitre', chapitreId: vue.chapitreId };
      rendre();
      return haut();

    case 'valider': return valider();
    case 'choisir': return choisir(c.dataset.option);
    case 'indice':
      vue = { ...vue, indice: true };
      return rendre();
    case 'je-ne-sais-pas':
      if (vue.reponse) return;
      noter({ resultat: 'faux', raison: 'passe' });
      return rendre();
    case 'suivant': return suivant();

    case 'ordre-prendre':
      if (!vue.reponse && vue.ordre) vue.ordre.placees.push(Number(c.dataset.index));
      return rendre();
    case 'ordre-rendre':
      if (!vue.reponse && vue.ordre) vue.ordre.placees = vue.ordre.placees.filter((i) => i !== Number(c.dataset.index));
      return rendre();
    case 'valider-ordre': return validerOrdre();

    case 'corriger-ecrit': return corrigerEcrit();
    case 'cocher': {
      const id = c.dataset.critere;
      const cochees = vue.ecrit.cochees.includes(id)
        ? vue.ecrit.cochees.filter((x) => x !== id)
        : [...vue.ecrit.cochees, id];
      vue = { ...vue, ecrit: { ...vue.ecrit, cochees } };
      return rendre();
    }
    case 'valider-auto':
      noterEcrit(autoCorrection(vue.ecrit.cochees, itemCourant().criteres));
      return rendre();
    default:
  }
});

rendre();
