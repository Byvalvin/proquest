import React from 'react';
import PlannerPlayer from './PlannerPlayer';

const PlayerList = ({ players, onPlayerSelect, onClose }) => {
  return (
    <div className="player-list bg-white p-4 shadow-lg rounded-lg max-w-md mx-auto">
      <button
        onClick={onClose}
        className="mb-4 bg-red-500 text-white rounded-md py-1 px-4 hover:bg-red-600"
      >
        Close
      </button>
      <div className="grid grid-cols-2 gap-4">
        {players.map((player) => (
          <PlannerPlayer
            key={player._id}
            player={player}
            onSelect={() => onPlayerSelect(player)}
            className="hover:bg-gray-100 border border-gray-200 rounded-md p-2"
          />
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
