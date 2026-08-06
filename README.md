# Mes révisions

Applications de révision, une par matière, hébergées sur GitHub Pages.

| Application | Chemin | Description |
| --- | --- | --- |
| Histoire-géographie, vers la 3<sup>e</sup> | [`4eme/histoiregeo/`](4eme/histoiregeo/) | Cartes interactives, flashcards et quiz sur le programme de révision d'été |
| Français, vers la 5<sup>e</sup> | [`6eme/francais/`](6eme/francais/) | Le verbe et les accords, en difficulté croissante, avec explications personnalisées |
| Maths, vers la 3<sup>e</sup> — *prototype* | [`4eme/maths/`](4eme/maths/) | Le calcul littéral, et le réflexe de vérifier soi-même en remplaçant la lettre par un nombre |

Chaque application est autonome : site statique, sans étape de build, sans
compte ni serveur. Voir le README de chacune pour le détail.

L'appli de maths est une **séance unique**, à valider par un élève réel avant
d'écrire la suite. Elle est aussi la troisième du dépôt, donc le moment où les
mécaniques communes deviennent visibles : `js/srs.js` y est un doublon assumé
de celui du français, et c'est le premier candidat à remonter dans
[`commun/`](commun/).
