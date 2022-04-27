# Backend app

## 1. Organisation
**/controller/** : Enregistre les endpoints des entitées => 1 controlleur par type d'entité

**/model/** : Liste des modèles

**/repository/** : Enregistre les fonctions de requêtages à la base de données

**/service/** : Traitements liés aux endpoints


## 2. Créer un endpoint pour un modèle ✏️
1. Si il n'existe pas, créer le modèle dans **/model/**.


2. Si il n'existe pas, créer le service **{nom_model}-service.js** dans **/service/**.


3. Créer l'endpoint dans le service : ⚠️ Créer la documentation swagger ⚠️


4. Si il n'existe pas, créer le controlleur **{nom_modele}-controller.js** dans **/controller/**
puis l'ajouter dans un _use()_ du **controller-manager.js**.


5. Importer les endpoints du service dans le controller.


6. Si nécessaire, créer les fonctions des requêtes bdd dans **/repository/{nom_modele-repostory.js**
   (utilisables dans le service).


7. ⚠️ CREER LES TESTS sur les endpoints créés
