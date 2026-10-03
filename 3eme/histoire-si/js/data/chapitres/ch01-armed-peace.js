// Chapter 1 — « From an armed peace to the Great War », and the start of
// « The Great War (1914–1918) ».
//
// D'après le cours d'Evan en section internationale (histoire en anglais),
// transcrit par Denis, et le cahier de textes de la dernière séance
// (« Nationalisms » : mouvements séparatistes, réaction des empires,
// l'assassinat de François-Ferdinand). Le cours transcrit s'arrête au début de
// « Trench warfare » : la partie n'est reprise que jusque-là.
//
// Deux écarts avec les manuels, gardés tels que le cours les dit, parce que
// c'est le cours qui est évalué : « Austro-Hungary » (on dit plutôt
// Austria-Hungary, accepté aussi) et l'arrêt allemand « about 80 km from
// Paris » à la Marne (les manuels disent plutôt une quarantaine de km).
//
// Les questions sont en anglais, comme le contrôle ; les explications de
// correction aussi, sauf quand il s'agit d'orthographe.
//
// Les identifiants ne se renumérotent jamais : la progression y est rangée.

const BLOC = 'Choisis la bonne réponse :';
const ORDRE = 'Remets ces événements dans l\'ordre chronologique :';

export default {
  id: 'ch01',
  numero: 1,
  titre: 'From an armed peace to the Great War',
  detail: 'Imperialism · Armed peace · Nationalisms · 1914',

  // Ce que Merlin sait du chapitre quand il corrige un écrit.
  profilMerlin: 'Élève de 3e en section internationale : il suit l\'histoire en anglais. Chapitre en cours : « From an armed peace '
    + 'to the Great War » et le début de « The Great War (1914–1918) » — impérialisme et course aux colonies (raw materials, '
    + 'markets, Asia and Africa), développement industriel inégal, rivalités (resentment, mistrust), paix armée et deux blocs '
    + '(Triple Alliance : Germany, Austria-Hungary, Italy ; Triple Entente : England, France, Russia), armement (automatic guns, '
    + 'Zeppelins), nationalismes (mouvements séparatistes, Grèce, Belgique et Serbie indépendantes, répression des nationalistes '
    + 'serbes, massacres des Grecs et des Arméniens dans l\'Empire ottoman : massacre 1894–1896, génocide 1915–1917), '
    + 'l\'assassinat de l\'archiduc François-Ferdinand à Sarajevo le 28 juin 1914, les buts de guerre (Angleterre, France, '
    + 'Allemagne), le plan Schlieffen, la bataille de la Marne, la guerre de mouvement (août–décembre 1914) puis des tranchées '
    + '(décembre 1914–1917). Le cours dit « Austro-Hungary » et situe l\'arrêt allemand « about 80 km from Paris ».',

  seances: [
    { numero: 1, partie: 'Part 1', titre: 'The causes of the war' },
    { numero: 2, partie: 'Part 2', titre: '1914: the war begins' },
  ],

  etapes: [
    // ═══ Séance 1 — the causes of the war ═══════════════════════════════════

    {
      id: 'ch01-mots',
      seance: 1,
      titre: 'Key words',
      sousTitre: 'Le vocabulaire du chapitre, en anglais',
      duree: 4,
      fiche: [
        {
          type: 'vocabulaire',
          titre: 'Key words',
          mots: [
            { en: 'colonial rush', fr: 'la course aux colonies' },
            { en: 'raw materials', fr: 'les matières premières' },
            { en: 'markets', fr: 'les marchés (pour vendre)' },
            { en: 'wealth', fr: 'la richesse' },
            { en: 'gap', fr: 'l\'écart' },
            { en: 'resentment', fr: 'la rancœur' },
            { en: 'mistrust', fr: 'la méfiance' },
            { en: 'armed peace', fr: 'la paix armée' },
            { en: 'bloc', fr: 'un bloc (d\'alliances)' },
            { en: 'weaponry', fr: 'l\'armement' },
            { en: 'Zeppelin, dirigible balloon', fr: 'le dirigeable' },
            { en: 'separatist movement', fr: 'un mouvement séparatiste' },
            { en: 'ethnic minority', fr: 'une minorité ethnique' },
            { en: 'heir', fr: 'l\'héritier' },
            { en: 'trigger', fr: 'l\'élément déclencheur' },
            { en: 'crime against humanity', fr: 'un crime contre l\'humanité' },
            { en: 'hegemony', fr: 'l\'hégémonie, la domination' },
            { en: 'revenge', fr: 'la revanche' },
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**heir** = l\'héritier (on prononce « air ») ; **revenge** = la revanche.',
            '**mistrust** = la méfiance ; **resentment** = la rancœur.',
          ],
        },
      ],
      items: [
        { id: 't-rush', type: 'terme', fr: 'la course aux colonies', attendu: 'colonial rush' },
        { id: 't-raw', type: 'terme', fr: 'les matières premières', attendu: 'raw materials', accepte: ['raw material'] },
        { id: 't-markets', type: 'terme', fr: 'les marchés (pour vendre)', attendu: 'markets', accepte: ['market'] },
        { id: 't-wealth', type: 'terme', fr: 'la richesse', attendu: 'wealth' },
        { id: 't-mistrust', type: 'terme', fr: 'la méfiance', attendu: 'mistrust', accepte: ['distrust'] },
        { id: 't-resentment', type: 'terme', fr: 'la rancœur', attendu: 'resentment' },
        {
          id: 't-armed-peace', type: 'terme', fr: 'la paix armée', attendu: 'armed peace',
          pieges: [{ si: 'peace armed', message: 'L\'adjectif se place avant le nom : armed peace.' }],
        },
        { id: 't-weaponry', type: 'terme', fr: 'l\'armement', attendu: 'weaponry', accepte: ['weapons', 'armament', 'armaments'] },
        { id: 't-zeppelin', type: 'terme', fr: 'le dirigeable', attendu: 'Zeppelin', accepte: ['Zeppelins', 'dirigible balloon', 'dirigible', 'airship'] },
        { id: 't-separatist', type: 'terme', fr: 'un mouvement séparatiste', attendu: 'separatist movement' },
        { id: 't-minority', type: 'terme', fr: 'une minorité ethnique', attendu: 'ethnic minority' },
        {
          id: 't-heir', type: 'terme', fr: 'l\'héritier', attendu: 'heir',
          pieges: [{ si: ['heritier', 'heritor'], message: 'En anglais : heir — on prononce « air ».' }],
        },
        { id: 't-trigger', type: 'terme', fr: 'l\'élément déclencheur', attendu: 'trigger' },
        { id: 't-crime', type: 'terme', fr: 'un crime contre l\'humanité', attendu: 'crime against humanity' },
        { id: 't-hegemony', type: 'terme', fr: 'l\'hégémonie', attendu: 'hegemony' },
        {
          id: 't-revenge', type: 'terme', fr: 'la revanche', attendu: 'revenge',
          pieges: [{ si: 'revanche', message: 'Revanche, c\'est le mot français. En anglais : revenge.' }],
        },
      ],
    },

    {
      id: 'ch01-imperialism',
      seance: 1,
      titre: '19th-century imperialism',
      sousTitre: 'I — Colonies, industry, rivalries',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: 'I – 19th-century imperialism',
          lignes: [
            '**Colonial rush** — factories need **raw materials**, production needs **markets** to sell to. In Europe: no more resources, a saturated market. → new colonies in **Asia and Africa**.',
            '**Industrial development** — since the 18th century: progress and **wealth**, but **unequal**. End of the 19th century: a huge **gap** between rich and poor areas.',
            '**Rivalries** — centuries of war → **resentment and mistrust**. The 19th-century wars → stronger **national identities**, **antagonism** between the great powers.',
          ],
        },
      ],
      items: [
        {
          id: 'imp-why', type: 'choix', consigne: BLOC, phrase: 'Why did industrialized countries launch a new colonial rush?',
          options: ['To get raw materials for their factories and markets for their products', 'To spread their religion', 'To find land for their farmers'],
          attendu: 'To get raw materials for their factories and markets for their products',
          explication: 'Factories needed raw materials, and production needed markets.',
        },
        {
          id: 'imp-where', type: 'choix', consigne: BLOC, phrase: 'Where did this new colonial rush take place?',
          options: ['In America', 'In Asia and Africa', 'In Oceania'], attendu: 'In Asia and Africa',
          explication: 'The new colonial rush took place in Asia and Africa.',
        },
        {
          id: 'imp-europe', type: 'choix', consigne: BLOC, phrase: 'Why did the European powers look for resources outside Europe?',
          options: ['Europe had no factories', 'Resources in Europe were exhausted and the market was saturated', 'Wars had destroyed Europe'],
          attendu: 'Resources in Europe were exhausted and the market was saturated',
          explication: 'European resources were exhausted, and the European market was saturated.',
        },
        {
          id: 'imp-equal', type: 'choix', consigne: 'Vrai ou faux ?', phrase: 'Industrial development was the same in every European country.',
          options: ['True', 'False'], attendu: 'False',
          explication: 'False: development was unequal, and the gap between richer and poorer areas grew.',
        },
        {
          id: 'imp-wealth', type: 'trou', consigne: 'Complète la phrase du cours :', phrase: 'Industrialization brought progress and ___ to many countries.',
          attendu: 'wealth', accepte: ['riches'],
        },
        {
          id: 'imp-relations', type: 'choix', consigne: BLOC, phrase: 'How were relations between European countries at the end of the 19th century?',
          options: ['Friendly and peaceful', 'Indifferent', 'Marked by resentment and mistrust'], attendu: 'Marked by resentment and mistrust',
          explication: 'After centuries of war: resentment and mistrust.',
        },
        {
          id: 'imp-wars', type: 'choix', consigne: BLOC, phrase: 'What did the wars of the 19th century reinforce?',
          options: ['National identities and the antagonism among great powers', 'Friendship between the empires', 'The power of the Church'],
          attendu: 'National identities and the antagonism among great powers',
          explication: 'They reinforced national identities and the antagonism among the major powers.',
        },
      ],
    },

    {
      id: 'ch01-armed-peace',
      seance: 1,
      titre: 'The armed peace',
      sousTitre: 'II — Two blocs, new weapons',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: 'II – Armed peace',
          lignes: [
            'End of the 19th century: everyone expects a war → the European powers form **alliances**.',
            'Two powerful blocs: the **Triple Alliance** — **Germany, Austria-Hungary and Italy** — and the **Triple Entente** — **England, France and Russia** (your course also calls it the Entente Cordiale).',
            'Industry made weapons more sophisticated: **automatic guns** became widespread, and **Zeppelins** (dirigible balloons) were used to observe enemy territory and, later, to bomb it.',
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Your course writes « Austro-Hungary » ; in English you can also say **Austria-Hungary**. Both are accepted here.',
            '**A**lliance : **G**ermany, **A**ustria-Hungary, **I**taly. **E**ntente : **E**ngland, **F**rance, **R**ussia.',
          ],
        },
      ],
      items: [
        {
          id: 'ap-alliance', type: 'choix', consigne: BLOC, phrase: 'Which countries formed the Triple Alliance?',
          options: ['England, France and Russia', 'Germany, Austria-Hungary and Italy', 'Germany, Russia and Italy'], attendu: 'Germany, Austria-Hungary and Italy',
          explication: 'Triple Alliance: Germany, Austria-Hungary and Italy.',
        },
        {
          id: 'ap-entente', type: 'choix', consigne: BLOC, phrase: 'Which countries formed the Triple Entente?',
          options: ['England, France and Russia', 'Germany, Austria-Hungary and Italy', 'France, Italy and Serbia'], attendu: 'England, France and Russia',
          explication: 'Triple Entente: England, France and Russia.',
        },
        {
          id: 'ap-italy', type: 'choix', consigne: 'Quel bloc ?', phrase: 'Italy (in 1914)',
          options: ['The Triple Alliance', 'The Triple Entente'], attendu: 'The Triple Alliance',
          explication: 'In your course, Italy is in the Triple Alliance, with Germany and Austria-Hungary.',
        },
        {
          id: 'ap-russia', type: 'choix', consigne: 'Quel bloc ?', phrase: 'Russia',
          options: ['The Triple Alliance', 'The Triple Entente'], attendu: 'The Triple Entente',
          explication: 'Russia is in the Triple Entente, with England and France.',
        },
        {
          id: 'ap-name', type: 'reponse', question: 'What is the name of the period before 1914, when the European powers prepared for war while still at peace?',
          attendu: 'armed peace',
          pieges: [{ si: 'peace armed', message: 'L\'adjectif se place avant le nom : armed peace.' }],
        },
        {
          id: 'ap-blocs', type: 'trou', consigne: 'Complète la phrase du cours :', phrase: 'Two powerful ___ were formed: the Triple Alliance and the Triple Entente.',
          attendu: 'blocs', accepte: ['blocks', 'alliances'],
        },
        {
          id: 'ap-guns', type: 'choix', consigne: BLOC, phrase: 'Which weapons became widespread thanks to industry?',
          options: ['Bows and arrows', 'Atomic bombs', 'Automatic guns'], attendu: 'Automatic guns',
          explication: 'Automatic guns became widespread.',
        },
        {
          id: 'ap-zeppelins', type: 'choix', consigne: BLOC, phrase: 'What were the Zeppelins used for?',
          options: ['To carry the mail', 'To observe enemy territory and, later, to bomb it', 'To carry soldiers across the sea'],
          attendu: 'To observe enemy territory and, later, to bomb it',
          explication: 'Zeppelins (dirigible balloons) observed enemy territory, then bombed it.',
        },
      ],
    },

    {
      id: 'ch01-nationalisms',
      seance: 1,
      titre: 'Nationalisms',
      sousTitre: 'III — Separatists, empires, and the trigger',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'III – Nationalisms',
          lignes: [
            '**Separatist movements** — nationalist ideas spread → the **ethnic minorities** of the big empires want **independence**, a state of their own. Their models: **Greece, Belgium, Serbia**, independent at the expense of great powers.',
            '**The traditional empires react** — afraid of losing more land → an offensive against the separatists. **Serbian nationalists**: severely repressed in **Austria-Hungary**. **Greeks and Armenians**: massacred in the **Ottoman Empire**.',
            'The Armenians: **1894–1896 → massacre**; **1915–1917 → genocide**, a **crime against humanity**.',
          ],
        },
        {
          type: 'regle',
          titre: 'The trigger of the war',
          lignes: [
            '**28 June 1914, Sarajevo**: assassination of the archduke **Franz Ferdinand** — the **heir** of the Austro-Hungarian Empire — and of his wife.',
            'A local event… which drags the main European powers into years of war: the **trigger**.',
          ],
        },
      ],
      items: [
        {
          id: 'nat-minorities', type: 'choix', consigne: BLOC, phrase: 'What did the ethnic minorities inside big empires ask for?',
          options: ['More colonies', 'Independence and their own states', 'A new emperor'], attendu: 'Independence and their own states',
          explication: 'They wanted independence and their own states.',
        },
        {
          id: 'nat-independent', type: 'choix', consigne: BLOC, phrase: 'Which countries had won their independence at the expense of great powers?',
          options: ['Greece, Belgium and Serbia', 'Germany, France and Italy', 'Russia, England and Spain'], attendu: 'Greece, Belgium and Serbia',
          explication: 'Greece, Belgium and Serbia — examples that inspired other minorities.',
        },
        {
          id: 'nat-empires', type: 'choix', consigne: BLOC, phrase: 'How did the traditional empires react?',
          options: ['They gave independence to every minority', 'They fought the separatist movements', 'They became republics'],
          attendu: 'They fought the separatist movements',
          explication: 'Afraid of losing more territory, they launched an offensive against the separatist movements.',
        },
        {
          id: 'nat-serbian', type: 'choix', consigne: BLOC, phrase: 'Which nationalists were severely repressed in Austria-Hungary?',
          options: ['Serbian nationalists', 'Greek nationalists', 'Irish nationalists'], attendu: 'Serbian nationalists',
          explication: 'Serbian nationalists were severely repressed in Austria-Hungary.',
        },
        {
          id: 'nat-ottoman', type: 'choix', consigne: BLOC, phrase: 'Which peoples were massacred in the Ottoman Empire?',
          options: ['Serbs and Belgians', 'Germans and Russians', 'Greeks and Armenians'], attendu: 'Greeks and Armenians',
          explication: 'Greeks and Armenians were massacred in the Ottoman Empire.',
        },
        {
          id: 'nat-genocide', type: 'reponse', question: '1915–1917: what crime was committed against the Armenians in the Ottoman Empire?',
          attendu: 'genocide', accepte: ['a genocide', 'the Armenian genocide', 'Armenian genocide'],
          explication: 'A genocide (1915–1917), a crime against humanity. The 1894–1896 events were a massacre.',
          pieges: [{ si: ['massacre', 'a massacre'], message: 'Le massacre, c\'est 1894–1896. Pour 1915–1917, le cours dit : genocide.' }],
        },
        {
          id: 'nat-date', type: 'reponse', question: 'On what date was the archduke Franz Ferdinand assassinated?',
          attendu: '28 June 1914',
          accepte: ['28th June 1914', 'June 28 1914', 'June 28th 1914', 'the 28th of June 1914', '28/06/1914', '28 juin 1914'],
          explication: 'On 28 June 1914, in Sarajevo.',
        },
        {
          id: 'nat-city', type: 'reponse', question: 'In which city was Franz Ferdinand assassinated?', attendu: 'Sarajevo',
          explication: 'In Sarajevo, in Bosnia (Austria-Hungary).',
        },
        {
          id: 'nat-who', type: 'choix', consigne: BLOC, phrase: 'Who was Franz Ferdinand?',
          options: ['The emperor of Germany', 'A Serbian nationalist', 'The heir of the Austro-Hungarian Empire'], attendu: 'The heir of the Austro-Hungarian Empire',
          explication: 'The archduke Franz Ferdinand was the heir of the Austro-Hungarian Empire.',
        },
        {
          id: 'nat-trigger', type: 'choix', consigne: BLOC, phrase: 'Why is this assassination called the trigger of the war?',
          options: ['It was the first battle of the war', 'It pushed the main European powers into a long conflict', 'It ended the war'],
          attendu: 'It pushed the main European powers into a long conflict',
          explication: 'A local event, but it pushed the main European powers into a war that lasted several years.',
        },
      ],
    },

    {
      id: 'ch01-aims',
      seance: 1,
      titre: 'War aims',
      sousTitre: 'Conclusion — what each power wanted',
      duree: 2,
      fiche: [
        {
          type: 'regle',
          titre: 'What each power wanted',
          lignes: [
            '**England**: stop German development, a threat to British economic world **hegemony**.',
            '**France**: **revenge** against Germany, and recover the territories lost in **1870** (Alsace-Lorraine — the name is not in your course).',
            '**Germany**: more **colonies**, and a political power matching its economic position.',
          ],
        },
      ],
      items: [
        {
          id: 'aim-england', type: 'choix', consigne: BLOC, phrase: 'What did England want?',
          options: ['To stop German development, a threat to its economic hegemony', 'To recover the territories lost in 1870', 'More colonies and more political power'],
          attendu: 'To stop German development, a threat to its economic hegemony',
          explication: 'England wanted to stop German development, which threatened British economic world hegemony.',
        },
        {
          id: 'aim-france', type: 'choix', consigne: BLOC, phrase: 'What did France want?',
          options: ['More colonies and more political power', 'Revenge, and to recover the territories lost in 1870', 'To stop British hegemony'],
          attendu: 'Revenge, and to recover the territories lost in 1870',
          explication: 'France wanted revenge against Germany and its territories lost in 1870.',
        },
        {
          id: 'aim-germany', type: 'choix', consigne: BLOC, phrase: 'What did Germany want?',
          options: ['Revenge against France', 'To stop German development', 'More colonies, and a political power matching its economy'],
          attendu: 'More colonies, and a political power matching its economy',
          explication: 'Germany wanted more colonies and a political power compatible with its economic position.',
        },
        {
          id: 'aim-1870', type: 'reponse', question: 'In which year did France lose territories to Germany?', attendu: '1870',
          accepte: ['1871', 'in 1870'], explication: 'In 1870, after the war against Prussia (the peace treaty was signed in 1871).',
        },
      ],
    },

    {
      id: 'ch01-ecrire-causes',
      seance: 1,
      titre: 'Writing: the causes',
      sousTitre: 'Écrire en anglais, comme au contrôle',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'A paragraph in four steps',
          lignes: [
            '**First**, the colonial rush: the powers needed raw materials and markets, in Asia and Africa — and rivalries grew.',
            '**Then**, the armed peace: two blocs, the Triple Alliance and the Triple Entente, and more and more weapons.',
            '**Moreover**, nationalisms: minorities wanted their own states, and the empires repressed them.',
            '**Finally**, the trigger: on 28 June 1914, Franz Ferdinand was assassinated in Sarajevo.',
            'Useful words: *first, then, moreover, finally, because, so, as a result.*',
          ],
        },
      ],
      items: [
        {
          id: 'w-causes', type: 'decrire', sujet: 'The causes of the Great War', emoji: '📝',
          indices: ['colonial rush', 'rivalries', 'armed peace', 'two blocs', 'nationalisms', '28 June 1914'],
          consigne: 'En anglais, écris un paragraphe de cinq ou six phrases qui explique les causes de la Grande Guerre.',
          titreModele: 'An example',
          modele: 'The Great War had several causes. First, the European powers competed for colonies in Asia and Africa, because their factories needed raw materials and markets; their relations were marked by resentment and mistrust. Then, during the armed peace, two blocs were formed: the Triple Alliance (Germany, Austria-Hungary and Italy) and the Triple Entente (England, France and Russia), and they built more and more weapons. Moreover, nationalisms grew: minorities wanted their own states, and empires such as Austria-Hungary repressed them. Finally, on 28 June 1914, the archduke Franz Ferdinand, heir of Austria-Hungary, was assassinated in Sarajevo: this event triggered the war.',
          criteres: [
            { id: 'colonies', texte: 'La course aux colonies et les rivalités : raw materials, markets, resentment' },
            { id: 'blocs', texte: 'La paix armée et les deux blocs, avec leurs membres' },
            { id: 'nationalismes', texte: 'Les nationalismes : des minorités veulent leur État, les empires les répriment' },
            { id: 'declencheur', texte: 'Le déclencheur : l\'assassinat de Franz Ferdinand à Sarajevo, le 28 juin 1914' },
          ],
        },
      ],
    },

    // ═══ Séance 2 — 1914: the war begins ════════════════════════════════════

    {
      id: 'ch01-movement',
      seance: 2,
      titre: 'The war of movement',
      sousTitre: 'August–December 1914: the Schlieffen Plan and the Marne',
      duree: 5,
      fiche: [
        {
          type: 'regle',
          titre: 'A war everyone thought would be short',
          lignes: [
            'In 1914, most politicians and analysts expect **a few months** of war: weapons are so destructive that it must end fast. **Wrong.**',
          ],
        },
        {
          type: 'regle',
          titre: '1. War of movement (August–December 1914)',
          lignes: [
            'Germany is **sandwiched between France and Russia** → the danger of two fronts.',
            'The **Schlieffen Plan**: defeat **France quickly**, then focus on the **eastern front** (Russia).',
            'A fierce German advance: across French territory in **one month**. Stopped at the **Battle of the Marne**, about **80 km from Paris** (as your course says).',
          ],
        },
        {
          type: 'regle',
          titre: '2. Trench warfare (December 1914–1917)',
          lignes: [
            'From **December 1914**, the war of movement was over: **trench warfare** began, until 1917.',
          ],
        },
        {
          type: 'vocabulaire',
          titre: 'Key words',
          mots: [
            { en: 'war of movement', fr: 'la guerre de mouvement' },
            { en: 'trench warfare', fr: 'la guerre des tranchées' },
            { en: 'front', fr: 'le front' },
            { en: 'sandwiched between', fr: 'pris en étau entre' },
          ],
        },
      ],
      items: [
        {
          id: 'mov-short', type: 'choix', consigne: BLOC, phrase: 'How long did most politicians think the war would last?',
          options: ['A few months', 'Four years', 'Ten years'], attendu: 'A few months',
          explication: 'They believed it would last a few months — they were wrong.',
        },
        {
          id: 'mov-wrong', type: 'choix', consigne: 'Vrai ou faux ?', phrase: 'The war was as short as the politicians expected.',
          options: ['True', 'False'], attendu: 'False', explication: 'False: it lasted from 1914 to 1918.',
        },
        {
          id: 'mov-position', type: 'choix', consigne: BLOC, phrase: 'Why was Germany\'s position uncomfortable?',
          options: ['It had no army', 'It was sandwiched between France and Russia', 'It was an island'], attendu: 'It was sandwiched between France and Russia',
          explication: 'Between France and Russia, Germany risked fighting on two fronts.',
        },
        {
          id: 'mov-plan', type: 'reponse', question: 'What was the name of the German plan?', attendu: 'Schlieffen Plan',
          accepte: ['the Schlieffen Plan', 'Schlieffen'],
          pieges: [{ si: ['plan Schlieffen', 'le plan Schlieffen'], resultat: 'presque', message: 'En anglais, le nom passe avant : the Schlieffen Plan.' }],
        },
        {
          id: 'mov-plan-what', type: 'choix', consigne: BLOC, phrase: 'What did the Schlieffen Plan consist in?',
          options: ['Attacking Russia first, then France', 'Defeating France quickly, then focusing on the eastern front', 'Defending the German borders only'],
          attendu: 'Defeating France quickly, then focusing on the eastern front',
          explication: 'Defeat France quickly, then turn to the eastern front against Russia.',
        },
        {
          id: 'mov-marne', type: 'choix', consigne: BLOC, phrase: 'Where were the Germans stopped in 1914?',
          options: ['At the Battle of the Marne', 'At the Battle of Verdun', 'At the Battle of the Somme'], attendu: 'At the Battle of the Marne',
          explication: 'At the Battle of the Marne, near Paris.',
        },
        {
          id: 'mov-km', type: 'reponse', question: 'According to your course, about how many kilometres from Paris were the Germans stopped?', attendu: '80',
          accepte: ['80 km', 'about 80 km', '80 kilometres', '80 kilometers'],
          explication: 'About 80 km from Paris, according to your course.',
        },
        {
          id: 'mov-month', type: 'choix', consigne: BLOC, phrase: 'How long did it take the Germans to march through French territory?',
          options: ['One week', 'One month', 'One year'], attendu: 'One month', explication: 'In one month, they marched through French territory.',
        },
        {
          id: 'mov-dates', type: 'choix', consigne: BLOC, phrase: 'When was the war of movement?',
          options: ['From August to December 1914', 'From 1914 to 1918', 'From December 1914 to 1917'], attendu: 'From August to December 1914',
          explication: 'War of movement: August–December 1914. Then trench warfare: December 1914–1917.',
        },
        { id: 't-movement', type: 'terme', fr: 'la guerre de mouvement', attendu: 'war of movement' },
        { id: 't-trench', type: 'terme', fr: 'la guerre des tranchées', attendu: 'trench warfare', accepte: ['trench war'] },
        { id: 't-front', type: 'terme', fr: 'pris en étau entre (deux pays)', attendu: 'sandwiched between', accepte: ['sandwiched'] },
      ],
    },

    {
      id: 'ch01-chronology',
      seance: 2,
      titre: 'Chronology',
      sousTitre: 'Les dates du chapitre, dans l\'ordre',
      duree: 3,
      fiche: [
        {
          type: 'vocabulaire',
          titre: 'Key dates',
          mots: [
            { en: '1870', fr: 'la France perd des territoires face à l\'Allemagne' },
            { en: '1894–1896', fr: 'massacres des Arméniens dans l\'Empire ottoman' },
            { en: '28 June 1914', fr: 'assassinat de François-Ferdinand à Sarajevo' },
            { en: '1914–1918', fr: 'la Grande Guerre' },
            { en: 'August–December 1914', fr: 'la guerre de mouvement' },
            { en: 'December 1914–1917', fr: 'la guerre des tranchées' },
            { en: '1915–1917', fr: 'génocide des Arméniens' },
          ],
        },
      ],
      items: [
        {
          id: 'chr-ordre', type: 'chrono', consigne: ORDRE,
          evenements: [
            { texte: 'France loses territories to Germany', date: '1870' },
            { texte: 'Massacres of Armenians in the Ottoman Empire', date: '1894–1896' },
            { texte: 'Franz Ferdinand is assassinated in Sarajevo', date: '28 June 1914' },
            { texte: 'The Battle of the Marne stops the Germans', date: '1914, war of movement' },
            { texte: 'Trench warfare begins', date: 'December 1914' },
          ],
        },
        {
          id: 'chr-war', type: 'reponse', question: 'What are the dates of the Great War?', attendu: '1914–1918',
          accepte: ['1914 1918', 'from 1914 to 1918', '1914 to 1918'], explication: 'The Great War: 1914–1918.',
        },
        {
          id: 'chr-massacre', type: 'choix', consigne: 'Complète :', phrase: '1894–1896: ___ of Armenians in the Ottoman Empire.',
          options: ['massacre', 'genocide'], attendu: 'massacre', explication: '1894–1896: massacre. 1915–1917: genocide.',
        },
        {
          id: 'chr-genocide', type: 'choix', consigne: 'Complète :', phrase: '1915–1917: ___ of the Armenians.',
          options: ['massacre', 'genocide'], attendu: 'genocide', explication: '1915–1917: genocide, a crime against humanity.',
        },
        {
          id: 'chr-trenches', type: 'reponse', question: 'In which month and year did trench warfare begin?', attendu: 'December 1914',
          accepte: ['Dec 1914', 'in December 1914', 'décembre 1914'], explication: 'December 1914.',
        },
      ],
    },

    {
      id: 'ch01-ecrire-1914',
      seance: 2,
      titre: 'Writing: the Schlieffen Plan',
      sousTitre: 'Écrire en anglais, comme au contrôle',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Explain a plan and its failure',
          lignes: [
            '**The situation**: Germany was sandwiched between France and Russia.',
            '**The plan**: the Schlieffen Plan — defeat France quickly, then turn to the eastern front.',
            '**What happened**: the Germans marched through France in one month, but were stopped at the Battle of the Marne.',
            '**The consequence**: the war of movement ended; trench warfare began in December 1914.',
          ],
        },
      ],
      items: [
        {
          id: 'w-schlieffen', type: 'decrire', sujet: 'The Schlieffen Plan and its failure', emoji: '🗺️',
          indices: ['sandwiched', 'defeat France quickly', 'eastern front', 'Battle of the Marne', 'trench warfare'],
          consigne: 'En anglais, explique en quatre ou cinq phrases ce qu\'était le plan Schlieffen, et comment il a échoué en 1914.',
          titreModele: 'An example',
          modele: 'In 1914, Germany was sandwiched between France and Russia, so it risked fighting on two fronts. The Schlieffen Plan consisted in defeating France very quickly, and then focusing on the eastern front against Russia. The German army advanced fiercely and marched through French territory in one month. But it was stopped at the Battle of the Marne, about 80 km from Paris. The war of movement was over, and in December 1914 trench warfare began.',
          criteres: [
            { id: 'situation', texte: 'La situation : l\'Allemagne prise en étau entre la France et la Russie' },
            { id: 'plan', texte: 'Le plan : battre vite la France, puis se tourner vers le front de l\'Est' },
            { id: 'marne', texte: 'L\'échec : les Allemands arrêtés à la bataille de la Marne' },
            { id: 'tranchees', texte: 'La suite : fin de la guerre de mouvement, début de la guerre des tranchées (décembre 1914)' },
          ],
        },
      ],
    },
  ],

  // ── Le contrôle blanc ───────────────────────────────────────────────────
  interro: {
    duree: 8,
    tirage: [
      { etape: 'ch01-mots', nombre: 3 },
      { etape: 'ch01-imperialism', nombre: 2 },
      { etape: 'ch01-armed-peace', nombre: 2 },
      { etape: 'ch01-nationalisms', nombre: 3 },
      { etape: 'ch01-aims', nombre: 1 },
      { etape: 'ch01-movement', nombre: 3 },
      { etape: 'ch01-chronology', nombre: 1 },
    ],
  },
};
