// Chapter 2 — « The Late Middle Ages » : Late Medieval England (13th–15th
// century), puis The Hundred Years' War (14th–15th century).
//
// D'après les deux diaporamas du cours d'Antonin en section internationale
// (histoire en anglais) et la liste du devoir sur table : Edward I's reign,
// Peasants' revolts, Beginning of the conflict, Charles VII's reign. Le
// diaporama de la guerre de Cent Ans, comme le cahier d'Antonin, s'arrête au
// premier point de la partie sur Charles VII (« Charles, the Dauphin ») : la
// séance 4 s'arrête là aussi.
//
// Là où le cours s'écarte des manuels, l'appli suit le cours, puisque c'est lui
// qui est évalué — en disant « according to your course » quand l'écart porte
// sur un fait. Le profil de Merlin le dit aussi, sinon il corrigerait Antonin
// contre son propre cours :
//   - Richard II crée la poll tax en 1377 (la première est votée au début de
//     1377, encore sous Edward III) ;
//   - Edward III est battu à Cassel en 1328 (à Cassel, Philippe VI battait les
//     Flamands révoltés) ;
//   - Philippe VI réclame la Normandie et la Bretagne (l'Angleterre avait
//     perdu la Normandie en 1204) ;
//   - les Anglais « reconquièrent » la Normandie en 1346 (l'année de Crécy) ;
//   - « John I » pour Jean sans Terre, et « Phillip » avec deux l : les deux
//     orthographes sont acceptées ;
//   - Henry V meurt « sans fils » en 1422 (son fils Henri VI, né en 1421, est
//     proclamé roi de France par les Anglais) : la fiche le dit « your course
//     says », et aucune question ne le demande.
//
// Les questions sont en anglais, comme le devoir ; les explications de
// correction aussi, sauf quand il s'agit d'orthographe.
//
// Les identifiants ne se renumérotent jamais : la progression y est rangée.

const BLOC = 'Choisis la bonne réponse :';
const ORDRE = 'Remets ces événements dans l\'ordre chronologique :';

export default {
  id: 'ch02',
  numero: 2,
  titre: 'The Late Middle Ages',
  detail: 'Edward I · The Peasants\' Revolt · The Hundred Years\' War',

  // Ce que Merlin sait du chapitre quand il corrige un écrit.
  profilMerlin: 'Élève de 5e en section internationale : il suit l\'histoire en anglais. Chapitre en cours : « The Late Middle Ages ». '
    + 'Late Medieval England (13th–15th century) : la dynastie Plantagenêt se renforce avec Edward I (roi de 1272 à 1307), après '
    + 'les règnes désastreux de son grand-père John I (1199–1216) et de son père Henry III (1216–1272). Il fait travailler avec lui '
    + 'le Council of Lords ; le Parlement (d\'abord appelé Great Council) réunit les grands barons, et à partir de 1275 deux '
    + 'représentants de chaque comté et de chaque ville. Avec l\'appui des barons, il impose sa volonté au pape, qui voulait que '
    + 'le clergé ne paie pas d\'impôts ; il impose lourdement les Juifs, autorisés à prêter avec intérêt. Il reconquiert l\'Écosse '
    + 'en 1296 : grande révolte menée par le chevalier William Wallace, puis résistance des barons écossais ; il meurt en 1307 sans '
    + 'l\'avoir reconquise et l\'Écosse garde son indépendance (Robert the Bruce, roi d\'Écosse de 1306 à 1329). Peasants\' Revolt : '
    + 'pour payer la guerre contre la France, Richard II (couronné en 1377 à 10 ans) crée la Poll Tax en 1377 ; mécontentement '
    + 'contre le conseiller du roi et la servitude ; les paysans refusent de payer et sont durement réprimés ; en 1381, environ '
    + '50 000 rebelles marchent sur Londres pour voir le roi, qui refuse ; ils forcent les portes de la ville, le roi se réfugie '
    + 'dans la Tour de Londres ; il promet d\'accepter leurs demandes, mais Wat Tyler, un de leurs chefs, est exécuté ; la foule '
    + 'se disperse, la poll tax est abolie, les autres promesses ne sont pas tenues. Conclusion : le roi partage un peu de pouvoir '
    + 'avec les barons, les paysans demandent la fin des structures féodales, le pays de Galles est rattaché pour de bon aux '
    + 'domaines anglais, l\'autonomie de l\'Écosse est reconnue. The Hundred Years\' War (1337–1453) : une suite de conflits '
    + 'coupés de trêves, pour le trône de France. 1328 : Charles IV meurt sans héritier mâle ; une assemblée de nobles choisit '
    + 'entre Philippe de Valois, son cousin, et Edward III, roi d\'Angleterre, son neveu (par sa mère Isabelle) ; elle choisit '
    + 'Philippe, couronné Philippe VI. Edward proteste ; Philippe VI exige l\'hommage de son vassal et la restitution de la '
    + 'Normandie et de la Bretagne : l\'Angleterre ne garderait que la Gascogne ; Edward, humilié, décide de se battre. 1337–1356 : '
    + 'victoires anglaises, la Normandie en 1346, le roi Jean II capturé à Poitiers en 1356 ; trêve de 1360 (la paix de Brétigny, '
    + 'sur la carte du cours) : l\'Angleterre récupère ses domaines, Edward III renonce au trône de France. Charles VII\'s reign (1422–1461) : en 1422, Charles VI meurt ; la couronne devait aller à '
    + 'son gendre Henry V, roi d\'Angleterre, mais Henry V était mort six semaines avant ; le pouvoir passe au fils de Charles VI, '
    + 'Charles, qui ne peut pas encore être couronné : on l\'appelle le Dauphin (les rois sont sacrés à Reims). Écarts du cours avec '
    + 'les manuels, à compter justes : c\'est Richard II qui crée la poll tax en 1377 ; Edward est battu à la bataille de Cassel '
    + 'en 1328 ; Philippe VI réclame la Normandie et la Bretagne ; les Anglais reconquièrent la Normandie en 1346 ; le cours écrit '
    + '« John I » et « Phillip » ; Henry V meurt « sans fils » (en réalité, il laisse Henri VI). Un fait juste absent du cours (Crécy en 1346, par exemple) n\'est jamais faux.',

  seances: [
    { numero: 1, partie: 'Late Medieval England', titre: 'Edward I\'s reign' },
    { numero: 2, partie: 'Late Medieval England', titre: 'The Peasants\' Revolt' },
    { numero: 3, partie: 'The Hundred Years\' War', titre: 'The beginning of the conflict' },
    { numero: 4, partie: 'The Hundred Years\' War', titre: 'Charles VII\'s reign' },
  ],

  etapes: [
    // ═══ Séance 1 — Edward I's reign ════════════════════════════════════════

    {
      id: 'ch02-mots-england',
      seance: 1,
      titre: 'Key words',
      sousTitre: 'Le vocabulaire d\'Edward I, en anglais',
      duree: 3,
      fiche: [
        {
          type: 'vocabulaire',
          titre: 'Key words',
          mots: [
            { en: 'dynasty', fr: 'une dynastie (une famille de rois)' },
            { en: 'reign', fr: 'le règne' },
            { en: 'throne', fr: 'le trône' },
            { en: 'baron', fr: 'un baron (un grand seigneur)' },
            { en: 'Parliament', fr: 'le Parlement' },
            { en: 'county', fr: 'un comté' },
            { en: 'representative', fr: 'un représentant' },
            { en: 'the Pope', fr: 'le pape' },
            { en: 'clergy', fr: 'le clergé' },
            { en: 'taxes', fr: 'les impôts' },
            { en: 'loan', fr: 'un prêt (d\'argent)' },
            { en: 'interest', fr: 'les intérêts (d\'un prêt)' },
            { en: 'knight', fr: 'un chevalier' },
            { en: 'independence', fr: 'l\'indépendance' },
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**reign** = le règne (on prononce « rain ») ; **knight** = le chevalier (le k ne se prononce pas).',
            '**county** = le comté ; **count** = le comte, une personne.',
          ],
        },
      ],
      items: [
        {
          id: 't-dynasty', type: 'terme', fr: 'une dynastie', attendu: 'dynasty',
          pieges: [{ si: 'dynastie', resultat: 'presque', message: 'Dynastie, c\'est le français. En anglais : dynasty.' }],
        },
        {
          id: 't-reign', type: 'terme', fr: 'le règne', attendu: 'reign',
          pieges: [{ si: 'regne', message: 'Règne, c\'est le français. En anglais : reign (on prononce « rain »).' }],
        },
        { id: 't-throne', type: 'terme', fr: 'le trône', attendu: 'throne' },
        {
          id: 't-parliament', type: 'terme', fr: 'le Parlement', attendu: 'Parliament',
          pieges: [{ si: 'parlement', resultat: 'presque', message: 'En anglais, Parliament s\'écrit avec « ia ».' }],
        },
        {
          id: 't-county', type: 'terme', fr: 'un comté', attendu: 'county', accepte: ['shire'],
          pieges: [{ si: 'count', message: 'A count, c\'est un comte : une personne. Le comté, c\'est county.' }],
        },
        {
          id: 't-pope', type: 'terme', fr: 'le pape', attendu: 'Pope',
          pieges: [{ si: 'pape', message: 'Pape, c\'est le français. En anglais : the Pope.' }],
        },
        { id: 't-clergy', type: 'terme', fr: 'le clergé', attendu: 'clergy' },
        { id: 't-taxes', type: 'terme', fr: 'les impôts', attendu: 'taxes', accepte: ['tax'] },
        { id: 't-loan', type: 'terme', fr: 'un prêt (d\'argent)', attendu: 'loan', accepte: ['loans'] },
        {
          id: 't-knight', type: 'terme', fr: 'un chevalier', attendu: 'knight', accepte: ['knights'],
          pieges: [
            { si: 'night', resultat: 'presque', message: 'Knight prend un k muet ; night, c\'est la nuit.' },
            { si: 'chevalier', message: 'En anglais : knight (le k ne se prononce pas).' },
          ],
        },
      ],
    },

    {
      id: 'ch02-edward',
      seance: 1,
      titre: 'Edward I, the barons and the Church',
      sousTitre: 'I — Dealing with old opponents (1 and 2)',
      duree: 5,
      fiche: [
        {
          type: 'regle',
          titre: 'Introduction — England, 13th–15th century',
          lignes: [
            'Three big changes: the **Plantagenet** dynasty grows stronger; **peasant revolts** bring tension to the countryside; **new wars** break out.',
            'The key figure: **Edward I** (king **1272–1307**). Before him, two disastrous reigns: his grandfather **John I** (1199–1216) and his father **Henry III** (1216–1272).',
          ],
        },
        {
          type: 'regle',
          titre: '1. The barons and the Parliament',
          lignes: [
            'The kings before Edward: **constant conflicts** with the English **barons**.',
            'Edward I gets the **Council of Lords** on his side: the nobles **advise the King** and take part in the most important **decisions**.',
            '**Parliament** (first called **the Great Council**) gathers the main barons. **From 1275**, each **county** and each **town or city** also sends **two representatives**.',
          ],
        },
        {
          type: 'regle',
          titre: '2. The Church',
          lignes: [
            'The **Pope** said that the **clergy** did not have to pay **taxes**. With the help of the **barons**, Edward I **imposed his will**.',
            'The King also put **high taxes on the Jews**, who had the right to lend money with **interest**.',
          ],
        },
        {
          type: 'regle',
          titre: 'A document: two coins of Edward I',
          lignes: [
            'Front, in Latin with shortened words: Edward, **by the grace of God, King of England**.',
            'Back: a cross, **Duke of Aquitaine** and **Lord of Ireland**, and **made in London**.',
          ],
        },
      ],
      items: [
        {
          id: 'ed-dynasty', type: 'choix', consigne: BLOC, phrase: 'Which dynasty did Edward I make stronger?',
          options: ['The Plantagenets', 'The Valois', 'The Normans'], attendu: 'The Plantagenets',
          explication: 'Edward I is the key figure of the Plantagenet dynasty.',
        },
        {
          id: 'ed-father', type: 'choix', consigne: BLOC, phrase: 'Who was Edward I\'s father?',
          options: ['Henry III', 'John I', 'Richard II'], attendu: 'Henry III',
          explication: 'His father was Henry III (1216–1272); his grandfather was John I (1199–1216).',
        },
        {
          id: 'ed-grandfather', type: 'reponse', question: 'Edward I\'s grandfather was King of England from 1199 to 1216. What was his name?',
          attendu: 'John I', accepte: ['John', 'King John', 'King John I', 'John Lackland', 'John I Lackland', 'John the First'],
          explication: 'John I (1199–1216) — often just called King John.',
          pieges: [
            { si: ['Henry III', 'Henry'], message: 'Henry III, c\'est son père (1216–1272). Le grand-père : John I (1199–1216).' },
            { si: ['Jean sans Terre', 'Jean'], resultat: 'presque', message: 'En anglais : John I (King John).' },
          ],
        },
        {
          id: 'ed-reigns', type: 'choix', consigne: BLOC, phrase: 'How does your course describe the reigns of John I and Henry III?',
          options: ['Disastrous', 'Peaceful and rich', 'Very short'], attendu: 'Disastrous',
          explication: 'Disastrous reigns — then Edward I made the dynasty stronger.',
        },
        {
          id: 'ed-barons', type: 'choix', consigne: BLOC, phrase: 'According to your course, who were the kings before Edward I always in conflict with?',
          options: ['The English barons', 'The peasants', 'The merchants'], attendu: 'The English barons',
          explication: 'Constant conflicts with the English barons.',
        },
        {
          id: 'ed-council', type: 'choix', consigne: BLOC, phrase: 'What did Edward I do to avoid conflicts with the barons?',
          options: ['He got the Council of Lords on his side', 'He put the barons in prison', 'He gave all his power to the barons'],
          attendu: 'He got the Council of Lords on his side',
          explication: 'The nobles advised the King and took part in the most important decisions.',
        },
        {
          id: 'ed-great-council', type: 'reponse', question: 'What was the Parliament called at first?',
          attendu: 'Great Council', accepte: ['the Great Council'],
          pieges: [{ si: 'Grand Council', resultat: 'presque', message: 'En anglais, ton cours dit : the Great Council.' }],
          explication: 'The Parliament was first called the Great Council.',
        },
        {
          id: 'ed-1275', type: 'trou', consigne: 'Complète :', phrase: 'From 1275, each ___ and each town or city also sent two representatives.',
          attendu: 'county', accepte: ['shire'],
          pieges: [{ si: 'count', message: 'A count, c\'est un comte. Le comté : county.' }],
        },
        {
          id: 'ed-1275-year', type: 'reponse', question: 'From which year did the King invite representatives of the counties and towns?',
          attendu: '1275', accepte: ['in 1275', 'from 1275', 'since 1275'],
          explication: 'From 1275.',
        },
        {
          id: 'ed-pope', type: 'choix', consigne: BLOC, phrase: 'What did the Pope say?',
          options: ['The clergy did not have to pay taxes', 'The King had to obey the barons', 'Scotland belonged to the Church'],
          attendu: 'The clergy did not have to pay taxes',
          explication: 'The Pope said that the clergy did not have to pay taxes.',
        },
        {
          id: 'ed-pope-won', type: 'choix', consigne: BLOC, phrase: 'Who won this conflict about the clergy\'s taxes?',
          options: ['Edward I, with the help of the barons', 'The Pope', 'The clergy, with the help of the peasants'],
          attendu: 'Edward I, with the help of the barons',
          explication: 'The barons supported Edward I, and he got his way against the Pope.',
        },
        {
          id: 'ed-jews', type: 'choix', consigne: BLOC, phrase: 'According to your course, who had to pay high taxes to Edward I?',
          options: ['The Jews, who could lend money with interest', 'The Scottish knights', 'Only the barons'],
          attendu: 'The Jews, who could lend money with interest',
          explication: 'The King put high taxes on the Jews, who had the right to lend money with interest.',
        },
        {
          id: 'ed-coins', type: 'choix', consigne: 'D\'après le document (les pièces de monnaie) :', phrase: 'Which titles does Edward I have on his coins?',
          options: ['King of England, Duke of Aquitaine and Lord of Ireland', 'King of England and King of France', 'King of England and King of Scotland'],
          attendu: 'King of England, Duke of Aquitaine and Lord of Ireland',
          explication: 'King of England on the front; Duke of Aquitaine and Lord of Ireland on the back.',
        },
      ],
    },

    {
      id: 'ch02-scotland',
      seance: 1,
      titre: 'The Scottish war of independence',
      sousTitre: 'I — Dealing with old opponents (3)',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: '3. The Scottish war of independence',
          lignes: [
            '**1296**: Edward I **reconquers Scotland**. Its long time of relative **autonomy** is over → huge **dissatisfaction** with English rule.',
            'A major **revolt**, led by a **knight**: **William Wallace**.',
            'Wallace is defeated → the **Scottish barons** lead the resistance; several say they are the rightful **heir to the throne**.',
            '**1307**: Edward I **dies** before reconquering it → Scotland **keeps its independence**. **Robert the Bruce**: King of Scotland, **1306–1329**.',
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Ne pas confondre : **William Wallace**, le chevalier qui mène la révolte ; **Robert the Bruce**, le roi d\'Écosse (1306–1329).',
          ],
        },
      ],
      items: [
        {
          id: 'sc-1296', type: 'reponse', question: 'In which year did Edward I reconquer Scotland?',
          attendu: '1296', accepte: ['in 1296'],
          explication: 'In 1296.',
        },
        {
          id: 'sc-react', type: 'choix', consigne: BLOC, phrase: 'How did the Scots react to English rule?',
          options: ['They were very dissatisfied, and a major revolt broke out', 'They were happy to have an English king', 'They asked the Pope to choose their king'],
          attendu: 'They were very dissatisfied, and a major revolt broke out',
          explication: 'Their long time of autonomy was over: huge dissatisfaction, then a major revolt.',
        },
        {
          id: 'sc-wallace', type: 'reponse', question: 'Which knight led the major Scottish revolt against Edward I?',
          attendu: 'William Wallace', accepte: ['Wallace', 'Sir William Wallace'],
          explication: 'William Wallace, a knight.',
          pieges: [
            { si: ['Robert the Bruce', 'Robert Bruce', 'Bruce'], message: 'Robert the Bruce, c\'est le roi d\'Écosse (1306–1329). Le chevalier de la révolte : William Wallace.' },
            { si: ['Wat Tyler', 'Tyler'], message: 'Wat Tyler, c\'est le chef des paysans, en 1381. En Écosse : William Wallace.' },
          ],
        },
        {
          id: 'sc-after', type: 'choix', consigne: BLOC, phrase: 'After William Wallace\'s defeat, who led the resistance?',
          options: ['The Scottish barons', 'The Pope', 'The English Parliament'], attendu: 'The Scottish barons',
          explication: 'The Scottish barons — and several of them wanted the throne for themselves.',
        },
        {
          id: 'sc-1307', type: 'reponse', question: 'In which year did Edward I die?',
          attendu: '1307', accepte: ['in 1307'],
          explication: 'In 1307 — Scotland was still not reconquered.',
        },
        {
          id: 'sc-why', type: 'choix', consigne: BLOC, phrase: 'Why could Scotland keep its independence?',
          options: ['Edward I died in 1307, and the reconquest was never finished', 'The Scots paid Edward I to leave', 'Edward I gave Scotland back to the Scots'],
          attendu: 'Edward I died in 1307, and the reconquest was never finished',
          explication: 'Edward I died in 1307 without having reconquered Scotland.',
        },
        {
          id: 'sc-bruce', type: 'choix', consigne: BLOC, phrase: 'Who was Robert the Bruce?',
          options: ['The King of Scotland from 1306 to 1329', 'The knight who led the major revolt against Edward I', 'An English baron'],
          attendu: 'The King of Scotland from 1306 to 1329',
          explication: 'Robert the Bruce was King of Scotland (1306–1329). The knight of the revolt was William Wallace.',
        },
      ],
    },

    {
      id: 'ch02-ecrire-edward',
      seance: 1,
      titre: 'Writing: Edward I',
      sousTitre: 'Écrire en anglais, comme au contrôle',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: 'Three opponents, three sentences',
          lignes: [
            '**The barons**: Edward I got the Council of Lords to work with him; the Parliament gathered the barons.',
            '**The Church**: with the barons, he imposed his will on the Pope — the clergy had to pay taxes.',
            '**Scotland**: reconquered in 1296; William Wallace\'s revolt; independent again after Edward\'s death in 1307.',
            'Useful words: *first, then, finally, because, so, but.*',
          ],
        },
      ],
      items: [
        {
          id: 'w-edward', type: 'decrire', sujet: 'How did Edward I deal with his old opponents?', emoji: '👑',
          indices: ['the barons', 'Parliament', 'the Pope', 'taxes', 'Scotland', '1296', 'William Wallace'],
          consigne: 'En anglais, écris trois ou quatre phrases : comment Edward Ier a-t-il réglé ses conflits avec les barons, l\'Église et l\'Écosse ?',
          titreModele: 'An example',
          modele: 'Edward I made the Plantagenet dynasty stronger. First, he convinced the Council of Lords to work with him: these nobles advised him. The Parliament gathered the main barons, and from 1275 representatives of the counties and towns were invited too. Then, with the barons\' help, he imposed his will on the Pope, who said that the clergy did not have to pay taxes. Finally, he reconquered Scotland in 1296, but William Wallace led a major revolt, and Scotland kept its independence after Edward\'s death in 1307.',
          criteres: [
            { id: 'barons', texte: 'Les barons : il les fait travailler avec lui (le Conseil des lords, le Parlement)' },
            { id: 'eglise', texte: 'L\'Église : avec les barons, il impose sa volonté au pape, qui ne voulait pas que le clergé paie d\'impôts' },
            { id: 'ecosse', texte: 'L\'Écosse : reconquise en 1296, la révolte de William Wallace, l\'indépendance gardée après sa mort en 1307' },
          ],
        },
      ],
    },

    // ═══ Séance 2 — The Peasants' Revolt ════════════════════════════════════

    {
      id: 'ch02-mots-revolt',
      seance: 2,
      titre: 'Key words',
      sousTitre: 'Le vocabulaire de la révolte, en anglais',
      duree: 2,
      fiche: [
        {
          type: 'vocabulaire',
          titre: 'Key words',
          mots: [
            { en: 'peasant', fr: 'un paysan' },
            { en: 'rebel', fr: 'un rebelle' },
            { en: 'revolt, uprising', fr: 'une révolte' },
            { en: 'poll tax', fr: 'l\'impôt par tête (chaque personne paie)' },
            { en: 'servitude', fr: 'la servitude, le servage' },
            { en: 'advisor', fr: 'un conseiller (du roi)' },
            { en: 'repression', fr: 'la répression' },
            { en: 'crowd', fr: 'la foule' },
            { en: 'shelter', fr: 'un abri, un refuge' },
            { en: 'to abolish', fr: 'abolir, supprimer' },
            { en: 'feudal', fr: 'féodal' },
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**poll tax** : *poll*, c\'est la tête qu\'on compte ; *pole*, c\'est un poteau.',
          ],
        },
      ],
      items: [
        {
          id: 't-peasant', type: 'terme', fr: 'un paysan', attendu: 'peasant', accepte: ['peasants'],
          pieges: [{ si: 'paysan', message: 'Paysan, c\'est le français. En anglais : peasant.' }],
        },
        { id: 't-revolt', type: 'terme', fr: 'une révolte', attendu: 'revolt', accepte: ['uprising', 'rebellion', 'revolts'] },
        {
          id: 't-poll-tax', type: 'terme', fr: 'l\'impôt par tête', attendu: 'poll tax',
          pieges: [{ si: 'pole tax', resultat: 'presque', message: 'Poll (la tête qu\'on compte), pas pole (le poteau) : poll tax.' }],
        },
        { id: 't-servitude', type: 'terme', fr: 'le servage', attendu: 'servitude', accepte: ['serfdom'] },
        { id: 't-advisor', type: 'terme', fr: 'un conseiller (du roi)', attendu: 'advisor', accepte: ['adviser', 'counsellor', 'counselor'] },
        { id: 't-crowd', type: 'terme', fr: 'la foule', attendu: 'crowd' },
        { id: 't-shelter', type: 'terme', fr: 'un abri, un refuge', attendu: 'shelter', accepte: ['refuge'] },
        { id: 't-abolish', type: 'terme', fr: 'abolir', attendu: 'abolish', accepte: ['to abolish'] },
      ],
    },

    {
      id: 'ch02-revolt',
      seance: 2,
      titre: 'The Peasants\' Revolt of 1381',
      sousTitre: 'II — Taxes, London, and the outcomes',
      duree: 6,
      fiche: [
        {
          type: 'regle',
          titre: '1. Taxes go up',
          lignes: [
            'End of the 14th century: England is **at war with France** → the King **needs money**.',
            '**1377**: according to your course, **Richard II** introduces the **Poll Tax**. He is crowned the same year, **aged 10**.',
            'Great **dissatisfaction**: the people turn against the **King\'s advisor** and against **servitude**.',
          ],
        },
        {
          type: 'regle',
          titre: '2. The rebels arrive in London',
          lignes: [
            'First, the peasants try **not to pay** → harsh **repression** → the revolt grows bigger.',
            '**1381**: about **50,000 rebels** march to **London** and ask to **meet the King**.',
            'Richard II **refuses** → they **break through the gates** and enter London. The King takes **shelter in the Tower of London**.',
          ],
        },
        {
          type: 'regle',
          titre: '3. Outcomes of the revolt',
          lignes: [
            'Richard II **promises** to accept the peasants\' demands.',
            'But the unrest goes on → **Wat Tyler**, one of their leaders, is **executed** (killed while meeting the King); the peasants are threatened with harsher repression.',
            'The **crowd goes home**; the **poll tax is abolished**; the **other promises are not kept**.',
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**1377**, la poll tax (et Richard II couronné à 10 ans) ; **1381**, les rebelles à Londres.',
            '**Wat Tyler**, le chef des paysans (1381) ≠ **William Wallace**, le chevalier écossais (après 1296).',
          ],
        },
      ],
      items: [
        {
          id: 'rv-war', type: 'choix', consigne: BLOC, phrase: 'Why did Richard II need money?',
          options: ['England was at war with France', 'He wanted to build the Tower of London', 'He had to pay the Pope'],
          attendu: 'England was at war with France',
          explication: 'England was at war with France, and wars cost a lot of money.',
        },
        {
          id: 'rv-tax', type: 'reponse', question: 'What was the name of the new tax introduced in 1377?',
          attendu: 'Poll Tax',
          explication: 'The Poll Tax: every person had to pay.',
          pieges: [{ si: 'pole tax', resultat: 'presque', message: 'Poll (la tête qu\'on compte), pas pole (le poteau) : poll tax.' }],
        },
        {
          id: 'rv-who', type: 'reponse', question: 'According to your course, which King introduced the Poll Tax?',
          attendu: 'Richard II', accepte: ['King Richard II', 'Richard the Second'],
          explication: 'Richard II, who became king in 1377, aged 10.',
          pieges: [
            { si: ['Edward I', 'Edward 1'], message: 'Edward I, c\'est 1272–1307. La poll tax de 1377 : Richard II.' },
            { si: ['Edward III', 'Edward 3'], message: 'Edward III, c\'est le prétendant au trône de France en 1328. La poll tax de 1377, d\'après ton cours : Richard II.' },
            { si: 'Richard', message: 'Lequel ? Le roi de la poll tax, couronné à 10 ans : Richard II.' },
          ],
        },
        {
          id: 'rv-1377', type: 'reponse', question: 'In which year was the Poll Tax introduced?',
          attendu: '1377', accepte: ['in 1377'],
          explication: 'In 1377. The rebels came to London later, in 1381.',
          pieges: [{ si: ['1381', 'in 1381'], message: '1381, c\'est l\'arrivée des rebelles à Londres. La poll tax : 1377.' }],
        },
        {
          id: 'rv-age', type: 'reponse', question: 'How old was Richard II when he was crowned in 1377?',
          attendu: '10', accepte: ['10 years old', '10 years', 'ten', 'ten years old', 'ten years', 'aged 10', 'aged ten', 'at the age of 10', 'at the age of ten', 'at 10', 'at ten', 'he was 10', 'he was ten', 'he was 10 years old', 'he was ten years old'],
          explication: 'He was only 10 years old.',
          indice: 'Still a child: younger than 12',
        },
        {
          id: 'rv-against', type: 'choix', consigne: BLOC, phrase: 'The people were very dissatisfied. What did they turn against?',
          options: ['The King\'s advisor and servitude', 'The Pope and the clergy', 'The Scottish barons'],
          attendu: 'The King\'s advisor and servitude',
          explication: 'Against the King\'s advisor, and against servitude.',
        },
        {
          id: 'rv-first', type: 'choix', consigne: BLOC, phrase: 'What did the peasants do first?',
          options: ['They tried not to pay the taxes', 'They marched to London at once', 'They asked France for help'],
          attendu: 'They tried not to pay the taxes',
          explication: 'First, they tried to avoid paying — and they were harshly repressed.',
        },
        {
          id: 'rv-repression', type: 'choix', consigne: BLOC, phrase: 'What made their rebellion bigger?',
          options: ['The harsh repression against them', 'The death of the King', 'The end of the war'],
          attendu: 'The harsh repression against them',
          explication: 'The repression fuelled their rebellion.',
        },
        {
          id: 'rv-1381', type: 'reponse', question: 'In which year did the rebels come to London?',
          attendu: '1381', accepte: ['in 1381'],
          explication: 'In 1381.',
          pieges: [{ si: ['1377', 'in 1377'], message: '1377, c\'est la poll tax. Les rebelles à Londres : 1381.' }],
        },
        {
          id: 'rv-number', type: 'reponse', question: 'About how many rebels came to London in 1381?',
          attendu: '50,000',
          accepte: ['50000', 'about 50,000', 'around 50,000', 'approximately 50,000', 'about 50000', 'around 50000', 'fifty thousand',
            '50,000 rebels', '50000 rebels', 'about 50,000 rebels', 'around 50,000 rebels'],
          explication: 'About 50,000 rebels.',
        },
        {
          id: 'rv-demand', type: 'choix', consigne: BLOC, phrase: 'What did the rebels ask for when they came to London?',
          options: ['To meet the King', 'To crown a new king', 'To join the army'], attendu: 'To meet the King',
          explication: 'They demanded an audience with the King.',
        },
        {
          id: 'rv-gates', type: 'choix', consigne: BLOC, phrase: 'What did the rebels do when Richard II refused to meet them?',
          options: ['They broke through the gates of London', 'They went back home', 'They attacked Scotland'],
          attendu: 'They broke through the gates of London',
          explication: 'They broke into the city through its gates.',
        },
        {
          id: 'rv-tower', type: 'reponse', question: 'Where did the King take shelter?',
          attendu: 'Tower of London', accepte: ['the Tower of London', 'the Tower', 'in the Tower', 'in the Tower of London', 'at the Tower of London', 'London Tower'],
          explication: 'In the Tower of London.',
          pieges: [{ si: ['London', 'in London'], message: 'Plus précis : il se réfugie dans la tour de Londres, the Tower of London.' }],
        },
        {
          id: 'rv-tyler', type: 'reponse', question: 'Which leader of the peasants was executed?',
          attendu: 'Wat Tyler', accepte: ['Tyler', 'Walter Tyler'],
          explication: 'Wat Tyler, killed while he was meeting the King.',
          pieges: [{ si: ['William Wallace', 'Wallace'], message: 'William Wallace, c\'est l\'Écosse (après 1296). Le chef des paysans exécuté en 1381 : Wat Tyler.' }],
        },
        {
          id: 'rv-outcome', type: 'choix', consigne: BLOC, phrase: 'What were the outcomes of the revolt?',
          options: ['No more poll tax, but the King broke his other promises', 'All the peasants\' demands were accepted', 'Richard II was killed by the rebels'],
          attendu: 'No more poll tax, but the King broke his other promises',
          explication: 'Richard II had promised to accept their demands: in the end, only the poll tax disappeared.',
        },
      ],
    },

    {
      id: 'ch02-conclusion',
      seance: 2,
      titre: 'What changed in the British Isles',
      sousTitre: 'Conclusion — Late Medieval England',
      duree: 2,
      fiche: [
        {
          type: 'regle',
          titre: 'Conclusion',
          lignes: [
            'In England: the **King shares some power with the barons**, and the **peasants** begin to ask for an end to the **feudal structures**.',
            'Outside England: **Wales** becomes part of the English lands **forever**; **Scotland**\'s **autonomy is recognised**.',
          ],
        },
      ],
      items: [
        {
          id: 'cc-barons', type: 'choix', consigne: BLOC, phrase: 'According to the conclusion, what did the King accept?',
          options: ['To give the barons a share of his power', 'To give up the throne', 'To stop collecting taxes'],
          attendu: 'To give the barons a share of his power',
          explication: 'He agreed to give the barons a share of his power.',
        },
        {
          id: 'cc-peasants', type: 'choix', consigne: BLOC, phrase: 'What did the peasants begin to ask for?',
          options: ['The end of the feudal structures', 'A new king', 'A war against France'], attendu: 'The end of the feudal structures',
          explication: 'They began to ask for an end to the feudal system.',
        },
        {
          id: 'cc-wales', type: 'choix', consigne: BLOC, phrase: 'What happened to Wales?',
          options: ['It became part of the English lands forever', 'It became independent', 'It was given to France'],
          attendu: 'It became part of the English lands forever',
          explication: 'Wales was incorporated into the English lands forever.',
        },
        {
          id: 'cc-scotland', type: 'choix', consigne: BLOC, phrase: 'And what happened to Scotland?',
          options: ['Its autonomy was recognised', 'It became part of England', 'It was given to France'],
          attendu: 'Its autonomy was recognised',
          explication: 'Scotland had its autonomy recognised.',
        },
      ],
    },

    {
      id: 'ch02-ecrire-revolt',
      seance: 2,
      titre: 'Writing: the Peasants\' Revolt',
      sousTitre: 'Écrire en anglais, comme au contrôle',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: 'A cause, the events, the outcomes',
          lignes: [
            '**The cause**: the war against France → Richard II\'s Poll Tax (1377).',
            '**The events**: 1381, about 50,000 rebels march to London to meet the King; he hides in the Tower of London.',
            '**The outcomes**: Wat Tyler executed, the poll tax abolished, the other promises not kept.',
            'Useful words: *because, so, then, but, in the end.*',
          ],
        },
      ],
      items: [
        {
          id: 'w-revolt', type: 'decrire', sujet: 'The Peasants\' Revolt of 1381', emoji: '🔥',
          indices: ['war against France', 'Poll Tax', '1377', '1381', 'London', 'Wat Tyler', 'abolished'],
          consigne: 'En anglais, écris trois ou quatre phrases sur la révolte des paysans : sa cause, ce qui se passe en 1381, et comment elle finit.',
          titreModele: 'An example',
          modele: 'England was at war with France and needed money, so in 1377 Richard II introduced the Poll Tax. The peasants were very unhappy: they tried not to pay, but they were harshly repressed. In 1381, about 50,000 rebels marched to London to meet the King; he refused, so they broke into the city, and Richard II took shelter in the Tower of London. In the end, their leader Wat Tyler was executed; the poll tax disappeared, but the King broke his other promises.',
          criteres: [
            { id: 'cause', texte: 'La cause : la poll tax de 1377, levée par Richard II pour payer la guerre contre la France' },
            { id: 'londres', texte: '1381 : les rebelles (environ 50 000) marchent sur Londres pour voir le roi' },
            { id: 'fin', texte: 'La fin : Wat Tyler exécuté, la poll tax supprimée, les autres promesses pas tenues' },
          ],
        },
      ],
    },

    // ═══ Séance 3 — The Hundred Years' War: the beginning ══════════════════

    {
      id: 'ch02-mots-war',
      seance: 3,
      titre: 'Key words',
      sousTitre: 'Le vocabulaire de la guerre, en anglais',
      duree: 2,
      fiche: [
        {
          type: 'vocabulaire',
          titre: 'Key words',
          mots: [
            { en: 'heir', fr: 'l\'héritier' },
            { en: 'claimant', fr: 'un prétendant (au trône)' },
            { en: 'succession crisis', fr: 'une crise de succession' },
            { en: 'assembly', fr: 'une assemblée' },
            { en: 'cousin / nephew', fr: 'le cousin / le neveu' },
            { en: 'to be crowned', fr: 'être couronné' },
            { en: 'vassal', fr: 'un vassal' },
            { en: 'fief', fr: 'un fief' },
            { en: 'homage', fr: 'l\'hommage (promettre fidélité à son seigneur)' },
            { en: 'humiliated', fr: 'humilié' },
            { en: 'truce', fr: 'une trêve' },
            { en: 'to capture', fr: 'capturer, faire prisonnier' },
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**heir** = l\'héritier (on prononce « air ») ; **homage** ne prend qu\'un m en anglais.',
          ],
        },
      ],
      items: [
        {
          id: 't-heir', type: 'terme', fr: 'l\'héritier', attendu: 'heir',
          pieges: [{ si: ['heritier', 'heritor'], message: 'En anglais : heir — on prononce « air ».' }],
        },
        { id: 't-claimant', type: 'terme', fr: 'un prétendant (au trône)', attendu: 'claimant', accepte: ['pretender', 'claimants'] },
        { id: 't-crisis', type: 'terme', fr: 'une crise de succession', attendu: 'succession crisis' },
        { id: 't-assembly', type: 'terme', fr: 'une assemblée', attendu: 'assembly' },
        {
          id: 't-nephew', type: 'terme', fr: 'le neveu', attendu: 'nephew',
          pieges: [{ si: 'neveu', message: 'Neveu, c\'est le français. En anglais : nephew.' }],
        },
        { id: 't-crowned', type: 'terme', fr: 'couronné', attendu: 'crowned', accepte: ['to be crowned', 'be crowned'] },
        {
          id: 't-homage', type: 'terme', fr: 'l\'hommage (au seigneur)', attendu: 'homage',
          pieges: [{ si: 'hommage', resultat: 'presque', message: 'En anglais, homage ne prend qu\'un m.' }],
        },
        { id: 't-humiliated', type: 'terme', fr: 'humilié', attendu: 'humiliated' },
        {
          id: 't-truce', type: 'terme', fr: 'une trêve', attendu: 'truce',
          pieges: [{ si: 'treve', message: 'Trêve, c\'est le français. En anglais : truce.' }],
        },
      ],
    },

    {
      id: 'ch02-succession',
      seance: 3,
      titre: 'A succession crisis in France',
      sousTitre: 'Introduction, and I — 1. Two claimants (1328)',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Introduction — The Hundred Years\' War (1337–1453)',
          lignes: [
            'England and France fight over **the throne of France**, from **1337 to 1453**: the **Hundred Years\' War**.',
            'Not one long war: a **series of conflicts**, with **truces** in between (some long, some short). And it lasted **116 years**!',
          ],
        },
        {
          type: 'regle',
          titre: '1. A succession crisis in France',
          lignes: [
            '**1328**: **Charles IV**, King of France, dies with **no male heir**. An **assembly of nobles** must choose the next king.',
            'Two main **claimants**: **Philip, count of Valois**, Charles IV\'s **cousin**; and **Edward III, King of England**, Charles IV\'s **nephew**.',
            'The assembly chooses Philip → he is crowned **Philip VI** (your course writes « Phillip »).',
          ],
        },
        {
          type: 'regle',
          titre: 'The family tree, in your course',
          lignes: [
            '**Philip IV the Fair** (1285–1314): his three sons are kings one after the other — Louis X, Philip V, then **Charles IV** (1322–1328).',
            'His daughter **Isabella** marries **Edward II**, King of England → their son is **Edward III**: Charles IV\'s nephew, through his **mother**.',
            'Philip IV\'s brother, **Charles of Valois**, is the father of **Philip VI**: Charles IV\'s cousin.',
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Le **neveu** (nephew), c\'est Edward III, le roi d\'Angleterre ; le **cousin**, c\'est Philippe de Valois, qui devient Philip VI.',
            'Edward **I** (mort en 1307) n\'est pas Edward **III** (le prétendant de 1328) : c\'est son grand-père.',
          ],
        },
      ],
      items: [
        {
          id: 'hy-dates', type: 'reponse', question: 'What are the dates of the Hundred Years\' War?',
          attendu: '1337–1453', accepte: ['1337 1453', '1337 to 1453', '1337 until 1453', 'from 1337 to 1453', 'from 1337 until 1453', 'between 1337 and 1453', '1337 and 1453'],
          explication: 'From 1337 to 1453.',
        },
        {
          id: 'hy-hundred', type: 'choix', consigne: BLOC, phrase: 'Did the Hundred Years\' War last exactly a hundred years, without a break?',
          options: ['No: 116 years, a series of conflicts with truces', 'Yes: a hundred years of fighting', 'No: only ten years'],
          attendu: 'No: 116 years, a series of conflicts with truces',
          explication: '1337–1453 is 116 years — and the conflicts were interrupted by truces.',
        },
        {
          id: 'hy-about', type: 'choix', consigne: BLOC, phrase: 'What were England and France fighting about?',
          options: ['The throne of France', 'The throne of Scotland', 'The taxes of the Church'], attendu: 'The throne of France',
          explication: 'They fought over who should be King of France.',
        },
        {
          id: 'hy-1328', type: 'reponse', question: 'In which year did Charles IV, King of France, die?',
          attendu: '1328', accepte: ['in 1328'],
          explication: 'In 1328.',
        },
        {
          id: 'hy-crisis', type: 'choix', consigne: BLOC, phrase: 'Why was there a succession crisis in 1328?',
          options: ['Charles IV died with no male heir', 'Charles IV had two sons', 'The Pope refused to crown the new king'],
          attendu: 'Charles IV died with no male heir',
          explication: 'Charles IV left no male heir.',
        },
        {
          id: 'hy-decide', type: 'choix', consigne: BLOC, phrase: 'Who had to choose the new King of France?',
          options: ['An assembly of nobles', 'The Pope', 'The King of England'], attendu: 'An assembly of nobles',
          explication: 'An assembly of nobles.',
        },
        {
          id: 'hy-philip', type: 'choix', consigne: BLOC, phrase: 'How was Philip, count of Valois, related to Charles IV?',
          options: ['His cousin', 'His nephew', 'His son'], attendu: 'His cousin',
          explication: 'Philip of Valois was Charles IV\'s cousin. Edward III was his nephew.',
        },
        {
          id: 'hy-edward', type: 'choix', consigne: BLOC, phrase: 'How was Edward III, King of England, related to Charles IV?',
          options: ['His nephew', 'His cousin', 'His brother'], attendu: 'His nephew',
          explication: 'Edward III was Charles IV\'s nephew. Philip of Valois was his cousin.',
        },
        {
          id: 'hy-mother', type: 'choix', consigne: 'D\'après l\'arbre généalogique du cours :', phrase: 'Through whom did Edward III claim the throne of France?',
          options: ['Through his mother, Isabella, the sister of Charles IV', 'Through his father, Edward II', 'Through the Pope'],
          attendu: 'Through his mother, Isabella, the sister of Charles IV',
          explication: 'His mother Isabella was the daughter of Philip IV, and the sister of Charles IV.',
        },
        {
          id: 'hy-claimant', type: 'reponse', question: 'Which King of England claimed the throne of France in 1328?',
          attendu: 'Edward III', accepte: ['King Edward III', 'Edward the Third'],
          explication: 'Edward III, Charles IV\'s nephew.',
          pieges: [
            { si: ['Edward I', 'Edward 1'], message: 'Edward I est mort en 1307. En 1328, c\'est son petit-fils : Edward III.' },
            { si: ['Edward II', 'Edward 2'], message: 'Edward II, c\'est son père. Le neveu de Charles IV : Edward III.' },
            { si: 'Edward', message: 'Lequel ? Edward I est mort en 1307 : en 1328, c\'est Edward III.' },
          ],
        },
        {
          id: 'hy-crowned', type: 'reponse', question: 'The assembly chose Philip of Valois. Under which name was he crowned?',
          attendu: 'Philip VI', accepte: ['Phillip VI', 'King Philip VI', 'King Phillip VI', 'Philip the Sixth', 'Phillip the Sixth'],
          explication: 'Philip VI (your course writes « Phillip VI »).',
          pieges: [
            { si: 'Philippe VI', resultat: 'presque', message: 'En anglais : Philip VI (ton cours écrit Phillip).' },
            { si: ['Edward III', 'Edward'], message: 'Non : l\'assemblée a écarté Edward III. Elle a choisi Philip of Valois.' },
          ],
        },
      ],
    },

    {
      id: 'ch02-expansion',
      seance: 3,
      titre: 'French expansion',
      sousTitre: 'I — 2. Homage, lands, and a humiliated king',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: '2. French expansion',
          lignes: [
            'Edward III **protests** against the assembly\'s choice and tries to fight it: according to your course, he is **defeated at the Battle of Cassel (1328)**.',
            'The King of England is a **vassal** of the King of France: he holds **fiefs** in France.',
            'According to your course, Philip VI demands that Edward **pay homage** to him and **give back Normandy and Brittany**. England could keep only **Gascony**.',
            'Edward feels **humiliated** → he decides to **fight** for those lands.',
          ],
        },
        {
          type: 'regle',
          titre: 'The map: France in 1330',
          lignes: [
            'The Kingdom of France has grown a lot since 1214: that is the **French expansion**.',
            'England\'s land in France: **Gascony** (also called **Guyenne**), in the **south-west**, near Navarre and Aragon.',
          ],
        },
      ],
      items: [
        {
          id: 'fe-protest', type: 'choix', consigne: BLOC, phrase: 'What did Edward III do after the assembly\'s choice?',
          options: ['He protested and tried to fight it', 'He accepted it happily', 'He gave up the English throne'],
          attendu: 'He protested and tried to fight it',
          explication: 'He protested and tried to fight the decision.',
        },
        {
          id: 'fe-cassel', type: 'reponse', question: 'According to your course, at which battle was Edward defeated in 1328?',
          attendu: 'Battle of Cassel', accepte: ['Cassel', 'the Battle of Cassel', 'at the Battle of Cassel', 'at Cassel', 'in Cassel'],
          explication: 'At the Battle of Cassel (1328), according to your course.',
          pieges: [{ si: ['Poitiers', 'Battle of Poitiers'], message: 'Poitiers, c\'est 1356 : John II y est capturé. En 1328, ton cours dit : Cassel.' }],
        },
        {
          id: 'fe-vassal', type: 'choix', consigne: BLOC, phrase: 'Why did Philip VI think that Edward III had to obey him?',
          options: ['The King of England was his vassal: he held fiefs in France', 'Edward III was his son', 'England belonged to France'],
          attendu: 'The King of England was his vassal: he held fiefs in France',
          explication: 'For his lands in France, the King of England was a vassal of the King of France.',
        },
        {
          id: 'fe-demand', type: 'choix', consigne: BLOC, phrase: 'According to your course, what did Philip VI demand from Edward III?',
          options: ['To pay homage, and to give back Normandy and Brittany', 'To give him the English throne', 'To pay the Poll Tax'],
          attendu: 'To pay homage, and to give back Normandy and Brittany',
          explication: 'Homage, and Normandy and Brittany back: England could keep only Gascony.',
        },
        {
          id: 'fe-gascony', type: 'reponse', question: 'Which land in France would England be allowed to keep?',
          attendu: 'Gascony', accepte: ['Guyenne', 'Guienne', 'only Gascony', 'Gascony only'],
          explication: 'Only Gascony, in the south-west of France.',
          pieges: [
            { si: 'Gascogne', resultat: 'presque', message: 'En anglais : Gascony.' },
            { si: ['Normandy', 'Brittany', 'Normandy and Brittany'], message: 'La Normandie et la Bretagne, Philip VI les réclamait, dit ton cours. L\'Angleterre ne garde que Gascony.' },
            { si: 'Aquitaine', resultat: 'presque', message: 'La Gascogne fait bien partie de l\'Aquitaine, mais ton cours dit : Gascony.' },
          ],
        },
        {
          id: 'fe-feeling', type: 'choix', consigne: BLOC, phrase: 'How did Edward III feel, and what did he decide?',
          options: ['Humiliated: he chose to go to war for those lands', 'Happy: he signed a peace treaty', 'Afraid: he gave up his lands'],
          attendu: 'Humiliated: he chose to go to war for those lands',
          explication: 'He felt humiliated, and chose war to keep those lands.',
        },
        {
          id: 'fe-map', type: 'choix', consigne: 'D\'après la carte « France in 1330 » :', phrase: 'Where is Gascony?',
          options: ['In the south-west of France, near Navarre and Aragon', 'In the north, near Flanders', 'In the east, near the Holy Roman Empire'],
          attendu: 'In the south-west of France, near Navarre and Aragon',
          explication: 'Gascony is in the south-west of France.',
        },
      ],
    },

    {
      id: 'ch02-victories',
      seance: 3,
      titre: 'English victories',
      sousTitre: 'I — 3. From 1337 to the truce of 1360',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: '3. English victories',
          lignes: [
            '**1337–1356**: important **English victories**.',
            '**1346**: the English reconquer **Normandy** (as your course says).',
            '**1356**, **Battle of Poitiers**: the French King **John II** — Philip VI\'s son — is **captured**.',
            '**1360**: the two kingdoms agree on a **truce** (the 1360 map calls it the **Peace of Brétigny**). England gets its lands back, but Edward III must **stop claiming the French throne**.',
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**1360**, ce n\'est pas la fin de la guerre : seulement une trêve. La guerre finit en **1453**.',
          ],
        },
      ],
      items: [
        {
          id: 'ev-who', type: 'choix', consigne: BLOC, phrase: 'Who won the important battles from 1337 to 1356?',
          options: ['The English', 'The French', 'The Scots'], attendu: 'The English',
          explication: 'The English had important victories.',
        },
        {
          id: 'ev-1346', type: 'reponse', question: 'According to your course, in which year did the English reconquer Normandy?',
          attendu: '1346', accepte: ['in 1346'],
          explication: 'In 1346, according to your course.',
        },
        {
          id: 'ev-poitiers', type: 'reponse', question: 'At which battle was the French King captured, in 1356?',
          attendu: 'Battle of Poitiers', accepte: ['Poitiers', 'the Battle of Poitiers', 'at the Battle of Poitiers', 'at Poitiers'],
          explication: 'At the Battle of Poitiers, in 1356.',
          pieges: [{ si: ['Cassel', 'Battle of Cassel'], message: 'Cassel, c\'est 1328. Le roi est capturé à Poitiers, en 1356.' }],
        },
        {
          id: 'ev-john', type: 'reponse', question: 'Which French King was captured at Poitiers?',
          attendu: 'John II', accepte: ['King John II', 'John the Second', 'John the Good', 'John II the Good'],
          explication: 'John II, Philip VI\'s son.',
          pieges: [
            { si: ['Jean II', 'Jean II le Bon', 'Jean le Bon'], resultat: 'presque', message: 'En anglais : John II.' },
            { si: ['Philip VI', 'Phillip VI'], message: 'Philip VI est mort en 1350. En 1356, le roi est son fils : John II.' },
            { si: 'John', message: 'Lequel ? Le roi de France capturé à Poitiers : John II (John I, c\'est le grand-père d\'Edward I).' },
          ],
        },
        {
          id: 'ev-1356', type: 'reponse', question: 'In which year was John II captured?',
          attendu: '1356', accepte: ['in 1356'],
          explication: 'In 1356, at the Battle of Poitiers.',
        },
        {
          id: 'ev-1360', type: 'choix', consigne: BLOC, phrase: 'What did the two kingdoms agree on in 1360?',
          options: ['A truce', 'The end of the Hundred Years\' War', 'A royal marriage'], attendu: 'A truce',
          explication: 'A truce (the Peace of Brétigny on the map). The war only ended in 1453.',
        },
        {
          id: 'ev-terms', type: 'choix', consigne: BLOC, phrase: 'What did the 1360 truce say?',
          options: ['England got its lands back, but Edward III stopped claiming the French throne', 'Edward III became King of France', 'England gave Gascony to France'],
          attendu: 'England got its lands back, but Edward III stopped claiming the French throne',
          explication: 'England recovered its lands; in exchange, Edward III gave up his claim to the French throne.',
        },
      ],
    },

    {
      id: 'ch02-ecrire-war',
      seance: 3,
      titre: 'Writing: why the war began',
      sousTitre: 'Écrire en anglais, comme au contrôle',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: 'From a dead king to a war',
          lignes: [
            '**1328**: Charles IV dies with no male heir → a succession crisis.',
            '**Two claimants**: his cousin Philip of Valois, his nephew Edward III. The assembly chooses Philip VI.',
            '**The vassal**: Philip VI wants homage and lands; England keeps only Gascony → Edward, humiliated, goes to war (1337).',
            'Useful words: *because, so, but, then, as a result.*',
          ],
        },
      ],
      items: [
        {
          id: 'w-war', type: 'decrire', sujet: 'Why did the Hundred Years\' War begin?', emoji: '⚔️',
          indices: ['1328', 'Charles IV', 'no male heir', 'cousin', 'nephew', 'Philip VI', 'homage', 'Gascony', 'humiliated'],
          consigne: 'En anglais, écris trois ou quatre phrases : pourquoi la guerre de Cent Ans a-t-elle commencé ?',
          titreModele: 'An example',
          modele: 'In 1328, Charles IV, King of France, died with no male heir. There were two claimants: his cousin Philip of Valois and his nephew Edward III, King of England, and an assembly of nobles chose Philip, who became Philip VI. As Edward III was a vassal of the King of France, Philip VI demanded that he pay homage and give back Normandy and Brittany: England could keep only Gascony. Edward felt humiliated and decided to fight, so the war began in 1337.',
          criteres: [
            { id: 'succession', texte: '1328 : Charles IV meurt sans héritier mâle, d\'où une crise de succession' },
            { id: 'pretendants', texte: 'Les deux prétendants : Philippe de Valois (le cousin) et Edward III (le neveu) ; l\'assemblée choisit Philippe VI' },
            { id: 'vassal', texte: 'Le vassal humilié : Philippe VI exige l\'hommage et des terres, l\'Angleterre ne garderait que la Gascogne ; Edward choisit la guerre' },
          ],
        },
      ],
    },

    // ═══ Séance 4 — Charles VII's reign ════════════════════════════════════
    //
    // Le cours (diaporama et cahier) s'arrête au premier point, « Charles, the
    // Dauphin ». Dans la marge du cahier : la ville où le roi est sacré, Reims.

    {
      id: 'ch02-dauphin',
      seance: 4,
      titre: 'Charles, the Dauphin',
      sousTitre: 'II — Charles VII\'s reign (1422–1461)',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'II – Charles VII\'s reign (1422–1461)',
          lignes: [
            '**1422**: **Charles VI**, King of France, dies. The French crown should have gone to **Henry V, King of England** — his **son-in-law**…',
            '…but Henry V had died **six weeks before** (and, your course says, left no sons).',
            'So Charles VI\'s **son** — another **Charles** — takes the power. Not **crowned** yet → he is called **the Dauphin**.',
            'In your notebook: the kings of France were crowned in **Reims**.',
            'The Dauphin is the future **Charles VII**: your course dates his reign **1422–1461**.',
          ],
        },
        {
          type: 'vocabulaire',
          titre: 'Key words',
          mots: [
            { en: 'the crown', fr: 'la couronne' },
            { en: 'son-in-law', fr: 'le gendre (le mari de sa fille)' },
            { en: 'the Dauphin', fr: 'le dauphin, l\'héritier du trône de France' },
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Trois Charles : **Charles IV** meurt en 1328 (début de la crise) ; **Charles VI** meurt en 1422 ; son fils, le Dauphin, devient **Charles VII**.',
            'Le titre s\'écrit à la française : **the Dauphin**. Un *dolphin*, c\'est l\'animal.',
          ],
        },
      ],
      items: [
        {
          id: 'da-dates', type: 'reponse', question: 'What are the dates of Charles VII\'s reign?',
          attendu: '1422–1461', accepte: ['1422 1461', '1422 to 1461', '1422 until 1461', 'from 1422 to 1461', 'from 1422 until 1461', 'between 1422 and 1461'],
          explication: 'From 1422 to 1461.',
        },
        {
          id: 'da-1422', type: 'choix', consigne: BLOC, phrase: 'Which King of France died in 1422?',
          options: ['Charles VI', 'Charles IV', 'Philip VI'], attendu: 'Charles VI',
          explication: 'Charles VI died in 1422. Charles IV had died in 1328, Philip VI in 1350.',
        },
        {
          id: 'da-supposed', type: 'choix', consigne: BLOC, phrase: 'Who should have got the French crown after Charles VI?',
          options: ['Henry V, King of England, his son-in-law', 'Edward III, King of England, his nephew', 'The Pope'],
          attendu: 'Henry V, King of England, his son-in-law',
          explication: 'Henry V, King of England, his son-in-law. Edward III was Charles IV\'s nephew, in 1328.',
        },
        {
          id: 'da-son-in-law', type: 'trou', consigne: 'Complète :', phrase: 'Henry V was Charles VI\'s ___: the husband of his daughter.',
          attendu: 'son-in-law', accepte: ['son in law'],
          pieges: [
            { si: 'gendre', resultat: 'presque', message: 'Gendre, c\'est le français. En anglais : son-in-law.' },
            { si: 'nephew', message: 'Nephew, c\'était Edward III pour Charles IV. Henry V est le gendre : son-in-law.' },
          ],
        },
        {
          id: 'da-why', type: 'choix', consigne: BLOC, phrase: 'Why did Henry V not become King of France?',
          options: ['He had died six weeks before Charles VI', 'The assembly of nobles chose Charles', 'The Pope refused to crown him'],
          attendu: 'He had died six weeks before Charles VI',
          explication: 'Henry V had died six weeks before Charles VI.',
        },
        {
          id: 'da-weeks', type: 'reponse', question: 'How long before Charles VI had Henry V died?',
          attendu: 'six weeks', accepte: ['6 weeks', 'six weeks before', '6 weeks before', 'six weeks earlier', '6 weeks earlier'],
          explication: 'Six weeks before.',
        },
        {
          id: 'da-power', type: 'choix', consigne: BLOC, phrase: 'Who got the power after Charles VI?',
          options: ['His son, also called Charles', 'Henry V\'s brother', 'An assembly of nobles'],
          attendu: 'His son, also called Charles',
          explication: 'Charles VI\'s son, another Charles, took the power.',
        },
        {
          id: 'da-dauphin', type: 'reponse', question: 'Charles could not be crowned yet. What was he called?',
          attendu: 'the Dauphin', accepte: ['Charles the Dauphin'],
          explication: 'The Dauphin.',
          pieges: [{ si: 'dolphin', resultat: 'presque', message: 'Dolphin, c\'est l\'animal ! Le titre s\'écrit à la française : the Dauphin.' }],
        },
        {
          id: 'da-why-dauphin', type: 'choix', consigne: BLOC, phrase: 'Why was Charles called « the Dauphin »?',
          options: ['He could not be crowned yet', 'He lived by the sea', 'He was the son of the King of England'],
          attendu: 'He could not be crowned yet',
          explication: 'He could not be crowned yet, so he was the Dauphin, not the King.',
        },
        {
          id: 'da-reims', type: 'reponse', question: 'In which city were the kings of France crowned?',
          attendu: 'Reims', accepte: ['Rheims', 'in Reims', 'in Rheims'],
          explication: 'In Reims (it is in your notebook).',
          pieges: [{ si: ['Paris', 'in Paris'], message: 'Non : les rois de France sont sacrés à Reims, pas à Paris.' }],
        },
        {
          id: 'da-name', type: 'reponse', question: 'Under which name did the Dauphin reign?',
          attendu: 'Charles VII', accepte: ['King Charles VII', 'Charles the Seventh'],
          explication: 'Charles VII (1422–1461).',
          pieges: [{ si: 'Charles VI', message: 'Charles VI, c\'est son père, mort en 1422. Le Dauphin règne sous le nom de Charles VII.' }],
        },
      ],
    },

    {
      id: 'ch02-ecrire-dauphin',
      seance: 4,
      titre: 'Writing: the Dauphin',
      sousTitre: 'Écrire en anglais, comme au contrôle',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: 'Three steps, three sentences',
          lignes: [
            '**1422**: Charles VI dies; the crown should go to Henry V, King of England, his son-in-law.',
            '**But** Henry V had died six weeks before.',
            '**So** his son Charles takes the power, but he is not crowned yet: he is the Dauphin.',
            'Useful words: *but, so, because, as.*',
          ],
        },
      ],
      items: [
        {
          id: 'w-dauphin', type: 'decrire', sujet: 'Why was Charles called « the Dauphin » in 1422?', emoji: '👑',
          indices: ['1422', 'Charles VI', 'son-in-law', 'Henry V', 'six weeks', 'crowned', 'the Dauphin'],
          consigne: 'En anglais, écris trois phrases : que se passe-t-il en 1422, et pourquoi le fils de Charles VI est-il appelé « le Dauphin » ?',
          titreModele: 'An example',
          modele: 'Charles VI, King of France, died in 1422. Normally, Henry V, the English king and the husband of his daughter, was to inherit the crown, but Henry V had already died, six weeks earlier. So Charles VI\'s own son, another Charles, took the power; he was not crowned yet, so people called him the Dauphin.',
          criteres: [
            { id: 'henry', texte: '1422 : Charles VI meurt ; la couronne devait aller à son gendre Henry V, roi d\'Angleterre' },
            { id: 'mort', texte: 'Mais Henry V était mort six semaines avant' },
            { id: 'dauphin', texte: 'Le pouvoir passe à son fils Charles, qui ne peut pas encore être couronné : on l\'appelle le Dauphin' },
          ],
        },
      ],
    },

    {
      id: 'ch02-chronology',
      seance: 4,
      titre: 'Chronology',
      sousTitre: 'Les dates du chapitre, dans l\'ordre',
      duree: 3,
      fiche: [
        {
          type: 'vocabulaire',
          titre: 'Key dates',
          mots: [
            { en: '1199–1216', fr: 'John I, roi d\'Angleterre (le grand-père d\'Edward I)' },
            { en: '1216–1272', fr: 'Henry III (le père d\'Edward I)' },
            { en: '1272–1307', fr: 'Edward I' },
            { en: '1275', fr: 'des représentants des comtés et des villes au Parlement' },
            { en: '1296', fr: 'Edward I reconquiert l\'Écosse ; puis révolte de William Wallace' },
            { en: '1307', fr: 'mort d\'Edward I : l\'Écosse reste indépendante' },
            { en: '1328', fr: 'mort de Charles IV : Philip VI roi de France' },
            { en: '1337–1453', fr: 'la guerre de Cent Ans' },
            { en: '1346', fr: 'les Anglais reconquièrent la Normandie (selon ton cours)' },
            { en: '1356', fr: 'bataille de Poitiers : John II capturé' },
            { en: '1360', fr: 'la trêve (paix de Brétigny)' },
            { en: '1377', fr: 'Richard II couronné à 10 ans ; la Poll Tax' },
            { en: '1381', fr: 'la révolte des paysans : 50 000 rebelles à Londres' },
            { en: '1422', fr: 'mort de Charles VI (Henry V était mort six semaines avant) : son fils Charles est le Dauphin' },
            { en: '1422–1461', fr: 'le règne de Charles VII' },
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Le **13th century**, ce sont les années **1200** (1201–1300) ; le **14th century**, les années **1300**. On ajoute un.',
          ],
        },
      ],
      items: [
        {
          id: 'chr-england', type: 'chrono', consigne: ORDRE,
          evenements: [
            { texte: 'Representatives of the counties and towns are invited to Parliament', date: '1275' },
            { texte: 'Edward I reconquers Scotland', date: '1296' },
            { texte: 'Edward I dies: Scotland keeps its independence', date: '1307' },
            { texte: 'Richard II introduces the Poll Tax', date: '1377' },
            { texte: 'About 50,000 rebels march to London', date: '1381' },
          ],
        },
        {
          id: 'chr-war', type: 'chrono', consigne: ORDRE,
          evenements: [
            { texte: 'Charles IV dies with no male heir', date: '1328' },
            { texte: 'The Hundred Years\' War begins', date: '1337' },
            { texte: 'The English reconquer Normandy', date: '1346' },
            { texte: 'John II is captured at Poitiers', date: '1356' },
            { texte: 'The two kingdoms agree on a truce', date: '1360' },
            { texte: 'Charles VI dies: his son Charles is the Dauphin', date: '1422' },
          ],
        },
        {
          id: 'chr-1337', type: 'reponse', question: 'In which year did the Hundred Years\' War begin?',
          attendu: '1337', accepte: ['in 1337'],
          explication: 'In 1337. It ended in 1453.',
        },
        {
          id: 'chr-1453', type: 'reponse', question: 'In which year did the Hundred Years\' War end?',
          attendu: '1453', accepte: ['in 1453'],
          explication: 'In 1453. It began in 1337.',
        },
        {
          id: 'chr-century-1381', type: 'choix', consigne: BLOC, phrase: 'The Peasants\' Revolt (1381) took place in the…',
          options: ['14th century', '13th century', '15th century'], attendu: '14th century',
          explication: '1381 is in the 14th century (1301–1400).',
        },
        {
          id: 'chr-century-1296', type: 'choix', consigne: BLOC, phrase: 'Edward I reconquered Scotland (1296) in the…',
          options: ['13th century', '12th century', '14th century'], attendu: '13th century',
          explication: '1296 is in the 13th century (1201–1300).',
        },
      ],
    },
  ],

  // ── Le contrôle blanc ───────────────────────────────────────────────────
  interro: {
    duree: 8,
    tirage: [
      { etape: 'ch02-mots-england', nombre: 1 },
      { etape: 'ch02-edward', nombre: 2 },
      { etape: 'ch02-scotland', nombre: 2 },
      { etape: 'ch02-mots-revolt', nombre: 1 },
      { etape: 'ch02-revolt', nombre: 3 },
      { etape: 'ch02-conclusion', nombre: 1 },
      { etape: 'ch02-mots-war', nombre: 1 },
      { etape: 'ch02-succession', nombre: 2 },
      { etape: 'ch02-expansion', nombre: 1 },
      { etape: 'ch02-victories', nombre: 2 },
      { etape: 'ch02-dauphin', nombre: 2 },
      { etape: 'ch02-chronology', nombre: 1 },
    ],
  },

  // ── Le quiz des dates ───────────────────────────────────────────────────
  //
  // Hors séances, à refaire autant de fois qu'on veut : toutes les dates, dans
  // le désordre, une seule question par date (`groupe`), posée dans un sens ou
  // dans l'autre — l'événement, il tape l'année ; l'année, il choisit
  // l'événement. Deux questions d'une même date ne tombent jamais ensemble :
  // la première soufflerait la seconde.
  quizDates: {
    duree: 4,
    items: [
      {
        id: 'qd-1275', groupe: '1275', type: 'reponse',
        question: 'From which year did the counties and towns send representatives to Parliament?',
        attendu: '1275', accepte: ['in 1275', 'from 1275', 'since 1275'],
        explication: 'From 1275: two representatives of each county and of each town or city.',
      },
      {
        id: 'qd-1275-quoi', groupe: '1275', type: 'choix', consigne: 'Que s\'est-il passé ?', phrase: '1275',
        options: ['Representatives of the counties and towns are invited to Parliament', 'Edward I reconquers Scotland', 'Richard II introduces the Poll Tax'],
        attendu: 'Representatives of the counties and towns are invited to Parliament',
        explication: '1275: the counties and towns send representatives to Parliament.',
      },
      {
        id: 'qd-1296', groupe: '1296', type: 'reponse', question: 'In which year did Edward I reconquer Scotland?',
        attendu: '1296', accepte: ['in 1296'],
        explication: '1296. Then came William Wallace\'s revolt.',
        pieges: [{ si: ['1307', 'in 1307'], message: '1307, c\'est la mort d\'Edward I. La reconquête de l\'Écosse : 1296.' }],
      },
      {
        id: 'qd-1296-quoi', groupe: '1296', type: 'choix', consigne: 'Que s\'est-il passé ?', phrase: '1296',
        options: ['Edward I reconquers Scotland', 'Edward I dies', 'Representatives are invited to Parliament'],
        attendu: 'Edward I reconquers Scotland',
        explication: '1296: Edward I reconquers Scotland.',
      },
      {
        id: 'qd-1307', groupe: '1307', type: 'reponse', question: 'In which year did Edward I die, before reconquering Scotland?',
        attendu: '1307', accepte: ['in 1307'],
        explication: '1307: Scotland keeps its independence.',
        pieges: [{ si: ['1296', 'in 1296'], message: '1296, c\'est la reconquête de l\'Écosse. La mort d\'Edward I : 1307.' }],
      },
      {
        id: 'qd-1307-quoi', groupe: '1307', type: 'choix', consigne: 'Que s\'est-il passé ?', phrase: '1307',
        options: ['Edward I dies: Scotland keeps its independence', 'Edward I reconquers Scotland', 'Charles IV dies with no male heir'],
        attendu: 'Edward I dies: Scotland keeps its independence',
        explication: '1307: Edward I dies, and Scotland keeps its independence.',
      },
      {
        id: 'qd-bruce', groupe: 'bruce', type: 'choix', consigne: BLOC, phrase: 'When was Robert the Bruce King of Scotland?',
        options: ['From 1306 to 1329', 'From 1272 to 1307', 'From 1422 to 1461'], attendu: 'From 1306 to 1329',
        explication: 'Robert the Bruce: King of Scotland from 1306 to 1329. 1272–1307 is Edward I, 1422–1461 is Charles VII.',
      },
      {
        id: 'qd-1328', groupe: '1328', type: 'reponse', question: 'In which year did Charles IV, King of France, die with no male heir?',
        attendu: '1328', accepte: ['in 1328'],
        explication: '1328: the assembly of nobles chooses Philip VI.',
        pieges: [{ si: ['1337', 'in 1337'], message: '1337, c\'est le début de la guerre. La mort de Charles IV : 1328.' }],
      },
      {
        id: 'qd-1328-quoi', groupe: '1328', type: 'choix', consigne: 'Que s\'est-il passé ?', phrase: '1328',
        options: ['Charles IV dies; the assembly chooses Philip VI', 'The Hundred Years\' War begins', 'John II is captured at Poitiers'],
        attendu: 'Charles IV dies; the assembly chooses Philip VI',
        explication: '1328: Charles IV dies with no male heir, and the assembly of nobles chooses Philip VI.',
      },
      {
        id: 'qd-1337', groupe: 'guerre', type: 'reponse', question: 'In which year did the Hundred Years\' War begin?',
        attendu: '1337', accepte: ['in 1337'],
        explication: 'From 1337 to 1453.',
        pieges: [
          { si: ['1328', 'in 1328'], message: '1328, c\'est la crise de succession. La guerre commence en 1337.' },
          { si: ['1453', 'in 1453'], message: '1453, c\'est la fin de la guerre. Elle commence en 1337.' },
        ],
      },
      {
        id: 'qd-1453', groupe: 'guerre', type: 'reponse', question: 'In which year did the Hundred Years\' War end?',
        attendu: '1453', accepte: ['in 1453'],
        explication: 'From 1337 to 1453.',
        pieges: [{ si: ['1337', 'in 1337'], message: '1337, c\'est le début de la guerre. Elle finit en 1453.' }],
      },
      {
        id: 'qd-guerre', groupe: 'guerre', type: 'reponse', question: 'What are the dates of the Hundred Years\' War?',
        attendu: '1337–1453', accepte: ['1337 1453', '1337 to 1453', '1337 until 1453', 'from 1337 to 1453', 'from 1337 until 1453', 'between 1337 and 1453'],
        explication: 'From 1337 to 1453: 116 years, with truces.',
      },
      {
        id: 'qd-1346', groupe: '1346', type: 'reponse', question: 'According to your course, in which year did the English reconquer Normandy?',
        attendu: '1346', accepte: ['in 1346'],
        explication: '1346, according to your course.',
        pieges: [{ si: ['1356', 'in 1356'], message: '1356, c\'est Poitiers. La Normandie, d\'après ton cours : 1346.' }],
      },
      {
        id: 'qd-1346-quoi', groupe: '1346', type: 'choix', consigne: 'Que s\'est-il passé, d\'après ton cours ?', phrase: '1346',
        options: ['The English reconquer Normandy', 'John II is captured at Poitiers', 'The two kingdoms agree on a truce'],
        attendu: 'The English reconquer Normandy',
        explication: '1346: the English reconquer Normandy (as your course says).',
      },
      {
        id: 'qd-1356', groupe: '1356', type: 'reponse', question: 'In which year was the French King John II captured at Poitiers?',
        attendu: '1356', accepte: ['in 1356'],
        explication: '1356, at the Battle of Poitiers.',
        pieges: [{ si: ['1346', 'in 1346'], message: '1346, c\'est la Normandie. Poitiers : 1356.' }],
      },
      {
        id: 'qd-1356-quoi', groupe: '1356', type: 'choix', consigne: 'Que s\'est-il passé ?', phrase: '1356',
        options: ['John II is captured at the Battle of Poitiers', 'Edward III is defeated at Cassel', 'Charles VI dies'],
        attendu: 'John II is captured at the Battle of Poitiers',
        explication: '1356: the French King John II is captured at Poitiers.',
      },
      {
        id: 'qd-1360', groupe: '1360', type: 'reponse', question: 'In which year did England and France agree on a truce?',
        attendu: '1360', accepte: ['in 1360'],
        explication: '1360: a truce (the Peace of Brétigny), not the end of the war.',
        pieges: [{ si: ['1453', 'in 1453'], message: '1453, c\'est la fin de la guerre. La trêve : 1360.' }],
      },
      {
        id: 'qd-1360-quoi', groupe: '1360', type: 'choix', consigne: 'Que s\'est-il passé ?', phrase: '1360',
        options: ['A truce: Edward III stops claiming the French throne', 'The end of the Hundred Years\' War', 'Richard II introduces the Poll Tax'],
        attendu: 'A truce: Edward III stops claiming the French throne',
        explication: '1360: a truce — England gets its lands back, Edward III gives up the French throne.',
      },
      {
        id: 'qd-1377', groupe: '1377', type: 'reponse', question: 'According to your course, in which year did Richard II introduce the Poll Tax?',
        attendu: '1377', accepte: ['in 1377'],
        explication: '1377 — the year Richard II was crowned, aged 10.',
        pieges: [{ si: ['1381', 'in 1381'], message: '1381, c\'est la révolte à Londres. La poll tax : 1377.' }],
      },
      {
        id: 'qd-1377-quoi', groupe: '1377', type: 'choix', consigne: 'Que s\'est-il passé ?', phrase: '1377',
        options: ['Richard II is crowned, aged 10, and introduces the Poll Tax', 'About 50,000 rebels march to London', 'Edward I reconquers Scotland'],
        attendu: 'Richard II is crowned, aged 10, and introduces the Poll Tax',
        explication: '1377: Richard II is crowned at 10 and, according to your course, introduces the Poll Tax.',
      },
      {
        id: 'qd-1381', groupe: '1381', type: 'reponse', question: 'In which year did about 50,000 rebels march to London?',
        attendu: '1381', accepte: ['in 1381'],
        explication: '1381: the Peasants\' Revolt.',
        pieges: [{ si: ['1377', 'in 1377'], message: '1377, c\'est la poll tax. Les rebelles à Londres : 1381.' }],
      },
      {
        id: 'qd-1381-quoi', groupe: '1381', type: 'choix', consigne: 'Que s\'est-il passé ?', phrase: '1381',
        options: ['About 50,000 rebels march to London', 'Richard II introduces the Poll Tax', 'Charles VI dies'],
        attendu: 'About 50,000 rebels march to London',
        explication: '1381: the rebels march to London; Wat Tyler is executed.',
      },
      {
        id: 'qd-1422', groupe: '1422', type: 'reponse', question: 'In which year did Charles VI die, leaving his son Charles as the Dauphin?',
        attendu: '1422', accepte: ['in 1422'],
        explication: '1422: Henry V had died six weeks before.',
      },
      {
        id: 'qd-1422-quoi', groupe: '1422', type: 'choix', consigne: 'Que s\'est-il passé ?', phrase: '1422',
        options: ['Charles VI dies: his son Charles is the Dauphin', 'Charles IV dies with no male heir', 'The Hundred Years\' War ends'],
        attendu: 'Charles VI dies: his son Charles is the Dauphin',
        explication: '1422: Charles VI dies; his son Charles, not crowned yet, is the Dauphin.',
      },
      {
        id: 'qd-charles7', groupe: '1422', type: 'reponse', question: 'What are the dates of Charles VII\'s reign?',
        attendu: '1422–1461', accepte: ['1422 1461', '1422 to 1461', '1422 until 1461', 'from 1422 to 1461', 'from 1422 until 1461', 'between 1422 and 1461'],
        explication: 'Charles VII\'s reign: 1422–1461.',
      },
      {
        id: 'qd-siecles-angleterre', groupe: 'siecles', type: 'choix', consigne: BLOC, phrase: 'Late Medieval England: which centuries?',
        options: ['13th–15th centuries', '11th–13th centuries', '14th–15th centuries'], attendu: '13th–15th centuries',
        explication: 'Late Medieval England: 13th–15th centuries (1201–1500).',
      },
      {
        id: 'qd-siecles-guerre', groupe: 'siecles', type: 'choix', consigne: BLOC, phrase: 'The Hundred Years\' War (1337–1453): which centuries?',
        options: ['14th–15th centuries', '13th–14th centuries', '15th–16th centuries'], attendu: '14th–15th centuries',
        explication: '1337 is in the 14th century, 1453 in the 15th.',
      },
    ],
  },
};
