# Objectif 3<sup>e</sup> — réviser l'histoire-géo

Application de révision construite à partir de la fiche donnée en fin de 4<sup>e</sup>,
en vue de l'évaluation de rentrée en 3<sup>e</sup>.

Elle couvre les 122 connaissances de la fiche : régions et capitales, DROM,
fleuves, massifs, mers, les 27 États de l'Union européenne, 23 dates et
21 personnages.

## Comment ça marche

- **Trois façons de réviser** par étape : découvrir (flashcards à retourner),
  s'entraîner (questions corrigées et expliquées), défi (épreuve notée).
- **Cartes cliquables** pour la géographie : l'élève place lui-même les régions,
  les fleuves ou les pays, dans les deux sens (placer et nommer).
- **Répétition espacée** : ce qui est raté revient tout de suite, ce qui est su
  revient de plus en plus tard.
- **Progression, XP, rangs, badges et série de jours** pour tenir sur la durée.

## Vie privée

Aucun compte, aucun serveur, aucune donnée envoyée. La progression est stockée
dans le navigateur de l'élève (`localStorage`). C'est ce qui permet de partager
le lien à toute une classe sans avoir à gérer le moindre consentement.

Conséquence : la progression est propre à un appareil et à un navigateur.
Changer de téléphone ou vider l'historique la remet à zéro.

## Développement

Le site est **statique et sans étape de build** : il s'ouvre tel quel. Il faut
seulement le servir en HTTP (les modules ES ne se chargent pas depuis `file://`).

```bash
python -m http.server 4173
```

### Outils

```bash
node tools/verifier-donnees.mjs   # cohérence contenu ↔ cartes, effectifs de la fiche
node tools/tester-moteur.mjs      # répétition espacée, XP, badges, persistance
node tools/build-maps.mjs         # régénère assets/maps/ (uniquement si les sources changent)
```

`build-maps.mjs` n'est à relancer que si l'on modifie `tools/sources/`. Son
résultat est commité, ce qui garde le site sans dépendance ni compilation.

### Organisation

```
index.html            page unique
css/style.css         feuille de style unique, pensée mobile d'abord
js/data/              le contenu : faits uniquement, aucune logique
js/srs.js             répétition espacée
js/store.js           progression, XP, badges (localStorage)
js/questions.js       fabrication des questions
js/carte.js           cartes SVG interactives
js/seance.js          déroulement d'une séance
js/app.js             navigation et écrans
assets/maps/          tracés SVG générés
tools/                scripts de génération et de vérification
```

Pour corriger une erreur de contenu, il suffit d'éditer `js/data/geo.js` ou
`js/data/histoire.js` : rien d'autre n'est à toucher. Relancer ensuite
`node tools/verifier-donnees.mjs`.

## Sources des cartes

Fonds de carte publics, reprojetés en SVG par `tools/build-maps.mjs` :

- régions métropolitaines et DROM : [gregoiredavid/france-geojson](https://github.com/gregoiredavid/france-geojson)
- pays d'Europe : fond mondial public utilisé par la D3 Graph Gallery

Les fleuves, massifs et zones maritimes ne figurent dans aucun de ces jeux de
données : leurs tracés ont été saisis à la main dans `tools/sources/features.mjs`.
Ils sont approximatifs et servent de repère et de zone cliquable, pas de
référence cartographique.

## À relire avant diffusion

La fiche donne les noms des 21 personnages mais pas leur rôle. Les résumés et
explications de `js/data/histoire.js` ont donc été **rédigés pour cette
application** et méritent une relecture avant d'être diffusés à d'autres élèves.
