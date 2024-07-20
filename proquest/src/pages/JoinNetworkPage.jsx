// JoinNetworkPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const JoinNetworkPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Join The Network</h1>
      <div className="flex w-full justify-center">
        <Link to="/join/player" className="w-2/3 md:w-1/3 lg:w-1/4 p-8 mx-4 border border-gray-300 hover:bg-yellow-100 rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="block text-center text-4xl font-bold text-blue-500 hover:text-blue-700 bg-yellow focus:outline-none focus:shadow-outline h-full flex items-center justify-center">
            Add Player
          </div>
        </Link>
        <Link to="/join/team" className="w-2/3 md:w-1/3 lg:w-1/4 p-8 mx-4 border border-gray-300 hover:bg-rose-100 rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="block text-center text-4xl font-bold text-blue-500 hover:text-blue-700 focus:outline-none focus:shadow-outline h-full flex items-center justify-center">
            Add Team
          </div>
        </Link>
      </div>
    </div>
  );
};

export default JoinNetworkPage;
