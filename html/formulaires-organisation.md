# 2.2 Organisation des formulaires

## Introduction

L'organisation des formulaires est cruciale pour créer des interfaces utilisateur intuitives et accessibles. Une bonne structure améliore l'expérience utilisateur et facilite la validation des données.

## Structure logique des formulaires

### Groupement avec fieldset et legend

```html
<form id="inscription-form">
  <fieldset>
    <legend>Informations personnelles</legend>
    <div class="form-group">
      <label for="prenom">Prénom :</label>
      <input type="text" id="prenom" name="prenom" required>
    </div>
    <div class="form-group">
      <label for="nom">Nom :</label>
      <input type="text" id="nom" name="nom" required>
    </div>
    <div class="form-group">
      <label for="email">Email :</label>
      <input type="email" id="email" name="email" required>
    </div>
  </fieldset>

  <fieldset>
    <legend>Adresse</legend>
    <div class="form-group">
      <label for="rue">Rue :</label>
      <input type="text" id="rue" name="rue" required>
    </div>
    <div class="form-group">
      <label for="ville">Ville :</label>
      <input type="text" id="ville" name="ville" required>
    </div>
    <div class="form-group">
      <label for="code-postal">Code postal :</label>
      <input type="text" id="code-postal" name="codePostal" 
             pattern="[0-9]{5}" required>
    </div>
  </fieldset>

  <fieldset>
    <legend>Préférences</legend>
    <div class="form-group">
      <input type="checkbox" id="newsletter" name="newsletter">
      <label for="newsletter">Recevoir la newsletter</label>
    </div>
    <div class="form-group">
      <input type="checkbox" id="sms" name="sms">
      <label for="sms">Recevoir les SMS promotionnels</label>
    </div>
  </fieldset>

  <div class="form-actions">
    <button type="submit">S'inscrire</button>
    <button type="reset">Réinitialiser</button>
  </div>
</form>
```

### Organisation en étapes

```html
<form id="commande-form" class="multi-step-form">
  <!-- Étape 1 : Produits -->
  <div class="step active" data-step="1">
    <h3>Étape 1 : Sélection des produits</h3>
    <fieldset>
      <legend>Produits disponibles</legend>
      <div class="product-list">
        <div class="product-item">
          <input type="checkbox" id="prod1" name="produits" value="laptop">
          <label for="prod1">
            <img src="laptop.jpg" alt="Laptop">
            <span>Laptop - 999€</span>
          </label>
        </div>
        <div class="product-item">
          <input type="checkbox" id="prod2" name="produits" value="souris">
          <label for="prod2">
            <img src="souris.jpg" alt="Souris">
            <span>Souris - 25€</span>
          </label>
        </div>
      </div>
    </fieldset>
  </div>

  <!-- Étape 2 : Informations client -->
  <div class="step" data-step="2">
    <h3>Étape 2 : Vos informations</h3>
    <fieldset>
      <legend>Coordonnées</legend>
      <div class="form-row">
        <div class="form-group">
          <label for="client-prenom">Prénom :</label>
          <input type="text" id="client-prenom" name="prenom" required>
        </div>
        <div class="form-group">
          <label for="client-nom">Nom :</label>
          <input type="text" id="client-nom" name="nom" required>
        </div>
      </div>
      <div class="form-group">
        <label for="client-email">Email :</label>
        <input type="email" id="client-email" name="email" required>
      </div>
    </fieldset>
  </div>

  <!-- Étape 3 : Paiement -->
  <div class="step" data-step="3">
    <h3>Étape 3 : Paiement</h3>
    <fieldset>
      <legend>Mode de paiement</legend>
      <div class="payment-methods">
        <input type="radio" id="carte" name="paiement" value="carte" required>
        <label for="carte">Carte bancaire</label>
        
        <input type="radio" id="paypal" name="paiement" value="paypal" required>
        <label for="paypal">PayPal</label>
        
        <input type="radio" id="virement" name="paiement" value="virement" required>
        <label for="virement">Virement bancaire</label>
      </div>
    </fieldset>
  </div>

  <!-- Navigation entre étapes -->
  <div class="step-navigation">
    <button type="button" class="btn-prev" disabled>Précédent</button>
    <div class="step-indicator">
      <span class="step-dot active" data-step="1">1</span>
      <span class="step-dot" data-step="2">2</span>
      <span class="step-dot" data-step="3">3</span>
    </div>
    <button type="button" class="btn-next">Suivant</button>
    <button type="submit" class="btn-submit" style="display: none;">Commander</button>
  </div>
</form>
```

## Mise en page responsive

### Grille adaptative

```css
.form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

/* Fieldset styling */
fieldset {
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

legend {
  font-weight: 700;
  font-size: 1.2rem;
  color: #495057;
  padding: 0 1rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .form-container {
    padding: 1rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  fieldset {
    padding: 1rem;
  }
}
```

### Formulaires adaptatifs

```html
<form class="adaptive-form">
  <div class="form-section">
    <h3>Informations de base</h3>
    <div class="form-grid">
      <div class="form-item span-2">
        <label for="titre">Titre de civilité :</label>
        <select id="titre" name="titre">
          <option value="">Sélectionnez</option>
          <option value="mr">Monsieur</option>
          <option value="mme">Madame</option>
          <option value="dr">Docteur</option>
        </select>
      </div>
      
      <div class="form-item span-3">
        <label for="nom-complet">Nom complet :</label>
        <input type="text" id="nom-complet" name="nomComplet" required>
      </div>
      
      <div class="form-item span-3">
        <label for="email-principal">Email :</label>
        <input type="email" id="email-principal" name="email" required>
      </div>
      
      <div class="form-item span-2">
        <label for="telephone">Téléphone :</label>
        <input type="tel" id="telephone" name="telephone">
      </div>
    </div>
  </div>

  <div class="form-section">
    <h3>Adresse complète</h3>
    <div class="form-grid">
      <div class="form-item span-4">
        <label for="adresse">Adresse :</label>
        <input type="text" id="adresse" name="adresse" required>
      </div>
      
      <div class="form-item span-2">
        <label for="code-postal-2">Code postal :</label>
        <input type="text" id="code-postal-2" name="codePostal" 
               pattern="[0-9]{5}" required>
      </div>
      
      <div class="form-item span-3">
        <label for="ville-2">Ville :</label>
        <input type="text" id="ville-2" name="ville" required>
      </div>
      
      <div class="form-item span-3">
        <label for="pays">Pays :</label>
        <select id="pays" name="pays" required>
          <option value="">Sélectionnez un pays</option>
          <option value="fr">France</option>
          <option value="be">Belgique</option>
          <option value="ch">Suisse</option>
          <option value="ca">Canada</option>
        </select>
      </div>
    </div>
  </div>
</form>

<style>
.adaptive-form {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.form-section {
  margin-bottom: 3rem;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.form-section h3 {
  margin-bottom: 1.5rem;
  color: #495057;
  border-bottom: 2px solid #dee2e6;
  padding-bottom: 0.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
  align-items: end;
}

.form-item {
  display: flex;
  flex-direction: column;
}

.span-2 { grid-column: span 2; }
.span-3 { grid-column: span 3; }
.span-4 { grid-column: span 4; }
.span-6 { grid-column: span 6; }

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .span-2,
  .span-3,
  .span-4,
  .span-6 {
    grid-column: span 1;
  }
}
</style>
```

## Validation et feedback

### Messages d'erreur intégrés

```html
<form class="validated-form" novalidate>
  <div class="form-group">
    <label for="username">Nom d'utilisateur :</label>
    <input type="text" id="username" name="username" 
           required minlength="3" maxlength="20"
           pattern="[a-zA-Z0-9_]+"
           aria-describedby="username-help username-error">
    <div class="form-help" id="username-help">
      3-20 caractères, lettres, chiffres et underscore uniquement
    </div>
    <div class="form-error" id="username-error" role="alert"></div>
  </div>

  <div class="form-group">
    <label for="password">Mot de passe :</label>
    <input type="password" id="password" name="password" 
           required minlength="8"
           aria-describedby="password-help password-error">
    <div class="form-help" id="password-help">
      Au moins 8 caractères avec majuscule, minuscule et chiffre
    </div>
    <div class="form-error" id="password-error" role="alert"></div>
    <div class="password-strength">
      <div class="strength-bar">
        <div class="strength-fill"></div>
      </div>
      <span class="strength-text">Faible</span>
    </div>
  </div>

  <div class="form-group">
    <label for="confirm-password">Confirmer le mot de passe :</label>
    <input type="password" id="confirm-password" name="confirmPassword" 
           required aria-describedby="confirm-error">
    <div class="form-error" id="confirm-error" role="alert"></div>
  </div>

  <button type="submit">Créer le compte</button>
</form>

<style>
.validated-form .form-group {
  position: relative;
  margin-bottom: 2rem;
}

.form-help {
  font-size: 0.875rem;
  color: #6c757d;
  margin-top: 0.25rem;
}

.form-error {
  font-size: 0.875rem;
  color: #dc3545;
  margin-top: 0.25rem;
  min-height: 1.2rem;
}

.form-group.valid input {
  border-color: #28a745;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='m2.3 6.73.75-.75a.75.75 0 0 1 1.06 0l.69.69 2.84-2.84a.75.75 0 0 1 1.06 1.06L5.37 8.31a.75.75 0 0 1-1.06 0L2.3 6.73z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  padding-right: 3rem;
}

.form-group.invalid input {
  border-color: #dc3545;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath d='m6 3v2'/%3e%3cpath d='m6 8.5h.01'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  padding-right: 3rem;
}

.password-strength {
  margin-top: 0.5rem;
}

.strength-bar {
  height: 4px;
  background: #e9ecef;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 0.25rem;
}

.strength-fill {
  height: 100%;
  width: 0%;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.strength-weak .strength-fill {
  width: 25%;
  background: #dc3545;
}

.strength-fair .strength-fill {
  width: 50%;
  background: #ffc107;
}

.strength-good .strength-fill {
  width: 75%;
  background: #fd7e14;
}

.strength-strong .strength-fill {
  width: 100%;
  background: #28a745;
}

.strength-text {
  font-size: 0.75rem;
  font-weight: 600;
}
</style>
```

## Exemple pratique complet

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Organisation des formulaires</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f7fa;
      padding: 2rem 1rem;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
    }

    .form-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
      overflow: hidden;
      margin-bottom: 2rem;
    }

    .form-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem;
      text-align: center;
    }

    .form-header h1 {
      margin-bottom: 0.5rem;
      font-size: 2rem;
    }

    .form-body {
      padding: 2rem;
    }

    /* Multi-step form styles */
    .multi-step-form .step {
      display: none;
      animation: fadeIn 0.3s ease-in;
    }

    .multi-step-form .step.active {
      display: block;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateX(20px); }
      to { opacity: 1; transform: translateX(0); }
    }

    .step-navigation {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 2rem;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .step-indicator {
      display: flex;
      gap: 1rem;
    }

    .step-dot {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #dee2e6;
      color: #6c757d;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      position: relative;
      transition: all 0.3s ease;
    }

    .step-dot.active {
      background: #007bff;
      color: white;
    }

    .step-dot.completed {
      background: #28a745;
      color: white;
    }

    .step-dot.completed::after {
      content: '✓';
    }

    /* Product selection styles */
    .product-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .product-item {
      border: 2px solid #e9ecef;
      border-radius: 8px;
      padding: 1rem;
      text-align: center;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .product-item:hover {
      border-color: #007bff;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15);
    }

    .product-item input {
      margin-bottom: 1rem;
      transform: scale(1.2);
    }

    .product-item label {
      cursor: pointer;
      display: block;
    }

    .product-item img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 4px;
      margin-bottom: 1rem;
      background: #e9ecef;
    }

    /* Payment methods */
    .payment-methods {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .payment-methods input[type="radio"] {
      display: none;
    }

    .payment-methods label {
      display: block;
      padding: 1.5rem;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 600;
    }

    .payment-methods label:hover {
      border-color: #007bff;
      background: #f8f9fa;
    }

    .payment-methods input[type="radio"]:checked + label {
      border-color: #007bff;
      background: #e3f2fd;
      color: #007bff;
    }

    /* Buttons */
    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-block;
    }

    .btn-primary {
      background: #007bff;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background: #0056b3;
      transform: translateY(-1px);
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-secondary:hover:not(:disabled) {
      background: #545b62;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* Form elements */
    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #495057;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ced4da;
      border-radius: 6px;
      font-size: 1rem;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }

    .form-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }

    /* Fieldset styling */
    fieldset {
      border: 2px solid #e9ecef;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 2rem;
    }

    legend {
      font-weight: 700;
      font-size: 1.1rem;
      color: #495057;
      padding: 0 1rem;
      background: white;
    }

    /* Summary section */
    .order-summary {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 1.5rem;
      margin-top: 2rem;
    }

    .summary-item {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      border-bottom: 1px solid #dee2e6;
    }

    .summary-item:last-child {
      border-bottom: none;
      font-weight: 700;
      font-size: 1.1rem;
      margin-top: 0.5rem;
      padding-top: 1rem;
      border-top: 2px solid #dee2e6;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .container {
        padding: 0;
      }

      .form-body {
        padding: 1rem;
      }

      .step-navigation {
        flex-direction: column;
        gap: 1rem;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .product-list {
        grid-template-columns: 1fr;
      }

      .payment-methods {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="form-card">
      <div class="form-header">
        <h1>Commande en ligne</h1>
        <p>Processus simple en 3 étapes</p>
      </div>
      
      <div class="form-body">
        <form id="order-form" class="multi-step-form">
          <!-- Étape 1 : Sélection des produits -->
          <div class="step active" data-step="1">
            <h3>Étape 1 : Choisissez vos produits</h3>
            <fieldset>
              <legend>Produits disponibles</legend>
              <div class="product-list">
                <div class="product-item">
                  <input type="checkbox" id="laptop" name="products" value="laptop" data-price="999">
                  <label for="laptop">
                    <div style="width: 80px; height: 80px; background: #e9ecef; margin: 0 auto 1rem; border-radius: 4px; display: flex; align-items: center; justify-content: center;">💻</div>
                    <div>Laptop Pro</div>
                    <div style="font-weight: bold; color: #007bff;">999€</div>
                  </label>
                </div>
                
                <div class="product-item">
                  <input type="checkbox" id="mouse" name="products" value="mouse" data-price="25">
                  <label for="mouse">
                    <div style="width: 80px; height: 80px; background: #e9ecef; margin: 0 auto 1rem; border-radius: 4px; display: flex; align-items: center; justify-content: center;">🖱️</div>
                    <div>Souris Gaming</div>
                    <div style="font-weight: bold; color: #007bff;">25€</div>
                  </label>
                </div>
                
                <div class="product-item">
                  <input type="checkbox" id="keyboard" name="products" value="keyboard" data-price="75">
                  <label for="keyboard">
                    <div style="width: 80px; height: 80px; background: #e9ecef; margin: 0 auto 1rem; border-radius: 4px; display: flex; align-items: center; justify-content: center;">⌨️</div>
                    <div>Clavier Mécanique</div>
                    <div style="font-weight: bold; color: #007bff;">75€</div>
                  </label>
                </div>
                
                <div class="product-item">
                  <input type="checkbox" id="monitor" name="products" value="monitor" data-price="299">
                  <label for="monitor">
                    <div style="width: 80px; height: 80px; background: #e9ecef; margin: 0 auto 1rem; border-radius: 4px; display: flex; align-items: center; justify-content: center;">🖥️</div>
                    <div>Écran 4K</div>
                    <div style="font-weight: bold; color: #007bff;">299€</div>
                  </label>
                </div>
              </div>
            </fieldset>
          </div>

          <!-- Étape 2 : Informations client -->
          <div class="step" data-step="2">
            <h3>Étape 2 : Vos informations</h3>
            <fieldset>
              <legend>Informations personnelles</legend>
              <div class="form-row">
                <div class="form-group">
                  <label for="firstName">Prénom :</label>
                  <input type="text" id="firstName" name="firstName" required>
                </div>
                <div class="form-group">
                  <label for="lastName">Nom :</label>
                  <input type="text" id="lastName" name="lastName" required>
                </div>
              </div>
              <div class="form-group">
                <label for="email">Email :</label>
                <input type="email" id="email" name="email" required>
              </div>
              <div class="form-group">
                <label for="phone">Téléphone :</label>
                <input type="tel" id="phone" name="phone">
              </div>
            </fieldset>

            <fieldset>
              <legend>Adresse de livraison</legend>
              <div class="form-group">
                <label for="address">Adresse :</label>
                <input type="text" id="address" name="address" required>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="postalCode">Code postal :</label>
                  <input type="text" id="postalCode" name="postalCode" required>
                </div>
                <div class="form-group">
                  <label for="city">Ville :</label>
                  <input type="text" id="city" name="city" required>
                </div>
              </div>
            </fieldset>
          </div>

          <!-- Étape 3 : Paiement -->
          <div class="step" data-step="3">
            <h3>Étape 3 : Paiement et confirmation</h3>
            
            <div class="order-summary">
              <h4>Récapitulatif de votre commande</h4>
              <div id="order-items"></div>
              <div class="summary-item">
                <span>Total :</span>
                <span id="total-price">0€</span>
              </div>
            </div>

            <fieldset style="margin-top: 2rem;">
              <legend>Mode de paiement</legend>
              <div class="payment-methods">
                <input type="radio" id="credit-card" name="payment" value="credit-card" required>
                <label for="credit-card">
                  💳<br>Carte bancaire
                </label>
                
                <input type="radio" id="paypal" name="payment" value="paypal" required>
                <label for="paypal">
                  🅿️<br>PayPal
                </label>
                
                <input type="radio" id="bank-transfer" name="payment" value="bank-transfer" required>
                <label for="bank-transfer">
                  🏦<br>Virement bancaire
                </label>
              </div>
            </fieldset>
          </div>

          <!-- Navigation -->
          <div class="step-navigation">
            <button type="button" class="btn btn-secondary btn-prev" disabled>Précédent</button>
            
            <div class="step-indicator">
              <span class="step-dot active" data-step="1">1</span>
              <span class="step-dot" data-step="2">2</span>
              <span class="step-dot" data-step="3">3</span>
            </div>
            
            <button type="button" class="btn btn-primary btn-next">Suivant</button>
            <button type="submit" class="btn btn-primary btn-submit" style="display: none;">Confirmer la commande</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <script>
    // Gestion du formulaire multi-étapes
    class MultiStepForm {
      constructor(formId) {
        this.form = document.getElementById(formId);
        this.currentStep = 1;
        this.totalSteps = 3;
        
        this.initializeElements();
        this.bindEvents();
        this.updateSummary();
      }
      
      initializeElements() {
        this.steps = this.form.querySelectorAll('.step');
        this.stepDots = this.form.querySelectorAll('.step-dot');
        this.prevBtn = this.form.querySelector('.btn-prev');
        this.nextBtn = this.form.querySelector('.btn-next');
        this.submitBtn = this.form.querySelector('.btn-submit');
      }
      
      bindEvents() {
        this.prevBtn.addEventListener('click', () => this.goToPrevStep());
        this.nextBtn.addEventListener('click', () => this.goToNextStep());
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Écouter les changements de produits
        this.form.querySelectorAll('input[name="products"]').forEach(input => {
          input.addEventListener('change', () => this.updateSummary());
        });
      }
      
      goToNextStep() {
        if (this.validateCurrentStep() && this.currentStep < this.totalSteps) {
          this.currentStep++;
          this.updateDisplay();
        }
      }
      
      goToPrevStep() {
        if (this.currentStep > 1) {
          this.currentStep--;
          this.updateDisplay();
        }
      }
      
      updateDisplay() {
        // Mettre à jour les étapes
        this.steps.forEach((step, index) => {
          step.classList.toggle('active', index + 1 === this.currentStep);
        });
        
        // Mettre à jour les indicateurs
        this.stepDots.forEach((dot, index) => {
          dot.classList.remove('active', 'completed');
          if (index + 1 === this.currentStep) {
            dot.classList.add('active');
          } else if (index + 1 < this.currentStep) {
            dot.classList.add('completed');
          }
        });
        
        // Mettre à jour les boutons
        this.prevBtn.disabled = this.currentStep === 1;
        
        if (this.currentStep === this.totalSteps) {
          this.nextBtn.style.display = 'none';
          this.submitBtn.style.display = 'inline-block';
          this.updateSummary();
        } else {
          this.nextBtn.style.display = 'inline-block';
          this.submitBtn.style.display = 'none';
        }
      }
      
      validateCurrentStep() {
        const currentStepElement = this.steps[this.currentStep - 1];
        const requiredInputs = currentStepElement.querySelectorAll('[required]');
        
        let isValid = true;
        
        // Validation spéciale pour l'étape 1 (au moins un produit sélectionné)
        if (this.currentStep === 1) {
          const selectedProducts = this.form.querySelectorAll('input[name="products"]:checked');
          if (selectedProducts.length === 0) {
            alert('Veuillez sélectionner au moins un produit.');
            return false;
          }
        }
        
        // Validation des champs requis
        requiredInputs.forEach(input => {
          if (!input.value.trim()) {
            input.focus();
            input.style.borderColor = '#dc3545';
            isValid = false;
          } else {
            input.style.borderColor = '#28a745';
          }
        });
        
        if (!isValid) {
          alert('Veuillez remplir tous les champs obligatoires.');
        }
        
        return isValid;
      }
      
      updateSummary() {
        const selectedProducts = this.form.querySelectorAll('input[name="products"]:checked');
        const orderItems = document.getElementById('order-items');
        const totalPrice = document.getElementById('total-price');
        
        let total = 0;
        let itemsHTML = '';
        
        selectedProducts.forEach(product => {
          const price = parseInt(product.dataset.price);
          const label = product.parentElement.querySelector('label').textContent.split('\n')[1];
          
          total += price;
          itemsHTML += `
            <div class="summary-item">
              <span>${label}</span>
              <span>${price}€</span>
            </div>
          `;
        });
        
        orderItems.innerHTML = itemsHTML;
        totalPrice.textContent = `${total}€`;
      }
      
      handleSubmit(e) {
        e.preventDefault();
        
        if (this.validateCurrentStep()) {
          // Simulation de traitement de commande
          const formData = new FormData(this.form);
          const orderData = {};
          
          for (let [key, value] of formData.entries()) {
            if (orderData[key]) {
              if (Array.isArray(orderData[key])) {
                orderData[key].push(value);
              } else {
                orderData[key] = [orderData[key], value];
              }
            } else {
              orderData[key] = value;
            }
          }
          
          alert('Commande confirmée ! Vous recevrez un email de confirmation.');
          console.log('Données de commande:', orderData);
          
          // Réinitialiser le formulaire
          this.form.reset();
          this.currentStep = 1;
          this.updateDisplay();
          this.updateSummary();
        }
      }
    }
    
    // Initialiser le formulaire
    document.addEventListener('DOMContentLoaded', () => {
      new MultiStepForm('order-form');
    });
  </script>
</body>
</html>
```


## Bonnes pratiques

1. **Structure logique** avec fieldset et legend
2. **Validation progressive** à chaque étape
3. **Feedback visuel** immédiat
4. **Accessibilité** avec ARIA
5. **Responsive design** pour tous les appareils

## Résumé

L'organisation des formulaires améliore significativement l'expérience utilisateur. Une structure claire, une validation appropriée et un design responsive sont essentiels pour créer des formulaires efficaces et accessibles.
