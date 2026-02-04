
import React, { useState } from 'react';
import { GameType, Player, GameState, GAME_DETAILS } from './types';
import GameSelection from './components/GameSelection';
import PlayerSetup from './components/PlayerSetup';
import TrucoBoard from './components/ScoreBoards/TrucoBoard';
import GeneralaBoard from './components/ScoreBoards/GeneralaBoard';
import DiezMilBoard from './components/ScoreBoards/DiezMilBoard';
import ChanchoBoard from './components/ScoreBoards/ChanchoBoard';
import GenericCardBoard from './components/ScoreBoards/GenericCardBoard';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    type: 'GENERALA',
    players: [],
    status: 'MENU',
    config: {}
  });

  const selectGame = (type: GameType) => {
    setGameState(prev => ({ ...prev, type, status: 'SETUP' }));
  };

  const startGame = (players: string[], config: { maxPoints?: number, isTeams?: boolean }) => {
    const initialPlayers: Player[] = players.map((name, index) => ({
      id: `player-${index}-${Date.now()}`,
      name,
      score: 0,
      history: []
    }));
    setGameState(prev => ({ ...prev, players: initialPlayers, status: 'PLAYING', config }));
  };

  const updateScore = (playerId: string, points: number, extraData?: any) => {
    setGameState(prev => ({
      ...prev,
      players: prev.players.map(p => 
        p.id === playerId 
          ? { ...p, score: p.score + points, history: [...p.history, extraData || points] } 
          : p
      )
    }));
  };

  const resetGame = () => {
    setGameState({
      type: 'GENERALA',
      players: [],
      status: 'MENU',
      config: {}
    });
  };

  const renderBoard = () => {
    switch (gameState.type) {
      case 'TRUCO':
        return <TrucoBoard players={gameState.players} onUpdateScore={updateScore} config={gameState.config} />;
      case 'GENERALA':
        return <GeneralaBoard players={gameState.players} onUpdateScore={updateScore} />;
      case 'DIEZ_MIL':
        return <DiezMilBoard players={gameState.players} onUpdateScore={updateScore} />;
      case 'CHANCHO':
        return <ChanchoBoard players={gameState.players} onUpdateScore={updateScore} />;
      case 'CASITA_ROBADA':
      case 'ESCOBA_15':
      case 'UNO':
      case 'CHINCHON':
        return <GenericCardBoard type={gameState.type} players={gameState.players} onUpdateScore={updateScore} />;
      default:
        return <div>Próximamente...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F5F9] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-4 py-3 sm:px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={resetGame}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
              {gameState.status === 'MENU' ? '🇦🇷' : (
                gameState.type === 'UNO' ? (
                  <svg viewBox="0 0 100 100" className="w-8 h-8">
                     <circle cx="50" cy="50" r="48" fill="white" />
                     <path d="M 50 50 L 50 4 A 46 46 0 0 0 4 50 Z" fill="#ef4444" />
                     <path d="M 50 50 L 96 50 A 46 46 0 0 0 50 4 Z" fill="#3b82f6" />
                     <path d="M 50 50 L 50 96 A 46 46 0 0 0 96 50 Z" fill="#22c55e" />
                     <path d="M 50 50 L 4 50 A 46 46 0 0 0 50 96 Z" fill="#eab308" />
                     <circle cx="50" cy="50" r="15" fill="white" />
                     <text x="50" y="55" fontSize="13" fontWeight="900" textAnchor="middle" fill="#1e293b" fontFamily="sans-serif">UNO</text>
                  </svg>
                ) : GAME_DETAILS[gameState.type].icon
              )}
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight text-slate-800">
                {gameState.status === 'MENU' ? 'Anotador Argento' : GAME_DETAILS[gameState.type].name}
              </h1>
              {gameState.status !== 'MENU' && (
                <p className="text-xs text-slate-500 font-medium">Jugando ahora</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {gameState.status !== 'MENU' ? (
              <button 
                onClick={resetGame}
                className="text-sm font-semibold text-slate-500 hover:text-red-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
              >
                Abandonar
              </button>
            ) : (
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Mi Cuenta
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {gameState.status === 'MENU' && <GameSelection onSelect={selectGame} />}
        {gameState.status === 'SETUP' && <PlayerSetup gameType={gameState.type} onStart={startGame} onBack={resetGame} />}
        {gameState.status === 'PLAYING' && (
          <div className="animate-fade-in-up">
            {renderBoard()}
          </div>
        )}
      </main>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
