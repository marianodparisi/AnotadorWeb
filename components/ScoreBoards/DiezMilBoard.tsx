
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
      const idx = players.findIndex(p => p.id === activePlayer);
      setActivePlayer(players[(idx + 1) % players.length].id);
    }
  };

  const currentPlayer = players.find(p => p.id === activePlayer);
  const winner = players.find(p => p.score >= 10000);
  const gameFinished = !!winner;

  const getRanking = () => {
    return [...players].sort((a, b) => b.score - a.score);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {players.map(p => (
          <button
            key={p.id}
            onClick={() => !gameFinished && setActivePlayer(p.id)}
            className={`p-4 rounded-2xl border-2 transition-all text-center ${
              p.score >= 10000
                ? 'bg-[#34D399] text-white border-[#34D399] shadow-clay-sm'
                : activePlayer === p.id && !gameFinished
                ? 'bg-primary text-white border-primary shadow-clay-sm'
                : 'bg-white text-gray-700 border-gray-200'
            }`}
          >
            <div className="text-xs opacity-70 truncate mb-1 font-semibold">{p.name}</div>
            <div className="text-xl font-extrabold">{p.score}</div>
          </button>
        ))}
      </div>

      {gameFinished ? (
        <div className="bg-white rounded-[2rem] p-6 shadow-clay border border-white/60 animate-fade-in-up">
          <h3 className="font-display text-xl font-bold text-gray-800 mb-4 text-center">Resultado Final</h3>
          <div className="space-y-3">
            {getRanking().map((p, i) => (
              <div
                key={p.id}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl ${
                  i === 0
                    ? 'bg-[#34D399]/10 border border-[#34D399]/30'
                    : 'bg-bg-main border border-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-lg font-extrabold ${i === 0 ? 'text-[#34D399]' : 'text-gray-400'}`}>
                    {i === 0 ? '🏆' : `#${i + 1}`}
                  </span>
                  <span className={`font-bold ${i === 0 ? 'text-gray-800' : 'text-gray-700'}`}>
                    {p.name}
                  </span>
                </div>
                <span className={`text-xl font-extrabold ${i === 0 ? 'text-[#34D399]' : 'text-gray-500'}`}>
                  {p.score} pts
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-[2rem] shadow-clay border border-white/60 text-center">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Turno de</h3>
          <h4 className="font-display text-2xl font-bold text-gray-800 mb-6">{currentPlayer?.name}</h4>

          <div className="max-w-[200px] mx-auto space-y-4">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddPoints()}
              className="w-full text-center text-4xl font-extrabold bg-bg-main border-b-4 border-gray-200 focus:border-primary outline-none p-4 rounded-t-xl transition-all"
              placeholder="Puntos"
              autoFocus
            />
            <button
              onClick={handleAddPoints}
              disabled={!inputValue}
              className="w-full bg-[#34D399] hover:brightness-110 disabled:bg-gray-200 text-white font-bold py-4 rounded-2xl transition-all shadow-clay-sm"
            >
              Anotar Puntos
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="font-bold text-gray-600 px-2">Historial de rondas</h3>
        <div className="bg-white rounded-2xl border border-white/60 shadow-clay-sm overflow-hidden">
          {currentPlayer?.history.slice().reverse().map((pts, i) => (
            <div key={i} className="flex justify-between items-center p-3 border-b border-gray-50 last:border-0">
              <span className="text-sm text-gray-400 font-semibold">Ronda {currentPlayer.history.length - i}</span>
              <span className={`font-bold ${pts >= 1000 ? 'text-[#34D399]' : 'text-gray-700'}`}>+{pts}</span>
            </div>
          ))}
          {currentPlayer?.history.length === 0 && (
            <div className="p-8 text-center text-gray-400 font-medium">No hay anotaciones todavía</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiezMilBoard;
