import React from 'react';
import { FaStar, FaFutbol } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TeamProfile = ({ profileInfo }) => {
  const {
    _id,
    name,
    year,
    roster,
    performance,
    value,
  } = profileInfo;

  // Use a default soccer club icon if available in FontAwesome
  const TeamIcon = () => <FaFutbol className="text-8xl text-gray-500" />;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 relative">
      {/* Star Icon */}
      <div className="absolute top-0 right-0 p-2">
        <FaStar className="text-yellow-500 text-lg" />
      </div>

      {/* Top Section: Logo and Year Established */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Logo or Default Icon */}
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center">
            <TeamIcon />
          </div>
        </div>

        {/* Year Established */}
        <div className="flex items-center justify-center">
          <p className="text-lg font-bold">{`Est. ${year}`}</p>
        </div>
      </div>

      {/* Bottom Section: Name, Performance, Value */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left Column: Name */}
        <div>
          <p className="text-lg font-semibold">{name}</p>
        </div>

        {/* Right Column: Performance and Value */}
        <div>
          <div className="text-sm font-semibold mb-1">Performance</div>
          <p className="text-sm text-gray-600">{performance}</p>

          <div className="text-sm font-semibold mb-1">Value</div>
          <p className="text-sm text-gray-600">{value}</p>
        </div>

        {/* Button for More Details on Team */}
        <Link
          to={`/teams/${_id}`}
          state={profileInfo}
          className="mt-2 py-1 px-4 bg-blue-500 text-white rounded-md text-sm font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          More Details
        </Link>
      </div>
    </div>
  );
};

export default TeamProfile;
