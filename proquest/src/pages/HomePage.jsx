import React, { useMemo, Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import Hero from '../components/Hero';
import Sections from '../components/Sections';
import PlayerProfiles from '../components/PlayerProfiles';
import ViewingButton from '../components/ViewingButton';
import LoadingSpinner from '../components/LoadingSpinner';

// --- FILTERS / SORTS ---

const numberFilter = (items, key, min = 0, max = 100) =>
  items.filter((item) => min <= item[key] && item[key] <= max);

const attributeFilter = (items, key, targets) => {
  return items.filter((item) => {
    const keys = key.split('.');
    let itemValue = item;
    for (let k of keys) {
      itemValue = itemValue[k];
      if (!itemValue) break;
    }

    if (itemValue != null) {
      if (!Array.isArray(itemValue)) itemValue = [itemValue];
      itemValue = itemValue.flatMap((val) => {
        if (Array.isArray(val)) return val.map((v) => v.toLowerCase());
        if (typeof val === 'string') return [val.toLowerCase()];
        if (val.preferred) return val.preferred.map((v) => v.toLowerCase());
        return [];
      });
    } else {
      itemValue = [];
    }

    return targets.some((t) => itemValue.includes(t.toLowerCase()));
  });
};

const multiAttributeFilter = (items, filters) => {
  return filters.reduce((result, { key, targets }) => {
    return attributeFilter(result, key, targets);
  }, items);
};

const sortOverall = (items) => items.sort((a, b) => b.overall - a.overall);
const sortAge = (items) => items.sort((a, b) => a.age - b.age);

// --- FILTER DEFINITIONS ---
const allEngagementFilters = [
  {
    name: "Top Talents",
    filterFuncts: [(items) => numberFilter(items, 'overall', 87)],
    sort: sortOverall
  },
  {
    name: "Young Players",
    filterFuncts: [(items) => numberFilter(items, 'age', undefined, 21)],
    sort: sortAge
  },
  {
    name: "Goal Scorers",
    filterFuncts: [
      (items) => attributeFilter(items, "specialities", ['goal scorer', 'finishing'])
    ],
    sort: sortOverall
  }
];

const engagementPipeline = (items, filter) => {
  let result = [...items];
  filter.filterFuncts.forEach((fn) => result = fn(result));
  return filter.sort ? filter.sort(result) : result;
};

// --- MAIN PAGE ---
const HomePage = () => {
  const { allplayerprofiles } = useLoaderData();
  const featured = useMemo(() => allEngagementFilters, []);

  return (
    <>
      <Hero />
      <Sections />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<LoadingSpinner message="Loading players..." />}>
          <Await resolve={allplayerprofiles}>
            {(data) => {
              if (!Array.isArray(data)) {
                console.error("Expected player data to be an array, but got:", data);
                return <p className="text-center text-red-600">Failed to load player data.</p>;
              }

              return (
                <>
                  {featured.map((filter, idx) => {
                    const list = engagementPipeline(data, filter).slice(0, 3);
                    return (
                      <div key={idx} className="my-12">
                        <PlayerProfiles
                          playerprofiles={list}
                          title={filter.name}
                          isHomePage={true}
                        />
                        <ViewingButton to="/players" category={filter.name} list={list} />
                      </div>
                    );
                  })}
                </>
              );
            }}
          </Await>

        </Suspense>
      </div>
    </>
  );
};

export default HomePage;
