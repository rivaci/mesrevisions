// Maths 4e — l'application.
//
// La structure est celle d'un manuel : chapitre → savoir-faire → six sections
// (découvrir, cours, méthode, s'entraîner, problèmes, se tester). La pédagogie
// de la charte est ce qui se passe À L'INTÉRIEUR d'une section : l'élève tape
// sa réponse, et quand elle correspond à une erreur prévue, le dialogue part
// de la confusion qui l'a produite.
//
// ── Ce qui change par rapport au premier prototype ────────────────────────
//
// Le prototype partait des pièges et fabriquait une appli autour ; tout était
// en QCM à deux options. Le comptage des manuels a tranché : sur 1 049 verbes
// de consigne, « calculer » pèse 21 %, « construire » 11 %, « compléter » 6,5 %
// — et le QCM environ 5 %, cantonné à la fin de chapitre. Ici l'élève produit
// une réponse ; les distracteurs ne sont plus affichés, ils sont devenus les
// réponses fausses PRÉVUES, qui servent au diagnostic sans jamais être montrées.

import CHAPITRE from './data/chapitres/ch01-relatifs.js';
import { PIEGES } from './data/pieges.js';
import { apresReponse, estAcquis, etatInitial } from './srs.js';
import { echapper, enrichir, lireNombre, maths, mathsBloc, memeNombre, nombre, paragraphes } from './rendu.js';

const CLE = 'maths4e.profil';
const app = document.getElementById('app');

// ── Profil ──────────────────────────────────────────────────────────────────

const charger = () => {
  try { return JSON.parse(localStorage.getItem(CLE)) ?? null; } catch { return null; }
};

let profil = charger() ?? { savoirFaire: {}, pieges: {}, seance: 1, sectionsVues: [] };
const sauver = () => localStorage.setItem(CLE, JSON.stringify(profil));

const etatSf = (id) => profil.savoirFaire[id] ?? etatInitial();
const etatPiege = (id) => profil.pieges[id] ?? etatInitial();

// ── Navigation ──────────────────────────────────────────────────────────────

const SECTIONS = [
  { cle: 'decouvrir', titre: 'Découvrir' },
  { cle: 'cours', titre: 'Le cours' },
  { cle: 'methode', titre: 'La méthode' },
  { cle: 'entrainement', titre: "S'entraîner" },
  { cle: 'problemes', titre: 'Des problèmes' },
  { cle: 'test', titre: 'Se tester' },
];

let vue = { ecran: 'sommaire' };

const sfCourant = () => CHAPITRE.savoirFaire.find((s) => s.id === vue.sfId);

/** Les sections réellement présentes dans ce savoir-faire. */
const sectionsDe = (sf) =>
  SECTIONS.filter((s) => {
    const v = sf[s.cle];
    return Array.isArray(v) ? v.length > 0 : !!v;
  });

function ouvrir(sfId, cleSection) {
  const sf = CHAPITRE.savoirFaire.find((s) => s.id === sfId);
  const dispo = sectionsDe(sf);
  const section = cleSection ?? dispo[0].cle;
  vue = { ecran: 'section', sfId, section, index: 0, saisie: {}, retour: null };
  rendre();
}

function sectionSuivante() {
  const sf = sfCourant();
  const dispo = sectionsDe(sf);
  const i = dispo.findIndex((s) => s.cle === vue.section);
  if (i < dispo.length - 1) return ouvrir(sf.id, dispo[i + 1].cle);
  // Fin du savoir-faire : on note qu'il a été parcouru et on revient au sommaire.
  if (!profil.sectionsVues.includes(sf.id)) profil.sectionsVues.push(sf.id);
  profil.seance += 1;
  sauver();
  vue = { ecran: 'sommaire' };
  rendre();
}

// ── Réponses ────────────────────────────────────────────────────────────────

function noter(sf, ex, correct) {
  const palier = ex.palier ?? 1;
  profil.savoirFaire[sf.id] = apresReponse(etatSf(sf.id), correct, profil.seance, palier);
  if (ex.piege) profil.pieges[ex.piege] = apresReponse(etatPiege(ex.piege), correct, profil.seance, palier);
  sauver();
}

/** L'exercice courant de la section en cours. */
const exCourant = () => {
  const sf = sfCourant();
  const lot = sf[vue.section];
  return Array.isArray(lot) ? lot[vue.index] : null;
};

/**
 * Corriger une réponse.
 *
 * Le cœur du dispositif : quand la réponse est fausse, on regarde si elle
 * figure parmi les erreurs PRÉVUES. Si oui, on connaît la confusion et on
 * ouvre le dialogue dessus. Sinon on ne devine pas — on demande.
 */
function corriger(donnee) {
  const sf = sfCourant();
  const ex = exCourant();
  let correct = false;
  let piege = null;

  if (ex.type === 'calcul') {
    const n = lireNombre(donnee.a);
    if (n === null) return;
    correct = memeNombre(n, ex.attendu);
    if (!correct) piege = (ex.fausses ?? []).find((f) => memeNombre(f.valeur, n))?.piege ?? null;
  } else if (ex.type === 'trous') {
    const valeurs = ex.champs.map((c) => lireNombre(donnee[c.id]));
    if (valeurs.some((v) => v === null)) return;
    correct = ex.champs.every((c, i) => memeNombre(valeurs[i], c.attendu));
    if (!correct) piege = (ex.fausses ?? []).find((f) => valeurs.some((v) => memeNombre(f.valeur, v)))?.piege ?? null;
  } else if (ex.type === 'signe' || ex.type === 'plausible' || ex.type === 'vraifaux') {
    if (donnee.a == null) return;
    correct = donnee.a === ex.attendu;
    if (!correct) piege = (ex.fausses ?? []).find((f) => f.valeur === donnee.a)?.piege ?? ex.piege ?? null;
  } else if (ex.type === 'corriger') {
    if (donnee.a == null) return;
    correct = ex.lignes[donnee.a]?.fausse === true;
    if (!correct) piege = ex.piege ?? null;
  }

  noter(sf, ex, correct);

  // Une affirmation fausse ne se réfute pas en cochant « faux » : il faut
  // produire un contre-exemple. Répondre juste ne termine donc PAS l'exercice
  // — c'est là qu'est la compétence, et c'est ce que demande la consigne.
  if (ex.type === 'vraifaux' && ex.attendu === false && ex.contreExemple) {
    vue = correct
      ? { ...vue, retour: { correct: true, piege: null }, etape: 'contre-exemple', ce: {} }
      : { ...vue, retour: { correct: false, piege }, etape: 'contre-exemple', ce: {}, ceVerdict: null };
    return rendre();
  }

  if (correct) {
    vue = { ...vue, retour: { correct: true } };
  } else if (piege) {
    vue = { ...vue, retour: { correct: false, piege }, etape: 'pourquoi' };
  } else {
    vue = { ...vue, retour: { correct: false, piege: null }, etape: 'inconnu' };
  }
  rendre();
}

function verifierContreExemple() {
  const ex = exCourant();
  const a = lireNombre(vue.ce.a);
  const b = lireNombre(vue.ce.b);
  if (a === null || b === null) return;
  let ok = false;
  try { ok = ex.contreExemple.valide(a, b); } catch { ok = false; }
  vue = { ...vue, ceVerdict: ok ? 'juste' : 'rate', ceEssais: (vue.ceEssais ?? 0) + 1 };
  if (ok || vue.ceEssais >= 2) vue = { ...vue, etape: 'explication' };
  rendre();
}

function suivant() {
  const sf = sfCourant();
  const lot = sf[vue.section];
  const dernier = !Array.isArray(lot) || vue.index >= lot.length - 1;
  if (dernier) return sectionSuivante();
  vue = { ...vue, index: vue.index + 1, saisie: {}, retour: null, etape: null, ce: {}, ceEssais: 0, ceVerdict: null };
  rendre();
}

// ── Rendu ───────────────────────────────────────────────────────────────────

function rendre() {
  app.innerHTML = vue.ecran === 'sommaire' ? vueSommaire() : vueSection();
  const premier = app.querySelector('input');
  if (premier) premier.focus();
}

function vueSommaire() {
  const cartes = CHAPITRE.savoirFaire.map((sf, i) => {
    const etat = etatSf(sf.id);
    const vu = profil.sectionsVues.includes(sf.id);
    const acquis = estAcquis(etat);
    const etiquette = acquis ? 'Acquis' : vu ? 'À consolider' : etat.reussites + etat.echecs > 0 ? 'Commencé' : '';
    return `
      <button class="sf" data-ouvrir="${sf.id}">
        <span class="sf-numero">${i + 1}</span>
        <span class="sf-corps">
          <span class="sf-titre">${echapper(sf.titre)}</span>
          <span class="sf-detail">${(sf.entrainement ?? []).length} exercices · ${(sf.problemes ?? []).length} problèmes</span>
        </span>
        ${etiquette ? `<span class="sf-etat ${acquis ? 'est-acquis' : ''}">${etiquette}</span>` : ''}
      </button>`;
  }).join('');

  return `
    <header class="entete">
      <p class="surtitre">Chapitre ${CHAPITRE.numero} · ${echapper(CHAPITRE.theme)}</p>
      <h1>${echapper(CHAPITRE.titre)}</h1>
      <p class="sous-titre">${CHAPITRE.savoirFaire.length} savoir-faire</p>
    </header>
    <div class="sommaire">${cartes}</div>
    <details class="prerequis">
      <summary>Ce qu'il faut savoir avant</summary>
      <ul>${CHAPITRE.prerequis.map((p) => `<li>${echapper(p)}</li>`).join('')}</ul>
    </details>`;
}

function vueSection() {
  const sf = sfCourant();
  const dispo = sectionsDe(sf);
  const onglets = dispo.map((s) => `
    <button class="onglet ${s.cle === vue.section ? 'actif' : ''}" data-section="${s.cle}">${s.titre}</button>`).join('');

  const corps = {
    decouvrir: vueDecouvrir,
    cours: vueCours,
    methode: vueMethode,
    entrainement: vueExercice,
    problemes: vueProbleme,
    test: vueExercice,
  }[vue.section](sf);

  return `
    <header class="entete-section">
      <button class="retour" data-action="sommaire">← Chapitre ${CHAPITRE.numero}</button>
      <h1>${echapper(sf.titre)}</h1>
    </header>
    <nav class="onglets">${onglets}</nav>
    ${corps}`;
}

function vueDecouvrir(sf) {
  const d = sf.decouvrir;
  const lignes = d.lignes ? `
    <div class="suite">${d.lignes.map((l) => `
      <div class="suite-ligne"><span>${maths(l.calcul)}</span><span class="suite-egal">=</span><span>${maths(l.resultat)}</span></div>`).join('')}
    </div>` : '';
  const copies = d.copies ? `
    <div class="copies">${d.copies.map((c) => `
      <div class="copie">
        <p class="copie-nom">${echapper(c.nom)}</p>
        <p class="copie-calcul">${echapper(c.calcul)}</p>
        <p class="copie-resultat">${echapper(c.resultat)}</p>
      </div>`).join('')}
    </div>` : '';
  const champs = (d.champs ?? []).map((c) => champNombre(c.id, c.etiquette)).join('');
  const fini = vue.retour?.correct;

  return `
    <section class="carte">
      <h2>${echapper(d.titre)}</h2>
      ${paragraphes(d.texte)}
      ${lignes}${copies}
      <p class="consigne">${echapper(d.question)}</p>
      ${champs}
      ${fini ? `<div class="conclusion">${paragraphes(d.conclusion)}</div>
                <button class="principal" data-action="section-suivante">Passer au cours</button>`
             : `<button class="principal" data-action="valider-decouverte">Valider</button>`}
    </section>`;
}

function vueCours(sf) {
  const blocs = sf.cours.map((b) => `
    <div class="bloc bloc-${b.type}">
      <p class="bloc-type">${{ definition: 'Définition', propriete: 'Propriété', theoreme: 'Théorème', remarque: 'Remarque', exemple: 'Exemple' }[b.type]}${b.titre ? ` — ${echapper(b.titre)}` : ''}</p>
      ${b.type === 'exemple' ? `<p class="bloc-exemple">${echapper(b.texte)}</p>` : paragraphes(b.texte)}
    </div>`).join('');
  return `
    <section class="carte">
      ${blocs}
      <button class="principal" data-action="section-suivante">J'ai lu</button>
    </section>`;
}

function vueMethode(sf) {
  const m = sf.methode;
  const etapes = m.etapes.map((e, i) => `
    <li>
      <span class="etape-texte">${echapper(e.texte)}</span>
      ${e.note ? `<span class="etape-note">${echapper(e.note)}</span>` : ''}
    </li>`).join('');
  return `
    <section class="carte">
      <h2>${echapper(m.titre)}</h2>
      <p class="methode-enonce">${echapper(m.enonce)}</p>
      <ol class="etapes">${etapes}</ol>
      <p class="controle"><strong>Le contrôle :</strong> ${echapper(m.controle.replace(/^Le contrôle : /, ''))}</p>
      <button class="principal" data-action="section-suivante">M'entraîner</button>
    </section>`;
}

function champNombre(id, etiquette) {
  return `
    <div class="champ">
      ${etiquette ? `<label for="c-${id}">${echapper(etiquette)}</label>` : ''}
      <div class="champ-saisie">
        <button type="button" class="signe" data-signe="${id}" aria-label="Changer le signe">±</button>
        <input id="c-${id}" data-champ="${id}" value="${echapper(vue.saisie?.[id] ?? '')}"
               type="text" inputmode="decimal" autocomplete="off" spellcheck="false">
      </div>
    </div>`;
}

function vueExercice(sf) {
  const lot = sf[vue.section];
  const ex = lot[vue.index];
  const progression = `<p class="progression">${vue.index + 1} / ${lot.length}</p>`;

  if (vue.retour) return vueRetour(sf, ex, progression);

  let saisie = '';
  if (ex.type === 'calcul') {
    saisie = `${mathsBloc(ex.enonce)}${champNombre('a', '')}
      <button class="principal" data-action="valider">Valider</button>`;
  } else if (ex.type === 'trous') {
    saisie = `${mathsBloc(ex.enonce)}
      ${ex.champs.map((c) => champNombre(c.id, ex.champs.length > 1 ? c.id : '')).join('')}
      <button class="principal" data-action="valider">Valider</button>`;
  } else if (ex.type === 'signe') {
    saisie = `${mathsBloc(ex.enonce)}
      <div class="choix">
        ${['positif', 'négatif', 'nul'].map((s) => `<button class="option" data-choix="${s}">${s}</button>`).join('')}
      </div>`;
  } else if (ex.type === 'plausible') {
    saisie = `${mathsBloc(ex.enonce)}
      <div class="choix">
        <button class="option" data-choix="oui">Plausible</button>
        <button class="option" data-choix="non">Pas plausible</button>
      </div>`;
  } else if (ex.type === 'vraifaux') {
    saisie = `<p class="affirmation">« ${echapper(ex.affirmation)} »</p>
      <div class="choix">
        <button class="option" data-choix="oui">Vrai</button>
        <button class="option" data-choix="non">Faux</button>
      </div>`;
  } else if (ex.type === 'corriger') {
    saisie = `
      <div class="lignes-calcul">
        ${ex.lignes.map((l, i) => `<button class="ligne-calcul" data-choix="${i}">${echapper(l.texte)}</button>`).join('')}
      </div>`;
  }

  return `
    <section class="carte">
      ${progression}
      <p class="consigne">${echapper(ex.consigne ?? sf.titre)}</p>
      ${saisie}
    </section>`;
}

function vueRetour(sf, ex, progression) {
  const r = vue.retour;

  // L'étape passe avant le verdict : un « vrai/faux » réussi n'est pas terminé
  // tant que le contre-exemple n'est pas produit.
  if (!vue.etape) {
    return `
      <section class="carte">
        ${progression}
        <p class="${r.correct ? 'verdict-juste' : 'verdict-faux'}">${r.correct ? "C'est juste." : "Ce n'est pas ça."}</p>
        ${ex.explication ? `<p class="explication">${enrichir(ex.explication)}</p>` : ''}
        ${r.correct ? '' : `<p class="correction">La réponse était ${reponseLisible(ex)}.</p>`}
        <button class="principal" data-action="suivant">Continuer</button>
      </section>`;
  }

  if (vue.etape === 'pourquoi') {
    const p = PIEGES[r.piege];
    return `
      <section class="carte">
        <p class="verdict-faux">Ce n'est pas ça.</p>
        <p class="consigne">Pourquoi as-tu répondu ça ?</p>
        <div class="choix vertical">
          ${p.raisonnements.map((x, i) => `<button class="option option-douce" data-raison="${i}">${echapper(x.texte)}</button>`).join('')}
        </div>
      </section>`;
  }

  if (vue.etape === 'contre-exemple') {
    const ce = ex.contreExemple;
    const aide = vue.ceVerdict === 'rate' ? `<p class="aide">Ce couple ne convient pas. Réessaie.</p>` : '';
    return `
      <section class="carte">
        <p class="${r.correct ? 'verdict-juste' : 'verdict-faux'}">${
          r.correct
            ? "Oui, l'affirmation est fausse. Reste à le prouver."
            : "En fait, l'affirmation est fausse. Voyons pourquoi."
        }</p>
        <p class="consigne">${echapper(ce.invite)}</p>
        <div class="champs-ligne">
          ${ce.champs.map((c) => `
            <div class="champ">
              <label for="ce-${c.id}">${echapper(c.etiquette)}</label>
              <div class="champ-saisie">
                <button type="button" class="signe" data-signe-ce="${c.id}" aria-label="Changer le signe">±</button>
                <input id="ce-${c.id}" data-champ-ce="${c.id}" value="${echapper(vue.ce?.[c.id] ?? '')}"
                       type="text" inputmode="decimal" autocomplete="off">
              </div>
            </div>`).join('')}
        </div>
        ${aide}
        <button class="principal" data-action="verifier-ce">Vérifier</button>
      </section>`;
  }

  if (vue.etape === 'explication') {
    const ce = ex.contreExemple;
    const ok = vue.ceVerdict === 'juste';
    return `
      <section class="carte">
        <p class="${ok ? 'verdict-juste' : 'aide'}">${ok ? 'Ton contre-exemple fonctionne.' : `Par exemple : ${echapper(ce.exemple)}`}</p>
        ${regleEtControle(ex.piege)}
        <button class="principal" data-action="suivant">Continuer</button>
      </section>`;
  }

  if (vue.etape === 'raison') {
    const p = PIEGES[r.piege];
    return `
      <section class="carte">
        <p class="reponse-raison">${echapper(p.raisonnements[vue.raison].reponse)}</p>
        ${regleEtControle(r.piege)}
        <button class="principal" data-action="suivant">Continuer</button>
      </section>`;
  }

  // Erreur non prévue : on ne devine pas la confusion, on montre la correction.
  return `
    <section class="carte">
      ${progression}
      <p class="verdict-faux">Ce n'est pas ça.</p>
      ${ex.explication ? `<p class="explication">${enrichir(ex.explication)}</p>` : ''}
      <p class="correction">La réponse était ${reponseLisible(ex)}.</p>
      ${ex.piege ? regleEtControle(ex.piege) : ''}
      <button class="principal" data-action="suivant">Continuer</button>
    </section>`;
}

function reponseLisible(ex) {
  if (ex.type === 'calcul') return `<strong>${nombre(ex.attendu)}</strong>`;
  if (ex.type === 'trous') return `<strong>${ex.champs.map((c) => nombre(c.attendu)).join(' et ')}</strong>`;
  if (ex.type === 'signe') return `<strong>${ex.attendu}</strong>`;
  if (ex.type === 'corriger') return `la ligne <strong>${ex.lignes.findIndex((l) => l.fausse) + 1}</strong>`;
  return `<strong>${ex.attendu ? 'vrai' : 'faux'}</strong>`;
}

function regleEtControle(piegeId) {
  const p = PIEGES[piegeId];
  if (!p) return '';
  return `
    <div class="regle">${paragraphes(p.regle)}</div>
    <p class="controle"><strong>Le contrôle —</strong> ${echapper(p.controle)}</p>`;
}

function vueProbleme(sf) {
  const pb = sf.problemes[vue.index];
  const progression = `<p class="progression">${vue.index + 1} / ${sf.problemes.length}</p>`;
  if (vue.retour) {
    const justes = pb.questions.every((q, i) => memeNombre(lireNombre(vue.saisie[`q${i}`]) ?? NaN, q.attendu));
    return `
      <section class="carte">
        ${progression}
        <p class="${justes ? 'verdict-juste' : 'verdict-faux'}">${justes ? 'Tout est juste.' : 'Il y a une erreur.'}</p>
        <ul class="corrige">
          ${pb.questions.map((q) => `<li>${echapper(q.texte)} <strong>${nombre(q.attendu)}${q.unite ? ` ${q.unite}` : ''}</strong></li>`).join('')}
        </ul>
        <button class="principal" data-action="suivant">Continuer</button>
      </section>`;
  }
  return `
    <section class="carte">
      ${progression}
      <p class="enonce">${echapper(pb.enonce)}</p>
      ${pb.questions.map((q, i) => `
        <div class="question">
          <p>${echapper(q.texte)}</p>
          ${champNombre(`q${i}`, q.unite ? `en ${q.unite}` : '')}
        </div>`).join('')}
      <button class="principal" data-action="valider-probleme">Valider</button>
    </section>`;
}

// ── Interactions ────────────────────────────────────────────────────────────

const majSaisie = (ou, id, valeur) => {
  vue[ou] = { ...(vue[ou] ?? {}), [id]: valeur };
};

app.addEventListener('click', (e) => {
  const c = e.target.closest('[data-action], [data-ouvrir], [data-section], [data-choix], [data-raison], [data-signe], [data-signe-ce]');
  if (!c) return;

  if (c.dataset.signe || c.dataset.signeCe) {
    const ce = !!c.dataset.signeCe;
    const id = c.dataset.signe ?? c.dataset.signeCe;
    const champ = app.querySelector(ce ? `[data-champ-ce="${id}"]` : `[data-champ="${id}"]`);
    const v = champ.value.trim();
    champ.value = v.startsWith('-') ? v.slice(1) : `-${v}`;
    majSaisie(ce ? 'ce' : 'saisie', id, champ.value);
    return;
  }

  if (c.dataset.ouvrir) return ouvrir(c.dataset.ouvrir);
  if (c.dataset.section) return ouvrir(vue.sfId, c.dataset.section);

  if (c.dataset.choix != null) {
    const brut = c.dataset.choix;
    const valeur = brut === 'oui' ? true : brut === 'non' ? false : /^\d+$/.test(brut) ? Number(brut) : brut;
    return corriger({ a: valeur });
  }

  if (c.dataset.raison != null) {
    vue = { ...vue, etape: 'raison', raison: Number(c.dataset.raison) };
    return rendre();
  }

  switch (c.dataset.action) {
    case 'sommaire': vue = { ecran: 'sommaire' }; return rendre();
    case 'section-suivante': return sectionSuivante();
    case 'suivant': return suivant();
    case 'valider': return corriger(vue.saisie ?? {});
    case 'verifier-ce': return verifierContreExemple();
    case 'valider-decouverte': {
      const sf = sfCourant();
      const ok = sf.decouvrir.champs.every((ch) => {
        const n = lireNombre(vue.saisie?.[ch.id]);
        return n !== null && memeNombre(n, ch.attendu);
      });
      // Une découverte ne se sanctionne pas : on montre la conclusion dans les
      // deux cas. Elle sert à faire rencontrer la notion, pas à évaluer.
      vue = { ...vue, retour: { correct: true }, decouverteJuste: ok };
      return rendre();
    }
    case 'valider-probleme': {
      const sf = sfCourant();
      const pb = sf.problemes[vue.index];
      if (pb.questions.some((_, i) => lireNombre(vue.saisie?.[`q${i}`]) === null)) return;
      const justes = pb.questions.every((q, i) => memeNombre(lireNombre(vue.saisie[`q${i}`]), q.attendu));
      profil.savoirFaire[sf.id] = apresReponse(etatSf(sf.id), justes, profil.seance, 3);
      sauver();
      vue = { ...vue, retour: { correct: justes } };
      return rendre();
    }
  }
});

app.addEventListener('input', (e) => {
  const t = e.target;
  if (t.dataset.champ) majSaisie('saisie', t.dataset.champ, t.value);
  if (t.dataset.champCe) majSaisie('ce', t.dataset.champCe, t.value);
});

app.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' || !(e.target.dataset.champ || e.target.dataset.champCe)) return;
  e.preventDefault();
  const bouton = app.querySelector('.principal');
  if (bouton) bouton.click();
});

rendre();
