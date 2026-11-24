// Tests du moteur, hors navigateur.
//
//     node tools/tester-moteur.mjs
//
// Ce qui se joue ici, c'est la justice de la correction : un « faux » donné à
// une réponse juste décourage, un « juste » donné à une erreur la fait
// apprendre. D'où des tests qui vérifient autant ce qui est REFUSÉ que ce qui
// est accepté — le vocabulaire et ses confusions classiques (égoïsme et
// égotisme, « je » narré et « je » narrant, biographie et autobiographie) —
// et que chaque question dit la même chose que sa fiche : un QCM qui
// contredirait le tableau apprendrait une erreur à Evan la veille du contrôle.

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

const [autobio] = CHAPITRES;
const item = (id) => itemParId(autobio, id);
const jugé = (saisie, id) => comparer(saisie, item(id));
const piege = (saisie, id) => jugé(saisie, id).raison === 'piege';
const fiche = (etape, titre) => autobio.etapes.find((e) => e.id === etape).fiche.find((b) => b.titre === titre);
const sansMarques = (texte) => texte.replace(/\*/g, '');

// ── Ce qui ne compte pas ────────────────────────────────────────────────────

verifier('l\'article ne compte pas (le journal intime, l\'égotisme)', jugé('le journal intime', 'rv-t-journal').resultat === 'juste' && jugé('l\'égotisme', 'vo-t-egotisme').resultat === 'juste');
verifier('la casse ne compte pas (mémoires, MÉMOIRES)', jugé('mémoires', 'rv-t-memoires').resultat === 'juste' && jugé('MÉMOIRES', 'rv-t-memoires').resultat === 'juste');
verifier('les guillemets ne comptent pas (« je » narré)', jugé('« je » narré', 'te-t-narre').resultat === 'juste' && jugé('le "je" narrant', 'te-t-narrant').resultat === 'juste');
verifier('le mot seul accepté (rétrospectif, journal, distance)', jugé('rétrospectif', 'lj-t-retro').resultat === 'juste'
  && jugé('journal', 'rv-t-journal').resultat === 'juste' && jugé('distance', 'te-t-distance').resultat === 'juste');
verifier('« publication posthume » accepté', jugé('publication posthume', 've-t-posthume').resultat === 'juste');

// ── Presque : les accents, l'orthographe ───────────────────────────────────

verifier('« egotisme » : presque, l\'accent', jugé('egotisme', 'vo-t-egotisme').raison === 'accent');
verifier('« epigraphe » : presque, l\'accent', jugé('epigraphe', 'lj-t-epigraphe').raison === 'accent');
verifier('« introspexion » : presque, l\'orthographe', jugé('introspexion', 'vo-t-introspection').raison === 'orthographe');
verifier('« catarsis » : presque, l\'orthographe', jugé('catarsis', 'po-t-catharsis').raison === 'orthographe');
verifier('un autre mot est faux (« nostalgie » pour la catharsis)', jugé('nostalgie', 'po-t-catharsis').resultat === 'faux');

// ── Les confusions prévues ──────────────────────────────────────────────────

verifier('égoïsme et égotisme : dans les deux sens, accents ou pas', piege('égotisme', 'vo-t-egoisme') && piege('égoïsme', 'vo-t-egotisme')
  && piege('egotisme', 'vo-t-egoisme') && piege('egoisme', 'vo-t-egotisme'));
verifier('« égotisme » pour l\'égoïsme : presque, l\'anglicisme a eu ce sens — expliqué, pas une faute d\'orthographe',
  jugé('égotisme', 'vo-t-egoisme').resultat === 'presque' && piege('égotisme', 'vo-t-egoisme'));
verifier('« égoïsme » pour l\'égotisme : faux, le mot demandé est l\'anglicisme', jugé('égoïsme', 'vo-t-egotisme').resultat === 'faux');
verifier('« introspection » pour le récit rétrospectif : expliqué, pas « presque » pour deux lettres', piege('introspection', 'lj-t-retro') && jugé('introspection', 'lj-t-retro').resultat === 'faux');
verifier('« autobiographie » pour le récit rétrospectif : presque', jugé('autobiographie', 'lj-t-retro').resultat === 'presque');
verifier('« individualité » pour l\'individualisme : expliqué', piege('individualité', 'vo-t-individualisme') && jugé('individualité', 'vo-t-individualisme').resultat === 'faux');
verifier('« narré », « narrant » tapés seuls : justes, et toujours confondus dans l\'autre sens',
  jugé('narré', 'te-t-narre').resultat === 'juste' && jugé('narrant', 'te-t-narrant').resultat === 'juste'
  && piege('narrant', 'te-t-narre') && piege('narré', 'te-t-narrant'));
verifier('« contrat de lecture », l\'expression du cours, acceptée', jugé('contrat de lecture', 'lj-t-pacte').resultat === 'juste');
verifier('« superposition » pour la surimpression : presque', jugé('superposition', 'te-t-surimpression').resultat === 'presque');
verifier('égocentrisme et égoïsme : dans les deux sens', piege('égoïsme', 'vo-t-egocentrisme') && piege('égocentrisme', 'vo-t-egoisme'));
verifier('« je » narré et « je » narrant : dans les deux sens', piege('je narrant', 'te-t-narre') && piege('je narré', 'te-t-narrant'));
verifier('surimpression et mise à distance : dans les deux sens', piege('mise à distance', 'te-t-surimpression') && piege('surimpression', 'te-t-distance'));
verifier('« autobiographie » pour la biographie, les Mémoires, le journal, le roman : expliqué',
  ['rv-t-biographie', 'rv-t-memoires', 'rv-t-journal', 'rv-t-roman'].every((id) => piege('autobiographie', id)));
verifier('« journal » pour le récit rétrospectif : expliqué', piege('journal intime', 'lj-t-retro'));
verifier('« pacte romanesque » pour le pacte autobiographique : expliqué', piege('pacte romanesque', 'lj-t-pacte'));
verifier('« incipit » pour l\'épigraphe : expliqué', piege('incipit', 'lj-t-epigraphe'));
verifier('« rétrospection » pour l\'introspection : expliqué', piege('rétrospection', 'vo-t-introspection'));
verifier('« intus et in cute » pour hic et nunc : expliqué', piege('intus et in cute', 've-t-hicetnunc'));
verifier('« raconte » pour « récite » : presque, le sens y est', jugé('raconte', 'th-recite').resultat === 'presque' && jugé('récite', 'th-recite').resultat === 'juste');

// ── Les QCM ─────────────────────────────────────────────────────────────────

verifier('un QCM juste', comparer('Rousseau', item('lj-premier')).resultat === 'juste');
verifier('un QCM faux', comparer('Montaigne', item('lj-premier')).resultat === 'faux');
verifier('aucune réponse rédigée : le chapitre prépare un QCM', itemsDe(autobio).every((i) => i.type !== 'decrire'));
verifier('les QCM sont la majorité des questions', itemsDe(autobio).filter((i) => i.type === 'choix').length > itemsDe(autobio).length / 2);

// ── Chaque question dit la même chose que sa fiche ─────────────────────────

{
  // L'histoire : le siècle de chaque QCM est celui de la ligne du tableau.
  const lignes = fiche('a2-histoire', 'Les étapes').lignes.map((l) => l.map(sansMarques));
  const siecleDe = (nom) => lignes.find(([, qui]) => qui.includes(nom))?.[0];
  verifier('Saint Augustin, Montaigne : le siècle du tableau',
    siecleDe('Saint Augustin') === item('hi-augustin-siecle').attendu && siecleDe('Montaigne') === item('hi-montaigne').attendu);
  verifier('Pascal : le siècle du tableau', item('hi-pascal').attendu === `Pascal, au ${siecleDe('Pascal')}`);
  verifier('l\'âge d\'or : le siècle du tableau', lignes.find(([, qui]) => qui.includes('âge d\'or'))[0] === item('hi-age-or').attendu);
  verifier('Marc Aurèle, ses Pensées ; Augustin, sa conversion : comme le tableau',
    lignes.find(([, qui]) => qui.includes('Marc Aurèle'))[1].includes('Pensées') && item('hi-marc').attendu === 'ses Pensées'
    && lignes.find(([, qui]) => qui.includes('Saint Augustin'))[2].includes('conversion') && item('hi-augustin').attendu.includes('conversion'));
  verifier('« Connais-toi toi-même », « rien de trop », « le moi est haïssable » : à leur place dans le tableau',
    lignes[0][2].includes('Connais-toi toi-même') && lignes[0][2].includes('rien de trop') && siecleDe('Pascal') && lignes.find(([, qui]) => qui.includes('Pascal'))[2].includes('le moi est haïssable'));

  // La chronologie à ranger suit les siècles du tableau, puis la date des Mots.
  const rang = (nom) => lignes.findIndex(([, qui]) => qui.includes(nom));
  const ordre = item('hi-ordre').elements;
  const auteurs = ['Marc Aurèle', 'Saint Augustin', 'Montaigne', 'Rousseau'];
  verifier('l\'ordre à ranger suit le tableau de l\'histoire',
    auteurs.every((a, k) => ordre[k].includes(a) && (k === 0 || rang(a) > rang(auteurs[k - 1]))) && ordre[4].includes('Les Mots'));
}
{
  // Les titres : chaque auteur et chaque date d'un QCM sont ceux du tableau.
  const lignes = fiche('a2-titres', 'Les œuvres du cours, dans l\'ordre').lignes.map((l) => l.map(sansMarques));
  const ligneDe = (titre) => lignes.find(([t]) => t === titre);
  const auteurs = { 'ti-enfance': 'Enfance', 'ti-lenfant': 'L\'Enfant', 'ti-perec': 'W ou le souvenir d\'enfance', 'ti-sido': 'Sido' };
  verifier('chaque « … est de » donne l\'auteur du tableau', Object.entries(auteurs).every(([id, titre]) => ligneDe(titre)?.[1] === item(id).attendu));
  verifier('chaque date d\'une question est celle du tableau', Object.entries(auteurs).every(([id, titre]) => item(id).phrase.includes(`(${ligneDe(titre)[2]})`))
    && ligneDe('Les Mots')[2] === item('ti-mots-date').attendu && item('ti-antimemoires').phrase.includes(ligneDe('Antimémoires')[2]));
  const debut = (date) => Number(date.slice(0, 4));
  verifier('le tableau des titres est dans l\'ordre des dates', lignes.every(([, , d], k) => k === 0 || debut(d) >= debut(lignes[k - 1][2])));
}
{
  // Les récits de vie : chaque mot à trouver est une ligne du tableau, et
  // chaque exemple d'un QCM est dans la ligne de son genre.
  const lignes = fiche('a1-recits', 'Reconnaître les récits de vie').lignes.map((l) => l.map(sansMarques));
  const genres = lignes.map(([g]) => g);
  verifier('chaque récit de vie à trouver est une ligne du tableau',
    ['rv-t-memoires', 'rv-t-journal', 'rv-t-biographie', 'rv-t-roman'].every((id) => genres.includes(item(id).attendu)));
  const genreDe = (exemple) => lignes.find(([, , ex]) => ex.includes(exemple))?.[0];
  const exemples = { 'rv-enfant': 'L\'Enfant', 'rv-frank': 'Anne Frank', 'rv-sevigne': 'Sévigné', 'rv-essais': 'Essais', 'rv-aragon': 'Le Roman inachevé' };
  verifier('chaque exemple d\'un QCM est dans la ligne de son genre',
    Object.entries(exemples).every(([id, ex]) => { const g = genreDe(ex); return g && normaliser(item(id).attendu).includes(normaliser(g).split(' ')[0]); }));
  const piegeRecits = autobio.etapes.find((e) => e.id === 'a1-recits').fiche.find((b) => b.type === 'piege').lignes.join(' ');
  verifier('Beauvoir rangée comme le dit la fiche', piegeRecits.includes('Mémoires d\'une jeune fille rangée') && item('rv-beauvoir').attendu === 'les romans autobiographiques');
}
{
  // Le vocabulaire : chaque mot à trouver est une ligne du tableau.
  const mots = fiche('a1-vocabulaire', 'Le vocabulaire du cours').lignes.map(([m]) => sansMarques(m));
  const termes = autobio.etapes.find((e) => e.id === 'a1-vocabulaire').items.map((i) => i.attendu);
  verifier('les cinq mots du vocabulaire, ceux du tableau', termes.length === 5 && termes.every((t) => mots.includes(t)));
}
{
  // Les textes : chaque bonne réponse est dans la ligne de son auteur.
  const lignes = fiche('a2-textes', 'Les extraits étudiés').lignes.map((l) => l.map(sansMarques));
  const auteurDe = (indice) => lignes.find(([, quoi]) => quoi.includes(indice))?.[0];
  const textes = {
    'tx-souverain': ['souverain juge', 'Rousseau'], 'tx-pervenche': ['Mme de Warens', 'Rousseau'], 'tx-1841': ['1841', 'Chateaubriand'],
    'tx-bonaparte': ['Bonaparte', 'Chateaubriand'], 'tx-montaigne': ['parents et amis', 'Montaigne'], 'tx-sartre': ['au milieu des livres', 'Sartre'],
    'tx-leiris': ['opération à la gorge', 'Leiris'], 'tx-gide': ['22 novembre 1869', 'Gide'], 'tx-stendhal': ['fresque', 'Stendhal'],
    'tx-sand': ['nom d\'écrivain', 'Sand'], 'tx-perec': ['sans repères', 'Perec'], 'tx-sarraute': ['deux voix', 'Sarraute'], 'tx-proust': ['Combray', 'Proust'],
  };
  verifier('chaque extrait : l\'indice de la bonne réponse est dans la ligne de son auteur',
    Object.entries(textes).every(([id, [indice, auteur]]) => auteurDe(indice)?.split(',')[0].includes(auteur)
      && (item(id).attendu.includes(indice) || item(id).phrase.includes(indice) || item(id).attendu === indice)));
  verifier('les treize extraits ont chacun leur question', lignes.length === Object.keys(textes).length);
}
{
  // Les déclencheurs du souvenir : grive, madeleine, pervenche, chacun à son auteur.
  const ligne = fiche('a3-temps', 'Le temps des faits, le temps de l\'écriture').lignes.map(sansMarques).find((l) => l.includes('grive'));
  verifier('la grive est à Chateaubriand, comme dans la fiche', /grive de Montboissier \(Chateaubriand\)/.test(ligne) && item('te-grive').attendu === 'Chateaubriand');
  verifier('la madeleine à Proust, la pervenche à Rousseau', /madeleine \(Proust\)/.test(ligne) && /pervenche \(Rousseau\)/.test(ligne));
}

// ── Le temps ────────────────────────────────────────────────────────────────

{
  const total = autobio.etapes.reduce((s, e) => s + e.duree, 0) + autobio.interro.duree;
  verifier('45 minutes, contrôle blanc compris', total === 45);
}

// ── Utilitaires ─────────────────────────────────────────────────────────────

verifier('la distance compte les lettres à changer', distance('egoisme', 'egotisme') === 1 && distance('abc', 'abc') === 0);
verifier('l\'indice garde la première lettre de chaque mot', indiceDe(item('rv-t-journal')) === `j${'·'.repeat(6)} i${'·'.repeat(5)}`);
verifier('normaliser ôte les articles et les guillemets', normaliser('Le « je » narré') === 'je narré');
verifier('un mot tapé n\'est pas un collage', !saisieSuspecte('Le pacte', 'Le pacte a'));
verifier('une réponse arrivée d\'un coup, si', saisieSuspecte('', 'Rousseau conclut le premier pacte autobiographique sans ambiguïté.'));

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

// ── Le contrôle blanc ──────────────────────────────────────────────────────

for (const c of CHAPITRES) {
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
  verifier(`chapitre ${c.numero} : ${attendu} questions distinctes, QCM à l'envers sur des définitions (40 tirages)`, bon && aLEnversVus > 0);
  verifier(`chapitre ${c.numero} : les fausses définitions viennent de l'étape quand elle en a assez`, voisins);
}

// ── La progression ──────────────────────────────────────────────────────────

{
  let p = profilVierge();
  p = noterEssai(p, 'hi-ordre', 'faux');
  p = noterEssai(p, 'lj-premier', 'juste');
  verifier('un ordre raté va dans « À revoir », un QCM réussi non', aRevoir(p, itemsDe(autobio)).map((i) => i.id).join() === 'hi-ordre');
}

// ── Merlin ──────────────────────────────────────────────────────────────────
//
// Aucune réponse rédigée dans ce chapitre ; le moteur sait pourtant les
// corriger, et doit continuer à savoir le jour où une étape d'écriture
// s'ajoute. Un écrit de démonstration suffit.

{
  const ecrit = {
    id: 'demo', type: 'decrire', sujet: 'Le pacte autobiographique', emoji: '📖', indices: ['Rousseau', 'la vérité'],
    consigne: 'Explique ce qu\'est le pacte autobiographique.', titreModele: 'Exemple',
    modele: 'L\'auteur promet au lecteur de dire la vérité sur lui-même ; Rousseau le premier.',
    criteres: [{ id: 'promesse', texte: 'la promesse de dire la vérité' }, { id: 'rousseau', texte: 'Rousseau, le premier' }],
  };
  const criteres = ecrit.criteres;
  const tous = (statut) => Object.fromEntries(criteres.map((x) => [x.id, statut]));
  verifier('tout présent : juste', verdict(tous('present'), criteres) === 'juste');
  verifier('une erreur : à reprendre', verdict({ ...tous('present'), rousseau: 'faux' }, criteres) === 'a-reprendre');
  verifier('les consignes parlent de français, de littérature et des confusions du cours',
    /français/.test(CONSIGNES) && /littérature/.test(CONSIGNES) && /autobiographie et Mémoires/.test(CONSIGNES) && !/technolog/i.test(CONSIGNES));
  verifier('les consignes demandent de suivre le cours de l\'élève', /Suis le cours/.test(CONSIGNES));

  const bonne = {
    elements: criteres.map((x) => ({ id: x.id, statut: 'present', commentaire: '' })),
    corrige: 'L\'auteur promet de dire la vérité.', message: 'Bien.',
  };
  verifier('une réponse complète de Merlin est lue', lireEvaluation(bonne, criteres)?.corrige === 'L\'auteur promet de dire la vérité.');
  let recu = null;
  const appeler = async (requete) => { recu = requete; return { disponible: true, donnees: bonne }; };
  const lue = await evaluerEcrit({ item: ecrit, texte: 'Rousseau promet de dire vrai.', profil: autobio.profilMerlin }, { appeler, appli: 'litt3e' });
  verifier('Merlin répond : verdict calculé par l\'appli', lue.parMerlin && lue.verdict === 'juste');
  verifier('le profil du chapitre part avec la requête, avec le cours', /Lejeune/.test(recu?.profil ?? '') && /Intus et in cute/.test(recu?.profil ?? '') && recu?.appli === 'litt3e');
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
