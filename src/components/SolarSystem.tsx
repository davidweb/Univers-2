import React, { useEffect } from 'react';
import { ArrowLeft, Loader2, Star, Globe } from 'lucide-react';
import { useUniverseStore } from '../store/universeStore';

export function SolarSystem() {
  const { 
    universe, 
    selectedPlanet, 
    selectPlanet, 
    generatePlanetMap, 
    isLoading,
    goBackToSolarSystem 
  } = useUniverseStore();

  useEffect(() => {
    if (selectedPlanet) {
      generatePlanetMap(selectedPlanet.id);
    }
  }, [selectedPlanet, generatePlanetMap]);

  if (!universe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-cosmic-300">
        <Star className="w-16 h-16 mb-4 opacity-50" />
        <p className="text-xl">Aucun univers généré</p>
        <p className="text-sm mt-2">Cliquez sur "Big Bang" pour créer un univers</p>
      </div>
    );
  }

  if (selectedPlanet) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={goBackToSolarSystem}
            className="flex items-center gap-2 px-4 py-2 bg-cosmic-700 hover:bg-cosmic-600 
                     text-white rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au système solaire
          </button>
          
          <div className="text-right">
            <h2 className="text-2xl font-bold text-white">{selectedPlanet.name}</h2>
            <p className="text-cosmic-300 capitalize">
              Planète {selectedPlanet.type} • {selectedPlanet.hasLife ? 'Avec vie' : 'Sans vie'}
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-cosmic-400 mx-auto mb-4" />
              <p className="text-cosmic-300">Génération de la carte planétaire...</p>
            </div>
          </div>
        ) : (
          <div className="bg-cosmic-800 rounded-xl p-6 border border-cosmic-700">
            <h3 className="text-lg font-semibold text-white mb-4">Surface de {selectedPlanet.name}</h3>
            <div className="text-sm text-cosmic-300 mb-4">
              Cliquez sur une tuile pour explorer ses détails
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">{universe.name}</h2>
        <p className="text-cosmic-300">
          {universe.stars.length} étoiles • {universe.planets.length} planètes
        </p>
        <p className="text-sm text-cosmic-400 mt-1">
          Cliquez sur une planète pour l'explorer
        </p>
      </div>

      <div className="relative bg-gradient-to-b from-cosmic-950 to-cosmic-900 rounded-xl p-8 
                    min-h-[600px] border border-cosmic-700 overflow-hidden">
        {/* Étoiles */}
        {universe.stars.map((star) => (
          <div
            key={star.id}
            className="absolute animate-pulse-slow"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div
              className="rounded-full animate-glow"
              style={{
                width: `${star.size * 4}px`,
                height: `${star.size * 4}px`,
                backgroundColor: star.color,
                boxShadow: `0 0 ${star.size * 8}px ${star.color}50`
              }}
            />
          </div>
        ))}

        {/* Planètes */}
        {universe.planets.map((planet) => (
          <button
            key={planet.id}
            onClick={() => selectPlanet(planet)}
            className="absolute group transition-all duration-300 transform hover:scale-125 
                     hover:z-10 focus:outline-none focus:ring-2 focus:ring-cosmic-400 rounded-full"
            style={{
              left: `${Math.max(5, Math.min(95, planet.x))}%`,
              top: `${Math.max(5, Math.min(95, planet.y))}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div
              className={`rounded-full border-2 transition-all duration-300 ${
                planet.hasLife 
                  ? 'bg-life-500 border-life-400 shadow-lg shadow-life-500/50' 
                  : 'bg-gray-600 border-gray-500 shadow-lg shadow-gray-500/30'
              } group-hover:shadow-xl`}
              style={{
                width: `${planet.size * 12}px`,
                height: `${planet.size * 12}px`
              }}
            />
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                          bg-cosmic-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap 
                          border border-cosmic-600 shadow-lg z-20">
              <div className="font-semibold">{planet.name}</div>
              <div className="text-cosmic-300 capitalize">
                {planet.type} • {planet.hasLife ? 'Vie détectée' : 'Stérile'}
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                            border-4 border-transparent border-t-cosmic-800"></div>
            </div>
          </button>
        ))}

        {/* Légende */}
        <div className="absolute bottom-4 left-4 bg-cosmic-800/90 rounded-lg p-4 border border-cosmic-600">
          <h4 className="text-white font-semibold mb-2 text-sm">Légende</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-life-500 border border-life-400"></div>
              <span className="text-cosmic-200">Planète avec vie</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-600 border border-gray-500"></div>
              <span className="text-cosmic-200">Planète stérile</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-3 h-3 text-energy-400" />
              <span className="text-cosmic-200">Étoile</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}