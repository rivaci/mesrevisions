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

import { CHAPITRES, chapitreParNumero } from './data/chapitres/index.js';
import { PIEGES } from './data/pieges.js';
import { graphique } from './graphique.js';
import { apresReponse, estAcquis, etatInitial } from './srs.js';
import { echapper, enrichir, lireFacteurs, lireNombre, maths, mathsBloc, mathsOuTexte, memeNombre, nombre, paragraphes, programme } from './rendu.js';
import { equivalentes, estUnePhrase } from './verification.js';
import * as merlin from './merlin.js';
import { AVATARS, codeDefini, codeValide, definirCode, definirEleve, eleve, estInstalle } from './eleve.js';

const CLE = 'maths4e.profil';
const app = document.getElementById('app');

// ── Profil ──────────────────────────────────────────────────────────────────

const charger = () => {
  try { return JSON.parse(localStorage.getItem(CLE)) ?? null; } catch { return null; }
};

let profil = charger() ?? { savoirFaire: {}, pieges: {}, seance: 1, sectionsVues: [] };

/** Le chapitre ouvert. Tant qu'aucun n'est choisi, on est sur la liste. */
let CHAPITRE = CHAPITRES[0];
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

let vue = { ecran: 'chapitres' };

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
  vue = {
    ecran: 'section', sfId, section, index: 0, saisie: {}, retour: null,
    aide: null, niveauAide: 0, correction: false, merlin: null, chat: null, etape: null,
  };
  rendre();
}

function sectionSuivante() {
  const sf = sfCourant();
  const dispo = sectionsDe(sf);
  const i = dispo.findIndex((s) => s.cle === vue.section);
  if (i < dispo.length - 1) return ouvrir(sf.id, dispo[i + 1].cle);
  // Fin du savoir-faire : on note qu'il a été parcouru et on revient au sommaire.
  if (!profil.sectionsVues.includes(sf.id)) profil.sectionsVues.push(sf.id);
  const seanceEcoulee = profil.seance;
  profil.seance += 1;
  sauver();
  consolider(seanceEcoulee);
  vue = { ecran: 'sommaire' };
  rendre();
}

/**
 * Consolidation de fin de séance — le seul moment où la mémoire est réécrite.
 *
 * C'est ce qui fait la différence entre un Merlin qui suit l'élève et un Merlin
 * amnésique : sans cet appel, les deux couches de mémoire restent vides et le
 * profil injecté dans le prompt ne contient jamais que des chiffres.
 *
 * Un seul appel par séance, et pas un après chaque erreur : le profil doit
 * rester FIGÉ pendant toute la séance, sinon la mise en cache du prompt est
 * cassée à chaque échange — ce qui coûterait dix fois plus cher pour un
 * résultat moins bon.
 *
 * Volontairement non attendu : l'élève retourne au sommaire tout de suite.
 */
function consolider(seance) {
  if (!merlin.disponible()) return;
  const etats = CHAPITRE.savoirFaire.map((s) => ({ nom: s.titre, etat: etatSf(s.id) }));
  const total = etats.reduce(
    (t, e) => ({ reussites: t.reussites + e.etat.reussites, echecs: t.echecs + e.etat.echecs }),
    { reussites: 0, echecs: 0 },
  );
  if (!total.reussites && !total.echecs) return;

  const dominant = Object.entries(profil.pieges)
    .filter(([, e]) => e.echecs > 0)
    .sort((a, b) => b[1].echecs - a[1].echecs)[0];

  merlin.consoliderMemoire({
    profil: merlin.profilPourIA(etats, seance),
    resume: { ...total, dominant: dominant ? PIEGES[dominant[0]]?.nom : null },
    seance,
  });
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
 * La confusion à supposer quand l'erreur n'était pas prévue.
 *
 * Sur un item ORDINAIRE, le piège de l'exercice est une hypothèse raisonnable.
 * Sur un item NEUTRE, non : un neutre est précisément un item où le piège NE
 * JOUE PAS, et servir son explication y donnerait un conseil à l'envers.
 *
 * Le cas réel qui a fait écrire cette fonction : un exercice qui cherche
 * l'hypoténuse — donc où l'addition des carrés est correcte — portait le piège
 * « carrés additionnés au lieu d'être soustraits », dont le geste de contrôle
 * dit « si ton résultat est plus grand, tu as additionné ». Exactement
 * l'inverse de ce qu'il fallait faire.
 *
 * C'est aussi ce qui donne enfin un effet au champ `neutre` dans le code, et
 * pas seulement dans le contrôle de contenu.
 */
const replier = (ex) => (ex.neutre ? null : ex.piege ?? null);

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
    if (!correct) piege = (ex.fausses ?? []).find((f) => memeNombre(f.valeur, n))?.piege ?? replier(ex);
  } else if (ex.type === 'trous') {
    const valeurs = ex.champs.map((c) => lireNombre(donnee[c.id]));
    if (valeurs.some((v) => v === null)) return;
    correct = ex.champs.every((c, i) => memeNombre(valeurs[i], c.attendu));
    if (!correct) {
      piege = (ex.fausses ?? []).find((f) => valeurs.some((v) => memeNombre(f.valeur, v)))?.piege
        ?? replier(ex);
    }
  } else if (['signe', 'plausible', 'vraifaux', 'premier', 'comparer'].includes(ex.type)) {
    if (donnee.a == null) return;
    correct = donnee.a === ex.attendu;
    if (!correct) piege = (ex.fausses ?? []).find((f) => f.valeur === donnee.a)?.piege ?? replier(ex);
  } else if (ex.type === 'facteurs') {
    const saisis = lireFacteurs(donnee.a);
    if (!saisis) return;
    // L'ordre ne compte pas — 2 × 3 × 2 vaut 2 × 2 × 3 — mais les répétitions
    // si : c'est justement ce que le piège du facteur oublié met à l'épreuve.
    correct = saisis.length === ex.attendu.length
      && [...saisis].sort((x, y) => x - y).every((v, i) => v === [...ex.attendu].sort((x, y) => x - y)[i]);
    if (!correct) {
      const produit = saisis.reduce((t, v) => t * v, 1);
      const attendu = ex.attendu.reduce((t, v) => t * v, 1);
      // Deux erreurs se distinguent par le produit : s'il retombe juste, aucun
      // facteur ne manque mais l'un d'eux n'est pas premier ; s'il est trop
      // petit, un facteur a été oublié.
      piege = produit === attendu ? 'decomposition-incomplete' : 'facteur-repete-oublie';
    }
  } else if (ex.type === 'fraction') {
    const num = lireNombre(donnee.num);
    const den = lireNombre(donnee.den);
    if (num === null || den === null) return;
    correct = memeNombre(num, ex.attendu[0]) && memeNombre(den, ex.attendu[1]);
    if (!correct) piege = (ex.fausses ?? []).find((f) => f.valeur === `${num}/${den}`)?.piege ?? replier(ex);
  } else if (ex.type === 'expression') {
    const eq = equivalentes(donnee.expr, ex.attendu);
    // `null` veut dire « illisible », pas « faux ». Compter faux une écriture
    // qu'on n'a pas su lire punirait l'élève d'une limite de l'application.
    if (eq === null) {
      vue = { ...vue, illisible: true };
      return rendre();
    }
    correct = eq;
    if (!correct) {
      piege = (ex.fausses ?? []).find((f) => equivalentes(donnee.expr, f.valeur) === true)?.piege
        ?? replier(ex);
    }
  } else if (ex.type === 'corriger') {
    if (donnee.a == null) return;
    correct = ex.lignes[donnee.a]?.fausse === true;
    if (!correct) piege = replier(ex);
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

/**
 * Demande à Merlin d'expliquer l'erreur en cours.
 *
 * Sans clé, on ne tente rien : l'explication préécrite est déjà à l'écran.
 * Si l'appel échoue ou traîne, elle reste — l'élève ne voit jamais un écran
 * vide en attendant un modèle qui ne répondra pas.
 */
/** « Se tester » est une auto-évaluation : Merlin y est absent par principe. */
const merlinAutorise = () => merlin.disponible() && vue.section !== 'test';

async function demanderAMerlin() {
  if (!merlinAutorise()) return;
  const sf = sfCourant();
  const ex = exCourant();
  const piegeId = vue.retour?.piege;
  // Le piège peut être absent : l'élève s'est trompé d'une façon qu'on n'avait
  // pas prévue. C'est justement le cas où une explication préécrite n'existe
  // pas — donc celui où Merlin est le plus utile, pas le moins.
  const p = PIEGES[piegeId] ?? null;

  const depuis = vue.etape;
  vue = { ...vue, merlin: 'attente' };
  rendre();

  const etats = CHAPITRE.savoirFaire.map((s) => ({ nom: s.titre, etat: etatSf(s.id) }));
  const r = await merlin.expliquerErreur({
    profil: merlin.profilPourIA(etats, profil.seance),
    contexte: {
      savoirFaire: sf.titre,
      consigne: ex.consigne ?? sf.titre,
      enonce: ex.enonce ?? ex.affirmation,
      attendu: String(ex.attendu),
      donnee: vue.saisie?.a ?? '(choix)',
      piege: p,
    },
    raisonnement: p ? p.raisonnements[vue.raison]?.texte : null,
    dejaDit: piegeId ? (profil.expliquees?.[piegeId] ?? []) : [],
  });

  // La séance a pu avancer pendant l'appel : on n'écrase pas l'écran courant.
  if (vue.etape !== depuis) return;

  if (r.disponible) {
    if (piegeId) {
      profil.expliquees = { ...(profil.expliquees ?? {}) };
      profil.expliquees[piegeId] = [...(profil.expliquees[piegeId] ?? []), r.donnees.explication].slice(-3);
      sauver();
    }
    vue = { ...vue, merlin: r.donnees };
  } else {
    vue = { ...vue, merlin: null };
  }
  rendre();
}

/**
 * Une question libre à Merlin, hors correction d'erreur : sur un bloc de cours
 * qu'on n'a pas compris, ou sur une étape de méthode.
 *
 * Il n'y a rien à corriger ici, donc pas d'appel à sortie structurée : on ouvre
 * directement la discussion, avec la section lue comme contexte.
 */
function ouvrirQuestion(sujet) {
  if (!merlinAutorise()) return;
  vue = {
    ...vue,
    question: '',
    chat: [],
    chatSujet: sujet,
    merlin: { explication: '', geste: '' },  // marqueur : la discussion est ouverte
    etape: 'question',
  };
  rendre();
  app.querySelector('[data-champ-chat]')?.focus();
}

function verifierContreExemple() {
  const ex = exCourant();
  // Le nombre de champs dépend de ce qu'on demande : deux nombres dont le
  // produit est plus petit qu'eux, mais un seul diviseur pour réfuter « 91 est
  // premier ». On lit ce que le contenu a déclaré, pas un couple imposé.
  const valeurs = ex.contreExemple.champs.map((c) => lireNombre(vue.ce[c.id]));
  if (valeurs.some((v) => v === null)) return;
  let ok = false;
  try { ok = ex.contreExemple.valide(...valeurs); } catch { ok = false; }
  vue = { ...vue, ceVerdict: ok ? 'juste' : 'rate', ceEssais: (vue.ceEssais ?? 0) + 1 };
  if (ok || vue.ceEssais >= 2) vue = { ...vue, etape: 'explication' };
  rendre();
}

function suivant() {
  const sf = sfCourant();
  const lot = sf[vue.section];
  const dernier = !Array.isArray(lot) || vue.index >= lot.length - 1;
  if (dernier) return sectionSuivante();
  vue = {
    ...vue, index: vue.index + 1, saisie: {}, retour: null, etape: null,
    ce: {}, ceEssais: 0, ceVerdict: null,
    // La discussion et l'aide appartiennent à l'exercice qu'on quitte.
    merlin: null, chat: null, question: '', chatAttente: false,
    aide: null, niveauAide: 0, correction: false, illisible: false,
  };
  rendre();
}

// ── Rendu ───────────────────────────────────────────────────────────────────

function rendre() {
  // L'installation précède tout : le prénom est la clé de la mémoire partagée
  // entre les matières, donc Merlin ne peut rien savoir avant de l'avoir.
  if (!estInstalle()) app.innerHTML = vueInstallation();
  else if (vue.ecran === 'parents') app.innerHTML = codeDefini() && !vue.deverrouille ? vueRideau() : vueParents();
  else if (vue.ecran === 'reglages') app.innerHTML = vueReglages();
  else if (vue.ecran === 'chapitres') app.innerHTML = vueChapitres();
  else if (vue.ecran === 'sommaire') app.innerHTML = vueSommaire();
  else app.innerHTML = vueSection();
  const premier = app.querySelector('input:not([readonly])');
  if (premier && vue.ecran !== 'reglages') premier.focus();
}

function vueInstallation() {
  return `
    <header class="entete">
      <p class="surtitre">Mathématiques · vers la 3<sup>e</sup></p>
      <h1>Avant de commencer</h1>
    </header>
    <section class="carte">
      <p>Comment t'appelles-tu ?</p>
      <div class="champ">
        <div class="champ-saisie">
          <input data-champ="prenom" type="text" autocomplete="given-name" placeholder="Ton prénom"
                 value="${echapper(vue.saisie?.prenom ?? '')}">
        </div>
      </div>
      <p class="consigne">Choisis un avatar.</p>
      <div class="avatars">
        ${AVATARS.map((a) => `
          <button class="avatar ${(vue.saisie?.avatar ?? AVATARS[0]) === a ? 'actif' : ''}" data-avatar="${a}">${a}</button>`).join('')}
      </div>
      <p class="note">Ton prénom sert à retrouver ce que tu as déjà travaillé, ici et
        dans tes autres matières. Il reste sur cet appareil.</p>
      <button class="principal" data-action="installer">C'est parti</button>
    </section>`;
}

function vueRideau() {
  return `
    <header class="entete-section">
      <button class="retour" data-action="sommaire">← Retour</button>
      <h1>Suivi</h1>
    </header>
    <section class="carte">
      <p>Cet écran est réservé aux adultes.</p>
      <div class="champ">
        <label for="c-code">Code</label>
        <div class="champ-saisie">
          <input id="c-code" data-champ="code" type="password" inputmode="numeric"
                 autocomplete="off" value="${echapper(vue.saisie?.code ?? '')}">
        </div>
      </div>
      ${vue.codeRate ? '<p class="verdict-faux">Ce n\'est pas le bon code.</p>' : ''}
      <button class="principal" data-action="deverrouiller">Ouvrir</button>
    </section>`;
}

/**
 * L'écran de suivi, pour l'adulte.
 *
 * Deux principes. D'abord on montre des TYPES D'ERREUR, pas un score : « il
 * confond la règle des signes » est actionnable, « 62 % » ne l'est pas. Ensuite
 * tout ce que Merlin a noté sur l'enfant est lisible et supprimable — une IA
 * qui tiendrait un dossier illisible sur un enfant, non.
 */
function vueParents() {
  const etats = CHAPITRE.savoirFaire.map((s) => ({ id: s.id, nom: s.titre, etat: etatSf(s.id) }));
  const travailles = etats.filter((e) => e.etat.reussites + e.etat.echecs > 0);
  const acquis = etats.filter((e) => estAcquis(e.etat));
  const resiste = merlin.pointsQuiResistent(etats);
  const m = merlin.memoireMaths();
  const t = merlin.memoireTransversale();
  const cout = merlin.lireCout();

  const notes = (titre, liste, source) => liste.length ? `
    <h2>${titre}</h2>
    <ul class="notes">
      ${liste.map((n) => `
        <li>
          <span>${echapper(n.texte)}</span>
          <button class="supprimer" data-supprimer="${n.id}" aria-label="Supprimer cette note">×</button>
        </li>`).join('')}
    </ul>
    <p class="note">${source}</p>` : '';

  return `
    <header class="entete-section">
      <button class="retour" data-action="sommaire">← Retour</button>
      <h1>Suivi de ${echapper(eleve().prenom)}</h1>
    </header>

    <section class="carte">
      <h2>Où il en est</h2>
      ${travailles.length ? `
        <p>${travailles.length} savoir-faire sur ${etats.length} entamés, ${acquis.length} acquis.</p>
        <ul class="suivi">
          ${etats.map((e) => {
            const n = e.etat.reussites + e.etat.echecs;
            const pluriel = (n, mot) => `${n} ${mot}${n > 1 ? 's' : ''}`;
            const etiquette = estAcquis(e.etat)
              ? 'acquis'
              : n === 0
                ? 'pas encore vu'
                : `${pluriel(e.etat.reussites, 'réussite')}, ${pluriel(e.etat.echecs, 'erreur')}`;
            return `<li><span>${echapper(e.nom)}</span><span class="suivi-etat">${etiquette}</span></li>`;
          }).join('')}
        </ul>` : '<p>Aucun exercice fait pour l\'instant.</p>'}
    </section>

    ${resiste.length ? `
      <section class="carte">
        <h2>Ce qui résiste</h2>
        <p class="note">Des types d'erreur plutôt qu'un score : c'est ce sur quoi on peut agir.</p>
        <ul class="suivi">
          ${resiste.map((p) => `<li><span>${echapper(p.nom)}</span><span class="suivi-etat">${echapper(p.detail)}</span></li>`).join('')}
        </ul>
      </section>` : ''}

    <section class="carte">
      <h2>Ce que Merlin a noté</h2>
      ${m.marche.length || m.aEviter.length || t.notes.length
        ? `${notes('Ce qui marche', m.marche, 'Observé en maths.')}
           ${notes('Essayé sans effet', m.aEviter, 'Merlin évite de le refaire.')}
           ${notes('Comment il apprend', t.notes, 'Partagé avec ses autres matières — l\'appli de français lit et écrit les mêmes notes.')}`
        : '<p>Rien pour l\'instant. Merlin écrit ses observations à la fin d\'un savoir-faire, et seulement si une clé d\'API est renseignée.</p>'}
    </section>

    <section class="carte">
      <h2>Réglages</h2>
      <button class="secondaire" data-action="reglages">🎩 Merlin et clé d'API</button>
      ${cout.appels ? `<p class="note">${cout.appels} appel${cout.appels > 1 ? 's' : ''} —
        ${cout.entree.toLocaleString('fr')} jetons envoyés dont ${cout.cache.toLocaleString('fr')} relus en cache,
        ${cout.sortie.toLocaleString('fr')} reçus.</p>` : '<p class="note">Merlin n\'a encore rien coûté.</p>'}

      <div class="champ">
        <label for="c-nouveau-code">Code parental — 4 à 8 chiffres, vide pour l'enlever</label>
        <div class="champ-saisie">
          <input id="c-nouveau-code" data-champ="nouveauCode" type="text" inputmode="numeric"
                 autocomplete="off" value="${echapper(vue.saisie?.nouveauCode ?? '')}">
        </div>
      </div>
      <p class="note">C'est un rideau, pas une serrure : il évite que l'enfant tombe par
        hasard sur la liste de ses difficultés. Qui sait ouvrir les outils du navigateur
        passe outre.</p>
      <button class="secondaire" data-action="enregistrer-code">Enregistrer le code</button>
      ${vue.codeEnregistre ? '<p class="verdict-juste">Code enregistré.</p>' : ''}
    </section>`;
}

function vueReglages() {
  const c = merlin.configIA();
  const f = merlin.FOURNISSEURS[c.fournisseur];
  const cout = merlin.lireCout();
  const v = vue.verif;
  return `
    <header class="entete-section">
      <button class="retour" data-action="sommaire">← Retour</button>
      <h1>Merlin</h1>
    </header>
    <section class="carte">
      <p>Merlin est un professeur particulier qui explique tes erreurs. Il a besoin
        d'une clé d'API, à demander à un adulte.</p>
      <p class="note">Sans clé, l'application fonctionne entièrement : les explications
        sont alors celles écrites d'avance.</p>

      <div class="champ">
        <label>Fournisseur</label>
        <div class="choix">
          ${Object.entries(merlin.FOURNISSEURS).map(([id, x]) => `
            <button class="option ${id === c.fournisseur ? 'actif' : ''}" data-fournisseur="${id}">${x.nom}</button>`).join('')}
        </div>
      </div>

      <div class="champ">
        <label for="c-cle">Clé d'API — ${echapper(f.console)}</label>
        <div class="champ-saisie">
          <input id="c-cle" data-champ="cle" type="password" autocomplete="off" spellcheck="false"
                 placeholder="Colle la clé ici" value="${echapper(vue.saisie?.cle ?? c.cles[c.fournisseur] ?? '')}">
        </div>
      </div>

      <div class="champ">
        <label for="c-modele">Modèle</label>
        <div class="champ-saisie">
          <input id="c-modele" data-champ="modele" type="text" autocomplete="off" spellcheck="false"
                 placeholder="${echapper(f.modeles[0].id)}" value="${echapper(vue.saisie?.modele ?? c.modele)}">
        </div>
      </div>
      <p class="note">Champ libre volontairement : les catalogues bougent plus vite que
        cette application, qui n'a pas de mise à jour automatique. Suggestions —
        ${f.modeles.map((m) => echapper(m.id)).join(', ')}.</p>

      ${v ? `<p class="${v.ok ? 'verdict-juste' : 'verdict-faux'}">${echapper(v.ok ? 'La clé fonctionne.' : v.message)}</p>` : ''}
      <button class="principal" data-action="verifier-cle">${vue.verifEnCours ? 'Vérification…' : 'Vérifier et enregistrer'}</button>

      ${cout.appels ? `<p class="note">${cout.appels} appel${cout.appels > 1 ? 's' : ''} à ce jour —
        ${cout.entree.toLocaleString('fr')} jetons envoyés, ${cout.sortie.toLocaleString('fr')} reçus.</p>` : ''}
    </section>`;
}

function vueChapitres() {
  const cartes = CHAPITRES.map((ch) => {
    const etats = ch.savoirFaire.map((sf) => etatSf(sf.id));
    const entames = etats.filter((e) => e.reussites + e.echecs > 0).length;
    const acquis = etats.filter((e) => estAcquis(e)).length;
    const detail = acquis === ch.savoirFaire.length
      ? 'terminé'
      : entames
        ? `${acquis} sur ${ch.savoirFaire.length} acquis`
        : `${ch.savoirFaire.length} savoir-faire`;
    return `
      <button class="sf" data-chapitre="${ch.numero}">
        <span class="sf-numero">${ch.numero}</span>
        <span class="sf-corps">
          <span class="sf-titre">${echapper(ch.titre)}</span>
          <span class="sf-detail">${echapper(ch.theme)} · ${detail}</span>
        </span>
        ${acquis === ch.savoirFaire.length ? '<span class="sf-etat est-acquis">Acquis</span>' : ''}
      </button>`;
  }).join('');

  return `
    <header class="entete">
      <div class="entete-ligne">
        <div>
          <p class="surtitre">Mathématiques · vers la 3<sup>e</sup></p>
          <h1>Les chapitres</h1>
        </div>
        <button class="lien-merlin" data-action="parents"><span aria-hidden="true">👪</span> Suivi</button>
      </div>
      <p class="sous-titre">Salut ${echapper(eleve().prenom)} ${eleve().avatar}</p>
    </header>
    <div class="sommaire">${cartes}</div>
    <p class="note">Les chapitres suivent une progression : chacun s'appuie sur les
      précédents. Tu peux quand même aller directement à celui que tu sais fragile.</p>`;
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
      <button class="retour" data-action="chapitres">← Tous les chapitres</button>
      <div class="entete-ligne">
        <div>
          <p class="surtitre">Chapitre ${CHAPITRE.numero} · ${echapper(CHAPITRE.theme)}</p>
          <h1>${echapper(CHAPITRE.titre)}</h1>
        </div>
        <button class="lien-merlin" data-action="parents">
          <span aria-hidden="true">👪</span> Suivi
        </button>
      </div>
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
  // Le séparateur suit la nature des deux côtés : « = » entre deux calculs,
  // une flèche dès que l'un des deux est une phrase — « côtés 3 et 4 = 3² = 9 »
  // ne veut rien dire.
  const lignes = d.lignes ? `
    <div class="suite">${d.lignes.map((l) => {
      const phrase = estUnePhrase(l.calcul) || estUnePhrase(l.resultat);
      return `
      <div class="suite-ligne ${phrase ? 'suite-ligne--phrase' : ''}">
        <span>${mathsOuTexte(l.calcul)}</span>
        <span class="suite-egal">${phrase ? '→' : '='}</span>
        <span>${mathsOuTexte(l.resultat)}</span>
      </div>`;
    }).join('')}
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
  const trace = graphique(d.graphique) + programme(d.programme);
  const fini = vue.retour?.correct;

  return `
    <section class="carte">
      <h2>${echapper(d.titre)}</h2>
      ${paragraphes(d.texte)}
      ${trace}${lignes}${copies}
      <p class="consigne">${echapper(d.question)}</p>
      ${champs}
      ${vue.aide === 'attente'
        ? `<p class="reflexion">Merlin réfléchit<span class="points"><span>.</span><span>.</span><span>.</span></span></p>`
        : vue.aide ? `<p class="reponse-merlin">${echapper(vue.aide)}</p>` : ''}
      ${fini ? `<div class="conclusion">${paragraphes(d.conclusion)}</div>
                <button class="principal" data-action="section-suivante">Passer au cours</button>`
             : `<button class="principal" data-action="valider-decouverte">Valider</button>
                ${merlinAutorise() && !vue.aide ? '<button class="secondaire" data-action="relancer">🎩 Je ne vois pas</button>' : ''}`}
    </section>`;
}

/**
 * La relance sur une activité de découverte.
 *
 * Le bouton dit « je ne vois pas » plutôt que « aide » : c'est une petite
 * friction volontaire. Il faut reconnaître qu'on bloque, ce qui n'est pas le
 * même geste que tendre la main par réflexe.
 */
async function relancer() {
  if (!merlinAutorise()) return;
  const sf = sfCourant();
  const d = sf.decouvrir;

  vue = { ...vue, aide: 'attente' };
  rendre();

  const etats = CHAPITRE.savoirFaire.map((s) => ({ nom: s.titre, etat: etatSf(s.id) }));
  const saisi = (d.champs ?? [])
    .map((c) => `${c.etiquette} ${vue.saisie?.[c.id] ?? '(vide)'}`)
    .join(' ; ');

  const r = await merlin.relancerDecouverte({
    profil: merlin.profilPourIA(etats, profil.seance),
    savoirFaire: sf.titre,
    titre: d.titre,
    question: d.question,
    donnee: saisi,
  });

  if (vue.section !== 'decouvrir') return;
  vue = { ...vue, aide: r.disponible ? r.donnees.aide : null };
  rendre();
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
      ${aideMerlin('ce cours', `Le cours de « ${sf.titre} »`)}
      <button class="principal" data-action="section-suivante">J'ai lu</button>
    </section>`;
}

/**
 * Le point d'entrée vers Merlin dans les sections où il n'y a rien à corriger.
 *
 * Un élève qui bute sur une définition n'avait jusqu'ici aucun recours : il
 * relisait, ou il passait. C'est exactement le trou que Merlin doit combler.
 */
function aideMerlin(quoi, sujet) {
  if (!merlinAutorise()) return '';
  if (vue.etape === 'question') return vueChat();
  return `<button class="secondaire" data-action="question" data-sujet="${echapper(sujet)}">
    🎩 Je n'ai pas compris ${echapper(quoi)}
  </button>`;
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
      <p class="controle"><strong>Le contrôle —</strong> ${echapper(m.controle.replace(/^Le contrôle : /, ''))}</p>
      ${aideMerlin('une étape', `La méthode « ${m.titre} » : ${m.enonce}`)}
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

/**
 * L'énoncé d'un exercice, rendu selon sa nature.
 *
 * Une EXPRESSION est le sujet de l'écran : grande, centrée, lisible d'un coup
 * d'œil. Une PHRASE — « ABC : AB = 8 cm, BC = 5 cm, angle en B = 70° » — se
 * lit de gauche à droite : à 1,7 rem elle déborde de la page, et passée au
 * moteur mathématique elle perd ses espaces.
 *
 * 442 des 981 énoncés du dépôt sont dans ce cas, dont 189 dépassent soixante
 * caractères : ce n'est pas un cas limite, c'est la moitié du contenu.
 */
function enonceExercice(ex) {
  const t = ex.enonce ?? '';
  // Deux formes de prose : le LaTeX rédigé (\text{...}) et le texte brut.
  // Les deux se lisent de gauche à droite et doivent revenir à la ligne.
  const prose = t.includes('\\text{') || estUnePhrase(t);
  // Le graphique passe avant l'énoncé : au chapitre 14, c'est lui qui porte la
  // donnée, et la question ne veut rien dire tant qu'il n'est pas sous les yeux.
  return graphique(ex.graphique) + programme(ex.programme) + (prose
    ? `<p class="enonce enonce-long">${mathsOuTexte(t)}</p>`
    : mathsBloc(t));
}

function vueExercice(sf) {
  const lot = sf[vue.section];
  const ex = lot[vue.index];
  const progression = `<p class="progression">${vue.index + 1} / ${lot.length}</p>`;

  if (vue.retour) return vueRetour(sf, ex, progression);

  let saisie = '';
  if (ex.type === 'calcul') {
    saisie = `${enonceExercice(ex)}${champNombre('a', '')}
      <button class="principal" data-action="valider">Valider</button>`;
  } else if (ex.type === 'trous') {
    // Une étiquette écrite par l'auteur passe avant l'identifiant technique :
    // « mantisse » et « exposant » disent quelque chose, « a » et « b » non.
    saisie = `${enonceExercice(ex)}
      ${ex.champs.map((c) => champNombre(c.id, c.etiquette ?? (ex.champs.length > 1 ? c.id : ''))).join('')}
      <button class="principal" data-action="valider">Valider</button>`;
  } else if (ex.type === 'signe') {
    saisie = `${enonceExercice(ex)}
      <div class="choix">
        ${['positif', 'négatif', 'nul'].map((s) => `<button class="option" data-choix="${s}">${s}</button>`).join('')}
      </div>`;
  } else if (ex.type === 'plausible') {
    saisie = `${enonceExercice(ex)}
      <div class="choix">
        <button class="option" data-choix="oui">Plausible</button>
        <button class="option" data-choix="non">Pas plausible</button>
      </div>`;
  } else if (ex.type === 'vraifaux') {
    saisie = `${graphique(ex.graphique)}${programme(ex.programme)}<p class="affirmation">« ${echapper(ex.affirmation)} »</p>
      <div class="choix">
        <button class="option" data-choix="oui">Vrai</button>
        <button class="option" data-choix="non">Faux</button>
      </div>`;
  } else if (ex.type === 'corriger') {
    saisie = `
      <div class="lignes-calcul">
        ${ex.lignes.map((l, i) => `<button class="ligne-calcul" data-choix="${i}">${echapper(l.texte)}</button>`).join('')}
      </div>`;
  } else if (ex.type === 'premier') {
    saisie = `${enonceExercice(ex)}
      <div class="choix">
        <button class="option" data-choix="oui">Premier</button>
        <button class="option" data-choix="non">Pas premier</button>
      </div>`;
  } else if (ex.type === 'comparer') {
    // Comparer deux fractions se répond par un symbole, pas par un calcul :
    // c'est le geste réel de l'exercice, et il se saisit d'un doigt.
    saisie = `${enonceExercice(ex)}
      <div class="choix">
        ${['<', '=', '>'].map((s) => `<button class="option option-symbole" data-choix="${s}">${s}</button>`).join('')}
      </div>`;
  } else if (ex.type === 'facteurs') {
    // Une seule ligne de saisie plutôt qu'un champ par facteur : le nombre de
    // facteurs fait PARTIE de la réponse, et le pré-découper reviendrait à
    // souffler combien il y en a — donc à désamorcer le piège du facteur oublié.
    saisie = `${enonceExercice(ex)}
      <div class="champ">
        <label for="c-a">Les facteurs, séparés par des ×</label>
        <div class="champ-saisie">
          <input id="c-a" data-champ="a" type="text" inputmode="numeric" autocomplete="off"
                 spellcheck="false" placeholder="2 × 2 × 3" value="${echapper(vue.saisie?.a ?? '')}">
        </div>
      </div>
      <button class="principal" data-action="valider">Valider</button>`;
  } else if (ex.type === 'fraction') {
    saisie = `${enonceExercice(ex)}
      <div class="champs-ligne">
        ${champNombre('num', 'numérateur')}
        ${champNombre('den', 'dénominateur')}
      </div>
      <button class="principal" data-action="valider">Valider</button>`;
  } else if (ex.type === 'expression') {
    // Le seul endroit où l'élève écrit des maths plutôt qu'un nombre. C'est ce
    // que MathLive rend possible, et c'est ce qui distingue « réduis 3x + 2 »
    // d'un questionnaire : il n'y a pas de bonne réponse à reconnaître, il faut
    // la produire.
    saisie = `${enonceExercice(ex)}
      <math-field data-expression class="champ-maths"
        math-virtual-keyboard-policy="onfocus">${echapper(vue.saisie?.expr ?? '')}</math-field>
      ${vue.illisible
        ? `<p class="verdict-faux">Je n&rsquo;arrive pas à lire cette écriture. Utilise seulement des nombres, la lettre de l&rsquo;énoncé, + − × et des parenthèses.</p>`
        : ''}
      <p class="aide">Tape ton expression : <code>2x+10</code>, <code>x^2</code>, des parenthèses si besoin.</p>
      <button class="principal" data-action="valider">Valider</button>`;
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
        ${regleEtControle(replier(ex))}
        <button class="principal" data-action="suivant">Continuer</button>
      </section>`;
  }

  if (vue.etape === 'raison') {
    const p = PIEGES[r.piege];
    // Merlin remplace l'explication préécrite quand il répond ; sinon elle
    // prend le relais et la séance ne s'interrompt jamais.
    const bloc = vue.merlin === 'attente'
      ? `<p class="reflexion">Merlin réfléchit<span class="points"><span>.</span><span>.</span><span>.</span></span></p>`
      : vue.merlin
        ? `<p class="reponse-merlin">${echapper(vue.merlin.explication)}</p>
           <p class="controle"><strong>Le geste —</strong> ${echapper(vue.merlin.geste)}</p>`
        : `<p class="reponse-raison">${echapper(p.raisonnements[vue.raison].reponse)}</p>`;
    const repondu = vue.merlin && vue.merlin !== 'attente';
    return `
      <section class="carte">
        ${bloc}
        ${repondu ? '' : regleEtControle(r.piege)}
        ${repondu ? vueChat() : ''}
        ${vue.merlin === 'attente' ? '' : '<button class="principal" data-action="suivant">Continuer</button>'}
      </section>`;
  }

  // Erreur non prévue : on ne devine pas la confusion, on montre la correction.
  // C'est justement le cas où aucune explication préécrite ne colle — donc
  // celui où Merlin sert le plus.
  const repondu = vue.merlin && vue.merlin !== 'attente';
  return `
    <section class="carte">
      ${progression}
      <p class="verdict-faux">Ce n'est pas ça.</p>
      ${ex.explication ? `<p class="explication">${enrichir(ex.explication)}</p>` : ''}
      <p class="correction">La réponse était ${reponseLisible(ex)}.</p>
      ${repondu ? '' : regleEtControle(replier(ex))}
      ${vue.merlin === 'attente'
        ? `<p class="reflexion">Merlin réfléchit<span class="points"><span>.</span><span>.</span><span>.</span></span></p>`
        : repondu
          ? `<p class="reponse-merlin">${echapper(vue.merlin.explication)}</p>
             <p class="controle"><strong>Le geste —</strong> ${echapper(vue.merlin.geste)}</p>${vueChat()}`
          : merlinAutorise()
            ? `<button class="secondaire" data-action="demander-merlin">🎩 Demander à Merlin</button>`
            : ''}
      ${vue.merlin === 'attente' ? '' : '<button class="principal" data-action="suivant">Continuer</button>'}
    </section>`;
}

/**
 * La discussion qui prolonge une explication.
 *
 * Elle n'apparaît qu'APRÈS que Merlin a répondu, jamais à la place d'une
 * tentative : c'est la règle qui empêche l'appli de devenir un solveur. L'élève
 * a déjà cherché, déjà répondu, déjà dit pourquoi — alors seulement il peut
 * demander.
 */
function vueChat() {
  const messages = (vue.chat ?? []).map((m) => `
    <div class="bulle bulle--${m.role}">${echapper(m.texte)}</div>`).join('');
  const attente = vue.chatAttente
    ? `<div class="bulle bulle--merlin" id="bulle-flux"><span class="reflexion">Merlin réfléchit<span class="points"><span>.</span><span>.</span><span>.</span></span></span></div>`
    : '';
  return `
    <div class="chat">
      ${messages}${attente}
      <form class="chat-saisie" data-chat>
        <input data-champ-chat type="text" autocomplete="off"
               placeholder="Tu peux lui demander autre chose…" aria-label="Ta question à Merlin"
               value="${echapper(vue.question ?? '')}" ${vue.chatAttente ? 'disabled' : ''}>
        <button type="submit" class="chat-envoi" aria-label="Envoyer" ${vue.chatAttente ? 'disabled' : ''}>↑</button>
      </form>
    </div>`;
}

// Garde-fou souple : borne le coût d'un emballement sans brider une vraie
// discussion.
const MAX_ECHANGES = 12;

async function envoyerQuestion() {
  const q = (vue.question ?? '').trim();
  if (!q || vue.chatAttente) return;
  if ((vue.chat ?? []).length >= MAX_ECHANGES) {
    vue = { ...vue, chat: [...(vue.chat ?? []), { role: 'merlin', texte: 'On a bien discuté ! Reprends les exercices, on en reparle après.' }], question: '' };
    return rendre();
  }

  const sf = sfCourant();
  const ex = exCourant();
  const p = PIEGES[vue.retour?.piege] ?? null;

  vue = {
    ...vue,
    chat: [...(vue.chat ?? []), { role: 'eleve', texte: q }],
    question: '',
    chatAttente: true,
  };
  rendre();

  // L'historique commence par ce que Merlin vient de dire, quand il a dit
  // quelque chose : sans ça, il répondrait sans savoir ce qu'il a déjà
  // expliqué. Sur une question de cours il n'y a pas d'amorce.
  const amorce = vue.merlin?.explication;
  const historique = [
    ...(amorce ? [{ role: 'assistant', texte: amorce }] : []),
    ...vue.chat.map((m) => ({ role: m.role === 'merlin' ? 'assistant' : 'user', texte: m.texte })),
  ];

  // Deux contextes possibles : une erreur en cours, ou une section lue.
  const contexte = ex
    ? {
        savoirFaire: sf.titre,
        consigne: ex.consigne ?? sf.titre,
        enonce: ex.enonce ?? ex.affirmation,
        attendu: String(ex.attendu),
        donnee: vue.saisie?.a ?? '(choix)',
        piege: p,
      }
    : {
        savoirFaire: sf.titre,
        consigne: 'Question posée sur une partie du cours, hors exercice.',
        enonce: vue.chatSujet ?? sf.titre,
        attendu: '(aucune — il lit, il ne répond pas à un exercice)',
        donnee: '(rien)',
        piege: null,
      };

  const etats = CHAPITRE.savoirFaire.map((s) => ({ nom: s.titre, etat: etatSf(s.id) }));
  const r = await merlin.discuter({
    profil: merlin.profilPourIA(etats, profil.seance),
    contexte,
    historique,
    // Écriture directe dans la bulle : re-rendre toute la page à chaque
    // fragment ferait perdre le focus du champ et clignoter l'écran.
    onDelta: (texte) => {
      const bulle = document.getElementById('bulle-flux');
      if (bulle) bulle.textContent = texte;
    },
  });

  vue = {
    ...vue,
    chatAttente: false,
    chat: [...vue.chat, {
      role: 'merlin',
      texte: r.disponible ? r.texte : "Merlin n'est pas joignable là. Réessaie dans un instant ?",
    }],
  };
  rendre();
  app.querySelector('[data-champ-chat]')?.focus();
}

function reponseLisible(ex) {
  if (ex.type === 'calcul') return `<strong>${nombre(ex.attendu)}</strong>`;
  if (ex.type === 'trous') return `<strong>${ex.champs.map((c) => nombre(c.attendu)).join(' et ')}</strong>`;
  if (ex.type === 'signe') return `<strong>${ex.attendu}</strong>`;
  if (ex.type === 'corriger') return `la ligne <strong>${ex.lignes.findIndex((l) => l.fausse) + 1}</strong>`;
  if (ex.type === 'premier') return `<strong>${ex.attendu ? 'premier' : 'pas premier'}</strong>`;
  if (ex.type === 'comparer') return `<strong>${ex.attendu}</strong>`;
  if (ex.type === 'expression') return `<strong>${echapper(ex.attendu)}</strong>`;
  if (ex.type === 'facteurs') return `<strong>${ex.attendu.join(' × ')}</strong>`;
  if (ex.type === 'fraction') return `<strong>${nombre(ex.attendu[0])}/${nombre(ex.attendu[1])}</strong>`;
  return `<strong>${ex.attendu ? 'vrai' : 'faux'}</strong>`;
}

function regleEtControle(piegeId) {
  // Un piège nul est un cas normal, pas une anomalie : sur un item neutre on ne
  // sert aucune explication, faute d'en avoir une qui soit juste.
  const p = PIEGES[piegeId];
  if (!p) return '';
  return `
    <div class="regle">${paragraphes(p.regle)}</div>
    <p class="controle"><strong>Le contrôle —</strong> ${echapper(p.controle)}</p>`;
}

function vueProbleme(sf) {
  const pb = sf.problemes[vue.index];
  const progression = `<p class="progression">${vue.index + 1} / ${sf.problemes.length}</p>`;

  // Réussite, ou abandon assumé : on montre la correction.
  if (vue.retour?.correct || vue.correction) {
    const justes = vue.retour?.correct;
    return `
      <section class="carte">
        ${progression}
        <p class="${justes ? 'verdict-juste' : 'verdict-faux'}">${justes ? 'Tout est juste.' : 'Voici la correction.'}</p>
        <ul class="corrige">
          ${pb.questions.map((q) => `<li>${echapper(q.texte)} <strong>${nombre(q.attendu)}${q.unite ? ` ${q.unite}` : ''}</strong></li>`).join('')}
        </ul>
        <button class="principal" data-action="suivant">Continuer</button>
      </section>`;
  }

  // Erreur : on NE montre pas la correction. L'élève reste sur son énoncé,
  // avec ses réponses, et peut demander un coup de pouce puis réessayer.
  // Révéler la solution à la première erreur rendrait toute aide inutile.
  const rate = vue.retour && !vue.retour.correct;
  const niveau = vue.niveauAide ?? 0;
  const aide = vue.aide === 'attente'
    ? `<p class="reflexion">Merlin réfléchit<span class="points"><span>.</span><span>.</span><span>.</span></span></p>`
    : vue.aide
      ? `<p class="reponse-merlin">${echapper(vue.aide)}</p>`
      : '';

  return `
    <section class="carte">
      ${progression}
      ${graphique(pb.graphique)}${programme(pb.programme)}
      <p class="enonce">${echapper(pb.enonce)}</p>
      ${pb.questions.map((q, i) => `
        <div class="question">
          <p>${echapper(q.texte)}</p>
          ${champNombre(`q${i}`, q.unite ? `en ${q.unite}` : '')}
        </div>`).join('')}
      ${rate ? `<p class="verdict-faux">Pas encore. Reprends l'énoncé.</p>` : ''}
      ${aide}
      <button class="principal" data-action="valider-probleme">${rate ? 'Réessayer' : 'Valider'}</button>
      ${rate && merlinAutorise() && niveau < 2 && vue.aide !== 'attente'
        ? `<button class="secondaire" data-action="coup-de-pouce">🎩 ${niveau === 0 ? 'Un coup de pouce' : 'Encore un indice'}</button>`
        : ''}
      ${rate ? `<button class="secondaire" data-action="voir-correction">Voir la correction</button>` : ''}
    </section>`;
}

/**
 * Le coup de pouce, gradué.
 *
 * Il n'est proposé qu'APRÈS une tentative — jamais devant un énoncé vierge.
 * C'est ce qui sépare l'aide du contournement, et c'est la règle qui gouverne
 * toute la présence de Merlin dans l'appli.
 */
async function coupDePouce() {
  if (!merlinAutorise()) return;
  const sf = sfCourant();
  const pb = sf.problemes[vue.index];
  const niveau = (vue.niveauAide ?? 0) + 1;

  vue = { ...vue, aide: 'attente', niveauAide: niveau };
  rendre();

  const etats = CHAPITRE.savoirFaire.map((s) => ({ nom: s.titre, etat: etatSf(s.id) }));
  const saisi = pb.questions
    .map((q, i) => `${q.texte} → ${vue.saisie?.[`q${i}`] ?? '(vide)'}`)
    .join(' ; ');

  const r = await merlin.aiderSurProbleme({
    profil: merlin.profilPourIA(etats, profil.seance),
    savoirFaire: sf.titre,
    enonce: pb.enonce,
    question: pb.questions.map((q) => q.texte).join(' '),
    niveau,
    donnee: saisi,
  });

  if (vue.section !== 'problemes') return;
  vue = { ...vue, aide: r.disponible ? r.donnees.aide : null };
  rendre();
}

// ── Interactions ────────────────────────────────────────────────────────────

const majSaisie = (ou, id, valeur) => {
  vue[ou] = { ...(vue[ou] ?? {}), [id]: valeur };
};

app.addEventListener('click', (e) => {
  const c = e.target.closest('[data-action], [data-chapitre], [data-ouvrir], [data-section], [data-choix], [data-raison], [data-signe], [data-signe-ce], [data-avatar], [data-fournisseur], [data-sujet], [data-supprimer]');
  if (!c) return;

  if (c.dataset.sujet) return ouvrirQuestion(c.dataset.sujet);

  if (c.dataset.supprimer) {
    merlin.supprimerNote(c.dataset.supprimer);
    return rendre();
  }

  if (c.dataset.avatar) {
    vue = { ...vue, saisie: { ...(vue.saisie ?? {}), avatar: c.dataset.avatar } };
    return rendre();
  }
  if (c.dataset.fournisseur) {
    merlin.definirConfig({ fournisseur: c.dataset.fournisseur });
    vue = { ...vue, saisie: {}, verif: null };
    return rendre();
  }

  if (c.dataset.signe || c.dataset.signeCe) {
    const ce = !!c.dataset.signeCe;
    const id = c.dataset.signe ?? c.dataset.signeCe;
    const champ = app.querySelector(ce ? `[data-champ-ce="${id}"]` : `[data-champ="${id}"]`);
    const v = champ.value.trim();
    champ.value = v.startsWith('-') ? v.slice(1) : `-${v}`;
    majSaisie(ce ? 'ce' : 'saisie', id, champ.value);
    return;
  }

  if (c.dataset.chapitre) {
    CHAPITRE = chapitreParNumero(Number(c.dataset.chapitre));
    vue = { ecran: 'sommaire' };
    return rendre();
  }
  if (c.dataset.ouvrir) return ouvrir(c.dataset.ouvrir);
  if (c.dataset.section) return ouvrir(vue.sfId, c.dataset.section);

  if (c.dataset.choix != null) {
    const brut = c.dataset.choix;
    const valeur = brut === 'oui' ? true : brut === 'non' ? false : /^\d+$/.test(brut) ? Number(brut) : brut;
    return corriger({ a: valeur });
  }

  if (c.dataset.raison != null) {
    vue = { ...vue, etape: 'raison', raison: Number(c.dataset.raison), merlin: null };
    rendre();
    return demanderAMerlin();
  }

  switch (c.dataset.action) {
    case 'sommaire': vue = { ecran: 'sommaire' }; return rendre();
    case 'chapitres': vue = { ecran: 'chapitres' }; return rendre();
    case 'reglages': vue = { ecran: 'reglages', saisie: {}, deverrouille: vue.deverrouille }; return rendre();
    case 'demander-merlin': return demanderAMerlin();
    case 'parents': vue = { ecran: 'parents', saisie: {}, deverrouille: vue.deverrouille }; return rendre();
    case 'deverrouiller': {
      const ok = codeValide(vue.saisie?.code ?? '');
      vue = { ...vue, deverrouille: ok, codeRate: !ok, saisie: {} };
      return rendre();
    }
    case 'enregistrer-code': {
      const code = (vue.saisie?.nouveauCode ?? '').trim();
      // Un code trop court n'est pas un rideau, c'est une devinette.
      if (code && !/^\d{4,8}$/.test(code)) return;
      definirCode(code);
      vue = { ...vue, saisie: {}, codeEnregistre: true, deverrouille: true };
      return rendre();
    }
    case 'installer': {
      const p = (vue.saisie?.prenom ?? '').trim();
      if (!p) return;
      definirEleve(p, vue.saisie?.avatar ?? AVATARS[0]);
      vue = { ecran: 'chapitres' };
      return rendre();
    }
    case 'verifier-cle': {
      if (vue.verifEnCours) return;
      const cle = (vue.saisie?.cle ?? merlin.configIA().cles[merlin.configIA().fournisseur] ?? '').trim();
      const modele = (vue.saisie?.modele ?? merlin.configIA().modele ?? '').trim();
      if (!cle) return;
      vue = { ...vue, verifEnCours: true, verif: null };
      rendre();
      return merlin.verifierReglages({ fournisseur: merlin.configIA().fournisseur, cle, modele })
        .then((r) => {
          // On n'enregistre que ce qui marche : une clé fausse gardée en
          // mémoire ferait échouer chaque explication en silence.
          if (r.ok) merlin.definirConfig({ cle, modele });
          vue = { ...vue, verifEnCours: false, verif: r };
          rendre();
        });
    }
    case 'section-suivante': return sectionSuivante();
    case 'suivant': return suivant();
    case 'valider': {
      const champ = app.querySelector('[data-expression]');
      if (champ) majSaisie('saisie', 'expr', champ.value);
      return corriger(vue.saisie ?? {});
    }
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
    case 'coup-de-pouce': return coupDePouce();
    case 'relancer': return relancer();
    case 'voir-correction': vue = { ...vue, correction: true }; return rendre();
    case 'valider-probleme': {
      const sf = sfCourant();
      const pb = sf.problemes[vue.index];
      if (pb.questions.some((_, i) => lireNombre(vue.saisie?.[`q${i}`]) === null)) return;
      const justes = pb.questions.every((q, i) => memeNombre(lireNombre(vue.saisie[`q${i}`]), q.attendu));
      // Seule la PREMIÈRE tentative compte, dans les deux sens : persévérer
      // n'ajoute pas d'échec, et réussir après deux coups de pouce n'ajoute
      // pas de réussite. Sinon la maîtrise s'obtiendrait en demandant de
      // l'aide, alors que la charte la définit comme la réussite au palier le
      // plus difficile — sans filet.
      if (!vue.retour) {
        profil.savoirFaire[sf.id] = apresReponse(etatSf(sf.id), justes, profil.seance, 3);
        sauver();
      }
      vue = { ...vue, retour: { correct: justes } };
      return rendre();
    }
  }
});

app.addEventListener('input', (e) => {
  const t = e.target;
  if (t.dataset.champ) majSaisie('saisie', t.dataset.champ, t.value);
  if (t.dataset.champCe) majSaisie('ce', t.dataset.champCe, t.value);
  // Pas de re-rendu ici : il ferait perdre le focus à chaque frappe.
  if (t.hasAttribute('data-champ-chat')) vue.question = t.value;
});

app.addEventListener('submit', (e) => {
  if (!e.target.hasAttribute('data-chat')) return;
  e.preventDefault();
  envoyerQuestion();
});

app.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' || !(e.target.dataset.champ || e.target.dataset.champCe)) return;
  e.preventDefault();
  const bouton = app.querySelector('.principal');
  if (bouton) bouton.click();
});

rendre();
