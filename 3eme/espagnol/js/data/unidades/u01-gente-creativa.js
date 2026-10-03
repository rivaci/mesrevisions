// Unidad 1 — « Gente creativa » : le Mexique, ses objets, ses vêtements, Frida Kahlo.
//
// D'après le manuel d'Evan, pages 10 à 23, et la liste des objectifs de
// l'« Evaluación de secuencia » donnée par sa professeure : pronoms COI et leur
// combinaison avec les COD, démonstratifs, cuál et cuánto, la durée, « no
// solo…, sino que », les vêtements, les achats, les matériaux et les objets,
// les œuvres d'art, llevar / llevarse, poner / ponerse ; et pour la culture, le
// Día de Muertos, Frida Kahlo et ses vêtements, El camión. L'artisanat (« La
// Ventana », p. 22-23) n'est pas dans la liste : il n'est pas repris.
//
// Les démonstratifs s'arrêtent à este et ese : le manuel n'a vu que la
// première partie (« Les démonstratifs (I) ») ; aquel viendra plus tard.
//
// Les phrases sont écrites pour l'appli, sur le modèle des exercices du livre
// — le dépôt est public, on n'y recopie pas le manuel.
//
// Les identifiants ne se renumérotent jamais : la progression y est rangée.

const DESDE = 'Complète avec desde, desde que ou desde hace :';
const COD = 'Complète avec lo, la, los ou las :';
const COI = 'Complète avec le pronom COI (me, te, le, nos, os, les) :';
const PRONOMS = 'Remplace le COD et le COI par des pronoms :';
const DEMOSTRATIVO = 'Complète avec un démonstratif (este ou ese, accordé) :';
const CUANTO = 'Complète avec cuánto, cuánta, cuántos ou cuántas :';
const ORDRE = 'Remets les mots dans l\'ordre :';
const NO_SOLO = 'Relie les deux phrases avec no solo…, sino que (también) :';

export default {
  id: 'u01',
  numero: 1,
  titre: 'Gente creativa',
  detail: 'México · Mis cosas · De compras · Frida Kahlo',

  // Ce que Merlin sait de l'unité quand il corrige un écrit.
  profilMerlin: 'Élève de 3e, troisième année d\'espagnol (LV2). Unité en cours : « Gente creativa » (le Mexique) — '
    + 'décrire ses objets, acheter des vêtements, Frida Kahlo et son tableau El camión. Grammaire de l\'unité : pronoms '
    + 'COD et COI et leur combinaison (se lo, se la), démonstratifs este et ese, cuál et cuánto, la durée (desde, '
    + 'desde que, desde hace, hace … que), no solo…, sino que (también), llevar et llevarse, poner et ponerse.',

  seances: [
    { numero: 1, lecon: 'Lección 1', titre: 'Mis cosas' },
    { numero: 2, lecon: 'Lección 2', titre: 'La ropa y las compras' },
    { numero: 3, lecon: 'Lección 3', titre: 'Frida Kahlo' },
  ],

  etapes: [
    // ═══ Séance 1 — Lección 1 : mis cosas ═══════════════════════════════════

    {
      id: 'u01-cosas',
      seance: 1,
      titre: 'Los objetos',
      sousTitre: 'Les objets qu\'on aime, et à quoi ils servent',
      duree: 5,
      fiche: [
        {
          type: 'vocabulaire',
          titre: 'Mis cosas favoritas',
          mots: [
            { es: 'el libro', fr: 'le livre', emoji: '📖' },
            { es: 'el puf', fr: 'le pouf' },
            { es: 'la cámara de fotos', fr: 'l\'appareil photo', emoji: '📷' },
            { es: 'la pulsera', fr: 'le bracelet' },
            { es: 'el pasaporte', fr: 'le passeport' },
            { es: 'la taza', fr: 'la tasse', emoji: '☕' },
            { es: 'el gorro', fr: 'le bonnet' },
            { es: 'la joya', fr: 'le bijou', emoji: '💍' },
            { es: 'el marco de madera', fr: 'le cadre en bois', emoji: '🖼️' },
          ],
        },
        {
          type: 'vocabulaire',
          titre: 'En clase',
          mots: [
            { es: 'el lápiz', fr: 'le crayon', emoji: '✏️' },
            { es: 'el bolígrafo, el boli', fr: 'le stylo', emoji: '🖊️' },
            { es: 'la libreta', fr: 'le carnet', emoji: '📒' },
            { es: 'el estuche', fr: 'la trousse' },
            { es: 'la regla', fr: 'la règle', emoji: '📏' },
            { es: 'el póster', fr: 'le poster' },
            { es: 'la pizarra', fr: 'le tableau (de la classe)' },
          ],
        },
        {
          type: 'vocabulaire',
          titre: 'Para hablar de tus cosas',
          mots: [
            { es: 'regalar', fr: 'offrir (un cadeau)', emoji: '🎁' },
            { es: 'cuidar', fr: 'prendre soin de' },
            { es: 'usar, utilizar', fr: 'utiliser' },
            { es: 'cómodo, cómoda', fr: 'confortable' },
            { es: 'varios, varias', fr: 'plusieurs' },
            { es: 'quedar bien, quedar mal', fr: 'être réussi, être raté (une création)' },
            { es: 'ponerse (la ropa)', fr: 'mettre (un vêtement)' },
          ],
        },
        {
          type: 'regle',
          lignes: [
            '**para** + infinitif dit à quoi sert un objet : *Uso la taza para desayunar.*',
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**el lápiz** = le crayon ; le stylo, c\'est **el bolígrafo** (el boli).',
            '**la libreta** = le carnet ; la librairie, c\'est *la librería*.',
            '**el gorro** = le bonnet ; **la gorra** = la casquette.',
          ],
        },
      ],
      items: [
        { id: 'cos-libro', type: 'mot', fr: 'le livre', emoji: '📖', es: 'el libro' },
        { id: 'cos-camara', type: 'mot', fr: 'l\'appareil photo', emoji: '📷', es: 'la cámara de fotos', accepte: ['la cámara'] },
        { id: 'cos-pulsera', type: 'mot', fr: 'le bracelet', es: 'la pulsera', note: 'Féminin en espagnol : la pulsera.' },
        { id: 'cos-taza', type: 'mot', fr: 'la tasse', emoji: '☕', es: 'la taza' },
        {
          id: 'cos-gorro', type: 'mot', fr: 'le bonnet', es: 'el gorro',
          pieges: [{ si: 'la gorra', message: 'La gorra, c\'est la casquette. Le bonnet : el gorro.' }],
        },
        { id: 'cos-joya', type: 'mot', fr: 'le bijou', emoji: '💍', es: 'la joya', note: 'Féminin en espagnol : la joya.' },
        { id: 'cos-marco', type: 'mot', fr: 'le cadre en bois', emoji: '🖼️', es: 'el marco de madera' },
        {
          id: 'cos-lapiz', type: 'mot', fr: 'le crayon', emoji: '✏️', es: 'el lápiz',
          pieges: [{ si: ['el bolígrafo', 'el boli'], message: 'El bolígrafo, c\'est le stylo. Le crayon : el lápiz.' }],
        },
        {
          id: 'cos-boligrafo', type: 'mot', fr: 'le stylo', emoji: '🖊️', es: 'el bolígrafo', accepte: ['el boli'],
          pieges: [{ si: 'el lápiz', message: 'El lápiz, c\'est le crayon. Le stylo : el bolígrafo, ou el boli.' }],
        },
        { id: 'cos-libreta', type: 'mot', fr: 'le carnet', emoji: '📒', es: 'la libreta', note: 'Féminin en espagnol : la libreta.' },
        { id: 'cos-estuche', type: 'mot', fr: 'la trousse', es: 'el estuche', note: 'Masculin en espagnol : el estuche.' },
        { id: 'cos-regla', type: 'mot', fr: 'la règle', emoji: '📏', es: 'la regla' },
        { id: 'cos-regalar', type: 'mot', fr: 'offrir (un cadeau)', emoji: '🎁', es: 'regalar' },
        { id: 'cos-cuidar', type: 'mot', fr: 'prendre soin de', es: 'cuidar' },
        { id: 'cos-comodo', type: 'adjectif', fr: 'confortable', es: 'cómodo', fem: 'cómoda' },
        {
          id: 'cos-para', type: 'trou', consigne: 'Complète :', phrase: 'Uso la taza ___ desayunar.', es: 'para',
          explication: 'Para + infinitif : à quoi sert l\'objet.',
          pieges: [{ si: 'por', message: 'À quoi sert un objet : para + infinitif. Uso la taza para desayunar.' }],
        },
      ],
    },

    {
      id: 'u01-manualidades',
      seance: 1,
      titre: 'La Frida-Catrina',
      sousTitre: 'Les matériaux, le bricolage, et le Día de Muertos',
      duree: 4,
      fiche: [
        {
          type: 'vocabulaire',
          titre: 'Los materiales',
          mots: [
            { es: 'la madera', fr: 'le bois' },
            { es: 'el plástico', fr: 'le plastique' },
            { es: 'el papel', fr: 'le papier' },
            { es: 'el cartón', fr: 'le carton' },
            { es: 'la pintura', fr: 'la peinture', emoji: '🎨' },
            { es: 'el pegamento', fr: 'la colle' },
            { es: 'las tijeras', fr: 'les ciseaux', emoji: '✂️' },
            { es: 'la bola de unicel', fr: 'la boule de polystyrène (au Mexique)' },
            { es: 'el listón', fr: 'le ruban (au Mexique ; en Espagne, la cinta)' },
          ],
        },
        {
          type: 'vocabulaire',
          titre: 'Las manualidades',
          mots: [
            { es: 'dibujar', fr: 'dessiner' },
            { es: 'pintar', fr: 'peindre' },
            { es: 'pegar', fr: 'coller' },
            { es: 'cortar', fr: 'découper' },
            { es: 'decorar', fr: 'décorer' },
            { es: 'doblar', fr: 'plier' },
            { es: 'añadir, agregar', fr: 'ajouter' },
            { es: 'secarse', fr: 'sécher' },
            { es: 'servir para', fr: 'servir à' },
          ],
        },
        {
          type: 'regle',
          titre: 'El Día de Muertos',
          lignes: [
            'Au Mexique, on le célèbre le **1er novembre** pour honorer les morts, avec des **altares**, des **flores** et des **velas** (bougies) dans les **cementerios**.',
            'Ce n\'est **pas une fête triste** : on y **célèbre la vie**, et on **se moque de la mort** (*se burlan de la muerte*) avec des **calaveras** (têtes de mort) et des **esqueletos**.',
            'La **Catrina** est une femme-squelette élégante ; la **Frida-Catrina** du tutoriel mélange Frida Kahlo et la Catrina.',
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**pegar** = coller ; **cortar** = découper ; **la pintura** = la peinture.',
            '**las tijeras** : toujours au pluriel, comme « les ciseaux ».',
            '**la madera** = le bois : féminin en espagnol.',
          ],
        },
      ],
      items: [
        { id: 'man-madera', type: 'mot', fr: 'le bois', es: 'la madera', note: 'Féminin en espagnol : la madera.' },
        { id: 'man-carton', type: 'mot', fr: 'le carton', es: 'el cartón' },
        { id: 'man-pintura', type: 'mot', fr: 'la peinture', emoji: '🎨', es: 'la pintura' },
        { id: 'man-pegamento', type: 'mot', fr: 'la colle', es: 'el pegamento', note: 'Masculin en espagnol : el pegamento.' },
        { id: 'man-tijeras', type: 'mot', fr: 'les ciseaux', emoji: '✂️', es: 'las tijeras' },
        { id: 'man-pintar', type: 'mot', fr: 'peindre', es: 'pintar' },
        { id: 'man-pegar', type: 'mot', fr: 'coller', es: 'pegar' },
        { id: 'man-cortar', type: 'mot', fr: 'découper', es: 'cortar' },
        { id: 'man-anadir', type: 'mot', fr: 'ajouter', es: 'añadir', accepte: ['agregar'] },
        { id: 'man-doblar', type: 'mot', fr: 'plier', es: 'doblar' },
        {
          id: 'man-sirven', type: 'trou', verbe: 'servir', phrase: 'Las tijeras ___ para cortar el cartón.', es: 'sirven',
          explication: 'Servir para : servir à. Les ciseaux sont plusieurs : sirven.',
          pieges: [
            { si: 'sirve', message: 'Las tijeras est un pluriel : sirven.' },
            { si: 'serven', message: 'Servir change de voyelle : sirve, sirven.' },
          ],
        },
        {
          id: 'dm-fecha', type: 'choix', consigne: 'Le Día de Muertos', phrase: '¿Cuándo se celebra el Día de Muertos en México?',
          options: ['el 31 de octubre', 'el 1 de noviembre', 'el 6 de enero'], es: 'el 1 de noviembre',
          explication: 'Le 1er novembre : on honore les morts avec des autels, des fleurs et des bougies.',
        },
        {
          id: 'dm-triste', type: 'choix', consigne: 'Vrai ou faux ?', phrase: 'El Día de Muertos es una fiesta triste.',
          options: ['Verdadero', 'Falso'], es: 'Falso',
          explication: 'Faux : les Mexicains honorent leurs morts, mais ils célèbrent aussi la vie et se moquent de la mort.',
        },
        {
          id: 'dm-calaveras', type: 'choix', consigne: 'Le Día de Muertos', phrase: '¿Para qué sirven las calaveras y los esqueletos en la fiesta?',
          options: ['para dar miedo a los niños', 'para burlarse de la muerte', 'para recordar a los españoles'], es: 'para burlarse de la muerte',
          explication: 'Avec les calaveras et les esqueletos, on se moque de la mort et on célèbre la vie.',
        },
        {
          id: 'dm-altares', type: 'choix', consigne: 'Le Día de Muertos', phrase: '¿Qué ponen los mexicanos en los altares?',
          options: ['flores y velas', 'zapatos y guantes', 'libros y lápices'], es: 'flores y velas',
          explication: 'Des fleurs et des bougies (velas), sur les autels, dans les cimetières.',
        },
        {
          id: 'dm-catrina', type: 'choix', consigne: 'Le Día de Muertos', phrase: '¿Qué es la Catrina?',
          options: ['una pintora mexicana', 'una fiesta de noviembre', 'un esqueleto de mujer elegante'], es: 'un esqueleto de mujer elegante',
          explication: 'La Catrina est une femme-squelette élégante, l\'image même du Día de Muertos.',
        },
      ],
    },

    {
      id: 'u01-duracion',
      seance: 1,
      titre: 'Desde hace…',
      sousTitre: 'Dire depuis quand, et les pronoms lo, la, los, las',
      duree: 5,
      fiche: [
        {
          type: 'regle',
          titre: 'Depuis… : desde, desde que, desde hace',
          lignes: [
            '**desde** + une date ou un moment : *Juego al baloncesto desde 2020.* *Estoy aquí desde el lunes.*',
            '**desde que** + un verbe conjugué : *Desde que tengo la cámara, hago fotos todos los días.*',
            '**desde hace** + une durée : *Tengo este puf desde hace diez años.*',
            '**hace** + une durée + **que** : *Hace diez años que tengo este puf.*',
            'Pour demander : *¿Desde cuándo lo tienes?* · *¿Cuánto tiempo hace que lo tienes?*',
          ],
        },
        {
          type: 'regle',
          titre: 'Rappel : lo, la, los, las',
          lignes: [
            'Ils remplacent l\'objet pour ne pas le répéter : *La cámara, la tengo desde 2022.* *Los libros, los leo en la cama.*',
            'Ils se placent **avant** le verbe conjugué — *La cuido mucho.* — et se collent à l\'infinitif : *Quiero comprarlo.*',
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Une **date** ou un moment → **desde** ; une **durée** (tres años, dos meses) → **desde hace** ; un **verbe** → **desde que**.',
            '*Hace dos años que lo tengo* : le verbe est au présent, comme dans « ça fait deux ans que je l\'ai ».',
          ],
        },
      ],
      items: [
        {
          id: 'dur-gorro', type: 'trou', consigne: DESDE, phrase: 'Tengo este gorro ___ dos años.', es: 'desde hace',
          pieges: [{ si: 'desde', message: 'Dos años est une durée : desde hace.' }],
        },
        {
          id: 'dur-2021', type: 'trou', consigne: DESDE, phrase: 'Colecciono pulseras ___ 2021.', es: 'desde',
          pieges: [{ si: 'desde hace', message: '2021 est une date : desde, tout seul.' }],
        },
        {
          id: 'dur-camara', type: 'trou', consigne: DESDE, phrase: '___ tengo la cámara, hago fotos todos los días.', es: 'Desde que',
          pieges: [{ si: 'desde', message: 'Un verbe conjugué suit (tengo) : desde que.' }],
        },
        {
          id: 'dur-pequena', type: 'trou', consigne: DESDE, phrase: 'Guadalupe hace pulseras ___ era pequeña.', es: 'desde que',
          pieges: [{ si: 'desde', message: 'Un verbe conjugué suit (era) : desde que.' }],
        },
        {
          id: 'dur-espanol', type: 'trou', consigne: DESDE, phrase: 'Estudio español ___ tres años.', es: 'desde hace',
          pieges: [{ si: 'desde', message: 'Tres años est une durée : desde hace.' }],
        },
        {
          id: 'dur-lunes', type: 'trou', consigne: DESDE, phrase: 'Mis primos están en México ___ el lunes.', es: 'desde',
          pieges: [{ si: 'desde hace', message: 'El lunes est un moment, pas une durée : desde.' }],
        },
        {
          id: 'dur-hace', type: 'trou', consigne: 'Complète :', phrase: '___ cinco años que tengo esta taza.', es: 'Hace',
          pieges: [{ si: 'desde hace', message: 'Avec « … que », la tournure est hace … que : Hace cinco años que tengo esta taza.' }],
        },
        {
          id: 'dur-trans-hace', type: 'transformer', consigne: 'Dis la même chose avec hace … que :',
          de: 'Tengo este puf desde hace diez años.', es: 'Hace diez años que tengo este puf.',
          explication: 'Hace + la durée + que, puis le verbe au présent.',
        },
        {
          id: 'dur-trans-desde', type: 'transformer', consigne: 'Dis la même chose avec desde hace :',
          de: 'Hace dos meses que tengo esta libreta.', es: 'Tengo esta libreta desde hace dos meses.',
          explication: 'Le verbe d\'abord, puis desde hace + la durée.',
        },
        {
          id: 'dur-cuanto', type: 'choix', consigne: 'Choisis le bon mot :', phrase: '¿___ tiempo hace que tienes tu cámara?',
          options: ['Cuándo', 'Cuánto', 'Cuál'], es: 'Cuánto',
          explication: 'Cuánto tiempo : combien de temps. Cuándo veut dire « quand ».',
        },
        { id: 'cod-camara', type: 'trou', consigne: COD, phrase: 'La cámara, ___ uso para hacer fotos.', es: 'la' },
        { id: 'cod-libros', type: 'trou', consigne: COD, phrase: 'Los libros, ___ leo en la cama.', es: 'los' },
        { id: 'cod-pasaporte', type: 'trou', consigne: COD, phrase: 'El pasaporte, ___ uso para viajar.', es: 'lo' },
        {
          id: 'cod-pulseras', type: 'trou', consigne: COD, phrase: 'Las pulseras, ___ hago yo.', es: 'las',
          pieges: [{ si: 'los', message: 'Las pulseras est féminin : las.' }],
        },
        {
          id: 'cod-infinitif', type: 'transformer', consigne: 'Remplace l\'objet par un pronom :',
          de: 'Quiero comprar el puf.', es: 'Quiero comprarlo.', accepte: ['Lo quiero comprar.'],
          explication: 'Avec un infinitif, le pronom se colle à la fin — quiero comprarlo — ou se met devant : lo quiero comprar.',
        },
      ],
    },

    {
      id: 'u01-escribir-objeto',
      seance: 1,
      titre: 'Mi objeto favorito',
      sousTitre: 'Écrire : présenter un objet, comme au contrôle',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Pour présenter un objet',
          lignes: [
            '**Qué es** : *Mi objeto favorito es mi cámara de fotos.*',
            '**Para qué** : *La uso para hacer fotos de mis amigos.*',
            '**Desde cuándo** : *La tengo desde hace tres años.* — ou *Hace tres años que la tengo.*',
            '**Quién te lo regaló** : *Me la regaló mi abuela.* — me (à moi) + la (la cámara).',
            '**Cómo es** : *Es muy cómoda. La cuido mucho.*',
          ],
        },
      ],
      items: [
        {
          id: 'esc-objeto', type: 'decrire', sujet: 'Mi objeto favorito', emoji: '📷',
          indices: ['¿Qué es?', '¿Para qué lo usas?', '¿Desde cuándo lo tienes?', '¿Quién te lo regaló?'],
          consigne: 'Présente ton objet préféré en trois ou quatre phrases : ce que c\'est, à quoi il te sert, depuis quand tu l\'as, qui te l\'a offert.',
          titreModele: 'Un exemple',
          modele: 'Mi objeto favorito es mi cámara de fotos. La uso para hacer fotos de mis amigos. La tengo desde hace tres años: me la regaló mi abuela por mi cumpleaños.',
          criteres: [
            { id: 'objeto', texte: 'L\'objet est nommé : mi objeto favorito es…' },
            { id: 'para', texte: 'À quoi il sert, avec para + infinitif : la uso para hacer fotos' },
            { id: 'duracion', texte: 'Depuis quand, avec desde, desde hace ou hace … que, bien choisi : la tengo desde hace tres años' },
            { id: 'pronombres', texte: 'Un pronom juste à la place de l\'objet (lo, la…), ou COI + COD : me la regaló' },
          ],
        },
      ],
    },

    // ═══ Séance 2 — Lección 2 : la ropa y las compras ═══════════════════════

    {
      id: 'u01-ropa',
      seance: 2,
      titre: 'La ropa',
      sousTitre: 'Les vêtements et les accessoires',
      duree: 4,
      fiche: [
        {
          type: 'vocabulaire',
          titre: 'Las prendas',
          mots: [
            { es: 'la camiseta', fr: 'le tee-shirt', emoji: '👕' },
            { es: 'la camisa', fr: 'la chemise', emoji: '👔' },
            { es: 'los pantalones', fr: 'le pantalon', emoji: '👖' },
            { es: 'la falda', fr: 'la jupe' },
            { es: 'la blusa', fr: 'le chemisier', emoji: '👚' },
            { es: 'el vestido', fr: 'la robe', emoji: '👗' },
            { es: 'las medias', fr: 'les collants, les bas' },
            { es: 'el jersey', fr: 'le pull' },
            { es: 'el abrigo', fr: 'le manteau', emoji: '🧥' },
            { es: 'la chaqueta', fr: 'la veste' },
            { es: 'el chaleco', fr: 'le gilet' },
            { es: 'el peto', fr: 'la salopette' },
            { es: 'los calcetines', fr: 'les chaussettes', emoji: '🧦' },
            { es: 'los zapatos', fr: 'les chaussures', emoji: '👞' },
            { es: 'la ropa interior', fr: 'les sous-vêtements' },
          ],
        },
        {
          type: 'vocabulaire',
          titre: 'Los accesorios',
          mots: [
            { es: 'la bufanda', fr: 'l\'écharpe', emoji: '🧣' },
            { es: 'los guantes', fr: 'les gants', emoji: '🧤' },
            { es: 'el sombrero', fr: 'le chapeau', emoji: '👒' },
            { es: 'la bolsa', fr: 'le sac' },
            { es: 'el collar', fr: 'le collier' },
            { es: 'la pajarita', fr: 'le nœud papillon' },
            { es: 'el chal', fr: 'le châle' },
          ],
        },
        {
          type: 'vocabulaire',
          titre: 'Para describir la ropa',
          mots: [
            { es: 'sucio ≠ limpio', fr: 'sale ≠ propre' },
            { es: 'roto, rota', fr: 'déchiré(e)' },
            { es: 'corto ≠ largo', fr: 'court ≠ long' },
            { es: 'ir elegante', fr: 'être élégant(e)' },
            { es: 'ir descalzo, descalza', fr: 'être pieds nus' },
            { es: 'ir disfrazado de', fr: 'être déguisé en' },
          ],
        },
        {
          type: 'regle',
          titre: 'Los colores (révision)',
          lignes: [
            'blanco, negro, rojo, azul, verde, amarillo, gris, marrón, naranja, lila, rosa, morado ; **claro** ≠ **oscuro**.',
            'Ils s\'accordent : *una camiseta roja*, *unos zapatos marrones*.',
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**el abrigo** = le manteau ; **la bufanda** = l\'écharpe.',
            '**las medias** = les collants ; les chaussettes, ce sont **los calcetines**.',
            '**largo** = long — pas large.',
          ],
        },
      ],
      items: [
        { id: 'rop-abrigo', type: 'mot', fr: 'le manteau', emoji: '🧥', es: 'el abrigo' },
        { id: 'rop-bufanda', type: 'mot', fr: 'l\'écharpe', emoji: '🧣', es: 'la bufanda' },
        { id: 'rop-guantes', type: 'mot', fr: 'les gants', emoji: '🧤', es: 'los guantes' },
        {
          id: 'rop-calcetines', type: 'mot', fr: 'les chaussettes', emoji: '🧦', es: 'los calcetines',
          pieges: [{ si: 'las medias', message: 'Las medias, ce sont les collants. Les chaussettes : los calcetines.' }],
        },
        {
          id: 'rop-medias', type: 'mot', fr: 'les collants', es: 'las medias',
          pieges: [{ si: 'los calcetines', message: 'Los calcetines, ce sont les chaussettes. Les collants : las medias.' }],
        },
        { id: 'rop-vestido', type: 'mot', fr: 'la robe', emoji: '👗', es: 'el vestido', note: 'Masculin en espagnol : el vestido.' },
        {
          id: 'rop-camisa', type: 'mot', fr: 'la chemise', emoji: '👔', es: 'la camisa',
          pieges: [{ si: 'la camiseta', message: 'La camiseta, c\'est le tee-shirt. La chemise : la camisa.' }],
        },
        { id: 'rop-blusa', type: 'mot', fr: 'le chemisier', emoji: '👚', es: 'la blusa', note: 'Féminin en espagnol : la blusa.' },
        { id: 'rop-chaleco', type: 'mot', fr: 'le gilet', es: 'el chaleco' },
        { id: 'rop-peto', type: 'mot', fr: 'la salopette', es: 'el peto', note: 'Masculin en espagnol : el peto.' },
        { id: 'rop-collar', type: 'mot', fr: 'le collier', es: 'el collar' },
        { id: 'rop-bolsa', type: 'mot', fr: 'le sac', es: 'la bolsa', note: 'Féminin en espagnol : la bolsa.' },
        { id: 'rop-sucio', type: 'adjectif', fr: 'sale', es: 'sucio', fem: 'sucia' },
        { id: 'rop-roto', type: 'adjectif', fr: 'déchiré, déchirée', es: 'roto', fem: 'rota' },
      ],
    },

    {
      id: 'u01-pronombres',
      seance: 2,
      titre: 'Se lo doy',
      sousTitre: 'Les pronoms COI, et la combinaison COI + COD',
      duree: 6,
      fiche: [
        {
          type: 'vocabulaire',
          titre: 'Los pronombres COI',
          mots: [
            { es: 'me', fr: 'me, à moi' },
            { es: 'te', fr: 'te, à toi' },
            { es: 'le', fr: 'lui : à lui, à elle (à vous)' },
            { es: 'nos', fr: 'nous, à nous' },
            { es: 'os', fr: 'vous, à vous' },
            { es: 'les', fr: 'leur : à eux, à elles' },
          ],
        },
        {
          type: 'regle',
          titre: 'Le pronom COI',
          lignes: [
            'Quand la personne est nommée **avant** le verbe, le pronom est obligatoire : *A mi abuela **le** regalo una pulsera.*',
            'On le met aussi quand elle est nommée **après** : *La profesora **le** ha dado un premio a Lucía.*',
          ],
        },
        {
          type: 'regle',
          titre: 'COI + COD : se lo, se la',
          lignes: [
            'Le COI passe **avant** le COD : *¿Te gusta? **Me lo** ha regalado mi tía.*',
            '**le, les** + lo, la, los, las → **se** : *Le doy el abrigo* → ***Se lo** doy.* *Les llevo la ropa* → ***Se la** llevo.*',
            'Avec un **infinitif** ou un **impératif**, les pronoms se collent à la fin, avec un accent écrit : *Voy a dár**selo**.* *Regála**sela**.*',
            'Avec un infinitif, on peut aussi les mettre devant : *Se lo voy a dar* = *Voy a dárselo*.',
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**le lo**, **les la** n\'existent pas : devant lo, la, los, las, **le** et **les** deviennent **se**.',
            'D\'abord la personne (COI), ensuite la chose (COD) : *me lo*, *te la*, *se los* — jamais *lo me*.',
            'L\'accent écrit garde la syllabe forte : *da* → **dá**selo ; *regala* → re**gá**lasela.',
          ],
        },
      ],
      items: [
        { id: 'coi-abuela', type: 'trou', consigne: COI, phrase: 'A mi abuela ___ regalo una pulsera.', es: 'le' },
        {
          id: 'coi-primas', type: 'trou', consigne: COI, phrase: 'A mis primas ___ llevo la ropa del armario.', es: 'les',
          pieges: [{ si: 'le', message: 'Mis primas : plusieurs personnes, donc les.' }],
        },
        { id: 'coi-mi', type: 'trou', consigne: COI, phrase: '¿___ dejas tu bolígrafo, por favor? (à moi)', es: 'Me' },
        { id: 'coi-vosotros', type: 'trou', consigne: COI, phrase: 'Chicos, ___ traigo un regalo de México. (à vous)', es: 'os' },
        { id: 'coi-nosotros', type: 'trou', consigne: COI, phrase: 'La profesora ___ explica la lección. (à nous)', es: 'nos' },
        {
          id: 'comb-abrigo', type: 'transformer', consigne: PRONOMS, de: 'Le doy el abrigo a Luisito.', es: 'Se lo doy.',
          accepte: ['Se lo doy a Luisito.'], explication: 'le + lo → se lo.',
          pieges: [{ si: ['Le lo doy.', 'Le lo doy a Luisito.'], message: '« Le lo » n\'existe pas : le devient se devant lo. Se lo doy.' }],
        },
        {
          id: 'comb-ropa', type: 'transformer', consigne: PRONOMS, de: 'Les llevo la ropa a mis primas.', es: 'Se la llevo.',
          accepte: ['Se la llevo a mis primas.'], explication: 'les + la → se la.',
          pieges: [{ si: ['Les la llevo.', 'Les la llevo a mis primas.'], message: '« Les la » n\'existe pas : les devient se devant la. Se la llevo.' }],
        },
        {
          id: 'comb-guantes', type: 'transformer', consigne: PRONOMS, de: 'Doy los guantes a Javi.', es: 'Se los doy.',
          accepte: ['Se los doy a Javi.'], explication: 'À Javi → le, et le + los → se los.',
          pieges: [{ si: ['Le los doy.', 'Le los doy a Javi.'], message: '« Le los » n\'existe pas : le devient se devant los. Se los doy.' }],
        },
        {
          id: 'comb-imperatif', type: 'transformer', consigne: PRONOMS, de: 'Regala la pulsera a tu hermano.', es: 'Regálasela.',
          accepte: ['Regálasela a tu hermano.'],
          explication: 'À l\'impératif, les pronoms se collent au verbe — regala + se + la — avec un accent : regálasela.',
          pieges: [
            { si: ['Regalasela.', 'Regalasela a tu hermano.'], resultat: 'presque', message: 'C\'est la bonne forme, mais il faut l\'accent : regálasela.' },
            { si: ['Se la regala.', 'Se la regala a tu hermano.'], message: 'À l\'impératif, les pronoms se collent à la fin du verbe : regálasela.' },
          ],
        },
        {
          id: 'comb-infinitif', type: 'transformer', consigne: PRONOMS, de: 'Voy a dar el jersey a Luisito.', es: 'Voy a dárselo.',
          accepte: ['Se lo voy a dar.', 'Voy a dárselo a Luisito.', 'Se lo voy a dar a Luisito.'],
          explication: 'Avec un infinitif : voy a dárselo, ou se lo voy a dar.',
          pieges: [
            { si: ['Voy a darselo.', 'Voy a darselo a Luisito.'], resultat: 'presque', message: 'C\'est la bonne forme, mais il faut l\'accent : dárselo.' },
            { si: ['Le lo voy a dar.', 'Le lo voy a dar a Luisito.'], message: '« Le lo » n\'existe pas : se lo voy a dar, ou voy a dárselo.' },
          ],
        },
        {
          id: 'comb-tela', type: 'trou', consigne: 'Complète avec les deux pronoms :', phrase: '— ¿Me prestas tu libreta? — Sí, ___ presto.', es: 'te la',
          explication: 'Te (à toi) + la (la libreta) : la personne d\'abord.',
          pieges: [{ si: 'la te', message: 'La personne d\'abord, la chose ensuite : te la presto.' }],
        },
        {
          id: 'comb-ch-camisetas', type: 'choix', consigne: 'Choisis les bons pronoms :', phrase: 'Las camisetas, ___ doy a mis primas.',
          options: ['les las', 'se las', 'las les'], es: 'se las', explication: 'les + las → se las : se las doy.',
        },
        {
          id: 'comb-ch-pulsera', type: 'choix', consigne: 'Choisis les bons pronoms :', phrase: '¿Te gusta mi pulsera? ___ ha regalado mi tía.',
          options: ['La me', 'Me la', 'Se la'], es: 'Me la', explication: 'Me (à moi) + la (la pulsera) : la personne d\'abord.',
        },
      ],
    },

    {
      id: 'u01-compras',
      seance: 2,
      titre: 'De compras',
      sousTitre: 'Este et ese, qué, cuál, cuánto, llevarse, ponerse',
      duree: 5,
      fiche: [
        {
          type: 'vocabulaire',
          titre: 'En la tienda',
          mots: [
            { es: '¿Me puedo probar esta camiseta?', fr: 'Je peux essayer ce tee-shirt ?' },
            { es: '¿Me queda bien?', fr: 'Ça me va bien ?' },
            { es: 'Te queda grande.', fr: 'C\'est trop grand pour toi.' },
            { es: '¿De qué talla es?', fr: 'C\'est quelle taille ?' },
            { es: '¿Lo tiene en otro color?', fr: 'Vous l\'avez dans une autre couleur ?' },
            { es: '¿Me puede enseñar el negro?', fr: 'Vous pouvez me montrer le noir ?' },
            { es: '¿Cuánto cuesta? ¿Cuánto cuestan?', fr: 'Combien il coûte ? Combien ils coûtent ?' },
            { es: 'Me lo llevo. Me los llevo.', fr: 'Je le prends. Je les prends.' },
            { es: 'el tianguis', fr: 'le marché (au Mexique ; en Espagne, el mercadillo)' },
          ],
        },
        {
          type: 'regle',
          titre: 'Los demostrativos',
          lignes: [
            '**este, esta, estos, estas** : ce…-ci, près de celui qui parle — *Este gorro me encanta.*',
            '**ese, esa, esos, esas** : ce…-là, près de celui qui écoute, ou loin des deux — *¿Me puedo probar esa chaqueta?*',
            'Pour le temps présent : *esta semana*, *este fin de semana*.',
          ],
        },
        {
          type: 'regle',
          titre: '¿Qué?, ¿cuál?, ¿cuánto?',
          lignes: [
            '**qué** + un nom : *¿Qué bufanda te gusta más?*',
            '**cuál, cuáles**, sans nom : *¿Cuál te gusta más?* *¿Cuáles te llevas?*',
            '**cuánto** s\'accorde avec le nom : *¿Cuánto dinero? ¿Cuánta ropa? ¿Cuántos guantes? ¿Cuántas camisetas?*',
          ],
        },
        {
          type: 'regle',
          titre: 'Llevar o llevarse, poner o ponerse',
          lignes: [
            '**llevar** : porter (un vêtement) — *Rubén lleva un sombrero.*',
            '**llevarse** : prendre, acheter — *Me gusta, me lo llevo.*',
            '**poner** : mettre (un objet quelque part) — *Pon tus cosas en la mesa.*',
            '**ponerse** : mettre (un vêtement sur soi) — *No sé qué ponerme.*',
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**cuánto** = combien ; **cuándo** = quand.',
            '**cuál** ne se met jamais devant un nom : *¿Qué camiseta?*, mais *¿Cuál?*',
          ],
        },
      ],
      items: [
        {
          id: 'dem-esta', type: 'trou', consigne: DEMOSTRATIVO, phrase: '___ camiseta que llevo es nueva. (près de moi)', es: 'Esta',
          pieges: [{ si: 'este', message: 'Camiseta est féminin : esta.' }],
        },
        {
          id: 'dem-esos', type: 'trou', consigne: DEMOSTRATIVO, phrase: '¿Me puedo probar ___ pantalones que tienes en la mano? (près de toi)', es: 'esos',
          pieges: [{ si: 'estos', message: 'Près de celui qui écoute : esos.' }],
        },
        { id: 'dem-este', type: 'trou', consigne: DEMOSTRATIVO, phrase: '___ fin de semana me voy al tianguis.', es: 'Este' },
        {
          id: 'int-que', type: 'choix', consigne: 'Choisis le bon mot :', phrase: '¿___ bufanda te gusta más, la gris o la rosa?',
          options: ['Cuál', 'Qué', 'Cuánta'], es: 'Qué', explication: 'Devant un nom, on emploie qué : ¿Qué bufanda?',
        },
        {
          id: 'int-cual', type: 'choix', consigne: 'Choisis le bon mot :', phrase: 'Tengo dos gorros. ¿___ te gusta más?',
          options: ['Qué', 'Cuál', 'Cuánto'], es: 'Cuál', explication: 'Sans nom, quand on sait de quoi on parle : cuál.',
        },
        {
          id: 'int-cuantas', type: 'trou', consigne: CUANTO, phrase: '¿___ camisetas te llevas?', es: 'Cuántas',
          pieges: [{ si: 'cuántos', message: 'Camisetas est féminin pluriel : cuántas.' }],
        },
        { id: 'int-cuanto', type: 'trou', consigne: CUANTO, phrase: '¿___ cuestan estos guantes?', es: 'Cuánto' },
        {
          id: 'int-cuando', type: 'choix', consigne: 'Choisis le bon mot :', phrase: '¿___ vas al tianguis, el sábado o el domingo?',
          options: ['Cuánto', 'Cuándo', 'Cuál'], es: 'Cuándo', explication: 'Cuándo = quand ; cuánto = combien.',
        },
        {
          id: 'lle-lleva', type: 'choix', consigne: 'Choisis le bon verbe :', phrase: 'En la foto, Rubén ___ un sombrero negro.',
          options: ['se lleva', 'lleva', 'pone'], es: 'lleva', explication: 'Porter un vêtement : llevar. Rubén lleva un sombrero.',
        },
        {
          id: 'lle-llevo', type: 'choix', consigne: 'Choisis : « je le prends » (je l\'achète).', phrase: 'Este gorro me encanta. ___',
          options: ['Lo llevo.', 'Me lo llevo.', 'Me lo pongo.'], es: 'Me lo llevo.',
          explication: 'Prendre, acheter dans un magasin : llevarse. Me lo llevo.',
        },
        {
          id: 'lle-ponerme', type: 'trou', verbe: 'ponerse', phrase: 'No sé qué ___ para la fiesta. (me mettre)', es: 'ponerme',
          pieges: [{ si: 'poner', message: 'Mettre un vêtement sur soi : ponerse, ici ponerme.' }],
        },
        {
          id: 'lle-pon', type: 'choix', consigne: 'Choisis le bon verbe :', phrase: '___ tus cosas encima de la mesa, por favor.',
          options: ['Ponte', 'Pon', 'Lleva'], es: 'Pon',
          explication: 'Mettre un objet quelque part : poner. Ponerse, c\'est mettre un vêtement.',
        },
        { id: 'ord-probar', type: 'ordre', consigne: ORDRE, fr: 'Je peux les essayer ?', mots: ['puedo', 'los', 'me', 'probar'], es: '¿Me los puedo probar?' },
        {
          id: 'ord-quedan', type: 'ordre', consigne: ORDRE, fr: 'Comment me vont ces chaussures ?',
          mots: ['quedan', 'tal', 'zapatos', 'me', 'qué', 'estos'], es: '¿Qué tal me quedan estos zapatos?',
          accepte: ['Estos zapatos, ¿qué tal me quedan?'],
        },
        {
          id: 'ord-siento', type: 'ordre', consigne: ORDRE, fr: 'Désolé, celle-là, je ne l\'ai qu\'en bleu.',
          mots: ['solo', 'esa', 'lo', 'la', 'siento', 'en', 'tengo', 'azul'], es: 'Lo siento, esa solo la tengo en azul.',
          accepte: ['Lo siento, esa la tengo solo en azul.', 'Esa solo la tengo en azul, lo siento.', 'Esa la tengo solo en azul, lo siento.'],
        },
      ],
    },

    {
      id: 'u01-escribir-tienda',
      seance: 2,
      titre: 'En la tienda',
      sousTitre: 'Écrire : un dialogue pour acheter un vêtement',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: 'Pour acheter un vêtement',
          lignes: [
            'Demander à essayer : *¿Me puedo probar esa chaqueta?*',
            'Demander comment ça va : *¿Me queda bien?* — *Te queda un poco grande.*',
            'Demander une autre taille ou une autre couleur : *¿La tiene en otra talla? ¿Y en negro?*',
            'Demander le prix : *¿Cuánto cuesta? ¿Cuánto cuestan?*',
            'Acheter : *Me la llevo.* *Me los llevo.*',
          ],
        },
      ],
      items: [
        {
          id: 'esc-tienda', type: 'decrire', sujet: 'En la tienda', emoji: '🛍️',
          indices: ['probarse', 'este, ese', 'quedar bien', '¿cuánto?', 'llevarse'],
          consigne: 'Écris un court dialogue dans une boutique : tu demandes à essayer un vêtement, comment il te va et combien il coûte, puis tu l\'achètes.',
          titreModele: 'Un exemple',
          modele: '— ¿Me puedo probar esa chaqueta? — ¿Cuál, esta? Sí, toma. — ¿Me queda bien? — Te queda un poco grande. — ¿La tiene en otra talla? — Sí, aquí tiene. — ¿Cuánto cuesta? — Treinta euros. — Me la llevo.',
          criteres: [
            { id: 'probar', texte: 'Demander à essayer, avec un démonstratif accordé : ¿Me puedo probar esa chaqueta?' },
            { id: 'quedar', texte: 'Demander ou dire comment ça va : ¿Me queda bien? Te queda grande.' },
            { id: 'precio', texte: 'Demander le prix avec cuánto, accordé : ¿Cuánto cuesta? ¿Cuánto cuestan?' },
            { id: 'llevarse', texte: 'L\'acheter avec llevarse et un pronom : me la llevo' },
          ],
        },
      ],
    },

    // ═══ Séance 3 — Lección 3 : Frida Kahlo ═════════════════════════════════

    {
      id: 'u01-frida',
      seance: 3,
      titre: 'Frida Kahlo',
      sousTitre: 'Sa vie, ses vêtements, et les mots de l\'art',
      duree: 5,
      fiche: [
        {
          type: 'regle',
          titre: 'Frida Kahlo (1907-1954)',
          lignes: [
            'Peintre **mexicaine**, l\'une des artistes les plus influentes d\'Amérique latine.',
            'À **six ans**, la **poliomyélite** lui laisse la **jambe droite** plus courte et plus maigre.',
            'En **1925**, à dix-huit ans, elle a un très grave **accident de bus**. Clouée au lit, elle commence à peindre.',
            'Elle peint beaucoup d\'**autoportraits** (*autorretratos*), où elle montre sa **douleur** (*su dolor*) et son **amour de la vie**.',
            'Elle porte **avec fierté** (*con orgullo*) des vêtements de différentes régions du Mexique, et des pièces qu\'elle crée elle-même : pour **cacher sa jambe**, mais surtout pour s\'affirmer **femme indépendante, sans préjugés, fière de ses origines**.',
          ],
        },
        {
          type: 'vocabulaire',
          titre: 'Su imagen',
          mots: [
            { es: 'el peinado', fr: 'la coiffure' },
            { es: 'las cejas', fr: 'les sourcils' },
            { es: 'las joyas', fr: 'les bijoux', emoji: '💍' },
            { es: 'el chal', fr: 'le châle' },
            { es: 'la blusa', fr: 'le chemisier' },
            { es: 'la trenza', fr: 'la tresse' },
            { es: 'las flores en el pelo', fr: 'les fleurs dans les cheveux', emoji: '🌸' },
          ],
        },
        {
          type: 'vocabulaire',
          titre: 'Para hablar de arte',
          mots: [
            { es: 'el cuadro', fr: 'le tableau (une peinture)', emoji: '🖼️' },
            { es: 'la obra', fr: 'l\'œuvre' },
            { es: 'el autorretrato', fr: 'l\'autoportrait' },
            { es: 'la pintora', fr: 'la (femme) peintre', emoji: '🎨' },
            { es: 'transmitir', fr: 'transmettre' },
            { es: 'me hace pensar en', fr: 'ça me fait penser à' },
            { es: 'expresarse', fr: 's\'exprimer' },
            { es: 'esconder', fr: 'cacher' },
            { es: 'sentirse orgulloso de', fr: 'être fier de' },
            { es: 'estar sentado, sentada', fr: 'être assis(e)' },
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**el autorretrato** : deux r au milieu (auto + retrato).',
            '**me hace pensar en** : *en*, pas *a* — *Este cuadro me hace pensar en mi abuela.*',
            '**el cuadro** = le tableau qu\'on peint ; le tableau de la classe, c\'est **la pizarra**.',
          ],
        },
      ],
      items: [
        {
          id: 'fri-anos', type: 'choix', consigne: 'Frida Kahlo', phrase: '¿Cuándo vivió Frida Kahlo?',
          options: ['de 1880 a 1925', 'de 1907 a 1954', 'de 1929 a 1990'], es: 'de 1907 a 1954',
          explication: 'Frida Kahlo est née en 1907 et morte en 1954, au Mexique.',
        },
        {
          id: 'fri-polio', type: 'choix', consigne: 'Frida Kahlo', phrase: '¿Qué enfermedad tuvo Frida a los seis años?',
          options: ['la gripe', 'la poliomielitis', 'el sarampión'], es: 'la poliomielitis',
          explication: 'La polio lui a laissé la jambe droite plus courte et plus maigre.',
        },
        {
          id: 'fri-accidente', type: 'choix', consigne: 'Frida Kahlo', phrase: '¿Qué le pasó a Frida en 1925?',
          options: ['se fue a vivir a España', 'ganó un premio de pintura', 'tuvo un grave accidente de autobús'], es: 'tuvo un grave accidente de autobús',
          explication: 'À dix-huit ans, un très grave accident de bus : c\'est pendant sa convalescence qu\'elle se met à peindre.',
        },
        {
          id: 'fri-ropa', type: 'choix', consigne: 'Frida Kahlo', phrase: '¿Por qué llevaba ropa de diferentes regiones de México?',
          options: ['porque era la moda en París', 'para esconder su pierna y mostrar su orgullo por sus orígenes', 'porque no tenía otra ropa'],
          es: 'para esconder su pierna y mostrar su orgullo por sus orígenes',
          explication: 'Cacher sa jambe, mais surtout s\'affirmer femme indépendante et fière de ses origines.',
        },
        {
          id: 'fri-autorretratos', type: 'choix', consigne: 'Frida Kahlo', phrase: '¿Qué pintó muchas veces?',
          options: ['autorretratos', 'paisajes de Europa', 'retratos de reyes'], es: 'autorretratos',
          explication: 'Beaucoup d\'autoportraits, où elle montre sa douleur et son amour de la vie.',
        },
        {
          id: 'fri-dolor', type: 'choix', consigne: 'Frida Kahlo', phrase: '¿Qué muestra en sus autorretratos?',
          options: ['su miedo a los animales', 'sus viajes por el mundo', 'su dolor y su amor por la vida'], es: 'su dolor y su amor por la vida',
          explication: 'Sa douleur — ses graves problèmes de santé — et son amour de la vie.',
        },
        {
          id: 'art-cuadro', type: 'mot', fr: 'le tableau (une peinture)', emoji: '🖼️', es: 'el cuadro',
          pieges: [{ si: 'la pizarra', message: 'La pizarra, c\'est le tableau de la classe. Une peinture : el cuadro.' }],
        },
        { id: 'art-obra', type: 'mot', fr: 'l\'œuvre', es: 'la obra' },
        {
          id: 'art-autorretrato', type: 'mot', fr: 'l\'autoportrait', es: 'el autorretrato',
          pieges: [{ si: 'el autoretrato', message: 'Deux r au milieu : auto + retrato = autorretrato.' }],
        },
        { id: 'art-peinado', type: 'mot', fr: 'la coiffure', es: 'el peinado', note: 'Masculin en espagnol : el peinado.' },
        { id: 'art-cejas', type: 'mot', fr: 'les sourcils', es: 'las cejas' },
        { id: 'art-esconder', type: 'mot', fr: 'cacher', es: 'esconder' },
        { id: 'art-transmitir', type: 'mot', fr: 'transmettre', es: 'transmitir' },
        { id: 'art-orgulloso', type: 'adjectif', fr: 'fier, fière', es: 'orgulloso', fem: 'orgullosa' },
        {
          id: 'art-pensar', type: 'trou', consigne: 'Complète :', phrase: 'Este cuadro me hace pensar ___ mi abuela.', es: 'en',
          pieges: [{ si: 'a', message: 'Hacer pensar en : en, pas a.' }],
        },
      ],
    },

    {
      id: 'u01-camion',
      seance: 3,
      titre: 'El camión',
      sousTitre: 'Le tableau de 1929, et ses six passagers',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'El camión (1929) — dans ton livre, p. 17',
          lignes: [
            'Un tableau de **Frida Kahlo**, peint en **1929**.',
            'Six passagers assis sur un banc, dans un **bus** — *el camión* au Mexique, *el autobús* en Espagne. Ils représentent **la société mexicaine** de l\'époque, des plus pauvres aux plus riches.',
            '**En segundo plano** (à l\'arrière-plan), par la fenêtre : une usine (*una fábrica*), des maisons et la campagne.',
            'Le lien avec sa vie : en **1925**, Frida a eu un très grave **accident de bus**.',
          ],
        },
        {
          type: 'vocabulaire',
          titre: 'Los personajes, de izquierda a derecha',
          mots: [
            { es: 'el ama de casa', fr: 'n° 1 — la ménagère, avec son panier' },
            { es: 'el obrero', fr: 'n° 2 — l\'ouvrier, en salopette bleue' },
            { es: 'la madre indígena', fr: 'n° 3 — la mère indigène, pieds nus, avec son bébé' },
            { es: 'el niño', fr: 'n° 4 — l\'enfant, à genoux, qui regarde par la fenêtre' },
            { es: 'el hombre rico', fr: 'n° 5 — l\'homme riche, nœud papillon et sac d\'argent' },
            { es: 'la joven elegante', fr: 'n° 6 — la jeune femme élégante, souvent vue comme Frida elle-même' },
          ],
        },
        {
          type: 'vocabulaire',
          titre: 'Para describirlos',
          mots: [
            { es: 'la cesta', fr: 'le panier' },
            { es: 'el peto', fr: 'la salopette' },
            { es: 'la pajarita', fr: 'le nœud papillon' },
            { es: 'las medias', fr: 'les bas, les collants' },
            { es: 'ir elegante', fr: 'être élégant(e)' },
            { es: 'ir descalzo, descalza', fr: 'être pieds nus' },
            { es: 'estar arrodillado, arrodillada', fr: 'être à genoux' },
            { es: 'estar sentado, sentada', fr: 'être assis(e)' },
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**el camión**, au Mexique, c\'est le bus (**el autobús** en Espagne) — pas un camion !',
            '**el ama de casa** : un nom féminin, mais *el* devant le « a » accentué, comme *el agua*.',
          ],
        },
      ],
      items: [
        {
          id: 'cam-ano', type: 'choix', consigne: 'El camión', phrase: '¿De qué año es el cuadro El camión?',
          options: ['1907', '1929', '1954'], es: '1929', explication: 'Frida Kahlo l\'a peint en 1929.',
        },
        {
          id: 'cam-tema', type: 'choix', consigne: 'El camión', phrase: '¿Qué representa el cuadro?',
          options: ['una fiesta del Día de Muertos', 'la sociedad mexicana: personas de diferentes clases sociales', 'la familia de Frida'],
          es: 'la sociedad mexicana: personas de diferentes clases sociales',
          explication: 'Six passagers, des plus pauvres aux plus riches : toute la société mexicaine.',
        },
        {
          id: 'cam-vida', type: 'choix', consigne: 'El camión', phrase: '¿Qué relación tiene el cuadro con la vida de Frida?',
          options: ['Frida trabajaba en un autobús', 'Frida tuvo un grave accidente de autobús en 1925', 'Frida vivía en una fábrica'],
          es: 'Frida tuvo un grave accidente de autobús en 1925',
          explication: 'Le bus rappelle l\'accident de 1925, qui a changé sa vie.',
        },
        {
          id: 'cam-peto', type: 'choix', consigne: 'El camión', phrase: '¿Quién lleva un peto azul?',
          options: ['el obrero', 'el niño', 'el hombre rico'], es: 'el obrero', explication: 'L\'ouvrier (n° 2), en salopette bleue.',
        },
        {
          id: 'cam-descalza', type: 'choix', consigne: 'El camión', phrase: '¿Quién va descalza?',
          options: ['la joven elegante', 'la madre indígena', 'el ama de casa'], es: 'la madre indígena',
          explication: 'La mère indigène (n° 3), pieds nus, avec son bébé.',
        },
        {
          id: 'cam-pajarita', type: 'choix', consigne: 'El camión', phrase: '¿Quién lleva una pajarita y una bolsa de dinero?',
          options: ['el obrero', 'el niño', 'el hombre rico'], es: 'el hombre rico',
          explication: 'L\'homme riche (n° 5), en costume, avec un nœud papillon.',
        },
        {
          id: 'cam-nino', type: 'choix', consigne: 'El camión', phrase: '¿Qué hace el niño?',
          options: ['está durmiendo', 'está arrodillado y mira por la ventana', 'está comiendo'], es: 'está arrodillado y mira por la ventana',
          explication: 'L\'enfant (n° 4) est à genoux sur le banc et regarde par la fenêtre.',
        },
        { id: 'cam-cesta', type: 'mot', fr: 'le panier', es: 'la cesta', note: 'Féminin en espagnol : la cesta.' },
        { id: 'cam-pajarita-mot', type: 'mot', fr: 'le nœud papillon', es: 'la pajarita', note: 'Féminin en espagnol : la pajarita.' },
        { id: 'cam-descalzo', type: 'adjectif', fr: 'pieds nus', es: 'descalzo', fem: 'descalza' },
        { id: 'cam-arrodillado', type: 'adjectif', fr: 'à genoux', es: 'arrodillado', fem: 'arrodillada', note: 'Deux r : arrodillado.' },
        { id: 'cam-autobus', type: 'trou', consigne: 'Complète :', phrase: 'En México, el autobús se llama el ___.', es: 'camión' },
      ],
    },

    {
      id: 'u01-nosolo',
      seance: 3,
      titre: 'No solo…, sino que',
      sousTitre: 'Non seulement…, mais aussi…',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: 'No solo…, sino que (también)',
          lignes: [
            '**no solo** + un verbe…, **sino que (también)** + un verbe : « non seulement…, mais aussi… ».',
            '*Frida no solo pintaba, sino que también diseñaba su ropa.*',
            '*Mi hermano no solo se pone mis jerséis, sino que se lleva mis zapatos.*',
            '**también** est facultatif ; **que** est obligatoire devant un verbe conjugué.',
          ],
        },
        {
          type: 'piege',
          lignes: ['Après **no solo**, jamais **pero** : c\'est **sino que**.'],
        },
      ],
      items: [
        {
          id: 'ns-frida', type: 'transformer', consigne: NO_SOLO, de: 'Frida pinta. Frida diseña su ropa.',
          es: 'Frida no solo pinta, sino que también diseña su ropa.', accepte: ['Frida no solo pinta, sino que diseña su ropa.'],
          explication: 'No solo + le premier verbe, sino que (también) + le second.',
          pieges: [
            { si: ['Frida no solo pinta, pero también diseña su ropa.', 'Frida no solo pinta, pero diseña su ropa.'], message: 'Après no solo, jamais pero : sino que.' },
            { si: ['Frida no solo pinta, sino también diseña su ropa.', 'Frida no solo pinta, sino diseña su ropa.'], resultat: 'presque', message: 'Devant un verbe conjugué, il faut sino QUE : sino que también diseña su ropa.' },
          ],
        },
        {
          id: 'ns-guadalupe', type: 'transformer', consigne: NO_SOLO, de: 'Guadalupe hace pulseras. Guadalupe las vende en el tianguis.',
          es: 'Guadalupe no solo hace pulseras, sino que también las vende en el tianguis.',
          accepte: ['Guadalupe no solo hace pulseras, sino que las vende en el tianguis.'],
          explication: 'Le pronom las reste devant son verbe : sino que también las vende.',
        },
        {
          id: 'ns-muertos', type: 'transformer', consigne: NO_SOLO, de: 'El Día de Muertos honra a los muertos. El Día de Muertos celebra la vida.',
          es: 'El Día de Muertos no solo honra a los muertos, sino que también celebra la vida.',
          accepte: ['El Día de Muertos no solo honra a los muertos, sino que celebra la vida.'],
          explication: 'Un seul sujet, deux verbes : no solo honra…, sino que también celebra…',
        },
        {
          id: 'ns-hermano', type: 'transformer', consigne: NO_SOLO, de: 'Mi hermano se pone mis jerséis. Mi hermano se lleva mis zapatos.',
          es: 'Mi hermano no solo se pone mis jerséis, sino que también se lleva mis zapatos.',
          accepte: [
            'Mi hermano no solo se pone mis jerséis, sino que se lleva mis zapatos.',
            'Mi hermano no solo se pone mis jerseys, sino que también se lleva mis zapatos.',
            'Mi hermano no solo se pone mis jerseys, sino que se lleva mis zapatos.',
          ],
          explication: 'Chaque pronom reste devant son verbe : no solo se pone…, sino que también se lleva…',
        },
        {
          id: 'ns-choix', type: 'choix', consigne: 'Choisis :', phrase: 'Frida no solo pintaba, ___ también escribía.',
          options: ['pero', 'sino que', 'y'], es: 'sino que', explication: 'Après no solo, devant un verbe conjugué : sino que.',
        },
      ],
    },

    {
      id: 'u01-escribir-camion',
      seance: 3,
      titre: 'Un personaje de El camión',
      sousTitre: 'Écrire : décrire un personnage du tableau',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Pour décrire un personnage',
          lignes: [
            '**Cómo es** : *Es joven y delgada. Tiene el pelo corto y negro.*',
            '**Qué lleva** : *Lleva un vestido elegante y unas medias.*',
            '**Qué hace, dónde está** : *Está sentada en el banco. Mira por la ventana.*',
            '**Y además** : *No solo lleva un vestido elegante, sino que también lleva un pañuelo.*',
          ],
        },
      ],
      items: [
        {
          id: 'esc-camion', type: 'decrire', sujet: 'Un personaje de El camión', emoji: '🚌',
          indices: ['es, tiene', 'lleva', 'está sentado(a)', 'no solo…, sino que'],
          consigne: 'Choisis un personnage du tableau El camión (ton livre, p. 17) et décris-le : comment il est, ce qu\'il porte, ce qu\'il fait. Emploie une fois no solo…, sino que (también).',
          titreModele: 'Un exemple',
          modele: 'El obrero es moreno y lleva una gorra y un peto azul. Está sentado entre el ama de casa y la madre indígena. No solo lleva ropa de trabajo, sino que también tiene una herramienta en las manos.',
          criteres: [
            { id: 'fisico', texte: 'Le physique, avec ser ou tener : es moreno, tiene el pelo corto…' },
            { id: 'ropa', texte: 'Les vêtements, avec llevar : lleva un peto azul…' },
            { id: 'accion', texte: 'Ce que fait le personnage, ou où il est : está sentado, mira por la ventana…' },
            { id: 'nosolo', texte: 'No solo…, sino que (también), avec un verbe conjugué' },
          ],
        },
      ],
    },
  ],

  // ── Le contrôle blanc ───────────────────────────────────────────────────
  // Tiré de toutes les étapes, sans indice ni seconde chance.
  interro: {
    duree: 8,
    tirage: [
      { etape: 'u01-cosas', nombre: 2 },
      { etape: 'u01-manualidades', nombre: 1 },
      { etape: 'u01-duracion', nombre: 2 },
      { etape: 'u01-ropa', nombre: 2 },
      { etape: 'u01-pronombres', nombre: 3 },
      { etape: 'u01-compras', nombre: 2 },
      { etape: 'u01-frida', nombre: 1 },
      { etape: 'u01-camion', nombre: 1 },
      { etape: 'u01-nosolo', nombre: 1 },
    ],
  },
};
