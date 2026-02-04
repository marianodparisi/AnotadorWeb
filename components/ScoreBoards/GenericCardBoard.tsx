
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
    // Reset round inputs
    setRoundScores(players.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {}));
  };

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="text-2xl">🃏</span> 
          <span>Anotar Ronda</span>
        </h3>
        
        <div className="space-y-6">
          {players.map(p => (
            <div key={p.id} className="flex items-center justify-between">
              <div className="flex-1 min-w-0 mr-4">
                 <span className="font-bold text-slate-700 text-lg truncate block">{p.name}</span>
                 <span className="text-xs text-slate-400 font-medium">Total: {p.score}</span>
              </div>
              
              <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                <button 
                  onClick={() => setRoundScores(prev => ({ ...prev, [p.id]: Math.max(0, prev[p.id] - 1) }))}
                  className="w-12 h-12 rounded-xl bg-white text-slate-400 border border-slate-200 shadow-sm hover:border-slate-300 hover:text-slate-600 flex items-center justify-center text-xl font-bold active:scale-95 transition-all touch-manipulation"
                >
                  -
                </button>
                <div className="w-12 text-center font-black text-2xl text-blue-600">
                  {roundScores[p.id]}
                </div>
                <button 
                  onClick={() => setRoundScores(prev => ({ ...prev, [p.id]: prev[p.id] + 1 }))}
                  className="w-12 h-12 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200 hover:bg-blue-700 flex items-center justify-center text-xl font-bold active:scale-95 transition-all touch-manipulation"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleApplyRound}
          className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all active:scale-[0.98]"
        >
          Guardar Ronda
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center px-2 gap-2">
          <span>🏆</span> Resultados Parciales
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {players.map(p => (
            <div key={p.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
              <span className="font-bold text-slate-700">{p.name}</span>
              <span className="text-3xl font-black text-blue-500">{p.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenericCardBoard;
