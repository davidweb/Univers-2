import { create } from 'zustand';
import { UniverseState, Universe, Planet, Tile, TileDetail } from '../types/universe';
import { generateStars, generatePlanets, generatePlanetMap, generateTileDetail } from '../utils/generators';

// Cache local pour les détails des tuiles
const TILE_CACHE_KEY = 'univers_tile_cache';

function getTileCache(): Record<string, TileDetail> {
  try {
    const cached = localStorage.getItem(TILE_CACHE_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
}

function setTileCache(cache: Record<string, TileDetail>) {
  try {
    localStorage.setItem(TILE_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.warn('Impossible de sauvegarder le cache:', error);
  }
}

export const useUniverseStore = create<UniverseState>((set, get) => ({
  universe: null,
  selectedPlanet: null,
  planetMap: null,
  selectedTile: null,
  tileDetail: null,
  isLoading: false,
  error: null,

  generateUniverse: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulation d'un délai d'API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const stars = generateStars(30);
      const planets = generatePlanets(stars);
      
      const universe: Universe = {
        id: `universe-${Date.now()}`,
        name: `Univers-${new Date().getFullYear()}`,
        created_at: new Date().toISOString(),
        stars,
        planets
      };
      
      set({ 
        universe, 
        isLoading: false,
        selectedPlanet: null,
        planetMap: null,
        selectedTile: null,
        tileDetail: null
      });
    } catch (error) {
      set({ 
        error: 'Erreur lors de la génération de l\'univers', 
        isLoading: false 
      });
    }
  },

  eraseUniverse: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulation d'un délai d'API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Effacer le cache local
      localStorage.removeItem(TILE_CACHE_KEY);
      
      set({ 
        universe: null,
        selectedPlanet: null,
        planetMap: null,
        selectedTile: null,
        tileDetail: null,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: 'Erreur lors de l\'effacement de l\'univers', 
        isLoading: false 
      });
    }
  },

  selectPlanet: (planet: Planet) => {
    set({ selectedPlanet: planet, planetMap: null, selectedTile: null, tileDetail: null });
  },

  generatePlanetMap: async (planetId: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulation d'un délai d'API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const map = generatePlanetMap(planetId);
      set({ planetMap: map, isLoading: false });
    } catch (error) {
      set({ 
        error: 'Erreur lors de la génération de la carte', 
        isLoading: false 
      });
    }
  },

  selectTile: (tile: Tile) => {
    set({ selectedTile: tile });
  },

  fetchTileDetail: async (tileId: string, planetName: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Vérifier le cache local
      const cache = getTileCache();
      if (cache[tileId]) {
        set({ tileDetail: cache[tileId], isLoading: false });
        return;
      }
      
      // Simulation d'un appel API avec délai
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const { selectedTile } = get();
      if (!selectedTile) {
        throw new Error('Aucune tuile sélectionnée');
      }
      
      const detail = generateTileDetail(selectedTile, planetName);
      
      // Sauvegarder dans le cache
      const newCache = { ...cache, [tileId]: detail };
      setTileCache(newCache);
      
      set({ tileDetail: detail, isLoading: false });
    } catch (error) {
      set({ 
        error: 'Erreur lors du chargement des détails', 
        isLoading: false 
      });
    }
  },

  closeTileDetail: () => {
    set({ tileDetail: null, selectedTile: null });
  },

  goBackToSolarSystem: () => {
    set({ 
      selectedPlanet: null, 
      planetMap: null, 
      selectedTile: null, 
      tileDetail: null 
    });
  }
}));