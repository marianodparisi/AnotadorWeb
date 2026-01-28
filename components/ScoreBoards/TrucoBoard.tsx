
import React from 'react';
import { Player } from '../../types';

interface TrucoBoardProps {
  players: Player[];
  onUpdateScore: (playerId: string, points: number) => void;
  config: { maxPoints?: number };
}

const TrucoBoard: React.FC<TrucoBoardProps> = ({ players, onUpdateScore, config }) => {
  const max = config.maxPoints || 30;

  const renderFosforitos = (score: number) => {
    const groups = [];
    let remaining = score;
    while (remaining > 0) {
      const count = Math.min(remaining, 5);
      groups.push(count);
      remaining -= count;
    }

    return (
      <div className="grid grid-cols-3 gap-3">
        {groups.map((count, i) => (
          <div key={i} className="relative w-12 h-12 border border-slate-100 rounded bg-slate-50/50">
            {/* Top */}
            {count >= 1 && <div className="absolute top-1 left-1 right-1 h-1 bg-sky-600 rounded-full" />}
            {/* Right */}
            {count >= 2 && <div className="absolute top-1 bottom-1 right-1 w-1 bg-sky-600 rounded-full" />}
            {/* Bottom */}
            {count >= 3 && <div className="absolute bottom-1 left-1 right-1 h-1 bg-sky-600 rounded-full" />}
            {/* Left */}
            {count >= 4 && <div className="absolute top-1 bottom-1 left-1 w-1 bg-sky-600 rounded-full" />}
            {/* Cross */}
            {count >= 5 && <div className="absolute top-1 left-1 w-[1.414*40%] h-[1.414*40%] bg-sky-600 rounded-full rotate-45 origin-top-left transform scale-[6]" style={{ width: '2px', height: '100%', left: '50%', top: '0', transform: 'translateX(-50%) rotate(-45deg)' }} />}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {players.map((player) => (
          <div key={player.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col items-center">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">{player.name}</h3>
            <div className="text-4xl font-black text-sky-500 mb-6">{player.score} <span className="text-sm font-normal text-slate-400">/ {max}</span></div>
            
            <div className="w-full flex justify-center mb-8">
              {renderFosforitos(player.score)}
            </div>

            <div className="flex space-x-2 w-full">
              <button 
                onClick={() => player.score > 0 && onUpdateScore(player.id, -1)}
                className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors"
              >
                -1
              </button>
              <button 
                onClick={() => player.score < max && onUpdateScore(player.id, 1)}
                className="flex-[2] py-3 bg-sky-500 text-white rounded-xl font-bold hover:bg-sky-600 transition-all shadow-md shadow-sky-100 active:scale-[0.98]"
              >
                +1 Punto
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {players.some(p => p.score >= max) && (
        <div className="bg-emerald-500 text-white p-6 rounded-3xl text-center shadow-lg shadow-emerald-100 animate-bounce">
          <h4 className="text-2xl font-black">¡Ganaste el partido! 🏆</h4>
          <p>Felicitaciones a {players.find(p => p.score >= max)?.name}</p>
        </div>
      )}
    </div>
  );
};

export default TrucoBoard;
