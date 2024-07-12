// ControlPanel.jsx
import React, { useState } from 'react';

const ControlPanel = ({ onUpdateFormation }) => {
  const [defenseLines, setDefenseLines] = useState([{ players: 1 }]);
  const [midfieldLines, setMidfieldLines] = useState([{ players: 1 }]);
  const [attackLines, setAttackLines] = useState([{ players: 1 }]);

  const handleLineChange = (lineType, index, value) => {
    const updatedLines = [...(lineType === 'defense' ? defenseLines : lineType === 'midfield' ? midfieldLines : attackLines)];
    updatedLines[index] = { players: parseInt(value, 10) };
    if (lineType === 'defense') setDefenseLines(updatedLines);
    if (lineType === 'midfield') setMidfieldLines(updatedLines);
    if (lineType === 'attack') setAttackLines(updatedLines);
  };

  const handleSubmit = () => {
    onUpdateFormation({
      defenseLines: defenseLines,
      midfieldLines: midfieldLines,
      attackLines: attackLines,
    });
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
              value={line.players}
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
          onClick={() => setAttackLines([...attackLines, { players: 1 }])}
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
              value={line.players}
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
          onClick={() => setMidfieldLines([...midfieldLines, { players: 1 }])}
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
              value={line.players}
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
          onClick={() => setDefenseLines([...defenseLines, { players: 1 }])}
          className="bg-green-500 text-white rounded-md py-2 px-4 hover:bg-green-600"
        >
          Add Defense Line
        </button>
      </div>

      

      

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
