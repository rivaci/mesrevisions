// Les items FAUTIFS — l'épreuve du contrôleur.
//
// ── Pourquoi ce fichier existe ────────────────────────────────────────────
//
// **Un contrôleur qui n'a jamais rien refusé ne vaut rien.** C'est le mode de
// panne le plus discret d'un outil de build : il s'exécute, il ne dit rien, et
// personne ne sait s'il ne dit rien parce que tout va bien ou parce qu'il ne
// regarde plus. Le projet en a déjà vu la forme — un invariant de la v1 de la
// charte n'exigeait un modèle erroné exécutable que pour les distracteurs
// quantitatifs, donc passait trivialement sur tous les items où la tolérance est
// réellement à risque. « Un invariant qui passe toujours est pire qu'aucun
// invariant : il donne la sensation d'une garantie. »
//
// Chaque entrée porte donc le CODE que le contrôleur doit rendre, et le
// contrôleur échoue de deux façons symétriques :
//
//   · il laisse passer un item fautif — le refus a disparu ;
//   · il le refuse pour un AUTRE motif — le refus existe mais ne regarde pas ce
//     qu'on croit. C'est la panne la plus trompeuse des deux, parce que le
//     compte des refus reste juste.
//
// Les items ci-dessous sont dérivés de ceux de `exemples.js` : un item juste,
// une faute, et rien d'autre. Un item fautif de part en part prouverait
// seulement qu'un contrôleur sait refuser du bruit.

import { ITEMS } from './exemples.js';

const parId = Object.fromEntries(ITEMS.map((i) => [i.id, i]));

/** Une variante d'un item juste : mêmes champs, une faute, un identifiant à
 *  elle — deux items de même `id` en partageraient un dans le tirage. */
const variante = (idSource, suffixe, modifications) => {
  const base = { ...parId[idSource] };
  const item = { ...base, id: `${base.id}--${suffixe}`, ...modifications };
  for (const [cle, valeur] of Object.entries(modifications)) {
    if (valeur === undefined) delete item[cle];
  }
  return item;
};

const CUBE = 'ch04-sf2-i01-cube-d-aluminium';
const CIRCUIT = 'ch07-sf1-i01-ou-placer-l-amperemetre';
const QCM = 'ch06-sf6-i02-laine-de-fer-double-qcm';
const SERIE = 'ch01-sf5-i01-six-essais-de-solubilite';
const PREDICTION = 'ch06-sf6-i01-sucre-en-flacon-bouche';
const TABLE = 'ch04-sf6-i01-quel-metal';

export const ITEMS_FAUTIFS = Object.freeze([

  // ── 1. Le schéma et les énumérés ────────────────────────────────────────
  {
    attendu: 'CHAMP_INCONNU',
    pourquoi: "Le champ mal nommé, et la raison d'être de la liste fermée. `formatDiagnostique` "
      + "au lieu de `estFormatDiagnostique` ne produit AUCUNE erreur : il produit un item dont le "
      + "drapeau vaut undefined, donc un savoir-faire jamais acquis, et un contrôle muet parce "
      + "qu'un savoir-faire non acquis est un état normal. C'est le désaccord d'interface que ce "
      + 'projet vient de passer une réconciliation entière à éliminer entre trois modules.',
    item: variante(CUBE, 'champ-mal-nomme', {
      estFormatDiagnostique: undefined,
      formatDiagnostique: true,
    }),
  },
  {
    attendu: 'VALEUR_HORS_ENUMERE',
    pourquoi: "La classe A′ s'écrit `A_TABLE` : un identifiant ne porte pas d'apostrophe.",
    item: variante(CUBE, 'classe-inventee', { classe: "A'" }),
  },
  {
    attendu: 'SAVOIR_FAIRE_INCONNU',
    pourquoi: 'Un `sfPrincipal` hors catalogue indexe des échéances qui ne seront jamais relues.',
    item: variante(CUBE, 'sf-fantome', { sfPrincipal: 'ch04-sf9-calculer-la-densite' }),
  },
  {
    attendu: 'CHAPITRE_ANTERIEUR_AU_SAVOIR_FAIRE',
    pourquoi: 'Servir au chapitre 1 un savoir-faire du chapitre 4 demande un geste que la '
      + "progression n'a pas encore installé.",
    item: variante(CUBE, 'servi-trop-tot', { chapitre: 'ch01-melanges-et-solubilite' }),
  },

  // ── 2. La classe de garantie et le recalcul ─────────────────────────────
  {
    attendu: 'CORRECTION_NON_RETROUVEE',
    pourquoi: 'La correction fausse en production — la plainte la plus virulente relevée au '
      + 'benchmark contre les plateformes existantes. 540 g / 200 cm³ ne fait pas 2,8 g/cm³.',
    item: variante(CUBE, 'correction-fausse', {
      reponse: { valeur: [28, 10], unite: 'g/cm³', semantique: 'exacte' },
    }),
  },
  {
    attendu: 'CALCUL_REFUSE',
    pourquoi: "Le littéral flottant. `rationnel` lève sur un non-entier, et c'est la barrière qui "
      + "interdit à 2.7 d'entrer dans une algèbre où 27/10 est exact.",
    item: variante(CUBE, 'litteral-flottant', {
      calcul: { etapes: [{ id: 'rho', expr: '@masse ÷ 2.5', unite: 'g/cm³' }], reponse: 'rho' },
      reponse: { valeur: [216, 1], unite: 'g/cm³', semantique: 'exacte' },
    }),
  },
  {
    attendu: 'CLASSE_A_SANS_OPERATION',
    pourquoi: "« Réponse tabulée déclarée classe A », DÉRIVÉ au lieu d'être déclaré : une chaîne "
      + "sans opération ne calcule rien, elle recopie. Sa place est en A′, où la requête est rejouée.",
    item: variante(CUBE, 'chaine-sans-operation', {
      calcul: { etapes: [{ id: 'rho', expr: '@masse', unite: 'g' }], reponse: 'rho' },
      reponse: { valeur: [540, 1], unite: 'g', semantique: 'exacte' },
    }),
  },
  {
    attendu: 'CALCUL_REFUSE',
    pourquoi: "Additionner une masse et un volume. L'algèbre des unités existe pour attraper "
      + "cette faute-là, et elle doit l'attraper chez l'AUTEUR, avant de pouvoir être servie.",
    item: variante(CUBE, 'addition-heteroclite', {
      calcul: { etapes: [{ id: 'rho', expr: '@masse + @volume', unite: 'g' }], reponse: 'rho' },
      reponse: { valeur: [740, 1], unite: 'g', semantique: 'exacte' },
    }),
  },
  {
    attendu: 'REQUETE_SANS_RESULTAT',
    pourquoi: "L'or n'est pas dans la table centrale : la valeur servie viendrait de nulle part.",
    item: variante('ch04-sf6-i01-quel-metal', 'or-hors-table', {
      requete: { table: 'masses-volumiques', cle: 'or', colonne: 'masseVolumique' },
    }),
  },
  {
    attendu: 'TRANSPOSITION_AVANT_MATHS_CH11',
    pourquoi: "Le chapitre 8 est en trimestre 2 ; les équations sont au chapitre 11 de maths-4e, "
      + "en trimestre 3. La v1 de la charte écrivait « maths Ch. 7 » — le calcul littéral — ce qui "
      + "rendait fausse la garantie « le prérequis mathématique est déjà installé » sur le seul "
      + 'chapitre où elle se voit.',
    item: {
      id: 'ch08-sf5-i99-distance-par-transposition',
      sfPrincipal: 'ch08-sf5-calculer-une-distance',
      chapitre: 'ch08-mouvement-et-vitesse',
      programme: '2020',
      classe: 'A',
      cercle: 1,
      palier: 1,
      registre: 'macro',
      type: 'court',
      contexteDeSurface: 'trajet-en-car',
      enonce: 'Un car roule à {{donnee:vitesse}} pendant {{donnee:duree}}, après une pause de '
        + '{{donnee:pause}} déjà comptée dans la durée totale. Quelle distance parcourt-il ?',
      donnees: {
        vitesse: { valeur: [20, 1], unite: 'm/s' },
        duree: { valeur: [3600, 1], unite: 's' },
        pause: { valeur: [600, 1], unite: 's' },
      },
      calcul: {
        etapes: [
          { id: 'roule', expr: '@duree - @pause', unite: 's' },
          { id: 'd', expr: '@vitesse × #roule', unite: 'm' },
        ],
        reponse: 'd',
      },
      reponse: { valeur: [60000, 1], unite: 'm', semantique: 'exacte' },
    },
  },

  // ── 3. Les figures ──────────────────────────────────────────────────────
  {
    attendu: 'FIGURE_ET_CORRECTION_DISJOINTES',
    pourquoi: "Deux objets égaux champ pour champ, mais deux objets. Ils divergent au premier "
      + "auteur qui corrige l'un des deux, et « le dessin ne peut pas contredire la réponse » "
      + "redevient un vœu. Un schéma faux coûte plus cher qu'une phrase fausse : il n'est pas relu.",
    item: variante(CIRCUIT, 'figure-recopiee', {
      reponse: {
        objetFormel: {
          dipoles: [
            { id: 'P', type: 'pile', bornes: ['a', 'b'] },
            { id: 'A', type: 'amperemetre', bornes: ['c', 'b'] },
            { id: 'L1', type: 'lampe', bornes: ['c', 'd'] },
            { id: 'K', type: 'interrupteur', bornes: ['d', 'a'], etat: 'ferme' },
          ],
        },
      },
    }),
  },
  {
    attendu: 'FIGURE_NON_ENGENDREE',
    pourquoi: "Un graphe que `schema.js` refuse de tracer. Dessiner « à peu près » un circuit "
      + "qu'on ne sait pas lire produirait une figure qui ne représente pas le graphe.",
    item: (() => {
      const casse = { dipoles: [{ id: 'L1', type: 'lampe', bornes: ['a', 'b'] }] };
      return variante(CIRCUIT, 'graphe-sans-pile', {
        figure: { sorte: 'circuit', circuit: casse },
        reponse: { objetFormel: casse },
      });
    })(),
  },
  {
    attendu: 'FIGURE_HORS_TYPE',
    pourquoi: 'Une figure sur un QCM court est un dessin que personne n\'affichera — ou pire, '
      + "affiché là où l'énoncé n'en parle pas.",
    item: variante(CUBE, 'figure-orpheline', {
      figure: { sorte: 'graphique', donnees: { x: { min: 0, max: 1, pas: 1 }, y: { min: 0, max: 1, pas: 1 }, points: [[0, 0]] } },
    }),
  },
  {
    attendu: 'REFERENCE_A_UNE_IMAGE',
    pourquoi: "C'est ce qui rend le refus « dessiné à la main » détectable par un programme, "
      + "l'intention de l'auteur ne l'étant pas.",
    item: variante(CUBE, 'image-collee', {
      enonce: 'Observe le montage ci-dessous (voir montage-cube.png) et calcule la masse volumique.',
    }),
  },
  {
    attendu: 'NOMBRE_NU_DANS_LA_PROSE',
    pourquoi: "Aucun programme ne peut déterminer la provenance d'un nombre écrit dans une "
      + "phrase : l'invariant de sourçage de la v1 était la définition du vœu déguisé en règle, et "
      + "c'était le seul dont l'épisode du « 57 % » avait démontré le coût.",
    item: variante(CUBE, 'chiffre-en-dur', {
      enonce: "Moins de 40 % des élèves prédisent correctement cette valeur. Calcule la masse volumique.",
    }),
  },

  // ── 4. L'algèbre des unités, côté auteur ────────────────────────────────
  {
    attendu: 'UNITE_AUTEUR_REFUSEE',
    pourquoi: "Le facteur numérique dans une unité. g/100 mL est l'écriture usuelle de la "
      + "solubilité et elle est refusée : la solubilité s'écrit g/L dans toute l'application. "
      + "C'est une décision de contenu, plus simple qu'une extension de grammaire.",
    item: variante(SERIE, 'solubilite-en-g-par-100-mL', {
      reponse: { valeur: [359, 1], unite: 'g/100 mL', semantique: 'tolerante', tolerancePourcent: 2 },
    }),
  },
  {
    attendu: 'SEMANTIQUE_NON_DECLAREE',
    pourquoi: "Sans sémantique déclarée, on ne sait pas si 2,69 est juste — et le choix serait "
      + "fait à l'exécution, donc par personne.",
    item: variante(CUBE, 'semantique-absente', {
      reponse: { valeur: [27, 10], unite: 'g/cm³' },
    }),
  },

  // ── 5. La tolérance et les modèles erronés ──────────────────────────────
  {
    attendu: 'TOLERANCE_SANS_MODELE_ERRONE',
    pourquoi: "L'item exact où la v1 passait trivialement : saisie libre, tolérance, aucun "
      + 'distracteur, donc aucun modèle exigé — aucun contrôle là où la tolérance est réellement '
      + 'à risque.',
    item: variante(SERIE, 'tolerance-nue', { modelesErrones: undefined }),
  },
  {
    attendu: 'MODELE_ERRONE_DANS_LA_FENETRE',
    pourquoi: "Une fenêtre si large que l'élève qui n'a pas repéré la mesure aberrante est "
      + 'compté juste. La tolérance est un contenu, donc elle peut être fausse — et voilà à quoi '
      + 'ça ressemble.',
    item: variante(SERIE, 'fenetre-trop-large', {
      reponse: {
        valeur: [359, 1], unite: 'g/L', semantique: 'tolerante', tolerancePourcent: 20, decimalesIntermediaires: 1,
      },
    }),
  },
  {
    attendu: 'TOLERANCE_TROP_ETROITE',
    pourquoi: "La borne que la charte impose et que personne ne calculait : la fenêtre doit "
      + "COUVRIR la valeur obtenue en arrondissant à chaque étape. Un élève qui arrondit en cours "
      + 'de route serait ici compté faux.',
    item: {
      id: 'ch08-sf4-i99-fenetre-trop-serree',
      sfPrincipal: 'ch08-sf4-calculer-une-vitesse',
      chapitre: 'ch08-mouvement-et-vitesse',
      programme: '2020',
      classe: 'A',
      cercle: 1,
      palier: 1,
      registre: 'macro',
      type: 'court',
      contexteDeSurface: 'marcheur-sur-un-kilometre',
      enonce: 'Un marcheur parcourt {{donnee:distance}} en {{donnee:duree}}. '
        + 'Donne sa vitesse en kilomètres par heure.',
      donnees: {
        distance: { valeur: [1000, 1], unite: 'm' },
        duree: { valeur: [3600, 1], unite: 's' },
      },
      calcul: {
        etapes: [
          { id: 'v', expr: '@distance ÷ @duree', unite: 'm/s' },
          { id: 'vkmh', expr: '#v × 1', unite: 'km/h' },
        ],
        reponse: 'vkmh',
      },
      // La fenêtre est de 1 %, l'étape intermédiaire vaut 0,2777… m/s : un élève
      // qui l'arrondit à 0,3 m/s — ce que demande n'importe quelle copie — sort
      // de la fenêtre. La borne se CALCULE, elle ne se devine pas.
      reponse: {
        valeur: [1, 1], unite: 'km/h', semantique: 'tolerante', tolerancePourcent: 1, decimalesIntermediaires: 1,
      },
      motifSansModeleErrone: "aucun modèle erroné connu sur cette conversion : la faute usuelle est "
        + "un facteur 3,6 pris à l'envers, et elle est déjà servie comme distracteur ailleurs.",
    },
  },

  // ── 6. Les distracteurs ─────────────────────────────────────────────────
  {
    attendu: 'DISTRACTEUR_SANS_MODELE',
    pourquoi: "Un distracteur numérique inventé ne dit rien de ce que l'élève croit — et c'est la "
      + 'reprogrammation du piège qui devient une loterie.',
    item: variante(CUBE, 'distracteur-invente', {
      distracteurs: [
        { id: 'd1', valeur: [37, 10], unite: 'g/cm³', piege: 'confusion-masse-et-masse-volumique' },
      ],
    }),
  },
  {
    attendu: 'MODELE_ERRONE_NON_DISCRIMINANT',
    pourquoi: "Sur les données de CET item, le modèle faux redonne la bonne réponse : le "
      + "distracteur ne sépare rien. C'est la clause de l'invariant 11 qu'aucun auteur ne vérifie "
      + 'à la main, parce qu'
      + "elle dépend des nombres choisis, pas du modèle.",
    item: variante(CUBE, 'modele-qui-redonne-le-bon', {
      distracteurs: [
        {
          id: 'd1',
          valeur: [27, 10],
          unite: 'g/cm³',
          piege: 'confusion-masse-et-masse-volumique',
          modeleErrone: {
            id: 'volume-sur-masse-inverse',
            calcul: { etapes: [{ id: 'x', expr: '@masse ÷ @volume', unite: 'g/cm³' }], reponse: 'x' },
          },
        },
      ],
    }),
  },
  {
    attendu: 'DISTRACTEURS_DE_MEME_VALEUR',
    pourquoi: "L'élève ne peut pas les distinguer, et la reprogrammation devient ambiguë : on ne "
      + 'sait plus quel piège reprogrammer.',
    item: variante(CUBE, 'deux-fois-la-meme-valeur', {
      distracteurs: [
        {
          id: 'd1',
          valeur: [540, 1],
          unite: 'g',
          piege: 'confusion-masse-et-masse-volumique',
          modeleErrone: { id: 'rend-la-masse', calcul: { etapes: [{ id: 'x', expr: '@masse × 1', unite: 'g' }], reponse: 'x' } },
        },
        {
          id: 'd2',
          valeur: [54, 100],
          unite: 'kg',
          piege: 'meme-taille-donc-meme-masse',
          modeleErrone: { id: 'rend-la-masse-en-kg', calcul: { etapes: [{ id: 'x', expr: '@masse × 1', unite: 'g' }], reponse: 'x' } },
        },
      ],
    }),
  },
  {
    attendu: 'DISTRACTEUR_SANS_PIEGE',
    pourquoi: "Un distracteur non rattaché au catalogue est une réponse fausse sans diagnostic : "
      + "elle coûte un échec à l'élève et n'apprend rien à l'application.",
    item: variante(CUBE, 'distracteur-sans-piege', {
      distracteurs: [{ id: 'd1', texte: 'On ne peut pas savoir.' }],
    }),
  },

  // ── 7. Le double QCM et la provenance ───────────────────────────────────
  {
    attendu: 'JUSTIFICATION_SANS_PROVENANCE',
    pourquoi: "La provenance est typée et graduée précisément parce que le corpus d'énoncés "
      + "d'élèves n'existe pas encore : l'exiger « réel et sourcé » sous peine de refus bloquait "
      + "toute publication. Mais non typée, elle ne dit plus rien.",
    item: variante(QCM, 'justification-sans-provenance', {
      justifications: parId[QCM].justifications.map((j, k) => (k === 0 ? { ...j, provenance: undefined } : j)),
    }),
  },
  {
    attendu: 'JUSTIFICATION_REFORMULEE_SANS_SOURCE',
    pourquoi: "Une conception erronée n'est pas protégeable, seule la formulation d'un item l'est "
      + '— mais une reformulation sans référence retire sa provenance à la conception et la rend '
      + "infalsifiable. C'est la mécanique exacte du « 57 % ».",
    item: variante(QCM, 'reformulee-sans-source', {
      justifications: parId[QCM].justifications.map((j) => (j.provenance === 'reformulee' ? { ...j, deriveDe: '' } : j)),
    }),
  },
  {
    attendu: 'DOUBLE_QCM_SANS_JUSTIFICATION_FAUSSE',
    pourquoi: "Sans justification fausse, l'élève ne peut pas produire un juste/faux — et le "
      + 'juste/faux est le seul état du format qui apprenne quelque chose.',
    item: variante(QCM, 'que-des-justes', {
      justifications: parId[QCM].justifications.map((j) => ({ ...j, juste: true, provenance: 'institutionnelle', deriveDe: undefined })),
    }),
  },
  {
    attendu: 'JUSTIFICATIONS_HORS_DOUBLE_QCM',
    pourquoi: 'Des justifications sur un item qui n\'est pas un double QCM font compter comme '
      + 'double QCM ce qui n\'en est pas un — et la condition de maîtrise « au moins un juste/juste » '
      + 'serait remplie par autre chose que le format qui la fonde.',
    item: variante(CUBE, 'justifications-egarees', {
      justifications: [
        { id: 'j1', texte: 'Parce que.', juste: true, provenance: 'locale' },
        { id: 'j2', texte: 'Parce que non.', juste: false, provenance: 'locale' },
      ],
    }),
  },
  {
    attendu: 'RELECTURE_PERIMEE',
    pourquoi: "L'effet pervers refermé. « Publiés » couplé à « toute modification de l'énoncé "
      + "invalide la relecture » permettait de remplacer les quatre justifications sans toucher à "
      + "l'énoncé — c'est-à-dire de modifier exactement la partie que la relecture couvrait. Ici "
      + "l'énoncé n'a pas bougé d'un caractère, une seule justification a changé, et le scellé saute.",
    item: variante(QCM, 'justification-remplacee-apres-relecture', {
      justifications: parId[QCM].justifications.map((j, k) => (
        k === 3 ? { ...j, texte: 'La masse ne change jamais, point.' } : j
      )),
    }),
  },
  {
    attendu: 'CLASSE_C_SANS_RELECTURE',
    pourquoi: 'La classe C est la seule sans garantie mécanique : elle est comptée, plafonnée et '
      + 'relue, et la relecture se prouve.',
    item: variante(QCM, 'classe-c-non-relue', { relu: undefined }),
  },

  // ── 8. Le piège, la situation, le dispositif ────────────────────────────
  {
    attendu: 'CONDITION_DE_VALIDITE_NON_SATISFAITE',
    pourquoi: "La donnée la plus utile que la didactique fournisse, rendue opposable. Un item où "
      + "l'on voit tout du début à la fin est juste AVEC la conception : l'élève voit tout, "
      + "conserve tout, et l'item CONFIRME ce qu'il croit au lieu de le mettre en défaut.",
    item: variante(PREDICTION, 'rien-ne-devient-invisible', {
      situation: { systeme: 'ferme', matiereQuiChangeDeVisibilite: false, grandeurInterrogee: 'masse' },
    }),
  },
  {
    attendu: 'SITUATION_ABSENTE',
    pourquoi: "Le régime du système, que la charte exige « déclaré, jamais implicite » : sans lui, "
      + "ni l'élève ni nous ne savons ce qui est sur la balance, et aucune prédiction n'est juste.",
    item: variante(PREDICTION, 'systeme-non-declare', { situation: undefined }),
  },
  {
    attendu: 'SITUATION_ABSENTE',
    pourquoi: "Le même refus, mais sur un piège dont la condition est une FONCTION nue et non un "
      + "objet { champs, predicat }. Trois formes coexistent dans le catalogue ; un lecteur qui "
      + "n'en reconnaîtrait qu'une laisserait 23 pièges sur 31 sans condition évaluée — et ne "
      + "dirait rien, parce qu'une condition qu'on ne sait pas lire est une condition toujours "
      + 'satisfaite.',
    item: variante(CIRCUIT, 'situation-absente-sur-condition-fonction', { situation: undefined }),
  },
  {
    attendu: 'CONDITION_DE_VALIDITE_NON_SATISFAITE',
    pourquoi: "Une mesure à quelques pour cent des autres n'est pas aberrante, elle est NORMALE — "
      + "c'est même pourquoi on fait plusieurs mesures. Un item bâti sur elle apprendrait à jeter "
      + 'les données qui dérangent, ce qui est exactement le contrat didactique que ce piège '
      + 'prétend défaire.',
    item: variante(SERIE, 'ecart-qui-n-est-pas-aberrant', {
      situation: {
        serie: [358, 360, 357, 361, 359, 372],
        repereeParLEnonce: false,
        aberrante: { index: 5, facteur: 1.04 },
        tacheDemandee: 'exploiter',
      },
    }),
  },
  {
    attendu: 'DISPOSITIF_ETRANGER_AU_PIEGE',
    pourquoi: "`apresReponsePiege` LÈVE sur un dispositif étranger, et pour une bonne raison : le "
      + 'compter comme servi refermerait le cycle de variation trop tôt, et un constat serait '
      + "resservi alors qu'un autre n'a jamais été vu. Le refuser au build change une exception "
      + "d'exécution en faute d'auteur.",
    item: variante(PREDICTION, 'dispositif-d-un-autre-piege', {
      dispositifServi: 'couper-le-cube-en-deux',
    }),
  },
  {
    attendu: 'FORMAT_DIAGNOSTIQUE_SANS_MOTIF',
    pourquoi: "Le drapeau qui ne se dérive pas porte le même garde-fou que `unite: 'imposee'` : un "
      + "motif écrit. Sans lui, c'est une case à cocher qui se vérifie elle-même, sur la condition "
      + 'dont dépend la quatrième clause de la maîtrise.',
    item: variante(PREDICTION, 'format-sans-motif', { motifFormatDiagnostique: undefined }),
  },
  {
    attendu: 'FORMAT_DIAGNOSTIQUE_SANS_PIEGE',
    pourquoi: "Le format diagnostique est celui d'un piège ; il n'existe pas dans l'absolu.",
    item: variante(CUBE, 'format-sans-piege', {
      piege: undefined,
      situation: undefined,
      estFormatDiagnostique: true,
      motifFormatDiagnostique: 'un motif, mais aucun piège à diagnostiquer.',
    }),
  },
  {
    attendu: 'PIEGE_INCONNU',
    pourquoi: "Un piège que le savoir-faire ne déclare pas : l'item viserait une conception que "
      + "le suivi n'attribue pas à ce savoir-faire, et la re-confrontation la chercherait ailleurs.",
    item: variante(CUBE, 'piege-etranger-au-savoir-faire', {
      piege: 'extramission',
      situation: undefined,
    }),
  },

  // ── 9. La variation ─────────────────────────────────────────────────────
  {
    attendu: 'DIMENSION_VARIEE_ABSENTE',
    pourquoi: "L'énuméré fin est ce qui rend le refus possible. Tant que la dimension était "
      + 'déterminée par le palier, le champ était redondant et le refus ne pouvait jamais se '
      + 'déclencher.',
    item: variante(QCM, 'palier-3-sans-dimension', { dimensionVariee: undefined }),
  },
  {
    attendu: 'DIMENSION_VARIEE_HORS_PALIER',
    pourquoi: 'Au palier 1, rien ne varie : le décor et le mode de réponse sont ceux du cours.',
    item: variante(CUBE, 'palier-1-avec-dimension', { dimensionVariee: 'objet-support' }),
  },

  // ── 10. Le découpage ────────────────────────────────────────────────────
  {
    attendu: 'ITEM_SCINDABLE_NON_SCINDE',
    pourquoi: "Le plafond de classe C ne se respecte pas en supprimant des formats, il se "
      + 'respecte en les découpant : désigner la valeur absurde est vérifiable, expliquer pourquoi '
      + 'ne l\'est pas. Ce sont deux items.',
    item: variante(CUBE, 'calcul-et-redaction', {
      reponse: { valeur: [27, 10], unite: 'g/cm³', semantique: 'exacte', libre: true },
    }),
  },
  {
    attendu: 'DISCRIMINATION_TROP_COMPLEXE',
    pourquoi: "La trivialité n'est pas un adjectif : elle est dérivée de la chaîne. Faire "
      + 'confiance à l\'auteur sur ce point suffirait à rendre le croisement diagnostique muet — '
      + "on ne saurait plus si c'est la relation ou le calcul qui a cédé.",
    item: variante('ch04-sf2-i02-quelle-relation', 'choix-de-relation-trop-lourd', {
      donnees: {
        masse: { valeur: [1250, 1], unite: 'g' },
        volume: { valeur: [4, 1], unite: 'cm³' },
      },
      calcul: {
        etapes: [
          { id: 'demi', expr: '@masse ÷ 2', unite: 'g' },
          { id: 'rho', expr: '#demi ÷ @volume', unite: 'g/cm³' },
        ],
        reponse: 'rho',
      },
      reponse: { valeur: [3125, 20], unite: 'g/cm³', semantique: 'exacte' },
    }),
  },

  // ── 11. Les refus que RIEN n'éprouvait ──────────────────────────────────
  //
  // Le compte rendu annonçait « 39 codes éprouvés » sans dire sur combien. Sur
  // les 52 de `CODES_DE_REFUS`, treize n'avaient donc aucun cas fautif — et un
  // refus qu'aucun cas ne déclenche est indiscernable d'un refus supprimé. La
  // mesure honnête est maintenant imprimée par `verifier-contenu.mjs`, qui
  // compare les deux listes et RÉCLAME les manquants au lieu d'annoncer un
  // chiffre nu ; ce bloc les comble.
  //
  // L'un d'eux n'était pas seulement non éprouvé, il était INATTEIGNABLE — voir
  // `FRONTIERE_DE_SYSTEME_ABSENTE` plus bas.
  {
    attendu: 'CHAMP_ABSENT',
    pourquoi: "Le pendant de CHAMP_INCONNU : un champ obligatoire absent, ici l'énoncé. Sans "
      + "lui l'item est servi vide, et l'élève voit une question sans question.",
    item: variante(CUBE, 'sans-enonce', { enonce: undefined }),
  },
  {
    attendu: 'CHAPITRE_INCONNU',
    pourquoi: "Un chapitre hors programme : l'interrupteur « ton prof l'a fait ? » n'a alors "
      + "aucune case où se poser, et l'item n'est ni suivi ni suivi-pas.",
    item: variante(CUBE, 'chapitre-fantome', { chapitre: 'ch99-thermodynamique' }),
  },
  {
    attendu: 'CLASSE_A_SANS_CALCUL',
    pourquoi: 'Une classe A est une garantie de RECALCUL. Sans chaîne, la correction est une '
      + "valeur affirmée — c'est-à-dire exactement ce que la classe C assume et fait relire.",
    item: variante(CUBE, 'classe-a-sans-chaine', { calcul: undefined }),
  },
  {
    attendu: 'CLASSE_A_TABLE_SANS_REQUETE',
    pourquoi: "Une classe A′ est une garantie de REJEU sur la table centrale sourcée. Sans "
      + 'requête, la valeur est recopiée à la main, et une recopie ne se contrôle pas.',
    item: variante(TABLE, 'classe-a-table-sans-requete', { requete: undefined }),
  },
  {
    attendu: 'CLASSE_B_SANS_OBJET_FORMEL',
    pourquoi: "Une classe B est une garantie d'OBJET FORMEL : la figure et la correction sont "
      + 'le même objet. Une réponse libre à la place rend le schéma invérifiable.',
    item: variante(CIRCUIT, 'classe-b-sans-objet-formel', { reponse: { libre: true } }),
  },
  {
    attendu: 'FIGURE_ABSENTE',
    pourquoi: "Un type qui désigne une sorte de figure et pas de figure : l'énoncé parle d'un "
      + "schéma que rien n'affichera.",
    item: variante(CIRCUIT, 'type-a-figure-sans-figure', { figure: undefined }),
  },
  {
    attendu: 'FIGURE_SORTE_INCONNUE',
    pourquoi: "Une sorte que `schema.js` ne sait pas tracer. Le refus est au build, là où "
      + "l'auteur peut agir, plutôt qu'à l'écran devant l'élève.",
    item: variante(CIRCUIT, 'sorte-inventee', {
      figure: { ...parId[CIRCUIT].figure, sorte: 'photographie' },
    }),
  },
  {
    attendu: 'DOUBLE_QCM_SANS_JUSTIFICATIONS',
    pourquoi: "Un double QCM sans justifications est un QCM simple qui se présente comme le "
      + "format central du diagnostic — il ne sépare plus « il a coché juste » de « il a compris ».",
    item: variante(QCM, 'sans-justifications', { justifications: undefined }),
  },
  {
    attendu: 'DOUBLE_QCM_SANS_JUSTIFICATION_JUSTE',
    pourquoi: "Aucune justification juste : les quatre états du double QCM se réduisent à deux, "
      + "et le juste/juste — la seule des trois réussites que la charte exige dans ce format — "
      + 'devient inatteignable.',
    item: variante(QCM, 'aucune-justification-juste', {
      justifications: parId[QCM].justifications.map((j) => ({ ...j, juste: false })),
    }),
  },
  {
    attendu: 'DISCRIMINATION_SANS_PREREQUIS',
    pourquoi: "Un rôle de discrimination sur un savoir-faire sans prérequis mathématique : il "
      + "n'y a alors rien à séparer, et le croisement « échec de physique / échec de maths » "
      + "rend un verdict sur une distinction qui n'existe pas.",
    item: variante(CUBE, 'discrimination-sans-prerequis', {
      sfPrincipal: 'ch04-sf1-lire-une-masse-et-un-volume-par-deplacement-d-eau',
      sfSollicites: undefined,
      piege: undefined,
      situation: undefined,
      discriminationMaths: 'geste-isole',
    }),
  },
  {
    attendu: 'DISTRACTEUR_DANS_LA_FENETRE',
    pourquoi: "Un distracteur qui tombe dans la fenêtre de tolérance de la bonne réponse : "
      + "l'élève qui applique le bon modèle et l'élève qui applique le mauvais rendent tous "
      + 'deux une valeur acceptée. Le distracteur ne diagnostique plus rien, et la tolérance '
      + 'le masque.',
    item: variante(SERIE, 'distracteur-dans-la-fenetre', {
      distracteurs: [{
        id: 'moyenne-des-deux-plus-hautes',
        piege: 'valeur-aberrante-d-une-serie-non-reperee',
        valeur: [721, 2],
        unite: 'g/L',
        modeleErrone: {
          id: 'moyenne-des-deux-plus-hautes',
          nom: 'modèle « je prends les deux plus grandes » : 360,5 g/L, à 0,4 % de la bonne réponse',
          calcul: {
            etapes: [
              { id: 'somme2', expr: '@m2 + @m4', unite: 'g/L' },
              { id: 'moy2', expr: '#somme2 ÷ 2', unite: 'g/L' },
            ],
            reponse: 'moy2',
          },
        },
      }],
    }),
  },
  {
    // ⚠ Celui-ci ne manquait pas d'un cas : il manquait d'un CHEMIN.
    //
    // Le contrôle vivait dans `refusDuPiege`, après son `if (!item.piege)
    // return`. Or les quatre savoir-faire du fil « énergie » portent
    // `diagnostic: 'absent'` — c'est la décision de la charte, « zéro piège
    // d'énergie n'est écrit » — donc aucun item d'énergie ne porte de piège,
    // donc la fonction sortait toujours avant d'y arriver. La seule contrainte
    // de contenu opposable que la charte écrive pour l'énergie était du code
    // mort, et le compte rendu la portait dans la liste de ce que le contrôleur
    // « sait refuser ».
    attendu: 'FRONTIERE_DE_SYSTEME_ABSENTE',
    pourquoi: "Un item d'énergie sans frontière de système déclarée. Délimiter est le geste "
      + "que le diagnostic fondateur désigne comme le lieu de l'erreur : le laisser à l'élève "
      + "revient à évaluer, sous le nom de bilan énergétique, la conception qu'on soigne.",
    item: variante(CUBE, 'energie-sans-frontiere', {
      sfPrincipal: 'ch06-sf10-distinguer-source-transfert-et-conversion',
      chapitre: 'ch06-transformations-chimiques',
      sfSollicites: undefined,
      piege: undefined,
      situation: undefined,
      discriminationMaths: undefined,
    }),
  },
]);
