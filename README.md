# EriosPainAPI

## Environnement de Test DPI

Ce référentiel sert d'environnement de test visant à reproduire un système du Dossier Patient Informatisé (DPI), bien que sa véracité ne soit pas garantie, car nous ne disposons d'aucune information quant à sa structure. L'objectif principal est de simuler les fonctionnalités et les interactions au sein d'un système DPI, notamment en ce qui concerne la gestion des données des patients et plus particulièrement dans notre cas, la donnée de la douleur.

### Hébergement de la Base de Données

La base de données est hébergée sur un serveur gratuit utilisant **Render**, une plateforme fournissant des services cloud. Vous pouvez trouver plus d'informations sur Render [ici](https://render.com/).

### Schéma de la Base de Données

La base de données comprend trois entités principales : **User**, **Patient** et **PainRecord**.
#### User :
- **id** : Identifiant unique de l'utilisateur.
- **nom** : Nom de l'utilisateur.
- **prenom** : Prénom de l'utilisateur.
- **username** : Nom d'utilisateur unique.
- **password** : Mot de passe de l'utilisateur.
- **occupation** : Occupation de l'utilisateur.
- **salt** : Sel pour le hachage du mot de passe.

#### Patient :
- **id** : Identifiant unique pour chaque patient.
- **nom** : Nom du patient.
- **Date de naissance** : Date de naissance du patient.
- **genre** : Genre du patient.

#### PainRecord :
- **id** : Identifiant unique pour chaque enregistrement de douleur.
- **level** : Niveau d'intensité de la douleur enregistrée.
- **evaluation date** : Date de l'évaluation de la douleur.
- **patient id** : Référence vers le patient correspondant.

### Points d'accès de l'API

L'API expose divers points d'accès pour interagir avec la base de données.

#### Points d'accès GET :
- **"/api/patient/:id/streams"** : Récupère les données de douleur pour un patient spécifique.
- **"/api/patients"** : Récupère des informations sur tous les patients.
- **"/api/user"** : Récupère l'utilisateur connecté grâce au token stocké dans le navigateur via un cookie


#### Points d'accès POST :
- **"/api/patient/:id/streams"** : Ajoute des données de douleur pour un patient spécifique.
- **"/api/patient"** : Ajoute un nouveau patient à la base de données.
- **"/api/login"** : Permet à l'utilisateur de se connecter
- **"/api/register"** : Permet de créer un nouvelle utilisateur



#### Points d'accès DELETE :
- **"/api/patient/:id/streams"** : Supprime les données de douleur pour un patient spécifique dans un intervalle donné.
- **"/api/patient/:id"** : Supprime un patient de la base de données.
- **"/api/user/:id"** : Supprime un utilisateur de la base de données.

Notons que le point d'accès "delete" n'est pas particulièrement utile. Bien qu'il puisse être utile en développement, son utilisation en production peut représenter un risque surtout en milieu médical.

### Utilisation

Pour utiliser efficacement ce référentiel, suivez ces étapes :
1. Assurez-vous d'avoir installé les dépendances nécessaires.
2. Configurez l'hébergement de la base de données en utilisant Render ou un service similaire.
3. Configurez les points d'accès de l'API selon vos besoins.
4. Testez et modifiez le référentiel selon vos besoins pour reproduire l'environnement DPI souhaité.

### Avertissement

Veuillez noter que bien que ce référentiel vise à simuler un environnement DPI, il ne garantit pas l'exactitude ou la fiabilité des données. Utilisez-le uniquement à des fins de test et d'éducation.

