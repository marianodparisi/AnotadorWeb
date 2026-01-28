
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
        <div key={p.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between">
          <div className="mb-4 sm:mb-0">
            <h3 className={`text-xl font-bold ${p.score >= 7 ? 'text-red-400 line-through' : 'text-slate-800'}`}>
              {p.name}
            </h3>
            {p.score >= 7 && <span className="text-xs font-black text-red-500 uppercase">¡AFUERA!</span>}
          </div>
          
          <div className="flex space-x-1 sm:space-x-2">
            {letters.map((l, i) => (
              <div
                key={i}
                className={`w-10 h-10 flex items-center justify-center rounded-xl font-black text-lg transition-all ${
                  p.score > i 
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-200 scale-110' 
                    : 'bg-slate-100 text-slate-300'
                }`}
              >
                {l}
              </div>
            ))}
            {p.score < 7 && (
              <button
                onClick={() => onUpdateScore(p.id, 1)}
                className="ml-4 w-10 h-10 bg-slate-800 text-white rounded-xl hover:bg-black transition-colors flex items-center justify-center"
              >
                +
              </button>
            )}
            {p.score > 0 && (
              <button
                onClick={() => onUpdateScore(p.id, -1)}
                className="w-10 h-10 bg-slate-100 text-slate-400 rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center"
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
