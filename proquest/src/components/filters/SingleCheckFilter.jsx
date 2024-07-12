import React from 'react';

const SingleCheckFilter = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center mb-2">
      <input
        type="checkbox"
        className="form-checkbox h-4 w-4 text-blue-500 rounded"
        checked={checked}
        onChange={onChange}
      />
      <label className="ml-2">{label}</label>
    </div>
  );
};

export default SingleCheckFilter;
