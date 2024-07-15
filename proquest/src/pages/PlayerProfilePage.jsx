import { Link, useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaUser, FaVideo } from "react-icons/fa";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

const PlayerProfilePage = () => {
    const back = {
        link: "/players",
        text: "To All Players",
        icon: <FaArrowLeft className="mr-2" />,
        className: "flex items-center",
    };

    const playerInfo = useLoaderData();
    // Render loading message while waiting for player data
    if(!playerInfo){
        return <LoadingSpinner message="Fetching Player Data..."></LoadingSpinner>
    }

    // Destructure player info from state
    const {
        _id,
        first,
        last,
        DOB,
        age,
        nationality,
        team,
        estValue,
        footedness,
        position,
        specialities,
        weaknesses,
        description,
        review,
        views,
        overall,
        star,
    } = playerInfo;

    const preferredPosition = position.preferred[0];

    const navigate = useNavigate(); // To redirect to players page

    const deletePlayer = async (_id) => {
        const confirmQuestion = "Are you sure you want to remove this player from the network?";
        const confirmation = window.confirm(confirmQuestion);
        if (!confirmation) {
            return;
        }

        const baseURLs = ["https://proquest-pspc.onrender.com","https://3b14d84e-bf47-4b87-a7d1-29985604422c-00-373hveltrbpzh.riker.replit.dev:8080"]
        const delURL = `${baseURLs[0]}/api/players/${_id}`;
        try {
            const response = await axios.delete(delURL);
            console.log(response.data);
            toast.success("Player removed successfully.");
        } catch (error) {
            console.error('Error deleting player:', error);
            toast.error("Player could not be removed.");
        } finally {
            return navigate('/players');
        }
    };

    return (
        <>
            <section>
                <div className="container m-auto p-6">
                    <Link to={back.link} className={back.className}>
                        {back.icon} {back.text}
                    </Link>
                </div>
            </section>
            <div className="flex flex-col lg:flex-row justify-center lg:space-x-6">
                {/* Left Section */}
                <div className="flex-1 max-w-4xl p-8 bg-white shadow-lg rounded-lg lg:mr-6">
                    <div className="flex flex-col lg:flex-row lg:space-x-6">
                        {/* Player Card Section */}
                        <section className="border border-gray-300 rounded-lg p-6 mb-6 lg:mb-0 lg:w-3/4">
                            <h2 className="text-2xl font-bold mb-4">Player Card</h2>
                            <div className="flex flex-col lg:flex-row lg:items-center">
                                {/* Player Image */}
                                <div className="w-full lg:w-1/2 flex justify-center mb-4 lg:mb-0">
                                    <FaUser className="text-9xl text-gray-500" />
                                </div>
                                {/* Player Info on the Right */}
                                <div className="w-full lg:w-1/2 lg:pl-8">
                                    {/* Top Section (Overall, Main Position, Age) */}
                                    <div className="mb-4 flex flex-col lg:flex-row lg:items-center">
                                        <div className="flex-shrink-0 mb-4 lg:mb-0 flex justify-center lg:justify-end">
                                            <p className="text-4xl font-bold text-indigo-600 font-mono">{overall.toFixed(1)}</p>
                                        </div>
                                        <div className="ml-4 lg:ml-8 text-center lg:text-left">
                                            <p className="text-2xl font-bold text-gray-700">{preferredPosition}</p>
                                            <p className="text-2xl text-gray-700">{age}</p>
                                        </div>
                                    </div>
                                    {/* Bottom Section (Name, Club, Value) */}
                                    <div className="flex flex-col">
                                        <div className="flex items-center mb-2">
                                            <p className="text-sm text-gray-500 mr-2">Name:</p>
                                            <p className="text-lg">{`${first} ${last}`}</p>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            <p className="text-sm text-gray-500 mr-2">Club:</p>
                                            <p className="text-lg">{team}</p>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            <p className="text-sm text-gray-500 mr-2">Footedness:</p>
                                            <p className="text-lg">{footedness ? 'R' : 'L'}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <p className="text-sm text-gray-500 mr-2">Estimated Value:</p>
                                            <p className="text-lg">{`$${estValue}`}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Specialities Section */}
                        <section className="border border-gray-300 rounded-lg p-6 lg:w-1/4">
                            <h2 className="text-2xl font-bold mb-4">Specialities</h2>
                            <div className="flex flex-wrap">
                                {specialities.map((speciality, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold m-1"
                                    >
                                        {speciality}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* About Me Section */}
                    <section className="border border-gray-300 rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-4">Description</h2>
                        <p className="text-lg text-gray-700">{description}</p>
                    </section>

                    {/* Standing Review Section */}
                    <section className="border border-gray-300 rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Standing Review</h2>
                        <p className="text-lg text-gray-700">{review}</p>
                    </section>
                </div>

                {/* Right Section */}
                <div className="flex-1 max-w-2xl p-8 bg-white shadow-lg rounded-lg">
                    {/* First Main Section in Right */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Player Details</h2>
                        {/* First container with video */}
                        <div className="border border-gray-300 rounded-lg p-6 mb-4">
                            <div className="relative h-64">
                                {/* Actual video placeholder */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <FaVideo className="text-6xl text-gray-500" />
                                </div>
                            </div>
                        </div>
                        {/* Second sub-section with contact info */}
                        <div className="border border-gray-300 rounded-lg p-6">
                            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
                            <p className="text-gray-700">Email: example@example.com</p>
                        </div>
                    </section>

                    {/* Second Main Section in Right */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Manage Player</h2>
                        <div className="flex">
                            <Link
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4"
                                to={`/players/update/${_id}`}
                            >
                                Update
                            </Link>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                onClick={() => deletePlayer(_id)}
                            >
                                Remove
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

const playerLoader = async ({ params }) => {
    const baseURLs = ["https://proquest-pspc.onrender.com","https://3b14d84e-bf47-4b87-a7d1-29985604422c-00-373hveltrbpzh.riker.replit.dev:8080"]

    const playerUrl = `${baseURLs[0]}/api/players/${params.id}`;
    try {
        const player = await axios.get(playerUrl);
        console.log('Request URL:', player.config.url);
        console.log(player, "loader");
        return player.data.data;
    } catch (error) {
        console.error('Error fetching player:', error);
        throw error; // Rethrow the error to handle it in the component using this loader
    }
};

export { PlayerProfilePage as default, playerLoader };












/* fetching data using useEffect (place above return)
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

const {id} = useParams()
console.log(id)
const [player, setPlayer] = useState({})
useEffect(()=>{
    console.log(id)
    const fetchPlayer = async()=>{
        `/api/players"`
        const url = `/api/players/${id}`
        console.log(url)
        try {
            const player = await axios.get(url)
            console.log("kldsnvs")
            console.log(player.data)
            setPlayer(player.data)
        } catch (error) {
            console.log("ERROROERE",error)
        }
        
    }
    fetchPlayer()

}, [])
console.log(player)
*/

/* fetching data with a loader
import { useLoaderData } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

const playerLoader = async ({params}) => {
    const playerUrl = `/api/players/${params.id}`;
    //console.log(id)
    try {
      const player = await axios.get(playerUrl);
      return player.data;
    } catch (error) {
      console.error('Error fetching player lol:', error);
      throw error; // Rethrow the error to handle it in the component using this loader
    }
};
  
export {PlayerProfilePage as default, playerLoader}
*/
