// Séance 24 — Attribut ou pas ?
//
// Bloc 5, en 5e : ce que les exercices corrigés d'Antonin montrent du
// chapitre 9. Une épithète prise pour un attribut (« la montagne imposante
// semble infranchissable » : il a entouré « imposante »). Et le verbe être
// pris pour un signe d'attribut, alors qu'il dit parfois où l'on est (« ils
// sont dans leur chambre ») ; paraître pris au sens de sembler, alors qu'il
// veut parfois dire « être publié » (« paraît le mardi ») ; à l'inverse, des
// attributs oubliés après des verbes inattendus (« rentré déçu », « passe
// pour… »).
//
// Les phrases sont écrites pour l'appli, pas reprises du cahier.

export default {
  numero: 24,
  bloc: 5,
  titre: 'Attribut ou pas ?',
  sousTitre: 'Épithète, attribut, et les verbes qui trompent',
  objectif: 'Distinguer l\'épithète de l\'attribut, et reconnaître un attribut sans se fier au seul verbe.',

  rappels: [
    {
      id: 'r1',
      titre: 'Épithète ou attribut ?',
      texte:
        'L\'**épithète** est **dans le groupe nominal**, collée au nom, sans verbe entre eux.\n\n' +
        'L\'**attribut** est **séparé du nom par un verbe attributif** (être, sembler, devenir…).',
      exemples: [
        { phrase: 'La **petite** maison est au bout du chemin.', note: 'Collé au nom « maison » : épithète.' },
        { phrase: 'Cette maison semble **petite**.', note: 'Le verbe « semble » les sépare : attribut du sujet.' },
      ],
    },
    {
      id: 'r2',
      titre: 'Le verbe ne suffit pas',
      texte:
        'Après **être**, un groupe peut dire **où** l\'on est : *Les enfants sont **dans le jardin*** — ce n\'est pas un attribut.\n\n' +
        '**Paraître** peut vouloir dire « être publié » : *Ce magazine paraît **le jeudi*** — pas d\'attribut non plus.\n\n' +
        'À l\'inverse, *rentrer, passer pour, avoir l\'air, tomber* peuvent introduire un attribut : *Il est rentré **épuisé***.\n\n' +
        'La question à se poser : le groupe dit-il **comment est** le sujet, ou **ce qu\'il est** ?',
      exemples: [
        { phrase: 'Les enfants sont **fatigués**.', note: 'Comment sont-ils ? Fatigués : attribut.' },
        { phrase: 'Les enfants sont **dans le jardin**.', note: 'Où sont-ils ? Un lieu : pas un attribut.' },
      ],
    },
  ],

  exercices: [
    // ── Rappel 1 : épithète ou attribut ──────────────────────────────────
    {
      id: 's24-e1', rappel: 'r1', type: 'qcm', palier: 1, piege: 'epithete-ou-attribut',
      consigne: 'L\'adjectif en gras est-il épithète ou attribut du sujet ?',
      phrase: 'La **petite** maison est au bout du chemin.',
      choix: ['épithète', 'attribut du sujet'], attendu: 'épithète',
    },
    {
      id: 's24-e2', rappel: 'r1', type: 'qcm', palier: 1, piege: 'epithete-ou-attribut',
      consigne: 'L\'adjectif en gras est-il épithète ou attribut du sujet ?',
      phrase: 'Cette maison semble **petite**.',
      choix: ['épithète', 'attribut du sujet'], attendu: 'attribut du sujet',
    },
    {
      id: 's24-e3', rappel: 'r1', type: 'qcm', palier: 2, piege: 'epithete-ou-attribut',
      consigne: 'L\'adjectif en gras est-il épithète ou attribut du sujet ?',
      phrase: 'Le sommet **enneigé** brille au soleil.',
      choix: ['épithète', 'attribut du sujet'], attendu: 'épithète',
    },
    {
      id: 's24-e4', rappel: 'r1', type: 'qcm', palier: 2, piege: 'epithete-ou-attribut',
      consigne: 'L\'adjectif en gras est-il épithète ou attribut du sujet ?',
      phrase: 'Après l\'orage, le chemin devient **glissant**.',
      choix: ['épithète', 'attribut du sujet'], attendu: 'attribut du sujet',
    },
    {
      id: 's24-e5', rappel: 'r1', type: 'qcm', palier: 3, piege: 'epithete-ou-attribut',
      consigne: 'L\'adjectif en gras est-il épithète ou attribut du sujet ?',
      phrase: 'Une **énorme** vague emporte le château de sable.',
      choix: ['épithète', 'attribut du sujet'], attendu: 'épithète',
    },
    {
      id: 's24-e6', rappel: 'r1', type: 'qcm', palier: 3, piege: 'epithete-ou-attribut',
      consigne: 'L\'adjectif en gras est-il épithète ou attribut du sujet ?',
      phrase: 'Les élèves restent **silencieux** pendant la dictée.',
      choix: ['épithète', 'attribut du sujet'], attendu: 'attribut du sujet',
    },

    {
      id: 's24-e14', rappel: 'r1', type: 'qcm', palier: 3, piege: 'epithete-ou-attribut',
      consigne: 'L\'adjectif en gras est-il épithète ou attribut du sujet ?',
      phrase: 'Le vent emporte les feuilles **mortes**.',
      choix: ['épithète', 'attribut du sujet'], attendu: 'épithète',
    },

    // ── Rappel 2 : attribut ou pas ───────────────────────────────────────
    {
      id: 's24-e7', rappel: 'r2', type: 'qcm', palier: 1, piege: 'attribut-ou-pas',
      consigne: 'Le groupe en gras est-il attribut du sujet ?',
      phrase: 'Les enfants sont **dans le jardin**.',
      choix: ['oui, attribut du sujet', 'non, pas un attribut'], attendu: 'non, pas un attribut',
    },
    {
      id: 's24-e8', rappel: 'r2', type: 'qcm', palier: 1, piege: 'attribut-ou-pas',
      consigne: 'Le groupe en gras est-il attribut du sujet ?',
      phrase: 'Les enfants sont **fatigués**.',
      choix: ['oui, attribut du sujet', 'non, pas un attribut'], attendu: 'oui, attribut du sujet',
    },
    {
      id: 's24-e9', rappel: 'r2', type: 'qcm', palier: 2, piege: 'attribut-ou-pas',
      consigne: 'Le groupe en gras est-il attribut du sujet ?',
      phrase: 'Ce magazine paraît **le jeudi**.',
      choix: ['oui, attribut du sujet', 'non, pas un attribut'], attendu: 'non, pas un attribut',
    },
    {
      id: 's24-e10', rappel: 'r2', type: 'qcm', palier: 2, piege: 'attribut-ou-pas',
      consigne: 'Le groupe en gras est-il attribut du sujet ?',
      phrase: 'Ce magazine paraît **intéressant**.',
      choix: ['oui, attribut du sujet', 'non, pas un attribut'], attendu: 'oui, attribut du sujet',
    },
    {
      id: 's24-e11', rappel: 'r2', type: 'qcm', palier: 3, piege: 'attribut-ou-pas',
      consigne: 'Le groupe en gras est-il attribut du sujet ?',
      phrase: 'Mon frère est rentré **épuisé** de l\'entraînement.',
      choix: ['oui, attribut du sujet', 'non, pas un attribut'], attendu: 'oui, attribut du sujet',
    },
    {
      id: 's24-e12', rappel: 'r2', type: 'qcm', palier: 3, piege: 'attribut-ou-pas',
      consigne: 'Le groupe en gras est-il attribut du sujet ?',
      phrase: 'Ce chanteur passe pour **un génie**.',
      choix: ['oui, attribut du sujet', 'non, pas un attribut'], attendu: 'oui, attribut du sujet',
    },
    {
      id: 's24-e13', rappel: 'r2', type: 'qcm', palier: 3, piege: 'attribut-ou-pas',
      consigne: 'Le groupe en gras est-il attribut du sujet ?',
      phrase: 'Hier, le facteur est passé **à midi**.',
      choix: ['oui, attribut du sujet', 'non, pas un attribut'], attendu: 'non, pas un attribut',
    },

    // Réserve.
    {
      id: 's24-r1', rappel: 'r1', type: 'qcm', palier: 2, piege: 'epithete-ou-attribut', reserve: true,
      consigne: 'L\'adjectif en gras est-il épithète ou attribut du sujet ?',
      phrase: 'Un vent **glacial** souffle sur la plaine.',
      choix: ['épithète', 'attribut du sujet'], attendu: 'épithète',
    },
    {
      id: 's24-r2', rappel: 'r1', type: 'qcm', palier: 2, piege: 'epithete-ou-attribut', reserve: true,
      consigne: 'L\'adjectif en gras est-il épithète ou attribut du sujet ?',
      phrase: 'Ce problème paraît **simple**.',
      choix: ['épithète', 'attribut du sujet'], attendu: 'attribut du sujet',
    },
    {
      id: 's24-r3', rappel: 'r1', type: 'qcm', palier: 3, piege: 'epithete-ou-attribut', reserve: true,
      consigne: 'L\'adjectif en gras est-il épithète ou attribut du sujet ?',
      phrase: 'Mon chat paraît **malade**.',
      choix: ['épithète', 'attribut du sujet'], attendu: 'attribut du sujet',
    },
    {
      id: 's24-r7', rappel: 'r1', type: 'qcm', palier: 3, piege: 'epithete-ou-attribut', reserve: true,
      consigne: 'L\'adjectif en gras est-il épithète ou attribut du sujet ?',
      phrase: 'Pour l\'hiver, j\'ai acheté une veste **chaude**.',
      choix: ['épithète', 'attribut du sujet'], attendu: 'épithète',
    },
    {
      id: 's24-r4', rappel: 'r2', type: 'qcm', palier: 2, piege: 'attribut-ou-pas', reserve: true,
      consigne: 'Le groupe en gras est-il attribut du sujet ?',
      phrase: 'Grand-mère est **au marché**.',
      choix: ['oui, attribut du sujet', 'non, pas un attribut'], attendu: 'non, pas un attribut',
    },
    {
      id: 's24-r5', rappel: 'r2', type: 'qcm', palier: 3, piege: 'attribut-ou-pas', reserve: true,
      consigne: 'Le groupe en gras est-il attribut du sujet ?',
      phrase: 'Mon oncle est tombé **malade** cet hiver.',
      choix: ['oui, attribut du sujet', 'non, pas un attribut'], attendu: 'oui, attribut du sujet',
    },
    {
      id: 's24-r6', rappel: 'r2', type: 'qcm', palier: 3, piege: 'attribut-ou-pas', reserve: true,
      consigne: 'Le groupe en gras est-il attribut du sujet ?',
      phrase: 'Le journal paraît **chaque matin**.',
      choix: ['oui, attribut du sujet', 'non, pas un attribut'], attendu: 'non, pas un attribut',
    },
  ],
};
