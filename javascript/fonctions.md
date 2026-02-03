# 6.3 Fonctions

## Introduction aux fonctions

Les fonctions sont des blocs de code réutilisables qui effectuent des tâches spécifiques. Elles sont essentielles pour organiser le code, éviter la répétition et créer des programmes modulaires.

## Déclaration de fonctions

### Déclaration traditionnelle

```javascript
// Déclaration de fonction (hoistée)
function saluer(nom) {
  return `Bonjour ${nom} !`;
}

// Utilisation
console.log(saluer("Alice")); // "Bonjour Alice !"

// Fonction sans paramètres
function direBonjour() {
  console.log("Bonjour tout le monde !");
}

direBonjour(); // "Bonjour tout le monde !"

// Fonction sans valeur de retour
function afficherMessage(message) {
  console.log(`Message: ${message}`);
  // return undefined (implicite)
}
```

### Expressions de fonction

```javascript
// Expression de fonction (non hoistée)
const calculer = function(a, b) {
  return a + b;
};

// Utilisation
console.log(calculer(5, 3)); // 8

// Expression de fonction nommée
const factorielle = function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);
};

console.log(factorielle(5)); // 120
```

### Fonctions fléchées (Arrow Functions)

```javascript
// Syntaxe de base
const addition = (a, b) => {
  return a + b;
};

// Syntaxe courte (retour implicite)
const multiplication = (a, b) => a * b;

// Un seul paramètre (parenthèses optionnelles)
const carre = x => x * x;

// Aucun paramètre
const obtenirDate = () => new Date();

// Retour d'objet (parenthèses nécessaires)
const creerPersonne = (nom, age) => ({ nom, age });

// Exemples d'utilisation
console.log(addition(2, 3));        // 5
console.log(multiplication(4, 5));  // 20
console.log(carre(6));              // 36
console.log(obtenirDate());         // Date actuelle
console.log(creerPersonne("Bob", 25)); // { nom: "Bob", age: 25 }
```

## Paramètres de fonctions

### Paramètres par défaut

```javascript
// Valeurs par défaut
function saluerAvecTitre(nom, titre = "M./Mme") {
  return `${titre} ${nom}`;
}

console.log(saluerAvecTitre("Dupont"));           // "M./Mme Dupont"
console.log(saluerAvecTitre("Martin", "Dr"));     // "Dr Martin"

// Paramètres par défaut avec expressions
function creerUtilisateur(nom, role = "utilisateur", actif = true) {
  return {
    nom,
    role,
    actif,
    dateCreation: new Date()
  };
}

console.log(creerUtilisateur("Alice"));
// { nom: "Alice", role: "utilisateur", actif: true, dateCreation: ... }
```

### Paramètres rest

```javascript
// Collecte de paramètres multiples
function somme(...nombres) {
  return nombres.reduce((total, nombre) => total + nombre, 0);
}

console.log(somme(1, 2, 3, 4, 5)); // 15
console.log(somme(10, 20));         // 30

// Combinaison avec paramètres normaux
function presenterPersonnes(presentateur, ...personnes) {
  console.log(`${presentateur} présente :`);
  personnes.forEach(personne => console.log(`- ${personne}`));
}

presenterPersonnes("Alice", "Bob", "Charlie", "Diana");
// Alice présente :
// - Bob
// - Charlie
// - Diana
```

### Déstructuration des paramètres

```javascript
// Déstructuration d'objet
function afficherPersonne({ nom, age, ville = "Non précisée" }) {
  console.log(`${nom}, ${age} ans, habite à ${ville}`);
}

const personne = { nom: "Alice", age: 30, ville: "Paris" };
afficherPersonne(personne); // "Alice, 30 ans, habite à Paris"

// Déstructuration de tableau
function calculerMoyenne([...notes]) {
  const somme = notes.reduce((acc, note) => acc + note, 0);
  return somme / notes.length;
}

console.log(calculerMoyenne([15, 12, 18, 16])); // 15.25

// Paramètres complexes
function creerRectangle({ largeur, hauteur, couleur = "blanc" } = {}) {
  return {
    largeur: largeur || 100,
    hauteur: hauteur || 100,
    couleur,
    aire: function() { return this.largeur * this.hauteur; }
  };
}

console.log(creerRectangle({ largeur: 200, hauteur: 150, couleur: "bleu" }));
```

## Portée (Scope) et closures

### Portée lexicale

```javascript
// Portée globale
let variableGlobale = "Je suis globale";

function fonctionParent() {
  // Portée de fonction
  let variableLocale = "Je suis locale";
  
  function fonctionEnfant() {
    // Accès aux variables des portées supérieures
    console.log(variableGlobale); // Accessible
    console.log(variableLocale);  // Accessible
  }
  
  fonctionEnfant();
}

fonctionParent();
// console.log(variableLocale); // Erreur : non accessible
```

### Closures

```javascript
// Closure basique
function creerCompteur() {
  let compte = 0;
  
  return function() {
    compte++;
    return compte;
  };
}

const compteur1 = creerCompteur();
const compteur2 = creerCompteur();

console.log(compteur1()); // 1
console.log(compteur1()); // 2
console.log(compteur2()); // 1 (indépendant)

// Closure avec paramètres
function creerMultiplicateur(facteur) {
  return function(nombre) {
    return nombre * facteur;
  };
}

const doubler = creerMultiplicateur(2);
const tripler = creerMultiplicateur(3);

console.log(doubler(5));  // 10
console.log(tripler(4));  // 12

// Module pattern avec closure
function creerCalculatrice() {
  let resultat = 0;
  
  return {
    ajouter: function(valeur) {
      resultat += valeur;
      return this;
    },
    soustraire: function(valeur) {
      resultat -= valeur;
      return this;
    },
    multiplier: function(valeur) {
      resultat *= valeur;
      return this;
    },
    obtenirResultat: function() {
      return resultat;
    },
    reinitialiser: function() {
      resultat = 0;
      return this;
    }
  };
}

const calc = creerCalculatrice();
const resultat = calc.ajouter(10).multiplier(2).soustraire(5).obtenirResultat();
console.log(resultat); // 15
```

## Fonctions d'ordre supérieur

### Fonctions qui retournent des fonctions

```javascript
// Fonction qui retourne une fonction configurée
function creerValidateur(regle) {
  return function(valeur) {
    switch(regle) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valeur);
      case 'telephone':
        return /^\d{10}$/.test(valeur.replace(/\D/g, ''));
      case 'codePostal':
        return /^\d{5}$/.test(valeur);
      default:
        return true;
    }
  };
}

const validerEmail = creerValidateur('email');
const validerTelephone = creerValidateur('telephone');

console.log(validerEmail("test@example.com")); // true
console.log(validerTelephone("0123456789"));   // true

// Fonction de configuration
function creerFormateur(options = {}) {
  const { devise = '€', decimales = 2, separateur = ',' } = options;
  
  return function(montant) {
    return montant.toFixed(decimales).replace('.', separateur) + ' ' + devise;
  };
}

const formaterEuros = creerFormateur({ devise: '€', decimales: 2 });
const formaterDollars = creerFormateur({ devise: '$', decimales: 2, separateur: '.' });

console.log(formaterEuros(1234.56));   // "1234,56 €"
console.log(formaterDollars(1234.56)); // "1234.56 $"
```

### Fonctions qui acceptent des fonctions

```javascript
// Fonction avec callback
function traiterDonnees(donnees, callback) {
  console.log("Traitement en cours...");
  const resultat = donnees.map(callback);
  console.log("Traitement terminé");
  return resultat;
}

const nombres = [1, 2, 3, 4, 5];
const carres = traiterDonnees(nombres, x => x * x);
console.log(carres); // [1, 4, 9, 16, 25]

// Fonction de retry avec callback
function executerAvecRetry(operation, maxTentatives = 3) {
  return function(...args) {
    let tentatives = 0;
    
    while (tentatives < maxTentatives) {
      try {
        return operation.apply(this, args);
      } catch (erreur) {
        tentatives++;
        if (tentatives >= maxTentatives) {
          throw new Error(`Opération échouée après ${maxTentatives} tentatives: ${erreur.message}`);
        }
        console.log(`Tentative ${tentatives} échouée, retry...`);
      }
    }
  };
}

// Simulation d'une opération qui peut échouer
function operationInstable() {
  if (Math.random() < 0.7) {
    throw new Error("Opération échouée");
  }
  return "Succès !";
}

const operationAvecRetry = executerAvecRetry(operationInstable, 5);
```

## Méthodes d'array avec fonctions

### map, filter, reduce

```javascript
const produits = [
  { nom: "Laptop", prix: 999, categorie: "tech" },
  { nom: "Souris", prix: 25, categorie: "tech" },
  { nom: "Livre", prix: 15, categorie: "education" },
  { nom: "Chaise", prix: 150, categorie: "mobilier" }
];

// map - transformation
const nomsEtPrix = produits.map(produit => `${produit.nom}: ${produit.prix}€`);
console.log(nomsEtPrix);
// ["Laptop: 999€", "Souris: 25€", "Livre: 15€", "Chaise: 150€"]

// filter - filtrage
const produitsTech = produits.filter(produit => produit.categorie === "tech");
console.log(produitsTech);
// [{ nom: "Laptop", prix: 999, categorie: "tech" }, { nom: "Souris", prix: 25, categorie: "tech" }]

// reduce - agrégation
const prixTotal = produits.reduce((total, produit) => total + produit.prix, 0);
console.log(prixTotal); // 1189

// Chainé
const prixMoyenTech = produits
  .filter(p => p.categorie === "tech")
  .map(p => p.prix)
  .reduce((total, prix, index, array) => total + prix / array.length, 0);
console.log(prixMoyenTech); // 512
```

### forEach, find, some, every

```javascript
const utilisateurs = [
  { nom: "Alice", age: 25, actif: true },
  { nom: "Bob", age: 30, actif: false },
  { nom: "Charlie", age: 35, actif: true }
];

// forEach - itération
utilisateurs.forEach((utilisateur, index) => {
  console.log(`${index + 1}. ${utilisateur.nom} (${utilisateur.age} ans)`);
});

// find - premier élément correspondant
const utilisateurActif = utilisateurs.find(u => u.actif);
console.log(utilisateurActif); // { nom: "Alice", age: 25, actif: true }

// some - au moins un élément correspond
const aDesInactifs = utilisateurs.some(u => !u.actif);
console.log(aDesInactifs); // true

// every - tous les éléments correspondent
const tousActifs = utilisateurs.every(u => u.actif);
console.log(tousActifs); // false

// Combinaisons complexes
const utilisateursJeunesActifs = utilisateurs
  .filter(u => u.actif && u.age < 30)
  .map(u => u.nom);
console.log(utilisateursJeunesActifs); // ["Alice"]
```

## Fonctions asynchrones et callbacks

### Callbacks

```javascript
// Callback simple
function chargerDonnees(callback) {
  console.log("Chargement des données...");
  setTimeout(() => {
    const donnees = { nom: "Alice", age: 30 };
    callback(null, donnees); // Convention: erreur en premier
  }, 1000);
}

chargerDonnees((erreur, donnees) => {
  if (erreur) {
    console.error("Erreur:", erreur);
  } else {
    console.log("Données reçues:", donnees);
  }
});

// Gestion d'erreurs avec callbacks
function diviser(a, b, callback) {
  if (b === 0) {
    callback(new Error("Division par zéro"));
  } else {
    callback(null, a / b);
  }
}

diviser(10, 2, (erreur, resultat) => {
  if (erreur) {
    console.error(erreur.message);
  } else {
    console.log("Résultat:", resultat); // 5
  }
});
```

### Promesses avec fonctions

```javascript
// Création de promesses
function creerPromesse(valeur, delai = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (valeur < 0) {
        reject(new Error("Valeur négative"));
      } else {
        resolve(valeur * 2);
      }
    }, delai);
  });
}

// Utilisation avec then/catch
creerPromesse(5)
  .then(resultat => {
    console.log("Résultat:", resultat); // 10
    return creerPromesse(resultat);
  })
  .then(resultat => {
    console.log("Nouveau résultat:", resultat); // 20
  })
  .catch(erreur => {
    console.error("Erreur:", erreur.message);
  });

// Fonction qui retourne une promesse
function obtenirUtilisateur(id) {
  return new Promise((resolve, reject) => {
    // Simulation d'appel API
    setTimeout(() => {
      if (id === 1) {
        resolve({ id: 1, nom: "Alice", email: "alice@example.com" });
      } else {
        reject(new Error("Utilisateur non trouvé"));
      }
    }, 500);
  });
}

// Async/await
async function afficherUtilisateur(id) {
  try {
    const utilisateur = await obtenirUtilisateur(id);
    console.log("Utilisateur:", utilisateur);
  } catch (erreur) {
    console.error("Erreur:", erreur.message);
  }
}

afficherUtilisateur(1);
```

## Exemple pratique complet

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fonctions JavaScript</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
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
    
    button {
      background: #007bff;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      margin: 0.5rem;
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
    
    .error {
      border-left-color: #dc3545;
      background: #f8d7da;
    }
    
    input {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin: 0.5rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Démonstration des fonctions JavaScript</h1>
    
    <h2>1. Calculatrice</h2>
    <div>
      <input type="number" id="calc-a" placeholder="Nombre A" value="10">
      <input type="number" id="calc-b" placeholder="Nombre B" value="5">
      <button onclick="calculer('addition')">+</button>
      <button onclick="calculer('soustraction')">-</button>
      <button onclick="calculer('multiplication')">×</button>
      <button onclick="calculer('division')">÷</button>
    </div>
    <div id="calc-result" class="result"></div>
  </div>
  
  <div class="container">
    <h2>2. Gestionnaire de tâches</h2>
    <div>
      <input type="text" id="tache-input" placeholder="Nouvelle tâche">
      <button onclick="ajouterTache()">Ajouter</button>
      <button onclick="filtrerTaches('toutes')">Toutes</button>
      <button onclick="filtrerTaches('completees')">Complétées</button>
      <button onclick="filtrerTaches('en-cours')">En cours</button>
    </div>
    <div id="taches-liste"></div>
  </div>
  
  <div class="container">
    <h2>3. Validation de formulaire</h2>
    <div>
      <input type="email" id="email" placeholder="Email">
      <input type="tel" id="telephone" placeholder="Téléphone">
      <button onclick="validerFormulaire()">Valider</button>
    </div>
    <div id="validation-result"></div>
  </div>
  
  <div class="container">
    <h2>4. Chargement asynchrone</h2>
    <div>
      <button onclick="chargerDonneesAsync()">Charger données</button>
      <button onclick="simulerErreur()">Simuler erreur</button>
    </div>
    <div id="async-result"></div>
  </div>

  <script>
    // 1. Calculatrice avec fonctions
    const operations = {
      addition: (a, b) => a + b,
      soustraction: (a, b) => a - b,
      multiplication: (a, b) => a * b,
      division: (a, b) => {
        if (b === 0) throw new Error("Division par zéro");
        return a / b;
      }
    };
    
    function calculer(typeOperation) {
      try {
        const a = parseFloat(document.getElementById('calc-a').value);
        const b = parseFloat(document.getElementById('calc-b').value);
        
        if (isNaN(a) || isNaN(b)) {
          throw new Error("Veuillez entrer des nombres valides");
        }
        
        const resultat = operations[typeOperation](a, b);
        document.getElementById('calc-result').innerHTML = 
          `<strong>Résultat:</strong> ${a} ${getSymbole(typeOperation)} ${b} = ${resultat}`;
        document.getElementById('calc-result').className = 'result';
      } catch (erreur) {
        document.getElementById('calc-result').innerHTML = 
          `<strong>Erreur:</strong> ${erreur.message}`;
        document.getElementById('calc-result').className = 'result error';
      }
    }
    
    function getSymbole(operation) {
      const symboles = {
        addition: '+',
        soustraction: '-',
        multiplication: '×',
        division: '÷'
      };
      return symboles[operation];
    }
    
    // 2. Gestionnaire de tâches avec closures
    const gestionnaireeTaches = (function() {
      let taches = [];
      let filtre = 'toutes';
      
      function creerTache(texte) {
        return {
          id: Date.now(),
          texte,
          completee: false,
          dateCreation: new Date()
        };
      }
      
      function ajouter(texte) {
        if (texte.trim()) {
          taches.push(creerTache(texte));
          afficher();
        }
      }
      
      function basculerCompletion(id) {
        const tache = taches.find(t => t.id === id);
        if (tache) {
          tache.completee = !tache.completee;
          afficher();
        }
      }
      
      function supprimer(id) {
        taches = taches.filter(t => t.id !== id);
        afficher();
      }
      
      function filtrer(nouveauFiltre) {
        filtre = nouveauFiltre;
        afficher();
      }
      
      function obtenirTachesFiltrees() {
        switch(filtre) {
          case 'completees':
            return taches.filter(t => t.completee);
          case 'en-cours':
            return taches.filter(t => !t.completee);
          default:
            return taches;
        }
      }
      
      function afficher() {
        const tachesFiltrees = obtenirTachesFiltrees();
        const html = tachesFiltrees.map(tache => `
          <div style="padding: 0.5rem; border: 1px solid #ddd; margin: 0.5rem 0; border-radius: 4px; ${tache.completee ? 'text-decoration: line-through; opacity: 0.7;' : ''}">
            <input type="checkbox" ${tache.completee ? 'checked' : ''} 
                   onchange="gestionnaireeTaches.basculerCompletion(${tache.id})">
            ${tache.texte}
            <button onclick="gestionnaireeTaches.supprimer(${tache.id})" 
                    style="float: right; background: #dc3545;">Supprimer</button>
          </div>
        `).join('');
        
        document.getElementById('taches-liste').innerHTML = html || '<p>Aucune tâche trouvée</p>';
      }
      
      return {
        ajouter,
        basculerCompletion,
        supprimer,
        filtrer
      };
    })();
    
    function ajouterTache() {
      const input = document.getElementById('tache-input');
      gestionnaireeTaches.ajouter(input.value);
      input.value = '';
    }
    
    function filtrerTaches(filtre) {
      gestionnaireeTaches.filtrer(filtre);
    }
    
    // 3. Validation avec fonctions d'ordre supérieur
    function creerValidateur(regle) {
      const regles = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        telephone: /^(?:\+33|0)[1-9](?:[0-9]{8})$/
      };
      
      return function(valeur) {
        return regles[regle] ? regles[regle].test(valeur) : false;
      };
    }
    
    const validerEmail = creerValidateur('email');
    const validerTelephone = creerValidateur('telephone');
    
    function validerFormulaire() {
      const email = document.getElementById('email').value;
      const telephone = document.getElementById('telephone').value;
      
      const erreurs = [];
      
      if (!validerEmail(email)) {
        erreurs.push("Email invalide");
      }
      
      if (!validerTelephone(telephone)) {
        erreurs.push("Téléphone invalide (format français attendu)");
      }
      
      const resultDiv = document.getElementById('validation-result');
      
      if (erreurs.length === 0) {
        resultDiv.innerHTML = '<div class="result">✅ Formulaire valide</div>';
      } else {
        resultDiv.innerHTML = `<div class="result error">❌ Erreurs: ${erreurs.join(', ')}</div>`;
      }
    }
    
    // 4. Fonctions asynchrones
    function simulerChargement(delai = 1000) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            donnees: "Informations chargées",
            timestamp: new Date().toLocaleString()
          });
        }, delai);
      });
    }
    
    function simulerErreurChargement() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("Erreur de réseau simulée"));
        }, 500);
      });
    }
    
    async function chargerDonneesAsync() {
      const resultDiv = document.getElementById('async-result');
      resultDiv.innerHTML = '<div class="result">⏳ Chargement en cours...</div>';
      
      try {
        const donnees = await simulerChargement(2000);
        resultDiv.innerHTML = `
          <div class="result">
            <strong>✅ Succès:</strong><br>
            ${donnees.donnees}<br>
            <small>Chargé le: ${donnees.timestamp}</small>
          </div>
        `;
      } catch (erreur) {
        resultDiv.innerHTML = `<div class="result error">❌ ${erreur.message}</div>`;
      }
    }
    
    async function simulerErreur() {
      const resultDiv = document.getElementById('async-result');
      resultDiv.innerHTML = '<div class="result">⏳ Tentative de connexion...</div>';
      
      try {
        await simulerErreurChargement();
      } catch (erreur) {
        resultDiv.innerHTML = `<div class="result error">❌ ${erreur.message}</div>`;
      }
    }
    
    // Event listeners pour Enter
    document.getElementById('tache-input').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        ajouterTache();
      }
    });
  </script>
</body>
</html>
```

## Bonnes pratiques

1. **Nommage expressif** des fonctions
2. **Fonctions pures** quand possible
3. **Paramètres par défaut** appropriés
4. **Gestion d'erreurs** cohérente
5. **Documentation** des paramètres et retours

## Résumé

Les fonctions JavaScript offrent de nombreuses possibilités : déclarations traditionnelles, expressions, fonctions fléchées, closures et fonctions d'ordre supérieur. Maîtriser ces concepts permet d'écrire du code modulaire, réutilisable et maintenable.
