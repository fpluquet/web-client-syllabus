# 4.2 Navigation responsive

## Introduction

La navigation responsive s'adapte automatiquement à différentes tailles d'écran pour offrir une expérience utilisateur optimale sur tous les appareils. Elle combine design adaptatif, interactions intuitives et performances optimisées.

## Concepts fondamentaux

### Approche mobile-first

```css
/* Styles de base pour mobile */
.navbar {
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-logo a {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}

/* Menu mobile par défaut */
.nav-menu {
  position: fixed;
  top: 70px;
  left: -100%;
  width: 100%;
  height: calc(100vh - 70px);
  background: white;
  display: flex;
  flex-direction: column;
  transition: left 0.3s ease;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.nav-menu.active {
  left: 0;
}

/* Tablette et desktop */
@media (min-width: 768px) {
  .nav-menu {
    position: static;
    height: auto;
    flex-direction: row;
    background: transparent;
    box-shadow: none;
    width: auto;
    left: 0;
  }
  
  .nav-toggle {
    display: none;
  }
}
```

## Menu burger animé

### Structure HTML

```html
<nav class="navbar-responsive">
  <div class="nav-container">
    <div class="nav-logo">
      <a href="/">WebSite</a>
    </div>
    
    <button class="nav-toggle" aria-label="Toggle menu">
      <span class="hamburger">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </span>
    </button>
    
    <nav class="nav-menu">
      <a href="#home" class="nav-link">Accueil</a>
      <a href="#services" class="nav-link">Services</a>
      <a href="#portfolio" class="nav-link">Portfolio</a>
      <a href="#about" class="nav-link">À propos</a>
      <a href="#contact" class="nav-link">Contact</a>
    </nav>
  </div>
</nav>
```

### Styles CSS avancés

```css
.navbar-responsive {
  background: linear-gradient(135deg, #667eea, #764ba2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.navbar-responsive.scrolled {
  background: rgba(102, 126, 234, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0,0,0,0.1);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-logo a {
  color: white;
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: bold;
  letter-spacing: -0.5px;
}

/* Menu burger */
.nav-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.hamburger {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20px;
  height: 14px;
}

.hamburger-line {
  width: 100%;
  height: 2px;
  background: white;
  border-radius: 1px;
  transition: all 0.3s ease;
  transform-origin: center;
}

/* Animation du burger */
.nav-toggle.active .hamburger-line:first-child {
  transform: translateY(6px) rotate(45deg);
}

.nav-toggle.active .hamburger-line:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.nav-toggle.active .hamburger-line:last-child {
  transform: translateY(-6px) rotate(-45deg);
}

/* Menu mobile */
.nav-menu {
  position: fixed;
  top: 70px;
  left: -100%;
  width: 100%;
  height: calc(100vh - 70px);
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 2rem;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  overflow-y: auto;
}

.nav-menu.active {
  left: 0;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 1rem 2rem;
  margin: 0.5rem 0;
  border-radius: 25px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  width: 80%;
  text-align: center;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: rgba(255,255,255,0.1);
  transition: left 0.3s ease;
  z-index: -1;
}

.nav-link:hover::before,
.nav-link:focus::before {
  left: 0;
}

.nav-link:hover,
.nav-link:focus {
  transform: translateX(10px);
  background: rgba(255,255,255,0.1);
}

/* Responsive - Tablette et Desktop */
@media (min-width: 768px) {
  .nav-toggle {
    display: none;
  }
  
  .nav-menu {
    position: static;
    height: auto;
    width: auto;
    flex-direction: row;
    background: transparent;
    padding: 0;
    overflow: visible;
    justify-content: flex-end;
    align-items: center;
  }
  
  .nav-link {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    margin: 0 0.25rem;
    width: auto;
    text-align: left;
  }
  
  .nav-link:hover,
  .nav-link:focus {
    transform: translateY(-2px);
    background: rgba(255,255,255,0.1);
  }
}

@media (min-width: 1024px) {
  .nav-container {
    padding: 1rem 3rem;
  }
  
  .nav-link {
    font-size: 1.1rem;
    padding: 0.75rem 1.5rem;
    margin: 0 0.5rem;
  }
}
```

## Breakpoints et media queries

### Points de rupture standard

```css
/* Variables CSS pour les breakpoints */
:root {
  --mobile: 480px;
  --tablet: 768px;
  --desktop: 1024px;
  --large: 1200px;
}

/* Mobile small */
@media (max-width: 479px) {
  .nav-container {
    padding: 0.75rem 1rem;
  }
  
  .nav-logo a {
    font-size: 1.4rem;
  }
  
  .nav-link {
    font-size: 1.1rem;
    padding: 0.75rem 1.5rem;
  }
}

/* Mobile */
@media (min-width: 480px) and (max-width: 767px) {
  .nav-container {
    padding: 1rem 1.5rem;
  }
}

/* Tablette */
@media (min-width: 768px) and (max-width: 1023px) {
  .nav-menu {
    gap: 0.5rem;
  }
  
  .nav-link {
    font-size: 0.95rem;
    padding: 0.5rem 0.75rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .nav-menu {
    gap: 1rem;
  }
}

/* Large screens */
@media (min-width: 1200px) {
  .nav-container {
    max-width: 1400px;
  }
}
```

## Navigation avec sous-menus responsive

```html
<nav class="navbar-dropdown-responsive">
  <div class="nav-container">
    <div class="nav-logo">
      <a href="/">TechCorp</a>
    </div>
    
    <button class="nav-toggle">
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>
    
    <ul class="nav-menu">
      <li class="nav-item">
        <a href="/" class="nav-link">Accueil</a>
      </li>
      
      <li class="nav-item has-dropdown">
        <a href="#" class="nav-link">
          Services 
          <span class="dropdown-toggle">▼</span>
        </a>
        <ul class="dropdown-menu">
          <li><a href="/web-design">Web Design</a></li>
          <li><a href="/development">Développement</a></li>
          <li><a href="/seo">SEO</a></li>
          <li><a href="/maintenance">Maintenance</a></li>
        </ul>
      </li>
      
      <li class="nav-item has-dropdown">
        <a href="#" class="nav-link">
          Solutions
          <span class="dropdown-toggle">▼</span>
        </a>
        <ul class="dropdown-menu">
          <li><a href="/ecommerce">E-commerce</a></li>
          <li><a href="/cms">CMS</a></li>
          <li><a href="/applications">Applications</a></li>
        </ul>
      </li>
      
      <li class="nav-item">
        <a href="/contact" class="nav-link">Contact</a>
      </li>
    </ul>
  </div>
</nav>
```

```css
/* Styles pour les sous-menus responsives */
.has-dropdown {
  position: relative;
}

.dropdown-toggle {
  margin-left: 0.5rem;
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

.has-dropdown.active .dropdown-toggle {
  transform: rotate(180deg);
}

.dropdown-menu {
  list-style: none;
  padding: 0;
  margin: 0;
  background: rgba(255,255,255,0.1);
  border-radius: 8px;
  overflow: hidden;
  max-height: 0;
  transition: all 0.3s ease;
}

.has-dropdown.active .dropdown-menu {
  max-height: 200px;
  margin-top: 0.5rem;
}

.dropdown-menu li {
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.dropdown-menu li:last-child {
  border-bottom: none;
}

.dropdown-menu a {
  display: block;
  padding: 0.75rem 1rem;
  color: rgba(255,255,255,0.9);
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.dropdown-menu a:hover {
  background: rgba(255,255,255,0.1);
  color: white;
  padding-left: 1.5rem;
}

/* Desktop - sous-menus en position absolue */
@media (min-width: 768px) {
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 200px;
    background: white;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    border-radius: 8px;
    margin-top: 0;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    max-height: none;
  }
  
  .has-dropdown:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  .dropdown-menu a {
    color: #333;
    padding: 0.75rem 1rem;
  }
  
  .dropdown-menu a:hover {
    background: #f8f9fa;
    color: #667eea;
    padding-left: 1rem;
  }
}
```

## JavaScript pour l'interactivité

```javascript
// Navigation responsive avec JavaScript
class ResponsiveNavigation {
  constructor() {
    this.navbar = document.querySelector('.navbar-responsive');
    this.navToggle = document.querySelector('.nav-toggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.dropdowns = document.querySelectorAll('.has-dropdown');
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.handleScroll();
  }
  
  bindEvents() {
    // Toggle menu mobile
    this.navToggle?.addEventListener('click', () => this.toggleMenu());
    
    // Fermer menu sur clic de lien
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
    
    // Gestion des sous-menus sur mobile
    this.dropdowns.forEach(dropdown => {
      const link = dropdown.querySelector('.nav-link');
      link?.addEventListener('click', (e) => this.toggleDropdown(e, dropdown));
    });
    
    // Fermer menu sur clic extérieur
    document.addEventListener('click', (e) => this.handleOutsideClick(e));
    
    // Gestion du scroll
    window.addEventListener('scroll', () => this.handleScroll());
    
    // Gestion du redimensionnement
    window.addEventListener('resize', () => this.handleResize());
  }
  
  toggleMenu() {
    this.navToggle.classList.toggle('active');
    this.navMenu.classList.toggle('active');
    document.body.classList.toggle('nav-open');
  }
  
  closeMenu() {
    this.navToggle.classList.remove('active');
    this.navMenu.classList.remove('active');
    document.body.classList.remove('nav-open');
    
    // Fermer tous les sous-menus
    this.dropdowns.forEach(dropdown => {
      dropdown.classList.remove('active');
    });
  }
  
  toggleDropdown(e, dropdown) {
    if (window.innerWidth < 768) {
      e.preventDefault();
      dropdown.classList.toggle('active');
      
      // Fermer les autres sous-menus
      this.dropdowns.forEach(otherDropdown => {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove('active');
        }
      });
    }
  }
  
  handleOutsideClick(e) {
    if (!this.navbar.contains(e.target)) {
      this.closeMenu();
    }
  }
  
  handleScroll() {
    const scrolled = window.scrollY > 50;
    this.navbar.classList.toggle('scrolled', scrolled);
  }
  
  handleResize() {
    if (window.innerWidth >= 768) {
      this.closeMenu();
    }
  }
}

// Initialiser la navigation
document.addEventListener('DOMContentLoaded', () => {
  new ResponsiveNavigation();
});
```

## Styles CSS additionnels

```css
/* Empêcher le scroll quand le menu est ouvert */
body.nav-open {
  overflow: hidden;
}

/* Animation pour les liens actifs */
.nav-link.active {
  background: rgba(255,255,255,0.2);
  color: white;
}

/* Indicateur de page actuelle */
.nav-link[aria-current="page"] {
  position: relative;
}

.nav-link[aria-current="page"]::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  width: 20px;
  height: 3px;
  background: white;
  border-radius: 2px;
  transform: translateX(-50%);
}

@media (max-width: 767px) {
  .nav-link[aria-current="page"]::after {
    display: none;
  }
  
  .nav-link[aria-current="page"] {
    background: rgba(255,255,255,0.2);
  }
}

/* Amélioration de l'accessibilité */
.nav-toggle:focus {
  outline: 2px solid white;
  outline-offset: 2px;
}

.nav-link:focus {
  outline: 2px solid rgba(255,255,255,0.5);
  outline-offset: 2px;
}

/* Animation de chargement */
@keyframes slideInFromTop {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.navbar-responsive {
  animation: slideInFromTop 0.5s ease-out;
}
```

## Exemple complet avec navigation sticky

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Navigation Responsive</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
    }
    
    /* Styles de navigation intégrés ici */
    
    .content {
      margin-top: 70px;
      padding: 2rem;
    }
    
    .section {
      min-height: 100vh;
      padding: 4rem 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    
    .section:nth-child(even) {
      background: #f8f9fa;
    }
    
    .section h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #333;
    }
    
    .section p {
      font-size: 1.2rem;
      color: #666;
      max-width: 600px;
    }
  </style>
</head>
<body>
  <nav class="navbar-responsive">
    <div class="nav-container">
      <div class="nav-logo">
        <a href="/">ResponsiveNav</a>
      </div>
      
      <button class="nav-toggle" aria-label="Toggle navigation">
        <span class="hamburger">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </span>
      </button>
      
      <nav class="nav-menu">
        <a href="#home" class="nav-link" aria-current="page">Accueil</a>
        <a href="#services" class="nav-link">Services</a>
        <a href="#portfolio" class="nav-link">Portfolio</a>
        <a href="#about" class="nav-link">À propos</a>
        <a href="#contact" class="nav-link">Contact</a>
      </nav>
    </div>
  </nav>
  
  <main class="content">
    <section id="home" class="section">
      <div>
        <h2>Bienvenue</h2>
        <p>Navigation responsive moderne avec animations fluides</p>
      </div>
    </section>
    
    <section id="services" class="section">
      <div>
        <h2>Services</h2>
        <p>Solutions web adaptatives pour tous vos besoins</p>
      </div>
    </section>
    
    <section id="portfolio" class="section">
      <div>
        <h2>Portfolio</h2>
        <p>Découvrez nos réalisations et projets récents</p>
      </div>
    </section>
    
    <section id="about" class="section">
      <div>
        <h2>À propos</h2>
        <p>Une équipe passionnée par le design responsive</p>
      </div>
    </section>
    
    <section id="contact" class="section">
      <div>
        <h2>Contact</h2>
        <p>Discutons de votre prochain projet</p>
      </div>
    </section>
  </main>
  
  <script>
    // Code JavaScript intégré ici
  </script>
</body>
</html>
```

## Bonnes pratiques

### ✅ Performance
- Utiliser `transform` et `opacity` pour les animations
- Éviter les reflows avec `will-change`
- Optimiser les images et icônes

### ✅ Accessibilité
- Attributs ARIA appropriés
- Navigation au clavier
- Contrastes suffisants
- États focus visibles

### ✅ UX/UI
- Transitions fluides
- Feedback visuel immédiat
- États de chargement
- Gestures tactiles

### ✅ SEO
- Structure HTML sémantique
- URLs descriptives
- Méta-données appropriées

## Résumé

La navigation responsive combine design adaptatif, interactions intuitives et performances optimisées. L'approche mobile-first avec progressive enhancement garantit une expérience utilisateur excellente sur tous les appareils.

