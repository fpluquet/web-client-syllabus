# 11.1 LocalStorage

Le LocalStorage permet de stocker des données dans le navigateur de l'utilisateur de manière persistante. Ces données restent disponibles même après la fermeture du navigateur, contrairement au SessionStorage qui est effacé à la fermeture de l'onglet.

## Qu'est-ce que le LocalStorage ?

Le LocalStorage fait partie des Web Storage APIs et permet de :
- Stocker des données localement dans le navigateur
- Conserver les données entre les sessions
- Stocker jusqu'à 5-10 MB de données (selon le navigateur)
- Accéder aux données uniquement depuis le même domaine

## Méthodes principales

### `localStorage.setItem()`
Stocker une valeur :
```javascript
localStorage.setItem('nom', 'Alice');
localStorage.setItem('age', '25');
localStorage.setItem('theme', 'dark');

// Stocker un nombre
localStorage.setItem('score', 1500);

// Stocker un booléen
localStorage.setItem('premiumUser', true);
```

### `localStorage.getItem()`
Récupérer une valeur :
```javascript
let nom = localStorage.getItem('nom');
console.log(nom); // "Alice"

let age = localStorage.getItem('age');
console.log(age); // "25" (toujours une chaîne!)

let theme = localStorage.getItem('theme');
console.log(theme); // "dark"

// Valeur inexistante
let inexistant = localStorage.getItem('inexistant');
console.log(inexistant); // null
```

### `localStorage.removeItem()`
Supprimer une valeur :
```javascript
localStorage.removeItem('age');
console.log(localStorage.getItem('age')); // null
```

### `localStorage.clear()`
Vider tout le localStorage :
```javascript
localStorage.clear();
console.log(localStorage.length); // 0
```

### `localStorage.length` et `localStorage.key()`
Parcourir les données :
```javascript
// Nombre d'éléments
console.log(`Nombre d'éléments: ${localStorage.length}`);

// Lister toutes les clés
for (let i = 0; i < localStorage.length; i++) {
    let cle = localStorage.key(i);
    let valeur = localStorage.getItem(cle);
    console.log(`${cle}: ${valeur}`);
}
```

## Stockage d'objets et tableaux

### Sérialisation avec JSON
Le localStorage ne stocke que des chaînes. Pour les objets et tableaux, utiliser JSON :

```javascript
// Stocker un objet
let utilisateur = {
    nom: 'Alice',
    age: 25,
    email: 'alice@exemple.com',
    preferences: {
        theme: 'dark',
        langue: 'fr'
    }
};

localStorage.setItem('utilisateur', JSON.stringify(utilisateur));

// Récupérer l'objet
let utilisateurRecupere = JSON.parse(localStorage.getItem('utilisateur'));
console.log(utilisateurRecupere.nom); // "Alice"
console.log(utilisateurRecupere.preferences.theme); // "dark"
```

### Stocker un tableau
```javascript
// Stocker un tableau
let favoris = ['pommes', 'bananes', 'oranges'];
localStorage.setItem('favoris', JSON.stringify(favoris));

// Récupérer le tableau
let favorisRecuperes = JSON.parse(localStorage.getItem('favoris'));
console.log(favorisRecuperes); // ['pommes', 'bananes', 'oranges']

// Ajouter un élément
favorisRecuperes.push('fraises');
localStorage.setItem('favoris', JSON.stringify(favorisRecuperes));
```

## Gestion des erreurs

### Vérification de support
```javascript
function localStorageDisponible() {
    try {
        let test = 'test-localstorage';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

if (localStorageDisponible()) {
    console.log('LocalStorage est disponible');
} else {
    console.log('LocalStorage non supporté');
}
```

### Gestion des erreurs de stockage
```javascript
function sauvegarderSecurise(cle, valeur) {
    try {
        localStorage.setItem(cle, JSON.stringify(valeur));
        return true;
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            console.error('Espace de stockage insuffisant');
            // Optionnel: nettoyer les anciennes données
            nettoyerAnciennesDonnees();
        } else {
            console.error('Erreur de sauvegarde:', error);
        }
        return false;
    }
}

function chargerSecurise(cle, valeurParDefaut = null) {
    try {
        let valeur = localStorage.getItem(cle);
        return valeur ? JSON.parse(valeur) : valeurParDefaut;
    } catch (error) {
        console.error('Erreur de chargement:', error);
        return valeurParDefaut;
    }
}
```

## Exemples pratiques

### 1. Gestionnaire de thème
```javascript
class GestionnaireTheme {
    constructor() {
        this.cle = 'theme-site';
        this.chargerTheme();
    }
    
    chargerTheme() {
        let theme = localStorage.getItem(this.cle) || 'light';
        this.appliquerTheme(theme);
    }
    
    changerTheme(nouveauTheme) {
        localStorage.setItem(this.cle, nouveauTheme);
        this.appliquerTheme(nouveauTheme);
    }
    
    appliquerTheme(theme) {
        document.body.className = `theme-${theme}`;
        
        // Mettre à jour l'interface
        let boutonTheme = document.getElementById('bouton-theme');
        if (boutonTheme) {
            boutonTheme.textContent = theme === 'light' ? '🌙' : '☀️';
        }
    }
    
    toggleTheme() {
        let themeActuel = localStorage.getItem(this.cle) || 'light';
        let nouveauTheme = themeActuel === 'light' ? 'dark' : 'light';
        this.changerTheme(nouveauTheme);
    }
}

// Utilisation
let gestionnaire = new GestionnaireTheme();
```

### 2. Historique de navigation
```javascript
class HistoriqueNavigation {
    constructor(tailleMax = 50) {
        this.cle = 'historique-navigation';
        this.tailleMax = tailleMax;
    }
    
    ajouterPage(url, titre) {
        let historique = this.obtenirHistorique();
        
        // Supprimer l'URL si elle existe déjà
        historique = historique.filter(page => page.url !== url);
        
        // Ajouter au début
        historique.unshift({
            url: url,
            titre: titre,
            timestamp: Date.now()
        });
        
        // Limiter la taille
        if (historique.length > this.tailleMax) {
            historique = historique.slice(0, this.tailleMax);
        }
        
        localStorage.setItem(this.cle, JSON.stringify(historique));
    }
    
    obtenirHistorique() {
        try {
            return JSON.parse(localStorage.getItem(this.cle)) || [];
        } catch {
            return [];
        }
    }
    
    viderHistorique() {
        localStorage.removeItem(this.cle);
    }
    
    afficherHistorique() {
        let historique = this.obtenirHistorique();
        return historique.map(page => ({
            ...page,
            dateFormatee: new Date(page.timestamp).toLocaleString()
        }));
    }
}
```

### 3. Panier d'achat
```javascript
class PanierAchat {
    constructor() {
        this.cle = 'panier-achat';
    }
    
    ajouterProduit(produit) {
        let panier = this.obtenirPanier();
        
        // Vérifier si le produit existe déjà
        let index = panier.findIndex(item => item.id === produit.id);
        
        if (index !== -1) {
            // Augmenter la quantité
            panier[index].quantite += produit.quantite || 1;
        } else {
            // Ajouter le nouveau produit
            panier.push({
                ...produit,
                quantite: produit.quantite || 1,
                dateAjout: Date.now()
            });
        }
        
        this.sauvegarderPanier(panier);
        this.mettreAJourInterface();
    }
    
    supprimerProduit(idProduit) {
        let panier = this.obtenirPanier();
        panier = panier.filter(item => item.id !== idProduit);
        this.sauvegarderPanier(panier);
        this.mettreAJourInterface();
    }
    
    modifierQuantite(idProduit, nouvelleQuantite) {
        let panier = this.obtenirPanier();
        let index = panier.findIndex(item => item.id === idProduit);
        
        if (index !== -1) {
            if (nouvelleQuantite <= 0) {
                this.supprimerProduit(idProduit);
            } else {
                panier[index].quantite = nouvelleQuantite;
                this.sauvegarderPanier(panier);
                this.mettreAJourInterface();
            }
        }
    }
    
    obtenirPanier() {
        try {
            return JSON.parse(localStorage.getItem(this.cle)) || [];
        } catch {
            return [];
        }
    }
    
    sauvegarderPanier(panier) {
        localStorage.setItem(this.cle, JSON.stringify(panier));
    }
    
    viderPanier() {
        localStorage.removeItem(this.cle);
        this.mettreAJourInterface();
    }
    
    calculerTotal() {
        let panier = this.obtenirPanier();
        return panier.reduce((total, item) => {
            return total + (item.prix * item.quantite);
        }, 0);
    }
    
    obtenirNombreArticles() {
        let panier = this.obtenirPanier();
        return panier.reduce((total, item) => total + item.quantite, 0);
    }
    
    mettreAJourInterface() {
        // Mettre à jour le compteur du panier
        let compteur = document.getElementById('compteur-panier');
        if (compteur) {
            compteur.textContent = this.obtenirNombreArticles();
        }
        
        // Mettre à jour le total
        let total = document.getElementById('total-panier');
        if (total) {
            total.textContent = `${this.calculerTotal().toFixed(2)}€`;
        }
        
        // Déclencher un événement personnalisé
        window.dispatchEvent(new CustomEvent('panierMisAJour', {
            detail: {
                panier: this.obtenirPanier(),
                total: this.calculerTotal(),
                nombreArticles: this.obtenirNombreArticles()
            }
        }));
    }
}
```

## Exemple complet : Application de notes

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestionnaire de Notes - LocalStorage</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 2rem auto;
            padding: 1rem;
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        }
        
        .stats {
            font-size: 0.9em;
            color: #666;
        }
        
        .form-section {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 8px;
            margin-bottom: 2rem;
        }
        
        .form-group {
            margin-bottom: 1rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: bold;
        }
        
        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
        }
        
        .form-group textarea {
            height: 100px;
            resize: vertical;
        }
        
        .btn {
            background: #007bff;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
            margin-right: 0.5rem;
        }
        
        .btn:hover {
            background: #0056b3;
        }
        
        .btn.danger {
            background: #dc3545;
        }
        
        .btn.danger:hover {
            background: #c82333;
        }
        
        .notes-container {
            display: grid;
            gap: 1rem;
        }
        
        .note {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 1.5rem;
            background: white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .note-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1rem;
        }
        
        .note-title {
            font-size: 1.2rem;
            font-weight: bold;
            color: #333;
            margin: 0;
        }
        
        .note-date {
            font-size: 0.85rem;
            color: #666;
        }
        
        .note-content {
            margin-bottom: 1rem;
            line-height: 1.5;
        }
        
        .note-actions {
            display: flex;
            gap: 0.5rem;
        }
        
        .note-actions button {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
        }
        
        .empty-state {
            text-align: center;
            color: #666;
            padding: 3rem;
            background: #f8f9fa;
            border-radius: 8px;
        }
        
        .search-box {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-bottom: 1rem;
            font-size: 1rem;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📝 Gestionnaire de Notes</h1>
        <div class="stats">
            <span id="nombre-notes">0 notes</span> • 
            <span id="espace-utilise">0 KB utilisés</span>
        </div>
    </div>
    
    <div class="form-section">
        <h2>Nouvelle Note</h2>
        <form id="form-note">
            <div class="form-group">
                <label for="titre">Titre:</label>
                <input type="text" id="titre" required>
            </div>
            
            <div class="form-group">
                <label for="contenu">Contenu:</label>
                <textarea id="contenu" required></textarea>
            </div>
            
            <button type="submit" class="btn">Ajouter la note</button>
            <button type="button" class="btn danger" onclick="viderToutesLesNotes()">
                Vider toutes les notes
            </button>
        </form>
    </div>
    
    <div class="notes-section">
        <input type="text" class="search-box" id="recherche" 
               placeholder="Rechercher dans les notes...">
        
        <div id="notes-container" class="notes-container">
            <!-- Les notes seront affichées ici -->
        </div>
    </div>
    
    <script>
        class GestionnaireNotes {
            constructor() {
                this.cle = 'notes-app';
                this.notes = this.chargerNotes();
                this.afficherNotes();
                this.mettreAJourStats();
                this.configurerRecherche();
            }
            
            chargerNotes() {
                try {
                    return JSON.parse(localStorage.getItem(this.cle)) || [];
                } catch (error) {
                    console.error('Erreur lors du chargement des notes:', error);
                    return [];
                }
            }
            
            sauvegarderNotes() {
                try {
                    localStorage.setItem(this.cle, JSON.stringify(this.notes));
                    this.mettreAJourStats();
                    return true;
                } catch (error) {
                    console.error('Erreur lors de la sauvegarde:', error);
                    alert('Erreur: Impossible de sauvegarder la note. Espace de stockage insuffisant?');
                    return false;
                }
            }
            
            ajouterNote(titre, contenu) {
                const nouvelleNote = {
                    id: Date.now().toString(),
                    titre: titre.trim(),
                    contenu: contenu.trim(),
                    dateCreation: new Date().toISOString(),
                    dateModification: new Date().toISOString()
                };
                
                this.notes.unshift(nouvelleNote);
                
                if (this.sauvegarderNotes()) {
                    this.afficherNotes();
                    return nouvelleNote;
                }
                
                // Rollback en cas d'erreur
                this.notes.shift();
                return null;
            }
            
            supprimerNote(id) {
                const index = this.notes.findIndex(note => note.id === id);
                if (index !== -1) {
                    this.notes.splice(index, 1);
                    this.sauvegarderNotes();
                    this.afficherNotes();
                }
            }
            
            modifierNote(id, nouveauTitre, nouveauContenu) {
                const note = this.notes.find(note => note.id === id);
                if (note) {
                    note.titre = nouveauTitre.trim();
                    note.contenu = nouveauContenu.trim();
                    note.dateModification = new Date().toISOString();
                    
                    this.sauvegarderNotes();
                    this.afficherNotes();
                }
            }
            
            viderToutesLesNotes() {
                if (confirm(`Êtes-vous sûr de vouloir supprimer toutes les ${this.notes.length} notes?`)) {
                    this.notes = [];
                    this.sauvegarderNotes();
                    this.afficherNotes();
                }
            }
            
            rechercherNotes(terme) {
                if (!terme.trim()) {
                    return this.notes;
                }
                
                const termeLower = terme.toLowerCase();
                return this.notes.filter(note => 
                    note.titre.toLowerCase().includes(termeLower) ||
                    note.contenu.toLowerCase().includes(termeLower)
                );
            }
            
            afficherNotes(notesAafficher = null) {
                const container = document.getElementById('notes-container');
                const notes = notesAafficher || this.notes;
                
                if (notes.length === 0) {
                    container.innerHTML = `
                        <div class="empty-state">
                            <h3>Aucune note trouvée</h3>
                            <p>Créez votre première note ci-dessus!</p>
                        </div>
                    `;
                    return;
                }
                
                const html = notes.map(note => `
                    <div class="note" data-id="${note.id}">
                        <div class="note-header">
                            <h3 class="note-title">${this.echapperHTML(note.titre)}</h3>
                            <div class="note-date">
                                Créée: ${new Date(note.dateCreation).toLocaleString()}<br>
                                ${note.dateModification !== note.dateCreation ? 
                                    `Modifiée: ${new Date(note.dateModification).toLocaleString()}` : ''}
                            </div>
                        </div>
                        
                        <div class="note-content">
                            ${this.echapperHTML(note.contenu).replace(/\n/g, '<br>')}
                        </div>
                        
                        <div class="note-actions">
                            <button class="btn" onclick="gestionnaire.modifierNote('${note.id}')">
                                Modifier
                            </button>
                            <button class="btn danger" onclick="gestionnaire.supprimerNote('${note.id}')">
                                Supprimer
                            </button>
                        </div>
                    </div>
                `).join('');
                
                container.innerHTML = html;
            }
            
            echapperHTML(texte) {
                const div = document.createElement('div');
                div.textContent = texte;
                return div.innerHTML;
            }
            
            mettreAJourStats() {
                const nombreNotes = document.getElementById('nombre-notes');
                const espaceUtilise = document.getElementById('espace-utilise');
                
                nombreNotes.textContent = `${this.notes.length} note${this.notes.length !== 1 ? 's' : ''}`;
                
                // Calculer l'espace utilisé
                const donneesJSON = JSON.stringify(this.notes);
                const tailleKB = Math.round((donneesJSON.length * 2) / 1024); // UTF-16 = 2 bytes par caractère
                espaceUtilise.textContent = `${tailleKB} KB utilisés`;
            }
            
            configurerRecherche() {
                const champRecherche = document.getElementById('recherche');
                let timeoutRecherche;
                
                champRecherche.addEventListener('input', (e) => {
                    clearTimeout(timeoutRecherche);
                    timeoutRecherche = setTimeout(() => {
                        const notesFiltrées = this.rechercherNotes(e.target.value);
                        this.afficherNotes(notesFiltrées);
                    }, 300);
                });
            }
        }
        
        // Initialisation
        const gestionnaire = new GestionnaireNotes();
        
        // Gestionnaire de formulaire
        document.getElementById('form-note').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const titre = document.getElementById('titre').value;
            const contenu = document.getElementById('contenu').value;
            
            if (gestionnaire.ajouterNote(titre, contenu)) {
                this.reset();
                document.getElementById('titre').focus();
            }
        });
        
        // Fonction globale pour la modification
        gestionnaire.modifierNote = function(id) {
            const note = this.notes.find(n => n.id === id);
            if (!note) return;
            
            const nouveauTitre = prompt('Nouveau titre:', note.titre);
            if (nouveauTitre === null) return;
            
            const nouveauContenu = prompt('Nouveau contenu:', note.contenu);
            if (nouveauContenu === null) return;
            
            this.modifierNote(id, nouveauTitre, nouveauContenu);
        };
        
        // Fonction globale pour vider toutes les notes
        function viderToutesLesNotes() {
            gestionnaire.viderToutesLesNotes();
        }
        
        // Sauvegarde automatique avant fermeture
        window.addEventListener('beforeunload', function() {
            // Les données sont déjà sauvegardées automatiquement
            console.log('Données sauvegardées avant fermeture');
        });
    </script>
</body>
</html>
```

## Limitations et considérations

### ✅ Limitations techniques
- **Taille** : 5-10 MB par domaine
- **Type** : Seulement des chaînes de caractères
- **Synchrone** : Peut bloquer l'interface sur de gros volumes
- **Sécurité** : Accessible via JavaScript (attention aux XSS)

### ✅ Bonnes pratiques
- Toujours utiliser try/catch
- Vérifier la disponibilité avant utilisation
- Prévoir des valeurs par défaut
- Nettoyer régulièrement les anciennes données
- Ne pas stocker d'informations sensibles

### ✅ Alternatives
- **SessionStorage** : Données temporaires (session)
- **IndexedDB** : Base de données locale complexe
- **Cache API** : Pour les ressources web
- **Web SQL** : Déprécié, à éviter

