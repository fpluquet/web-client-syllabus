import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'UE1208 - Web1',
  base: '/web-client-syllabus/',
  description: 'Guide complet pour apprendre la programmation web : HTML, CSS et JavaScript',
  themeConfig: {
    nav: [
      { text: 'Accueil', link: '/' },
      { text: 'HTML', link: '/html/structure-base' },
      { text: 'CSS', link: '/css/integration' },
      { text: 'JavaScript', link: '/javascript/variables-types' }
    ],    
    search: {
      provider: 'local'
    },
    outline: {
      level: 'deep',
      label: 'Sur cette page'
    },
    sidebar: {
      '/': [
        {
          text: '1. Fondamentaux HTML',
          collapsed: false,
          items: [
            { text: '1.1 Structure de base', link: '/html/structure-base' },
            { text: '1.2 Balises de contenu', link: '/html/balises-contenu' },
            { text: '1.3 Médias et liens', link: '/html/medias-liens' },
            { text: '1.4 Structures complexes', link: '/html/structures-complexes' }
          ]
        },
        {
          text: '2. Formulaires HTML',
          collapsed: false,
          items: [
            { text: '2.1 Éléments de base', link: '/html/formulaires-base' },
            { text: '2.2 Organisation', link: '/html/formulaires-organisation' }
          ]
        },
        {
          text: '3. Fondamentaux CSS',
          collapsed: false,
          items: [
            { text: '3.1 Intégration CSS', link: '/css/integration' },
            { text: '3.2 Sélecteurs', link: '/css/selecteurs' },
            { text: '3.3 Propriétés visuelles', link: '/css/proprietes-visuelles' },
            { text: '3.4 Mise en page', link: '/css/mise-en-page' }
          ]
        },
        {
          text: '4. Navigation et Menu',
          collapsed: false,
          items: [
            { text: '4.1 Menu horizontal', link: '/css/menu-horizontal' },
            { text: '4.2 Navigation responsive', link: '/css/navigation-responsive' },
            { text: '4.3 Navigation interne', link: '/css/navigation-interne' }
          ]
        },
        {
          text: '5. Animations et Transitions CSS',
          collapsed: false,
          items: [
            { text: '5.1 Transitions', link: '/css/transitions' },
            { text: '5.2 Animations CSS', link: '/css/animations' },
            { text: '5.3 Transformations', link: '/css/transformations' },
            { text: '5.4 Effets visuels avancés', link: '/css/effets-avances' }
          ]
        },
        {
          text: '6. Fondamentaux JavaScript',
          collapsed: false,
          items: [
            { text: '6.1 Variables et types', link: '/javascript/variables-types' },
            { text: '6.2 Structures de contrôle', link: '/javascript/structures-controle' },
            { text: '6.3 Fonctions', link: '/javascript/fonctions' },
            { text: '6.4 Algorithmes de base', link: '/javascript/algorithmes-base' }
          ]
        },
        {
          text: '7. JavaScript et DOM',
          collapsed: false,
          items: [
            { text: '7.1 Sélection d\'éléments', link: '/javascript/selection-elements' },
            { text: '7.2 Manipulation du contenu', link: '/javascript/manipulation-contenu' },
            { text: '7.3 Création et suppression d\'éléments', link: '/javascript/creation-suppression' },
            { text: '7.4 Styles et classes', link: '/javascript/styles-classes' }
          ]
        },
        {
          text: '8. Gestion des Événements',
          collapsed: false,
          items: [
            { text: '8.1 Événements de base', link: '/javascript/evenements-base' },
            { text: '8.2 Gestionnaires d\'événements', link: '/javascript/gestionnaires-evenements' },
            { text: '8.3 Validation en temps réel', link: '/javascript/validation-temps-reel' }
          ]
        },
        {
          text: '9. Interface Utilisateur Avancée',
          collapsed: false,
          items: [
            { text: '9.1 Formulaires dynamiques', link: '/javascript/formulaires-dynamiques' },
            { text: '9.2 Grilles et tableaux', link: '/javascript/grilles-tableaux' }
          ]
        },
        {
          text: '10. Programmation Asynchrone',
          collapsed: false,
          items: [
            { text: '10.1 Concepts de base', link: '/javascript/async-concepts' },
            { text: '10.2 API REST', link: '/javascript/api-rest' },
            { text: '10.3 Gestion d\'erreurs', link: '/javascript/gestion-erreurs' },
            { text: '10.4 Affichage de données', link: '/javascript/affichage-donnees' }
          ]
        },
        {
          text: '11. Stockage Local',
          collapsed: false,
          items: [
            { text: '11.1 LocalStorage', link: '/javascript/localstorage' },
            { text: '11.2 Persistance de données', link: '/javascript/persistance-donnees' }
          ]
        },
        {
          text: '12. Qualité et Bonnes Pratiques',
          collapsed: false,
          items: [
            { text: '12.1 Séparation des responsabilités', link: '/bonnes-pratiques/separation-responsabilites' },
            { text: '12.2 Code maintenable', link: '/bonnes-pratiques/code-maintenable' },
            { text: '12.3 Accessibilité', link: '/bonnes-pratiques/accessibilite' },
            { text: '12.4 Performance', link: '/bonnes-pratiques/performance' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],
    footer: {
      message: 'Cours de Programmation Web - HELHa',
      copyright: 'Copyright © 2025'
    }
  }
})
