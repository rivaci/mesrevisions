// Séance 11 — « é ou er ? »
//
// Format : voir s06.js, la séance de référence.
//
// Le type `qcm` n'apparaissait pas dans s06. Il reprend le cadre de phrase de
// `completer` — `avant` / `apres` — et y ajoute `choix`, les formes
// concurrentes, dont `attendu` est l'une, à la lettre près.
//
// NEUTRES. Ici le piège tient au SON : -é et -er se prononcent pareil. Un item
// neutre est donc un item où ce son ne piège pas — un verbe du 3ᵉ groupe, où
// « pris » et « prendre » s'entendent nettement. Le raisonnement demandé reste
// exactement le même (infinitif, ou participe ?), mais l'élève ne peut pas
// s'en tirer en piochant au hasard entre deux formes qui sonnent pareil : il
// doit faire le test. Sans ces items, il apprendrait à jouer à pile ou face.
//
// Les phrases où « a » ou « est » figure alors que la réponse est -er ne sont
// pas neutres : ce sont les pièges les plus utiles de la séance, ceux qui
// cassent le faux réflexe « il y a "a" dans la phrase, donc -é ».

export default {
  numero: 11,
  bloc: 3,
  titre: 'é ou er ?',
  sousTitre: 'Le test « vendre / vendu »',
  objectif: "Choisir entre -é et -er en remplaçant le verbe par « vendre ».",

  rappels: [
    {
      id: 'r1',
      titre: 'Le test « vendre / vendu »',
      texte:
        "À l'oreille, **-é** et **-er**, c'est le même son. Écouter ne sert à rien : " +
        "il faut un test.\n\n" +
        "**Remplace le verbe par « vendre ».**\n\n" +
        "Si **vendre** va → on écrit **-er**. Si c'est **vendu** qui va → on écrit **-é**.\n\n" +
        "C'est le test le plus rentable de toute l'orthographe : il tranche à tous les coups.",
      exemples: [
        { phrase: 'Il va **jouer** dehors.', note: '« Il va **vendre** » → ça tient, donc **-er**.' },
        { phrase: 'Il a **joué** dehors.', note: '« Il a **vendu** » → ça tient, donc **-é**.' },
      ],
    },
    {
      id: 'r2',
      titre: 'Les faux indices',
      texte:
        "Après **à, de, pour, sans**, et après un autre verbe (**il va, il veut, il faut**), " +
        "c'est l'infinitif : **-er**.\n\n" +
        "Méfie-toi du faux indice : voir « a » ou « est » quelque part dans la phrase ne " +
        "prouve rien. Dans *il a des devoirs à terminer*, le verbe suit **à**, pas **a**.\n\n" +
        "Ne regarde pas les petits mots : fais le test, lui ne se trompe jamais.",
      exemples: [
        { phrase: 'Il a des devoirs à **terminer**.', note: '« des devoirs à **vendre** » → **-er**.' },
        { phrase: 'Le chat a **sauté** de la table.', note: '« Le chat a **vendu** » → **-é**.' },
      ],
    },
  ],

  exercices: [
    // ── Palier 1 : le test, en situation simple ──────────────────────────
    {
      id: 's11-e1', rappel: 'r1', type: 'qcm', palier: 1, piege: 'e-ou-er',
      consigne: 'Fais le test « vendre / vendu », puis choisis.',
      avant: 'Anto veut ', apres: ' au foot avec ses copains.',
      choix: ['joué', 'jouer'], attendu: 'jouer',
    },
    {
      id: 's11-e2', rappel: 'r1', type: 'qcm', palier: 1, piege: 'e-ou-er',
      consigne: 'Fais le test « vendre / vendu », puis choisis.',
      avant: 'Il a ', apres: ' toute la soirée.',
      choix: ['travaillé', 'travailler'], attendu: 'travaillé',
    },
    {
      id: 's11-e3', rappel: 'r1', type: 'completer', palier: 1, piege: 'e-ou-er',
      consigne: 'Fais le test « vendre / vendu », puis écris le verbe.',
      avant: 'Ma sœur va ', verbe: 'promener', apres: ' le chien.', attendu: 'promener',
    },
    {
      id: 's11-e4', rappel: 'r1', type: 'completer', palier: 1, piege: 'e-ou-er',
      consigne: 'Fais le test « vendre / vendu », puis écris le verbe.',
      avant: "J'ai ", verbe: 'oublier', apres: ' mon cartable dans le bus.', attendu: 'oublié',
    },
    {
      // NEUTRE : « pris » et « prendre » ne se prononcent pas pareil, donc le
      // piège du son ne joue pas. Le test, lui, reste à faire.
      id: 's11-e5', rappel: 'r1', type: 'completer', palier: 1, piege: 'e-ou-er',
      neutre: true,
      consigne: 'Fais le test « vendre / vendu », puis écris le verbe.',
      avant: 'Il a ', verbe: 'prendre', apres: ' le bus tout seul.', attendu: 'pris',
    },
    {
      // NEUTRE
      id: 's11-e6', rappel: 'r1', type: 'completer', palier: 1, piege: 'e-ou-er',
      neutre: true,
      consigne: 'Fais le test « vendre / vendu », puis écris le verbe.',
      avant: 'Tu peux ', verbe: 'ouvrir', apres: ' la fenêtre.', attendu: 'ouvrir',
    },

    // ── Palier 2 : les petits mots, et le faux indice « a / est » ────────
    {
      // Piège central du palier : « a » est là, et pourtant c'est -er.
      id: 's11-e7', rappel: 'r2', type: 'qcm', palier: 2, piege: 'e-ou-er',
      consigne: 'Fais le test « vendre / vendu », puis choisis.',
      avant: 'Il a beaucoup de devoirs à ', apres: ' ce soir.',
      choix: ['terminé', 'terminer'], attendu: 'terminer',
    },
    {
      id: 's11-e8', rappel: 'r2', type: 'completer', palier: 2, piege: 'e-ou-er',
      consigne: 'Fais le test « vendre / vendu », puis écris le verbe.',
      avant: 'Mon frère est ', verbe: 'aller', apres: ' à la piscine.', attendu: 'allé',
    },
    {
      id: 's11-e9', rappel: 'r2', type: 'qcm', palier: 2, piege: 'e-ou-er',
      consigne: 'Fais le test « vendre / vendu », puis choisis.',
      avant: 'Pour ', apres: ' cette partie, il faut de la chance.',
      choix: ['gagné', 'gagner'], attendu: 'gagner',
    },
    {
      // NEUTRE : « dit » et « dire » s'entendent, le son ne piège plus.
      id: 's11-e10', rappel: 'r2', type: 'completer', palier: 2, piege: 'e-ou-er',
      neutre: true,
      consigne: 'Fais le test « vendre / vendu », puis écris le verbe.',
      avant: 'Il est sorti sans ', verbe: 'dire', apres: ' au revoir.', attendu: 'dire',
    },
    {
      id: 's11-e11', rappel: 'r2', type: 'completer', palier: 2, piege: 'e-ou-er',
      consigne: 'Fais le test « vendre / vendu », puis écris le verbe.',
      avant: 'Le chat a ', verbe: 'sauter', apres: ' de la table.', attendu: 'sauté',
    },
    {
      // Deuxième phrase avec « a » et pourtant -er : le faux réflexe ne peut
      // pas se réinstaller.
      id: 's11-e12', rappel: 'r2', type: 'qcm', palier: 2, piege: 'e-ou-er',
      consigne: 'Fais le test « vendre / vendu », puis choisis.',
      avant: "Anto n'a pas pensé à ", apres: ' son cahier de maths.',
      choix: ['rapporté', 'rapporter'], attendu: 'rapporter',
    },
    {
      // NEUTRE
      id: 's11-e13', rappel: 'r2', type: 'completer', palier: 2, piege: 'e-ou-er',
      neutre: true,
      consigne: 'Fais le test « vendre / vendu », puis écris le verbe.',
      avant: 'Nous avons ', verbe: 'voir', apres: ' un film hier soir.', attendu: 'vu',
    },
    {
      id: 's11-e14', rappel: 'r2', type: 'toucher', palier: 2, piege: 'e-ou-er',
      consigne: 'Touche le verbe que tu peux remplacer par « vendre ».',
      mots: ['Il', 'a', 'décidé', 'de', 'ranger', 'sa', 'chambre.'], attendus: [4],
    },
  ],
};
