import { useLoaderData, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import natData from '../nat.json';
import LoadingSpinner from "../components/LoadingSpinner";

const UpdatePlayerPage = () => {
    const playerToUpdate = useLoaderData();
    if(!playerToUpdate){
        return <LoadingSpinner message="Fetching Player Data..."></LoadingSpinner>
    }
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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
        review: playerToUpdate.review,
        views: playerToUpdate.views,
        overall: playerToUpdate.overall,
        star: playerToUpdate.star, // Assuming `star` is a boolean indicating if the player is a star
    });

    const [validNationalities, setValidNationalities] = useState([]);
    const [validTeams, setValidTeams] = useState([]);
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
                toast.error("Failed to fetch data.");
            }
        };

        fetchData();
    }, []);

    const getNationalities = () => {
        try {
            return natData.nationalities.map((nat) => nat.abbr);
        } catch (error) {
            console.error("Error fetching nationalities:", error);
            return [];
        }
    };

    const getTeamNames = async () => {
        try {
            const response = await axios.get("https://proquest-pspc.onrender.com/api/teams");
            return response.data.data.map((team) => team.name);
        } catch (error) {
            console.error("Error fetching teams:", error);
            return [];
        }
    };

    const updatePlayer = async (player) => {
        try {
            const baseURLs = ["https://proquest-pspc.onrender.com","https://3b14d84e-bf47-4b87-a7d1-29985604422c-00-373hveltrbpzh.riker.replit.dev:8080"]
            const updateURL = `${baseURLs[0]}/api/players/${playerToUpdate._id}`;
            const response = await axios.put(updateURL, player);
            return response.data;
        } catch (error) {
            console.log("Error updating player:", error);
            throw error;
        }
    };

    const handleFormChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const errors = {};
        if (!formData.footedness.trim()) errors.footedness = "Footedness is required";
        if (!formData.first.trim()) errors.first = "First Name is required";
        if (!formData.last.trim()) errors.last = "Last Name is required";
        if (!formData.age.trim()) errors.age = "Age is required";
        if (!formData.mainPosition.trim()) errors.mainPosition = "Main Position is required";
        if (!formData.nationality.trim()) errors.nationality = "Nationality is required";

        if (Object.keys(errors).length) {
            setValidationErrors(errors);
            return;
        }

        const allPreferredPositions = formData.mainPosition.trim() ? [formData.mainPosition.trim()] : [];
        if (formData.preferredPositions.trim()) {
            allPreferredPositions.push(...formData.preferredPositions.split(",").map((pos) => pos.trim()));
        }

        const allOtherPositions = formData.otherPositions.trim() ? formData.otherPositions.split(",").map((pos) => pos.trim()) : [];

        const updatedPlayer = {
            _id: playerToUpdate._id,
            ...formData,
            footedness: formData.footedness.toLowerCase() === "right" ? 1 : 0,
            position: {
                preferred: allPreferredPositions,
                other: allOtherPositions,
            },
            specialities: formData.specialities.trim() ? formData.specialities.split(",").map((spec) => spec.trim()) : [],
            weaknesses: formData.weaknesses.trim() ? formData.weaknesses.split(",").map((spec) => spec.trim()) : [],
        };

        try {
            await updatePlayer(updatedPlayer);
            toast.success('Player information updated successfully.');
            navigate(`/players/${playerToUpdate._id}`);
        } catch (error) {
            toast.error('Player information could not be updated.');
        } finally {
            setValidationErrors({});
        }
    };

    return (
        <section className="p-6 md:p-8 lg:p-12">
            <div className="container mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Update Player</h2>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries({
                            first: "First Name",
                            last: "Last Name",
                            age: "Age",
                            nationality: "Nationality",
                            team: "Team",
                            estValue: "Estimated Value",
                            footedness: "Footedness",
                            mainPosition: "Main Position",
                            preferredPositions: "Preferred Positions",
                            otherPositions: "Other Positions",
                            specialities: "Specialities",
                            weaknesses: "Weaknesses",
                            description: "Description",
                            review: "Review",
                            views: "Views",
                            overall: "Overall Rating",
                            star: "Star",
                        }).map(([key, label]) => (
                            <div key={key} className="mb-4">
                                <label htmlFor={key} className="block text-sm font-medium text-gray-700">{label}</label>
                                {key === 'footedness' || key === 'nationality' || key === 'team' ? (
                                    <select
                                        id={key}
                                        value={formData[key]}
                                        onChange={handleFormChange}
                                        className={`border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full ${validationErrors[key] ? "border-red-500" : ""}`}
                                    >
                                        <option value="">Select {label}</option>
                                        {(key === 'nationality' ? validNationalities : key === 'team' ? validTeams : ['Right', 'Left'])
                                            .map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                    </select>
                                ) : key === 'description' || key === 'review' ? (
                                    <textarea
                                        id={key}
                                        value={formData[key]}
                                        onChange={handleFormChange}
                                        className={`border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full ${key === 'review' ? 'h-32' : 'h-40'} ${validationErrors[key] ? "border-red-500" : ""}`}
                                    />
                                ) : key === 'star' ? (
                                    <input
                                        type="checkbox"
                                        id={key}
                                        checked={formData[key]}
                                        onChange={handleFormChange}
                                        className="form-checkbox h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded mt-1"
                                    />
                                ) : (
                                    <input
                                        type={key === 'age' || key === 'estValue' || key === 'views' || key === 'overall' ? 'number' : 'text'}
                                        id={key}
                                        value={formData[key]}
                                        onChange={handleFormChange}
                                        className={`border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full ${validationErrors[key] ? "border-red-500" : ""}`}
                                    />
                                )}
                                {validationErrors[key] && <p className="text-red-500 text-sm mt-1">{validationErrors[key]}</p>}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                        >
                            Update Player
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default UpdatePlayerPage;
