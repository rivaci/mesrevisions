// La couche de VERDICT — ce qui sépare cette application d'un exerciseur.
//
// Elle prend un item du corpus et ce que l'élève a saisi, et rend un verdict.
// Elle ne dessine rien, ne touche à aucun DOM, n'écrit dans aucun stockage :
// `app.js` fait tout cela. C'est ce qui rend le verdict rejouable sous node —
// `tools/tester-reponse.mjs` fait passer le corpus entier ici sans navigateur.
//
// ── Ce qu'elle ne recalcule pas ─────────────────────────────────────────────
//
// Rien. L'algèbre des unités est dans `unites.js`, les quatre états du double
// QCM dans `srs.js` (`issueDuDoubleQcm`), l'exécution d'une chaîne de calcul
// dans `item.js` (`evaluerCalcul`). Ce module les APPELLE et traduit leur
// sortie en quelque chose qu'un écran sait afficher. Un verdict qui referait sa
// propre comparaison comparerait autre chose que ce que le moteur exécute —
// c'est la règle du projet, et elle a déjà coûté trois réconciliations.
//
// ── Les quatre verdicts, et pourquoi on ne les fond jamais en deux ─────────
//
//   DIMENSION_FAUSSE     « ce que tu as écrit n'est pas une masse volumique,
//                          c'est une masse ». C'est le retour le plus utile du
//                          moteur, et celui qu'aucune plateforme ne donne.
//   UNITE_NON_DEMANDEE   juste, et signalé. 2 700 kg/m³ pour une question posée
//                          en g/cm³ EST une bonne réponse : elle compte réussie,
//                          on dit simplement l'unité attendue. Sauf sur les
//                          trois savoir-faire où la conversion est le
//                          savoir-faire lui-même (`unite: 'imposee'`).
//   VALEUR_FAUSSE        l'échec ordinaire.
//   UNITE_NON_RECONNUE   ni juste ni faux. NE CONSOMME PAS D'ESSAI, ne touche à
//                          aucun état, redemande. Compter faux une faute de
//                          frappe ferait redescendre un palier.
//
// `REPONSE_INCOMPLETE` et `CONTENU_INVALIDE` s'y ajoutent et ne sont pas des
// verdicts de correction : ils disent que la correction n'a PAS EU LIEU. Ils
// ont donc, ici comme dans `unites.js`, `redemande: true`.

import {
  SANS_UNITE,
  VERDICTS,
  analyserUnite,
  comparerReponse,
  etatChampUnite,
  issueDepuisVerdict,
  rationnelDepuisTexte,
} from './unites.js';
import { issueDuDoubleQcm } from './srs.js';
import { evaluerCalcul, dansSonUnite } from './item.js';
import { PARTICULES_MAX, entiteDeLEspece, toleranceDeLecture } from './schema.js';
import {
  auPluriel,
  avecUn,
  identifiantsSansLibelle,
  libelleFormel,
} from './lexique.js';
import { SAVOIR_FAIRE_PAR_ID } from './data/savoir-faire.js';

export { SANS_UNITE, VERDICTS, etatChampUnite };

// ════════════════════════════════════════════════════════════════════════════
// Quelle sorte de réponse un item attend
// ════════════════════════════════════════════════════════════════════════════

/**
 * Les cinq formes de zone de réponse, dans l'ordre où elles se décident.
 *
 * ⚠ L'ordre EST la règle, et il a déjà attrapé une erreur. Une première version
 * déduisait « il faut un champ de valeur » du fait que l'objet formel de la
 * réponse était celui de la figure — vrai sur les vingt-et-un items de lecture
 * graphique. Six de ces vingt-et-un demandent « corps pur ou mélange ? » et
 * recevaient un champ numérique. Le contenu le déclare déjà : ces six-là portent
 * `choix`, les quinze autres `valeur`. On lit ce qui est déclaré au lieu de le
 * deviner à partir du dessin — et c'est pour cela que `objetFormel` est lu EN
 * DERNIER, jamais en premier : quatorze items portent une valeur ET un objet
 * formel, et c'est la valeur qui se saisit.
 *
 * `libre` n'est testé qu'à `=== true` : les items à choix portent tous
 * `libre: false`, et un test de vérité les enverrait tous dans le champ de
 * rédaction.
 */
export const SORTES_DE_REPONSE = Object.freeze([
  'double-qcm', 'valeur', 'symbole', 'choix', 'libre', 'objet-formel',
]);

export function sorteDeReponse(item) {
  const r = item?.reponse ?? {};
  if (item?.type === 'double-qcm') return 'double-qcm';
  if (r.valeur !== undefined) return estUnNombre(r.valeur) ? 'valeur' : 'symbole';
  if (Array.isArray(r.choixPossibles)) return 'choix';
  if (r.libre === true) return 'libre';
  return 'objet-formel';
}

/**
 * La sixième forme, découverte sur le corpus et non sur la charte : `reponse.
 * valeur` vaut `'O'`, `'C'` — le SYMBOLE d'un élément chimique.
 *
 * Elle porte bien une `valeur` et une `unite` (`SANS_UNITE`), et la classer avec
 * les réponses chiffrées servait un clavier numérique et un bouton ± pour écrire
 * « O », puis rendait « Je ne sais pas lire ce nombre » à l'élève qui répondait
 * juste. Le test est fait sur la LECTURE — `rationnelDepuisTexte` rend `null` sur
 * ce qui n'est pas un nombre — et non sur le type JavaScript : `'2,7'` reste une
 * valeur chiffrée, et c'est le même lecteur qui tranche des deux côtés.
 */
const estUnNombre = (v) => (typeof v === 'string' ? rationnelDepuisTexte(v) !== null : true);

/** Un item à prédiction verrouillée : l'élève s'engage AVANT de voir quoi que
 *  ce soit. Le type porte la décision, pas un drapeau de plus. */
export const estAPredictionVerrouillee = (item) => item?.type === 'prediction-engagee';

// ════════════════════════════════════════════════════════════════════════════
// Le verdict
// ════════════════════════════════════════════════════════════════════════════

/**
 * La forme commune de tous les verdicts de ce module.
 *
 *   issue        'reussite' | 'echec' | 'reussite-sans-justification' | null
 *                `null` ⇒ rien à comptabiliser : ni réussite, ni échec, ni essai.
 *   redemande    vrai quand la correction n'a pas eu lieu et qu'il faut ressaisir.
 *   piege        la conception à ouvrir, ou `null` si l'erreur n'était pas prévue.
 *   message      ce qu'on dit à l'élève AVANT le dialogue.
 */
const verdict = (champs) => Object.freeze({
  issue: null, redemande: false, juste: false, piege: null,
  message: null, correction: null, code: null, ...champs,
});

/** Le verdict d'un item que la couche de réponse ne sait pas encore servir. */
const NON_BRANCHE = (raison) => verdict({
  code: 'NON_BRANCHE', redemande: true, message: raison,
});

/**
 * La réponse chiffrée — valeur + unité, avec les trois états du champ unité.
 *
 *   saisie = { valeur: '2,7', unite: 'g/cm3' | SANS_UNITE | '' }
 *
 * Le champ unité a TROIS états et non deux : vide, « sans unité » choisi
 * explicitement, unité saisie. Sans le deuxième on ne distingue pas l'oubli du
 * refus légitime, et toute réponse adimensionnée du corpus devient un faux
 * positif. C'est `unites.js` qui les distingue ; ce module ne fait que lui
 * passer la chaîne telle quelle.
 *
 * `uniteImposee` n'est PAS un champ d'item : c'est le savoir-faire qui le porte
 * (`unite: 'imposee'`), et trois seulement le portent — ceux où la conversion
 * est le savoir-faire lui-même. Le déduire de l'item reviendrait à refuser une
 * unité équivalente partout, c'est-à-dire à punir un élève qui a raison.
 */
export function corrigerValeur(item, saisie = {}, { savoirFaire = SAVOIR_FAIRE_PAR_ID } = {}) {
  const attenduItem = item.reponse ?? {};
  const sf = savoirFaire[item.sfPrincipal] ?? {};

  const r = comparerReponse(
    { valeur: saisie.valeur, unite: saisie.unite },
    {
      valeur: attenduItem.valeur,
      unite: attenduItem.unite,
      semantique: attenduItem.semantique,
      tolerancePourcent: attenduItem.tolerancePourcent,
      toleranceAbsolue: toleranceDerivee(item),
      uniteImposee: sf.unite === 'imposee',
      ecriture: attenduItem.ecriture,
    },
  );

  const issue = issueDepuisVerdict(r);
  // `consommeEssai: false` et `issue` non comptabilisable disent la même chose
  // de deux côtés : on redemande. Les deux sont lus, parce que `unites.js` peut
  // rendre un verdict comptabilisable sans essai consommé le jour où un
  // cinquième cas apparaît, et l'inverse n'aurait pas de sens.
  const redemande = r.consommeEssai === false || issue === 'unite-non-reconnue';

  return verdict({
    code: r.verdict,
    juste: r.accepte === true,
    issue: redemande ? null : issue,
    redemande,
    piege: r.accepte === true ? null : piegeDeLaValeur(item, saisie, savoirFaire),
    message: r.message ?? messageParDefaut(r.verdict),
    correction: correctionLisible(item),
    // Ce que la comparaison a trouvé, pour l'écran et pour Merlin.
    attendue: r.attendue ?? null,
    recue: r.recue ?? null,
    detail: r.detail ?? null,
  });
}

/**
 * La tolérance d'une lecture graphique : une demi-graduation de l'axe des
 * ordonnées, CALCULÉE et jamais saisie.
 *
 * Vingt-sept des trente-huit items « tolérants » du chapitre 1 ne déclarent
 * aucun pourcentage, et c'est délibéré : leur tolérance est celle de l'œil sur
 * un quadrillage, et `schema.js` la connaît puisqu'il trace l'axe. Sans ce
 * pont, `comparerReponse` rendait `CONTENU_INVALIDE` sur ces vingt-sept items —
 * un verdict bruyant, mais servi à l'élève, sur du contenu parfaitement correct.
 *
 * Elle est rendue en rationnel exact `[n, d]` : la demi-graduation est un
 * flottant d'axe (`pas / 2`), et le laisser entrer tel quel dans une algèbre qui
 * refuse les flottants serait rouvrir par la tolérance ce que la valeur ferme.
 * L'écriture au millionième est celle que `item.js:fenetreDeTolerance` emploie
 * déjà, et les deux doivent donner la même fenêtre.
 */
function toleranceDerivee(item) {
  if (item?.figure?.sorte !== 'graphique') return null;
  const demi = toleranceDeLecture(item.figure.donnees?.y);
  if (demi === null || demi === undefined) return null;
  return [Math.round(demi * 1e6), 1000000];
}

/**
 * Le symbole d'un élément chimique — registre symbolique, pas de nombre.
 *
 * La casse EST le contenu : `Co` est le cobalt, `CO` le monoxyde de carbone.
 * Une comparaison insensible à la casse accepterait donc une écriture qui
 * désigne autre chose. Mais l'élève qui écrit `o` pour l'oxygène connaît son
 * élément : on le compte faux — c'est un échec du registre symbolique, et il
 * n'y a pas de demi-verdict — en lui disant CE qui manque plutôt que « ce n'est
 * pas ça », qui l'enverrait chercher le mauvais élément.
 */
export function corrigerSymbole(item, saisie, unite) {
  const ecrit = String(saisie ?? '').trim();
  if (!ecrit) {
    return verdict({ code: VERDICTS.REPONSE_INCOMPLETE, redemande: true, message: 'Écris le symbole.' });
  }
  // Le champ d'unité a les mêmes trois états ici qu'ailleurs, et les trois
  // énoncés concernés le demandent en toutes lettres. Vide, on redemande ;
  // rempli, c'est une réponse — et une fausse : un symbole d'élément désigne
  // une espèce, pas une grandeur, donc il n'a pas d'unité à porter.
  const etat = etatChampUnite(unite);
  if (etat === 'vide') {
    return verdict({
      code: VERDICTS.REPONSE_INCOMPLETE, redemande: true,
      message: "Il manque l'unité — ou coche « sans unité » si ta réponse n'en a pas.",
    });
  }
  if (etat === 'saisie') {
    return verdict({
      code: VERDICTS.DIMENSION_FAUSSE,
      issue: 'echec',
      piege: item.piege ?? null,
      correction: String(item.reponse?.valeur ?? '').trim(),
      message: "Un symbole d'élément chimique ne porte pas d'unité : il ne mesure rien, il "
        + "NOMME une espèce. C'est « sans unité » qu'il fallait cocher.",
    });
  }

  const attendu = String(item.reponse?.valeur ?? '').trim();
  if (ecrit === attendu) return verdict({ code: VERDICTS.JUSTE, juste: true, issue: 'reussite', correction: attendu });
  const casse = ecrit.toLowerCase() === attendu.toLowerCase();
  return verdict({
    code: VERDICTS.VALEUR_FAUSSE,
    issue: 'echec',
    piege: item.piege ?? null,
    correction: attendu,
    message: casse
      ? "C'est le bon élément, mais la majuscule compte : dans un symbole chimique, "
        + "la première lettre est en majuscule et la seconde en minuscule. « Co » et « CO » "
        + "ne désignent pas la même chose."
      : null,
  });
}

const messageParDefaut = (code) => ({
  [VERDICTS.JUSTE]: null,
  [VERDICTS.VALEUR_FAUSSE]: "L'unité va, la valeur non.",
  [VERDICTS.CONTENU_INVALIDE]:
    "Cette question est mal écrite de notre côté : on ne peut pas la corriger. Passe à la suivante, ce n'est pas toi.",
}[code] ?? null);

/** La correction, écrite comme l'élève l'écrirait. */
function correctionLisible(item) {
  const r = item.reponse ?? {};
  if (r.valeur === undefined) return null;
  const u = analyserUnite(r.unite ?? '', { lexique: 'auteur' });
  const texte = u.ok && u.unite.sansUnite ? '' : ` ${r.unite}`;
  return `${nombreFrancais(r.valeur)}${texte}`;
}

/** Une écriture décimale française. Jamais utilisée pour comparer : la
 *  comparaison reste en rationnels exacts dans `unites.js`, et l'arrondi
 *  d'affichage n'a le droit de toucher qu'à ce qui s'affiche. */
const decimalFrancais = (x) =>
  String(Math.round(x * 1e9) / 1e9).replace('.', ',').replace('-', '−');

/** Un rationnel exact `[n, d]` — l'écriture du corpus — rendu lisible. */
export function nombreFrancais(valeur) {
  if (typeof valeur === 'string') return valeur.replace('.', ',');
  if (!Array.isArray(valeur)) return String(valeur).replace('.', ',');
  const [n, d = 1] = valeur;
  return decimalFrancais(Number(n) / Number(d));
}

/** Un rationnel de `unites.js` (`{ n, d }` en BigInt) rendu lisible. */
const rationnelFrancais = (q) => decimalFrancais(Number(q.n) / Number(q.d));

/**
 * La conception derrière une valeur fausse — LUE dans les distracteurs, pas
 * devinée.
 *
 * Chaque distracteur porte la valeur qu'un modèle erroné produit et le piège qui
 * le produit. On compare la saisie à CHAQUE distracteur avec le même comparateur
 * que la réponse juste : c'est ce qui fait qu'un élève qui répond 320 g au lieu
 * de 326 g reçoit « le sucre dissous ne pèse plus » et pas « ce n'est pas ça ».
 *
 * Faute de distracteur touché, on retombe sur le piège de l'item. Faute de
 * piège, on rend `null` — et l'écran demande alors à l'élève ce qu'il a fait au
 * lieu de lui servir une explication qui ne le concerne pas.
 */
function piegeDeLaValeur(item, saisie, savoirFaire) {
  for (const d of item.distracteurs ?? []) {
    if (d.valeur === undefined) continue;
    const c = comparerReponse(
      { valeur: saisie.valeur, unite: saisie.unite },
      {
        valeur: d.valeur,
        unite: d.unite ?? item.reponse?.unite,
        semantique: item.reponse?.semantique ?? 'exacte',
        tolerancePourcent: item.reponse?.tolerancePourcent,
      },
    );
    if (c.accepte === true) return d.piege ?? item.piege ?? null;
  }
  return item.piege ?? null;
}

/** Le distracteur effectivement touché, avec son modèle erroné exécutable. */
export function distracteurTouche(item, saisie = {}) {
  const sorte = sorteDeReponse(item);
  if (sorte === 'valeur') {
    for (const d of item.distracteurs ?? []) {
      if (d.valeur === undefined) continue;
      const c = comparerReponse(
        { valeur: saisie.valeur, unite: saisie.unite },
        {
          valeur: d.valeur,
          unite: d.unite ?? item.reponse?.unite,
          semantique: item.reponse?.semantique ?? 'exacte',
          tolerancePourcent: item.reponse?.tolerancePourcent,
        },
      );
      if (c.accepte === true) return d;
    }
    return null;
  }
  // Sur un objet formel, un distracteur n'est touché que là où il est
  // COCHABLE : les cartes de « où est la matière » portent son `id`, et le
  // retenir dans un rôle au lieu de l'écarter est l'erreur qu'il décrit. Les
  // autres formes ne servent aucun distracteur à l'écran — leurs identifiants
  // sont descriptifs (`les-poudres-sont-pures`) et ne se rattachent à aucun
  // geste : les rattacher par ressemblance de chaîne serait deviner.
  if (sorte === 'objet-formel') {
    const tri = saisie.compose?.tri ?? {};
    return (item.distracteurs ?? [])
      .find((d) => tri[d.id] && tri[d.id] !== 'ecarte') ?? null;
  }
  // Sur un item à choix, le distracteur est identifié par son `id`, qui est la
  // clé du choix lui-même. Cinq des dix distracteurs de choix du chapitre 1 le
  // sont ; les cinq autres portent un identifiant descriptif et ne se
  // rattachent à aucune case — ils décrivent l'erreur sans être cochables.
  return (item.distracteurs ?? []).find((d) => d.id === saisie.choix) ?? null;
}

/**
 * Le choix simple — une case parmi les `choixPossibles` déclarés.
 *
 * Il n'y a rien de dimensionnel à vérifier ici, donc aucun des quatre verdicts :
 * juste ou faux, et le piège vient du distracteur coché.
 */
export function corrigerChoix(item, choix) {
  if (!choix) {
    return verdict({ code: VERDICTS.REPONSE_INCOMPLETE, redemande: true, message: 'Choisis une réponse.' });
  }
  const juste = choix === item.reponse?.choix;
  const d = distracteurTouche(item, { choix });
  return verdict({
    code: juste ? VERDICTS.JUSTE : VERDICTS.VALEUR_FAUSSE,
    juste,
    issue: juste ? 'reussite' : 'echec',
    piege: juste ? null : (d?.piege ?? item.piege ?? null),
    // Le texte du distracteur DIT le raisonnement que l'élève vient de tenir.
    // Le montrer avant de demander « pourquoi ? » serait lui souffler sa
    // réponse : il est gardé pour Merlin et pour l'explication, jamais servi ici.
    distracteur: d ?? null,
    correction: item.reponse?.choix ?? null,
  });
}

/**
 * Le double QCM — réponse PUIS justification, et quatre états qui ne font pas
 * la même chose.
 *
 *   juste / juste   la seule vraie réussite ;
 *   juste / faux    interrompt la série SANS faire redescendre de palier, et
 *                   reprogramme le piège de la justification cochée. Il n'y a
 *                   rien à réenseigner sur la valeur : l'élève l'a trouvée ;
 *   faux / juste    échec sur la valeur — et le cas le plus instructif du lot :
 *                   « ton raisonnement était le bon, ta réponse ne l'a pas
 *                   suivi » est une phrase qu'aucune plateforme ne sait dire ;
 *   faux / faux     échec.
 *
 * Les trois issues sont produites par `issueDuDoubleQcm` et non par un booléen
 * reconstruit ici : le quadrant juste/faux se perdrait à la première relecture
 * distraite, et avec lui la moitié de l'intérêt du format.
 */
export function corrigerDoubleQcm(item, { choix, justification } = {}) {
  if (!choix) {
    return verdict({ code: VERDICTS.REPONSE_INCOMPLETE, redemande: true, message: 'Choisis d’abord ta réponse.' });
  }
  if (!justification) {
    return verdict({ code: VERDICTS.REPONSE_INCOMPLETE, redemande: true, message: 'Choisis maintenant la phrase qui dit pourquoi.' });
  }

  const reponseJuste = choix === item.reponse?.choix;
  const j = (item.justifications ?? []).find((x) => x.id === justification) ?? null;
  const justificationJuste = j?.juste === true;
  const issue = issueDuDoubleQcm(reponseJuste, justificationJuste);

  // Le piège à ouvrir dépend du quadrant, et ce n'est pas un détail :
  //  · juste/faux — c'est le RAISONNEMENT qui est en cause, donc le piège de la
  //    justification cochée, jamais celui de la case ;
  //  · faux/quoi que ce soit — la case d'abord (elle porte le distracteur), la
  //    justification ensuite.
  const distracteur = distracteurTouche(item, { choix });
  const piege = reponseJuste
    ? (j?.piege ?? null)
    : (distracteur?.piege ?? j?.piege ?? item.piege ?? null);

  return verdict({
    code: issue === 'reussite' ? VERDICTS.JUSTE : VERDICTS.VALEUR_FAUSSE,
    juste: issue === 'reussite',
    issue,
    piege,
    quadrant: { reponseJuste, justificationJuste },
    justification: j,
    justificationJuste: (item.justifications ?? []).find((x) => x.juste === true) ?? null,
    distracteur,
    correction: item.reponse?.choix ?? null,
    message: messageDuQuadrant(reponseJuste, justificationJuste),
  });
}

const messageDuQuadrant = (reponseJuste, justificationJuste) => {
  if (reponseJuste && justificationJuste) return "Juste, et pour la bonne raison.";
  if (reponseJuste) {
    return "Ta réponse est juste — mais ce n'est pas ça qui la rend juste. "
      + "Tu ne redescends pas d'un cran pour autant : ce qu'on va reprendre, c'est le raisonnement.";
  }
  if (justificationJuste) {
    return "Ton raisonnement était le bon. C'est ta réponse qui ne l'a pas suivi — relis les deux ensemble.";
  }
  return "Ce n'est pas ça, et la phrase choisie dit pourquoi.";
};

/**
 * La réponse rédigée — trois items dans le chapitre 1.
 *
 * Elle ne se corrige pas par programme, et personne ne prétend le contraire :
 * ce sont des items de classe C, relus à la main par un auteur. Ce que
 * l'application peut faire est de montrer les `elementsAttendus` APRÈS la
 * rédaction et de demander à l'élève de se prononcer. L'auto-évaluation est
 * déclarée comme telle — `autoEvaluation: true` — pour qu'aucun écran ne la
 * présente comme un verdict du moteur.
 */
export function corrigerLibre(item, texte) {
  if (!String(texte ?? '').trim()) {
    return verdict({ code: VERDICTS.REPONSE_INCOMPLETE, redemande: true, message: 'Écris ta réponse avant de comparer.' });
  }
  return verdict({
    code: 'AUTO_EVALUATION',
    autoEvaluation: true,
    elementsAttendus: item.reponse?.elementsAttendus ?? [],
    piege: item.piege ?? null,
  });
}

// ════════════════════════════════════════════════════════════════════════════
// L'objet formel — la réponse qu'on COMPOSE
// ════════════════════════════════════════════════════════════════════════════
//
// Trente-quatre items du chapitre 1 n'attendent ni une valeur ni une case
// cochée : ils attendent un OBJET — un classement rempli, une grille de
// particules, une permutation d'étapes. Ce module les corrige, et trois règles
// ont décidé de la forme que ça prend.
//
// ── ① La comparaison est STRUCTURELLE ──────────────────────────────────────
//
// Un classement est une application des étiquettes vers les catégories, une
// grille est un multi-ensemble d'espèces, une remise en ordre est une
// permutation. Deux objets égaux à l'ordre près sont égaux, et rien ici ne
// compare deux chaînes : la grille se compare espèce par espèce sur une CLÉ
// d'espèce (`formule ?? nom`) et non sur l'indice de déclaration, sinon un
// auteur qui échange deux lignes de `contenu` rendrait faux tous les élèves qui
// ont raison.
//
// ── ② Le verdict est un DIAGNOSTIC ─────────────────────────────────────────
//
// Comme le vérificateur de circuit, la correction rend une liste de CONSTATS —
// « tu as rangé l'air du ballon dans « Corps purs » : c'est un mélange » — et
// non un booléen. Un constat nomme ce qui a été fait, jamais seulement ce qu'il
// fallait faire : c'est la différence entre une correction et un corrigé.
// Chaque constat peut porter un `piege`, et c'est celui-là qui ouvre le
// dialogue quand il existe.
//
// ── ③ Les propositions sortent de l'ITEM, jamais d'un catalogue ────────────
//
// Un widget de composition a besoin d'un jeu d'options ; l'inventer, ou le
// mettre en commun entre les items d'une même forme, serait écrire du contenu
// ici. Chaque jeu servi est donc DÉCLARÉ par l'item lui-même :
//
//   classement          `categories` — l'auteur les a écrites ;
//   choix raisonné      `[choisi, ...ecartes]` — la réunion EST le jeu ;
//   remise en ordre     `ordre` lui-même, permuté à l'affichage ;
//   grille              `contenu` (les espèces, sans leur nombre) et les trois
//                       états, que `schema.js` ferme ;
//   où est la matière   les trois phrases de l'item et ses `distracteurs`.
//
// C'est aussi ce qui condamne la huitième forme. `{ question, especes, nature,
// transformation }` — quatre items — demande « de quoi s'agit-il, et que
// contient le verre à la fin ? ». `nature` a bien un jeu fermé dans le corpus
// (`categories`), mais `transformation` n'en a aucun et `especes` est du
// français d'auteur (« protéines du lait ») : composer cette réponse
// exigerait qu'on écrive les mauvaises réponses, c'est-à-dire du contenu.
// `aComposer` rend donc `null` sur cette forme, et l'écran le DIT — comme il le
// disait pour les huit.
//
// La grille pose la même question à l'envers, et il fallait la voir : sa figure
// EST sa réponse (l'invariant 6 impose `figure.description === reponse.
// objetFormel`, par identité de référence). Tant que la zone n'était pas
// branchée, ces treize items affichaient donc la grille à composer au-dessus de
// l'énoncé qui demande de la composer. Ce n'est plus l'écran qui choisit de la
// cacher : `aComposer` déclare `figureEstLaReponse`, et `app.js` s'y tient.

/**
 * La forme d'un objet formel, décidée par UN champ et lue dans une table
 * fermée. L'ordre des entrées est celui de la décision ; aucun item du corpus
 * n'en porte deux, et si un jour l'un en portait deux, la première gagnerait —
 * ce qui est un choix explicite plutôt qu'un accident de parcours d'objet.
 */
export const FORMES_D_OBJET_FORMEL = Object.freeze({
  affectation: 'classement',
  contenu: 'grille-particulaire',
  ordre: 'remise-en-ordre',
  choisi: 'choix-raisonne',
  lieu: 'ou-est-la-matiere',
  points: 'releve',
  nature: 'nature-et-especes',
});

/** Les formes qu'un élève peut composer à l'écran. `nature-et-especes` en est
 *  absente, et l'en-tête dit pourquoi : ce n'est pas un oubli. */
export const FORMES_COMPOSABLES = Object.freeze([
  'classement', 'grille-particulaire', 'remise-en-ordre',
  'choix-raisonne', 'ou-est-la-matiere', 'releve',
]);

export function formeDeLObjetFormel(objetFormel) {
  if (!objetFormel || typeof objetFormel !== 'object') return null;
  for (const [champ, forme] of Object.entries(FORMES_D_OBJET_FORMEL)) {
    if (objetFormel[champ] !== undefined) return forme;
  }
  return null;
}

/** Les trois rôles de « où est la matière », et le quatrième qui n'en est pas
 *  un : écarter. Les libellés nomment un CHAMP de l'objet formel, pas un fait
 *  de physique — c'est pour cela qu'ils s'écrivent ici et non au lexique. */
export const ROLES_DE_LA_MATIERE = Object.freeze([
  { cle: 'lieu', titre: 'Où il est' },
  { cle: 'forme', titre: 'Sous quelle forme' },
  { cle: 'trace', titre: 'Ce qui le prouve' },
]);

export const ROLE_ECARTE = Object.freeze({ cle: 'ecarte', titre: 'C’est faux' });

const titreDuRole = (cle) => [...ROLES_DE_LA_MATIERE, ROLE_ECARTE]
  .find((r) => r.cle === cle)?.titre ?? cle;

/** Les trois états, dans l'ordre où la matière se serre. `schema.js` ferme
 *  l'énuméré (il refuse `ETAT_INCONNU`) ; on ne le rouvre pas ici. */
const ETATS_COMPOSABLES = Object.freeze(['solide', 'liquide', 'gaz']);

/** La clé d'une espèce dans le multi-ensemble. La formule d'abord : c'est elle
 *  qui identifie l'espèce dans le registre symbolique, et deux espèces du
 *  corpus portent le même nom courant sous deux formules différentes bien avant
 *  l'inverse. */
const cleDEspece = (e) => e?.formule ?? e?.nom ?? '';

/**
 * L'objet formel que la FIGURE d'un item dessine — la même lecture que fait
 * l'invariant 6 dans `item.js`, sous les trois clés qu'une figure peut porter.
 *
 * ⚠ Elle existe parce que `figureEstLaReponse` était une constante écrite par
 * forme — `true` pour la grille et le relevé, `false` pour les quatre autres —
 * et que ce n'est PAS une propriété de la forme : c'est une propriété de
 * l'item. Un classement, une remise en ordre ou un choix raisonné à qui l'on
 * ajouterait une figure de classe B afficherait son corrigé au-dessus de
 * l'énoncé, exactement comme les treize grilles le faisaient, et rien ici ne
 * l'aurait vu. On lit donc l'identité de référence, qui est ce que l'invariant
 * garantit, au lieu de recopier son résultat.
 */
const objetDeLaFigure = (item) => item?.figure?.circuit
  ?? item?.figure?.description ?? item?.figure?.donnees;

/**
 * Ce qu'il y a à composer, et avec quoi — la description que l'écran dessine et
 * que la correction compare.
 *
 * Elle est ici, et non dans `app.js`, pour une seule raison : le jeu de
 * propositions affiché et le jeu de propositions corrigé doivent être LE MÊME.
 * Deux dérivations parallèles du même item divergent au premier ajout, et la
 * divergence se voit alors sous la forme d'un élève compté faux.
 *
 * Rend `null` sur ce qui n'est pas composable — la huitième forme, ou une
 * réponse qui n'est pas un objet formel.
 */
export function aComposer(item) {
  // ⚠ La garde qui commande tout le reste, et elle a déjà attrapé une régression
  // pendant qu'on l'écrivait. QUATORZE items portent une valeur ET un objet
  // formel : ce sont les lectures graphiques, dont la figure est engendrée par
  // l'objet formel et dont la réponse est un nombre à taper. Sans cette ligne,
  // `aComposer` les réclamait — le champ de saisie devenait un widget de
  // composition, et surtout `figureEstLaReponse` faisait DISPARAÎTRE le
  // graphique qu'il faut lire pour répondre. C'est `sorteDeReponse` qui tranche,
  // et elle lit `objetFormel` en dernier précisément pour cela.
  if (sorteDeReponse(item) !== 'objet-formel') return null;
  const o = item?.reponse?.objetFormel;
  const forme = formeDeLObjetFormel(o);
  if (!FORMES_COMPOSABLES.includes(forme)) return null;

  // Vrai quand la figure de l'item et sa réponse sont le MÊME objet. Dérivé, et
  // non écrit par forme : voir `objetDeLaFigure`.
  const figureEstLaReponse = objetDeLaFigure(item) === o;

  switch (forme) {
    case 'classement':
      return acheve({
        forme,
        etiquettes: Object.keys(o.affectation ?? {}),
        categories: [...(o.categories ?? [])],
        figureEstLaReponse,
      }, o);

    case 'grille-particulaire':
      return acheve({
        forme,
        etats: ETATS_COMPOSABLES,
        // Les espèces SANS leur nombre : c'est le nombre qui se compose. Les
        // atomes restent — l'énoncé les dicte, et c'est `schema.js` qui les
        // dessine.
        especes: (o.contenu ?? []).map((e) => ({
          cle: cleDEspece(e), nom: e.nom, formule: e.formule, atomes: e.atomes,
          entite: entiteDeLEspece(e),
        })),
        graine: o.graine ?? 1,
        maximum: PARTICULES_MAX,
        figureEstLaReponse,
      }, o);

    case 'remise-en-ordre':
      return acheve({ forme, etapes: [...(o.ordre ?? [])], figureEstLaReponse }, o);

    case 'choix-raisonne':
      return acheve({
        forme,
        propositions: [o.choisi, ...(o.ecartes ?? [])],
        figureEstLaReponse,
      }, o);

    case 'ou-est-la-matiere':
      return acheve({
        forme,
        roles: ROLES_DE_LA_MATIERE,
        // Les trois phrases justes et les distracteurs de l'item, mêlés. Un
        // distracteur n'appartient à aucun rôle : le reconnaître et l'écarter
        // EST la question que ces sept items posent.
        cartes: [
          ...ROLES_DE_LA_MATIERE
            .filter((r) => o[r.cle] !== undefined)
            .map((r) => ({ id: o[r.cle], role: r.cle, distracteur: null })),
          ...(item.distracteurs ?? [])
            .map((d) => ({ id: d.id, role: 'ecarte', distracteur: d })),
        ],
        figureEstLaReponse,
      }, o);

    case 'releve':
      return acheve({
        forme,
        titreX: o.x?.titre ?? '',
        titreY: o.y?.titre ?? '',
        abscisses: (o.points ?? []).map(([x]) => x),
        figureEstLaReponse,
      }, o);

    default: return null;
  }
}

const tousDistincts = (l) => new Set(l).size === l.length;

/**
 * Un plan est-il JOUABLE — c'est-à-dire un élève peut-il, en composant, tomber
 * juste, et faut-il un geste pour cela ?
 *
 * ⚠ Les deux moitiés de cette question ont chacune leur mode de panne, et
 * aucune des deux ne lève d'exception : elles produisent un écran qui a l'air de
 * marcher.
 *
 * **Ce qui se validait tout seul.** Un classement sans étiquette, un relevé sans
 * point, une remise en ordre à zéro ou une étape : chacun passait
 * `constats.length === 0` et rendait `issue: 'reussite'` au premier
 * « Vérifier ». Le SRS n'a aucun moyen de distinguer cette réussite-là d'une
 * vraie — elle compte dans les trois consécutives, elle fait monter un palier,
 * et rien à l'écran ne la signale. La remise en ordre demande DEUX étapes parce
 * qu'une permutation à un élément est déjà rangée : `ordreInitial`, côté écran,
 * la sert telle quelle après ses huit tentatives de mélange. Le choix raisonné
 * en demande deux pour la même raison — garder l'unique proposition offerte
 * n'est pas un choix.
 *
 * **Ce qui ne se gagnait jamais.** Une affectation qui range vers une catégorie
 * absente de `categories` ne peut être satisfaite par aucun bouton de l'écran ;
 * deux propositions identiques, deux cartes de même `id`, deux espèces de même
 * clé partagent un seul contrôle et se répondent ensemble. Dans les quatre cas
 * l'élève reste sur « il reste une chose à ranger », indéfiniment, sans qu'on
 * lui dise jamais pourquoi. Un item refusé ici le dit en une phrase et rend la
 * main ; il ne consomme aucun essai.
 *
 * Deux cas s'y ajoutent, qui viennent d'ailleurs que de l'objet formel :
 *
 *   · une grille dont le contenu dépasse `PARTICULES_MAX`. Le « + » de l'écran
 *     s'arrête à cette borne — c'est celle de `schema.js`, au-delà de laquelle
 *     le tracé refuse — donc l'élève ne peut pas atteindre le compte attendu, et
 *     la correction lui dirait « tu en as posé 36, il en fallait 40 ». Reprocher
 *     à l'élève une limite de dessin est le pire des deux mondes ;
 *   · une carte de « où est la matière » sans texte. `identifiantsSansLibelle`
 *     ne la voit pas : elle interroge le seul `reponse.objetFormel`, et les
 *     distracteurs n'en font pas partie — ils viennent d'`item.distracteurs`.
 *     Un distracteur sans `texte` s'affichait donc « undefined » sur son bouton
 *     comme dans son constat, ce qui est pire qu'un identifiant nu.
 */
const EST_JOUABLE = Object.freeze({
  classement: (p, o) => p.etiquettes.length >= 1 && p.categories.length >= 2
    && Object.values(o.affectation ?? {}).every((c) => p.categories.includes(c)),
  'grille-particulaire': (p, o) => p.especes.length >= 1
    && tousDistincts(p.especes.map((e) => e.cle))
    && (o.contenu ?? []).reduce((s, e) => s + (e.nombre ?? 0), 0) <= p.maximum,
  'remise-en-ordre': (p) => p.etapes.length >= 2,
  'choix-raisonne': (p) => p.propositions.length >= 2 && tousDistincts(p.propositions),
  'ou-est-la-matiere': (p) => p.cartes.length >= 1
    && tousDistincts(p.cartes.map((c) => c.id))
    && p.cartes.every((c) => !c.distracteur || String(c.distracteur.texte ?? '').trim()),
  releve: (p) => p.abscisses.length >= 1,
});

/** Un plan, ou `null` s'il n'est pas jouable. Voir `EST_JOUABLE`. */
const acheve = (plan, o) => (EST_JOUABLE[plan.forme](plan, o) ? plan : null);

/** Un constat : ce que l'élève a fait, dit en français, avec la conception
 *  derrière quand l'item en déclare une. La forme est celle de `circuit.js` —
 *  un code stable, une précision qui NOMME ce qui est en cause. */
const constat = (code, texte, piege = null) => Object.freeze({ code, texte, piege });

/** Un objet formel composé et incomplet : on redemande, on n'enregistre rien.
 *  Même règle que partout ailleurs — une réponse à moitié donnée n'est pas une
 *  réponse fausse. */
const incomplet = (message) => verdict({
  code: VERDICTS.REPONSE_INCOMPLETE, redemande: true, message,
});

/**
 * Le verdict d'un objet formel composé.
 *
 * Le lexique est interrogé D'ABORD, et c'est le même appel que fait la zone de
 * réponse : un identifiant sans libellé referme le widget côté écran, et il
 * doit refermer la correction côté verdict — sinon la correction affiche en
 * clair l'identifiant que l'écran a refusé d'afficher.
 */
export function corrigerObjetFormel(item, compose = {}) {
  const o = item?.reponse?.objetFormel;
  const manquants = identifiantsSansLibelle(o);
  if (manquants.length) {
    return verdict({
      code: VERDICTS.CONTENU_INVALIDE, redemande: true,
      message: `Il manque le libellé de ${manquants.length} élément(s) de cette question. `
        + "On préfère te le dire plutôt que t'afficher un mot mal écrit — passe à la suivante.",
    });
  }

  const plan = aComposer(item);
  if (!plan) {
    // Deux raisons de ne rien composer, et elles ne se disent pas de la même
    // façon. La huitième forme est un choix — on refuse d'écrire les mauvaises
    // réponses. Une forme composable dont le plan est vide est un DÉFAUT de
    // contenu, et le dire « cherche-la sur ton cahier » mentirait à l'élève sur
    // ce qui vient de se passer. Dans les deux cas : `redemande`, rien
    // d'enregistré, aucun essai consommé.
    if (FORMES_COMPOSABLES.includes(formeDeLObjetFormel(o))) {
      return verdict({
        code: VERDICTS.CONTENU_INVALIDE, redemande: true,
        message: "Cette question est incomplète : il n'y a rien à composer. Ce n'est pas toi, "
          + "c'est elle — passe à la suivante.",
      });
    }
    return NON_BRANCHE(
      "Cette question demande de nommer ce qui s'est passé et les espèces présentes. Composer "
      + "cette réponse-là supposerait qu'on écrive les mauvaises réponses à côté des bonnes, et "
      + "ce n'est pas à l'écran de les écrire : cherche-la sur ton cahier, puis passe à la suivante.",
    );
  }

  const sortie = {
    classement: corrigerClassement,
    'grille-particulaire': corrigerGrille,
    'remise-en-ordre': corrigerRemiseEnOrdre,
    'choix-raisonne': corrigerChoixRaisonne,
    'ou-est-la-matiere': corrigerOuEstLaMatiere,
    releve: corrigerReleve,
  }[plan.forme](o, plan, compose);

  if (sortie.incomplet) return incomplet(sortie.incomplet);

  const { constats, correction } = sortie;
  if (constats.length === 0) {
    return verdict({
      code: VERDICTS.JUSTE, juste: true, issue: 'reussite',
      forme: plan.forme, constats: [], correction,
    });
  }
  return verdict({
    code: VERDICTS.VALEUR_FAUSSE,
    issue: 'echec',
    forme: plan.forme,
    constats,
    correction,
    // Le piège d'un constat l'emporte sur celui de l'item : il désigne la
    // conception que CETTE erreur-là trahit, quand l'item n'en nomme qu'une
    // pour tout le monde.
    piege: constats.find((c) => c.piege)?.piege ?? item.piege ?? null,
  });
}

// ── Le classement ───────────────────────────────────────────────────────────
//
// Une application des étiquettes vers les catégories. Rien n'est validé tant
// que tout n'est pas rangé : corriger un classement à moitié rempli
// compterait faux ce qui n'a pas encore été répondu.

const colonne = (categorie) => auPluriel(categorie) ?? libelleFormel(categorie) ?? categorie;

function corrigerClassement(o, plan, compose) {
  const range = compose.rangement ?? {};
  const reste = plan.etiquettes.filter((e) => !range[e]).length;
  if (reste > 0) {
    return {
      incomplet: reste === 1
        ? 'Il reste une chose à ranger.'
        : `Il reste ${reste} choses à ranger.`,
    };
  }

  const constats = plan.etiquettes
    .filter((e) => range[e] !== o.affectation[e])
    .map((e) => constat(
      'MAL_RANGE',
      `Tu as rangé « ${e} » dans « ${colonne(range[e])} » : c’est ${avecUn(o.affectation[e]) ?? colonne(o.affectation[e])}.`,
    ));

  // Une catégorie peut légitimement rester vide — c'est une colonne-piège, et
  // l'auteur a le droit d'en écrire une. Ce qu'elle ne doit pas produire, c'est
  // « Mélanges :  » suivi de rien, qui se lit comme un corrigé tronqué. Le tiret
  // est celui qu'`app.js` emploie déjà pour dire « rien ici ».
  const correction = plan.categories
    .map((c) => {
      const dedans = plan.etiquettes.filter((e) => o.affectation[e] === c);
      return `${colonne(c)} : ${dedans.length ? dedans.join(', ') : '—'}`;
    })
    .join(' — ');

  return { constats, correction };
}

// ── La grille de particules ─────────────────────────────────────────────────
//
// Un état, et un multi-ensemble d'espèces. C'est le passage entre le registre
// macroscopique et le registre submicroscopique — 2 % à 15 % de réussite au
// collège selon la formule (Canac & Kermen) —, donc l'exercice le plus précieux
// du lot, et celui dont le diagnostic doit être le plus précis : « tu as posé
// 10 molécules là où il en fallait 12 » et « tu as composé un gaz là où
// l'énoncé décrit un liquide » ne s'apprennent pas de la même façon.

const pluriel = (n, mot) => `${n} ${mot}${n > 1 ? 's' : ''}`;

function corrigerGrille(o, plan, compose) {
  const etat = compose.etat ?? null;
  const nombres = compose.nombres ?? {};
  const total = plan.especes.reduce((s, e) => s + (nombres[e.cle] ?? 0), 0);

  if (!etat) return { incomplet: 'Choisis d’abord l’état : solide, liquide ou gaz.' };
  if (total === 0) return { incomplet: 'Pose au moins une particule dans le récipient.' };

  const constats = [];
  if (etat !== o.etat) {
    constats.push(constat(
      'ETAT_FAUX',
      `Tu as composé ${avecUn(etat) ?? etat} ; l’énoncé décrit ${avecUn(o.etat) ?? o.etat}.`,
    ));
  }
  for (const e of plan.especes) {
    const attendu = (o.contenu ?? []).find((x) => cleDEspece(x) === e.cle)?.nombre ?? 0;
    const pose = nombres[e.cle] ?? 0;
    if (pose === attendu) continue;
    constats.push(constat(
      'NOMBRE_FAUX',
      `« ${e.nom ?? e.cle} » : tu en as posé ${pluriel(pose, e.entite ?? 'particule')}, `
      + `il en fallait ${attendu}.`,
    ));
  }

  const correction = `${avecUn(o.etat) ?? o.etat} — `
    + (o.contenu ?? []).map((e) => `${e.nom ?? cleDEspece(e)} : `
      + `${pluriel(e.nombre ?? 0, entiteDeLEspece(e) ?? 'particule')}`).join(', ');

  return { constats, correction };
}

// ── La remise en ordre ──────────────────────────────────────────────────────
//
// Une permutation. Le diagnostic est celui des INVERSIONS — « tu as placé
// conclure avant relever » — et non « ce n'est pas le bon ordre » : c'est la
// paire mal ordonnée qui s'apprend, pas la suite entière.
//
// ⚠ Le comptage des inversions ADJACENTES est exact — zéro inversion adjacente
// équivaut à l'ordre attendu — mais seulement sur une PERMUTATION. La première
// version ne vérifiait que la LONGUEUR de la suite, et tout ce qui n'était pas
// une permutation passait au travers : `[a, a, b]` ne porte aucune inversion
// (`rang(a) = rang(a)`, et `rang(a) < rang(b)`), une suite d'étapes inconnues
// n'en porte aucune non plus (`rang.get` rend `undefined`, et toute comparaison
// avec `undefined` est fausse). Les deux étaient rendues JUSTE, avec
// `issue: 'reussite'` enregistrée. La vérification structurelle porte donc
// d'abord sur le MULTI-ENSEMBLE, avant tout comptage.

/** Deux listes portent-elles exactement les mêmes éléments, avec les mêmes
 *  multiplicités ? L'ordre ne compte pas — c'est justement ce qu'on va mesurer
 *  ensuite. */
function estUnePermutation(suite, attendue) {
  if (suite.length !== attendue.length) return false;
  const reste = new Map();
  for (const e of attendue) reste.set(e, (reste.get(e) ?? 0) + 1);
  for (const e of suite) {
    const n = reste.get(e);
    if (!n) return false;
    reste.set(e, n - 1);
  }
  return true;
}

function corrigerRemiseEnOrdre(o, plan, compose) {
  const suite = Array.isArray(compose.suite) ? compose.suite : null;
  if (!suite || !estUnePermutation(suite, plan.etapes)) {
    return { incomplet: 'Range les étapes avec les flèches, puis vérifie.' };
  }
  const rang = new Map(plan.etapes.map((e, i) => [e, i]));

  const constats = [];
  for (let i = 0; i < suite.length - 1; i += 1) {
    const [a, b] = [suite[i], suite[i + 1]];
    if (rang.get(a) > rang.get(b)) {
      constats.push(constat(
        'ETAPES_INVERSEES',
        `Tu as placé « ${libelleFormel(a) ?? a} » avant « ${libelleFormel(b) ?? b} ».`,
      ));
    }
  }

  const correction = plan.etapes.map((e, i) => `${i + 1}. ${libelleFormel(e) ?? e}`).join(' — ');
  return { constats, correction };
}

// ── Le choix raisonné ───────────────────────────────────────────────────────
//
// Une partition des propositions en deux : ce qu'on retient, ce qu'on écarte.
// Ce n'est PAS un QCM à une case, et l'écart tient en une phrase : cocher la
// bonne réponse se fait sans regarder les autres, écarter les trois autres
// demande de dire de chacune pourquoi elle ne tranche pas.
//
// `pourquoi` n'est pas composé : deux items le portent, chacun avec une seule
// valeur, et le corpus ne déclare aucune raison concurrente. En fabriquer
// serait écrire du contenu ; il entre donc dans la CORRECTION, où il est à sa
// place.

function corrigerChoixRaisonne(o, plan, compose) {
  const tri = compose.tri ?? {};
  const indecis = plan.propositions.filter((p) => !tri[p]).length;
  if (indecis > 0) {
    return {
      incomplet: indecis === 1
        ? 'Il reste une proposition sur laquelle tu ne t’es pas prononcé.'
        : `Il reste ${indecis} propositions sur lesquelles tu ne t’es pas prononcé.`,
    };
  }
  const gardees = plan.propositions.filter((p) => tri[p] === 'garde');
  if (gardees.length !== 1) {
    return {
      incomplet: gardees.length === 0
        ? 'Tu as tout écarté : il faut en garder un.'
        : `Tu en as gardé ${gardees.length} : l’énoncé n’en demande qu’un seul.`,
    };
  }

  const constats = gardees[0] === o.choisi ? [] : [constat(
    'MAUVAIS_RETENU',
    `Tu as gardé « ${libelleFormel(gardees[0]) ?? gardees[0]} » et écarté `
    + `« ${libelleFormel(o.choisi) ?? o.choisi} ».`,
  )];

  const correction = `${libelleFormel(o.choisi) ?? o.choisi}`
    + (o.pourquoi ? ` — ${libelleFormel(o.pourquoi) ?? o.pourquoi}` : '');
  return { constats, correction };
}

// ── Où est la matière ───────────────────────────────────────────────────────
//
// Une affectation de phrases à trois rôles, plus une corbeille. Les phrases
// justes sont servies : ce que ces sept items enseignent n'est pas de retrouver
// les mots, c'est de REFUSER la phrase qui dit que la matière invisible n'est
// nulle part. Un distracteur rangé dans un rôle ramène donc SA conception, et
// c'est le seul endroit de ces trente-quatre items où le piège est attribuable
// à ce que l'élève vient de faire plutôt qu'à l'item entier.

function corrigerOuEstLaMatiere(o, plan, compose) {
  const tri = compose.tri ?? {};
  const indecis = plan.cartes.filter((c) => !tri[c.id]).length;
  if (indecis > 0) {
    return {
      incomplet: indecis === 1
        ? 'Il reste une phrase à placer.'
        : `Il reste ${indecis} phrases à placer.`,
    };
  }
  if (compose.visible !== true && compose.visible !== false) {
    return { incomplet: 'Dis d’abord si on le voit ou non.' };
  }
  for (const r of plan.roles) {
    const combien = plan.cartes.filter((c) => tri[c.id] === r.cle).length;
    if (combien > 1) return { incomplet: `Une seule phrase dans « ${r.titre} ».` };
  }

  const constats = [];
  if (o.visible !== undefined && compose.visible !== o.visible) {
    constats.push(constat(
      'VISIBLE_FAUX',
      o.visible
        ? 'Tu as répondu qu’on ne le voit pas ; l’énoncé dit qu’on le voit.'
        : 'Tu as répondu qu’on le voit ; l’énoncé dit qu’on ne voit rien.',
    ));
  }
  for (const c of plan.cartes) {
    const place = tri[c.id];
    if (place === c.role) continue;
    if (c.distracteur) {
      constats.push(constat(
        'DISTRACTEUR_RETENU',
        `Tu as retenu « ${c.distracteur.texte} » dans « ${titreDuRole(place)} ».`,
        c.distracteur.piege ?? null,
      ));
    } else if (place === ROLE_ECARTE.cle) {
      // Écarter une phrase juste n'est pas la ranger au mauvais endroit : la
      // première dit « c'est faux » d'une phrase vraie, la seconde se trompe de
      // question. Les fondre dirait « pas à C'est faux », qui ne se lit pas.
      constats.push(constat(
        'ROLE_FAUX',
        `Tu as écarté « ${libelleFormel(c.id) ?? c.id} », qui répond à « ${titreDuRole(c.role)} ».`,
      ));
    } else {
      constats.push(constat(
        'ROLE_FAUX',
        `« ${libelleFormel(c.id) ?? c.id} » répond à « ${titreDuRole(c.role)} », `
        + `pas à « ${titreDuRole(place)} ».`,
      ));
    }
  }

  const correction = plan.roles
    .filter((r) => o[r.cle] !== undefined)
    .map((r) => `${r.titre} : ${libelleFormel(o[r.cle]) ?? o[r.cle]}`)
    .join(' — ');
  return { constats, correction };
}

// ── Le relevé ───────────────────────────────────────────────────────────────
//
// Une ligne de tableau à compléter. Les abscisses sont données par l'énoncé et
// par l'objet formel ; ce sont les ordonnées qui se composent. La comparaison
// passe par le MÊME lecteur de nombres que les réponses chiffrées — une saisie
// illisible redemande au lieu de compter faux.

const memeNombre = (a, b) => a !== null && b !== null && a.n * b.d === b.n * a.d;

function corrigerReleve(o, plan, compose) {
  const y = compose.y ?? {};
  const manquants = plan.abscisses.filter((_, i) => !String(y[i] ?? '').trim()).length;
  if (manquants > 0) {
    return {
      incomplet: manquants === 1
        ? 'Il manque une valeur dans le tableau.'
        : `Il manque ${manquants} valeurs dans le tableau.`,
    };
  }

  const lus = plan.abscisses.map((_, i) => rationnelDepuisTexte(y[i]));
  const illisible = lus.findIndex((q) => q === null);
  if (illisible >= 0) {
    return { incomplet: `Je ne sais pas lire « ${String(y[illisible]).trim()} ».` };
  }

  const constats = [];
  o.points.forEach(([x, attendu], i) => {
    if (memeNombre(lus[i], rationnelDepuisTexte(String(attendu)))) return;
    constats.push(constat(
      'VALEUR_RELEVEE_FAUSSE',
      `Pour ${nombreFrancais(x)}, tu as écrit ${nombreFrancais(String(y[i]).trim())} ; `
      + `on lit ${nombreFrancais(attendu)}.`,
    ));
  });

  const correction = o.points.map(([x, v]) => `${nombreFrancais(x)} → ${nombreFrancais(v)}`).join(' — ');
  return { constats, correction };
}

/** Le verdict d'un item, quelle que soit sa sorte. Un seul point d'entrée pour
 *  `app.js` : c'est ce qui empêche un écran d'oublier un des quatre verdicts. */
export function corriger(item, saisie = {}, options = {}) {
  switch (sorteDeReponse(item)) {
    case 'double-qcm': return corrigerDoubleQcm(item, saisie);
    case 'valeur': return corrigerValeur(item, saisie, options);
    case 'symbole': return corrigerSymbole(item, saisie.symbole, saisie.unite);
    case 'choix': return corrigerChoix(item, saisie.choix);
    case 'libre': return corrigerLibre(item, saisie.libre);
    default: return corrigerObjetFormel(item, saisie.compose ?? {});
  }
}

// ════════════════════════════════════════════════════════════════════════════
// L'événement envoyé au SRS
// ════════════════════════════════════════════════════════════════════════════

/**
 * Ce qu'une réponse laisse au SRS, lu sur l'ITEM et non reconstruit.
 *
 * `doubleQcm` ne se déduit PAS de `classe: 'C'` — la classe C couvre aussi la
 * critique de résultat et les explications rédigées, et les confondre
 * déclarerait la condition de maîtrise « un double QCM juste/juste » remplie par
 * une justification libre relue à la main.
 */
export const evenementDeReponse = (item, issue, numeroSeance) => ({
  issue,
  numeroSeance,
  palier: item.palier,
  cercle: item.cercle,
  classe: item.classe,
  estFormatDiagnostique: item.estFormatDiagnostique === true,
  doubleQcm: item.type === 'double-qcm',
  type: item.type,
  contexteDeSurface: item.contexteDeSurface ?? null,
  dispositifServi: item.dispositifServi ?? null,
});

// ════════════════════════════════════════════════════════════════════════════
// Le contre-modèle EXÉCUTÉ
// ════════════════════════════════════════════════════════════════════════════

/**
 * Le contre-modèle d'un piège, ramené à une forme que l'écran sait servir.
 *
 * Le catalogue en porte TROIS formes, écrites par trois familles différentes, et
 * les fondre en une seule au niveau du contenu serait réécrire du contenu relu :
 *
 *   'fonction'    `{ enonce, predire, verdict }` — le modèle de l'élève est une
 *                 FONCTION. On l'exécute sur la situation de l'item et on montre
 *                 ce qu'il prédit. C'est la seule forme où le verdict n'est pas
 *                 rédigé à la main : il est calculé, et le texte ne peut donc pas
 *                 promettre un écart que les nombres affichés ne portent pas.
 *   'table'       `{ enonceDuModele, execution: [...], lecture }` — l'exécution
 *                 est déjà écrite, cas par cas, parce que ce qu'elle produit est
 *                 une phrase et non un nombre (registre symbolique).
 *   'dispositifs' `{ modele, executions: [...] }` — l'exécution est un DISPOSITIF
 *                 à part entière, avec sa prédiction verrouillée. C'est la forme
 *                 d'`extramission`, qui ne porte aucun constat : on ne peut pas
 *                 faire constater à l'écran que rien ne sort de l'œil.
 *
 * `fleche-lue-comme-egal` porte à la fois `predire` et `execution` : la fonction
 * gagne, parce qu'exécuter vaut mieux que citer une exécution.
 */
export function contreModeleDe(piege) {
  const cm = piege?.contreModele;
  if (!cm) return null;
  if (typeof cm.predire === 'function') {
    return { sorte: 'fonction', enonce: cm.enonce ?? cm.enonceDuModele, predire: cm.predire, verdict: cm.verdict ?? cm.lecture };
  }
  if (Array.isArray(cm.executions)) {
    return { sorte: 'dispositifs', enonce: cm.modele ?? cm.enonceDuModele, executions: cm.executions, verdict: cm.lecture ?? null };
  }
  if (Array.isArray(cm.execution)) {
    return { sorte: 'table', enonce: cm.enonceDuModele, execution: cm.execution, verdict: cm.lecture ?? null };
  }
  return null;
}

/**
 * Exécute le modèle de l'élève sur la situation décrite par l'item.
 *
 * ⚠ Le refus est la moitié du travail. `predire` attend des grandeurs nommées
 * (`masseAvant`, `masseDevenueGaz`…) que l'item porte dans sa `situation` ; s'il
 * ne les porte pas, l'arithmétique rend `NaN` — et un écran qui afficherait
 * « selon toi : NaN g » aurait l'air d'avoir exécuté quelque chose. On vérifie
 * donc que TOUTE valeur numérique rendue est finie, et on refuse sinon. Le texte
 * du contre-modèle reste servi ; ce sont les nombres qui disparaissent, parce
 * qu'ils n'existent pas.
 */
export function executerContreModele(piege, situation) {
  const cm = contreModeleDe(piege);
  if (!cm || cm.sorte !== 'fonction') return { ok: false, code: 'PAS_DE_MODELE_EXECUTABLE', contreModele: cm };
  if (!situation || typeof situation !== 'object') {
    return { ok: false, code: 'SITUATION_ABSENTE', contreModele: cm };
  }
  let sortie;
  try { sortie = cm.predire(situation); } catch { return { ok: false, code: 'MODELE_A_LEVE', contreModele: cm }; }
  if (!sortie || typeof sortie !== 'object') return { ok: false, code: 'MODELE_SANS_SORTIE', contreModele: cm };
  const suspect = Object.entries(sortie).find(([, v]) => typeof v === 'number' && !Number.isFinite(v));
  if (suspect) return { ok: false, code: 'SITUATION_INCOMPLETE', detail: suspect[0], contreModele: cm };
  return { ok: true, contreModele: cm, sortie };
}

/**
 * Le modèle erroné d'un distracteur, rejoué sur les données de l'item.
 *
 * C'est le contre-modèle au niveau de l'ITEM, et le seul qui soit atteignable
 * dans le chapitre 1 : le distracteur porte une chaîne de calcul (`modeleErrone.
 * calcul`) qui produit EXACTEMENT le nombre que l'élève vient d'écrire. On le
 * rejoue avec `evaluerCalcul`, le même évaluateur que la correction — donc la
 * démonstration « ton modèle donne 320, la balance donne 326 » sort du contenu
 * et non d'une phrase rédigée à côté.
 */
export function executerModeleErrone(item, distracteur) {
  const modele = distracteur?.modeleErrone;
  if (!modele?.calcul) return { ok: false, code: 'PAS_DE_MODELE_ERRONE' };

  const sien = evaluerCalcul(modele.calcul, { donnees: item.donnees ?? {} });
  if (!sien.ok) return { ok: false, code: sien.code, detail: sien.detail };

  const juste = item.calcul ? evaluerCalcul(item.calcul, { donnees: item.donnees ?? {} }) : null;
  const u = analyserUnite(item.reponse?.unite ?? '', { lexique: 'auteur' });
  if (!u.ok) return { ok: false, code: 'UNITE_ATTENDUE_ILLISIBLE' };

  return {
    ok: true,
    nom: modele.nom ?? null,
    unite: u.unite.sansUnite ? '' : item.reponse.unite,
    selonToi: rationnelFrancais(dansSonUnite(sien.reponse.q, u.unite)),
    mesure: juste?.ok
      ? rationnelFrancais(dansSonUnite(juste.reponse.q, u.unite))
      : nombreFrancais(item.reponse?.valeur),
  };
}
