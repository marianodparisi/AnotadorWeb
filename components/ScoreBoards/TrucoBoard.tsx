
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
          <div key={i} className="relative w-12 h-12 border border-primary/20 rounded-lg bg-primary/5">
            {count >= 1 && <div className="absolute top-1 left-1 right-1 h-1 bg-primary rounded-full" />}
            {count >= 2 && <div className="absolute top-1 bottom-1 right-1 w-1 bg-primary rounded-full" />}
            {count >= 3 && <div className="absolute bottom-1 left-1 right-1 h-1 bg-primary rounded-full" />}
            {count >= 4 && <div className="absolute top-1 bottom-1 left-1 w-1 bg-primary rounded-full" />}
            {count >= 5 && <div className="absolute bg-primary rounded-full" style={{ width: '2px', height: '100%', left: '50%', top: '0', transform: 'translateX(-50%) rotate(-45deg)' }} />}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {players.map((player) => (
          <div key={player.id} className="bg-white rounded-[2rem] p-6 shadow-clay border border-white/60 flex flex-col items-center">
            <h3 className="font-display text-2xl font-bold text-gray-800 mb-2">{player.name}</h3>
            <div className="text-4xl font-extrabold text-primary mb-6">{player.score} <span className="text-sm font-normal text-gray-400">/ {max}</span></div>

            <div className="w-full flex justify-center mb-8">
              {renderFosforitos(player.score)}
            </div>

            <div className="flex space-x-2 w-full">
              <button
                onClick={() => player.score > 0 && onUpdateScore(player.id, -1)}
                className="flex-1 py-3 bg-bg-main text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-colors"
              >
                -1
              </button>
              <button
                onClick={() => player.score < max && onUpdateScore(player.id, 1)}
                className="flex-[2] py-3 bg-primary text-white rounded-xl font-bold hover:brightness-110 transition-all shadow-clay-sm active:scale-[0.98]"
              >
                +1 Punto
              </button>
            </div>
          </div>
        ))}
      </div>

      {players.some(p => p.score >= max) && (
        <div className="bg-[#34D399] text-white p-6 rounded-[2rem] text-center shadow-clay animate-bounce">
          <h4 className="font-display text-2xl font-bold">¡Ganaste el partido! 🏆</h4>
          <p className="font-semibold mt-1">Felicitaciones a {players.find(p => p.score >= max)?.name}</p>
        </div>
      )}
    </div>
  );
};

export default TrucoBoard;
