// Tests du moteur, hors navigateur.
//
//     node tools/tester-moteur.mjs
//
// Ce qui se joue ici, c'est la justice de la correction : un « faux » donné à
// une réponse juste décourage, un « juste » donné à une erreur la fait
// apprendre. D'où des tests qui vérifient autant ce qui est REFUSÉ que ce qui
// est accepté — les résultats de calcul surtout, lus quelle que soit leur
// écriture (virgule, unité, calcul posé) mais jamais arrondis à la légère, et
// les confusions classiques du chapitre.

import { comparer, distance, indiceDe, nombreDe, normaliser } from '../js/comparer.js';
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

verifier('l\'article ne compte pas (le solvant)', jugé('le solvant', 'so-t-solvant').resultat === 'juste');
verifier('la casse ne compte pas (FUSION)', jugé('FUSION', 'ma-t-fusion').resultat === 'juste');
verifier('le pluriel accepté (miscible, munitions…)', jugé('miscible', 'ma-t-miscible').resultat === 'juste');
verifier('« dissolution » est accepté pour dissoudre', jugé('la dissolution', 'so-t-dissoudre').resultat === 'juste');

// ── Presque : les accents, l'orthographe ───────────────────────────────────

verifier('« liquefaction » : presque, l\'accent', jugé('liquefaction', 'ma-t-liquefaction').raison === 'accent');
verifier('« vaporisasion » : presque, l\'orthographe', jugé('vaporisasion', 'ma-t-vaporisation').raison === 'orthographe');
verifier('un autre mot est faux (« sublimation » pour la fusion)', jugé('sublimation', 'ma-t-fusion').resultat === 'faux');

// ── Les calculs : lire le nombre, quelle que soit son écriture ─────────────

verifier('le nombre d\'une saisie : virgule, point, unité', nombreDe('18,57 g/cm3') === 18.57 && nombreDe('18.6') === 18.6 && nombreDe('0,8 kg/L') === 0.8);
verifier('le nombre après le dernier « = » : le calcul posé', nombreDe('ρ = 520 ÷ 28 = 18,6') === 18.6 && nombreDe('m = 0,8 × 0,25 = 200 g') === 200);
verifier('« soit » et « → » valent « = »', nombreDe('0,8 g/cm3 soit 800 kg/m3') === 800 && nombreDe('4 ÷ 5 → 0,8') === 0.8 && nombreDe('soixante') === null);
verifier('les espaces des milliers', nombreDe('18 571 kg') === 18571 && nombreDe('2 070 400') === 2070400 && nombreDe('1 000 L') === 1000);
verifier('l\'exposant d\'une unité n\'est pas lu (cm3, m³)', nombreDe('12 cm3') === 12 && nombreDe('800 kg/m3') === 800);
verifier('pas de nombre : null', nombreDe('je ne sais pas') === null);

verifier('ex. 1 : 18,6, 18,57 et le calcul posé sont justes', ['18,6', '18,57 g/cm3', '18.571', '520/28 = 18,6 g/cm³'].every((s) => jugé(s, 'mv-ex1').resultat === 'juste'));
verifier('ex. 1 : 18,5 et 18,63 sont faux (l\'écart ne couvre pas un arrondi raté)', jugé('18,5', 'mv-ex1').resultat === 'faux' && jugé('18,63', 'mv-ex1').resultat === 'faux');
verifier('ex. 1 : 19, arrondi à l\'unité, est presque', jugé('19', 'mv-ex1').resultat === 'presque');
verifier('ex. 1 : 1 857, c\'est le volume laissé en dL', piege('1857', 'mv-ex1') && /dL/.test(jugé('1857', 'mv-ex1').message));
verifier('ex. 1 : 1,857 (deux causes possibles) : un message sur les deux conversions', piege('1,857', 'mv-ex1') && /520 g/.test(jugé('1,857', 'mv-ex1').message) && /28 cm³/.test(jugé('1,857', 'mv-ex1').message));
verifier('ex. 1 : 0,054, c\'est la division à l\'envers', piege('0,054', 'mv-ex1'));
verifier('ex. 1, le cube : 18 571 et 18 600 kg sont justes, 18,57 est la masse d\'un litre', jugé('18 571 kg', 'mv-ex1-cube').resultat === 'juste'
  && jugé('18600', 'mv-ex1-cube').resultat === 'juste' && piege('18,57', 'mv-ex1-cube'));
verifier('ex. 2 : 200 g juste ; 0,2 kg presque ; 20, 312,5 et 3 200 sont des pièges', jugé('200 g', 'mv-ex2-petrole').resultat === 'juste'
  && jugé('0,2', 'mv-ex2-petrole').resultat === 'presque' && ['20', '312,5', '3200'].every((s) => piege(s, 'mv-ex2-petrole')));
verifier('ex. 4 : 800 juste ; 0,8 (en g/cm³) presque ; 8 000 (40 dg pris pour 40 g) piège', jugé('800 kg/m3', 'mv-ex4').resultat === 'juste'
  && jugé('0,8', 'mv-ex4').resultat === 'presque' && piege('8000', 'mv-ex4'));
verifier('« 0,8 g/cm³ soit 800 kg/m³ » : le dernier résultat est lu', jugé('0,8 g/cm3 soit 800 kg/m3', 'mv-ex4').resultat === 'juste');
verifier('dag et dg : les deux confusions sont reconnues', piege('5,2', 'mv-c-dag') && piege('400', 'mv-c-dg'));
verifier('un calcul sans nombre : faux, avec un message', jugé('beaucoup', 'mv-ex2').resultat === 'faux' && Boolean(jugé('beaucoup', 'mv-ex2').message));
verifier('un calcul vide : vide', jugé('  ', 'mv-ex2').resultat === 'vide');

// ── Les exercices de la feuille, recalculés à partir des données ───────────

{
  const ex1 = 520 / 28;
  verifier('ex. 1 : 52 dag ÷ 0,28 dL = 520 g ÷ 28 cm³', Math.abs(item('mv-ex1').nombre - ex1) < 0.001);
  verifier('ex. 1 : le cube de 1 m³ = 1 000 000 cm³', Math.abs(item('mv-ex1-cube').nombre - ex1 * 1e6 / 1000) < 1);
  verifier('ex. 1 : 18,6 × 1 000 reste dans l\'écart du cube', jugé(String(18.6 * 1000), 'mv-ex1-cube').resultat === 'juste');
  verifier('ex. 2 : 9,7 ÷ 10', Math.abs(item('mv-ex2').nombre - 0.97) < 1e-9);
  verifier('ex. 2 : le bois (0,97) est plus dense que le pétrole (0,8) : il coule', 0.97 > 0.8 && /coulera/.test(item('mv-ex2-flotte').attendu));
  verifier('ex. 2 : 25 cL de pétrole = 0,25 × 0,8 kg', Math.abs(item('mv-ex2-petrole').nombre - 0.25 * 0.8 * 1000) < 1e-9);
  verifier('ex. 3 : l\'hélium est moins dense que l\'air', 0.169 < 1.225 && /hélium monte/.test(item('mv-ex3').attendu));
  const ex4 = (40 / 10) / 5 * 1000;
  const tableau = c.etapes.find((e) => e.id === 'm1-exos').fiche.find((b) => b.type === 'tableau');
  const liquide = tableau.lignes.find(([, rho]) => Number(rho.replace(/\s/g, '').replace(',', '.')) === ex4)?.[0];
  verifier('ex. 4 : 40 dg ÷ 5 cm³ = 800 kg/m³, le pétrole du tableau', item('mv-ex4').nombre === ex4 && liquide === 'pétrole' && item('mv-ex4-liquide').attendu === 'Le pétrole');
  verifier('le TP : 81 ÷ 30 et 62 − 50', Math.abs(item('mv-tp-calcul').nombre - 81 / 30) < 1e-9 && item('mv-v2v1').nombre === 62 - 50);
  verifier('le TP de solubilité : 58 ÷ 40', Math.abs(item('so-mv').nombre - 58 / 40) < 1e-9);
}

{
  const tableau = c.etapes.find((e) => e.id === 'm1-tp').fiche.find((b) => b.type === 'tableau');
  const [masses, volumes] = [tableau.colonnes.slice(1), tableau.lignes[0].slice(1)].map((l) => l.map((x) => Number(x.replace(',', '.'))));
  const rapports = masses.map((m, k) => m / volumes[k]);
  verifier('le tableau de proportionnalité du cours : m ÷ V = 7,85 partout', rapports.every((r) => Math.abs(r - 7.85) < 1e-9));
  verifier('et 1 m³ de ce matériau pèse 7 850 kg', item('mv-1m3').nombre === 7.85 * 1000);
}

// ── Les confusions prévues ──────────────────────────────────────────────────

verifier('« soluté » pour le solvant, et l\'inverse', piege('soluté', 'so-t-solvant') && piege('solvant', 'so-t-solute'));
verifier('« solute » sans accent reste la confusion, pas une faute d\'accent', piege('solute', 'so-t-solvant'));
verifier('« fondre » pour dissoudre : la confusion est expliquée', piege('fondre', 'so-t-dissoudre'));
verifier('« condensation » pour gaz → liquide : la confusion du cours', piege('condensation', 'ma-t-liquefaction'));
verifier('« fusion » et « solidification » : dans les deux sens', piege('solidification', 'ma-t-fusion') && piege('fusion', 'ma-t-solidification'));
verifier('« ébullition » pour la vaporisation : presque', jugé('ébullition', 'ma-t-vaporisation').resultat === 'presque');
verifier('« homogène » et « hétérogène » : dans les deux sens', piege('homogène', 'ma-t-heterogene') && piege('hétérogène', 'ma-t-homogene'));

// ── Les QCM ─────────────────────────────────────────────────────────────────

verifier('un QCM juste', comparer('ρ = m ÷ V', item('mv-formule')).resultat === 'juste');
verifier('un QCM faux', comparer('ρ = V ÷ m', item('mv-formule')).resultat === 'faux');

// ── Utilitaires ─────────────────────────────────────────────────────────────

verifier('la distance compte les lettres à changer', distance('vaporisation', 'vaporisasion') === 1 && distance('abc', 'abc') === 0);
verifier('l\'indice garde la première lettre de chaque mot', indiceDe(item('so-t-solubilite')) === `s${'·'.repeat(9)} m${'·'.repeat(7)}`);
verifier('un calcul donne son propre indice', indiceDe(item('mv-ex1')) === item('mv-ex1').indice);
verifier('normaliser ôte les articles', normaliser('La Fusion') === 'fusion');
verifier('un mot tapé n\'est pas un collage', !saisieSuspecte('Le ballon', 'Le ballon d'));
verifier('une réponse arrivée d\'un coup, si', saisieSuspecte('', 'Le ballon gonflé à l\'hélium va monter car il est moins dense.'));

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
  verifier('les fausses définitions viennent de l\'étape quand elle en a assez (fusion, solidification…)', voisins);
}

// ── La progression ──────────────────────────────────────────────────────────

{
  let p = profilVierge();
  p = noterEssai(p, 'ma-courbe', 'faux');
  p = noterEssai(p, 'so-w-protocole', 'faux');
  verifier('un ordre raté va dans « À revoir », un écrit raté non', aRevoir(p, itemsDe(c)).map((i) => i.id).join() === 'ma-courbe');
}

// ── Merlin ──────────────────────────────────────────────────────────────────

{
  const ecrit = item('mv-w-ballons');
  const criteres = ecrit.criteres;
  const tous = (statut) => Object.fromEntries(criteres.map((x) => [x.id, statut]));
  verifier('tout présent : juste', verdict(tous('present'), criteres) === 'juste');
  verifier('une erreur : à reprendre', verdict({ ...tous('present'), valeurs: 'faux' }, criteres) === 'a-reprendre');
  verifier('les consignes parlent de physique-chimie, de justification et de protocole', /physique-chimie/.test(CONSIGNES) && /justification/.test(CONSIGNES) && /protocole/.test(CONSIGNES));
  verifier('les consignes demandent de suivre le cours de l\'élève', /Suis le cours/.test(CONSIGNES));

  const bonne = {
    elements: criteres.map((x) => ({ id: x.id, statut: 'present', commentaire: '' })),
    corrige: 'Le ballon d\'hélium monte.', message: 'Bien.',
  };
  verifier('une réponse complète de Merlin est lue', lireEvaluation(bonne, criteres)?.corrige === 'Le ballon d\'hélium monte.');
  let recu = null;
  const appeler = async (requete) => { recu = requete; return { disponible: true, donnees: bonne }; };
  const lue = await evaluerEcrit({ item: ecrit, texte: 'Le ballon d\'hélium monte.', profil: c.profilMerlin }, { appeler, appli: 'pc3e' });
  verifier('Merlin répond : verdict calculé par l\'appli', lue.parMerlin && lue.verdict === 'juste');
  verifier('le profil du chapitre part avec la requête, avec les valeurs de la feuille', /0,169/.test(recu?.profil ?? '') && /1,225/.test(recu?.profil ?? ''));
  verifier('le profil suit le cours : condensation = gaz → solide', /condensation \(gaz → solide/.test(c.profilMerlin));
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
