import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaFutbol } from "react-icons/fa";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const TeamProfilePage = () => {
    const { id } = useParams();
    const [teamInfo, setTeamInfo] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            const url = `/api/teams/${id}`;
            try {
                const response = await axios.get(url);
                setTeamInfo(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching team:", error);
                setLoading(false);
                // Handle error as needed
            }
        };
        fetchTeam();
    }, [id]);

    const back = {
        link: "/teams",
        text: "Back to All Teams",
        icon: <FaArrowLeft className="mr-2" />,
        className: "flex items-center",
    };

    const deleteTeam = async (_id) => {
        const confirmQuestion =
            "Are you sure you want to delete this team from the network?";
        const confirmation = window.confirm(confirmQuestion);
        if (!confirmation) {
            return;
        }

        const delURL = `/api/teams/${_id}`;
        try {
            const response = await axios.delete(delURL);
            console.log(response.data);
            toast.success("Team removed successfully.");
            navigate("/teams");
        } catch (error) {
            console.error("Error deleting team:", error);
            toast.error("Team could not be removed.");
        }
    };

    if (loading) {
        return <p>Loading team profile...</p>;
    }

    if (!teamInfo) {
        return <p>Team not found.</p>;
    }

    const {
        name,
        year,
        email,
        roster,
        performance,
        description,
        review,
    } = teamInfo;

    // Dummy email for display
    const dummyEmail = "team@example.com";

    return (
        <>
            <section>
                <div className="container m-auto p-6">
                    <Link to={back.link} className={back.className}>
                        {back.icon} {back.text}
                    </Link>
                </div>
            </section>
            <div className="flex justify-center">
                {/* Left Section */}
                <div className="flex-3/4 p-8">
                    <div className="flex flex-col">
                        {/* Soccer Icon, Name and Established Year Section */}
                        <section className="border border-gray-300 rounded-lg p-6 mb-6">
                            <div className="flex items-center mb-4">
                                {/* Soccer Icon */}
                                <div className="w-1/3 pr-8">
                                    <FaFutbol className="text-9xl text-gray-500" />
                                </div>
                                {/* Team Name and Established Year */}
                                <div className="w-2/3 pl-8">
                                    <p className="text-2xl font-bold mb-2">{name}</p>
                                    <p className="text-lg text-gray-700">Est. {year}</p>
                                </div>
                            </div>
                            {/* Team Performance Section */}
                            <div className="flex items-center">
                                <p className="text-sm text-gray-500 mr-2">Performance:</p>
                                <p className="text-lg">{performance}</p>
                            </div>
                        </section>

                        {/* Description Section */}
                        <section className="border border-gray-300 rounded-lg p-6 mb-6">
                            <h2 className="text-2xl font-bold mb-4">Description</h2>
                            <p className="text-lg text-gray-700">{description}</p>
                        </section>

                        {/* Standing Review Section */}
                        <section className="border border-gray-300 rounded-lg p-6 mb-6">
                            <h2 className="text-2xl font-bold mb-4">Standing Review</h2>
                            <p className="text-lg text-gray-700">{review}</p>
                        </section>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex-1/4 p-8">
                    {/* Players Section */}
                    <section className="border border-gray-300 rounded-lg p-6 mb-8 h-full">
                        <h2 className="text-2xl font-bold mb-4">Players</h2>
                        <div className="overflow-y-auto">
                            <ul className="divide-y divide-gray-300">
                                {roster.map((player) => (
                                    <li key={player._id} className="py-2">
                                        <Link
                                            to={`/players/${player._id}`}
                                            className="text-lg text-blue-500 hover:underline"
                                        >
                                            {player.first} {player.last}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section className="border border-gray-300 rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-4">Contact</h2>
                        <p className="text-lg text-gray-700">Email: {dummyEmail}</p>
                    </section>

                    {/* Manage Team Section */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Manage Team</h2>
                        <div className="flex">
                            <Link
                                to={`/teams/update/${teamInfo._id}`}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4"
                            >
                                Update
                            </Link>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                onClick={() => deleteTeam(teamInfo._id)}
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
const teamLoader = async ({params}) => {
    const teamUrl = `/api/teams/${params.id}`;
    try {
      const team = await axios.get(teamUrl);
      console.log(team,"locader")
      return team.data.data;
    } catch (error) {
      console.error('Error fetching player:', error);
      throw error; // Rethrow the error to handle it in the component using this loader
    }
};
  
export {TeamProfilePage as default, teamLoader}

