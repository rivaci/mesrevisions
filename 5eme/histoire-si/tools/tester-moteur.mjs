// Tests du moteur, hors navigateur.
//
//     node tools/tester-moteur.mjs
//
// Ce qui se joue ici, c'est la justice de la correction : un « faux » donné à
// une réponse juste décourage, un « juste » donné à une erreur la fait
// apprendre. D'où des tests qui vérifient autant ce qui est REFUSÉ que ce qui
// est accepté — en particulier les dates, qu'aucune tolérance ne doit toucher.

import { comparer, distance, indiceDe, normaliser } from '../js/comparer.js';
import { MAX_REPRISES, avancer, bilan, courant, datesDuQuiz, enregistrer, estFini, note, nouveauTour, tirerDates, tirerInterro } from '../js/tour.js';
import { aRevoir, noterEssai, profilVierge } from '../js/progres.js';
import { CONSIGNES, evaluerEcrit, lireEvaluation, saisieSuspecte, verdict } from '../js/ecrit.js';
import { CHAPITRES, itemParId, itemsDe } from '../js/data/chapitres/index.js';

let passes = 0;
const echecs = [];

const verifier = (nom, condition) => {
  if (condition) passes += 1;
  else echecs.push(nom);
};

const c = CHAPITRES[0];
const item = (id) => itemParId(c, id);
const jugé = (saisie, id) => comparer(saisie, item(id));

// ── Ce qui ne compte pas ────────────────────────────────────────────────────

verifier('les articles ne comptent pas', jugé('The Tower of London', 'rv-tower').resultat === 'juste');
verifier('« the poll tax » : l\'article ne compte pas', jugé('the poll tax', 't-poll-tax').resultat === 'juste');
verifier('« an heir » : l\'article ne compte pas', jugé('an heir', 't-heir').resultat === 'juste');
verifier('la casse ne compte pas', jugé('wat tyler', 'rv-tyler').resultat === 'juste');
verifier('le tiret ne compte pas (1337-1453)', jugé('1337-1453', 'hy-dates').resultat === 'juste');
verifier('les accents ne comptent pas', normaliser('Brétigny') === 'bretigny');
verifier('une variante acceptée (pretender)', jugé('pretender', 't-claimant').resultat === 'juste');
verifier('l\'orthographe du cours est acceptée (Phillip VI)', jugé('Phillip VI', 'hy-crowned').resultat === 'juste');
verifier('« 50,000 » et « 50000 » sont justes', jugé('50,000', 'rv-number').resultat === 'juste' && jugé('50000', 'rv-number').resultat === 'juste');

// ── Presque : l'orthographe d'un nom ───────────────────────────────────────

const wallas = jugé('William Wallas', 'sc-wallace');
verifier('« William Wallas » : presque, l\'orthographe', wallas.resultat === 'presque' && wallas.raison === 'orthographe');
verifier('« Poitier » : presque', jugé('Poitier', 'ev-poitiers').resultat === 'presque');
verifier('« Edwart III » : presque, le numéro est le bon', jugé('Edwart III', 'hy-claimant').resultat === 'presque');
verifier('« Paris » pour Poitiers : faux', jugé('Paris', 'ev-poitiers').resultat === 'faux');
verifier('un mot court n\'a pas de tolérance (heit pour heir)', jugé('heit', 't-heir').resultat === 'faux');

// ── Les dates et les numéros de rois : aucune tolérance ─────────────────────

verifier('« 1356 » est juste', jugé('1356', 'ev-1356').resultat === 'juste');
verifier('« in 1356 » est juste', jugé('in 1356', 'ev-1356').resultat === 'juste');
verifier('« 1357 » est faux, pas presque', jugé('1357', 'ev-1356').resultat === 'faux');
verifier('« 1337–1452 » est faux, pas presque', jugé('1337–1452', 'hy-dates').resultat === 'faux');
verifier('« 60,000 » rebelles est faux', jugé('60,000', 'rv-number').resultat === 'faux');
verifier('« Philip V » est faux, pas presque', jugé('Philip V', 'hy-crowned').resultat === 'faux');
verifier('« Philip VII » est faux, pas presque', jugé('Philip VII', 'hy-crowned').resultat === 'faux');
verifier('« John I » pour John II : faux', jugé('John I', 'ev-john').resultat === 'faux');
verifier('« Richard III » pour Richard II : faux', jugé('Richard III', 'rv-who').resultat === 'faux');
verifier('les chiffres romains comptent comme des chiffres', jugé('Edward 3', 'hy-claimant').resultat === 'juste'
  && jugé('Edward 4', 'hy-claimant').resultat === 'faux');
verifier('un ordinal vaut le numéro (Edward 3rd, Richard 2nd, Phillip 6)', jugé('Edward 3rd', 'hy-claimant').resultat === 'juste'
  && jugé('Richard 2nd', 'rv-who').resultat === 'juste' && jugé('Phillip 6', 'hy-crowned').resultat === 'juste');
verifier('« John 1st » pour John II : faux', jugé('John 1st', 'ev-john').resultat === 'faux');
verifier('normaliser : IV, IX et XIV deviennent 4, 9 et 14', normaliser('Philip IV, Louis IX, Louis XIV') === 'philip 4 louis 9 louis 14');

// ── Les erreurs prévues ─────────────────────────────────────────────────────

const edward2 = jugé('Edward II', 'hy-claimant');
verifier('« Edward II » pour 1328 : faux, avec le message du père', edward2.resultat === 'faux' && /père/.test(edward2.message ?? ''));
verifier('« Edward I » pour 1328 : le message de 1307', /1307/.test(jugé('Edward I', 'hy-claimant').message ?? ''));
verifier('« Robert the Bruce » pour la révolte : le message du roi d\'Écosse', /roi d'Écosse/.test(jugé('Robert the Bruce', 'sc-wallace').message ?? ''));
verifier('« William Wallace » pour 1381 : le message de l\'Écosse', /Écosse/.test(jugé('William Wallace', 'rv-tyler').message ?? ''));
verifier('« 1381 » pour la poll tax : le message des deux dates', /1377/.test(jugé('1381', 'rv-1377').message ?? ''));
verifier('« Normandy » à garder : faux, avec la Gascogne', jugé('Normandy', 'fe-gascony').resultat === 'faux' && /Gascony/.test(jugé('Normandy', 'fe-gascony').message ?? ''));
verifier('« Gascogne » : presque, le mot français', jugé('Gascogne', 'fe-gascony').resultat === 'presque');
verifier('« count » pour comté : faux, avec le comte', jugé('count', 't-county').resultat === 'faux' && /comte/.test(jugé('count', 't-county').message ?? ''));
verifier('« pole tax » : presque, le poteau', jugé('pole tax', 't-poll-tax').resultat === 'presque');
verifier('« London » pour la Tour : faux, plus précis', /Tower/.test(jugé('London', 'rv-tower').message ?? ''));
verifier('« Richard » seul : « Lequel ? »', /Lequel/.test(jugé('Richard', 'rv-who').message ?? ''));
verifier('« John » seul pour Poitiers : « Lequel ? »', /Lequel/.test(jugé('John', 'ev-john').message ?? ''));
verifier('« Aquitaine » : presque, ton cours dit Gascony', jugé('Aquitaine', 'fe-gascony').resultat === 'presque');
verifier('« at the Tower of London » est juste', jugé('at the Tower of London', 'rv-tower').resultat === 'juste');

// ── Les QCM, les trous ──────────────────────────────────────────────────────

verifier('un QCM juste', comparer('His nephew', item('hy-edward')).resultat === 'juste');
verifier('un QCM faux', comparer('His cousin', item('hy-edward')).resultat === 'faux');
verifier('un trou juste', jugé('county', 'ed-1275').resultat === 'juste');
verifier('« shire » est accepté pour county', jugé('shire', 'ed-1275').resultat === 'juste');

// ── Utilitaires ─────────────────────────────────────────────────────────────

verifier('la distance compte les lettres à changer', distance('wallace', 'wallas') === 2 && distance('abc', 'abc') === 0);
verifier('l\'indice garde la première lettre de chaque mot', indiceDe(item('sc-wallace')) === 'W······ W······');
verifier('l\'indice d\'une année donne la décennie', indiceDe(item('sc-1296')) === '129·' && indiceDe(item('hy-dates')) === '133·–145·');
verifier('un item peut porter son propre indice', /child/.test(indiceDe(item('rv-age'))));
verifier('un mot tapé n\'est pas un collage', !saisieSuspecte('The King', 'The King was'));
verifier('un paragraphe arrivé d\'un coup, si', saisieSuspecte('', 'In 1328, Charles IV died with no male heir. There were two claimants.'));

// ── Le tour ─────────────────────────────────────────────────────────────────

{
  const t = nouveauTour([{ id: 'a' }, { id: 'b' }]);
  enregistrer(t, courant(t), 'faux');
  avancer(t);
  enregistrer(t, courant(t), 'juste');
  avancer(t);
  verifier('une question ratée repasse en fin de file', t.file.length === 3 && t.file[2].id === 'a');
  enregistrer(t, courant(t), 'juste');
  avancer(t);
  verifier('seul le premier essai compte', estFini(t) && bilan(t).faux === 1 && bilan(t).justes === 1);
}
{
  const t = nouveauTour([{ id: 'a' }]);
  for (let i = 0; i < 6 && !estFini(t); i += 1) { enregistrer(t, courant(t), 'faux'); avancer(t); }
  verifier(`une question ne revient pas plus de ${MAX_REPRISES} fois`, t.file.length === 1 + MAX_REPRISES);
}
{
  const t = nouveauTour([{ id: 'a' }, { id: 'b' }], { reprendre: false });
  enregistrer(t, courant(t), 'presque');
  avancer(t);
  enregistrer(t, courant(t), 'juste');
  verifier('le contrôle blanc ne reprend rien, et compte un demi-point pour presque', t.file.length === 2 && note(t).points === 1.5);
}

// ── Le contrôle blanc ───────────────────────────────────────────────────────

{
  let graine = 5;
  const alea = () => { graine = (graine * 16807) % 2147483647; return (graine - 1) / 2147483646; };
  const attendu = c.interro.tirage.reduce((s, t) => s + t.nombre, 0);
  let bon = true;
  for (let essai = 0; essai < 25; essai += 1) {
    const questions = tirerInterro(c, alea);
    const ids = questions.map((q) => q.id);
    const aLEnvers = questions.filter((q) => q.mode === 'reconnaitre');
    bon = bon && questions.length === attendu
      && new Set(ids).size === ids.length
      && ids.every((id) => itemParId(c, id) && itemParId(c, id).type !== 'decrire')
      && aLEnvers.every((q) => itemParId(c, q.id).type === 'terme' && q.options.length === 3
        && new Set(q.options).size === 3 && q.options.includes(itemParId(c, q.id).fr));
  }
  verifier(`le contrôle blanc : ${attendu} questions distinctes, sans écrit, QCM à l'envers sur des termes (25 tirages)`, bon);
}

// ── Le quiz des dates ───────────────────────────────────────────────────────

{
  let graine = 11;
  const alea = () => { graine = (graine * 16807) % 2147483647; return (graine - 1) / 2147483646; };
  const toutes = datesDuQuiz(c);
  let bon = true;
  const vus = new Set();
  const premieres = new Set();
  for (let essai = 0; essai < 40; essai += 1) {
    const questions = tirerDates(c, alea);
    const items = questions.map((q) => itemParId(c, q.id));
    const groupes = items.map((i) => i?.groupe);
    for (const i of items) vus.add(i?.id);
    premieres.add(groupes[0]);
    bon = bon && questions.length === toutes.length && items.every((i) => i && c.quizDates.items.includes(i))
      && toutes.every((g) => groupes.includes(g));
  }
  verifier(`le quiz des dates : les ${toutes.length} dates à chaque fois, une seule question par date (40 tirages)`, bon);
  verifier('le quiz des dates change d\'ordre d\'un tirage à l\'autre', premieres.size > 3);
  verifier('le quiz des dates pose les deux sens : l\'année à taper, l\'événement à choisir',
    [...vus].some((id) => itemParId(c, id).type === 'reponse') && [...vus].some((id) => itemParId(c, id).type === 'choix'));
  verifier('une date ratée au quiz va dans « À revoir »', aRevoir(noterEssai(profilVierge(), 'qd-1381', 'faux'), itemsDe(c)).some((i) => i.id === 'qd-1381'));
  verifier('« 1377 » pour la révolte de 1381 : le message des deux dates', /1381/.test(jugé('1377', 'qd-1381').message ?? ''));
}

// ── La progression ──────────────────────────────────────────────────────────

{
  let p = profilVierge();
  p = noterEssai(p, 'chr-war', 'faux');
  p = noterEssai(p, 'w-war', 'faux');
  verifier('une chronologie ratée va dans « À revoir », un écrit raté non', aRevoir(p, itemsDe(c)).map((i) => i.id).join() === 'chr-war');
}

// ── Merlin ──────────────────────────────────────────────────────────────────

{
  const ecrit = item('w-war');
  const criteres = ecrit.criteres;
  const tous = (statut) => Object.fromEntries(criteres.map((x) => [x.id, statut]));
  verifier('tout présent : juste', verdict(tous('present'), criteres) === 'juste');
  verifier('une erreur : à reprendre', verdict({ ...tous('present'), pretendants: 'faux' }, criteres) === 'a-reprendre');
  verifier('les consignes parlent de la section internationale', /section internationale/.test(CONSIGNES));
  verifier('les consignes demandent de suivre le cours de l\'élève', /Suis le cours/.test(CONSIGNES));

  const bonne = {
    elements: criteres.map((x) => ({ id: x.id, statut: 'present', commentaire: '' })),
    corrige: 'The war began in 1337.', message: 'Bien.',
  };
  verifier('une réponse complète de Merlin est lue', lireEvaluation(bonne, criteres)?.corrige === 'The war began in 1337.');
  let recu = null;
  const appeler = async (requete) => { recu = requete; return { disponible: true, donnees: bonne }; };
  const lue = await evaluerEcrit({ item: ecrit, texte: 'The war began in 1337.', profil: c.profilMerlin }, { appeler, appli: 'histoiresi5e' });
  verifier('Merlin répond : verdict calculé par l\'appli', lue.parMerlin && lue.verdict === 'juste');
  verifier('le profil du chapitre part avec la requête, avec les écarts du cours', /Cassel/.test(recu?.profil ?? ''));
  verifier('les consignes parlent d\'un élève de 5e', /élève de 5e/.test(CONSIGNES));
  const plante = await evaluerEcrit({ item: ecrit, texte: 'x', profil: '' }, { appeler: async () => { throw new Error('réseau'); } });
  verifier('un appel qui lève ne casse rien', plante.aCorrigerSoiMeme);
}

// ── Bilan ───────────────────────────────────────────────────────────────────

if (echecs.length) {
  console.error(`✗ ${echecs.length} échec(s), ${passes} réussi(s) :`);
  for (const e of echecs) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✓ ${passes} tests réussis.`);
