# 3.4 Mise en page

## Introduction à l'art de la mise en page web

La mise en page web ne consiste pas seulement à placer des éléments sur un écran : c'est l'art de **structurer l'information visuelle** pour guider l'utilisateur, hiérarchiser le contenu et créer une expérience intuitive et agréable. Une bonne mise en page rend la navigation naturelle et met en valeur le contenu.

### Évolution historique de la mise en page web

#### L'ère des tableaux (années 90-2000)
À l'origine, les développeurs utilisaient les balises `<table>` pour organiser la page. Cette méthode, bien que créative à l'époque, détournait la sémantique HTML et rendait le code difficile à maintenir et peu accessible.

#### L'ère des flottements (années 2000-2010)
L'arrivée de la propriété `float` a permis de sortir des tableaux, mais elle était initialement prévue pour l'habillage de texte. Son détournement pour la mise en page a engendré des problèmes de "clearing" et des comportements parfois imprévisibles.

#### L'ère moderne (2010+)
Avec Flexbox (2012) et CSS Grid (2017), la mise en page devient enfin expressive, robuste et pensée pour le web. Ces outils sont conçus pour répondre aux besoins réels des interfaces modernes.

### Philosophie du design centré utilisateur

Une bonne mise en page doit toujours servir le **contenu** et l'**utilisateur** :

- **Hiérarchie visuelle :** Guider l'œil vers l'information importante.
- **Flux de lecture :** Respecter les patterns naturels (Z-pattern, F-pattern).
- **Responsive design :** Adapter la page à tous les écrans.
- **Performance :** Limiter les calculs de rendu pour une expérience fluide.

> Astuce : Commencez toujours par penser au contenu et à l'utilisateur avant de choisir une technique de layout.

### Principes fondamentaux du layout

#### 1. Le flux normal (Normal Flow)
Avant de manipuler le positionnement, il est essentiel de comprendre comment les éléments se placent naturellement dans la page.

#### 2. La boîte modèle (Box Model)
Chaque élément HTML est une boîte composée du contenu, du padding, de la bordure et de la marge. Maîtriser ce modèle est la base de toute mise en page.

#### 3. Les contextes de formatage
Block, inline, flex, grid : chaque contexte a ses propres règles de placement et d'alignement.

#### 4. L'empilement (Stacking Context)
Comprendre comment les éléments se superposent (avec `z-index`) permet de gérer les overlays, menus, etc.

### Outils modernes de mise en page

#### CSS Grid : Architecture globale
- Permet des layouts en 2 dimensions (lignes ET colonnes)
- Idéal pour structurer la page entière
- Contrôle précis des espaces et alignements

#### Flexbox : Composants et détails
- Layouts en 1 dimension (ligne OU colonne)
- Parfait pour les barres de navigation, galeries, cartes, etc.
- Alignement et distribution flexibles

#### Positionnement : Cas spéciaux
- `relative`, `absolute`, `fixed`, `sticky` pour sortir du flux normal
- Utile pour les overlays, tooltips, éléments flottants ou fixes

## Introduction

La mise en page CSS détermine comment les éléments sont positionnés et organisés sur la page. Maîtriser les différentes techniques de layout est essentiel pour créer des interfaces modernes et responsives.

---

## Le flux normal

Dans le flux normal, les éléments de type bloc s'empilent verticalement, tandis que les éléments en ligne s'affichent côte à côte. Comprendre ce comportement est fondamental avant d'utiliser des techniques avancées.

### Éléments en ligne vs blocs

```css
/* Éléments de bloc */
.block-element {
  display: block;
  width: 100%;
  margin: 1rem 0;
  padding: 1rem;
  background: #f8f9fa;
}

/* Éléments en ligne */
.inline-element {
  display: inline;
  background: #e9ecef;
  padding: 0.25rem 0.5rem;
}

/* Éléments inline-block */
.inline-block-element {
  display: inline-block;
  width: 200px;
  height: 100px;
  margin: 0.5rem;
  padding: 1rem;
  background: #dee2e6;
  vertical-align: top;
}
```

> Astuce : Utilisez `inline-block` pour combiner les avantages des deux mondes : alignement horizontal et possibilité de définir largeur/hauteur.

### Propriété display

La propriété `display` contrôle la façon dont un élément est rendu dans le flux. Elle permet de passer d'un comportement à l'autre (bloc, en ligne, flex, grid, etc.).

```css
/* Valeurs courantes de display */
.display-examples {
  display: none;          /* Élément retiré du flux */
  display: block;         /* Élément de bloc */
  display: inline;        /* Élément en ligne */
  display: inline-block;  /* Hybride */
  display: flex;          /* Container flexbox */
  display: grid;          /* Container grid */
  display: table;         /* Simulation de tableau */
  display: contents;      /* Ignore le container */
}
```

---

## Positionnement

Le positionnement CSS permet de sortir un élément du flux normal pour le placer précisément où on le souhaite. Il existe plusieurs modes, chacun avec ses usages spécifiques.

### Position static (par défaut)

```css
/* Position normale dans le flux */
.static-position {
  position: static; /* Valeur par défaut */
  /* top, right, bottom, left n'ont aucun effet */
}
```

> Astuce : La plupart des éléments sont en `position: static` par défaut. Cette valeur ne permet aucun décalage avec `top`, `left`, etc.

### Position relative

Un élément en `position: relative` reste dans le flux, mais peut être décalé par rapport à sa position d'origine. Il sert aussi de référence pour les enfants en `absolute`.

```css
/* Position relative à sa position normale */
.relative-position {
  position: relative;
  top: 20px;        /* Décalage vers le bas */
  left: 30px;       /* Décalage vers la droite */
  background: rgba(255, 0, 0, 0.2);
}

/* Utilisation comme référence pour les enfants absolus */
.relative-container {
  position: relative;
  border: 2px solid #007bff;
  height: 200px;
}

.absolute-child {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #007bff;
  color: white;
  padding: 0.5rem;
}
```

### Position absolute

Un élément en `position: absolute` est retiré du flux et positionné par rapport à son premier parent positionné (`relative`, `absolute`, `fixed`, ou `sticky`).

```css
/* Position absolue par rapport au premier parent positionné */
.absolute-position {
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  background: #28a745;
  color: white;
  padding: 1rem;
  z-index: 10;
}

/* Centrage absolu */
.absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffc107;
  padding: 2rem;
}

/* Positionnement dans les coins */
.corner-positions {
  position: absolute;
}

.top-left { top: 0; left: 0; }
.top-right { top: 0; right: 0; }
.bottom-left { bottom: 0; left: 0; }
.bottom-right { bottom: 0; right: 0; }
```

> Astuce : Pour centrer un élément absolument, combinez `top: 50%`, `left: 50%` et `transform: translate(-50%, -50%)`.

### Position fixed

Un élément en `position: fixed` est fixé par rapport à la fenêtre du navigateur (viewport), même lors du scroll.

```css
/* Position fixe par rapport au viewport */
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #343a40;
  color: white;
  z-index: 1000;
  padding: 0 2rem;
  display: flex;
  align-items: center;
}

/* Navigation fixe */
.fixed-nav {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
```

> Astuce : Utilisez `fixed` pour les barres de navigation ou boutons d'action toujours visibles.

### Position sticky

`sticky` permet à un élément de rester "collé" à une position donnée lors du scroll, tant qu'il reste dans son conteneur parent.

```css
/* Position collante */
.sticky-nav {
  position: sticky;
  top: 0;
  background: white;
  border-bottom: 1px solid #dee2e6;
  padding: 1rem 0;
  z-index: 100;
}

.sticky-sidebar {
  position: sticky;
  top: 20px;
  height: fit-content;
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
}
```

---

## Flottements (Float)

Historiquement utilisés pour la mise en page, les flottements servent aujourd'hui surtout à l'habillage d'images ou d'éléments décoratifs.

```css
/* Flottement basique */
.float-left {
  float: left;
  width: 200px;
  margin: 0 1rem 1rem 0;
  background: #e9ecef;
  padding: 1rem;
}

.float-right {
  float: right;
  width: 200px;
  margin: 0 0 1rem 1rem;
  background: #f8f9fa;
  padding: 1rem;
}

/* Nettoyage des flottements */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

.clear-both {
  clear: both;
}
```

> Astuce : Pensez à "nettoyer" les flottements avec `.clearfix` ou `clear: both` pour éviter que les éléments suivants ne remontent sous les flottants.

---

## Flexbox

Flexbox (Flexible Box Layout) est un module CSS conçu pour faciliter la création de mises en page dynamiques, flexibles et réactives, en organisant les éléments enfants d’un conteneur selon un axe principal (horizontal ou vertical). Il permet de gérer facilement l’alignement, la distribution de l’espace, l’ordre d’affichage et le redimensionnement automatique des éléments, sans recourir à des calculs complexes ou à des hacks.

### Pourquoi utiliser Flexbox ?
- Pour aligner des éléments horizontalement ou verticalement, même s’ils ont des tailles différentes.
- Pour répartir l’espace disponible entre les éléments ou autour d’eux.
- Pour rendre une interface adaptable à différentes tailles d’écran.
- Pour inverser l’ordre d’affichage sans modifier le HTML.

> Astuce : Flexbox est idéal pour les barres de navigation, les galeries, les cartes, les listes horizontales, les footers, etc.

### Le principe de base
Pour activer Flexbox, il suffit d’appliquer `display: flex;` à un conteneur. Tous ses enfants directs deviennent alors des « éléments flex » et sont organisés selon l’axe principal.

```css
.flex-container {
  display: flex;
}
```

Par défaut, l’axe principal est horizontal (de gauche à droite). Les éléments s’alignent donc en ligne.

### Contrôler la direction et le retour à la ligne
- `flex-direction` : définit l’axe principal (`row`, `row-reverse`, `column`, `column-reverse`).
- `flex-wrap` : permet aux éléments de passer à la ligne si l’espace manque (`wrap`, `nowrap`, `wrap-reverse`).
- `flex-flow` : raccourci pour combiner direction et wrap.

```css
.flex-row { flex-direction: row; } /* Par défaut */
.flex-column { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.flex-flow { flex-flow: row wrap; }
```

### Répartition de l’espace et alignement
- `justify-content` : aligne les éléments sur l’axe principal (gauche/droite ou haut/bas).
- `align-items` : aligne les éléments sur l’axe secondaire (perpendiculaire à l’axe principal).
- `align-content` : aligne les lignes multiples si retour à la ligne.

```css
.justify-center { justify-content: center; }
.align-center { align-items: center; }
.align-content-between { align-content: space-between; }
```

> Astuce : Pour centrer parfaitement un groupe d’éléments, combinez `justify-content: center;` et `align-items: center;` sur le conteneur flex.

### Contrôle individuel des éléments flex
Chaque enfant d’un conteneur flex peut être contrôlé individuellement :
- `flex-grow` : permet à l’élément de grandir pour occuper l’espace disponible.
- `flex-shrink` : permet à l’élément de rétrécir si l’espace manque.
- `flex-basis` : définit la taille de base de l’élément.
- `flex` : raccourci pour les trois propriétés précédentes.
- `align-self` : aligne un élément différemment des autres sur l’axe secondaire.
- `order` : change l’ordre d’affichage sans toucher au HTML.

```css
.flex-item {
  flex-grow: 1;     /* Peut grandir */
  flex-shrink: 1;   /* Peut rétrécir */
  flex-basis: auto; /* Taille de base */
}
.flex-1 { flex: 1; }           /* grandit et rétrécit, taille 0% */
.flex-auto { flex: auto; }     /* grandit et rétrécit, taille auto */
.flex-none { flex: none; }     /* taille fixe */
.align-self-center { align-self: center; }
.order-last { order: 999; }
```

### Exemple d’utilisation

```html
<div class="flex-container">
  <div class="flex-item">Élément 1</div>
  <div class="flex-item">Élément 2</div>
  <div class="flex-item">Élément 3</div>
</div>
```

```css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
.flex-item {
  background: #007bff;
  color: white;
  padding: 1rem;
  border-radius: 4px;
}
```

> Astuce : Utilisez la propriété `gap` pour espacer les éléments sans ajouter de marges individuelles.

### Résumé visuel des propriétés principales
| Propriété         | Rôle principal                                 |
|-------------------|------------------------------------------------|
| display: flex     | Active le mode flexbox sur le conteneur        |
| flex-direction    | Définit l’axe principal (ligne ou colonne)     |
| flex-wrap         | Permet le retour à la ligne                    |
| justify-content   | Aligne sur l’axe principal                     |
| align-items       | Aligne sur l’axe secondaire                    |
| align-content     | Aligne les lignes multiples                    |
| flex-grow         | Permet à un élément de grandir                 |
| flex-shrink       | Permet à un élément de rétrécir                |
| flex-basis        | Taille de base de l’élément                    |
| flex              | Raccourci pour grow/shrink/basis               |
| align-self        | Alignement individuel sur l’axe secondaire     |
| order             | Change l’ordre d’affichage                     |

---

## CSS Grid

CSS Grid est le système de mise en page le plus puissant de CSS pour organiser des éléments en deux dimensions (lignes et colonnes). Il permet de créer des structures complexes, des zones, et de contrôler précisément l’alignement et la taille des éléments.

### Pourquoi utiliser CSS Grid ?
- Pour créer des layouts de page entiers (en-tête, sidebar, contenu, footer, etc.)
- Pour organiser des galeries, des tableaux de bord, ou tout agencement en grille
- Pour gérer facilement l’alignement vertical et horizontal, les espacements, et les zones nommées

> Astuce : Utilisez Grid pour la structure globale de la page, et Flexbox pour les composants internes.

### Le principe de base
Pour activer Grid, appliquez `display: grid;` à un conteneur. Vous pouvez ensuite définir le nombre de colonnes, de lignes, les espacements, et placer chaque élément où vous le souhaitez.

```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* 3 colonnes de tailles différentes */
  grid-template-rows: auto 1fr auto;  /* 3 lignes */
  gap: 1rem;
}
```

### Définir les colonnes et lignes
- `grid-template-columns` : définit la taille et le nombre de colonnes
- `grid-template-rows` : définit la taille et le nombre de lignes
- `gap` : espace entre les cellules

```css
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-rows-2 { grid-template-rows: 100px 1fr; }
```

### Zones nommées et placement
Vous pouvez nommer des zones pour rendre le code plus lisible et placer les éléments facilement.

```css
.grid-areas {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 150px;
  grid-template-rows: auto 1fr auto;
}
.grid-header { grid-area: header; }
.grid-sidebar { grid-area: sidebar; }
.grid-main { grid-area: main; }
.grid-aside { grid-area: aside; }
.grid-footer { grid-area: footer; }
```

### Placement et alignement des éléments
- `grid-column` et `grid-row` : pour placer un élément sur plusieurs colonnes ou lignes
- `justify-items` et `align-items` : pour aligner les éléments dans leur cellule
- `justify-content` et `align-content` : pour aligner la grille entière dans le conteneur

```css
.grid-item-span {
  grid-column: 1 / 3; /* De la colonne 1 à 3 */
  grid-row: 2 / 4;    /* De la ligne 2 à 4 */
}
.justify-self-center { justify-self: center; }
.align-self-end { align-self: end; }
```

> Astuce : Les unités `fr` (fraction) permettent de répartir l’espace restant de façon flexible.

### Exemple d’utilisation

```html
<div class="grid-container">
  <div class="grid-header">En-tête</div>
  <div class="grid-sidebar">Menu</div>
  <div class="grid-main">Contenu principal</div>
  <div class="grid-aside">Aside</div>
  <div class="grid-footer">Pied de page</div>
</div>
```


---

## Layouts responsives

Un layout responsive s'adapte à toutes les tailles d'écran grâce à Grid, Flexbox, les media queries et, plus récemment, les container queries.

```css
/* Grid responsive */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

/* Flexbox responsive */
.responsive-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.responsive-flex > * {
  flex: 1 1 250px;
}

/* Container queries (moderne) */
@container (min-width: 400px) {
  .card {
    display: flex;
    align-items: center;
  }
}

/* Media queries classiques */
@media (max-width: 768px) {
  .desktop-grid {
    grid-template-columns: 1fr;
  }
  
  .flex-container {
    flex-direction: column;
  }
}
```

> Astuce : Privilégiez les unités relatives (`fr`, `%`, `em`, `rem`) pour une meilleure adaptabilité.

---

## Exemple pratique complet

Voici un exemple complet combinant Grid, Flexbox, positionnement, et responsive design. Analysez chaque section pour comprendre comment les techniques s'articulent.

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mise en page CSS</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: system-ui, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    
    /* Layout principal avec Grid */
    .main-layout {
      display: grid;
      grid-template-areas:
        "header header header"
        "sidebar main aside"
        "footer footer footer";
      grid-template-columns: 250px 1fr 200px;
      grid-template-rows: auto 1fr auto;
      min-height: 100vh;
      gap: 1rem;
      padding: 1rem;
      background: #f5f5f5;
    }
    
    /* Header fixe */
    .header {
      grid-area: header;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      padding: 2rem;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .header h1 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    
    /* Navigation sticky */
    .nav {
      position: sticky;
      top: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 1rem;
    }
    
    .nav ul {
      list-style: none;
    }
    
    .nav li {
      margin-bottom: 0.5rem;
    }
    
    .nav a {
      text-decoration: none;
      color: #667eea;
      padding: 0.5rem;
      display: block;
      border-radius: 4px;
      transition: background 0.2s;
    }
    
    .nav a:hover {
      background: #f0f8ff;
    }
    
    /* Sidebar */
    .sidebar {
      grid-area: sidebar;
    }
    
    /* Contenu principal avec Flexbox */
    .main {
      grid-area: main;
      background: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .content-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    
    .card {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 1.5rem;
      border-left: 4px solid #667eea;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
    
    .card h3 {
      color: #667eea;
      margin-bottom: 1rem;
    }
    
    /* Aside avec positionnement */
    .aside {
      grid-area: aside;
      position: relative;
    }
    
    .widget {
      background: white;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .widget h4 {
      color: #764ba2;
      margin-bottom: 0.5rem;
    }
    
    /* Notification flottante */
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background: #28a745;
      color: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      z-index: 1000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    }
    
    .notification.show {
      transform: translateX(0);
    }
    
    /* Footer */
    .footer {
      grid-area: footer;
      background: #343a40;
      color: white;
      padding: 2rem;
      border-radius: 8px;
      text-align: center;
    }
    
    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    /* Positionnement d'éléments */
    .positioned-demo {
      position: relative;
      height: 200px;
      background: #e9ecef;
      border-radius: 8px;
      margin: 2rem 0;
    }
    
    .absolute-element {
      position: absolute;
      background: #dc3545;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
    }
    
    .top-left { top: 10px; left: 10px; }
    .top-right { top: 10px; right: 10px; }
    .center {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .bottom-right { bottom: 10px; right: 10px; }
    
    /* Flexbox demo */
    .flex-demo {
      display: flex;
      gap: 1rem;
      margin: 1rem 0;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
    }
    
    .flex-item {
      background: #007bff;
      color: white;
      padding: 1rem;
      border-radius: 4px;
      text-align: center;
    }
    
    .flex-1 { flex: 1; }
    .flex-2 { flex: 2; }
    .flex-none { flex: none; width: 100px; }
    
    /* Responsive */
    @media (max-width: 1024px) {
      .main-layout {
        grid-template-areas:
          "header header"
          "main aside"
          "sidebar sidebar"
          "footer footer";
        grid-template-columns: 1fr 200px;
      }
    }
    
    @media (max-width: 768px) {
      .main-layout {
        grid-template-areas:
          "header"
          "main"
          "aside"
          "sidebar"
          "footer";
        grid-template-columns: 1fr;
        gap: 0.5rem;
        padding: 0.5rem;
      }
      
      .content-grid {
        grid-template-columns: 1fr;
      }
      
      .footer-content {
        flex-direction: column;
        text-align: center;
      }
    }
  </style>
</head>
<body>
  <div class="main-layout">
    <header class="header">
      <h1>Mise en page CSS</h1>
      <p>Démonstration des techniques de layout modernes</p>
    </header>
    
    <aside class="sidebar">
      <nav class="nav">
        <ul>
          <li><a href="#grid">CSS Grid</a></li>
          <li><a href="#flexbox">Flexbox</a></li>
          <li><a href="#position">Positionnement</a></li>
          <li><a href="#responsive">Responsive</a></li>
        </ul>
      </nav>
    </aside>
    
    <main class="main">
      <h2>Contenu principal</h2>
      <p>Cette page démontre différentes techniques de mise en page CSS modernes.</p>
      
      <section id="position">
        <h3>Positionnement</h3>
        <div class="positioned-demo">
          <div class="absolute-element top-left">Top Left</div>
          <div class="absolute-element top-right">Top Right</div>
          <div class="absolute-element center">Center</div>
          <div class="absolute-element bottom-right">Bottom Right</div>
        </div>
      </section>
      
      <section id="flexbox">
        <h3>Flexbox</h3>
        <div class="flex-demo">
          <div class="flex-item flex-1">Flex: 1</div>
          <div class="flex-item flex-2">Flex: 2</div>
          <div class="flex-item flex-none">Fixe</div>
        </div>
      </section>
      
      <div class="content-grid">
        <div class="card">
          <h3>CSS Grid</h3>
          <p>CSS Grid permet de créer des layouts complexes en deux dimensions avec un contrôle précis sur les lignes et colonnes.</p>
        </div>
        
        <div class="card">
          <h3>Flexbox</h3>
          <p>Flexbox excelle pour les layouts en une dimension et l'alignement des éléments dans un container.</p>
        </div>
        
        <div class="card">
          <h3>Positionnement</h3>
          <p>Les différents types de positionnement permettent de placer les éléments précisément sur la page.</p>
        </div>
      </div>
    </main>
    
    <aside class="aside">
      <div class="widget">
        <h4>Informations</h4>
        <p>Cette sidebar utilise du positionnement sticky.</p>
      </div>
      
      <div class="widget">
        <h4>Ressources</h4>
        <ul>
          <li>MDN CSS Grid</li>
          <li>CSS-Tricks Flexbox</li>
          <li>Can I Use</li>
        </ul>
      </div>
    </aside>
    
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2024 Cours CSS</p>
        <p>Mise en page moderne</p>
      </div>
    </footer>
  </div>
  
  <div class="notification" id="notification">
    Page chargée avec succès !
  </div>
  
  <script>
    // Afficher la notification
    setTimeout(() => {
      document.getElementById('notification').classList.add('show');
    }, 1000);
    
    // Masquer la notification
    setTimeout(() => {
      document.getElementById('notification').classList.remove('show');
    }, 4000);
  </script>
</body>
</html>
```


---

## Comparaison des techniques

| Technique   | Avantages                | Inconvénients           | Usage principal         |
|-------------|--------------------------|-------------------------|------------------------|
| **Float**   | Support universel        | Difficile à maintenir   | Habillage d'images     |
| **Position**| Placement précis         | Sort du flux normal     | Éléments spécifiques   |
| **Flexbox** | Alignement flexible      | 1 dimension             | Composants, barres     |
| **Grid**    | Layout 2D puissant       | Plus complexe à débuter | Structure de page      |

> Astuce : Combinez Grid pour la structure globale et Flexbox pour les composants internes.

---

## Bonnes pratiques

1. **Utilisez Grid pour les layouts** de page
2. **Utilisez Flexbox pour les composants**
3. **Évitez les float** pour la mise en page
4. **Testez sur différentes tailles** d'écran
5. **Privilégiez les unités relatives**
6. **Commentez votre code CSS** pour plus de clarté

---

## Résumé

La mise en page moderne CSS offre des outils puissants comme Grid et Flexbox. Le choix de la technique dépend du contexte : Grid pour les layouts globaux, Flexbox pour les composants, et positionnement pour les éléments spécifiques. Maîtriser ces outils, c'est garantir des interfaces robustes, adaptatives et agréables à utiliser.
