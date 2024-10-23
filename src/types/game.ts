export interface Position {
  x: number;
  y: number;
}

export interface Level {
  maze: number[][];
  basePoints: number;
  enemies: {
    position: Position;
    patrolPath: 'horizontal' | 'vertical' | 'diagonal';
  }[];
}

export interface PlayerScore {
  name: string;
  level: number;
  points: number;
}

export type GameState = 'welcome' | 'playing' | 'won' | 'lost' | 'completed';