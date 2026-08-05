// Vérifie le moteur sans navigateur.
//
//     node tools/tester-moteur.mjs
//
// Trois comportements comptent vraiment et ne se vérifient pas à la main :
// la répétition espacée compte-t-elle en SÉANCES, un piège réussi seulement au
// palier facile est-il bien refusé comme acquis, et la file de remédiation
// remonte-t-elle en premier ce qui coûte le plus.

import assert from 'node:assert/strict';

const memoire = new Map();
globalThis.localStorage = {
  getItem: (c) => (memoire.has(c) ? memoire.get(c) : null),
  setItem: (c, v) => memoire.set(c, String(v)),
  removeItem: (c) => memoire.delete(c),
};

const srs = await import('../js/srs.js');
const { etatInitial, apresReponse, estAcquis, estARevoir, fileDeRemediation, NIVEAU_MAX } = srs;

const essais = [];
const test = async (nom, fn) => { await fn(); essais.push(nom); };

// --- Répétition espacée, comptée en séances ---------------------------------

await test('une réussite repousse à une séance plus tard, pas à un jour', () => {
  const e = apresReponse(etatInitial(), true, 5, 1);
  assert.equal(e.niveau, 1);
  assert.equal(e.revoirALaSeance, 6, 'séance 5 + 1 séance d\'intervalle');
  assert.ok(!estARevoir(e, 5));
  assert.ok(estARevoir(e, 6));
});

await test('une erreur ramène le piège dans la séance en cours', () => {
  let e = etatInitial();
  for (let i = 0; i < 3; i++) e = apresReponse(e, true, 1, 1);
  const rate = apresReponse(e, false, 4, 2);
  assert.equal(rate.niveau, 2, "l'erreur fait reculer d'un cran, pas jusqu'à zéro");
  assert.equal(rate.reussitesConsecutives, 0, 'la série est cassée');
  assert.ok(estARevoir(rate, 6));
});

await test('le niveau plafonne', () => {
  let e = etatInitial();
  for (let i = 0; i < 20; i++) e = apresReponse(e, true, i + 1, 1);
  assert.equal(e.niveau, NIVEAU_MAX);
});

// --- La règle de maîtrise ---------------------------------------------------

await test('trois réussites dans la MÊME séance ne suffisent pas', () => {
  let e = etatInitial();
  for (let i = 0; i < 3; i++) e = apresReponse(e, true, 1, 1);
  assert.equal(e.reussitesConsecutives, 3);
  assert.ok(!estAcquis(e), 'il faut deux séances distinctes');
});

await test('trois réussites sur deux séances suffisent', () => {
  let e = etatInitial();
  e = apresReponse(e, true, 1, 1);
  e = apresReponse(e, true, 1, 1);
  e = apresReponse(e, true, 2, 1);
  assert.ok(estAcquis(e));
});

await test("réussir au palier facile après avoir raté le difficile ne vaut pas acquisition", () => {
  let e = etatInitial();
  e = apresReponse(e, false, 1, 2);          // rate le palier 2
  e = apresReponse(e, true, 1, 1);           // réussit le palier 1
  e = apresReponse(e, true, 2, 1);
  e = apresReponse(e, true, 2, 1);
  assert.equal(e.reussitesConsecutives, 3);
  assert.equal(e.seancesReussies.length, 2);
  assert.ok(!estAcquis(e), "c'est exactement le problème d'Anto : il tient au facile et lâche au difficile");

  const apresPalier2 = apresReponse(e, true, 3, 2);
  assert.ok(estAcquis(apresPalier2), 'une fois le palier difficile réussi, il est acquis');
});

// --- File de remédiation ----------------------------------------------------

await test('la remédiation remonte en premier ce qui coûte le plus', () => {
  const faire = (echecs, niveau) => {
    let e = etatInitial();
    for (let i = 0; i < echecs; i++) e = apresReponse(e, false, 1, 1);
    return { ...e, niveau, revoirALaSeance: 0 };
  };
  const entrees = [
    { id: 'leger', etat: faire(1, 2) },
    { id: 'lourd', etat: faire(5, 1) },
    { id: 'moyen', etat: faire(3, 1) },
  ];
  const ordre = fileDeRemediation(entrees, 3).map((e) => e.id);
  assert.deepEqual(ordre, ['lourd', 'moyen', 'leger']);
});

await test('un piège acquis sort de la file de remédiation', () => {
  let e = etatInitial();
  e = apresReponse(e, true, 1, 1);
  e = apresReponse(e, true, 1, 1);
  e = apresReponse(e, true, 2, 1);
  assert.ok(estAcquis(e));
  assert.equal(fileDeRemediation([{ id: 'x', etat: e }], 99).length, 0);
});

await test('un piège jamais vu est à revoir', () => {
  assert.ok(estARevoir(etatInitial(), 1));
  assert.equal(fileDeRemediation([{ id: 'neuf', etat: etatInitial() }], 1).length, 1);
});

// --- Store ------------------------------------------------------------------

const store = await import('../js/store.js');

await test('une séance journalise et nomme le type d\'erreur dominant', () => {
  store.demarrerSeance(6);
  store.enregistrerReponse({ piegeId: 'ecran-complement-du-nom', exerciceId: 's06-e5', correct: false, palier: 2, raisonnementId: 'nom-voisin', reponseDonnee: 'sont' });
  store.enregistrerReponse({ piegeId: 'ecran-complement-du-nom', exerciceId: 's06-e6', correct: false, palier: 2, raisonnementId: 'nom-voisin', reponseDonnee: 'sont' });
  store.enregistrerReponse({ piegeId: 'sujet-colle', exerciceId: 's06-e1', correct: true, palier: 1 });

  const resume = store.terminerSeance();
  assert.equal(resume.reussites, 1);
  assert.equal(resume.echecs, 2);
  assert.equal(resume.typeDominant.id, 'ecran-complement-du-nom');
  assert.equal(resume.raisonnements['nom-voisin'], 2, 'le raisonnement invoqué est compté');
});

await test("une erreur suivie de son dialogue ne compte qu'une seule fois", () => {
  store.reinitialiser();
  store.demarrerSeance(6);
  store.enregistrerReponse({
    piegeId: 'ecran-pronom', exerciceId: 's07-e1', correct: false, palier: 2, reponseDonnee: 'mangent',
  });
  store.enregistrerRaisonnement('pronom-pluriel');

  assert.equal(store.etatPiege('ecran-pronom').echecs, 1, "l'erreur n'est comptée qu'une fois");
  assert.equal(store.etatPiege('ecran-pronom').niveau, 0, 'le niveau ne recule pas deux fois');

  const resume = store.terminerSeance();
  assert.equal(resume.echecs, 1, 'le résumé annonce une erreur, pas deux');
  assert.equal(resume.raisonnements['pronom-pluriel'], 1);
  assert.equal(resume.ratesDetail[0].raisonnementId, 'pronom-pluriel',
    "le raisonnement est rattaché à l'erreur pour la consolidation de mémoire");
});

await test('la progression survit au rechargement', async () => {
  const avant = JSON.stringify(store.lireEtat().pieges);
  const recharge = await import(`../js/store.js?r=${essais.length}`);
  assert.equal(JSON.stringify(recharge.lireEtat().pieges), avant);
  assert.ok(recharge.journal().length >= 1);
});

await test('la mémoire est plafonnée et dédoublonnée', () => {
  for (let i = 0; i < 12; i++) {
    store.consoliderMemoire({ marche: [`observation numéro ${i} sur sa façon de travailler`] });
  }
  const notes = store.profil().francais.marche;
  assert.ok(notes.length <= 6, `plafonné, ${notes.length} notes`);
  assert.ok(notes[notes.length - 1].texte.includes('11'), 'les plus récentes sont conservées');
});

await test('une note de mémoire est supprimable', () => {
  store.consoliderMemoire({ transversales: ['décroche après trois lignes'] });
  const note = store.profil().transversal.notes.at(-1);
  store.oublierNote('transversal', note.id);
  assert.ok(!store.profil().transversal.notes.some((n) => n.id === note.id));
});

await test('la clé d\'API se conserve à la remise à zéro, sauf demande contraire', () => {
  store.definirCleApi('sk-test-123');
  store.reinitialiser();
  assert.equal(store.cleApi(), 'sk-test-123');
  assert.equal(store.lireEtat().numeroSeance, 0);
  store.reinitialiser({ garderCleApi: false });
  assert.equal(store.cleApi(), '');
});

// --- Profil transmis à l'IA -------------------------------------------------

const { profilPourIA } = await import('../js/memoire.js');

await test("le profil signale le palier où il lâche", () => {
  const etats = [{
    id: 'ecran-complement-du-nom',
    etat: { ...etatInitial(), echecs: 4, reussites: 6, palierMax: 1, palierRate: 2 },
  }];
  const texte = profilPourIA({ transversal: { notes: [] }, francais: { marche: [], aEviter: [] } }, etats, 7);
  assert.match(texte, /CE QUI RÉSISTE/);
  assert.match(texte, /palier 1/);
  assert.match(texte, /palier 2/);
});

await test('le profil reste sobre à la première séance', () => {
  const texte = profilPourIA({ transversal: { notes: [] }, francais: { marche: [], aEviter: [] } }, [], 1);
  assert.match(texte, /première séance/);
});

console.log(`${essais.length} vérifications passées :`);
for (const nom of essais) console.log(`  ✓ ${nom}`);
