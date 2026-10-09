// Séance 7 — Les expansions du nom et les compléments circonstanciels.
//
// La carte « Les expansions du nom » et la seconde moitié des fonctions :
// ce qui tourne autour du nom (épithète, complément du nom, complément de
// l'antécédent, apposition) et autour de la phrase (les compléments
// circonstanciels et leurs onze sens).
//
// L'erreur visée : se fier aux virgules ou à la préposition au lieu de la
// CLASSE du groupe. Une virgule ne fait ni un attribut ni une apposition ;
// « avec » n'introduit pas toujours un moyen.

export default {
  numero: 7,
  bloc: 2,
  titre: 'Les expansions du nom et les compléments circonstanciels',
  sousTitre: 'Épithète, apposition, complément du nom ; moyen, cause, but…',
  objectif: 'Reconnaître une expansion du nom par sa classe, et le sens d\'un complément circonstanciel par la question qu\'il pose.',

  rappels: [
    {
      id: 'r1',
      titre: 'Les expansions du nom',
      texte:
        'Un nom peut être **complété** — on dit **expansé** — par des éléments qu\'on peut le plus souvent supprimer :\n' +
        '- l\'**épithète** : un adjectif ou un participe, collé au nom (**liée** : *une rue **calme***) ou séparé par une virgule (**détachée** : ***Calme**, la rue s\'endormait*) ;\n' +
        '- le **complément du nom** : un groupe introduit par une préposition (*un sac **en cuir***) ;\n' +
        '- le **complément de l\'antécédent** : une proposition subordonnée relative (*le livre **que je lis***) ;\n' +
        '- l\'**apposition** : un nom, un groupe nominal ou un infinitif détaché, qui désigne la même réalité (*Paul, **mon voisin**, arrive*).',
      exemples: [
        {
          phrase: 'Le **vieux** pêcheur **du village**, **que tout le monde connaît**, répare son filet.',
          note: '*vieux* : épithète liée. *du village* : complément du nom. *que tout le monde connaît* : complément de l\'antécédent *pêcheur*.',
        },
      ],
    },
    {
      id: 'r2',
      titre: 'Les compléments circonstanciels',
      texte:
        'Le **complément circonstanciel** (CC) précise les circonstances de l\'action. Il se **supprime** et se **déplace**.\n\n' +
        'Il exprime le **temps** (quand ?), le **lieu** (où ?), le **moyen** (avec quoi ?), la **manière** (comment ?), l\'**accompagnement** (avec qui ?), la **cause** (pourquoi ?), le **but** (pour quoi faire ?), la **conséquence**, la **comparaison**, l\'**opposition** ou la **condition**.',
      exemples: [
        {
          phrase: 'Il ouvre la boîte **avec un couteau**. / Il ouvre la boîte **avec précaution**.',
          note: 'Avec quoi ? un outil : CC de moyen. Comment ? avec précaution : CC de manière.',
        },
      ],
    },
  ],

  exercices: [
    // ── Rappel 1 : les expansions du nom ─────────────────────────────────
    {
      id: 's07-e1', rappel: 'r1', type: 'qcm', palier: 1, piege: 'epithete-ou-attribut',
      consigne: 'Quelle est la fonction de l\'adjectif en gras ?',
      phrase: 'J\'ai acheté une veste **chaude**.',
      choix: ['épithète liée', 'épithète détachée', 'attribut du sujet'], attendu: 'épithète liée',
    },
    {
      id: 's07-e2', rappel: 'r1', type: 'qcm', palier: 1, piege: 'epithete-ou-attribut',
      consigne: 'Quelle est la fonction de l\'adjectif en gras ?',
      phrase: 'Cette veste est **chaude**.',
      choix: ['épithète liée', 'épithète détachée', 'attribut du sujet'], attendu: 'attribut du sujet',
    },
    {
      id: 's07-e3', rappel: 'r1', type: 'qcm', palier: 2, piege: 'epithete-ou-attribut',
      consigne: 'Quelle est la fonction de l\'adjectif en gras ?',
      phrase: '**Inquiet**, le berger compta ses moutons.',
      choix: ['épithète liée', 'épithète détachée', 'attribut du sujet'], attendu: 'épithète détachée',
    },
    {
      id: 's07-e4', rappel: 'r1', type: 'qcm', palier: 2, piege: 'epithete-ou-attribut',
      consigne: 'Quelle est la fonction de l\'adjectif en gras ?',
      phrase: 'Le berger paraissait **inquiet**.',
      choix: ['épithète liée', 'épithète détachée', 'attribut du sujet'], attendu: 'attribut du sujet',
    },
    {
      id: 's07-e5', rappel: 'r1', type: 'qcm', palier: 2, piege: 'expansion-du-nom',
      consigne: 'Quelle est la fonction du groupe en gras ?',
      phrase: 'Marie, **ma meilleure amie**, part en Italie.',
      choix: ['apposition', 'épithète détachée', 'complément du nom'], attendu: 'apposition',
    },
    {
      id: 's07-e6', rappel: 'r1', type: 'qcm', palier: 2, piege: 'expansion-du-nom',
      consigne: 'Quelle est la fonction du groupe en gras ?',
      phrase: 'Marie, **ravie de son voyage**, nous a écrit.',
      choix: ['apposition', 'épithète détachée', 'complément du nom'], attendu: 'épithète détachée',
    },
    {
      id: 's07-e7', rappel: 'r1', type: 'qcm', palier: 3, piege: 'expansion-du-nom',
      consigne: 'Quelle est la fonction du mot en gras ?',
      phrase: 'Son plus grand rêve, **voler**, ne le quitte pas.',
      choix: ['apposition', 'épithète détachée', 'COD'], attendu: 'apposition',
    },
    {
      id: 's07-e8', rappel: 'r1', type: 'qcm', palier: 3, piege: 'expansion-du-nom',
      consigne: 'Quelle est la fonction du groupe en gras ?',
      phrase: '**Blessé à la jambe**, le joueur quitta le terrain.',
      choix: ['apposition', 'épithète détachée', 'complément circonstanciel de cause'], attendu: 'épithète détachée',
    },
    {
      id: 's07-e9', rappel: 'r1', type: 'qcm', palier: 1, piege: 'expansion-du-nom',
      consigne: 'Quelle est la fonction du groupe en gras ?',
      phrase: 'Je cherche une boîte **à chaussures**.',
      choix: ['complément du nom', 'COI', 'épithète liée'], attendu: 'complément du nom',
    },
    {
      id: 's07-e10', rappel: 'r1', type: 'qcm', palier: 2, piege: 'expansion-du-nom',
      consigne: 'Quelle est la fonction de la proposition en gras ?',
      phrase: 'Le roman **que tu m\'as prêté** est passionnant.',
      choix: ['complément de l\'antécédent', 'COD', 'apposition'], attendu: 'complément de l\'antécédent',
    },
    {
      id: 's07-e11', rappel: 'r1', type: 'toucher', palier: 2, piege: 'expansion-du-nom',
      consigne: 'Touche le nom qui complète le nom « maison ».',
      mots: ['La', 'maison', 'de', 'mes', 'grands-parents', 'est', 'ancienne.'], attendus: [4],
    },

    // Réserve du rappel 1.
    {
      id: 's07-r1', rappel: 'r1', type: 'qcm', palier: 2, piege: 'epithete-ou-attribut', reserve: true,
      consigne: 'Quelle est la fonction de l\'adjectif en gras ?',
      phrase: 'Le lac semblait **immense**.',
      choix: ['épithète liée', 'épithète détachée', 'attribut du sujet'], attendu: 'attribut du sujet',
    },
    {
      id: 's07-r2', rappel: 'r1', type: 'qcm', palier: 2, piege: 'epithete-ou-attribut', reserve: true,
      consigne: 'Quelle est la fonction de l\'adjectif en gras ?',
      phrase: '**Furieux**, le capitaine quitta le pont.',
      choix: ['épithète liée', 'épithète détachée', 'attribut du sujet'], attendu: 'épithète détachée',
    },
    {
      id: 's07-r3', rappel: 'r1', type: 'qcm', palier: 2, piege: 'epithete-ou-attribut', reserve: true,
      consigne: 'Quelle est la fonction de l\'adjectif en gras ?',
      phrase: 'Nous avons vu un film **effrayant**.',
      choix: ['épithète liée', 'épithète détachée', 'attribut du sujet'], attendu: 'épithète liée',
    },
    {
      id: 's07-r4', rappel: 'r1', type: 'qcm', palier: 2, piege: 'expansion-du-nom', reserve: true,
      consigne: 'Quelle est la fonction du groupe en gras ?',
      phrase: 'Victor Hugo, **l\'auteur des Misérables**, est né à Besançon.',
      choix: ['apposition', 'épithète détachée', 'complément du nom'], attendu: 'apposition',
    },
    {
      id: 's07-r5', rappel: 'r1', type: 'qcm', palier: 2, piege: 'expansion-du-nom', reserve: true,
      consigne: 'Quelle est la fonction de la proposition en gras ?',
      phrase: 'La ville **où j\'habite** est petite.',
      choix: ['complément de l\'antécédent', 'complément circonstanciel de lieu', 'apposition'], attendu: 'complément de l\'antécédent',
    },
    {
      id: 's07-r6', rappel: 'r1', type: 'qcm', palier: 2, piege: 'expansion-du-nom', reserve: true,
      consigne: 'Quelle est la fonction du groupe en gras ?',
      phrase: 'J\'ai perdu mes gants **de laine**.',
      choix: ['complément du nom', 'COI', 'épithète liée'], attendu: 'complément du nom',
    },

    // ── Rappel 2 : les compléments circonstanciels ───────────────────────
    {
      id: 's07-e12', rappel: 'r2', type: 'qcm', palier: 1, piege: 'sens-du-cc',
      consigne: 'Quelle circonstance exprime le complément en gras ?',
      phrase: 'Il découpe le carton **avec des ciseaux**.',
      choix: ['moyen', 'manière', 'accompagnement'], attendu: 'moyen',
    },
    {
      id: 's07-e13', rappel: 'r2', type: 'qcm', palier: 1, piege: 'sens-du-cc',
      consigne: 'Quelle circonstance exprime le complément en gras ?',
      phrase: 'Il découpe le carton **avec soin**.',
      choix: ['moyen', 'manière', 'accompagnement'], attendu: 'manière',
    },
    {
      id: 's07-e14', rappel: 'r2', type: 'qcm', palier: 1, piege: 'sens-du-cc',
      consigne: 'Quelle circonstance exprime le complément en gras ?',
      phrase: 'Il part en randonnée **avec son oncle**.',
      choix: ['moyen', 'manière', 'accompagnement'], attendu: 'accompagnement',
    },
    {
      id: 's07-e15', rappel: 'r2', type: 'qcm', palier: 2, piege: 'sens-du-cc',
      consigne: 'Quelle circonstance exprime le complément en gras ?',
      phrase: 'Le match est reporté **à cause de l\'orage**.',
      choix: ['cause', 'but', 'conséquence'], attendu: 'cause',
    },
    {
      id: 's07-e16', rappel: 'r2', type: 'qcm', palier: 2, piege: 'sens-du-cc',
      consigne: 'Quelle circonstance exprime le complément en gras ?',
      phrase: 'Elle économise **pour acheter un vélo**.',
      choix: ['cause', 'but', 'conséquence'], attendu: 'but',
    },
    {
      id: 's07-e17', rappel: 'r2', type: 'qcm', palier: 3, piege: 'sens-du-cc',
      consigne: 'Quelle circonstance exprime le complément en gras ?',
      phrase: '**Malgré la pluie**, nous sommes sortis.',
      choix: ['opposition', 'cause', 'condition'], attendu: 'opposition',
    },
    {
      id: 's07-e18', rappel: 'r2', type: 'qcm', palier: 3, piege: 'sens-du-cc',
      consigne: 'Quelle circonstance exprime le complément en gras ?',
      phrase: '**En cas de pluie**, la fête aura lieu au gymnase.',
      choix: ['condition', 'cause', 'temps'], attendu: 'condition',
    },

    // Réserve du rappel 2.
    {
      id: 's07-r7', rappel: 'r2', type: 'qcm', palier: 2, piege: 'sens-du-cc', reserve: true,
      consigne: 'Quelle circonstance exprime le complément en gras ?',
      phrase: 'Elle dessine **au crayon**.',
      choix: ['moyen', 'manière', 'lieu'], attendu: 'moyen',
    },
    {
      id: 's07-r8', rappel: 'r2', type: 'qcm', palier: 2, piege: 'sens-du-cc', reserve: true,
      consigne: 'Quelle circonstance exprime le complément en gras ?',
      phrase: 'L\'enfant tremble **de peur**.',
      choix: ['cause', 'manière', 'but'], attendu: 'cause',
    },
    {
      id: 's07-r9', rappel: 'r2', type: 'qcm', palier: 3, piege: 'sens-du-cc', reserve: true,
      consigne: 'Quelle circonstance exprime le complément en gras ?',
      phrase: '**Malgré sa blessure**, la gardienne a joué tout le match.',
      choix: ['opposition', 'cause', 'condition'], attendu: 'opposition',
    },
  ],
};
