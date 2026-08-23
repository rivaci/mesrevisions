# Objectif 5<sup>e</sup> — réviser l'histoire-géo

Application de révision construite à partir du **programme de révision en vue de
la 5<sup>e</sup>** donné dans le pack de rentrée de l'EIB Monceau, où une
évaluation a lieu la première semaine.

Elle couvre les 115 connaissances de la fiche : les 6 continents, les 5 océans,
les lignes imaginaires, la rose des vents, l'échelle et la légende, les 6 villes
du monde méditerranéen, les 5 grandes périodes historiques et les chiffres
romains.

## Ce que la fiche demande, et ce que l'appli en fait

| La fiche | Dans l'appli |
|---|---|
| Nommer et placer les continents et les océans | Planisphère cliquable, dans les deux sens |
| Les lignes imaginaires : méridiens, parallèles, tropiques, équateur | Sur le planisphère, plus la distinction parallèle / méridien |
| La rose des vents | Les 4 points cardinaux et les 4 intermédiaires |
| Savoir ce que signifie « une échelle » | Le sens du mot, **et** le calcul — c'est ce qu'une évaluation demande |
| Savoir à quoi correspond la légende | Titre, légende, échelle, orientation |
| Placer Marseille, Rome, Byzance, Alexandrie, Athènes, Jérusalem | Carte du bassin méditerranéen |
| Les grandes périodes sur une frise | Ordre, bornes et dates des 5 périodes |
| L'écriture des chiffres romains | Symboles, règles, lecture, écriture, et le siècle d'une date |

Deux réserves à connaître. Le tableau des chiffres romains et la frise sont des
**images** dans le PDF : le texte ne les contient pas, et l'appli reprend donc le
découpage scolaire usuel — à confronter au cahier. Et la fiche ajoute « revoir
tous les acquis de la 6<sup>e</sup> » sans les détailler : ce qui n'est pas nommé
n'est pas couvert.

## Comment ça marche

- **Trois façons de réviser** par étape : découvrir (flashcards à retourner),
  s'entraîner (questions corrigées et expliquées), défi (épreuve notée).
- **Cartes cliquables**, dans les deux sens : placer, et nommer ce qui est montré.
- **Répétition espacée** : ce qui est raté revient tout de suite, ce qui est su
  revient de plus en plus tard.
- **Progression, XP, rangs, badges et série de jours** pour tenir sur la durée.

## Les cartes

Elles ne sont pas des images mais des **données** : `tools/build-maps.mjs`
convertit `world.geojson` en tracés SVG, et le site lit des JSON statiques.

**Deux projections, et ce n'est pas un détail.** Le planisphère est en
équirectangulaire : Mercator étire les pôles à l'infini, et l'Antarctique y
deviendrait une bande plus large que l'Afrique — or c'est l'un des six
continents à reconnaître. L'équirectangulaire garde les latitudes régulièrement
espacées, donc l'équateur au milieu et les tropiques à distance égale : c'est
exactement l'image à mémoriser. La Méditerranée, elle, est en Mercator — sur un
bassin de quelques milliers de kilomètres la déformation ne se voit pas, et ce
sont les formes des cartes scolaires.

**Un continent est une seule forme.** Concaténer les tracés de ses pays ne
suffit pas : chacun garde son contour, et l'écran montre une mosaïque de 48
zones là où l'élève doit en voir une — il en conclut qu'il faut cliquer pays par
pays. Les pays sont donc **fusionnés au build** (`@turf/union`, dépendance de
build seulement : `cd tools && npm install` avant `build-maps.mjs`). Le site
lui-même n'a toujours ni build ni dépendance.

**La Russie et la Turquie ne sont dans aucun continent.** Les colorier comme
européennes peindrait la Sibérie en Europe ; comme asiatiques effacerait Moscou
et Istanbul de l'Europe. Elles s'affichent dans une teinte à part — c'est un
fait du programme de 6<sup>e</sup>, pas un défaut de la carte.

**Les lignes imaginaires portent un trait épais** qui sert de zone de clic. Sans
lui elles n'auraient aucune épaisseur : impossible à viser au doigt, et surtout
impossible de se TROMPER de ligne, faute de pouvoir en désigner une autre.

## Vie privée

Aucun compte, aucun serveur, aucune donnée envoyée. La progression est stockée
dans le navigateur de l'élève (`localStorage`).

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
node tools/verifier-donnees.mjs   # cohérence contenu ↔ cartes, et pièges de QCM
node tools/tester-moteur.mjs      # répétition espacée, progression, badges
node tools/build-maps.mjs         # regénère assets/maps/ depuis les GeoJSON
```

`verifier-donnees.mjs` ne juge pas l'exactitude historique — il attrape ce qui se
casse en silence : un identifiant sans tracé, un tracé que personne ne demande,
un thème absent du parcours, un chiffre romain dont la valeur ne correspond pas
(vérifiée par une conversion indépendante), et **les QCM à moins de quatre
réponses distinctes**, qui deviennent des pièces à pile ou face.

### Organisation

```
js/data/monde.js       la géographie : continents, océans, lignes, villes
js/data/temps.js       l'histoire : périodes, chiffres romains, siècles
js/data/themes.js      comment interroger chaque lot — les modes n'en savent rien
js/data/parcours.js    le découpage en étapes
js/carte.js            cartes SVG cliquables
js/srs.js              répétition espacée
js/questions.js        fabrique les questions (carte, carte-nom, qcm)
js/seance.js           déroulé d'une séance
js/store.js            progression, XP, badges (localStorage)
js/app.js              navigation et écrans
```

Pour corriger un fait, éditer `monde.js` ou `temps.js` puis relancer
`verifier-donnees.mjs`. Aucun autre fichier n'a besoin d'être touché.
