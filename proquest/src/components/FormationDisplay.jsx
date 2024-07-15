import React, { useEffect, useState } from 'react';
import PlannerPlayer from './PlannerPlayer';

const FormationDisplay = ({ formation, onBoxClick, playerListClosed, onPlayerRemove }) => {
  // Function to render a line of positions
  const [boxSelected, setBoxSelected] = useState(null);
  useEffect(()=>{
    if(playerListClosed)setBoxSelected(null);
  },[playerListClosed]);

  const renderLine = (line, lineType) => (
    <div key={lineType} className="flex flex-col items-center gap-4 mb-4">
      {line.map((lineItem, lineIndex) => (
        <div key={lineIndex} className="flex justify-center gap-2 mb-4">
          {Array.isArray(lineItem.players) ? (
            lineItem.players.map((player, playerIndex) => (
              <div
                key={playerIndex}
                className="relative w-24 h-32"
              >
                <div
                  className="w-full h-full border border-gray-300 rounded-lg flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 relative"
                  onClick={() => {setBoxSelected({lineType, lineIndex, playerIndex});onBoxClick(lineType, lineIndex, playerIndex)}}
                >
                  {player ? (
                    <PlannerPlayer 
                      player={player} 
                      onSelect={() => onPlayerRemove(lineType, lineIndex, playerIndex)} // Add onPlayerRemove handler
                    />
                  ) : (
                    <span className="text-4xl font-bold">{boxSelected!==null && boxSelected.lineType===lineType && boxSelected.lineIndex===lineIndex&&boxSelected.playerIndex===playerIndex ? 'o':'+'}</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-red-500">Error: players should be an array</div>
          )}
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
        {renderLine(formation.goalkeeperLine, 'goalkeeper')}
      </div>
    </div>
  );
};

export default FormationDisplay;
