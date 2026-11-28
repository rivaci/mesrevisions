// Unidad 3 — la famille, et ce qu'on ressent, préfère, aime.
//
// Pour le contrôle annoncé par la professeure : les membres de la famille, les
// adjectifs possessifs, estar + adjectif pour les émotions (triste, feliz,
// cansado, nervioso, enfermo, sorprendido), les verbes à diphtongue du type
// preferir (e → ie), et gustar / encantar — « mirar páginas 54 y 55 ».
//
// Sources : la page « Léxico » 56 (la familia, las mascotas, talentos y
// aficiones), les encadrés « Ayuda » des pages 46 et 48, et le récapitulatif de
// grammaire des pages 54-55. La liste du contrôle ne cite que e → ie ; la page
// 55 montre aussi o → ue (poder) et u → ue (jugar) : une ligne de la fiche.
//
// Trente minutes : 67 questions, à peu près comme l'unité 2. Les féminins (la
// tía, la prima…) et les mots hors de la liste restent dans les fiches.
//
// Les phrases sont écrites pour l'appli, pas reprises du manuel : le dépôt est
// public.
//
// Les identifiants ne se renumérotent jamais : la progression y est rangée.

const PRONOM = 'Le pronom qui va avec gustar :';

export default {
  id: 'u03',
  numero: 3,
  titre: 'La familia',
  detail: 'Páginas 54 a 56 · La familia · Posesivos · Estar · Preferir · Gustar',

  // Ce que Merlin sait du module quand il corrige un texte.
  profilMerlin: 'Élève de 5e, première année d\'espagnol (LV2). Unité en cours : la famille (el padre, la madre, '
    + 'los padres, el hermano, los abuelos, el tío, el primo, mayor, menor…), les possessifs (mi, tu, su, nuestro, '
    + 'vuestro, su ; au pluriel mis, tus, sus, nuestros, vuestros, sus ; nuestro et vuestro s\'accordent aussi en genre), '
    + 'estar + adjectif accordé pour une émotion ou un état (estoy cansado, está nerviosa, están casados), les verbes '
    + 'à diphtongue e → ie (querer, preferir, pensar : quiero, prefieres, piensa — mais queremos, preferimos), et '
    + 'gustar / encantar (me gusta + singulier ou infinitif, me gustan + pluriel ; me, te, le, nos, os, les ; no me gusta).',

  etapes: [
    // ── 1. La famille ────────────────────────────────────────────────────
    {
      id: 'u03-familia',
      titre: 'La familia',
      sousTitre: 'Les membres de la famille',
      duree: 6,
      fiche: [
        {
          type: 'regle',
          lignes: [
            '**la familia** = la famille · **los familiares** = les membres de la famille',
            'Au pluriel, le masculin réunit les deux : **los padres** = le père et la mère · **los hermanos** = les frères et sœurs · **los abuelos** = les grands-parents.',
          ],
        },
        {
          type: 'vocabulaire',
          titre: 'Mi familia — de haut en bas',
          mots: [
            { es: 'el abuelo, la abuela', fr: 'le grand-père, la grand-mère', emoji: '👴' },
            { es: 'los abuelos', fr: 'les grands-parents' },
            { es: 'el padre, la madre', fr: 'le père, la mère' },
            { es: 'los padres', fr: 'les parents' },
            { es: 'el tío, la tía', fr: "l'oncle, la tante" },
            { es: 'el hermano, la hermana', fr: 'le frère, la sœur' },
            { es: 'los hermanos', fr: 'les frères et sœurs' },
            { es: 'el hijo, la hija', fr: 'le fils, la fille' },
            { es: 'el primo, la prima', fr: 'le cousin, la cousine' },
            { es: 'el sobrino, la sobrina', fr: 'le neveu, la nièce' },
            { es: 'los nietos', fr: 'les petits-enfants' },
            { es: 'el bisnieto, la bisnieta', fr: "l'arrière-petit-fils, l'arrière-petite-fille" },
          ],
        },
        {
          type: 'vocabulaire',
          titre: 'Los familiares — et pour en parler',
          mots: [
            { es: 'el marido, la esposa', fr: "le mari, l'épouse", emoji: '💍' },
            { es: 'el padrastro, la madrastra', fr: 'le beau-père, la belle-mère (le nouveau mari de la mère, la nouvelle femme du père)' },
            { es: 'los gemelos, las gemelas', fr: 'les jumeaux, les jumelles' },
            { es: 'ser hijo único, hija única', fr: 'être enfant unique' },
            { es: 'mayor ≠ menor', fr: 'aîné(e) ≠ cadet(te)' },
            { es: 'llevarse bien ≠ llevarse mal', fr: "bien ≠ mal s'entendre" },
            { es: 'juntos, juntas', fr: 'ensemble' },
            { es: 'disfrutar', fr: "s'amuser, profiter" },
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**los padres** = les parents, le père et la mère. **Los parientes**, c\'est toute la famille.',
            'Fille se dit de deux façons : **la hija**, l\'enfant de ses parents ; **la chica**, une jeune fille.',
            '**mayor** = aîné, **menor** = cadet : *mi hermano mayor* (mon grand frère), *mi hermana menor* (ma petite sœur).',
            '**el sobrino** = le neveu ; **el nieto** = le petit-fils.',
          ],
        },
      ],
      items: [
        { id: 'fam-padre', type: 'mot', fr: 'le père', es: 'el padre' },
        { id: 'fam-madre', type: 'mot', fr: 'la mère', es: 'la madre' },
        {
          id: 'fam-padres', type: 'mot', fr: 'les parents (le père et la mère)', es: 'los padres',
          note: 'Le masculin pluriel réunit le père et la mère.',
          pieges: [{ si: 'los parientes', message: 'Los parientes, c\'est toute la famille. Le père et la mère : los padres.' }],
        },
        { id: 'fam-hermano', type: 'mot', fr: 'le frère', es: 'el hermano' },
        { id: 'fam-hermanos', type: 'mot', fr: 'les frères et sœurs', es: 'los hermanos' },
        { id: 'fam-hijo', type: 'mot', fr: 'le fils', es: 'el hijo' },
        {
          id: 'fam-hija', type: 'mot', fr: "la fille (l'enfant de ses parents)", es: 'la hija',
          pieges: [{ si: 'la chica', message: 'La chica, c\'est une jeune fille. La fille de ses parents : la hija.' }],
        },
        { id: 'fam-abuelo', type: 'mot', fr: 'le grand-père', emoji: '👴', es: 'el abuelo' },
        { id: 'fam-abuelos', type: 'mot', fr: 'les grands-parents', es: 'los abuelos' },
        { id: 'fam-tio', type: 'mot', fr: "l'oncle", es: 'el tío' },
        { id: 'fam-primo', type: 'mot', fr: 'le cousin', es: 'el primo' },
        {
          id: 'fam-sobrino', type: 'mot', fr: 'le neveu', es: 'el sobrino',
          pieges: [{ si: 'el nieto', message: 'El nieto, c\'est le petit-fils. Le neveu : el sobrino.' }],
        },
        {
          id: 'fam-nietos', type: 'mot', fr: 'les petits-enfants', es: 'los nietos',
          pieges: [{ si: 'los sobrinos', message: 'Los sobrinos, ce sont les neveux. Les petits-enfants : los nietos.' }],
        },
        { id: 'fam-marido', type: 'mot', fr: 'le mari', es: 'el marido', accepte: ['el esposo'] },
        { id: 'fam-esposa', type: 'mot', fr: "l'épouse", es: 'la esposa', accepte: ['la mujer'] },
        { id: 'fam-padrastro', type: 'mot', fr: 'le beau-père (le nouveau mari de la mère)', es: 'el padrastro' },
        { id: 'fam-madrastra', type: 'mot', fr: 'la belle-mère (la nouvelle femme du père)', es: 'la madrastra' },
        {
          id: 'fam-unico', type: 'mot', fr: 'être enfant unique', es: 'ser hijo único',
          accepte: ['ser hija única', 'ser hijo(a) único(a)', 'hijo único', 'hija única'],
          note: 'Pour une fille : ser hija única.',
        },
        {
          id: 'fam-mayor', type: 'adjectif', fr: 'aîné, aînée', es: 'mayor',
          pieges: [{ si: 'menor', message: 'Menor, c\'est le plus jeune, le cadet. L\'aîné : mayor.' }],
        },
        {
          id: 'fam-menor', type: 'adjectif', fr: 'cadet, cadette', es: 'menor',
          pieges: [{ si: 'mayor', message: 'Mayor, c\'est l\'aîné. Le cadet, le plus jeune : menor.' }],
        },
      ],
    },

    // ── 2. Les possessifs ────────────────────────────────────────────────
    {
      id: 'u03-posesivos',
      titre: 'Los posesivos',
      sousTitre: 'Mi, tu, su… : ils s\'accordent avec ce qu\'on possède',
      duree: 4,
      fiche: [
        {
          type: 'conjugaison',
          titre: 'Les possessifs',
          verbes: [
            { infinitif: 'singular', sens: 'une chose', formes: ['mi', 'tu', 'su', 'nuestro, nuestra', 'vuestro, vuestra', 'su'] },
            { infinitif: 'plural', sens: 'plusieurs', formes: ['mis', 'tus', 'sus', 'nuestros, nuestras', 'vuestros, vuestras', 'sus'] },
          ],
        },
        {
          type: 'regle',
          titre: 'Accorder avec ce qu\'on possède',
          lignes: [
            'Le possessif prend un **s** quand ce qu\'on possède est au pluriel : *mi perro* → *mis perros*.',
            '**nuestro** et **vuestro** s\'accordent aussi en genre : *nuestra abuela, nuestros tíos, vuestras primas.*',
            '**su, sus** = son, sa, ses — mais aussi leur, leurs : *Mis vecinos y su perro.*',
            'Jamais d\'article devant : *mi padre*, pas « el mi padre ».',
          ],
        },
        {
          type: 'vocabulaire',
          titre: 'Las mascotas — les animaux de compagnie, et le sorcier',
          mots: [
            { es: 'el gato', fr: 'le chat', emoji: '🐱' },
            { es: 'el perro', fr: 'le chien', emoji: '🐶' },
            { es: 'el conejo', fr: 'le lapin', emoji: '🐰' },
            { es: 'el hámster', fr: 'le hamster', emoji: '🐹' },
            { es: 'el periquito', fr: 'la perruche', emoji: '🦜' },
            { es: 'el pez, los peces', fr: 'le poisson, les poissons', emoji: '🐟' },
            { es: 'el brujo, la bruja', fr: 'le sorcier, la sorcière', emoji: '🧙' },
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**tu** sans accent = ton, ta ; **tú** avec accent = « tu », le pronom sujet : *Tú tienes tu gato.*',
            'C\'est ce qu\'on possède qui compte : *Pablo y **sus** hermanos* (ses frères), *mis tíos y **su** casa* (leur maison).',
            'Le pluriel de el pez : los pe**c**es — le z devient c devant -es.',
          ],
        },
      ],
      items: [
        { id: 'pos-mi-gato', type: 'mot', fr: 'mon chat', emoji: '🐱', es: 'mi gato' },
        {
          id: 'pos-tus-perros', type: 'mot', fr: 'tes chiens', emoji: '🐶', es: 'tus perros',
          pieges: [{ si: 'tu perros', message: 'Perros est au pluriel : le possessif aussi → tus perros.' }],
        },
        {
          id: 'pos-su-conejo', type: 'mot', fr: 'son lapin', emoji: '🐰', es: 'su conejo',
          pieges: [{ si: 'son conejo', message: 'Son est français. En espagnol : su conejo.' }],
        },
        {
          id: 'pos-nuestros-peces', type: 'mot', fr: 'nos poissons', emoji: '🐟', es: 'nuestros peces',
          pieges: [
            { si: 'nuestros pezes', resultat: 'presque', message: 'Le possessif est juste, mais le z devient c devant -es : peces.' },
            { si: ['nuestro peces', 'nuestras peces'], message: 'Los peces : masculin pluriel → nuestros peces.' },
          ],
        },
        {
          id: 'pos-mis-hermanos', type: 'trou', consigne: 'Le possessif de yo :',
          phrase: '___ hermanos son muy simpáticos.', es: 'mis',
          pieges: [{ si: 'mi', message: 'Hermanos est au pluriel : le possessif prend un s → mis hermanos.' }],
        },
        {
          id: 'pos-tu-hermano', type: 'trou', consigne: 'Le possessif de tú :',
          phrase: '¿Cómo se llama ___ hermano?', es: 'tu',
          pieges: [{ si: 'tú', resultat: 'presque', message: 'Tú avec accent, c\'est le pronom sujet « tu ». Le possessif ton, ta s\'écrit sans accent : tu hermano.' }],
        },
        {
          id: 'pos-nuestra-madre', type: 'trou', consigne: 'Le possessif de nosotros :',
          phrase: '___ madre es profesora de música.', es: 'nuestra',
          pieges: [{ si: 'nuestro', message: 'Madre est féminin : nuestra madre.' }],
        },
        {
          id: 'pos-vuestros-abuelos', type: 'trou', consigne: 'Le possessif de vosotros :',
          phrase: '¿Dónde viven ___ abuelos?', es: 'vuestros',
          pieges: [{ si: ['vuestro', 'vuestras'], message: 'Abuelos est masculin pluriel : vuestros abuelos.' }],
        },
        {
          id: 'pos-su-leur', type: 'choix', consigne: 'Pour dire « leur chien » :',
          phrase: 'Mis vecinos tienen un perro. ___ perro es enorme.', options: ['Sus', 'Su', 'Tu'], es: 'Su',
          explication: 'Un seul chien → su. Su veut dire son, sa, mais aussi leur.',
        },
        {
          id: 'pos-sus-primas', type: 'choix', consigne: 'Pour dire « Pablo joue avec ses cousines » :',
          phrase: 'Pablo juega con ___ primas.', options: ['su', 'mis', 'sus'], es: 'sus',
          explication: 'Les cousines de Pablo : ses cousines, au pluriel → sus primas.',
        },
      ],
    },

    // ── 3. Estar, et les émotions ────────────────────────────────────────
    {
      id: 'u03-estar',
      titre: 'Estar y las emociones',
      sousTitre: 'Comment on se sent : estar + adjectif',
      duree: 4,
      fiche: [
        {
          type: 'conjugaison',
          verbes: [
            { infinitif: 'estar', sens: 'être (en ce moment)', formes: ['estoy', 'estás', 'está', 'estamos', 'estáis', 'están'] },
          ],
        },
        {
          type: 'regle',
          titre: 'Deux emplois de estar',
          lignes: [
            '**estar + adjectif** : un état passager, une émotion — *Hoy estoy cansado. Mi abuela está muy feliz.*',
            '**estar + participe passé** : le résultat d\'une action — *Mis tíos están casados.* (= ils sont mariés : ils se sont mariés un jour.)',
            'L\'adjectif s\'accorde : *Mi hermana está nerviosa. Mis primos están sorprendidos.*',
          ],
        },
        {
          type: 'vocabulaire',
          titre: 'Las emociones y los estados',
          mots: [
            { es: 'triste', fr: 'triste', emoji: '😢' },
            { es: 'feliz', fr: 'heureux, heureuse', emoji: '😄' },
            { es: 'cansado, cansada', fr: 'fatigué(e)', emoji: '😴' },
            { es: 'nervioso, nerviosa', fr: 'nerveux, nerveuse', emoji: '😬' },
            { es: 'enfermo, enferma', fr: 'malade', emoji: '🤒' },
            { es: 'sorprendido, sorprendida', fr: 'surpris(e)', emoji: '😲' },
            { es: 'enfadado, enfadada', fr: 'fâché(e)', emoji: '😠' },
            { es: 'aterrorizado, aterrorizada', fr: 'terrorisé(e)', emoji: '😱' },
            { es: 'casado(s), divorciado(s)', fr: 'marié(s), divorcé(s)', emoji: '💍' },
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Comment on se sent en ce moment : **estar** — *Estoy triste.* « Soy triste » voudrait dire qu\'on est quelqu\'un de triste.',
            '**triste** et **feliz** ne changent pas au féminin. Au pluriel : triste**s**, feli**ces** (le z devient c).',
            'Des accents : est**á**s, est**á**, est**á**is, est**á**n — mais **estoy** et **estamos** n\'en ont pas.',
          ],
        },
      ],
      items: [
        {
          id: 'est-yo', type: 'forme', verbe: 'estar', personne: 'yo', es: 'estoy',
          pieges: [{ si: 'esto', message: 'Esto veut dire « ceci ». Estar à yo : estoy, avec un y.' }],
        },
        { id: 'est-tu', type: 'forme', verbe: 'estar', personne: 'tú', es: 'estás' },
        { id: 'est-vosotros', type: 'forme', verbe: 'estar', personne: 'vosotros', es: 'estáis' },
        { id: 'est-ellos', type: 'forme', verbe: 'estar', personne: 'ellos', es: 'están' },
        { id: 'emo-triste', type: 'adjectif', fr: 'triste', emoji: '😢', es: 'triste' },
        {
          id: 'emo-feliz', type: 'adjectif', fr: 'heureux, heureuse', emoji: '😄', es: 'feliz',
          pieges: [{ si: ['contento', 'contenta'], resultat: 'presque', message: 'Contento veut dire « content ». Heureux, le mot de la liste : feliz.' }],
        },
        { id: 'emo-cansado', type: 'adjectif', fr: 'fatigué, fatiguée', emoji: '😴', es: 'cansado', fem: 'cansada' },
        { id: 'emo-nervioso', type: 'adjectif', fr: 'nerveux, nerveuse', emoji: '😬', es: 'nervioso', fem: 'nerviosa' },
        { id: 'emo-enfermo', type: 'adjectif', fr: 'malade', emoji: '🤒', es: 'enfermo', fem: 'enferma' },
        {
          id: 'emo-sorprendido', type: 'adjectif', fr: 'surpris, surprise', emoji: '😲', es: 'sorprendido', fem: 'sorprendida',
          pieges: [{ si: ['surprendido', 'surprendida'], message: 'En espagnol, sor- avec un o : sorprendido.' }],
        },
        {
          id: 'est-choix-ser', type: 'choix', consigne: 'Pour dire « Aujourd\'hui, je suis malade » :',
          phrase: 'Hoy ___ enfermo.', options: ['soy', 'tengo', 'estoy'], es: 'estoy',
          explication: 'Un état du moment : estar. Hoy estoy enfermo.',
        },
        {
          id: 'est-choix-accord', type: 'choix', consigne: 'Choisis la bonne forme :',
          phrase: 'Mi hermana está muy ___ hoy.', options: ['cansado', 'cansada', 'cansadas'], es: 'cansada',
          explication: 'L\'adjectif s\'accorde avec mi hermana : cansada.',
        },
        {
          id: 'est-trou-feliz', type: 'trou', consigne: 'Accorde feliz :',
          phrase: 'Mis primos están ___.', es: 'felices',
          pieges: [
            { si: 'felizes', resultat: 'presque', message: 'Le pluriel est juste, mais le z devient c devant -es : felices.' },
            { si: 'feliz', message: 'Mis primos est au pluriel : feliz → felices.' },
          ],
        },
        {
          id: 'est-trou-divorciada', type: 'trou', verbe: 'estar',
          phrase: 'Mi tía ___ divorciada.', es: 'está',
          pieges: [{ si: 'es', message: 'La consigne demande estar, et le manuel range divorciado avec estar + participe passé : está divorciada.' }],
        },
      ],
    },

    // ── 4. Les verbes à diphtongue ───────────────────────────────────────
    {
      id: 'u03-diptongo',
      titre: 'Preferir y querer',
      sousTitre: 'Les verbes à diphtongue : e → ie',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Le e devient ie',
          lignes: [
            'Le **dernier e du radical** devient **ie** — à toutes les personnes **sauf nosotros et vosotros**.',
            'Les terminaisons restent régulières : pref**ie**r**o**, pref**ie**r**es**, pref**ie**r**e**…',
            'Comme eux : **pensar** (penser) → p**ie**nso · **cerrar** (fermer) → c**ie**rro. Tu connais déjà ce « ie » : t**ie**nes, t**ie**ne, t**ie**nen.',
          ],
        },
        {
          type: 'conjugaison',
          verbes: [
            { infinitif: 'querer', sens: 'vouloir', formes: ['quiero', 'quieres', 'quiere', 'queremos', 'queréis', 'quieren'] },
            { infinitif: 'preferir', sens: 'préférer', formes: ['prefiero', 'prefieres', 'prefiere', 'preferimos', 'preferís', 'prefieren'] },
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Pas de **ie** à nosotros et vosotros : **queremos**, **preferimos** — pas « quieremos ».',
            'preferir a deux e : c\'est le **second** qui change → pref**ie**ro.',
            '**querer** + infinitif = vouloir faire : *Quiero aprender a bailar.*',
            'Page 55, la même règle avec **o → ue** (poder → p**ue**do, podemos) et **u → ue** (jugar → j**ue**go, jugamos).',
          ],
        },
      ],
      items: [
        {
          id: 'dip-querer-yo', type: 'forme', verbe: 'querer', personne: 'yo', es: 'quiero',
          pieges: [{ si: 'quero', message: 'Querer prend « ie » à yo : quiero.' }],
        },
        {
          id: 'dip-querer-tu', type: 'forme', verbe: 'querer', personne: 'tú', es: 'quieres',
          pieges: [{ si: 'queres', message: 'Querer prend « ie » à tú : quieres.' }],
        },
        {
          id: 'dip-querer-nosotros', type: 'forme', verbe: 'querer', personne: 'nosotros', es: 'queremos',
          pieges: [{ si: 'quieremos', message: 'Pas de « ie » à nosotros : queremos.' }],
        },
        {
          id: 'dip-preferir-yo', type: 'forme', verbe: 'preferir', personne: 'yo', es: 'prefiero',
          pieges: [
            { si: 'prefero', message: 'Preferir prend « ie » à yo : prefiero.' },
            { si: 'priefero', message: 'C\'est le second e qui devient ie : prefiero.' },
          ],
        },
        {
          id: 'dip-preferir-el', type: 'forme', verbe: 'preferir', personne: 'él', es: 'prefiere',
          pieges: [{ si: 'prefere', message: 'Preferir prend « ie » à él : prefiere.' }],
        },
        {
          id: 'dip-preferir-nosotros', type: 'forme', verbe: 'preferir', personne: 'nosotros', es: 'preferimos',
          pieges: [
            { si: 'prefierimos', message: 'Pas de « ie » à nosotros : preferimos.' },
            { si: 'preferemos', message: 'Preferir est en -ir : preferimos.' },
          ],
        },
        {
          id: 'dip-preferir-vosotros', type: 'forme', verbe: 'preferir', personne: 'vosotros', es: 'preferís',
          pieges: [
            { si: 'prefierís', message: 'Pas de « ie » à vosotros : preferís.' },
            { si: 'preferéis', message: 'Preferir est en -ir : vosotros preferís.' },
          ],
        },
        {
          id: 'dip-preferir-ellos', type: 'forme', verbe: 'preferir', personne: 'ellos', es: 'prefieren',
          pieges: [{ si: 'preferen', message: 'Preferir prend « ie » à ellos : prefieren.' }],
        },
        {
          id: 'dip-pensar-yo', type: 'forme', verbe: 'pensar', personne: 'yo', es: 'pienso',
          pieges: [{ si: 'penso', message: 'Pensar prend « ie » à yo : pienso.' }],
        },
        {
          id: 'dip-trou-preferir', type: 'trou', verbe: 'preferir',
          phrase: '¿Qué ___ tú, el fútbol o el baloncesto?', es: 'prefieres',
          pieges: [{ si: 'preferes', message: 'Preferir prend « ie » à tú : prefieres.' }],
        },
      ],
    },

    // ── 5. Gustar et encantar ────────────────────────────────────────────
    {
      id: 'u03-gustar',
      titre: 'Gustar y encantar',
      sousTitre: 'Dire ce qu\'on aime, ce qu\'on adore',
      duree: 4,
      fiche: [
        {
          type: 'conjugaison',
          titre: 'Le pronom dit à qui ça plaît',
          personnes: ['(a mí)', '(a ti)', '(a él, a ella)', '(a nosotros)', '(a vosotros)', '(a ellos, a ellas)'],
          verbes: [
            { infinitif: 'gusta', sens: '+ singulier ou infinitif', formes: ['me gusta', 'te gusta', 'le gusta', 'nos gusta', 'os gusta', 'les gusta'] },
            { infinitif: 'gustan', sens: '+ pluriel', formes: ['me gustan', 'te gustan', 'le gustan', 'nos gustan', 'os gustan', 'les gustan'] },
          ],
        },
        {
          type: 'regle',
          titre: 'Gustar s\'accorde avec ce qui plaît',
          lignes: [
            '**gusta** + un nom singulier ou un verbe à l\'infinitif : *Me gusta el fútbol. Nos gusta cantar.*',
            '**gustan** + un nom pluriel : *Te gustan los perros.*',
            '**encantar** = adorer, et se construit pareil : *Me encanta bailar. Les encantan los gatos.*',
            '**no** passe devant le pronom : *No me gusta el esquí.*',
            'Pour dire qui : **a** + la personne — *A mi hermano le gusta la hípica.*',
          ],
        },
        {
          type: 'vocabulaire',
          titre: 'Talentos y aficiones — les talents et les loisirs',
          mots: [
            { es: 'bailar', fr: 'danser', emoji: '💃' },
            { es: 'cantar', fr: 'chanter', emoji: '🎤' },
            { es: 'tocar un instrumento', fr: "jouer d'un instrument", emoji: '🎸' },
            { es: 'hacer las palmas', fr: 'frapper dans ses mains, en rythme', emoji: '👏' },
            { es: 'el ballet', fr: 'la danse classique', emoji: '🩰' },
            { es: 'el baloncesto', fr: 'le basket', emoji: '🏀' },
            { es: 'el esquí', fr: 'le ski', emoji: '⛷️' },
            { es: 'el fútbol', fr: 'le foot', emoji: '⚽' },
            { es: 'el voleibol', fr: 'le volley', emoji: '🏐' },
            { es: 'la hípica', fr: "l'équitation", emoji: '🏇' },
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Pas « yo gusto » : c\'est ce qui plaît qui fait le verbe. *Me gusta* = ça me plaît.',
            'Deux infinitifs, toujours **gusta** : *Me gusta bailar y cantar.*',
            'Pour él et ella : **le**, jamais « se » ni « la » — *A Lucía le gusta cantar.*',
            '**a mí** prend un accent (le pronom), **a ti** jamais ; **mi** sans accent = mon, ma : *A mí me gusta mi perro.*',
            '**tocar** un instrument, **jugar** à un jeu ou à un sport : *Toco la guitarra. Juego al fútbol.*',
          ],
        },
      ],
      items: [
        {
          id: 'gus-futbol', type: 'trou', verbe: 'gustar', phrase: 'Me ___ el fútbol.', es: 'gusta',
          pieges: [{ si: 'gustan', message: 'El fútbol est au singulier : me gusta.' }],
        },
        {
          id: 'gus-gatos', type: 'trou', verbe: 'gustar', phrase: 'Me ___ los gatos.', es: 'gustan',
          pieges: [{ si: 'gusta', message: 'Los gatos est au pluriel : me gustan.' }],
        },
        {
          id: 'gus-infinitifs', type: 'trou', verbe: 'gustar', phrase: 'Nos ___ bailar y cantar.', es: 'gusta',
          pieges: [{ si: 'gustan', message: 'Des verbes à l\'infinitif : toujours gusta, même s\'il y en a deux.' }],
        },
        {
          id: 'gus-encantan', type: 'trou', verbe: 'encantar', phrase: 'A mis primas les ___ las mascotas.', es: 'encantan',
          pieges: [{ si: 'encanta', message: 'Las mascotas est au pluriel : les encantan.' }],
        },
        {
          id: 'gus-le', type: 'trou', consigne: PRONOM, phrase: 'A mi hermana ___ gusta la hípica.', es: 'le',
          pieges: [{ si: ['se', 'la'], message: 'Pour él ou ella, le pronom est le : a mi hermana le gusta.' }],
        },
        {
          id: 'gus-les', type: 'trou', consigne: PRONOM, phrase: 'A mis padres ___ encanta bailar.', es: 'les',
          pieges: [{ si: ['le', 'se'], message: 'Mis padres, ce sont plusieurs personnes : les encanta.' }],
        },
        {
          id: 'gus-mi', type: 'trou', consigne: 'Pour dire « Moi, j\'aime chanter » :', phrase: 'A ___ me gusta cantar.', es: 'mí',
          pieges: [
            { si: 'mi', resultat: 'presque', message: 'Après a, c\'est le pronom : a mí, avec un accent. Mi sans accent = mon, ma.' },
            { si: 'yo', message: 'Après a, on ne dit pas « a yo » : a mí.' },
          ],
        },
        {
          id: 'gus-yo-gusto', type: 'choix', consigne: 'Pour dire « J\'aime le basket » :',
          phrase: '___ el baloncesto.', options: ['Yo gusto', 'Me gustan', 'Me gusta'], es: 'Me gusta',
          explication: 'Le basket me plaît : me gusta, au singulier. « Yo gusto » ne se dit pas.',
        },
        {
          id: 'gus-te', type: 'choix', consigne: 'Pour dire « Tu aimes les chiens ? » :',
          phrase: '¿___ los perros?', options: ['Te gustan', 'Te gusta', 'Tú gustas'], es: 'Te gustan',
          explication: 'Los perros est au pluriel : te gustan.',
        },
        {
          id: 'gus-no', type: 'choix', consigne: 'Pour dire « Je n\'aime pas le ski » :',
          phrase: '___ el esquí.', options: ['Me no gusta', 'No me gusta', 'No gusto'], es: 'No me gusta',
          explication: 'No passe devant le pronom : no me gusta.',
        },
        {
          id: 'gus-tocar', type: 'trou', consigne: 'Pour dire « Mon père joue de la guitare » :',
          phrase: 'Mi padre ___ la guitarra.', es: 'toca',
          pieges: [{ si: ['juega', 'jugar'], message: 'Jugar, c\'est jouer à un jeu ou à un sport. D\'un instrument : tocar → toca.' }],
        },
      ],
    },

    // ── 6. Écrire des phrases entières ───────────────────────────────────
    {
      id: 'u03-escribir',
      titre: 'Escribir',
      sousTitre: 'Des phrases entières, corrigées par Merlin',
      duree: 5,
      fiche: [
        {
          type: 'regle',
          titre: 'Tout ce qu\'on vient de revoir, en phrases',
          lignes: [
            'Présenter : un possessif + un membre de la famille — *Mi hermana menor se llama Clara.*',
            'Comment il ou elle se sent : **estar** + adjectif accordé — *Hoy está nerviosa.*',
            'Ce qu\'il ou elle aime : **le gusta**, **le gustan**, **le encanta** — *Le encantan los caballos.*',
            'Ce que tu préfères : **prefiero** — *Prefiero el voleibol.*',
          ],
        },
      ],
      items: [
        {
          id: 'esc3-familia', type: 'decrire', sujet: 'Mi familia', emoji: '👨‍👩‍👧',
          indices: ['mi, mis', 'mayor, menor', 'estar', 'cansado, feliz, nervioso…', 'le gusta, les encanta'],
          consigne: 'Présente deux membres de ta famille en trois ou quatre phrases : qui ils sont (avec mi ou mis), comment ils se sentent aujourd\'hui (avec estar), et ce qu\'ils aiment (avec gustar ou encantar).',
          titreModele: 'Un exemple',
          modele: 'Mi hermana menor se llama Clara. Hoy está muy cansada. Le encanta la hípica. Mis abuelos están felices: les gusta bailar juntos.',
          criteres: [
            { id: 'posesivo', texte: 'Un possessif bien accordé : mi hermana, mis abuelos' },
            { id: 'familia', texte: 'Les membres de la famille en espagnol : la hermana, los abuelos…' },
            { id: 'estar', texte: 'Une émotion avec estar, l\'adjectif accordé : está cansada, están felices' },
            { id: 'gustar', texte: 'Gustar ou encantar avec le bon pronom : le encanta, les gusta' },
          ],
        },
        {
          id: 'esc3-gustos', type: 'decrire', sujet: 'Tus gustos', emoji: '⚽',
          indices: ['me gusta…', 'me gustan…', 'me encanta…', 'no me gusta…', 'prefiero…'],
          consigne: 'Dis en quatre phrases ce que tu aimes, ce que tu adores, ce que tu n\'aimes pas et ce que tu préfères : avec me gusta ou me gustan, me encanta, no me gusta et prefiero.',
          titreModele: 'Un exemple',
          modele: 'Me gustan los perros. Me encanta tocar la guitarra. No me gusta el esquí. Prefiero el fútbol.',
          criteres: [
            { id: 'gusta', texte: 'gusta + singulier ou infinitif, gustan + pluriel : me gustan los perros' },
            { id: 'encantar', texte: 'encantar pour ce que tu adores : me encanta tocar…' },
            { id: 'negation', texte: 'no devant le pronom : no me gusta' },
            { id: 'preferir', texte: 'preferir avec son « ie » : prefiero' },
          ],
        },
      ],
    },
  ],

  // ── 7. La mini-interro ─────────────────────────────────────────────────
  // Tirée des cinq premières étapes, sans indice ni seconde chance.
  interro: {
    duree: 3,
    tirage: [
      { etape: 'u03-familia', nombre: 2 },
      { etape: 'u03-posesivos', nombre: 2 },
      { etape: 'u03-estar', nombre: 2 },
      { etape: 'u03-diptongo', nombre: 2 },
      { etape: 'u03-gustar', nombre: 2 },
    ],
  },
};
