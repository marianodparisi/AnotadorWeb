
import React, { useState } from 'react';
import { GameType } from '../types';

interface PlayerSetupProps {
  gameType: GameType;
  onStart: (players: string[], config: { maxPoints?: number, isTeams?: boolean }) => void;
  onBack: () => void;
}

const PlayerSetup: React.FC<PlayerSetupProps> = ({ gameType, onStart, onBack }) => {
  const [names, setNames] = useState<string[]>(['', '']);
  const [maxPoints, setMaxPoints] = useState<number>(gameType === 'TRUCO' ? 30 : 10000);
  const [isTeams, setIsTeams] = useState<boolean>(false);

  const addPlayer = () => {
    if (names.length < 8) {
      setNames([...names, '']);
    }
  };

  const removePlayer = (index: number) => {
    if (names.length > 2) {
      setNames(names.filter((_, i) => i !== index));
    }
  };

  const updateName = (index: number, newName: string) => {
    const updated = [...names];
    updated[index] = newName;
    setNames(updated);
  };

  const handleStart = () => {
    const finalNames = names.map((name, i) => name.trim() || `Jugador ${i + 1}`);
    onStart(finalNames, { maxPoints, isTeams });
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Preparación</h2>
            <p className="text-sm text-slate-500 mt-1">Configurá la partida</p>
          </div>
          <button 
            onClick={onBack} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-8">
          {/* Game Specific Configs */}
          {gameType === 'TRUCO' && (
            <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-blue-900 text-sm">Puntos de partida</p>
                <p className="text-xs text-blue-600/80 mt-0.5">¿A cuánto juegan?</p>
              </div>
              <div className="flex bg-white rounded-xl p-1 border border-blue-200">
                <button
                  onClick={() => setMaxPoints(15)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${maxPoints === 15 ? 'bg-blue-600 text-white shadow-md' : 'text-blue-900 hover:bg-blue-50'}`}
                >
                  15
                </button>
                <button
                  onClick={() => setMaxPoints(30)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${maxPoints === 30 ? 'bg-blue-600 text-white shadow-md' : 'text-blue-900 hover:bg-blue-50'}`}
                >
                  30
                </button>
              </div>
            </div>
          )}

          {/* Players List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-bold text-slate-700">Jugadores</label>
              <span className="text-xs font-semibold bg-slate-100 text-slate-500 px-2 py-1 rounded-md">
                {names.length}
              </span>
            </div>
            
            <div className="space-y-3">
              {names.map((name, index) => (
                <div key={index} className="group flex items-center gap-2">
                   <div className="flex-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-slate-400 font-bold text-xs">{index + 1}</span>
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => updateName(index, e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                        placeholder={`Nombre del jugador`}
                      />
                   </div>
                  {names.length > 2 && (
                    <button 
                      onClick={() => removePlayer(index)}
                      className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      title="Eliminar jugador"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            {names.length < 8 && (
              <button 
                onClick={addPlayer}
                className="mt-4 w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/50 transition-all font-bold text-sm flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Agregar Jugador
              </button>
            )}
          </div>

          <button
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] transition-all active:scale-[0.98]"
          >
            ¡Empezar a jugar!
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerSetup;
