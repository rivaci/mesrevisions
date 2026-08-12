// Tests adverses de la couche de verdict, hors navigateur.
//
//     node tools/tester-reponse.mjs
//
// ── Ce que ce fichier cherche à casser ──────────────────────────────────────
//
// `js/reponse.js` existe pour interdire UNE fusion : celle des quatre verdicts
// en deux. Un exerciseur ordinaire rend « juste » ou « faux » ; ce moteur doit
// rendre quatre choses qui ne se confondent jamais, et trois d'entre elles sont
// invisibles sur un test qui se contenterait de vérifier qu'une bonne réponse
// est acceptée.
//
//   · l'élève qui répond 2 700 kg/m³ quand on demandait des g/cm³ A RAISON. Le
//     compter faux est le mode de panne le plus coûteux du lot, parce qu'il est
//     indistinguable d'un fonctionnement normal côté écran ;
//   · l'élève qui écrit une masse là où on attend une masse volumique doit
//     recevoir « ce n'est pas une masse volumique, c'est une masse » — pas
//     « faux » ;
//   · une unité illisible ne consomme pas d'essai. Un `unite-non-reconnue`
//     comptabilisé ferait redescendre un palier sur une faute de frappe ;
//   · le juste/faux du double QCM n'est pas un échec.
//
// ── Et ce qu'il vérifie sur le CORPUS et pas sur des exemples ──────────────
//
// Trois contrôles portent sur les 175 items réellement écrits, parce que ce sont
// les seuls qui vieillissent : la réponse déclarée d'un item doit être acceptée
// par le moteur (sinon l'élève qui a raison est compté faux), chaque distracteur
// doit ramener SON piège (sinon le dialogue sert la mauvaise explication), et
// chaque clé de `choixPossibles` doit avoir un libellé (sinon la zone de réponse
// se referme et l'item devient injouable). Le troisième est celui qui bougera :
// le lexique est fermé, et un chapitre qui s'ajoute apporte ses clés.

import {
  contreModeleDe,
  corriger,
  corrigerDoubleQcm,
  corrigerValeur,
  distracteurTouche,
  executerContreModele,
  executerModeleErrone,
  sorteDeReponse,
  SORTES_DE_REPONSE,
} from '../js/reponse.js';
import { SANS_UNITE, VERDICTS } from '../js/unites.js';
import { clesInconnues, libelle } from '../js/lexique.js';
import { SAVOIR_FAIRE as CONTENU_CH01 } from '../js/data/items/ch01/index.js';
import { PIEGES } from '../js/data/pieges/index.js';

let passes = 0;
const echecs = [];
const reserves = [];

const verifier = (nom, condition) => {
  if (condition) passes += 1;
  else echecs.push(nom);
};
const reserve = (texte) => reserves.push(texte);

const ITEMS = CONTENU_CH01.flatMap((e) => e.items);

// ════════════════════════════════════════════════════════════════════════════
// ① Les quatre verdicts ne se confondent pas
// ════════════════════════════════════════════════════════════════════════════

/** Un item de masse volumique fabriqué pour l'occasion : le corpus du chapitre 1
 *  n'en porte pas, et c'est précisément là que l'algèbre des unités se joue. */
const MASSE_VOLUMIQUE = {
  id: 'test-masse-volumique',
  sfPrincipal: 'ch04-sf3-calculer-une-masse-volumique',
  reponse: { valeur: [27, 10], unite: 'g/cm³', semantique: 'exacte' },
};

{
  const r = corrigerValeur(MASSE_VOLUMIQUE, { valeur: '2,7', unite: 'g/cm3' });
  verifier('la réponse juste, écrite avec la virgule et sans exposant, est acceptée',
    r.code === VERDICTS.JUSTE && r.issue === 'reussite');
}
{
  // 2,7 g/cm³ = 2700 kg/m³. Même grandeur, autre écriture : JUSTE et signalé.
  const r = corrigerValeur(MASSE_VOLUMIQUE, { valeur: '2700', unite: 'kg/m3' });
  verifier('une unité équivalente non demandée est ACCEPTÉE, pas refusée',
    r.code === VERDICTS.UNITE_NON_DEMANDEE && r.juste === true && r.issue === 'reussite');
  verifier("…et l'unité attendue est dite", /g\/cm³/.test(r.message ?? ''));
}
{
  const r = corrigerValeur(MASSE_VOLUMIQUE, { valeur: '2,7', unite: 'g' });
  verifier('une masse là où on attend une masse volumique rend DIMENSION_FAUSSE',
    r.code === VERDICTS.DIMENSION_FAUSSE && r.issue === 'echec');
  verifier('…et la phrase nomme les deux grandeurs',
    r.attendue === 'une masse volumique' && r.recue === 'une masse');
}
{
  const r = corrigerValeur(MASSE_VOLUMIQUE, { valeur: '3,1', unite: 'g/cm3' });
  verifier('une valeur fausse dans la bonne unité rend VALEUR_FAUSSE',
    r.code === VERDICTS.VALEUR_FAUSSE && r.issue === 'echec');
}
{
  const r = corrigerValeur(MASSE_VOLUMIQUE, { valeur: '2,7', unite: 'grammes par cm cube' });
  verifier('une unité illisible rend UNITE_NON_RECONNUE', r.code === VERDICTS.UNITE_NON_RECONNUE);
  verifier('…et NE CONSOMME PAS D\'ESSAI : rien à comptabiliser, on redemande',
    r.issue === null && r.redemande === true);
}
{
  const r = corrigerValeur(MASSE_VOLUMIQUE, { valeur: '2,7', unite: '' });
  verifier('un champ d\'unité vide redemande au lieu de compter faux',
    r.code === VERDICTS.REPONSE_INCOMPLETE && r.issue === null && r.redemande === true);
}
{
  // Le troisième état : « sans unité » CHOISI. Il ne se confond pas avec le
  // champ vide — l'un est un refus légitime, l'autre un oubli — et sur un item
  // dimensionné il produit un vrai verdict de dimension, pas un « incomplet ».
  const r = corrigerValeur(MASSE_VOLUMIQUE, { valeur: '2,7', unite: SANS_UNITE });
  verifier('« sans unité » coché est une RÉPONSE, corrigée comme telle',
    r.code === VERDICTS.DIMENSION_FAUSSE && r.issue === 'echec');
}
{
  const adimensionne = {
    id: 'test-sans-unite',
    sfPrincipal: 'ch01-sf1-distinguer-corps-pur-et-melange',
    reponse: { valeur: 3, unite: SANS_UNITE, semantique: 'exacte' },
  };
  verifier('sur une réponse adimensionnée, « sans unité » coché est JUSTE',
    corrigerValeur(adimensionne, { valeur: '3', unite: SANS_UNITE }).code === VERDICTS.JUSTE);
  verifier('…et le champ laissé vide ne l\'est pas : c\'est un oubli, pas un refus',
    corrigerValeur(adimensionne, { valeur: '3', unite: '' }).code === VERDICTS.REPONSE_INCOMPLETE);
}
{
  // L'unité imposée : les trois savoir-faire où la conversion EST le
  // savoir-faire. La même réponse équivalente y devient un échec — et c'est le
  // SEUL endroit où elle doit l'être.
  const conversion = {
    id: 'test-conversion',
    sfPrincipal: 'ch04-sf5-convertir-entre-g-par-cm3-et-kg-par-m3',
    reponse: { valeur: [27, 10], unite: 'g/cm³', semantique: 'exacte' },
  };
  const r = corrigerValeur(conversion, { valeur: '2700', unite: 'kg/m3' });
  verifier('sur `unite: imposee`, l\'unité équivalente est refusée',
    r.code === VERDICTS.UNITE_NON_DEMANDEE && r.juste === false && r.issue === 'echec');
}

// ── La tolérance des lectures graphiques : dérivée, absolue, et VIVANTE ─────
//
// Vingt-sept items « tolérants » du chapitre 1 ne déclarent aucun pourcentage :
// leur fenêtre est la demi-graduation de l'axe, que `schema.js` calcule. Le cas
// qui commande est le palier de fusion de la glace, à 0 °C — une fenêtre
// relative y vaut zéro, et l'élève qui lit 1 °C sur un axe gradué tous les 5 °C
// serait compté faux. C'est pour lui que `toleranceAbsolue` existe.
{
  const glace = ITEMS.find((i) => i.id === 'ch01-sf3-e01-palier-de-fusion-de-la-glace');
  verifier('un palier de fusion lu à 0 °C est accepté',
    corriger(glace, { valeur: [0, 1], unite: '°C' }).juste === true);
  verifier('…et une lecture à moins d\'une demi-graduation aussi',
    corriger(glace, { valeur: '2', unite: '°C' }).juste === true);
  verifier('…mais pas au-delà : la tolérance est une fenêtre, pas une amnistie',
    corriger(glace, { valeur: '4', unite: '°C' }).code === VERDICTS.VALEUR_FAUSSE);
  verifier('aucun item tolérant ne rend CONTENU_INVALIDE faute de tolérance déclarée',
    ITEMS.filter((i) => i.reponse?.semantique === 'tolerante')
      .every((i) => corriger(i, { valeur: i.reponse.valeur, unite: i.reponse.unite }).code !== VERDICTS.CONTENU_INVALIDE));
}

// ════════════════════════════════════════════════════════════════════════════
// ② Le double QCM : quatre états, et ils ne font pas la même chose
// ════════════════════════════════════════════════════════════════════════════

const UN_DOUBLE_QCM = ITEMS.find((i) => i.type === 'double-qcm'
  && i.justifications.some((j) => !j.juste && j.piege));

{
  const bonne = UN_DOUBLE_QCM.reponse.choix;
  const mauvaise = UN_DOUBLE_QCM.reponse.choixPossibles.find((c) => c !== bonne);
  const jJuste = UN_DOUBLE_QCM.justifications.find((j) => j.juste).id;
  const jFausse = UN_DOUBLE_QCM.justifications.find((j) => !j.juste && j.piege);

  verifier('juste/juste est la seule vraie réussite',
    corrigerDoubleQcm(UN_DOUBLE_QCM, { choix: bonne, justification: jJuste }).issue === 'reussite');

  const jf = corrigerDoubleQcm(UN_DOUBLE_QCM, { choix: bonne, justification: jFausse.id });
  verifier('juste/faux n\'est PAS un échec', jf.issue === 'reussite-sans-justification');
  verifier('…et reprogramme le piège de la JUSTIFICATION cochée', jf.piege === jFausse.piege);

  verifier('faux/juste est un échec',
    corrigerDoubleQcm(UN_DOUBLE_QCM, { choix: mauvaise, justification: jJuste }).issue === 'echec');
  verifier('faux/faux est un échec',
    corrigerDoubleQcm(UN_DOUBLE_QCM, { choix: mauvaise, justification: jFausse.id }).issue === 'echec');

  verifier('sans justification, on redemande au lieu de corriger la moitié',
    corrigerDoubleQcm(UN_DOUBLE_QCM, { choix: bonne }).redemande === true);
  verifier('sans réponse, on ne demande pas encore la justification',
    corrigerDoubleQcm(UN_DOUBLE_QCM, { justification: jJuste }).redemande === true);
}

// ════════════════════════════════════════════════════════════════════════════
// ③ Le corpus : ce qui vieillit
// ════════════════════════════════════════════════════════════════════════════

// La réponse DÉCLARÉE d'un item doit être acceptée par le moteur. C'est le
// contrôle le plus bête et le plus utile : un item dont la propre correction est
// refusée compte faux un élève qui a raison, et rien à l'écran ne le dit.
{
  const refuses = [];
  for (const item of ITEMS) {
    const sorte = sorteDeReponse(item);
    if (sorte === 'valeur') {
      // La valeur EXACTE du contenu, passée telle quelle : `[27, 10]` est un
      // rationnel que le moteur sait lire. La retaper en décimale tronquée
      // testerait la troncature du test, pas la correction du moteur.
      const r = corriger(item, { valeur: item.reponse.valeur, unite: item.reponse.unite });
      if (r.juste !== true) refuses.push(`${item.id} (${r.code})`);
    } else if (sorte === 'symbole') {
      const r = corriger(item, { symbole: item.reponse.valeur, unite: SANS_UNITE });
      if (r.juste !== true) refuses.push(`${item.id} (${r.code})`);
    } else if (sorte === 'choix') {
      if (corriger(item, { choix: item.reponse.choix }).juste !== true) refuses.push(item.id);
    } else if (sorte === 'double-qcm') {
      const j = item.justifications.find((x) => x.juste);
      const r = corriger(item, { choix: item.reponse.choix, justification: j?.id });
      if (r.issue !== 'reussite') refuses.push(`${item.id} (${r.issue})`);
    }
  }
  verifier(`la correction déclarée de chaque item est acceptée — refusés : ${refuses.slice(0, 5).join(', ')}`,
    refuses.length === 0);
}

// Chaque distracteur ramène SON piège. Sans cela, le dialogue après l'erreur
// sert l'explication d'une conception que l'élève n'a pas.
{
  const perdus = [];
  for (const item of ITEMS) {
    for (const d of item.distracteurs ?? []) {
      if (d.valeur !== undefined) {
        const saisie = { valeur: d.valeur, unite: d.unite ?? item.reponse.unite };
        const r = corriger(item, saisie);
        if (r.juste === false && r.piege !== d.piege) perdus.push(`${item.id}/${d.id} → ${r.piege}`);
      } else if ((item.reponse?.choixPossibles ?? []).includes(d.id)) {
        const r = corriger(item, { choix: d.id, justification: item.justifications?.find((j) => !j.juste)?.id });
        if (r.piege !== d.piege) perdus.push(`${item.id}/${d.id} → ${r.piege}`);
      }
    }
  }
  verifier(`chaque distracteur ramène son piège — perdus : ${perdus.slice(0, 5).join(', ')}`, perdus.length === 0);
}

// Le lexique est FERMÉ : une clé sans libellé referme la zone de réponse, et
// l'item devient injouable en silence si personne ne le contrôle ici.
{
  const cles = [...new Set(ITEMS.flatMap((i) => i.reponse?.choixPossibles ?? []))];
  const manquantes = clesInconnues(cles);
  verifier(`toutes les clés de choix ont un libellé — manquantes : ${manquantes.slice(0, 8).join(', ')}`,
    manquantes.length === 0);
  verifier('aucun libellé n\'est un identifiant recopié',
    cles.every((c) => libelle(c) !== c));
}

// Aucun item ne doit tomber dans un trou : soit il est servable, soit il est
// déclaré non branché — mais jamais servi avec une zone de réponse muette.
{
  const parSorte = {};
  for (const item of ITEMS) parSorte[sorteDeReponse(item)] = (parSorte[sorteDeReponse(item)] ?? 0) + 1;
  verifier('les six sortes couvrent le corpus',
    Object.keys(parSorte).every((s) => SORTES_DE_REPONSE.includes(s)));
  // La sixième sorte a été découverte sur le corpus et non sur la charte : trois
  // items attendent le SYMBOLE d'un élément, pas un nombre. Classés « valeur »,
  // ils servaient un clavier numérique pour écrire « O » et rendaient « je ne
  // sais pas lire ce nombre » à qui répondait juste.
  verifier('les réponses symboliques sont reconnues comme telles',
    (parSorte.symbole ?? 0) === 3);

  const symbolique = ITEMS.find((i) => sorteDeReponse(i) === 'symbole');
  verifier('sur un symbole, la casse compte — et on dit laquelle',
    /majuscule/.test(corriger(symbolique, { symbole: symbolique.reponse.valeur.toLowerCase(), unite: SANS_UNITE }).message ?? ''));
  verifier('…et une unité écrite là où il n\'y en a pas est un vrai verdict',
    corriger(symbolique, { symbole: symbolique.reponse.valeur, unite: 'g' }).code === VERDICTS.DIMENSION_FAUSSE);
  verifier('…et le champ d\'unité laissé vide redemande, comme partout ailleurs',
    corriger(symbolique, { symbole: symbolique.reponse.valeur, unite: '' }).redemande === true);
  reserve(`${parSorte['objet-formel']} items à OBJET FORMEL restent inertes : ce sont des réponses à`
    + '\n      composer (classement, grille de particules, remise en ordre), et leur widget'
    + '\n      n\'est pas écrit. La zone de réponse le DIT au lieu de faire semblant.');
}

// ════════════════════════════════════════════════════════════════════════════
// ④ Le contre-modèle : exécuté, ou refusé — jamais approché
// ════════════════════════════════════════════════════════════════════════════

{
  const item = ITEMS.find((i) => (i.distracteurs ?? []).some((d) => d.modeleErrone));
  const d = (item.distracteurs ?? []).find((x) => x.modeleErrone);
  const r = executerModeleErrone(item, d);
  verifier('le modèle erroné d\'un distracteur se REJOUE et rend deux nombres',
    r.ok && r.selonToi && r.mesure && r.selonToi !== r.mesure);
  verifier('…et le nombre qu\'il rend est celui que l\'élève a écrit',
    r.ok && r.selonToi === String(d.valeur[0] / (d.valeur[1] ?? 1)));
}
{
  // Le refus est la moitié du travail : sans situation, le modèle rendrait NaN,
  // et un écran affichant « selon toi : NaN g » aurait l'air d'avoir exécuté
  // quelque chose.
  const p = PIEGES['conservation-de-la-masse'];
  verifier('un contre-modèle à fonction est reconnu comme exécutable',
    contreModeleDe(p)?.sorte === 'fonction');
  verifier('sans situation, l\'exécution est REFUSÉE et non approchée',
    executerContreModele(p, undefined).ok === false);
  verifier('avec une situation incomplète, elle est refusée plutôt que rendue en NaN',
    executerContreModele(p, { systeme: 'ferme' }).ok === false);
  const r = executerContreModele(p, {
    systeme: 'ouvert', masseAvant: 100, masseDevenueGaz: 8, masseEntreeSansSeVoir: 0,
  });
  verifier('avec une situation complète, elle rend des nombres finis',
    r.ok && Object.values(r.sortie).every((v) => typeof v !== 'number' || Number.isFinite(v)));
}
{
  const sortes = new Set();
  for (const p of Object.values(PIEGES)) {
    const cm = contreModeleDe(p);
    if (cm) sortes.add(cm.sorte);
  }
  verifier('les trois formes de contre-modèle du catalogue sont toutes reconnues',
    ['fonction', 'table', 'dispositifs'].every((s) => sortes.has(s)));
}

// ── Réserves ────────────────────────────────────────────────────────────────

reserve('la prédiction VERROUILLÉE ne se teste pas ici : c\'est une propriété de l\'écran'
  + '\n      (aucun chemin ne montre le résultat avant le verrou), pas une propriété d\'une'
  + '\n      fonction pure. Elle se lit sur `vueVerrou` et sur le seul appelant qui la lève.');
reserve('les trois items à réponse RÉDIGÉE sont en auto-évaluation déclarée : aucun'
  + '\n      programme ne corrige une phrase, et l\'écran ne prétend pas le contraire.');

// ── Rapport ─────────────────────────────────────────────────────────────────

console.log(`${ITEMS.length} items lus, ${Object.keys(PIEGES).length} pièges au catalogue.`);
console.log(`${passes} test(s) passé(s).`);
for (const e of echecs) console.log(`  ✗ ${e}`);
if (reserves.length) {
  console.log(`\n${reserves.length} réserve(s) :`);
  for (const r of reserves) console.log(`  ⚠ ${r}`);
}
if (echecs.length) {
  console.log(`\n${echecs.length} échec(s).`);
  process.exit(1);
}
