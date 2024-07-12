import React from "react";
import TeamProfile from "./TeamProfile"; // Make sure to import your TeamProfile component
import axios from "axios";

const TeamProfiles = ({ teamProfiles, title = "Explore Teams", isHomePage = false }) => {
    const MAX_TEAMS = 3;
    const maxTeams = teamProfiles.length < MAX_TEAMS ? teamProfiles.length : MAX_TEAMS;

    teamProfiles = isHomePage ? teamProfiles.slice(0, maxTeams) : teamProfiles;

    return (
        <section className="bg-green-50 px-4 py-10">
            <div className="container mx-auto max-w-screen-lg">
                <h2 className="text-3xl font-bold mb-4 text-center">{title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
                    {teamProfiles.map((teamProfile) => (
                        <TeamProfile key={teamProfile._id} profileInfo={teamProfile} />
                    ))}
                </div>
            </div>
        </section>
    );
};


const teamsLoader = async () => {
    try {
        //const allTeamsUrl = "/api/teams"; // Adjust the URL based on your API endpoint for teams
        const allTeamsUrl = "https://proquest-pspc.onrender.com/api/teams"
        const response = await axios.get(allTeamsUrl);
        return response.data.data; // Assuming your API returns data in a 'data' field
    } catch (error) {
        console.error("Error fetching teams:", error);
        return []; // Return empty array in case of an error
    }
};

export { TeamProfiles as default, teamsLoader };

