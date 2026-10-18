// Tests du moteur, hors navigateur.
//
//     node tools/tester-moteur.mjs
//
// Ce qui se joue ici, c'est la justice de la correction : un « faux » donné à
// une réponse juste décourage, un « juste » donné à une erreur la fait
// apprendre. D'où des tests qui vérifient autant ce qui est REFUSÉ que ce qui
// est accepté — les confusions classiques du chapitre surtout : magma et
// lave, foyer et épicentre, magnitude et intensité, l'appareil et son tracé.

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

verifier('l\'article ne compte pas (le magma)', jugé('le magma', 'v-t-magma').resultat === 'juste');
verifier('l\'article élidé ne compte pas (l\'épicentre, l’épicentre)', jugé('l\'épicentre', 'v-t-epicentre').resultat === 'juste' && jugé('l’épicentre', 'v-t-epicentre').resultat === 'juste');
verifier('la casse ne compte pas (LAVE)', jugé('LAVE', 'v-t-lave').resultat === 'juste');
verifier('les synonymes du cours : hypocentre, sismomètre, chambre magmatique', jugé('hypocentre', 'v-t-foyer').resultat === 'juste'
  && jugé('sismomètre', 'v-t-sismographe').resultat === 'juste' && jugé('chambre magmatique', 'v-t-reservoir').resultat === 'juste');
verifier('« tremblement de terre » est accepté pour séisme', jugé('un tremblement de terre', 'v-t-seisme').resultat === 'juste');

// ── Presque : les accents, l'orthographe ───────────────────────────────────

verifier('« epicentre » : presque, l\'accent', jugé('epicentre', 'v-t-epicentre').raison === 'accent');
verifier('« cratere » : presque, l\'accent', jugé('cratere', 'v-t-cratere').raison === 'accent');
verifier('« sismographes » au pluriel n\'est pas une faute de sens', jugé('sismographe', 'v-t-sismographe').resultat === 'juste');
verifier('« isoséïste » : presque, l\'orthographe', jugé('isoséïste', 'v-t-isoseiste').resultat === 'presque');
verifier('un autre mot est faux (« cratère » pour la cheminée)', jugé('cratère', 'v-t-cheminee').resultat === 'faux');

// ── Les confusions prévues ──────────────────────────────────────────────────

verifier('« lave » pour le magma, et l\'inverse', piege('lave', 'v-t-magma') && piege('magma', 'v-t-lave'));
verifier('« épicentre » pour le foyer, et l\'inverse', piege('épicentre', 'v-t-foyer') && piege('foyer', 'v-t-epicentre'));
verifier('« epicentre » sans accent reste la confusion, pas une faute d\'accent', piege('epicentre', 'v-t-foyer'));
verifier('« intensité » pour la magnitude, et l\'inverse', piege('intensité', 'v-t-magnitude') && piege('magnitude', 'v-t-intensite'));
verifier('« sismogramme » pour l\'appareil, et l\'inverse', piege('sismogramme', 'v-t-sismographe') && piege('sismographe', 'v-t-sismogramme'));
verifier('« compression » et « distension » : dans les deux sens', piege('distension', 'v-t-compression') && piege('compression', 'v-t-distension'));

// ── Le cours, vérifié dans les données ──────────────────────────────────────

{
  const deux = c.etapes.find((e) => e.id === 'v1-deux-volcans');
  const [effusif, explosif] = [item('v-fournaise'), item('v-soufriere')];
  verifier('le Piton de la Fournaise est effusif, la Soufrière de Montserrat explosive', effusif.attendu === 'effusif' && explosif.attendu === 'explosif');
  const classes = deux.fiche.find((b) => b.titre === 'Six volcans classés').lignes.flat().join(' ');
  verifier('la classification range la montagne Pelée et le Saint Helens côté explosif', /Saint Helens/.test(deux.fiche.find((b) => b.titre === 'Six volcans classés').lignes[0][0]) && /Pelée/.test(classes));
  verifier('magma visqueux → explosive, magma fluide → effusive', item('v-visqueux').attendu === 'explosive' && item('v-fluide').attendu === 'effusive');
  const etapes = item('v-ordre-eruption').elements;
  verifier('l\'éruption commence par la fusion et finit par le dégazage', /fusion/.test(etapes[0]) && /dégazage/.test(etapes[etapes.length - 1]));
  const seisme = item('v-ordre-seisme').elements;
  verifier('le séisme : des contraintes d\'abord, l\'épicentre en dernier', /contraintes/.test(seisme[0]) && /épicentre/.test(seisme[seisme.length - 1]));
  verifier('faille normale ↔ distension, inverse ↔ compression', /écartent/.test(item('v-normale').phrase) && /rapprochent/.test(item('v-inverse').phrase));
}

// ── Les QCM ─────────────────────────────────────────────────────────────────

verifier('un QCM juste', comparer('effusif', item('v-fournaise')).resultat === 'juste');
verifier('un QCM faux', comparer('explosif', item('v-fournaise')).resultat === 'faux');

// ── Utilitaires ─────────────────────────────────────────────────────────────

verifier('la distance compte les lettres à changer', distance('cratère', 'cratere') === 1 && distance('abc', 'abc') === 0);
verifier('l\'indice garde la première lettre de chaque mot', indiceDe(item('v-t-reservoir')) === `r${'·'.repeat(8)} m${'·'.repeat(9)}`);
verifier('normaliser ôte les articles', normaliser('La Lave') === 'lave');
verifier('un mot tapé n\'est pas un collage', !saisieSuspecte('J\'observe', 'J\'observe que'));
verifier('une réponse arrivée d\'un coup, si', saisieSuspecte('', 'J\'observe que les graines donnent des arbres droits.'));

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
  verifier('les fausses définitions viennent de l\'étape quand elle en a assez (foyer, épicentre, magnitude…)', voisins);
}

// ── La progression ──────────────────────────────────────────────────────────

{
  let p = profilVierge();
  p = noterEssai(p, 'v-ordre-eruption', 'faux');
  p = noterEssai(p, 'v-w-seisme', 'faux');
  verifier('un ordre raté va dans « À revoir », un écrit raté non', aRevoir(p, itemsDe(c)).map((i) => i.id).join() === 'v-ordre-eruption');
}

// ── Merlin ──────────────────────────────────────────────────────────────────

{
  const ecrit = item('v-w-viscosite');
  const criteres = ecrit.criteres;
  const tous = (statut) => Object.fromEntries(criteres.map((x) => [x.id, statut]));
  verifier('tout présent : juste', verdict(tous('present'), criteres) === 'juste');
  verifier('une erreur : à reprendre', verdict({ ...tous('present'), viscosite: 'faux' }, criteres) === 'a-reprendre');
  verifier('les consignes expliquent la démarche, et celle du cours (On constate / On en déduit)', /J'observe \/ Or je sais \/ Donc j'en déduis/.test(CONSIGNES) && /On en déduit que/.test(CONSIGNES));
  verifier('les consignes parlent d\'un élève de 5e', /élève de 5e/.test(CONSIGNES) && /Niveau 5e/.test(CONSIGNES));
  verifier('les consignes demandent de suivre le cours de l\'élève', /Suis le cours/.test(CONSIGNES));

  const bonne = {
    elements: criteres.map((x) => ({ id: x.id, statut: 'present', commentaire: '' })),
    corrige: 'La lave fluide coule.', message: 'Bien.',
  };
  verifier('une réponse complète de Merlin est lue', lireEvaluation(bonne, criteres)?.corrige === 'La lave fluide coule.');
  let recu = null;
  const appeler = async (requete) => { recu = requete; return { disponible: true, donnees: bonne }; };
  const lue = await evaluerEcrit({ item: ecrit, texte: 'La lave fluide coule.', profil: c.profilMerlin }, { appeler, appli: 'svt5e' });
  verifier('Merlin répond : verdict calculé par l\'appli', lue.parMerlin && lue.verdict === 'juste');
  verifier('le profil du chapitre part avec la requête, avec les exemples du cours', /Piton de la Fournaise/.test(recu?.profil ?? '') && /MSK/.test(recu?.profil ?? ''));
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
