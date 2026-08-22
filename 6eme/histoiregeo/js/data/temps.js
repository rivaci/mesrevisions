// Contenu d'histoire, repris de la fiche de révision en vue de la 5ᵉ.
//
// La fiche demande deux choses : les grandes périodes et leur place sur une
// frise, et l'écriture des chiffres romains. Elle les donne sous forme d'images,
// que le texte du PDF ne contient pas — ce fichier reprend donc le découpage
// scolaire usuel. À confronter au cahier avant l'évaluation.
//
// Ce fichier ne contient que des faits : aucune logique d'application.

/**
 * Les cinq grandes périodes.
 *
 * `ordre` sert à la frise, `debut` à l'affichage. Les bornes sont des
 * ÉVÉNEMENTS, pas des dates rondes : c'est ce qui les rend mémorisables, et
 * c'est la forme sous laquelle une évaluation les demande.
 */
export const PERIODES = [
  {
    id: 'prehistoire',
    ordre: 1,
    nom: 'La Préhistoire',
    debut: "de l'apparition de l'homme à environ 3300 av. J.-C.",
    borne: "l'invention de l'écriture",
    duree: 'de très loin la plus longue : des millions d\'années',
    note: "Elle se termine avec l'invention de l'ÉCRITURE, en Mésopotamie. C'est justement pour ça qu'on l'appelle préhistoire : avant, aucun texte ne nous renseigne.",
  },
  {
    id: 'antiquite',
    ordre: 2,
    nom: "L'Antiquité",
    debut: 'de 3300 av. J.-C. à 476',
    borne: "la chute de l'Empire romain d'Occident",
    duree: 'près de 4000 ans',
    note: "C'est la période de la 6ᵉ : l'Orient ancien, la Grèce, Rome, les débuts du judaïsme et du christianisme.",
  },
  {
    id: 'moyen-age',
    ordre: 3,
    nom: 'Le Moyen Âge',
    debut: 'de 476 à 1492',
    borne: "la découverte de l'Amérique par Christophe Colomb",
    duree: 'environ 1000 ans',
    note: "Mille ans, ce n'est pas une parenthèse : c'est la période la plus longue après la Préhistoire.",
  },
  {
    id: 'temps-modernes',
    ordre: 4,
    nom: 'Les Temps modernes',
    debut: 'de 1492 à 1789',
    borne: 'la Révolution française',
    duree: 'environ 300 ans',
    note: 'Les grandes découvertes, la Renaissance, les monarchies absolues.',
  },
  {
    id: 'epoque-contemporaine',
    ordre: 5,
    nom: "L'Époque contemporaine",
    debut: "de 1789 à aujourd'hui",
    borne: "elle n'est pas terminée",
    duree: 'un peu plus de 200 ans',
    note: "La seule période encore ouverte : nous sommes dedans.",
  },
];

/** Les sept symboles. Il n'y en a pas d'autres — tout le reste se compose. */
export const SYMBOLES_ROMAINS = [
  { id: 'I', signe: 'I', valeur: 1 },
  { id: 'V', signe: 'V', valeur: 5 },
  { id: 'X', signe: 'X', valeur: 10 },
  { id: 'L', signe: 'L', valeur: 50 },
  { id: 'C', signe: 'C', valeur: 100 },
  { id: 'D', signe: 'D', valeur: 500 },
  { id: 'M', signe: 'M', valeur: 1000 },
];

/**
 * Les deux règles, et rien d'autre : tout chiffre romain s'en déduit.
 * Elles sont interrogées comme des connaissances, parce qu'un élève qui les
 * récite sait relire n'importe quel nombre sans l'avoir appris par cœur.
 */
export const REGLES_ROMAINES = [
  {
    id: 'addition',
    question: 'Que vaut un symbole placé APRÈS un plus grand que lui ?',
    reponse: 'Il s\'ajoute',
    note: 'VI = 5 + 1 = 6. XII = 10 + 1 + 1 = 12. On lit de gauche à droite en additionnant.',
  },
  {
    id: 'soustraction',
    question: 'Que vaut un symbole placé AVANT un plus grand que lui ?',
    reponse: 'Il se retranche',
    note: "IV = 5 − 1 = 4. IX = 10 − 1 = 9. XL = 50 − 10 = 40. C'est la règle qui piège : IV vaut 4, pas 6.",
  },
  {
    id: 'repetition',
    question: 'Combien de fois peut-on répéter le même symbole à la suite ?',
    reponse: 'Trois fois au maximum',
    note: "III = 3, mais 4 ne s'écrit pas IIII : on passe à IV. Même chose pour XXX, CCC.",
  },
  {
    id: 'jamais-repetes',
    question: 'Quels symboles ne se répètent jamais ?',
    reponse: 'V, L et D',
    note: 'VV n\'existe pas : deux fois 5 font 10, donc X. Idem pour LL (→ C) et DD (→ M).',
  },
];

/**
 * Nombres à lire et à écrire. Choisis pour couvrir chaque difficulté une fois :
 * la soustraction, la répétition, les centaines, les milliers.
 */
export const NOMBRES_ROMAINS = [
  { id: 'r4', romain: 'IV', arabe: 4, note: 'Le I devant le V se retranche : 5 − 1.' },
  { id: 'r9', romain: 'IX', arabe: 9, note: 'Le I devant le X se retranche : 10 − 1.' },
  { id: 'r12', romain: 'XII', arabe: 12, note: '10 + 1 + 1. Les symboles plus petits placés après s\'ajoutent.' },
  { id: 'r14', romain: 'XIV', arabe: 14, note: '10, puis IV = 4. Attention : ce n\'est pas XIIII.' },
  { id: 'r19', romain: 'XIX', arabe: 19, note: '10 + IX. Découper aide : X | IX.' },
  { id: 'r40', romain: 'XL', arabe: 40, note: 'X devant L : 50 − 10.' },
  { id: 'r49', romain: 'XLIX', arabe: 49, note: 'XL = 40, puis IX = 9. Deux soustractions dans le même nombre.' },
  { id: 'r90', romain: 'XC', arabe: 90, note: 'X devant C : 100 − 10.' },
  { id: 'r400', romain: 'CD', arabe: 400, note: 'C devant D : 500 − 100.' },
  { id: 'r1515', romain: 'MDXV', arabe: 1515, note: 'M = 1000, D = 500, XV = 15. La bataille de Marignan.' },
  { id: 'r1789', romain: 'MDCCLXXXIX', arabe: 1789, note: '1000 + 500 + 200 + 50 + 30 + 9. La Révolution française.' },
  { id: 'r2026', romain: 'MMXXVI', arabe: 2026, note: '1000 + 1000 + 10 + 10 + 5 + 1.' },
];

/**
 * Le siècle d'une date. C'est l'usage le plus fréquent des chiffres romains en
 * histoire, et le décalage de un est le piège classique : 1515 est au XVIᵉ,
 * pas au XVᵉ.
 */
export const SIECLES = [
  { id: 's-476', annee: '476', siecle: 'Ve siècle', note: '476 est dans les années 400 : c\'est le Ve siècle. On ajoute 1 à la centaine.' },
  { id: 's-1000', annee: '1000', siecle: 'Xe siècle', note: "L'année 1000 termine le Xe siècle — un siècle va de 901 à 1000." },
  { id: 's-1492', annee: '1492', siecle: 'XVe siècle', note: '1492 est dans les années 1400 : XVe siècle.' },
  { id: 's-1515', annee: '1515', siecle: 'XVIe siècle', note: 'Le piège classique : 1515 est au XVIe, pas au XVe.' },
  { id: 's-1789', annee: '1789', siecle: 'XVIIIe siècle', note: '1789 est dans les années 1700 : XVIIIe siècle.' },
  { id: 's-1914', annee: '1914', siecle: 'XXe siècle', note: '1914 est dans les années 1900 : XXe siècle.' },
  { id: 's-2026', annee: '2026', siecle: 'XXIe siècle', note: 'Nous sommes au XXIe siècle depuis 2001.' },
];

/**
 * Avant et après Jésus-Christ. La numérotation à rebours n'est pas intuitive :
 * plus le nombre est grand, plus c'est ancien.
 */
export const AVANT_APRES = [
  {
    id: 'sens',
    question: 'Avant Jésus-Christ, comment les années se comptent-elles ?',
    reponse: "À rebours : plus le nombre est grand, plus c'est ancien",
    note: 'Avant J.-C., les années se comptent à rebours : plus le nombre est GRAND, plus c\'est ancien.',
  },
  {
    id: 'ecart',
    question: 'Combien de temps sépare 50 av. J.-C. de 50 apr. J.-C. ?',
    reponse: '100 ans',
    note: "On additionne de part et d'autre de l'an 1. Il n'y a pas d'année zéro.",
  },
  {
    id: 'siecle-avant',
    question: 'À quel siècle appartient 490 av. J.-C. ?',
    reponse: 'Ve siècle av. J.-C.',
    note: 'Même méthode qu\'après J.-C. : les années 400 font le Ve siècle. Marathon, 490 av. J.-C.',
  },
  {
    id: 'annee-zero',
    question: "Quelle année vient juste après l'an 1 av. J.-C. ?",
    reponse: "L'an 1 apr. J.-C.",
    note: "Il n'existe pas d'année zéro : on passe directement de −1 à +1.",
  },
  {
    id: 'millenaire',
    question: 'Combien de siècles compte un millénaire ?',
    reponse: 'Dix',
    note: 'Un millénaire vaut 1000 ans, donc dix siècles de 100 ans.',
  },
];
