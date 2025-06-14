import React from 'react';
import { Controls } from './components/Controls';
import { SolarSystem } from './components/SolarSystem';
import { PlanetMap } from './components/PlanetMap';
import { TileInfo } from './components/TileInfo';
import { useUniverseStore } from './store/universeStore';
import { Sparkles } from 'lucide-react';

function App() {
  const { selectedPlanet } = useUniverseStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-950 via-cosmic-900 to-cosmic-800">
      {/* Header */}
      <header className="border-b border-cosmic-700 bg-cosmic-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-energy-500 to-energy-600 rounded-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Univers Explorer</h1>
              <p className="text-cosmic-300">
                Explorez des univers générés procéduralement avec des détails IA
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <Controls />
        
        <div className="space-y-6">
          <SolarSystem />
          {selectedPlanet && <PlanetMap />}
        </div>
      </main>

      {/* Modal */}
      <TileInfo />

      {/* Footer */}
      <footer className="border-t border-cosmic-700 bg-cosmic-900/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-cosmic-400 text-sm">
            <p>Univers Explorer - Génération procédurale avec intelligence artificielle</p>
            <p className="mt-1">Explorez l'infini, une tuile à la fois</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;