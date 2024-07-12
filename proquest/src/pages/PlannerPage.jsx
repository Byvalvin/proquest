// PlannerPage.jsx
import React, { useState, useEffect } from 'react';
import ControlPanel from '../components/ControlPanel';
import FormationDisplay from '../components/FormationDisplay';
import PlayerList from '../components/PlayerList';

const PlannerPage = () => {
  const [formation, setFormation] = useState({
    defenseLines: [{ players: [null, ] }],
    midfieldLines: [{ players: [null] }],
    attackLines: [{ players: [null] }],
    goalkeeperLine: [{ players: [null] }]
  });

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showPlayerList, setShowPlayerList] = useState(false);
  const [currentBox, setCurrentBox] = useState(null);

  const [availablePlayers, setAvailablePlayers] = useState([
    { _id: '1', first: 'John', last: 'Doe', position: { preferred: ['CB'] }, star: true, overall: 85 },
    { _id: '2', first: 'Jane', last: 'Smith', position: { preferred: ['CM'] }, star: false, overall: 78 },
    { _id: '3', first: 'Goalie', last: 'One', position: { preferred: ['GK'] }, star: true, overall: 90 }
  ]);

  useEffect(() => {
    if (selectedPlayer && currentBox) {
      handleAddPlayer(currentBox.lineType, currentBox.lineIndex, currentBox.playerIndex);
    }
  }, [selectedPlayer, currentBox]);

  const handleAddPlayer = (lineType, lineIndex, playerIndex) => {
    if (selectedPlayer) {
      console.log(lineType,"type")
      const newFormation = { ...formation };
      const line = lineType==="goalkeeper" ? newFormation[`${lineType}Line`][lineIndex] : newFormation[`${lineType}Lines`][lineIndex];
      console.log(line)
      const updatedPlayers = [...line.players];
      updatedPlayers[playerIndex] = selectedPlayer;
      if(lineType==="goalkeeper"){
        newFormation[`${lineType}Line`][lineIndex] = { players: updatedPlayers };
      }else{
        newFormation[`${lineType}Lines`][lineIndex] = { players: updatedPlayers };
      }
      setFormation(newFormation);

      // Remove the selected player from available players
      setAvailablePlayers((prevPlayers) =>
        prevPlayers.filter((player) => player._id !== selectedPlayer._id)
      );

      // Clear selections and close player list
      setSelectedPlayer(null);
      setShowPlayerList(false);
      setCurrentBox(null);
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
            players={availablePlayers}
            onPlayerSelect={handleSelectPlayer}
            onClose={handleClosePlayerList}
          />
        )}
      </aside>
      <main className="center-section w-1/2 p-4">
        <FormationDisplay
          formation={formation}
          onBoxClick={handleBoxClick}
        />
      </main>
      <div className="right-sidebar w-1/4 bg-gray-100 p-4">
        <ControlPanel onUpdateFormation={setFormation} />
      </div>
    </div>
  );
};

export default PlannerPage;
