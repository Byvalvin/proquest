import React from 'react';
import PlannerPlayer from './PlannerPlayer';

const PlayerList = ({ players, onPlayerSelect, onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full relative">
        <button className="absolute top-2 right-2 text-red-500" onClick={onClose}>✕</button>
        <h2 className="text-lg font-bold mb-4">Select a Player</h2>
        <div className="grid grid-cols-1 gap-4">
          {players.length === 0 ? (
            <p>No players available.</p>
          ) : (
            players.map((player) => (
              <PlannerPlayer
                key={player._id}
                player={player}
                onSelect={() => onPlayerSelect(player)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerList;
