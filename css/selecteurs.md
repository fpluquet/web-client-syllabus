# 3.2 Sélecteurs CSS

## Introduction aux sélecteurs : la grammaire du design web

Les sélecteurs CSS constituent le **vocabulaire de ciblage** qui permet de connecter les règles de style aux éléments HTML. Ils forment une véritable grammaire qui, une fois maîtrisée, offre une précision chirurgicale dans l'application des styles.

### Philosophie du ciblage sélectif

CSS repose sur le principe de **séparation des préoccupations** : HTML structure le contenu, CSS en contrôle la présentation. Les sélecteurs établissent le pont entre ces deux mondes en permettant de cibler précisément les éléments à styliser sans polluer le HTML avec des informations de présentation.

#### Évolution de la spécificité

**Approche primitive (à éviter) :**
```html
<p style="color: red; font-size: 16px;">Texte stylé directement</p>
```

**Approche moderne :**
```html
<!-- HTML sémantique -->
<p class="introduction">Texte avec classe sémantique</p>
```
```css
/* CSS séparé */
.introduction {
  color: red;
  font-size: 16px;
}
```

### Concept de spécificité et cascade

CSS signifie "Cascading Style Sheets" : les styles **cascadent** selon des règles de priorité précises. Comprendre cette cascade est essentiel pour maîtriser CSS.

#### Hiérarchie de spécificité (du plus faible au plus fort)

1. **Sélecteurs de type** (`p`, `div`) : Spécificité = 1
2. **Sélecteurs de classe** (`.classe`) : Spécificité = 10  
3. **Sélecteurs d'ID** (`#identifiant`) : Spécificité = 100
4. **Styles inline** (`style=""`) : Spécificité = 1000
5. **`!important`** : Priorité absolue (à éviter)

Cette hiérarchie permet un contrôle fin : styles généraux avec des sélecteurs de type, personnalisations avec des classes, cas exceptionnels avec des IDs.

### Architecture CSS maintenable

#### Principe de la spécificité croissante

**Bonne pratique :** Commencer par des styles généraux (faible spécificité) et affiner progressivement avec des sélecteurs plus spécifiques.

```css
/* Base générale */
p { line-height: 1.6; }

/* Spécialisation */
.article p { margin-bottom: 1rem; }

/* Cas particulier */
.article .introduction { font-size: 1.2em; }
```

#### Éviter la guerre de spécificité

**Piège courant :** Utiliser des sélecteurs de plus en plus spécifiques pour "forcer" des styles, créant un code difficile à maintenir.

**Solution :** Architecture CSS cohérente avec des conventions de nommage claires (BEM, SMACSS, etc.).

## Introduction aux sélecteurs

Les sélecteurs CSS permettent de cibler précisément les éléments HTML que vous souhaitez styliser. Une bonne maîtrise des sélecteurs est essentielle pour écrire du CSS efficace et maintenable.

## Sélecteurs de base

### Sélecteur universel

```css
/* Sélectionne tous les éléments */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

### Sélecteur de type

```css
/* Sélectionne tous les paragraphes */
p {
  line-height: 1.6;
  margin-bottom: 1rem;
}

/* Sélectionne tous les titres h1 */
h1 {
  font-size: 2rem;
  color: #333;
}
```

### Sélecteur de classe

```css
/* Sélectionne les éléments avec class="highlight" */
.highlight {
  background-color: yellow;
  padding: 0.5rem;
}

/* Sélectionne les éléments avec class="btn primary" */
.btn.primary {
  background-color: #007bff;
  color: white;
}
```

### Sélecteur d'identifiant

```css
/* Sélectionne l'élément avec id="header" */
#header {
  background-color: #f8f9fa;
  padding: 2rem;
}

/* Sélectionne l'élément avec id="main-content" */
#main-content {
  max-width: 1200px;
  margin: 0 auto;
}
```

## Sélecteurs de combinaison

### Sélecteur descendant

```css
/* Sélectionne tous les paragraphes à l'intérieur d'un article */
article p {
  text-align: justify;
}

/* Sélectionne tous les liens dans le header */
header a {
  text-decoration: none;
  color: #333;
}
```

### Sélecteur enfant direct

```css
/* Sélectionne uniquement les li enfants directs d'ul */
ul > li {
  list-style-type: disc;
}

/* Sélectionne les paragraphes enfants directs de section */
section > p {
  margin-top: 0;
}
```

### Sélecteur frère adjacent

```css
/* Sélectionne le paragraphe qui suit immédiatement un h2 */
h2 + p {
  margin-top: 0;
  font-weight: bold;
}

/* Style spécial pour l'image après un titre */
h3 + img {
  margin-top: 1rem;
  border-radius: 8px;
}
```

### Sélecteur frère général

```css
/* Sélectionne tous les paragraphes qui suivent un h2 */
h2 ~ p {
  color: #666;
}

/* Tous les éléments après le premier paragraphe */
p ~ * {
  margin-top: 1rem;
}
```

## Sélecteurs d'attribut

### Présence d'attribut

```css
/* Sélectionne tous les éléments avec un attribut title */
[title] {
  cursor: help;
  border-bottom: 1px dotted #999;
}

/* Sélectionne tous les liens avec un attribut href */
a[href] {
  color: #007bff;
}
```

### Valeur exacte

```css
/* Sélectionne les inputs de type text */
input[type="text"] {
  border: 1px solid #ccc;
  padding: 0.5rem;
}

/* Sélectionne les éléments avec lang="fr" */
[lang="fr"] {
  font-family: "Georgia", serif;
}
```

### Valeur contenant

```css
/* Sélectionne les éléments dont la classe contient "btn" */
[class*="btn"] {
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
}

/* Liens vers des fichiers PDF */
a[href*=".pdf"] {
  background: url(pdf-icon.png) no-repeat left center;
  padding-left: 20px;
}
```

### Valeur commençant par

```css
/* Liens externes (commençant par http) */
a[href^="http"] {
  color: #e74c3c;
}

/* Sélectionne les éléments avec une classe commençant par "icon-" */
[class^="icon-"] {
  font-family: "FontAwesome";
}
```

### Valeur finissant par

```css
/* Liens vers des images */
a[href$=".jpg"],
a[href$=".png"],
a[href$=".gif"] {
  display: inline-block;
  border: 2px solid #ddd;
}

/* Fichiers téléchargeables */
a[href$=".zip"] {
  font-weight: bold;
}
```

## Pseudo-classes

### Pseudo-classes structurelles

```css
/* Premier enfant */
li:first-child {
  margin-top: 0;
}

/* Dernier enfant */
li:last-child {
  margin-bottom: 0;
}

/* Énième enfant */
tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:nth-child(odd) {
  background-color: white;
}

/* Énième enfant avec formule */
li:nth-child(3n+1) {
  color: #e74c3c;
}
```

### Pseudo-classes d'état

```css
/* Survol */
a:hover {
  color: #0056b3;
  text-decoration: underline;
}

/* Focus */
input:focus {
  outline: 2px solid #007bff;
  border-color: #007bff;
}

/* Actif */
button:active {
  transform: translateY(1px);
}

/* Visité */
a:visited {
  color: #6f42c1;
}
```

### Pseudo-classes de validation

```css
/* Input valide */
input:valid {
  border-color: #28a745;
}

/* Input invalide */
input:invalid {
  border-color: #dc3545;
}

/* Input requis */
input:required {
  border-left: 3px solid #ffc107;
}

/* Checkbox cochée */
input[type="checkbox"]:checked {
  transform: scale(1.1);
}
```

## Pseudo-éléments

### ::before et ::after

```css
/* Ajouter du contenu avant */
blockquote::before {
  content: """;
  font-size: 2rem;
  color: #007bff;
}

blockquote::after {
  content: """;
  font-size: 2rem;
  color: #007bff;
}

/* Icônes avec pseudo-éléments */
.warning::before {
  content: "⚠️";
  margin-right: 0.5rem;
}
```

### ::first-line et ::first-letter

```css
/* Première ligne d'un paragraphe */
p::first-line {
  font-weight: bold;
  color: #333;
}

/* Lettrine */
p::first-letter {
  font-size: 3rem;
  float: left;
  line-height: 1;
  margin-right: 0.5rem;
}
```

## Spécificité CSS

### Calcul de la spécificité

```css
/* Spécificité: 0001 */
p { color: black; }

/* Spécificité: 0010 */
.text { color: blue; }

/* Spécificité: 0100 */
#content { color: green; }

/* Spécificité: 1000 */
p { color: red !important; }

/* Spécificité: 0111 */
#content .text p { color: purple; }
```

### Bonnes pratiques

```css
/* ✅ Bonne pratique - spécificité faible */
.card {
  background: white;
  border: 1px solid #ddd;
}

.card-header {
  padding: 1rem;
  background: #f8f9fa;
}

/* ❌ Éviter - spécificité trop élevée */
#main-content .sidebar .widget ul li a {
  color: blue;
}
```

## Exemple pratique complet

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sélecteurs CSS</title>
  <style>
    /* Reset de base */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    /* Sélecteurs de type */
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }

    /* Sélecteur d'ID */
    #header {
      background: #007bff;
      color: white;
      padding: 2rem;
      text-align: center;
    }

    /* Sélecteurs de classe */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .card {
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    /* Sélecteur descendant */
    .card h3 {
      color: #007bff;
      margin-bottom: 1rem;
    }

    /* Sélecteur enfant direct */
    .card > p {
      margin-bottom: 1rem;
    }

    /* Sélecteur frère adjacent */
    h3 + p {
      font-weight: bold;
      color: #666;
    }

    /* Sélecteurs d'attribut */
    a[href^="http"] {
      color: #e74c3c;
    }

    a[href^="http"]::after {
      content: " 🔗";
    }

    /* Pseudo-classes */
    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
      transition: all 0.3s ease;
    }

    /* Pseudo-classes structurelles */
    .card:nth-child(even) {
      background: #f8f9fa;
    }

    /* Pseudo-éléments */
    .highlight::before {
      content: "✨ ";
      color: #ffc107;
    }
  </style>
</head>
<body>
  <header id="header">
    <h1>Démonstration des sélecteurs CSS</h1>
  </header>

  <main class="container">
    <div class="card">
      <h3>Premier article</h3>
      <p>Ce paragraphe sera en gras grâce au sélecteur h3 + p.</p>
      <p>Ce paragraphe normal suit le premier.</p>
      <a href="https://example.com">Lien externe</a>
    </div>

    <div class="card">
      <h3>Deuxième article</h3>
      <p class="highlight">Ce paragraphe a une classe highlight.</p>
      <p>Texte normal dans le deuxième article.</p>
    </div>

    <div class="card">
      <h3>Troisième article</h3>
      <p>Ce sera le troisième article, avec un fond différent.</p>
      <a href="/page-interne.html">Lien interne</a>
    </div>
  </main>
</body>
</html>
```



## Bonnes pratiques

1. **Préférez les classes aux IDs** pour le styling
2. **Évitez les sélecteurs trop spécifiques**
3. **Utilisez des noms de classes sémantiques**
4. **Groupez les sélecteurs similaires**
5. **Commentez les sélecteurs complexes**

## Résumé

Les sélecteurs CSS offrent une grande flexibilité pour cibler précisément les éléments. Une bonne compréhension de leur fonctionnement et de leur spécificité est essentielle pour écrire du CSS maintenable et efficace.
