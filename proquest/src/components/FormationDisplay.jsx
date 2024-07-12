import React from 'react';
import PlannerPlayer from './PlannerPlayer';

const FormationDisplay = ({ formation, onAddPlayer, selectedPlayer, onSelectPlayer }) => {
  // Function to render a line of positions
  const renderLine = (line, lineType) => (
    <div key={lineType} className="flex flex-col items-center gap-4 mb-4">
      {line.map((lineItem, lineIndex) => (
        <div key={lineIndex} className="flex justify-center gap-2 mb-4">
          {Array.from({ length: lineItem.players }, (_, playerIndex) => (
            <div
              key={playerIndex}
              className="relative w-20 h-28"
            >
              <div
                className="w-full h-full border border-gray-300 rounded-lg flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 relative"
                onClick={() => onAddPlayer(lineType, lineIndex, playerIndex)}
              >
                {/* Display player profile if available, otherwise show a "+" */}
                {lineItem.players > 0 && selectedPlayer ? (
                  <PlannerPlayer player={selectedPlayer} onSelect={onSelectPlayer} />
                ) : (
                  <span className="text-2xl font-bold">+</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-4 flex flex-col items-center">
      <div className="w-full max-w-lg">
        <div className="text-lg font-semibold mb-4">Attack</div>
        {renderLine(formation.attackLines, 'attack')}
        <div className="text-lg font-semibold mb-4">Midfield</div>
        {renderLine(formation.midfieldLines, 'midfield')}
        <div className="text-lg font-semibold mb-4">Defense</div>
        {renderLine(formation.defenseLines, 'defense')}
        <div className="text-lg font-semibold mb-4">GK</div>
        {renderLine([{ players: 1 }], 'goalkeeper')}
      </div>
    </div>
  );
};

export default FormationDisplay;
