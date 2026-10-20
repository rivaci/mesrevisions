// L'épreuve blanche n° 1 — une heure, notée sur 20, corrigée à la fin.
//
// Elle porte sur ce qu'Evan a eu en cours depuis la rentrée, et sur rien
// d'autre : le chapitre Thalès (son cours, avec les triangles semblables, la
// réciproque et la contraposée), son interrogation de calcul mental, la
// feuille « Calcul numérique / fractionnaire / avec exposants » et la fiche
// de calcul littéral de son dossier de maths.
//
// Trois parties, comme un contrôle :
//   A  Connaissances                 5 pts   les énoncés, écrits de mémoire ;
//   B  Application                   8 pts   calculs et questions corrigés par l'appli ;
//   C  Démonstrations et problème    7 pts   deux rédactions, et le problème de
//                                            calcul littéral : développer,
//                                            factoriser, résoudre.
//
// Les lettres, les figures et les nombres sont neufs : aucune question n'est
// reprise des exercices de l'appli ni de ses fiches, pour que l'épreuve
// mesure ce qu'il sait faire et pas ce dont il se souvient. Seule exception,
// inévitable : les carrés à connaître (√196) sont ceux de la table du cours.
// Les réponses ne sont pas écrites à la main quand elles se calculent :
// exact.js calcule les calculs, et le contrôle de contenu
// (tools/verifier-contenu.mjs) refait les expressions en polynômes exacts
// (litteral.js) et la géométrie sur la figure.
//
// ── La première version ───────────────────────────────────────────────────
//
// Une première version, publiée le 20 octobre 2026, n'avait pas de calcul
// littéral : la fiche d'Evan n'était pas encore arrivée. Elle reste ici,
// sous son identifiant, pour qu'une copie déjà passée se relise avec son
// propre sujet ; elle n'est plus proposée.

// Comme sur un sujet : la figure est juste, mais on n'y mesure rien.
const PAS_EN_VRAIE_GRANDEUR = 'La figure n\'est pas en vraie grandeur.';

export const EPREUVE_1_V1 = {
  id: 'ece-1',
  numero: 1,
  titre: 'Épreuve blanche n° 1 (première version)',
  sousTitre: 'Thalès, triangles semblables, calcul mental, calculs',
  duree: 60,
  parties: [
    {
      id: 'A',
      titre: 'Connaissances',
      consigne: 'Écris de mémoire les énoncés du cours, avec les points de la figure quand il y en a une.',
      questions: [
        {
          id: 'A1', type: 'enonce', points: 1.5,
          competence: 'Énoncer le théorème de Thalès', revoir: 'sf-1-2',
          titre: 'Le théorème de Thalès',
          consigne: 'Écris le théorème de Thalès avec les points de cette figure : « On considère… Si…, alors… ».',
          figure: { modele: 'thales', sommet: 'O', d1: { R: 2.5, T: 6 }, d2: { S: 2, U: 4.8 }, base: ['RS', 1.8] },
          enonce:
            'On considère deux droites (RT) et (SU) sécantes en O. Si les droites (RS) et (TU) sont **parallèles**, '
            + 'alors on a les égalités : **OR/OT = OS/OU = RS/TU**.',
          elements: [
            { id: 'secantes', texte: 'le cadre : les droites (RT) et (SU) sont sécantes en O' },
            { id: 'paralleles', texte: 'l\'hypothèse, dans le « si » : les droites (RS) et (TU) sont parallèles' },
            { id: 'or-ot', texte: 'le rapport OR/OT (ou OT/OR, si les trois rapports sont retournés)' },
            { id: 'os-ou', texte: 'le rapport OS/OU (ou OU/OS)' },
            { id: 'rs-tu', texte: 'le rapport RS/TU (ou TU/RS)' },
            { id: 'egalite', texte: 'la conclusion, dans le « alors » : les trois rapports sont égaux' },
          ],
        },
        {
          id: 'A2', type: 'enonce', points: 1.5,
          competence: 'Énoncer la réciproque du théorème de Thalès', revoir: 'sf-1-3',
          titre: 'La réciproque du théorème de Thalès',
          consigne: 'Écris la réciproque du théorème de Thalès avec les points de cette figure : les conditions, puis la conclusion.',
          figure: { modele: 'thales', sommet: 'K', d1: { E: 3, F: 7.5 }, d2: { G: 2, H: 5 }, angle: 48 },
          enonce:
            'Si deux droites (EF) et (GH) sont sécantes en K, si les points K, E, F sont alignés **dans le même '
            + 'ordre** que les points K, G, H, et si **KE/KF = KG/KH**, alors les droites **(EG) et (FH) sont '
            + 'parallèles**.',
          elements: [
            { id: 'secantes', texte: 'les droites (EF) et (GH) sont sécantes en K' },
            { id: 'meme-ordre', texte: 'les points K, E, F sont alignés dans le même ordre que les points K, G, H' },
            { id: 'egalite', texte: 'l\'égalité KE/KF = KG/KH (ou KF/KE = KH/KG), dans le « si »' },
            { id: 'conclusion', texte: 'la conclusion : les droites (EG) et (FH) sont parallèles' },
          ],
        },
        {
          id: 'A3', type: 'enonce', points: 1,
          competence: 'Énoncer la contraposée et savoir à quoi elle sert', revoir: 'sf-1-3',
          titre: 'La contraposée du théorème de Thalès',
          consigne: 'Avec les points de la même figure, écris la contraposée du théorème de Thalès, puis dis à quoi elle sert.',
          figure: { modele: 'thales', sommet: 'K', d1: { E: 3, F: 7.5 }, d2: { G: 2, H: 5 }, angle: 48 },
          enonce:
            'Si **KE/KF n\'est pas égal à KG/KH**, alors les droites (EG) et (FH) **ne sont pas parallèles**. Elle '
            + 'sert à démontrer que deux droites ne sont pas parallèles — ce que la réciproque ne fait pas.',
          elements: [
            { id: 'rapports-differents', texte: 'l\'hypothèse : KE/KF et KG/KH (ou leurs inverses) ne sont pas égaux' },
            { id: 'pas-paralleles', texte: 'la conclusion : les droites (EG) et (FH) ne sont pas parallèles' },
            { id: 'usage', texte: 'à quoi elle sert : démontrer que deux droites ne sont PAS parallèles' },
          ],
        },
        {
          id: 'A4', type: 'enonce', points: 1,
          competence: 'Définir des triangles semblables et dire ce qu\'on sait de leurs côtés', revoir: 'sf-1-5',
          titre: 'Les triangles semblables',
          consigne:
            'Donne la définition de deux triangles semblables, puis la propriété de leurs côtés : '
            + '« Si deux triangles sont semblables, alors… ».',
          enonce:
            'On dit que deux triangles sont **semblables** si leurs angles sont **deux à deux de même mesure**. '
            + 'Si deux triangles sont semblables, alors les longueurs de leurs côtés **homologues** sont **proportionnelles**.',
          elements: [
            { id: 'angles', texte: 'la définition porte sur les angles, pas sur les côtés' },
            { id: 'meme-mesure', texte: 'les angles sont deux à deux de même mesure' },
            { id: 'homologues', texte: 'la propriété porte sur les côtés homologues' },
            { id: 'proportionnelles', texte: 'leurs longueurs sont proportionnelles' },
          ],
        },
      ],
    },
    {
      id: 'B',
      titre: 'Application',
      consigne: 'Calcule sur ton brouillon et donne seulement le résultat. Le calcul mental se fait de tête.',
      questions: [
        // ── Calcul mental : les familles de son interrogation ──────────────
        { id: 'B1', type: 'exact', points: 0.25, famille: 'calcul-mental', consigne: 'Calcul mental.', calcul: '0,9 × 7', forme: 'decimal', competence: 'Calcul mental : les décimaux', revoir: 'sf-2-1' },
        { id: 'B2', type: 'exact', points: 0.25, famille: 'calcul-mental', consigne: 'Calcul mental.', calcul: '56,3 ÷ 100', forme: 'decimal', competence: 'Calcul mental : diviser par 100', revoir: 'sf-2-1' },
        { id: 'B3', type: 'exact', points: 0.25, famille: 'calcul-mental', consigne: 'Calcul mental.', calcul: '√196', forme: 'decimal', competence: 'Calcul mental : les racines carrées', revoir: 'sf-2-2' },
        {
          id: 'B4', type: 'nombres', points: 0.25, famille: 'calcul-mental', consigne: 'Calcul mental : trouve le nombre manquant.',
          enonce: '? - 38 = 27', controle: '27 + 38',
          champs: [{ id: 'a', etiquette: 'Le nombre manquant', nom: '?', attendu: 65 }],
          competence: 'Calcul mental : le nombre manquant', revoir: 'sf-2-3',
        },
        { id: 'B5', type: 'exact', points: 0.25, famille: 'calcul-mental', consigne: 'Calcul mental.', calcul: '25 × 12', forme: 'decimal', competence: 'Calcul mental : les entiers', revoir: 'sf-2-4' },
        { id: 'B6', type: 'exact', points: 0.25, famille: 'calcul-mental', consigne: 'Calcul mental.', calcul: '(−13) − (+6)', forme: 'decimal', competence: 'Calcul mental : les relatifs', revoir: 'sf-2-6' },

        // ── La feuille de calculs : priorités, fractions, puissances ───────
        {
          id: 'B7', type: 'exact', points: 0.5, famille: 'feuille', nom: 'A', consigne: 'Calcule A.',
          calcul: '7 − 4 × (2 − 5) + (−6)', forme: 'decimal',
          competence: 'Priorités opératoires avec des relatifs', revoir: 'sf-2-6',
        },
        {
          id: 'B8', type: 'exact', points: 0.75, famille: 'feuille', nom: 'B', consigne: 'Calcule B. Donne le résultat sous forme de fraction irréductible.',
          calcul: '3/4 − 1/4 × 6/5', forme: 'fraction',
          competence: 'Calcul fractionnaire : la multiplication avant la soustraction', revoir: 'sf-2-5',
        },
        {
          id: 'B9', type: 'exact', points: 0.5, famille: 'feuille', nom: 'C', consigne: 'Calcule C.',
          calcul: '−3^2 + (−2)^3', forme: 'decimal',
          competence: 'Puissances : −3² et (−2)³',
        },
        {
          id: 'B10', type: 'exact', points: 0.75, famille: 'feuille', nom: 'D', consigne: 'Calcule D. Donne le résultat en écriture scientifique.',
          calcul: '(4 × 10^5 × 6 × 10^-2)/(8 × 10^-3)', forme: 'scientifique',
          competence: 'Puissances de 10 et écriture scientifique',
        },

        // ── Thalès et les triangles semblables ─────────────────────────────
        {
          id: 'B11', type: 'nombres', points: 1, famille: 'geometrie',
          consigne: 'Les droites (JL) et (KM) sont sécantes en I, et les droites (JK) et (LM) sont parallèles. '
            + 'IJ = 2 cm, IL = 5 cm, IK = 2,4 cm et JK = 1,6 cm. Calcule IM et LM.',
          figure: {
            modele: 'thales', sommet: 'I', d1: { J: 2, L: -5 }, d2: { K: 2.4, M: -6 }, base: ['JK', 1.6],
            cotes: { JK: '1,6', IM: '?', LM: '?' }, titre: PAS_EN_VRAIE_GRANDEUR,
          },
          champs: [
            { id: 'a', etiquette: 'IM, en cm', nom: 'IM', unite: 'cm', attendu: 6, longueurDe: 'IM' },
            { id: 'b', etiquette: 'LM, en cm', nom: 'LM', unite: 'cm', attendu: 4, longueurDe: 'LM' },
          ],
          competence: 'Calculer des longueurs avec Thalès dans un papillon', revoir: 'sf-1-2',
        },
        {
          id: 'B12', type: 'choix', points: 1, famille: 'geometrie',
          consigne: 'Les points P, Q, R sont alignés dans cet ordre, ainsi que P, S, T. PQ = 4 cm, PR = 10 cm, '
            + 'PS = 3 cm et PT = 7 cm. Les droites (QS) et (RT) sont-elles parallèles ?',
          figure: { modele: 'thales', sommet: 'P', d1: { Q: 4, R: 10 }, d2: { S: 3, T: 7 }, angle: 50, titre: PAS_EN_VRAIE_GRANDEUR },
          paralleles: false,
          choix: [
            'Oui, d\'après la réciproque du théorème de Thalès',
            'Non, d\'après la réciproque du théorème de Thalès',
            'Oui, d\'après le théorème de Thalès',
            'Non, d\'après la contraposée du théorème de Thalès',
          ],
          attendu: 'Non, d\'après la contraposée du théorème de Thalès',
          // La bonne conclusion avec le mauvais théorème : la moitié des points,
          // comme sur une copie. C'est l'« ATTENTION » de son cours.
          credits: { 'Non, d\'après la réciproque du théorème de Thalès': 0.5 },
          competence: 'Réciproque ou contraposée : choisir le bon théorème', revoir: 'sf-1-3',
        },
        {
          id: 'B13', type: 'nombres', points: 0.5, famille: 'geometrie',
          consigne: 'Toutes les longueurs d\'un triangle d\'aire 4 cm² sont multipliées par 5. Quelle est l\'aire du triangle obtenu ?',
          controle: '4 × 5^2',
          champs: [{ id: 'a', etiquette: 'L\'aire, en cm²', nom: 'aire', unite: 'cm²', attendu: 100 }],
          competence: 'Agrandissement : les aires multipliées par k²', revoir: 'sf-1-4',
        },
        {
          id: 'B14', type: 'choix', points: 0.5, famille: 'geometrie',
          consigne: 'Dans le triangle ABC, l\'angle en A mesure 48° et l\'angle en B mesure 67°. Dans le triangle DEF, '
            + 'l\'angle en D mesure 65° et l\'angle en E mesure 48°. Ces deux triangles sont-ils semblables ?',
          semblablesAngles: [[48, 67], [65, 48]],
          choix: [
            'Non : ils n\'ont qu\'un angle de même mesure',
            'On ne peut pas savoir sans les longueurs',
            'Oui : ils ont deux paires d\'angles de même mesure',
          ],
          attendu: 'Oui : ils ont deux paires d\'angles de même mesure',
          competence: 'Reconnaître des triangles semblables', revoir: 'sf-1-5',
        },
      ],
    },
    {
      id: 'C',
      titre: 'Démonstrations',
      consigne: 'Rédige chaque démonstration en entier, comme en contrôle : ce qu\'on sait, le théorème, les calculs, la conclusion.',
      questions: [
        {
          id: 'C1', type: 'redaction', points: 3,
          competence: 'Rédiger un calcul de longueur avec Thalès', revoir: 'sf-1-2',
          titre: 'Calculer une longueur',
          enonce:
            'Les droites (EG) et (FH) sont sécantes en D, et les droites (EF) et (GH) sont parallèles. Les points '
            + 'D, E, G sont alignés dans cet ordre. DE = 4 cm, EG = 6 cm et EF = 2,4 cm.',
          consigne: 'Calcule la longueur GH. Rédige comme dans ton cours : « On sait que… Donc, d\'après… On en déduit que… ».',
          figure: {
            modele: 'thales', sommet: 'D', d1: { E: 4, G: 10 }, d2: { F: 3, H: 7.5 }, base: ['EF', 2.4],
            cotes: { DE: '4', EG: '6', EF: '2,4', GH: '?' }, titre: PAS_EN_VRAIE_GRANDEUR,
          },
          longueurDe: 'GH', attendu: 6,
          criteres: [
            { id: 'cadre', texte: 'le cadre : les droites (EG) et (FH) sécantes en D, et (EF) parallèle à (GH)' },
            { id: 'dg', texte: 'la longueur DG calculée d\'abord : DG = DE + EG = 4 + 6 = 10 cm' },
            { id: 'theoreme', texte: 'le théorème cité : « d\'après le théorème de Thalès »' },
            { id: 'egalites', texte: 'les égalités DE/DG = DF/DH = EF/GH, bien appariées (ou toutes retournées)' },
            { id: 'remplacement', texte: 'les longueurs connues remplacées : 4/10 = 2,4/GH (ou 10/4 = GH/2,4) — avec DG = 10, pas EG = 6' },
            { id: 'calcul', texte: 'le calcul : GH = 2,4 × 10 ÷ 4 = 6' },
            { id: 'conclusion', texte: 'la conclusion, avec l\'unité : GH = 6 cm' },
          ],
          modele: [
            'On sait que les droites (EG) et (FH) sont sécantes en D, et que les droites (EF) et (GH) sont parallèles.',
            'Les points D, E, G sont alignés dans cet ordre, donc DG = DE + EG = 4 + 6 = 10 cm.',
            'Donc, d\'après le théorème de Thalès, on a les égalités : DE/DG = DF/DH = EF/GH.',
            'Soit : 4/10 = DF/DH = 2,4/GH.',
            'On en déduit que GH = 2,4 × 10 ÷ 4 = 6.',
            'Donc GH = 6 cm.',
          ],
        },
        {
          id: 'C2', type: 'redaction', points: 3,
          competence: 'Rédiger avec la réciproque : démontrer que deux droites sont parallèles', revoir: 'sf-1-3',
          titre: 'Des droites parallèles ?',
          enonce:
            'Les droites (NP) et (QR) sont sécantes en M. Les points M, N, P sont alignés dans cet ordre, ainsi '
            + 'que M, Q, R. MN = 2,8 cm, MP = 7 cm, MQ = 3,6 cm et MR = 9 cm.',
          consigne: 'Les droites (NQ) et (PR) sont-elles parallèles ? Rédige ta démonstration.',
          figure: { modele: 'thales', sommet: 'M', d1: { N: 2.8, P: 7 }, d2: { Q: 3.6, R: 9 }, angle: 44, titre: PAS_EN_VRAIE_GRANDEUR },
          paralleles: true,
          criteres: [
            { id: 'cadre', texte: 'le cadre : les droites (NP) et (QR) sont sécantes en M' },
            { id: 'rapport-1', texte: 'd\'une part, MN/MP = 2,8/7 = 0,4 — calculé seul (ou MP/MN = 2,5, si les deux rapports sont retournés)' },
            { id: 'rapport-2', texte: 'd\'autre part, MQ/MR = 3,6/9 = 0,4 — calculé seul (ou MR/MQ = 2,5)' },
            { id: 'comparaison', texte: 'la comparaison : les deux rapports sont égaux' },
            { id: 'meme-ordre', texte: 'les points M, N, P alignés dans le même ordre que les points M, Q, R' },
            { id: 'theoreme', texte: 'la réciproque du théorème de Thalès, citée' },
            { id: 'conclusion', texte: 'la conclusion : les droites (NQ) et (PR) sont parallèles' },
          ],
          modele: [
            'On sait que les droites (NP) et (QR) sont sécantes en M.',
            'D\'une part : MN/MP = 2,8/7 = 0,4. Et d\'autre part : MQ/MR = 3,6/9 = 0,4.',
            'On constate que MN/MP = MQ/MR.',
            'De plus, les points M, N, P sont alignés dans le même ordre que les points M, Q, R.',
            'Donc, d\'après la réciproque du théorème de Thalès, les droites (NQ) et (PR) sont parallèles.',
          ],
        },
        {
          id: 'C3', type: 'redaction', points: 2,
          competence: 'Démontrer que deux triangles sont semblables, et trouver k', revoir: 'sf-1-5',
          titre: 'Deux triangles semblables',
          enonce:
            'Dans le triangle RST, l\'angle en R mesure 35° et l\'angle en S mesure 105°. Dans le triangle UVW, '
            + 'l\'angle en U mesure 40° et l\'angle en V mesure 35°. De plus, ST = 5 cm et UW = 7,5 cm.',
          consigne:
            '1. Démontre que les triangles RST et UVW sont semblables. 2. Les côtés [ST] et [UW] sont homologues : '
            + 'calcule le coefficient k qui permet de passer du triangle RST au triangle UVW.',
          triangles: ['RST', 'UVW'], semblablesAngles: [[35, 105], [40, 35]], semblables: true,
          homologues: { ST: 'UW' }, coefficient: 1.5,
          criteres: [
            { id: 'troisieme-angle', texte: 'un troisième angle calculé avec la somme des angles : l\'angle en T, 180° − 35° − 105° = 40° (ou l\'angle en W, 180° − 40° − 35° = 105°)' },
            { id: 'deux-paires', texte: 'deux paires d\'angles égaux, nommées : en R et en V (35°), et en T et en U (40°) — ou en S et en W (105°)' },
            { id: 'justification', texte: 'la justification : deux paires d\'angles de même mesure suffisent' },
            { id: 'conclusion', texte: 'la conclusion : les triangles RST et UVW sont semblables' },
            { id: 'coefficient', texte: 'le coefficient : k = UW/ST = 7,5/5 = 1,5' },
          ],
          modele: [
            'Dans le triangle RST, la somme des angles vaut 180°, donc l\'angle en T mesure 180° − 35° − 105° = 40°.',
            'Les triangles RST et UVW ont donc deux paires d\'angles de même mesure : les angles en R et en V (35°), et les angles en T et en U (40°).',
            'Or deux triangles qui ont deux paires d\'angles de même mesure sont semblables.',
            'Donc les triangles RST et UVW sont semblables.',
            'Les côtés [ST] et [UW] sont homologues, donc k = UW/ST = 7,5/5 = 1,5 : c\'est un agrandissement.',
          ],
        },
      ],
    },
  ],
};

// ── L'épreuve n° 1, avec le calcul littéral ────────────────────────────────
//
// Les questions de Thalès et de calcul reprennent celles de la première
// version, à leur nouveau barème ; le calcul littéral s'y ajoute.

const reprise = (id, changements = {}) => {
  const q = EPREUVE_1_V1.parties.flatMap((p) => p.questions).find((x) => x.id === id);
  return { ...q, ...changements };
};

export const EPREUVE_1 = {
  id: 'ece-1-v2',
  numero: 1,
  titre: 'Épreuve blanche n° 1',
  sousTitre: 'Thalès, calcul mental, calculs, calcul littéral',
  duree: 60,
  parties: [
    {
      id: 'A',
      titre: 'Connaissances',
      consigne: 'Écris de mémoire les énoncés du cours, avec les points de la figure quand il y en a une.',
      questions: [
        reprise('A1'),
        reprise('A2', { points: 1.25 }),
        reprise('A3', { points: 0.75 }),
        {
          id: 'A4', type: 'enonce', points: 1.5,
          competence: 'Écrire les trois identités remarquables', revoir: 'sf-3-4',
          titre: 'Les identités remarquables',
          consigne: 'Écris les trois identités remarquables, avec a et b.',
          enonce: '**(a + b)² = a² + 2ab + b²** ; **(a − b)² = a² − 2ab + b²** ; **(a + b)(a − b) = a² − b²**.',
          elements: [
            { id: 'carre-somme', texte: '(a + b)² = a² + 2ab + b²' },
            { id: 'carre-difference', texte: '(a − b)² = a² − 2ab + b²' },
            { id: 'produit', texte: '(a + b)(a − b) = a² − b²' },
          ],
        },
      ],
    },
    {
      id: 'B',
      titre: 'Application',
      consigne: 'Calcule sur ton brouillon et donne seulement le résultat. Le calcul mental se fait de tête.',
      questions: [
        // ── Calcul mental ──────────────────────────────────────────────────
        reprise('B1'),
        reprise('B3', { id: 'B2' }),
        reprise('B4', { id: 'B3' }),
        reprise('B6', { id: 'B4' }),
        // ── La feuille de calculs ──────────────────────────────────────────
        reprise('B7', { id: 'B5' }),
        reprise('B8', { id: 'B6' }),
        reprise('B10', { id: 'B7' }),
        // ── Le calcul littéral ─────────────────────────────────────────────
        {
          id: 'B8', type: 'litteral', points: 0.5, famille: 'litteral', nom: 'E', consigne: 'Réduis E.',
          enonce: '4x^2-3x+7-x^2+5x-9', forme: 'reduite', attendu: '3x^2+2x-2',
          competence: 'Réduire une expression', revoir: 'sf-3-1',
        },
        {
          id: 'B9', type: 'litteral', points: 0.75, famille: 'litteral', nom: 'F', consigne: 'Développe et réduis F.',
          enonce: '(2x-3)(x+4)', forme: 'reduite', attendu: '2x^2+5x-12',
          competence: 'Développer avec la double distributivité', revoir: 'sf-3-3',
        },
        {
          id: 'B10', type: 'litteral', points: 0.5, famille: 'litteral', nom: 'G', consigne: 'Développe et réduis G.',
          enonce: '(3x-2)^2', forme: 'reduite', attendu: '9x^2-12x+4',
          competence: 'Développer avec une identité remarquable', revoir: 'sf-3-4',
        },
        {
          id: 'B11', type: 'litteral', points: 0.5, famille: 'litteral', nom: 'H', consigne: 'Factorise H.',
          enonce: '15x^2+10x', forme: 'factorisee', attendu: '5x(3x+2)',
          competence: 'Factoriser avec un facteur commun', revoir: 'sf-3-5',
        },
        {
          id: 'B12', type: 'litteral', points: 0.5, famille: 'litteral', nom: 'K', consigne: 'Factorise K.',
          enonce: '25x^2-49', forme: 'factorisee', attendu: '(5x-7)(5x+7)',
          competence: 'Factoriser avec une identité remarquable', revoir: 'sf-3-6',
        },
        // ── Thalès et les triangles semblables ─────────────────────────────
        reprise('B11', { id: 'B13' }),
        reprise('B12', { id: 'B14', points: 0.75 }),
        reprise('B14', { id: 'B15' }),
      ],
    },
    {
      id: 'C',
      titre: 'Démonstrations et problème',
      consigne:
        'Rédige les deux démonstrations en entier, comme en contrôle. Le problème de calcul littéral se fait '
        + 'question par question : calcule sur ton brouillon, puis écris le résultat.',
      questions: [
        reprise('C1', { points: 2.5 }),
        reprise('C2', { points: 2 }),
        {
          id: 'C3', type: 'litteral', points: 1, famille: 'litteral', nom: 'P',
          consigne: 'Problème. On donne P = (2x + 3)² − (2x + 3)(x + 7). 1. Développe et réduis P.',
          enonce: '(2x+3)^2-(2x+3)(x+7)', forme: 'reduite', attendu: '2x^2-5x-12',
          competence: 'Développer et réduire une différence de produits', revoir: 'sf-3-4',
        },
        {
          id: 'C4', type: 'litteral', points: 0.75, famille: 'litteral', nom: 'P',
          consigne: '2. Factorise P = (2x + 3)² − (2x + 3)(x + 7).',
          enonce: '(2x+3)^2-(2x+3)(x+7)', forme: 'factorisee', attendu: '(2x+3)(x-4)',
          competence: 'Factoriser avec une parenthèse en facteur commun', revoir: 'sf-3-5',
        },
        {
          id: 'C5', type: 'solutions', points: 0.75, famille: 'litteral',
          consigne: '3. Résous l\'équation.',
          enonce: '(2x+3)(x-4)=0',
          competence: 'Résoudre une équation produit nul', revoir: 'sf-3-7',
        },
      ],
    },
  ],
};

export const EPREUVES = [EPREUVE_1, EPREUVE_1_V1];
