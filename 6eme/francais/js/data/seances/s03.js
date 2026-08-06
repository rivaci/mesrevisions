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

    // ── Palier 1, suite : faire ───────────────────────────────────────────
    {
      id: 's03-e15', rappel: 'r2', type: 'completer', palier: 1, piege: 'irregulier',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Anto et Hugo ', verbe: 'faire', apres: ' un exposé sur les volcans.', attendu: 'font',
    },
    {
      // NEUTRE : *nous faisons*, terminaison ordinaire. Il faut le contre-exemple
      // juste à côté de *vous faites*, sinon Anto écrira *nous faites*.
      id: 's03-e16', rappel: 'r2', type: 'completer', palier: 1, piege: 'irregulier',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Nous ', verbe: 'faire', apres: ' une partie de foot après le repas.', attendu: 'faisons',
    },

    // ── Palier 2, suite : pouvoir et venir ────────────────────────────────
    {
      // Le choix se joue sur la terminaison du singulier : *je peux*, *tu peux*,
      // mais *il peut*. Un QCM force à trancher entre les deux graphies.
      id: 's03-e17', rappel: 'r1', type: 'qcm', palier: 2, piege: 'irregulier',
      consigne: 'Récite la conjugaison dans ta tête, puis choisis.',
      avant: 'Tu ', apres: ' venir chez moi samedi ?',
      choix: ['peut', 'peux'], attendu: 'peux',
    },
    {
      id: 's03-e18', rappel: 'r1', type: 'completer', palier: 2, piege: 'irregulier',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Zoé ', verbe: 'venir', apres: ' à la maison ce soir.', attendu: 'vient',
    },

    // ── Palier 3, suite : prendre et vouloir ──────────────────────────────
    {
      // *je prends* garde le -s : c'est la faute la plus courante sur ce verbe.
      id: 's03-e19', rappel: 'r2', type: 'qcm', palier: 3, piege: 'irregulier',
      consigne: 'Récite la conjugaison dans ta tête, puis choisis.',
      avant: 'Je ', apres: ' toujours le même chemin pour rentrer.',
      choix: ['prend', 'prends'], attendu: 'prends',
    },
    {
      id: 's03-e20', rappel: 'r2', type: 'completer', palier: 3, piege: 'irregulier',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Je ', verbe: 'vouloir', apres: ' te montrer mon dessin.', attendu: 'veux',
    },

    // ── Réserve ──────────────────────────────────────────────────────────
    //
    // `reserve: true` : ces phrases ne sont PAS jouées dans le parcours. Elles
    // restent intactes pour la reprise en début de séance suivante et pour la
    // seconde chance après une erreur — qui exigent l'une comme l'autre une
    // phrase JAMAIS vue portant le même piège. Toutes sont piégeantes (aucune
    // n'est neutre) : les reprises écartent les items neutres, une réserve
    // neutre ne serait donc jamais proposée. Une par verbe du programme, pour
    // que la reprise ne retombe pas deux fois sur la même forme.
    {
      id: 's03-r1', rappel: 'r2', type: 'completer', palier: 1, piege: 'irregulier',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Vous ', verbe: 'faire', apres: ' des progrès en anglais.', attendu: 'faites',
    },
    {
      id: 's03-r2', rappel: 'r2', type: 'completer', palier: 1, piege: 'irregulier',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Vous ', verbe: 'dire', apres: ' que le film est génial.', attendu: 'dites',
    },
    {
      id: 's03-r3', rappel: 'r1', type: 'completer', palier: 1, piege: 'irregulier',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Emma et Sarah ', verbe: 'aller', apres: ' au cinéma samedi.', attendu: 'vont',
    },
    {
      id: 's03-r4', rappel: 'r1', type: 'completer', palier: 2, piege: 'irregulier',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Mes voisins ', verbe: 'venir', apres: ' dîner ce soir.', attendu: 'viennent',
    },
    {
      id: 's03-r5', rappel: 'r1', type: 'completer', palier: 2, piege: 'irregulier',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Sarah et Zoé ', verbe: 'pouvoir', apres: ' dormir chez Emma.', attendu: 'peuvent',
    },
    {
      id: 's03-r6', rappel: 'r1', type: 'completer', palier: 2, piege: 'irregulier',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Anto et Noé ', verbe: 'voir', apres: ' le match depuis le premier rang.', attendu: 'voient',
    },
    {
      id: 's03-r7', rappel: 'r2', type: 'completer', palier: 3, piege: 'irregulier',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Hugo et Tom ', verbe: 'vouloir', apres: ' revoir le film.', attendu: 'veulent',
    },
    {
      id: 's03-r8', rappel: 'r2', type: 'completer', palier: 3, piege: 'irregulier',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Mes parents ', verbe: 'prendre', apres: ' le train pour Paris.', attendu: 'prennent',
    },
  ],
};
