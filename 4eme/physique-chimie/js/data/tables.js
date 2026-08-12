// La table de constantes centrale, et les tables tabulées de la classe A′.
//
// ── Pourquoi une table centrale ────────────────────────────────────────────
//
// `charte.md` invariant 4 refuse « l'usage d'une constante absente de la table
// centrale sourcée », et l'invariant 5 refuse « une entrée de table sans
// source ». Sans ce fichier, les deux refus n'avaient rien à lire : un auteur
// pouvait écrire 340 m/s dans une chaîne de calcul et personne n'aurait su d'où
// venait le nombre — ce qui est exactement la mécanique de l'épisode du « 57 % »
// appliquée à une constante physique.
//
// ── La classe A′ existe parce qu'un fait n'est pas un théorème ─────────────
//
// La v1 refusait à juste titre qu'une valeur tabulée soit déclarée classe A,
// mais n'ouvrait aucune classe pour l'accueillir : ces items — identifier un
// matériau par sa masse volumique, symbole ↔ élément, température de changement
// d'état, composition de l'air, vitesses du son et de la lumière — tombaient en
// C, donc consommaient le budget de relecture humaine alors qu'ils sont
// mécaniquement vérifiables à l'identique de A. La classe A′ les rejoue par
// REQUÊTE : `{ table, cle, colonne }`, et le contrôle refuse un résultat que la
// requête ne retrouve pas.
//
// ── Les valeurs sont des rationnels exacts, jamais des flottants ───────────
//
// `[27, 10]` et non `2.7`. C'est la même exigence que dans les chaînes de
// calcul, et pour la même raison : une masse volumique est un quotient de deux
// mesures, et 2,7 n'a pas d'écriture binaire exacte. Une table en flottants
// rendrait le recalcul de la classe A faux au douzième chiffre, c'est-à-dire
// exactement là où « le contrôle rejoue le calcul » cesse d'être une garantie.

/** Une entrée de table sans source est refusée : la source EST le champ. */
const src = (source, url, dateLecture) => Object.freeze({ source, url, dateLecture });

const ETALAB = 'Licence Ouverte / Etalab 2.0';

// ════════════════════════════════════════════════════════════════════════════
// Les constantes — référencées par `$nom` dans les chaînes de calcul
// ════════════════════════════════════════════════════════════════════════════

export const CONSTANTES = Object.freeze({
  'vitesse-de-la-lumiere': Object.freeze({
    nom: 'vitesse de la lumière dans le vide',
    // Valeur EXACTE par définition du mètre depuis la 17ᵉ CGPM (1983). C'est ce
    // qui permet aux distances astronomiques du chapitre 11 de rester dans les
    // rationnels exacts : l'année-lumière est un entier de mètres.
    valeur: [299792458, 1],
    unite: 'm/s',
    ...src('BIPM, Le Système international d\'unités, 9ᵉ édition (2019), § 2.3.1', 'https://www.bipm.org/en/publications/si-brochure', '2026-08-12'),
    statut: 'primaire',
  }),
  'vitesse-du-son-air-20c': Object.freeze({
    nom: "vitesse du son dans l'air à 20 °C",
    valeur: [343, 1],
    unite: 'm/s',
    ...src('Programme de physique-chimie du cycle 4, BO n°31 du 30 juillet 2020 — valeur usuelle du cycle 4', 'https://physique-chimie.ac-mayotte.fr/IMG/pdf/programme_pc_cycle_4_avec_modification_1_.pdf', '2026-08-11'),
    statut: 'primaire',
    licence: ETALAB,
    // 340 m/s est la valeur de manuel la plus répandue ; 343 m/s est celle à
    // 20 °C. L'écart de 1 % dépasse les fenêtres de tolérance usuelles : la
    // valeur servie doit être UNE, et c'est celle-ci, déclarée ici plutôt que
    // choisie au fil des items.
    remarque: "une seule valeur pour tout le corpus ; 340 m/s n'est pas admis comme variante d'auteur.",
  }),
  'intensite-de-pesanteur-terre': Object.freeze({
    nom: "intensité de la pesanteur à la surface de la Terre",
    valeur: [10, 1],
    unite: 'N/kg',
    ...src("Programme de physique-chimie du cycle 4 — valeur approchée usuelle au collège", 'https://physique-chimie.ac-mayotte.fr/IMG/pdf/programme_pc_cycle_4_avec_modification_1_.pdf', '2026-08-11'),
    statut: 'primaire',
    licence: ETALAB,
    // Le bloc optionnel B seulement. `N/kg` n'est PAS dans le lexique auteur de
    // `unites.js` en tant que symbole : c'est un quotient de deux symboles qui
    // le sont, donc l'analyse lexicale le lit sans extension du lexique.
  }),
});

// ════════════════════════════════════════════════════════════════════════════
// Les tables — interrogées par la classe A′
// ════════════════════════════════════════════════════════════════════════════

/**
 * Une table est `{ colonnes, source, lignes: { cle: { colonne: valeur } } }`.
 *
 * Les valeurs numériques sont des rationnels `[n, d]` accompagnés de leur unité,
 * les valeurs textuelles des chaînes. Le contrôle rejoue `{ table, cle, colonne }`
 * et compare à la réponse déclarée par l'item : une correction que la requête ne
 * retrouve pas est refusée.
 */
export const TABLES = Object.freeze({
  'masses-volumiques': Object.freeze({
    titre: 'Masses volumiques de quelques matériaux, à 20 °C',
    colonnes: Object.freeze(['masseVolumique']),
    ...src("Table de référence du corpus, valeurs usuelles du cycle 4 (BO n°31 du 30 juillet 2020, exemples de situations)", 'https://physique-chimie.ac-mayotte.fr/IMG/pdf/programme_pc_cycle_4_avec_modification_1_.pdf', '2026-08-11'),
    statut: 'primaire',
    lignes: Object.freeze({
      eau: { masseVolumique: { valeur: [1, 1], unite: 'g/cm³' } },
      aluminium: { masseVolumique: { valeur: [27, 10], unite: 'g/cm³' } },
      fer: { masseVolumique: { valeur: [79, 10], unite: 'g/cm³' } },
      cuivre: { masseVolumique: { valeur: [89, 10], unite: 'g/cm³' } },
      plomb: { masseVolumique: { valeur: [113, 10], unite: 'g/cm³' } },
      'huile-de-tournesol': { masseVolumique: { valeur: [92, 100], unite: 'g/cm³' } },
      'bois-de-chene': { masseVolumique: { valeur: [75, 100], unite: 'g/cm³' } },
      glace: { masseVolumique: { valeur: [92, 100], unite: 'g/cm³' } },
    }),
  }),

  'changements-d-etat': Object.freeze({
    titre: 'Températures de changement d\'état sous pression atmosphérique',
    colonnes: Object.freeze(['fusion', 'ebullition']),
    ...src("Table de référence du corpus, valeurs usuelles du cycle 4", 'https://physique-chimie.ac-mayotte.fr/IMG/pdf/programme_pc_cycle_4_avec_modification_1_.pdf', '2026-08-11'),
    statut: 'primaire',
    lignes: Object.freeze({
      eau: { fusion: { valeur: [0, 1], unite: '°C' }, ebullition: { valeur: [100, 1], unite: '°C' } },
      ethanol: { fusion: { valeur: [-114, 1], unite: '°C' }, ebullition: { valeur: [78, 1], unite: '°C' } },
      // Le fer n'a pas d'ébullition utile au collège : la colonne vaut `null`,
      // et une requête sur une case nulle est un refus, pas un `undefined`.
      fer: { fusion: { valeur: [1538, 1], unite: '°C' }, ebullition: null },
    }),
  }),

  'vitesses-de-propagation': Object.freeze({
    titre: 'Vitesses de propagation',
    colonnes: Object.freeze(['vitesse']),
    ...src('BIPM (lumière) et programme du cycle 4 (son)', 'https://www.bipm.org/en/publications/si-brochure', '2026-08-12'),
    statut: 'primaire',
    lignes: Object.freeze({
      'lumiere-dans-le-vide': { vitesse: { valeur: [299792458, 1], unite: 'm/s' } },
      'son-dans-l-air-20c': { vitesse: { valeur: [343, 1], unite: 'm/s' } },
      'son-dans-l-eau': { vitesse: { valeur: [1480, 1], unite: 'm/s' } },
      'son-dans-l-acier': { vitesse: { valeur: [5000, 1], unite: 'm/s' } },
    }),
  }),

  'composition-de-l-air': Object.freeze({
    titre: "Composition de l'air sec, en volume",
    colonnes: Object.freeze(['proportion']),
    ...src('Programme de physique-chimie du cycle 4, BO n°31 du 30 juillet 2020', 'https://physique-chimie.ac-mayotte.fr/IMG/pdf/programme_pc_cycle_4_avec_modification_1_.pdf', '2026-08-11'),
    statut: 'primaire',
    licence: ETALAB,
    lignes: Object.freeze({
      // Sans unité au sens de `unites.js` : une proportion est adimensionnée, et
      // c'est l'état « sans unité » qui la porte, pas un champ vide.
      diazote: { proportion: { valeur: [80, 100], unite: 'SANS_UNITE' } },
      dioxygene: { proportion: { valeur: [20, 100], unite: 'SANS_UNITE' } },
    }),
  }),

  'symboles-des-elements': Object.freeze({
    titre: 'Symboles des éléments au programme de 4ᵉ',
    colonnes: Object.freeze(['symbole', 'nom']),
    ...src('Tableau périodique, outil de classement et de repérage — BO n°31 du 30 juillet 2020', 'https://physique-chimie.ac-mayotte.fr/IMG/pdf/programme_pc_cycle_4_avec_modification_1_.pdf', '2026-08-11'),
    statut: 'primaire',
    licence: ETALAB,
    lignes: Object.freeze({
      hydrogene: { symbole: 'H', nom: 'hydrogène' },
      carbone: { symbole: 'C', nom: 'carbone' },
      azote: { symbole: 'N', nom: 'azote' },
      oxygene: { symbole: 'O', nom: 'oxygène' },
      fer: { symbole: 'Fe', nom: 'fer' },
      cuivre: { symbole: 'Cu', nom: 'cuivre' },
      aluminium: { symbole: 'Al', nom: 'aluminium' },
    }),
  }),
});

/**
 * Le résultat d'une requête tabulée, ou `null` si la table, la clé ou la colonne
 * n'existent pas. `null` est un refus, pas une valeur : c'est ce que
 * l'invariant 5 attrape.
 */
export function interrogerTable(requete = {}) {
  const table = TABLES[requete.table];
  if (!table) return null;
  if (!table.colonnes.includes(requete.colonne)) return null;
  const ligne = table.lignes[requete.cle];
  if (!ligne) return null;
  const cellule = ligne[requete.colonne];
  return cellule === undefined || cellule === null ? null : cellule;
}
