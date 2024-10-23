import React, { useEffect, useState } from 'react';
import { useGameContext } from '../context/GameContext';
import { Ghost } from 'lucide-react';

interface EnemyProps {
  id: number;
  startPosition: { x: number; y: number };
  patrolPath: 'horizontal' | 'vertical' | 'diagonal';
}

const Enemy: React.FC<EnemyProps> = ({ id, startPosition, patrolPath }) => {
  const [position, setPosition] = useState(startPosition);
  const [direction, setDirection] = useState(1);
  const { gameState, checkCollisions } = useGameContext();

  useEffect(() => {
    if (gameState !== 'playing') return;

    const moveInterval = setInterval(() => {
      setPosition(prev => {
        let newPos = { ...prev };
        
        switch (patrolPath) {
          case 'horizontal':
            newPos.x += 0.1 * direction;
            if (newPos.x >= 8 || newPos.x <= 2) {
              setDirection(-direction);
            }
            break;
          case 'vertical':
            newPos.y += 0.1 * direction;
            if (newPos.y >= 8 || newPos.y <= 2) {
              setDirection(-direction);
            }
            break;
          case 'diagonal':
            newPos.x += 0.1 * direction;
            newPos.y += 0.1 * direction;
            if (newPos.x >= 8 || newPos.x <= 2 || newPos.y >= 8 || newPos.y <= 2) {
              setDirection(-direction);
            }
            break;
        }
        
        return newPos;
      });
      
      checkCollisions();
    }, 50);

    return () => clearInterval(moveInterval);
  }, [direction, patrolPath, gameState, checkCollisions]);

  return (
    <div
      className="absolute transition-all duration-50 ease-linear"
      style={{
        left: `${position.x * 10}%`,
        top: `${position.y * 10}%`,
        width: '10%',
        height: '10%',
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <Ghost className="w-8 h-8 text-red-500" />
      </div>
    </div>
  );
};

export default Enemy;