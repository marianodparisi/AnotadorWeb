
import React, { useState } from 'react';
import { Player } from '../../types';

interface GeneralaBoardProps {
  players: Player[];
  onUpdateScore: (playerId: string, points: number, data: any) => void;
}

interface Category {
  id: string;
  name: string;
  type: 'numeric' | 'special';
  normal?: number;
  bonus?: number;
  servida?: number;
}

const CATEGORIES: Category[] = [
  { id: '1', name: 'Al 1', type: 'numeric' },
  { id: '2', name: 'Al 2', type: 'numeric' },
  { id: '3', name: 'Al 3', type: 'numeric' },
  { id: '4', name: 'Al 4', type: 'numeric' },
  { id: '5', name: 'Al 5', type: 'numeric' },
  { id: '6', name: 'Al 6', type: 'numeric' },
  { id: 'E', name: 'Escalera', bonus: 25, normal: 20, type: 'special' },
  { id: 'F', name: 'Full', bonus: 35, normal: 30, type: 'special' },
  { id: 'P', name: 'Póker', bonus: 45, normal: 40, type: 'special' },
  { id: 'G', name: 'Generala', normal: 50, servida: 55, type: 'special' },
  { id: 'DG', name: 'Doble G', normal: 100, servida: 105, type: 'special' },
];

const GeneralaBoard: React.FC<GeneralaBoardProps> = ({ players, onUpdateScore }) => {
  const [scores, setScores] = useState<Record<string, Record<string, number | 'X'>>>({});

  const handleSetScore = (playerId: string, catId: string, val: number | 'X' | "") => {
    if (val === "") return;

    setScores(prev => ({
      ...prev,
      [playerId]: {
        ...(prev[playerId] || {}),
        [catId]: val
      }
    }));

    if (val !== 'X') {
      const prevVal = scores[playerId]?.[catId];
      const prevNum = prevVal !== undefined && prevVal !== 'X' ? prevVal : 0;
      onUpdateScore(playerId, (val as number) - prevNum, { catId });
    } else {
      const prevVal = scores[playerId]?.[catId];
      if (prevVal !== undefined && prevVal !== 'X') {
        onUpdateScore(playerId, -(prevVal as number), { catId });
      }
    }
  };

  const handleClearScore = (playerId: string, catId: string) => {
    const prevVal = scores[playerId]?.[catId];
    if (prevVal === undefined) return;

    setScores(prev => {
      const playerScores = { ...(prev[playerId] || {}) };
      delete playerScores[catId];
      return { ...prev, [playerId]: playerScores };
    });

    if (prevVal !== 'X') {
      onUpdateScore(playerId, -(prevVal as number), { catId });
    }
  };

  const calculateTotal = (playerId: string) => {
    const playerScores = scores[playerId] || {};
    return Object.values(playerScores).reduce((acc: number, val: any) => acc + (val === 'X' ? 0 : (val as number)), 0);
  };

  const isGameComplete = () => {
    return players.every(p =>
      CATEGORIES.every(cat => scores[p.id]?.[cat.id] !== undefined)
    );
  };

  const getRanking = () => {
    return players
      .map(p => ({ name: p.name, total: calculateTotal(p.id) }))
      .sort((a, b) => b.total - a.total);
  };

  const gameComplete = isGameComplete();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="sticky left-0 z-10 bg-slate-50 p-3 text-left font-bold text-slate-500 w-20 min-w-[80px] border-r border-slate-200">Cat.</th>
                {players.map(p => (
                  <th key={p.id} className="p-2 text-center font-black text-slate-800 min-w-[72px]">
                    <div className="truncate max-w-[72px] mx-auto text-xs sm:text-sm">{p.name}</div>
                    <div className="text-sky-500 text-[10px] sm:text-xs mt-0.5">{calculateTotal(p.id)} pts</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CATEGORIES.map(cat => (
                <tr key={cat.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                  <td className="sticky left-0 z-10 bg-white p-3 font-semibold text-slate-700 text-xs border-r border-slate-200">{cat.name}</td>
                  {players.map(p => {
                    const val = scores[p.id]?.[cat.id];
                    return (
                      <td key={p.id} className="p-1.5 text-center">
                        {val !== undefined ? (
                          <button
                            onClick={() => handleClearScore(p.id, cat.id)}
                            className={`w-full font-bold text-base sm:text-lg cursor-pointer hover:opacity-60 transition-opacity ${val === 'X' ? 'text-red-400' : 'text-slate-800'}`}
                            title="Click para borrar"
                          >
                            {val === 'X' ? '✕' : val}
                          </button>
                        ) : (
                          <select
                            onChange={(e) => {
                              const v = e.target.value;
                              if (v === "") return;
                              handleSetScore(p.id, cat.id, v === 'X' ? 'X' : Number(v));
                            }}
                            className="w-full max-w-[72px] p-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[10px] sm:text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 appearance-none text-center cursor-pointer hover:bg-white transition-all"
                            defaultValue=""
                          >
                            <option value="" disabled>---</option>
                            <option value="X">✕ Tachar</option>
                            {cat.type === 'numeric' ? (
                              [1, 2, 3, 4, 5].map(n => {
                                const score = n * parseInt(cat.id);
                                return <option key={n} value={score}>{score} pts</option>;
                              })
                            ) : (
                              <>
                                {cat.normal && <option value={cat.normal}>{cat.normal} pts</option>}
                                {cat.bonus && <option value={cat.bonus}>{cat.bonus} pts (S)</option>}
                                {cat.servida && <option value={cat.servida}>{cat.servida} pts (Serv)</option>}
                              </>
                            )}
                          </select>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {gameComplete && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 animate-fade-in-up">
          <h3 className="text-xl font-extrabold text-slate-900 mb-4 text-center">Resultado Final</h3>
          <div className="space-y-3">
            {getRanking().map((p, i) => (
              <div
                key={p.name}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl ${
                  i === 0
                    ? 'bg-emerald-50 border border-emerald-200'
                    : 'bg-slate-50 border border-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-lg font-black ${i === 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {i === 0 ? '🏆' : `#${i + 1}`}
                  </span>
                  <span className={`font-bold ${i === 0 ? 'text-emerald-800' : 'text-slate-700'}`}>
                    {p.name}
                  </span>
                </div>
                <span className={`text-xl font-black ${i === 0 ? 'text-emerald-600' : 'text-slate-500'}`}>
                  {p.total} pts
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralaBoard;
