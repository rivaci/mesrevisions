// Chapitre 2 — L'énergie et le réseau local : fiches 4, 5 et 8 du cours.
//
// D'après le document « Révisions 1 » transmis par Denis : fiche 4 « Les
// sources et les formes d'énergie », fiche 5 « La chaîne d'énergie », fiche 8
// « Le réseau local (LAN) ». Le document ne contient pas de fiches 6 et 7.
// Une séance par fiche.
//
// La fiche de l'appli résume en notes, sans recopier le cours (le dépôt est
// public) ; les définitions courtes restent proches des siennes. Les
// exemples du cours sont repris : le panneau solaire, le moteur électrique,
// la résistance chauffante, le portail automatique, le réseau du collège.
//
// Les identifiants ne se renumérotent jamais : la progression y est rangée.

const BLOC = 'Choisis la bonne réponse :';
const SOURCE = 'Cette source d\'énergie est-elle renouvelable ?';
const RENOUVELABLES = ['renouvelable', 'non renouvelable'];

export default {
  id: 'ch02',
  numero: 2,
  titre: 'L\'énergie et le réseau local',
  detail: 'Fiche 4 · Les sources et les formes d\'énergie · Fiche 5 · La chaîne d\'énergie · Fiche 8 · Le réseau local',

  // Ce que Merlin sait du chapitre quand il corrige une réponse rédigée.
  profilMerlin: 'Élève de 3e. Technologie, fiches 4, 5 et 8 du cours. Une source d\'énergie est l\'origine de l\'énergie '
    + 'utilisée par un objet ou un système technique. Sources renouvelables (se renouvellent naturellement, inépuisables à '
    + 'l\'échelle humaine) : solaire, éolienne (vent), hydraulique (eau), biomasse (végétaux), géothermie (chaleur de la '
    + 'Terre). Non renouvelables (quantité limitée, s\'épuisent) : pétrole, gaz naturel, charbon, uranium (énergie '
    + 'nucléaire). Formes d\'énergie : électrique (déplacement de charges électriques, les électrons), mécanique (mouvement et '
    + 'position d\'un objet), thermique (température), lumineuse (rayonnement de la lumière), chimique (stockée dans la '
    + 'matière, libérée par une réaction chimique, comme dans une pile). Une conversion d\'énergie transforme une forme '
    + 'd\'énergie en une autre ; elle est réalisée par un convertisseur : le panneau solaire (lumineuse → électrique), le moteur '
    + 'électrique (électrique → mécanique), la résistance chauffante (électrique → thermique). Lors d\'une conversion, une '
    + 'partie de l\'énergie devient une forme non recherchée, souvent de la chaleur. Le flux d\'énergie est le transfert '
    + 'd\'énergie entre deux éléments, représenté par une flèche : source → convertisseur → énergie utile (forme recherchée) '
    + 'et énergie non utile (chaleur). La chaîne d\'énergie est l\'ensemble des fonctions qui mettent à disposition '
    + 'l\'énergie nécessaire à l\'action d\'un système : Alimenter (fournir l\'énergie : secteur 230 V, batterie, pile, source '
    + 'renouvelable — composant : l\'alimentation), Distribuer (autoriser, interrompre ou répartir l\'énergie, sur ordre de '
    + 'la chaîne d\'information — le préactionneur : relais, contacteur, variateur de vitesse, carte électronique, '
    + 'transistor), Convertir (transformer l\'énergie, par exemple électrique en mécanique — l\'actionneur : moteur '
    + 'électrique, vérin pneumatique ou hydraulique, résistance chauffante), Transmettre (transmettre et adapter le '
    + 'mouvement ou l\'effort — les organes de transmission : engrenages, courroie et poulies, chaîne et pignons, vis-écrou, '
    + 'arbre, accouplement) ; « ADCT ». Agir n\'est pas une fonction de la chaîne mais l\'action réalisée sur la matière '
    + 'd\'œuvre. Le portail automatique : secteur 230 V, relais, moteur électrique, engrenages ou vis-écrou, le portail '
    + 's\'ouvre ou se ferme. Réseau informatique : équipements reliés pour communiquer et échanger des données ; réseau local '
    + '(LAN, Local Area Network) : limité à un bâtiment ou un établissement, comme un collège ; terminal : équipement au bout '
    + 'du réseau qui émet ou reçoit des données (ordinateur, tablette, smartphone). Composants : terminal (poste client), '
    + 'serveur (services, fichiers, gestion des accès), switch ou commutateur (relie les équipements du LAN et transmet les '
    + 'données au bon destinataire), routeur (relie le LAN à d\'autres réseaux, notamment Internet ; passerelle par défaut), '
    + 'box Internet (modem + routeur + Wi-Fi, connexion au fournisseur d\'accès), borne Wi-Fi ou point d\'accès (connecte '
    + 'les équipements sans fil), carte réseau, imprimante réseau, terminaux mobiles, câble Ethernet RJ45, fibre optique, '
    + 'Bluetooth. Le réseau du collège est en étoile autour du switch. Ethernet : filaire, signal électrique, fiable, débit '
    + 'élevé (1 Gbit/s). Fibre optique : filaire, signal lumineux, très haut débit, insensible aux perturbations, relie la box '
    + 'au fournisseur d\'accès. Wi-Fi : sans fil, ondes radio, portée limitée, débit variable. Bluetooth : sans fil, courte '
    + 'portée, accessoires (casque, enceinte), peu utilisé pour un LAN.',

  seances: [
    { numero: 1, partie: 'Fiche 4', titre: 'Les sources et les formes d\'énergie' },
    { numero: 2, partie: 'Fiche 5', titre: 'La chaîne d\'énergie' },
    { numero: 3, partie: 'Fiche 8', titre: 'Le réseau local (LAN)' },
  ],

  etapes: [
    // ═══ Séance 1 — fiche 4 : les sources et les formes d'énergie ═════════

    {
      id: 'e1-sources',
      seance: 1,
      titre: 'Les sources d\'énergie',
      sousTitre: 'Renouvelables ou non',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: 'La source d\'énergie',
          lignes: [
            'Une **source d\'énergie**, c\'est **l\'origine** de l\'énergie utilisée par un objet ou un système technique. Il y en a deux grands types.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Deux types de sources',
          colonnes: ['Renouvelables', 'Non renouvelables'],
          lignes: [
            ['elles se renouvellent naturellement : **inépuisables** à l\'échelle humaine', 'en **quantité limitée** : elles **s\'épuisent** avec le temps'],
            ['le **solaire** (le Soleil), l\'**éolien** (le vent), l\'**hydraulique** (l\'eau)', 'le **pétrole**, le **gaz naturel**, le **charbon**'],
            ['la **biomasse** (les végétaux), la **géothermie** (la chaleur de la Terre)', 'l\'**uranium** (l\'énergie nucléaire)'],
          ],
        },
      ],
      items: [
        {
          id: 'en-t-source', type: 'terme', definition: 'L\'origine de l\'énergie utilisée par un objet ou un système technique',
          attendu: 'source d\'énergie', accepte: ['source'],
          pieges: [{ si: ['forme d\'énergie', 'forme'], message: 'Une forme dit comment l\'énergie se présente (électrique, thermique…). D\'où elle vient : sa source.' }],
        },
        {
          id: 'en-t-renouvelable', type: 'terme', definition: 'Se dit d\'une source d\'énergie qui se renouvelle naturellement, inépuisable à l\'échelle humaine',
          attendu: 'renouvelable', accepte: ['renouvelables', 'énergie renouvelable', 'source renouvelable'],
          pieges: [{ si: 'non renouvelable', message: 'Une source non renouvelable s\'épuise. Celle qui se renouvelle naturellement est renouvelable.' }],
        },
        {
          id: 'en-r-biomasse', type: 'choix', consigne: SOURCE, phrase: 'La biomasse (les végétaux)',
          options: RENOUVELABLES, attendu: 'renouvelable', explication: 'Les végétaux repoussent : renouvelable.',
        },
        {
          id: 'en-r-geothermie', type: 'choix', consigne: SOURCE, phrase: 'La géothermie (la chaleur de la Terre)',
          options: RENOUVELABLES, attendu: 'renouvelable', explication: 'La chaleur de la Terre est inépuisable à l\'échelle humaine.',
        },
        {
          id: 'en-r-uranium', type: 'choix', consigne: SOURCE, phrase: 'L\'uranium (l\'énergie nucléaire)',
          options: RENOUVELABLES, attendu: 'non renouvelable', explication: 'L\'uranium s\'extrait d\'un minerai, en quantité limitée : il s\'épuise.',
        },
        {
          id: 'en-r-gaz', type: 'choix', consigne: SOURCE, phrase: 'Le gaz naturel',
          options: RENOUVELABLES, attendu: 'non renouvelable', explication: 'Comme le pétrole et le charbon, il s\'épuise.',
        },
        {
          id: 'en-r-eolien', type: 'choix', consigne: SOURCE, phrase: 'L\'éolien (le vent)',
          options: RENOUVELABLES, attendu: 'renouvelable', explication: 'Le vent se renouvelle naturellement.',
        },
      ],
    },

    {
      id: 'e1-formes',
      seance: 1,
      titre: 'Les formes d\'énergie',
      sousTitre: 'Électrique, mécanique, thermique, lumineuse, chimique',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: 'Les formes de l\'énergie',
          lignes: [
            'L\'**énergie** se présente sous **différentes formes**, et elle peut **passer d\'une forme à une autre**.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Les cinq formes du cours',
          colonnes: ['La forme', 'Elle est liée…', 'Un objet'],
          lignes: [
            ['**électrique**', 'au déplacement de charges électriques, les électrons', 'la prise'],
            ['**mécanique**', 'au mouvement et à la position d\'un objet', 'la roue'],
            ['**thermique**', 'à la température d\'un objet', 'le radiateur'],
            ['**lumineuse**', 'au rayonnement de la lumière', 'l\'ampoule'],
            ['**chimique**', 'à la matière : stockée en elle, libérée lors d\'une réaction chimique', 'la pile'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Une **source** dit **d\'où vient** l\'énergie (le Soleil, le pétrole) ; une **forme** dit **comment elle se présente** (électrique, thermique…).',
          ],
        },
      ],
      items: [
        { id: 'fo-t-electrique', type: 'terme', definition: 'L\'énergie liée au déplacement de charges électriques, les électrons', attendu: 'énergie électrique', accepte: ['électrique'] },
        { id: 'fo-t-mecanique', type: 'terme', definition: 'L\'énergie liée au mouvement et à la position d\'un objet', attendu: 'énergie mécanique', accepte: ['mécanique'] },
        {
          id: 'fo-t-thermique', type: 'terme', definition: 'L\'énergie liée à la température d\'un objet',
          attendu: 'énergie thermique', accepte: ['thermique'],
          pieges: [{ si: 'chaleur', resultat: 'presque', message: 'C\'est bien la chaleur ; en technologie, sa forme s\'appelle l\'énergie thermique.' }],
        },
        { id: 'fo-t-lumineuse', type: 'terme', definition: 'L\'énergie liée au rayonnement de la lumière', attendu: 'énergie lumineuse', accepte: ['lumineuse'] },
        { id: 'fo-t-chimique', type: 'terme', definition: 'L\'énergie stockée dans la matière et libérée lors d\'une réaction chimique', attendu: 'énergie chimique', accepte: ['chimique'] },
        {
          id: 'fo-pile', type: 'choix', consigne: BLOC, phrase: 'Une pile stocke de l\'énergie…',
          options: ['chimique', 'thermique', 'lumineuse'], attendu: 'chimique',
          explication: 'Stockée dans la matière, libérée par une réaction chimique.',
        },
        {
          id: 'fo-roue', type: 'choix', consigne: BLOC, phrase: 'Une roue qui tourne possède de l\'énergie…',
          options: ['mécanique', 'électrique', 'chimique'], attendu: 'mécanique',
          explication: 'Liée au mouvement : l\'énergie mécanique.',
        },
      ],
    },

    {
      id: 'e1-conversion',
      seance: 1,
      titre: 'La conversion et le flux d\'énergie',
      sousTitre: 'Le convertisseur, l\'énergie utile et l\'énergie perdue',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'La conversion d\'énergie',
          lignes: [
            'Une **conversion d\'énergie** transforme une forme d\'énergie **en une autre**.',
            'Elle est réalisée par un **convertisseur** : le composant qui change la forme de l\'énergie.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Trois convertisseurs du cours',
          colonnes: ['Le convertisseur', 'Il reçoit…', 'Il fournit…'],
          lignes: [
            ['le **panneau solaire**', 'de l\'énergie lumineuse (du Soleil)', 'de l\'énergie électrique'],
            ['le **moteur électrique**', 'de l\'énergie électrique', 'de l\'énergie mécanique (le mouvement)'],
            ['la **résistance chauffante**', 'de l\'énergie électrique', 'de l\'énergie thermique (la chaleur)'],
          ],
        },
        {
          type: 'regle',
          titre: 'Le flux d\'énergie',
          lignes: [
            'Le **flux d\'énergie** : le **transfert** d\'énergie entre deux éléments d\'un système. On le représente par une **flèche**.',
            'Source d\'énergie → convertisseur → **énergie utile** (la forme recherchée) et **énergie non utile** (souvent de la chaleur).',
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Lors d\'une conversion, **une partie** de l\'énergie part sous une forme **non recherchée**, le plus souvent de la **chaleur** : c\'est pourquoi un moteur chauffe.',
          ],
        },
      ],
      items: [
        {
          id: 'cv-t-convertisseur', type: 'terme', definition: 'Le composant qui change la forme de l\'énergie', attendu: 'convertisseur',
          pieges: [{ si: 'actionneur', resultat: 'presque', message: 'Dans la chaîne d\'énergie, oui : l\'actionneur convertit. Mais le mot général de la fiche 4, pour tout composant qui change la forme de l\'énergie, est convertisseur.' }],
        },
        { id: 'cv-t-conversion', type: 'terme', definition: 'La transformation d\'une forme d\'énergie en une autre', attendu: 'conversion d\'énergie', accepte: ['conversion'] },
        { id: 'cv-t-flux', type: 'terme', definition: 'Le transfert d\'énergie entre deux éléments d\'un système, représenté par une flèche', attendu: 'flux d\'énergie', accepte: ['flux'] },
        {
          id: 'cv-panneau', type: 'choix', consigne: BLOC, phrase: 'Le panneau solaire convertit…',
          options: ['l\'énergie lumineuse en énergie électrique', 'l\'énergie électrique en énergie lumineuse', 'l\'énergie thermique en énergie électrique'],
          attendu: 'l\'énergie lumineuse en énergie électrique',
          explication: 'Il reçoit la lumière du Soleil et fournit de l\'électricité.',
        },
        {
          id: 'cv-moteur', type: 'choix', consigne: BLOC, phrase: 'Le moteur électrique convertit…',
          options: ['l\'énergie électrique en énergie mécanique', 'l\'énergie mécanique en énergie électrique', 'l\'énergie chimique en énergie mécanique'],
          attendu: 'l\'énergie électrique en énergie mécanique',
          explication: 'Il reçoit de l\'électricité et fournit un mouvement.',
        },
        {
          id: 'cv-resistance', type: 'choix', consigne: BLOC, phrase: 'La résistance chauffante convertit…',
          options: ['l\'énergie électrique en énergie thermique', 'l\'énergie thermique en énergie électrique', 'l\'énergie chimique en énergie thermique'],
          attendu: 'l\'énergie électrique en énergie thermique',
          explication: 'Elle reçoit de l\'électricité et fournit de la chaleur.',
        },
        {
          id: 'cv-perte', type: 'choix', consigne: BLOC, phrase: 'Un moteur électrique qui tourne chauffe. Cette chaleur, c\'est…',
          options: ['de l\'énergie non utile', 'de l\'énergie utile', 'une source d\'énergie'], attendu: 'de l\'énergie non utile',
          explication: 'On attend du mouvement du moteur, pas de la chaleur : elle est perdue.',
        },
        {
          id: 'cv-utile', type: 'choix', consigne: BLOC, phrase: 'L\'énergie utile, c\'est…',
          options: ['la forme d\'énergie recherchée', 'la chaleur perdue', 'l\'énergie fournie par la source'], attendu: 'la forme d\'énergie recherchée',
          explication: 'Celle pour laquelle on utilise le convertisseur.',
        },
      ],
    },

    {
      id: 'e1-ecrit',
      seance: 1,
      titre: 'Rédiger : le moteur électrique',
      sousTitre: 'Une conversion, une perte',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Pour rédiger',
          lignes: [
            'Dis **ce que reçoit** le convertisseur, **ce qu\'il fournit**, puis **ce qui se perd**.',
          ],
        },
      ],
      items: [
        {
          id: 'cv-w-moteur', type: 'decrire', sujet: 'Que fait un moteur électrique du point de vue de l\'énergie ? Utilise les mots convertisseur, conversion, énergie utile et énergie non utile.', emoji: '⚡',
          indices: ['convertisseur', 'conversion', 'énergie électrique', 'énergie mécanique', 'mouvement', 'énergie utile', 'énergie non utile', 'chaleur'],
          consigne: 'Rédige quelques lignes : ce que reçoit le moteur, ce qu\'il fournit, et ce qui se perd.',
          titreModele: 'Une réponse d\'exemple',
          modele: 'Le moteur électrique est un convertisseur : il réalise une conversion d\'énergie. Il reçoit de l\'énergie électrique et la transforme en énergie mécanique, le mouvement : c\'est l\'énergie utile, celle qu\'on recherche. Mais une partie de l\'énergie devient une forme non recherchée, de la chaleur : c\'est l\'énergie non utile, et c\'est pourquoi le moteur chauffe.',
          criteres: [
            { id: 'convertisseur', texte: 'Le moteur est un convertisseur : il réalise une conversion d\'énergie' },
            { id: 'formes', texte: 'Les formes : il reçoit de l\'énergie électrique et fournit de l\'énergie mécanique (le mouvement), l\'énergie utile' },
            { id: 'perte', texte: 'Une partie de l\'énergie devient de la chaleur : l\'énergie non utile' },
          ],
        },
      ],
    },

    // ═══ Séance 2 — fiche 5 : la chaîne d'énergie ═══════════════════════════

    {
      id: 'e2-adct',
      seance: 2,
      titre: 'Les fonctions de la chaîne d\'énergie',
      sousTitre: 'Alimenter, Distribuer, Convertir, Transmettre',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'La chaîne d\'énergie',
          lignes: [
            'La **chaîne d\'énergie** : l\'ensemble des fonctions qui **mettent à disposition l\'énergie** nécessaire à **l\'action** d\'un système technique.',
            'Ses quatre fonctions, dans l\'ordre : **A**limenter, **D**istribuer, **C**onvertir, **T**ransmettre — « **ADCT** ». Puis le système **agit**.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Ce que fait chaque fonction',
          colonnes: ['La fonction', 'Ce qu\'elle fait'],
          lignes: [
            ['**A**limenter', 'fournit l\'énergie nécessaire au système : le secteur (230 V), une batterie, une source renouvelable (panneau solaire, éolienne…)'],
            ['**D**istribuer', 'autorise, interrompt ou répartit l\'énergie ; elle est **commandée par la chaîne d\'information**'],
            ['**C**onvertir', 'transforme l\'énergie en une autre forme : de l\'énergie électrique en énergie mécanique avec un moteur'],
            ['**T**ransmettre', 'transmet le mouvement et l\'effort, et peut en adapter la vitesse, le sens ou la force'],
            ['Agir', 'l\'action utile sur la matière d\'œuvre : déplacer, couper, soulever, percer, chauffer…'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**Agir** n\'est **pas** une fonction de la chaîne d\'énergie : c\'est l\'**action** réalisée par le système, au bout de la chaîne.',
          ],
        },
      ],
      items: [
        {
          id: 'ch-ordre', type: 'ordre', consigne: 'Remets dans l\'ordre la chaîne d\'énergie, jusqu\'à l\'action :',
          elements: ['Alimenter', 'Distribuer', 'Convertir', 'Transmettre', 'Agir'],
        },
        {
          id: 'ch-t-chaine', type: 'terme', definition: 'L\'ensemble des fonctions qui mettent à disposition l\'énergie nécessaire à l\'action d\'un système',
          attendu: 'chaîne d\'énergie',
          pieges: [{ si: 'chaîne d\'information', message: 'La chaîne d\'information commande. Celle qui fournit l\'énergie de l\'action : la chaîne d\'énergie.' }],
        },
        {
          id: 'ch-t-alimenter', type: 'terme', definition: 'La fonction qui fournit l\'énergie nécessaire au système', attendu: 'alimenter',
          pieges: [{ si: 'alimentation', resultat: 'presque', message: 'L\'alimentation, c\'est le composant. La fonction se dit avec un verbe : alimenter.' }],
        },
        {
          id: 'ch-t-distribuer', type: 'terme', definition: 'La fonction qui autorise, interrompt ou répartit l\'énergie, sur ordre de la chaîne d\'information',
          attendu: 'distribuer', accepte: ['distribution'],
        },
        { id: 'ch-t-convertir', type: 'terme', definition: 'La fonction qui transforme l\'énergie en une autre forme', attendu: 'convertir', accepte: ['conversion'] },
        {
          id: 'ch-t-transmettre', type: 'terme', definition: 'La fonction qui transmet le mouvement et l\'effort, en adaptant si besoin la vitesse, le sens ou la force',
          attendu: 'transmettre', accepte: ['transmission'],
        },
        {
          id: 'ch-agir', type: 'choix', consigne: BLOC, phrase: '« Agir », au bout de la chaîne d\'énergie, c\'est…',
          options: ['l\'action réalisée par le système, pas une fonction de la chaîne', 'la cinquième fonction de la chaîne d\'énergie', 'la fonction qui fournit l\'énergie'],
          attendu: 'l\'action réalisée par le système, pas une fonction de la chaîne',
          explication: 'La chaîne a quatre fonctions, ADCT ; agir, c\'est le résultat.',
        },
        {
          id: 'ch-commande', type: 'choix', consigne: BLOC, phrase: 'La fonction Distribuer est commandée par…',
          options: ['la chaîne d\'information', 'la fonction Transmettre', 'l\'alimentation'], attendu: 'la chaîne d\'information',
          explication: 'La chaîne d\'information décide ; Distribuer laisse passer l\'énergie, ou non.',
        },
      ],
    },

    {
      id: 'e2-composants',
      seance: 2,
      titre: 'Les composants de la chaîne',
      sousTitre: 'Alimentation, préactionneur, actionneur, transmission',
      duree: 4,
      fiche: [
        {
          type: 'tableau',
          titre: 'Chaque fonction a son composant',
          colonnes: ['La fonction', 'Le composant', 'Des exemples'],
          lignes: [
            ['Alimenter', '**l\'alimentation**', 'le secteur (prise 230 V), une batterie ou une pile, une source renouvelable (panneau solaire, éolienne…)'],
            ['Distribuer', '**le préactionneur**', 'un relais, un contacteur, un variateur de vitesse, une carte électronique, un transistor'],
            ['Convertir', '**l\'actionneur**', 'un moteur électrique, un vérin pneumatique, un vérin hydraulique, une résistance chauffante'],
            ['Transmettre', '**les organes de transmission**', 'des engrenages, une courroie et des poulies, une chaîne et des pignons, un système vis-écrou, un arbre, un accouplement'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Le **préactionneur** distribue l\'énergie ; l\'**actionneur** la convertit. Le relais laisse passer le courant, le moteur fait bouger.',
          ],
        },
      ],
      items: [
        {
          id: 'co-t-preactionneur', type: 'terme', definition: 'Le composant qui distribue l\'énergie, comme un relais ou un contacteur',
          attendu: 'préactionneur', accepte: ['pré-actionneur'],
          pieges: [{ si: 'actionneur', message: 'L\'actionneur convertit l\'énergie (le moteur). Celui qui la distribue, c\'est le préactionneur (le relais).' }],
        },
        {
          id: 'co-t-actionneur', type: 'terme', definition: 'Le composant qui convertit l\'énergie pour produire l\'action, comme un moteur ou un vérin',
          attendu: 'actionneur',
          pieges: [
            { si: ['préactionneur', 'pré-actionneur'], message: 'Le préactionneur distribue l\'énergie (le relais). Celui qui la convertit pour agir, c\'est l\'actionneur (le moteur).' },
            { si: 'convertisseur', resultat: 'presque', message: 'C\'est bien un convertisseur ; dans la chaîne d\'énergie, ce composant porte un nom précis : l\'actionneur.' },
          ],
        },
        {
          id: 'co-t-transmission', type: 'terme', definition: 'Les pièces qui transmettent le mouvement et l\'effort, comme des engrenages ou une courroie et des poulies',
          attendu: 'organes de transmission', accepte: ['organe de transmission'],
        },
        {
          id: 'co-relais', type: 'choix', consigne: BLOC, phrase: 'Un relais est…',
          options: ['un préactionneur', 'un actionneur', 'un organe de transmission'], attendu: 'un préactionneur',
          explication: 'Il distribue l\'énergie : fonction Distribuer.',
        },
        {
          id: 'co-verin', type: 'choix', consigne: BLOC, phrase: 'Un vérin pneumatique est…',
          options: ['un actionneur', 'un préactionneur', 'une alimentation'], attendu: 'un actionneur',
          explication: 'Il convertit l\'énergie en mouvement : fonction Convertir.',
        },
        {
          id: 'co-courroie', type: 'choix', consigne: BLOC, phrase: 'Une courroie et des poulies forment…',
          options: ['un organe de transmission', 'un actionneur', 'un préactionneur'], attendu: 'un organe de transmission',
          explication: 'Elles transmettent le mouvement : fonction Transmettre.',
        },
        {
          id: 'co-variateur', type: 'choix', consigne: BLOC, phrase: 'Un variateur de vitesse est…',
          options: ['un préactionneur', 'un organe de transmission', 'un actionneur'], attendu: 'un préactionneur',
          explication: 'Il répartit l\'énergie envoyée au moteur : fonction Distribuer.',
        },
        {
          id: 'co-batterie', type: 'choix', consigne: BLOC, phrase: 'Une batterie assure la fonction…',
          options: ['Alimenter', 'Transmettre', 'Distribuer'], attendu: 'Alimenter',
          explication: 'Elle fournit l\'énergie au système.',
        },
        {
          id: 'co-vis', type: 'choix', consigne: BLOC, phrase: 'Un système vis-écrou assure la fonction…',
          options: ['Transmettre', 'Convertir', 'Alimenter'], attendu: 'Transmettre',
          explication: 'C\'est un organe de transmission : il transmet et adapte le mouvement.',
        },
        {
          id: 'co-resistance', type: 'choix', consigne: BLOC, phrase: 'Une résistance chauffante est…',
          options: ['un actionneur', 'un préactionneur', 'une alimentation'], attendu: 'un actionneur',
          explication: 'Elle convertit l\'énergie électrique en chaleur : fonction Convertir.',
        },
      ],
    },

    {
      id: 'e2-portail',
      seance: 2,
      titre: 'Le portail automatique',
      sousTitre: 'Le schéma-bloc du cours',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: 'La chaîne d\'énergie du portail automatique',
          lignes: [
            '**Alimenter** : l\'alimentation, le secteur (230 V), apporte l\'énergie électrique.',
            '**Distribuer** : le préactionneur, un **relais**.',
            '**Convertir** : l\'actionneur, le **moteur électrique**.',
            '**Transmettre** : des **engrenages** ou un système **vis-écrou**.',
            '**Agir** : déplacer le portail. L\'action utile : **l\'ouvrir ou le fermer**.',
          ],
        },
      ],
      items: [
        {
          id: 'po-ordre', type: 'ordre', consigne: 'Remets dans l\'ordre la chaîne d\'énergie du portail automatique :',
          elements: ['Le secteur 230 V', 'Le relais', 'Le moteur électrique', 'Les engrenages ou la vis-écrou', 'Le portail se déplace'],
        },
        {
          id: 'po-relais', type: 'choix', consigne: BLOC, phrase: 'Dans le portail, le relais assure la fonction…',
          options: ['Distribuer', 'Convertir', 'Transmettre'], attendu: 'Distribuer',
          explication: 'Le relais est le préactionneur : il distribue l\'énergie au moteur.',
        },
        {
          id: 'po-moteur', type: 'choix', consigne: BLOC, phrase: 'Dans le portail, le moteur électrique assure la fonction…',
          options: ['Convertir', 'Distribuer', 'Alimenter'], attendu: 'Convertir',
          explication: 'Il convertit l\'énergie électrique en énergie mécanique.',
        },
        {
          id: 'po-engrenages', type: 'choix', consigne: BLOC, phrase: 'Dans le portail, les engrenages assurent la fonction…',
          options: ['Transmettre', 'Convertir', 'Alimenter'], attendu: 'Transmettre',
          explication: 'Ils transmettent le mouvement du moteur au portail.',
        },
        {
          id: 'po-action', type: 'choix', consigne: BLOC, phrase: 'L\'action utile du portail automatique, c\'est…',
          options: ['l\'ouvrir ou le fermer', 'convertir l\'énergie électrique', 'distribuer l\'énergie'], attendu: 'l\'ouvrir ou le fermer',
          explication: 'Agir : déplacer le portail pour l\'ouvrir ou le fermer.',
        },
      ],
    },

    {
      id: 'e2-ecrit',
      seance: 2,
      titre: 'Rédiger : la chaîne du portail',
      sousTitre: 'Chaque fonction et son composant',
      duree: 5,
      fiche: [
        {
          type: 'regle',
          titre: 'Pour rédiger',
          lignes: [
            'Suis l\'ordre **ADCT** : pour chaque fonction, **le composant** du portail qui la réalise, puis **l\'action**.',
          ],
        },
      ],
      items: [
        {
          id: 'po-w-chaine', type: 'decrire', sujet: 'Décris la chaîne d\'énergie du portail automatique : pour chaque fonction, le composant qui la réalise, puis l\'action.', emoji: '🚧',
          indices: ['Alimenter', 'secteur 230 V', 'Distribuer', 'relais', 'préactionneur', 'Convertir', 'moteur électrique', 'actionneur', 'Transmettre', 'engrenages', 'vis-écrou', 'déplacer le portail'],
          consigne: 'Rédige quelques lignes, dans l\'ordre de la chaîne : chaque fonction et son composant, puis l\'action réalisée.',
          titreModele: 'Une réponse d\'exemple',
          modele: 'Le portail est alimenté par le secteur, en 230 V : c\'est la fonction Alimenter. Le relais, un préactionneur, distribue l\'énergie sur ordre de la chaîne d\'information : c\'est la fonction Distribuer. Le moteur électrique, l\'actionneur, convertit l\'énergie électrique en énergie mécanique : c\'est la fonction Convertir. Les engrenages, ou un système vis-écrou, transmettent le mouvement au portail : c\'est la fonction Transmettre. Le portail se déplace : il s\'ouvre ou se ferme, c\'est l\'action utile.',
          criteres: [
            { id: 'alimenter-distribuer', texte: 'Alimenter avec le secteur (230 V), puis Distribuer avec le relais (le préactionneur)' },
            { id: 'convertir', texte: 'Convertir avec le moteur électrique, l\'actionneur' },
            { id: 'transmettre', texte: 'Transmettre avec les engrenages ou le système vis-écrou' },
            { id: 'action', texte: 'L\'action, au bout de la chaîne : le portail se déplace, il s\'ouvre ou se ferme' },
          ],
        },
      ],
    },

    // ═══ Séance 3 — fiche 8 : le réseau local ═══════════════════════════════

    {
      id: 'r1-definitions',
      seance: 3,
      titre: 'Réseau, LAN, terminal',
      sousTitre: 'Les mots, et les usages au collège',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: 'Les définitions',
          lignes: [
            'Un **réseau informatique** : un ensemble d\'équipements **reliés** pour **communiquer** et **échanger des données**.',
            'Un **réseau local**, ou **LAN** (*Local Area Network*) : un réseau limité à **un bâtiment** ou à **un établissement**, comme un collège.',
            'Un **terminal** : un équipement **au bout** du réseau, qui **émet ou reçoit** des données : un ordinateur, une tablette, un smartphone.',
          ],
        },
        {
          type: 'regle',
          titre: 'Les usages, au collège',
          lignes: [
            '**Partager des fichiers** · **utiliser des imprimantes** · **accéder à des ressources** (les serveurs) · **se connecter à Internet**.',
          ],
        },
      ],
      items: [
        { id: 're-t-reseau', type: 'terme', definition: 'Un ensemble d\'équipements reliés pour communiquer et échanger des données', attendu: 'réseau informatique', accepte: ['réseau'] },
        { id: 're-t-lan', type: 'terme', definition: 'Un réseau limité à un bâtiment ou à un établissement, comme un collège', attendu: 'réseau local', accepte: ['LAN', 'Local Area Network', 'réseau local (LAN)', 'LAN (réseau local)'] },
        {
          id: 're-t-terminal', type: 'terme', definition: 'Un équipement au bout du réseau, qui émet ou reçoit des données : ordinateur, tablette, smartphone',
          attendu: 'terminal', accepte: ['terminaux', 'poste client', 'terminal (poste client)'],
        },
        {
          id: 're-sigle', type: 'choix', consigne: BLOC, phrase: 'LAN veut dire…',
          options: ['Local Area Network', 'Large Access Network', 'Line And Network'], attendu: 'Local Area Network',
          explication: 'Local Area Network : un réseau local, en anglais.',
        },
        {
          id: 're-usage', type: 'choix', consigne: BLOC, phrase: 'Lequel n\'est PAS un usage du réseau du collège cité dans le cours ?',
          options: ['recharger les batteries', 'partager des fichiers', 'utiliser des imprimantes'], attendu: 'recharger les batteries',
          explication: 'Le réseau sert à partager des fichiers, imprimer, accéder aux serveurs et à Internet. Il ne transporte pas d\'énergie.',
        },
      ],
    },

    {
      id: 'r1-composants',
      seance: 3,
      titre: 'Les composants d\'un réseau local',
      sousTitre: 'Switch, routeur, box, borne Wi-Fi, serveur…',
      duree: 5,
      fiche: [
        {
          type: 'tableau',
          titre: 'Qui fait quoi dans le réseau',
          colonnes: ['Le composant', 'Son rôle'],
          lignes: [
            ['**terminal** (poste client)', 'l\'équipement qui utilise les ressources du réseau, comme un ordinateur'],
            ['**serveur**', 'il fournit des services, stocke des fichiers et gère les accès'],
            ['**switch** (commutateur)', 'il relie les équipements du LAN et transmet les données au bon destinataire'],
            ['**routeur**', 'il relie le réseau local à d\'autres réseaux, notamment Internet : c\'est la **passerelle** par défaut'],
            ['**box Internet**', 'modem + routeur + Wi-Fi : la connexion au réseau du **fournisseur d\'accès** à Internet'],
            ['**borne Wi-Fi** (point d\'accès)', 'elle connecte les équipements **sans fil** au LAN'],
            ['**carte réseau**', 'elle permet à un équipement de communiquer sur le réseau (Ethernet ou Wi-Fi)'],
            ['**imprimante réseau**', 'elle permet d\'imprimer depuis plusieurs postes'],
            ['**terminaux mobiles**', 'tablette, smartphone, ordinateur portable, connectés le plus souvent en Wi-Fi'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Le **switch** relie les équipements **à l\'intérieur** du réseau local ; le **routeur** relie le réseau local **à l\'extérieur**, vers Internet.',
          ],
        },
      ],
      items: [
        {
          id: 'rc-t-switch', type: 'terme', definition: 'Il relie les équipements du réseau local et transmet les données au bon destinataire',
          attendu: 'switch', accepte: ['commutateur', 'switch (commutateur)', 'commutateur (switch)'],
          pieges: [{ si: 'routeur', message: 'Le routeur relie le réseau local à Internet. À l\'intérieur du réseau, c\'est le switch, le commutateur, qui relie les équipements.' }],
        },
        {
          id: 'rc-t-routeur', type: 'terme', definition: 'Il relie le réseau local à d\'autres réseaux, notamment Internet : la passerelle par défaut',
          attendu: 'routeur', accepte: ['passerelle', 'routeur (passerelle)'],
          pieges: [
            { si: ['switch', 'commutateur'], message: 'Le switch relie les équipements à l\'intérieur du réseau local. Vers l\'extérieur et Internet, c\'est le routeur.' },
            { si: ['box', 'box Internet'], resultat: 'presque', message: 'La box contient bien un routeur ; mais le composant qui relie le réseau local à Internet s\'appelle le routeur.' },
          ],
        },
        { id: 'rc-t-serveur', type: 'terme', definition: 'Il fournit des services, stocke des fichiers et gère les accès', attendu: 'serveur' },
        {
          id: 'rc-t-borne', type: 'terme', definition: 'Elle connecte les équipements sans fil au réseau local',
          attendu: 'borne Wi-Fi', accepte: ['borne wifi', 'point d\'accès', 'borne Wi-Fi (point d\'accès)', 'point d\'accès Wi-Fi'],
        },
        { id: 'rc-t-carte', type: 'terme', definition: 'Elle permet à un équipement de communiquer sur le réseau, en Ethernet ou en Wi-Fi', attendu: 'carte réseau' },
        {
          id: 'rc-box', type: 'choix', consigne: BLOC, phrase: 'La box Internet, c\'est…',
          options: ['un modem, un routeur et une borne Wi-Fi réunis', 'un serveur qui stocke les fichiers', 'un câble qui relie les bâtiments'],
          attendu: 'un modem, un routeur et une borne Wi-Fi réunis',
          explication: 'Elle relie le réseau local au fournisseur d\'accès à Internet.',
        },
        {
          id: 'rc-imprimante', type: 'choix', consigne: BLOC, phrase: 'Une imprimante réseau permet…',
          options: ['d\'imprimer depuis plusieurs postes', 'de relier le réseau à Internet', 'de stocker les fichiers des élèves'], attendu: 'd\'imprimer depuis plusieurs postes',
          explication: 'Reliée au réseau, elle sert à tous les postes. Stocker les fichiers, c\'est le serveur.',
        },
      ],
    },

    {
      id: 'r1-communication',
      seance: 3,
      titre: 'La topologie et les liaisons',
      sousTitre: 'L\'étoile, Ethernet, fibre, Wi-Fi, Bluetooth',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Le réseau du collège : en étoile',
          lignes: [
            'Chaque équipement est relié au **switch**, au centre : c\'est une **topologie en étoile**.',
            'Autour du switch : le serveur, les ordinateurs, l\'imprimante réseau, la borne Wi-Fi (pour les portables, tablettes, smartphones) et la box, vers Internet.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Les moyens de communication',
          colonnes: ['La liaison', 'Comment', 'Pour quoi faire'],
          lignes: [
            ['**Ethernet (RJ45)**', 'filaire, signal **électrique** ; fiable, débit élevé (par exemple 1 Gbit/s)', 'relier les ordinateurs, les imprimantes, le switch, les bornes Wi-Fi'],
            ['**Fibre optique**', 'filaire, signal **lumineux** ; très haut débit, insensible aux perturbations', 'relier la box au fournisseur d\'accès, parfois des bâtiments entre eux'],
            ['**Wi-Fi**', 'sans fil, **ondes radio** ; portée limitée, débit variable', 'les tablettes, smartphones, ordinateurs portables'],
            ['**Bluetooth**', 'sans fil, **courte portée** (quelques mètres) ; peu utilisé pour un LAN', 'les accessoires : casque, enceinte'],
          ],
        },
      ],
      items: [
        {
          id: 'lc-t-etoile', type: 'terme', definition: 'L\'organisation d\'un réseau où chaque équipement est relié à un switch central',
          attendu: 'topologie en étoile', accepte: ['étoile', 'en étoile', 'réseau en étoile'],
        },
        {
          id: 'lc-fibre', type: 'choix', consigne: BLOC, phrase: 'La fibre optique transmet les données par…',
          options: ['un signal lumineux', 'un signal électrique', 'des ondes radio'], attendu: 'un signal lumineux',
          explication: 'De la lumière dans un fil de verre : très haut débit.',
        },
        {
          id: 'lc-ethernet', type: 'choix', consigne: BLOC, phrase: 'Un câble Ethernet (RJ45) transmet les données par…',
          options: ['un signal électrique', 'un signal lumineux', 'des ondes radio'], attendu: 'un signal électrique',
          explication: 'Une liaison filaire, par un signal électrique.',
        },
        {
          id: 'lc-wifi', type: 'choix', consigne: BLOC, phrase: 'Le Wi-Fi transmet les données par…',
          options: ['des ondes radio', 'un signal lumineux', 'un câble RJ45'], attendu: 'des ondes radio',
          explication: 'Sans fil, par ondes radio, avec une portée limitée.',
        },
        {
          id: 'lc-bluetooth', type: 'choix', consigne: BLOC, phrase: 'Le Bluetooth sert surtout à…',
          options: ['connecter des accessoires proches, comme un casque', 'relier le collège à Internet', 'relier les bâtiments entre eux'],
          attendu: 'connecter des accessoires proches, comme un casque',
          explication: 'Sans fil, à courte portée : quelques mètres.',
        },
        {
          id: 'lc-perturbations', type: 'choix', consigne: BLOC, phrase: 'Quelle liaison a le plus haut débit, et ne craint pas les perturbations ?',
          options: ['la fibre optique', 'le Wi-Fi', 'le Bluetooth'], attendu: 'la fibre optique',
          explication: 'Très haut débit, insensible aux perturbations.',
        },
        {
          id: 'lc-centre', type: 'choix', consigne: BLOC, phrase: 'Dans le réseau en étoile du collège, l\'équipement au centre est…',
          options: ['le switch', 'l\'imprimante réseau', 'la tablette'], attendu: 'le switch',
          explication: 'Tous les équipements sont reliés au switch.',
        },
      ],
    },

    {
      id: 'r1-ecrit',
      seance: 3,
      titre: 'Rédiger : du collège à Internet',
      sousTitre: 'Le chemin des données',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Pour rédiger',
          lignes: [
            'Suis le chemin des données : **le terminal**, puis **le réseau local**, puis **la sortie vers Internet**. Pour chaque équipement, dis **son rôle**.',
          ],
        },
      ],
      items: [
        {
          id: 're-w-internet', type: 'decrire', sujet: 'Au collège, un élève ouvre un site Internet sur un ordinateur fixe. Explique par quels équipements passent ses données.', emoji: '🌐',
          indices: ['terminal', 'carte réseau', 'câble Ethernet', 'switch', 'box Internet', 'routeur', 'passerelle', 'fournisseur d\'accès', 'fibre optique'],
          consigne: 'Rédige quelques lignes : l\'ordinateur, le chemin dans le réseau local, puis la sortie vers Internet.',
          titreModele: 'Une réponse d\'exemple',
          modele: 'L\'ordinateur est un terminal : grâce à sa carte réseau, il envoie sa demande par un câble Ethernet jusqu\'au switch. Le switch relie les équipements du réseau local et transmet les données vers la box Internet. La box, qui contient le routeur, est la passerelle entre le réseau local et Internet : elle envoie la demande au fournisseur d\'accès, souvent par la fibre optique. La réponse du site revient par le même chemin.',
          criteres: [
            { id: 'terminal', texte: 'L\'ordinateur est un terminal, relié au réseau local (par exemple par un câble Ethernet)' },
            { id: 'switch', texte: 'Les données passent par le switch, qui relie les équipements du réseau local' },
            { id: 'passerelle', texte: 'La box Internet (le routeur) est la passerelle vers Internet, par le fournisseur d\'accès' },
          ],
        },
      ],
    },
  ],

  // ── Le contrôle blanc ───────────────────────────────────────────────────
  interro: {
    duree: 10,
    tirage: [
      { etape: 'e1-sources', nombre: 2 },
      { etape: 'e1-formes', nombre: 2 },
      { etape: 'e1-conversion', nombre: 3 },
      { etape: 'e2-adct', nombre: 3 },
      { etape: 'e2-composants', nombre: 3 },
      { etape: 'e2-portail', nombre: 1 },
      { etape: 'r1-definitions', nombre: 2 },
      { etape: 'r1-composants', nombre: 2 },
      { etape: 'r1-communication', nombre: 2 },
    ],
  },
};
