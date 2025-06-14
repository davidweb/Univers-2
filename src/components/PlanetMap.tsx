import React from 'react';
import { 
  Droplets, 
  Globe, 
  Trees, 
  Building, 
  Archive, 
  Sun, 
  Mountain, 
  Snowflake 
} from 'lucide-react';
import { useUniverseStore } from '../store/universeStore';
import { Tile } from '../types/universe';

const tileIcons = {
  water: Droplets,
  land: Globe,
  forest: Trees,
  city: Building,
  ruins: Archive,
  desert: Sun,
  mountain: Mountain,
  ice: Snowflake
};

const tileColors = {
  water: 'bg-blue-400 hover:bg-blue-300 border-blue-500',
  land: 'bg-yellow-200 hover:bg-yellow-100 border-yellow-300',
  forest: 'bg-green-500 hover:bg-green-400 border-green-600',
  city: 'bg-gray-800 hover:bg-gray-700 border-gray-600 text-white',
  ruins: 'bg-gray-500 hover:bg-gray-400 border-gray-600 text-white',
  desert: 'bg-orange-300 hover:bg-orange-200 border-orange-400',
  mountain: 'bg-gray-600 hover:bg-gray-500 border-gray-700 text-white',
  ice: 'bg-cyan-200 hover:bg-cyan-100 border-cyan-300'
};

export function PlanetMap() {
  const { planetMap, selectedPlanet, selectTile, fetchTileDetail } = useUniverseStore();

  if (!planetMap || !selectedPlanet) {
    return null;
  }

  const handleTileClick = (tile: Tile) => {
    selectTile(tile);
    fetchTileDetail(tile.id, selectedPlanet.name);
  };

  return (
    <div className="bg-cosmic-800 rounded-xl p-6 border border-cosmic-700">
      <div className="grid grid-cols-20 gap-1 max-w-4xl mx-auto">
        {planetMap.flat().map((tile) => {
          const IconComponent = tileIcons[tile.type];
          const colorClasses = tileColors[tile.type];
          
          return (
            <button
              key={tile.id}
              onClick={() => handleTileClick(tile)}
              className={`
                w-6 h-6 rounded border-2 transition-all duration-200 
                transform hover:scale-110 hover:z-10 relative
                focus:outline-none focus:ring-2 focus:ring-cosmic-400
                ${colorClasses}
              `}
              title={`${tile.type} (${tile.x}, ${tile.y})`}
            >
              <IconComponent className="w-3 h-3 mx-auto" />
            </button>
          );
        })}
      </div>
      
      {/* Légende de la carte */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        {Object.entries(tileIcons).map(([type, IconComponent]) => (
          <div key={type} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded border flex items-center justify-center ${tileColors[type as keyof typeof tileColors]}`}>
              <IconComponent className="w-2 h-2" />
            </div>
            <span className="text-cosmic-200 capitalize">
              {type === 'water' ? 'Eau' :
               type === 'land' ? 'Terre' :
               type === 'forest' ? 'Forêt' :
               type === 'city' ? 'Cité' :
               type === 'ruins' ? 'Ruines' :
               type === 'desert' ? 'Désert' :
               type === 'mountain' ? 'Montagne' :
               type === 'ice' ? 'Glace' : type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}