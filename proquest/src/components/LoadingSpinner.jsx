import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <div className="flex flex-col items-center">
      <FaSpinner className="animate-spin text-white text-4xl mb-2" />
      <p className="text-white text-lg">{message}</p>
    </div>
  </div>
);

export default LoadingSpinner;
