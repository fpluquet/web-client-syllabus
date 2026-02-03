# 6.4 Algorithmes de base

## Introduction

Les algorithmes sont des séquences d'instructions permettant de résoudre des problèmes spécifiques. En programmation web, maîtriser les algorithmes de base permet d'écrire du code plus efficace et de résoudre des problèmes complexes de manière structurée.

## Algorithmes de recherche

### Recherche linéaire

```javascript
// Recherche simple dans un tableau
function rechercheLineaire(tableau, valeur) {
  for (let i = 0; i < tableau.length; i++) {
    if (tableau[i] === valeur) {
      return i; // Retourne l'index si trouvé
    }
  }
  return -1; // Retourne -1 si non trouvé
}

// Exemples d'utilisation
const nombres = [12, 45, 23, 67, 89, 34, 56];
console.log(rechercheLineaire(nombres, 67)); // 3
console.log(rechercheLineaire(nombres, 99)); // -1

// Recherche avec critère personnalisé
function rechercherObjet(tableau, propriete, valeur) {
  for (let i = 0; i < tableau.length; i++) {
    if (tableau[i][propriete] === valeur) {
      return tableau[i];
    }
  }
  return null;
}

const utilisateurs = [
  { id: 1, nom: "Alice", age: 25 },
  { id: 2, nom: "Bob", age: 30 },
  { id: 3, nom: "Charlie", age: 35 }
];

console.log(rechercherObjet(utilisateurs, "nom", "Bob"));
// { id: 2, nom: "Bob", age: 30 }
```

### Recherche binaire

```javascript
// Recherche binaire (tableau trié requis)
function rechercheBinaire(tableau, valeur) {
  let debut = 0;
  let fin = tableau.length - 1;
  
  while (debut <= fin) {
    let milieu = Math.floor((debut + fin) / 2);
    
    if (tableau[milieu] === valeur) {
      return milieu;
    } else if (tableau[milieu] < valeur) {
      debut = milieu + 1;
    } else {
      fin = milieu - 1;
    }
  }
  
  return -1;
}

// Exemple avec tableau trié
const nombresTries = [12, 23, 34, 45, 56, 67, 89];
console.log(rechercheBinaire(nombresTries, 45)); // 3
console.log(rechercheBinaire(nombresTries, 99)); // -1

// Version récursive
function rechercheBinaireRecursive(tableau, valeur, debut = 0, fin = tableau.length - 1) {
  if (debut > fin) {
    return -1;
  }
  
  const milieu = Math.floor((debut + fin) / 2);
  
  if (tableau[milieu] === valeur) {
    return milieu;
  } else if (tableau[milieu] < valeur) {
    return rechercheBinaireRecursive(tableau, valeur, milieu + 1, fin);
  } else {
    return rechercheBinaireRecursive(tableau, valeur, debut, milieu - 1);
  }
}
```

## Algorithmes de tri

### Tri à bulles

```javascript
// Tri à bulles (Bubble Sort)
function triBulles(tableau) {
  const arr = [...tableau]; // Copie pour ne pas modifier l'original
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let echange = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Échange des éléments
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        echange = true;
      }
    }
    
    // Si aucun échange, le tableau est trié
    if (!echange) break;
  }
  
  return arr;
}

const nombresNonTries = [64, 34, 25, 12, 22, 11, 90];
console.log(triBulles(nombresNonTries));
// [11, 12, 22, 25, 34, 64, 90]

// Tri à bulles avec visualisation
function triaBullesAvecEtapes(tableau) {
  const arr = [...tableau];
  const etapes = [];
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        etapes.push([...arr]); // Sauvegarder chaque étape
      }
    }
  }
  
  return { resultat: arr, etapes };
}
```

### Tri par sélection

```javascript
// Tri par sélection
function triSelection(tableau) {
  const arr = [...tableau];
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let indexMin = i;
    
    // Trouver l'élément minimum dans la partie non triée
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[indexMin]) {
        indexMin = j;
      }
    }
    
    // Échanger si nécessaire
    if (indexMin !== i) {
      [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
    }
  }
  
  return arr;
}

console.log(triSelection([64, 25, 12, 22, 11]));
// [11, 12, 22, 25, 64]
```

### Tri rapide (Quick Sort)

```javascript
// Tri rapide
function triRapide(tableau) {
  if (tableau.length <= 1) {
    return tableau;
  }
  
  const pivot = tableau[Math.floor(tableau.length / 2)];
  const gauche = [];
  const droite = [];
  const egaux = [];
  
  for (const element of tableau) {
    if (element < pivot) {
      gauche.push(element);
    } else if (element > pivot) {
      droite.push(element);
    } else {
      egaux.push(element);
    }
  }
  
  return [...triRapide(gauche), ...egaux, ...triRapide(droite)];
}

console.log(triRapide([64, 25, 12, 22, 11]));
// [11, 12, 22, 25, 64]

// Version optimisée avec tri en place
function triRapideEnPlace(arr, debut = 0, fin = arr.length - 1) {
  if (debut < fin) {
    const indexPivot = partitionner(arr, debut, fin);
    triRapideEnPlace(arr, debut, indexPivot - 1);
    triRapideEnPlace(arr, indexPivot + 1, fin);
  }
  return arr;
}

function partitionner(arr, debut, fin) {
  const pivot = arr[fin];
  let i = debut - 1;
  
  for (let j = debut; j < fin; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[fin]] = [arr[fin], arr[i + 1]];
  return i + 1;
}
```

## Algorithmes de parcours

### Parcours de tableaux multidimensionnels

```javascript
// Parcours de matrice
function parcourirMatrice(matrice) {
  const resultats = [];
  
  for (let i = 0; i < matrice.length; i++) {
    for (let j = 0; j < matrice[i].length; j++) {
      resultats.push({
        valeur: matrice[i][j],
        position: [i, j]
      });
    }
  }
  
  return resultats;
}

const matrice = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log(parcourirMatrice(matrice));

// Recherche dans une matrice
function rechercherDansMatrice(matrice, valeur) {
  for (let i = 0; i < matrice.length; i++) {
    for (let j = 0; j < matrice[i].length; j++) {
      if (matrice[i][j] === valeur) {
        return { ligne: i, colonne: j };
      }
    }
  }
  return null;
}

console.log(rechercherDansMatrice(matrice, 5)); // { ligne: 1, colonne: 1 }
```

### Parcours d'objets complexes

```javascript
// Parcours récursif d'objets
function parcourirObjetRecursif(objet, chemin = '') {
  const resultats = [];
  
  for (const [cle, valeur] of Object.entries(objet)) {
    const cheminComplet = chemin ? `${chemin}.${cle}` : cle;
    
    if (typeof valeur === 'object' && valeur !== null && !Array.isArray(valeur)) {
      resultats.push(...parcourirObjetRecursif(valeur, cheminComplet));
    } else {
      resultats.push({
        chemin: cheminComplet,
        valeur: valeur
      });
    }
  }
  
  return resultats;
}

const objetComplexe = {
  nom: "Alice",
  adresse: {
    rue: "123 rue de la Paix",
    ville: "Paris",
    coordonnees: {
      lat: 48.8566,
      lng: 2.3522
    }
  },
  hobbies: ["lecture", "voyage"]
};

console.log(parcourirObjetRecursif(objetComplexe));
```

## Algorithmes de manipulation de chaînes

### Validation et nettoyage

```javascript
// Validation d'email
function validerEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Nettoyage de chaîne
function nettoyerChaine(chaine) {
  return chaine
    .trim()                           // Supprimer espaces début/fin
    .replace(/\s+/g, ' ')            // Remplacer multiples espaces par un
    .toLowerCase();                   // Convertir en minuscules
}

// Capitalisation
function capitaliser(chaine) {
  return chaine
    .split(' ')
    .map(mot => mot.charAt(0).toUpperCase() + mot.slice(1).toLowerCase())
    .join(' ');
}

console.log(capitaliser("alice DUPONT")); // "Alice Dupont"

// Slugification pour URLs
function creerSlug(texte) {
  return texte
    .toLowerCase()
    .normalize('NFD')                 // Décomposer les accents
    .replace(/[\u0300-\u036f]/g, '')  // Supprimer les accents
    .replace(/[^a-z0-9\s-]/g, '')     // Garder que lettres, chiffres, espaces, tirets
    .trim()
    .replace(/\s+/g, '-');            // Remplacer espaces par tirets
}

console.log(creerSlug("Article très intéressant!")); // "article-tres-interessant"
```

### Algorithmes de comparaison

```javascript
// Distance de Levenshtein (similarité entre chaînes)
function distanceLevenshtein(chaine1, chaine2) {
  const matrice = [];
  const n = chaine1.length;
  const m = chaine2.length;
  
  // Initialisation
  for (let i = 0; i <= n; i++) {
    matrice[i] = [i];
  }
  for (let j = 0; j <= m; j++) {
    matrice[0][j] = j;
  }
  
  // Calcul
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (chaine1[i - 1] === chaine2[j - 1]) {
        matrice[i][j] = matrice[i - 1][j - 1];
      } else {
        matrice[i][j] = Math.min(
          matrice[i - 1][j] + 1,      // Suppression
          matrice[i][j - 1] + 1,      // Insertion
          matrice[i - 1][j - 1] + 1   // Substitution
        );
      }
    }
  }
  
  return matrice[n][m];
}

console.log(distanceLevenshtein("chat", "chien")); // 3

// Recherche de motif
function rechercherMotif(texte, motif) {
  const positions = [];
  let index = 0;
  
  while ((index = texte.indexOf(motif, index)) !== -1) {
    positions.push(index);
    index += motif.length;
  }
  
  return positions;
}

console.log(rechercherMotif("Le chat mange, le chat dort", "chat"));
// [3, 18]
```

## Algorithmes statistiques

### Calculs de base

```javascript
// Statistiques descriptives
function calculerStatistiques(donnees) {
  if (donnees.length === 0) return null;
  
  const tries = [...donnees].sort((a, b) => a - b);
  const somme = donnees.reduce((acc, val) => acc + val, 0);
  const moyenne = somme / donnees.length;
  
  // Médiane
  const milieu = Math.floor(tries.length / 2);
  const mediane = tries.length % 2 === 0
    ? (tries[milieu - 1] + tries[milieu]) / 2
    : tries[milieu];
  
  // Mode (valeur la plus fréquente)
  const frequences = {};
  donnees.forEach(val => {
    frequences[val] = (frequences[val] || 0) + 1;
  });
  
  const maxFrequence = Math.max(...Object.values(frequences));
  const modes = Object.keys(frequences)
    .filter(val => frequences[val] === maxFrequence)
    .map(Number);
  
  // Écart-type
  const variance = donnees.reduce((acc, val) => 
    acc + Math.pow(val - moyenne, 2), 0) / donnees.length;
  const ecartType = Math.sqrt(variance);
  
  return {
    moyenne: parseFloat(moyenne.toFixed(2)),
    mediane,
    modes,
    min: Math.min(...donnees),
    max: Math.max(...donnees),
    ecartType: parseFloat(ecartType.toFixed(2)),
    effectif: donnees.length
  };
}

const notes = [12, 15, 18, 12, 16, 14, 19, 12, 17, 13];
console.log(calculerStatistiques(notes));
```

### Algorithmes de filtrage

```javascript
// Filtre par plage de valeurs
function filtrerParPlage(donnees, min, max) {
  return donnees.filter(valeur => valeur >= min && valeur <= max);
}

// Filtre par percentile
function filtrerParPercentile(donnees, percentile) {
  const tries = [...donnees].sort((a, b) => a - b);
  const index = Math.ceil(tries.length * percentile / 100) - 1;
  const seuil = tries[index];
  return donnees.filter(valeur => valeur <= seuil);
}

// Détection d'outliers (valeurs aberrantes)
function detecterOutliers(donnees) {
  const tries = [...donnees].sort((a, b) => a - b);
  const q1Index = Math.floor(tries.length * 0.25);
  const q3Index = Math.floor(tries.length * 0.75);
  
  const q1 = tries[q1Index];
  const q3 = tries[q3Index];
  const iqr = q3 - q1;
  
  const seuilBas = q1 - 1.5 * iqr;
  const seuilHaut = q3 + 1.5 * iqr;
  
  return {
    outliers: donnees.filter(val => val < seuilBas || val > seuilHaut),
    donneesNettoyees: donnees.filter(val => val >= seuilBas && val <= seuilHaut)
  };
}

const donneesAvecOutliers = [1, 2, 3, 4, 5, 100, 2, 3, 4, 5];
console.log(detecterOutliers(donneesAvecOutliers));
```

## Algorithmes d'optimisation

### Recherche du maximum/minimum

```javascript
// Recherche du maximum avec position
function trouverMaximum(tableau) {
  if (tableau.length === 0) return null;
  
  let max = tableau[0];
  let index = 0;
  
  for (let i = 1; i < tableau.length; i++) {
    if (tableau[i] > max) {
      max = tableau[i];
      index = i;
    }
  }
  
  return { valeur: max, index };
}

// Recherche de sous-tableau avec somme maximum (Kadane's algorithm)
function sousTableauSommeMax(tableau) {
  let maxActuel = tableau[0];
  let maxGlobal = tableau[0];
  let debut = 0;
  let fin = 0;
  let debutTemp = 0;
  
  for (let i = 1; i < tableau.length; i++) {
    if (maxActuel < 0) {
      maxActuel = tableau[i];
      debutTemp = i;
    } else {
      maxActuel += tableau[i];
    }
    
    if (maxActuel > maxGlobal) {
      maxGlobal = maxActuel;
      debut = debutTemp;
      fin = i;
    }
  }
  
  return {
    somme: maxGlobal,
    sousTableau: tableau.slice(debut, fin + 1),
    debut,
    fin
  };
}

const tableauAvecNegatifs = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(sousTableauSommeMax(tableauAvecNegatifs));
// { somme: 6, sousTableau: [4, -1, 2, 1], debut: 3, fin: 6 }
```

## Exemple pratique complet

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Algorithmes de Base</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      background: #f5f5f5;
    }
    
    .container {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
    }
    
    .controls {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin-bottom: 2rem;
    }
    
    input, button, select {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    button {
      background: #007bff;
      color: white;
      border: none;
      cursor: pointer;
    }
    
    button:hover {
      background: #0056b3;
    }
    
    .result {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;
      border-left: 4px solid #007bff;
    }
    
    .array-display {
      display: flex;
      gap: 0.5rem;
      margin: 1rem 0;
      flex-wrap: wrap;
    }
    
    .array-item {
      background: #e9ecef;
      padding: 0.5rem;
      border-radius: 4px;
      min-width: 40px;
      text-align: center;
      transition: all 0.3s ease;
    }
    
    .array-item.highlight {
      background: #ffc107;
      transform: scale(1.1);
    }
    
    .array-item.found {
      background: #28a745;
      color: white;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
    
    .stat-item {
      background: #e9ecef;
      padding: 1rem;
      border-radius: 4px;
      text-align: center;
    }
    
    .stat-value {
      font-size: 1.5rem;
      font-weight: bold;
      color: #007bff;
    }
    
    .sorting-steps {
      max-height: 300px;
      overflow-y: auto;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 1rem;
    }
    
    .step {
      margin-bottom: 0.5rem;
      padding: 0.5rem;
      background: #f8f9fa;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <h1>Algorithmes de Base en JavaScript</h1>
  
  <!-- Section Recherche -->
  <div class="container">
    <h2>1. Algorithmes de Recherche</h2>
    <div class="controls">
      <input type="text" id="search-array" placeholder="Nombres séparés par des virgules" value="12,45,23,67,89,34,56">
      <input type="number" id="search-value" placeholder="Valeur à rechercher" value="67">
      <button onclick="rechercheLineaireDemo()">Recherche Linéaire</button>
      <button onclick="rechercheBinaireDemo()">Recherche Binaire</button>
    </div>
    <div id="search-array-display" class="array-display"></div>
    <div id="search-result" class="result"></div>
  </div>
  
  <!-- Section Tri -->
  <div class="container">
    <h2>2. Algorithmes de Tri</h2>
    <div class="controls">
      <input type="text" id="sort-array" placeholder="Nombres à trier" value="64,34,25,12,22,11,90">
      <select id="sort-algorithm">
        <option value="bubble">Tri à bulles</option>
        <option value="selection">Tri par sélection</option>
        <option value="quick">Tri rapide</option>
      </select>
      <button onclick="trierDemo()">Trier</button>
      <button onclick="genererTableauAleatoire()">Générer aléatoire</button>
    </div>
    <div id="sort-array-display" class="array-display"></div>
    <div id="sort-result" class="result"></div>
    <div id="sorting-steps" class="sorting-steps" style="display: none;"></div>
  </div>
  
  <!-- Section Statistiques -->
  <div class="container">
    <h2>3. Calculs Statistiques</h2>
    <div class="controls">
      <input type="text" id="stats-array" placeholder="Données numériques" value="12,15,18,12,16,14,19,12,17,13">
      <button onclick="calculerStatistiquesDemo()">Calculer Statistiques</button>
      <button onclick="detecterOutliersDemo()">Détecter Outliers</button>
    </div>
    <div id="stats-array-display" class="array-display"></div>
    <div id="stats-result" class="stats-grid"></div>
  </div>
  
  <!-- Section Chaînes -->
  <div class="container">
    <h2>4. Manipulation de Chaînes</h2>
    <div class="controls">
      <input type="text" id="string-input" placeholder="Texte à traiter" value="  Alice DUPONT  ">
      <button onclick="nettoyerChaineDemo()">Nettoyer</button>
      <button onclick="capitaliserDemo()">Capitaliser</button>
      <button onclick="creerSlugDemo()">Créer Slug</button>
    </div>
    <div class="controls">
      <input type="text" id="string1" placeholder="Première chaîne" value="chat">
      <input type="text" id="string2" placeholder="Deuxième chaîne" value="chien">
      <button onclick="distanceLevenshteinDemo()">Distance Levenshtein</button>
    </div>
    <div id="string-result" class="result"></div>
  </div>

  <script>
    // Utilitaires d'affichage
    function afficherTableau(tableau, containerId, highlightIndex = -1, foundIndex = -1) {
      const container = document.getElementById(containerId);
      container.innerHTML = '';
      
      tableau.forEach((valeur, index) => {
        const item = document.createElement('div');
        item.className = 'array-item';
        item.textContent = valeur;
        
        if (index === highlightIndex) {
          item.classList.add('highlight');
        }
        if (index === foundIndex) {
          item.classList.add('found');
        }
        
        container.appendChild(item);
      });
    }
    
    // Algorithmes de recherche
    function rechercheLineaireDemo() {
      const input = document.getElementById('search-array').value;
      const tableau = input.split(',').map(x => parseInt(x.trim()));
      const valeur = parseInt(document.getElementById('search-value').value);
      
      afficherTableau(tableau, 'search-array-display');
      
      let index = -1;
      let comparaisons = 0;
      
      for (let i = 0; i < tableau.length; i++) {
        comparaisons++;
        if (tableau[i] === valeur) {
          index = i;
          break;
        }
      }
      
      setTimeout(() => {
        afficherTableau(tableau, 'search-array-display', -1, index);
        document.getElementById('search-result').innerHTML = 
          index !== -1 
            ? `✅ Trouvé à l'index ${index} après ${comparaisons} comparaisons`
            : `❌ Non trouvé après ${comparaisons} comparaisons`;
      }, 500);
    }
    
    function rechercheBinaireDemo() {
      const input = document.getElementById('search-array').value;
      let tableau = input.split(',').map(x => parseInt(x.trim()));
      const valeur = parseInt(document.getElementById('search-value').value);
      
      // Trier d'abord pour la recherche binaire
      tableau.sort((a, b) => a - b);
      afficherTableau(tableau, 'search-array-display');
      
      let debut = 0;
      let fin = tableau.length - 1;
      let index = -1;
      let comparaisons = 0;
      
      while (debut <= fin) {
        comparaisons++;
        const milieu = Math.floor((debut + fin) / 2);
        
        if (tableau[milieu] === valeur) {
          index = milieu;
          break;
        } else if (tableau[milieu] < valeur) {
          debut = milieu + 1;
        } else {
          fin = milieu - 1;
        }
      }
      
      setTimeout(() => {
        afficherTableau(tableau, 'search-array-display', -1, index);
        document.getElementById('search-result').innerHTML = 
          index !== -1 
            ? `✅ Trouvé à l'index ${index} après ${comparaisons} comparaisons (tableau trié d'abord)`
            : `❌ Non trouvé après ${comparaisons} comparaisons`;
      }, 500);
    }
    
    // Algorithmes de tri
    function triBullesAvecEtapes(tableau) {
      const arr = [...tableau];
      const etapes = [{ tableau: [...arr], description: "État initial" }];
      const n = arr.length;
      
      for (let i = 0; i < n - 1; i++) {
        let echange = false;
        for (let j = 0; j < n - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            echange = true;
            etapes.push({
              tableau: [...arr],
              description: `Échange ${arr[j + 1]} et ${arr[j]} (positions ${j} et ${j + 1})`
            });
          }
        }
        if (!echange) break;
      }
      
      return { resultat: arr, etapes };
    }
    
    function triSelectionAvecEtapes(tableau) {
      const arr = [...tableau];
      const etapes = [{ tableau: [...arr], description: "État initial" }];
      const n = arr.length;
      
      for (let i = 0; i < n - 1; i++) {
        let indexMin = i;
        
        for (let j = i + 1; j < n; j++) {
          if (arr[j] < arr[indexMin]) {
            indexMin = j;
          }
        }
        
        if (indexMin !== i) {
          [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
          etapes.push({
            tableau: [...arr],
            description: `Place ${arr[i]} à la position ${i}`
          });
        }
      }
      
      return { resultat: arr, etapes };
    }
    
    function trierDemo() {
      const input = document.getElementById('sort-array').value;
      const tableau = input.split(',').map(x => parseInt(x.trim()));
      const algorithm = document.getElementById('sort-algorithm').value;
      
      afficherTableau(tableau, 'sort-array-display');
      
      let resultat;
      
      switch (algorithm) {
        case 'bubble':
          resultat = triBullesAvecEtapes(tableau);
          break;
        case 'selection':
          resultat = triSelectionAvecEtapes(tableau);
          break;
        case 'quick':
          resultat = {
            resultat: triRapide(tableau),
            etapes: [{ tableau: triRapide(tableau), description: "Tri rapide (récursif)" }]
          };
          break;
      }
      
      // Afficher les étapes
      const stepsContainer = document.getElementById('sorting-steps');
      stepsContainer.style.display = 'block';
      stepsContainer.innerHTML = '<h4>Étapes du tri :</h4>';
      
      resultat.etapes.forEach((etape, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step';
        stepDiv.innerHTML = `<strong>Étape ${index}:</strong> ${etape.description}<br>[${etape.tableau.join(', ')}]`;
        stepsContainer.appendChild(stepDiv);
      });
      
      setTimeout(() => {
        afficherTableau(resultat.resultat, 'sort-array-display');
        document.getElementById('sort-result').innerHTML = 
          `✅ Tableau trié avec ${algorithm} en ${resultat.etapes.length} étapes`;
      }, 1000);
    }
    
    function triRapide(tableau) {
      if (tableau.length <= 1) return tableau;
      
      const pivot = tableau[Math.floor(tableau.length / 2)];
      const gauche = tableau.filter(x => x < pivot);
      const droite = tableau.filter(x => x > pivot);
      const egaux = tableau.filter(x => x === pivot);
      
      return [...triRapide(gauche), ...egaux, ...triRapide(droite)];
    }
    
    function genererTableauAleatoire() {
      const taille = 10;
      const tableau = Array.from({ length: taille }, () => Math.floor(Math.random() * 100));
      document.getElementById('sort-array').value = tableau.join(',');
      afficherTableau(tableau, 'sort-array-display');
    }
    
    // Statistiques
    function calculerStatistiquesDemo() {
      const input = document.getElementById('stats-array').value;
      const donnees = input.split(',').map(x => parseFloat(x.trim()));
      
      afficherTableau(donnees, 'stats-array-display');
      
      const stats = calculerStatistiques(donnees);
      
      const container = document.getElementById('stats-result');
      container.innerHTML = `
        <div class="stat-item">
          <div class="stat-value">${stats.moyenne}</div>
          <div>Moyenne</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${stats.mediane}</div>
          <div>Médiane</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${stats.modes.join(', ')}</div>
          <div>Mode(s)</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${stats.min}</div>
          <div>Minimum</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${stats.max}</div>
          <div>Maximum</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${stats.ecartType}</div>
          <div>Écart-type</div>
        </div>
      `;
    }
    
    function calculerStatistiques(donnees) {
      if (donnees.length === 0) return null;
      
      const tries = [...donnees].sort((a, b) => a - b);
      const somme = donnees.reduce((acc, val) => acc + val, 0);
      const moyenne = somme / donnees.length;
      
      const milieu = Math.floor(tries.length / 2);
      const mediane = tries.length % 2 === 0
        ? (tries[milieu - 1] + tries[milieu]) / 2
        : tries[milieu];
      
      const frequences = {};
      donnees.forEach(val => {
        frequences[val] = (frequences[val] || 0) + 1;
      });
      
      const maxFrequence = Math.max(...Object.values(frequences));
      const modes = Object.keys(frequences)
        .filter(val => frequences[val] === maxFrequence)
        .map(Number);
      
      const variance = donnees.reduce((acc, val) => 
        acc + Math.pow(val - moyenne, 2), 0) / donnees.length;
      const ecartType = Math.sqrt(variance);
      
      return {
        moyenne: parseFloat(moyenne.toFixed(2)),
        mediane,
        modes,
        min: Math.min(...donnees),
        max: Math.max(...donnees),
        ecartType: parseFloat(ecartType.toFixed(2))
      };
    }
    
    function detecterOutliersDemo() {
      const input = document.getElementById('stats-array').value;
      const donnees = input.split(',').map(x => parseFloat(x.trim()));
      
      const tries = [...donnees].sort((a, b) => a - b);
      const q1Index = Math.floor(tries.length * 0.25);
      const q3Index = Math.floor(tries.length * 0.75);
      
      const q1 = tries[q1Index];
      const q3 = tries[q3Index];
      const iqr = q3 - q1;
      
      const seuilBas = q1 - 1.5 * iqr;
      const seuilHaut = q3 + 1.5 * iqr;
      
      const outliers = donnees.filter(val => val < seuilBas || val > seuilHaut);
      const donneesNettoyees = donnees.filter(val => val >= seuilBas && val <= seuilHaut);
      
      document.getElementById('stats-result').innerHTML = `
        <div class="result">
          <strong>Outliers détectés :</strong> [${outliers.join(', ')}]<br>
          <strong>Données nettoyées :</strong> [${donneesNettoyees.join(', ')}]<br>
          <strong>Q1 :</strong> ${q1}, <strong>Q3 :</strong> ${q3}, <strong>IQR :</strong> ${iqr}
        </div>
      `;
    }
    
    // Manipulation de chaînes
    function nettoyerChaineDemo() {
      const input = document.getElementById('string-input').value;
      const resultat = input.trim().replace(/\s+/g, ' ').toLowerCase();
      
      document.getElementById('string-result').innerHTML = `
        <strong>Original :</strong> "${input}"<br>
        <strong>Nettoyé :</strong> "${resultat}"
      `;
    }
    
    function capitaliserDemo() {
      const input = document.getElementById('string-input').value;
      const resultat = input
        .split(' ')
        .map(mot => mot.charAt(0).toUpperCase() + mot.slice(1).toLowerCase())
        .join(' ');
      
      document.getElementById('string-result').innerHTML = `
        <strong>Original :</strong> "${input}"<br>
        <strong>Capitalisé :</strong> "${resultat}"
      `;
    }
    
    function creerSlugDemo() {
      const input = document.getElementById('string-input').value;
      const resultat = input
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      
      document.getElementById('string-result').innerHTML = `
        <strong>Original :</strong> "${input}"<br>
        <strong>Slug :</strong> "${resultat}"
      `;
    }
    
    function distanceLevenshteinDemo() {
      const chaine1 = document.getElementById('string1').value;
      const chaine2 = document.getElementById('string2').value;
      
      const distance = distanceLevenshtein(chaine1, chaine2);
      const maxLength = Math.max(chaine1.length, chaine2.length);
      const similarite = maxLength === 0 ? 100 : ((maxLength - distance) / maxLength * 100).toFixed(1);
      
      document.getElementById('string-result').innerHTML = `
        <strong>Chaîne 1 :</strong> "${chaine1}"<br>
        <strong>Chaîne 2 :</strong> "${chaine2}"<br>
        <strong>Distance de Levenshtein :</strong> ${distance}<br>
        <strong>Similarité :</strong> ${similarite}%
      `;
    }
    
    function distanceLevenshtein(chaine1, chaine2) {
      const matrice = [];
      const n = chaine1.length;
      const m = chaine2.length;
      
      for (let i = 0; i <= n; i++) {
        matrice[i] = [i];
      }
      for (let j = 0; j <= m; j++) {
        matrice[0][j] = j;
      }
      
      for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
          if (chaine1[i - 1] === chaine2[j - 1]) {
            matrice[i][j] = matrice[i - 1][j - 1];
          } else {
            matrice[i][j] = Math.min(
              matrice[i - 1][j] + 1,
              matrice[i][j - 1] + 1,
              matrice[i - 1][j - 1] + 1
            );
          }
        }
      }
      
      return matrice[n][m];
    }
    
    // Initialisation
    document.addEventListener('DOMContentLoaded', () => {
      // Afficher les tableaux initiaux
      const searchArray = [12, 45, 23, 67, 89, 34, 56];
      const sortArray = [64, 34, 25, 12, 22, 11, 90];
      const statsArray = [12, 15, 18, 12, 16, 14, 19, 12, 17, 13];
      
      afficherTableau(searchArray, 'search-array-display');
      afficherTableau(sortArray, 'sort-array-display');
      afficherTableau(statsArray, 'stats-array-display');
    });
  </script>
</body>
</html>
```


## Complexité algorithmique

| Algorithme | Complexité temporelle | Complexité spatiale | Usage |
|------------|----------------------|-------------------|--------|
| **Recherche linéaire** | O(n) | O(1) | Petits datasets |
| **Recherche binaire** | O(log n) | O(1) | Données triées |
| **Tri à bulles** | O(n²) | O(1) | Apprentissage |
| **Tri rapide** | O(n log n) | O(log n) | Usage général |
| **Tri par sélection** | O(n²) | O(1) | Petits datasets |

## Bonnes pratiques

1. **Choisir l'algorithme approprié** selon le contexte
2. **Optimiser pour le cas d'usage** spécifique
3. **Tester avec différentes tailles** de données
4. **Documenter la complexité** temporelle et spatiale
5. **Valider les résultats** avec des cas de test

## Résumé

Les algorithmes de base sont essentiels en programmation. Maîtriser la recherche, le tri, les statistiques et la manipulation de chaînes permet de résoudre efficacement de nombreux problèmes courants en développement web.
