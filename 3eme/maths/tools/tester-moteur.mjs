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
  nomSchema: 'test', appli: 'maths3e',
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

// ── Les figures du chapitre Thalès ──────────────────────────────────────────
//
// La figure est construite à partir des longueurs de l'exercice : c'est elle
// que le contrôle de contenu interroge pour refuser une réponse qui la
// contredit. Il faut donc d'abord qu'elle calcule juste.

const fig = await import('../js/figure.js');
const proche = (a, b) => Math.abs(a - b) < 1e-6;

// L'exemple du cours d'Evan : (JL) et (IM) sécantes en K, (IJ) // (LM).
const evan = {
  modele: 'thales', sommet: 'K', d1: { I: 2, M: 5 }, d2: { J: 1.6, L: 4 }, base: ['IJ', 3],
  cotes: { KI: '2', KM: '5', KL: '4', IJ: '3', KJ: '?', LM: '?' },
};
verifier('Thalès : la figure du cours d\'Evan est sans défaut', fig.erreursFigure(evan).length === 0);
verifier('Thalès : KJ = 1,6 sur la figure', proche(fig.longueurThales(evan, 'KJ'), 1.6));
verifier('Thalès : LM = 7,5 sur la figure (3 × 5 ÷ 2)', proche(fig.longueurThales(evan, 'LM'), 7.5));
verifier('Thalès : la base IJ vaut bien 3', proche(fig.longueurThales(evan, 'IJ'), 3));
verifier('Thalès : (IJ) et (ML) sont parallèles', fig.sontParalleles(evan) && fig.memeOrdre(evan));
verifier('Thalès : triangles emboîtés', fig.configuration(evan) === 'emboîtés');
verifier('Thalès : les transversales sont nommées', fig.transversales(evan).join() === 'IJ,ML');

// La réciproque du cours : papillon de sommet H.
const papillon = { modele: 'thales', sommet: 'H', d1: { G: 1.6, I: -4.8 }, d2: { K: 0.9, J: -2.7 }, angle: 40 };
verifier('Thalès : papillon sans défaut', fig.erreursFigure(papillon).length === 0);
verifier('Thalès : papillon reconnu', fig.configuration(papillon) === 'papillon');
verifier('Thalès : le papillon du cours a (GK) // (IJ)', fig.sontParalleles(papillon) && fig.memeOrdre(papillon));
// La contraposée du cours : HI = 3,2 au lieu de 4,8.
const contraposee = { ...papillon, d1: { G: 1.6, I: -3.2 } };
verifier('Thalès : avec HI = 3,2, les rapports diffèrent et les droites ne sont pas parallèles',
  !fig.rapportsEgaux(contraposee) && !fig.sontParalleles(contraposee));
// Rapports égaux, mais points pas dans le même ordre : pas de parallèles.
const desordre = { modele: 'thales', sommet: 'A', d1: { B: 2, D: 6 }, d2: { C: 3, E: -9 }, angle: 50 };
verifier('Thalès : rapports égaux sans le même ordre, les droites ne sont pas parallèles',
  fig.rapportsEgaux(desordre) && !fig.memeOrdre(desordre) && !fig.sontParalleles(desordre));

verifier('Thalès : une longueur écrite qui ment est refusée',
  fig.erreursFigure({ ...evan, cotes: { KM: '6' } }).length === 1);
verifier('Thalès : une base impossible est refusée',
  fig.erreursFigure({ ...evan, base: ['IJ', 10], cotes: {} }).length >= 1);
verifier('Thalès : un angle trop fermé est refusé',
  fig.erreursFigure({ ...papillon, angle: 10 }).length === 1);
verifier('Thalès : un point au sommet est refusé',
  fig.erreursFigure({ ...papillon, d1: { G: 1.6, I: 0 } }).length >= 1);
const svgEvan = fig.figure(evan);
verifier('Thalès : les cinq lettres sont posées', ['K', 'I', 'M', 'J', 'L'].every((l) => svgEvan.includes(`>${l}</text>`)));
verifier('Thalès : les deux transversales sont tracées', (svgEvan.match(/f-transversale/g) ?? []).length === 2);
verifier('Thalès : la description ne dit pas si les droites sont parallèles',
  !/parallèle/.test(svgEvan.match(/aria-label="([^"]*)"/)[1]));

// Aucune longueur écrite ne touche un trait, sur aucune figure du programme.
// Le texte est mesuré à sa taille sur téléphone (20 px : 12 unités par
// caractère, 20 de haut), la même estimation que figure.js.
{
  const { CHAPITRES } = await import('../js/data/chapitres/index.js');
  const coupe = ([x1, y1, x2, y2], b) => {
    let [t0, t1] = [0, 1];
    const [dx, dy] = [x2 - x1, y2 - y1];
    for (const [p, q] of [[-dx, x1 - b.x0], [dx, b.x1 - x1], [-dy, y1 - b.y0], [dy, b.y1 - y1]]) {
      if (p === 0) { if (q < 0) return false; continue; }
      const r = q / p;
      if (p < 0) { if (r > t1) return false; t0 = Math.max(t0, r); } else { if (r < t0) return false; t1 = Math.min(t1, r); }
    }
    return true;
  };
  // Une longueur écrite est barrée si un trait la traverse, ou si le nom d'un
  // point (21 px sur téléphone : 13 de large, 21 de haut) la chevauche.
  const barrees = (f) => {
    const svg = fig.figure(f);
    const traits = [...svg.matchAll(/<line x1="([-\d.]+)" y1="([-\d.]+)" x2="([-\d.]+)" y2="([-\d.]+)"/g)]
      .map((m) => m.slice(1, 5).map(Number));
    const lettres = [...svg.matchAll(/<text x="([-\d.]+)" y="([-\d.]+)" class="f-lettre"/g)]
      .map(([, x, y]) => ({ x0: Number(x) - 6.5, x1: Number(x) + 6.5, y0: Number(y) - 10.5, y1: Number(y) + 10.5 }));
    const chevauche = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
    return [...svg.matchAll(/<text x="([-\d.]+)" y="([-\d.]+)" class="f-cote-texte[^"]*" text-anchor="(\w+)"[^>]*>([^<]*)</g)]
      .map(([, x, y, ancre, t]) => {
        const x0 = Number(x) - { middle: 6, end: 12, start: 0 }[ancre] * t.length;
        return { t, x0, x1: x0 + 12 * t.length, y0: Number(y) - 10, y1: Number(y) + 10 };
      })
      .filter((b) => traits.some((c) => coupe(c, b)) || lettres.some((l) => chevauche(l, b)))
      .map((b) => b.t);
  };
  const figures = [];
  const visiter = (o) => {
    if (!o || typeof o !== 'object') return;
    if (o.modele === 'thales' && o.cotes) figures.push(o);
    Object.values(o).forEach(visiter);
  };
  visiter(CHAPITRES);
  const fautes = figures.flatMap((f) => barrees(f).map((t) => `« ${t} »`));
  verifier(`Thalès : aucune longueur écrite ne touche un trait (${figures.length} figures)${fautes.length ? ` — ${fautes.join(', ')}` : ''}`,
    figures.length >= 5 && !fautes.length);
  // Le cas qui a révélé le défaut : deux cotes empilées le long d'une droite presque verticale.
  verifier('Thalès : deux cotes empilées sur une droite raide restent lisibles',
    !barrees({ modele: 'thales', sommet: 'A', d1: { B: 4, D: 10 }, d2: { C: 5, E: 12.5 }, base: ['BC', 3],
      cotes: { AB: '4 cm', AD: '10 cm' } }).length);
}

// Les triangles semblables du cours : ABC (60°, 40°, 80°) et DEF.
const cours = {
  modele: 'semblables',
  t1: { sommets: ['A', 'B', 'C'], angles: { B: 40, C: 80 } },
  t2: { sommets: ['E', 'F', 'D'], k: 1.3, rotation: 150, miroir: true },
  etiquettes: { A: '60°', B: '40°', C: '80°', E: '60°', F: '40°', D: '80°' },
};
verifier('semblables : la figure du cours est sans défaut', fig.erreursFigure(cours).length === 0);
verifier('semblables : A a pour homologue E', fig.homologue(cours, 'A') === 'E');
verifier('semblables : [AB] a pour homologue [EF], [BC] [FD], [CA] [DE]',
  fig.homologue(cours, 'AB') === 'EF' && fig.homologue(cours, 'BC') === 'FD' && fig.homologue(cours, 'CA') === 'DE');
verifier('semblables : l\'homologue marche dans les deux sens', fig.homologue(cours, 'D') === 'C');
verifier('semblables : l\'angle en D mesure 80°', proche(fig.angleSemblables(cours, 'D'), 80));
verifier('semblables : un angle écrit qui ment est refusé',
  fig.erreursFigure({ ...cours, etiquettes: { E: '40°' } }).length === 1);
verifier('semblables : une longueur écrite sur un triangle donné par ses angles est refusée',
  fig.erreursFigure({ ...cours, etiquettes: { AB: '4 cm' } }).length === 1);
verifier('semblables : six sommets distincts',
  fig.erreursFigure({ ...cours, t2: { ...cours.t2, sommets: ['A', 'F', 'D'] } }).length >= 1);
const parLongueurs = {
  modele: 'semblables',
  t1: { sommets: ['A', 'B', 'C'], longueurs: { AB: 4, BC: 6, CA: 5 } },
  t2: { sommets: ['E', 'F', 'D'], k: 1.5, rotation: 200, miroir: true },
  couleurs: false,
  etiquettes: { AB: '4', EF: '6', FD: '9', DE: '?' },
};
verifier('semblables : figure donnée par ses longueurs, sans défaut', fig.erreursFigure(parLongueurs).length === 0);
verifier('semblables : FD = 9 et DE = 7,5 (k = 1,5)',
  proche(fig.longueurSemblables(parLongueurs, 'FD'), 9) && proche(fig.longueurSemblables(parLongueurs, 'DE'), 7.5));
verifier('semblables : une longueur fausse est refusée',
  fig.erreursFigure({ ...parLongueurs, etiquettes: { EF: '7' } }).length === 1);
verifier('semblables : sans couleurs, la description ne livre pas les homologues',
  fig.figure(parLongueurs).includes('et DEF.') && !fig.figure(parLongueurs).includes('EFD'));
verifier('semblables : sans couleurs, tous les angles sont neutres',
  !fig.figure(parLongueurs).includes('f-arc--a') && fig.figure(parLongueurs).includes('f-arc--neutre'));
verifier('une figure inconnue ne dessine rien et est signalée',
  fig.figure({ modele: 'inconnu' }) === '' && fig.erreursFigure({ modele: 'inconnu' }).length === 1);

// ── Écrire de mémoire, rédiger : la correction par Merlin ──────────────────
//
// Merlin classe chaque élément de la grille ; le verdict, lui, est calculé
// ici. Ces tests fixent la règle, et vérifient que rien de ce que renvoie le
// modèle n'est cru sans contrôle.

{
const ecrit = await import('../js/ecrit.js');
const grille = [
  { id: 'secantes', texte: 'les droites sont sécantes' },
  { id: 'paralleles', texte: 'les droites sont parallèles' },
  { id: 'egalite', texte: 'les rapports sont égaux' },
  { id: 'usage', texte: 'à quoi il sert', obligatoire: false },
];
const tous = (statut) => Object.fromEntries(grille.map((g) => [g.id, statut]));

verifier('écrit : tout présent, c\'est juste', ecrit.verdict(tous('present'), grille) === 'juste');
verifier('écrit : un élément facultatif qui manque ne compte pas',
  ecrit.verdict({ ...tous('present'), usage: 'absent' }, grille) === 'juste');
verifier('écrit : un seul oubli, c\'est presque', ecrit.verdict({ ...tous('present'), paralleles: 'absent' }, grille) === 'presque');
verifier('écrit : deux oublis, c\'est à reprendre',
  ecrit.verdict({ ...tous('present'), paralleles: 'absent', egalite: 'absent' }, grille) === 'a-reprendre');
verifier('écrit : un élément faux, c\'est à reprendre, même seul',
  ecrit.verdict({ ...tous('present'), egalite: 'faux' }, grille) === 'a-reprendre');
verifier('écrit : un élément facultatif faux compte',
  ecrit.verdict({ ...tous('present'), usage: 'faux' }, grille) === 'a-reprendre');

const schema = ecrit.schemaEvaluation(grille);
verifier('écrit : le schéma impose les identifiants de la grille',
  schema.properties.elements.items.properties.id.enum.join() === 'secantes,paralleles,egalite,usage');
verifier('écrit : le schéma impose les trois statuts',
  schema.properties.elements.items.properties.statut.enum.join() === 'present,absent,faux');

const bonne = { elements: grille.map((g) => ({ id: g.id, statut: 'present', commentaire: '' })), message: 'Bravo.' };
verifier('écrit : une réponse complète est lue', ecrit.lireEvaluation(bonne, grille)?.statuts.egalite === 'present');
verifier('écrit : un identifiant inconnu est refusé',
  ecrit.lireEvaluation({ ...bonne, elements: [...bonne.elements, { id: 'invente', statut: 'present', commentaire: '' }] }, grille) === null);
verifier('écrit : un élément oublié par Merlin est refusé',
  ecrit.lireEvaluation({ ...bonne, elements: bonne.elements.slice(1) }, grille) === null);
verifier('écrit : un statut inventé est refusé',
  ecrit.lireEvaluation({ ...bonne, elements: [{ ...bonne.elements[0], statut: 'bof' }, ...bonne.elements.slice(1)] }, grille) === null);

const a = { titre: 'Le théorème', consigne: 'Écris-le.', enonce: 'Si A alors B.', elements: grille };
const message = ecrit.messageEnonce(a, '  si les droites sont parallèles  ');
verifier('écrit : le message cite la référence et la grille', message.includes('Si A alors B.') && message.includes('[paralleles]'));
verifier('écrit : ce que l\'élève a écrit est cité à la fin, entre guillemets',
  message.trim().endsWith('« si les droites sont parallèles »'));
verifier('écrit : les consignes ne contiennent pas le texte de l\'élève',
  !ecrit.consignesEnonce('Evan').includes('si les droites sont parallèles'));
verifier('écrit : un élément facultatif est signalé au modèle', message.includes('[usage] à quoi il sert (facultatif)'));

const faux = (donnees) => async () => ({ disponible: true, donnees });
const cas = { nature: 'enonce', objet: a, texte: 'si les droites sont parallèles', prenom: 'Evan', profil: 'P' };
const avecOubli = { ...bonne, elements: bonne.elements.map((e) => (e.id === 'egalite' ? { ...e, statut: 'absent' } : e)) };
verifier('écrit : Merlin a répondu, le verdict est calculé ici',
  (await ecrit.evaluerEcrit(cas, { appeler: faux(avecOubli), appli: 't' })).verdict === 'presque');
verifier('écrit : sans Merlin, l\'élève se corrige lui-même',
  (await ecrit.evaluerEcrit(cas, { appeler: async () => ({ disponible: false }), appli: 't' })).aCorrigerSoiMeme === true);
verifier('écrit : une réponse illisible de Merlin renvoie à l\'auto-correction',
  (await ecrit.evaluerEcrit(cas, { appeler: faux({ elements: 'n\'importe quoi' }), appli: 't' })).aCorrigerSoiMeme === true);
verifier('écrit : une panne ne lève pas',
  (await ecrit.evaluerEcrit(cas, { appeler: async () => { throw new Error('réseau'); }, appli: 't' })).aCorrigerSoiMeme === true);
verifier('écrit : un texte vide n\'est pas envoyé',
  (await ecrit.evaluerEcrit({ ...cas, texte: '   ' }, { appeler: () => { throw new Error('appelé'); }, appli: 't' })).vide === true);
let recu = null;
await ecrit.evaluerEcrit({ ...cas, nature: 'redaction', objet: { enonce: 'E', consigne: 'C', modele: ['M1', 'M2'], criteres: grille } },
  { appeler: async (args) => { recu = args; return { disponible: false }; }, appli: 't' });
verifier('écrit : une rédaction part avec ses consignes, son modèle et sa grille',
  recu?.consignes.includes('RÉDACTION') && recu?.message.includes('  M2') && recu?.schema.properties.elements.items.properties.id.enum.length === 4);

verifier('écrit : l\'auto-correction compte ce qui est coché comme présent',
  ecrit.autoCorrection(['secantes', 'paralleles', 'egalite'], grille).verdict === 'juste'
  && ecrit.autoCorrection(['secantes'], grille).verdict === 'a-reprendre');

verifier('écrit : une lettre tapée n\'est pas suspecte', !ecrit.saisieSuspecte('Si les droites', 'Si les droites '));
verifier('écrit : un mot entier dicté par le clavier non plus', !ecrit.saisieSuspecte('Si les ', 'Si les parallèles'));
verifier('écrit : quarante caractères d\'un coup le sont', ecrit.saisieSuspecte('', 'On considère deux droites (MB) et (NC) sécantes en A.'));
verifier('écrit : effacer n\'est jamais suspect', !ecrit.saisieSuspecte('On considère deux droites (MB) et (NC) sécantes en A.', ''));
}

// ── Rapport ─────────────────────────────────────────────────────────────────



console.log(`${passes} test(s) passé(s).`);
for (const e of echecs) console.log(`  ✗ ${e}`);
if (echecs.length) {
  console.log(`\n${echecs.length} échec(s).`);
  process.exit(1);
}
