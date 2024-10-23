import React from 'react';
import { useGameContext } from '../context/GameContext';
import { Star } from 'lucide-react';

const Goal: React.FC = () => {
  const { goalPosition } = useGameContext();

  return (
    <div
      className="absolute"
      style={{
        left: `${goalPosition.x * 10}%`,
        top: `${goalPosition.y * 10}%`,
        width: '10%',
        height: '10%',
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <Star className="w-8 h-8 text-yellow-400 animate-pulse" fill="currentColor" />
      </div>
    </div>
  );
};

export default Goal;