// Chapitre 1 — L'autobiographie.
//
// D'après le polycopié de 3e d'Evan, « Mise au point sur l'autobiographie »,
// transmis par Denis : le mot et sa définition, l'histoire de l'écriture de
// soi, les destinataires et le pacte, les raisons d'écrire sur soi, les
// difficultés, la sincérité, le temps, les thèmes, les récits de vie, les
// titres, le vocabulaire, et les textes étudiés en classe.
//
// Evan aura un QCM : les questions sont surtout des QCM, plus le vocabulaire
// à retrouver (posé à l'envers au contrôle blanc, comme un QCM) et une
// chronologie à remettre dans l'ordre. Pas de réponse rédigée.
//
// La fiche résume en notes, sans recopier le polycopié (le dépôt est
// public). Les citations viennent d'auteurs du domaine public (Montaigne,
// Pascal, Rousseau, Chateaubriand, Gide, Stendhal, Baudelaire) ; les œuvres
// récentes (Sartre, Leiris, Perec, Sarraute…) sont décrites, jamais citées.
//
// Le polycopié est suivi, même là où on discuterait : « égoïsme » au sens
// de « parler trop de soi », Mémoires d'une jeune fille rangée rangé parmi
// les romans autobiographiques. Deux coquilles sont corrigées : « X. ou les
// souvenirs d'enfance » est W ou le souvenir d'enfance (le polycopié le
// nomme ainsi plus haut), le journal d'« A. Franck » celui d'Anne Frank. Et
// là où il dit que Duras écrit « il » dans L'Amant, la fiche dit « la
// 3e personne » : Duras parle d'elle en disant « elle ».
//
// Les identifiants ne se renumérotent jamais : la progression y est rangée.

const BLOC = 'Choisis la bonne réponse :';

export default {
  id: 'ch01',
  numero: 1,
  titre: 'L\'autobiographie',
  detail: 'Le mot, Lejeune et le pacte · Les récits de vie · L\'histoire de l\'écriture de soi · Les textes du cours · Pourquoi écrire sur soi · La vérité, le temps, les thèmes',

  // Ce que Merlin sait du chapitre (aucune réponse rédigée ici : le profil
  // sert si une étape d'écriture s'ajoute un jour).
  profilMerlin: 'Élève de 3e. Français, cours « Mise au point sur l\'autobiographie ». Le mot : trois mots grecs, autos '
    + '(soi-même), bios (la vie), graphein (écrire) ; apparu vers 1800 en Angleterre et en Allemagne, en France en 1829 ; '
    + 'remplace peu à peu « Mémoires » au XIXe siècle ; au XXe, tout texte où une personne réelle parle de sa vie. '
    + 'Définition de Philippe Lejeune : identité de l\'auteur, du narrateur et du personnage, attestée par le nom sur la '
    + 'couverture ; récit rétrospectif, écart entre le temps vécu et le temps de l\'écriture. Les Mots de Sartre : roman, '
    + 'autobiographie ou parodie ? (premier titre : Autocritique). Pacte autobiographique : l\'auteur sera la matière de son '
    + 'livre et dira toute la vérité ; conclu sans ambiguïté pour la première fois par Rousseau ; épigraphe « Intus et in '
    + 'cute » (intérieurement et sous la peau). Histoire : Delphes « Connais-toi toi-même », Socrate et Platon « rien de '
    + 'trop » ; IIe siècle Marc Aurèle, Pensées ; Ve siècle Saint Augustin, Confessions (conversion, glorifier Dieu) ; '
    + 'XVIe Montaigne, Essais (« un livre de bonne foi », « c\'est moi que je peins ») ; XVIIe Pascal (« le moi est '
    + 'haïssable ») ; XVIIIe Rousseau, Confessions, premier vrai récit autobiographique ; 1789 toute vie vaut d\'être '
    + 'racontée ; XIXe âge d\'or, mal du siècle ; XXe Freud, Proust, Gide, Colette, Sartre, Sarraute, Leiris, Beauvoir, '
    + 'Perec. Destinataires : soi (quête d\'identité), le lecteur (parents et amis pour Montaigne, « mes semblables » pour '
    + 'Rousseau), Dieu (pardon chez Augustin, témoin chez Rousseau). Raisons : se confesser, se justifier, se connaître '
    + '(miroir), transparence (la fessée, le ruban volé, le peigne cassé), témoigner (Chateaubriand), catharsis, narcissisme, '
    + 'vaincre le temps, nostalgie, donner forme à l\'informe. Rousseau distingue vérité des faits et authenticité du '
    + 'sentiment. Sincérité limitée par décence ou discrétion ; publication posthume ; inexactitudes psychologiques ou '
    + 'esthétiques. Journal : écrit au jour le jour ; autobiographie : après coup ; déclencheurs du souvenir : grive '
    + '(Chateaubriand), madeleine (Proust), pervenche (Rousseau) ; « je » narré et « je » narrant ; surimpression ou mise '
    + 'à distance. Énonciation : Sarraute 2e personne, Vallès voix de l\'enfant et de l\'adulte, Duras 3e personne (pacte '
    + 'romanesque). Récits de vie : autobiographie, Mémoires, journal intime, lettre, essai et autoportrait, biographie, '
    + 'roman autobiographique, poésie autobiographique.',

  seances: [
    { numero: 1, partie: 'Les notions', titre: 'Qu\'est-ce qu\'une autobiographie ?' },
    { numero: 2, partie: 'Les œuvres', titre: 'L\'histoire, les titres, les textes' },
    { numero: 3, partie: 'Les enjeux', titre: 'Pourquoi et comment écrire sur soi' },
  ],

  etapes: [
    // ═══ Séance 1 — qu'est-ce qu'une autobiographie ? ═════════════════════

    {
      id: 'a1-mot',
      seance: 1,
      titre: 'Le mot « autobiographie »',
      sousTitre: 'Trois mots grecs, et deux dates',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: 'D\'où vient le mot',
          lignes: [
            'Trois mots **grecs** : **autos** (soi-même), **bios** (la vie), **graphein** (écrire). L\'autobiographie, c\'est **écrire sa vie soi-même**.',
            'Le mot apparaît **vers 1800**, en **Angleterre** et en **Allemagne**. Il arrive en **France** en **1829**.',
            'Au **XIXe siècle**, il remplace peu à peu le mot **« Mémoires »**. On dit aussi écriture **« intime »** ou **« personnelle »**.',
            'Au **XXe siècle**, le mot a du succès : il désigne **tout texte où une personne réelle parle de sa vie**.',
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**autos**, soi-même, comme dans *auto*portrait ; **bios**, la vie, comme dans *bio*logie ; **graphein**, écrire, comme dans ortho*graphe*.',
          ],
        },
      ],
      items: [
        {
          id: 'mot-autos', type: 'choix', consigne: BLOC, phrase: 'Dans « autobiographie », autos veut dire…',
          options: ['soi-même', 'la vie', 'écrire'], attendu: 'soi-même',
          explication: 'autos : soi-même ; bios : la vie ; graphein : écrire.',
        },
        {
          id: 'mot-bios', type: 'choix', consigne: BLOC, phrase: 'Dans « autobiographie », bios veut dire…',
          options: ['la vie', 'soi-même', 'le livre'], attendu: 'la vie',
          explication: 'Comme dans « biologie », la science du vivant.',
        },
        {
          id: 'mot-graphein', type: 'choix', consigne: BLOC, phrase: 'Dans « autobiographie », graphein veut dire…',
          options: ['écrire', 'raconter à voix haute', 'se souvenir'], attendu: 'écrire',
          explication: 'Comme dans « orthographe » : écrire correctement.',
        },
        {
          id: 'mot-langue', type: 'choix', consigne: BLOC, phrase: 'Les trois mots qui forment « autobiographie » sont…',
          options: ['grecs', 'latins', 'anglais'], attendu: 'grecs',
          explication: 'Des mots grecs, même si le mot est né en Angleterre et en Allemagne.',
        },
        {
          id: 'mot-apparu', type: 'choix', consigne: BLOC, phrase: 'Le mot « autobiographie » apparaît vers 1800…',
          options: ['en Angleterre et en Allemagne', 'en France et en Italie', 'en Grèce'], attendu: 'en Angleterre et en Allemagne',
          explication: 'Il n\'arrive en France qu\'en 1829.',
        },
        {
          id: 'mot-france', type: 'choix', consigne: BLOC, phrase: 'Le mot arrive en France, dans un texte imprimé, en…',
          options: ['1829', '1789', '1580'], attendu: '1829',
          explication: '1789, c\'est la Révolution ; 1580, les Essais de Montaigne.',
        },
        {
          id: 'mot-memoires', type: 'choix', consigne: BLOC, phrase: 'Au XIXe siècle, « autobiographie » remplace peu à peu le mot…',
          options: ['« Mémoires »', '« roman »', '« biographie »'], attendu: '« Mémoires »',
          explication: 'Le mot « Mémoires » s\'efface peu à peu devant « autobiographie ».',
        },
        {
          id: 'mot-xxe', type: 'choix', consigne: BLOC, phrase: 'Au XXe siècle, le mot « autobiographie » désigne…',
          options: ['tout texte où une personne réelle parle de sa vie', 'seulement les journaux intimes', 'les romans écrits à la première personne'], attendu: 'tout texte où une personne réelle parle de sa vie',
          explication: 'Quels que soient la fonction et le contenu du texte.',
        },
      ],
    },

    {
      id: 'a1-lejeune',
      seance: 1,
      titre: 'Lejeune et le pacte',
      sousTitre: 'Auteur = narrateur = personnage',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: 'La définition de Philippe Lejeune',
          lignes: [
            '**1. L\'identité de l\'auteur, du narrateur et du personnage** : c\'est la même personne. Le **nom sur la couverture** le prouve. Un narrateur au nom inventé, c\'est une fiction.',
            '**2. Un récit rétrospectif** : l\'auteur raconte **après coup** un passé lointain, forcément **recomposé**. Il y a un **écart** entre le temps vécu et le temps de l\'écriture.',
            'Classer a ses limites : *Les Mots* de **Sartre**, roman, autobiographie, ou parodie d\'autobiographie ? Son premier titre était *Autocritique*.',
          ],
        },
        {
          type: 'regle',
          titre: 'Le pacte autobiographique',
          lignes: [
            'L\'auteur annonce qu\'il sera **la matière de son livre**, et s\'engage à **dire la vérité, toute la vérité** : c\'est le **pacte autobiographique**.',
            '**Rousseau** est le premier à le conclure **sans ambiguïté**, dans les *Confessions*.',
            'Son **épigraphe** (la citation en tête du livre), « **Intus et in cute** », veut dire **« intérieurement et sous la peau »** : il se montrera tout entier.',
          ],
        },
        {
          type: 'piege',
          lignes: [
            'L\'**auteur** est la personne réelle ; le **narrateur** raconte ; le **personnage** vit l\'histoire. Dans une autobiographie, les trois ne font **qu\'un**.',
          ],
        },
      ],
      items: [
        {
          id: 'lj-qui', type: 'choix', consigne: BLOC, phrase: 'La définition de l\'autobiographie retenue par le cours est celle de…',
          options: ['Philippe Lejeune', 'Jean-Jacques Rousseau', 'Marcel Proust'], attendu: 'Philippe Lejeune',
          explication: 'Philippe Lejeune, un spécialiste de l\'autobiographie.',
        },
        {
          id: 'lj-identite', type: 'choix', consigne: BLOC, phrase: 'Selon Lejeune, dans une autobiographie, sont une seule et même personne…',
          options: ['l\'auteur, le narrateur et le personnage', 'le narrateur et le lecteur', 'l\'auteur et l\'éditeur'], attendu: 'l\'auteur, le narrateur et le personnage',
          explication: 'L\'auteur raconte sa propre vie : il est aussi celui qui raconte et celui qui la vit.',
        },
        {
          id: 'lj-preuve', type: 'choix', consigne: BLOC, phrase: 'Ce qui prouve que le narrateur est bien l\'auteur, c\'est…',
          options: ['le nom de l\'auteur sur la couverture', 'l\'emploi du passé simple', 'la préface de l\'éditeur'], attendu: 'le nom de l\'auteur sur la couverture',
          explication: 'Sa signature, son nom ou son pseudonyme — pas un nom inventé donné au narrateur.',
        },
        {
          id: 'lj-t-retro', type: 'terme', definition: 'Un récit fait après coup, quand l\'auteur se retourne sur un passé lointain',
          attendu: 'récit rétrospectif', accepte: ['rétrospectif', 'rétrospection'],
          pieges: [{ si: ['journal intime', 'journal'], message: 'Un journal s\'écrit presque le jour même. Un récit fait après coup, sur un passé lointain : un récit rétrospectif.' }],
        },
        {
          id: 'lj-t-pacte', type: 'terme', definition: 'L\'engagement de l\'auteur envers le lecteur : il sera la matière de son livre, et dira toute la vérité',
          attendu: 'pacte autobiographique', accepte: ['contrat autobiographique', 'pacte de sincérité'],
          pieges: [{ si: ['pacte romanesque'], message: 'Le pacte romanesque, c\'est le choix de la fiction. La promesse de dire la vérité sur soi : le pacte autobiographique.' }],
        },
        {
          id: 'lj-t-epigraphe', type: 'terme', definition: 'Une citation placée en tête d\'un livre, comme « Intus et in cute » au début des Confessions',
          attendu: 'épigraphe',
          pieges: [
            { si: ['incipit'], message: 'L\'incipit, ce sont les premières lignes du texte. La citation placée en tête du livre, avant le texte : l\'épigraphe.' },
            { si: ['préface', 'préambule'], message: 'Une préface est un texte entier. Une simple citation en tête du livre : l\'épigraphe.' },
          ],
        },
        {
          id: 'lj-premier', type: 'choix', consigne: BLOC, phrase: 'Le premier à conclure le pacte autobiographique sans ambiguïté est…',
          options: ['Rousseau', 'Montaigne', 'Saint Augustin'], attendu: 'Rousseau',
          explication: 'Au XVIIIe siècle, dans les Confessions.',
        },
        {
          id: 'lj-intus', type: 'choix', consigne: BLOC, phrase: '« Intus et in cute », l\'épigraphe des Confessions de Rousseau, veut dire…',
          options: ['intérieurement et sous la peau', 'connais-toi toi-même', 'rien de trop'], attendu: 'intérieurement et sous la peau',
          explication: 'Il se montrera tout entier. « Connais-toi toi-même » est inscrit à Delphes ; « rien de trop » vient de Socrate et Platon.',
        },
        {
          id: 'lj-autocritique', type: 'choix', consigne: BLOC, phrase: 'Le premier titre envisagé par Sartre pour Les Mots était…',
          options: ['Autocritique', 'Enfance', 'Moi, je'], attendu: 'Autocritique',
          explication: 'D\'où la question du cours : roman, autobiographie, ou parodie d\'autobiographie ?',
        },
      ],
    },

    {
      id: 'a1-recits',
      seance: 1,
      titre: 'Les récits de vie',
      sousTitre: 'Autobiographie, Mémoires, journal…',
      duree: 4,
      fiche: [
        {
          type: 'tableau',
          titre: 'Reconnaître les récits de vie',
          colonnes: ['Récit', 'Ce qui le distingue', 'Exemples'],
          lignes: [
            ['**autobiographie**', 'récit **rétrospectif** de sa vie ; l\'auteur est **narrateur et personnage**', '*Les Mots* (Sartre), *Confessions* (Rousseau), *Si le grain ne meurt* (Gide)'],
            ['**Mémoires**', 'l\'auteur, **témoin de son temps**, mêle sa vie à **l\'Histoire**', '*Mémoires d\'outre-tombe* (Chateaubriand)'],
            ['**journal intime**', 'écrit **au jour le jour**, **privé**', 'Amiel ; le *Journal* d\'Anne Frank'],
            ['**lettre**', 'le quotidien raconté à quelqu\'un ; **privé**', 'Mme de Sévigné'],
            ['**essai, autoportrait**', '**réflexion sur soi**, en fragments, qui vise **l\'universel**', '*Essais* (Montaigne), *L\'Âge d\'homme* (Leiris)'],
            ['**biographie**', 'la vie d\'**un autre** : l\'auteur est narrateur, **pas personnage**', '*Colette, une certaine France* (Michel del Castillo)'],
            ['**roman autobiographique**', 'l\'auteur **se cache** derrière un narrateur-personnage', '*L\'Enfant* (Vallès), *Le Premier Homme* (Camus), *À la recherche du temps perdu* (Proust)'],
            ['**poésie autobiographique**', 'sa vie, **en poèmes**', '*Feuillets d\'Hypnos* (Char), *Le Roman inachevé* (Aragon)'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Le tableau du cours range aussi parmi les **romans autobiographiques** *Mémoires d\'une jeune fille rangée* (Beauvoir) et *La Confession d\'un enfant du siècle* (Musset) — malgré « Mémoires » et « Confession » dans leurs titres.',
            '*Le Roman inachevé* d\'Aragon n\'est pas un roman : c\'est de la **poésie** autobiographique.',
          ],
        },
      ],
      items: [
        {
          id: 'rv-t-memoires', type: 'terme', definition: 'Un récit de vie où l\'auteur se présente comme témoin de son temps, et mêle sa vie à l\'Histoire',
          attendu: 'Mémoires',
          pieges: [{ si: ['autobiographie'], message: 'Une autobiographie raconte la vie d\'une personne. Quand l\'auteur se fait témoin de son époque, de l\'Histoire : ce sont des Mémoires.' }],
        },
        {
          id: 'rv-t-journal', type: 'terme', definition: 'Un récit de vie écrit au jour le jour, pour soi : le temps de l\'écriture est presque celui des faits',
          attendu: 'journal intime', accepte: ['journal'],
          pieges: [{ si: ['autobiographie'], message: 'L\'autobiographie s\'écrit après coup, des années plus tard. Au jour le jour : le journal intime.' }],
        },
        {
          id: 'rv-t-biographie', type: 'terme', definition: 'Le récit de la vie d\'une autre personne : l\'auteur en est le narrateur, mais pas le personnage',
          attendu: 'biographie',
          pieges: [{ si: ['autobiographie'], message: 'Dans une autobiographie, l\'auteur raconte SA vie. La vie d\'un autre : une biographie.' }],
        },
        {
          id: 'rv-t-roman', type: 'terme', definition: 'Un récit où l\'auteur raconte sa vie en se cachant derrière un narrateur-personnage au nom inventé',
          attendu: 'roman autobiographique',
          pieges: [{ si: ['autobiographie'], message: 'Dans une autobiographie, l\'auteur, le narrateur et le personnage portent le même nom. S\'il se cache derrière un personnage inventé : un roman autobiographique.' }],
        },
        {
          id: 'rv-enfant', type: 'choix', consigne: BLOC, phrase: 'Selon le tableau du cours, L\'Enfant de Vallès est…',
          options: ['un roman autobiographique', 'une autobiographie', 'des Mémoires'], attendu: 'un roman autobiographique',
          explication: 'Vallès se cache derrière un narrateur au nom inventé, Jacques Vingtras.',
        },
        {
          id: 'rv-frank', type: 'choix', consigne: BLOC, phrase: 'Anne Frank, cachée pendant la guerre, a écrit…',
          options: ['un journal intime', 'des Mémoires', 'une biographie'], attendu: 'un journal intime',
          explication: 'Au jour le jour, pour elle-même — comme Amiel.',
        },
        {
          id: 'rv-sevigne', type: 'choix', consigne: BLOC, phrase: 'Mme de Sévigné est l\'exemple du cours pour…',
          options: ['la lettre', 'le journal intime', 'la poésie autobiographique'], attendu: 'la lettre',
          explication: 'Ses lettres racontent son quotidien.',
        },
        {
          id: 'rv-essais', type: 'choix', consigne: BLOC, phrase: 'Dans le tableau, les Essais de Montaigne sont…',
          options: ['un essai, un autoportrait', 'une autobiographie', 'des Mémoires'], attendu: 'un essai, un autoportrait',
          explication: 'Une réflexion sur soi, en fragments, qui vise l\'universel — comme L\'Âge d\'homme de Leiris.',
        },
        {
          id: 'rv-beauvoir', type: 'choix', consigne: BLOC, phrase: 'Le tableau du cours range Mémoires d\'une jeune fille rangée (Beauvoir) parmi…',
          options: ['les romans autobiographiques', 'les Mémoires', 'les journaux intimes'], attendu: 'les romans autobiographiques',
          explication: 'Malgré le mot « Mémoires » dans son titre — avec La Confession d\'un enfant du siècle de Musset.',
        },
        {
          id: 'rv-aragon', type: 'choix', consigne: BLOC, phrase: 'Feuillets d\'Hypnos (Char) et Le Roman inachevé (Aragon) sont…',
          options: ['de la poésie autobiographique', 'des romans autobiographiques', 'des journaux intimes'], attendu: 'de la poésie autobiographique',
          explication: 'Le Roman inachevé n\'est pas un roman : ce sont des poèmes.',
        },
      ],
    },

    {
      id: 'a1-vocabulaire',
      seance: 1,
      titre: 'Les mots pour parler de soi',
      sousTitre: 'Égocentrisme, égoïsme, égotisme…',
      duree: 2,
      fiche: [
        {
          type: 'tableau',
          titre: 'Le vocabulaire du cours',
          colonnes: ['Mot', 'D\'où il vient', 'Ce qu\'il veut dire'],
          lignes: [
            ['**égocentrisme**', '*ego* (moi) + centre', 'être **centré sur soi**, ne voir le monde qu\'à travers soi'],
            ['**égoïsme**', '*ego* (moi)', 'au sens du cours : **parler trop de soi**, tout rapporter à soi'],
            ['**égotisme**', 'un mot **anglais**', '**Stendhal** le met dans un titre (*Souvenirs d\'égotisme*) ; aujourd\'hui, l\'**analyse détaillée de sa personnalité**'],
            ['**individualisme**', 'individuel', 'le goût de l\'**initiative**, de la réflexion personnelle, de l\'**indépendance**'],
            ['**introspection**', 'latin *introspicere*, **regarder à l\'intérieur**', 'l\'**observation de sa conscience** par soi-même'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Égo**ï**sme et égo**t**isme : une lettre d\'écart. L\'égo**t**isme, c\'est le mot anglais de **Stendhal**.',
          ],
        },
      ],
      items: [
        {
          id: 'vo-t-egocentrisme', type: 'terme', definition: 'La tendance à être centré sur soi, et à ne voir le monde extérieur qu\'en fonction de soi (ego, « moi », et centre)',
          attendu: 'égocentrisme',
          pieges: [{ si: ['égoïsme', 'égotisme'], message: 'Ego et centre : être centré sur soi, c\'est l\'égocentrisme.' }],
        },
        {
          id: 'vo-t-egoisme', type: 'terme', definition: 'Au sens du cours : la disposition à parler trop de soi',
          attendu: 'égoïsme',
          pieges: [
            { si: ['égotisme'], message: 'L\'égotisme, c\'est le mot anglais de Stendhal. Au sens du cours, parler trop de soi : l\'égoïsme.' },
            { si: ['égocentrisme'], message: 'L\'égocentrisme, c\'est être centré sur soi. Parler trop de soi, au sens du cours : l\'égoïsme.' },
          ],
        },
        {
          id: 'vo-t-egotisme', type: 'terme', definition: 'Un mot anglais que Stendhal met dans un titre ; aujourd\'hui, l\'analyse détaillée de sa propre personnalité',
          attendu: 'égotisme',
          pieges: [{ si: ['égoïsme', 'egoisme'], message: 'Une lettre d\'écart : le mot anglais de Stendhal, c\'est l\'égoTisme.' }],
        },
        {
          id: 'vo-t-individualisme', type: 'terme', definition: 'L\'attitude qui favorise l\'initiative et la réflexion individuelles, le goût de l\'indépendance',
          attendu: 'individualisme',
        },
        {
          id: 'vo-t-introspection', type: 'terme', definition: 'L\'observation d\'une conscience par elle-même (du latin « regarder à l\'intérieur »)',
          attendu: 'introspection',
          pieges: [{ si: ['rétrospection', 'rétrospective'], message: 'La rétrospection regarde en arrière, vers le passé. Regarder à l\'intérieur de soi : l\'introspection.' }],
        },
      ],
    },

    // ═══ Séance 2 — l'histoire, les titres, les textes ═══════════════════

    {
      id: 'a2-histoire',
      seance: 2,
      titre: 'L\'écriture de soi, de l\'Antiquité au XXe siècle',
      sousTitre: 'Delphes, Augustin, Montaigne, Pascal, Rousseau…',
      duree: 5,
      fiche: [
        {
          type: 'tableau',
          titre: 'Les étapes',
          colonnes: ['Quand', 'Qui', 'À retenir'],
          lignes: [
            ['**Antiquité**', 'Delphes ; Socrate et Platon', '« **Connais-toi toi-même** », inscrit sur le temple d\'Apollon ; mais « **rien de trop** »'],
            ['**IIe siècle**', '**Marc Aurèle**, *Pensées*', 'le journal d\'un empereur romain qui se parle à lui-même (le stoïcisme)'],
            ['**Ve siècle**', '**Saint Augustin**, *Confessions*', '13 livres : sa **conversion** au christianisme, pour **glorifier Dieu**'],
            ['**XVIe siècle**', '**Montaigne**, *Essais*', 'une avancée décisive : « un livre de **bonne foi** », « c\'est **moi que je peins** »'],
            ['**XVIIe siècle**', '**Pascal**', 'il condamne « le **sot projet** » de Montaigne : « **le moi est haïssable** »'],
            ['**XVIIIe siècle**', '**Rousseau**, *Confessions*', 'une entreprise « qui n\'eut jamais d\'exemple » : le **premier vrai récit autobiographique**'],
            ['**XIXe siècle**', 'l\'**âge d\'or**', 'le « **mal du siècle** » ; deux mots d\'ordre : **individualité** et **originalité**'],
            ['**XXe siècle**', '**Freud** ; Proust, Gide, Colette, Sartre, Sarraute, Leiris, Beauvoir, Perec…', 'plus de pudeur : une floraison d\'œuvres'],
          ],
        },
        {
          type: 'regle',
          titre: 'Deux idées',
          lignes: [
            'L\'autobiographie est propre à la culture **occidentale** : héritière des Grecs, des Latins, et de l\'**examen de conscience** chrétien.',
            'Dès **1789**, une idée nouvelle : **toute vie, même modeste, vaut d\'être racontée**.',
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Deux *Confessions* : celles de **Saint Augustin** (Ve siècle, pour glorifier Dieu) et celles de **Rousseau** (XVIIIe siècle, le premier vrai récit autobiographique).',
            'Deux *Pensées* : celles de **Marc Aurèle** (IIe siècle) et celles de **Pascal** (XVIIe siècle).',
          ],
        },
      ],
      items: [
        {
          id: 'hi-delphes', type: 'choix', consigne: BLOC, phrase: 'La formule « Connais-toi toi-même » est inscrite…',
          options: ['sur le temple d\'Apollon, à Delphes', 'en tête des Essais de Montaigne', 'au début des Confessions de Rousseau'], attendu: 'sur le temple d\'Apollon, à Delphes',
          explication: 'Dans l\'Antiquité grecque : les premiers pas de l\'écriture de soi.',
        },
        {
          id: 'hi-rien', type: 'choix', consigne: BLOC, phrase: 'Socrate et Platon invitent à se connaître, mais avec modération :',
          options: ['« rien de trop »', '« le moi est haïssable »', '« intus et in cute »'], attendu: '« rien de trop »',
          explication: '« Le moi est haïssable » est de Pascal ; « intus et in cute », l\'épigraphe de Rousseau.',
        },
        {
          id: 'hi-marc', type: 'choix', consigne: BLOC, phrase: 'Au IIe siècle, l\'empereur Marc Aurèle écrit…',
          options: ['ses Pensées', 'ses Confessions', 'ses Essais'], attendu: 'ses Pensées',
          explication: 'Le journal d\'un empereur qui se parle à lui-même. (Pascal aussi a écrit des Pensées, au XVIIe siècle.)',
        },
        {
          id: 'hi-augustin', type: 'choix', consigne: BLOC, phrase: 'Dans ses Confessions, Saint Augustin raconte…',
          options: ['sa conversion au christianisme', 'sa rencontre avec Bonaparte', 'son enfance à Grenoble'], attendu: 'sa conversion au christianisme',
          explication: 'Au Ve siècle, en treize livres, pour glorifier Dieu.',
        },
        {
          id: 'hi-augustin-siecle', type: 'choix', consigne: BLOC, phrase: 'Les Confessions de Saint Augustin datent du…',
          options: ['Ve siècle', 'XVIIIe siècle', 'XVIe siècle'], attendu: 'Ve siècle',
          explication: 'Celles de Rousseau datent du XVIIIe siècle.',
        },
        {
          id: 'hi-montaigne', type: 'choix', consigne: BLOC, phrase: 'Montaigne écrit les Essais au…',
          options: ['XVIe siècle', 'XVIIe siècle', 'XVIIIe siècle'], attendu: 'XVIe siècle',
          explication: 'L\'avis « Au lecteur » est daté de 1580.',
        },
        {
          id: 'hi-pascal', type: 'choix', consigne: BLOC, phrase: '« Le moi est haïssable » : c\'est…',
          options: ['Pascal, au XVIIe siècle', 'Montaigne, au XVIe siècle', 'Rousseau, au XVIIIe siècle'], attendu: 'Pascal, au XVIIe siècle',
          explication: 'Pascal reproche à Montaigne son « sot projet » de se peindre : le siècle classique se veut discret.',
        },
        {
          id: 'hi-rousseau', type: 'choix', consigne: BLOC, phrase: 'Le premier vrai récit autobiographique, une vie racontée depuis ses premiers jours, ce sont…',
          options: ['les Confessions de Rousseau', 'les Confessions de Saint Augustin', 'les Essais de Montaigne'], attendu: 'les Confessions de Rousseau',
          explication: 'Au XVIIIe siècle : une entreprise « qui n\'eut jamais d\'exemple », dit Rousseau.',
        },
        {
          id: 'hi-1789', type: 'choix', consigne: BLOC, phrase: 'Dès 1789, une idée nouvelle apparaît :',
          options: ['toute vie, même modeste, vaut d\'être racontée', 'le moi est haïssable', 'seuls les rois peuvent raconter leur vie'], attendu: 'toute vie, même modeste, vaut d\'être racontée',
          explication: 'Une revendication sociale et politique, au moment de la Révolution.',
        },
        {
          id: 'hi-age-or', type: 'choix', consigne: BLOC, phrase: 'L\'âge d\'or de l\'autobiographie, c\'est le…',
          options: ['XIXe siècle', 'XVIIe siècle', 'XVIe siècle'], attendu: 'XIXe siècle',
          explication: 'Le siècle du « mal du siècle », de l\'individualité et de l\'originalité.',
        },
        {
          id: 'hi-freud', type: 'choix', consigne: BLOC, phrase: 'Au XXe siècle, la pudeur disparaît, sous l\'influence déterminante de…',
          options: ['Freud', 'Pascal', 'Saint Augustin'], attendu: 'Freud',
          explication: 'Freud et la psychanalyse : l\'exploration de l\'inconscient.',
        },
        {
          id: 'hi-ordre', type: 'ordre', consigne: 'Range ces écrits de soi, du plus ancien au plus récent :',
          elements: ['les Pensées de Marc Aurèle', 'les Confessions de Saint Augustin', 'les Essais de Montaigne', 'les Confessions de Rousseau', 'Les Mots de Sartre'],
        },
      ],
    },

    {
      id: 'a2-titres',
      seance: 2,
      titre: 'Lire un titre',
      sousTitre: 'Les œuvres, leurs auteurs, leurs dates',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: 'Ce que dit le titre',
          lignes: [
            '**Le souvenir** : *Mémoires d\'outre-tombe*, *Mémoires d\'une jeune fille rangée*, *Je me souviens* (Perec) — ou son **refus** : *Antimémoires* (Malraux).',
            '**L\'enfance** : *L\'Enfant*, *W ou le souvenir d\'enfance*, *Enfance*.',
            '**Le but affiché** : *Confessions*, pour **avouer** ; *Essais*, pour **tenter de se dire** ; *Moi, je*.',
            '**Un simple titre de roman**, qui n\'annonce rien : *Sido*, *Si le grain ne meurt*, *Les Mots*.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Les œuvres du cours, dans l\'ordre',
          colonnes: ['Titre', 'Auteur', 'Date'],
          lignes: [
            ['*Essais*', 'Montaigne', '1580'],
            ['*Confessions*', 'Rousseau', '1762-1770'],
            ['*Mémoires d\'outre-tombe*', 'Chateaubriand', '1848'],
            ['*L\'Enfant*', 'Jules Vallès', '1879'],
            ['*Si le grain ne meurt*', 'André Gide', '1916-1921'],
            ['*Sido*', 'Colette', '1930'],
            ['*Mémoires d\'une jeune fille rangée*', 'Simone de Beauvoir', '1958'],
            ['*Les Mots*', 'Jean-Paul Sartre', '1964'],
            ['*Antimémoires*', 'André Malraux', '1967'],
            ['*Moi, je*', 'Claude Roy', '1969'],
            ['*W ou le souvenir d\'enfance*', 'Georges Perec', '1975'],
            ['*Enfance*', 'Nathalie Sarraute', '1983'],
          ],
        },
      ],
      items: [
        {
          id: 'ti-souvenir', type: 'choix', consigne: BLOC, phrase: 'Mémoires d\'outre-tombe, Je me souviens : ces titres renvoient…',
          options: ['au souvenir', 'à l\'enfance', 'à un simple titre de roman'], attendu: 'au souvenir',
          explication: 'Des mots du champ lexical du souvenir : « Mémoires », « je me souviens ».',
        },
        {
          id: 'ti-antimemoires', type: 'choix', consigne: BLOC, phrase: 'Le titre Antimémoires (Malraux, 1967) exprime…',
          options: ['le refus du souvenir', 'l\'amour de l\'enfance', 'le désir d\'avouer'], attendu: 'le refus du souvenir',
          explication: '« Anti » : contre les Mémoires.',
        },
        {
          id: 'ti-confessions', type: 'choix', consigne: BLOC, phrase: 'Le titre Confessions affiche un but :',
          options: ['avouer', 'témoigner de son époque', 'se souvenir de son enfance'], attendu: 'avouer',
          explication: 'Se confesser, c\'est avouer ses fautes. Les Essais, eux, tentent de se dire.',
        },
        {
          id: 'ti-roman', type: 'choix', consigne: BLOC, phrase: 'Lequel de ces titres ressemble à un simple titre de roman ?',
          options: ['Si le grain ne meurt', 'Enfance', 'Mémoires d\'outre-tombe'], attendu: 'Si le grain ne meurt',
          explication: 'Comme Sido et Les Mots : rien n\'y annonce une autobiographie.',
        },
        {
          id: 'ti-enfance', type: 'choix', consigne: BLOC, phrase: 'Enfance (1983) est l\'autobiographie de…',
          options: ['Nathalie Sarraute', 'Simone de Beauvoir', 'Colette'], attendu: 'Nathalie Sarraute',
          explication: 'Celle où deux voix dialoguent.',
        },
        {
          id: 'ti-lenfant', type: 'choix', consigne: BLOC, phrase: 'L\'Enfant (1879) est de…',
          options: ['Jules Vallès', 'Georges Perec', 'André Gide'], attendu: 'Jules Vallès',
          explication: 'Un roman autobiographique : Vallès se cache derrière Jacques Vingtras.',
        },
        {
          id: 'ti-perec', type: 'choix', consigne: BLOC, phrase: 'W ou le souvenir d\'enfance (1975) est de…',
          options: ['Georges Perec', 'Nathalie Sarraute', 'Jules Vallès'], attendu: 'Georges Perec',
          explication: 'Perec a aussi écrit Je me souviens.',
        },
        {
          id: 'ti-sido', type: 'choix', consigne: BLOC, phrase: 'Sido (1930) est de…',
          options: ['Colette', 'George Sand', 'Simone de Beauvoir'], attendu: 'Colette',
          explication: 'Un titre qui ressemble à un titre de roman.',
        },
        {
          id: 'ti-mots-date', type: 'choix', consigne: BLOC, phrase: 'Les Mots de Sartre paraissent en…',
          options: ['1964', '1848', '1983'], attendu: '1964',
          explication: '1848 : les Mémoires d\'outre-tombe ; 1983 : Enfance.',
        },
      ],
    },

    {
      id: 'a2-textes',
      seance: 2,
      titre: 'Les textes du cours',
      sousTitre: 'Qui a écrit quel extrait ?',
      duree: 4,
      fiche: [
        {
          type: 'tableau',
          titre: 'Les extraits étudiés',
          colonnes: ['Auteur, œuvre', 'Ce qui s\'y passe'],
          lignes: [
            ['**Rousseau**, *Confessions* (début)', 'une entreprise « qui n\'eut jamais d\'exemple » ; au **Jugement dernier**, il se présentera devant le « **souverain juge** », son livre à la main'],
            ['**Rousseau**, *Confessions*, livre VI', 'la **pervenche**, vue avec **Mme de Warens**, revue près de **trente ans** plus tard : un cri de joie'],
            ['**Chateaubriand**, *Mémoires d\'outre-tombe* (fin)', 'le **16 novembre 1841**, son « monument » est achevé : l\'ancien monde finit, le nouveau commence ; il attend la mort'],
            ['**Chateaubriand**, *Mémoires d\'outre-tombe*', 'la rencontre avec **Bonaparte**, qui l\'appelle par son nom devant la foule et lui parle de l\'Égypte'],
            ['**Montaigne**, *Essais*, « Au lecteur »', '1580 : « un livre de **bonne foi** », pour ses **parents et amis** ; « je suis moi-même la **matière** de mon livre »'],
            ['**Sartre**, *Les Mots*', 'il commence sa vie **au milieu des livres** de son **grand-père** ; puis une **généalogie** qui déprécie sa famille'],
            ['**Leiris**, *L\'Âge d\'homme*', 'une **opération à la gorge**, enfant : il se sent **trompé par les adultes** ; violence et angoisse'],
            ['**Gide**, *Si le grain ne meurt*', '« Je naquis le **22 novembre 1869** » ; il avoue ce qui lui fera du tort : son récit se veut **véridique**'],
            ['**Stendhal**, *Vie de Henry Brulard*', 'un bonheur parfait aux **Échelles**, loin de **Grenoble** ; un souvenir **comme une fresque** dont des morceaux sont tombés'],
            ['**George Sand**, *Histoire de ma vie*', 'son **nom d\'écrivain**, qu\'elle s\'est fait elle-même, par son **travail**'],
            ['**Perec**, *W ou le souvenir d\'enfance*', 'des souvenirs **sans repères**, sans chronologie : un **enfant juif** pendant l\'**Occupation**'],
            ['**Sarraute**, *Enfance*', '**deux voix** dialoguent : l\'une raconte, l\'autre **doute** et la pousse plus loin'],
            ['**Proust**, *Du côté de chez Swann*', 'la **madeleine** trempée dans le thé fait revenir **Combray** et la **tante Léonie**'],
          ],
        },
      ],
      items: [
        {
          id: 'tx-souverain', type: 'choix', consigne: BLOC, phrase: 'Au début des Confessions, Rousseau imagine qu\'il se présentera, son livre à la main, devant…',
          options: ['le souverain juge, au Jugement dernier', 'le roi Louis XV', 'ses parents et amis'], attendu: 'le souverain juge, au Jugement dernier',
          explication: 'Dieu, « l\'Être éternel », témoin de sa sincérité.',
        },
        {
          id: 'tx-pervenche', type: 'choix', consigne: BLOC, phrase: 'En voyant de la pervenche, Rousseau retrouve…',
          options: ['une promenade avec Mme de Warens, près de trente ans plus tôt', 'le goût d\'une madeleine trempée dans le thé', 'le chant d\'une grive'], attendu: 'une promenade avec Mme de Warens, près de trente ans plus tôt',
          explication: 'Un si petit objet, une si grande émotion : le souvenir revient d\'un coup.',
        },
        {
          id: 'tx-1841', type: 'choix', consigne: BLOC, phrase: 'Chateaubriand écrit les dernières lignes des Mémoires d\'outre-tombe le 16 novembre…',
          options: ['1841', '1789', '1580'], attendu: '1841',
          explication: 'Il voit finir l\'ancien monde et commencer le nouveau.',
        },
        {
          id: 'tx-bonaparte', type: 'choix', consigne: BLOC, phrase: 'Dans un extrait des Mémoires d\'outre-tombe, Chateaubriand raconte sa rencontre avec…',
          options: ['Bonaparte', 'Rousseau', 'Louis XVI'], attendu: 'Bonaparte',
          explication: 'Bonaparte l\'appelle par son nom devant la foule, et garde la parole.',
        },
        {
          id: 'tx-montaigne', type: 'choix', consigne: BLOC, phrase: 'Montaigne dit avoir écrit les Essais pour…',
          options: ['ses parents et amis', 'sa gloire', 'le roi'], attendu: 'ses parents et amis',
          explication: 'Qu\'ils retrouvent des traits de lui après sa mort. Pas pour sa gloire.',
        },
        {
          id: 'tx-sartre', type: 'choix', consigne: BLOC, phrase: 'Au début des Mots, Sartre dit avoir commencé sa vie…',
          options: ['au milieu des livres', 'à la campagne', 'dans une pension de famille'], attendu: 'au milieu des livres',
          explication: 'Dans le bureau de son grand-père.',
        },
        {
          id: 'tx-leiris', type: 'choix', consigne: BLOC, phrase: 'Dans L\'Âge d\'homme, le souvenir le plus pénible de Leiris est…',
          options: ['une opération à la gorge, où il se sent trompé par les adultes', 'un peigne cassé dont on l\'accuse', 'sa rencontre avec Bonaparte'], attendu: 'une opération à la gorge, où il se sent trompé par les adultes',
          explication: 'Le peigne cassé est un aveu des Confessions de Rousseau.',
        },
        {
          id: 'tx-gide', type: 'choix', consigne: BLOC, phrase: '« Je naquis le 22 novembre 1869 » : c\'est le début de…',
          options: ['Si le grain ne meurt, de Gide', 'Les Mots, de Sartre', 'Enfance, de Sarraute'], attendu: 'Si le grain ne meurt, de Gide',
          explication: 'Un début classique : la date de naissance.',
        },
        {
          id: 'tx-stendhal', type: 'choix', consigne: BLOC, phrase: 'Dans Vie de Henry Brulard, Stendhal compare un souvenir à…',
          options: ['une fresque dont de grands morceaux sont tombés', 'une madeleine trempée dans le thé', 'un miroir'], attendu: 'une fresque dont de grands morceaux sont tombés',
          explication: 'Des images très claires, et des manques.',
        },
        {
          id: 'tx-sand', type: 'choix', consigne: BLOC, phrase: 'Dans Histoire de ma vie, George Sand parle…',
          options: ['du nom d\'écrivain qu\'elle s\'est fait par son travail', 'de sa conversion au christianisme', 'de sa rencontre avec Bonaparte'], attendu: 'du nom d\'écrivain qu\'elle s\'est fait par son travail',
          explication: 'Un nom qu\'elle a « fait elle-même », dit-elle.',
        },
        {
          id: 'tx-perec', type: 'choix', consigne: BLOC, phrase: 'Dans W ou le souvenir d\'enfance, les souvenirs de Perec pendant l\'Occupation sont…',
          options: ['sans repères ni chronologie', 'datés au jour près', 'rassemblés autour d\'une madeleine'], attendu: 'sans repères ni chronologie',
          explication: 'Ceux d\'un enfant juif déplacé de lieu en lieu : un vide, presque une amnésie.',
        },
        {
          id: 'tx-sarraute', type: 'choix', consigne: BLOC, phrase: 'Dans Enfance, Nathalie Sarraute fait dialoguer…',
          options: ['deux voix : l\'une raconte, l\'autre doute', 'l\'enfant et sa mère', 'le narrateur et Dieu'], attendu: 'deux voix : l\'une raconte, l\'autre doute',
          explication: 'La seconde voix critique la première et la pousse à aller plus loin.',
        },
        {
          id: 'tx-proust', type: 'choix', consigne: BLOC, phrase: 'Chez Proust, la madeleine trempée dans le thé fait revenir…',
          options: ['Combray et la tante Léonie', 'Grenoble et la tante Séraphie', 'les bois de Combourg'], attendu: 'Combray et la tante Léonie',
          explication: 'Dans Du côté de chez Swann. Séraphie, c\'est la tante de Stendhal ; Combourg, Chateaubriand.',
        },
      ],
    },

    // ═══ Séance 3 — pourquoi et comment écrire sur soi ═══════════════════

    {
      id: 'a3-pourquoi',
      seance: 3,
      titre: 'Pour qui, pourquoi écrire sur soi ?',
      sousTitre: 'Les destinataires, les raisons',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: 'Trois destinataires',
          lignes: [
            '**Soi-même** : en racontant sa vie, l\'auteur cherche **qui il est** — une **quête d\'identité**.',
            '**Le lecteur** : des **proches** pour Montaigne (« mes parents et amis ») ; tous les hommes pour Rousseau, « **mes semblables** », à la fois **juges** et compagnons.',
            '**Dieu** : l\'autobiographie est souvent **confession**. Saint Augustin lui demande **pardon** ; chez Rousseau, l\'« Être éternel » est plutôt un **témoin** de sa sincérité.',
          ],
        },
        {
          type: 'regle',
          titre: 'Les raisons d\'écrire',
          lignes: [
            '**Se confesser**, demander pardon ; **se justifier** ; **se connaître** : le livre est un **miroir**.',
            'Chercher la **transparence** : les aveux des *Confessions* (la **fessée**, le **ruban volé**, le **peigne cassé**).',
            '**Témoigner** : éclairer la postérité sur son époque (**Chateaubriand**) ; laisser un portrait de soi.',
            'Des raisons plus obscures : la **catharsis**, un peu de **narcissisme**, **vaincre le temps** (la **nostalgie**), **donner forme à l\'informe** (Sarraute).',
          ],
        },
      ],
      items: [
        {
          id: 'po-t-catharsis', type: 'terme', definition: 'La libération, le soulagement qu\'on éprouve en se confiant, en disant ce qu\'on a sur le cœur',
          attendu: 'catharsis',
          pieges: [{ si: ['confession'], message: 'La confession, c\'est l\'aveu ; la libération qu\'il apporte, c\'est la catharsis.' }],
        },
        {
          id: 'po-t-narcissisme', type: 'terme', definition: 'La complaisance envers sa propre image, le plaisir de se contempler',
          attendu: 'narcissisme',
        },
        {
          id: 'po-t-nostalgie', type: 'terme', definition: 'Le regret mêlé de tendresse d\'un passé qui ne reviendra pas',
          attendu: 'nostalgie',
        },
        {
          id: 'po-soi', type: 'choix', consigne: BLOC, phrase: 'Quand l\'auteur écrit pour lui-même, il est en quête…',
          options: ['de son identité', 'de gloire', 'de lecteurs'], attendu: 'de son identité',
          explication: 'Raconter sa vie, c\'est chercher qui l\'on est.',
        },
        {
          id: 'po-semblables', type: 'choix', consigne: BLOC, phrase: 'Rousseau veut montrer un homme dans toute sa vérité à…',
          options: ['« mes semblables »', '« mes parents et amis »', '« mon roi »'], attendu: '« mes semblables »',
          explication: 'Tous les hommes. Montaigne, lui, écrit pour ses parents et amis.',
        },
        {
          id: 'po-dieu', type: 'choix', consigne: BLOC, phrase: 'Dans les Confessions de Rousseau, Dieu, « l\'Être éternel », est surtout…',
          options: ['un témoin de sa sincérité', 'celui dont il implore le pardon', 'le seul destinataire du livre'], attendu: 'un témoin de sa sincérité',
          explication: 'C\'est Saint Augustin qui implore le pardon de Dieu.',
        },
        {
          id: 'po-aveux', type: 'choix', consigne: BLOC, phrase: 'Lequel de ces aveux est raconté dans les Confessions de Rousseau ?',
          options: ['le ruban volé', 'l\'opération à la gorge', 'la madeleine'], attendu: 'le ruban volé',
          explication: 'Les trois aveux clés : la fessée, le ruban volé, le peigne cassé.',
        },
        {
          id: 'po-chateaubriand', type: 'choix', consigne: BLOC, phrase: 'Chateaubriand écrit pour…',
          options: ['éclairer la postérité sur son époque', 'demander pardon à Dieu', 'se moquer de son enfance'], attendu: 'éclairer la postérité sur son époque',
          explication: 'Il a été témoin de la Révolution et de l\'Empire : des Mémoires.',
        },
        {
          id: 'po-miroir', type: 'choix', consigne: BLOC, phrase: 'Quand le livre aide l\'auteur à se connaître, il agit comme…',
          options: ['un miroir', 'un tribunal', 'une lettre'], attendu: 'un miroir',
          explication: 'L\'autobiographie est un témoignage pour le public, et un miroir pour l\'auteur.',
        },
      ],
    },

    {
      id: 'a3-verite',
      seance: 3,
      titre: 'Dire vrai',
      sousTitre: 'La mémoire, la sincérité, l\'exactitude',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: 'Les difficultés',
          lignes: [
            'Le **moi vivant** (*hic et nunc* : **ici et maintenant**) n\'est pas le **moi qui écrit**.',
            'La **mémoire** est incertaine. **Rousseau** distingue la **vérité des faits** et l\'**authenticité du sentiment** : c\'est la seconde qui compte (« **Je sens mon cœur et je connais les hommes** »).',
            'L\'entreprise vaut pourtant la peine : l\'autobiographie est le **récit achevé d\'une vie inachevée**.',
          ],
        },
        {
          type: 'regle',
          titre: 'La sincérité, l\'exactitude',
          lignes: [
            'L\'auteur peut manquer à sa promesse de tout dire, par **décence** (pudeur, censure) ou par **discrétion** (ne pas nuire aux autres, respecter ses proches, ne pas lasser le lecteur).',
            'La franchise est plus grande quand le livre doit paraître **après la mort** de l\'auteur : une publication **posthume**.',
            'Les erreurs ont des causes **psychologiques** (caprices de la mémoire, illusions sur soi, oublis) ou **esthétiques** (scènes **embellies**, faits recomposés, détails sacrifiés à l\'harmonie).',
          ],
        },
      ],
      items: [
        {
          id: 've-t-posthume', type: 'terme', definition: 'Se dit d\'une œuvre publiée après la mort de son auteur',
          attendu: 'posthume', accepte: ['publication posthume'],
        },
        {
          id: 've-t-hicetnunc', type: 'terme', definition: 'Une expression latine qui veut dire « ici et maintenant »',
          attendu: 'hic et nunc',
          pieges: [{ si: ['intus et in cute'], message: '« Intus et in cute » : intérieurement et sous la peau, l\'épigraphe de Rousseau. Ici et maintenant : « hic et nunc ».' }],
        },
        {
          id: 've-rousseau', type: 'choix', consigne: BLOC, phrase: 'Face aux trous de sa mémoire, Rousseau tient avant tout à…',
          options: ['l\'authenticité du sentiment', 'la vérité exacte des faits', 'des documents d\'archives'], attendu: 'l\'authenticité du sentiment',
          explication: 'Il peut se tromper sur un fait, pas sur ce qu\'il a ressenti.',
        },
        {
          id: 've-coeur', type: 'choix', consigne: BLOC, phrase: '« Je sens mon cœur et je connais les hommes » : c\'est…',
          options: ['Rousseau', 'Montaigne', 'Pascal'], attendu: 'Rousseau',
          explication: 'Au tout début des Confessions.',
        },
        {
          id: 've-decence', type: 'choix', consigne: BLOC, phrase: 'Un autobiographe qui tait des scènes intimes par pudeur manque de sincérité par…',
          options: ['décence', 'discrétion', 'oubli'], attendu: 'décence',
          explication: 'La décence : la pudeur, la censure. La discrétion : ne pas nuire aux autres.',
        },
        {
          id: 've-discretion', type: 'choix', consigne: BLOC, phrase: 'Un autobiographe qui tait un secret pour ne pas nuire à ses proches le fait par…',
          options: ['discrétion', 'décence', 'narcissisme'], attendu: 'discrétion',
          explication: 'Respecter la mémoire de ses proches, ne pas les blesser.',
        },
        {
          id: 've-psy', type: 'choix', consigne: BLOC, phrase: 'Un souvenir déformé par les caprices de la mémoire : c\'est une inexactitude…',
          options: ['psychologique', 'esthétique', 'volontaire'], attendu: 'psychologique',
          explication: 'Comme les illusions sur soi et les oublis.',
        },
        {
          id: 've-esthetique', type: 'choix', consigne: BLOC, phrase: 'Une scène volontairement embellie : c\'est une inexactitude…',
          options: ['esthétique', 'psychologique', 'historique'], attendu: 'esthétique',
          explication: 'Un choix d\'écrivain, pour la beauté du récit.',
        },
        {
          id: 've-inachevee', type: 'choix', consigne: BLOC, phrase: 'Pour le cours, l\'autobiographie est le récit achevé…',
          options: ['d\'une vie inachevée', 'd\'une vie achevée', 'd\'une enfance heureuse'], attendu: 'd\'une vie inachevée',
          explication: 'L\'auteur est vivant quand il écrit : aucun récit ne clôt la recherche.',
        },
      ],
    },

    {
      id: 'a3-temps',
      seance: 3,
      titre: 'Le temps et la voix',
      sousTitre: 'Madeleine, « je » narré, « je » narrant',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: 'Le temps des faits, le temps de l\'écriture',
          lignes: [
            'Dans un **journal**, on écrit presque le jour même. L\'**autobiographie** s\'écrit **après coup** : elle fait travailler la **mémoire**.',
            'D\'où les **déclencheurs du souvenir**, souvent une **sensation** : la **grive** de Montboissier (**Chateaubriand**), la **madeleine** (**Proust**), la **pervenche** (**Rousseau**).',
            'Le **« je » narré**, celui d\'autrefois, a vécu les faits ; le **« je » narrant**, celui d\'aujourd\'hui, les raconte.',
            'Pour les relier : la **surimpression** (le présent éclaire le passé, les époques se superposent) ou la **mise à distance** (l\'adulte jette un regard **ironique** ou critique sur l\'enfant).',
          ],
        },
        {
          type: 'regle',
          titre: 'Qui dit « je » ?',
          lignes: [
            '**Sarraute** (*Enfance*) emploie parfois la **2e personne** : deux voix, une **polyphonie**.',
            '**Vallès** (*L\'Enfant*) fait entendre la voix de l\'**enfant** et celle de l\'**adulte** qui analyse.',
            '**Duras** (*L\'Amant*) parle d\'elle à la **3e personne** : elle choisit le **pacte romanesque**.',
          ],
        },
      ],
      items: [
        {
          id: 'te-t-narre', type: 'terme', definition: 'Le moi d\'autrefois, celui qui a vécu les faits',
          attendu: 'je narré',
          pieges: [{ si: ['je narrant'], message: 'Le « je » narrant, c\'est l\'adulte qui raconte aujourd\'hui. Celui d\'autrefois, qui a vécu les faits : le « je » narré.' }],
        },
        {
          id: 'te-t-narrant', type: 'terme', definition: 'Le moi d\'aujourd\'hui, celui qui raconte',
          attendu: 'je narrant',
          pieges: [{ si: ['je narré', 'je narre'], message: 'Le « je » narré, c\'est celui d\'autrefois, qui a vécu les faits. Celui qui raconte aujourd\'hui : le « je » narrant.' }],
        },
        {
          id: 'te-t-surimpression', type: 'terme', definition: 'Relier le passé et le présent en les superposant : le présent éclaire le passé',
          attendu: 'surimpression',
          pieges: [{ si: ['mise à distance', 'distance'], message: 'La mise à distance sépare les époques, pour un regard ironique. Les superposer : la surimpression.' }],
        },
        {
          id: 'te-t-distance', type: 'terme', definition: 'Relier le passé et le présent en les séparant : l\'adulte porte un regard ironique ou critique sur l\'enfant',
          attendu: 'mise à distance', accepte: ['distance', 'distanciation'],
          pieges: [{ si: ['surimpression'], message: 'La surimpression superpose les époques. Un regard ironique de l\'adulte sur l\'enfant : la mise à distance.' }],
        },
        {
          id: 'te-grive', type: 'choix', consigne: BLOC, phrase: 'Le chant d\'une grive, à Montboissier, fait revenir un souvenir à…',
          options: ['Chateaubriand', 'Proust', 'Rousseau'], attendu: 'Chateaubriand',
          explication: 'La grive : Chateaubriand ; la madeleine : Proust ; la pervenche : Rousseau.',
        },
        {
          id: 'te-journal', type: 'choix', consigne: BLOC, phrase: 'Dans un journal intime, le temps de l\'écriture…',
          options: ['coïncide presque avec celui des faits', 'vient des années après les faits', 'précède les faits'], attendu: 'coïncide presque avec celui des faits',
          explication: 'L\'autobiographie, elle, s\'écrit après coup.',
        },
        {
          id: 'te-sarraute', type: 'choix', consigne: BLOC, phrase: 'Dans Enfance, Nathalie Sarraute emploie parfois…',
          options: ['la 2e personne : deux voix dialoguent', 'la 3e personne, comme dans un roman', 'seulement la voix de l\'enfant'], attendu: 'la 2e personne : deux voix dialoguent',
          explication: 'Une polyphonie : plusieurs voix.',
        },
        {
          id: 'te-valles', type: 'choix', consigne: BLOC, phrase: 'Dans L\'Enfant, Vallès fait entendre…',
          options: ['la voix de l\'enfant et celle de l\'adulte qui analyse', 'deux voix qui doutent l\'une de l\'autre', 'la voix de sa mère'], attendu: 'la voix de l\'enfant et celle de l\'adulte qui analyse',
          explication: 'Deux voix qui doutent l\'une de l\'autre : c\'est Sarraute.',
        },
        {
          id: 'te-duras', type: 'choix', consigne: BLOC, phrase: 'Duras, dans L\'Amant, parle d\'elle à la 3e personne : elle choisit…',
          options: ['le pacte romanesque', 'le pacte autobiographique', 'le journal intime'], attendu: 'le pacte romanesque',
          explication: 'La 3e personne rapproche le récit d\'un roman.',
        },
      ],
    },

    {
      id: 'a3-themes',
      seance: 3,
      titre: 'Les grands thèmes',
      sousTitre: 'L\'universel, les lieux, la mère, l\'enfance',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: 'Une vie qui parle à tous',
          lignes: [
            'Le lecteur se reconnaît dans le portrait. Montaigne : « **chaque homme porte la forme entière de l\'humaine condition** ».',
            'L\'autobiographe raconte, il ne fait pas la morale : « **Les autres forment l\'homme ; je le récite** » (Montaigne).',
            'D\'où des thèmes universels : la **famille** et les **racines**, l\'**enfance**, les autres, la formation, l\'**amour**.',
          ],
        },
        {
          type: 'regle',
          titre: 'Les thèmes du cours',
          lignes: [
            'Au **XXe siècle**, l\'autobiographie s\'enrichit de la **psychanalyse** (l\'inconscient), de l\'**Histoire** (le témoignage) et de la **sociologie** (le milieu). Dans les **années 1960**, le **Nouveau roman** remet en cause l\'individu : elle se renouvelle (récit en morceaux, sans chronologie).',
            '**La mémoire** : Proust, *À la recherche du temps perdu* ; dans *Le Temps retrouvé*, le temps perdu se retrouve par la **création artistique**.',
            '**Les lieux** : Marseille (**Cohen**), la campagne (**Pagnol**), **Grenoble** détestée (**Stendhal**), les bois de **Combourg** aimés (**Chateaubriand**).',
            '**La mère** : *Le Livre de ma mère* (Cohen) ; *La Promesse de l\'aube*, où **Romain Gary** fait de sa mère un vrai personnage.',
            '**L\'enfance** : un paradis (« le vert paradis des amours enfantines », Baudelaire), ou un regard ironique et critique.',
          ],
        },
      ],
      items: [
        {
          id: 'th-montaigne', type: 'choix', consigne: BLOC, phrase: '« Chaque homme porte la forme entière de l\'humaine condition » : c\'est…',
          options: ['Montaigne', 'Pascal', 'Rousseau'], attendu: 'Montaigne',
          explication: 'Ce qui rend universelle l\'histoire d\'un seul homme.',
        },
        {
          id: 'th-recite', type: 'trou', consigne: 'Complète la phrase de Montaigne :', phrase: '« Les autres forment l\'homme ; je le ___. »',
          attendu: 'récite',
          pieges: [{ si: ['raconte'], resultat: 'presque', message: 'C\'est bien le sens — mais Montaigne écrit « je le récite ».' }],
        },
        {
          id: 'th-sciences', type: 'choix', consigne: BLOC, phrase: 'Au XXe siècle, l\'autobiographie s\'enrichit de trois sciences humaines :',
          options: ['la psychanalyse, l\'Histoire, la sociologie', 'l\'astronomie, la géométrie, la physique', 'la rhétorique, la grammaire, la logique'], attendu: 'la psychanalyse, l\'Histoire, la sociologie',
          explication: 'L\'inconscient, le témoignage, le milieu social.',
        },
        {
          id: 'th-proust', type: 'choix', consigne: BLOC, phrase: 'Dans Le Temps retrouvé, Proust montre que le temps perdu se retrouve…',
          options: ['par la création artistique', 'en relisant son journal', 'en revenant à Combray'], attendu: 'par la création artistique',
          explication: 'La mémoire devient le matériau de l\'œuvre.',
        },
        {
          id: 'th-grenoble', type: 'choix', consigne: BLOC, phrase: 'Pour Stendhal, Grenoble est…',
          options: ['un lieu d\'enfance détesté', 'un paradis d\'enfance', 'la ville de sa mère'], attendu: 'un lieu d\'enfance détesté',
          explication: 'Les bois de Combourg, eux, sont aimés de Chateaubriand.',
        },
        {
          id: 'th-combourg', type: 'choix', consigne: BLOC, phrase: 'Les bois de Combourg sont le lieu d\'enfance aimé de…',
          options: ['Chateaubriand', 'Stendhal', 'Pagnol'], attendu: 'Chateaubriand',
          explication: 'Pagnol : la campagne ; Stendhal : Grenoble, détestée.',
        },
        {
          id: 'th-gary', type: 'choix', consigne: BLOC, phrase: 'Dans La Promesse de l\'aube, Romain Gary fait de sa mère…',
          options: ['un véritable personnage de roman', 'une inconnue dont il ne parle pas', 'la destinataire de ses lettres'], attendu: 'un véritable personnage de roman',
          explication: 'La mère trouve toute sa place dans le roman autobiographique.',
        },
        {
          id: 'th-paradis', type: 'choix', consigne: BLOC, phrase: '« Le vert paradis des amours enfantines » : un regard sur l\'enfance…',
          options: ['admiratif, respectueux', 'ironique, critique', 'indifférent'], attendu: 'admiratif, respectueux',
          explication: 'L\'enfance vue comme un paradis. L\'ironie, au contraire, met l\'enfance à distance.',
        },
      ],
    },
  ],

  // Le contrôle blanc : dix-huit questions tirées dans toutes les étapes, en
  // neuf minutes — le format du QCM qui l'attend.
  interro: {
    duree: 9,
    tirage: [
      { etape: 'a1-mot', nombre: 2 },
      { etape: 'a1-lejeune', nombre: 2 },
      { etape: 'a1-recits', nombre: 2 },
      { etape: 'a1-vocabulaire', nombre: 1 },
      { etape: 'a2-histoire', nombre: 2 },
      { etape: 'a2-titres', nombre: 2 },
      { etape: 'a2-textes', nombre: 2 },
      { etape: 'a3-pourquoi', nombre: 1 },
      { etape: 'a3-verite', nombre: 1 },
      { etape: 'a3-temps', nombre: 2 },
      { etape: 'a3-themes', nombre: 1 },
    ],
  },
};
