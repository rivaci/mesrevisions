// Séance 20 — Dictée bilan.
//
// Format : voir s06.js pour la séance de référence, s18.js pour le type
// `dictee` (texte lu à voix haute, comparaison mot à mot, points de contrôle).
//
// C'est l'épreuve finale : six phrases longues qui balaient les séances 1 à 17.
// Chaque phrase croise au moins trois pièges du catalogue, et on ne réexplique
// plus rien — les deux rappels ne sont qu'une liste de contrôle.
//
// Couverture des pièges sur les six phrases :
//   d1  écran du complément du nom · participe avec être · participe avec
//       avoir · é/er
//   d2  é/er (deux fois, deux réponses) · participe avec être sans marque
//   d3  participe avec avoir et complément placé devant · homophone · être
//   d4  écran qui ne trompe pas · é/er
//   d5  chaîne du groupe nominal (deux fois) · -ait / -aient
//   d6  homophone · participe avec être · é/er (deux fois)
//
// NEUTRES. Après dix-neuf séances, le réflexe le plus dangereux n'est plus
// l'oubli : c'est l'accord ajouté partout « au cas où ». Les items neutres sont
// donc ceux où la bonne réponse est la forme **nue** — participe invariable
// malgré un sujet pluriel (e2), adjectif masculin singulier (e3), phrase
// entière sans une lettre à ajouter (d2), écran qui ne tire pas (d4), homophone
// dont la réponse n'est pas le verbe (e5).
//
// e2 et d2 portent 'participe-etre' bien que l'auxiliaire soit *avoir* dans
// e2 : convention de s14, dont le raisonnement « mauvais-auxiliaire » est
// exactement la réponse attendue.

export default {
  numero: 20,
  bloc: 4,
  titre: 'Dictée bilan',
  sousTitre: 'Tout le programme en six phrases',
  objectif:
    "Écrire six phrases longues en tenant tous les tests des séances 1 à 17, sans aide et sans rappel intermédiaire.",

  rappels: [
    {
      id: 'r1',
      titre: 'La méthode, en trois temps',
      texte:
        "Six phrases, aucune aide, tout le programme. La méthode tient en trois temps.\n\n" +
        "**Pendant la dictée** : écris, sans t'arrêter. Ne corrige rien tout de suite, tu perdrais la suite.\n\n" +
        "**Premier passage** : chaque verbe, un par un. « Qui est-ce qui… ? », puis la terminaison.\n\n" +
        "**Deuxième passage** : chaque nom au pluriel ou au féminin. Son déterminant et ses adjectifs suivent-ils ?\n\n" +
        "On ne relit pas pour se rassurer. On relit pour trouver la faute — elle est là.",
      exemples: [
        { phrase: 'La cage des hamsters **était restée** ouverte.', note: "Qui est-ce qui était resté ? La cage — une seule, féminin. « Hamsters » ne commande rien." },
        { phrase: 'Les enfants ont **passé** la soirée à les **chercher**.', note: 'Avec *avoir* et le complément après → rien ne bouge. Puis « à **vendre** » → **-er**.' },
      ],
    },
    {
      id: 'r2',
      titre: 'La liste de contrôle',
      texte:
        "**Sujet** : le mot collé au verbe n'est pas forcément le sujet.\n\n" +
        "**é / er** : « vendre » va → **-er** ; « vendu » va → **-é**.\n\n" +
        "**Participe** : *être* → accord avec le sujet ; *avoir* → rien, sauf si le complément est passé devant.\n\n" +
        "**Groupe nominal** : le nom commande son déterminant et ses adjectifs, même à distance.\n\n" +
        "**Homophones** : remplace par l'imparfait, puis choisis.",
      exemples: [
        { phrase: "Les affiches que les élèves ont **dessinées**.", note: 'Avec *avoir*, on accorde ici : « les affiches » est passé devant le verbe.' },
        { phrase: 'Les élèves ont **dessiné** des affiches.', note: 'Le complément est après → rien ne bouge, malgré le sujet pluriel.' },
      ],
    },
  ],

  exercices: [
    // ── Palier 1 : trois phrases, quatre pièges chacune ──────────────────
    {
      id: 's20-e1', rappel: 'r1', type: 'toucher', palier: 1, piege: 'participe-etre',
      consigne: "Touche le mot qui commande l'accord de « restée ».",
      mots: ['La', 'porte', 'du', 'gymnase', 'est', 'restée', 'fermée.'], attendus: [1],
    },
    {
      // NEUTRE : sujet pluriel, auxiliaire *avoir*, complément après le verbe →
      // le participe ne prend rien. Le motif « pluriel, donc j'ajoute un -s »
      // donne ici la mauvaise réponse.
      id: 's20-e2', rappel: 'r1', type: 'completer', palier: 1, piege: 'participe-etre',
      neutre: true,
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Mes cousins ont ', verbe: 'apporter', apres: ' leurs jeux de société.',
      attendu: 'apporté',
    },
    {
      // NEUTRE : masculin singulier, l'adjectif ne prend aucune marque.
      id: 's20-e3', rappel: 'r1', type: 'qcm', palier: 1, piege: 'chaine-groupe-nominal',
      neutre: true,
      consigne: "Accorde l'adjectif avec le nom qu'il accompagne.",
      avant: 'Mon frère a acheté un ', apres: ' jeu vidéo hier.',
      choix: ['nouveau', 'nouvelle', 'nouveaux'], attendu: 'nouveau',
    },
    {
      id: 's20-d1', rappel: 'r1', type: 'dictee', palier: 1,
      consigne: 'Écoute la phrase, puis écris-la en entier.',
      texte: 'La cage des hamsters était restée ouverte, et les enfants ont passé la soirée à les chercher partout.',
      pointsControle: [
        { mot: 'était', piege: 'ecran-complement-du-nom' },
        { mot: 'restée', piege: 'participe-etre' },
        { mot: 'passé', piege: 'participe-avoir' },
        { mot: 'chercher', piege: 'e-ou-er' },
      ],
    },
    {
      // NEUTRE : phrase entière sans une seule lettre à ajouter. « allé » et
      // « chercher » se suivent : même son, deux réponses opposées.
      id: 's20-d2', rappel: 'r1', type: 'dictee', palier: 1, neutre: true,
      consigne: 'Écoute la phrase, puis écris-la en entier.',
      texte: 'Mon frère a rangé son casier, puis il est allé chercher le ballon dans le gymnase.',
      pointsControle: [
        { mot: 'rangé', piege: 'e-ou-er' },
        { mot: 'allé', piege: 'participe-etre' },
        { mot: 'chercher', piege: 'e-ou-er' },
      ],
    },
    {
      id: 's20-d3', rappel: 'r1', type: 'dictee', palier: 1,
      consigne: 'Écoute la phrase, puis écris-la en entier.',
      texte: 'Les affiches que les élèves ont dessinées sont accrochées dans le couloir du collège.',
      pointsControle: [
        { mot: 'dessinées', piege: 'participe-avoir' },
        { mot: 'sont', piege: 'homophone-grammatical' },
        { mot: 'accrochées', piege: 'participe-etre' },
      ],
    },

    // ── Palier 2 : trois phrases, et les homophones en plus ──────────────
    {
      id: 's20-e4', rappel: 'r2', type: 'qcm', palier: 2, piege: 'homophone-grammatical',
      consigne: 'Remplace par « étaient » dans ta tête, puis choisis.',
      avant: 'Mes cousines ', apres: ' arrivées avant nous.',
      choix: ['son', 'sont'], attendu: 'sont',
    },
    {
      // NEUTRE : le test de remplacement échoue, donc ce n'est pas le verbe.
      // Sans cet item, l'élève apprend « en dictée, on écrit toujours sont ».
      id: 's20-e5', rappel: 'r2', type: 'qcm', palier: 2, piege: 'homophone-grammatical',
      neutre: true,
      consigne: 'Remplace par « étaient » dans ta tête, puis choisis.',
      avant: 'Anto a oublié ', apres: ' cahier à la maison.',
      choix: ['son', 'sont'], attendu: 'son',
    },
    {
      // NEUTRE : l'écran « de ma classe » est singulier et le sujet pluriel — il
      // ne tire pas vers l'erreur — et les deux participes restent nus.
      id: 's20-d4', rappel: 'r2', type: 'dictee', palier: 2, neutre: true,
      consigne: 'Écoute la phrase, puis écris-la en entier.',
      texte: 'Les élèves de ma classe ont préparé une exposition, et le professeur a affiché leurs dessins.',
      pointsControle: [
        { mot: 'ont', piege: 'ecran-complement-du-nom' },
        { mot: 'préparé', piege: 'e-ou-er' },
        { mot: 'affiché', piege: 'e-ou-er' },
      ],
    },
    {
      id: 's20-d5', rappel: 'r2', type: 'dictee', palier: 2,
      consigne: 'Écoute la phrase, puis écris-la en entier.',
      texte: 'Dans la cour du collège, les nouveaux élèves attendaient devant les portes vertes du gymnase.',
      pointsControle: [
        { mot: 'nouveaux', piege: 'chaine-groupe-nominal' },
        { mot: 'attendaient', piege: 'ait-aient' },
        { mot: 'vertes', piege: 'chaine-groupe-nominal' },
      ],
    },
    {
      id: 's20-d6', rappel: 'r2', type: 'dictee', palier: 2,
      consigne: 'Écoute la phrase, puis écris-la en entier.',
      texte: 'Ma cousine et son amie sont montées dans le bus, mais elles ont oublié de payer le ticket.',
      pointsControle: [
        { mot: 'sont', piege: 'homophone-grammatical' },
        { mot: 'montées', piege: 'participe-etre' },
        { mot: 'oublié', piege: 'e-ou-er' },
        { mot: 'payer', piege: 'e-ou-er' },
      ],
    },
  ],
};
