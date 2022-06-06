# Projet Libellule

Ce projet est un réseau social anonyme ayant pour but de partager des questions sur n'importe quel thème.

## Vidéo de présentation
[Voir la vidéo](https://www.youtube.com/watch?v=kmFLin9HOYg)

## Téléchargement
[Application android](https://webmobile.pages.ensimag.fr/apprentis2a/projet/Projet_gaillalo_geoffrlu_legoyb/libellule.apk)

## API
[API déployée sur heroku](https://libellule-production.herokuapp.com/)

[Documentation](https://libellule-production.herokuapp.com/doc)

## Backend
### Environnement
Afin que l'application puisse s'exécuter correctement, il nous faut créer plusieurs fichiers `.env`
On peut utiliser le fichier `.env.example` qui est un template pour créer ces .env et qui contient
toutes les variables d'environnement utilisées.

#### Developement
```
.env.developement
```

#### Test
```
.env.test
```

### Installation
La partie backend se situe dans le dossier /back/.
Afin de d'installer les paquets nécessaires, il faut se positionner dans ce dossier utiliser npm :
```sh
cd back
npm i
```
### Lint
Il est possible de vérifier la mise en forme du code via
```sh
npm run lint
```
Le lint est effectué automatiquement avant un merge sur dev ou master via une pipeline.
### Test
Avant de push des modifications, il est nécessaires de lancer la commande
```sh
npm run test
```
et de veiller à ce que tous les tests passent, ces derniers seront lancer de nouveau lors d'un merge vers dev ou master
grace à la pipeline de tests.

Il est possible que les tests échouent à cause du cache de sqlite, si c'est le cas, pensez à supprimer le fichier situé dans :
/back/src/\_\_tests\_\_/db/test/db.sqlite
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
```sh
cd front
npm i
```
### Lancement
Pour lancer l'application en developpement, utilisez :
```sh
npm run start
npm run android
```
### Lint
Il est possible de vérifier la mise en forme du code via
```sh
npm run lint
```
Le lint est effectué automatiquement avant un merge sur dev ou master via une pipeline.
### Deploiement
Le déploiement s'effectue automatiquement sur Gitlab Pages lors d'un merge sur master, l'APK est disponible à l'adresse suivante : 
[APK](https://webmobile.pages.ensimag.fr/apprentis2a/projet/Projet_gaillalo_geoffrlu_legoyb/libellule.apk)

## Conception
Pour construire notre application nous avons au préalable réalisé différents travaux de conception.
Diagramme de cas d'utilisation, Diagramme d'état transition, Diagramme d'éntités associations.
[UML](https://drive.google.com/file/d/1kLiyn0eOAhWXYuPOAIwwTpszS_NER_Kq/view?usp=sharing)
(Cliquez sur *ouvrir avec Draw.io* poura accéder à l'ensemble des diagrammes)

### MCD
![MCD de la base de données actuelle](./doc/img/MCD.png "DataBase MCD")
### Cas d'utilisations
![Utilisations de l'application en fonction du rôle](./doc/img/UseCase.png "Application Use Cases")

### Transitions d'états
![Transitions de chaque page dans différents états](./doc/img/StateTransition.png "Page State Transitions")

[Maquettes](https://www.figma.com/file/DxNNWNFoZhTLBHwLuq6jtT/Libellule-UI---Design?node-id=0%3A1)
(Cliquez sur l'icone avec des petits ronds en haut à gauche pour accéder au différentes pages de l'applications)

## Choix techniques
### Webservice utilisé 
Comme webservice nous avons choisi d'utiliser une API : [Species API](https://www.gbif.org/fr/developer/species)
Nous l'utilisons afin de générer un pseudonyme aléatoire lors de l'inscription de nos utilisateur.
L'API utilisée présente de la latence et a de grosses conséquences sur les performances de l'application
(presque 5s de chargement pour s'inscrire). En effet, nous devons récupérons un dataset (~5000 entrées) à chaque fois qu'on inscrit un 
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

### Compte administrateur
Il existe un compte administrateur initialiser au lancement de l'API :
- **Nom :** admin
- **Mot de passe :** admin

### Gestion du token
Nous générons un **token** à chaque connexion afin d'authentifier l'utilisateur connecté.

Ce token est envoyé à chaque appel d'API et est **requis** sur certains endpoints restrictifs (réservés aux utilisateurs connectés ou administrateur).

Le token ayant une **durée de vie limitée** (configurable dans le fichier d'environement du back),
un système de **refresh de token** a été mis en place. Lorsque le back reçoit un token ayant dépassé
la moitié de sa durée de vie, un **nouveau token** est placé dans l'entête **Authorization** de la réponse afin de
la communiquer à l'application.

Du côté de l'application, un **interceptor** récupère ce nouveau token pour les prochains appels.

### Architecture de l'application
#### Back
Nous avons plusieurs dossiers qui ont chacuns leur fonctions :
- **Model :**
    Ce dossier contient la définition des modèles sequelize qui permettent de faire le lien avec
    la base de donnée
- **Service :**
    Ce dossier contient des fichiers qui exposent des fonctions utilisant sequelize et les 
    modèle créés.
- **Controller :**
    Ce dossier contient les fichiers permettant de créer les routes de notre API, il utilise
    les fonctions exposées par les services
- **Util :**
    Ce dossier expose différentes fonctions utilisées dans l'ensemble de notre application,
    il possède aussi un sous dossier tests avec des fonctions dédiées
    exclusivement au tests.
- **\_\_tests\_\_ :**
    Ce dossier contient l'ensemble de nos tests End to End.

#### Front
L'architecture dossier du front :
- **api :**
    Ce dossier contient tous les fichiers qui se réfèrent aux appels à l'API (appel et interceptor).
- **component :**
    Ce dossier contient tous les composants qui sont partagés dans l'applications.
- **context :**
    Possède les contextes de l'application, il n'y en a qu'un seul pour l'authentification.
- **layout :**
    Ce dossier contient les composants d'affiche propre à une seule vue. Le but étant de diviser les
    composants unitaires volumineux en des composants plus petits.
- **navigator :**
    Ce dossier contient tous les composants qui permettent la navigation.
- **screen :**
    Ce dossier contient tous les écrans de l'application.
- **styles :**
    Ce dossier contient tous les styles unifiés.
- **util :**
    Dossier pour les fonctions utilitaires & de configuration.

## Done et TODO
Concrètement, les choses suivantes sont actuellement implémentées dans l'application :
- Système d'inscription / authentification
- Création / Edition / Suppression / Consultation d'une question
- Création / Edition / Suppression / Consultation d'un commentaire
- Follow / Unfollow d'un utilisateur ou d'une question
- Informe dans la page suivis lorsqu'un utilisateur suivi poste un nouveau commentaire / une nouvelle question
- Informe dans la page suivis lorsqu'une question suivie a des nouveaux commentaires
- Liste de différentes formes de consultation (questions, commentaires, etc ...)

Certaines fonctionnalités ont été réalisés dans le backend uniquement:
- Création / Edition / Suppression / Consultation des réactions pour une question ou un commentaire
- Consultation des réactions en liste en fonction de leur type (upvote, downvote, report, etc...)

D'autres fonctionnalités n'ont pas été retenues pour le rendu final et n'ont pas du tout été implémentées (voir `Conception > Cas d'utilisations`).
