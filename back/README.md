# Backend app

## 1. Organisation
**/controller/** : Enregistre les endpoints des entitées => 1 controlleur par type d'entité

**/model/** : Liste des modèles

**/service/** : Traitements liés aux endpoints


## 2. Initialiser le projet

1. Créer un fichier **.env.development** sur le modèle de **.env.example** et le compléter


2. Créer un fichier **.env.test** sur le modèle de **.env.example** pour l'environement de test (base de donnée différente pour les tests)


3. Installer les dépendances
```bash
npm install
```

4. Initialiser la base de données

```bash
npm run updatedb
```

5. Lancer le projet :

- Pour lancer en développement :
```bash
npm run dev
```
- Pour lancer en production :
```bash
npm run start
```

6. Lancer les tests
```bash
npm run test
```

7. Mettre à jour a documentation
```bash
npm run doc
```

8. Pour linter le code
```bash
npm run lint
```

## 3. Créer un endpoint pour un modèle ✏️
1. Si il n'existe pas, créer le modèle dans **/model/**.


2. Si il n'existe pas, créer le service **{nom_model}-service.js** dans **/service/**.


3. Créer l'endpoint dans le service : ⚠️ Créer la documentation swagger ⚠️


4. Si il n'existe pas, créer le controlleur **{nom_modele}-controller.js** dans **/controller/**
puis l'ajouter dans un _use()_ du **controller-manager.js**.


5. Importer les endpoints du service dans le controller.


6. ⚠️ CREER LES TESTS sur les endpoints créés

