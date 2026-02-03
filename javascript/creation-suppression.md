# 7.3 Création et suppression d'éléments

## Introduction

La manipulation dynamique du DOM permet de créer, modifier et supprimer des éléments HTML à la volée, offrant une expérience utilisateur riche et interactive.

## Création d'éléments

### createElement()

```javascript
// Créer un nouvel élément
let nouvelElement = document.createElement('div');
nouvelElement.textContent = 'Nouveau contenu';
nouvelElement.className = 'ma-classe';

// Ajouter des attributs
nouvelElement.setAttribute('id', 'monId');
nouvelElement.setAttribute('data-info', 'valeur');
```

### Exemple pratique - Création d'une carte

```html
<div id="conteneur">
    <button id="ajouterCarte">Ajouter une carte</button>
</div>

<script>
function creerCarte(titre, contenu) {
    // Créer la structure
    const carte = document.createElement('div');
    carte.className = 'carte';
    
    const header = document.createElement('div');
    header.className = 'carte-header';
    
    const h3 = document.createElement('h3');
    h3.textContent = titre;
    
    const body = document.createElement('div');
    body.className = 'carte-body';
    body.textContent = contenu;
    
    const boutonSupprimer = document.createElement('button');
    boutonSupprimer.textContent = 'Supprimer';
    boutonSupprimer.className = 'btn-supprimer';
    
    // Assembler la structure
    header.appendChild(h3);
    carte.appendChild(header);
    carte.appendChild(body);
    carte.appendChild(boutonSupprimer);
    
    // Ajouter l'événement de suppression
    boutonSupprimer.addEventListener('click', function() {
        carte.remove();
    });
    
    return carte;
}

// Utilisation
document.getElementById('ajouterCarte').addEventListener('click', function() {
    const nouvelleCarte = creerCarte('Nouvelle carte', 'Contenu de la carte');
    document.getElementById('conteneur').appendChild(nouvelleCarte);
});
</script>
```

## Insertion d'éléments

### Méthodes d'insertion

```javascript
const parent = document.getElementById('conteneur');
const nouvelElement = document.createElement('p');
nouvelElement.textContent = 'Nouveau paragraphe';

// Ajouter à la fin
parent.appendChild(nouvelElement);

// Insérer au début
parent.insertBefore(nouvelElement, parent.firstChild);

// Insérer avant un élément spécifique
const reference = document.getElementById('elementReference');
parent.insertBefore(nouvelElement, reference);
```

### Méthodes modernes

```javascript
const element = document.createElement('div');
element.textContent = 'Nouveau contenu';

// Insérer avec insertAdjacentElement
const reference = document.getElementById('reference');

// Positions possibles :
reference.insertAdjacentElement('beforebegin', element); // Avant l'élément
reference.insertAdjacentElement('afterbegin', element);  // Au début à l'intérieur
reference.insertAdjacentElement('beforeend', element);   // À la fin à l'intérieur
reference.insertAdjacentElement('afterend', element);    // Après l'élément

// Avec du HTML directement
reference.insertAdjacentHTML('beforeend', '<p>Nouveau paragraphe</p>');
```

## Suppression d'éléments

### remove() - Méthode moderne

```javascript
// Supprimer un élément
const element = document.getElementById('monElement');
element.remove();

// Supprimer plusieurs éléments
const elements = document.querySelectorAll('.classe-a-supprimer');
elements.forEach(el => el.remove());
```

### removeChild() - Méthode classique

```javascript
const parent = document.getElementById('conteneur');
const enfant = document.getElementById('elementASupprimer');

// Vérifier que l'élément existe
if (enfant && parent.contains(enfant)) {
    parent.removeChild(enfant);
}
```

### Vider un conteneur

```javascript
const conteneur = document.getElementById('conteneur');

// Méthode 1 : innerHTML (attention aux événements)
conteneur.innerHTML = '';

// Méthode 2 : removeChild en boucle
while (conteneur.firstChild) {
    conteneur.removeChild(conteneur.firstChild);
}

// Méthode 3 : remove() sur tous les enfants
Array.from(conteneur.children).forEach(enfant => enfant.remove());
```

## Clonage d'éléments

### cloneNode()

```javascript
const elementOriginal = document.getElementById('template');

// Clone superficiel (sans les enfants)
const cloneSuperficiel = elementOriginal.cloneNode(false);

// Clone profond (avec tous les enfants)
const cloneProfond = elementOriginal.cloneNode(true);

// Ajouter le clone au DOM
document.getElementById('conteneur').appendChild(cloneProfond);
```

### Exemple - Duplication de lignes de tableau

```html
<table id="monTableau">
    <thead>
        <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <tr id="ligneTemplate" style="display: none;">
            <td><input type="text" name="nom"></td>
            <td><input type="email" name="email"></td>
            <td><button onclick="supprimerLigne(this)">Supprimer</button></td>
        </tr>
    </tbody>
</table>

<button onclick="ajouterLigne()">Ajouter une ligne</button>

<script>
function ajouterLigne() {
    const template = document.getElementById('ligneTemplate');
    const nouvelleLigne = template.cloneNode(true);
    
    // Générer un ID unique
    nouvelleLigne.id = 'ligne_' + Date.now();
    nouvelleLigne.style.display = '';
    
    // Vider les champs
    const inputs = nouvelleLigne.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
    
    // Ajouter au tableau
    template.parentNode.appendChild(nouvelleLigne);
}

function supprimerLigne(bouton) {
    const ligne = bouton.closest('tr');
    if (ligne.id !== 'ligneTemplate') {
        ligne.remove();
    }
}
</script>
```

## Manipulation avancée

### DocumentFragment pour optimiser les performances

```javascript
// Créer un fragment
const fragment = document.createDocumentFragment();

// Ajouter plusieurs éléments au fragment
for (let i = 0; i < 100; i++) {
    const li = document.createElement('li');
    li.textContent = `Élément ${i}`;
    fragment.appendChild(li);
}

// Ajouter tout d'un coup au DOM (plus performant)
document.getElementById('listeComplete').appendChild(fragment);
```

### Template HTML5

```html
<template id="carteTemplate">
    <div class="carte">
        <h3 class="titre"></h3>
        <p class="contenu"></p>
        <button class="btn-supprimer">Supprimer</button>
    </div>
</template>

<div id="conteneurCartes"></div>
<button onclick="ajouterCarteAvecTemplate()">Ajouter carte</button>

<script>
function ajouterCarteAvecTemplate() {
    const template = document.getElementById('carteTemplate');
    const clone = template.content.cloneNode(true);
    
    // Personnaliser le contenu
    clone.querySelector('.titre').textContent = 'Nouvelle carte';
    clone.querySelector('.contenu').textContent = 'Contenu personnalisé';
    
    // Ajouter l'événement
    clone.querySelector('.btn-supprimer').addEventListener('click', function() {
        this.closest('.carte').remove();
    });
    
    document.getElementById('conteneurCartes').appendChild(clone);
}
</script>
```

## Exemple pratique complet

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestionnaire de tâches</title>
    <style>
        .conteneur {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .formulaire {
            background: #f5f5f5;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        
        .tache {
            background: white;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 15px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .tache.terminee {
            opacity: 0.6;
            text-decoration: line-through;
        }
        
        .boutons {
            display: flex;
            gap: 10px;
        }
        
        button {
            padding: 5px 10px;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        }
        
        .btn-terminer { background: #28a745; color: white; }
        .btn-modifier { background: #007bff; color: white; }
        .btn-supprimer { background: #dc3545; color: white; }
    </style>
</head>
<body>
    <div class="conteneur">
        <h1>Gestionnaire de tâches</h1>
        
        <div class="formulaire">
            <input type="text" id="nouvelleTache" placeholder="Nouvelle tâche..." />
            <button onclick="ajouterTache()">Ajouter</button>
        </div>
        
        <div id="listeTaches"></div>
    </div>

    <script>
        let idCompteur = 0;

        function ajouterTache() {
            const input = document.getElementById('nouvelleTache');
            const texte = input.value.trim();
            
            if (texte === '') {
                alert('Veuillez saisir une tâche');
                return;
            }
            
            const tache = creerElementTache(texte);
            document.getElementById('listeTaches').appendChild(tache);
            
            input.value = '';
            input.focus();
        }

        function creerElementTache(texte) {
            const id = ++idCompteur;
            
            // Créer la structure
            const div = document.createElement('div');
            div.className = 'tache';
            div.setAttribute('data-id', id);
            
            const span = document.createElement('span');
            span.textContent = texte;
            span.className = 'texte-tache';
            
            const boutonsDiv = document.createElement('div');
            boutonsDiv.className = 'boutons';
            
            // Bouton terminer
            const btnTerminer = document.createElement('button');
            btnTerminer.textContent = 'Terminer';
            btnTerminer.className = 'btn-terminer';
            btnTerminer.addEventListener('click', function() {
                basculerEtatTache(div);
            });
            
            // Bouton modifier
            const btnModifier = document.createElement('button');
            btnModifier.textContent = 'Modifier';
            btnModifier.className = 'btn-modifier';
            btnModifier.addEventListener('click', function() {
                modifierTache(span);
            });
            
            // Bouton supprimer
            const btnSupprimer = document.createElement('button');
            btnSupprimer.textContent = 'Supprimer';
            btnSupprimer.className = 'btn-supprimer';
            btnSupprimer.addEventListener('click', function() {
                if (confirm('Voulez-vous vraiment supprimer cette tâche ?')) {
                    div.remove();
                }
            });
            
            // Assembler
            boutonsDiv.appendChild(btnTerminer);
            boutonsDiv.appendChild(btnModifier);
            boutonsDiv.appendChild(btnSupprimer);
            
            div.appendChild(span);
            div.appendChild(boutonsDiv);
            
            return div;
        }

        function basculerEtatTache(elementTache) {
            elementTache.classList.toggle('terminee');
            
            const btnTerminer = elementTache.querySelector('.btn-terminer');
            if (elementTache.classList.contains('terminee')) {
                btnTerminer.textContent = 'Réactiver';
            } else {
                btnTerminer.textContent = 'Terminer';
            }
        }

        function modifierTache(spanTexte) {
            const texteActuel = spanTexte.textContent;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = texteActuel;
            input.style.width = '100%';
            
            // Remplacer temporairement le span par l'input
            spanTexte.parentNode.replaceChild(input, spanTexte);
            input.focus();
            input.select();
            
            function sauvegarder() {
                const nouveauTexte = input.value.trim();
                if (nouveauTexte !== '') {
                    spanTexte.textContent = nouveauTexte;
                } else {
                    spanTexte.textContent = texteActuel;
                }
                input.parentNode.replaceChild(spanTexte, input);
            }
            
            // Sauvegarder sur Enter ou perte de focus
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sauvegarder();
                }
            });
            
            input.addEventListener('blur', sauvegarder);
        }

        // Ajouter une tâche en appuyant sur Enter
        document.getElementById('nouvelleTache').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                ajouterTache();
            }
        });
    </script>
</body>
</html>
```

## Bonnes pratiques

### ✅ Performance
- Utiliser `DocumentFragment` pour les insertions multiples
- Éviter les modifications répétées du DOM
- Préférer `remove()` à `innerHTML = ''` pour préserver les événements

### ✅ Mémoire
- Supprimer les gestionnaires d'événements avant la suppression d'éléments
- Éviter les références circulaires
- Utiliser `removeEventListener()` quand nécessaire

### ✅ Sécurité
- Éviter `innerHTML` avec du contenu non sécurisé
- Valider les données avant l'insertion
- Utiliser `textContent` pour le texte simple

### ✅ Maintenance
- Utiliser des templates pour les structures complexes
- Séparer la logique de création de la logique métier
- Documenter les structures d'éléments créées

## Résumé

La création et suppression d'éléments DOM permet de construire des interfaces dynamiques. Les méthodes modernes comme `createElement()`, `remove()` et les templates HTML5 offrent flexibilité et performance pour créer des applications web interactives.

