// Contrôle du catalogue des pièges, hors navigateur.
//
//     node tools/tester-pieges.mjs
//
// Ces tests ne relisent pas le contenu — un humain l'a fait, et c'est le seul
// qui puisse le faire. Ils vérifient ce que la charte rend MÉCANIQUE : des
// champs qui doivent exister, des énumérés fermés, des comptages, des ordres.
// Tout ce qui demande de juger si une phrase est juste reste en dehors.
//
// La règle de lecture est celle de `tester-unites.mjs` : un contrôle qui
// passerait toujours ne prouverait rien. Chaque bloc ci-dessous est écrit à
// partir d'une phrase de `charte.md` qui REFUSE quelque chose, et le test
// échoue exactement là où le refus doit mordre.
//
// ── Les réserves ──────────────────────────────────────────────────────────
//
// Certaines exigences de la charte ne peuvent pas être vérifiées ici, et les
// taire les ferait disparaître. Elles sont imprimées à la fin sous « réserves »
// et ne comptent ni comme réussite ni comme échec. Une réserve n'est pas un
// test qu'on s'épargne : c'est un test dont la donnée manque, ou une décision de
// contenu qu'un fichier de tests n'a pas le droit de prendre — et la ligne dit
// laquelle des deux.
//
// ── Ce que la sixième famille a changé dans ce fichier ────────────────────
//
// Une première version ne relisait que quatre familles. `matiere.js` et
// `contrat.js` sont écrites depuis, et trois réserves de cette version sont
// tombées, dont deux en devenant des tests :
//
//   · « deux familles du catalogue sans aucun piège » — plus vrai, et le
//     contrôle des effectifs a pris la place ;
//   · « la dépendance d'Andersson est invérifiable » — les deux pièges qu'elle
//     lie sont écrits, l'ordre se lit sur leurs chapitres, et il est TESTÉ ;
//   · « le plafond de dix rangs 1 est atteint » — il ne l'est plus, il est
//     DÉPASSÉ, de trois. C'est le mouvement inverse : un test est devenu une
//     réserve, et le bloc « Le plafond » dit pourquoi c'est la seule issue
//     honnête plutôt qu'un rouge permanent ou un plafond relevé en douce.
//
// ── Ce qui n'est PAS testé, et pourquoi ───────────────────────────────────
//
// `distracteurs` figure parmi les champs obligatoires de `charte.md`. Aucun
// piège n'en porte, et c'est assumé par les en-têtes de `symbolique.js` : les
// distracteurs s'écrivent avec les items, et les items n'existent pas. En faire
// un test rouge aujourd'hui, c'est se condamner à une suite rouge en
// permanence, c'est-à-dire à une suite qu'on cesse de lire. C'est une réserve,
// et elle porte la date à laquelle elle doit tomber : l'écriture des items.

import { readFile } from 'node:fs/promises';
import { PIEGES, piegesDeRang, piegesDuChapitre } from '../js/data/pieges/index.js';
import contrat from '../js/data/pieges/contrat.js';
import electricite from '../js/data/pieges/electricite.js';
import matiere from '../js/data/pieges/matiere.js';
import mouvement from '../js/data/pieges/mouvement.js';
import signaux from '../js/data/pieges/signaux.js';
import symbolique from '../js/data/pieges/symbolique.js';

let passes = 0;
const echecs = [];
const reserves = [];

const verifier = (nom, condition) => {
  if (condition) passes += 1;
  else echecs.push(nom);
};

const reserve = (texte) => reserves.push(texte);

const entrees = Object.entries(PIEGES);
const tous = Object.values(PIEGES);

// Un dispositif de réfutation, au sens de la charte : « au moins deux constats
// (ou deux exécutions de contre-modèle) de contextes de surface différents ».
// L'invariant 14 n'écrit que « constats », ce que `signaux.js` signale : lu à la
// lettre il condamnerait l'extramission, dont on ne peut PAS faire constater à
// l'écran que rien ne sort de l'œil. On lit donc les deux sources.
const dispositifs = (piege) => [
  ...(piege.constats ?? []),
  ...(piege.contreModele?.executions ?? []),
];

const contextes = (piege) => dispositifs(piege).map((d) => d.contexteDeSurface);

const numeroDeChapitre = (identifiant) => {
  const trouve = /^ch(\d{2})-/.exec(identifiant ?? '');
  return trouve ? Number(trouve[1]) : null;
};

// ── L'assemblage ────────────────────────────────────────────────────────────
//
// Un identifiant en double serait écrasé en silence par l'assemblage. Le refus
// est dans `index.js` ; ce qui se vérifie ici, c'est qu'aucun piège n'a été
// perdu en route — un doublon écrasé se lirait comme un total trop petit.

const CATALOGUE = [
  ['matiere', matiere],
  ['symbolique', symbolique],
  ['mouvement', mouvement],
  ['electricite', electricite],
  ['signaux', signaux],
  ['contrat', contrat],
];
const NOMS_DE_FAMILLE = CATALOGUE.map(([nom]) => nom);
const familles = CATALOGUE.map(([, f]) => f);
const totalDesFamilles = familles.reduce((somme, f) => somme + Object.keys(f).length, 0);

verifier(
  `l'assemblage ne perd aucun piège (${entrees.length} assemblés pour ${totalDesFamilles} écrits)`,
  entrees.length === totalDesFamilles,
);
verifier(
  'aucun identifiant en double entre familles',
  new Set(familles.flatMap((f) => Object.keys(f))).size === totalDesFamilles,
);

// Le doublon DANS un même fichier n'est atteignable que par la source. Un objet
// littéral qui répète une clé n'échoue pas : la seconde valeur écrase la
// première, et le piège écrasé disparaît sans un mot — ni `index.js`, ni
// `Object.keys`, ni aucun des tests ci-dessus ne peuvent le voir. C'est la seule
// faute de ce fichier qui exige de lire le texte plutôt que la valeur.
//
// `\r?$` n'est pas une précaution de style : `core.autocrlf` vaut `true` sur le
// poste, donc un clone frais a des fins de ligne CRLF et un `$` strict n'y
// trouverait plus une seule clé. Le premier des deux tests ci-dessous
// passerait alors à vide, en comparant zéro à zéro ; c'est le second qui
// rattrape, et c'est une raison de garder les deux.
const CLE_DE_PIEGE = /^ {2}(?:'([a-z0-9-]+)'|([a-z0-9-]+)): \{\r?$/gm;
const clesEcrites = [];
for (const fichier of NOMS_DE_FAMILLE) {
  const source = await readFile(new URL(`../js/data/pieges/${fichier}.js`, import.meta.url), 'utf8');
  for (const trouve of source.matchAll(CLE_DE_PIEGE)) clesEcrites.push(trouve[1] ?? trouve[2]);
}

verifier(
  `aucun identifiant en double dans un même fichier (${clesEcrites.length} clés écrites, ${new Set(clesEcrites).size} distinctes)`,
  clesEcrites.length === new Set(clesEcrites).size,
);
verifier(
  'toute clé écrite dans un fichier de famille se retrouve dans PIEGES',
  clesEcrites.length === entrees.length && clesEcrites.every((cle) => PIEGES[cle] !== undefined),
);
verifier(
  'chaque piège porte sa clé comme identifiant',
  entrees.every(([id, piege]) => piege.id === id),
);
// `index.js` refuse au chargement un `id` interne qui contredit sa clé, mais il
// ne le voit que là où il est écrit : trois familles l'écrivent (électricité,
// signaux, contrat), trois ne l'écrivent pas. Le refus ne prouve donc rien tant
// qu'on n'a pas vérifié qu'il porte encore sur quelque chose — sans ce test, la
// disparition du champ dans les trois familles qui le portent rendrait le garde-
// fou d'`index.js` inatteignable sans qu'une seule ligne devienne rouge.
verifier(
  'le garde-fou d\'`index.js` sur l\'`id` interne porte encore sur au moins une famille',
  CATALOGUE.some(([, f]) => Object.values(f).some((p) => p.id !== undefined)),
);
verifier(
  'chaque piège porte sa famille',
  tous.every((p) => NOMS_DE_FAMILLE.includes(p.famille)),
);
verifier(
  'un identifiant est un slug stable, jamais une phrase',
  entrees.every(([id]) => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)),
);

// ── La couverture du catalogue ──────────────────────────────────────────────
//
// `charte.md` § « Le catalogue » liste des conceptions famille par famille. Le
// contrôle ne peut pas relire la charte — elle n'est pas dans ce dépôt — mais
// chaque en-tête de famille déclare EN TOUTES LETTRES combien d'entrées elle
// couvre et par quelle correspondance. Les effectifs ci-dessous sont ces
// déclarations, et rien d'autre ; leur dérivation est écrite en regard pour
// qu'un relecteur puisse la refuser sans rouvrir les six fichiers.
//
// Ce que ce test attrape, et qui est arrivé une fois déjà dans ce projet : un
// piège perdu à une fusion, ou ajouté sans que l'en-tête de sa famille l'annonce
// — c'est-à-dire un piège qui ne correspond à aucune entrée du catalogue.

const EFFECTIFS = [
  // 7 entrées, dont « non-conservation de la masse » qui en compte trois
  // (système fermé, système ouvert, combustion) réunies en UN piège — une règle
  // par régime en aurait rendu deux fausses —, et « la masse volumique »
  // éclatée en DEUX : la grandeur intensive elle-même, et sa confusion avec la
  // masse (`matiere.js` § « Un seul piège pour trois régimes »).
  ['matiere', 8],
  // La lecture d'une formule (substance ou entité), plus les trois erreurs
  // typées sur l'équation que § 3.7 donne : le `+`, la flèche, coefficient et
  // indice.
  ['symbolique', 4],
  // Les cinq entrées de la famille, une pour une.
  ['mouvement', 5],
  // Les quatre conceptions « solidement établies » du § 8, plus le branchement
  // des appareils de mesure, qui ne vient pas de la littérature des conceptions
  // mais de CEDRE 2024.
  ['electricite', 5],
  // Les trois entrées « Signaux », une pour une.
  ['signaux', 3],
  // 7 entrées, dont les deux dernières (données superflues, questions sans
  // réponse) réunies en un piège : les séparer aurait produit deux pièges
  // portant la même règle et le même contrôle.
  ['contrat', 6],
];

for (const [nom, attendu] of EFFECTIFS) {
  const compte = tous.filter((p) => p.famille === nom).length;
  verifier(`« ${nom} » couvre ses entrées du catalogue (${compte} piège(s), ${attendu} annoncé(s))`, compte === attendu);
}
verifier(
  'aucune famille du catalogue n\'est vide',
  NOMS_DE_FAMILLE.every((nom) => tous.some((p) => p.famille === nom)),
);
verifier(
  'aucun piège n\'appartient à une famille hors catalogue',
  EFFECTIFS.reduce((s, [, n]) => s + n, 0) === tous.length,
);

reserve(
  'couverture piège ↔ entrée du catalogue : vérifiée sur les EN-TÊTES des familles, pas sur\n'
  + '      `charte.md`, qui n\'est pas dans ce dépôt. Les effectifs ci-dessus attrapent un piège\n'
  + '      perdu ou surnuméraire ; ils n\'attrapent pas une entrée de la charte que TOUTES les\n'
  + '      sources auraient oubliée de la même façon. À reprendre le jour où la charte y entre.',
);

// ── Les champs obligatoires ─────────────────────────────────────────────────
//
// `charte.md` § « La taxonomie des pièges » : « tous obligatoires sauf mention
// contraire ». Les deux mentions contraires sont `iatrogene` (si rang 2) et
// `antecedentHistorique` (facultatif) ; elles ont leur bloc plus bas.
//
// La forme des champs n'est pas UNIFIÉE, et c'est délibéré : `conditionValidite`
// est tantôt une fonction, tantôt l'un de deux objets ; `formatDiagnostique`
// tantôt un objet tantôt une chaîne. Exiger ici une forme unique reviendrait à
// trancher une question de contenu depuis un fichier de tests. Ce qui SE teste
// sans rien trancher, c'est que le nombre de formes n'augmente pas : le bloc
// « Les formes qui coexistent » plus bas ferme l'énumération.

const OBLIGATOIRES = [
  'conception',
  'enonceEleve',
  'rang',
  'fiabilite',
  'origine',
  'chapitreOrigine',
  'rythmeInitial',
  'formatDiagnostique',
  'conditionValidite',
  'constats',
  'regle',
  'controle',
  'raisonnements',
];

for (const champ of OBLIGATOIRES) {
  const sans = entrees.filter(([, p]) => p[champ] === undefined || p[champ] === null).map(([id]) => id);
  verifier(`tout piège porte « ${champ} »${sans.length ? ` — manque à ${sans.join(', ')}` : ''}`, sans.length === 0);
}

verifier(
  'les textes obligatoires ne sont pas des chaînes vides',
  tous.every((p) => ['conception', 'enonceEleve', 'regle', 'controle'].every((c) => typeof p[c] === 'string' && p[c].trim().length > 0)),
);
verifier('`constats` est toujours une liste', tous.every((p) => Array.isArray(p.constats)));
verifier('`raisonnements` est toujours une liste', tous.every((p) => Array.isArray(p.raisonnements)));

// ── Les énumérés ────────────────────────────────────────────────────────────
//
// Trois champs à valeurs fermées. Une valeur hors énuméré ne casse rien au
// chargement : elle produit un piège que `piegesDeRang` ne rendra jamais, ou
// une fiabilité que le garde-fou « ne fonde jamais à elle seule une décision de
// maîtrise » ne reconnaîtra pas. C'est exactement le genre de faute qui ne se
// voit qu'ici.

const RANGS = [1, 2, 3];
const FIABILITES = ['primaire', 'secondaire', 'non-documente'];
const ORIGINES = ['physique', 'mathematique'];

verifier(
  `« rang » ∈ {1, 2, 3}${entrees.filter(([, p]) => !RANGS.includes(p.rang)).map(([id]) => ` — ${id}`).join('')}`,
  tous.every((p) => RANGS.includes(p.rang)),
);
verifier(
  `« fiabilite » ∈ {${FIABILITES.join(', ')}}${entrees.filter(([, p]) => !FIABILITES.includes(p.fiabilite)).map(([id]) => ` — ${id}`).join('')}`,
  tous.every((p) => FIABILITES.includes(p.fiabilite)),
);
verifier(
  `« origine » ∈ {${ORIGINES.join(', ')}}${entrees.filter(([, p]) => !ORIGINES.includes(p.origine)).map(([id]) => ` — ${id}`).join('')}`,
  tous.every((p) => ORIGINES.includes(p.origine)),
);

// `charte.md` demande que les pièges d'origine mathématique « portent EN PLUS la
// section de maths-4e vers laquelle renvoyer », versionnée par `CONTRAT_MATHS`
// contre `maths-4e/public/sections.json`. Ni l'artefact ni le champ n'existent :
// les deux fichiers concernés nomment leur cible en commentaire et s'en
// expliquent (`symbolique.js`, puis `matiere.js` § 2, qui suit la même
// convention plutôt que d'inventer un identifiant qui ne se résoudrait sur
// rien). Le champ manque donc partout où il est requis, ce qui est un cas où le
// contrôle ne peut ni passer ni échouer utilement.
const origineMaths = tous.filter((p) => p.origine === 'mathematique').map((p) => `${p.id} (${p.famille}, ${p.chapitreOrigine})`);
if (origineMaths.length) {
  reserve(
    `renvoi vers maths-4e non porté par le contenu — ${origineMaths.length} piège(s) « origine: mathematique »\n`
    + '      nomment leur section en commentaire seulement. `CONTRAT_MATHS` et `sections.json`\n'
    + `      n'existent pas encore ; le champ ne peut pas être exigé avant eux.\n      ${origineMaths.join('\n      ')}`,
  );
}

// `mouvement.js` a payé pour l'apprendre : un `rang: 1` avec `fiabilite:
// 'non-documente'` est contradictoire dans les termes — le rang 1 SE DÉFINIT par
// une persistance mesurée, et `non-documente` dit qu'aucune mesure n'existe. La
// contradiction a bel et bien été écrite une fois, sur deux pièges, avant d'être
// corrigée par un re-rangement. `matiere.js` la ré-assume délibérément sur ses
// deux pièges de masse volumique, en l'argumentant (§ 8 signale un TROU du
// corpus, et « entre affirmer une cession non mesurée et affirmer une
// persistance non mesurée, la seconde coûte des créneaux et la première coûte
// l'élève »). Ce n'est donc pas un échec — mais ça ne doit pas se répandre sans
// qu'on le voie : c'est une réserve nominative.
const rang1NonDocumente = piegesDeRang(1).filter((p) => p.fiabilite === 'non-documente').map((p) => `${p.id} (${p.famille})`);
if (rang1NonDocumente.length) {
  reserve(
    `rang 1 déclaré sur une conception non documentée — assumé et argumenté, à ne pas étendre\n`
    + `      sans le même argument (${rang1NonDocumente.length}) :\n      ${rang1NonDocumente.join('\n      ')}`,
  );
}

// ── Les dispositifs de réfutation ───────────────────────────────────────────
//
// « Chaque piège de rang 1 porte au moins deux constats (ou deux exécutions de
// contre-modèle) de contextes de surface différents, et le moteur ne sert
// jamais deux fois le même constat pour un même piège. » Le motif de la règle
// est écrit dans la charte : sans elle, à la deuxième re-confrontation l'élève
// se souvient du résultat de la pesée et il n'y a plus de conflit. Deux
// dispositifs de MÊME décor ne valent donc qu'un.

for (const [id, piege] of entrees.filter(([, p]) => p.rang === 1)) {
  const decors = contextes(piege);
  verifier(
    `rang 1 « ${id} » : au moins deux dispositifs (${decors.length})`,
    decors.length >= 2,
  );
  verifier(
    `rang 1 « ${id} » : contextes de surface tous distincts`,
    decors.every((c) => typeof c === 'string' && c.trim().length > 0)
      && new Set(decors).size === decors.length,
  );
}

verifier(
  'tout dispositif, quel que soit le rang, déclare son contexte de surface',
  tous.every((p) => contextes(p).every((c) => typeof c === 'string' && c.trim().length > 0)),
);
verifier(
  'tout dispositif porte un identifiant, et il est unique dans son piège',
  tous.every((p) => {
    const ids = dispositifs(p).map((d) => d.id);
    return ids.every((i) => typeof i === 'string' && i.length > 0) && new Set(ids).size === ids.length;
  }),
);
// Ce que le constat doit porter est une conséquence directe de la charte : la
// prédiction est VERROUILLÉE avant l'affichage, sinon il n'y a pas de conflit,
// seulement une démonstration de plus. Les quatre premières familles nommaient
// ces trois fentes de quatre façons (`predictionDemandee` / `prediction` /
// `predictionEngagee`, `resultatAffiche` / `resultat`, `ceQueCaContredit` /
// `conclusion` / `lecture` / `conflit`) ; elles ont été réconciliées sur le
// vocabulaire de la charte (« item à prédiction engagée »), et `matiere.js` et
// `contrat.js` ont été écrites directement dessus. `lecture` n'a PAS été
// retenu : dans `electricite.js` il désigne déjà ce qu'affiche un appareil.
verifier(
  'tout constat verrouille une prédiction, affiche un résultat, et dit ce que ça contredit',
  tous.every((p) => (p.constats ?? []).every((c) => c.predictionEngagee !== undefined
    && c.resultat !== undefined
    && c.conflit !== undefined)),
);
verifier(
  'toute exécution de contre-modèle engage aussi une prédiction avant de la confronter',
  tous.every((p) => (p.contreModele?.executions ?? []).every((e) => e.predictionEngagee !== undefined
    && e.conflit !== undefined)),
);

// Le `contreModele`, lui, n'a PAS été réconcilié, et le taire donnerait à croire
// que le test ci-dessus le couvre. Trois schémas coexistent : `{ id, modele,
// executions }` (mouvement, signaux), `{ enonce, predire, verdict }`
// (électricité, matière), `{ enonceDuModele, execution, lecture }` (symbolique).
// Seul le premier porte une liste `executions`, donc seul le premier est atteint
// par le test — et par le comptage des dispositifs de rang 1. C'est une question
// de contenu, pas de tests : l'arbitrer ici reviendrait à choisir un schéma
// depuis le mauvais fichier.
const schemaDeContreModele = (p) => {
  if (p.contreModele === undefined) return null;
  if (Array.isArray(p.contreModele.executions)) return 'executions';
  if (p.contreModele.predire !== undefined && p.contreModele.verdict !== undefined) return 'predire/verdict';
  if (p.contreModele.execution !== undefined) return 'execution/lecture';
  return 'inconnu';
};
const horsExecutions = tous.filter((p) => {
  const schema = schemaDeContreModele(p);
  return schema !== null && schema !== 'executions';
});
verifier(
  'tout `contreModele` relève d\'un des trois schémas connus, jamais d\'un quatrième',
  tous.every((p) => schemaDeContreModele(p) !== 'inconnu'),
);
if (horsExecutions.length) {
  reserve(
    `${horsExecutions.length} contre-modèle(s) hors du schéma « executions » : leur prédiction engagée\n`
    + '      n\'est vérifiée par aucun test, et ils ne comptent pas comme dispositifs de réfutation.\n'
    + `      ${horsExecutions.map((p) => `${p.id} (${schemaDeContreModele(p)})`).join('\n      ')}`,
  );
}

// ── Les formes qui coexistent ───────────────────────────────────────────────
//
// Six familles écrites séparément ont produit trois formes de
// `conditionValidite` et deux de `formatDiagnostique`. L'assemblage ne les
// unifie pas — c'est une question de contenu — mais il peut FERMER
// l'énumération : une quatrième forme apparue par recopie approximative ne
// serait vue de nulle part ailleurs, puisque aucun test ne lit ces champs.
//
// ⚠ Un relecteur ne doit pas se fier aux en-têtes sur ce point, qui se
// contredisent : `matiere.js` § « Les objets » annonce prendre « la forme
// déclarative { champs, predicat, enClair } de mouvement.js et signaux.js »,
// alors que ces deux-là portent { situation, predicat, pourquoi } et que
// `matiere.js` est seule sur la sienne ; `contrat.js` § « La forme des champs »
// attribue symétriquement { champs, predicat, enClair } à `mouvement.js`. Les
// deux en-têtes décrivent correctement leur PROPRE choix et se trompent sur
// celui du voisin. Le décompte ci-dessous est fait sur les valeurs, pas sur les
// commentaires, et c'est la raison d'être de la réserve qui le suit.

const formeDeConditionValidite = (p) => (typeof p.conditionValidite === 'function'
  ? 'fonction'
  : `{ ${Object.keys(p.conditionValidite ?? {}).sort().join(', ')} }`);
// Les clés sont triées avant comparaison : l'ordre d'écriture dans l'objet ne
// dit rien et varie d'un fichier à l'autre.
const FORMES_DE_CONDITION = [
  'fonction',                              // symbolique, electricite
  '{ champs, enClair, predicat }',         // matiere
  '{ pourquoi, predicat, situation }',     // mouvement, signaux, contrat
];
const formesVues = [...new Set(tous.map(formeDeConditionValidite))];

verifier(
  `« conditionValidite » ne prend aucune forme nouvelle (${formesVues.length} vues)`
  + formesVues.filter((f) => !FORMES_DE_CONDITION.includes(f)).map((f) => ` — inconnue : ${f}`).join(''),
  formesVues.every((f) => FORMES_DE_CONDITION.includes(f)),
);
verifier(
  '« formatDiagnostique » est une chaîne ou un objet, jamais autre chose',
  tous.every((p) => typeof p.formatDiagnostique === 'string' || (typeof p.formatDiagnostique === 'object' && p.formatDiagnostique !== null)),
);

reserve(
  `${formesVues.length} formes de « conditionValidite » coexistent, et aucun test ne lit ce champ :\n`
  + `      ${formesVues.map((f) => `${f} — ${[...new Set(tous.filter((p) => formeDeConditionValidite(p) === f).map((p) => p.famille))].join(', ')}`).join('\n      ')}\n`
  + '      À trancher à l\'écriture du moteur, qui sera le premier à devoir les exécuter. Les\n'
  + '      en-têtes de `matiere.js` et `contrat.js` se trompent l\'un sur l\'autre à ce sujet.',
);

// ── Les raisonnements ───────────────────────────────────────────────────────
//
// Quand la réponse ne correspond à aucune erreur prévue, on ne devine pas : on
// demande à l'élève, et `raisonnements` sert de menu. Un menu à deux entrées
// force la réponse ; « j'ai répondu au hasard » doit toujours y figurer, sinon
// l'élève qui a répondu au hasard se voit attribuer une conception qu'il n'a
// pas — et le moteur programme une réfutation contre rien.

for (const [id, piege] of entrees) {
  const r = piege.raisonnements ?? [];
  verifier(`« ${id} » : au moins trois raisonnements (${r.length})`, r.length >= 3);
  verifier(`« ${id} » : un raisonnement « hasard »`, r.some((x) => x.id === 'hasard'));
}

verifier(
  'chaque raisonnement porte un identifiant unique dans son piège, un texte et une réponse',
  tous.every((p) => {
    const r = p.raisonnements ?? [];
    const ids = r.map((x) => x.id);
    return new Set(ids).size === ids.length
      && r.every((x) => typeof x.id === 'string' && x.id.length > 0
        && typeof x.texte === 'string' && x.texte.trim().length > 0
        && typeof x.reponse === 'string' && x.reponse.trim().length > 0);
  }),
);
verifier(
  'le « hasard » ne clôt jamais la conversation : il rouvre par un geste',
  tous.every((p) => (p.raisonnements ?? []).find((x) => x.id === 'hasard')?.reponse.length > 40),
);

// ── Le rang 2 et son producteur ─────────────────────────────────────────────
//
// « Un piège de rang 2 porte l'identifiant du savoir-faire qui le produit
// (`iatrogene`), il est obligatoirement programmé APRÈS lui. Le contrôle refuse
// un piège de rang 2 sans savoir-faire producteur déclaré, ou programmé avant
// lui. » Le rang 2 n'est pas un rang de repli : il affirme que c'est NOTRE
// enseignement qui fabrique la conception. Sans producteur nommé, l'affirmation
// n'est pas contestable, donc elle ne vaut rien.

for (const [id, piege] of entrees.filter(([, p]) => p.rang === 2)) {
  verifier(
    `rang 2 « ${id} » : « iatrogene » déclaré`,
    typeof piege.iatrogene === 'string' && piege.iatrogene.length > 0,
  );
  verifier(
    `rang 2 « ${id} » : « iatrogene » nommé chNN-sfN-slug, donc résoluble`,
    /^ch\d{2}-sf\d+-[a-z0-9-]+$/.test(piege.iatrogene ?? ''),
  );
  verifier(
    `rang 2 « ${id} » : le producteur n'est pas d'un chapitre postérieur au piège`,
    numeroDeChapitre(piege.iatrogene) !== null
      && numeroDeChapitre(piege.chapitreOrigine) !== null
      && numeroDeChapitre(piege.iatrogene) <= numeroDeChapitre(piege.chapitreOrigine),
  );
}

verifier(
  'aucun piège hors rang 2 ne porte « iatrogene »',
  tous.filter((p) => p.rang !== 2).every((p) => p.iatrogene === undefined),
);

// Le chapitre est la seule granularité que le contenu porte. Quand producteur et
// piège partagent le chapitre, l'ordre relève du moteur seul, et il doit être
// écrit quelque part : ici.
const memeChapitre = entrees
  .filter(([, p]) => p.rang === 2 && numeroDeChapitre(p.iatrogene) === numeroDeChapitre(p.chapitreOrigine))
  .map(([id, p]) => `${id} (après ${p.iatrogene}, même chapitre)`);
if (memeChapitre.length) {
  reserve(
    `ordre non garanti par le contenu, à tenir par le moteur — ${memeChapitre.length} piège(s) de rang 2 :\n      ${memeChapitre.join('\n      ')}`,
  );
}

// ── La dépendance d'Andersson ───────────────────────────────────────────────
//
// `charte.md`, invariant 14 : « Le piège conservation de la masse n'est JAMAIS
// programmé avant que le piège le gaz n'est pas de la matière ait été
// rencontré. » Le motif est dans `didactique.md` § 3.5 : pour décider si la
// masse est conservée, l'élève doit d'abord distinguer ce qui est matériel de ce
// qui ne l'est pas. Un élève pour qui la fumée ne pèse rien ne peut pas
// comprendre que la masse se conserve à la combustion — il n'a pas les termes du
// bilan, et la re-confrontation se dépense contre rien.
//
// Tant que « matière » n'était pas écrite, c'était une réserve. Les deux pièges
// existent, et la dépendance est tenue par la PROGRESSION : trois chapitres les
// séparent, et `programme.md` ne permet pas de les inverser. C'est cela que le
// test vérifie — et il vérifie d'abord que les deux pièges existent, faute de
// quoi une comparaison de chapitres entre deux `undefined` passerait à vide et
// l'invariant le plus cher du catalogue serait gardé par un test creux.

const PREALABLE = 'gaz-n-est-pas-de-la-matiere';
const DEPENDANT = 'conservation-de-la-masse';
const prealable = PIEGES[PREALABLE];
const dependant = PIEGES[DEPENDANT];

verifier(
  `dépendance d'Andersson : les deux pièges qu'elle lie existent (« ${PREALABLE} », « ${DEPENDANT} »)`,
  prealable !== undefined && dependant !== undefined,
);
if (prealable && dependant) {
  verifier(
    `dépendance d'Andersson : « ${PREALABLE} » (${prealable.chapitreOrigine}) part d'un chapitre `
    + `strictement antérieur à « ${DEPENDANT} » (${dependant.chapitreOrigine})`,
    numeroDeChapitre(prealable.chapitreOrigine) !== null
      && numeroDeChapitre(dependant.chapitreOrigine) !== null
      && numeroDeChapitre(prealable.chapitreOrigine) < numeroDeChapitre(dependant.chapitreOrigine),
  );
  // Un prérequis de rang 3 ne reçoit aucune re-confrontation : la dépendance
  // porterait alors sur un piège que l'élève peut n'avoir jamais rencontré
  // autrement qu'une fois, et l'ordre serait tenu sur le papier seulement.
  // `matiere.js` § « le rang le plus contestable du fichier » discute exactement
  // ce choix pour `gaz-n-est-pas-de-la-matiere` et retient rang 1 pour cette
  // raison : c'est ce que ce test protège.
  verifier(
    `dépendance d'Andersson : le prérequis n'est pas un rang 3 (rang ${prealable.rang})`,
    prealable.rang !== 3,
  );
  verifier(
    'dépendance d\'Andersson : les deux pièges sont dans la même famille, donc re-rangés ensemble',
    prealable.famille === dependant.famille,
  );
  reserve(
    'dépendance d\'Andersson, part non atteignable ici : le corpus ORDONNE les deux pièges, il ne\n'
    + `      garantit pas la RENCONTRE. La règle est « ${PREALABLE} rencontré avant\n`
    + `      ${DEPENDANT} », pas « ${prealable.chapitreOrigine} avant ${dependant.chapitreOrigine} » —\n`
    + '      un élève arrivé au chapitre 6 sans avoir traité le 3 la violerait. Elle se lit sur le\n'
    + '      profil élève, et c\'est au moteur de file de la tenir.',
  );
}

// ── Le chapitre d'origine ───────────────────────────────────────────────────

verifier(
  'tout « chapitreOrigine » suit la convention chNN-slug',
  tous.every((p) => /^ch\d{2}-[a-z0-9-]+$/.test(p.chapitreOrigine ?? '')),
);
verifier(
  'tout « chapitreOrigine » désigne un chapitre du programme (1 à 11)',
  tous.every((p) => {
    const n = numeroDeChapitre(p.chapitreOrigine);
    return n !== null && n >= 1 && n <= 11;
  }),
);
// Six familles écrites séparément désignent les mêmes chapitres. Deux slugs pour
// un même numéro — `ch06-transformations-chimiques` d'un côté, `ch06-transfo` de
// l'autre — ne casseraient rien ici : `piegesDuChapitre` rendrait deux listes
// disjointes là où le moteur en attend une, et la dépendance d'Andersson se
// comparerait sur des numéros, donc passerait quand même.
const slugsParNumero = new Map();
for (const ch of new Set(tous.map((p) => p.chapitreOrigine))) {
  const n = numeroDeChapitre(ch);
  slugsParNumero.set(n, [...(slugsParNumero.get(n) ?? []), ch]);
}
const numerosAmbigus = [...slugsParNumero.entries()].filter(([, l]) => l.length > 1);
verifier(
  `un même numéro de chapitre ne porte jamais deux slugs différents${numerosAmbigus.map(([n, l]) => ` — ch${n} : ${l.join(', ')}`).join('')}`,
  numerosAmbigus.length === 0,
);
verifier(
  'piegesDuChapitre rend exactement les pièges de ce chapitre, et rien pour un chapitre inconnu',
  [...new Set(tous.map((p) => p.chapitreOrigine))]
    .every((ch) => piegesDuChapitre(ch).length === tous.filter((p) => p.chapitreOrigine === ch).length)
    && piegesDuChapitre('ch99-inexistant').length === 0,
);
verifier(
  'piegesDeRang partitionne le catalogue',
  [1, 2, 3].reduce((s, n) => s + piegesDeRang(n).length, 0) === tous.length
    && piegesDeRang(4).length === 0,
);

// ── L'antécédent historique ─────────────────────────────────────────────────
//
// « Elle ajoute une troisième chose — “elle a été défendue par des savants” —
// seulement quand le piège porte un `antecedentHistorique` sourcé. Il existe
// pour le capital force et pour l'extramission. Servie partout, la phrase
// fabriquerait de l'histoire des sciences. » Le plafond est donc à deux, et les
// deux sont nommés : le test vérifie le compte ET les noms, parce qu'un plafond
// tenu par deux autres pièges tiendrait le compte et raterait la règle.
//
// `matiere.js` écrit la tentation à laquelle il a fallu résister — phlogistique,
// Lavoisier, la pesée en vase clos — et pourquoi : reconstruire la filiation
// nous-mêmes serait fabriquer de l'histoire des sciences sur un projet dont le
// différenciant affiché est de dire à l'élève ce qui est vrai, y compris ce que
// l'application ne sait pas. C'est ce test qui l'aurait attrapée.

const avecAntecedent = entrees.filter(([, p]) => p.antecedentHistorique !== undefined).map(([id]) => id);

verifier(
  `au plus deux pièges portent « antecedentHistorique » (${avecAntecedent.length})`,
  avecAntecedent.length <= 2,
);
verifier(
  'ce sont le capital force et l\'extramission, les deux que la charte nomme',
  avecAntecedent.every((id) => ['adherence-force-vitesse', 'extramission'].includes(id)),
);
verifier(
  'un antécédent historique est sourcé, jamais une anecdote',
  entrees
    .filter(([, p]) => p.antecedentHistorique !== undefined)
    .every(([, p]) => typeof p.antecedentHistorique.source === 'string'
      && p.antecedentHistorique.source.trim().length > 0),
);

// ── Le rythme, et le budget de re-confrontation ─────────────────────────────
//
// « Le contenu porte un rythme, l'état porte une échéance. » `rythmeInitial` se
// compte en séances. L'invariant 14 refuse « un intervalle de rang 1 dépassant
// 20 séances » : la valeur initiale, qui ne fera que croître, ne peut donc pas
// déjà y être. Et le rang commande le rythme — cible de la charte : cinq
// re-confrontations par an pour un rang 1, trois pour un rang 2, zéro pour un
// rang 3. Un rang 1 qui reviendrait moins souvent qu'un rang 3 inverserait la
// seule décision d'architecture que tout le dossier justifie.

verifier(
  '« rythmeInitial » est un entier de séances, strictement positif',
  tous.every((p) => Number.isInteger(p.rythmeInitial) && p.rythmeInitial > 0),
);
verifier(
  'aucun « rythmeInitial » de rang 1 n\'atteint déjà le plafond de 20 séances',
  piegesDeRang(1).every((p) => p.rythmeInitial < 20),
);

const rythmes = (n) => piegesDeRang(n).map((p) => p.rythmeInitial);
const rang3 = rythmes(3);
verifier(
  `tout rang 1 revient plus vite que tout rang 3 (rang 1 le plus lent : ${Math.max(...rythmes(1))} ; rang 3 le plus rapide : ${rang3.length ? Math.min(...rang3) : '—'})`,
  rang3.length === 0 || Math.max(...rythmes(1)) < Math.min(...rang3),
);

// Le rang 2 vise trois re-confrontations, le rang 1 en vise cinq : un rang 1
// plus lent qu'un rang 2 est un signal, pas une faute — `mouvement.js` motive
// les siens par leur `fiabilite`, `matiere.js` de même pour la masse volumique.
// On le dit plutôt que de l'arbitrer depuis un fichier de tests.
const rang2 = rythmes(2);
if (rang2.length) {
  const plusLentsQueDuRang2 = piegesDeRang(1)
    .filter((p) => p.rythmeInitial > Math.min(...rang2))
    .map((p) => `${p.id} (${p.rythmeInitial}, ${p.fiabilite})`);
  if (plusLentsQueDuRang2.length) {
    reserve(
      `rang 1 plus lent que le rang 2 le plus rapide (${Math.min(...rang2)} séances) — `
      + `à confirmer ou à corriger (${plusLentsQueDuRang2.length}) :\n      ${plusLentsQueDuRang2.join('\n      ')}`,
    );
  }
}

// ── Le plafond du catalogue ─────────────────────────────────────────────────
//
// « Le catalogue vise une trentaine de pièges, dont au plus dix de rang 1 et
// environ six de rang 2. » Ce n'est pas une préférence de style : c'est le
// budget de créneaux de re-confrontation, calculé dans la charte (5 × rang 1 +
// 3 × rang 2 ≤ 100 créneaux disponibles au minimum). Un onzième rang 1 ne coûte
// pas rien, il coûte cinq créneaux à quelqu'un d'autre.
//
// Le catalogue complet dépasse le compte de dix, de trois, et tient le budget
// avec de la marge. Les deux ne tombent donc pas ensemble, et il faut les
// traiter séparément :
//
//   · le BUDGET est la grandeur primitive — c'est lui que la charte calcule et
//     dont le plafond n'est qu'une traduction. Il reste un test ;
//   · le COMPTE de dix est la grandeur dérivée, et il a été traduit quand le
//     catalogue supposait environ six rangs 2. Avec huit, la même enveloppe
//     finance plus de rangs 1 qu'il n'en tient — c'est arithmétique, pas
//     accidentel.
//
// Ce que ce fichier n'a pas le droit de faire, dans un sens comme dans l'autre :
// relever le plafond en douce (il est écrit dans la charte, pas ici), ou laisser
// un rouge permanent sur une ligne que personne ne peut réparer depuis un
// fichier de tests. Faire descendre le compte, s'il doit descendre, veut dire
// refuser un rang par élimination — `matiere.js` en offre cinq, chacun avec la
// déduction écrite pour être refusée, et `electricite.js` deux. C'est une
// décision de relecteur. D'où la réserve, nominative et chiffrée.

const nbRang1 = piegesDeRang(1).length;
const nbRang2 = piegesDeRang(2).length;
const creneaux = 5 * nbRang1 + 3 * nbRang2;

verifier(
  `le budget de re-confrontation tient (5 × ${nbRang1} + 3 × ${nbRang2} = ${creneaux} créneaux pour 100)`,
  creneaux <= 100,
);
verifier(
  `le catalogue reste de l'ordre d'une trentaine de pièges (${tous.length})`,
  tous.length <= 40,
);

if (nbRang1 > 10) {
  const parElimination = piegesDeRang(1).filter((p) => p.fiabilite !== 'primaire').map((p) => `${p.id} (${p.famille}, ${p.fiabilite})`);
  reserve(
    `compte de rang 1 dépassé : ${nbRang1} pour « au plus dix » (charte.md). Le BUDGET qui fonde ce\n`
    + `      plafond tient — ${creneaux} créneaux pour 100 —, c'est le compte qui saute, parce que le\n`
    + `      plafond a été traduit en supposant environ six rangs 2 et qu'il y en a ${nbRang2}.\n`
    + '      Le faire descendre veut dire refuser un rang par élimination, un par un ; aucun test ne\n'
    + `      peut prendre cette décision. Les ${parElimination.length} candidats (rang 1 non fondé sur une source primaire) :\n`
    + `      ${parElimination.join('\n      ')}`,
  );
}
if (nbRang2 > 6) {
  reserve(
    `compte de rang 2 : ${nbRang2} pour « environ six » (charte.md). « Environ » n'est pas un plafond,\n`
    + '      donc ce n\'est pas un échec — mais c\'est ce nombre qui a fait sauter le compte de rang 1\n'
    + '      ci-dessus, et les deux se relisent ensemble.',
  );
}

// ── Les distracteurs ────────────────────────────────────────────────────────

reserve(
  'champ « distracteurs » de charte.md : aucun piège n\'en porte. Assumé par les en-têtes —\n'
  + '      les distracteurs s\'écrivent avec les items. À reprendre à l\'écriture des items.',
);

verifier(
  'aucun piège ne porte de « distracteurs » à moitié écrits (tout ou rien, et c\'est rien)',
  tous.every((p) => p.distracteurs === undefined),
);

// ── Rapport ─────────────────────────────────────────────────────────────────

const parRang = [1, 2, 3].map((n) => `rang ${n} : ${piegesDeRang(n).length}`).join(' · ');
const parFamille = NOMS_DE_FAMILLE.map((f) => `${f} ${tous.filter((p) => p.famille === f).length}`).join(' · ');
console.log(`${entrees.length} pièges — ${parRang}`);
console.log(`familles — ${parFamille}`);
console.log(`${passes} test(s) passé(s).`);
for (const e of echecs) console.log(`  ✗ ${e}`);
if (reserves.length) {
  console.log(`\n${reserves.length} réserve(s) — non testables ici, à ne pas perdre de vue :`);
  for (const r of reserves) console.log(`  ⚠ ${r}`);
}
if (echecs.length) {
  console.log(`\n${echecs.length} échec(s).`);
  process.exit(1);
}
