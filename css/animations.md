# 5.2 Animations CSS

## Introduction à l'animation web

L'animation web transforme des interfaces statiques en **expériences vivantes et engageantes**. Bien plus qu'un simple effet visuel, l'animation guide l'attention, communique les changements d'état, facilite la compréhension des interactions et créé une connexion émotionnelle avec l'utilisateur.

### Psychologie de l'animation

L'animation exploite des principes psychologiques fondamentaux :

**Perception du mouvement :** Notre cerveau est naturellement attiré par le mouvement, héritage de nos instincts de survie. Une animation bien placée capte instantanément l'attention.

**Continuité narrative :** L'animation crée des liens logiques entre les états, aidant l'utilisateur à comprendre les transitions (un bouton qui se transforme en loader indique le traitement en cours).

**Feedback émotionnel :** Les micro-interactions animées (boutons qui rebondissent, éléments qui glissent) créent une sensation de réactivité et de "vivacité" de l'interface.

**Réduction de l'anxiété :** Les animations de transition masquent les temps de chargement et rendent l'attente plus agréable.

### Évolution de l'animation web

#### Ère Flash (1996-2010)
Flash permettait des animations riches mais avec de lourds inconvénients :
- Plugin externe requis
- Performance médiocre sur mobile
- Problèmes d'accessibilité
- SEO difficile

#### Révolution CSS3 (2010+)
L'introduction des animations CSS natives apporte :
- **Performance native** : Accélération matérielle automatique
- **Accessibilité intégrée** : Respect des préférences utilisateur (`prefers-reduced-motion`)
- **Responsive** : Animations qui s'adaptent aux différents écrans
- **Maintenabilité** : Code CSS standard, pas de dépendances externes

#### Ère moderne (2015+)
Les nouvelles APIs JavaScript (Web Animations API) et les bibliothèques spécialisées (Framer Motion, GSAP) offrent un contrôle encore plus fin pour les animations complexes.

## Philosophie des animations UX

### Principe de l'animation fonctionnelle

**Toute animation doit servir un purpose :**

**Guidance :** Diriger l'attention vers les éléments importants
```css
.notification {
  animation: slideInRight 0.3s ease-out;
}
```

**Feedback :** Confirmer les actions utilisateur
```css
.button:active {
  transform: scale(0.95);
  transition: transform 0.1s ease-in;
}
```

**Continuité :** Maintenir le contexte lors des transitions
```css
.modal {
  animation: fadeInScale 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
```

**Délice :** Ajouter de la personnalité (avec parcimonie)
```css
.easter-egg:hover {
  animation: wiggle 0.5s ease-in-out;
}
```

### Les 12 principes de l'animation (appliqués au web)

Inspirés de l'animation traditionnelle Disney, adaptés pour le web :

1. **Squash and Stretch** : Déformation pour exprimer la flexibilité
2. **Anticipation** : Préparation avant l'action principale
3. **Staging** : Composition claire pour guider l'attention
4. **Straight Ahead vs Pose to Pose** : Animation fluide vs keyframes
5. **Follow Through** : Continuation naturelle du mouvement
6. **Slow In/Slow Out** : Accélération/décélération naturelles
7. **Arc** : Mouvements en courbes naturelles
8. **Secondary Action** : Actions secondaires qui enrichissent
9. **Timing** : Rythme et vitesse appropriés
10. **Exaggeration** : Amplification pour la clarté
11. **Solid Drawing** : Cohérence visuelle
12. **Appeal** : Charme et personnalité

## Transitions CSS : Les fondamentaux

### Concept de transition

Une **transition** est une animation automatique entre deux états d'un élément. Elle interpole smoothement les valeurs des propriétés CSS lors d'un changement (hover, focus, classe ajoutée, etc.).

#### Anatomie d'une transition

```css
.element {
  /* État initial */
  background-color: blue;
  transform: scale(1);
  
  /* Configuration de transition */
  transition: background-color 0.3s ease-out,
              transform 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.element:hover {
  /* État final */
  background-color: red;
  transform: scale(1.1);
}
```

### Propriétés de transition

#### `transition-property`
Spécifie quelles propriétés CSS animer :

```css
/* Propriétés spécifiques */
transition-property: color, background-color, transform;

/* Toutes les propriétés animables */
transition-property: all;

/* Aucune transition */
transition-property: none;
```

**Bonnes pratiques :** Spécifiez les propriétés plutôt que d'utiliser `all` pour de meilleures performances.

#### `transition-duration`
Durée de l'animation :

```css
transition-duration: 0.3s;      /* Recommandé pour la plupart des interactions */
transition-duration: 150ms;     /* Feedback immédiat */
transition-duration: 0.6s;      /* Mouvements plus amples */
```

**Guidelines temporelles :**
- **0-100ms** : Instantané (changements d'état immédiats)
- **100-300ms** : Rapide (feedback utilisateur, survols)
- **300-500ms** : Modéré (transitions de contenu)
- **500ms+** : Lent (transitions majeures, storytelling)

#### `transition-timing-function`
Courbe d'accélération de l'animation :

```css
/* Fonctions prédéfinies */
transition-timing-function: ease;        /* Défaut : accélération naturelle */
transition-timing-function: linear;      /* Vitesse constante */
transition-timing-function: ease-in;     /* Accélération progressive */
transition-timing-function: ease-out;    /* Décélération progressive */
transition-timing-function: ease-in-out; /* Accélération puis décélération */

/* Courbes de Bézier personnalisées */
transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Bounce */
transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);   /* Easing doux */
```

**Choisir la bonne courbe :**
- **ease-out** : Interactions utilisateur (hover, click) - démarre vite, finit doucement
- **ease-in** : Éléments qui disparaissent - démarre doucement, accélère
- **ease-in-out** : Transitions symétriques - mouvements naturels

#### `transition-delay`
Délai avant le début de l'animation :

```css
transition-delay: 0.1s;   /* Séquençage d'animations */
transition-delay: -0.1s;  /* Démarrage en cours d'animation */
```

### Syntaxe raccourcie

```css
/* transition: property duration timing-function delay */
transition: transform 0.3s ease-out 0.1s,
           opacity 0.2s ease-in;
```

## Animations CSS avancées

### Keyframes : Contrôle total

Les **keyframes** permettent de définir des animations complexes avec plusieurs étapes intermédiaires :

```css
@keyframes slideInFadeUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  50% {
    opacity: 0.8;
    transform: translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animated-element {
  animation: slideInFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Propriétés d'animation

#### `animation-name`
Référence aux keyframes :

```css
animation-name: slideInFadeUp;
animation-name: bounce, fadeIn; /* Animations multiples */
```

#### `animation-duration`
Durée totale de l'animation :

```css
animation-duration: 2s;
animation-duration: 500ms;
```

#### `animation-timing-function`
Identique aux transitions, mais s'applique à chaque segment entre keyframes.

#### `animation-delay`
Délai avant le début :

```css
animation-delay: 1s;     /* Démarre après 1 seconde */
animation-delay: -0.5s;  /* Démarre au milieu de l'animation */
```

#### `animation-iteration-count`
Nombre de répétitions :

```css
animation-iteration-count: 1;        /* Une fois (défaut) */
animation-iteration-count: 3;        /* Trois fois */
animation-iteration-count: infinite; /* En boucle */
```

#### `animation-direction`
Sens de lecture de l'animation :

```css
animation-direction: normal;     /* 0% → 100% */
animation-direction: reverse;    /* 100% → 0% */
animation-direction: alternate;  /* 0% → 100% → 0% → 100%... */
animation-direction: alternate-reverse; /* 100% → 0% → 100%... */
```

#### `animation-fill-mode`
État avant/après l'animation :

```css
animation-fill-mode: none;      /* Retour à l'état initial */
animation-fill-mode: forwards; /* Maintien de l'état final */
animation-fill-mode: backwards; /* Application de l'état initial pendant le délai */
animation-fill-mode: both;      /* Forwards + backwards */
```

#### `animation-play-state`
Contrôle de lecture :

```css
animation-play-state: running; /* Lecture (défaut) */
animation-play-state: paused;  /* Pause */

/* Pause au hover */
.animated-element:hover {
  animation-play-state: paused;
}
```

### Syntaxe raccourcie

```css
/* animation: name duration timing-function delay iteration-count direction fill-mode play-state */
animation: slideIn 0.5s ease-out 0.2s 1 normal forwards running;
```

## Exemples pratiques

### Animation de chargement

```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.loader {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Loader avec points */
@keyframes dotPulse {
  0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
  40% { transform: scale(1.2); opacity: 1; }
}

.dot-loader span {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #3498db;
  animation: dotPulse 1.4s ease-in-out infinite;
}

.dot-loader span:nth-child(2) { animation-delay: 0.2s; }
.dot-loader span:nth-child(3) { animation-delay: 0.4s; }
```

### Animations d'entrée

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.fade-in-up { animation: fadeInUp 0.6s ease-out; }
.slide-in-left { animation: slideInLeft 0.5s ease-out; }
.zoom-in { animation: zoomIn 0.3s ease-out; }
```

### Micro-interactions

```css
/* Bouton avec effet de hover */
.button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.2s ease-out,
              box-shadow 0.2s ease-out;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.button:active {
  transform: translateY(0);
  transition-duration: 0.1s;
}

/* Carte avec animation de hover */
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-out,
              box-shadow 0.3s ease-out;
}

.card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

/* Input avec animation de focus */
.input-field {
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  padding: 12px 16px;
  transition: border-color 0.2s ease-out,
              box-shadow 0.2s ease-out;
}

.input-field:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  outline: none;
}
```

### Animations complexes

```css
/* Animation de révélation de texte */
@keyframes typewriter {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blinkCursor {
  from, to { border-color: transparent; }
  50% { border-color: orange; }
}

.typewriter {
  overflow: hidden;
  border-right: 2px solid orange;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: 0.15em;
  animation: typewriter 3.5s steps(40, end),
             blinkCursor 0.75s step-end infinite;
}

/* Animation de particules flottantes */
@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg);
    opacity: 1;
  }
  50% { 
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.8;
  }
}

.floating-particle {
  animation: float 6s ease-in-out infinite;
}

.floating-particle:nth-child(2) { animation-delay: 1s; }
.floating-particle:nth-child(3) { animation-delay: 2s; }
.floating-particle:nth-child(4) { animation-delay: 3s; }

/* Animation de compteur */
@keyframes countUp {
  from { 
    transform: translateY(100%); 
    opacity: 0;
  }
  to { 
    transform: translateY(0); 
    opacity: 1;
  }
}

.counter {
  overflow: hidden;
  line-height: 1;
}

.counter span {
  display: inline-block;
  animation: countUp 0.8s ease-out;
}

.counter span:nth-child(1) { animation-delay: 0.1s; }
.counter span:nth-child(2) { animation-delay: 0.2s; }
.counter span:nth-child(3) { animation-delay: 0.3s; }
```

## Performance et optimisation

### Propriétés performantes

Certaines propriétés CSS sont optimisées par le navigateur et n'affectent que la **couche de composition** :

**Propriétés optimisées (60fps garantis) :**
- `transform` : translate, scale, rotate, skew
- `opacity`
- `filter`

**Propriétés coûteuses (éviter dans les animations) :**
- `width`, `height` : Déclenchent le reflow
- `top`, `left`, `margin` : Déclenchent le reflow
- `background-color`, `color` : Déclenchent le repaint

```css
/* ❌ Animation coûteuse */
@keyframes slideInBad {
  from { left: -100px; }
  to { left: 0; }
}

/* ✅ Animation optimisée */
@keyframes slideInGood {
  from { transform: translateX(-100px); }
  to { transform: translateX(0); }
}
```

### Optimisations avancées

#### Will-change

Indique au navigateur quelles propriétés vont changer :

```css
.element-to-animate {
  will-change: transform, opacity;
}

/* Retirer après l'animation */
.element-animated {
  will-change: auto;
}
```

#### Transform3d pour l'accélération matérielle

```css
/* Force l'accélération matérielle */
.accelerated {
  transform: translate3d(0, 0, 0);
  /* ou */
  transform: translateZ(0);
}
```

#### Optimisation des keyframes

```css
/* ❌ Keyframes redondantes */
@keyframes inefficient {
  0% { transform: scale(1); }
  25% { transform: scale(1.1); }
  50% { transform: scale(1.2); }
  75% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* ✅ Keyframes optimisées */
@keyframes efficient {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}
```

## Accessibilité et respect des préférences

### Préférences utilisateur

Respecter `prefers-reduced-motion` pour les utilisateurs sensibles aux mouvements :

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Approche plus fine */
@media (prefers-reduced-motion: reduce) {
  .optional-animation {
    animation: none;
  }
  
  .essential-animation {
    animation-duration: 0.1s;
  }
}
```

### Animations accessibles

```css
/* Animation avec alternative pour reduced-motion */
.notification {
  animation: slideIn 0.3s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .notification {
    animation: fadeIn 0.1s ease-out;
  }
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### Contrôles d'animation

Fournir des contrôles pour les animations longues :

```html
<div class="animation-container">
  <div class="animated-content"></div>
  <button class="pause-button">Pause</button>
</div>
```

```css
.animated-content {
  animation: complexAnimation 10s linear infinite;
}

.animation-container.paused .animated-content {
  animation-play-state: paused;
}
```

## Exemple complet : Interface d'application

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Animations CSS Avancées</title>
  <style>
    /* Reset et base */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: system-ui, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 2rem;
    }
    
    /* Container principal */
    .app-container {
      max-width: 1200px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20px;
      padding: 2rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      animation: containerFadeIn 0.8s ease-out;
    }
    
    @keyframes containerFadeIn {
      from {
        opacity: 0;
        transform: translateY(50px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    
    /* Header avec animation */
    .header {
      text-align: center;
      margin-bottom: 3rem;
      position: relative;
      overflow: hidden;
    }
    
    .header h1 {
      font-size: 3rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: titleSlideIn 1s ease-out 0.3s both;
    }
    
    @keyframes titleSlideIn {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .header::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      width: 100px;
      height: 3px;
      background: linear-gradient(90deg, #667eea, #764ba2);
      border-radius: 2px;
      transform: translateX(-50%) scaleX(0);
      animation: underlineExpand 0.6s ease-out 0.8s both;
    }
    
    @keyframes underlineExpand {
      to { transform: translateX(-50%) scaleX(1); }
    }
    
    /* Grille de cartes */
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }
    
    .card {
      background: white;
      border-radius: 15px;
      padding: 2rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                  box-shadow 0.3s ease-out;
      animation: cardFadeInUp 0.6s ease-out both;
      cursor: pointer;
    }
    
    .card:nth-child(1) { animation-delay: 0.1s; }
    .card:nth-child(2) { animation-delay: 0.2s; }
    .card:nth-child(3) { animation-delay: 0.3s; }
    
    @keyframes cardFadeInUp {
      from {
        opacity: 0;
        transform: translateY(60px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .card:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    }
    
    .card-icon {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 15px;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: white;
      transition: transform 0.2s ease-out;
    }
    
    .card:hover .card-icon {
      transform: rotate(5deg) scale(1.1);
    }
    
    .card h3 {
      color: #333;
      margin-bottom: 1rem;
      font-size: 1.3rem;
    }
    
    .card p {
      color: #666;
      line-height: 1.6;
    }
    
    /* Boutons animés */
    .actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 25px;
      cursor: pointer;
      font-weight: 600;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s ease-out;
      position: relative;
      overflow: hidden;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
    }
    
    .btn-secondary {
      background: transparent;
      color: #667eea;
      border: 2px solid #667eea;
    }
    
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }
    
    .btn:active {
      transform: translateY(0);
    }
    
    /* Effet ripple sur les boutons */
    .btn::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: width 0.6s, height 0.6s;
    }
    
    .btn:active::before {
      width: 300px;
      height: 300px;
    }
    
    /* Loader animé */
    .loader-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
    }
    
    .pulse-loader {
      display: flex;
      gap: 0.5rem;
    }
    
    .pulse-dot {
      width: 12px;
      height: 12px;
      background: #667eea;
      border-radius: 50%;
      animation: pulseScale 1.4s ease-in-out infinite;
    }
    
    .pulse-dot:nth-child(2) { animation-delay: 0.2s; }
    .pulse-dot:nth-child(3) { animation-delay: 0.4s; }
    
    @keyframes pulseScale {
      0%, 80%, 100% {
        transform: scale(0.8);
        opacity: 0.5;
      }
      40% {
        transform: scale(1.2);
        opacity: 1;
      }
    }
    
    /* Responsive et préférences utilisateur */
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
    
    @media (max-width: 768px) {
      .app-container {
        margin: 1rem;
        padding: 1.5rem;
      }
      
      .header h1 {
        font-size: 2rem;
      }
      
      .cards-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }
  </style>
</head>
<body>
  <div class="app-container">
    <header class="header">
      <h1>Animations CSS Modernes</h1>
    </header>
    
    <div class="cards-grid">
      <div class="card">
        <div class="card-icon">🚀</div>
        <h3>Performance</h3>
        <p>Animations optimisées avec accélération matérielle pour une expérience fluide sur tous les appareils.</p>
      </div>
      
      <div class="card">
        <div class="card-icon">♿</div>
        <h3>Accessibilité</h3>
        <p>Respect des préférences utilisateur avec support de prefers-reduced-motion pour une inclusion totale.</p>
      </div>
      
      <div class="card">
        <div class="card-icon">📱</div>
        <h3>Responsive</h3>
        <p>Animations qui s'adaptent automatiquement aux différentes tailles d'écran et contextes d'utilisation.</p>
      </div>
    </div>
    
    <div class="actions">
      <button class="btn btn-primary">
        ✨ Démarrer l'animation
      </button>
      <a href="#" class="btn btn-secondary">
        📖 Documentation
      </a>
    </div>
    
    <div class="loader-container">
      <div class="pulse-loader">
        <div class="pulse-dot"></div>
        <div class="pulse-dot"></div>
        <div class="pulse-dot"></div>
      </div>
    </div>
  </div>
</body>
</html>
```

## Bonnes pratiques et guidelines

### Performance

**✅ À faire :**
- Utiliser `transform` et `opacity` pour les animations
- Spécifier `will-change` avant les animations complexes
- Préférer `transition` pour les micro-interactions
- Limiter le nombre d'éléments animés simultanément

**❌ À éviter :**
- Animer `width`, `height`, `top`, `left`
- Animations sur `:hover` trop complexes
- `will-change: auto` oublié après animation
- Animations infinies sans contrôle utilisateur

### UX/UI

**✅ Guidelines temporelles :**
- Micro-interactions : 100-300ms
- Transitions de contenu : 300-500ms
- Transitions de page : 500-800ms
- Animations décoratives : 1-2s max

**✅ Courbes d'animation :**
- `ease-out` : Éléments qui entrent en scène
- `ease-in` : Éléments qui sortent
- `ease-in-out` : Mouvements symétriques
- Courbes personnalisées pour la personnalité

### Accessibilité

**✅ Impératifs :**
- Implémenter `prefers-reduced-motion`
- Fournir des contrôles pour animations longues
- Éviter les flashs et clignotements rapides
- Tester avec lecteurs d'écran

### Architecture CSS

**✅ Organisation :**
- Grouper les animations par fonctionnalité
- Utiliser des noms de keyframes descriptifs
- Documenter les animations complexes
- Créer des classes utilitaires pour animations communes

```css
/* Classes utilitaires d'animation */
.fade-in { animation: fadeIn 0.3s ease-out; }
.slide-up { animation: slideUp 0.4s ease-out; }
.zoom-in { animation: zoomIn 0.3s ease-out; }
.bounce-in { animation: bounceIn 0.6s ease-out; }

/* Contrôles d'état */
.paused { animation-play-state: paused !important; }
.reduced-motion { animation-duration: 0.01ms !important; }
```

## Ressources et outils

### Outils de développement

**Générateurs de courbes :** 
- cubic-bezier.com
- easings.net
- Material Design Motion

**Bibliothèques d'animations :**
- Animate.css : Animations prêtes à l'emploi
- AOS (Animate On Scroll) : Animations au défilement
- Framer Motion : Animations React avancées
- GSAP : Animations JavaScript haute performance

### Inspiration et références

**Showcases :**
- CodePen animations
- Dribbble micro-interactions
- UI Movement
- Page Flows

**Guidelines design :**
- Material Design Motion
- Human Interface Guidelines (Apple)
- Fluent Design System (Microsoft)

---

Les animations CSS transforment des interfaces statiques en expériences vivantes et engageantes. Utilisées judicieusement, elles guident l'utilisateur, améliorent la compréhension et créent une connexion émotionnelle avec vos applications web.
