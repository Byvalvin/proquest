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
            const url = `https://proquest-pspc.onrender.com/api/teams/${id}`;
            try {
                const response = await axios.get(url);
                setTeamInfo(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching team:", error);
                setLoading(false);
                toast.error("Failed to load team information.");
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
        const confirmQuestion = "Are you sure you want to delete this team from the network?";
        const confirmation = window.confirm(confirmQuestion);
        if (!confirmation) {
            return;
        }

        const delURL = `https://proquest-pspc.onrender.com/api/teams/${_id}`;
        try {
            await axios.delete(delURL);
            toast.success("Team removed successfully.");
            navigate("/teams");
        } catch (error) {
            console.error("Error deleting team:", error);
            toast.error("Team could not be removed.");
        }
    };

    if (loading) {
        return <p className="text-center py-4">Loading team profile...</p>;
    }

    if (!teamInfo) {
        return <p className="text-center py-4">Team not found.</p>;
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

    const dummyEmail = email || "team@example.com";

    return (
        <>
            <section className="bg-gray-100 py-6">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <Link to={back.link} className={back.className}>
                        {back.icon} {back.text}
                    </Link>
                </div>
            </section>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row">
                    {/* Left Section */}
                    <div className="flex-1 lg:w-2/3 lg:pr-8">
                        <div className="space-y-6">
                            {/* Soccer Icon, Name, and Established Year */}
                            <section className="bg-white border border-gray-300 rounded-lg p-6">
                                <div className="flex items-center mb-4">
                                    {/* Soccer Icon */}
                                    <div className="flex-shrink-0 w-16 h-16 lg:w-24 lg:h-24">
                                        <FaFutbol className="text-4xl lg:text-6xl text-gray-500" />
                                    </div>
                                    {/* Team Name and Established Year */}
                                    <div className="ml-4">
                                        <p className="text-xl lg:text-2xl font-bold mb-2">{name}</p>
                                        <p className="text-sm lg:text-base text-gray-700">Est. {year}</p>
                                    </div>
                                </div>
                                {/* Team Performance */}
                                <div className="flex items-center">
                                    <p className="text-sm text-gray-500 mr-2">Performance:</p>
                                    <p className="text-base lg:text-lg">{performance}</p>
                                </div>
                            </section>

                            {/* Description Section */}
                            <section className="bg-white border border-gray-300 rounded-lg p-6">
                                <h2 className="text-xl lg:text-2xl font-bold mb-4">Description</h2>
                                <p className="text-base lg:text-lg text-gray-700">{description}</p>
                            </section>

                            {/* Standing Review */}
                            <section className="bg-white border border-gray-300 rounded-lg p-6">
                                <h2 className="text-xl lg:text-2xl font-bold mb-4">Standing Review</h2>
                                <p className="text-base lg:text-lg text-gray-700">{review}</p>
                            </section>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="mt-8 lg:mt-0 lg:w-1/3">
                        {/* Players List */}
                        <section className="bg-white border border-gray-300 rounded-lg p-6 mb-8">
                            <h2 className="text-xl lg:text-2xl font-bold mb-4">Players</h2>
                            <div className="overflow-y-auto max-h-[400px]">
                                <ul className="divide-y divide-gray-300">
                                    {roster.map((player) => (
                                        <li key={player._id} className="py-2">
                                            <Link
                                                to={`/players/${player._id}`}
                                                className="text-base lg:text-lg text-blue-500 hover:underline"
                                            >
                                                {player.first} {player.last}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* Contact Section */}
                        <section className="bg-white border border-gray-300 rounded-lg p-6 mb-8">
                            <h2 className="text-xl lg:text-2xl font-bold mb-4">Contact</h2>
                            <p className="text-base lg:text-lg text-gray-700">Email: {dummyEmail}</p>
                        </section>

                        {/* Manage Team */}
                        <section className="bg-white border border-gray-300 rounded-lg p-6">
                            <h2 className="text-xl lg:text-2xl font-bold mb-4">Manage Team</h2>
                            <div className="flex flex-col sm:flex-row">
                                <Link
                                    to={`/teams/update/${teamInfo._id}`}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4 sm:mb-0 sm:mr-4"
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
            </div>
        </>
    );
};

const teamLoader = async ({ params }) => {
    const teamUrl = `https://proquest-pspc.onrender.com/api/teams/${params.id}`;
    try {
        const team = await axios.get(teamUrl);
        return team.data.data;
    } catch (error) {
        console.error('Error fetching team:', error);
        throw error;
    }
};

export { TeamProfilePage as default, teamLoader };
