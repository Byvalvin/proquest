import React, { useState, useEffect } from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import PlayerProfiles from '../components/PlayerProfiles'; // Assuming PlayerProfiles component exists

const PlayerProfilesPage = ({ pagetitle, playerprofiles }) => {
    const allplayerprofiles = useLoaderData();
    const location = useLocation();
    const { category, list } = location.state || {};
    // Search Bar
    const [search, setSearch] = useState(""); // search holds the current value of the search term while setSearch is a funct that update value
  
    // State for filters
    const [filters, setFilters] = useState({
      singleCheckFilters: [
        {
          label: 'Starred Players',
          checked: false, // Initial checked state
          onChange: (e) => handleSingleCheckFilterChange(e, 'star'), // Example handler function
        },
      ],
      multiSelectFilters: [
        {
          label: 'Specialities',
          options: [
            { value: 'dribbling', label: 'Dribbling', map: ['dribbler','dribbling'] },
            { value: 'finishing', label: 'Finishing', map: ['finisher','finishing', 'poacher', 'goal scorer'] },
            { value: 'defending', label: 'Defending' , map: ['defending']},
            { value: 'shooting', label: 'Shooting', map: ['shooter','shooting', 'long shots', 'shot power', 'distance shooter', 'finesse'] },
            { value: 'passing', label: 'Passing', map: ['playmaker','passing'] },
            { value: 'speed', label: 'Speed', map: ['speed', 'speedster'] },
            { value: 'strength', label: 'Strength', map: ['strength'] },
            { value: 'vision', label: 'Vision', map:['playmaker', 'controller', 'vision'] },
            // Add more options as needed
          ],
          selectedValues: [], // Initial selected values
          onChange: (selectedValues) => handleMultiSelectFilterChange('specialities', selectedValues), // Example handler function
        },
        {
            label: 'Position A',
            options: [
              { value: 'A', label: 'Attackers', map: ['ST','CF','LW','RW'] },
              { value: 'M', label: 'Midfielders', map: ['CDM','CM','LM','RM','CAM'] },
              { value: 'D', label: 'Defenders', map: ['CB','LB','LWB','RB','RWB'] },
              { value: 'G', label: 'Goalkeepers', map: ['GK'] },
              // Add more options as needed
            ],
            selectedValues: [], // Initial selected values
            onChange: (selectedValues) => handleMultiSelectFilterChange('position a', selectedValues), // Example handler function
          },
          {
            label: 'Position B',
            options: [
              { value: 'st', label: 'ST', map: ['ST','CF'] },
              { value: 'cm', label: 'CM', map: ['CDM','CM','CAM'] },
              { value: 'cb', label: 'CB', map: ['CB','LB','RB'] },
              { value: 'lm', label: 'LM', map: ['LW','LM'] },
              { value: 'rm', label: 'RM', map: ['RW','RM'] },
              { value: 'G', label: 'Goalkeepers', map: ['GK'] },
              // Add more options as needed
            ],
            selectedValues: [], // Initial selected values
            onChange: (selectedValues) => handleMultiSelectFilterChange('position b', selectedValues), // Example handler function
          },
      ],
      dualRangeSliderFilters: [
        {
          label: 'overall',
          min: 0,
          max: 100,
          range: [0, 100], // Initial range values
          onRangeChange: (range) => handleDualRangeSliderFilterChange(range, 'overall'), // Example handler function
        },
      ],
    });
  
    // Handle single check filter change
    const handleSingleCheckFilterChange = (event, type, value) => {
      const checked = event.target.checked;
      const updatedFilters = [...filters.singleCheckFilters];
      updatedFilters[0].checked = checked;
      setFilters({ ...filters, singleCheckFilters: updatedFilters });
    };
  
    // Handle multi-select filter change
    const handleMultiSelectFilterChange = (type, selectedValues) => {
      const updatedFilters = [...filters.multiSelectFilters];
      const filterIndex = updatedFilters.findIndex((filter) => filter.label.toLowerCase() === type);
      updatedFilters[filterIndex].selectedValues = selectedValues;
      setFilters({ ...filters, multiSelectFilters: updatedFilters });
    };
  
    // Handle dual range slider filter change
    const handleDualRangeSliderFilterChange = (range, type) => {
        const updatedFilters = [...filters.dualRangeSliderFilters];
        const filterIndex = updatedFilters.findIndex((filter) => filter.label.toLowerCase() === type);
        updatedFilters[filterIndex].range = range;
        setFilters({ ...filters, dualRangeSliderFilters: updatedFilters });
    };

    const compareSubStrings = (entry, compStrs) => {
        const lcEntry = entry.toLowerCase();
    
        return compStrs.some(compStr => {
            const lcCompStr = compStr.toLowerCase();
    
            // Check if lcEntry is a strict substring starting from index 0 of lcCompStr
            if (lcCompStr.startsWith(lcEntry)) {
                return true; // Found lcEntry as a strict substring starting from index 0
            }
    
            return false; // Did not find lcEntry as a strict substring starting from index 0
        });
    };

    // Apply search function
    const searchFilter = (profiles) =>{
        return profiles.filter((profile)=> 
            !search || search && compareSubStrings(search, [profile.first, profile.last, profile.team])) 
        //  include if user isnt searching for anything or if they are searching and their string is a substring of one of the attributes in the list
    }
  
    // Apply filters function
    const applyFilters = () => {
      let filteredProfiles = playerprofiles ? [...playerprofiles] : [...allplayerprofiles];
      filteredProfiles = list ? list : filteredProfiles;
  
      // Apply single check filter (starred players)
      if (filters.singleCheckFilters[0].checked) {
        filteredProfiles = filteredProfiles.filter((profile) => profile.star);
      }

    //   filters.multiSelectFilters.forEach((filter) => {
    //     console.log(filter.selectedValues,"selected by ususer")
    //     if (filter.selectedValues.length > 0) {
    //       filteredProfiles = filteredProfiles.filter((profile) =>
    //         profile.specialities.some((specialty)=>filter.selectedValues.includes(specialty.toLowerCase()))
    //         // filter.selectedValues.some((selected) => profile.specialities.includes(selected))
    //       );
    //     }
    //   });
  
      // Apply multi-select filters (specialities, position, etc.)
      filters.multiSelectFilters.forEach((filter) => {
        if (filter.selectedValues.length > 0) {
          filteredProfiles = filteredProfiles.filter((profile) => {
            const player_field = filter.label.split(" ")[0].toLowerCase()
            console.log(player_field, "feild")
            const profileAttributeList = player_field==="position" ? profile[player_field].preferred : profile[player_field]; // Get the attribute dynamically
            console.log(profileAttributeList,"player")
            const selectedValues = filter.selectedValues.map(value => value.toLowerCase());
            console.log(selectedValues)
            
            const selectedValuesObjects = filter.options.filter((obj)=>selectedValues.includes(obj.value.toLowerCase()))
            let selectables = [];
            selectedValuesObjects.forEach((svo)=>selectables = selectables.concat(svo.map))
            //lower all values
            selectables = selectables.map((selectable)=>selectable.toLowerCase())

            console.log(selectables)
            // Check if any selected value matches any item in the profile's attribute map
            return profileAttributeList.some(attr => selectables.includes(attr.toLowerCase()));
          });
        }
      });
  
      // Apply dual range slider filter (overall rating)
      filters.dualRangeSliderFilters.forEach(filter => {
        filteredProfiles = filteredProfiles.filter((profile) =>
            filter.range[0] <= profile.overall&&profile.overall <= filter.range[1]
        );
      });
  
      return filteredProfiles;
    };

    const searchAndFilter = () => searchFilter(applyFilters());

    const onSearchBarChange = (event) => {
        setSearch(event.target.value);
    }
    
    const filteredProfiles = searchAndFilter();
  
    pagetitle = category ? category : pagetitle;
  
    return (
      <>
        <SearchBar  value={search} onChange={onSearchBarChange}/>
        <Filter filters={filters} setFilters={setFilters} />
        <PlayerProfiles playerprofiles={filteredProfiles} title={pagetitle} />
      </>
    );
  };
  
  export default PlayerProfilesPage;
