// Séance 9 — Les valeurs des temps.
//
// Les cartes « Les valeurs du présent de l'indicatif », « L'imparfait peut
// exprimer… » et « Le passé simple peut exprimer… ».
//
// L'erreur visée : donner une valeur d'après le verbe seul, sans regarder ce
// qui l'entoure. Le même « arrive » est un passé proche avec « à l'instant »,
// un futur proche avec « dans cinq minutes » ; une durée longue n'impose pas
// l'imparfait (« la guerre dura cent ans »).
//
// Les phrases au présent de narration évitent les verbes en -ir du 2e groupe :
// « il surgit » est aussi un passé simple, et la question deviendrait
// indécidable.

export default {
  numero: 9,
  bloc: 2,
  titre: 'Les valeurs des temps',
  sousTitre: 'Le présent, l\'imparfait, le passé simple',
  objectif: 'Donner la valeur d\'un présent d\'après son contexte, et choisir entre imparfait et passé simple dans un récit.',

  rappels: [
    {
      id: 'r1',
      titre: 'Les valeurs du présent',
      texte:
        'Le présent ne dit pas toujours « maintenant ». Selon le contexte, il exprime :\n' +
        '- ce qui se passe **au moment où l\'on parle** (présent d\'énonciation), une **habitude**, une action qui **dure** (*depuis*), un **ordre** ;\n' +
        '- une **vérité générale** : ce qui est vrai pour tous et toujours (lois de la nature, proverbes) ;\n' +
        '- un **passé proche** (*à l\'instant*) ou un **futur proche** (*demain*), une **hypothèse** après *si* ;\n' +
        '- le **présent de narration**, au milieu d\'un récit au passé, pour rendre la scène plus vivante.',
      exemples: [
        {
          phrase: 'La nuit tombait sur la forêt. Soudain, un loup **sort** des fourrés.',
          note: 'Un récit à l\'imparfait, puis un présent : il rend l\'événement plus vivant — présent de narration.',
        },
      ],
    },
    {
      id: 'r2',
      titre: 'Imparfait ou passé simple ?',
      texte:
        'Dans un récit au passé, les deux temps se partagent le travail.\n\n' +
        'L\'**imparfait** peint l\'**arrière-plan** : la **description**, l\'**habitude**, l\'action **en cours**, qui dure sans limite précise.\n\n' +
        'Le **passé simple** raconte le **premier plan** : une action **ponctuelle**, **achevée**, et la **succession** des actions.',
      exemples: [
        {
          phrase: 'Le village **dormait**. Un cavalier **frappa** à la porte, **entra** et **réveilla** l\'aubergiste.',
          note: '*dormait* : le décor, à l\'imparfait. *frappa, entra, réveilla* : des actions qui se suivent, au passé simple.',
        },
      ],
    },
  ],

  exercices: [
    // ── Rappel 1 : les valeurs du présent ────────────────────────────────
    {
      id: 's09-e1', rappel: 'r1', type: 'qcm', palier: 1, piege: 'valeur-du-present',
      consigne: 'Quelle est la valeur du présent en gras ?',
      phrase: 'Chut ! Le bébé **dort** en ce moment.',
      choix: ['présent d\'énonciation', 'présent d\'habitude', 'présent de vérité générale'], attendu: 'présent d\'énonciation',
    },
    {
      id: 's09-e2', rappel: 'r1', type: 'qcm', palier: 1, piege: 'valeur-du-present',
      consigne: 'Quelle est la valeur du présent en gras ?',
      phrase: 'Chaque samedi, je **joue** au football.',
      choix: ['présent d\'énonciation', 'présent d\'habitude', 'présent de vérité générale'], attendu: 'présent d\'habitude',
    },
    {
      id: 's09-e3', rappel: 'r1', type: 'qcm', palier: 1, piege: 'valeur-du-present',
      consigne: 'Quelle est la valeur du présent en gras ?',
      phrase: 'La Lune **tourne** autour de la Terre.',
      choix: ['présent d\'énonciation', 'présent d\'habitude', 'présent de vérité générale'], attendu: 'présent de vérité générale',
    },
    {
      id: 's09-e4', rappel: 'r1', type: 'qcm', palier: 2, piege: 'valeur-du-present',
      consigne: 'Quelle est la valeur du présent en gras ?',
      phrase: 'Ne t\'inquiète pas, j\'**arrive** dans cinq minutes.',
      choix: ['passé proche', 'futur proche', 'présent d\'habitude'], attendu: 'futur proche',
    },
    {
      id: 's09-e5', rappel: 'r1', type: 'qcm', palier: 2, piege: 'valeur-du-present',
      consigne: 'Quelle est la valeur du présent en gras ?',
      phrase: 'Je **rentre** à l\'instant de l\'école.',
      choix: ['passé proche', 'futur proche', 'présent d\'habitude'], attendu: 'passé proche',
    },
    {
      id: 's09-e6', rappel: 'r1', type: 'qcm', palier: 2, piege: 'valeur-du-present',
      consigne: 'Quelle est la valeur du présent en gras ?',
      phrase: 'Il **pleut** depuis trois jours.',
      choix: ['présent duratif', 'présent d\'habitude', 'passé proche'], attendu: 'présent duratif',
    },
    {
      id: 's09-e7', rappel: 'r1', type: 'qcm', palier: 3, piege: 'valeur-du-present',
      consigne: 'Quelle est la valeur du présent en gras ?',
      phrase: 'Nous marchions depuis une heure. Tout à coup, Léo **s\'arrête** net.',
      choix: ['présent de narration', 'présent d\'énonciation', 'futur proche'], attendu: 'présent de narration',
    },
    {
      id: 's09-e8', rappel: 'r1', type: 'qcm', palier: 3, piege: 'valeur-du-present',
      consigne: 'Quelle est la valeur du présent en gras ?',
      phrase: 'Si tu **travailles**, tu progresseras.',
      choix: ['expression de l\'hypothèse', 'présent d\'habitude', 'expression de l\'ordre'], attendu: 'expression de l\'hypothèse',
    },
    {
      id: 's09-e9', rappel: 'r1', type: 'qcm', palier: 3, piege: 'valeur-du-present',
      consigne: 'Quelle est la valeur du présent en gras ?',
      phrase: '« Vous **rangez** vos affaires et vous sortez », ordonne le professeur.',
      choix: ['expression de l\'ordre', 'présent d\'énonciation', 'présent d\'habitude'], attendu: 'expression de l\'ordre',
    },

    // Réserve du rappel 1.
    {
      id: 's09-r1', rappel: 'r1', type: 'qcm', palier: 2, piege: 'valeur-du-present', reserve: true,
      consigne: 'Quelle est la valeur du présent en gras ?',
      phrase: 'Qui **se ressemble** s\'assemble.',
      choix: ['présent de vérité générale', 'présent d\'habitude', 'présent d\'énonciation'], attendu: 'présent de vérité générale',
    },
    {
      id: 's09-r2', rappel: 'r1', type: 'qcm', palier: 3, piege: 'valeur-du-present', reserve: true,
      consigne: 'Quelle est la valeur du présent en gras ?',
      phrase: 'Le soleil se couchait. Soudain, une voix **appelle** au loin.',
      choix: ['présent de narration', 'présent d\'énonciation', 'présent d\'habitude'], attendu: 'présent de narration',
    },
    {
      id: 's09-r3', rappel: 'r1', type: 'qcm', palier: 2, piege: 'valeur-du-present', reserve: true,
      consigne: 'Quelle est la valeur du présent en gras ?',
      phrase: 'Mon train **part** dans une heure.',
      choix: ['passé proche', 'futur proche', 'présent de vérité générale'], attendu: 'futur proche',
    },

    // ── Rappel 2 : imparfait ou passé simple ─────────────────────────────
    {
      id: 's09-e10', rappel: 'r2', type: 'qcm', palier: 1, piege: 'imparfait-ou-passe-simple',
      consigne: 'Quelle est la valeur de l\'imparfait en gras ?',
      phrase: 'La maison **était** grande et **paraissait** abandonnée.',
      choix: ['description', 'action ponctuelle', 'succession d\'actions'], attendu: 'description',
    },
    {
      id: 's09-e11', rappel: 'r2', type: 'qcm', palier: 1, piege: 'imparfait-ou-passe-simple',
      consigne: 'Quelle est la valeur de l\'imparfait en gras ?',
      phrase: 'Tous les dimanches, nous **déjeunions** chez ma grand-mère.',
      choix: ['habitude', 'action ponctuelle', 'description'], attendu: 'habitude',
    },
    {
      id: 's09-e12', rappel: 'r2', type: 'qcm', palier: 1, piege: 'imparfait-ou-passe-simple',
      consigne: 'Quelle est la valeur du passé simple en gras ?',
      phrase: 'Il **ouvrit** la fenêtre, **regarda** dehors et **soupira**.',
      choix: ['succession d\'actions', 'habitude', 'description'], attendu: 'succession d\'actions',
    },
    {
      id: 's09-e13', rappel: 'r2', type: 'completer', palier: 2, piege: 'imparfait-ou-passe-simple',
      consigne: 'Conjugue le verbe à l\'imparfait ou au passé simple, selon le sens.',
      avant: 'Nous ', verbe: 'dîner', apres: ' tranquillement quand l\'orage éclata.', attendu: 'dînions', variantes: ['dinions'],
    },
    {
      id: 's09-e14', rappel: 'r2', type: 'completer', palier: 2, piege: 'imparfait-ou-passe-simple',
      consigne: 'Conjugue le verbe à l\'imparfait ou au passé simple, selon le sens.',
      avant: 'Soudain, le téléphone ', verbe: 'sonner', apres: ' au moment où je sortais.', attendu: 'sonna',
    },
    {
      id: 's09-e15', rappel: 'r2', type: 'completer', palier: 3, piege: 'imparfait-ou-passe-simple',
      consigne: 'Conjugue le verbe à l\'imparfait ou au passé simple, selon le sens.',
      avant: 'Autrefois, mon grand-père ', verbe: 'travailler', apres: ' dans une usine.', attendu: 'travaillait',
    },
    {
      id: 's09-e16', rappel: 'r2', type: 'completer', palier: 3, piege: 'imparfait-ou-passe-simple',
      consigne: 'Conjugue le verbe à l\'imparfait ou au passé simple, selon le sens.',
      avant: 'La guerre ', verbe: 'durer', apres: ' cent ans, puis la paix revint.', attendu: 'dura',
    },

    // Réserve du rappel 2.
    {
      id: 's09-r4', rappel: 'r2', type: 'completer', palier: 2, piege: 'imparfait-ou-passe-simple', reserve: true,
      consigne: 'Conjugue le verbe à l\'imparfait ou au passé simple, selon le sens.',
      avant: 'Je ', verbe: 'dormir', apres: ' profondément quand le réveil sonna.', attendu: 'dormais',
    },
    {
      id: 's09-r5', rappel: 'r2', type: 'completer', palier: 2, piege: 'imparfait-ou-passe-simple', reserve: true,
      consigne: 'Conjugue le verbe à l\'imparfait ou au passé simple, selon le sens.',
      avant: 'Ce matin-là, elle ', verbe: 'prendre', apres: ' le premier train et arriva à Paris avant midi.', attendu: 'prit',
    },
    {
      id: 's09-r6', rappel: 'r2', type: 'qcm', palier: 2, piege: 'imparfait-ou-passe-simple', reserve: true,
      consigne: 'Quelle est la valeur de l\'imparfait en gras ?',
      phrase: 'Chaque soir, le gardien **fermait** les grilles du parc.',
      choix: ['habitude', 'action ponctuelle', 'succession d\'actions'], attendu: 'habitude',
    },
  ],
};
