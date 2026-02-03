# 8.1 Événements de base

Les événements JavaScript permettent de rendre vos pages web interactives en réagissant aux actions des utilisateurs (clics, saisie, survol, etc.).

## Concept d'événement

Un événement est une action qui se produit dans le navigateur :
- L'utilisateur clique sur un bouton
- Une page finit de se charger
- L'utilisateur saisit du texte
- La souris survole un élément

## Gestionnaires d'événements inline (à éviter)

### Syntaxe de base
```html
<button onclick="alert('Bouton cliqué!')">Cliquez-moi</button>
```

**❌ Problèmes :**
- Mélange HTML et JavaScript
- Difficile à maintenir
- Impossible à désactiver facilement

## Gestionnaires d'événements via propriétés

### `onclick`
```html
<button id="monBouton">Cliquez-moi</button>

<script>
let bouton = document.getElementById("monBouton");

bouton.onclick = function() {
    alert("Bouton cliqué!");
};

// Ou avec une fonction fléchée
bouton.onclick = () => {
    console.log("Clic détecté");
};
</script>
```

### `onkeyup`
Déclenché quand une touche est relâchée :
```html
<input type="text" id="champTexte" placeholder="Tapez quelque chose...">

<script>
let champ = document.getElementById("champTexte");

champ.onkeyup = function(event) {
    console.log("Touche pressée:", event.key);
    console.log("Valeur actuelle:", champ.value);
};
</script>
```

### `onchange`
Déclenché quand la valeur d'un élément change :
```html
<select id="listePays">
    <option value="">-- Choisissez --</option>
    <option value="fr">France</option>
    <option value="be">Belgique</option>
    <option value="ch">Suisse</option>
</select>

<script>
let liste = document.getElementById("listePays");

liste.onchange = function() {
    console.log("Pays sélectionné:", liste.value);
};
</script>
```

### `onmouseenter` et `onmouseleave`
```html
<div id="zoneHover" style="width: 200px; height: 100px; background-color: lightblue;">
    Survolez-moi
</div>

<script>
let zone = document.getElementById("zoneHover");

zone.onmouseenter = function() {
    zone.style.backgroundColor = "lightgreen";
    zone.textContent = "Souris sur la zone";
};

zone.onmouseleave = function() {
    zone.style.backgroundColor = "lightblue";
    zone.textContent = "Survolez-moi";
};
</script>
```

## Autres événements courants

### Événements de formulaire
```html
<form id="monFormulaire">
    <input type="text" id="nom" placeholder="Votre nom">
    <input type="email" id="email" placeholder="Votre email">
    <button type="submit">Envoyer</button>
</form>

<script>
let formulaire = document.getElementById("monFormulaire");
let champNom = document.getElementById("nom");
let champEmail = document.getElementById("email");

// Soumission du formulaire
formulaire.onsubmit = function(event) {
    event.preventDefault(); // Empêche l'envoi par défaut
    console.log("Formulaire soumis!");
    console.log("Nom:", champNom.value);
    console.log("Email:", champEmail.value);
};

// Focus sur un champ
champNom.onfocus = function() {
    champNom.style.backgroundColor = "#ffffcc";
};

// Perte de focus
champNom.onblur = function() {
    champNom.style.backgroundColor = "white";
};
</script>
```

### Événements de fenêtre
```javascript
// Chargement de la page
window.onload = function() {
    console.log("Page entièrement chargée");
};

// Redimensionnement de la fenêtre
window.onresize = function() {
    console.log("Fenêtre redimensionnée:", window.innerWidth, "x", window.innerHeight);
};

// Défilement de la page
window.onscroll = function() {
    console.log("Position de défilement:", window.scrollY);
};
```

### Événements de souris
```html
<div id="carreInteractif" style="width: 150px; height: 150px; background-color: red; margin: 20px;">
    Carré interactif
</div>

<script>
let carre = document.getElementById("carreInteractif");

// Clic gauche
carre.onclick = function() {
    carre.style.backgroundColor = "blue";
};

// Double-clic
carre.ondblclick = function() {
    carre.style.backgroundColor = "green";
};

// Clic droit
carre.oncontextmenu = function(event) {
    event.preventDefault(); // Empêche le menu contextuel
    carre.style.backgroundColor = "purple";
};

// Bouton de souris enfoncé
carre.onmousedown = function() {
    carre.style.transform = "scale(0.9)";
};

// Bouton de souris relâché
carre.onmouseup = function() {
    carre.style.transform = "scale(1)";
};
</script>
```

### Événements de clavier
```html
<input type="text" id="champClavier" placeholder="Testez les touches...">
<div id="infoTouche"></div>

<script>
let champClavier = document.getElementById("champClavier");
let infoTouche = document.getElementById("infoTouche");

// Touche enfoncée
champClavier.onkeydown = function(event) {
    console.log("Touche enfoncée:", event.key);
};

// Touche relâchée
champClavier.onkeyup = function(event) {
    infoTouche.innerHTML = `
        <strong>Dernière touche :</strong> ${event.key}<br>
        <strong>Code :</strong> ${event.code}<br>
        <strong>Touches spéciales :</strong> 
        Ctrl: ${event.ctrlKey}, 
        Shift: ${event.shiftKey}, 
        Alt: ${event.altKey}
    `;
};

// Saisie de caractère
champClavier.onkeypress = function(event) {
    // Déclenché uniquement pour les caractères imprimables
    console.log("Caractère saisi:", event.key);
};
</script>
```

## Objet `event`

L'objet event contient des informations sur l'événement :

```html
<button id="boutonInfo">Cliquez pour voir les infos</button>

<script>
let boutonInfo = document.getElementById("boutonInfo");

boutonInfo.onclick = function(event) {
    console.log("Type d'événement:", event.type);
    console.log("Element cible:", event.target);
    console.log("Coordonnées:", event.clientX, event.clientY);
    console.log("Timestamp:", event.timeStamp);
    
    // Empêcher le comportement par défaut
    event.preventDefault();
    
    // Empêcher la propagation
    event.stopPropagation();
};
</script>
```

## Exemple pratique complet

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Événements JavaScript</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 2rem auto;
            padding: 1rem;
        }
        
        .section {
            margin-bottom: 2rem;
            padding: 1rem;
            border: 1px solid #ddd;
            border-radius: 8px;
        }
        
        .bouton {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            margin: 0.5rem;
            transition: background-color 0.3s;
        }
        
        .bouton:hover {
            background-color: #2980b9;
        }
        
        .zone-interactive {
            width: 200px;
            height: 100px;
            background-color: #ecf0f1;
            border: 2px dashed #bdc3c7;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 1rem 0;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .input-group {
            margin: 1rem 0;
        }
        
        .input-group label {
            display: block;
            margin-bottom: 0.5rem;
        }
        
        .input-group input, .input-group select {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        
        .log {
            background-color: #2c3e50;
            color: #ecf0f1;
            padding: 1rem;
            border-radius: 4px;
            font-family: monospace;
            height: 200px;
            overflow-y: auto;
            margin-top: 1rem;
        }
    </style>
</head>
<body>
    <h1>Démonstration des Événements JavaScript</h1>
    
    <!-- Section 1: Événements de clic -->
    <div class="section">
        <h2>1. Événements de Clic</h2>
        <button class="bouton" id="bouton1">Clic simple</button>
        <button class="bouton" id="bouton2">Double-clic</button>
        <button class="bouton" id="bouton3">Clic droit</button>
        
        <div class="zone-interactive" id="zoneClics">
            Cliquez ici (différents boutons)
        </div>
    </div>
    
    <!-- Section 2: Événements de souris -->
    <div class="section">
        <h2>2. Événements de Souris</h2>
        <div class="zone-interactive" id="zoneSouris">
            Survolez cette zone
        </div>
    </div>
    
    <!-- Section 3: Événements de formulaire -->
    <div class="section">
        <h2>3. Événements de Formulaire</h2>
        <form id="formulaireTest">
            <div class="input-group">
                <label for="nom">Nom (tapez pour voir onkeyup):</label>
                <input type="text" id="nom" placeholder="Votre nom">
            </div>
            
            <div class="input-group">
                <label for="pays">Pays (changez pour voir onchange):</label>
                <select id="pays">
                    <option value="">-- Choisissez --</option>
                    <option value="fr">France</option>
                    <option value="be">Belgique</option>
                    <option value="ch">Suisse</option>
                </select>
            </div>
            
            <button type="submit" class="bouton">Soumettre</button>
        </form>
    </div>
    
    <!-- Section 4: Log des événements -->
    <div class="section">
        <h2>4. Journal des Événements</h2>
        <button class="bouton" id="viderLog">Vider le journal</button>
        <div class="log" id="journal"></div>
    </div>
    
    <script>
        // Référence au journal
        let journal = document.getElementById("journal");
        
        // Fonction pour ajouter un message au journal
        function ajouterLog(message) {
            let timestamp = new Date().toLocaleTimeString();
            journal.innerHTML += `[${timestamp}] ${message}<br>`;
            journal.scrollTop = journal.scrollHeight;
        }
        
        // Section 1: Événements de clic
        let bouton1 = document.getElementById("bouton1");
        let bouton2 = document.getElementById("bouton2");
        let bouton3 = document.getElementById("bouton3");
        let zoneClics = document.getElementById("zoneClics");
        
        bouton1.onclick = function() {
            ajouterLog("Bouton 1 - Clic simple détecté");
        };
        
        bouton2.ondblclick = function() {
            ajouterLog("Bouton 2 - Double-clic détecté");
        };
        
        bouton3.oncontextmenu = function(event) {
            event.preventDefault();
            ajouterLog("Bouton 3 - Clic droit détecté (menu contextuel bloqué)");
        };
        
        zoneClics.onclick = function(event) {
            ajouterLog(`Zone cliquée - Bouton: ${event.button}, Position: (${event.clientX}, ${event.clientY})`);
        };
        
        // Section 2: Événements de souris
        let zoneSouris = document.getElementById("zoneSouris");
        
        zoneSouris.onmouseenter = function() {
            zoneSouris.style.backgroundColor = "#3498db";
            zoneSouris.style.color = "white";
            zoneSouris.textContent = "Souris sur la zone";
            ajouterLog("Souris entrée dans la zone");
        };
        
        zoneSouris.onmouseleave = function() {
            zoneSouris.style.backgroundColor = "#ecf0f1";
            zoneSouris.style.color = "black";
            zoneSouris.textContent = "Survolez cette zone";
            ajouterLog("Souris sortie de la zone");
        };
        
        zoneSouris.onmousemove = function(event) {
            // Afficher les coordonnées en temps réel (mais ne pas logger pour éviter le spam)
            zoneSouris.textContent = `Position: (${event.offsetX}, ${event.offsetY})`;
        };
        
        // Section 3: Événements de formulaire
        let formulaireTest = document.getElementById("formulaireTest");
        let champNom = document.getElementById("nom");
        let listePays = document.getElementById("pays");
        
        champNom.onkeyup = function(event) {
            ajouterLog(`Saisie dans nom - Touche: "${event.key}", Valeur: "${champNom.value}"`);
        };
        
        champNom.onfocus = function() {
            champNom.style.backgroundColor = "#ffffcc";
            ajouterLog("Champ nom a reçu le focus");
        };
        
        champNom.onblur = function() {
            champNom.style.backgroundColor = "white";
            ajouterLog("Champ nom a perdu le focus");
        };
        
        listePays.onchange = function() {
            ajouterLog(`Pays sélectionné: "${listePays.value}"`);
        };
        
        formulaireTest.onsubmit = function(event) {
            event.preventDefault();
            ajouterLog(`Formulaire soumis - Nom: "${champNom.value}", Pays: "${listePays.value}"`);
            
            // Validation simple
            if (!champNom.value) {
                ajouterLog("⚠️ Erreur: Le nom est requis");
            } else {
                ajouterLog("✅ Formulaire valide!");
            }
        };
        
        // Section 4: Vider le journal
        let boutonVider = document.getElementById("viderLog");
        boutonVider.onclick = function() {
            journal.innerHTML = "";
            ajouterLog("Journal vidé");
        };
        
        // Événements globaux
        window.onload = function() {
            ajouterLog("🚀 Page chargée - Événements prêts!");
        };
        
        // Détection des touches spéciales
        document.onkeydown = function(event) {
            if (event.ctrlKey && event.key === 's') {
                event.preventDefault();
                ajouterLog("🔍 Raccourci Ctrl+S détecté (sauvegarde bloquée)");
            }
        };
    </script>
</body>
</html>
```

## Bonnes pratiques

### ✅ Performance
- Ne pas attacher trop d'événements (utiliser la délégation)
- Supprimer les événements inutiles
- Utiliser `addEventListener` pour plus de flexibilité

### ✅ Accessibilité
- Prévoir la navigation au clavier
- Gérer les événements `focus` et `blur`
- Tester avec les lecteurs d'écran

### ✅ UX/UI
- Feedback visuel immédiat
- Prévenir les actions accidentelles
- Validation en temps réel

### ✅ Débogage
- Utiliser `console.log` pour tracer les événements
- Vérifier `event.target` pour identifier l'élément
- Tester sur différents navigateurs

