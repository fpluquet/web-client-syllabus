# 12.2 Code maintenable

Un code maintenable est un code facile à comprendre, à modifier et à faire évoluer par soi-même ou par d’autres développeurs. Voici les bonnes pratiques à adopter :

## Nommage cohérent et explicite

Choisissez des noms de variables, fonctions et classes qui reflètent clairement leur rôle ou leur contenu. Un bon nom évite d’avoir à lire tout le code pour comprendre ce qu’il fait.

**Exemple :**
```js
let nombreEtudiants = 25;
function calculerMoyenne(notes) { /* ... */ }
```
**Astuce :** Privilégiez l’anglais pour les noms si le projet est international, sinon restez cohérent dans la langue utilisée.

## Commentaires pertinents

Commentez les parties complexes ou les choix techniques importants, mais évitez les commentaires inutiles qui répètent ce que le code dit déjà.

**Exemple :**
```js
// Calcul de la moyenne des notes
let moyenne = somme / nombreNotes;
```
**Astuce :** Mettez à jour les commentaires si le code change, pour éviter les incohérences.

## Organisation en modules ou fonctions réutilisables

Découpez votre code en fonctions ou modules qui remplissent chacun une tâche précise. Cela facilite la réutilisation et la maintenance.

**Exemple :**
```js
function afficherMessage(message) {
  alert(message);
}
```

## Limiter la duplication de code

Évitez de copier-coller des blocs identiques : créez plutôt une fonction ou un module réutilisable. Cela réduit les erreurs et simplifie les modifications futures.

**Astuce :** Si vous modifiez une logique, vous n’aurez qu’un seul endroit à corriger.

## Respecter l’indentation et la lisibilité

Un code bien indenté et aéré est plus facile à lire et à comprendre. Utilisez des conventions d’indentation (2 ou 4 espaces) et aérez votre code avec des sauts de ligne entre les blocs logiques.

**Astuce :** Utilisez un linter ou un formateur automatique (comme Prettier) pour garder un style homogène dans tout le projet.
