// Tests du moteur, hors navigateur.
//
//     node tools/tester-moteur.mjs
//
// Ce qui se joue ici, c'est la justice de la correction : un « faux » donné à
// une réponse juste décourage, un « juste » donné à une erreur la fait
// apprendre. D'où des tests qui vérifient autant ce qui est REFUSÉ que ce qui
// est accepté — le vocabulaire et ses confusions classiques (invention et
// innovation, préactionneur et actionneur, switch et routeur) — et que
// chaque question dit la même chose que sa fiche.

import { comparer, distance, indiceDe, nombreDe, normaliser } from '../js/comparer.js';
import { MAX_REPRISES, avancer, bilan, courant, enregistrer, estFini, note, nouveauTour, tirerInterro } from '../js/tour.js';
import { aRevoir, noterEssai, profilVierge } from '../js/progres.js';
import { CONSIGNES, evaluerEcrit, lireEvaluation, saisieSuspecte, verdict } from '../js/ecrit.js';
import { CHAPITRES, itemParId, itemsDe } from '../js/data/chapitres/index.js';

let passes = 0;
const echecs = [];

const verifier = (nom, condition) => {
  if (condition) passes += 1;
  else echecs.push(nom);
};

const [objets, energie] = CHAPITRES;
const item = (id) => itemParId(objets, id) ?? itemParId(energie, id);
const jugé = (saisie, id) => comparer(saisie, item(id));
const piege = (saisie, id) => jugé(saisie, id).raison === 'piege';
const fiche = (c, etape, titre) => c.etapes.find((e) => e.id === etape).fiche.find((b) => b.titre === titre);

// ── Ce qui ne compte pas ────────────────────────────────────────────────────

verifier('l\'article ne compte pas (le switch)', jugé('le switch', 'rc-t-switch').resultat === 'juste');
verifier('la casse ne compte pas (SYSML, sysml)', jugé('SYSML', 'sy-t-sysml').resultat === 'juste' && jugé('sysml', 'sy-t-sysml').resultat === 'juste');
verifier('le pluriel accepté (composants)', jugé('composants', 'an-t-composant').resultat === 'juste');
verifier('le sigle LAN et l\'écriture de la fiche « réseau local (LAN) » acceptés', ['LAN', 'réseau local (LAN)', 'LAN (réseau local)'].every((s) => jugé(s, 're-t-lan').resultat === 'juste'));
verifier('les réponses des QCM de l\'appli acceptées dans les mots à taper (objet technique simple…)',
  jugé('objet technique simple', 'ost-t-objet').resultat === 'juste' && jugé('système technique complexe', 'ost-t-systeme').resultat === 'juste');
verifier('les noms courants des diagrammes acceptés (de cas d\'utilisation, du contexte, des séquences…)',
  jugé('diagramme de cas d\'utilisation', 'sy-t-cas').resultat === 'juste' && jugé('diagramme du contexte', 'sy-t-contexte').resultat === 'juste'
  && jugé('diagramme de besoins', 'sy-t-besoins').resultat === 'juste' && jugé('diagramme des séquences', 'sy-t-sequence').resultat === 'juste'
  && jugé('diagramme des activités', 'sy-t-activite').resultat === 'juste' && jugé('diagramme d\'exigences', 'sy-t-exigences').resultat === 'juste');
verifier('les étiquettes de la fiche 8 acceptées (switch (commutateur), poste client, routeur (passerelle)…)',
  jugé('switch (commutateur)', 'rc-t-switch').resultat === 'juste' && jugé('poste client', 're-t-terminal').resultat === 'juste'
  && jugé('terminal (poste client)', 're-t-terminal').resultat === 'juste' && jugé('routeur (passerelle)', 'rc-t-routeur').resultat === 'juste'
  && jugé('borne Wi-Fi (point d\'accès)', 'rc-t-borne').resultat === 'juste' && jugé('point d\'accès Wi-Fi', 'rc-t-borne').resultat === 'juste');
verifier('le mot court du diagramme accepté (séquence)', jugé('séquence', 'sy-t-sequence').resultat === 'juste' && jugé('le diagramme de séquence', 'sy-t-sequence').resultat === 'juste');
verifier('« commutateur » est accepté pour le switch', jugé('commutateur', 'rc-t-switch').resultat === 'juste');
verifier('« pré-actionneur » avec un tiret est accepté', jugé('pré-actionneur', 'co-t-preactionneur').resultat === 'juste');
verifier('« borne wifi » et « point d\'accès » sont acceptés', jugé('borne wifi', 'rc-t-borne').resultat === 'juste' && jugé('point d\'accès', 'rc-t-borne').resultat === 'juste');

// ── Presque : les accents, l'orthographe ───────────────────────────────────

verifier('« preactionneur » : presque, l\'accent', jugé('preactionneur', 'co-t-preactionneur').raison === 'accent');
verifier('« reseau local » : presque, l\'accent', jugé('reseau local', 're-t-lan').raison === 'accent');
verifier('« actioneur » : presque, l\'orthographe', jugé('actioneur', 'co-t-actionneur').raison === 'orthographe');
verifier('un autre mot est faux (« routeur » pour le serveur)', jugé('routeur', 'rc-t-serveur').resultat === 'faux');

// ── Les confusions prévues ──────────────────────────────────────────────────

verifier('« innovation » et « invention » : dans les deux sens', piege('innovation', 'inv-t-invention') && piege('invention', 'inv-t-innovation'));
verifier('« innovation » pour l\'innovation de rupture : presque', jugé('innovation', 'inv-t-rupture').resultat === 'presque');
verifier('objet et système technique : dans les deux sens', piege('système technique', 'ost-t-objet') && piege('objet technique', 'ost-t-systeme'));
verifier('famille et lignée : dans les deux sens', piege('lignée', 'fam-t-famille') && piege('famille d\'objets', 'fam-t-lignee'));
verifier('fonction d\'usage et fonction technique : dans les deux sens', piege('fonction technique', 'an-t-usage') && piege('fonction d\'usage', 'an-t-ftechnique'));
verifier('contrainte et critère de choix : dans les deux sens', piege('critère de choix', 'ev-t-contrainte') && piege('contrainte', 'ev-t-critere'));
verifier('« composants » pour les solutions techniques : expliqué', piege('composants', 'an-t-solution'));
verifier('séquence et activité : dans les deux sens', piege('activité', 'sy-t-sequence') && piege('séquence', 'sy-t-activite'));
verifier('« forme » pour la source d\'énergie : expliqué', piege('forme d\'énergie', 'en-t-source'));
verifier('« chaleur » pour l\'énergie thermique : presque', jugé('chaleur', 'fo-t-thermique').resultat === 'presque');
verifier('préactionneur et actionneur : dans les deux sens', piege('actionneur', 'co-t-preactionneur') && piege('préactionneur', 'co-t-actionneur'));
verifier('« preactionneur » sans accent reste la confusion, pas une faute d\'accent', piege('preactionneur', 'co-t-actionneur'));
verifier('switch et routeur : dans les deux sens', piege('routeur', 'rc-t-switch') && piege('switch', 'rc-t-routeur'));
verifier('« chaîne d\'information » pour la chaîne d\'énergie : expliqué', piege('chaîne d\'information', 'ch-t-chaine'));
verifier('« alimentation » pour la fonction Alimenter : presque, c\'est le composant', jugé('alimentation', 'ch-t-alimenter').resultat === 'presque');
verifier('convertisseur et actionneur : presque, dans les deux sens', jugé('convertisseur', 'co-t-actionneur').resultat === 'presque'
  && jugé('actionneur', 'cv-t-convertisseur').resultat === 'presque');
verifier('« box » pour le routeur : presque, expliqué', jugé('box', 'rc-t-routeur').resultat === 'presque' && piege('box Internet', 'rc-t-routeur'));

// ── Les QCM ─────────────────────────────────────────────────────────────────

verifier('un QCM juste', comparer('un objet technique simple', item('ost-marteau')).resultat === 'juste');
verifier('un QCM faux', comparer('un système technique complexe', item('ost-marteau')).resultat === 'faux');

// ── Chaque question dit la même chose que sa fiche ─────────────────────────

{
  // Les composants de la chaîne d'énergie : chacun dans la ligne de sa fonction.
  const tableau = fiche(energie, 'e2-composants', 'Chaque fonction a son composant');
  const ligneDe = (fonction) => tableau.lignes.find(([f]) => f === fonction).join(' ').toLowerCase();
  const attendus = {
    'co-relais': ['relais', 'Distribuer', 'un préactionneur'],
    'co-variateur': ['variateur de vitesse', 'Distribuer', 'un préactionneur'],
    'co-verin': ['vérin pneumatique', 'Convertir', 'un actionneur'],
    'co-resistance': ['résistance chauffante', 'Convertir', 'un actionneur'],
    'co-courroie': ['courroie et des poulies', 'Transmettre', 'un organe de transmission'],
    'co-batterie': ['batterie', 'Alimenter', 'Alimenter'],
    'co-vis': ['vis-écrou', 'Transmettre', 'Transmettre'],
  };
  const tous = Object.entries(attendus).every(([id, [mot, fonction, reponse]]) => ligneDe(fonction).includes(mot) && item(id).attendu === reponse);
  verifier('chaque composant est rangé sous sa fonction, comme dans le tableau', tous);
}
{
  // Le portail : la même chaîne dans la fiche, l'ordre et les QCM.
  const lignes = fiche(energie, 'e2-portail', 'La chaîne d\'énergie du portail automatique').lignes;
  const fonctionDe = (mot) => lignes.find((l) => l.includes(mot))?.match(/\*\*(\p{L}+)\*\*/u)?.[1];
  verifier('le portail : relais → Distribuer, moteur → Convertir, engrenages → Transmettre',
    fonctionDe('relais') === item('po-relais').attendu && fonctionDe('moteur électrique') === item('po-moteur').attendu
    && fonctionDe('engrenages') === item('po-engrenages').attendu);
  verifier('la chaîne d\'énergie dans l\'ordre ADCT, puis Agir', item('ch-ordre').elements.join() === 'Alimenter,Distribuer,Convertir,Transmettre,Agir');
}
{
  // Les sources : chaque QCM d'accord avec la colonne du tableau.
  const tableau = fiche(energie, 'e1-sources', 'Deux types de sources');
  const colonne = (k) => tableau.lignes.map((l) => l[k]).join(' ').toLowerCase();
  const sources = { 'en-r-biomasse': 'biomasse', 'en-r-geothermie': 'géothermie', 'en-r-uranium': 'uranium', 'en-r-gaz': 'gaz naturel', 'en-r-eolien': 'éolien' };
  verifier('chaque source est dans la bonne colonne du tableau', Object.entries(sources).every(([id, mot]) => {
    const renouvelable = colonne(0).includes(mot);
    return renouvelable !== colonne(1).includes(mot) && item(id).attendu === (renouvelable ? 'renouvelable' : 'non renouvelable');
  }));
}
{
  // Les conversions : chaque QCM d'accord avec le tableau des convertisseurs.
  const tableau = fiche(energie, 'e1-conversion', 'Trois convertisseurs du cours');
  const forme = (texte) => texte.match(/énergie (\p{L}+)/u)[1];
  const conversion = (mot) => {
    const [, recoit, fournit] = tableau.lignes.find(([c]) => c.includes(mot));
    return `l'énergie ${forme(recoit)} en énergie ${forme(fournit)}`;
  };
  verifier('panneau solaire, moteur, résistance : la conversion du tableau',
    conversion('panneau solaire') === item('cv-panneau').attendu && conversion('moteur électrique') === item('cv-moteur').attendu
    && conversion('résistance chauffante') === item('cv-resistance').attendu);
}
{
  // SysML : la question de chaque diagramme, dans sa définition et dans le tableau.
  const tableau = fiche(objets, 'o3-questions', 'Le diagramme, sa question, ce qu\'il montre');
  const diagrammes = { 'sy-t-besoins': 'des besoins', 'sy-t-contexte': 'de contexte', 'sy-t-exigences': 'des exigences', 'sy-t-cas': 'des cas d\'utilisation', 'sy-t-sequence': 'de séquence', 'sy-t-activite': 'd\'activité' };
  verifier('chaque diagramme garde sa question du tableau', Object.entries(diagrammes).every(([id, nom]) => {
    const ligne = tableau.lignes.find(([d]) => d === `**${nom}**`);
    const question = ligne?.[1].replace(/\*/g, '');
    return question && item(id).definition.includes(`« ${question} »`) && normaliser(item(id).attendu).endsWith(normaliser(nom));
  }));
}
{
  // La lignée : l'ordre demandé suit les années du tableau.
  const tableau = fiche(objets, 'o1-familles', 'La lignée des voitures à moteur thermique');
  const annees = tableau.lignes.slice(0, 4).map(([a]) => Number(a));
  const noms = tableau.lignes.slice(0, 4).map(([, v]) => v);
  verifier('la lignée à ranger suit les années du cours', annees.every((a, k) => k === 0 || a > annees[k - 1])
    && item('fam-ordre').elements.every((e, k) => e.startsWith(noms[k])));
}

// ── Utilitaires ─────────────────────────────────────────────────────────────

verifier('le nombre d\'une saisie : virgule, point, unité (le moteur sait toujours le lire)', nombreDe('18,57 g/cm3') === 18.57 && nombreDe('1 000 L') === 1000 && nombreDe('aucun') === null);
verifier('la distance compte les lettres à changer', distance('actionneur', 'actioneur') === 1 && distance('abc', 'abc') === 0);
verifier('l\'indice garde la première lettre de chaque mot', indiceDe(item('rc-t-carte')) === `c${'·'.repeat(4)} r${'·'.repeat(5)}`);
verifier('normaliser ôte les articles', normaliser('Le Switch') === 'switch');
verifier('un mot tapé n\'est pas un collage', !saisieSuspecte('Le portail', 'Le portail e'));
verifier('une réponse arrivée d\'un coup, si', saisieSuspecte('', 'Le portail est alimenté par le secteur, puis le relais distribue l\'énergie.'));

// ── Le tour ─────────────────────────────────────────────────────────────────

{
  const t = nouveauTour([{ id: 'a' }, { id: 'b' }]);
  enregistrer(t, courant(t), 'faux');
  avancer(t);
  enregistrer(t, courant(t), 'juste');
  avancer(t);
  verifier('une question ratée repasse en fin de file', t.file.length === 3 && t.file[2].id === 'a');
  enregistrer(t, courant(t), 'juste');
  avancer(t);
  verifier('seul le premier essai compte', estFini(t) && bilan(t).faux === 1 && bilan(t).justes === 1);
}
{
  const t = nouveauTour([{ id: 'a' }]);
  for (let i = 0; i < 6 && !estFini(t); i += 1) { enregistrer(t, courant(t), 'faux'); avancer(t); }
  verifier(`une question ne revient pas plus de ${MAX_REPRISES} fois`, t.file.length === 1 + MAX_REPRISES);
}
{
  const t = nouveauTour([{ id: 'a' }, { id: 'b' }], { reprendre: false });
  enregistrer(t, courant(t), 'presque');
  avancer(t);
  enregistrer(t, courant(t), 'juste');
  verifier('le contrôle blanc ne reprend rien, et compte un demi-point pour presque', t.file.length === 2 && note(t).points === 1.5);
}

// ── Le contrôle blanc, pour chaque chapitre ────────────────────────────────

for (const c of CHAPITRES) {
  let graine = 5;
  const alea = () => { graine = (graine * 16807) % 2147483647; return (graine - 1) / 2147483646; };
  const attendu = c.interro.tirage.reduce((s, t) => s + t.nombre, 0);
  const etapeDe = (id) => c.etapes.find((e) => e.items.some((i) => i.id === id));
  let bon = true;
  let voisins = true;
  let aLEnversVus = 0;
  for (let essai = 0; essai < 40; essai += 1) {
    const questions = tirerInterro(c, alea);
    const ids = questions.map((q) => q.id);
    const aLEnvers = questions.filter((q) => q.mode === 'reconnaitre');
    aLEnversVus += aLEnvers.length;
    bon = bon && questions.length === attendu
      && new Set(ids).size === ids.length
      && ids.every((id) => itemParId(c, id) && itemParId(c, id).type !== 'decrire')
      && aLEnvers.every((q) => itemParId(c, q.id).type === 'terme' && q.options.length === 3
        && new Set(q.options).size === 3 && q.options.includes(itemParId(c, q.id).definition));
    for (const q of aLEnvers) {
      const e = etapeDe(q.id);
      const definitions = e.items.filter((i) => i.type === 'terme').map((i) => i.definition);
      if (definitions.length >= 3) voisins = voisins && q.options.every((o) => definitions.includes(o));
    }
  }
  verifier(`chapitre ${c.numero} : ${attendu} questions distinctes, sans écrit, QCM à l'envers sur des définitions (40 tirages)`, bon && aLEnversVus > 0);
  verifier(`chapitre ${c.numero} : les fausses définitions viennent de l'étape quand elle en a assez`, voisins);
}

// ── La progression ──────────────────────────────────────────────────────────

{
  let p = profilVierge();
  p = noterEssai(p, 'ch-ordre', 'faux');
  p = noterEssai(p, 'po-w-chaine', 'faux');
  verifier('un ordre raté va dans « À revoir », un écrit raté non', aRevoir(p, itemsDe(energie)).map((i) => i.id).join() === 'ch-ordre');
}

// ── Merlin ──────────────────────────────────────────────────────────────────

{
  const ecrit = item('po-w-chaine');
  const criteres = ecrit.criteres;
  const tous = (statut) => Object.fromEntries(criteres.map((x) => [x.id, statut]));
  verifier('tout présent : juste', verdict(tous('present'), criteres) === 'juste');
  verifier('une erreur : à reprendre', verdict({ ...tous('present'), convertir: 'faux' }, criteres) === 'a-reprendre');
  verifier('les consignes parlent de technologie, de chaîne d\'énergie et de confusions du cours',
    /technologie/.test(CONSIGNES) && /chaîne d'énergie/.test(CONSIGNES) && /préactionneur et actionneur/.test(CONSIGNES));
  verifier('les consignes demandent de suivre le cours de l\'élève', /Suis le cours/.test(CONSIGNES));

  const bonne = {
    elements: criteres.map((x) => ({ id: x.id, statut: 'present', commentaire: '' })),
    corrige: 'Le secteur alimente le portail.', message: 'Bien.',
  };
  verifier('une réponse complète de Merlin est lue', lireEvaluation(bonne, criteres)?.corrige === 'Le secteur alimente le portail.');
  let recu = null;
  const appeler = async (requete) => { recu = requete; return { disponible: true, donnees: bonne }; };
  const lue = await evaluerEcrit({ item: ecrit, texte: 'Le secteur alimente le portail.', profil: energie.profilMerlin }, { appeler, appli: 'techno3e' });
  verifier('Merlin répond : verdict calculé par l\'appli', lue.parMerlin && lue.verdict === 'juste');
  verifier('le profil du chapitre part avec la requête, avec la chaîne du cours', /ADCT/.test(recu?.profil ?? '') && /préactionneur/.test(recu?.profil ?? ''));
  verifier('les profils suivent le cours : l\'exemple d\'invention, la gourde', /électricité, fin du XVIIIe siècle/.test(objets.profilMerlin) && /gourde/.test(objets.profilMerlin));
  const plante = await evaluerEcrit({ item: ecrit, texte: 'x', profil: '' }, { appeler: async () => { throw new Error('réseau'); } });
  verifier('un appel qui lève ne casse rien', plante.aCorrigerSoiMeme);
}

// ── Bilan ───────────────────────────────────────────────────────────────────

if (echecs.length) {
  console.error(`✗ ${echecs.length} échec(s), ${passes} réussi(s) :`);
  for (const e of echecs) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✓ ${passes} tests réussis.`);
