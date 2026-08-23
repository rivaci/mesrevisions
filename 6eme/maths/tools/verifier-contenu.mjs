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

import { CHAPITRES } from '../js/data/chapitres/index.js';
import { PIEGES } from '../js/data/pieges.js';
// Le même moteur que celui de l'application : le contrôle vérifie donc les
// expressions exactement comme elles seront corrigées devant l'élève.
import { equivalentes } from '../js/verification.js';
import { pointsHorsCadre } from '../js/graphique.js';

const erreurs = [];
const avertissements = [];
const dire = (liste, m) => liste.push(m);

const estPremier = (n) => {
  if (!Number.isInteger(n) || n < 2) return false;
  for (let d = 2; d * d <= n; d += 1) if (n % d === 0) return false;
  return true;
};

const pgcd = (a, b) => (b ? pgcd(b, a % b) : Math.abs(a));

/**
 * La valeur d'un énoncé fait de fractions additionnées ou soustraites.
 *
 * Volontairement limité : \dfrac{a}{b}, des entiers, des + et des −. Ça couvre
 * les énoncés de fractions du programme de 4e, et ce qui sort du cadre renvoie
 * `null` — on ne vérifie pas plutôt que de vérifier de travers.
 *
 * Sans ça, le contrôle savait dire qu'une réponse était irréductible, mais pas
 * qu'elle correspondait à la question. Changer les nombres d'un énoncé en
 * oubliant sa réponse passait donc inaperçu.
 */
function evaluerFractions(latex) {
  const propre = String(latex ?? '')
    .replace(/\\d?frac\{(-?\d+)\}\{(-?\d+)\}/g, (_, a, b) => `(${a}/${b})`)
    .replace(/\s+/g, '');
  if (!/^\(?-?[\d/()+-]+$/.test(propre)) return null;
  if (!propre.includes('/')) return null;
  try {
    // eslint-disable-next-line no-new-func
    const v = Function(`"use strict";return (${propre});`)();
    return Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
}

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
    // Les cibles viennent du volume réel des manuels : pour un savoir-faire,
    // 6 à 10 exercices d'entraînement, 5 problèmes, et une auto-évaluation
    // assez fournie pour qu'un mauvais jour ne se lise pas comme une lacune.
    if ((sf.problemes ?? []).length < 5) {
      dire(avertissements, `${oue} : ${(sf.problemes ?? []).length} problèmes (5 attendus)`);
    }
    if ((sf.test ?? []).length < 10) {
      dire(avertissements, `${oue} : ${(sf.test ?? []).length} items d'auto-évaluation (10 attendus)`);
    }
    if (!(sf.test ?? []).length) dire(erreurs, `${oue} : pas d'auto-évaluation`);

    // Le cours doit contenir au moins une propriété ou une définition : une
    // section faite que de remarques et d'exemples n'énonce rien.
    const types = new Set((sf.cours ?? []).map((b) => b.type));
    if (!['propriete', 'definition', 'theoreme'].some((t) => types.has(t))) {
      dire(erreurs, `${oue} : le cours n'énonce ni définition, ni propriété, ni théorème`);
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

      if (ex.type === 'plausible' || ex.type === 'vraifaux' || ex.type === 'premier') {
        if (typeof ex.attendu !== 'boolean') dire(erreurs, `${ou} : réponse attendue non booléenne`);
        if (ex.type === 'plausible' && !ex.explication) {
          dire(erreurs, `${ou} : un « plausible » sans explication n'apprend rien`);
        }
      }

      // Une décomposition qui ne redonne pas le nombre affiché est une
      // correction fausse — et elle se prouve, comme au chapitre 1.
      if (ex.type === 'facteurs') {
        if (!Array.isArray(ex.attendu) || !ex.attendu.length) {
          dire(erreurs, `${ou} : décomposition attendue absente`);
        } else {
          const nb = Number.parseInt(String(ex.enonce).replace(/[^\d]/g, ''), 10);
          const produit = ex.attendu.reduce((t, v) => t * v, 1);
          if (Number.isInteger(nb) && produit !== nb) {
            dire(erreurs, `${ou} : CORRECTION FAUSSE — ${ex.attendu.join(' × ')} vaut ${produit}, pas ${nb}`);
          }
          for (const f of ex.attendu) if (!estPremier(f)) {
            dire(erreurs, `${ou} : ${f} n'est pas premier — la décomposition n'en est pas une`);
          }
        }
      }

      // Une fraction simplifiée doit être ÉGALE à celle de l'énoncé, et ne
      // plus rien avoir à simplifier. Les deux se vérifient.
      if (ex.type === 'fraction') {
        if (!Array.isArray(ex.attendu) || ex.attendu.length !== 2) {
          dire(erreurs, `${ou} : il faut un numérateur et un dénominateur`);
        } else {
          const [n, d] = ex.attendu;
          if (!d) dire(erreurs, `${ou} : dénominateur nul`);
          else if (pgcd(n, d) !== 1) {
            dire(erreurs, `${ou} : ${n}/${d} se simplifie encore (par ${pgcd(n, d)})`);
          }
          // Et surtout : la réponse vaut-elle vraiment ce que l'énoncé demande ?
          // Sans cette vérification, changer les nombres d'un énoncé sans
          // toucher à sa réponse passe inaperçu — c'est arrivé.
          const valeur = evaluerFractions(ex.enonce);
          if (valeur !== null && d && Math.abs(valeur - n / d) > 1e-9) {
            dire(
              erreurs,
              `${ou} : CORRECTION FAUSSE — « ${ex.enonce} » vaut ${valeur.toFixed(6)}, `
              + `mais la réponse ${n}/${d} vaut ${(n / d).toFixed(6)}`,
            );
          }
        }
      }

      if (ex.type === 'corriger') {
        const fausses = (ex.lignes ?? []).filter((l) => l.fausse);
        if (fausses.length !== 1) {
          dire(erreurs, `${ou} : il faut exactement une ligne fausse (${fausses.length} trouvée·s)`);
        }
        if (!ex.explication) dire(erreurs, `${ou} : « corriger » sans explication`);
      }

      // Le type `expression` est le seul où l'élève écrit des mathématiques,
      // et donc le seul où une correction fausse serait invisible à la
      // relecture : « développe 2(x+5) → 2x+5 » se lit sans choquer. On
      // compare donc la réponse à l'énoncé en remplaçant la lettre par des
      // nombres, exactement comme le fera l'application devant l'élève.
      if (ex.type === 'expression') {
        if (typeof ex.attendu !== 'string' || !ex.attendu.trim()) {
          dire(erreurs, `${ou} : réponse attendue absente`);
        } else {
          // Un programme de calcul a pour énoncé une phrase (« nombre choisi :
          // x »), pas une expression : il n'y a rien à comparer, et le signaler
          // ne ferait que du bruit. C'est la consigne qui porte le programme.
          const enoncePhrase = String(ex.enonce ?? '').includes('text{');
          const eq = enoncePhrase ? null : equivalentes(ex.attendu, ex.enonce);
          if (eq === null) {
            if (!enoncePhrase) {
              dire(avertissements, `${ou} : énoncé ou réponse illisible par le moteur — vérifie à la main`);
            }
          } else if (!eq) {
            dire(erreurs, `${ou} : CORRECTION FAUSSE — « ${ex.attendu} » n'est pas équivalent à « ${ex.enonce} »`);
          }
          // Une « fausse » qui serait en réalité équivalente à la bonne réponse
          // compterait juste une réponse correcte — le pire des cas.
          for (const f of ex.fausses ?? []) {
            if (equivalentes(f.valeur, ex.attendu) === true) {
              dire(erreurs, `${ou} : la réponse « fausse » ${f.valeur} est équivalente à la bonne`);
            }
          }
        }
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

      // Un point hors du cadre n'est pas tracé, et rien ne le signale à
      // l'écran : l'élève cherche alors une valeur qui n'est nulle part.
      // C'est une faute silencieuse, donc exactement celles qu'on remonte ici.
      for (const [x, y] of pointsHorsCadre(ex.graphique)) {
        dire(erreurs, `${ou} : le point (${x} ; ${y}) sort du cadre du graphique`);
      }
    }
  }
}

// --- Les listings du chapitre 17 --------------------------------------------
//
// Le retrait d'un programme est une DONNÉE : c'est lui qui dit ce qui est dans
// la boucle. Une tabulation s'affiche selon le navigateur, parfois sur huit
// colonnes, parfois sur deux — le même programme ne dirait alors pas la même
// chose à deux élèves. On l'interdit, plutôt que de compter dessus.

for (const chapitre of CHAPITRES) {
  for (const sf of chapitre.savoirFaire) {
    const cibles = [
      ['découverte', sf.decouvrir?.programme],
      ...[...exercicesDe(sf), ...(sf.problemes ?? [])].map((x) => [x.id, x.programme]),
    ];
    for (const [ou, prog] of cibles) {
      if (prog === undefined) continue;
      const ouSf = `${sf.id} · ${ou}`;
      if (!Array.isArray(prog) || !prog.length) {
        dire(erreurs, `${ouSf} : un programme doit être un tableau de lignes non vide`);
        continue;
      }
      if (prog.some((l) => typeof l !== 'string')) {
        dire(erreurs, `${ouSf} : toutes les lignes d'un programme doivent être du texte`);
      }
      if (prog.some((l) => String(l).includes('\t'))) {
        dire(erreurs, `${ouSf} : tabulation dans le programme — le retrait doit être en espaces`);
      }
      // Dix lignes est la limite que se donne le chapitre : au-delà, l'élève
      // ne suit plus l'exécution de tête, et on mesure autre chose.
      //
      // La limite porte sur UN programme, pas sur le listing : la moitié des
      // items en affichent deux côte à côte — c'est comme ça qu'on rend
      // l'ordre visible — et les compter ensemble faisait crier ce contrôle
      // cinq fois pour rien. Un contrôle qui crie au loup finit ignoré.
      const blocs = String(prog.join('\n')).split(/\n\s*\n/);
      const plusLong = Math.max(...blocs.map((b) => b.split('\n').filter((l) => l.trim()).length));
      if (plusLong > 10) {
        dire(avertissements, `${ouSf} : programme de ${plusLong} lignes (10 au plus)`);
      }
    }
  }
}

// --- Les graphiques du chapitre 14 ------------------------------------------
//
// Les points des problèmes et de la découverte passent par le même contrôle :
// ils ne traversent pas la boucle ci-dessus, qui ne voit que les exercices.

for (const chapitre of CHAPITRES) {
  for (const sf of chapitre.savoirFaire) {
    const cibles = [
      ['découverte', sf.decouvrir?.graphique],
      ...(sf.problemes ?? []).map((pb) => [pb.id, pb.graphique]),
    ];
    for (const [ou, g] of cibles) {
      for (const [x, y] of pointsHorsCadre(g)) {
        dire(erreurs, `${sf.id} · ${ou} : le point (${x} ; ${y}) sort du cadre du graphique`);
      }
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

      // On cherche au moins une réponse qui passe : une validation qui ne peut
      // jamais être satisfaite bloquerait l'élève indéfiniment. Le balayage
      // suit le nombre de champs déclarés — un diviseur se cherche seul et
      // parmi des entiers, deux facteurs se cherchent en couple.
      const essai = (...v) => { try { return ce.valide(...v); } catch { return false; } };

      // Un `temoin` déclaré tranche la question : c'est une réponse dont
      // l'auteur affirme qu'elle convient, et on la vérifie exactement.
      //
      // Le balayage qui suit ne sert que de filet pour le contenu qui n'en
      // déclare pas. Il ne peut pas tout couvrir : une validation qui lie les
      // deux champs par un facteur d'échelle — « b vaut a divisé par 60 », ou
      // « a fois 10⁻⁹ » — a ses solutions hors de portée de n'importe quelle
      // grille raisonnable. Quand le filet échoue, c'est un témoin qu'il faut
      // ajouter, pas une grille plus large.
      if (Array.isArray(ce.temoin)) {
        if (!essai(...ce.temoin)) {
          dire(erreurs, `${sf.id}/${ex.id} : le témoin déclaré (${ce.temoin.join(', ')}) ne satisfait pas sa propre validation`);
        }
        continue;
      }

      let trouve = false;
      if ((ce.champs ?? []).length === 1) {
        for (let a = -400; a <= 400 && !trouve; a += 1) if (essai(a)) trouve = true;
        for (let a = -12; a <= 12 && !trouve; a += 0.5) if (essai(a)) trouve = true;
      } else {
        for (let a = -400; a <= 400 && !trouve; a += 1) {
          for (let b = -400; b <= 400 && !trouve; b += 1) if (essai(a, b)) trouve = true;
        }
        for (let a = -12; a <= 12 && !trouve; a += 0.5) {
          for (let b = -12; b <= 12 && !trouve; b += 0.5) if (essai(a, b)) trouve = true;
        }
      }
      if (!trouve) {
        dire(
          erreurs,
          `${sf.id}/${ex.id} : aucun contre-exemple trouvé par balayage — si la validation `
          + `est juste, déclare un \`temoin: [a, b]\` qui la satisfait ; sinon elle est cassée `
          + `et l'élève ne peut pas réussir`,
        );
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

    // Le signe ne se « devine » que là où il varie. En divisibilité tout est
    // positif par nature : y exiger un mélange de signes n'aurait aucun sens.
    // Le chapitre déclare donc si les signes sont en jeu.
    if (ch.signesEnJeu) {
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
    }

    // Les items neutres : au moins un par savoir-faire, sinon le piège du
    // moment se déclenche partout et devient une règle.
    const neutres = (sf.entrainement ?? []).filter((e) => e.neutre).length;
    if (!neutres) dire(erreurs, `${sf.id} : aucun item neutre — le piège joue à tous les coups`);
  }
}

// --- Invariant 4 : un exercice ne recopie pas un exemple du cours ------------
//
// Le cas réel : le cours imprimait « 15 % de 240, c'est 240 × 15 ÷ 100 = 36 »
// et le premier exercice demandait 15 % de 240. Deux des trois items du palier
// étaient donc réussissables par recopie, réponse comprise — l'élève passait
// sans rien mobiliser.
//
// La bonne pratique est visible ailleurs dans le même chapitre : reprendre le
// CONTEXTE de l'exemple (des stylos, un prix) mais changer les nombres.

/** Réduit une expression à ses nombres et lettres : « 15\% de 240 » → « 15240 ». */
const empreinteNumerique = (s) =>
  String(s ?? '').replace(/\\[a-zA-Z]+/g, ' ').replace(/[^0-9]/g, '');

for (const ch of CHAPITRES) {
  for (const sf of ch.savoirFaire ?? []) {
    const exemples = (sf.cours ?? [])
      .map((b) => empreinteNumerique(b.texte))
      .filter((e) => e.length >= 4);
    if (!exemples.length) continue;

    // Reprendre l'exemple du cours dans UN exercice est du guidage, et les
    // manuels le font exprès : le premier item d'application rassure. Le défaut
    // commence quand ça devient la majorité d'un palier — l'élève traverse
    // alors le niveau en recopiant.
    const recopies = new Map();
    for (const ex of sf.entrainement ?? []) {
      const e = empreinteNumerique(ex.enonce);
      // Moins de quatre chiffres, c'est trop court pour être une signature :
      // « 2 + 3 » se retrouve partout sans que ce soit une recopie.
      if (e.length < 4) continue;
      if (!exemples.some((c) => c.includes(e))) continue;
      const p = ex.palier ?? 1;
      recopies.set(p, [...(recopies.get(p) ?? []), ex.id]);
    }

    for (const [palier, ids] of recopies) {
      const total = (sf.entrainement ?? []).filter((e) => (e.palier ?? 1) === palier).length;
      if (ids.length >= 2 && ids.length >= total / 2) {
        dire(
          avertissements,
          `${sf.id}, palier ${palier} : ${ids.length} items sur ${total} reprennent les nombres d'un exemple `
          + `du cours (${ids.join(', ')}) — le palier se traverse en recopiant. Garde le contexte, change les valeurs.`,
        );
      }
    }
  }
}

// --- Invariant 5 : chaque piège est complet ----------------------------------

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

// --- L'antislash mangé par JavaScript ---------------------------------------
//
// Dans une chaîne à quotes simples, '\ldots' vaut « ldots » : l'antislash est
// avalé comme échappement inconnu. Il en faut DEUX dans le source pour en
// obtenir un à l'exécution.
//
// Le contrôle porte donc sur la VALEUR de la chaîne, jamais sur le fichier :
// c'est le seul endroit où le bug est visible. À l'écran il donne
// « 2{,}7 ldots 2{,}54 » — une formule crue, illisible pour l'élève, et que
// personne ne repère en relisant le code puisque le source, lui, a l'air juste.
//
// Deux symptômes, parce que JavaScript traite les commandes différemment
// selon leur première lettre :
//
//   \ldots, \div, \square, \sqrt  → échappement INCONNU, l'antislash tombe et
//                                   le mot reste entier : « ldots ».
//   \times, \text, \frac          → échappement CONNU ! \t est une tabulation,
//                                   \f un saut de page. « \times » devient donc
//                                   une TABULATION suivie de « imes », et
//                                   chercher « times » ne trouve rien.
//
// Le second cas est le plus dangereux : il ne laisse aucun mot reconnaissable.
// Mais il laisse un caractère de contrôle, et un caractère de contrôle n'a
// rien à faire dans un énoncé.

const COMMANDES_LATEX = ['ldots', 'div', 'square', 'sqrt', 'cdot', 'leq', 'geq', 'approx'];

for (const ch of CHAPITRES) {
  for (const sf of ch.savoirFaire ?? []) {
    const aControler = [
      ...(sf.entrainement ?? []),
      ...(sf.test ?? []),
      ...(sf.problemes ?? []).flatMap((p) => p.questions ?? []),
    ];
    for (const item of aControler) {
      const enonce = item.enonce ?? item.texte;
      if (typeof enonce !== 'string') continue;
      const ou = `${sf.id}/${item.id ?? '(question)'}`;

      // Symptôme 1 : le mot de la commande, tout nu.
      for (const cmd of COMMANDES_LATEX) {
        if (new RegExp(`(^|[^\\\\])${cmd}`).test(enonce)) {
          erreurs.push(
            `${ou} : « \\${cmd} » a perdu son antislash — il en faut deux dans `
            + `le source. Énoncé : « ${enonce} »`,
          );
        }
      }

      // Symptôme 2 : un caractère de contrôle, laissé par \t, \f, \v, \b, \r.
      const controle = enonce.match(/[\t\f\v\b\r]/);
      if (controle) {
        const noms = { '\t': '\\t (tabulation)', '\f': '\\f', '\v': '\\v', '\b': '\\b', '\r': '\\r' };
        erreurs.push(
          `${ou} : contient ${noms[controle[0]]} — c'est une commande LaTeX dont `
          + `l'antislash a été interprété (\\times, \\text, \\frac…). Il en faut `
          + `deux dans le source. Énoncé : « ${JSON.stringify(enonce)} »`,
        );
      }
    }
  }
}

for (const a of avertissements) console.log(`  ~ ${a}`);
for (const e of erreurs) console.log(`  ✗ ${e}`);

if (erreurs.length) {
  console.log(`\n${erreurs.length} erreur(s). Le contenu n'est pas publiable.`);
  process.exit(1);
}
console.log(avertissements.length ? `\n${avertissements.length} avertissement(s), rien de bloquant.` : '\nTout est bon.');
