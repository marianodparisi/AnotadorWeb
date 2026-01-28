
import React, { useState, useEffect } from 'react';
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
        return <GenericCardBoard type={gameState.type} players={gameState.players} onUpdateScore={updateScore} />;
      default:
        return <div>Próximamente...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-4 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={resetGame}>
          <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-sky-200">
            {gameState.status === 'MENU' ? '🇦🇷' : GAME_DETAILS[gameState.type].icon}
          </div>
          <h1 className="font-bold text-xl tracking-tight text-slate-800">
            {gameState.status === 'MENU' ? 'Anotador Argento' : GAME_DETAILS[gameState.type].name}
          </h1>
        </div>
        {gameState.status !== 'MENU' && (
          <button 
            onClick={resetGame}
            className="text-slate-500 hover:text-red-500 font-medium text-sm transition-colors"
          >
            Abandonar
          </button>
        )}
      </header>

      <main className="max-w-2xl mx-auto px-4 mt-6">
        {gameState.status === 'MENU' && <GameSelection onSelect={selectGame} />}
        {gameState.status === 'SETUP' && <PlayerSetup gameType={gameState.type} onStart={startGame} onBack={resetGame} />}
        {gameState.status === 'PLAYING' && renderBoard()}
      </main>
    </div>
  );
};

export default App;
