import React from 'react';
import { LEVELS } from '../config/levels';

interface MazeProps {
  level: number;
}

const Maze: React.FC<MazeProps> = ({ level }) => {
  return (
    <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-0 bg-gray-900">
      {LEVELS[level].maze.map((row, y) =>
        row.map((cell, x) => (
          <div
            key={`${x}-${y}`}
            className={`
              ${cell === 1 ? 'bg-indigo-800' : 'bg-transparent'}
              transition-colors duration-300
              ${cell === 1 ? 'shadow-inner' : ''}
            `}
          />
        ))
      )}
    </div>
  );
};

export default Maze;