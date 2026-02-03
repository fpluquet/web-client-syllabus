# 1.3 Médias et liens

## Introduction au web multimédia et hyperconnecté

Le World Wide Web tire son nom et sa puissance révolutionnaire de deux concepts fondamentaux : l'**hypertexte** (liens entre documents) et le **multimédia** (intégration de différents types de contenus). Ces éléments transforment une simple collection de pages en un écosystème interconnecté et riche.

### L'hypertexte : révolution de la navigation

L'hypertexte brise la linéarité traditionnelle de la lecture en permettant des **parcours personnalisés** à travers l'information. Cette non-linéarité offre :

**Liberté de navigation :** L'utilisateur construit son propre chemin à travers le contenu
**Références croisées :** Connexions immédiates entre concepts liés
**Profondeur variable :** Accès rapide aux détails ou vue d'ensemble selon les besoins
**Contextualisation :** Liens vers des explications, sources ou exemples

### Le multimédia : enrichissement sensoriel

L'intégration native de médias variés (images, audio, vidéo) dans HTML permet une **communication multi-sensorielle** qui :

**Améliore la compréhension :** Différents canaux sensoriels renforcent le message
**Adapte aux styles d'apprentissage :** Visuel, auditif, kinesthésique
**Augmente l'engagement :** Contenu plus attractif et mémorable
**Universalise l'accès :** Transcende les barrières linguistiques avec des visuels

### Évolution vers un web accessible

HTML5 marque une étape cruciale vers l'**accessibilité universelle** en :
- Standardisant les formats multimédia
- Intégrant nativement les contrôles d'accessibilité
- Permettant la description alternative de tous les contenus
- Offrant des solutions de repli pour tous les navigateurs

## Images

### Philosophie de l'image web

L'image sur le web ne doit jamais être considérée comme un simple ornement décoratif. Elle fait partie intégrante du **contenu informationnel** et doit être traitée avec la même rigueur que le texte.

#### Rôles multiples de l'image

**Information principale :** Diagrammes, graphiques, captures d'écran explicatives
**Support narratif :** Illustrations qui complètent ou clarifient le texte
**Navigation :** Boutons, icônes, éléments d'interface
**Identité visuelle :** Logos, éléments de branding
**Émotion :** Photos qui créent une atmosphère ou une connexion émotionnelle

### L'attribut `alt` : bien plus qu'une obligation

L'attribut `alt` (texte alternatif) est souvent mal compris. Il ne s'agit pas de "décrire l'image" mais de **transmettre sa fonction** dans le contexte.

#### Stratégies de rédaction d'alt

**Pour une image informative :**
```html
<!-- ❌ Alt descriptif mais inutile -->
<img src="graph.png" alt="Un graphique avec des barres bleues et rouges">

<!-- ✅ Alt fonctionnel -->
<img src="graph.png" alt="Évolution des ventes 2024 : augmentation de 15% au Q4">
```

**Pour une image décorative :**
```html
<!-- ✅ Alt vide signale que l'image est décorative -->
<img src="decoration.png" alt="">
```

**Pour une image complexe :**
```html
<!-- ✅ Alt court + description longue -->
<img src="complex-chart.png" alt="Résultats financiers 2024" 
     longdesc="detailed-description.html">
```

### Performance et optimisation

#### Formats d'image modernes

**JPEG :** Photos avec beaucoup de couleurs et détails
**PNG :** Images avec transparence, logos, illustrations simples
**WebP :** Format moderne, compression supérieure, support croissant
**SVG :** Graphiques vectoriels, parfait pour logos et icônes

#### Responsive et adaptation

Les images doivent s'adapter aux différents contextes de visualisation :
- **Tailles d'écran** variées (mobile, tablette, desktop)
- **Résolutions** différentes (écrans standard, Retina)
- **Bande passante** limitée (mobile, connexions lentes)

### Accessibilité et inclusion

Une image accessible bénéficie à tous :
- **Utilisateurs malvoyants** : Description textuelle via lecteurs d'écran
- **Connexions lentes** : Texte alternatif pendant le chargement
- **Référencement** : Les moteurs de recherche indexent le texte alt
- **Contexte défaillant** : Compréhension même si l'image ne se charge pas

### Balise de base
```html
<img src="chemin/vers/image.jpg" alt="Description de l'image">
```

### Attributs essentiels
- **`src`** : chemin vers le fichier image (obligatoire)
- **`alt`** : texte alternatif pour l'accessibilité (obligatoire)
- **`width`** et **`height`** : dimensions en pixels
- **`title`** : info-bulle au survol

### Exemple complet
```html
<img src="images/chat.jpg" 
     alt="Un chat orange dormant sur un coussin" 
     width="300" 
     height="200"
     title="Mon chat Garfield">
```

### Redimensionnement responsive
```html
<img src="images/paysage.jpg" 
     alt="Paysage de montagne" 
     style="max-width: 100%; height: auto;">
```

## Types de chemins

### Chemin relatif (recommandé)
```html
<!-- Image dans le même dossier -->
<img src="photo.jpg" alt="Ma photo">

<!-- Image dans un sous-dossier -->
<img src="images/photo.jpg" alt="Ma photo">

<!-- Image dans le dossier parent -->
<img src="../photo.jpg" alt="Ma photo">
```

### Chemin absolu
```html
<img src="https://exemple.com/images/photo.jpg" alt="Photo externe">
```

## Liens hypertextes

### Lien de base
```html
<a href="https://www.exemple.com">Visitez notre site</a>
```

### Liens internes
```html
<!-- Vers une autre page du site -->
<a href="contact.html">Contactez-nous</a>

<!-- Vers une section de la même page -->
<a href="#section1">Aller à la section 1</a>
```

### Liens avec attributs utiles
```html
<!-- Ouvrir dans un nouvel onglet -->
<a href="https://exemple.com" target="_blank" rel="noopener">Site externe</a>

<!-- Lien de téléchargement -->
<a href="document.pdf" download>Télécharger le PDF</a>

<!-- Lien email -->
<a href="mailto:contact@exemple.com">Nous écrire</a>

<!-- Lien téléphone -->
<a href="tel:+33123456789">Nous appeler</a>
```

## Navigation entre pages

### Structure de site simple
```
mon-site/
├── index.html
├── about.html
├── contact.html
└── images/
    └── logo.png
```

### Navigation dans index.html
```html
<nav>
    <ul>
        <li><a href="index.html">Accueil</a></li>
        <li><a href="about.html">À propos</a></li>
        <li><a href="contact.html">Contact</a></li>
    </ul>
</nav>
```

## Ancres et navigation interne

### Créer des ancres
```html
<h2 id="introduction">Introduction</h2>
<p>Contenu de l'introduction...</p>

<h2 id="methode">Méthode</h2>
<p>Contenu de la méthode...</p>

<h2 id="conclusion">Conclusion</h2>
<p>Contenu de la conclusion...</p>
```

### Liens vers les ancres
```html
<nav>
    <ul>
        <li><a href="#introduction">Introduction</a></li>
        <li><a href="#methode">Méthode</a></li>
        <li><a href="#conclusion">Conclusion</a></li>
    </ul>
</nav>
```

## Images cliquables

### Image comme lien
```html
<a href="galerie.html">
    <img src="images/galerie-thumb.jpg" alt="Voir la galerie photo">
</a>
```

### Logo cliquable (retour accueil)
```html
<a href="index.html">
    <img src="images/logo.png" alt="Logo de mon site - Retour accueil">
</a>
```

## Exemple complet : page avec médias et navigation

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Médias et Navigation</title>
</head>
<body>
    <header>
        <a href="index.html">
            <img src="images/logo.png" alt="Logo MonSite">
        </a>
        
        <nav>
            <ul>
                <li><a href="index.html">Accueil</a></li>
                <li><a href="galerie.html">Galerie</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <h1>Bienvenue sur mon site</h1>
        
        <section id="presentation">
            <h2>Présentation</h2>
            <img src="images/accueil.jpg" 
                 alt="Vue d'ensemble de notre entreprise"
                 style="max-width: 100%; height: auto;">
            <p>Découvrez notre entreprise...</p>
        </section>
        
        <section id="services">
            <h2>Nos services</h2>
            <p>Nous proposons...</p>
            <a href="services.html">En savoir plus sur nos services</a>
        </section>
        
        <section id="contact-rapide">
            <h2>Contact rapide</h2>
            <p>
                <a href="mailto:contact@monsite.com">Nous écrire</a> |
                <a href="tel:+33123456789">Nous appeler</a>
            </p>
        </section>
    </main>
    
    <footer>
        <nav>
            <a href="#presentation">Présentation</a> |
            <a href="#services">Services</a> |
            <a href="#contact-rapide">Contact</a>
        </nav>
    </footer>
</body>
</html>
```

## Bonnes pratiques

### Pour les images
- ✅ Toujours inclure un attribut `alt` descriptif
- ✅ Optimiser la taille des images pour le web
- ✅ Utiliser des formats appropriés (JPEG, PNG, WebP)
- ✅ Prévoir la responsivité avec `max-width: 100%`

### Pour les liens
- ✅ Utiliser des textes de liens descriptifs
- ✅ Ajouter `rel="noopener"` pour les liens externes avec `target="_blank"`
- ✅ Tester que tous les liens fonctionnent
- ✅ Organiser la navigation de manière logique

### Accessibilité
- ✅ Textes alternatifs pour toutes les images
- ✅ Liens compréhensibles hors contexte
- ✅ Navigation au clavier possible
- ✅ Contrastes suffisants

