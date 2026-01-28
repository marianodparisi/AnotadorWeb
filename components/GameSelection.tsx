
import React from 'react';
import { GameType, GAME_DETAILS } from '../types';

interface GameSelectionProps {
  onSelect: (type: GameType) => void;
}

const GameSelection: React.FC<GameSelectionProps> = ({ onSelect }) => {
  const games = Object.entries(GAME_DETAILS) as [GameType, typeof GAME_DETAILS['GENERALA']][];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">¿Qué jugamos hoy?</h2>
        <p className="text-slate-500">Seleccioná un juego para empezar a anotar.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {games.map(([type, details]) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className="group relative flex items-center p-6 bg-white border border-slate-200 rounded-2xl hover:border-sky-400 hover:shadow-xl hover:shadow-sky-100 transition-all duration-300 text-left"
          >
            <div className="text-4xl mr-5 group-hover:scale-110 transition-transform duration-300">
              {details.icon}
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800">{details.name}</h3>
              <p className="text-sm text-slate-500">{details.description}</p>
            </div>
            <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-6 h-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameSelection;
