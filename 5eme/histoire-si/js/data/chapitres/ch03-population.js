// Chapter 3 — « Population growth and its effects ».
//
// D'après le diaporama du cours d'Antonin en section internationale (en
// anglais), transmis par Denis en PDF : une activité sur deux documents (la
// population mondiale de 1950 à 2050, la part des plus de 65 ans en 2021 et
// en 2050), une introduction, « II – Different demographic scenarios »
// (larger working force, different demographic dynamics, ageing population),
// « III – Management of resources » (consumption of the natural resources,
// excessive consumption) et une conclusion. Le diaporama n'a pas de partie I :
// l'activité sur les deux documents en tient lieu, séance 1.
//
// Les questions de l'activité (« What is the phenomenon… ? Why does it
// happen? What consequences may it produce? ») deviennent les deux premiers
// écrits corrigés par Merlin. Le « pourquoi » n'est pas dit en toutes lettres
// dans le cours : on prend ce qu'il dit ailleurs (des pays qui
// s'industrialisent, des taux de mortalité qui baissent).
//
// La fiche résume le cours en notes, en anglais, sans recopier le
// diaporama ; les chiffres sont ceux des documents.
//
// Les identifiants ne se renumérotent jamais : la progression y est rangée.

const BLOC = 'Choisis la bonne réponse :';

export default {
  id: 'ch03',
  numero: 3,
  titre: 'Population growth and its effects',
  detail: 'World population · Demographic scenarios · Management of resources',

  // Ce que Merlin sait du chapitre quand il corrige un écrit.
  profilMerlin: 'Élève de 5e en section internationale : il suit l\'histoire-géographie en anglais. Chapitre en cours : '
    + '« Population growth and its effects ». Documents de l\'activité : la population mondiale, 2,5 milliards (billion) en '
    + '1950, 4,4 en 1980, 6,1 en 2000, 7,8 en 2021, 9,8 en 2050 (projection) ; la part des plus de 65 ans, 9,6 % en 2021 et '
    + '16 % en 2050. Introduction : depuis le XVIIIe siècle, la population mondiale augmente, et la consommation des '
    + 'ressources aussi ; aujourd\'hui l\'humanité consomme bien plus que la planète ne peut produire, ce qui touchera les '
    + 'générations futures. II. Larger working force : une population active (economically active population : la part de la '
    + 'population en âge de travailler et capable de travailler) plus nombreuse est un atout (plus d\'activité économique, plus '
    + 'd\'impôts collectés), mais elle demande plus de ressources (nourriture, eau, énergie) et de services (écoles, hôpitaux). '
    + 'Different dynamics : la croissance démographique est plus forte dans les pays pauvres, où la population active est un '
    + 'moteur du développement ; dans les pays riches, la natalité baisse (coût de la vie, choix personnels : grossesses plus '
    + 'tardives, familles sans enfants, pessimisme sur l\'avenir) ; l\'accroissement naturel est le plus fort en Afrique, '
    + 'négatif en Europe. Ageing population : des taux de mortalité plus bas et des taux de natalité plus bas font vieillir la '
    + 'population (l\'âge moyen augmente) : baisse de l\'activité économique, plus de dépenses de retraites (pensions) et de '
    + 'santé (health care) ; le défi : garder la qualité de vie sans surcharger les jeunes générations. III. Consumption of '
    + 'the natural resources : on admet couramment que la croissance de la population mènera à l\'épuisement des ressources '
    + 'de la planète ; il faudrait alors réduire la croissance démographique pour éviter un effondrement (dessin de Kal, 1994). '
    + 'Excessive consumption : outre les inégalités d\'accès à la richesse, dans les pays riches la consommation dépasse '
    + 'largement les besoins (durée de vie moyenne des appareils : téléphone portable 2 ans, ordinateur 4 ans, réfrigérateur 10 '
    + 'ans) ; ce mode de vie accélère l\'usage des ressources et augmente les déchets. Conclusion : en s\'industrialisant, les '
    + 'pays voient leur population croître (d\'abord l\'Europe et l\'Amérique du Nord, aujourd\'hui les pays en développement) ; '
    + 'cette croissance a entraîné plus de consommation, mais ce n\'est pas inévitable : en consommant de façon plus '
    + 'responsable, on peut garder la croissance démographique sans mettre la planète en danger.',

  seances: [
    { numero: 1, partie: 'Activity and introduction', titre: 'A growing world population' },
    { numero: 2, partie: 'II', titre: 'Different demographic scenarios' },
    { numero: 3, partie: 'III and conclusion', titre: 'Management of resources' },
  ],

  etapes: [
    // ═══ Séance 1 — A growing world population ══════════════════════════════

    {
      id: 'ch03-mots-population',
      seance: 1,
      titre: 'Key words',
      sousTitre: 'Le vocabulaire de la population, en anglais',
      duree: 4,
      fiche: [
        {
          type: 'vocabulaire',
          titre: 'Key words',
          mots: [
            { en: 'population growth', fr: 'la croissance démographique' },
            { en: 'world population', fr: 'la population mondiale' },
            { en: 'a billion', fr: 'un milliard (1 000 millions)' },
            { en: 'birth rate', fr: 'le taux de natalité' },
            { en: 'death rate', fr: 'le taux de mortalité' },
            { en: 'natural increase', fr: 'l\'accroissement naturel (naissances moins décès)' },
            { en: 'ageing', fr: 'le vieillissement' },
            { en: 'resources', fr: 'les ressources' },
            { en: 'consumption', fr: 'la consommation' },
            { en: 'future generations', fr: 'les générations futures' },
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**a billion** = **un milliard**, pas « un billion » : 1 billion = 1 000 millions. 7.8 billion people = 7,8 milliards d\'habitants.',
            '**ageing** s\'écrit aussi **aging** (anglais américain).',
          ],
        },
      ],
      items: [
        {
          id: 'p-t-growth', type: 'terme', fr: 'la croissance démographique', attendu: 'population growth',
          accepte: ['demographic growth', 'population increase', 'growth of the population', 'growth of population'],
        },
        { id: 'p-t-world', type: 'terme', fr: 'la population mondiale', attendu: 'world population', accepte: ['the world population', 'the world\'s population', 'world\'s population', 'global population'] },
        {
          id: 'p-t-billion', type: 'terme', fr: 'un milliard', attendu: 'billion', accepte: ['a billion', 'one billion', '1 billion'],
          pieges: [
            { si: ['milliard', 'a milliard'], message: 'Milliard, c\'est le français. En anglais : a billion.' },
            { si: ['million', 'a million'], message: 'A million, c\'est un million. Un milliard : a billion.' },
          ],
        },
        {
          id: 'p-t-birth', type: 'terme', fr: 'le taux de natalité', attendu: 'birth rate', accepte: ['birth rates', 'the birth rate', 'birthrate', 'birthrates'],
          pieges: [{ si: ['death rate'], message: 'Death rate, c\'est la mortalité. La natalité, ce sont les naissances : birth rate.' }],
        },
        {
          id: 'p-t-death', type: 'terme', fr: 'le taux de mortalité', attendu: 'death rate', accepte: ['death rates', 'the death rate', 'mortality rate', 'mortality rates', 'deathrate'],
          pieges: [{ si: ['birth rate'], message: 'Birth rate, c\'est la natalité. La mortalité : death rate.' }],
        },
        { id: 'p-t-natural', type: 'terme', fr: 'l\'accroissement naturel', attendu: 'natural increase', accepte: ['the natural increase', 'natural growth'] },
        { id: 'p-t-ageing', type: 'terme', fr: 'le vieillissement (de la population)', attendu: 'ageing', accepte: ['aging', 'ageing population', 'aging population', 'population ageing', 'population aging', 'ageing of the population', 'aging of the population'] },
        { id: 'p-t-resources', type: 'terme', fr: 'les ressources', attendu: 'resources', accepte: ['resource', 'natural resources'] },
        { id: 'p-t-consumption', type: 'terme', fr: 'la consommation', attendu: 'consumption' },
        { id: 'p-t-future', type: 'terme', fr: 'les générations futures', attendu: 'future generations', accepte: ['the future generations', 'next generations'] },
      ],
    },

    {
      id: 'ch03-documents',
      seance: 1,
      titre: 'The two documents',
      sousTitre: 'Doc. 1 : la population mondiale · Doc. 2 : les plus de 65 ans',
      duree: 5,
      fiche: [
        {
          type: 'regle',
          titre: 'Doc. 1 — World population (in billions of people)',
          lignes: [
            '**1950**: 2.5 · **1980**: 4.4 · **2000**: 6.1 · **2021**: 7.8 · **2050**: 9.8 (a **projection**).',
            'The phenomenon: **population growth** — the world population almost **quadruples** between 1950 and 2050.',
          ],
        },
        {
          type: 'regle',
          titre: 'Doc. 2 — Percentage of the world population above 65',
          lignes: [
            '**2021**: 9.6% · **2050**: 16%.',
            'The phenomenon: the **ageing** of the population — more and more old people.',
          ],
        },
        {
          type: 'regle',
          titre: 'Introduction',
          lignes: [
            '**Since the 18th century**, the world population has been increasing fast — and so has the **consumption of resources**.',
            'Today, people **consume much more than the planet can produce**: this will affect **future generations**.',
          ],
        },
        {
          type: 'piege',
          lignes: [
            '2050 is a **projection**: a forecast, not a measure. And in English, the decimal point is a **point**: 2.5 billion (2,5 milliards).',
          ],
        },
      ],
      items: [
        {
          id: 'p-1950', type: 'reponse', question: 'Doc. 1: what was the world population in 1950, in billions?',
          attendu: '2.5 billion', accepte: ['2.5', '2.5 billions', '2.5 billion people', 'two and a half billion'],
          explication: '2.5 billion in 1950.',
        },
        {
          id: 'p-2021', type: 'reponse', question: 'Doc. 1: what was the world population in 2021, in billions?',
          attendu: '7.8 billion', accepte: ['7.8', '7.8 billions', '7.8 billion people'],
          explication: '7.8 billion in 2021 — more than three times the 1950 population.',
        },
        {
          id: 'p-2050', type: 'choix', consigne: BLOC, phrase: 'Doc. 1: what population is expected in 2050?',
          options: ['9.8 billion', '7.8 billion', '98 billion'], attendu: '9.8 billion',
          explication: 'About 9.8 billion: a projection.',
        },
        {
          id: 'p-phenomenon1', type: 'choix', consigne: BLOC, phrase: 'Doc. 1: what is the phenomenon presented by the document?',
          options: ['Population growth: the world population keeps increasing', 'The ageing of the population', 'A fall of the world population'],
          attendu: 'Population growth: the world population keeps increasing',
          explication: 'From 2.5 billion in 1950 to 9.8 billion in 2050.',
        },
        {
          id: 'p-65', type: 'reponse', question: 'Doc. 2: what percentage of the world population will be above 65 in 2050?',
          attendu: '16%', accepte: ['16', '16 %', '16 percent', '16 per cent', 'sixteen percent', '16% of the population'],
          explication: '16% in 2050, against 9.6% in 2021.',
        },
        {
          id: 'p-phenomenon2', type: 'choix', consigne: BLOC, phrase: 'Doc. 2: what is the phenomenon presented by the document?',
          options: ['The ageing of the population', 'The growth of the working force', 'A rise in the birth rate'],
          attendu: 'The ageing of the population',
          explication: 'The share of people above 65 grows: from 9.6% to 16%.',
        },
        {
          id: 'p-since', type: 'reponse', question: 'Since which century has the world population been growing fast?',
          attendu: '18th century', accepte: ['the 18th century', '18th', 'since the 18th century', 'eighteenth century', 'the eighteenth century', 'since the eighteenth century', 'eighteenth', 'XVIIIth century'],
          explication: 'Since the 18th century.',
        },
        {
          id: 'p-consumes', type: 'choix', consigne: BLOC, phrase: 'According to the introduction, today the population…',
          options: ['consumes much more than the planet can produce', 'consumes less than the planet can produce', 'consumes exactly what the planet produces'],
          attendu: 'consumes much more than the planet can produce',
          explication: 'And this will affect future generations.',
        },
      ],
    },

    {
      id: 'ch03-ecrire-docs',
      seance: 1,
      titre: 'Write: the world population',
      sousTitre: 'Les questions 1 à 3 de l\'activité',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Answer in three steps',
          lignes: [
            '**The phenomenon**: population growth — 2.5 billion in 1950, 7.8 billion in 2021, 9.8 billion expected in 2050.',
            '**Why**: since the 18th century, as countries get **industrialised**, their population grows; **death rates** fall.',
            '**Consequences**: more people need more **resources** (food, water, energy) and **services** (schools, hospitals); we already consume more than the planet can produce.',
            'Useful words: *first, then, because, so, for example.*',
          ],
        },
      ],
      items: [
        {
          id: 'w-growth', type: 'decrire', sujet: 'Document 1: what is the phenomenon, why does it happen, and what consequences may it produce?', emoji: '🌍',
          indices: ['population growth', '2.5 billion in 1950', '9.8 billion in 2050', 'industrialised', 'death rates', 'resources', 'food, water, energy'],
          consigne: 'En anglais, écris trois ou quatre phrases : le phénomène (avec des chiffres du document), pourquoi il se produit, et ses conséquences.',
          titreModele: 'An example',
          modele: 'Document 1 shows population growth: the world population went from 2.5 billion in 1950 to 7.8 billion in 2021, and it should reach 9.8 billion in 2050. It happens because, as countries get industrialised, death rates fall and the population grows. As a consequence, more people need more resources, like food, water and energy, and more schools and hospitals. Today we already consume more than the planet can produce.',
          criteres: [
            { id: 'phenomene', texte: 'Le phénomène, avec au moins un chiffre du document : la croissance démographique (2,5 milliards en 1950, 7,8 en 2021, 9,8 en 2050)' },
            { id: 'pourquoi', texte: 'Une cause : l\'industrialisation, ou la baisse de la mortalité' },
            { id: 'consequences', texte: 'Une conséquence : plus de besoins en ressources (nourriture, eau, énergie) ou en services, une consommation qui dépasse ce que la planète produit' },
          ],
        },
      ],
    },

    // ═══ Séance 2 — Different demographic scenarios ═════════════════════════

    {
      id: 'ch03-mots-scenarios',
      seance: 2,
      titre: 'Key words',
      sousTitre: 'Le vocabulaire des scénarios démographiques',
      duree: 3,
      fiche: [
        {
          type: 'vocabulaire',
          titre: 'Key words',
          mots: [
            { en: 'economically active population', fr: 'la population active' },
            { en: 'working age', fr: 'l\'âge de travailler' },
            { en: 'an asset', fr: 'un atout' },
            { en: 'tax collection', fr: 'la collecte des impôts' },
            { en: 'poorer / developing countries', fr: 'les pays plus pauvres, en développement' },
            { en: 'wealthier countries', fr: 'les pays plus riches' },
            { en: 'pensions', fr: 'les retraites (les pensions)' },
            { en: 'health care', fr: 'les soins médicaux, la santé' },
            { en: 'population pyramid', fr: 'la pyramide des âges' },
          ],
        },
      ],
      items: [
        {
          id: 'p-t-active', type: 'terme', fr: 'la population active', attendu: 'economically active population',
          accepte: ['active population', 'working population', 'working force', 'workforce', 'work force', 'labour force', 'labor force'],
        },
        { id: 'p-t-working-age', type: 'terme', fr: 'l\'âge de travailler', attendu: 'working age' },
        {
          id: 'p-t-asset', type: 'terme', fr: 'un atout', attendu: 'asset', accepte: ['an asset'],
          pieges: [
            { si: ['atout'], message: 'Atout, c\'est le français. En anglais : an asset.' },
            { si: ['advantage', 'an advantage'], resultat: 'presque', message: 'C\'est le sens, mais le mot du cours est : an asset.' },
          ],
        },
        {
          id: 'p-t-pensions', type: 'terme', fr: 'les retraites (les pensions)', attendu: 'pensions', accepte: ['pension', 'retirement pensions'],
          pieges: [{ si: ['retirement'], resultat: 'presque', message: 'Retirement, c\'est le fait d\'être à la retraite. L\'argent versé : pensions.' }],
        },
        {
          id: 'p-t-health', type: 'terme', fr: 'les soins médicaux, la santé', attendu: 'health care', accepte: ['healthcare', 'health-care', 'medical care'],
          pieges: [{ si: ['health'], resultat: 'presque', message: 'Health, c\'est la santé ; le mot du cours, pour les soins : health care.' }],
        },
        { id: 'p-t-pyramid', type: 'terme', fr: 'la pyramide des âges', attendu: 'population pyramid', accepte: ['age pyramid', 'demographic pyramid'] },
      ],
    },

    {
      id: 'ch03-scenarios',
      seance: 2,
      titre: 'Three demographic scenarios',
      sousTitre: 'II — 1. Working force · 2. Dynamics · 3. Ageing',
      duree: 6,
      fiche: [
        {
          type: 'regle',
          titre: '1. Larger working force',
          lignes: [
            'The **economically active population** is the part of the population that is of **working age** and **capable of working**.',
            'A **larger** active population is an **asset**: more **economic activity**, so more **tax collection**.',
            '**But** it also needs more **resources** (food, water, energy…) and more **services** (schools, hospitals…).',
          ],
        },
        {
          type: 'regle',
          titre: '2. Different demographic dynamics',
          lignes: [
            'Population growth is **stronger in poorer countries**: there, a large active population is a **driving force** for development.',
            'In **wealthier countries**, **birth rates fall**: the **high cost of living**, **personal choices** (later pregnancies, families without children), **pessimism** about the future.',
            'The graph of natural increase: **Africa** has the highest; in **Europe** it is **below zero** — more deaths than births.',
          ],
        },
        {
          type: 'regle',
          titre: '3. Ageing population',
          lignes: [
            '**Lower death rates** + **lower birth rates** → the population **ages**: the **average age** gets higher.',
            'Consequences: **less economic activity**, and **higher expenses** for **pensions** and **health care**.',
            'The challenge: keep people\'s **quality of life** without **overcharging the younger generations** (= putting too heavy a burden on them; the cartoon: a few young people carrying many old people).',
          ],
        },
      ],
      items: [
        {
          id: 'p-active-def', type: 'choix', consigne: BLOC, phrase: 'What is the economically active population?',
          options: ['The part of the population of working age and capable of working', 'All the people who live in a country', 'The people above 65'],
          attendu: 'The part of the population of working age and capable of working',
          explication: 'Working age, and capable of working.',
        },
        {
          id: 'p-asset', type: 'choix', consigne: BLOC, phrase: 'Why is a larger active population an asset?',
          options: ['It increases economic activity and tax collection', 'It needs fewer schools and hospitals', 'It uses fewer resources'],
          attendu: 'It increases economic activity and tax collection',
          explication: 'More workers: more economic activity, so more taxes collected.',
        },
        {
          id: 'p-but', type: 'choix', consigne: BLOC, phrase: 'What is the problem with a larger active population?',
          options: ['It needs more resources and services', 'It pays fewer taxes', 'It makes the population older'],
          attendu: 'It needs more resources and services',
          explication: 'More food, water and energy; more schools and hospitals.',
        },
        {
          id: 'p-poorer', type: 'choix', consigne: BLOC, phrase: 'Where is population growth stronger?',
          options: ['In poorer countries', 'In wealthier countries', 'Everywhere the same'],
          attendu: 'In poorer countries',
          explication: 'There, a large active population drives development.',
        },
        {
          id: 'p-africa', type: 'choix', consigne: 'D\'après le graphique de l\'accroissement naturel :', phrase: 'Which continent has the highest natural increase?',
          options: ['Africa', 'Europe', 'Asia'], attendu: 'Africa',
          explication: 'Africa is far above the others; Europe is below zero.',
        },
        {
          id: 'p-europe', type: 'choix', consigne: 'D\'après le graphique de l\'accroissement naturel :', phrase: 'In Europe, the natural increase is below zero. What does it mean?',
          options: ['There are more deaths than births', 'There are more births than deaths', 'Nobody is born in Europe'],
          attendu: 'There are more deaths than births',
          explication: 'A natural decrease: deaths outnumber births.',
        },
        {
          id: 'p-why-fall', type: 'choix', consigne: BLOC, phrase: 'Why do birth rates fall in wealthier countries?',
          options: ['The high cost of living, personal choices and pessimism about the future', 'Because there are no hospitals', 'Because people live shorter lives'],
          attendu: 'The high cost of living, personal choices and pessimism about the future',
          explication: 'Personal choices: later pregnancies, families without children.',
        },
        {
          id: 'p-ageing-cause', type: 'choix', consigne: BLOC, phrase: 'What leads to an ageing population?',
          options: ['Lower death rates and lower birth rates', 'Higher birth rates', 'Higher death rates'],
          attendu: 'Lower death rates and lower birth rates',
          explication: 'People live longer, and fewer babies are born: the average age gets higher.',
        },
        {
          id: 'p-ageing-cost', type: 'choix', consigne: BLOC, phrase: 'What are the economic pressures of an ageing population?',
          options: ['Less economic activity, more expenses for pensions and health care', 'More schools to build', 'More workers and more taxes'],
          attendu: 'Less economic activity, more expenses for pensions and health care',
          explication: 'Fewer workers, and more pensions and health care to pay for.',
        },
        {
          id: 'p-challenge', type: 'choix', consigne: BLOC, phrase: 'What is the challenge of an ageing population?',
          options: ['Keeping people\'s quality of life without overcharging the younger generations', 'Building more schools', 'Stopping all births'],
          attendu: 'Keeping people\'s quality of life without overcharging the younger generations',
          explication: 'The cartoon: a few young people carrying many old people.',
        },
      ],
    },

    {
      id: 'ch03-ecrire-ageing',
      seance: 2,
      titre: 'Write: an ageing population',
      sousTitre: 'Les questions 4 et 5 de l\'activité',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Answer in three steps',
          lignes: [
            '**The phenomenon**: the ageing of the population — 9.6% of people above 65 in 2021, 16% in 2050.',
            '**Why**: lower death rates and lower birth rates.',
            '**Consequences**: less economic activity, more expenses for pensions and health care, a heavy burden for the younger generations.',
          ],
        },
      ],
      items: [
        {
          id: 'w-ageing', type: 'decrire', sujet: 'Document 2: what is the phenomenon, why does it happen, and what are its possible consequences?', emoji: '👵',
          indices: ['ageing', '9.6% in 2021', '16% in 2050', 'lower birth rates', 'lower death rates', 'pensions', 'health care', 'younger generations'],
          consigne: 'En anglais, écris trois ou quatre phrases : le phénomène (avec les chiffres du document), sa cause, et ses conséquences.',
          titreModele: 'An example',
          modele: 'Document 2 shows the ageing of the world population: 9.6% of people were above 65 in 2021, and this share should reach 16% in 2050. This happens because death rates and birth rates are lower. As a consequence, there will be less economic activity and higher expenses for pensions and health care. The challenge is to keep people\'s quality of life without putting too heavy a burden on the younger generations.',
          criteres: [
            { id: 'phenomene', texte: 'Le phénomène, avec un chiffre : le vieillissement (9,6 % de plus de 65 ans en 2021, 16 % en 2050)' },
            { id: 'cause', texte: 'La cause : la baisse de la mortalité et de la natalité' },
            { id: 'consequences', texte: 'Une conséquence : moins d\'activité économique, plus de dépenses de retraites ou de santé, une charge pour les jeunes générations' },
          ],
        },
      ],
    },

    // ═══ Séance 3 — Management of resources ═════════════════════════════════

    {
      id: 'ch03-resources',
      seance: 3,
      titre: 'Resources, consumption and waste',
      sousTitre: 'III — 1. Natural resources · 2. Excessive consumption · Conclusion',
      duree: 6,
      fiche: [
        {
          type: 'regle',
          titre: '1. Consumption of the natural resources',
          lignes: [
            'A common idea: population growth will lead to the **exhaustion** of the planet\'s resources — our demands grow, and **not enough is left for future generations**.',
            'If so, we would have to **reduce demographic growth** quickly, to prevent a **collapse**.',
            'The cartoon (Kal, *The Baltimore Sun*, 1994): a baby drinking the Earth\'s resources — 4 billion people in 1974, 5 in 1987; the cartoonist expected 6 in 1997 and 8.5 in 2025.',
          ],
        },
        {
          type: 'regle',
          titre: '2. Excessive consumption',
          lignes: [
            'Besides the **inequalities** in the access to wealth, in **richer countries** consumption **largely exceeds people\'s needs**.',
            'Appliances and devices do not last long: on average a **mobile phone** about **2 years**, a computer 4 years, a fridge 10 years; and after 3 years of use, up to a third of computers have already broken down.',
            'This lifestyle **speeds up** the use of natural resources and **increases waste**.',
          ],
        },
        {
          type: 'regle',
          titre: 'Conclusion',
          lignes: [
            'As countries get **industrialised**, their population grows: first in **Europe and North America**, now in the **developing world**.',
            'This growth led to a higher consumption of resources, but it is **not unavoidable**: with **more responsible consumption**, population can grow **without putting the planet at risk**.',
          ],
        },
      ],
      items: [
        {
          id: 'p-exhaustion', type: 'choix', consigne: BLOC, phrase: 'What is commonly accepted about population growth?',
          options: ['It will lead to the exhaustion of the planet\'s resources', 'It will create new resources', 'It has no effect on resources'],
          attendu: 'It will lead to the exhaustion of the planet\'s resources',
          explication: 'Our demands grow, not leaving enough for future generations.',
        },
        {
          id: 'p-collapse', type: 'choix', consigne: BLOC, phrase: 'In that case, what would we have to do to prevent a collapse?',
          options: ['Reduce demographic growth as fast as possible', 'Increase the birth rate', 'Consume more'],
          attendu: 'Reduce demographic growth as fast as possible',
          explication: 'That is one answer; the conclusion offers another: consume more responsibly.',
        },
        {
          id: 'p-cartoon', type: 'choix', consigne: 'D\'après le dessin de Kal (1994) :', phrase: 'What does the baby drinking from the Earth represent?',
          options: ['A growing population using up the world\'s resources', 'A healthy planet', 'The birth of a new country'],
          attendu: 'A growing population using up the world\'s resources',
          explication: 'The baby gets bigger as the population grows, and the Earth gets emptier.',
        },
        {
          id: 'p-excess', type: 'choix', consigne: BLOC, phrase: 'In richer countries, consumption…',
          options: ['largely exceeds people\'s needs', 'is lower than people\'s needs', 'is the same as in poorer countries'],
          attendu: 'largely exceeds people\'s needs',
          explication: 'Besides the inequalities in the access to wealth.',
        },
        {
          id: 'p-phone', type: 'reponse', question: 'According to the document, how many years does a mobile phone last on average?',
          attendu: '2 years', accepte: ['2', 'two years', 'two', 'about 2 years', 'about two years', 'around 2 years', 'around two years'],
          explication: 'About 2 years — a fridge or a washing machine about 10.',
        },
        {
          id: 'p-lifestyle', type: 'choix', consigne: BLOC, phrase: 'What does this lifestyle do?',
          options: ['It speeds up the use of natural resources and increases waste', 'It saves natural resources', 'It reduces waste'],
          attendu: 'It speeds up the use of natural resources and increases waste',
          explication: 'More things bought, more things thrown away.',
        },
        {
          id: 'p-industrial', type: 'choix', consigne: BLOC, phrase: 'Where did the population first grow with industrialisation?',
          options: ['In Europe and North America', 'In Africa', 'In Asia'],
          attendu: 'In Europe and North America',
          explication: 'Now it is happening in the developing world.',
        },
        {
          id: 'p-solution', type: 'choix', consigne: BLOC, phrase: 'According to the conclusion, how can population grow without putting the planet at risk?',
          options: ['With a more responsible way of consuming', 'By consuming more', 'By stopping industry everywhere'],
          attendu: 'With a more responsible way of consuming',
          explication: 'Higher consumption is not an unavoidable consequence of growth.',
        },
      ],
    },

    {
      id: 'ch03-ecrire-resources',
      seance: 3,
      titre: 'Write: people and resources',
      sousTitre: 'Le problème, et une solution',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Answer in three steps',
          lignes: [
            '**The problem**: more people consume more resources; we already consume more than the planet can produce.',
            '**Excessive consumption**: in richer countries, consumption exceeds people\'s needs (a mobile phone lasts 2 years): more resources used, more waste.',
            '**A solution**: consume in a more responsible way.',
          ],
        },
      ],
      items: [
        {
          id: 'w-resources', type: 'decrire', sujet: 'Is population growth a danger for the planet\'s resources?', emoji: '♻️',
          indices: ['consume', 'resources', 'future generations', 'richer countries', 'needs', 'waste', 'mobile phone', 'responsible'],
          consigne: 'En anglais, écris trois ou quatre phrases : le problème, la surconsommation des pays riches (avec un exemple), et une solution.',
          titreModele: 'An example',
          modele: 'When the population grows, it consumes more resources, and today we already consume more than the planet can produce, which will affect future generations. In richer countries, consumption largely exceeds people\'s needs: for example, a mobile phone lasts only about two years. This lifestyle uses up natural resources faster and creates more waste. But this can be avoided: with a more responsible way of consuming, the population can grow without putting the planet at risk.',
          criteres: [
            { id: 'probleme', texte: 'Le problème : une population plus nombreuse consomme plus de ressources, au détriment des générations futures' },
            { id: 'exces', texte: 'La surconsommation des pays riches, avec un exemple (téléphone portable, appareils) ou ses effets (ressources, déchets)' },
            { id: 'solution', texte: 'Une solution : consommer de façon plus responsable' },
          ],
        },
      ],
    },
  ],

  // ── Le contrôle blanc ───────────────────────────────────────────────────
  interro: {
    duree: 8,
    tirage: [
      { etape: 'ch03-mots-population', nombre: 3 },
      { etape: 'ch03-documents', nombre: 3 },
      { etape: 'ch03-mots-scenarios', nombre: 2 },
      { etape: 'ch03-scenarios', nombre: 4 },
      { etape: 'ch03-resources', nombre: 4 },
    ],
  },
};
