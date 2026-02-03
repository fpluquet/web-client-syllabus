# 11.2 Persistance des Données côté Client

## Introduction à la Persistance des Données

La persistance des données côté client représente l'une des évolutions les plus significatives du développement web moderne. Contrairement aux premières applications web où toutes les données étaient systématiquement perdues lors de la fermeture du navigateur, les technologies actuelles nous permettent de conserver des informations localement, créant ainsi des expériences utilisateur beaucoup plus riches et continues.

Cette capacité de stockage local transforme fondamentalement l'interaction utilisateur : préférences personnalisées qui persistent entre les sessions, brouillons automatiquement sauvegardés, cache intelligent pour l'accès hors ligne, et synchronisation optimisée avec les serveurs. Ces fonctionnalités sont devenues essentielles dans les applications web modernes.

L'écosystème de stockage côté client offre plusieurs solutions adaptées à différents besoins : localStorage pour les données simples et persistantes, sessionStorage pour les données temporaires, IndexedDB pour les structures complexes, et les cookies pour les échanges avec le serveur. Chaque technologie a ses spécificités, ses avantages et ses cas d'usage optimaux.

## LocalStorage : Stockage Simple et Persistant

### Comprendre LocalStorage

LocalStorage constitue la solution la plus accessible et la plus utilisée pour le stockage côté client. Cette API simple mais puissante permet de stocker des paires clé-valeur qui persistent même après la fermeture du navigateur, jusqu'à ce qu'elles soient explicitement supprimées ou que l'utilisateur vide les données de son navigateur.

La simplicité de localStorage masque une architecture sophistiquée. Chaque domaine dispose de son propre espace de stockage isolé (généralement 5-10 MB), garantissant la sécurité et évitant les conflits entre applications. Cette isolation suit la politique de même origine (Same-Origin Policy), assurant qu'une application ne peut accéder qu'à ses propres données.

```javascript
class LocalStorageManager {
    constructor(namespace = 'app') {
        this.namespace = namespace;
        this.separator = '_';
        
        // Vérification de la disponibilité
        this.isAvailable = this.checkAvailability();
        
        if (!this.isAvailable) {
            console.warn('LocalStorage n\'est pas disponible dans ce contexte');
        }
    }

    checkAvailability() {
        try {
            const test = '__localStorage_test__';
            localStorage.setItem(test, 'test');
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    }

    // Génération des clés avec namespace
    generateKey(key) {
        return `${this.namespace}${this.separator}${key}`;
    }

    // Stockage avec gestion d'erreurs et métadonnées
    setItem(key, value, options = {}) {
        if (!this.isAvailable) {
            console.warn('Tentative de stockage alors que localStorage n\'est pas disponible');
            return false;
        }

        try {
            const storageKey = this.generateKey(key);
            
            // Enrichissement des données avec métadonnées
            const dataToStore = {
                value: value,
                timestamp: Date.now(),
                type: typeof value,
                version: options.version || '1.0',
                expiry: options.expiry ? Date.now() + options.expiry : null
            };

            localStorage.setItem(storageKey, JSON.stringify(dataToStore));
            
            console.log(`Données stockées avec succès: ${key}`);
            return true;
            
        } catch (error) {
            console.error('Erreur lors du stockage:', error);
            
            // Gestion des erreurs spécifiques
            if (error.name === 'QuotaExceededError') {
                console.warn('Quota de stockage dépassé');
                this.handleQuotaExceeded();
            }
            
            return false;
        }
    }

    // Récupération avec validation
    getItem(key, defaultValue = null) {
        if (!this.isAvailable) {
            return defaultValue;
        }

        try {
            const storageKey = this.generateKey(key);
            const storedData = localStorage.getItem(storageKey);
            
            if (!storedData) {
                return defaultValue;
            }

            const parsedData = JSON.parse(storedData);
            
            // Vérification de l'expiration
            if (parsedData.expiry && Date.now() > parsedData.expiry) {
                this.removeItem(key);
                console.log(`Données expirées supprimées: ${key}`);
                return defaultValue;
            }

            return parsedData.value;
            
        } catch (error) {
            console.error('Erreur lors de la récupération:', error);
            return defaultValue;
        }
    }

    // Suppression sécurisée
    removeItem(key) {
        if (!this.isAvailable) {
            return false;
        }

        try {
            const storageKey = this.generateKey(key);
            localStorage.removeItem(storageKey);
            console.log(`Données supprimées: ${key}`);
            return true;
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            return false;
        }
    }

    // Gestion avancée des données
    updateItem(key, updateFunction) {
        const currentValue = this.getItem(key);
        if (currentValue !== null) {
            const newValue = updateFunction(currentValue);
            return this.setItem(key, newValue);
        }
        return false;
    }

    // Stockage de structures complexes
    setObject(key, object, options = {}) {
        try {
            // Validation de l'objet
            if (typeof object !== 'object' || object === null) {
                throw new Error('La valeur doit être un objet valide');
            }

            // Sérialisation avancée avec gestion des types spéciaux
            const processedObject = this.processObjectForStorage(object);
            return this.setItem(key, processedObject, options);
            
        } catch (error) {
            console.error('Erreur lors du stockage d\'objet:', error);
            return false;
        }
    }

    getObject(key, defaultValue = {}) {
        const value = this.getItem(key, defaultValue);
        return this.processObjectFromStorage(value);
    }

    processObjectForStorage(obj) {
        return JSON.parse(JSON.stringify(obj, (key, value) => {
            // Gestion des types spéciaux
            if (value instanceof Date) {
                return { __type: 'Date', value: value.toISOString() };
            }
            if (value instanceof RegExp) {
                return { __type: 'RegExp', value: value.toString() };
            }
            return value;
        }));
    }

    processObjectFromStorage(obj) {
        if (typeof obj !== 'object') return obj;
        
        return JSON.parse(JSON.stringify(obj), (key, value) => {
            if (value && typeof value === 'object' && value.__type) {
                switch (value.__type) {
                    case 'Date':
                        return new Date(value.value);
                    case 'RegExp':
                        const match = value.value.match(/^\/(.*)\/([gimuy]*)$/);
                        return new RegExp(match[1], match[2]);
                }
            }
            return value;
        });
    }

    // Gestion de la limite de stockage
    handleQuotaExceeded() {
        console.warn('Nettoyage automatique du storage');
        this.cleanup();
    }

    cleanup() {
        const allKeys = this.getAllKeys();
        const keysWithTimestamp = [];

        allKeys.forEach(key => {
            try {
                const data = JSON.parse(localStorage.getItem(key));
                if (data.timestamp) {
                    keysWithTimestamp.push({
                        key: key,
                        timestamp: data.timestamp
                    });
                }
            } catch (e) {
                // Suppression des entrées corrompues
                localStorage.removeItem(key);
            }
        });

        // Suppression des plus anciennes entrées
        keysWithTimestamp
            .sort((a, b) => a.timestamp - b.timestamp)
            .slice(0, Math.floor(keysWithTimestamp.length * 0.2))
            .forEach(item => localStorage.removeItem(item.key));
    }

    // Utilitaires
    getAllKeys() {
        const keys = [];
        const prefix = this.generateKey('');
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(prefix)) {
                keys.push(key.replace(prefix, ''));
            }
        }
        
        return keys;
    }

    clear() {
        const keys = this.getAllKeys();
        keys.forEach(key => this.removeItem(key));
        console.log(`Suppression de ${keys.length} entrées du namespace ${this.namespace}`);
    }

    getStats() {
        const keys = this.getAllKeys();
        let totalSize = 0;
        
        keys.forEach(key => {
            const storageKey = this.generateKey(key);
            const value = localStorage.getItem(storageKey);
            totalSize += new Blob([value]).size;
        });

        return {
            keyCount: keys.length,
            totalSize: totalSize,
            sizeFormatted: this.formatBytes(totalSize),
            availableQuota: this.getAvailableQuota()
        };
    }

    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    async getAvailableQuota() {
        if ('storage' in navigator && 'estimate' in navigator.storage) {
            try {
                const estimate = await navigator.storage.estimate();
                return {
                    used: estimate.usage,
                    total: estimate.quota,
                    available: estimate.quota - estimate.usage
                };
            } catch (error) {
                console.warn('Impossible d\'obtenir les informations de quota');
            }
        }
        return null;
    }
}
```

### Gestionnaire de Préférences Utilisateur

```javascript
class UserPreferencesManager {
    constructor() {
        this.storage = new LocalStorageManager('userPrefs');
        this.preferences = this.loadPreferences();
        this.observers = new Map();
        
        this.initializeDefaults();
    }

    initializeDefaults() {
        const defaults = {
            theme: 'light',
            language: 'fr',
            notifications: true,
            autoSave: true,
            displayDensity: 'normal',
            accessibilityMode: false,
            fontSize: 16,
            lastLogin: null
        };

        // Fusion avec les préférences existantes
        this.preferences = { ...defaults, ...this.preferences };
        this.savePreferences();
    }

    loadPreferences() {
        return this.storage.getObject('preferences', {});
    }

    savePreferences() {
        return this.storage.setObject('preferences', this.preferences, {
            expiry: 365 * 24 * 60 * 60 * 1000 // 1 an
        });
    }

    set(key, value) {
        const oldValue = this.preferences[key];
        this.preferences[key] = value;
        
        if (this.savePreferences()) {
            this.notifyObservers(key, value, oldValue);
            console.log(`Préférence mise à jour: ${key} = ${value}`);
            return true;
        }
        
        return false;
    }

    get(key, defaultValue = null) {
        return this.preferences[key] ?? defaultValue;
    }

    // Système d'observation des changements
    observe(key, callback) {
        if (!this.observers.has(key)) {
            this.observers.set(key, new Set());
        }
        this.observers.get(key).add(callback);
        
        // Retourner une fonction de désabonnement
        return () => {
            this.observers.get(key)?.delete(callback);
        };
    }

    notifyObservers(key, newValue, oldValue) {
        const keyObservers = this.observers.get(key);
        if (keyObservers) {
            keyObservers.forEach(callback => {
                try {
                    callback(newValue, oldValue, key);
                } catch (error) {
                    console.error('Erreur dans l\'observer:', error);
                }
            });
        }
    }

    // Gestion des thèmes
    setTheme(theme) {
        if (['light', 'dark', 'auto'].includes(theme)) {
            this.set('theme', theme);
            this.applyTheme(theme);
        }
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        if (theme === 'auto') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const actualTheme = mediaQuery.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-actual-theme', actualTheme);
        }
    }

    // Import/Export des préférences
    exportPreferences() {
        return {
            preferences: this.preferences,
            timestamp: Date.now(),
            version: '1.0'
        };
    }

    importPreferences(data) {
        try {
            if (data.preferences && typeof data.preferences === 'object') {
                this.preferences = { ...this.preferences, ...data.preferences };
                this.savePreferences();
                
                // Notifier tous les observers
                Object.keys(data.preferences).forEach(key => {
                    this.notifyObservers(key, this.preferences[key], undefined);
                });
                
                return true;
            }
        } catch (error) {
            console.error('Erreur lors de l\'import:', error);
        }
        return false;
    }

    reset() {
        this.storage.removeItem('preferences');
        this.preferences = {};
        this.initializeDefaults();
        console.log('Préférences réinitialisées');
    }
}
```

## SessionStorage : Stockage Temporaire

### Comprendre SessionStorage

SessionStorage fonctionne de manière très similaire à localStorage, mais avec une différence cruciale : la durée de vie des données. Tandis que localStorage persiste jusqu'à suppression explicite, sessionStorage est automatiquement vidé à la fermeture de l'onglet ou de la fenêtre du navigateur.

Cette caractéristique en fait l'outil idéal pour stocker des données temporaires : état des formulaires en cours de saisie, données de session utilisateur, cache temporaire pour les API, ou informations de navigation dans une application multi-étapes.

```javascript
class SessionManager {
    constructor(namespace = 'session') {
        this.namespace = namespace;
        this.storage = sessionStorage;
        this.listeners = new Map();
        
        this.initializeSession();
        this.setupStorageListener();
    }

    initializeSession() {
        const sessionInfo = {
            sessionId: this.generateSessionId(),
            startTime: Date.now(),
            tabId: this.generateTabId(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        this.setItem('sessionInfo', sessionInfo);
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    generateTabId() {
        return 'tab_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    }

    setItem(key, value, options = {}) {
        try {
            const fullKey = `${this.namespace}_${key}`;
            const dataToStore = {
                value: value,
                timestamp: Date.now(),
                type: typeof value,
                temporary: options.temporary || false
            };

            this.storage.setItem(fullKey, JSON.stringify(dataToStore));
            this.notifyListeners(key, value, 'set');
            return true;
            
        } catch (error) {
            console.error('Erreur SessionStorage setItem:', error);
            return false;
        }
    }

    getItem(key, defaultValue = null) {
        try {
            const fullKey = `${this.namespace}_${key}`;
            const storedData = this.storage.getItem(fullKey);
            
            if (!storedData) {
                return defaultValue;
            }

            const parsedData = JSON.parse(storedData);
            return parsedData.value;
            
        } catch (error) {
            console.error('Erreur SessionStorage getItem:', error);
            return defaultValue;
        }
    }

    removeItem(key) {
        try {
            const fullKey = `${this.namespace}_${key}`;
            this.storage.removeItem(fullKey);
            this.notifyListeners(key, null, 'remove');
            return true;
        } catch (error) {
            console.error('Erreur SessionStorage removeItem:', error);
            return false;
        }
    }

    // Gestion des formulaires temporaires
    saveFormState(formId, formData) {
        const formStateKey = `formState_${formId}`;
        return this.setItem(formStateKey, {
            data: formData,
            savedAt: Date.now(),
            url: window.location.href
        });
    }

    restoreFormState(formId) {
        const formStateKey = `formState_${formId}`;
        return this.getItem(formStateKey);
    }

    clearFormState(formId) {
        const formStateKey = `formState_${formId}`;
        return this.removeItem(formStateKey);
    }

    // Navigation multi-étapes
    setStepData(step, data) {
        const stepsData = this.getItem('wizardSteps', {});
        stepsData[step] = {
            data: data,
            completedAt: Date.now(),
            isValid: true
        };
        return this.setItem('wizardSteps', stepsData);
    }

    getStepData(step) {
        const stepsData = this.getItem('wizardSteps', {});
        return stepsData[step]?.data || null;
    }

    getAllStepsData() {
        return this.getItem('wizardSteps', {});
    }

    clearWizardData() {
        return this.removeItem('wizardSteps');
    }

    // Système de notifications
    onItemChange(key, callback) {
        if (!this.listeners.has(key)) {
            this.listeners.set(key, new Set());
        }
        this.listeners.get(key).add(callback);
        
        return () => this.listeners.get(key)?.delete(callback);
    }

    notifyListeners(key, value, action) {
        const keyListeners = this.listeners.get(key);
        if (keyListeners) {
            keyListeners.forEach(callback => {
                try {
                    callback(value, action, key);
                } catch (error) {
                    console.error('Erreur dans le listener:', error);
                }
            });
        }
    }

    setupStorageListener() {
        window.addEventListener('storage', (e) => {
            if (e.storageArea === sessionStorage && e.key.startsWith(this.namespace)) {
                const key = e.key.replace(`${this.namespace}_`, '');
                const newValue = e.newValue ? JSON.parse(e.newValue).value : null;
                this.notifyListeners(key, newValue, 'external');
            }
        });
    }

    // Nettoyage automatique
    cleanupTemporaryData() {
        const keys = this.getAllKeys();
        let cleanedCount = 0;

        keys.forEach(key => {
            try {
                const fullKey = `${this.namespace}_${key}`;
                const data = JSON.parse(this.storage.getItem(fullKey));
                
                if (data.temporary) {
                    // Suppression des données temporaires après 1 heure
                    if (Date.now() - data.timestamp > 60 * 60 * 1000) {
                        this.removeItem(key);
                        cleanedCount++;
                    }
                }
            } catch (error) {
                // Suppression des données corrompues
                this.removeItem(key);
                cleanedCount++;
            }
        });

        console.log(`Nettoyage automatique: ${cleanedCount} entrées supprimées`);
    }

    getAllKeys() {
        const keys = [];
        const prefix = `${this.namespace}_`;
        
        for (let i = 0; i < this.storage.length; i++) {
            const key = this.storage.key(i);
            if (key.startsWith(prefix)) {
                keys.push(key.replace(prefix, ''));
            }
        }
        
        return keys;
    }

    getSessionStats() {
        const sessionInfo = this.getItem('sessionInfo');
        const allKeys = this.getAllKeys();
        
        return {
            sessionId: sessionInfo?.sessionId,
            duration: Date.now() - (sessionInfo?.startTime || Date.now()),
            itemCount: allKeys.length,
            tabId: sessionInfo?.tabId
        };
    }
}
```

## Cookies : Communication Client-Serveur

### Gestion Avancée des Cookies

Les cookies représentent la technologie de stockage la plus ancienne mais restent essentiels pour certains cas d'usage, notamment l'authentification et la communication avec le serveur. Leur gestion nécessite une attention particulière aux aspects de sécurité et de conformité réglementaire.

```javascript
class CookieManager {
    constructor(options = {}) {
        this.defaultOptions = {
            path: '/',
            sameSite: 'Strict',
            secure: window.location.protocol === 'https:',
            ...options
        };
        
        this.consentGiven = this.checkConsent();
    }

    checkConsent() {
        // Vérification du consentement RGPD
        return localStorage.getItem('cookieConsent') === 'true';
    }

    requestConsent() {
        return new Promise((resolve) => {
            if (this.consentGiven) {
                resolve(true);
                return;
            }

            this.showConsentBanner(resolve);
        });
    }

    showConsentBanner(callback) {
        const banner = document.createElement('div');
        banner.className = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="consent-content">
                <p>Ce site utilise des cookies pour améliorer votre expérience. Acceptez-vous leur utilisation ?</p>
                <div class="consent-buttons">
                    <button class="btn-accept">Accepter</button>
                    <button class="btn-decline">Refuser</button>
                    <button class="btn-customize">Personnaliser</button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        banner.querySelector('.btn-accept').onclick = () => {
            this.giveConsent(true);
            document.body.removeChild(banner);
            callback(true);
        };

        banner.querySelector('.btn-decline').onclick = () => {
            this.giveConsent(false);
            document.body.removeChild(banner);
            callback(false);
        };

        banner.querySelector('.btn-customize').onclick = () => {
            this.showCustomizationModal(banner, callback);
        };
    }

    giveConsent(consent) {
        this.consentGiven = consent;
        localStorage.setItem('cookieConsent', consent.toString());
        
        if (!consent) {
            this.clearAllCookies();
        }
    }

    async setCookie(name, value, options = {}) {
        if (!this.consentGiven) {
            const consent = await this.requestConsent();
            if (!consent) {
                console.warn('Cookie non défini : consentement refusé');
                return false;
            }
        }

        try {
            const mergedOptions = { ...this.defaultOptions, ...options };
            let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

            // Gestion de l'expiration
            if (mergedOptions.expires) {
                if (mergedOptions.expires instanceof Date) {
                    cookieString += `; expires=${mergedOptions.expires.toUTCString()}`;
                } else if (typeof mergedOptions.expires === 'number') {
                    const expireDate = new Date(Date.now() + mergedOptions.expires * 24 * 60 * 60 * 1000);
                    cookieString += `; expires=${expireDate.toUTCString()}`;
                }
            }

            // Options de sécurité
            if (mergedOptions.path) cookieString += `; path=${mergedOptions.path}`;
            if (mergedOptions.domain) cookieString += `; domain=${mergedOptions.domain}`;
            if (mergedOptions.secure) cookieString += `; secure`;
            if (mergedOptions.httpOnly) cookieString += `; httpOnly`;
            if (mergedOptions.sameSite) cookieString += `; sameSite=${mergedOptions.sameSite}`;

            document.cookie = cookieString;
            
            console.log(`Cookie défini: ${name}`);
            return true;
            
        } catch (error) {
            console.error('Erreur lors de la définition du cookie:', error);
            return false;
        }
    }

    getCookie(name, defaultValue = null) {
        try {
            const cookies = document.cookie.split(';');
            
            for (let cookie of cookies) {
                const [cookieName, cookieValue] = cookie.trim().split('=');
                if (decodeURIComponent(cookieName) === name) {
                    return decodeURIComponent(cookieValue);
                }
            }
            
            return defaultValue;
            
        } catch (error) {
            console.error('Erreur lors de la lecture du cookie:', error);
            return defaultValue;
        }
    }

    removeCookie(name, options = {}) {
        const mergedOptions = { ...this.defaultOptions, ...options };
        return this.setCookie(name, '', { 
            ...mergedOptions, 
            expires: new Date(0) 
        });
    }

    getAllCookies() {
        const cookies = {};
        
        try {
            document.cookie.split(';').forEach(cookie => {
                const [name, value] = cookie.trim().split('=');
                if (name && value) {
                    cookies[decodeURIComponent(name)] = decodeURIComponent(value);
                }
            });
        } catch (error) {
            console.error('Erreur lors de la lecture des cookies:', error);
        }
        
        return cookies;
    }

    clearAllCookies() {
        const cookies = this.getAllCookies();
        
        Object.keys(cookies).forEach(name => {
            this.removeCookie(name);
        });
        
        console.log('Tous les cookies ont été supprimés');
    }

    // Gestion des cookies de session
    setSessionCookie(name, value) {
        return this.setCookie(name, value, { expires: null });
    }

    // Gestion des cookies d'authentification
    setAuthCookie(token, options = {}) {
        const authOptions = {
            secure: true,
            httpOnly: false, // Pour permettre la lecture côté client
            sameSite: 'Strict',
            expires: options.rememberMe ? 30 : null, // 30 jours si "se souvenir"
            ...options
        };

        return this.setCookie('authToken', token, authOptions);
    }

    getAuthToken() {
        return this.getCookie('authToken');
    }

    clearAuthCookie() {
        return this.removeCookie('authToken');
    }

    // Validation et conformité
    validateCookieCompliance() {
        const issues = [];
        const cookies = this.getAllCookies();

        Object.keys(cookies).forEach(name => {
            // Vérification des cookies de tracking sans consentement
            if (this.isTrackingCookie(name) && !this.consentGiven) {
                issues.push(`Cookie de tracking sans consentement: ${name}`);
            }

            // Vérification des cookies sensibles sans sécurité
            if (this.isSensitiveCookie(name)) {
                // Ces vérifications nécessiteraient l'accès aux attributs des cookies
                // qui ne sont pas disponibles côté client
                console.warn(`Vérifiez la sécurité du cookie sensible: ${name}`);
            }
        });

        return issues;
    }

    isTrackingCookie(name) {
        const trackingPatterns = ['_ga', '_gid', '_fbp', 'utm_', 'tracking'];
        return trackingPatterns.some(pattern => name.includes(pattern));
    }

    isSensitiveCookie(name) {
        const sensitivePatterns = ['auth', 'session', 'token', 'login'];
        return sensitivePatterns.some(pattern => name.toLowerCase().includes(pattern));
    }
}
```

## IndexedDB : Base de Données Côté Client

### Introduction à IndexedDB

IndexedDB représente la solution la plus puissante pour le stockage côté client. Cette véritable base de données NoSQL dans le navigateur permet de stocker des quantités importantes de données structurées, d'effectuer des requêtes complexes et de gérer des transactions.

```javascript
class IndexedDBManager {
    constructor(dbName, version = 1) {
        this.dbName = dbName;
        this.version = version;
        this.db = null;
        this.stores = new Map();
        
        this.isReady = this.initializeDB();
    }

    async initializeDB() {
        return new Promise((resolve, reject) => {
            if (!window.indexedDB) {
                reject(new Error('IndexedDB non supporté'));
                return;
            }

            const request = indexedDB.open(this.dbName, this.version);

            request.onerror = () => {
                reject(new Error('Erreur lors de l\'ouverture de la base de données'));
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                console.log(`Base de données ${this.dbName} ouverte avec succès`);
                resolve(true);
            };

            request.onupgradeneeded = (event) => {
                this.db = event.target.result;
                this.handleUpgrade(event);
            };
        });
    }

    handleUpgrade(event) {
        const oldVersion = event.oldVersion;
        const newVersion = event.newVersion;
        
        console.log(`Mise à jour de la base de données de v${oldVersion} vers v${newVersion}`);
        
        // Configuration des stores de base
        this.createDefaultStores();
    }

    createDefaultStores() {
        // Store pour les données utilisateur
        if (!this.db.objectStoreNames.contains('userData')) {
            const userStore = this.db.createObjectStore('userData', { 
                keyPath: 'id', 
                autoIncrement: true 
            });
            userStore.createIndex('email', 'email', { unique: true });
            userStore.createIndex('lastLogin', 'lastLogin');
        }

        // Store pour le cache des données
        if (!this.db.objectStoreNames.contains('cache')) {
            const cacheStore = this.db.createObjectStore('cache', { 
                keyPath: 'key' 
            });
            cacheStore.createIndex('timestamp', 'timestamp');
            cacheStore.createIndex('category', 'category');
        }

        // Store pour les fichiers
        if (!this.db.objectStoreNames.contains('files')) {
            const filesStore = this.db.createObjectStore('files', { 
                keyPath: 'id', 
                autoIncrement: true 
            });
            filesStore.createIndex('name', 'name');
            filesStore.createIndex('type', 'type');
            filesStore.createIndex('uploadDate', 'uploadDate');
        }
    }

    async waitForReady() {
        await this.isReady;
    }

    // Opérations CRUD génériques
    async add(storeName, data) {
        await this.waitForReady();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            
            const request = store.add(data);
            
            request.onsuccess = () => {
                resolve(request.result);
            };
            
            request.onerror = () => {
                reject(new Error(`Erreur lors de l'ajout dans ${storeName}`));
            };
        });
    }

    async put(storeName, data) {
        await this.waitForReady();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            
            const request = store.put(data);
            
            request.onsuccess = () => {
                resolve(request.result);
            };
            
            request.onerror = () => {
                reject(new Error(`Erreur lors de la mise à jour dans ${storeName}`));
            };
        });
    }

    async get(storeName, key) {
        await this.waitForReady();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            
            const request = store.get(key);
            
            request.onsuccess = () => {
                resolve(request.result);
            };
            
            request.onerror = () => {
                reject(new Error(`Erreur lors de la récupération dans ${storeName}`));
            };
        });
    }

    async delete(storeName, key) {
        await this.waitForReady();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            
            const request = store.delete(key);
            
            request.onsuccess = () => {
                resolve(true);
            };
            
            request.onerror = () => {
                reject(new Error(`Erreur lors de la suppression dans ${storeName}`));
            };
        });
    }

    // Requêtes avancées
    async getAll(storeName, filter = null) {
        await this.waitForReady();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            
            const request = store.getAll();
            
            request.onsuccess = () => {
                let results = request.result;
                
                if (filter && typeof filter === 'function') {
                    results = results.filter(filter);
                }
                
                resolve(results);
            };
            
            request.onerror = () => {
                reject(new Error(`Erreur lors de la récupération de tous les éléments de ${storeName}`));
            };
        });
    }

    async query(storeName, indexName, value) {
        await this.waitForReady();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const index = store.index(indexName);
            
            const request = index.getAll(value);
            
            request.onsuccess = () => {
                resolve(request.result);
            };
            
            request.onerror = () => {
                reject(new Error(`Erreur lors de la requête sur l'index ${indexName}`));
            };
        });
    }

    async search(storeName, searchFunction) {
        await this.waitForReady();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const results = [];
            
            const request = store.openCursor();
            
            request.onsuccess = (event) => {
                const cursor = event.target.result;
                
                if (cursor) {
                    if (searchFunction(cursor.value)) {
                        results.push(cursor.value);
                    }
                    cursor.continue();
                } else {
                    resolve(results);
                }
            };
            
            request.onerror = () => {
                reject(new Error(`Erreur lors de la recherche dans ${storeName}`));
            };
        });
    }

    // Gestion du cache intelligent
    async setCache(key, data, ttl = 3600000) { // TTL par défaut: 1 heure
        const cacheEntry = {
            key: key,
            data: data,
            timestamp: Date.now(),
            ttl: ttl,
            category: 'general'
        };
        
        return await this.put('cache', cacheEntry);
    }

    async getCache(key) {
        const cacheEntry = await this.get('cache', key);
        
        if (!cacheEntry) {
            return null;
        }
        
        // Vérification de l'expiration
        if (Date.now() - cacheEntry.timestamp > cacheEntry.ttl) {
            await this.delete('cache', key);
            return null;
        }
        
        return cacheEntry.data;
    }

    async cleanExpiredCache() {
        const allCache = await this.getAll('cache');
        const now = Date.now();
        let cleanedCount = 0;
        
        for (const entry of allCache) {
            if (now - entry.timestamp > entry.ttl) {
                await this.delete('cache', entry.key);
                cleanedCount++;
            }
        }
        
        console.log(`Cache nettoyé: ${cleanedCount} entrées expirées supprimées`);
        return cleanedCount;
    }

    // Gestion des fichiers
    async saveFile(file, metadata = {}) {
        const fileData = {
            name: file.name,
            type: file.type,
            size: file.size,
            data: await this.fileToArrayBuffer(file),
            uploadDate: Date.now(),
            ...metadata
        };
        
        return await this.add('files', fileData);
    }

    async getFile(id) {
        const fileData = await this.get('files', id);
        
        if (fileData) {
            // Reconstruction du fichier
            const blob = new Blob([fileData.data], { type: fileData.type });
            return {
                ...fileData,
                blob: blob,
                url: URL.createObjectURL(blob)
            };
        }
        
        return null;
    }

    fileToArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }

    // Statistiques et maintenance
    async getStorageStats() {
        await this.waitForReady();
        
        const stats = {};
        
        for (const storeName of this.db.objectStoreNames) {
            const count = await this.getStoreCount(storeName);
            stats[storeName] = count;
        }
        
        return stats;
    }

    async getStoreCount(storeName) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            
            const request = store.count();
            
            request.onsuccess = () => {
                resolve(request.result);
            };
            
            request.onerror = () => {
                reject(new Error(`Erreur lors du comptage de ${storeName}`));
            };
        });
    }

    async clearStore(storeName) {
        await this.waitForReady();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            
            const request = store.clear();
            
            request.onsuccess = () => {
                console.log(`Store ${storeName} vidé`);
                resolve(true);
            };
            
            request.onerror = () => {
                reject(new Error(`Erreur lors du vidage de ${storeName}`));
            };
        });
    }

    close() {
        if (this.db) {
            this.db.close();
            this.db = null;
            console.log(`Base de données ${this.dbName} fermée`);
        }
    }
}
```

## Gestionnaire Unifié de Persistance

### Architecture Centralisée

Pour simplifier l'utilisation de toutes ces technologies, nous pouvons créer un gestionnaire unifié qui choisit automatiquement la meilleure solution selon le contexte.

```javascript
class UnifiedStorageManager {
    constructor(options = {}) {
        this.options = {
            namespace: 'app',
            enableIndexedDB: true,
            enableLocalStorage: true,
            enableSessionStorage: true,
            enableCookies: true,
            ...options
        };
        
        this.initializeStorages();
    }

    async initializeStorages() {
        this.storages = {};
        
        // LocalStorage
        if (this.options.enableLocalStorage) {
            this.storages.localStorage = new LocalStorageManager(this.options.namespace);
        }
        
        // SessionStorage
        if (this.options.enableSessionStorage) {
            this.storages.sessionStorage = new SessionManager(this.options.namespace);
        }
        
        // Cookies
        if (this.options.enableCookies) {
            this.storages.cookies = new CookieManager();
        }
        
        // IndexedDB
        if (this.options.enableIndexedDB) {
            try {
                this.storages.indexedDB = new IndexedDBManager(this.options.namespace);
                await this.storages.indexedDB.isReady;
            } catch (error) {
                console.warn('IndexedDB non disponible:', error);
            }
        }
        
        console.log('Gestionnaire de stockage unifié initialisé');
    }

    // API unifiée simple
    async set(key, value, options = {}) {
        const storage = this.selectOptimalStorage(value, options);
        
        switch (storage) {
            case 'indexedDB':
                return await this.storages.indexedDB.put('data', { key, value });
            case 'localStorage':
                return this.storages.localStorage.setItem(key, value, options);
            case 'sessionStorage':
                return this.storages.sessionStorage.setItem(key, value, options);
            case 'cookies':
                return await this.storages.cookies.setCookie(key, JSON.stringify(value), options);
            default:
                throw new Error('Aucun storage disponible');
        }
    }

    async get(key, defaultValue = null) {
        // Tentative de récupération dans tous les storages disponibles
        const storageTypes = ['indexedDB', 'localStorage', 'sessionStorage', 'cookies'];
        
        for (const storageType of storageTypes) {
            if (!this.storages[storageType]) continue;
            
            try {
                let value;
                
                switch (storageType) {
                    case 'indexedDB':
                        const result = await this.storages.indexedDB.get('data', key);
                        value = result?.value;
                        break;
                    case 'localStorage':
                        value = this.storages.localStorage.getItem(key);
                        break;
                    case 'sessionStorage':
                        value = this.storages.sessionStorage.getItem(key);
                        break;
                    case 'cookies':
                        const cookieValue = this.storages.cookies.getCookie(key);
                        value = cookieValue ? JSON.parse(cookieValue) : null;
                        break;
                }
                
                if (value !== null && value !== undefined) {
                    return value;
                }
                
            } catch (error) {
                console.warn(`Erreur lors de la lecture depuis ${storageType}:`, error);
                continue;
            }
        }
        
        return defaultValue;
    }

    async remove(key) {
        const promises = [];
        
        Object.entries(this.storages).forEach(([type, storage]) => {
            switch (type) {
                case 'indexedDB':
                    promises.push(storage.delete('data', key));
                    break;
                case 'localStorage':
                    promises.push(Promise.resolve(storage.removeItem(key)));
                    break;
                case 'sessionStorage':
                    promises.push(Promise.resolve(storage.removeItem(key)));
                    break;
                case 'cookies':
                    promises.push(storage.removeCookie(key));
                    break;
            }
        });
        
        await Promise.allSettled(promises);
    }

    selectOptimalStorage(value, options) {
        const valueSize = new Blob([JSON.stringify(value)]).size;
        
        // Grandes données -> IndexedDB
        if (valueSize > 1024 * 1024 && this.storages.indexedDB) { // > 1MB
            return 'indexedDB';
        }
        
        // Données temporaires -> SessionStorage
        if (options.temporary && this.storages.sessionStorage) {
            return 'sessionStorage';
        }
        
        // Données à partager avec le serveur -> Cookies
        if (options.serverAccess && this.storages.cookies) {
            return 'cookies';
        }
        
        // Par défaut -> LocalStorage
        if (this.storages.localStorage) {
            return 'localStorage';
        }
        
        // Fallback -> SessionStorage
        if (this.storages.sessionStorage) {
            return 'sessionStorage';
        }
        
        throw new Error('Aucun storage approprié disponible');
    }

    // Méthodes de commodité
    async setUserPreference(key, value) {
        return this.set(`pref_${key}`, value, { expires: 365 });
    }

    async getUserPreference(key, defaultValue = null) {
        return this.get(`pref_${key}`, defaultValue);
    }

    async setTemporary(key, value, ttl = 3600000) {
        return this.set(key, value, { temporary: true, ttl });
    }

    async cache(key, value, ttl = 3600000) {
        if (this.storages.indexedDB) {
            return this.storages.indexedDB.setCache(key, value, ttl);
        } else {
            return this.set(`cache_${key}`, value, { ttl });
        }
    }

    async getFromCache(key) {
        if (this.storages.indexedDB) {
            return this.storages.indexedDB.getCache(key);
        } else {
            return this.get(`cache_${key}`);
        }
    }

    // Synchronisation et maintenance
    async sync() {
        // Synchronisation entre les différents storages
        console.log('Synchronisation des données...');
        
        if (this.storages.indexedDB) {
            await this.storages.indexedDB.cleanExpiredCache();
        }
        
        if (this.storages.sessionStorage) {
            this.storages.sessionStorage.cleanupTemporaryData();
        }
    }

    async getGlobalStats() {
        const stats = {
            storages: {},
            totalSize: 0,
            recommendations: []
        };
        
        if (this.storages.localStorage) {
            stats.storages.localStorage = this.storages.localStorage.getStats();
        }
        
        if (this.storages.sessionStorage) {
            stats.storages.sessionStorage = this.storages.sessionStorage.getSessionStats();
        }
        
        if (this.storages.indexedDB) {
            stats.storages.indexedDB = await this.storages.indexedDB.getStorageStats();
        }
        
        return stats;
    }

    async clear() {
        const promises = [];
        
        Object.values(this.storages).forEach(storage => {
            if (storage.clear) {
                promises.push(Promise.resolve(storage.clear()));
            } else if (storage.clearAllCookies) {
                promises.push(Promise.resolve(storage.clearAllCookies()));
            }
        });
        
        await Promise.allSettled(promises);
        console.log('Tous les storages ont été vidés');
    }
}

// Utilisation simplifiée
const storage = new UnifiedStorageManager();

// Exemples d'utilisation
async function exempleUtilisation() {
    // Stockage simple
    await storage.set('userName', 'Alice');
    const userName = await storage.get('userName');
    
    // Préférences utilisateur
    await storage.setUserPreference('theme', 'dark');
    const theme = await storage.getUserPreference('theme', 'light');
    
    // Cache temporaire
    await storage.cache('apiData', { data: 'example' }, 30 * 60 * 1000);
    const cachedData = await storage.getFromCache('apiData');
    
    // Données temporaires
    await storage.setTemporary('formDraft', formData, 60 * 60 * 1000);
    
    // Statistiques
    const stats = await storage.getGlobalStats();
    console.log('Statistiques de stockage:', stats);
}
```

## Conclusion et Bonnes Pratiques

La persistance des données côté client offre un éventail de possibilités pour créer des applications web riches et performantes. La clé du succès réside dans le choix approprié de la technologie selon le contexte :

**LocalStorage** pour les préférences utilisateur et les données persistantes simples
**SessionStorage** pour les états temporaires et les formulaires en cours
**Cookies** pour l'authentification et la communication serveur
**IndexedDB** pour les grandes quantités de données et les applications complexes

### Recommandations Essentielles

**Sécurité :** Ne jamais stocker d'informations sensibles en clair côté client
**Performance :** Limiter la taille des données stockées et nettoyer régulièrement
**Conformité :** Respecter les réglementations sur la protection des données
**Fallbacks :** Toujours prévoir des alternatives si le stockage n'est pas disponible
**Synchronisation :** Maintenir la cohérence entre le stockage local et le serveur

L'avenir de la persistance côté client s'oriente vers des solutions encore plus sophistiquées avec les Web Streams, le Storage API pour la gestion des quotas, et l'intégration avec les Service Workers pour le cache intelligent et le mode hors ligne.
