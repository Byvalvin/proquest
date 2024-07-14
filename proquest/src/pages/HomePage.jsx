import React from 'react';
import Hero from '../components/Hero';
import Sections from '../components/Sections';
import ViewingButton from '../components/ViewingButton';
import PlayerProfiles from '../components/PlayerProfiles';
import { useLoaderData } from 'react-router-dom';

const HomePage = () => {
  const allplayerprofiles = useLoaderData(); // Ensure this fetches data correctly
  const engageto = "/players"; // Viewing button destination

  // Function to filter items based on numeric range
  const numberFilter = (items, key, givenMin = 0, givenMax = 100) => {
    return items.filter((item) => givenMin <= item[key] && item[key] <= givenMax);
  };

  // Function to sort items based on overall rating (descending)
  const sortOverall = (items) => items.sort((a, b) => b.overall - a.overall);

  // Function to sort items based on age (ascending)
  const sortAge = (items) => items.sort((a, b) => a.age - b.age);

  // Engagement filters and their corresponding filter and sort functions
  const allEngagementFilters = [
    {
      name: "Top Talents",
      metrics: {
        filters: [{ metric: "overall", min: 87 }],
        sort: "overall",
      },
    },
    {
      name: "Young Players",
      metrics: {
        filters: [{ metric: "age", max: 21 }],
        sort: "age",
      },
    },
  ];

  // Function to apply filters and sorting based on engagement criteria
  const engagementPipeline = (items, filters, sort) => {
    let filteredItems = [...items];
    filters.forEach((filter) => {
      filteredItems = numberFilter(filteredItems, filter.metric, filter.min, filter.max);
    });
    return sort === "overall" ? sortOverall(filteredItems) : sort === "age" ? sortAge(filteredItems) : [];
  };

  // Randomly select an engagement filter and apply it to player profiles
  const engagement = allEngagementFilters[Math.floor(Math.random() * allEngagementFilters.length)];
  const engageTitle = engagement.name;
  const engageFilters = engagement.metrics.filters;
  const engageSort = engagement.metrics.sort;

  const playerprofiles = engagementPipeline(allplayerprofiles, engageFilters, engageSort);

  return (
    <>
      <Hero />
      <Sections />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PlayerProfiles playerprofiles={playerprofiles} title={engageTitle} isHomePage={true} />
        <ViewingButton to={engageto} category={engageTitle} list={playerprofiles} />
      </div>
    </>
  );
};

export default HomePage;
