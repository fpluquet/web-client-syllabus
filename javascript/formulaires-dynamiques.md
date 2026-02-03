# 9.1 Formulaires Dynamiques

## Introduction aux Formulaires Dynamiques

Les formulaires dynamiques représentent l'évolution naturelle des formulaires web statiques vers des interfaces interactives et adaptatives. Contrairement aux formulaires traditionnels qui présentent une structure figée, les formulaires dynamiques s'adaptent en temps réel aux actions de l'utilisateur, offrant une expérience personnalisée et guidée.

Cette approche transforme radicalement l'interaction utilisateur en créant des formulaires qui réagissent intelligemment : champs qui apparaissent selon les sélections, validation en temps réel, suggestions automatiques, et logique conditionnelle complexe. Ces fonctionnalités améliorent significativement l'expérience utilisateur tout en réduisant les erreurs de saisie.

L'importance des formulaires dynamiques ne cesse de croître dans le développement web moderne, car ils permettent de créer des interfaces plus intuitives, de réduire la charge cognitive de l'utilisateur, et d'optimiser les taux de conversion en guidant naturellement vers la completion du formulaire.

## Création et Suppression Dynamique de Champs

### Système de Gestion des Champs Dynamiques

La création dynamique de champs de formulaire nécessite une approche structurée pour maintenir la cohérence et la validité du formulaire. Voici un système complet de gestion :

```javascript
class DynamicFormManager {
    constructor(formContainer) {
        this.formContainer = formContainer;
        this.fieldCounter = 0;
        this.fieldTemplates = new Map();
        this.validators = new Map();
        this.fieldGroups = new Map();
        
        this.initializeTemplates();
        this.setupEventListeners();
    }

    initializeTemplates() {
        // Template pour champ texte
        this.fieldTemplates.set('text', {
            html: `
                <div class="form-field" data-field-id="{fieldId}">
                    <label for="{fieldId}" class="field-label">{label}</label>
                    <input type="text" id="{fieldId}" name="{name}" class="field-input" placeholder="{placeholder}">
                    <button type="button" class="remove-field-btn" title="Supprimer ce champ">×</button>
                    <div class="field-validation"></div>
                </div>
            `,
            validation: (value) => value.length >= 2
        });

        // Template pour sélection
        this.fieldTemplates.set('select', {
            html: `
                <div class="form-field" data-field-id="{fieldId}">
                    <label for="{fieldId}" class="field-label">{label}</label>
                    <select id="{fieldId}" name="{name}" class="field-select">
                        <option value="">-- Sélectionnez --</option>
                        {options}
                    </select>
                    <button type="button" class="remove-field-btn" title="Supprimer ce champ">×</button>
                    <div class="field-validation"></div>
                </div>
            `,
            validation: (value) => value !== ''
        });

        // Template pour zone de texte
        this.fieldTemplates.set('textarea', {
            html: `
                <div class="form-field" data-field-id="{fieldId}">
                    <label for="{fieldId}" class="field-label">{label}</label>
                    <textarea id="{fieldId}" name="{name}" class="field-textarea" rows="4" placeholder="{placeholder}"></textarea>
                    <button type="button" class="remove-field-btn" title="Supprimer ce champ">×</button>
                    <div class="field-validation"></div>
                </div>
            `,
            validation: (value) => value.length >= 10
        });
    }

    setupEventListeners() {
        // Délégation d'événements pour les boutons de suppression
        this.formContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-field-btn')) {
                this.removeField(e.target.closest('.form-field'));
            }
        });

        // Validation en temps réel
        this.formContainer.addEventListener('input', (e) => {
            if (e.target.classList.contains('field-input') || 
                e.target.classList.contains('field-select') || 
                e.target.classList.contains('field-textarea')) {
                this.validateField(e.target);
            }
        });
    }

    addField(fieldType, options = {}) {
        const template = this.fieldTemplates.get(fieldType);
        if (!template) {
            console.error(`Type de champ non supporté: ${fieldType}`);
            return null;
        }

        this.fieldCounter++;
        const fieldId = `dynamic_field_${this.fieldCounter}`;
        
        const fieldConfig = {
            fieldId: fieldId,
            name: options.name || fieldId,
            label: options.label || `Champ ${this.fieldCounter}`,
            placeholder: options.placeholder || '',
            options: this.generateSelectOptions(options.selectOptions || [])
        };

        const fieldHtml = this.replaceTemplateVariables(template.html, fieldConfig);
        const fieldElement = this.createElementFromHTML(fieldHtml);

        // Animation d'entrée
        fieldElement.style.opacity = '0';
        fieldElement.style.transform = 'translateY(-20px)';
        
        this.formContainer.appendChild(fieldElement);
        
        // Animation
        requestAnimationFrame(() => {
            fieldElement.style.transition = 'all 0.3s ease';
            fieldElement.style.opacity = '1';
            fieldElement.style.transform = 'translateY(0)';
        });

        // Enregistrer le validateur
        this.validators.set(fieldId, template.validation);

        console.log(`Champ ajouté: ${fieldType} (ID: ${fieldId})`);
        return fieldElement;
    }

    removeField(fieldElement) {
        if (!fieldElement) return;

        const fieldId = fieldElement.dataset.fieldId;
        
        // Animation de sortie
        fieldElement.style.transition = 'all 0.3s ease';
        fieldElement.style.opacity = '0';
        fieldElement.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            if (fieldElement.parentNode) {
                fieldElement.parentNode.removeChild(fieldElement);
                this.validators.delete(fieldId);
                console.log(`Champ supprimé: ${fieldId}`);
            }
        }, 300);
    }

    generateSelectOptions(options) {
        return options.map(option => {
            if (typeof option === 'string') {
                return `<option value="${option}">${option}</option>`;
            } else {
                return `<option value="${option.value}">${option.text}</option>`;
            }
        }).join('');
    }

    replaceTemplateVariables(template, variables) {
        let result = template;
        Object.keys(variables).forEach(key => {
            const placeholder = `{${key}}`;
            result = result.replace(new RegExp(placeholder, 'g'), variables[key]);
        });
        return result;
    }

    createElementFromHTML(htmlString) {
        const template = document.createElement('template');
        template.innerHTML = htmlString.trim();
        return template.content.firstChild;
    }

    validateField(fieldElement) {
        const fieldId = fieldElement.id;
        const validator = this.validators.get(fieldId);
        const validationContainer = fieldElement.parentNode.querySelector('.field-validation');
        
        if (validator && validationContainer) {
            const isValid = validator(fieldElement.value);
            
            fieldElement.classList.toggle('field-valid', isValid);
            fieldElement.classList.toggle('field-invalid', !isValid);
            
            validationContainer.textContent = isValid ? '' : 'Valeur invalide';
        }
    }

    getAllFieldValues() {
        const formData = {};
        const fields = this.formContainer.querySelectorAll('input, select, textarea');
        
        fields.forEach(field => {
            if (field.name) {
                formData[field.name] = field.value;
            }
        });
        
        return formData;
    }

    validateAllFields() {
        const fields = this.formContainer.querySelectorAll('.field-input, .field-select, .field-textarea');
        let allValid = true;
        
        fields.forEach(field => {
            this.validateField(field);
            if (field.classList.contains('field-invalid')) {
                allValid = false;
            }
        });
        
        return allValid;
    }
}
```

### Interface Utilisateur pour la Gestion des Champs

```html
<div class="dynamic-form-container">
    <div class="form-controls">
        <h3>Constructeur de Formulaire</h3>
        <div class="field-type-controls">
            <button type="button" class="add-field-btn" data-field-type="text">
                + Champ Texte
            </button>
            <button type="button" class="add-field-btn" data-field-type="select">
                + Liste Déroulante
            </button>
            <button type="button" class="add-field-btn" data-field-type="textarea">
                + Zone de Texte
            </button>
        </div>
    </div>

    <form class="dynamic-form" id="dynamicForm">
        <div class="form-fields" id="formFields">
            <!-- Les champs dynamiques seront ajoutés ici -->
        </div>
        
        <div class="form-actions">
            <button type="button" class="validate-btn">Valider le Formulaire</button>
            <button type="button" class="preview-btn">Aperçu</button>
            <button type="button" class="clear-btn">Vider</button>
        </div>
    </form>
</div>
```

```css
.dynamic-form-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 12px;
}

.form-controls {
    background: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.field-type-controls {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.add-field-btn {
    padding: 10px 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.add-field-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.form-field {
    position: relative;
    background: white;
    padding: 20px;
    margin-bottom: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
}

.form-field:hover {
    box-shadow: 0 4px 15px rgba(0,0,0,0.15);
}

.field-label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #333;
}

.field-input,
.field-select,
.field-textarea {
    width: 100%;
    padding: 12px;
    border: 2px solid #e1e5e9;
    border-radius: 6px;
    font-size: 16px;
    transition: all 0.3s ease;
}

.field-input:focus,
.field-select:focus,
.field-textarea:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.field-valid {
    border-color: #27ae60 !important;
}

.field-invalid {
    border-color: #e74c3c !important;
}

.remove-field-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    background: #e74c3c;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    line-height: 1;
    transition: all 0.3s ease;
}

.remove-field-btn:hover {
    background: #c0392b;
    transform: scale(1.1);
}

.field-validation {
    margin-top: 5px;
    color: #e74c3c;
    font-size: 14px;
    min-height: 20px;
}

.form-actions {
    display: flex;
    gap: 15px;
    justify-content: center;
    padding: 20px 0;
}

.form-actions button {
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
}

.validate-btn {
    background: #27ae60;
    color: white;
}

.preview-btn {
    background: #3498db;
    color: white;
}

.clear-btn {
    background: #95a5a6;
    color: white;
}

.form-actions button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
```

```javascript
// Initialisation et gestion des événements
class DynamicFormController {
    constructor() {
        this.formContainer = document.getElementById('formFields');
        this.formManager = new DynamicFormManager(this.formContainer);
        
        this.initializeControls();
        this.setupAdvancedFeatures();
    }

    initializeControls() {
        // Gestion des boutons d'ajout de champs
        document.querySelectorAll('.add-field-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const fieldType = btn.dataset.fieldType;
                this.showFieldConfigurationModal(fieldType);
            });
        });

        // Actions du formulaire
        document.querySelector('.validate-btn').addEventListener('click', () => {
            this.validateForm();
        });

        document.querySelector('.preview-btn').addEventListener('click', () => {
            this.showFormPreview();
        });

        document.querySelector('.clear-btn').addEventListener('click', () => {
            this.clearForm();
        });
    }

    showFieldConfigurationModal(fieldType) {
        // Création d'une modal de configuration
        const modal = this.createConfigurationModal(fieldType);
        document.body.appendChild(modal);
        
        // Animation d'apparition
        requestAnimationFrame(() => {
            modal.classList.add('show');
        });
    }

    createConfigurationModal(fieldType) {
        const modal = document.createElement('div');
        modal.className = 'field-config-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Configuration du Champ ${fieldType}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="config-field">
                        <label>Libellé du champ :</label>
                        <input type="text" id="field-label" placeholder="Entrez le libellé">
                    </div>
                    <div class="config-field">
                        <label>Nom du champ :</label>
                        <input type="text" id="field-name" placeholder="nom_du_champ">
                    </div>
                    <div class="config-field">
                        <label>Placeholder :</label>
                        <input type="text" id="field-placeholder" placeholder="Texte d'aide">
                    </div>
                    ${fieldType === 'select' ? this.getSelectOptionsHTML() : ''}
                </div>
                <div class="modal-footer">
                    <button class="btn-cancel">Annuler</button>
                    <button class="btn-confirm" data-field-type="${fieldType}">Ajouter</button>
                </div>
            </div>
        `;

        // Gestion des événements de la modal
        modal.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal(modal);
        });

        modal.querySelector('.btn-cancel').addEventListener('click', () => {
            this.closeModal(modal);
        });

        modal.querySelector('.btn-confirm').addEventListener('click', () => {
            this.confirmFieldAddition(modal, fieldType);
        });

        // Fermeture par clic sur l'arrière-plan
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal);
            }
        });

        return modal;
    }

    getSelectOptionsHTML() {
        return `
            <div class="config-field">
                <label>Options (une par ligne) :</label>
                <textarea id="select-options" rows="4" placeholder="Option 1&#10;Option 2&#10;Option 3"></textarea>
            </div>
        `;
    }

    confirmFieldAddition(modal, fieldType) {
        const label = modal.querySelector('#field-label').value;
        const name = modal.querySelector('#field-name').value;
        const placeholder = modal.querySelector('#field-placeholder').value;
        
        const options = {
            label: label || `Nouveau champ ${fieldType}`,
            name: name || undefined,
            placeholder: placeholder || ''
        };

        if (fieldType === 'select') {
            const optionsText = modal.querySelector('#select-options').value;
            options.selectOptions = optionsText.split('\n').filter(opt => opt.trim());
        }

        this.formManager.addField(fieldType, options);
        this.closeModal(modal);
    }

    closeModal(modal) {
        modal.classList.add('hiding');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }

    validateForm() {
        const isValid = this.formManager.validateAllFields();
        const values = this.formManager.getAllFieldValues();
        
        if (isValid) {
            console.log('Formulaire valide !', values);
            this.showNotification('Formulaire valide !', 'success');
        } else {
            console.log('Formulaire invalide', values);
            this.showNotification('Veuillez corriger les erreurs', 'error');
        }
    }

    showFormPreview() {
        const values = this.formManager.getAllFieldValues();
        const preview = this.createPreviewModal(values);
        document.body.appendChild(preview);
        
        requestAnimationFrame(() => {
            preview.classList.add('show');
        });
    }

    createPreviewModal(formData) {
        const modal = document.createElement('div');
        modal.className = 'preview-modal';
        
        const dataHTML = Object.keys(formData).map(key => {
            return `<div class="data-item"><strong>${key}:</strong> ${formData[key] || '<em>vide</em>'}</div>`;
        }).join('');

        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Aperçu des Données</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${dataHTML || '<p>Aucune donnée saisie</p>'}
                </div>
                <div class="modal-footer">
                    <button class="btn-close">Fermer</button>
                </div>
            </div>
        `;

        // Événements de fermeture
        modal.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal(modal);
        });

        modal.querySelector('.btn-close').addEventListener('click', () => {
            this.closeModal(modal);
        });

        return modal;
    }

    clearForm() {
        if (confirm('Êtes-vous sûr de vouloir vider le formulaire ?')) {
            const fields = this.formContainer.querySelectorAll('.form-field');
            fields.forEach(field => {
                this.formManager.removeField(field);
            });
            this.showNotification('Formulaire vidé', 'info');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });

        setTimeout(() => {
            notification.classList.add('hiding');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    setupAdvancedFeatures() {
        // Sauvegarde automatique locale
        setInterval(() => {
            this.autoSave();
        }, 30000); // Toutes les 30 secondes

        // Récupération au chargement
        this.loadFromAutoSave();
    }

    autoSave() {
        const formData = this.formManager.getAllFieldValues();
        const formStructure = this.getFormStructure();
        
        localStorage.setItem('dynamicFormData', JSON.stringify(formData));
        localStorage.setItem('dynamicFormStructure', JSON.stringify(formStructure));
        
        console.log('Sauvegarde automatique effectuée');
    }

    loadFromAutoSave() {
        try {
            const savedData = localStorage.getItem('dynamicFormData');
            const savedStructure = localStorage.getItem('dynamicFormStructure');
            
            if (savedData && savedStructure) {
                // Ici, vous pourriez implémenter la restauration de la structure
                console.log('Données sauvegardées trouvées');
            }
        } catch (error) {
            console.error('Erreur lors du chargement des données sauvegardées:', error);
        }
    }

    getFormStructure() {
        const fields = this.formContainer.querySelectorAll('.form-field');
        return Array.from(fields).map(field => {
            const input = field.querySelector('input, select, textarea');
            return {
                type: input.tagName.toLowerCase(),
                id: input.id,
                name: input.name,
                label: field.querySelector('.field-label').textContent
            };
        });
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    const formController = new DynamicFormController();
});
```

## Logique Conditionnelle

### Système de Règles Conditionnelles

```javascript
class ConditionalLogicManager {
    constructor(formManager) {
        this.formManager = formManager;
        this.rules = new Map();
        this.activeConditions = new Set();
        
        this.setupRuleEngine();
    }

    setupRuleEngine() {
        // Écouter les changements dans le formulaire
        this.formManager.formContainer.addEventListener('change', (e) => {
            this.evaluateRules(e.target);
        });

        this.formManager.formContainer.addEventListener('input', (e) => {
            this.evaluateRules(e.target);
        });
    }

    addRule(triggerFieldId, condition, actions) {
        if (!this.rules.has(triggerFieldId)) {
            this.rules.set(triggerFieldId, []);
        }
        
        const rule = {
            id: `rule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            condition: condition,
            actions: actions,
            isActive: false
        };
        
        this.rules.get(triggerFieldId).push(rule);
        console.log(`Règle ajoutée pour le champ ${triggerFieldId}:`, rule);
        
        return rule.id;
    }

    evaluateRules(changedField) {
        const fieldId = changedField.id;
        const fieldRules = this.rules.get(fieldId) || [];
        
        fieldRules.forEach(rule => {
            const conditionMet = this.evaluateCondition(rule.condition, changedField);
            
            if (conditionMet !== rule.isActive) {
                rule.isActive = conditionMet;
                this.executeActions(rule.actions, conditionMet);
            }
        });
    }

    evaluateCondition(condition, field) {
        const { operator, value, type } = condition;
        const fieldValue = field.value;
        
        switch (operator) {
            case 'equals':
                return fieldValue === value;
            case 'not_equals':
                return fieldValue !== value;
            case 'contains':
                return fieldValue.includes(value);
            case 'greater_than':
                return parseFloat(fieldValue) > parseFloat(value);
            case 'less_than':
                return parseFloat(fieldValue) < parseFloat(value);
            case 'is_empty':
                return fieldValue.trim() === '';
            case 'is_not_empty':
                return fieldValue.trim() !== '';
            case 'regex':
                return new RegExp(value).test(fieldValue);
            default:
                console.warn(`Opérateur de condition non supporté: ${operator}`);
                return false;
        }
    }

    executeActions(actions, activate) {
        actions.forEach(action => {
            switch (action.type) {
                case 'show_field':
                    this.toggleFieldVisibility(action.targetFieldId, activate);
                    break;
                case 'hide_field':
                    this.toggleFieldVisibility(action.targetFieldId, !activate);
                    break;
                case 'enable_field':
                    this.toggleFieldEnabled(action.targetFieldId, activate);
                    break;
                case 'disable_field':
                    this.toggleFieldEnabled(action.targetFieldId, !activate);
                    break;
                case 'set_value':
                    if (activate) {
                        this.setFieldValue(action.targetFieldId, action.value);
                    }
                    break;
                case 'add_field':
                    if (activate) {
                        this.addConditionalField(action);
                    } else {
                        this.removeConditionalField(action.targetFieldId);
                    }
                    break;
                case 'show_message':
                    this.toggleMessage(action.messageId, action.message, activate);
                    break;
                default:
                    console.warn(`Type d'action non supporté: ${action.type}`);
            }
        });
    }

    toggleFieldVisibility(fieldId, show) {
        const field = document.querySelector(`[data-field-id="${fieldId}"]`);
        if (field) {
            field.style.transition = 'all 0.3s ease';
            if (show) {
                field.style.display = 'block';
                field.style.opacity = '1';
                field.style.transform = 'translateY(0)';
            } else {
                field.style.opacity = '0';
                field.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    field.style.display = 'none';
                }, 300);
            }
        }
    }

    toggleFieldEnabled(fieldId, enabled) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.disabled = !enabled;
            field.style.opacity = enabled ? '1' : '0.5';
        }
    }

    setFieldValue(fieldId, value) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.value = value;
            // Déclencher l'événement change pour les autres règles
            field.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }

    addConditionalField(action) {
        const { fieldType, options, targetFieldId } = action;
        const newField = this.formManager.addField(fieldType, options);
        
        if (newField) {
            newField.dataset.conditionalFieldId = targetFieldId;
            newField.classList.add('conditional-field');
        }
    }

    removeConditionalField(fieldId) {
        const field = document.querySelector(`[data-conditional-field-id="${fieldId}"]`);
        if (field) {
            this.formManager.removeField(field);
        }
    }

    toggleMessage(messageId, message, show) {
        let messageElement = document.getElementById(messageId);
        
        if (show) {
            if (!messageElement) {
                messageElement = document.createElement('div');
                messageElement.id = messageId;
                messageElement.className = 'conditional-message';
                messageElement.textContent = message;
                this.formManager.formContainer.appendChild(messageElement);
            }
            messageElement.style.display = 'block';
        } else if (messageElement) {
            messageElement.style.display = 'none';
        }
    }
}

// Exemple d'utilisation
class ConditionalFormExample {
    constructor() {
        this.formManager = new DynamicFormManager(document.getElementById('conditionalForm'));
        this.conditionalLogic = new ConditionalLogicManager(this.formManager);
        
        this.setupExampleForm();
    }

    setupExampleForm() {
        // Ajouter le champ principal
        const typeField = this.formManager.addField('select', {
            name: 'user_type',
            label: 'Type d\'utilisateur',
            selectOptions: [
                { value: 'student', text: 'Étudiant' },
                { value: 'teacher', text: 'Enseignant' },
                { value: 'admin', text: 'Administrateur' }
            ]
        });

        const typeFieldId = typeField.querySelector('select').id;

        // Règles conditionnelles pour étudiant
        this.conditionalLogic.addRule(typeFieldId, {
            operator: 'equals',
            value: 'student'
        }, [
            {
                type: 'add_field',
                fieldType: 'text',
                targetFieldId: 'student_id',
                options: {
                    name: 'student_id',
                    label: 'Numéro d\'étudiant',
                    placeholder: 'Ex: 2024001'
                }
            },
            {
                type: 'add_field',
                fieldType: 'select',
                targetFieldId: 'academic_year',
                options: {
                    name: 'academic_year',
                    label: 'Année académique',
                    selectOptions: ['1ère année', '2ème année', '3ème année']
                }
            }
        ]);

        // Règles pour enseignant
        this.conditionalLogic.addRule(typeFieldId, {
            operator: 'equals',
            value: 'teacher'
        }, [
            {
                type: 'add_field',
                fieldType: 'text',
                targetFieldId: 'department',
                options: {
                    name: 'department',
                    label: 'Département',
                    placeholder: 'Ex: Informatique'
                }
            },
            {
                type: 'add_field',
                fieldType: 'select',
                targetFieldId: 'position',
                options: {
                    name: 'position',
                    label: 'Poste',
                    selectOptions: ['Professeur', 'Maître de conférences', 'Chargé de cours']
                }
            }
        ]);

        // Ajouter un champ email qui se valide automatiquement
        const emailField = this.formManager.addField('text', {
            name: 'email',
            label: 'Adresse email',
            placeholder: 'votre.email@exemple.com'
        });

        const emailFieldId = emailField.querySelector('input').id;

        // Validation email en temps réel
        this.conditionalLogic.addRule(emailFieldId, {
            operator: 'regex',
            value: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'
        }, [
            {
                type: 'show_message',
                messageId: 'email_valid',
                message: '✓ Email valide'
            }
        ]);
    }
}
```

## Validation Avancée et Feedback Utilisateur

### Système de Validation Sophistiqué

```javascript
class AdvancedFormValidator {
    constructor(formContainer) {
        this.formContainer = formContainer;
        this.validationRules = new Map();
        this.validationMessages = new Map();
        this.fieldStates = new Map();
        
        this.initializeValidation();
    }

    initializeValidation() {
        // Validation en temps réel
        this.formContainer.addEventListener('input', (e) => {
            this.validateFieldRealTime(e.target);
        });

        this.formContainer.addEventListener('blur', (e) => {
            this.validateField(e.target, true);
        }, true);

        this.formContainer.addEventListener('focus', (e) => {
            this.clearFieldValidation(e.target);
        }, true);
    }

    addValidationRule(fieldSelector, rules) {
        this.validationRules.set(fieldSelector, rules);
    }

    validateFieldRealTime(field) {
        const fieldName = field.name || field.id;
        const rules = this.findRulesForField(field);
        
        if (!rules) return;

        let allValid = true;
        const errors = [];

        rules.forEach(rule => {
            const isValid = this.executeValidationRule(field.value, rule);
            if (!isValid) {
                allValid = false;
                errors.push(rule.message || 'Valeur invalide');
            }
        });

        this.updateFieldState(field, allValid, errors);
        this.updateFieldVisualFeedback(field, allValid, errors);
    }

    validateField(field, showErrors = false) {
        this.validateFieldRealTime(field);
        
        if (showErrors) {
            this.showFieldErrors(field);
        }
    }

    executeValidationRule(value, rule) {
        switch (rule.type) {
            case 'required':
                return value.trim() !== '';
            
            case 'minLength':
                return value.length >= rule.value;
            
            case 'maxLength':
                return value.length <= rule.value;
            
            case 'pattern':
                return new RegExp(rule.value).test(value);
            
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            
            case 'phone':
                return /^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, ''));
            
            case 'numeric':
                return !isNaN(value) && !isNaN(parseFloat(value));
            
            case 'range':
                const num = parseFloat(value);
                return num >= rule.min && num <= rule.max;
            
            case 'custom':
                return rule.validator(value);
            
            default:
                console.warn(`Type de validation non supporté: ${rule.type}`);
                return true;
        }
    }

    findRulesForField(field) {
        // Recherche par nom, ID, ou classe
        const selectors = [field.name, `#${field.id}`, ...Array.from(field.classList).map(c => `.${c}`)];
        
        for (const selector of selectors) {
            if (this.validationRules.has(selector)) {
                return this.validationRules.get(selector);
            }
        }
        
        return null;
    }

    updateFieldState(field, isValid, errors) {
        const fieldId = field.id || field.name;
        this.fieldStates.set(fieldId, {
            isValid,
            errors,
            lastValidated: Date.now()
        });
    }

    updateFieldVisualFeedback(field, isValid, errors) {
        // Mise à jour des classes CSS
        field.classList.remove('field-valid', 'field-invalid', 'field-warning');
        
        if (field.value.trim() === '') {
            // Champ vide - état neutre
            return;
        }
        
        if (isValid) {
            field.classList.add('field-valid');
            this.showFieldSuccess(field);
        } else {
            field.classList.add('field-invalid');
            this.showFieldWarning(field, errors);
        }
    }

    showFieldSuccess(field) {
        const container = field.closest('.form-field');
        if (container) {
            let successIcon = container.querySelector('.validation-success');
            if (!successIcon) {
                successIcon = document.createElement('div');
                successIcon.className = 'validation-success';
                successIcon.innerHTML = '✓';
                container.appendChild(successIcon);
            }
            successIcon.style.display = 'block';
        }
    }

    showFieldWarning(field, errors) {
        const container = field.closest('.form-field');
        if (container) {
            let errorContainer = container.querySelector('.field-validation');
            if (!errorContainer) {
                errorContainer = document.createElement('div');
                errorContainer.className = 'field-validation';
                container.appendChild(errorContainer);
            }
            errorContainer.textContent = errors[0] || 'Valeur invalide';
            errorContainer.style.display = 'block';
        }
    }

    showFieldErrors(field) {
        const state = this.fieldStates.get(field.id || field.name);
        if (state && !state.isValid) {
            this.showFieldWarning(field, state.errors);
        }
    }

    clearFieldValidation(field) {
        const container = field.closest('.form-field');
        if (container) {
            const successIcon = container.querySelector('.validation-success');
            const errorContainer = container.querySelector('.field-validation');
            
            if (successIcon) successIcon.style.display = 'none';
            if (errorContainer) errorContainer.style.display = 'none';
        }
    }

    validateAllFields() {
        const fields = this.formContainer.querySelectorAll('input, select, textarea');
        let allValid = true;
        
        fields.forEach(field => {
            this.validateField(field, true);
            const state = this.fieldStates.get(field.id || field.name);
            if (state && !state.isValid) {
                allValid = false;
            }
        });
        
        return allValid;
    }

    getValidationSummary() {
        const summary = {
            totalFields: this.fieldStates.size,
            validFields: 0,
            invalidFields: 0,
            errors: []
        };
        
        this.fieldStates.forEach((state, fieldId) => {
            if (state.isValid) {
                summary.validFields++;
            } else {
                summary.invalidFields++;
                summary.errors.push({
                    field: fieldId,
                    errors: state.errors
                });
            }
        });
        
        return summary;
    }
}

// Configuration d'exemple pour validation avancée
const setupAdvancedValidation = (formContainer) => {
    const validator = new AdvancedFormValidator(formContainer);
    
    // Règles de validation complexes
    validator.addValidationRule('email', [
        { type: 'required', message: 'L\'email est obligatoire' },
        { type: 'email', message: 'Format d\'email invalide' }
    ]);
    
    validator.addValidationRule('password', [
        { type: 'required', message: 'Le mot de passe est obligatoire' },
        { type: 'minLength', value: 8, message: 'Au moins 8 caractères requis' },
        { type: 'pattern', value: '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)', message: 'Doit contenir minuscule, majuscule et chiffre' }
    ]);
    
    validator.addValidationRule('age', [
        { type: 'required', message: 'L\'âge est obligatoire' },
        { type: 'numeric', message: 'Doit être un nombre' },
        { type: 'range', min: 16, max: 120, message: 'Âge entre 16 et 120 ans' }
    ]);
    
    validator.addValidationRule('phone', [
        { type: 'pattern', value: '^[+]?[1-9][0-9]{7,14}$', message: 'Numéro de téléphone invalide' }
    ]);
    
    return validator;
};
```

## Conclusion et Perspectives

Les formulaires dynamiques représentent un domaine en constante évolution dans le développement web moderne. Cette approche transforme l'interaction utilisateur en créant des interfaces adaptatives qui réagissent intelligemment aux actions et aux données saisies.

La maîtrise de ces techniques ouvre la voie à des expériences utilisateur sophistiquées : formulaires multi-étapes, interfaces de configuration complexes, systèmes de création de contenu dynamique, et bien d'autres applications innovantes.

Pour progresser dans ce domaine, concentrez-vous sur la compréhension des patterns d'architecture pour les applications complexes, l'optimisation des performances pour les formulaires avec de nombreux champs, et l'accessibilité pour garantir une utilisation inclusive.

### Évolutions Futures

- **Web Components** : Encapsulation de formulaires réutilisables
- **React Hook Form / Vue Formulate** : Bibliothèques spécialisées
- **GraphQL** : Intégration avancée pour la gestion des données
- **Machine Learning** : Suggestions et validations intelligentes

Ces technologies émergentes promettent d'enrichir encore davantage les possibilités offertes par les formulaires dynamiques.
