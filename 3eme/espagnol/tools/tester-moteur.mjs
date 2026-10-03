// Tests du moteur, hors navigateur.
//
//     node tools/tester-moteur.mjs
//
// Ce qui se joue ici, c'est la justice de la correction : un « faux » donné à
// une réponse juste décourage, un « juste » donné à une faute la fait
// apprendre. D'où des tests qui vérifient autant ce qui est REFUSÉ que ce qui
// est accepté — en particulier sur les pronoms, le cœur de l'unité.

import { comparer, marquerDifferences, normaliser } from '../js/comparer.js';
import { MAX_REPRISES, avancer, bilan, courant, enregistrer, estFini, note, nouveauTour, tirerInterro } from '../js/tour.js';
import { aRevoir, derniereInterro, noterEssai, noterInterro, profilVierge } from '../js/progres.js';
import {
  CONSIGNES, SEUIL_COLLAGE, autoCorrection, commeResultat, evaluerEcrit, lireEvaluation, message, saisieSuspecte, schemaEvaluation, verdict,
} from '../js/ecrit.js';
import { UNIDADES, itemParId, itemsDe } from '../js/data/unidades/index.js';

let passes = 0;
const echecs = [];

const verifier = (nom, condition) => {
  if (condition) passes += 1;
  else echecs.push(nom);
};

const u = UNIDADES[0];
const item = (id) => itemParId(u, id);
const jugé = (saisie, id) => comparer(saisie, item(id));

// ── Le vocabulaire : un mot, avec son article ──────────────────────────────

verifier('« el gorro » est juste', jugé('el gorro', 'cos-gorro').resultat === 'juste');
verifier('« la gorra » pour le bonnet déclenche le message prévu', /casquette/.test(jugé('la gorra', 'cos-gorro').message ?? ''));
verifier('l\'article oublié donne « presque »', jugé('estuche', 'cos-estuche').raison === 'article-oublie');
verifier('l\'article du mauvais genre donne « presque »', jugé('la estuche', 'cos-estuche').raison === 'article-faux');
verifier('« el boli » est accepté pour le stylo', jugé('el boli', 'cos-boligrafo').resultat === 'juste');
verifier('« el lapiz » : presque, l\'accent', jugé('el lapiz', 'cos-lapiz').raison === 'accent');
verifier('« cómoda » est juste pour confortable', jugé('cómoda', 'cos-comodo').resultat === 'juste');
verifier('« el autoretrato » : le piège des deux r', /deux r/i.test(jugé('el autoretrato', 'art-autorretrato').message ?? ''));

// ── Les trous : la durée, les pronoms, les démonstratifs ───────────────────

verifier('« desde hace » est juste', jugé('desde hace', 'dur-gorro').resultat === 'juste');
verifier('« desde » devant une durée déclenche le message prévu', /durée/.test(jugé('desde', 'dur-gorro').message ?? ''));
verifier('la majuscule ne compte pas (Desde que / desde que)', jugé('desde que', 'dur-camara').resultat === 'juste');
verifier('« le » pour mis primas : le message du pluriel', /plusieurs/.test(jugé('le', 'coi-primas').message ?? ''));
verifier('« te la » est juste', jugé('te la', 'comb-tela').resultat === 'juste');
verifier('« la te » : la personne d\'abord', /personne d'abord/.test(jugé('la te', 'comb-tela').message ?? ''));
verifier('« este » pour camiseta : le message du féminin', /féminin/.test(jugé('este', 'dem-esta').message ?? ''));
verifier('« cuantas » sans accent : presque', jugé('cuantas', 'int-cuantas').raison === 'accent');
verifier('« cuántos » pour camisetas : le message du féminin', /féminin/.test(jugé('cuántos', 'int-cuantas').message ?? ''));
verifier('« serven » : le message de la voyelle qui change', /voyelle/.test(jugé('serven', 'man-sirven').message ?? ''));

// ── Les phrases à transformer : se lo, l'impératif, l'infinitif ────────────

verifier('« Se lo doy. » est juste', jugé('Se lo doy.', 'comb-abrigo').resultat === 'juste');
verifier('« se lo doy a Luisito » est accepté', jugé('se lo doy a Luisito', 'comb-abrigo').resultat === 'juste');
const leLo = jugé('Le lo doy.', 'comb-abrigo');
verifier('« Le lo doy » est faux, avec le message du « se »', leLo.resultat === 'faux' && /se devant lo/.test(leLo.message ?? ''));
verifier('« Les la llevo » est faux, avec son message', /les devient se/.test(jugé('Les la llevo.', 'comb-ropa').message ?? ''));
verifier('« Regálasela » est juste', jugé('Regálasela.', 'comb-imperatif').resultat === 'juste');
const sansAccent = jugé('Regalasela', 'comb-imperatif');
verifier('« Regalasela » est presque, avec le message de l\'accent', sansAccent.resultat === 'presque' && /accent/.test(sansAccent.message ?? ''));
verifier('« Se la regala » : le message de l\'impératif', /impératif/.test(jugé('Se la regala.', 'comb-imperatif').message ?? ''));
for (const forme of ['Voy a dárselo.', 'Se lo voy a dar.', 'se lo voy a dar a Luisito']) {
  verifier(`« ${forme} » est juste`, jugé(forme, 'comb-infinitif').resultat === 'juste');
}
verifier('« Voy a darselo » est presque', jugé('Voy a darselo', 'comb-infinitif').resultat === 'presque');
verifier('« Hace diez años que tengo este puf » est juste', jugé('hace diez años que tengo este puf', 'dur-trans-hace').resultat === 'juste');
verifier('« Lo quiero comprar » est accepté', jugé('Lo quiero comprar', 'cod-infinitif').resultat === 'juste');

// ── No solo…, sino que ─────────────────────────────────────────────────────

verifier('avec « también »', jugé('Frida no solo pinta, sino que también diseña su ropa.', 'ns-frida').resultat === 'juste');
verifier('sans « también »', jugé('Frida no solo pinta sino que diseña su ropa', 'ns-frida').resultat === 'juste');
verifier('« sólo », l\'ancienne graphie, n\'est pas une faute', jugé('Frida no sólo pinta, sino que también diseña su ropa.', 'ns-frida').resultat === 'juste');
verifier('« pero » au lieu de « sino que » : le message prévu', /jamais pero/.test(jugé('Frida no solo pinta, pero también diseña su ropa.', 'ns-frida').message ?? ''));
verifier('« sino » sans « que » : presque', jugé('Frida no solo pinta, sino también diseña su ropa.', 'ns-frida').resultat === 'presque');
verifier('normaliser ramène « sólo » à « solo »', normaliser('No sólo pinta') === 'no solo pinta');

// ── Remettre dans l'ordre ───────────────────────────────────────────────────

verifier('« me los puedo probar » est juste', jugé('me los puedo probar', 'ord-probar').resultat === 'juste');
verifier('« los me puedo probar » est faux', jugé('los me puedo probar', 'ord-probar').resultat === 'faux');
verifier('une autre place de « solo » est acceptée', jugé('lo siento esa la tengo solo en azul', 'ord-siento').resultat === 'juste');
const diff = marquerDifferences('los me puedo probar', item('ord-probar').es);
verifier('le corrigé marque les mots mal placés', diff.some((m) => !m.ok) && diff.some((m) => m.ok));

// ── Les QCM ─────────────────────────────────────────────────────────────────

verifier('un QCM juste', comparer('se las', item('comb-ch-camisetas')).resultat === 'juste');
verifier('un QCM faux', comparer('les las', item('comb-ch-camisetas')).resultat === 'faux');
verifier('un tiret de dialogue n\'est pas un mot', normaliser('— ¿Me prestas tu libreta?') === 'me prestas tu libreta');

// ── Le collage refusé ───────────────────────────────────────────────────────

verifier('un mot tapé n\'est pas un collage', !saisieSuspecte('Mi objeto', 'Mi objeto favorito'));
verifier(`plus de ${SEUIL_COLLAGE} caractères d'un coup, si`, saisieSuspecte('', 'Mi objeto favorito es mi cámara de fotos.'));
verifier('effacer n\'est jamais suspect', !saisieSuspecte('Mi objeto favorito es mi cámara de fotos.', ''));

// ── Le tour : ce qui est raté revient ───────────────────────────────────────

{
  const t = nouveauTour([{ id: 'a' }, { id: 'b' }]);
  enregistrer(t, courant(t), 'faux');
  avancer(t);
  enregistrer(t, courant(t), 'juste');
  avancer(t);
  verifier('une question ratée repasse en fin de file', t.file.length === 3 && t.file[2].id === 'a');
  enregistrer(t, courant(t), 'juste');
  avancer(t);
  verifier('le tour finit quand la file est vide', estFini(t));
  verifier('seul le premier essai compte', bilan(t).faux === 1 && bilan(t).justes === 1);
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
  let graine = 11;
  const alea = () => { graine = (graine * 16807) % 2147483647; return (graine - 1) / 2147483646; };
  const attendu = u.interro.tirage.reduce((s, t) => s + t.nombre, 0);
  let bon = true;
  for (let essai = 0; essai < 25; essai += 1) {
    const questions = tirerInterro(u, alea);
    const ids = questions.map((q) => q.id);
    const aLEnvers = questions.filter((q) => q.mode === 'reconnaitre');
    bon = bon && questions.length === attendu
      && new Set(ids).size === ids.length
      && ids.every((id) => itemParId(u, id) && itemParId(u, id).type !== 'decrire')
      && aLEnvers.every((q) => q.options.length === 3 && new Set(q.options).size === 3 && q.options.includes(itemParId(u, q.id).fr));
  }
  verifier(`le contrôle blanc : ${attendu} questions distinctes, sans écrit, QCM à l'envers bien formés (25 tirages)`, bon);
}

// ── La progression ──────────────────────────────────────────────────────────

{
  let p = profilVierge();
  p = noterEssai(p, 'comb-abrigo', 'faux');
  p = noterEssai(p, 'esc-objeto', 'faux');
  verifier('un raté va dans « À revoir », un écrit raté non', aRevoir(p, itemsDe(u)).map((i) => i.id).join() === 'comb-abrigo');
  p = noterEssai(p, 'comb-abrigo', 'juste');
  verifier('réussi du premier coup, il en sort', aRevoir(p, itemsDe(u)).length === 0);
  p = noterInterro(p, 'u01', { points: 11, sur: 15 }, 'd1');
  p = noterInterro(p, 'u01', { points: 13.5, sur: 15 }, 'd2');
  verifier('le dernier contrôle blanc est le plus récent', derniereInterro(p, 'u01').points === 13.5);
}

// ── Merlin classe, l'appli tranche ──────────────────────────────────────────

{
  const ecrit = item('esc-objeto');
  const criteres = ecrit.criteres;
  const tous = (statut) => Object.fromEntries(criteres.map((c) => [c.id, statut]));
  verifier('tout présent : juste', verdict(tous('present'), criteres) === 'juste');
  verifier('un oubli : presque', verdict({ ...tous('present'), para: 'absent' }, criteres) === 'presque');
  verifier('une erreur : à reprendre', verdict({ ...tous('present'), pronombres: 'faux' }, criteres) === 'a-reprendre');
  verifier('le verdict devient un résultat d\'exercice', commeResultat('a-reprendre') === 'faux');

  const bonne = {
    elements: criteres.map((c) => ({ id: c.id, statut: 'present', commentaire: '' })),
    corrige: 'Mi objeto favorito es mi gorro.', message: 'Bien.',
  };
  verifier('une réponse complète de Merlin est lue', lireEvaluation(bonne, criteres)?.corrige === 'Mi objeto favorito es mi gorro.');
  verifier('un critère manquant la rend illisible', lireEvaluation({ ...bonne, elements: bonne.elements.slice(1) }, criteres) === null);
  verifier('un statut inventé la rend illisible',
    lireEvaluation({ ...bonne, elements: bonne.elements.map((e, i) => (i ? e : { ...e, statut: 'bof' })) }, criteres) === null);
  verifier('le schéma impose les identifiants des critères', schemaEvaluation(criteres).properties.elements.items.properties.id.enum.join() === criteres.map((c) => c.id).join());
  verifier('les consignes parlent d\'un élève de 3e', /élève de 3e/.test(CONSIGNES));
  verifier("le message cite l'écrit de l'élève à la fin", message(ecrit, 'Es mi gorro').endsWith('« Es mi gorro »'));
  verifier('auto-correction : ce qui n\'est pas coché manque', autoCorrection(['objeto', 'para', 'duracion'], criteres).verdict === 'presque');

  let recu = null;
  const appeler = async (requete) => { recu = requete; return { disponible: true, donnees: bonne }; };
  const lue = await evaluerEcrit({ item: ecrit, texte: 'Mi objeto favorito es mi gorro.', profil: u.profilMerlin }, { appeler, appli: 'espagnol3e' });
  verifier('Merlin répond : verdict calculé par l\'appli', lue.parMerlin && lue.verdict === 'juste');
  verifier('le profil de l\'unité part avec la requête', recu?.profil === u.profilMerlin && /Gente creativa/.test(recu.profil));
  const sansCle = await evaluerEcrit({ item: ecrit, texte: 'x', profil: '' }, { appeler: async () => ({ disponible: false }) });
  verifier('sans Merlin : on se corrige soi-même', sansCle.aCorrigerSoiMeme);
  const plante = await evaluerEcrit({ item: ecrit, texte: 'x', profil: '' }, { appeler: async () => { throw new Error('réseau'); } });
  verifier('un appel qui lève ne casse rien', plante.aCorrigerSoiMeme);
  verifier('rien écrit : rien envoyé', (await evaluerEcrit({ item: ecrit, texte: '  ', profil: '' }, { appeler })).vide);
}

// ── Bilan ───────────────────────────────────────────────────────────────────

if (echecs.length) {
  console.error(`✗ ${echecs.length} échec(s), ${passes} réussi(s) :`);
  for (const e of echecs) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✓ ${passes} tests réussis.`);
