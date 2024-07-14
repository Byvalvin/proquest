import React, { useState, useEffect } from 'react';
import ControlPanel from '../components/ControlPanel';
import FormationDisplay from '../components/FormationDisplay';
import PlayerList from '../components/PlayerList';
import SearchBar from '../components/SearchBar'; // Import SearchBar component
import { useLoaderData } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const PlannerPage = () => {
  const [formation, setFormation] = useState({
    defenseLines: [{ players: [null] }],
    midfieldLines: [{ players: [null] }],
    attackLines: [{ players: [null] }],
    goalkeeperLine: [{ players: [null] }]
  });

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showPlayerList, setShowPlayerList] = useState(false);
  const [currentBox, setCurrentBox] = useState(null);

  const [availablePlayers, setAvailablePlayers] = useState(useLoaderData());
  if(!availablePlayers){
    return <LoadingSpinner message='Fetching Players...'></LoadingSpinner>
  }
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    if (selectedPlayer && currentBox) {
      handleAddPlayer(currentBox.lineType, currentBox.lineIndex, currentBox.playerIndex);
    }
  }, [selectedPlayer, currentBox]);

  const handleAddPlayer = (lineType, lineIndex, playerIndex) => {
    if (selectedPlayer) {
      const newFormation = { ...formation };
      const line = lineType === "goalkeeper" ? newFormation[`${lineType}Line`][lineIndex] : newFormation[`${lineType}Lines`][lineIndex];
      const updatedPlayers = [...line.players];
      updatedPlayers[playerIndex] = selectedPlayer;
      if (lineType === "goalkeeper") {
        newFormation[`${lineType}Line`][lineIndex] = { players: updatedPlayers };
      } else {
        newFormation[`${lineType}Lines`][lineIndex] = { players: updatedPlayers };
      }
      setFormation(newFormation);

      setAvailablePlayers(prevPlayers =>
        prevPlayers.filter(player => player._id !== selectedPlayer._id)
      );

      setSelectedPlayer(null);
      setShowPlayerList(false);
      setCurrentBox(null);
    }
  };

  const handleRemovePlayer = (lineType, lineIndex, playerIndex) => {
    const playerToRemove = formation[lineType === "goalkeeper" ? `${lineType}Line` : `${lineType}Lines`][lineIndex].players[playerIndex];
    if (playerToRemove) {
      const newFormation = { ...formation };
      const line = lineType === "goalkeeper" ? newFormation[`${lineType}Line`][lineIndex] : newFormation[`${lineType}Lines`][lineIndex];
      const updatedPlayers = [...line.players];
      updatedPlayers[playerIndex] = null;
      if (lineType === "goalkeeper") {
        newFormation[`${lineType}Line`][lineIndex] = { players: updatedPlayers };
      } else {
        newFormation[`${lineType}Lines`][lineIndex] = { players: updatedPlayers };
      }
      setFormation(newFormation);

      setAvailablePlayers(prevPlayers => {
        if (!prevPlayers.some(player => player._id === playerToRemove._id)) {
          return [...prevPlayers, playerToRemove];
        }
        return prevPlayers;
      });

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

  const handleUpdateFormation = (newFormation) => {
    setFormation(newFormation);
    handleResetPlayers();
  };

  const handleResetPlayers = () => {
    const allPlayers = Object.values(formation)
      .flatMap(lines => lines.flatMap(line => line.players.filter(player => player)))
    
    setAvailablePlayers(prevPlayers => [
      ...prevPlayers.filter(player => !allPlayers.some(p => p._id === player._id)),
      ...allPlayers
    ]);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter available players based on the search term
  const filteredPlayers = availablePlayers.filter(player => 
    player.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.last.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (player.position?.preferred[0] || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <aside className="w-full lg:w-1/4 bg-gray-100 p-4 lg:p-6">
        {showPlayerList && (
          <div className="relative">
            <SearchBar value={searchTerm} onChange={handleSearchChange} className="mb-4" />
            <PlayerList
              players={filteredPlayers}
              onPlayerSelect={handleSelectPlayer}
              onClose={handleClosePlayerList}
              className="max-h-[calc(100vh-120px)] overflow-y-auto"
            />
          </div>
        )}
      </aside>
      <main className="w-full lg:w-1/2 p-4 lg:p-6 flex-grow">
        <FormationDisplay
          formation={formation}
          onBoxClick={handleBoxClick}
          onPlayerRemove={handleRemovePlayer}
        />
      </main>
      <div className="w-full lg:w-1/4 bg-gray-100 p-4 lg:p-6">
        <ControlPanel onUpdateFormation={handleUpdateFormation} onResetPlayers={handleResetPlayers} />
      </div>
    </div>
  );
};

export default PlannerPage;
