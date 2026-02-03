# 4.3 Navigation interne

## Introduction

La navigation interne permet aux utilisateurs de se déplacer facilement au sein d'une même page ou d'un site web. Elle inclut les ancres, le défilement fluide, les tables des matières et les systèmes de breadcrumb (fil d'Ariane).

## Ancres et liens internes

### Ancres de base

```html
<!-- Navigation vers des sections -->
<nav>
  <ul>
    <li><a href="#introduction">Introduction</a></li>
    <li><a href="#services">Services</a></li>
    <li><a href="#portfolio">Portfolio</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>

<!-- Sections cibles -->
<section id="introduction">
  <h2>Introduction</h2>
  <p>Contenu de l'introduction...</p>
</section>

<section id="services">
  <h2>Services</h2>
  <p>Contenu des services...</p>
</section>

<section id="portfolio">
  <h2>Portfolio</h2>
  <p>Contenu du portfolio...</p>
</section>

<section id="contact">
  <h2>Contact</h2>
  <p>Informations de contact...</p>
</section>
```

### Ancres avancées avec offset

```css
/* Compensation pour menu fixe */
.section-anchor {
  scroll-margin-top: 80px; /* Hauteur du menu fixe */
}

/* Méthode alternative avec pseudo-élément */
.section-anchor::before {
  content: '';
  display: block;
  height: 80px;
  margin-top: -80px;
  visibility: hidden;
}
```

```html
<section id="services" class="section-anchor">
  <h2>Services</h2>
  <p>Le contenu s'affiche correctement sous le menu fixe.</p>
</section>
```

## Défilement fluide (Smooth Scrolling)

### CSS natif

```css
/* Défilement fluide pour toute la page */
html {
  scroll-behavior: smooth;
}

/* Application sélective */
.smooth-scroll {
  scroll-behavior: smooth;
}

/* Désactiver sur demande de l'utilisateur */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

### JavaScript avancé

```javascript
// Défilement fluide avec contrôle total
function scrollToSection(targetId, offset = 0) {
  const target = document.getElementById(targetId);
  if (!target) return;
  
  const targetPosition = target.offsetTop - offset;
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

// Utilisation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    scrollToSection(targetId, 80); // 80px pour le menu fixe
  });
});
```

### Défilement fluide personnalisé

```javascript
// Animation personnalisée avec easing
function smoothScrollTo(target, duration = 800, offset = 0) {
  const targetElement = document.getElementById(target);
  if (!targetElement) return;
  
  const startPosition = window.pageYOffset;
  const targetPosition = targetElement.offsetTop - offset;
  const distance = targetPosition - startPosition;
  let startTime = null;
  
  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }
  
  // Fonction d'easing (ease-in-out)
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
  
  requestAnimationFrame(animation);
}

// Utilisation
document.addEventListener('click', function(e) {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    smoothScrollTo(targetId, 1000, 80);
  }
});
```

## Table des matières

### Table des matières simple

```html
<nav class="table-of-contents">
  <h3>Table des matières</h3>
  <ol>
    <li><a href="#introduction">Introduction</a></li>
    <li><a href="#methodes">Méthodes</a>
      <ol>
        <li><a href="#methode-1">Méthode 1</a></li>
        <li><a href="#methode-2">Méthode 2</a></li>
      </ol>
    </li>
    <li><a href="#resultats">Résultats</a></li>
    <li><a href="#conclusion">Conclusion</a></li>
  </ol>
</nav>
```

```css
.table-of-contents {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  border-left: 4px solid #007bff;
  margin-bottom: 2rem;
}

.table-of-contents h3 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.table-of-contents ol {
  margin-left: 1rem;
}

.table-of-contents li {
  margin-bottom: 0.5rem;
}

.table-of-contents a {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.table-of-contents a:hover {
  color: #0056b3;
  text-decoration: underline;
}

/* Table des matières sticky */
.toc-sticky {
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}
```

### Table des matières automatique

```javascript
// Génération automatique de table des matières
class TableOfContents {
  constructor(container, options = {}) {
    this.container = document.querySelector(container);
    this.options = {
      headings: 'h1, h2, h3, h4, h5, h6',
      title: 'Table des matières',
      className: 'auto-toc',
      ...options
    };
    
    this.generate();
  }
  
  generate() {
    const headings = document.querySelectorAll(this.options.headings);
    if (headings.length === 0) return;
    
    // Créer la structure TOC
    const tocElement = this.createTocElement();
    const tocList = this.createTocList(headings);
    
    tocElement.appendChild(tocList);
    this.container.appendChild(tocElement);
    
    // Ajouter les IDs aux titres si nécessaire
    this.addIdsToHeadings(headings);
  }
  
  createTocElement() {
    const toc = document.createElement('nav');
    toc.className = this.options.className;
    
    const title = document.createElement('h3');
    title.textContent = this.options.title;
    toc.appendChild(title);
    
    return toc;
  }
  
  createTocList(headings) {
    const list = document.createElement('ol');
    let currentLevel = 1;
    let stack = [list];
    
    headings.forEach(heading => {
      const level = parseInt(heading.tagName.charAt(1));
      const text = heading.textContent;
      const id = heading.id || this.generateId(text);
      
      // Ajuster la profondeur de la liste
      while (level > currentLevel && stack.length > 0) {
        const newList = document.createElement('ol');
        const lastItem = stack[stack.length - 1].lastElementChild;
        if (lastItem) {
          lastItem.appendChild(newList);
          stack.push(newList);
        }
        currentLevel++;
      }
      
      while (level < currentLevel && stack.length > 1) {
        stack.pop();
        currentLevel--;
      }
      
      // Créer l'élément de liste
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${id}`;
      link.textContent = text;
      listItem.appendChild(link);
      
      stack[stack.length - 1].appendChild(listItem);
      currentLevel = level;
    });
    
    return list;
  }
  
  addIdsToHeadings(headings) {
    headings.forEach(heading => {
      if (!heading.id) {
        heading.id = this.generateId(heading.textContent);
      }
    });
  }
  
  generateId(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}

// Utilisation
document.addEventListener('DOMContentLoaded', () => {
  new TableOfContents('.toc-container', {
    headings: 'h2, h3, h4',
    title: 'Sommaire'
  });
});
```

## Fil d'Ariane (Breadcrumb)

### Breadcrumb basique

```html
<nav aria-label="Fil d'Ariane" class="breadcrumb">
  <ol>
    <li><a href="/">Accueil</a></li>
    <li><a href="/produits">Produits</a></li>
    <li><a href="/produits/ordinateurs">Ordinateurs</a></li>
    <li aria-current="page">MacBook Pro</li>
  </ol>
</nav>
```

```css
.breadcrumb {
  margin-bottom: 2rem;
  padding: 1rem 0;
  border-bottom: 1px solid #e9ecef;
}

.breadcrumb ol {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
}

.breadcrumb li {
  display: flex;
  align-items: center;
}

.breadcrumb li:not(:last-child)::after {
  content: '/';
  margin: 0 0.5rem;
  color: #6c757d;
}

.breadcrumb a {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb a:hover {
  color: #0056b3;
  text-decoration: underline;
}

.breadcrumb [aria-current="page"] {
  color: #6c757d;
  font-weight: 500;
}
```

### Breadcrumb avec icônes

```html
<nav aria-label="Fil d'Ariane" class="breadcrumb-icons">
  <ol>
    <li>
      <a href="/">
        <svg class="icon">
          <use href="#icon-home"></use>
        </svg>
        Accueil
      </a>
    </li>
    <li>
      <a href="/blog">
        <svg class="icon">
          <use href="#icon-blog"></use>
        </svg>
        Blog
      </a>
    </li>
    <li aria-current="page">
      <svg class="icon">
        <use href="#icon-article"></use>
      </svg>
      Article
    </li>
  </ol>
</nav>
```

```css
.breadcrumb-icons .icon {
  width: 16px;
  height: 16px;
  margin-right: 0.5rem;
  vertical-align: text-bottom;
}

.breadcrumb-icons li:not(:last-child)::after {
  content: '→';
  margin: 0 0.75rem;
  color: #6c757d;
  font-weight: bold;
}
```

## Navigation par progression

### Indicateur de progression

```html
<div class="progress-navigation">
  <div class="progress-bar">
    <div class="progress-fill" style="width: 40%"></div>
  </div>
  
  <nav class="step-navigation">
    <ol>
      <li class="completed">
        <a href="#step-1">Informations</a>
      </li>
      <li class="current">
        <span>Validation</span>
      </li>
      <li class="upcoming">
        <span>Paiement</span>
      </li>
      <li class="upcoming">
        <span>Confirmation</span>
      </li>
    </ol>
  </nav>
</div>
```

```css
.progress-navigation {
  margin: 2rem 0;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #007bff, #0056b3);
  transition: width 0.3s ease;
}

.step-navigation ol {
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  padding: 0;
}

.step-navigation li {
  flex: 1;
  text-align: center;
  position: relative;
}

.step-navigation li:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -50%;
  width: 100%;
  height: 2px;
  background: #e9ecef;
  transform: translateY(-50%);
  z-index: -1;
}

.step-navigation .completed::after {
  background: #007bff;
}

.step-navigation a,
.step-navigation span {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background: #f8f9fa;
  color: #6c757d;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.step-navigation .completed a {
  background: #007bff;
  color: white;
}

.step-navigation .current span {
  background: #ffc107;
  color: #212529;
}

.step-navigation .completed a:hover {
  background: #0056b3;
}
```

## Navigation contextuelle

### Menu contextuel flottant

```html
<div class="floating-nav" id="floatingNav">
  <nav>
    <a href="#introduction" title="Introduction">
      <span class="nav-number">1</span>
    </a>
    <a href="#development" title="Développement">
      <span class="nav-number">2</span>
    </a>
    <a href="#testing" title="Tests">
      <span class="nav-number">3</span>
    </a>
    <a href="#deployment" title="Déploiement">
      <span class="nav-number">4</span>
    </a>
  </nav>
  
  <div class="reading-progress">
    <div class="progress-ring">
      <svg width="40" height="40">
        <circle cx="20" cy="20" r="18" stroke="#e9ecef" stroke-width="2" fill="none"/>
        <circle cx="20" cy="20" r="18" stroke="#007bff" stroke-width="2" fill="none" 
                stroke-dasharray="113" stroke-dashoffset="113" class="progress-circle"/>
      </svg>
      <span class="progress-text">0%</span>
    </div>
  </div>
</div>
```

```css
.floating-nav {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  padding: 1rem;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.floating-nav.visible {
  opacity: 1;
  visibility: visible;
}

.floating-nav nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.floating-nav a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f8f9fa;
  color: #6c757d;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
}

.floating-nav a:hover {
  background: #007bff;
  color: white;
  transform: scale(1.1);
}

.floating-nav a.active {
  background: #007bff;
  color: white;
}

.nav-number {
  font-size: 0.8rem;
  font-weight: bold;
}

.reading-progress {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-ring {
  position: relative;
}

.progress-circle {
  transform: rotate(-90deg);
  transform-origin: center;
  transition: stroke-dashoffset 0.3s ease;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.7rem;
  font-weight: bold;
  color: #007bff;
}
```

```javascript
// Contrôle de la navigation flottante
class FloatingNavigation {
  constructor() {
    this.nav = document.getElementById('floatingNav');
    this.links = this.nav.querySelectorAll('a');
    this.progressCircle = this.nav.querySelector('.progress-circle');
    this.progressText = this.nav.querySelector('.progress-text');
    this.sections = document.querySelectorAll('section[id]');
    
    this.init();
  }
  
  init() {
    this.handleScroll();
    this.addEventListeners();
  }
  
  addEventListeners() {
    window.addEventListener('scroll', () => this.handleScroll());
    
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        this.scrollToSection(targetId);
      });
    });
  }
  
  handleScroll() {
    const scrollTop = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / documentHeight) * 100;
    
    // Afficher/masquer la navigation
    if (scrollTop > 300) {
      this.nav.classList.add('visible');
    } else {
      this.nav.classList.remove('visible');
    }
    
    // Mettre à jour la progression
    this.updateProgress(scrollPercent);
    
    // Mettre à jour les liens actifs
    this.updateActiveLink();
  }
  
  updateProgress(percent) {
    const circumference = 2 * Math.PI * 18;
    const offset = circumference - (percent / 100) * circumference;
    
    this.progressCircle.style.strokeDashoffset = offset;
    this.progressText.textContent = Math.round(percent) + '%';
  }
  
  updateActiveLink() {
    let current = '';
    
    this.sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop && 
          window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    this.links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  scrollToSection(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    
    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: 'smooth'
    });
  }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  new FloatingNavigation();
});
```

## Navigation par clavier

### Support de la navigation clavier

```javascript
// Navigation par clavier pour les ancres
class KeyboardNavigation {
  constructor() {
    this.currentIndex = 0;
    this.sections = Array.from(document.querySelectorAll('section[id]'));
    this.init();
  }
  
  init() {
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
    
    // Rendre les sections focusables
    this.sections.forEach((section, index) => {
      section.setAttribute('tabindex', '-1');
      section.setAttribute('data-index', index);
    });
  }
  
  handleKeydown(e) {
    // Navigation avec Page Up/Page Down
    if (e.key === 'PageDown' && e.ctrlKey) {
      e.preventDefault();
      this.navigateToNext();
    } else if (e.key === 'PageUp' && e.ctrlKey) {
      e.preventDefault();
      this.navigateToPrevious();
    }
    
    // Navigation avec les flèches + Ctrl
    if (e.ctrlKey && e.key === 'ArrowDown') {
      e.preventDefault();
      this.navigateToNext();
    } else if (e.ctrlKey && e.key === 'ArrowUp') {
      e.preventDefault();
      this.navigateToPrevious();
    }
  }
  
  navigateToNext() {
    if (this.currentIndex < this.sections.length - 1) {
      this.currentIndex++;
      this.focusSection(this.currentIndex);
    }
  }
  
  navigateToPrevious() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.focusSection(this.currentIndex);
    }
  }
  
  focusSection(index) {
    const section = this.sections[index];
    section.focus();
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  new KeyboardNavigation();
});
```

## Exemple pratique complet

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Navigation Interne Avancée</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #333;
    }
    
    /* Navigation principale fixe */
    .main-nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      z-index: 1000;
      padding: 1rem 0;
    }
    
    .main-nav ul {
      display: flex;
      justify-content: center;
      list-style: none;
      gap: 2rem;
    }
    
    .main-nav a {
      color: #333;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: all 0.3s ease;
    }
    
    .main-nav a:hover,
    .main-nav a.active {
      background: #007bff;
      color: white;
    }
    
    /* Contenu principal */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: 2rem;
      padding: 100px 2rem 2rem;
    }
    
    /* Table des matières */
    .toc {
      position: sticky;
      top: 120px;
      height: fit-content;
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 8px;
      border-left: 4px solid #007bff;
    }
    
    .toc h3 {
      margin-bottom: 1rem;
      color: #333;
    }
    
    .toc ol {
      list-style: none;
    }
    
    .toc li {
      margin-bottom: 0.5rem;
    }
    
    .toc a {
      color: #007bff;
      text-decoration: none;
      display: block;
      padding: 0.25rem 0;
      transition: all 0.3s ease;
    }
    
    .toc a:hover {
      color: #0056b3;
      padding-left: 1rem;
    }
    
    .toc a.active {
      font-weight: bold;
      color: #0056b3;
      border-left: 2px solid #007bff;
      padding-left: 0.5rem;
    }
    
    /* Contenu */
    .content {
      max-width: none;
    }
    
    /* Sections */
    .section {
      scroll-margin-top: 100px;
      margin-bottom: 4rem;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }
    
    .section h2 {
      color: #333;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #007bff;
    }
    
    .section p {
      margin-bottom: 1rem;
      color: #666;
    }
    
    /* Scroll fluide */
    html {
      scroll-behavior: smooth;
    }
    
    /* Navigation suivant/précédent */
    .nav-pagination {
      display: flex;
      justify-content: space-between;
      margin: 2rem 0;
      padding: 1rem 0;
      border-top: 1px solid #e9ecef;
    }
    
    .nav-pagination a {
      display: flex;
      align-items: center;
      color: #007bff;
      text-decoration: none;
      padding: 1rem;
      border: 1px solid #007bff;
      border-radius: 4px;
      transition: all 0.3s ease;
    }
    
    .nav-pagination a:hover {
      background: #007bff;
      color: white;
    }
    
    .nav-pagination .prev::before {
      content: '← ';
      margin-right: 0.5rem;
    }
    
    .nav-pagination .next::after {
      content: ' →';
      margin-left: 0.5rem;
    }
    
    /* Indicateur de progression */
    .reading-progress {
      position: fixed;
      top: 80px;
      left: 0;
      width: 100%;
      height: 4px;
      background: #e9ecef;
      z-index: 999;
    }
    
    .reading-progress-bar {
      height: 100%;
      background: linear-gradient(90deg, #007bff, #0056b3);
      width: 0%;
      transition: width 0.1s ease;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .container {
        grid-template-columns: 1fr;
        padding: 80px 1rem 1rem;
      }
      
      .toc {
        position: static;
        margin-bottom: 2rem;
      }
      
      .main-nav ul {
        flex-wrap: wrap;
        gap: 1rem;
      }
    }
  </style>
</head>
<body>
  <!-- Indicateur de progression de lecture -->
  <div class="reading-progress">
    <div class="reading-progress-bar" id="progressBar"></div>
  </div>
  
  <!-- Navigation principale -->
  <nav class="main-nav">
    <ul>
      <li><a href="#introduction" class="nav-link">Introduction</a></li>
      <li><a href="#concepts" class="nav-link">Concepts</a></li>
      <li><a href="#implementation" class="nav-link">Implémentation</a></li>
      <li><a href="#exemples" class="nav-link">Exemples</a></li>
      <li><a href="#conclusion" class="nav-link">Conclusion</a></li>
    </ul>
  </nav>
  
  <div class="container">
    <!-- Table des matières -->
    <aside class="toc">
      <h3>Table des matières</h3>
      <ol>
        <li><a href="#introduction" class="toc-link">Introduction</a></li>
        <li><a href="#concepts" class="toc-link">Concepts de base</a>
          <ol>
            <li><a href="#ancres" class="toc-link">Ancres</a></li>
            <li><a href="#scroll-fluide" class="toc-link">Scroll fluide</a></li>
          </ol>
        </li>
        <li><a href="#implementation" class="toc-link">Implémentation</a></li>
        <li><a href="#exemples" class="toc-link">Exemples pratiques</a></li>
        <li><a href="#conclusion" class="toc-link">Conclusion</a></li>
      </ol>
    </aside>
    
    <!-- Contenu principal -->
    <main class="content">
      <section id="introduction" class="section">
        <h2>Introduction</h2>
        <p>La navigation interne est un élément crucial de l'expérience utilisateur sur le web. Elle permet aux visiteurs de se déplacer facilement au sein d'une page ou d'un site web, améliorant ainsi la lisibilité et l'accessibilité du contenu.</p>
        <p>Dans ce guide, nous explorerons les différentes techniques pour créer une navigation interne efficace, depuis les ancres de base jusqu'aux systèmes de navigation avancés avec JavaScript.</p>
      </section>
      
      <section id="concepts" class="section">
        <h2>Concepts de base</h2>
        <p>Avant de plonger dans l'implémentation, il est important de comprendre les concepts fondamentaux de la navigation interne.</p>
        
        <h3 id="ancres">Ancres</h3>
        <p>Les ancres permettent de créer des liens vers des sections spécifiques d'une page. Elles utilisent l'attribut <code>id</code> pour identifier les éléments cibles.</p>
        
        <h3 id="scroll-fluide">Scroll fluide</h3>
        <p>Le défilement fluide améliore l'expérience utilisateur en créant une transition douce lors de la navigation vers une section spécifique.</p>
      </section>
      
      <section id="implementation" class="section">
        <h2>Implémentation</h2>
        <p>L'implémentation d'une navigation interne efficace nécessite une combinaison de HTML sémantique, de CSS pour le style et éventuellement de JavaScript pour les fonctionnalités avancées.</p>
        <p>Les techniques modernes incluent l'utilisation de <code>scroll-behavior: smooth</code> en CSS et des API JavaScript pour un contrôle plus fin.</p>
      </section>
      
      <section id="exemples" class="section">
        <h2>Exemples pratiques</h2>
        <p>Cette section présente des exemples concrets d'implémentation de navigation interne, depuis les cas d'usage simples jusqu'aux solutions complexes avec indicateurs de progression.</p>
        <p>Chaque exemple est accompagné de code commenté et d'explications détaillées pour faciliter la compréhension et l'adaptation.</p>
      </section>
      
      <section id="conclusion" class="section">
        <h2>Conclusion</h2>
        <p>La navigation interne bien conçue améliore significativement l'expérience utilisateur et l'accessibilité d'un site web. En combinant les techniques présentées dans ce guide, vous pourrez créer des systèmes de navigation internes robustes et ergonomiques.</p>
        <p>N'oubliez pas de tester votre navigation sur différents appareils et de prendre en compte les besoins d'accessibilité pour offrir une expérience optimale à tous les utilisateurs.</p>
      </section>
      
      <!-- Navigation pagination -->
      <nav class="nav-pagination">
        <a href="#" class="prev">Article précédent</a>
        <a href="#" class="next">Article suivant</a>
      </nav>
    </main>
  </div>
  
  <script>
    // Gestion de la navigation active
    class NavigationManager {
      constructor() {
        this.navLinks = document.querySelectorAll('.nav-link, .toc-link');
        this.sections = document.querySelectorAll('.section');
        this.progressBar = document.getElementById('progressBar');
        
        this.init();
      }
      
      init() {
        this.handleScroll();
        this.addEventListeners();
      }
      
      addEventListeners() {
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Smooth scroll pour tous les liens d'ancre
        this.navLinks.forEach(link => {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            this.scrollToSection(targetId);
          });
        });
      }
      
      handleScroll() {
        this.updateProgress();
        this.updateActiveLinks();
      }
      
      updateProgress() {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        
        this.progressBar.style.width = scrollPercent + '%';
      }
      
      updateActiveLinks() {
        let current = '';
        
        this.sections.forEach(section => {
          const sectionTop = section.offsetTop - 150;
          const sectionHeight = section.clientHeight;
          
          if (window.pageYOffset >= sectionTop && 
              window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
          }
        });
        
        this.navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
          }
        });
      }
      
      scrollToSection(targetId) {
        const target = document.getElementById(targetId);
        if (!target) return;
        
        window.scrollTo({
          top: target.offsetTop - 120,
          behavior: 'smooth'
        });
      }
    }
    
    // Initialisation
    document.addEventListener('DOMContentLoaded', () => {
      new NavigationManager();
    });
  </script>
</body>
</html>
```

## Bonnes pratiques

### ✅ Accessibilité
- Utiliser `aria-label` pour les navigations
- Fournir des équivalents textuels pour les icônes
- Supporter la navigation au clavier
- Respecter l'ordre de tabulation logique

### ✅ Performance
- Utiliser `scroll-behavior: smooth` en CSS quand possible
- Implémenter le lazy loading pour les longues pages
- Optimiser les animations avec `requestAnimationFrame`
- Éviter les recalculs DOM fréquents

### ✅ UX/UI
- Fournir des indicateurs visuels clairs
- Maintenir la cohérence dans le design
- Prévoir des fallbacks pour JavaScript désactivé
- Tester sur différentes tailles d'écran

### ✅ SEO
- Utiliser des URLs descriptives avec des fragments
- Structurer le contenu avec des headings appropriés
- Implémenter des breadcrumbs pour les sites complexes
- Optimiser les temps de chargement

## Résumé

La navigation interne améliore significativement l'expérience utilisateur en facilitant l'exploration du contenu. Les techniques modernes permettent de créer des systèmes de navigation fluides, accessibles et performants qui guident efficacement les utilisateurs à travers votre contenu.

