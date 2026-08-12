// Contrôle du générateur de séance, hors navigateur.
//
//     node tools/tester-seance.mjs
//
// Ce fichier est écrit CONTRE `js/seance.js`. Le module compose une séance et
// rend le compte rendu de ses arbitrages ; ces tests vérifient qu'il REFUSE ce
// que l'invariant 13 refuse, et — c'est la moitié du travail — qu'il ne refuse
// PAS ce que l'invariant 13 autorise.
//
// ── Pourquoi les arbitrages sont l'épreuve décisive ─────────────────────────
//
// Une séance prise isolément a toujours l'air correcte : huit items, quinze
// minutes, rien qui dépasse. Tout ce que la charte demande vraiment au
// générateur est INVISIBLE sur son résultat — « une échéance due n'a pas cédé
// devant une bande », « ce plancher n'est pas tenu parce que le vivier ne le
// permettait pas », « la mesure ne mord qu'à la cinquième séance ». Ces trois
// phrases ne se contrôlent que sur des viviers ARTIFICIELS, construits pour que
// les contraintes se contredisent, et sur le compte rendu que le module rend
// à côté de la séance.
//
// D'où la forme de ce fichier : peu de séances « normales », beaucoup de
// viviers tordus. Un vivier où le cercle 2 n'existe qu'à un palier que l'élève
// n'a pas atteint. Une fenêtre déjà saturée en cercle 3 le jour où l'unique
// échéance due est un item de cercle 3. Un piège dont le seul porteur est dans
// le chapitre en cours. Ce sont les cas où un moteur qui devine se distingue
// d'un moteur qui refuse.
//
// ── La règle de correction ─────────────────────────────────────────────────
//
// Chaque échec a été tranché dans un sens ou dans l'autre : le module a tort,
// ou le test a tort. Aucun test n'a été affaibli pour passer au vert. Les
// corrections apportées à `js/seance.js` sont listées en tête de chaque bloc
// concerné, avec la phrase de `charte.md` qui les décide.

import {
  BANDES,
  BUDGET_RITUEL_MAX,
  BUDGET_RITUEL_MIN,
  BUDGET_SEANCE,
  CERCLES,
  COEUR_MAX,
  COEUR_MIN,
  COUTS,
  MOTIFS_DE_SACRIFICE,
  TAILLE_FENETRE,
  controlerFenetre,
  controlerSeance,
  coutDe,
  coutItem,
  genererSeance,
  partsParCercle,
  piegesDusDeLaSeance,
  resumerSeance,
} from '../js/seance.js';

let passes = 0;
const echecs = [];
const reserves = [];

const verifier = (nom, condition) => {
  if (condition === true) passes += 1;
  else echecs.push(nom);
};

/** Ce qu'on attend d'un module qui rend un verdict : jamais d'exception. */
const sansLever = (nom, f) => {
  try {
    const valeur = f();
    passes += 1;
    return valeur;
  } catch (e) {
    echecs.push(`${nom} — a LEVÉ ${e.constructor.name} : ${e.message}`);
    return undefined;
  }
};

const reserve = (texte) => reserves.push(texte);

// ════════════════════════════════════════════════════════════════════════════
// Les fabriques — des viviers artificiels, jamais du contenu réel
// ════════════════════════════════════════════════════════════════════════════
//
// Le contenu réel n'existe pas encore (les items ne sont pas écrits) et il ne
// servirait pas ici : un vivier réel est équilibré, or ce qu'on teste est le
// comportement du moteur sur des viviers qui ne le sont pas.

const item = (o = {}) => ({
  id: o.id ?? 'i',
  sfPrincipal: o.sf ?? 'sf1',
  chapitre: o.ch ?? 'chB',
  cercle: o.cercle ?? 1,
  palier: o.palier ?? 1,
  type: o.type ?? 'court',
  piege: o.piege ?? null,
  rituelDeControle: o.rituel === true,
  contexteDeSurface: o.ctx ?? 'ctx-1',
});

/** Un vivier de `n` items par cercle, tous servables au palier 1. */
const vivierEquilibre = (n = 8, ch = 'chB') => CERCLES.flatMap(
  (c) => [...Array(n)].map((_, k) => item({ id: `v-${c}-${k}`, cercle: c, sf: `sf${c}`, ch })),
);

const etatDe = (o = {}) => ({
  numeroSeance: o.numeroSeance ?? 1,
  chapitreCourant: o.chapitreCourant ?? 'chB',
  chapitresFaits: o.chapitresFaits ?? ['chA', 'chB'],
  vivier: o.vivier ?? vivierEquilibre(),
  savoirFaire: o.savoirFaire ?? {},
  pieges: o.pieges ?? {},
  fenetre: o.fenetre ?? [],
  dernierPiegeRevise: o.dernierPiegeRevise ?? null,
});

/** Un résumé de séance fabriqué à la main, pour interroger `controlerFenetre`
 *  sans passer par une composition — c'est le seul moyen d'atteindre les cas
 *  que le générateur, justement, ne produit pas. */
const resume = (o = {}) => ({
  numeroSeance: o.n ?? 1,
  parCercle: { 0: 0, 1: 0, 2: 0, 3: 0, ...(o.parCercle ?? {}) },
  sansCercle: o.sansCercle ?? 0,
  total: o.total ?? CERCLES.reduce((s, c) => s + ((o.parCercle ?? {})[c] ?? 0), 0) + (o.sansCercle ?? 0),
  cout: o.cout ?? 100,
  disponiblesNonServis: { 0: 0, 1: 0, 2: 0, 3: 0, ...(o.dispos ?? {}) },
  sacrifices: o.sacrifices ?? [],
});

const codes = (liste) => (liste ?? []).map((a) => a.code);
const CATALOGUE_VIDE = Object.freeze({});

// ════════════════════════════════════════════════════════════════════════════
// ① Les constantes que le module dit vérifiées — et qui ne l'étaient pas
// ════════════════════════════════════════════════════════════════════════════
//
// L'en-tête de `BANDES` écrit : « les planchers somment à 77 et les plafonds à
// 122 : la cible est atteignable, ce qui n'allait pas de soi et vaut d'être
// vérifié une fois pour toutes ici ». Rien ne le vérifiait. C'est le défaut que
// la charte nomme dans sa propre v1 — quatre bandes qui ne sommaient pas à
// 100 % rendaient une quinzaine de savoir-faire inacquérables sans qu'aucun
// contrôle ne le dise.

const sommePlanchers = CERCLES.reduce((s, c) => s + BANDES[c].plancher, 0);
const sommePlafonds = CERCLES.reduce((s, c) => s + BANDES[c].plafond, 0);

verifier(`les planchers somment à ${sommePlanchers} ≤ 100 (sinon aucune séance ne les tient tous)`,
  sommePlanchers <= 100);
verifier(`les plafonds somment à ${sommePlafonds} ≥ 100 (sinon la séance ne se remplit pas)`,
  sommePlafonds >= 100);
verifier('chaque plancher est sous son plafond',
  CERCLES.every((c) => BANDES[c].plancher <= BANDES[c].plafond));
verifier('les quatre cercles partitionnent : ni doublon, ni trou',
  CERCLES.length === 4 && new Set(CERCLES).size === 4);
verifier('tout coût est un entier de dixièmes de minute (la durée ne se compare pas en flottants)',
  Object.values(COUTS).every(Number.isInteger));
verifier('le rituel le plus cher tient dans son propre plafond',
  BUDGET_RITUEL_MIN <= BUDGET_RITUEL_MAX && BUDGET_RITUEL_MAX < BUDGET_SEANCE);
verifier('un cœur plein d\'items courts tient dans le budget de séance',
  BUDGET_RITUEL_MAX + COEUR_MAX * COUTS.court <= BUDGET_SEANCE);

// ════════════════════════════════════════════════════════════════════════════
// ② L'état hors cadre — refuser, jamais deviner
// ════════════════════════════════════════════════════════════════════════════
//
// La règle du module : « une séance plausible issue d'un état fautif est le
// pire des deux mondes — elle ne sert pas l'élève et elle masque le défaut ».
// Elle vaut pour les champs absents comme pour les champs présents mais faux.

const refuse = (nom, etat) => {
  const s = sansLever(`${nom} — rend un verdict`, () => genererSeance(etat, 1, { catalogue: CATALOGUE_VIDE }));
  verifier(nom, s?.refus?.code === 'ETAT_HORS_CADRE'
    && Array.isArray(s.refus.manques) && s.refus.manques.length > 0
    && s.items.length === 0 && s.cout.total === 0 && s.compteRendu === null);
};

refuse('un état `null` est refusé', null);
refuse('un état `undefined` est refusé', undefined);
refuse('un état vide est refusé', {});
refuse('un vivier vide est refusé', etatDe({ vivier: [] }));
refuse('un vivier qui n\'est pas un tableau est refusé', etatDe({ vivier: 'des items' }));
refuse('`numeroSeance` à 0 est refusé', etatDe({ numeroSeance: 0 }));
refuse('`numeroSeance` fractionnaire est refusé', etatDe({ numeroSeance: 1.5 }));
refuse('`numeroSeance` en chaîne est refusé (le temps se compte en séances)', etatDe({ numeroSeance: '3' }));
refuse('`chapitreCourant` absent est refusé', etatDe({ chapitreCourant: '' }));
refuse('`chapitresFaits` non-tableau est refusé', etatDe({ chapitresFaits: 'chB' }));

// Les items fautifs : le module refuse la SÉANCE plutôt que d'écarter l'item en
// douce. Un item écarté en silence, c'est un corpus fautif qui produit des
// séances plausibles — et le défaut reste invisible jusqu'au jour où quelqu'un
// s'étonne qu'un savoir-faire ne sorte jamais de la file.
const avecItemFautif = (nom, mauvais) => refuse(nom, etatDe({
  vivier: [...vivierEquilibre(2), mauvais],
}));

avecItemFautif('un cercle hors énuméré est refusé', item({ id: 'x', cercle: 4 }));
avecItemFautif('un cercle en chaîne est refusé', item({ id: 'x', cercle: '1' }));
avecItemFautif('un cercle absent est refusé', { ...item({ id: 'x' }), cercle: undefined });
avecItemFautif('un type sans coût déclaré est refusé', item({ id: 'x', type: 'video' }));
avecItemFautif('un item `null` dans le vivier est refusé', null);

// Ces quatre-là passaient. Ils ne produisaient pas d'erreur : ils produisaient
// une séance plausible et FAUSSE. Sans `id`, deux items partagent la même clé
// d'unicité et en prendre un rend l'autre indisponible — le cœur se vide sans
// rien dire. Sans `palier`, l'item n'est jamais servable mais reste compté
// parmi « ce que le vivier offrait », ce qui fait accuser le moteur à tort au
// contrôle de la fenêtre. Sans `sfPrincipal`, le tri des dettes compare
// `undefined` et le module lève.
avecItemFautif('un item sans `id` est refusé', { ...item({ id: 'x' }), id: undefined });
avecItemFautif('un item sans `sfPrincipal` est refusé', { ...item({ id: 'x' }), sfPrincipal: undefined });
avecItemFautif('un item sans `chapitre` est refusé', { ...item({ id: 'x' }), chapitre: undefined });
avecItemFautif('un item sans `palier` est refusé', { ...item({ id: 'x' }), palier: undefined });
avecItemFautif('un item de palier hors 1..4 est refusé', item({ id: 'x', palier: 7 }));

// L'état de suivi, lui aussi, est une donnée qui peut mentir. Une échéance qui
// n'est pas un entier de séance était lue « pas due » — c'est-à-dire qu'un
// profil corrompu faisait taire une dette, silencieusement, ce qui est
// exactement le défaut que l'invariant 13 existe pour attraper.
refuse('une échéance de savoir-faire non entière est refusée',
  etatDe({ savoirFaire: { sf1: { echeance: 'plus tard' } } }));
refuse('une échéance de piège non entière est refusée',
  etatDe({ pieges: { p1: { echeance: 3.5 } } }));
refuse('un suivi de savoir-faire qui n\'est pas un objet est refusé',
  etatDe({ savoirFaire: { sf1: 12 } }));
refuse('`savoirFaire` qui n\'est pas un objet est refusé', etatDe({ savoirFaire: 'aucun' }));

// Un état correct, lui, passe — sans quoi les refus ci-dessus ne prouveraient
// rien (un module qui refuse tout refuse aussi ce qu'il doit accepter).
const seanceNormale = genererSeance(etatDe({ numeroSeance: 4 }), 42, { catalogue: CATALOGUE_VIDE });
verifier('un état bien formé n\'est PAS refusé', seanceNormale.refus === null);
verifier('une échéance absente vaut « due » (sans quoi rien n\'entre jamais dans la file)',
  seanceNormale.coeur.length > 0);

// ── Les verdicts des trois autres fonctions publiques ───────────────────────

const seanceRefusee = genererSeance(null, 1, { catalogue: CATALOGUE_VIDE });

verifier('`controlerSeance` d\'une séance refusée rend SEANCE_REFUSEE',
  codes(controlerSeance(seanceRefusee)).includes('SEANCE_REFUSEE'));
verifier('`controlerSeance(null)` rend un verdict',
  codes(sansLever('`controlerSeance(null)`', () => controlerSeance(null))).length > 0);
verifier('`controlerSeance({})` rend un verdict au lieu de lever',
  codes(sansLever('`controlerSeance({})`', () => controlerSeance({}))).length > 0);
verifier('`controlerSeance` d\'une séance sans compte rendu rend un verdict',
  codes(sansLever('`controlerSeance` sans compteRendu',
    () => controlerSeance({ cout: { total: 10 } }))).length > 0);

// Un résumé est ce qui ENTRE dans la fenêtre glissante. Résumer ce qui n'est
// pas une séance et rendre un objet d'apparence normale, c'est injecter une
// séance fantôme conforme dans la mesure des bandes : la fenêtre compterait
// cinq séances quand il n'y en a eu que quatre.
const resumeDeRien = sansLever('`resumerSeance(null)`', () => resumerSeance(null));
verifier('`resumerSeance(null)` marque le résumé hors cadre', resumeDeRien?.horsCadre != null);
const resumeDeRefus = sansLever('`resumerSeance` d\'une séance refusée', () => resumerSeance(seanceRefusee));
verifier('`resumerSeance` d\'une séance refusée marque le résumé hors cadre',
  resumeDeRefus?.horsCadre != null);
verifier('un résumé de séance normale, lui, n\'est pas marqué',
  resumerSeance(seanceNormale).horsCadre == null);

verifier('`controlerFenetre(undefined)` rend une fenêtre non mesurée',
  controlerFenetre(undefined).mesuree === false);
const fenetreDeNulls = sansLever('`controlerFenetre` sur cinq `null`',
  () => controlerFenetre([null, null, null, null, null]));
verifier('cinq résumés `null` sont refusés, pas comptés',
  codes(fenetreDeNulls?.anomalies).includes('RESUME_HORS_CADRE'));
const fenetreDeVides = sansLever('`controlerFenetre` sur cinq objets vides',
  () => controlerFenetre([{}, {}, {}, {}, {}]));
verifier('cinq résumés informes ne rendent pas « tout va bien »',
  codes(fenetreDeVides?.anomalies).includes('RESUME_HORS_CADRE'));
verifier('un résumé hors cadre dans une fenêtre par ailleurs saine est refusé',
  codes(controlerFenetre([resume(), resume(), resume(), resume(), resumeDeRefus]).anomalies)
    .includes('RESUME_HORS_CADRE'));

// Les deux fonctions de coût sont documentées comme tolérantes : un type
// inconnu vaut 0. C'est cohérent parce que le type inconnu est déjà refusé en
// amont, à la lecture de l'état.
verifier('le coût d\'un item sans type est nul', coutItem({}) === 0 && coutItem(null) === 0);
verifier('le coût d\'une liste vide est nul', coutDe([]) === 0);
verifier('les parts d\'une liste vide sont nulles', partsParCercle([]).total === 0);
verifier('un item sans cercle est compté à part (le symptôme de la somme ≠ 1)',
  partsParCercle([item(), { ...item(), cercle: undefined }]).sansCercle === 1);

// ════════════════════════════════════════════════════════════════════════════
// ③ Fonction pure — la condition d'existence du site (S)
// ════════════════════════════════════════════════════════════════════════════

const etatPur = etatDe({ numeroSeance: 6, vivier: vivierEquilibre(6) });
const a1 = genererSeance(etatPur, 1234, { catalogue: CATALOGUE_VIDE });
const a2 = genererSeance(etatPur, 1234, { catalogue: CATALOGUE_VIDE });
verifier('même état, même graine, même séance', JSON.stringify(a1) === JSON.stringify(a2));

const graines = [1, 2, 3, 4, 5, 6, 7, 8].map(
  (g) => genererSeance(etatPur, g, { catalogue: CATALOGUE_VIDE }).coeur.map((i) => i.id).join(','),
);
verifier('des graines différentes ne rendent pas toutes le même tirage',
  new Set(graines).size > 1);

const avant = etatPur.vivier.map((i) => i.id).join(',');
genererSeance(etatPur, 99, { catalogue: CATALOGUE_VIDE });
verifier('le vivier de l\'appelant n\'est pas réordonné (le mélange se fait sur une copie)',
  etatPur.vivier.map((i) => i.id).join(',') === avant);

const geler = (o) => {
  if (o && typeof o === 'object' && !Object.isFrozen(o)) { Object.freeze(o); Object.values(o).forEach(geler); }
  return o;
};
const gele = sansLever('un état gelé en profondeur n\'est pas muté',
  () => genererSeance(geler(structuredClone(etatPur)), 7, { catalogue: CATALOGUE_VIDE }));
verifier('un état gelé produit quand même une séance', gele?.coeur.length > 0);

// ════════════════════════════════════════════════════════════════════════════
// ④ Les trois temps, et la durée qui lie
// ════════════════════════════════════════════════════════════════════════════

const vivierAvecRituel = [
  ...vivierEquilibre(6),
  ...[0, 1, 2].map((k) => item({ id: `r-${k}`, ch: 'chA', rituel: true, sf: 'sfR', type: 'lecture' })),
];
const avecRituel = genererSeance(etatDe({ numeroSeance: 9, vivier: vivierAvecRituel }), 3,
  { catalogue: CATALOGUE_VIDE });

verifier('le rituel tient dans son plafond de 4 minutes',
  avecRituel.cout.rituel <= BUDGET_RITUEL_MAX);
verifier('le rituel atteint son plancher quand le vivier le permet',
  avecRituel.cout.rituel >= BUDGET_RITUEL_MIN);
verifier('le rituel est EXCLU de ce qui est mesuré',
  avecRituel.rituel.length > 0
  && avecRituel.rituel.every((i) => !avecRituel.itemsMesures.includes(i)));
verifier('ce qui est mesuré, c\'est le cœur plus la re-confrontation',
  avecRituel.itemsMesures.length === avecRituel.coeur.length + (avecRituel.reconfrontation ? 1 : 0));
verifier('la séance tient dans les quinze minutes', avecRituel.cout.total <= BUDGET_SEANCE);
verifier('le coût annoncé est celui des items servis',
  avecRituel.cout.total === coutDe(avecRituel.items)
  && avecRituel.cout.total === avecRituel.cout.rituel + avecRituel.cout.coeur + avecRituel.cout.reconfrontation);
verifier('le rituel n\'est jamais pris dans un chapitre non fait',
  avecRituel.rituel.every((i) => etatDe().chapitresFaits.includes(i.chapitre)));
verifier('un item de rituel n\'entre pas dans le cœur',
  avecRituel.coeur.every((i) => i.rituelDeControle !== true));
verifier('`controlerSeance` ne trouve rien à redire à une séance normale',
  controlerSeance(avecRituel).length === 0);

// Le vivier le plus cher possible : rien ne doit déborder, et surtout pas en
// silence. La durée est la contrainte de premier rang après les échéances.
const vivierLourd = CERCLES.flatMap((c) => [...Array(6)].map((_, k) => item({
  id: `L-${c}-${k}`, cercle: c, sf: `sf${c}`, type: 'schema-circuit',
})));
const lourde = genererSeance(etatDe({ numeroSeance: 2, vivier: vivierLourd }), 11,
  { catalogue: CATALOGUE_VIDE });
verifier('un vivier d\'items lourds ne fait pas déborder la séance',
  lourde.cout.total <= BUDGET_SEANCE);
verifier('… et le cœur trop court est DIT, pas tu',
  lourde.coeur.length >= COEUR_MIN
  || codes(lourde.compteRendu.reserves).includes('COEUR_TROP_COURT'));

// ── Un item n'est jamais servi deux fois ────────────────────────────────────
//
// Le cas se construit : un item de rituel qui porte aussi un piège dû. Le
// rituel le prenait, la re-confrontation le reprenait, et il figurait deux fois
// dans la séance — compté deux fois dans le coût, et surtout compté dans la
// mesure des bandes alors que « les items du rituel en sont exclus ».
const CAT_P1 = Object.freeze({ p1: { id: 'p1', rang: 1, chapitreOrigine: 'chA' } });
const doublon = genererSeance(etatDe({
  numeroSeance: 3,
  vivier: [
    item({ id: 'rituel-piege', ch: 'chA', rituel: true, piege: 'p1', sf: 'sfR' }),
    ...vivierEquilibre(4),
  ],
  pieges: { p1: { echeance: 1, rencontres: 2 } },
}), 3, { catalogue: CAT_P1 });

verifier('aucun item n\'est servi deux fois dans la même séance',
  new Set(doublon.items.map((i) => i.id)).size === doublon.items.length);
verifier('un item de rituel n\'est jamais repris en re-confrontation',
  doublon.reconfrontation === null || doublon.reconfrontation.item.rituelDeControle !== true);
verifier('… donc le coût ne compte pas deux fois le même item',
  doublon.cout.total === coutDe([...new Set(doublon.items)]));

// ════════════════════════════════════════════════════════════════════════════
// ⑤ La re-confrontation — prise hors du chapitre en cours
// ════════════════════════════════════════════════════════════════════════════

const CAT = Object.freeze({
  p1: { id: 'p1', rang: 1, chapitreOrigine: 'chA' },
  p2: { id: 'p2', rang: 2, chapitreOrigine: 'chA', iatrogene: 'sfProd' },
  p3: { id: 'p3', rang: 3, chapitreOrigine: 'chA' },
});

const porteurs = (piege, ch, n = 2) => [...Array(n)].map((_, k) => item({
  id: `${piege}-${ch}-${k}`, piege, ch, sf: `sf-${piege}`, ctx: `ctx-${k}`,
}));

const etatReconf = etatDe({
  numeroSeance: 10,
  vivier: [...vivierEquilibre(5), ...porteurs('p1', 'chA'), ...porteurs('p1', 'chB')],
  pieges: { p1: { echeance: 2, rencontres: 3 } },
});
const reconf = genererSeance(etatReconf, 8, { catalogue: CAT_P1 });

verifier('la re-confrontation sert le piège dû', reconf.reconfrontation?.piege === 'p1');
verifier('elle n\'est JAMAIS prise dans le chapitre en cours',
  reconf.reconfrontation.item.chapitre !== etatReconf.chapitreCourant);
verifier('`controlerSeance` refuse une re-confrontation dans le chapitre en cours',
  codes(controlerSeance({
    ...reconf,
    reconfrontation: { item: item({ id: 'z', ch: 'chB' }), piege: 'p1', contexteDejaVu: false },
  })).includes('RECONFRONTATION_DANS_LE_CHAPITRE'));

// Faute de porteur hors chapitre, le créneau est vide ET LE DIT. C'est la
// différence entre un moteur qui renonce et un moteur qui renonce en silence.
const sansPorteur = genererSeance(etatDe({
  numeroSeance: 10,
  vivier: [...vivierEquilibre(5), ...porteurs('p1', 'chB')],
  pieges: { p1: { echeance: 2, rencontres: 3 } },
}), 8, { catalogue: CAT_P1 });
verifier('sans porteur hors chapitre, le créneau est vide', sansPorteur.reconfrontation === null);
verifier('… et le sacrifice est journalisé au motif « vivier »',
  sansPorteur.compteRendu.sacrifices.some((s) => s.quoi === 'p1' && s.motif === 'vivier'));

// Le garde-fou de l'interrupteur : un chapitre « pas encore » ne produit ni
// lacune ni échéance. Le piège dont le chapitre d'origine n'est pas fait et qui
// n'a jamais été rencontré sort de la file, avec son motif.
const desactive = genererSeance(etatDe({
  numeroSeance: 10,
  chapitresFaits: ['chB'],
  vivier: [...vivierEquilibre(5), ...porteurs('p1', 'chA')],
  pieges: {},
}), 8, { catalogue: CAT_P1 });
verifier('un piège dont le chapitre d\'origine n\'est pas fait est écarté au bon motif',
  desactive.compteRendu.sacrifices.some((s) => s.quoi === 'p1' && s.motif === 'chapitre-desactive'));

// Rang 2 : la conception que NOUS fabriquons n'existe pas avant le savoir-faire
// qui la produit. La programmer avant, c'est donner à l'élève une idée qu'il
// n'avait pas.
const rang2 = piegesDusDeLaSeance(etatDe({
  numeroSeance: 10,
  pieges: { p2: { echeance: 1, rencontres: 1 } },
  savoirFaire: {},
}), CAT);
verifier('un piège de rang 2 attend son savoir-faire producteur',
  rang2.ecartes.some((e) => e.piege === 'p2' && e.motif === 'dependance'));
verifier('… et il entre dans la file dès que le producteur a été rencontré',
  piegesDusDeLaSeance(etatDe({
    numeroSeance: 10,
    pieges: { p2: { echeance: 1, rencontres: 1 } },
    savoirFaire: { sfProd: { rencontres: 2 } },
  }), CAT).file.some((f) => f.piege.id === 'p2'));
verifier('un rang 2 sans `iatrogene` déclaré est écarté, pas servi',
  piegesDusDeLaSeance(etatDe({ numeroSeance: 10, pieges: { pX: { echeance: 1 } } }),
    { pX: { id: 'pX', rang: 2, chapitreOrigine: 'chA' } })
    .ecartes.some((e) => e.piege === 'pX' && e.motif === 'dependance'));

// La dépendance d'Andersson, à l'échelle du PROFIL — c'est ici, et nulle part
// ailleurs, que la règle a un endroit où s'exécuter.
const CAT_ANDERSSON = Object.freeze({
  'conservation-de-la-masse': { id: 'conservation-de-la-masse', rang: 1, chapitreOrigine: 'chA' },
  'gaz-n-est-pas-de-la-matiere': { id: 'gaz-n-est-pas-de-la-matiere', rang: 1, chapitreOrigine: 'chA' },
});
const andersson = piegesDusDeLaSeance(etatDe({
  numeroSeance: 10,
  pieges: { 'conservation-de-la-masse': { echeance: 1 } },
}), CAT_ANDERSSON);
verifier('la conservation de la masse attend la matérialité du gaz',
  andersson.ecartes.some((e) => e.piege === 'conservation-de-la-masse' && e.motif === 'dependance'));
verifier('… et passe une fois le gaz rencontré',
  piegesDusDeLaSeance(etatDe({
    numeroSeance: 10,
    pieges: {
      'conservation-de-la-masse': { echeance: 1 },
      'gaz-n-est-pas-de-la-matiere': { echeance: 99, rencontres: 1 },
    },
  }), CAT_ANDERSSON).file.some((f) => f.piege.id === 'conservation-de-la-masse'));

// L'ordre de la file : rang 1, puis 2, puis 3 — c'est ce qui produit le budget
// de la charte (cinq re-confrontations par an pour un rang 1, zéro pour un
// rang 3) sans avoir à refuser un piège que le contenu programme.
const fileOrdre = piegesDusDeLaSeance(etatDe({
  numeroSeance: 20,
  pieges: {
    p1: { echeance: 1, rencontres: 1 },
    p2: { echeance: 1, rencontres: 1 },
    p3: { echeance: 1, rencontres: 1 },
  },
  savoirFaire: { sfProd: { rencontres: 1 } },
}), CAT).file.map((f) => f.piege.id);
verifier('la file va du rang 1 au rang 3', fileOrdre.join(',') === 'p1,p2,p3');
verifier('la file est reproductible (même état, même ordre)',
  piegesDusDeLaSeance(etatDe({
    numeroSeance: 20,
    pieges: { p1: { echeance: 1 }, p2: { echeance: 1 }, p3: { echeance: 1 } },
    savoirFaire: { sfProd: { rencontres: 1 } },
  }), CAT).file.map((f) => f.piege.id).join(',') === fileOrdre.join(','));

// Ce qui revient est varié — mais la variété cède devant l'échéance, jamais
// l'inverse : mieux vaut un décor déjà vu qu'une re-confrontation reportée.
const varie = genererSeance(etatDe({
  numeroSeance: 10,
  vivier: [...vivierEquilibre(5), ...porteurs('p1', 'chA', 2)],
  pieges: { p1: { echeance: 2, rencontres: 3, derniersContextes: ['ctx-0'] } },
}), 5, { catalogue: CAT_P1 });
verifier('le contexte de surface déjà servi est évité',
  varie.reconfrontation.item.contexteDeSurface !== 'ctx-0');

const contexteForce = genererSeance(etatDe({
  numeroSeance: 10,
  vivier: [...vivierEquilibre(5), ...porteurs('p1', 'chA', 1)],
  pieges: { p1: { echeance: 2, rencontres: 3, derniersContextes: ['ctx-0'] } },
}), 5, { catalogue: CAT_P1 });
verifier('faute de décor neuf, la re-confrontation a lieu quand même',
  contexteForce.reconfrontation?.piege === 'p1');
verifier('… et le déjà-vu est déclaré, pas masqué',
  contexteForce.reconfrontation.contexteDejaVu === true);

// Le plafond d'intervalle du rang 1 : ce module ne FIXE pas les échéances, mais
// une échéance posée au-delà de vingt séances sort un piège de rang 1 de la
// file pour l'année. Il la lit et la met en réserve.
verifier('une échéance de rang 1 au-delà de vingt séances est portée en réserve',
  codes(genererSeance(etatDe({
    numeroSeance: 1,
    pieges: { p1: { echeance: 40, rencontres: 1 } },
  }), 1, { catalogue: CAT_P1 }).compteRendu.reserves).includes('INTERVALLE_RANG_1_HORS_PLAFOND'));

// ════════════════════════════════════════════════════════════════════════════
// ⑥ ÉPREUVE — quand une échéance due contredit une bande, qui cède ?
// ════════════════════════════════════════════════════════════════════════════
//
// « L'ordre de priorité : 1. les échéances dues, qui ne se reportent jamais ;
// 2. la durée ; 3. les bandes de cercles, qui cèdent en dernier et dont l'écart
// est journalisé au lieu d'être refusé. »
//
// Le conflit se construit ainsi : une fenêtre déjà saturée en cercle 3 (son
// plafond est 20 %), et le seul savoir-faire dû du chapitre courant ne porte
// que des items de cercle 3. Si la bande gagne, l'échéance est reportée et
// l'invariant 13 est violé. Si l'échéance gagne, l'écart de bande apparaît dans
// le compte rendu — et c'est exactement ce qu'on veut lire.

const fenetreSatureeEn3 = [...Array(4)].map((_, k) => resume({
  n: k + 1, parCercle: { 0: 1, 1: 4, 2: 1, 3: 4 },
}));

const conflit = genererSeance(etatDe({
  numeroSeance: 5,
  fenetre: fenetreSatureeEn3,
  vivier: [...Array(4)].map((_, k) => item({ id: `c3-${k}`, cercle: 3, sf: 'sfDu', ch: 'chB' })),
  savoirFaire: { sfDu: { echeance: 3, palierServi: 1 } },
}), 4, { catalogue: CATALOGUE_VIDE });

verifier('l\'échéance due est servie MALGRÉ la bande saturée',
  conflit.coeur.some((i) => i.sfPrincipal === 'sfDu'));
verifier('aucun sacrifice n\'est motivé par une bande',
  conflit.compteRendu.sacrifices.every((s) => s.motif !== 'bande'));
verifier('`controlerSeance` ne signale pas d\'échéance reportée',
  !codes(controlerSeance(conflit)).includes('ECHEANCE_REPORTEE'));
verifier('l\'écart de bande, lui, est JOURNALISÉ',
  conflit.compteRendu.bandes.ecarts.some((e) => e.cercle === 3 && e.sens === 'plafond'));

// Le même conflit, côté piège : une échéance de piège due dont le seul porteur
// est de cercle 3, sur une fenêtre saturée en cercle 3.
const conflitPiege = genererSeance(etatDe({
  numeroSeance: 5,
  fenetre: fenetreSatureeEn3,
  vivier: [
    ...vivierEquilibre(4),
    item({ id: 'p1-c3', piege: 'p1', ch: 'chA', cercle: 3, sf: 'sfP' }),
  ],
  pieges: { p1: { echeance: 1, rencontres: 2 } },
}), 6, { catalogue: CAT_P1 });
verifier('l\'échéance de piège est servie malgré la bande saturée',
  conflitPiege.reconfrontation?.item.id === 'p1-c3');

// L'ordre de COMPOSITION est l'ordre de priorité : la re-confrontation réserve
// son coût avant que le cœur ne remplisse. Sans cela, une échéance de piège se
// ferait manger par la durée au profit d'items choisis pour une bande.
const budgetSerre = genererSeance(etatDe({
  numeroSeance: 5,
  vivier: [
    ...CERCLES.flatMap((c) => [...Array(4)].map((_, k) => item({
      id: `gros-${c}-${k}`, cercle: c, sf: `sf${c}`, type: 'schema-circuit',
    }))),
    item({ id: 'p1-cher', piege: 'p1', ch: 'chA', type: 'schema-circuit', sf: 'sfP' }),
  ],
  pieges: { p1: { echeance: 1, rencontres: 2 } },
}), 2, { catalogue: CAT_P1 });
verifier('la re-confrontation réserve son coût avant le cœur',
  budgetSerre.reconfrontation?.item.id === 'p1-cher');
verifier('… sans faire déborder la séance', budgetSerre.cout.total <= BUDGET_SEANCE);

// Une échéance ne se reporte pas tant que la DURÉE le permet. Douze
// savoir-faire dus, des items courts, cent-cinquante dixièmes de budget : le
// compte indicatif du cœur (5 à 8) n'est pas un motif de report — « le compte
// est indicatif, c'est la durée qui lie ». Le moteur reportait quatre dettes en
// les motivant par la durée alors que la moitié du budget restait.
const douzeDettes = genererSeance(etatDe({
  numeroSeance: 5,
  vivier: [...Array(12)].map((_, k) => item({ id: `d-${k}`, sf: `sfd${k}`, cercle: k % 4, ch: 'chB' })),
}), 1, { catalogue: CATALOGUE_VIDE });
const reportsMenteurs = douzeDettes.compteRendu.sacrifices.filter(
  (s) => s.motif === 'duree' && douzeDettes.cout.total + Math.min(...Object.values(COUTS)) <= BUDGET_SEANCE,
);
verifier('aucune dette n\'est reportée « pour la durée » quand le budget le permettait',
  reportsMenteurs.length === 0);
verifier('… et la séance tient malgré tout dans les quinze minutes',
  douzeDettes.cout.total <= BUDGET_SEANCE);

// Quand la durée manque VRAIMENT, le report est légitime et le motif est vrai.
const dettesTropCheres = genererSeance(etatDe({
  numeroSeance: 5,
  vivier: [...Array(8)].map((_, k) => item({
    id: `dc-${k}`, sf: `sfdc${k}`, cercle: k % 4, type: 'schema-circuit',
  })),
}), 1, { catalogue: CATALOGUE_VIDE });
verifier('quand le budget est épuisé, le report existe et porte le motif « duree »',
  dettesTropCheres.compteRendu.sacrifices.some((s) => s.motif === 'duree'));
verifier('… et la séance ne déborde pas pour autant',
  dettesTropCheres.cout.total <= BUDGET_SEANCE);

// Le cas où la bande gagnait sans que personne ne s'en aperçoive : une séance
// où AUCUNE échéance n'est due. La passe 1 ne donne rien, la passe 2 compose
// seule — et sur une fenêtre vide, un item sur un fait 100 % d'un cercle, ce
// qui dépasse les quatre plafonds. Le cœur restait donc VIDE sur un vivier
// riche. La bande, priorité 3, l'emportait sur la séance entière.
const rienDeDu = genererSeance(etatDe({
  numeroSeance: 1,
  vivier: vivierEquilibre(6),
  savoirFaire: Object.fromEntries(CERCLES.map((c) => [`sf${c}`, { echeance: 50, palierServi: 1 }])),
}), 3, { catalogue: CATALOGUE_VIDE });
verifier('sans aucune échéance due, le cœur se remplit quand même',
  rienDeDu.coeur.length >= COEUR_MIN);
verifier('… en servant les quatre cercles plutôt qu\'aucun',
  new Set(rienDeDu.coeur.map((i) => i.cercle)).size >= 3);
verifier('… et la séance reste dans le budget', rienDeDu.cout.total <= BUDGET_SEANCE);

// La contrepartie, qu'il faut vérifier sous peine d'avoir simplement désarmé le
// plafond : sur un vivier d'un seul cercle, le plafond LIE TOUJOURS. Le cœur
// s'arrête court plutôt que de composer une séance à 100 % de cercle 3 — et il
// dit les deux raisons. Une première version de ce test exigeait qu'aucun
// plafond ne bloque jamais ; c'était le test qui avait tort, pas le module :
// « les plafonds lient toujours, y compris quand il ne reste plus rien
// d'autre » est une phrase de la charte, et c'est le plancher du cœur qui cède.
const monoCercle = genererSeance(etatDe({
  numeroSeance: 1,
  vivier: [...Array(8)].map((_, k) => item({ id: `m-${k}`, cercle: 3, sf: 'sfM', ch: 'chB' })),
  savoirFaire: { sfM: { echeance: 40, palierServi: 1 } },
}), 2, { catalogue: CATALOGUE_VIDE });
verifier('un vivier d\'un seul cercle ne produit pas une séance à 100 % de ce cercle',
  monoCercle.coeur.length < COEUR_MIN);
verifier('… et le moteur dit les deux choses : cœur court, plafond bloquant',
  codes(monoCercle.compteRendu.reserves).includes('COEUR_TROP_COURT')
  && codes(monoCercle.compteRendu.reserves).includes('PLAFOND_BLOQUANT'));
verifier('… l\'écart de bande est journalisé, la séance n\'est pas refusée',
  controlerSeance(monoCercle).length === 0 && monoCercle.refus === null);

// Une dette dont le vivier ne porte aucun item au palier servi : ce n'est pas
// une faute de moteur, et le motif le dit.
const detteSansItem = genererSeance(etatDe({
  numeroSeance: 5,
  vivier: [
    ...vivierEquilibre(4),
    item({ id: 'trop-haut', sf: 'sfHaut', palier: 4, cercle: 1 }),
  ],
  savoirFaire: { sfHaut: { echeance: 1, palierServi: 2 } },
}), 1, { catalogue: CATALOGUE_VIDE });
verifier('une dette sans item au palier servi est écartée au motif « vivier »',
  detteSansItem.compteRendu.sacrifices.some((s) => s.quoi === 'sfHaut' && s.motif === 'vivier'));

// Tout motif est dans l'énuméré — c'est ce qui rend l'invariant 13 décidable
// plutôt que laissé à l'appréciation d'un lecteur.
verifier('tout motif de sacrifice appartient à l\'énuméré',
  [douzeDettes, dettesTropCheres, detteSansItem, sansPorteur, desactive, conflit]
    .flatMap((s) => s.compteRendu.sacrifices)
    .every((s) => MOTIFS_DE_SACRIFICE.includes(s.motif)));

// Le motif interdit, et le motif inconnu : le générateur ne les émet pas, mais
// le contrôle doit les attraper le jour où quelqu'un modifie la composition.
verifier('`controlerSeance` refuse une échéance reportée au profit d\'une bande',
  codes(controlerSeance({
    ...conflit,
    compteRendu: { ...conflit.compteRendu, sacrifices: [{ quoi: 'sfX', motif: 'bande' }] },
  })).includes('ECHEANCE_REPORTEE'));
verifier('`controlerSeance` refuse un motif hors énuméré',
  codes(controlerSeance({
    ...conflit,
    compteRendu: { ...conflit.compteRendu, sacrifices: [{ quoi: 'sfX', motif: 'pas-envie' }] },
  })).includes('MOTIF_HORS_ENUMERE'));
verifier('`controlerSeance` refuse une séance qui déborde',
  codes(controlerSeance({ ...conflit, cout: { ...conflit.cout, total: BUDGET_SEANCE + 1 } }))
    .includes('BUDGET_DEPASSE'));
verifier('`controlerSeance` refuse un rituel trop long',
  codes(controlerSeance({ ...conflit, cout: { ...conflit.cout, rituel: BUDGET_RITUEL_MAX + 1 } }))
    .includes('RITUEL_TROP_LONG'));

// ════════════════════════════════════════════════════════════════════════════
// ⑦ ÉPREUVE — le plancher, et la seule chose qui en fait une faute
// ════════════════════════════════════════════════════════════════════════════
//
// « Un plancher non tenu n'est un défaut que si le vivier permettait de le
// tenir. » Les deux cas ci-dessous ne diffèrent QUE par le nombre d'items
// disponibles non servis. Si le contrôle les traite pareil, il refuse des
// séances légitimes ou n'en refuse aucune — dans les deux cas il ne sert à rien.

const cinqSeances = (parCercle, dispos) => [...Array(TAILLE_FENETRE)].map(
  (_, k) => resume({ n: k + 1, parCercle, dispos }),
);

/** Les mêmes cinq séances, avec un TOTAL d'items disponibles non servis réparti
 *  sur la fenêtre. Les disponibles se somment comme les parts : un par séance,
 *  c'est cinq sur la fenêtre, et se tromper là-dessus, c'est écrire un test qui
 *  passe pour la mauvaise raison. */
const cinqSeancesOffrant = (parCercle, cercle, offre) => cinqSeances(parCercle, {}).map(
  (r, k) => (k === 0 ? { ...r, disponiblesNonServis: { ...r.disponiblesNonServis, [cercle]: offre } } : r),
);

// Cercle 2 à 10 % pour un plancher de 12 % : sur 50 items de fenêtre, il en
// manque exactement un.
const plancherManque = { 0: 2, 1: 6, 2: 1, 3: 1 };

verifier('plancher non tenu ALORS QUE le vivier l\'offrait : c\'est une faute',
  controlerFenetre(cinqSeancesOffrant(plancherManque, 2, 1)).anomalies
    .some((a) => a.code === 'PLANCHER_NON_TENU' && a.cercle === 2));

const fauteDeVivier = controlerFenetre(cinqSeancesOffrant(plancherManque, 2, 0));
verifier('plancher non tenu FAUTE D\'ITEMS : ce n\'est pas une faute',
  !codes(fauteDeVivier.anomalies).includes('PLANCHER_NON_TENU'));
verifier('… et la fenêtre reste mesurée (on ne refuse pas de mesurer)',
  fauteDeVivier.mesuree === true);

// Cercle 2 absent de la fenêtre : il en manque six. Le vivier en offrait cinq —
// c'est-à-dire pas assez, et le contrôle ne doit pas accuser pour autant.
const plancherVide = { 0: 2, 1: 6, 2: 0, 3: 2 };
verifier('un vivier qui n\'offrait pas assez n\'est pas une faute',
  !codes(controlerFenetre(cinqSeancesOffrant(plancherVide, 2, 5)).anomalies).includes('PLANCHER_NON_TENU'));
verifier('un vivier qui offrait tout juste assez, si (la frontière est à l\'item près)',
  controlerFenetre(cinqSeancesOffrant(plancherVide, 2, 6)).anomalies
    .some((a) => a.code === 'PLANCHER_NON_TENU' && a.cercle === 2));

// Le plafond, lui, ne se négocie pas avec le vivier : il lie toujours.
const troisSature = { 0: 2, 1: 5, 2: 0, 3: 3 };
verifier('un plafond dépassé est refusé quel que soit le vivier',
  controlerFenetre(cinqSeances(troisSature, {})).anomalies
    .some((a) => a.code === 'PLAFOND_DEPASSE' && a.cercle === 3));
verifier('le cercle 3 est plafonné, et le message le dit',
  controlerFenetre(cinqSeances(troisSature, {})).anomalies
    .some((a) => a.cercle === 3 && /plafonné, pas encouragé/.test(a.message)));

// La somme des quatre parts : le seul symptôme observable de l'item sans cercle.
verifier('un item sans cercle fait refuser la fenêtre',
  codes(controlerFenetre(cinqSeances({ 0: 2, 1: 5, 2: 1, 3: 1 }, {})
    .map((r) => ({ ...r, sansCercle: 1, total: r.total + 1 }))).anomalies)
    .includes('SOMME_DES_PARTS'));

// Les deux refus qui se lisent séance par séance mais qu'on relit sur la
// trajectoire, parce qu'une trajectoire est le seul endroit d'où l'on regarde.
verifier('une séance qui déborde est refusée sur la fenêtre aussi',
  codes(controlerFenetre([
    ...cinqSeances(plancherManque, { 2: 0 }).slice(1),
    resume({ n: 5, parCercle: plancherManque, cout: BUDGET_SEANCE + 10 }),
  ]).anomalies).includes('BUDGET_DEPASSE'));
verifier('une échéance reportée au profit d\'une bande est refusée sur la fenêtre aussi',
  codes(controlerFenetre([
    ...cinqSeances(plancherManque, { 2: 0 }).slice(1),
    resume({ n: 5, parCercle: plancherManque, sacrifices: [{ quoi: 'sfX', motif: 'bande' }] }),
  ]).anomalies).includes('ECHEANCE_REPORTEE'));

// ── Ce que le moteur déclare avoir eu sous la main ──────────────────────────
//
// `disponiblesNonServis` est la donnée qui décide si un plancher non tenu est
// une faute. Elle comptait des items que le moteur ne pouvait PAS servir —
// ceux d'un palier supérieur à celui que l'élève a atteint. Le moteur
// s'accusait donc lui-même d'une pauvreté du vivier : le contrôle de la fenêtre
// rendait PLANCHER_NON_TENU « c'est une faute de moteur » sur une séance
// parfaitement légitime.
const horsDePortee = genererSeance(etatDe({
  numeroSeance: 2,
  vivier: [
    ...[0, 1].flatMap((c) => [...Array(6)].map((_, k) => item({
      id: `a-${c}-${k}`, cercle: c, sf: 'sfA', palier: 1,
    }))),
    ...[...Array(5)].map((_, k) => item({ id: `p4-${k}`, cercle: 2, sf: 'sfA', palier: 4 })),
  ],
  savoirFaire: { sfA: { echeance: 1, palierServi: 1 } },
}), 5, { catalogue: CATALOGUE_VIDE });

verifier('le cœur ne sert pas un item au-dessus du palier atteint',
  horsDePortee.coeur.every((i) => i.palier <= 1));
verifier('un item hors de portée n\'est pas compté parmi ce que le vivier offrait',
  horsDePortee.disponiblesNonServis[2] === 0);
verifier('… donc l\'écart de plancher se déclare non imputable au moteur',
  horsDePortee.compteRendu.bandes.ecarts
    .filter((e) => e.cercle === 2 && e.sens === 'plancher')
    .every((e) => e.vivierPermettait === false));

// ════════════════════════════════════════════════════════════════════════════
// ⑧ ÉPREUVE — la fenêtre glissante de cinq séances
// ════════════════════════════════════════════════════════════════════════════
//
// « Une séance porte 8 à 12 items courts : à cette échelle, un item de plus ou
// de moins déplace une part de dix points et une bande de dix points de large
// n'a aucun sens. » Deux erreurs symétriques sont possibles, et il faut les
// exclure toutes les deux : mordre trop tôt (refuser une séance conforme), et
// ne jamais mordre (laisser passer une dérive).

const horsBande = { 0: 0, 1: 0, 2: 0, 3: 10 }; // 100 % de cercle 3
const conforme = { 0: 2, 1: 6, 2: 2, 3: 0 };

for (let n = 1; n < TAILLE_FENETRE; n += 1) {
  const partielle = controlerFenetre([...Array(n)].map((_, k) => resume({ n: k + 1, parCercle: horsBande })));
  verifier(`${n} séance(s) toutes hors bande : rien ne se déclenche encore`,
    partielle.mesuree === false && partielle.anomalies.length === 0);
}

// La cinquième séance : la mesure mord. Une séance ISOLÉE hors bande, absorbée
// par quatre séances conformes, ne déclenche rien — c'est précisément ce que la
// fenêtre existe pour permettre.
const isolee = controlerFenetre([
  ...[...Array(4)].map((_, k) => resume({ n: k + 1, parCercle: conforme })),
  resume({ n: 5, parCercle: horsBande }),
]);
verifier('à la cinquième séance, la fenêtre est mesurée', isolee.mesuree === true);
verifier('une séance isolée hors bande est absorbée par la fenêtre',
  isolee.anomalies.length === 0);

// Une dérive SOUTENUE, elle, se voit — même si aucune séance prise isolément
// n'est aussi caricaturale que celle du cas précédent.
const derive = controlerFenetre(cinqSeances({ 0: 2, 1: 5, 2: 0, 3: 3 }, {}));
verifier('une dérive soutenue déclenche le refus',
  derive.anomalies.some((a) => a.code === 'PLAFOND_DEPASSE' && a.cercle === 3));

// Et la fenêtre GLISSE : cinq séances conformes après la dérive et l'anomalie
// disparaît. Une mesure qui n'oublie pas est une mesure qui accuse pour l'année.
verifier('la fenêtre glisse : la dérive sort de la mesure quand elle est passée',
  controlerFenetre([
    ...cinqSeances({ 0: 2, 1: 5, 2: 0, 3: 3 }, {}),
    ...[...Array(5)].map((_, k) => resume({ n: k + 6, parCercle: conforme })),
  ]).anomalies.length === 0);
verifier('une fenêtre de plus de cinq séances n\'en mesure que cinq',
  controlerFenetre([...Array(12)].map((_, k) => resume({ n: k + 1, parCercle: conforme }))).seances
  === TAILLE_FENETRE);

// La même chose vue du générateur : `mesuree` ne devient vrai qu'à la cinquième.
for (let n = 1; n <= TAILLE_FENETRE; n += 1) {
  const s = genererSeance(etatDe({
    numeroSeance: n,
    fenetre: [...Array(n - 1)].map((_, k) => resume({ n: k + 1, parCercle: conforme })),
  }), n, { catalogue: CATALOGUE_VIDE });
  verifier(`séance ${n} : la mesure des bandes ${n < TAILLE_FENETRE ? 'ne mord pas encore' : 'mord'}`,
    s.compteRendu.bandes.mesuree === (n >= TAILLE_FENETRE));
}

// ════════════════════════════════════════════════════════════════════════════
// ⑨ Bout en bout — dix séances, et l'invariant 13 sur la trajectoire
// ════════════════════════════════════════════════════════════════════════════
//
// C'est le seul bloc qui ressemble à un usage. Il n'existe pas pour vérifier
// que « ça marche » : il existe parce que les bandes se mesurent sur cinq
// séances et qu'aucun tirage isolé ne peut donc les mettre en défaut.

const vivierAnnuel = [
  ...CERCLES.flatMap((c) => [...Array(10)].map((_, k) => item({
    id: `A-${c}-${k}`, cercle: c, sf: `sf${c}`, ch: 'chB',
  }))),
  ...[0, 1, 2].map((k) => item({ id: `AR-${k}`, ch: 'chA', rituel: true, sf: 'sfR', type: 'lecture' })),
  ...porteurs('p1', 'chA', 3),
];

let fenetre = [];
let coeurTropCourt = 0;
let anomaliesTrajectoire = [];
for (let n = 1; n <= 12; n += 1) {
  const s = genererSeance(etatDe({
    numeroSeance: n,
    vivier: vivierAnnuel,
    fenetre,
    pieges: { p1: { echeance: n, rencontres: 2 } },
  }), n * 17, { catalogue: CAT_P1 });
  anomaliesTrajectoire = [...anomaliesTrajectoire, ...controlerSeance(s)];
  if (s.coeur.length < COEUR_MIN) coeurTropCourt += 1;
  fenetre = [...fenetre, resumerSeance(s)];
  anomaliesTrajectoire = [...anomaliesTrajectoire, ...controlerFenetre(fenetre).anomalies];
}

verifier('douze séances sur un vivier riche : aucune anomalie',
  anomaliesTrajectoire.length === 0);
verifier(`le cœur atteint son plancher de ${COEUR_MIN} items à chaque séance`,
  coeurTropCourt === 0);
verifier('la fenêtre finit mesurée', controlerFenetre(fenetre).mesuree === true);

// Le profil « pas encore partout » du site (S) : c'est lui qui vide les viviers.
// La séance doit exister quand même, et dire ce qu'elle n'a pas pu faire.
const pasEncore = genererSeance(etatDe({
  numeroSeance: 6,
  chapitresFaits: [],
  vivier: vivierAnnuel,
  pieges: { p1: { echeance: 1, rencontres: 2 } },
}), 3, { catalogue: CAT_P1 });
verifier('« pas encore » partout : la séance existe quand même', pasEncore.refus === null);
verifier('… le cœur du chapitre en cours reste servi (le chapitre reste accessible)',
  pasEncore.coeur.length > 0);
verifier('… le rituel, lui, se tait et le dit',
  pasEncore.rituel.length === 0
  && codes(pasEncore.compteRendu.reserves).includes('RITUEL_TROP_COURT'));
verifier('… et la re-confrontation impossible est journalisée, pas oubliée',
  pasEncore.reconfrontation === null
  && pasEncore.compteRendu.sacrifices.some((s) => s.quoi === 'p1'));

// ════════════════════════════════════════════════════════════════════════════
// ⑩ Le hasard adverse — trois cents états bien formés, aucun ne doit céder
// ════════════════════════════════════════════════════════════════════════════
//
// Les blocs précédents testent des cas choisis ; celui-ci teste ceux auxquels
// personne n'a pensé. La graine est fixe : un échec ici se rejoue.

let alea = 20260812;
const suivant = () => {
  alea = (alea * 1103515245 + 12345) % 2147483648;
  return alea / 2147483648;
};
const entre = (a, b) => a + Math.floor(suivant() * (b - a + 1));
const TYPES = Object.keys(COUTS);

const fautes = [];
for (let essai = 0; essai < 300; essai += 1) {
  const taille = entre(1, 25);
  const vivier = [...Array(taille)].map((_, k) => item({
    id: `f-${essai}-${k}`,
    cercle: entre(0, 3),
    palier: entre(1, 4),
    type: TYPES[entre(0, TYPES.length - 1)],
    sf: `sf${entre(0, 3)}`,
    ch: suivant() < 0.7 ? 'chB' : 'chA',
    piege: suivant() < 0.3 ? 'p1' : null,
    rituel: suivant() < 0.2,
    ctx: `ctx-${entre(0, 2)}`,
  }));
  const etat = etatDe({
    numeroSeance: entre(1, 60),
    vivier,
    chapitresFaits: suivant() < 0.5 ? ['chA', 'chB'] : ['chB'],
    savoirFaire: Object.fromEntries([0, 1, 2, 3].map((c) => [`sf${c}`, {
      echeance: entre(1, 60), palierServi: entre(1, 4), rencontres: entre(0, 5),
    }])),
    pieges: { p1: { echeance: entre(1, 60), rencontres: entre(0, 3), derniersContextes: ['ctx-0'] } },
    fenetre: [...Array(entre(0, 7))].map((_, k) => resume({
      n: k + 1, parCercle: { 0: entre(0, 4), 1: entre(0, 6), 2: entre(0, 4), 3: entre(0, 4) },
      dispos: { 0: entre(0, 3), 1: entre(0, 3), 2: entre(0, 3), 3: entre(0, 3) },
    })),
  });

  let s;
  try { s = genererSeance(etat, essai, { catalogue: CAT_P1 }); } catch (e) {
    fautes.push(`essai ${essai} : a levé ${e.message}`);
    continue;
  }
  if (s.refus) { fautes.push(`essai ${essai} : état bien formé refusé (${s.refus.manques[0]})`); continue; }

  const ids = s.items.map((i) => i.id);
  if (new Set(ids).size !== ids.length) fautes.push(`essai ${essai} : un item servi deux fois`);
  if (s.cout.total > BUDGET_SEANCE) fautes.push(`essai ${essai} : ${s.cout.total} dixièmes`);
  if (s.cout.rituel > BUDGET_RITUEL_MAX) fautes.push(`essai ${essai} : rituel ${s.cout.rituel}`);
  if (s.coeur.length > COEUR_MAX && !codes(s.compteRendu.reserves).includes('COEUR_SURCHARGE')) {
    fautes.push(`essai ${essai} : ${s.coeur.length} items de cœur sans le dire`);
  }
  if (s.cout.total !== coutDe(s.items)) fautes.push(`essai ${essai} : coût annoncé faux`);
  for (const sacrifice of s.compteRendu.sacrifices) {
    if (!MOTIFS_DE_SACRIFICE.includes(sacrifice.motif)) {
      fautes.push(`essai ${essai} : motif « ${sacrifice.motif} » hors énuméré`);
    }
  }
  const anomalies = controlerSeance(s);
  if (anomalies.length) fautes.push(`essai ${essai} : ${anomalies.map((a) => a.code).join(', ')}`);
  const rejoue = genererSeance(etat, essai, { catalogue: CAT_P1 });
  if (JSON.stringify(rejoue) !== JSON.stringify(s)) fautes.push(`essai ${essai} : non reproductible`);
}

verifier(`trois cents états bien formés composent sans faute${fautes.length ? ` — ${fautes[0]}` : ''}`,
  fautes.length === 0);

// ════════════════════════════════════════════════════════════════════════════
// Les réserves
// ════════════════════════════════════════════════════════════════════════════

reserve(
  'l\'invariant 14 « moins de quatre re-confrontations d\'un rang 1 sur une année simulée » n\'est\n'
  + '      pas atteignable ici : ce module LIT les échéances, il ne les FIXE pas. Le test appartient à\n'
  + '      `tools/simuler-parcours.mjs`, quand le SRS des pièges et lui existeront.',
);
reserve(
  'l\'invariant 13 porte sur « les séances effectivement générées » avec le vivier réel. Les items\n'
  + '      ne sont pas écrits : tous les viviers d\'ici sont artificiels. Ce qui est testé est le\n'
  + '      comportement du moteur, jamais la tenabilité des bandes sur le corpus — c\'est le profil\n'
  + '      simulé qui la décidera, pas le corpus, et pas ce fichier.',
);
reserve(
  'le générateur n\'émet jamais le motif « bande » : les deux tests qui l\'attrapent passent par une\n'
  + '      séance fabriquée à la main. Ils gardent le refus vivant pour le jour où quelqu\'un modifie\n'
  + '      la composition — ils ne prouvent pas que la composition d\'aujourd\'hui pourrait l\'émettre.',
);

// ════════════════════════════════════════════════════════════════════════════
// Rapport
// ════════════════════════════════════════════════════════════════════════════

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
