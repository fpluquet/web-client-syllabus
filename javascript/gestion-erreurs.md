# 10.3 Gestion d'Erreurs

## Introduction à la Gestion d'Erreurs en JavaScript

La gestion d'erreurs constitue l'un des aspects les plus critiques du développement JavaScript moderne, particulièrement dans un environnement asynchrone où les applications interagissent avec des APIs externes, manipulent des données utilisateur imprévisibles, et doivent maintenir une expérience utilisateur fluide même en cas de problème.

Une stratégie de gestion d'erreurs bien conçue transforme les échecs potentiels en opportunités d'améliorer l'expérience utilisateur, de collecter des informations de diagnostic précieuses, et de maintenir la stabilité de l'application. Cette approche proactive permet de distinguer les applications professionnelles des prototypes fragiles.

Dans le contexte du développement web moderne, la gestion d'erreurs ne se limite plus à de simples blocs try-catch. Elle englobe la gestion des erreurs asynchrones, la récupération gracieuse, la communication d'erreurs à l'utilisateur, et la mise en place de systèmes de monitoring pour améliorer continuellement la robustesse de l'application.

## Mécanismes Fondamentaux de Gestion d'Erreurs

### Try-Catch-Finally : La Base Solide

Le mécanisme try-catch-finally constitue la fondation de la gestion d'erreurs synchrones en JavaScript. Sa maîtrise approfondie est essentielle pour construire des applications robustes :

```javascript
class ErrorHandler {
    static handleOperation(operation, context = 'Opération inconnue') {
        try {
            console.log(`Début de l'opération: ${context}`);
            const result = operation();
            console.log(`Succès de l'opération: ${context}`);
            return { success: true, data: result, error: null };
        } catch (error) {
            console.error(`Erreur dans l'opération ${context}:`, error);
            return { success: false, data: null, error: this.processError(error) };
        } finally {
            console.log(`Fin de l'opération: ${context}`);
            // Nettoyage des ressources, logging, etc.
        }
    }

    static processError(error) {
        return {
            name: error.name,
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
            type: this.categorizeError(error)
        };
    }

    static categorizeError(error) {
        if (error instanceof TypeError) return 'TYPE_ERROR';
        if (error instanceof ReferenceError) return 'REFERENCE_ERROR';
        if (error instanceof SyntaxError) return 'SYNTAX_ERROR';
        if (error instanceof RangeError) return 'RANGE_ERROR';
        if (error.name === 'ValidationError') return 'VALIDATION_ERROR';
        if (error.name === 'NetworkError') return 'NETWORK_ERROR';
        return 'UNKNOWN_ERROR';
    }
}

// Exemple d'utilisation avancée
function dangerousDataProcessing(data) {
    if (!data) {
        throw new Error('Données manquantes');
    }
    
    if (typeof data !== 'object') {
        throw new TypeError('Les données doivent être un objet');
    }
    
    if (!data.id || !data.name) {
        throw new ValidationError('ID et nom requis');
    }
    
    // Traitement complexe qui peut échouer
    const result = data.name.toUpperCase().split('').reverse().join('');
    
    if (result.length === 0) {
        throw new Error('Résultat de traitement vide');
    }
    
    return result;
}

// Utilisation sécurisée
const testData = { id: 1, name: 'Alice' };
const result = ErrorHandler.handleOperation(
    () => dangerousDataProcessing(testData),
    'Traitement des données utilisateur'
);

if (result.success) {
    console.log('Données traitées:', result.data);
} else {
    console.error('Échec du traitement:', result.error);
}
```

### Erreurs Personnalisées : Créer des Types d'Erreurs Significatives

La création d'erreurs personnalisées permet une gestion plus précise et une meilleure communication des problèmes :

```javascript
// Hiérarchie d'erreurs personnalisées
class BaseError extends Error {
    constructor(message, code = 'UNKNOWN_ERROR', details = {}) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.details = details;
        this.timestamp = new Date().toISOString();
        
        // Maintenir la stack trace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toJSON() {
        return {
            name: this.name,
            message: this.message,
            code: this.code,
            details: this.details,
            timestamp: this.timestamp,
            stack: this.stack
        };
    }
}

class ValidationError extends BaseError {
    constructor(field, value, rule, message = null) {
        const defaultMessage = `Validation échouée pour le champ '${field}' avec la valeur '${value}' (règle: ${rule})`;
        super(message || defaultMessage, 'VALIDATION_ERROR', {
            field,
            value,
            rule,
            severity: 'warning'
        });
    }
}

class NetworkError extends BaseError {
    constructor(url, status, statusText, response = null) {
        super(`Erreur réseau: ${status} ${statusText} pour ${url}`, 'NETWORK_ERROR', {
            url,
            status,
            statusText,
            response,
            severity: 'error',
            retryable: status >= 500 || status === 429
        });
    }
}

class BusinessLogicError extends BaseError {
    constructor(operation, reason, context = {}) {
        super(`Erreur métier: ${reason} lors de l'opération '${operation}'`, 'BUSINESS_LOGIC_ERROR', {
            operation,
            reason,
            context,
            severity: 'error'
        });
    }
}

class ConfigurationError extends BaseError {
    constructor(setting, expected, actual) {
        super(`Configuration incorrecte: ${setting} attendu '${expected}', reçu '${actual}'`, 'CONFIGURATION_ERROR', {
            setting,
            expected,
            actual,
            severity: 'critical'
        });
    }
}

// Système de validation avancé utilisant les erreurs personnalisées
class AdvancedValidator {
    static validateUser(userData) {
        const errors = [];
        
        // Validation de l'email
        if (!userData.email) {
            errors.push(new ValidationError('email', userData.email, 'required'));
        } else if (!this.isValidEmail(userData.email)) {
            errors.push(new ValidationError('email', userData.email, 'format'));
        }
        
        // Validation de l'âge
        if (!userData.age) {
            errors.push(new ValidationError('age', userData.age, 'required'));
        } else if (userData.age < 18 || userData.age > 120) {
            errors.push(new ValidationError('age', userData.age, 'range', 'L\'âge doit être entre 18 et 120 ans'));
        }
        
        // Validation du mot de passe
        if (!userData.password) {
            errors.push(new ValidationError('password', '', 'required'));
        } else if (userData.password.length < 8) {
            errors.push(new ValidationError('password', userData.password, 'minLength', 'Le mot de passe doit contenir au moins 8 caractères'));
        }
        
        if (errors.length > 0) {
            throw new BusinessLogicError('validation utilisateur', 'Données utilisateur invalides', { errors });
        }
        
        return true;
    }
    
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
```

## Gestion d'Erreurs Asynchrones

### Promises et Async/Await : Gestion Moderne des Erreurs

La gestion d'erreurs dans le code asynchrone nécessite des approches spécifiques pour maintenir la robustesse de l'application :

```javascript
class AsyncErrorHandler {
    // Wrapper générique pour les opérations asynchrones
    static async safeAsync(operation, context = 'Opération asynchrone', options = {}) {
        const {
            retries = 0,
            retryDelay = 1000,
            timeout = 10000,
            fallback = null
        } = options;
        
        let lastError = null;
        
        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                console.log(`Tentative ${attempt + 1}/${retries + 1} pour: ${context}`);
                
                // Ajouter un timeout si spécifié
                const result = timeout > 0 
                    ? await this.withTimeout(operation(), timeout)
                    : await operation();
                
                console.log(`Succès pour: ${context}`);
                return { success: true, data: result, error: null, attempt: attempt + 1 };
                
            } catch (error) {
                lastError = error;
                console.warn(`Échec tentative ${attempt + 1} pour ${context}:`, error.message);
                
                // Si ce n'est pas la dernière tentative, attendre avant de réessayer
                if (attempt < retries) {
                    await this.delay(retryDelay * Math.pow(2, attempt)); // Backoff exponentiel
                }
            }
        }
        
        // Toutes les tentatives ont échoué
        console.error(`Échec définitif pour: ${context}`, lastError);
        
        // Utiliser le fallback si disponible
        if (fallback !== null) {
            console.log(`Utilisation du fallback pour: ${context}`);
            return { success: true, data: fallback, error: lastError, fallbackUsed: true };
        }
        
        return { success: false, data: null, error: lastError, attempts: retries + 1 };
    }
    
    static withTimeout(promise, timeoutMs) {
        return Promise.race([
            promise,
            new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new Error(`Timeout de ${timeoutMs}ms dépassé`));
                }, timeoutMs);
            })
        ]);
    }
    
    static delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Gestion d'erreurs pour les appels API
    static async apiCall(url, options = {}) {
        const {
            method = 'GET',
            body = null,
            headers = {},
            retries = 2,
            timeout = 5000
        } = options;
        
        const operation = async () => {
            const response = await fetch(url, {
                method,
                body: body ? JSON.stringify(body) : null,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                }
            });
            
            if (!response.ok) {
                const errorData = await response.text();
                throw new NetworkError(url, response.status, response.statusText, errorData);
            }
            
            return await response.json();
        };
        
        return this.safeAsync(operation, `API ${method} ${url}`, {
            retries,
            timeout,
            retryDelay: 1000
        });
    }
    
    // Gestion d'erreurs pour les opérations en lot
    static async batchOperations(operations, options = {}) {
        const {
            concurrency = 3,
            stopOnFirstError = false,
            collectErrors = true
        } = options;
        
        const results = [];
        const errors = [];
        
        // Traitement par lots avec concurrence limitée
        for (let i = 0; i < operations.length; i += concurrency) {
            const batch = operations.slice(i, i + concurrency);
            
            const batchPromises = batch.map(async (operation, index) => {
                try {
                    const result = await operation();
                    return { success: true, data: result, index: i + index };
                } catch (error) {
                    const errorInfo = { success: false, error, index: i + index };
                    
                    if (collectErrors) {
                        errors.push(errorInfo);
                    }
                    
                    if (stopOnFirstError) {
                        throw error;
                    }
                    
                    return errorInfo;
                }
            });
            
            try {
                const batchResults = await Promise.all(batchPromises);
                results.push(...batchResults);
            } catch (error) {
                if (stopOnFirstError) {
                    throw error;
                }
            }
        }
        
        return {
            results,
            errors,
            successCount: results.filter(r => r.success).length,
            errorCount: errors.length,
            totalCount: operations.length
        };
    }
}

// Exemple d'utilisation pour une application de gestion de données
class DataManager {
    constructor() {
        this.apiBase = 'https://api.exemple.com';
        this.cache = new Map();
    }
    
    async fetchUser(userId) {
        // Vérifier le cache d'abord
        const cacheKey = `user_${userId}`;
        if (this.cache.has(cacheKey)) {
            return { success: true, data: this.cache.get(cacheKey), fromCache: true };
        }
        
        const result = await AsyncErrorHandler.apiCall(`${this.apiBase}/users/${userId}`, {
            retries: 3,
            timeout: 5000
        });
        
        if (result.success) {
            this.cache.set(cacheKey, result.data);
        }
        
        return result;
    }
    
    async saveUser(userData) {
        try {
            // Validation avant sauvegarde
            AdvancedValidator.validateUser(userData);
            
            const result = await AsyncErrorHandler.apiCall(`${this.apiBase}/users`, {
                method: 'POST',
                body: userData,
                retries: 2,
                timeout: 10000
            });
            
            if (result.success) {
                // Invalider le cache
                this.cache.delete(`user_${userData.id}`);
                console.log('Utilisateur sauvegardé avec succès');
            }
            
            return result;
            
        } catch (error) {
            if (error instanceof BusinessLogicError) {
                console.error('Erreur de validation:', error.details.errors);
                return { success: false, error, validationErrors: error.details.errors };
            }
            
            throw error;
        }
    }
    
    async batchUpdateUsers(users) {
        const updateOperations = users.map(user => () => this.saveUser(user));
        
        return AsyncErrorHandler.batchOperations(updateOperations, {
            concurrency: 3,
            collectErrors: true,
            stopOnFirstError: false
        });
    }
}
```

### Gestion d'Événements d'Erreur Globaux

```javascript
class GlobalErrorManager {
    constructor() {
        this.errorHandlers = new Map();
        this.errorLog = [];
        this.setupGlobalHandlers();
    }
    
    setupGlobalHandlers() {
        // Erreurs JavaScript non capturées
        window.addEventListener('error', (event) => {
            this.handleGlobalError({
                type: 'javascript',
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error,
                timestamp: new Date().toISOString()
            });
        });
        
        // Promesses rejetées non gérées
        window.addEventListener('unhandledrejection', (event) => {
            this.handleGlobalError({
                type: 'unhandled_promise',
                reason: event.reason,
                timestamp: new Date().toISOString()
            });
            
            // Empêcher l'affichage de l'erreur dans la console
            event.preventDefault();
        });
        
        // Erreurs de ressources (images, scripts, etc.)
        window.addEventListener('error', (event) => {
            if (event.target !== window) {
                this.handleGlobalError({
                    type: 'resource',
                    element: event.target.tagName,
                    source: event.target.src || event.target.href,
                    timestamp: new Date().toISOString()
                });
            }
        }, true);
    }
    
    handleGlobalError(errorInfo) {
        console.error('Erreur globale détectée:', errorInfo);
        
        // Ajouter au log d'erreurs
        this.errorLog.push(errorInfo);
        
        // Limiter la taille du log
        if (this.errorLog.length > 100) {
            this.errorLog.shift();
        }
        
        // Notifier les gestionnaires enregistrés
        const handler = this.errorHandlers.get(errorInfo.type);
        if (handler) {
            try {
                handler(errorInfo);
            } catch (handlerError) {
                console.error('Erreur dans le gestionnaire d\'erreur:', handlerError);
            }
        }
        
        // Envoyer au service de monitoring (en production)
        this.reportToMonitoring(errorInfo);
        
        // Afficher une notification à l'utilisateur si nécessaire
        this.showUserNotification(errorInfo);
    }
    
    registerErrorHandler(errorType, handler) {
        this.errorHandlers.set(errorType, handler);
    }
    
    reportToMonitoring(errorInfo) {
        // En développement, on log seulement
        if (process.env.NODE_ENV !== 'production') {
            console.log('Rapport d\'erreur (dev):', errorInfo);
            return;
        }
        
        // En production, envoyer à un service de monitoring
        AsyncErrorHandler.apiCall('/api/errors', {
            method: 'POST',
            body: {
                ...errorInfo,
                userAgent: navigator.userAgent,
                url: window.location.href,
                userId: this.getCurrentUserId(),
                sessionId: this.getSessionId()
            },
            retries: 1,
            timeout: 3000
        }).catch(error => {
            console.warn('Impossible d\'envoyer le rapport d\'erreur:', error);
        });
    }
    
    showUserNotification(errorInfo) {
        // Ne pas surcharger l'utilisateur avec des notifications techniques
        if (errorInfo.type === 'resource') {
            return; // Les erreurs de ressources sont généralement transparentes
        }
        
        const userMessage = this.getUserFriendlyMessage(errorInfo);
        this.displayNotification(userMessage, 'error');
    }
    
    getUserFriendlyMessage(errorInfo) {
        switch (errorInfo.type) {
            case 'javascript':
                return 'Une erreur inattendue s\'est produite. Veuillez rafraîchir la page.';
            case 'unhandled_promise':
                return 'Une opération a échoué. Veuillez réessayer.';
            case 'network':
                return 'Problème de connexion. Vérifiez votre réseau.';
            default:
                return 'Une erreur s\'est produite. Notre équipe en a été informée.';
        }
    }
    
    displayNotification(message, type = 'info') {
        // Implémentation d'un système de notification simple
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-suppression après 5 secondes
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
        
        // Fermeture manuelle
        notification.querySelector('.notification-close').addEventListener('click', () => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        });
    }
    
    getCurrentUserId() {
        // Récupérer l'ID utilisateur depuis le contexte de l'application
        return localStorage.getItem('userId') || 'anonymous';
    }
    
    getSessionId() {
        // Générer ou récupérer un ID de session
        let sessionId = sessionStorage.getItem('sessionId');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('sessionId', sessionId);
        }
        return sessionId;
    }
    
    getErrorSummary() {
        return {
            totalErrors: this.errorLog.length,
            errorsByType: this.groupErrorsByType(),
            recentErrors: this.errorLog.slice(-10),
            timestamp: new Date().toISOString()
        };
    }
    
    groupErrorsByType() {
        return this.errorLog.reduce((acc, error) => {
            acc[error.type] = (acc[error.type] || 0) + 1;
            return acc;
        }, {});
    }
}

// Initialisation du gestionnaire global
const globalErrorManager = new GlobalErrorManager();

// Exemples de gestionnaires personnalisés
globalErrorManager.registerErrorHandler('network', (errorInfo) => {
    console.log('Gestion spéciale des erreurs réseau:', errorInfo);
    // Peut-être réessayer automatiquement ou activer un mode hors ligne
});

globalErrorManager.registerErrorHandler('unhandled_promise', (errorInfo) => {
    console.log('Promesse rejetée non gérée:', errorInfo);
    // Collecter des informations supplémentaires pour le debug
});
```

## Patterns de Récupération d'Erreurs

### Circuit Breaker Pattern

```javascript
class CircuitBreaker {
    constructor(name, options = {}) {
        this.name = name;
        this.failureThreshold = options.failureThreshold || 5;
        this.resetTimeout = options.resetTimeout || 30000; // 30 secondes
        this.monitoringWindow = options.monitoringWindow || 60000; // 1 minute
        
        this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
        this.failures = [];
        this.lastFailureTime = null;
        this.nextAttemptTime = null;
        
        this.onStateChange = options.onStateChange || (() => {});
        this.fallback = options.fallback || null;
    }
    
    async execute(operation) {
        if (this.state === 'OPEN') {
            if (Date.now() < this.nextAttemptTime) {
                throw new Error(`Circuit breaker ${this.name} est ouvert. Réessayer dans ${Math.ceil((this.nextAttemptTime - Date.now()) / 1000)} secondes.`);
            }
            
            // Passer en mode HALF_OPEN pour tester
            this.state = 'HALF_OPEN';
            this.onStateChange('HALF_OPEN');
        }
        
        try {
            const result = await operation();
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            
            if (this.fallback) {
                console.log(`Utilisation du fallback pour ${this.name}`);
                return await this.fallback();
            }
            
            throw error;
        }
    }
    
    onSuccess() {
        this.failures = [];
        
        if (this.state === 'HALF_OPEN') {
            this.state = 'CLOSED';
            this.onStateChange('CLOSED');
            console.log(`Circuit breaker ${this.name} fermé après succès`);
        }
    }
    
    onFailure() {
        const now = Date.now();
        this.failures.push(now);
        this.lastFailureTime = now;
        
        // Nettoyer les anciennes erreurs en dehors de la fenêtre de monitoring
        this.failures = this.failures.filter(time => now - time < this.monitoringWindow);
        
        if (this.failures.length >= this.failureThreshold) {
            this.state = 'OPEN';
            this.nextAttemptTime = now + this.resetTimeout;
            this.onStateChange('OPEN');
            console.log(`Circuit breaker ${this.name} ouvert après ${this.failures.length} échecs`);
        }
    }
    
    getStatus() {
        return {
            name: this.name,
            state: this.state,
            failureCount: this.failures.length,
            lastFailureTime: this.lastFailureTime,
            nextAttemptTime: this.nextAttemptTime
        };
    }
}

// Exemple d'utilisation avec une API
class ResilientApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.circuitBreakers = new Map();
    }
    
    getCircuitBreaker(endpoint) {
        if (!this.circuitBreakers.has(endpoint)) {
            this.circuitBreakers.set(endpoint, new CircuitBreaker(`API_${endpoint}`, {
                failureThreshold: 3,
                resetTimeout: 20000,
                fallback: () => this.getFallbackData(endpoint),
                onStateChange: (state) => {
                    console.log(`Circuit breaker pour ${endpoint} changé vers: ${state}`);
                }
            }));
        }
        
        return this.circuitBreakers.get(endpoint);
    }
    
    async get(endpoint) {
        const circuitBreaker = this.getCircuitBreaker(endpoint);
        
        return circuitBreaker.execute(async () => {
            const response = await fetch(`${this.baseUrl}${endpoint}`);
            
            if (!response.ok) {
                throw new NetworkError(endpoint, response.status, response.statusText);
            }
            
            return response.json();
        });
    }
    
    getFallbackData(endpoint) {
        // Données de fallback ou cache local
        const fallbackData = {
            '/users': { users: [], message: 'Données en cache' },
            '/products': { products: [], message: 'Catalogue indisponible' }
        };
        
        return Promise.resolve(fallbackData[endpoint] || { message: 'Service temporairement indisponible' });
    }
}
```

## Interface Utilisateur pour la Gestion d'Erreurs

### Système de Notification d'Erreurs Avancé

```javascript
class ErrorNotificationSystem {
    constructor() {
        this.notifications = [];
        this.container = this.createContainer();
        this.templates = this.initializeTemplates();
    }
    
    createContainer() {
        const container = document.createElement('div');
        container.id = 'error-notifications';
        container.className = 'notification-container';
        document.body.appendChild(container);
        return container;
    }
    
    initializeTemplates() {
        return {
            error: {
                icon: '⚠️',
                className: 'notification-error',
                autoClose: false,
                actions: ['retry', 'dismiss']
            },
            warning: {
                icon: '⚡',
                className: 'notification-warning',
                autoClose: true,
                duration: 5000,
                actions: ['dismiss']
            },
            info: {
                icon: 'ℹ️',
                className: 'notification-info',
                autoClose: true,
                duration: 3000,
                actions: ['dismiss']
            },
            success: {
                icon: '✅',
                className: 'notification-success',
                autoClose: true,
                duration: 2000,
                actions: ['dismiss']
            }
        };
    }
    
    show(message, type = 'error', options = {}) {
        const notification = this.createNotification(message, type, options);
        this.notifications.push(notification);
        this.container.appendChild(notification.element);
        
        // Animation d'entrée
        requestAnimationFrame(() => {
            notification.element.classList.add('notification-show');
        });
        
        // Auto-fermeture si configurée
        const template = this.templates[type];
        if (template.autoClose && !options.persistent) {
            setTimeout(() => {
                this.dismiss(notification.id);
            }, template.duration || 3000);
        }
        
        return notification.id;
    }
    
    createNotification(message, type, options) {
        const template = this.templates[type];
        const id = 'notification_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        
        const element = document.createElement('div');
        element.className = `notification ${template.className}`;
        element.dataset.notificationId = id;
        
        element.innerHTML = `
            <div class="notification-content">
                <div class="notification-header">
                    <span class="notification-icon">${template.icon}</span>
                    <span class="notification-title">${options.title || this.getDefaultTitle(type)}</span>
                    <div class="notification-actions">
                        ${this.createActionButtons(template.actions, id, options)}
                    </div>
                </div>
                <div class="notification-message">${message}</div>
                ${options.details ? `<div class="notification-details">${options.details}</div>` : ''}
            </div>
        `;
        
        this.setupNotificationEvents(element, id, options);
        
        return {
            id,
            element,
            type,
            message,
            timestamp: new Date().toISOString()
        };
    }
    
    createActionButtons(actions, notificationId, options) {
        return actions.map(action => {
            switch (action) {
                case 'retry':
                    return `<button class="notification-btn notification-retry" data-action="retry">Réessayer</button>`;
                case 'dismiss':
                    return `<button class="notification-btn notification-dismiss" data-action="dismiss">&times;</button>`;
                case 'details':
                    return `<button class="notification-btn notification-details" data-action="details">Détails</button>`;
                default:
                    return '';
            }
        }).join('');
    }
    
    setupNotificationEvents(element, id, options) {
        element.addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            
            switch (action) {
                case 'dismiss':
                    this.dismiss(id);
                    break;
                case 'retry':
                    if (options.onRetry) {
                        options.onRetry();
                    }
                    this.dismiss(id);
                    break;
                case 'details':
                    this.showDetails(id, options.details);
                    break;
            }
        });
    }
    
    dismiss(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (!notification) return;
        
        notification.element.classList.add('notification-hide');
        
        setTimeout(() => {
            if (notification.element.parentNode) {
                notification.element.parentNode.removeChild(notification.element);
            }
            
            this.notifications = this.notifications.filter(n => n.id !== notificationId);
        }, 300);
    }
    
    dismissAll() {
        this.notifications.forEach(notification => {
            this.dismiss(notification.id);
        });
    }
    
    getDefaultTitle(type) {
        const titles = {
            error: 'Erreur',
            warning: 'Attention',
            info: 'Information',
            success: 'Succès'
        };
        return titles[type] || 'Notification';
    }
    
    showErrorFromException(error, context = '') {
        let message = error.message || 'Une erreur inattendue s\'est produite';
        let details = null;
        let retryable = false;
        
        if (error instanceof NetworkError) {
            message = 'Problème de connexion réseau';
            details = `${error.details.status} - ${error.details.statusText}`;
            retryable = error.details.retryable;
        } else if (error instanceof ValidationError) {
            message = 'Données invalides';
            details = error.message;
        } else if (error instanceof BusinessLogicError) {
            message = error.details.reason;
            details = context;
        }
        
        const options = {
            title: 'Erreur' + (context ? ` - ${context}` : ''),
            details,
            persistent: !retryable,
            onRetry: retryable ? () => window.location.reload() : null
        };
        
        return this.show(message, 'error', options);
    }
}

// Initialisation globale
const errorNotificationSystem = new ErrorNotificationSystem();

// Intégration avec le gestionnaire d'erreurs global
globalErrorManager.registerErrorHandler('javascript', (errorInfo) => {
    errorNotificationSystem.showErrorFromException(
        new Error(errorInfo.message), 
        'Erreur JavaScript'
    );
});

globalErrorManager.registerErrorHandler('network', (errorInfo) => {
    errorNotificationSystem.show(
        'Problème de connexion détecté',
        'warning',
        {
            title: 'Réseau',
            onRetry: () => window.location.reload()
        }
    );
});
```

## Styles CSS pour le Système de Notifications

```css
/* Styles pour le système de notifications d'erreurs */
.notification-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    pointer-events: none;
}

.notification {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    margin-bottom: 10px;
    max-width: 400px;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: auto;
    border-left: 4px solid #ccc;
}

.notification.notification-show {
    opacity: 1;
    transform: translateX(0);
}

.notification.notification-hide {
    opacity: 0;
    transform: translateX(100%);
}

.notification-error {
    border-left-color: #dc3545;
}

.notification-warning {
    border-left-color: #ffc107;
}

.notification-info {
    border-left-color: #17a2b8;
}

.notification-success {
    border-left-color: #28a745;
}

.notification-content {
    padding: 16px;
}

.notification-header {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}

.notification-icon {
    font-size: 18px;
    margin-right: 8px;
}

.notification-title {
    font-weight: 600;
    flex: 1;
    color: #333;
}

.notification-actions {
    display: flex;
    gap: 8px;
}

.notification-btn {
    padding: 4px 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    transition: all 0.2s ease;
}

.notification-retry {
    background: #007bff;
    color: white;
}

.notification-retry:hover {
    background: #0056b3;
}

.notification-dismiss {
    background: #6c757d;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.notification-dismiss:hover {
    background: #545b62;
}

.notification-message {
    color: #666;
    line-height: 1.4;
    margin-bottom: 8px;
}

.notification-details {
    font-size: 12px;
    color: #999;
    background: #f8f9fa;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #e9ecef;
    font-family: monospace;
}

/* Responsive */
@media (max-width: 768px) {
    .notification-container {
        top: 10px;
        right: 10px;
        left: 10px;
    }
    
    .notification {
        max-width: none;
    }
}
```

## Conclusion et Bonnes Pratiques

La gestion d'erreurs en JavaScript moderne dépasse largement les simples blocs try-catch. Elle constitue un système complexe qui englobe la prévention, la détection, la récupération et la communication d'erreurs. Une stratégie bien conçue transforme les échecs potentiels en opportunités d'améliorer l'expérience utilisateur et la robustesse de l'application.

### Principes Fondamentaux à Retenir :

1. **Fail Fast, Fail Safe** : Détectez les erreurs rapidement mais assurez-vous que l'application reste fonctionnelle
2. **Graceful Degradation** : Prévoyez des alternatives lorsque les fonctionnalités principales échouent
3. **User-Centric Error Handling** : Adaptez les messages d'erreur au niveau de compréhension de l'utilisateur
4. **Monitoring et Apprentissage** : Collectez les données d'erreur pour améliorer continuellement la robustesse

La maîtrise de ces techniques distingue les développeurs professionnels et contribue significativement à la qualité et la fiabilité des applications web modernes.
