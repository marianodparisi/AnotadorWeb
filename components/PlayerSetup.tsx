
import React, { useState } from 'react';
import { GameType } from '../types';

interface PlayerSetupProps {
  gameType: GameType;
  onStart: (players: string[], config: { maxPoints?: number, isTeams?: boolean }) => void;
  onBack: () => void;
}

const PlayerSetup: React.FC<PlayerSetupProps> = ({ gameType, onStart, onBack }) => {
  const [names, setNames] = useState<string[]>(['Jugador 1', 'Jugador 2']);
  const [maxPoints, setMaxPoints] = useState<number>(gameType === 'TRUCO' ? 30 : 10000);
  const [isTeams, setIsTeams] = useState<boolean>(false);

  const addPlayer = () => {
    if (names.length < 8) {
      setNames([...names, `Jugador ${names.length + 1}`]);
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
    onStart(names, { maxPoints, isTeams });
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Preparación</h2>
        <button onClick={onBack} className="text-slate-400 hover:text-slate-600 transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-6">
        {/* Game Specific Configs */}
        {gameType === 'TRUCO' && (
          <div className="bg-sky-50 p-4 rounded-xl border border-sky-100 flex items-center justify-between">
            <div>
              <p className="font-semibold text-sky-900 text-sm">Puntos de partida</p>
              <p className="text-xs text-sky-700">Comúnmente a 15 o 30 puntos.</p>
            </div>
            <select 
              value={maxPoints} 
              onChange={(e) => setMaxPoints(Number(e.target.value))}
              className="bg-white border border-sky-200 rounded-lg px-3 py-1 text-sky-800 font-medium"
            >
              <option value={15}>15 puntos</option>
              <option value={30}>30 puntos</option>
            </select>
          </div>
        )}

        {/* Players List */}
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-3">Jugadores / Equipos</label>
          <div className="space-y-3">
            {names.map((name, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => updateName(index, e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  placeholder={`Nombre del jugador ${index + 1}`}
                />
                {names.length > 2 && (
                  <button 
                    onClick={() => removePlayer(index)}
                    className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
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
              className="mt-4 w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-sky-500 hover:border-sky-200 transition-all font-medium flex items-center justify-center space-x-1"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Agregar otro</span>
            </button>
          )}
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-sky-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-sky-200 hover:bg-sky-600 transition-all active:scale-[0.98]"
        >
          ¡A jugar!
        </button>
      </div>
    </div>
  );
};

export default PlayerSetup;
