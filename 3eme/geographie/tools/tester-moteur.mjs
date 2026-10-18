// Tests du moteur, hors navigateur.
//
//     node tools/tester-moteur.mjs
//
// Ce qui se joue ici, c'est la justice de la correction : un « faux » donné à
// une réponse juste décourage, un « juste » donné à une erreur la fait
// apprendre. D'où des tests qui vérifient autant ce qui est REFUSÉ que ce qui
// est accepté — les chiffres des documents, qu'aucune tolérance ne doit
// toucher, et la confusion classique entre banlieue et couronne périurbaine.

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
const piege = (saisie, id) => jugé(saisie, id).raison === 'piege';

// ── Ce qui ne compte pas ────────────────────────────────────────────────────

verifier('l\'article ne compte pas (une aire urbaine)', jugé('une aire urbaine', 'g-t-aire').resultat === 'juste');
verifier('l\'article élidé ne compte pas (l\'étalement urbain)', jugé('l\'étalement urbain', 'g-t-etalement').resultat === 'juste'
  && jugé('l’étalement urbain', 'g-t-etalement').resultat === 'juste');
verifier('le tiret ne compte pas (ville centre)', jugé('Ville centre', 'g-t-centre').resultat === 'juste');
verifier('le pluriel accepté (les banlieues)', jugé('les banlieues', 'g-t-banlieue').resultat === 'juste');
verifier('« 30% » et « près de 30 % » sont justes', jugé('30%', 'g-30').resultat === 'juste' && jugé('près de 30 %', 'g-30').resultat === 'juste');

// ── Presque : les accents, l'orthographe ───────────────────────────────────

verifier('« etalement urbain » : presque, l\'accent', jugé('etalement urbain', 'g-t-etalement').raison === 'accent');
verifier('« periurbanisation » : presque, l\'accent', jugé('periurbanisation', 'g-t-periurbanisation').raison === 'accent');
verifier('« couronne périurbaine » mal écrite : presque', jugé('couronne périurbene', 'g-t-couronne').resultat === 'presque');
verifier('« 32 % » pour 30 % : faux, pas presque', jugé('32 %', 'g-30').resultat === 'faux');

// ── Les confusions prévues ──────────────────────────────────────────────────

verifier('banlieue et couronne périurbaine : la confusion est expliquée dans les deux sens',
  piege('couronne périurbaine', 'g-t-banlieue') && piege('banlieue', 'g-t-couronne'));
verifier('« périurbanisation » pour l\'étalement urbain : presque, le mot du manuel', jugé('périurbanisation', 'g-t-etalement').resultat === 'presque');
verifier('« ville » pour l\'aire urbaine : expliqué', piege('ville', 'g-t-aire'));

// ── Les QCM ─────────────────────────────────────────────────────────────────

verifier('un QCM juste', comparer('68 %', item('g-voiture-part')).resultat === 'juste');
verifier('un QCM faux', comparer('22 %', item('g-voiture-part')).resultat === 'faux');

// ── Les chiffres de la fiche, recoupés ──────────────────────────────────────
//
// Une fiche de géographie vit de ses chiffres : ceux du tableau des modes de
// déplacement font 100 %, et ceux d'Anse font bien « plus du double ».

{
  const tableau = c.etapes.find((e) => e.id === 'g2-mobilites').fiche.find((b) => b.type === 'tableau');
  const parts = tableau.lignes.map(([, part]) => Number(part.replace(/\D/g, '')));
  verifier('les parts des modes de déplacement font 100 %', parts.reduce((t, x) => t + x, 0) === 100);
  verifier('Anse a plus que doublé : 7 300 > 2 × 3 100', 7300 > 2 * 3100 && /plus que doublé/.test(item('g-anse').attendu));
  verifier('30 % de l\'aire urbaine, c\'est bien 630 000 sur environ 2,1 à 2,3 millions', 630000 / 2300000 > 0.27 && 630000 / 2300000 < 0.31);
}

// ── Utilitaires ─────────────────────────────────────────────────────────────

verifier('la distance compte les lettres à changer', distance('banlieue', 'banlieu') === 1 && distance('abc', 'abc') === 0);
verifier('l\'indice garde la première lettre de chaque mot', indiceDe(item('g-t-couronne')) === 'c······· p··········');
verifier('pour une année, l\'indice donne la décennie', indiceDe({ attendu: '1916' }) === '191·' && indiceDe({ attendu: '11 novembre 1918' }) === '1· n······· 191·');
verifier('une année voisine reste fausse', comparer('1917', { type: 'reponse', attendu: '1916' }).resultat === 'faux');
verifier('un mot tapé n\'est pas un collage', !saisieSuspecte('L\'aire', 'L\'aire urbaine'));
verifier('un texte arrivé d\'un coup, si', saisieSuspecte('', 'L\'aire urbaine de Lyon est formée de trois espaces.'));

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
  const etapeDe = (id) => c.etapes.find((e) => e.items.some((i) => i.id === id));
  let bon = true;
  let voisins = true;
  let aLEnversVus = 0;
  for (let essai = 0; essai < 40; essai += 1) {
    const questions = tirerInterro(c, alea);
    const ids = questions.map((q) => q.id);
    const aLEnvers = questions.filter((q) => q.mode === 'reconnaitre');
    aLEnversVus += aLEnvers.length;
    bon = bon && questions.length === attendu
      && new Set(ids).size === ids.length
      && ids.every((id) => itemParId(c, id) && itemParId(c, id).type !== 'decrire')
      && aLEnvers.every((q) => itemParId(c, q.id).type === 'terme' && q.options.length === 3
        && new Set(q.options).size === 3 && q.options.includes(itemParId(c, q.id).definition));
    for (const q of aLEnvers) {
      const e = etapeDe(q.id);
      const definitions = e.items.filter((i) => i.type === 'terme').map((i) => i.definition);
      if (definitions.length >= 3) voisins = voisins && q.options.every((o) => definitions.includes(o));
    }
  }
  verifier(`le contrôle blanc : ${attendu} questions distinctes, sans écrit, QCM à l'envers sur des définitions (40 tirages)`, bon && aLEnversVus > 0);
  verifier('les fausses définitions viennent de l\'étape quand elle en a assez', voisins);
}

// ── La progression ──────────────────────────────────────────────────────────

{
  let p = profilVierge();
  p = noterEssai(p, 'g-chaine', 'faux');
  p = noterEssai(p, 'g-w-etalement', 'faux');
  verifier('un ordre raté va dans « À revoir », un écrit raté non', aRevoir(p, itemsDe(c)).map((i) => i.id).join() === 'g-chaine');
}

// ── Merlin ──────────────────────────────────────────────────────────────────

{
  const ecrit = item('g-w-mobilites');
  const criteres = ecrit.criteres;
  const tous = (statut) => Object.fromEntries(criteres.map((x) => [x.id, statut]));
  verifier('tout présent : juste', verdict(tous('present'), criteres) === 'juste');
  verifier('une erreur : à reprendre', verdict({ ...tous('present'), voiture: 'faux' }, criteres) === 'a-reprendre');
  verifier('les consignes parlent d\'un texte construit de géographie', /texte construit/.test(CONSIGNES) && /géographie/.test(CONSIGNES));
  verifier('les consignes demandent de suivre le cours de l\'élève', /Suis le cours/.test(CONSIGNES));

  const bonne = {
    elements: criteres.map((x) => ({ id: x.id, statut: 'present', commentaire: '' })),
    corrige: 'La voiture domine.', message: 'Bien.',
  };
  verifier('une réponse complète de Merlin est lue', lireEvaluation(bonne, criteres)?.corrige === 'La voiture domine.');
  let recu = null;
  const appeler = async (requete) => { recu = requete; return { disponible: true, donnees: bonne }; };
  const lue = await evaluerEcrit({ item: ecrit, texte: 'La voiture domine.', profil: c.profilMerlin }, { appeler, appli: 'geo3e' });
  verifier('Merlin répond : verdict calculé par l\'appli', lue.parMerlin && lue.verdict === 'juste');
  verifier('le profil du chapitre part avec la requête, avec les chiffres des documents', /68 %/.test(recu?.profil ?? '') && /Anse/.test(recu?.profil ?? ''));
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
