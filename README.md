# EriosPainAPI

## Environnement de Test DPI

Ce référentiel sert d'environnement de test visant à reproduire un système d'Information Patient Numérisé (DPI), bien que sa véracité ne soit pas garantie. L'objectif principal est de simuler les fonctionnalités et les interactions au sein d'un système DPI, notamment en ce qui concerne la gestion des données des patients.

### Hébergement de la Base de Données

La base de données est hébergée sur un serveur gratuit utilisant **Render**, une plateforme fournissant des services cloud. Vous pouvez trouver plus d'informations sur Render [ici](https://render.com/).

### Schéma de la Base de Données

La base de données comprend deux entités principales : **Patient** et **PainRecord**.

#### Patient
- **id** : Identifiant unique pour chaque patient.
- **nom** : Nom du patient.
- **Date de naissance** : Date de naissance du patient.
- **genre** : Genre du patient.

#### PainRecord
- **id** : Identifiant unique pour chaque enregistrement de douleur.
- **level** : Niveau d'intensité de la douleur enregistrée.
- **evaluation date** : Date de l'évaluation de la douleur.
- **patient id** : Référence vers le patient correspondant.

### Points d'accès de l'API

L'API expose divers points d'accès pour interagir avec la base de données.

#### Points d'accès GET :
- **"/api/patient/:id/streams"** : Récupère les données de douleur pour un patient spécifique.
- **"/api/patients"** : Récupère des informations sur tous les patients.

#### Points d'accès POST :
- **"/api/patient/:id/streams"** : Ajoute des données de douleur pour un patient spécifique.
- **"/api/patient"** : Ajoute un nouveau patient à la base de données.

#### Points d'accès DELETE :
- **"/api/patient/:id/streams"** : Supprime les données de douleur pour un patient spécifique dans un intervalle donné.
- **"/api/patient/:id"** : Supprime un patient de la base de données.

### Utilisation

Pour utiliser efficacement ce référentiel, suivez ces étapes :
1. Assurez-vous d'avoir installé les dépendances nécessaires.
2. Configurez l'hébergement de la base de données en utilisant Render ou un service similaire.
3. Configurez les points d'accès de l'API selon vos besoins.
4. Testez et modifiez le référentiel selon vos besoins pour reproduire l'environnement DPI souhaité.

### Avertissement

Veuillez noter que bien que ce référentiel vise à simuler un environnement DPI, il ne garantit pas l'exactitude ou la fiabilité des données. Utilisez-le uniquement à des fins de test et d'éducation.

