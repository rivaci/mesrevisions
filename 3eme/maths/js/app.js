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

import { CHAPITRES, TOUS_SAVOIR_FAIRE, chapitreParNumero } from './data/chapitres/index.js';
import { SERIE } from './data/serie.js';
import { chrono, duree, noterSerie, piocheDe, tirerSerie } from './serie.js';
import { PIEGES } from './data/pieges.js';
import { graphique } from './graphique.js';
import { apresReponse, estAcquis, estARevoir, etatInitial } from './srs.js';
import { echapper, enrichir, lireFacteurs, lireNombre, maths, mathsBloc, mathsOuTexte, memeNombre, nombre, paragraphes, programme } from './rendu.js';
import { equivalentes, estUnePhrase } from './verification.js';
import * as merlin from './merlin.js';
import { AVATARS, codeDefini, codeValide, definirCode, definirEleve, eleve, estInstalle } from './eleve.js';
import { figure } from './figure.js';
import { autoCorrection, grilleDe, saisieSuspecte } from './ecrit.js';
import { EPREUVE_1, EPREUVES } from './data/epreuves.js';
import { lireDecimal, lireEntier } from './exact.js';
import {
  afficher, afficherEquation, equationDe, equivalentes as equivalentesLitt, facteursLineaires, jugerExpression,
  enTexte, jugerSolutions, lireNombreOuFraction, lireOuNull, texteSolutions,
} from './litteral.js';
import { bilanLocal, corrigerCopie, ecritsACorriger, messageBilan, questionsDe, rapportTexte, restant, totalDe } from './epreuve.js';
import {
  AIDE_EXPRESSION, AIDE_SOLUTIONS, calculDe, estEcrit, estRepondue, noterQuestion, partEcrit, points as enPoints, sansUnite,
  statutEcrit,
} from './questions.js';
import { POINTS, construireExercice, messageGeneration, niveauSuivant, pointParId } from './entrainement.js';

const CLE = 'maths3e.profil';
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
  // Juste après le cours : on essaie de le restituer tant qu'il est frais, et
  // il revient ensuite en répétition espacée depuis le sommaire du chapitre.
  { cle: 'aSavoir', titre: 'Par cœur' },
  { cle: 'methode', titre: 'La méthode' },
  { cle: 'entrainement', titre: "S'entraîner" },
  { cle: 'problemes', titre: 'Des problèmes' },
  { cle: 'redactions', titre: 'Rédiger' },
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
    aide: null, niveauAide: 0, correction: false, merlin: null, chat: null, etape: null, ecrit: {},
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
  finirSeance();
}

/** Une séance s'achève (un savoir-faire, ou la série des énoncés à savoir) :
 *  le compteur avance, Merlin consolide, retour au sommaire. */
function finirSeance() {
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
  const jugement = jugerReponse(ex, donnee);
  if (!jugement) return;
  if (jugement.illisible) {
    vue = { ...vue, illisible: true };
    return rendre();
  }
  const { correct, piege } = jugement;
  // Merlin doit lire ce que l'élève a choisi, pas « (choix) ».
  if (ex.type === 'choix') vue = { ...vue, saisie: { ...(vue.saisie ?? {}), a: ex.choix[donnee.a] } };

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
 * Le verdict d'une réponse, sans rien changer à l'écran ni au profil : il sert
 * aux exercices comme à la série chronométrée, qui corrige à la fin.
 *
 *   null                     réponse incomplète ou illisible comme nombre : on attend ;
 *   { illisible: true }      une expression que le moteur ne sait pas lire ;
 *   { correct, piege }       le piège est la confusion supposée, ou null.
 */
function jugerReponse(ex, donnee) {
  let correct = false;
  let piege = null;

  if (ex.type === 'calcul') {
    const n = lireNombre(donnee.a);
    if (n === null) return null;
    correct = memeNombre(n, ex.attendu);
    if (!correct) piege = (ex.fausses ?? []).find((f) => memeNombre(f.valeur, n))?.piege ?? replier(ex);
  } else if (ex.type === 'trous') {
    const valeurs = ex.champs.map((c) => lireNombre(donnee[c.id]));
    if (valeurs.some((v) => v === null)) return null;
    correct = ex.champs.every((c, i) => memeNombre(valeurs[i], c.attendu));
    if (!correct) {
      piege = (ex.fausses ?? []).find((f) => valeurs.some((v) => memeNombre(f.valeur, v)))?.piege
        ?? replier(ex);
    }
  } else if (['signe', 'plausible', 'vraifaux', 'premier', 'comparer'].includes(ex.type)) {
    if (donnee.a == null) return null;
    correct = donnee.a === ex.attendu;
    if (!correct) piege = (ex.fausses ?? []).find((f) => f.valeur === donnee.a)?.piege ?? replier(ex);
  } else if (ex.type === 'facteurs') {
    const saisis = lireFacteurs(donnee.a);
    if (!saisis) return null;
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
    if (num === null || den === null) return null;
    correct = memeNombre(num, ex.attendu[0]) && memeNombre(den, ex.attendu[1]);
    if (!correct) piege = (ex.fausses ?? []).find((f) => f.valeur === `${num}/${den}`)?.piege ?? replier(ex);
  } else if (ex.type === 'expression') {
    const eq = equivalentes(donnee.expr, ex.attendu);
    // `null` veut dire « illisible », pas « faux ». Compter faux une écriture
    // qu'on n'a pas su lire punirait l'élève d'une limite de l'application.
    if (eq === null) return { illisible: true };
    correct = eq;
    if (!correct) {
      piege = (ex.fausses ?? []).find((f) => equivalentes(donnee.expr, f.valeur) === true)?.piege
        ?? replier(ex);
    }
  } else if (ex.type === 'choix') {
    // Le bouton porte l'INDICE de l'option : le texte d'une option peut
    // contenir n'importe quel caractère, un indice non.
    const choisi = ex.choix[donnee.a];
    if (choisi === undefined) return null;
    correct = choisi === ex.attendu;
    if (!correct) piege = (ex.fausses ?? []).find((f) => f.valeur === choisi)?.piege ?? replier(ex);
  } else if (ex.type === 'corriger') {
    if (donnee.a == null) return null;
    correct = ex.lignes[donnee.a]?.fausse === true;
    if (!correct) piege = replier(ex);
  } else if (ex.type === 'litteral') {
    // Le calcul littéral se juge sur la valeur ET sur la forme (litteral.js) :
    // une réponse équivalente mais pas développée, pas réduite ou pas
    // factorisée a son propre piège, qui dit ce qui reste à faire.
    if (!String(donnee.expr ?? '').trim()) return null;
    const j = jugerExpression(donnee.expr, ex);
    if (j.statut === 'illisible') return { illisible: true };
    correct = j.statut === 'juste';
    if (!correct) {
      piege = j.raison
        ? `cl-${j.raison}`
        : (ex.fausses ?? []).find((f) => equivalentesLitt(donnee.expr, f.valeur) === true)?.piege ?? replier(ex);
    }
  } else if (ex.type === 'solutions') {
    const j = jugerSolutions([donnee.x1, donnee.x2], equationDe(ex.enonce));
    if (j.statut === 'vide') return null;
    if (j.statut === 'illisible') return { illisible: true };
    correct = j.statut === 'juste';
    if (!correct) piege = j.piege ?? replier(ex);
  }

  return { correct, piege };
}

/** Ce que l'élève a répondu, en clair, pour Merlin : le choix, l'expression, les solutions. */
function donneeLisible(ex, saisie = {}) {
  if (ex.type === 'litteral' || ex.type === 'expression') return saisie.expr ?? '(rien)';
  if (ex.type === 'solutions') return [saisie.x1, saisie.x2].filter((v) => String(v ?? '').trim()).join(' ; ') || '(rien)';
  return saisie.a ?? '(choix)';
}

/** La réponse attendue, en clair, pour Merlin. */
const attenduLisible = (ex) => (ex.type === 'solutions' ? texteSolutions(equationDe(ex.enonce)) : String(ex.attendu));

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
      attendu: attenduLisible(ex),
      donnee: donneeLisible(ex, vue.saisie),
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

// ── La série chronométrée ───────────────────────────────────────────────────
//
// Le format de l'interrogation de calcul mental : 40 calculs mêlés, tirés dans
// le chapitre 2 (voir serie.js et data/serie.js). Pendant la série, aucune
// correction ni Merlin, et le chronomètre tourne : une réponse est jugée,
// gardée, et le calcul suivant arrive. La copie corrigée vient à la fin.

const sfParId = (id) => TOUS_SAVOIR_FAIRE.find((s) => s.id === id);
const questionSerie = (q) => {
  const sf = sfParId(q.sfId);
  return { sf, ex: piocheDe(sf).find((e) => e.id === q.exId) };
};

// Le chronomètre se met à jour seul, sans redessiner la page : un re-rendu à
// chaque seconde effacerait ce qu'Evan est en train de taper.
let minuterie = null;
function lancerMinuterie() {
  clearInterval(minuterie);
  minuterie = setInterval(() => {
    if (vue.ecran !== 'serie') { clearInterval(minuterie); return; }
    const el = app.querySelector('[data-chrono]');
    if (el) el.textContent = `⏱ ${chrono(Date.now() - vue.debut)}`;
  }, 1000);
}

function commencerSerie() {
  vue = { ecran: 'serie', questions: tirerSerie(SERIE, sfParId), index: 0, reponses: [], saisie: {}, debut: Date.now() };
  rendre();
  lancerMinuterie();
  window.scrollTo({ top: 0 });
}

/** Ce que l'élève a répondu, en clair, pour la copie corrigée. */
function reponseDonnee(ex, donnee) {
  if (ex.type === 'fraction') return `${donnee.num}/${donnee.den}`;
  return String(donnee.a);
}

function repondreSerie(donnee, { passe = false } = {}) {
  const { sf, ex } = questionSerie(vue.questions[vue.index]);
  let rep = { correct: false, piege: null, passe: true };
  if (!passe) {
    const j = jugerReponse(ex, donnee);
    if (!j || j.illisible) return;
    rep = { correct: j.correct, piege: j.piege, donnee: reponseDonnee(ex, donnee) };
  }
  // La série compte dans la progression, comme « Se tester » : passer, c'est
  // ne pas savoir.
  noter(sf, ex, rep.correct);
  const reponses = [...vue.reponses, rep];
  if (vue.index + 1 >= vue.questions.length) {
    clearInterval(minuterie);
    const temps = Date.now() - vue.debut;
    const note = noterSerie(SERIE, reponses);
    profil.series = [...(profil.series ?? []), { date: new Date().toISOString(), justes: note.justes, sur: note.sur, temps }];
    sauver();
    vue = { ecran: 'serie-bilan', questions: vue.questions, reponses, note, temps };
  } else {
    vue = { ...vue, index: vue.index + 1, reponses, saisie: {}, illisible: false };
  }
  rendre();
  window.scrollTo({ top: 0 });
}

function vueSerie() {
  const q = vue.questions[vue.index];
  const { sf, ex } = questionSerie(q);
  return `
    <header class="entete-section">
      <button class="retour" data-action="chapitres">← Arrêter la série</button>
      <h1>${echapper(SERIE.titre)}</h1>
    </header>
    <section class="carte">
      <p class="progression serie-ligne"><span>Calcul ${vue.index + 1} / ${vue.questions.length}</span>
        <span class="serie-chrono" data-chrono>⏱ ${chrono(Date.now() - vue.debut)}</span></p>
      <p class="consigne">${echapper(ex.consigne ?? sf.titre)}</p>
      ${saisieExercice(ex)}
      <button class="secondaire" data-action="passer-serie">Je passe</button>
    </section>
    <p class="note">Pas de correction pendant la série : elle arrive à la fin, avec ta note et ton temps.</p>`;
}

/**
 * Le rappel du cours sous une erreur : les blocs du savoir-faire du type que
 * l'exercice désigne (`revoir`), ou toutes ses propriétés. Replié : la
 * correction se lit d'abord, la règle s'ouvre si besoin.
 */
function rappelCours(sf, ex) {
  const type = ex.revoir ?? 'propriete';
  const blocs = (sf.cours ?? []).filter((b) => b.type === type);
  if (!blocs.length) return '';
  return `
    <details class="rappel-cours">
      <summary>📖 Le rappel du cours</summary>
      ${blocs.map(blocCours).join('')}
    </details>`;
}

function vueSerieBilan() {
  const { note, questions, reponses, temps } = vue;
  const appreciation = note.justes === note.sur ? 'Tout est juste. Bravo !'
    : note.note >= 16 ? 'Très bien. Relis les corrections, puis refais une série : les calculs changent.'
      : note.note >= 12 ? 'Pas mal. Relis chaque correction et le rappel du cours, puis refais une série.'
        : 'Reprends les savoir-faire indiqués ci-dessous, puis refais une série.';
  const passes = reponses.filter((x) => x.passe).length;
  const erreurs = questions
    .map((q, k) => ({ q, rep: reponses[k], k }))
    .filter(({ rep }) => !rep.correct)
    .map(({ q, rep, k }) => {
      const { sf, ex } = questionSerie(q);
      return `
        <section class="carte">
          <p class="progression">Calcul ${k + 1} · ${echapper(sf.titre)}</p>
          ${enonceExercice(ex)}
          <p class="verdict-faux">${rep.passe ? 'Passé.' : `Ta réponse : ${echapper(rep.donnee)}`}</p>
          <p class="correction">La réponse était ${reponseLisible(ex)}.</p>
          ${regleEtControle(rep.piege ?? replier(ex))}
          ${rappelCours(sf, ex)}
          <button class="secondaire" data-revoir-sf="${sf.id}">Revoir le cours : ${echapper(sf.titre)}</button>
        </section>`;
    }).join('');

  return `
    <header class="entete-section">
      <button class="retour" data-action="chapitres">← Tous les chapitres</button>
      <h1>${String(note.note).replace('.', ',')} / ${note.bareme}</h1>
      <p class="sous-titre">${note.justes} calcul${note.justes > 1 ? 's' : ''} juste${note.justes > 1 ? 's' : ''} sur ${note.sur}, en ${duree(temps)}${passes ? ` · ${passes} passé${passes > 1 ? 's' : ''}` : ''}. ${echapper(appreciation)}</p>
    </header>
    <section class="carte">
      <button class="principal" data-action="serie">Refaire une série</button>
    </section>
    ${erreurs ? `<h2 class="titre-serie">La correction de tes erreurs</h2>${erreurs}` : ''}`;
}

/** La série, en tête de la liste des chapitres, avec la dernière note et la meilleure. */
function carteSerie() {
  const series = profil.series ?? [];
  const derniere = series.at(-1);
  const meilleure = series.reduce((m, x) => (!m || x.justes > m.justes || (x.justes === m.justes && x.temps < m.temps) ? x : m), null);
  const sur20 = (x) => String(Math.round((x.justes * SERIE.bareme * 2) / x.sur) / 2).replace('.', ',');
  const nombre = SERIE.tirage.reduce((t, x) => t + x.nombre, 0);
  return `
    <div class="sommaire sommaire-serie">
      <button class="sf sf-serie" data-action="serie">
        <span class="sf-numero">⏱</span>
        <span class="sf-corps">
          <span class="sf-titre">${echapper(SERIE.titre)} de calcul mental</span>
          <span class="sf-detail">${derniere
            ? `Dernière : ${sur20(derniere)} / ${SERIE.bareme} en ${duree(derniere.temps)} · meilleure : ${sur20(meilleure)} / ${SERIE.bareme}`
            : `${nombre} calculs mêlés, notés sur ${SERIE.bareme}, comme l'interrogation`}</span>
        </span>
      </button>
    </div>`;
}

// ── Les questions de l'épreuve et d'« Entraîne-moi » ───────────────────────
//
// Une même zone de réponse pour les deux écrans (voir questions.js). Rien ne
// s'y valide : à l'épreuve, la réponse est gardée telle quelle jusqu'à la fin ;
// à l'entraînement, un bouton « Valider » s'ajoute en dessous.

const etatsTous = () => TOUS_SAVOIR_FAIRE.map((s) => ({ nom: s.titre, etat: etatSf(s.id) }));
const pluriel = (n, mot) => `${n} ${mot}${n > 1 ? 's' : ''}`;
const dateCourte = (iso) => new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });

function zoneQuestion(q) {
  const s = vue.saisie ?? {};
  if (q.type === 'exact') {
    const c = calculDe(q);
    const champs = q.forme === 'fraction'
      ? `<div class="champs-ligne">${champNombre('num', 'numérateur')}${champNombre('den', 'dénominateur')}</div>`
      : q.forme === 'scientifique'
        ? `<p class="aide">Écris le résultat sous la forme a × 10<sup>n</sup>.</p>
           <div class="champs-ligne">${champNombre('m', 'le nombre a')}${champNombre('e', 'l\'exposant n')}</div>`
        : champNombre('a', '');
    return `<p class="consigne">${echapper(q.consigne)}</p>
      ${mathsBloc(`${q.nom ? `${q.nom} = ` : ''}${c.latex}`)}
      ${champs}`;
  }
  if (q.type === 'nombres') {
    return `<p class="enonce-ecrit">${echapper(q.consigne)}</p>
      ${figure(q.figure)}
      ${q.enonce ? mathsBloc(q.enonce) : ''}
      ${q.champs.map((ch) => champNombre(ch.id, ch.etiquette)).join('')}`;
  }
  if (q.type === 'litteral') {
    return `<p class="consigne">${echapper(q.consigne)}</p>
      ${mathsBloc(enonceLitteral(q))}
      ${champExpression()}
      <p class="aide">${aideExpression(q.forme)}</p>`;
  }
  if (q.type === 'solutions') {
    return `<p class="consigne">${echapper(q.consigne)}</p>
      ${mathsBloc(afficherEquation(q.enonce) ?? q.enonce)}
      ${champsSolutions(q)}`;
  }
  if (q.type === 'choix') {
    return `<p class="enonce-ecrit">${echapper(q.consigne)}</p>
      ${figure(q.figure)}
      <div class="choix vertical">
        ${q.choix.map((x, i) => `<button class="option option-douce ${s.a === i ? 'actif' : ''}" data-rep-choix="${i}">${echapper(x)}</button>`).join('')}
      </div>`;
  }
  return `
    <h2>${echapper(q.titre)}</h2>
    ${q.type === 'redaction' ? `<p class="enonce-ecrit">${echapper(q.enonce)}</p>` : ''}
    ${figure(q.figure)}
    <p class="consigne">${echapper(q.consigne)}</p>
    <textarea class="zone-ecrit" data-ecrit rows="${q.type === 'enonce' ? 5 : 10}"
      autocomplete="off" autocapitalize="sentences" spellcheck="false"
      aria-label="${q.type === 'enonce' ? 'Ton énoncé, écrit de mémoire' : 'Ta rédaction'}"
      placeholder="${q.type === 'enonce' ? 'Écris-le de mémoire…' : 'Rédige comme dans ton cours : On sait que…'}">${echapper(s.texte ?? '')}</textarea>
    <p class="alerte-collage" data-alerte-collage hidden>Le copier-coller est désactivé : écris-le toi-même.</p>`;
}

/** L'énoncé d'une question, rappelé au-dessus de sa correction. */
const rappelQuestion = (q) => {
  if (q.type === 'exact') return mathsBloc(`${q.nom ? `${q.nom} = ` : ''}${calculDe(q).latex}`);
  if (q.type === 'litteral') return `<p class="consigne">${echapper(q.consigne)}</p>${mathsBloc(enonceLitteral(q))}`;
  if (q.type === 'solutions') return `<p class="consigne">${echapper(q.consigne)}</p>${mathsBloc(afficherEquation(q.enonce) ?? q.enonce)}`;
  return `<p class="enonce-ecrit">${echapper(q.consigne)}</p>${figure(q.figure)}${q.enonce ? mathsBloc(q.enonce) : ''}`;
};

/** « F = (2x − 3)(x + 4) » : l'expression d'une question, telle que litteral.js l'a lue. */
const enonceLitteral = (q) => `${q.nom ? `${q.nom} = ` : ''}${afficher(q.enonce) ?? q.enonce}`;

/** La réponse attendue d'une question : une expression se montre en formule. */
const attenduAffiche = (q, r) => (q?.type === 'litteral'
  ? maths(afficher(q.attendu) ?? q.attendu)
  : echapper(r.attendu));

/** Ce que l'élève a écrit, puis la grille corrigée et la référence. */
function correctionEcrit(q, r) {
  // Une copie passée se relit avec la grille qui l'a notée.
  const grille = r.grille ?? grilleDe(q.type, q);
  return `
    ${r.message ? `<p class="reponse-merlin">${echapper(r.message)}</p>` : ''}
    <ul class="grille-ecrit">
      ${grille.map((g) => {
        const statut = r.statuts?.[g.id] ?? 'absent';
        const note = r.commentaires?.[g.id];
        return `<li class="critere critere--${statut}"><span class="critere-icone" aria-hidden="true">${ICONES[statut]}</span>
          <span><span class="critere-texte">${echapper(g.texte)}</span>${note ? `<span class="critere-note">${echapper(note)}</span>` : ''}</span></li>`;
      }).join('')}
    </ul>
    <p class="bloc-type">Ce que tu as écrit</p><blockquote class="copie-eleve">${echapper(r.texte ?? '')}</blockquote>
    ${reference(q.type, q)}`;
}

// ── L'épreuve blanche ───────────────────────────────────────────────────────
//
// Une heure, corrigée à la fin seulement (voir epreuve.js). La copie en cours
// est dans le profil à chaque frappe : une page rechargée ou une appli fermée
// ne perd rien, et le temps, lui, continue de courir.

/** Le sujet proposé aujourd'hui. */
const EPREUVE = EPREUVE_1;
/** Un sujet par son identifiant : celui du moment, ou une version archivée. */
const sujetDe = (id) => EPREUVES.find((e) => e.id === id) ?? null;
/** Le sujet d'une tentative passée : celui qu'elle a passé, pas le sujet du moment. */
const epreuveDe = (t) => sujetDe(t.id) ?? EPREUVE;
// Une copie se finit et se corrige avec SON sujet : une copie commencée avant
// une nouvelle version du sujet n'est ni perdue, ni notée sur un autre.
const copieEnCours = () => (sujetDe(profil.epreuveEnCours?.id) ? profil.epreuveEnCours : null);
const sujetEnCours = () => sujetDe(copieEnCours()?.id) ?? EPREUVE;
const questionsEnCours = () => questionsDe(sujetEnCours());
const sujetCorrection = () => sujetDe(profil.correctionEnCours?.id) ?? EPREUVE;
/** Les tentatives d'une épreuve, toutes versions de son sujet confondues. */
const tentativesDuNumero = (numero) => (profil.epreuves ?? [])
  .map((t, i) => ({ t, i }))
  .filter(({ t }) => epreuveDe(t).numero === numero);
/** Combien de fois cette épreuve a déjà été passée : 1 pour un premier passage. */
const passageSuivant = (sujet) => tentativesDuNumero(sujet.numero).length + 1;
const mentionPassage = (t) => (t.passage > 1 ? ` · ${t.passage}e passage, questions déjà corrigées` : '');

function allerQuestion(i) {
  const c = copieEnCours();
  c.index = Math.max(0, Math.min(questionsEnCours().length - 1, i));
  sauver();
  const q = questionsEnCours()[c.index];
  vue = { ecran: 'epreuve', saisie: { ...(c.reponses[q.id] ?? {}) } };
  rendre();
  window.scrollTo({ top: 0 });
}

/** Garde la réponse de la question affichée. */
function garderReponse() {
  const c = copieEnCours();
  if (!c || vue.ecran !== 'epreuve') return;
  c.reponses[questionsEnCours()[c.index].id] = { ...(vue.saisie ?? {}) };
  sauver();
}

// Le compte à rebours se met à jour seul, sans redessiner la page : un
// re-rendu à chaque seconde effacerait ce qu'Evan est en train d'écrire.
let compteARebours = null;
function lancerCompteARebours() {
  clearInterval(compteARebours);
  compteARebours = setInterval(() => {
    const c = copieEnCours();
    if (!c) { clearInterval(compteARebours); return; }
    const reste = restant(c.debut, sujetEnCours().duree, Date.now());
    if (reste <= 0) { clearInterval(compteARebours); rendreCopie({ ramassee: true }).catch(secours); return; }
    const el = app.querySelector('[data-chrono]');
    if (el) {
      el.textContent = `⏳ ${chrono(reste)}`;
      el.classList.toggle('chrono-fin', reste < 5 * 60000);
    }
  }, 1000);
}

function commencerEpreuve() {
  if (!copieEnCours()) {
    profil.epreuveEnCours = { id: EPREUVE.id, debut: Date.now(), reponses: {}, index: 0 };
    sauver();
  }
  allerQuestion(copieEnCours().index);
  lancerCompteARebours();
}

/**
 * La copie est rendue — ou ramassée à la fin de l'heure. Elle passe en
 * correction, et cet état est gardé lui aussi : fermer l'appli pendant que
 * Merlin corrige ne fait rien perdre.
 */
function rendreCopie({ ramassee = false } = {}) {
  const c = copieEnCours();
  if (!c) return Promise.resolve();
  clearInterval(compteARebours);
  const fin = ramassee ? c.debut + sujetEnCours().duree * 60000 : Date.now();
  profil.correctionEnCours = { id: c.id, debut: c.debut, duree: fin - c.debut, ramassee, reponses: c.reponses, corrections: {} };
  delete profil.epreuveEnCours;
  sauver();
  return corrigerEcritsEpreuve();
}

/**
 * Si une correction plante malgré tout, l'appli s'ouvre quand même sur les
 * chapitres. La copie reste dans le profil : rien n'est perdu.
 */
function secours() {
  clearInterval(compteARebours);
  vue = { ecran: 'chapitres' };
  rendre();
}

/** À l'épreuve, une saisie qui ne se lit pas comme un nombre est signalée tout de suite — sans dire si elle est juste. */
function signalerIllisible(champ) {
  if (champ.tagName === 'MATH-FIELD') {
    // Une expression que l'appli ne sait pas lire vaudrait 0 sans qu'Evan le
    // sache : on le dit pendant l'épreuve, sans rien dire de sa justesse.
    let alerte = champ.nextElementSibling?.classList?.contains('champ-alerte') ? champ.nextElementSibling : null;
    if (!alerte) {
      alerte = document.createElement('p');
      alerte.className = 'champ-alerte';
      alerte.textContent = 'Je n\u2019arrive pas à lire cette écriture : des nombres, des lettres, + − × et des parenthèses.';
      champ.after(alerte);
    }
    alerte.hidden = !String(champ.value ?? '').trim() || lireOuNull(champ.value) !== null;
    return;
  }
  if (champ.tagName !== 'INPUT') return;
  const q = questionsEnCours()[copieEnCours()?.index ?? 0];
  const v = champ.value;
  const entier = ['num', 'den', 'e'].includes(champ.dataset.champ);
  const lu = q.type === 'solutions' ? lireNombreOuFraction(v)
    : entier ? lireEntier(v) : lireDecimal(q.type === 'nombres' ? sansUnite(v) : v);
  const bloc = champ.closest('.champ');
  let alerte = bloc.querySelector('.champ-alerte');
  if (!alerte) {
    alerte = document.createElement('p');
    alerte.className = 'champ-alerte';
    alerte.textContent = entier ? 'Écris seulement un nombre entier.'
      : q.type === 'solutions' ? 'Écris seulement un nombre, ou une fraction avec la barre /.'
        : 'Écris seulement un nombre, avec une virgule si besoin.';
    bloc.append(alerte);
  }
  alerte.hidden = !v.trim() || lu !== null;
}

let jetonCorrection = null;
async function corrigerEcritsEpreuve() {
  const k = profil.correctionEnCours;
  const jeton = {};
  jetonCorrection = jeton;
  const aFaire = ecritsACorriger(sujetCorrection(), k.reponses).filter((q) => !k.corrections[q.id]);
  if (merlin.disponible() && aFaire.length) {
    vue = { ecran: 'epreuve-correction', etape: 'merlin', faits: 0, total: aFaire.length };
    rendre();
    const profilIA = merlin.profilPourIA(etatsTous(), profil.seance);
    // Trois écrits à la fois : sept appels l'un après l'autre feraient attendre
    // Evan plusieurs minutes devant sa note, et sept d'un coup risquent la
    // limite de débit du fournisseur. Un écrit que Merlin n'a pas lu est
    // redemandé une fois avant de passer à l'auto-correction.
    const file = [...aFaire];
    const corriger = async (q) => {
      for (let essai = 0; essai < 2; essai += 1) {
        const r = await merlin.corrigerEcrit({ profil: profilIA, nature: q.type, objet: q, texte: k.reponses[q.id].texte });
        if (jetonCorrection !== jeton) return;
        if (r.statuts) {
          k.corrections[q.id] = { statuts: r.statuts, commentaires: r.commentaires, message: r.message, parMerlin: true };
          sauver();
          break;
        }
      }
      if (vue.ecran === 'epreuve-correction' && vue.etape === 'merlin') {
        vue = { ...vue, faits: vue.faits + 1 };
        rendre();
      }
    };
    await Promise.all([1, 2, 3].map(async () => {
      while (file.length && jetonCorrection === jeton) await corriger(file.shift());
    }));
    if (jetonCorrection !== jeton) return;
  }
  // Ce que Merlin n'a pas pu lire, Evan le corrige lui-même sur la grille.
  const restants = ecritsACorriger(sujetCorrection(), k.reponses).filter((q) => !k.corrections[q.id]);
  if (restants.length) {
    vue = { ecran: 'epreuve-correction', etape: 'auto', qid: restants[0].id, panne: merlin.disponible() };
    rendre();
    window.scrollTo({ top: 0 });
    return;
  }
  return terminerEpreuve();
}

async function terminerEpreuve() {
  const k = profil.correctionEnCours;
  const sujet = sujetCorrection();
  const correction = corrigerCopie(sujet, k.reponses, k.corrections);
  vue = { ecran: 'epreuve-correction', etape: 'bilan' };
  rendre();
  let bilan = null;
  if (merlin.disponible()) {
    const parMerlin = correction.resultats.every((r) => !estEcrit(r) || r.statut === 'vide' || r.parMerlin);
    try {
      bilan = await merlin.bilanEpreuve({
        profil: merlin.profilPourIA(etatsTous(), profil.seance),
        message: messageBilan(sujet, correction, { duree: k.duree, parMerlin, ramassee: k.ramassee }),
      });
    } catch { /* le bilan de l'appli prend le relais */ }
  }
  if (!profil.correctionEnCours) return;
  profil.epreuves = [...(profil.epreuves ?? []), {
    // La date est celle de l'épreuve, pas de sa correction : une copie
    // ramassée à la réouverture, des jours plus tard, garde son jour.
    id: sujet.id, date: new Date(k.debut).toISOString(), debut: k.debut, duree: k.duree, ramassee: k.ramassee,
    passage: passageSuivant(sujet), reponses: k.reponses, ...correction, bilan: bilan ?? bilanLocal(correction),
  }];
  delete profil.correctionEnCours;
  sauver();
  vue = { ecran: 'epreuve-bilan', tentative: profil.epreuves.length - 1, depuis: 'chapitres' };
  rendre();
  window.scrollTo({ top: 0 });
}

function carteEpreuve() {
  const derniere = tentativesDuNumero(EPREUVE.numero).at(-1)?.t;
  const enCours = copieEnCours();
  const detail = enCours
    ? `En cours — il reste ${chrono(restant(enCours.debut, sujetEnCours().duree, Date.now()))}`
    : derniere
      ? `Dernière note : ${enPoints(derniere.note)} / ${derniere.sur}, le ${dateCourte(derniere.date)}${derniere.passage > 1 ? ` (${derniere.passage}e passage)` : ''}`
      : `${EPREUVE.duree} minutes, notée sur ${totalDe(EPREUVE)}, corrigée à la fin`;
  return `
    <button class="sf sf-serie" data-action="epreuve">
      <span class="sf-numero">📝</span>
      <span class="sf-corps">
        <span class="sf-titre">${echapper(EPREUVE.titre)}</span>
        <span class="sf-detail">${echapper(detail)}</span>
      </span>
    </button>`;
}

function vueEpreuveAccueil() {
  const tentatives = tentativesDuNumero(EPREUVE.numero);
  return `
    <header class="entete-section">
      <button class="retour" data-action="chapitres">← Tous les chapitres</button>
      <h1>${echapper(EPREUVE.titre)}</h1>
      <p class="sous-titre">${echapper(EPREUVE.sousTitre)}</p>
    </header>
    <section class="carte">
      <h2>En conditions d'examen</h2>
      <ul class="regles">
        <li><strong>${EPREUVE.duree} minutes.</strong> Le temps part quand tu commences et ne s'arrête plus, même si tu fermes l'appli. À la fin, la copie est ramassée.</li>
        <li>${EPREUVE.parties.map((p) => `${p.id}. ${p.titre} (${enPoints(p.questions.reduce((t, q) => t + q.points, 0))} pts)`).join(' · ')}.</li>
        <li><strong>Aucune correction avant la fin</strong>, et pas de Merlin pendant l'épreuve.</li>
        <li>Tu passes d'une question à l'autre comme sur une copie, et tu rends quand tu veux.</li>
        <li>Prépare un brouillon et un crayon. Le copier-coller est désactivé.</li>
        <li>À la fin : ta note sur ${totalDe(EPREUVE)}, la correction de chaque question, et le bilan de Merlin — que tes parents peuvent lire.</li>
      </ul>
      ${merlin.disponible() ? '' : '<p class="aide">Merlin n\'a pas de clé : à la fin, tu corrigeras toi-même les énoncés et les rédactions, sur une grille.</p>'}
      <button class="principal" data-action="commencer-epreuve">Commencer l'épreuve</button>
    </section>
    ${tentatives.length ? `
      <section class="carte">
        <h2>Tes épreuves</h2>
        <ul class="suivi">
          ${tentatives.map(({ t, i }) => `<li><button class="lien-tentative" data-voir-epreuve="${i}">Le ${dateCourte(t.date)}${t.id !== EPREUVE.id ? ' (première version du sujet)' : ''}${t.passage > 1 ? ` (${t.passage}e passage)` : ''}</button>
            <span class="suivi-etat">${enPoints(t.note)} / ${t.sur}</span></li>`).join('')}
        </ul>
      </section>` : ''}`;
}

function vueEpreuve() {
  const c = copieEnCours();
  const sujet = sujetEnCours();
  const qs = questionsDe(sujet);
  const q = qs[c.index];
  const partie = sujet.parties.find((p) => p.id === q.partie);
  const premiere = partie.questions[0].id === q.id;
  const reste = restant(c.debut, sujet.duree, Date.now());
  const sansReponse = qs.filter((x) => !estRepondue(x, c.reponses[x.id])).length;
  const derniere = c.index === qs.length - 1;
  return `
    <header class="entete-section">
      <p class="progression serie-ligne"><span>${echapper(sujet.titre)}</span>
        <span class="serie-chrono ${reste < 5 * 60000 ? 'chrono-fin' : ''}" data-chrono>⏳ ${chrono(reste)}</span></p>
      <h1>${partie.id}. ${echapper(partie.titre)}</h1>
      ${premiere ? `<p class="sous-titre">${echapper(partie.consigne)}</p>` : ''}
    </header>
    <section class="carte">
      <p class="progression">Question ${q.id} · ${enPoints(q.points)} point${q.points > 1 ? 's' : ''}</p>
      ${zoneQuestion(q)}
      <div class="boutons-ecrit">
        <button class="secondaire" data-action="question-precedente" ${c.index === 0 ? 'disabled' : ''}>← Précédente</button>
        <button class="principal" data-action="${derniere ? 'confirmer-rendre' : 'question-suivante'}">${derniere ? 'Rendre ma copie' : 'Suivante →'}</button>
      </div>
    </section>
    <section class="carte">
      <p class="consigne">Ta copie — touche une question pour y aller.</p>
      <div class="plan-copie">
        ${qs.map((x, i) => `<button class="case-copie ${estRepondue(x, c.reponses[x.id]) ? 'faite' : ''} ${i === c.index ? 'actuelle' : ''}"
          data-aller="${i}" aria-label="Question ${x.id}">${x.id}</button>`).join('')}
      </div>
      ${vue.confirmer ? `
        <p class="verdict-faux">${sansReponse ? `${pluriel(sansReponse, 'question')} sans réponse, et ` : ''}il reste ${chrono(reste)}. Tu rends ta copie ?</p>
        <div class="boutons-ecrit">
          <button class="secondaire" data-action="annuler-rendre">Je continue</button>
          <button class="principal" data-action="rendre-copie">Oui, je rends</button>
        </div>`
        : `<button class="secondaire" data-action="confirmer-rendre">Rendre ma copie</button>`}
    </section>`;
}

function vueEpreuveCorrection() {
  if (vue.etape === 'auto') {
    const k = profil.correctionEnCours;
    const q = questionsDe(sujetCorrection()).find((x) => x.id === vue.qid);
    const restants = ecritsACorriger(sujetCorrection(), k.reponses).filter((x) => !k.corrections[x.id]).length;
    return `
      <header class="entete-section"><h1>Corrige tes écrits</h1>
        <p class="sous-titre">${vue.panne ? 'Merlin n\'a pas pu lire ' : 'Sans Merlin, tu corriges toi-même '}${pluriel(restants, 'écrit')} : compare avec le cours, et coche honnêtement ce que tu avais écrit, et juste. Ta note en dépend.</p>
      </header>
      <section class="carte carte-ecrit">
        <p class="progression">Question ${q.id} · ${enPoints(q.points)} point${q.points > 1 ? 's' : ''}</p>
        <h2>${echapper(q.titre)}</h2>
        ${q.type === 'redaction' ? `<p class="enonce-ecrit">${echapper(q.enonce)}</p>` : ''}
        <p class="bloc-type">Ce que tu as écrit</p><blockquote class="copie-eleve">${echapper(k.reponses[q.id].texte)}</blockquote>
        ${reference(q.type, q)}
        <p class="consigne">Coche ce que tu avais écrit, et juste :</p>
        <div class="grille-auto">
          ${grilleDe(q.type, q).map((g) => `<label class="coche"><input type="checkbox" data-coche="${g.id}"><span>${echapper(g.texte)}</span></label>`).join('')}
        </div>
        <button class="principal" data-action="valider-auto-epreuve">Valider ma correction</button>
      </section>`;
  }
  const texte = vue.etape === 'bilan'
    ? 'Merlin écrit ton bilan'
    : `Merlin corrige tes énoncés et tes rédactions — ${vue.faits} sur ${vue.total}`;
  return `
    <header class="entete-section"><h1>Copie rendue</h1></header>
    <section class="carte">
      <p class="reflexion">${texte}<span class="points"><span>.</span><span>.</span><span>.</span></span></p>
      <p class="aide">Les calculs sont déjà corrigés. Reste sur cet écran : la note arrive dans un instant.</p>
    </section>`;
}

function vueEpreuveBilan() {
  const t = profil.epreuves[vue.tentative];
  const ep = epreuveDe(t);
  const questions = questionsDe(ep);
  const b = t.bilan;
  const auto = t.resultats.some((r) => estEcrit(r) && r.statut !== 'vide' && !r.parMerlin);
  const liste = (titre, items, classe) => (items.length
    ? `<h3 class="bilan-titre ${classe}">${titre}</h3><ul class="bilan-liste">${items.map((x) => `<li>${echapper(x)}</li>`).join('')}</ul>`
    : '');
  const VERDICT = { juste: 'verdict-juste', presque: 'verdict-presque', faux: 'verdict-faux', vide: 'verdict-faux', illisible: 'verdict-faux' };
  const reponse = (r) => ({
    vide: 'Non traité.',
    illisible: `Ta réponse, que l'appli n'a pas su lire : ${echapper(r.donnee)}. ${
      r.type === 'litteral' ? 'Vérifie l\'écriture : des nombres, des lettres, + − × et des parenthèses.' : 'Écris seulement le nombre.'}`,
  }[r.statut] ?? `Ta réponse : ${echapper(r.donnee)}`);
  const detail = t.resultats.map((r) => {
    // Une question que le sujet n'a plus — s'il a été corrigé depuis — se
    // relit avec ce que la tentative a gardé.
    const q = questions.find((x) => x.id === r.id);
    const sf = q?.revoir ? sfParId(q.revoir) : null;
    const corps = !q
      ? `<p class="${VERDICT[r.statut]}">${reponse(r)}</p>${r.attendu ? `<p class="correction">La réponse : <strong>${echapper(r.attendu)}</strong>.</p>` : ''}`
      : estEcrit(q)
        ? (r.statut === 'vide' ? `<p class="verdict-faux">Non traité.</p>${reference(q.type, q)}` : correctionEcrit(q, r))
        : `${rappelQuestion(q)}
           <p class="${VERDICT[r.statut]}">${reponse(r)}</p>
           ${r.statut === 'juste' ? '' : `<p class="correction">La réponse : <strong>${attenduAffiche(q, r)}</strong>.</p>`}
           ${r.remarque ? `<p class="aide">${echapper(r.remarque)}</p>` : ''}`;
    return `
      <details class="carte correction-question" ${r.statut === 'juste' ? '' : 'open'}>
        <summary><span>${r.id}. ${echapper(r.competence)}</span><span class="${VERDICT[r.statut]}">${enPoints(r.points)} / ${enPoints(r.sur)}</span></summary>
        ${corps}
        ${sf && r.statut !== 'juste' && vue.depuis !== 'parents' ? `<button class="secondaire" data-revoir-sf="${sf.id}">Revoir le cours : ${echapper(sf.titre)}</button>` : ''}
      </details>`;
  }).join('');

  return `
    <header class="entete-section">
      <button class="retour" data-action="${vue.depuis === 'parents' ? 'parents' : 'chapitres'}">← ${vue.depuis === 'parents' ? 'Suivi' : 'Tous les chapitres'}</button>
      <h1>${enPoints(t.note)} / ${t.sur}</h1>
      <p class="sous-titre">${echapper(ep.titre)} · le ${dateCourte(t.date)} · en ${Math.round(t.duree / 60000)} min${t.ramassee ? ' · copie ramassée à la fin du temps' : ''}${mentionPassage(t)}</p>
    </header>
    <section class="carte">
      <ul class="suivi">
        ${t.parties.map((p) => `<li><span>${p.id}. ${echapper(p.titre)}</span><span class="suivi-etat">${enPoints(p.points)} / ${enPoints(p.sur)}</span></li>`).join('')}
      </ul>
      ${auto ? `<p class="aide">Une partie des écrits a été corrigée par ${echapper(eleve().prenom)}, sur la grille, faute de Merlin.</p>` : ''}
    </section>
    <section class="carte bilan">
      <h2>${b.parMerlin ? '🎩 Le bilan de Merlin' : 'Le bilan'}</h2>
      ${liste('Ce qui va', b.pointsForts, 'bilan-ok')}
      ${liste('À revoir', b.aRevoir, 'bilan-ko')}
      ${liste('D\'ici l\'épreuve', b.conseils, 'bilan-conseil')}
      <p class="reponse-merlin">${echapper(b.message)}</p>
      <div class="boutons-ecrit">
        <button class="principal" data-action="partager-rapport">📤 Envoyer le rapport</button>
        ${vue.depuis === 'parents' ? '' : '<button class="secondaire" data-action="epreuve">Refaire l\'épreuve (même sujet)</button>'}
      </div>
      ${vue.partage === 'copie' ? '<p class="verdict-juste">Le rapport est copié : colle-le dans un message.</p>' : ''}
      ${vue.partage === 'echec' ? '<p class="aide">Copie le rapport ci-dessous à la main.</p>' : ''}
      <details class="rapport-texte" ${vue.partage === 'echec' ? 'open' : ''}>
        <summary>Le rapport en texte</summary>
        <pre>${echapper(rapportTexte(ep, t, eleve().prenom))}</pre>
      </details>
    </section>
    <h2 class="titre-serie">La correction, question par question</h2>
    ${detail}`;
}

/** Le rapport part par le partage du téléphone (message, courriel), ou est copié. */
async function partagerRapport() {
  const t = profil.epreuves[vue.tentative];
  const texte = rapportTexte(epreuveDe(t), t, eleve().prenom);
  try {
    if (navigator.share) {
      await navigator.share({ title: `${epreuveDe(t).titre} — ${eleve().prenom}`, text: texte });
      return;
    }
  } catch (e) {
    if (e?.name === 'AbortError') return;
  }
  try {
    await navigator.clipboard.writeText(texte);
    vue = { ...vue, partage: 'copie' };
  } catch {
    vue = { ...vue, partage: 'echec' };
  }
  rendre();
}

/** Pour l'écran de suivi : les épreuves passées, et les exercices d'« Entraîne-moi ». */
function suiviEpreuves() {
  const tentatives = (profil.epreuves ?? []).map((t, i) => ({ t, i }));
  const exos = profil.entrainement ?? [];
  const parPoint = Object.entries(exos.reduce((m, x) => {
    m[x.point] = m[x.point] ?? { faits: 0, justes: 0 };
    m[x.point].faits += 1;
    if (x.statut === 'juste') m[x.point].justes += 1;
    return m;
  }, {}));
  const derniere = tentatives.at(-1)?.t;
  return `
    <section class="carte">
      <h2>Épreuves blanches</h2>
      ${tentatives.length ? `
        <ul class="suivi">
          ${tentatives.map(({ t, i }) => `<li><button class="lien-tentative" data-voir-epreuve="${i}">${echapper(epreuveDe(t).titre)}, le ${dateCourte(t.date)}${t.passage > 1 ? ` (${t.passage}e passage)` : ''}</button>
            <span class="suivi-etat">${enPoints(t.note)} / ${t.sur}</span></li>`).join('')}
        </ul>
        ${derniere.bilan.aRevoir.length ? `<p class="consigne">À revoir, d'après la dernière :</p>
          <ul class="bilan-liste">${derniere.bilan.aRevoir.map((x) => `<li>${echapper(x)}</li>`).join('')}</ul>` : ''}
        <p class="note">Touchez une épreuve pour lire le rapport complet, la copie et l'envoyer.</p>`
        : '<p>Pas encore passée.</p>'}
    </section>
    <section class="carte">
      <h2>Entraîne-moi</h2>
      ${parPoint.length ? `
        <ul class="suivi">
          ${parPoint.map(([point, s]) => `<li><span>${echapper(point)}</span><span class="suivi-etat">${s.justes} juste${s.justes > 1 ? 's' : ''} sur ${s.faits}</span></li>`).join('')}
        </ul>` : '<p>Aucun exercice demandé à Merlin pour l\'instant.</p>'}
    </section>`;
}

// ── Entraîne-moi ────────────────────────────────────────────────────────────
//
// Evan choisit un point, ou le dit avec ses mots ; Merlin propose un exercice,
// l'appli le construit et le vérifie (entrainement.js), Evan répond, et la
// correction suit aussitôt — c'est un entraînement, pas une épreuve.

let ent = null;
const ETATS_ENT = { juste: 'Juste !', presque: 'Presque', faux: 'Pas encore' };

function ouvrirEntrainement() {
  ent = { etape: 'choisir', historique: [], statuts: [], niveau: 1 };
  vue = { ecran: 'entrainement', saisie: {} };
  rendre();
  window.scrollTo({ top: 0 });
}

function choisirPoint(point) {
  ent = { etape: 'attente', point, demande: point.demande, historique: [], statuts: [], niveau: 1 };
  demanderExercice();
}

async function demanderExercice(refus = null, essai = 0) {
  const jeton = {};
  ent = { ...ent, etape: 'attente', jeton, q: null, resultat: null, explication: null };
  vue = { ecran: 'entrainement', saisie: {} };
  rendre();
  const g = await merlin.proposerExercice({
    profil: merlin.profilPourIA(etatsTous(), profil.seance),
    message: messageGeneration({ demande: ent.demande, redaction: ent.point.redaction, niveau: ent.niveau, historique: ent.historique, refus }),
  });
  if (vue.ecran !== 'entrainement' || ent?.jeton !== jeton) return;
  const r = g ? construireExercice(g, ent.point) : { ok: false };
  if (r.ok) {
    ent = { ...ent, etape: 'question', q: r.question, message: r.message };
  } else if (r.horsSujet) {
    ent = { ...ent, etape: 'hors-sujet', message: r.horsSujet };
  } else if (g && essai < 2) {
    // Un exercice refusé par l'appli repart chez Merlin avec la raison du refus.
    return demanderExercice(r.raison, essai + 1);
  } else {
    ent = { ...ent, etape: 'panne' };
  }
  rendre();
  window.scrollTo({ top: 0 });
}

/** L'exercice en une ligne, pour que Merlin sache ce qui a déjà été fait. */
const resumeExercice = (q) => {
  if (q.type === 'exact') return `calcul ${calculDe(q).texte} (réponse attendue en ${q.forme})`;
  if (q.type === 'litteral') return `${q.consigne} ${enTexte(q.enonce)}`;
  if (q.type === 'solutions') return `résoudre ${enTexte(q.enonce)}`;
  return estEcrit(q) ? `rédaction : ${q.consigne} ${q.enonce}` : q.consigne;
};

function finirExercice(statut, detail) {
  const q = ent.q;
  const statuts = [...ent.statuts, statut];
  ent = {
    ...ent,
    etape: 'resultat',
    resultat: { statut, ...detail },
    explication: null,
    statuts,
    niveau: niveauSuivant(ent.niveau, statuts),
    historique: [...ent.historique, `${resumeExercice(q)} — ${ETATS_ENT[statut].toLowerCase()}${statut === 'juste' || !detail.donnee ? '' : ` (a répondu ${detail.donnee})`}`],
  };
  profil.entrainement = [...(profil.entrainement ?? []), { date: new Date().toISOString(), point: ent.point.titre, statut }].slice(-500);
  sauver();
  rendre();
  if (statut !== 'juste' && !estEcrit(q)) expliquerEntrainement();
}

async function validerEntrainement() {
  const q = ent.q;
  if (!estRepondue(q, vue.saisie)) return;
  if (!estEcrit(q)) {
    const n = noterQuestion(q, vue.saisie);
    if (n.statut === 'vide' || n.statut === 'illisible') { vue = { ...vue, illisible: true }; return rendre(); }
    return finirExercice(n.statut, { donnee: n.donnee, attendu: n.attendu, remarque: n.remarque });
  }
  const jeton = ent.jeton;
  const texte = vue.saisie.texte;
  ent = { ...ent, etape: 'lecture' };
  rendre();
  const r = await merlin.corrigerEcrit({ profil: merlin.profilPourIA(etatsTous(), profil.seance), nature: q.type, objet: q, texte });
  if (vue.ecran !== 'entrainement' || ent?.jeton !== jeton) return;
  if (!r.statuts) {
    ent = { ...ent, etape: 'question', panneLecture: true };
    return rendre();
  }
  const part = partEcrit(r.statuts, grilleDe(q.type, q));
  finirExercice(statutEcrit(part), { ...r, texte });
}

/** Après une erreur, Merlin explique — la réponse est déjà à l'écran. */
async function expliquerEntrainement() {
  const q = ent.q;
  const jeton = ent.jeton;
  ent = { ...ent, explication: 'attente' };
  rendre();
  const r = await merlin.expliquerErreur({
    profil: merlin.profilPourIA(etatsTous(), profil.seance),
    contexte: {
      savoirFaire: q.competence,
      consigne: ent.resultat.remarque ? `${q.consigne} (${ent.resultat.remarque})` : q.consigne,
      enonce: q.type === 'exact' ? calculDe(q).texte
        : q.type === 'litteral' || q.type === 'solutions' ? enTexte(q.enonce) : q.consigne,
      attendu: ent.resultat.attendu,
      donnee: ent.resultat.donnee,
      piege: null,
    },
    raisonnement: null,
  });
  if (vue.ecran !== 'entrainement' || ent?.jeton !== jeton) return;
  ent = { ...ent, explication: r.disponible ? r.donnees : null };
  rendre();
}

function vueEntrainement() {
  const entete = (retour) => `
    <header class="entete-section">
      <button class="retour" data-action="${retour}">← ${retour === 'chapitres' ? 'Tous les chapitres' : 'Changer de sujet'}</button>
      <h1>🎯 Entraîne-moi</h1>
      ${ent.point ? `<p class="sous-titre">${echapper(ent.point.titre)} · niveau ${ent.niveau} sur 3</p>` : ''}
    </header>`;

  if (!merlin.disponible()) {
    return `${entete('chapitres')}
      <section class="carte">
        <p>Ici, c'est Merlin qui invente les exercices : il a besoin de sa clé.</p>
        <p class="aide">Demande à un adulte de la renseigner : 👪 Suivi, puis « Merlin et clé d'API ».</p>
      </section>`;
  }

  if (ent.etape === 'choisir') {
    return `${entete('chapitres')}
      <section class="carte">
        <p>Choisis un point, et Merlin te propose des exercices, un par un : un peu plus durs quand tu réussis, plus simples quand tu bloques. Chaque réponse est vérifiée par l'appli.</p>
        <div class="champ">
          <label for="c-demande">Ou dis-lui ce que tu veux travailler</label>
          <div class="champ-saisie">
            <input id="c-demande" data-champ="demande" type="text" autocomplete="off"
              placeholder="Ex. : les papillons avec des virgules" value="${echapper(vue.saisie?.demande ?? '')}">
          </div>
        </div>
        <button class="principal" data-action="demande-libre">Demander à Merlin</button>
      </section>
      ${POINTS.map((g) => `
        <h2 class="titre-serie">${echapper(g.groupe)}</h2>
        <div class="points-entrainement">
          ${g.points.map((p) => `<button class="option option-douce" data-point="${p.id}">${p.redaction ? '✍️ ' : ''}${echapper(p.titre)}</button>`).join('')}
        </div>`).join('')}`;
  }

  if (ent.etape === 'attente' || ent.etape === 'lecture') {
    return `${entete('changer-sujet')}
      <section class="carte">
        <p class="reflexion">${ent.etape === 'attente' ? 'Merlin prépare un exercice' : 'Merlin lit ta rédaction'}<span class="points"><span>.</span><span>.</span><span>.</span></span></p>
      </section>`;
  }

  if (ent.etape === 'hors-sujet' || ent.etape === 'panne') {
    return `${entete('changer-sujet')}
      <section class="carte">
        <p class="reponse-merlin">${echapper(ent.etape === 'panne'
          ? 'Merlin n\'a pas réussi à préparer un exercice juste. Réessaie, ou choisis un autre point.'
          : ent.message)}</p>
        <div class="boutons-ecrit">
          <button class="secondaire" data-action="changer-sujet">Choisir un point</button>
          ${ent.etape === 'panne' ? '<button class="principal" data-action="exercice-suivant">Réessayer</button>' : ''}
        </div>
      </section>`;
  }

  const q = ent.q;
  if (ent.etape === 'question') {
    return `${entete('changer-sujet')}
      <section class="carte ${estEcrit(q) ? 'carte-ecrit' : ''}">
        ${ent.message ? `<p class="reponse-merlin">${echapper(ent.message)}</p>` : ''}
        ${zoneQuestion(q)}
        ${vue.illisible ? `<p class="verdict-faux">${{
          litteral: MESSAGE_ILLISIBLE,
          solutions: 'Je n&rsquo;arrive pas à lire une des solutions : un nombre, ou une fraction avec la barre /.',
        }[q.type] ?? 'Je n&rsquo;arrive pas à lire ta réponse : un nombre, avec une virgule si besoin.'}</p>` : ''}
        ${ent.panneLecture ? '<p class="verdict-faux">Merlin n\'a pas pu lire ta rédaction. Réessaie.</p>' : ''}
        <button class="principal" data-action="valider-entrainement">${estEcrit(q) ? '🎩 Faire corriger par Merlin' : 'Valider'}</button>
      </section>`;
  }

  // Le résultat.
  const r = ent.resultat;
  const ex = ent.explication;
  const classe = { juste: 'juste', presque: 'presque', faux: 'a-reprendre' }[r.statut];
  return `${entete('changer-sujet')}
    <section class="carte ${estEcrit(q) ? 'carte-ecrit' : ''}">
      <p class="verdict-ecrit verdict-ecrit--${classe}">${ETATS_ENT[r.statut]}</p>
      ${estEcrit(q)
        ? correctionEcrit(q, r)
        : `${rappelQuestion(q)}
           <p>Ta réponse : ${echapper(r.donnee)}</p>
           ${r.statut === 'juste' ? '' : `<p class="correction">La réponse : <strong>${attenduAffiche(q, r)}</strong>.</p>`}
           ${r.remarque ? `<p class="aide">${echapper(r.remarque)}</p>` : ''}
           ${ex === 'attente' ? '<p class="reflexion">Merlin regarde ton erreur<span class="points"><span>.</span><span>.</span><span>.</span></span></p>' : ''}
           ${ex && ex !== 'attente' ? `<div class="reponse-merlin"><p>${echapper(ex.explication)}</p><p><strong>Le geste —</strong> ${echapper(ex.geste)}</p></div>` : ''}`}
      <div class="boutons-ecrit">
        <button class="secondaire" data-action="changer-sujet">Changer de sujet</button>
        <button class="principal" data-action="exercice-suivant">Exercice suivant</button>
      </div>
    </section>`;
}

function carteEntrainement() {
  const n = (profil.entrainement ?? []).length;
  return `
    <button class="sf sf-serie" data-action="entrainement">
      <span class="sf-numero">🎯</span>
      <span class="sf-corps">
        <span class="sf-titre">Entraîne-moi, avec Merlin</span>
        <span class="sf-detail">${n ? `${pluriel(n, 'exercice')} ${n > 1 ? 'faits' : 'fait'} · ` : ''}choisis un point, Merlin invente les exercices</span>
      </span>
    </button>`;
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
  else if (vue.ecran === 'serie') app.innerHTML = vueSerie();
  else if (vue.ecran === 'serie-bilan') app.innerHTML = vueSerieBilan();
  else if (vue.ecran === 'epreuve-accueil') app.innerHTML = vueEpreuveAccueil();
  else if (vue.ecran === 'epreuve') app.innerHTML = vueEpreuve();
  else if (vue.ecran === 'epreuve-correction') app.innerHTML = vueEpreuveCorrection();
  else if (vue.ecran === 'epreuve-bilan') app.innerHTML = vueEpreuveBilan();
  else if (vue.ecran === 'entrainement') app.innerHTML = vueEntrainement();
  else app.innerHTML = vueSection();
  const premier = app.querySelector('input:not([readonly])');
  // Pas de clavier qui surgit sur un écran où l'on choisit avant d'écrire.
  const sansFocus = vue.ecran === 'reglages' || (vue.ecran === 'entrainement' && ent?.etape === 'choisir');
  if (premier && !sansFocus) premier.focus();
  ajusterFormules();
}

/**
 * Une expression plus large que son cadre — un long calcul littéral sur un
 * téléphone — rétrécit jusqu'à tenir : une fin coupée, Evan réduirait une
 * autre expression que celle de l'énoncé. Sous 15 px, elle défile.
 */
function ajusterFormules() {
  for (const bloc of app.querySelectorAll('.maths-bloc')) {
    bloc.style.fontSize = '';
    if (bloc.scrollWidth <= bloc.clientWidth) continue;
    const taille = parseFloat(getComputedStyle(bloc).fontSize);
    bloc.style.fontSize = `${Math.max(15, Math.floor((taille * bloc.clientWidth) / bloc.scrollWidth))}px`;
  }
}

function vueInstallation() {
  return `
    <header class="entete">
      <p class="surtitre">Mathématiques · 3<sup>e</sup></p>
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

    ${suiviEpreuves()}

    ${suiviEcrit()}

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
          <p class="surtitre">Mathématiques · 3<sup>e</sup></p>
          <h1>Les chapitres</h1>
        </div>
        <button class="lien-merlin" data-action="parents"><span aria-hidden="true">👪</span> Suivi</button>
      </div>
      <p class="sous-titre">Salut ${echapper(eleve().prenom)} ${eleve().avatar}</p>
    </header>
    ${carteSerie()}
    <div class="sommaire sommaire-serie">${carteEpreuve()}${carteEntrainement()}</div>
    <div class="sommaire">${cartes}</div>
    <p class="note">Les chapitres arrivent ici au fur et à mesure que tu les vois en
      classe : le numéro dit l'ordre où ils ont été ajoutés, pas une progression.
      Va directement à celui que tu viens de travailler, ou à celui que tu sais fragile.</p>`;
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
    ${blocParCoeur()}
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
    aSavoir: (s) => vueEcrit(s, 'enonce'),
    redactions: (s) => vueEcrit(s, 'redaction'),
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

// ── Par cœur, Rédiger : écrire, puis se faire corriger ─────────────────────
//
// Les deux sections partagent un écran : une consigne, parfois une figure, une
// zone où l'élève écrit, puis la correction — par Merlin s'il est là, par
// l'élève lui-même sinon, avec la même grille (voir ecrit.js).
//
// Le collage est refusé : c'est un exercice de mémoire et de rédaction, pas de
// recopie. L'énoncé du cours et la rédaction modèle n'apparaissent qu'APRÈS
// que l'élève a écrit.
//
// Un énoncé compte comme réussi s'il est juste SANS indice : c'est ce qui le
// fait avancer dans la répétition espacée, et il n'est « su » qu'après trois
// réussites sur deux séances, comme un piège.

const VERDICTS = {
  enonce: { juste: 'Su !', presque: 'Presque', 'a-reprendre': 'À revoir' },
  redaction: { juste: 'Rédaction réussie', presque: 'Presque', 'a-reprendre': 'À reprendre' },
};
const ICONES = { present: '✓', absent: '○', faux: '✗' };
const natureDe = (section) => (section === 'aSavoir' ? 'enonce' : 'redaction');

/** Où en est un énoncé à savoir : jamais écrit, en cours, à revoir, su. */
function etiquetteParCoeur(id) {
  const etat = profil.parCoeur?.[id];
  if (!etat) return { texte: 'À écrire', classe: '' };
  if (estAcquis(etat)) return { texte: 'Su', classe: 'est-acquis' };
  if (estARevoir(etat, profil.seance)) return { texte: 'À revoir', classe: 'a-revoir' };
  return { texte: 'En cours', classe: 'en-cours' };
}

const tousLesEnonces = () => CHAPITRE.savoirFaire
  .flatMap((sf) => (sf.aSavoir ?? []).map((a, i) => ({ sf, a, i })));

/**
 * Où en est la série d'écrits. Ouvert depuis la liste « À savoir par cœur »
 * du chapitre, on enchaîne les énoncés de tout le chapitre ; sinon, ceux de
 * la section ouverte.
 */
function positionEcrit() {
  const serie = vue.depuisParCoeur
    ? tousLesEnonces().map(({ sf, i }) => ({ sfId: sf.id, index: i }))
    : sfCourant()[vue.section].map((_, i) => ({ sfId: vue.sfId, index: i }));
  const rang = serie.findIndex((p) => p.sfId === vue.sfId && p.index === vue.index);
  return { rang, total: serie.length, suivant: serie[rang + 1] ?? null };
}

function blocParCoeur() {
  const tous = tousLesEnonces();
  if (!tous.length) return '';
  const sus = tous.filter(({ a }) => etiquetteParCoeur(a.id).texte === 'Su').length;
  const aRevoir = tous.filter(({ a }) => etiquetteParCoeur(a.id).texte === 'À revoir').length;
  return `
    <section class="carte par-coeur">
      <h2>📜 À savoir par cœur</h2>
      <p class="note">${sus} sur ${tous.length} ${sus > 1 ? 'sus' : 'su'}${aRevoir ? ` · ${aRevoir} à revoir` : ''}.
        Écris-les de mémoire${merlin.disponible() ? ' : Merlin vérifie.' : ', puis compare avec ton cours.'}</p>
      <ul class="liste-par-coeur">
        ${tous.map(({ sf, a, i }) => {
          const e = etiquetteParCoeur(a.id);
          return `<li><button class="ligne-par-coeur" data-par-coeur="${sf.id}|${i}">
            <span>${echapper(a.titre)}</span><span class="sf-etat ${e.classe}">${e.texte}</span></button></li>`;
        }).join('')}
      </ul>
    </section>`;
}

/**
 * Pour les parents : les énoncés et les rédactions de TOUS les chapitres, pas
 * seulement du dernier ouvert — les formules du calcul littéral doivent s'y
 * voir même si Evan travaillait Thalès en dernier.
 */
function suiviEcrit() {
  const enonces = CHAPITRES.flatMap((ch) => ch.savoirFaire.flatMap((sf) => (sf.aSavoir ?? []).map((a) => ({ ch, a }))));
  const redactions = CHAPITRES.flatMap((ch) => ch.savoirFaire.flatMap((sf) => (sf.redactions ?? []).map((red) => ({ ch, red }))));
  if (!enonces.length && !redactions.length) return '';
  const fois = (n) => `${n} fois`;
  const chapitre = (ch, i, liste) => (i === 0 || liste[i - 1].ch !== ch
    ? `<li class="suivi-chapitre"><span>Chapitre ${ch.numero} — ${echapper(ch.titre)}</span></li>` : '');
  return `
    <section class="carte">
      <h2>Par cœur</h2>
      <p class="note">Les énoncés du cours, écrits de mémoire. « Su » veut dire trois fois juste,
        sans indice, sur au moins deux séances.</p>
      <ul class="suivi">
        ${enonces.map(({ ch, a }, i) => {
          const etat = profil.parCoeur?.[a.id];
          const detail = etat
            ? `${etiquetteParCoeur(a.id).texte.toLowerCase()} — juste ${fois(etat.reussites)} sur ${etat.reussites + etat.echecs}`
            : 'jamais écrit';
          return `${chapitre(ch, i, enonces)}<li><span>${echapper(a.titre)}</span><span class="suivi-etat">${detail}</span></li>`;
        }).join('')}
      </ul>
      ${redactions.length ? `
        <h2>Rédactions</h2>
        <ul class="suivi">
          ${redactions.map(({ ch, red }, i) => {
            const st = profil.redactions?.[red.id];
            const essais = st ? `${st.essais} essai${st.essais > 1 ? 's' : ''}` : '';
            const detail = !st ? 'pas encore rédigée'
              : st.reussie ? `réussie (${essais})` : `${VERDICTS.redaction[st.dernier].toLowerCase()} (${essais})`;
            return `${chapitre(ch, i, redactions)}<li><span>${echapper(red.titre)}</span><span class="suivi-etat">${detail}</span></li>`;
          }).join('')}
        </ul>` : ''}
    </section>`;
}

/** L'énoncé du cours, ou la rédaction modèle : ce qu'on montre après coup. */
const reference = (nature, objet) => (nature === 'enonce'
  ? `<div class="reference-ecrit"><p class="bloc-type">Dans ton cours</p>${paragraphes(objet.enonce)}</div>`
  : `<div class="reference-ecrit"><p class="bloc-type">La rédaction modèle</p>
      <ol class="modele-ecrit">${objet.modele.map((l) => `<li>${echapper(l)}</li>`).join('')}</ol></div>`);

function vueEcrit(sf, nature) {
  const liste = sf[nature === 'enonce' ? 'aSavoir' : 'redactions'];
  const objet = liste[vue.index];
  const e = vue.ecrit ?? {};
  const grille = grilleDe(nature, objet);
  const { rang, total, suivant } = positionEcrit();
  const entete = `
    <p class="progression">${nature === 'enonce' ? 'Par cœur' : 'Rédiger'} · ${rang + 1} / ${total}</p>
    <h2>${echapper(objet.titre)}</h2>`;
  const copie = `<p class="bloc-type">Ce que tu as écrit</p><blockquote class="copie-eleve">${echapper(e.texte ?? '')}</blockquote>`;

  if (e.etape === 'auto') {
    return `
      <section class="carte carte-ecrit">
        ${entete}
        ${e.panne ? '<p class="note">Merlin n\'a pas pu lire ta réponse : corrige-toi avec ton cours.</p>' : ''}
        ${copie}
        ${reference(nature, objet)}
        <p class="consigne">Coche ce que tu avais écrit, et juste :</p>
        <div class="grille-auto">
          ${grille.map((g) => `<label class="coche"><input type="checkbox" data-coche="${g.id}">
            <span>${echapper(g.texte)}${g.obligatoire === false ? ' <em>(facultatif)</em>' : ''}</span></label>`).join('')}
        </div>
        <button class="principal" data-action="valider-auto">Valider ma correction</button>
      </section>`;
  }

  if (e.etape === 'resultat') {
    const ev = e.evaluation;
    return `
      <section class="carte carte-ecrit">
        ${entete}
        <p class="verdict-ecrit verdict-ecrit--${ev.verdict}">${VERDICTS[nature][ev.verdict]}${
          e.indice && nature === 'enonce' && ev.verdict === 'juste' ? ' — avec un indice : réécris-le sans, la prochaine fois' : ''}</p>
        ${ev.message ? `<p class="reponse-merlin">${echapper(ev.message)}</p>` : ''}
        <ul class="grille-ecrit">
          ${grille.map((g) => {
            const statut = ev.statuts[g.id];
            const note = ev.commentaires[g.id];
            return `<li class="critere critere--${statut}"><span class="critere-icone" aria-hidden="true">${ICONES[statut]}</span>
              <span><span class="critere-texte">${echapper(g.texte)}</span>${note ? `<span class="critere-note">${echapper(note)}</span>` : ''}</span></li>`;
          }).join('')}
        </ul>
        ${copie}
        ${reference(nature, objet)}
        <div class="boutons-ecrit">
          <button class="secondaire" data-action="recommencer-ecrit">Recommencer</button>
          <button class="principal" data-action="ecrit-suivant">${
            suivant ? 'Suivant' : vue.depuisParCoeur ? 'Retour au chapitre' : 'Continuer'}</button>
        </div>
      </section>`;
  }

  const attente = e.etape === 'attente';
  const avecMerlin = merlin.disponible();
  return `
    <section class="carte carte-ecrit">
      ${entete}
      ${nature === 'redaction' ? `<p class="enonce-ecrit">${echapper(objet.enonce)}</p>` : ''}
      ${figure(objet.figure)}
      <p class="consigne">${echapper(objet.consigne)}</p>
      ${e.indice ? `<p class="indice-ecrit"><strong>Indice —</strong> ${echapper(objet.indice)}</p>` : ''}
      <textarea class="zone-ecrit" data-ecrit rows="${nature === 'enonce' ? 5 : 10}" ${attente ? 'readonly' : ''}
        autocomplete="off" autocapitalize="sentences" spellcheck="false"
        aria-label="${nature === 'enonce' ? 'Ton énoncé, écrit de mémoire' : 'Ta rédaction'}"
        placeholder="${nature === 'enonce' ? 'Écris-le de mémoire, sans regarder ton cours…' : 'Rédige comme dans ton cours : On sait que…'}">${echapper(e.texte ?? '')}</textarea>
      <p class="alerte-collage" data-alerte-collage hidden>Le copier-coller est désactivé : écris-le toi-même,
        c'est en l'écrivant qu'on le retient.</p>
      ${attente
        ? '<p class="reflexion">Merlin lit ce que tu as écrit<span class="points"><span>.</span><span>.</span><span>.</span></span></p>'
        : `<button class="principal" data-action="${avecMerlin ? 'verifier-ecrit' : 'comparer-ecrit'}">
             ${avecMerlin ? '🎩 Faire vérifier par Merlin' : 'Comparer avec mon cours'}</button>
           ${objet.indice && !e.indice ? '<button class="secondaire" data-action="indice-ecrit">Un indice</button>' : ''}`}
    </section>`;
}

/** Enregistre le résultat d'un écrit, puis affiche la correction. */
function terminerEcrit(nature, objet, evaluation) {
  if (nature === 'enonce') {
    profil.parCoeur = profil.parCoeur ?? {};
    const reussi = evaluation.verdict === 'juste' && !vue.ecrit?.indice;
    profil.parCoeur[objet.id] = apresReponse(profil.parCoeur[objet.id] ?? etatInitial(), reussi, profil.seance, 1);
  } else {
    profil.redactions = profil.redactions ?? {};
    const avant = profil.redactions[objet.id] ?? { essais: 0, reussie: false };
    profil.redactions[objet.id] = {
      essais: avant.essais + 1,
      dernier: evaluation.verdict,
      reussie: avant.reussie || evaluation.verdict === 'juste',
    };
  }
  sauver();
  vue = { ...vue, ecrit: { ...vue.ecrit, etape: 'resultat', evaluation } };
  rendre();
}

async function faireCorriger() {
  const sf = sfCourant();
  const nature = natureDe(vue.section);
  const objet = sf[vue.section][vue.index];
  const texte = vue.ecrit?.texte ?? '';
  if (!texte.trim()) return;
  vue = { ...vue, ecrit: { ...vue.ecrit, etape: 'attente' } };
  const attente = vue.ecrit;
  rendre();

  const etats = CHAPITRE.savoirFaire.map((s) => ({ nom: s.titre, etat: etatSf(s.id) }));
  const r = await merlin.corrigerEcrit({ profil: merlin.profilPourIA(etats, profil.seance), nature, objet, texte });
  // L'élève a pu changer d'écran pendant que Merlin lisait, ou même quitter
  // puis rouvrir ce même énoncé : tout changement d'écran remplace cet état.
  if (vue.ecrit !== attente) return;
  if (r.vide) {
    vue = { ...vue, ecrit: { ...vue.ecrit, etape: 'ecrire' } };
    return rendre();
  }
  if (r.aCorrigerSoiMeme) {
    vue = { ...vue, ecrit: { ...vue.ecrit, etape: 'auto', panne: true } };
    return rendre();
  }
  return terminerEcrit(nature, objet, r);
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
  const trace = graphique(d.graphique) + figure(d.figure) + programme(d.programme);
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

/** Un bloc du cours : au cours lui-même, et en rappel sous une erreur de la série. */
const blocCours = (b) => `
    <div class="bloc bloc-${b.type}">
      <p class="bloc-type">${{ definition: 'Définition', propriete: 'Propriété', theoreme: 'Théorème', remarque: 'Remarque', exemple: 'Exemple' }[b.type]}${b.titre ? ` — ${echapper(b.titre)}` : ''}</p>
      ${figure(b.figure)}
      ${b.type === 'exemple' ? `<p class="bloc-exemple">${echapper(b.texte)}</p>` : paragraphes(b.texte)}
    </div>`;

function vueCours(sf) {
  const blocs = sf.cours.map(blocCours).join('');
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
      ${figure(m.figure)}
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
  return graphique(ex.graphique) + figure(ex.figure) + programme(ex.programme) + (prose
    ? `<p class="enonce enonce-long">${mathsOuTexte(t)}</p>`
    : mathsBloc(t));
}

function vueExercice(sf) {
  const lot = sf[vue.section];
  const ex = lot[vue.index];
  const progression = `<p class="progression">${vue.index + 1} / ${lot.length}</p>`;

  if (vue.retour) return vueRetour(sf, ex, progression);

  return `
    <section class="carte">
      ${progression}
      <p class="consigne">${echapper(ex.consigne ?? sf.titre)}</p>
      ${saisieExercice(ex)}
    </section>`;
}

/** La zone de réponse d'un exercice, selon son type : aux exercices comme à la série. */
function saisieExercice(ex) {
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
    saisie = `${graphique(ex.graphique)}${figure(ex.figure)}${programme(ex.programme)}<p class="affirmation">« ${echapper(ex.affirmation)} »</p>
      <div class="choix">
        <button class="option" data-choix="oui">Vrai</button>
        <button class="option" data-choix="non">Faux</button>
      </div>`;
  } else if (ex.type === 'corriger') {
    // Une démonstration à corriger se lit avec sa figure sous les yeux.
    saisie = `${figure(ex.figure)}
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
  } else if (ex.type === 'choix') {
    // Un QCM dont les options appartiennent à l'exercice : le nom d'un
    // théorème, un sommet homologue, une conclusion. Les réponses fausses
    // proposées sont les erreurs PRÉVUES, chacune reliée à son piège : le choix
    // de l'élève dit quelle confusion a joué.
    saisie = `${enonceExercice(ex)}
      <div class="choix vertical">
        ${ex.choix.map((c, i) => `<button class="option" data-choix="${i}">${echapper(c)}</button>`).join('')}
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
  } else if (ex.type === 'litteral') {
    // L'énoncé affiché est celui que litteral.js a lu, réécrit : ce qui est
    // montré est forcément ce qui est corrigé.
    saisie = `${mathsBloc(`${ex.nom ? `${ex.nom} = ` : ''}${afficher(ex.enonce) ?? ex.enonce}`)}
      ${champExpression()}
      ${vue.illisible ? `<p class="verdict-faux">${MESSAGE_ILLISIBLE}</p>` : ''}
      <p class="aide">${aideExpression(ex.forme)}</p>
      <button class="principal" data-action="valider">Valider</button>`;
  } else if (ex.type === 'solutions') {
    saisie = `${mathsBloc(afficherEquation(ex.enonce) ?? ex.enonce)}
      ${champsSolutions(ex)}
      ${vue.illisible ? '<p class="verdict-faux">Je n&rsquo;arrive pas à lire une des solutions : un nombre, ou une fraction avec la barre /.</p>' : ''}
      <button class="principal" data-action="valider">Valider</button>`;
  }
  return saisie;
}

const MESSAGE_ILLISIBLE = 'Je n&rsquo;arrive pas à lire cette écriture. Utilise des nombres, des lettres, + − × et des parenthèses.';

/** Le champ où l'on écrit une expression : MathLive, avec son clavier sur téléphone. */
const champExpression = () => `<math-field data-expression data-champ="expr" class="champ-maths"
  math-virtual-keyboard-policy="onfocus">${echapper(vue.saisie?.expr ?? '')}</math-field>`;

// De la syntaxe seulement, avec une lettre qu'aucun exercice n'emploie : un
// exemple de réponse sous le champ en donnerait une (voir questions.js).
const aideExpression = () => echapper(AIDE_EXPRESSION);

/** Les deux cases des solutions d'un produit nul, avec la lettre de l'équation. */
function champsSolutions(ex) {
  let lettre = 'x';
  try { lettre = facteursLineaires(equationDe(ex.enonce))[0]?.lettre ?? 'x'; } catch { /* x par défaut */ }
  const champ = (id, etiquette) => `
    <div class="champ">
      <label for="c-${id}">${etiquette}</label>
      <div class="champ-saisie">
        <button type="button" class="signe" data-signe="${id}" aria-label="Changer le signe">±</button>
        <input id="c-${id}" data-champ="${id}" value="${echapper(vue.saisie?.[id] ?? '')}"
               type="text" inputmode="text" autocomplete="off" spellcheck="false">
      </div>
    </div>`;
  return `<div class="champs-ligne">${champ('x1', `${lettre} =`)}${champ('x2', `ou ${lettre} =`)}</div>
    <p class="aide">${echapper(AIDE_SOLUTIONS)}</p>`;
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
        attendu: attenduLisible(ex),
        donnee: donneeLisible(ex, vue.saisie),
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
  if (ex.type === 'choix') return `<strong>${echapper(ex.attendu)}</strong>`;
  if (ex.type === 'expression') return `<strong>${echapper(ex.attendu)}</strong>`;
  if (ex.type === 'facteurs') return `<strong>${ex.attendu.join(' × ')}</strong>`;
  if (ex.type === 'fraction') return `<strong>${nombre(ex.attendu[0])}/${nombre(ex.attendu[1])}</strong>`;
  if (ex.type === 'litteral') return `<strong>${maths(afficher(ex.attendu) ?? ex.attendu)}</strong>`;
  if (ex.type === 'solutions') return `<strong>${echapper(texteSolutions(equationDe(ex.enonce)))}</strong>`;
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
      ${graphique(pb.graphique)}${figure(pb.figure)}${programme(pb.programme)}
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
  // À l'épreuve, chaque chiffre tapé est aussitôt sur la copie.
  if (ou === 'saisie') garderReponse();
};

/** Après une auto-correction d'épreuve : l'écrit suivant, ou la note. */
function suiteAutoEpreuve() {
  const k = profil.correctionEnCours;
  const restants = ecritsACorriger(sujetCorrection(), k.reponses).filter((q) => !k.corrections[q.id]);
  if (!restants.length) return terminerEpreuve().catch(secours);
  vue = { ...vue, qid: restants[0].id };
  rendre();
  window.scrollTo({ top: 0 });
}

app.addEventListener('click', (e) => {
  const c = e.target.closest('[data-action], [data-par-coeur], [data-chapitre], [data-ouvrir], [data-section], [data-choix], [data-raison], [data-signe], [data-signe-ce], [data-avatar], [data-fournisseur], [data-sujet], [data-supprimer], [data-revoir-sf], [data-rep-choix], [data-aller], [data-voir-epreuve], [data-point]');
  if (!c) return;

  if (c.dataset.repChoix != null) {
    vue = { ...vue, saisie: { a: Number(c.dataset.repChoix) } };
    garderReponse();
    return rendre();
  }
  if (c.dataset.aller != null) return allerQuestion(Number(c.dataset.aller));
  if (c.dataset.voirEpreuve != null) {
    vue = { ecran: 'epreuve-bilan', tentative: Number(c.dataset.voirEpreuve), depuis: vue.ecran === 'parents' ? 'parents' : 'chapitres', deverrouille: vue.deverrouille };
    rendre();
    return window.scrollTo({ top: 0 });
  }
  if (c.dataset.point) return choisirPoint(pointParId(c.dataset.point));

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
  if (c.dataset.revoirSf) {
    // De la copie de la série au cours du savoir-faire raté.
    CHAPITRE = chapitreParNumero(sfParId(c.dataset.revoirSf).chapitre);
    return ouvrir(c.dataset.revoirSf, 'cours');
  }
  if (c.dataset.parCoeur) {
    const [sfId, i] = c.dataset.parCoeur.split('|');
    ouvrir(sfId, 'aSavoir');
    vue = { ...vue, index: Number(i), depuisParCoeur: true };
    return rendre();
  }
  if (c.dataset.section) return ouvrir(vue.sfId, c.dataset.section);

  if (c.dataset.choix != null) {
    const brut = c.dataset.choix;
    const valeur = brut === 'oui' ? true : brut === 'non' ? false : /^\d+$/.test(brut) ? Number(brut) : brut;
    return vue.ecran === 'serie' ? repondreSerie({ a: valeur }) : corriger({ a: valeur });
  }

  if (c.dataset.raison != null) {
    vue = { ...vue, etape: 'raison', raison: Number(c.dataset.raison), merlin: null };
    rendre();
    return demanderAMerlin();
  }

  switch (c.dataset.action) {
    case 'epreuve':
      if (copieEnCours()) return commencerEpreuve();
      vue = { ecran: 'epreuve-accueil' };
      rendre();
      return window.scrollTo({ top: 0 });
    case 'commencer-epreuve': return commencerEpreuve();
    case 'question-precedente': return allerQuestion(copieEnCours().index - 1);
    case 'question-suivante': return allerQuestion(copieEnCours().index + 1);
    case 'confirmer-rendre':
      vue = { ...vue, confirmer: true };
      rendre();
      return app.querySelector('[data-action="rendre-copie"]')?.scrollIntoView({ block: 'center' });
    case 'annuler-rendre': vue = { ...vue, confirmer: false }; return rendre();
    case 'rendre-copie': return rendreCopie();
    case 'valider-auto-epreuve': {
      const q = questionsDe(sujetCorrection()).find((x) => x.id === vue.qid);
      const cochees = [...app.querySelectorAll('[data-coche]')].filter((x) => x.checked).map((x) => x.dataset.coche);
      profil.correctionEnCours.corrections[q.id] = { ...autoCorrection(cochees, grilleDe(q.type, q)), parMerlin: false };
      sauver();
      return suiteAutoEpreuve();
    }
    case 'partager-rapport': return partagerRapport();
    case 'entrainement': return ouvrirEntrainement();
    case 'demande-libre': {
      const d = String(vue.saisie?.demande ?? '').trim();
      if (!d) return;
      return choisirPoint({ id: 'libre', titre: d.length > 50 ? `${d.slice(0, 50)}…` : d, demande: d });
    }
    case 'changer-sujet':
      ent = { ...ent, etape: 'choisir', jeton: null, point: null };
      vue = { ecran: 'entrainement', saisie: {} };
      rendre();
      return window.scrollTo({ top: 0 });
    case 'exercice-suivant': return demanderExercice();
    case 'valider-entrainement': return validerEntrainement();
    case 'sommaire': vue = { ecran: 'sommaire' }; return rendre();
    case 'chapitres': vue = { ecran: 'chapitres' }; return rendre();
    case 'serie': return commencerSerie();
    case 'passer-serie': return repondreSerie({}, { passe: true });
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
      return vue.ecran === 'serie' ? repondreSerie(vue.saisie ?? {}) : corriger(vue.saisie ?? {});
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
    case 'verifier-ecrit': return faireCorriger();
    case 'comparer-ecrit':
      if (!(vue.ecrit?.texte ?? '').trim()) return;
      vue = { ...vue, ecrit: { ...vue.ecrit, etape: 'auto' } };
      return rendre();
    case 'valider-auto': {
      const nature = natureDe(vue.section);
      const objet = sfCourant()[vue.section][vue.index];
      const cochees = [...app.querySelectorAll('[data-coche]')].filter((x) => x.checked).map((x) => x.dataset.coche);
      return terminerEcrit(nature, objet, autoCorrection(cochees, grilleDe(nature, objet)));
    }
    case 'indice-ecrit': vue = { ...vue, ecrit: { ...vue.ecrit, indice: true } }; return rendre();
    case 'recommencer-ecrit': vue = { ...vue, ecrit: {} }; return rendre();
    case 'ecrit-suivant': {
      const { suivant } = positionEcrit();
      const { depuisParCoeur, section } = vue;
      if (suivant) {
        if (suivant.sfId !== vue.sfId) ouvrir(suivant.sfId, section);
        vue = { ...vue, index: suivant.index, ecrit: {}, depuisParCoeur };
        return rendre();
      }
      // La série des énoncés du chapitre, écrite jusqu'au bout, vaut une séance.
      return depuisParCoeur ? finirSeance() : sectionSuivante();
    }
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

// Écrire de mémoire : le collage est refusé, sous toutes ses formes. Ce qui
// passerait à côté — une suggestion du presse-papiers d'un clavier de
// téléphone — se voit à la taille du bloc arrivé d'un coup (voir ecrit.js).
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
  const t = e.target;
  if (t.hasAttribute('data-ecrit')) {
    // À l'épreuve et à l'entraînement, l'écrit est une réponse comme une autre.
    const dansSaisie = vue.ecran === 'epreuve' || vue.ecran === 'entrainement';
    const avant = (dansSaisie ? vue.saisie?.texte : vue.ecrit?.texte) ?? '';
    // Annuler (Ctrl+Z) ramène d'un coup ce qu'il avait tapé lui-même : le
    // collage étant refusé plus haut, l'historique ne contient rien d'autre.
    if (!e.inputType?.startsWith('history') && saisieSuspecte(avant, t.value)) {
      t.value = avant;
      signalerCollage();
      return;
    }
    if (dansSaisie) {
      vue.saisie = { ...(vue.saisie ?? {}), texte: t.value };
      garderReponse();
    } else {
      vue.ecrit = { ...(vue.ecrit ?? {}), texte: t.value };
    }
  }
  if (t.dataset.champ) majSaisie('saisie', t.dataset.champ, t.value);
  if (t.dataset.champ && vue.ecran === 'epreuve') signalerIllisible(t);
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
  // À l'épreuve et à l'entraînement, Entrée passe d'abord au champ suivant de
  // la même question : le dénominateur après le numérateur, LM après IM.
  if (vue.ecran === 'epreuve' || vue.ecran === 'entrainement') {
    const champs = [...app.querySelectorAll('[data-champ]')];
    const suivant = champs[champs.indexOf(e.target) + 1];
    if (suivant) { suivant.focus(); return; }
  }
  const bouton = app.querySelector('.principal');
  if (bouton) bouton.click();
});

// Deux onglets ouverts sur l'appli : celui qui écrit en dernier ne doit pas
// effacer ce que l'autre vient d'enregistrer — une copie, un résultat.
window.addEventListener('storage', (e) => {
  if (e.key === CLE) profil = charger() ?? profil;
});

// Les largeurs changent quand le téléphone tourne, et quand les polices des
// formules arrivent après le premier affichage.
window.addEventListener('resize', ajusterFormules);
document.fonts?.ready.then(ajusterFormules);

// Une épreuve commencée reprend là où elle en était : le temps, lui, a couru.
// Une copie rendue dont la correction a été interrompue reprend sa correction.
function demarrer() {
  if (estInstalle() && profil.correctionEnCours) return corrigerEcritsEpreuve();
  if (estInstalle() && copieEnCours()) {
    return restant(copieEnCours().debut, sujetEnCours().duree, Date.now()) <= 0
      ? rendreCopie({ ramassee: true })
      : commencerEpreuve();
  }
  return rendre();
}
Promise.resolve().then(demarrer).catch(secours);
