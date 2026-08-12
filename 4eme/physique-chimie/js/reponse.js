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
import { toleranceDeLecture } from './schema.js';
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

/** Le verdict d'un item, quelle que soit sa sorte. Un seul point d'entrée pour
 *  `app.js` : c'est ce qui empêche un écran d'oublier un des quatre verdicts. */
export function corriger(item, saisie = {}, options = {}) {
  switch (sorteDeReponse(item)) {
    case 'double-qcm': return corrigerDoubleQcm(item, saisie);
    case 'valeur': return corrigerValeur(item, saisie, options);
    case 'symbole': return corrigerSymbole(item, saisie.symbole, saisie.unite);
    case 'choix': return corrigerChoix(item, saisie.choix);
    case 'libre': return corrigerLibre(item, saisie.libre);
    default:
      return NON_BRANCHE(
        "Cette question demande de composer un objet — un classement, une grille de particules, "
        + "une remise en ordre. Cette zone-là n'est pas encore branchée, et on ne fait pas semblant : "
        + "regarde la réponse et passe à la suivante.",
      );
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
