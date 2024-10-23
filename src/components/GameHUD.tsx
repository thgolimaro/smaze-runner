import React from 'react';
import { useGameContext } from '../context/GameContext';
import { Star } from 'lucide-react';

const GameHUD: React.FC = () => {
  const { playerName, currentLevel, score } = useGameContext();

  return (
    <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white">
        <div className="font-semibold">Player</div>
        <div className="text-lg">{playerName}</div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white">
        <div className="font-semibold">Level</div>
        <div className="text-lg">{currentLevel + 1}</div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white flex items-center gap-2">
        <Star className="w-5 h-5" />
        <div className="text-lg">{score}</div>
      </div>
    </div>
  );
};

export default GameHUD;