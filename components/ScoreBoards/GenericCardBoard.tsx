
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
    <div className="space-y-8">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
          <span className="mr-2">🃏</span> Anotar Ronda
        </h3>
        
        <div className="space-y-4">
          {players.map(p => (
            <div key={p.id} className="flex items-center justify-between group">
              <span className="font-semibold text-slate-600">{p.name}</span>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setRoundScores(prev => ({ ...prev, [p.id]: Math.max(0, prev[p.id] - 1) }))}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 flex items-center justify-center"
                >
                  -
                </button>
                <div className="w-12 text-center font-black text-xl text-sky-500">
                  {roundScores[p.id]}
                </div>
                <button 
                  onClick={() => setRoundScores(prev => ({ ...prev, [p.id]: prev[p.id] + 1 }))}
                  className="w-8 h-8 rounded-full bg-sky-100 text-sky-500 hover:bg-sky-200 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleApplyRound}
          className="w-full mt-8 bg-sky-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-sky-100 hover:bg-sky-600 transition-all active:scale-[0.98]"
        >
          Guardar Ronda
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center px-2">
          <span className="mr-2">🏆</span> Resultados Parciales
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {players.map(p => (
            <div key={p.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex justify-between items-center">
              <span className="font-bold text-slate-700">{p.name}</span>
              <span className="text-2xl font-black text-sky-500">{p.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenericCardBoard;
