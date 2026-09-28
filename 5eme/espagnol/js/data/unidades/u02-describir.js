// Unidad 2 — décrire quelqu'un : le physique et les vêtements.
//
// D'après le manuel d'Antonin, pages 28 à 31 (paso 1 « Trajes de mil colores »,
// paso 2 « Los muertos salen a la calle »). Les encadrés « Ayuda » sont le cœur
// de l'interrogation : tout leur vocabulaire est ici. Les exercices du livre
// ont servi de modèles, mais les phrases sont écrites pour l'appli — le dépôt
// est public, on n'y recopie pas le manuel.
//
// Les identifiants ne se renumérotent jamais : la progression y est rangée.

export default {
  id: 'u02',
  numero: 2,
  titre: 'Describir : el físico y la ropa',
  detail: 'Pasos 1 y 2 · Trajes de mil colores · Los muertos salen a la calle',

  etapes: [
    // ── 1. Les vêtements ─────────────────────────────────────────────────
    {
      id: 'u02-ropa',
      titre: 'La ropa',
      sousTitre: 'Les vêtements',
      duree: 6,
      fiche: [
        {
          type: 'regle',
          lignes: [
            '**la ropa** = les vêtements · **llevar** = porter (un vêtement)',
            '*La catrina lleva un vestido largo. Los charros llevan sombreros.*',
          ],
        },
        {
          type: 'vocabulaire',
          titre: 'Ropa cotidiana — de tous les jours',
          mots: [
            { es: 'la gorra', fr: 'la casquette', emoji: '🧢' },
            { es: 'las gafas', fr: 'les lunettes', emoji: '👓' },
            { es: 'la camiseta', fr: 'le tee-shirt', emoji: '👕' },
            { es: 'el pantalón', fr: 'le pantalon', emoji: '👖' },
            { es: 'el pantalón vaquero', fr: 'le jean' },
            { es: 'las zapatillas de deporte', fr: 'les baskets', emoji: '👟' },
          ],
        },
        {
          type: 'vocabulaire',
          titre: 'Ropa tradicional — le costume mexicain',
          mots: [
            { es: 'el sombrero', fr: 'le chapeau', emoji: '👒' },
            { es: 'los pendientes', fr: "les boucles d'oreilles" },
            { es: 'la blusa', fr: 'le chemisier', emoji: '👚' },
            { es: 'el pañuelo', fr: 'le foulard' },
            { es: 'la falda', fr: 'la jupe' },
            { es: 'los zapatos', fr: 'les chaussures', emoji: '👞' },
          ],
        },
        {
          type: 'vocabulaire',
          titre: 'Aussi dans les textes du livre',
          mots: [
            { es: 'el vestido', fr: 'la robe', emoji: '👗' },
            { es: 'el jersey', fr: 'le pull' },
            { es: 'la camisa', fr: 'la chemise', emoji: '👔' },
            { es: 'la chaqueta', fr: 'la veste', emoji: '🧥' },
            { es: 'el traje', fr: 'le costume' },
            { es: 'el chaleco', fr: 'le gilet' },
            { es: 'las botas', fr: 'les bottes', emoji: '👢' },
          ],
        },
        {
          type: 'piege',
          lignes: [
            "Le genre n'est pas toujours celui du français : **el** vestido (la robe), **la** camiseta (le tee-shirt), **la** blusa (le chemisier), **los** zapatos (les chaussures), **los** pendientes (les boucles d'oreilles).",
            '**la camisa** = la chemise, mais **la camiseta** = le tee-shirt.',
          ],
        },
      ],
      items: [
        { id: 'ropa-ropa', type: 'mot', fr: 'les vêtements', es: 'la ropa', note: 'Un singulier en espagnol : la ropa.' },
        { id: 'ropa-llevar', type: 'mot', fr: 'porter (un vêtement)', es: 'llevar' },
        { id: 'ropa-gorra', type: 'mot', fr: 'la casquette', emoji: '🧢', es: 'la gorra' },
        { id: 'ropa-gafas', type: 'mot', fr: 'les lunettes', emoji: '👓', es: 'las gafas' },
        {
          id: 'ropa-camiseta', type: 'mot', fr: 'le tee-shirt', emoji: '👕', es: 'la camiseta',
          note: 'Féminin en espagnol : la camiseta.',
          pieges: [{ si: 'la camisa', message: "La camisa, c'est la chemise. Le tee-shirt, c'est la camiseta." }],
        },
        { id: 'ropa-pantalon', type: 'mot', fr: 'le pantalon', emoji: '👖', es: 'el pantalón', accepte: ['los pantalones'] },
        {
          id: 'ropa-vaquero', type: 'mot', fr: 'le jean', es: 'el pantalón vaquero',
          accepte: ['el vaquero', 'los vaqueros', 'los pantalones vaqueros'],
        },
        {
          id: 'ropa-zapatillas', type: 'mot', fr: 'les baskets', emoji: '👟', es: 'las zapatillas de deporte',
          accepte: ['las zapatillas'],
        },
        { id: 'ropa-sombrero', type: 'mot', fr: 'le chapeau', emoji: '👒', es: 'el sombrero' },
        { id: 'ropa-pendientes', type: 'mot', fr: "les boucles d'oreilles", es: 'los pendientes', note: 'Masculin en espagnol : los pendientes.' },
        { id: 'ropa-blusa', type: 'mot', fr: 'le chemisier', emoji: '👚', es: 'la blusa', note: 'Féminin en espagnol : la blusa.' },
        { id: 'ropa-panuelo', type: 'mot', fr: 'le foulard', es: 'el pañuelo', note: 'Avec un ñ : pa-ñue-lo.' },
        { id: 'ropa-falda', type: 'mot', fr: 'la jupe', es: 'la falda' },
        { id: 'ropa-zapatos', type: 'mot', fr: 'les chaussures', emoji: '👞', es: 'los zapatos', note: 'Masculin en espagnol : los zapatos.' },
        { id: 'ropa-vestido', type: 'mot', fr: 'la robe', emoji: '👗', es: 'el vestido', note: 'Masculin en espagnol : el vestido.' },
        { id: 'ropa-jersey', type: 'mot', fr: 'le pull', es: 'el jersey' },
        {
          id: 'ropa-camisa', type: 'mot', fr: 'la chemise', emoji: '👔', es: 'la camisa',
          pieges: [{ si: 'la camiseta', message: "La camiseta, c'est le tee-shirt. La chemise, c'est la camisa." }],
        },
        { id: 'ropa-chaqueta', type: 'mot', fr: 'la veste', emoji: '🧥', es: 'la chaqueta' },
        { id: 'ropa-traje', type: 'mot', fr: 'le costume', es: 'el traje', note: 'Un traje típico : un costume traditionnel.' },
      ],
    },

    // ── 2. Le physique ───────────────────────────────────────────────────
    {
      id: 'u02-fisico',
      titre: 'El físico',
      sousTitre: 'Le visage, le corps, les adjectifs',
      duree: 7,
      fiche: [
        {
          type: 'vocabulaire',
          titre: 'La cara y el cuerpo — le visage et le corps',
          mots: [
            { es: 'el pelo', fr: 'les cheveux' },
            { es: 'las cejas', fr: 'les sourcils' },
            { es: 'los ojos', fr: 'les yeux', emoji: '👀' },
            { es: 'la nariz', fr: 'le nez', emoji: '👃' },
            { es: 'la boca', fr: 'la bouche', emoji: '👄' },
            { es: 'los dientes', fr: 'les dents', emoji: '🦷' },
            { es: 'el bigote', fr: 'la moustache' },
            { es: 'la cabeza', fr: 'la tête' },
          ],
        },
        {
          type: 'vocabulaire',
          titre: 'Los adjetivos — et leurs contraires',
          mots: [
            { es: 'alto, alta ≠ bajo, baja', fr: 'grand(e) ≠ petit(e) — une personne' },
            { es: 'gordo, gorda ≠ delgado, delgada', fr: 'gros(se) ≠ mince' },
            { es: 'guapo, guapa ≠ feo, fea', fr: 'beau, belle ≠ laid(e)' },
            { es: 'grande ≠ pequeño, pequeña', fr: 'grand(e) ≠ petit(e) — une chose' },
            { es: 'largo, larga ≠ corto, corta', fr: 'long(ue) ≠ court(e)' },
            { es: 'rubio, rubia', fr: 'blond(e)' },
            { es: 'moreno, morena', fr: 'brun(e)' },
            { es: 'pelirrojo, pelirroja', fr: 'roux, rousse' },
            { es: 'rizado, rizada', fr: 'frisé(e)' },
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**el pelo** = les cheveux, mais au singulier : *Tiene el pelo largo.*',
            'Grand, petit : **alto / bajo** pour une personne, **grande / pequeño** pour une chose ou une partie du corps : *Es alto. Tiene la nariz pequeña.*',
            '**largo** veut dire long — pas large !',
            'Le genre change : **la** nariz (le nez), **el** bigote (la moustache), **los** dientes (les dents).',
          ],
        },
      ],
      items: [
        {
          id: 'fis-pelo', type: 'mot', fr: 'les cheveux', es: 'el pelo', accepte: ['el cabello'],
          note: 'Au singulier en espagnol : el pelo.',
          pieges: [{ si: 'los pelos', resultat: 'presque', message: "C'est le bon mot, mais les cheveux sont au singulier en espagnol : el pelo." }],
        },
        { id: 'fis-cejas', type: 'mot', fr: 'les sourcils', es: 'las cejas' },
        { id: 'fis-ojos', type: 'mot', fr: 'les yeux', emoji: '👀', es: 'los ojos' },
        { id: 'fis-nariz', type: 'mot', fr: 'le nez', emoji: '👃', es: 'la nariz', note: 'Féminin en espagnol : la nariz.' },
        { id: 'fis-boca', type: 'mot', fr: 'la bouche', emoji: '👄', es: 'la boca' },
        { id: 'fis-dientes', type: 'mot', fr: 'les dents', emoji: '🦷', es: 'los dientes', note: 'Masculin en espagnol : los dientes.' },
        { id: 'fis-bigote', type: 'mot', fr: 'la moustache', es: 'el bigote', note: 'Masculin en espagnol : el bigote.' },
        { id: 'fis-cabeza', type: 'mot', fr: 'la tête', es: 'la cabeza' },
        {
          id: 'adj-alto', type: 'adjectif', fr: 'grand, grande — une personne', es: 'alto', fem: 'alta',
          pieges: [{ si: 'grande', message: "Pour la taille d'une personne, « grand » se dit alto. Grande, c'est pour une chose : una cabeza grande." }],
        },
        {
          id: 'adj-bajo', type: 'adjectif', fr: 'petit, petite — une personne', es: 'bajo', fem: 'baja',
          pieges: [{ si: ['pequeño', 'pequeña'], message: "Pour la taille d'une personne, « petit » se dit bajo. Pequeño, c'est pour une chose : una nariz pequeña." }],
        },
        { id: 'adj-gordo', type: 'adjectif', fr: 'gros, grosse', es: 'gordo', fem: 'gorda' },
        { id: 'adj-delgado', type: 'adjectif', fr: 'mince', es: 'delgado', fem: 'delgada' },
        { id: 'adj-guapo', type: 'adjectif', fr: 'beau, belle', es: 'guapo', fem: 'guapa' },
        { id: 'adj-feo', type: 'adjectif', fr: 'laid, laide', es: 'feo', fem: 'fea' },
        {
          id: 'adj-grande', type: 'adjectif', fr: 'grand, grande — une chose', es: 'grande',
          pieges: [{ si: ['alto', 'alta'], message: "Alto, c'est pour la taille d'une personne. Pour une chose ou une partie du corps : grande." }],
        },
        {
          id: 'adj-pequeno', type: 'adjectif', fr: 'petit, petite — une chose', es: 'pequeño', fem: 'pequeña',
          pieges: [{ si: ['bajo', 'baja'], message: "Bajo, c'est pour la taille d'une personne. Pour une chose ou une partie du corps : pequeño." }],
        },
        { id: 'adj-largo', type: 'adjectif', fr: 'long, longue', es: 'largo', fem: 'larga' },
        { id: 'adj-corto', type: 'adjectif', fr: 'court, courte', es: 'corto', fem: 'corta' },
        { id: 'adj-rubio', type: 'adjectif', fr: 'blond, blonde', es: 'rubio', fem: 'rubia' },
        { id: 'adj-moreno', type: 'adjectif', fr: 'brun, brune', es: 'moreno', fem: 'morena' },
        { id: 'adj-pelirrojo', type: 'adjectif', fr: 'roux, rousse', es: 'pelirrojo', fem: 'pelirroja', note: 'Pelo + rojo : pelirrojo, avec deux r.' },
      ],
    },

    // ── 3. Les trois verbes de la description ───────────────────────────
    {
      id: 'u02-verbos',
      titre: 'Ser, tener, llevar',
      sousTitre: 'Les trois verbes pour décrire',
      duree: 6,
      fiche: [
        {
          type: 'regle',
          titre: 'Un verbe pour chaque chose',
          lignes: [
            '**ser** + un adjectif : comment on EST — *Es alta y morena.*',
            "**tener** + une partie du corps : ce qu'on A — *Tiene el pelo largo. Tienen los ojos azules.*",
            "**llevar** + un vêtement : ce qu'on PORTE — *Lleva una falda. Llevan gafas.*",
          ],
        },
        {
          type: 'conjugaison',
          verbes: [
            { infinitif: 'ser', sens: 'être', formes: ['soy', 'eres', 'es', 'somos', 'sois', 'son'] },
            { infinitif: 'tener', sens: 'avoir', formes: ['tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen'] },
            { infinitif: 'llevar', sens: 'porter', formes: ['llevo', 'llevas', 'lleva', 'llevamos', 'lleváis', 'llevan'] },
          ],
        },
        {
          type: 'piege',
          lignes: [
            'tener : **yo tengo** ; « ie » à tú, él, ellos (tienes, tiene, tienen) ; mais **tenemos, tenéis**.',
            "Un accent à vosotros : **tenéis, lleváis** — mais **sois** n'en a pas.",
            'Au pluriel, llevar fait comme tous les verbes en -ar : **-amos, -áis, -an**. *Los mexicanos bailan en la calle.*',
          ],
        },
      ],
      items: [
        {
          id: 'ver-tener-yo', type: 'forme', verbe: 'tener', personne: 'yo', es: 'tengo',
          pieges: [{ si: 'tieno', message: 'À la première personne, tener fait yo tengo : une forme à part, à apprendre par cœur.' }],
        },
        { id: 'ver-tener-tu', type: 'forme', verbe: 'tener', personne: 'tú', es: 'tienes' },
        {
          id: 'ver-tener-vosotros', type: 'forme', verbe: 'tener', personne: 'vosotros', es: 'tenéis',
          pieges: [{ si: 'tieneis', message: 'Pas de « ie » à nosotros et vosotros : tenemos, tenéis.' }],
        },
        {
          id: 'ver-tener-ellos', type: 'forme', verbe: 'tener', personne: 'ellos', es: 'tienen',
          pieges: [{ si: 'tenen', message: 'Tener prend « ie » à tú, él et ellos : tienes, tiene, tienen.' }],
        },
        {
          id: 'ver-ser-tu', type: 'forme', verbe: 'ser', personne: 'tú', es: 'eres',
          pieges: [{ si: 'es', message: "Es, c'est pour él ou ella. Avec tú : eres." }],
        },
        { id: 'ver-ser-nosotros', type: 'forme', verbe: 'ser', personne: 'nosotros', es: 'somos' },
        { id: 'ver-ser-vosotros', type: 'forme', verbe: 'ser', personne: 'vosotros', es: 'sois' },
        { id: 'ver-llevar-nosotros', type: 'forme', verbe: 'llevar', personne: 'nosotros', es: 'llevamos' },
        { id: 'ver-llevar-vosotros', type: 'forme', verbe: 'llevar', personne: 'vosotros', es: 'lleváis' },
        {
          id: 'ver-choix-bigote', type: 'choix', phrase: 'Mi abuelo ___ bigote.',
          options: ['es', 'tiene', 'lleva'], es: 'tiene',
          explication: 'Le bigote est une partie du visage : tener. Tiene bigote.',
        },
        {
          id: 'ver-choix-vestido', type: 'choix', phrase: 'La catrina ___ un vestido largo.',
          options: ['es', 'tiene', 'lleva'], es: 'lleva',
          explication: "Un vêtement qu'on porte : llevar. Lleva un vestido.",
        },
        {
          id: 'ver-choix-delgados', type: 'choix', phrase: 'Los esqueletos ___ muy delgados.',
          options: ['son', 'tienen', 'llevan'], es: 'son',
          explication: 'Un adjectif qui dit comment ils sont : ser. Son delgados.',
        },
        {
          id: 'ver-choix-ojos', type: 'choix', phrase: 'Yo ___ los ojos verdes.',
          options: ['soy', 'tengo', 'llevo'], es: 'tengo',
          explication: 'Les yeux sont une partie du corps : tener. Tengo los ojos verdes.',
        },
        {
          id: 'ver-choix-rubias', type: 'choix', phrase: 'Mis primas ___ rubias.',
          options: ['son', 'tienen', 'llevan'], es: 'son',
          explication: 'Rubias est un adjectif : ser. Son rubias.',
        },
        {
          id: 'ver-choix-gorra', type: 'choix', phrase: 'Hoy, tú ___ una gorra roja.',
          options: ['eres', 'tienes', 'llevas'], es: 'llevas',
          explication: 'La gorra est un vêtement : llevar. Llevas una gorra.',
        },
        { id: 'ver-trou-cabezas', type: 'trou', phrase: 'Las calaveras ___ dientes grandes.', verbe: 'tener', es: 'tienen' },
        { id: 'ver-trou-altos', type: 'trou', phrase: 'Nosotros ___ altos y morenos.', verbe: 'ser', es: 'somos' },
        { id: 'ver-trou-faldas', type: 'trou', phrase: 'Vosotras ___ faldas largas.', verbe: 'llevar', es: 'lleváis' },
      ],
    },

    // ── 4. Le pluriel ────────────────────────────────────────────────────
    {
      id: 'u02-plural',
      titre: 'El plural',
      sousTitre: 'Mettre au pluriel, tout accorder',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Former le pluriel',
          lignes: [
            'Mot terminé par une **voyelle** → **+s** : la falda → las falda**s** · grande → grande**s**',
            'Mot terminé par une **consonne** → **+es** : la flor → las flor**es** · azul → azul**es** · el color → los color**es**',
            '**-z** devient **-ces** : la nariz → las nari**ces**',
            'Les articles : el → **los** · la → **las** · un → **unos** · una → **unas**',
            'Tout s\'accorde, le verbe aussi : *Lleva una falda roja.* → *Llevan faldas rojas.*',
          ],
        },
        {
          type: 'piege',
          lignes: [
            "L'accent disparaît au pluriel : pantal**ó**n → pantal**o**nes · marr**ó**n → marr**o**nes.",
            '**el pelo** reste au singulier : *Tienen el pelo corto.*',
          ],
        },
      ],
      items: [
        {
          id: 'plu-pantalon', type: 'pluriel', de: 'el pantalón', es: 'los pantalones',
          explication: "Consonne finale → +es, et l'accent disparaît : los pantalones.",
          pieges: [{ si: 'los pantalónes', resultat: 'presque', message: "Le pluriel est juste, mais l'accent disparaît : los pantalones." }],
        },
        { id: 'plu-flor', type: 'pluriel', de: 'la flor', es: 'las flores', explication: 'Consonne finale → +es : las flores.' },
        {
          id: 'plu-zapato-marron', type: 'pluriel', de: 'un zapato marrón', es: 'unos zapatos marrones',
          accepte: ['zapatos marrones'],
          explication: 'un → unos ; zapato → zapatos ; marrón → marrones, sans accent.',
        },
        {
          id: 'plu-chaqueta-azul', type: 'pluriel', de: 'una chaqueta azul', es: 'unas chaquetas azules',
          accepte: ['chaquetas azules'],
          explication: 'una → unas ; azul finit par une consonne → azules.',
        },
        {
          id: 'plu-vestido-largo', type: 'pluriel', de: 'el vestido largo', es: 'los vestidos largos',
          explication: "el → los, et l'adjectif s'accorde : largos.",
        },
        {
          id: 'plu-nariz', type: 'pluriel', de: 'la nariz', es: 'las narices',
          explication: 'Le z devient c devant -es : las narices.',
          pieges: [{ si: 'las narizes', message: 'Le z devient c devant -es : las narices.' }],
        },
        {
          id: 'plu-frase-gorra', type: 'pluriel', de: 'El chico lleva una gorra roja.', es: 'Los chicos llevan gorras rojas.',
          accepte: ['Los chicos llevan unas gorras rojas.'],
          explication: 'Tout passe au pluriel : los chicos, llevan, gorras rojas.',
        },
        {
          id: 'plu-frase-catrina', type: 'pluriel', de: 'La catrina es alta y delgada.', es: 'Las catrinas son altas y delgadas.',
          explication: "es → son, et les deux adjectifs s'accordent : altas y delgadas.",
        },
        {
          id: 'plu-frase-pelo', type: 'pluriel', de: 'Tengo el pelo corto.', es: 'Tenemos el pelo corto.',
          explication: 'Le pluriel de yo, c\'est nosotros : tenemos. El pelo reste au singulier.',
          pieges: [
            { si: 'Tenemos los pelos cortos.', resultat: 'presque', message: 'Tenemos, c\'est juste ! Mais el pelo reste au singulier : Tenemos el pelo corto.' },
            { si: 'Tienen el pelo corto.', message: 'Tengo, c\'est yo : son pluriel est nosotros, donc tenemos.' },
          ],
        },
      ],
    },

    // ── 5. Écrire une description ────────────────────────────────────────
    {
      id: 'u02-describir',
      titre: 'Describir',
      sousTitre: 'Écrire une description, comme en interro',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Trois phrases, trois verbes',
          lignes: [
            '**Es** + adjectif : *Es alta y delgada.*',
            '**Tiene** + partie du corps + adjectif : *Tiene el pelo largo y los ojos verdes.*',
            '**Lleva** + vêtement + couleur : *Lleva un vestido azul y un sombrero.*',
            'Pour relier : **y** (et) · **pero** (mais) · **también** (aussi) · **no** devant le verbe : *No lleva gafas.*',
          ],
        },
      ],
      items: [
        {
          id: 'des-catrina', type: 'decrire', sujet: 'La catrina', emoji: '💀',
          indices: ['alto', 'pelo', 'largo', 'rizado', 'falda', 'rojo'],
          consigne: 'Décris-la en trois phrases : une avec ser, une avec tener, une avec llevar. Accorde les adjectifs !',
          modele: 'La catrina es alta. Tiene el pelo largo y rizado. Lleva una falda roja.',
          criteres: [
            { id: 'ser', texte: 'Un adjectif avec ser : es alta' },
            { id: 'tener', texte: 'Une partie du corps avec tener : tiene el pelo largo y rizado' },
            { id: 'llevar', texte: 'Un vêtement avec llevar : lleva una falda roja' },
            { id: 'accords', texte: 'Les adjectifs accordés au féminin : alta, roja' },
          ],
        },
        {
          id: 'des-tu', type: 'decrire', sujet: 'Toi', emoji: '🙂',
          indices: ['soy…', 'tengo…', 'llevo…'],
          consigne: 'Décris-toi en trois phrases : comment tu es, ce que tu as, ce que tu portes aujourd\'hui.',
          titreModele: 'Un exemple',
          modele: 'Soy alto y moreno. Tengo el pelo corto y los ojos marrones. Llevo una camiseta azul y unas zapatillas de deporte.',
          criteres: [
            { id: 'ser', texte: 'Un adjectif avec ser : soy alto, soy moreno…' },
            { id: 'tener', texte: 'Une partie du corps avec tener : tengo el pelo corto…' },
            { id: 'llevar', texte: 'Un vêtement avec llevar : llevo una camiseta…' },
            { id: 'accords', texte: 'Les adjectifs accordés au nom : los ojos marrones, una camiseta azul…' },
          ],
        },
      ],
    },
  ],

  // ── 6. La mini-interro ─────────────────────────────────────────────────
  // Tirée des étapes 1 à 4, sans indice ni seconde chance.
  interro: {
    duree: 3,
    tirage: [
      { etape: 'u02-ropa', nombre: 3 },
      { etape: 'u02-fisico', nombre: 3 },
      { etape: 'u02-verbos', nombre: 2 },
      { etape: 'u02-plural', nombre: 2 },
    ],
  },
};
