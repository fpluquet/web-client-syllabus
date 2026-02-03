# 3.1 Intégration CSS

CSS (Cascading Style Sheets) permet de séparer le contenu (HTML) de la présentation (styles). Cette séparation est fondamentale pour un code maintenable et professionnel.

## Méthodes d'intégration CSS

### 1. CSS externe (recommandé)

Créer un fichier CSS séparé et le lier au HTML :

**style.css**
```css
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
}

h1 {
    color: #333;
    text-align: center;
}
```

**index.html**
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Externe</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Titre stylé avec CSS externe</h1>
</body>
</html>
```

### 2. CSS interne
CSS dans la balise `<style>` du `<head>` :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>CSS Interne</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
        }
        
        h1 {
            color: #333;
            text-align: center;
        }
    </style>
</head>
<body>
    <h1>Titre stylé avec CSS interne</h1>
</body>
</html>
```

### 3. CSS en ligne (à éviter)
Styles directement dans l'attribut `style` :

```html
<h1 style="color: #333; text-align: center;">Titre stylé en ligne</h1>
```

## Avantages du CSS externe

### ✅ Séparation des responsabilités
- **HTML** : structure et contenu
- **CSS** : présentation et design
- **JavaScript** : comportement et interactivité

### ✅ Réutilisabilité
```html
<!-- Plusieurs pages peuvent utiliser le même CSS -->
<link rel="stylesheet" href="css/commun.css">
<link rel="stylesheet" href="css/accueil.css">
```

### ✅ Maintenance facilité
- Un seul fichier CSS pour plusieurs pages
- Modifications centralisées
- Code plus organisé

### ✅ Performance
- Fichier CSS mis en cache par le navigateur
- Chargement plus rapide des pages suivantes

## Organisation des fichiers CSS

### Structure de projet recommandée
```
mon-site/
├── index.html
├── contact.html
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── animations.css
├── js/
│   └── script.js
└── images/
    └── logo.png
```

### Fichiers CSS multiples
```html
<head>
    <!-- CSS principal -->
    <link rel="stylesheet" href="css/style.css">
    
    <!-- CSS responsive -->
    <link rel="stylesheet" href="css/responsive.css">
    
    <!-- CSS pour les animations -->
    <link rel="stylesheet" href="css/animations.css">
</head>
```

## Ordre de chargement et priorité

### Ordre d'importance CSS (du plus fort au plus faible)
1. `!important`
2. CSS en ligne (`style=""`)
3. ID (`#monId`)
4. Classes (`.maClasse`)
5. Éléments (`h1`, `p`)

### Exemple de priorité
```css
/* Élément (priorité faible) */
p {
    color: blue;
}

/* Classe (priorité moyenne) */
.texte-rouge {
    color: red;
}

/* ID (priorité forte) */
#texte-special {
    color: green;
}
```

```html
<!-- Ce paragraphe sera vert (ID prioritaire) -->
<p id="texte-special" class="texte-rouge">Mon texte</p>
```

## Exemple complet : projet bien structuré

**index.html**
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mon Site Web</title>
    
    <!-- CSS externe -->
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body>
    <header class="site-header">
        <h1 class="logo">Mon Site</h1>
        <nav class="navigation">
            <ul>
                <li><a href="index.html">Accueil</a></li>
                <li><a href="about.html">À propos</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main class="main-content">
        <section class="hero">
            <h2>Bienvenue</h2>
            <p>Découvrez notre site web moderne et responsive.</p>
        </section>
    </main>
    
    <footer class="site-footer">
        <p>&copy; 2025 Mon Site Web</p>
    </footer>
</body>
</html>
```

**css/style.css**
```css
/* Reset de base */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Styles généraux */
body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

/* En-tête */
.site-header {
    background-color: #2c3e50;
    color: white;
    padding: 1rem 0;
}

.logo {
    font-size: 2rem;
    font-weight: bold;
}

/* Navigation */
.navigation ul {
    list-style: none;
    display: flex;
    gap: 2rem;
}

.navigation a {
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;
}

.navigation a:hover {
    color: #3498db;
}

/* Contenu principal */
.main-content {
    min-height: 70vh;
    padding: 2rem;
}

.hero {
    text-align: center;
    padding: 4rem 0;
}

.hero h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #2c3e50;
}

/* Pied de page */
.site-footer {
    background-color: #34495e;
    color: white;
    text-align: center;
    padding: 1rem;
}
```

## Bonnes pratiques

### ✅ Organisation
- Utiliser des fichiers CSS externes
- Organiser le CSS par sections (header, navigation, contenu, footer)
- Commenter le code CSS

### ✅ Nommage
- Utiliser des noms de classes descriptifs
- Adopter une convention (BEM, camelCase, kebab-case)
- Éviter les noms génériques (`div1`, `red`)

### ✅ Performance
- Minimiser le nombre de fichiers CSS
- Optimiser et compresser le CSS en production
- Utiliser la mise en cache

