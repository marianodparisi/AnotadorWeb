
import React from 'react';
import { GameType } from '../types';

interface GameSelectionProps {
  onSelect: (type: GameType) => void;
}

const GAME_CARDS: { type: GameType; name: string; desc: string; icon: string; bg: string; textDark?: boolean }[] = [
  { type: 'GENERALA', name: 'Generala', desc: 'El clásico de los dados', icon: '🎲', bg: 'bg-[#A78BFA]' },
  { type: 'DIEZ_MIL', name: '10.000', desc: 'Suma hasta ganar', icon: '✨', bg: 'bg-[#FCD34D]', textDark: true },
  { type: 'TRUCO', name: 'Truco', desc: '¡Quiero vale cuatro!', icon: '⚔️', bg: 'bg-[#60A5FA]' },
  { type: 'CHANCHO', name: 'Chancho', desc: 'C-H-A-N-C-H-O', icon: '🐷', bg: 'bg-[#F472B6]' },
  { type: 'CASITA_ROBADA', name: 'Casita', desc: 'Robá cartas', icon: '🏠', bg: 'bg-[#34D399]' },
  { type: 'ESCOBA_15', name: 'Escoba', desc: 'Sumá 15 y barré', icon: '🧹', bg: 'bg-[#2DD4BF]' },
  { type: 'UNO', name: 'Uno', desc: 'Descartate rápido', icon: '🌈', bg: 'bg-[#FB7185]' },
  { type: 'CHINCHON', name: 'Chinchón', desc: 'Cortá con menos 10', icon: '🃏', bg: 'bg-[#818CF8]' },
];

const GameSelection: React.FC<GameSelectionProps> = ({ onSelect }) => {
  return (
    <div className="animate-fade-in-up">
      <div className="text-left mb-6 px-1">
        <h2 className="font-display text-4xl font-extrabold text-gray-800 mb-2">
          ¿Qué jugamos <span className="text-primary">hoy</span>?
        </h2>
        <p className="text-gray-500 font-medium text-lg leading-snug">
          Elegí tu juego favorito.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {GAME_CARDS.map(game => (
          <button
            key={game.type}
            onClick={() => onSelect(game.type)}
            className={`card-hover group relative w-full h-32 rounded-[2rem] ${game.bg} shadow-clay flex items-center justify-between px-6 overflow-visible cursor-pointer transition-transform hover:-translate-y-1 active:scale-[0.98]`}
          >
            <div className="flex flex-col justify-center text-white z-10 text-left">
              <h3 className={`font-display font-bold text-3xl drop-shadow-md ${game.textDark ? 'text-amber-900/80' : ''}`}>
                {game.name}
              </h3>
              <p className={`font-semibold text-sm mt-1 ${game.textDark ? 'text-amber-900/60' : 'text-white/80'}`}>
                {game.desc}
              </p>
            </div>
            <div className="icon-3d-wrapper w-24 h-24 flex items-center justify-center relative -right-2">
              <span className="text-[5rem] leading-none filter drop-shadow-lg">{game.icon}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameSelection;
