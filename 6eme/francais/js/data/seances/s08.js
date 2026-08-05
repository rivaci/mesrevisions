// Séance 8 — Le sujet inversé.
//
// Troisième façon de perdre le sujet : il n'est plus caché derrière un écran,
// il est passé DERRIÈRE le verbe. Deux cas au programme de 5e — la question
// (« où vont les enfants ? ») et le complément placé en tête (« sur la table
// traînent des papiers »).
//
// Piège : `sujet-inverse` sur toute la séance.
//
// Items neutres : phrases qui COMMENCENT comme les autres — un mot interrogatif,
// un complément de lieu en tête — mais où le sujet reste devant le verbe.
// Sans elles, l'élève retiendrait « la phrase commence par un complément, donc
// le sujet est après le verbe » et accorderait de travers dès qu'une phrase
// banale débute par « dans la cour ».

export default {
  numero: 8,
  bloc: 2,
  titre: 'Le sujet inversé',
  sousTitre: 'Quand le sujet passe derrière le verbe',
  objectif:
    "Retrouver le sujet quand il est placé après le verbe, dans les questions et après un complément mis en tête.",

  rappels: [
    {
      id: 'r1',
      titre: 'Dans les questions',
      texte:
        "Dans une question, le sujet passe souvent **derrière** le verbe : " +
        "*où vont les enfants ?*\n\n" +
        "Il commande l'accord quand même. Pour le voir, **remets la phrase à " +
        "l'endroit** : *où vont les enfants ?* → *les enfants vont où ?*\n\n" +
        "La question à poser reste la même que d'habitude : **« qui est-ce qui… ? »**",
      exemples: [
        { phrase: 'Où **vont** les enfants ?', note: "À l'endroit : *les enfants vont où ?* → sujet **les enfants**, plusieurs." },
        { phrase: 'Que **veut** ton frère ?', note: "À l'endroit : *ton frère veut quoi ?* → sujet **ton frère**, un seul." },
      ],
    },
    {
      id: 'r2',
      titre: 'Quand un complément passe devant',
      texte:
        "Hors des questions aussi le sujet peut basculer : quand la phrase " +
        "**commence par un complément**.\n\n" +
        "*Sur la table **traînent** des papiers.* Le mot collé au verbe, *table*, " +
        "n'est pas le sujet : c'est un complément de lieu. Qui est-ce qui traîne ? " +
        "**des papiers**.\n\n" +
        "Repère la petite préposition en tête — *sur, dans, sous, derrière* : " +
        "ce qui la suit ne sera jamais le sujet.",
      exemples: [
        { phrase: 'Sur la table **traînent** des papiers.', note: 'Qui est-ce qui traîne ? **Des papiers** — plusieurs.' },
        { phrase: 'Derrière les buissons **surgit** un chat.', note: 'Qui est-ce qui surgit ? **Un chat** — un seul.' },
      ],
    },
  ],

  exercices: [
    // ── Palier 1 : les questions ─────────────────────────────────────────
    {
      id: 's08-e1', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-inverse',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Où ', verbe: 'aller', apres: ' les enfants après le cours ?', attendu: 'vont',
    },
    {
      id: 's08-e2', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-inverse',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Que ', verbe: 'vouloir', apres: ' ton petit frère ?', attendu: 'veut',
    },
    {
      // NEUTRE : c'est bien une question, mais le sujet est resté devant le
      // verbe. Sans cet item, l'élève chercherait le sujet après le verbe dès
      // qu'il voit un point d'interrogation.
      id: 's08-e3', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-inverse',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Pourquoi est-ce que les élèves ', verbe: 'crier', apres: ' si fort ?', attendu: 'crient',
    },
    {
      id: 's08-e4', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-inverse',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Quand ', verbe: 'arriver', apres: ' tes cousins ?', attendu: 'arrivent',
    },
    {
      // NEUTRE : question sans inversion, sujet singulier.
      id: 's08-e5', rappel: 'r1', type: 'completer', palier: 1, piege: 'sujet-inverse',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Est-ce que ton chien ', verbe: 'dormir', apres: ' dans ta chambre ?', attendu: 'dort',
    },

    // ── Palier 2 : un complément en tête de phrase ───────────────────────
    {
      // Complément singulier, sujet pluriel : accorder avec « table » donnerait
      // *traîne*.
      id: 's08-e6', rappel: 'r2', type: 'completer', palier: 2, piege: 'sujet-inverse',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Sur la table ', verbe: 'traîner', apres: ' des papiers.', attendu: 'traînent',
      // L'orthographe rectifiée de 1990 supprime l'accent circonflexe : la
      // séance juge l'accord, pas le chapeau du i.
      variantes: ['trainent'],
    },
    {
      // Complément pluriel, sujet singulier : le piège joue dans l'autre sens.
      id: 's08-e7', rappel: 'r2', type: 'completer', palier: 2, piege: 'sujet-inverse',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Derrière les buissons ', verbe: 'surgir', apres: ' un chat.', attendu: 'surgit',
    },
    {
      // NEUTRE : complément en tête, mais phrase dans l'ordre normal.
      id: 's08-e8', rappel: 'r2', type: 'completer', palier: 2, piege: 'sujet-inverse',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Sur le bureau, les cahiers ', verbe: 'attendre', apres: ' depuis hier.', attendu: 'attendent',
    },
    {
      id: 's08-e9', rappel: 'r2', type: 'completer', palier: 2, piege: 'sujet-inverse',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Dans le jardin ', verbe: 'pousser', apres: ' des fraises.', attendu: 'poussent',
    },
    {
      // NEUTRE : même début de phrase que l'exercice précédent, ordre normal.
      id: 's08-e10', rappel: 'r2', type: 'completer', palier: 2, piege: 'sujet-inverse',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Dans la cour, mon frère ', verbe: 'jouer', apres: ' au ballon.', attendu: 'joue',
    },

    // ── Palier 3 : désigner le sujet, où qu'il soit ──────────────────────
    {
      id: 's08-e11', rappel: 'r1', type: 'toucher', palier: 3, piege: 'sujet-inverse',
      consigne: 'Touche le sujet du verbe.',
      mots: ['Où', 'vont', 'tes', 'cousins ?'], attendus: [3],
    },
    {
      id: 's08-e12', rappel: 'r2', type: 'toucher', palier: 3, piege: 'sujet-inverse',
      consigne: 'Touche le sujet du verbe.',
      mots: ['Sur', 'la', 'table', 'traînent', 'des', 'papiers.'], attendus: [5],
    },
    {
      // NEUTRE : la phrase commence par un complément, mais le sujet est devant
      // le verbe. C'est l'item qui empêche la fausse règle.
      id: 's08-e13', rappel: 'r2', type: 'toucher', palier: 3, piege: 'sujet-inverse',
      neutre: true,
      consigne: 'Touche le sujet du verbe.',
      mots: ['Dans', 'la', 'cour,', 'les', 'grands', 'jouent', 'au', 'ballon.'], attendus: [4],
    },
    {
      // NEUTRE : question, sujet non inversé.
      id: 's08-e14', rappel: 'r1', type: 'toucher', palier: 3, piege: 'sujet-inverse',
      neutre: true,
      consigne: 'Touche le sujet du verbe.',
      mots: ['Est-ce', 'que', 'ton', 'frère', 'vient', 'ce', 'soir ?'], attendus: [3],
    },
  ],
};
