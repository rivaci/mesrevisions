// Chapter 2 — « The Great War (1914–1918) », the traumatic rise of the 20th
// century.
//
// D'après le diaporama du cours d'Evan (« 02- World War 1 », quatre diapos :
// l'introduction, la guerre de mouvement, la guerre des tranchées jusqu'à
// Verdun et la Somme) et les pages de son cahier, qui continuent : « 3. A
// turning point: 1917 », puis « II – Effects of the war in the UK »
// (enlistment, the pacifist movement, social changes). Une page du cahier
// manquait aux photos (la fin du chapitre 1 et le début de celui-ci), que le
// diaporama couvre.
//
// La guerre de mouvement était déjà à la fin du chapitre 1, où le cours
// transcrit la plaçait : elle est reprise ici, avec d'autres questions, parce
// que le cours en fait la première partie de ce chapitre.
//
// Là où le cours s'écarte des manuels, l'appli suit le cours, puisque c'est lui
// qui est évalué — en disant « according to your course » :
//   - l'arrêt allemand à la Marne « about 80 km from Paris » (les manuels
//     disent plutôt une quarantaine de kilomètres) ;
//   - à Verdun en 1916, « the Germans were having great victories » (l'offensive
//     allemande a d'abord avancé, mais Verdun a tenu : les manuels en font une
//     victoire défensive française) ;
//   - la Somme, « the British » et « one of the greatest military defeats » (une
//     offensive franco-britannique, la plus meurtrière de la guerre pour
//     l'armée britannique).
// Le profil de Merlin le dit aussi.
//
// Les identifiants commencent par « gw- » : ceux du chapitre 1 restent à lui.
// Ils ne se renumérotent jamais : la progression y est rangée.

const BLOC = 'Choisis la bonne réponse :';
const ORDRE = 'Remets ces événements dans l\'ordre chronologique :';

export default {
  id: 'ch02',
  numero: 2,
  titre: 'The Great War (1914–1918)',
  detail: 'War of movement · Trench warfare · 1917 · Britain at war',

  // Ce que Merlin sait du chapitre quand il corrige un écrit.
  profilMerlin: 'Élève de 3e en section internationale : il suit l\'histoire en anglais. Chapitre en cours : « The Great War '
    + '(1914–1918), the traumatic rise of the 20th century ». Introduction : au début, la plupart des hommes politiques et des '
    + 'analystes croient à une guerre de quelques mois, parce que l\'arsenal est si destructeur que le conflit devrait finir vite ; '
    + 'ils se trompent. 1. La guerre de mouvement (août–décembre 1914) : l\'Allemagne, prise en étau entre la France et la Russie, '
    + 'applique le plan Schlieffen (battre vite la France, puis se tourner vers le front de l\'Est) ; elle traverse le territoire '
    + 'français en un mois et n\'est arrêtée qu\'à la bataille de la Marne, « about 80 km from Paris ». 2. La guerre des tranchées '
    + '(décembre 1914–1917) : en décembre 1914, les deux camps ont des forces équivalentes, aucun ne peut avancer ; ils creusent '
    + 'des tranchées fortifiées et tout gain de territoire devient presque impossible. En 1916, selon le cours, les Allemands '
    + 'remportent de grandes victoires à Verdun ; pour compenser ces pertes, les Britanniques lancent un assaut près de la Somme : '
    + 'la bataille de la Somme, selon le cours l\'une des plus grandes défaites militaires de la guerre. 3. Le tournant de 1917 : '
    + 'ravagés par la faim et la guerre, les Russes se révoltent contre le tsar et veulent quitter la guerre (révolution de février, '
    + 'qui renverse le gouvernement) ; en avril, les États-Unis abandonnent l\'isolationnisme et rejoignent l\'Entente. II. Les '
    + 'effets de la guerre au Royaume-Uni : plus de 200 000 volontaires au début ; la guerre durant plus que prévu, le Parlement '
    + 'instaure en 1916 la conscription, une première au Royaume-Uni (obligation pour les hommes adultes de rejoindre l\'armée) ; '
    + 'des mouvements pacifistes critiquent la guerre, qui ne vaut pas qu\'on meure pour elle ; destructions, population décimée '
    + '(surtout les jeunes hommes) ; les femmes, appelées à remplacer la main-d\'œuvre masculine, réclament une place économique et '
    + 'politique. Écarts du cours avec les '
    + 'manuels, à compter justes : les 80 km de la Marne, les « great victories » allemandes à Verdun, la Somme présentée comme un '
    + 'assaut britannique et une très grande défaite. Un fait juste absent du cours (Verdun a tenu, la Somme est aussi française, '
    + 'la course à la mer de la carte) n\'est jamais faux.',

  seances: [
    { numero: 1, partie: 'Introduction, I.1', titre: 'A short war? The war of movement' },
    { numero: 2, partie: 'I.2–3', titre: 'Trench warfare, and the turning point of 1917' },
    { numero: 3, partie: 'II', titre: 'Effects of the war in the UK' },
  ],

  etapes: [
    // ═══ Séance 1 — a short war? The war of movement ══════════════════════

    {
      id: 'ch02-mots',
      seance: 1,
      titre: 'Key words',
      sousTitre: 'Le vocabulaire du chapitre, en anglais',
      duree: 3,
      fiche: [
        {
          type: 'vocabulaire',
          titre: 'Key words',
          mots: [
            { en: 'war of movement', fr: 'la guerre de mouvement' },
            { en: 'trench warfare', fr: 'la guerre des tranchées' },
            { en: 'fortified trenches', fr: 'des tranchées fortifiées' },
            { en: 'the western front', fr: 'le front de l\'Ouest' },
            { en: 'the eastern front', fr: 'le front de l\'Est' },
            { en: 'sandwiched between', fr: 'pris en étau entre' },
            { en: 'to advance', fr: 'avancer (pour une armée)' },
            { en: 'an assault', fr: 'un assaut, une attaque' },
            { en: 'losses', fr: 'les pertes' },
            { en: 'a defeat', fr: 'une défaite' },
            { en: 'a gain of territory', fr: 'un gain de territoire' },
            { en: 'an assumption', fr: 'une supposition, une hypothèse' },
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**trench** = la tranchée ; **trench warfare** = la guerre des tranchées : en anglais, « trench » passe devant.',
            '**losses** = les pertes, toujours au pluriel quand on parle d\'une bataille.',
          ],
        },
      ],
      items: [
        { id: 'gw-t-movement', type: 'terme', fr: 'la guerre de mouvement', attendu: 'war of movement' },
        {
          id: 'gw-t-trench', type: 'terme', fr: 'la guerre des tranchées', attendu: 'trench warfare', accepte: ['trench war'],
          pieges: [{ si: ['warfare trench', 'war of trenches'], resultat: 'presque', message: 'En anglais, « trench » passe devant : trench warfare.' }],
        },
        { id: 'gw-t-fortified', type: 'terme', fr: 'des tranchées fortifiées', attendu: 'fortified trenches', accepte: ['fortified trench'] },
        { id: 'gw-t-western', type: 'terme', fr: 'le front de l\'Ouest', attendu: 'western front', accepte: ['west front'] },
        { id: 'gw-t-eastern', type: 'terme', fr: 'le front de l\'Est', attendu: 'eastern front', accepte: ['east front'] },
        { id: 'gw-t-sandwiched', type: 'terme', fr: 'pris en étau entre', attendu: 'sandwiched between', accepte: ['sandwiched', 'caught between', 'squeezed between', 'trapped between'] },
        { id: 'gw-t-assault', type: 'terme', fr: 'un assaut, une attaque', attendu: 'assault', accepte: ['attack', 'offensive'] },
        {
          id: 'gw-t-losses', type: 'terme', fr: 'les pertes', attendu: 'losses', accepte: ['casualties'],
          pieges: [
            { si: ['lost', 'perts'], message: 'Les pertes : losses.' },
            { si: 'loss', resultat: 'presque', message: 'Au pluriel pour une bataille : losses.' },
          ],
        },
        {
          id: 'gw-t-defeat', type: 'terme', fr: 'une défaite', attendu: 'defeat',
          pieges: [{ si: 'defaite', message: 'Défaite, c\'est le français. En anglais : defeat.' }],
        },
        { id: 'gw-t-assumption', type: 'terme', fr: 'une supposition', attendu: 'assumption', accepte: ['assumptions', 'supposition', 'hypothesis'] },
      ],
    },

    {
      id: 'ch02-movement',
      seance: 1,
      titre: 'A short war? The war of movement',
      sousTitre: 'Introduction, and I — 1. August–December 1914',
      duree: 5,
      fiche: [
        {
          type: 'regle',
          titre: 'Introduction — a war most people thought would be short',
          lignes: [
            'When the war breaks out, most **politicians and analysts** expect it to last **a few months**, no more.',
            'Their reason: with an **arsenal** that destructive, the fighting should be over fast.',
            'Their assumption is **wrong** — the war lasts until **1918**.',
          ],
        },
        {
          type: 'regle',
          titre: '1. War of movement (August–December 1914)',
          lignes: [
            'Germany is **sandwiched between France and Russia**: a very uncomfortable position, strategically.',
            'Its way out, the **Schlieffen Plan**: beat **France quickly**, then turn to the **eastern front**.',
            'A fierce German advance: they march through French territory in **one month**. Only the **Battle of the Marne** stops them, about **80 km from Paris** (as your course says).',
          ],
        },
        {
          type: 'regle',
          titre: 'The map: the western front in 1914',
          lignes: [
            'The **furthest German advance**: **5 September 1914**.',
            'Then the **Allied offensive of September 1914**: the Battle of the Marne.',
            'Then the **race to the sea** (« course à la mer » on the map), September–November 1914.',
          ],
        },
      ],
      items: [
        {
          id: 'gw-short', type: 'choix', consigne: BLOC, phrase: 'How long did most politicians and analysts think the war would last?',
          options: ['A few months', 'Four years', 'Ten years'], attendu: 'A few months',
          explication: 'A few months — they were wrong.',
        },
        {
          id: 'gw-why-short', type: 'choix', consigne: BLOC, phrase: 'Why did they expect a short war?',
          options: ['The weapons were so destructive that the conflict would soon end', 'Germany had no army', 'The soldiers refused to fight'],
          attendu: 'The weapons were so destructive that the conflict would soon end',
          explication: 'Weapons that powerful, they thought, would end the war fast.',
        },
        {
          id: 'gw-wrong', type: 'choix', consigne: 'Vrai ou faux ?', phrase: 'Their assumption was right: the war lasted only a few months.',
          options: ['True', 'False'], attendu: 'False',
          explication: 'False: they were wrong, the war lasted from 1914 to 1918.',
        },
        {
          id: 'gw-sandwiched', type: 'choix', consigne: BLOC, phrase: 'Why was Germany\'s position so uncomfortable?',
          options: ['It was sandwiched between France and Russia', 'It had no colonies', 'It was an island'],
          attendu: 'It was sandwiched between France and Russia',
          explication: 'Between France and Russia, Germany risked fighting on two fronts.',
        },
        {
          id: 'gw-plan', type: 'reponse', question: 'What was the name of the German plan?', attendu: 'Schlieffen Plan',
          accepte: ['the Schlieffen Plan', 'Schlieffen', 'Schlieffen\'s plan'],
          explication: 'The Schlieffen Plan.',
          pieges: [{ si: ['plan Schlieffen', 'le plan Schlieffen'], resultat: 'presque', message: 'En anglais, le nom passe avant : the Schlieffen Plan.' }],
        },
        {
          id: 'gw-plan-what', type: 'choix', consigne: BLOC, phrase: 'What did the Schlieffen Plan consist in?',
          options: ['Quickly defeating France, then focusing on the eastern front', 'Attacking Russia first, then France', 'Only defending the German borders'],
          attendu: 'Quickly defeating France, then focusing on the eastern front',
          explication: 'Beat France quickly, then turn to the eastern front against Russia.',
        },
        {
          id: 'gw-month', type: 'choix', consigne: BLOC, phrase: 'How long did it take the Germans to march through French territory?',
          options: ['One month', 'One week', 'One year'], attendu: 'One month',
          explication: 'One month.',
        },
        {
          id: 'gw-marne', type: 'reponse', question: 'At which battle were the Germans stopped in 1914?', attendu: 'Battle of the Marne',
          accepte: ['the Battle of the Marne', 'Marne', 'the Marne', 'at the Battle of the Marne', 'First Battle of the Marne', 'at the Marne', 'Marne battle'],
          explication: 'At the Battle of the Marne, in September 1914.',
          pieges: [
            { si: ['Verdun', 'Battle of Verdun', 'Somme', 'Battle of the Somme'], message: 'Verdun et la Somme, c\'est 1916. En 1914, les Allemands sont arrêtés à la Marne.' },
            { si: ['la Marne', 'bataille de la Marne'], resultat: 'presque', message: 'En anglais : the Battle of the Marne.' },
          ],
        },
        {
          id: 'gw-km', type: 'reponse', question: 'According to your course, about how far from Paris were the Germans stopped?', attendu: '80 km',
          accepte: ['80', 'about 80 km', 'about 80', '80 kilometres', '80 kilometers', 'around 80 km', 'around 80', '80km', 'about 80km',
            'about 80 kilometres', 'about 80 km from Paris', '80 km from Paris', 'approximately 80 km'],
          explication: 'About 80 km from Paris, according to your course.',
        },
        {
          id: 'gw-movement-dates', type: 'choix', consigne: BLOC, phrase: 'When was the war of movement?',
          options: ['August–December 1914', 'December 1914–1917', '1914–1918'], attendu: 'August–December 1914',
          explication: 'War of movement: August–December 1914. Trench warfare: December 1914–1917.',
        },
        {
          id: 'gw-map-1914', type: 'choix', consigne: 'D\'après la carte « The western front in 1914 » :', phrase: 'When did the Germans reach their furthest advance?',
          options: ['5 September 1914', '21 February 1916', '11 November 1918'], attendu: '5 September 1914',
          explication: 'The furthest German advance: 5 September 1914. Then came the Battle of the Marne.',
        },
      ],
    },

    {
      id: 'ch02-ecrire-movement',
      seance: 1,
      titre: 'Writing: a short war?',
      sousTitre: 'Écrire en anglais, comme au contrôle',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'From a short war to the trenches',
          lignes: [
            '**What they expected**: a war of a few months, because the weapons were so destructive.',
            '**The plan**: Germany, sandwiched between France and Russia, wanted to beat France quickly (the Schlieffen Plan).',
            '**What happened**: the Germans marched through French territory in one month, but were stopped at the Marne, about 80 km from Paris.',
            '**The result**: in December 1914, nobody could advance — trench warfare began.',
            'Useful words: *at first, but, so, however, as a result.*',
          ],
        },
      ],
      items: [
        {
          id: 'gw-w-short', type: 'decrire', sujet: 'Most people expected a short war. Why did the war not end in 1914?', emoji: '⏳',
          indices: ['a few months', 'arsenal', 'sandwiched', 'Schlieffen Plan', 'Battle of the Marne', 'December 1914', 'trenches'],
          consigne: 'En anglais, explique en quatre ou cinq phrases pourquoi la guerre, qu\'on croyait courte, ne s\'est pas terminée en 1914.',
          titreModele: 'An example',
          modele: 'At first, most politicians thought that the war would only last a few months, because the weapons were so destructive. Caught between France and Russia, Germany followed the Schlieffen Plan: defeat France quickly, then fight on the eastern front. The German army marched through French territory in one month, but it was stopped at the Battle of the Marne, about 80 km from Paris. As a result, in December 1914 neither side could advance, and the soldiers dug trenches: the war of movement became trench warfare.',
          criteres: [
            { id: 'attente', texte: 'Ce qu\'on attendait : une guerre de quelques mois, à cause d\'armes très destructrices' },
            { id: 'plan', texte: 'Le plan Schlieffen : battre vite la France, puis se tourner vers l\'Est' },
            { id: 'marne', texte: 'L\'échec : les Allemands arrêtés à la bataille de la Marne' },
            { id: 'tranchees', texte: 'La suite : en décembre 1914, personne n\'avance, la guerre des tranchées commence' },
          ],
        },
      ],
    },

    // ═══ Séance 2 — trench warfare: Verdun and the Somme ════════════════════

    {
      id: 'ch02-trenches',
      seance: 2,
      titre: 'Trench warfare',
      sousTitre: 'I — 2. December 1914–1917: Verdun and the Somme',
      duree: 5,
      fiche: [
        {
          type: 'regle',
          titre: '2. Trench warfare (December 1914–1917)',
          lignes: [
            '**December 1914**: both sides have **equivalent forces** — **neither can advance**.',
            'They dig **fortified trenches**: from then on, gaining territory is **almost impossible**.',
          ],
        },
        {
          type: 'regle',
          titre: '1916: Verdun and the Somme',
          lignes: [
            '**Battle of Verdun (1916)**: according to your course, the **Germans** were winning **great victories** there.',
            'According to your course, to make up for those **losses**, the **British** launch an intense **assault** near the **river Somme**: the **Battle of the Somme** (1916).',
            'Your course calls it one of the **greatest military defeats** of World War I.',
          ],
        },
        {
          type: 'regle',
          titre: 'The map: Verdun, 1916',
          lignes: [
            'Brown arrows: the **German offensives**. Blue arrows: the **French counter-attacks**. Stars: the **forts** around the town.',
            'Three front lines: on **21 February 1916**, when the battle begins; in **July 1916**, the furthest German advance; in **mid-December 1916**.',
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Ne pas mélanger les batailles : la **Marne**, c\'est **1914** (la guerre de mouvement s\'arrête) ; **Verdun** et la **Somme**, c\'est **1916** (la guerre des tranchées).',
          ],
        },
      ],
      items: [
        {
          id: 'gw-equal', type: 'choix', consigne: BLOC, phrase: 'What was the situation in December 1914?',
          options: ['The two sides had equivalent forces: neither could advance', 'The Germans were about to take Paris', 'The British had won the war'],
          attendu: 'The two sides had equivalent forces: neither could advance',
          explication: 'Equivalent forces: neither side could advance.',
        },
        {
          id: 'gw-build', type: 'choix', consigne: BLOC, phrase: 'What did the two sides start building?',
          options: ['Fortified trenches', 'Castles', 'Stone walls along the border'], attendu: 'Fortified trenches',
          explication: 'They built fortified trenches.',
        },
        {
          id: 'gw-gain', type: 'choix', consigne: BLOC, phrase: 'What was the consequence of the trenches?',
          options: ['Gaining territory became almost impossible', 'The war ended quickly', 'The armies moved faster than before'],
          attendu: 'Gaining territory became almost impossible',
          explication: 'With the trenches, almost no territory could be gained.',
        },
        {
          id: 'gw-trench-dates', type: 'reponse', question: 'According to your course, when was trench warfare? (from … to …)',
          attendu: 'December 1914–1917',
          accepte: ['December 1914 to 1917', 'from December 1914 to 1917', 'December 1914 until 1917', 'from December 1914 until 1917', 'Dec 1914 1917',
            'Dec 1914 to 1917', '1914–1917', '1914 to 1917', 'from 1914 to 1917', 'from 1914 until 1917', 'between 1914 and 1917'],
          explication: 'From December 1914 to 1917.',
          pieges: [{ si: ['1914–1918', '1914 to 1918', 'from 1914 to 1918', 'December 1914 to 1918', 'December 1914–1918'], message: '1914–1918, c\'est toute la guerre. Les tranchées, d\'après ton cours : décembre 1914–1917.' }],
        },
        {
          id: 'gw-1916', type: 'reponse', question: 'In which year were the Battles of Verdun and the Somme?', attendu: '1916',
          accepte: ['in 1916'],
          explication: 'Both in 1916.',
          pieges: [{ si: ['1914', 'in 1914'], message: '1914, c\'est la Marne. Verdun et la Somme : 1916.' }],
        },
        {
          id: 'gw-verdun', type: 'choix', consigne: BLOC, phrase: 'According to your course, who was having great victories at Verdun in 1916?',
          options: ['The Germans', 'The British', 'The Russians'], attendu: 'The Germans',
          explication: 'The Germans, according to your course — that is why the British attacked on the Somme.',
        },
        {
          id: 'gw-somme', type: 'reponse', question: 'According to your course, near which river did the British launch an intense assault in 1916?', attendu: 'Somme',
          accepte: ['the Somme', 'river Somme', 'the river Somme', 'the Somme river', 'Somme river', 'near the Somme', 'near the river Somme'],
          explication: 'Near the river Somme: the Battle of the Somme.',
          pieges: [
            { si: ['Marne', 'the Marne', 'river Marne'], message: 'La Marne, c\'est 1914. En 1916, l\'assaut britannique a lieu près de la Somme.' },
            { si: ['Verdun'], message: 'Verdun, c\'est là où, d\'après ton cours, les Allemands gagnaient. L\'assaut britannique : près de la Somme.' },
            { si: ['la Somme'], resultat: 'presque', message: 'En anglais : the Somme.' },
          ],
        },
        {
          id: 'gw-who-somme', type: 'choix', consigne: BLOC, phrase: 'According to your course, who launched the assault near the river Somme?',
          options: ['The British', 'The Germans', 'The Americans'], attendu: 'The British',
          explication: 'The British, according to your course.',
        },
        {
          id: 'gw-why-somme', type: 'choix', consigne: BLOC, phrase: 'According to your course, why was the Battle of the Somme launched?',
          options: ['To compensate for the losses at Verdun', 'To stop the Germans before Paris in 1914', 'To open the eastern front'],
          attendu: 'To compensate for the losses at Verdun',
          explication: 'To make up for the losses at Verdun.',
        },
        {
          id: 'gw-somme-result', type: 'choix', consigne: BLOC, phrase: 'How does your course describe the Battle of the Somme?',
          options: ['One of the greatest military defeats of World War I', 'A quick victory that ended the war', 'A small battle with few losses'],
          attendu: 'One of the greatest military defeats of World War I',
          explication: 'One of the greatest military defeats of the war, according to your course.',
        },
        {
          id: 'gw-map-verdun', type: 'choix', consigne: 'D\'après la carte de Verdun :', phrase: 'According to the map, on which date did the Battle of Verdun begin?',
          options: ['21 February 1916', '5 September 1914', '11 November 1918'], attendu: '21 February 1916',
          explication: 'The front line of 21 February 1916: the start of the Battle of Verdun.',
        },
      ],
    },

    {
      id: 'ch02-1917',
      seance: 2,
      titre: 'A turning point: 1917',
      sousTitre: 'I — 3. Russia wants out, the United States come in',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: '3. A turning point: 1917',
          lignes: [
            '**1917**: two major events change the course of the conflict — a **turning point**.',
            '**Russia**: worn out by **hunger** and by the war, the Russians **revolt against their tsar** and want to **leave the war**. This is the **February Revolution**: the government is **overthrown**.',
            '**The United States**: in **April 1917**, they give up their policy of **isolationism** and officially **join the Entente**.',
          ],
        },
        {
          type: 'vocabulaire',
          titre: 'Key words',
          mots: [
            { en: 'a turning point', fr: 'un tournant' },
            { en: 'hunger', fr: 'la faim' },
            { en: 'the tsar', fr: 'le tsar, l\'empereur de Russie' },
            { en: 'to overthrow', fr: 'renverser (un gouvernement)' },
            { en: 'isolationism', fr: 'l\'isolationnisme : rester à l\'écart des affaires du monde' },
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Les deux événements de 1917 vont en sens contraire : la **Russie** veut **sortir** de la guerre (février), les **États-Unis** y **entrent** (avril).',
          ],
        },
      ],
      items: [
        {
          id: 'gw-turning', type: 'reponse', question: 'Which year does your course call a turning point of the war?', attendu: '1917',
          accepte: ['in 1917'],
          explication: '1917: the February Revolution in Russia, and the United States join the war.',
          pieges: [{ si: ['1916', 'in 1916'], message: '1916, ce sont Verdun et la Somme. Le tournant, d\'après ton cours : 1917.' }],
        },
        {
          id: 'gw-russia-why', type: 'choix', consigne: BLOC, phrase: 'Why did the Russians revolt in 1917?',
          options: ['They were devastated by hunger and by the war', 'They wanted to conquer Germany', 'Their tsar wanted to stop the war'],
          attendu: 'They were devastated by hunger and by the war',
          explication: 'Hunger and the war had devastated them.',
        },
        {
          id: 'gw-russia-against', type: 'choix', consigne: BLOC, phrase: 'Against whom did the Russians revolt?',
          options: ['Their tsar', 'The German emperor', 'The British army'], attendu: 'Their tsar',
          explication: 'Against their tsar.',
        },
        {
          id: 'gw-revolution', type: 'reponse', question: 'Which revolution overthrew the Russian government in 1917, according to your course?',
          attendu: 'February Revolution', accepte: ['the February Revolution', 'February', 'the revolution of February'],
          explication: 'The February Revolution (1917).',
          pieges: [{ si: ['October Revolution', 'the October Revolution', 'October'], message: 'La révolution d\'Octobre existe aussi, mais ton cours parle de celle qui renverse le gouvernement du tsar : la révolution de février.' }],
        },
        {
          id: 'gw-russia-want', type: 'choix', consigne: BLOC, phrase: 'What did the Russians want to do?',
          options: ['Leave the war', 'Join the Triple Alliance', 'Attack the United States'], attendu: 'Leave the war',
          explication: 'They wanted to leave the conflict.',
        },
        {
          id: 'gw-usa-when', type: 'reponse', question: 'In which month of 1917 did the United States join the war?', attendu: 'April',
          accepte: ['April 1917', 'in April', 'in April 1917'],
          explication: 'In April 1917.',
          pieges: [{ si: ['February', 'February 1917', 'in February'], message: 'Février, c\'est la révolution russe. Les États-Unis entrent en guerre en avril 1917.' }],
        },
        {
          id: 'gw-usa-policy', type: 'reponse', question: 'Which policy did the United States give up in 1917?', attendu: 'isolationism',
          accepte: ['isolationism policy', 'policy of isolationism', 'isolationist policy', 'their isolationism', 'their isolationism policy'],
          explication: 'Isolationism: staying out of the world\'s affairs.',
          pieges: [{ si: ['isolation', 'isolationnisme'], resultat: 'presque', message: 'Le mot exact : isolationism.' }],
        },
        {
          id: 'gw-usa-side', type: 'choix', consigne: BLOC, phrase: 'Which side did the United States officially join?',
          options: ['The Entente', 'The Triple Alliance', 'Neither: they stayed neutral'], attendu: 'The Entente',
          explication: 'They joined the Entente (England, France… and Russia, which wanted to leave).',
        },
      ],
    },

    {
      id: 'ch02-ecrire-1916',
      seance: 2,
      titre: 'Writing: trench warfare and 1916',
      sousTitre: 'Écrire en anglais, comme au contrôle',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Describe, then tell the year 1916',
          lignes: [
            '**Trench warfare**: December 1914, equivalent forces, nobody advances; fortified trenches, almost no territory gained.',
            '**Verdun (1916)**: according to your course, great German victories.',
            '**The Somme (1916)**: according to your course, the British attack to make up for those losses — one of the greatest military defeats of the war.',
            'Useful words: *because, so, then, to compensate for, as a result.*',
          ],
        },
      ],
      items: [
        {
          id: 'gw-w-1916', type: 'decrire', sujet: 'Trench warfare and the year 1916', emoji: '🪖',
          indices: ['December 1914', 'equivalent forces', 'fortified trenches', 'territory', 'Verdun', 'the Somme', 'losses'],
          consigne: 'En anglais, explique en quatre ou cinq phrases ce qu\'est la guerre des tranchées, et ce qui se passe à Verdun et sur la Somme en 1916.',
          titreModele: 'An example',
          modele: 'Trench warfare began in December 1914: both armies were equally strong, so neither of them could move forward. The soldiers dug fortified trenches, and from then on almost no territory could be won, until 1917. According to my course, in 1916 the Germans were winning great victories at Verdun. To make up for the losses at Verdun, the British attacked near the river Somme, and my course says that the Battle of the Somme was one of the worst military defeats of the First World War.',
          criteres: [
            { id: 'tranchees', texte: 'La guerre des tranchées : à partir de décembre 1914, personne n\'avance (les forces s\'équilibrent), presque aucun gain de territoire' },
            { id: 'verdun', texte: 'Verdun, 1916 : d\'après le cours, de grandes victoires allemandes' },
            { id: 'somme', texte: 'La Somme, 1916 : l\'assaut britannique pour compenser ces pertes, une des plus grandes défaites de la guerre' },
          ],
        },
      ],
    },

    // ═══ Séance 3 — effects of the war in the UK ═══════════════════════════

    {
      id: 'ch02-mots-uk',
      seance: 3,
      titre: 'Key words',
      sousTitre: '1917, and Britain at war',
      duree: 3,
      fiche: [
        {
          type: 'vocabulaire',
          titre: 'Key words',
          mots: [
            { en: 'to volunteer', fr: 'se porter volontaire' },
            { en: 'enlistment', fr: 'l\'engagement dans l\'armée' },
            { en: 'conscription', fr: 'le service militaire obligatoire' },
            { en: 'a pacifist', fr: 'un pacifiste' },
            { en: 'decimated', fr: 'décimé' },
            { en: 'the workforce', fr: 'la main-d\'œuvre' },
            { en: 'a turning point', fr: 'un tournant' },
            { en: 'the tsar', fr: 'le tsar' },
            { en: 'to overthrow', fr: 'renverser' },
          ],
        },
      ],
      items: [
        { id: 'gw-t-volunteer', type: 'terme', fr: 'se porter volontaire', attendu: 'volunteer', accepte: ['to volunteer', 'volunteered'] },
        { id: 'gw-t-enlistment', type: 'terme', fr: 'l\'engagement dans l\'armée', attendu: 'enlistment' },
        {
          id: 'gw-t-conscription', type: 'terme', fr: 'le service militaire obligatoire', attendu: 'conscription',
          pieges: [{ si: ['volunteering', 'volunteer'], message: 'Non : être volontaire, c\'est le contraire. Obligatoire : conscription.' }],
        },
        { id: 'gw-t-pacifist', type: 'terme', fr: 'un pacifiste', attendu: 'pacifist', accepte: ['pacifists'] },
        { id: 'gw-t-decimated', type: 'terme', fr: 'décimé', attendu: 'decimated' },
        { id: 'gw-t-workforce', type: 'terme', fr: 'la main-d\'œuvre', attendu: 'workforce', accepte: ['working force', 'work force', 'labour force', 'labor force'] },
        { id: 'gw-t-turning', type: 'terme', fr: 'un tournant', attendu: 'turning point' },
        { id: 'gw-t-tsar', type: 'terme', fr: 'le tsar', attendu: 'tsar', accepte: ['czar', 'tzar'] },
        { id: 'gw-t-overthrow', type: 'terme', fr: 'renverser (un gouvernement)', attendu: 'overthrow', accepte: ['to overthrow', 'overthrew'] },
      ],
    },

    {
      id: 'ch02-uk',
      seance: 3,
      titre: 'Effects of the war in the UK',
      sousTitre: 'II — Enlistment, pacifists, social changes',
      duree: 5,
      fiche: [
        {
          type: 'regle',
          titre: '1. Enlistment',
          lignes: [
            'As soon as the war begins, **more than 200,000 British men volunteer** for the army.',
            'But the war lasts longer than expected → in **1916**, **Parliament** passes new laws: **conscription**, for the **first time in the UK**.',
            '**Conscription**: adult men **must** join the army — no more relying only on **volunteers**.',
          ],
        },
        {
          type: 'regle',
          titre: '2. The pacifist movement',
          lignes: [
            'Some citizens are **eager** to take part in the war; but **critical movements** grow inside the countries.',
            'They defend **universal** ideals, or **question the real motives** of the conflict: for them, this war is **not worth dying for**.',
          ],
        },
        {
          type: 'regle',
          titre: '3. Social changes',
          lignes: [
            'The war brings **huge destruction** all over Europe: countries **devastated**, populations **decimated** — above all **young men**.',
            '**Women**, called in to **replace the male workforce**, start to ask for a **bigger part in society**: **economically and politically**.',
          ],
        },
      ],
      items: [
        {
          id: 'uk-volunteers', type: 'choix', consigne: BLOC, phrase: 'According to your course, how many British men volunteered as soon as the war began?',
          options: ['More than 200,000', 'About 2,000', 'More than 20 million'], attendu: 'More than 200,000',
          explication: 'More than 200,000, according to your course.',
        },
        {
          id: 'uk-how', type: 'choix', consigne: BLOC, phrase: 'At the start of the war, how did British men join the army?',
          options: ['They volunteered', 'They were forced by conscription', 'They were chosen by lottery'], attendu: 'They volunteered',
          explication: 'At first they volunteered; conscription only came in 1916.',
        },
        {
          id: 'uk-1916', type: 'reponse', question: 'In which year was conscription introduced in the UK?', attendu: '1916',
          accepte: ['in 1916'],
          explication: 'In 1916, for the first time in the UK.',
          pieges: [{ si: ['1914', 'in 1914'], message: '1914, ce sont les volontaires. La conscription : 1916.' }],
        },
        {
          id: 'uk-why', type: 'choix', consigne: BLOC, phrase: 'Why did Parliament introduce conscription?',
          options: ['The war was lasting longer than expected', 'Too many men wanted to join the army', 'The war had just ended'],
          attendu: 'The war was lasting longer than expected',
          explication: 'The war was lasting much longer than expected: volunteers were no longer enough.',
        },
        {
          id: 'uk-definition', type: 'choix', consigne: BLOC, phrase: 'What is conscription?',
          options: ['The obligation for adult men to join the army', 'Joining the army as a volunteer', 'Leaving the army to work in a factory'],
          attendu: 'The obligation for adult men to join the army',
          explication: 'Conscription: adult men are obliged to join the army.',
        },
        {
          id: 'uk-first', type: 'choix', consigne: 'Vrai ou faux ?', phrase: 'The UK already had conscription long before 1916.',
          options: ['True', 'False'], attendu: 'False',
          explication: 'False: 1916 was the first time.',
        },
        {
          id: 'uk-pacifist', type: 'reponse', question: 'What were the movements that criticised the war called?', attendu: 'pacifist movements',
          accepte: ['pacifist movement', 'the pacifist movement', 'pacifists', 'pacifist', 'pacifism'],
          explication: 'The pacifist movements.',
        },
        {
          id: 'uk-pacifist-idea', type: 'choix', consigne: BLOC, phrase: 'What did the pacifists think of the war?',
          options: ['It was not worth dying for', 'Every man should volunteer', 'It would be over in a few months'],
          attendu: 'It was not worth dying for',
          explication: 'For them, this war was not worth dying for.',
        },
        {
          id: 'uk-decimated', type: 'choix', consigne: BLOC, phrase: 'Which part of the population was especially decimated?',
          options: ['Young men', 'Old people', 'Young children'], attendu: 'Young men',
          explication: 'Above all, young men.',
        },
        {
          id: 'uk-women', type: 'choix', consigne: BLOC, phrase: 'Why did women start to ask for a bigger part in society?',
          options: ['They had replaced the male workforce during the war', 'They had fought in the trenches', 'They had won the 1916 elections'],
          attendu: 'They had replaced the male workforce during the war',
          explication: 'They had been called to replace the men at work.',
        },
        {
          id: 'uk-women-how', type: 'choix', consigne: BLOC, phrase: 'In which ways did women want to take part in society?',
          options: ['Economically and politically', 'Only in the army', 'Only in sport'], attendu: 'Economically and politically',
          explication: 'Both economically and politically.',
        },
      ],
    },

    {
      id: 'ch02-ecrire-uk',
      seance: 3,
      titre: 'Writing: Britain at war',
      sousTitre: 'Écrire en anglais, comme au contrôle',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Three changes, three ideas',
          lignes: [
            '**The army**: volunteers first, then conscription in 1916 — a first in the UK.',
            '**Opinion**: pacifist movements think the war is not worth dying for.',
            '**Society**: so many young men killed; women replace them at work and ask for more rights.',
            'Useful words: *at first, then, however, at the same time, as a result.*',
          ],
        },
      ],
      items: [
        {
          id: 'gw-w-uk', type: 'decrire', sujet: 'How did the war change the United Kingdom?', emoji: '🇬🇧',
          indices: ['volunteers', '1916', 'conscription', 'pacifist', 'young men', 'women', 'workforce'],
          consigne: 'En anglais, explique en quatre ou cinq phrases comment la guerre a changé le Royaume-Uni.',
          titreModele: 'An example',
          modele: 'At the start of the war, more than 200,000 British men volunteered for the army. But the war lasted much longer than expected, so in 1916 Parliament introduced conscription for the first time: adult men had to join the army. At the same time, pacifist movements criticised the war, which they thought was not worth dying for. The war also killed huge numbers of young men, and women, who had taken their place at work, began to ask for more rights in the economy and in politics.',
          criteres: [
            { id: 'armee', texte: 'L\'armée : des volontaires d\'abord, puis la conscription en 1916, une première au Royaume-Uni' },
            { id: 'pacifistes', texte: 'Les pacifistes : des mouvements critiquent la guerre, qui ne vaut pas qu\'on meure pour elle' },
            { id: 'femmes', texte: 'La société : beaucoup de jeunes hommes tués ; les femmes, qui les ont remplacés au travail, réclament une place économique et politique' },
          ],
        },
      ],
    },

    {
      id: 'ch02-chronology',
      seance: 3,
      titre: 'Chronology',
      sousTitre: 'Les dates de tout le chapitre, dans l\'ordre',
      duree: 3,
      fiche: [
        {
          type: 'vocabulaire',
          titre: 'Key dates',
          mots: [
            { en: '1914–1918', fr: 'la Grande Guerre' },
            { en: 'August–December 1914', fr: 'la guerre de mouvement (le plan Schlieffen)' },
            { en: '5 September 1914', fr: 'l\'avance allemande la plus loin (carte)' },
            { en: 'September 1914', fr: 'la bataille de la Marne' },
            { en: 'December 1914–1917', fr: 'la guerre des tranchées' },
            { en: '21 February 1916', fr: 'début de la bataille de Verdun (carte)' },
            { en: '1916', fr: 'Verdun (à partir de février), la Somme (à partir de juillet) ; la conscription au Royaume-Uni' },
            { en: 'February 1917', fr: 'la révolution de février en Russie : le gouvernement du tsar renversé' },
            { en: 'April 1917', fr: 'les États-Unis entrent en guerre aux côtés de l\'Entente' },
          ],
        },
      ],
      items: [
        {
          id: 'gw-chrono', type: 'chrono', consigne: ORDRE,
          evenements: [
            { texte: 'Germany launches the Schlieffen Plan', date: 'August 1914' },
            { texte: 'The Germans are stopped at the Battle of the Marne', date: 'September 1914' },
            { texte: 'Trench warfare begins', date: 'December 1914' },
            { texte: 'The Battle of Verdun begins', date: 'February 1916' },
            { texte: 'The British launch an assault near the Somme', date: 'July 1916, during Verdun' },
            { texte: 'The February Revolution overthrows the Russian government', date: 'February 1917' },
            { texte: 'The United States join the Entente', date: 'April 1917' },
          ],
        },
        {
          id: 'gw-war-dates', type: 'reponse', question: 'What are the dates of the Great War?', attendu: '1914–1918',
          accepte: ['1914 1918', '1914 to 1918', 'from 1914 to 1918', '1914-18', 'from 1914 until 1918', 'between 1914 and 1918'],
          explication: 'The Great War: 1914–1918.',
        },
        {
          id: 'gw-dec-1914', type: 'reponse', question: 'According to your course, in which month and year did trench warfare begin?', attendu: 'December 1914',
          accepte: ['Dec 1914', 'in December 1914', 'in Dec 1914', 'décembre 1914'],
          explication: 'December 1914.',
          pieges: [{ si: ['September 1914', 'in September 1914'], message: 'Septembre 1914, c\'est la Marne. D\'après ton cours, la guerre des tranchées commence en décembre 1914.' }],
        },
        {
          id: 'gw-century', type: 'choix', consigne: BLOC, phrase: 'Your course calls the Great War “the traumatic rise of the…”',
          options: ['20th century', '19th century', '21st century'], attendu: '20th century',
          explication: 'The traumatic rise of the 20th century (1901–2000).',
        },
      ],
    },

  ],

  // ── Le contrôle blanc ───────────────────────────────────────────────────
  interro: {
    duree: 10,
    tirage: [
      { etape: 'ch02-mots', nombre: 2 },
      { etape: 'ch02-movement', nombre: 4 },
      { etape: 'ch02-trenches', nombre: 4 },
      { etape: 'ch02-1917', nombre: 3 },
      { etape: 'ch02-mots-uk', nombre: 2 },
      { etape: 'ch02-uk', nombre: 4 },
      { etape: 'ch02-chronology', nombre: 1 },
    ],
  },
};
