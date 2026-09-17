// Tests du moteur de vérification, hors navigateur.
//
//     node tools/tester-moteur.mjs
//
// Le contrôle de contenu repose entièrement sur `discrimine`. Un contrôle qui
// passerait toujours ne prouverait rien : ces tests vérifient qu'il REFUSE ce
// qu'il doit refuser — en particulier les valeurs qui mentent, celles pour
// lesquelles deux écritures différentes donnent le même nombre.
//
// C'est le pendant du « la réponse était : undefined » de l'appli de français :
// une erreur enfouie dans du code à DOM n'est atteignable que par le bon clic
// sur le bon exercice ; sortie ici, elle devient une assertion.

import { contreExemple, discrimine, estExact, evaluer } from '../js/verification.js';
import { enProse } from '../js/prose-latex.js';

let passes = 0;
const echecs = [];

const verifier = (nom, condition) => {
  if (condition) passes += 1;
  else echecs.push(nom);
};

// ── Les valeurs qui mentent ─────────────────────────────────────────────────

const carre = (a) => a * a;
const double = (a) => 2 * a;

verifier(
  'a = 2 est refusé pour a² contre 2a (les deux valent 4 — le contre-exemple confirmerait l\'erreur)',
  !discrimine(2, carre, double),
);
verifier('a = 0 est refusé pour a² contre 2a', !discrimine(0, carre, double));
verifier('a = 3 est accepté pour a² contre 2a (9 contre 6)', discrimine(3, carre, double));

const identite = (x) => x;
verifier('x = 1 est refusé pour x² contre x', !discrimine(1, carre, identite));
verifier('x = 5 est accepté pour x² contre x', discrimine(5, carre, identite));

verifier(
  'x = -1 est refusé même quand il discriminerait (interdit par la charte)',
  !discrimine(-1, (x) => x * x * x, identite),
);

// ── Le cadre exact ──────────────────────────────────────────────────────────

verifier('un entier est exact', estExact(7));
verifier('un flottant ne l\'est pas', !estExact(0.30000000000000004));
verifier('une division non entière est rejetée', evaluer((x) => x / 2, 3) === null);
verifier('une division entière passe', evaluer((x) => x / 2, 4) === 2);
verifier('une expression non finie est rejetée', evaluer((x) => x / 0, 1) === null);

// ── Le contre-exemple servi à l'élève ───────────────────────────────────────

const ce = contreExemple(
  { texte: '5x', evaluer: (x) => 5 * x },
  { texte: '3x + 2', evaluer: (x) => 3 * x + 2 },
  3,
);
verifier('le contre-exemple calcule la valeur de CE que l\'élève a écrit', ce?.sien === 15);
verifier('le contre-exemple calcule la valeur de ce qui était juste', ce?.juste === 11);
verifier('le contre-exemple garde les deux écritures pour l\'affichage', ce?.texteSien === '5x');

verifier(
  'aucun contre-exemple n\'est produit quand les deux valeurs coïncident',
  contreExemple({ texte: 'a²', evaluer: carre }, { texte: '2a', evaluer: double }, 2) === null,
);

// ── Les enveloppes des deux fournisseurs ────────────────────────────────────
//
// `construireRequete` est pure pour cette raison : les deux enveloppes ne se
// ressemblent pas assez pour qu'une relecture suffise, et une erreur donne un
// HTTP 400 au premier exercice, pas un champ ignoré.

const { construireRequete } = await import('../../../commun/merlin.js');

const args = {
  cle: 'cle-test', modele: 'modele-test',
  consignes: 'CONSIGNES', profil: 'PROFIL', message: 'MESSAGE',
  schema: { type: 'object', properties: {}, required: [], additionalProperties: false },
  nomSchema: 'test', appli: 'maths5e',
};

const a = construireRequete({ ...args, fournisseur: 'anthropic' });
verifier('Anthropic — bonne URL', a.url === 'https://api.anthropic.com/v1/messages');
verifier("Anthropic — l'en-tête d'accès navigateur est présent (sans lui, pas de CORS)",
  a.entetes['anthropic-dangerous-direct-browser-access'] === 'true');
verifier('Anthropic — la clé va dans x-api-key', a.entetes['x-api-key'] === 'cle-test');
verifier('Anthropic — le plafond s\'appelle max_tokens', typeof a.corps.max_tokens === 'number');
verifier('Anthropic — pas de max_output_tokens', a.corps.max_output_tokens === undefined);
verifier('Anthropic — les consignes viennent AVANT le profil (ordre du cache)',
  a.corps.system[0].text === 'CONSIGNES' && a.corps.system[1].text === 'PROFIL');
verifier('Anthropic — les deux blocs système sont marqués pour le cache',
  a.corps.system.every((b) => b.cache_control?.type === 'ephemeral'));
verifier('Anthropic — le schéma n\'a pas de name ni de strict (refusés ici)',
  a.corps.output_config.format.schema.name === undefined);

const o = construireRequete({ ...args, fournisseur: 'openai' });
verifier('OpenAI — bonne URL', o.url === 'https://api.openai.com/v1/responses');
verifier('OpenAI — la clé va dans authorization', o.entetes.authorization === 'Bearer cle-test');
verifier('OpenAI — le plafond s\'appelle max_output_tokens', typeof o.corps.max_output_tokens === 'number');
verifier('OpenAI — pas de max_tokens', o.corps.max_tokens === undefined);
verifier('OpenAI — le travail de l\'enfant n\'est pas conservé côté fournisseur', o.corps.store === false);
verifier('OpenAI — name et strict sont obligatoires ici',
  o.corps.text.format.name === 'test' && o.corps.text.format.strict === true);
verifier('OpenAI — consignes puis profil dans instructions (ordre du cache)',
  o.corps.instructions.indexOf('CONSIGNES') < o.corps.instructions.indexOf('PROFIL'));

// ── Lire une expression tapée par l'élève ───────────────────────────────────
//
// C'est le moteur du chapitre 7 : c'est lui qui décide si « 2x+10 » répond à
// « développe 2(x + 5) ». Une erreur ici compterait juste une réponse fausse,
// ou l'inverse — les deux sont graves, d'où le nombre de cas.

const { equivalentes, estUnePhrase, versFonction } = await import('../js/verification.js');

const equiv = (a, b) => equivalentes(a, b);

verifier('2x+10 répond à 2(x+5)', equiv('2x+10', '2(x+5)') === true);
verifier("l'ordre des termes est libre : 10+2x aussi", equiv('10+2x', '2(x+5)') === true);
verifier('les espaces sont tolérés', equiv('2x + 10', '2(x+5)') === true);
verifier('la forme non développée est acceptée si elle est équivalente', equiv('2(x+5)', '2x+10') === true);
verifier('2x+5 est refusé (distributivité incomplète)', equiv('2x+5', '2(x+5)') === false);
verifier('7x est refusé pour 3x+4', equiv('7x', '3x+4') === false);

verifier('les puissances : x^2 se lit', equiv('x^2', 'x*x') === true);
verifier('les accolades LaTeX aussi : x^{2}', equiv('x^{2}', 'x*x') === true);
verifier('x² et 2x ne sont pas confondus', equiv('x^2', '2x') === false);
verifier('15x^2 répond à 3x fois 5x', equiv('15x^2', '3x*5x') === true);

verifier('le moins devant la parenthèse : -x+3', equiv('-x+3', '-(x-3)') === true);
verifier('-x-3 est refusé pour -(x-3)', equiv('-x-3', '-(x-3)') === false);
verifier('le signe moins typographique est accepté', equiv('−x+3', '-(x-3)') === true);
verifier('la virgule décimale française est acceptée', equiv('0,5x', 'x/2') === true);

verifier('une saisie vide est illisible, pas fausse', equiv('', '2x') === null);
verifier('du texte est illisible, pas faux', equiv('je ne sais pas', '2x') === null);
verifier('une lettre étrangère est refusée', versFonction('2y+1') === null);
verifier('une expression déséquilibrée est refusée', versFonction('2(x+3') === null);

verifier('la multiplication implicite après parenthèse : (x+1)(x+2)',
  equiv('(x+1)(x+2)', 'x^2+3x+2') === true);
verifier('le facteur commun : x(3+2x) répond à 3x+2x^2',
  equiv('x(3+2x)', '3x+2x^2') === true);

// ── Le séparateur des lignes d'activité ─────────────────────────────────────
//
// Une ligne de découverte relie deux choses. Si ce sont deux calculs, « = » ;
// sinon une flèche. Se tromper de sens affiche à l'élève une égalité fausse
// comme « A(1 ; 3) = A'(6 ; 1) » — un modèle qu'il recopiera.
const BS = String.fromCharCode(92);

verifier('un calcul pur autorise le « = »', estUnePhrase('3 ' + BS + 'times (-4)') === false);
verifier('un nombre aussi', estUnePhrase('-12') === false);
verifier('zéro aussi', estUnePhrase('0') === false);
verifier('une commande LaTeX seule ne compte pas comme une lettre',
  estUnePhrase(BS + 'dfrac{2}{3}') === false);
verifier('un nom de point écarte le « = », même sans mot',
  estUnePhrase('A(1 ; 3)') === true);
verifier('une phrase aussi', estUnePhrase("côtés de l'angle droit 3 et 4") === true);
verifier('une expression littérale aussi', estUnePhrase('a + a') === true);

// ── Le repère du chapitre 14 ────────────────────────────────────────────────
//
// Un point placé hors du cadre n'est pas tracé, et RIEN ne le signale à
// l'écran. L'élève cherche alors une valeur qui n'existe nulle part sur le
// dessin — une panne muette, exactement le genre que ces tests existent pour
// rendre bruyante.

const { graphique, pointsHorsCadre } = await import('../js/graphique.js');

const REPERE = {
  x: { titre: 'Séances', min: 0, max: 10, pas: 1 },
  y: { titre: 'Prix', min: 0, max: 40, pas: 5 },
  points: [[0, 15], [10, 35]],
  reperes: [[4, 23]],
};

const svg = graphique(REPERE);
verifier('le tracé relie les points dans l\'ordre donné', svg.includes('52,178.5 462,48.5'));
verifier('les graduations de l\'axe vertical sont écrites', svg.includes('>40<') && svg.includes('>5<'));
verifier('un graphique absent ne produit rien', graphique(undefined) === '');
verifier('un graphique sans axes ne produit rien', graphique({ points: [[1, 1]] }) === '');

verifier('un repère correct ne signale aucun point hors cadre', pointsHorsCadre(REPERE).length === 0);
verifier('une ordonnée trop grande est signalée',
  pointsHorsCadre({ ...REPERE, points: [[0, 15], [10, 50]] }).length === 1);
verifier('une abscisse négative est signalée',
  pointsHorsCadre({ ...REPERE, points: [[-1, 15]] }).length === 1);
verifier('un REPÈRE hors cadre est signalé lui aussi',
  pointsHorsCadre({ ...REPERE, reperes: [[4, 99]] }).length === 1);

// Au-delà de onze étiquettes elles se chevauchent : on en saute, mais on garde
// toutes les lignes de la grille. Sans ce garde-fou, un axe de 0 à 100 de 1 en
// 1 rendrait une bouillie de chiffres — donc un graphique illisible.
const dense = graphique({
  x: { titre: 'x', min: 0, max: 100, pas: 1 }, y: { titre: 'y', min: 0, max: 10, pas: 5 },
  points: [[0, 0], [100, 10]],
});
const etiquettes = (dense.match(/class="g-nombre"/g) ?? []).length;
verifier(`un axe très gradué n'écrit pas tout (${etiquettes} étiquettes)`, etiquettes < 30);
verifier('mais la grille reste complète',
  (dense.match(/class="g-grille"/g) ?? []).length > 100);

// Les pas décimaux : une somme répétée dériverait (0,1 + 0,1 + 0,1 ≠ 0,3) et
// écrirait « 0,30000000000000004 » sous l'axe.
const decimal = graphique({
  x: { titre: 'x', min: 0, max: 1, pas: 0.1 }, y: { titre: 'y', min: 0, max: 2, pas: 1 },
  points: [[0, 0], [1, 2]],
});
verifier('un pas décimal ne dérive pas', !decimal.includes('0000000'));
verifier('et s\'écrit avec une virgule', decimal.includes('>0,3<'));

// ── Le LaTeX de prose ───────────────────────────────────────────────────────
//
// Ces assertions existent parce que le défaut qu'elles couvrent est parti en
// ligne : 24 items chez Anto et 27 chez Evan affichaient « 2{,}5 h » au lieu
// de « 2,5 h ». Rien ne le signalait — ni le vérificateur de contenu, ni les
// 69 tests, ni la relecture. Il a fallu ouvrir la page sur le bon exercice.
//
// La règle du contenu est d'écrire les décimaux « 2{,}5 » : les accolades
// collent la virgule aux chiffres en LaTeX. Dès qu'un énoncé contient aussi
// du \text{}, il bascule sur le rendu en prose, qui doit donc les retirer.

verifier('« 2{,}5 » devient « 2,5 » en prose', enProse(String.raw`2{,}5`) === '2,5');
verifier(
  'un décimal mêlé à du \\text{} sort correctement',
  enProse(String.raw`3{,}5 \text{ h}`) === '3,5 h',
);
verifier(
  'et il ne reste aucune accolade dans un énoncé complet',
  !enProse(String.raw`AB = 5{,}4 \text{ cm} \qquad DC = \square \text{ cm}`).includes('{'),
);
verifier(
  'les commandes porteuses de sens survivent à la conversion',
  enProse(String.raw`2 \times 3 \div 4 \approx 1{,}5 \text{ environ}`) === '2 × 3 ÷ 4 ≈ 1,5 environ',
);
verifier(
  'une commande inconnue disparaît sans laisser son antislash',
  !enProse(String.raw`\overline{AB} \text{ mesure } 2{,}5`).includes('\\'),
);

// Les trois familles qui étaient effacées en silence. Chacune est ici parce
// qu'elle a été trouvée en ligne, pas parce qu'on l'a imaginée.

verifier(
  'la flèche de correspondance survit (elle portait le sens)',
  enProse(String.raw`7 \text{ kg} \rightarrow 15{,}40 \text{ euros}`) === '7 kg → 15,40 euros',
);
verifier(
  'les trois écritures de la flèche donnent le même caractère',
  [String.raw`\to`, String.raw`\rightarrow`, String.raw`\longrightarrow`]
    .every((f) => enProse(`\\text{a} ${f} \\text{b}`) === 'a → b'),
);
verifier(
  'le degré ne laisse pas un accent orphelin',
  enProse(String.raw`\text{angle } 108^\circ`) === 'angle 108°',
);
verifier(
  'les exposants deviennent de vrais exposants',
  enProse(String.raw`\text{aire } 25 \text{ cm}^2 \text{ volume } 8 \text{ cm}^{3}`)
    === 'aire 25 cm² volume 8 cm³',
);
verifier(
  'un exposant négatif aussi',
  enProse(String.raw`450 \text{ nm} = 45 \times 10^{-8} \text{ m}`) === '450 nm = 45 × 10⁻⁸ m',
);
verifier(
  'un exposant qui n\'est pas un nombre perd ses accolades, pas son sens',
  enProse(String.raw`1 \text{ km} = 10^{\square} \text{ m}`) === '1 km = 10^□ m',
);
verifier(
  'le pourcentage échappé perd son antislash',
  enProse(String.raw`25\% \text{ de } 180`) === '25% de 180',
);

// ── Rapport ─────────────────────────────────────────────────────────────────



// ── Les figures d'angles ────────────────────────────────────────────────────
//
// La numérotation est la seule chose que les exercices citent : « les angles
// 3 et 5 ». Une erreur de numérotation ferait mentir TOUS les exercices du
// chapitre d'un coup, d'où la vérification de chaque paire classique.

const { figure, natureDePaire, mesureDessinee, erreursFigure, parallelesDessinees } = await import('../js/figure.js');

for (const [a, b] of [[3, 5], [4, 6]]) {
  verifier(`les angles ${a} et ${b} sont alternes-internes`, natureDePaire(a, b) === 'alternes-internes'
    && natureDePaire(b, a) === 'alternes-internes');
}
for (const [a, b] of [[1, 5], [2, 6], [3, 7], [4, 8]]) {
  verifier(`les angles ${a} et ${b} sont correspondants`, natureDePaire(a, b) === 'correspondants');
}
for (const [a, b] of [[1, 3], [2, 4], [5, 7], [6, 8]]) {
  verifier(`les angles ${a} et ${b} sont opposés par le sommet`, natureDePaire(a, b) === 'opposés par le sommet');
}
for (const [a, b] of [[1, 2], [2, 3], [3, 4], [4, 1], [5, 6]]) {
  verifier(`les angles ${a} et ${b} sont adjacents`, natureDePaire(a, b) === 'adjacents');
}
verifier('les angles 1 et 7 sont alternes-externes, pas alternes-internes', natureDePaire(1, 7) === 'alternes-externes');
verifier('les angles 3 et 6 ne forment aucune des paires du cours', natureDePaire(3, 6) === 'aucune');
verifier('les angles 2 et 5 ne forment aucune des paires du cours', natureDePaire(2, 5) === 'aucune');

const paralleles = { modele: 'secante', angle: 65 };
verifier('droites parallèles : les alternes-internes 3 et 5 ont la même mesure',
  mesureDessinee(paralleles, 3) === mesureDessinee(paralleles, 5));
verifier('droites parallèles : les correspondants 2 et 6 ont la même mesure',
  mesureDessinee(paralleles, 2) === mesureDessinee(paralleles, 6));
verifier('deux angles adjacents sur une droite font 180°',
  mesureDessinee(paralleles, 1) + mesureDessinee(paralleles, 2) === 180);
verifier('l\'angle 2 mesure bien l\'angle demandé', mesureDessinee(paralleles, 2) === 65);
verifier('sans angleB, les droites sont dessinées parallèles', parallelesDessinees(paralleles));

const secantes = { modele: 'secante', angle: 65, angleB: 50 };
verifier('droites non parallèles : les alternes-internes 4 et 6 diffèrent',
  mesureDessinee(secantes, 4) !== mesureDessinee(secantes, 6));
verifier('avec un angleB différent, les droites ne sont pas parallèles', !parallelesDessinees(secantes));

const svgFigure = figure({ modele: 'secante', angle: 65, surligner: { 3: 'a', 5: 'a' }, mesures: { 2: '65°' } });
verifier('la figure est un SVG', svgFigure.includes("<svg") && svgFigure.includes("</svg>"));
verifier('la figure porte les numéros 1, 3 à 8 et la mesure de l\'angle 2',
  [1, 3, 4, 5, 6, 7, 8].every((n) => svgFigure.includes(`>${n}</text>`)) && svgFigure.includes('>65°</text>'));
verifier('deux angles surlignés donnent deux arcs colorés', (svgFigure.match(/f-arc--a/g) ?? []).length === 2);
verifier('une figure est décrite pour les lecteurs d\'écran', /aria-label="Deux droites/.test(svgFigure));
verifier('un croisement n\'a que quatre angles',
  !figure({ modele: 'croisement', angle: 70 }).includes('>5</text>'));
verifier('sans figure, rien n\'est tracé', figure(undefined) === '' && figure({ modele: 'inconnu' }) === '');

verifier('un angle hors de la figure est refusé', erreursFigure({ modele: 'croisement', angle: 70, surligner: { 6: 'a' } }).length === 1);
verifier('un angle trop plat est refusé', erreursFigure({ modele: 'secante', angle: 175 }).length === 1);
verifier('une figure correcte ne signale rien', erreursFigure({ modele: 'secante', angle: 65, angleB: 70, mesures: { 3: '115°' } }).length === 0);

// ── Les figures du plan ─────────────────────────────────────────────────────

const plan = await import('../js/figures-plan.js');

const droiteG = { modele: 'droite', min: -4, max: 3, pas: 1, points: { A: -2.5, B: 1, C: -4 } };
verifier('droite graduée : l\'abscisse d\'un point se lit', plan.abscisse(droiteG, 'A') === -2.5);
verifier('droite graduée : on retrouve la lettre d\'une abscisse', plan.lettresAbscisse(droiteG, 1).join() === 'B');
verifier('droite graduée correcte : aucun défaut', erreursFigure(droiteG).length === 0);
verifier('droite graduée : un point entre deux demi-graduations est refusé',
  erreursFigure({ modele: 'droite', min: -2, max: 2, points: { A: 0.3 } }).length === 1);
verifier('droite graduée : un point hors de la droite est refusé',
  erreursFigure({ modele: 'droite', min: -2, max: 2, points: { A: 5 } }).length === 1);
verifier('droite graduée : deux points trop proches sont refusés',
  erreursFigure({ modele: 'droite', min: -10, max: 10, points: { A: 1, B: 1.5 } }).length === 1);
const svgDroite = figure(droiteG);
verifier('droite graduée : seuls 0 et 1 sont écrits par défaut',
  svgDroite.includes('>0</text>') && svgDroite.includes('>1</text>') && !svgDroite.includes('>−2</text>'));
verifier('droite graduée : les lettres des points sont posées', ['A', 'B', 'C'].every((l) => svgDroite.includes(`>${l}</text>`)));

const repere = { modele: 'repere', xmin: -5, xmax: 5, ymin: -4, ymax: 4, points: { A: [2, 3], B: [-2, -3], O: [0, 0], C: [4, -1] } };
verifier('repère : les coordonnées d\'un point se lisent', plan.coordonnees(repere, 'C').join() === '4,-1');
verifier('repère : on retrouve la lettre à des coordonnées', plan.lettresAux(repere, [-2, -3]).join() === 'B');
verifier('repère : le symétrique de A par rapport à O est B', plan.symetriqueCentral(repere, 'A', 'O').join() === '-2,-3');
verifier('repère : le milieu de [AC] est (3 ; 1)', plan.milieu(repere, 'A', 'C').join() === '3,1');
verifier('repère : le symétrique de C par rapport à l\'axe des ordonnées', plan.symetriqueAxial(repere, 'C', { x: 0 }).join() === '-4,-1');
verifier('repère correct : aucun défaut', erreursFigure(repere).length === 0);
verifier('repère : deux points au même endroit sont refusés',
  erreursFigure({ modele: 'repere', points: { A: [1, 1], B: [1, 1] } }).length === 1);
verifier('repère : un point hors du cadre est refusé',
  erreursFigure({ modele: 'repere', points: { A: [9, 1] } }).length === 1);
verifier('repère : l\'origine est marquée O', figure(repere).includes('>O</text>'));

// Un axe de symétrie (d), vertical ou horizontal, tracé sur le repère.
const avecAxe = { modele: 'repere', points: { A: [-2, -1], B: [4, -1], M: [1, 3] }, segments: [['A', 'B']], axe: { x: 1 } };
verifier('repère avec axe : aucun défaut', erreursFigure(avecAxe).length === 0);
verifier('repère avec axe : la droite (d) est tracée et nommée',
  figure(avecAxe).includes('f-axe-symetrie') && figure(avecAxe).includes('>(d)</text>'));
verifier('repère avec axe : un axe à la fois vertical et horizontal est refusé',
  erreursFigure({ ...avecAxe, axe: { x: 1, y: 2 } }).length === 1);
verifier('repère avec axe : un axe hors du cadre est refusé',
  erreursFigure({ ...avecAxe, axe: { y: 7 } }).length === 1);
verifier('repère avec axe : un axe hors du quadrillage est refusé',
  erreursFigure({ ...avecAxe, axe: { x: 0.3 } }).length === 1);
verifier('repère avec axe : (d) est la médiatrice de [AB]', plan.estMediatrice(avecAxe, 'A', 'B') === true);
verifier('repère avec axe : (d) décalée n\'est plus la médiatrice',
  plan.estMediatrice({ ...avecAxe, axe: { x: 0 } }, 'A', 'B') === false);
verifier('repère avec axe : passer par le milieu ne suffit pas, il faut être perpendiculaire',
  plan.estMediatrice({ modele: 'repere', points: { A: [-2, -1], B: [2, 3] }, axe: { x: 0 } }, 'A', 'B') === false);
verifier('repère avec axe : médiatrice horizontale d\'un segment vertical',
  plan.estMediatrice({ modele: 'repere', points: { A: [1, -3], B: [1, 1] }, axe: { y: -1 } }, 'A', 'B') === true);
verifier('repère avec axe : sans axe tracé, il n\'y a pas de médiatrice',
  plan.estMediatrice(repere, 'A', 'B') === false);
verifier('repère avec axe : le symétrique de M par rapport à (d) est lui-même', plan.symetriqueAxial(avecAxe, 'M', avecAxe.axe).join() === '1,3');
verifier('droite graduée : le milieu de [AB] se calcule', plan.milieu(droiteG, 'A', 'B') === -0.75);

const tri = { modele: 'triangle', sommets: ['A', 'B', 'C'], angles: { B: 50, C: 60 }, etiquettes: { B: '50°', C: '60°', A: '?' } };
verifier('triangle : l\'angle du haut se déduit (180 − 50 − 60)', plan.angleSommet(tri, 'A') === 70);
verifier('triangle correct : aucun défaut', erreursFigure(tri).length === 0);
verifier('triangle : une étiquette qui ment est refusée',
  erreursFigure({ ...tri, etiquettes: { A: '80°' } }).length === 1);
verifier('triangle : des angles impossibles sont refusés',
  erreursFigure({ modele: 'triangle', sommets: ['A', 'B', 'C'], angles: { B: 100, C: 90 } }).length >= 1);
verifier('triangle : une hauteur sur un angle de base obtus est refusée',
  erreursFigure({ modele: 'triangle', sommets: ['A', 'B', 'C'], angles: { B: 100, C: 30 }, droite: 'hauteur' }).length === 1);
for (const [droite, nom] of [['hauteur', 'une hauteur'], ['mediane', 'une médiane'], ['mediatrice', 'une médiatrice'], ['bissectrice', 'une bissectrice']]) {
  const f = { ...tri, droite };
  verifier(`triangle : ${nom} est tracée et nommée`, plan.natureDroite(f) === nom && figure(f).includes('f-remarquable'));
  verifier(`triangle : la description ne trahit pas ${nom}`, !figure(f).includes(`aria-label="${nom}`) && !figure(f).includes(nom));
}

console.log(`${passes} test(s) passé(s).`);
for (const e of echecs) console.log(`  ✗ ${e}`);
if (echecs.length) {
  console.log(`\n${echecs.length} échec(s).`);
  process.exit(1);
}
