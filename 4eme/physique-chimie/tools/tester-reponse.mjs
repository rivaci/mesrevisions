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
  formeDeLObjetFormel,
  sorteDeReponse,
  FORMES_COMPOSABLES,
  FORMES_D_OBJET_FORMEL,
  SORTES_DE_REPONSE,
} from '../js/reponse.js';
import { SANS_UNITE, VERDICTS } from '../js/unites.js';
import { clesInconnues, libelle, lireObjetFormel } from '../js/lexique.js';
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
  verifier('six formes se composent, une seule reste inerte',
    FORMES_COMPOSABLES.length === 6
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
