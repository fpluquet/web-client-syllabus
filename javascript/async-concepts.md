# 10.1 Programmation Asynchrone : Concepts Avancés

## Introduction à la Programmation Asynchrone

La programmation asynchrone représente l'un des paradigmes les plus fondamentaux et les plus puissants du développement JavaScript moderne. Dans un monde où les applications web doivent gérer des milliers d'interactions simultanées, des requêtes réseau complexes et des interfaces utilisateur réactives, la maîtrise de l'asynchrone devient indispensable.

Contrairement aux langages traditionnels où l'exécution suit un modèle linéaire et bloquant, JavaScript embrasse un modèle événementiel non-bloquant qui permet d'orchestrer des opérations complexes sans jamais figer l'interface utilisateur. Cette approche transforme radicalement la façon dont nous concevons et développons les applications.

L'importance de cette maîtrise ne peut être sous-estimée : requêtes API, chargement de ressources, animations fluides, interactions temps réel, tout l'écosystème web moderne repose sur une gestion sophistiquée de l'asynchrone. Sans cette compréhension, les développeurs se retrouvent rapidement limités dans leurs capacités à créer des expériences utilisateur modernes et performantes.

Dans ce chapitre, nous explorerons non seulement les mécanismes techniques, mais aussi les patterns architecturaux et les bonnes pratiques qui permettent de construire des applications robustes et maintenables.

## Event Loop et Modèle d'Exécution JavaScript

### Comprendre l'Event Loop

L'Event Loop constitue le cœur du modèle d'exécution JavaScript. Cette boucle événementielle orchestrate l'exécution du code de manière non-bloquante, permettant au navigateur de rester réactif même pendant des opérations complexes.

Pour comprendre l'Event Loop, il faut savoir que JavaScript traite les tâches dans un ordre précis :
1. **Code synchrone** : exécuté immédiatement
2. **Microtasks** : Promises, queueMicrotask (priorité haute)
3. **Macrotasks** : setTimeout, setInterval, événements DOM

```javascript
// Démonstration simple de l'ordre d'exécution
console.log('🚀 Démonstration de l\'Event Loop');

// Code synchrone - va directement dans la call stack
console.log('1. Code synchrone - Call Stack');

// Timeout - va dans les Web APIs puis Task Queue
setTimeout(() => {
    console.log('4. setTimeout - Task Queue → Call Stack');
}, 0);

// Promise - va dans la Microtask Queue
Promise.resolve().then(() => {
    console.log('3. Promise - Microtask Queue → Call Stack');
});

// Plus de code synchrone
console.log('2. Plus de code synchrone - Call Stack');

// Les microtasks sont traitées avant les tasks
queueMicrotask(() => {
    console.log('3.5. queueMicrotask - Microtask Queue → Call Stack');
});

// Résultat attendu :
// 1. Code synchrone - Call Stack
// 2. Plus de code synchrone - Call Stack
// 3. Promise - Microtask Queue → Call Stack
// 3.5. queueMicrotask - Microtask Queue → Call Stack
// 4. setTimeout - Task Queue → Call Stack
```

### Exemple avec priorités d'exécution

Voici un exemple plus détaillé pour comprendre les priorités :

```javascript
console.log('🔄 Démonstration des priorités d\'exécution');

// Macro-task (timer)
setTimeout(() => console.log('Macro-task 1'), 0);

// Micro-task (Promise)
Promise.resolve().then(() => console.log('Micro-task 1'));

// Code synchrone
console.log('Code synchrone 1');

// Autre macro-task
setTimeout(() => console.log('Macro-task 2'), 0);

// Autre micro-task avec chaînage
Promise.resolve().then(() => {
    console.log('Micro-task 2');
    // Micro-task créée dans une micro-task
    return Promise.resolve();
}).then(() => console.log('Micro-task 3'));

// Plus de code synchrone
console.log('Code synchrone 2');

// Résultat attendu :
// Code synchrone 1
// Code synchrone 2
// Micro-task 1
// Micro-task 2
// Micro-task 3
// Macro-task 1
// Macro-task 2
```

### Pile d'Exécution et Files d'Attente

La compréhension du modèle d'exécution JavaScript nécessite de saisir l'interaction entre plusieurs composants critiques :

#### Démonstration avec une fonction récursive

```javascript
// Fonction récursive pour montrer la call stack
function factorielle(n, depth = 0) {
    const indent = '  '.repeat(depth);
    console.log(`${indent}→ Calcul factorielle(${n})`);
    
    if (n <= 1) {
        console.log(`${indent}← Retour: 1`);
        return 1;
    }
    
    const result = n * factorielle(n - 1, depth + 1);
    console.log(`${indent}← Retour: ${result}`);
    return result;
}

// Démonstration d'exécution synchrone vs asynchrone
console.log('📊 Démonstration d\'exécution synchrone vs asynchrone');

// 1. Opération synchrone bloquante
console.log('1. Début opération synchrone');
const result = factorielle(5);
console.log(`Résultat: ${result}`);

// 2. Opération asynchrone non-bloquante
console.log('2. Lancement opération asynchrone');
executerOperationAvecCallback();

console.log('3. Continuation code synchrone');
```

#### Exemple simple avec setTimeout

```javascript
// Exemple simple d'opération asynchrone avec callback
function simulationOperationLongue(callback) {
    console.log("🌐 Début d'une opération longue...");
    
    setTimeout(() => {
        const success = Math.random() > 0.2; // 80% de succès
        
        if (success) {
            const data = { 
                message: "Opération réussie", 
                timestamp: Date.now(), 
                duration: "2 secondes"
            };
            console.log("✅ Opération terminée avec succès");
            callback(null, data); // Premier paramètre = erreur (null = pas d'erreur)
        } else {
            console.log("❌ Opération échouée");
            callback("Erreur lors de l'opération", null);
        }
    }, 2000);
}

// Utilisation de l'opération asynchrone
function executerOperationAvecCallback() {
    console.log("Début du test d'opération asynchrone");
    
    simulationOperationLongue((erreur, resultat) => {
        if (erreur) {
            console.error("🚨 Erreur reçue:", erreur);
        } else {
            console.log("📦 Données reçues:", resultat);
        }
    });
    
    console.log("Cette ligne s'affiche immédiatement (code non-bloquant)");
}

// Lancer l'exemple
executerOperationAvecCallback();
```

## Callbacks (fonctions de rappel)

### Comprendre les Callbacks

Un callback est une fonction passée en paramètre à une autre fonction, qui sera appelée plus tard. Cette approche constitue la base de la programmation asynchrone en JavaScript et permet de définir ce qui doit se passer une fois qu'une opération asynchrone est terminée.

Le terme "callback" vient de l'anglais "call back" qui signifie "rappeler". En effet, nous "rappelons" une fonction une fois qu'une tâche asynchrone est accomplie. Cette technique permet au code de continuer son exécution sans attendre la fin de l'opération, évitant ainsi de bloquer l'interface utilisateur.

L'avantage principal des callbacks est leur simplicité conceptuelle : vous définissez une fonction qui sera exécutée quand quelque chose se produit. C'est un pattern très naturel qui correspond à notre façon de penser : "quand tu auras fini de faire ceci, alors fais cela".

### Concept de base

Un callback est simplement une fonction que nous passons comme argument à une autre fonction. Cette fonction sera exécutée à un moment ultérieur, généralement lorsqu'une opération asynchrone se termine.

```javascript
function operationAsynchrone(callback) {
    console.log("Début de l'opération...");
    
    setTimeout(() => {
        console.log("Opération terminée");
        callback("Résultat de l'opération");
    }, 1000);
}

function traiterResultat(resultat) {
    console.log("Traitement du résultat:", resultat);
}

// Utilisation
operationAsynchrone(traiterResultat);
```

Dans cet exemple, `traiterResultat` est notre callback. Elle sera appelée automatiquement une fois que l'opération asynchrone (ici simulée par `setTimeout`) sera terminée. Pendant ce temps, le reste du code peut continuer à s'exécuter.


### Exemple pratique : Chargement d'image avec explication détaillée

```javascript
function chargerImage(url, onSuccess, onError) {
    console.log(`📸 Début du chargement de l'image: ${url}`);
    
    // Création d'un nouvel élément Image
    let img = new Image();
    
    // Configuration du callback de succès
    img.onload = function() {
        console.log(`✅ Image chargée avec succès`);
        console.log(`   Dimensions: ${img.width}x${img.height}px`);
        onSuccess(img);
    };
    
    // Configuration du callback d'erreur
    img.onerror = function() {
        console.log(`❌ Erreur lors du chargement de l'image`);
        onError("Impossible de charger l'image");
    };
    
    // Démarrage du chargement (opération asynchrone)
    img.src = url;
    console.log(`⏳ Chargement en cours...`);
}

// Fonctions de callback
function surSucces(image) {
    console.log("🎉 Traitement de l'image réussie");
    // Ajouter l'image à la page
    document.body.appendChild(image);
}

function surErreur(messageErreur) {
    console.error("💥 Gestion de l'erreur:", messageErreur);
    // Afficher un message d'erreur à l'utilisateur
    const messageDiv = document.createElement('div');
    messageDiv.textContent = `Erreur: ${messageErreur}`;
    messageDiv.style.color = 'red';
    document.body.appendChild(messageDiv);
}

// Utilisation avec callbacks explicites
console.log("=== Exemple de chargement d'image ===");
chargerImage("https://via.placeholder.com/300x200", surSucces, surErreur);
```

### Multiple callbacks et leur ordre d'exécution

```javascript
function operationMultipleCallbacks() {
    console.log("🔄 Démonstration de callbacks multiples");
    
    // Premier callback - délai court
    setTimeout(() => {
        console.log("1️⃣ Premier callback (100ms)");
    }, 100);
    
    // Deuxième callback - délai plus long
    setTimeout(() => {
        console.log("3️⃣ Troisième callback (300ms)");
    }, 300);
    
    // Troisième callback - délai moyen
    setTimeout(() => {
        console.log("2️⃣ Deuxième callback (200ms)");
    }, 200);
    
    console.log("🚀 Tous les callbacks ont été programmés");
    // Ce message apparaît en premier car le code synchrone s'exécute avant les callbacks
}

operationMultipleCallbacks();
```

### Problème : Callback Hell

Bien que les callbacks soient puissants, ils présentent un problème majeur quand les opérations asynchrones s'enchaînent : le "Callback Hell" ou "Pyramid of Doom". Ce phénomène se produit quand nous devons effectuer plusieurs opérations asynchrones qui dépendent les unes des autres.

```javascript
// ❌ Code difficile à lire et maintenir
obtenirUtilisateur(userId, function(utilisateur) {
    obtenirCommandes(utilisateur.id, function(commandes) {
        obtenirProduits(commandes[0].id, function(produits) {
            obtenirDetails(produits[0].id, function(details) {
                // Code imbriqué difficile à suivre
                console.log(details);
            });
        });
    });
});
```

Ce code devient rapidement illisible et difficile à maintenir. Chaque niveau d'imbrication ajoute de la complexité, et la gestion d'erreurs devient un véritable cauchemar. C'est exactement le problème que les Promises viennent résoudre.


## Promises (Promesses)

### Comprendre les Promises

Les Promises représentent une révolution dans la gestion de l'asynchrone en JavaScript. Elles ont été introduites pour résoudre les problèmes des callbacks, notamment le "Callback Hell", en offrant une syntaxe plus claire et une meilleure gestion des erreurs.

Une Promise est un objet qui représente l'achèvement éventuel (ou l'échec) d'une opération asynchrone et sa valeur résultante. Pensez à une Promise comme à un "contrat" : elle promet qu'une valeur sera disponible à un moment donné dans le futur, ou qu'une erreur sera signalée si quelque chose se passe mal.

L'analogie souvent utilisée est celle d'une commande au restaurant : quand vous commandez, le serveur vous donne un ticket (la Promise). Ce ticket représente votre plat qui sera prêt plus tard. Vous pouvez continuer à discuter pendant que la cuisine prépare votre commande. Quand c'est prêt, soit vous recevez votre plat (resolve), soit on vous informe qu'il y a un problème (reject).

### Concept
Une Promise représente une valeur qui sera disponible maintenant, plus tard, ou jamais. C'est un objet qui encapsule le résultat d'une opération asynchrone.

```javascript
// Création d'une Promise simple
let promesse = new Promise((resolve, reject) => {
    console.log("⏳ Début de l'opération asynchrone...");
    
    // Simulation d'une opération qui prend du temps
    setTimeout(() => {
        let succes = Math.random() > 0.5; // 50% de chance de succès
        
        if (succes) {
            resolve("✅ Opération réussie!");
        } else {
            reject("❌ Opération échouée!");
        }
    }, 1000);
});

console.log("🚀 Promise créée, mais pas encore résolue");
```

### États d'une Promise

Une Promise peut être dans l'un de ces trois états :
- **Pending** : en attente (état initial)
- **Fulfilled** : résolue avec succès (resolve appelé)
- **Rejected** : rejetée avec une erreur (reject appelé)

```javascript
// Démonstration des différents états
function demonstrerEtatsPromise() {
    console.log("=== États d'une Promise ===");
    
    // Promise qui réussit
    let promiseSucces = new Promise(resolve => {
        setTimeout(() => resolve("Succès !"), 1000);
    });
    
    // Promise qui échoue
    let promiseEchec = new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error("Échec !")), 1500);
    });
    
    // Promise en attente (jamais résolue)
    let promiseAttente = new Promise(() => {
        // Jamais resolve() ni reject() - reste en "pending"
        console.log("Cette promise restera en attente...");
    });
    
    console.log("État initial promiseSucces:", promiseSucces); // [object Promise]
    console.log("État initial promiseEchec:", promiseEchec);   // [object Promise]
}

demonstrerEtatsPromise();
```

### Utilisation avec `.then()` et `.catch()`

La vraie puissance des Promises réside dans leur capacité à être chaînées avec `.then()` pour traiter le succès et `.catch()` pour gérer les erreurs :

```javascript
// Utilisation de la promise créée précédemment
promesse
    .then(function(resultat) {
        console.log("Succès:", resultat);
        return "Traitement suivant";
    })
    .then(function(nouveauResultat) {
        console.log("Étape 2:", nouveauResultat);
    })
    .catch(function(erreur) {
        console.error("Erreur:", erreur);
    })
    .finally(function() {
        console.log("Nettoyage final");
    });
```

### Exemple pratique : Simulation d'opérations réseau

Maintenant que nous comprenons les Promises, voici un exemple pratique de simulation de requêtes réseau :

```javascript
// Simulation simple d'une requête réseau
function simulateNetworkRequest(url, delay) {
    return new Promise((resolve, reject) => {
        console.log(`🌐 Requête vers ${url} initiée`);
        
        setTimeout(() => {
            const success = Math.random() > 0.2; // 80% de succès
            
            if (success) {
                const data = { 
                    url, 
                    timestamp: Date.now(), 
                    size: Math.floor(Math.random() * 1000) 
                };
                console.log(`✅ Requête ${url} réussie`);
                resolve(data);
            } else {
                console.log(`❌ Requête ${url} échouée`);
                reject(new Error(`Erreur réseau pour ${url}`));
            }
        }, delay);
    });
}

// Orchestration de plusieurs requêtes
function simulateNetworkRequests() {
    const urls = [
        'https://api.exemple.com/users',
        'https://api.exemple.com/products', 
        'https://api.exemple.com/orders'
    ];

    urls.forEach((url, index) => {
        simulateNetworkRequest(url, (index + 1) * 300)
            .then(data => {
                console.log(`📦 Données reçues de ${url}:`, data);
            })
            .catch(error => {
                console.error(`🚨 Erreur pour ${url}:`, error.message);
            });
    });
}

// Lancer l'exemple
simulateNetworkRequests();
```

### Chaînage de Promises

L'un des avantages majeurs des Promises est leur capacité à être chaînées de manière élégante. Contrairement aux callbacks qui créent une pyramide d'imbrication, les Promises permettent un code linéaire et lisible, même pour des opérations complexes en séquence.

#### Mécanisme de chaînage et passage de données

Chaque appel à `.then()` retourne une nouvelle Promise, ce qui permet d'enchaîner les opérations. La valeur retournée par un `.then()` devient automatiquement la valeur d'entrée du `.then()` suivant. C'est ce qu'on appelle le "pipeline de données".

```javascript
function etape1() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Étape 1 en cours...");
            resolve("Données de l'étape 1");
        }, 1000);
    });
}

function etape2(donneesEtape1) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Étape 2 en cours, reçu:", donneesEtape1);
            resolve(donneesEtape1 + " -> Étape 2 terminée");
        }, 1000);
    });
}

function etape3(donneesEtape2) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Étape 3 en cours, reçu:", donneesEtape2);
            resolve(donneesEtape2 + " -> Étape 3 terminée");
        }, 1000);
    });
}

// Chaînage fluide avec passage de données
etape1()
    .then(donneesEtape1 => {
        console.log("Résultat étape 1:", donneesEtape1);
        return etape2(donneesEtape1); // Passe les données à l'étape suivante
    })
    .then(donneesEtape2 => {
        console.log("Résultat étape 2:", donneesEtape2);
        return etape3(donneesEtape2); // Passe les données à l'étape suivante
    })
    .then(resultatFinal => {
        console.log("Résultat final:", resultatFinal);
    })
    .catch(erreur => {
        console.error("Une étape a échoué:", erreur);
    });
```

#### Transformation de données dans le chaînage

Vous pouvez également transformer les données à chaque étape sans nécessairement appeler une nouvelle fonction asynchrone :

```javascript
// Exemple de transformation de données
fetch('/api/utilisateur/123')
    .then(response => {
        console.log("Réponse reçue, statut:", response.status);
        return response.json(); // Transformation en JSON
    })
    .then(utilisateur => {
        console.log("Utilisateur reçu:", utilisateur.nom);
        // Transformation : extraction du nom en majuscules
        return utilisateur.nom.toUpperCase();
    })
    .then(nomMajuscules => {
        console.log("Nom transformé:", nomMajuscules);
        // Transformation : création d'un message
        return `Bonjour ${nomMajuscules}!`;
    })
    .then(message => {
        console.log("Message final:", message);
        document.getElementById('accueil').textContent = message;
    })
    .catch(erreur => {
        console.error("Erreur dans la chaîne:", erreur);
    });
```

#### Fonctionnement du .catch() - Gestionnaire d'erreurs global

Le `.catch()` est un filet de sécurité qui attrape **toute erreur** survenant dans **n'importe quel** `.then()` de la chaîne. Dès qu'une erreur se produit, l'exécution saute immédiatement au `.catch()`, en ignorant tous les `.then()` suivants.

```javascript
// Démonstration du comportement du .catch()
function etapeQuiPeutEchouer(donnees, probabiliteEchec = 0.3) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < probabiliteEchec) {
                reject(new Error(`Échec à l'étape avec: ${donnees}`));
            } else {
                resolve(donnees + " -> réussie");
            }
        }, 500);
    });
}

// Chaîne avec gestion d'erreurs
Promise.resolve("Début")
    .then(donnees => {
        console.log("Étape 1:", donnees);
        return etapeQuiPeutEchouer(donnees + " -> étape 1");
    })
    .then(donnees => {
        console.log("Étape 2:", donnees);
        return etapeQuiPeutEchouer(donnees + " -> étape 2");
    })
    .then(donnees => {
        console.log("Étape 3:", donnees);
        return etapeQuiPeutEchouer(donnees + " -> étape 3");
    })
    .then(donnees => {
        console.log("Étape 4:", donnees);
        return "Toutes les étapes réussies!";
    })
    .then(resultatFinal => {
        console.log("✅ Succès complet:", resultatFinal);
    })
    .catch(erreur => {
        console.error("❌ Erreur attrapée:", erreur.message);
        console.log("L'erreur peut provenir de n'importe quelle étape");
    });
```

#### Gestion d'erreurs avec récupération

**Concept clé :** Une des fonctionnalités les plus puissantes des Promises est la capacité de "récupérer" d'une erreur en retournant une valeur depuis un `.catch()`. Cela permet à la chaîne de continuer son exécution normale au lieu de s'arrêter complètement.

**Analogie :** Imaginez une chaîne de montage où une machine tombe en panne. Au lieu d'arrêter toute la production, un opérateur peut intervenir manuellement pour fournir une pièce de rechange et permettre à la chaîne de continuer.

**Mécanisme de récupération :**
- Quand un `.catch()` retourne une valeur (non rejetée), cette valeur devient le résultat "réussi" pour le prochain `.then()`
- La chaîne continue comme si l'erreur n'avait jamais eu lieu
- Seul un `.catch()` placé après la récupération peut capturer de nouvelles erreurs

```javascript
// Chaîne avec récupération d'erreurs
Promise.resolve("Début")
    .then(donnees => {
        console.log("Étape 1:", donnees);
        return etapeQuiPeutEchouer(donnees, 0.8); // 80% de chance d'échec
    })
    .catch(erreur => {
        console.log("Erreur étape 1, utilisation valeur par défaut");
        // ⚡ POINT CLÉ: Retourner une valeur = récupération réussie
        return "Valeur de récupération"; // La chaîne continue avec cette valeur
    })
    .then(donnees => {
        console.log("Étape 2 (après récupération):", donnees);
        // Cette étape s'exécute même si l'étape 1 a échoué
        return donnees + " -> étape 2 réussie";
    })
    .then(resultatFinal => {
        console.log("✅ Résultat final:", resultatFinal);
        // Affiche: "Valeur de récupération -> étape 2 réussie"
    })
    .catch(erreur => {
        // Ce catch ne se déclenchera que si l'étape 2 ou 3 échoue
        console.error("❌ Erreur finale non récupérée:", erreur);
    });
```

**Explication détaillée du flux :**

**Scénario A - Étape 1 échoue (80% de probabilité) :**
1. **Étape 1 échoue** → le premier `.catch()` intervient immédiatement
2. **Récupération** → le `.catch()` retourne "Valeur de récupération"
3. **Continuation** → le prochain `.then()` reçoit cette valeur de récupération
4. **Fin normale** → la chaîne se termine avec succès

**Scénario B - Étape 1 réussit (20% de probabilité) :**
1. **Étape 1 réussit** → retourne la valeur "Début" modifiée
2. **Saut du .catch()** → le `.catch()` est ignoré car il n'y a pas d'erreur
3. **Continuation directe** → le `.then()` suivant reçoit directement le résultat de l'étape 1
4. **Fin normale** → la chaîne se termine avec la valeur originale transformée

**⚡ Point clé :** Le `.catch()` n'est exécuté que s'il y a une erreur. En cas de succès, la chaîne continue normalement en ignorant complètement le `.catch()`.

**Applications pratiques :**
- **Valeurs par défaut** : Utiliser une configuration par défaut si le chargement échoue
- **Fallback d'API** : Essayer une API de secours si la principale est indisponible
- **Cache local** : Utiliser des données en cache si la requête réseau échoue

#### Chaînage raccourci avec syntaxe compacte

Quand vous passez directement une fonction qui retourne une Promise, vous pouvez utiliser une syntaxe plus compacte :

```javascript
// Syntaxe compacte
etape1()
    .then(etape2)  // Équivalent à: .then(donnees => etape2(donnees))
    .then(etape3)  // Équivalent à: .then(donnees => etape3(donnees))
    .then(resultatFinal => {
        console.log("Résultat final:", resultatFinal);
    })
    .catch(erreur => {
        console.error("Une étape a échoué:", erreur);
    });
```

**Points clés à retenir :**
- Chaque `.then()` reçoit la valeur retournée par le `.then()` précédent
- Le `.catch()` attrape les erreurs de **tous** les `.then()` de la chaîne
- Une fois qu'une erreur est attrapée et gérée, la chaîne peut continuer
- Si vous ne retournez rien dans un `.then()`, la valeur `undefined` est passée au suivant

## Async/Await

### La Révolution Syntaxique

`async/await` représente l'évolution la plus récente et la plus élégante de la programmation asynchrone en JavaScript. Introduite avec ES2017, cette syntaxe transforme radicalement la façon dont nous écrivons du code asynchrone, le rendant aussi lisible que du code synchrone traditionnel.

La beauté d'`async/await` réside dans sa simplicité : elle permet d'écrire du code asynchrone qui se lit de haut en bas, comme du code synchrone, tout en conservant tous les avantages de la programmation non-bloquante. Fini les chaînes de `.then()` et les callbacks imbriqués - le code devient linéaire et intuitif.

### Syntaxe moderne
`async/await` rend le code asynchrone plus lisible :

```javascript
async function operationComplexe() {
    try {
        console.log("Début des opérations...");
        
        let resultat1 = await etape1();
        console.log("Étape 1:", resultat1);
        
        let resultat2 = await etape2(resultat1);
        console.log("Étape 2:", resultat2);
        
        let resultatFinal = await etape3(resultat2);
        console.log("Résultat final:", resultatFinal);
        
        return resultatFinal;
        
    } catch (erreur) {
        console.error("Erreur dans l'opération:", erreur);
        throw erreur; // Re-lancer l'erreur si nécessaire
    }
}

// Utilisation
operationComplexe()
    .then(resultat => console.log("Tout s'est bien passé:", resultat))
    .catch(erreur => console.log("Quelque chose a mal tourné:", erreur));
```

### Comparaison : Promises vs Async/Await

#### Avec Promises
```javascript
function obtenirDonneesUtilisateur(userId) {
    return obtenirUtilisateur(userId)
        .then(utilisateur => {
            return obtenirProfil(utilisateur.id);
        })
        .then(profil => {
            return obtenirPreferences(profil.id);
        })
        .then(preferences => {
            return {
                utilisateur: utilisateur,
                profil: profil,
                preferences: preferences
            };
        })
        .catch(erreur => {
            console.error("Erreur:", erreur);
            throw erreur;
        });
}
```

#### Avec Async/Await
```javascript
async function obtenirDonneesUtilisateur(userId) {
    try {
        let utilisateur = await obtenirUtilisateur(userId);
        let profil = await obtenirProfil(utilisateur.id);
        let preferences = await obtenirPreferences(profil.id);
        
        return {
            utilisateur: utilisateur,
            profil: profil,
            preferences: preferences
        };
    } catch (erreur) {
        console.error("Erreur:", erreur);
        throw erreur;
    }
}
```

## Gestion d'erreurs

### Importance de la Gestion d'Erreurs

Dans la programmation asynchrone, la gestion d'erreurs devient cruciale car les erreurs peuvent survenir à tout moment et de manière imprévisible. Contrairement au code synchrone où les erreurs se propagent naturellement dans la pile d'appels, les erreurs asynchrones nécessitent une attention particulière pour éviter qu'elles ne passent inaperçues.

Une erreur non gérée dans du code asynchrone peut causer des comportements inattendus dans votre application : interfaces qui ne se mettent pas à jour, données qui ne se chargent pas, ou pire, des fuites mémoire. C'est pourquoi maîtriser les différentes techniques de gestion d'erreurs est essentiel.

### Try/Catch avec Async/Await
```javascript
async function operationAvecGestionErreurs() {
    try {
        let resultat = await operationRisquee();
        console.log("Succès:", resultat);
        return resultat;
    } catch (erreur) {
        if (erreur.code === 'NETWORK_ERROR') {
            console.log("Erreur réseau, nouvelle tentative...");
            return await operationRisquee(); // Retry
        } else {
            console.error("Erreur non gérée:", erreur);
            throw erreur;
        }
    }
}
```

### Finally pour le nettoyage

Le bloc `finally` est particulièrement utile dans la programmation asynchrone pour garantir qu'une action de nettoyage sera toujours exécutée, qu'il y ait eu succès ou échec. Ceci est crucial pour éviter les fuites de ressources.

```javascript
async function operationAvecNettoyage() {
    let ressource = null;
    
    try {
        ressource = await acquerirRessource();
        let resultat = await traiterRessource(ressource);
        return resultat;
    } catch (erreur) {
        console.error("Erreur de traitement:", erreur);
        throw erreur;
    } finally {
        // Toujours exécuté, même en cas d'erreur
        if (ressource) {
            await libererRessource(ressource);
            console.log("Ressource libérée");
        }
    }
}
```

## Opérations parallèles

### Optimiser les Performances avec le Parallélisme

L'un des aspects les plus puissants de la programmation asynchrone est la capacité d'exécuter plusieurs opérations en parallèle. Au lieu d'attendre qu'une opération se termine avant de commencer la suivante, nous pouvons lancer plusieurs opérations simultanément et traiter leurs résultats quand ils arrivent.

JavaScript offre plusieurs méthodes pour gérer les opérations parallèles, chacune adaptée à des situations spécifiques. Le choix de la bonne méthode dépend de vos besoins : voulez-vous que toutes les opérations réussissent, ou pouvez-vous continuer même si certaines échouent ?

### Promise.all() - Toutes les promesses doivent réussir
```javascript
async function chargerToutesDonnees() {
    try {
        let [utilisateurs, produits, commandes] = await Promise.all([
            chargerUtilisateurs(),
            chargerProduits(),
            chargerCommandes()
        ]);
        
        console.log("Toutes les données chargées:");
        console.log("Utilisateurs:", utilisateurs.length);
        console.log("Produits:", produits.length);
        console.log("Commandes:", commandes.length);
        
        return { utilisateurs, produits, commandes };
    } catch (erreur) {
        console.error("Erreur lors du chargement:", erreur);
    }
}
```

### Promise.allSettled() - Attend toutes les promesses

`Promise.allSettled()` est parfait quand vous voulez exécuter plusieurs opérations en parallèle et obtenir tous les résultats, même si certaines échouent. Cette méthode attend que toutes les promesses se terminent (qu'elles réussissent ou échouent) et retourne un tableau avec le statut de chacune.

```javascript
async function chargerDonneesPartiellesOK() {
    let resultats = await Promise.allSettled([
        chargerUtilisateurs(),
        chargerProduits(),
        chargerCommandes()
    ]);
    
    resultats.forEach((resultat, index) => {
        if (resultat.status === 'fulfilled') {
            console.log(`Données ${index} chargées:`, resultat.value);
        } else {
            console.error(`Échec données ${index}:`, resultat.reason);
        }
    });
}
```

### Promise.race() - Première promesse qui se termine

`Promise.race()` est utile quand vous voulez la réponse de la première opération qui se termine, qu'elle réussisse ou échoue. C'est particulièrement pratique pour implémenter des timeouts ou choisir entre plusieurs sources de données.

```javascript
async function operationAvecTimeout() {
    try {
        let resultat = await Promise.race([
            operationLongue(),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Timeout')), 5000)
            )
        ]);
        
        return resultat;
    } catch (erreur) {
        if (erreur.message === 'Timeout') {
            console.log("Opération annulée (timeout)");
        } else {
            console.error("Autre erreur:", erreur);
        }
    }
}
```

## Exemple pratique complet

### Simulation d'API avec gestion d'erreurs

```javascript
// Fonction utilitaire pour simuler une API
function simulerAPI(donnees, delai = 1000, tauxEchec = 0.1) {
    return new Promise((resolve, reject) => {
        console.log(`🌐 Appel API en cours...`);
        
        setTimeout(() => {
            if (Math.random() < tauxEchec) {
                reject(new Error("Erreur API simulée"));
            } else {
                console.log(`✅ API répond après ${delai}ms`);
                resolve(donnees);
            }
        }, delai);
    });
}
```

### Exemple complet : Chargement de données utilisateur

```javascript
// Fonctions séparées pour chaque type de données
async function chargerUtilisateur(id) {
    console.log(`Chargement utilisateur ${id}...`);
    return await simulerAPI({ 
        id, 
        nom: `Utilisateur ${id}`, 
        email: `user${id}@exemple.com` 
    });
}

async function chargerProfil(userId) {
    console.log(`Chargement profil pour utilisateur ${userId}...`);
    return await simulerAPI({ 
        userId, 
        bio: "Une bio intéressante", 
        avatar: "avatar.jpg" 
    });
}

async function chargerCommandes(userId) {
    console.log(`Chargement commandes pour utilisateur ${userId}...`);
    return await simulerAPI([
        { id: 1, produit: "Produit A", prix: 29.99 },
        { id: 2, produit: "Produit B", prix: 49.99 }
    ]);
}

// Fonction principale qui orchestre tout
async function chargerToutesLesDonnees(userId) {
    try {
        console.log("🚀 Début du chargement des données...");
        
        // Chargement séquentiel de l'utilisateur d'abord
        let utilisateur = await chargerUtilisateur(userId);
        console.log("✅ Utilisateur chargé:", utilisateur.nom);
        
        // Chargement parallèle du profil et des commandes
        let [profil, commandes] = await Promise.all([
            chargerProfil(userId),
            chargerCommandes(userId)
        ]);
        
        console.log("✅ Profil et commandes chargés");
        
        // Calcul du total des commandes
        const totalCommandes = commandes.reduce((sum, cmd) => sum + cmd.prix, 0);
        
        return {
            utilisateur,
            profil,
            commandes,
            totalCommandes
        };
        
    } catch (erreur) {
        console.error("❌ Erreur lors du chargement:", erreur.message);
        throw erreur;
    }
}

// Utilisation de l'exemple complet
async function executerExemple() {
    try {
        let donnees = await chargerToutesLesDonnees(123);
        console.log("📊 Données complètes:", donnees);
        console.log(`💰 Total des commandes: ${donnees.totalCommandes.toFixed(2)}€`);
    } catch (erreur) {
        console.log("🚨 Impossible de charger les données");
    }
}

// Lancer l'exemple
executerExemple();
```

### Exemple avec retry automatique

```javascript
// Fonction avec mécanisme de retry
async function chargerAvecRetry(operation, maxTentatives = 3) {
    let tentative = 0;
    
    while (tentative < maxTentatives) {
        try {
            tentative++;
            console.log(`Tentative ${tentative}/${maxTentatives}`);
            
            const resultat = await operation();
            console.log(`✅ Succès à la tentative ${tentative}`);
            return resultat;
            
        } catch (erreur) {
            console.log(`❌ Échec tentative ${tentative}: ${erreur.message}`);
            
            if (tentative >= maxTentatives) {
                console.log(`🚨 Abandon après ${maxTentatives} tentatives`);
                throw erreur;
            }
            
            // Attendre avant la prochaine tentative
            await new Promise(resolve => setTimeout(resolve, 1000 * tentative));
        }
    }
}

// Utilisation avec retry
async function exempleAvecRetry() {
    try {
        const donnees = await chargerAvecRetry(() => 
            simulerAPI({ message: "Données importantes" }, 500, 0.7) // 70% d'échec
        );
        console.log("Données reçues:", donnees);
    } catch (erreur) {
        console.log("Impossible de récupérer les données malgré les tentatives");
    }
}

// Lancer l'exemple avec retry
exempleAvecRetry();
```

## Bonnes pratiques

### Recommandations Essentielles

La maîtrise de la programmation asynchrone ne se limite pas à connaître la syntaxe - elle nécessite de comprendre les bonnes pratiques qui garantissent un code robuste, maintenable et performant. Ces recommandations sont le fruit de l'expérience collective de la communauté JavaScript.

### ✅ Gestion d'erreurs
- Toujours utiliser try/catch avec async/await
- Gérer les cas d'erreur spécifiques
- Prévoir des mécanismes de retry si nécessaire

### ✅ Performance
- Utiliser Promise.all() pour les opérations parallèles
- Éviter d'attendre inutilement des opérations indépendantes
- Implémenter des timeouts pour éviter les blocages

### ✅ Lisibilité
- Préférer async/await aux callbacks
- Utiliser des noms de fonction explicites
- Documenter les opérations asynchrones complexes

### ✅ Debugging
- Utiliser console.log pour tracer l'exécution
- Tester les cas d'erreur
- Utiliser les outils de développement du navigateur

### ✅ Architecture et Organisation

- **Séparer les responsabilités** : Une fonction = une responsabilité
- **Éviter les fonctions trop longues** : Diviser en petites fonctions spécialisées
- **Utiliser des noms explicites** : `chargerDonneesUtilisateur()` plutôt que `getData()`
- **Documenter les opérations complexes** : Expliquer pourquoi, pas seulement comment

### ✅ Optimisation et Performance

- **Éviter les await inutiles** : Ne pas attendre si vous n'utilisez pas immédiatement le résultat
- **Utiliser le cache intelligent** : Éviter les requêtes répétitives
- **Implémenter la pagination** : Pour les grandes quantités de données
- **Prévoir des fallbacks** : Plans B en cas d'échec des opérations principales

