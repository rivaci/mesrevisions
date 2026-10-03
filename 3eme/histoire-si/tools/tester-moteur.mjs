// Tests du moteur, hors navigateur.
//
//     node tools/tester-moteur.mjs
//
// Ce qui se joue ici, c'est la justice de la correction : un « faux » donné à
// une réponse juste décourage, un « juste » donné à une erreur la fait
// apprendre. D'où des tests qui vérifient autant ce qui est REFUSÉ que ce qui
// est accepté — en particulier les dates, qu'aucune tolérance ne doit toucher.

import { comparer, distance, indiceDe, normaliser } from '../js/comparer.js';
import { MAX_REPRISES, avancer, bilan, courant, enregistrer, estFini, note, nouveauTour, tirerInterro } from '../js/tour.js';
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

verifier('les articles ne comptent pas', jugé('The Schlieffen Plan', 'mov-plan').resultat === 'juste');
verifier('« the colonial rush » : l\'article ne compte pas', jugé('the colonial rush', 't-rush').resultat === 'juste');
verifier('« an heir » : l\'article ne compte pas', jugé('an heir', 't-heir').resultat === 'juste');
verifier('la casse ne compte pas', jugé('schlieffen plan', 'mov-plan').resultat === 'juste');
verifier('le tiret ne compte pas', normaliser('Austria-Hungary') === 'austria hungary');
verifier('les accents ne comptent pas (Sarajévo)', jugé('Sarajévo', 'nat-city').resultat === 'juste');
verifier('une variante acceptée (Zeppelins)', jugé('zeppelins', 't-zeppelin').resultat === 'juste');

// ── Presque : l'orthographe d'un nom ───────────────────────────────────────

const schliefen = jugé('Schliefen Plan', 'mov-plan');
verifier('« Schliefen Plan » : presque, l\'orthographe', schliefen.resultat === 'presque' && schliefen.raison === 'orthographe');
verifier('« Sarajevho » : presque', jugé('Sarajevho', 'nat-city').resultat === 'presque');
verifier('« Paris » pour Sarajevo : faux', jugé('Paris', 'nat-city').resultat === 'faux');
verifier('un mot court n\'a pas de tolérance (heit pour heir)', jugé('heit', 't-heir').resultat === 'faux');

// ── Les dates : aucune tolérance ────────────────────────────────────────────

verifier('« 28 June 1914 » est juste', jugé('28 June 1914', 'nat-date').resultat === 'juste');
verifier('« June 28th, 1914 » est juste', jugé('June 28th, 1914', 'nat-date').resultat === 'juste');
verifier('« 27 June 1914 » est faux, pas presque', jugé('27 June 1914', 'nat-date').resultat === 'faux');
verifier('« 28 June 1915 » est faux, pas presque', jugé('28 June 1915', 'nat-date').resultat === 'faux');
verifier('« 1871 » est accepté pour 1870', jugé('1871', 'aim-1870').resultat === 'juste');
verifier('« 1880 » est faux', jugé('1880', 'aim-1870').resultat === 'faux');
verifier('« 70 » n\'est pas 80 km', jugé('70', 'mov-km').resultat === 'faux');
verifier('« about 80 km » est juste', jugé('about 80 km', 'mov-km').resultat === 'juste');

// ── Les erreurs prévues ─────────────────────────────────────────────────────

const massacre = jugé('massacre', 'nat-genocide');
verifier('« massacre » pour 1915–1917 : le message des deux dates', massacre.raison === 'piege' && /1894/.test(massacre.message));
verifier('« revanche » : le mot français est signalé', /revenge/.test(jugé('revanche', 't-revenge').message ?? ''));
verifier('« plan Schlieffen » : presque, l\'ordre anglais', jugé('plan Schlieffen', 'mov-plan').resultat === 'presque');
verifier('« peace armed » : l\'adjectif avant le nom', /avant le nom/.test(jugé('peace armed', 't-armed-peace').message ?? ''));

// ── Les QCM, les trous ──────────────────────────────────────────────────────

verifier('un QCM juste', comparer('The Triple Entente', item('ap-russia')).resultat === 'juste');
verifier('un QCM faux', comparer('The Triple Alliance', item('ap-russia')).resultat === 'faux');
verifier('un trou juste', jugé('wealth', 'imp-wealth').resultat === 'juste');
verifier('« blocks » est accepté pour blocs', jugé('blocks', 'ap-blocs').resultat === 'juste');

// ── Utilitaires ─────────────────────────────────────────────────────────────

verifier('la distance compte les lettres à changer', distance('schlieffen', 'schliefen') === 1 && distance('abc', 'abc') === 0);
verifier('l\'indice garde la première lettre de chaque mot', indiceDe(item('mov-plan')) === 'S········· P···');
verifier('un mot tapé n\'est pas un collage', !saisieSuspecte('The war', 'The war had'));
verifier('un paragraphe arrivé d\'un coup, si', saisieSuspecte('', 'The Great War had several causes. First, the colonial rush.'));

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

// ── La progression ──────────────────────────────────────────────────────────

{
  let p = profilVierge();
  p = noterEssai(p, 'chr-ordre', 'faux');
  p = noterEssai(p, 'w-causes', 'faux');
  verifier('une chronologie ratée va dans « À revoir », un écrit raté non', aRevoir(p, itemsDe(c)).map((i) => i.id).join() === 'chr-ordre');
}

// ── Merlin ──────────────────────────────────────────────────────────────────

{
  const ecrit = item('w-causes');
  const criteres = ecrit.criteres;
  const tous = (statut) => Object.fromEntries(criteres.map((x) => [x.id, statut]));
  verifier('tout présent : juste', verdict(tous('present'), criteres) === 'juste');
  verifier('une erreur : à reprendre', verdict({ ...tous('present'), blocs: 'faux' }, criteres) === 'a-reprendre');
  verifier('les consignes parlent de la section internationale', /section internationale/.test(CONSIGNES));
  verifier('les consignes demandent de suivre le cours de l\'élève', /Suis le cours/.test(CONSIGNES));

  const bonne = {
    elements: criteres.map((x) => ({ id: x.id, statut: 'present', commentaire: '' })),
    corrige: 'The war had several causes.', message: 'Bien.',
  };
  verifier('une réponse complète de Merlin est lue', lireEvaluation(bonne, criteres)?.corrige === 'The war had several causes.');
  let recu = null;
  const appeler = async (requete) => { recu = requete; return { disponible: true, donnees: bonne }; };
  const lue = await evaluerEcrit({ item: ecrit, texte: 'The war had several causes.', profil: c.profilMerlin }, { appeler, appli: 'histoiresi3e' });
  verifier('Merlin répond : verdict calculé par l\'appli', lue.parMerlin && lue.verdict === 'juste');
  verifier('le profil du chapitre part avec la requête, avec les écarts du cours', /80 km/.test(recu?.profil ?? ''));
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
