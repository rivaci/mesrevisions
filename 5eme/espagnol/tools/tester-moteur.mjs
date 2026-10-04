// Tests du moteur, hors navigateur.
//
//     node tools/tester-moteur.mjs
//
// Ce qui se joue ici, c'est la justice de la correction : un « faux » donné à
// une réponse juste décourage, un « juste » donné à une faute la fait
// apprendre. D'où des tests qui vérifient autant ce qui est REFUSÉ que ce qui
// est accepté.

import { comparer, indiceDe, marquerDifferences, nOublie, normaliser } from '../js/comparer.js';
import { MAX_REPRISES, avancer, bilan, courant, enregistrer, estFini, melanger, note, nouveauTour, tirerInterro } from '../js/tour.js';
import { aRevoir, noterEssai, noterInterro, profilVierge, terminerEtape, derniereInterro } from '../js/progres.js';
import { autoCorrection, commeResultat, evaluerDescription, lireEvaluation, message, schemaEvaluation, verdict } from '../js/ecrit.js';
import { UNIDADES, itemParId, itemsDe } from '../js/data/unidades/index.js';

let passes = 0;
const echecs = [];

const verifier = (nom, condition) => {
  if (condition) passes += 1;
  else echecs.push(nom);
};

const u = UNIDADES[0];
const item = (id) => itemParId(u, id);
const verdictDe = (saisie, id) => comparer(saisie, item(id));

// ── Un mot, avec son article ────────────────────────────────────────────────

verifier('« la gorra » est juste', verdictDe('la gorra', 'ropa-gorra').resultat === 'juste');
verifier('la casse et les espaces ne comptent pas', verdictDe('  La   Gorra ', 'ropa-gorra').resultat === 'juste');
verifier('une réponse acceptée est juste (los pantalones)', verdictDe('los pantalones', 'ropa-pantalon').resultat === 'juste');
verifier('« las zapatillas » suffit pour les baskets', verdictDe('las zapatillas', 'ropa-zapatillas').resultat === 'juste');

const sansAccent = verdictDe('el pantalon', 'ropa-pantalon');
verifier('un accent oublié donne « presque »', sansAccent.resultat === 'presque' && sansAccent.raison === 'accent');
const sansTilde = verdictDe('el panuelo', 'ropa-panuelo');
verifier('un ñ oublié donne « presque »', sansTilde.resultat === 'presque' && sansTilde.raison === 'accent');
verifier('un ñ oublié est reconnu comme tel', nOublie('el panuelo', 'el pañuelo') && !nOublie('el pantalon', 'el pantalón'));

const sansArticle = verdictDe('vestido', 'ropa-vestido');
verifier("l'article oublié donne « presque »", sansArticle.resultat === 'presque' && sansArticle.raison === 'article-oublie');
const mauvaisGenre = verdictDe('la vestido', 'ropa-vestido');
verifier("l'article de l'autre genre donne « presque »", mauvaisGenre.resultat === 'presque' && mauvaisGenre.raison === 'article-faux');
const articleFrancais = verdictDe('le vestido', 'ropa-vestido');
verifier("l'article français est signalé comme article", articleFrancais.resultat === 'presque' && articleFrancais.raison === 'article-faux');
const pluielGenre = verdictDe('las pantalones', 'ropa-pantalon');
verifier('le bon mot avec le mauvais article, sur une forme acceptée, pointe cette forme',
  pluielGenre.raison === 'article-faux' && pluielGenre.attendu === 'los pantalones');
const cumul = verdictDe('pantalon', 'ropa-pantalon');
verifier('sans accent ET sans article, le mot reste reconnu, et les deux oublis sont dits', cumul.raison === 'article-oublie' && cumul.accent === true);
verifier("l'article oublié seul ne signale pas d'accent", sansArticle.accent === false);

verifier('un autre mot est faux', verdictDe('la falda', 'ropa-vestido').resultat === 'faux');
verifier('une faute de frappe est fausse — l\'orthographe est le sujet', verdictDe('la gora', 'ropa-gorra').resultat === 'faux');
verifier('le pluriel au lieu du singulier est faux (las gafa)', verdictDe('las gafa', 'ropa-gafas').resultat === 'faux');
verifier('une saisie vide est « vide », pas fausse', verdictDe('   ', 'ropa-gorra').resultat === 'vide');
verifier('un verbe sans article est juste tel quel', verdictDe('llevar', 'ropa-llevar').resultat === 'juste');

// ── Les erreurs prévues ─────────────────────────────────────────────────────

const camisa = verdictDe('la camisa', 'ropa-camiseta');
verifier('camisa pour le tee-shirt déclenche le message prévu', camisa.resultat === 'faux' && camisa.raison === 'piege' && /chemise/.test(camisa.message));
const pelos = verdictDe('los pelos', 'fis-pelo');
verifier('« los pelos » est presque, avec l\'explication du singulier', pelos.resultat === 'presque' && /singulier/.test(pelos.message));
const pantalones = comparer('los pantalónes', item('plu-pantalon'));
verifier('« los pantalónes » : le message prévu passe avant « attention à l\'accent »',
  pantalones.raison === 'piege' && pantalones.resultat === 'presque');
const tienéis = comparer('tienéis', item('ver-tener-vosotros'));
verifier('un piège se reconnaît aussi sans ses accents (tienéis)', tienéis.raison === 'piege' && tienéis.resultat === 'faux');
verifier('grande pour une personne déclenche le message prévu', comparer('grande', item('adj-alto')).raison === 'piege');
verifier('pequeña pour une personne aussi (forme féminine du piège)', comparer('pequeña', item('adj-bajo')).raison === 'piege');

// ── Les adjectifs : masculin, féminin, ou les deux ─────────────────────────

for (const saisie of ['alto', 'alta', 'alto, alta', 'alto/a', 'alto(a)', 'Alto (a)', 'alta alto']) {
  verifier(`« ${saisie} » est juste pour grand (personne)`, comparer(saisie, item('adj-alto')).resultat === 'juste');
}
verifier('« alto, bajo » n\'est pas juste', comparer('alto, bajo', item('adj-alto')).resultat === 'faux');
verifier('« pequeno » est presque (ñ)', comparer('pequeno', item('adj-pequeno')).resultat === 'presque');
verifier('grande, invariable, est juste', comparer('grande', item('adj-grande')).resultat === 'juste');

// ── Verbes et phrases ───────────────────────────────────────────────────────

verifier('« tienen » est juste', comparer('tienen', item('ver-tener-ellos')).resultat === 'juste');
verifier('« llevais » est presque (accent)', comparer('llevais', item('ver-llevar-vosotros')).resultat === 'presque');
verifier('un QCM juste', comparer('tiene', item('ver-choix-bigote')).resultat === 'juste');
verifier('un QCM faux', comparer('lleva', item('ver-choix-bigote')).resultat === 'faux');
verifier('une phrase juste, ponctuation oubliée', comparer('los chicos llevan gorras rojas', item('plu-frase-gorra')).resultat === 'juste');
verifier('une phrase juste avec « unas »', comparer('Los chicos llevan unas gorras rojas.', item('plu-frase-gorra')).resultat === 'juste');
verifier('une phrase avec un verbe au singulier est fausse', comparer('Los chicos lleva gorras rojas.', item('plu-frase-gorra')).resultat === 'faux');
verifier('« tenemos el pelo corto » est juste', comparer('Tenemos el pelo corto', item('plu-frase-pelo')).resultat === 'juste');
verifier('« tienen el pelo corto » déclenche le message sur nosotros', /nosotros/.test(comparer('Tienen el pelo corto.', item('plu-frase-pelo')).message ?? ''));

// ── Memoriza : conjuguer et comparer ────────────────────────────────────────

{
  const m = UNIDADES.find((x) => x.id === 'u02m');
  const jugé = (saisie, id) => comparer(saisie, itemParId(m, id));
  verifier('« vivimos » est juste', jugé('vivimos', 'reg-vivir-nosotros').resultat === 'juste');
  verifier('« vivemos » : vivir est en -ir, c\'est expliqué', /-ir/.test(jugé('vivemos', 'reg-vivir-nosotros').message ?? ''));
  verifier('« comimos » : comer est en -er, c\'est expliqué', /-er/.test(jugé('comimos', 'reg-comer-nosotros').message ?? ''));
  verifier('« comeis » est presque (accent)', jugé('comeis', 'reg-comer-vosotros').raison === 'accent');
  verifier('« vivis » est presque (accent)', jugé('vivis', 'reg-vivir-vosotros').raison === 'accent');
  verifier('« es » pour tú : la confusion avec él est expliquée', /tú/.test(jugé('es', 'st-ser-tu').message ?? ''));
  verifier('« tienemos » : pas de ie à nosotros', jugé('tienemos', 'st-tener-nosotros').raison === 'piege');
  verifier('« me llamo » est juste', jugé('Me llamo', 'll-yo').resultat === 'juste');
  verifier('« llamo » sans pronom : presque, avec le pronom à retenir', jugé('llamo', 'll-yo').resultat === 'presque' && /me llamo/.test(jugé('llamo', 'll-yo').message));
  verifier('« se llamo » pour yo : faux', jugé('se llamo', 'll-yo').resultat === 'faux');
  verifier('« os llamais » est presque (accent)', jugé('os llamais', 'll-vosotros').raison === 'accent');
  verifier('« son no » : la négation se place devant', /devant/.test(jugé('son no', 'neg-trou-ser').message ?? ''));
  verifier('« mas » est presque (accent)', jugé('mas', 'cmp-mas').raison === 'accent');
  verifier('« como » après más : c\'est que', /que/.test(jugé('como', 'cmp-que').message ?? ''));
  verifier('« mí » après que : on garde yo', jugé('mí', 'cmp-yo').raison === 'piege' && jugé('yo', 'cmp-yo').resultat === 'juste');
  verifier('un QCM de comparatif', comparer('menos libros', itemParId(m, 'cmp-libros')).resultat === 'juste' && comparer('menos de libros', itemParId(m, 'cmp-libros')).resultat === 'faux');
}

// ── La correction mot à mot ─────────────────────────────────────────────────

const diff = marquerDifferences('Los chicos lleva gorras rojas', 'Los chicos llevan gorras rojas.');
verifier('seul le mot raté est marqué', diff.filter((m) => !m.ok).map((m) => m.mot).join() === 'llevan');
const oubli = marquerDifferences('Las catrinas altas y delgadas', 'Las catrinas son altas y delgadas.');
verifier("un mot oublié ne décale pas la suite", oubli.filter((m) => !m.ok).map((m) => m.mot).join() === 'son');
verifier('la ponctuation du corrigé est gardée à l\'affichage', diff.at(-1).mot === 'rojas.' && diff.at(-1).ok);

// ── L'indice ────────────────────────────────────────────────────────────────

verifier('l\'indice garde l\'article et la première lettre', indiceDe(item('ropa-pantalon')) === 'el p·······');
verifier('l\'indice d\'un mot seul', indiceDe(item('ver-tener-yo')) === 't····');
verifier('l\'indice ne révèle pas le ñ', !indiceDe(item('ropa-panuelo')).includes('ñ'));

// ── Le tour : ce qui est raté revient ───────────────────────────────────────

{
  const t = nouveauTour([{ id: 'a' }, { id: 'b' }]);
  enregistrer(t, courant(t), 'faux');
  avancer(t);
  verifier('une question ratée repasse en fin de file', t.file.length === 3 && t.file[2].id === 'a' && t.file[2].reprise === 1);
  enregistrer(t, courant(t), 'juste');
  avancer(t);
  enregistrer(t, courant(t), 'juste');
  avancer(t);
  verifier('le tour finit quand la file est vide', estFini(t));
  verifier('seul le premier essai compte', t.premiers.a === 'faux' && t.premiers.b === 'juste');
  const b = bilan(t);
  verifier('le bilan compte les premiers essais', b.justes === 1 && b.faux === 1 && b.rates.join() === 'a');
}
{
  const t = nouveauTour([{ id: 'a' }]);
  for (let i = 0; i < 5 && !estFini(t); i += 1) { enregistrer(t, courant(t), 'faux'); avancer(t); }
  verifier(`une question ne revient pas plus de ${MAX_REPRISES} fois`, t.file.length === 1 + MAX_REPRISES && estFini(t));
}
{
  const t = nouveauTour([{ id: 'a' }, { id: 'b' }], { reprendre: false });
  enregistrer(t, courant(t), 'faux');
  verifier("l'interro ne reprend rien", t.file.length === 2);
  avancer(t);
  enregistrer(t, courant(t), 'presque');
  verifier('la note : un point si juste, un demi si presque', note(t).points === 0.5 && note(t).sur === 2);
}

// ── La mini-interro ─────────────────────────────────────────────────────────

{
  let graine = 7;
  const alea = () => { graine = (graine * 16807) % 2147483647; return (graine - 1) / 2147483646; };
  for (let essai = 0; essai < 20; essai += 1) {
    const questions = tirerInterro(u, alea);
    const attendu = u.interro.tirage.reduce((s, t) => s + t.nombre, 0);
    const ids = questions.map((q) => q.id);
    const aLEnvers = questions.filter((q) => q.mode === 'reconnaitre');
    const ok = questions.length === attendu
      && new Set(ids).size === ids.length
      && ids.every((id) => itemParId(u, id) && itemParId(u, id).type !== 'decrire')
      && aLEnvers.length === 2
      && aLEnvers.every((q) => q.options.length === 3 && new Set(q.options).size === 3 && q.options.includes(itemParId(u, q.id).fr));
    if (!ok) { verifier(`tirage ${essai} de la mini-interro`, false); break; }
  }
  verifier('la mini-interro : dix questions distinctes, deux QCM à l\'envers bien formés (20 tirages)', true);
}
verifier('le mélange garde tous les éléments', melanger([1, 2, 3, 4]).sort().join() === '1,2,3,4');

// ── La progression ──────────────────────────────────────────────────────────

{
  let p = profilVierge();
  p = noterEssai(p, 'ropa-gorra', 'faux');
  verifier('un mot raté est à revoir', aRevoir(p, itemsDe(u)).map((i) => i.id).join() === 'ropa-gorra');
  p = noterEssai(p, 'ropa-gorra', 'presque');
  verifier('un mot « presque » reste à revoir', p.items['ropa-gorra'].aRevoir);
  p = noterEssai(p, 'ropa-gorra', 'juste');
  verifier('réussi du premier coup, il sort de « À revoir »', aRevoir(p, itemsDe(u)).length === 0);
  verifier('les compteurs suivent', p.items['ropa-gorra'].vus === 3 && p.items['ropa-gorra'].justes === 1);
  p = noterEssai(p, 'des-catrina', 'faux');
  verifier('une description ratée ne va pas dans « À revoir »', aRevoir(p, itemsDe(u)).length === 0);
  p = terminerEtape(p, 'u02-ropa', { justes: 3, presque: 1, faux: 0 }, 'd');
  verifier('une étape terminée est marquée', p.etapes['u02-ropa'].faite && p.etapes['u02-ropa'].justes === 3);
  p = noterInterro(p, 'u02', { points: 6, sur: 10 }, 'd1');
  p = noterInterro(p, 'u02', { points: 8.5, sur: 10 }, 'd2');
  verifier('la dernière interro est la plus récente', derniereInterro(p, 'u02').points === 8.5);
  verifier('le profil vierge reste vierge', Object.keys(profilVierge().items).length === 0);
}

// ── Merlin classe, l'appli tranche ──────────────────────────────────────────

{
  const criteres = item('des-catrina').criteres;
  const tous = (statut) => Object.fromEntries(criteres.map((c) => [c.id, statut]));
  verifier('tout présent : juste', verdict(tous('present'), criteres) === 'juste');
  verifier('un oubli : presque', verdict({ ...tous('present'), llevar: 'absent' }, criteres) === 'presque');
  verifier('deux oublis : à reprendre', verdict({ ...tous('present'), llevar: 'absent', ser: 'absent' }, criteres) === 'a-reprendre');
  verifier('une erreur pèse plus qu\'un oubli : à reprendre', verdict({ ...tous('present'), accords: 'faux' }, criteres) === 'a-reprendre');
  verifier('le verdict devient un résultat d\'exercice', commeResultat('a-reprendre') === 'faux' && commeResultat('presque') === 'presque');

  const bonne = {
    elements: criteres.map((c) => ({ id: c.id, statut: 'present', commentaire: '' })),
    corrige: 'La catrina es alta.', message: 'Bien.',
  };
  verifier('une réponse complète de Merlin est lue', lireEvaluation(bonne, criteres)?.corrige === 'La catrina es alta.');
  verifier('un critère manquant la rend illisible', lireEvaluation({ ...bonne, elements: bonne.elements.slice(1) }, criteres) === null);
  verifier('un identifiant inventé la rend illisible',
    lireEvaluation({ ...bonne, elements: [...bonne.elements, { id: 'style', statut: 'present', commentaire: '' }] }, criteres) === null);
  verifier('un statut inventé la rend illisible',
    lireEvaluation({ ...bonne, elements: bonne.elements.map((e, i) => (i ? e : { ...e, statut: 'bof' })) }, criteres) === null);

  const schema = schemaEvaluation(criteres);
  verifier('le schéma impose les identifiants des critères', schema.properties.elements.items.properties.id.enum.join() === criteres.map((c) => c.id).join());
  verifier('le schéma demande le texte corrigé', schema.required.includes('corrige'));
  verifier("le message cite l'écrit de l'élève à la fin, entre guillemets", message(item('des-catrina'), 'Es alta').endsWith('« Es alta »'));

  const auto = autoCorrection(['ser', 'tener', 'llevar'], criteres);
  verifier('auto-correction : ce qui n\'est pas coché manque', auto.verdict === 'presque' && !auto.parMerlin);

  const stub = (reponse) => async () => reponse;
  const lue = await evaluerDescription({ item: item('des-catrina'), texte: 'La catrina es alta.' }, { appeler: stub({ disponible: true, donnees: bonne }) });
  verifier('Merlin répond : verdict calculé par l\'appli', lue.parMerlin && lue.verdict === 'juste');
  const sansCle = await evaluerDescription({ item: item('des-catrina'), texte: 'x' }, { appeler: stub({ disponible: false, raison: 'pas-de-cle' }) });
  verifier('sans Merlin : on se corrige soi-même', sansCle.aCorrigerSoiMeme);
  const plante = await evaluerDescription({ item: item('des-catrina'), texte: 'x' }, { appeler: async () => { throw new Error('réseau'); } });
  verifier('un appel qui lève ne casse rien', plante.aCorrigerSoiMeme);
  const vide = await evaluerDescription({ item: item('des-catrina'), texte: '   ' }, { appeler: stub(null) });
  verifier('rien écrit : rien envoyé', vide.vide);
}

verifier('normaliser retire la ponctuation espagnole', normaliser('¿Llevas gafas?') === 'llevas gafas');

// ── Bilan ───────────────────────────────────────────────────────────────────

if (echecs.length) {
  console.error(`✗ ${echecs.length} échec(s), ${passes} réussi(s) :`);
  for (const e of echecs) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✓ ${passes} tests réussis.`);
