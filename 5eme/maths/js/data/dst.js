// Le DST blanc — une épreuve sur plusieurs chapitres, comme celle de la classe.
//
// Le DST du 15 octobre 2026 porte sur les calculs et les priorités
// opératoires, les angles, et les relatifs (définition, droite graduée,
// comparer, repère, additions et soustractions) : les chapitres 1, 2, 3 et 5.
//
// Les questions sont tirées dans « Se tester » de chaque savoir-faire, au
// hasard : un DST refait n'est jamais le même. Le tirage suit l'ordre d'une
// copie — un exercice par thème — et donne vingt questions, notées sur 20.
//
// `nombre` : combien de questions tirer dans ce savoir-faire. Les angles
// alternes-internes et correspondants en ont deux : c'est le cœur du
// chapitre 2, et ce que la professeure évalue en premier.

export const DST = {
  id: 'dst-1',
  titre: 'DST blanc',
  sousTitre: 'Calculs et priorités · Angles · Relatifs',
  duree: 30,
  parties: [
    {
      titre: 'Calculs et priorités opératoires',
      tirage: [
        { sf: 'sf-1-1', nombre: 1 },
        { sf: 'sf-1-2', nombre: 1 },
        { sf: 'sf-1-3', nombre: 1 },
        { sf: 'sf-1-4', nombre: 1 },
        { sf: 'sf-1-5', nombre: 1 },
        { sf: 'sf-1-6', nombre: 1 },
        { sf: 'sf-1-7', nombre: 1 },
      ],
    },
    {
      titre: 'Les angles',
      tirage: [
        { sf: 'sf-2-1', nombre: 1 },
        { sf: 'sf-2-2', nombre: 1 },
        { sf: 'sf-2-3', nombre: 2 },
        { sf: 'sf-2-4', nombre: 1 },
      ],
    },
    {
      titre: 'Les nombres relatifs',
      tirage: [
        { sf: 'sf-3-1', nombre: 1 },
        { sf: 'sf-3-2', nombre: 1 },
        { sf: 'sf-3-3', nombre: 1 },
        { sf: 'sf-3-4', nombre: 1 },
        { sf: 'sf-5-1', nombre: 1 },
        { sf: 'sf-5-2', nombre: 1 },
        { sf: 'sf-5-3', nombre: 1 },
        { sf: 'sf-5-4', nombre: 1 },
      ],
    },
  ],
};
