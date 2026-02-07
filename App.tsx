
import React, { useState, useRef } from 'react';
import { GameType, Player, GameState, GameRecord, GAME_DETAILS } from './types';
import { saveGame } from './db';
import GameSelection from './components/GameSelection';
import PlayerSetup from './components/PlayerSetup';
import GameHistory from './components/GameHistory';
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
  const gameSavedRef = useRef(false);

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
    gameSavedRef.current = false;
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

  const saveCurrentGame = async (state: GameState) => {
    if (gameSavedRef.current) return;
    if (state.players.length === 0) return;
    const hasAnyScore = state.players.some(p => p.score !== 0);
    if (!hasAnyScore) return;

    gameSavedRef.current = true;

    const maxScore = Math.max(...state.players.map(p => p.score));
    const topPlayers = state.players.filter(p => p.score === maxScore);
    const winner = topPlayers.length === 1 ? topPlayers[0].name : undefined;

    await saveGame({
      type: state.type,
      players: state.players.map(p => ({ name: p.name, score: p.score })),
      winner,
      date: new Date().toISOString(),
      config: state.config.maxPoints ? { maxPoints: state.config.maxPoints } : undefined,
    });
  };

  const resetGame = () => {
    if (gameState.status === 'PLAYING') {
      saveCurrentGame(gameState);
    }
    setGameState({
      type: 'GENERALA',
      players: [],
      status: 'MENU',
      config: {}
    });
  };

  const openHistory = () => {
    if (gameState.status === 'PLAYING') {
      saveCurrentGame(gameState);
    }
    setGameState({
      type: 'GENERALA',
      players: [],
      status: 'HISTORY',
      config: {}
    });
  };

  const loadGame = (record: GameRecord) => {
    const loadedPlayers: Player[] = record.players.map((p, index) => ({
      id: `player-${index}-${Date.now()}`,
      name: p.name,
      score: p.score,
      history: []
    }));
    gameSavedRef.current = true;
    setGameState({
      type: record.type,
      players: loadedPlayers,
      status: 'PLAYING',
      config: record.config || {}
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

  const isHome = gameState.status === 'MENU' || gameState.status === 'HISTORY';

  return (
    <div className="min-h-screen bg-bg-main font-body text-gray-800 selection:bg-primary selection:text-white overflow-x-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 sticky top-0 bg-bg-main/90 backdrop-blur-md z-30">
        <div className="flex items-center gap-3 cursor-pointer" onClick={resetGame}>
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-clay-sm hover:scale-105 transition-transform duration-200">
            <span className="text-xl">🇦🇷</span>
          </div>
          <h1 className="font-display font-bold text-lg text-gray-800 tracking-tight">
            {isHome ? 'Anotador Argento' : GAME_DETAILS[gameState.type].name}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {gameState.status === 'MENU' && (
            <button
              onClick={openHistory}
              className="text-gray-400 hover:text-primary transition-colors p-2 rounded-full hover:bg-blue-50"
              title="Historial"
            >
              <span className="material-icons-round text-2xl">history</span>
            </button>
          )}
          {(gameState.status === 'PLAYING' || gameState.status === 'SETUP') && (
            <button
              onClick={resetGame}
              className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
              title="Volver al menú"
            >
              <span className="material-icons-round text-2xl">close</span>
            </button>
          )}
        </div>
      </header>

      <main className="max-w-md mx-auto px-5 pb-12">
        {gameState.status === 'MENU' && <GameSelection onSelect={selectGame} />}
        {gameState.status === 'SETUP' && <PlayerSetup gameType={gameState.type} onStart={startGame} onBack={resetGame} />}
        {gameState.status === 'PLAYING' && (
          <div className="animate-fade-in-up">
            {renderBoard()}
          </div>
        )}
        {gameState.status === 'HISTORY' && <GameHistory onBack={resetGame} onLoadGame={loadGame} />}
      </main>

      <footer className="py-6 text-center text-xs font-bold tracking-widest uppercase text-gray-400">
        Hecho con <span className="text-red-500 animate-pulse inline-block">❤️</span> en Argentina
      </footer>

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
