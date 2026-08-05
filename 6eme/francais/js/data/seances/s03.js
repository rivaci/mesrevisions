// Séance 3 — Le présent : les huit irréguliers.
//
// Format : voir s06.js, la séance de référence.
//
// Piège unique : 'irregulier'. Les items neutres sont les formes de ces mêmes
// verbes où la terminaison ordinaire suffit (*nous disons*, *vous venez*) : sans
// elles, Anto apprendrait « avec ces huit verbes, il faut toujours inventer
// quelque chose de bizarre » et déformerait aussi les formes régulières.
//
// RÉPARTITION ENTRE LES RAPPELS. Le parcours joue les exercices GROUPÉS PAR
// RAPPEL, pas dans l'ordre du fichier. Chaque item neutre est donc rattaché au
// même rappel que la forme qu'il contredit — *nous disons* avec *vous dites*,
// *nous prenons* avec *ils prennent*, *nous pouvons* avec *ils peuvent*. Sinon
// Anto enchaînerait sept formes surprenantes d'affilée, puis sept formes
// ordinaires : exactement le motif que les items neutres doivent casser.
// r1 prend aller / venir / pouvoir / voir, r2 ses quatre formes vedettes
// (faites, dites, prennent, veulent) et leurs contre-exemples.

export default {
  numero: 3,
  bloc: 1,
  titre: 'Le présent : les huit irréguliers',
  sousTitre: "Les verbes qu'on ne peut pas deviner",
  objectif:
    'Écrire sans hésiter les formes des huit verbes irréguliers du programme, surtout celles qui surprennent.',

  rappels: [
    {
      id: 'r1',
      titre: 'Les huit à connaître par cœur',
      texte:
        "**faire, aller, dire, venir, pouvoir, voir, vouloir, prendre.**\n\n" +
        "Ce sont les verbes les plus fréquents de la langue : une erreur sur eux se voit " +
        "dans toutes les dictées.\n\n" +
        "Ils ne se déduisent pas de l'infinitif. *aller* est en *-er* mais ne se conjugue " +
        "pas comme *chanter* : on dit *je vais*, pas *j'alle*.\n\n" +
        "Le geste : récite la conjugaison entière dans ta tête, de *je* à *ils*, avant d'écrire.",
      exemples: [
        { phrase: 'Je **vais** au collège à pied.', note: 'Infinitif *aller*, mais radical *v-*.' },
        { phrase: 'Nous **allons** au collège à pied.', note: 'Avec *nous*, le radical de l\'infinitif revient.' },
      ],
    },
    {
      id: 'r2',
      titre: 'Les quatre formes qui piègent',
      texte:
        "Quatre formes se trompent presque à tous les coups :\n\n" +
        "vous **faites** — jamais *faisez*.\n" +
        "vous **dites** — jamais *disez*.\n" +
        "ils **prennent** — jamais *prendent* (le *d* disparaît, le *n* double).\n" +
        "ils **veulent** — jamais *voulent* (le radical change au pluriel).\n\n" +
        "À retenir aussi : ils **font**, ils **vont**, ils **peuvent**, ils **voient**, ils **viennent**.",
      exemples: [
        { phrase: 'Vous **faites** vos devoirs.', note: 'Une des trois seules formes en *-tes* du français.' },
        { phrase: 'Nous **faisons** nos devoirs.', note: 'Avec *nous*, la terminaison est ordinaire : *-ons*.' },
      ],
    },
  ],

  exercices: [
    // ── Palier 1 : faire, aller, dire ─────────────────────────────────────
    {
      id: 's03-e1', rappel: 'r2', type: 'completer', palier: 1, piege: 'irregulier',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Vous ', verbe: 'faire', apres: ' trop de bruit.', attendu: 'faites',
    },
    {
      id: 's03-e2', rappel: 'r2', type: 'completer', palier: 1, piege: 'irregulier',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Vous ', verbe: 'dire', apres: ' toujours la vérité.', attendu: 'dites',
    },
    {
      // NEUTRE : même verbe, terminaison ordinaire. Sans cet item, Anto
      // retiendrait « dire, c'est bizarre » et écrirait *nous ditons*.
      id: 's03-e3', rappel: 'r2', type: 'completer', palier: 1, piege: 'irregulier',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Nous ', verbe: 'dire', apres: ' bonjour au professeur.', attendu: 'disons',
    },
    {
      id: 's03-e4', rappel: 'r1', type: 'completer', palier: 1, piege: 'irregulier',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Les élèves ', verbe: 'aller', apres: ' au gymnase.', attendu: 'vont',
    },
    {
      // NEUTRE
      id: 's03-e5', rappel: 'r1', type: 'completer', palier: 1, piege: 'irregulier',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Nous ', verbe: 'aller', apres: ' à la piscine le mercredi.', attendu: 'allons',
    },

    // ── Palier 2 : venir, pouvoir, voir ───────────────────────────────────
    {
      id: 's03-e6', rappel: 'r1', type: 'completer', palier: 2, piege: 'irregulier',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Mes cousins ', verbe: 'venir', apres: ' dimanche.', attendu: 'viennent',
    },
    {
      id: 's03-e7', rappel: 'r1', type: 'completer', palier: 2, piege: 'irregulier',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Ils ', verbe: 'pouvoir', apres: ' entrer maintenant.', attendu: 'peuvent',
    },
    {
      // NEUTRE : avec *nous*, le radical de l'infinitif revient.
      id: 's03-e8', rappel: 'r1', type: 'completer', palier: 2, piege: 'irregulier',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Nous ', verbe: 'pouvoir', apres: ' commencer la partie.', attendu: 'pouvons',
    },
    {
      id: 's03-e9', rappel: 'r1', type: 'completer', palier: 2, piege: 'irregulier',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Les spectateurs ', verbe: 'voir', apres: ' très bien le match.', attendu: 'voient',
    },
    {
      // NEUTRE
      id: 's03-e10', rappel: 'r1', type: 'completer', palier: 2, piege: 'irregulier',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Vous ', verbe: 'venir', apres: ' avec nous au cinéma.', attendu: 'venez',
    },

    // ── Palier 3 : vouloir et prendre ─────────────────────────────────────
    {
      id: 's03-e11', rappel: 'r2', type: 'completer', palier: 3, piege: 'irregulier',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Ils ', verbe: 'vouloir', apres: ' gagner la coupe.', attendu: 'veulent',
    },
    {
      id: 's03-e12', rappel: 'r2', type: 'completer', palier: 3, piege: 'irregulier',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Les joueurs ', verbe: 'prendre', apres: ' le bus après le match.', attendu: 'prennent',
    },
    {
      // NEUTRE : *nous prenons*, un seul n et terminaison ordinaire.
      id: 's03-e13', rappel: 'r2', type: 'completer', palier: 3, piege: 'irregulier',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Nous ', verbe: 'prendre', apres: ' le train ce matin.', attendu: 'prenons',
    },
    {
      // NEUTRE
      id: 's03-e14', rappel: 'r2', type: 'completer', palier: 3, piege: 'irregulier',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Vous ', verbe: 'vouloir', apres: ' un dessert ?', attendu: 'voulez',
    },
  ],
};
