// Vérifie le moteur de progression sans navigateur.
//
//     node tools/tester-moteur.mjs
//
// Deux comportements comptent vraiment et sont difficiles à tester à la main :
// une connaissance ratée doit revenir tout de suite, et la progression doit
// survivre à la fermeture de l'onglet.

import assert from 'node:assert/strict';

// localStorage n'existe pas dans Node : on le simule avant de charger le store,
// qui lit son état dès l'import.
const memoire = new Map();
globalThis.localStorage = {
  getItem: (c) => (memoire.has(c) ? memoire.get(c) : null),
  setItem: (c, v) => memoire.set(c, String(v)),
  removeItem: (c) => memoire.delete(c),
};

const { etatInitial, apresReponse, estAcquis, estARevoir, ordonnerPourSeance, aujourdHui, NIVEAU_MAX } =
  await import('../js/srs.js');

const essais = [];
// `await` obligatoire : sans lui, une vérification asynchrone serait comptée
// comme passée avant même de s'être exécutée.
const test = async (nom, fn) => { await fn(); essais.push(nom); };

// --- Répétition espacée -----------------------------------------------------

await test('une connaissance neuve est à revoir', () => {
  assert.ok(estARevoir(etatInitial()));
});

await test('une bonne réponse repousse la révision', () => {
  const e = apresReponse(etatInitial(), true, '2026-08-04');
  assert.equal(e.niveau, 1);
  assert.equal(e.revoirLe, '2026-08-05');
  assert.ok(!estARevoir(e, '2026-08-04'));
});

await test('une erreur ramène la connaissance au jour même', () => {
  let e = etatInitial();
  for (let i = 0; i < 3; i++) e = apresReponse(e, true, '2026-08-04');
  assert.equal(e.niveau, 3);

  const rate = apresReponse(e, false, '2026-08-10');
  assert.equal(rate.niveau, 2, "l'erreur fait reculer d'un cran, pas jusqu'à zéro");
  assert.equal(rate.revoirLe, '2026-08-12', 'et rapproche nettement la révision suivante');
});

await test('une erreur sur une connaissance neuve la laisse à revoir tout de suite', () => {
  const e = apresReponse(etatInitial(), false, '2026-08-04');
  assert.equal(e.niveau, 0);
  assert.ok(estARevoir(e, '2026-08-04'), 'doit revenir dans la même séance');
});

await test('le niveau plafonne', () => {
  let e = etatInitial();
  for (let i = 0; i < 20; i++) e = apresReponse(e, true, '2026-08-04');
  assert.equal(e.niveau, NIVEAU_MAX);
  assert.ok(estAcquis(e));
});

await test('la séance commence par ce qui est le moins su', () => {
  const entrees = [
    { cle: 'a', etat: { ...etatInitial(), niveau: 3, revoirLe: '2026-08-01' } },
    { cle: 'b', etat: etatInitial() },
    { cle: 'c', etat: { ...etatInitial(), niveau: 5, revoirLe: '2099-01-01' } },
  ];
  const ordre = ordonnerPourSeance(entrees, '2026-08-04').map((e) => e.cle);
  assert.deepEqual(ordre, ['b', 'a', 'c'], 'les dues d\'abord, du plus faible au plus fort');
});

// --- Progression et persistance ---------------------------------------------

const store = await import('../js/store.js');
const { ETAPES, itemsDeLEtape } = await import('../js/data/parcours.js');

const clesRegions = itemsDeLEtape(ETAPES[0]).map((i) => i.cle);

await test('les XP montent sur une bonne réponse, pas sur une mauvaise', () => {
  const avant = store.lireEtat().xp;
  store.enregistrerReponse(clesRegions[0], true);
  const apresBonne = store.lireEtat().xp;
  assert.ok(apresBonne > avant);
  store.enregistrerReponse(clesRegions[1], false);
  assert.equal(store.lireEtat().xp, apresBonne);
});

await test('le premier badge tombe dès la première réponse', () => {
  assert.ok(store.lireEtat().badges.includes('premier-pas'));
});

await test("une connaissance n'est acquise qu'après plusieurs réussites", () => {
  const cle = clesRegions[2];
  for (let i = 0; i < 3; i++) store.enregistrerReponse(cle, true);
  assert.ok(!estAcquis(store.etatItem(cle)), '3 réussites ne suffisent pas');
  store.enregistrerReponse(cle, true);
  assert.ok(estAcquis(store.etatItem(cle)), '4 réussites suffisent');
});

await test('la progression survit au rechargement', async () => {
  const xpAvant = store.lireEtat().xp;
  const itemsAvant = Object.keys(store.lireEtat().items).length;

  // Recharge le module comme le ferait un nouvel onglet : même localStorage,
  // instance neuve.
  const rechargé = await import(`../js/store.js?rechargement=${essais.length}`);
  assert.equal(rechargé.lireEtat().xp, xpAvant);
  assert.equal(Object.keys(rechargé.lireEtat().items).length, itemsAvant);
});

await test('chaque matière démarre ouverte, la suite est verrouillée', () => {
  const premiereGeo = ETAPES.find((e) => e.matiere === 'geo');
  const premiereHisto = ETAPES.find((e) => e.matiere === 'histoire');
  assert.ok(store.etapeAccessible(premiereGeo));
  assert.ok(store.etapeAccessible(premiereHisto), "l'histoire ne dépend pas de la géo");
  assert.ok(!store.etapeAccessible(ETAPES[ETAPES.length - 1]));
});

await test('un défi enregistre son meilleur score', () => {
  store.enregistrerDefi('regions', 0.9);
  store.enregistrerDefi('regions', 0.6);
  assert.equal(store.lireEtat().defis.regions, 0.9, 'un moins bon score n\'écrase pas le meilleur');
});

await test("le défi réussi ouvre l'étape suivante de la même matière", () => {
  assert.ok(store.etapeAccessible(ETAPES[1]));
});

await test('la remise à zéro efface tout', () => {
  store.reinitialiser();
  assert.equal(store.lireEtat().xp, 0);
  assert.deepEqual(store.lireEtat().badges, []);
  assert.equal(Object.keys(store.lireEtat().items).length, 0);
});

await test('le rang progresse avec les XP', () => {
  assert.equal(store.rang().nom, 'Apprenti');
  for (let i = 0; i < 40; i++) store.enregistrerReponse(`factice:${i}`, true);
  assert.equal(store.lireEtat().xp, 400);
  assert.equal(store.rang().nom, 'Explorateur');
  assert.ok(store.rang().suivant.nom === 'Cartographe');
});

await test('la date du jour est en heure locale', () => {
  assert.match(aujourdHui(), /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(aujourdHui(new Date(2026, 7, 4, 23, 30)), '2026-08-04', 'pas de bascule le soir');
});

console.log(`${essais.length} vérifications passées :`);
for (const nom of essais) console.log(`  ✓ ${nom}`);
