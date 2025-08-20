import React, { useMemo, Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import Hero from '../components/Hero';
import Sections from '../components/Sections';
import PlayerProfiles from '../components/PlayerProfiles';
import ViewingButton from '../components/ViewingButton';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage = () => {
  const { allplayerprofiles } = useLoaderData(); // a Promise (because of defer)
  const featured = useMemo(() => [
    {
      name: "Top Talents",
      filterFuncts: [(items) => items.filter((p) => p.overall >= 87)],
      sort: (items) => items.sort((a, b) => b.overall - a.overall),
    },
    {
      name: "Young Players",
      filterFuncts: [(items) => items.filter((p) => p.age <= 21)],
      sort: (items) => items.sort((a, b) => a.age - b.age),
    },
    {
      name: "Goal Scorers",
      filterFuncts: [
        (items) =>
          items.filter((p) =>
            (p.specialities || []).some((s) =>
              ['goal scorer', 'finishing'].includes(s.toLowerCase())
            )
          ),
      ],
      sort: (items) => items.sort((a, b) => b.overall - a.overall),
    },
  ], []);

  const process = (data, filter) => {
    let result = [...data];
    filter.filterFuncts.forEach(fn => result = fn(result));
    return filter.sort ? filter.sort(result) : result;
  };

  return (
    <>
      <Hero />
      <Sections />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<LoadingSpinner message="Loading players..." />}>
          <Await resolve={allplayerprofiles} errorElement={<p className="text-center text-red-600">Failed to load player data.</p>}>
            {(data) => (
              <>
                {featured.map((filter, idx) => {
                  const fullList = process(data, filter); // all filtered players
                  const previewList = fullList.slice(0, 3); // just top 3 for display
                  return (
                    <div key={idx} className="my-12">
                      <PlayerProfiles
                        playerprofiles={previewList}
                        title={filter.name}
                        isHomePage={true}
                      />
                      <ViewingButton to="/players" category={filter.name} list={fullList} />
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