// Contrôle du contenu — les invariants de la charte, rendus exécutables.
//
//     node tools/verifier-contenu.mjs
//
// Ce fichier ne juge pas la pédagogie. Il juge ce qui casse en silence : une
// correction fausse, un piège inconnu, un palier où une stratégie de surface
// suffit, un contre-exemple qui ne réfute rien.
//
// La plainte la plus virulente relevée dans le benchmark contre les
// plateformes existantes, c'est la correction fausse en production. En maths,
// c'est le seul domaine où on peut la rendre IMPOSSIBLE plutôt qu'improbable.

import CH01 from '../js/data/chapitres/ch01-relatifs.js';
import { PIEGES } from '../js/data/pieges.js';

const CHAPITRES = [CH01];

const erreurs = [];
const avertissements = [];
const dire = (liste, m) => liste.push(m);

/** Tous les exercices d'un savoir-faire, toutes sections confondues. */
const exercicesDe = (sf) => [
  ...(sf.entrainement ?? []),
  ...(sf.test ?? []),
];

// --- Structure ---------------------------------------------------------------

const idsVus = new Set();

for (const ch of CHAPITRES) {
  const ou = `Chapitre ${ch.numero}`;
  if (!ch.titre) dire(erreurs, `${ou} : titre manquant`);
  if (!ch.savoirFaire?.length) dire(erreurs, `${ou} : aucun savoir-faire`);
  if (!ch.programme) dire(erreurs, `${ou} : version de programme non déclarée`);

  for (const sf of ch.savoirFaire ?? []) {
    const oue = `${ou}, ${sf.id}`;

    if (idsVus.has(sf.id)) dire(erreurs, `${oue} : identifiant en double`);
    idsVus.add(sf.id);

    // Un savoir-faire se nomme par un verbe et un objet — c'est ce qui le rend
    // lisible dans le suivi de l'élève et le récap parents.
    if (!sf.titre) dire(erreurs, `${oue} : titre manquant`);
    if (!sf.attendus?.length) dire(avertissements, `${oue} : aucun attendu du BO cité`);

    if (!sf.cours?.length) dire(erreurs, `${oue} : pas de cours`);
    if (!sf.methode) dire(erreurs, `${oue} : pas de méthode résolue`);
    if (!sf.methode?.controle) dire(erreurs, `${oue} : la méthode n'a pas de geste de contrôle`);

    const nbE = (sf.entrainement ?? []).length;
    if (nbE < 6) dire(avertissements, `${oue} : ${nbE} exercices d'entraînement (6 à 10 attendus)`);
    if (nbE > 12) dire(avertissements, `${oue} : ${nbE} exercices, c'est beaucoup pour une section`);
    if ((sf.problemes ?? []).length < 2) dire(avertissements, `${oue} : moins de 2 problèmes`);
    if (!(sf.test ?? []).length) dire(erreurs, `${oue} : pas d'auto-évaluation`);

    // Le cours doit contenir au moins une propriété ou une définition : une
    // section faite que de remarques et d'exemples n'énonce rien.
    const types = new Set((sf.cours ?? []).map((b) => b.type));
    if (!types.has('propriete') && !types.has('definition')) {
      dire(erreurs, `${oue} : le cours n'énonce ni définition ni propriété`);
    }
  }
}

// --- Invariant 1 : aucune correction fausse ----------------------------------
//
// Une réponse attendue absente, non numérique, ou égale à une réponse déclarée
// fausse, c'est une correction cassée. Le troisième cas est le plus vicieux :
// il rendrait l'élève perdant quoi qu'il réponde.

for (const ch of CHAPITRES) {
  for (const sf of ch.savoirFaire ?? []) {
    for (const ex of exercicesDe(sf)) {
      const ou = `${sf.id}/${ex.id}`;

      if (idsVus.has(ex.id)) dire(erreurs, `${ou} : identifiant en double`);
      idsVus.add(ex.id);

      // Un « vrai/faux » porte son texte dans `affirmation` : c'est une phrase
      // à juger, pas un calcul à effectuer.
      if (!ex.enonce && !ex.affirmation) dire(erreurs, `${ou} : énoncé manquant`);

      if (ex.type === 'calcul') {
        if (typeof ex.attendu !== 'number' || !Number.isFinite(ex.attendu)) {
          dire(erreurs, `${ou} : réponse attendue absente ou non numérique`);
        }
      }

      if (ex.type === 'trous') {
        if (!ex.champs?.length) dire(erreurs, `${ou} : type « trous » sans champ`);
        for (const c of ex.champs ?? []) {
          if (typeof c.attendu !== 'number') dire(erreurs, `${ou} : champ « ${c.id} » sans réponse numérique`);
        }
      }

      if (ex.type === 'signe') {
        if (!['positif', 'négatif', 'nul'].includes(ex.attendu)) {
          dire(erreurs, `${ou} : réponse de signe invalide (« ${ex.attendu} »)`);
        }
      }

      if (ex.type === 'plausible' || ex.type === 'vraifaux') {
        if (typeof ex.attendu !== 'boolean') dire(erreurs, `${ou} : réponse attendue non booléenne`);
        if (ex.type === 'plausible' && !ex.explication) {
          dire(erreurs, `${ou} : un « plausible » sans explication n'apprend rien`);
        }
      }

      if (ex.type === 'corriger') {
        const fausses = (ex.lignes ?? []).filter((l) => l.fausse);
        if (fausses.length !== 1) {
          dire(erreurs, `${ou} : il faut exactement une ligne fausse (${fausses.length} trouvée·s)`);
        }
        if (!ex.explication) dire(erreurs, `${ou} : « corriger » sans explication`);
      }

      // Le cas vicieux : une réponse fausse déclarée qui vaut la bonne.
      for (const f of ex.fausses ?? []) {
        if (f.valeur === ex.attendu) {
          dire(erreurs, `${ou} : la réponse « fausse » ${f.valeur} est la bonne réponse`);
        }
        if (!f.piege) dire(erreurs, `${ou} : la réponse fausse ${f.valeur} n'est rattachée à aucun piège`);
        else if (!PIEGES[f.piege]) dire(erreurs, `${ou} : piège inconnu « ${f.piege} »`);
      }

      if (ex.piege && !PIEGES[ex.piege]) dire(erreurs, `${ou} : piège inconnu « ${ex.piege} »`);
    }
  }
}

// --- Invariant 2 : les contre-exemples réfutent vraiment ---------------------
//
// Un « vrai/faux » dont la fonction de validation accepterait l'exemple donné
// en modèle, ou le refuserait, est cassé. On teste le modèle contre sa propre
// validation — c'est le minimum vérifiable sans deviner l'intention.

for (const ch of CHAPITRES) {
  for (const sf of ch.savoirFaire ?? []) {
    for (const ex of sf.entrainement ?? []) {
      if (ex.type !== 'vraifaux') continue;
      const ce = ex.contreExemple;
      if (!ce) {
        if (ex.attendu === false) dire(erreurs, `${sf.id}/${ex.id} : affirmation fausse sans contre-exemple à produire`);
        continue;
      }
      if (typeof ce.valide !== 'function') {
        dire(erreurs, `${sf.id}/${ex.id} : pas de fonction de validation du contre-exemple`);
        continue;
      }
      if (!ce.exemple) dire(avertissements, `${sf.id}/${ex.id} : pas d'exemple de secours`);

      // On cherche au moins un couple qui passe : une validation qui ne peut
      // jamais être satisfaite bloquerait l'élève indéfiniment.
      let trouve = false;
      for (let a = -10; a <= 10 && !trouve; a += 0.5) {
        for (let b = -10; b <= 10 && !trouve; b += 0.5) {
          try { if (ce.valide(a, b)) trouve = true; } catch { /* couple invalide */ }
        }
      }
      if (!trouve) {
        dire(erreurs, `${sf.id}/${ex.id} : aucun contre-exemple ne satisfait la validation — l'élève ne peut pas réussir`);
      }
    }
  }
}

// --- Invariant 3 : pas de stratégie de surface gagnante ----------------------
//
// Un lot d'items où la réponse est toujours du même côté s'apprend sans rien
// comprendre. Deux cas concrets dans ce chapitre : un « plausible » dont la
// réponse serait toujours « non », et un palier de calculs dont le résultat
// serait toujours négatif.

for (const ch of CHAPITRES) {
  for (const sf of ch.savoirFaire ?? []) {
    const plausibles = (sf.entrainement ?? []).filter((e) => e.type === 'plausible');
    if (plausibles.length >= 3) {
      const oui = plausibles.filter((e) => e.attendu).length;
      if (oui === 0) dire(erreurs, `${sf.id} : aucun résultat plausible — « c'est faux » suffirait`);
      if (oui === plausibles.length) dire(erreurs, `${sf.id} : tous plausibles — « c'est vrai » suffirait`);
    }

    const calculs = (sf.entrainement ?? []).filter((e) => e.type === 'calcul' && typeof e.attendu === 'number');
    if (calculs.length >= 4) {
      const negatifs = calculs.filter((e) => e.attendu < 0).length;
      if (negatifs === 0 || negatifs === calculs.length) {
        dire(
          avertissements,
          `${sf.id} : les ${calculs.length} résultats ont tous le même signe — le signe se devine`,
        );
      }
    }

    // Les items neutres : au moins un par savoir-faire, sinon le piège du
    // moment se déclenche partout et devient une règle.
    const neutres = (sf.entrainement ?? []).filter((e) => e.neutre).length;
    if (!neutres) dire(erreurs, `${sf.id} : aucun item neutre — le piège joue à tous les coups`);
  }
}

// --- Invariant 4 : chaque piège est complet ----------------------------------

for (const [id, p] of Object.entries(PIEGES)) {
  if (!p.regle) dire(erreurs, `Piège « ${id} » : pas de règle`);
  if (!p.controle) dire(erreurs, `Piège « ${id} » : pas de geste de contrôle`);
  if ((p.raisonnements ?? []).length < 2) {
    dire(erreurs, `Piège « ${id} » : moins de deux raisonnements, le dialogue ne diagnostique rien`);
  }
  for (const r of p.raisonnements ?? []) {
    if (!r.texte || !r.reponse) dire(erreurs, `Piège « ${id} » : raisonnement « ${r.id} » incomplet`);
  }
}

// Un piège du chapitre jamais atteint par aucun exercice est du contenu mort.
const piegesAtteints = new Set();
for (const ch of CHAPITRES) {
  for (const sf of ch.savoirFaire ?? []) {
    for (const ex of exercicesDe(sf)) {
      if (ex.piege) piegesAtteints.add(ex.piege);
      for (const f of ex.fausses ?? []) piegesAtteints.add(f.piege);
    }
  }
}
for (const [id, p] of Object.entries(PIEGES)) {
  if (CHAPITRES.some((c) => c.numero === p.chapitre) && !piegesAtteints.has(id)) {
    dire(avertissements, `Piège « ${id} » : déclaré mais aucun exercice ne l'atteint`);
  }
}

// --- Invariant 5 : les problèmes ont des réponses vérifiables ----------------

for (const ch of CHAPITRES) {
  for (const sf of ch.savoirFaire ?? []) {
    for (const pb of sf.problemes ?? []) {
      if (!pb.enonce) dire(erreurs, `${sf.id}/${pb.id} : énoncé manquant`);
      if (!pb.questions?.length) dire(erreurs, `${sf.id}/${pb.id} : aucune question`);
      for (const q of pb.questions ?? []) {
        if (typeof q.attendu !== 'number') dire(erreurs, `${sf.id}/${pb.id} : question sans réponse numérique`);
        if (!q.texte) dire(erreurs, `${sf.id}/${pb.id} : question sans texte`);
      }
      // Norme Eduscol : une tâche intermédiaire tient en deux ou trois étapes.
      if ((pb.questions ?? []).length > 3) {
        dire(avertissements, `${sf.id}/${pb.id} : ${pb.questions.length} questions (3 au maximum)`);
      }
    }
  }
}

// --- Rapport -----------------------------------------------------------------

for (const ch of CHAPITRES) {
  const sfs = ch.savoirFaire ?? [];
  const n = sfs.reduce((t, sf) => t + exercicesDe(sf).length + (sf.problemes ?? []).length, 0);
  console.log(`Chapitre ${ch.numero} — « ${ch.titre} »`);
  console.log(`  ${sfs.length} savoir-faire, ${n} items, ${piegesAtteints.size} pièges travaillés.`);
  for (const sf of sfs) {
    console.log(`  · ${sf.titre} — ${(sf.entrainement ?? []).length} exercices, ${(sf.problemes ?? []).length} problèmes`);
  }
}

for (const a of avertissements) console.log(`  ~ ${a}`);
for (const e of erreurs) console.log(`  ✗ ${e}`);

if (erreurs.length) {
  console.log(`\n${erreurs.length} erreur(s). Le contenu n'est pas publiable.`);
  process.exit(1);
}
console.log(avertissements.length ? `\n${avertissements.length} avertissement(s), rien de bloquant.` : '\nTout est bon.');
