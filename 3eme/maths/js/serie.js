// La série chronométrée : le tirage, la note, le temps.
//
// Une épreuve, pas un entraînement : aucune correction pendant la série, aucun
// Merlin. La copie corrigée vient à la fin, calcul par calcul, avec la règle
// et le savoir-faire à revoir. Seule nouveauté par rapport à l'interrogation,
// assumée : le chronomètre, pour voir la vitesse progresser d'une série à
// l'autre.
//
// Repris du DST blanc de l'appli de 5e (5eme/maths/js/dst.js). Ce fichier ne
// touche ni à la page ni au stockage : il se teste sous node.

/** Mélange de Fisher-Yates. `alea` est injectable pour les tests. */
export function melanger(tableau, alea = Math.random) {
  const t = [...tableau];
  for (let i = t.length - 1; i > 0; i -= 1) {
    const j = Math.floor(alea() * (i + 1));
    [t[i], t[j]] = [t[j], t[i]];
  }
  return t;
}

/** Les exercices où une série peut piocher : « S'entraîner » et « Se tester ». */
export const piocheDe = (sf) => [...(sf.entrainement ?? []), ...(sf.test ?? [])]
  .filter((ex) => ['calcul', 'fraction'].includes(ex.type));

/**
 * Les calculs d'une série : pour chaque savoir-faire du tirage, `nombre`
 * exercices pris au hasard, puis tout mélangé — à l'interrogation, les
 * familles de calculs se suivent sans ordre.
 *
 * `sfParId` : (id) → savoir-faire. Rend [{ sfId, exId }].
 */
export function tirerSerie(serie, sfParId, alea = Math.random) {
  return melanger(serie.tirage.flatMap(({ sf, nombre }) => melanger(piocheDe(sfParId(sf)), alea)
    .slice(0, nombre)
    .map((ex) => ({ sfId: sf, exId: ex.id }))), alea);
}

/**
 * La note : le nombre de calculs justes, et sa conversion sur le barème —
 * à l'interrogation, 27 justes sur 40 font 13,5 / 20.
 */
export function noterSerie(serie, reponses) {
  const justes = reponses.filter((r) => r?.correct).length;
  const sur = reponses.length;
  return { justes, sur, note: Math.round((justes * serie.bareme * 2) / sur) / 2, bareme: serie.bareme };
}

/** Une durée en clair : « 7 min 05 s », ou « 42 s ». */
export function duree(ms) {
  const s = Math.max(0, Math.round(ms / 1000));
  const min = Math.floor(s / 60);
  const sec = String(s % 60).padStart(2, '0');
  return min ? `${min} min ${sec} s` : `${s} s`;
}

/** Le chronomètre affiché pendant la série : « 7:05 ». */
export function chrono(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
