// Unidad 2 — « Memoriza » : conjuguer au présent, et comparer.
//
// Pour le contrôle annoncé par la professeure : les conjugaisons des verbes
// réguliers, des irréguliers ser et tener, du pronominal llamarse, et les
// comparatifs — pages 36 et 37 du manuel. Le pluriel, en haut de la page 36,
// n'est pas dans sa liste : il est déjà dans « Describir » (étape « El plural »).
//
// Conjuguer une forme isolée ne suffit pas : l'étape « Escribir » lui fait
// écrire des phrases entières, corrigées par Merlin (Denis l'a demandé).
//
// Les phrases sont écrites pour l'appli, pas reprises du manuel : le dépôt est
// public.
//
// Les identifiants ne se renumérotent jamais : la progression y est rangée.

const QUI = 'Le pronom sujet est facultatif : qui parle ?';

export default {
  id: 'u02m',
  numero: 2,
  titre: 'Memoriza : conjugar y comparar',
  detail: 'Páginas 36 y 37 · Presente · Ser y tener · Llamarse · Comparativos',

  // Ce que Merlin sait du module quand il corrige un texte.
  profilMerlin: 'Élève de 5e, première année d\'espagnol (LV2). Module en cours : le présent des verbes réguliers '
    + '(-ar, -er, -ir : hablar, comer, vivir), ser et tener, le pronominal llamarse (me llamo, te llamas, se llama, '
    + 'nos llamamos, os llamáis, se llaman), la négation (no devant le verbe, et devant le pronom : no me llamo), et les '
    + 'comparatifs más / menos + adjectif ou nom + que. Le pronom sujet est facultatif.',

  etapes: [
    // ── 1. Les verbes réguliers ──────────────────────────────────────────
    {
      id: 'm02-regulares',
      titre: 'Los verbos regulares',
      sousTitre: 'Hablar, comer, vivir : le radical, puis la terminaison',
      duree: 7,
      fiche: [
        {
          type: 'regle',
          titre: 'Radical + terminaison',
          lignes: [
            'On garde le radical (**habl**-, **com**-, **viv**-) et on ajoute la terminaison de la personne.',
            // Tirets insécables (‑) : une terminaison ne se coupe pas en fin de ligne.
            'Verbes en **-ar** : ‑o, ‑as, ‑a, ‑amos, ‑áis, ‑an',
            'Verbes en **-er** : ‑o, ‑es, ‑e, ‑emos, ‑éis, ‑en',
            'Verbes en **-ir** : ‑o, ‑es, ‑e, ‑imos, ‑ís, ‑en',
          ],
        },
        {
          type: 'conjugaison',
          verbes: [
            { infinitif: 'hablar', sens: 'parler', formes: ['hablo', 'hablas', 'habla', 'hablamos', 'habláis', 'hablan'] },
            { infinitif: 'comer', sens: 'manger', formes: ['como', 'comes', 'come', 'comemos', 'coméis', 'comen'] },
            { infinitif: 'vivir', sens: 'vivre', formes: ['vivo', 'vives', 'vive', 'vivimos', 'vivís', 'viven'] },
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**-er** et **-ir** ne se séparent qu\'à nosotros et vosotros : com**emos**, com**éis** — viv**imos**, viv**ís**.',
            'Un accent à vosotros : habl**áis**, com**éis**, viv**ís**.',
            'Le pronom sujet est facultatif : la terminaison dit qui parle. *Hablo español* = je parle espagnol.',
          ],
        },
      ],
      items: [
        { id: 'reg-hablar-yo', type: 'forme', verbe: 'hablar', personne: 'yo', es: 'hablo' },
        { id: 'reg-hablar-vosotros', type: 'forme', verbe: 'hablar', personne: 'vosotros', es: 'habláis' },
        { id: 'reg-bailar-nosotros', type: 'forme', verbe: 'bailar', personne: 'nosotros', es: 'bailamos' },
        { id: 'reg-llevar-tu', type: 'forme', verbe: 'llevar', personne: 'tú', es: 'llevas' },
        {
          id: 'reg-comer-tu', type: 'forme', verbe: 'comer', personne: 'tú', es: 'comes',
          pieges: [{ si: 'comas', message: 'Comer est en -er : tú comes. -as, c\'est pour les verbes en -ar.' }],
        },
        {
          id: 'reg-comer-nosotros', type: 'forme', verbe: 'comer', personne: 'nosotros', es: 'comemos',
          pieges: [
            { si: 'comimos', message: '-imos, c\'est pour les verbes en -ir. Comer est en -er : comemos.' },
            { si: 'comamos', message: '-amos, c\'est pour les verbes en -ar. Comer est en -er : comemos.' },
          ],
        },
        {
          id: 'reg-comer-vosotros', type: 'forme', verbe: 'comer', personne: 'vosotros', es: 'coméis',
          pieges: [{ si: 'comís', message: '-ís, c\'est pour les verbes en -ir. Comer est en -er : coméis.' }],
        },
        {
          id: 'reg-beber-ellos', type: 'forme', verbe: 'beber', personne: 'ellos', es: 'beben',
          pieges: [{ si: 'beban', message: 'Beber est en -er : ellos beben. -an, c\'est pour les verbes en -ar.' }],
        },
        { id: 'reg-vivir-el', type: 'forme', verbe: 'vivir', personne: 'él', es: 'vive' },
        {
          id: 'reg-vivir-nosotros', type: 'forme', verbe: 'vivir', personne: 'nosotros', es: 'vivimos',
          pieges: [{ si: 'vivemos', message: 'Vivir est en -ir : nosotros vivimos (-imos).' }],
        },
        {
          id: 'reg-vivir-vosotros', type: 'forme', verbe: 'vivir', personne: 'vosotros', es: 'vivís',
          pieges: [{ si: 'vivéis', message: 'Vivir est en -ir : vosotros vivís (-ís).' }],
        },
        { id: 'reg-escribir-yo', type: 'forme', verbe: 'escribir', personne: 'yo', es: 'escribo' },
        { id: 'reg-trou-celebrar', type: 'trou', phrase: 'En México, las familias ___ el Día de Muertos.', verbe: 'celebrar', es: 'celebran' },
        {
          id: 'reg-trou-vivir', type: 'trou', phrase: '¿Dónde ___ tus abuelos?', verbe: 'vivir', es: 'viven',
          pieges: [{ si: 'vivan', message: 'Vivir est en -ir : ellos viven.' }],
        },
        {
          id: 'reg-qui-comeis', type: 'choix', consigne: QUI, phrase: '« Coméis tacos. » → ___',
          options: ['vosotros', 'nosotros', 'ellos'], es: 'vosotros',
          explication: 'Coméis : la terminaison -éis, c\'est vosotros.',
        },
        {
          id: 'reg-qui-hablo', type: 'choix', consigne: QUI, phrase: '« Hablo con mi abuela. » → ___',
          options: ['yo', 'tú', 'él'], es: 'yo',
          explication: 'Hablo : la terminaison -o, c\'est yo.',
        },
      ],
    },

    // ── 2. Ser et tener ──────────────────────────────────────────────────
    {
      id: 'm02-ser-tener',
      titre: 'Ser y tener',
      sousTitre: 'Les deux irréguliers, par cœur',
      duree: 5,
      fiche: [
        {
          type: 'conjugaison',
          verbes: [
            { infinitif: 'ser', sens: 'être', formes: ['soy', 'eres', 'es', 'somos', 'sois', 'son'] },
            { infinitif: 'tener', sens: 'avoir', formes: ['tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen'] },
          ],
        },
        {
          type: 'regle',
          titre: 'Quand les employer',
          lignes: [
            '**ser** + nom : présenter, définir — *Somos hermanos.*',
            '**ser** + adjectif : décrire — *La catrina es elegante.*',
            '**tener** : caractériser, dire ce qu\'on a — *Tengo el pelo rizado.*',
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**eres**, c\'est tú ; **es**, c\'est él ou ella.',
            'tener : **tengo** à yo ; « ie » à tú, él, ellos (tienes, tiene, tienen) ; mais **tenemos**, **tenéis**.',
            '**sois** n\'a pas d\'accent ; **tenéis** en a un.',
          ],
        },
      ],
      items: [
        { id: 'st-ser-yo', type: 'forme', verbe: 'ser', personne: 'yo', es: 'soy' },
        {
          id: 'st-ser-tu', type: 'forme', verbe: 'ser', personne: 'tú', es: 'eres',
          pieges: [{ si: 'es', message: 'Es, c\'est él ou ella. Avec tú : eres.' }],
        },
        {
          id: 'st-ser-el', type: 'forme', verbe: 'ser', personne: 'él', es: 'es',
          pieges: [{ si: 'eres', message: 'Eres, c\'est tú. Avec él : es.' }],
        },
        { id: 'st-ser-nosotros', type: 'forme', verbe: 'ser', personne: 'nosotros', es: 'somos' },
        { id: 'st-ser-vosotros', type: 'forme', verbe: 'ser', personne: 'vosotros', es: 'sois' },
        { id: 'st-ser-ellos', type: 'forme', verbe: 'ser', personne: 'ellos', es: 'son' },
        {
          id: 'st-tener-yo', type: 'forme', verbe: 'tener', personne: 'yo', es: 'tengo',
          pieges: [{ si: 'tieno', message: 'À yo, tener fait tengo : une forme à part, à apprendre par cœur.' }],
        },
        {
          id: 'st-tener-el', type: 'forme', verbe: 'tener', personne: 'él', es: 'tiene',
          pieges: [{ si: 'tene', message: 'Tener prend « ie » à tú, él et ellos : tiene.' }],
        },
        {
          id: 'st-tener-nosotros', type: 'forme', verbe: 'tener', personne: 'nosotros', es: 'tenemos',
          pieges: [{ si: 'tienemos', message: 'Pas de « ie » à nosotros : tenemos.' }],
        },
        {
          id: 'st-tener-vosotros', type: 'forme', verbe: 'tener', personne: 'vosotros', es: 'tenéis',
          pieges: [{ si: 'tienéis', message: 'Pas de « ie » à vosotros : tenéis.' }],
        },
        {
          id: 'st-tener-ellos', type: 'forme', verbe: 'tener', personne: 'ellos', es: 'tienen',
          pieges: [{ si: 'tenen', message: 'Tener prend « ie » à ellos : tienen.' }],
        },
        {
          id: 'st-choix-primos', type: 'choix', phrase: 'Diego y yo ___ primos.',
          options: ['somos', 'tenemos', 'son'], es: 'somos',
          explication: 'Ser + nom pour présenter. Diego y yo, c\'est nosotros : somos.',
        },
        {
          id: 'st-choix-orejas', type: 'choix', phrase: 'Mi perro ___ las orejas largas.',
          options: ['es', 'tiene', 'lleva'], es: 'tiene',
          explication: 'Ce qu\'il a : tener. Tiene las orejas largas.',
        },
        {
          id: 'st-choix-simpaticas', type: 'choix', phrase: 'Tus amigas ___ muy simpáticas.',
          options: ['son', 'sois', 'tienen'], es: 'son',
          explication: 'Ser + adjectif pour décrire. Tus amigas, c\'est ellas : son.',
        },
      ],
    },

    // ── 3. Llamarse, et la négation ──────────────────────────────────────
    {
      id: 'm02-llamarse',
      titre: 'Llamarse y la negación',
      sousTitre: 'Le verbe pronominal, et dire non',
      duree: 4,
      fiche: [
        {
          type: 'conjugaison',
          verbes: [
            { infinitif: 'llamarse', sens: 's\'appeler', formes: ['me llamo', 'te llamas', 'se llama', 'nos llamamos', 'os llamáis', 'se llaman'] },
          ],
        },
        {
          type: 'regle',
          titre: 'Un verbe pronominal',
          lignes: [
            'Le pronom change avec la personne : **me, te, se, nos, os, se**. Puis le verbe, comme hablar : llam**o**, llam**as**, llam**a**…',
            '*¿Cómo te llamas? — Me llamo Antonin.*',
          ],
        },
        {
          type: 'regle',
          titre: 'La négation',
          lignes: [
            '**no** se place devant le verbe : *Mi gato no es negro.*',
            'Avec un verbe pronominal, **no** passe devant le pronom : ***No** me llamo Diego.*',
            'Pas de « pas » : **no** suffit — *No tengo gafas.*',
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Le pronom ne s\'oublie pas : **me** llamo, **te** llamas — pas « llamo » tout seul.',
          ],
        },
      ],
      items: [
        {
          id: 'll-yo', type: 'forme', verbe: 'llamarse', personne: 'yo', es: 'me llamo',
          pieges: [
            { si: 'llamo', resultat: 'presque', message: 'Le verbe est juste, mais il manque le pronom : me llamo.' },
            { si: 'se llamo', message: 'Avec yo, le pronom est me : me llamo.' },
          ],
        },
        {
          id: 'll-tu', type: 'forme', verbe: 'llamarse', personne: 'tú', es: 'te llamas',
          pieges: [
            { si: 'llamas', resultat: 'presque', message: 'Le verbe est juste, mais il manque le pronom : te llamas.' },
            { si: 'se llamas', message: 'Avec tú, le pronom est te : te llamas.' },
          ],
        },
        {
          id: 'll-el', type: 'forme', verbe: 'llamarse', personne: 'él', es: 'se llama',
          pieges: [{ si: 'llama', resultat: 'presque', message: 'Le verbe est juste, mais il manque le pronom : se llama.' }],
        },
        {
          id: 'll-nosotros', type: 'forme', verbe: 'llamarse', personne: 'nosotros', es: 'nos llamamos',
          pieges: [
            { si: 'llamamos', resultat: 'presque', message: 'Le verbe est juste, mais il manque le pronom : nos llamamos.' },
            { si: 'se llamamos', message: 'Avec nosotros, le pronom est nos : nos llamamos.' },
          ],
        },
        {
          id: 'll-vosotros', type: 'forme', verbe: 'llamarse', personne: 'vosotros', es: 'os llamáis',
          pieges: [{ si: 'vos llamáis', message: 'Le pronom de vosotros est os : os llamáis.' }],
        },
        { id: 'll-ellos', type: 'forme', verbe: 'llamarse', personne: 'ellos', es: 'se llaman' },
        {
          id: 'neg-trou-ser', type: 'trou', consigne: 'Complète avec ser, à la forme négative :',
          phrase: 'Mis abuelos ___ altos.', es: 'no son',
          pieges: [{ si: 'son no', message: 'No se place devant le verbe : no son.' }],
        },
        {
          id: 'neg-llamarse', type: 'choix', consigne: 'Pour dire « Je ne m\'appelle pas Diego » :', phrase: '___ Diego.',
          options: ['No me llamo', 'Me no llamo', 'Me llamo no'], es: 'No me llamo',
          explication: 'No passe devant le pronom et le verbe : No me llamo Diego.',
        },
        {
          id: 'neg-tener', type: 'choix', consigne: 'Pour dire « Nous n\'avons pas de chien » :', phrase: '___ perro.',
          options: ['No tenemos', 'Tenemos no', 'No tienen'], es: 'No tenemos',
          explication: 'no + verbe, et nosotros : tenemos. No tenemos perro.',
        },
      ],
    },

    // ── 4. Les comparatifs ───────────────────────────────────────────────
    {
      id: 'm02-comparar',
      titre: 'Comparar',
      sousTitre: 'Más … que, menos … que',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Comparer',
          lignes: [
            '**más** + adjectif ou nom + **que** = plus … que — *Mi hermano es más alto que yo.*',
            '**menos** + adjectif ou nom + **que** = moins … que — *El gato es menos juguetón que el perro.*',
            'Avec un nom : *Tengo más primos que tú.*',
            'L\'adjectif s\'accorde : *Las catrinas son más elegantes que los charros.*',
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Toujours **que** après más et menos — jamais « como », jamais « de ».',
            'Après que, on garde **yo**, **tú** : *más alto **que yo***.',
            '**más** prend un accent ; **menos**, non.',
          ],
        },
      ],
      items: [
        {
          id: 'cmp-mas', type: 'trou', consigne: 'Pour dire « Diego est plus grand que Frida » :',
          phrase: 'Diego es ___ alto que Frida.', es: 'más',
          pieges: [
            { si: 'menos', message: 'Menos, c\'est « moins ». Plus … que : más … que.' },
            { si: 'muy', message: 'Muy veut dire « très ». Pour comparer : más … que.' },
          ],
        },
        {
          id: 'cmp-menos', type: 'trou', consigne: 'Pour dire « Le chat est moins joueur que le chien » :',
          phrase: 'El gato es ___ juguetón que el perro.', es: 'menos',
          pieges: [{ si: 'más', message: 'Más, c\'est « plus ». Moins … que : menos … que.' }],
        },
        {
          id: 'cmp-que', type: 'trou', consigne: 'Complète la comparaison :',
          phrase: 'Mi hermana es más alta ___ yo.', es: 'que',
          pieges: [{ si: ['como', 'de'], message: 'Après más ou menos, c\'est toujours que : más alta que yo.' }],
        },
        {
          id: 'cmp-nom', type: 'trou', consigne: 'Pour dire « J\'ai plus de cousins que toi » :',
          phrase: 'Tengo ___ primos que tú.', es: 'más',
          pieges: [{ si: 'más de', message: 'Pas de « de » en espagnol : más primos que tú.' }],
        },
        {
          id: 'cmp-yo', type: 'trou', consigne: 'Pour dire « Tu es plus grand que moi » :',
          phrase: 'Eres más alto que ___.', es: 'yo',
          pieges: [{ si: ['mí', 'me'], message: 'Après que, on garde yo : más alto que yo.' }],
        },
        {
          id: 'cmp-falda', type: 'choix', consigne: 'Pour dire « La jupe est moins chère que la robe » :',
          phrase: 'La falda es ___ cara que el vestido.', options: ['menos', 'más', 'muy'], es: 'menos',
          explication: 'Moins … que : menos … que.',
        },
        {
          id: 'cmp-accord', type: 'choix', consigne: 'Choisis la bonne forme :',
          phrase: 'Las calaveras son más ___ que los esqueletos.', options: ['bonitas', 'bonita', 'bonitos'], es: 'bonitas',
          explication: 'L\'adjectif s\'accorde avec las calaveras : bonitas.',
        },
        {
          id: 'cmp-libros', type: 'choix', consigne: 'Pour dire « Ma sœur a moins de livres que moi » :',
          phrase: 'Mi hermana tiene ___ que yo.', options: ['menos libros', 'libros menos', 'menos de libros'], es: 'menos libros',
          explication: 'menos + nom + que : menos libros que yo. Pas de « de ».',
        },
      ],
    },
    // ── 5. Écrire des phrases entières ───────────────────────────────────
    {
      id: 'm02-escribir',
      titre: 'Escribir',
      sousTitre: 'Des phrases entières, corrigées par Merlin',
      duree: 7,
      fiche: [
        {
          type: 'regle',
          titre: 'Écrire, pas seulement conjuguer',
          lignes: [
            'Une phrase : un sujet (souvent sous-entendu) et un verbe bien conjugué — *Vivimos en México.*',
            'Pour se présenter : **llamarse**, **ser**, **tener**, **vivir**, **hablar** — *Me llamo Lucía. Tengo doce años.*',
            '**hermanos** = frères, ou frère et sœur — *Somos hermanos.*',
            'Pour comparer : **más** ou **menos** + adjectif + **que** — *El perro es más rápido que el gato.*',
          ],
        },
      ],
      items: [
        {
          id: 'esc-nosotros', type: 'decrire', sujet: 'Pablo y Lucía se presentan', emoji: '👫',
          indices: ['llamarse', 'ser hermanos', 'vivir en México', 'tener doce años', 'hablar español'],
          consigne: 'Pablo et Lucía se présentent ensemble. Écris ce qu\'ils disent, avec « nosotros » : ils s\'appellent Pablo et Lucía, ils sont frère et sœur, ils vivent au Mexique, ils ont douze ans et ils parlent espagnol.',
          titreModele: 'Un modèle',
          modele: 'Nos llamamos Pablo y Lucía. Somos hermanos. Vivimos en México. Tenemos doce años. Hablamos español.',
          criteres: [
            { id: 'llamarse', texte: 'Llamarse avec nosotros : nos llamamos' },
            { id: 'ser', texte: 'Ser avec nosotros : somos hermanos' },
            { id: 'vivir', texte: 'Un verbe en -ir avec nosotros : vivimos (et pas « vivemos »)' },
            { id: 'tener', texte: 'Tener avec nosotros : tenemos doce años' },
            { id: 'hablar', texte: 'Un verbe en -ar avec nosotros : hablamos' },
          ],
        },
        {
          id: 'esc-comparar', type: 'decrire', sujet: 'El perro y el gato', emoji: '🐶',
          indices: ['más … que', 'menos … que', 'grande', 'rápido', 'juguetón', 'tranquilo'],
          consigne: 'Compare le chien et le chat en trois phrases : au moins une avec más … que, et une avec menos … que.',
          titreModele: 'Un modèle',
          modele: 'El perro es más grande que el gato. El gato es menos juguetón que el perro. El gato es más tranquilo que el perro.',
          criteres: [
            { id: 'mas', texte: 'Une comparaison avec más + adjectif + que' },
            { id: 'menos', texte: 'Une comparaison avec menos + adjectif + que' },
            { id: 'ser', texte: 'Le verbe ser bien conjugué : es pour un animal, son pour plusieurs' },
          ],
        },
      ],
    },
  ],

  // ── 6. La mini-interro ─────────────────────────────────────────────────
  // Tirée des quatre étapes, sans indice ni seconde chance.
  interro: {
    duree: 3,
    tirage: [
      { etape: 'm02-regulares', nombre: 3 },
      { etape: 'm02-ser-tener', nombre: 3 },
      { etape: 'm02-llamarse', nombre: 2 },
      { etape: 'm02-comparar', nombre: 2 },
    ],
  },
};
