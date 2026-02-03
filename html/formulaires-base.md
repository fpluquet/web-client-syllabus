# 2.1 Éléments de base des formulaires

## Introduction aux formulaires HTML

Les formulaires HTML constituent un élément central du web interactif moderne. Ils représentent le principal moyen de communication bidirectionnelle entre les utilisateurs et les applications web, permettant la collecte, la validation et la transmission de données.

### Qu'est-ce qu'un formulaire web ?

Un formulaire web est une interface utilisateur composée d'éléments interactifs (champs de saisie, boutons, listes déroulantes) qui permettent aux visiteurs de saisir et soumettre des informations. Ces données sont ensuite traitées par le serveur ou par du code JavaScript côté client.

### Rôle et importance des formulaires

**Communication utilisateur-serveur :** Les formulaires établissent un pont entre l'interface utilisateur et les systèmes backend, permettant aux utilisateurs d'envoyer des données (texte, fichiers, sélections) qui seront traitées et stockées.

**Collecte de données structurées :** Contrairement au simple affichage d'informations, les formulaires permettent de collecter des données selon une structure prédéfinie, avec des types de champs spécifiques (email, numérique, date) qui facilitent la validation et le traitement.

**Interactivité et engagement :** Les formulaires transforment un site web statique en une application interactive, permettant aux utilisateurs de s'inscrire, se connecter, commander, commenter, rechercher, ou effectuer toute action nécessitant une saisie.

### Cas d'usage courants

- **Authentification :** Connexion et inscription d'utilisateurs
- **Commerce électronique :** Commandes, paiements, gestion de profil
- **Communication :** Formulaires de contact, commentaires, support client
- **Recherche :** Moteurs de recherche internes, filtres
- **Gestion de contenu :** Publication d'articles, upload de fichiers
- **Collecte de données :** Enquêtes, sondages, formulaires d'inscription

### Architecture d'un formulaire

Un formulaire HTML s'articule autour de plusieurs composants essentiels :

1. **Le conteneur `<form>`** : Définit les limites du formulaire et spécifie comment et où envoyer les données
2. **Les champs de saisie** : Différents types d'inputs adaptés aux données à collecter
3. **Les labels** : Étiquettes descriptives associées aux champs pour l'accessibilité et l'expérience utilisateur
4. **Les boutons d'action** : Soumission, réinitialisation, ou actions personnalisées
5. **La validation** : Contrôles côté client et serveur pour s'assurer de la qualité des données

Les formulaires HTML permettent aux utilisateurs d'interagir avec votre site web en saisissant et soumettant des données. Ils sont essentiels pour les inscriptions, connexions, contacts, commandes, etc.

## Balise `<form>`

### Comprendre la balise `<form>`

La balise `<form>` est l'élément conteneur fondamental qui encapsule tous les éléments interactifs d'un formulaire. Elle joue un rôle crucial en définissant :

- **Le périmètre du formulaire** : Tous les champs situés entre `<form>` et `</form>` appartiennent au même formulaire
- **La destination des données** : Où les informations saisies seront envoyées lors de la soumission
- **La méthode de transmission** : Comment les données seront transportées vers le serveur
- **Le format d'encodage** : Comment les données seront structurées pendant le transport

### Méthodes HTTP : GET vs POST

Le choix de la méthode HTTP est crucial pour la sécurité et le fonctionnement de votre formulaire :

**Méthode GET :**
- Les données sont ajoutées à l'URL sous forme de paramètres
- Visible dans la barre d'adresse et l'historique de navigation
- Limitée en taille (environ 2000 caractères)
- Idéale pour les recherches et filtres
- Les données peuvent être mises en signet
- **Usage recommandé :** Recherches, filtres, navigation

**Méthode POST :**
- Les données sont envoyées dans le corps de la requête HTTP
- Invisibles dans l'URL
- Aucune limitation de taille pratique
- Plus sécurisée pour les données sensibles
- **Usage recommandé :** Connexions, inscriptions, envoi de fichiers, modifications de données

### Attribut `enctype` : Encodage des données

L'attribut `enctype` détermine comment les données du formulaire sont encodées avant l'envoi :

- **`application/x-www-form-urlencoded` (par défaut)** : Convient pour la plupart des formulaires textuels
- **`multipart/form-data`** : Obligatoire pour l'upload de fichiers
- **`text/plain`** : Rarement utilisé, principalement pour le débogage

### Structure de base
```html
<form action="traitement.php" method="POST">
    <!-- Éléments du formulaire -->
</form>
```

### Attributs principaux
- **`action`** : URL où envoyer les données
- **`method`** : méthode HTTP (`GET` ou `POST`)
- **`enctype`** : encodage des données (pour les fichiers)

```html
<!-- Formulaire simple -->
<form action="/contact" method="POST">
    <!-- Contenu du formulaire -->
</form>

<!-- Formulaire avec upload de fichiers -->
<form action="/upload" method="POST" enctype="multipart/form-data">
    <!-- Champs et input file -->
</form>
```

## Champs de saisie (`<input>`)

### Philosophie des types d'input

L'élément `<input>` est l'un des éléments les plus polyvalents d'HTML. Grâce à son attribut `type`, il peut se transformer en différents contrôles adaptés aux types de données à collecter. Cette approche sémantique présente plusieurs avantages :

**Validation automatique :** Le navigateur peut automatiquement valider le format des données (email, URL, numérique)
**Interface adaptée :** Sur mobile, le clavier s'adapte au type d'input (numérique pour `type="number"`, @ pour `type="email"')
**Accessibilité améliorée :** Les lecteurs d'écran peuvent mieux interpréter le contenu attendu
**Expérience utilisateur optimisée :** Interfaces natives (sélecteur de date, de couleur) selon le navigateur

### Principe de progressivité

Les types d'input HTML5 suivent le principe de **dégradation gracieuse** : si un navigateur ne reconnaît pas un type spécifique (comme `type="date"`), il revient automatiquement à un champ texte classique. Cela garantit la compatibilité tout en offrant une expérience enrichie sur les navigateurs modernes.

### Attributs universels des inputs

Tous les types d'input partagent certains attributs fondamentaux :

- **`name`** : Identifie le champ lors de l'envoi des données (clé dans la paire clé-valeur)
- **`value`** : Valeur par défaut ou actuelle du champ
- **`placeholder`** : Texte d'aide affiché quand le champ est vide
- **`required`** : Rend la saisie obligatoire
- **`disabled`** : Désactive le champ
- **`readonly`** : Empêche la modification tout en permettant la sélection

### Types de base

#### Comprendre les champs textuels

Les champs textuels constituent la base de la saisie utilisateur. Leur simplicité apparente cache une richesse de possibilités de validation et de formatage :

- **Texte simple**
```html
<input type="text" name="nom" placeholder="Votre nom">
<input type="text" name="prenom" value="Valeur par défaut" maxlength="50">
```

- **Email**
```html
<input type="email" name="email" placeholder="votre@email.com" required>
```

- **Mot de passe**
```html
<input type="password" name="motdepasse" minlength="8" required>
```

- **Numérique**
```html
<input type="number" name="age" min="0" max="120" step="1">
<input type="number" name="prix" min="0" step="0.01" placeholder="0.00">
```

- **Téléphone**
```html
<input type="tel" name="telephone" placeholder="01 23 45 67 89">
```

- **URL**
```html
<input type="url" name="siteWeb" placeholder="https://exemple.com">
```

### Types spécialisés

#### Date et heure
```html
<input type="date" name="dateNaissance">
<input type="datetime-local" name="rendezvous">
<input type="time" name="heure">
<input type="month" name="mois">
<input type="week" name="semaine">
```

#### Couleur
```html
<input type="color" name="couleurPreferee" value="#3498db">
```

#### Fichier
```html
<input type="file" name="document" accept=".pdf,.doc,.docx">
<input type="file" name="images" accept="image/*" multiple>
```

#### Plage (slider)
```html
<input type="range" name="volume" min="0" max="100" value="50">
```

#### Recherche
```html
<input type="search" name="recherche" placeholder="Rechercher...">
```

## Boutons radio (choix unique)

### Concept des boutons radio

Les boutons radio tirent leur nom des anciens postes de radio où appuyer sur un bouton de station désactivait automatiquement le précédent. Ce principe d'**exclusivité mutuelle** est fondamental : dans un groupe de boutons radio, un seul peut être sélectionné à la fois.

### Mécanisme de groupement

L'attribut `name` crée le groupement logique : tous les boutons radio partageant la même valeur `name` forment un groupe exclusif. Quand l'utilisateur sélectionne un bouton, tous les autres du même groupe se désélectionnent automatiquement.

### Utilisation appropriée

Les boutons radio sont idéaux pour :
- **Choix obligatoire** entre plusieurs options (civilité, mode de livraison)
- **Options mutuellement exclusives** (oui/non, taille S/M/L)
- **Petite liste d'options** (2 à 7 éléments recommandés)

```html
<fieldset>
    <legend>Choisissez votre civilité :</legend>
    
    <input type="radio" id="mr" name="civilite" value="monsieur">
    <label for="mr">Monsieur</label>
    
    <input type="radio" id="mme" name="civilite" value="madame">
    <label for="mme">Madame</label>
    
    <input type="radio" id="autre" name="civilite" value="autre">
    <label for="autre">Autre</label>
</fieldset>
```

## Cases à cocher (choix multiples)

### Concept des cases à cocher

Les cases à cocher permettent des **sélections multiples indépendantes**. Contrairement aux boutons radio, chaque case peut être cochée ou décochée sans affecter les autres. Elles représentent des choix binaires (activé/désactivé) qui peuvent se combiner.

### Principe d'indépendance

Chaque case à cocher fonctionne de manière autonome :
- Elle peut être cochée ou décochée individuellement
- Son état n'influence pas les autres cases
- Elle peut avoir sa propre valeur transmise au serveur

### Utilisation appropriée

Les cases à cocher sont parfaites pour :
- **Sélections multiples** (langues parlées, centres d'intérêt)
- **Options facultatives** (newsletter, notifications)
- **Listes de fonctionnalités** à activer/désactiver
- **Accords et consentements** (conditions d'utilisation, RGPD)

### Convention des tableaux pour les données multiples

L'utilisation de `name="field[]"` avec des crochets est une convention qui indique au serveur que plusieurs valeurs peuvent être envoyées pour le même champ. Côté serveur (PHP, Node.js, etc.), ces valeurs seront automatiquement groupées dans un tableau.

```html
<fieldset>
    <legend>Quels langages connaissez-vous ?</legend>
    
    <input type="checkbox" id="html" name="langages[]" value="html">
    <label for="html">HTML</label>
    
    <input type="checkbox" id="css" name="langages[]" value="css">
    <label for="css">CSS</label>
    
    <input type="checkbox" id="javascript" name="langages[]" value="javascript">
    <label for="javascript">JavaScript</label>
    
    <input type="checkbox" id="python" name="langages[]" value="python">
    <label for="python">Python</label>
</fieldset>
```

## Zones de texte (`<textarea>`)

### Quand utiliser textarea vs input

Bien que `<input type="text">` et `<textarea>` permettent tous deux la saisie de texte, ils répondent à des besoins différents :

**`<input type="text"`** :
- Texte court sur une ligne
- Données structurées (nom, email, téléphone)
- Formulaires compacts

**`<textarea>`** :
- Texte long sur plusieurs lignes
- Contenu libre (messages, commentaires, descriptions)
- Saisie étendue nécessitant de l'espace

### Redimensionnement et ergonomie

Par défaut, les navigateurs modernes permettent aux utilisateurs de redimensionner les zones de texte. Cette fonctionnalité améliore l'expérience utilisateur en s'adaptant à la quantité de contenu à saisir. Vous pouvez contrôler ce comportement avec la propriété CSS `resize`.

### Gestion du contenu

Contrairement aux inputs, le contenu par défaut d'un textarea se place entre les balises ouvrante et fermante, pas dans un attribut `value`. Cela permet d'inclure du texte formaté ou des retours à la ligne dans la valeur par défaut.

```html
<label for="message">Votre message :</label>
<textarea id="message" name="message" rows="5" cols="50" 
          placeholder="Écrivez votre message ici..." required></textarea>

<!-- Avec limitation de caractères -->
<textarea name="bio" maxlength="500" 
          placeholder="Décrivez-vous en quelques mots (max 500 caractères)"></textarea>
```

## Listes déroulantes (`<select>`)

### Avantages des listes déroulantes

Les listes déroulantes (`<select>`) offrent une solution élégante pour présenter de nombreuses options sans encombrer l'interface :

**Économie d'espace :** Seule l'option sélectionnée est visible, économisant l'espace vertical
**Navigation rapide :** Les utilisateurs peuvent naviguer avec les flèches du clavier
**Recherche intuitive :** Taper une lettre sélectionne la première option commençant par cette lettre
**Validation implicite :** L'utilisateur ne peut choisir qu'une option valide

### Structure hiérarchique avec optgroup

L'élément `<optgroup>` permet d'organiser les options en groupes logiques, particulièrement utile pour :
- **Données géographiques** (pays par continent, villes par région)
- **Catégorisation** (produits par type, articles par sujet)
- **Organisation temporelle** (événements par mois, années par décennie)

### Choix entre select et radio

**Utilisez `<select>` quand :**
- Vous avez plus de 7 options
- L'espace est limité
- Les options sont hiérarchisées

**Utilisez des boutons radio quand :**
- Vous avez 2 à 7 options
- Les choix doivent être immédiatement visibles
- La comparaison entre options est importante

### Liste simple
```html
<label for="pays">Pays :</label>
<select id="pays" name="pays" required>
    <option value="">-- Choisissez un pays --</option>
    <option value="fr">France</option>
    <option value="be">Belgique</option>
    <option value="ch">Suisse</option>
    <option value="ca">Canada</option>
</select>
```

### Liste avec groupes
```html
<label for="ville">Ville :</label>
<select id="ville" name="ville">
    <optgroup label="France">
        <option value="paris">Paris</option>
        <option value="lyon">Lyon</option>
        <option value="marseille">Marseille</option>
    </optgroup>
    <optgroup label="Belgique">
        <option value="bruxelles">Bruxelles</option>
        <option value="gand">Gand</option>
        <option value="anvers">Anvers</option>
    </optgroup>
</select>
```

### Liste à choix multiples
```html
<label for="hobbies">Hobbies (maintenez Ctrl pour sélectionner plusieurs) :</label>
<select id="hobbies" name="hobbies[]" multiple size="4">
    <option value="lecture">Lecture</option>
    <option value="sport">Sport</option>
    <option value="musique">Musique</option>
    <option value="cinema">Cinéma</option>
    <option value="voyage">Voyage</option>
</select>
```

## Exemple de formulaire complet

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulaire d'inscription</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 2rem auto;
            padding: 1rem;
            background-color: #f9f9f9;
        }
        
        form {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: bold;
            color: #333;
        }
        
        input, textarea, select {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }
        
        input:focus, textarea:focus, select:focus {
            outline: none;
            border-color: #3498db;
        }
        
        .radio-group, .checkbox-group {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .radio-group input, .checkbox-group input {
            width: auto;
            margin-right: 0.5rem;
        }
        
        .radio-group label, .checkbox-group label {
            display: flex;
            align-items: center;
            font-weight: normal;
            margin-bottom: 0;
        }
        
        .submit-btn {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1.1rem;
            transition: background-color 0.3s ease;
        }
        
        .submit-btn:hover {
            background-color: #2980b9;
        }
        
        .required {
            color: #e74c3c;
        }
    </style>
</head>
<body>
    <form action="/inscription" method="POST" enctype="multipart/form-data">
        <h2>Formulaire d'inscription</h2>
        
        <!-- Informations personnelles -->
        <div class="form-group">
            <label for="civilite">Civilité <span class="required">*</span></label>
            <div class="radio-group">
                <label><input type="radio" name="civilite" value="monsieur" required> Monsieur</label>
                <label><input type="radio" name="civilite" value="madame" required> Madame</label>
                <label><input type="radio" name="civilite" value="autre" required> Autre</label>
            </div>
        </div>
        
        <div class="form-group">
            <label for="prenom">Prénom <span class="required">*</span></label>
            <input type="text" id="prenom" name="prenom" required maxlength="50">
        </div>
        
        <div class="form-group">
            <label for="nom">Nom <span class="required">*</span></label>
            <input type="text" id="nom" name="nom" required maxlength="50">
        </div>
        
        <div class="form-group">
            <label for="email">Email <span class="required">*</span></label>
            <input type="email" id="email" name="email" required>
        </div>
        
        <div class="form-group">
            <label for="telephone">Téléphone</label>
            <input type="tel" id="telephone" name="telephone" placeholder="01 23 45 67 89">
        </div>
        
        <div class="form-group">
            <label for="dateNaissance">Date de naissance</label>
            <input type="date" id="dateNaissance" name="dateNaissance">
        </div>
        
        <!-- Informations complémentaires -->
        <div class="form-group">
            <label for="pays">Pays <span class="required">*</span></label>
            <select id="pays" name="pays" required>
                <option value="">-- Sélectionnez votre pays --</option>
                <option value="fr">France</option>
                <option value="be">Belgique</option>
                <option value="ch">Suisse</option>
                <option value="ca">Canada</option>
                <option value="autre">Autre</option>
            </select>
        </div>
        
        <div class="form-group">
            <label for="langages">Langages de programmation connus</label>
            <div class="checkbox-group">
                <label><input type="checkbox" name="langages[]" value="html"> HTML</label>
                <label><input type="checkbox" name="langages[]" value="css"> CSS</label>
                <label><input type="checkbox" name="langages[]" value="javascript"> JavaScript</label>
                <label><input type="checkbox" name="langages[]" value="python"> Python</label>
                <label><input type="checkbox" name="langages[]" value="java"> Java</label>
            </div>
        </div>
        
        <div class="form-group">
            <label for="experience">Niveau d'expérience</label>
            <select id="experience" name="experience">
                <option value="debutant">Débutant</option>
                <option value="intermediaire">Intermédiaire</option>
                <option value="avance">Avancé</option>
                <option value="expert">Expert</option>
            </select>
        </div>
        
        <div class="form-group">
            <label for="motivation">Pourquoi souhaitez-vous suivre cette formation ?</label>
            <textarea id="motivation" name="motivation" rows="4" 
                      placeholder="Expliquez votre motivation..." maxlength="500"></textarea>
        </div>
        
        <div class="form-group">
            <label for="cv">CV (PDF uniquement)</label>
            <input type="file" id="cv" name="cv" accept=".pdf">
        </div>
        
        <!-- Newsletter -->
        <div class="form-group">
            <div class="checkbox-group">
                <label>
                    <input type="checkbox" name="newsletter" value="oui"> 
                    Je souhaite recevoir la newsletter
                </label>
            </div>
        </div>
        
        <!-- Conditions -->
        <div class="form-group">
            <div class="checkbox-group">
                <label>
                    <input type="checkbox" name="conditions" value="accepte" required> 
                    J'accepte les <a href="/conditions" target="_blank">conditions d'utilisation</a> <span class="required">*</span>
                </label>
            </div>
        </div>
        
        <div class="form-group">
            <button type="submit" class="submit-btn">S'inscrire</button>
        </div>
    </form>
</body>
</html>
```

## Validation HTML5

### Philosophie de la validation côté client

La validation HTML5 représente une révolution dans l'approche de la validation des formulaires. Traditionnellement, toute validation nécessitait du JavaScript personnalisé. HTML5 introduit des mécanismes de validation natifs qui offrent plusieurs avantages :

**Performance :** Validation instantanée sans requête serveur
**Expérience utilisateur :** Feedback immédiat pendant la saisie
**Accessibilité :** Messages d'erreur standardisés et compatibles avec les lecteurs d'écran
**Simplicité :** Validation déclarative sans code JavaScript

### Principe de validation progressive

La validation HTML5 suit une approche **progressive** :

1. **Validation de type** : Le navigateur vérifie que la donnée correspond au type attendu
2. **Validation de contraintes** : Vérification des limites (longueur, plage de valeurs)
3. **Validation de motif** : Contrôle avec des expressions régulières
4. **Validation personnalisée** : Possibilité d'ajouter des règles avec JavaScript

### Validation côté client vs côté serveur

**Important :** La validation côté client améliore l'expérience utilisateur mais ne remplace jamais la validation côté serveur. Les données côté client peuvent être modifiées par des utilisateurs malveillants. La validation serveur reste obligatoire pour la sécurité.

**Validation côté client :**
- ✅ Feedback immédiat
- ✅ Amélioration UX
- ✅ Réduction de la charge serveur
- ❌ Peut être contournée

**Validation côté serveur :**
- ✅ Sécurité garantie
- ✅ Validation définitive
- ✅ Contrôle total
- ❌ Retard dans le feedback

### Attributs de validation

#### Attributs de contrainte de base

```html
<!-- Champ obligatoire -->
<input type="text" name="nom" required>

<!-- Longueur min/max -->
<input type="text" name="username" minlength="3" maxlength="20">
<textarea name="message" minlength="10" maxlength="500"></textarea>

<!-- Valeur min/max pour les nombres -->
<input type="number" name="age" min="18" max="99">

<!-- Pattern (expression régulière) -->
<input type="text" name="codePostal" pattern="[0-9]{5}" 
       title="Code postal français (5 chiffres)">

<!-- Formats spécifiques -->
<input type="email" name="email" required>
<input type="url" name="website">
```

## Bonnes pratiques

### Principe fondamental : Accessibilité avant tout

L'accessibilité des formulaires n'est pas seulement une obligation légale dans de nombreux pays, c'est un impératif éthique qui garantit l'égalité d'accès à l'information et aux services numériques. Un formulaire accessible bénéficie à tous les utilisateurs, pas seulement à ceux en situation de handicap.

### Conception inclusive

**Déficiences visuelles :** Les labels explicites et la structure sémantique permettent aux lecteurs d'écran de guider efficacement les utilisateurs
**Déficiences motrices :** Une navigation au clavier fluide et des zones de clic suffisamment grandes facilitent l'interaction
**Déficiences cognitives :** Des instructions claires et des messages d'erreur compréhensibles réduisent la charge cognitive

### Architecture sémantique

#### Labels : Au-delà de l'affichage

Le `<label>` n'est pas qu'un élément de présentation, c'est un élément de structure qui :
- **Crée une association programmatique** entre le texte descriptif et le champ
- **Étend la zone cliquable** : cliquer sur le label active le champ associé
- **Améliore l'accessibilité** : les lecteurs d'écran annoncent automatiquement le label quand l'utilisateur navigue vers le champ

#### Fieldset et legend : Groupement logique

```html
<fieldset>
    <legend>Informations personnelles</legend>
    <!-- Champs relatifs aux informations personnelles -->
</fieldset>
```

Cette structure crée un groupement sémantique qui aide :
- **Les utilisateurs voyants** à comprendre la structure du formulaire
- **Les lecteurs d'écran** à annoncer le contexte du groupe
- **La navigation au clavier** en créant des repères logiques

### Expérience utilisateur (UX)

#### Clarté et prévisibilité

**Placeholders informatifs mais pas exclusifs :** Les placeholders disparaissent à la saisie. Ils doivent compléter, pas remplacer les labels permanents.

**Messages d'erreur constructifs :** Au lieu de "Erreur dans le champ email", préférez "Veuillez saisir une adresse email valide (exemple: nom@exemple.com)"

**Validation en temps réel progressive :** Validez pendant la saisie pour les règles simples (longueur, format), mais attendez la fin de saisie pour les validations complexes.

#### Adaptation responsive

Les formulaires doivent s'adapter aux différentes tailles d'écran :
- **Mobile first** : Concevez d'abord pour les petits écrans
- **Touch-friendly** : Zones de toucher d'au moins 44px×44px
- **Clavier virtuel** : Les types d'input appropriés affichent le bon clavier

### Sécurité et protection des données

#### Validation multicouche

1. **Validation HTML5** : Première barrière, amélioration UX
2. **Validation JavaScript** : Règles complexes côté client
3. **Validation serveur** : Sécurité définitive, toujours obligatoire
4. **Sanitisation** : Nettoyage des données avant stockage

#### Protection CSRF

Utilisez des tokens CSRF pour protéger contre les attaques de falsification de requête intersites :

```html
<input type="hidden" name="csrf_token" value="token_unique_genere_par_le_serveur">
```

#### Chiffrement des données sensibles

- **HTTPS obligatoire** pour tous les formulaires
- **Chiffrement en base** pour les données sensibles
- **Limitation de rétention** des données selon les réglementations (RGPD)

### ✅ Accessibilité
- Toujours associer un `<label>` à chaque champ
- Utiliser `<fieldset>` et `<legend>` pour grouper
- Attributs `required` pour les champs obligatoires
- Messages d'erreur clairs

### ✅ UX/UI
- Placeholders informatifs mais pas comme labels
- Validation en temps réel avec JavaScript
- États visuels (focus, erreur, succès)
- Responsive design

### ✅ Sécurité
- Validation côté serveur obligatoire
- Protection CSRF
- Sanitisation des données
- Limitation de taille des fichiers

