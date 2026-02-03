# 6.2 Structures de contrôle

## Introduction au flux de contrôle

Les **structures de contrôle** sont les mécanismes qui déterminent l'ordre d'exécution des instructions dans un programme. Sans elles, le code s'exécuterait simplement de haut en bas, ligne par ligne, limitant drastiquement les possibilités de la programmation.

### Analogie avec la prise de décision humaine

Imaginez votre routine matinale :
- **Si** il pleut, **alors** prenez un parapluie
- **Tant que** vous n'êtes pas habillé, **répétez** l'habillage
- **Pour chaque** vêtement dans l'armoire, **vérifiez** s'il est propre

Ces processus de décision naturels correspondent exactement aux structures de contrôle en programmation.

### Types fondamentaux de structures de contrôle

#### 1. Structures conditionnelles (Sélection)
Permettent d'exécuter différents blocs de code selon des conditions :
- `if...else` : Choix binaire
- `switch` : Choix multiple
- Opérateur ternaire : Condition inline

#### 2. Structures répétitives (Itération)
Permettent de répéter des instructions :
- `for` : Répétition avec compteur
- `while` : Répétition conditionnelle
- `do...while` : Répétition avec vérification finale

#### 3. Structures de saut
Permettent de modifier le flux normal :
- `break` : Sortie anticipée
- `continue` : Passage à l'itération suivante
- `return` : Sortie de fonction

### Philosophie du code expressif

Les structures de contrôle doivent refléter la **logique métier** de manière lisible. Un bon code se lit presque comme de l'anglais :

```javascript
if (utilisateur.estConnecte && utilisateur.aAccesAdmin) {
    afficherPanneauAdmin();
} else {
    redirigerVersConnexion();
}
```

### Importance de l'indentation et de la lisibilité

L'indentation n'est pas qu'esthétique : elle révèle la **structure logique** du programme et facilite la **maintenance** :

```javascript
// ❌ Difficile à lire
if(condition1){if(condition2){action1();}else{action2();}}

// ✅ Structure claire
if (condition1) {
    if (condition2) {
        action1();
    } else {
        action2();
    }
}
```

Les structures de contrôle permettent de diriger l'exécution du code selon des conditions ou de répéter des instructions. Elles sont essentielles pour créer une logique dynamique.

## Instructions conditionnelles

### Logique booléenne et prise de décision

Les instructions conditionnelles sont le fondement de la **logique algorithmique**. Elles permettent au programme de "prendre des décisions" en évaluant des conditions et en exécutant différents chemins de code selon le résultat.

#### Concept de condition booléenne

Une condition est une **expression** qui s'évalue à `true` (vrai) ou `false` (faux). Cette dualité binaire reflète la logique fondamentale des ordinateurs :

```javascript
let age = 20;
let estMajeur = age >= 18; // Expression booléenne : true
```

#### Valeurs "truthy" et "falsy"

JavaScript évalue automatiquement toute valeur dans un contexte booléen :

**Valeurs falsy (considérées comme false) :**
- `false`, `0`, `""` (chaîne vide), `null`, `undefined`, `NaN`

**Valeurs truthy (considérées comme true) :**
- Tout le reste : nombres non-zéro, chaînes non-vides, objets, tableaux

Cette coercition permet des conditions concises :
```javascript
if (nom) { // Vérifie que nom n'est pas vide
    afficherSalutation();
}
```

### Structure `if` : La décision binaire

L'instruction `if` implémente la logique **"si...alors"** fondamentale :

```javascript
if (condition) {
    // Code exécuté si condition est vraie
}
```

#### Bonnes pratiques pour les conditions

**Expressivité plutôt que concision :**
```javascript
// ❌ Concis mais peu clair
if (u.a > 18 && u.s === 'A') { /* ... */ }

// ✅ Expressif et lisible
const estMajeur = utilisateur.age > 18;
const estActif = utilisateur.statut === 'ACTIF';

if (estMajeur && estActif) {
    autoriserAcces();
}
```

### Structure `if...else` : L'alternative

L'ajout d'une clause `else` permet de gérer explicitement les deux cas possibles :

```javascript
if (condition) {
    // Cas vrai
} else {
    // Cas faux
}
```

Cette structure garantit qu'**une et une seule** branche sera exécutée, éliminant l'ambiguïté.

### Structure `if...else if...else` : Décisions multiples

Pour gérer plusieurs conditions mutuellement exclusives :

```javascript
if (condition1) {
    // Premier cas
} else if (condition2) {
    // Deuxième cas
} else if (condition3) {
    // Troisième cas
} else {
    // Cas par défaut
}
```

#### Ordre d'évaluation important

Les conditions sont évaluées **séquentiellement**. Dès qu'une condition est vraie, les suivantes ne sont pas testées :

```javascript
let score = 85;

if (score >= 80) {
    console.log("Excellent"); // Exécuté
} else if (score >= 70) {
    console.log("Bien"); // Pas testé
} else if (score >= 60) {
    console.log("Passable"); // Pas testé
}
```

Cette caractéristique permet d'optimiser les performances et de créer des logiques hiérarchiques.

### Instructions conditionnelles

### `if` simple
```javascript
let age = 18;

if (age >= 18) {
    console.log("Vous êtes majeur");
}
```

### `if...else`
```javascript
let temperature = 25;

if (temperature > 30) {
    console.log("Il fait chaud");
} else {
    console.log("Il fait bon");
}
```

### `if...else if...else`
```javascript
let note = 85;

if (note >= 90) {
    console.log("Excellent");
} else if (note >= 80) {
    console.log("Très bien");
} else if (note >= 70) {
    console.log("Bien");
} else if (note >= 60) {
    console.log("Passable");
} else {
    console.log("Insuffisant");
}
```

### Conditions complexes
```javascript
let age = 25;
let permis = true;
let voiture = false;

if (age >= 18 && permis) {
    console.log("Peut conduire");
    
    if (voiture) {
        console.log("Peut prendre sa voiture");
    } else {
        console.log("Doit emprunter une voiture");
    }
} else {
    console.log("Ne peut pas conduire");
}
```

## Opérateur ternaire

### Syntaxe
```javascript
condition ? valeurSiVrai : valeurSiFaux
```

### Exemples
```javascript
let age = 20;
let statut = age >= 18 ? "majeur" : "mineur";
console.log(statut); // "majeur"

// Équivalent à :
let statut2;
if (age >= 18) {
    statut2 = "majeur";
} else {
    statut2 = "mineur";
}
```

### Ternaires imbriqués (à utiliser avec modération)
```javascript
let note = 85;
let mention = note >= 90 ? "Excellent" : 
              note >= 80 ? "Très bien" : 
              note >= 70 ? "Bien" : 
              note >= 60 ? "Passable" : "Insuffisant";

console.log(mention); // "Très bien"
```

## Opérateurs de coalescence et valeurs par défaut : `||` et `??`

Dans de nombreux cas, il est utile de fournir une **valeur par défaut** lorsqu'une variable est absente ou invalide. JavaScript propose deux opérateurs puissants pour cela :

### 1. L’opérateur OU logique `||`

L’opérateur `||` retourne la première valeur "truthy" (considérée comme vraie) parmi ses opérandes. Il est souvent utilisé pour fournir une valeur de repli si la première est "falsy" (c’est-à-dire : `false`, `0`, `""`, `null`, `undefined`, `NaN`).

```javascript
let nom = saisieUtilisateur || "Invité";
console.log(nom); // Affiche "Invité" si saisieUtilisateur est vide, null, 0, etc.
```

**Attention :** `||` considère comme "falsy" des valeurs parfois valides (ex : `0` ou `""`).

### 2. L’opérateur de coalescence nulle `??`

L’opérateur `??` (nullish coalescing) est plus strict : il ne fournit la valeur de repli **que si la première valeur est `null` ou `undefined`** (et pas pour `0` ou `""`).

```javascript
let age = saisieAge ?? 18;
console.log(age); // Affiche 18 seulement si saisieAge est null ou undefined
```

### Comparaison pratique

```javascript
let valeur = 0;
console.log(valeur || 42); // 42 (car 0 est "falsy")
console.log(valeur ?? 42); // 0 (car 0 n’est ni null ni undefined)
```

**À retenir :**
- Utilisez `||` pour fournir une valeur de secours dans la plupart des cas, mais attention aux valeurs comme `0` ou `""`.
- Utilisez `??` si vous souhaitez uniquement remplacer `null` ou `undefined`.

### Cas d’usage typiques

- Préférer `??` pour les champs numériques ou booléens où `0` ou `false` sont des valeurs valides.
- Utiliser `||` pour les chaînes ou objets où toute absence de valeur doit être remplacée.

---

## Switch

### Syntaxe de base
```javascript
let jour = "lundi";

switch (jour) {
    case "lundi":
        console.log("Début de semaine");
        break;
    case "mardi":
    case "mercredi":
    case "jeudi":
        console.log("Milieu de semaine");
        break;
    case "vendredi":
        console.log("Fin de semaine");
        break;
    case "samedi":
    case "dimanche":
        console.log("Week-end");
        break;
    default:
        console.log("Jour non reconnu");
}
```

### Switch avec return (dans une fonction)
```javascript
function obtenirJourType(jour) {
    switch (jour.toLowerCase()) {
        case "lundi":
        case "mardi":
        case "mercredi":
        case "jeudi":
        case "vendredi":
            return "jour ouvrable";
        case "samedi":
        case "dimanche":
            return "week-end";
        default:
            return "jour invalide";
    }
}

console.log(obtenirJourType("SAMEDI")); // "week-end"
```

## Boucles

### Boucle `for`
```javascript
// Syntaxe : for (initialisation; condition; incrémentation)
for (let i = 0; i < 5; i++) {
    console.log(`Itération ${i}`);
}

// Compter de 10 à 1
for (let i = 10; i >= 1; i--) {
    console.log(i);
}

// Incrément par 2
for (let i = 0; i <= 10; i += 2) {
    console.log(i); // 0, 2, 4, 6, 8, 10
}
```

### Boucle `while`
```javascript
let compteur = 0;

while (compteur < 5) {
    console.log(`Compteur: ${compteur}`);
    compteur++;
}

// Exemple pratique : demander un nombre jusqu'à ce qu'il soit valide
let nombre;
while (isNaN(nombre) || nombre <= 0) {
    nombre = parseFloat(prompt("Entrez un nombre positif:"));
}
console.log(`Nombre valide: ${nombre}`);
```

### Boucle `do...while`
```javascript
let reponse;

do {
    reponse = prompt("Voulez-vous continuer? (oui/non)");
} while (reponse !== "oui" && reponse !== "non");

console.log(`Réponse finale: ${reponse}`);
```

### Boucles avec tableaux
```javascript
let fruits = ["pomme", "banane", "orange"];

// Boucle for classique
for (let i = 0; i < fruits.length; i++) {
    console.log(`${i}: ${fruits[i]}`);
}

// Boucle for...of (valeurs)
for (let fruit of fruits) {
    console.log(fruit);
}

// Boucle for...in (indices)
for (let index in fruits) {
    console.log(`${index}: ${fruits[index]}`);
}
```

## Contrôle de flux

### `break` - Sortir d'une boucle
```javascript
for (let i = 0; i < 10; i++) {
    if (i === 5) {
        console.log("Arrêt à 5");
        break;
    }
    console.log(i);
}
// Affiche: 0, 1, 2, 3, 4, "Arrêt à 5"
```

### `continue` - Passer à l'itération suivante
```javascript
for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
        continue; // Ignorer les nombres pairs
    }
    console.log(i);
}
// Affiche: 1, 3, 5, 7, 9
```

### Labels (avancé)
```javascript
externe: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
            break externe; // Sort des deux boucles
        }
        console.log(`i=${i}, j=${j}`);
    }
}
```

## Exemples pratiques

### 1. Calculateur de moyenne
```javascript
function calculerMoyenne(notes) {
    if (notes.length === 0) {
        return 0;
    }
    
    let somme = 0;
    for (let note of notes) {
        somme += note;
    }
    
    return somme / notes.length;
}

function obtenirMention(moyenne) {
    if (moyenne >= 16) {
        return "Très bien";
    } else if (moyenne >= 14) {
        return "Bien";
    } else if (moyenne >= 12) {
        return "Assez bien";
    } else if (moyenne >= 10) {
        return "Passable";
    } else {
        return "Insuffisant";
    }
}

let notes = [15, 12, 18, 14, 16];
let moyenne = calculerMoyenne(notes);
let mention = obtenirMention(moyenne);

console.log(`Moyenne: ${moyenne.toFixed(2)}`);
console.log(`Mention: ${mention}`);
```

### 2. Jeu de devinette
```javascript
function jeuDevinette() {
    let nombreSecret = Math.floor(Math.random() * 100) + 1;
    let tentatives = 0;
    let maxTentatives = 7;
    let trouve = false;
    
    console.log("Devinez un nombre entre 1 et 100!");
    console.log(`Vous avez ${maxTentatives} tentatives.`);
    
    while (tentatives < maxTentatives && !trouve) {
        let proposition = parseInt(prompt(`Tentative ${tentatives + 1}/${maxTentatives}:`));
        tentatives++;
        
        if (isNaN(proposition)) {
            console.log("Veuillez entrer un nombre valide.");
            tentatives--; // Ne pas compter cette tentative
            continue;
        }
        
        if (proposition === nombreSecret) {
            console.log(`Bravo! Vous avez trouvé ${nombreSecret} en ${tentatives} tentatives!`);
            trouve = true;
        } else if (proposition < nombreSecret) {
            console.log("Trop petit!");
        } else {
            console.log("Trop grand!");
        }
        
        if (tentatives === maxTentatives && !trouve) {
            console.log(`Dommage! Le nombre était ${nombreSecret}.`);
        }
    }
}

// jeuDevinette();
```

### 3. Validation de formulaire
```javascript
function validerFormulaire(donnees) {
    let erreurs = [];
    
    // Validation du nom
    if (!donnees.nom || donnees.nom.trim().length === 0) {
        erreurs.push("Le nom est requis");
    } else if (donnees.nom.length < 2) {
        erreurs.push("Le nom doit contenir au moins 2 caractères");
    }
    
    // Validation de l'email
    if (!donnees.email) {
        erreurs.push("L'email est requis");
    } else if (!donnees.email.includes("@")) {
        erreurs.push("L'email doit contenir un @");
    }
    
    // Validation de l'âge
    if (donnees.age === undefined || donnees.age === null) {
        erreurs.push("L'âge est requis");
    } else if (isNaN(donnees.age)) {
        erreurs.push("L'âge doit être un nombre");
    } else if (donnees.age < 0 || donnees.age > 120) {
        erreurs.push("L'âge doit être entre 0 et 120 ans");
    }
    
    // Validation du mot de passe
    if (!donnees.motDePasse) {
        erreurs.push("Le mot de passe est requis");
    } else {
        if (donnees.motDePasse.length < 8) {
            erreurs.push("Le mot de passe doit contenir au moins 8 caractères");
        }
        
        let aUneMinuscule = false;
        let aUneMajuscule = false;
        let aUnChiffre = false;
        
        for (let char of donnees.motDePasse) {
            if (char >= 'a' && char <= 'z') {
                aUneMinuscule = true;
            } else if (char >= 'A' && char <= 'Z') {
                aUneMajuscule = true;
            } else if (char >= '0' && char <= '9') {
                aUnChiffre = true;
            }
        }
        
        if (!aUneMinuscule) {
            erreurs.push("Le mot de passe doit contenir au moins une minuscule");
        }
        if (!aUneMajuscule) {
            erreurs.push("Le mot de passe doit contenir au moins une majuscule");
        }
        if (!aUnChiffre) {
            erreurs.push("Le mot de passe doit contenir au moins un chiffre");
        }
    }
    
    return {
        valide: erreurs.length === 0,
        erreurs: erreurs
    };
}

// Test
let donnees = {
    nom: "Alice",
    email: "alice@exemple.com",
    age: 25,
    motDePasse: "MonMotDePasse123"
};

let resultat = validerFormulaire(donnees);
if (resultat.valide) {
    console.log("Formulaire valide!");
} else {
    console.log("Erreurs trouvées:");
    for (let erreur of resultat.erreurs) {
        console.log("- " + erreur);
    }
}
```

### 4. Générateur de tables de multiplication
```javascript
function afficherTableMultiplication(nombre, limite = 10) {
    console.log(`Table de multiplication de ${nombre}:`);
    console.log("=".repeat(30));
    
    for (let i = 1; i <= limite; i++) {
        let resultat = nombre * i;
        console.log(`${nombre} × ${i} = ${resultat}`);
    }
}

function afficherToutesLesTables(max = 10) {
    for (let table = 1; table <= max; table++) {
        afficherTableMultiplication(table);
        console.log(); // Ligne vide entre les tables
    }
}

// Test
afficherTableMultiplication(7);
```

### 5. Analyseur de texte
```javascript
function analyserTexte(texte) {
    if (!texte || texte.trim().length === 0) {
        return {
            caracteres: 0,
            mots: 0,
            phrases: 0,
            voyelles: 0,
            consonnes: 0
        };
    }
    
    let caracteres = texte.length;
    let mots = texte.trim().split(/\s+/).length;
    let phrases = texte.split(/[.!?]+/).filter(phrase => phrase.trim().length > 0).length;
    
    let voyelles = 0;
    let consonnes = 0;
    let voyesPossibles = "aeiouAEIOU";
    
    for (let char of texte) {
        if (char >= 'A' && char <= 'Z' || char >= 'a' && char <= 'z') {
            if (voyesPossibles.includes(char)) {
                voyelles++;
            } else {
                consonnes++;
            }
        }
    }
    
    return {
        caracteres,
        mots,
        phrases,
        voyelles,
        consonnes
    };
}

// Test
let texte = "Bonjour! Comment allez-vous? J'espère que tout va bien.";
let analyse = analyserTexte(texte);

console.log("Analyse du texte:");
console.log(`Caractères: ${analyse.caracteres}`);
console.log(`Mots: ${analyse.mots}`);
console.log(`Phrases: ${analyse.phrases}`);
console.log(`Voyelles: ${analyse.voyelles}`);
console.log(`Consonnes: ${analyse.consonnes}`);
```

## Bonnes pratiques

### ✅ Lisibilité
- Utiliser des noms de variables descriptifs
- Indenter correctement le code
- Commenter les conditions complexes

### ✅ Performance
- Éviter les boucles infinies
- Utiliser `break` et `continue` judicieusement
- Préférer `for...of` pour parcourir les tableaux

### ✅ Logique
- Simplifier les conditions when possible
- Éviter l'imbrication excessive
- Tester tous les cas possibles

### ✅ Maintenance
- Utiliser des constantes pour les valeurs magiques
- Extraire les conditions complexes dans des fonctions
- Documenter les algorithmes non triviaux

