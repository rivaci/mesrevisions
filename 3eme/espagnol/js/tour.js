// Un « tour » : la suite des questions d'une étape, de « À revoir » ou de la
// mini-interro.
//
// ── Ce qui est raté revient ───────────────────────────────────────────────
//
// Une question ratée repasse en fin de tour, deux fois au plus : c'est le
// rappel qui fixe un mot, et le revoir juste après l'avoir raté est ce qui
// prend le moins de temps. Au-delà de deux, on arrête d'insister ce soir-là :
// le mot reste dans « À revoir » pour le lendemain.
//
// Seul le PREMIER essai d'un tour compte pour la progression. Un mot raté puis
// réussi trente secondes plus tard n'est pas su : c'est la mémoire immédiate
// qui répond.
//
// La mini-interro ne reprend rien : c'est un contrôle, pas un entraînement.
//
// Pur : ne touche ni au stockage ni à la page.

export const MAX_REPRISES = 2;

/** Mélange de Fisher-Yates. `alea` est injectable pour les tests. */
export function melanger(tableau, alea = Math.random) {
  const t = [...tableau];
  for (let i = t.length - 1; i > 0; i -= 1) {
    const j = Math.floor(alea() * (i + 1));
    [t[i], t[j]] = [t[j], t[i]];
  }
  return t;
}

/**
 * `questions` : des entrées { id } — ou { id, mode: 'reconnaitre', options }
 * pour un QCM espagnol → français.
 */
export const nouveauTour = (questions, { reprendre = true } = {}) => ({
  file: questions.map((q) => ({ ...q })),
  index: 0,
  premiers: {},
  reprises: {},
  reprendre,
});

export const courant = (tour) => tour.file[tour.index] ?? null;
export const estFini = (tour) => tour.index >= tour.file.length;

/** Vrai quand cette réponse est le premier essai de la question dans ce tour. */
export const estPremierEssai = (tour, id) => !(id in tour.premiers);

/** Note une réponse ; une question pas juste repasse en fin de file. */
export function enregistrer(tour, question, resultat) {
  if (estPremierEssai(tour, question.id)) tour.premiers[question.id] = resultat;
  const deja = tour.reprises[question.id] ?? 0;
  if (tour.reprendre && resultat !== 'juste' && deja < MAX_REPRISES) {
    tour.reprises[question.id] = deja + 1;
    tour.file.push({ ...question, reprise: deja + 1 });
  }
  return tour;
}

export function avancer(tour) {
  tour.index += 1;
  return tour;
}

/** Ce qu'on retient d'un tour : les premiers essais seulement. */
export function bilan(tour) {
  const valeurs = Object.values(tour.premiers);
  return {
    justes: valeurs.filter((r) => r === 'juste').length,
    presque: valeurs.filter((r) => r === 'presque').length,
    faux: valeurs.filter((r) => r === 'faux').length,
    rates: Object.keys(tour.premiers).filter((id) => tour.premiers[id] !== 'juste'),
  };
}

/** La note d'une interro : un point si juste, un demi si presque. */
export function note(tour) {
  const valeurs = Object.values(tour.premiers);
  const points = valeurs.reduce((s, r) => s + (r === 'juste' ? 1 : r === 'presque' ? 0.5 : 0), 0);
  return { points, sur: valeurs.length };
}

/**
 * La mini-interro : tant de questions par étape, mélangées. La première
 * question de vocabulaire de chaque étape tirée est posée à l'envers — de
 * l'espagnol vers le français, en QCM — pour varier comme le fait un contrôle.
 */
export function tirerInterro(unite, alea = Math.random) {
  const questions = [];
  for (const { etape, nombre } of unite.interro.tirage) {
    const e = unite.etapes.find((x) => x.id === etape);
    const tires = melanger(e.items.filter((i) => i.type !== 'decrire'), alea).slice(0, nombre);
    let aLEnvers = false;
    for (const item of tires) {
      if (!aLEnvers && (item.type === 'mot' || item.type === 'adjectif')) {
        aLEnvers = true;
        const autres = melanger(e.items.filter((i) => i.fr && i.id !== item.id), alea).slice(0, 2);
        questions.push({ id: item.id, mode: 'reconnaitre', options: melanger([item.fr, ...autres.map((a) => a.fr)], alea) });
      } else {
        questions.push({ id: item.id });
      }
    }
  }
  return melanger(questions, alea);
}
