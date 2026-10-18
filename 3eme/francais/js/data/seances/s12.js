// Séance 12 — Les figures de ressemblance.
//
// D'après la fiche « Les figures de style » d'Evan, partie II : comparaison,
// métaphore (filée), allégorie, personnification, périphrase. Le chiasme, rangé
// au même endroit sur sa fiche, est travaillé séance 14 avec l'anaphore : c'est
// avec elle qu'on le confond. Les phrases sont écrites pour l'appli — sa
// feuille d'exercices cite des chansons, qu'on ne recopie pas.
//
// Ce que sa feuille montre : la faucheuse prise pour une personnification (c'est
// l'allégorie de la Mort), et une métaphore sans « comme » laissée vide. D'où
// deux pièges travaillés dans les deux sens, et des comparaisons dont l'outil
// n'est pas « comme » (ressembler à, aussi… que).

export default {
  numero: 12,
  bloc: 3,
  titre: 'Les figures de ressemblance',
  sousTitre: 'Comparer, prêter vie, désigner autrement',
  objectif: 'Reconnaître la comparaison, la métaphore, la périphrase, la personnification et l\'allégorie.',

  rappels: [
    {
      id: 'r1',
      titre: 'Comparaison, métaphore, périphrase',
      texte:
        'Une **figure de style** s\'écarte du langage ordinaire pour **produire un effet** et rendre le texte plus **expressif**.\n\n' +
        'La **comparaison** rapproche deux éléments **avec un outil** : *comme, tel, ainsi que, pareil à, ressembler à, aussi… que*.\n\n' +
        'La **métaphore** les rapproche **sans outil**. Quand elle se prolonge sur plusieurs lignes, elle est **filée**.\n\n' +
        'La **périphrase** **remplace un mot** par une expression de même sens : *l\'astre du jour* = le soleil. On peut la remplacer par **un seul mot**.',
      exemples: [
        { phrase: 'Ses mains étaient froides **comme** la glace.', note: 'L\'outil « comme » : une comparaison.' },
        { phrase: 'Ses mains étaient **de la glace**.', note: 'Sans outil : une métaphore.' },
        { phrase: '**Le meilleur ami de l\'homme** aboyait dans la cour.', note: 'Le chien, désigné sans être nommé : périphrase.' },
      ],
    },
    {
      id: 'r2',
      titre: 'La personnification et l\'allégorie',
      texte:
        'La **personnification** prête des **traits humains** à une chose ou à un animal : *la forêt **soupire***.\n\n' +
        'L\'**allégorie** donne une forme **concrète** à une **idée abstraite** — la Mort, la Justice, la Liberté. Elle prend souvent une **majuscule**.',
      exemples: [
        { phrase: 'Le vieux moulin **se plaignait** à chaque coup de vent.', note: 'Un objet qui agit comme un humain : personnification.' },
        { phrase: '**La Liberté**, drapeau levé, guide le peuple.', note: 'Une idée abstraite sous une forme concrète : allégorie.' },
      ],
    },
  ],

  exercices: [
    // ── Rappel 1 : comparaison ou métaphore ──────────────────────────────
    {
      id: 's12-e1', rappel: 'r1', type: 'toucher', palier: 1, piege: 'comparaison-ou-metaphore',
      consigne: 'Touche l\'outil de comparaison.',
      mots: ['Ses', 'yeux', 'brillaient', 'comme', 'deux', 'lanternes.'], attendus: [3],
    },
    {
      id: 's12-e2', rappel: 'r1', type: 'qcm', palier: 1, piege: 'comparaison-ou-metaphore',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Le gymnase **était une fournaise**.',
      choix: ['une comparaison', 'une métaphore'], attendu: 'une métaphore',
    },
    {
      id: 's12-e3', rappel: 'r1', type: 'qcm', palier: 1, piege: 'comparaison-ou-metaphore',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Il court **aussi vite qu\'un guépard**.',
      choix: ['une comparaison', 'une métaphore'], attendu: 'une comparaison',
    },
    {
      id: 's12-e4', rappel: 'r1', type: 'qcm', palier: 2, piege: 'comparaison-ou-metaphore',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Sa sœur **ressemblait à** une princesse sortie d\'un conte.',
      choix: ['une comparaison', 'une métaphore'], attendu: 'une comparaison',
    },
    {
      id: 's12-e5', rappel: 'r1', type: 'qcm', palier: 2, piege: 'comparaison-ou-metaphore',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Le lac, **miroir immobile**, reflétait les montagnes.',
      choix: ['une comparaison', 'une métaphore'], attendu: 'une métaphore',
    },
    {
      id: 's12-e6', rappel: 'r1', type: 'qcm', palier: 3, piege: 'comparaison-ou-metaphore',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Mon cœur est **un navire** : il **tangue**, **prend l\'eau** et cherche **un port**.',
      choix: ['une comparaison', 'une métaphore filée', 'une personnification'], attendu: 'une métaphore filée',
    },

    // ── Rappel 2 : personnification ou allégorie ─────────────────────────
    {
      id: 's12-e7', rappel: 'r2', type: 'qcm', palier: 1, piege: 'personnification-ou-allegorie',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Le vent **gémissait** contre les volets.',
      choix: ['une personnification', 'une allégorie'], attendu: 'une personnification',
    },
    {
      id: 's12-e8', rappel: 'r2', type: 'qcm', palier: 2, piege: 'personnification-ou-allegorie',
      consigne: 'Quelle est cette figure de style ?',
      phrase: '**La Justice**, les yeux bandés, tient sa balance.',
      choix: ['une personnification', 'une allégorie'], attendu: 'une allégorie',
    },
    {
      id: 's12-e9', rappel: 'r2', type: 'qcm', palier: 2, piege: 'personnification-ou-allegorie',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'La vieille horloge **s\'endormit** enfin.',
      choix: ['une personnification', 'une allégorie'], attendu: 'une personnification',
    },
    {
      id: 's12-e10', rappel: 'r2', type: 'qcm', palier: 3, piege: 'personnification-ou-allegorie',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Au bout de la route, **la faucheuse** attendait le voyageur.',
      choix: ['une personnification', 'une allégorie', 'une périphrase'], attendu: 'une allégorie',
    },

    // ── Rappel 1 encore : la périphrase ──────────────────────────────────
    {
      id: 's12-e11', rappel: 'r1', type: 'qcm', palier: 1, piege: 'periphrase-ou-metaphore',
      consigne: 'Quelle est cette figure de style ?',
      phrase: '**La Ville lumière** accueille des millions de touristes.',
      choix: ['une périphrase', 'une métaphore'], attendu: 'une périphrase',
    },
    {
      id: 's12-e12', rappel: 'r1', type: 'qcm', palier: 2, piege: 'periphrase-ou-metaphore',
      consigne: 'Quelle est cette figure de style ?',
      phrase: '**Le roi des animaux** dormait à l\'ombre d\'un arbre.',
      choix: ['une périphrase', 'une métaphore', 'une allégorie'], attendu: 'une périphrase',
    },

    // Réserve.
    {
      id: 's12-r1', rappel: 'r1', type: 'qcm', palier: 2, piege: 'comparaison-ou-metaphore', reserve: true,
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'La neige recouvrait la ville **tel un drap blanc**.',
      choix: ['une comparaison', 'une métaphore'], attendu: 'une comparaison',
    },
    {
      id: 's12-r2', rappel: 'r1', type: 'qcm', palier: 2, piege: 'comparaison-ou-metaphore', reserve: true,
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Ce professeur est **une encyclopédie vivante**.',
      choix: ['une comparaison', 'une métaphore'], attendu: 'une métaphore',
    },
    {
      id: 's12-r3', rappel: 'r1', type: 'qcm', palier: 3, piege: 'comparaison-ou-metaphore', reserve: true,
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Ses paroles **semblaient** des flèches lancées vers moi.',
      choix: ['une comparaison', 'une métaphore'], attendu: 'une comparaison',
    },
    {
      id: 's12-r4', rappel: 'r2', type: 'qcm', palier: 2, piege: 'personnification-ou-allegorie', reserve: true,
      consigne: 'Quelle est cette figure de style ?',
      phrase: '**La Guerre**, couverte de sang, avançait sur les champs.',
      choix: ['une personnification', 'une allégorie'], attendu: 'une allégorie',
    },
    {
      id: 's12-r5', rappel: 'r2', type: 'qcm', palier: 2, piege: 'personnification-ou-allegorie', reserve: true,
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Les étoiles nous **regardaient en souriant**.',
      choix: ['une personnification', 'une allégorie'], attendu: 'une personnification',
    },
    {
      id: 's12-r6', rappel: 'r2', type: 'qcm', palier: 3, piege: 'personnification-ou-allegorie', reserve: true,
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Sur l\'affiche, **Marianne** brandit le drapeau tricolore.',
      choix: ['une personnification', 'une allégorie'], attendu: 'une allégorie',
    },
    {
      id: 's12-r7', rappel: 'r1', type: 'qcm', palier: 2, piege: 'periphrase-ou-metaphore', reserve: true,
      consigne: 'Quelle est cette figure de style ?',
      phrase: '**L\'astre du jour** se levait derrière les collines.',
      choix: ['une périphrase', 'une métaphore'], attendu: 'une périphrase',
    },
    {
      id: 's12-r8', rappel: 'r1', type: 'qcm', palier: 2, piege: 'periphrase-ou-metaphore', reserve: true,
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Il parle couramment **la langue de Molière**.',
      choix: ['une périphrase', 'une métaphore'], attendu: 'une périphrase',
    },
    {
      id: 's12-r9', rappel: 'r1', type: 'qcm', palier: 3, piege: 'periphrase-ou-metaphore', reserve: true,
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Ma grand-mère est **un trésor**.',
      choix: ['une périphrase', 'une métaphore'], attendu: 'une métaphore',
    },
  ],
};
