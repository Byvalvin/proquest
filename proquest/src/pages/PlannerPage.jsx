import React, { useState, useEffect } from 'react';
import ControlPanel from '../components/ControlPanel';
import FormationDisplay from '../components/FormationDisplay';
import PlayerList from '../components/PlayerList';
import SearchBar from '../components/SearchBar'; // Import SearchBar component
import { useLoaderData } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import FormationManager from '../components/FormationManager';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlannerPage = () => {
  const emptyFormation = {
    defenseLines: [{ players: [null] }],
    midfieldLines: [{ players: [null] }],
    attackLines: [{ players: [null] }],
    goalkeeperLine: [{ players: [null] }]
  }
  const [formation, setFormation] = useState(emptyFormation);

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showPlayerList, setShowPlayerList] = useState(false);
  const [currentBox, setCurrentBox] = useState(null);

  const allPlayers = useLoaderData()
  if(!allPlayers){
    return <LoadingSpinner message='Fetching Players...'></LoadingSpinner>
  }
  const [availablePlayers, setAvailablePlayers] = useState(allPlayers);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const [formations, setFormations] = useState([]);
  useEffect(()=>{
    const fetchFormations = async() =>{
      const baseURLs = ["https://proquest-pspc.onrender.com","https://3b14d84e-bf47-4b87-a7d1-29985604422c-00-373hveltrbpzh.riker.replit.dev:8080"]
      const allFormationsUrl = `${baseURLs[0]}/api/formations`
      const allFormations = await axios.get(allFormationsUrl)
      setFormations(allFormations.data.data)
    }
    fetchFormations()
  },[])
  const [isLoadedFormation, setIsLoadedFormation] = useState(false)
  const hasNullPlayers = () => {
    return formation.defenseLines.some(line => line.players.includes(null)) ||
        formation.midfieldLines.some(line => line.players.includes(null)) ||
        formation.attackLines.some(line => line.players.includes(null)) ||
        formation.goalkeeperLine.some(line => line.players.includes(null))
  };

  useEffect(() => {
    if (selectedPlayer && currentBox) {
      handleAddPlayer(currentBox.lineType, currentBox.lineIndex, currentBox.playerIndex);
    }
  }, [selectedPlayer, currentBox]);

  const handleAddPlayer = (lineType, lineIndex, playerIndex) => {
    if (selectedPlayer) {
      const {_id, first, last, position, overall, gender, star} = selectedPlayer
      const plan_player = {_id, first, last, position, overall, gender, star}
      const newFormation = { ...formation };
      const line = lineType === "goalkeeper" ? newFormation[`${lineType}Line`][lineIndex] : newFormation[`${lineType}Lines`][lineIndex];
      const updatedPlayers = [...line.players];
      // updatedPlayers[playerIndex] = selectedPlayer;
      updatedPlayers[playerIndex] = plan_player
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
    if(isLoadedFormation){
      toast.error("Cannot change saved formation")
      return
    }
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
    if(isLoadedFormation){
      toast.error("Cannot change saved formation")
      return
    }
    if(currentBox!==null && currentBox.lineType===lineType && currentBox.lineIndex===lineIndex && currentBox.playerIndex===playerIndex){
      setCurrentBox(null);
      setShowPlayerList(false);
    }else{
      setCurrentBox({ lineType, lineIndex, playerIndex });
      setShowPlayerList(true);
    }
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

  //formation handling
  const handleSaveFormation = async(name)=>{
    console.log(formation,"current")
    
    if(hasNullPlayers()){
      toast.error("Cannot save an incomplete formation")
      return
    }
    //const updatedFormations = [...formations, {...formation, name}]
    const baseURLs = ["https://proquest-pspc.onrender.com","https://3b14d84e-bf47-4b87-a7d1-29985604422c-00-373hveltrbpzh.riker.replit.dev:8080"]
    try {
      const response = await axios.post(`${baseURLs[0]}/api/formations`,{...formation, name})
      console.log(response.data)
      setFormations(response.data.data)
    } catch (error) {
      console.log(error)
    }
    setFormation(emptyFormation)
    setAvailablePlayers(allPlayers)
    console.log("saved", formations)
  }

  const handleLoadFormation =(savedFormation)=>{
    setFormation(savedFormation);
    setAvailablePlayers(allPlayers)
    setIsLoadedFormation(!isLoadedFormation)
  }

  const handleClearFormation = ()=>{
    setIsLoadedFormation(!isLoadedFormation)
    setFormation(emptyFormation)
    setAvailablePlayers(allPlayers)
  }

  const handleDeleteFormation = async(name)=>{
    // const updatedFormations = formations.filter((savedFormation)=>{
    //   const deleted = savedFormation.name!==name
    //   if(savedFormation.name===formation.name){
    //     handleClearFormation()
    //   }
    //   return deleted
    // })
    // console.log(updatedFormations)
    // setFormations(updatedFormations)
    const baseURLs = ["https://proquest-pspc.onrender.com","https://3b14d84e-bf47-4b87-a7d1-29985604422c-00-373hveltrbpzh.riker.replit.dev:8080"]
    try {
      const response = await axios.delete(`${baseURLs[0]}/api/formations/${name}`)
      console.log(response.data)
      setFormations(response.data.data)
    } catch (error) {
      console.log(error)
    }
    
  }

 
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
        {!showPlayerList && (
          <div className="relative">
            <FormationManager
            onSaveFormation={handleSaveFormation}
            formations={formations}
            onLoadFormation={handleLoadFormation}
            onClearFormation={handleClearFormation}
            onDeleteFormation={handleDeleteFormation}
             />
          </div>
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
