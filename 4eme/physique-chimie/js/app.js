// Physique-chimie 4e — l'application.
//
// La structure est celle de l'appli de mathématiques, et volontairement :
// chapitre → savoir-faire → six sections (découvrir, cours, méthode,
// s'entraîner, problèmes, se tester). Un élève qui passe d'une matière à
// l'autre ne doit pas réapprendre où sont les choses.
//
// ── Ce que ce fichier fait ─────────────────────────────────────────────────
//
// La coquille, la navigation, ET la couche de réponse : la saisie, les quatre
// verdicts, la prédiction verrouillée, le contre-modèle exécuté, le dialogue
// après l'erreur, la séance composée par `seance.js`, l'état rangé par
// `srs.js`, et Merlin quand une clé est saisie.
//
// Il ne CALCULE rien lui-même. La comparaison des unités est dans `unites.js`,
// les quatre états du double QCM dans `srs.js`, les verdicts dans `reponse.js`,
// la composition de séance dans `seance.js`, les dessins dans `schema.js`. Ce
// fichier les branche et les affiche — et quand un module refuse, il montre le
// refus au lieu de le maquiller.
//
// ── Trois choses que la physique-chimie impose et que les maths n'avaient pas ─
//
//   · **Aucun fichier image, jamais.** Un item porte un OBJET FORMEL — un
//     graphe de circuit, une description particulaire, un jeu de mesures — et
//     `schema.js` en tire le dessin. La figure et la correction sortent donc du
//     même objet et ne peuvent pas se contredire. Ici, on appelle
//     `rendreFigure` et on n'écrit pas une seule balise `<img>`.
//   · **Le programme n'est pas le même d'un collège à l'autre.** Cinq chapitres
//     sont « frontière » ou disputés entre deux textes officiels : l'élève est
//     donc interrogé à leur entrée, et un chapitre « pas encore fait » sort du
//     suivi sans disparaître de la liste.
//   · **Les formes du contenu divergent.** `DECOUVERTE`, `COURS` et `METHODE`
//     ont été écrits savoir-faire par savoir-faire, avant qu'aucun consommateur
//     n'existe : `COURS` est tantôt un tableau de blocs typés, tantôt un objet à
//     `points`, tantôt un objet à `blocs`. Les trois normalisateurs de ce
//     fichier absorbent la divergence côté LECTURE. Réécrire les sept fichiers
//     de contenu pour les aligner serait la bonne solution le jour où quelqu'un
//     tranche la forme ; en attendant, on ne touche pas au contenu relu.

import {
  ATTENDUS_BO,
  CHAPITRES,
  CHAPITRE_PAR_ID,
  NON_DEMANDE,
  SAVOIR_FAIRE_PAR_ID,
  savoirFaireDuChapitre,
} from './data/savoir-faire.js';
import {
  CHAPITRE as ID_CHAPITRE_1,
  SAVOIR_FAIRE as CONTENU_CH01,
} from './data/items/ch01/index.js';
import { PIEGES } from './data/pieges/index.js';
import { rendreFigure } from './schema.js';
import { SANS_UNITE, VERDICTS } from './unites.js';
import {
  apresReponsePiege,
  apresReponseSavoirFaire,
  estMaitrise,
  etatInitialPiege,
  etatInitialSavoirFaire,
  programmerPiege,
} from './srs.js';
import { TAILLE_FENETRE, genererSeance, resumerSeance } from './seance.js';
import {
  corriger as corrigerReponse,
  contreModeleDe,
  distracteurTouche,
  estAPredictionVerrouillee,
  evenementDeReponse,
  executerContreModele,
  executerModeleErrone,
  nombreFrancais,
  sorteDeReponse,
} from './reponse.js';
import { clesInconnues, libelle } from './lexique.js';
import * as merlin from './merlin.js';
import { AVATARS, definirEleve, eleve, estInstalle } from './eleve.js';

const CLE = 'physique4e.profil';
const app = document.getElementById('app');

// ── Le profil ───────────────────────────────────────────────────────────────
//
// `chapitres` porte la réponse à l'interrupteur, une par chapitre :
// 'fait' | 'pas-encore' | 'inconnu'. Un chapitre absent de la table n'a pas
// encore été interrogé — c'est un troisième état, distinct de « je ne sais
// pas », et il ne faut pas les confondre : le premier veut dire qu'on n'a pas
// demandé, le second que l'élève a répondu qu'il ignorait.
//
// `savoirFaire` et `pieges` SONT, champ pour champ, ce que `srs.js` écrit. Ce
// fichier ne renomme rien et n'invente rien — c'est la règle que la
// réconciliation des trois modules du moteur a payée cher : un état écrit par
// un module et lu par un autre sous un autre nom est un état que personne
// n'écrit.
//
// `seance` est le TEMPS du projet, en séances et jamais en jours. Un élève qui
// condense deux séances dans la même journée ne doit pas repousser une
// re-confrontation d'un jour.

const profilVierge = () => ({
  chapitres: {},
  sectionsVues: [],
  seance: 1,
  savoirFaire: {},
  pieges: {},
  fenetre: [],
  dernierPiegeRevise: null,
  chapitreCourant: null,
  // Ce que Merlin a déjà dit sur une conception : on ne répète pas une image
  // qui n'a pas pris.
  expliquees: {},
  // Ce que le moteur a refusé d'enregistrer, et pourquoi. Un profil ou un
  // corpus incohérent ne doit pas interrompre la séance, mais il ne doit pas
  // non plus disparaître : il se lit dans le repli « sous le capot ».
  anomalies: [],
});

const charger = () => {
  try { return JSON.parse(localStorage.getItem(CLE)) ?? null; } catch { return null; }
};

let profil = { ...profilVierge(), ...(charger() ?? {}) };
const sauver = () => {
  try { localStorage.setItem(CLE, JSON.stringify(profil)); } catch { /* stockage refusé */ }
};

const statutProgramme = (idChapitre) => profil.chapitres?.[idChapitre] ?? null;

function definirStatutProgramme(idChapitre, statut) {
  profil.chapitres = { ...(profil.chapitres ?? {}), [idChapitre]: statut };
  sauver();
}

const horsSuivi = (idChapitre) => statutProgramme(idChapitre) === 'pas-encore';

// ── L'état de reprise espacée ───────────────────────────────────────────────

const etatSf = (id) => profil.savoirFaire[id] ?? etatInitialSavoirFaire();

/** `etatInitialPiege` LÈVE sur un piège absent du catalogue, et c'est voulu : un
 *  rythme initial ne s'invente pas. Ici on ne lève pas — on rend `null`, et
 *  l'appelant n'enregistre rien plutôt que d'interrompre la séance. */
const etatPiege = (id) => {
  if (profil.pieges[id]) return profil.pieges[id];
  const p = PIEGES[id];
  return p ? etatInitialPiege(p) : null;
};

const noterAnomalie = (code, message) => {
  profil.anomalies = [...(profil.anomalies ?? []), { code, message, seance: profil.seance }].slice(-20);
};

/**
 * Une réponse, rangée dans l'état de l'élève.
 *
 * L'ordre compte. `programmerPiege` fait l'ENTRÉE DANS LA FILE et lui seul :
 * appelé deux fois il ne fait rien la seconde, et sans lui les deux champs
 * `rencontre` et `revoirALaSeance` divergeraient — état que `seance.js` refuse
 * de lire, et à juste titre, puisqu'il voudrait dire « rencontré mais jamais
 * programmé ».
 *
 * Une issue `null` — saisie illisible, contenu fautif, auto-évaluation en
 * attente — n'écrit RIEN. C'est l'invariant 9 : un `unite-non-reconnue`
 * comptabilisé ferait redescendre un palier sur une faute de frappe.
 */
function enregistrerReponse(item, issue, piegeDiagnostique = null) {
  if (!issue) return;
  const evenement = evenementDeReponse(item, issue, profil.seance);

  profil.savoirFaire[item.sfPrincipal] = apresReponseSavoirFaire(etatSf(item.sfPrincipal), evenement);

  // ① Le piège que l'item VISE reçoit l'événement complet, dispositif compris.
  majPiege(item.piege, evenement, item.id);

  // ② Le piège DIAGNOSTIQUÉ, quand ce n'est pas celui-là.
  //
  // C'est la conception que l'élève vient de révéler en cochant un distracteur
  // ou une justification, et elle doit entrer dans la file : sans cela, un item
  // qui ne DÉCLARE aucun piège — la moitié du chapitre 1 — laisse le diagnostic
  // sans suite. L'explication serait servie une fois et la conception ne
  // reviendrait jamais, ce qui est exactement le contraire de ce que la reprise
  // espacée existe pour faire.
  //
  // ⚠ Sans `dispositifServi` : celui de l'item appartient au piège de l'item, et
  // `apresReponsePiege` LÈVE sur un dispositif étranger — le compter comme servi
  // refermerait le cycle de variation de l'autre piège trop tôt.
  if (piegeDiagnostique && piegeDiagnostique !== item.piege) {
    majPiege(piegeDiagnostique, { ...evenement, dispositifServi: null }, item.id);
  }

  bilan.reussites += issue === 'reussite' ? 1 : 0;
  bilan.echecs += issue === 'echec' ? 1 : 0;
  bilan.sansJustification += issue === 'reussite-sans-justification' ? 1 : 0;
  const enCause = piegeDiagnostique ?? item.piege;
  if (enCause && issue !== 'reussite') bilan.pieges[enCause] = (bilan.pieges[enCause] ?? 0) + 1;
  sauver();
}

function majPiege(id, evenement, ou) {
  const piege = id ? PIEGES[id] : null;
  if (!piege) return;
  try {
    // `programmerPiege` fait l'entrée dans la file et lui seul ; appelé deux
    // fois, il ne fait rien la seconde.
    profil.pieges[id] = apresReponsePiege(
      programmerPiege(etatPiege(id), piege, profil.seance), piege, evenement,
    );
  } catch (e) {
    // On ne l'avale pas en silence : la séance continue, l'anomalie se lit dans
    // le repli « sous le capot » du bilan.
    noterAnomalie('PIEGE_NON_ENREGISTRE', `${ou} → ${id} : ${e.message}`);
  }
}

/** Le compte de la séance en cours, remis à zéro à chaque séance ouverte. Il ne
 *  va pas dans le profil : il ne sert qu'au bilan et à Merlin, et une seule
 *  séance à la fois est ouverte. */
let bilan = { reussites: 0, echecs: 0, sansJustification: 0, pieges: {} };
const remettreLeBilan = () => { bilan = { reussites: 0, echecs: 0, sansJustification: 0, pieges: {} }; };

// ════════════════════════════════════════════════════════════════════════════
// Le rendu de texte
// ════════════════════════════════════════════════════════════════════════════

const echapper = (s) =>
  String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/**
 * Le gras et l'italique du contenu, sans embarquer un moteur markdown.
 *
 * Le contenu en a un usage précis : `**...**` met en relief le mot qui porte la
 * règle (« un corps pur ne contient **qu'une seule espèce chimique** »), et
 * `*...*` marque le mot pris dans son sens courant plutôt que scientifique
 * (« *sans ajout* »). Cette distinction-là est du contenu : la perdre reviendrait
 * à effacer la moitié de ce que le cours essaie de dire.
 */
const enrichir = (s) => echapper(s)
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/(^|[^*])\*([^*]+?)\*/g, '$1<em>$2</em>');

/** Un texte de contenu, avec ses paragraphes. Accepte une chaîne à retours à la
 *  ligne ou un tableau de paragraphes — les deux existent dans le corpus. */
const paragraphes = (texte) => (Array.isArray(texte) ? texte : String(texte ?? '').split('\n'))
  .filter((l) => String(l).trim())
  .map((l) => `<p>${enrichir(l)}</p>`)
  .join('');

const uniteLisible = (unite) => (!unite || unite === SANS_UNITE ? '' : String(unite));

/** Une grandeur de l'énoncé, valeur et unité soudées. */
function grandeurLisible(donnee) {
  const u = uniteLisible(donnee?.unite);
  return `${nombreFrancais(donnee?.valeur)}${u ? ` ${u}` : ''}`;
}

/**
 * L'énoncé d'un item, avec ses `{{donnee:id}}` remplacés.
 *
 * L'échappement passe AVANT la substitution, et c'est volontaire : les
 * accolades ne sont pas des caractères échappés, le motif survit donc intact,
 * et la valeur insérée est écrite par nous — pas par le contenu.
 */
const MOTIF_DONNEE = /\{\{donnee:([A-Za-z0-9_]+)\}\}/g;

function enonce(item) {
  return echapper(item.enonce).replace(MOTIF_DONNEE, (_, id) => {
    const d = item.donnees?.[id];
    // Une donnée citée mais absente est une faute d'énoncé, pas un trou à
    // combler en silence : elle doit se voir à l'écran.
    if (!d) return `<span class="donnee">⟨${echapper(id)} manquante⟩</span>`;
    return `<span class="donnee">${echapper(grandeurLisible(d))}</span>`;
  });
}

/**
 * Le même énoncé, en texte nu — pour Merlin.
 *
 * ⚠ Il ne se déduit PAS de l'énoncé rendu à l'écran, et il ne doit pas non plus
 * être envoyé brut : le message partait avec ses `{{donnee:masseVerre}}` intacts,
 * et le modèle recevait un gabarit là où l'élève avait lu « 320 g ». Il aurait
 * commenté une situation sans nombres, ou pire, inventé les siens.
 */
const enonceEnTexte = (item) => String(item.enonce ?? '').replace(
  MOTIF_DONNEE,
  (_, id) => (item.donnees?.[id] ? grandeurLisible(item.donnees[id]) : `⟨${id} manquante⟩`),
);

/**
 * Une figure, tracée par `schema.js` à partir du seul objet formel de l'item.
 *
 * Un refus n'est pas rendu comme une figure vide : `schema.js` refuse un graphe
 * qu'il ne sait pas lire ou un point hors cadre, et faire disparaître la figure
 * laisserait l'élève chercher une donnée qui n'est nulle part.
 */
function figure(declaration) {
  if (!declaration) return '';
  const r = rendreFigure(declaration);
  if (r.ok) return r.html;
  const details = (r.details ?? []).length ? ` (${echapper(String(r.details))})` : '';
  return `<p class="figure-refusee">Figure non traçable : ${echapper(r.raison)}${details}.</p>`;
}

const figures = (liste) => (liste ?? []).map(figure).join('');

/**
 * Un mélange REPRODUCTIBLE, semé par l'identifiant de l'item.
 *
 * Les justifications d'un double QCM sont déclarées dans l'ordre où l'auteur
 * les a écrites, et la juste est souvent la première : les servir dans cet
 * ordre donnerait la réponse. `Math.random` conviendrait pour cacher l'ordre,
 * mais rebattrait les cartes à chaque rendu — l'élève verrait les propositions
 * sauter sous son doigt. La graine vient donc de l'item, et de lui seul.
 */
function melanger(liste, graineTexte) {
  let x = 2166136261;
  for (const c of String(graineTexte)) { x ^= c.charCodeAt(0); x = Math.imul(x, 16777619); }
  x >>>= 0;
  const suivant = () => {
    x ^= x << 13; x >>>= 0;
    x ^= x >>> 17;
    x ^= x << 5; x >>>= 0;
    return x / 4294967296;
  };
  const t = [...liste];
  for (let i = t.length - 1; i > 0; i -= 1) {
    const j = Math.floor(suivant() * (i + 1));
    [t[i], t[j]] = [t[j], t[i]];
  }
  return t;
}

// ════════════════════════════════════════════════════════════════════════════
// Les chapitres et leur contenu
// ════════════════════════════════════════════════════════════════════════════

/** Les quatre thèmes du cycle 4, tels que le programme les nomme. Le numéro est
 *  celui que porte la clé d'attendu (`t3-circuits` → thème 3) : le lien entre un
 *  chapitre et son thème passe donc par les attendus de ses savoir-faire, jamais
 *  par un champ saisi qui finirait par les contredire. */
const THEMES = Object.freeze({
  1: 'Organisation et transformations de la matière',
  2: 'Mouvement et interactions',
  3: "L'énergie et ses conversions",
  4: 'Des signaux pour observer et communiquer',
});

/** Le thème DOMINANT d'un chapitre. Deux chapitres en portent deux — le 6 greffe
 *  deux sections d'énergie sur les transformations chimiques — et c'est le plus
 *  fréquent qui s'affiche : le fil transversal n'est pas un onglet. */
function themeDuChapitre(chapitre) {
  const comptes = new Map();
  for (const sf of savoirFaireDuChapitre(chapitre.id)) {
    const t = ATTENDUS_BO[sf.attendu]?.theme;
    if (t) comptes.set(t, (comptes.get(t) ?? 0) + 1);
  }
  const [dominant] = [...comptes.entries()].sort((a, b) => b[1] - a[1])[0] ?? [];
  return dominant ? { numero: dominant, nom: THEMES[dominant] } : null;
}

/**
 * L'interrupteur « ton professeur a-t-il fait ce chapitre ? » est-il dû ?
 *
 * `statut` et `dispute` sont DEUX AXES, et `data/savoir-faire.js` le dit en
 * toutes lettres : attacher l'interrupteur au seul statut `frontiere` le
 * retirait au chapitre 4 — masse volumique, noyau ET disputé entre deux textes
 * officiels —, c'est-à-dire au chapitre le plus emblématique du problème.
 */
const chapitreIncertain = (chapitre) => chapitre.statut === 'frontiere' || chapitre.dispute !== null;

/** Le contenu écrit, chapitre par chapitre. Un seul aujourd'hui ; les autres
 *  s'ajoutent ici, et l'écran de sommaire dit « à venir » pour les autres au
 *  lieu d'ouvrir une page vide. */
const CONTENU = Object.freeze({ [ID_CHAPITRE_1]: CONTENU_CH01 });

const contenuDuChapitre = (idChapitre) => CONTENU[idChapitre] ?? null;

const entreeDuSavoirFaire = (idChapitre, idSf) =>
  (contenuDuChapitre(idChapitre) ?? []).find((e) => e.sf === idSf) ?? null;

/** Tous les items écrits, dans l'ordre du corpus : c'est le VIVIER que
 *  `seance.js` reçoit. Il ne contient que du contenu réellement écrit — un
 *  vivier gonflé de chapitres vides ferait composer des séances qui n'existent
 *  pas. */
const VIVIER = Object.values(CONTENU).flatMap((entrees) => entrees.flatMap((e) => e.items));

// ── Les six sections ────────────────────────────────────────────────────────

const SECTIONS = Object.freeze([
  { cle: 'decouvrir', titre: 'Découvrir' },
  { cle: 'cours', titre: 'Le cours' },
  { cle: 'methode', titre: 'La méthode' },
  { cle: 'entrainement', titre: "S'entraîner" },
  { cle: 'problemes', titre: 'Des problèmes' },
  { cle: 'test', titre: 'Se tester' },
]);

/**
 * Le rang d'un item se lit dans son identifiant : `…-e07-…`, `…-p03-…`,
 * `…-t10-…`. Le schéma d'item n'a pas de champ « section », et il ne doit pas
 * en avoir un : ce qui décide du créneau réel d'un item, c'est `seance.js` —
 * son palier, son cercle, son piège et son chapitre. Le découpage en trois
 * sections est un rangement de MANUEL, utile pour parcourir un savoir-faire à
 * la main ; il n'a aucune autorité sur la séance.
 */
const RANGS = Object.freeze({
  entrainement: /-e\d\d-/,
  problemes: /-p\d\d-/,
  test: /-t\d\d-/,
});

function contenuDeSection(entree, cle) {
  if (cle === 'decouvrir') return entree.sections.decouverte ?? null;
  if (cle === 'cours') return entree.sections.cours ?? null;
  if (cle === 'methode') return entree.sections.methode ?? null;
  return entree.items.filter((i) => RANGS[cle].test(i.id));
}

const sectionRemplie = (v) => (Array.isArray(v) ? v.length > 0 : Boolean(v));

const sectionsDe = (entree) =>
  SECTIONS.filter((s) => sectionRemplie(contenuDeSection(entree, s.cle)));

// ════════════════════════════════════════════════════════════════════════════
// Les normalisateurs — trois formes de contenu, une forme de lecture
// ════════════════════════════════════════════════════════════════════════════

/**
 * La découverte.
 *
 * Elle ne DIT pas la règle : elle fait rater une prédiction, puis montre le
 * résultat. D'où la coupure en deux temps — ce qu'on lit avant de s'engager, et
 * ce qui se dévoile après. Sans engagement préalable il n'y a pas de conflit,
 * juste une information de plus, et c'est le seul dispositif dont la didactique
 * dise qu'il déplace quelque chose.
 */
function normaliserDecouverte(d) {
  const questions = [
    ...(d.predictionEngagee ? [{ texte: d.predictionEngagee, engagee: true }] : []),
    ...(d.question ? [{ texte: d.question }] : []),
    ...(d.questions ?? []).map((q) => (typeof q === 'string'
      ? { texte: q }
      : { texte: q.texte, note: q.pourquoiElleEstPosee })),
  ];
  const apres = [
    ['Le résultat', d.resultat],
    ['Ce que ça change', d.conflit],
    ['Ce qu’il faut en retenir', d.conclusion ?? d.cequilFautEnRetenir],
    ['Ce qu’on ne fait pas ici', d.ceQuOnNeFaitPas],
    ['Pourquoi on ne tranche pas encore', d.cePourQuoiOnNeTranchePasEncore],
  ].filter(([, texte]) => texte);
  return {
    titre: d.titre,
    texte: d.texte ?? d.situation ?? null,
    figures: [d.figure, ...(d.figures ?? [])].filter(Boolean),
    observations: d.lignes ?? [],
    releve: d.releve ?? [],
    questions,
    // ⚠ Le champ de prédiction, quand le contenu en demande une sans en
    // déclarer un.
    //
    // Deux découvertes du chapitre 1 écrivent « verrouille ta prédiction avant
    // de voir les courbes » et ne portent aucun `champs` : la question est dans
    // la prose, le widget n'existe pas. Sans ce repli, le bouton « voir ce qui
    // s'est passé » s'ouvre sans que rien n'ait été écrit — et une découverte
    // qu'on peut dérouler sans s'être engagé n'est pas une découverte, c'est un
    // cours avec un bouton.
    //
    // Ce n'est PAS écrire du contenu : la question reste celle de l'auteur, et
    // le champ ne porte aucun libellé qui la reformule. C'est le widget que
    // l'engagement réclame, et rien de plus.
    champs: d.champs ?? (d.predictionEngagee
      ? [{ id: 'prediction', etiquette: 'Ta prédiction, avant de regarder', libre: true }]
      : []),
    engagementDemande: Boolean(d.champs?.length || d.predictionEngagee),
    apres,
    piege: d.citeLePiege ?? null,
  };
}

/** Le cours. Trois formes dans le corpus : un tableau de blocs typés, un objet à
 *  `points`, un objet à `blocs`. Les trois disent la même chose — une suite de
 *  paragraphes titrés — et c'est cette suite qu'on rend. */
function normaliserCours(c) {
  if (Array.isArray(c)) return { titre: null, figure: null, blocs: c, aRetenir: null };
  return {
    titre: c.titre ?? null,
    figure: c.figure ?? null,
    blocs: c.blocs ?? c.points ?? [],
    aRetenir: c.aRetenir ?? null,
  };
}

const NOM_DU_BLOC = Object.freeze({
  definition: 'Définition',
  propriete: 'Propriété',
  theoreme: 'Théorème',
  remarque: 'Remarque',
  attention: 'Attention',
  exemple: 'Exemple',
  methode: 'Méthode',
});

/**
 * La méthode. Cinq formes d'étape dans le corpus, selon l'auteur du fichier :
 * `{geste, detail}`, `{rang, titre, texte}`, `{geste, redaction}`,
 * `{texte, note}`, `{titre, texte}`.
 *
 * `redaction` n'est pas fondu dans `texte` : c'est la phrase à écrire SUR LA
 * COPIE, et elle se lit autrement qu'un commentaire sur le geste.
 */
function normaliserMethode(m) {
  return {
    titre: m.titre,
    enonce: m.enonce ?? null,
    figure: m.figure ?? null,
    etapes: (m.etapes ?? []).map((e) => ({
      titre: e.titre ?? e.geste ?? null,
      texte: e.texte ?? e.detail ?? null,
      redaction: e.redaction ?? null,
      note: e.note ?? null,
    })),
    // Le contrôle est écrit une fois, dans le catalogue des pièges, et cité par
    // son identifiant. Deux proses égales par copie divergent au premier auteur
    // qui corrige l'une des deux.
    controle: m.controle ?? PIEGES[m.renvoiControle]?.controle ?? null,
    piege: m.piegeTravaille ?? m.renvoiControle ?? null,
    erreurAttendue: m.erreurQuOnAttend ?? m.erreurQueLaMethodeAttrape ?? null,
    tolerance: m.toleranceDeLecture ?? null,
  };
}

// ════════════════════════════════════════════════════════════════════════════
// La navigation
// ════════════════════════════════════════════════════════════════════════════

let CHAPITRE = CHAPITRES[0];
let vue = { ecran: 'chapitres' };

const entreeCourante = () => entreeDuSavoirFaire(CHAPITRE.id, vue.sfId);

/**
 * Le lot d'items que l'élève parcourt — une section de savoir-faire, ou la
 * séance du jour.
 *
 * Les deux chemins partagent tout le reste : la même zone de réponse, les
 * mêmes verdicts, le même dialogue. Ce qui les distingue est ce qui les
 * précède (un sommaire, ou `genererSeance`) et ce qui les suit (la section
 * suivante, ou le bilan).
 */
function lotCourant() {
  if (vue.ecran === 'seance') return vue.seance?.items ?? [];
  const lot = contenuDeSection(entreeCourante(), vue.section);
  return Array.isArray(lot) ? lot : [];
}

const itemCourant = () => lotCourant()[vue.index] ?? null;

/** L'état d'item remis à neuf : aucune saisie, aucun verdict, aucun dialogue de
 *  l'item précédent ne survit au suivant. */
const itemVierge = () => ({
  saisie: {}, etape: null, retour: null, raison: null, redemande: null,
  ouverte: false, engagementManquant: false,
  merlin: null, chat: null, question: '', chatAttente: false, aide: null, niveauAide: 0,
});

function ouvrirChapitre(idChapitre) {
  CHAPITRE = CHAPITRE_PAR_ID[idChapitre];
  // Le chapitre ouvert devient le chapitre du CŒUR de la séance, s'il porte du
  // contenu : c'est ce que `seance.js` appelle `chapitreCourant`, et c'est
  // l'élève qui le désigne en travaillant dedans, pas un réglage.
  if (contenuDuChapitre(idChapitre)) {
    profil.chapitreCourant = idChapitre;
    sauver();
  }
  // L'interrupteur passe AVANT le sommaire, et une seule fois : demander à
  // chaque visite serait une question de plus à écarter, donc une question à
  // laquelle on répond au hasard.
  vue = chapitreIncertain(CHAPITRE) && statutProgramme(CHAPITRE.id) === null
    ? { ecran: 'programme' }
    : { ecran: 'sommaire' };
  rendre();
}

function ouvrirSection(sfId, cleSection) {
  const entree = entreeDuSavoirFaire(CHAPITRE.id, sfId);
  if (!entree) return;
  const dispo = sectionsDe(entree);
  if (!dispo.length) return;
  vue = {
    ...itemVierge(),
    ecran: 'section',
    sfId,
    section: cleSection ?? dispo[0].cle,
    index: 0,
    ouverte: false,
  };
  rendre();
}

function sectionSuivante() {
  const entree = entreeCourante();
  const dispo = sectionsDe(entree);
  const i = dispo.findIndex((s) => s.cle === vue.section);
  if (i < dispo.length - 1) return ouvrirSection(vue.sfId, dispo[i + 1].cle);
  if (!profil.sectionsVues.includes(vue.sfId)) {
    profil.sectionsVues.push(vue.sfId);
    sauver();
  }
  vue = { ecran: 'sommaire' };
  rendre();
}

function itemSuivant() {
  const lot = lotCourant();
  if (vue.index >= lot.length - 1) {
    return vue.ecran === 'seance' ? terminerSeance() : sectionSuivante();
  }
  vue = { ...vue, ...itemVierge(), index: vue.index + 1 };
  rendre();
}

// ════════════════════════════════════════════════════════════════════════════
// La séance — `seance.js` branché pour de vrai
// ════════════════════════════════════════════════════════════════════════════

/**
 * Les chapitres SUIVIS, au sens de l'interrupteur.
 *
 * Seul « pas encore » sort du suivi : « je ne sais pas » n'est pas une réponse
 * négative, et un chapitre noyau n'a pas d'interrupteur du tout. Un chapitre
 * hors suivi reste ouvert et travaillable — il ne compte simplement ni comme
 * lacune ni comme décor de re-confrontation.
 */
const chapitresSuivis = () => CHAPITRES.filter((ch) => !horsSuivi(ch.id)).map((ch) => ch.id);

/** La graine du tirage. Dérivée du seul numéro de séance : à séance égale et à
 *  état égal, la même séance est composée — sur ce téléphone comme dans le
 *  simulateur. Aucune date système n'entre ici. */
const graineDeSeance = (n) => (Math.imul(n, 0x9e3779b1) >>> 0);

function etatPourSeance() {
  return {
    numeroSeance: profil.seance,
    chapitreCourant: profil.chapitreCourant ?? ID_CHAPITRE_1,
    chapitresFaits: chapitresSuivis(),
    vivier: VIVIER,
    savoirFaire: profil.savoirFaire,
    pieges: profil.pieges,
    fenetre: profil.fenetre,
    dernierPiegeRevise: profil.dernierPiegeRevise,
  };
}

function demarrerSeance() {
  const seance = genererSeance(etatPourSeance(), graineDeSeance(profil.seance));
  remettreLeBilan();
  vue = { ...itemVierge(), ecran: 'seance', seance, index: 0 };
  rendre();
}

/**
 * La séance close : son résumé entre dans la fenêtre glissante, le compteur
 * avance d'un cran, et Merlin consolide ce qu'il a appris.
 *
 * Le résumé est celui que `seance.js` rend (`resumerSeance`) et non un objet
 * reconstruit ici : deux lectures du même objet finiraient par diverger, et
 * c'est la mesure des bandes de proportion qui en paierait le prix.
 */
function terminerSeance() {
  const s = vue.seance;
  profil.fenetre = [...(profil.fenetre ?? []), resumerSeance(s)].slice(-TAILLE_FENETRE);
  if (s.reconfrontation?.piege) profil.dernierPiegeRevise = s.reconfrontation.piege;
  profil.seance += 1;
  sauver();
  vue = { ecran: 'bilan', seanceFinie: s, bilan: { ...bilan } };
  rendre();
  consoliderLaMemoire(s);
}

async function consoliderLaMemoire(seanceFinie) {
  if (!merlin.disponible()) return;
  const [dominante] = Object.entries(bilan.pieges).sort((a, b) => b[1] - a[1]);
  await merlin.consoliderMemoire({
    profil: profilMerlin(),
    resume: {
      reussites: bilan.reussites,
      echecs: bilan.echecs,
      sansJustification: bilan.sansJustification,
      dominante: dominante ? PIEGES[dominante[0]]?.conception ?? dominante[0] : null,
    },
    seance: seanceFinie.numeroSeance,
  });
}

const profilMerlin = () => merlin.profilPourIA({
  pieges: profil.pieges,
  savoirFaire: profil.savoirFaire,
  catalogueSf: SAVOIR_FAIRE_PAR_ID,
  seance: profil.seance,
});

// ════════════════════════════════════════════════════════════════════════════
// Répondre
// ════════════════════════════════════════════════════════════════════════════

/**
 * La saisie mise en forme pour `reponse.js`.
 *
 * Le champ unité a TROIS états, et c'est ici qu'ils se distinguent : vide (rien
 * n'a été écrit), « sans unité » coché (un refus légitime, et la réponse est
 * complète), unité saisie. Sans le deuxième, on ne saurait pas différencier
 * l'oubli du refus, et toute réponse adimensionnée du corpus deviendrait un
 * faux négatif.
 */
function saisiePourCorrection() {
  const s = vue.saisie ?? {};
  return {
    valeur: s.valeur ?? '',
    unite: s.sansUnite ? SANS_UNITE : (s.unite ?? ''),
    choix: s.choix ?? null,
    justification: s.justification ?? null,
    libre: s.libre ?? '',
    symbole: s.symbole ?? '',
  };
}

/**
 * Le verdict, et ce qu'il déclenche.
 *
 * `redemande` est le cas qu'il ne faut surtout pas fondre dans « faux » : une
 * unité illisible, un nombre qu'on ne sait pas lire, un contenu fautif. Rien
 * n'est enregistré, aucun essai n'est consommé, et l'écran redemande. Compter
 * faux une faute de frappe ferait redescendre un palier.
 */
function verifier() {
  const item = itemCourant();
  if (!item) return;

  const r = corrigerReponse(item, saisiePourCorrection());

  if (r.redemande) {
    vue = { ...vue, redemande: r };
    return rendre();
  }

  enregistrerReponse(item, r.issue, r.piege);

  // L'auto-évaluation d'une réponse rédigée : le moteur ne tranche pas, il
  // montre ce qu'on attendait et demande à l'élève de se prononcer. Elle est
  // DÉCLARÉE comme telle pour qu'aucun écran ne la présente comme un verdict.
  const etape = r.autoEvaluation ? 'auto'
    : r.juste ? 'verdict'
      : r.piege ? 'pourquoi' : 'inconnu';

  vue = { ...vue, retour: r, etape, redemande: null };
  rendre();
}

/**
 * Le verrou de la prédiction.
 *
 * C'est le dispositif central de cette matière et il n'a qu'une règle : rien du
 * résultat ne s'affiche avant que la prédiction ne soit écrite ET verrouillée.
 * Le verdict est calculé ici — il faut bien enregistrer la réponse au moment où
 * elle est donnée — mais il n'est PAS rendu : l'écran suivant montre la
 * prédiction, figée, et un seul bouton pour découvrir la suite. Sans engagement
 * préalable il n'y a pas de conflit, juste une information de plus.
 */
function verrouillerPrediction() {
  const item = itemCourant();
  const r = corrigerReponse(item, saisiePourCorrection());
  if (r.redemande) {
    vue = { ...vue, redemande: r };
    return rendre();
  }
  enregistrerReponse(item, r.issue, r.piege);
  vue = { ...vue, retour: r, etape: 'verrouille', redemande: null };
  rendre();
}

/** Le rideau se lève : la prédiction est déjà verrouillée, le résultat peut
 *  s'afficher. C'est le SEUL chemin qui y mène. */
function ouvrirLeResultat() {
  const r = vue.retour;
  const etape = r.juste ? 'verdict' : r.piege ? 'pourquoi' : 'inconnu';
  vue = { ...vue, etape };
  rendre();
}

/** L'auto-évaluation d'une réponse rédigée, une fois les attendus lus. */
function seNoter(reussi) {
  const item = itemCourant();
  enregistrerReponse(item, reussi ? 'reussite' : 'echec', reussi ? null : vue.retour?.piege);
  vue = {
    ...vue,
    retour: { ...vue.retour, juste: reussi, issue: reussi ? 'reussite' : 'echec' },
    etape: reussi ? 'verdict' : (vue.retour.piege ? 'pourquoi' : 'inconnu'),
  };
  rendre();
}

// ── Merlin ──────────────────────────────────────────────────────────────────

/** « Se tester » est une auto-évaluation : Merlin y est absent par principe. */
const merlinAutorise = () => merlin.disponible() && vue.section !== 'test';

async function demanderAMerlin() {
  if (!merlinAutorise()) return;
  const item = itemCourant();
  const piegeId = vue.retour?.piege ?? null;
  const p = piegeId ? PIEGES[piegeId] : null;

  const depuis = vue.etape;
  vue = { ...vue, merlin: 'attente' };
  rendre();

  const s = saisiePourCorrection();
  const r = await merlin.expliquerErreur({
    profil: profilMerlin(),
    contexte: {
      savoirFaire: SAVOIR_FAIRE_PAR_ID[item.sfPrincipal]?.titre ?? item.sfPrincipal,
      enonce: enonceEnTexte(item),
      attendu: vue.retour?.correction ?? '(réponse à composer)',
      donnee: reponseDeLEleveEnTexte(item, s),
      verdict: vue.retour?.code ?? null,
      quadrant: vue.retour?.quadrant ?? null,
      piege: piegeId,
    },
    raisonnement: p && vue.raison != null ? p.raisonnements[vue.raison]?.texte : null,
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

/** Ce que l'élève a répondu, dit dans SA langue et non en identifiants. */
function reponseDeLEleveEnTexte(item, s) {
  switch (sorteDeReponse(item)) {
    case 'valeur':
      return `${s.valeur} ${s.unite === SANS_UNITE ? '(sans unité)' : s.unite}`.trim();
    case 'symbole': return s.symbole;
    case 'double-qcm':
      return `${libelle(s.choix) ?? s.choix} — justification : `
        + `« ${(item.justifications ?? []).find((j) => j.id === s.justification)?.texte ?? s.justification} »`;
    case 'choix': return libelle(s.choix) ?? s.choix;
    case 'libre': return s.libre;
    default: return '(réponse à composer)';
  }
}

const MAX_ECHANGES = 12;

async function envoyerQuestion() {
  const q = (vue.question ?? '').trim();
  if (!q || vue.chatAttente) return;
  if ((vue.chat ?? []).length >= MAX_ECHANGES) {
    vue = {
      ...vue,
      chat: [...(vue.chat ?? []), { role: 'merlin', texte: 'On a bien discuté ! Reprends les questions, on en reparle après.' }],
      question: '',
    };
    return rendre();
  }

  const item = itemCourant();
  vue = { ...vue, chat: [...(vue.chat ?? []), { role: 'eleve', texte: q }], question: '', chatAttente: true };
  rendre();

  const historique = [
    ...(vue.merlin && vue.merlin !== 'attente' && vue.merlin.explication
      ? [{ role: 'assistant', texte: vue.merlin.explication }] : []),
    ...(vue.chat ?? []).map((m) => ({ role: m.role === 'eleve' ? 'user' : 'assistant', texte: m.texte })),
  ];

  const r = await merlin.discuter({
    profil: profilMerlin(),
    contexte: {
      savoirFaire: SAVOIR_FAIRE_PAR_ID[item.sfPrincipal]?.titre ?? item.sfPrincipal,
      enonce: enonceEnTexte(item),
      attendu: vue.retour?.correction ?? '(réponse à composer)',
      donnee: reponseDeLEleveEnTexte(item, saisiePourCorrection()),
      piege: vue.retour?.piege ?? null,
    },
    historique,
    onDelta: (texte) => {
      const bulle = app.querySelector('#bulle-flux');
      if (bulle) bulle.textContent = texte;
    },
  });

  vue = {
    ...vue,
    chatAttente: false,
    chat: [...(vue.chat ?? []), {
      role: 'merlin',
      texte: r.disponible ? r.texte : "Je n'ai pas pu répondre — regarde ta connexion, ou reprends l'explication ci-dessus.",
    }],
  };
  rendre();
}

// ════════════════════════════════════════════════════════════════════════════
// Le rendu
// ════════════════════════════════════════════════════════════════════════════

/**
 * On remonte en haut quand on CHANGE d'écran, et à ce moment-là seulement.
 *
 * Tout se re-rend ici, y compris ce qui ne change pas d'écran : cocher une
 * proposition, basculer « ma réponse n'a pas d'unité », recevoir une redemande.
 * Remonter à chaque fois faisait sauter la page sous le doigt d'un élève qui
 * venait justement de descendre jusqu'aux propositions — sur un téléphone, la
 * question tient rarement dans un écran. L'appli de mathématiques ne remonte
 * jamais ; ici on remonte au changement d'écran, où c'est ce qu'on attend.
 *
 * `ouverte` et `merlin` sont volontairement absents de la clé : la découverte
 * qui se dévoile et la réponse de Merlin s'écrivent SOUS le bouton qu'on vient
 * de toucher, et il faut rester là pour les lire.
 */
const place = () => [vue.ecran, vue.sfId, vue.section, vue.index, vue.etape].join('/');
let placePrecedente = null;

function rendre() {
  // L'installation précède tout : le prénom est la clé de la mémoire partagée
  // entre les matières, et il est déjà là si l'élève vient des mathématiques.
  if (!estInstalle()) app.innerHTML = vueInstallation();
  else if (vue.ecran === 'reglages') app.innerHTML = vueReglages();
  else if (vue.ecran === 'chapitres') app.innerHTML = vueChapitres();
  else if (vue.ecran === 'programme') app.innerHTML = vueProgramme();
  else if (vue.ecran === 'sommaire') app.innerHTML = vueSommaire();
  else if (vue.ecran === 'seance') app.innerHTML = vueSeance();
  else if (vue.ecran === 'bilan') app.innerHTML = vueBilan();
  else app.innerHTML = vueSection();

  const ici = place();
  if (ici !== placePrecedente) window.scrollTo(0, 0);
  placePrecedente = ici;
}

function vueInstallation() {
  return `
    <header class="entete">
      <p class="surtitre">Physique-chimie · vers la 3<sup>e</sup></p>
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

// ── L'accueil ───────────────────────────────────────────────────────────────

/**
 * Le manifeste.
 *
 * Il est en tête du premier écran, en grand, et pas en pied de page : c'est le
 * seul endroit du marché où une application dit à un élève ce qu'elle ne lui
 * apprend PAS. La phrase est celle de la charte, mot pour mot — la reformuler
 * « pour que ça passe mieux » lui retirerait exactement ce qui la rend utile.
 */
const MANIFESTE = `
  <section class="manifeste">
    <p>L'application entraîne le raisonnement scientifique sur situation
      expérimentale décrite — proposer, choisir, critiquer, exploiter, contrôler.</p>
    <p class="manifeste-non">Elle n'entraîne pas le geste. Elle ne remplace pas le TP.</p>
    <p class="manifeste-note">Tenir une pipette, monter un circuit, allumer un bec :
      ça s'apprend en salle de TP, avec du matériel, et nulle part ailleurs. Ici, on
      travaille ce qui se passe dans la tête avant et après la manipulation.</p>
  </section>`;

function vueChapitres() {
  const cartes = CHAPITRES.map((ch) => {
    const nb = savoirFaireDuChapitre(ch.id).length;
    const theme = themeDuChapitre(ch);
    const statut = statutProgramme(ch.id);
    const contenu = contenuDuChapitre(ch.id);
    const etiquette = statut === 'pas-encore'
      ? 'Hors suivi'
      : statut === 'inconnu' ? 'À confirmer' : contenu ? '' : 'À venir';
    return `
      <button class="sf ${horsSuivi(ch.id) ? 'hors-suivi' : ''}" data-chapitre="${echapper(ch.id)}">
        <span class="sf-numero">${ch.numero}</span>
        <span class="sf-corps">
          <span class="sf-titre">${echapper(ch.titre)}</span>
          <span class="sf-detail">${theme ? `Thème ${theme.numero} · ${echapper(theme.nom)} · ` : ''}${nb} savoir-faire</span>
        </span>
        ${etiquette ? `<span class="sf-etat ${etiquette === 'Hors suivi' ? 'est-neutre' : ''}">${etiquette}</span>` : ''}
      </button>`;
  }).join('');

  const ecartes = CHAPITRES.filter((ch) => horsSuivi(ch.id)).length;

  return `
    <header class="entete">
      <p class="surtitre">Physique-chimie · vers la 3<sup>e</sup></p>
      <div class="entete-ligne" style="margin-top:4px">
        <div>
          <h1>Les chapitres</h1>
          <p class="sous-titre">Salut ${echapper(eleve().prenom)} ${eleve().avatar}</p>
        </div>
        <button class="lien-merlin" data-action="reglages">🎩 Merlin</button>
      </div>
    </header>

    ${MANIFESTE}

    ${vueCarteSeance()}

    <div class="sommaire">${cartes}</div>

    <p class="note" style="margin-top:16px">Les chapitres ne se font pas tous dans le même
      ordre ni tous en 4<sup>e</sup> : les textes officiels laissent le choix sur cinq d'entre
      eux. L'application te le demande à leur entrée plutôt que de deviner.</p>
    ${ecartes ? `<p class="note">${ecartes} chapitre${ecartes > 1 ? 's' : ''} que ton professeur
      n'a pas encore fait : tu peux quand même ${ecartes > 1 ? 'les' : 'le'} travailler,
      ${ecartes > 1 ? 'ils ne compteront' : 'il ne comptera'} pas comme lacune.</p>` : ''}

    <details class="repli">
      <summary>Ce qui n'est pas au programme de cette application</summary>
      <ul>
        ${NON_DEMANDE.map((n) => `
          <li>
            <strong>${echapper(n.quoi ?? ATTENDUS_BO[n.attendu]?.texte ?? n.attendu)}</strong> —
            ${echapper(n.motif)}
            <span class="citation">« ${echapper(n.citation)} »</span>
            <span class="source">${echapper(n.source)}</span>
          </li>`).join('')}
      </ul>
    </details>`;
}

/**
 * La séance du jour — 15 minutes, composées par `seance.js`.
 *
 * Le compteur affiché est en SÉANCES et jamais en jours : deux séances dans la
 * même après-midi comptent pour deux, et c'est exactement ce que le moteur de
 * reprise espacée attend. Écrire « aujourd'hui » ici rouvrirait un temps en
 * jours par la porte de l'affichage.
 */
function vueCarteSeance() {
  return `
    <button class="carte-seance" data-action="seance">
      <span class="carte-seance-titre">Ma séance — 15 minutes</span>
      <span class="carte-seance-detail">Séance n° ${profil.seance} · le rituel de contrôle,
        le chapitre en cours, puis une conception à revoir</span>
    </button>`;
}

// ── L'interrupteur « ton professeur a-t-il fait ce chapitre ? » ──────────────

/**
 * La question posée à l'entrée d'un chapitre incertain.
 *
 * Trois réponses, et la troisième n'est pas une politesse : « je ne sais pas »
 * est la réponse honnête la plus fréquente en milieu d'année, et l'obliger à
 * choisir entre « fait » et « pas fait » produirait une donnée fausse dans les
 * deux sens. Les textes qui se contredisent sont MONTRÉS — c'est ce qui
 * transforme la question en information au lieu d'un formulaire de plus.
 */
function vueProgramme() {
  const ch = CHAPITRE;
  const textes = ch.dispute?.textes ?? [];
  return `
    <header class="entete-section">
      <button class="retour" data-action="chapitres">← Tous les chapitres</button>
      <p class="surtitre" style="margin-top:10px">Chapitre ${ch.numero}</p>
      <h1>${echapper(ch.titre)}</h1>
    </header>
    <section class="programme-question">
      <h2>Ton professeur a-t-il fait ce chapitre ?</h2>
      <p class="note">Ce chapitre n'est pas au même moment dans tous les collèges.
        ${textes.length ? 'Deux textes officiels ne disent pas la même chose :' : "Le programme le laisse au choix de l'équipe :"}</p>
      ${textes.length ? `
        <ul class="textes-officiels">
          ${textes.map((t) => `<li>« ${echapper(t.texte)} »<span class="source">${echapper(t.source)}</span></li>`).join('')}
        </ul>` : ''}
      <div class="choix vertical">
        <button class="option option-douce" data-programme="fait">Oui, on l'a fait</button>
        <button class="option option-douce" data-programme="pas-encore">Pas encore</button>
        <button class="option option-douce" data-programme="inconnu">Je ne sais pas</button>
      </div>
      <p class="note">Si tu réponds « pas encore », le chapitre reste ouvert et tu peux
        le travailler quand tu veux — il ne comptera simplement pas comme une lacune.
        Tu pourras changer ta réponse à tout moment.</p>
    </section>`;
}

const LIBELLE_PROGRAMME = Object.freeze({
  fait: 'ton professeur a fait ce chapitre',
  'pas-encore': "ton professeur ne l'a pas encore fait — hors suivi",
  inconnu: 'tu ne sais pas encore si ton professeur l’a fait',
});

// ── Le sommaire d'un chapitre ───────────────────────────────────────────────

function vueSommaire() {
  const ch = CHAPITRE;
  const theme = themeDuChapitre(ch);
  const statut = statutProgramme(ch.id);
  const contenu = contenuDuChapitre(ch.id);

  const cartes = savoirFaireDuChapitre(ch.id).map((sf, i) => {
    const entree = entreeDuSavoirFaire(ch.id, sf.id);
    const vu = profil.sectionsVues.includes(sf.id);
    if (!entree) {
      return `
        <div class="sf a-venir">
          <span class="sf-numero">${i + 1}</span>
          <span class="sf-corps">
            <span class="sf-titre">${echapper(sf.titre)}</span>
            <span class="sf-detail">contenu à écrire</span>
          </span>
        </div>`;
    }
    const compte = (cle) => contenuDeSection(entree, cle).length;
    // « Acquis » n'est PAS un booléen du profil : c'est le verdict de `srs.js`,
    // et il n'y en a qu'un. Un savoir-faire sans piège typé n'est jamais
    // « acquis » mais « couvert, non diagnostiqué » — la barre la plus basse ne
    // se donne pas aux contenus les moins documentés.
    const verdict = estMaitrise(profil.savoirFaire[sf.id], sf);
    const etat = verdict.maitrise
      ? '<span class="sf-etat est-acquis">Acquis</span>'
      : verdict.statut === 'couvert-non-diagnostique'
        ? '<span class="sf-etat est-neutre">Couvert</span>'
        : vu ? '<span class="sf-etat est-neutre">Parcouru</span>' : '';
    // « Couvert, non diagnostiqué » n'est pas une lacune, et l'écrire sous
    // « il te reste » le ferait passer pour une : ce savoir-faire ne porte aucun
    // piège typé, donc rien ne permet de dire qu'il est acquis — c'est un fait
    // sur NOTRE contenu, pas sur l'élève, et il se dit comme tel.
    const reste = verdict.statut === 'couvert-non-diagnostique'
      ? "Aucune conception documentée ne s'y attache : on ne peut pas le déclarer acquis."
      : (profil.savoirFaire[sf.id] && verdict.manque?.length ? `Il te reste : ${verdict.manque[0]}` : null);
    return `
      <button class="sf" data-ouvrir="${echapper(sf.id)}">
        <span class="sf-numero">${i + 1}</span>
        <span class="sf-corps">
          <span class="sf-titre">${echapper(sf.titre)}</span>
          <span class="sf-detail">${compte('entrainement')} exercices ·
            ${compte('problemes')} problèmes · ${compte('test')} questions de test</span>
          ${reste ? `<span class="sf-manque">${echapper(reste)}</span>` : ''}
        </span>
        ${etat}
      </button>`;
  }).join('');

  return `
    <header class="entete">
      <button class="retour" data-action="chapitres">← Tous les chapitres</button>
      <div class="entete-ligne" style="margin-top:10px">
        <div>
          <p class="surtitre">Chapitre ${ch.numero}${theme ? ` · Thème ${theme.numero}` : ''}</p>
          <h1>${echapper(ch.titre)}</h1>
        </div>
      </div>
      <p class="sous-titre">${savoirFaireDuChapitre(ch.id).length} savoir-faire${theme ? ` · ${echapper(theme.nom)}` : ''}</p>
    </header>

    ${chapitreIncertain(ch) ? `
      <div class="statut-programme">
        <span>${statut ? `Tu as dit : ${LIBELLE_PROGRAMME[statut]}.` : "Chapitre au programme variable d'un collège à l'autre."}</span>
        <button data-action="programme">${statut ? 'Changer' : 'Répondre'}</button>
      </div>` : ''}

    ${contenu ? '' : `<p class="a-brancher">Le contenu de ce chapitre n'est pas encore écrit.
      Les savoir-faire ci-dessous sont ceux du programme ; leurs exercices arrivent.</p>`}

    <div class="sommaire">${cartes}</div>

    ${ch.nonDemande?.length ? `
      <details class="repli">
        <summary>Ce qui n'est pas demandé en 4<sup>e</sup> dans ce chapitre</summary>
        <ul>
          ${ch.nonDemande.map((n) => `
            <li>
              <strong>${echapper(n.notion)}</strong> — ${echapper(n.niveau)}
              <span class="citation">« ${echapper(n.citation)} »</span>
              <span class="source">${echapper(n.source)}</span>
            </li>`).join('')}
        </ul>
      </details>` : ''}

    ${ch.ordreImpose ? `
      <details class="repli">
        <summary>Pourquoi ce chapitre vient à cette place</summary>
        <ul>
          <li>
            <strong>${echapper(ch.ordreImpose.quoi)}</strong> — c'est notre choix, pas celui du
            programme. Pour : ${echapper(ch.ordreImpose.pour)}.
            <span class="citation">Le programme, lui, dit : « ${echapper(ch.ordreImpose.contre)} »</span>
          </li>
        </ul>
      </details>` : ''}`;
}

// ── Une section ─────────────────────────────────────────────────────────────

function vueSection() {
  const entree = entreeCourante();
  const sf = savoirFaireDuChapitre(CHAPITRE.id).find((s) => s.id === vue.sfId);
  const dispo = sectionsDe(entree);
  const onglets = dispo.map((s) => `
    <button class="onglet ${s.cle === vue.section ? 'actif' : ''}" data-section="${s.cle}">${s.titre}</button>`).join('');

  const contenu = contenuDeSection(entree, vue.section);
  const corps = vue.section === 'decouvrir' ? vueDecouverte(contenu)
    : vue.section === 'cours' ? vueCours(contenu)
      : vue.section === 'methode' ? vueMethode(contenu)
        : vueItem(contenu);

  return `
    <header class="entete-section">
      <button class="retour" data-action="sommaire">← Chapitre ${CHAPITRE.numero}</button>
      <h1>${echapper(sf?.titre ?? vue.sfId)}</h1>
      ${sf?.reformule ? `<p class="note" style="margin-top:6px">Le programme dit :
        « ${echapper(sf.reformule)} ». Ici on travaille la même chose sur situation décrite,
        sans le geste.</p>` : ''}
    </header>
    <nav class="onglets">${onglets}</nav>
    ${corps}`;
}

/**
 * La découverte, et son verrou.
 *
 * ⚠ Le bouton « voir ce qui s'est passé » est FERMÉ tant que les champs de
 * prédiction ne sont pas remplis. C'est le même dispositif que l'item à
 * prédiction verrouillée, et pour la même raison : une découverte qu'on peut
 * dérouler sans s'être engagé n'est pas une découverte, c'est un cours avec un
 * bouton. Une fois ouverte, la prédiction reste affichée, figée — pour qu'on
 * puisse la comparer à ce qui suit plutôt que de se souvenir de l'avoir devinée.
 */
/**
 * La découverte du savoir-faire courant, normalisée — et le verdict
 * d'engagement, lu au même endroit par l'écran et par le clic.
 *
 * ⚠ Le bouton n'est PAS désactivé, et c'est le contraire d'un relâchement.
 * L'attribut `disabled` est posé au rendu, et rien ne re-rend pendant que
 * l'élève tape : le bouton restait donc grisé APRÈS que la prédiction était
 * écrite, c'est-à-dire que le verrou bloquait celui qui s'était engagé et
 * personne d'autre. Le gardien est donc le clic — `ouvrirLaDecouverte` refuse
 * et le dit — et il ne peut pas se désynchroniser de la saisie.
 */
const decouverteCourante = () => {
  const entree = entreeCourante();
  const brut = entree ? contenuDeSection(entree, 'decouvrir') : null;
  return brut ? normaliserDecouverte(brut) : null;
};

const estEngage = (d) => !d?.engagementDemande
  || d.champs.every((c) => String((vue.saisie ?? {})[c.id] ?? '').trim());

function ouvrirLaDecouverte() {
  const d = decouverteCourante();
  if (!estEngage(d)) {
    vue = { ...vue, engagementManquant: true };
    return rendre();
  }
  vue = { ...vue, ouverte: true, engagementManquant: false };
  rendre();
}

function vueDecouverte(brut) {
  const d = normaliserDecouverte(brut);
  const p = d.piege ? PIEGES[d.piege] : null;
  const saisie = vue.saisie ?? {};
  const engage = estEngage(d);

  const champs = vue.ouverte
    ? (d.champs.length ? `<div class="prediction-verrouillee">
         <p class="prediction-titre">Ta prédiction, verrouillée</p>
         ${d.champs.map((c) => `<p class="prediction-ligne"><span>${enrichir(c.etiquette)}</span>
           <strong>${echapper(libelle(saisie[c.id]) ?? saisie[c.id] ?? '—')}</strong></p>`).join('')}
       </div>` : '')
    : d.champs.map((c) => (c.libre
      ? `<div class="champ">
           <label for="c-${echapper(c.id)}">${enrichir(c.etiquette)}</label>
           <textarea id="c-${echapper(c.id)}" data-champ="${echapper(c.id)}" rows="2"
                     spellcheck="true">${echapper(saisie[c.id] ?? '')}</textarea>
         </div>`
      : c.choix
      ? `<div class="champ">
           <label>${enrichir(c.etiquette)}</label>
           <div class="choix vertical">
             ${c.choix.map((x) => `<button class="option option-douce ${saisie[c.id] === x ? 'actif' : ''}"
                data-decouverte="${echapper(c.id)}" data-valeur="${echapper(x)}">${enrichir(x)}</button>`).join('')}
           </div>
         </div>`
      : `<div class="champ">
           <label for="c-${echapper(c.id)}">${enrichir(c.etiquette)}${c.unite ? ` (en ${echapper(c.unite)})` : ''}</label>
           <div class="champ-saisie">
             <button type="button" class="signe" data-signe="${echapper(c.id)}" aria-label="Changer le signe">±</button>
             <input id="c-${echapper(c.id)}" data-champ="${echapper(c.id)}" type="text"
                    inputmode="decimal" autocomplete="off" spellcheck="false"
                    value="${echapper(saisie[c.id] ?? '')}">
           </div>
         </div>`)).join('');

  return `
    <section class="carte">
      <h2>${echapper(d.titre)}</h2>
      ${d.texte ? paragraphes(d.texte) : ''}
      ${figures(d.figures)}
      ${d.releve.length ? `<ul class="releve">${d.releve.map((r) => `<li>${echapper(r)}</li>`).join('')}</ul>` : ''}
      ${d.observations.length ? `
        <div class="observations">
          ${d.observations.map((l) => `
            <div class="observation">
              <span class="observation-quoi">${enrichir(l.observation)}</span>
              <span class="observation-resultat">${enrichir(l.resultat)}</span>
            </div>`).join('')}
        </div>` : ''}

      ${d.questions.map((q) => `
        <p class="consigne">${enrichir(q.texte)}</p>
        ${q.note ? `<p class="note">${enrichir(q.note)}</p>` : ''}`).join('')}
      ${champs}

      ${vue.ouverte ? `
        ${d.apres.map(([titre, texte]) => `
          <div class="conclusion">
            <h3>${echapper(titre)}</h3>
            ${paragraphes(texte)}
          </div>`).join('')}
        ${p ? `<div class="controle">
            <p><strong>La phrase qu'on entend souvent —</strong> « ${echapper(p.enonceEleve)} »</p>
          </div>` : ''}
        <button class="principal" data-action="section-suivante">Passer au cours</button>`
      : `<p class="${vue.engagementManquant ? 'verdict-suspendu' : engage ? 'aide' : 'a-brancher'}">${
          vue.engagementManquant
            ? "Il manque ta prédiction. Écris-la — même si tu n'es pas sûr, c'est justement le moment de ne pas l'être."
            : !d.engagementDemande
              ? "Réponds d'abord dans ta tête ou sur ton cahier : ce qui suit ne vaut que si tu t'es engagé avant de le lire."
              : engage
                ? "Ta prédiction sera figée : tu pourras la comparer à ce qui s'est vraiment passé."
                : "Écris d'abord ta prédiction. Ce qui suit ne vaut que si tu t'es engagé avant de le lire."}</p>
         <button class="principal" data-action="ouvrir">Voir ce qui s'est passé</button>`}
    </section>`;
}

function vueCours(brut) {
  const c = normaliserCours(brut);
  return `
    <section class="carte">
      ${c.titre ? `<h2>${echapper(c.titre)}</h2>` : ''}
      ${figure(c.figure)}
      ${c.blocs.map((b) => `
        <div class="bloc bloc-${echapper(b.type ?? 'point')}">
          ${b.type && NOM_DU_BLOC[b.type]
            ? `<p class="bloc-type">${NOM_DU_BLOC[b.type]}${b.titre ? ` — ${echapper(b.titre)}` : ''}</p>`
            : b.titre ? `<p class="bloc-titre">${echapper(b.titre)}</p>` : ''}
          ${paragraphes(b.texte)}
        </div>`).join('')}
      ${c.aRetenir ? `<div class="a-retenir">${paragraphes(c.aRetenir)}</div>` : ''}
      <button class="principal" data-action="section-suivante">J'ai lu</button>
    </section>`;
}

function vueMethode(brut) {
  const m = normaliserMethode(brut);
  const p = m.piege ? PIEGES[m.piege] : null;
  return `
    <section class="carte">
      <h2>${echapper(m.titre)}</h2>
      ${m.enonce ? `<p class="methode-enonce">${enrichir(m.enonce)}</p>` : ''}
      ${figure(m.figure)}
      <ol class="etapes">
        ${m.etapes.map((e) => `
          <li>
            ${e.titre ? `<span class="etape-titre">${enrichir(e.titre)}</span>` : ''}
            ${e.texte ? `<span class="etape-texte">${enrichir(e.texte)}</span>` : ''}
            ${e.redaction ? `<span class="etape-redaction">${enrichir(e.redaction)}</span>` : ''}
            ${e.note ? `<span class="etape-note">${enrichir(e.note)}</span>` : ''}
          </li>`).join('')}
      </ol>
      ${m.controle ? `<div class="controle">
        <p><strong>Le contrôle —</strong></p>
        ${paragraphes(m.controle)}
      </div>` : ''}
      ${m.erreurAttendue ? `<p class="note">${enrichir(m.erreurAttendue)}</p>` : ''}
      ${m.tolerance ? `<p class="note">${enrichir(m.tolerance)}</p>` : ''}
      ${p && !m.controle ? `<p class="note">L'erreur visée : « ${echapper(p.enonceEleve)} »</p>` : ''}
      <button class="principal" data-action="section-suivante">M'entraîner</button>
    </section>`;
}

// ════════════════════════════════════════════════════════════════════════════
// Un item : saisie, verdict, dialogue
// ════════════════════════════════════════════════════════════════════════════

/**
 * La zone de réponse.
 *
 * Deux règles ont décidé de sa forme, et elles n'ont pas bougé :
 *
 *   · **On ne montre que du français écrit par un auteur.** Les objets formels
 *     du corpus portent des identifiants — `melange-heterogene`,
 *     `suivre-la-temperature-pendant-tout-le-changement-d-etat`. Ce sont des
 *     CLÉS. `lexique.js` en traduit les jeux fermés (les `choixPossibles`) et
 *     REFUSE ce qu'il ne connaît pas ; les objets à composer — classements,
 *     grilles de particules, remises en ordre — restent inertes et le disent.
 *   · **La réponse ne doit jamais fuiter.** Les justifications d'un double QCM
 *     sont mélangées par une graine tirée de l'identifiant de l'item, donc
 *     stables au re-rendu ; et l'ordre des `choixPossibles` est celui du
 *     contenu, jamais retrié par nous.
 *
 * Le champ qui décide de la forme est `reponse`, jamais la figure : six items de
 * lecture graphique sur vingt-et-un demandent « corps pur ou mélange ? » et
 * recevraient un champ numérique si l'on déduisait la forme du dessin.
 */
function zoneDeReponse(item) {
  const s = vue.saisie ?? {};
  switch (sorteDeReponse(item)) {
    case 'valeur': return champValeurEtUnite(s);
    // Le symbole d'un élément : ni clavier numérique, ni bouton ±. La casse
    // compte — « Co » et « CO » ne désignent pas la même chose — donc rien ici
    // ne la corrige à la place de l'élève, et l'autocapitalisation est coupée.
    //
    // Le champ d'unité RESTE, et ce n'est pas un reste de copier-coller : les
    // trois énoncés concernés écrivent « écris le symbole, puis coche sans
    // unité ». Un énoncé qui désigne un contrôle absent de l'écran est un
    // énoncé faux, et c'est aussi le seul endroit du corpus où le troisième
    // état du champ d'unité est demandé pour lui-même.
    case 'symbole': return `
      <div class="champs-ligne">
        <div class="champ">
          <label for="c-symbole">Le symbole</label>
          <div class="champ-saisie">
            <input id="c-symbole" data-champ="symbole" type="text" autocomplete="off"
                   autocapitalize="off" spellcheck="false" maxlength="3"
                   value="${echapper(s.symbole ?? '')}">
          </div>
        </div>
        ${champUnite(s)}
      </div>`;
    case 'double-qcm': return zoneDoubleQcm(item, s);
    case 'choix': return zoneChoix(item, s);
    case 'libre': return `
      <div class="champ">
        <label for="c-libre">Ta réponse, en une ou deux phrases</label>
        <textarea id="c-libre" data-champ="libre" rows="4" spellcheck="true">${echapper(s.libre ?? '')}</textarea>
      </div>`;
    default: return `
      <p class="a-brancher">Cette question demande de composer un objet — un classement, une
        grille de particules, une remise en ordre. Cette zone-là n'est pas encore branchée :
        cherche la réponse sur ton cahier, puis passe à la suivante.</p>`;
  }
}

/**
 * Valeur et unité — avec les TROIS états du champ d'unité.
 *
 * « Sans unité » est un bouton à part et non un champ vide : c'est ce qui
 * distingue le refus légitime (une réponse adimensionnée) de l'oubli. Le champ
 * d'unité se désactive quand il est enfoncé, pour qu'aucune saisie ne survive à
 * un choix qui la contredit.
 */
function champValeurEtUnite(s) {
  return `
    <div class="champs-ligne">
      <div class="champ">
        <label for="c-valeur">Ta réponse</label>
        <div class="champ-saisie">
          <button type="button" class="signe" data-signe="valeur" aria-label="Changer le signe">±</button>
          <input id="c-valeur" data-champ="valeur" type="text" inputmode="decimal"
                 autocomplete="off" spellcheck="false" value="${echapper(s.valeur ?? '')}">
        </div>
      </div>
      ${champUnite(s)}
    </div>`;
}

/** Le champ d'unité et son troisième état, écrits une seule fois : la réponse
 *  chiffrée et la réponse symbolique le partagent, et deux copies de ce bloc
 *  finiraient par ne plus poser la même question. */
function champUnite(s) {
  const sansUnite = s.sansUnite === true;
  return `
    <div class="champ">
      <label for="c-unite">Son unité</label>
      <div class="champ-saisie">
        <input id="c-unite" data-champ="unite" type="text" autocomplete="off" spellcheck="false"
               placeholder="g/L, °C, min…" value="${echapper(sansUnite ? '' : (s.unite ?? ''))}"
               ${sansUnite ? 'disabled' : ''}>
      </div>
      <button type="button" class="bascule ${sansUnite ? 'actif' : ''}" data-action="sans-unite"
              aria-pressed="${sansUnite}">ma réponse n'a pas d'unité</button>
    </div>`;
}

/** Les propositions d'un item à choix. Refusées EN BLOC si le lexique en ignore
 *  une : en afficher trois sur quatre donnerait la réponse par élimination. */
function zoneChoix(item, s) {
  const cles = item.reponse?.choixPossibles ?? [];
  const inconnues = clesInconnues(cles);
  if (inconnues.length) {
    return `<p class="a-brancher">Il manque le libellé de ${inconnues.length} proposition(s)
      de cette question. On préfère te le dire plutôt que t'afficher un mot mal écrit —
      passe à la suivante.</p>`;
  }
  return `
    <div class="choix vertical">
      ${cles.map((c) => `
        <button class="option option-douce ${s.choix === c ? 'actif' : ''}"
                data-choix="${echapper(c)}">${echapper(libelle(c))}</button>`).join('')}
    </div>`;
}

/**
 * Le double QCM — réponse PUIS justification, et jamais dans l'autre sens.
 *
 * La justification n'apparaît qu'une fois la réponse choisie, et la réponse est
 * alors FIGÉE. Les montrer ensemble laisserait l'élève lire les justifications
 * pour en déduire la réponse : c'est exactement le raisonnement qu'on cherche à
 * observer, et on l'aurait fourni.
 */
function zoneDoubleQcm(item, s) {
  if (!s.choix) return zoneChoix(item, s);
  const justifications = melanger(item.justifications ?? [], item.id);
  return `
    <div class="reponse-figee">
      <span>Ta réponse</span><strong>${echapper(libelle(s.choix) ?? s.choix)}</strong>
    </div>
    <p class="consigne">Maintenant, choisis la phrase qui dit pourquoi.</p>
    <div class="choix vertical">
      ${justifications.map((j) => `
        <button class="option option-douce ${s.justification === j.id ? 'actif' : ''}"
                data-justification="${echapper(j.id)}">${enrichir(j.texte)}</button>`).join('')}
    </div>`;
}

function vueItem(lot) {
  const item = lot[vue.index];
  if (!item) return '<section class="carte"><p>Rien à afficher.</p></section>';
  if (vue.etape) return vueRetour(item, lot);

  const prediction = estAPredictionVerrouillee(item);
  const composable = sorteDeReponse(item) === 'objet-formel';

  // Aucun bouton désactivé ici non plus : `corriger` rend déjà `redemande` sur
  // une réponse incomplète, avec la phrase qui dit ce qui manque. Un bouton
  // grisé, lui, se calcule au rendu et ne sait rien de ce qui a été tapé depuis.
  return `
    <section class="carte">
      <p class="progression">${vue.index + 1} / ${lot.length}${prediction ? ' · prédiction' : ''}</p>
      ${figure(item.figure)}
      <p class="enonce">${enonce(item)}</p>
      ${prediction ? `<p class="consigne">Écris ta prédiction. Elle sera <strong>verrouillée</strong> :
        tu ne pourras plus la changer, et c'est le seul moyen que ce qui suit t'apprenne
        quelque chose.</p>` : ''}
      ${zoneDeReponse(item)}
      ${vue.redemande ? `<p class="verdict-suspendu">${echapper(vue.redemande.message)}</p>` : ''}
      ${composable
        ? `<button class="principal" data-action="item-suivant">Question suivante</button>`
        : `<button class="principal" data-action="${prediction ? 'verrouiller' : 'verifier'}">
             ${prediction ? 'Verrouiller ma prédiction' : 'Vérifier'}
           </button>`}
    </section>`;
}

// ── Le retour : verdict, puis dialogue ──────────────────────────────────────

function vueRetour(item, lot) {
  const r = vue.retour;
  const progression = `<p class="progression">${vue.index + 1} / ${lot.length}</p>`;

  if (vue.etape === 'verrouille') return vueVerrou(item, progression);
  if (vue.etape === 'auto') return vueAutoEvaluation(item, r, progression);
  if (vue.etape === 'pourquoi') return vuePourquoi(r);
  if (vue.etape === 'raison') return vueRaison(item, r);
  if (vue.etape === 'inconnu') return vueErreurNonPrevue(item, r, progression);

  // ── Le verdict juste ─────────────────────────────────────────────────────
  //
  // `UNITE_NON_DEMANDEE` est ici, et pas du côté des erreurs : l'élève qui
  // répond 2 700 kg/m³ quand on demandait des g/cm³ A RAISON. On compte réussi
  // et on dit simplement l'unité attendue. Le refuser punirait un élève qui a
  // raison — sauf sur les trois savoir-faire où la conversion EST le
  // savoir-faire, et c'est `unites.js` qui le sait, pas cet écran.
  return `
    <section class="carte">
      ${progression}
      <p class="verdict-juste">C'est juste.</p>
      ${r.code === VERDICTS.UNITE_NON_DEMANDEE
        ? `<p class="explication">${echapper(r.message)}</p>` : ''}
      ${r.quadrant?.reponseJuste && r.quadrant?.justificationJuste
        ? `<p class="explication">${echapper(r.message)}</p>` : ''}
      <button class="principal" data-action="item-suivant">Continuer</button>
    </section>`;
}

/** La prédiction figée. Rien du résultat n'est dans cette page — c'est la seule
 *  garantie qui compte, et elle se vérifie en lisant ce gabarit. */
function vueVerrou(item, progression) {
  const s = saisiePourCorrection();
  return `
    <section class="carte">
      ${progression}
      <div class="prediction-verrouillee">
        <p class="prediction-titre">Ta prédiction, verrouillée</p>
        <p class="prediction-ligne"><strong>${echapper(reponseDeLEleveEnTexte(item, s))}</strong></p>
      </div>
      <p class="aide">Tu t'es engagé. Ce qui vient maintenant a une chance de te surprendre —
        c'est fait pour.</p>
      <button class="principal" data-action="ouvrir-resultat">Voir ce qui s'est passé</button>
    </section>`;
}

/**
 * L'auto-évaluation d'une réponse rédigée.
 *
 * Le moteur ne corrige pas une rédaction et ne prétend pas le faire : ces items
 * sont de classe C, relus à la main par un auteur. On montre ce qu'on attendait
 * et on demande à l'élève de se prononcer — c'est déclaré, et l'écran le dit.
 */
function vueAutoEvaluation(item, r, progression) {
  return `
    <section class="carte">
      ${progression}
      <p class="consigne">Personne ne corrige une phrase à ta place ici. Compare ce que tu as
        écrit avec les trois choses qu'on attendait, et dis franchement où tu en es.</p>
      <div class="a-retenir">
        <ul class="attendus">
          ${(r.elementsAttendus ?? []).map((e) => `<li>${enrichir(e)}</li>`).join('')}
        </ul>
      </div>
      <div class="choix vertical">
        <button class="option option-douce" data-noter="oui">J'avais tout ça</button>
        <button class="option option-douce" data-noter="non">Il me manquait quelque chose</button>
      </div>
    </section>`;
}

/**
 * « Pourquoi as-tu répondu ça ? »
 *
 * On ne sert pas une correction : on demande. Les options sont celles du piège
 * — des raisonnements écrits, documentés, qu'un élève reconnaît — et l'une
 * d'elles est toujours « j'ai répondu au hasard », parce que c'est souvent vrai
 * et que faire semblant du contraire ferait servir une explication à quelqu'un
 * qui n'a rien pensé.
 */
function vuePourquoi(r) {
  const p = PIEGES[r.piege];
  return `
    <section class="carte">
      ${enteteDuVerdict(r)}
      <p class="consigne">Avant la correction : pourquoi as-tu répondu ça ?</p>
      <div class="choix vertical">
        ${(p?.raisonnements ?? []).map((x, i) => `
          <button class="option option-douce" data-raison="${i}">${echapper(x.texte)}</button>`).join('')}
      </div>
    </section>`;
}

/**
 * Le titre du verdict — et le seul endroit où les quatre états du double QCM se
 * traduisent en mots.
 *
 * « Ce n'est pas ça » est FAUX sur un juste/faux : l'élève a trouvé la valeur.
 * Le lui dire quand même annulerait ce que la séparation des quatre états a
 * coûté au moteur, et lui apprendrait qu'une bonne réponse peut être comptée
 * fausse — c'est-à-dire exactement le contraire de ce qu'on veut lui enseigner
 * sur le rapport entre une réponse et sa raison.
 */
function enteteDuVerdict(r) {
  const titre = r.issue === 'reussite-sans-justification'
    ? '<p class="verdict-nuance">Ta réponse est juste.</p>'
    : '<p class="verdict-faux">Ce n\'est pas ça.</p>';
  // Le message du moteur est imprimé ICI et nulle part ailleurs. Il l'était à
  // deux endroits — dans l'en-tête et dans l'écran d'erreur non prévue —, et
  // « ton raisonnement était le bon » s'affichait deux fois de suite.
  return `${titre}${r.message ? `<p class="explication">${echapper(r.message)}</p>` : ''}`;
}

/**
 * Les deux phrases qui sont vraies de TOUTES les conceptions du catalogue.
 *
 * La première : la conception de l'élève prédit correctement la quasi-totalité
 * de sa vie quotidienne. C'est ce qui la rend solide, et c'est la seule façon
 * honnête d'expliquer pourquoi il l'a construite.
 *
 * La seconde : il devra apprendre à l'INHIBER, pas à l'oublier. L'imagerie le
 * dit des experts — ils n'ont pas effacé la conception, ils activent plus que
 * les novices leurs régions d'inhibition. C'est aussi ce qui justifie que le
 * moteur ne déclare jamais un piège éteint.
 *
 * ⚠ La première est adaptée aux pièges de CONTRAT, et ce n'est pas une nuance
 * de style : « ta façon de voir marche dans ta vie quotidienne » est faux d'un
 * réflexe scolaire — un élève ne classe pas des expériences par chapitre en
 * dehors de l'école. Ce qui est vrai de ces pièges-là est que le réflexe marche
 * dans presque tout le reste de l'école, et c'est exactement aussi robuste.
 */
const INHIBITION = Object.freeze({
  physique: {
    marche: "Ta façon de voir n'est pas une bêtise, et ce n'est pas un détail : elle donne la "
      + "bonne réponse dans la quasi-totalité de ce que tu vis. C'est pour ça que tu l'as "
      + "construite, et c'est pour ça qu'elle tient.",
    inhiber: "Tu ne vas pas l'oublier — personne ne l'oublie, pas même les physiciens. Ce que "
      + "tu vas apprendre, c'est à la mettre de côté au bon moment. Eux font exactement ça : "
      + "l'idée est toujours là, ils la retiennent.",
  },
  contrat: {
    marche: "Ton réflexe marche presque partout à l'école : la question posée pendant un "
      + "chapitre porte d'habitude sur ce chapitre, et les données d'un énoncé servent "
      + "d'habitude toutes. Tu as raison de l'avoir pris.",
    inhiber: "Tu ne vas pas le désapprendre — il te fait gagner du temps le reste du temps. "
      + "Tu vas apprendre à le suspendre quand la question ne dit pas de quoi elle parle.",
  },
});

/** La troisième phrase — « des savants l'ont cru » — n'est servie QUE si le
 *  piège porte un `antecedentHistorique`. Deux en portent un. Les autres n'ont
 *  aucune filiation documentée, et l'inventer serait fabriquer de l'histoire des
 *  sciences sur un projet dont le différenciant est de dire ce qui est vrai. */
function blocInhibition(p) {
  if (!p) return '';
  const t = INHIBITION[p.famille === 'contrat' ? 'contrat' : 'physique'];
  const h = p.antecedentHistorique;
  return `
    <div class="inhibition">
      <p>${echapper(t.marche)}</p>
      <p>${echapper(t.inhiber)}</p>
      ${h ? `<p class="antecedent">${enrichir(h.texte)}
        <span class="source">${echapper(h.source)}</span></p>` : ''}
    </div>`;
}

/**
 * La réponse au raisonnement choisi — et tout ce que le piège porte.
 *
 * L'ordre n'est pas décoratif :
 *   ① ce que l'élève a coché reçoit une réponse, à lui, pas à l'erreur en
 *     général (ou celle de Merlin, s'il répond) ;
 *   ② les deux phrases toujours vraies, plus l'antécédent historique quand il
 *     existe ;
 *   ③ le CONTRE-MODÈLE EXÉCUTÉ : son propre modèle tourne sous ses yeux et
 *     rend un nombre. Le verdict n'est pas rédigé, il est calculé ;
 *   ④ la règle, qui contredit la conception ;
 *   ⑤ le GESTE DE CONTRÔLE — celui qui distingue l'application d'un
 *     exerciseur : quelque chose qu'il puisse refaire seul, sans nous.
 */
function vueRaison(item, r) {
  const p = PIEGES[r.piege];
  const attente = vue.merlin === 'attente';
  const repondu = vue.merlin && !attente;

  const explication = attente
    ? `<p class="reflexion">Merlin réfléchit<span class="points"><span>.</span><span>.</span><span>.</span></span></p>`
    : repondu
      ? `<p class="reponse-merlin">${echapper(vue.merlin.explication)}</p>`
      : `<p class="reponse-raison">${echapper(p?.raisonnements?.[vue.raison]?.reponse ?? '')}</p>`;

  return `
    <section class="carte">
      ${explication}
      ${attente ? '' : `
        ${blocInhibition(p)}
        ${vueContreModele(item, r, p)}
        ${p?.regle ? `<div class="regle"><p><strong>Ce qui est vrai —</strong></p>${paragraphes(p.regle)}</div>` : ''}
        <div class="controle">
          <p><strong>Le geste de contrôle —</strong> à refaire seul, en devoir, sans nous :</p>
          ${paragraphes(repondu && vue.merlin.geste ? vue.merlin.geste : p?.controle)}
        </div>
        ${repondu ? vueChat() : (merlinAutorise() ? '<button class="secondaire" data-action="demander-merlin">🎩 Demander à Merlin</button>' : '')}
        <button class="principal" data-action="item-suivant">Continuer</button>`}
    </section>`;
}

/**
 * Le contre-modèle EXÉCUTÉ.
 *
 * Quand aucun constat n'est possible — on ne peut pas faire constater à l'écran
 * que rien ne sort de l'œil — on exécute le modèle de l'élève et on montre ce
 * qu'il PRÉDIRAIT. Le modèle est un objet du contenu : son verdict n'est donc
 * pas rédigé à la main, il est calculé, et le texte ne peut pas promettre un
 * écart que les nombres affichés ne portent pas.
 *
 * Deux sources, dans cet ordre :
 *   · le `modeleErrone` du distracteur touché — une chaîne de calcul rejouée
 *     par le MÊME évaluateur que la correction. C'est la forme la plus forte :
 *     le nombre affiché est exactement celui que l'élève vient d'écrire ;
 *   · le `contreModele` du piège — fonction exécutable, table d'exécution déjà
 *     écrite, ou dispositif à prédiction verrouillée selon la famille.
 *
 * Un refus d'exécution ne se maquille pas : si la situation de l'item ne porte
 * pas les grandeurs que le modèle attend, on sert le texte SANS les nombres.
 * Afficher « selon toi : NaN g » aurait l'air d'avoir exécuté quelque chose.
 */
function vueContreModele(item, r, p) {
  const blocs = [];

  const d = distracteurTouche(item, saisiePourCorrection());
  const rejeu = d ? executerModeleErrone(item, d) : { ok: false };
  if (rejeu.ok) {
    blocs.push(`
      <div class="contre-modele">
        <p class="contre-modele-titre">Ton modèle, exécuté</p>
        ${rejeu.nom ? `<p class="note">${echapper(rejeu.nom)}</p>` : ''}
        <p class="contre-modele-chiffres">
          <span>selon ton raisonnement <strong>${echapper(rejeu.selonToi)} ${echapper(rejeu.unite)}</strong></span>
          <span>ce qu'on mesure <strong>${echapper(rejeu.mesure)} ${echapper(rejeu.unite)}</strong></span>
        </p>
      </div>`);
  }

  const cm = contreModeleDe(p);
  if (cm) {
    const execute = executerContreModele(p, item.situation);
    const lignes = execute.ok
      ? `<p class="contre-modele-chiffres">${Object.entries(execute.sortie)
        .map(([k, v]) => `<span>${echapper(k)} <strong>${echapper(String(v))}</strong></span>`).join('')}</p>`
      : cm.sorte === 'table'
        ? `<ul class="contre-modele-cas">${cm.execution.map((e) => `
            <li><span class="cas-situation">${enrichir(e.situation)}</span>
              <span class="cas-prediction">Ton modèle : ${enrichir(e.predictionDuModele)}</span>
              <span class="cas-resultat">${enrichir(e.resultat)}</span></li>`).join('')}</ul>`
        : cm.sorte === 'dispositifs'
          ? `<ul class="contre-modele-cas">${cm.executions.map((e) => `
              <li><span class="cas-situation">${enrichir(e.contexteDeSurface ?? e.id)}</span>
                <span class="cas-prediction">Ton modèle : ${enrichir(e.predictionDuModele)}</span>
                <span class="cas-resultat">${enrichir(e.ceQuiSePasse)}</span>
                ${e.conflit ? `<span class="cas-conflit">${enrichir(e.conflit)}</span>` : ''}</li>`).join('')}</ul>`
          : `<p class="note">Ce modèle se calcule, mais cette question ne décrit pas les
              grandeurs qu'il demande : on ne t'affiche pas des nombres inventés.</p>`;

    blocs.push(`
      <div class="contre-modele">
        <p class="contre-modele-titre">Si ton modèle était vrai</p>
        ${cm.enonce ? `<p>${enrichir(cm.enonce)}</p>` : ''}
        ${lignes}
        ${cm.verdict ? paragraphes(cm.verdict) : ''}
      </div>`);
  }

  return blocs.join('');
}

/**
 * L'erreur qu'on n'avait pas prévue.
 *
 * On ne devine pas la conception : aucun distracteur n'a été touché et l'item ne
 * déclare pas de piège. Servir l'explication d'un piège au hasard donnerait un
 * conseil à l'envers — c'est exactement le cas où Merlin sert le plus, et où
 * l'application, sans clé, se contente de montrer la correction.
 */
function vueErreurNonPrevue(item, r, progression) {
  const attente = vue.merlin === 'attente';
  const repondu = vue.merlin && !attente;
  return `
    <section class="carte">
      ${progression}
      ${enteteDuVerdict(r)}
      ${r.correction ? `<p class="correction">La réponse était
        <strong>${echapper(libelle(r.correction) ?? r.correction)}</strong>.</p>` : ''}
      ${vueContreModele(item, r, PIEGES[item.piege] ?? null)}
      ${attente
        ? `<p class="reflexion">Merlin réfléchit<span class="points"><span>.</span><span>.</span><span>.</span></span></p>`
        : repondu
          ? `<p class="reponse-merlin">${echapper(vue.merlin.explication)}</p>
             <div class="controle"><p><strong>Le geste de contrôle —</strong> ${echapper(vue.merlin.geste)}</p></div>
             ${vueChat()}`
          : merlinAutorise()
            ? '<button class="secondaire" data-action="demander-merlin">🎩 Demander à Merlin</button>'
            : ''}
      ${attente ? '' : '<button class="principal" data-action="item-suivant">Continuer</button>'}
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

// ── La séance ───────────────────────────────────────────────────────────────

function vueSeance() {
  const s = vue.seance;
  if (s.refus) {
    return `
      <header class="entete-section">
        <button class="retour" data-action="chapitres">← Tous les chapitres</button>
        <h1>Séance impossible</h1>
      </header>
      <section class="carte">
        <p>Le moteur a refusé de composer une séance plutôt que d'en composer une au hasard.</p>
        <ul class="attendus">${(s.refus.manques ?? []).map((m) => `<li>${echapper(m)}</li>`).join('')}</ul>
        <button class="principal" data-action="chapitres">Revenir aux chapitres</button>
      </section>`;
  }

  const item = s.items[vue.index];
  const place = vue.index < s.rituel.length
    ? 'Le rituel de contrôle'
    : (s.reconfrontation && item === s.reconfrontation.item)
      ? 'Une conception déjà croisée'
      : 'Le chapitre en cours';

  return `
    <header class="entete-section">
      <button class="retour" data-action="chapitres">← Quitter la séance</button>
      <p class="surtitre" style="margin-top:10px">Séance n° ${s.numeroSeance} · ${echapper(place)}</p>
      <h1>${echapper(SAVOIR_FAIRE_PAR_ID[item.sfPrincipal]?.titre ?? item.sfPrincipal)}</h1>
    </header>
    ${vueItem(s.items)}`;
}

/**
 * Le bilan de séance — et le compte rendu des arbitrages, replié.
 *
 * `seance.js` ne compose pas en silence : il déclare ce qu'il a sacrifié et
 * pourquoi. Ce compte rendu n'est pas fait pour un élève de treize ans, mais le
 * cacher entièrement reviendrait à ce que personne ne le lise jamais — il est
 * donc là, replié, en français.
 */
function vueBilan() {
  const s = vue.seanceFinie;
  const b = vue.bilan;
  const reserves = (s.compteRendu?.reserves ?? []).filter((r) => r.code !== 'FILE_DE_PIEGES_VIDE');
  // `non-programme` est le motif de tous les pièges que la progression n'a pas
  // encore introduits — trente et un d'entre eux à la première séance. C'est un
  // écart parfaitement normal, et le lister d'abord noierait les motifs qui
  // disent quelque chose. Il passe donc en dernier, et le repli en montre six.
  const sacrifices = [...(s.compteRendu?.sacrifices ?? [])]
    .sort((a, b) => Number(a.motif === 'non-programme') - Number(b.motif === 'non-programme'))
    .slice(0, 6);
  return `
    <header class="entete">
      <p class="surtitre">Séance n° ${s.numeroSeance}</p>
      <h1>C'est fini pour aujourd'hui</h1>
    </header>
    <section class="carte">
      <p class="bilan-chiffres">
        <span><strong>${b.reussites}</strong> réussite${b.reussites > 1 ? 's' : ''}</span>
        <span><strong>${b.echecs}</strong> erreur${b.echecs > 1 ? 's' : ''}</span>
        ${b.sansJustification
          ? `<span><strong>${b.sansJustification}</strong> bonne${b.sansJustification > 1 ? 's' : ''} réponse${b.sansJustification > 1 ? 's' : ''} avec la mauvaise raison</span>`
          : ''}
      </p>
      ${b.sansJustification ? `<p class="note">Une bonne réponse pour une mauvaise raison ne te fait
        pas redescendre d'un cran : c'est le raisonnement qu'on te reproposera, pas la valeur.</p>` : ''}
      <p class="note">Les conceptions que tu as croisées reviendront — pas parce que tu les as
        ratées, mais parce qu'aucune ne s'éteint. C'est vrai aussi chez les physiciens.</p>
      <button class="principal" data-action="chapitres">Revenir aux chapitres</button>
    </section>

    <details class="repli">
      <summary>Sous le capot : comment cette séance a été composée</summary>
      <ul>
        <li>Durée estimée : ${s.cout.total} dixièmes de minute
          (rituel ${s.cout.rituel}, cœur ${s.cout.coeur}, reprise ${s.cout.reconfrontation}).</li>
        <li>Re-confrontation : ${s.reconfrontation
          ? `« ${echapper(s.reconfrontation.piege)} »${s.reconfrontation.contexteDejaVu ? ', dans un décor déjà vu' : ''}`
          : 'aucune — voir les motifs ci-dessous'}.</li>
        ${reserves.map((r) => `<li>${echapper(r.message)}</li>`).join('')}
        ${sacrifices.map((x) => `
          <li>« ${echapper(x.quoi)} » non servi — motif ${echapper(x.motif)}${x.detail ? ` : ${echapper(x.detail)}` : ''}.</li>`).join('')}
      </ul>
      ${(profil.anomalies ?? []).length ? `<ul>${profil.anomalies.map((a) => `
        <li>⚠ ${echapper(a.code)} — ${echapper(a.message)}</li>`).join('')}</ul>` : ''}
    </details>`;
}

// ── Les réglages de Merlin ──────────────────────────────────────────────────

/**
 * La clé d'API, saisie sur CET appareil et nulle part ailleurs.
 *
 * Sans clé, l'application est entièrement jouable : les explications préécrites
 * du catalogue prennent le relais, et elles sont écrites pour cela. Merlin ne
 * remplace jamais une explication manquante — il remplace une explication
 * générale par une réponse au raisonnement précis de l'élève.
 */
function vueReglages() {
  const c = merlin.configIA();
  const f = merlin.FOURNISSEURS[c.fournisseur] ?? merlin.FOURNISSEURS.anthropic;
  const cout = merlin.lireCout();
  return `
    <header class="entete-section">
      <button class="retour" data-action="chapitres">← Tous les chapitres</button>
      <h1>Merlin</h1>
    </header>
    <section class="carte">
      <p>Merlin répond à ta façon de raisonner, pas à l'erreur en général. Il a besoin d'une
        clé, saisie ici, qui reste sur cet appareil et n'est envoyée qu'au fournisseur.</p>
      <p class="note">Sans clé, tout marche quand même : les explications du catalogue,
        les contre-modèles et les gestes de contrôle sont écrits d'avance.</p>

      <p class="consigne">Fournisseur</p>
      <div class="choix">
        ${Object.entries(merlin.FOURNISSEURS).map(([id, x]) => `
          <button class="option ${c.fournisseur === id ? 'actif' : ''}" data-fournisseur="${id}">${x.nom}</button>`).join('')}
      </div>

      <p class="consigne">Modèle</p>
      <div class="choix vertical">
        ${f.modeles.map((m) => `
          <button class="option option-douce ${(c.modele || f.modeles[0].id) === m.id ? 'actif' : ''}"
                  data-modele="${echapper(m.id)}">${echapper(m.libelle)}</button>`).join('')}
      </div>

      <div class="champ">
        <label for="c-cle">Ta clé (${echapper(f.console)})</label>
        <div class="champ-saisie">
          <input id="c-cle" data-champ="cle" type="password" autocomplete="off" spellcheck="false"
                 placeholder="${c.cles?.[c.fournisseur] ? 'clé enregistrée' : 'colle ta clé ici'}">
        </div>
      </div>
      <button class="principal" data-action="enregistrer-cle">Enregistrer et vérifier</button>
      ${vue.verif ? `<p class="${vue.verif.ok ? 'verdict-juste' : 'verdict-faux'}">${
        echapper(vue.verif.ok ? 'La clé répond. Merlin est prêt.' : vue.verif.message)}</p>` : ''}
      ${vue.verifEnCours ? '<p class="reflexion">Vérification…</p>' : ''}

      <p class="note" style="margin-top:18px">Ce que Merlin a coûté jusqu'ici :
        ${cout.appels} appel(s), ${cout.entree} jetons en entrée, ${cout.sortie} en sortie
        (${cout.cache} lus en cache).</p>
    </section>`;
}

// ════════════════════════════════════════════════════════════════════════════
// Les interactions
// ════════════════════════════════════════════════════════════════════════════

const majSaisie = (id, valeur) => {
  vue.saisie = { ...(vue.saisie ?? {}), [id]: valeur };
};

app.addEventListener('click', (e) => {
  const c = e.target.closest(
    '[data-action], [data-chapitre], [data-ouvrir], [data-section], [data-avatar], [data-programme],'
    + ' [data-signe], [data-choix], [data-justification], [data-raison], [data-noter], [data-decouverte],'
    + ' [data-fournisseur], [data-modele]',
  );
  if (!c) return;

  if (c.dataset.avatar) {
    vue = { ...vue, saisie: { ...(vue.saisie ?? {}), avatar: c.dataset.avatar } };
    return rendre();
  }

  // Le clavier numérique des téléphones n'a pas de signe moins, et une
  // température négative se saisit à chaque chapitre de changement d'état.
  if (c.dataset.signe) {
    const champ = app.querySelector(`[data-champ="${c.dataset.signe}"]`);
    if (!champ) return;
    const v = champ.value.trim();
    champ.value = v.startsWith('-') ? v.slice(1) : `-${v}`;
    majSaisie(c.dataset.signe, champ.value);
    return;
  }

  if (c.dataset.chapitre) return ouvrirChapitre(c.dataset.chapitre);
  if (c.dataset.ouvrir) return ouvrirSection(c.dataset.ouvrir);
  if (c.dataset.section) return ouvrirSection(vue.sfId, c.dataset.section);

  if (c.dataset.decouverte) {
    majSaisie(c.dataset.decouverte, c.dataset.valeur);
    return rendre();
  }

  // Un choix se POSE, il ne corrige pas : l'élève doit pouvoir changer d'avis
  // avant de valider. La seule exception est le double QCM, dont le premier
  // temps EST l'engagement — la réponse s'y fige dès qu'elle est touchée, sans
  // quoi les justifications donneraient la réponse à qui les lit d'abord.
  if (c.dataset.choix) {
    majSaisie('choix', c.dataset.choix);
    return rendre();
  }
  if (c.dataset.justification) {
    majSaisie('justification', c.dataset.justification);
    return rendre();
  }

  if (c.dataset.raison != null) {
    vue = { ...vue, etape: 'raison', raison: Number(c.dataset.raison), merlin: null };
    rendre();
    return demanderAMerlin();
  }

  if (c.dataset.noter) return seNoter(c.dataset.noter === 'oui');

  if (c.dataset.programme) {
    definirStatutProgramme(CHAPITRE.id, c.dataset.programme);
    vue = { ecran: 'sommaire' };
    return rendre();
  }

  if (c.dataset.fournisseur) {
    merlin.definirConfig({ fournisseur: c.dataset.fournisseur });
    vue = { ...vue, verif: null, saisie: {} };
    return rendre();
  }
  if (c.dataset.modele) {
    merlin.definirConfig({ modele: c.dataset.modele });
    vue = { ...vue, verif: null };
    return rendre();
  }

  switch (c.dataset.action) {
    case 'chapitres': vue = { ecran: 'chapitres' }; return rendre();
    case 'sommaire': vue = { ecran: 'sommaire' }; return rendre();
    case 'programme': vue = { ecran: 'programme' }; return rendre();
    case 'reglages': vue = { ecran: 'reglages', saisie: {} }; return rendre();
    case 'seance': return demarrerSeance();
    case 'ouvrir': return ouvrirLaDecouverte();
    case 'section-suivante': return sectionSuivante();
    case 'item-suivant': return itemSuivant();
    case 'verifier': return verifier();
    case 'verrouiller': return verrouillerPrediction();
    case 'ouvrir-resultat': return ouvrirLeResultat();
    case 'demander-merlin': return demanderAMerlin();
    case 'sans-unite':
      // Le troisième état du champ d'unité. Il EFFACE la saisie plutôt que de
      // la garder en réserve : « sans unité » et « g/cm³ » ne peuvent pas être
      // vrais tous les deux, et une valeur cachée qui ressort au décochage est
      // une réponse que l'élève n'a pas relue.
      vue = { ...vue, saisie: { ...(vue.saisie ?? {}), sansUnite: !(vue.saisie?.sansUnite), unite: '' } };
      return rendre();
    case 'enregistrer-cle': return enregistrerCle();
    case 'installer': {
      const p = (vue.saisie?.prenom ?? '').trim();
      if (!p) return;
      definirEleve(p, vue.saisie?.avatar ?? AVATARS[0]);
      vue = { ecran: 'chapitres' };
      return rendre();
    }
  }
});

async function enregistrerCle() {
  const cle = (vue.saisie?.cle ?? '').trim();
  if (cle) merlin.definirConfig({ cle });
  const c = merlin.configIA();
  vue = { ...vue, verifEnCours: true, verif: null, saisie: { ...(vue.saisie ?? {}), cle: '' } };
  rendre();
  const r = await merlin.verifierReglages({
    fournisseur: c.fournisseur,
    cle: c.cles[c.fournisseur] ?? '',
    modele: c.modele,
  });
  vue = { ...vue, verifEnCours: false, verif: r };
  rendre();
}

app.addEventListener('input', (e) => {
  const champ = e.target.dataset.champ;
  if (champ) {
    // Aucun re-rendu ici : re-dessiner à chaque frappe ferait perdre le curseur.
    // Ce qui est tapé est mémorisé, et le prochain rendu le restitue.
    if (champ === 'prenom') vue = { ...vue, saisie: { ...(vue.saisie ?? {}), prenom: e.target.value } };
    else majSaisie(champ, e.target.value);
    return;
  }
  if (e.target.hasAttribute('data-champ-chat')) vue.question = e.target.value;
});

app.addEventListener('submit', (e) => {
  if (!e.target.closest('[data-chat]')) return;
  e.preventDefault();
  envoyerQuestion();
});

rendre();
