# 1.4 Structures complexes

Les structures complexes HTML permettent d'organiser et de présenter des données de manière structurée et sémantique.

## Tableaux

Les tableaux servent à présenter des données tabulaires (comme un tableur).

### Structure de base
```html
<table>
    <thead>
        <tr>
            <th>Nom</th>
            <th>Âge</th>
            <th>Ville</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Alice</td>
            <td>25</td>
            <td>Paris</td>
        </tr>
        <tr>
            <td>Bob</td>
            <td>30</td>
            <td>Lyon</td>
        </tr>
    </tbody>
</table>
```

### Tableau complet avec pied
```html
<table>
    <thead>
        <tr>
            <th>Produit</th>
            <th>Prix unitaire</th>
            <th>Quantité</th>
            <th>Total</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Ordinateur</td>
            <td>800€</td>
            <td>2</td>
            <td>1600€</td>
        </tr>
        <tr>
            <td>Souris</td>
            <td>25€</td>
            <td>3</td>
            <td>75€</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="3"><strong>Total général</strong></td>
            <td><strong>1675€</strong></td>
        </tr>
    </tfoot>
</table>
```

### Attributs utiles
```html
<table>
    <tr>
        <th rowspan="2">Matière</th>
        <th colspan="2">Trimestre 1</th>
    </tr>
    <tr>
        <th>Note</th>
        <th>Coefficient</th>
    </tr>
    <tr>
        <td>Mathématiques</td>
        <td>15</td>
        <td>3</td>
    </tr>
</table>
```

## Divisions et conteneurs

### Division générique (`<div>`)
```html
<div class="carte-produit">
    <div class="image-produit">
        <img src="produit.jpg" alt="Notre produit">
    </div>
    <div class="info-produit">
        <h3>Nom du produit</h3>
        <p class="description">Description du produit...</p>
        <p class="prix">29.99€</p>
    </div>
    <div class="actions">
        <button>Ajouter au panier</button>
    </div>
</div>
```

### Conteneur en ligne (`<span>`)
```html
<p>
    Ce texte contient un <span class="highlight">mot important</span> 
    et un <span class="prix">prix de 15€</span>.
</p>
```

## Sections sémantiques HTML5

### Structure de page complète
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Structure sémantique</title>
</head>
<body>
    <header>
        <h1>Mon Site Web</h1>
        <nav>
            <ul>
                <li><a href="#accueil">Accueil</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="accueil">
            <h2>Bienvenue</h2>
            <article>
                <h3>Article principal</h3>
                <p>Contenu de l'article...</p>
                <aside>
                    <h4>Information complémentaire</h4>
                    <p>Détails supplémentaires...</p>
                </aside>
            </article>
        </section>
        
        <section id="services">
            <h2>Nos Services</h2>
            <article>
                <h3>Service 1</h3>
                <p>Description du service...</p>
            </article>
            <article>
                <h3>Service 2</h3>
                <p>Description du service...</p>
            </article>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2025 Mon Site Web</p>
        <address>
            Contact : <a href="mailto:contact@monsite.com">contact@monsite.com</a>
        </address>
    </footer>
</body>
</html>
```

### Balises sémantiques détaillées

#### `<header>`
En-tête de page ou de section :
```html
<header>
    <img src="logo.png" alt="Logo">
    <h1>Titre du site</h1>
    <nav><!-- Navigation --></nav>
</header>

<article>
    <header>
        <h2>Titre de l'article</h2>
        <p>Publié le <time datetime="2025-01-15">15 janvier 2025</time></p>
    </header>
    <p>Contenu de l'article...</p>
</article>
```

#### `<main>`
Contenu principal (unique par page) :
```html
<main>
    <h1>Contenu principal de la page</h1>
    <p>Le contenu principal et unique de cette page.</p>
</main>
```

#### `<section>`
Section thématique du contenu :
```html
<section id="a-propos">
    <h2>À propos de nous</h2>
    <p>Information sur l'entreprise...</p>
</section>

<section id="produits">
    <h2>Nos Produits</h2>
    <p>Découvrez notre gamme...</p>
</section>
```

#### `<article>`
Contenu indépendant et réutilisable :
```html
<article>
    <header>
        <h2>Comment apprendre HTML</h2>
        <p>Par <span class="auteur">Jean Dupont</span></p>
    </header>
    <p>HTML est le langage de base...</p>
    <footer>
        <p>Publié dans <a href="#web">Développement Web</a></p>
    </footer>
</article>
```

#### `<aside>`
Contenu connexe mais secondaire :
```html
<main>
    <article>
        <h1>Guide du développeur web</h1>
        <p>Contenu principal de l'article...</p>
        
        <aside>
            <h3>Le saviez-vous ?</h3>
            <p>Information intéressante mais secondaire...</p>
        </aside>
    </article>
</main>

<!-- Barre latérale -->
<aside class="sidebar">
    <h3>Articles récents</h3>
    <ul>
        <li><a href="#">Article 1</a></li>
        <li><a href="#">Article 2</a></li>
    </ul>
</aside>
```

#### `<footer>`
Pied de page ou de section :
```html
<footer>
    <nav>
        <ul>
            <li><a href="mentions-legales.html">Mentions légales</a></li>
            <li><a href="politique-confidentialite.html">Confidentialité</a></li>
        </ul>
    </nav>
    <p>&copy; 2025 Mon Site. Tous droits réservés.</p>
</footer>
```

## Autres éléments structurants

### `<details>` et `<summary>`
Contenu pliable/dépliable :
```html
<details>
    <summary>FAQ : Comment créer un site web ?</summary>
    <p>Pour créer un site web, vous devez apprendre HTML, CSS et JavaScript. 
    Commencez par HTML pour la structure, puis CSS pour le design, 
    et enfin JavaScript pour l'interactivité.</p>
</details>

<details open>
    <summary>Cette section est ouverte par défaut</summary>
    <p>Contenu visible immédiatement.</p>
</details>
```

### `<figure>` et `<figcaption>`
Images avec légendes :
```html
<figure>
    <img src="graphique.png" alt="Évolution des ventes">
    <figcaption>
        Figure 1 : Évolution des ventes sur les 5 dernières années
    </figcaption>
</figure>
```

### `<time>`
Dates et heures :
```html
<p>
    Article publié le 
    <time datetime="2025-01-15T14:30:00">15 janvier 2025 à 14h30</time>
</p>

<p>
    Événement le <time datetime="2025-12-25">25 décembre</time>
</p>
```

## Exemple complet : page d'actualité

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Actualités Tech - Mon Blog</title>
</head>
<body>
    <header>
        <h1>Tech News</h1>
        <nav>
            <ul>
                <li><a href="#accueil">Accueil</a></li>
                <li><a href="#actualites">Actualités</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="actualites">
            <h2>Dernières actualités</h2>
            
            <article>
                <header>
                    <h3>L'avenir du développement web</h3>
                    <p>
                        Par <span class="auteur">Marie Martin</span> - 
                        <time datetime="2025-01-15">15 janvier 2025</time>
                    </p>
                </header>
                
                <figure>
                    <img src="web-development.jpg" alt="Code sur un écran">
                    <figcaption>Le développement web évolue constamment</figcaption>
                </figure>
                
                <p>Le développement web connaît une évolution constante...</p>
                
                <aside>
                    <h4>Technologies mentionnées</h4>
                    <ul>
                        <li>HTML5</li>
                        <li>CSS Grid</li>
                        <li>JavaScript ES6+</li>
                    </ul>
                </aside>
                
                <details>
                    <summary>Voir les détails techniques</summary>
                    <table>
                        <thead>
                            <tr>
                                <th>Technologie</th>
                                <th>Support navigateur</th>
                                <th>Difficulté</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>HTML5</td>
                                <td>100%</td>
                                <td>Facile</td>
                            </tr>
                            <tr>
                                <td>CSS Grid</td>
                                <td>95%</td>
                                <td>Moyenne</td>
                            </tr>
                        </tbody>
                    </table>
                </details>
                
                <footer>
                    <p>Catégories : <a href="#web">Développement Web</a>, <a href="#tech">Technologie</a></p>
                </footer>
            </article>
        </section>
    </main>

    <aside class="sidebar">
        <section>
            <h3>Articles populaires</h3>
            <ul>
                <li><a href="#">Introduction à CSS Grid</a></li>
                <li><a href="#">JavaScript pour débutants</a></li>
                <li><a href="#">Responsive design en 2025</a></li>
            </ul>
        </section>
    </aside>

    <footer>
        <p>&copy; 2025 Tech News. Tous droits réservés.</p>
        <address>
            Contactez-nous : <a href="mailto:contact@technews.com">contact@technews.com</a>
        </address>
    </footer>
</body>
</html>
```

## Bonnes pratiques

### ✅ Sémantique
- Utiliser les bonnes balises pour le bon contenu
- `<header>`, `<main>`, `<footer>` pour la structure principale
- `<article>` pour du contenu autonome
- `<section>` pour organiser thématiquement

### ✅ Accessibilité
- Respecter la hiérarchie des titres (h1 → h6)
- Utiliser `<table>` uniquement pour des données tabulaires
- Ajouter des attributs `scope` aux en-têtes de tableau si nécessaire

### ✅ Maintenance
- Structure logique et cohérente
- Classes CSS descriptives
- Commentaires pour les sections importantes
