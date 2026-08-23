// Chapitre 4 — La proportionnalité.
//
// ── Trois contraintes du programme 2025, à respecter à la lettre ──────────
//
// 1. « La technique du PRODUIT EN CROIX n'est pas enseignée. » C'est écrit
//    noir sur blanc. Ce chapitre n'utilise donc que les trois procédures
//    autorisées : linéarité multiplicative, linéarité additive, retour à
//    l'unité. Le produit en croix donnerait les bonnes réponses et ferait
//    manquer l'objectif — comprendre le SENS de la proportionnalité.
//
// 2. « La proportionnalité continue d'être étudiée exclusivement dans le cadre
//    des GRANDEURS, et ne concerne pas les suites de nombres. » Tous les
//    exercices portent donc sur des grandeurs nommées avec leur unité, jamais
//    sur des tableaux de nombres abstraits.
//
// 3. « L'élève est encouragé à laisser apparaître à l'intérieur des calculs
//    les unités des grandeurs manipulées. » Les méthodes écrivent donc
//    « 12 € ÷ 4 kg = 3 € par kg », pas « 12 ÷ 4 = 3 ».
//
// ── Ce qui précède toute procédure ────────────────────────────────────────
//
// Avant de calculer, il faut savoir si la situation relève seulement du
// modèle. C'est le premier savoir-faire, et le plus négligé : un élève qui
// applique la proportionnalité à l'âge, à la taille ou à un tarif avec
// abonnement se trompe avant d'avoir posé le moindre calcul.
//
// Le test du zéro tranche presque tous les cas : si la première grandeur vaut
// zéro, la seconde doit valoir zéro. Un abonnement de 5 € le fait échouer
// immédiatement.

export default {
  numero: 4,
  titre: 'La proportionnalité',
  theme: 'La proportionnalité',
  trimestre: 2,
  programme: '2025',
  prerequis: [
    'Multiplier et diviser des décimaux (chapitres 1 et 3)',
    'La fraction comme quotient et les pourcentages (chapitre 2)',
    'Double, moitié, tiers, quart (CM)',
  ],

  savoirFaire: [
    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-4-1',
      titre: 'Reconnaître une situation de proportionnalité',
      attendus: [
        'Il identifie si une situation relève du modèle de la proportionnalité.',
        'Il justifie sa réponse par le test du double ou celui du zéro.',
      ],

      decouvrir: {
        titre: 'Deux tarifs, un seul est proportionnel',
        texte:
          'Deux piscines proposent des tarifs différents pour les entrées.',
        lignes: [
          { calcul: 'Piscine A', resultat: '3 € par entrée, rien d\'autre' },
          { calcul: 'Piscine B', resultat: '10 € d\'abonnement, puis 2 € par entrée' },
        ],
        question: 'Combien coûtent 0 entrée dans chaque piscine ? Réponds pour A, puis pour B.',
        champs: [
          { id: 'a', etiquette: 'Piscine A, 0 entrée', attendu: 0 },
          { id: 'b', etiquette: 'Piscine B, 0 entrée', attendu: 10 },
        ],
        conclusion:
          'À la piscine B, on paie **10 € sans être entré une seule fois**. Ce tarif '
          + 'n\'est donc pas proportionnel : deux fois plus d\'entrées n\'y coûtent pas '
          + 'deux fois plus cher. Le **test du zéro** suffit à le voir.',
      },

      cours: [
        {
          type: 'definition',
          titre: 'Deux grandeurs proportionnelles',
          texte:
            'Deux grandeurs sont **proportionnelles** quand on obtient les valeurs de '
            + 'la seconde en multipliant celles de la première par un **même nombre**, '
            + 'toujours le même.',
        },
        {
          type: 'remarque',
          titre: 'Les expressions de tous les jours',
          texte:
            'Beaucoup d\'expressions courantes disent une proportionnalité : « le prix '
            + 'au kilo », « la vitesse en km/h », « le nombre de battements par '
            + 'minute ». Chacune donne la valeur pour **une** unité.',
        },
        {
          type: 'propriete',
          titre: 'Les deux tests',
          texte:
            '**Le test du double** : si la première grandeur double, la seconde '
            + 'doit doubler.\n'
            + '**Le test du zéro** : si la première vaut zéro, la seconde doit valoir '
            + 'zéro.\n'
            + 'Si l\'un des deux échoue, la situation n\'est pas proportionnelle.',
        },
        {
          type: 'remarque',
          titre: 'Ce qui n\'est pas proportionnel',
          texte:
            'L\'âge et la taille — un enfant de 8 ans ne mesure pas le double d\'un '
            + 'enfant de 4 ans. Un tarif avec abonnement. Le temps de remplissage '
            + 'd\'une baignoire selon le nombre de robinets… qui, lui, est '
            + 'inversement lié.',
        },
        { type: 'exemple', texte: 'Prix et quantité au marché : proportionnel   ·   Âge et taille : non   ·   Abonnement + séances : non' },
      ],

      methode: {
        titre: 'Décider si un tarif est proportionnel',
        enonce: 'Un cinéma propose : 8 € la place, ou une carte à 15 € puis 5 € la place. Le second tarif est-il proportionnel ?',
        etapes: [
          { texte: 'Je fais le test du zéro : pour 0 place, combien paie-t-on ?', note: '15 €, à cause de la carte.' },
          { texte: 'Une situation proportionnelle donnerait 0 € pour 0 place.', note: '' },
          { texte: 'Le test échoue : le second tarif n\'est pas proportionnel.', note: '' },
          { texte: 'Le premier, lui, l\'est : 0 place coûte 0 €, et 2 places coûtent le double d\'une.', note: '' },
        ],
        controle:
          'Le contrôle : le test du zéro est le plus rapide, mais il ne suffit pas '
          + 'toujours. Fais aussi le test du double sur deux valeurs du tableau.',
      },

      entrainement: [
        {
          id: 'e-4-1-1', type: 'vraifaux', palier: 1,
          affirmation: 'Le prix payé et le nombre de croissants achetés à 1,20 € pièce sont proportionnels.',
          attendu: true,
        },
        {
          // Répondre « non » ne suffit pas : l'élève doit APPLIQUER le test du
          // zéro, qui est justement le geste que le cours lui donne. C'est le
          // vérificateur qui l'a réclamé, et le contenu y a gagné.
          id: 'e-4-1-2', type: 'vraifaux', palier: 2,
          affirmation: "L'âge d'un enfant et sa taille sont proportionnels.",
          attendu: false,
          contreExemple: {
            invite: 'Applique le test du zéro. Quelle taille une situation proportionnelle donnerait-elle à l\'âge 0 ? Et quelle taille fait réellement un nouveau-né, en cm ?',
            champs: [{ id: 'a', etiquette: 'si c\'était proportionnel (cm)' }, { id: 'b', etiquette: 'taille réelle (cm)' }],
            valide: (a, b) => a === 0 && b > 0,
            exemple: '0 et 50 : une situation proportionnelle donnerait 0 cm à la naissance, or un nouveau-né mesure environ 50 cm.',
          },
        },
        {
          id: 'e-4-1-3', type: 'vraifaux', palier: 2,
          affirmation: 'Un tarif de 10 € d\'abonnement plus 2 € par séance est proportionnel au nombre de séances.',
          attendu: false,
          contreExemple: {
            invite: 'Applique le test du zéro. Combien paie-t-on réellement pour 0 séance ? Et combien paierait-on si le tarif était proportionnel ?',
            champs: [{ id: 'a', etiquette: 'payé réellement (€)' }, { id: 'b', etiquette: 'si c\'était proportionnel (€)' }],
            valide: (a, b) => a === 10 && b === 0,
            exemple: '10 et 0 : on paie déjà 10 € sans aucune séance, alors qu\'une situation proportionnelle donnerait 0 €.',
          },
        },
        {
          // Neutre : une situation qui EST proportionnelle malgré des nombres qui
          // ne tombent pas rond. Sans cet item, « répondre non » deviendrait la
          // stratégie gagnante.
          id: 'e-4-1-4', type: 'vraifaux', palier: 2, neutre: true,
          affirmation: 'À vitesse constante, la distance parcourue et le temps sont proportionnels.', attendu: true,
        },
        {
          id: 'e-4-1-5', type: 'calcul', palier: 2,
          consigne: 'Un tarif de 12 € d\'abonnement plus 3 € par séance. Combien paie-t-on pour 0 séance, en euros ?',
          enonce: '0 \\text{ séance}', attendu: 12,
        },
        {
          id: 'e-4-1-6', type: 'vraifaux', palier: 3,
          affirmation: 'Si une situation est proportionnelle, doubler la première grandeur double la seconde.',
          attendu: true,
        },
        {
          id: 'e-4-1-7', type: 'vraifaux', palier: 3,
          affirmation: 'Toutes les situations de la vie courante sont proportionnelles.',
          attendu: false,
          contreExemple: {
            invite: 'Donne un tarif NON proportionnel : le montant fixe payé d\'avance, puis le prix par séance.',
            champs: [{ id: 'a', etiquette: 'montant fixe (€)' }, { id: 'b', etiquette: 'prix par séance (€)' }],
            valide: (a, b) => a > 0 && b > 0,
            exemple: '10 et 2 : on paie 10 € même pour zéro séance, donc ce n\'est pas proportionnel.',
          },
        },
      ],

      problemes: [
        {
          id: 'p-4-1-1',
          enonce:
            'Une salle de sport propose deux formules. Formule A : 6 € par séance. '
            + 'Formule B : 20 € par mois, puis 3 € par séance.',
          questions: [
            { texte: 'Avec la formule A, combien coûtent 5 séances, en euros ?', attendu: 30, unite: '€' },
            { texte: 'Avec la formule B, combien coûtent 5 séances ?', attendu: 35, unite: '€' },
          ],
        },
        {
          id: 'p-4-1-2',
          enonce:
            'Au marché, les pommes sont vendues 2,50 € le kilo.',
          questions: [
            { texte: 'Combien coûtent 4 kg, en euros ?', attendu: 10, unite: '€' },
            { texte: 'Combien coûtent 8 kg ?', attendu: 20, unite: '€' },
          ],
        },
        {
          id: 'p-4-1-3',
          enonce:
            'Un taxi facture 4 € de prise en charge, puis 1,50 € par kilomètre.',
          questions: [
            { texte: 'Combien coûte une course de 10 km, en euros ?', attendu: 19, unite: '€' },
            { texte: 'Combien coûte une course de 20 km ?', attendu: 34, unite: '€' },
          ],
        },
      ],

      test: [
        { id: 't-4-1-1', type: 'vraifaux', affirmation: 'Le prix et la masse de fruits vendus 3 € le kilo sont proportionnels.', attendu: true, revoir: 'definition' },
        { id: 't-4-1-2', type: 'vraifaux', affirmation: "L'âge et la pointure d'un enfant sont proportionnels.", attendu: false, revoir: 'remarque' },
        { id: 't-4-1-3', type: 'vraifaux', affirmation: 'À vitesse constante, la distance et le temps sont proportionnels.', attendu: true, revoir: 'definition' },
        { id: 't-4-1-4', type: 'vraifaux', affirmation: 'Un forfait de 5 € plus 1 € par SMS est proportionnel au nombre de SMS.', attendu: false, revoir: 'propriete' },
        { id: 't-4-1-5', type: 'calcul', consigne: 'Forfait de 8 € plus 2 € par séance : prix pour 0 séance ?', enonce: '0 \\text{ séance}', attendu: 8, revoir: 'propriete' },
        { id: 't-4-1-6', type: 'vraifaux', affirmation: 'Le nombre de cahiers et leur prix, à 1,50 € pièce, sont proportionnels.', attendu: true, revoir: 'definition' },
        { id: 't-4-1-7', type: 'calcul', consigne: 'Situation proportionnelle : prix pour 0 article ?', enonce: '0 \\text{ article}', attendu: 0, revoir: 'propriete' },
        { id: 't-4-1-8', type: 'vraifaux', affirmation: "La taille d'une personne et son âge sont proportionnels.", attendu: false, revoir: 'remarque' },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-4-2',
      titre: 'La linéarité multiplicative',
      attendus: [
        'Il complète un tableau en repérant le lien multiplicatif entre deux colonnes.',
        'Il verbalise ce lien : « deux fois plus », « trois fois moins ».',
      ],

      decouvrir: {
        titre: 'Trois fois plus de pommes, trois fois plus cher',
        texte:
          'Au marché, 2 kg de pommes coûtent 5 €. On veut le prix de 6 kg.',
        lignes: [
          { calcul: 'Masse', resultat: '2 kg → 6 kg' },
          { calcul: 'Le lien', resultat: '6 = 2 × 3' },
        ],
        question: 'Pour passer de 2 kg à 6 kg, par combien multiplie-t-on ? Et combien coûtent alors les 6 kg ?',
        champs: [
          { id: 'a', etiquette: 'On multiplie par', attendu: 3 },
          { id: 'b', etiquette: 'Prix de 6 kg (€)', attendu: 15 },
        ],
        conclusion:
          'Ce qu\'on fait à la masse, on le fait au prix : **trois fois plus de '
          + 'pommes, trois fois plus cher**. On n\'a pas eu besoin du prix au kilo.',
      },

      cours: [
        {
          type: 'propriete',
          titre: 'La linéarité multiplicative',
          texte:
            'Dans un tableau de proportionnalité, si on **multiplie** une valeur '
            + 'd\'une grandeur par un nombre, la valeur correspondante de l\'autre '
            + 'grandeur est multipliée par **le même nombre**.',
        },
        {
          type: 'remarque',
          titre: 'Verbaliser d\'abord',
          texte:
            'Avant de calculer, dis la relation à voix haute : « 6 kg, c\'est trois '
            + 'fois 2 kg ». Le calcul suit tout seul. C\'est ce que le programme '
            + 'appelle verbaliser les relations entre les mesures.',
        },
        {
          type: 'remarque',
          titre: 'Quand c\'est plus commode',
          texte:
            'Cette procédure est la plus rapide quand une quantité est un **multiple '
            + 'simple** de l\'autre : double, triple, moitié, quart. Sinon, mieux vaut '
            + 'passer par l\'unité.',
        },
        { type: 'exemple', texte: '2 kg → 5 €, donc 6 kg → 15 €   ·   8 places → 40 €, donc 4 places → 20 €' },
      ],

      methode: {
        titre: 'Compléter un tableau par multiplication',
        enonce: '4 stylos coûtent 6 €. Combien coûtent 12 stylos ?',
        etapes: [
          { texte: 'Je compare les quantités : 12 stylos, c\'est 4 × 3.', note: 'On multiplie par 3.' },
          { texte: 'Je fais la même chose au prix : 6 € × 3 = 18 €.', note: 'Le même nombre, sur les deux lignes.' },
          { texte: 'Donc 12 stylos coûtent 18 €.', note: '' },
        ],
        controle:
          'Le contrôle : plus de stylos, donc plus cher. Si ton résultat est plus '
          + 'petit que 6 €, tu as divisé au lieu de multiplier.',
      },

      entrainement: [
        {
          id: 'e-4-2-1', type: 'calcul', palier: 1,
          consigne: '2 kg de pommes coûtent 5 €. Combien coûtent 6 kg, en euros ?',
          enonce: '6 \\text{ kg}', attendu: 15,
          fausses: [{ valeur: 9, piege: 'linearite-mal-appliquee' }],
        },
        {
          id: 'e-4-2-2', type: 'calcul', palier: 1,
          consigne: '4 stylos coûtent 6 €. Combien coûtent 12 stylos, en euros ?',
          enonce: '12 \\text{ stylos}', attendu: 18,
          fausses: [{ valeur: 14, piege: 'linearite-mal-appliquee' }],
        },
        {
          // Neutre : ici on divise au lieu de multiplier. Sans cet item, « toujours
          // multiplier » deviendrait la règle apprise.
          id: 'e-4-2-3', type: 'calcul', palier: 1, neutre: true,
          consigne: '8 places de cinéma coûtent 40 €. Combien coûtent 4 places, en euros ?',
          enonce: '4 \\text{ places}', attendu: 20,
        },
        {
          id: 'e-4-2-4', type: 'calcul', palier: 2,
          consigne: '3 m de tissu coûtent 7,50 €. Combien coûtent 9 m, en euros ?',
          enonce: '9 \\text{ m}', attendu: 22.5,
        },
        {
          id: 'e-4-2-5', type: 'calcul', palier: 2,
          consigne: '10 cahiers coûtent 22 €. Combien coûtent 5 cahiers, en euros ?',
          enonce: '5 \\text{ cahiers}', attendu: 11,
          fausses: [{ valeur: 17, piege: 'linearite-mal-appliquee' }],
        },
        {
          id: 'e-4-2-6', type: 'calcul', palier: 3,
          consigne: '6 croissants coûtent 7,20 €. Combien coûtent 18 croissants, en euros ?',
          enonce: '18 \\text{ croissants}', attendu: 21.6,
        },
        {
          id: 'e-4-2-7', type: 'plausible', palier: 3,
          consigne: '5 kg de riz coûtent 9 €. Ce résultat est-il plausible ?',
          enonce: '15 \\text{ kg} = 12 \\text{ €}', attendu: false,
          explication: '15 kg, c\'est trois fois 5 kg : le prix doit être trois fois 9 €, soit 27 €. 12 € serait à peine plus que pour 5 kg.',
        },
      ],

      problemes: [
        {
          id: 'p-4-2-1',
          enonce: 'Une imprimante imprime 12 pages en 3 minutes, à vitesse constante.',
          questions: [
            { texte: 'Combien de pages imprime-t-elle en 9 minutes ?', attendu: 36, unite: 'pages' },
            { texte: 'Combien de pages en 1 minute ?', attendu: 4, unite: 'pages' },
          ],
        },
        {
          id: 'p-4-2-2',
          enonce: 'Une recette pour 4 personnes demande 300 g de farine.',
          questions: [
            { texte: 'Combien de farine pour 8 personnes, en grammes ?', attendu: 600, unite: 'g' },
            { texte: 'Et pour 2 personnes ?', attendu: 150, unite: 'g' },
          ],
        },
        {
          id: 'p-4-2-3',
          enonce: 'Un robinet remplit un seau de 6 litres en 2 minutes, à débit constant.',
          questions: [
            { texte: 'Combien de litres coulent en 10 minutes ?', attendu: 30, unite: 'L' },
            { texte: 'Combien de minutes pour 18 litres ?', attendu: 6, unite: 'min' },
          ],
        },
      ],

      test: [
        { id: 't-4-2-1', type: 'calcul', consigne: '3 kg coûtent 6 €. Prix de 9 kg ?', enonce: '9 \\text{ kg}', attendu: 18, revoir: 'propriete' },
        { id: 't-4-2-2', type: 'calcul', consigne: '5 places coûtent 40 €. Prix de 10 places ?', enonce: '10 \\text{ places}', attendu: 80, revoir: 'propriete' },
        { id: 't-4-2-3', type: 'calcul', consigne: '8 stylos coûtent 12 €. Prix de 4 stylos ?', enonce: '4 \\text{ stylos}', attendu: 6, revoir: 'exemple' },
        { id: 't-4-2-4', type: 'calcul', consigne: '2 L coûtent 3 €. Prix de 10 L ?', enonce: '10 \\text{ L}', attendu: 15, revoir: 'propriete' },
        { id: 't-4-2-5', type: 'calcul', consigne: '6 m coûtent 9 €. Prix de 2 m ?', enonce: '2 \\text{ m}', attendu: 3, revoir: 'exemple' },
        { id: 't-4-2-6', type: 'calcul', consigne: '4 kg coûtent 5 €. Prix de 20 kg ?', enonce: '20 \\text{ kg}', attendu: 25, revoir: 'propriete' },
        { id: 't-4-2-7', type: 'calcul', consigne: '12 pages en 4 min. Pages en 12 min ?', enonce: '12 \\text{ min}', attendu: 36, revoir: 'propriete' },
        { id: 't-4-2-8', type: 'calcul', consigne: '10 kg coûtent 24 €. Prix de 5 kg ?', enonce: '5 \\text{ kg}', attendu: 12, revoir: 'exemple' },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-4-3',
      titre: 'Le retour à l\'unité',
      attendus: [
        'Il calcule la valeur d\'une unité, puis celle d\'une quantité quelconque.',
        'Il garde les unités dans ses calculs.',
      ],

      decouvrir: {
        titre: 'Le prix au kilo, et tout devient facile',
        texte:
          '4 kg de cerises coûtent 12 €. On veut le prix de 7 kg — et 7 n\'est pas '
          + 'un multiple simple de 4.',
        lignes: [
          { calcul: 'La difficulté', resultat: '7 n\'est ni le double ni le triple de 4' },
          { calcul: 'L\'idée', resultat: 'passer par 1 kg' },
        ],
        question: 'Combien coûte 1 kg ? Et combien coûtent alors 7 kg ?',
        champs: [
          { id: 'a', etiquette: 'Prix de 1 kg (€)', attendu: 3 },
          { id: 'b', etiquette: 'Prix de 7 kg (€)', attendu: 21 },
        ],
        conclusion:
          'En passant par **1 kg**, on obtient n\'importe quelle quantité. C\'est le '
          + '« prix au kilo », et c\'est la procédure la plus souple : elle marche '
          + 'même quand les nombres ne tombent pas rond.',
      },

      cours: [
        {
          type: 'propriete',
          titre: 'Le retour à l\'unité',
          texte:
            'On calcule d\'abord la valeur pour **une** unité, en **divisant**. '
            + 'Puis on **multiplie** par la quantité voulue.',
        },
        {
          type: 'remarque',
          titre: 'Garder les unités',
          texte:
            'Écris-les dans le calcul : **12 € ÷ 4 kg = 3 € par kg**, puis '
            + '**3 € par kg × 7 kg = 21 €**. Les unités se simplifient et disent '
            + 'toutes seules si l\'opération est la bonne.',
        },
        {
          type: 'remarque',
          titre: 'Le contrôle du sens',
          texte:
            'La valeur d\'**une** unité est toujours **plus petite** que celle de '
            + 'plusieurs. Si ton prix au kilo dépasse le prix du sac entier, tu as '
            + 'multiplié au lieu de diviser.',
        },
        { type: 'exemple', texte: '12 € pour 4 kg → 3 € par kg → 7 kg coûtent 21 €' },
      ],

      methode: {
        titre: 'Calculer avec le retour à l\'unité',
        enonce: '5 places de concert coûtent 62,50 €. Combien coûtent 3 places ?',
        etapes: [
          { texte: 'Prix d\'une place : 62,50 € ÷ 5 places = 12,50 € par place.', note: 'On divise, donc le résultat rétrécit.' },
          { texte: 'Contrôle : 12,50 € est bien plus petit que 62,50 €.', note: '' },
          { texte: 'Prix de 3 places : 12,50 € × 3 = 37,50 €.', note: '' },
        ],
        controle:
          'Le contrôle : 3 places coûtent moins que 5, donc le résultat doit être '
          + 'plus petit que 62,50 €. Et plus que le prix d\'une seule.',
      },

      entrainement: [
        {
          id: 'e-4-3-1', type: 'calcul', palier: 1,
          consigne: '4 kg de cerises coûtent 12 €. Combien coûte 1 kg, en euros ?',
          enonce: '1 \\text{ kg}', attendu: 3,
          fausses: [{ valeur: 48, piege: 'retour-a-l-unite-inverse' }],
        },
        {
          id: 'e-4-3-2', type: 'calcul', palier: 1,
          consigne: '4 kg de cerises coûtent 12 €. Combien coûtent 7 kg, en euros ?',
          enonce: '7 \\text{ kg}', attendu: 21,
        },
        {
          id: 'e-4-3-3', type: 'calcul', palier: 2,
          consigne: '5 places coûtent 62,50 €. Combien coûtent 3 places, en euros ?',
          enonce: '3 \\text{ places}', attendu: 37.5,
        },
        {
          // Neutre : la quantité cherchée est plus GRANDE que celle donnée. Sans
          // cet item, « le résultat est toujours plus petit » s'installerait.
          id: 'e-4-3-4', type: 'calcul', palier: 2, neutre: true,
          consigne: '3 L de peinture couvrent 24 m². Combien de m² pour 5 L ?',
          enonce: '5 \\text{ L}', attendu: 40,
        },
        {
          id: 'e-4-3-5', type: 'calcul', palier: 2,
          consigne: '8 croissants coûtent 9,60 €. Combien coûte 1 croissant, en euros ?',
          enonce: '1 \\text{ croissant}', attendu: 1.2,
          fausses: [{ valeur: 76.8, piege: 'retour-a-l-unite-inverse' }],
        },
        {
          id: 'e-4-3-6', type: 'calcul', palier: 3,
          consigne: 'Une voiture parcourt 210 km avec 14 L. Combien de km avec 1 L ?',
          enonce: '1 \\text{ L}', attendu: 15,
        },
        {
          id: 'e-4-3-7', type: 'calcul', palier: 3,
          consigne: 'Une voiture parcourt 210 km avec 14 L. Combien de litres pour 90 km ?',
          enonce: '90 \\text{ km}', attendu: 6,
        },
      ],

      problemes: [
        {
          id: 'p-4-3-1',
          enonce: '6 kg de riz coûtent 13,20 €.',
          questions: [
            { texte: 'Quel est le prix au kilo, en euros ?', attendu: 2.2, unite: '€' },
            { texte: 'Combien coûtent 4 kg ?', attendu: 8.8, unite: '€' },
          ],
        },
        {
          id: 'p-4-3-2',
          enonce: 'Un cœur bat 210 fois en 3 minutes, à rythme régulier.',
          questions: [
            { texte: 'Combien de battements par minute ?', attendu: 70, unite: 'battements' },
            { texte: 'Combien de battements en 10 minutes ?', attendu: 700, unite: 'battements' },
          ],
        },
        {
          id: 'p-4-3-3',
          enonce: '7 photocopies coûtent 1,05 €.',
          questions: [
            { texte: 'Combien coûte une photocopie, en euros ?', attendu: 0.15, unite: '€' },
            { texte: 'Combien coûtent 20 photocopies ?', attendu: 3, unite: '€' },
          ],
        },
      ],

      test: [
        { id: 't-4-3-1', type: 'calcul', consigne: '5 kg coûtent 20 €. Prix de 1 kg ?', enonce: '1 \\text{ kg}', attendu: 4, revoir: 'propriete' },
        { id: 't-4-3-2', type: 'calcul', consigne: '5 kg coûtent 20 €. Prix de 7 kg ?', enonce: '7 \\text{ kg}', attendu: 28, revoir: 'propriete' },
        { id: 't-4-3-3', type: 'calcul', consigne: '4 places coûtent 30 €. Prix de 1 place ?', enonce: '1 \\text{ place}', attendu: 7.5, revoir: 'exemple' },
        { id: 't-4-3-4', type: 'calcul', consigne: '6 L coûtent 9 €. Prix de 1 L ?', enonce: '1 \\text{ L}', attendu: 1.5, revoir: 'propriete' },
        { id: 't-4-3-5', type: 'calcul', consigne: '6 L coûtent 9 €. Prix de 11 L ?', enonce: '11 \\text{ L}', attendu: 16.5, revoir: 'propriete' },
        { id: 't-4-3-6', type: 'calcul', consigne: '150 km en 2 h. Km en 1 h ?', enonce: '1 \\text{ h}', attendu: 75, revoir: 'remarque' },
        { id: 't-4-3-7', type: 'calcul', consigne: '150 km en 2 h. Km en 5 h ?', enonce: '5 \\text{ h}', attendu: 375, revoir: 'propriete' },
        { id: 't-4-3-8', type: 'calcul', consigne: '9 cahiers coûtent 13,50 €. Prix de 1 cahier ?', enonce: '1 \\text{ cahier}', attendu: 1.5, revoir: 'exemple' },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-4-4',
      titre: 'La linéarité additive',
      attendus: [
        'Il combine deux colonnes d\'un tableau en les additionnant.',
        'Il choisit la procédure la mieux adaptée aux nombres en jeu.',
      ],

      decouvrir: {
        titre: 'Additionner deux colonnes déjà connues',
        texte:
          'On connaît le prix de 2 kg et celui de 5 kg de pommes. On cherche celui '
          + 'de 7 kg, sans repasser par le prix au kilo.',
        lignes: [
          { calcul: '2 kg', resultat: '5 €' },
          { calcul: '5 kg', resultat: '12,50 €' },
        ],
        question: '7 kg, c\'est 2 kg plus 5 kg. Combien coûtent alors 7 kg ? Et combien coûtent 3 kg, sachant que 3 = 5 − 2 ?',
        champs: [
          { id: 'a', etiquette: 'Prix de 7 kg (€)', attendu: 17.5 },
          { id: 'b', etiquette: 'Prix de 3 kg (€)', attendu: 7.5 },
        ],
        conclusion:
          'On peut **additionner** ou **soustraire** deux colonnes, à condition de le '
          + 'faire sur les **deux lignes**. C\'est souvent le chemin le plus court '
          + 'quand les valeurs voulues se composent facilement.',
      },

      cours: [
        {
          type: 'propriete',
          titre: 'La linéarité additive',
          texte:
            'Dans un tableau de proportionnalité, on peut **additionner** deux '
            + 'colonnes — ou en **soustraire** une d\'une autre — pour en obtenir une '
            + 'nouvelle. L\'opération se fait sur les **deux grandeurs à la fois**.',
        },
        {
          type: 'remarque',
          titre: 'Choisir sa procédure',
          texte:
            'Le programme demande de choisir « la procédure la mieux adaptée aux '
            + 'nombres ». Multiplication quand une quantité est un multiple simple '
            + 'd\'une autre ; addition quand elle se compose de deux colonnes '
            + 'connues ; retour à l\'unité dans tous les autres cas.',
        },
        {
          type: 'remarque',
          titre: 'L\'erreur à éviter',
          texte:
            'Additionner les quantités sans additionner les prix — ou l\'inverse. '
            + 'Ce qu\'on fait à une ligne, on le fait à l\'autre, sinon la '
            + 'proportionnalité est cassée.',
        },
        { type: 'exemple', texte: '2 kg → 5 € et 5 kg → 12,50 €, donc 7 kg → 17,50 €' },
      ],

      methode: {
        titre: 'Composer 8 à partir de 3 et 5',
        enonce: '3 kg coûtent 7 € et 5 kg coûtent 11,50 €. Combien coûtent 8 kg ?',
        etapes: [
          { texte: 'Je remarque que 8 kg = 3 kg + 5 kg.', note: 'Les deux colonnes que je connais.' },
          { texte: 'J\'additionne aussi les prix : 7 € + 11,50 € = 18,50 €.', note: 'La même opération, sur les deux lignes.' },
          { texte: 'Donc 8 kg coûtent 18,50 €.', note: '' },
        ],
        controle:
          'Le contrôle : 8 kg coûtent plus que 5 kg et plus que 3 kg. Et le prix au '
          + 'kilo doit rester le même — ici environ 2,30 € dans les trois cas.',
      },

      entrainement: [
        {
          id: 'e-4-4-1', type: 'calcul', palier: 1,
          consigne: '2 kg coûtent 5 € et 5 kg coûtent 12,50 €. Combien coûtent 7 kg, en euros ?',
          enonce: '7 \\text{ kg}', attendu: 17.5,
          fausses: [{ valeur: 12.5, piege: 'linearite-mal-appliquee' }],
        },
        {
          id: 'e-4-4-2', type: 'calcul', palier: 1,
          consigne: '2 kg coûtent 5 € et 5 kg coûtent 12,50 €. Combien coûtent 3 kg, en euros ?',
          enonce: '3 \\text{ kg}', attendu: 7.5,
        },
        {
          // Neutre : ici la multiplication est plus rapide que l'addition. Le
          // programme demande de CHOISIR la procédure, pas d'en appliquer une seule.
          id: 'e-4-4-3', type: 'calcul', palier: 2, neutre: true,
          consigne: '3 kg coûtent 7 €. Combien coûtent 6 kg, en euros ?',
          enonce: '6 \\text{ kg}', attendu: 14,
        },
        {
          id: 'e-4-4-4', type: 'calcul', palier: 2,
          consigne: '3 kg coûtent 7 € et 5 kg coûtent 11,50 €. Combien coûtent 8 kg, en euros ?',
          enonce: '8 \\text{ kg}', attendu: 18.5,
        },
        {
          id: 'e-4-4-5', type: 'calcul', palier: 2,
          consigne: '10 places coûtent 75 € et 2 places coûtent 15 €. Combien coûtent 12 places, en euros ?',
          enonce: '12 \\text{ places}', attendu: 90,
        },
        {
          id: 'e-4-4-6', type: 'calcul', palier: 3,
          consigne: '4 m coûtent 10 € et 1 m coûte 2,50 €. Combien coûtent 3 m, en euros ?',
          enonce: '3 \\text{ m}', attendu: 7.5,
        },
        {
          id: 'e-4-4-7', type: 'plausible', palier: 3,
          consigne: '4 kg coûtent 6 € et 3 kg coûtent 4,50 €. Ce résultat est-il plausible ?',
          enonce: '7 \\text{ kg} = 10{,}50 \\text{ €}', attendu: true,
          explication: '7 kg = 4 kg + 3 kg, donc 6 € + 4,50 € = 10,50 €. Le prix au kilo reste 1,50 € dans les trois cas.',
        },
      ],

      problemes: [
        {
          id: 'p-4-4-1',
          enonce:
            'Un fleuriste vend ses roses à un prix proportionnel au nombre. '
            + '5 roses coûtent 8 € et 2 roses coûtent 3,20 €.',
          questions: [
            { texte: 'Combien coûtent 7 roses, en euros ?', attendu: 11.2, unite: '€' },
            { texte: 'Combien coûtent 3 roses ?', attendu: 4.8, unite: '€' },
          ],
        },
        {
          id: 'p-4-4-2',
          enonce:
            'Une machine produit 100 pièces en 4 heures et 25 pièces en 1 heure.',
          questions: [
            { texte: 'Combien de pièces produit-elle en 5 heures ?', attendu: 125, unite: 'pièces' },
            { texte: 'Combien en 3 heures ?', attendu: 75, unite: 'pièces' },
          ],
        },
        {
          id: 'p-4-4-3',
          enonce:
            'Un traiteur facture 6 repas 51 € et 2 repas 17 €.',
          questions: [
            { texte: 'Combien coûtent 8 repas, en euros ?', attendu: 68, unite: '€' },
            { texte: 'Combien coûtent 4 repas ?', attendu: 34, unite: '€' },
          ],
        },
      ],

      test: [
        { id: 't-4-4-1', type: 'calcul', consigne: '2 kg → 6 €, 5 kg → 15 €. Prix de 7 kg ?', enonce: '7 \\text{ kg}', attendu: 21, revoir: 'propriete' },
        { id: 't-4-4-2', type: 'calcul', consigne: '2 kg → 6 €, 5 kg → 15 €. Prix de 3 kg ?', enonce: '3 \\text{ kg}', attendu: 9, revoir: 'propriete' },
        { id: 't-4-4-3', type: 'calcul', consigne: '4 L → 10 €, 1 L → 2,50 €. Prix de 5 L ?', enonce: '5 \\text{ L}', attendu: 12.5, revoir: 'exemple' },
        { id: 't-4-4-4', type: 'calcul', consigne: '10 places → 60 €, 3 places → 18 €. Prix de 13 places ?', enonce: '13 \\text{ places}', attendu: 78, revoir: 'propriete' },
        { id: 't-4-4-5', type: 'calcul', consigne: '6 m → 15 €, 2 m → 5 €. Prix de 4 m ?', enonce: '4 \\text{ m}', attendu: 10, revoir: 'propriete' },
        { id: 't-4-4-6', type: 'calcul', consigne: '5 kg → 12 €. Prix de 10 kg ?', enonce: '10 \\text{ kg}', attendu: 24, revoir: 'remarque' },
        { id: 't-4-4-7', type: 'calcul', consigne: '8 pièces → 20 €, 2 pièces → 5 €. Prix de 10 pièces ?', enonce: '10 \\text{ pièces}', attendu: 25, revoir: 'propriete' },
        { id: 't-4-4-8', type: 'calcul', consigne: '9 kg → 27 €, 4 kg → 12 €. Prix de 5 kg ?', enonce: '5 \\text{ kg}', attendu: 15, revoir: 'propriete' },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-4-5',
      titre: 'S\'initier aux échelles',
      attendus: [
        'Il calcule une distance réelle à partir d\'une mesure sur un plan.',
        'Il calcule une mesure sur le plan à partir d\'une distance réelle.',
      ],

      decouvrir: {
        titre: 'Sur la carte, un centimètre vaut deux kilomètres',
        texte:
          'Une carte de randonnée porte la mention : « 1 cm représente 2 km ». '
          + 'On mesure 5 cm entre deux villages.',
        lignes: [
          { calcul: 'Sur la carte', resultat: '1 cm → 2 km' },
          { calcul: 'On mesure', resultat: '5 cm' },
        ],
        question: 'Quelle distance réelle sépare les deux villages, en kilomètres ? Et combien de centimètres sur la carte pour 14 km ?',
        champs: [
          { id: 'a', etiquette: 'Distance réelle (km)', attendu: 10 },
          { id: 'b', etiquette: 'Sur la carte (cm)', attendu: 7 },
        ],
        conclusion:
          'Une échelle est une **proportionnalité** entre le plan et le terrain. '
          + 'De la carte vers le réel, on **multiplie** — le terrain est plus grand. '
          + 'Du réel vers la carte, on **divise**.',
      },

      cours: [
        {
          type: 'definition',
          titre: 'Une échelle',
          texte:
            'Une échelle indique à quelle distance réelle correspond une distance '
            + 'mesurée sur le plan. « 1 cm pour 2 km » veut dire que chaque '
            + 'centimètre du dessin représente 2 kilomètres sur le terrain.',
        },
        {
          type: 'propriete',
          titre: 'Les deux sens',
          texte:
            'Du **plan vers le réel** : on multiplie par ce que vaut 1 cm.\n'
            + 'Du **réel vers le plan** : on divise par cette même valeur.',
        },
        {
          type: 'remarque',
          titre: 'Écrire les unités sauve',
          texte:
            'C\'est le vrai piège des échelles. Écris : **5 cm × 2 km par cm = 10 km**. '
            + 'Le « cm » disparaît, il reste des kilomètres — la preuve que '
            + 'l\'opération est la bonne.',
        },
        { type: 'exemple', texte: 'Échelle 1 cm pour 2 km : 5 cm → 10 km   ·   14 km → 7 cm' },
      ],

      methode: {
        titre: 'Lire une distance sur une carte',
        enonce: 'Sur une carte où 1 cm représente 25 km, on mesure 6 cm. Quelle est la distance réelle ?',
        etapes: [
          { texte: 'Je cherche une distance réelle : elle sera plus grande que 6 cm.', note: 'Donc je multiplie.' },
          { texte: '6 cm × 25 km par cm = 150 km.', note: 'Les « cm » se simplifient.' },
          { texte: 'La distance réelle est de 150 km.', note: '' },
        ],
        controle:
          'Le contrôle : sur une carte, le terrain est toujours plus grand que le '
          + 'dessin. Si ton résultat est plus petit que ce que tu as mesuré, tu as '
          + 'divisé au lieu de multiplier.',
      },

      entrainement: [
        {
          id: 'e-4-5-1', type: 'calcul', palier: 1,
          consigne: 'Échelle : 1 cm pour 2 km. On mesure 5 cm. Distance réelle en km ?',
          enonce: '5 \\text{ cm}', attendu: 10,
          fausses: [{ valeur: 2.5, piege: 'echelle-sens-inverse' }],
        },
        {
          id: 'e-4-5-2', type: 'calcul', palier: 1,
          consigne: 'Échelle : 1 cm pour 2 km. Distance réelle de 14 km. Combien de cm sur la carte ?',
          enonce: '14 \\text{ km}', attendu: 7,
          fausses: [{ valeur: 28, piege: 'echelle-sens-inverse' }],
        },
        {
          id: 'e-4-5-3', type: 'calcul', palier: 2,
          consigne: 'Échelle : 1 cm pour 25 km. On mesure 6 cm. Distance réelle en km ?',
          enonce: '6 \\text{ cm}', attendu: 150,
        },
        {
          // Neutre : un plan d'AGRANDISSEMENT, où le dessin est plus grand que
          // l'objet. Sans cet item, « le réel est toujours plus grand » deviendrait
          // la règle — et elle serait fausse pour un plan d'insecte ou de pièce.
          id: 'e-4-5-4', type: 'calcul', palier: 3, neutre: true,
          consigne: 'Un dessin agrandi montre une fourmi : 1 cm du dessin représente 0,1 cm réel. Le dessin mesure 8 cm. Taille réelle en cm ?',
          enonce: '8 \\text{ cm}', attendu: 0.8,
        },
        {
          id: 'e-4-5-5', type: 'calcul', palier: 2,
          consigne: 'Échelle : 1 cm pour 50 km. Distance réelle de 350 km. Combien de cm sur la carte ?',
          enonce: '350 \\text{ km}', attendu: 7,
        },
        {
          id: 'e-4-5-6', type: 'calcul', palier: 3,
          consigne: 'Échelle : 1 cm pour 1,5 km. On mesure 12 cm. Distance réelle en km ?',
          enonce: '12 \\text{ cm}', attendu: 18,
        },
        {
          id: 'e-4-5-7', type: 'plausible', palier: 3,
          consigne: 'Sur une carte où 1 cm vaut 10 km, on mesure 8 cm. Ce résultat est-il plausible ?',
          enonce: '0{,}8 \\text{ km}', attendu: false,
          explication: 'Le terrain est plus grand que la carte : 8 cm doivent donner 80 km, pas 0,8. La division a été faite dans le mauvais sens.',
        },
      ],

      problemes: [
        {
          id: 'p-4-5-1',
          enonce:
            'Sur une carte routière, 1 cm représente 20 km. Anto mesure 4,5 cm '
            + 'entre deux villes.',
          questions: [
            { texte: 'Quelle est la distance réelle, en kilomètres ?', attendu: 90, unite: 'km' },
            { texte: 'Deux autres villes sont distantes de 150 km. Combien de cm sur la carte ?', attendu: 7.5, unite: 'cm' },
          ],
        },
        {
          id: 'p-4-5-2',
          enonce:
            'Le plan d\'un appartement est à l\'échelle 1 cm pour 2 m.',
          questions: [
            { texte: 'Une pièce mesure 3,5 cm sur le plan. Quelle est sa longueur réelle, en mètres ?', attendu: 7, unite: 'm' },
            { texte: 'Un couloir mesure 5 m. Combien de cm sur le plan ?', attendu: 2.5, unite: 'cm' },
          ],
        },
        {
          id: 'p-4-5-3',
          enonce:
            'Une carte de randonnée porte l\'échelle : 1 cm pour 500 m.',
          questions: [
            { texte: 'Un sentier mesure 6 cm sur la carte. Quelle est sa longueur réelle, en mètres ?', attendu: 3000, unite: 'm' },
            { texte: 'Combien cela fait-il de kilomètres ?', attendu: 3, unite: 'km' },
          ],
        },
      ],

      test: [
        { id: 't-4-5-1', type: 'calcul', consigne: '1 cm pour 3 km. 4 cm mesurés : distance réelle en km ?', enonce: '4 \\text{ cm}', attendu: 12, revoir: 'propriete' },
        { id: 't-4-5-2', type: 'calcul', consigne: '1 cm pour 3 km. 21 km réels : cm sur la carte ?', enonce: '21 \\text{ km}', attendu: 7, revoir: 'propriete' },
        { id: 't-4-5-3', type: 'calcul', consigne: '1 cm pour 10 km. 8 cm mesurés : distance réelle en km ?', enonce: '8 \\text{ cm}', attendu: 80, revoir: 'exemple' },
        { id: 't-4-5-4', type: 'calcul', consigne: '1 cm pour 5 m. 4,5 cm mesurés : longueur réelle en m ?', enonce: '4{,}5 \\text{ cm}', attendu: 22.5, revoir: 'propriete' },
        { id: 't-4-5-5', type: 'calcul', consigne: '1 cm pour 100 km. 350 km réels : cm sur la carte ?', enonce: '350 \\text{ km}', attendu: 3.5, revoir: 'propriete' },
        { id: 't-4-5-6', type: 'calcul', consigne: '1 cm pour 2 m. 6 m réels : cm sur le plan ?', enonce: '6 \\text{ m}', attendu: 3, revoir: 'propriete' },
        { id: 't-4-5-7', type: 'calcul', consigne: '1 cm pour 250 m. 4 cm mesurés : longueur réelle en m ?', enonce: '4 \\text{ cm}', attendu: 1000, revoir: 'exemple' },
        { id: 't-4-5-8', type: 'calcul', consigne: '1 cm pour 1,5 km. 8 cm mesurés : distance réelle en km ?', enonce: '8 \\text{ cm}', attendu: 12, revoir: 'propriete' },
      ],
    },
  ],
};
