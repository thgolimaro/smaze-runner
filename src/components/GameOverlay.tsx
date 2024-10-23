import React from 'react';

interface GameOverlayProps {
  children: React.ReactNode;
}

const GameOverlay: React.FC<GameOverlayProps> = ({ children }) => {
  return (
    <div className="absolute inset-0 bg-black/75 flex items-center justify-center backdrop-blur-sm">
      <div className="transform scale-100 transition-transform duration-300">
        {children}
      </div>
    </div>
  );
};

export default GameOverlay;