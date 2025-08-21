import React, { Suspense, useState, useEffect } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import ControlPanel from '../components/ControlPanel';
import FormationDisplay from '../components/FormationDisplay';
import PlayerList from '../components/PlayerList';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import FormationManager from '../components/FormationManager';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlannerPage = () => {
  const { allplayerprofiles } = useLoaderData(); // deferred promise

  return (
    <Suspense fallback={<LoadingSpinner message="Fetching Players..." />}>
      <Await
        resolve={allplayerprofiles}
        errorElement={<p className="text-center text-red-500">Failed to load players.</p>}
      >
        {(players) => <PlannerCore players={players} />}
      </Await>
    </Suspense>
  );
};

const PlannerCore = ({ players }) => {
  const emptyFormation = {
    defenseLines: [{ players: [null] }],
    midfieldLines: [{ players: [null] }],
    attackLines: [{ players: [null] }],
    goalkeeperLine: [{ players: [null] }]
  };

  const [formation, setFormation] = useState(emptyFormation);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showPlayerList, setShowPlayerList] = useState(false);
  const [currentBox, setCurrentBox] = useState(null);
  const [availablePlayers, setAvailablePlayers] = useState(players);
  const [searchTerm, setSearchTerm] = useState("");
  const [formations, setFormations] = useState([]);
  const [isLoadedFormation, setIsLoadedFormation] = useState(false);

  // Fetch formations
  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const res = await axios.get("/api/formations");
        setFormations(res.data.data || []);
      } catch (err) {
        console.error("Error fetching formations:", err);
      }
    };
    fetchFormations();
  }, []);

  // Auto-assign player when selected + box selected
  useEffect(() => {
    if (selectedPlayer && currentBox) {
      handleAddPlayer(currentBox.lineType, currentBox.lineIndex, currentBox.playerIndex);
    }
  }, [selectedPlayer, currentBox]);

  const hasNullPlayers = () => {
    return formation.defenseLines.some(line => line.players.includes(null)) ||
      formation.midfieldLines.some(line => line.players.includes(null)) ||
      formation.attackLines.some(line => line.players.includes(null)) ||
      formation.goalkeeperLine.some(line => line.players.includes(null));
  };

  // Add player to formation
  const handleAddPlayer = (lineType, lineIndex, playerIndex) => {
    if (selectedPlayer) {
      const { _id, first, last, position, overall, gender, star } = selectedPlayer;
      const plan_player = { _id, first, last, position, overall, gender, star };

      const newFormation = { ...formation };
      const lineKey = lineType === "goalkeeper" ? `${lineType}Line` : `${lineType}Lines`;
      const line = newFormation[lineKey][lineIndex];
      const updatedPlayers = [...line.players];
      updatedPlayers[playerIndex] = plan_player;
      newFormation[lineKey][lineIndex] = { players: updatedPlayers };

      setFormation(newFormation);
      setAvailablePlayers(prev => prev.filter(p => p._id !== selectedPlayer._id));
      setSelectedPlayer(null);
      setShowPlayerList(false);
      setCurrentBox(null);
    }
  };

  const handleRemovePlayer = (lineType, lineIndex, playerIndex) => {
    if (isLoadedFormation) {
      toast.error("Cannot change saved formation");
      return;
    }

    const lineKey = lineType === "goalkeeper" ? `${lineType}Line` : `${lineType}Lines`;
    const playerToRemove = formation[lineKey][lineIndex].players[playerIndex];
    if (playerToRemove) {
      const updatedFormation = { ...formation };
      const updatedPlayers = [...updatedFormation[lineKey][lineIndex].players];
      updatedPlayers[playerIndex] = null;
      updatedFormation[lineKey][lineIndex] = { players: updatedPlayers };

      setFormation(updatedFormation);
      setAvailablePlayers(prev => [...prev, playerToRemove]);
      setCurrentBox(null);
    }
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const filteredPlayers = availablePlayers.filter(p =>
    `${p.first} ${p.last}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.position?.preferred[0] || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateFormation = (newFormation) => {
    setFormation(newFormation);
    handleResetPlayers();
  };

  const handleResetPlayers = () => {
    const allUsedPlayers = Object.values(formation).flatMap(lines =>
      lines.flatMap(line => line.players.filter(p => p))
    );
    setAvailablePlayers(prev => [
      ...prev.filter(p => !allUsedPlayers.some(up => up._id === p._id)),
      ...allUsedPlayers
    ]);
  };

  const handleSaveFormation = async (name) => {
    if (hasNullPlayers()) {
      toast.error("Cannot save an incomplete formation");
      return;
    }
    try {
      const response = await axios.post("/api/formations", { ...formation, name });
      setFormations(response.data.data);
    } catch (error) {
      console.error(error);
    }
    setFormation(emptyFormation);
    setAvailablePlayers(players);
  };

  const handleLoadFormation = (savedFormation) => {
    setFormation(savedFormation);
    setAvailablePlayers(players);
    setIsLoadedFormation(true);
  };

  const handleClearFormation = () => {
    setIsLoadedFormation(false);
    setFormation(emptyFormation);
    setAvailablePlayers(players);
  };

  const handleDeleteFormation = async (name) => {
    try {
      const response = await axios.delete(`/api/formations/${name}`);
      if (formation.name === name) handleClearFormation();
      setFormations(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBoxClick = (lineType, lineIndex, playerIndex) => {
    if (isLoadedFormation) {
      toast.error("Cannot change saved formation");
      return;
    }
    if (currentBox?.lineType === lineType && currentBox?.lineIndex === lineIndex && currentBox?.playerIndex === playerIndex) {
      setCurrentBox(null);
      setShowPlayerList(false);
    } else {
      setCurrentBox({ lineType, lineIndex, playerIndex });
      setShowPlayerList(true);
    }
  };

  const handleClosePlayerList = () => {
    setShowPlayerList(false);
    setCurrentBox(null);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <aside className="w-full lg:w-1/4 bg-gray-100 p-4 lg:p-6">
        {showPlayerList ? (
          <div className="relative">
            <SearchBar value={searchTerm} onChange={handleSearchChange} className="mb-4" />
            <PlayerList
              players={filteredPlayers}
              onPlayerSelect={setSelectedPlayer}
              onClose={handleClosePlayerList}
              className="max-h-[calc(100vh-120px)] overflow-y-auto"
            />
          </div>
        ) : (
          <FormationManager
            onSaveFormation={handleSaveFormation}
            formations={formations}
            onLoadFormation={handleLoadFormation}
            onClearFormation={handleClearFormation}
            onDeleteFormation={handleDeleteFormation}
          />
        )}
      </aside>
      <main className="w-full lg:w-1/2 p-4 lg:p-6 flex-grow">
        <FormationDisplay
          formation={formation}
          onBoxClick={handleBoxClick}
          playerListClosed={!showPlayerList}
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