# 1.2 Balises de contenu

## Introduction à la sémantique HTML

La sémantique HTML va bien au-delà de la simple mise en forme : elle donne du **sens** au contenu. Chaque balise porte une signification spécifique qui aide les navigateurs, les moteurs de recherche et les technologies d'assistance à comprendre et traiter l'information.

### Pourquoi la sémantique est-elle cruciale ?

**Accessibilité universelle :** Les lecteurs d'écran utilisent la structure sémantique pour naviguer dans le contenu et transmettre l'information aux utilisateurs malvoyants. Un titre `<h1>` sera annoncé différemment d'un simple paragraphe stylé en gras.

**Référencement naturel (SEO) :** Les moteurs de recherche analysent la structure sémantique pour comprendre l'importance relative des différentes sections. Un contenu bien structuré avec des titres hiérarchiques sera mieux indexé.

**Maintenance et évolutivité :** Un code sémantique est plus facile à maintenir car l'intention du développeur est claire. Modifier l'apparence via CSS devient simple sans affecter la structure logique.

**Interopérabilité :** Les données structurées sémantiquement peuvent être facilement extraites et réutilisées par d'autres applications ou services.

### Principe de la hiérarchisation du contenu

Le contenu web s'organise naturellement selon une hiérarchie logique, similaire à un livre avec ses chapitres, sections et sous-sections. HTML fournit les outils pour reproduire cette structure naturelle.

### Évolution des pratiques

**Ancienne approche (à éviter) :**
```html
<font size="6"><b>Titre principal</b></font>
<br><br>
<font size="4"><b>Sous-titre</b></font>
```

**Approche moderne sémantique :**
```html
<h1>Titre principal</h1>
<h2>Sous-titre</h2>
```

La première approche ne transmet aucune information sémantique, tandis que la seconde établit clairement une hiérarchie de contenu.

Les balises de contenu sont les éléments HTML qui structurent et organisent le texte et les informations de votre page web.

## Titres hiérarchiques

### La logique de la hiérarchie éditoriale

Les titres HTML (h1 à h6) reproduisent la structure éditoriale traditionnelle utilisée dans les livres, journaux et documents académiques. Cette hiérarchie n'est pas arbitraire : elle reflète l'organisation logique de l'information.

#### Structure pyramidale

```
h1 : Titre principal (unique par page)
└── h2 : Sections principales
    └── h3 : Sous-sections
        └── h4 : Sous-sous-sections
            └── h5 : Divisions mineures
                └── h6 : Détails spécifiques
```

#### Règles de hiérarchisation

**Unicité du h1 :** Chaque page devrait avoir un seul `<h1>` qui résume son contenu principal. C'est l'équivalent du titre d'un article ou du nom d'une page.

**Progression logique :** Ne pas "sauter" de niveaux (éviter de passer directement de h1 à h3). Cette progression aide les technologies d'assistance à construire une table des matières mentale.

**Cohérence thématique :** Chaque niveau de titre doit représenter une subdivision logique du niveau supérieur.

### Impact sur l'accessibilité

Les lecteurs d'écran permettent aux utilisateurs de naviguer par titres, créant ainsi une "table des matières" interactive. Une hiérarchie bien structurée devient un système de navigation essentiel.

### Impact SEO

Les moteurs de recherche utilisent la hiérarchie des titres pour :
- Comprendre la structure du contenu
- Identifier les mots-clés importants
- Générer des extraits enrichis dans les résultats de recherche

## Paragraphes

### Le paragraphe : unité fondamentale du contenu

Le paragraphe (`<p>`) est l'**unité sémantique de base** pour organiser le texte. Il représente une idée complète, un concept ou un argument développé. Cette notion va au-delà de la simple présentation visuelle.

#### Fonction cognitive des paragraphes

Les paragraphes facilitent la **lecture et la compréhension** en :
- **Segmentant l'information** en unités digestibles
- **Créant des pauses visuelles** qui reposent l'œil
- **Organisant la progression logique** des idées
- **Permettant la navigation** par blocs d'information

#### Paragraphes vs retours à la ligne

**Distinction importante :**
- `<p>` : Nouvelle idée, nouveau concept
- `<br>` : Simple retour à la ligne dans la même idée

Cette distinction est cruciale pour la sémantique et l'accessibilité.

### Bonnes pratiques de rédaction web

**Paragraphes courts :** Sur écran, les paragraphes doivent être plus courts qu'en impression (3-5 phrases maximum) pour faciliter la lecture.

**Une idée par paragraphe :** Chaque paragraphe doit développer une seule idée principale avec ses arguments ou détails de support.

**Progression logique :** L'ordre des paragraphes doit suivre une logique narrative, chronologique ou argumentative.

## Formatage de texte

### Philosophie du formatage sémantique vs visuel

HTML distingue fondamentalement entre le **sens** (sémantique) et l'**apparence** (présentation). Cette distinction est essentielle pour créer du contenu robuste, accessible et maintenable.

#### Balises sémantiques : le sens avant tout

Les balises sémantiques (`<strong>`, `<em>`) décrivent l'**intention** plutôt que l'apparence :
- `<strong>` : Importance forte, urgence
- `<em>` : Emphase, nuance subtile

#### Balises de présentation : l'apparence seule

Les balises de présentation (`<b>`, `<i>`) décrivent uniquement l'aspect visuel :
- `<b>` : Texte en gras (sans signification particulière)
- `<i>` : Texte en italique (sans emphase sémantique)

### Pourquoi privilégier la sémantique ?

**Accessibilité :** Les lecteurs d'écran interprètent différemment `<strong>` (annoncé avec emphase) et `<b>` (lu normalement).

**SEO :** Les moteurs de recherche accordent plus d'importance au contenu marqué comme `<strong>` ou `<em>`.

**Maintenance :** Changer l'apparence de tous les éléments "importants" devient simple avec CSS : `strong { color: red; }`.

**Adaptabilité :** Le même contenu peut être présenté différemment selon le contexte (écran, impression, synthèse vocale).

### Cas d'usage appropriés

#### Quand utiliser `<strong>` :
- Avertissements importants
- Points clés d'un argument
- Informations critiques pour la compréhension

#### Quand utiliser `<em>` :
- Nuances subtiles de sens
- Mots étrangers ou techniques
- Emphase conversationnelle

#### Quand utiliser `<b>` et `<i>` :
- Mots-clés sans importance sémantique particulière
- Conventions typographiques (noms de produits, termes techniques)
- Styles purement décoratifs

## Listes

### Psychologie cognitive des listes

Les listes répondent à un besoin cognitif fondamental : **organiser l'information complexe** en unités digestibles. Le cerveau humain traite plus efficacement l'information structurée que les longs paragraphes denses.

#### Avantages cognitifs des listes :
- **Scan visuel rapide** : L'œil peut parcourir rapidement les éléments
- **Mémorisation facilitée** : Structure claire aide la rétention
- **Comparaison aisée** : Juxtaposition des éléments facilite l'analyse
- **Action orientée** : Parfait pour les instructions et procédures

### Typologie des listes selon leur fonction

#### Listes non ordonnées (`<ul>`) : L'égalité des éléments

Les listes non ordonnées conviennent quand **l'ordre n'importe pas** ou quand tous les éléments ont la **même importance relative**.

**Cas d'usage typiques :**
- Caractéristiques d'un produit
- Liste d'avantages
- Menu de navigation
- Tags et catégories
- Énumération de concepts équivalents

#### Listes ordonnées (`<ol>`) : La séquence logique

Les listes ordonnées imposent un **ordre significatif** où la position de chaque élément a du sens.

**Cas d'usage typiques :**
- Instructions étape par étape
- Procédures à suivre
- Classements (top 10, palmarès)
- Chronologie d'événements
- Hiérarchie d'importance

#### Listes de définitions (`<dl>`) : Association terme-définition

Souvent méconnue, la liste de définition crée des **paires associatives** entre termes et leurs explications.

**Cas d'usage spécialisés :**
- Glossaires techniques
- FAQ (questions-réponses)
- Métadonnées (auteur, date, catégorie)
- Spécifications techniques

### Impact sur l'accessibilité

Les lecteurs d'écran annoncent :
- Le type de liste et le nombre d'éléments
- La position actuelle ("élément 2 sur 5")
- Les niveaux d'imbrication

Cette information contextuelle aide les utilisateurs malvoyants à naviguer efficacement.

### Listes imbriquées : Hiérarchies complexes

L'imbrication de listes permet de créer des **structures hiérarchiques** sophistiquées, reflétant l'organisation naturelle de l'information complexe.

**Principe de cohérence :** Chaque niveau d'imbrication doit respecter la logique du niveau parent (tous ordonnés ou tous non-ordonnés selon le contexte).

## Autres éléments de contenu

### Citations
```html
<blockquote>
    <p>La simplicité est la sophistication ultime.</p>
    <cite>Leonardo da Vinci</cite>
</blockquote>
```

### Code informatique
```html
<p>Pour déclarer une variable en JavaScript : <code>let nom = "valeur";</code></p>

<pre>
<code>
function saluer(nom) {
    console.log("Bonjour " + nom);
}
</code>
</pre>
```

### Séparateurs
```html
<p>Premier paragraphe.</p>
<hr>
<p>Deuxième paragraphe après une ligne de séparation.</p>
```

## Exemple complet

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Balises de contenu</title>
</head>
<body>
    <h1>Guide de la Programmation Web</h1>
    
    <h2>Introduction</h2>
    <p>La programmation web est un domaine <strong>passionnant</strong> qui permet de créer des sites internet <em>interactifs</em>.</p>
    
    <h2>Technologies principales</h2>
    <ul>
        <li><strong>HTML</strong> : Structure du contenu</li>
        <li><strong>CSS</strong> : Présentation et design</li>
        <li><strong>JavaScript</strong> : Interactivité</li>
    </ul>
    
    <h3>Étapes d'apprentissage</h3>
    <ol>
        <li>Apprendre HTML</li>
        <li>Maîtriser CSS</li>
        <li>Découvrir JavaScript</li>
        <li>Pratiquer régulièrement</li>
    </ol>
    
    <hr>
    
    <blockquote>
        <p>Le meilleur moment pour planter un arbre était il y a 20 ans. Le deuxième meilleur moment est maintenant.</p>
        <cite>Proverbe chinois</cite>
    </blockquote>
</body>
</html>
```

## Points clés à retenir

- ✅ Utiliser la hiérarchie des titres (h1 → h6)
- ✅ Structurer le contenu avec des paragraphes
- ✅ Préférer `<strong>` et `<em>` aux balises de présentation
- ✅ Choisir le bon type de liste selon le contexte
- ✅ Utiliser les balises sémantiques appropriées

