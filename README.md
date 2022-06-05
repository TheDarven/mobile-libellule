# Projet Libellule

Ce projet est un réseau social anonyme ayant pour but de partager des questions sur n'importe quel thème.

## Téléchargement
[Application android](https://webmobile.pages.ensimag.fr/apprentis2a/projet/Projet_gaillalo_geoffrlu_legoyb/libellule.apk)

## API
[API déployée sur heroku](https://libellule-production.herokuapp.com/)

[Documentation](https://libellule-production.herokuapp.com/doc)

## Backend
### Environnement
Afin que l'application puisse s'exectuer correctement, il faut créer plusieurs fichiers .env
On peut utiliser le fichier .env.example qui est un template pour créer ces .env et qui contient
toutes les variables d'environnement utilisées.

#### Developement
.env.developement

#### Test
.env.test

### Installation
La partie backend se situe dans le dossier /back/.
Afin de d'installer les paquets nécessaires, il faut se positionner dans ce dossier utiliser npm :
```
cd back
npm i
```
### Lint
Il est possible de vérifier la mise en forme du code via
```
npm run lint
```
Le lint est effectué automatiquement avant un merge sur dev ou master via une pipeline.
### Test
Avant de push des modifications, il est nécessaires de lancer la commande
```
npm run test
```
et de veiller à ce que tous les tests passent, ces derniers seront lancer de nouveau lors d'un merge vers dev ou master
grace à la pipeline de tests.

Il est possible que les tests échouent à cause du cache de sqlite, si c'est le cas, pensez à supprimer le fichier situé dans :
/back/src/__tests__/db/test/db.sqlite
(On utilise sqlite pour les tests uniquement, on utilise Mysql en prod et en dev)

Relancez ensuite les tests.

Ces tests sont des test END to END qui font tests directement les résultats des appels à notre API.

### Deploiement
Le déploiement s'effectue automatiquement sur heroku lors d'un merge sur master, l'API est disponible à l'adresse suivante :
[API](https://libellule-production.herokuapp.com/)

## Frontend
### Installation
La partie frontend se situe dans le dossier /front/.
Afin de d'installer les paquets nécessaires, il faut se positionner dans ce dossier utiliser npm :
```
cd front
npm i
```
### Lint
Il est possible de vérifier la mise en forme du code via
```
npm run lint
```
Le lint est effectué automatiquement avant un merge sur dev ou master via une pipeline.
### Deploiement
Le déploiement s'effectue automatiquement sur Gitlab Pages lors d'un merge sur master, l'APK est disponible à l'adresse suivante : 
[APK](https://webmobile.pages.ensimag.fr/apprentis2a/projet/Projet_gaillalo_geoffrlu_legoyb/libellule.apk)

## conception
Pour construire notre application nous avons au préalable réalisé différents travaux de conception.
Diagramme de cas d'utilisation, Diagramme d'état transition, Diagramme d'éntités associations.
[UML](https://drive.google.com/file/d/1kLiyn0eOAhWXYuPOAIwwTpszS_NER_Kq/view?usp=sharing)
(Cliquez sur *ouvrir avec Draw.io* poura accéder à l'ensemble des diagrammes)

[Maquettes](https://www.figma.com/file/DxNNWNFoZhTLBHwLuq6jtT/Libellule-UI---Design?node-id=0%3A1)
(Cliquez sur l'icone avec des petits ronds en haut à gauche pour accéder au différentes pages de l'applications)

## Choix techniques
### Webservice utilisé 
Comme webservice nous avons choisi d'utiliser une API : [Species API](https://www.gbif.org/fr/developer/species)
Nous l'utilisons afin de générer un pseudonyme aléatoire lors de l'inscription de nos utilisateur.
L'implémentation est actuellement "bancale", elle a de grosses conséquences sur les performances de l'application
(presque 5s de chargement pour s'inscrire). En effet nous récupérons un dataset (~5000 entrées) à chaque fois qu'on inscrit un 
utilisateur, le mieux serait de copier ce dataset dans une table de notre base de donnée mais nous n'avons pas eu le temps
d'implémenter cette solution.

### Gestion des rôles
On a 3 rôles,
- Guest
- Utilisateur
- Admin

Le guest a la possibilité de *consulter* l'ensemble des questions et commentaires.
L'utilisateur peut consulter l'ensemble des questions et commentaires. Il peut aussi créer, modifier et supprimer ses propres
questions/commentaire.
Il peut aussi suivre des questions ou d'autres utilisateurs.
L'admin peut supprimer des questions ou des commentaires d'un utilisateur.

### Architecture de l'application
## Back
Nous avons plusieurs dossiers qui ont chacuns leur fonctions :
- Model :
    Ce dossier contient la définition des modèles sequelize qui permettent de faire le lien avec
    la base de donnée
- Service :
    Ce dossier contient des fichiers qui exposent des fonctions utilisant sequelize et les 
    modèle créés.
- Controller :
    Ce dossier contient les fichiers permettant de créer les routes de notre API, il utilise
    les fonctions exposées par les services
- Util :
    Ce dossier expose différentes fonctions utilisées dans l'ensemble de notre application,
    il possède aussi un sous dossier tests avec des fonctions dédiées
    exclusivement au tests.
- __tests__ :
    Ce dossier contient l'ensemble de nos tests End to End.

## Front

## Done et TODO
Concrètement, les choses suivantes sont actuellement implémentées dans l'application :
- Système d'inscription / authentification
- Création / Edition / Suppression / Consultation d'une question
- Création / Edition / Suppression / Consultation d'un commentaire
