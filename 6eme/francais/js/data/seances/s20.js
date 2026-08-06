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
// dont la réponse n'est pas le verbe (e5), et les items isolés e7, e9, e11, e12.
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

    // ── Palier 1 : les tests un par un, avant les phrases longues ────────
    //
    // Les six dictées suffisaient à peine à cinq minutes. Ces items isolent
    // chaque test du bilan pour qu'Anto le refasse à froid, sans avoir en même
    // temps à retenir une phrase entière.
    {
      id: 's20-e6', rappel: 'r1', type: 'completer', palier: 1, piege: 'participe-etre',
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Emma est ', verbe: 'rentrer', apres: ' du collège en avance.',
      attendu: 'rentrée',
    },
    {
      id: 's20-e8', rappel: 'r1', type: 'qcm', palier: 1, piege: 'chaine-groupe-nominal',
      consigne: "Choisis l'adjectif accordé avec le nom.",
      avant: 'Tom a mis ses ', apres: ' baskets pour le cross.',
      choix: ['nouveau', 'nouvelles', 'nouveaux'], attendu: 'nouvelles',
    },
    {
      // NEUTRE : auxiliaire *avoir*, complément après le verbe → le participe
      // reste nu, malgré un sujet féminin pluriel qui appelle deux marques.
      id: 's20-e11', rappel: 'r1', type: 'completer', palier: 1, piege: 'participe-avoir',
      neutre: true,
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Mes copines ont ', verbe: 'préparer', apres: ' un gâteau pour Zoé.',
      attendu: 'préparé',
    },
    {
      id: 's20-e14', rappel: 'r1', type: 'qcm', palier: 1, piege: 'e-ou-er',
      consigne: 'Remplace le verbe par « vendre » ou « vendu », puis choisis.',
      avant: 'Léa doit ', apres: ' sa chambre avant de sortir.',
      choix: ['rangé', 'ranger'], attendu: 'ranger',
    },

    // ── Palier 2 : le même test, mais avec un écran ou un homophone ──────
    {
      // NEUTRE : sujet masculin singulier, donc aucune marque à ajouter — alors
      // que « ses copains » juste après tire vers le pluriel. C'est l'accord
      // ajouté « au cas où » que cet item empêche d'installer.
      id: 's20-e7', rappel: 'r2', type: 'qcm', palier: 2, piege: 'participe-etre',
      neutre: true,
      consigne: 'Choisis le participe passé accordé avec le sujet.',
      avant: 'Tom est ', apres: ' au gymnase avec ses copains.',
      choix: ['arrivé', 'arrivée', 'arrivés'], attendu: 'arrivé',
    },
    {
      // NEUTRE : « de ses sœurs » attire vers le féminin pluriel, mais
      // l'adjectif se rapporte au sac. Réponse : la forme nue.
      id: 's20-e9', rappel: 'r2', type: 'qcm', palier: 2, piege: 'chaine-groupe-nominal',
      neutre: true,
      consigne: "Choisis l'adjectif accordé avec le nom.",
      avant: 'Anto a rangé le ', apres: ' sac de ses sœurs dans le coffre.',
      choix: ['gros', 'grosse', 'grosses'], attendu: 'gros',
    },
    {
      id: 's20-e10', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-avoir',
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Les photos que Tom a ', verbe: 'prendre', apres: ' sont floues.',
      attendu: 'prises',
    },
    {
      // NEUTRE : deux sujets féminins, et pourtant rien ne bouge — le
      // complément est après le verbe.
      id: 's20-e12', rappel: 'r2', type: 'qcm', palier: 2, piege: 'participe-avoir',
      neutre: true,
      consigne: 'Choisis le participe passé qui convient.',
      avant: 'Emma et Sarah ont ', apres: ' leurs affaires dans le couloir.',
      choix: ['laissé', 'laissés', 'laissées'], attendu: 'laissé',
    },
    {
      id: 's20-e13', rappel: 'r2', type: 'qcm', palier: 2, piege: 'homophone-grammatical',
      consigne: 'Remplace par « avait » dans ta tête, puis choisis.',
      avant: 'Le match de basket ', apres: ' commencé sans nous.',
      choix: ['a', 'à'], attendu: 'a',
    },

    // ── Réserve ──────────────────────────────────────────────────────────
    //
    // `reserve: true` : jamais jouées dans le parcours. Elles servent à la
    // reprise en début de séance suivante et à la seconde chance après une
    // erreur, qui exigent l'une comme l'autre une phrase JAMAIS vue portant le
    // même piège. Comme c'est la dernière séance et qu'elle en croise sept, la
    // réserve les couvre tous les sept — y compris ceux qu'on ne rencontre
    // qu'en dictée, où l'erreur est justement la plus probable.
    // Toutes sont piégeantes : les reprises écartent les items neutres.

    // Participe passé avec être : il faut ajouter la marque.
    {
      id: 's20-r1', rappel: 'r1', type: 'completer', palier: 1, piege: 'participe-etre',
      reserve: true,
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Léa est ', verbe: 'partir', apres: ' en vacances chez sa grand-mère.',
      attendu: 'partie',
    },
    {
      id: 's20-r2', rappel: 'r2', type: 'qcm', palier: 2, piege: 'participe-etre',
      reserve: true,
      consigne: 'Choisis le participe passé accordé avec le sujet.',
      avant: 'Les filles de ma classe sont ', apres: ' avant la fin du cours.',
      choix: ['sorti', 'sortie', 'sorties'], attendu: 'sorties',
    },
    {
      id: 's20-r3', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-etre',
      reserve: true,
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Mes grands-parents sont ', verbe: 'venir', apres: ' nous voir pendant les vacances.',
      attendu: 'venus',
    },

    // Participe passé avec avoir : le complément est passé devant, donc on accorde.
    {
      id: 's20-r4', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-avoir',
      reserve: true,
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Les BD que Hugo a ', verbe: 'emprunter', apres: ' sont déjà rendues.',
      attendu: 'empruntées',
    },
    {
      id: 's20-r5', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-avoir',
      reserve: true,
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'La chanson que Zoé a ', verbe: 'choisir', apres: ' plaît à tout le monde.',
      attendu: 'choisie',
    },
    {
      id: 's20-r6', rappel: 'r2', type: 'qcm', palier: 2, piege: 'participe-avoir',
      reserve: true,
      consigne: 'Choisis le participe passé qui convient.',
      avant: 'Les places que mon père a ', apres: ' sont au premier rang.',
      choix: ['réservé', 'réservés', 'réservées'], attendu: 'réservées',
    },

    // Chaîne du groupe nominal.
    {
      id: 's20-r7', rappel: 'r1', type: 'completer', palier: 1, piege: 'chaine-groupe-nominal',
      reserve: true,
      consigne: "Écris l'adjectif, accordé comme il faut.",
      avant: 'Sarah a rapporté de ', verbe: 'beau', apres: ' photos de son voyage.',
      attendu: 'belles',
    },
    {
      id: 's20-r8', rappel: 'r2', type: 'qcm', palier: 2, piege: 'chaine-groupe-nominal',
      reserve: true,
      consigne: "Choisis l'adjectif accordé avec le nom.",
      avant: 'Le club a distribué des maillots ', apres: " à toute l'équipe.",
      choix: ['neuf', 'neufs', 'neuves'], attendu: 'neufs',
    },
    {
      id: 's20-r9', rappel: 'r2', type: 'toucher', palier: 2, piege: 'chaine-groupe-nominal',
      reserve: true,
      consigne: "Touche le nom qui commande l'accord de « pleines ».",
      mots: ['Les', 'chaussures', 'de', 'mon', 'frère', 'sont', 'pleines', 'de', 'boue.'],
      attendus: [1],
    },

    // Homophones grammaticaux.
    {
      id: 's20-r10', rappel: 'r1', type: 'qcm', palier: 1, piege: 'homophone-grammatical',
      reserve: true,
      consigne: 'Remplace par « avait » dans ta tête, puis choisis.',
      avant: 'Noé ', apres: ' perdu son écharpe dans le bus.',
      choix: ['a', 'à'], attendu: 'a',
    },
    {
      id: 's20-r11', rappel: 'r2', type: 'qcm', palier: 2, piege: 'homophone-grammatical',
      reserve: true,
      consigne: 'Remplace par « étaient » dans ta tête, puis choisis.',
      avant: 'Les chiens du voisin ', apres: ' encore dans le jardin.',
      choix: ['son', 'sont'], attendu: 'sont',
    },
    {
      id: 's20-r12', rappel: 'r2', type: 'qcm', palier: 2, piege: 'homophone-grammatical',
      reserve: true,
      consigne: 'Remplace par « avait » dans ta tête, puis choisis.',
      avant: 'Zoé range ses cahiers ', apres: ' la fin du cours.',
      choix: ['a', 'à'], attendu: 'à',
    },

    // é ou er.
    {
      id: 's20-r13', rappel: 'r1', type: 'qcm', palier: 1, piege: 'e-ou-er',
      reserve: true,
      consigne: 'Remplace le verbe par « vendre » ou « vendu », puis choisis.',
      avant: 'Hugo a ', apres: ' un but à la dernière minute.',
      choix: ['marqué', 'marquer'], attendu: 'marqué',
    },
    {
      id: 's20-r14', rappel: 'r2', type: 'qcm', palier: 2, piege: 'e-ou-er',
      reserve: true,
      consigne: 'Remplace le verbe par « vendre » ou « vendu », puis choisis.',
      avant: 'Emma va ', apres: ' ses affaires ce soir.',
      choix: ['préparé', 'préparer'], attendu: 'préparer',
    },
    {
      id: 's20-r15', rappel: 'r2', type: 'qcm', palier: 2, piege: 'e-ou-er',
      reserve: true,
      consigne: 'Remplace le verbe par « vendre » ou « vendu », puis choisis.',
      avant: 'Anto a oublié de ', apres: ' son livre au CDI.',
      choix: ['rapporté', 'rapporter'], attendu: 'rapporter',
    },

    // Écran du complément du nom : il n'apparaît qu'en dictée dans le parcours,
    // mais c'est là qu'Anto perd le sujet. La réserve doit donc en avoir.
    {
      id: 's20-r16', rappel: 'r1', type: 'completer', palier: 1, piege: 'ecran-complement-du-nom',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Le sac de mes sœurs ', verbe: 'être', apres: ' trop lourd.',
      attendu: 'est',
    },
    {
      id: 's20-r17', rappel: 'r2', type: 'completer', palier: 2, piege: 'ecran-complement-du-nom',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'La liste des fournitures ', verbe: 'tenir', apres: ' sur une seule page.',
      attendu: 'tient',
    },
    {
      id: 's20-r18', rappel: 'r2', type: 'qcm', palier: 2, piege: 'ecran-complement-du-nom',
      reserve: true,
      consigne: 'Cherche le sujet, puis choisis la bonne forme.',
      avant: 'La couleur des maillots ', apres: ' changé cette année.',
      choix: ['a', 'ont'], attendu: 'a',
    },

    // -ait / -aient : même son, deux orthographes. Seul le sujet tranche.
    {
      id: 's20-r19', rappel: 'r1', type: 'qcm', palier: 1, piege: 'ait-aient',
      reserve: true,
      consigne: 'Cherche le sujet, puis choisis la bonne forme.',
      avant: 'Les chevaux du club ', apres: ' au fond du pré.',
      choix: ['galopait', 'galopaient'], attendu: 'galopaient',
    },
    {
      id: 's20-r20', rappel: 'r2', type: 'qcm', palier: 2, piege: 'ait-aient',
      reserve: true,
      consigne: 'Cherche le sujet, puis choisis la bonne forme.',
      avant: 'Le train des sept heures ', apres: ' souvent du retard.',
      choix: ['avait', 'avaient'], attendu: 'avait',
    },
    {
      id: 's20-r21', rappel: 'r2', type: 'completer', palier: 2, piege: 'ait-aient',
      reserve: true,
      consigne: "Conjugue le verbe à l'imparfait.",
      avant: 'Les joueurs de mon équipe ', verbe: 'jouer', apres: ' très bien la saison dernière.',
      attendu: 'jouaient',
    },
  ],
};
