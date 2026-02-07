
import React, { useEffect, useState } from 'react';
import { GameRecord, GameType, GAME_DETAILS } from '../types';
import { getAllGames, deleteGame } from '../db';

const NON_CONTINUABLE: GameType[] = ['GENERALA', 'DIEZ_MIL'];

interface GameHistoryProps {
  onBack: () => void;
  onLoadGame: (record: GameRecord) => void;
}

const GameHistory: React.FC<GameHistoryProps> = ({ onBack, onLoadGame }) => {
  const [games, setGames] = useState<GameRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  useEffect(() => {
    getAllGames().then(records => {
      setGames(records);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    await deleteGame(id);
    setGames(prev => prev.filter(g => g.id !== id));
    setConfirmDeleteId(null);
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
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-display text-2xl font-bold text-gray-800">Historial</h2>
        <button
          onClick={onBack}
          className="text-sm font-bold text-gray-400 hover:text-gray-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-white"
        >
          Volver
        </button>
      </div>

      {games.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <div className="text-6xl">📋</div>
          <p className="text-gray-500 text-lg font-semibold">No hay partidas guardadas todavia.</p>
          <p className="text-gray-400 text-sm">Cuando juegues una partida, se guardara aca automaticamente.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {games.map(game => {
            const details = GAME_DETAILS[game.type as GameType];
            const isConfirming = confirmDeleteId === game.id;
            return (
              <div
                key={game.id}
                className="bg-white rounded-[2rem] p-5 shadow-clay-sm border border-white/60 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-bg-main flex items-center justify-center text-2xl shadow-clay-sm">
                      {details?.icon || '🎮'}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-gray-800">{details?.name || game.type}</h3>
                      <p className="text-xs text-gray-400 font-semibold">{formatDate(game.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isConfirming ? (
                      <>
                        <button
                          onClick={() => game.id != null && handleDelete(game.id)}
                          className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-1.5 rounded-lg transition-colors hover:bg-red-100"
                        >
                          Confirmar
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="text-xs font-bold text-gray-500 bg-bg-main border border-gray-200 px-2.5 py-1.5 rounded-lg transition-colors hover:bg-gray-100"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => game.id != null && setConfirmDeleteId(game.id)}
                        className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                      >
                        <span className="material-icons-round text-xl">delete_outline</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {game.players.map((p, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold ${
                        game.winner && p.name === game.winner
                          ? 'bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/30'
                          : 'bg-bg-main text-gray-600 border border-gray-100'
                      }`}
                    >
                      {game.winner && p.name === game.winner && <span>🏆</span>}
                      <span>{p.name}</span>
                      <span className="font-extrabold">{p.score}</span>
                    </div>
                  ))}
                </div>

                {!NON_CONTINUABLE.includes(game.type) && (
                  <button
                    onClick={() => onLoadGame(game)}
                    className="w-full py-2.5 bg-primary/10 text-primary border border-primary/20 rounded-2xl text-sm font-bold hover:bg-primary/20 transition-colors active:scale-[0.98]"
                  >
                    Continuar partida
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GameHistory;
