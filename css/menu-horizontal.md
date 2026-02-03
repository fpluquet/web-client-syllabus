# 4.1 Menu horizontal

## Introduction

Le menu horizontal est un élément essentiel de la navigation web. Il doit être intuitif, accessible et s'adapter à différentes tailles d'écran. Ce chapitre couvre les techniques modernes pour créer des menus horizontaux efficaces.

## Structure HTML de base

### Menu simple

```html
<nav class="navbar">
  <div class="nav-container">
    <div class="nav-logo">
      <a href="/">MonSite</a>
    </div>
    
    <ul class="nav-menu">
      <li class="nav-item">
        <a href="/" class="nav-link">Accueil</a>
      </li>
      <li class="nav-item">
        <a href="/services" class="nav-link">Services</a>
      </li>
      <li class="nav-item">
        <a href="/portfolio" class="nav-link">Portfolio</a>
      </li>
      <li class="nav-item">
        <a href="/blog" class="nav-link">Blog</a>
      </li>
      <li class="nav-item">
        <a href="/contact" class="nav-link">Contact</a>
      </li>
    </ul>
    
    <div class="nav-toggle">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
  </div>
</nav>
```

### Menu avec sous-menus

```html
<nav class="navbar-dropdown">
  <ul class="nav-menu">
    <li class="nav-item">
      <a href="/" class="nav-link">Accueil</a>
    </li>
    
    <li class="nav-item dropdown">
      <a href="/services" class="nav-link">
        Services <span class="dropdown-icon">▼</span>
      </a>
      <ul class="dropdown-menu">
        <li><a href="/services/web-design">Web Design</a></li>
        <li><a href="/services/development">Développement</a></li>
        <li><a href="/services/seo">SEO</a></li>
        <li><a href="/services/maintenance">Maintenance</a></li>
      </ul>
    </li>
    
    <li class="nav-item dropdown">
      <a href="/portfolio" class="nav-link">
        Portfolio <span class="dropdown-icon">▼</span>
      </a>
      <ul class="dropdown-menu">
        <li><a href="/portfolio/websites">Sites Web</a></li>
        <li><a href="/portfolio/applications">Applications</a></li>
        <li><a href="/portfolio/branding">Branding</a></li>
      </ul>
    </li>
    
    <li class="nav-item">
      <a href="/blog" class="nav-link">Blog</a>
    </li>
    
    <li class="nav-item">
      <a href="/contact" class="nav-link">Contact</a>
    </li>
  </ul>
</nav>
```

## Styles CSS de base

### Menu simple avec Flexbox

```css
/* Reset et base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Navigation container */
.navbar {
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

/* Logo */
.nav-logo a {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-logo a:hover {
  color: #3498db;
}

/* Menu principal */
.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-item {
  position: relative;
}

.nav-link {
  color: #2c3e50;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #3498db;
  background: rgba(52, 152, 219, 0.1);
}

/* Indicateur actif */
.nav-link.active {
  color: #3498db;
  background: rgba(52, 152, 219, 0.1);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 3px;
  background: #3498db;
  border-radius: 2px;
}

/* Toggle mobile (caché par défaut) */
.nav-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.bar {
  width: 25px;
  height: 3px;
  background: #2c3e50;
  margin: 3px 0;
  transition: 0.3s;
  border-radius: 2px;
}
```

### Menu avec sous-menus (dropdown)

```css
/* Menu dropdown */
.navbar-dropdown {
  background: #2c3e50;
  padding: 0 2rem;
}

.navbar-dropdown .nav-menu {
  display: flex;
  list-style: none;
  gap: 0;
  max-width: 1200px;
  margin: 0 auto;
}

.navbar-dropdown .nav-item {
  position: relative;
}

.navbar-dropdown .nav-link {
  display: block;
  color: white;
  text-decoration: none;
  padding: 1.2rem 1.5rem;
  transition: all 0.3s ease;
  border-radius: 0;
}

.navbar-dropdown .nav-link:hover {
  background: #34495e;
  color: #3498db;
}

/* Dropdown arrow */
.dropdown-icon {
  font-size: 0.8rem;
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
}

.dropdown:hover .dropdown-icon {
  transform: rotate(180deg);
}

/* Dropdown menu */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  min-width: 200px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border-radius: 0 0 8px 8px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1000;
  list-style: none;
}

.dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-menu li {
  border-bottom: 1px solid #ecf0f1;
}

.dropdown-menu li:last-child {
  border-bottom: none;
}

.dropdown-menu a {
  display: block;
  color: #2c3e50;
  text-decoration: none;
  padding: 1rem 1.5rem;
  transition: all 0.3s ease;
}

.dropdown-menu a:hover {
  background: #ecf0f1;
  color: #3498db;
  padding-left: 2rem;
}
```

## Styles avancés et effets

### Menu avec animations

```css
/* Menu avec effets de survol avancés */
.navbar-animated {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0;
  position: relative;
}

.navbar-animated::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.navbar-animated .nav-container {
  position: relative;
  z-index: 1;
}

.navbar-animated .nav-menu {
  gap: 0;
}

.navbar-animated .nav-link {
  color: white;
  padding: 1.5rem 2rem;
  position: relative;
  overflow: hidden;
}

.navbar-animated .nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s ease;
}

.navbar-animated .nav-link:hover::before {
  left: 100%;
}

.navbar-animated .nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 3px;
  background: white;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.navbar-animated .nav-link:hover::after {
  width: 80%;
}
```

### Menu avec indicateur de position

```css
/* Menu avec indicateur de position fluide */
.navbar-indicator {
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: relative;
}

.navbar-indicator .nav-menu {
  position: relative;
}

.navbar-indicator .nav-link {
  color: #555;
  padding: 1.5rem 2rem;
  transition: color 0.3s ease;
}

.navbar-indicator .nav-link:hover,
.navbar-indicator .nav-link.active {
  color: #3498db;
}

/* Indicateur fluide */
.nav-indicator {
  position: absolute;
  bottom: 0;
  height: 3px;
  background: #3498db;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  border-radius: 2px 2px 0 0;
}

/* Animation de l'indicateur via JavaScript */
.navbar-indicator[data-indicator-position="0"] .nav-indicator {
  left: 0;
  width: 120px; /* Largeur du premier item */
}

.navbar-indicator[data-indicator-position="1"] .nav-indicator {
  left: 120px;
  width: 130px; /* Largeur du deuxième item */
}

/* ... etc pour chaque position */
```

## Menu mega (large dropdown)

```html
<nav class="navbar-mega">
  <div class="nav-container">
    <div class="nav-logo">
      <a href="/">TechCorp</a>
    </div>
    
    <ul class="nav-menu">
      <li class="nav-item">
        <a href="/" class="nav-link">Accueil</a>
      </li>
      
      <li class="nav-item mega-dropdown">
        <a href="/services" class="nav-link">
          Services <span class="dropdown-icon">▼</span>
        </a>
        <div class="mega-menu">
          <div class="mega-container">
            <div class="mega-column">
              <h4>Développement Web</h4>
              <ul>
                <li><a href="/services/frontend">Frontend</a></li>
                <li><a href="/services/backend">Backend</a></li>
                <li><a href="/services/fullstack">Full Stack</a></li>
                <li><a href="/services/cms">CMS</a></li>
              </ul>
            </div>
            
            <div class="mega-column">
              <h4>Design</h4>
              <ul>
                <li><a href="/services/ui-design">UI Design</a></li>
                <li><a href="/services/ux-design">UX Design</a></li>
                <li><a href="/services/branding">Branding</a></li>
                <li><a href="/services/print">Print</a></li>
              </ul>
            </div>
            
            <div class="mega-column">
              <h4>Marketing</h4>
              <ul>
                <li><a href="/services/seo">SEO</a></li>
                <li><a href="/services/sem">SEM</a></li>
                <li><a href="/services/social">Réseaux Sociaux</a></li>
                <li><a href="/services/content">Content Marketing</a></li>
              </ul>
            </div>
            
            <div class="mega-column mega-featured">
              <h4>Projet en vedette</h4>
              <div class="featured-project">
                <img src="project-thumb.jpg" alt="Projet">
                <h5>E-commerce Moderne</h5>
                <p>Solution complète pour boutique en ligne</p>
                <a href="/portfolio/ecommerce" class="btn-featured">Voir le projet</a>
              </div>
            </div>
          </div>
        </div>
      </li>
      
      <li class="nav-item">
        <a href="/portfolio" class="nav-link">Portfolio</a>
      </li>
      
      <li class="nav-item">
        <a href="/contact" class="nav-link">Contact</a>
      </li>
    </ul>
  </div>
</nav>
```

```css
/* Styles pour mega menu */
.mega-dropdown {
  position: static; /* Important pour le mega menu */
}

.mega-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
  transition: all 0.3s ease;
  z-index: 1000;
}

.mega-dropdown:hover .mega-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.mega-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 3rem 2rem;
}

.mega-column h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  border-bottom: 2px solid #3498db;
  padding-bottom: 0.5rem;
}

.mega-column ul {
  list-style: none;
}

.mega-column ul li {
  margin-bottom: 0.5rem;
}

.mega-column ul a {
  color: #666;
  text-decoration: none;
  padding: 0.5rem 0;
  display: block;
  transition: all 0.3s ease;
}

.mega-column ul a:hover {
  color: #3498db;
  padding-left: 1rem;
}

/* Colonne featured */
.mega-featured {
  border-left: 1px solid #ecf0f1;
  padding-left: 2rem;
}

.featured-project {
  text-align: center;
}

.featured-project img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.featured-project h5 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.featured-project p {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.btn-featured {
  background: #3498db;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: background 0.3s ease;
}

.btn-featured:hover {
  background: #2980b9;
}
```

## Design responsive

```css
/* Responsive design */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
  }
  
  .nav-menu {
    position: fixed;
    left: -100%;
    top: 70px;
    flex-direction: column;
    background: white;
    width: 100%;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 10px 27px rgba(0,0,0,0.05);
    gap: 0;
  }
  
  .nav-menu.active {
    left: 0;
  }
  
  .nav-item {
    margin: 0;
  }
  
  .nav-link {
    padding: 1.5rem;
    display: block;
    border-bottom: 1px solid #ecf0f1;
  }
  
  .nav-toggle {
    display: flex;
  }
  
  /* Animation du burger menu */
  .nav-toggle.active .bar:nth-child(2) {
    opacity: 0;
  }
  
  .nav-toggle.active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }
  
  .nav-toggle.active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
  
  /* Dropdown mobile */
  .dropdown-menu {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    box-shadow: none;
    background: #f8f9fa;
    border-radius: 0;
  }
  
  .dropdown-menu a {
    padding-left: 3rem;
    font-size: 0.9rem;
  }
  
  /* Mega menu mobile */
  .mega-menu {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    box-shadow: none;
  }
  
  .mega-container {
    grid-template-columns: 1fr;
    padding: 2rem 1rem;
    gap: 2rem;
  }
  
  .mega-featured {
    border-left: none;
    border-top: 1px solid #ecf0f1;
    padding-left: 0;
    padding-top: 2rem;
  }
}

@media (max-width: 480px) {
  .nav-container {
    height: 60px;
  }
  
  .nav-logo a {
    font-size: 1.3rem;
  }
  
  .nav-menu {
    top: 60px;
  }
  
  .nav-link {
    padding: 1rem;
  }
}
```

## Exemple pratique complet

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Menu Horizontal Moderne</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
    }

    /* Navigation principale */
    .navbar {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 20px rgba(0,0,0,0.1);
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 2rem;
      height: 80px;
    }

    .nav-logo a {
      color: white;
      text-decoration: none;
      font-size: 1.8rem;
      font-weight: 700;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .nav-menu {
      display: flex;
      list-style: none;
      gap: 0;
    }

    .nav-item {
      position: relative;
    }

    .nav-link {
      color: white;
      text-decoration: none;
      padding: 1.5rem 2rem;
      display: block;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
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
    }

    .nav-link:hover::before {
      left: 0;
    }

    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 3px;
      background: white;
      transition: all 0.3s ease;
      transform: translateX(-50%);
    }

    .nav-link:hover::after,
    .nav-link.active::after {
      width: 80%;
    }

    /* Dropdown */
    .dropdown-icon {
      font-size: 0.8rem;
      margin-left: 0.5rem;
      transition: transform 0.3s ease;
    }

    .dropdown:hover .dropdown-icon {
      transform: rotate(180deg);
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      background: white;
      min-width: 220px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      border-radius: 0 0 12px 12px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-20px);
      transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
      list-style: none;
      overflow: hidden;
    }

    .dropdown:hover .dropdown-menu {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .dropdown-menu li {
      border-bottom: 1px solid rgba(0,0,0,0.05);
    }

    .dropdown-menu li:last-child {
      border-bottom: none;
    }

    .dropdown-menu a {
      color: #333;
      text-decoration: none;
      padding: 1rem 1.5rem;
      display: block;
      transition: all 0.3s ease;
      position: relative;
    }

    .dropdown-menu a:hover {
      background: #f8f9fa;
      color: #667eea;
      padding-left: 2rem;
    }

    /* Menu toggle pour mobile */
    .nav-toggle {
      display: none;
      flex-direction: column;
      cursor: pointer;
      padding: 0.5rem;
    }

    .bar {
      width: 25px;
      height: 3px;
      background: white;
      margin: 3px 0;
      transition: 0.3s;
      border-radius: 2px;
    }

    /* Contenu de démonstration */
    .content {
      padding: 4rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .section {
      margin-bottom: 4rem;
      padding: 3rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    }

    .section h2 {
      color: #333;
      margin-bottom: 1rem;
      font-size: 2rem;
    }

    .section p {
      color: #666;
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .nav-container {
        padding: 0 1rem;
        height: 70px;
      }

      .nav-logo a {
        font-size: 1.5rem;
      }

      .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background: white;
        width: 100%;
        text-align: left;
        transition: 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        gap: 0;
        height: calc(100vh - 70px);
        overflow-y: auto;
      }

      .nav-menu.active {
        left: 0;
      }

      .nav-item {
        border-bottom: 1px solid rgba(0,0,0,0.05);
      }

      .nav-link {
        color: #333;
        padding: 1.5rem 2rem;
        border-bottom: none;
      }

      .nav-link::before,
      .nav-link::after {
        display: none;
      }

      .nav-link:hover {
        background: #f8f9fa;
        color: #667eea;
      }

      .nav-toggle {
        display: flex;
      }

      .nav-toggle.active .bar:nth-child(2) {
        opacity: 0;
      }

      .nav-toggle.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
      }

      .nav-toggle.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
      }

      .dropdown-menu {
        position: static;
        opacity: 1;
        visibility: visible;
        transform: none;
        box-shadow: none;
        background: #f8f9fa;
        border-radius: 0;
        min-width: auto;
      }

      .dropdown-menu a {
        padding-left: 3rem;
        font-size: 0.95rem;
      }

      .content {
        padding: 2rem 1rem;
      }

      .section {
        padding: 2rem;
        margin-bottom: 2rem;
      }
    }

    @media (max-width: 480px) {
      .nav-container {
        height: 60px;
      }

      .nav-menu {
        top: 60px;
        height: calc(100vh - 60px);
      }

      .nav-link {
        padding: 1.2rem 1.5rem;
      }

      .dropdown-menu a {
        padding-left: 2.5rem;
      }
    }
  </style>
</head>
<body>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-logo">
        <a href="/">TechCorp</a>
      </div>
      
      <ul class="nav-menu">
        <li class="nav-item">
          <a href="#accueil" class="nav-link active">Accueil</a>
        </li>
        
        <li class="nav-item dropdown">
          <a href="#services" class="nav-link">
            Services <span class="dropdown-icon">▼</span>
          </a>
          <ul class="dropdown-menu">
            <li><a href="#web-design">Web Design</a></li>
            <li><a href="#development">Développement</a></li>
            <li><a href="#seo">SEO & Marketing</a></li>
            <li><a href="#maintenance">Maintenance</a></li>
            <li><a href="#consulting">Consulting</a></li>
          </ul>
        </li>
        
        <li class="nav-item dropdown">
          <a href="#portfolio" class="nav-link">
            Portfolio <span class="dropdown-icon">▼</span>
          </a>
          <ul class="dropdown-menu">
            <li><a href="#websites">Sites Web</a></li>
            <li><a href="#applications">Applications</a></li>
            <li><a href="#ecommerce">E-commerce</a></li>
            <li><a href="#branding">Branding</a></li>
          </ul>
        </li>
        
        <li class="nav-item">
          <a href="#blog" class="nav-link">Blog</a>
        </li>
        
        <li class="nav-item">
          <a href="#contact" class="nav-link">Contact</a>
        </li>
      </ul>
      
      <div class="nav-toggle">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>
  </nav>

  <div class="content">
    <section id="accueil" class="section">
      <h2>Bienvenue chez TechCorp</h2>
      <p>Nous créons des solutions web innovantes pour votre entreprise. Notre équipe d'experts vous accompagne dans tous vos projets digitaux.</p>
      <p>Découvrez nos services et réalisations pour comprendre comment nous pouvons vous aider à atteindre vos objectifs.</p>
    </section>

    <section id="services" class="section">
      <h2>Nos Services</h2>
      <p>Nous offrons une gamme complète de services web : design, développement, SEO et maintenance. Chaque projet est unique et mérite une approche personnalisée.</p>
    </section>

    <section id="portfolio" class="section">
      <h2>Portfolio</h2>
      <p>Consultez nos réalisations récentes et découvrez la qualité de notre travail. De sites vitrines aux applications complexes, nous relevons tous les défis.</p>
    </section>

    <section id="blog" class="section">
      <h2>Blog</h2>
      <p>Restez informé des dernières tendances web et des bonnes pratiques. Notre blog vous partage notre expertise et nos retours d'expérience.</p>
    </section>

    <section id="contact" class="section">
      <h2>Contact</h2>
      <p>Prêt à démarrer votre projet ? Contactez-nous pour une consultation gratuite. Nous serions ravis de discuter de vos besoins.</p>
    </section>
  </div>

  <script>
    // Gestion du menu mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Fermer le menu mobile lors du clic sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Gestion des liens actifs
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });

    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  </script>
</body>
</html>
```

## Bonnes pratiques

1. **Accessibilité** avec navigation au clavier
2. **Performance** avec CSS optimisé
3. **SEO** avec structure sémantique
4. **UX** avec feedback visuel
5. **Responsive** sur tous appareils

## Résumé

Le menu horizontal est un élément crucial de l'interface. Une bonne implémentation combine structure HTML sémantique, styles CSS avancés et interactions JavaScript fluides pour créer une navigation intuitive et accessible.
