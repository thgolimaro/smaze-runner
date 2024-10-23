import React, { useEffect } from 'react';
import { useGameContext } from '../context/GameContext';
import { Circle } from 'lucide-react';

const Player: React.FC = () => {
  const { playerPosition, movePlayer, checkCollisions, gameState } = useGameContext();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      switch (e.key) {
        case 'ArrowUp':
          movePlayer({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          movePlayer({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          movePlayer({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          movePlayer({ x: 1, y: 0 });
          break;
      }
      checkCollisions();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movePlayer, checkCollisions, gameState]);

  return (
    <div
      className="absolute transition-all duration-200 ease-out"
      style={{
        left: `${playerPosition.x * 10}%`,
        top: `${playerPosition.y * 10}%`,
        width: '10%',
        height: '10%',
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <Circle className="w-8 h-8 text-yellow-400 animate-pulse" />
      </div>
    </div>
  );
};

export default Player;