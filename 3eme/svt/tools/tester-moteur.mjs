// Tests du moteur, hors navigateur.
//
//     node tools/tester-moteur.mjs
//
// Ce qui se joue ici, c'est la justice de la correction : un « faux » donné à
// une réponse juste décourage, un « juste » donné à une erreur la fait
// apprendre. D'où des tests qui vérifient autant ce qui est REFUSÉ que ce qui
// est accepté — les nombres de chromosomes surtout, qu'aucune tolérance ne
// doit toucher, et les confusions classiques du chapitre.

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

verifier('l\'article ne compte pas (le phénotype)', jugé('le phénotype', 't-phenotype').resultat === 'juste');
verifier('l\'article élidé ne compte pas (l\'ADN, l’ADN)', jugé('l\'ADN', 't-adn').resultat === 'juste' && jugé('l’ADN', 't-adn').resultat === 'juste');
verifier('la casse ne compte pas (adn)', jugé('adn', 't-adn').resultat === 'juste');
verifier('œ s\'écrit oe (cellule oeuf)', jugé('cellule oeuf', 't-cellule-oeuf').resultat === 'juste' && normaliser('Cellule-Œuf') === 'cellule oeuf');
verifier('« un gamète » est juste', jugé('un gamète', 't-gamete').resultat === 'juste');
verifier('le sigle développé est accepté pour ADN', jugé('acide désoxyribonucléique', 't-adn').resultat === 'juste');

// ── Presque : les accents, l'orthographe ───────────────────────────────────

const genotype = jugé('genotype', 't-genotype');
verifier('« genotype » : presque, l\'accent', genotype.resultat === 'presque' && genotype.raison === 'accent');
verifier('« meiose » : presque, l\'accent', jugé('meiose', 't-meiose').raison === 'accent');
verifier('« acide desoxyribonucleique » : presque, l\'accent', jugé('acide desoxyribonucleique', 'adn-sigle').raison === 'accent');
verifier('« caryotipe » : presque, l\'orthographe', jugé('caryotipe', 't-caryotype').raison === 'orthographe');
verifier('« Marthe Gauthier » : presque, l\'orthographe', jugé('Marthe Gauthier', 'car-gautier').resultat === 'presque');
verifier('« helice » dans le trou : presque', jugé('helice', 'adn-helice').resultat === 'presque');
verifier('« double hélice » dans le trou : juste', jugé('double hélice', 'adn-helice').resultat === 'juste');
verifier('un autre mot est faux (« gène » pour chromosome)', jugé('gène', 't-chromosome').resultat === 'faux');

// ── Les nombres : aucune tolérance ──────────────────────────────────────────

verifier('« 46 chromosomes » et « 2n = 46 » sont justes', jugé('46 chromosomes', 'car-humain').resultat === 'juste' && jugé('2n = 46', 'car-humain').resultat === 'juste');
verifier('« 47 » pour une cellule ordinaire : faux, pas presque', jugé('47', 'car-humain').resultat === 'faux');
verifier('« 47 chromosomes » : faux, même dans une réponse longue', jugé('47 chromosomes', 'car-humain').resultat === 'faux');
verifier('« 24 » paires : faux', jugé('24', 'car-paires').resultat === 'faux');
verifier('« 23 » pour une cellule ordinaire : la confusion avec les paires', /paires/.test(jugé('23', 'car-humain').message ?? ''));
verifier('« 46 » pour un gamète : la méiose divise par deux', /par deux/.test(jugé('46', 'dvs-gamete').message ?? ''));
verifier('« 46 » pour une trisomie 21 : faux, avec le message', jugé('46', 'car-47').resultat === 'faux' && piege('46', 'car-47'));

// ── Les confusions prévues ──────────────────────────────────────────────────

verifier('« gène » pour une version d\'un gène : la confusion est expliquée', piege('gène', 't-allele'));
verifier('« allèle » pour une portion de chromosome : idem', piege('allèle', 't-gene'));
verifier('« méiose » pour la mitose, et l\'inverse', piege('méiose', 't-mitose') && piege('mitose', 't-meiose'));
verifier('« meiose » sans accent reste la confusion, pas une faute d\'accent', piege('meiose', 't-mitose'));
verifier('« genotype » pour le phénotype : la confusion, pas l\'accent', piege('genotype', 't-phenotype'));
verifier('« phénotype » pour l\'ensemble des allèles', piege('phénotype', 't-genotype'));
verifier('« mutation » pour le brassage, et l\'inverse', piege('mutation', 't-brassage') && piege('brassage', 't-mutation'));
verifier('« fécondation » pour la cellule-œuf', piege('fécondation', 't-cellule-oeuf'));
verifier('« patrimoine » seul : presque', jugé('patrimoine', 't-patrimoine').resultat === 'presque');
verifier('« désoxyribonucléique » seul : presque, il manque « acide »', jugé('désoxyribonucléique', 'adn-sigle').resultat === 'presque');

// ── Les QCM ─────────────────────────────────────────────────────────────────

verifier('un QCM juste', comparer('A', item('gen-ao')).resultat === 'juste');
verifier('un QCM faux', comparer('O', item('gen-ao')).resultat === 'faux');

// ── Le tableau de croisement des Martin, recalculé ──────────────────────────
//
// La question la plus difficile du chapitre : la fiche et la réponse « 1 chance
// sur 4 » doivent sortir du calcul, pas d'une relecture.

{
  const groupe = (a, b) => {
    const s = new Set([a, b]);
    if (s.has('A') && s.has('B')) return 'AB';
    if (s.has('A')) return 'A';
    if (s.has('B')) return 'B';
    return 'O';
  };
  const spermatozoides = ['A', 'O'].flatMap((a) => ['X', 'Y'].map((x) => [a, x]));
  const ovules = ['A', 'B'].map((a) => [a, 'X']);
  const cases = ovules.flatMap(([ao, xo]) => spermatozoides.map(([as, xs]) => ({
    sperm: `${as} ; ${xs}`, ovule: `${ao} ; ${xo}`, groupe: groupe(as, ao), garcon: xs === 'Y',
  })));
  const tableau = c.etapes.find((e) => e.id === 'svt-brassage').fiche.find((b) => b.type === 'tableau');
  const conforme = cases.length === tableau.lignes.length && cases.every((k) => tableau.lignes.some(([s, o, enfant]) => s === k.sperm && o === k.ovule
    && enfant.includes(k.garcon ? 'garçon' : 'fille') && new RegExp(`(garçon|fille) ${k.groupe}\\b`).test(enfant.replace(/\*/g, ''))));
  verifier('le tableau de la fiche est celui que donne le calcul', conforme);
  const garconsA = cases.filter((k) => k.garcon && k.groupe === 'A').length;
  verifier('garçon de groupe A : 2 cases sur 8, la réponse du QCM', garconsA === 2 && cases.length === 8 && /2 cases sur 8/.test(item('bra-proba').attendu));
  verifier('aucune case de groupe O', !cases.some((k) => k.groupe === 'O'));
}

// ── Utilitaires ─────────────────────────────────────────────────────────────

verifier('la distance compte les lettres à changer', distance('caryotype', 'caryotipe') === 1 && distance('abc', 'abc') === 0);
verifier('l\'indice garde la première lettre de chaque mot', indiceDe(item('t-patrimoine')) === 'p········· g········');
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
  verifier('les fausses définitions viennent de l\'étape quand elle en a assez (mitose, méiose, gamète…)', voisins);
}

// ── La progression ──────────────────────────────────────────────────────────

{
  let p = profilVierge();
  p = noterEssai(p, 'car-ordre', 'faux');
  p = noterEssai(p, 'w-hetre', 'faux');
  verifier('un ordre raté va dans « À revoir », un écrit raté non', aRevoir(p, itemsDe(c)).map((i) => i.id).join() === 'car-ordre');
}

// ── Merlin ──────────────────────────────────────────────────────────────────

{
  const ecrit = item('w-martin');
  const criteres = ecrit.criteres;
  const tous = (statut) => Object.fromEntries(criteres.map((x) => [x.id, statut]));
  verifier('tout présent : juste', verdict(tous('present'), criteres) === 'juste');
  verifier('une erreur : à reprendre', verdict({ ...tous('present'), probabilite: 'faux' }, criteres) === 'a-reprendre');
  verifier('les consignes expliquent la démarche J.O.D.', /J'observe \/ Or je sais \/ Donc j'en déduis/.test(CONSIGNES));
  verifier('les consignes demandent de suivre le cours de l\'élève', /Suis le cours/.test(CONSIGNES));

  const bonne = {
    elements: criteres.map((x) => ({ id: x.id, statut: 'present', commentaire: '' })),
    corrige: 'Il y a une chance sur quatre.', message: 'Bien.',
  };
  verifier('une réponse complète de Merlin est lue', lireEvaluation(bonne, criteres)?.corrige === 'Il y a une chance sur quatre.');
  let recu = null;
  const appeler = async (requete) => { recu = requete; return { disponible: true, donnees: bonne }; };
  const lue = await evaluerEcrit({ item: ecrit, texte: 'Il y a une chance sur quatre.', profil: c.profilMerlin }, { appeler, appli: 'svt3e' });
  verifier('Merlin répond : verdict calculé par l\'appli', lue.parMerlin && lue.verdict === 'juste');
  verifier('le profil du chapitre part avec la requête, avec les notations du cours', /46, XX/.test(recu?.profil ?? '') && /1 chance sur 4/.test(recu?.profil ?? ''));
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
