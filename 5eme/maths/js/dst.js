// Le DST blanc : le tirage des questions et la note.
//
// Une épreuve, pas un entraînement : aucune correction pendant le DST, aucun
// Merlin, aucune reprise. La correction vient à la fin, question par question,
// comme une copie rendue. Seule différence avec la classe, assumée : chaque
// erreur arrive avec sa règle et le savoir-faire à revoir.
//
// Ce fichier ne touche ni à la page ni au stockage : il se teste sous node.

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
 * Les questions d'un DST, partie après partie : pour chaque savoir-faire du
 * tirage, `nombre` exercices de « Se tester » pris au hasard ; mélangés à
 * l'intérieur de leur partie, comme les exercices d'un même thème sur une copie.
 *
 * `sfParId` : (id) → savoir-faire. Rend [{ partie, sfId, exId }].
 */
export function tirerDst(dst, sfParId, alea = Math.random) {
  return dst.parties.flatMap((p, partie) => melanger(
    p.tirage.flatMap(({ sf, nombre }) => melanger(sfParId(sf).test, alea)
      .slice(0, nombre)
      .map((ex) => ({ partie, sfId: sf, exId: ex.id }))),
    alea,
  ));
}

/** La note : un point par question juste, sur le nombre de questions, et par partie. */
export function noterDst(dst, questions, reponses) {
  const parPartie = dst.parties.map((p, i) => {
    const ici = questions.map((q, k) => ({ q, r: reponses[k] })).filter(({ q }) => q.partie === i);
    return { titre: p.titre, points: ici.filter(({ r }) => r?.correct).length, sur: ici.length };
  });
  return {
    points: parPartie.reduce((s, p) => s + p.points, 0),
    sur: questions.length,
    parPartie,
  };
}
