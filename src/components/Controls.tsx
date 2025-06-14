import React from 'react';
import { Zap, Trash2, Loader2 } from 'lucide-react';
import { useUniverseStore } from '../store/universeStore';

export function Controls() {
  const { generateUniverse, eraseUniverse, isLoading, universe } = useUniverseStore();

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-6 bg-gradient-to-r from-cosmic-900 to-cosmic-800 rounded-xl shadow-2xl border border-cosmic-700">
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Zap className="w-6 h-6 text-energy-400" />
          Contrôles de l'Univers
        </h2>
        <p className="text-cosmic-200 text-sm">
          Générez un nouvel univers ou effacez l'existant pour recommencer
        </p>
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={generateUniverse}
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-energy-500 to-energy-600 
                   hover:from-energy-600 hover:to-energy-700 text-white font-semibold rounded-lg 
                   transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Zap className="w-5 h-5" />
          )}
          Big Bang
        </button>
        
        <button
          onClick={eraseUniverse}
          disabled={isLoading || !universe}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 
                   hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg 
                   transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Trash2 className="w-5 h-5" />
          )}
          Écraser
        </button>
      </div>
    </div>
  );
}