# 12.1 Séparation des responsabilités

La séparation des responsabilités est un principe fondamental pour créer des sites web clairs, évolutifs et faciles à maintenir. Elle consiste à bien distinguer la structure, la présentation et le comportement dans vos projets web.

## Utiliser des balises HTML sémantiques

Structurez votre contenu avec des balises qui ont du sens : `<header>`, `<main>`, `<footer>`, `<section>`, `<article>`, etc. Cela améliore la lisibilité du code et l’accessibilité pour les utilisateurs et les moteurs de recherche.

**Exemple :**
```html
<main>
  <section>
    <article>
      <h2>Actualités</h2>
      <p>Dernières nouvelles du site...</p>
    </article>
  </section>
</main>
```
**Astuce :** Les balises sémantiques facilitent aussi l’utilisation des lecteurs d’écran.

## Placer le CSS dans des fichiers séparés

Le CSS doit être dans un fichier à part, lié dans le `<head>` du document HTML avec la balise `<link>`. Cela permet de modifier l’apparence sans toucher à la structure.

**Exemple :**
```html
<link rel="stylesheet" href="styles.css">
```
**Astuce :** Un même fichier CSS peut être partagé par plusieurs pages pour une cohérence visuelle.

## Mettre le JavaScript dans des fichiers externes

Le JavaScript doit être placé dans des fichiers séparés, inclus avec `<script src="..."></script>`, idéalement en bas du `<body>` ou avec l’attribut `defer` pour ne pas bloquer l’affichage de la page.

**Exemple :**
```html
<script src="script.js" defer></script>
```
**Astuce :** Gardez le code JavaScript séparé pour faciliter la maintenance et éviter les conflits.

## Ne pas mélanger structure, présentation et comportement

- **HTML** : structure et contenu
- **CSS** : présentation (couleurs, polices, mise en page)
- **JS** : comportement (interactions, animations)

Séparer ces trois aspects rend le code plus lisible, plus facile à corriger et à faire évoluer.

**Astuce :** Si vous devez changer la couleur d’un bouton, vous n’aurez qu’à modifier le CSS, sans toucher au HTML ou au JS.
