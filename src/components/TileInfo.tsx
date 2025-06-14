import React from 'react';
import { X, Loader2, MapPin, Thermometer, Droplets, Users, Calendar, AlertTriangle } from 'lucide-react';
import { useUniverseStore } from '../store/universeStore';

export function TileInfo() {
  const { tileDetail, selectedTile, closeTileDetail, isLoading, error } = useUniverseStore();

  if (!selectedTile && !tileDetail && !isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-cosmic-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-cosmic-600 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-cosmic-700">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-cosmic-400" />
            <div>
              <h2 className="text-xl font-bold text-white">
                {tileDetail?.title || 'Chargement...'}
              </h2>
              {selectedTile && (
                <p className="text-cosmic-300 text-sm">
                  Position: ({selectedTile.x}, {selectedTile.y}) • Type: {selectedTile.type}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={closeTileDetail}
            className="p-2 hover:bg-cosmic-700 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-cosmic-300" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-cosmic-400 mx-auto mb-4" />
                <p className="text-cosmic-300">Génération des détails par IA...</p>
                <p className="text-cosmic-400 text-sm mt-2">
                  Analyse de la région en cours
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <p className="text-red-300 mb-2">Erreur de chargement</p>
              <p className="text-cosmic-400 text-sm">{error}</p>
            </div>
          ) : tileDetail ? (
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                <p className="text-cosmic-200 leading-relaxed">
                  {tileDetail.description}
                </p>
              </div>

              {/* Informations environnementales */}
              {selectedTile && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-cosmic-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Thermometer className="w-4 h-4 text-red-400" />
                      <span className="text-cosmic-300 text-sm">Température</span>
                    </div>
                    <p className="text-white font-semibold">{selectedTile.temperature.toFixed(1)}°C</p>
                  </div>
                  
                  <div className="bg-cosmic-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Droplets className="w-4 h-4 text-blue-400" />
                      <span className="text-cosmic-300 text-sm">Humidité</span>
                    </div>
                    <p className="text-white font-semibold">{selectedTile.humidity.toFixed(1)}%</p>
                  </div>
                  
                  <div className="bg-cosmic-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-green-400" />
                      <span className="text-cosmic-300 text-sm">Altitude</span>
                    </div>
                    <p className="text-white font-semibold">{selectedTile.elevation.toFixed(0)}m</p>
                  </div>
                </div>
              )}

              {/* Métadonnées */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Population */}
                {tileDetail.metadata.population !== undefined && tileDetail.metadata.population > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-life-400" />
                      <span className="text-cosmic-300 text-sm">Population</span>
                    </div>
                    <p className="text-white font-semibold">
                      {tileDetail.metadata.population.toLocaleString()} habitants
                    </p>
                  </div>
                )}

                {/* Ère */}
                {tileDetail.metadata.era && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-energy-400" />
                      <span className="text-cosmic-300 text-sm">Ère</span>
                    </div>
                    <p className="text-white font-semibold">{tileDetail.metadata.era}</p>
                  </div>
                )}

                {/* Niveau de danger */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <span className="text-cosmic-300 text-sm">Danger</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-cosmic-600 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          tileDetail.metadata.danger_level <= 3 ? 'bg-green-500' :
                          tileDetail.metadata.danger_level <= 6 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${tileDetail.metadata.danger_level * 10}%` }}
                      />
                    </div>
                    <span className="text-white text-sm font-semibold">
                      {tileDetail.metadata.danger_level}/10
                    </span>
                  </div>
                </div>
              </div>

              {/* Ressources */}
              {tileDetail.metadata.resources.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Ressources</h3>
                  <div className="flex flex-wrap gap-2">
                    {tileDetail.metadata.resources.map((resource, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-life-500/20 text-life-300 rounded-full text-sm border border-life-500/30"
                      >
                        {resource}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Points d'intérêt */}
              {tileDetail.metadata.points_of_interest.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Points d'intérêt</h3>
                  <ul className="space-y-2">
                    {tileDetail.metadata.points_of_interest.map((poi, index) => (
                      <li key={index} className="flex items-center gap-2 text-cosmic-200">
                        <div className="w-2 h-2 bg-energy-400 rounded-full" />
                        {poi}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Timestamp */}
              <div className="pt-4 border-t border-cosmic-700">
                <p className="text-cosmic-400 text-xs">
                  Détails générés le {new Date(tileDetail.generated_at).toLocaleString('fr-FR')}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}