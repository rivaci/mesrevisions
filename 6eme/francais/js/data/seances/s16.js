// Séance 16 — La chaîne d'accords dans le groupe nominal.
//
// Format : voir s06.js, la séance de référence.
//
//   qcm  reprend les champs `avant` / `apres` du completer, plus `choix`.
//        `attendu` est l'une des chaînes de `choix`, à la lettre près.
//
//   Le champ `verbe` du type `completer` porte ici la forme de base d'un
//   ADJECTIF — masculin singulier — au lieu d'un infinitif. Le rôle est le
//   même : la forme brute affichée à l'élève, qu'il doit accorder avant de
//   l'écrire. Aucun champ nouveau n'est introduit, pour que le rendu et le
//   correcteur restent ceux des quinze autres séances.
//
// PIÈGE. 'chaine-groupe-nominal' sur toute la séance. Ses raisonnements —
// « j'ai accordé avec le mot le plus proche », « l'adjectif était loin du
// nom », « je me suis trompé sur le genre » — couvrent exactement les trois
// erreurs que produisent les trois paliers.
//
// NEUTRES — deux par palier, de deux sortes :
//   — l'accord ne se voit pas (e2 neuf, e4 gris, e9 cassé, e13 lourd) : le
//     groupe est au masculin singulier, il n'y a rien à ajouter. Sans eux,
//     l'élève apprend « séance d'accords → j'ajoute une lettre » ;
//   — le mot le plus proche a le MÊME genre et le MÊME nombre que le nom
//     principal (e8 portes/salles, e14 cousines/sœurs) : la mauvaise méthode
//     — accorder avec le voisin — tombe juste. L'élève ne peut donc pas
//     retenir « l'adjectif s'accorde avec le nom d'à côté », ni la fausse
//     règle inverse « le nom d'à côté n'est jamais le bon ».
//
// e14 casse en plus la règle que e11 pourrait installer : « deux noms → on
// met le masculin pluriel ». Deux noms féminins donnent un féminin pluriel.

export default {
  numero: 16,
  bloc: 4,
  titre: "La chaîne d'accords dans le groupe nominal",
  sousTitre: 'Le nom commande, même à distance',
  objectif:
    "Accorder le déterminant et les adjectifs avec le nom principal du groupe, même quand d'autres mots les en séparent.",

  rappels: [
    {
      id: 'r1',
      titre: "Le nom donne l'ordre",
      texte:
        "Dans un groupe nominal, c'est le **nom** qui décide. Il porte un " +
        "**genre** — masculin ou féminin — et un **nombre** — singulier ou " +
        "pluriel.\n\n" +
        "Et il les donne à tout ce qui l'accompagne : le **déterminant** et " +
        "les **adjectifs**.\n\n" +
        "*des chaussures neuves* : « chaussures » est féminin pluriel → *des*, *neuves*.\n" +
        "*un ballon neuf* : masculin singulier → *un*, *neuf*, et rien à ajouter.\n\n" +
        "Quand tu hésites sur le genre, mets **un** ou **une** devant le nom : " +
        "celui qui sonne juste te donne la réponse.",
      exemples: [
        { phrase: 'Léa a mis des chaussures **neuves**.', note: '*chaussures* est féminin pluriel → **neuves**.' },
        { phrase: 'Anto a reçu un ballon **neuf**.', note: 'Masculin singulier → **neuf** ne bouge pas.' },
      ],
    },
    {
      id: 'r2',
      titre: 'Même à distance',
      texte:
        "L'adjectif ne s'accorde pas avec le mot le plus **proche**, mais avec " +
        "le nom auquel il se **rapporte** — même si plusieurs mots se glissent " +
        "entre les deux.\n\n" +
        "*La veste de mes cousins est **abîmée***. Ce ne sont pas les cousins " +
        "qui sont abîmés : c'est *la veste*, féminin singulier.\n\n" +
        "C'est le geste de la séance 6, appliqué à l'adjectif : trouve d'abord " +
        "le **nom principal**, celui qui porte le déterminant. Tout s'aligne sur lui.\n\n" +
        "Et si l'adjectif se rapporte à **deux noms**, il passe au pluriel — au " +
        "masculin dès qu'il y a un masculin dans le lot.",
      exemples: [
        { phrase: 'La veste de mes cousins est **abîmée**.', note: "Qu'est-ce qui est abîmé ? *la veste* — féminin singulier." },
        { phrase: 'Anto a acheté des chaussures de sport **blanches**.', note: '*sport* est juste avant, mais ce sont les *chaussures* qui sont blanches.' },
        { phrase: 'Une veste et un pantalon **neufs**.', note: 'Deux noms → pluriel ; un masculin dans le lot → masculin.' },
      ],
    },
  ],

  exercices: [
    // ── Palier 1 : le groupe simple, déterminant + nom + adjectif ────────
    {
      id: 's16-e1', rappel: 'r1', type: 'completer', palier: 1, piege: 'chaine-groupe-nominal',
      consigne: "Écris l'adjectif, accordé comme il faut.",
      avant: 'Léa a mis des chaussures ', verbe: 'neuf', apres: ' pour le tournoi.',
      attendu: 'neuves',
    },
    {
      // NEUTRE : masculin singulier, l'adjectif ne bouge pas. Même mot qu'en e1,
      // pour que la comparaison saute aux yeux.
      id: 's16-e2', rappel: 'r1', type: 'completer', palier: 1, piege: 'chaine-groupe-nominal',
      neutre: true,
      consigne: "Écris l'adjectif, accordé comme il faut.",
      avant: 'Anto a reçu un ballon ', verbe: 'neuf', apres: ' pour son anniversaire.',
      attendu: 'neuf',
    },
    {
      id: 's16-e3', rappel: 'r1', type: 'qcm', palier: 1, piege: 'chaine-groupe-nominal',
      consigne: 'Choisis le déterminant qui convient.',
      avant: 'Anto a oublié ', apres: ' affaires de sport à la maison.',
      choix: ['son', 'sa', 'ses'], attendu: 'ses',
    },
    {
      // NEUTRE : masculin singulier, et l'adjectif se termine déjà par -s.
      // Sans lui, l'élève apprendrait « -s au bout → c'est un pluriel ».
      id: 's16-e4', rappel: 'r1', type: 'completer', palier: 1, piege: 'chaine-groupe-nominal',
      neutre: true,
      consigne: "Écris l'adjectif, accordé comme il faut.",
      avant: 'Mon frère porte un pull ', verbe: 'gris', apres: ' tous les jours.',
      attendu: 'gris',
    },
    {
      // 0 Les, 1 pommes, 2 vertes, 3 sont, 4 dans, 5 le, 6 panier.
      // → le nom qui commande est en 1.
      id: 's16-e5', rappel: 'r1', type: 'toucher', palier: 1, piege: 'chaine-groupe-nominal',
      consigne: "Touche le nom qui commande l'accord de « vertes ».",
      mots: ['Les', 'pommes', 'vertes', 'sont', 'dans', 'le', 'panier.'],
      attendus: [1],
    },

    // ── Palier 2 : un autre nom s'intercale ──────────────────────────────
    {
      id: 's16-e6', rappel: 'r2', type: 'completer', palier: 2, piege: 'chaine-groupe-nominal',
      consigne: "Écris l'adjectif, accordé comme il faut.",
      avant: 'Anto a acheté des chaussures de sport ', verbe: 'blanc', apres: '.',
      attendu: 'blanches',
    },
    {
      id: 's16-e7', rappel: 'r2', type: 'completer', palier: 2, piege: 'chaine-groupe-nominal',
      consigne: "Écris l'adjectif, accordé comme il faut.",
      avant: 'La veste de mes cousins est ', verbe: 'abîmé', apres: '.',
      attendu: 'abîmée',
      // Même convention qu'en s08 : l'orthographe rectifiée de 1990 supprime
      // l'accent circonflexe du i. La séance juge l'accord, pas le chapeau.
      variantes: ['abimée'],
    },
    {
      // NEUTRE : le nom voisin (« salles ») a le même genre et le même nombre
      // que le nom principal (« portes »). Accorder avec le mot le plus proche
      // donne ici la bonne réponse — c'est justement à quoi sert cet item :
      // empêcher la fausse règle « le nom d'à côté n'est jamais le bon ».
      id: 's16-e8', rappel: 'r2', type: 'completer', palier: 2, piege: 'chaine-groupe-nominal',
      neutre: true,
      consigne: "Écris l'adjectif, accordé comme il faut.",
      avant: 'Les portes des salles sont ', verbe: 'fermé', apres: '.',
      attendu: 'fermées',
    },
    {
      // NEUTRE : tout est masculin singulier, rien à ajouter.
      id: 's16-e9', rappel: 'r2', type: 'completer', palier: 2, piege: 'chaine-groupe-nominal',
      neutre: true,
      consigne: "Écris l'adjectif, accordé comme il faut.",
      avant: 'Le vélo de mon cousin est ', verbe: 'cassé', apres: '.',
      attendu: 'cassé',
    },
    {
      // 0 Les, 1 raquettes, 2 du, 3 club, 4 sont, 5 neuves.
      // → le nom qui commande est en 1, pas le voisin « club » en 3.
      id: 's16-e10', rappel: 'r2', type: 'toucher', palier: 2, piege: 'chaine-groupe-nominal',
      consigne: "Touche le nom qui commande l'accord de « neuves ».",
      mots: ['Les', 'raquettes', 'du', 'club', 'sont', 'neuves.'],
      attendus: [1],
    },

    // ── Palier 3 : deux noms, ou une longue distance ─────────────────────
    {
      id: 's16-e11', rappel: 'r2', type: 'qcm', palier: 3, piege: 'chaine-groupe-nominal',
      consigne: "Choisis la forme de l'adjectif qui convient.",
      avant: 'Anto a mis une veste et un pantalon ', apres: ' pour la photo.',
      choix: ['neuf', 'neuve', 'neufs', 'neuves'], attendu: 'neufs',
    },
    {
      id: 's16-e12', rappel: 'r2', type: 'completer', palier: 3, piege: 'chaine-groupe-nominal',
      consigne: "Écris l'adjectif, accordé comme il faut.",
      avant: 'Léa a mis ses lunettes de soleil ', verbe: 'noir', apres: '.',
      attendu: 'noires',
    },
    {
      // NEUTRE : deux noms se sont glissés entre le nom principal et l'adjectif,
      // et pourtant il n'y a rien à ajouter. Sans cet item, l'élève retiendrait
      // « des mots au milieu → j'accorde au pluriel ».
      id: 's16-e13', rappel: 'r2', type: 'completer', palier: 3, piege: 'chaine-groupe-nominal',
      neutre: true,
      consigne: "Écris l'adjectif, accordé comme il faut.",
      avant: 'Le sac de sport de mon frère est ', verbe: 'lourd', apres: '.',
      attendu: 'lourd',
    },
    {
      // NEUTRE : deux noms coordonnés comme en e11, mais tous deux féminins —
      // donc féminin pluriel. C'est l'antidote de e11 : « deux noms » ne veut
      // pas dire « masculin pluriel ».
      id: 's16-e14', rappel: 'r2', type: 'completer', palier: 3, piege: 'chaine-groupe-nominal',
      neutre: true,
      consigne: "Écris l'adjectif, accordé comme il faut.",
      avant: 'Mes cousines et mes sœurs sont ', verbe: 'prêt', apres: ' pour le départ.',
      attendu: 'prêtes',
    },
    {
      id: 's16-e15', rappel: 'r1', type: 'completer', palier: 1, piege: 'chaine-groupe-nominal',
      consigne: "Écris l'adjectif, accordé comme il faut.",
      avant: 'Emma a rangé ses baskets ', verbe: 'boueux', apres: ' dans le garage.',
      attendu: 'boueuses',
    },
    {
      // 0 Zoé, 1 a, 2 choisi, 3 les, 4 chaussettes, 5 bleues.
      // → le nom qui commande est en 4.
      id: 's16-e16', rappel: 'r1', type: 'toucher', palier: 1, piege: 'chaine-groupe-nominal',
      consigne: "Touche le nom qui commande l'accord de « bleues ».",
      mots: ['Zoé', 'a', 'choisi', 'les', 'chaussettes', 'bleues.'],
      attendus: [4],
    },
    {
      id: 's16-e17', rappel: 'r2', type: 'completer', palier: 2, piege: 'chaine-groupe-nominal',
      consigne: "Écris l'adjectif, accordé comme il faut.",
      avant: 'La chambre de mes frères est ', verbe: 'rangé', apres: '.',
      attendu: 'rangée',
    },
    {
      id: 's16-e18', rappel: 'r2', type: 'qcm', palier: 2, piege: 'chaine-groupe-nominal',
      consigne: "Choisis la forme de l'adjectif qui convient.",
      avant: 'Le cahier de mes voisines est ', apres: ' de dessins.',
      choix: ['couvert', 'couverte', 'couverts', 'couvertes'], attendu: 'couvert',
    },
    {
      id: 's16-e19', rappel: 'r2', type: 'completer', palier: 3, piege: 'chaine-groupe-nominal',
      consigne: "Écris l'adjectif, accordé comme il faut.",
      avant: 'Le pull et la veste de Léa sont ', verbe: 'trempé', apres: ' par la pluie.',
      attendu: 'trempés',
    },
    {
      // 0 Le, 1 maillot, 2 des, 3 joueurs, 4 de, 5 l'équipe, 6 est, 7 neuf.
      // → deux noms se sont glissés avant l'adjectif ; celui qui commande est
      // toujours en 1.
      id: 's16-e20', rappel: 'r2', type: 'toucher', palier: 3, piege: 'chaine-groupe-nominal',
      consigne: "Touche le nom qui commande l'accord de « neuf ».",
      mots: ['Le', 'maillot', 'des', 'joueurs', 'de', "l'équipe", 'est', 'neuf.'],
      attendus: [1],
    },

    // ── Réserve ──────────────────────────────────────────────────────────
    //
    // `reserve: true` : ces phrases ne sont PAS jouées dans le parcours. Elles
    // restent neuves pour la reprise en début de séance suivante et pour la
    // seconde chance après une erreur, qui exigent l'une comme l'autre une
    // phrase JAMAIS vue portant le même piège. Toutes sont piégeantes : les
    // reprises écartent les items neutres, un neutre en réserve ne serait
    // jamais proposé.
    {
      id: 's16-r1', rappel: 'r1', type: 'completer', palier: 1, piege: 'chaine-groupe-nominal',
      reserve: true,
      consigne: "Écris l'adjectif, accordé comme il faut.",
      avant: 'Mamie a préparé des crêpes ', verbe: 'chaud', apres: ' pour le goûter.',
      attendu: 'chaudes',
    },
    {
      // 0 Anto, 1 a, 2 cueilli, 3 les, 4 grosses, 5 fraises, 6 du, 7 potager.
      // → l'adjectif est PLACÉ AVANT son nom, et un second nom le suit. Celui
      // qui commande reste « fraises », en 5.
      id: 's16-r2', rappel: 'r1', type: 'toucher', palier: 1, piege: 'chaine-groupe-nominal',
      reserve: true,
      consigne: "Touche le nom qui commande l'accord de « grosses ».",
      mots: ['Anto', 'a', 'cueilli', 'les', 'grosses', 'fraises', 'du', 'potager.'],
      attendus: [5],
    },
    {
      id: 's16-r3', rappel: 'r2', type: 'completer', palier: 2, piege: 'chaine-groupe-nominal',
      reserve: true,
      consigne: "Écris l'adjectif, accordé comme il faut.",
      avant: 'Le sac de mes sœurs est ', verbe: 'ouvert', apres: '.',
      attendu: 'ouvert',
    },
    {
      id: 's16-r4', rappel: 'r2', type: 'qcm', palier: 2, piege: 'chaine-groupe-nominal',
      reserve: true,
      consigne: "Choisis la forme de l'adjectif qui convient.",
      avant: 'Les griffes de mon chat sont ', apres: ' comme des aiguilles.',
      choix: ['pointu', 'pointue', 'pointus', 'pointues'], attendu: 'pointues',
    },
    {
      id: 's16-r5', rappel: 'r2', type: 'completer', palier: 3, piege: 'chaine-groupe-nominal',
      reserve: true,
      consigne: "Écris l'adjectif, accordé comme il faut.",
      avant: 'Le chapeau et les gants de Noé sont ', verbe: 'perdu', apres: '.',
      attendu: 'perdus',
    },
    {
      id: 's16-r6', rappel: 'r2', type: 'qcm', palier: 3, piege: 'chaine-groupe-nominal',
      reserve: true,
      consigne: "Choisis la forme de l'adjectif qui convient.",
      // Longue distance plutôt que noms coordonnés : deux compléments masculins
      // singuliers séparent « médailles » de son adjectif. La coordination reste
      // travaillée par r5, où « sont » rattache l'adjectif aux deux noms sans
      // ambiguïté — un adjectif épithète posé après deux noms, lui, se laisse
      // lire comme ne portant que sur le second.
      avant: 'Les médailles du tournoi de judo sont ', apres: ' au mur de ma chambre.',
      choix: ['accroché', 'accrochée', 'accrochés', 'accrochées'], attendu: 'accrochées',
    },
  ],
};
