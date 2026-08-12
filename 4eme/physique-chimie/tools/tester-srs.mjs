// Tests adverses du moteur de réfutation espacée, hors navigateur.
//
//     node tools/tester-srs.mjs
//
// ── Ce que ce fichier cherche à casser ──────────────────────────────────────
//
// `js/srs.js` existe pour interdire UNE faute : traiter la réussite immédiate
// comme une preuve d'extinction, et retirer de la file le piège que la charte
// déclare non négociable. Un fichier de tests qui se contenterait de vérifier
// que `apresReponsePiege` incrémente ses compteurs ne prouverait rien de cela :
// le défaut du moteur de mathématiques n'est visible sur aucune transition
// isolée. Il est visible sur une TRAJECTOIRE — trois réussites, deux séances, et
// le piège a disparu pour toujours.
//
// D'où la forme de ce fichier : les transitions unitaires d'abord, parce qu'un
// bug d'arithmétique rendrait la simulation illisible, puis l'épreuve décisive,
// qui est une SIMULATION D'ANNÉE. C'est le site (S) de `charte.md`, et
// l'invariant 14 le nomme : « en session simulée, refuse un intervalle de rang 1
// dépassant 20 séances ; un piège de rang 1 sorti de la file avant la fin de
// l'année ; moins de quatre re-confrontations d'un piège de rang 1 sur une année
// simulée ; un piège de rang 1 dont la re-confrontation disparaît quand l'élève
// répond "pas encore" à tous les chapitres frontière. »
//
// ── Comment l'année est modélisée, et pourquoi comme ça ─────────────────────
//
// Une année d'usage régulier, dit la charte, c'est 100 à 140 séances — trois par
// semaine sur trente semaines. On simule le cas le plus SERRÉ : 100 séances, un
// seul créneau de re-confrontation par séance (le créneau 3 du plan de séance),
// et les 31 pièges du catalogue réel en concurrence pour ce créneau unique. Rien
// n'est inventé : les rythmes, les rangs, les chapitres d'origine et les
// dispositifs sont lus dans `js/data/pieges/`.
//
// La progression occupe les soixante premières séances — dix chapitres, six
// séances chacun, soit deux semaines par chapitre à trois séances par semaine —
// et les quarante dernières sont la période de consolidation, sans chapitre en
// cours. Ce découpage n'est pas un réglage confortable, il est la seule lecture
// du budget de la charte qui ait un sens : « cinq re-confrontations par an pour
// un rang 1 » suppose que le piège est dans la file la plus grande partie de
// l'année. Un piège introduit à la séance 91 ne peut pas être re-confronté
// quatre fois avant la 100, et ce serait un fait de progression, pas un défaut
// de moteur. Une variante « année tassée », où les dix chapitres s'étalent sur
// les cent séances, est simulée en plus : elle n'exige les quatre
// re-confrontations que des pièges déjà entrés dans la file à mi-année, et exige
// de TOUS les autres qu'ils ne soient jamais sortis de la file.
//
// Les profils sont ceux que la charte déclare, et le premier est le plus
// important : l'élève qui réussit tout est celui sur lequel le moteur de
// mathématiques échoue. Le tirage est un générateur congruentiel à graine fixe —
// aucun `Math.random` ici, un test qui échoue une fois sur cinq n'est pas lu.
//
// ── Les entrées malformées ─────────────────────────────────────────────────
//
// La règle de lecture est la même partout : sur une entrée malformée, le module
// doit rendre un VERDICT. Une levée est un verdict — bruyante, datée, elle arrête
// le chargement du profil. Ce qui est refusé ici, c'est la troisième issue : une
// valeur plausible. Une échéance `NaN`, une file vide, un `maitrise: true` — trois
// valeurs qu'aucun écran ne distingue d'un fonctionnement normal, et qui font
// disparaître le mécanisme en silence. C'est le mode de panne que tout ce
// fichier surveille, parce que c'est celui qu'un élève ne peut pas signaler.

import * as srs from '../js/srs.js';
import {
  ISSUES,
  NIVEAU_MAX,
  PLAFOND_INTERVALLE,
  apresReponsePiege,
  apresReponseSavoirFaire,
  chapitresPourReconfrontation,
  controlerPiegeSrs,
  dispositifSuivant,
  dispositifsDeReconfrontation,
  estARevoirPiege,
  estARevoirSavoirFaire,
  estMaitrise,
  etatInitialPiege,
  etatInitialSavoirFaire,
  fileDeReconfrontation,
  issueDuDoubleQcm,
  programmerPiege,
} from '../js/srs.js';
import { PIEGES } from '../js/data/pieges/index.js';

let passes = 0;
const echecs = [];
const reserves = [];

const verifier = (nom, condition) => {
  if (condition) passes += 1;
  else echecs.push(nom);
};

const reserve = (texte) => reserves.push(texte);

/**
 * Le contrôle des entrées malformées, dans la seule forme qui ait un sens ici.
 *
 * `plausible` décrit ce qu'il serait GRAVE de recevoir : un état d'apparence
 * normale, une liste vide, un verdict positif. Une levée passe — elle ne se
 * confond avec rien. Une valeur non plausible passe aussi, à condition d'être un
 * refus explicite. Ce qui échoue, c'est exactement le silence.
 */
const refuseLeSilence = (nom, action, plausible) => {
  let resultat;
  try {
    resultat = action();
  } catch {
    passes += 1;
    return;
  }
  verifier(nom, !plausible(resultat));
};

// ════════════════════════════════════════════════════════════════════════════
// Un piège de laboratoire, pour tenir les transitions à la main
// ════════════════════════════════════════════════════════════════════════════

const PIEGE_R1 = Object.freeze({
  id: 'labo-rang-1',
  rang: 1,
  rythmeInitial: 3,
  chapitreOrigine: 'ch01',
  constats: [
    { id: 'c-a', contexteDeSurface: 'ctx-a' },
    { id: 'c-b', contexteDeSurface: 'ctx-b' },
  ],
  contreModele: { executions: [{ id: 'x-a', contexteDeSurface: 'ctx-c' }] },
});

const PIEGE_R2 = Object.freeze({
  id: 'labo-rang-2', rang: 2, rythmeInitial: 3, chapitreOrigine: 'ch02', iatrogene: 'sf-x',
});

const PIEGE_R3 = Object.freeze({
  id: 'labo-rang-3', rang: 3, rythmeInitial: 3, chapitreOrigine: 'ch03',
});

const suite = (piege, etat, evenements) =>
  evenements.reduce((e, ev) => apresReponsePiege(e, piege, ev), etat);

// ════════════════════════════════════════════════════════════════════════════
// Le plafond, et ce qu'il tient à lui seul
// ════════════════════════════════════════════════════════════════════════════

verifier('le plafond du rang 1 est celui de la charte : 20 séances', PLAFOND_INTERVALLE[1] === 20);
verifier('le rang 3 n\'a pas de plafond, il s\'éloigne de lui-même', PLAFOND_INTERVALLE[3] === Infinity);

{
  // Cinquante réussites d'affilée : c'est le cas que le plafond existe pour
  // borner, et le seul moyen de vérifier qu'aucune branche ne le contourne.
  let etat = programmerPiege(etatInitialPiege(PIEGE_R1), PIEGE_R1, 1);
  let seance = 4;
  let maxIntervalle = etat.intervalle;
  let maxEcart = 0;
  for (let i = 0; i < 50; i += 1) {
    etat = apresReponsePiege(etat, PIEGE_R1, { issue: 'reussite', numeroSeance: seance, palier: 1 });
    maxIntervalle = Math.max(maxIntervalle, etat.intervalle);
    maxEcart = Math.max(maxEcart, etat.revoirALaSeance - seance);
    seance = etat.revoirALaSeance;
  }
  verifier(`50 réussites ne portent pas l'intervalle d'un rang 1 au-delà de 20 (max ${maxIntervalle})`,
    maxIntervalle <= 20);
  verifier(`et l'échéance ne s'éloigne jamais de plus de 20 séances (max ${maxEcart})`, maxEcart <= 20);
  verifier('l\'échéance reste un entier fini après 50 réussites', Number.isInteger(etat.revoirALaSeance));

  // Le retour au rythme initial : pas la moitié, pas un cran — le départ.
  const rechute = apresReponsePiege(etat, PIEGE_R1, { issue: 'echec', numeroSeance: 200, palier: 3 });
  verifier('un échec ramène au rythme initial, tout le crédit accumulé étant perdu',
    rechute.intervalle === PIEGE_R1.rythmeInitial && rechute.revoirALaSeance === 203);
}

{
  // Le rang 2 a son propre plafond, et le rang 3 n'en a pas : la différence doit
  // se voir sur une trajectoire, pas seulement dans la table.
  let r2 = programmerPiege(etatInitialPiege(PIEGE_R2), PIEGE_R2, 1);
  let r3 = programmerPiege(etatInitialPiege(PIEGE_R3), PIEGE_R3, 1);
  for (let i = 0; i < 12; i += 1) {
    r2 = apresReponsePiege(r2, PIEGE_R2, { issue: 'reussite', numeroSeance: r2.revoirALaSeance });
    r3 = apresReponsePiege(r3, PIEGE_R3, { issue: 'reussite', numeroSeance: r3.revoirALaSeance });
  }
  verifier('le rang 2 plafonne à 33', r2.intervalle === 33);
  verifier('le rang 3 dépasse l\'année sans qu\'on l\'ait déclaré éteint', r3.intervalle > 140);
  verifier('… et il revient dès qu\'une seule erreur le rappelle',
    apresReponsePiege(r3, PIEGE_R3, { issue: 'echec', numeroSeance: 90 }).intervalle === 3);
}

// ════════════════════════════════════════════════════════════════════════════
// L'absence d'état absorbant — le test qui échouerait sur le moteur de maths
// ════════════════════════════════════════════════════════════════════════════
//
// `4eme/maths/js/srs.js` déclare acquis ce qui remplit trois conditions :
// trois réussites consécutives, dans deux séances distinctes, et
// `palierMax >= palierRate` — vraie par défaut, 0 >= 0, tant que l'élève n'a
// jamais échoué à un palier élevé. Puis `fileDeRemediation` filtre sur
// `!estAcquis`. On reproduit ici cet état EXACT, au palier le plus facile, et on
// exige que la file continue de rendre le piège.

{
  let etat = programmerPiege(etatInitialPiege(PIEGE_R1), PIEGE_R1, 1);
  etat = suite(PIEGE_R1, etat, [
    { issue: 'reussite', numeroSeance: 4, palier: 1 },
    { issue: 'reussite', numeroSeance: 4, palier: 1 },
    { issue: 'reussite', numeroSeance: 5, palier: 1 },
  ]);

  verifier('l\'état de maths « acquis » est bien atteint (3 réussites, 2 séances, palier 1)',
    etat.reussitesConsecutives >= 3 && etat.seancesReussies.length >= 2 && etat.palierMax >= etat.palierRate);
  verifier('… et le piège est TOUJOURS rendu par la file à son échéance',
    fileDeReconfrontation([{ piege: PIEGE_R1, etat }], etat.revoirALaSeance).length === 1);
  verifier('… son échéance existe encore, elle n\'est pas passée à null',
    Number.isInteger(etat.revoirALaSeance));

  // La négative, qui vaut autant : rien dans le module ne permet de déclarer un
  // piège acquis. Une fonction ajoutée plus tard rouvrirait l'état absorbant par
  // la porte de service.
  const exportsDacquisition = Object.keys(srs).filter((n) => /acquis/i.test(n) && /piege/i.test(n));
  verifier('aucune fonction d\'acquisition de piège n\'est exportée',
    exportsDacquisition.length === 0);
  verifier('l\'état d\'un piège ne porte aucun drapeau d\'acquisition',
    !Object.keys(etat).some((c) => /acquis|eteint|termine|sorti/i.test(c)));

  // Cent réussites, et il est toujours là. C'est la formulation la plus courte
  // de la règle 3 de la charte : « il n'en sort pas ».
  let cent = etat;
  for (let i = 0; i < 100; i += 1) {
    cent = apresReponsePiege(cent, PIEGE_R1, { issue: 'reussite', numeroSeance: cent.revoirALaSeance, palier: 4 });
  }
  verifier('après cent réussites au palier 4, le rang 1 est encore dans la file',
    fileDeReconfrontation([{ piege: PIEGE_R1, etat: cent }], cent.revoirALaSeance).length === 1);
}

// ════════════════════════════════════════════════════════════════════════════
// Le quatrième verdict et le double QCM
// ════════════════════════════════════════════════════════════════════════════

verifier('juste/juste est une réussite', issueDuDoubleQcm(true, true) === 'reussite');
verifier('juste/faux n\'est pas une réussite pleine', issueDuDoubleQcm(true, false) === 'reussite-sans-justification');
verifier('faux/juste est un échec ordinaire sur la valeur', issueDuDoubleQcm(false, true) === 'echec');
verifier('faux/faux est un échec', issueDuDoubleQcm(false, false) === 'echec');

{
  const depart = programmerPiege(etatInitialPiege(PIEGE_R1), PIEGE_R1, 1);
  const apresEchec = apresReponsePiege(depart, PIEGE_R1, { issue: 'echec', numeroSeance: 4, palier: 3 });
  const jf = apresReponsePiege(apresEchec, PIEGE_R1, { issue: 'reussite-sans-justification', numeroSeance: 7, palier: 3 });

  verifier('un juste/faux ne compte pas comme une réussite', jf.reussites === apresEchec.reussites);
  verifier('un juste/faux ne compte pas comme un échec non plus', jf.echecs === apresEchec.echecs);
  verifier('un juste/faux n\'incrémente pas les échecs consécutifs',
    jf.echecsConsecutifs === apresEchec.echecsConsecutifs);
  verifier('un juste/faux ne relève pas palierRate', jf.palierRate === apresEchec.palierRate);
  verifier('un juste/faux ne fait pas redescendre le palier servi', jf.palierServi === apresEchec.palierServi);
  verifier('un juste/faux interrompt la série de réussites', jf.reussitesConsecutives === 0);
  verifier('un juste/faux reprogramme le piège au rythme initial', jf.intervalle === PIEGE_R1.rythmeInitial);
  verifier('un juste/faux exige un autre format LA FOIS SUIVANTE', jf.formatDifferentExige === true);
  verifier('… et toute autre réponse lève la contrainte',
    apresReponsePiege(jf, PIEGE_R1, { issue: 'reussite', numeroSeance: 10 }).formatDifferentExige === false);

  // Deux échecs de suite font redescendre d'un cran, et dans un décor neuf.
  const deuxEchecs = apresReponsePiege(apresEchec, PIEGE_R1, { issue: 'echec', numeroSeance: 7, palier: 3 });
  verifier('deux échecs consécutifs font redescendre d\'un palier', deuxEchecs.palierServi === 2);
  verifier('… et exigent un contexte neuf', deuxEchecs.contexteNeufExige === true);
  verifier('un seul échec ne fait pas redescendre', apresEchec.palierServi === 1);
}

{
  // L'unité non reconnue : ni juste ni fausse, elle ne consomme rien. L'égalité
  // par référence est la seule vérification qui ne laisse aucun champ s'échapper.
  const etat = programmerPiege(etatInitialPiege(PIEGE_R1), PIEGE_R1, 1);
  const apres = apresReponsePiege(etat, PIEGE_R1, { issue: 'unite-non-reconnue', numeroSeance: 4, palier: 2 });
  verifier('une unité non reconnue rend l\'état À L\'IDENTIQUE (invariant 9)', apres === etat);

  const sf = etatInitialSavoirFaire();
  verifier('… et pour un savoir-faire aussi',
    apresReponseSavoirFaire(sf, { issue: 'unite-non-reconnue', numeroSeance: 4 }) === sf);
}

// ════════════════════════════════════════════════════════════════════════════
// La variation des dispositifs
// ════════════════════════════════════════════════════════════════════════════

{
  // La règle : jamais deux fois le même TANT QU'IL EN RESTE UN NON SERVI. On la
  // vérifie sur six re-confrontations d'affilée, soit deux cycles complets du
  // piège de laboratoire (trois dispositifs).
  let etat = programmerPiege(etatInitialPiege(PIEGE_R1), PIEGE_R1, 1);
  const servis = [];
  for (let i = 0; i < 6; i += 1) {
    const choix = dispositifSuivant(PIEGE_R1, etat);
    servis.push(choix.dispositif.id);
    etat = apresReponsePiege(etat, PIEGE_R1, {
      issue: 'reussite', numeroSeance: etat.revoirALaSeance, dispositifServi: choix.dispositif.id,
    });
  }
  verifier(`les trois dispositifs passent avant qu'aucun ne repasse (${servis.join(' → ')})`,
    new Set(servis.slice(0, 3)).size === 3 && new Set(servis.slice(3, 6)).size === 3);

  verifier('un piège sans dispositif rend un verdict explicite, pas un dispositif inventé',
    dispositifSuivant(PIEGE_R2, etatInitialPiege(PIEGE_R2)).code === 'AUCUN_DISPOSITIF');

  const monoContexte = {
    ...PIEGE_R1, contreModele: undefined,
    constats: [{ id: 'a', contexteDeSurface: 'meme' }, { id: 'b', contexteDeSurface: 'meme' }],
  };
  verifier('deux constats du même contexte de surface ne varient rien, et le moteur le dit',
    dispositifSuivant(monoContexte, etatInitialPiege(monoContexte)).variationImpossible === true);
  verifier('… et le contrôle au build le refuse',
    controlerPiegeSrs(monoContexte).some((a) => a.code === 'VARIATION_INSUFFISANTE'));

  // Le contre-modèle de forme { enonce, predire, verdict } n'a pas d'identifiant :
  // le compter gonflerait un vivier que le moteur ne saurait pas ne pas resservir.
  const sansId = { ...PIEGE_R1, constats: [{ contexteDeSurface: 'ctx' }], contreModele: { executions: [{}] } };
  verifier('un dispositif sans identifiant n\'entre pas dans le vivier',
    dispositifsDeReconfrontation(sansId).length === 0);
}

{
  // Un identifiant de dispositif étranger au piège — une faute de contenu, ou un
  // état recopié d'un autre piège. S'il est enregistré tel quel, il compte dans
  // la longueur du cycle : le cycle se referme trop tôt, un constat est resservi
  // alors qu'un autre n'a jamais été vu, et c'est exactement ce que la charte
  // interdit. Le module doit rendre un verdict, pas absorber l'inconnu.
  const etat = programmerPiege(etatInitialPiege(PIEGE_R1), PIEGE_R1, 1);
  refuseLeSilence(
    'un dispositif étranger au piège n\'est pas absorbé en silence dans le cycle',
    () => apresReponsePiege(etat, PIEGE_R1, {
      issue: 'reussite', numeroSeance: 4, dispositifServi: 'venu-d-un-autre-piege',
    }),
    (r) => r.dispositifsServis.includes('venu-d-un-autre-piege'),
  );
}

// ════════════════════════════════════════════════════════════════════════════
// La file — l'ordre, et ce qu'elle ne filtre pas
// ════════════════════════════════════════════════════════════════════════════

{
  const dus = [PIEGE_R1, PIEGE_R2, PIEGE_R3].map((piege) => ({
    piege,
    etat: apresReponsePiege(
      programmerPiege(etatInitialPiege(piege), piege, 1), piege,
      { issue: 'echec', numeroSeance: 2 },
    ),
  }));

  const file = fileDeReconfrontation(dus, 40);
  verifier('la file rend le rang 1 avant le rang 2, et le rang 2 avant le rang 3',
    file.map((e) => e.piege.rang).join('') === '123');

  verifier('un piège jamais rencontré n\'est pas dans la file (la progression commande)',
    fileDeReconfrontation([{ piege: PIEGE_R1, etat: etatInitialPiege(PIEGE_R1) }], 999).length === 0);

  verifier('la re-confrontation ne se prend pas dans le chapitre en cours',
    fileDeReconfrontation(dus, 40, { chapitreEnCours: 'ch01' }).every((e) => e.piege.chapitreOrigine !== 'ch01'));

  // Le tri doit être total : deux pièges à égalité de rang, d'échecs et
  // d'échéance ne peuvent pas s'échanger leur place d'une séance à l'autre,
  // sinon `genererSeance` cesse d'être déterministe à graine fixée.
  const jumeaux = ['b', 'a', 'c'].map((n) => {
    const piege = { ...PIEGE_R1, id: `jumeau-${n}` };
    return { piege, etat: apresReponsePiege(programmerPiege(etatInitialPiege(piege), piege, 1), piege, { issue: 'echec', numeroSeance: 2 }) };
  });
  const ordre = fileDeReconfrontation(jumeaux, 40).map((e) => e.piege.id).join(',');
  const ordreInverse = fileDeReconfrontation([...jumeaux].reverse(), 40).map((e) => e.piege.id).join(',');
  verifier(`l'ordre ne dépend pas de l'ordre d'entrée (${ordre})`, ordre === ordreInverse);

  // À retard égal, le plus fragile passe pendant que l'attention est intacte.
  const fragile = { ...PIEGE_R1, id: 'fragile' };
  const solide = { ...PIEGE_R1, id: 'solide' };
  let etatFragile = programmerPiege(etatInitialPiege(fragile), fragile, 1);
  for (const s of [4, 7]) etatFragile = apresReponsePiege(etatFragile, fragile, { issue: 'echec', numeroSeance: s });
  etatFragile = apresReponsePiege(etatFragile, fragile, { issue: 'echec', numeroSeance: 10 });
  const etatSolide = apresReponsePiege(programmerPiege(etatInitialPiege(solide), solide, 1), solide, { issue: 'echec', numeroSeance: 10 });
  verifier('à rang et à retard égaux, le piège le plus souvent raté passe en premier',
    fileDeReconfrontation([{ piege: solide, etat: etatSolide }, { piege: fragile, etat: etatFragile }], 40)[0].piege.id === 'fragile');

  // Et la famine, qui est l'autre moitié de la même règle. Le créneau de
  // re-confrontation est unique par séance : si les échecs primaient sur le
  // retard, le piège jamais servi — donc sans aucun échec — resterait derrière
  // ceux qui en ont, sans aucun moyen de remonter. C'est la boucle que le tri
  // doit être incapable de fermer, et une année entière d'un élève qui échoue
  // ne suffit pas à la voir sur une seule séance : elle se voit ici.
  const oublie = { ...PIEGE_R1, id: 'oublie' };
  const etatOublie = programmerPiege(etatInitialPiege(oublie), oublie, 1); // dû depuis la séance 4
  let etatBruyant = programmerPiege(etatInitialPiege({ ...PIEGE_R1, id: 'bruyant' }), PIEGE_R1, 1);
  for (const s of [4, 7, 10, 13, 16, 19]) {
    etatBruyant = apresReponsePiege(etatBruyant, PIEGE_R1, { issue: 'echec', numeroSeance: s });
  }
  verifier('un piège dû depuis longtemps et jamais raté passe avant un piège tout juste dû et souvent raté',
    fileDeReconfrontation([
      { piege: { ...PIEGE_R1, id: 'bruyant' }, etat: etatBruyant },
      { piege: oublie, etat: etatOublie },
    ], 22)[0].piege.id === 'oublie');

  // La famine, mesurée sur l'écart RÉEL et non sur l'échéance. Le plafond de 20
  // est une promesse : un piège qu'on n'a pas revu depuis plus de vingt séances
  // l'a déjà rompue, quel que soit le chiffre écrit dans son état. Ici le
  // « pressé » est dû plus tôt, mais il a été revu il y a trois séances ; l'autre
  // ne l'a pas été depuis vingt-cinq.
  const presse = { ...PIEGE_R1, id: 'presse' };
  const delaisse = { ...PIEGE_R1, id: 'delaisse' };
  const etatPresse = apresReponsePiege(
    programmerPiege(etatInitialPiege(presse), presse, 1), presse, { issue: 'echec', numeroSeance: 47 },
  ); // revu à la séance 47, dû à la 50
  const etatDelaisse = apresReponsePiege(
    programmerPiege(etatInitialPiege(delaisse), delaisse, 1), delaisse, { issue: 'echec', numeroSeance: 25 },
  ); // revu à la séance 25, dû à la 28, toujours pas servi
  verifier('à la séance 50, le piège non revu depuis 25 séances passe avant celui revu il y a 3 séances',
    fileDeReconfrontation([
      { piege: presse, etat: etatPresse }, { piege: delaisse, etat: etatDelaisse },
    ], 50)[0].piege.id === 'delaisse');
  verifier('mais le garde-fou reste dormant tant que le plafond n\'est pas dépassé',
    fileDeReconfrontation([
      { piege: presse, etat: etatPresse }, { piege: delaisse, etat: etatDelaisse },
    ], 30)[0].piege.id === 'delaisse');
  verifier('… et il ne fait pas passer un rang 2 affamé devant un rang 1 dû',
    fileDeReconfrontation([
      { piege: { ...PIEGE_R2, id: 'r2-affame' }, etat: etatDelaisse },
      { piege: presse, etat: etatPresse },
    ], 60)[0].piege.rang === 1);
}

// ════════════════════════════════════════════════════════════════════════════
// Le garde-fou de l'interrupteur
// ════════════════════════════════════════════════════════════════════════════

{
  const options = { porteursPosterieurs: ['ch04', 'ch05'], chapitresActifs: ['ch01', 'ch02', 'ch03'] };

  const nominal = chapitresPourReconfrontation(PIEGE_R1, {
    porteursPosterieurs: ['ch04', 'ch05'], chapitresActifs: ['ch01', 'ch04', 'ch05'],
  });
  verifier('quand les porteurs sont actifs, on tire dedans, sans garde-fou',
    nominal.ok === true && nominal.gardeFou === false && nominal.chapitres.join() === 'ch04,ch05');

  const eteints = chapitresPourReconfrontation(PIEGE_R1, options);
  verifier('« mon prof ne l\'a pas fait » sur TOUS les porteurs ne fait pas disparaître un rang 1',
    eteints.ok === true && eteints.chapitres.length > 0);
  verifier('… et le repli est dit, il ne se fait pas en silence', eteints.gardeFou === true);

  const r2 = chapitresPourReconfrontation(PIEGE_R2, options);
  verifier('le repli est réservé au rang 1 : un rang 2 attend, et le verdict le nomme',
    r2.ok === false && r2.code === 'AUCUN_CHAPITRE_PORTEUR_ACTIF');

  const rien = chapitresPourReconfrontation(PIEGE_R1, { porteursPosterieurs: ['ch04'], chapitresActifs: [] });
  verifier('tous les chapitres éteints : verdict explicite, pas un chapitre inventé',
    rien.ok === false && rien.code === 'AUCUN_CHAPITRE_ACTIF');

  const seulLeCourant = chapitresPourReconfrontation(PIEGE_R1, {
    porteursPosterieurs: ['ch04'], chapitresActifs: ['ch07'], chapitreEnCours: 'ch07',
  });
  verifier('le seul chapitre actif étant celui du moment, la re-confrontation attend',
    seulLeCourant.ok === false);
}

// ════════════════════════════════════════════════════════════════════════════
// Le savoir-faire — lui, il s'acquiert, et à des conditions
// ════════════════════════════════════════════════════════════════════════════

const REUSSITE_COMPLETE = (seance, extra = {}) => ({
  issue: 'reussite', numeroSeance: seance, palier: 4, cercle: 1, classe: 'A',
  formatDiagnostique: true, doubleQcm: false, ...extra,
});

const troisReussites = (evenements) =>
  evenements.reduce((e, ev) => apresReponseSavoirFaire(e, ev), etatInitialSavoirFaire());

{
  const acquis = troisReussites([
    REUSSITE_COMPLETE(1, { doubleQcm: true, classe: 'C' }),
    REUSSITE_COMPLETE(3),
    REUSSITE_COMPLETE(5),
  ]);
  const verdict = estMaitrise(acquis, { diagnostic: 'type' });
  verifier(`trois réussites complètes déclarent la maîtrise (${verdict.manque.join(' ; ') || 'rien ne manque'})`,
    verdict.maitrise === true && verdict.statut === 'acquis');

  const memeSeance = troisReussites([
    REUSSITE_COMPLETE(1, { doubleQcm: true, classe: 'C' }), REUSSITE_COMPLETE(1), REUSSITE_COMPLETE(1),
  ]);
  verifier('trois réussites dans la même séance ne déclarent rien',
    estMaitrise(memeSeance, { diagnostic: 'type' }).maitrise === false);

  const cercle3 = troisReussites([
    REUSSITE_COMPLETE(1, { doubleQcm: true, classe: 'C', cercle: 3 }),
    REUSSITE_COMPLETE(3, { cercle: 3 }), REUSSITE_COMPLETE(5, { cercle: 3 }),
  ]);
  verifier('trois lectures de dispositif seules ne déclarent rien (invariant 16)',
    estMaitrise(cercle3, { diagnostic: 'type' }).maitrise === false);

  const sansDoubleQcm = troisReussites([REUSSITE_COMPLETE(1, { classe: 'C' }), REUSSITE_COMPLETE(3), REUSSITE_COMPLETE(5)]);
  verifier('sans double QCM juste/juste, rien n\'est déclaré',
    estMaitrise(sansDoubleQcm, { diagnostic: 'type' }).maitrise === false);

  const deuxC = troisReussites([
    REUSSITE_COMPLETE(1, { doubleQcm: true, classe: 'C' }),
    REUSSITE_COMPLETE(3, { classe: 'C' }), REUSSITE_COMPLETE(5),
  ]);
  verifier('plus d\'une réussite de classe C : refusé', estMaitrise(deuxC, { diagnostic: 'type' }).maitrise === false);

  const sansFormat = troisReussites([
    REUSSITE_COMPLETE(1, { doubleQcm: true, classe: 'C', formatDiagnostique: false }),
    REUSSITE_COMPLETE(3, { formatDiagnostique: false }), REUSSITE_COMPLETE(5, { formatDiagnostique: false }),
  ]);
  verifier('aucune réussite dans le format où la conception se voit : refusé',
    estMaitrise(sansFormat, { diagnostic: 'type' }).maitrise === false);

  verifier('un savoir-faire non diagnostiqué est « couvert », jamais « acquis »',
    estMaitrise(acquis, { diagnostic: 'absent' }).statut === 'couvert-non-diagnostique');

  // Un juste/faux ne fait pas redescendre le niveau, et il ne compte pas comme
  // une réussite : les deux moitiés de l'invariant 16, sur le même état.
  const jf = apresReponseSavoirFaire(acquis, { issue: 'reussite-sans-justification', numeroSeance: 7, palier: 4 });
  verifier('un juste/faux ne fait pas redescendre le niveau d\'un savoir-faire', jf.niveau === acquis.niveau);
  verifier('… et il vide la fenêtre des trois réussites', jf.dernieresReussites.length === 0);
  verifier('… donc il ne laisse pas la maîtrise déclarée', estMaitrise(jf, { diagnostic: 'type' }).maitrise === false);

  const rate = apresReponseSavoirFaire(acquis, { issue: 'echec', numeroSeance: 7, palier: 4 });
  const rattrape = [9, 11, 13].reduce((e, s) => apresReponseSavoirFaire(e, REUSSITE_COMPLETE(s, { palier: 1, doubleQcm: true, classe: 'C' })), rate);
  verifier('un palier raté et jamais réussi depuis bloque la maîtrise',
    estMaitrise(rattrape, { diagnostic: 'type' }).manque.some((m) => /palier 4 raté/.test(m)));

  verifier('un savoir-faire jamais vu est à revoir', estARevoirSavoirFaire(etatInitialSavoirFaire(), 0) === true);
  verifier('le niveau ne dépasse pas le maximum de la table',
    [1, 3, 5, 7, 9, 11, 13, 15].reduce((e, s) => apresReponseSavoirFaire(e, REUSSITE_COMPLETE(s)), etatInitialSavoirFaire()).niveau === NIVEAU_MAX);
}

{
  // Le diagnostic est un énuméré fermé — `type | absent`. Un savoir-faire dont le
  // champ manque, ou porte autre chose, ne doit pas être traité comme diagnostiqué :
  // ce serait déclarer acquis sur la foi d'un champ que personne n'a écrit.
  const acquis = troisReussites([
    REUSSITE_COMPLETE(1, { doubleQcm: true, classe: 'C' }), REUSSITE_COMPLETE(3), REUSSITE_COMPLETE(5),
  ]);
  refuseLeSilence('un savoir-faire sans diagnostic déclaré n\'est pas déclaré acquis',
    () => estMaitrise(acquis, {}), (r) => r.maitrise === true);
  refuseLeSilence('un savoir-faire sans argument de contenu n\'est pas déclaré acquis',
    () => estMaitrise(acquis), (r) => r.maitrise === true);
  refuseLeSilence('un diagnostic hors énuméré n\'est pas déclaré acquis',
    () => estMaitrise(acquis, { diagnostic: 'typé' }), (r) => r.maitrise === true);
}

// ════════════════════════════════════════════════════════════════════════════
// Les entrées malformées — le module rend un verdict, jamais une valeur plausible
// ════════════════════════════════════════════════════════════════════════════

refuseLeSilence('un piège sans rythmeInitial ne reçoit pas un rythme choisi à sa place',
  () => etatInitialPiege({ id: 'x', rang: 1 }), (r) => r && r.intervalle !== undefined);
refuseLeSilence('un rythme à zéro est refusé', () => etatInitialPiege({ id: 'x', rang: 1, rythmeInitial: 0 }), (r) => !!r);
refuseLeSilence('un rythme fractionnaire est refusé', () => etatInitialPiege({ id: 'x', rang: 1, rythmeInitial: 2.5 }), (r) => !!r);
refuseLeSilence('un piège null ne produit pas un état', () => etatInitialPiege(null), (r) => !!r);
refuseLeSilence('un rang hors énuméré est refusé', () => etatInitialPiege({ id: 'x', rang: 4, rythmeInitial: 3 }), (r) => !!r);
refuseLeSilence('un rang qui est un nom de méthode d\'Object n\'est pas un rang',
  () => etatInitialPiege({ id: 'x', rang: 'toString', rythmeInitial: 3 }), (r) => !!r);
refuseLeSilence('un rang écrit en texte n\'est pas un rang',
  () => etatInitialPiege({ id: 'x', rang: '1', rythmeInitial: 3 }), (r) => !!r);

verifier('une issue hors énuméré lève, elle ne passe pas',
  (() => { try { apresReponsePiege(etatInitialPiege(PIEGE_R1), PIEGE_R1, { issue: 'peut-etre', numeroSeance: 3 }); return false; } catch { return true; } })());
verifier('une issue absente lève aussi',
  (() => { try { apresReponsePiege(etatInitialPiege(PIEGE_R1), PIEGE_R1, {}); return false; } catch { return true; } })());
verifier('l\'énuméré des issues est bien celui des quatre verdicts', ISSUES.length === 4);

{
  // Le mode de panne qui compte : une échéance `NaN`. `NaN <= n` est faux pour
  // tout n, donc le piège n'est plus JAMAIS dû — il est sorti de la file, sans
  // une ligne de journal, et l'écran affiche une séance parfaitement normale.
  const etat = etatInitialPiege(PIEGE_R1);
  const echeanceMuette = (r) => r && r.revoirALaSeance !== null && !Number.isInteger(r.revoirALaSeance);

  refuseLeSilence('programmer un piège sans numéro de séance ne pose pas une échéance NaN',
    () => programmerPiege(etat, PIEGE_R1, undefined), echeanceMuette);
  refuseLeSilence('… ni avec un numéro de séance qui n\'est pas un entier',
    () => programmerPiege(etat, PIEGE_R1, '12'), echeanceMuette);
  refuseLeSilence('répondre sans numéro de séance ne pose pas une échéance NaN',
    () => apresReponsePiege(etat, PIEGE_R1, { issue: 'reussite' }), echeanceMuette);
  refuseLeSilence('… ni pour un savoir-faire',
    () => apresReponseSavoirFaire(etatInitialSavoirFaire(), { issue: 'reussite' }),
    (r) => r && !Number.isInteger(r.revoirALaSeance));

  // Le même mode de panne par l'autre bout : un piège dont le rythme a disparu
  // entre le chargement du profil et la réponse.
  refuseLeSilence('un échec sur un piège sans rythme ne produit pas une échéance NaN',
    () => apresReponsePiege(programmerPiege(etat, PIEGE_R1, 1), { id: 'x', rang: 1 }, { issue: 'echec', numeroSeance: 4 }),
    echeanceMuette);
}

{
  // Une file vide est la valeur la plus plausible et la plus dangereuse du
  // module : c'est l'écran d'une séance sans re-confrontation, que rien ne
  // distingue d'une séance où il n'y avait rien à revoir.
  refuseLeSilence('une file construite sur rien ne rend pas « rien à revoir »',
    () => fileDeReconfrontation(null, 3), (r) => Array.isArray(r) && r.length === 0);
  refuseLeSilence('une entrée sans état ne disparaît pas de la file en silence',
    () => fileDeReconfrontation([{ piege: PIEGE_R1 }], 3), (r) => Array.isArray(r) && r.length === 0);
  verifier('une file vide reste une file vide (aucune entrée, aucun verdict à rendre)',
    fileDeReconfrontation([], 3).length === 0);
  refuseLeSilence('un état null n\'est pas « pas encore dû »',
    () => estARevoirPiege(null, 3), (r) => r === false);
}

// ── Le contrôle au build ────────────────────────────────────────────────────

verifier('un piège conforme ne produit aucune anomalie', controlerPiegeSrs(PIEGE_R1).length === 0);
verifier('une échéance écrite dans le corpus est refusée au build',
  controlerPiegeSrs({ ...PIEGE_R1, echeance: 12 }).some((a) => a.code === 'ECHEANCE_DANS_LE_CORPUS'));
verifier('un intervalle écrit dans le corpus aussi',
  controlerPiegeSrs({ ...PIEGE_R1, intervalle: 12 }).some((a) => a.code === 'ECHEANCE_DANS_LE_CORPUS'));
verifier('un rythme initial déjà au-dessus du plafond de son rang est refusé',
  controlerPiegeSrs({ ...PIEGE_R1, rythmeInitial: 25 }).some((a) => a.code === 'RYTHME_AU_DESSUS_DU_PLAFOND'));
verifier('un piège sans rythme est refusé au build',
  controlerPiegeSrs({ id: 'x', rang: 1 }).some((a) => a.code === 'RYTHME_INITIAL_ABSENT'));
refuseLeSilence('un piège null n\'est pas déclaré conforme au build',
  () => controlerPiegeSrs(null), (r) => Array.isArray(r) && r.length === 0);
refuseLeSilence('un rang qui est un nom de méthode d\'Object est refusé au build',
  () => controlerPiegeSrs({ ...PIEGE_R1, rang: 'toString' }),
  (r) => Array.isArray(r) && !r.some((a) => a.code === 'RANG_HORS_ENUMERE'));

// Le catalogue réel passe le contrôle : sans cette ligne, tout ce qui suit
// simulerait une année sur un corpus que le moteur refuserait.
{
  const fautifs = Object.values(PIEGES)
    .map((p) => ({ id: p.id, anomalies: controlerPiegeSrs(p) }))
    .filter((e) => e.anomalies.length > 0);
  verifier(`les ${Object.values(PIEGES).length} pièges du catalogue passent le contrôle SRS`
    + (fautifs.length ? ` — ${fautifs.map((f) => `${f.id} (${f.anomalies.map((a) => a.code).join()})`).join(' ; ')}` : ''),
    fautifs.length === 0);
}
// ════════════════════════════════════════════════════════════════════════════
// L'ÉPREUVE DÉCISIVE — une année complète de séances
// ════════════════════════════════════════════════════════════════════════════

const CATALOGUE = Object.values(PIEGES);
const RANG_1 = CATALOGUE.filter((p) => p.rang === 1);
const CHAPITRES = [...new Set(CATALOGUE.map((p) => p.chapitreOrigine))].sort();

/** Les deux chapitres qui suivent celui d'origine : le minimum que l'invariant 14
 *  exige du contenu, donc le cas le plus dur pour le garde-fou. */
const porteursDe = (piege) => CHAPITRES.slice(CHAPITRES.indexOf(piege.chapitreOrigine) + 1).slice(0, 2);

/** Générateur congruentiel — reproductible, et c'est tout ce qu'on lui demande.
 *  Un test qui échoue une fois sur cinq n'est pas lu. */
const alea = (graine) => {
  let x = graine >>> 0;
  return () => {
    x = (x * 1664525 + 1013904223) >>> 0;
    return x / 4294967296;
  };
};

const PROFILS = [
  {
    nom: 'réussit tout',
    // Le profil le plus important du fichier. C'est celui sur lequel le moteur de
    // mathématiques échoue : trois réussites, deux séances, et le piège est sorti
    // de la file pour toujours. Si un rang 1 disparaît, c'est ici qu'on le verra.
    tirer: () => 'reussite',
  },
  {
    nom: 'échoue souvent',
    // Celui qui sature la file : chaque échec ramène l'intervalle au rythme
    // initial, donc la demande de créneaux double, et l'ordre de la file décide
    // seul qui passe. C'est là qu'une famine se verrait.
    tirer: (r) => (r() < 0.7 ? 'echec' : (r() < 0.6 ? 'reussite' : 'reussite-sans-justification')),
  },
  {
    nom: 'moyen',
    tirer: (r) => {
      const t = r();
      if (t < 0.45) return 'reussite';
      if (t < 0.75) return 'echec';
      if (t < 0.9) return 'reussite-sans-justification';
      return 'unite-non-reconnue';
    },
  },
];

/**
 * Une année de séances, sur un profil.
 *
 *   options = { annee, seancesParChapitre, chapitresEteints, graine }
 *
 * `seancesParChapitre = null` est l'année où TOUS LES CHAPITRES SONT DÉJÀ VUS :
 * les 31 pièges entrent dans la file à la première séance et y résident l'année
 * entière. C'est le cas de référence, pour deux raisons. D'abord parce que c'est
 * un usage réel — l'interrupteur de la charte demande « mon prof ne l'a pas
 * fait », ce qui dit assez que le défaut est qu'il l'a fait. Ensuite et surtout
 * parce que c'est le seul cas où l'arithmétique de la charte s'applique
 * littéralement : « sur une année de 100 séances, le plafond de 20 garantit au
 * moins cinq re-confrontations » est une division, 100 ÷ 20, et elle suppose le
 * piège dans la file du premier jour.
 *
 * `chapitresEteints` est l'interrupteur : ces chapitres sortent du suivi, leurs
 * pièges ne sont pas programmés, et ils ne peuvent plus porter la
 * re-confrontation d'un autre.
 *
 * Un seul créneau de re-confrontation par séance — le créneau 3 du plan de
 * séance, et le budget de la charte est calculé sur ce créneau unique.
 */
function simulerUneAnnee(profil, {
  annee = 100, seancesParChapitre = null, chapitresEteints = [], graine = 7,
} = {}) {
  const r = alea(graine);
  const chapitresActifs = CHAPITRES.filter((c) => !chapitresEteints.includes(c));
  const suivis = CATALOGUE.filter((p) => chapitresActifs.includes(p.chapitreOrigine));

  const etats = new Map(CATALOGUE.map((p) => [p.id, etatInitialPiege(p)]));
  const journal = new Map(CATALOGUE.map((p) => [p.id, {
    entree: null, confrontations: [], dispositifs: [], maxIntervalle: 0, ecartMax: 0,
    sortiDeLaFile: null, gardeFou: 0, uniteConsommee: null,
  }]));

  const programmer = (piege, seance) => {
    etats.set(piege.id, programmerPiege(etats.get(piege.id), piege, seance));
    journal.get(piege.id).entree = seance;
  };

  if (seancesParChapitre === null) for (const piege of suivis) programmer(piege, 1);

  for (let seance = 1; seance <= annee; seance += 1) {
    let chapitreEnCours = null;
    if (seancesParChapitre !== null) {
      const rang = Math.floor((seance - 1) / seancesParChapitre);
      chapitreEnCours = rang < CHAPITRES.length ? CHAPITRES[rang] : null;
      if (chapitreEnCours !== null && (seance - 1) % seancesParChapitre === 0) {
        for (const piege of suivis.filter((p) => p.chapitreOrigine === chapitreEnCours)) {
          programmer(piege, seance);
        }
      }
    }

    const file = fileDeReconfrontation(
      suivis.map((piege) => ({ piege, etat: etats.get(piege.id) })),
      seance, { chapitreEnCours },
    );

    let choixDeChapitre = null;
    const servable = file.find((e) => {
      choixDeChapitre = chapitresPourReconfrontation(e.piege, {
        porteursPosterieurs: porteursDe(e.piege), chapitresActifs, chapitreEnCours,
      });
      return choixDeChapitre.ok;
    });
    if (servable === undefined) continue;

    const { piege } = servable;
    let etat = etats.get(piege.id);
    const trace = journal.get(piege.id);
    if (choixDeChapitre.gardeFou) trace.gardeFou += 1;

    // Une saisie illisible ne consomme pas l'essai : on redemande dans la même
    // séance, et l'état doit être resté rigoureusement identique.
    let issue;
    let garde = 0;
    do {
      issue = profil.tirer(r);
      if (issue === 'unite-non-reconnue'
        && apresReponsePiege(etat, piege, { issue, numeroSeance: seance }) !== etat) {
        trace.uniteConsommee = seance;
      }
      garde += 1;
    } while (issue === 'unite-non-reconnue' && garde < 10);
    if (issue === 'unite-non-reconnue') continue;

    const choixDeDispositif = dispositifSuivant(piege, etat);
    const dispositifServi = choixDeDispositif.ok ? choixDeDispositif.dispositif.id : null;
    if (dispositifServi !== null) trace.dispositifs.push(dispositifServi);

    etat = apresReponsePiege(etat, piege, {
      issue, numeroSeance: seance, palier: etat.palierServi, dispositifServi,
    });
    etats.set(piege.id, etat);
    // L'écart RÉEL entre deux re-confrontations : c'est lui que le plafond
    // promet, et il ne se lit nulle part dans l'état.
    const precedente = trace.confrontations[trace.confrontations.length - 1] ?? trace.entree;
    trace.ecartMax = Math.max(trace.ecartMax, seance - precedente);
    trace.confrontations.push(seance);
    trace.maxIntervalle = Math.max(trace.maxIntervalle, etat.intervalle);

    // « Sorti de la file » : une échéance disparue, non entière, ou repoussée
    // au-delà du plafond de son rang. Les trois ont le même effet à l'écran —
    // plus rien, et rien qui le dise.
    if (etat.revoirALaSeance === null || !Number.isInteger(etat.revoirALaSeance)
      || etat.revoirALaSeance - seance > PLAFOND_INTERVALLE[piege.rang]) {
      trace.sortiDeLaFile = trace.sortiDeLaFile ?? seance;
    }
  }

  return { etats, journal, chapitresActifs };
}

/**
 * Combien de re-confrontations le plafond PROMET, pour un piège qui a résidé
 * `residence` séances dans la file.
 *
 * C'est l'arithmétique de la charte, et rien d'autre : « l'intervalle ne dépasse
 * jamais 20 séances, ce qui garantit au moins cinq re-confrontations sur une
 * année de 100, quatre sur une année plus lâche de 90 ». Cent divisé par vingt.
 *
 * Le seuil de 80 est ce même calcul lu à l'envers : quatre re-confrontations
 * exigent quatre fois le plafond de séances dans la file. Exiger quatre passages
 * d'un piège introduit par la progression à la séance 91 ne testerait pas le
 * moteur — aucun moteur respectant le plafond ne peut les produire, et le test
 * serait faux, pas sévère. Le refus de l'invariant 14 s'entend d'un piège qui a
 * eu son année ; ceux qui ne l'ont pas eue restent tenus par la division.
 */
const promesseDuPlafond = (residence) =>
  (residence >= 4 * PLAFOND_INTERVALLE[1] ? 4 : Math.floor(residence / PLAFOND_INTERVALLE[1]));

/**
 * La règle de variation, relue sur la SÉQUENCE effectivement servie.
 *
 * On reconstruit les cycles : un dispositif ne peut revenir qu'une fois tous les
 * autres passés. Contrôler l'état final ne prouverait rien — c'est l'ordre qui
 * porte la règle.
 */
function violationDeVariation(piege, servis) {
  const pool = dispositifsDeReconfrontation(piege).map((d) => d.id);
  if (pool.length === 0) return null;
  let cycle = new Set();
  for (const id of servis) {
    if (!pool.includes(id)) return `dispositif « ${id} » étranger au piège`;
    if (cycle.has(id)) {
      if (cycle.size < pool.length) {
        return `« ${id} » resservi alors que ${pool.length - cycle.size} dispositif(s) n'avaient jamais été vus`;
      }
      cycle = new Set();
    }
    cycle.add(id);
  }
  return null;
}

/** Les quatre refus de l'invariant 14, sur une année simulée. */
function epreuveDeLInvariant14(etiquette, resultat, annee = 100) {
  const { journal, etats } = resultat;
  const vus = RANG_1
    .map((p) => ({ piege: p, trace: journal.get(p.id), etat: etats.get(p.id) }))
    .filter((e) => e.trace.entree !== null);

  const liste = (entrees, detail) => (entrees.length ? ` — ${entrees.map(detail).join(' ')}` : '');

  const trop = vus.filter((e) => e.trace.maxIntervalle > PLAFOND_INTERVALLE[1]);
  verifier(`[${etiquette}] aucun intervalle de rang 1 au-delà de 20 séances`
    + liste(trop, (e) => `${e.piege.id}:${e.trace.maxIntervalle}`), trop.length === 0);

  // Et le plafond tenu POUR DE VRAI : l'intervalle écrit dans l'état ne vaut que
  // si la file sert le piège quand il est dû. Une séance de latence est admise —
  // c'est le délai minimal d'un garde-fou, qui ne peut agir qu'après le
  // dépassement — mais pas deux.
  const espaces = vus.filter((e) => e.trace.ecartMax > PLAFOND_INTERVALLE[1] + 1);
  verifier(`[${etiquette}] aucun rang 1 laissé plus de 20 séances sans re-confrontation RÉELLE`
    + liste(espaces, (e) => `${e.piege.id}:${e.trace.ecartMax}`), espaces.length === 0);

  const sortis = vus.filter((e) => e.trace.sortiDeLaFile !== null);
  verifier(`[${etiquette}] aucun piège de rang 1 sorti de la file avant la fin de l'année`
    + liste(sortis, (e) => `${e.piege.id}@${e.trace.sortiDeLaFile}`), sortis.length === 0);

  // Et il n'en est pas sorti à la dernière séance non plus : à la clôture, chaque
  // rang 1 revient dans les vingt séances qui suivent, quoi qu'il ait réussi.
  const perdus = vus.filter((e) => !estARevoirPiege(e.etat, annee + PLAFOND_INTERVALLE[1]));
  verifier(`[${etiquette}] à la clôture, chaque rang 1 revient dans les 20 séances`
    + liste(perdus, (e) => e.piege.id), perdus.length === 0);

  const pauvres = vus.filter((e) => {
    const residence = annee - e.trace.entree + 1;
    return e.trace.confrontations.length < promesseDuPlafond(residence);
  });
  verifier(`[${etiquette}] au moins quatre re-confrontations de chaque piège de rang 1 (moins pour un piège entré en cours d'année : ⌊résidence/20⌋)`
    + liste(pauvres, (e) => `${e.piege.id}:${e.trace.confrontations.length}/${promesseDuPlafond(annee - e.trace.entree + 1)}`),
    pauvres.length === 0);

  const variations = CATALOGUE
    .map((p) => ({ id: p.id, faute: violationDeVariation(p, journal.get(p.id).dispositifs) }))
    .filter((e) => e.faute !== null);
  verifier(`[${etiquette}] le même constat n'est jamais resservi tant qu'il en reste un non servi`
    + liste(variations, (e) => `${e.id} : ${e.faute}`), variations.length === 0);

  const consommees = CATALOGUE.filter((p) => journal.get(p.id).uniteConsommee !== null);
  verifier(`[${etiquette}] aucune saisie illisible n'a consommé d'essai sur l'année`
    + liste(consommees, (p) => `${p.id}@${journal.get(p.id).uniteConsommee}`), consommees.length === 0);

  return vus;
}

// ── L'année de référence : tous les chapitres déjà vus ──────────────────────

for (const profil of PROFILS) {
  const resultat = simulerUneAnnee(profil);
  const vus = epreuveDeLInvariant14(profil.nom, resultat);

  verifier(`[${profil.nom}] les treize pièges de rang 1 sont entrés dans la file`, vus.length === RANG_1.length);

  // Le garde-fou ne doit pas se déclencher quand rien n'est éteint : sans cette
  // ligne, l'épreuve de l'interrupteur, plus bas, ne prouverait rien.
  const aPorteurs = RANG_1.filter((p) => porteursDe(p).length > 0);
  verifier(`[${profil.nom}] hors interrupteur, le repli ne sert jamais pour les ${aPorteurs.length} rangs 1 qui ont des porteurs`,
    aPorteurs.every((p) => resultat.journal.get(p.id).gardeFou === 0));
}

// ── Le balayage de graines ──────────────────────────────────────────────────
//
// Tout ce qui précède tourne à graine fixe, et une graine fixe est une seule
// trajectoire. Le seuil des quatre re-confrontations s'est joué à une unité près
// pendant l'écriture de ce fichier : sans ce balayage, la suite serait passée au
// vert sur la graine 7 et rouge chez un élève réel. Vingt-cinq années par profil
// aléatoire, et c'est le PIRE cas qui est jugé — pas la moyenne, qui ne dit rien
// d'un élève dont le piège n'est pas revenu.

for (const profil of PROFILS.slice(1)) {
  for (const annee of [100, 90]) {
    let pire = Infinity;
    let pireEcart = 0;
    let coupable = null;
    for (let graine = 1; graine <= 25; graine += 1) {
      const { journal } = simulerUneAnnee(profil, { annee, graine });
      for (const piege of RANG_1) {
        const trace = journal.get(piege.id);
        if (trace.confrontations.length < pire) {
          pire = trace.confrontations.length;
          coupable = `${piege.id} (graine ${graine})`;
        }
        pireEcart = Math.max(pireEcart, trace.ecartMax);
      }
    }
    verifier(`[${profil.nom} · ${annee} séances · 25 graines] jamais moins de quatre re-confrontations d'un rang 1 (pire : ${pire}, ${coupable})`,
      pire >= 4);
    verifier(`[${profil.nom} · ${annee} séances · 25 graines] jamais plus de 20 séances entre deux re-confrontations (pire : ${pireEcart})`,
      pireEcart <= PLAFOND_INTERVALLE[1] + 1);
  }
}

// ── L'épreuve de l'interrupteur ─────────────────────────────────────────────
//
// « Un piège de rang 1 dont la re-confrontation disparaît quand l'élève répond
// "pas encore" à tous les chapitres frontière. » On prend la règle piège par
// piège, parce que c'est ce qu'elle dit : ce sont LES CHAPITRES QUI LE PORTENT
// qui s'éteignent. Treize années simulées par profil, une par piège de rang 1,
// chacune avec ses deux chapitres porteurs hors du suivi — ce qui retire aussi
// du catalogue les pièges nés dans ces chapitres, donc appauvrit le vivier
// exactement comme l'interrupteur le fait dans l'application.

for (const profil of PROFILS) {
  const echecsDInterrupteur = [];
  const sansGardeFou = [];

  for (const cible of RANG_1) {
    const { journal } = simulerUneAnnee(profil, { chapitresEteints: porteursDe(cible) });
    const trace = journal.get(cible.id);
    if (trace.confrontations.length < 4) {
      echecsDInterrupteur.push(`${cible.id}:${trace.confrontations.length}`);
    }
    if (trace.gardeFou === 0) sansGardeFou.push(cible.id);
  }

  verifier(`[${profil.nom} · interrupteur] la re-confrontation d'un rang 1 ne disparaît pas quand les chapitres qui la portent sont éteints`
    + (echecsDInterrupteur.length ? ` — ${echecsDInterrupteur.join(' ')}` : ''),
    echecsDInterrupteur.length === 0);
  verifier(`[${profil.nom} · interrupteur] et c'est bien le repli qui l'a tenue, pas un porteur resté actif`
    + (sansGardeFou.length ? ` — ${sansGardeFou.join(' ')}` : ''),
    sansGardeFou.length === 0);
}

// ── L'année où la progression occupe l'année entière ────────────────────────
//
// Dix chapitres sur cent séances : le dernier ouvre à la séance 91, et ses
// pièges n'ont plus le temps d'être re-confrontés quatre fois. C'est un fait de
// progression et non un défaut de moteur — d'où `promesseDuPlafond`, qui tient
// chaque piège à ce que sa résidence dans la file permet. Tout le reste est
// exigé à l'identique.

for (const profil of PROFILS) {
  epreuveDeLInvariant14(`${profil.nom} · progression sur l'année`,
    simulerUneAnnee(profil, { seancesParChapitre: 10 }));
}

// ── L'année d'une progression de deux semaines par chapitre ─────────────────
//
// Trois séances par semaine, deux semaines par chapitre : la progression tient
// dans les soixante premières séances, les quarante dernières sont la
// consolidation — « la marge sert l'entretien après acquisition ».

for (const profil of PROFILS) {
  epreuveDeLInvariant14(`${profil.nom} · consolidation`,
    simulerUneAnnee(profil, { seancesParChapitre: 6 }));
}

// ── L'année lâche de la charte ──────────────────────────────────────────────
//
// « Sur une année plus lâche de 90 séances, au moins quatre. » C'est la borne
// que la charte chiffre, et c'est donc elle qu'on éprouve, pas seulement les
// cent séances confortables.

for (const profil of PROFILS) {
  const resultat = simulerUneAnnee(profil, { annee: 90 });
  epreuveDeLInvariant14(`${profil.nom} · année lâche de 90 séances`, resultat, 90);
  const pauvres = RANG_1.filter((p) => resultat.journal.get(p.id).confrontations.length < 4);
  verifier(`[${profil.nom} · année lâche de 90 séances] quatre re-confrontations par rang 1, comme la charte le chiffre`
    + (pauvres.length ? ` — ${pauvres.map((p) => `${p.id}:${resultat.journal.get(p.id).confrontations.length}`).join(' ')}` : ''),
    pauvres.length === 0);
}

// ── Ce que cette simulation ne voit pas ─────────────────────────────────────

reserve(
  'la simulation sert UN piège par séance, sans les créneaux 1 et 2 : le budget de\n'
  + '      15 minutes par séance et les bandes de cercles relèvent de `seance.js`,\n'
  + '      pas de ce module. L\'invariant 13 reste à éprouver dans son propre outil.',
);
reserve(
  'la dépendance d\'Andersson — « conservation de la masse » jamais programmée avant\n'
  + '      « le gaz n\'est pas de la matière » — se lit sur le profil élève, et aucune\n'
  + '      fonction de `srs.js` ne l\'arbitre : la progression du corpus la tient seule.',
);

// ── Rapport ─────────────────────────────────────────────────────────────────

console.log(`${CATALOGUE.length} pièges au catalogue, dont ${RANG_1.length} de rang 1 — ${CHAPITRES.length} chapitres.`);
{
  const { journal } = simulerUneAnnee(PROFILS[0]);
  const comptes = RANG_1.map((p) => journal.get(p.id).confrontations.length);
  console.log(`profil « réussit tout » : re-confrontations par rang 1, de ${Math.min(...comptes)} à ${Math.max(...comptes)}`
    + ` (total ${comptes.reduce((a, b) => a + b, 0)} sur 100 créneaux).`);
}
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
