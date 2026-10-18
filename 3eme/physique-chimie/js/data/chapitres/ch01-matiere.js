// Chapitre 1 — La matière : masse volumique, états, mélanges, solubilité.
//
// D'après les documents d'Evan transmis par Denis : le diaporama du cours
// « Chapitre 1 : La matière » (I. les trois états, II. les changements
// d'état, III. caractériser la matière, IV. mélanges et corps purs), la
// feuille « TP : Masse volumique », la feuille d'exercices sur la masse
// volumique, et la feuille « TP : Solubilité ». Les séances suivent l'ordre
// demandé par Denis : la masse volumique, la matière, la solubilité.
//
// Les exercices de la feuille sont repris avec leurs données, et chaque
// résultat est recalculé ici (et dans tools/tester-moteur.mjs) :
//   ex. 1 : 52 dag = 520 g ; 0,28 dL = 28 cm³ ; 520 ÷ 28 = 18,571… g/cm³ ;
//           1 m³ = 1 000 000 cm³ → 18 571 kg ;
//   ex. 2 : 9,7 ÷ 10 = 0,97 g/cm³ > 0,8 g/cm³ (pétrole) → le bois coule ;
//           25 cL = 0,25 L → 0,25 × 0,8 = 0,2 kg = 200 g ;
//   ex. 3 : hélium 0,169 kg/m³ < air 1,225 kg/m³ → le ballon d'hélium monte ;
//   ex. 4 : 40 dg = 4 g ; 4 ÷ 5 = 0,8 g/cm³ = 800 kg/m³ → le pétrole.
// Le cours ne dit pas en toutes lettres quand un objet flotte : la règle (il
// flotte si sa masse volumique est plus petite que celle du liquide) est celle
// que demandent les exercices 2 et 3.
//
// Le cours appelle « condensation » le passage gaz → solide et
// « liquéfaction » le passage gaz → liquide, comme le programme : on le suit,
// et la fiche prévient que la vie courante dit « condensation » pour la buée.
//
// La fiche résume en notes, sans recopier les documents (le dépôt est public),
// et ne nomme pas le professeur cité dans le TP de solubilité.
//
// Les identifiants ne se renumérotent jamais : la progression y est rangée.

const BLOC = 'Choisis la bonne réponse :';

export default {
  id: 'ch01',
  numero: 1,
  titre: 'La matière',
  detail: 'La masse volumique · Les états et les changements d\'état · Les mélanges et la solubilité',

  // Ce que Merlin sait du chapitre quand il corrige une réponse rédigée.
  profilMerlin: 'Élève de 3e. Physique-chimie, chapitre 1 « La matière ». Masse volumique : ρ = m ÷ V (m = ρ × V, '
    + 'V = m ÷ ρ), en g/cm³, kg/L ou kg/m³ ; 1 g/cm³ = 1 kg/L = 1 000 kg/m³ ; la masse et le volume d\'un même matériau '
    + 'sont proportionnels (m ÷ V constant, droite passant par l\'origine). TP : la masse se mesure avec une balance ; le '
    + 'volume d\'un solide par déplacement d\'eau dans une éprouvette graduée (V = V₂ − V₁). Un objet flotte sur un liquide '
    + 'si sa masse volumique est plus petite que celle du liquide ; un ballon monte dans l\'air si son gaz est moins dense '
    + 'que l\'air. Valeurs de la feuille d\'exercices : air 1,225 kg/m³, hélium 0,169 kg/m³, alcool 791, pétrole 800, huile '
    + '918, eau pure 1 000 kg/m³. La matière est faite de particules (atomes, molécules ; les atomes sont classés dans le '
    + 'tableau périodique). Trois états : solide (forme et volume propres, dense, incompressible), liquide (volume propre, '
    + 'pas de forme propre, dense, incompressible), gaz (ni forme ni volume propres, dilué, compressible). Changements '
    + 'd\'état : fusion (solide → liquide), solidification (liquide → solide), vaporisation (liquide → gaz), liquéfaction '
    + '(gaz → liquide), sublimation (solide → gaz), condensation (gaz → solide, selon le cours). Pour un corps pur, la '
    + 'température reste constante pendant un changement d\'état (palier) ; la masse se conserve, le volume varie '
    + '(Lavoisier : « Rien ne se perd, rien ne se crée, tout se transforme »). On identifie une matière par ses '
    + 'températures de changement d\'état, une réaction d\'identification ou sa masse volumique. Corps pur : une seule '
    + 'espèce chimique ; mélange : plusieurs (l\'air : 78 % de diazote, 21 % de dioxygène). Mélange homogène ou '
    + 'hétérogène ; espèces miscibles. Solubilité : dissoudre un solide (soluté) dans un liquide (solvant) donne une '
    + 'solution, mélange homogène ; la solubilité maximale est la quantité maximale de solide qu\'on peut dissoudre dans '
    + 'un liquide. Protocole du TP : peser une masse m de soluté, verser un volume v de solvant, ajouter, agiter ; si le '
    + 'mélange est homogène, la solubilité maximale est supérieure à m/v, sinon inférieure. Le sucre et le sel sont '
    + 'solubles dans l\'eau, pas la poudre de fer ; la solubilité dépend du solvant.',

  seances: [
    { numero: 1, partie: 'TP et exercices', titre: 'La masse volumique' },
    { numero: 2, partie: 'Le cours, I à IV', titre: 'La matière : états, changements d\'état, mélanges' },
    { numero: 3, partie: 'TP', titre: 'La solubilité' },
  ],

  etapes: [
    // ═══ Séance 1 — la masse volumique ═══════════════════════════════════

    {
      id: 'm1-formule',
      seance: 1,
      titre: 'La formule',
      sousTitre: 'ρ = m ÷ V, et ses unités',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: 'La masse volumique',
          lignes: [
            'La **masse volumique** d\'un matériau, c\'est la **masse d\'une unité de volume** : la masse d\'un cm³, d\'un litre ou d\'un m³ de ce matériau. Elle se note **ρ** (« rhô »).',
            '**ρ = m ÷ V** — et, avec le triangle : **m = ρ × V** et **V = m ÷ ρ**.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Les unités vont ensemble',
          colonnes: ['ρ en…', 'm en…', 'V en…'],
          lignes: [
            ['**g/cm³**', 'g', 'cm³'],
            ['**kg/L**', 'kg', 'L'],
            ['**kg/m³**', 'kg', 'm³'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**1 g/cm³ = 1 kg/L = 1 000 kg/m³**. L\'eau : 1 g/cm³, soit 1 kg/L, soit 1 000 kg/m³.',
            'Avant de diviser, mets la masse et le volume **dans les unités demandées**.',
          ],
        },
      ],
      items: [
        { id: 'mv-t-masse-volumique', type: 'terme', definition: 'La masse d\'une unité de volume d\'un matériau, par exemple d\'un litre', attendu: 'masse volumique', accepte: ['la masse volumique', 'ρ'] },
        {
          id: 'mv-formule', type: 'choix', consigne: BLOC, phrase: 'Comment calcule-t-on la masse volumique ρ ?',
          options: ['ρ = m ÷ V', 'ρ = V ÷ m', 'ρ = m × V'], attendu: 'ρ = m ÷ V',
          explication: 'La masse divisée par le volume.',
        },
        {
          id: 'mv-masse', type: 'choix', consigne: BLOC, phrase: 'Comment calcule-t-on la masse m, connaissant ρ et V ?',
          options: ['m = ρ × V', 'm = ρ ÷ V', 'm = V ÷ ρ'], attendu: 'm = ρ × V',
          explication: 'Dans le triangle, m est en haut : m = ρ × V.',
        },
        {
          id: 'mv-volume', type: 'choix', consigne: BLOC, phrase: 'Comment calcule-t-on le volume V, connaissant m et ρ ?',
          options: ['V = m ÷ ρ', 'V = ρ ÷ m', 'V = m × ρ'], attendu: 'V = m ÷ ρ',
          explication: 'On cache V dans le triangle : il reste m au-dessus de ρ.',
        },
        {
          id: 'mv-eau', type: 'choix', consigne: BLOC, phrase: 'Quelle est la masse volumique de l\'eau ?',
          options: ['1 kg/L', '1 kg/m³', '10 kg/L'], attendu: '1 kg/L',
          explication: '1 kg/L, soit 1 g/cm³, soit 1 000 kg/m³.',
        },
        {
          id: 'mv-equiv', type: 'reponse', question: '1 g/cm³, c\'est combien de kg/m³ ?', attendu: '1 000 kg/m³',
          nombre: 1000, ecart: 0, indice: '1 g/cm³ = 1 kg/L, et 1 m³ = 1 000 L.',
          pieges: [{ nombre: 0.001, message: 'Dans l\'autre sens : un m³ est bien plus grand qu\'un cm³, il pèse donc bien plus. 1 g/cm³ = 1 000 kg/m³.' }],
          explication: '1 g/cm³ = 1 kg/L, et 1 m³ = 1 000 L : 1 000 kg/m³.',
        },
      ],
    },

    {
      id: 'm1-conversions',
      seance: 1,
      titre: 'Les conversions',
      sousTitre: 'dag, dg, dL, cL, cm³, m³',
      duree: 3,
      fiche: [
        {
          type: 'tableau',
          titre: 'Les masses : chaque unité vaut 10 fois la suivante',
          colonnes: ['kg', 'hg', 'dag', 'g', 'dg', 'cg', 'mg'],
          lignes: [
            ['1', '10', '100', '1 000', '', '', ''],
            ['', '', '', '1', '10', '100', '1 000'],
          ],
        },
        {
          type: 'tableau',
          titre: 'Les volumes',
          colonnes: ['Égalité', 'Pour retenir'],
          lignes: [
            ['**1 L = 10 dL = 100 cL = 1 000 mL**', 'comme les masses'],
            ['**1 mL = 1 cm³**', 'un petit cube de 1 cm de côté'],
            ['**1 L = 1 dm³**', 'un cube de 10 cm de côté'],
            ['**1 m³ = 1 000 L**', 'un cube de 1 m de côté'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**dag** (décagramme) = **10 g**, mais **dg** (décigramme) = **0,1 g**. Une lettre de différence, cent fois plus lourd !',
          ],
        },
      ],
      items: [
        {
          id: 'mv-c-dag', type: 'reponse', question: '52 dag, c\'est combien de grammes ?', attendu: '520 g',
          nombre: 520, ecart: 0, indice: '1 dag = 10 g.',
          pieges: [{ nombre: 5.2, message: 'Tu l\'as converti comme des décigrammes. 1 dag (décagramme) = 10 g : 52 dag = 520 g.' }],
          explication: '1 dag = 10 g, donc 52 dag = 520 g.',
        },
        {
          id: 'mv-c-dg', type: 'reponse', question: '40 dg, c\'est combien de grammes ?', attendu: '4 g',
          nombre: 4, ecart: 0, indice: '1 dg = 0,1 g.',
          pieges: [{ nombre: 400, message: 'Tu l\'as converti comme des décagrammes. 1 dg (décigramme) = 0,1 g : 40 dg = 4 g.' }],
          explication: '1 dg = 0,1 g, donc 40 dg = 4 g.',
        },
        {
          id: 'mv-c-dl', type: 'reponse', question: '0,28 dL, c\'est combien de mL (ou de cm³) ?', attendu: '28 mL',
          nombre: 28, ecart: 0, indice: '1 dL = 100 mL.',
          pieges: [
            { nombre: 2.8, message: '1 dL = 100 mL, pas 10 mL : 0,28 dL = 28 mL.' },
            { nombre: 280, message: '1 dL = 100 mL : 0,28 × 100 = 28 mL.' },
          ],
          explication: '1 dL = 100 mL, donc 0,28 dL = 28 mL = 28 cm³.',
        },
        {
          id: 'mv-c-cl', type: 'reponse', question: '25 cL, c\'est combien de litres ?', attendu: '0,25 L',
          nombre: 0.25, ecart: 0, indice: '1 L = 100 cL.',
          pieges: [{ nombre: 2.5, message: '1 L = 100 cL, pas 10 cL : 25 cL = 0,25 L.' }],
          explication: '1 L = 100 cL, donc 25 cL = 0,25 L.',
        },
        {
          id: 'mv-c-m3', type: 'reponse', question: '1 m³, c\'est combien de litres ?', attendu: '1 000 L',
          nombre: 1000, ecart: 0, indice: 'Un cube de 1 m de côté : 10 dm × 10 dm × 10 dm.',
          pieges: [{ nombre: 100, message: '10 × 10 × 10 = 1 000 : 1 m³ = 1 000 dm³ = 1 000 L.' }],
          explication: '1 m³ = 1 000 dm³ = 1 000 L.',
        },
        {
          id: 'mv-c-cm3', type: 'reponse', question: '5 cm³, c\'est combien de mL ?', attendu: '5 mL',
          nombre: 5, ecart: 0, indice: '1 cm³ = 1 mL.',
          pieges: [{ nombre: 5000, message: '1 cm³ = 1 mL exactement : 5 cm³ = 5 mL.' }],
          explication: '1 cm³ = 1 mL.',
        },
        {
          id: 'mv-c-kgl', type: 'reponse', question: '0,8 kg/L, c\'est combien de g/cm³ ?', attendu: '0,8 g/cm³',
          nombre: 0.8, ecart: 0, indice: '1 kg/L = 1 g/cm³.',
          pieges: [{ nombre: 800, message: '800, ce serait en kg/m³. En g/cm³, c\'est le même nombre qu\'en kg/L : 0,8.' }],
          explication: '1 kg/L = 1 g/cm³ : 0,8 kg/L = 0,8 g/cm³ (et 800 kg/m³).',
        },
      ],
    },

    {
      id: 'm1-tp',
      seance: 1,
      titre: 'Le TP : mesurer une masse volumique',
      sousTitre: 'La balance, l\'éprouvette, le déplacement d\'eau',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Le matériel',
          lignes: [
            'Une **balance** pour la **masse** (en g).',
            'Une **éprouvette graduée** et de l\'**eau** pour le **volume** (en mL, soit en cm³).',
          ],
        },
        {
          type: 'regle',
          titre: 'Le volume d\'un solide : le déplacement d\'eau',
          lignes: [
            '1. Verser de l\'eau dans l\'éprouvette graduée et lire son volume **V₁**.',
            '2. Plonger **entièrement** l\'échantillon dans l\'eau.',
            '3. Lire le nouveau volume **V₂**.',
            '4. Le volume de l\'échantillon : **V = V₂ − V₁**.',
            'On lit le volume en bas de la surface de l\'eau, l\'œil à sa hauteur.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Une situation de proportionnalité (le cours)',
          colonnes: ['m (kg)', '15,7', '23,55', '39,25'],
          lignes: [
            ['V (L)', '2', '3', '5'],
            ['m ÷ V (kg/L)', '7,85', '7,85', '7,85'],
          ],
        },
        {
          type: 'regle',
          titre: 'Ce que montre le tableau',
          lignes: [
            'Pour un même matériau, **m ÷ V est toujours le même** : c\'est sa masse volumique. La masse et le volume sont **proportionnels**.',
            'La courbe de m en fonction de V est une **droite qui passe par l\'origine**.',
            'La masse de **1 m³** : 1 m³ = 1 000 L, donc 7,85 kg/L × 1 000 L = **7 850 kg**.',
          ],
        },
      ],
      items: [
        {
          id: 'mv-balance', type: 'choix', consigne: BLOC, phrase: 'Avec quel instrument mesure-t-on la masse d\'un échantillon ?',
          options: ['Une balance', 'Une éprouvette graduée', 'Un thermomètre'], attendu: 'Une balance',
          explication: 'La balance donne la masse, en grammes.',
        },
        {
          id: 'mv-eprouvette', type: 'choix', consigne: BLOC, phrase: 'Avec quel instrument mesure-t-on le volume d\'un liquide ?',
          options: ['Une éprouvette graduée', 'Une balance', 'Un thermomètre'], attendu: 'Une éprouvette graduée',
          explication: 'Et le volume d\'un solide aussi, par déplacement d\'eau.',
        },
        {
          id: 'mv-protocole', type: 'ordre', consigne: 'Remets dans l\'ordre le protocole pour mesurer le volume d\'un solide :',
          elements: [
            'Verser de l\'eau dans l\'éprouvette graduée.',
            'Lire le volume V₁ de l\'eau.',
            'Plonger entièrement l\'échantillon dans l\'eau.',
            'Lire le nouveau volume V₂.',
            'Calculer V = V₂ − V₁.',
          ],
        },
        {
          id: 'mv-v2v1', type: 'reponse', question: 'L\'eau monte de 50 mL à 62 mL quand on plonge l\'échantillon. Quel est son volume, en cm³ ?', attendu: '12 cm³',
          nombre: 12, ecart: 0, indice: 'V = V₂ − V₁, et 1 mL = 1 cm³.',
          pieges: [
            { nombre: 62, message: '62 mL, c\'est l\'eau ET l\'échantillon. Son volume seul : 62 − 50 = 12 cm³.' },
            { nombre: 112, message: 'On soustrait, on n\'additionne pas : 62 − 50 = 12 cm³.' },
          ],
          explication: 'V = V₂ − V₁ = 62 − 50 = 12 mL = 12 cm³.',
        },
        {
          id: 'mv-tp-calcul', type: 'reponse', question: 'Un échantillon a une masse de 81 g et un volume de 30 cm³. Quelle est sa masse volumique, en g/cm³ ?', attendu: '2,7 g/cm³',
          nombre: 2.7, ecart: 0.01, indice: 'ρ = m ÷ V.',
          pieges: [{ nombre: 0.37, ecart: 0.01, message: 'Tu as divisé le volume par la masse. ρ = m ÷ V = 81 ÷ 30 = 2,7 g/cm³.' }],
          explication: 'ρ = m ÷ V = 81 ÷ 30 = 2,7 g/cm³ (c\'est de l\'aluminium).',
        },
        {
          id: 'mv-proportion', type: 'choix', consigne: BLOC, phrase: 'Pour un même matériau, que peut-on dire de la masse et du volume ?',
          options: ['Ils sont proportionnels : m ÷ V est toujours le même', 'La masse ne dépend pas du volume', 'Plus le volume est grand, plus ρ est grand'],
          attendu: 'Ils sont proportionnels : m ÷ V est toujours le même',
          explication: 'Le rapport m ÷ V, c\'est la masse volumique du matériau : il ne change pas.',
        },
        {
          id: 'mv-courbe', type: 'choix', consigne: BLOC, phrase: 'Pour un même matériau, la courbe de la masse en fonction du volume est…',
          options: ['une droite qui passe par l\'origine', 'une courbe qui monte puis redescend', 'une droite horizontale'],
          attendu: 'une droite qui passe par l\'origine',
          explication: 'C\'est le signe d\'une situation de proportionnalité.',
        },
        {
          id: 'mv-1m3', type: 'reponse', question: 'Un matériau a une masse volumique de 7,85 kg/L. Quelle est la masse de 1 m³, en kg ?', attendu: '7 850 kg',
          nombre: 7850, ecart: 0, indice: '1 m³ = 1 000 L, et m = ρ × V.',
          pieges: [
            { nombre: 7.85, message: '7,85 kg, c\'est la masse d\'un seul litre. 1 m³ = 1 000 L : 7,85 × 1 000 = 7 850 kg.' },
            { nombre: 785, message: '1 m³ = 1 000 L, pas 100 L : 7,85 × 1 000 = 7 850 kg.' },
          ],
          explication: 'm = ρ × V = 7,85 kg/L × 1 000 L = 7 850 kg.',
        },
      ],
    },

    {
      id: 'm1-exos',
      seance: 1,
      titre: 'La feuille d\'exercices',
      sousTitre: 'Calculer, comparer, identifier',
      duree: 6,
      fiche: [
        {
          type: 'regle',
          titre: 'Un calcul en quatre temps',
          lignes: [
            '1. **Convertir** la masse et le volume dans les unités demandées.',
            '2. Écrire la **formule** : ρ = m ÷ V (ou m = ρ × V).',
            '3. **Remplacer** par les valeurs, et calculer.',
            '4. Écrire le résultat **avec son unité**.',
          ],
        },
        {
          type: 'regle',
          titre: 'Flotter ou couler',
          lignes: [
            'Un objet **flotte** sur un liquide si sa masse volumique est **plus petite** que celle du liquide ; il **coule** si elle est plus grande.',
            'De même, un ballon **monte** dans l\'air si le gaz qu\'il contient est **moins dense** que l\'air.',
            'Pour comparer, mets les deux masses volumiques **dans la même unité**.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Les masses volumiques de la feuille',
          colonnes: ['Substance', 'ρ (kg/m³)'],
          lignes: [
            ['hélium', '0,169'],
            ['air', '1,225'],
            ['alcool', '791'],
            ['pétrole', '800'],
            ['huile', '918'],
            ['eau pure', '1 000'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Pour **identifier un liquide** : calcule sa masse volumique, mets-la dans l\'unité du tableau, puis cherche la valeur qui correspond.',
          ],
        },
      ],
      items: [
        {
          id: 'mv-ex1', type: 'reponse', question: 'Exercice 1. Un objet a une masse de 52 dag et un volume de 0,28 dL. Quelle est sa masse volumique, en g/cm³, arrondie au dixième ?', attendu: '≈ 18,6 g/cm³',
          nombre: 18.571, ecart: 0.03, indice: 'Convertis d\'abord : 52 dag = ? g, et 0,28 dL = ? cm³.',
          pieges: [
            { nombre: 1.857, ecart: 0.006, message: 'Une conversion a raté : 52 dag = 520 g, et 0,28 dL = 28 cm³. Puis 520 ÷ 28 ≈ 18,6 g/cm³.' },
            { nombre: 1857, ecart: 6, message: 'Le volume est resté en dL : 0,28 dL = 28 cm³. Puis 520 ÷ 28 ≈ 18,6 g/cm³.' },
            { nombre: 185.7, ecart: 0.6, message: 'Vérifie tes conversions : 52 dag = 520 g, et 0,28 dL = 28 cm³. Puis 520 ÷ 28 ≈ 18,6 g/cm³.' },
            { nombre: 19, ecart: 0.2, resultat: 'presque', message: 'C\'est arrondi à l\'unité. Au dixième : 18,6 g/cm³.' },
            { nombre: 0.0538, ecart: 0.0006, message: 'Tu as divisé le volume par la masse. ρ = m ÷ V = 520 ÷ 28 ≈ 18,6 g/cm³.' },
          ],
          explication: '52 dag = 520 g ; 0,28 dL = 28 mL = 28 cm³ ; ρ = 520 ÷ 28 ≈ 18,6 g/cm³.',
        },
        {
          id: 'mv-ex1-cube', type: 'reponse', question: 'Exercice 1 (suite). Quelle serait la masse d\'un cube de 1 m de côté, fait de la même matière que cet objet, en kg ?', attendu: '≈ 18 571 kg (plus de 18 tonnes)',
          nombre: 18571, ecart: 50, indice: 'Le cube fait 1 m³, et 1 m³ = 1 000 L. Or 18,6 g/cm³ = 18,6 kg/L.',
          pieges: [
            { nombre: 18.571, ecart: 0.06, message: 'Si c\'est en tonnes, la question demande des kg : 18 571 kg. Sinon, c\'est la masse d\'un seul litre, et le cube fait 1 m³ = 1 000 L : environ 18 571 kg.' },
            { nombre: 19000, ecart: 0, resultat: 'presque', message: 'Arrondi trop fort : environ 18 600 kg (18 571 kg).' },
            { nombre: 18571000, ecart: 50000, message: 'C\'est la masse en grammes : 18 571 000 g = 18 571 kg.' },
          ],
          explication: '18,57 g/cm³ = 18,57 kg/L ; 1 m³ = 1 000 L ; m = 18,57 × 1 000 ≈ 18 571 kg (18 600 kg avec 18,6).',
        },
        {
          id: 'mv-ex2', type: 'reponse', question: 'Exercice 2. Un morceau de bois a une masse de 9,7 g et un volume de 10 cm³. Quelle est sa masse volumique, en g/cm³ ?', attendu: '0,97 g/cm³',
          nombre: 0.97, ecart: 0.001, indice: 'ρ = m ÷ V, sans conversion : g et cm³.',
          pieges: [{ nombre: 1.03, ecart: 0.005, message: 'Tu as divisé le volume par la masse. ρ = 9,7 ÷ 10 = 0,97 g/cm³.' }],
          explication: 'ρ = m ÷ V = 9,7 ÷ 10 = 0,97 g/cm³.',
        },
        {
          id: 'mv-ex2-compare', type: 'choix', consigne: 'Exercice 2 (suite).', phrase: 'Le pétrole a une masse volumique de 0,8 kg/L. Celle du bois (0,97 g/cm³) est-elle plus petite ?',
          options: ['Non : 0,8 kg/L = 0,8 g/cm³, et 0,97 est plus grand que 0,8', 'Oui : 0,97 est plus petit que 0,8', 'On ne peut pas comparer des kg/L et des g/cm³'],
          attendu: 'Non : 0,8 kg/L = 0,8 g/cm³, et 0,97 est plus grand que 0,8',
          explication: '1 kg/L = 1 g/cm³ : on compare 0,97 et 0,8 dans la même unité.',
        },
        {
          id: 'mv-ex2-flotte', type: 'choix', consigne: 'Exercice 2 (suite).', phrase: 'Le bois flottera-t-il sur le pétrole ?',
          options: ['Non, il coulera : sa masse volumique est plus grande que celle du pétrole', 'Oui : le bois flotte toujours', 'Oui : le pétrole est un liquide'],
          attendu: 'Non, il coulera : sa masse volumique est plus grande que celle du pétrole',
          explication: 'Il flotterait sur l\'eau (1 g/cm³), mais pas sur le pétrole (0,8 g/cm³).',
        },
        {
          id: 'mv-ex2-petrole', type: 'reponse', question: 'Exercice 2 (suite). Quelle est la masse de 25 cL de pétrole (0,8 kg/L), en grammes ?', attendu: '200 g (0,2 kg)',
          nombre: 200, ecart: 0, indice: '25 cL = 0,25 L, et m = ρ × V.',
          pieges: [
            { nombre: 0.2, resultat: 'presque', message: 'C\'est le bon calcul, en kg. La question demande des grammes : 0,2 kg = 200 g.' },
            { nombre: 20, message: 'Le volume doit être en litres : 25 cL = 0,25 L. Puis m = 0,8 × 0,25 = 0,2 kg = 200 g.' },
            { nombre: 312.5, message: 'Tu as divisé le volume par la masse volumique. La masse, c\'est m = ρ × V = 0,8 × 0,25 = 0,2 kg = 200 g.' },
            { nombre: 3200, message: 'Tu as divisé la masse volumique par le volume. La masse, c\'est m = ρ × V = 0,8 × 0,25 = 0,2 kg = 200 g.' },
          ],
          explication: '25 cL = 0,25 L ; m = ρ × V = 0,8 × 0,25 = 0,2 kg = 200 g.',
        },
        {
          id: 'mv-ex3', type: 'choix', consigne: 'Exercice 3.', phrase: 'Un ballon est gonflé avec mon souffle, l\'autre avec de l\'hélium. Que se passe-t-il quand je les lâche ?',
          options: ['Le ballon d\'hélium monte, l\'autre retombe', 'Les deux montent', 'Les deux retombent', 'Le ballon d\'hélium retombe, l\'autre monte'],
          attendu: 'Le ballon d\'hélium monte, l\'autre retombe',
          explication: 'L\'hélium (0,169 kg/m³) est bien moins dense que l\'air (1,225 kg/m³) : son ballon monte. L\'autre contient de l\'air, comme autour de lui : avec le poids de l\'enveloppe, il retombe.',
        },
        {
          id: 'mv-ex4', type: 'reponse', question: 'Exercice 4. 5 cm³ d\'un liquide inconnu ont une masse de 40 dg. Quelle est sa masse volumique, en kg/m³ ?', attendu: '800 kg/m³',
          nombre: 800, ecart: 0, indice: '40 dg = 4 g ; ρ en g/cm³, puis × 1 000 pour les kg/m³.',
          pieges: [
            { nombre: 0.8, resultat: 'presque', message: 'C\'est juste, en g/cm³. La question demande des kg/m³ : × 1 000, soit 800 kg/m³.' },
            { nombre: 8000, message: '40 dg, ce n\'est pas 40 g : 40 dg = 4 g. 4 ÷ 5 = 0,8 g/cm³ = 800 kg/m³.' },
            { nombre: 8, message: '40 dg = 4 g, pas 40 g ; et en kg/m³, on multiplie par 1 000 : 800 kg/m³.' },
          ],
          explication: '40 dg = 4 g ; ρ = 4 ÷ 5 = 0,8 g/cm³ = 800 kg/m³.',
        },
        {
          id: 'mv-ex4-liquide', type: 'choix', consigne: 'Exercice 4 (suite).', phrase: 'Avec ce résultat, 800 kg/m³, et le tableau de la feuille, quel est le liquide ?',
          options: ['Le pétrole', 'L\'alcool', 'L\'huile', 'L\'eau pure'], attendu: 'Le pétrole',
          explication: 'Le pétrole : 800 kg/m³. L\'alcool (791) est proche, mais c\'est le pétrole qui correspond.',
        },
      ],
    },

    {
      id: 'm1-ecrire',
      seance: 1,
      titre: 'Rédiger : les deux ballons',
      sousTitre: 'L\'exercice 3, avec sa justification',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Justifier en trois temps',
          lignes: [
            '**Ce qui se passe** : le ballon d\'hélium monte, l\'autre retombe.',
            '**Les valeurs** : l\'hélium, 0,169 kg/m³ ; l\'air, 1,225 kg/m³.',
            '**La règle** : un ballon monte si son gaz est moins dense que l\'air ; le ballon gonflé à la bouche contient de l\'air, comme autour de lui, et retombe à cause du poids de l\'enveloppe.',
            'Mots utiles : *car, donc, or, plus petite que, moins dense que.*',
          ],
        },
      ],
      items: [
        {
          id: 'mv-w-ballons', type: 'decrire', sujet: 'Que va-t-il se passer quand je vais lâcher les deux ballons, l\'un gonflé avec mon souffle, l\'autre à l\'hélium ? Justifie.', emoji: '🎈',
          indices: ['masse volumique', 'hélium 0,169 kg/m³', 'air 1,225 kg/m³', 'plus petite que', 'monte', 'retombe', 'enveloppe'],
          consigne: 'Rédige quelques lignes : ce qui se passe pour chaque ballon, et pourquoi, avec les valeurs du tableau.',
          titreModele: 'Une réponse d\'exemple',
          modele: 'Le ballon gonflé à l\'hélium va monter, et celui que j\'ai gonflé avec mon souffle va retomber. En effet, la masse volumique de l\'hélium (0,169 kg/m³) est bien plus petite que celle de l\'air (1,225 kg/m³) : l\'hélium est moins dense que l\'air qui entoure le ballon, donc le ballon monte. Le ballon gonflé à la bouche contient de l\'air, comme autour de lui : il n\'est pas plus léger que l\'air qu\'il remplace, et à cause du poids de son enveloppe, il retombe.',
          criteres: [
            { id: 'resultat', texte: 'Ce qui se passe : le ballon d\'hélium monte, celui gonflé à la bouche retombe' },
            { id: 'valeurs', texte: 'La comparaison des masses volumiques : l\'hélium (0,169 kg/m³) est moins dense que l\'air (1,225 kg/m³)' },
            { id: 'regle', texte: 'La règle : un gaz moins dense que l\'air fait monter le ballon ; l\'autre ballon contient de l\'air et retombe (poids de l\'enveloppe)' },
          ],
        },
      ],
    },

    // ═══ Séance 2 — la matière ═══════════════════════════════════════════

    {
      id: 'm2-etats',
      seance: 2,
      titre: 'Les trois états de la matière',
      sousTitre: 'Le modèle particulaire, solide, liquide, gaz',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Le modèle particulaire',
          lignes: [
            'La matière est faite de **particules** : des **atomes** ou des **molécules**. Ces particules caractérisent la matière : son **espèce chimique** et son **état**.',
            'Les molécules sont faites d\'atomes, que l\'on classe dans le **tableau périodique des éléments**.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Du glaçon au noyau',
          colonnes: ['Objet', 'Taille'],
          lignes: [
            ['un glaçon', '4 cm'],
            ['une **molécule** d\'eau', '0,3 nm = 3 × 10⁻¹⁰ m'],
            ['un **atome** d\'oxygène', '0,1 nm = 10⁻¹⁰ m'],
            ['le **noyau** de l\'atome (protons et neutrons)', '1 fm = 10⁻¹⁵ m'],
          ],
        },
        {
          type: 'tableau',
          titre: 'Les trois états',
          colonnes: ['', 'Solide', 'Liquide', 'Gaz'],
          lignes: [
            ['**Forme propre**', 'oui', 'non', 'non'],
            ['**Volume propre**', 'oui', 'oui', 'non'],
            ['**Particules**', 'serrées, rangées : **dense**', 'serrées, en désordre : **dense**', 'éloignées : **dilué**'],
            ['**Compressible**', 'non', 'non', 'oui'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Le **liquide** a un **volume** propre, mais **pas de forme** propre : il prend la forme du récipient. Le **gaz** n\'a **ni l\'un ni l\'autre** : il occupe tout l\'espace qu\'on lui offre.',
          ],
        },
      ],
      items: [
        { id: 'ma-t-particulaire', type: 'terme', definition: 'La représentation de la matière par des particules, atomes ou molécules', attendu: 'modèle particulaire', accepte: ['le modèle particulaire'] },
        {
          id: 'ma-t-molecule', type: 'terme', definition: 'Une particule faite de plusieurs atomes liés entre eux', attendu: 'molécule', accepte: ['une molécule', 'molécules'],
          pieges: [{ si: ['atome', 'atomes'], message: 'Non : l\'atome est la plus petite brique. Plusieurs atomes liés forment une molécule.' }],
        },
        {
          id: 'ma-tableau', type: 'choix', consigne: BLOC, phrase: 'Où classe-t-on les atomes ?',
          options: ['Dans le tableau périodique des éléments', 'Dans le tableau des masses volumiques', 'Dans la liste des changements d\'état'],
          attendu: 'Dans le tableau périodique des éléments',
          explication: 'Le tableau périodique des éléments.',
        },
        {
          id: 'ma-solide', type: 'choix', consigne: BLOC, phrase: 'Quel état a une forme propre ET un volume propre ?',
          options: ['Le solide', 'Le liquide', 'Le gaz'], attendu: 'Le solide',
          explication: 'Le liquide a un volume propre, mais prend la forme du récipient.',
        },
        {
          id: 'ma-liquide', type: 'choix', consigne: BLOC, phrase: 'Quel état a un volume propre, mais pas de forme propre ?',
          options: ['Le liquide', 'Le solide', 'Le gaz'], attendu: 'Le liquide',
          explication: 'Il prend la forme du récipient, mais garde son volume.',
        },
        {
          id: 'ma-gaz-compressible', type: 'choix', consigne: BLOC, phrase: 'Quel état est compressible ?',
          options: ['Le gaz', 'Le liquide', 'Le solide'], attendu: 'Le gaz',
          explication: 'Ses particules sont éloignées : on peut les rapprocher.',
        },
        {
          id: 'ma-gaz-particules', type: 'choix', consigne: BLOC, phrase: 'Dans un gaz, les particules sont…',
          options: ['éloignées les unes des autres : le gaz est dilué', 'serrées et rangées', 'serrées mais en désordre'],
          attendu: 'éloignées les unes des autres : le gaz est dilué',
          explication: 'Serrées et rangées : le solide. Serrées en désordre : le liquide.',
        },
        {
          id: 'ma-taille', type: 'choix', consigne: BLOC, phrase: 'Quelle est la taille d\'une molécule d\'eau ?',
          options: ['0,3 nm, soit 3 × 10⁻¹⁰ m', '4 cm', '1 mm'], attendu: '0,3 nm, soit 3 × 10⁻¹⁰ m',
          explication: 'Plus de cent millions de fois plus petite qu\'un glaçon.',
        },
      ],
    },

    {
      id: 'm2-changements',
      seance: 2,
      titre: 'Les changements d\'état',
      sousTitre: 'Six noms, un palier, une masse qui se conserve',
      duree: 5,
      fiche: [
        {
          type: 'tableau',
          titre: 'Les six changements d\'état',
          colonnes: ['De', 'Vers', 'Le nom'],
          lignes: [
            ['solide', 'liquide', '**fusion**'],
            ['liquide', 'solide', '**solidification**'],
            ['liquide', 'gaz', '**vaporisation**'],
            ['gaz', 'liquide', '**liquéfaction**'],
            ['solide', 'gaz', '**sublimation**'],
            ['gaz', 'solide', '**condensation**'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Dans la vie courante, on dit « condensation » pour la buée sur une vitre (gaz → liquide). Dans ton cours, gaz → liquide, c\'est la **liquéfaction** ; la **condensation**, c\'est gaz → **solide**.',
            'Fondre (**fusion**), ce n\'est pas se dissoudre : le sucre ne fond pas dans l\'eau, il **se dissout**.',
          ],
        },
        {
          type: 'regle',
          titre: 'La température pendant un changement d\'état',
          lignes: [
            'Pour un **corps pur**, la température **reste constante** pendant tout le changement d\'état : sur la courbe, c\'est un **palier**.',
            'On chauffe de la glace : **échauffement du solide → palier de fusion → échauffement du liquide → palier d\'ébullition → échauffement du gaz**.',
            'On refroidit un liquide : la température baisse, puis un **palier de solidification** à la température θs, puis elle baisse encore.',
          ],
        },
        {
          type: 'regle',
          titre: 'La masse et le volume',
          lignes: [
            '« Rien ne se perd, rien ne se crée, tout se transforme » (**Lavoisier**).',
            'Pendant un changement d\'état, la **masse se conserve** ; le **volume**, lui, **varie**.',
          ],
        },
      ],
      items: [
        {
          id: 'ma-t-fusion', type: 'terme', definition: 'Le passage de l\'état solide à l\'état liquide', attendu: 'fusion', accepte: ['la fusion'],
          pieges: [
            { si: ['solidification'], message: 'Dans l\'autre sens : liquide → solide, c\'est la solidification. Solide → liquide : la fusion.' },
            { si: ['dissolution'], message: 'Non : la dissolution, c\'est un solide qui se mélange à un liquide. Fondre, c\'est la fusion.' },
          ],
        },
        {
          id: 'ma-t-solidification', type: 'terme', definition: 'Le passage de l\'état liquide à l\'état solide', attendu: 'solidification', accepte: ['la solidification'],
          pieges: [{ si: ['fusion'], message: 'Dans l\'autre sens : solide → liquide, c\'est la fusion. Liquide → solide : la solidification.' }],
        },
        {
          id: 'ma-t-vaporisation', type: 'terme', definition: 'Le passage de l\'état liquide à l\'état gazeux', attendu: 'vaporisation', accepte: ['la vaporisation'],
          pieges: [
            { si: ['ébullition'], resultat: 'presque', message: 'L\'ébullition est une vaporisation à gros bouillons. Le nom du changement d\'état : la vaporisation.' },
            { si: ['évaporation'], resultat: 'presque', message: 'L\'évaporation est une vaporisation lente. Le nom du changement d\'état : la vaporisation.' },
          ],
        },
        {
          id: 'ma-t-liquefaction', type: 'terme', definition: 'Le passage de l\'état gazeux à l\'état liquide', attendu: 'liquéfaction', accepte: ['la liquéfaction'],
          pieges: [{ si: ['condensation'], message: 'Dans ton cours, la condensation, c\'est gaz → solide. Gaz → liquide : la liquéfaction.' }],
        },
        { id: 'ma-t-sublimation', type: 'terme', definition: 'Le passage direct de l\'état solide à l\'état gazeux', attendu: 'sublimation', accepte: ['la sublimation'] },
        {
          id: 'ma-t-condensation', type: 'terme', definition: 'Le passage direct de l\'état gazeux à l\'état solide', attendu: 'condensation', accepte: ['la condensation', 'condensation solide'],
          pieges: [{ si: ['liquéfaction'], message: 'Non : la liquéfaction, c\'est gaz → liquide. Gaz → solide, d\'après ton cours : la condensation.' }],
        },
        {
          id: 'ma-palier', type: 'choix', consigne: BLOC, phrase: 'Pendant la fusion de la glace pure, la température…',
          options: ['reste constante : c\'est un palier', 'augmente', 'diminue'], attendu: 'reste constante : c\'est un palier',
          explication: 'Pour un corps pur, la température ne change pas pendant un changement d\'état.',
        },
        {
          id: 'ma-courbe', type: 'ordre', consigne: 'On chauffe de la glace jusqu\'à obtenir de la vapeur. Remets les étapes de la courbe dans l\'ordre :',
          elements: [
            'Échauffement du solide',
            'Palier de fusion',
            'Échauffement du liquide',
            'Palier d\'ébullition',
            'Échauffement du gaz',
          ],
        },
        {
          id: 'ma-masse', type: 'choix', consigne: BLOC, phrase: 'Pendant un changement d\'état, la masse…',
          options: ['se conserve', 'augmente', 'diminue'], attendu: 'se conserve',
          explication: '« Rien ne se perd, rien ne se crée » : la masse se conserve, le volume varie.',
        },
        {
          id: 'ma-volume', type: 'choix', consigne: BLOC, phrase: 'Pendant un changement d\'état, le volume…',
          options: ['varie', 'reste toujours le même', 'devient nul'], attendu: 'varie',
          explication: 'C\'est la masse qui se conserve, pas le volume.',
        },
        {
          id: 'ma-lavoisier', type: 'choix', consigne: BLOC, phrase: '« Rien ne se perd, rien ne se crée, tout se transforme » : de qui est cette phrase ?',
          options: ['Lavoisier', 'Newton', 'Pasteur'], attendu: 'Lavoisier',
          explication: 'Antoine Lavoisier, chimiste du XVIIIe siècle.',
        },
        {
          id: 'ma-glace', type: 'reponse', question: '100 g d\'eau liquide gèlent entièrement. Quelle est la masse de la glace obtenue, en g ?', attendu: '100 g',
          nombre: 100, ecart: 0, indice: 'Pendant un changement d\'état, qu\'est-ce qui se conserve ?',
          explication: 'La masse se conserve : 100 g d\'eau donnent 100 g de glace. C\'est le volume qui change.',
        },
      ],
    },

    {
      id: 'm2-identifier',
      seance: 2,
      titre: 'Caractériser la matière, mélanges et corps purs',
      sousTitre: 'Identifier, corps pur, homogène, miscible',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Identifier une matière : trois moyens',
          lignes: [
            'Ses **températures de changement d\'état**, une **réaction d\'identification**, sa **masse volumique**.',
          ],
        },
        {
          type: 'regle',
          titre: 'Corps pur ou mélange',
          lignes: [
            'Un **corps pur** est composé d\'**une seule espèce chimique**. Un **mélange** en contient **plusieurs**.',
            'L\'**air** est un mélange : **78 % de diazote**, **21 % de dioxygène**, et d\'autres gaz pour le reste.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Les mélanges',
          colonnes: ['Le mot', 'Ce qu\'il veut dire', 'Exemple'],
          lignes: [
            ['mélange **hétérogène**', 'on **voit** ses constituants à l\'œil nu', 'eau et huile, eau et sable'],
            ['mélange **homogène**', 'on **ne voit pas** ses constituants à l\'œil nu', 'eau salée, eau sucrée'],
            ['espèces **miscibles** (en pratique, des liquides)', 'on peut les mélanger de manière **homogène**', 'eau et sirop ; pas eau et huile'],
          ],
        },
      ],
      items: [
        {
          id: 'ma-t-corps-pur', type: 'terme', definition: 'Une matière composée d\'une seule espèce chimique', attendu: 'corps pur', accepte: ['un corps pur'],
          pieges: [{ si: ['mélange homogène', 'homogène'], message: 'Non : un mélange homogène a l\'air d\'une seule matière, mais en contient plusieurs. Une seule espèce chimique : un corps pur.' }],
        },
        { id: 'ma-t-melange', type: 'terme', definition: 'Une matière qui contient plusieurs espèces chimiques', attendu: 'mélange', accepte: ['un mélange'] },
        {
          id: 'ma-t-heterogene', type: 'terme', definition: 'Un mélange dont on voit les constituants à l\'œil nu', attendu: 'mélange hétérogène', accepte: ['hétérogène'],
          pieges: [{ si: ['mélange homogène', 'homogène'], message: 'Dans l\'autre sens : homogène, on ne voit pas les constituants. On les voit : hétérogène.' }],
        },
        {
          id: 'ma-t-homogene', type: 'terme', definition: 'Un mélange dont on ne voit pas les constituants à l\'œil nu', attendu: 'mélange homogène', accepte: ['homogène'],
          pieges: [{ si: ['mélange hétérogène', 'hétérogène'], message: 'Dans l\'autre sens : hétérogène, on voit les constituants. On ne les voit pas : homogène.' }],
        },
        { id: 'ma-t-miscible', type: 'terme', definition: 'Se dit de deux espèces, en pratique deux liquides, qu\'on peut mélanger de manière homogène', attendu: 'miscibles', accepte: ['miscible'] },
        {
          id: 'ma-identifier', type: 'choix', consigne: BLOC, phrase: 'D\'après le cours, comment peut-on identifier une matière ?',
          options: ['Par ses températures de changement d\'état, une réaction d\'identification, sa masse volumique', 'Par sa couleur, son odeur et son goût', 'Par sa masse, son volume et sa forme'],
          attendu: 'Par ses températures de changement d\'état, une réaction d\'identification, sa masse volumique',
          explication: 'La masse ou le volume seuls ne suffisent pas : c\'est leur rapport, la masse volumique, qui caractérise la matière.',
        },
        {
          id: 'ma-air', type: 'choix', consigne: BLOC, phrase: 'De quoi l\'air est-il composé ?',
          options: ['78 % de diazote, 21 % de dioxygène, et d\'autres gaz', '78 % de dioxygène, 21 % de diazote', '100 % de dioxygène'],
          attendu: '78 % de diazote, 21 % de dioxygène, et d\'autres gaz',
          explication: 'Surtout du diazote : environ 4/5.',
        },
        {
          id: 'ma-air-pur', type: 'choix', consigne: BLOC, phrase: 'L\'air est…',
          options: ['un mélange', 'un corps pur', 'un solide'], attendu: 'un mélange',
          explication: 'Il contient plusieurs espèces chimiques : diazote, dioxygène, et d\'autres gaz.',
        },
        {
          id: 'ma-eau-huile', type: 'choix', consigne: BLOC, phrase: 'L\'eau et l\'huile forment…',
          options: ['un mélange hétérogène : elles ne sont pas miscibles', 'un mélange homogène', 'un corps pur'],
          attendu: 'un mélange hétérogène : elles ne sont pas miscibles',
          explication: 'On voit deux couches : l\'huile au-dessus.',
        },
        {
          id: 'ma-eau-sel', type: 'choix', consigne: BLOC, phrase: 'De l\'eau salée, bien mélangée, est…',
          options: ['un mélange homogène', 'un mélange hétérogène', 'un corps pur'], attendu: 'un mélange homogène',
          explication: 'On ne voit plus le sel, mais il y a deux espèces chimiques : un mélange homogène.',
        },
      ],
    },

    {
      id: 'm2-ecrire',
      seance: 2,
      titre: 'Rédiger : la courbe de chauffage',
      sousTitre: 'Décrire et expliquer',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Décrire une courbe en trois temps',
          lignes: [
            '**Les étapes** : échauffement du solide, palier de fusion, échauffement du liquide, palier d\'ébullition, échauffement du gaz.',
            '**Les paliers** : pour un corps pur, la température reste constante pendant le changement d\'état.',
            '**La masse et le volume** : la masse se conserve, le volume varie.',
          ],
        },
      ],
      items: [
        {
          id: 'ma-w-courbe', type: 'decrire', sujet: 'On chauffe de la glace pure jusqu\'à obtenir de la vapeur. Décris la courbe de la température, et dis ce que deviennent la masse et le volume.', emoji: '🌡️',
          indices: ['échauffement du solide', 'palier', 'fusion', 'ébullition', 'température constante', 'corps pur', 'masse conservée', 'volume'],
          consigne: 'Rédige quelques lignes : les étapes de la courbe, ce qui se passe pendant les paliers, et la masse et le volume.',
          titreModele: 'Une réponse d\'exemple',
          modele: 'D\'abord, la glace s\'échauffe : la température monte. Puis la glace fond : c\'est la fusion, et la température reste constante, c\'est un palier, car la glace est un corps pur. Ensuite, l\'eau liquide s\'échauffe jusqu\'à l\'ébullition, pendant laquelle la température reste de nouveau constante : un second palier. Enfin, la vapeur s\'échauffe. Pendant ces changements d\'état, la masse se conserve, mais le volume varie.',
          criteres: [
            { id: 'etapes', texte: 'Les étapes dans l\'ordre : échauffement du solide, fusion, échauffement du liquide, ébullition, échauffement du gaz' },
            { id: 'paliers', texte: 'Pendant la fusion et l\'ébullition, la température reste constante (palier), car c\'est un corps pur' },
            { id: 'masse', texte: 'La masse se conserve pendant un changement d\'état, le volume varie' },
          ],
        },
      ],
    },

    // ═══ Séance 3 — la solubilité ════════════════════════════════════════

    {
      id: 'm3-mots',
      seance: 3,
      titre: 'Le vocabulaire de la solubilité',
      sousTitre: 'Soluté, solvant, solution',
      duree: 3,
      fiche: [
        {
          type: 'tableau',
          titre: 'Les mots à savoir définir',
          colonnes: ['Le mot', 'Sa définition'],
          lignes: [
            ['**dissoudre**', 'mélanger un solide avec un liquide pour obtenir un **mélange homogène**'],
            ['**soluble**', 'se dit d\'un solide qu\'on peut dissoudre dans un liquide'],
            ['la **solubilité maximale**', 'la quantité **maximale** d\'un solide qu\'on peut dissoudre dans un liquide — pour un volume donné : en g/L, en g/mL'],
            ['une **solution**', 'un **mélange homogène** d\'un solide et d\'un liquide'],
            ['le **solvant**', 'le **liquide** dans lequel on dissout le solide'],
            ['le **soluté**', 'le **solide** dissous dans le solvant'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Dans l\'eau sucrée : le **soluté**, c\'est le **sucre** ; le **solvant**, c\'est l\'**eau** ; la **solution**, c\'est l\'**eau sucrée**.',
          ],
        },
      ],
      items: [
        {
          id: 'so-t-dissoudre', type: 'terme', definition: 'Mélanger un solide avec un liquide pour obtenir un mélange homogène', attendu: 'dissoudre', accepte: ['dissolution', 'la dissolution'],
          pieges: [{ si: ['fondre', 'fusion'], message: 'Non : fondre, c\'est passer de solide à liquide (la fusion). Le sucre dans l\'eau ne fond pas : il se dissout.' }],
        },
        { id: 'so-t-soluble', type: 'terme', definition: 'Se dit d\'un solide qu\'on peut dissoudre dans un liquide', attendu: 'soluble' },
        { id: 'so-t-solubilite', type: 'terme', definition: 'La quantité maximale d\'un solide qu\'on peut dissoudre dans un volume donné de liquide', attendu: 'solubilité maximale', accepte: ['la solubilité maximale', 'solubilité', 'solubilité maximum'] },
        { id: 'so-t-solution', type: 'terme', definition: 'Un mélange homogène d\'un solide et d\'un liquide', attendu: 'solution', accepte: ['une solution'] },
        {
          id: 'so-t-solvant', type: 'terme', definition: 'Le liquide dans lequel on dissout le solide', attendu: 'solvant', accepte: ['le solvant'],
          pieges: [{ si: ['soluté'], message: 'Dans l\'autre sens : le soluté, c\'est le solide. Le liquide : le solvant.' }],
        },
        {
          id: 'so-t-solute', type: 'terme', definition: 'Le solide dissous dans le solvant', attendu: 'soluté', accepte: ['le soluté'],
          pieges: [{ si: ['solvant'], message: 'Dans l\'autre sens : le solvant, c\'est le liquide. Le solide dissous : le soluté.' }],
        },
      ],
    },

    {
      id: 'm3-tp',
      seance: 3,
      titre: 'Le TP : tester la solubilité',
      sousTitre: 'Deux protocoles, et ce qu\'ils montrent',
      duree: 5,
      fiche: [
        {
          type: 'tableau',
          titre: 'Deux protocoles',
          colonnes: ['', 'Protocole 1 : avec des mesures', 'Protocole 2 : rapide'],
          lignes: [
            ['**1**', '**peser** une masse **m** de soluté', 'verser un peu du liquide à tester dans le bécher'],
            ['**2**', 'verser un volume **v** de solvant dans le bécher', 'ajouter **une cuillère** de solide'],
            ['**3**', 'ajouter le soluté, **agiter** quelques secondes', '**agiter** quelques secondes'],
            ['**4**', 'mélange homogène ? **Oui** : la solubilité maximale est **supérieure à m/v**. **Non** : elle est **inférieure à m/v**', 'mélange homogène ? Le solide est soluble… ou non'],
          ],
        },
        {
          type: 'regle',
          titre: 'Ce que montre le TP',
          lignes: [
            'Seul le **protocole 1**, avec une masse et un volume mesurés, permet de comparer la solubilité maximale à une **valeur donnée** (m/v).',
            'Le **sucre** et le **sel** sont **solubles** dans l\'eau ; la **poudre de fer**, **non**.',
            'Un résultat dans l\'**eau** ne dit **rien** de la solubilité dans l\'**huile** : la solubilité **dépend du solvant**.',
          ],
        },
        {
          type: 'regle',
          titre: 'Un exemple avec m/v',
          lignes: [
            '58 g de sucre dans 40 mL d\'eau donnent un mélange homogène : la solubilité maximale du sucre est **supérieure à 58 ÷ 40 = 1,45 g/mL**.',
          ],
        },
      ],
      items: [
        {
          id: 'so-protocole', type: 'choix', consigne: BLOC, phrase: 'Quel protocole permet de vérifier si la solubilité maximale d\'un solide est supérieure à une valeur donnée ?',
          options: ['Le protocole 1, avec une masse et un volume mesurés', 'Le protocole 2, avec une cuillère', 'Aucun des deux'],
          attendu: 'Le protocole 1, avec une masse et un volume mesurés',
          explication: 'Avec une cuillère, on ne connaît ni la masse ni le volume : on ne peut pas calculer m/v.',
        },
        {
          id: 'so-solubles', type: 'choix', consigne: BLOC, phrase: 'Lesquels de ces solides sont solubles dans l\'eau ?',
          options: ['Le sucre et le sel', 'Le sucre, le sel et la poudre de fer', 'Seulement la poudre de fer'], attendu: 'Le sucre et le sel',
          explication: 'La poudre de fer reste visible au fond : le mélange est hétérogène.',
        },
        {
          id: 'so-fer', type: 'choix', consigne: BLOC, phrase: 'La solubilité maximale du fer dans l\'eau est-elle supérieure à 25 g/cL ?',
          options: ['Non : le fer ne se dissout pas dans l\'eau', 'Oui', 'On ne peut pas le savoir'], attendu: 'Non : le fer ne se dissout pas dans l\'eau',
          explication: 'La poudre de fer n\'est pas soluble dans l\'eau : elle reste au fond.',
        },
        {
          id: 'so-huile', type: 'choix', consigne: BLOC, phrase: 'Ces résultats dans l\'eau renseignent-ils sur la solubilité dans l\'huile ?',
          options: ['Non : la solubilité dépend du liquide, le solvant', 'Oui : ce qui se dissout dans l\'eau se dissout dans l\'huile', 'Oui : l\'eau et l\'huile sont deux liquides'],
          attendu: 'Non : la solubilité dépend du liquide, le solvant',
          explication: 'Il faudrait refaire le test avec de l\'huile comme solvant.',
        },
        {
          id: 'so-solute', type: 'choix', consigne: 'On mélange 58 g de sucre dans 40 mL d\'eau, de manière homogène.', phrase: 'Quel est le soluté ?',
          options: ['Le sucre', 'L\'eau', 'L\'eau sucrée'], attendu: 'Le sucre',
          explication: 'Le soluté, c\'est le solide dissous.',
        },
        {
          id: 'so-solvant', type: 'choix', consigne: 'On mélange 58 g de sucre dans 40 mL d\'eau, de manière homogène.', phrase: 'Quel est le solvant ?',
          options: ['L\'eau', 'Le sucre', 'L\'eau sucrée'], attendu: 'L\'eau',
          explication: 'Le solvant, c\'est le liquide.',
        },
        {
          id: 'so-solution', type: 'choix', consigne: 'On mélange 58 g de sucre dans 40 mL d\'eau, de manière homogène.', phrase: 'Quelle est la solution ?',
          options: ['L\'eau sucrée', 'Le sucre', 'L\'eau'], attendu: 'L\'eau sucrée',
          explication: 'La solution, c\'est le mélange homogène.',
        },
        {
          id: 'so-mv', type: 'reponse', question: 'Avec le protocole 1, 58 g de sucre dans 40 mL d\'eau donnent un mélange homogène. La solubilité maximale du sucre est supérieure à combien de g/mL ?', attendu: '1,45 g/mL',
          nombre: 1.45, ecart: 0.005, indice: 'm/v : la masse divisée par le volume.',
          pieges: [{ nombre: 0.69, ecart: 0.005, message: 'Tu as divisé le volume par la masse. m/v = 58 ÷ 40 = 1,45 g/mL.' }],
          explication: 'm/v = 58 ÷ 40 = 1,45 g/mL : la solubilité maximale du sucre est supérieure à 1,45 g/mL.',
        },
        {
          id: 'so-pas-homogene', type: 'choix', consigne: BLOC, phrase: 'Avec le protocole 1, il reste du solide au fond : le mélange n\'est pas homogène. Que peut-on dire ?',
          options: ['La solubilité maximale est inférieure à m/v', 'La solubilité maximale est supérieure à m/v', 'Le solide est un corps pur'],
          attendu: 'La solubilité maximale est inférieure à m/v',
          explication: 'On n\'a pas pu tout dissoudre : le liquide ne peut pas en accepter autant.',
        },
      ],
    },

    {
      id: 'm3-ecrire',
      seance: 3,
      titre: 'Rédiger : un protocole',
      sousTitre: 'Avec des mesures, et une conclusion',
      duree: 5,
      fiche: [
        {
          type: 'regle',
          titre: 'Un protocole complet',
          lignes: [
            '**Mesurer** : quelle masse de soluté (avec la balance), quel volume de solvant (avec l\'éprouvette graduée), choisis pour que m/v donne la valeur à tester.',
            '**Faire** : verser le solvant dans un bécher, ajouter le soluté, agiter jusqu\'à ce que plus rien ne change (près de la limite, quelques secondes ne suffisent pas).',
            '**Conclure** : homogène → la solubilité maximale est supérieure à m/v ; sinon, inférieure.',
            'Pour 300 g/L : 30 g dans 100 mL (0,1 L), ou 3 g dans 10 mL.',
          ],
        },
      ],
      items: [
        {
          id: 'so-w-protocole', type: 'decrire', sujet: 'Écris un protocole pour savoir si la solubilité maximale du sel dans l\'eau est supérieure à 300 g/L.', emoji: '🧂',
          indices: ['balance', 'éprouvette graduée', 'bécher', '30 g', '100 mL', 'agiter', 'homogène', 'supérieure', 'inférieure'],
          consigne: 'Rédige le protocole étape par étape : ce que tu mesures, ce que tu fais, et comment tu conclus.',
          titreModele: 'Une réponse d\'exemple',
          modele: 'Je pèse 30 g de sel avec la balance. Je mesure 100 mL d\'eau avec l\'éprouvette graduée et je les verse dans un bécher. J\'ajoute le sel dans l\'eau et j\'agite jusqu\'à ce que plus rien ne change, quelques minutes. Puis j\'observe : si le mélange est homogène, la solubilité maximale du sel est supérieure à 30 g ÷ 0,1 L = 300 g/L ; s\'il reste du sel au fond, elle est inférieure à 300 g/L.',
          criteres: [
            { id: 'mesures', texte: 'Une masse de sel et un volume d\'eau mesurés (balance, éprouvette), dans le rapport 300 g/L : 30 g pour 100 mL, 3 g pour 10 mL…' },
            { id: 'gestes', texte: 'Les gestes : verser l\'eau dans un bécher, ajouter le sel, agiter' },
            { id: 'conclusion', texte: 'La conclusion : homogène → supérieure à 300 g/L ; du sel reste au fond → inférieure' },
          ],
        },
      ],
    },
  ],

  // ── Le contrôle blanc ───────────────────────────────────────────────────
  interro: {
    duree: 10,
    tirage: [
      { etape: 'm1-formule', nombre: 2 },
      { etape: 'm1-conversions', nombre: 2 },
      { etape: 'm1-tp', nombre: 2 },
      { etape: 'm1-exos', nombre: 3 },
      { etape: 'm2-etats', nombre: 2 },
      { etape: 'm2-changements', nombre: 3 },
      { etape: 'm2-identifier', nombre: 2 },
      { etape: 'm3-mots', nombre: 2 },
      { etape: 'm3-tp', nombre: 2 },
    ],
  },
};
