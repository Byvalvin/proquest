import React from 'react';
import TeamProfiles from '../components/TeamProfiles'; // Adjust the path as needed
import { useLoaderData, useLocation } from 'react-router-dom';

const TeamProfilesPage = ({ pageTitle, teamProfiles }) => {
  // Use useLoaderData hook to fetch all teams data
  const allTeamProfiles = useLoaderData();

  // Get current location and state using useLocation hook
  const location = useLocation();
  const { category, list } = location.state || {};

  // Log message if location state is null (using dataLoader to load all profiles)
  if (!location.state) console.log("location.state is null because we are using dataLoader to load all profiles instead of a specific subset (this is fine)");

  // Assign team profiles based on props or location state
  teamProfiles = teamProfiles ? teamProfiles : allTeamProfiles;
  teamProfiles = list ? list : teamProfiles;
  pageTitle = category ? category : pageTitle;

  return (
    <TeamProfiles teamProfiles={teamProfiles} title={pageTitle} />
  );
};

export default TeamProfilesPage;
