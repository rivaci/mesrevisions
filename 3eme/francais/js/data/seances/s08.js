// Séance 8 — Les modes, les temps et les voix.
//
// Les cartes « La conjugaison » et « Les modes du verbe » : les trois
// groupes, les sept modes, les temps simples et composés de l'indicatif, les
// deux voix.
//
// L'erreur visée : lire le temps sur la forme entière au lieu de l'auxiliaire
// (« eut fini » pris pour un plus-que-parfait), classer un verbe en -ir au 2e
// groupe sans le test de « nous », et prendre tout « être + participe » pour
// un passif (« elle est partie »).

export default {
  numero: 8,
  bloc: 2,
  titre: 'Les modes, les temps et les voix',
  sousTitre: 'Groupes, modes, temps simples et composés, voix passive',
  objectif: 'Identifier le groupe, le mode, le temps et la voix d\'un verbe, et conjuguer aux temps composés.',

  rappels: [
    {
      id: 'r1',
      titre: 'Les groupes et les modes',
      texte:
        'Les **groupes** : 1er (*-er* : *lancer*), 2e (*-ir* avec « nous …issons » : *finir*), 3e (tous les autres : *partir, dire, voir*, et *aller*).\n\n' +
        '**Modes personnels** — ils se conjuguent : l\'**indicatif** (l\'action est réelle), le **subjonctif** (souhaitée, douteuse, ou imposée par *il faut que, bien que…* : *que tu viennes*), le **conditionnel** (éventuelle : *tu viendrais*), l\'**impératif** (un ordre, un conseil : *viens !*).\n\n' +
        '**Modes impersonnels** — sans personne : l\'**infinitif** (*venir*), le **participe** (*venant, venu*), le **gérondif** (*en venant*).\n\n' +
        'Chaque mode a un temps simple et un temps composé : *que tu manges / que tu aies mangé* (subjonctif présent / passé), *tu mangerais / tu aurais mangé* (conditionnel présent / passé), *mange / aie mangé* (impératif présent / passé). Le subjonctif a aussi un imparfait et un plus-que-parfait, rares : *que tu mangeasses, que tu eusses mangé*.',
      exemples: [
        {
          phrase: 'Il faut **que tu partes**. / Tu **partirais** si tu pouvais. / **Pars** !',
          note: 'Subjonctif après *il faut que* ; conditionnel pour une action éventuelle ; impératif pour un ordre, sans sujet.',
        },
      ],
    },
    {
      id: 'r2',
      titre: 'Les temps de l\'indicatif, et les voix',
      texte:
        '**Temps simples** : présent (*tu chantes*), imparfait (*tu chantais*), passé simple (*tu chantas*), futur (*tu chanteras*).\n\n' +
        '**Temps composés** = auxiliaire + participe passé, et le temps de l\'auxiliaire donne le nom : passé composé (*tu as chanté*), plus-que-parfait (*tu avais chanté*), passé antérieur (*tu eus chanté*), futur antérieur (*tu auras chanté*).\n\n' +
        '**Voix active** : le sujet fait l\'action. **Voix passive** (*être* + participe) : le sujet la subit — *Le gardien ferme la grille* → *La grille est fermée par le gardien*.',
      exemples: [
        {
          phrase: 'Quand il **eut fini**, il **sortit**.',
          note: '*eut fini* : l\'auxiliaire *eut* est au passé simple → passé antérieur. Il marque une action terminée juste avant une autre au passé simple.',
        },
      ],
    },
  ],

  exercices: [
    // ── Rappel 1 : groupes et modes ──────────────────────────────────────
    {
      id: 's08-e1', rappel: 'r1', type: 'qcm', palier: 1, piege: 'groupe-du-verbe',
      consigne: 'À quel groupe appartient le verbe en gras ?',
      phrase: 'Les enfants **grandissent** vite.',
      choix: ['1er groupe', '2e groupe', '3e groupe'], attendu: '2e groupe',
    },
    {
      id: 's08-e2', rappel: 'r1', type: 'qcm', palier: 1, piege: 'groupe-du-verbe',
      consigne: 'À quel groupe appartient le verbe en gras ?',
      phrase: 'Nous **partons** demain matin.',
      choix: ['1er groupe', '2e groupe', '3e groupe'], attendu: '3e groupe',
    },
    {
      id: 's08-e3', rappel: 'r1', type: 'qcm', palier: 2, piege: 'groupe-du-verbe',
      consigne: 'À quel groupe appartient le verbe en gras ?',
      phrase: 'Ils **vont** au marché le samedi.',
      choix: ['1er groupe', '2e groupe', '3e groupe'], attendu: '3e groupe',
    },
    {
      id: 's08-e4', rappel: 'r1', type: 'qcm', palier: 2, piege: 'groupe-du-verbe',
      consigne: 'À quel groupe appartient le verbe en gras ?',
      phrase: 'Elle **étudie** l\'anglais.',
      choix: ['1er groupe', '2e groupe', '3e groupe'], attendu: '1er groupe',
    },
    {
      id: 's08-e5', rappel: 'r1', type: 'qcm', palier: 1, piege: 'mode-du-verbe',
      consigne: 'À quel mode est le verbe en gras ?',
      phrase: 'Je veux que tu **viennes** avec nous.',
      choix: ['indicatif', 'subjonctif', 'conditionnel'], attendu: 'subjonctif',
    },
    {
      id: 's08-e6', rappel: 'r1', type: 'qcm', palier: 2, piege: 'mode-du-verbe',
      consigne: 'À quel mode est le verbe en gras ?',
      phrase: 'Si j\'avais le temps, je **viendrais**.',
      choix: ['indicatif', 'subjonctif', 'conditionnel'], attendu: 'conditionnel',
    },
    {
      id: 's08-e7', rappel: 'r1', type: 'qcm', palier: 1, piege: 'mode-du-verbe',
      consigne: 'À quel mode est le verbe en gras ?',
      phrase: '**Ferme** la porte, s\'il te plaît.',
      choix: ['indicatif', 'impératif', 'subjonctif'], attendu: 'impératif',
    },
    {
      id: 's08-e8', rappel: 'r1', type: 'qcm', palier: 2, piege: 'mode-du-verbe',
      consigne: 'À quel mode est le verbe en gras ?',
      phrase: 'Il siffle **en marchant**.',
      choix: ['participe', 'gérondif', 'infinitif'], attendu: 'gérondif',
    },
    {
      id: 's08-e9', rappel: 'r1', type: 'qcm', palier: 3, piege: 'mode-du-verbe',
      consigne: 'À quel mode est le verbe en gras ?',
      phrase: '**Marchant** sans bruit, il approcha de la cabane.',
      choix: ['participe', 'gérondif', 'infinitif'], attendu: 'participe',
    },
    {
      id: 's08-e20', rappel: 'r1', type: 'qcm', palier: 3, piege: 'mode-du-verbe',
      consigne: 'À quel mode est le verbe en gras ?',
      phrase: 'Il faut que tu **aies terminé** avant midi.',
      choix: ['indicatif', 'subjonctif', 'conditionnel'], attendu: 'subjonctif',
    },
    {
      id: 's08-e21', rappel: 'r1', type: 'completer', palier: 3, piege: 'mode-du-verbe',
      consigne: 'Conjugue le verbe au conditionnel passé.',
      avant: 'Si tu étais venu, tu ', verbe: 'rire', apres: ' avec nous.', attendu: 'aurais ri',
    },

    // Réserve du rappel 1.
    {
      id: 's08-r1', rappel: 'r1', type: 'qcm', palier: 2, piege: 'groupe-du-verbe', reserve: true,
      consigne: 'À quel groupe appartient le verbe en gras ?',
      phrase: 'Ils **sortent** du cinéma.',
      choix: ['1er groupe', '2e groupe', '3e groupe'], attendu: '3e groupe',
    },
    {
      id: 's08-r2', rappel: 'r1', type: 'qcm', palier: 2, piege: 'groupe-du-verbe', reserve: true,
      consigne: 'À quel groupe appartient le verbe en gras ?',
      phrase: 'Nous **réfléchissons** à la question.',
      choix: ['1er groupe', '2e groupe', '3e groupe'], attendu: '2e groupe',
    },
    {
      id: 's08-r3', rappel: 'r1', type: 'qcm', palier: 2, piege: 'groupe-du-verbe', reserve: true,
      consigne: 'À quel groupe appartient le verbe en gras ?',
      phrase: 'Je **vais** à la plage cet après-midi.',
      choix: ['1er groupe', '2e groupe', '3e groupe'], attendu: '3e groupe',
    },
    {
      id: 's08-r4', rappel: 'r1', type: 'qcm', palier: 2, piege: 'mode-du-verbe', reserve: true,
      consigne: 'À quel mode est le verbe en gras ?',
      phrase: 'Bien qu\'il **soit** malade, il travaille.',
      choix: ['indicatif', 'subjonctif', 'conditionnel'], attendu: 'subjonctif',
    },
    {
      id: 's08-r5', rappel: 'r1', type: 'qcm', palier: 2, piege: 'mode-du-verbe', reserve: true,
      consigne: 'À quel mode est le verbe en gras ?',
      phrase: 'Elle chante **en cuisinant**.',
      choix: ['participe', 'gérondif', 'infinitif'], attendu: 'gérondif',
    },
    {
      id: 's08-r6', rappel: 'r1', type: 'qcm', palier: 2, piege: 'mode-du-verbe', reserve: true,
      consigne: 'À quel mode est le verbe en gras ?',
      phrase: '**Prenez** vos cahiers.',
      choix: ['indicatif', 'impératif', 'subjonctif'], attendu: 'impératif',
    },

    // ── Rappel 2 : temps de l'indicatif et voix ──────────────────────────
    {
      id: 's08-e10', rappel: 'r2', type: 'qcm', palier: 1, piege: 'temps-de-l-indicatif',
      consigne: 'À quel temps de l\'indicatif est le verbe en gras ?',
      phrase: 'Ce soir-là, il **chanta** une vieille chanson.',
      choix: ['imparfait', 'passé simple', 'passé composé'], attendu: 'passé simple',
    },
    {
      id: 's08-e11', rappel: 'r2', type: 'qcm', palier: 1, piege: 'temps-de-l-indicatif',
      consigne: 'À quel temps de l\'indicatif est le verbe en gras ?',
      phrase: 'Quand j\'étais petit, je **chantais** souvent.',
      choix: ['imparfait', 'passé simple', 'passé composé'], attendu: 'imparfait',
    },
    {
      id: 's08-e12', rappel: 'r2', type: 'qcm', palier: 2, piege: 'temps-de-l-indicatif',
      consigne: 'À quel temps de l\'indicatif est le verbe en gras ?',
      phrase: 'Dès qu\'il **eut terminé**, il partit.',
      choix: ['plus-que-parfait', 'passé antérieur', 'passé composé'], attendu: 'passé antérieur',
    },
    {
      id: 's08-e13', rappel: 'r2', type: 'qcm', palier: 2, piege: 'temps-de-l-indicatif',
      consigne: 'À quel temps de l\'indicatif est le verbe en gras ?',
      phrase: 'Il **avait terminé** avant midi.',
      choix: ['plus-que-parfait', 'passé antérieur', 'passé composé'], attendu: 'plus-que-parfait',
    },
    {
      id: 's08-e14', rappel: 'r2', type: 'completer', palier: 2, piege: 'temps-de-l-indicatif',
      consigne: 'Conjugue le verbe au futur antérieur de l\'indicatif.',
      avant: 'Demain soir, tu ', verbe: 'finir', apres: ' ce livre.', attendu: 'auras fini',
    },
    {
      id: 's08-e15', rappel: 'r2', type: 'completer', palier: 3, piege: 'temps-de-l-indicatif',
      consigne: 'Conjugue le verbe au conditionnel présent.',
      avant: 'À ta place, je ', verbe: 'manger', apres: ' moins vite.', attendu: 'mangerais',
    },
    {
      id: 's08-e16', rappel: 'r2', type: 'completer', palier: 3, piege: 'temps-de-l-indicatif',
      consigne: 'Conjugue le verbe au passé simple de l\'indicatif.',
      avant: 'Soudain, nous ', verbe: 'entendre', apres: ' un cri.', attendu: 'entendîmes',
    },
    {
      id: 's08-e17', rappel: 'r2', type: 'qcm', palier: 1, piege: 'voix-passive-ou-active',
      consigne: 'À quelle voix est le verbe en gras ?',
      phrase: 'Le voleur **est arrêté** par la police.',
      choix: ['voix active', 'voix passive'], attendu: 'voix passive',
    },
    {
      id: 's08-e18', rappel: 'r2', type: 'qcm', palier: 2, piege: 'voix-passive-ou-active',
      consigne: 'À quelle voix est le verbe en gras ?',
      phrase: 'Mes amis **sont arrivés** hier.',
      choix: ['voix active', 'voix passive'], attendu: 'voix active',
    },
    {
      id: 's08-e19', rappel: 'r2', type: 'qcm', palier: 3, piege: 'voix-passive-ou-active',
      consigne: 'À quel temps est ce verbe à la voix passive ?',
      phrase: 'La grille **a été repeinte** par le gardien.',
      choix: ['présent', 'passé composé', 'plus-que-parfait'], attendu: 'passé composé',
    },

    // Réserve du rappel 2.
    {
      id: 's08-r7', rappel: 'r2', type: 'qcm', palier: 2, piege: 'temps-de-l-indicatif', reserve: true,
      consigne: 'À quel temps de l\'indicatif est le verbe en gras ?',
      phrase: 'Lorsqu\'elle **eut compris**, elle sourit.',
      choix: ['plus-que-parfait', 'passé antérieur', 'passé composé'], attendu: 'passé antérieur',
    },
    {
      id: 's08-r8', rappel: 'r2', type: 'qcm', palier: 2, piege: 'temps-de-l-indicatif', reserve: true,
      consigne: 'À quel temps de l\'indicatif est le verbe en gras ?',
      phrase: 'Ce jour-là, il **neigea** sans arrêt.',
      choix: ['imparfait', 'passé simple', 'présent'], attendu: 'passé simple',
    },
    {
      id: 's08-r9', rappel: 'r2', type: 'completer', palier: 2, piege: 'temps-de-l-indicatif', reserve: true,
      consigne: 'Conjugue le verbe au plus-que-parfait de l\'indicatif.',
      avant: 'Ce matin-là, elle ', verbe: 'oublier', apres: ' son sac.', attendu: 'avait oublié',
    },
    {
      id: 's08-r10', rappel: 'r2', type: 'qcm', palier: 2, piege: 'voix-passive-ou-active', reserve: true,
      consigne: 'À quelle voix est le verbe en gras ?',
      phrase: 'Les invités **sont partis** tôt.',
      choix: ['voix active', 'voix passive'], attendu: 'voix active',
    },
    {
      id: 's08-r11', rappel: 'r2', type: 'qcm', palier: 2, piege: 'voix-passive-ou-active', reserve: true,
      consigne: 'À quelle voix est le verbe en gras ?',
      phrase: 'Le pont **sera construit** l\'an prochain.',
      choix: ['voix active', 'voix passive'], attendu: 'voix passive',
    },
    {
      id: 's08-r12', rappel: 'r2', type: 'qcm', palier: 2, piege: 'voix-passive-ou-active', reserve: true,
      consigne: 'À quelle voix est le verbe en gras ?',
      phrase: 'Ces tableaux **sont admirés** par les visiteurs.',
      choix: ['voix active', 'voix passive'], attendu: 'voix passive',
    },
  ],
};
