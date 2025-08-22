# CV Analyzer AI

## Description

CV Analyzer AI est une application web permettant de gérer les candidatures et d'analyser automatiquement les CV grâce à l'intelligence artificielle. Elle aide les recruteurs à filtrer les candidatures et fournit un score de pertinence pour chaque candidat en fonction d'une offre d'emploi.

## Fonctionnalités principales

- **Gestion des utilisateurs** : création, modification et suppression des comptes avec rôles (admin, recruteur, candidat).
- **Gestion des candidatures** : ajout, consultation et suppression des candidatures (CV et lettres de motivation).
- **Analyse automatique des CV** : extraction des compétences, expériences et formations ; calcul d'un score de pertinence par rapport à une offre.
- **Notifications par email** : alertes aux recruteurs et candidats lors de la soumission d'une candidature et changement de statut.
- **Tableau de bord** : statistiques des candidatures (nombre, scores moyens, etc.).

## Technologies utilisées

- **Backend** : Django, Django REST Framework
- **Base de données** : MySQL
- **IA / NLP** : Hugging Face Transformers, spaCy, Sentence Transformers
- **Front-end** : Next JS
- **Versioning** : Git, GitHub
- **Déploiement** : Docker, compatible avec AWS / Azure / Vercel

## Installation

### Backend (Django)

1. **Cloner le dépôt**
   ```bash
   git clone <URL_DU_REPO>
   cd cv-analyzer-ai/back
   ```

2. **Créer et activer un environnement virtuel**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # Linux / Mac
   .venv\Scripts\activate     # Windows
   ```

3. **Installer les dépendances**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configurer les variables d'environnement**
   
   Créer un fichier `.env` à la racine du projet backend :
   ```env
   # Configuration base de données
   DB_NAME=cv_analyzer
   DB_USER=votre_user
   DB_PASSWORD=votre_password
   DB_HOST=localhost
   DB_PORT=3306
   DB_DIALECT=mysql
   
   # Configuration email
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_HOST_USER=votre_email@gmail.com
   EMAIL_HOST_PASSWORD=votre_mot_de_passe_app
   ```

5. **Migrer la base de données**
   ```bash
   python manage.py migrate
   ```

6. **Créer un superutilisateur**
   ```bash
   python manage.py createsuperuser
   ```

7. **Lancer le serveur**
   ```bash
   python manage.py runserver
   ```

### Frontend (Next.js)

1. **Se placer dans le dossier front**
   ```bash
   cd ../front
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Créer un fichier `.env.local` pour la configuration du frontend**
   ```env
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
   NEXT_PUBLIC_APP_NAME=CV Analyzer AI
   ```

4. **Lancer le serveur Next.js**
   ```bash
   npm run dev
   ```

Le front-end sera accessible sur http://localhost:3000.

## Utilisation

### Endpoints principaux (exemples)

- `POST /api/register/` : inscription utilisateur
- `POST /api/login/` : connexion utilisateur
- `POST /api/applications/create/` : soumettre une candidature
- `GET /api/applications/` : lister les candidatures
- `PATCH /api/applications/<id>/` : mettre à jour le statut

> **Note** : Lorsqu'un candidat soumet sa candidature, l'IA analyse automatiquement le CV et enregistre le score dans la base de données.

## IA / NLP

1. **Prétraitement du texte** avec spaCy (français)
2. **Extraction des entités** : entreprises, formations, compétences
3. **Analyse de sentiment** : score basé sur la qualité du CV
4. **Similarité CV ↔ offre** : embeddings multilingues pour comparer CV et description du poste
5. **Score final** : pondération des critères et enregistrement automatique dans la table applications

## Meilleures pratiques

- **Sécurité** : mots de passe hashés, HTTPS, protection CSRF/XSS
- **Performance** : optimisation des requêtes, mise en cache, CDN pour fichiers statiques
- **Maintenance** : documentation, tests unitaires et d'intégration, CI/CD
- **Déploiement** : conteneurisation avec Docker, scalable via load balancers et auto-scaling