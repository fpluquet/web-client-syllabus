# 7.1 Sélection d'éléments

La sélection d'éléments du DOM est la première étape pour manipuler une page web avec JavaScript. Le DOM (Document Object Model) représente la structure HTML sous forme d'arbre d'objets.

## Méthodes de sélection

### `document.getElementById()`

Sélectionne un élément par son ID (unique).

```html
<div id="mon-titre">Bonjour le monde</div>
<button id="mon-bouton">Cliquez-moi</button>
```

```javascript
// Sélection par ID
let titre = document.getElementById("mon-titre");
let bouton = document.getElementById("mon-bouton");

console.log(titre);  // <div id="mon-titre">Bonjour le monde</div>
console.log(bouton); // <button id="mon-bouton">Cliquez-moi</button>
```

### `document.querySelector()`

Sélectionne le **premier** élément qui correspond au sélecteur CSS.

```html
<div class="carte">Carte 1</div>
<div class="carte">Carte 2</div>
<p class="texte">Paragraphe</p>
<button class="btn-primary">Valider</button>
```

```javascript
// Sélection par classe (premier élément)
let premiereCarte = document.querySelector(".carte");
console.log(premiereCarte); // <div class="carte">Carte 1</div>

// Sélection par élément
let paragraphe = document.querySelector("p");
console.log(paragraphe); // <p class="texte">Paragraphe</p>

// Sélection par classe spécifique
let boutonPrimaire = document.querySelector(".btn-primary");

// Sélecteurs CSS complexes
let premierLien = document.querySelector("nav a");
let boutonDansHeader = document.querySelector("header button.menu");
```

### `document.querySelectorAll()`

Sélectionne **tous** les éléments qui correspondent au sélecteur CSS. Retourne une NodeList.

```html
<ul>
    <li class="item">Item 1</li>
    <li class="item">Item 2</li>
    <li class="item">Item 3</li>
</ul>
```

```javascript
// Sélection de tous les éléments avec la classe "item"
let tousLesItems = document.querySelectorAll(".item");
console.log(tousLesItems); // NodeList(3) [li.item, li.item, li.item]

// Parcourir tous les éléments
tousLesItems.forEach(function(item, index) {
    console.log(`Item ${index + 1}: ${item.textContent}`);
});

// Avec une boucle for
for (let i = 0; i < tousLesItems.length; i++) {
    console.log(tousLesItems[i].textContent);
}
```

## Autres méthodes de sélection (moins utilisées)

### Par nom de balise
```javascript
// Tous les paragraphes
let paragraphes = document.getElementsByTagName("p");

// Tous les boutons
let boutons = document.getElementsByTagName("button");
```

### Par classe
```javascript
// Tous les éléments avec la classe "highlight"
let elementsHighlight = document.getElementsByClassName("highlight");
```

### Par nom (formulaires)
```javascript
// Éléments avec l'attribut name
let champsEmail = document.getElementsByName("email");
```

## Sélecteurs CSS avancés

### Sélecteurs de hiérarchie
```javascript
// Enfant direct
let boutonHeader = document.querySelector("header > button");

// Descendant
let lienNav = document.querySelector("nav a");

// Frère adjacent
let labelSuivant = document.querySelector("input + label");

// Frères suivants
let elementsApresTitre = document.querySelectorAll("h2 ~ p");
```

### Sélecteurs d'attributs
```javascript
// Élément avec un attribut spécifique
let champsRequis = document.querySelectorAll("input[required]");

// Attribut avec valeur exacte
let boutonSubmit = document.querySelector("button[type='submit']");

// Attribut contenant une valeur
let liensExternes = document.querySelectorAll("a[href*='http']");

// Attribut commençant par une valeur
let imagesLocales = document.querySelectorAll("img[src^='./images']");
```

### Pseudo-classes
```javascript
// Premier enfant
let premierItem = document.querySelector("li:first-child");

// Dernier enfant
let dernierItem = document.querySelector("li:last-child");

// N-ième enfant
let troisiemeItem = document.querySelector("li:nth-child(3)");

// Éléments pairs
let itemsPairs = document.querySelectorAll("li:nth-child(even)");

// Éléments impairs
let itemsImpairs = document.querySelectorAll("li:nth-child(odd)");
```

## Vérification d'existence

```javascript
let element = document.getElementById("element-inexistant");

if (element) {
    // L'élément existe
    console.log("Élément trouvé !");
} else {
    // L'élément n'existe pas
    console.log("Élément non trouvé.");
}

// Méthode plus courte
let bouton = document.querySelector(".mon-bouton");
bouton?.addEventListener("click", function() {
    console.log("Bouton cliqué !");
});
```

## Exemple pratique complet

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Sélection d'éléments</title>
</head>
<body>
    <header>
        <h1 id="titre-principal">Mon Site Web</h1>
        <nav>
            <ul class="menu">
                <li><a href="#accueil">Accueil</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="accueil">
            <h2>Bienvenue</h2>
            <p class="intro">Découvrez nos services.</p>
            <button class="btn btn-primary">En savoir plus</button>
        </section>
        
        <section id="services">
            <h2>Nos Services</h2>
            <div class="carte service">Service 1</div>
            <div class="carte service">Service 2</div>
            <div class="carte service">Service 3</div>
        </section>
        
        <form id="contact-form">
            <input type="text" name="nom" placeholder="Votre nom" required>
            <input type="email" name="email" placeholder="Votre email" required>
            <button type="submit">Envoyer</button>
        </form>
    </main>
    
    <script>
        // Sélections par ID
        let titrePrincipal = document.getElementById("titre-principal");
        let sectionAccueil = document.getElementById("accueil");
        
        // Sélections par classe (premier élément)
        let premiereCarte = document.querySelector(".carte");
        let boutonPrimaire = document.querySelector(".btn-primary");
        
        // Sélections multiples
        let toutesLesCartes = document.querySelectorAll(".carte");
        let tousLesBoutons = document.querySelectorAll("button");
        let liensMenu = document.querySelectorAll("nav a");
        
        // Sélections avancées
        let champsRequis = document.querySelectorAll("input[required]");
        let premierLienMenu = document.querySelector("nav ul li:first-child a");
        
        // Affichage des résultats
        console.log("Titre principal:", titrePrincipal.textContent);
        console.log("Nombre de cartes:", toutesLesCartes.length);
        console.log("Nombre de boutons:", tousLesBoutons.length);
        console.log("Champs requis:", champsRequis.length);
        
        // Parcourir les liens du menu
        liensMenu.forEach(function(lien, index) {
            console.log(`Lien ${index + 1}: ${lien.textContent} → ${lien.href}`);
        });
        
        // Vérifier l'existence avant manipulation
        let formulaire = document.getElementById("contact-form");
        if (formulaire) {
            console.log("Formulaire trouvé !");
            // Ici on pourrait ajouter des événements
        }
    </script>
</body>
</html>
```

## Performances et bonnes pratiques

### ✅ Optimisation
```javascript
// ✅ Stocker les sélections fréquentes
let bouton = document.getElementById("mon-bouton");

function gererClic() {
    // Utiliser la variable stockée
    bouton.style.color = "red";
}

// ❌ Éviter les sélections répétées
function gererClicLent() {
    // Sélection à chaque appel (lent)
    document.getElementById("mon-bouton").style.color = "red";
}
```

### ✅ Spécificité des sélecteurs
```javascript
// ✅ ID (le plus rapide)
let element = document.getElementById("mon-id");

// ✅ Classe avec contexte
let bouton = document.querySelector(".sidebar .btn");

// ❌ Sélecteur trop général (lent)
let elements = document.querySelectorAll("*");
```

### ✅ Gestion des erreurs
```javascript
function selectionSecurisee(selecteur) {
    let element = document.querySelector(selecteur);
    
    if (!element) {
        console.warn(`Élément "${selecteur}" non trouvé`);
        return null;
    }
    
    return element;
}

// Utilisation
let bouton = selectionSecurisee(".mon-bouton");
if (bouton) {
    bouton.addEventListener("click", gererClic);
}
```

