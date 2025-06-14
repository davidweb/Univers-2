# Univers Explorer

Une application web PWA pour explorer des univers générés procéduralement avec des détails enrichis par l'intelligence artificielle.

## 🌟 Fonctionnalités

- **Génération procédurale** : Créez des univers uniques avec le "Big Bang"
- **Exploration interactive** : Naviguez du système solaire aux détails de chaque tuile
- **Intelligence artificielle** : Descriptions et métadonnées générées automatiquement
- **Cache local** : Consultation hors-ligne des détails précédemment chargés
- **PWA** : Installation possible sur tous les appareils
- **Design moderne** : Interface spatiale avec animations fluides

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+ 
- npm ou yarn

### Installation

```bash
# Cloner le projet
git clone <repository-url>
cd univers-explorer

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

### Build de production

```bash
# Construire l'application
npm run build

# Prévisualiser la build
npm run preview
```

## 🎮 Utilisation

1. **Générer un univers** : Cliquez sur "Big Bang" pour créer un nouvel univers
2. **Explorer le système solaire** : Les planètes vertes contiennent de la vie
3. **Visiter une planète** : Cliquez sur une planète pour voir sa surface
4. **Examiner les tuiles** : Cliquez sur une tuile pour obtenir des détails IA
5. **Navigation** : Utilisez les boutons de retour pour naviguer

## 🏗️ Architecture

```
src/
├── components/          # Composants React
│   ├── Controls.tsx     # Contrôles Big Bang/Écraser
│   ├── SolarSystem.tsx  # Vue système solaire
│   ├── PlanetMap.tsx    # Carte tuilée 20x20
│   └── TileInfo.tsx     # Modal détails IA
├── store/
│   └── universeStore.ts # État global Zustand
├── types/
│   └── universe.ts      # Types TypeScript
├── utils/
│   └── generators.ts    # Génération procédurale
└── App.tsx             # Composant principal
```

## 🎨 Design System

### Couleurs

- **Cosmic** : Bleus profonds pour l'interface spatiale
- **Life** : Verts pour indiquer la présence de vie
- **Energy** : Oranges pour les actions et l'énergie

### Composants

- Grille responsive 20x20 pour les cartes planétaires
- Animations fluides avec hover effects
- Modales avec backdrop blur
- Système de cache localStorage

## 🔧 Technologies

- **React 18** : Interface utilisateur
- **TypeScript** : Typage statique
- **Tailwind CSS** : Styles utilitaires
- **Zustand** : Gestion d'état
- **Vite** : Build tool et dev server
- **Lucide React** : Icônes
- **PWA** : Service worker et manifest

## 📱 PWA Features

- Installation sur écran d'accueil
- Fonctionnement hors-ligne
- Cache intelligent des données
- Manifest et icônes optimisées

## 🎯 Roadmap

- [ ] Intégration API backend avec Prisma
- [ ] Génération IA réelle avec Gemini
- [ ] Système de sauvegarde cloud
- [ ] Mode multijoueur
- [ ] Éditeur de planètes personnalisées

## 📄 Licence

MIT License - voir le fichier LICENSE pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! Consultez les issues ouvertes ou proposez de nouvelles fonctionnalités.

---

**Explorez l'infini, une tuile à la fois** ✨