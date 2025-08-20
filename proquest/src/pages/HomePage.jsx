import React, { Suspense, useMemo } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import Hero from '../components/Hero';
import Sections from '../components/Sections';
import ViewingButton from '../components/ViewingButton';
import PlayerProfiles from '../components/PlayerProfiles';
import LoadingSpinner from '../components/LoadingSpinner';

// Sorting & Filtering Utils
const numberFilter = (items, key, givenMin = 0, givenMax = 100) => {
  return items.filter((item) => givenMin <= item[key] && item[key] <= givenMax);
};

const attributeFilter = (items, key, targets) => {
  return items.filter((item) => {
    const keys = key.split('.');
    let itemValue = item;
    for (let k of keys) {
      itemValue = itemValue[k];
      if (!itemValue) break;
    }

    if (itemValue !== undefined && itemValue !== null) {
      if (!Array.isArray(itemValue)) itemValue = [itemValue];
      itemValue = itemValue.flatMap(value => {
        if (Array.isArray(value)) {
          return value.map(v => v.toLowerCase());
        } else if (typeof value === 'string') {
          return [value.toLowerCase()];
        } else if (typeof value === 'object' && value.preferred) {
          return value.preferred.map(v => v.toLowerCase());
        } else {
          return [];
        }
      });
    } else {
      itemValue = [];
    }

    return targets.some(target => itemValue.includes(target.toLowerCase()));
  });
};

const multiAttributeFilter = (items, keysAndTargets) => {
  let finalItems = [...items];
  keysAndTargets.forEach(({ key, targets }) => {
    finalItems = attributeFilter(finalItems, key, targets);
  });
  return finalItems;
};

const sortOverall = (items) => items.sort((a, b) => b.overall - a.overall);
const sortAge = (items) => items.sort((a, b) => a.age - b.age);

// Engagement Filters
const allEngagementFilters = [
  { name: "Top Talents", filterFuncts: [(items) => numberFilter(items, 'overall', 87)], sort: sortOverall },
  { name: "Young Players", filterFuncts: [(items) => numberFilter(items, 'age', undefined, 21)], sort: sortAge },
  { name: "Playmakers", filterFuncts: [(items) => multiAttributeFilter(items, [{ key: "specialities", targets: ['vision', 'playmaker'] }, { key: "position.preferred", targets: ['CM', 'CDM', 'CAM'] }])], sort: sortOverall },
  { name: "Speedsters", filterFuncts: [(items) => attributeFilter(items, "specialities", ['speed'])], sort: sortOverall },
  { name: "Goal Scorers", filterFuncts: [(items) => attributeFilter(items, "specialities", ['goal scorer', 'finishing'])], sort: sortOverall },
];

// Apply filters
const engagementPipeline = (items, filter) => {
  let filteredItems = [...items];
  filter.filterFuncts.forEach((fn) => {
    filteredItems = fn(filteredItems);
  });
  return filter.sort ? filter.sort(filteredItems) : filteredItems;
};

const HomePage = () => {
  const { allplayerprofiles } = useLoaderData();
  const engageto = "/players";

  // Featured filters to show on homepage
  const featuredFilters = useMemo(() => {
    return [
      allEngagementFilters.find(f => f.name === "Top Talents"),
      allEngagementFilters.find(f => f.name === "Young Players"),
      allEngagementFilters.find(f => f.name === "Goal Scorers"),
    ];
  }, []);

  return (
    <>
      <Hero />
      <Sections />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<LoadingSpinner message="Fetching player profiles..." />}>
          <Await resolve={allplayerprofiles}>
            {(data) => (
              <>
                {featuredFilters.map((engage, i) => {
                  const filteredPlayers = engagementPipeline(data, engage).slice(0, 6);
                  return (
                    <div key={i} className="my-10">
                      <PlayerProfiles
                        playerprofiles={filteredPlayers}
                        title={engage.name}
                        isHomePage={true}
                      />
                      <ViewingButton to={engageto} category={engage.name} list={filteredPlayers} />
                    </div>
                  );
                })}
              </>
            )}
          </Await>
        </Suspense>
      </div>
    </>
  );
};

export default HomePage;
