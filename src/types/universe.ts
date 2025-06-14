export interface Star {
  id: string;
  name: string;
  x: number;
  y: number;
  size: number;
  color: string;
  temperature: number;
}

export interface Planet {
  id: string;
  name: string;
  starId: string;
  x: number;
  y: number;
  size: number;
  hasLife: boolean;
  type: 'rocky' | 'gas' | 'ice' | 'desert' | 'ocean';
  temperature: number;
  atmosphere: string[];
}

export interface Tile {
  id: string;
  planetId: string;
  x: number;
  y: number;
  type: 'water' | 'land' | 'forest' | 'city' | 'ruins' | 'desert' | 'mountain' | 'ice';
  elevation: number;
  temperature: number;
  humidity: number;
  resources: string[];
}

export interface TileDetail {
  id: string;
  tileId: string;
  title: string;
  description: string;
  metadata: {
    population?: number;
    era?: string;
    resources: string[];
    danger_level: number;
    points_of_interest: string[];
  };
  generated_at: string;
}

export interface Universe {
  id: string;
  name: string;
  created_at: string;
  stars: Star[];
  planets: Planet[];
}

export interface UniverseState {
  universe: Universe | null;
  selectedPlanet: Planet | null;
  planetMap: Tile[][] | null;
  selectedTile: Tile | null;
  tileDetail: TileDetail | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  generateUniverse: () => Promise<void>;
  eraseUniverse: () => Promise<void>;
  selectPlanet: (planet: Planet) => void;
  generatePlanetMap: (planetId: string) => Promise<void>;
  selectTile: (tile: Tile) => void;
  fetchTileDetail: (tileId: string, planetName: string) => Promise<void>;
  closeTileDetail: () => void;
  goBackToSolarSystem: () => void;
}