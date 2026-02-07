
import React from 'react';
import { Player } from '../../types';

interface ChanchoBoardProps {
  players: Player[];
  onUpdateScore: (playerId: string, points: number) => void;
}

const ChanchoBoard: React.FC<ChanchoBoardProps> = ({ players, onUpdateScore }) => {
  const letters = ['C', 'H', 'A', 'N', 'C', 'H', 'O'];

  return (
    <div className="grid grid-cols-1 gap-4">
      {players.map(p => (
        <div key={p.id} className="bg-white p-6 rounded-[2rem] shadow-clay border border-white/60 flex flex-col sm:flex-row sm:items-center justify-between">
          <div className="mb-4 sm:mb-0">
            <h3 className={`font-display text-xl font-bold ${p.score >= 7 ? 'text-red-400 line-through' : 'text-gray-800'}`}>
              {p.name}
            </h3>
            {p.score >= 7 && <span className="text-xs font-extrabold text-red-500 uppercase">¡AFUERA!</span>}
          </div>

          <div className="flex space-x-1 sm:space-x-2">
            {letters.map((l, i) => (
              <div
                key={i}
                className={`w-10 h-10 flex items-center justify-center rounded-xl font-extrabold text-lg transition-all ${
                  p.score > i
                    ? 'bg-[#F472B6] text-white shadow-clay-sm scale-110'
                    : 'bg-bg-main text-gray-300'
                }`}
              >
                {l}
              </div>
            ))}
            {p.score < 7 && (
              <button
                onClick={() => onUpdateScore(p.id, 1)}
                className="ml-4 w-10 h-10 bg-gray-800 text-white rounded-xl hover:bg-black transition-colors flex items-center justify-center font-bold"
              >
                +
              </button>
            )}
            {p.score > 0 && (
              <button
                onClick={() => onUpdateScore(p.id, -1)}
                className="w-10 h-10 bg-bg-main text-gray-400 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center font-bold"
              >
                -
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChanchoBoard;
