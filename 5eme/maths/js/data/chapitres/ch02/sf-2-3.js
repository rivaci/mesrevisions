// Chapitre 2, savoir-faire 3 — Angles alternes-internes et correspondants.
//
// ── D'où vient ce savoir-faire ────────────────────────────────────────────
//
// De la dernière leçon d'Antonin, « Angles alternes-internes et
// correspondants » : « Alterne : de part et d'autre de la sécante. Interne :
// entre les droites (D) et (D'). » Puis « Correspondants : situés du même côté
// de la sécante. L'un est externe, l'autre interne. » Les couleurs de ses
// figures — une paire rouge, une paire bleue — sont reprises telles quelles.
//
// ── Uniquement reconnaître ───────────────────────────────────────────────
//
// Ici, on nomme des paires ; on ne calcule pas encore. Le lien avec le
// parallélisme est le savoir-faire suivant : le mélanger dès maintenant ferait
// croire que des alternes-internes sont toujours égaux.
//
// ── La numérotation ──────────────────────────────────────────────────────
//
// Toujours la même, et c'est ce qui permet au contrôle de contenu de vérifier
// chaque réponse contre la figure (champ `paire`) :
//
//        1 | 2        (D)
//     ─────A─────
//        4 | 3
//          |
//        5 | 6        (D')
//     ─────B─────
//        8 | 7
//
// Les alternes-externes (1 et 7, 2 et 8) existent, mais ne sont pas au
// programme : aucune question ne les vise, pour ne pas mettre en défaut un
// élève qui les connaîtrait.

const secante = (angle, surligner, extra = {}) => ({ modele: 'secante', angle, surligner, ...extra });
const NATURES = ['alternes-internes', 'correspondants', 'opposés par le sommet', 'aucune de ces paires'];

export default {
  id: 'sf-2-3',
  titre: 'Reconnaître les angles alternes-internes et correspondants',
  attendus: [
    'Il reconnaît deux angles alternes-internes.',
    'Il reconnaît deux angles correspondants.',
    'Il distingue les angles internes (entre les deux droites) des angles externes.',
  ],

  decouvrir: {
    titre: 'Huit angles pour deux croisements',
    texte:
      'Deux droites (D) et (D\') sont coupées par une troisième, la **sécante** (d). '
      + 'Il y a deux croisements, A et B, et quatre angles autour de chacun.',
    figure: secante(60, { 3: 'a', 5: 'a', 4: 'b', 6: 'b' }),
    lignes: [
      { calcul: 'En rouge', resultat: 'les angles 3 et 5' },
      { calcul: 'En bleu', resultat: 'les angles 4 et 6' },
    ],
    question: 'Combien d\'angles la figure compte-t-elle en tout ? Et combien sont situés entre les deux droites (D) et (D\') ?',
    champs: [
      { id: 'a', etiquette: 'angles en tout', attendu: 8 },
      { id: 'b', etiquette: 'angles entre (D) et (D\')', attendu: 4 },
    ],
    conclusion:
      'Les angles 3, 4, 5 et 6 sont **entre** les deux droites : on dit qu\'ils sont '
      + '**internes**. Dans chaque paire colorée, les deux angles sont internes ET de '
      + 'part et d\'autre de la sécante : ce sont des angles **alternes-internes**.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Alternes-internes',
      texte:
        '**Alternes** : de part et d\'autre de la sécante.\n'
        + '**Internes** : entre les droites (D) et (D\').\n'
        + 'Sur la figure, les angles 3 et 5 (en rouge) sont alternes-internes, comme '
        + 'les angles 4 et 6 (en bleu).',
      figure: secante(62, { 3: 'a', 5: 'a', 4: 'b', 6: 'b' }),
    },
    {
      type: 'definition',
      titre: 'Correspondants',
      texte:
        '**Correspondants** : du **même côté** de la sécante, l\'un **interne**, l\'autre '
        + '**externe** — à la même place à chaque croisement.\n'
        + 'Sur la figure, les angles 2 et 6 sont correspondants (en vert). Les autres '
        + 'paires : 1 et 5, 3 et 7, 4 et 8.',
      figure: secante(62, { 2: 'c', 6: 'c' }),
    },
    {
      type: 'remarque',
      titre: 'Deux questions, dans l\'ordre',
      texte:
        '**1.** Les deux angles sont-ils du même côté de la sécante ?\n'
        + '**2.** Sont-ils entre les deux droites ?\n'
        + 'Côtés opposés, et tous deux entre les droites : **alternes-internes**. '
        + 'Même côté, et à la même place à chaque croisement : **correspondants**.',
    },
    {
      type: 'exemple',
      texte: 'Alternes-internes : 3 et 5, 4 et 6   ·   Correspondants : 1 et 5, 2 et 6, 3 et 7, 4 et 8',
    },
  ],

  methode: {
    titre: 'Nommer la paire formée par les angles 4 et 6',
    enonce: 'Quelle est la nature de la paire formée par les angles 4 et 6 ?',
    figure: secante(58, { 4: 'b', 6: 'b' }),
    etapes: [
      { texte: 'Même côté de la sécante ? Non : 4 est à gauche, 6 est à droite.', note: 'Ils sont donc alternes.' },
      { texte: 'Entre les deux droites ? Oui : 4 est sous (D), 6 est au-dessus de (D\').', note: 'Ils sont donc internes.' },
      { texte: 'Les angles 4 et 6 sont alternes-internes.', note: '' },
    ],
    controle:
      'Le contrôle : pose un doigt sur chaque angle. Si tes deux doigts sont entre les '
      + 'deux droites et de part et d\'autre de la sécante, ce sont des '
      + 'alternes-internes. Sinon, cherche une autre réponse.',
  },

  entrainement: [
    // ── Palier 1 : les paires du cours ────────────────────────────────────
    {
      id: 'e-2-3-1', type: 'choix', palier: 1, piege: 'alternes-correspondants-confondus',
      consigne: 'Comment s\'appelle la paire formée par les angles 3 et 5 ?', enonce: 'Les angles 3 et 5.',
      figure: secante(66, { 3: 'a', 5: 'a' }), paire: [3, 5],
      choix: NATURES, attendu: 'alternes-internes',
      fausses: [{ valeur: 'correspondants', piege: 'alternes-correspondants-confondus' }],
    },
    {
      id: 'e-2-3-2', type: 'choix', palier: 1, piege: 'alternes-correspondants-confondus',
      consigne: 'Comment s\'appelle la paire formée par les angles 2 et 6 ?', enonce: 'Les angles 2 et 6.',
      figure: secante(66, { 2: 'c', 6: 'c' }), paire: [2, 6],
      choix: NATURES, attendu: 'correspondants',
      fausses: [{ valeur: 'alternes-internes', piege: 'alternes-correspondants-confondus' }],
    },
    {
      // NEUTRE : une paire du savoir-faire précédent, qui n'a rien à voir avec
      // la sécante. Sans lui, « deux angles numérotés, c'est alternes ou
      // correspondants » deviendrait un réflexe.
      id: 'e-2-3-3', type: 'choix', palier: 1, neutre: true, piege: 'alternes-correspondants-confondus',
      consigne: 'Comment s\'appelle la paire formée par les angles 1 et 3 ?', enonce: 'Les angles 1 et 3.',
      figure: secante(66, { 1: 'b', 3: 'b' }), paire: [1, 3],
      choix: NATURES, attendu: 'opposés par le sommet',
    },
    // ── Palier 2 : les autres paires ───────────────────────────────────────
    {
      id: 'e-2-3-4', type: 'choix', palier: 2, piege: 'alternes-correspondants-confondus',
      consigne: 'Comment s\'appelle la paire formée par les angles 4 et 6 ?', enonce: 'Les angles 4 et 6.',
      figure: secante(52, { 4: 'b', 6: 'b' }), paire: [4, 6],
      choix: NATURES, attendu: 'alternes-internes',
      fausses: [{ valeur: 'correspondants', piege: 'alternes-correspondants-confondus' }],
    },
    {
      id: 'e-2-3-5', type: 'choix', palier: 2, piege: 'alternes-correspondants-confondus',
      consigne: 'Comment s\'appelle la paire formée par les angles 3 et 7 ?', enonce: 'Les angles 3 et 7.',
      figure: secante(52, { 3: 'c', 7: 'c' }), paire: [3, 7],
      choix: NATURES, attendu: 'correspondants',
      fausses: [{ valeur: 'alternes-internes', piege: 'alternes-correspondants-confondus' }],
    },
    {
      id: 'e-2-3-6', type: 'calcul', palier: 2, piege: 'alternes-correspondants-confondus',
      consigne: 'Quel angle est alterne-interne avec l\'angle 4 ? Donne son numéro.', enonce: 'L\'angle 4.',
      figure: secante(70, { 4: 'a' }), attendu: 6,
      fausses: [{ valeur: 8, piege: 'alternes-correspondants-confondus' }],
    },
    {
      id: 'e-2-3-7', type: 'calcul', palier: 2, piege: 'alternes-correspondants-confondus',
      consigne: 'Quel angle est correspondant à l\'angle 1 ? Donne son numéro.', enonce: 'L\'angle 1.',
      figure: secante(70, { 1: 'c' }), attendu: 5,
    },
    // ── Palier 3 : les paires qui n'en sont pas ────────────────────────────
    {
      // Les deux angles sont internes, mais du même côté : ils ne sont pas
      // alternes. L'erreur visée est de ne vérifier qu'une des deux conditions.
      id: 'e-2-3-8', type: 'choix', palier: 3, piege: 'alternes-correspondants-confondus',
      consigne: 'Comment s\'appelle la paire formée par les angles 3 et 6 ?', enonce: 'Les angles 3 et 6.',
      figure: secante(60, { 3: 'a', 6: 'a' }), paire: [3, 6],
      choix: NATURES, attendu: 'aucune de ces paires',
      fausses: [{ valeur: 'alternes-internes', piege: 'alternes-correspondants-confondus' }],
    },
    {
      id: 'e-2-3-9', type: 'choix', palier: 3, piege: 'alternes-correspondants-confondus',
      consigne: 'Comment s\'appelle la paire formée par les angles 4 et 8 ?', enonce: 'Les angles 4 et 8.',
      figure: secante(60, { 4: 'c', 8: 'c' }), paire: [4, 8],
      choix: NATURES, attendu: 'correspondants',
      fausses: [{ valeur: 'alternes-internes', piege: 'alternes-correspondants-confondus' }],
    },
    {
      id: 'e-2-3-10', type: 'choix', palier: 3, piege: 'alternes-correspondants-confondus',
      consigne: 'Comment s\'appelle la paire formée par les angles 2 et 5 ?', enonce: 'Les angles 2 et 5.',
      figure: secante(60, { 2: 'b', 5: 'b' }), paire: [2, 5],
      choix: NATURES, attendu: 'aucune de ces paires',
      fausses: [{ valeur: 'correspondants', piege: 'alternes-correspondants-confondus' }],
    },
  ],

  problemes: [
    {
      id: 'p-2-3-1',
      enonce: 'Observe la figure : deux droites coupées par une sécante.',
      figure: secante(64),
      questions: [
        { texte: 'Combien de paires d\'angles alternes-internes compte-t-elle ?', attendu: 2, unite: 'paires' },
        { texte: 'Combien de paires d\'angles correspondants ?', attendu: 4, unite: 'paires' },
      ],
    },
    {
      id: 'p-2-3-2',
      enonce: 'Observe la figure, et réponds par un numéro d\'angle.',
      figure: secante(64),
      questions: [
        { texte: 'Quel angle est opposé par le sommet à l\'angle 6 ?', attendu: 8, unite: '' },
        { texte: 'Quel angle est alterne-interne avec l\'angle 3 ?', attendu: 5, unite: '' },
      ],
    },
    {
      id: 'p-2-3-3',
      enonce: 'Observe la figure, et réponds par un numéro d\'angle.',
      figure: secante(56),
      questions: [
        { texte: 'Quel angle est correspondant à l\'angle 7 ?', attendu: 3, unite: '' },
        { texte: 'Quel angle est correspondant à l\'angle 2 ?', attendu: 6, unite: '' },
      ],
    },
    {
      id: 'p-2-3-4',
      enonce: 'Observe la figure.',
      figure: secante(56),
      questions: [
        { texte: 'Combien d\'angles sont internes, entre (D) et (D\') ?', attendu: 4, unite: 'angles' },
        { texte: 'Combien d\'angles sont externes ?', attendu: 4, unite: 'angles' },
      ],
    },
    {
      id: 'p-2-3-5',
      enonce: 'Observe la figure, et réponds par un numéro d\'angle.',
      figure: secante(72),
      questions: [
        { texte: 'Quel angle est alterne-interne avec l\'angle 6 ?', attendu: 4, unite: '' },
        { texte: 'Quel angle est correspondant à l\'angle 4 ?', attendu: 8, unite: '' },
      ],
    },
  ],

  test: [
    {
      id: 't-2-3-1', type: 'choix', consigne: 'Comment s\'appelle la paire formée par les angles 4 et 6 ?', enonce: 'Les angles 4 et 6.',
      figure: secante(68, { 4: 'a', 6: 'a' }), paire: [4, 6], choix: NATURES, attendu: 'alternes-internes', revoir: 'definition',
    },
    {
      id: 't-2-3-2', type: 'choix', consigne: 'Comment s\'appelle la paire formée par les angles 1 et 5 ?', enonce: 'Les angles 1 et 5.',
      figure: secante(68, { 1: 'c', 5: 'c' }), paire: [1, 5], choix: NATURES, attendu: 'correspondants', revoir: 'definition',
    },
    {
      id: 't-2-3-3', type: 'choix', consigne: 'Comment s\'appelle la paire formée par les angles 5 et 7 ?', enonce: 'Les angles 5 et 7.',
      figure: secante(68, { 5: 'b', 7: 'b' }), paire: [5, 7], choix: NATURES, attendu: 'opposés par le sommet', revoir: 'remarque',
    },
    {
      id: 't-2-3-4', type: 'choix', consigne: 'Comment s\'appelle la paire formée par les angles 3 et 5 ?', enonce: 'Les angles 3 et 5.',
      figure: secante(54, { 3: 'a', 5: 'a' }), paire: [3, 5], choix: NATURES, attendu: 'alternes-internes', revoir: 'definition',
    },
    {
      id: 't-2-3-5', type: 'choix', consigne: 'Comment s\'appelle la paire formée par les angles 4 et 5 ?', enonce: 'Les angles 4 et 5.',
      figure: secante(54, { 4: 'b', 5: 'b' }), paire: [4, 5], choix: NATURES, attendu: 'aucune de ces paires', revoir: 'remarque',
    },
    {
      id: 't-2-3-6', type: 'choix', consigne: 'Comment s\'appelle la paire formée par les angles 2 et 6 ?', enonce: 'Les angles 2 et 6.',
      figure: secante(54, { 2: 'c', 6: 'c' }), paire: [2, 6], choix: NATURES, attendu: 'correspondants', revoir: 'definition',
    },
    { id: 't-2-3-7', type: 'calcul', consigne: 'Quel angle est alterne-interne avec l\'angle 5 ? Donne son numéro.', enonce: 'L\'angle 5.', figure: secante(62, { 5: 'a' }), attendu: 3, revoir: 'exemple' },
    { id: 't-2-3-8', type: 'calcul', consigne: 'Quel angle est correspondant à l\'angle 8 ? Donne son numéro.', enonce: 'L\'angle 8.', figure: secante(62, { 8: 'c' }), attendu: 4, revoir: 'exemple' },
    {
      id: 't-2-3-9', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Deux angles alternes-internes sont situés du même côté de la sécante.', attendu: false, revoir: 'definition',
    },
    {
      id: 't-2-3-10', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'De deux angles correspondants, l\'un est entre les deux droites et l\'autre à l\'extérieur.', attendu: true, revoir: 'definition',
    },
  ],
};
