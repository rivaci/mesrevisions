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
  aComposer,
  contreModeleDe,
  corriger,
  corrigerDoubleQcm,
  corrigerValeur,
  distracteurTouche,
  executerContreModele,
  executerModeleErrone,
  circuitCompose,
  formeDeLObjetFormel,
  laFigureEstLaReponse,
  solutionsDeCircuit,
  sorteDeReponse,
  FORMES_COMPOSABLES,
  FORMES_D_OBJET_FORMEL,
  SORTES_DE_REPONSE,
} from '../js/reponse.js';
import { memeCircuit } from '../js/circuit.js';
import { rendreFigure } from '../js/schema.js';
import { SANS_UNITE, VERDICTS } from '../js/unites.js';
import {
  auPluriel, clesInconnues, libelle, libelleFormel, lireObjetFormel,
} from '../js/lexique.js';
import { SAVOIR_FAIRE as CONTENU_CH01 } from '../js/data/items/ch01/index.js';
// Les items de circuit sont au chapitre 2 et dans `exemples.js` : la section ⑥
// interroge donc le vivier ENTIER, là où le reste du fichier lit le chapitre 1.
import { ITEMS as ITEMS_TOUS } from '../js/data/items/index.js';
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
}

// ════════════════════════════════════════════════════════════════════════════
// ③ bis  Les objets qu'on COMPOSE
// ════════════════════════════════════════════════════════════════════════════
//
// Ce que ces tests cherchent à casser tient en trois phrases.
//
//   · **La comparaison doit être STRUCTURELLE.** Un classement rendu dans un
//     autre ordre, une grille dont les espèces sont comptées dans l'autre sens :
//     ce sont les mêmes réponses. Une comparaison de chaînes passerait les tests
//     « la réponse déclarée est acceptée » et échouerait sur l'élève réel, qui ne
//     compose pas dans l'ordre de déclaration.
//   · **Le verdict doit être un DIAGNOSTIC.** Un constat qui ne nomme pas ce qui
//     a été fait ne vaut pas mieux que « c'est faux ». On vérifie donc que chaque
//     erreur produit un constat, que le constat porte les mots de l'item, et
//     qu'un distracteur retenu ramène SA conception.
//   · **Aucun identifiant ne doit fuiter.** Les constats et les corrections sont
//     rédigés à partir du lexique ; un `?? cle` de repli mettrait
//     `suivre-la-temperature-pendant-tout-le-changement-d-etat` sous les yeux
//     d'un enfant de treize ans, et c'est le mode de panne le plus silencieux du
//     lot — l'écran fonctionne, il est simplement illisible.
//
// ── Ce que la relecture adverse y a ajouté ────────────────────────────────
//
// Les trois phrases ci-dessus étaient bonnes ; leurs tests ne couvraient que la
// moitié facile de chacune, et un défaut vivait dans chaque moitié manquante.
//
//   · la structure était vérifiée dans un seul sens — « deux objets égaux à
//     l'ordre près sont égaux ». La réciproque manquait, et c'est elle qui
//     mord : `corrigerRemiseEnOrdre` ne comparait que la LONGUEUR de la suite
//     avant de compter ses inversions adjacentes, si bien que `[a, a, b]` et
//     une suite d'étapes inconnues étaient rendues JUSTE, avec `reussite`
//     enregistrée au SRS. La casse, les doublons et les non-permutations ont
//     donc leurs cas ;
//   · le diagnostic était vérifié sur UN item par forme. Rien ne disait que les
//     trente en rendaient un ;
//   · la fuite d'identifiants était cherchée dans les constats et les
//     corrections, jamais dans le PLAN — c'est-à-dire dans l'autre moitié de ce
//     que l'élève a sous les yeux. Les cartes de « où est la matière » viennent
//     pour moitié d'`item.distracteurs`, que `identifiantsSansLibelle` ne
//     regarde pas : un distracteur sans texte affichait « undefined » ;
//   · `figureEstLaReponse` — le drapeau qui empêche les treize grilles de
//     servir leur corrigé au-dessus de l'énoncé — était une constante écrite
//     PAR FORME. Ce n'est pas une propriété de la forme mais de l'item, et
//     n'importe quelle autre forme à qui l'on ajoutait une figure rouvrait la
//     fuite en silence ;
//   · les objets formels dégénérés n'étaient pas testés du tout. Quatre d'entre
//     eux rendaient `issue: 'reussite'` au premier « Vérifier », sans qu'aucun
//     geste ait été fait, et le SRS n'a aucun moyen de les distinguer d'une
//     vraie réussite.

const COMPOSABLES = ITEMS.filter((i) => aComposer(i) !== null);
const INERTES = ITEMS.filter((i) => sorteDeReponse(i) === 'objet-formel' && aComposer(i) === null);

/** La réponse DÉCLARÉE de l'item, mise sous la forme que l'élève compose. */
function compositionJuste(item) {
  const o = item.reponse.objetFormel;
  const plan = aComposer(item);
  switch (plan.forme) {
    case 'classement':
      return { rangement: { ...o.affectation } };
    case 'grille-particulaire':
      return {
        etat: o.etat,
        nombres: Object.fromEntries(o.contenu.map((e) => [e.formule ?? e.nom, e.nombre])),
      };
    case 'remise-en-ordre':
      return { suite: [...o.ordre] };
    case 'choix-raisonne':
      return { tri: Object.fromEntries(plan.propositions.map((p) => [p, p === o.choisi ? 'garde' : 'ecarte'])) };
    case 'ou-est-la-matiere':
      return { visible: o.visible, tri: Object.fromEntries(plan.cartes.map((c) => [c.id, c.role])) };
    case 'releve':
      return { y: Object.fromEntries(o.points.map(([, v], i) => [i, String(v)])) };
    default: return {};
  }
}

const corrigerCompose = (item, compose) => corriger(item, { compose });

{
  const parForme = {};
  for (const item of ITEMS) {
    const f = formeDeLObjetFormel(item.reponse?.objetFormel);
    if (f) parForme[f] = (parForme[f] ?? 0) + 1;
  }
  // Le corpus porte HUIT jeux de champs distincts, et sept formes : le choix
  // raisonné en couvre deux, `{ choisi, ecartes }` et `{ choisi, ecartes,
  // pourquoi }`. `pourquoi` ne change pas ce que l'élève compose — il n'a aucune
  // valeur concurrente dans le corpus, et il entre dans la correction. En faire
  // une septième forme aurait dupliqué un widget pour un champ d'affichage.
  verifier(`les sept formes du corpus sont toutes classées — vues : ${Object.keys(parForme).sort().join(', ')}`,
    Object.keys(parForme).every((f) => Object.values(FORMES_D_OBJET_FORMEL).includes(f))
      && Object.keys(parForme).length === 7);
  verifier('le choix raisonné couvre bien ses deux variantes, avec et sans `pourquoi`',
    parForme['choix-raisonne'] === 4
      && ITEMS.filter((i) => i.reponse?.objetFormel?.pourquoi !== undefined).length === 2);
  // Sept formes se composent depuis que « circuit » est branchée. `ITEMS` étant
  // le seul chapitre 1, ses inertes restent d'une seule forme : le chapitre 2
  // en apporte d'autres, et la section « circuit » plus bas les compte.
  verifier('sept formes se composent, et les inertes du chapitre 1 sont d\'une seule',
    FORMES_COMPOSABLES.length === 7
      && new Set(INERTES.map((i) => formeDeLObjetFormel(i.reponse.objetFormel))).size === 1);
  verifier(`30 items se composent, 4 restent inertes — vus : ${COMPOSABLES.length}/${INERTES.length}`,
    COMPOSABLES.length === 30 && INERTES.length === 4);
}

// La réponse déclarée est acceptée. Le contrôle le plus bête du lot, et le seul
// qui interdise qu'un item compte faux l'élève qui a exactement raison.
{
  const refuses = [];
  for (const item of COMPOSABLES) {
    const r = corrigerCompose(item, compositionJuste(item));
    if (r.juste !== true || (r.constats ?? []).length !== 0) refuses.push(`${item.id} (${r.code})`);
  }
  verifier(`la composition déclarée de chaque item est acceptée — refusés : ${refuses.slice(0, 5).join(', ')}`,
    refuses.length === 0);
}

// Les quatre items de la huitième forme : NON_BRANCHE, et ils le DISENT. Aucun
// n'est corrigé en silence, aucun ne consomme d'essai.
{
  const r = INERTES.map((i) => corrigerCompose(i, {}));
  verifier('la forme non composable rend NON_BRANCHE, redemande, et ne comptabilise rien',
    r.every((x) => x.code === 'NON_BRANCHE' && x.redemande === true && x.issue === null));
  verifier('…et la phrase dit ce qui manque, pas « une erreur est survenue »',
    r.every((x) => /espèces/.test(x.message ?? '')));
}

// ── La comparaison est structurelle, pas textuelle ─────────────────────────
{
  const classement = COMPOSABLES.find((i) => aComposer(i).forme === 'classement');
  const o = classement.reponse.objetFormel;
  const alEnvers = Object.fromEntries(Object.entries(o.affectation).reverse());
  verifier('un classement rangé dans l\'autre ordre est le MÊME classement',
    corrigerCompose(classement, { rangement: alEnvers }).juste === true);

  const grille = COMPOSABLES.find((i) => aComposer(i).forme === 'grille-particulaire'
    && i.reponse.objetFormel.contenu.length > 1);
  const g = grille.reponse.objetFormel;
  verifier('une grille comptée espèce par espèce dans l\'autre sens est la MÊME grille',
    corrigerCompose(grille, {
      etat: g.etat,
      nombres: Object.fromEntries(g.contenu.map((e) => [e.formule ?? e.nom, e.nombre]).reverse()),
    }).juste === true);

  // Le total juste, réparti à l'envers entre deux espèces : c'est FAUX, et c'est
  // exactement ce qu'une comparaison sur le total laisserait passer.
  const [a, b] = g.contenu;
  verifier('…mais deux espèces échangées ne le sont pas : c\'est un multi-ensemble, pas une somme',
    corrigerCompose(grille, {
      etat: g.etat,
      nombres: { [a.formule ?? a.nom]: b.nombre, [b.formule ?? b.nom]: a.nombre },
    }).constats.length === 2);
}

// ── Rien n'est validé tant que tout n'est pas posé ─────────────────────────
{
  const classement = COMPOSABLES.find((i) => aComposer(i).forme === 'classement');
  const partiel = Object.fromEntries(Object.entries(classement.reponse.objetFormel.affectation).slice(0, 2));
  const r = corrigerCompose(classement, { rangement: partiel });
  verifier('un classement à moitié rempli REDEMANDE au lieu de compter faux',
    r.code === VERDICTS.REPONSE_INCOMPLETE && r.redemande === true && r.issue === null);
  verifier('…et la phrase dit combien il en reste', /reste 2 choses/.test(r.message ?? ''));

  const grille = COMPOSABLES.find((i) => aComposer(i).forme === 'grille-particulaire');
  verifier('une grille sans état choisi redemande',
    corrigerCompose(grille, { nombres: { X: 3 } }).code === VERDICTS.REPONSE_INCOMPLETE);
  verifier('…et un récipient vide aussi',
    corrigerCompose(grille, { etat: 'gaz' }).code === VERDICTS.REPONSE_INCOMPLETE);

  const choix = COMPOSABLES.find((i) => aComposer(i).forme === 'choix-raisonne');
  const props = aComposer(choix).propositions;
  verifier('un choix raisonné où l\'on garde tout redemande : l\'énoncé en demande un seul',
    /qu’un seul/.test(corrigerCompose(choix, {
      tri: Object.fromEntries(props.map((p) => [p, 'garde'])),
    }).message ?? ''));
  verifier('…et un choix où l\'on n\'a rien dit d\'une proposition redemande aussi',
    corrigerCompose(choix, {
      tri: Object.fromEntries(props.slice(1).map((p) => [p, 'ecarte'])),
    }).code === VERDICTS.REPONSE_INCOMPLETE);
}

// ── Le diagnostic : ce que l'élève a FAIT, nommé ───────────────────────────
{
  const classement = ITEMS.find((i) => i.id === 'ch01-sf1-e01-quatre-flacons-de-la-paillasse');
  const r = corrigerCompose(classement, {
    rangement: { ...classement.reponse.objetFormel.affectation, 'air du ballon de baudruche': 'corps-pur' },
  });
  verifier('un classement fautif rend UN constat par erreur, pas un verdict',
    r.juste === false && r.constats.length === 1);
  verifier('…et le constat NOMME la chose et la colonne où elle a été rangée',
    /air du ballon de baudruche/.test(r.constats[0].texte)
      && /Corps purs/.test(r.constats[0].texte)
      && /un mélange/.test(r.constats[0].texte));

  const grille = ITEMS.find((i) => i.id === 'ch01-sf1-p03-l-eau-gazeuse-au-niveau-des-molecules');
  const g = grille.reponse.objetFormel;
  const surLEtat = corrigerCompose(grille, {
    ...compositionJuste(grille), etat: 'gaz',
  });
  verifier('un état faux est un constat À PART : ce n\'est pas la même erreur qu\'un compte faux',
    surLEtat.constats.length === 1 && surLEtat.constats[0].code === 'ETAT_FAUX');
  verifier('…et il dit les deux états, celui composé et celui de l\'énoncé',
    /un gaz/.test(surLEtat.constats[0].texte) && /un liquide/.test(surLEtat.constats[0].texte));

  const surLeCompte = corrigerCompose(grille, {
    etat: g.etat,
    nombres: { ...compositionJuste(grille).nombres, [g.contenu[0].formule]: 4 },
  });
  verifier('un compte faux dit combien il y en a et combien il en fallait',
    surLeCompte.constats.length === 1
      && /4 molécules/.test(surLeCompte.constats[0].texte)
      && /il en fallait 10/.test(surLeCompte.constats[0].texte));
  // « 16 atomes de fer » et « 16 molécules de fer » ne sont pas deux façons de
  // dire la même chose : c'est la distinction que ces items enseignent, et elle
  // est lue sur `schema.js`, pas recopiée ici.
  const atomique = ITEMS.find((i) => i.id === 'ch01-sf1-t06-le-fer-au-niveau-des-atomes');
  verifier('une espèce à un seul atome est comptée en ATOMES, pas en molécules',
    /atomes/.test(corrigerCompose(atomique, {
      etat: atomique.reponse.objetFormel.etat, nombres: { Fe: 3 },
    }).constats[0].texte));

  const ordre = COMPOSABLES.find((i) => aComposer(i).forme === 'remise-en-ordre');
  const inverse = corrigerCompose(ordre, { suite: [...ordre.reponse.objetFormel.ordre].reverse() });
  verifier('une remise en ordre fautive nomme les étapes INVERSÉES, deux à deux',
    inverse.juste === false && inverse.constats.length === 2
      && inverse.constats.every((c) => c.code === 'ETAPES_INVERSEES' && / avant /.test(c.texte)));

  const choix = ITEMS.find((i) => i.id === 'ch01-sf1-e02-limpide-donc-pur');
  const oc = choix.reponse.objetFormel;
  const garde = corrigerCompose(choix, {
    tri: Object.fromEntries(aComposer(choix).propositions
      .map((p) => [p, p === oc.ecartes[0] ? 'garde' : 'ecarte'])),
  });
  verifier('un choix raisonné fautif dit ce qui a été gardé ET ce qui a été écarté',
    garde.constats.length === 1 && garde.constats[0].code === 'MAUVAIS_RETENU'
      && /loupe/.test(garde.constats[0].texte));
}

// ── Un distracteur RETENU ramène sa conception ─────────────────────────────
//
// C'est le seul endroit de ces trente items où le piège s'attribue à ce que
// l'élève vient de faire plutôt qu'à l'item entier : les cartes de « où est la
// matière » portent l'`id` du distracteur, donc son `piege`.
{
  const perdus = [];
  for (const item of COMPOSABLES.filter((i) => aComposer(i).forme === 'ou-est-la-matiere')) {
    for (const d of item.distracteurs ?? []) {
      const juste = compositionJuste(item);
      // Le distracteur prend la place du lieu, qui part à la corbeille : deux
      // phrases dans une même case feraient redemander, et rien ne serait dit.
      const r = corrigerCompose(item, {
        ...juste,
        tri: { ...juste.tri, [d.id]: 'lieu', [item.reponse.objetFormel.lieu]: 'ecarte' },
      });
      if (r.piege !== d.piege) perdus.push(`${item.id}/${d.id} → ${r.piege}`);
      if (!r.constats.some((c) => c.code === 'DISTRACTEUR_RETENU' && c.piege === d.piege)) {
        perdus.push(`${item.id}/${d.id} : aucun constat`);
      }
    }
  }
  verifier(`chaque distracteur retenu ramène SON piège — perdus : ${perdus.slice(0, 4).join(', ')}`,
    perdus.length === 0);

  const item = ITEMS.find((i) => i.id === 'ch01-sf7-e01-ou-est-le-gaz-de-la-bouteille-fermee');
  const juste = compositionJuste(item);
  const vu = corrigerCompose(item, { ...juste, visible: true });
  verifier('« on le voit » alors que l\'énoncé dit le contraire est un constat à part',
    vu.constats.length === 1 && vu.constats[0].code === 'VISIBLE_FAUX');
  const o = item.reponse.objetFormel;
  const echange = corrigerCompose(item, {
    ...juste, tri: { ...juste.tri, [o.lieu]: 'forme', [o.forme]: 'lieu' },
  });
  verifier('deux phrases justes rangées dans les mauvais rôles se disent rôle par rôle',
    echange.constats.length === 2 && echange.constats.every((c) => c.code === 'ROLE_FAUX'));
  verifier('…et aucune ne ramène de piège : se tromper de case n\'est pas une conception',
    echange.constats.every((c) => c.piege === null) && echange.piege === item.piege);
}

// ── Le relevé : le même lecteur de nombres que les réponses chiffrées ──────
{
  const releve = COMPOSABLES.find((i) => aComposer(i).forme === 'releve');
  const o = releve.reponse.objetFormel;
  verifier('un relevé écrit à la virgule est lu comme le corpus l\'écrit',
    corrigerCompose(releve, {
      y: Object.fromEntries(o.points.map(([, v], i) => [i, `${v},0`])),
    }).juste === true);
  const faux = corrigerCompose(releve, {
    y: { ...compositionJuste(releve).y, 0: '65' },
  });
  verifier('une valeur fausse est dite AVEC son abscisse : « pour 20, tu as écrit 65 »',
    faux.constats.length === 1
      && /20/.test(faux.constats[0].texte) && /65/.test(faux.constats[0].texte));
  verifier('une saisie illisible redemande au lieu de compter faux',
    corrigerCompose(releve, {
      y: { ...compositionJuste(releve).y, 0: 'soixante-dix' },
    }).code === VERDICTS.REPONSE_INCOMPLETE);
}

// ── Aucun identifiant ne fuite dans ce qu'on lit ───────────────────────────
//
// Le lexique existe pour que `dans-l-air-enferme-sous-la-cloche` ne soit jamais
// servi à un élève. Chaque rédaction du verdict porte un `?? cle` de repli — il
// est là pour ne pas casser sur un contenu fautif, pas pour être atteint. Ce
// test le prouve sur les trente items et sur des compositions FAUSSES, seules
// à faire parler les constats.
{
  const fuites = [];
  for (const item of COMPOSABLES) {
    const o = item.reponse.objetFormel;
    // Les identifiants d'un seul mot (« gaz », « solide ») se retrouvent
    // légitimement dans une phrase française : seuls les slugs sont cherchés.
    const slugs = lireObjetFormel(o).identifiants.filter((c) => c.includes('-'));
    if (!slugs.length) continue;
    const juste = compositionJuste(item);
    const r = corrigerCompose(item, juste);
    const faux = corrigerCompose(item, brouiller(item, juste));
    const textes = [r.correction, faux.correction, ...(faux.constats ?? []).map((c) => c.texte)]
      .filter(Boolean).join(' ');
    for (const s of slugs) if (textes.includes(s)) fuites.push(`${item.id} : ${s}`);
  }
  verifier(`aucun identifiant nu dans les corrections ni les constats — fuites : ${fuites.slice(0, 4).join(', ')}`,
    fuites.length === 0);
}

/** Une composition volontairement fausse, dérivée de la juste — de quoi faire
 *  parler les constats sans écrire une réponse fausse par item. */
function brouiller(item, juste) {
  const plan = aComposer(item);
  switch (plan.forme) {
    case 'classement': {
      const [premiere] = plan.etiquettes;
      const autre = plan.categories.find((c) => c !== juste.rangement[premiere]);
      return { rangement: { ...juste.rangement, [premiere]: autre } };
    }
    case 'grille-particulaire':
      return { ...juste, etat: plan.etats.find((e) => e !== juste.etat) };
    case 'remise-en-ordre':
      return { suite: [...juste.suite].reverse() };
    case 'choix-raisonne': {
      const o = item.reponse.objetFormel;
      return { tri: Object.fromEntries(plan.propositions.map((p) => [p, p === o.ecartes[0] ? 'garde' : 'ecarte'])) };
    }
    case 'ou-est-la-matiere': {
      const o = item.reponse.objetFormel;
      return { ...juste, tri: { ...juste.tri, [o.lieu]: 'forme', [o.forme]: 'lieu' } };
    }
    case 'releve':
      return { y: { ...juste.y, 0: '0' } };
    default: return juste;
  }
}

// ── Les neuf codes de constat sont tous atteints ──────────────────────────
{
  const codes = new Set();
  for (const item of COMPOSABLES) {
    for (const c of corrigerCompose(item, brouiller(item, compositionJuste(item))).constats ?? []) {
      codes.add(c.code);
    }
  }
  // MAL_RANGE, ETAT_FAUX, ETAPES_INVERSEES, MAUVAIS_RETENU, ROLE_FAUX,
  // VALEUR_RELEVEE_FAUSSE sortent de `brouiller` ; NOMBRE_FAUX, VISIBLE_FAUX et
  // DISTRACTEUR_RETENU ont leur propre cas plus haut.
  verifier(`les codes de constat de « brouiller » sont tous produits — vus : ${[...codes].sort().join(', ')}`,
    ['MAL_RANGE', 'ETAT_FAUX', 'ETAPES_INVERSEES', 'MAUVAIS_RETENU', 'ROLE_FAUX', 'VALEUR_RELEVEE_FAUSSE']
      .every((c) => codes.has(c)));
}

// ── La figure d'un item composable EST sa réponse ─────────────────────────
//
// L'invariant 6 impose `figure.description === reponse.objetFormel` par
// identité de référence. Sur les grilles et le relevé, la figure DESSINE donc la
// réponse — et l'écran ne doit pas la servir avec l'énoncé. C'est `aComposer`
// qui le déclare, et non l'écran : le contrôle porte donc ici.
{
  const aFigure = COMPOSABLES.filter((i) => i.figure);
  verifier(`tout item composable qui porte une figure la déclare comme étant sa réponse — ${aFigure.length} items`,
    aFigure.length === 14 && aFigure.every((i) => aComposer(i).figureEstLaReponse === true));
  verifier('…et aucun item composable sans figure ne le prétend',
    COMPOSABLES.filter((i) => !i.figure).every((i) => aComposer(i).figureEstLaReponse === false));

  // ⚠ Le cas-témoin de la garde d'`aComposer`, et il a attrapé une régression
  // pendant qu'on l'écrivait. QUATORZE items portent une VALEUR et un objet
  // formel : ce sont les lectures graphiques. Sans la garde, `aComposer` les
  // réclamait — et `figureEstLaReponse` faisait disparaître le graphique qu'il
  // faut lire pour répondre. Un item de lecture sans son graphique reste
  // parfaitement fonctionnel à l'écran : il est simplement impossible.
  const valeurEtObjet = ITEMS.filter((i) => i.reponse?.valeur !== undefined
    && i.reponse?.objetFormel !== undefined);
  verifier(`les ${valeurEtObjet.length} items à valeur ET objet formel ne se composent pas`,
    valeurEtObjet.length === 14 && valeurEtObjet.every((i) => aComposer(i) === null));
  verifier('…et leur figure reste servie avec l\'énoncé : sans elle, la question n\'a pas de réponse',
    valeurEtObjet.every((i) => i.figure));
}

// Deux espèces d'une même grille ne peuvent pas partager leur clé : le
// multi-ensemble les fondrait en une, et le compteur de l'écran aussi — l'élève
// composerait une espèce là où l'énoncé en décrit deux, sans que rien le dise.
{
  const collisions = [];
  for (const item of COMPOSABLES.filter((i) => aComposer(i).forme === 'grille-particulaire')) {
    const cles = aComposer(item).especes.map((e) => e.cle);
    if (new Set(cles).size !== cles.length) collisions.push(item.id);
  }
  verifier(`les espèces d'une grille ont des clés distinctes — collisions : ${collisions.join(', ')}`,
    collisions.length === 0);
}

// ── ③bis Ce qu'une comparaison de CHAÎNES laisserait passer ────────────────
//
// Les tests ci-dessus prouvent qu'un objet composé dans un autre ordre reste le
// même objet. Ils ne prouvaient pas la réciproque, qui est la moitié
// dangereuse : **deux objets différents ne doivent JAMAIS être égaux.** Quatre
// familles de saisies l'attaquent, et l'une d'elles passait.

// Le DOUBLON, et l'étape inconnue. C'est le défaut qui a motivé cette section :
// `corrigerRemiseEnOrdre` ne vérifiait que la LONGUEUR de la suite, puis
// comptait les inversions adjacentes. `[a, a, b]` n'en porte aucune —
// `rang(a) = rang(a)` n'est pas une inversion — et une suite d'étapes inconnues
// n'en porte aucune non plus, parce que `rang.get` rend `undefined` et que
// toute comparaison avec `undefined` est fausse. Les deux étaient rendues JUSTE,
// avec `issue: 'reussite'` ENREGISTRÉE : une réussite au compteur du SRS, sans
// qu'aucune étape ait été rangée.
{
  const ordre = COMPOSABLES.find((i) => aComposer(i).forme === 'remise-en-ordre');
  const et = aComposer(ordre).etapes;

  const doublon = corrigerCompose(ordre, { suite: [et[0], et[0], et[1]] });
  verifier('une suite à DOUBLON n\'est pas une réussite : la comparaison porte sur le multi-ensemble',
    doublon.juste === false && doublon.issue === null && doublon.redemande === true);

  const inconnues = corrigerCompose(ordre, { suite: ['x', 'y', 'z'] });
  verifier('une suite d\'étapes INCONNUES non plus — `undefined` ne se compare pas',
    inconnues.juste === false && inconnues.issue === null);

  const troisFois = corrigerCompose(ordre, { suite: [et[2], et[2], et[2]] });
  verifier('…ni la même étape trois fois, qui ne porte elle non plus aucune inversion',
    troisFois.juste === false && troisFois.issue === null);

  verifier('…et la vraie permutation, elle, reste acceptée',
    corrigerCompose(ordre, { suite: [...et] }).juste === true);
  verifier('…y compris l\'inverse, qui est fausse mais reste diagnostiquée',
    corrigerCompose(ordre, { suite: [...et].reverse() }).constats.length === 2);
}

// La CASSE. Rien ici ne normalise, et rien ne doit le faire : « Co » et « CO »
// ne désignent pas le même élément, et une catégorie n'est pas un mot français
// mais une clé. Une comparaison qui replierait la casse compterait juste un
// élève qui a rangé ailleurs.
{
  const classement = COMPOSABLES.find((i) => aComposer(i).forme === 'classement');
  const o = classement.reponse.objetFormel;
  const enCapitales = Object.fromEntries(
    Object.entries(o.affectation).map(([e, c]) => [e, c.toUpperCase()]),
  );
  const r = corrigerCompose(classement, { rangement: enCapitales });
  verifier('une catégorie écrite dans une autre casse n\'est PAS la même catégorie',
    r.juste === false && r.constats.length === aComposer(classement).etiquettes.length);

  const grille = COMPOSABLES.find((i) => aComposer(i).forme === 'grille-particulaire');
  const g = grille.reponse.objetFormel;
  const cleAutreCasse = Object.fromEntries(
    g.contenu.map((e) => [(e.formule ?? e.nom).toLowerCase(), e.nombre]),
  );
  const rg = corrigerCompose(grille, { etat: g.etat, nombres: cleAutreCasse });
  verifier('une clé d\'espèce écrite dans une autre casse ne compte pas pour la bonne',
    rg.juste === false);
}

// Une CATÉGORIE SANS ÉTIQUETTE est légitime — une colonne-piège se compose, et
// l'auteur a le droit d'en écrire une. Ce qu'elle ne doit pas produire, c'est
// une correction qui s'arrête sur ses deux-points : « Mélanges :  » se lit comme
// un corrigé tronqué, et l'élève ne sait pas si c'est vide ou cassé.
{
  const objet = { categories: ['corps-pur', 'melange'], affectation: { sel: 'corps-pur', fer: 'corps-pur' } };
  const colonneVide = {
    id: 'test-colonne-vide', sfPrincipal: 'ch01-sf1-distinguer-corps-pur-et-melange',
    reponse: { objetFormel: objet },
  };
  const r = corrigerCompose(colonneVide, { rangement: { sel: 'melange', fer: 'corps-pur' } });
  verifier('une catégorie restée vide se DIT — la correction ne s\'arrête pas sur ses deux-points',
    /Mélanges : —/.test(r.correction ?? ''));
  verifier('…et la colonne remplie, elle, cite ce qu\'elle contient',
    /Corps purs : sel, fer/.test(r.correction ?? ''));
}

// L'ORDRE DE SAISIE d'une affectation. Le classement était couvert ; le choix
// raisonné et « où est la matière » ne l'étaient pas, et ce sont des tables
// elles aussi — un élève qui se prononce en remontant compose le même objet.
{
  const choix = COMPOSABLES.find((i) => aComposer(i).forme === 'choix-raisonne');
  const justeChoix = compositionJuste(choix).tri;
  verifier('un choix raisonné trié en remontant est le MÊME tri',
    corrigerCompose(choix, {
      tri: Object.fromEntries(Object.entries(justeChoix).reverse()),
    }).juste === true);

  const oem = COMPOSABLES.find((i) => aComposer(i).forme === 'ou-est-la-matiere');
  const justeOem = compositionJuste(oem);
  verifier('une affectation de phrases saisie en remontant est la MÊME affectation',
    corrigerCompose(oem, {
      ...justeOem, tri: Object.fromEntries(Object.entries(justeOem.tri).reverse()),
    }).juste === true);

  const releve = COMPOSABLES.find((i) => aComposer(i).forme === 'releve');
  const justeReleve = compositionJuste(releve).y;
  verifier('un relevé rempli de droite à gauche est le MÊME relevé',
    corrigerCompose(releve, { y: Object.fromEntries(Object.entries(justeReleve).reverse()) }).juste === true);
  const partiel = { ...justeReleve };
  delete partiel[0];
  verifier('…et un relevé à qui il manque une case REDEMANDE au lieu de compter faux',
    corrigerCompose(releve, { y: partiel }).code === VERDICTS.REPONSE_INCOMPLETE);
}

// ── ③ter Le plan ne porte pas la réponse ───────────────────────────────────
//
// `aComposer` sert à l'écran ET à la correction : tout ce qu'il rend est
// potentiellement dessiné. Ce que la grille et le relevé demandent de trouver —
// un état, des nombres, des ordonnées — ne doit donc PAS s'y trouver, et pas
// seulement « ne pas être affiché aujourd'hui ».
{
  const grilles = COMPOSABLES.filter((i) => aComposer(i).forme === 'grille-particulaire');
  verifier('le plan d\'une grille ne porte ni l\'état attendu ni les nombres attendus',
    grilles.every((i) => {
      const p = aComposer(i);
      return p.etat === undefined && p.especes.every((e) => e.nombre === undefined);
    }));

  const releve = COMPOSABLES.find((i) => aComposer(i).forme === 'releve');
  const plan = aComposer(releve);
  const ordonnees = releve.reponse.objetFormel.points.map(([, v]) => String(v));
  const servi = JSON.stringify(plan);
  verifier(`le plan d'un relevé ne porte que les abscisses — ordonnées cherchées : ${ordonnees.join(', ')}`,
    ordonnees.every((v) => !servi.includes(`:${v}`) && !servi.includes(`,${v},`)));
  verifier('…et il en porte bien les abscisses, sans quoi il n\'y aurait pas de tableau',
    plan.abscisses.length === releve.reponse.objetFormel.points.length);
}

// ── ③quater `figureEstLaReponse` est DÉRIVÉ, jamais recopié ────────────────
//
// C'est la régression qu'il faut rendre impossible, pas seulement corriger. Le
// drapeau était une constante écrite PAR FORME — `true` pour la grille et le
// relevé, `false` pour les quatre autres. Or ce n'est pas une propriété de la
// forme, c'est une propriété de l'ITEM : l'invariant 6 impose que la figure d'un
// item de classe B et sa réponse soient le même objet, par identité de
// référence. Un classement, une remise en ordre ou un choix raisonné à qui l'on
// ajouterait une figure aurait donc affiché son corrigé au-dessus de l'énoncé —
// exactement ce que les treize grilles faisaient — et le drapeau, lui, aurait
// continué à dire `false`.
{
  const AFFECTATION = { sel: 'corps-pur', 'eau salée': 'melange' };
  const objet = { question: 'de-quoi-s-agit-il', categories: ['corps-pur', 'melange'], affectation: AFFECTATION };
  const avecFigure = {
    id: 'test-classement-figure', sfPrincipal: 'ch01-sf1-distinguer-corps-pur-et-melange',
    figure: { sorte: 'tableau', donnees: objet },
    reponse: { objetFormel: objet },
  };
  verifier('un CLASSEMENT dont la figure est sa réponse le déclare — le drapeau suit l\'item, pas la forme',
    aComposer(avecFigure).figureEstLaReponse === true);

  const sansFigure = { ...avecFigure, id: 'test-classement-nu', figure: undefined };
  verifier('…et le même classement sans figure ne le prétend pas',
    aComposer(sansFigure).figureEstLaReponse === false);

  const figureAutre = {
    ...avecFigure,
    id: 'test-classement-autre-figure',
    figure: { sorte: 'tableau', donnees: { ...objet } },
  };
  verifier('…une figure qui n\'est qu\'une COPIE de la réponse ne l\'est pas : c\'est l\'identité qui décide',
    aComposer(figureAutre).figureEstLaReponse === false);

  // Les trois clés sous lesquelles une figure porte son objet, telles que
  // l'invariant 6 les lit dans `item.js`. En oublier une ferait retomber le
  // drapeau à `false` sur les items concernés — et le relevé du corpus passe
  // précisément par `donnees`, pas par `description`.
  const parCle = ['description', 'donnees', 'circuit'].map((cle) => aComposer({
    ...avecFigure, id: `test-cle-${cle}`, figure: { sorte: 'tableau', [cle]: objet },
  }).figureEstLaReponse);
  verifier(`les trois clés de figure sont lues — vues : ${parCle.join(', ')}`,
    parCle.every((v) => v === true));
}

// ── ⑤ Les cas dégénérés : un verdict, jamais une exception ─────────────────
//
// Aucun de ces objets n'existe dans le corpus, et c'est justement pourquoi ils
// sont ici : le jour où l'un d'eux est écrit, il ne doit ni blanchir l'écran ni
// — bien pire — être compté RÉUSSI. Trois d'entre eux l'étaient : un classement
// sans étiquette, un relevé sans point et une remise en ordre à zéro ou une
// étape passaient `constats.length === 0` et rendaient `issue: 'reussite'` au
// premier « Vérifier », sans qu'aucun geste ait été fait. Le SRS n'a aucun moyen
// de distinguer cette réussite-là d'une vraie.
{
  const item = (objetFormel, extra = {}) => ({
    id: 'test-degenere', sfPrincipal: 'ch01-sf1-distinguer-corps-pur-et-melange',
    reponse: { objetFormel }, ...extra,
  });
  const DEGENERES = [
    ['un objet formel vide', item({}), {}],
    ['un classement sans étiquette', item({ affectation: {}, categories: ['corps-pur', 'melange'] }), { rangement: {} }],
    ['un classement sans catégorie', item({ affectation: { sel: 'corps-pur' } }), { rangement: { sel: 'corps-pur' } }],
    ['un classement rangé vers une catégorie qu\'aucun bouton ne propose',
      item({ affectation: { sel: 'gaz' }, categories: ['corps-pur', 'melange'] }), { rangement: { sel: 'gaz' } }],
    ['une permutation à zéro élément', item({ ordre: [] }), { suite: [] }],
    ['une permutation à UN élément, déjà rangée par construction',
      item({ ordre: ['dissolution'] }), { suite: ['dissolution'] }],
    ['un choix raisonné à une seule proposition', item({ choisi: 'corps-pur', ecartes: [] }), { tri: { 'corps-pur': 'garde' } }],
    ['un choix raisonné dont une proposition est écrite deux fois',
      item({ choisi: 'corps-pur', ecartes: ['corps-pur', 'melange'] }), { tri: { 'corps-pur': 'garde', melange: 'ecarte' } }],
    ['un relevé sans point', item({ x: { titre: 'a' }, y: { titre: 'b' }, points: [] }), { y: {} }],
    ['une grille sans espèce', item({ etat: 'solide', contenu: [] }), { etat: 'solide', nombres: {} }],
    ['une grille qui dépasse PARTICULES_MAX, que le « + » de l\'écran ne peut pas atteindre',
      item({ etat: 'solide', contenu: [{ nom: 'eau', formule: 'H2O', atomes: ['H', 'H', 'O'], nombre: 99 }] }),
      { etat: 'solide', nombres: { H2O: 36 } }],
    ['une grille où deux espèces partagent leur clé',
      item({ etat: 'solide', contenu: [{ nom: 'eau', formule: 'H2O', nombre: 2 }, { nom: 'eau lourde', formule: 'H2O', nombre: 3 }] }),
      { etat: 'solide', nombres: { H2O: 5 } }],
  ];

  const leves = [];
  const comptes = [];
  for (const [nom, sujet, compose] of DEGENERES) {
    let r;
    try {
      r = corrigerCompose(sujet, compose);
    } catch (e) {
      leves.push(`${nom} → ${e.message}`);
      continue;
    }
    if (r.issue !== null || r.juste === true || r.redemande !== true) {
      comptes.push(`${nom} → ${r.code}/${r.issue}/${r.juste}`);
    }
  }
  verifier(`aucun objet formel dégénéré ne LÈVE — ${leves.slice(0, 3).join(' | ')}`, leves.length === 0);
  verifier(`…et aucun n'est compté, ni réussi ni raté — ${comptes.slice(0, 3).join(' | ')}`,
    comptes.length === 0);
  verifier(`les ${DEGENERES.length} cas dégénérés sont bien tous couverts`, DEGENERES.length === 12);

  // Et la phrase servie n'accuse pas l'élève d'une faute de contenu. Elle est
  // distincte de celle de la huitième forme : envoyer chercher sur son cahier
  // une question à qui il manque ses propositions serait un mensonge.
  const vide = corrigerCompose(DEGENERES[1][1], {});
  verifier('une forme composable dont le plan est vide dit que c\'est LA QUESTION qui est incomplète',
    vide.code === VERDICTS.CONTENU_INVALIDE && /pas toi, c’est elle|pas toi, c'est elle/.test(vide.message ?? ''));
  verifier('…et la huitième forme garde SA phrase, qui parle des espèces',
    corrigerCompose(INERTES[0], {}).code === 'NON_BRANCHE');
}

// Le treizième cas dégénéré a son bloc, parce qu'il vient d'AILLEURS que de
// l'objet formel et que c'est tout son intérêt.
//
// La garde du lexique — `identifiantsSansLibelle` — interroge le seul
// `reponse.objetFormel`. Or la moitié des cartes de « où est la matière »
// viennent d'`item.distracteurs`, qui n'en fait pas partie : aucune des deux
// couches ne les regardait. Un distracteur sans `texte` s'affichait donc
// « undefined » sur son bouton, et son constat disait « Tu as retenu
// « undefined » » — pire qu'un identifiant nu, parce que ça ne veut rien dire
// du tout et que ça ressemble à une panne.
{
  const modele = COMPOSABLES.find((i) => aComposer(i).forme === 'ou-est-la-matiere');
  const muet = {
    ...modele,
    id: 'test-distracteur-muet',
    distracteurs: modele.distracteurs.map((d, i) => (i === 0 ? { ...d, texte: '' } : d)),
  };
  verifier('un distracteur SANS TEXTE referme la question au lieu de servir « undefined »',
    aComposer(muet) === null
      && corrigerCompose(muet, {}).code === VERDICTS.CONTENU_INVALIDE);
  // Le témoin : le même item, texte intact, se compose et s'accepte. Sans lui,
  // le contrôle ci-dessus passerait aussi pour une mauvaise raison.
  verifier('…et le même item, texte intact, se compose toujours',
    aComposer(modele) !== null && corrigerCompose(modele, compositionJuste(modele)).juste === true);
}

// Et le corpus, lui, n'en porte aucun : tout item dont la forme est composable
// se compose vraiment. Sans ce contrôle, un item dégénéré serait « bien
// refusé » — et injouable en silence.
{
  const refuses = ITEMS.filter((i) => sorteDeReponse(i) === 'objet-formel'
    && FORMES_COMPOSABLES.includes(formeDeLObjetFormel(i.reponse?.objetFormel))
    && aComposer(i) === null);
  verifier(`aucun item du corpus n'est d'une forme composable sans être jouable — ${refuses.map((i) => i.id).join(', ')}`,
    refuses.length === 0);
}

// ── ④ Le diagnostic, sur CHAQUE item et non sur un par forme ───────────────
//
// Les cas nommés plus haut prouvent la qualité du constat sur un item de chaque
// forme. Ils ne prouvent pas qu'aucun des trente ne dégénère en « c'est faux ».
// Un constat qui ne cite rien de ce que l'élève a fait ne vaut pas mieux qu'un
// booléen — et c'est la seule chose qui distingue cette application d'un
// exerciseur.
{
  const muets = [];
  for (const item of COMPOSABLES) {
    const r = corrigerCompose(item, brouiller(item, compositionJuste(item)));
    if (r.juste !== false || (r.constats ?? []).length === 0) {
      muets.push(`${item.id} : aucun constat`);
      continue;
    }
    // Un constat NOMME : il dit à l'élève ce que LUI a fait — « tu as composé
    // un solide », « tu en as posé 4 » — ou, à défaut, il cite entre guillemets
    // la chose dont il parle. Les dix rédactions de `reponse.js` font l'un ou
    // l'autre ; celle qui cesserait de le faire ne dirait plus que « c'est
    // faux » avec plus de mots.
    const sansCitation = r.constats.filter((c) => !/\btu\b/i.test(c.texte) && !/«[^»]+»/.test(c.texte));
    if (sansCitation.length) muets.push(`${item.id} : « ${sansCitation[0].texte} »`);
  }
  verifier(`les ${COMPOSABLES.length} items composables rendent tous un constat qui NOMME — ${muets.slice(0, 3).join(' | ')}`,
    muets.length === 0);

  // Le pendant : un constat n'est pas le corrigé. « La réponse est X » servi
  // comme diagnostic reviendrait à répondre à la place de l'élève.
  const copies = COMPOSABLES.filter((item) => {
    const r = corrigerCompose(item, brouiller(item, compositionJuste(item)));
    return (r.constats ?? []).some((c) => c.texte === r.correction);
  });
  verifier(`aucun constat n'est la simple recopie de la correction — ${copies.map((i) => i.id).join(', ')}`,
    copies.length === 0);
}

// ── ③quinquies Aucun identifiant nu dans ce que l'ÉCRAN va rendre ─────────
//
// Le test plus haut lit les corrections et les constats. Il ne lit pas le PLAN,
// qui est l'autre moitié de ce qu'un élève a sous les yeux : les étiquettes, les
// têtes de colonnes, les étapes, les propositions, les cartes, les noms
// d'espèces, les titres d'axes. `app.js` les résout par le lexique, avec un
// `?? cle` de repli ; on rejoue ici la MÊME résolution et on vérifie qu'aucun
// repli n'est atteint.
//
// ⚠ C'est ce test qui voit ce qu'`identifiantsSansLibelle` ne peut pas voir :
// elle interroge le seul `reponse.objetFormel`, et les cartes de « où est la
// matière » viennent pour moitié d'`item.distracteurs`, qui n'en font pas
// partie. Un distracteur sans `texte` s'affichait « undefined ».
{
  const estUnSlug = (s) => /^[a-z0-9]+(-[a-z0-9]+)+$/.test(String(s).trim());
  const enTeteDeCase = (cle) => auPluriel(cle) ?? libelleFormel(cle) ?? cle;
  const texteDeLaCarte = (c) => (c.distracteur ? c.distracteur.texte : (libelleFormel(c.id) ?? c.id));

  /** Tout ce qu'`app.js` écrit à partir du plan, résolu comme il le résout. */
  function motsAffiches(item, plan) {
    switch (plan.forme) {
      case 'classement':
        return [...plan.etiquettes, ...plan.categories.map(enTeteDeCase)];
      case 'grille-particulaire':
        return [
          ...plan.etats.map((e) => libelleFormel(e) ?? e),
          ...plan.especes.flatMap((e) => [e.nom ?? e.cle, e.entite]),
        ];
      case 'remise-en-ordre':
        return plan.etapes.map((e) => libelleFormel(e) ?? e);
      case 'choix-raisonne':
        return plan.propositions.map((p) => libelleFormel(p) ?? p);
      case 'ou-est-la-matiere':
        return [...plan.roles.map((r) => r.titre), ...plan.cartes.map(texteDeLaCarte)];
      case 'releve':
        return [plan.titreX, plan.titreY];
      default: return [];
    }
  }

  const nus = [];
  const vides = [];
  for (const item of COMPOSABLES) {
    for (const mot of motsAffiches(item, aComposer(item))) {
      if (mot === undefined || mot === null || !String(mot).trim()) vides.push(`${item.id} : ${mot}`);
      else if (estUnSlug(mot)) nus.push(`${item.id} : ${mot}`);
    }
  }
  verifier(`aucun identifiant nu dans ce que les widgets affichent — ${nus.slice(0, 4).join(', ')}`,
    nus.length === 0);
  verifier(`…et rien de vide ni d'« undefined » non plus — ${vides.slice(0, 4).join(', ')}`,
    vides.length === 0);

  // Le test se prouve lui-même : sur un item fabriqué dont une clé n'est pas au
  // lexique, il doit crier. Un contrôle qui ne sait pas échouer ne contrôle rien.
  const inconnu = {
    id: 'test-slug-nu', sfPrincipal: 'ch01-sf1-distinguer-corps-pur-et-melange',
    reponse: { objetFormel: { ordre: ['une-etape-que-personne-n-a-traduite', 'dissolution'] } },
  };
  verifier('…et ce contrôle sait échouer : une étape hors lexique est vue comme un slug',
    motsAffiches(inconnu, aComposer(inconnu)).some(estUnSlug));
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

// ════════════════════════════════════════════════════════════════════════════
// ⑥ Le circuit : le comparateur, et ce que `memeCircuit` aurait laissé passer
// ════════════════════════════════════════════════════════════════════════════
//
// C'est la section la plus importante du fichier, parce que la panne qu'elle
// cherche est INVISIBLE côté écran : le montage s'affiche, le verdict tombe,
// l'élève est validé, et il a mis son voltmètre aux bornes de la mauvaise lampe.
//
// Trois lampes en série sont interchangeables. Échanger L1 et L2 est un
// automorphisme du graphe, `formeCanonique` trie les enfants d'un nœud SÉRIE, et
// « voltmètre aux bornes de L1 » a donc exactement la même clé que « voltmètre
// aux bornes de L2 ». Ce n'est pas un défaut de `circuit.js` — la permutation
// libre dans une branche série est une décision explicite de ce module, et elle
// a raison. La faute serait d'employer ce comparateur-là pour corriger un item
// dont la réponse dépend de QUELLE lampe.
//
// Les tests ci-dessous ne se contentent donc pas de vérifier que le bon montage
// est accepté : ils vérifient, sur chaque item servi, que `memeCircuit` DIT OUI
// là où le verdict dit non. Un test qui ne mesurerait pas ce désaccord ne
// distinguerait pas les deux comparateurs, et le jour où quelqu'un rebrancherait
// le mauvais, il resterait vert.

const CIRCUITS = ITEMS_TOUS.filter((i) => aComposer(i)?.forme === 'circuit');
const CIRCUITS_INERTES = ITEMS_TOUS.filter((i) => sorteDeReponse(i) === 'objet-formel'
  && formeDeLObjetFormel(i.reponse?.objetFormel) === 'circuit'
  && aComposer(i) === null);

/** Toutes les compositions que les boutons offrent — le jeu est fini, on
 *  l'énumère plutôt que d'en échantillonner. */
const toutesLesCompositions = (plan) => plan.emplacements
  .flatMap((e) => [1, -1].map((sens) => ({ emplacement: e.cle, sens })));

{
  verifier(`onze items de circuit se composent, quatorze restent inertes — ${CIRCUITS.length}/${CIRCUITS_INERTES.length}`,
    CIRCUITS.length === 11 && CIRCUITS_INERTES.length === 14);

  // Les inertes le DISENT, et ne disent pas la phrase de la huitième forme :
  // « cherche les espèces présentes » sur un schéma de circuit enverrait
  // l'élève chercher ce que personne ne lui demande.
  const r = CIRCUITS_INERTES.map((i) => corrigerCompose(i, {}));
  verifier('les items de circuit non servis rendent NON_BRANCHE et ne comptabilisent rien',
    r.every((x) => x.code === 'NON_BRANCHE' && x.redemande === true && x.issue === null));
  verifier('…et la phrase parle de TRACER un schéma, pas de nommer des espèces',
    r.every((x) => /schéma entier/.test(x.message ?? '') && !/espèces/.test(x.message ?? '')));
}

// ── Un item INERTE ne sert pas son corrigé au-dessus de son énoncé ─────────
//
// `app.js` demandait le drapeau au PLAN. Un item sans plan n'a pas de drapeau,
// donc sa figure s'affichait — et sur ces douze-là, l'invariant 6 impose que la
// figure et la réponse soient LE MÊME objet. L'écran servait le montage attendu
// sous un encart disant « trace-le sur ton cahier ». La question se pose donc à
// l'item, jamais au plan.
{
  const fuites = CIRCUITS_INERTES.filter((i) => i.figure && !laFigureEstLaReponse(i));
  // Quatre exceptions, et chacune est juste. Les montages de Léa et de Noah sont
  // FAUTIFS : la correction est un autre graphe, et les montrer est le sujet
  // même de l'item. Sam et Maya demandent de REDESSINER le circuit montré : leur
  // figure est aussi leur réponse, et la taire laisserait « Voici le schéma de
  // Sam » désigner une figure absente.
  const redessin = fuites.filter((i) => i.reponse.objetFormel.question === 'redessine-le-meme-circuit');
  verifier(`les items de circuit inertes dont la figure EST la réponse la taisent — ${fuites.map((i) => i.id).join(', ')}`,
    fuites.length === 4 && redessin.length === 2
      && fuites.filter((i) => !redessin.includes(i))
        .every((i) => i.figure.circuit !== i.reponse.objetFormel));
  verifier('…et les deux « redessine-le autrement » gardent la figure que leur énoncé désigne',
    redessin.every((i) => i.figure.circuit === i.reponse.objetFormel));

  // Le pendant : les lectures graphiques portent une figure engendrée par leur
  // objet formel ET une valeur à taper. Leur figure est la DONNÉE, pas la
  // réponse ; la taire rendrait la question impossible.
  //
  // ⚠ Le filtre « valeur ET objet formel » ne les isole PAS, et il a servi tel
  // quel une fois de trop : `ch02-sf3-e01` et `t08` y tombaient aussi, et ce
  // sont des SCHÉMAS À COMPLÉTER dont la figure est le montage attendu, le
  // voltmètre déjà posé. Ce test-ci les affirmait donc montrés — il enregistrait
  // la fuite au lieu de l'attraper. Les deux familles se séparent sur ce que
  // l'item DÉCLARE demander, jamais sur la sorte de sa figure.
  const avecValeur = ITEMS_TOUS.filter((i) => i.reponse?.objetFormel && i.reponse?.valeur !== undefined);
  const lectures = avecValeur.filter((i) => i.situation?.demande !== 'schema');
  const schemasAComleter = avecValeur.filter((i) => i.situation?.demande === 'schema');
  verifier(`aucune lecture graphique ne voit sa figure disparaître — ${lectures.length} items`,
    lectures.length > 0 && lectures.every((i) => laFigureEstLaReponse(i) === false));
  verifier(`…et les ${schemasAComleter.length} schémas à compléter qui portent aussi une valeur taisent la leur`,
    schemasAComleter.length === 2
      && schemasAComleter.every((i) => i.figure.circuit === i.reponse.objetFormel
        && laFigureEstLaReponse(i) === true));
}

// ── La composition déclarée est acceptée, et elle est la seule ─────────────
{
  const refuses = [];
  const trop = [];
  for (const item of CIRCUITS) {
    const plan = aComposer(item);
    const acceptees = solutionsDeCircuit(plan);
    const offertes = toutesLesCompositions(plan);
    if (acceptees.length === 0) refuses.push(item.id);
    // Un item dont TOUTES les compositions passent se gagne sans un geste, et
    // le SRS n'a aucun moyen de distinguer cette réussite-là d'une vraie.
    if (acceptees.length >= offertes.length) trop.push(item.id);
    // Le verdict rendu par `corriger` doit être celui que `solutionsDeCircuit`
    // annonce : deux chemins vers le même jugement, et s'ils divergent, c'est
    // l'élève qui paie l'écart.
    for (const compose of offertes) {
      const attendu = acceptees.some((s) => s.emplacement.cle === compose.emplacement
        && s.sens === compose.sens);
      const v = corrigerCompose(item, compose);
      if (v.juste !== attendu) refuses.push(`${item.id} ${compose.emplacement}@${compose.sens}`);
    }
  }
  verifier(`chaque item de circuit est gagnable, et le verdict suit l'énumération — ${refuses.slice(0, 4).join(', ')}`,
    refuses.length === 0);
  verifier(`aucun ne se gagne sans un geste — ${trop.join(', ')}`, trop.length === 0);
}

// ── LE test : `memeCircuit` valide ce que le verdict refuse ────────────────
//
// On énumère les compositions TROMPEUSES : celles que la forme canonique déclare
// identiques au montage attendu et que le verdict refuse quand même. Chacune est
// un élève que `memeCircuit` aurait validé avec son voltmètre aux bornes de la
// mauvaise lampe.
//
// Cinq items en portent, et pas les dix : la tromperie demande que la cible ait
// une JUMELLE — une lampe interchangeable avec elle dans la même branche série.
// Quand la cible est le moteur, la pile, ou une lampe d'un circuit mixte, aucun
// automorphisme ne la confond avec une autre et les deux comparateurs tombent
// d'accord. C'est pour cela que le compte est écrit ici : un corpus qui n'aurait
// que des cibles distinguables laisserait ce test vert avec le mauvais
// comparateur branché, et il faut que la disparition des cinq se voie.
{
  const trompeuses = new Map();
  for (const item of CIRCUITS.filter((i) => aComposer(i).mesure)) {
    const plan = aComposer(item);
    const cas = toutesLesCompositions(plan).filter((compose) => corrigerCompose(item, compose)
      .juste === false
      && memeCircuit(circuitCompose(plan, compose), plan.attendu) === true);
    if (cas.length) trompeuses.set(item, cas);
  }

  verifier(`cinq items portent une composition que memeCircuit validerait — vus : ${[...trompeuses.keys()].length}`,
    trompeuses.size === 5);

  // …et le constat servi doit être CELUI-LÀ : « le geste est bon, la cible ne
  // l'est pas ». Un TOPOLOGIE_INCORRECTE générique aurait la même issue et ne
  // dirait rien à l'élève.
  const malDiagnostiques = [];
  for (const [item, cas] of trompeuses) {
    for (const compose of cas) {
      const codes = corrigerCompose(item, compose).constats.map((c) => c.code);
      if (!codes.includes('VOLTMETRE_AUX_MAUVAISES_BORNES')) {
        malDiagnostiques.push(`${item.id} ${compose.emplacement}@${compose.sens} → ${codes.join(',')}`);
      }
    }
  }
  verifier(`…toutes refusées par VOLTMETRE_AUX_MAUVAISES_BORNES, jamais par un verdict générique — ${malDiagnostiques.slice(0, 3).join(' | ')}`,
    malDiagnostiques.length === 0);
}

// ── Le cas reproduit à la main : la cible de Yanis ─────────────────────────
//
// L'item de correction de montage qui n'a PAS de `situation` : sa cible est
// déduite du montage attendu, pas lue dans une prose. Sans cette déduction, il
// n'y aurait plus que `memeCircuit` pour le corriger — et `memeCircuit` valide
// le montage de Yanis, servi comme fautif, contre sa propre correction.
{
  const yanis = CIRCUITS.find((i) => i.id === 'ch02-sf2-t10-corriger-la-cible-de-yanis');
  const plan = aComposer(yanis);
  verifier('la cible de Yanis se déduit du montage attendu : L2, jamais lue dans l\'énoncé',
    plan.mesure?.auxBornesDe === 'L2');
  verifier('le montage FAUTIF que l\'item sert a la même clé canonique que sa correction',
    memeCircuit(yanis.figure.circuit, yanis.reponse.objetFormel) === true);

  const surL1 = corrigerCompose(yanis, { emplacement: 'travers:L1', sens: -1 });
  verifier('…et le verdict le refuse quand même, en nommant les deux lampes',
    surL1.juste === false
      && surL1.constats.some((c) => c.code === 'VOLTMETRE_AUX_MAUVAISES_BORNES'
        && /L1/.test(c.texte) && /L2/.test(c.texte)));
}

// ── Les trois gestes fautifs ont chacun leur constat ───────────────────────
//
// « Ton voltmètre est en série » vaut mieux que « c'est faux » ; « tu l'as mis
// aux bornes de L1, on demandait L2 » vaut mieux que les deux. Ces trois codes
// sont les trois erreurs que le corpus vise, et aucune ne doit ressortir en
// TOPOLOGIE_INCORRECTE.
{
  const codes = new Set();
  for (const item of CIRCUITS) {
    for (const compose of toutesLesCompositions(aComposer(item))) {
      for (const c of corrigerCompose(item, compose).constats ?? []) codes.add(c.code);
    }
  }
  verifier(`les gestes fautifs ont leurs constats — vus : ${[...codes].sort().join(', ')}`,
    ['VOLTMETRE_EN_SERIE', 'VOLTMETRE_AUX_MAUVAISES_BORNES', 'BORNE_INVERSEE',
      'AMPEREMETRE_EN_DERIVATION', 'COURT_CIRCUIT', 'CIRCUIT_OUVERT'].every((c) => codes.has(c)));
  verifier('aucun montage composable ne ressort en TOPOLOGIE_INCORRECTE — le constat par défaut',
    !codes.has('TOPOLOGIE_INCORRECTE'));
}

// ── Une composition à moitié faite n'est pas une réponse fausse ────────────
{
  const item = CIRCUITS[0];
  const plan = aComposer(item);
  const rien = corrigerCompose(item, {});
  verifier('sans emplacement, on redemande — aucun essai consommé',
    rien.code === VERDICTS.REPONSE_INCOMPLETE && rien.issue === null && rien.redemande === true);
  const sansSens = corrigerCompose(item, { emplacement: plan.emplacements[0].cle });
  verifier('posé mais non orienté, on redemande aussi, et la phrase dit ce qui manque',
    sansSens.code === VERDICTS.REPONSE_INCOMPLETE && /borne/.test(sansSens.message ?? ''));
  verifier('…et tant que la réponse est incomplète, aucun montage n\'est fabriqué',
    circuitCompose(plan, { emplacement: plan.emplacements[0].cle }) === null);
}

// ── Le geste fautif reste À PORTÉE DE DOIGT ────────────────────────────────
//
// La condition sans laquelle l'exercice ne mesure plus rien : si les boutons
// n'offraient que la dérivation, couper le circuit — l'erreur que CEDRE chiffre
// — deviendrait impossible, et l'item serait juste par construction.
{
  const sansFil = CIRCUITS.filter((i) => !aComposer(i).emplacements.some((e) => e.sorte === 'fil'));
  const uneSeuleCible = CIRCUITS.filter((i) => aComposer(i).emplacements
    .filter((e) => e.sorte === 'travers').length < 2);
  verifier(`tout item servi offre au moins un fil à couper — ${sansFil.map((i) => i.id).join(', ')}`,
    sansFil.length === 0);
  verifier(`…et au moins deux dipôles en travers desquels se tromper — ${uneSeuleCible.map((i) => i.id).join(', ')}`,
    uneSeuleCible.length === 0);
}

// ── Rien d'illisible sous les yeux de l'élève ──────────────────────────────
//
// Le pendant, pour cette forme, du contrôle « aucun identifiant nu » : les
// boutons nomment des dipôles et des types, le tracé vient de `schema.js`, et un
// refus de tracé afficherait « Figure non traçable » là où l'élève attend son
// montage.
{
  const nus = [];
  const nonTraces = [];
  for (const item of CIRCUITS) {
    const plan = aComposer(item);
    if (!rendreFigure({ sorte: 'circuit', circuit: plan.base }).ok) nonTraces.push(`${item.id} (départ)`);
    for (const e of plan.emplacements) {
      const mots = e.sorte === 'travers'
        ? [e.nom, libelleFormel(e.type), ...e.cotes.flat()]
        : [...e.entre, ...e.cotes.flat()];
      for (const m of mots) if (!m || !String(m).trim()) nus.push(`${item.id} : ${e.cle}`);
      for (const sens of [1, -1]) {
        const f = rendreFigure({ sorte: 'circuit', circuit: circuitCompose(plan, { emplacement: e.cle, sens }) });
        if (!f.ok) nonTraces.push(`${item.id} ${e.cle}@${sens} → ${f.raison}`);
      }
    }
  }
  verifier(`aucun bouton de circuit ne porte un libellé vide — ${nus.slice(0, 3).join(', ')}`,
    nus.length === 0);
  verifier(`toute composition offerte se DESSINE — ${nonTraces.slice(0, 3).join(' | ')}`,
    nonTraces.length === 0);
}

// ── La correction dit un geste, pas « c'est le schéma ci-dessous » ─────────
{
  const muettes = CIRCUITS.filter((item) => {
    const r = corrigerCompose(item, toutesLesCompositions(aComposer(item))[0]);
    return !r.correction || !/borne/.test(r.correction);
  });
  verifier(`la correction de chaque item nomme le geste et le sens — ${muettes.map((i) => i.id).join(', ')}`,
    muettes.length === 0);
}

// ── Réserves ────────────────────────────────────────────────────────────────

reserve('les QUATRE items de la forme { question, especes, nature, transformation } ne se'
  + '\n      composent pas, et l\'écran le dit. `transformation` n\'a aucun jeu de valeurs'
  + '\n      concurrentes dans le corpus, et `especes` est du français d\'auteur : servir des'
  + '\n      propositions supposerait qu\'on écrive ici les mauvaises réponses.');
reserve('sur « où est la matière », les trois phrases JUSTES sont servies à l\'élève, mêlées'
  + '\n      aux distracteurs de l\'item : ce qui se compose est l\'affectation, pas le'
  + '\n      vocabulaire. Le corpus ne déclare aucun jeu de lieux ni de formes concurrents, et'
  + '\n      les mettre en commun entre les sept items compterait faux « dans l\'eau elle-même »'
  + '\n      sur l\'aquarium — un élève qui a raison.');
reserve('l\'ordre de DÉPART d\'une remise en ordre est mêlé par `app.js` (`ordreInitial`), et'
  + '\n      re-mêlé tant qu\'il tombe sur l\'ordre attendu. C\'est une propriété de l\'écran :'
  + '\n      `corrigerObjetFormel` ne voit qu\'une suite déjà composée.');
reserve('l\'ordre de service d\'un CLASSEMENT relève de la même couche, et il a été durci pour'
  + '\n      la même raison : ce qui donne la réponse n\'est pas l\'ordre de déclaration mais le'
  + '\n      REGROUPEMENT, et un mélange uniforme rend deux catégories contiguës une fois sur'
  + '\n      trois sur quatre étiquettes. La graine en servait un ainsi. `etiquettesMelees`'
  + '\n      re-mêle donc tant que les catégories sortent en blocs — non testable ici, `app.js`'
  + '\n      touchant le DOM à l\'import.');
reserve('la prédiction VERROUILLÉE ne se teste pas ici : c\'est une propriété de l\'écran'
  + '\n      (aucun chemin ne montre le résultat avant le verrou), pas une propriété d\'une'
  + '\n      fonction pure. Elle se lit sur `vueVerrou` et sur le seul appelant qui la lève.');
reserve('les trois items à réponse RÉDIGÉE sont en auto-évaluation déclarée : aucun'
  + '\n      programme ne corrige une phrase, et l\'écran ne prétend pas le contraire.');
reserve('le widget de circuit POSE un appareil sur un montage donné ; il ne TRACE pas un'
  + '\n      circuit. Les huit items « trace le schéma » de ch02-sf1, les deux « redessine-le'
  + '\n      autrement » (e10, t08) et le montage de Noah — qu\'il faut faire passer de la série'
  + '\n      à la dérivation — restent donc inertes, et l\'écran le dit. Sur les deux derniers,'
  + '\n      `memeCircuit` serait pourtant le BON comparateur : aucun dipôle n\'y est distingué,'
  + '\n      donc aucun automorphisme n\'y change la réponse. C\'est le widget qui manque, pas la'
  + '\n      correction.');
reserve('`ch02-sf2-e09` et `t06` portent `situation.circuit` et seraient servables tels quels.'
  + '\n      Ils déclarent `dimensionVariee: mode-de-reponse` — la dimension que leur palier fait'
  + '\n      varier EST « on ne complète plus un schéma donné, on construit le schéma entier » —'
  + '\n      et leur énoncé dit « sans modèle ». Les servir afficherait le modèle sous cette'
  + '\n      phrase-là et effacerait leur palier.');
reserve('le montage de Léa (`ch02-sf2-e06`) demande DEUX gestes : rétablir le fil qu\'elle a'
  + '\n      coupé, puis poser le voltmètre en travers de L2. `montageServi` le refuse au bon'
  + '\n      endroit — son montage privé du voltmètre est un circuit OUVERT, que `typeDeCircuit`'
  + '\n      ne réduit pas. Rétablir le fil à sa place ferait la moitié de l\'exercice.');
reserve('`ch02-sf3-e01` et `t08` demandent de placer le voltmètre ET de prévoir son'
  + '\n      indication ; ils portent une `valeur` en plus de leur objet formel, et'
  + '\n      `sorteDeReponse` lit `valeur` avant `objetFormel` — délibérément, pour les quatorze'
  + '\n      lectures graphiques. L\'écran ne leur demande donc que le nombre, alors que leur'
  + '\n      `motifFormatDiagnostique` annonce les deux moitiés. Servir deux zones de réponse à'
  + '\n      un même item est une décision de la couche de verdict, pas de ce widget.');

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
