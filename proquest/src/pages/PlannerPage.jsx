import React, { useState } from 'react';
import ControlPanel from '../components/ControlPanel';
import FormationDisplay from '../components/FormationDisplay';
import PlayerList from '../components/PlayerList'; // Import PlayerList

const PlannerPage = () => {
  const [formation, setFormation] = useState({
    defenseLines: [{ players: 1 }],
    midfieldLines: [{ players: 1 }],
    attackLines: [{ players: 1 }],
  });

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showPlayerList, setShowPlayerList] = useState(false);
  const [currentBox, setCurrentBox] = useState(null);

  // Dummy player data
  const players = [
    { _id: '1', first: 'John', last: 'Doe', position: { preferred: ['ST'] }, star: true, overall: 85 },
    { _id: '2', first: 'Jane', last: 'Smith', position: { preferred: ['CM'] }, star: false, overall: 78 },
    // Add more dummy players as needed
  ];

  const handleUpdateFormation = (updatedFormation) => {
    setFormation(updatedFormation);
  };

  const handleAddPlayer = (lineType, lineIndex, playerIndex) => {
    if (selectedPlayer && currentBox) {
      const newFormation = { ...formation };
      const line = newFormation[`${lineType}Lines`][lineIndex];
      line.players = line.players.map((player, index) =>
        index === playerIndex ? selectedPlayer : player
      );
      setFormation(newFormation);
      setSelectedPlayer(null); // Clear the selection after adding
      setShowPlayerList(false); // Hide player list
      setCurrentBox(null); // Clear the current box
    }
  };

  const handleSelectPlayer = (player) => {
    setSelectedPlayer(player);
  };

  const handleBoxClick = (lineType, lineIndex, playerIndex) => {
    setCurrentBox({ lineType, lineIndex, playerIndex });
    setShowPlayerList(true);
  };

  const handleClosePlayerList = () => {
    setShowPlayerList(false);
    setCurrentBox(null);
  };

  return (
    <div className="formation-planner-page flex">
      <aside className="left-sidebar w-1/4 bg-gray-100 p-4">
        {showPlayerList && (
          <PlayerList
            players={players}
            onPlayerSelect={handleSelectPlayer}
            onClose={handleClosePlayerList}
          />
        )}
      </aside>
      <main className="center-section w-1/2 p-4">
        <FormationDisplay
          formation={formation}
          onAddPlayer={handleAddPlayer}
          onBoxClick={handleBoxClick} // Pass the box click handler
        />
      </main>
      <div className="right-sidebar w-1/4 bg-gray-100 p-4">
        <ControlPanel onUpdateFormation={handleUpdateFormation} />
      </div>
    </div>
  );
};

export default PlannerPage;
