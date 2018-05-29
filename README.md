# MovieWall
**MovieWall** est un projet développé en 12 heures. Il utilise l'api de [TheMovieDB](https://www.themoviedb.org/). Le design de l'application est fortement inspiré de [CineMur](https://cinemur.fr/film/avengers-infinity-war-232180).

Les mockups du projet sont disponibles dans le dossier mockups au format PDF ainsi que Balzamiq.

Pour afficher l'application dans votre navigateur suivez les instructions dans Installation ci-dessous.

## Presentation :
| Accueil | Recherche | Détails | Favoris |
| ------ | ------ | ------ | ------ |
| ![Page d'accueil](https://github.com/alexispe/moviewall/blob/master/capture-home.png) | ![Page de recherche](https://github.com/alexispe/moviewall/blob/master/capture-search.png) | ![Page détails](https://github.com/alexispe/moviewall/blob/master/capture-single.png) | ![Page favoris](https://github.com/alexispe/moviewall/blob/master/capture-favoris.png) |
## Installation :
Colnage du dépôt :
```sh
$ git clone https://github.com/alexispe/moviewall.git
```
Puis ouvrez **moviewall/app/dist/index.html** dans votre navigateur.
## Build :
```sh
$ cd moviewall/app
$ gulp
```
## Dev :
```sh
$ cd moviewall/app
$ gulp watch
```
## Fonctionnalités :
- Liste des films en cours au cinéma (wall)
- Infinite Scroll sur cette liste
- Affichage d'un film au clique sur son affiche
- Ajout d'un film dans les favoris
- Suppression d'un film dans les favoris
- Liste des favoris
- Rechercher un film par son nom dans le menu
- Afficher la liste des films trier par le nom de l'acteur et le genre
## Technos :
- Sass
- Gulp
- node.js
- jQuery

Réalisé avec amour par Hugo, Bryan et Alexis ❤
