import React, { createContext, useContext, useState, useCallback } from 'react';
import { LEVELS } from '../config/levels';
import { GameState, Position, PlayerScore } from '../types/game';

interface GameContextType {
  playerName: string;
  setPlayerName: (name: string) => void;
  playerPosition: Position;
  goalPosition: Position;
  gameState: GameState;
  currentLevel: number;
  score: number;
  movePlayer: (direction: Position) => void;
  checkCollisions: () => void;
  resetGame: () => void;
  startGame: () => void;
  playerScores: PlayerScore[];
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playerName, setPlayerName] = useState<string>('');
  const [playerPosition, setPlayerPosition] = useState<Position>({ x: 0, y: 0 });
  const [goalPosition] = useState<Position>({ x: 9, y: 9 });
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [playerScores, setPlayerScores] = useState<PlayerScore[]>([]);

  const movePlayer = useCallback(
    (direction: Position) => {
      if (gameState !== 'playing') return;

      const newPosition = {
        x: playerPosition.x + direction.x,
        y: playerPosition.y + direction.y,
      };

      // Check wall collision before moving
      if (
        newPosition.x >= 0 &&
        newPosition.x < 10 &&
        newPosition.y >= 0 &&
        newPosition.y < 10
      ) {
        if (LEVELS[currentLevel].maze[newPosition.y][newPosition.x] === 1) {
          setGameState('lost');
          setPlayerScores((prev) => [
            ...prev,
            { name: playerName, level: currentLevel + 1, points: score }
          ]);
          return;
        }
        setPlayerPosition(newPosition);
      }
    },
    [playerPosition, gameState, currentLevel, playerName, score]
  );

  const checkCollisions = useCallback(() => {
    if (
      Math.abs(playerPosition.x - goalPosition.x) < 0.5 &&
      Math.abs(playerPosition.y - goalPosition.y) < 0.5
    ) {
      const levelPoints = LEVELS[currentLevel].basePoints;
      setScore((prev) => prev + levelPoints);
      
      if (currentLevel === LEVELS.length - 1) {
        setGameState('completed');
        setPlayerScores((prev) => [
          ...prev,
          { name: playerName, level: currentLevel + 1, points: score + levelPoints }
        ]);
      } else {
        const nextLevel = currentLevel + 1;
        setCurrentLevel(nextLevel);
        setPlayerPosition({ x: 0, y: 0 });
      }
      return;
    }

    LEVELS[currentLevel].enemies.forEach(enemy => {
      if (
        Math.abs(playerPosition.x - enemy.position.x) < 1 &&
        Math.abs(playerPosition.y - enemy.position.y) < 1
      ) {
        setGameState('lost');
        setPlayerScores((prev) => [
          ...prev,
          { name: playerName, level: currentLevel + 1, points: score }
        ]);
      }
    });
  }, [playerPosition, goalPosition, currentLevel, score, playerName]);

  const startGame = useCallback(() => {
    if (!playerName) return;
    setGameState('playing');
    setCurrentLevel(0);
    setPlayerPosition({ x: 0, y: 0 });
    setScore(0);
  }, [playerName]);

  const resetGame = useCallback(() => {
    setGameState('welcome');
    setPlayerName('');
    setCurrentLevel(0);
    setPlayerPosition({ x: 0, y: 0 });
    setScore(0);
  }, []);

  return (
    <GameContext.Provider
      value={{
        playerName,
        setPlayerName,
        playerPosition,
        goalPosition,
        gameState,
        currentLevel,
        score,
        movePlayer,
        checkCollisions,
        resetGame,
        startGame,
        playerScores,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};