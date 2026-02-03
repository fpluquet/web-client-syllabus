# 7.2 Manipulation du contenu

## Introduction

La manipulation du contenu DOM permet de modifier dynamiquement le texte, le HTML et les attributs des éléments d'une page web. Cette capacité est essentielle pour créer des interfaces interactives et réactives.

## Propriétés de contenu

### textContent vs innerHTML

```javascript
// Récupération d'éléments
const element = document.getElementById('demo');
const titre = document.querySelector('h1');

// textContent - texte brut uniquement
console.log(element.textContent); // Récupère tout le texte sans HTML
element.textContent = "Nouveau texte"; // Écrase tout le contenu

// innerHTML - HTML interprété
console.log(element.innerHTML); // Récupère le HTML complet
element.innerHTML = "<strong>Texte en gras</strong>"; // Interprète le HTML

// Exemple comparatif
const demo = document.getElementById('comparison');
demo.innerHTML = "<p>Texte avec <strong>HTML</strong></p>";
console.log(demo.textContent); // "Texte avec HTML"
console.log(demo.innerHTML);   // "<p>Texte avec <strong>HTML</strong></p>"

// Sécurité - textContent échappe automatiquement
const userInput = "<script>alert('XSS')</script>";
element.textContent = userInput; // Sécurisé - affiché comme texte
// element.innerHTML = userInput; // Dangereux - exécuterait le script
```

### innerText vs textContent

```javascript
// Différence entre innerText et textContent
const elementCache = document.getElementById('hidden-content');

// textContent récupère tout le texte, même masqué
console.log(elementCache.textContent); // Tout le texte

// innerText ne récupère que le texte visible
console.log(elementCache.innerText); // Seulement le texte visible

// textContent est plus rapide et plus prévisible
element.textContent = "Nouveau contenu"; // Recommandé
```

### outerHTML

```javascript
// outerHTML inclut l'élément lui-même
const article = document.querySelector('article');
console.log(article.outerHTML); // L'élément complet avec ses balises

// Remplacer complètement un élément
article.outerHTML = '<section class="nouvelle-section">Nouveau contenu</section>';

// L'élément original n'existe plus dans le DOM
// console.log(article.outerHTML); // L'ancienne référence ne fonctionne plus
```

## Manipulation d'attributs

### Méthodes d'attributs

```javascript
const image = document.querySelector('img');
const lien = document.querySelector('a');

// getAttribute - récupérer un attribut
const src = image.getAttribute('src');
const href = lien.getAttribute('href');
console.log(src, href);

// setAttribute - définir un attribut
image.setAttribute('alt', 'Description de l\'image');
lien.setAttribute('target', '_blank');

// removeAttribute - supprimer un attribut
image.removeAttribute('title');

// hasAttribute - vérifier l'existence
if (lien.hasAttribute('download')) {
  console.log('Lien de téléchargement');
}

// Attributs personnalisés (data-*)
const element = document.getElementById('widget');
element.setAttribute('data-config', '{"theme": "dark", "size": "large"}');
element.setAttribute('data-user-id', '12345');

// Récupération d'attributs data
const config = element.getAttribute('data-config');
const userId = element.getAttribute('data-user-id');
```

### Dataset API

```javascript
// API dataset pour les attributs data-*
const widget = document.getElementById('widget');

// Définir des données
widget.dataset.theme = 'dark';
widget.dataset.userId = '12345';
widget.dataset.lastUpdate = new Date().toISOString();

// Récupérer des données
console.log(widget.dataset.theme);    // 'dark'
console.log(widget.dataset.userId);   // '12345'

// Conversion automatique des noms (camelCase <-> kebab-case)
widget.dataset.maxItems = '10';       // Crée data-max-items="10"
widget.dataset.isActive = 'true';     // Crée data-is-active="true"

// Supprimer des données
delete widget.dataset.theme;

// Itérer sur toutes les données
for (let key in widget.dataset) {
  console.log(`${key}: ${widget.dataset[key]}`);
}

// Exemple pratique - configuration de composant
function configurerWidget(element, options) {
  // Sauvegarder la configuration
  element.dataset.config = JSON.stringify(options);
  
  // Appliquer les options
  element.style.backgroundColor = options.backgroundColor || '#fff';
  element.style.fontSize = options.fontSize || '16px';
  element.className = `widget ${options.theme || 'default'}`;
}

const monWidget = document.getElementById('mon-widget');
configurerWidget(monWidget, {
  theme: 'dark',
  backgroundColor: '#333',
  fontSize: '18px'
});
```

## Propriétés directes

### Propriétés courantes

```javascript
const input = document.querySelector('input[type="text"]');
const checkbox = document.querySelector('input[type="checkbox"]');
const select = document.querySelector('select');
const image = document.querySelector('img');

// Propriétés de formulaire
input.value = 'Nouvelle valeur';
input.placeholder = 'Entrez votre texte';
input.disabled = true;

checkbox.checked = true;
checkbox.disabled = false;

select.selectedIndex = 2;
select.disabled = false;

// Propriétés d'image
image.src = 'nouvelle-image.jpg';
image.alt = 'Nouvelle description';

// Propriétés de lien
const lien = document.querySelector('a');
lien.href = 'https://example.com';
lien.target = '_blank';
lien.title = 'Ouvrir dans un nouvel onglet';

// Propriétés génériques
const element = document.getElementById('demo');
element.id = 'nouveau-id';
element.className = 'nouvelle-classe autre-classe';
element.title = 'Infobulle';
```

### value vs getAttribute

```javascript
const input = document.querySelector('input');

// Valeur initiale dans le HTML
input.setAttribute('value', 'valeur-initiale');

// L'utilisateur tape "nouvelle-valeur"
console.log(input.value);              // "nouvelle-valeur" (valeur actuelle)
console.log(input.getAttribute('value')); // "valeur-initiale" (attribut HTML)

// Pour réinitialiser à la valeur par défaut
input.value = input.getAttribute('value');

// Ou mieux, utiliser defaultValue
input.value = input.defaultValue;
```

## Modification de contenu avancée

### Insertion de contenu

```javascript
const container = document.getElementById('container');

// insertAdjacentHTML - insertion précise
container.insertAdjacentHTML('beforebegin', '<h2>Avant le container</h2>');
container.insertAdjacentHTML('afterbegin', '<p>Début du container</p>');
container.insertAdjacentHTML('beforeend', '<p>Fin du container</p>');
container.insertAdjacentHTML('afterend', '<h2>Après le container</h2>');

// insertAdjacentText - insertion de texte sécurisée
container.insertAdjacentText('beforeend', '<script>alert("XSS")</script>');
// Le script est inséré comme texte, pas exécuté

// insertAdjacentElement - insertion d'éléments
const nouveauElement = document.createElement('div');
nouveauElement.textContent = 'Nouvel élément';
container.insertAdjacentElement('afterbegin', nouveauElement);
```

### Remplacement de contenu

```javascript
// Remplacer tout le contenu
function remplacerContenu(element, nouveauContenu) {
  // Méthode 1 : innerHTML (attention XSS)
  element.innerHTML = nouveauContenu;
  
  // Méthode 2 : textContent (sécurisé, texte uniquement)
  element.textContent = nouveauContenu;
  
  // Méthode 3 : vider puis ajouter
  element.textContent = '';
  element.appendChild(document.createTextNode(nouveauContenu));
}

// Remplacer sélectivement
function remplacerTexte(element, ancienTexte, nouveauTexte) {
  const contenu = element.textContent;
  element.textContent = contenu.replace(ancienTexte, nouveauTexte);
}

// Remplacer avec regex
function remplacerAvecRegex(element, pattern, remplacement) {
  const contenu = element.textContent;
  element.textContent = contenu.replace(pattern, remplacement);
}

// Exemple d'utilisation
const paragraph = document.querySelector('p');
remplacerTexte(paragraph, 'ancien', 'nouveau');
remplacerAvecRegex(paragraph, /\d{4}/g, '****'); // Masquer les années
```

## Templates et contenu dynamique

### Template HTML5

```html
<!-- Template dans le HTML -->
<template id="carte-template">
  <div class="carte">
    <h3 class="titre"></h3>
    <p class="description"></p>
    <button class="action">Action</button>
  </div>
</template>
```

```javascript
// Utilisation du template
function creerCarte(donnees) {
  const template = document.getElementById('carte-template');
  const clone = template.content.cloneNode(true);
  
  // Remplir le template avec les données
  clone.querySelector('.titre').textContent = donnees.titre;
  clone.querySelector('.description').textContent = donnees.description;
  clone.querySelector('.action').textContent = donnees.bouton;
  
  // Ajouter des événements
  clone.querySelector('.action').addEventListener('click', donnees.callback);
  
  return clone;
}

// Création et insertion de cartes
const donneesCarte = [
  {
    titre: 'Première carte',
    description: 'Description de la première carte',
    bouton: 'Cliquer ici',
    callback: () => alert('Première carte cliquée')
  },
  {
    titre: 'Deuxième carte',
    description: 'Description de la deuxième carte',
    bouton: 'Action',
    callback: () => alert('Deuxième carte cliquée')
  }
];

const container = document.getElementById('cartes-container');
donneesCarte.forEach(donnees => {
  const carte = creerCarte(donnees);
  container.appendChild(carte);
});
```

### Génération de contenu complexe

```javascript
// Générateur de liste
function genererListe(items, options = {}) {
  const {
    type = 'ul',
    className = '',
    itemCallback = null
  } = options;
  
  const liste = document.createElement(type);
  if (className) liste.className = className;
  
  items.forEach((item, index) => {
    const li = document.createElement('li');
    
    if (typeof item === 'string') {
      li.textContent = item;
    } else {
      li.textContent = item.text || item.toString();
      if (item.className) li.className = item.className;
      if (item.id) li.id = item.id;
    }
    
    if (itemCallback) {
      itemCallback(li, item, index);
    }
    
    liste.appendChild(li);
  });
  
  return liste;
}

// Utilisation
const items = [
  { text: 'Premier item', className: 'important' },
  { text: 'Deuxième item', id: 'special' },
  'Troisième item simple'
];

const liste = genererListe(items, {
  className: 'ma-liste',
  itemCallback: (li, item, index) => {
    li.addEventListener('click', () => {
      console.log(`Cliqué sur item ${index}:`, item);
    });
  }
});

document.body.appendChild(liste);

// Générateur de tableau
function genererTableau(donnees, colonnes) {
  const table = document.createElement('table');
  table.className = 'table-generee';
  
  // En-tête
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  
  colonnes.forEach(colonne => {
    const th = document.createElement('th');
    th.textContent = colonne.label;
    if (colonne.className) th.className = colonne.className;
    headerRow.appendChild(th);
  });
  
  thead.appendChild(headerRow);
  table.appendChild(thead);
  
  // Corps
  const tbody = document.createElement('tbody');
  
  donnees.forEach(ligne => {
    const tr = document.createElement('tr');
    
    colonnes.forEach(colonne => {
      const td = document.createElement('td');
      
      if (colonne.render) {
        const contenu = colonne.render(ligne[colonne.key], ligne);
        if (typeof contenu === 'string') {
          td.innerHTML = contenu;
        } else {
          td.appendChild(contenu);
        }
      } else {
        td.textContent = ligne[colonne.key] || '';
      }
      
      if (colonne.className) td.className = colonne.className;
      tr.appendChild(td);
    });
    
    tbody.appendChild(tr);
  });
  
  table.appendChild(tbody);
  return table;
}

// Exemple d'utilisation
const donneesTableau = [
  { nom: 'Alice', age: 25, email: 'alice@example.com', actif: true },
  { nom: 'Bob', age: 30, email: 'bob@example.com', actif: false },
  { nom: 'Charlie', age: 35, email: 'charlie@example.com', actif: true }
];

const colonnes = [
  { key: 'nom', label: 'Nom' },
  { key: 'age', label: 'Âge', className: 'text-center' },
  { 
    key: 'email', 
    label: 'Email',
    render: (email) => `<a href="mailto:${email}">${email}</a>`
  },
  {
    key: 'actif',
    label: 'Statut',
    render: (actif) => {
      const span = document.createElement('span');
      span.textContent = actif ? 'Actif' : 'Inactif';
      span.className = actif ? 'statut-actif' : 'statut-inactif';
      return span;
    }
  }
];

const tableau = genererTableau(donneesTableau, colonnes);
document.getElementById('tableau-container').appendChild(tableau);
```

## Exemple pratique complet

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Manipulation du contenu DOM</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      background: #f5f5f5;
    }
    
    .section {
      background: white;
      padding: 2rem;
      margin-bottom: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .controls {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin-bottom: 1rem;
    }
    
    button {
      background: #007bff;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
    
    button:hover {
      background: #0056b3;
    }
    
    input, textarea, select {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin: 0.25rem;
    }
    
    .carte {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem;
      margin: 1rem 0;
      background: #f8f9fa;
    }
    
    .carte h3 {
      margin-top: 0;
      color: #007bff;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }
    
    th, td {
      padding: 0.5rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    
    th {
      background: #f8f9fa;
      font-weight: 600;
    }
    
    .statut-actif {
      color: #28a745;
      font-weight: bold;
    }
    
    .statut-inactif {
      color: #dc3545;
    }
    
    .text-center {
      text-align: center;
    }
    
    .demo-content {
      border: 2px dashed #ddd;
      padding: 1rem;
      margin: 1rem 0;
      min-height: 50px;
    }
    
    .highlight {
      background-color: yellow;
      padding: 0.2rem;
    }
  </style>
</head>
<body>
  <h1>Manipulation du contenu DOM</h1>
  
  <!-- Section 1: Manipulation basique -->
  <div class="section">
    <h2>1. Manipulation de texte et HTML</h2>
    <div class="controls">
      <input type="text" id="nouveau-texte" placeholder="Nouveau texte" value="Bonjour le monde !">
      <button onclick="changerTextContent()">Changer textContent</button>
      <button onclick="changerInnerHTML()">Changer innerHTML</button>
      <button onclick="ajouterContenu()">Ajouter contenu</button>
      <button onclick="viderContenu()">Vider</button>
    </div>
    <div id="demo-contenu" class="demo-content">
      Contenu original avec <strong>HTML</strong>
    </div>
  </div>
  
  <!-- Section 2: Attributs -->
  <div class="section">
    <h2>2. Manipulation d'attributs</h2>
    <div class="controls">
      <input type="text" id="attr-nom" placeholder="Nom d'attribut" value="data-test">
      <input type="text" id="attr-valeur" placeholder="Valeur" value="nouvelle-valeur">
      <button onclick="definirAttribut()">Définir attribut</button>
      <button onclick="obtenirAttribut()">Obtenir attribut</button>
      <button onclick="supprimerAttribut()">Supprimer attribut</button>
    </div>
    <div id="demo-attributs" class="demo-content" title="Titre original" data-info="Information">
      Élément avec attributs (voir console pour les résultats)
    </div>
  </div>
  
  <!-- Section 3: Templates et listes -->
  <div class="section">
    <h2>3. Génération de contenu avec templates</h2>
    <div class="controls">
      <input type="text" id="item-texte" placeholder="Texte de l'item">
      <select id="item-type">
        <option value="normal">Normal</option>
        <option value="important">Important</option>
        <option value="warning">Avertissement</option>
      </select>
      <button onclick="ajouterItem()">Ajouter item</button>
      <button onclick="viderListe()">Vider liste</button>
    </div>
    <ul id="liste-dynamique"></ul>
  </div>
  
  <!-- Section 4: Formulaire dynamique -->
  <div class="section">
    <h2>4. Formulaire dynamique</h2>
    <div class="controls">
      <button onclick="ajouterChamp('text', 'Texte')">+ Champ texte</button>
      <button onclick="ajouterChamp('email', 'Email')">+ Email</button>
      <button onclick="ajouterChamp('number', 'Nombre')">+ Nombre</button>
      <button onclick="ajouterChamp('textarea', 'Zone de texte')">+ Textarea</button>
      <button onclick="ajouterChamp('select', 'Sélection')">+ Select</button>
      <button onclick="viderFormulaire()">Vider formulaire</button>
      <button onclick="obtenirValeursFormulaire()">Obtenir valeurs</button>
    </div>
    <form id="formulaire-dynamique">
      <!-- Les champs seront ajoutés ici -->
    </form>
    <div id="valeurs-formulaire"></div>
  </div>
  
  <!-- Section 5: Éditeur de contenu -->
  <div class="section">
    <h2>5. Éditeur de contenu simple</h2>
    <div class="controls">
      <button onclick="execCommand('bold')">Gras</button>
      <button onclick="execCommand('italic')">Italique</button>
      <button onclick="execCommand('underline')">Souligné</button>
      <button onclick="execCommand('createLink', prompt('URL:'))">Lien</button>
      <button onclick="execCommand('insertHTML', prompt('HTML:'))">Insérer HTML</button>
      <button onclick="obtenirContenuEditeur()">Obtenir contenu</button>
    </div>
    <div id="editeur" contenteditable="true" class="demo-content" style="min-height: 100px;">
      Tapez votre texte ici et utilisez les boutons pour le formater...
    </div>
    <div id="contenu-editeur"></div>
  </div>

  <!-- Template pour les cartes -->
  <template id="carte-template">
    <div class="carte">
      <h3 class="carte-titre"></h3>
      <p class="carte-description"></p>
      <div class="carte-meta">
        <span class="carte-type"></span>
        <span class="carte-date"></span>
      </div>
      <button class="carte-action">Action</button>
    </div>
  </template>

  <script>
    // 1. Manipulation basique
    function changerTextContent() {
      const element = document.getElementById('demo-contenu');
      const nouveauTexte = document.getElementById('nouveau-texte').value;
      element.textContent = nouveauTexte;
    }
    
    function changerInnerHTML() {
      const element = document.getElementById('demo-contenu');
      const nouveauTexte = document.getElementById('nouveau-texte').value;
      element.innerHTML = `<strong>${nouveauTexte}</strong> <em>(modifié avec innerHTML)</em>`;
    }
    
    function ajouterContenu() {
      const element = document.getElementById('demo-contenu');
      const nouveauTexte = document.getElementById('nouveau-texte').value;
      element.insertAdjacentHTML('beforeend', ` <span class="highlight">${nouveauTexte}</span>`);
    }
    
    function viderContenu() {
      document.getElementById('demo-contenu').textContent = '';
    }
    
    // 2. Manipulation d'attributs
    function definirAttribut() {
      const element = document.getElementById('demo-attributs');
      const nom = document.getElementById('attr-nom').value;
      const valeur = document.getElementById('attr-valeur').value;
      
      if (nom) {
        element.setAttribute(nom, valeur);
        console.log(`Attribut défini: ${nom}="${valeur}"`);
      }
    }
    
    function obtenirAttribut() {
      const element = document.getElementById('demo-attributs');
      const nom = document.getElementById('attr-nom').value;
      
      if (nom) {
        const valeur = element.getAttribute(nom);
        console.log(`Valeur de ${nom}:`, valeur);
        alert(`${nom} = "${valeur}"`);
      }
    }
    
    function supprimerAttribut() {
      const element = document.getElementById('demo-attributs');
      const nom = document.getElementById('attr-nom').value;
      
      if (nom) {
        element.removeAttribute(nom);
        console.log(`Attribut supprimé: ${nom}`);
      }
    }
    
    // 3. Génération de listes
    function ajouterItem() {
      const texte = document.getElementById('item-texte').value;
      const type = document.getElementById('item-type').value;
      
      if (!texte) return;
      
      const liste = document.getElementById('liste-dynamique');
      const li = document.createElement('li');
      
      li.textContent = texte;
      li.className = type;
      li.style.color = type === 'important' ? '#dc3545' : 
                       type === 'warning' ? '#ffc107' : '#333';
      
      // Ajouter un bouton de suppression
      const boutonSuppr = document.createElement('button');
      boutonSuppr.textContent = 'Supprimer';
      boutonSuppr.style.marginLeft = '1rem';
      boutonSuppr.style.fontSize = '0.8rem';
      boutonSuppr.onclick = () => li.remove();
      
      li.appendChild(boutonSuppr);
      liste.appendChild(li);
      
      // Vider le champ
      document.getElementById('item-texte').value = '';
    }
    
    function viderListe() {
      document.getElementById('liste-dynamique').innerHTML = '';
    }
    
    // 4. Formulaire dynamique
    let compteurChamps = 0;
    
    function ajouterChamp(type, label) {
      const formulaire = document.getElementById('formulaire-dynamique');
      const div = document.createElement('div');
      div.style.marginBottom = '1rem';
      
      const labelElement = document.createElement('label');
      labelElement.textContent = `${label} ${++compteurChamps}:`;
      labelElement.style.display = 'block';
      labelElement.style.marginBottom = '0.25rem';
      
      let inputElement;
      
      if (type === 'textarea') {
        inputElement = document.createElement('textarea');
        inputElement.rows = 3;
      } else if (type === 'select') {
        inputElement = document.createElement('select');
        ['Option 1', 'Option 2', 'Option 3'].forEach((optionText, index) => {
          const option = document.createElement('option');
          option.value = `option${index + 1}`;
          option.textContent = optionText;
          inputElement.appendChild(option);
        });
      } else {
        inputElement = document.createElement('input');
        inputElement.type = type;
      }
      
      inputElement.name = `champ_${compteurChamps}`;
      inputElement.style.width = '100%';
      inputElement.style.padding = '0.5rem';
      
      // Bouton de suppression
      const boutonSuppr = document.createElement('button');
      boutonSuppr.type = 'button';
      boutonSuppr.textContent = 'Supprimer';
      boutonSuppr.style.marginTop = '0.25rem';
      boutonSuppr.onclick = () => div.remove();
      
      div.appendChild(labelElement);
      div.appendChild(inputElement);
      div.appendChild(boutonSuppr);
      formulaire.appendChild(div);
    }
    
    function viderFormulaire() {
      document.getElementById('formulaire-dynamique').innerHTML = '';
      compteurChamps = 0;
    }
    
    function obtenirValeursFormulaire() {
      const formulaire = document.getElementById('formulaire-dynamique');
      const formData = new FormData(formulaire);
      const valeurs = {};
      
      for (let [nom, valeur] of formData.entries()) {
        valeurs[nom] = valeur;
      }
      
      const resultDiv = document.getElementById('valeurs-formulaire');
      resultDiv.innerHTML = `<h4>Valeurs du formulaire:</h4><pre>${JSON.stringify(valeurs, null, 2)}</pre>`;
    }
    
    // 5. Éditeur de contenu
    function execCommand(command, value = null) {
      document.execCommand(command, false, value);
      document.getElementById('editeur').focus();
    }
    
    function obtenirContenuEditeur() {
      const editeur = document.getElementById('editeur');
      const html = editeur.innerHTML;
      const texte = editeur.textContent;
      
      const resultDiv = document.getElementById('contenu-editeur');
      resultDiv.innerHTML = `
        <h4>Contenu de l'éditeur:</h4>
        <p><strong>HTML:</strong></p>
        <pre style="background: #f8f9fa; padding: 1rem; border-radius: 4px; overflow-x: auto;">${html.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
        <p><strong>Texte brut:</strong></p>
        <pre style="background: #f8f9fa; padding: 1rem; border-radius: 4px;">${texte}</pre>
      `;
    }
    
    // Fonctions utilitaires pour démonstration
    function highlightSyntax(code) {
      return code
        .replace(/(&lt;\/?[^&gt;]+&gt;)/g, '<span style="color: #007bff;">$1</span>')
        .replace(/(".*?")/g, '<span style="color: #28a745;">$1</span>');
    }
    
    // Initialisation
    document.addEventListener('DOMContentLoaded', function() {
      console.log('Page chargée - manipulation du contenu prête');
      
      // Ajouter quelques items par défaut
      document.getElementById('item-texte').value = 'Premier item';
      ajouterItem();
      document.getElementById('item-texte').value = 'Item important';
      document.getElementById('item-type').value = 'important';
      ajouterItem();
    });
  </script>
</body>
</html>
```

## Sécurité et bonnes pratiques

1. **Utilisez textContent** pour du texte simple
2. **Validez et échappez** le contenu HTML
3. **Évitez innerHTML** avec des données utilisateur
4. **Utilisez des templates** pour du contenu complexe
5. **Testez la performance** avec beaucoup d'éléments

## Résumé

La manipulation du contenu DOM permet de créer des interfaces dynamiques. Les principales techniques incluent la modification de textContent/innerHTML, la gestion des attributs, l'utilisation de templates et la génération de contenu complexe. La sécurité doit toujours être prise en compte lors de la manipulation de contenu.
