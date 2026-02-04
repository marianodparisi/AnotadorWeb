
import React from 'react';
import { GameType, GAME_DETAILS } from '../types';

interface GameSelectionProps {
  onSelect: (type: GameType) => void;
}

// Icono personalizado para UNO (Estilo Carta Comodín)
const UnoIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm transform rotate-[-5deg]">
    <circle cx="50" cy="50" r="48" fill="white" stroke="#e2e8f0" strokeWidth="2" />
    <path d="M 50 50 L 50 4 A 46 46 0 0 0 4 50 Z" fill="#ef4444" /> {/* Rojo */}
    <path d="M 50 50 L 96 50 A 46 46 0 0 0 50 4 Z" fill="#3b82f6" /> {/* Azul */}
    <path d="M 50 50 L 50 96 A 46 46 0 0 0 96 50 Z" fill="#22c55e" /> {/* Verde */}
    <path d="M 50 50 L 4 50 A 46 46 0 0 0 50 96 Z" fill="#eab308" /> {/* Amarillo */}
    <circle cx="50" cy="50" r="18" fill="white" />
    <text x="50" y="56" fontSize="14" fontWeight="900" textAnchor="middle" fill="#1e293b" fontFamily="sans-serif" style={{ letterSpacing: '-1px' }}>UNO</text>
  </svg>
);

const GameSelection: React.FC<GameSelectionProps> = ({ onSelect }) => {
  const allGames = Object.entries(GAME_DETAILS) as [GameType, typeof GAME_DETAILS['GENERALA']][];

  return (
    <div className="space-y-10 animate-fade-in-up">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          ¿Qué jugamos <span className="text-blue-600">hoy</span>?
        </h2>
        <p className="text-slate-500 text-lg max-w-lg mx-auto leading-relaxed">
          Seleccioná un juego para empezar a anotar.
        </p>
      </div>

      {/* All Games Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
        {allGames.map(([type, details]) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className="group flex flex-col items-center text-center p-6 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 hover:border-blue-100 transition-all duration-300 active:scale-[0.98]"
          >
            <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 group-hover:from-blue-50 group-hover:to-indigo-50 flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform duration-300 overflow-hidden p-1">
              {type === 'UNO' ? <UnoIcon /> : details.icon}
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
              {details.name}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed px-2">
              {details.description}
            </p>
          </button>
        ))}
      </div>

      <div className="text-center pt-8 pb-4">
        <p className="text-xs font-semibold text-slate-400 tracking-wider">
          HECHO CON ❤️ EN ARGENTINA
        </p>
      </div>
    </div>
  );
};

export default GameSelection;
