import React from 'react';
import { useGameContext } from '../context/GameContext';
import Maze from './Maze';
import Player from './Player';
import Enemy from './Enemy';
import Goal from './Goal';
import GameOverlay from './GameOverlay';
import WelcomeScreen from './WelcomeScreen';
import GameHUD from './GameHUD';
import { Trophy, Skull } from 'lucide-react';
import { LEVELS } from '../config/levels';

const Game: React.FC = () => {
  const { gameState, resetGame, currentLevel, score, timeLeft, playerScores } = useGameContext();

  if (gameState === 'welcome') {
    return <WelcomeScreen />;
  }

  return (
    <div className="relative w-full max-w-2xl">
      <GameHUD />
      <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-2xl">
        <Maze level={currentLevel} />
        <Player />
        {LEVELS[currentLevel].enemies.map((enemy, index) => (
          <Enemy
            key={index}
            id={index}
            startPosition={enemy.position}
            patrolPath={enemy.patrolPath}
          />
        ))}
        <Goal />
        
        {gameState !== 'playing' && (
          <GameOverlay>
            {gameState === 'completed' ? (
              <div className="text-center">
                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-4xl font-bold text-white mb-4">Game Completed!</h2>
                <p className="text-xl text-gray-200 mb-4">Final Score: {score}</p>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">High Scores</h3>
                  {playerScores.slice(-5).map((score, index) => (
                    <div key={index} className="text-gray-200">
                      {score.name}: {score.points} pts (Level {score.level})
                    </div>
                  ))}
                </div>
                <button
                  onClick={resetGame}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Play Again
                </button>
              </div>
            ) : gameState === 'lost' ? (
              <div className="text-center">
                <Skull className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-4xl font-bold text-white mb-4">Game Over</h2>
                <p className="text-xl text-gray-200 mb-4">Score: {score}</p>
                <button
                  onClick={resetGame}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : null}
          </GameOverlay>
        )}
      </div>
    </div>
  );
};

export default Game;