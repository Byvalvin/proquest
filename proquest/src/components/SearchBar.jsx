import React from 'react';
import { FaSearch } from 'react-icons/fa'; // Import FontAwesome search icon

const SearchBar = ({ placeholder = 'Search...', value, onChange }) => {
  return (
    <div className="flex items-center px-4 py-2 mb-4 bg-white rounded-md shadow-md">
      <FaSearch className="text-gray-500 mr-2" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-3 py-1 border rounded-md focus:outline-none"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
