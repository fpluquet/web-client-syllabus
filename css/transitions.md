# 5.1 Transitions CSS

Les transitions CSS permettent de créer des animations fluides lors du changement de propriétés CSS, généralement déclenchées par des interactions utilisateur comme le survol.

## Propriété `transition`

### Syntaxe de base
```css
.element {
    transition: propriété durée fonction-timing délai;
}
```

### Exemple simple
```css
.bouton {
    background-color: #3498db;
    color: white;
    padding: 10px 20px;
    border: none;
    transition: background-color 0.3s ease;
}

.bouton:hover {
    background-color: #2980b9;
}
```

## Propriétés de transition

### `transition-property`
Spécifie quelle(s) propriété(s) animer :
```css
.element {
    transition-property: background-color;
    transition-property: width, height;
    transition-property: all; /* Toutes les propriétés */
}
```

### `transition-duration`
Durée de la transition :
```css
.element {
    transition-duration: 0.3s;     /* 300 millisecondes */
    transition-duration: 1s;       /* 1 seconde */
    transition-duration: 500ms;    /* 500 millisecondes */
}
```

### `transition-timing-function`
Courbe d'animation :
```css
.element {
    transition-timing-function: ease;        /* Par défaut */
    transition-timing-function: ease-in;     /* Accélération progressive */
    transition-timing-function: ease-out;    /* Décélération progressive */
    transition-timing-function: ease-in-out; /* Accél. puis décél. */
    transition-timing-function: linear;      /* Vitesse constante */
}
```

### `transition-delay`
Délai avant le début de la transition :
```css
.element {
    transition-delay: 0.1s;    /* Commence après 100ms */
    transition-delay: 500ms;   /* Commence après 500ms */
}
```

## Syntaxe complète vs raccourcie

### Syntaxe détaillée
```css
.carte {
    background-color: white;
    transform: scale(1);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    
    transition-property: transform, box-shadow, background-color;
    transition-duration: 0.3s, 0.3s, 0.2s;
    transition-timing-function: ease-out;
    transition-delay: 0s;
}
```

### Syntaxe raccourcie (recommandée)
```css
.carte {
    background-color: white;
    transform: scale(1);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    
    transition: transform 0.3s ease-out,
                box-shadow 0.3s ease-out,
                background-color 0.2s ease-out;
}

.carte:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    background-color: #f8f9fa;
}
```

## Effets au survol populaires

### Changement de couleur
```css
.lien {
    color: #333;
    text-decoration: none;
    transition: color 0.2s ease;
}

.lien:hover {
    color: #3498db;
}
```

### Transformation au survol
```css
.bouton {
    background-color: #2ecc71;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    transform: translateY(0);
    transition: all 0.2s ease;
}

.bouton:hover {
    background-color: #27ae60;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}
```

### Image avec zoom
```css
.image-container {
    overflow: hidden;
    border-radius: 8px;
}

.image-zoom {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transform: scale(1);
    transition: transform 0.3s ease;
}

.image-container:hover .image-zoom {
    transform: scale(1.1);
}
```

## Timing functions avancées

### Fonctions personnalisées avec `cubic-bezier`
```css
.element {
    /* Bounce effect */
    transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    
    /* Smooth ease */
    transition: opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

### Fonctions prédéfinies
```css
.bounce { transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55); }
.smooth { transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.swift { transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1); }
```

## Transitions multiples

### Différentes propriétés, différents timings
```css
.carte-complexe {
    background-color: white;
    transform: translateY(0) scale(1);
    opacity: 0.9;
    border-radius: 8px;
    
    transition: 
        transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
        background-color 0.2s ease,
        opacity 0.4s ease-in-out,
        border-radius 0.3s ease;
}

.carte-complexe:hover {
    transform: translateY(-8px) scale(1.02);
    background-color: #f8f9fa;
    opacity: 1;
    border-radius: 12px;
}
```

## Transitions sur différents événements

### Focus (accessibilité)
```css
.champ-texte {
    border: 2px solid #ddd;
    padding: 8px;
    transition: border-color 0.2s ease;
}

.champ-texte:focus {
    border-color: #3498db;
    outline: none;
}
```

### Active (clic)
```css
.bouton-interactif {
    background-color: #e74c3c;
    transform: scale(1);
    transition: all 0.1s ease;
}

.bouton-interactif:hover {
    background-color: #c0392b;
    transform: scale(1.05);
}

.bouton-interactif:active {
    transform: scale(0.95);
}
```

## Exemple complet : carte interactive

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transitions CSS</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f2f5;
            padding: 2rem;
            margin: 0;
        }
        
        .container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .carte {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transform: translateY(0);
            opacity: 0.95;
            
            transition: 
                transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                box-shadow 0.3s ease,
                opacity 0.2s ease;
        }
        
        .carte:hover {
            transform: translateY(-8px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            opacity: 1;
        }
        
        .carte h3 {
            color: #2c3e50;
            margin-top: 0;
            transition: color 0.2s ease;
        }
        
        .carte:hover h3 {
            color: #3498db;
        }
        
        .bouton {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            transform: scale(1);
            transition: all 0.2s ease;
        }
        
        .bouton:hover {
            transform: scale(1.05) translateY(-1px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
        
        .bouton:active {
            transform: scale(0.98) translateY(0);
        }
        
        .image-container {
            width: 100%;
            height: 200px;
            overflow: hidden;
            border-radius: 8px;
            margin-bottom: 1rem;
        }
        
        .image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
        }
        
        .carte:hover .image {
            transform: scale(1.1);
        }
        
        .tag {
            display: inline-block;
            background-color: #e9ecef;
            color: #495057;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
            margin-right: 0.5rem;
            transition: all 0.2s ease;
        }
        
        .carte:hover .tag {
            background-color: #3498db;
            color: white;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="carte">
            <div class="image-container">
                <img src="https://via.placeholder.com/300x200/667eea/ffffff?text=Image+1" 
                     alt="Placeholder" class="image">
            </div>
            <h3>Carte avec transitions</h3>
            <p>Cette carte utilise plusieurs transitions CSS pour créer une expérience utilisateur fluide et agréable.</p>
            <div>
                <span class="tag">HTML</span>
                <span class="tag">CSS</span>
                <span class="tag">Transitions</span>
            </div>
            <br><br>
            <button class="bouton">En savoir plus</button>
        </div>
        
        <div class="carte">
            <div class="image-container">
                <img src="https://via.placeholder.com/300x200/764ba2/ffffff?text=Image+2" 
                     alt="Placeholder" class="image">
            </div>
            <h3>Effets multiples</h3>
            <p>Survol, transformation, ombres et changements de couleur s'animent ensemble harmonieusement.</p>
            <div>
                <span class="tag">Animation</span>
                <span class="tag">Interactif</span>
            </div>
            <br><br>
            <button class="bouton">Découvrir</button>
        </div>
        
        <div class="carte">
            <div class="image-container">
                <img src="https://via.placeholder.com/300x200/f093fb/ffffff?text=Image+3" 
                     alt="Placeholder" class="image">
            </div>
            <h3>Performance optimisée</h3>
            <p>Les transitions CSS sont optimisées par le navigateur pour des animations fluides et performantes.</p>
            <div>
                <span class="tag">Performance</span>
                <span class="tag">Fluide</span>
            </div>
            <br><br>
            <button class="bouton">Explorer</button>
        </div>
    </div>
</body>
</html>
```

## Bonnes pratiques

### ✅ Performance
- Privilégier les propriétés optimisées : `transform`, `opacity`
- Éviter d'animer `width`, `height`, `top`, `left`
- Utiliser `transform` pour les déplacements

### ✅ Accessibilité
- Respecter `prefers-reduced-motion` pour les utilisateurs sensibles
- Durées raisonnables (généralement < 500ms)
- Prévoir les états focus pour la navigation clavier

### ✅ UX/UI
- Utiliser des timings cohérents dans tout le site
- Les transitions doivent avoir un but (feedback, guidage)
- Éviter les animations trop nombreuses ou distrayantes

```css
/* Respect des préférences utilisateur */
@media (prefers-reduced-motion: reduce) {
    * {
        transition: none !important;
    }
}
```

