
import React, { useState } from 'react';
import { Player, GameType } from '../../types';

interface GenericCardBoardProps {
  type: GameType;
  players: Player[];
  onUpdateScore: (playerId: string, points: number) => void;
}

const GenericCardBoard: React.FC<GenericCardBoardProps> = ({ type, players, onUpdateScore }) => {
  const [roundScores, setRoundScores] = useState<Record<string, number>>(
    players.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {})
  );

  const handleApplyRound = () => {
    Object.entries(roundScores).forEach(([pid, pts]) => {
      if (pts !== 0) onUpdateScore(pid, pts);
    });
    setRoundScores(players.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {}));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[2rem] p-6 shadow-clay border border-white/60">
        <h3 className="font-display text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-2xl">🃏</span>
          <span>Anotar Ronda</span>
        </h3>

        <div className="space-y-6">
          {players.map(p => (
            <div key={p.id} className="flex items-center justify-between">
              <div className="flex-1 min-w-0 mr-4">
                 <span className="font-bold text-gray-700 text-lg truncate block">{p.name}</span>
                 <span className="text-xs text-gray-400 font-semibold">Total: {p.score}</span>
              </div>

              <div className="flex items-center gap-3 bg-bg-main p-1.5 rounded-2xl border border-gray-100">
                <button
                  onClick={() => setRoundScores(prev => ({ ...prev, [p.id]: Math.max(0, prev[p.id] - 1) }))}
                  className="w-12 h-12 rounded-xl bg-white text-gray-400 border border-gray-200 shadow-clay-sm hover:text-gray-600 flex items-center justify-center text-xl font-bold active:scale-95 transition-all touch-manipulation"
                >
                  -
                </button>
                <div className="w-12 text-center font-extrabold text-2xl text-primary">
                  {roundScores[p.id]}
                </div>
                <button
                  onClick={() => setRoundScores(prev => ({ ...prev, [p.id]: prev[p.id] + 1 }))}
                  className="w-12 h-12 rounded-xl bg-primary text-white shadow-clay-sm hover:brightness-110 flex items-center justify-center text-xl font-bold active:scale-95 transition-all touch-manipulation"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleApplyRound}
          className="w-full mt-8 bg-gray-800 text-white py-4 rounded-2xl font-bold text-lg shadow-clay-sm hover:bg-gray-900 transition-all active:scale-[0.98]"
        >
          Guardar Ronda
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="font-display text-lg font-bold text-gray-800 flex items-center px-2 gap-2">
          <span>🏆</span> Resultados Parciales
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {players.map(p => (
            <div key={p.id} className="bg-white p-5 rounded-2xl border border-white/60 shadow-clay-sm flex justify-between items-center">
              <span className="font-bold text-gray-700">{p.name}</span>
              <span className="text-3xl font-extrabold text-primary">{p.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenericCardBoard;
