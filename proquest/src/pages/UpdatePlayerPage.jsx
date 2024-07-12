import { useLoaderData, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import natData from '../nat.json'

const UpdatePlayerPage = () =>{
    const playerToUpdate = useLoaderData()
    const navigate = useNavigate()

    // console.log(playerToUpdate)
    const initialPlayerState = {
        first: playerToUpdate.first,
        last: playerToUpdate.last,
        DOB: playerToUpdate.DOB,
        age: playerToUpdate.age,
        nationality: playerToUpdate.nationality,
        team: playerToUpdate.team,
        estValue: playerToUpdate.estValue,
        footedness: playerToUpdate.footedness ? "Right" : "Left",
        mainPosition: playerToUpdate.position.preferred[0],
        preferredPositions: playerToUpdate.position.preferred.slice(1).join(", "),
        otherPositions: playerToUpdate.position.other.join(", "),
        specialities: playerToUpdate.specialities.join(", "),
        weaknesses: playerToUpdate.weaknesses.join(", "),
        description: playerToUpdate.description,
        review:playerToUpdate.review,
        views: playerToUpdate.views,
        overall: playerToUpdate.overall,
        star: playerToUpdate.star
    };
      
    const [first, setFirst] = useState(initialPlayerState.first);
    const [last, setLast] = useState(initialPlayerState.last);
    const [DOB, setDOB] = useState({ year: initialPlayerState.DOB.year, month: initialPlayerState.DOB.month, day: initialPlayerState.DOB.day });
    const [age, setAge] = useState(initialPlayerState.age);
    const [nationality, setNationality] = useState(initialPlayerState.nationality);
    const [team, setTeam] = useState(initialPlayerState.team);
    const [estValue, setEstValue] = useState(initialPlayerState.estValue); 
    const [footedness, setFootedness] = useState(initialPlayerState.footedness);
    const [mainPosition, setMainPosition] = useState(initialPlayerState.mainPosition);
    const [preferredPositions, setPreferredPositions] = useState(initialPlayerState.preferredPositions);
    const [otherPositions, setOtherPositions] = useState(initialPlayerState.otherPositions);
    const [specialities, setSpecialities] = useState(initialPlayerState.specialities);
    const [weaknesses, setWeaknesses] = useState(initialPlayerState.weaknesses);
    const [description, setDescription] = useState(initialPlayerState.description);
    const [review, setReview] = useState(initialPlayerState.review);
    const [views, setViews] = useState(initialPlayerState.views); 
    const [overall, setOverall] = useState(initialPlayerState.overall); 
    const [star, setStar] = useState(initialPlayerState.star);

    const [validNationalities, setValidNationalities] = useState([]);
    const [validTeams, setValidTeams] = useState([]);

    // Validation state
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
        try {
            const nationalities = getNationalities();
            const teamNames = await getTeamNames();
            
            setValidNationalities(nationalities);
            setValidTeams(teamNames);
        } catch (error) {
            console.error("Error fetching data:", error);
            // Handle error if needed
        }
        };

        fetchData();
    }, []);

    const getNationalities = () => {
        try {
          const nationalities = natData.nationalities
          const allNationalities = nationalities.map((nat)=>nat.abbr)
          return allNationalities;
        } catch (error) {
          console.error("Error fetching nationalities:", error);
          return [];
        }
    };

    const getTeamNames = async () => {
        try {
        const response = await axios.get("https://proquest-pspc.onrender.com/api/teams");
        const teamNames = response.data.data.map((team) => team.name);
        return teamNames;
        } catch (error) {
        console.error("Error fetching teams:", error);
        return [];
        }
    };

    const updatePlayer = async(player)=>{
        try {
            //const updateURL = `/api/players/${playerToUpdate._id}`
            const updateURL = `https://proquest-pspc.onrender.com/api/players/${playerToUpdate._id}`
            const response = await axios.put(updateURL,player)
            console.log(response.data)
        } catch (error) {
            console.log("Error updating player:", error)
        }      
    }

    const handleFormSubmit = async(event)=>{
        event.preventDefault();

        // Validate required fields
        const validationErrors = {};
        if (!footedness.trim()) {
        validationErrors.footedness = "Footedness is required";
        }
        if (!first.trim()) {
        validationErrors.first = "First Name is required";
        }
        if (!last.trim()) {
        validationErrors.last = "Last Name is required";
        }
        if (!age.trim()) {
        validationErrors.age = "Age is required";
        }
        if (!mainPosition.trim()) {
        validationErrors.mainPosition = "Main Position is required";
        }
        if (!nationality.trim()) {
        validationErrors.nationality = "Nationality is required";
        }

        if (Object.keys(validationErrors).length) {
        setValidationErrors(validationErrors);
        return;
        }

        // Prepare preferred and other positions arrays
        const allPreferredPositions = [];
        if (mainPosition.trim() !== "") {
        allPreferredPositions.push(mainPosition.trim());
        }
        if (preferredPositions.trim() !== "") {
        allPreferredPositions.push(...preferredPositions.split(",").map((pos)=>pos.trim()));
        }
        const allOtherPositions = otherPositions.trim() !== "" ? otherPositions.split(",").map((pos)=>pos.trim()) : [];


        // Here you can handle the form submission logic
        // For example, send the form data to an API or process it further
        console.log(specialities, specialities.split(", "))
        const updatedPlayer = {
            _id:playerToUpdate._id,
            first,
            last,
            DOB,
            age,
            nationality,
            team,
            estValue,
            footedness: footedness.toLowerCase()==="right" ? 1:0,
            position: {
                preferred: allPreferredPositions,
                other: allOtherPositions,
            },
            specialities: specialities.trim() !== "" ? specialities.split(",").map((spec)=>spec.trim()) : [],
            weaknesses: weaknesses.trim() !== "" ? weaknesses.split(",").map((spec)=>spec.trim()) : [],
            description,
            review,
            views,
            overall,
            star,
        }
        console.log("Form submitted with data:", updatedPlayer);

        //update player
        try {
            await updatePlayer(updatedPlayer)
            toast.success('Player information updated successfully.')
        } catch (error) {
            console.log("Error adding player on submit", error)
            toast.error('Player information could not be updated.')
        } finally{
            // Reset errors after successful submission
            setValidationErrors({});

            // Redirect to /players/updatedplayerID
            return navigate(`/players/${playerToUpdate._id}`)
        }
    }


    return (
        <section>
            <div className="container mx-auto p-6">
            <form onSubmit={handleFormSubmit}>
                <h2 className="text-2xl font-bold mb-4">Add Player</h2>
                <div className="mb-4">
                <label htmlFor="first">First Name</label>
                <input
                    type="text"
                    id="first"
                    value={first}
                    onChange={(e) => setFirst(e.target.value)}
                    className={`border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full ${validationErrors.first ? "border-red-500" : ""}`}
                />
                {validationErrors.first && <p className="text-red-500 text-sm mt-1">{validationErrors.first}</p>}
                </div>
                <div className="mb-4">
                <label htmlFor="last">Last Name</label>
                <input
                    type="text"
                    id="last"
                    value={last}
                    onChange={(e) => setLast(e.target.value)}
                    className={`border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full ${validationErrors.last ? "border-red-500" : ""}`}
                />
                {validationErrors.last && <p className="text-red-500 text-sm mt-1">{validationErrors.last}</p>}
                </div>
                {/* Date of Birth inputs */}
                <div className="mb-4">
                <label>Date of Birth</label>
                <div className="flex items-center">
                    <input
                    type="text"
                    placeholder="Year"
                    value={DOB.year}
                    onChange={(e) => setDOB({ ...DOB, year: e.target.value })}
                    className="border border-gray-300 rounded-lg px-3 py-2 mt-1 mr-2"
                    style={{ width: "80px" }}
                    />
                    <input
                    type="text"
                    placeholder="Month"
                    value={DOB.month}
                    onChange={(e) => setDOB({ ...DOB, month: e.target.value })}
                    className="border border-gray-300 rounded-lg px-3 py-2 mt-1 mr-2"
                    style={{ width: "80px" }}
                    />
                    <input
                    type="text"
                    placeholder="Day"
                    value={DOB.day}
                    onChange={(e) => setDOB({ ...DOB, day: e.target.value })}
                    className="border border-gray-300 rounded-lg px-3 py-2 mt-1"
                    style={{ width: "80px" }}
                    />
                </div>
                </div>
                {/* End of Date of Birth inputs */}
                <div className="mb-4">
                <label htmlFor="age">Age</label>
                <input
                    type="number"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className={`border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full ${validationErrors.age ? "border-red-500" : ""}`}
                />
                {validationErrors.age && <p className="text-red-500 text-sm mt-1">{validationErrors.age}</p>}
                </div>
                <div className="mb-4">
                <label htmlFor="nationality">Nationality</label>
                <select
                    id="nationality"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className={`border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full ${validationErrors.nationality ? "border-red-500" : ""}`}
                >
                    <option value="">Select Nationality</option>
                    {validNationalities.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                    ))}
                </select>
                {validationErrors.nationality && <p className="text-red-500 text-sm mt-1">{validationErrors.nationality}</p>}
                </div>
                <div className="mb-4">
                <label htmlFor="team">Team</label>
                <select
                    id="team"
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full"
                >
                    <option value="">Select Team</option>
                    {validTeams.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                    ))}
                </select>
                </div>
                <div className="mb-4">
                <label htmlFor="estValue">Estimated Value</label>
                <input
                    type="number"
                    id="estValue"
                    value={estValue}
                    onChange={(e) => setEstValue(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full "
                />
                </div>
                <div className="mb-4">
                <label htmlFor="footedness">Footedness</label>
                <select
                    id="footedness"
                    value={footedness}
                    onChange={(e) => setFootedness(e.target.value)}
                    className={`border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full ${validationErrors.footedness ? "border-red-500" : ""}`}
                >
                    <option value="">Select Footedness</option>
                    <option value="Right">Right</option>
                    <option value="Left">Left</option>
                </select>
                {validationErrors.footedness && <p className="text-red-500 text-sm mt-1">{validationErrors.footedness}</p>}
                </div>
                <div className="mb-4">
                <label htmlFor="mainPosition">Main Position</label>
                <input
                    type="text"
                    id="mainPosition"
                    value={mainPosition}
                    onChange={(e) => setMainPosition(e.target.value)}
                    placeholder="e.g., LW"
                    className={`border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full ${validationErrors.mainPosition ? "border-red-500" : ""}`}
                />
                {validationErrors.mainPosition && <p className="text-red-500 text-sm mt-1">{validationErrors.mainPosition}</p>}
                </div>
                <div className="mb-4">
                <label htmlFor="preferredPositions">Preferred Positions (comma-separated)</label>
                <input
                    type="text"
                    id="preferredPositions"
                    value={preferredPositions}
                    onChange={(e) => setPreferredPositions(e.target.value)}
                    placeholder="e.g., CM, ST"
                    className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full"
                />
                </div>
                <div className="mb-4">
                <label htmlFor="otherPositions">Other Positions (comma-separated)</label>
                <input
                    type="text"
                    id="otherPositions"
                    value={otherPositions}
                    onChange={(e) => setOtherPositions(e.target.value)}
                    placeholder="e.g., GK, CB"
                    className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full"
                />
                </div>
                <div className="mb-4">
                <label htmlFor="specialities">Specialities (comma-separated)</label>
                <input
                    type="text"
                    id="specialities"
                    value={specialities}
                    onChange={(e) => setSpecialities(e.target.value)}
                    placeholder="e.g., Dead-Ball Specialist, Speed"
                    className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full"
                />
                </div>
                <div className="mb-4">
                <label htmlFor="weaknesses">Weaknesses (comma-separated)</label>
                <input
                    type="text"
                    id="weaknesses"
                    value={weaknesses}
                    onChange={(e) => setWeaknesses(e.target.value)}
                    placeholder="e.g., Mentality, Stamina"
                    className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full"
                />
                </div>
                <div className="mb-4">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full"
                />
                </div>
                <div className="mb-4">
                <label htmlFor="review">Review</label>
                <textarea
                    type="text"
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full"
                />
                </div>
                <div className="mb-4">
                <label htmlFor="views">Views</label>
                <input
                    type="number"
                    id="views"
                    value={views}
                    onChange={(e) => setViews(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full"
                />
                </div>
                <div className="mb-4">
                <label htmlFor="overall">Overall Rating</label>
                <input
                    type="number"
                    id="overall"
                    value={overall}
                    onChange={(e) => setOverall(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full"
                />
                </div>
                <div className="mb-4">
                <label htmlFor="star">Star</label>
                <input
                    type="checkbox"
                    id="star"
                    checked={star}
                    onChange={(e) => setStar(e.target.checked)}
                    className="ml-2 "
                />
                </div>
                <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                Submit
                </button>
            </form>
            </div>
        </section>
    )
}
export default UpdatePlayerPage