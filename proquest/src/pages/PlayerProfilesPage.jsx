import React, { useState } from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import PlayerProfiles from '../components/PlayerProfiles'; // Assuming PlayerProfiles component exists

const PlayerProfilesPage = ({ pagetitle, playerprofiles }) => {
    const allplayerprofiles = useLoaderData();
    const location = useLocation();
    const { category, list } = location.state || {};
  
    // Search Bar
    const [search, setSearch] = useState(""); // Search term
  
    // State for filters
    const [filters, setFilters] = useState({
        singleCheckFilters: [
            {
                label: 'Starred Players',
                checked: false, // Initial checked state
                onChange: (e) => handleSingleCheckFilterChange(e, 'star'), // Handler function
            },
        ],
        multiSelectFilters: [
            {
                label: 'Specialities',
                options: [
                    { value: 'dribbling', label: 'Dribbling', map: ['dribbler', 'dribbling'] },
                    { value: 'finishing', label: 'Finishing', map: ['finisher', 'finishing', 'poacher', 'goal scorer'] },
                    { value: 'defending', label: 'Defending', map: ['defending'] },
                    { value: 'shooting', label: 'Shooting', map: ['shooter', 'shooting', 'long shots', 'shot power', 'distance shooter', 'finesse'] },
                    { value: 'passing', label: 'Passing', map: ['playmaker', 'passing'] },
                    { value: 'speed', label: 'Speed', map: ['speed', 'speedster'] },
                    { value: 'strength', label: 'Strength', map: ['strength'] },
                    { value: 'vision', label: 'Vision', map: ['playmaker', 'controller', 'vision'] },
                    // Add more options as needed
                ],
                selectedValues: [], // Initial selected values
                onChange: (selectedValues) => handleMultiSelectFilterChange('specialities', selectedValues), // Handler function
            },
            {
                label: 'Position A',
                options: [
                    { value: 'A', label: 'Attackers', map: ['ST', 'CF', 'LW', 'RW'] },
                    { value: 'M', label: 'Midfielders', map: ['CDM', 'CM', 'LM', 'RM', 'CAM'] },
                    { value: 'D', label: 'Defenders', map: ['CB', 'LB', 'LWB', 'RB', 'RWB'] },
                    { value: 'G', label: 'Goalkeepers', map: ['GK'] },
                    // Add more options as needed
                ],
                selectedValues: [], // Initial selected values
                onChange: (selectedValues) => handleMultiSelectFilterChange('position a', selectedValues), // Handler function
            },
            {
                label: 'Position B',
                options: [
                    { value: 'st', label: 'ST', map: ['ST', 'CF'] },
                    { value: 'cm', label: 'CM', map: ['CDM', 'CM', 'CAM'] },
                    { value: 'cb', label: 'CB', map: ['CB', 'LB', 'RB'] },
                    { value: 'lm', label: 'LM', map: ['LW', 'LM'] },
                    { value: 'rm', label: 'RM', map: ['RW', 'RM'] },
                    { value: 'G', label: 'Goalkeepers', map: ['GK'] },
                    // Add more options as needed
                ],
                selectedValues: [], // Initial selected values
                onChange: (selectedValues) => handleMultiSelectFilterChange('position b', selectedValues), // Handler function
            },
        ],
        dualRangeSliderFilters: [
            {
                label: 'overall',
                min: 0,
                max: 100,
                range: [0, 100], // Initial range values
                onRangeChange: (range) => handleDualRangeSliderFilterChange(range, 'overall'), // Handler function
            },
        ],
    });
  
    // Handle single check filter change
    const handleSingleCheckFilterChange = (event, type) => {
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

    // Helper function to check if entry is a substring of any comparison strings
    const compareSubStrings = (entry, compStrs) => {
        const lcEntry = entry.toLowerCase();
        return compStrs.some(compStr => {
            const lcCompStr = compStr.toLowerCase();
            return lcCompStr.startsWith(lcEntry);
        });
    };

    // Apply search filter
    const searchFilter = (profiles) => {
        return profiles.filter((profile) =>
            !search || search && compareSubStrings(search, [profile.first, profile.last, profile.team])
        );
    };
  
    // Apply filters function
    const applyFilters = () => {
        let filteredProfiles = playerprofiles ? [...playerprofiles] : [...allplayerprofiles];
        filteredProfiles = list ? list : filteredProfiles;
  
        // Apply single check filter (starred players)
        if (filters.singleCheckFilters[0].checked) {
            filteredProfiles = filteredProfiles.filter((profile) => profile.star);
        }
  
        // Apply multi-select filters (specialities, position, etc.)
        filters.multiSelectFilters.forEach((filter) => {
            if (filter.selectedValues.length > 0) {
                filteredProfiles = filteredProfiles.filter((profile) => {
                    const player_field = filter.label.split(" ")[0].toLowerCase();
                    const profileAttributeList = player_field === "position" ? profile[player_field].preferred : profile[player_field];
                    const selectedValues = filter.selectedValues.map(value => value.toLowerCase());
                    const selectedValuesObjects = filter.options.filter((obj) => selectedValues.includes(obj.value.toLowerCase()));
                    let selectables = [];
                    selectedValuesObjects.forEach((svo) => selectables = selectables.concat(svo.map));
                    selectables = selectables.map((selectable) => selectable.toLowerCase());
                    return profileAttributeList.some(attr => selectables.includes(attr.toLowerCase()));
                });
            }
        });
  
        // Apply dual range slider filter (overall rating)
        filters.dualRangeSliderFilters.forEach(filter => {
            filteredProfiles = filteredProfiles.filter((profile) =>
                filter.range[0] <= profile.overall && profile.overall <= filter.range[1]
            );
        });
  
        return filteredProfiles;
    };

    const searchAndFilter = () => searchFilter(applyFilters());

    const onSearchBarChange = (event) => {
        setSearch(event.target.value);
    };
    
    const filteredProfiles = searchAndFilter();
  
    pagetitle = category ? category : pagetitle;
  
    return (
      <>
        <SearchBar value={search} onChange={onSearchBarChange} />
        <Filter filters={filters} setFilters={setFilters} />
        <PlayerProfiles playerprofiles={filteredProfiles} title={pagetitle} />
      </>
    );
};

export default PlayerProfilesPage;
