import React from 'react';
import Hero from '../components/Hero';
import Sections from '../components/Sections';
import ViewingButton from '../components/ViewingButton';
import PlayerProfiles from '../components/PlayerProfiles';
import { useLoaderData } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage = () => {
  const allplayerprofiles = useLoaderData(); // Ensure this fetches data correctly ß
  if(!allplayerprofiles){
    return <LoadingSpinner message='Fetching player profiles...'></LoadingSpinner>
  }
  const engageto = "/players"; // Viewing button destination

  // Function to filter items based on numeric range
  const numberFilter = (items, key, givenMin = 0, givenMax = 100) => {
    return items.filter((item) => givenMin <= item[key] && item[key] <= givenMax);
  };

  // Function to filter items based on nationality
  const attributeFilter = (items, key, targets) => {
    return items.filter((item) => {
      // Split the key by dot to access nested properties
      const keys = key.split('.');
      let itemValue = item;
  
      // Traverse through nested properties to access the final value
      for (let k of keys) {
        itemValue = itemValue[k];
        if (!itemValue) break; // If at any point the nested property is undefined, break
      }
  
      // Normalize itemValue to always be an array of lowercased strings
      if (itemValue !== undefined && itemValue !== null) {
        if (!Array.isArray(itemValue)) {
          itemValue = [itemValue]; // Wrap single values in an array
        }
        //console.log(itemValue,"flat")
        itemValue = itemValue.flatMap(value => {
          if (Array.isArray(value)) {
            return value.map(v => v.toLowerCase());
          } else if (typeof value === 'string') {
            //console.log(value,"flat2")
            return [value.toLowerCase()]; // Handle single string values
          } else if (typeof value === 'object' && value.preferred) {
            return value.preferred.map(v => v.toLowerCase());
          } else {
            return [];
          }
        });
      } else {
        itemValue = []; // Handle undefined or null cases
      }
  
      // Check if all targets are included in the itemValue array
      //return targets.every(target => itemValue.includes(target.toLowerCase()));
      return targets.some(target => itemValue.includes(target.toLowerCase()));
    });
  };
  

  // Function to filter players based on specialities and positions
  const multiAttributeFilter = (items, keysAndTargets) => {
    let finalItems = [...items]
    keysAndTargets.forEach((kNT)=>{

      finalItems = attributeFilter(finalItems, kNT.key, kNT.targets)
    })
    return finalItems
  };


  // Function to sort items based on overall rating (descending)
  const sortOverall = (items) => items.sort((a, b) => b.overall - a.overall);

  // Function to sort items based on age (ascending)
  const sortAge = (items) => items.sort((a, b) => a.age - b.age);

  // Engagement filters and their corresponding filter and sort functions
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
      name: "Dribblers who can play CM",
      filterFuncts: [
        (items) => multiAttributeFilter(items, [
          {key:"specialities", targets:['dribbling','dribblier']},
          {key:"position.preferred", targets:['CM']}]
        )
      ],
      sort: sortOverall
    },
    {
      name: "Playmakers",
      filterFuncts: [
        (items) => multiAttributeFilter(items, [
          {key:"specialities", targets:['vision','playmaker','playmaking']},
          {key:"position.preferred", targets:['CM','CDM','CAM']}]
        )
      ],
      sort: sortOverall
    },
    {
      name: "Engines",
      filterFuncts: [
        (items) => attributeFilter(items, "specialities", ['stamina']
        )
      ],
      sort: sortOverall
    },
    {
      name: "Speedsters",
      filterFuncts: [
        (items) => attributeFilter(items, "specialities", ['speed']
        )
      ],
      sort: sortOverall
    },
    {
      name: "Distance Shooters",
      filterFuncts: [
        (items) => attributeFilter(items, "specialities", ['shot power','shooter','long shots']
        )
      ],
      sort: sortOverall
    },
    {
      name: "Goal Scorers",
      filterFuncts: [
        (items) => attributeFilter(items, "specialities", ['goal scorer','finishing','finisher']
        )
      ],
      sort: sortOverall
    },
    {
      name: "Nigerians",
      filterFuncts: [(items) => attributeFilter(items, 'nationality', ['NIG'])],
      sort: sortOverall
    },
    {
      name: "Congolese",
      filterFuncts: [(items) => attributeFilter(items, 'nationality', ['CNG'])],
      sort: sortOverall
    },
  ];

  // Function to apply filters and sorting based on engagement criteria
  const engagementPipeline = (items, filter) => {
    let filteredItems = [...items];
    const filtFuncts = filter.filterFuncts
    filtFuncts.forEach((filterFunct) => {
      filteredItems = filterFunct(filteredItems);
    });
    return filter.sort ? filter.sort(filteredItems) : filteredItems;
  };

  // Randomly select an engagement filter and apply it to player profiles
  const engagement = allEngagementFilters[Math.floor(Math.random() * allEngagementFilters.length)];
  const engageTitle = engagement.name;

  const playerprofiles = engagementPipeline(allplayerprofiles, engagement);

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
