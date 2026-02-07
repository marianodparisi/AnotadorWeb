
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
    <div className="animate-fade-in-up">
      <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-clay border border-white/60">
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-gray-800">Preparación</h2>
          <p className="text-sm text-gray-500 mt-1 font-medium">Configurá la partida</p>
        </div>

        <div className="space-y-8">
          {/* Game Specific Configs */}
          {gameType === 'TRUCO' && (
            <div className="bg-primary/10 p-5 rounded-2xl border border-primary/20 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-800 text-sm">Puntos de partida</p>
                <p className="text-xs text-gray-500 mt-0.5">¿A cuánto juegan?</p>
              </div>
              <div className="flex bg-white rounded-xl p-1 border border-primary/30 shadow-clay-sm">
                <button
                  onClick={() => setMaxPoints(15)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${maxPoints === 15 ? 'bg-primary text-white shadow-md' : 'text-gray-700 hover:bg-primary/10'}`}
                >
                  15
                </button>
                <button
                  onClick={() => setMaxPoints(30)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${maxPoints === 30 ? 'bg-primary text-white shadow-md' : 'text-gray-700 hover:bg-primary/10'}`}
                >
                  30
                </button>
              </div>
            </div>
          )}

          {/* Players List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-bold text-gray-700">Jugadores</label>
              <span className="text-xs font-extrabold bg-primary/10 text-primary px-2.5 py-1 rounded-lg">
                {names.length}
              </span>
            </div>

            <div className="space-y-3">
              {names.map((name, index) => (
                <div key={index} className="group flex items-center gap-2">
                   <div className="flex-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400 font-extrabold text-xs">{index + 1}</span>
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => updateName(index, e.target.value)}
                        className="w-full bg-bg-main border-2 border-transparent rounded-xl pl-8 pr-4 py-3 text-gray-800 font-semibold focus:outline-none focus:border-primary/40 focus:bg-white transition-all placeholder:text-gray-400"
                        placeholder={`Nombre del jugador`}
                      />
                   </div>
                  {names.length > 2 && (
                    <button
                      onClick={() => removePlayer(index)}
                      className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      title="Eliminar jugador"
                    >
                      <span className="material-icons-round text-xl">delete_outline</span>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {names.length < 8 && (
              <button
                onClick={addPlayer}
                className="mt-4 w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-400 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all font-bold text-sm flex items-center justify-center gap-2"
              >
                <span className="material-icons-round text-xl">person_add</span>
                Agregar Jugador
              </button>
            )}
          </div>

          <button
            onClick={handleStart}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-clay-sm hover:brightness-110 hover:scale-[1.02] transition-all active:scale-[0.98]"
          >
            ¡Empezar a jugar!
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerSetup;
