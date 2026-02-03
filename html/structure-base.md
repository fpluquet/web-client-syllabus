# 1.1 Structure de base HTML

## Introduction au langage HTML

HTML (HyperText Markup Language) est le langage fondamental du web. Contrairement aux langages de programmation traditionnels, HTML est un **langage de balisage** qui décrit la structure et le sens du contenu plutôt que son apparence ou son comportement.

### Philosophie du balisage sémantique

HTML repose sur le principe de **séparation des préoccupations** :
- **HTML** définit la structure et le sens (sémantique)
- **CSS** contrôle l'apparence et la mise en page
- **JavaScript** gère le comportement et l'interactivité

Cette séparation permet une maintenance facilitée, une meilleure accessibilité et une flexibilité accrue dans la présentation du contenu.

### Évolution vers HTML5

HTML5 représente l'aboutissement de décennies d'évolution du web. Il apporte :
- **Sémantique enrichie** avec de nouvelles balises comme `<article>`, `<section>`, `<nav>`
- **APIs JavaScript intégrées** pour la géolocalisation, le stockage local, etc.
- **Compatibilité étendue** avec les différents types de médias et appareils
- **Simplification** de la syntaxe et des déclarations

### Principe de la structure hiérarchique

HTML organise le contenu selon une **structure arborescente** où chaque élément peut contenir d'autres éléments. Cette hiérarchie reflète la relation logique entre les différentes parties du document, facilitant la navigation et la compréhension.

La structure de base d'une page HTML est le fondement de tout développement web. Comprendre cette structure est essentiel pour créer des pages web valides et bien formées.

## DOCTYPE et balises essentielles

### Le rôle crucial du DOCTYPE

Le DOCTYPE n'est pas une balise HTML mais une **déclaration de type de document** qui informe le navigateur sur la version d'HTML utilisée. Cette déclaration influence directement la façon dont le navigateur interprète et affiche votre page.

#### Évolution des DOCTYPE

**HTML 4.01 :** Déclarations complexes et longues
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

**HTML5 :** Simplification drastique pour favoriser l'adoption
```html
<!DOCTYPE html>
```

Cette simplification reflète la philosophie de HTML5 : **pragmatisme et facilité d'utilisation**.

#### Impact du DOCTYPE

Sans DOCTYPE ou avec un DOCTYPE incorrect, les navigateurs passent en **"mode quirks"**, un mode de compatibilité qui peut entraîner :
- Rendus incohérents entre navigateurs
- Problèmes de mise en page CSS
- Comportements JavaScript imprévisibles

### Architecture des balises HTML

HTML utilise un système de **balises** (tags) qui encapsulent le contenu. La plupart des balises fonctionnent par paires :
- **Balise ouvrante** : `<element>`
- **Contenu** : Le texte ou d'autres éléments
- **Balise fermante** : `</element>`

Cette structure en paires garantit une hiérarchie claire et une imbrication logique des éléments.

### Le DOCTYPE

Le DOCTYPE indique au navigateur quel type de document il traite. Pour HTML5, nous utilisons :

```html
<!DOCTYPE html>
```

### Structure minimale d'une page HTML

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ma première page</title>
</head>
<body>
    <h1>Bienvenue sur ma page</h1>
    <p>Ceci est le contenu de ma page.</p>
</body>
</html>
```

## Les balises essentielles

### Anatomie d'un document HTML

Un document HTML respecte une structure logique en trois parties principales, chacune ayant un rôle spécifique dans l'écosystème web.

### `<html>` : L'élément racine

La balise `<html>` est l'**élément racine** qui englobe tout le contenu du document. Elle établit le contexte global de la page et communique des informations essentielles aux navigateurs et aux outils d'assistance.

#### L'importance de l'attribut `lang`

L'attribut `lang` n'est pas qu'une formalité :
- **Accessibilité** : Les lecteurs d'écran ajustent leur prononciation
- **SEO** : Les moteurs de recherche comprennent le public cible
- **Traduction automatique** : Les navigateurs proposent la traduction appropriée
- **Outils linguistiques** : Les correcteurs orthographiques s'adaptent

### `<head>` : Les métadonnées du document

La section `<head>` contient les **métadonnées** : informations sur le document qui ne sont pas directement affichées mais qui influencent son comportement, son référencement et son accessibilité.

#### Concept de métadonnées

Les métadonnées sont des "données sur les données". Dans le contexte HTML :
- **Métadonnées techniques** : encodage, viewport, compatibilité
- **Métadonnées descriptives** : titre, description, auteur
- **Métadonnées de liaison** : feuilles de style, scripts, icônes
- **Métadonnées de référencement** : mots-clés, réseaux sociaux

#### Pourquoi les métadonnées sont invisibles

Le contenu du `<head>` n'apparaît pas dans la zone d'affichage principale car il s'adresse :
- **Aux navigateurs** pour configurer l'affichage
- **Aux moteurs de recherche** pour l'indexation
- **Aux réseaux sociaux** pour les aperçus de liens
- **Aux développeurs** pour la maintenance

### `<body>` : Le contenu visible

La balise `<body>` encapsule tout le **contenu visible** de la page. C'est ici que réside l'information destinée aux utilisateurs : textes, images, liens, formulaires, etc.

#### Principe de visibilité

Tout ce qui doit être vu, lu, cliqué ou interagi par l'utilisateur appartient au `<body>`. Cette séparation claire entre métadonnées (`<head>`) et contenu (`<body>`) facilite :
- **La maintenance** du code
- **L'optimisation** des performances
- **L'accessibilité** et la navigation
- **Le référencement** et l'indexation

## Métadonnées importantes

### Encodage de caractères
```html
<meta charset="UTF-8">
```
- Spécifie l'encodage des caractères
- UTF-8 supporte tous les caractères internationaux

### Viewport pour le responsive
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
- Essentiel pour les sites responsive
- Contrôle l'affichage sur mobile

### Titre de la page
```html
<title>Titre de votre page</title>
```
- Affiché dans l'onglet du navigateur
- Important pour le SEO

## Exemple complet

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Description de ma page pour les moteurs de recherche">
    <meta name="author" content="Votre nom">
    <title>Ma Page Web</title>
</head>
<body>
    <header>
        <h1>En-tête de ma page</h1>
    </header>
    
    <main>
        <h2>Contenu principal</h2>
        <p>Voici le contenu de ma page web.</p>
    </main>
    
    <footer>
        <p>&copy; 2025 Mon Site Web</p>
    </footer>
</body>
</html>
```

## Points clés à retenir

- ✅ Toujours commencer par `<!DOCTYPE html>`
- ✅ Spécifier la langue avec `lang="fr"`
- ✅ Inclure l'encodage UTF-8
- ✅ Ajouter la balise viewport pour le responsive
- ✅ Donner un titre descriptif à votre page

