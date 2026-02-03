# 10.2 API REST avec fetch()

L'API fetch() est la méthode moderne pour effectuer des requêtes HTTP en JavaScript. Elle permet de communiquer avec des serveurs, récupérer des données, et créer des applications web dynamiques.

## Qu'est-ce qu'une API REST ?

REST (Representational State Transfer) est un style d'architecture pour les services web qui utilise les méthodes HTTP standard :

- **GET** : Récupérer des données
- **POST** : Créer de nouvelles données
- **PUT** : Modifier des données existantes
- **DELETE** : Supprimer des données

## La fonction fetch()

### Syntaxe de base
```javascript
fetch(url, options)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Erreur:', error));
```

### Exemple simple : GET
```javascript
// Récupérer des données
fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur réseau');
        }
        return response.json();
    })
    .then(post => {
        console.log('Post récupéré:', post);
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
```

## Méthodes HTTP avec fetch()

### GET - Récupérer des données
```javascript
async function obtenirUtilisateurs() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const utilisateurs = await response.json();
        return utilisateurs;
    } catch (error) {
        console.error('Erreur lors de la récupération:', error);
        throw error;
    }
}
```

### POST - Créer des données
```javascript
async function creerPost(titre, contenu, userId) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: titre,
                body: contenu,
                userId: userId
            })
        });
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const nouveauPost = await response.json();
        console.log('Post créé:', nouveauPost);
        return nouveauPost;
    } catch (error) {
        console.error('Erreur lors de la création:', error);
        throw error;
    }
}
```

### PUT - Modifier des données
```javascript
async function modifierPost(id, titre, contenu, userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                title: titre,
                body: contenu,
                userId: userId
            })
        });
        
        const postModifie = await response.json();
        console.log('Post modifié:', postModifie);
        return postModifie;
    } catch (error) {
        console.error('Erreur lors de la modification:', error);
        throw error;
    }
}
```

### DELETE - Supprimer des données
```javascript
async function supprimerPost(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            console.log(`Post ${id} supprimé avec succès`);
            return true;
        } else {
            throw new Error('Erreur lors de la suppression');
        }
    } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        throw error;
    }
}
```

## Gestion des réponses

### Types de réponses
```javascript
async function analyserReponse(url) {
    const response = await fetch(url);
    
    // Vérifier le statut
    console.log('Statut:', response.status);
    console.log('OK:', response.ok);
    console.log('Headers:', response.headers);
    
    // Différents formats de données
    if (response.headers.get('content-type').includes('application/json')) {
        const data = await response.json();
        return data;
    } else if (response.headers.get('content-type').includes('text/')) {
        const text = await response.text();
        return text;
    } else {
        const blob = await response.blob();
        return blob;
    }
}
```

### Gestion des codes de statut
```javascript
async function gererStatutHTTP(url) {
    try {
        const response = await fetch(url);
        
        switch (response.status) {
            case 200:
                console.log('Succès');
                return await response.json();
            case 404:
                throw new Error('Ressource non trouvée');
            case 401:
                throw new Error('Non autorisé');
            case 403:
                throw new Error('Accès interdit');
            case 500:
                throw new Error('Erreur serveur');
            default:
                throw new Error(`Erreur HTTP: ${response.status}`);
        }
    } catch (error) {
        console.error('Erreur:', error.message);
        throw error;
    }
}
```

## Headers et authentification

### Headers personnalisés
```javascript
async function requeteAvecHeaders() {
    const response = await fetch('https://api.exemple.com/data', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': 'Mon App 1.0',
            'X-Custom-Header': 'valeur-personnalisee'
        }
    });
    
    return await response.json();
}
```

### Authentification par token
```javascript
async function requeteAuthentifiee(token) {
    const response = await fetch('https://api.exemple.com/protected', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    
    if (!response.ok) {
        throw new Error('Authentification échouée');
    }
    
    return await response.json();
}
```

## Gestion des erreurs réseau

### Retry automatique
```javascript
async function fetchAvecRetry(url, options = {}, maxRetries = 3) {
    for (let i = 0; i <= maxRetries; i++) {
        try {
            const response = await fetch(url, options);
            
            if (response.ok) {
                return response;
            }
            
            // Si c'est une erreur serveur (5xx), retry
            if (response.status >= 500 && i < maxRetries) {
                console.log(`Tentative ${i + 1} échouée, retry...`);
                await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
                continue;
            }
            
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        } catch (error) {
            if (i === maxRetries) {
                throw error;
            }
            console.log(`Tentative ${i + 1} échouée:`, error.message);
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }
}
```

### Timeout
```javascript
async function fetchAvecTimeout(url, options = {}, timeoutMs = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        
        if (error.name === 'AbortError') {
            throw new Error('Timeout: La requête a pris trop de temps');
        }
        
        throw error;
    }
}
```

## Exemple pratique : Application de blog

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog API Demo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        
        .section {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
        }
        
        .post {
            border: 1px solid #eee;
            border-radius: 4px;
            padding: 15px;
            margin: 10px 0;
        }
        
        .post h3 {
            margin: 0 0 10px 0;
            color: #333;
        }
        
        .post .meta {
            font-size: 0.9em;
            color: #666;
            margin-bottom: 10px;
        }
        
        .loading {
            text-align: center;
            color: #666;
        }
        
        .error {
            color: #e74c3c;
            background: #fdf2f2;
            padding: 10px;
            border-radius: 4px;
            margin: 10px 0;
        }
        
        .success {
            color: #27ae60;
            background: #f2fdf7;
            padding: 10px;
            border-radius: 4px;
            margin: 10px 0;
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        
        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
        }
        
        .form-group textarea {
            height: 100px;
            resize: vertical;
        }
        
        .btn {
            background: #3498db;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            margin-right: 10px;
        }
        
        .btn:hover {
            background: #2980b9;
        }
        
        .btn.danger {
            background: #e74c3c;
        }
        
        .btn.danger:hover {
            background: #c0392b;
        }
    </style>
</head>
<body>
    <h1>Gestionnaire de Blog avec API REST</h1>
    
    <div class="container">
        <!-- Section des posts -->
        <div class="section">
            <h2>Posts du Blog</h2>
            <button class="btn" onclick="chargerPosts()">Charger les posts</button>
            <button class="btn" onclick="viderPosts()">Vider</button>
            
            <div id="posts-container">
                <div class="loading">Cliquez sur "Charger les posts" pour commencer</div>
            </div>
        </div>
        
        <!-- Section de création -->
        <div class="section">
            <h2>Créer un nouveau post</h2>
            <form id="form-nouveau-post">
                <div class="form-group">
                    <label for="titre">Titre:</label>
                    <input type="text" id="titre" required>
                </div>
                
                <div class="form-group">
                    <label for="contenu">Contenu:</label>
                    <textarea id="contenu" required></textarea>
                </div>
                
                <div class="form-group">
                    <label for="userId">ID Utilisateur:</label>
                    <input type="number" id="userId" value="1" required>
                </div>
                
                <button type="submit" class="btn">Créer le post</button>
            </form>
            
            <div id="message-container"></div>
        </div>
    </div>
    
    <script>
        // Configuration de l'API
        const API_BASE = 'https://jsonplaceholder.typicode.com';
        
        // Gestionnaire de l'API
        class BlogAPI {
            static async obtenirPosts() {
                try {
                    const response = await fetch(`${API_BASE}/posts?_limit=5`);
                    
                    if (!response.ok) {
                        throw new Error(`Erreur HTTP: ${response.status}`);
                    }
                    
                    return await response.json();
                } catch (error) {
                    console.error('Erreur lors de la récupération des posts:', error);
                    throw error;
                }
            }
            
            static async creerPost(titre, contenu, userId) {
                try {
                    const response = await fetch(`${API_BASE}/posts`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            title: titre,
                            body: contenu,
                            userId: parseInt(userId)
                        })
                    });
                    
                    if (!response.ok) {
                        throw new Error(`Erreur HTTP: ${response.status}`);
                    }
                    
                    return await response.json();
                } catch (error) {
                    console.error('Erreur lors de la création du post:', error);
                    throw error;
                }
            }
            
            static async supprimerPost(id) {
                try {
                    const response = await fetch(`${API_BASE}/posts/${id}`, {
                        method: 'DELETE'
                    });
                    
                    return response.ok;
                } catch (error) {
                    console.error('Erreur lors de la suppression:', error);
                    throw error;
                }
            }
        }
        
        // Gestionnaire de l'interface
        class BlogUI {
            static afficherMessage(message, type = 'success') {
                const container = document.getElementById('message-container');
                container.innerHTML = `<div class="${type}">${message}</div>`;
                
                setTimeout(() => {
                    container.innerHTML = '';
                }, 3000);
            }
            
            static afficherErreur(erreur) {
                this.afficherMessage(`Erreur: ${erreur.message}`, 'error');
            }
            
            static afficherPosts(posts) {
                const container = document.getElementById('posts-container');
                
                if (posts.length === 0) {
                    container.innerHTML = '<div class="loading">Aucun post trouvé</div>';
                    return;
                }
                
                const html = posts.map(post => `
                    <div class="post" data-id="${post.id}">
                        <h3>${post.title}</h3>
                        <div class="meta">Post #${post.id} - Utilisateur ${post.userId}</div>
                        <p>${post.body}</p>
                        <button class="btn danger" onclick="supprimerPost(${post.id})">
                            Supprimer
                        </button>
                    </div>
                `).join('');
                
                container.innerHTML = html;
            }
            
            static afficherChargement(container) {
                const element = document.getElementById(container);
                element.innerHTML = '<div class="loading">Chargement...</div>';
            }
        }
        
        // Fonctions globales
        async function chargerPosts() {
            try {
                BlogUI.afficherChargement('posts-container');
                const posts = await BlogAPI.obtenirPosts();
                BlogUI.afficherPosts(posts);
                BlogUI.afficherMessage(`${posts.length} posts chargés avec succès`);
            } catch (error) {
                BlogUI.afficherErreur(error);
                document.getElementById('posts-container').innerHTML = 
                    '<div class="error">Erreur lors du chargement des posts</div>';
            }
        }
        
        async function supprimerPost(id) {
            if (!confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
                return;
            }
            
            try {
                const succes = await BlogAPI.supprimerPost(id);
                
                if (succes) {
                    // Supprimer de l'interface
                    const postElement = document.querySelector(`[data-id="${id}"]`);
                    if (postElement) {
                        postElement.remove();
                    }
                    
                    BlogUI.afficherMessage(`Post ${id} supprimé avec succès`);
                } else {
                    throw new Error('Échec de la suppression');
                }
            } catch (error) {
                BlogUI.afficherErreur(error);
            }
        }
        
        function viderPosts() {
            document.getElementById('posts-container').innerHTML = 
                '<div class="loading">Cliquez sur "Charger les posts" pour commencer</div>';
        }
        
        // Gestionnaire du formulaire
        document.getElementById('form-nouveau-post').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const titre = document.getElementById('titre').value;
            const contenu = document.getElementById('contenu').value;
            const userId = document.getElementById('userId').value;
            
            try {
                const nouveauPost = await BlogAPI.creerPost(titre, contenu, userId);
                
                BlogUI.afficherMessage(`Post "${nouveauPost.title}" créé avec succès (ID: ${nouveauPost.id})`);
                
                // Réinitialiser le formulaire
                this.reset();
                document.getElementById('userId').value = '1';
                
                // Optionnel: recharger les posts
                // chargerPosts();
                
            } catch (error) {
                BlogUI.afficherErreur(error);
            }
        });
        
        // Chargement initial
        window.addEventListener('load', function() {
            BlogUI.afficherMessage('Application prête! Cliquez sur "Charger les posts" pour commencer.');
        });
    </script>
</body>
</html>
```

## Bonnes pratiques

### ✅ Gestion d'erreurs
- Toujours vérifier `response.ok`
- Gérer les différents codes de statut HTTP
- Implémenter des mécanismes de retry
- Prévoir des timeouts

### ✅ Performance
- Utiliser `AbortController` pour annuler les requêtes
- Mettre en cache les données quand c'est possible
- Limiter le nombre de requêtes simultanées

### ✅ Sécurité
- Valider les données côté client ET serveur
- Utiliser HTTPS
- Gérer l'authentification correctement
- Sanitiser les données affichées

### ✅ UX/UI
- Afficher des indicateurs de chargement
- Gérer les états d'erreur gracieusement
- Prévoir le mode hors-ligne
- Feedback utilisateur en temps réel

