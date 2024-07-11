import React, { useState, useEffect } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';
import SingleCheckFilter from './filters/SingleCheckFilter';
import MultiSelectFilter from './filters/MultiSelectFilter';
import DualRangeSliderFilter from './filters/DualRangeSliderFilter';

const Filter = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openFilters, setOpenFilters] = useState(filters)

  const toggleFilter = () => {
    setIsOpen(!isOpen);
    setOpenFilters(filters);
  };
  // Update openFilters whenever filters prop changes
    useEffect(() => {
        setOpenFilters(filters);
    }, [filters])

  const removeFilter = (type, index) => {
    const updatedFilters = { ...openFilters };
    if (type === 'singleCheckFilters') {
      updatedFilters.singleCheckFilters[index].checked = false;
    } else if (type === 'multiSelectFilters') {
      updatedFilters.multiSelectFilters[index].selectedValues = [];
    } else if (type === 'dualRangeSliderFilters') {
      updatedFilters.dualRangeSliderFilters[index].range = [0, 100]; // Adjust according to your logic
    }
    setFilters(updatedFilters);
    
    // Create a copy of openFilters state
    const updatedOpenFilters = { ...openFilters };
    // Create a new array for the specific type of filters
    updatedOpenFilters[type] = openFilters[type].filter((_, idx) => idx !== index);
    // Update state with the modified filters
    setOpenFilters(updatedOpenFilters);
    // Perform any action with updatedOpenFilters if needed
    console.log('Removing filter:', type, index, updatedOpenFilters);


  };

  return (
    <div className="relative">
      <div className="flex items-center justify-end mb-4">
        <button
          className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md focus:outline-none"
          onClick={toggleFilter}
        >
          <FaFilter className="mr-2" />
          Filter
        </button>
      </div>

      {/* Filter panel */}
      {isOpen && (
        <div className="bg-white rounded-md shadow-md px-4 py-3 absolute top-0 right-0 mt-10 z-10">
          {/* Single Check Filters */}
          {openFilters.singleCheckFilters && openFilters.singleCheckFilters.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Single Check Filters</h3>
              {openFilters.singleCheckFilters.map((filter, index) => (
                <div key={index} className="flex items-center justify-between mb-2">
                  <SingleCheckFilter {...filter} />
                  <button
                    className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => removeFilter('singleCheckFilters', index)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Multi Select Filters */}
          {openFilters.multiSelectFilters && openFilters.multiSelectFilters.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Multi Select Filters</h3>
              {openFilters.multiSelectFilters.map((filter, index) => (
                <div key={index} className="flex items-center justify-between mb-2">
                  <MultiSelectFilter {...filter} />
                  <button
                    className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => removeFilter('multiSelectFilters', index)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Dual Range Slider Filters */}
          {openFilters.dualRangeSliderFilters && openFilters.dualRangeSliderFilters.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Dual Range Slider Filters</h3>
              {filters.dualRangeSliderFilters.map((filter, index) => (
                <div key={index} className="flex items-center justify-between mb-2">
                  <DualRangeSliderFilter {...filter} />
                  <button
                    className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => removeFilter('dualRangeSliderFilters', index)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Filter;
