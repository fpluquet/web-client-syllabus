# 12.3 Accessibilité

L’accessibilité web vise à rendre les sites utilisables par tous, y compris les personnes en situation de handicap (visuel, moteur, cognitif, etc.). Un site accessible améliore l’expérience de tous les utilisateurs et respecte la législation en vigueur dans de nombreux pays.

## Attributs `alt` pour les images

Chaque image doit posséder un attribut `alt` qui décrit son contenu ou sa fonction. Cela permet aux lecteurs d’écran de transmettre l’information à l’utilisateur.

**Exemple :**
```html
<img src="logo.png" alt="Logo de l’école HELHa">
```
**Astuce :** Si l’image est purement décorative, utilisez `alt=""` pour qu’elle soit ignorée par les technologies d’assistance.

## Labels explicites pour les formulaires

Associer chaque champ de formulaire à un label améliore la compréhension et la navigation, notamment pour les utilisateurs de lecteurs d’écran.

**Exemple :**
```html
<label for="email">Adresse e-mail :</label>
<input type="email" id="email" name="email">
```
**Astuce :** Cliquer sur le label place automatiquement le focus sur le champ associé.

## Navigation au clavier

Un site accessible doit pouvoir être parcouru entièrement au clavier (tabulation, touches fléchées, etc.). Le focus doit être visible pour savoir où l’on se trouve dans la page.

**Astuce :** Utilisez la pseudo-classe CSS `:focus` pour personnaliser l’apparence du focus.

## Contrastes de couleurs

Assurez-vous que le texte et les éléments importants sont suffisamment contrastés par rapport à leur arrière-plan. Cela facilite la lecture pour tous, notamment pour les personnes malvoyantes ou daltoniennes.

**Astuce :** Des outils en ligne comme WebAIM Contrast Checker permettent de vérifier rapidement le contraste de vos couleurs.

## Titres hiérarchiques

Structurez votre contenu avec des titres (`<h1>`, `<h2>`, etc.) dans l’ordre logique. Cela aide à la navigation, notamment pour les utilisateurs de lecteurs d’écran qui peuvent parcourir la page par titres.

**Astuce :** N’utilisez qu’un seul `<h1>` par page et respectez la hiérarchie (pas de saut de niveau).
