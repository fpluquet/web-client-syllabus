# 6.1 Variables et types

## Introduction à la programmation JavaScript

JavaScript représente l'évolution naturelle du web statique vers le web interactif. Contrairement à HTML (structure) et CSS (présentation), JavaScript apporte la **logique** et le **comportement** dynamique aux pages web.

### Philosophie de JavaScript

JavaScript est un langage de **programmation orienté objet** et **fonctionnel** qui se distingue par sa **flexibilité** et sa **polyvalence**. Il peut être utilisé côté client (navigateur) et côté serveur (Node.js), unifiant ainsi l'écosystème de développement web.

#### Caractéristiques fondamentales

- **Langage interprété :** Exécuté directement par le navigateur sans compilation préalable
- **Typage dynamique :** Les types de variables sont déterminés à l'exécution
- **Orienté objet et fonctionnel :** Support des deux paradigmes de programmation
- **Événementiel :** Réaction aux interactions utilisateur et événements système

### Évolution des standards JavaScript

- **ES5 (2009) :** Standardisation et stabilisation
- **ES6/ES2015 :** Révolution syntaxique (`let`, `const`, arrow functions, modules)
- **ES2016+ :** Évolution continue avec des ajouts annuels

Cette évolution constante fait de JavaScript un langage moderne et expressif.

## Concept fondamental : Variables comme conteneurs de données

En programmation, une **variable** est un **conteneur nommé** qui stocke une valeur. Cette métaphore du conteneur est essentielle pour comprendre la programmation : les variables sont des boîtes étiquetées qui contiennent des informations.

### Analogie avec la vie réelle

Imaginez une série de boîtes de rangement :
- **Étiquette** = nom de la variable (`nom`, `age`, `estConnecte`)
- **Contenu** = valeur stockée (`"Alice"`, `25`, `true`)
- **Type de boîte** = type de données (texte, nombre, booléen)

### Évolution de la déclaration de variables

#### Problèmes historiques avec `var`

```javascript
// Problème 1 : Portée confuse
function exemple() {
    if (true) {
        var x = 1;
    }
    console.log(x); // 1 - accessible en dehors du bloc !
}

// Problème 2 : Hoisting source de bugs
console.log(y); // undefined (pas d'erreur)
var y = 5;
```

#### Solutions modernes : `let` et `const`

ES6 introduit `let` et `const` qui résolvent ces problèmes avec :
- **Portée de bloc** : Variables limitées à leur bloc de déclaration
- **Zone morte temporelle** : Erreur si utilisation avant déclaration
- **Sémantique claire** : `const` pour les constantes, `let` pour les variables

Les variables sont des conteneurs qui stockent des données. JavaScript propose plusieurs façons de déclarer des variables et différents types de données.

## Déclaration de variables

### Philosophie des mots-clés de déclaration

Le choix entre `let`, `const` et `var` n'est pas qu'une question technique : il reflète l'**intention du développeur** et améliore la **lisibilité** et la **maintenabilité** du code.

#### `const` : Immutabilité et clarté d'intention

```javascript
const PI = 3.14159;
const API_URL = "https://api.exemple.com";
const MAX_TENTATIVES = 3;
```

**Principe :** Utilisez `const` par défaut. Cette pratique :
- **Communique l'intention** : Cette valeur ne changera pas
- **Prévient les erreurs** : Impossible de réassigner accidentellement
- **Améliore les performances** : Le moteur JavaScript peut optimiser
- **Facilite le raisonnement** : Moins de variables à suivre mentalement

#### `let` : Mutabilité contrôlée

```javascript
let compteur = 0;
let messageUtilisateur = "";
let estTraitementEnCours = false;
```

**Principe :** Utilisez `let` uniquement quand la réassignation est nécessaire.

#### Distinction cruciale : immutabilité vs constance

```javascript
// La variable est constante, mais l'objet peut être modifié
const utilisateur = {
    nom: "Alice",
    age: 25
};

utilisateur.age = 26; // ✅ Autorisé : modification de propriété
// utilisateur = {}; // ❌ Erreur : réassignation interdite
```

### Portée (Scope) : Visibilité et accessibilité

La **portée** détermine où une variable peut être utilisée dans votre code. C'est un concept fondamental qui affecte la structure et la sécurité de vos programmes.

#### Portée de bloc (Block Scope)

```javascript
{
    let variableDeBloc = "Je n'existe que dans ce bloc";
    const CONSTANTE_BLOC = 42;
}
// Variables inaccessibles ici
```

Cette portée restreinte :
- **Évite les conflits** de noms dans des portées différentes
- **Facilite le raisonnement** : variables confinées à leur contexte
- **Améliore la sécurité** : pas de pollution de l'espace global

#### Portée fonctionnelle

```javascript
function maFonction() {
    let variableLocale = "Accessible dans toute la fonction";
    
    if (true) {
        let variableDeBloc = "Accessible seulement dans ce if";
        console.log(variableLocale); // ✅ Accessible
    }
    
    // console.log(variableDeBloc); // ❌ Erreur
}
```

### Conventions de nommage

#### Style de nommage expressif

**Variables et fonctions :** `camelCase`
```javascript
let nomUtilisateur = "Alice";
let calculerMoyenne = () => {};
```

**Constantes :** `SCREAMING_SNAKE_CASE`
```javascript
const TAUX_TVA = 0.20;
const MAX_FICHIERS_UPLOADS = 10;
```

**Noms descriptifs plutôt que concis :**
```javascript
// ❌ Peu expressif
let d = new Date();
let u = getCurrentUser();

// ✅ Expressif
let dateActuelle = new Date();
let utilisateurConnecte = getCurrentUser();
```

### `let` (recommandé pour les variables)
```javascript
let nom = "Alice";
let age = 25;
let estEtudiant = true;

// Réassignation possible
nom = "Bob";
age = 30;
```

### `const` (recommandé pour les constantes)
```javascript
const PI = 3.14159;
const COULEUR_PRIMAIRE = "#3498db";
const utilisateur = {
    nom: "Alice",
    email: "alice@exemple.com"
};

// ❌ Erreur : impossible de réassigner
// PI = 3.14; // TypeError
```

### `var` (ancienne syntaxe, à éviter)
```javascript
var ancienneVariable = "éviter cette syntaxe";
```

## Types de données primitifs

### 1. Number (nombres)
```javascript
let entier = 42;
let decimal = 3.14;
let negatif = -10;
let grand = 1e6; // 1 000 000

// Opérations mathématiques
let somme = 10 + 5;        // 15
let produit = 4 * 3;       // 12
let division = 15 / 3;     // 5
let reste = 17 % 5;        // 2
let puissance = 2 ** 3;    // 8
```

### 2. String (chaînes de caractères)
```javascript
let prenom = "Alice";
let nom = 'Dupont';
let phrase = `Bonjour ${prenom} ${nom}!`; // Template literal

// Propriétés et méthodes des chaînes
let texte = "JavaScript";
console.log(texte.length);          // 10
console.log(texte.toUpperCase());   // "JAVASCRIPT"
console.log(texte.toLowerCase());   // "javascript"
console.log(texte.charAt(0));       // "J"
console.log(texte.includes("Script")); // true
```

### 3. Boolean (booléens)
```javascript
let estActif = true;
let estInactif = false;

// Opérateurs de comparaison
let a = 10;
let b = 5;

console.log(a > b);    // true
console.log(a < b);    // false
console.log(a === 10); // true (égalité stricte)
console.log(a !== b);  // true (différent)
```

### 4. Undefined
```javascript
let variableNonDefinie;
console.log(variableNonDefinie); // undefined

let objet = {};
console.log(objet.proprieteInexistante); // undefined
```

### 5. Null
```javascript
let valeurVide = null;
console.log(valeurVide); // null
```

## Opérateurs

### Opérateurs arithmétiques
```javascript
let x = 10;
let y = 3;

console.log(x + y);  // 13 (addition)
console.log(x - y);  // 7  (soustraction)
console.log(x * y);  // 30 (multiplication)
console.log(x / y);  // 3.333... (division)
console.log(x % y);  // 1  (modulo/reste)
console.log(x ** y); // 1000 (puissance)
```

### Opérateurs d'assignation
```javascript
let nombre = 10;

nombre += 5;  // nombre = nombre + 5;  → 15
nombre -= 3;  // nombre = nombre - 3;  → 12
nombre *= 2;  // nombre = nombre * 2;  → 24
nombre /= 4;  // nombre = nombre / 4;  → 6

// Incrémentation et décrémentation
let compteur = 0;
compteur++;   // compteur = 1
++compteur;   // compteur = 2
compteur--;   // compteur = 1
```

### Opérateurs de comparaison
```javascript
let a = 5;
let b = "5";

// Égalité simple (conversion de type)
console.log(a == b);   // true

// Égalité stricte (pas de conversion)
console.log(a === b);  // false
console.log(a !== b);  // true

// Comparaisons
console.log(a > 3);    // true
console.log(a <= 5);   // true
```

### Opérateurs logiques
```javascript
let age = 20;
let aPermis = true;

// ET logique (&&)
let peutConduire = age >= 18 && aPermis; // true

// OU logique (||)
let estMineur = age < 18 || age > 65; // false

// NON logique (!)
let estMajeur = !estMineur; // true
```

## Vérification de types

### typeof
```javascript
console.log(typeof 42);          // "number"
console.log(typeof "hello");     // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" (particularité JS)
console.log(typeof {});          // "object"
console.log(typeof []);          // "object"
console.log(typeof function(){}); // "function"
```

## Conversion de types

### Conversion vers nombre
```javascript
let texte = "123";
let nombre1 = Number(texte);     // 123
let nombre2 = parseInt(texte);   // 123
let nombre3 = parseFloat("3.14"); // 3.14
let nombre4 = +texte;            // 123 (opérateur unaire +)

console.log(Number("abc"));      // NaN (Not a Number)
```

### Conversion vers chaîne
```javascript
let nombre = 123;
let texte1 = String(nombre);     // "123"
let texte2 = nombre.toString();  // "123"
let texte3 = "" + nombre;        // "123"
```

### Conversion vers booléen
```javascript
let valeur1 = Boolean(1);        // true
let valeur2 = Boolean(0);        // false
let valeur3 = Boolean("hello");  // true
let valeur4 = Boolean("");       // false
let valeur5 = !!42;              // true (double négation)
```

## Exemple pratique

```javascript
// Calculateur d'âge
const anneeActuelle = 2025;
let anneeNaissance = 1995;
let age = anneeActuelle - anneeNaissance;

console.log(`Vous avez ${age} ans.`);

// Vérification de majorité
let estMajeur = age >= 18;
console.log(`Majeur : ${estMajeur}`);

// Calcul de TVA
const TAUX_TVA = 0.20;
let prixHT = 100;
let tva = prixHT * TAUX_TVA;
let prixTTC = prixHT + tva;

console.log(`Prix HT : ${prixHT}€`);
console.log(`TVA (${TAUX_TVA * 100}%) : ${tva}€`);
console.log(`Prix TTC : ${prixTTC}€`);

// Validation d'email simple
let email = "user@exemple.com";
let contientArobase = email.includes("@");
let contientPoint = email.includes(".");

let emailValide = contientArobase && contientPoint && email.length > 5;
console.log(`Email valide : ${emailValide}`);
```

## Bonnes pratiques

### ✅ Déclaration
- Utiliser `const` par défaut
- Utiliser `let` quand la réassignation est nécessaire
- Éviter `var`

### ✅ Nommage
- Utiliser des noms descriptifs (`age` plutôt que `a`)
- CamelCase pour les variables (`monAge`)
- UPPER_CASE pour les constantes (`TAUX_TVA`)

### ✅ Types
- Utiliser l'égalité stricte (`===`) plutôt que `==`
- Vérifier les types avec `typeof` si nécessaire
- Être conscient des conversions automatiques

