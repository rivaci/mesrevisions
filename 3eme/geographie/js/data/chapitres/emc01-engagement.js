// EMC, chapitre 1 — « L'engagement collectif dans la démocratie ».
//
// D'après les pages du manuel d'Evan photographiées par Denis (Hatier,
// chapitre 20) : la double page « Participer à la vie politique — pourquoi les
// élections sont-elles une forme majeure d'engagement ? » (p. 426-427) et
// « Je retiens l'essentiel » avec sa carte mentale. La fiche résume en notes,
// sans recopier le manuel (le dépôt est public).
//
// Les quatre portraits du manuel sont ceux de vraies personnes, citées dans la
// presse : l'appli ne donne pas leurs noms, seulement ce qu'ils font (une
// électrice qui vote blanc, une assesseure, un militant, un candidat). C'est
// d'ailleurs ce que demande l'exercice du manuel : la forme d'engagement.
//
// Les définitions que le manuel ne donne pas (suffrage indirect, RIP, service
// civique…) sont celles du programme d'EMC, en mots simples.
//
// Les identifiants ne se renumérotent jamais : la progression y est rangée.

const BLOC = 'Choisis la bonne réponse :';

export default {
  id: 'emc01',
  matiere: 'EMC',
  numero: 1,
  titre: 'L\'engagement collectif dans la démocratie',
  detail: 'Les élections · Les formes d\'engagement · Individuel ou collectif',

  profilMerlin: 'Élève de 3e. EMC, chapitre « L\'engagement collectif dans la démocratie » (manuel Hatier, chapitre 20). '
    + 'S\'engager permet de participer activement à la démocratie et de faire vivre les valeurs républicaines (liberté, égalité, '
    + 'fraternité), par des actions locales ou nationales. Les élections sont un moment essentiel de l\'engagement : le vote '
    + 'n\'est pas obligatoire, mais c\'est un outil essentiel de participation citoyenne. Les élections en France : président de '
    + 'la République (suffrage universel direct, mandat de 5 ans), 577 députés (législatives, suffrage universel, 5 ans), 348 '
    + 'sénateurs (suffrage universel indirect, 6 ans), députés européens (5 ans), conseillers régionaux, départementaux et '
    + 'municipaux (6 ans) ; les référendums permettent aux électeurs de participer aux décisions. On s\'engage lors des '
    + 'élections comme électeur, assesseur (il aide le président du bureau de vote, vérifie l\'identité des électeurs, fait '
    + 'signer la liste d\'émargement), militant (affiches, tracts) ou candidat. Campagne électorale : affiches, tracts, débats, '
    + 'meetings. Limites : l\'abstention (ne pas aller voter) augmente depuis les années 1980, forte aux législatives et aux '
    + 'européennes, moindre aux municipales et au premier tour de la présidentielle ; elle touche surtout les jeunes et les '
    + 'classes populaires ; le vote blanc (bulletin blanc ou enveloppe vide) peut exprimer un refus des candidats sans être un '
    + 'manque d\'engagement. Autres formes d\'engagement : une association (Secours populaire, Restos du cœur), un syndicat, '
    + 'son établissement (éco-délégué), la politique (conseiller municipal, député), les institutions de l\'État (justice, '
    + 'enseignement), la réserve de l\'armée, le service civique. Motivations : entraide, défense des droits, sécurité, '
    + 'environnement, éducation, santé ; participer à la démocratie, promouvoir les valeurs républicaines, défendre une cause. '
    + 'L\'engagement individuel (le bénévolat) favorise une prise de conscience ; l\'action collective (grèves, pétitions, RIP) '
    + 'donne plus de force et de visibilité. Ensemble, elles permettent à chacun de trouver sa place et de construire une '
    + 'nation plus juste et solidaire.',

  seances: [
    { numero: 1, partie: 'Explorons', titre: 'Participer à la vie politique : les élections' },
    { numero: 2, partie: 'Je retiens l\'essentiel', titre: 'Les formes d\'engagement, individuelles et collectives' },
  ],

  etapes: [
    // ═══ Séance 1 — les élections ════════════════════════════════════════

    {
      id: 'e1-mots',
      seance: 1,
      titre: 'Le vocabulaire des élections',
      sousTitre: 'Voter, s\'abstenir, être élu',
      duree: 4,
      fiche: [
        {
          type: 'tableau',
          titre: 'Les mots à savoir définir',
          colonnes: ['Le mot', 'Sa définition'],
          lignes: [
            ['le **suffrage universel direct**', 'tous les citoyens majeurs **élisent eux-mêmes** leurs représentants'],
            ['le **suffrage universel indirect**', 'les représentants sont élus **par des élus** (les « grands électeurs »)'],
            ['un **mandat**', 'la **mission** confiée à un élu, pour une **durée** fixée'],
            ['l\'**abstention**', 'le fait de **ne pas aller voter**'],
            ['le **vote blanc**', 'glisser dans l\'urne un **bulletin blanc** ou une **enveloppe vide**'],
            ['un **assesseur**', 'il aide le **président du bureau de vote** : il vérifie l\'**identité** des électeurs et fait signer la **liste d\'émargement**'],
            ['un **référendum**', 'les électeurs répondent **oui ou non** à une question : ils participent **directement** à une décision'],
            ['la **campagne électorale**', 'le temps avant l\'élection où les candidats se font connaître : **affiches, tracts, débats, meetings**'],
            ['un **militant**', 'une personne qui **agit activement** pour un parti ou une cause (coller des affiches, distribuer des tracts)'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**Direct** : je vote pour le président, les députés, les conseillers municipaux… **Indirect** : je ne vote pas pour les **sénateurs** ; ce sont des élus qui les élisent. (Le **maire**, lui, est élu par le conseil municipal.)',
            'S\'**abstenir**, c\'est ne pas venir. Voter **blanc**, c\'est venir, et dire qu\'aucun candidat ne convient.',
          ],
        },
      ],
      items: [
        {
          id: 'emc-t-direct', type: 'terme', definition: 'Tous les citoyens majeurs élisent eux-mêmes leurs représentants', attendu: 'suffrage universel direct',
          accepte: ['le suffrage universel direct', 'suffrage direct'],
          pieges: [{ si: ['suffrage universel indirect', 'suffrage indirect'], message: 'Non : « indirect », c\'est quand des élus votent à la place des citoyens. Ici, les citoyens votent eux-mêmes.' }],
        },
        {
          id: 'emc-t-indirect', type: 'terme', definition: 'Des représentants élus par des élus, les « grands électeurs »', attendu: 'suffrage universel indirect',
          accepte: ['le suffrage universel indirect', 'suffrage indirect'],
          pieges: [{ si: ['suffrage universel direct', 'suffrage direct'], message: 'Non : quand ce sont des élus qui votent, le suffrage est indirect — comme pour les sénateurs.' }],
        },
        { id: 'emc-t-mandat', type: 'terme', definition: 'La mission confiée à un élu, pour une durée fixée', attendu: 'mandat', accepte: ['un mandat', 'le mandat'] },
        {
          id: 'emc-t-abstention', type: 'terme', definition: 'Le fait de ne pas aller voter', attendu: 'abstention', accepte: ['l\'abstention'],
          pieges: [{ si: ['vote blanc'], message: 'Non : voter blanc, c\'est aller voter. Ne pas y aller, c\'est l\'abstention.' }],
        },
        {
          id: 'emc-t-blanc', type: 'terme', definition: 'Glisser dans l\'urne un bulletin blanc ou une enveloppe vide', attendu: 'vote blanc', accepte: ['le vote blanc', 'voter blanc'],
          pieges: [{ si: ['abstention'], message: 'Non : l\'abstention, c\'est ne pas venir. Ici, on vient, et on met un bulletin blanc : le vote blanc.' }],
        },
        { id: 'emc-t-assesseur', type: 'terme', definition: 'Il aide le président du bureau de vote, vérifie l\'identité des électeurs et fait signer la liste d\'émargement', attendu: 'assesseur', accepte: ['un assesseur', 'assesseure', 'une assesseure'] },
        { id: 'emc-t-referendum', type: 'terme', definition: 'Les électeurs répondent oui ou non à une question et participent directement à une décision', attendu: 'référendum', accepte: ['un référendum', 'le référendum'] },
        { id: 'emc-t-campagne', type: 'terme', definition: 'Le temps avant l\'élection où les candidats se font connaître : affiches, tracts, débats, meetings', attendu: 'campagne électorale', accepte: ['la campagne électorale', 'une campagne électorale'] },
        { id: 'emc-t-militant', type: 'terme', definition: 'Une personne qui agit activement pour un parti ou une cause, en collant des affiches ou en distribuant des tracts', attendu: 'militant', accepte: ['un militant', 'militante', 'une militante'] },
      ],
    },

    {
      id: 'e1-elections',
      seance: 1,
      titre: 'Les élections en France',
      sousTitre: 'Docs 1 à 4 : la campagne, les portraits, le tableau, l\'abstention',
      duree: 6,
      fiche: [
        {
          type: 'tableau',
          titre: 'Doc. 3 — Les élections en France',
          colonnes: ['On élit', 'Élection', 'Suffrage', 'Mandat'],
          lignes: [
            ['le **président de la République**', 'présidentielle', 'universel direct', '**5 ans**'],
            ['**577 députés**', 'législatives', 'universel direct', '**5 ans**'],
            ['**348 sénateurs**', 'sénatoriales', 'universel **indirect**', '**6 ans**'],
            ['les **députés européens**', 'européennes', 'universel direct', '**5 ans**'],
            ['les conseillers **régionaux**', 'régionales', 'universel direct', '**6 ans**'],
            ['les conseillers **départementaux**', 'départementales', 'universel direct', '**6 ans**'],
            ['les conseillers **municipaux**', 'municipales', 'universel direct', '**6 ans**'],
          ],
        },
        {
          type: 'regle',
          titre: 'Et les référendums',
          lignes: [
            'Ils ne servent pas à élire quelqu\'un : les électeurs répondent **oui ou non**, et **participent aux décisions** prises par les autorités.',
            'Retenir les durées : **5 ans** pour le président, les députés et les députés européens ; **6 ans** pour les sénateurs et tous les élus locaux.',
          ],
        },
        {
          type: 'regle',
          titre: 'Doc. 1 — La campagne électorale (européennes de 2024)',
          lignes: [
            'Pour se faire connaître et expliquer leur **projet**, les candidats font campagne : **affiches**, **tracts**, **débats** télévisés, **meetings**.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Doc. 2 — Quatre façons de s\'engager lors des élections',
          colonnes: ['Qui', 'Ce qu\'il ou elle fait', 'Forme d\'engagement'],
          lignes: [
            ['une jeune femme de 21 ans', 'elle **vote blanc** ; elle s\'engage pour l\'environnement **au quotidien**', '**électrice**'],
            ['une femme de 91 ans', 'elle tient un bureau de vote, **bénévole**, à chaque scrutin depuis 1955', '**assesseure**'],
            ['un homme', 'il **colle les affiches** de son candidat aux européennes de 2024', '**militant**'],
            ['un jeune de 20 ans', 'il **se présente** aux municipales de 2026', '**candidat**'],
          ],
        },
        {
          type: 'regle',
          titre: 'Doc. 4 — La limite : l\'abstention',
          lignes: [
            'L\'abstention **augmente depuis les années 1980**.',
            'Elle est **très forte** aux **législatives** et aux **européennes**, **moindre** aux **municipales** et au **1er tour de la présidentielle**.',
            'Elle touche surtout les **jeunes** et les **classes populaires**.',
            'Pour la combattre, des campagnes poussent les jeunes à **s\'inscrire sur les listes électorales**.',
          ],
        },
        {
          type: 'piege',
          lignes: [
            'En France, le vote est un **droit**, **pas une obligation**. C\'est pour cela qu\'on parle d\'**engagement** : rien n\'oblige à voter.',
          ],
        },
      ],
      items: [
        {
          id: 'emc-president', type: 'choix', consigne: BLOC, phrase: 'Comment le président de la République est-il élu ?',
          options: ['Au suffrage universel direct, pour 5 ans', 'Au suffrage universel indirect, pour 6 ans', 'Par les députés, pour 7 ans'],
          attendu: 'Au suffrage universel direct, pour 5 ans',
          explication: 'Tous les citoyens votent pour lui, et son mandat dure 5 ans.',
        },
        {
          id: 'emc-deputes', type: 'choix', consigne: BLOC, phrase: 'Combien y a-t-il de députés ?',
          options: ['577', '348', '1 000'], attendu: '577',
          explication: '577 députés, élus aux législatives pour 5 ans. 348, ce sont les sénateurs.',
        },
        {
          id: 'emc-senateurs', type: 'choix', consigne: BLOC, phrase: 'Quelle élection se fait au suffrage universel indirect ?',
          options: ['Les sénatoriales', 'Les législatives', 'Les municipales'], attendu: 'Les sénatoriales',
          explication: 'Les 348 sénateurs sont élus par des élus, pour 6 ans.',
        },
        {
          id: 'emc-nb-senateurs', type: 'reponse', question: 'Combien y a-t-il de sénateurs ?', attendu: '348',
          explication: '348 sénateurs, élus au suffrage universel indirect pour 6 ans.',
        },
        {
          id: 'emc-six-ans', type: 'choix', consigne: BLOC, phrase: 'Pour combien de temps sont élus les conseillers municipaux ?',
          options: ['6 ans', '5 ans', '4 ans'], attendu: '6 ans',
          explication: '6 ans, comme les conseillers régionaux et départementaux, et les sénateurs.',
        },
        {
          id: 'emc-europe', type: 'choix', consigne: BLOC, phrase: 'Les députés européens sont élus…',
          options: ['au suffrage universel direct, pour 5 ans', 'par les députés français, pour 6 ans', 'par référendum'],
          attendu: 'au suffrage universel direct, pour 5 ans',
          explication: 'Aux élections européennes, comme en 2024 : suffrage universel, 5 ans.',
        },
        {
          id: 'emc-referendum', type: 'choix', consigne: BLOC, phrase: 'À quoi sert un référendum ?',
          options: ['À faire participer les électeurs à une décision, en répondant oui ou non', 'À élire le maire', 'À choisir les sénateurs'],
          attendu: 'À faire participer les électeurs à une décision, en répondant oui ou non',
          explication: 'On n\'y élit personne : on décide.',
        },
        {
          id: 'emc-campagne', type: 'choix', consigne: 'D\'après le doc. 1 :', phrase: 'Quels moyens un candidat a-t-il pour présenter son projet ?',
          options: ['Les affiches, les tracts, les débats et les meetings', 'Le bulletin de vote seulement', 'Le bureau de vote'],
          attendu: 'Les affiches, les tracts, les débats et les meetings',
          explication: 'C\'est la campagne électorale.',
        },
        {
          id: 'emc-assesseure', type: 'choix', consigne: 'D\'après le doc. 2 :', phrase: 'Une femme tient un bureau de vote, bénévole, à chaque scrutin. Quelle est sa forme d\'engagement ?',
          options: ['Assesseure', 'Candidate', 'Militante'], attendu: 'Assesseure',
          explication: 'L\'assesseur aide le président du bureau de vote.',
        },
        {
          id: 'emc-militant', type: 'choix', consigne: 'D\'après le doc. 2 :', phrase: 'Un homme colle les affiches de son candidat. Quelle est sa forme d\'engagement ?',
          options: ['Militant', 'Assesseur', 'Candidat'], attendu: 'Militant',
          explication: 'Il agit activement pour un candidat : c\'est un militant.',
        },
        {
          id: 'emc-candidat', type: 'choix', consigne: 'D\'après le doc. 2 :', phrase: 'Un jeune de 20 ans se présente aux élections municipales. Quelle est sa forme d\'engagement ?',
          options: ['Candidat', 'Électeur', 'Assesseur'], attendu: 'Candidat',
          explication: 'Il se présente pour être élu : il est candidat.',
        },
        {
          id: 'emc-vote-blanc', type: 'choix', consigne: 'D\'après le doc. 2 :', phrase: 'Une électrice vote blanc. Pourquoi n\'est-ce pas un manque d\'engagement ?',
          options: ['Elle se déplace pour voter, et s\'engage pour l\'environnement au quotidien', 'Parce que le vote blanc élit un candidat', 'Parce qu\'elle ne va pas voter'],
          attendu: 'Elle se déplace pour voter, et s\'engage pour l\'environnement au quotidien',
          explication: 'Voter blanc, c\'est voter : aucun candidat ne lui convient, et elle agit autrement.',
        },
        {
          id: 'emc-abstention-hausse', type: 'choix', consigne: 'D\'après le doc. 4 :', phrase: 'Comment l\'abstention évolue-t-elle en France ?',
          options: ['Elle augmente depuis les années 1980', 'Elle baisse depuis les années 1980', 'Elle a disparu'],
          attendu: 'Elle augmente depuis les années 1980',
          explication: 'C\'est la principale limite de l\'engagement par les élections.',
        },
        {
          id: 'emc-abstention-qui', type: 'choix', consigne: 'D\'après le doc. 4 :', phrase: 'Qui l\'abstention touche-t-elle surtout ?',
          options: ['Les jeunes et les classes populaires', 'Les personnes âgées', 'Les élus'], attendu: 'Les jeunes et les classes populaires',
          explication: 'D\'où les campagnes pour pousser les jeunes à s\'inscrire sur les listes électorales.',
        },
        {
          id: 'emc-abstention-ou', type: 'choix', consigne: 'D\'après le doc. 4 :', phrase: 'À quelles élections l\'abstention est-elle la plus forte ?',
          options: ['Les législatives et les européennes', 'Les municipales', 'Le 1er tour de la présidentielle'],
          attendu: 'Les législatives et les européennes',
          explication: 'Elle est moindre aux municipales et au 1er tour de la présidentielle.',
        },
        {
          id: 'emc-obligatoire', type: 'choix', consigne: BLOC, phrase: 'En France, voter est…',
          options: ['un droit, pas une obligation', 'une obligation punie d\'une amende', 'réservé aux élus'], attendu: 'un droit, pas une obligation',
          explication: 'C\'est pourquoi voter est un engagement.',
        },
      ],
    },

    {
      id: 'e1-ecrire',
      seance: 1,
      titre: 'Rédiger : pourquoi voter est un engagement',
      sousTitre: 'La question 6 du manuel, comme au contrôle',
      duree: 5,
      fiche: [
        {
          type: 'regle',
          titre: 'Une réponse en trois temps',
          lignes: [
            '**D\'abord**, les élections permettent de choisir ses représentants, à tous les niveaux : des conseillers municipaux au président, jusqu\'au Parlement européen ; et le référendum fait participer aux décisions.',
            '**Ensuite**, on peut s\'y engager de plusieurs façons : électeur, assesseur, militant, candidat.',
            '**Enfin**, c\'est un engagement parce que le vote n\'est **pas obligatoire** — et l\'abstention, qui augmente, en est la limite.',
            'Mots utiles : *d\'abord, ensuite, enfin, car, c\'est pourquoi, par exemple, cependant.*',
          ],
        },
      ],
      items: [
        {
          id: 'emc-w-elections', type: 'decrire', sujet: 'Pourquoi les élections sont-elles une forme majeure d\'engagement ?', emoji: '🗳️',
          indices: ['choisir ses représentants', 'président', 'députés', 'municipales', 'référendum', 'électeur', 'assesseur', 'militant', 'candidat', 'pas obligatoire', 'abstention'],
          consigne: 'Rédige quelques lignes : ce que permettent les élections, les façons de s\'y engager, et pourquoi voter est un engagement.',
          titreModele: 'Une réponse d\'exemple',
          modele: 'Les élections sont une forme majeure d\'engagement, car elles permettent aux citoyens de choisir leurs représentants à tous les niveaux : les conseillers municipaux, qui élisent le maire, les députés, le président de la République ou les députés européens. Par le référendum, les électeurs peuvent aussi participer directement à une décision. On peut s\'engager de plusieurs façons lors d\'une élection : en votant, en étant assesseur dans un bureau de vote, en militant pour un candidat, par exemple en collant ses affiches, ou en se présentant soi-même comme candidat. Enfin, c\'est un engagement parce qu\'en France le vote n\'est pas obligatoire : cependant, l\'abstention augmente depuis les années 1980, surtout chez les jeunes.',
          criteres: [
            { id: 'representants', texte: 'Les élections permettent de choisir ses représentants (avec au moins un exemple d\'élection), ou de décider par référendum' },
            { id: 'formes', texte: 'Au moins deux façons de s\'engager lors des élections : électeur, assesseur, militant, candidat' },
            { id: 'engagement', texte: 'Pourquoi c\'est un engagement : le vote n\'est pas obligatoire ; ou sa limite, l\'abstention' },
          ],
        },
      ],
    },

    // ═══ Séance 2 — les formes d'engagement ═════════════════════════════

    {
      id: 'e2-mots',
      seance: 2,
      titre: 'Le vocabulaire de l\'engagement',
      sousTitre: 'Association, syndicat, grève, pétition…',
      duree: 4,
      fiche: [
        {
          type: 'tableau',
          titre: 'Les mots à savoir définir',
          colonnes: ['Le mot', 'Sa définition'],
          lignes: [
            ['l\'**engagement**', 'agir, par choix, pour une **cause** ou pour les **autres**'],
            ['une **association**', 'des personnes réunies autour d\'un **projet commun**, **sans chercher à faire de bénéfices** (Secours populaire, Restos du cœur)'],
            ['le **bénévolat**', 'donner de son temps **sans être payé**'],
            ['un **syndicat**', 'une organisation qui **défend les intérêts des salariés** d\'un métier'],
            ['un **éco-délégué**', 'un **élève élu** qui mène des projets pour l\'**environnement** dans son établissement'],
            ['le **service civique**', 'un engagement **volontaire** de quelques mois, pour les **16-25 ans**, dans une mission d\'**intérêt général**'],
            ['un **réserviste**', 'un citoyen qui, en plus de son métier, **sert quelques jours par an dans l\'armée**'],
            ['la **grève**', 'l\'**arrêt collectif du travail** pour défendre des revendications'],
            ['une **pétition**', 'un texte **signé par beaucoup de personnes** pour demander quelque chose aux autorités'],
            ['le **RIP**', 'le **référendum d\'initiative partagée** : demandé par des **parlementaires** et soutenu par un **dixième des électeurs**'],
          ],
        },
      ],
      items: [
        { id: 'emc-t-engagement', type: 'terme', definition: 'Agir, par choix, pour une cause ou pour les autres', attendu: 'engagement', accepte: ['l\'engagement', 's\'engager'] },
        {
          id: 'emc-t-association', type: 'terme', definition: 'Des personnes réunies autour d\'un projet commun, sans chercher à faire de bénéfices', attendu: 'association', accepte: ['une association'],
          pieges: [{ si: ['syndicat'], message: 'Non : un syndicat défend les salariés d\'un métier. Un projet commun, sans bénéfices : une association.' }],
        },
        { id: 'emc-t-benevolat', type: 'terme', definition: 'Donner de son temps sans être payé', attendu: 'bénévolat', accepte: ['le bénévolat', 'être bénévole', 'bénévole'] },
        {
          id: 'emc-t-syndicat', type: 'terme', definition: 'Une organisation qui défend les intérêts des salariés d\'un métier', attendu: 'syndicat', accepte: ['un syndicat'],
          pieges: [{ si: ['association'], message: 'Non : défendre les salariés d\'un métier, c\'est le rôle d\'un syndicat.' }],
        },
        { id: 'emc-t-eco', type: 'terme', definition: 'Un élève élu qui mène des projets pour l\'environnement dans son établissement', attendu: 'éco-délégué', accepte: ['un éco-délégué', 'éco délégué', 'écodélégué', 'éco-déléguée'] },
        { id: 'emc-t-civique', type: 'terme', definition: 'Un engagement volontaire de quelques mois, pour les 16-25 ans, dans une mission d\'intérêt général', attendu: 'service civique', accepte: ['le service civique'] },
        { id: 'emc-t-reserviste', type: 'terme', definition: 'Un citoyen qui, en plus de son métier, sert quelques jours par an dans l\'armée', attendu: 'réserviste', accepte: ['un réserviste'] },
        {
          id: 'emc-t-greve', type: 'terme', definition: 'L\'arrêt collectif du travail pour défendre des revendications', attendu: 'grève', accepte: ['la grève', 'une grève'],
          pieges: [{ si: ['manifestation'], resultat: 'presque', message: 'Une manifestation, c\'est défiler dans la rue. Arrêter de travailler ensemble : la grève.' }],
        },
        { id: 'emc-t-petition', type: 'terme', definition: 'Un texte signé par beaucoup de personnes pour demander quelque chose aux autorités', attendu: 'pétition', accepte: ['une pétition', 'la pétition'] },
        {
          id: 'emc-t-rip', type: 'terme', definition: 'Un référendum demandé par des parlementaires et soutenu par un dixième des électeurs', attendu: 'RIP',
          accepte: ['référendum d\'initiative partagée', 'le RIP', 'le référendum d\'initiative partagée', 'R.I.P.'],
          pieges: [{ si: ['référendum'], resultat: 'presque', message: 'Presque : c\'est un référendum particulier, demandé par des parlementaires et des électeurs — le RIP, référendum d\'initiative partagée.' }],
        },
      ],
    },

    {
      id: 'e2-formes',
      seance: 2,
      titre: 'S\'engager de mille façons',
      sousTitre: 'Les acteurs, les motivations, l\'individuel et le collectif',
      duree: 5,
      fiche: [
        {
          type: 'regle',
          titre: 'A. L\'engagement, un acte citoyen',
          lignes: [
            'S\'engager, c\'est **participer activement à la démocratie** et faire vivre les **valeurs républicaines** : **liberté, égalité, fraternité**.',
            'On peut agir **localement** (sa commune, son collège) ou **nationalement**.',
            'Les **élections** en sont un moment essentiel : le vote n\'est pas obligatoire, mais c\'est un outil essentiel de **participation citoyenne**.',
          ],
        },
        {
          type: 'tableau',
          titre: 'B. Où s\'engager ? Des acteurs divers',
          colonnes: ['Où', 'Exemple'],
          lignes: [
            ['une **association**', 'le Secours populaire, les Restos du cœur'],
            ['un **syndicat**', 'défendre les salariés de son métier'],
            ['son **établissement scolaire**', 'être **éco-délégué**'],
            ['la **politique**', 'être **conseiller municipal**, **député**'],
            ['les **institutions de l\'État**', 'la **justice**, l\'**enseignement**…'],
            ['l\'**armée**', 'être **réserviste**'],
            ['pour les **jeunes**', 'éco-délégué, **service civique**'],
          ],
        },
        {
          type: 'regle',
          titre: 'Pourquoi s\'engager ? Des motivations variées',
          lignes: [
            'L\'**entraide**, la **défense des droits**, la **sécurité** des citoyens, la **préservation de l\'environnement**, une meilleure **éducation** ou **santé**.',
            'Autrement dit : **participer à la démocratie**, **promouvoir les valeurs républicaines**, **défendre une cause**.',
          ],
        },
        {
          type: 'tableau',
          titre: 'C. Individuel ou collectif ?',
          colonnes: ['Mode d\'action', 'Exemple', 'Ce qu\'il apporte'],
          lignes: [
            ['l\'engagement **individuel**', 'le **bénévolat**', 'une **prise de conscience**'],
            ['l\'action **collective**', 'les **grèves**, les **pétitions**, le **RIP**', 'plus de **force** et de **visibilité**'],
            ['la **participation aux élections**', 'voter, être assesseur, militer, se présenter', 'choisir ses représentants'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Ensemble, ces formes d\'action permettent à chacun de **trouver sa place** dans la société, et de construire une **nation plus juste et solidaire**. C\'est la phrase de conclusion du manuel.',
          ],
        },
      ],
      items: [
        {
          id: 'emc-valeurs', type: 'choix', consigne: BLOC, phrase: 'Quelles valeurs républicaines l\'engagement fait-il vivre ?',
          options: ['La liberté, l\'égalité, la fraternité', 'La richesse, la force, l\'obéissance', 'La gloire, l\'honneur, la patrie'],
          attendu: 'La liberté, l\'égalité, la fraternité',
          explication: 'La devise de la République.',
        },
        {
          id: 'emc-restos', type: 'choix', consigne: BLOC, phrase: 'Les Restos du cœur et le Secours populaire sont…',
          options: ['des associations', 'des syndicats', 'des partis politiques'], attendu: 'des associations',
          explication: 'Des associations d\'entraide, où l\'on s\'engage souvent comme bénévole.',
        },
        {
          id: 'emc-college', type: 'choix', consigne: BLOC, phrase: 'Comment un élève peut-il s\'engager dans son collège ?',
          options: ['En étant éco-délégué', 'En étant réserviste', 'En étant sénateur'], attendu: 'En étant éco-délégué',
          explication: 'Ou délégué de classe : des élèves élus.',
        },
        {
          id: 'emc-etat', type: 'choix', consigne: BLOC, phrase: 'Dans quelles institutions de l\'État peut-on s\'engager, d\'après le manuel ?',
          options: ['La justice, l\'enseignement, l\'armée', 'Les entreprises privées', 'Les clubs de sport'],
          attendu: 'La justice, l\'enseignement, l\'armée',
          explication: 'Servir l\'État, c\'est aussi une forme d\'engagement — l\'armée, par exemple comme réserviste.',
        },
        {
          id: 'emc-jeunes', type: 'choix', consigne: BLOC, phrase: 'Quelle forme d\'engagement est réservée aux jeunes de 16 à 25 ans ?',
          options: ['Le service civique', 'Le mandat de sénateur', 'La présidence de la République'], attendu: 'Le service civique',
          explication: 'Quelques mois de mission d\'intérêt général, volontaire.',
        },
        {
          id: 'emc-motivations', type: 'choix', consigne: BLOC, phrase: 'Laquelle de ces raisons est une motivation de l\'engagement citée par le manuel ?',
          options: ['La préservation de l\'environnement', 'Gagner beaucoup d\'argent', 'Ne plus avoir à voter'],
          attendu: 'La préservation de l\'environnement',
          explication: 'Avec l\'entraide, la défense des droits, la sécurité, l\'éducation et la santé.',
        },
        {
          id: 'emc-individuel', type: 'choix', consigne: BLOC, phrase: 'D\'après le manuel, le bénévolat est un exemple…',
          options: ['d\'engagement individuel', 'd\'action collective', 'de vote'], attendu: 'd\'engagement individuel',
          explication: 'L\'engagement individuel, comme le bénévolat, favorise une prise de conscience.',
        },
        {
          id: 'emc-collectif', type: 'choix', consigne: BLOC, phrase: 'Les grèves, les pétitions et le RIP sont des exemples…',
          options: ['d\'action collective', 'd\'engagement individuel', 'd\'élections'], attendu: 'd\'action collective',
          explication: 'À plusieurs, on a plus de force et de visibilité.',
        },
        {
          id: 'emc-force', type: 'choix', consigne: BLOC, phrase: 'Qu\'apporte l\'action collective, par rapport à l\'engagement individuel ?',
          options: ['Plus de force et de visibilité', 'Plus d\'argent', 'Moins de responsabilités'], attendu: 'Plus de force et de visibilité',
          explication: 'L\'individuel fait prendre conscience ; le collectif pèse davantage.',
        },
        {
          id: 'emc-but', type: 'choix', consigne: BLOC, phrase: 'D\'après la conclusion du manuel, à quoi servent ensemble toutes ces formes d\'engagement ?',
          options: ['À trouver sa place et construire une nation plus juste et solidaire', 'À remplacer les élections', 'À ne plus avoir besoin de lois'],
          attendu: 'À trouver sa place et construire une nation plus juste et solidaire',
          explication: 'C\'est la dernière idée du « Je retiens l\'essentiel ».',
        },
      ],
    },

    {
      id: 'e2-ecrire',
      seance: 2,
      titre: 'Rédiger : les formes d\'engagement',
      sousTitre: 'Un développement construit, comme au brevet',
      duree: 5,
      fiche: [
        {
          type: 'regle',
          titre: 'La carte mentale, en texte',
          lignes: [
            '**Des acteurs divers** : associations, syndicats, élus, armée, justice, enseignement ; pour les jeunes, éco-délégué, service civique.',
            '**Des motivations variées** : participer à la démocratie, promouvoir les valeurs républicaines, défendre une cause.',
            '**Des modes d\'action** : individuel (le bénévolat), collectif (grèves, pétitions), et la participation aux élections.',
            'Mots utiles : *d\'abord, ensuite, enfin, par exemple, car, ainsi.*',
          ],
        },
      ],
      items: [
        {
          id: 'emc-w-formes', type: 'decrire', sujet: 'Montre que l\'engagement citoyen prend des formes variées', emoji: '🤝',
          indices: ['association', 'syndicat', 'éco-délégué', 'service civique', 'élections', 'bénévolat', 'grève', 'pétition', 'liberté, égalité, fraternité', 'défendre une cause'],
          consigne: 'Rédige quelques lignes : où l\'on peut s\'engager (avec des exemples), pourquoi, et la différence entre l\'engagement individuel et l\'action collective.',
          titreModele: 'Une réponse d\'exemple',
          modele: 'L\'engagement citoyen prend des formes très variées. On peut d\'abord s\'engager dans une association, comme les Restos du cœur, dans un syndicat, en politique comme conseiller municipal, ou au service de l\'État, dans l\'armée comme réserviste. Les jeunes peuvent aussi s\'engager, par exemple comme éco-délégué dans leur collège ou en faisant un service civique. Les motivations sont nombreuses : l\'entraide, la défense des droits ou de l\'environnement, et plus largement la volonté de participer à la démocratie et de faire vivre les valeurs de liberté, d\'égalité et de fraternité. Enfin, l\'engagement peut être individuel, comme le bénévolat, qui favorise une prise de conscience, ou collectif, comme une grève ou une pétition, qui donne plus de force et de visibilité.',
          criteres: [
            { id: 'acteurs', texte: 'Au moins deux lieux d\'engagement, avec un exemple : association, syndicat, politique, armée ou État, éco-délégué, service civique, élections' },
            { id: 'motivations', texte: 'Au moins une motivation : entraide, défense des droits, environnement, participer à la démocratie, valeurs républicaines' },
            { id: 'modes', texte: 'La différence entre l\'engagement individuel (bénévolat) et l\'action collective (grève, pétition), qui donne plus de force' },
          ],
        },
      ],
    },
  ],

  // ── Le contrôle blanc ───────────────────────────────────────────────────
  interro: {
    duree: 8,
    tirage: [
      { etape: 'e1-mots', nombre: 3 },
      { etape: 'e1-elections', nombre: 5 },
      { etape: 'e2-mots', nombre: 3 },
      { etape: 'e2-formes', nombre: 4 },
    ],
  },
};
