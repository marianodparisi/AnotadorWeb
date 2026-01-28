
export type GameType = 'GENERALA' | 'DIEZ_MIL' | 'TRUCO' | 'CHANCHO' | 'CASITA_ROBADA' | 'ESCOBA_15';

export interface Player {
  id: string;
  name: string;
  score: number;
  history: any[];
}

export interface GameState {
  type: GameType;
  players: Player[];
  status: 'MENU' | 'SETUP' | 'PLAYING' | 'FINISHED';
  config: {
    maxPoints?: number;
    isTeams?: boolean;
  };
}

export const GAME_DETAILS = {
  GENERALA: { name: 'Generala', icon: '🎲', description: 'El clásico de los dados.' },
  DIEZ_MIL: { name: '10.000', icon: '✨', description: 'Suma hasta llegar a diez mil.' },
  TRUCO: { name: 'Truco', icon: '🃏', description: '¡Quiero vale cuatro!' },
  CHANCHO: { name: 'Chancho', icon: '🐷', description: 'C-H-A-N-C-H-O' },
  CASITA_ROBADA: { name: 'Casita Robada', icon: '🏠', description: 'Robá cartas de la mesa.' },
  ESCOBA_15: { name: 'Escoba del 15', icon: '🧹', description: 'Sumá 15 y barré la mesa.' },
};
