// Séance 14 — Les figures de répétition.
//
// D'après la fiche « Les figures de style » d'Evan : anaphore, assonance,
// allitération, paronomase — et le chiasme, rangé ailleurs sur sa fiche mais
// travaillé ici, parce que c'est avec l'anaphore qu'on le confond. Sur sa
// feuille d'exercices, une suite de [t] a reçu « assonance » (c'est une
// allitération : une consonne), et une paronomase n'a pas été reconnue.
//
// Trois classiques libres de droits (Racine ×2, Verlaine) et des proverbes ;
// le reste est écrit pour l'appli.

export default {
  numero: 14,
  bloc: 3,
  titre: 'Les figures de répétition',
  sousTitre: 'Anaphore, chiasme, paronomase, assonance, allitération',
  objectif: 'Savoir ce qui revient — un mot en tête, des mots croisés, deux mots presque pareils, un son — et nommer la figure.',

  rappels: [
    {
      id: 'r1',
      titre: 'Répéter des mots : anaphore, chiasme, paronomase',
      texte:
        'L\'**anaphore** répète un **mot** ou un groupe **en début** de phrases, de propositions ou de vers : elle insiste et donne du **rythme**.\n\n' +
        'Le **chiasme** reprend les mêmes termes **dans l\'ordre inverse** : A B / B A.\n\n' +
        'La **paronomase** rapproche **deux mots aux sons presque pareils**, mais au sens différent.',
      exemples: [
        { phrase: '**Toujours** chercher, **toujours** douter, **toujours** avancer.', note: 'Le même mot en tête : anaphore.' },
        { phrase: 'Il **dort** pour **rêver**, il ne **rêve** pas pour **dormir**.', note: 'dort (A) / rêver (B) — rêve (B) / dormir (A) : chiasme.' },
        { phrase: 'Qui **terre** a, **guerre** a.', note: 'terre / guerre : deux mots presque pareils à l\'oreille — paronomase.' },
      ],
    },
    {
      id: 'r2',
      titre: 'Répéter un son : assonance et allitération',
      texte:
        'Toutes deux répètent **un son**, pour créer une musique.\n\n' +
        'L\'**assonance** répète un son **voyelle** (*a, i, ou, on, an…*).\n\n' +
        'L\'**allitération** répète un son **consonne** (*t, s, r, l…*). Pour retenir : alli**T**ération, comme **T**.',
      exemples: [
        { phrase: 'Un **ou**rs **ou**bliait sa r**ou**te.', note: 'Le son [ou], une voyelle : assonance.' },
        { phrase: 'Le **r**at **r**ongeait **r**ageusement.', note: 'Le son [r], une consonne : allitération.' },
      ],
    },
  ],

  exercices: [
    // ── Rappel 1 : répéter des mots ──────────────────────────────────────
    {
      id: 's14-e1', rappel: 'r1', type: 'qcm', palier: 1, piege: 'quelle-repetition',
      consigne: 'Quelle est cette figure de style ?',
      phrase: '**Il faut** partir, **il faut** sourire, **il faut** oublier.',
      choix: ['une anaphore', 'une paronomase', 'une allitération'], attendu: 'une anaphore',
    },
    {
      id: 's14-e2', rappel: 'r1', type: 'qcm', palier: 1, piege: 'chiasme-ou-repetition',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Il faut **travailler** pour **vivre**, et non **vivre** pour **travailler**.',
      choix: ['un chiasme', 'une anaphore', 'une antithèse'], attendu: 'un chiasme',
    },
    {
      id: 's14-e3', rappel: 'r1', type: 'qcm', palier: 2, piege: 'quelle-repetition',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Qui vole un **œuf** vole un **bœuf**.',
      choix: ['une anaphore', 'une paronomase', 'une assonance'], attendu: 'une paronomase',
    },
    {
      id: 's14-e4', rappel: 'r1', type: 'qcm', palier: 2, piege: 'chiasme-ou-repetition',
      consigne: 'Quelle est cette figure de style ?',
      phrase: '**Demain** je partirai. **Demain** je verrai la mer. **Demain** tout changera.',
      choix: ['un chiasme', 'une anaphore'], attendu: 'une anaphore',
    },
    {
      id: 's14-e5', rappel: 'r1', type: 'qcm', palier: 3, piege: 'quelle-repetition',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Qui se **ressemble** s\'**assemble**.',
      choix: ['une anaphore', 'une paronomase', 'une allitération'], attendu: 'une paronomase',
    },
    {
      id: 's14-e6', rappel: 'r1', type: 'qcm', palier: 3, piege: 'chiasme-ou-repetition',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Un **mot** pour une **image**, une **image** pour un **mot**.',
      choix: ['un chiasme', 'une anaphore', 'une antithèse'], attendu: 'un chiasme',
    },

    // ── Rappel 2 : répéter un son ────────────────────────────────────────
    {
      id: 's14-e7', rappel: 'r2', type: 'qcm', palier: 1, piege: 'assonance-ou-alliteration',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Pour qui sont ces **s**erpents qui **s**ifflent **s**ur vos têtes ? (Racine)',
      choix: ['une assonance', 'une allitération'], attendu: 'une allitération',
    },
    {
      id: 's14-e8', rappel: 'r2', type: 'qcm', palier: 1, piege: 'assonance-ou-alliteration',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Les sanglots l**on**gs des viol**on**s (Verlaine)',
      choix: ['une assonance', 'une allitération'], attendu: 'une assonance',
    },
    {
      id: 's14-e9', rappel: 'r2', type: 'qcm', palier: 2, piege: 'assonance-ou-alliteration',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Le **t**ambour **t**ape, **t**onne et **t**remble.',
      choix: ['une assonance', 'une allitération'], attendu: 'une allitération',
    },
    {
      id: 's14-e10', rappel: 'r2', type: 'qcm', palier: 2, piege: 'assonance-ou-alliteration',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Tout m\'afflige et me n**ui**t, et consp**i**re à me n**ui**re. (Racine)',
      choix: ['une assonance', 'une allitération'], attendu: 'une assonance',
    },
    {
      id: 's14-e11', rappel: 'r2', type: 'qcm', palier: 3, piege: 'assonance-ou-alliteration',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Le **s**oleil **s**e **s**auve **s**ans **s**on **s**ourire.',
      choix: ['une allitération', 'une assonance', 'une anaphore', 'une paronomase'], attendu: 'une allitération',
    },

    // Réserve.
    {
      id: 's14-r1', rappel: 'r2', type: 'qcm', palier: 2, piege: 'assonance-ou-alliteration', reserve: true,
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Le **v**ent **v**iolent **v**ient **v**ers la **v**allée.',
      choix: ['une assonance', 'une allitération'], attendu: 'une allitération',
    },
    {
      id: 's14-r2', rappel: 'r2', type: 'qcm', palier: 2, piege: 'assonance-ou-alliteration', reserve: true,
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'La plu**i**e, **i**c**i**, ne f**i**n**i**t jamais.',
      choix: ['une assonance', 'une allitération'], attendu: 'une assonance',
    },
    {
      id: 's14-r3', rappel: 'r2', type: 'qcm', palier: 3, piege: 'assonance-ou-alliteration', reserve: true,
      consigne: 'Quelle est cette figure de style ?',
      phrase: '**P**ierre **p**ose **p**rudemment **p**lusieurs **p**avés.',
      choix: ['une assonance', 'une allitération'], attendu: 'une allitération',
    },
    {
      id: 's14-r4', rappel: 'r1', type: 'qcm', palier: 2, piege: 'quelle-repetition', reserve: true,
      consigne: 'Quelle est cette figure de style ?',
      phrase: '**Chaque** matin il court, **chaque** midi il nage, **chaque** soir il dort.',
      choix: ['une anaphore', 'une paronomase', 'une allitération'], attendu: 'une anaphore',
    },
    {
      id: 's14-r5', rappel: 'r1', type: 'qcm', palier: 2, piege: 'quelle-repetition', reserve: true,
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Il préférait la **plume** à la **brume**.',
      choix: ['une anaphore', 'une paronomase', 'une assonance'], attendu: 'une paronomase',
    },
    {
      id: 's14-r6', rappel: 'r1', type: 'qcm', palier: 3, piege: 'quelle-repetition', reserve: true,
      consigne: 'Quelle est cette figure de style ?',
      phrase: '**Je** me souviens du jardin, **je** me souviens de la maison, **je** me souviens de toi.',
      choix: ['une anaphore', 'une paronomase', 'une allitération'], attendu: 'une anaphore',
    },
    {
      id: 's14-r7', rappel: 'r1', type: 'qcm', palier: 2, piege: 'chiasme-ou-repetition', reserve: true,
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Elle **lit** pour **écrire**, il **écrit** pour **lire**.',
      choix: ['un chiasme', 'une anaphore'], attendu: 'un chiasme',
    },
    {
      id: 's14-r8', rappel: 'r1', type: 'qcm', palier: 2, piege: 'chiasme-ou-repetition', reserve: true,
      consigne: 'Quelle est cette figure de style ?',
      phrase: '**Ici** on rit, **ici** on chante, **ici** on danse.',
      choix: ['un chiasme', 'une anaphore'], attendu: 'une anaphore',
    },
    {
      id: 's14-r9', rappel: 'r1', type: 'qcm', palier: 3, piege: 'chiasme-ou-repetition', reserve: true,
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Elle **chante** pour **oublier**, et **oublie** de **chanter**.',
      choix: ['un chiasme', 'une anaphore', 'une antithèse'], attendu: 'un chiasme',
    },
  ],
};
