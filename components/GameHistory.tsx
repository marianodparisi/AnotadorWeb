
import React, { useEffect, useState } from 'react';
import { GameRecord, GAME_DETAILS, GameType } from '../types';
import { getAllGames, deleteGame } from '../db';

interface GameHistoryProps {
  onBack: () => void;
}

const GameHistory: React.FC<GameHistoryProps> = ({ onBack }) => {
  const [games, setGames] = useState<GameRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllGames().then(records => {
      setGames(records);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    await deleteGame(id);
    setGames(prev => prev.filter(g => g.id !== id));
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-slate-900">Historial de Partidas</h2>
        <button
          onClick={onBack}
          className="text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-100"
        >
          Volver
        </button>
      </div>

      {games.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <div className="text-6xl">📋</div>
          <p className="text-slate-500 text-lg">No hay partidas guardadas todavia.</p>
          <p className="text-slate-400 text-sm">Cuando juegues una partida, se guardara aca automaticamente.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {games.map(game => {
            const details = GAME_DETAILS[game.type as GameType];
            return (
              <div
                key={game.id}
                className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center text-2xl">
                      {details?.icon || '🎮'}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">{details?.name || game.type}</h3>
                      <p className="text-xs text-slate-400">{formatDate(game.date)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => game.id != null && handleDelete(game.id)}
                    className="text-xs font-semibold text-slate-400 hover:text-red-500 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    Borrar
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {game.players.map((p, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium ${
                        game.winner && p.name === game.winner
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-50 text-slate-600 border border-slate-100'
                      }`}
                    >
                      {game.winner && p.name === game.winner && <span>🏆</span>}
                      <span>{p.name}</span>
                      <span className="font-bold">{p.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GameHistory;
