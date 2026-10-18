// Lectura — « Tío Manuel en la Antártida » (Lecturas ELI, nivel 3, A1.1).
//
// D'après le livre lu en classe, transmis par Denis en PDF : l'histoire et ses
// « Páginas de actividades » (compléter et ordonner des phrases, la chanson,
// les objets de la page 2, les mots à ranger par catégorie, décrire les deux
// oncles avec tiene, es et lleva, compléter avec hay ou está). Le livre est
// protégé : on n'en recopie ni le texte ni les exercices. Le résumé et les
// phrases sont écrits pour l'appli, à partir de l'histoire ; seule la
// description des deux oncles reste proche du livre, puisque c'est le corrigé
// attendu de l'activité 5. Le livre appelle le garçon tantôt Javier, tantôt
// Jaime : l'appli dit Javier.
//
// Les mots de l'activité 4 (comida, ropa, lugares) sont tous là ; la
// description des oncles (activité 5) et hay / está (activité 6) ont chacun
// leur étape, et la description passe par Merlin : Denis veut qu'Antonin
// écrive, pas seulement qu'il choisisse.
//
// Les identifiants ne se renumérotent jamais : la progression y est rangée.

const COMPRENDRE = 'D\'après l\'histoire :';
const HAY_ESTA = 'Complète avec hay ou está :';

export default {
  id: 'l01',
  numero: '📖',
  surtitre: 'Lectura',
  titre: 'Tío Manuel en la Antártida',
  detail: 'La historia · Comida, ropa, lugares · Ser, tener, llevar · Hay o está',

  // Ce que Merlin sait du module quand il corrige un texte.
  profilMerlin: 'Élève de 5e, première année d\'espagnol (LV2). Lecture en classe : « Tío Manuel en la Antártida » '
    + '(niveau A1.1). Tío Manuel va en globo à la Antártida, avec les enfants Dina, Dana et Javier et le chien Gruñón, aider '
    + 'son frère tío Pablo : les pingüinos emperador ne peuvent pas marcher dans le barro pour aller pondre leurs huevos. '
    + 'Tío Manuel est alto y delgado, tiene el pelo gris y la nariz larga, lleva gafas. Tío Pablo est bajo y gordo, tiene '
    + 'el pelo rubio y rizado, lleva barba y bigote. Pour décrire : ser + adjectif (es alto), tener + parties du corps '
    + '(tiene el pelo gris, la nariz larga), llevar + ce qu\'on porte (lleva gafas, barba, bigote). Le cours de l\'élève dit '
    + '« lleva barba y bigote » ; « tiene barba y bigote », « tiene gafas » et « lleva el pelo rubio / gris » sont aussi '
    + 'corrects en espagnol : ne les compte jamais faux.',

  etapes: [
    // ── 1. L'histoire ────────────────────────────────────────────────────
    {
      id: 'l01-historia',
      titre: 'La historia',
      sousTitre: 'Qui, où, quoi : comprendre le livre',
      duree: 7,
      fiche: [
        {
          type: 'regle',
          titre: 'Los personajes — les personnages',
          lignes: [
            '**Tío Manuel**, l\'inventeur au **globo** (montgolfière). **Tío Pablo**, son **hermano** (frère), vit en Antártida et adore les **pingüinos**.',
            '**Dina**, **Dana** et **Javier** (que le livre appelle aussi Jaime) : les enfants. **Gruñón** : le **perro** (chien), qui n\'aime ni la neige ni les pingouins.',
            '**El señor Carter** : il fête ses **50 ans** en Antártida.',
          ],
        },
        {
          type: 'regle',
          titre: 'La historia en cinco pasos',
          lignes: [
            '1. Tío Pablo **téléphone** de l\'Antártida : il a besoin d\'aide, et de **la máquina de nieve** (la machine à neige).',
            '2. Tous partent en **globo**, avec des vêtements chauds. En chemin, ils voient **una selva**, **una montaña** et **una isla**.',
            '3. Le problème : une partie du chemin est en **barro** (boue), pas en **nieve** (neige). Les **pingüinos emperador** ne peuvent pas y marcher pour aller pondre leurs **huevos** (œufs). La machine fait de la neige.',
            '4. Le lendemain, des hommes refont de la boue : c\'est une piste pour les **aviones** du **señor Carter**, qui veut faire sa **fiesta de cumpleaños**.',
            '5. Le señor Carter veut aider : les pingouins voyagent **en avión** jusqu\'au lieu où ils pondent, près de **tres rocas**. Puis c\'est la fête.',
          ],
        },
      ],
      items: [
        {
          id: 'tm-pablo-donde', type: 'choix', consigne: COMPRENDRE, phrase: 'Tío Pablo llama por teléfono desde ___.',
          options: ['la Antártida', 'México', 'África'], es: 'la Antártida',
          explication: 'Tío Pablo vit en Antártida, avec les pingouins.',
        },
        {
          id: 'tm-pablo-hermano', type: 'choix', consigne: COMPRENDRE, phrase: 'Tío Manuel y tío Pablo son ___.',
          options: ['hermanos', 'padre e hijo', 'vecinos'], es: 'hermanos',
          explication: 'Los hermanos : les frères. Tío Pablo est le frère de tío Manuel.',
        },
        {
          id: 'tm-necesita', type: 'choix', consigne: COMPRENDRE, phrase: 'Tío Pablo necesita ___.',
          options: ['la máquina de nieve', 'un globo nuevo', 'un perro'], es: 'la máquina de nieve',
          explication: 'La máquina de nieve : la machine à neige de tío Manuel.',
        },
        {
          id: 'tm-viaje', type: 'choix', consigne: COMPRENDRE, phrase: 'Para ir a la Antártida, viajan en ___.',
          options: ['globo', 'barco', 'tren'], es: 'globo',
          explication: 'El globo : la montgolfière de tío Manuel.',
        },
        {
          id: 'tm-grunon', type: 'choix', consigne: COMPRENDRE, phrase: 'Gruñón es ___.',
          options: ['el perro', 'un pingüino', 'el señor Carter'], es: 'el perro',
          explication: 'Gruñón, le chien grognon : il n\'aime ni la neige ni les pingouins.',
        },
        {
          id: 'tm-camino-barro', type: 'choix', consigne: COMPRENDRE, phrase: 'Los pingüinos no pueden caminar en el ___.',
          options: ['barro', 'nieve', 'hielo'], es: 'barro',
          explication: 'El barro : la boue. Les pingouins marchent sur la neige et la glace, pas dans la boue.',
        },
        {
          id: 'tm-huevos', type: 'choix', consigne: COMPRENDRE, phrase: 'Los pingüinos van al lugar donde ponen los ___.',
          options: ['huevos', 'zapatos', 'globos'], es: 'huevos',
          explication: 'Los huevos : les œufs.',
        },
        {
          id: 'tm-maquina', type: 'choix', consigne: COMPRENDRE, phrase: 'Con la máquina de tío Manuel, el ___ se convierte en nieve.',
          options: ['agua', 'barro', 'fruta'], es: 'agua',
          explication: 'L\'eau devient de la neige : le sol redevient blanc.',
        },
        {
          id: 'tm-aviones', type: 'choix', consigne: COMPRENDRE, phrase: 'Los hombres del señor Carter preparan un terreno de barro para sus ___.',
          options: ['aviones', 'pingüinos', 'globos'], es: 'aviones',
          explication: 'Les avions ne peuvent pas atterrir sur la glace.',
        },
        {
          id: 'tm-carter', type: 'choix', consigne: COMPRENDRE, phrase: 'El señor Carter quiere celebrar su ___.',
          options: ['cumpleaños', 'boda', 'Navidad'], es: 'cumpleaños',
          explication: 'Il a 50 ans : une fête d\'anniversaire en Antártida.',
        },
        {
          id: 'tm-final', type: 'choix', consigne: COMPRENDRE, phrase: 'Al final, los pingüinos viajan en ___.',
          options: ['avión', 'barco', 'coche'], es: 'avión',
          explication: 'Le señor Carter les emmène en avion, et quelques-uns montent dans le globo.',
        },
      ],
    },

    // ── 2. Le vocabulaire ────────────────────────────────────────────────
    {
      id: 'l01-vocabulario',
      titre: 'El vocabulario',
      sousTitre: 'La comida, la ropa de abrigo, los lugares',
      duree: 7,
      fiche: [
        {
          type: 'vocabulaire',
          titre: 'La comida — dans les caisses du señor Carter',
          mots: [
            { es: 'la sopa', fr: 'la soupe', emoji: '🍲' },
            { es: 'el bocadillo', fr: 'le sandwich', emoji: '🥪' },
            { es: 'la fruta', fr: 'les fruits', emoji: '🍎' },
            { es: 'los dulces', fr: 'les sucreries', emoji: '🍬' },
            { es: 'la pasta', fr: 'les pâtes', emoji: '🍝' },
            { es: 'las salchichas', fr: 'les saucisses', emoji: '🌭' },
          ],
        },
        {
          type: 'vocabulaire',
          titre: 'La ropa de abrigo — les vêtements chauds',
          mots: [
            { es: 'el jersey', fr: 'le pull' },
            { es: 'el abrigo', fr: 'le manteau', emoji: '🧥' },
            { es: 'los guantes', fr: 'les gants', emoji: '🧤' },
            { es: 'la bufanda', fr: 'l\'écharpe', emoji: '🧣' },
          ],
        },
        {
          type: 'vocabulaire',
          titre: 'Los lugares — vus du globo',
          mots: [
            { es: 'la selva', fr: 'la forêt tropicale', emoji: '🌴' },
            { es: 'la montaña', fr: 'la montagne', emoji: '⛰️' },
            { es: 'la isla', fr: 'l\'île', emoji: '🏝️' },
            { es: 'el mar', fr: 'la mer', emoji: '🌊' },
          ],
        },
        {
          type: 'vocabulaire',
          titre: 'Las palabras de la historia',
          mots: [
            { es: 'el globo', fr: 'la montgolfière', emoji: '🎈' },
            { es: 'la nieve', fr: 'la neige', emoji: '❄️' },
            { es: 'el hielo', fr: 'la glace', emoji: '🧊' },
            { es: 'el barro', fr: 'la boue' },
            { es: 'el pingüino', fr: 'le pingouin', emoji: '🐧' },
            { es: 'el huevo', fr: 'l\'œuf', emoji: '🥚' },
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**la fruta** = les fruits, **la pasta** = les pâtes : on les dit d\'habitude au singulier en espagnol.',
            '**pingüino** : le tréma sur le **ü** fait entendre le **u** (« pin-goui-no »).',
            '**la nieve** = la neige, **el hielo** = la glace : ne les confonds pas.',
          ],
        },
      ],
      items: [
        { id: 'tm-sopa', type: 'mot', fr: 'la soupe', emoji: '🍲', es: 'la sopa' },
        { id: 'tm-bocadillo', type: 'mot', fr: 'le sandwich', emoji: '🥪', es: 'el bocadillo', accepte: ['el sándwich', 'el sandwich'] },
        { id: 'tm-fruta', type: 'mot', fr: 'les fruits', emoji: '🍎', es: 'la fruta', accepte: ['las frutas'], note: 'On dit d\'habitude au singulier : la fruta.' },
        { id: 'tm-dulces', type: 'mot', fr: 'les sucreries', emoji: '🍬', es: 'los dulces', accepte: ['las golosinas', 'los caramelos'] },
        { id: 'tm-pasta', type: 'mot', fr: 'les pâtes', emoji: '🍝', es: 'la pasta', note: 'Un singulier en espagnol : la pasta.' },
        { id: 'tm-salchichas', type: 'mot', fr: 'les saucisses', emoji: '🌭', es: 'las salchichas' },
        { id: 'tm-jersey', type: 'mot', fr: 'le pull', es: 'el jersey', accepte: ['el suéter'] },
        { id: 'tm-abrigo', type: 'mot', fr: 'le manteau', emoji: '🧥', es: 'el abrigo' },
        { id: 'tm-guantes', type: 'mot', fr: 'les gants', emoji: '🧤', es: 'los guantes' },
        { id: 'tm-bufanda', type: 'mot', fr: 'l\'écharpe', emoji: '🧣', es: 'la bufanda' },
        { id: 'tm-selva', type: 'mot', fr: 'la forêt tropicale', emoji: '🌴', es: 'la selva', accepte: ['la selva tropical'] },
        { id: 'tm-montana', type: 'mot', fr: 'la montagne', emoji: '⛰️', es: 'la montaña' },
        { id: 'tm-isla', type: 'mot', fr: 'l\'île', emoji: '🏝️', es: 'la isla' },
        { id: 'tm-mar', type: 'mot', fr: 'la mer', emoji: '🌊', es: 'el mar', note: 'Masculin en espagnol : el mar.' },
        { id: 'tm-globo', type: 'mot', fr: 'la montgolfière', emoji: '🎈', es: 'el globo', accepte: ['el globo aerostático'] },
        {
          id: 'tm-nieve', type: 'mot', fr: 'la neige', emoji: '❄️', es: 'la nieve',
          pieges: [{ si: 'el hielo', message: 'El hielo, c\'est la glace. La neige : la nieve.' }],
        },
        {
          id: 'tm-hielo', type: 'mot', fr: 'la glace', emoji: '🧊', es: 'el hielo',
          pieges: [{ si: 'la nieve', message: 'La nieve, c\'est la neige. La glace : el hielo.' }],
        },
        { id: 'tm-barro', type: 'mot', fr: 'la boue', es: 'el barro', accepte: ['el lodo'] },
        { id: 'tm-pinguino', type: 'mot', fr: 'le pingouin', emoji: '🐧', es: 'el pingüino', note: 'Avec le tréma : pingüino.' },
        { id: 'tm-huevo', type: 'mot', fr: 'l\'œuf', emoji: '🥚', es: 'el huevo' },
      ],
    },

    // ── 3. Décrire, et situer ────────────────────────────────────────────
    {
      id: 'l01-describir',
      titre: 'Describir y situar',
      sousTitre: 'Ser, tener, llevar · Hay o está',
      duree: 6,
      fiche: [
        {
          type: 'regle',
          titre: 'Los dos tíos son diferentes',
          lignes: [
            '**Tío Manuel** : alto · delgado · el pelo gris · la nariz larga · gafas.',
            '**Tío Pablo** : bajo · gordo · el pelo rubio y rizado · barba y bigote.',
          ],
        },
        {
          type: 'regle',
          titre: 'Trois verbes pour décrire',
          lignes: [
            '**ser** + adjectif : la silhouette — *es alto, es gordo*.',
            '**tener** + une partie du corps : *tiene el pelo gris, tiene la nariz larga*.',
            '**llevar** + ce qu\'on porte : *lleva gafas, lleva un abrigo* — et, dans le livre, *lleva barba y bigote*.',
          ],
        },
        {
          type: 'regle',
          titre: 'Hay ou está ?',
          lignes: [
            '**hay** = il y a : on dit qu\'une chose **existe** quelque part, sans article défini — *En el globo hay una máquina de nieve.*',
            '**está** = est, se trouve : on dit **où** est une chose précise, ou **comment** elle est en ce moment — *Gruñón está en la puerta. Tío Pablo está contento.*',
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Devant **un, una, unos, unas**, **mucho(s)**, un nombre ou un nom sans article : **hay**. Devant **el, la, los, las**, un prénom, un nom de ville ou de pays : **está** (au pluriel : **están**).',
          ],
        },
      ],
      items: [
        {
          id: 'tm-manuel-es', type: 'choix', consigne: 'Choisis le bon verbe :', phrase: 'Tío Manuel ___ alto y delgado.',
          options: ['es', 'tiene', 'lleva'], es: 'es',
          explication: 'Ser + adjectif pour la silhouette : es alto.',
        },
        {
          id: 'tm-manuel-tiene', type: 'choix', consigne: 'Choisis le bon verbe :', phrase: 'Tío Manuel ___ la nariz larga.',
          options: ['tiene', 'es', 'está'], es: 'tiene',
          explication: 'Tener + une partie du corps : tiene la nariz larga.',
        },
        {
          id: 'tm-manuel-lleva', type: 'choix', consigne: 'Choisis le bon verbe :', phrase: 'Tío Manuel ___ gafas.',
          options: ['lleva', 'es', 'está'], es: 'lleva',
          explication: 'Llevar + ce qu\'on porte : lleva gafas.',
        },
        {
          id: 'tm-pablo-es', type: 'choix', consigne: 'Choisis le bon verbe :', phrase: 'Tío Pablo ___ bajo y gordo.',
          options: ['es', 'tiene', 'lleva'], es: 'es',
          explication: 'Ser + adjectif : es bajo y gordo.',
        },
        {
          id: 'tm-pablo-pelo', type: 'choix', consigne: 'Choisis le bon verbe :', phrase: 'Tío Pablo ___ el pelo rubio y rizado.',
          options: ['tiene', 'es', 'está'], es: 'tiene',
          explication: 'Tener + el pelo : tiene el pelo rubio y rizado.',
        },
        {
          id: 'tm-son', type: 'trou', phrase: 'Tío Manuel y tío Pablo ___ diferentes.', verbe: 'ser', es: 'son',
          pieges: [{ si: 'es', message: 'Ils sont deux : ellos son.' }],
        },
        { id: 'tm-lleva-abrigo', type: 'trou', phrase: 'Los niños ___ abrigos y bufandas.', verbe: 'llevar', es: 'llevan' },
        {
          id: 'tm-hay-isla', type: 'trou', consigne: HAY_ESTA, phrase: 'Desde el globo, los niños ven que allí ___ una isla.', es: 'hay',
          pieges: [{ si: ['está', 'esta'], message: 'Une île, sans article défini : on dit qu\'elle existe → hay.' }],
        },
        {
          id: 'tm-esta-antartida', type: 'trou', consigne: HAY_ESTA, phrase: 'La casa de tío Pablo ___ en la Antártida.', es: 'está',
          pieges: [{ si: 'hay', message: 'La casa de tío Pablo, une chose précise avec « la » : on dit où elle est → está.' }],
        },
        {
          id: 'tm-hay-pinguinos', type: 'trou', consigne: HAY_ESTA, phrase: 'En la Antártida ___ muchos pingüinos.', es: 'hay',
          pieges: [{ si: ['está', 'están'], message: 'Muchos pingüinos, sans article défini : il y en a → hay.' }],
        },
        {
          id: 'tm-esta-manuel', type: 'trou', consigne: HAY_ESTA, phrase: 'Tío Manuel ___ en el globo con los niños.', es: 'está',
          pieges: [{ si: 'hay', message: 'Tío Manuel, une personne précise : on dit où il est → está.' }],
        },
        {
          id: 'tm-hay-cajas', type: 'trou', consigne: HAY_ESTA, phrase: 'Para la fiesta, ___ salchichas y pasta.', es: 'hay',
          pieges: [{ si: ['está', 'esta', 'están'], message: 'Des saucisses et des pâtes, sans article : il y en a → hay.' }],
        },
      ],
    },

    // ── 4. Écrire ────────────────────────────────────────────────────────
    {
      id: 'l01-escribir',
      titre: 'Escribir',
      sousTitre: 'Décrire les deux oncles — corrigé par Merlin',
      duree: 6,
      fiche: [
        {
          type: 'regle',
          titre: 'Pour décrire quelqu\'un',
          lignes: [
            '**es** + adjectif · **tiene** + el pelo / la nariz · **lleva** + gafas, barba, bigote.',
            'Les adjectifs : alto ≠ bajo · delgado ≠ gordo · el pelo gris, rubio, rizado, liso · la nariz larga.',
            'Pour relier : **y** (et), **pero** (mais), **también** (aussi).',
          ],
        },
      ],
      items: [
        {
          id: 'tm-esc-tios', type: 'decrire', sujet: 'Tío Manuel y tío Pablo', emoji: '👴',
          indices: ['es alto / bajo', 'es delgado / gordo', 'tiene el pelo…', 'tiene la nariz larga', 'lleva gafas', 'lleva barba y bigote'],
          consigne: 'Décris tío Manuel, puis tío Pablo : es pour la silhouette, puis tiene ou lleva. Au moins deux phrases pour chacun.',
          titreModele: 'Un modèle',
          modele: 'Tío Manuel es alto y delgado. Tiene el pelo gris y la nariz larga. Lleva gafas. Tío Pablo es bajo y gordo. Tiene el pelo rubio y rizado. Lleva barba y bigote.',
          criteres: [
            { id: 'manuel-es', texte: 'Tío Manuel : es + des adjectifs justes (alto, delgado)' },
            { id: 'manuel-tiene-lleva', texte: 'Tío Manuel : tiene (el pelo gris, la nariz larga) ou lleva (gafas)' },
            { id: 'pablo-es', texte: 'Tío Pablo : es + des adjectifs justes (bajo, gordo)' },
            { id: 'pablo-tiene-lleva', texte: 'Tío Pablo : tiene (el pelo rubio y rizado) ou lleva (barba, bigote)' },
          ],
        },
      ],
    },
  ],

  // ── La mini-interro ─────────────────────────────────────────────────────
  // Tirée des étapes 1 à 3, sans indice ni seconde chance.
  interro: {
    duree: 3,
    tirage: [
      { etape: 'l01-historia', nombre: 4 },
      { etape: 'l01-vocabulario', nombre: 4 },
      { etape: 'l01-describir', nombre: 2 },
    ],
  },
};
