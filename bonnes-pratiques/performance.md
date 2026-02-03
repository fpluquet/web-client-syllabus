# 12.4 Performance

Un site performant se charge rapidement et reste fluide, même sur des connexions lentes ou des appareils peu puissants. Voici comment optimiser la performance de vos pages web :

## Optimiser la taille des images

Les images trop lourdes ralentissent le chargement. Compressez-les et choisissez le format le plus adapté (JPEG pour les photos, PNG pour les images avec transparence, SVG pour les icônes).

> **Astuce :** Utilisez des outils comme TinyPNG ou Squoosh pour réduire la taille des images sans perte visible de qualité.

## Charger les scripts efficacement

Placez les balises `<script>` juste avant la fermeture de `</body>` ou utilisez l’attribut `defer` pour que le chargement du JavaScript ne bloque pas l’affichage de la page.

### Différences entre `defer` et `async`

- **`defer`** :
  - Le script est téléchargé en parallèle du HTML, mais il n’est exécuté qu’une fois que tout le document HTML est entièrement analysé (juste avant l’événement `DOMContentLoaded`).
  - Les scripts avec `defer` sont exécutés dans l’ordre où ils apparaissent dans le code.
  - Idéal pour les scripts qui dépendent du DOM complet ou d’autres scripts.

  **Exemple :**
  ```html
  <script src="main.js" defer></script>
  <script src="autre.js" defer></script>
  ```
  Ici, `main.js` sera toujours exécuté avant `autre.js`, même si le second se télécharge plus vite.


- **`async`** :
  - Le script est téléchargé en parallèle du HTML et exécuté dès qu’il est prêt, sans attendre la fin de l’analyse du HTML.
  - L’ordre d’exécution n’est pas garanti si plusieurs scripts sont en `async`.
  - À utiliser pour les scripts indépendants (ex : analytics, widgets externes).

  **Exemple :**
  ```html
  <script src="analytics.js" async></script>
  <script src="widget.js" async></script>
  ```
  Ici, `analytics.js` et `widget.js` seront exécutés dès qu’ils sont chargés, dans un ordre imprévisible.


> **Astuce :** N’utilisez pas `async` pour des scripts qui dépendent les uns des autres ou du DOM complet.

## Limiter le nombre de requêtes HTTP

Chaque fichier CSS ou JS externe ajoute une requête au serveur. Regroupez vos fichiers quand c’est possible pour réduire leur nombre.

> **Astuce :** Utilisez des outils de build (Webpack, Parcel, etc.) pour fusionner et minifier vos fichiers.

## Privilégier les animations CSS

Les animations CSS sont généralement plus performantes que celles faites en JavaScript, car elles sont optimisées par le navigateur.

> **Astuce :** Préférez animer les propriétés `transform` et `opacity` pour des transitions fluides.

## Lazy loading des ressources non critiques

Chargez les images ou contenus non essentiels uniquement quand ils deviennent visibles à l’écran (lazy loading). Cela accélère le chargement initial de la page.

**Exemple :**
```html
<img src="photo.jpg" loading="lazy" alt="Description de la photo">
```
> **Astuce :** Le lazy loading est pris en charge nativement par la plupart des navigateurs modernes avec l’attribut `loading="lazy"`.
