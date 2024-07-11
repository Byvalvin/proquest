import PlayerProfile from "./PlayerProfile"
import axios from "axios"

const PlayerProfiles = ({playerprofiles, title="Scan Talents", isHomePage=false}) =>{

    const MAX = 3
    const max = playerprofiles.length < MAX ? playerprofiles.length : MAX

    playerprofiles = isHomePage ? playerprofiles.slice(0,max):playerprofiles
    
    return (
        <section className="bg-blue-50 px-4 py-10"> 
            <div className="container mx-auto max-w-screen-lg">
                <h2 className="text-3xl font-bold mb-4 text-center">{title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
                    {playerprofiles.map((playerprofile)=><PlayerProfile key={playerprofile._id} profileInfo={playerprofile}/>)}
                </div>
                
            </div>
        </section>
    )
}

const playersLoader = async() =>{
    const allPlayersUrl = "/api/players"
    const allPlayers = await axios.get(allPlayersUrl)
    return allPlayers.data.data
}

export {PlayerProfiles as default, playersLoader}