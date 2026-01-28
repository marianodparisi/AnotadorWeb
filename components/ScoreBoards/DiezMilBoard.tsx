
import React, { useState } from 'react';
import { Player } from '../../types';

interface DiezMilBoardProps {
  players: Player[];
  onUpdateScore: (playerId: string, points: number) => void;
}

const DiezMilBoard: React.FC<DiezMilBoardProps> = ({ players, onUpdateScore }) => {
  const [activePlayer, setActivePlayer] = useState(players[0].id);
  const [inputValue, setInputValue] = useState('');

  const handleAddPoints = () => {
    const pts = parseInt(inputValue);
    if (!isNaN(pts) && pts !== 0) {
      onUpdateScore(activePlayer, pts);
      setInputValue('');
      // Cycle to next player
      const idx = players.findIndex(p => p.id === activePlayer);
      setActivePlayer(players[(idx + 1) % players.length].id);
    }
  };

  const currentPlayer = players.find(p => p.id === activePlayer);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {players.map(p => (
          <button
            key={p.id}
            onClick={() => setActivePlayer(p.id)}
            className={`p-4 rounded-2xl border transition-all text-center ${
              activePlayer === p.id 
                ? 'bg-sky-500 text-white border-sky-600 shadow-md ring-4 ring-sky-100' 
                : 'bg-white text-slate-700 border-slate-200'
            }`}
          >
            <div className="text-xs opacity-70 truncate mb-1">{p.name}</div>
            <div className="text-xl font-black">{p.score}</div>
          </button>
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Turno de</h3>
        <h4 className="text-2xl font-black text-slate-800 mb-6">{currentPlayer?.name}</h4>
        
        <div className="max-w-[200px] mx-auto space-y-4">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddPoints()}
            className="w-full text-center text-4xl font-bold bg-slate-50 border-b-4 border-slate-200 focus:border-sky-500 outline-none p-4 transition-all"
            placeholder="Puntos"
            autoFocus
          />
          <button
            onClick={handleAddPoints}
            disabled={!inputValue}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-100"
          >
            Anotar Puntos
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-slate-600 px-2">Historial de rondas</h3>
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {currentPlayer?.history.slice().reverse().map((pts, i) => (
            <div key={i} className="flex justify-between items-center p-3 border-b border-slate-50 last:border-0">
              <span className="text-sm text-slate-400">Ronda {currentPlayer.history.length - i}</span>
              <span className={`font-bold ${pts >= 1000 ? 'text-emerald-500' : 'text-slate-700'}`}>+{pts}</span>
            </div>
          ))}
          {currentPlayer?.history.length === 0 && (
            <div className="p-8 text-center text-slate-400 italic">No hay anotaciones todavía</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiezMilBoard;
