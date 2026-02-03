# 3.3 Propriétés visuelles

## Introduction

Les propriétés visuelles CSS constituent le cœur de la mise en forme et du design web. Elles permettent de transformer des documents HTML basiques en interfaces modernes et attrayantes. Ces propriétés contrôlent tous les aspects visuels des éléments : couleurs, typographie, espacements, bordures, ombres et effets spéciaux.

**Pourquoi maîtriser les propriétés visuelles ?**
- **Créer une identité visuelle** cohérente et professionnelle
- **Améliorer l'expérience utilisateur** avec des interfaces claires et attrayantes
- **Respecter les principes d'accessibilité** avec des contrastes appropriés
- **Optimiser la lisibilité** du contenu avec une typographie adaptée
- **Développer des designs responsives** qui s'adaptent à tous les écrans

Dans ce chapitre, nous explorerons chaque famille de propriétés avec des exemples pratiques et des conseils d'utilisation professionnelle.

## Introduction aux Variables CSS (Custom Properties)

Les **variables CSS**, aussi appelées **custom properties**, sont l'une des fonctionnalités les plus révolutionnaires de CSS moderne. Elles permettent de stocker des valeurs réutilisables et de créer des systèmes de design cohérents et maintenables.

### Qu'est-ce qu'une variable CSS ?

Une variable CSS est une entité définie par le développeur qui contient une valeur spécifique à réutiliser dans tout le document. Elle est définie avec la syntaxe `--nom-variable: valeur` et utilisée avec la fonction `var(--nom-variable)`.

### Pourquoi utiliser les variables CSS ?

- **🔄 Cohérence** : Une seule modification met à jour toutes les occurrences
- **🛠️ Maintenance** : Facilite la modification des thèmes et couleurs
- **🎨 Flexibilité** : Permet le changement dynamique via JavaScript
- **📱 Thèmes** : Facilite la création de modes sombre/clair
- **🚀 Performance** : Pas de preprocessing nécessaire
- **🔍 Lisibilité** : Code plus expressif avec des noms descriptifs

### Syntaxe de base

```css
/* DÉFINITION : dans :root pour une portée globale */
:root {
  --ma-couleur: #007bff;
  --ma-police: 'Arial', sans-serif;
  --mon-espacement: 1rem;
}

/* UTILISATION : avec la fonction var() */
.mon-element {
  color: var(--ma-couleur);
  font-family: var(--ma-police);
  padding: var(--mon-espacement);
}

/* AVEC FALLBACK : valeur de secours si la variable n'existe pas */
.mon-element-securise {
  color: var(--ma-couleur-inexistante, #333333);
}
```

### Avantages par rapport aux preprocesseurs (Sass, Less)

- ✅ **Dynamiques** : Modifiables en temps réel via JavaScript
- ✅ **Natives** : Pas de compilation nécessaire
- ✅ **Héritées** : Respectent la cascade CSS
- ✅ **Inspectables** : Visibles dans les DevTools
- ✅ **Responsive** : Peuvent changer selon les media queries

### Exemple concret d'utilité

Imaginez que vous devez changer la couleur principale de votre site. Sans variables CSS :
```css
/* PROBLÈME : Répétition et risque d'oubli */
.header { background: #007bff; }
.button { background: #007bff; }
.link { color: #007bff; }
.border { border-color: #007bff; }
/* ... 50 autres occurrences à modifier manuellement */
```

Avec variables CSS :
```css
/* SOLUTION : Une seule modification */
:root {
  --primary-color: #007bff; /* Changer seulement ici ! */
}

.header { background: var(--primary-color); }
.button { background: var(--primary-color); }
.link { color: var(--primary-color); }
.border { border-color: var(--primary-color); }
```

Maintenant que nous comprenons l'intérêt des variables CSS, voyons comment les utiliser concrètement pour les couleurs :

```css
/* Variables CSS pour les couleurs - Approche moderne recommandée */
:root {
  --primary-color: #007bff;    /* Bleu principal */
  --secondary-color: #6c757d;  /* Gris secondaire */
  --success-color: #28a745;    /* Vert de succès */
  --danger-color: #dc3545;     /* Rouge d'erreur */
  --warning-color: #ffc107;    /* Jaune d'avertissement */
  
  /* Palette étendue avec nuances */
  --primary-50: #e3f2fd;      /* Très clair */
  --primary-100: #bbdefb;     /* Clair */
  --primary-500: #2196f3;     /* Standard */
  --primary-900: #0d47a1;     /* Très sombre */
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  /* Fallback si la variable n'est pas supportée */
  background-color: var(--primary-color, #007bff);
}
```

### 💡 Conseils d'utilisation
- Utilisez **les variables CSS** pour maintenir une cohérence chromatique
- Préférez **HSL** pour créer des variations de couleur intuitives
- **RGBA/HSLA** sont parfaits pour les overlays et effets de transparence
- Testez toujours **l'accessibilité** avec un contraste suffisant (ratio 4.5:1 minimum)


## Couleurs et arrière-plans

La couleur est l'un des éléments les plus impactants dans le design web. Elle véhicule des émotions, guide l'attention et renforce l'identité de marque. CSS offre plusieurs façons de définir et d'utiliser les couleurs, chacune avec ses avantages spécifiques.

### Propriétés de couleur

CSS propose plusieurs formats pour définir les couleurs, chacun adapté à des usages spécifiques :

**Formats de couleur disponibles :**
- **Hexadécimal (#007bff)** : Format le plus courant, compact et précis
- **RGB/RGBA** : Idéal pour les calculs programmatiques et la transparence
- **HSL/HSLA** : Intuitif pour les ajustements de teinte, saturation et luminosité
- **Noms de couleurs** : Pratique pour le prototypage (red, blue, etc.)
- **Variables CSS** : Essential pour la cohérence et la maintenance

```css
/* Couleur du texte - Différents formats */
.text-primary {
  color: #007bff;                    /* Hexadécimal - format standard */
  color: rgb(0, 123, 255);          /* RGB - Rouge, Vert, Bleu (0-255) */
  color: rgba(0, 123, 255, 0.8);    /* RGBA - avec transparence (alpha) */
  color: hsl(211, 100%, 50%);       /* HSL - Teinte, Saturation, Luminosité */
  color: hsla(211, 100%, 50%, 0.8); /* HSLA - avec transparence */
}
```


### Arrière-plans

Les arrière-plans CSS offrent de nombreuses possibilités créatives pour enrichir vos designs. Ils permettent d'ajouter de la couleur, des images, des dégradés et même des motifs complexes. Une bonne maîtrise des arrière-plans est essentielle pour créer des interfaces modernes et attrayantes.

**Types d'arrière-plans disponibles :**
- **Couleurs simples** : Base de tout design
- **Images** : Pour créer de l'impact visuel
- **Dégradés** : Effets modernes et élégants
- **Combinaisons multiples** : Superpositions créatives

```css
/* Couleur d'arrière-plan - Fondamental */
.bg-primary {
  background-color: #007bff;
  /* Toujours définir une couleur de fallback avec les images */
  background-color: var(--primary-color);
}

/* Image d'arrière-plan - Propriétés essentielles */
.hero-section {
  background-image: url('hero-bg.jpg');
  background-size: cover;        /* Couvre tout l'élément sans déformation */
  background-position: center;   /* Centre l'image */
  background-repeat: no-repeat;  /* Évite la répétition */
  background-attachment: fixed;  /* Effet parallax (optionnel) */
  
  /* Valeurs alternatives pour background-size */
  background-size: contain;      /* Affiche l'image entière */
  background-size: 100% 50%;     /* Contrôle précis largeur/hauteur */
  background-size: auto;         /* Taille originale */
}

/* Dégradés - Effet moderne incontournable */
.gradient-linear {
  /* Dégradé linéaire - direction et couleurs */
  background: linear-gradient(45deg, #007bff, #28a745);
  background: linear-gradient(to right, #ff6b6b, #4ecdc4);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.gradient-radial {
  /* Dégradé radial - du centre vers l'extérieur */
  background: radial-gradient(circle, #007bff, #0056b3);
  background: radial-gradient(ellipse at top, #ff9a56, #ff6b6b);
}

.gradient-advanced {
  /* Dégradés complexes avec multiple points */
  background: linear-gradient(
    90deg,
    #ff6b6b 0%,     /* Rouge au début */
    #4ecdc4 25%,    /* Turquoise à 25% */
    #45b7d1 75%,    /* Bleu à 75% */
    #96ceb4 100%    /* Vert à la fin */
  );
}

/* Arrière-plans multiples - Superpositions créatives */
.complex-bg {
  background: 
    /* Couche 1 : Motif répétitif en premier plan */
    url('pattern.png') repeat,
    /* Couche 2 : Overlay semi-transparent pour améliorer la lisibilité */
    linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
    /* Couche 3 : Image de fond principale */
    url('background.jpg') center/cover no-repeat;
}

/* Techniques avancées d'arrière-plan */
.bg-advanced {
  /* Clip-path pour des formes personnalisées */
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  
  /* Animation de dégradé */
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

**🎨 Bonnes pratiques pour les arrière-plans :**
- **Performance** : Optimisez les images (format WebP, compression)
- **Accessibilité** : Assurez-vous que le texte reste lisible sur tous les arrière-plans
- **Responsive** : Testez les arrière-plans sur différentes tailles d'écran
- **Fallback** : Toujours prévoir une couleur de secours avec les images

## Typographie

La typographie est l'art de rendre le texte lisible, accessible et attrayant. En web design, elle joue un rôle crucial dans l'expérience utilisateur et la hiérarchie visuelle. CSS offre un contrôle précis sur tous les aspects typographiques : police, taille, espacement, et mise en forme.

**Enjeux de la typographie web :**
- **Lisibilité** : Faciliter la lecture sur tous types d'écrans
- **Hiérarchie** : Guider l'œil et structurer l'information
- **Identité** : Renforcer la personnalité de la marque
- **Performance** : Optimiser le chargement des polices
- **Accessibilité** : Respecter les besoins de tous les utilisateurs

### Propriétés de police

Le choix et la configuration des polices constituent la base d'une typographie réussie. CSS permet de contrôler finement chaque aspect de l'affichage du texte.

```css
/* Famille de police - La fondation typographique */
.font-primary {
  font-family: 'Roboto', 'Arial', sans-serif;
  /* Ordre important : police préférée, puis alternatives, puis générique */
}

.font-heading {
  font-family: 'Playfair Display', 'Georgia', serif;
  /* Serif pour les titres élégants et traditionnels */
}

.font-code {
  font-family: 'Fira Code', 'Courier New', monospace;
  /* Monospace pour le code : chaque caractère a la même largeur */
}

/* Chargement de polices web - Méthodes modernes */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');
/* Ou dans le HTML : <link> dans le <head> */

/* Taille de police - Unités et techniques responsives */
.text-sizes {
  font-size: 16px;                    /* Pixels absolus - contrôle précis */
  font-size: 1rem;                    /* Relatif à la racine (16px par défaut) */
  font-size: 1.2em;                   /* Relatif au parent - attention aux cumuls */
  font-size: 120%;                    /* Pourcentage - similaire à em */
  font-size: clamp(14px, 2vw, 24px);  /* Responsive fluide : min, idéal, max */
}

/* Système de tailles cohérent */
:root {
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
}

/* Poids de police - Impact visuel et hiérarchie */
.font-weights {
  font-weight: 100;       /* Thin - très fin */
  font-weight: 300;       /* Light - fin */
  font-weight: 400;       /* Normal/Regular - standard */
  font-weight: 500;       /* Medium - moyennement gras */
  font-weight: 600;       /* Semi-bold - semi-gras */
  font-weight: 700;       /* Bold - gras */
  font-weight: 800;       /* Extra-bold - très gras */
  font-weight: 900;       /* Black - ultra-gras */
  
  /* Mots-clés relatifs */
  font-weight: normal;    /* Équivalent à 400 */
  font-weight: bold;      /* Équivalent à 700 */
  font-weight: lighter;   /* Plus fin que l'élément parent */
  font-weight: bolder;    /* Plus gras que l'élément parent */
}

/* Styles de police - Variations esthétiques */
.font-styles {
  font-style: normal;     /* Style droit standard */
  font-style: italic;     /* Italique - version redessinée */
  font-style: oblique;    /* Oblique - version inclinée */
  font-style: oblique 15deg; /* Oblique avec angle personnalisé */
}

/* Propriétés avancées de police */
.font-advanced {
  font-variant: small-caps;           /* Petites capitales */
  font-stretch: expanded;             /* Étirement horizontal */
  font-size-adjust: 0.5;              /* Ajustement de taille cross-browser */
  
  /* Propriété raccourcie font */
  font: italic bold 1.2rem/1.6 'Georgia', serif;
  /*     style weight size/line-height family */
}
```

**⚡ Optimisation des polices web :**
- Utilisez `font-display: swap` pour améliorer les performances
- Préchargez les polices critiques avec `<link rel="preload">`
- Limitez le nombre de variantes pour réduire la taille
- Utilisez des formats modernes (WOFF2) avec fallback

### Mise en forme du texte

Au-delà du choix de la police, la mise en forme du texte comprend l'alignement, la décoration, l'espacement et la gestion du débordement. Ces propriétés permettent de créer une hiérarchie visuelle claire et d'améliorer l'expérience de lecture.

```css
/* Alignement - Contrôle la disposition horizontale */
.text-alignment {
  text-align: left;       /* Alignement à gauche (défaut en LTR) */
  text-align: center;     /* Centré - pour titres et éléments courts */
  text-align: right;      /* Alignement à droite - utilisation spécialisée */
  text-align: justify;    /* Justifié - attention aux espaces irréguliers */
  text-align: start;      /* Début logique (gauche en LTR, droite en RTL) */
  text-align: end;        /* Fin logique - respecte la direction du texte */
}

/* Décoration de texte - Effets visuels sur le texte */
.text-decoration {
  text-decoration: none;                    /* Supprime toute décoration */
  text-decoration: underline;               /* Soulignement classique */
  text-decoration: line-through;            /* Barré - pour les suppressions */
  text-decoration: overline;                /* Ligne au-dessus */
  
  /* Décorations avancées avec style, couleur et épaisseur */
  text-decoration: underline wavy red;      /* Soulignement ondulé rouge */
  text-decoration: underline dotted blue 2px; /* Pointillé bleu épais */
  text-decoration: line-through solid #ccc 1px; /* Barré gris fin */
}

/* Propriétés individuelles pour plus de contrôle */
.text-decoration-advanced {
  text-decoration-line: underline overline; /* Multiple lignes */
  text-decoration-style: wavy;              /* Style : solid, dotted, dashed, wavy */
  text-decoration-color: var(--primary-color); /* Couleur indépendante */
  text-decoration-thickness: 2px;           /* Épaisseur personnalisée */
  text-underline-offset: 4px;               /* Distance du texte */
}

/* Transformation du texte - Modification de la casse */
.text-transform {
  text-transform: uppercase;    /* TOUT EN MAJUSCULES */
  text-transform: lowercase;    /* tout en minuscules */
  text-transform: capitalize;   /* Première Lettre De Chaque Mot */
  text-transform: none;         /* Texte original inchangé */
}

/* Espacement - Contrôle la lisibilité et le rythme */
.text-spacing {
  line-height: 1.6;           /* Interligne - 1.4-1.8 recommandé pour la lecture */
  letter-spacing: 0.1em;      /* Espacement entre caractères - crénage */
  word-spacing: 0.2em;        /* Espacement entre mots */
  text-indent: 2rem;          /* Indentation de première ligne */
  
  /* Valeurs recommandées selon le contexte */
  line-height: 1.2;           /* Titres - plus serré */
  line-height: 1.6;           /* Texte courant - confortable */
  line-height: 1.8;           /* Texte long - très lisible */
}

/* Espacement avancé pour la typographie fine */
.typography-advanced {
  /* Espacement négatif pour rapprocher les éléments */
  letter-spacing: -0.02em;    /* Légèrement plus serré */
  
  /* Espacement positif pour aérer */
  letter-spacing: 0.05em;     /* Légèrement plus aéré */
  
  /* Cas spéciaux */
  letter-spacing: 0.1em;      /* Boutons et labels */
  letter-spacing: 0.15em;     /* Texte en majuscules */
}

/* Gestion du débordement - Techniques essentielles */
.text-overflow {
  /* Ellipsis classique - ligne unique */
  white-space: nowrap;        /* Empêche le retour à la ligne */
  overflow: hidden;           /* Cache le débordement */
  text-overflow: ellipsis;    /* Ajoute "..." à la fin */
  
  /* Variantes pour différents cas */
  white-space: pre;           /* Préserve les espaces et sauts de ligne */
  white-space: pre-wrap;      /* Préserve + retour à la ligne automatique */
  white-space: pre-line;      /* Préserve sauts de ligne + normalise espaces */
}

/* Troncature multi-lignes - Technique moderne */
.text-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;      /* Nombre de lignes à afficher */
  overflow: hidden;
  line-height: 1.5;
}

/* Césure - Améliore la justification */
.text-hyphenation {
  hyphens: auto;              /* Césure automatique */
  hyphenate-limit-chars: 6 3 3; /* Min caractères : total, avant, après */
}

/* Sélection de texte personnalisée */
.text-selection {
  user-select: none;          /* Empêche la sélection */
  user-select: all;           /* Sélectionne tout en un clic */
}

::selection {
  background-color: var(--primary-color);
  color: white;
}
```

**📝 Bonnes pratiques typographiques :**
- **Interligne** : 1.4-1.6 pour la lecture, 1.2 pour les titres
- **Longueur de ligne** : 45-75 caractères pour un confort optimal
- **Contraste** : Ratio minimum 4.5:1 pour l'accessibilité
- **Hiérarchie** : Utilisez taille, poids et espacement pour structurer

## Modèle de boîte

Le modèle de boîte CSS est un concept fondamental qui définit comment les éléments HTML occupent l'espace sur une page web. Chaque élément est représenté comme une boîte rectangulaire composée de quatre zones : le contenu, le padding (espacement interne), la bordure, et la marge (espacement externe).

**Composants du modèle de boîte :**
- **Contenu** : Zone où apparaît le texte et les images
- **Padding** : Espacement transparent autour du contenu
- **Bordure** : Ligne entourant le padding et le contenu
- **Marge** : Espacement transparent à l'extérieur de la bordure

**Deux modèles de calcul :**
- **Content-box** (défaut) : width/height = contenu uniquement
- **Border-box** (recommandé) : width/height = contenu + padding + bordure

### Dimensions

Le contrôle précis des dimensions est essentiel pour créer des layouts cohérents et responsives. CSS offre de nombreuses unités et techniques pour s'adapter à tous les contextes.

```css
/* Largeur et hauteur - Bases du dimensionnement */
.box-sizing {
  width: 300px;                    /* Largeur fixe en pixels */
  height: 200px;                   /* Hauteur fixe en pixels */
  max-width: 100%;                 /* Largeur maximale - évite le débordement */
  min-height: 150px;               /* Hauteur minimale - garantit un minimum */
  
  /* Contrôle du modèle de boîte - ESSENTIEL */
  box-sizing: border-box;          /* Inclut padding et bordure dans width/height */
  box-sizing: content-box;         /* Défaut - width/height = contenu seulement */
}

/* Reset universel recommandé */
*,
*::before,
*::after {
  box-sizing: border-box;          /* Applique border-box à tous les éléments */
}

/* Unités modernes et responsives */
.modern-units {
  /* Unités viewport - Relatives à la taille de l'écran */
  width: 50vw;                     /* 50% de la largeur viewport */
  height: 100vh;                   /* 100% de la hauteur viewport */
  font-size: 4vmin;                /* 4% de la plus petite dimension */
  padding: 2vmax;                  /* 2% de la plus grande dimension */
  
  /* Unités relatives modernes */
  width: 80ch;                     /* 80 caractères de large */
  height: 3lh;                     /* 3 fois la hauteur de ligne */
  
  /* Fonctions CSS modernes */
  width: min(500px, 90vw);         /* Le plus petit entre 500px et 90vw */
  height: max(200px, 30vh);        /* Le plus grand entre 200px et 30vh */
  padding: clamp(1rem, 2vw, 3rem); /* Fluide entre 1rem et 3rem */
}

/* Techniques responsives avancées */
.responsive-dimensions {
  /* Container queries - Responsive selon le parent */
  width: 100cqw;                   /* 100% de la largeur du container */
  height: 50cqh;                   /* 50% de la hauteur du container */
  
  /* Aspect ratio - Maintient les proportions */
  aspect-ratio: 16 / 9;            /* Format vidéo */
  aspect-ratio: 1;                 /* Carré parfait */
  aspect-ratio: 4 / 3;             /* Format photo classique */
}

/* Contrôle fin des dimensions */
.dimension-control {
  /* Largeurs flexibles */
  width: 100%;                     /* Prend toute la largeur disponible */
  max-width: 1200px;               /* Limite pour grands écrans */
  min-width: 320px;                /* Minimum pour petits écrans */
  
  /* Hauteurs intelligentes */
  height: auto;                    /* Hauteur selon le contenu */
  height: fit-content;             /* Hauteur optimale du contenu */
  height: min-content;             /* Hauteur minimale du contenu */
  height: max-content;             /* Hauteur maximale du contenu */
}

/* Exemples de layouts courants */
.layout-patterns {
  /* Card responsive */
  width: clamp(300px, 45%, 500px);
  aspect-ratio: 3 / 4;
  
  /* Sidebar fixe */
  width: clamp(200px, 20vw, 300px);
  height: 100vh;
  
  /* Hero section */
  width: 100vw;
  height: 100vh;
  min-height: 500px;
}
```

**📐 Conseils pour les dimensions :**
- **Toujours utiliser** `box-sizing: border-box`
- **Préférer les unités relatives** (rem, %, vw/vh) pour la responsivité
- **Utiliser clamp()** pour des dimensions fluides et contraintes
- **Définir max-width** pour éviter les débordements sur grands écrans

### Espacement

L'espacement (margin et padding) est crucial pour créer des layouts équilibrés et une hiérarchie visuelle claire. Une maîtrise de ces propriétés permet de contrôler précisément l'espace autour et à l'intérieur des éléments.

**Différence fondamentale :**
- **Margin** : Espacement externe, transparent, peut fusionner avec les marges adjacentes
- **Padding** : Espacement interne, hérite de la couleur de fond, ne fusionne jamais

```css
/* Marges - Espacement externe */
.margins {
  /* Syntaxes possibles - de la plus courte à la plus précise */
  margin: 20px;                    /* Toutes les directions identiques */
  margin: 10px 20px;              /* Vertical (haut/bas) | Horizontal (gauche/droite) */
  margin: 10px 15px 20px 25px;    /* Haut | Droite | Bas | Gauche (sens horaire) */
  
  /* Propriétés individuelles - contrôle précis */
  margin-top: 10px;               /* Marge supérieure */
  margin-right: 15px;             /* Marge droite */
  margin-bottom: 20px;            /* Marge inférieure */
  margin-left: 25px;              /* Marge gauche */
  
  /* Techniques spéciales */
  margin: 0 auto;                 /* Centrage horizontal d'un élément de largeur fixe */
  margin: auto;                   /* Centrage dans toutes les directions (flexbox/grid) */
}

/* Fusion des marges - Concept important */
.margin-collapse {
  margin-bottom: 20px;            /* Marge de l'élément du haut */
}
.margin-collapse + .margin-collapse {
  margin-top: 30px;               /* Marge de l'élément du bas */
  /* Résultat : 30px d'espace (pas 50px) - la plus grande marge l'emporte */
}

/* Padding - Espacement interne */
.padding {
  /* Syntaxes identiques aux marges */
  padding: 20px;                  /* Espacement uniforme */
  padding: 1rem 2rem;             /* Vertical 1rem | Horizontal 2rem */
  padding: 0.5rem 1rem 1.5rem 2rem; /* Haut | Droite | Bas | Gauche */
  
  /* Propriétés logiques modernes - Recommandées pour l'internationalisation */
  padding-block: 1rem;            /* Espacement vertical (haut/bas) */
  padding-inline: 2rem;           /* Espacement horizontal (gauche/droite) */
  padding-block-start: 0.5rem;    /* Début du bloc (haut en LTR) */
  padding-block-end: 1.5rem;      /* Fin du bloc (bas en LTR) */
  padding-inline-start: 1rem;     /* Début de ligne (gauche en LTR) */
  padding-inline-end: 2rem;       /* Fin de ligne (droite en LTR) */
}

/* Système d'espacement cohérent - Approche professionnelle */
:root {
  /* Échelle d'espacement basée sur une progression géométrique */
  --spacing-xs: 0.25rem;   /* 4px - Espacement minimal */
  --spacing-sm: 0.5rem;    /* 8px - Espacement réduit */
  --spacing-md: 1rem;      /* 16px - Espacement standard */
  --spacing-lg: 1.5rem;    /* 24px - Espacement large */
  --spacing-xl: 2rem;      /* 32px - Espacement très large */
  --spacing-2xl: 3rem;     /* 48px - Espacement extra-large */
  --spacing-3xl: 4rem;     /* 64px - Espacement maximal */
  
  /* Espacements spécialisés */
  --spacing-section: 4rem;  /* Entre sections */
  --spacing-component: 2rem; /* Entre composants */
  --spacing-element: 1rem;  /* Entre éléments */
  --spacing-content: 0.5rem; /* Dans le contenu */
}

/* Application du système d'espacement */
.card {
  padding: var(--spacing-md);              /* Espacement interne standard */
  margin-bottom: var(--spacing-lg);        /* Espacement entre cartes */
  
  /* Espacement responsif avec clamp */
  padding: clamp(var(--spacing-sm), 2vw, var(--spacing-lg));
}

.section {
  padding-block: var(--spacing-section);   /* Espacement vertical de section */
  margin-inline: auto;                     /* Centrage horizontal */
  max-width: 1200px;                       /* Largeur maximale */
}

/* Techniques d'espacement avancées */
.spacing-advanced {
  /* Espacement négatif - pour créer des chevauchements */
  margin-top: -2rem;              /* Remonte l'élément */
  margin-left: -1rem;             /* Décale vers la gauche */
  
  /* Espacement conditionnel avec CSS moderne */
  margin-block: clamp(1rem, 5vw, 4rem);  /* Responsive vertical */
  
  /* Espacement avec gap (pour flexbox/grid) */
  display: flex;
  gap: var(--spacing-md);         /* Espacement entre enfants */
  row-gap: var(--spacing-lg);     /* Espacement vertical */
  column-gap: var(--spacing-sm);  /* Espacement horizontal */
}

/* Patterns d'espacement courants */
.spacing-patterns {
  /* Stack vertical avec espacement uniforme */
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  
  /* Layout avec espacement externe */
  margin: var(--spacing-lg) auto;
  padding: var(--spacing-md);
  max-width: 800px;
}
```

**🔧 Bonnes pratiques d'espacement :**
- **Utilisez un système cohérent** avec des variables CSS
- **Préférez rem/em** aux pixels pour la scalabilité
- **Attention aux marges qui fusionnent** - utilisez padding si nécessaire
- **Testez sur différents écrans** avec des espacements responsifs

### Bordures

Les bordures CSS permettent de délimiter les éléments et de créer des designs structurés. Elles offrent de nombreuses possibilités créatives : styles variés, coins arrondis, bordures dégradées et animations. Une utilisation judicieuse des bordures améliore la lisibilité et l'esthétique de l'interface.

**Composants d'une bordure :**
- **Largeur** (border-width) : Épaisseur de la bordure
- **Style** (border-style) : Type de ligne (solid, dashed, dotted, etc.)
- **Couleur** (border-color) : Couleur de la bordure

```css
/* Bordures de base - Syntaxes et propriétés */
.borders {
  /* Propriété raccourcie - largeur style couleur */
  border: 2px solid #007bff;                /* Bordure uniforme */
  border-top: 1px dashed #28a745;          /* Bordure supérieure spécifique */
  border-right: 3px dotted #dc3545;        /* Bordure droite spécifique */
  border-bottom: 2px double #ffc107;       /* Bordure inférieure spécifique */
  border-left: 4px groove #6c757d;         /* Bordure gauche spécifique */
  
  /* Propriétés individuelles pour contrôle fin */
  border-width: 1px 2px 3px 4px;           /* Haut | Droite | Bas | Gauche */
  border-style: solid dashed dotted double; /* Différents styles par côté */
  border-color: red green blue yellow;      /* Couleurs différentes par côté */
}

/* Styles de bordures disponibles */
.border-styles {
  border: 3px solid #333;    /* Ligne continue */
  border: 3px dashed #333;   /* Ligne pointillée */
  border: 3px dotted #333;   /* Points */
  border: 3px double #333;   /* Double ligne */
  border: 3px groove #333;   /* Effet gravé */
  border: 3px ridge #333;    /* Effet relief */
  border: 3px inset #333;    /* Effet enfoncé */
  border: 3px outset #333;   /* Effet saillant */
  border: 3px none;          /* Pas de bordure */
  border: 3px hidden;        /* Bordure cachée */
}

/* Bordures arrondies - Border-radius */
.rounded {
  /* Arrondis uniformes */
  border-radius: 8px;                       /* Coins légèrement arrondis */
  border-radius: 50%;                       /* Cercle parfait (si carré) */
  
  /* Arrondis différents par axe */
  border-radius: 10px 20px;                 /* Horizontal | Vertical */
  
  /* Contrôle individuel de chaque coin */
  border-radius: 10px 20px 30px 40px;       /* Haut-gauche | Haut-droite | Bas-droite | Bas-gauche */
  
  /* Propriétés individuelles */
  border-top-left-radius: 10px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 40px;
  
  /* Formes créatives */
  border-radius: 50% 20% 80% 10%;           /* Forme organique */
  border-radius: 0 0 50% 50%;               /* Demi-cercle en bas */
}

/* Bordures avec variables CSS */
:root {
  --border-width-thin: 1px;
  --border-width-medium: 2px;
  --border-width-thick: 4px;
  
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 16px;
  --border-radius-full: 50%;
  
  --border-color-light: #e2e8f0;
  --border-color-medium: #cbd5e0;
  --border-color-dark: #4a5568;
}

.card-bordered {
  border: var(--border-width-medium) solid var(--border-color-light);
  border-radius: var(--border-radius-md);
}

/* Bordures modernes et créatives */
.modern-borders {
  /* Bordure dégradée - Technique avancée */
  border: 2px solid transparent;
  background: 
    linear-gradient(white, white) padding-box,        /* Fond de l'élément */
    linear-gradient(45deg, #007bff, #28a745) border-box; /* Bordure dégradée */
  
  /* Alternative avec pseudo-élément */
  position: relative;
  background: white;
  border-radius: 8px;
}

.modern-borders::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 2px;
  background: linear-gradient(45deg, #007bff, #28a745);
  border-radius: inherit;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
}

/* Bordures animées */
.animated-border {
  border: 2px solid #007bff;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.animated-border:hover {
  border-color: #28a745;
  border-width: 4px;
  box-shadow: 0 0 20px rgba(40, 167, 69, 0.3);
}

/* Bordures avec motifs */
.pattern-border {
  /* Bordure pointillée espacée */
  border: 3px dashed #007bff;
  border-image: repeating-linear-gradient(
    45deg,
    #007bff,
    #007bff 10px,
    transparent 10px,
    transparent 20px
  ) 1;
}

/* Bordures responsives */
.responsive-borders {
  border: var(--border-width-thin) solid var(--border-color-light);
  border-radius: var(--border-radius-sm);
  
  /* Adaptations pour différentes tailles d'écran */
  @media (min-width: 768px) {
    border-width: var(--border-width-medium);
    border-radius: var(--border-radius-md);
  }
  
  @media (min-width: 1024px) {
    border-width: var(--border-width-thick);
    border-radius: var(--border-radius-lg);
  }
}

/* Bordures avec contours (outline) */
.outline-borders {
  border: 2px solid #007bff;
  outline: 2px solid #28a745;
  outline-offset: 4px;           /* Espace entre bordure et contour */
  
  /* Contour personnalisé */
  outline: 3px dashed #dc3545;
  outline-offset: -3px;          /* Contour à l'intérieur */
}

/* Bordures pour l'accessibilité */
.focus-border {
  border: 2px solid transparent;
  transition: border-color 0.2s ease;
}

.focus-border:focus {
  border-color: #007bff;
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

/* Bordures décoratives */
.decorative-borders {
  /* Bordure avec coins coupés */
  clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));
  
  /* Bordure avec effet de découpe */
  border: 2px solid #007bff;
  position: relative;
}

.decorative-borders::after {
  content: '';
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  background: linear-gradient(45deg, #007bff, #28a745);
  border-radius: inherit;
  z-index: -1;
}
```

**🎨 Bonnes pratiques pour les bordures :**
- **Cohérence** : Utilisez un système de variables pour les largeurs et rayons
- **Performance** : Préférez border-radius aux images pour les coins arrondis
- **Accessibilité** : Assurez-vous que les bordures de focus sont visibles
- **Responsive** : Adaptez les bordures aux différentes tailles d'écran

## Ombres et effets

Les ombres CSS sont essentielles pour créer de la profondeur et de la hiérarchie visuelle dans vos designs. Elles permettent de simuler l'éclairage naturel et d'ajouter du réalisme aux interfaces. CSS offre deux types d'ombres : les ombres de boîte (box-shadow) et les ombres de texte (text-shadow).

**Avantages des ombres :**
- **Profondeur** : Créent une illusion de dimension
- **Hiérarchie** : Mettent en évidence les éléments importants
- **Élégance** : Apportent de la sophistication au design
- **Guidage** : Dirigent l'attention de l'utilisateur

### Ombres de boîte

Les ombres de boîte (box-shadow) s'appliquent autour des éléments et peuvent être externes ou internes. Elles sont définies par leur décalage, leur flou, leur étendue et leur couleur.

```css
/* Syntaxe complète : offset-x | offset-y | blur-radius | spread-radius | color */

/* Ombres simples - Différentes intensités */
.shadows {
  /* Ombre légère - Pour des éléments subtils */
  box-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  
  /* Ombre moyenne - Pour des cartes et boutons */
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  
  /* Ombre forte - Pour des modales et overlays */
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  
  /* Ombre très intense - Pour des éléments flottants */
  box-shadow: 0 12px 24px rgba(0,0,0,0.25);
}

/* Système d'ombres cohérent avec variables */
:root {
  --shadow-xs: 0 1px 2px rgba(0,0,0,0.05);     /* Très subtile */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);      /* Légère */
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);     /* Moyenne */
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);    /* Large */
  --shadow-xl: 0 20px 25px rgba(0,0,0,0.1);    /* Extra-large */
  --shadow-2xl: 0 25px 50px rgba(0,0,0,0.25);  /* Énorme */
  
  /* Ombres spécialisées */
  --shadow-inner: inset 0 2px 4px rgba(0,0,0,0.06);
  --shadow-focus: 0 0 0 3px rgba(59, 130, 246, 0.5);
  --shadow-error: 0 0 0 3px rgba(239, 68, 68, 0.5);
}

/* Ombres multiples - Superposition d'effets */
.complex-shadow {
  /* Combinaison d'ombres pour plus de réalisme */
  box-shadow: 
    0 1px 3px rgba(0,0,0,0.12),    /* Ombre proche */
    0 1px 2px rgba(0,0,0,0.24);    /* Ombre de contact */
    
  /* Ombre avec éclairage complexe */
  box-shadow:
    0 1px 1px rgba(0,0,0,0.15),    /* Ombre de base */
    0 10px 0 -5px #eee,            /* Couche intermédiaire */
    0 10px 1px -4px rgba(0,0,0,0.15), /* Ombre de la couche */
    0 20px 0 -10px #eee,           /* Deuxième couche */
    0 20px 1px -9px rgba(0,0,0,0.15);  /* Ombre de la deuxième couche */
}

/* Ombres intérieures - Effet enfoncé */
.inset-shadow {
  /* Ombre intérieure simple */
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
  
  /* Ombre intérieure complexe pour effet de relief */
  box-shadow: 
    inset 0 1px 2px rgba(0,0,0,0.1),
    inset 0 -1px 2px rgba(255,255,255,0.5);
}

/* Ombres colorées - Effet moderne */
.colored-shadow {
  /* Ombres avec couleur de marque */
  box-shadow: 0 4px 20px rgba(0, 123, 255, 0.3);     /* Bleu */
  box-shadow: 0 8px 25px rgba(40, 167, 69, 0.4);     /* Vert */
  box-shadow: 0 6px 15px rgba(220, 53, 69, 0.35);    /* Rouge */
  
  /* Ombres dégradées */
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  background: linear-gradient(45deg, #007bff, #28a745);
}

/* Ombres animées et interactives */
.animated-shadow {
  box-shadow: var(--shadow-md);
  transition: box-shadow 0.3s ease;
}

.animated-shadow:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-2px);
}

/* Ombres responsives */
.responsive-shadow {
  box-shadow: var(--shadow-sm);
  
  @media (min-width: 768px) {
    box-shadow: var(--shadow-md);
  }
  
  @media (min-width: 1024px) {
    box-shadow: var(--shadow-lg);
  }
}

/* Ombres pour différents composants */
.card-shadow { box-shadow: var(--shadow-md); }
.button-shadow { box-shadow: var(--shadow-sm); }
.modal-shadow { box-shadow: var(--shadow-2xl); }
.dropdown-shadow { box-shadow: var(--shadow-lg); }
.tooltip-shadow { box-shadow: var(--shadow-md); }
```

### Ombres de texte

Les ombres de texte (text-shadow) permettent de créer des effets typographiques impressionnants et d'améliorer la lisibilité du texte sur des arrière-plans complexes.

```css
/* Syntaxe : offset-x | offset-y | blur-radius | color */

/* Ombres de texte basiques */
.text-shadows {
  /* Ombre légère pour améliorer la lisibilité */
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  
  /* Ombre colorée coordonnée */
  text-shadow: 2px 2px 4px #007bff;
  
  /* Ombre douce pour texte sur image */
  text-shadow: 0 1px 3px rgba(0,0,0,0.8);
  
  /* Ombre forte pour contraste maximum */
  text-shadow: 2px 2px 0px #000, 4px 4px 6px rgba(0,0,0,0.3);
}

/* Effets spéciaux avec text-shadow */
.text-effects {
  /* Effet néon - Lueur colorée */
  color: white;
  text-shadow: 
    0 0 5px #007bff,
    0 0 10px #007bff,
    0 0 15px #007bff,
    0 0 20px #007bff;
  
  /* Effet de relief - Texte en 3D */
  color: #333;
  text-shadow: 
    1px 1px 0px #ccc,
    2px 2px 0px #bbb,
    3px 3px 0px #aaa,
    4px 4px 6px rgba(0,0,0,0.2);
  
  /* Effet gravé - Texte enfoncé */
  color: #666;
  text-shadow: 1px 1px 0px #fff, -1px -1px 0px #000;
  
  /* Effet flou artistique */
  color: transparent;
  text-shadow: 0 0 8px rgba(0,123,255,0.8);
}

/* Texte en relief - Embossed */
.embossed-text {
  color: #333;
  text-shadow: 1px 1px 0px #fff;
  background: #f0f0f0;
}

/* Texte gravé - Engraved */
.engraved-text {
  color: #ccc;
  text-shadow: -1px -1px 0px #fff, 1px 1px 0px #000;
  background: #999;
}

/* Ombres de texte responsives */
.responsive-text-shadow {
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  
  @media (min-width: 768px) {
    text-shadow: 2px 2px 4px rgba(0,0,0,0.4);
  }
  
  @media (min-width: 1024px) {
    text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
  }
}

/* Ombre de texte animée */
.animated-text-shadow {
  color: #007bff;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  transition: text-shadow 0.3s ease;
}

.animated-text-shadow:hover {
  text-shadow: 
    0 0 10px rgba(0,123,255,0.8),
    2px 2px 8px rgba(0,0,0,0.4);
}

/* Combinaisons créatives */
.creative-text {
  /* Texte avec ombre multicolore */
  text-shadow: 
    3px 3px 0px #007bff,
    6px 6px 0px #28a745,
    9px 9px 0px #ffc107;
  
  /* Effet de dispersion */
  text-shadow:
    1px 1px 2px rgba(0,0,0,0.1),
    2px 2px 4px rgba(0,0,0,0.1),
    3px 3px 6px rgba(0,0,0,0.1),
    4px 4px 8px rgba(0,0,0,0.1);
}
```

**✨ Conseils pour les ombres :**
- **Subtilité** : Les meilleures ombres sont souvent les plus discrètes
- **Cohérence** : Utilisez un système d'ombres uniforme dans tout le projet
- **Performance** : Évitez les ombres trop complexes sur les éléments animés
- **Accessibilité** : Assurez-vous que les ombres n'interfèrent pas avec la lisibilité

## Opacité et visibilité

La gestion de l'opacité et de la visibilité est essentielle pour créer des interfaces interactives et des animations fluides. CSS offre plusieurs propriétés pour contrôler la visibilité des éléments, chacune avec ses propres caractéristiques et cas d'usage.

**Différences importantes :**
- **opacity** : Change la transparence, l'élément reste dans le flux
- **visibility** : Cache l'élément mais conserve son espace
- **display: none** : Retire complètement l'élément du flux

```css
/* Opacité - Contrôle de la transparence */
.opacity-effects {
  opacity: 1;             /* 100% opaque (défaut) */
  opacity: 0.8;           /* 80% opaque - légèrement transparent */
  opacity: 0.5;           /* 50% opaque - semi-transparent */
  opacity: 0.2;           /* 20% opaque - très transparent */
  opacity: 0;             /* Invisible mais présent dans le flux */
  
  /* Opacité avec transition pour animations fluides */
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.opacity-effects:hover {
  opacity: 1;             /* Devient opaque au survol */
}

/* Visibilité - Contrôle de l'affichage */
.visibility-control {
  visibility: visible;    /* Visible (défaut) */
  visibility: hidden;     /* Invisible mais occupe l'espace */
  visibility: collapse;   /* Pour les éléments de tableau */
  
  /* Display - Contrôle du flux de document */
  display: block;         /* Affiché en bloc */
  display: inline;        /* Affiché en ligne */
  display: none;          /* Complètement retiré du flux */
}

/* Transparence sélective - Couleurs avec canal alpha */
.selective-transparency {
  /* Arrière-plan semi-transparent */
  background-color: rgba(0, 123, 255, 0.8);   /* Bleu à 80% d'opacité */
  background-color: hsla(211, 100%, 50%, 0.6); /* HSL avec alpha */
  
  /* Texte opaque sur fond transparent */
  color: rgb(255, 255, 255);    /* Blanc opaque */
  color: #ffffff;               /* Hexadécimal opaque */
}

/* Techniques avancées de transparence */
.advanced-transparency {
  /* Gradient avec transparence */
  background: linear-gradient(
    to right,
    rgba(0, 123, 255, 0) 0%,      /* Transparent au début */
    rgba(0, 123, 255, 0.8) 50%,   /* Semi-transparent au milieu */
    rgba(0, 123, 255, 0) 100%     /* Transparent à la fin */
  );
  
  /* Transparence avec backdrop-filter (effet de flou d'arrière-plan) */
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); /* Support Safari */
}

/* Etats de visibilité avec classes utilitaires */
.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  transition: all 0.3s ease;
}

.hide {
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.fade-out {
  opacity: 0;
  pointer-events: none;  /* Désactive les interactions */
  transition: opacity 0.5s ease;
}

.fade-in {
  opacity: 1;
  pointer-events: auto;  /* Réactive les interactions */
  transition: opacity 0.5s ease;
}

/* Overlays et modales */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);  /* Fond semi-transparent */
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
}

.overlay.active {
  opacity: 1;
  visibility: visible;
}

/* Animations de visibilité */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}

.animated-visibility {
  animation: fadeIn 0.5s ease forwards;
}

.animated-visibility.hiding {
  animation: fadeOut 0.5s ease forwards;
}

/* Hover effects avec opacité */
.hover-effects {
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.hover-effects:hover {
  opacity: 1;
}

/* Images avec overlay au survol */
.image-overlay {
  position: relative;
  overflow: hidden;
}

.image-overlay::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-overlay:hover::after {
  opacity: 1;
}

/* Effets de glassmorphism */
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Contrôle de l'opacité avec CSS custom properties */
:root {
  --opacity-disabled: 0.5;
  --opacity-secondary: 0.7;
  --opacity-primary: 1;
  --opacity-overlay: 0.8;
}

.element-disabled {
  opacity: var(--opacity-disabled);
  pointer-events: none;
}

.element-secondary {
  opacity: var(--opacity-secondary);
}
```

**👁️ Conseils pour l'opacité et la visibilité :**
- **Performance** : Préférez `opacity` et `visibility` à `display` pour les animations
- **Accessibilité** : Attention à ne pas rendre le contenu illisible avec trop de transparence
- **Interactions** : Utilisez `pointer-events: none` avec les éléments invisibles
- **Transitions** : Combinez opacité et transform pour des animations fluides

## Filtres CSS

Les filtres CSS permettent d'appliquer des effets visuels sophistiqués aux éléments sans avoir besoin d'éditeur d'images. Ils offrent des possibilités créatives énormes et peuvent transformer complètement l'apparence d'un élément. Les filtres sont particulièrement utiles pour les images, mais peuvent s'appliquer à n'importe quel élément HTML.

**Avantages des filtres CSS :**
- **Performance** : Traitement côté navigateur, pas de téléchargement d'images supplémentaires
- **Interactivité** : Peuvent être animés et modifiés dynamiquement
- **Flexibilité** : Effets combinables et personnalisables
- **Maintenance** : Modifications sans retouche d'images

```css
/* Filtres d'image individuels - Effets de base */
.image-filters {
  /* Flou - Effet de mise au point */
  filter: blur(2px);              /* Flou léger */
  filter: blur(5px);              /* Flou moyen */
  filter: blur(10px);             /* Flou fort */
  
  /* Luminosité - Contrôle de l'éclairage */
  filter: brightness(50%);        /* Assombrit de 50% */
  filter: brightness(100%);       /* Normal (défaut) */
  filter: brightness(150%);       /* Éclaircit de 50% */
  filter: brightness(200%);       /* Très lumineux */
  
  /* Contraste - Accentue les différences */
  filter: contrast(50%);          /* Faible contraste */
  filter: contrast(100%);         /* Normal (défaut) */
  filter: contrast(120%);         /* Contraste légèrement renforcé */
  filter: contrast(200%);         /* Contraste très élevé */
  
  /* Niveau de gris - Effet noir et blanc */
  filter: grayscale(0%);          /* Couleur normale */
  filter: grayscale(50%);         /* Partiellement en noir et blanc */
  filter: grayscale(100%);        /* Complètement en noir et blanc */
  
  /* Sépia - Effet vintage */
  filter: sepia(0%);              /* Pas d'effet sépia */
  filter: sepia(80%);             /* Effet sépia prononcé */
  filter: sepia(100%);            /* Sépia complet */
  
  /* Saturation - Intensité des couleurs */
  filter: saturate(50%);          /* Couleurs ternes */
  filter: saturate(100%);         /* Normal (défaut) */
  filter: saturate(150%);         /* Couleurs vives */
  filter: saturate(200%);         /* Couleurs très saturées */
  
  /* Rotation de teinte - Changement des couleurs */
  filter: hue-rotate(0deg);       /* Couleurs originales */
  filter: hue-rotate(90deg);      /* Rotation de 90° */
  filter: hue-rotate(180deg);     /* Couleurs inversées */
  filter: hue-rotate(270deg);     /* Rotation de 270° */
  
  /* Inversion - Effet négatif */
  filter: invert(0%);             /* Pas d'inversion */
  filter: invert(50%);            /* Inversion partielle */
  filter: invert(100%);           /* Inversion complète */
}

/* Filtres avancés */
.advanced-filters {
  /* Ombre portée avec filter */
  filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5));
  filter: drop-shadow(0 4px 8px rgba(0,123,255,0.3));
  
  /* Opacité avec filter (alternative à opacity) */
  filter: opacity(50%);
  filter: opacity(80%);
}

/* Filtres combinés - Effets complexes */
.combined-filters {
  /* Combinaison équilibrée pour photos */
  filter: 
    brightness(110%) 
    contrast(120%) 
    saturate(130%);
    
  /* Effet Instagram vintage */
  filter:
    sepia(30%)
    saturate(120%)
    contrast(110%)
    brightness(105%);
    
  /* Effet dramatique */
  filter:
    contrast(150%)
    brightness(90%)
    saturate(80%)
    grayscale(20%);
    
  /* Effet doux et chaleureux */
  filter:
    brightness(105%)
    contrast(95%)
    saturate(110%)
    hue-rotate(5deg);
}

/* Filtres avec transitions - Animations fluides */
.filter-hover {
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}

.filter-hover:hover {
  filter: grayscale(0%);
}

.filter-animation {
  filter: brightness(100%) contrast(100%);
  transition: filter 0.5s ease;
}

.filter-animation:hover {
  filter: brightness(120%) contrast(130%) saturate(150%);
}

/* Effets créatifs avec filtres */
.creative-effects {
  /* Effet néon */
  filter: 
    brightness(150%) 
    contrast(150%) 
    saturate(200%) 
    drop-shadow(0 0 10px #00ff00);
    
  /* Effet retro gaming */
  filter:
    contrast(200%)
    saturate(150%)
    hue-rotate(280deg)
    brightness(110%);
    
  /* Effet polaroid */
  filter:
    sepia(10%)
    contrast(120%)
    brightness(105%)
    saturate(110%);
}

/* Filtres pour différents contextes */
.filter-contexts {
  /* Images de profil avec effet hover */
  filter: grayscale(100%) brightness(80%);
  transition: filter 0.3s ease;
}

.filter-contexts:hover {
  filter: grayscale(0%) brightness(100%);
}

/* Filtres pour accessibilité */
.accessibility-filters {
  /* Mode haut contraste */
  filter: contrast(200%) brightness(120%);
  
  /* Mode daltonisme */
  filter: hue-rotate(180deg) saturate(150%);
  
  /* Mode lecture */
  filter: grayscale(100%) contrast(120%);
}

/* Filtres responsives */
.responsive-filters {
  filter: brightness(100%);
  
  @media (max-width: 768px) {
    /* Économie de batterie sur mobile */
    filter: brightness(90%) contrast(110%);
  }
  
  @media (prefers-reduced-motion: reduce) {
    /* Pas de transitions pour les utilisateurs sensibles */
    transition: none;
  }
}

/* Système de filtres avec variables CSS */
:root {
  --filter-blur-sm: blur(2px);
  --filter-blur-md: blur(5px);
  --filter-blur-lg: blur(10px);
  
  --filter-brightness-dark: brightness(70%);
  --filter-brightness-normal: brightness(100%);
  --filter-brightness-light: brightness(130%);
  
  --filter-vintage: sepia(50%) saturate(120%) contrast(110%);
  --filter-bw: grayscale(100%) contrast(120%);
  --filter-vivid: saturate(150%) contrast(120%);
}

.filter-system {
  filter: var(--filter-brightness-normal);
  transition: filter 0.3s ease;
}

.filter-system.dark {
  filter: var(--filter-brightness-dark);
}

.filter-system.vintage {
  filter: var(--filter-vintage);
}

/* Animations de filtres */
@keyframes filterPulse {
  0%, 100% {
    filter: brightness(100%) saturate(100%);
  }
  50% {
    filter: brightness(120%) saturate(130%);
  }
}

.filter-pulse {
  animation: filterPulse 2s ease-in-out infinite;
}

/* Backdrop filters - Effets d'arrière-plan */
.backdrop-effects {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px) saturate(120%);
  -webkit-backdrop-filter: blur(10px) saturate(120%);
  
  /* Effet de verre dépoli */
  backdrop-filter: blur(15px) brightness(110%);
  
  /* Effet de verre coloré */
  backdrop-filter: blur(8px) hue-rotate(90deg) saturate(150%);
}

/* Filtres pour thèmes */
.dark-theme {
  filter: invert(100%) hue-rotate(180deg);
}

.sepia-theme {
  filter: sepia(80%) saturate(120%) contrast(110%);
}

.high-contrast-theme {
  filter: contrast(200%) brightness(120%);
}
```

**🎨 Bonnes pratiques pour les filtres :**
- **Performance** : Les filtres peuvent être coûteux, testez sur différents appareils
- **Subtilité** : Les meilleurs effets sont souvent les plus discrets
- **Accessibilité** : Proposez des options pour désactiver les effets
- **Fallbacks** : Prévoyez des alternatives pour les navigateurs non compatibles

## Variables CSS et thèmes

Les variables CSS (custom properties) révolutionnent la façon dont nous gérons les styles. Elles permettent de créer des systèmes de design cohérents, maintenables et dynamiques. Cette approche moderne facilite la création de thèmes, améliore la maintenance du code et permet des personnalisations avancées.

**Avantages des variables CSS :**
- **Maintenance** : Changements centralisés et cohérents
- **Thèmes** : Basculement dynamique entre différents styles
- **Réutilisabilité** : Valeurs partagées dans tout le projet
- **Flexibilité** : Modifications possibles via JavaScript

```css
/* Définition des variables - Architecture complète d'un design system */
:root {
  /* === COULEURS === */
  /* Palette principale */
  --primary-50: #eff6ff;
  --primary-100: #dbeafe;
  --primary-200: #bfdbfe;
  --primary-300: #93c5fd;
  --primary-400: #60a5fa;
  --primary-500: #3b82f6;    /* Couleur principale */
  --primary-600: #2563eb;
  --primary-700: #1d4ed8;
  --primary-800: #1e40af;
  --primary-900: #1e3a8a;
  
  /* Couleurs neutres */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
  
  /* Couleurs sémantiques */
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  --info-color: #0ea5e9;
  
  /* === TYPOGRAPHIE === */
  /* Familles de police */
  --font-family-sans: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-family-serif: Georgia, Cambria, 'Times New Roman', serif;
  --font-family-mono: 'SF Mono', Consolas, 'Liberation Mono', monospace;
  
  /* Échelle typographique */
  --font-size-xs: 0.75rem;      /* 12px */
  --font-size-sm: 0.875rem;     /* 14px */
  --font-size-base: 1rem;       /* 16px */
  --font-size-lg: 1.125rem;     /* 18px */
  --font-size-xl: 1.25rem;      /* 20px */
  --font-size-2xl: 1.5rem;      /* 24px */
  --font-size-3xl: 1.875rem;    /* 30px */
  --font-size-4xl: 2.25rem;     /* 36px */
  --font-size-5xl: 3rem;        /* 48px */
  --font-size-6xl: 3.75rem;     /* 60px */
  
  /* Poids de police */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Hauteurs de ligne */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
  
  /* === ESPACEMENT === */
  /* Échelle d'espacement basée sur rem */
  --space-0: 0;
  --space-1: 0.25rem;    /* 4px */
  --space-2: 0.5rem;     /* 8px */
  --space-3: 0.75rem;    /* 12px */
  --space-4: 1rem;       /* 16px */
  --space-5: 1.25rem;    /* 20px */
  --space-6: 1.5rem;     /* 24px */
  --space-8: 2rem;       /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
  
  /* === OMBRES === */
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25);
  --shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.06);
  
  /* === BORDURES === */
  --border-width-0: 0;
  --border-width-1: 1px;
  --border-width-2: 2px;
  --border-width-4: 4px;
  --border-width-8: 8px;
  
  --border-radius-none: 0;
  --border-radius-sm: 0.125rem;
  --border-radius-md: 0.375rem;
  --border-radius-lg: 0.5rem;
  --border-radius-xl: 0.75rem;
  --border-radius-2xl: 1rem;
  --border-radius-full: 9999px;
  
  /* === TRANSITIONS === */
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 300ms ease-in-out;
  --transition-slow: 500ms ease-in-out;
  
  /* === Z-INDEX === */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}

/* Thème sombre - Redéfinition des variables */
[data-theme="dark"] {
  --bg-primary: #111827;
  --bg-secondary: #1f2937;
  --bg-tertiary: #374151;
  
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  --text-tertiary: #9ca3af;
  
  --border-color: #374151;
  --border-color-light: #4b5563;
  
  /* Adaptation des ombres pour le thème sombre */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.4), 0 4px 6px rgba(0, 0, 0, 0.2);
}

/* Thème clair (défaut) */
[data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --bg-tertiary: #f3f4f6;
  
  --text-primary: #111827;
  --text-secondary: #374151;
  --text-tertiary: #6b7280;
  
  --border-color: #e5e7eb;
  --border-color-light: #f3f4f6;
}

/* Thème coloré personnalisé */
[data-theme="vibrant"] {
  --primary-500: #8b5cf6;   /* Violet */
  --secondary-500: #06b6d4; /* Cyan */
  --accent-color: #f59e0b;   /* Orange */
  
  --bg-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --text-primary: #ffffff;
  --shadow-colored: 0 4px 20px rgba(139, 92, 246, 0.3);
}

/* Utilisation des variables dans les composants */
.card {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: var(--border-width-1) solid var(--border-color);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--space-6);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  transition: var(--transition-normal);
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

/* Boutons avec système de variables */
.btn {
  display: inline-flex;
  align-items: center;
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-family-sans);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  border: var(--border-width-1) solid transparent;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: var(--transition-fast);
  text-decoration: none;
}

.btn-primary {
  background-color: var(--primary-500);
  color: white;
  box-shadow: var(--shadow-sm);
}

.btn-primary:hover {
  background-color: var(--primary-600);
  box-shadow: var(--shadow-md);
}

/* Système de grille avec variables */
.container {
  max-width: var(--max-width, 1200px);
  margin: 0 auto;
  padding: 0 var(--space-4);
}

.grid {
  display: grid;
  gap: var(--grid-gap, var(--space-6));
  grid-template-columns: repeat(var(--grid-cols, 1), 1fr);
}

/* Variables locales (scoped) */
.component-special {
  --local-color: #ff6b6b;
  --local-spacing: 2rem;
  
  color: var(--local-color);
  padding: var(--local-spacing);
  border-left: 4px solid var(--local-color);
}

/* Calculs avec variables */
.dynamic-sizing {
  --base-size: 1rem;
  --multiplier: 1.5;
  
  font-size: calc(var(--base-size) * var(--multiplier));
  padding: calc(var(--base-size) / 2);
  margin: calc(var(--base-size) * 2);
}

/* Variables pour animations */
.animated-element {
  --animation-duration: 0.3s;
  --animation-delay: 0.1s;
  --animation-easing: cubic-bezier(0.4, 0, 0.2, 1);
  
  transition: all var(--animation-duration) var(--animation-easing) var(--animation-delay);
}

/* Responsive avec variables */
@media (min-width: 768px) {
  :root {
    --space-section: 5rem;
    --font-size-hero: 4rem;
    --grid-cols: 2;
  }
}

@media (min-width: 1024px) {
  :root {
    --space-section: 8rem;
    --font-size-hero: 6rem;
    --grid-cols: 3;
  }
}

/* Contrôle JavaScript des variables */
/* En JavaScript : 
   document.documentElement.style.setProperty('--primary-color', '#ff0000');
   const primaryColor = getComputedStyle(document.documentElement)
     .getPropertyValue('--primary-color');
*/

/* Variables avec fallbacks */
.safe-component {
  color: var(--text-color, #333333);           /* Fallback si variable non définie */
  background: var(--bg-color, var(--bg-secondary, #f5f5f5)); /* Fallback en cascade */
  padding: var(--spacing, 1rem);               /* Fallback simple */
}
```

**🎯 Bonnes pratiques pour les variables CSS :**
- **Organisation** : Groupez les variables par catégorie (couleurs, espacement, etc.)
- **Nommage** : Utilisez une convention cohérente et descriptive
- **Fallbacks** : Toujours prévoir des valeurs de secours
- **Performance** : Les variables CSS sont très performantes, utilisez-les largement
- **Documentation** : Documentez votre système de design avec des exemples

## Exemple pratique complet

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Propriétés visuelles CSS</title>
  <style>
    /* Variables CSS */
    :root {
      --primary-color: #2563eb;
      --secondary-color: #64748b;
      --success-color: #10b981;
      --warning-color: #f59e0b;
      --danger-color: #ef4444;
      
      --font-family-sans: system-ui, -apple-system, sans-serif;
      --font-family-serif: Georgia, serif;
      --font-family-mono: 'Fira Code', monospace;
      
      --spacing-xs: 0.25rem;
      --spacing-sm: 0.5rem;
      --spacing-md: 1rem;
      --spacing-lg: 2rem;
      --spacing-xl: 4rem;
      
      --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
      --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
      --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
      
      --border-radius: 0.5rem;
    }
    
    /* Reset et base */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: var(--font-family-sans);
      line-height: 1.6;
      color: #334155;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: var(--spacing-lg);
    }
    
    /* Container principal */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.95);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-lg);
      overflow: hidden;
    }
    
    /* En-tête */
    .header {
      background: linear-gradient(135deg, var(--primary-color), #1d4ed8);
      color: white;
      padding: var(--spacing-xl);
      text-align: center;
      position: relative;
    }
    
    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="1.5" fill="rgba(255,255,255,0.1)"/></svg>');
      opacity: 0.3;
    }
    
    .header h1 {
      font-family: var(--font-family-serif);
      font-size: 2.5rem;
      font-weight: 700;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
      position: relative;
      z-index: 1;
    }
    
    .header p {
      font-size: 1.2rem;
      margin-top: var(--spacing-md);
      opacity: 0.9;
      position: relative;
      z-index: 1;
    }
    
    /* Contenu principal */
    .content {
      padding: var(--spacing-xl);
    }
    
    /* Grille de cartes */
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--spacing-lg);
      margin-bottom: var(--spacing-xl);
    }
    
    /* Cartes */
    .card {
      background: white;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-md);
      padding: var(--spacing-lg);
      transition: all 0.3s ease;
      border: 1px solid rgba(0,0,0,0.05);
    }
    
    .card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }
    
    .card h3 {
      color: var(--primary-color);
      font-size: 1.5rem;
      margin-bottom: var(--spacing-md);
      font-weight: 600;
    }
    
    .card p {
      color: var(--secondary-color);
      margin-bottom: var(--spacing-md);
    }
    
    /* Cartes avec thèmes */
    .card.success {
      border-left: 4px solid var(--success-color);
    }
    
    .card.success h3 {
      color: var(--success-color);
    }
    
    .card.warning {
      border-left: 4px solid var(--warning-color);
    }
    
    .card.warning h3 {
      color: var(--warning-color);
    }
    
    .card.danger {
      border-left: 4px solid var(--danger-color);
    }
    
    .card.danger h3 {
      color: var(--danger-color);
    }
    
    /* Boutons */
    .btn {
      display: inline-block;
      padding: var(--spacing-sm) var(--spacing-lg);
      border: none;
      border-radius: calc(var(--border-radius) / 2);
      font-family: inherit;
      font-size: 0.9rem;
      font-weight: 500;
      text-decoration: none;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: var(--shadow-sm);
    }
    
    .btn:hover {
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }
    
    .btn:active {
      transform: translateY(0);
    }
    
    .btn-primary {
      background: var(--primary-color);
      color: white;
    }
    
    .btn-primary:hover {
      background: #1d4ed8;
    }
    
    /* Section de démonstration */
    .demo-section {
      background: #f8fafc;
      border-radius: var(--border-radius);
      padding: var(--spacing-lg);
      margin-top: var(--spacing-xl);
    }
    
    .demo-section h2 {
      color: #1e293b;
      margin-bottom: var(--spacing-lg);
      font-size: 1.8rem;
    }
    
    /* Exemples de texte */
    .text-examples {
      display: grid;
      gap: var(--spacing-lg);
    }
    
    .text-large {
      font-size: 2rem;
      font-weight: 300;
      color: var(--primary-color);
      text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
    }
    
    .text-code {
      font-family: var(--font-family-mono);
      background: #1e293b;
      color: #e2e8f0;
      padding: var(--spacing-md);
      border-radius: calc(var(--border-radius) / 2);
      font-size: 0.9rem;
      overflow-x: auto;
    }
    
    .text-gradient {
      background: linear-gradient(135deg, var(--primary-color), var(--success-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 1.5rem;
      font-weight: 700;
    }
    
    /* Effets visuels */
    .visual-effects {
      display: flex;
      gap: var(--spacing-lg);
      flex-wrap: wrap;
      margin-top: var(--spacing-lg);
    }
    
    .effect-box {
      width: 120px;
      height: 120px;
      background: var(--primary-color);
      border-radius: var(--border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    
    .effect-blur:hover {
      filter: blur(2px);
    }
    
    .effect-rotate:hover {
      transform: rotate(15deg);
    }
    
    .effect-scale:hover {
      transform: scale(1.1);
    }
    
    .effect-opacity:hover {
      opacity: 0.6;
    }
  </style>
</head>
<body>
  <div class="container">
    <header class="header">
      <h1>Propriétés visuelles CSS</h1>
      <p>Démonstration des couleurs, typographie et effets</p>
    </header>
    
    <main class="content">
      <div class="cards-grid">
        <div class="card">
          <h3>Couleurs et dégradés</h3>
          <p>Les couleurs CSS peuvent être définies avec des codes hexadécimaux, RGB, HSL, ou des variables CSS pour une meilleure maintenabilité.</p>
          <a href="#" class="btn btn-primary">En savoir plus</a>
        </div>
        
        <div class="card success">
          <h3>Typographie moderne</h3>
          <p>La typographie CSS offre un contrôle précis sur les polices, tailles, espacements et effets de texte.</p>
          <a href="#" class="btn btn-primary">Explorer</a>
        </div>
        
        <div class="card warning">
          <h3>Ombres et effets</h3>
          <p>Les ombres CSS permettent de créer de la profondeur et de l'élégance dans vos designs.</p>
          <a href="#" class="btn btn-primary">Découvrir</a>
        </div>
        
        <div class="card danger">
          <h3>Variables CSS</h3>
          <p>Les custom properties permettent de créer des systèmes de design cohérents et maintenables.</p>
          <a href="#" class="btn btn-primary">Apprendre</a>
        </div>
      </div>
      
      <section class="demo-section">
        <h2>Exemples de mise en forme</h2>
        
        <div class="text-examples">
          <div class="text-large">Titre avec ombre et couleur</div>
          
          <div class="text-gradient">Texte avec dégradé coloré</div>
          
          <div class="text-code">
/* Code CSS avec syntaxe colorée */
.example {
  background: linear-gradient(45deg, #007bff, #28a745);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
          </div>
        </div>
        
        <h3 style="margin-top: 2rem; margin-bottom: 1rem;">Effets interactifs</h3>
        <div class="visual-effects">
          <div class="effect-box effect-blur">Blur</div>
          <div class="effect-box effect-rotate">Rotate</div>
          <div class="effect-box effect-scale">Scale</div>
          <div class="effect-box effect-opacity">Opacity</div>
        </div>
      </section>
    </main>
  </div>
</body>
</html>
```


## Bonnes pratiques

1. **Utilisez des variables CSS** pour la cohérence
2. **Préférez les unités relatives** (rem, em, %)
3. **Optimisez les performances** avec will-change
4. **Testez l'accessibilité** des contrastes
5. **Maintenez une hiérarchie visuelle** claire

## Résumé

Les propriétés visuelles CSS offrent un contrôle total sur l'apparence des éléments. Une utilisation réfléchie de ces propriétés permet de créer des interfaces attrayantes, accessibles et maintenables.
