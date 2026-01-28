
import React, { useState } from 'react';
import { Player } from '../../types';

interface GeneralaBoardProps {
  players: Player[];
  onUpdateScore: (playerId: string, points: number, data: any) => void;
}

const CATEGORIES = [
  { id: '1', name: 'Al 1', type: 'numeric' },
  { id: '2', name: 'Al 2', type: 'numeric' },
  { id: '3', name: 'Al 3', type: 'numeric' },
  { id: '4', name: 'Al 4', type: 'numeric' },
  { id: '5', name: 'Al 5', type: 'numeric' },
  { id: '6', name: 'Al 6', type: 'numeric' },
  { id: 'E', name: 'Escalera', bonus: 25, normal: 20, type: 'special' },
  { id: 'F', name: 'Full', bonus: 35, normal: 30, type: 'special' },
  { id: 'P', name: 'Póker', bonus: 45, normal: 40, type: 'special' },
  { id: 'G', name: 'Generala', normal: 50, type: 'special' },
  { id: 'DG', name: 'Doble G', normal: 100, type: 'special' },
];

const GeneralaBoard: React.FC<GeneralaBoardProps> = ({ players, onUpdateScore }) => {
  const [scores, setScores] = useState<Record<string, Record<string, number | 'X'>>>({});

  const handleSetScore = (playerId: string, catId: string, val: number | 'X' | "") => {
    if (val === "") return;
    
    const prevVal = scores[playerId]?.[catId];
    if (prevVal !== undefined) return; // Ya tiene valor

    setScores(prev => ({
      ...prev,
      [playerId]: {
        ...(prev[playerId] || {}),
        [catId]: val
      }
    }));

    if (val !== 'X') {
      onUpdateScore(playerId, val, { catId });
    }
  };

  const calculateTotal = (playerId: string) => {
    const playerScores = scores[playerId] || {};
    return Object.values(playerScores).reduce((acc: number, val: any) => acc + (val === 'X' ? 0 : (val as number)), 0);
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 text-left font-bold text-slate-500 w-24">Cat.</th>
              {players.map(p => (
                <th key={p.id} className="p-4 text-center font-black text-slate-800 min-w-[100px]">
                  <div className="truncate w-20 mx-auto">{p.name}</div>
                  <div className="text-sky-500 text-xs mt-1">{calculateTotal(p.id)} pts</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CATEGORIES.map(cat => (
              <tr key={cat.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-semibold text-slate-700">{cat.name}</td>
                {players.map(p => {
                  const val = scores[p.id]?.[cat.id];
                  return (
                    <td key={p.id} className="p-2 text-center">
                      {val !== undefined ? (
                        <div className={`font-bold text-lg ${val === 'X' ? 'text-red-400' : 'text-slate-800'}`}>
                          {val === 'X' ? '✕' : val}
                        </div>
                      ) : (
                        <select
                          onChange={(e) => {
                            const v = e.target.value;
                            if (v === "") return;
                            handleSetScore(p.id, cat.id, v === 'X' ? 'X' : Number(v));
                          }}
                          className="w-full max-w-[90px] p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 appearance-none text-center cursor-pointer hover:bg-white transition-all"
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
  );
};

export default GeneralaBoard;
