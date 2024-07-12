// ControlPanel.jsx
import React, { useState } from 'react';

const ControlPanel = ({ onUpdateFormation, onResetPlayers }) => {
  const [defenseLines, setDefenseLines] = useState([{ players: [null] }]);
  const [midfieldLines, setMidfieldLines] = useState([{ players: [null] }]);
  const [attackLines, setAttackLines] = useState([{ players: [null] }]);
  const [goalkeeperLine, setGoalkeeperLine] = useState([{ players: [null] }]);

  // Function to handle changes in line number inputs
  const handleLineChange = (lineType, index, value) => {
    // Remove leading zeros
    const numPlayers = parseInt(value, 10) || 0;
    let updatedLines = [...(lineType === 'defense' ? defenseLines : lineType === 'midfield' ? midfieldLines : attackLines)];

    updatedLines[index] = { players: numPlayers ? new Array(numPlayers).fill(null) : [] };

    if (lineType === 'defense') setDefenseLines(updatedLines);
    if (lineType === 'midfield') setMidfieldLines(updatedLines);
    if (lineType === 'attack') setAttackLines(updatedLines);
  };

  const handleSubmit = () => {
    const formattedFormation = {
      defenseLines: defenseLines.map(line => ({
        players: line.players || []
      })),
      midfieldLines: midfieldLines.map(line => ({
        players: line.players || []
      })),
      attackLines: attackLines.map(line => ({
        players: line.players || []
      })),
      goalkeeperLine: goalkeeperLine.map(line => ({
        players: line.players || []
      }))
    };

    onUpdateFormation(formattedFormation);
    onResetPlayers(); // Call reset players callback
  };

  // Helper function to format input value
  const formatValue = (value) => {
    const num = parseInt(value, 10);
    return isNaN(num) ? '' : num.toString();
  };

  return (
    <div className="control-panel p-4">
      <h2 className="text-lg font-semibold mb-4">Formation Control</h2>

      {/* Attack Lines */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Attack Lines:</label>
        {attackLines.map((line, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="number"
              value={formatValue(line.players.length)}
              onChange={(e) => handleLineChange('attack', index, e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-1/2"
              min="1"
            />
            <button
              onClick={() => setAttackLines(attackLines.filter((_, i) => i !== index))}
              className="ml-2 bg-red-500 text-white rounded-md py-1 px-2 hover:bg-red-600"
            >
              Remove Line
            </button>
          </div>
        ))}
        <button
          onClick={() => setAttackLines([...attackLines, { players: new Array(1).fill(null) }])}
          className="bg-green-500 text-white rounded-md py-2 px-4 hover:bg-green-600"
        >
          Add Attack Line
        </button>
      </div>

      {/* Midfield Lines */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Midfield Lines:</label>
        {midfieldLines.map((line, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="number"
              value={formatValue(line.players.length)}
              onChange={(e) => handleLineChange('midfield', index, e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-1/2"
              min="1"
            />
            <button
              onClick={() => setMidfieldLines(midfieldLines.filter((_, i) => i !== index))}
              className="ml-2 bg-red-500 text-white rounded-md py-1 px-2 hover:bg-red-600"
            >
              Remove Line
            </button>
          </div>
        ))}
        <button
          onClick={() => setMidfieldLines([...midfieldLines, { players: new Array(1).fill(null) }])}
          className="bg-green-500 text-white rounded-md py-2 px-4 hover:bg-green-600"
        >
          Add Midfield Line
        </button>
      </div>

      {/* Defense Lines */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Defense Lines:</label>
        {defenseLines.map((line, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="number"
              value={formatValue(line.players.length)}
              onChange={(e) => handleLineChange('defense', index, e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-1/2"
              min="1"
            />
            <button
              onClick={() => setDefenseLines(defenseLines.filter((_, i) => i !== index))}
              className="ml-2 bg-red-500 text-white rounded-md py-1 px-2 hover:bg-red-600"
            >
              Remove Line
            </button>
          </div>
        ))}
        <button
          onClick={() => setDefenseLines([...defenseLines, { players: new Array(1).fill(null) }])}
          className="bg-green-500 text-white rounded-md py-2 px-4 hover:bg-green-600"
        >
          Add Defense Line
        </button>
      </div>

      {/* Goalkeeper Line */}
      {/* <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Goalkeeper Line:</label>
        {goalkeeperLine.map((line, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="number"
              value={formatValue(line.players.length)}
              onChange={(e) => handleLineChange('goalkeeper', index, e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-1/2"
              min="1"
            />
            <button
              onClick={() => setGoalkeeperLine(goalkeeperLine.filter((_, i) => i !== index))}
              className="ml-2 bg-red-500 text-white rounded-md py-1 px-2 hover:bg-red-600"
            >
              Remove Line
            </button>
          </div>
        ))}
        <button
          onClick={() => setGoalkeeperLine([...goalkeeperLine, { players: new Array(1).fill(null) }])}
          className="bg-green-500 text-white rounded-md py-2 px-4 hover:bg-green-600"
        >
          Add Goalkeeper Line
        </button>
      </div> */}

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
      >
        Update Formation
      </button>
    </div>
  );
};

export default ControlPanel;
