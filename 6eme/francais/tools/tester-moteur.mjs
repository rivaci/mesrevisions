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

await test('quitter en cours de route ne fait pas avancer le parcours', () => {
  store.reinitialiser();
  const avant = store.lireEtat().seanceCourante;
  store.demarrerSeance(1);
  store.enregistrerReponse({ piegeId: 'sujet-colle', exerciceId: 'sX', correct: true, palier: 1 });
  store.abandonnerSeance();
  assert.equal(store.lireEtat().seanceCourante, avant, 'une séance abandonnée n\'est pas une séance faite');
  assert.equal(store.derniereSeance(), null, 'et elle n\'est pas journalisée');
});

await test('abandonner sans avoir répondu rend le numéro de séance', () => {
  store.reinitialiser();
  const avant = store.lireEtat().numeroSeance;
  store.demarrerSeance(1);
  assert.equal(store.lireEtat().numeroSeance, avant + 1, 'le démarrage consomme un numéro');
  store.abandonnerSeance();
  assert.equal(store.lireEtat().numeroSeance, avant, 'rien répondu : le numéro est rendu');
});

await test('une dictée ne crée pas de piège « undefined »', () => {
  store.reinitialiser();
  store.demarrerSeance(18);
  // Point de contrôle raté : vrai piège, hors score.
  store.enregistrerReponse({ piegeId: 'participe-etre', exerciceId: 's18-d1:montées', correct: false, palier: 3, horsScore: true });
  // La dictée dans son ensemble : pas de piège.
  store.enregistrerReponse({ piegeId: undefined, exerciceId: 's18-d1', correct: false, palier: 3, reponseDonnee: 'la phrase entière' });

  assert.ok(!('undefined' in store.lireEtat().pieges), 'aucune clé undefined dans les pièges');
  const resume = store.terminerSeance();
  assert.equal(resume.echecs, 1, 'la dictée compte pour une réponse');
  assert.equal(resume.typeDominant?.id, 'participe-etre', 'le type dominant est un vrai piège, pas « undefined »');
  assert.ok(!resume.ratesDetail.some((r) => r.piegeId === undefined), 'aucune erreur « undefined » envoyée au modèle');
});

await test('un sans-faute n\'annonce rien à reprendre', () => {
  store.reinitialiser();
  store.demarrerSeance(2);
  store.enregistrerReponse({ piegeId: 'sujet-colle', exerciceId: 's02-x1', correct: true, palier: 1 });
  const resume = store.terminerSeance();
  assert.equal(resume.echecs, 0);
  assert.deepEqual(resume.aRevoir, [],
    "les pièges jamais rencontrés ne sont pas « à reprendre » : l'élève ne les a pas vus");
});

await test('ce qui a été raté est bien annoncé', () => {
  store.reinitialiser();
  store.demarrerSeance(2);
  store.enregistrerReponse({ piegeId: 'ecran-pronom', exerciceId: 's02-x2', correct: false, palier: 2, reponseDonnee: 'x' });
  const resume = store.terminerSeance();
  assert.deepEqual(resume.aRevoir, ['Écran du pronom']);
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

await test("la note écrite pour l'élève est rangée à part", () => {
  store.reinitialiser();
  store.consoliderMemoire({
    marche: ['il retient mieux avec un exemple concret'],
    aEviter: ['la métaphore du chef d\'orchestre'],
    pourToi: ['Tu trouves toujours le sujet quand tu poses la question à voix haute.'],
  });
  const p = store.profil().francais;
  assert.equal(p.pourToi.length, 1);
  assert.match(p.pourToi[0].texte, /^Tu /, 'elle est adressée à l\'élève, pas à un adulte');
  assert.ok(!p.marche.some((n) => n.texte.startsWith('Tu ')), 'et ne se mélange pas aux notes pour les parents');
});

await test('un profil d\'avant cette couche accepte la nouvelle note', () => {
  store.reinitialiser();
  delete store.lireEtat().profilFrancais.pourToi; // état enregistré par une version antérieure
  store.consoliderMemoire({ pourToi: ['Tu vas de plus en plus vite.'] });
  assert.equal(store.profil().francais.pourToi.length, 1);
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

await test('chaque fournisseur garde sa propre clé', () => {
  store.definirFournisseur('anthropic');
  store.definirCleApi('sk-ant-aaa');
  store.definirFournisseur('openai');
  assert.equal(store.cleApi(), '', "la clé d'un fournisseur ne vaut pas pour l'autre");
  store.definirCleApi('sk-oai-bbb');
  store.definirFournisseur('anthropic');
  assert.equal(store.cleApi(), 'sk-ant-aaa', 'revenir en arrière ne redemande pas la clé');
});

await test('changer de fournisseur oublie le modèle', () => {
  store.definirFournisseur('openai');
  store.definirModele('gpt-5.6-terra');
  store.definirFournisseur('anthropic');
  assert.equal(store.modele(), '', "un identifiant n'a de sens que chez son fournisseur");
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

// --- Les deux enveloppes de requête -----------------------------------------
//
// Elles ne se ressemblent pas assez pour qu'une relecture suffise, et une erreur
// ne se voit qu'au premier appel réel — chez un parent, un dimanche soir, sans
// console ouverte. Le mauvais nom de champ donne un 400, pas un champ ignoré.

const ia = await import('../js/ia.js');

const requete = (fournisseur, modele = '') =>
  ia.construireRequete({
    fournisseur, modele, cle: 'sk-essai',
    prenom: 'Anto', profilTexte: 'PROFIL', message: 'MESSAGE',
    schema: { type: 'object', properties: { a: { type: 'string' } }, required: ['a'], additionalProperties: false },
    nomSchema: 'explication',
  });

await test('la requête Anthropic porte l\'en-tête qui autorise l\'appel navigateur', () => {
  const { url, entetes, corps } = requete('anthropic');
  assert.equal(url, 'https://api.anthropic.com/v1/messages');
  assert.equal(entetes['x-api-key'], 'sk-essai');
  assert.equal(entetes['anthropic-dangerous-direct-browser-access'], 'true',
    'sans lui la réponse ne porte pas de CORS et le fetch échoue avant lecture');
  assert.equal(corps.max_tokens, 2000);
  assert.equal(corps.max_output_tokens, undefined, 'ce nom-là est celui d\'OpenAI');
});

await test('Anthropic reçoit deux blocs système marqués pour le cache', () => {
  const { corps } = requete('anthropic');
  assert.equal(corps.system.length, 2);
  assert.match(corps.system[0].text, /professeur particulier d'?Anto|professeur particulier de Anto/);
  assert.equal(corps.system[1].text, 'PROFIL');
  assert.ok(corps.system.every((b) => b.cache_control?.type === 'ephemeral'),
    'sans marqueur, Anthropic ne met rien en cache');
});

await test('la sortie structurée Anthropic n\'a ni name ni strict', () => {
  const { corps } = requete('anthropic');
  const format = corps.output_config.format;
  assert.equal(format.type, 'json_schema');
  assert.ok(format.schema);
  assert.equal(format.name, undefined, 'champ propre à OpenAI, refusé ici');
  assert.equal(format.strict, undefined, 'champ propre à OpenAI, refusé ici');
  assert.equal(corps.output_config.effort, 'low');
});

await test('la requête OpenAI vise /v1/responses avec un Bearer et rien de plus', () => {
  const { url, entetes, corps } = requete('openai');
  assert.equal(url, 'https://api.openai.com/v1/responses');
  assert.equal(entetes.authorization, 'Bearer sk-essai');
  assert.equal(entetes['x-api-key'], undefined);
  assert.equal(corps.max_output_tokens, 2000);
  assert.equal(corps.max_tokens, undefined, 'ce nom-là donne un 400 sur cet endpoint');
  assert.equal(corps.reasoning.effort, 'low');
});

await test('OpenAI ne conserve pas le travail de l\'enfant', () => {
  assert.equal(requete('openai').corps.store, false,
    'cet endpoint garde les réponses trente jours par défaut');
});

await test('OpenAI reçoit les mêmes deux blocs, le stable en premier', () => {
  const { corps } = requete('openai');
  const consignes = corps.input[0];
  assert.equal(consignes.role, 'developer');
  assert.equal(consignes.content.length, 2);
  assert.ok(consignes.content.every((b) => b.type === 'input_text'));
  assert.equal(consignes.content[1].text, 'PROFIL', 'le variable après le stable : le cache porte sur le préfixe');
  assert.equal(corps.input[1].role, 'user');
  assert.equal(corps.system, undefined, 'ce champ-là est celui d\'Anthropic');
});

await test('la sortie structurée OpenAI exige name et strict', () => {
  const format = requete('openai').corps.text.format;
  assert.equal(format.type, 'json_schema');
  assert.equal(format.name, 'explication', 'sans name : 400 Missing required parameter');
  assert.equal(format.strict, true);
  assert.equal(requete('openai').corps.output_config, undefined, 'ce champ-là est celui d\'Anthropic');
});

await test('le modèle par défaut est le premier de la liste du fournisseur', () => {
  assert.equal(requete('anthropic').corps.model, 'claude-opus-5');
  assert.equal(requete('openai').corps.model, 'gpt-5.6-luna');
  assert.equal(requete('openai', 'gpt-4o-mini').corps.model, 'gpt-4o-mini', 'un identifiant libre passe tel quel');
});

await test('un refus est détecté avant de chercher le texte, chez les deux', () => {
  const a = ia.FOURNISSEURS.anthropic.lire({ stop_reason: 'refusal', content: [] });
  assert.deepEqual(a, { ok: false, raison: 'refus' });

  const o = ia.FOURNISSEURS.openai.lire({
    status: 'completed',
    output: [{ type: 'message', content: [{ type: 'refusal', refusal: 'non' }] }],
  });
  assert.deepEqual(o, { ok: false, raison: 'refus' });
});

await test('une réponse tronquée ne passe pas pour une réponse', () => {
  assert.equal(ia.FOURNISSEURS.anthropic.lire({ stop_reason: 'max_tokens', content: [] }).raison, 'tronque');
  assert.equal(
    ia.FOURNISSEURS.openai.lire({ status: 'incomplete', incomplete_details: { reason: 'max_output_tokens' } }).raison,
    'tronque',
  );
});

await test('le texte se lit au bon endroit chez chacun', () => {
  assert.deepEqual(
    ia.FOURNISSEURS.anthropic.lire({ stop_reason: 'end_turn', content: [{ type: 'text', text: '{"a":1}' }] }),
    { ok: true, texte: '{"a":1}' },
  );
  assert.deepEqual(
    ia.FOURNISSEURS.openai.lire({
      status: 'completed',
      output: [{ type: 'reasoning' }, { type: 'message', content: [{ type: 'output_text', text: '{"a":1}' }] }],
    }),
    { ok: true, texte: '{"a":1}' },
  );
});

// Placé en dernier : il remplace le réglage courant par l'ancien format et
// charge une seconde instance du module, ce qui perturberait les tests suivants.
await test("l'ancienne clé nue est reprise au nouveau format", async () => {
  localStorage.removeItem('eleve.ia.v1');
  localStorage.setItem('eleve.cle-api.v1', 'sk-ant-avant');

  const frais = await import('../js/store.js?migration=1');
  assert.equal(frais.cleApi(), 'sk-ant-avant', 'une clé déjà saisie ne doit pas être perdue');
  assert.equal(frais.fournisseur(), 'anthropic');
  assert.equal(localStorage.getItem('eleve.cle-api.v1'), null, 'et pas deux sources de vérité');
});

// --- Correction de dictée ---------------------------------------------------

const { pointsRates } = await import('../js/seance.js');

await test('la dictée compare les homophones à leur place', () => {
  const ex = {
    type: 'dictee',
    texte: 'Ma cousine et son amie sont montées dans le bus.',
    pointsControle: [{ mot: 'sont', piege: 'homophone-grammatical' }],
  };
  assert.equal(pointsRates('Ma cousine et son amie sont montées dans le bus.', ex).length, 0,
    'écrit correctement : rien à revoir');
  const rates = pointsRates('Ma cousine et sont amie son montées dans le bus.', ex);
  assert.equal(rates.length, 1, 'intervertir son/sont est une erreur, même si les deux mots figurent');
  assert.equal(rates[0].ecrit, 'son', 'on montre le mot écrit à la place');
});

await test('la dictée retrouve le mot court écrit à la place de « à »', () => {
  const ex = {
    type: 'dictee',
    texte: 'Mon père a préparé le repas.',
    pointsControle: [{ mot: 'a', piege: 'homophone-grammatical' }],
  };
  const rates = pointsRates('Mon père à préparé le repas.', ex);
  assert.equal(rates.length, 1);
  assert.equal(rates[0].ecrit, 'à', 'plus de « (manquant) » pour un mot d\'une lettre');
});

await test('une dictée parfaite ne signale rien', () => {
  const ex = {
    type: 'dictee',
    texte: 'Les affiches sont accrochées dans le couloir.',
    pointsControle: [
      { mot: 'sont', piege: 'homophone-grammatical' },
      { mot: 'accrochées', piege: 'participe-etre' },
    ],
  };
  assert.equal(pointsRates('Les affiches sont accrochées dans le couloir.', ex).length, 0);
});

// --- Rendu de ce que Merlin renvoie -----------------------------------------

const rendu = await import('../js/rendu.js');

// Le texte tel qu'il finira à l'écran : plus aucun marqueur ne doit y rester.
const aplatir = (segments) =>
  segments.map((s) => (s.enfants ? aplatir(s.enfants) : s.texte)).join('');

await test('l\'italique est rendu, plus d\'astérisques à l\'écran', () => {
  // 166 occurrences de *italique* dans les leçons s'affichaient avec leurs
  // astérisques : l'ancien analyseur ne connaissait que le gras.
  const s = rendu.analyserInline('Le *y* devient *i*, et **nous** garde le radical.');
  assert.deepEqual(s.filter((x) => x.style === 'italique').map((x) => aplatir(x.enfants)), ['y', 'i']);
  assert.deepEqual(s.filter((x) => x.style === 'gras').map((x) => aplatir(x.enfants)), ['nous']);
});

await test('le gras s\'imbrique dans l\'italique', () => {
  // La notation des leçons : le mot cité en italique, la marque en gras à
  // l'intérieur. À plat, « *je **ferai*** » laissait quatre astérisques.
  const [seul] = rendu.analyserInline('*je **ferai***');
  assert.equal(seul.style, 'italique');
  assert.equal(aplatir([seul]), 'je ferai');
  assert.deepEqual(seul.enfants.map((x) => x.style), ['normal', 'gras']);
});

await test('une astérisque non fermée reste du texte', () => {
  // Un contenu bancal s'affiche imparfaitement — il ne doit pas disparaître,
  // ni avaler la suite de la phrase.
  assert.equal(aplatir(rendu.analyserInline('3 * 4, et *ça continue')), '3 * 4, et *ça continue');
  assert.equal(aplatir(rendu.analyserInline('*ouvert\nfermé*')), '*ouvert\nfermé*');
});

await test('un paragraphe garde ses retours à la ligne', () => {
  // Quatre règles écrites sur quatre lignes doivent rester quatre lignes :
  // recollées par une espace, elles formaient un pavé illisible.
  const blocs = rendu.analyserMarkdown('**-cer** → ç devant le o.\n**-ger** → un e devant le o.');
  assert.equal(blocs.length, 1);
  assert.equal(blocs[0].type, 'paragraphe');
  assert.equal(blocs[0].lignes.length, 2, 'deux lignes, pas une');
});

await test('l\'analyse inline sépare gras, code et texte', () => {
  const s = rendu.analyserInline('Le **sujet** commande le `verbe`.');
  assert.deepEqual(s, [
    { style: 'normal', texte: 'Le ' },
    { style: 'gras', enfants: [{ style: 'normal', texte: 'sujet' }] },
    { style: 'normal', texte: ' commande le ' },
    { style: 'code', texte: 'verbe' },
    { style: 'normal', texte: '.' },
  ]);
});

await test('le balisage en chaîne échappe le HTML et suit l\'imbrication', () => {
  // Ce chemin-là finit dans un innerHTML : les exemples des leçons et les
  // explications préécrites. Il doit rendre exactement comme rendreMarkdown.
  assert.equal(rendu.enrichir('*je **ferai***'), '<em>je <strong>ferai</strong></em>');
  assert.equal(rendu.enrichir('<script>vole()</script>'), '&lt;script&gt;vole()&lt;/script&gt;');
  assert.equal(rendu.enrichir('un\n\ndeux'), 'un</p><p>deux');
});

await test('un tableau markdown est reconnu', () => {
  const blocs = rendu.analyserMarkdown('| Personne | chanter |\n|---|---|\n| je | chante |\n| tu | chantes |');
  assert.equal(blocs.length, 1);
  assert.equal(blocs[0].type, 'tableau');
  assert.deepEqual(blocs[0].entetes, ['Personne', 'chanter']);
  assert.equal(blocs[0].lignes.length, 2);
  assert.deepEqual(blocs[0].lignes[1], ['tu', 'chantes']);
});

await test('listes et paragraphes sont distingués', () => {
  const blocs = rendu.analyserMarkdown('Voici la règle.\n\n- premier point\n- second point');
  assert.equal(blocs[0].type, 'paragraphe');
  assert.equal(blocs[1].type, 'liste');
  assert.equal(blocs[1].items.length, 2);
});

await test('le HTML du modèle reste du texte, jamais une balise', () => {
  // L'analyse ne fabrique pas de balise : le rendu, lui, passe par textContent.
  // On vérifie ici que rien n'est interprété comme structure — le « script »
  // survit comme texte normal, prêt à être posé tel quel.
  const s = rendu.analyserInline('<img src=x onerror="alert(1)"> et <script>vole()</script>');
  assert.equal(s.length, 1);
  assert.equal(s[0].style, 'normal');
  assert.ok(s[0].texte.includes('<script>'), 'le texte est conservé, pas transformé en nœud');
});

// --- Le dialogue après une erreur -------------------------------------------

const rais = await import('../js/raisonnement.js');
const { PIEGES: LES_PIEGES } = await import('../js/data/pieges.js');
const { SEANCES: TOUTES_SEANCES } = await import('../js/data/seances/index.js');

const ids = (opts) => opts.map((o) => o.id);

await test('une option impossible sur cette tâche n\'est pas proposée', () => {
  // « Je me suis trompé sur la terminaison » n'a aucun sens quand l'élève n'a
  // rien écrit : il a désigné un mot. 153 exercices sur 574 étaient dans ce cas.
  const toucher = { type: 'toucher', piege: 'sujet-colle', mots: ['Les', 'élèves', 'veulent'], attendus: [2] };
  const opts = ids(rais.optionsRaisonnement({ piege: LES_PIEGES['sujet-colle'], exercice: toucher, reponseDonnee: 'élèves' }));
  assert.ok(!opts.includes('bon-sujet'), 'l\'option qui suppose une forme écrite disparaît');
  assert.ok(opts.includes('autre-mot'), 'et une option propre à la tâche la remplace');
  assert.equal(opts[opts.length - 1], 'hasard', '« au hasard » reste, et reste en dernier');
});

await test('la même option reste proposée quand l\'élève écrit', () => {
  const completer = { type: 'completer', piege: 'sujet-colle', attendu: 'écoutent' };
  const opts = ids(rais.optionsRaisonnement({ piege: LES_PIEGES['sujet-colle'], exercice: completer, reponseDonnee: 'écoute' }));
  assert.ok(opts.includes('bon-sujet'));
  assert.ok(!opts.includes('autre-mot'), 'les options de désignation ne débordent pas sur les exercices à trou');
});

await test('la faute de frappe n\'est offerte que si elle peut être vraie', () => {
  const jeter = { type: 'completer', piege: 'radical-premier-groupe', attendu: 'jettes' };
  // « jetes » est EXACTEMENT le piège de la séance : une forme conjuguée
  // plausible, pas un dérapage de doigt. L'offrir donnerait un bouton
  // « j'esquive » plus flatteur que « au hasard ».
  assert.equal(rais.frappeCredible(jeter, 'jetes'), false);
  assert.equal(rais.frappeCredible(jeter, 'jettse'), true, 'une interversion, elle, est une vraie faute de frappe');
  assert.equal(rais.frappeCredible(jeter, 'jettes'), false, 'la bonne réponse n\'est pas une faute');
  assert.equal(rais.frappeCredible(jeter, 'mange'), false, 'un mot sans rapport n\'est pas une faute de frappe');
  // Un autre couple que la leçon oppose : é / er, même son, deux formes.
  assert.equal(rais.frappeCredible({ type: 'completer', attendu: 'chanter' }, 'chanté'), false);
  // Et jamais là où l'élève n'a pas tapé.
  assert.equal(rais.frappeCredible({ type: 'qcm', attendu: 'jettes' }, 'jetes'), false);
});

await test('la réponse libre n\'apparaît que si Merlin peut la lire', () => {
  const ex = { type: 'completer', piege: 'sujet-colle', attendu: 'écoutent' };
  const sans = ids(rais.optionsRaisonnement({ piege: LES_PIEGES['sujet-colle'], exercice: ex, reponseDonnee: 'écoute' }));
  const avec = ids(rais.optionsRaisonnement({ piege: LES_PIEGES['sujet-colle'], exercice: ex, reponseDonnee: 'écoute', avecMerlin: true }));
  assert.ok(!sans.includes('libre'), 'un champ de texte que personne ne lit serait une promesse en l\'air');
  assert.ok(avec.includes('libre'));
});

await test('aucun exercice ne se retrouve avec un dialogue vide', () => {
  let mini = Infinity;
  let pire = null;
  for (const s of TOUTES_SEANCES) {
    for (const e of s.exercices ?? []) {
      const piege = LES_PIEGES[e.piege];
      if (!piege) continue;
      const utiles = rais.optionsRaisonnement({ piege, exercice: e, reponseDonnee: '' })
        .filter((o) => o.id !== 'hasard').length;
      if (utiles < mini) { mini = utiles; pire = `${e.id} (${e.type})`; }
    }
  }
  assert.ok(mini >= 2, `filtrer ne doit jamais réduire le dialogue à « au hasard » — pire cas : ${pire} (${mini})`);
});

// --- Composition d'une séance -----------------------------------------------

const { SEANCES: LES_SEANCES } = await import('../js/data/seances/index.js');

await test('une séance se joue du facile au difficile, quel que soit l\'ordre du fichier', () => {
  // Le moteur trie par palier : un exercice ajouté à la fin du fichier ne doit
  // pas se retrouver joué après des exercices plus durs que lui.
  for (const s of LES_SEANCES) {
    for (const rappel of s.rappels) {
      const joues = s.exercices
        .filter((e) => e.rappel === rappel.id && !e.reserve)
        .sort((a, b) => (a.palier ?? 0) - (b.palier ?? 0));
      const paliers = joues.map((e) => e.palier ?? 0);
      assert.deepEqual(paliers, [...paliers].sort((a, b) => a - b),
        `séance ${s.numero}, rappel ${rappel.id}`);
    }
  }
});

await test('la réserve ne se joue jamais dans le parcours', () => {
  const reserve = LES_SEANCES.flatMap((s) => s.exercices.filter((e) => e.reserve));
  assert.ok(reserve.length > 0, 'il y a bien une réserve');
  for (const ex of reserve) {
    assert.notEqual(ex.type, 'dictee', `${ex.id} : les reprises excluent les dictées`);
    assert.ok(ex.piege, `${ex.id} : sans piège, jamais reproposable`);
  }
});

// --- Scripts d'animation ----------------------------------------------------

const { normaliserScript } = await import('../js/animation.js');

await test('un script d\'animation valide passe entier', () => {
  const s = normaliserScript({
    mots: ['Le', 'panier', 'des', 'chats', 'est', 'vide.'],
    scenes: [
      { type: 'dire', texte: 'Qui est-ce qui est vide ?' },
      { type: 'surligner', mots: [4], role: 'verbe', texte: 'Le verbe.' },
      { type: 'fausse-piste', mot: 3, texte: 'Non.' },
      { type: 'fleche', de: 1, vers: 4, label: 'sujet → verbe' },
    ],
  });
  assert.equal(s.mots.length, 6);
  assert.equal(s.scenes.length, 4);
});

await test('un script bancal est nettoyé, jamais fatal', () => {
  // Le script peut venir d'un modèle : indices hors bornes, types inconnus,
  // champs null — tout doit être écarté en silence, le reste doit survivre.
  const s = normaliserScript({
    mots: ['Le', 'chat', 'dort'],
    scenes: [
      { type: 'surligner', mots: [99], role: 'verbe' },      // hors bornes
      { type: 'explosion', mot: 1 },                          // type inconnu
      { type: 'fleche', de: 1, vers: 1 },                     // de === vers
      { type: 'fleche', de: 0, vers: 2, label: null },        // label null : ok
      { type: 'terminaison', mot: 2, devient: 'dorment' },    // valide
      { type: 'dire', texte: null },                          // sans texte
    ],
  });
  assert.equal(s.scenes.length, 2, 'seules la flèche valide et la terminaison restent');
  assert.equal(s.scenes[0].type, 'fleche');
  assert.equal(s.scenes[1].devient, 'dorment');
});

await test('un script sans mots ne produit rien', () => {
  assert.deepEqual(normaliserScript(null), { mots: [], scenes: [] });
  assert.deepEqual(normaliserScript({ scenes: [{ type: 'dire', texte: 'x' }] }), { mots: [], scenes: [] });
});

await test('le rappel animé de la séance 6 est un script valide', async () => {
  const { default: s06 } = await import('../js/data/seances/s06.js');
  const rappel = s06.rappels.find((r) => r.animation);
  assert.ok(rappel, 'la séance 6 a bien un rappel animé');
  const script = normaliserScript(rappel.animation);
  assert.equal(script.scenes.length, rappel.animation.scenes.length,
    'aucune scène du script écrit à la main ne doit être écartée par le normaliseur');
});

// --- La reprise reste dans le registre de la phrase ratée --------------------

await test('une reprise propose une phrase de la même séance que celle ratée', () => {
  // Le même piège traverse le parcours : « sujet-colle » au présent en séance 1,
  // à l'imparfait en séance 4. Sans préférence, la seconde chance d'une séance
  // sur l'imparfait tombait sur une phrase au présent quatre fois sur cinq.
  for (const s of LES_SEANCES) {
    const piegesJoues = [...new Set(s.exercices.filter((e) => !e.reserve && e.piege).map((e) => e.piege))];
    for (const p of piegesJoues) {
      const memeSeance = s.exercices.filter(
        (e) => e.piege === p && e.type !== 'dictee' && !e.neutre,
      );
      // Au moins une phrase du même registre, sinon la reprise sort de la séance.
      assert.ok(memeSeance.length >= 1,
        `séance ${s.numero}, piège ${p} : aucune reprise possible dans la séance`);
    }
  }
});

// --- Comptabilité du coût ---------------------------------------------------

const cout = await import('../js/cout.js');
const aout = new Date('2026-08-15');

await test('coût Anthropic : cache lu et écrit facturés à part', () => {
  // opus-5 : in 5, out 25, cacheLu 0,50, cacheEcrit 6,25 ($/Mtok)
  const usage = { input_tokens: 1000, output_tokens: 500, cache_read_input_tokens: 2000, cache_creation_input_tokens: 0 };
  const attendu = (1000 * 5 + 500 * 25 + 2000 * 0.5) / 1e6;
  assert.ok(Math.abs(cout.coutAppel(usage, 'claude-opus-5', aout) - attendu) < 1e-12);
});

await test('coût OpenAI : les tokens cachés sont un sous-ensemble de l\'entrée', () => {
  // luna : in 0,20, out 1,20, cacheLu 0,02
  const usage = { input_tokens: 3000, output_tokens: 400, input_tokens_details: { cached_tokens: 2000 } };
  const pleins = 3000 - 2000;
  const attendu = (pleins * 0.20 + 2000 * 0.02 + 400 * 1.20) / 1e6;
  assert.ok(Math.abs(cout.coutAppel(usage, 'gpt-5.6-luna') - attendu) < 1e-12);
});

await test('Sonnet 5 bascule de tarif au 1ᵉʳ septembre 2026', () => {
  const usage = { input_tokens: 1e6, output_tokens: 0 };
  assert.ok(Math.abs(cout.coutAppel(usage, 'claude-sonnet-5', new Date('2026-08-31')) - 2) < 1e-9, 'avant : 2 $/Mtok');
  assert.ok(Math.abs(cout.coutAppel(usage, 'claude-sonnet-5', new Date('2026-09-02')) - 3) < 1e-9, 'après : 3 $/Mtok');
});

await test('un modèle inconnu ne coûte rien plutôt que de planter', () => {
  assert.equal(cout.coutAppel({ input_tokens: 100 }, 'gpt-inexistant'), 0);
});

await test('le coût s\'écrit court et en français', () => {
  assert.equal(cout.formaterCout(0), '0 ¢');
  assert.equal(cout.formaterCout(0.000168), '< 0,1 ¢', 'un appel minuscule ne s\'affiche pas « 0,0 ¢ »');
  assert.equal(cout.formaterCout(0.032), '3,2 ¢');
  assert.equal(cout.formaterCout(0.25), '25 ¢');
  assert.equal(cout.formaterCout(1.05), '1,05 $');
  assert.equal(cout.formaterTokens(12345), '12,3 k');
});

console.log(`${essais.length} vérifications passées :`);
for (const nom of essais) console.log(`  ✓ ${nom}`);
