// Espagnol 5e — l'application.
//
// ── Pour qui, pour quoi ───────────────────────────────────────────────────
//
// Antonin commence l'espagnol (LV2). Chaque unité du manuel est reprise au fil
// des cours, en une RÉVISION EXPRESS de trente minutes au plus : c'est la
// contrainte posée par ses parents, et la raison d'un parcours en étapes
// minutées plutôt que d'un catalogue d'exercices.
//
// Dans chaque étape, la fiche d'abord (une minute), puis des questions où il
// PRODUIT l'espagnol : c'est le rappel qui fixe un mot, pas la relecture. Ce
// qu'il rate revient en fin d'étape, puis dans « À revoir » — cinq minutes le
// lendemain matin, juste avant l'interro.

import { UNIDADES, itemParId, itemsDe, uniteParId } from './data/unidades/index.js';
import { comparer, indiceDe, marquerDifferences, nOublie } from './comparer.js';
import { avancer, bilan, courant, enregistrer, estFini, estPremierEssai, melanger, note, nouveauTour, tirerInterro } from './tour.js';
import * as progres from './progres.js';
import * as merlin from './merlin.js';
import { autoCorrection, commeResultat } from './ecrit.js';
import { parler, voixPossible } from './voix.js';

const app = document.getElementById('app');

let profil = progres.charger();
let vue = { ecran: 'accueil' };

const garder = (p) => { profil = p; progres.sauver(profil); };

const uniteCourante = () => uniteParId(vue.uniteId);
const etapeParId = (id) => uniteCourante().etapes.find((e) => e.id === id);
const questionCourante = () => courant(vue.tour);
const itemCourant = () => itemParId(uniteCourante(), questionCourante().id);

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

const boutonEcouter = (texte) => (voixPossible()
  ? `<button type="button" class="ecouter" data-action="ecouter" data-texte="${echapper(texte)}" aria-label="Écouter">🔊</button>`
  : '');

const BRAVO = ['¡Muy bien!', '¡Perfecto!', '¡Eso es!', '¡Genial!', '¡Bravo!'];

/** Ce que l'item attend, tel qu'on l'affiche. */
function reponseAffichee(item) {
  if (item.type === 'adjectif' && item.fem && item.fem !== item.es) return `${item.es}, ${item.fem}`;
  if (item.type === 'trou') return item.phrase.replace('___', item.es);
  if (item.type === 'decrire') return item.modele;
  return item.es;
}

/** La question, en une ligne, pour les listes du bilan. */
function questionAffichee(item) {
  switch (item.type) {
    case 'mot':
    case 'adjectif': return `${item.emoji ? `${item.emoji} ` : ''}${echapper(item.fr)}`;
    case 'forme': return `<span lang="es">${echapper(item.verbe)} · ${echapper(item.personne)}</span>`;
    case 'trou': return item.verbe
      ? `<span lang="es">${echapper(item.phrase)}</span> <small>(${echapper(item.verbe)})</small>`
      : `<small>${echapper(item.consigne)}</small> <span lang="es">${echapper(item.phrase)}</span>`;
    case 'choix': return `${item.consigne ? `<small>${echapper(item.consigne)}</small> ` : ''}<span lang="es">${echapper(item.phrase)}</span>`;
    case 'pluriel': return `<span lang="es">${echapper(item.de)}</span>`;
    case 'decrire': return `${item.emoji} ${echapper(item.sujet)}`;
    default: return '';
  }
}

// ── Rendu ───────────────────────────────────────────────────────────────────

function rendre() {
  if (vue.ecran === 'unite') app.innerHTML = vueUnite();
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
  const cartes = UNIDADES.map((u) => {
    const faites = u.etapes.filter((e) => profil.etapes[e.id]?.faite).length
      + (progres.derniereInterro(profil, u.id) ? 1 : 0);
    const n = progres.derniereInterro(profil, u.id);
    return `
      <button class="unite" data-action="unite" data-unite="${u.id}">
        <span class="unite-numero">${u.numero}</span>
        <span class="unite-corps">
          <span class="unite-surtitre">Unidad ${u.numero}</span>
          <span class="unite-titre" lang="es">${echapper(u.titre)}</span>
          <span class="unite-detail">${faites} / ${u.etapes.length + 1} étapes${n ? ` · mini-interro ${formatNote(n)}` : ''}</span>
        </span>
      </button>`;
  }).join('');

  return `
    <header class="entete">
      <p class="surtitre">Espagnol · 5<sup>e</sup> · LV2</p>
      <h1>¡Hola! 👋</h1>
      <p class="sous-titre">Chaque unité du livre, reprise au fil des cours : trente minutes de révision, pas plus.</p>
    </header>
    <section class="liste">${cartes}</section>
    <p class="pied">
      ${merlin.disponible()
        ? '🎩 Merlin corrige les descriptions sur cet appareil.'
        : '🎩 Pas de clé Merlin sur cet appareil : les descriptions se corrigent avec le modèle.'}
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

function vueUnite() {
  const u = uniteCourante();
  const derniere = progres.derniereInterro(profil, u.id);
  const lignes = u.etapes.map((e, i) => {
    const etat = profil.etapes[e.id];
    const total = etat ? etat.justes + etat.presque + etat.faux : 0;
    const descriptions = e.items.every((x) => x.type === 'decrire');
    return ligneEtape({
      numero: i + 1,
      titre: e.titre,
      detail: e.sousTitre,
      duree: e.duree,
      faite: etat?.faite,
      resultat: etat && total ? `${etat.justes}/${total} ${descriptions ? 'justes' : 'du premier coup'}` : '',
      attributs: `data-action="etape" data-etape="${e.id}"`,
    });
  });
  lignes.push(ligneEtape({
    numero: u.etapes.length + 1,
    titre: 'Mini-interro',
    detail: 'Dix questions de tout, sans indice',
    duree: u.interro.duree,
    faite: Boolean(derniere),
    resultat: derniere ? formatNote(derniere) : '',
    attributs: 'data-action="interro"',
  }));

  const total = u.etapes.reduce((s, e) => s + e.duree, 0) + u.interro.duree;
  const prochaine = u.etapes.find((e) => !profil.etapes[e.id]?.faite);
  const commencee = u.etapes.some((e) => profil.etapes[e.id]?.faite);
  const principal = prochaine
    ? `<button class="principal" data-action="etape" data-etape="${prochaine.id}" data-focus>${commencee ? `Continuer : ${echapper(prochaine.titre)}` : 'Commencer'} →</button>`
    : `<button class="principal" data-action="interro" data-focus>${derniere ? 'Refaire une mini-interro' : 'La mini-interro'} →</button>`;

  const revoir = progres.aRevoir(profil, itemsDe(u));
  const carteRevoir = revoir.length ? `
    <button class="raccourci" data-action="revoir">
      <span class="raccourci-titre">🔁 À revoir · ${pluriel(revoir.length, 'question')}</span>
      <span class="raccourci-detail">Ce qui n'est pas encore sorti du premier coup. Parfait pour cinq minutes le lendemain matin.</span>
    </button>` : '';

  return `
    <header class="entete-section">
      <button class="retour" data-action="accueil">← Mes unités</button>
      <p class="surtitre">Unidad ${u.numero}</p>
      <h1 lang="es">${echapper(u.titre)}</h1>
      <p class="sous-titre">${echapper(u.detail)}</p>
    </header>
    <section class="carte parcours">
      <h2>Révision express <span class="duree-totale">${total} min</span></h2>
      <div class="etapes">${lignes.join('')}</div>
      <div class="actions">${principal}</div>
    </section>
    <div class="raccourcis">
      ${carteRevoir}
      <button class="raccourci" data-action="fiche">
        <span class="raccourci-titre">📄 Toute la fiche</span>
        <span class="raccourci-detail">Le vocabulaire et la grammaire de l'unité, à relire juste avant l'interro.</span>
      </button>
    </div>`;
}

// ── La fiche ────────────────────────────────────────────────────────────────

const PERSONNES = ['yo', 'tú', 'él, ella', 'nosotros', 'vosotros', 'ellos, ellas'];

function bloc(b) {
  if (b.type === 'vocabulaire') {
    return `
      <div class="bloc">
        <h3>${echapper(b.titre)}</h3>
        <table class="vocab">
          ${b.mots.map((m) => `
            <tr>
              <td class="vocab-emoji" aria-hidden="true">${m.emoji ?? ''}</td>
              <td class="vocab-es" lang="es">${echapper(m.es)}</td>
              <td class="vocab-fr">${echapper(m.fr)}</td>
              <td class="vocab-son">${boutonEcouter(m.es)}</td>
            </tr>`).join('')}
        </table>
      </div>`;
  }
  if (b.type === 'conjugaison') {
    return `
      <div class="bloc">
        <h3>Au présent</h3>
        <table class="conjugaison" lang="es">
          <thead><tr><th></th>${b.verbes.map((v) => `<th>${v.infinitif}<span lang="fr">${v.sens}</span></th>`).join('')}</tr></thead>
          <tbody>
            ${PERSONNES.map((p, i) => `<tr><th>${p}</th>${b.verbes.map((v) => `<td>${v.formes[i]}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
        ${voixPossible() ? `<p class="ecouter-ligne">${b.verbes.map((v) => `
          <button type="button" class="lien-son" data-action="ecouter" data-texte="${echapper(v.formes.join(', '))}">🔊 ${v.infinitif}</button>`).join('')}</p>` : ''}
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
  const u = uniteCourante();
  const seule = vue.etapeId ? etapeParId(vue.etapeId) : null;
  const etapes = seule ? [seule] : u.etapes;
  const corps = etapes.map((e) => `
    ${seule ? '' : `<h2 class="fiche-etape">${echapper(e.titre)} <span>${echapper(e.sousTitre)}</span></h2>`}
    ${e.fiche.map(bloc).join('')}`).join('');

  return `
    <header class="entete-section">
      <button class="retour" data-action="unite" data-unite="${u.id}">← Unidad ${u.numero}</button>
      <h1>${seule ? echapper(seule.titre) : 'Toute la fiche'}</h1>
      <p class="sous-titre">${seule
        ? `${echapper(seule.sousTitre)} — lis la fiche une minute, puis entraîne-toi.`
        : "Le vocabulaire et la grammaire de l'unité."}</p>
    </header>
    <section class="carte fiche">${corps}</section>
    ${seule ? `
      <div class="actions actions--bas">
        <button class="principal" data-action="commencer" data-etape="${seule.id}" data-focus>Je m'entraîne →</button>
      </div>` : ''}`;
}

// ── Les questions ───────────────────────────────────────────────────────────

function vueExercice() {
  const q = questionCourante();
  const item = itemCourant();
  const total = vue.tour.file.length;
  const titre = vue.mode === 'interro' ? 'Mini-interro' : vue.mode === 'revoir' ? 'À revoir' : etapeParId(vue.etapeId).titre;

  let corps;
  if (item.type === 'decrire') corps = vueDecrire(item);
  else if (q.mode === 'reconnaitre') corps = vueReconnaitre(item, q);
  else if (item.type === 'choix') corps = vueChoix(item);
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
    case 'mot': return {
      consigne: /^(el|la|los|las) /.test(item.es) ? "En espagnol, avec l'article :" : 'En espagnol :',
      enonce: `${item.emoji ? `<span class="emoji">${item.emoji}</span>` : ''}${echapper(item.fr)}`,
    };
    case 'adjectif': return { consigne: 'En espagnol :', enonce: echapper(item.fr) };
    case 'forme': return {
      consigne: 'Conjugue au présent :',
      enonce: `<span lang="es"><strong>${echapper(item.verbe)}</strong> → ${echapper(item.personne)} …</span>`,
    };
    case 'trou': return {
      // Un trou sans verbe porte sa propre consigne : « Pour dire « plus grand que » : ».
      consigne: item.verbe ? `Complète avec le verbe <strong lang="es">${echapper(item.verbe)}</strong> :` : echapper(item.consigne),
      enonce: `<span lang="es">${echapper(item.phrase).replace('___', '<span class="trou">…</span>')}</span>`,
    };
    case 'pluriel': return { consigne: 'Mets au pluriel :', enonce: `<span lang="es">${echapper(item.de)}</span>` };
    default: return { consigne: '', enonce: '' };
  }
}

const barreAccents = () => `
  <div class="accents" aria-label="Lettres espagnoles">
    ${['á', 'é', 'í', 'ó', 'ú', 'ñ'].map((c) => `<button type="button" data-action="accent" data-car="${c}">${c}</button>`).join('')}
  </div>`;

function vueSaisie(item) {
  const { consigne, enonce } = enonceSaisie(item);
  const repondu = Boolean(vue.reponse);
  const long = item.type === 'pluriel' && item.de.includes(' ');
  return `
    <p class="consigne">${consigne}</p>
    <p class="enonce">${enonce}</p>
    <input class="saisie${long ? ' saisie--longue' : ''}" data-saisie type="text" lang="es"
           autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" enterkeyhint="done"
           aria-label="Ta réponse" value="${echapper(vue.saisie)}" ${repondu ? 'readonly' : ''}>
    ${repondu ? vueRetour(item) : `
      ${barreAccents()}
      ${vue.indice ? `<p class="indice">💡 <span lang="es">${echapper(indiceDe(item))}</span></p>` : ''}
      <div class="actions">
        <button class="principal" data-action="valider">Valider</button>
        ${vue.mode === 'interro' || vue.indice ? '' : '<button class="secondaire" data-action="indice">💡 Indice</button>'}
        <button class="lien" data-action="je-ne-sais-pas">Je ne sais pas</button>
      </div>`}`;
}

/** Ce qu'on dit après une réponse tapée. */
function vueRetour(item) {
  const r = vue.reponse;
  const attendu = r.attendu ?? item.es;
  const titres = { juste: `✓ ${BRAVO[vue.tour.index % BRAVO.length]}`, presque: '≈ Presque !', faux: '✗ Pas tout à fait' };

  const pourquoi = [];
  if (r.raison === 'accent') pourquoi.push(nOublie(vue.saisie, attendu) ? "N'oublie pas le ñ." : "Attention à l'accent.");
  if (r.raison === 'article-oublie') pourquoi.push("N'oublie pas l'article.");
  if (r.raison === 'article-faux') pourquoi.push("Attention à l'article : le genre n'est pas le même.");
  if (r.accent) pourquoi.push(nOublie(vue.saisie, attendu) ? "Et n'oublie pas le ñ." : "Et attention à l'accent.");
  if (r.raison === 'indice') pourquoi.push("Juste, mais avec l'indice : il reviendra.");
  if (r.message) pourquoi.push(r.message);
  else if (r.resultat !== 'juste') {
    if (item.note) pourquoi.push(item.note);
    if (item.explication) pourquoi.push(item.explication);
  }

  // Une phrase à mettre au pluriel : on montre le corrigé mot à mot, avec ce
  // qu'il a raté en couleur. Pour un mot seul, le corrigé suffit.
  const phrase = item.type === 'pluriel' && item.es.includes(' ') && r.resultat !== 'juste' && r.raison !== 'passe';
  const corrige = phrase
    ? marquerDifferences(vue.saisie, item.es).map((m) => (m.ok ? echapper(m.mot) : `<mark>${echapper(m.mot)}</mark>`)).join(' ')
    : echapper(r.attendu ?? reponseAffichee(item));

  return `
    <div class="retour-reponse est-${r.resultat}">
      <p class="verdict">${titres[r.resultat]}</p>
      <p class="corrige"><span lang="es">${corrige}</span> ${boutonEcouter(r.attendu ?? reponseAffichee(item))}</p>
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
  return `
    <p class="consigne">${echapper(item.consigne ?? 'Choisis le bon verbe :')}</p>
    <p class="enonce"><span lang="es">${echapper(item.phrase).replace('___', '<span class="trou">…</span>')}</span></p>
    ${vueOptions(item.options, item.es, r?.choisi)}
    ${r ? `
      <div class="retour-reponse est-${r.resultat}">
        <p class="verdict">${r.resultat === 'juste' ? `✓ ${BRAVO[vue.tour.index % BRAVO.length]}` : '✗ Pas tout à fait'}</p>
        <p class="corrige"><span lang="es">${echapper(item.phrase.replace('___', item.es))}</span> ${boutonEcouter(item.phrase.replace('___', item.es))}</p>
        <p class="pourquoi">${echapper(item.explication)}</p>
      </div>
      <div class="actions"><button class="principal" data-action="suivant" data-focus>Suivant →</button></div>` : ''}`;
}

function vueReconnaitre(item, q) {
  const r = vue.reponse;
  return `
    <p class="consigne">Que veut dire :</p>
    <p class="enonce"><span lang="es">${echapper(item.es)}</span> ${boutonEcouter(item.es)}</p>
    ${vueOptions(q.options, item.fr, r?.choisi)}
    ${r ? `
      <div class="retour-reponse est-${r.resultat}">
        <p class="verdict">${r.resultat === 'juste' ? `✓ ${BRAVO[vue.tour.index % BRAVO.length]}` : '✗ Pas tout à fait'}</p>
        <p class="corrige"><span lang="es">${echapper(reponseAffichee(item))}</span> = ${echapper(item.fr)}</p>
      </div>
      <div class="actions"><button class="principal" data-action="suivant" data-focus>Suivant →</button></div>` : ''}`;
}

// ── Décrire ─────────────────────────────────────────────────────────────────

const VERDICTS = { juste: '✓ ¡Perfecto!', presque: '≈ Presque !', 'a-reprendre': '✗ À reprendre' };
const ICONES = { present: '✓', absent: '○', faux: '✗' };

function vueModele(item) {
  return `
    <div class="modele">
      <p class="modele-titre">${echapper(item.titreModele ?? 'Le modèle')} ${boutonEcouter(item.modele)}</p>
      <p lang="es">${echapper(item.modele)}</p>
    </div>`;
}

function vueDecrire(item) {
  const e = vue.ecrit;
  const entete = `
    <p class="consigne">${echapper(item.consigne)}</p>
    <p class="sujet"><span class="emoji">${item.emoji}</span> <span lang="es">${echapper(item.sujet)}</span></p>
    <p class="indices">${item.indices.map((m) => `<span lang="es">${echapper(m)}</span>`).join('')}</p>`;
  const zone = `
    <textarea class="saisie redaction" data-saisie lang="es" rows="4" aria-label="Ta description"
              autocomplete="off" autocorrect="off" autocapitalize="sentences" spellcheck="false"
              placeholder="Escribe aquí…" ${e.etape === 'saisie' ? '' : 'readonly'}>${echapper(e.texte)}</textarea>`;

  if (e.etape === 'saisie') {
    return `${entete}${zone}${barreAccents()}
      <div class="actions">
        <button class="principal" data-action="corriger-description">
          ${merlin.disponible() ? '🎩 Faire corriger par Merlin' : 'Voir le modèle et me corriger'}
        </button>
      </div>`;
  }
  if (e.etape === 'attente') return `${entete}${zone}<p class="attente">🎩 Merlin lit ta description…</p>`;

  if (e.etape === 'auto') {
    return `${entete}${zone}
      ${e.merlinAbsent ? "<p class=\"note\">Merlin n'a pas pu répondre : corrige-toi avec le modèle.</p>" : ''}
      ${vueModele(item)}
      <p class="consigne consigne--suite">Coche ce que tu as fait juste :</p>
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
        <p class="modele-titre">Ta description corrigée ${boutonEcouter(r.corrige)}</p>
        <p lang="es">${echapper(r.corrige)}</p>
      </div>` : ''}
    ${vueModele(item)}
    <div class="actions"><button class="principal" data-action="suivant" data-focus>Suivant →</button></div>`;
}

// ── Le bilan ────────────────────────────────────────────────────────────────

function vueBilan() {
  const u = uniteCourante();
  const b = vue.bilan;
  const rates = b.rates.map((id) => itemParId(u, id)).filter(Boolean);

  let titre;
  let resume;
  if (vue.mode === 'interro') {
    const n = note(vue.tour);
    titre = `Mini-interro : ${formatNote(n)}`;
    resume = n.points === n.sur ? '¡Perfecto! Tout est juste.'
      : n.points >= 0.8 * n.sur ? '¡Muy bien! Relis juste ce qui est ci-dessous.'
      : n.points >= 0.5 * n.sur ? 'Pas mal ! Relis la fiche de ce que tu as raté, ci-dessous.'
        : "Reprends « À revoir », puis refais une mini-interro.";
  } else if (vue.mode === 'etape' && etapeParId(vue.etapeId).items.every((i) => i.type === 'decrire')) {
    titre = `${etapeParId(vue.etapeId).titre} : terminé ✓`;
    resume = `Descriptions : ${pluriel(b.justes, 'juste')}, ${b.presque} presque, ${b.faux} à reprendre.`;
  } else {
    titre = vue.mode === 'revoir' ? 'À revoir : terminé' : `${etapeParId(vue.etapeId).titre} : terminé ✓`;
    resume = `Du premier coup : ${pluriel(b.justes, 'juste')}, ${b.presque} presque, ${pluriel(b.faux, 'raté')}.`;
  }

  const liste = rates.length ? `
    <h2>À retenir</h2>
    <ul class="rates">
      ${rates.map((item) => `
        <li class="est-${vue.tour.premiers[item.id]}">
          <span class="rate-question">${questionAffichee(item)}</span>
          <span class="rate-reponse"><span lang="es">${echapper(reponseAffichee(item))}</span> ${boutonEcouter(reponseAffichee(item))}</span>
        </li>`).join('')}
    </ul>` : '<p class="bravo">Tout juste du premier coup. 🎉</p>';

  let suite;
  if (vue.mode === 'etape') {
    const i = u.etapes.findIndex((e) => e.id === vue.etapeId);
    const prochaine = u.etapes[i + 1];
    suite = prochaine
      ? `<button class="principal" data-action="etape" data-etape="${prochaine.id}" data-focus>Étape suivante : ${echapper(prochaine.titre)} →</button>`
      : '<button class="principal" data-action="interro" data-focus>La mini-interro →</button>';
  } else if (vue.mode === 'interro') {
    suite = '<button class="principal" data-action="interro" data-focus>Refaire une mini-interro</button>';
  } else {
    suite = '';
  }

  return `
    <header class="entete-section">
      <button class="retour" data-action="unite" data-unite="${u.id}">← Unidad ${u.numero}</button>
      <h1>${echapper(titre)}</h1>
      <p class="sous-titre">${echapper(resume)}</p>
    </header>
    <section class="carte bilan">${liste}</section>
    <div class="actions actions--bas">
      ${suite}
      <button class="secondaire" data-action="unite" data-unite="${u.id}" ${suite ? '' : 'data-focus'}>Retour à l'unité</button>
    </div>`;
}

// ── Déroulé ─────────────────────────────────────────────────────────────────

const questionVierge = () => ({ saisie: '', reponse: null, indice: false, ecrit: { texte: '', etape: 'saisie', cochees: [] } });

function lancer(mode, tour, etapeId = null) {
  vue = { ecran: 'exercice', uniteId: vue.uniteId, etapeId, mode, tour, ...questionVierge() };
  rendre();
  haut();
}

function commencerEtape(etapeId) {
  const items = etapeParId(etapeId).items;
  const decrire = items.every((i) => i.type === 'decrire');
  // Les descriptions gardent leur ordre (la catrina, puis soi) et ne reviennent
  // pas : une description réécrite juste après avoir lu le modèle ne prouve rien.
  const ordre = decrire ? items : melanger(items);
  lancer('etape', nouveauTour(ordre.map((i) => ({ id: i.id })), { reprendre: !decrire }), etapeId);
}

function commencerRevoir() {
  const items = progres.aRevoir(profil, itemsDe(uniteCourante()));
  if (items.length) lancer('revoir', nouveauTour(melanger(items).map((i) => ({ id: i.id }))));
}

function commencerInterro() {
  lancer('interro', nouveauTour(tirerInterro(uniteCourante()), { reprendre: false }));
}

/** Enregistre une réponse : le premier essai dans la progression, et la reprise éventuelle. */
function noter(r) {
  const q = questionCourante();
  // Reconnaître un mot ne prouve pas qu'on sait l'écrire : une reconnaissance
  // réussie n'efface pas un « à revoir », une ratée en crée un.
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

function choisir(option) {
  if (vue.reponse) return;
  const q = questionCourante();
  const item = itemCourant();
  const r = q.mode === 'reconnaitre'
    ? { resultat: option === item.fr ? 'juste' : 'faux' }
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
  if (vue.mode === 'interro') garder(progres.noterInterro(profil, vue.uniteId, note(vue.tour)));
  vue = { ecran: 'bilan', uniteId: vue.uniteId, etapeId: vue.etapeId, mode: vue.mode, tour: vue.tour, bilan: b };
  rendre();
  haut();
}

function noterDescription(resultat) {
  noter({ resultat: commeResultat(resultat.verdict) });
  vue = { ...vue, ecrit: { ...vue.ecrit, etape: 'corrige', resultat } };
}

async function corrigerDescription() {
  const texte = vue.ecrit.texte.trim();
  if (!texte) return;
  if (!merlin.disponible()) {
    vue = { ...vue, ecrit: { ...vue.ecrit, etape: 'auto', cochees: [] } };
    return rendre();
  }
  vue = { ...vue, ecrit: { ...vue.ecrit, etape: 'attente' } };
  const attente = vue.ecrit;
  rendre();

  const r = await merlin.corrigerDescription({ item: itemCourant(), texte });
  // Il a pu arrêter pendant que Merlin lisait : tout changement d'écran
  // remplace cet état, et la réponse n'a plus où s'afficher.
  if (vue.ecrit !== attente) return;
  if (r.parMerlin) noterDescription(r);
  else vue = { ...vue, ecrit: { ...vue.ecrit, etape: 'auto', cochees: [], merlinAbsent: true } };
  rendre();
}

function insererCaractere(car) {
  const champ = app.querySelector('[data-saisie]:not([readonly])');
  if (!champ) return;
  const debut = champ.selectionStart ?? champ.value.length;
  const fin = champ.selectionEnd ?? debut;
  champ.value = champ.value.slice(0, debut) + car + champ.value.slice(fin);
  champ.setSelectionRange(debut + car.length, debut + car.length);
  champ.focus();
  majSaisie(champ);
}

function majSaisie(champ) {
  // En place : l'état d'une description sert de témoin pendant qu'on attend
  // Merlin, il ne doit pas être remplacé pour une frappe.
  if (champ.tagName === 'TEXTAREA') vue.ecrit.texte = champ.value;
  else vue.saisie = champ.value;
}

// ── Événements ──────────────────────────────────────────────────────────────

app.addEventListener('input', (e) => {
  const champ = e.target.closest('[data-saisie]');
  if (champ) majSaisie(champ);
});

app.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' || e.isComposing) return;
  if (!e.target.closest('input[data-saisie]')) return;
  e.preventDefault();
  if (vue.reponse) suivant();
  else valider();
});

// Toucher une lettre accentuée ne doit pas fermer le clavier du téléphone.
app.addEventListener('pointerdown', (e) => {
  if (e.target.closest('[data-action="accent"]')) e.preventDefault();
});

app.addEventListener('click', (e) => {
  const c = e.target.closest('[data-action]');
  if (!c || c.disabled) return;

  switch (c.dataset.action) {
    case 'accueil':
      vue = { ecran: 'accueil' };
      rendre();
      return haut();
    case 'unite':
      vue = { ecran: 'unite', uniteId: c.dataset.unite };
      rendre();
      return haut();
    case 'etape':
      vue = { ecran: 'fiche', uniteId: vue.uniteId, etapeId: c.dataset.etape };
      rendre();
      return haut();
    case 'fiche':
      vue = { ecran: 'fiche', uniteId: vue.uniteId, etapeId: null };
      rendre();
      return haut();
    case 'commencer': return commencerEtape(c.dataset.etape);
    case 'revoir': return commencerRevoir();
    case 'interro': return commencerInterro();
    case 'quitter':
      vue = { ecran: 'unite', uniteId: vue.uniteId };
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

    case 'accent': return insererCaractere(c.dataset.car);
    case 'ecouter': return parler(c.dataset.texte);

    case 'corriger-description': return corrigerDescription();
    case 'cocher': {
      const id = c.dataset.critere;
      const cochees = vue.ecrit.cochees.includes(id)
        ? vue.ecrit.cochees.filter((x) => x !== id)
        : [...vue.ecrit.cochees, id];
      vue = { ...vue, ecrit: { ...vue.ecrit, cochees } };
      return rendre();
    }
    case 'valider-auto':
      noterDescription(autoCorrection(vue.ecrit.cochees, itemCourant().criteres));
      return rendre();
    default:
  }
});

rendre();
