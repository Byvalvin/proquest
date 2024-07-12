import React from 'react';
import { FaUser, FaStar } from 'react-icons/fa';

const PlannerPlayer = ({ player, onSelect }) => {
  const { first, last, position, star, overall } = player;
  const preferredPosition = position?.preferred[0] || 'Unknown';

  return (
    <div
      className="flex flex-col items-center justify-between w-24 h-32 bg-white border border-gray-300 rounded-md p-2 relative cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-200"
      onClick={() => onSelect(player)}
    >
      {/* Top Section: Star Icon */}
      {star && (
        <FaStar className="absolute top-1 right-1 text-yellow-400 text-xs" style={{ fontSize: '0.75rem' }} />
      )}

      {/* Middle Section */}
      <div className="flex flex-row w-full h-full">
        <div className="flex flex-col w-2/3 pr-2">
          {/* Player's Overall Rating */}
          <div className="text-xs font-bold mb-0.5">{overall}</div>
          {/* Player's Preferred Position */}
          <div className="text-xs text-gray-600 mt-0.5">{preferredPosition}</div>
        </div>
        <div className="flex items-center justify-center w-1/3">
          {/* User Icon */}
          <FaUser className="text-4xl text-gray-500" />
        </div>
      </div>

      {/* Bottom Section: Name */}
      <div className="flex items-center justify-center w-full mt-2">
        <p className="text-sm font-semibold truncate">{first} {last.charAt(0)}.</p>
      </div>
    </div>
  );
};

export default PlannerPlayer;
