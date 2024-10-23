import React, { useState } from 'react';
import { useGameContext } from '../context/GameContext';
import { Gamepad2 } from 'lucide-react';

const WelcomeScreen: React.FC = () => {
  const { setPlayerName, startGame } = useGameContext();
  const [inputName, setInputName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      setPlayerName(inputName.trim());
      startGame();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-xl">
      <div className="text-center mb-8">
        <Gamepad2 className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Maze Runner</h1>
        <p className="text-gray-600">Navigate through multiple levels of increasing difficulty!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Enter Your Name
          </label>
          <input
            type="text"
            id="name"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Your name"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Start Game
        </button>
      </form>

      <div className="mt-8 text-sm text-gray-600">
        <h2 className="font-semibold mb-2">How to Play:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Use arrow keys to move</li>
          <li>Avoid enemies and walls</li>
          <li>Reach the goal before time runs out</li>
          <li>Complete all levels to win</li>
          <li>Faster completion = More points!</li>
        </ul>
      </div>
    </div>
  );
};

export default WelcomeScreen;