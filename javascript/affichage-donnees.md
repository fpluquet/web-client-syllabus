# 10.4 Affichage de Données

## Introduction à l'Affichage Dynamique de Données

L'affichage dynamique de données constitue l'interface cruciale entre les informations brutes et l'expérience utilisateur. Dans le développement web moderne, cette discipline dépasse la simple présentation pour englober la transformation intelligente, la mise en forme adaptative, et l'interaction intuitive avec des ensembles de données complexes.

La maîtrise de l'affichage de données transforme des collections d'informations statiques en interfaces vivantes et engageantes. Cette approche implique non seulement la présentation visuelle, mais aussi la structuration logique, la performance d'affichage, et l'adaptation aux différents contextes d'utilisation et tailles d'écran.

L'évolution des besoins utilisateur et la croissance exponentielle des volumes de données ont poussé le développement vers des solutions sophistiquées : virtualisation pour les grandes listes, rendu conditionnel pour l'optimisation, templates dynamiques pour la flexibilité, et systèmes de filtrage avancés pour la navigation dans l'information.

## Templates et Rendu Dynamique

### Système de Templates Avancé

La création d'un système de templates robuste permet de séparer clairement la logique métier de la présentation, facilitant la maintenance et l'évolution des interfaces :

```javascript
class TemplateEngine {
    constructor() {
        this.templates = new Map();
        this.partials = new Map();
        this.filters = new Map();
        this.cache = new Map();
        
        this.initializeDefaultFilters();
    }
    
    // Enregistrement d'un template
    registerTemplate(name, templateString) {
        this.templates.set(name, this.compileTemplate(templateString));
        console.log(`Template '${name}' enregistré`);
    }
    
    // Enregistrement d'un partial (template réutilisable)
    registerPartial(name, templateString) {
        this.partials.set(name, this.compileTemplate(templateString));
        console.log(`Partial '${name}' enregistré`);
    }
    
    // Enregistrement d'un filtre personnalisé
    registerFilter(name, filterFunction) {
        this.filters.set(name, filterFunction);
        console.log(`Filtre '${name}' enregistré`);
    }
    
    // Compilation d'un template en fonction
    compileTemplate(templateString) {
        // Échappement des caractères spéciaux pour la sécurité
        const escapedTemplate = templateString
            .replace(/\{\{&\s*([^}]+)\s*\}\}/g, '${this.escapeHtml($1)}') // Échappé
            .replace(/\{\{\{([^}]+)\}\}\}/g, '${$1}') // Non échappé (HTML brut)
            .replace(/\{\{([^}]+)\}\}/g, '${this.escapeHtml($1)}') // Échappé par défaut
            .replace(/\{\{#if\s+([^}]+)\}\}/g, '${$1 ? `')
            .replace(/\{\{\/if\}\}/g, '` : ``}')
            .replace(/\{\{#each\s+([^}]+)\s+as\s+([^}]+)\}\}/g, '${$1.map($2 => `')
            .replace(/\{\{\/each\}\}/g, '`).join(``)}')
            .replace(/\{\{>\s*([^}]+)\s*\}\}/g, '${this.renderPartial("$1", data)}');
        
        // Création d'une fonction de rendu
        return new Function('data', 'helpers', `
            const escapeHtml = this.escapeHtml.bind(this);
            const renderPartial = this.renderPartial.bind(this);
            const applyFilter = this.applyFilter.bind(this);
            
            with(data) {
                return \`${escapedTemplate}\`;
            }
        `);
    }
    
    // Rendu d'un template avec données
    render(templateName, data = {}, useCache = true) {
        const cacheKey = `${templateName}_${JSON.stringify(data)}`;
        
        if (useCache && this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        const template = this.templates.get(templateName);
        if (!template) {
            throw new Error(`Template '${templateName}' non trouvé`);
        }
        
        try {
            const result = template.call(this, data, this.filters);
            
            if (useCache) {
                this.cache.set(cacheKey, result);
            }
            
            return result;
        } catch (error) {
            console.error(`Erreur lors du rendu du template '${templateName}':`, error);
            return `<div class="template-error">Erreur de rendu: ${error.message}</div>`;
        }
    }
    
    // Rendu d'un partial
    renderPartial(partialName, data = {}) {
        const partial = this.partials.get(partialName);
        if (!partial) {
            console.warn(`Partial '${partialName}' non trouvé`);
            return '';
        }
        
        return partial.call(this, data, this.filters);
    }
    
    // Application d'un filtre
    applyFilter(filterName, value, ...args) {
        const filter = this.filters.get(filterName);
        if (!filter) {
            console.warn(`Filtre '${filterName}' non trouvé`);
            return value;
        }
        
        return filter(value, ...args);
    }
    
    // Échappement HTML pour la sécurité
    escapeHtml(text) {
        if (text == null) return '';
        
        const div = document.createElement('div');
        div.textContent = text.toString();
        return div.innerHTML;
    }
    
    // Initialisation des filtres par défaut
    initializeDefaultFilters() {
        this.registerFilter('uppercase', (value) => value.toString().toUpperCase());
        this.registerFilter('lowercase', (value) => value.toString().toLowerCase());
        this.registerFilter('capitalize', (value) => 
            value.toString().charAt(0).toUpperCase() + value.toString().slice(1)
        );
        
        this.registerFilter('truncate', (value, length = 100) => {
            const str = value.toString();
            return str.length <= length ? str : str.substr(0, length) + '...';
        });
        
        this.registerFilter('date', (value, format = 'fr-FR') => {
            const date = new Date(value);
            return isNaN(date.getTime()) ? value : date.toLocaleDateString(format);
        });
        
        this.registerFilter('currency', (value, currency = 'EUR') => {
            return new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: currency
            }).format(parseFloat(value) || 0);
        });
        
        this.registerFilter('json', (value) => JSON.stringify(value, null, 2));
        
        this.registerFilter('default', (value, defaultValue = '') => 
            value == null || value === '' ? defaultValue : value
        );
    }
    
    // Nettoyage du cache
    clearCache() {
        this.cache.clear();
        console.log('Cache des templates nettoyé');
    }
    
    // Statistiques des templates
    getStats() {
        return {
            templates: this.templates.size,
            partials: this.partials.size,
            filters: this.filters.size,
            cacheSize: this.cache.size
        };
    }
}

// Exemple d'utilisation avec des templates complexes
class DataDisplayManager {
    constructor() {
        this.templateEngine = new TemplateEngine();
        this.setupTemplates();
        this.data = [];
        this.filteredData = [];
        this.currentView = 'card';
    }
    
    setupTemplates() {
        // Template pour une carte produit
        this.templateEngine.registerTemplate('productCard', `
            <div class="product-card" data-product-id="{{id}}">
                <div class="product-image">
                    <img src="{{image}}" alt="{{name}}" loading="lazy">
                    {{#if discount}}
                        <div class="discount-badge">-{{discount}}%</div>
                    {{/if}}
                </div>
                <div class="product-info">
                    <h3 class="product-name">{{name | truncate:50}}</h3>
                    <p class="product-description">{{description | truncate:100}}</p>
                    <div class="product-price">
                        {{#if originalPrice}}
                            <span class="original-price">{{originalPrice | currency}}</span>
                        {{/if}}
                        <span class="current-price">{{price | currency}}</span>
                    </div>
                    <div class="product-meta">
                        <span class="product-category">{{category | capitalize}}</span>
                        <span class="product-rating">⭐ {{rating | default:'N/A'}}</span>
                    </div>
                    {{> productActions}}
                </div>
            </div>
        `);
        
        // Template pour la vue liste
        this.templateEngine.registerTemplate('productList', `
            <div class="product-list">
                {{#each products as product}}
                    <div class="product-row" data-product-id="{{product.id}}">
                        <div class="product-thumbnail">
                            <img src="{{product.image}}" alt="{{product.name}}">
                        </div>
                        <div class="product-details">
                            <h4>{{product.name}}</h4>
                            <p>{{product.description | truncate:80}}</p>
                        </div>
                        <div class="product-price-column">
                            {{product.price | currency}}
                        </div>
                        <div class="product-actions-column">
                            {{> productActions}}
                        </div>
                    </div>
                {{/each}}
            </div>
        `);
        
        // Template pour la vue grille
        this.templateEngine.registerTemplate('productGrid', `
            <div class="product-grid">
                {{#each products as product}}
                    {{> productCard}}
                {{/each}}
            </div>
        `);
        
        // Partial pour les actions produit
        this.templateEngine.registerPartial('productActions', `
            <div class="product-actions">
                <button class="btn btn-primary add-to-cart" data-product-id="{{id}}">
                    Ajouter au panier
                </button>
                <button class="btn btn-secondary product-details" data-product-id="{{id}}">
                    Détails
                </button>
                {{#if inWishlist}}
                    <button class="btn btn-outline wishlist-remove" data-product-id="{{id}}">
                        ❤️ Supprimer
                    </button>
                {{else}}
                    <button class="btn btn-outline wishlist-add" data-product-id="{{id}}">
                        🤍 Ajouter
                    </button>
                {{/if}}
            </div>
        `);
        
        // Template pour les états vides
        this.templateEngine.registerTemplate('emptyState', `
            <div class="empty-state">
                <div class="empty-icon">{{icon | default:'📄'}}</div>
                <h3 class="empty-title">{{title | default:'Aucun résultat'}}</h3>
                <p class="empty-message">{{message | default:'Aucune donnée à afficher'}}</p>
                {{#if action}}
                    <button class="btn btn-primary" onclick="{{action}}">
                        {{actionText | default:'Réessayer'}}
                    </button>
                {{/if}}
            </div>
        `);
        
        // Template pour le chargement
        this.templateEngine.registerTemplate('loading', `
            <div class="loading-state">
                <div class="loading-spinner"></div>
                <p class="loading-message">{{message | default:'Chargement en cours...'}}</p>
            </div>
        `);
    }
    
    // Affichage des données avec template spécifique
    displayData(data, containerSelector, viewType = 'grid') {
        const container = document.querySelector(containerSelector);
        if (!container) {
            console.error(`Conteneur ${containerSelector} non trouvé`);
            return;
        }
        
        // Affichage de l'état de chargement
        container.innerHTML = this.templateEngine.render('loading', {
            message: 'Préparation des données...'
        });
        
        // Simulation d'un traitement asynchrone
        setTimeout(() => {
            if (!data || data.length === 0) {
                container.innerHTML = this.templateEngine.render('emptyState', {
                    icon: '🛒',
                    title: 'Aucun produit trouvé',
                    message: 'Essayez de modifier vos critères de recherche',
                    action: 'this.resetFilters()',
                    actionText: 'Réinitialiser les filtres'
                });
                return;
            }
            
            let templateName;
            switch (viewType) {
                case 'list':
                    templateName = 'productList';
                    break;
                case 'grid':
                    templateName = 'productGrid';
                    break;
                default:
                    templateName = 'productGrid';
            }
            
            const rendered = this.templateEngine.render(templateName, { products: data });
            container.innerHTML = rendered;
            
            // Configuration des événements après rendu
            this.setupProductEvents(container);
            
            console.log(`Affichage de ${data.length} produits en vue ${viewType}`);
        }, 500);
    }
    
    setupProductEvents(container) {
        // Délégation d'événements pour les actions produit
        container.addEventListener('click', (e) => {
            const target = e.target;
            const productId = target.dataset.productId;
            
            if (target.classList.contains('add-to-cart')) {
                this.addToCart(productId);
            } else if (target.classList.contains('product-details')) {
                this.showProductDetails(productId);
            } else if (target.classList.contains('wishlist-add')) {
                this.addToWishlist(productId);
            } else if (target.classList.contains('wishlist-remove')) {
                this.removeFromWishlist(productId);
            }
        });
    }
    
    addToCart(productId) {
        console.log(`Ajout au panier: ${productId}`);
        // Logique d'ajout au panier
        this.showNotification('Produit ajouté au panier', 'success');
    }
    
    showProductDetails(productId) {
        console.log(`Affichage détails: ${productId}`);
        // Affichage des détails du produit
    }
    
    addToWishlist(productId) {
        console.log(`Ajout à la wishlist: ${productId}`);
        // Mise à jour de l'affichage
        const button = document.querySelector(`[data-product-id="${productId}"].wishlist-add`);
        if (button) {
            button.classList.remove('wishlist-add');
            button.classList.add('wishlist-remove');
            button.innerHTML = '❤️ Supprimer';
        }
    }
    
    removeFromWishlist(productId) {
        console.log(`Suppression de la wishlist: ${productId}`);
        const button = document.querySelector(`[data-product-id="${productId}"].wishlist-remove`);
        if (button) {
            button.classList.remove('wishlist-remove');
            button.classList.add('wishlist-add');
            button.innerHTML = '🤍 Ajouter';
        }
    }
    
    showNotification(message, type = 'info') {
        // Intégration avec le système de notifications
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
}
```

## Virtualisation et Performance

### Liste Virtualisée pour Grandes Quantités de Données

```javascript
class VirtualizedList {
    constructor(container, options = {}) {
        this.container = container;
        this.items = [];
        this.itemHeight = options.itemHeight || 60;
        this.containerHeight = options.containerHeight || 400;
        this.buffer = options.buffer || 5; // Éléments additionnels pour la fluidité
        this.renderFunction = options.renderFunction || this.defaultRenderFunction;
        
        this.scrollTop = 0;
        this.startIndex = 0;
        this.endIndex = 0;
        this.visibleCount = 0;
        
        this.setupContainer();
        this.setupEventListeners();
    }
    
    setupContainer() {
        this.container.style.height = `${this.containerHeight}px`;
        this.container.style.overflow = 'auto';
        this.container.style.position = 'relative';
        
        // Conteneur pour la hauteur totale (scrollbar)
        this.spacer = document.createElement('div');
        this.spacer.style.position = 'absolute';
        this.spacer.style.top = '0';
        this.spacer.style.left = '0';
        this.spacer.style.right = '0';
        this.spacer.style.pointerEvents = 'none';
        
        // Conteneur pour les éléments visibles
        this.viewport = document.createElement('div');
        this.viewport.style.position = 'relative';
        this.viewport.style.height = '100%';
        
        this.container.appendChild(this.spacer);
        this.container.appendChild(this.viewport);
    }
    
    setupEventListeners() {
        this.container.addEventListener('scroll', (e) => {
            this.scrollTop = e.target.scrollTop;
            this.updateVisibleItems();
        });
        
        // Optimisation avec requestAnimationFrame
        let ticking = false;
        this.container.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateVisibleItems();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    setItems(items) {
        this.items = items;
        this.spacer.style.height = `${items.length * this.itemHeight}px`;
        this.calculateVisibleRange();
        this.renderVisibleItems();
    }
    
    calculateVisibleRange() {
        this.visibleCount = Math.ceil(this.containerHeight / this.itemHeight);
        this.startIndex = Math.max(0, Math.floor(this.scrollTop / this.itemHeight) - this.buffer);
        this.endIndex = Math.min(this.items.length - 1, this.startIndex + this.visibleCount + 2 * this.buffer);
    }
    
    updateVisibleItems() {
        const newStartIndex = Math.max(0, Math.floor(this.scrollTop / this.itemHeight) - this.buffer);
        const newEndIndex = Math.min(this.items.length - 1, newStartIndex + this.visibleCount + 2 * this.buffer);
        
        if (newStartIndex !== this.startIndex || newEndIndex !== this.endIndex) {
            this.startIndex = newStartIndex;
            this.endIndex = newEndIndex;
            this.renderVisibleItems();
        }
    }
    
    renderVisibleItems() {
        // Nettoyer le viewport
        this.viewport.innerHTML = '';
        
        // Créer un conteneur positionné pour les éléments visibles
        const itemsContainer = document.createElement('div');
        itemsContainer.style.position = 'absolute';
        itemsContainer.style.top = `${this.startIndex * this.itemHeight}px`;
        itemsContainer.style.left = '0';
        itemsContainer.style.right = '0';
        
        // Rendre les éléments visibles
        for (let i = this.startIndex; i <= this.endIndex && i < this.items.length; i++) {
            const itemElement = this.renderFunction(this.items[i], i);
            itemElement.style.height = `${this.itemHeight}px`;
            itemElement.style.position = 'relative';
            itemElement.dataset.index = i;
            itemsContainer.appendChild(itemElement);
        }
        
        this.viewport.appendChild(itemsContainer);
        
        console.log(`Rendu des éléments ${this.startIndex} à ${this.endIndex}`);
    }
    
    defaultRenderFunction(item, index) {
        const element = document.createElement('div');
        element.className = 'virtual-list-item';
        element.innerHTML = `
            <div class="item-content">
                <span class="item-index">#${index}</span>
                <span class="item-text">${JSON.stringify(item)}</span>
            </div>
        `;
        return element;
    }
    
    scrollToIndex(index) {
        const targetScrollTop = index * this.itemHeight;
        this.container.scrollTop = targetScrollTop;
    }
    
    getVisibleRange() {
        return {
            start: this.startIndex,
            end: this.endIndex,
            total: this.items.length
        };
    }
}

// Exemple d'utilisation avec une grande liste de données
class BigDataDisplay {
    constructor() {
        this.data = this.generateLargeDataset(10000);
        this.setupVirtualizedList();
    }
    
    generateLargeDataset(count) {
        const data = [];
        const categories = ['Électronique', 'Vêtements', 'Maison', 'Sports', 'Livres'];
        const names = ['Produit A', 'Produit B', 'Produit C', 'Article X', 'Item Y'];
        
        for (let i = 0; i < count; i++) {
            data.push({
                id: i + 1,
                name: `${names[i % names.length]} ${i + 1}`,
                category: categories[i % categories.length],
                price: Math.floor(Math.random() * 1000) + 10,
                description: `Description détaillée du produit ${i + 1}`,
                inStock: Math.random() > 0.2,
                rating: Math.round((Math.random() * 4 + 1) * 10) / 10
            });
        }
        
        return data;
    }
    
    setupVirtualizedList() {
        const container = document.getElementById('bigDataContainer');
        
        this.virtualList = new VirtualizedList(container, {
            itemHeight: 80,
            containerHeight: 600,
            buffer: 10,
            renderFunction: this.renderBigDataItem.bind(this)
        });
        
        this.virtualList.setItems(this.data);
        
        // Ajouter des contrôles de navigation
        this.setupNavigationControls();
    }
    
    renderBigDataItem(item, index) {
        const element = document.createElement('div');
        element.className = 'big-data-item';
        element.innerHTML = `
            <div class="item-main">
                <div class="item-header">
                    <h4 class="item-title">${item.name}</h4>
                    <span class="item-price">${item.price}€</span>
                </div>
                <div class="item-details">
                    <span class="item-category">${item.category}</span>
                    <span class="item-rating">⭐ ${item.rating}</span>
                    <span class="item-stock ${item.inStock ? 'in-stock' : 'out-of-stock'}">
                        ${item.inStock ? 'En stock' : 'Rupture'}
                    </span>
                </div>
                <p class="item-description">${item.description}</p>
            </div>
            <div class="item-actions">
                <button class="btn btn-sm btn-primary" onclick="this.selectItem(${index})">
                    Sélectionner
                </button>
            </div>
        `;
        
        return element;
    }
    
    setupNavigationControls() {
        const controls = document.createElement('div');
        controls.className = 'virtual-list-controls';
        controls.innerHTML = `
            <div class="control-group">
                <label>Aller à l'élément :</label>
                <input type="number" id="scrollToIndex" min="1" max="${this.data.length}" placeholder="Index">
                <button onclick="this.scrollToIndex()">Aller</button>
            </div>
            <div class="control-group">
                <span id="visibleRange">Éléments visibles: -</span>
            </div>
        `;
        
        this.virtualList.container.parentNode.insertBefore(controls, this.virtualList.container);
        
        // Mise à jour de l'affichage de la plage visible
        this.updateVisibleRangeDisplay();
        this.virtualList.container.addEventListener('scroll', () => {
            this.updateVisibleRangeDisplay();
        });
    }
    
    scrollToIndex() {
        const input = document.getElementById('scrollToIndex');
        const index = parseInt(input.value) - 1; // Conversion en index base 0
        
        if (index >= 0 && index < this.data.length) {
            this.virtualList.scrollToIndex(index);
        }
    }
    
    updateVisibleRangeDisplay() {
        const range = this.virtualList.getVisibleRange();
        const display = document.getElementById('visibleRange');
        if (display) {
            display.textContent = `Éléments visibles: ${range.start + 1} - ${range.end + 1} sur ${range.total}`;
        }
    }
    
    selectItem(index) {
        console.log('Élément sélectionné:', this.data[index]);
    }
}
```

## Systèmes de Filtrage et de Recherche

### Moteur de Filtrage Avancé

```javascript
class AdvancedFilterEngine {
    constructor(data = []) {
        this.originalData = data;
        this.filteredData = [...data];
        this.filters = new Map();
        this.searchTerms = [];
        this.sortConfig = { field: null, direction: 'asc' };
        
        this.observers = [];
    }
    
    // Enregistrement d'un filtre
    addFilter(name, filterFunction, isActive = true) {
        this.filters.set(name, {
            function: filterFunction,
            active: isActive,
            lastApplied: null
        });
        
        if (isActive) {
            this.applyFilters();
        }
        
        return this;
    }
    
    // Activation/désactivation d'un filtre
    toggleFilter(name, isActive = null) {
        const filter = this.filters.get(name);
        if (filter) {
            filter.active = isActive !== null ? isActive : !filter.active;
            this.applyFilters();
        }
        return this;
    }
    
    // Suppression d'un filtre
    removeFilter(name) {
        this.filters.delete(name);
        this.applyFilters();
        return this;
    }
    
    // Définition de termes de recherche
    setSearchTerms(terms) {
        this.searchTerms = Array.isArray(terms) ? terms : [terms];
        this.applyFilters();
        return this;
    }
    
    // Configuration du tri
    setSorting(field, direction = 'asc') {
        this.sortConfig = { field, direction };
        this.applyFilters();
        return this;
    }
    
    // Application de tous les filtres actifs
    applyFilters() {
        let result = [...this.originalData];
        
        // Application des filtres personnalisés
        this.filters.forEach((filter, name) => {
            if (filter.active) {
                const startTime = performance.now();
                result = result.filter(filter.function);
                filter.lastApplied = performance.now() - startTime;
                console.log(`Filtre ${name} appliqué en ${filter.lastApplied.toFixed(2)}ms`);
            }
        });
        
        // Application de la recherche textuelle
        if (this.searchTerms.length > 0) {
            result = this.applyTextSearch(result);
        }
        
        // Application du tri
        if (this.sortConfig.field) {
            result = this.applySorting(result);
        }
        
        this.filteredData = result;
        this.notifyObservers();
        
        return this;
    }
    
    applyTextSearch(data) {
        return data.filter(item => {
            return this.searchTerms.some(term => {
                const searchTerm = term.toLowerCase();
                return this.searchInObject(item, searchTerm);
            });
        });
    }
    
    searchInObject(obj, searchTerm) {
        if (typeof obj === 'string') {
            return obj.toLowerCase().includes(searchTerm);
        }
        
        if (typeof obj === 'number') {
            return obj.toString().includes(searchTerm);
        }
        
        if (Array.isArray(obj)) {
            return obj.some(item => this.searchInObject(item, searchTerm));
        }
        
        if (typeof obj === 'object' && obj !== null) {
            return Object.values(obj).some(value => this.searchInObject(value, searchTerm));
        }
        
        return false;
    }
    
    applySorting(data) {
        return data.sort((a, b) => {
            const aValue = this.getNestedValue(a, this.sortConfig.field);
            const bValue = this.getNestedValue(b, this.sortConfig.field);
            
            let comparison = 0;
            
            if (aValue < bValue) {
                comparison = -1;
            } else if (aValue > bValue) {
                comparison = 1;
            }
            
            return this.sortConfig.direction === 'desc' ? -comparison : comparison;
        });
    }
    
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current && current[key], obj);
    }
    
    // Enregistrement d'observateurs pour les changements
    subscribe(observer) {
        this.observers.push(observer);
        return () => {
            this.observers = this.observers.filter(obs => obs !== observer);
        };
    }
    
    notifyObservers() {
        this.observers.forEach(observer => {
            try {
                observer(this.filteredData, this.getFilterStats());
            } catch (error) {
                console.error('Erreur dans un observateur de filtre:', error);
            }
        });
    }
    
    // Obtenir les données filtrées
    getData() {
        return this.filteredData;
    }
    
    // Statistiques des filtres
    getFilterStats() {
        return {
            originalCount: this.originalData.length,
            filteredCount: this.filteredData.length,
            activeFilters: Array.from(this.filters.entries())
                .filter(([name, filter]) => filter.active)
                .map(([name, filter]) => ({ name, executionTime: filter.lastApplied })),
            searchTerms: this.searchTerms,
            sortConfig: this.sortConfig
        };
    }
    
    // Réinitialisation de tous les filtres
    reset() {
        this.filters.clear();
        this.searchTerms = [];
        this.sortConfig = { field: null, direction: 'asc' };
        this.filteredData = [...this.originalData];
        this.notifyObservers();
        return this;
    }
    
    // Mise à jour des données source
    updateData(newData) {
        this.originalData = newData;
        this.applyFilters();
        return this;
    }
}

// Interface utilisateur pour le système de filtrage
class FilterUI {
    constructor(filterEngine, container) {
        this.filterEngine = filterEngine;
        this.container = container;
        this.setupUI();
        this.setupEventListeners();
    }
    
    setupUI() {
        this.container.innerHTML = `
            <div class="filter-panel">
                <div class="search-section">
                    <div class="search-group">
                        <input type="text" id="searchInput" placeholder="Rechercher...">
                        <button id="searchBtn">🔍</button>
                        <button id="clearSearchBtn">✕</button>
                    </div>
                </div>
                
                <div class="filters-section">
                    <h4>Filtres</h4>
                    <div id="filterControls">
                        <!-- Contrôles de filtres générés dynamiquement -->
                    </div>
                </div>
                
                <div class="sort-section">
                    <h4>Tri</h4>
                    <select id="sortField">
                        <option value="">Aucun tri</option>
                        <option value="name">Nom</option>
                        <option value="price">Prix</option>
                        <option value="category">Catégorie</option>
                        <option value="rating">Note</option>
                    </select>
                    <select id="sortDirection">
                        <option value="asc">Croissant</option>
                        <option value="desc">Décroissant</option>
                    </select>
                </div>
                
                <div class="filter-stats">
                    <div id="filterStats"></div>
                    <button id="resetFilters">Réinitialiser</button>
                </div>
            </div>
        `;
    }
    
    setupEventListeners() {
        // Recherche
        const searchInput = this.container.querySelector('#searchInput');
        const searchBtn = this.container.querySelector('#searchBtn');
        const clearSearchBtn = this.container.querySelector('#clearSearchBtn');
        
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.filterEngine.setSearchTerms(e.target.value);
            }, 300);
        });
        
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            this.filterEngine.setSearchTerms([]);
        });
        
        // Tri
        const sortField = this.container.querySelector('#sortField');
        const sortDirection = this.container.querySelector('#sortDirection');
        
        [sortField, sortDirection].forEach(element => {
            element.addEventListener('change', () => {
                if (sortField.value) {
                    this.filterEngine.setSorting(sortField.value, sortDirection.value);
                } else {
                    this.filterEngine.setSorting(null);
                }
            });
        });
        
        // Réinitialisation
        this.container.querySelector('#resetFilters').addEventListener('click', () => {
            this.filterEngine.reset();
            this.resetUI();
        });
        
        // Écoute des changements du moteur de filtrage
        this.filterEngine.subscribe((data, stats) => {
            this.updateStats(stats);
        });
    }
    
    addFilterControl(name, type, options = {}) {
        const filterControls = this.container.querySelector('#filterControls');
        const controlGroup = document.createElement('div');
        controlGroup.className = 'filter-control-group';
        
        switch (type) {
            case 'range':
                controlGroup.innerHTML = `
                    <label>${options.label || name}</label>
                    <div class="range-inputs">
                        <input type="number" data-filter="${name}" data-bound="min" 
                               placeholder="Min" min="${options.min || 0}" max="${options.max || 1000}">
                        <span>à</span>
                        <input type="number" data-filter="${name}" data-bound="max" 
                               placeholder="Max" min="${options.min || 0}" max="${options.max || 1000}">
                    </div>
                `;
                break;
                
            case 'checkbox':
                controlGroup.innerHTML = `
                    <div class="checkbox-group">
                        <input type="checkbox" id="filter_${name}" data-filter="${name}">
                        <label for="filter_${name}">${options.label || name}</label>
                    </div>
                `;
                break;
                
            case 'select':
                const optionsHtml = options.options.map(opt => 
                    `<option value="${opt.value}">${opt.label}</option>`
                ).join('');
                
                controlGroup.innerHTML = `
                    <label>${options.label || name}</label>
                    <select data-filter="${name}" multiple>
                        ${optionsHtml}
                    </select>
                `;
                break;
        }
        
        filterControls.appendChild(controlGroup);
        this.setupFilterControlEvents(controlGroup, name, type, options);
    }
    
    setupFilterControlEvents(controlGroup, name, type, options) {
        switch (type) {
            case 'range':
                const inputs = controlGroup.querySelectorAll('input');
                inputs.forEach(input => {
                    input.addEventListener('input', () => {
                        const min = controlGroup.querySelector('[data-bound="min"]').value;
                        const max = controlGroup.querySelector('[data-bound="max"]').value;
                        
                        this.filterEngine.addFilter(name, (item) => {
                            const value = this.filterEngine.getNestedValue(item, options.field || name);
                            const numValue = parseFloat(value);
                            
                            if (isNaN(numValue)) return true;
                            
                            const minValid = !min || numValue >= parseFloat(min);
                            const maxValid = !max || numValue <= parseFloat(max);
                            
                            return minValid && maxValid;
                        });
                    });
                });
                break;
                
            case 'checkbox':
                const checkbox = controlGroup.querySelector('input[type="checkbox"]');
                checkbox.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        this.filterEngine.addFilter(name, options.filterFunction);
                    } else {
                        this.filterEngine.removeFilter(name);
                    }
                });
                break;
                
            case 'select':
                const select = controlGroup.querySelector('select');
                select.addEventListener('change', (e) => {
                    const selectedValues = Array.from(e.target.selectedOptions).map(opt => opt.value);
                    
                    if (selectedValues.length > 0) {
                        this.filterEngine.addFilter(name, (item) => {
                            const value = this.filterEngine.getNestedValue(item, options.field || name);
                            return selectedValues.includes(value.toString());
                        });
                    } else {
                        this.filterEngine.removeFilter(name);
                    }
                });
                break;
        }
    }
    
    updateStats(stats) {
        const statsContainer = this.container.querySelector('#filterStats');
        statsContainer.innerHTML = `
            <div class="stats-item">
                <strong>${stats.filteredCount}</strong> / ${stats.originalCount} éléments
            </div>
            <div class="stats-item">
                ${stats.activeFilters.length} filtres actifs
            </div>
            ${stats.searchTerms.length > 0 ? 
                `<div class="stats-item">Recherche: "${stats.searchTerms.join(', ')}"</div>` : 
                ''
            }
        `;
    }
    
    resetUI() {
        this.container.querySelector('#searchInput').value = '';
        this.container.querySelector('#sortField').value = '';
        this.container.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        this.container.querySelectorAll('input[type="number"]').forEach(input => input.value = '');
        this.container.querySelectorAll('select[multiple]').forEach(select => {
            Array.from(select.options).forEach(option => option.selected = false);
        });
    }
}
```

## Exemple d'Utilisation Complète

```javascript
// Mise en place d'un système complet d'affichage de données
document.addEventListener('DOMContentLoaded', () => {
    // Données d'exemple
    const sampleData = [
        {
            id: 1,
            name: 'Smartphone Premium',
            category: 'Électronique',
            price: 899,
            rating: 4.5,
            inStock: true,
            image: 'smartphone.jpg',
            description: 'Un smartphone haut de gamme avec toutes les fonctionnalités modernes'
        },
        // ... plus de données
    ];
    
    // Configuration du moteur de templates
    const displayManager = new DataDisplayManager();
    
    // Configuration du moteur de filtrage
    const filterEngine = new AdvancedFilterEngine(sampleData);
    
    // Configuration de l'interface de filtrage
    const filterUI = new FilterUI(filterEngine, document.getElementById('filterPanel'));
    
    // Ajout de contrôles de filtrage spécifiques
    filterUI.addFilterControl('priceRange', 'range', {
        label: 'Plage de prix',
        field: 'price',
        min: 0,
        max: 2000
    });
    
    filterUI.addFilterControl('inStock', 'checkbox', {
        label: 'En stock uniquement',
        filterFunction: (item) => item.inStock
    });
    
    filterUI.addFilterControl('category', 'select', {
        label: 'Catégorie',
        field: 'category',
        options: [
            { value: 'Électronique', label: 'Électronique' },
            { value: 'Vêtements', label: 'Vêtements' },
            { value: 'Maison', label: 'Maison' }
        ]
    });
    
    // Liaison entre le filtrage et l'affichage
    filterEngine.subscribe((filteredData) => {
        displayManager.displayData(filteredData, '#productDisplay', 'grid');
    });
    
    // Affichage initial
    displayManager.displayData(sampleData, '#productDisplay', 'grid');
    
    // Configuration des contrôles de vue
    document.querySelectorAll('.view-toggle').forEach(button => {
        button.addEventListener('click', (e) => {
            const viewType = e.target.dataset.view;
            displayManager.displayData(filterEngine.getData(), '#productDisplay', viewType);
        });
    });
});
```

## Conclusion

L'affichage dynamique de données représente un domaine complexe qui nécessite la maîtrise de multiples techniques : templating, virtualisation, filtrage, et optimisation des performances. La combinaison de ces approches permet de créer des interfaces utilisateur riches et performantes, capables de gérer efficacement de grandes quantités d'informations tout en offrant une expérience utilisateur fluide et intuitive.

La clé du succès réside dans l'équilibre entre fonctionnalités avancées et simplicité d'utilisation, performance et flexibilité, tout en maintenant un code maintenable et extensible.
