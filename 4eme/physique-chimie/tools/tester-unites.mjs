// Tests de l'algèbre des unités, hors navigateur.
//
//     node tools/tester-unites.mjs
//
// Site (M) de la charte : des fonctions pures, éprouvées par assertion. Ces
// tests ne cherchent pas à confirmer que le module marche — ils cherchent les
// endroits où la charte dit qu'il pourrait se tromper, et le seul verdict qui
// compte ici est celui qui ferait échouer un élève ayant raison, ou passer un
// élève ayant tort.
//
// Quatre familles d'attaque, dans cet ordre :
//   · les cas limites que la charte NOMME (hL, da, °C dans un quotient,
//     g/100 mL, les trois états du champ unité, l'exposant négatif, la virgule,
//     2 700 kg/m³ répondu à une question posée en g/cm³) ;
//   · les flottants : chaque test de cette section est une suite de conversions
//     dont la version flottante donne un résultat FAUX, et le commentaire porte
//     la valeur flottante en question. Un test qui passerait aussi en flottants
//     ne prouverait rien de l'arithmétique rationnelle ;
//   · les entrées malformées : le module doit rendre un code, jamais lever ;
//   · l'ORDRE des verdicts, que l'invariant 9 rend opposable.

import {
  LEXIQUE_AUTEUR,
  SANS_UNITE,
  VARIANTES_ELEVE,
  VERDICTS,
  analyserUnite,
  comparerReponse,
  controlerItemAuteur,
  controlerUniteAuteur,
  decrireDimension,
  etatChampUnite,
  issueDepuisVerdict,
  memeDimension,
  memeUnite,
  rationnel,
  rationnelDepuisTexte,
  rationnelVersTexte,
  rationnelsEgaux,
  verifierEcriture,
} from '../js/unites.js';

let passes = 0;
const echecs = [];

const verifier = (nom, condition) => {
  if (condition) passes += 1;
  else echecs.push(nom);
};

// Toute la section « entrées malformées » repose là-dessus : on veut savoir si
// le module rend un verdict ou s'il lève, et une exception qui remonte ferait
// passer le test suivant pour l'échec du précédent.
const sansLever = (f) => {
  try {
    return f();
  } catch (e) {
    return { verdict: `A LEVÉ ${e.constructor.name}`, code: `A LEVÉ ${e.constructor.name}`, leve: e };
  }
};

// Raccourcis de lecture.
const dimDe = (s, opt) => { const r = analyserUnite(s, opt); return r.ok ? r.unite.dim.join(',') : `REFUS:${r.code}`; };
const facteurDe = (s, opt) => { const r = analyserUnite(s, opt); return r.ok ? rationnelVersTexte(r.unite.facteur) : `REFUS:${r.code}`; };
const codeDe = (s, opt) => { const r = analyserUnite(s, opt); return r.ok ? 'OK' : r.code; };
const unite = (s, opt) => analyserUnite(s, opt).unite;

// ════════════════════════════════════════════════════════════════════════════
// 1. Le lexique — la plus-longue-correspondance AVANT préfixe + symbole
// ════════════════════════════════════════════════════════════════════════════
//
// La charte nomme deux cas d'ambiguïté et dit par quelle règle ils se tranchent,
// pas ce qu'ils valent : `hL` entre hecto-litre et heure-litre, `da` entre déca
// et d + a. Ces tests fixent le résultat de la règle, pour qu'un changement
// d'ordre des paliers devienne un échec au lieu d'un glissement silencieux.

// La première version de ces tests épinglait le RÉSULTAT de la règle : hL valait
// heure-litre, ms valait mètre-seconde, mN valait mètre-newton — donc une
// énergie. C'était cohérent, et c'était un piège : l'élève qui tape « ms » pour
// une durée recevait « ce n'est pas une durée », un verdict vrai et
// incompréhensible. La règle de juxtaposition tranche maintenant en amont, et
// ces cas se refusent au lieu de se lire de travers.

verifier(
  'hL ne se lit pas heure-litre : deux symboles collés ne sont pas un produit',
  codeDe('hL') === 'JUXTAPOSITION_AMBIGUE',
);
verifier(
  'la règle est uniforme, pas locale à hL — hm, hg et ms tombent pareil',
  codeDe('hm') === 'JUXTAPOSITION_AMBIGUE'
    && codeDe('hg') === 'JUXTAPOSITION_AMBIGUE'
    && codeDe('ms') === 'JUXTAPOSITION_AMBIGUE',
);
verifier(
  'mN non plus — c\'était le cas le plus coûteux, il se lisait comme une énergie',
  codeDe('mN') === 'JUXTAPOSITION_AMBIGUE',
);

// Ce que la règle NE doit pas casser : un produit réellement écrit comme tel.
// L'auteur met un point médian, l'élève met une espace, et la normalisation
// ramène les deux au même point — c'est cette écriture-là qui reste un produit.
verifier('N·m reste un produit : le séparateur est écrit', codeDe('N·m') === 'OK');
verifier('N m aussi, l\'espace valant point médian', codeDe('N m') === 'OK');
verifier(
  'et les deux donnent la même dimension qu\'une énergie',
  dimDe('N·m') === dimDe('J') && dimDe('N m') === dimDe('J'),
);

// Ce que la règle ne doit pas casser non plus : les symboles déclarés d'un seul
// tenant. Ils sont lus en UNE fois par la plus-longue-correspondance, donc il
// n'y a jamais deux termes, donc la juxtaposition ne se pose pas.
verifier(
  'les symboles multi-caractères du lexique passent : cm, mA, mL, kWh, km',
  ['cm', 'mA', 'mL', 'kWh', 'km'].every((s) => codeDe(s) === 'OK'),
);

// Le détecteur reste un détecteur. Si la milliseconde ou le millinewton
// entraient au lexique déclaré, `ms` et `mN` deviendraient des symboles d'un
// seul tenant : ces deux tests tomberaient, et c'est exactement le signal qu'on
// veut — le sens d'une saisie élève déjà en base aurait changé.
verifier(
  'la milliseconde et le millinewton ne sont toujours pas au lexique',
  codeDe('ms') !== 'OK' && codeDe('mN') !== 'OK',
);

// Et le bout de la chaîne, côté élève : on redemande, on ne juge pas.
verifier(
  'un élève tapant « 250 ms » se voit redemander son unité, sans perdre d\'essai',
  (() => {
    const r = comparerReponse({ valeur: '250', unite: 'ms' }, { valeur: rationnel(250), unite: 's' });
    return r.verdict === 'UNITE_NON_RECONNUE' && r.consommeEssai === false;
  })(),
);

// `da` doit être essayé avant `d`, sinon `dam` se lit d + « am » et échoue.
verifier('dam est le décamètre : 10 m', dimDe('dam') === '0,1,0,0,0' && facteurDe('dam') === '10');
verifier('daL est le décalitre : 10 × 1/1000 = 1/100 m³', dimDe('daL') === '0,3,0,0,0' && facteurDe('daL') === '1/100');
verifier('dag est le décagramme : 10 × 1/1000 = 1/100 kg', facteurDe('dag') === '1/100');
verifier(
  'da SEUL n\'est pas une unité — un préfixe orphelin est refusé, pas interprété',
  codeDe('da') === 'SYMBOLE_INCONNU',
);
verifier(
  'le préfixe ne s\'applique qu\'aux symboles prefixables : kkg est refusé',
  codeDe('kkg') === 'SYMBOLE_INCONNU',
);
verifier(
  'µ est accepté sous ses deux points de code, et donne le même facteur',
  facteurDe('µm') === '1/1000000' && facteurDe('μm') === '1/1000000',
);

// L'asymétrie des deux lexiques : on reconnaît plus de l'élève qu'on n'autorise
// à l'auteur. Un test qui ne vérifierait que le côté élève laisserait passer une
// liste blanche auteur ouverte.
verifier('µm est refusé à l\'AUTEUR — la liste blanche y est fermée au sens strict',
  codeDe('µm', { lexique: 'auteur' }) === 'SYMBOLE_INCONNU');
verifier('µm est accepté de l\'ÉLÈVE', codeDe('µm') === 'OK');

verifier(
  'le lexique auteur est exactement celui de la charte (25 symboles, al et ua compris)',
  [...LEXIQUE_AUTEUR].sort().join(' ') ===
    ['kg', 'g', 't', 'm', 'dm', 'cm', 'mm', 'km', 'L', 'mL', 's', 'min', 'h', 'A', 'mA',
      'V', 'mV', 'J', 'kJ', 'Wh', 'kWh', 'N', '°C', 'al', 'ua'].sort().join(' '),
);
verifier(
  'aucun symbole du lexique ne se scinde en deux au palier 1 (min ≠ m·in, mA ≠ m·A…)',
  LEXIQUE_AUTEUR.every((s) => {
    const r = analyserUnite(s, { lexique: 'auteur' });
    return r.ok && r.unite.symboles.length === 1 && r.unite.symboles[0] === s;
  }),
);

// ════════════════════════════════════════════════════════════════════════════
// 2. La grammaire — exposants, facteurs numériques, un seul niveau de division
// ════════════════════════════════════════════════════════════════════════════

verifier('l\'exposant négatif en indice haut est lu : g·cm⁻³ est une masse volumique',
  dimDe('g·cm⁻³') === '1,-3,0,0,0');
verifier('g·cm⁻³, g/cm³ et g/mL se réduisent au MÊME couple — donc la même unité, point final',
  memeUnite(unite('g·cm⁻³'), unite('g/cm³')) && memeUnite(unite('g/mL'), unite('g/cm³')));
verifier('l\'exposant négatif en ASCII aussi : m^-3', dimDe('m^-3') === '0,-3,0,0,0');
verifier('un exposant négatif au dénominateur change de signe : kg/m^-3 donne L=+3',
  dimDe('kg/m^-3') === '1,3,0,0,0');

verifier('un exposant à deux chiffres est hors grammaire (m^10)', codeDe('m^10') === 'EXPOSANT_INVALIDE');
verifier('m10 tapé par l\'élève ne devient pas m^1 suivi d\'un 0 muet', codeDe('m10') === 'EXPOSANT_INVALIDE');
verifier('un accent circonflexe sans chiffre est refusé', codeDe('m^') === 'EXPOSANT_INVALIDE');

// g/100 mL est le cas nommé par la charte : la solubilité s'écrit g/L, et le
// refus doit tomber sur le facteur numérique, pas sur autre chose.
verifier('g/100 mL est refusé pour FACTEUR_NUMERIQUE, côté élève', codeDe('g/100 mL') === 'FACTEUR_NUMERIQUE');
verifier('g/100 mL est refusé pour FACTEUR_NUMERIQUE, côté auteur',
  codeDe('g/100 mL', { lexique: 'auteur' }) === 'FACTEUR_NUMERIQUE');
verifier('et g/L, lui, passe', dimDe('g/L') === '1,-3,0,0,0');
verifier('un facteur numérique en tête est refusé aussi : 1/m', codeDe('1/m') === 'FACTEUR_NUMERIQUE');

verifier('deux barres de division sont ambiguës, donc refusées : m/s/s', codeDe('m/s/s') === 'GRAMMAIRE_INVALIDE');
verifier('un dénominateur vide est refusé : m/', codeDe('m/') === 'GRAMMAIRE_INVALIDE');
verifier('un numérateur vide est refusé : /s', codeDe('/s') === 'GRAMMAIRE_INVALIDE');

verifier('l\'espace vaut produit : « kg m » est une masse-longueur', dimDe('kg m') === '1,1,0,0,0');
verifier(
  '« m s » n\'est PAS recollé en « ms » — sinon une réponse juste écrite avec une espace deviendrait fausse',
  dimDe('m s') === dimDe('m·s'),
);

// ════════════════════════════════════════════════════════════════════════════
// 3. Le degré Celsius — hors de l'algèbre, structurellement
// ════════════════════════════════════════════════════════════════════════════

verifier('°C seul est une température', dimDe('°C') === '0,0,0,0,1' && unite('°C').kind === 'affine');
verifier('J/°C est refusé au build : une affine dans un quotient', codeDe('J/°C', { lexique: 'auteur' }) === 'AFFINE_COMPOSEE');
verifier('°C·s est refusé : une affine dans un produit', codeDe('°C·s', { lexique: 'auteur' }) === 'AFFINE_COMPOSEE');
verifier('°C² est refusé : une affine avec exposant', codeDe('°C²', { lexique: 'auteur' }) === 'AFFINE_COMPOSEE');
verifier('1/°C n\'ouvre pas une porte dérobée', !analyserUnite('1/°C', { lexique: 'auteur' }).ok);
verifier(
  'côté élève, J/°C n\'est pas une réponse FAUSSE : c\'est une unité non reconnue, sans essai consommé',
  (() => {
    const v = comparerReponse({ valeur: '5', unite: 'J/°C' }, { valeur: '5', unite: 'J' });
    return v.verdict === VERDICTS.UNITE_NON_RECONNUE && v.accepte === null && v.consommeEssai === false;
  })(),
);
verifier(
  'deux températures se comparent dans leur unité déclarée, sans facteur inventé',
  comparerReponse({ valeur: '20', unite: '°C' }, { valeur: '20', unite: '°C' }).verdict === VERDICTS.JUSTE
  && comparerReponse({ valeur: '21', unite: '°C' }, { valeur: '20', unite: '°C' }).verdict === VERDICTS.VALEUR_FAUSSE,
);

// ════════════════════════════════════════════════════════════════════════════
// 4. Les variantes élève — l'invariant 9 rejoué
// ════════════════════════════════════════════════════════════════════════════
//
// « Une variante déclarée que l'analyseur n'accepterait pas est un refus de
// build. » Le test rejoue la table elle-même : ajouter une variante sans la
// faire marcher devient un échec, sans qu'il faille penser à écrire le test.

verifier(
  'chaque variante déclarée se réduit au même couple que sa forme canonique',
  VARIANTES_ELEVE.every(({ saisie, canonique }) => {
    const a = analyserUnite(saisie, { lexique: 'eleve' });
    const b = analyserUnite(canonique, { lexique: 'auteur' });
    return a.ok && b.ok && memeUnite(a.unite, b.unite);
  }),
);
verifier(
  'et la table couvre bien les quatre variantes annoncées par la charte',
  VARIANTES_ELEVE.map((v) => v.saisie).sort().join(' ') === 'cm3 kmh m/s2 m3',
);
verifier('la virgule décimale vaut le point', rationnelsEgaux(rationnelDepuisTexte('2,7'), rationnel(27, 10)));
verifier('2,7 est exactement 27/10, pas 2.7000000000000002', rationnelVersTexte(rationnelDepuisTexte('2,7')) === '27/10');
verifier(
  'les espaces de milliers sont ignorées, y compris l\'espace insécable et la fine insécable',
  rationnelsEgaux(rationnelDepuisTexte('2 700'), rationnel(2700))
  && rationnelsEgaux(rationnelDepuisTexte('2 700'), rationnel(2700))
  && rationnelsEgaux(rationnelDepuisTexte('2 700'), rationnel(2700)),
);
// Écrite en échappement : tapée en clair, la fine est indistinguable des trois
// autres à la relecture, et un test d'espaces qu'on ne peut pas relire ne vaut
// rien.
verifier(
  'la fine U+2009 est ignorée elle aussi',
  rationnelsEgaux(rationnelDepuisTexte('2 700'), rationnel(2700)),
);
verifier(
  'et une espace de milliers ne casse pas la comparaison d\'une réponse entière',
  comparerReponse({ valeur: '2 700', unite: 'kg/m³' }, { valeur: [27, 10], unite: 'g/cm³' }).accepte === true,
);
verifier(
  'les trois écritures de la puissance de dix donnent le même entier',
  rationnelVersTexte(rationnelDepuisTexte('3,0×10⁸')) === '300000000'
  && rationnelVersTexte(rationnelDepuisTexte('3,0×10^8')) === '300000000'
  && rationnelVersTexte(rationnelDepuisTexte('3.0e8')) === '300000000',
);
verifier('le signe moins typographique est accepté', rationnelVersTexte(rationnelDepuisTexte('−2,5')) === '-5/2');

// ════════════════════════════════════════════════════════════════════════════
// 5. Les trois états du champ unité
// ════════════════════════════════════════════════════════════════════════════
//
// Sans le deuxième état, « l'élève a-t-il mis une unité ? » produit un faux
// positif sur chaque réponse adimensionnée du corpus.

verifier('champ vide', etatChampUnite('') === 'vide' && etatChampUnite(null) === 'vide' && etatChampUnite('   ') === 'vide');
verifier('choix explicite « sans unité »', etatChampUnite(SANS_UNITE) === 'sans-unite');
verifier('unité saisie', etatChampUnite('kg') === 'saisie');
verifier(
  'un champ vide n\'est pas une erreur : REPONSE_INCOMPLETE, sans essai consommé et sans issue',
  (() => {
    const v = comparerReponse({ valeur: '2,7', unite: '' }, { valeur: [27, 10], unite: 'g/cm³' });
    return v.verdict === VERDICTS.REPONSE_INCOMPLETE && v.consommeEssai === false && issueDepuisVerdict(v) === null;
  })(),
);
verifier(
  '« sans unité » répondu à une question adimensionnée est JUSTE',
  comparerReponse({ valeur: '5', unite: SANS_UNITE }, { valeur: '5', unite: SANS_UNITE }).verdict === VERDICTS.JUSTE,
);
verifier(
  'une unité posée sur une réponse adimensionnée est une DIMENSION fausse, pas un champ mal rempli',
  comparerReponse({ valeur: '5', unite: 'kg' }, { valeur: '5', unite: SANS_UNITE }).verdict === VERDICTS.DIMENSION_FAUSSE,
);
verifier(
  'et l\'inverse : rien saisi là où une masse est attendue reste REPONSE_INCOMPLETE, jamais un échec',
  comparerReponse({ valeur: '5', unite: '' }, { valeur: '5', unite: 'kg' }).verdict === VERDICTS.REPONSE_INCOMPLETE,
);

// ════════════════════════════════════════════════════════════════════════════
// 6. Le cas fondateur — 2 700 kg/m³ répondu à une question posée en g/cm³
// ════════════════════════════════════════════════════════════════════════════

const MASSE_VOLUMIQUE = { valeur: [27, 10], unite: 'g/cm³' };

verifier('2,7 g/cm3 (variante clavier) est JUSTE',
  comparerReponse({ valeur: '2,7', unite: 'g/cm3' }, MASSE_VOLUMIQUE).verdict === VERDICTS.JUSTE);
verifier('2,7 g/mL est JUSTE tout court — même couple, donc même unité',
  comparerReponse({ valeur: '2,7', unite: 'g/mL' }, MASSE_VOLUMIQUE).verdict === VERDICTS.JUSTE);
verifier(
  '2 700 kg/m³ est ACCEPTÉ et signalé — l\'élève qui a raison n\'est pas compté faux',
  (() => {
    const v = comparerReponse({ valeur: '2700', unite: 'kg/m³' }, MASSE_VOLUMIQUE);
    return v.verdict === VERDICTS.UNITE_NON_DEMANDEE && v.accepte === true && issueDepuisVerdict(v) === 'reussite';
  })(),
);
verifier(
  'sauf si la conversion EST le savoir-faire : uniteImposee refuse, avec motif',
  (() => {
    const v = comparerReponse({ valeur: '2700', unite: 'kg/m³' }, { ...MASSE_VOLUMIQUE, uniteImposee: true });
    return v.verdict === VERDICTS.UNITE_NON_DEMANDEE && v.accepte === false
      && v.motif === 'unite-imposee' && issueDepuisVerdict(v) === 'echec';
  })(),
);
verifier(
  'le verdict de dimension nomme les deux grandeurs, c\'est le retour utile du moteur',
  (() => {
    const v = comparerReponse({ valeur: '2,7', unite: 'g' }, MASSE_VOLUMIQUE);
    return v.attendue === 'une masse volumique' && v.recue === 'une masse';
  })(),
);

// ════════════════════════════════════════════════════════════════════════════
// 7. Les flottants qui mentent
// ════════════════════════════════════════════════════════════════════════════
//
// Chaque cas ci-dessous est choisi parce que sa version flottante donne le
// MAUVAIS verdict. La valeur flottante est écrite en commentaire : si un jour
// quelqu'un remplace les BigInt par des nombres, ces six tests tombent.

// 0.01 ** 3 vaut 1.0000000000000002e-6, pas 1e-6.
verifier('cm³ vaut exactement 1/1000000 m³ (en flottants : 1.0000000000000002e-6)',
  facteurDe('cm³') === '1/1000000');
verifier('mL ≡ cm³ à l\'identité près — l\'égalité est déclarée, pas calculée',
  memeUnite(unite('mL'), unite('cm³')));
verifier('L ≡ dm³ de même', memeUnite(unite('L'), unite('dm³')));

// 1000 × 0.01³ = 0.0010000000000000002 ≠ 0.001 : un moteur flottant compterait
// FAUX un élève qui a converti correctement un litre en centimètres cubes.
verifier(
  '1000 cm3 répond à 1 L (en flottants : 0.0010000000000000002 ≠ 0.001, donc VALEUR_FAUSSE)',
  comparerReponse({ valeur: '1000', unite: 'cm3' }, { valeur: '1', unite: 'L' }).accepte === true,
);
verifier(
  'et 1000 cm3 ne répond PAS à 1 mL — le test précédent ne passe pas par laxisme',
  comparerReponse({ valeur: '1000', unite: 'cm3' }, { valeur: '1', unite: 'mL' }).verdict === VERDICTS.VALEUR_FAUSSE,
);

// 0.001 / 0.01³ = 999.9999999999999, et non 1000 : la conversion g/cm³ → kg/m³
// dérive dès le facteur.
verifier('le facteur de g/cm³ est l\'entier 1000 (en flottants : 999.9999999999999)',
  facteurDe('g/cm³') === '1000');

// 9 460 730 472 580 801 et 9 460 730 472 580 800 sont le MÊME double : au-delà
// de 2⁵³ l'espacement des flottants vaut 2. Un moteur flottant accepterait une
// année-lumière fausse d'un mètre.
verifier(
  'une année-lumière vaut exactement 9 460 730 472 580 800 m',
  comparerReponse({ valeur: '9460730472580800', unite: 'm' }, { valeur: '1', unite: 'al' }).accepte === true,
);
verifier(
  'et pas un mètre de plus (les deux entiers sont le même double : 2⁵³ est dépassé)',
  comparerReponse({ valeur: '9460730472580801', unite: 'm' }, { valeur: '1', unite: 'al' }).verdict === VERDICTS.VALEUR_FAUSSE,
);
verifier(
  'la notation scientifique de l\'année-lumière tombe sur le même entier',
  rationnelVersTexte(rationnelDepuisTexte('9,4607304725808×10¹⁵')) === '9460730472580800',
);

// La borne d'une fenêtre de tolérance : 8,8 − 8 = 0.8000000000000007 en
// flottants, contre 8 × 0,10 = 0.8. Un élève pile sur la borne serait refusé.
verifier(
  'la borne d\'une fenêtre à ±10 % est INCLUSE (en flottants : 0.8000000000000007 > 0.8, donc refusée)',
  comparerReponse(
    { valeur: '8,8', unite: 'kg' },
    { valeur: '8', unite: 'kg', semantique: 'tolerante', tolerancePourcent: 10 },
  ).verdict === VERDICTS.JUSTE,
);
verifier(
  'et juste au-delà de la borne, c\'est faux — la fenêtre a bien un bord',
  comparerReponse(
    { valeur: '8,81', unite: 'kg' },
    { valeur: '8', unite: 'kg', semantique: 'tolerante', tolerancePourcent: 10 },
  ).verdict === VERDICTS.VALEUR_FAUSSE,
);

// Math.log10 sur les bords : la sémantique « ordre de grandeur » est exactement
// une comparaison de bords.
verifier(
  'l\'ordre de grandeur se calcule sur des entiers : 2,5×10⁸ et 3×10⁸ sont du même ordre',
  comparerReponse(
    { valeur: '2,5×10⁸', unite: 'm/s' },
    { valeur: '3×10^8', unite: 'm/s', semantique: 'ordre-de-grandeur' },
  ).verdict === VERDICTS.JUSTE,
);
verifier(
  '9,9×10⁷ ne l\'est pas — la frontière de puissance de dix est nette',
  comparerReponse(
    { valeur: '9,9×10⁷', unite: 'm/s' },
    { valeur: '3×10^8', unite: 'm/s', semantique: 'ordre-de-grandeur' },
  ).verdict === VERDICTS.VALEUR_FAUSSE,
);
verifier(
  'l\'ordre de grandeur passe par le SI : 1 mL et 0,001 L sont du même ordre',
  comparerReponse(
    { valeur: '0,001', unite: 'L' },
    { valeur: '1', unite: 'mL', semantique: 'ordre-de-grandeur' },
  ).accepte === true,
);
verifier(
  'zéro ne vaut que zéro, même en ordre de grandeur',
  comparerReponse(
    { valeur: '0', unite: 'm' },
    { valeur: '1', unite: 'm', semantique: 'ordre-de-grandeur' },
  ).verdict === VERDICTS.VALEUR_FAUSSE,
);

// La barrière d'entrée : un littéral flottant ne doit pas pouvoir entrer dans
// l'algèbre, même par la porte du contenu.
verifier('rationnel(0.5) lève — un littéral flottant explose au contrôle', sansLever(() => rationnel(0.5)).leve !== undefined);
verifier('rationnel(1, 2) ne lève pas', sansLever(() => rationnel(1, 2)).leve === undefined);
verifier('rationnel avec dénominateur nul lève', sansLever(() => rationnel(1, 0)).leve !== undefined);

// ════════════════════════════════════════════════════════════════════════════
// 8. L'ORDRE des verdicts — invariant 9
// ════════════════════════════════════════════════════════════════════════════
//
// « Refuse un verdict de valeur rendu avant le verdict de dimension. » Le test
// qui mord est celui où les deux verdicts sont possibles : si l'ordre
// s'inversait, il basculerait.

verifier(
  'valeur fausse ET dimension fausse : c\'est la DIMENSION qu\'on nomme',
  comparerReponse({ valeur: '5', unite: 'g' }, MASSE_VOLUMIQUE).verdict === VERDICTS.DIMENSION_FAUSSE,
);
verifier(
  'le test précédent ne passe pas par constance : dimension juste et valeur fausse donne VALEUR_FAUSSE',
  comparerReponse({ valeur: '2,8', unite: 'g/cm³' }, MASSE_VOLUMIQUE).verdict === VERDICTS.VALEUR_FAUSSE,
);
verifier(
  'le piège de l\'ordre : même valeur SI, dimension différente — 1000 kg contre 1000 kg/m³',
  comparerReponse({ valeur: '1000', unite: 'kg' }, { valeur: '1000', unite: 'kg/m³' }).verdict === VERDICTS.DIMENSION_FAUSSE,
);
verifier(
  'une unité illisible passe AVANT la dimension : on ne peut pas nommer une dimension qu\'on n\'a pas lue',
  comparerReponse({ valeur: '2,7', unite: 'zorglub' }, MASSE_VOLUMIQUE).verdict === VERDICTS.UNITE_NON_RECONNUE,
);
verifier(
  'et l\'écriture passe APRÈS la valeur : une valeur fausse mal écrite est VALEUR_FAUSSE',
  comparerReponse(
    { valeur: '400000000', unite: 'm/s' },
    { valeur: '300000000', unite: 'm/s', ecriture: { notationScientifique: true } },
  ).verdict === VERDICTS.VALEUR_FAUSSE,
);
verifier(
  'la bonne valeur mal écrite, elle, est ECRITURE_NON_CONFORME — pas « faux »',
  comparerReponse(
    { valeur: '300000000', unite: 'm/s' },
    { valeur: '300000000', unite: 'm/s', ecriture: { notationScientifique: true } },
  ).verdict === VERDICTS.ECRITURE_NON_CONFORME,
);
verifier(
  'et la notation scientifique attendue est acceptée',
  comparerReponse(
    { valeur: '3,0×10⁸', unite: 'm/s' },
    { valeur: '300000000', unite: 'm/s', ecriture: { notationScientifique: true } },
  ).verdict === VERDICTS.JUSTE,
);
verifier('une mantisse à deux chiffres n\'est pas de la notation scientifique',
  verifierEcriture('12×10⁷', { notationScientifique: true })?.code === 'NOTATION_SCIENTIFIQUE_ATTENDUE');
verifier('une mantisse à 0 non plus',
  verifierEcriture('0,3×10⁹', { notationScientifique: true })?.code === 'NOTATION_SCIENTIFIQUE_ATTENDUE');
verifier('decimales: 0 est bien contrôlé, et non ignoré comme une valeur fausse',
  verifierEcriture('2,50', { decimales: 0 })?.code === 'ARRONDI_NON_CONFORME');
verifier('l\'arrondi se compte sur la mantisse, pas sur la chaîne entière',
  verifierEcriture('3,0×10⁸', { decimales: 1 }) === null);

// ════════════════════════════════════════════════════════════════════════════
// 9. Les entrées malformées — un code, jamais une exception
// ════════════════════════════════════════════════════════════════════════════

verifier('chaîne vide', codeDe('') === 'CHAMP_VIDE');
verifier('null', codeDe(null) === 'CHAMP_VIDE');
verifier('undefined', codeDe(undefined) === 'CHAMP_VIDE');
verifier('espaces seules', codeDe('   ') === 'CHAMP_VIDE');
verifier('unité inventée', codeDe('zorglub') === 'SYMBOLE_INCONNU');
verifier('un nombre passé comme unité', codeDe(42) === 'FACTEUR_NUMERIQUE');
verifier('une unité inventée ne lève jamais', sansLever(() => analyserUnite('¿¿¿')).leve === undefined);
verifier('une unité inventée exotique reste un refus lisible', codeDe('¿¿¿') === 'SYMBOLE_INCONNU');
verifier('rationnelDepuisTexte rend null sur du texte, il ne lève pas', rationnelDepuisTexte('je ne sais pas') === null);
verifier('rationnelDepuisTexte rend null sur null', rationnelDepuisTexte(null) === null);
verifier('rationnelDepuisTexte rend null sur une chaîne vide', rationnelDepuisTexte('') === null);

verifier(
  'comparerReponse sans argument rend un verdict, il ne lève pas',
  sansLever(() => comparerReponse()).verdict === VERDICTS.REPONSE_INCOMPLETE,
);
verifier(
  'une unité d\'énoncé hors lexique est un CONTENU_INVALIDE bruyant, pas un échec élève',
  (() => {
    const v = comparerReponse({ valeur: '2,7', unite: 'g/cm³' }, { valeur: '2,7', unite: 'zorglub' });
    return v.verdict === VERDICTS.CONTENU_INVALIDE && v.accepte === null && issueDepuisVerdict(v) === null;
  })(),
);
verifier(
  'une sémantique hors énuméré est refusée, pas repliée sur « exacte »',
  comparerReponse({ valeur: '2,7', unite: 'g/cm³' }, { valeur: '2,7', unite: 'g/cm³', semantique: 'approx' })
    .verdict === VERDICTS.CONTENU_INVALIDE,
);
verifier(
  'une tolérance absente ne se replie pas sur l\'égalité exacte',
  comparerReponse({ valeur: '8,8', unite: 'kg' }, { valeur: '8', unite: 'kg', semantique: 'tolerante' })
    .verdict === VERDICTS.CONTENU_INVALIDE,
);
verifier(
  'une tolérance négative est refusée',
  comparerReponse({ valeur: '8,8', unite: 'kg' }, { valeur: '8', unite: 'kg', semantique: 'tolerante', tolerancePourcent: -1 })
    .verdict === VERDICTS.CONTENU_INVALIDE,
);

// Le contenu fautif a DEUX écritures pour la même faute — un flottant nu et un
// flottant dans la paire [n, d] du langage de calcul. Les deux doivent produire
// le même verdict bruyant. Une exception, ici, interrompt la séance de l'élève
// au lieu de signaler l'énoncé.
verifier(
  'un flottant nu dans la valeur attendue rend CONTENU_INVALIDE',
  comparerReponse({ valeur: '2,7', unite: 'kg' }, { valeur: 2.7, unite: 'kg' }).verdict === VERDICTS.CONTENU_INVALIDE,
);
verifier(
  'un flottant dans la paire [n, d] rend CONTENU_INVALIDE lui aussi — il ne lève pas',
  sansLever(() => comparerReponse({ valeur: '2,7', unite: 'kg' }, { valeur: [2.7, 1], unite: 'kg' }))
    .verdict === VERDICTS.CONTENU_INVALIDE,
);
verifier(
  'un dénominateur nul dans la paire [n, d] rend CONTENU_INVALIDE',
  sansLever(() => comparerReponse({ valeur: '2,7', unite: 'kg' }, { valeur: [1, 0], unite: 'kg' }))
    .verdict === VERDICTS.CONTENU_INVALIDE,
);
verifier(
  'un pseudo-rationnel { n, d } écrit en nombres est refusé au lieu d\'exploser plus loin',
  sansLever(() => comparerReponse({ valeur: '2,7', unite: 'kg' }, { valeur: { n: 1, d: 2 }, unite: 'kg' }))
    .verdict === VERDICTS.CONTENU_INVALIDE,
);
verifier(
  'une tolérance flottante est refusée sans lever',
  sansLever(() => comparerReponse(
    { valeur: '2,7', unite: 'kg' },
    { valeur: '2,7', unite: 'kg', semantique: 'tolerante', tolerancePourcent: [1, 0] },
  )).verdict === VERDICTS.CONTENU_INVALIDE,
);
verifier(
  'un rationnel déjà construit reste accepté — le filtre ne ferme pas la porte qu\'il garde',
  comparerReponse({ valeur: '2,7', unite: 'kg' }, { valeur: rationnel(27, 10), unite: 'kg' }).verdict === VERDICTS.JUSTE,
);
verifier(
  'et une tolérance passée en rationnel construit marche aussi',
  comparerReponse(
    { valeur: '8,8', unite: 'kg' },
    { valeur: '8', unite: 'kg', semantique: 'tolerante', tolerancePourcent: rationnel(10) },
  ).verdict === VERDICTS.JUSTE,
);
verifier(
  'la paire [n, d] correcte, elle, marche toujours',
  comparerReponse({ valeur: '2,7', unite: 'kg' }, { valeur: [27, 10], unite: 'kg' }).verdict === VERDICTS.JUSTE,
);
verifier(
  'et l\'écriture entière d\'un grand nombre passe aussi par la paire',
  comparerReponse({ valeur: '1', unite: 'al' }, { valeur: ['9460730472580800', 1], unite: 'm' }).accepte === true,
);

// ════════════════════════════════════════════════════════════════════════════
// 10. Le contrôle côté auteur — invariant 8
// ════════════════════════════════════════════════════════════════════════════

const codesAuteur = (u) => controlerUniteAuteur(u).map((a) => a.code).join(',');

verifier('une unité du lexique passe', codesAuteur('g/cm³') === '');
verifier('SANS_UNITE passe', codesAuteur(SANS_UNITE) === '');
verifier('un champ unité absent est refusé — c\'est ce qui distingue l\'oubli du refus légitime',
  codesAuteur('') === 'CHAMP_UNITE_ABSENT' && codesAuteur(null) === 'CHAMP_UNITE_ABSENT');
verifier('une unité hors lexique auteur est refusée', codesAuteur('µm') === 'SYMBOLE_INCONNU');
verifier('un facteur numérique est refusé', codesAuteur('g/100 mL') === 'FACTEUR_NUMERIQUE');
verifier('et le message nomme la décision de contenu (la solubilité s\'écrit g/L)',
  controlerUniteAuteur('g/100 mL')[0].message.includes('g/L'));
verifier('une affine composée est refusée', codesAuteur('J/°C') === 'AFFINE_COMPOSEE');
verifier('l\'auteur doit écrire m³ et non m3', controlerUniteAuteur('kg/m3').length === 1);

verifier('un item conforme ne produit aucune anomalie',
  controlerItemAuteur({ reponse: { unite: 'kg/m³' } }, { unite: 'libre' }).length === 0);
verifier('un item sans champ unité est refusé',
  controlerItemAuteur({}, {}).map((a) => a.code).join(',') === 'CHAMP_UNITE_ABSENT');
verifier('unite: imposee sans motif est refusé',
  controlerItemAuteur({ reponse: { unite: 'kg/m³' } }, { unite: 'imposee' })
    .some((a) => a.code === 'MOTIF_UNITE_IMPOSEE_ABSENT'));
verifier('unite: imposee avec motif passe',
  controlerItemAuteur({ reponse: { unite: 'kg/m³' } }, { unite: 'imposee', motifUniteImposee: 'la conversion est le savoir-faire' }).length === 0);
verifier('un motif fait d\'espaces ne compte pas comme un motif',
  controlerItemAuteur({ reponse: { unite: 'kg/m³' } }, { unite: 'imposee', motifUniteImposee: '   ' })
    .some((a) => a.code === 'MOTIF_UNITE_IMPOSEE_ABSENT'));
verifier('une valeur de unite hors énuméré est refusée',
  controlerItemAuteur({ reponse: { unite: 'kg/m³' } }, { unite: 'obligatoire' })
    .some((a) => a.code === 'UNITE_HORS_ENUMERE'));

// ════════════════════════════════════════════════════════════════════════════
// 11. Les issues servies au SRS
// ════════════════════════════════════════════════════════════════════════════
//
// « Une saisie non reconnue ne doit JAMAIS devenir un échec. » C'est la moitié
// de l'invariant 9 et elle se joue ici, pas dans l'analyseur.

verifier('JUSTE → reussite', issueDepuisVerdict({ verdict: VERDICTS.JUSTE }) === 'reussite');
verifier('DIMENSION_FAUSSE → echec', issueDepuisVerdict({ verdict: VERDICTS.DIMENSION_FAUSSE }) === 'echec');
verifier('VALEUR_FAUSSE → echec', issueDepuisVerdict({ verdict: VERDICTS.VALEUR_FAUSSE }) === 'echec');
verifier('ECRITURE_NON_CONFORME → echec', issueDepuisVerdict({ verdict: VERDICTS.ECRITURE_NON_CONFORME }) === 'echec');
verifier('UNITE_NON_RECONNUE → unite-non-reconnue, jamais echec',
  issueDepuisVerdict({ verdict: VERDICTS.UNITE_NON_RECONNUE }) === 'unite-non-reconnue');
verifier('REPONSE_INCOMPLETE → rien à comptabiliser',
  issueDepuisVerdict({ verdict: VERDICTS.REPONSE_INCOMPLETE }) === null);
verifier('CONTENU_INVALIDE → rien à comptabiliser',
  issueDepuisVerdict({ verdict: VERDICTS.CONTENU_INVALIDE }) === null);
verifier('toute issue produite appartient à l\'énuméré de la charte',
  Object.values(VERDICTS)
    .map((v) => issueDepuisVerdict({ verdict: v, accepte: true }))
    .every((i) => i === null || ['reussite', 'echec', 'reussite-sans-justification', 'unite-non-reconnue'].includes(i)));

verifier('memeDimension ne se laisse pas prendre par un facteur différent',
  memeDimension(unite('g/cm³'), unite('kg/m³')) && !memeUnite(unite('g/cm³'), unite('kg/m³')));

// ── Rapport ─────────────────────────────────────────────────────────────────

console.log(`${passes} test(s) passé(s).`);
for (const e of echecs) console.log(`  ✗ ${e}`);
if (echecs.length) {
  console.log(`\n${echecs.length} échec(s).`);
  process.exit(1);
}
