import React from 'react';
import Select from 'react-select';
import { FaTimes } from 'react-icons/fa';

const MultiSelectFilter = ({ label, options, selectedValues, onChange }) => {
    // Transform options to match react-select format
    const selectOptions = options.map(option => ({
        value: option.value,
        label: option.label,
    }));

    // Handle change function to return selected values
    const handleSelectChange = selectedOptions => {
        const selectedValues = selectedOptions.map(option => option.value);
        onChange(selectedValues);
    };

    // Handle removal of selected option
    const handleRemoveOption = (removedValue) => {
        const remainingValues = selectedValues.filter(value => value !== removedValue);
        onChange(remainingValues);
    };

    return (
        <div className="mb-4">
            <label className="block font-medium mb-1">{label}</label>
            <Select
                isMulti
                options={selectOptions}
                value={selectedValues.map(value => ({ value, label: value }))} // Map selected values to react-select format
                onChange={handleSelectChange}
                className="basic-multi-select"
                classNamePrefix="select"
            />
            {selectedValues.length > 0 && (
                <div className="mt-2">
                    {selectedValues.map((value, index) => (
                        <button
                            key={index}
                            className="inline-flex items-center bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm mr-2"
                            onClick={() => handleRemoveOption(value)}
                        >
                            {value} <FaTimes className="ml-1" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelectFilter;
