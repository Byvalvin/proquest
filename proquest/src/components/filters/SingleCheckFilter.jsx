import React from 'react';

const SingleCheckFilter = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center mb-2">
      <input
        type="checkbox"
        className="mr-2"
        checked={checked}
        onChange={onChange}
      />
      <label>{label}</label>
    </div>
  );
};

export default SingleCheckFilter;
